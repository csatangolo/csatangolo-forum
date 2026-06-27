const SPREADSHEET_ID = 'IDE_JON_A_GOOGLE_SHEET_ID';
const THANK_YOU_URL = 'https://csatangolo.online/forum/koszonjuk/';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const registrations = getOrCreateSheet_(ss, 'Regisztraciok');
    const participants = getOrCreateSheet_(ss, 'Resztvevok');
    ensureHeaders_(registrations, ['Időpont','Regisztráció ID','Fő név','Email','Telefon','Település','Kísérők','Gyermekek','Gyermekprogramok','Szállás/Sátor','Bemutató igény','Bemutató részletek','Kérdés','Kinek szól','Témák','Szerepek','Bemutatkozás','Forrás','Adatkezelés','Média hozzájárulás']);
    ensureHeaders_(participants, ['Résztvevő ID','Regisztráció ID','Név','Típus','Email kapcsolattartó','Telefon kapcsolattartó','Település','QR státusz','Érkezett','Támogatás rendezve','Megjegyzés']);
    const p = normalizeParams_(e.parameter);
    const regId = nextRegistrationId_(registrations);
    const companions = [p.companion1,p.companion2,p.companion3,p.companion4,p.companion5].filter(Boolean);
    const childPrograms = arr_(e.parameters.childPrograms).concat(p.childProgramsOther ? [p.childProgramsOther] : []).filter(Boolean);
    const topics = arr_(e.parameters.topics).concat(p.topicsOther ? [p.topicsOther] : []).filter(Boolean);
    const roles = arr_(e.parameters.roles);
    registrations.appendRow([new Date(),regId,p.mainName,p.email,p.phone,p.city,companions.join(', '),p.childrenDetails,childPrograms.join(', '),p.accommodation,p.demoInterest,p.demoDetails,p.speakerQuestion,p.questionFor,topics.join(', '),roles.join(', '),p.intro,p.source,p.privacyAccepted,p.mediaAccepted]);
    appendParticipant_(participants, regId, p.mainName, 'Fő regisztráló', p);
    companions.forEach(name => appendParticipant_(participants, regId, name, 'Kísérő', p));
    sendConfirmation_(p.email, p.mainName, regId, companions);
    lock.releaseLock();
    return HtmlService.createHtmlOutput('<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=' + THANK_YOU_URL + '"></head><body>Köszönjük a regisztrációt.</body></html>');
  } catch (err) {
    lock.releaseLock();
    return HtmlService.createHtmlOutput('Hiba történt a regisztráció során: ' + err.message);
  }
}
function appendParticipant_(sheet, regId, name, type, p) {
  sheet.appendRow([nextParticipantId_(sheet), regId, name, type, p.email, p.phone, p.city, 'QR később küldve', 'Nem', 'Nem', '']);
}
function sendConfirmation_(email, name, regId, companions) {
  if (!email) return;
  const subject = 'Regisztráció rögzítve – I. Országos Belovagló és Lókiképző Szakmai Fórum';
  const list = [name].concat(companions).map(n => '• ' + n).join('\n');
  const body = `Kedves ${name}!\n\nKöszönjük a regisztrációdat az I. Országos Belovagló és Lókiképző Szakmai Fórumra.\n\nRegisztrációs azonosító: ${regId}\n\nAz alábbi résztvevőket rögzítettük:\n${list}\n\nA rendezvény szervezési költségeihez való hozzájárulásként 2 000 Ft/fő támogatást kérünk, amelyet a helyszínen lehet megfizetni.\n\nA névre szóló belépő QR-kódokat később küldjük ki e-mailben.\n\nTalálkozunk 2026. július 25-én a Csatangoló Lovardában!\n\nCsatangoló Lovarda`;
  MailApp.sendEmail(email, subject, body);
}
function getOrCreateSheet_(ss, name) { return ss.getSheetByName(name) || ss.insertSheet(name); }
function ensureHeaders_(sheet, headers) { if (sheet.getLastRow() === 0) sheet.appendRow(headers); }
function normalizeParams_(p) { const out = {}; Object.keys(p).forEach(k => out[k] = (p[k] || '').toString().trim()); return out; }
function arr_(value) { if (!value) return []; return Array.isArray(value) ? value : [value]; }
function nextRegistrationId_(sheet) { return 'FORUM-REG-' + String(Math.max(1, sheet.getLastRow())).padStart(4, '0'); }
function nextParticipantId_(sheet) { return 'FORUM-' + String(Math.max(1, sheet.getLastRow())).padStart(5, '0'); }
