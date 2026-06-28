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
;

const PUBLIC_HUNGARY_BORDER = [
  [48.585,22.155],[48.455,22.710],[48.165,22.885],[47.830,22.885],
  [47.585,22.620],[47.680,22.240],[47.930,21.985],[48.105,21.450],
  [48.430,20.750],[48.560,20.165],[48.030,19.620],[48.150,18.860],
  [47.890,18.570],[47.760,18.030],[47.880,17.230],[47.730,16.650],
  [47.360,16.440],[46.870,16.085],[46.510,16.280],[46.375,16.800],
  [46.060,17.045],[45.760,17.640],[45.750,18.425],[45.790,18.910],
  [46.060,18.960],[46.020,19.500],[46.180,20.000],[46.170,20.720],
  [46.310,21.120],[46.680,21.450],[46.930,21.780],[47.210,22.050],
  [47.710,22.130],[48.035,22.340],[48.585,22.155]
];

const PUBLIC_MAIN_CITY_LABELS = [
  { name:"Budapest", coords:[47.4979,19.0402] },
  { name:"Győr", coords:[47.6875,17.6504] },
  { name:"Székesfehérvár", coords:[47.1860,18.4221] },
  { name:"Pécs", coords:[46.0727,18.2323] },
  { name:"Kecskemét", coords:[46.9062,19.6913] },
  { name:"Szeged", coords:[46.2530,20.1414] },
  { name:"Szolnok", coords:[47.1621,20.1825] },
  { name:"Debrecen", coords:[47.5316,21.6273] },
  { name:"Miskolc", coords:[48.1035,20.7784] },
  { name:"Nyíregyháza", coords:[47.9495,21.7244] },
  { name:"Kalocsa", coords:[46.5290,18.9728] },
  { name:"Öregcsertő", coords:[46.5007,19.1116], home:true }
];

function addPublicHungaryContext(map) {
  if (!map || typeof L === "undefined") return;

  L.polyline(PUBLIC_HUNGARY_BORDER, {
    color: "#4b2814",
    weight: 3,
    opacity: .9,
    smoothFactor: .7,
    interactive: false,
    className: "f33-hungary-border"
  }).addTo(map);

  PUBLIC_MAIN_CITY_LABELS.forEach(city => {
    const label = L.divIcon({
      className: "",
      html: `<span class="f33-map-city-label${city.home ? " is-home" : ""}">${city.name}</span>`,
      iconSize: null,
      iconAnchor: [0, 0]
    });

    L.marker(city.coords, {
      icon: label,
      interactive: false,
      keyboard: false,
      zIndexOffset: city.home ? 550 : 350
    }).addTo(map);
  });
}

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

async function initPublicForumMap() {
  const mapEl = document.getElementById("publicForumMap");
  const noteEl = document.getElementById("publicMapNote");
  if (!mapEl || typeof L === "undefined" || typeof supabase === "undefined") return;

  const client = supabase.createClient(PUBLIC_MAP_SUPABASE_URL, PUBLIC_MAP_SUPABASE_ANON_KEY);

  const map = L.map(mapEl, {
    zoomControl: false,
    attributionControl: false,
    dragging: true,
    touchZoom: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    boxZoom: true
  }).setView([47.05, 19.35], 7);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
    maxZoom: 14
  }).addTo(map);

  L.control.zoom({ position: "bottomright" }).addTo(map);
  addPublicHungaryContext(map);

  const bounds = [];
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

  // Ha még nincs megjeleníthető település, legalább a helyszín legyen rajta.
  if (!knownCities.size && PUBLIC_CITY_COORDS["öregcsertő"]) {
    knownCities.add("öregcsertő");
  }

  knownCities.forEach(key => {
    const coords = PUBLIC_CITY_COORDS[key];
    bounds.push(coords);

    const dot = L.divIcon({
      className: "f33-map-dot",
      html: "<span></span>",
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    L.marker(coords, { icon: dot, keyboard: false }).addTo(map);
  });

  if (bounds.length > 1) {
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: 8 });
  } else {
    map.fitBounds(PUBLIC_HUNGARY_BORDER, { padding: [18, 18], maxZoom: 7 });
  }

  if (noteEl) {
    noteEl.textContent = knownCities.size > 1
      ? "A pontok azt mutatják, mely településekről érkeznek résztvevők."
      : "A térkép a regisztrációk alapján frissül.";
  }

  setTimeout(() => map.invalidateSize(), 400);
}

document.addEventListener("DOMContentLoaded", initPublicForumMap);
