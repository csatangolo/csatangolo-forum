const SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function esc(str) {
  return String(str || "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}

function youtubeEmbed(url) {
  const s = String(url || "");
  let id = "";
  if (s.includes("youtu.be/")) id = s.split("youtu.be/")[1].split(/[?&]/)[0];
  if (s.includes("watch?v=")) id = s.split("watch?v=")[1].split("&")[0];
  if (s.includes("/embed/")) id = s.split("/embed/")[1].split(/[?&]/)[0];
  return id ? `https://www.youtube.com/embed/${id}` : "";
}

async function loadPublicSpeakers() {
  const el = document.getElementById("speakerList");
  const { data, error } = await client.from("speakers").select("*").eq("is_published", true).order("sort_order", { ascending: true });
  if (error || !data || !data.length) {
    el.innerHTML = `<article class="profile-card featured-profile"><span class="profile-tag">Kiemelt előadó</span><h2>Panyi Gyuri</h2><p>Belovaglás • Lókiképzés • Fiatal lovak képzése</p></article>
    <article class="profile-card featured-profile"><span class="profile-tag">Kiemelt előadó</span><h2>Pataky Kata</h2><p>Bemutató • Gyakorlati szemlélet</p></article>`;
    return;
  }
  el.innerHTML = data.map(s => `
    <article class="profile-card speaker-profile-card">
      ${s.is_featured ? '<span class="profile-tag floating-tag">⭐ Kiemelt előadó</span>' : ""}
      ${s.image_url ? `<img class="profile-photo" src="${esc(s.image_url)}" alt="${esc(s.name)}">` : ""}
      <h2>${esc(s.name)}</h2>
      ${s.motto ? `<p class="speaker-motto">„${esc(s.motto)}”</p>` : ""}
      <p><strong>${esc(s.subtitle || "")}</strong></p>
      ${s.topic ? `<p class="speaker-topic"><em>${esc(s.topic)}</em></p>` : ""}
      <p>${esc(s.bio || "")}</p>
      <div class="speaker-links">
        ${s.facebook_url ? `<a href="${esc(s.facebook_url)}" target="_blank" rel="noopener">Facebook</a>` : ""}
        ${s.instagram_url ? `<a href="${esc(s.instagram_url)}" target="_blank" rel="noopener">Instagram</a>` : ""}
        ${s.youtube_url ? `<a href="${esc(s.youtube_url)}" target="_blank" rel="noopener">YouTube</a>` : ""}
        ${s.website_url ? `<a href="${esc(s.website_url)}" target="_blank" rel="noopener">Weboldal</a>` : ""}
      </div>
    </article>
  `).join("");
}

async function loadPublicProgram() {
  const el = document.getElementById("programList");
  const { data, error } = await client.from("program_items").select("*").eq("is_published", true).order("sort_order", { ascending: true });
  if (error || !data || !data.length) {
    el.innerHTML = `<div><time>09:00</time><strong>Érkezés és regisztráció</strong><span>Kávé, beszélgetés, fröccsterasz hangulat.</span></div>
    <div><time>Délelőtt</time><strong>Szakmai előadások</strong><span>Belovaglás, fiatal lovak képzése, lókiképzés.</span></div>
    <div><time>Délután</time><strong>Gyakorlati bemutatók</strong><span>A Csatangoló Lovarda lovaival.</span></div>`;
    return;
  }
  el.innerHTML = data.map(p => `<div><time>${esc(p.time_label)}</time><strong>${esc(p.title)}</strong><span>${esc(p.description || "")}</span></div>`).join("");
}

async function loadPublicVideos() {
  const el = document.getElementById("videoList");
  const { data, error } = await client.from("videos").select("*").eq("is_published", true).order("sort_order", { ascending: true });
  if (error || !data || !data.length) {
    el.innerHTML = `<article class="knowledge-tile"><div class="play">▶</div><h2>Fórum meghívó</h2><p>Ide kerülhet az első YouTube meghívó videó.</p></article>`;
    return;
  }
  el.innerHTML = data.map(v => {
    const embed = youtubeEmbed(v.youtube_url);
    return `<article class="knowledge-tile">
      ${embed ? `<iframe class="yt" src="${embed}" title="${esc(v.title)}" allowfullscreen></iframe>` : '<div class="play">▶</div>'}
      <h2>${esc(v.title)}</h2>
      <p>${esc(v.description || "")}</p>
      ${v.youtube_url ? `<a class="mini-link" href="${esc(v.youtube_url)}" target="_blank" rel="noopener">Megnyitás YouTube-on</a>` : ""}
    </article>`;
  }).join("");
}

async function loadPublicNews() {
  const el = document.getElementById("newsList");
  const { data, error } = await client.from("news").select("*").eq("is_published", true).order("created_at", { ascending: false });
  if (error || !data || !data.length) {
    el.innerHTML = `<section class="card"><h2>Hamarosan</h2><p>Ide kerülnek majd a friss fórum hírek és tudnivalók.</p></section>`;
    return;
  }
  el.innerHTML = data.map(n => `<article class="card news-card"><span class="eyebrow">${new Date(n.created_at).toLocaleDateString("hu-HU")}</span><h2>${esc(n.title)}</h2><p>${esc(n.body || "")}</p></article>`).join("");
}


async function loadPublicGallery() {
  const el = document.getElementById("galleryList");
  const { data, error } = await client.from("gallery").select("*").eq("is_published", true).order("created_at", { ascending: false });
  if (error || !data || !data.length) {
    el.innerHTML = `<section class="card"><h2>Hamarosan</h2><p>Ide kerülnek majd a feltöltött képek.</p></section>`;
    return;
  }
  el.innerHTML = data.map(g => `<article class="gallery-card">
    <img src="${esc(g.image_url)}" alt="${esc(g.title || 'Galéria kép')}">
    <h2>${esc(g.title || '')}</h2>
    <p>${esc(g.description || '')}</p>
  </article>`).join("");
}

async function loadPublicDocuments() {
  const el = document.getElementById("documentList");
  const { data, error } = await client.from("documents").select("*").eq("is_published", true).order("created_at", { ascending: false });
  if (error || !data || !data.length) {
    el.innerHTML = `<p class="hint">Még nincs letölthető dokumentum.</p>`;
    return;
  }
  el.innerHTML = data.map(d => `<article class="cms-row">
    <div><strong>${esc(d.title)}</strong><span>${esc(d.description || '')}</span></div>
    <a class="button" href="${esc(d.file_url)}" target="_blank">Letöltés</a>
  </article>`).join("");
}
