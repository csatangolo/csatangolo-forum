const SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ADMIN_CODE = "csatangolo2026"; // ezt csak Ti ismeritek

let participants = [];

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
  const { data, error } = await client.from("participants").select("*").order("created_at", { ascending: false });
  if (error) {
    alert("Nem sikerült betölteni a résztvevőket. Futtasd le az admin SQL frissítést.");
    console.error(error);
    return;
  }
  participants = data || [];
  updateStats();
  render(participants);
}

function updateStats() {
  document.getElementById("statParticipants").textContent = participants.length;
  document.getElementById("statCheckedIn").textContent = participants.filter(p => p.checked_in).length;
  document.getElementById("statPaid").textContent = participants.filter(p => p.contribution_paid).length;
  const registrationIds = new Set(participants.map(p => p.registration_id).filter(Boolean));
  document.getElementById("statRegistrations").textContent = registrationIds.size;
}

function render(rows) {
  body.innerHTML = "";
  rows.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${escapeHtml(p.name || "")}</strong></td>
      <td>${escapeHtml(p.type || "")}</td>
      <td><small>${escapeHtml(p.participant_code || "")}</small></td>
      <td>${escapeHtml(p.city || "")}</td>
      <td><button class="mini-button ${p.checked_in ? "ok" : ""}" data-action="checkin" data-id="${p.id}">${p.checked_in ? "Belépett" : "Beléptetés"}</button></td>
      <td><button class="mini-button ${p.contribution_paid ? "ok" : ""}" data-action="paid" data-id="${p.id}">${p.contribution_paid ? "Rendezve" : "Fizetendő"}</button></td>
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

searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase().trim();
  const filtered = participants.filter(p =>
    String(p.name || "").toLowerCase().includes(q) ||
    String(p.participant_code || "").toLowerCase().includes(q) ||
    String(p.city || "").toLowerCase().includes(q)
  );
  render(filtered);
});

document.getElementById("exportCsv").addEventListener("click", () => {
  const rows = [["Név","Típus","Kód","Település","Belépett","Hozzájárulás"]];
  participants.forEach(p => rows.push([p.name,p.type,p.participant_code,p.city,p.checked_in ? "igen" : "nem",p.contribution_paid ? "igen" : "nem"]));
  const csv = rows.map(r => r.map(cell => `"${String(cell || "").replaceAll('"','""')}"`).join(";")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "csatangolo_forum_resztvevok.csv";
  a.click();
  URL.revokeObjectURL(url);
});

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
