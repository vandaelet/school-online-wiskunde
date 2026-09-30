/* ============================================================
   NANDO OEFENTAAK — Module 1: Inzicht in getallen
   ------------------------------------------------------------
   Dit bestand bevat:
   1. Kleine wiskundige hulpfuncties
   2. De volledige vragenbank (inhoud + verbetering)
   3. De opbouw van de pagina en het inlog-/indienproces
   ============================================================ */

/* ---------- 1. Hulpfuncties ---------- */
function ggd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; }
function kgv(a, b) { return Math.abs(a * b) / ggd(a, b); }
function isPrime(n) {
  n = Math.trunc(n);
  if (!Number.isFinite(n) || n < 2) return false;
  if (n % 2 === 0) return n === 2;
  for (let i = 3; i * i <= n; i += 2) { if (n % i === 0) return false; }
  return true;
}
function simplifyFraction(num, den) {
  if (!Number.isFinite(num) || !Number.isFinite(den) || den === 0) return null;
  const sign = (den < 0) ? -1 : 1;
  num *= sign; den *= sign;
  const g = ggd(num, den) || 1;
  return [num / g, den / g];
}
function parseNumSet(str) {
  if (!str) return [];
  return str.replace(/[{}]/g, '').split(',').map(s => s.trim()).filter(s => s.length > 0)
    .map(Number).filter(n => !Number.isNaN(n)).sort((a, b) => a - b);
}
function parseNameSet(str) {
  if (!str) return [];
  return str.replace(/[{}]/g, '').split(',').map(s => s.trim().toLowerCase()).filter(s => s.length > 0).sort();
}
function sameArr(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) { if (a[i] !== b[i]) return false; }
  return true;
}
function val(id) { const el = document.getElementById(id); return el ? el.value : ''; }
function fmtNum(n) { return (Math.round(n * 100) / 100).toString().replace('.', ','); }
function intVal(id) { const v = parseInt(val(id), 10); return Number.isNaN(v) ? null : v; }

