const SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function setTextIfExists(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function updateCountdown() {
  const eventDate = new Date("2026-07-25T09:00:00+02:00");
  const now = new Date();
  const diff = eventDate - now;
  const minutesTotal = Math.max(0, Math.floor(diff / 1000 / 60));
  const days = Math.floor(minutesTotal / (60 * 24));
  const hours = Math.floor((minutesTotal - days * 60 * 24) / 60);
  const minutes = minutesTotal % 60;

  setTextIfExists("days", days);
  setTextIfExists("hours", hours);
  setTextIfExists("minutes", minutes);
}

async function loadParticipantCounter() {
  try {
    const { data, error } = await client.rpc("public_participant_count");
    if (error) throw error;
    const count = Number(data || 0);
    const wrapper = document.getElementById("participantCounter");
    const number = document.getElementById("participantCount") || document.getElementById("registeredCount") || document.getElementById("registrationCounter");
    if (!wrapper && !number) return;

    if (count >= 200) {
      if (number) number.textContent = "Már több mint " + count + " fő jelentkezett";
      if (wrapper) wrapper.classList.remove("hidden", "is-hidden-under-200");
    } else {
      if (wrapper) wrapper.classList.add("hidden", "is-hidden-under-200");
    }
  } catch (error) {
    console.log("Résztvevőszámláló nem elérhető:", error);
  }
}

updateCountdown();
setInterval(updateCountdown, 60000);
loadParticipantCounter();


// Premium előadói sor: automatikus, finom lapozás
(function(){
  function initSpeakerAutoscroll(){
    var strip = document.getElementById('speakerList');
    if(!strip || strip.dataset.autoscrollReady === '1') return;
    strip.dataset.autoscrollReady = '1';
    var paused = false;
    strip.addEventListener('mouseenter', function(){ paused = true; });
    strip.addEventListener('mouseleave', function(){ paused = false; });
    strip.addEventListener('touchstart', function(){ paused = true; }, {passive:true});
    strip.addEventListener('touchend', function(){ setTimeout(function(){ paused = false; }, 2500); }, {passive:true});
    setInterval(function(){
      if(paused || strip.scrollWidth <= strip.clientWidth) return;
      var card = strip.querySelector('.f33-speaker, .speaker-premium-card');
      var step = card ? (card.getBoundingClientRect().width + 20) : 320;
      if(strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 20){
        strip.scrollTo({left:0, behavior:'smooth'});
      }else{
        strip.scrollBy({left:step, behavior:'smooth'});
      }
    }, 4200);
  }
  document.addEventListener('DOMContentLoaded', initSpeakerAutoscroll);
  window.addEventListener('load', initSpeakerAutoscroll);
  setTimeout(initSpeakerAutoscroll, 1200);
})();
