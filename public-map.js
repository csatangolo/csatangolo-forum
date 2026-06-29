const PUBLIC_MAP_SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const PUBLIC_MAP_SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";

const PUBLIC_CITY_COORDS = {
  "budapest":[47.4979,19.0402],"kecskemét":[46.9062,19.6913],"kecskemet":[46.9062,19.6913],"kalocsa":[46.5290,18.9728],"öregcsertő":[46.5007,19.1116],"oregcserto":[46.5007,19.1116],"homokmégy":[46.4881,19.0740],"homokmegy":[46.4881,19.0740],"baja":[46.1829,18.9536],"szeged":[46.2530,20.1414],"debrecen":[47.5316,21.6273],"pécs":[46.0727,18.2323],"pecs":[46.0727,18.2323],"győr":[47.6875,17.6504],"gyor":[47.6875,17.6504],"miskolc":[48.1035,20.7784],"nyíregyháza":[47.9495,21.7244],"nyiregyhaza":[47.9495,21.7244],"székesfehérvár":[47.1860,18.4221],"szekesfehervar":[47.1860,18.4221],"szolnok":[47.1621,20.1825],"kaposvár":[46.3594,17.7968],"kaposvar":[46.3594,17.7968],"paks":[46.6229,18.8557],"dunapataj":[46.6425,18.9966],"harta":[46.6971,19.0306],"dusnok":[46.3907,18.9643],"fajsz":[46.4205,18.9222],"bátya":[46.4881,18.9548],"batya":[46.4881,18.9548],"solt":[46.8010,19.0003],"kiskőrös":[46.6214,19.2853],"kiskoros":[46.6214,19.2853],"kiskunhalas":[46.4319,19.4875],"kiskunfélegyháza":[46.7118,19.8446],"kiskunfelegyhaza":[46.7118,19.8446],"szekszárd":[46.3474,18.7062],"szekszard":[46.3474,18.7062]
};
const PUBLIC_MAIN_CITIES = [["Budapest",47.4979,19.0402],["Kecskemét",46.9062,19.6913],["Kalocsa",46.5290,18.9728],["Öregcsertő",46.5007,19.1116],["Baja",46.1829,18.9536],["Szeged",46.2530,20.1414],["Pécs",46.0727,18.2323],["Szolnok",47.1621,20.1825],["Székesfehérvár",47.1860,18.4221]];
function publicNormalizeCity(city){return String(city||"").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/^\d{4}\s*/,"").replace(/,.*$/,"").replace(/\s+/g," ");}
function publicDisplayCity(city){const raw=String(city||"").trim().replace(/^\d{4}\s*/,"");return raw?raw.charAt(0).toUpperCase()+raw.slice(1):"";}
function cityKeyVariants(city){const k=publicNormalizeCity(city);return [k, String(city||"").trim().toLowerCase()];}
function findCoords(city){for(const k of cityKeyVariants(city)){ if(PUBLIC_CITY_COORDS[k]) return PUBLIC_CITY_COORDS[k]; } return null;}
function makeCityLabel(name){return L.divIcon({className:"f33-real-map-label",html:`<span>${name}</span>`,iconSize:[122,24],iconAnchor:[61,12]});}
function makePin(city){return L.divIcon({className:"f33-real-map-pin",html:`<span></span><b>${city}</b>`,iconSize:[115,36],iconAnchor:[18,18]});}

async function initPublicForumMap(){
  const mapEl=document.getElementById("publicForumMap");
  const noteEl=document.getElementById("publicMapNote");
  if(!mapEl || typeof L==="undefined") return;
  mapEl.innerHTML="";
  const map=L.map(mapEl,{zoomControl:false,attributionControl:false,scrollWheelZoom:true,doubleClickZoom:true,dragging:true,touchZoom:true}).setView([46.62,19.18],8);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:14}).addTo(map);
  L.control.zoom({position:"bottomright"}).addTo(map);
  PUBLIC_MAIN_CITIES.forEach(([name,lat,lng])=>L.marker([lat,lng],{icon:makeCityLabel(name),interactive:false,keyboard:false}).addTo(map));

  const cities=new Map();
  try{
    if(typeof supabase!=="undefined"){
      const client=supabase.createClient(PUBLIC_MAP_SUPABASE_URL,PUBLIC_MAP_SUPABASE_ANON_KEY);
      const [pRes,rRes]=await Promise.allSettled([
        client.from("participants").select("city").not("city","is",null).limit(1000),
        client.from("registrations").select("city").not("city","is",null).limit(1000)
      ]);
      [pRes,rRes].forEach(res=>{
        if(res.status==="fulfilled" && res.value && !res.value.error){
          (res.value.data||[]).forEach(row=>{const coords=findCoords(row.city); if(coords) cities.set(publicNormalizeCity(row.city),{name:publicDisplayCity(row.city),coords});});
        }
      });
    }
  }catch(e){console.warn("Publikus térkép adatbetöltési hiba:",e);}
  if(!cities.size){
    [["Öregcsertő",[46.5007,19.1116]],["Kalocsa",[46.5290,18.9728]],["Kecskemét",[46.9062,19.6913]]].forEach(([name,coords])=>cities.set(publicNormalizeCity(name),{name,coords}));
    if(noteEl) noteEl.textContent="A térkép a regisztrációk alapján frissül; jelenleg mintapontokat mutat.";
  }else if(noteEl){ noteEl.textContent="A pontok azt mutatják, mely településekről érkeznek résztvevők."; }
  const bounds=[];
  cities.forEach(({name,coords})=>{bounds.push(coords);L.marker(coords,{icon:makePin(name),keyboard:false}).addTo(map).bindTooltip(name,{direction:"top",offset:[0,-12],className:"f33-real-tooltip"});});
  if(bounds.length>1) map.fitBounds(bounds,{padding:[42,42],maxZoom:9});
  setTimeout(()=>map.invalidateSize(),300);
  setTimeout(()=>map.invalidateSize(),1000);
}
document.addEventListener("DOMContentLoaded",initPublicForumMap);
