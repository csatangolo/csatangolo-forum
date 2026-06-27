CSATANGOLÓ FÓRUM – JAVÍTOTT MŰKÖDŐ VERZIÓ

GitHubra ezeket töltsd fel / írd felül:

- index.html
- regisztracio.html
- koszonjuk.html
- styles.css
- script.js

A supabase_fix_policies.sql fájlt nem muszáj GitHubra feltölteni.
Ha továbbra is hibát ír a regisztráció, Supabase → SQL Editor → New query alatt futtasd le.

Fontos:
Ez a verzió már nem kér vissza adatot Supabase-ből az insert után, ezért nem akad el SELECT jogosultságon.
A fő regisztráló és minden kísérő külön résztvevőként kerül a participants táblába.
A köszönő oldalon azonnal megjelennek a névre szóló QR-kódok.
