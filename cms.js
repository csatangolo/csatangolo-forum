const SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ADMIN_CODE = "csatangolo2026";

const loginBox = document.getElementById("loginBox");
const cmsContent = document.getElementById("cmsContent");
const loginMessage = document.getElementById("loginMessage");

document.getElementById("loginButton").addEventListener("click", async () => {
  if (document.getElementById("adminCode").value !== ADMIN_CODE) {
    loginMessage.className = "form-message error";
    loginMessage.textContent = "Hibás szervezői kód.";
    return;
  }
  loginBox.classList.add("hidden");
  cmsContent.classList.remove("hidden");
  await loadAll();
});

document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".cms-panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

function val(form, name) {
  const el = form.elements[name];
  return el ? String(el.value || "").trim() : "";
}
function checked(form, name) {
  return !!form.elements[name]?.checked;
}
function esc(str) {
  return String(str || "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}

async function insertRow(table, row, form) {
  const { error } = await client.from(table).insert(row);
  if (error) {
    alert("Nem sikerült menteni. Futtasd le a V8 SQL frissítést.");
    console.error(error);
    return;
  }
  form.reset();
  if (form.elements["is_published"]) form.elements["is_published"].checked = true;
  await loadAll();
}

document.getElementById("speakerForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target;
  insertRow("speakers", {
    name: val(f,"name"), subtitle: val(f,"subtitle"), bio: val(f,"bio"), topic: val(f,"topic"),
    image_url: val(f,"image_url"), sort_order: Number(val(f,"sort_order") || 100),
    is_featured: checked(f,"is_featured"), is_published: checked(f,"is_published")
  }, f);
});

document.getElementById("programForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target;
  insertRow("program_items", {
    time_label: val(f,"time_label"), title: val(f,"title"), description: val(f,"description"),
    sort_order: Number(val(f,"sort_order") || 100), is_published: checked(f,"is_published")
  }, f);
});

document.getElementById("videoForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target;
  insertRow("videos", {
    title: val(f,"title"), youtube_url: val(f,"youtube_url"), description: val(f,"description"),
    category: val(f,"category"), sort_order: Number(val(f,"sort_order") || 100),
    is_published: checked(f,"is_published")
  }, f);
});

document.getElementById("newsForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target;
  insertRow("news", { title: val(f,"title"), body: val(f,"body"), is_published: checked(f,"is_published") }, f);
});

document.getElementById("sponsorForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target;
  insertRow("sponsors", {
    name: val(f,"name"), logo_url: val(f,"logo_url"), website_url: val(f,"website_url"),
    sort_order: Number(val(f,"sort_order") || 100), is_published: checked(f,"is_published")
  }, f);
});

async function loadAll() {
  await Promise.all([
    loadTable("speakers","speakerAdminList", r => `<strong>${esc(r.name)}</strong><span>${esc(r.subtitle || "")}</span>`),
    loadTable("program_items","programAdminList", r => `<strong>${esc(r.time_label)} – ${esc(r.title)}</strong><span>${esc(r.description || "")}</span>`),
    loadTable("videos","videoAdminList", r => `<strong>${esc(r.title)}</strong><span>${esc(r.youtube_url || "")}</span>`),
    loadTable("news","newsAdminList", r => `<strong>${esc(r.title)}</strong><span>${esc(r.body || "")}</span>`),
    loadTable("sponsors","sponsorAdminList", r => `<strong>${esc(r.name)}</strong><span>${esc(r.website_url || "")}</span>`)
  ]);
}

async function loadTable(table, elementId, renderFn) {
  const el = document.getElementById(elementId);
  const { data, error } = await client.from(table).select("*").order("created_at", { ascending: false });
  if (error) {
    el.innerHTML = `<div class="card"><p>Nem sikerült betölteni: ${table}</p></div>`;
    return;
  }
  if (!data.length) {
    el.innerHTML = `<div class="card"><p class="hint">Még nincs mentett tartalom.</p></div>`;
    return;
  }
  el.innerHTML = data.map(r => `
    <article class="cms-row">
      <div>${renderFn(r)}<small>${r.is_published ? "Publikus" : "Rejtett"}</small></div>
      <button class="mini-button" onclick="deleteRow('${table}','${r.id}')">Törlés</button>
    </article>
  `).join("");
}

async function deleteRow(table, id) {
  if (!confirm("Biztosan törlöd?")) return;
  const { error } = await client.from(table).delete().eq("id", id);
  if (error) {
    alert("Nem sikerült törölni. Futtasd le a V8 SQL frissítést.");
    console.error(error);
    return;
  }
  await loadAll();
}
