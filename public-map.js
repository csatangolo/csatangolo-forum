const PUBLIC_MAP_SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const PUBLIC_MAP_SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";

const PUBLIC_CITY_COORDS = {
  "budapest":[47.4979,19.0402],
  "kecskemét":[46.9062,19.6913],
  "kecskemet":[46.9062,19.6913],
  "kalocsa":[46.5290,18.9728],
  "öregcsertő":[46.5007,19.1116],
  "oregcserto":[46.5007,19.1116],
  "homokmégy":[46.4881,19.0740],
  "homokmegy":[46.4881,19.0740],
  "baja":[46.1829,18.9536],
  "szeged":[46.2530,20.1414],
  "debrecen":[47.5316,21.6273],
  "pécs":[46.0727,18.2323],
  "pecs":[46.0727,18.2323],
  "győr":[47.6875,17.6504],
  "gyor":[47.6875,17.6504],
  "miskolc":[48.1035,20.7784],
  "nyíregyháza":[47.9495,21.7244],
  "nyiregyhaza":[47.9495,21.7244],
  "székesfehérvár":[47.1860,18.4221],
  "szekesfehervar":[47.1860,18.4221],
  "szombathely":[47.2307,16.6218],
  "szolnok":[47.1621,20.1825],
  "tatabánya":[47.5692,18.4048],
  "tatabanya":[47.5692,18.4048],
  "kaposvár":[46.3594,17.7968],
  "kaposvar":[46.3594,17.7968],
  "békéscsaba":[46.6736,21.0877],
  "bekescsaba":[46.6736,21.0877],
  "eger":[47.9025,20.3772],
  "zalaegerszeg":[46.8417,16.8416],
  "veszprém":[47.1028,17.9093],
  "veszprem":[47.1028,17.9093],
  "sopron":[47.6817,16.5845],
  "hódmezővásárhely":[46.4181,20.3300],
  "hodmezovasarhely":[46.4181,20.3300],
  "dunaújváros":[46.9619,18.9355],
  "dunaujvaros":[46.9619,18.9355],
  "cegléd":[47.1727,19.7995],
  "cegled":[47.1727,19.7995],
  "nagykőrös":[47.0342,19.7786],
  "nagykoros":[47.0342,19.7786],
  "kiskőrös":[46.6214,19.2853],
  "kiskoros":[46.6214,19.2853],
  "kiskunhalas":[46.4319,19.4875],
  "kiskunfélegyháza":[46.7118,19.8446],
  "kiskunfelegyhaza":[46.7118,19.8446],
  "kiskunmajsa":[46.4902,19.7407],
  "soltvadkert":[46.5789,19.3937],
  "solt":[46.8010,19.0003],
  "dunapataj":[46.6425,18.9966],
  "harta":[46.6971,19.0306],
  "dusnok":[46.3907,18.9643],
  "fajsz":[46.4205,18.9222],
  "bátya":[46.4887,18.9548],
  "batya":[46.4887,18.9548],
  "sükösd":[46.2815,18.9957],
  "sukosd":[46.2815,18.9957],
  "hajós":[46.3984,19.1205],
  "hajos":[46.3984,19.1205],
  "nemesnádudvar":[46.3333,19.0500],
  "nemesnadudvar":[46.3333,19.0500],
  "császártöltés":[46.4213,19.1833],
  "csaszartoltes":[46.4213,19.1833],
  "mélykút":[46.2167,19.3833],
  "melykut":[46.2167,19.3833],
  "jánoshalma":[46.2981,19.3250],
  "janoshalma":[46.2981,19.3250],
  "dunavecse":[46.9148,18.9714],
  "kunszentmiklós":[47.0267,19.1256],
  "kunszentmiklos":[47.0267,19.1256],
  "lajosmizse":[47.0213,19.5617],
  "izsák":[46.8045,19.3511],
  "izsak":[46.8045,19.3511],
  "akásztó":[46.6917,19.2042],
  "akaszto":[46.6917,19.2042],
  "tabdi":[46.6822,19.3075],
  "kecel":[46.5257,19.2518],
  "csengőd":[46.7153,19.2686],
  "csengod":[46.7153,19.2686],
  "imrehegy":[46.4869,19.3044],
  "tázlár":[46.5489,19.5147],
  "tazlar":[46.5489,19.5147],
  "fülöpszállás":[46.8209,19.2372],
  "fulopszallas":[46.8209,19.2372],
  "szekszárd":[46.3474,18.7062],
  "szekszard":[46.3474,18.7062],
  "paks":[46.6229,18.8557],
  "tolna":[46.4268,18.7825],
  "mohács":[45.9931,18.6830],
  "mohacs":[45.9931,18.6830],
  "siófok":[46.9041,18.0580],
  "siofok":[46.9041,18.0580],
  "dombóvár":[46.3766,18.1360],
  "dombovar":[46.3766,18.1360],
  "gyöngyös":[47.7826,19.9280],
  "gyongyos":[47.7826,19.9280],
  "hatvan":[47.6667,19.6833],
  "gödöllő":[47.5970,19.3552],
  "godollo":[47.5970,19.3552],
  "vác":[47.7759,19.1361],
  "vac":[47.7759,19.1361],
  "esztergom":[47.7857,18.7403],
  "komárom":[47.7432,18.1191],
  "komarom":[47.7432,18.1191],
  "ajka":[47.1010,17.5522],
  "pápa":[47.3300,17.4674],
  "papa":[47.3300,17.4674],
  "mosonmagyaróvár":[47.8679,17.2699],
  "mosonmagyarovar":[47.8679,17.2699],
  "sárvár":[47.2530,16.9352],
  "sarvar":[47.2530,16.9352],
  "nagykanizsa":[46.4590,16.9897],
  "keszthely":[46.7681,17.2432],
  "salgótarján":[48.1030,19.8030],
  "salgotarjan":[48.1030,19.8030],
  "ózd":[48.2167,20.3000],
  "ozd":[48.2167,20.3000],
  "kazincbarcika":[48.2500,20.6333],
  "mezőkövesd":[47.8067,20.5717],
  "mezokovesd":[47.8067,20.5717],
  "szerencs":[48.1631,21.2050],
  "tokaj":[48.1167,21.4167],
  "mátészalka":[47.9553,22.3235],
  "mateszalka":[47.9553,22.3235],
  "kisvárda":[48.2167,22.0833],
  "kisvarda":[48.2167,22.0833],
  "hajdúböszörmény":[47.6667,21.5167],
  "hajduboszormeny":[47.6667,21.5167],
  "hajdúszoboszló":[47.4431,21.3917],
  "hajduszoboszlo":[47.4431,21.3917],
  "karcag":[47.3167,20.9333],
  "törökszentmiklós":[47.1833,20.4167],
  "torokszentmiklos":[47.1833,20.4167],
  "mezőtúr":[47.0000,20.6333],
  "mezotur":[47.0000,20.6333],
  "orosháza":[46.5667,20.6667],
  "oroshaza":[46.5667,20.6667],
  "gyula":[46.6500,21.2833],
  "szentes":[46.6500,20.2667],
  "makó":[46.2167,20.4833],
  "mako":[46.2167,20.4833],
  "csongrád":[46.7133,20.1422],
  "csongrad":[46.7133,20.1422]
};

