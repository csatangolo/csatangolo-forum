const SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ADMIN_CODE = "csatangolo2026";

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
  if (document.getElementById("gateCode").value !== ADMIN_CODE) {
    gateMessage.className = "form-message error";
    gateMessage.textContent = "Hibás szervezői kód.";
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
    cameraStatus.textContent = "A QR olvasó könyvtár nem töltött be. Frissítsd az oldalt, vagy használd a kézi kódbevitelt.";
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
      { fps: 10, qrbox: { width: 260, height: 260 }, aspectRatio: 1.0 },
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
    cameraStatus.textContent = "Nem sikerült elindítani a kamerát. Ellenőrizd a kameraengedélyt, vagy használd a kézi kódbevitelt.";
    resultBox.innerHTML = `<div class="gate-result danger"><b>📷</b><h2>Kamera nem indult el</h2><p>Használd a kézi kódbevitelt, vagy frissítsd az oldalt és engedélyezd a kamerát.</p></div>`;
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
  resultBox.innerHTML = `
    <div class="gate-result ${already ? "warning" : "success"}">
      <b>${already ? "⚠️" : "✅"}</b>
      <h2>${already ? "Már belépett" : "Beléphet"}</h2>
      <p class="gate-name">${escapeHtml(p.name || "")}</p>
      <p class="gate-role">${escapeHtml(p.type || "Résztvevő")}</p>
      <p class="gate-code">${escapeHtml(p.participant_code || "")}</p>

      <div class="gate-status-grid">
        <span class="${already ? "ok" : "wait"}">${already ? "Belépve" : "Belépésre vár"}</span>
        <span class="${paid ? "ok" : "pay"}">${paid ? "Hozzájárulás rendezve" : "Helyszínen fizetendő"}</span>
      </div>

      <div class="gate-action-row">
        <button class="button gate-primary-btn" ${already ? "disabled" : ""} onclick="checkIn('${escapeAttr(p.id)}')">${already ? "Már beléptetve" : "Beléptetés rögzítése"}</button>
        <button class="button ghost dark gate-secondary-btn" onclick="togglePaid('${escapeAttr(p.id)}', ${paid ? "true" : "false"})">${paid ? "Fizetés visszavonása" : "Hozzájárulás rendezve"}</button>
      </div>
    </div>
  `;
}

async function checkIn(id) {
  const { data, error } = await client
    .from("participants")
    .update({ checked_in: true, checked_in_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error(error);
    alert("Nem sikerült beléptetni. Futtasd le a V1_FINAL_FORUM.sql fájlt vagy ellenőrizd az UPDATE jogosultságot.");
    return;
  }

  currentParticipant = data;
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
    alert("Nem sikerült menteni. Futtasd le a V1_FINAL_FORUM.sql fájlt vagy ellenőrizd az UPDATE jogosultságot.");
    return;
  }

  currentParticipant = data;
  showParticipant(data);
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/`/g, "&#096;");
}
