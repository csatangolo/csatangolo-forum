const SUPABASE_URL = "https://ywkabsgazkzrjgjncbfc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DJvD1Hoou3Tn74T9BFx0ww_O6ObFlxY";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const BUCKET = "forum-assets";

function slug(s) {
  return String(s || "file").toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "file";
}

document.getElementById("mediaUploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const msg = document.getElementById("uploadMessage");
  const file = form.elements.file.files[0];

  if (!file) return;

  msg.className = "form-message";
  msg.textContent = "Feltöltés folyamatban...";

  try {
    const folder = file.type.startsWith("video/") ? "visitor-videos" : "visitor-photos";
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}-${slug(file.name)}.${ext}`;

    const { error: uploadError } = await client.storage.from(BUCKET).upload(path, file, { upsert: false });
    if (uploadError) throw uploadError;

    const { data } = client.storage.from(BUCKET).getPublicUrl(path);

    const { error: dbError } = await client.from("media_uploads").insert({
      uploader_name: form.elements.uploader_name.value.trim(),
      note: form.elements.note.value.trim(),
      file_url: data.publicUrl,
      file_type: file.type,
      is_approved: false
    });

    if (dbError) throw dbError;

    msg.className = "form-message success";
    msg.textContent = "Köszönjük! A feltöltés sikeresen megérkezett a szervezőkhöz.";
    form.reset();
  } catch (error) {
    console.error(error);
    msg.className = "form-message error";
    msg.textContent = "Nem sikerült feltölteni. Ellenőrizd, hogy lefutott-e a Master SQL.";
  }
});
