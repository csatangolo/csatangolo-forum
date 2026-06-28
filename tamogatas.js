const SUPABASE_URL="https://ywkabsgazkzrjgjncbfc.supabase.co";const SUPABASE_ANON_KEY="sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";const client=supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);function slug(s){return String(s||"logo").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"logo"}document.getElementById("supportForm")?.addEventListener("submit",async e=>{e.preventDefault();const f=e.target,msg=document.getElementById("supportMessage");msg.textContent="Küldés folyamatban...";try{let logo_url="";const file=f.elements.logo.files[0];if(file){const ext=file.name.split(".").pop();const path=`support-logos/${Date.now()}-${slug(file.name)}.${ext}`;const {error}=await client.storage.from("forum-assets").upload(path,file,{upsert:false});if(error)throw error;logo_url=client.storage.from("forum-assets").getPublicUrl(path).data.publicUrl;}const {error:db}=await client.from("support_offers").insert({supporter_name:f.elements.supporter_name.value.trim(),email:f.elements.email.value.trim(),phone:f.elements.phone.value.trim(),support_type:f.elements.support_type.value,amount_text:f.elements.amount.value.trim(),support_details:f.elements.support_details.value.trim(),logo_url,anonymous:f.elements.anonymous.checked,public_display:f.elements.public_display.checked,status:"pending"});if(db)throw db;msg.className="form-message success";msg.textContent="Köszönjük! A támogatási szándék beérkezett, jóváhagyás után kerülhet megjelenítésre.";f.reset();}catch(err){console.error(err);msg.className="form-message error";msg.textContent="Nem sikerült elküldeni. Ellenőrizd, hogy lefutott-e a Master SQL.";}});

// Stripe Payment Linkek – ide másold majd be a Stripe-ban létrehozott linkeket.
const STRIPE_PAYMENT_LINKS = {
  "5000": "",
  "10000": "",
  "20000": "",
  "custom": ""
};

document.querySelectorAll("[data-stripe-amount]").forEach(btn => {
  const amount = btn.dataset.stripeAmount;
  const link = STRIPE_PAYMENT_LINKS[amount];
  if (link) {
    btn.href = link;
    btn.target = "_blank";
    btn.rel = "noopener";
  } else if (amount !== "custom") {
    btn.addEventListener("click", e => {
      e.preventDefault();
      alert("A Stripe fizetési link még nincs beállítva ehhez az összeghez.");
    });
  }
});

async function loadSupportersPublic() {
  const list = document.getElementById("supporterList");
  if (!list || typeof supabase === "undefined") return;
  try {
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data, error } = await client
      .from("supports")
      .select("*")
      .eq("public_display", true)
      .order("created_at", { ascending: false })
      .limit(30);

    if (error || !data || !data.length) return;

    list.innerHTML = data.map(s => `
      <article class="supporter-card">
        <div class="supporter-logo">${s.logo_url ? `<img src="${String(s.logo_url).replaceAll('"','&quot;')}" alt="">` : "♞"}</div>
        <h3>${s.anonymous ? "Névtelen támogató" : String(s.supporter_name || "Támogató").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}</h3>
        <p>${String(s.support_type || "Támogatás").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}</p>
      </article>
    `).join("");
  } catch (e) {
    console.log("Támogatók betöltése nem elérhető:", e);
  }
}
document.addEventListener("DOMContentLoaded", loadSupportersPublic);
