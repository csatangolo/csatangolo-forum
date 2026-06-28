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

const LOCAL_SPEAKERS = [
  {
    name: "Panyi Gyuri",
    subtitle: "Lovas szakember • Gyakorlati szemlélet",
    image_url: "assets/panyi-gyuri.jpg",
    motto: "A lóval való munka alapja a tisztelet, a figyelem és a következetesség.",
    bio: `A fórumon gyakorlati szemlélettel, sokéves lovas tapasztalattal és nyitott szakmai gondolkodással vesz részt.`,
    topic: "Belovaglás | Lókiképzés | Gyakorlati tapasztalat",
    sort_order: 1,
    is_featured: true,
    is_published: true
  },
  {
    name: "Karl Péter",
    subtitle: "Western és ranch szemlélet • Horsemanship",
    image_url: "assets/karl-peter.jpg",
    motto: "A jó lóval való kapcsolat nem erőből, hanem megértésből épül.",
    bio: `A ló és ember közötti tiszta kommunikációt, a következetes segítségadást és a bizalmon alapuló munkát képviseli.`,
    topic: "Horsemanship | Kommunikáció | Ranch szemlélet",
    sort_order: 3,
    is_featured: false,
    is_published: true
  },
  {
    name: "Kevey Bella",
    subtitle: "Díjugratás • Sportló képzés",
    image_url: "assets/kevey-bella.jpeg.PNG",
    motto: "A teljesítmény mögött mindig ott van a pontos alapmunka.",
    bio: `Sportlovas szemlélettel, fegyelmezett, elegáns és lóközpontú megközelítéssel kapcsolódik a fórum szakmai programjához.`,
    topic: "Díjugratás | Sportló | Alapmunka",
    sort_order: 4,
    is_featured: false,
    is_published: true
  },
  {
    name: "Pataky Kata",
    subtitle: "Oktatás • Lóval való kapcsolat",
    image_url: "assets/pataky-kata.jpg",
    motto: "A figyelmes jelenlét sokszor többet tanít, mint bármilyen eszköz.",
    bio: `A lóval való finom, bizalmi kapcsolat és az oktatói jelenlét fontosságát képviseli.`,
    topic: "Oktatás | Kapcsolat | Bizalom",
    sort_order: 2,
    is_featured: true,
    is_published: true
  },
  {
    name: "Szabó Árpád",
    subtitle: "Akhal-teke tenyésztő • Csikónevelés",
    image_url: "assets/szabo-arpad-card.jpg",
    motto: "Először ki kell vívni a ló tiszteletét. Aztán el kell nyerni a bizalmát.",
    bio: `48 éve foglalkozom lovakkal, és úgy érzem, ma is ugyanazzal a lelkesedéssel tanulok tőlük, mint amikor először ültem nyeregbe. Számomra a lótenyésztés nem a csikó megszületéséig tart, hanem éppen ott kezdődik. Hiszem, hogy a tenyésztő felelőssége már az első pillanattól kialakítani azt a bizalmi kapcsolatot, amelyre később minden további képzés épülhet.`,
    topic: "Csikónevelés | Tenyésztői felelősség | Akhal-teke fajta",
    facebook_url: "https://www.facebook.com/share/p/18LLaey9Xi/",
    website_url: "https://nava.hu/id/4473109/",
    sort_order: 5,
    is_featured: false,
    is_published: true
  },
  {
    name: "Kaska Zoltán",
    subtitle: "Díjugratás • Versenytapasztalat",
    image_url: "assets/kaska-zoltan.jpg",
    motto: "A jó ugrás a felkészítésben kezdődik.",
    bio: `Díjugrató szemlélettel, versenytapasztalattal és gyakorlati lófelkészítési gondolatokkal érkezik a fórumra.`,
    topic: "Díjugratás | Versenyló | Felkészítés",
    sort_order: 6,
    is_featured: false,
    is_published: true
  },
  {
    name: "Benner Jani",
    subtitle: "Terepmunka • Használati ló képzés",
    image_url: "assets/benner-jani.jpg",
    motto: "A képzett ló terepen is magabiztos, figyelmes és együttműködő.",
    bio: `A használati szemléletű lókiképzés, a terepen is működő lovak és a gyakorlati tapasztalat oldaláról kapcsolódik a szakmai naphoz.`,
    topic: "Terepmunka | Használati ló | Lókiképzés",
    sort_order: 7,
    is_featured: false,
    is_published: true
  },
  {
    name: "Tisza Zoltán",
    subtitle: "Szabadidomítás • Lóval való kommunikáció",
    image_url: "assets/tisza-zoltan.jpg",
    motto: "A látványos munka mögött mindig pontos kommunikáció és bizalom áll.",
    bio: `A lóval való földi munka, a figyelem, a bizalom és a finom kommunikáció területéről hoz gyakorlati tapasztalatokat.`,
    topic: "Szabadidomítás | Földi munka | Kommunikáció",
    sort_order: 8,
    is_featured: false,
    is_published: true
  },
  {
    name: "Tászler Melinda",
    subtitle: "Lovas bemutató • Klasszikus munka",
    image_url: "assets/taszler-melinda.jpg",
    motto: "A lóval való összhang a legszebb bemutató.",
    bio: `Elegáns, bemutató jellegű lovas munkával és a lóval való összhang szemléletével színesíti a fórum szakmai közegét.`,
    topic: "Bemutató | Összhang | Klasszikus munka",
    sort_order: 9,
    is_featured: false,
    is_published: true
  },
  {
    name: "Szabó Zoltán",
    subtitle: "Terepakadályok • Gyakorlati képzés",
    image_url: "assets/szabo-zoltan.jpg",
    motto: "A bátorság tanítható, ha a ló lépésről lépésre érti a feladatot.",
    bio: `Gyakorlati terepakadályos tapasztalattal és használati szemléletű lófelkészítéssel kapcsolódik a fórum programjához.`,
    topic: "Terepakadály | Bátorság | Gyakorlati képzés",
    sort_order: 10,
    is_featured: false,
    is_published: true
  }
];

