# Csatangoló Fórum – V11 Rendszerellenőrzés

## Frissítési útmutató

| Feladat | Kell? |
|---|---|
| GitHub fájlok feltöltése | ✅ IGEN |
| Supabase SQL futtatása | ❌ NEM kötelező |
| Storage bucket létrehozása | ❌ NEM, ha V9 már futott |
| Új oldal | ✅ IGEN |
| Új jelszó | ❌ NINCS |

## GitHub

Töltsd fel / írd felül a ZIP összes fájlját.

## Supabase

Ehhez a verzióhoz nincs kötelező új SQL.

Ha az ellenőrző oldal hibát jelez, akkor futtasd le újra sorban:

1. `supabase_v8_tartalomkezelo.sql`
2. `supabase_v9_valodi_feltoltes.sql`
3. `supabase_v10_egyszeru_kapu.sql`

Nem baj, ha ezek közül valamelyiket már korábban lefuttattad. Újra lefuttathatóak.

## Új oldal

Rendszerellenőrzés:

`https://csatangolo.online/csatangolo-forum/ellenorzes.html`

## Szervezői kód

`csatangolo2026`

## Mit ellenőriz?

- registrations
- participants
- speakers
- program_items
- videos
- news
- sponsors
- gallery
- documents
- forum-assets Storage
- fájlfeltöltési jogosultság
- fontos oldalak elérhetősége