const PUBLIC_MAIN_CITIES = [
  ["Budapest", 47.4979, 19.0402],
  ["Győr", 47.6875, 17.6504],
  ["Pécs", 46.0727, 18.2323],
  ["Szeged", 46.2530, 20.1414],
  ["Debrecen", 47.5316, 21.6273],
  ["Miskolc", 48.1035, 20.7784],
  ["Kecskemét", 46.9062, 19.6913],
  ["Kalocsa", 46.5290, 18.9728],
  ["Öregcsertő", 46.5007, 19.1116]
];

function publicNormalizeCity(city) {
  return String(city || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/,.*$/, "")
    .replace(/^\d{4}\s*/, "");
}

function publicDisplayCity(city) {
  const c = String(city || "").trim().replace(/^\d{4}\s*/, "");
  return c ? c.charAt(0).toUpperCase() + c.slice(1) : "";
}

function projectCity(lat, lng) {
  // Approximate Hungary bounding box projection into SVG viewBox.
  const minLng = 16.0, maxLng = 23.0;
  const minLat = 45.6, maxLat = 48.8;
  const x = 120 + ((lng - minLng) / (maxLng - minLng)) * 760;
  const y = 520 - ((lat - minLat) / (maxLat - minLat)) * 390;
  return [Math.max(60, Math.min(940, x)), Math.max(70, Math.min(570, y))];
}

