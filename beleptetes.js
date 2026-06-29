const SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Beléptető kollégáknak. Az admin teljes listája továbbra is az admin.html oldalon van.
const GATE_PIN = "2026";

const gateMessage = document.getElementById("gateMessage");
const scannerSection = document.getElementById("scannerSection");
const resultBox = document.getElementById("resultBox");
const cameraStatus = document.getElementById("cameraStatus");

let scanner = null;
let scannerRunning = false;
let lastCode = "";
let lastAt = 0;
let currentParticipant = null;

document.getElementById("unlockGate").addEventListener("click", () => {
  if (document.getElementById("gateCode").value !== GATE_PIN) {
    gateMessage.className = "form-message error";
    gateMessage.textContent = "Hibás PIN-kód.";
    return;
  }
  document.getElementById("gateLogin").classList.add("hidden");
  scannerSection.classList.remove("hidden");
});

document.getElementById("gateCode").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("unlockGate").click();
});

document.getElementById("startScannerBtn").addEventListener("click", startScanner);
document.getElementById("stopScannerBtn").addEventListener("click", stopScanner);
document.getElementById("restartScannerBtn").addEventListener("click", async () => {
  await stopScanner();
  setTimeout(startScanner, 300);
});

document.getElementById("manualSearch").addEventListener("click", () => {
  const code = document.getElementById("manualCode").value.trim();
  if (code) findParticipant(code);
});

document.getElementById("manualCode").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const code = document.getElementById("manualCode").value.trim();
    if (code) findParticipant(code);
  }
});

async function startScanner() {
  if (scannerRunning) return;
  if (!window.Html5Qrcode) {
    cameraStatus.textContent = "A QR olvasó nem töltött be. Használd a kézi kódbevitelt.";
    return;
  }

  cameraStatus.textContent = "Kamera indítása...";
  resultBox.innerHTML = `<div class="gate-waiting"><b>📷</b><h2>Kamera indítása</h2><p>Engedélyezd a kamerát, ha a böngésző kéri.</p></div>`;

  try {
    scanner = new Html5Qrcode("reader");
    const cameras = await Html5Qrcode.getCameras();
    const backCamera = cameras.find(c => /back|rear|environment|hátsó/i.test(c.label)) || cameras[cameras.length - 1] || cameras[0];

    await scanner.start(
      backCamera ? { deviceId: { exact: backCamera.id } } : { facingMode: "environment" },
      { fps: 10, qrbox: { width: 280, height: 280 }, aspectRatio: 1.0 },
      decodedText => {
        const code = String(decodedText || "").trim();
        const now = Date.now();
        if (!code) return;
        if (code === lastCode && now - lastAt < 2600) return;
        lastCode = code;
        lastAt = now;
        findParticipant(code);
      },
      () => {}
    );

    scannerRunning = true;
    cameraStatus.textContent = "Kamera aktív. Tartsd a QR-kódot a négyzet elé.";
    resultBox.innerHTML = `<div class="gate-waiting"><b>🎟️</b><h2>Olvasásra kész</h2><p>Mutasd a QR-kódot a kamerának.</p></div>`;
  } catch (err) {
    console.error(err);
    scannerRunning = false;
    cameraStatus.textContent = "Nem sikerült elindítani a kamerát. Használd a kézi kódbevitelt.";
    resultBox.innerHTML = `<div class="gate-result danger"><b>📷</b><h2>Kamera nem indult el</h2><p>Használd a kézi kódbevitelt, vagy frissítsd az oldalt.</p></div>`;
  }
}

async function stopScanner() {
  try {
    if (scanner && scannerRunning) {
      await scanner.stop();
      await scanner.clear();
    }
  } catch (e) {
    console.warn(e);
  }
  scanner = null;
  scannerRunning = false;
  cameraStatus.textContent = "Kamera leállítva.";
}

