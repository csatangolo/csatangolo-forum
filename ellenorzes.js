const SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ADMIN_CODE = "csatangolo2026";

const requiredTables = [
  ["registrations", "Regisztrációk"],
  ["participants", "Résztvevők / QR-kódok"],
  ["speakers", "Előadók"],
  ["program_items", "Program"],
  ["videos", "YouTube videók"],
  ["news", "Hírek"],
  ["sponsors", "Támogatók"],
  ["gallery", "Galéria"],
  ["documents", "Dokumentumok"]
];

const features = [
  ["Regisztrációs oldal", "regisztracio.html"],
  ["Szervezői irányítópult", "szervezo.html"],
  ["Tartalomkezelő", "tartalom.html"],
  ["Teljes kapu", "kapu.html"],
  ["Egyszerű kapu", "kapu-egyszeru.html"],
  ["Résztvevői profil", "profil.html"],
  ["Tudástár", "tudastar.html"],
  ["Galéria", "galeria.html"]
];

document.getElementById("startCheck").addEventListener("click", async () => {
  const code = document.getElementById("checkCode").value;
  if (code !== ADMIN_CODE) {
    const msg = document.getElementById("loginMessage");
    msg.className = "form-message error";
    msg.textContent = "Hibás szervezői kód.";
    return;
  }
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("checkContent").classList.remove("hidden");
  await runChecks();
});

async function runChecks() {
  const tableResults = [];
  for (const [table, label] of requiredTables) {
    const result = await checkTable(table, label);
    tableResults.push(result);
  }

  const storageResults = [];
  storageResults.push(await checkStorageList());
  storageResults.push(await checkStorageUpload());

  const featureResults = await Promise.all(features.map(([label, path]) => checkPage(label, path)));

  renderChecks("tableChecks", tableResults);
  renderChecks("storageChecks", storageResults);
  renderChecks("featureChecks", featureResults);

  const failed = [...tableResults, ...storageResults, ...featureResults].filter(x => !x.ok);
  renderTodos(failed);
  renderOverall(failed);
}

async function checkTable(table, label) {
  try {
    const { error } = await client.from(table).select("*").limit(1);
    return {
      ok: !error,
      label,
      detail: error ? error.message : "Elérhető"
    };
  } catch (e) {
    return { ok:false, label, detail:e.message };
  }
}

async function checkStorageList() {
  try {
    const { error } = await client.storage.from("forum-assets").list("", { limit: 1 });
    return {
      ok: !error,
      label: "forum-assets Storage bucket",
      detail: error ? error.message : "Elérhető"
    };
  } catch (e) {
    return { ok:false, label:"forum-assets Storage bucket", detail:e.message };
  }
}

async function checkStorageUpload() {
  try {
    const testContent = new Blob(["Csatangolo Forum test"], { type: "text/plain" });
    const path = `system-check/${Date.now()}-test.txt`;
    const { error } = await client.storage.from("forum-assets").upload(path, testContent, { upsert: false });
    if (error) return { ok:false, label:"Fájlfeltöltési jogosultság", detail:error.message };
    return { ok:true, label:"Fájlfeltöltési jogosultság", detail:"Működik" };
  } catch (e) {
    return { ok:false, label:"Fájlfeltöltési jogosultság", detail:e.message };
  }
}

async function checkPage(label, path) {
  try {
    const res = await fetch(path, { method: "HEAD", cache: "no-store" });
    return { ok: res.ok, label, detail: res.ok ? "Elérhető" : `HTTP ${res.status}` };
  } catch (e) {
    return { ok:false, label, detail:e.message };
  }
}

function renderChecks(id, results) {
  const el = document.getElementById(id);
  el.innerHTML = results.map(r => `
    <div class="check-row ${r.ok ? "ok" : "bad"}">
      <span>${r.ok ? "✅" : "❌"}</span>
      <div>
        <strong>${escapeHtml(r.label)}</strong>
        <small>${escapeHtml(r.detail)}</small>
      </div>
    </div>
  `).join("");
}

function renderTodos(failed) {
  const el = document.getElementById("todoList");
  if (!failed.length) {
    el.innerHTML = `<div class="check-row ok"><span>🟢</span><div><strong>A rendszer naprakész.</strong><small>Nincs teendő.</small></div></div>`;
    return;
  }

  const needsSql = failed.some(f => 
    f.label.includes("Storage") ||
    f.label.includes("Fájlfeltöltési") ||
    requiredTables.some(t => t[1] === f.label)
  );

  el.innerHTML = `
    ${needsSql ? `<div class="check-row bad"><span>1</span><div><strong>Futtasd le a legutóbbi SQL fájlokat</strong><small>Elsősorban: supabase_v9_valodi_feltoltes.sql és supabase_v10_egyszeru_kapu.sql</small></div></div>` : ""}
    <div class="check-row bad"><span>2</span><div><strong>GitHub fájlok ellenőrzése</strong><small>Ha oldal hiányzik, töltsd fel újra a legfrissebb ZIP összes fájlját.</small></div></div>
  `;
}

function renderOverall(failed) {
  const title = document.getElementById("overallStatus");
  const text = document.getElementById("overallText");
  if (!failed.length) {
    title.textContent = "🟢 A rendszer teljesen naprakész";
    text.textContent = "Minden fontos tábla, feltöltési jogosultság és oldal elérhető.";
  } else {
    title.textContent = `🟠 ${failed.length} ellenőrzési pont figyelmet kér`;
    text.textContent = "Nézd meg a Teendők részt. A legtöbb hiba egy SQL fájl újrafuttatásával vagy GitHub feltöltéssel javítható.";
  }
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