async function initPublicForumMap() {
  const mapEl = document.getElementById("publicForumMap");
  const noteEl = document.getElementById("publicMapNote");
  if (!mapEl || typeof supabase === "undefined") return;

  const client = supabase.createClient(PUBLIC_MAP_SUPABASE_URL, PUBLIC_MAP_SUPABASE_ANON_KEY);
  const knownCities = new Set();

  try {
    const { data, error } = await client
      .from("participants")
      .select("city")
      .not("city", "is", null)
      .limit(1000);

    if (error) throw error;

    (data || []).forEach(row => {
      const key = publicNormalizeCity(row.city);
      if (key && PUBLIC_CITY_COORDS[key]) knownCities.add(key);
    });
  } catch (e) {
    console.warn("Publikus térkép adatbetöltési hiba:", e);
  }

  if (!knownCities.size && PUBLIC_CITY_COORDS["öregcsertő"]) {
    knownCities.add("öregcsertő");
  }

  const pinMarkup = Array.from(knownCities).map((key, index) => {
    const coords = PUBLIC_CITY_COORDS[key];
    const [lat, lng] = coords;
    const [x, y] = projectCity(lat, lng);
    const delay = (index % 6) * 0.22;
    return `<button class="f33-map-pin" style="left:${x}px;top:${y}px;--d:${delay}s" title="${publicDisplayCity(key)}" aria-label="${publicDisplayCity(key)}"><span></span></button>`;
  }).join("");

  const labelMarkup = PUBLIC_MAIN_CITIES.map(([name, lat, lng]) => {
    const [x, y] = projectCity(lat, lng);
    return `<span class="f33-map-city-label" style="left:${x}px;top:${y}px">${name}</span>`;
  }).join("");

  mapEl.innerHTML = `
    <div class="f33-map-stage" id="publicMapStage">
      <svg class="f33-hungary-svg" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="huLand" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#f6e4c4"/>
            <stop offset="48%" stop-color="#d8ad70"/>
            <stop offset="100%" stop-color="#8f5d32"/>
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="20" stdDeviation="18" flood-color="#2b1509" flood-opacity=".35"/>
          </filter>
        </defs>

        <path class="f33-map-glow" d="M124 329 C169 239, 255 201, 340 171 C440 137, 527 92, 615 132 C705 172, 784 185, 858 247 C921 300, 905 389, 828 430 C753 471, 687 490, 591 493 C487 496, 429 528, 330 489 C235 452, 92 437, 124 329 Z"/>
        <path class="f33-map-land" filter="url(#softShadow)" d="M124 329 C169 239, 255 201, 340 171 C440 137, 527 92, 615 132 C705 172, 784 185, 858 247 C921 300, 905 389, 828 430 C753 471, 687 490, 591 493 C487 496, 429 528, 330 489 C235 452, 92 437, 124 329 Z"/>

        <path class="f33-map-river" d="M435 150 C421 205, 468 238, 448 286 C430 331, 390 354, 408 410 C421 449, 478 463, 475 501"/>
        <path class="f33-map-river second" d="M660 184 C626 222, 620 275, 655 316 C691 358, 688 402, 644 456"/>

        <path class="f33-map-route" d="M266 370 C353 310, 453 306, 544 334 C644 365, 722 333, 809 272"/>
        <circle class="f33-map-home" cx="${projectCity(46.5007, 19.1116)[0]}" cy="${projectCity(46.5007, 19.1116)[1]}" r="10"/>
      </svg>
      <div class="f33-map-labels">${labelMarkup}</div>
      <div class="f33-map-pins">${pinMarkup}</div>
    </div>
    <div class="f33-map-controls">
      <button type="button" id="mapZoomIn">+</button>
      <button type="button" id="mapZoomOut">−</button>
      <button type="button" id="mapZoomReset">↺</button>
    </div>
  `;

  let zoom = 1;
  const stage = document.getElementById("publicMapStage");
  function applyZoom() {
    stage.style.transform = `scale(${zoom})`;
  }

  document.getElementById("mapZoomIn").addEventListener("click", () => {
    zoom = Math.min(1.55, +(zoom + 0.12).toFixed(2));
    applyZoom();
  });
  document.getElementById("mapZoomOut").addEventListener("click", () => {
    zoom = Math.max(.88, +(zoom - 0.12).toFixed(2));
    applyZoom();
  });
  document.getElementById("mapZoomReset").addEventListener("click", () => {
    zoom = 1;
    applyZoom();
  });

  mapEl.addEventListener("wheel", (e) => {
    e.preventDefault();
    zoom = e.deltaY < 0 ? Math.min(1.55, zoom + .08) : Math.max(.88, zoom - .08);
    zoom = +zoom.toFixed(2);
    applyZoom();
  }, { passive:false });

  if (noteEl) {
    noteEl.textContent = knownCities.size > 1
      ? "A pontok azt mutatják, mely településekről érkeznek résztvevők."
      : "A térkép a regisztrációk alapján frissül.";
  }
}

document.addEventListener("DOMContentLoaded", initPublicForumMap);