async function findParticipant(code) {
  const clean = String(code || "").trim();
  resultBox.innerHTML = `<div class="gate-result loading"><b>🔎</b><h2>Ellenőrzés...</h2><p class="gate-code">${escapeHtml(clean)}</p></div>`;

  const { data, error } = await client.from("participants").select("*").eq("participant_code", clean).single();

  if (error || !data) {
    currentParticipant = null;
    resultBox.innerHTML = `<div class="gate-result danger"><b>❌</b><h2>Érvénytelen vendégkártya</h2><p>Nem található ilyen belépőkód.</p><p class="gate-code">${escapeHtml(clean)}</p></div>`;
    return;
  }

  currentParticipant = data;
  showParticipant(data);
}

function showParticipant(p) {
  const already = !!p.checked_in;
  const paid = !!p.contribution_paid;
  const arrivalTime = p.checked_in_at ? new Date(p.checked_in_at).toLocaleTimeString("hu-HU", { hour: "2-digit", minute: "2-digit" }) : "";

  resultBox.innerHTML = `
    <div class="checkin-confirm-card ${already ? "already" : ""}">
      <div class="checkin-status-pill">${already ? "⚠️ Már bejelentkezett" : "✅ Beolvasva"}</div>
      <h2>${escapeHtml(p.name || "")}</h2>
      <p class="gate-role">${escapeHtml(p.type || "Vendég")}</p>
      <p class="gate-code">${escapeHtml(p.participant_code || "")}</p>
      ${p.city ? `<p class="gate-city">📍 ${escapeHtml(p.city)}</p>` : ""}
      ${already ? `<p class="gate-arrival">Érkezés ideje: <strong>${escapeHtml(arrivalTime)}</strong></p>` : ""}

      <div class="checkin-checkboxes">
        <label class="checkin-check">
          <input id="confirmArrived" type="checkbox" ${already ? "checked" : ""}>
          <span>Megérkezett</span>
        </label>
        <label class="checkin-check">
          <input id="confirmPaid" type="checkbox" ${paid ? "checked" : ""}>
          <span>Részvételi hozzájárulás rendezve</span>
        </label>
      </div>

      <div class="gate-status-grid">
        <span class="${already ? "ok" : "wait"}">${already ? "Megérkezett" : "Érkezés nincs mentve"}</span>
        <span class="${paid ? "ok" : "pay"}">${paid ? "Fizetés rendezve" : "Fizetésre vár"}</span>
      </div>

      <div class="gate-action-row">
        <button class="button gate-secondary-btn" type="button" onclick="cancelCurrent()">Mégse</button>
        <button class="button gate-primary-btn" type="button" onclick="saveCurrent()">Mentés</button>
      </div>
    </div>
  `;
}

function cancelCurrent() {
  currentParticipant = null;
  resultBox.innerHTML = `<div class="gate-waiting"><b>🎟️</b><h2>Várakozás beolvasásra</h2><p>Olvass be egy vendégkártyát, vagy írd be kézzel a belépőkódot.</p></div>`;
}

async function saveCurrent() {
  if (!currentParticipant) return;

  const arrived = document.getElementById("confirmArrived").checked;
  const paid = document.getElementById("confirmPaid").checked;
  const update = {
    checked_in: arrived,
    checked_in_at: arrived
      ? (currentParticipant.checked_in_at || new Date().toISOString())
      : null,
    contribution_paid: paid
  };

  const { data, error } = await client
    .from("participants")
    .update(update)
    .eq("id", currentParticipant.id)
    .select("*")
    .single();

  if (error) {
    console.error(error);
    alert("Nem sikerült menteni. Ellenőrizd a Supabase UPDATE jogosultságot.");
    return;
  }

  currentParticipant = data;
  showSaved(data);
}

function showSaved(p) {
  const paid = !!p.contribution_paid;
  resultBox.innerHTML = `
    <div class="gate-result success">
      <b>✅</b>
      <h2>Mentve</h2>
      <p class="gate-name">${escapeHtml(p.name || "")}</p>
      <p class="gate-role">${escapeHtml(p.type || "Vendég")}</p>
      <div class="gate-status-grid">
        <span class="ok">Megérkezett</span>
        <span class="${paid ? "ok" : "pay"}">${paid ? "Fizetés rendezve" : "Fizetésre vár"}</span>
      </div>
      <button class="button gate-primary-btn" type="button" onclick="cancelCurrent()">Következő vendég</button>
    </div>
  `;
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