/* ---------- Waar/Niet waar mini-widget ---------- */
function tfButtons(name, labelYes, labelNo) {
  labelYes = labelYes || 'WAAR';
  labelNo = labelNo || 'NIET WAAR';
  return `<div class="tf-group" data-name="${name}">
      <button type="button" class="tf-btn waar" onclick="selectTF('${name}',true,this)">${labelYes}</button>
      <button type="button" class="tf-btn niet" onclick="selectTF('${name}',false,this)">${labelNo}</button>
    </div>`;
}
window.tfState = {};
function selectTF(name, value, btn) {
  window.tfState[name] = value;
  const group = btn.parentElement;
  group.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

/* ---------- Breuk-invoerwidget ---------- */
function fracInput(id) {
  return `<span class="frac-input">
      <input type="text" id="${id}-n" inputmode="numeric" maxlength="4">
      <span class="frac-bar"></span>
      <input type="text" id="${id}-d" inputmode="numeric" maxlength="4">
    </span>`;
}
/* Niet-bewerkbare breukweergave voor in de opgave zelf (teller boven, noemer onder de streep). */
function fracDisplay(num, den) {
  return `<span class="frac-display"><span class="frac-num">${num}</span><span class="frac-bar-auto"></span><span class="frac-den">${den}</span></span>`;
}
function gradeFraction(id, expNum, expDen) {
  const n = intVal(id + '-n'), d = intVal(id + '-d');
  if (n === null || d === null || d === 0) {
    return { earned: 0, correct: `Juist antwoord: ${expNum}/${expDen}.` };
  }
  const userSimpl = simplifyFraction(n, d);
  const isReduced = ggd(n, d) === 1 || (n === 0);
  const matches = userSimpl && userSimpl[0] === expNum && userSimpl[1] === expDen;
  if (matches && isReduced) return { earned: 1, correct: `Juist! ${expNum}/${expDen} (onvereenvoudigbaar).` };
  if (matches && !isReduced) return { earned: 0.5, correct: `Bijna! ${n}/${d} is wel gelijk aan ${expNum}/${expDen}, maar niet in de onvereenvoudigbare vorm.` };
  return { earned: 0, correct: `Juist antwoord: ${expNum}/${expDen}.` };
}

/* ============================================================
   2. VRAGENBANK
   ============================================================ */
const QUESTIONS = [];

/* ---- Q1 : Talstelsels ---- */
QUESTIONS.push({
  id: 'q1', section: '1. Talstelsels', points: 1,
  html: `<p>Welk soort talstelsel gebruikten de Egyptenaren, waarbij enkel de <em>som</em> van de symbolen telt en de plaats van de symbolen er niet toe doet?</p>
    <div class="opts">
      <label><input type="radio" name="q1" value="a"> Een positiestelsel</label>
      <label><input type="radio" name="q1" value="b"> Een additief talstelsel</label>
      <label><input type="radio" name="q1" value="c"> Een binair (tweedelig) stelsel</label>
    </div>`,
  grade() {
    const sel = document.querySelector('input[name="q1"]:checked');
    const ok = sel && sel.value === 'b';
    return { earned: ok ? 1 : 0, max: 1, correct: 'Juist antwoord: een <b>additief talstelsel</b>.' };
  }
});

/* ---- Q2 : Soorten getallen — classificatie ---- */
const q2rows = [
  { label: '8', n: true, z: true, q: true },
  { label: '−5', n: false, z: true, q: true },
  { label: '¾', n: false, z: false, q: true },
  { label: '−2,5', n: false, z: false, q: true },
];
QUESTIONS.push({
  id: 'q2', section: '2. Soorten getallen', points: 4,
  html: `<p>Duid voor elk getal aan tot welke verzameling(en) het behoort.</p>
    <table class="grid">
      <tr><th>getal</th><th>ℕ</th><th>ℤ</th><th>ℚ</th></tr>
      ${q2rows.map((r, i) => `<tr>
          <td class="rowlabel">${r.label}</td>
          <td><input type="checkbox" id="q2-${i}-n"></td>
          <td><input type="checkbox" id="q2-${i}-z"></td>
          <td><input type="checkbox" id="q2-${i}-q"></td>
        </tr>`).join('')}
    </table>`,
  grade() {
    let earned = 0;
    q2rows.forEach((r, i) => {
      const n = document.getElementById(`q2-${i}-n`).checked;
      const z = document.getElementById(`q2-${i}-z`).checked;
      const q = document.getElementById(`q2-${i}-q`).checked;
      if (n === r.n && z === r.z && q === r.q) earned += 1;
    });
    return { earned, max: 4, correct: 'Juiste rijen: 8 → ℕ,ℤ,ℚ &nbsp;|&nbsp; −5 → ℤ,ℚ &nbsp;|&nbsp; ¾ → ℚ &nbsp;|&nbsp; −2,5 → ℚ.' };
  }
});

/* ---- Q3 : Symbolen (∈, ⊂, ...) ---- */
const q3items = [
  { name: 'q3a', text: '0 ∈ ℕ', correct: true },
  { name: 'q3b', text: '−4 ∈ ℕ', correct: false },
  { name: 'q3c', text: '{1, 2, 3} ⊂ ℕ', correct: true },
  { name: 'q3d', text: 'ℚ ⊂ ℤ', correct: false },
];
QUESTIONS.push({
  id: 'q3', section: '2. Soorten getallen', points: 2,
  html: q3items.map(it => `<div class="tf-row"><span class="statement">${it.text}</span>${tfButtons(it.name)}</div>`).join(''),
  grade() {
    let earned = 0;
    q3items.forEach(it => { if (window.tfState[it.name] === it.correct) earned += 0.5; });
    return { earned, max: 2, correct: 'Juist: a) WAAR, b) NIET WAAR, c) WAAR, d) NIET WAAR.' };
  }
});

/* ---- Q4 : Terminologie hoofdbewerkingen ---- */
const termOpts = ['— kies —', 'term', 'som', 'aftrektal', 'aftrekker', 'verschil', 'factor', 'product', 'deeltal', 'deler', 'quotiënt'];
function termSelect(id) {
  return `<select id="${id}">${termOpts.map(o => `<option value="${o}">${o}</option>`).join('')}</select>`;
}
QUESTIONS.push({
  id: 'q4', section: '3. Hoofdbewerkingen', points: 3,
  html: `<p>Gegeven: <b>63 : 7 = 9</b>. Benoem elk getal correct.</p>
    <table class="termtable">
      <tr><td>63 is het</td><td>${termSelect('q4-a')}</td><td>van de deling.</td></tr>
      <tr><td>7 is de</td><td>${termSelect('q4-b')}</td><td>van de deling.</td></tr>
      <tr><td>9 is het</td><td>${termSelect('q4-c')}</td><td>van de deling.</td></tr>
    </table>`,
  grade() {
    let earned = 0;
    if (val('q4-a') === 'deeltal') earned += 1;
    if (val('q4-b') === 'deler') earned += 1;
    if (val('q4-c') === 'quotiënt') earned += 1;
    return { earned, max: 3, correct: 'Juist: 63 = deeltal, 7 = deler, 9 = quotiënt.' };
  }
});

/* ---- Q5 : Opgaande / niet-opgaande deling ---- */
const q5items = [
  { name: 'q5a', text: '53 : 4 is een opgaande deling.', correct: false },
  { name: 'q5b', text: '72 : 8 is een opgaande deling.', correct: true },
];
QUESTIONS.push({
  id: 'q5', section: '3. Hoofdbewerkingen', points: 1,
  html: q5items.map(it => `<div class="tf-row"><span class="statement">${it.text}</span>${tfButtons(it.name)}</div>`).join(''),
  grade() {
    let earned = 0;
    q5items.forEach(it => { if (window.tfState[it.name] === it.correct) earned += 0.5; });
    return { earned, max: 1, correct: '53 : 4 = 13 rest 1 → niet opgaand. 72 : 8 = 9 rest 0 → wel opgaand.' };
  }
});

/* ---- Q6 : Delers en ggd (opsomming) ---- */
QUESTIONS.push({
  id: 'q6', section: '4. Veelvouden en delers', points: 3,
  html: `<p>a) del 18 = { <input type="text" id="q6-a" size="26"> }</p>
    <p>b) del 24 = { <input type="text" id="q6-b" size="30"> }</p>
    <p>c) ggd (18, 24) = <input type="text" id="q6-c" size="4"></p>`,
  grade() {
    let earned = 0;
    if (sameArr(parseNumSet(val('q6-a')), [1, 2, 3, 6, 9, 18])) earned += 1;
    if (sameArr(parseNumSet(val('q6-b')), [1, 2, 3, 4, 6, 8, 12, 24])) earned += 1;
    if (intVal('q6-c') === 6) earned += 1;
    return { earned, max: 3, correct: 'del 18 = {1,2,3,6,9,18} — del 24 = {1,2,3,4,6,8,12,24} — ggd(18,24) = 6.' };
  }
});

/* ---- Q7 : kgv ---- */
QUESTIONS.push({
  id: 'q7', section: '4. Veelvouden en delers', points: 2,
  html: `<p>a) kgv (4, 6) = <input type="text" id="q7-a" size="4"></p>
    <p>b) kgv (9, 12) = <input type="text" id="q7-b" size="4"></p>`,
  grade() {
    let earned = 0;
    if (intVal('q7-a') === 12) earned += 1;
    if (intVal('q7-b') === 36) earned += 1;
    return { earned, max: 2, correct: 'kgv(4,6) = 12 — kgv(9,12) = 36.' };
  }
});

/* ---- Q8 : Priemfactorisatie — ladder met streep ---- */
/* Elke oefening bestaat uit twee onderdelen die apart scoren:
   1) de ladder zelf correct invullen (2 p)
   2) de priemfactorisatie eronder voluit als product opschrijven (1 p) */
const LADDER_SETUPS = []; // wordt gevuld door makeFactorQuestion, en na het bouwen van de pagina één keer doorlopen

function ladderHTML(qid, target, steps) {
  let rows = `<div class="ladder-row"><span class="ladder-num" id="${qid}-n0">${target}</span><span class="ladder-bar"></span><input class="ladder-input" id="${qid}-p1" inputmode="numeric" maxlength="3"></div>`;
  for (let i = 2; i <= steps; i++) {
    rows += `<div class="ladder-row"><span class="ladder-num" id="${qid}-n${i - 1}">?</span><span class="ladder-bar"></span><input class="ladder-input" id="${qid}-p${i}" inputmode="numeric" maxlength="3"></div>`;
  }
  rows += `<div class="ladder-row final"><span class="ladder-num" id="${qid}-n${steps}">?</span></div>`;
  return `<div class="ladder">${rows}</div>`;
}
function buildFactorString(target, expectedSorted) { return `${target} = ${expectedSorted.join(' · ')}`; }
function gradeLadderPoints(qid, target, steps) {
  const primes = [];
  for (let i = 1; i <= steps; i++) primes.push(intVal(qid + '-p' + i));
  if (primes.some(p => p === null)) return 0;
  const product = primes.reduce((a, b) => a * b, 1);
  const allPrime = primes.every(isPrime);
  if (product === target && allPrime) return 2;
  if (product === target) return 1;
  return 0;
}
function gradeWrittenFactorPoints(id, target, expectedSorted) {
  let nums = (val(id).match(/\d+/g) || []).map(Number);
  if (nums.length === 0) return 0;
  if (nums[0] === target && nums.length > 1) nums = nums.slice(1); // negeer een eventueel voorop geschreven "60 ="
  const product = nums.reduce((a, b) => a * b, 1);
  const sorted = nums.slice().sort((a, b) => a - b);
  return (product === target && nums.every(isPrime) && sameArr(sorted, expectedSorted)) ? 1 : 0;
}
function makeFactorQuestion(id, target, expectedFactors) {
  const steps = expectedFactors.length;
  const expectedSorted = expectedFactors.slice().sort((a, b) => a - b);
  LADDER_SETUPS.push({ id, target, steps });
  return {
    id, section: '4. Veelvouden en delers', points: 3,
    html: `<p>Ontbind <b>${target}</b> in priemfactoren. Vul bij elke stap de priemfactor rechts van de streep in
        (net zoals in je cursus) en begin met de kleinste priemfactor.</p>
      ${ladderHTML(id, target, steps)}
      <p class="hint">Tip: ${target} wordt stap voor stap gedeeld tot je bij 1 uitkomt.</p>
      <p>Schrijf nu, net zoals in je cursus, de volledige priemfactorisatie op als een product:</p>
      <p>${target} = <input type="text" id="${id}-w" size="22" placeholder="bv. 2 · 2 · 3 · 5"></p>`,
    grade() {
      const ladderPts = gradeLadderPoints(id, target, steps);
      const writtenPts = gradeWrittenFactorPoints(id + '-w', target, expectedSorted);
      const earned = ladderPts + writtenPts;
      let correct = `Juiste priemfactorisatie: <b>${buildFactorString(target, expectedSorted)}</b>.`;
      if (ladderPts < 2) correct += ` (ladder: ${ladderPts}/2)`;
      if (writtenPts < 1) correct += ` (opgeschreven als product: ${writtenPts}/1 — schrijf dit voluit als ${buildFactorString(target, expectedSorted)})`;
      return { earned, max: 3, correct };
    }
  };
}
QUESTIONS.push(makeFactorQuestion('q8a', 30, [2, 3, 5]));
QUESTIONS.push(makeFactorQuestion('q8b', 84, [2, 2, 3, 7]));
QUESTIONS.push(makeFactorQuestion('q8c', 72, [2, 2, 2, 3, 3]));

function setupLadder() {
  LADDER_SETUPS.forEach(({ id, target, steps }) => {
    function recompute() {
      let n = target;
      document.getElementById(id + '-n0').textContent = target;
      for (let i = 1; i <= steps; i++) {
        const p = intVal(id + '-p' + i);
        let next = '?';
        if (n !== null && p && p > 0 && n % p === 0) { next = n / p; }
        else { n = null; }
        document.getElementById(id + '-n' + i).textContent = next;
        n = (next === '?') ? null : next;
      }
    }
    for (let i = 1; i <= steps; i++) {
      document.getElementById(id + '-p' + i).addEventListener('input', recompute);
    }
  });
}

/* ---- Q9 : Verzamelingen — unie, doorsnede, verschil ---- */
QUESTIONS.push({
  id: 'q9', section: '5. Symbolen en verzamelingen', points: 3,
  html: `<p>L: de verzameling van de leerlingen die naar de leesclub gaan.<br>
      S: de verzameling van de leerlingen die naar de schaakclub gaan.</p>
    <p>L = {Mona, Tibo, Warre, Yara} &nbsp;&nbsp; S = {Warre, Ella, Tibo}</p>
    <p>a) L ∪ S = { <input type="text" id="q9-a" size="34"> }</p>
    <p>b) L ∩ S = { <input type="text" id="q9-b" size="18"> }</p>
    <p>c) L \\ S = { <input type="text" id="q9-c" size="18"> }</p>`,
  grade() {
    let earned = 0;
    if (sameArr(parseNameSet(val('q9-a')), parseNameSet('Mona,Tibo,Warre,Yara,Ella'))) earned += 1;
    if (sameArr(parseNameSet(val('q9-b')), parseNameSet('Warre,Tibo'))) earned += 1;
    if (sameArr(parseNameSet(val('q9-c')), parseNameSet('Mona,Yara'))) earned += 1;
    return { earned, max: 3, correct: 'L∪S = {Mona,Tibo,Warre,Yara,Ella} — L∩S = {Warre,Tibo} — L\\S = {Mona,Yara}.' };
  }
});

/* ---- Q10 : Implicatiepijl ---- */
const q10items = [
  { name: 'q10a', u1: 'Ik woon in Gent.', u2: 'Ik woon in Oost-Vlaanderen.', correct: true },
  { name: 'q10b', u1: 'x is een veelvoud van 15.', u2: 'x is een veelvoud van 5.', correct: true },
  { name: 'q10c', u1: 'x is een deler van 8.', u2: 'x is een deler van 4.', correct: false },
];
QUESTIONS.push({
  id: 'q10', section: '5. Symbolen en verzamelingen', points: 1.5,
  html: `<p>Volgt uitspraak 2 uit uitspraak 1?</p>` +
    q10items.map(it => `<div class="tf-row"><span class="statement"><b>1:</b> ${it.u1} &nbsp; <b>2:</b> ${it.u2}</span>${tfButtons(it.name, 'JA', 'NEEN')}</div>`).join(''),
  grade() {
    let earned = 0;
    q10items.forEach(it => { if (window.tfState[it.name] === it.correct) earned += 0.5; });
    return { earned, max: 1.5, correct: 'a) JA (Gent ligt in Oost-Vlaanderen). b) JA (15=3·5). c) NEEN (8 is een deler van 8, maar geen deler van 4 — tegenvoorbeeld).' };
  }
});

/* ---- Q11 : Equivalentiepijl ---- */
QUESTIONS.push({
  id: 'q11', section: '5. Symbolen en verzamelingen', points: 1,
  html: `<p>p: Een getal eindigt op 0 of 5.<br>q: Een getal is deelbaar door 5.</p>
    <p>Kan je hier een equivalentiepijl (⇔) tussen plaatsen?</p>
    ${tfButtons('q11')}
    <p style="margin-top:10px;">Verklaar kort (deze uitleg telt niet mee voor je score, maar helpt je om te controleren of je het begrepen hebt):</p>
    <textarea id="q11-uitleg" placeholder="Jouw verklaring..."></textarea>`,
  grade() {
    const ok = window.tfState['q11'] === true;
    return {
      earned: ok ? 1 : 0, max: 1,
      correct: 'WAAR — p ⇒ q klopt (eindigt op 0 of 5 ⇒ deelbaar door 5) én q ⇒ p klopt (deelbaar door 5 ⇒ eindigt op 0 of 5). Beide richtingen kloppen, dus mag ⇔ er staan.'
    };
  }
});

/* ---- Q12 : Breuken vereenvoudigen ---- */
QUESTIONS.push({
  id: 'q12', section: '6. Breuken', points: 2,
  html: `<p>Vereenvoudig tot een onvereenvoudigbare breuk.</p>
    <p>a) ${fracDisplay(18, 24)} = ${fracInput('q12-a')}</p>
    <p>b) ${fracDisplay(20, 50)} = ${fracInput('q12-b')}</p>`,
  grade() {
    const r1 = gradeFraction('q12-a', 3, 4);
    const r2 = gradeFraction('q12-b', 2, 5);
    return { earned: r1.earned + r2.earned, max: 2, correct: `a) 3/4. b) 2/5.` };
  }
});

/* ---- Q13 : Breuken optellen/aftrekken ---- */
QUESTIONS.push({
  id: 'q13', section: '6. Breuken', points: 2,
  html: `<p>Bereken en noteer als onvereenvoudigbare breuk.</p>
    <p>a) ${fracDisplay(1, 4)} + ${fracDisplay(1, 6)} = ${fracInput('q13-a')}</p>
    <p>b) ${fracDisplay(5, 6)} − ${fracDisplay(1, 3)} = ${fracInput('q13-b')}</p>`,
  grade() {
    const r1 = gradeFraction('q13-a', 5, 12);
    const r2 = gradeFraction('q13-b', 1, 2);
    return { earned: r1.earned + r2.earned, max: 2, correct: `a) 5/12. b) 1/2.` };
  }
});

/* ---- Bonus : denkraadsel ---- */
QUESTIONS.push({
  id: 'q14', section: '🌶️ Bonus — denk dieper na', points: 2, bonus: true,
  html: `<p>Ik ben een natuurlijk getal tussen 20 en 50. Ik ben een veelvoud van 6.
      De som van mijn cijfers is 9. Welk getal ben ik?</p>
    <p>Antwoord: <input type="text" id="q14-a" size="4"></p>`,
  grade() {
    const ok = intVal('q14-a') === 36;
    return { earned: ok ? 2 : 0, max: 2, correct: 'Het getal is 36 (veelvoud van 6 tussen 20 en 50: 24, 30, 36, 42, 48 — enkel bij 36 is de cijfersom 3+6=9).' };
  }
});

window.QUESTIONS = QUESTIONS; // handig voor debugging in de browserconsole

/* ============================================================
   3. PAGINA-OPBOUW EN AAN-/AFMELDLOGICA
   ============================================================ */
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;
let currentKlas = null;

function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  if (SCHOOL_DOMAIN) provider.setCustomParameters({ hd: SCHOOL_DOMAIN });
  auth.signInWithPopup(provider).then(res => {
    currentUser = res.user;
    if (SCHOOL_DOMAIN && currentUser.email && !currentUser.email.toLowerCase().endsWith('@' + SCHOOL_DOMAIN.toLowerCase())) {
      alert('Gebruik je schoolaccount (@' + SCHOOL_DOMAIN + ') om in te loggen.');
      auth.signOut(); currentUser = null; return;
    }
    document.getElementById('login-step1').classList.add('hidden');
    document.getElementById('login-name').textContent = 'Welkom, ' + currentUser.displayName + '! 👋';
    document.getElementById('login-step2').classList.remove('hidden');
  }).catch(err => { alert('Aanmelden mislukt: ' + err.message); });
}

