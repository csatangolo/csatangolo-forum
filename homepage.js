const SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function updateCountdown() {
  const eventDate = new Date("2026-07-25T09:00:00+02:00");
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    ["f33Days","days"].forEach(id=>{const e=document.getElementById(id); if(e) e.textContent="0";});
    ["f33Hours","hours"].forEach(id=>{const e=document.getElementById(id); if(e) e.textContent="0";});
    ["f33Minutes","minutes"].forEach(id=>{const e=document.getElementById(id); if(e) e.textContent="0";});
    return;
  }

  const minutesTotal = Math.floor(diff / 1000 / 60);
  const days = Math.floor(minutesTotal / (60 * 24));
  const hours = Math.floor((minutesTotal - days * 60 * 24) / 60);
  const minutes = minutesTotal % 60;

  ["f33Days","days"].forEach(id=>{const e=document.getElementById(id); if(e) e.textContent=days;});
  ["f33Hours","hours"].forEach(id=>{const e=document.getElementById(id); if(e) e.textContent=hours;});
  ["f33Minutes","minutes"].forEach(id=>{const e=document.getElementById(id); if(e) e.textContent=minutes;});
}

async function loadParticipantCounter() {
  try {
    const { data, error } = await client.rpc("public_participant_count");
    if (error) throw error;
    const count = Number(data || 0);
    if (count >= 200) {
      document.getElementById("participantCount").textContent = count;
      document.getElementById("participantCounter").classList.remove("hidden");
    }
  } catch (error) {
    console.log("Résztvevőszámláló nem elérhető:", error);
  }
}

updateCountdown();
setInterval(updateCountdown, 60000);
loadParticipantCounter();


// Csatangoló finomítás: jelentkezők száma csak 200 főtől látszódjon
function hideRegistrationCountUnder200(){
  var el = document.getElementById('participantCounter') || document.getElementById('registeredCount') || document.getElementById('registrationCounter');
  if(!el) return;
  var n = parseInt((el.textContent || '').replace(/[^0-9]/g,''), 10) || 0;
  var holder = el.closest('.f33-ribbon, .registration-ribbon, .participant-counter, .counter-card, section, div') || el.parentElement;
  if(n < 200){
    if(holder) holder.classList.add('is-hidden-under-200');
  }else{
    if(holder) holder.classList.remove('is-hidden-under-200');
    el.textContent = 'Már több mint ' + n + ' fő jelentkezett';
  }
}
document.addEventListener('DOMContentLoaded', hideRegistrationCountUnder200);
window.addEventListener('load', hideRegistrationCountUnder200);
setTimeout(hideRegistrationCountUnder200, 800);
setTimeout(hideRegistrationCountUnder200, 1800);


function initSpeakerAutoSlider(){
  const strip = document.querySelector('[data-auto-slider="true"]');
  if(!strip) return;
  let paused = false;
  const getStep = () => {
    const card = strip.querySelector('.f33-speaker');
    return card ? Math.round(card.getBoundingClientRect().width + 20) : 340;
  };
  function next(){
    if(paused) return;
    const max = strip.scrollWidth - strip.clientWidth - 12;
    if(strip.scrollLeft >= max){
      strip.scrollTo({left:0, behavior:'smooth'});
    }else{
      strip.scrollBy({left:getStep(), behavior:'smooth'});
    }
  }
  strip.addEventListener('mouseenter',()=>paused=true);
  strip.addEventListener('mouseleave',()=>paused=false);
  strip.addEventListener('touchstart',()=>paused=true,{passive:true});
  strip.addEventListener('touchend',()=>setTimeout(()=>paused=false,2500),{passive:true});
  setInterval(next, 4200);
}

document.addEventListener('DOMContentLoaded', initSpeakerAutoSlider);
