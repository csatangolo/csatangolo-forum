CSATANGOLÓ FÓRUM – V7.2 RÉSZTVEVŐI PROFIL

GitHubra töltsd fel / írd felül az összes fájlt ebből a ZIP-ből.

Új oldal:
- profil.html
- profil.js

Működés:
- A köszönőoldalról megnyitható a "Saját belépőim" oldal.
- Egy konkrét belépő így is megnyitható:
  profil.html?code=FORUM-2026-...
- A résztvevői profil mutatja a QR-kódot, a státuszt és a fontos tudnivalókat.

Supabase:
Ha a V6 már működik, nem muszáj SQL-t futtatni.
Ha a profil oldal nem tudja betölteni a konkrét belépőt, futtasd le:
supabase_v7_2_profil_update.sql