function startQuiz() {
  const klas = document.getElementById('klas-select').value;
  if (!klas) { alert('Kies eerst je klasgroep.'); return; }
  currentKlas = klas;
  buildQuiz();
  document.getElementById('login-section').classList.add('hidden');
  document.getElementById('quiz-section').classList.remove('hidden');
  window.scrollTo(0, 0);
}

function buildQuiz() {
  const root = document.getElementById('quiz-list');
  let counter = 0, lastSection = '';
  QUESTIONS.forEach(q => {
    counter++;
    if (q.section !== lastSection) {
      const h = document.createElement('h2');
      h.className = 'section-title';
      h.textContent = q.section;
      root.appendChild(h);
      lastSection = q.section;
    }
    const card = document.createElement('div');
    card.className = 'card' + (q.bonus ? ' bonus' : '');
    const ptsLabel = q.points === 1 ? '1 punt' : (fmtNum(q.points) + ' punten');
    card.innerHTML = `<div class="card-head"><span class="qnum">Vraag ${counter}${q.bonus ? ' (bonus)' : ''}</span><span class="qpts">${ptsLabel}</span></div>`
      + q.html + `<div id="fb-${q.id}" class="feedback"></div>`;
    root.appendChild(card);
  });
  setupLadder();
}

function submitQuiz() {
  if (!confirm('Ben je zeker dat je wil indienen? Nadien kan je niets meer wijzigen.')) return;
  let earned = 0, max = 0, bonusEarned = 0, bonusMax = 0;
  QUESTIONS.forEach(q => {
    const res = q.grade();
    const box = document.getElementById('fb-' + q.id);
    const cls = res.earned >= res.max ? 'ok' : (res.earned > 0 ? 'partial' : 'wrong');
    const icon = res.earned >= res.max ? '✅' : (res.earned > 0 ? '🟨' : '❌');
    box.className = 'feedback ' + cls;
    box.innerHTML = `${icon} Jij scoorde <b>${fmtNum(res.earned)}/${fmtNum(res.max)}</b> punten. <br>${res.correct}`;
    if (q.bonus) { bonusEarned += res.earned; bonusMax += res.max; }
    else { earned += res.earned; max += res.max; }
  });
  document.querySelectorAll('#quiz-section input, #quiz-section textarea, #quiz-section select, #quiz-section button.tf-btn')
    .forEach(el => el.disabled = true);
  document.getElementById('submit-btn').classList.add('hidden');
  showSummary(earned, max, bonusEarned, bonusMax);
  saveResultToFirestore(earned, max, bonusEarned, bonusMax);
}

