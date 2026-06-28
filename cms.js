const SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ADMIN_CODE = "csatangolo2026";
const BUCKET = "forum-assets";

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
function file(form, name) {
  return form.elements[name]?.files?.[0] || null;
}
function checked(form, name) {
  return !!form.elements[name]?.checked;
}
function esc(str) {
  return String(str || "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
function slug(s) {
  return String(s || "file").toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "file";
}

async function uploadFile(fileObj, folder) {
  if (!fileObj) return "";
  const ext = fileObj.name.split(".").pop();
  const path = `${folder}/${Date.now()}-${slug(fileObj.name)}.${ext}`;
  const { error } = await client.storage.from(BUCKET).upload(path, fileObj, { upsert: false });
  if (error) {
    console.error(error);
    throw new Error("Nem sikerült feltölteni a fájlt. Futtasd le a V9 Storage SQL-t.");
  }
  const { data } = client.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

async function insertRow(table, row, form) {
  const { error } = await client.from(table).insert(row);
  if (error) {
    alert("Nem sikerült menteni. Futtasd le a V9 SQL frissítést.");
    console.error(error);
    return;
  }
  form.reset();
  if (form.elements["is_published"]) form.elements["is_published"].checked = true;
  await loadAll();
}

document.getElementById("speakerForm").addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target;
  try {
    const uploaded = await uploadFile(file(f,"image_file"), "speakers");
    await insertRow("speakers", {
      name: val(f,"name"), subtitle: val(f,"subtitle"), motto: val(f,"motto"), bio: val(f,"bio"), topic: val(f,"topic"),
      image_url: uploaded || val(f,"image_url"), facebook_url: val(f,"facebook_url"), instagram_url: val(f,"instagram_url"), youtube_url: val(f,"youtube_url"), website_url: val(f,"website_url"), sort_order: Number(val(f,"sort_order") || 100),
      is_featured: checked(f,"is_featured"), is_published: checked(f,"is_published")
    }, f);
  } catch(err) { alert(err.message); }
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

document.getElementById("sponsorForm").addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target;
  try {
    const uploaded = await uploadFile(file(f,"logo_file"), "sponsors");
    await insertRow("sponsors", {
      name: val(f,"name"), logo_url: uploaded || val(f,"logo_url"), website_url: val(f,"website_url"),
      sort_order: Number(val(f,"sort_order") || 100), is_published: checked(f,"is_published")
    }, f);
  } catch(err) { alert(err.message); }
});

document.getElementById("galleryForm").addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target;
  try {
    const uploaded = await uploadFile(file(f,"image_file"), "gallery");
    await insertRow("gallery", {
      title: val(f,"title"), image_url: uploaded, description: val(f,"description"),
      is_published: checked(f,"is_published")
    }, f);
  } catch(err) { alert(err.message); }
});

document.getElementById("documentForm").addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target;
  try {
    const uploaded = await uploadFile(file(f,"file"), "documents");
    await insertRow("documents", {
      title: val(f,"title"), file_url: uploaded, description: val(f,"description"),
      is_published: checked(f,"is_published")
    }, f);
  } catch(err) { alert(err.message); }
});

async function loadAll() {
  await Promise.all([
    loadTable("speakers","speakerAdminList", r => `<strong>${esc(r.name)}</strong><span>${esc(r.motto ? "„" + r.motto + "”" : "")}</span><span>${esc(r.subtitle || "")}</span>${r.is_featured ? "<small>⭐ Kiemelt előadó</small>" : ""}${r.image_url ? `<img class="cms-thumb" src="${esc(r.image_url)}">` : ""}`),
    loadTable("program_items","programAdminList", r => `<strong>${esc(r.time_label)} – ${esc(r.title)}</strong><span>${esc(r.description || "")}</span>`),
    loadTable("videos","videoAdminList", r => `<strong>${esc(r.title)}</strong><span>${esc(r.youtube_url || "")}</span>`),
    loadTable("news","newsAdminList", r => `<strong>${esc(r.title)}</strong><span>${esc(r.body || "")}</span>`),
    loadTable("sponsors","sponsorAdminList", r => `<strong>${esc(r.name)}</strong><span>${esc(r.website_url || "")}</span>${r.logo_url ? `<img class="cms-thumb small" src="${esc(r.logo_url)}">` : ""}`),
    loadTable("gallery","galleryAdminList", r => `<strong>${esc(r.title || "Galéria kép")}</strong><span>${esc(r.description || "")}</span>${r.image_url ? `<img class="cms-thumb" src="${esc(r.image_url)}">` : ""}`),
    loadTable("documents","documentAdminList", r => `<strong>${esc(r.title)}</strong><span>${esc(r.description || "")}</span>${r.file_url ? `<a class="mini-link" href="${esc(r.file_url)}" target="_blank">Fájl megnyitása</a>` : ""}`),
    loadTable("media_uploads","uploadAdminList", r => `<strong>${esc(r.uploader_name || "Névtelen feltöltő")}</strong><span>${esc(r.note || "")}</span>${r.file_url ? `<a class="mini-link" href="${esc(r.file_url)}" target="_blank">Megnyitás</a>` : ""}`)
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
    alert("Nem sikerült törölni. Futtasd le a V9 SQL frissítést.");
    console.error(error);
    return;
  }
  await loadAll();
}
