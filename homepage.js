const SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function updateCountdown() {
  const eventDate = new Date("2026-07-25T09:00:00+02:00");
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    return;
  }

  const minutesTotal = Math.floor(diff / 1000 / 60);
  const days = Math.floor(minutesTotal / (60 * 24));
  const hours = Math.floor((minutesTotal - days * 60 * 24) / 60);
  const minutes = minutesTotal % 60;

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
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
