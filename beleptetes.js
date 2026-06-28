const SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ADMIN_CODE = "csatangolo2026";

const loginBox = document.getElementById("loginBox");
const gateDashboard = document.getElementById("gateDashboard");
const gateMessage = document.getElementById("gateMessage");
const resultBox = document.getElementById("resultBox");
const participantList = document.getElementById("participantList");

let scanner = null;
let scannerStarted = false;
let lastScannedCode = "";
let lastScanAt = 0;
let allParticipants = [];

document.getElementById("unlockGate").addEventListener("click", unlockGate);
document.getElementById("gateCode").addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlockGate();
});
document.getElementById("manualSearch").addEventListener("click", () => {
  const code = document.getElementById("manualCode").value.trim();
  if (code) findParticipant(code);
});
document.getElementById("manualCode").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const code = document.getElementById("manualCode").value.trim();
    if (code) findParticipant(code);
  }
});
document.getElementById("restartScanner").addEventListener("click", restartScanner);
document.getElementById("participantSearch").addEventListener("input", renderParticipantList);

async function unlockGate() {
  if (document.getElementById("gateCode").value !== ADMIN_CODE) {
    gateMessage.className = "form-message error";
    gateMessage.textContent = "Hibás szervezői kód.";
    return;
  }

  loginBox.classList.add("hidden");
  gateDashboard.classList.remove("hidden");
  await loadStatsAndList();
  startScanner();
}

async function loadStatsAndList() {
  const { data, error } = await client
    .from("participants")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    participantList.innerHTML = '<p class="hint">Nem sikerült betölteni a résztvevőket.</p>';
    return;
  }

  allParticipants = data || [];
  updateStats();
  renderParticipantList();
}

function updateStats() {
  const total = allParticipants.length;
  const checked = allParticipants.filter(p => p.checked_in).length;
  const paid = allParticipants.filter(p => p.contribution_paid).length;

  document.getElementById("statTotal").textContent = total;
  document.getElementById("statChecked").textContent = checked;
  document.getElementById("statPaid").textContent = paid;
  document.getElementById("statWaiting").textContent = Math.max(total - checked, 0);
}

function renderParticipantList() {
  const q = String(document.getElementById("participantSearch").value || "").toLowerCase().trim();
  const filtered = allParticipants.filter(p => {
    const text = `${p.name || ""} ${p.participant_code || ""} ${p.city || ""}`.toLowerCase();
    return !q || text.includes(q);
  }).slice(0, 80);

  if (!filtered.length) {
    participantList.innerHTML = '<p class="hint">Nincs találat.</p>';
    return;
  }

  participantList.innerHTML = filtered.map(p => `
    <button type="button" class="gate-person-row ${p.checked_in ? "is-checked" : ""}" onclick="findParticipant('${escapeAttr(p.participant_code)}')">
      <span>
        <strong>${escapeHtml(p.name || "")}</strong>
        <small>${escapeHtml(p.participant_code || "")}</small>
      </span>
      <em>${p.checked_in ? "Belépett" : "Várakozik"}</em>
    </button>
  `).join("");
}

async function startScanner() {
  if (scannerStarted || !window.Html5Qrcode) return;

  scannerStarted = true;
  scanner = new Html5Qrcode("reader");

  try {
    await scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 245, height: 245 } },
      (decodedText) => {
        const now = Date.now();
        const clean = String(decodedText || "").trim();
        if (!clean) return;
        if (clean === lastScannedCode && now - lastScanAt < 2500) return;
        lastScannedCode = clean;
        lastScanAt = now;
        findParticipant(clean);
      },
      () => {}
    );
  } catch (err) {
    console.warn(err);
    scannerStarted = false;
    resultBox.innerHTML = `
      <div class="gate-result warning">
        <b>📷</b>
        <h2>Kamera nem indult el</h2>
        <p>Engedélyezd a kamerát, vagy használd a kézi kódbevitelt.</p>
      </div>
    `;
  }
}

async function restartScanner() {
  try {
    if (scanner && scannerStarted) {
      await scanner.stop();
      await scanner.clear();
    }
  } catch (e) {
    console.warn(e);
  }
  scanner = null;
  scannerStarted = false;
  startScanner();
}

async function findParticipant(code) {
  const clean = String(code || "").trim();
  resultBox.innerHTML = `
    <div class="gate-result loading">
      <b>🔎</b>
      <h2>Ellenőrzés...</h2>
      <p>${escapeHtml(clean)}</p>
    </div>
  `;

  const { data, error } = await client
    .from("participants")
    .select("*")
    .eq("participant_code", clean)
    .single();

  if (error || !data) {
    resultBox.innerHTML = `
      <div class="gate-result danger">
        <b>❌</b>
        <h2>Érvénytelen belépő</h2>
        <p>Nem található ilyen QR-kód vagy belépőkód.</p>
        <div class="gate-code-pill">${escapeHtml(clean)}</div>
      </div>
    `;
    return;
  }

  showParticipant(data);
}

function showParticipant(p) {
  const already = !!p.checked_in;
  const paid = !!p.contribution_paid;
  const checkedAt = p.checked_in_at ? new Date(p.checked_in_at).toLocaleString("hu-HU") : "";

  resultBox.innerHTML = `
    <div class="gate-result ${already ? "warning" : "success"}">
      <b>${already ? "⚠️" : "✅"}</b>
      <h2>${already ? "Már belépett" : "Beléphet"}</h2>
      <p class="gate-person-name">${escapeHtml(p.name || "")}</p>
      <p>${escapeHtml(p.type || "Résztvevő")}</p>
      <div class="gate-code-pill">${escapeHtml(p.participant_code || "")}</div>

      <div class="gate-status-grid">
        <span class="${already ? "ok" : "wait"}">${already ? "Belépve" : "Belépésre vár"}</span>
        <span class="${paid ? "ok" : "pay"}">${paid ? "Hozzájárulás rendezve" : "Helyszínen fizetendő"}</span>
      </div>

      ${checkedAt ? `<p class="hint">Belépés ideje: ${escapeHtml(checkedAt)}</p>` : ""}

      <div class="gate-action-row">
        <button class="button" ${already ? "disabled" : ""} onclick="checkIn('${escapeAttr(p.id)}')">
          ${already ? "Már beléptetve" : "Beléptetés rögzítése"}
        </button>
        <button class="button ghost dark" onclick="togglePaid('${escapeAttr(p.id)}', ${paid ? "true" : "false"})">
          ${paid ? "Fizetés visszavonása" : "Hozzájárulás rendezve"}
        </button>
      </div>
    </div>
  `;
}

async function checkIn(id) {
  const { data, error } = await client
    .from("participants")
    .update({
      checked_in: true,
      checked_in_at: new Date().toISOString()
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error(error);
    alert("Nem sikerült beléptetni. Lehet, hogy hiányzik a checked_in_at oszlop vagy nincs jogosultság.");
    return;
  }

  replaceLocalParticipant(data);
  await loadStatsAndList();
  showParticipant(data);
}

async function togglePaid(id, current) {
  const { data, error } = await client
    .from("participants")
    .update({ contribution_paid: !current })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error(error);
    alert("Nem sikerült menteni a hozzájárulás állapotát.");
    return;
  }

  replaceLocalParticipant(data);
  await loadStatsAndList();
  showParticipant(data);
}

function replaceLocalParticipant(updated) {
  allParticipants = allParticipants.map(p => p.id === updated.id ? updated : p);
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, m => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#039;"
  }[m]));
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/`/g, "&#096;");
}
