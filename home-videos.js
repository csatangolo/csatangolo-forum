// Főoldali YouTube videó váltó a CMS videos táblából
const HV_SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const HV_SUPABASE_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";
const hvClient = supabase.createClient(HV_SUPABASE_URL, HV_SUPABASE_KEY);

function hvEsc(str) {
  return String(str || "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
function hvEmbed(url) {
  const s = String(url || "");
  let id = "";
  if (s.includes("youtu.be/")) id = s.split("youtu.be/")[1].split(/[?&]/)[0];
  if (s.includes("watch?v=")) id = s.split("watch?v=")[1].split("&")[0];
  if (s.includes("/embed/")) id = s.split("/embed/")[1].split(/[?&]/)[0];
  return id ? `https://www.youtube.com/embed/${id}` : "";
}
async function loadHomeVideo() {
  const box = document.getElementById("homeVideoBox");
  if (!box) return;
  const { data, error } = await hvClient.from("videos").select("*").eq("is_published", true).order("sort_order", { ascending: true });
  if (error || !data || !data.length) return;
  const video = data[Math.floor(Math.random() * data.length)];
  const embed = hvEmbed(video.youtube_url);
  if (!embed) return;
  box.innerHTML = `
    <iframe class="yt hero-yt" src="${embed}" title="${hvEsc(video.title)}" allowfullscreen></iframe>
    <h3>${hvEsc(video.title)}</h3>
    <p>${hvEsc(video.description || "")}</p>
  `;
}
loadHomeVideo();
