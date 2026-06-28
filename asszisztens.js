const answers = [
  {
    keys: ["mikor", "kezd", "idő", "datum", "dátum"],
    answer: "A fórum 2026. július 25-én, szombaton lesz. A kezdés 9:00 órától várható, és a program akár késő estig is tarthat."
  },
  {
    keys: ["hol", "helyszín", "cím", "odatalál", "öregcsertő"],
    answer: "A helyszín: Csatangoló Lovarda, Öregcsertő, Homokmégyi utca 39. A pontos érkezési információk a rendezvény előtt külön is felkerülnek az oldalra."
  },
  {
    keys: ["hozzájárulás", "fizet", "ár", "2000", "támogatás"],
    answer: "A részvételi hozzájárulás 2 000 Ft / fő, amely a fórum megszervezésének és lebonyolításának költségeit támogatja."
  },
  {
    keys: ["gyerek", "család", "családos", "gyermek"],
    answer: "Igen, családokat és gyermekeket is szeretettel várunk. Gyermekprogramokkal is készülünk."
  },
  {
    keys: ["eső", "rossz idő", "időjárás", "fedeles"],
    answer: "Rossz idő esetén is megtartjuk a rendezvényt, mert fedeles lovarda is rendelkezésre áll."
  },
  {
    keys: ["regisztr", "jelentkez"],
    answer: "Regisztrálni a fórum oldalán tudsz a Regisztráció menüpontban. A regisztráció után névre szóló QR-kódos belépőt kapsz."
  },
  {
    keys: ["program", "előadás", "bemutató"],
    answer: "A program folyamatosan bővül. Lesznek szakmai előadások, gyakorlati bemutatók, kötetlen beszélgetések és családbarát programok."
  }
];

function normalize(str) {
  return String(str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function answerQuestion(q) {
  const text = normalize(q);
  const match = answers.find(item => item.keys.some(k => text.includes(normalize(k))));
  return match ? match.answer : "Erre most még nincs pontos válaszom, de a szervezők folyamatosan bővítik az információkat. Nézd meg a Program, Hírek és GYIK részeket is.";
}

function ask(q) {
  document.getElementById("assistantAnswer").textContent = answerQuestion(q);
}

document.getElementById("assistantAsk").addEventListener("click", () => {
  ask(document.getElementById("assistantInput").value);
});

document.getElementById("assistantInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") ask(e.target.value);
});

document.querySelectorAll(".quick-question-list button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("assistantInput").value = btn.dataset.q;
    ask(btn.dataset.q);
  });
});
