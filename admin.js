const SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ADMIN_CODE = "csatangolo2026";

let participants = [];

const loginBox = document.getElementById("loginBox");
const adminContent = document.getElementById("adminContent");
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");
const body = document.getElementById("participantsBody");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

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

document.getElementById("adminCode").addEventListener("keydown", e => {
  if (e.key === "Enter") loginButton.click();
});

async function loadData() {
  const pRes = await client.from("participants").select("*").order("created_at", { ascending: true });

  if (pRes.error) {
    alert("Nem sikerült betölteni a résztvevőket. Ellenőrizd az adatbázis jogosultságokat.");
    console.error(pRes.error);
    return;
  }

  participants = pRes.data || [];
  updateStats();
  render(getFilteredRows());
}

function updateStats() {
  const arrived = participants.filter(p => p.checked_in);
  const paid = participants.filter(p => p.contribution_paid);
  const unpaidArrived = participants.filter(p => p.checked_in && !p.contribution_paid);
  const children = participants.filter(p => roleText(p).includes("gyermek"));

  document.getElementById("statParticipants").textContent = participants.length;
  document.getElementById("statCheckedIn").textContent = arrived.length;
  document.getElementById("statNotArrived").textContent = participants.length - arrived.length;
  document.getElementById("statPaid").textContent = paid.length;
  document.getElementById("statUnpaidArrived").textContent = unpaidArrived.length;
  document.getElementById("statChildren").textContent = children.length;
}

function getFilteredRows() {
  const q = searchInput.value.toLowerCase().trim();
  const filter = statusFilter.value;

  return participants.filter(p => {
    const role = roleText(p);
    const searchOk =
      !q ||
      String(p.name || "").toLowerCase().includes(q) ||
      String(p.participant_code || "").toLowerCase().includes(q) ||
      String(p.city || "").toLowerCase().includes(q) ||
      String(p.type || "").toLowerCase().includes(q);

    if (!searchOk) return false;

    if (filter === "arrived") return !!p.checked_in;
    if (filter === "not-arrived") return !p.checked_in;
    if (filter === "unpaid-arrived") return !!p.checked_in && !p.contribution_paid;
    if (filter === "paid") return !!p.contribution_paid;
    if (filter === "speaker") return role.includes("előadó");
    if (filter === "trainer") return role.includes("oktató") || role.includes("edző") || role.includes("lovasedző");
    if (filter === "guest") return role.includes("vendég") && !role.includes("gyermek");
    if (filter === "child") return role.includes("gyermek");
    return true;
  });
}

function render(rows) {
  body.innerHTML = "";
  if (!rows.length) {
    body.innerHTML = `<tr><td colspan="8" class="muted-table-cell">Nincs találat.</td></tr>`;
    return;
  }

  rows.forEach(p => {
    const tr = document.createElement("tr");
    tr.className = rowClass(p);
    tr.innerHTML = `
      <td><strong>${escapeHtml(p.name || "")}</strong></td>
      <td><span class="role-chip">${escapeHtml(p.type || "Vendég")}</span></td>
      <td><small>${escapeHtml(p.participant_code || "")}</small></td>
      <td>${escapeHtml(p.city || "")}</td>
      <td><button class="admin-toggle ${p.checked_in ? "on" : ""}" data-action="checkin" data-id="${p.id}"><b>${p.checked_in ? "✓" : ""}</b><span>${p.checked_in ? "Itt van" : "Nincs itt"}</span></button></td>
      <td><button class="admin-toggle ${p.contribution_paid ? "on" : ""}" data-action="paid" data-id="${p.id}"><b>${p.contribution_paid ? "✓" : ""}</b><span>${p.contribution_paid ? "Fizetett" : "Nem fizetett"}</span></button></td>
      <td>${p.checked_in_at ? escapeHtml(new Date(p.checked_in_at).toLocaleString("hu-HU")) : ""}</td>
      <td><button class="mini-button danger" data-action="delete" data-id="${p.id}">Törlés</button></td>
    `;
    body.appendChild(tr);
  });
}

function rowClass(p) {
  if (p.checked_in && p.contribution_paid) return "row-ok";
  if (p.checked_in && !p.contribution_paid) return "row-warn";
  const role = roleText(p);
  if (role.includes("előadó")) return "row-speaker";
  if (role.includes("oktató") || role.includes("edző")) return "row-trainer";
  return "";
}

function roleText(p) {
  return String(p.type || "").toLowerCase();
}

body.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const id = btn.dataset.id;
  const p = participants.find(x => x.id === id);
  if (!p) return;

  if (btn.dataset.action === "delete") {
    await deleteParticipant(p);
    return;
  }

  const update = btn.dataset.action === "checkin"
    ? { checked_in: !p.checked_in, checked_in_at: !p.checked_in ? new Date().toISOString() : null }
    : { contribution_paid: !p.contribution_paid };

  const { error } = await client.from("participants").update(update).eq("id", id);
  if (error) {
    alert("Nem sikerült menteni. Ellenőrizd az UPDATE jogosultságot.");
    console.error(error);
    return;
  }

  await loadData();
});

async function deleteParticipant(p) {
  const ok = confirm(`Biztosan törlöd ezt a résztvevőt?\n\n${p.name}\n${p.participant_code}\n\nEz csak ezt az egy belépőkártyát törli.`);
  if (!ok) return;

  const { error } = await client.from("participants").delete().eq("id", p.id);
  if (error) {
    alert("Nem sikerült törölni. Ellenőrizd a Supabase DELETE jogosultságot.");
    console.error(error);
    return;
  }

  await loadData();
}

searchInput.addEventListener("input", () => render(getFilteredRows()));
statusFilter.addEventListener("change", () => render(getFilteredRows()));

document.getElementById("exportCsv").addEventListener("click", () => {
  const rows = [["Név","Titulus","Kód","Település","Megérkezett","Fizetett","Érkezés ideje"]];
  getFilteredRows().forEach(p => rows.push([
    p.name,
    p.type,
    p.participant_code,
    p.city,
    p.checked_in ? "igen" : "nem",
    p.contribution_paid ? "igen" : "nem",
    p.checked_in_at || ""
  ]));
  downloadCsv(rows, "csatangolo_forum_beleptetes.csv");
});

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

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
