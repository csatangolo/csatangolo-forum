const SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ADMIN_CODE = "csatangolo2026";

let participants = [];
let registrations = [];

const loginBox = document.getElementById("loginBox");
const adminContent = document.getElementById("adminContent");
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");
const body = document.getElementById("participantsBody");
const searchInput = document.getElementById("searchInput");

function msg(text) {
  loginMessage.className = "form-message error";
  loginMessage.textContent = text;
}

loginButton.addEventListener("click", async () => {
  if (document.getElementById("adminCode").value !== ADMIN_CODE) {
    msg("Hibás admin kód.");
    return;
  }
  loginBox.classList.add("hidden");
  adminContent.classList.remove("hidden");
  await loadData();
});

async function loadData() {
  const pRes = await client.from("participants").select("*").order("created_at", { ascending: false });
  const rRes = await client.from("registrations").select("*").order("created_at", { ascending: false });

  if (pRes.error) {
    alert("Nem sikerült betölteni a résztvevőket. Futtasd le az admin SQL frissítést.");
    console.error(pRes.error);
    return;
  }

  participants = pRes.data || [];
  registrations = rRes.error ? [] : (rRes.data || []);
  updateStats();
  render(getFilteredRows());
}

function updateStats() {
  document.getElementById("statParticipants").textContent = participants.length;
  document.getElementById("statCheckedIn").textContent = participants.filter(p => p.checked_in).length;
  document.getElementById("statPaid").textContent = participants.filter(p => p.contribution_paid).length;
  const registrationIds = new Set(participants.map(p => p.registration_id).filter(Boolean));
  document.getElementById("statRegistrations").textContent = registrations.length || registrationIds.size;
}

function getFilteredRows() {
  const q = searchInput.value.toLowerCase().trim();
  return participants.filter(p =>
    !q ||
    String(p.name || "").toLowerCase().includes(q) ||
    String(p.participant_code || "").toLowerCase().includes(q) ||
    String(p.city || "").toLowerCase().includes(q) ||
    String(p.email_contact || "").toLowerCase().includes(q)
  );
}

function render(rows) {
  body.innerHTML = "";
  if (!rows.length) {
    body.innerHTML = `<tr><td colspan="7" class="muted-table-cell">Nincs találat.</td></tr>`;
    return;
  }

  rows.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${escapeHtml(p.name || "")}</strong></td>
      <td>${escapeHtml(p.type || "")}</td>
      <td><small>${escapeHtml(p.participant_code || "")}</small></td>
      <td>${escapeHtml(p.city || "")}</td>
      <td><button class="mini-button ${p.checked_in ? "ok" : ""}" data-action="checkin" data-id="${p.id}">${p.checked_in ? "Belépett" : "Beléptetés"}</button></td>
      <td><button class="mini-button ${p.contribution_paid ? "ok" : ""}" data-action="paid" data-id="${p.id}">${p.contribution_paid ? "Rendezve" : "Fizetendő"}</button></td>
      <td><button class="mini-button danger" data-action="delete" data-id="${p.id}">Törlés</button></td>
    `;
    body.appendChild(tr);
  });
}

body.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const id = btn.dataset.id;
  const p = participants.find(x => x.id === id);
  if (!p) return;

  if (btn.dataset.action === "delete") {
    await deleteParticipantOrRegistration(p);
    return;
  }

  const update = btn.dataset.action === "checkin"
    ? { checked_in: !p.checked_in, checked_in_at: !p.checked_in ? new Date().toISOString() : null }
    : { contribution_paid: !p.contribution_paid };

  const { error } = await client.from("participants").update(update).eq("id", id);
  if (error) {
    alert("Nem sikerült menteni. Lehet, hogy hiányzik az UPDATE jogosultság.");
    console.error(error);
    return;
  }
  await loadData();
});

async function deleteParticipantOrRegistration(p) {
  const sameReg = participants.filter(x => x.registration_id && x.registration_id === p.registration_id);
  const isMain = String(p.type || "").toLowerCase().includes("fő");
  const canDeleteWholeRegistration = p.registration_id && (sameReg.length > 1 || isMain);

  let message = `Biztosan törlöd ezt a résztvevőt?\n\n${p.name}\n${p.participant_code}`;
  if (canDeleteWholeRegistration) {
    message += `\n\nEhhez a regisztrációhoz ${sameReg.length} belépő tartozik.\nOK = teljes regisztráció törlése\nMégse = nincs törlés`;
  }

  if (!confirm(message)) return;

  let error;
  if (canDeleteWholeRegistration) {
    const secondConfirm = confirm("Végleges törlés: törlődjön az egész regisztráció az összes hozzá tartozó belépővel együtt?");
    if (!secondConfirm) return;
    await client.from("participants").delete().eq("registration_id", p.registration_id);
    const res = await client.from("registrations").delete().eq("id", p.registration_id);
    error = res.error;
  } else {
    const res = await client.from("participants").delete().eq("id", p.id);
    error = res.error;
  }

  if (error) {
    alert("Nem sikerült törölni. Ellenőrizd a Supabase DELETE jogosultságot.");
    console.error(error);
    return;
  }

  await loadData();
}

searchInput.addEventListener("input", () => render(getFilteredRows()));

document.getElementById("exportCsv").addEventListener("click", () => {
  const rows = [["Név","Típus","Kód","Település","E-mail","Telefon","Belépett","Belépés ideje","Hozzájárulás"]];
  participants.forEach(p => rows.push([
    p.name,
    p.type,
    p.participant_code,
    p.city,
    p.email_contact,
    p.phone_contact,
    p.checked_in ? "igen" : "nem",
    p.checked_in_at || "",
    p.contribution_paid ? "igen" : "nem"
  ]));
  downloadCsv(rows, "csatangolo_forum_resztvevok.csv");
});

const exportRegsBtn = document.getElementById("exportRegistrations");
if (exportRegsBtn) {
  exportRegsBtn.addEventListener("click", () => {
    const rows = [["Név","E-mail","Telefon","Település","Gyermekkel érkezik","Szállás","Bemutató érdeklődés","Kérdés címzettje","Kérdés","Témák","Szerepek","Regisztráció ideje"]];
    registrations.forEach(r => rows.push([
      r.main_name,
      r.email,
      r.phone,
      r.city,
      r.has_children,
      r.accommodation,
      r.demo_interest,
      r.question_for,
      r.speaker_question,
      arrText(r.topics),
      arrText(r.roles),
      r.created_at || ""
    ]));
    downloadCsv(rows, "csatangolo_forum_regisztraciok.csv");
  });
}

function downloadCsv(rows, filename) {
  const csv = rows.map(r => r.map(cell => `"${String(cell || "").replaceAll('"','""')}"`).join(";")).join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function arrText(v) {
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "string") {
    try {
      const parsed = JSON.parse(v);
      if (Array.isArray(parsed)) return parsed.join(", ");
    } catch {}
    return v;
  }
  return "";
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