function showSummary(earned, max, bonusEarned, bonusMax) {
  const pct = max > 0 ? Math.round((earned / max) * 100) : 0;
  let msg;
  if (pct >= 90) msg = 'Uitstekend! Je beheerst deze module top. 🌟';
  else if (pct >= 75) msg = 'Sterk werk! Bekijk je foutjes hieronder nog even goed na. 💪';
  else if (pct >= 50) msg = 'Goede start — herhaal zeker de onderdelen die je nog mist. 📘';
  else msg = 'Neem deze module nog eens grondig door voor je aan de toets begint. 🔁';
  const banner = document.getElementById('result-banner');
  banner.classList.remove('hidden');
  banner.innerHTML = `<h2>Jouw score: ${fmtNum(earned)} / ${fmtNum(max)} (${pct}%)</h2>`
    + (bonusMax > 0 ? `<p class="bonus-line">🌶️ Bonus: ${fmtNum(bonusEarned)} / ${fmtNum(bonusMax)}</p>` : '')
    + `<p class="tier-msg">${msg}</p>`
    + `<p class="scroll-hint">Scroll naar beneden voor de feedback en de correctiesleutel bij elke vraag.</p>`
    + `<div id="save-warning" class="hidden">⚠️ Je resultaat kon niet doorgestuurd worden naar je leerkracht (controleer je internetverbinding). Je score hierboven klopt wel.</div>`;
  banner.scrollIntoView({ behavior: 'smooth' });
}

function saveResultToFirestore(earned, max, bonusEarned, bonusMax) {
  if (!currentUser) return;
  db.collection('submissions').doc(currentUser.uid).set({
    naam: currentUser.displayName,
    email: currentUser.email,
    klas: currentKlas,
    score: earned,
    max: max,
    bonusScore: bonusEarned,
    bonusMax: bonusMax,
    percentage: max > 0 ? Math.round((earned / max) * 100) : 0,
    laatstIngediend: firebase.firestore.FieldValue.serverTimestamp(),
    pogingen: firebase.firestore.FieldValue.increment(1)
  }, { merge: true }).catch(err => {
    console.error('Kon resultaat niet opslaan:', err);
    const w = document.getElementById('save-warning');
    if (w) w.classList.remove('hidden');
  });
}
