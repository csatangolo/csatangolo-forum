# Csatangoló Fórum regisztrációs oldal

Tartalom:
- `forum/index.html` – kezdőoldal
- `forum/regisztracio/index.html` – regisztrációs űrlap
- `forum/koszonjuk/index.html` – köszönő oldal
- `assets/styles.css` – stílus
- `google-apps-script/Code.gs` – Google Táblázatba mentő háttérrendszer

Gyors beüzemelés:
1. Töltsd fel a `forum` és `assets` mappát a weboldal gyökerébe.
2. Hozz létre egy Google Táblázatot.
3. Apps Scriptben illeszd be a `Code.gs` tartalmát.
4. A `SPREADSHEET_ID` mezőbe írd be a Google Táblázat ID-ját.
5. Deploy -> New deployment -> Web app -> Anyone.
6. A Web App URL-t másold be a regisztrációs HTML `action` részébe.