function speakerTopics(topic) {
  return String(topic || "").split(/\||,|;/).map(t => t.trim()).filter(Boolean);
}

function speakerParagraphs(bio) {
  return String(bio || "").split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
}

function renderSpeakerCard(s) {
  const topics = speakerTopics(s.topic);
  const paragraphs = speakerParagraphs(s.bio);
  const lead = paragraphs[0] || s.bio || "";
  const details = paragraphs.slice(1);
  return `
    <article class="speaker-premium-card ${s.is_featured ? 'is-featured' : ''}">
      <div class="speaker-image-wrap">
        ${s.image_url ? `<img class="speaker-photo" src="${esc(s.image_url)}" alt="${esc(s.name)}" loading="lazy" onerror="this.onerror=null;this.src=\'assets/kevey-bella.jpeg.PNG';">` : `<div class="speaker-photo placeholder">${esc((s.name || '?').charAt(0))}</div>`}
        ${s.is_featured ? '<span class="profile-tag floating-tag">⭐ Kiemelt előadó</span>' : ""}
      </div>
      <div class="speaker-body">
        <p class="speaker-label">Előadó</p>
        <h2>${esc(s.name)}</h2>
        ${s.subtitle ? `<p class="speaker-subtitle">${esc(s.subtitle)}</p>` : ""}
        ${s.motto ? `<blockquote class="speaker-motto">„${esc(s.motto)}”</blockquote>` : ""}
        ${lead ? `<p class="speaker-lead">${esc(lead)}</p>` : ""}
        ${topics.length ? `<div class="speaker-topic-list">${topics.map(t => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
        ${details.length ? `<details class="speaker-details"><summary>Bemutatkozás</summary>${details.map(p => `<p>${esc(p)}</p>`).join("")}</details>` : ""}
        <div class="speaker-links">
          ${s.facebook_url ? `<a href="${esc(s.facebook_url)}" target="_blank" rel="noopener">Facebook</a>` : ""}
          ${s.instagram_url ? `<a href="${esc(s.instagram_url)}" target="_blank" rel="noopener">Instagram</a>` : ""}
          ${s.youtube_url ? `<a href="${esc(s.youtube_url)}" target="_blank" rel="noopener">YouTube</a>` : ""}
          ${s.website_url ? `<a href="${esc(s.website_url)}" target="_blank" rel="noopener">Riport / weboldal</a>` : ""}
        </div>
      </div>
    </article>
  `;
}

async function loadPublicSpeakers() {
  const el = document.getElementById("speakerList");
  const { data, error } = await client.from("speakers").select("*").eq("is_published", true).order("sort_order", { ascending: true });
  let speakers = (!error && data && data.length) ? data : [];

  LOCAL_SPEAKERS.forEach(local => {
    const exists = speakers.some(s => String(s.name || "").toLowerCase().trim() === local.name.toLowerCase().trim());
    if (!exists) speakers.push(local);
  });

  speakers = speakers
    .filter(s => s && s.is_published !== false)
    .sort((a,b) => Number(a.sort_order || 100) - Number(b.sort_order || 100));

  if (!speakers.length) {
    el.innerHTML = `<article class="profile-card featured-profile"><span class="profile-tag">Kiemelt előadó</span><h2>Hamarosan</h2><p>Az előadók bemutatkozása hamarosan felkerül.</p></article>`;
    return;
  }
  el.innerHTML = speakers.map(renderSpeakerCard).join("");
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
