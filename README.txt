CSATANGOLÓ FÓRUM – SUPABASE VERZIÓ

Töltsd fel ezt a 4 fájlt GitHubra a régi fájlok helyére:

- index.html
- regisztracio.html
- koszonjuk.html
- styles.css

A supabase_schema.sql fájlt NEM kell GitHubra feltölteni, csak Supabase-ben kell lefuttatni.

SUPABASE BEÁLLÍTÁS:

1. Supabase projekt → bal oldalt SQL Editor
2. New query
3. Másold be a supabase_schema.sql teljes tartalmát
4. Run
5. Utána Table Editor alatt látni fogod:
   - registrations
   - participants

TESZT:

1. Nyisd meg:
   https://csatangolo.online/csatangolo-forum/regisztracio.html
2. Tölts ki egy próbaregisztrációt
3. Beküldés után a koszonjuk.html oldalra kell érkezned
4. Supabase Table Editorben meg kell jelennie az adatoknak

FONTOS:
Ez a verzió már nem Google Apps Scriptet használ.
Minden regisztráció Supabase adatbázisba kerül.
A fő regisztráló és minden kísérő külön résztvevőként bekerül a participants táblába.
