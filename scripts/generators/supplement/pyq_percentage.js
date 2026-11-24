'use strict';

/**
 * Percentage: standard-level practice (difficulty 2-3) for the question types seen in
 * WBPSC-family PYQs (Clerkship, WBCS Prelims, WBP/KP Constable, IDO). The PYQ -> pattern
 * map is db/patterns/pyq_map/quant/percentage.json; each generator's subtopic is its
 * pattern key in db/patterns/quant/percentage.js.
 *
 * Every number is chosen so the answer is exact: whole numbers, or percentages with a
 * small denominator written as mixed numbers ("16 2/3%"), as in the exam keys.
 * Distractors are the real mistakes (wrong base, forgetting the overlap, adding the
 * rates, ...) and carry a trap note.
 */

const { ri, pick, shuffle, gcd, T, names, build } = require('../common');

const TOPIC = 'percentage';

/* ── exact fractions and formatting ─────────────────────────────────────── */

/** Reduced [n, d] with d > 0. */
function red(n, d) {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(Math.abs(n), d) || 1;
  return [n / g, d / g];
}
/** n/d >= 0 as "25", "3/8" or "16 2/3". */
function mixed(n, d = 1) {
  [n, d] = red(n, d);
  if (d === 1) return String(n);
  const w = Math.floor(n / d);
  return w ? `${w} ${n % d}/${d}` : `${n % d}/${d}`;
}
/** True when n/d reduces to a denominator used in exam keys (½, ⅓, ¼, ⅕, ⅙, ⅛). */
const nice = (n, d) => [1, 2, 3, 4, 5, 6, 8].includes(red(n, d)[1]);
const same = (s) => T(s, s);
const pctT = (n, d = 1) => same(`${mixed(n, d)}%`);
const num = (v) => v.toLocaleString('en-IN');
const inr = (v) => `₹${num(v)}`;
const dec = (v) => String(Math.round(v * 100) / 100);
const exact = (v) => String(Number(v.toFixed(6)));
/** Signed term for the working: 5 -> "5", -5 -> "(−5)". */
const sg = (v) => (v < 0 ? `(−${-v})` : String(v));
const ratioT = (a, b) => { const g = gcd(a, b); return same(`${a / g} : ${b / g}`); };

/** A percentage or quantity with an odd denominator (14 17/22%) gives itself away as wrong. */
const ugly = (text) => [...text.matchAll(/\d+\/(\d+)(?=%| litres)/g)].some((m) => Number(m[1]) > 12);

/**
 * Four options: correct + traps first (each [option, noteEn, noteBn]) + fillers.
 * Returns null unless three distinct wrong options were found.
 */
function opts(correct, traps, fillers = []) {
  const seen = new Set([correct.en]);
  const wrong = [];
  const add = (o, trap) => {
    if (!o || wrong.length >= 3 || seen.has(o.en) || ugly(o.en)) return;
    seen.add(o.en);
    wrong.push(trap ? { en: o.en, bn: o.bn, trap } : { en: o.en, bn: o.bn });
  };
  for (const [o, en, bn] of traps) add(o, T(en, bn));
  if (!wrong.length) return null; // at least one distractor must be a real, explained mistake
  for (const o of shuffle(fillers)) add(o);
  return wrong.length === 3 ? { correct, wrong } : null;
}

/** Fillers near a percentage n/d: n/d ± 1, 2, 3, 5 (positive only). */
function pctFill(n, d = 1) {
  [n, d] = red(n, d);
  return [1, 2, 3, 5, -1, -2, -3, -5].map((k) => n + k * d).filter((m) => m > 0).map((m) => pctT(m, d));
}
/** Fillers near a whole number v with a step. */
const intFill = (v, step, f) => [1, 2, 3, -1, -2, -3].map((k) => v + k * step).filter((x) => x > 0).map(f);

/**
 * Subtopic = pattern key, except where an older generator already uses the key as a
 * subtopic for a different type ("percentage_change" holds find-the-original questions).
 */
const SUBTOPIC = { percentage_change: 'percentage_change_values' };

function make(pattern, { tags = [], difficulty, time, stem, o, steps, shortcut }) {
  if (!o) return null;
  return build({ topic: TOPIC, subtopic: SUBTOPIC[pattern] || pattern, pattern, tags: [pattern, ...tags], difficulty, time, stem, correct: o.correct, wrong: o.wrong, steps, shortcut });
}

/* ── percent_of_number: x% of a quantity, inside a word problem ───────────── */

const DEDUCT = [
  (X, N, x) => T(`${X.en} won ${inr(N)} in a lottery. ${x}% of the money was taken by the government as tax. How much did ${X.en} actually receive?`,
    `${X.bn} লটারিতে ${inr(N)} জিতল। ওই টাকার ${x}% সরকার কর হিসাবে কেটে নিল। ${X.bn} আসলে কত টাকা পেল?`),
  (X, N, x) => T(`${X.en}'s monthly salary is ${inr(N)}. ${x}% of it is deducted for provident fund and tax. What is ${X.en}'s take-home pay?`,
    `${X.bn}-এর মাসিক বেতন ${inr(N)}। এর ${x}% প্রভিডেন্ট ফান্ড ও কর বাবদ কেটে নেওয়া হয়। ${X.bn} হাতে কত টাকা পায়?`),
  (X, N, x) => T(`A club received a grant of ${inr(N)} and spent ${x}% of it on sports equipment. How much of the grant is left?`,
    `একটি ক্লাব ${inr(N)} অনুদান পেল এবং তার ${x}% খেলার সরঞ্জাম কিনতে খরচ করল। অনুদানের কত টাকা বাকি রইল?`),
];
const RISE = [
  (N, x) => T(`Last week, ${num(N)} copies of a magazine were sold. This week, ${x}% more copies were sold. How many copies were sold this week?`,
    `গত সপ্তাহে একটি পত্রিকার ${num(N)}টি কপি বিক্রি হয়েছিল। এই সপ্তাহে ${x}% বেশি কপি বিক্রি হয়েছে। এই সপ্তাহে কতগুলি কপি বিক্রি হয়েছে?`),
  (N, x) => T(`${num(N)} people visited a book fair on Saturday. On Sunday the number of visitors was ${x}% more. How many people visited the fair on Sunday?`,
    `শনিবার একটি বইমেলায় ${num(N)} জন দর্শক এসেছিলেন। রবিবার দর্শকের সংখ্যা ${x}% বেশি হল। রবিবার কতজন দর্শক মেলায় এসেছিলেন?`),
  (N, x) => T(`A factory made ${num(N)} bicycles in January and ${x}% more in February. How many bicycles did it make in February?`,
    `একটি কারখানা জানুয়ারিতে ${num(N)}টি সাইকেল তৈরি করল এবং ফেব্রুয়ারিতে ${x}% বেশি তৈরি করল। ফেব্রুয়ারিতে কতগুলি সাইকেল তৈরি হল?`),
];
const SMALL_PCT = [[1, 10, '0.1'], [1, 5, '0.2'], [2, 5, '0.4'], [1, 2, '0.5'], [1, 4, '0.25'], [3, 4, '0.75'], [5, 2, '2.5'], [3, 2, '1.5']];

function percentOfNumber(kind = pick(['deduct', 'rise', 'excess', 'small'])) {
  const P = 'percent_of_number';
  const shortcut = T('Turn the percentage into a fraction first, and fold the add/subtract into it: a cut of x% leaves (100 − x)%, a rise of x% gives (100 + x)%.',
    'আগে শতাংশকে ভগ্নাংশে বদলাও, যোগ/বিয়োগটাও তার মধ্যেই ধরো: x% কমলে থাকে (100 − x)%, x% বাড়লে হয় (100 + x)%।');
  if (kind === 'deduct') {
    const x = pick([5, 8, 10, 12, 15, 20, 25, 30, 35, 40]);
    const N = ri(4, 90) * 1000;
    const cut = (N * x) / 100;
    const left = N - cut;
    const [X] = names(1);
    return make(P, {
      tags: ['deduction'], difficulty: 2, time: 45,
      stem: pick(DEDUCT)(X, N, x),
      o: opts(T(inr(left), inr(left)), [
        [same(inr(cut)), 'That is the amount taken away, not what is left.', 'এটি কেটে নেওয়া অংশ, যা বাকি থাকে তা নয়।'],
        [same(inr(N + cut)), `The ${x}% was added instead of subtracted.`, `${x}% বিয়োগ না করে যোগ করা হয়েছে।`],
      ], intFill(left, 1000, (v) => same(inr(v)))),
      steps: [
        T(`${x}% of ${inr(N)} = ${x}/100 × ${num(N)} = ${inr(cut)}.`, `${inr(N)}-এর ${x}% = ${x}/100 × ${num(N)} = ${inr(cut)}।`),
        T(`Amount left = ${num(N)} − ${num(cut)} = ${inr(left)}.`, `বাকি থাকে = ${num(N)} − ${num(cut)} = ${inr(left)}।`),
        T(`Check: ${100 - x}% of ${num(N)} = ${inr(left)}.`, `যাচাই: ${num(N)}-এর ${100 - x}% = ${inr(left)}।`),
      ],
      shortcut,
    });
  }
  if (kind === 'rise') {
    const N = ri(20, 150) * 100;
    const x = ri(3, 18);
    const inc = (N * x) / 100;
    const ans = N + inc;
    return make(P, {
      tags: ['increase'], difficulty: 2, time: 45,
      stem: pick(RISE)(N, x),
      o: opts(same(num(ans)), [
        [same(num(inc)), 'That is only the increase; add it to the old figure.', 'এটি শুধু বৃদ্ধির পরিমাণ; আগের সংখ্যার সঙ্গে যোগ করো।'],
        [same(num(N - inc)), `The ${x}% was subtracted instead of added.`, `${x}% যোগ না করে বিয়োগ করা হয়েছে।`],
      ], intFill(ans, 90, (v) => same(num(v)))),
      steps: [
        T(`Increase = ${x}% of ${num(N)} = ${x}/100 × ${num(N)} = ${num(inc)}.`, `বৃদ্ধি = ${num(N)}-এর ${x}% = ${x}/100 × ${num(N)} = ${num(inc)}।`),
        T(`New figure = ${num(N)} + ${num(inc)} = ${num(ans)}.`, `নতুন সংখ্যা = ${num(N)} + ${num(inc)} = ${num(ans)}।`),
      ],
      shortcut,
    });
  }
  if (kind === 'excess') {
    const x = pick([5, 10, 15, 20, 30]);
    const L = pick([100000, 150000, 200000, 250000, 300000, 500000]);
    const k = ri(100, 4000) * 20;
    const I = L + k;
    const tax = (k * x) / 100;
    const [X] = names(1);
    return make(P, {
      tags: ['income_tax'], difficulty: 2, time: 60,
      stem: T(`Income tax is charged at the rate of ${x}% on the part of the income exceeding ${inr(L)}. If ${X.en}'s annual income is ${inr(I)}, how much income tax does ${X.en} pay?`,
        `${inr(L)}-এর বেশি আয়ের অংশের উপর ${x}% হারে আয়কর ধার্য হয়। ${X.bn}-এর বার্ষিক আয় ${inr(I)} হলে ${X.bn}-কে কত আয়কর দিতে হবে?`),
      o: opts(same(inr(tax)), [
        [same(inr((I * x) / 100)), `Tax is charged only on the part above ${inr(L)}, not on the whole income.`, `কর শুধু ${inr(L)}-এর বেশি অংশের উপর, পুরো আয়ের উপর নয়।`],
        [same(inr(k)), `That is the taxable part itself; take ${x}% of it.`, `এটি করযোগ্য অংশ; এর ${x}% নিতে হবে।`],
      ], [same(inr(tax * 10)), ...intFill(tax, Math.max(10, Math.round(tax / 50) * 10), (v) => same(inr(v)))]),
      steps: [
        T(`Taxable part = ${num(I)} − ${num(L)} = ${inr(k)}.`, `করযোগ্য অংশ = ${num(I)} − ${num(L)} = ${inr(k)}।`),
        T(`Tax = ${x}% of ${num(k)} = ${x}/100 × ${num(k)} = ${inr(tax)}.`, `আয়কর = ${num(k)}-এর ${x}% = ${x}/100 × ${num(k)} = ${inr(tax)}।`),
      ],
      shortcut,
    });
  }
  // small: decimal percentages (0.1%, 2.5%, ...)
  const [pn, pd, label] = pick(SMALL_PCT);
  const N = ri(5, 300) * 100;
  if ((N * pn) % (100 * pd)) return null;
  const ans = (N * pn) / (100 * pd);
  return make(P, {
    tags: ['decimal_percent'], difficulty: 2, time: 45,
    stem: T(`What is ${label}% of ${inr(N)}?`, `${inr(N)}-এর ${label}% কত?`),
    o: opts(same(inr(ans)), [
      [same(inr(ans * 10)), 'The decimal point slipped one place.', 'দশমিক বিন্দু এক ঘর সরে গেছে।'],
      [same(inr(ans * 100)), `${label}% means ${label}/100, so divide by 100 as well.`, `${label}% মানে ${label}/100, তাই 100 দিয়েও ভাগ করতে হবে।`],
    ], [same(inr(ans / 10)), same(inr(ans * 1000)), same(inr(ans + 1)), same(inr(ans * 2))]),
    steps: [
      T(`${label}% = ${label}/100 = ${mixed(pn, 100 * pd)}.`, `${label}% মানে ${label}/100 = ${mixed(pn, 100 * pd)}।`),
      T(`${label}% of ${inr(N)} = ${mixed(pn, 100 * pd)} × ${num(N)} = ${inr(ans)}.`, `${inr(N)}-এর ${label}% = ${mixed(pn, 100 * pd)} × ${num(N)} = ${inr(ans)}।`),
    ],
    shortcut: T('Find 1% first (move the point two places left), then take the decimal part of it.', 'আগে 1% বের করো (দশমিক দুই ঘর বাঁদিকে), তারপর তার দশমিক অংশ নাও।'),
  });
}

/* ── one_quantity_as_percent: A is what percent of B ──────────────────────── */

const COMPLEMENT = [
  (A, N) => T(`${num(A)} students out of ${num(N)} are enrolled in the NCC. What percentage of the students are not in the NCC?`,
    `${num(N)} জন ছাত্রছাত্রীর মধ্যে ${num(A)} জন এনসিসি-তে নাম লিখিয়েছে। শতকরা কতজন ছাত্রছাত্রী এনসিসি-তে নেই?`),
  (A, N) => T(`In a village of ${num(N)} voters, ${num(A)} cast their votes. What percentage of the voters did not vote?`,
    `একটি গ্রামের ${num(N)} জন ভোটারের মধ্যে ${num(A)} জন ভোট দিয়েছেন। শতকরা কতজন ভোটার ভোট দেননি?`),
  (A, N) => T(`A library has ${num(N)} members, of whom ${num(A)} borrowed a book last month. What percentage of the members did not borrow a book?`,
    `একটি গ্রন্থাগারের ${num(N)} জন সদস্যের মধ্যে ${num(A)} জন গত মাসে বই নিয়েছেন। শতকরা কতজন সদস্য বই নেননি?`),
];
// [x, x (bn), x's (bn), y, y's (bn), where, where (bn), whole, whole's (bn)]
const MIXES = [
  ['urea', 'ইউরিয়া', 'ইউরিয়ার', 'potash', 'পটাশের', 'a mixed fertiliser', 'একটি মিশ্র সারে', 'the fertiliser', 'মোট সারের'],
  ['milk', 'দুধ', 'দুধের', 'water', 'জলের', 'a can of mixture', 'একটি পাত্রের মিশ্রণে', 'the mixture', 'মোট মিশ্রণের'],
  ['copper', 'তামা', 'তামার', 'zinc', 'দস্তার', 'an alloy', 'একটি সংকর ধাতুতে', 'the alloy', 'মোট সংকর ধাতুর'],
  ['cement', 'সিমেন্ট', 'সিমেন্টের', 'sand', 'বালির', 'a mortar mix', 'একটি মশলায়', 'the mix', 'মোট মশলার'],
];
const CUTS = [['cloth', 'কাপড়ের'], ['rope', 'দড়ির'], ['ribbon', 'ফিতের'], ['pipe', 'পাইপের']];

function unitsCase() {
  const sub = pick(['time', 'weight', 'length', 'money']);
  if (sub === 'time') {
    const s = ri(1, 80) * 9; // seconds; s/36 percent has denominator <= 4
    const m = Math.floor(s / 60);
    const sec = s % 60;
    if (!m || !sec) return null;
    return {
      sub, ans: [s, 36],
      stem: T(`What percent is ${m} minute${m > 1 ? 's' : ''} ${sec} seconds of an hour?`, `${m} মিনিট ${sec} সেকেন্ড 1 ঘণ্টার কত শতাংশ?`),
      traps: [[pctT(s, 60), 'An hour was taken as 100 minutes; it has 60 minutes = 3600 seconds.', '1 ঘণ্টাকে 100 মিনিট ধরা হয়েছে; 1 ঘণ্টা = 60 মিনিট = 3600 সেকেন্ড।'],
        [pctT(100 * s, 60), 'That compares with one minute, not one hour.', 'এটি 1 মিনিটের সঙ্গে তুলনা, 1 ঘণ্টার সঙ্গে নয়।'],
        [pctT(m * 100 + sec, 60), 'Minutes and seconds were written as one decimal number; convert both to seconds.', 'মিনিট ও সেকেন্ডকে একটি দশমিক সংখ্যা হিসাবে লেখা হয়েছে; দুটোকেই সেকেন্ডে বদলাও।']],
      steps: [T(`${m} minute${m > 1 ? 's' : ''} ${sec} seconds = ${m} × 60 + ${sec} = ${s} seconds; 1 hour = 3600 seconds.`, `${m} মিনিট ${sec} সেকেন্ড = ${m} × 60 + ${sec} = ${s} সেকেন্ড; 1 ঘণ্টা = 3600 সেকেন্ড।`),
        T(`Percentage = ${s}/3600 × 100 = ${mixed(s, 36)}%.`, `শতকরা = ${s}/3600 × 100 = ${mixed(s, 36)}%।`)],
    };
  }
  if (sub === 'weight') {
    const cn = pick([36, 48, 64, 72, 80, 120, 150, 240]); // quintal × 100
    const g = ri(2, 60) * 125;
    const a = Math.floor(g / 1000);
    const b = g % 1000;
    if (!a || !b || !nice(g, cn * 10)) return null;
    const q = cn / 100;
    return {
      sub, ans: [g, cn * 10],
      stem: T(`What percentage is ${a} kg ${b} g of ${q} quintal?`, `${a} কেজি ${b} গ্রাম ${q} কুইন্টালের কত শতাংশ?`),
      traps: [[pctT(g, cn * 100), 'A quintal is 100 kg, not 1000 kg.', '1 কুইন্টাল = 100 কেজি, 1000 কেজি নয়।'],
        [pctT(a * 100, cn), `The ${b} g was left out; convert everything to grams.`, `${b} গ্রাম বাদ পড়েছে; সবকিছু গ্রামে বদলাও।`]],
      steps: [T(`${a} kg ${b} g = ${g} g; ${q} quintal = ${q} × 100 kg = ${cn * 1000} g.`, `${a} কেজি ${b} গ্রাম = ${g} গ্রাম; ${q} কুইন্টাল = ${q} × 100 কেজি = ${cn * 1000} গ্রাম।`),
        T(`Percentage = ${g}/${cn * 1000} × 100 = ${mixed(g, cn * 10)}%.`, `শতকরা = ${g}/${cn * 1000} × 100 = ${mixed(g, cn * 10)}%।`)],
    };
  }
  if (sub === 'length') {
    const k = pick([1, 2, 3, 4, 5]);
    const cm = ri(4, 300) * 125;
    const a = Math.floor(cm / 100);
    const b = cm % 100;
    if (!b || !nice(cm, k * 1000) || cm >= k * 100000) return null;
    return {
      sub, ans: [cm, k * 1000],
      stem: T(`What percentage is ${a} m ${b} cm of ${k} km?`, `${a} মিটার ${b} সেন্টিমিটার ${k} কিলোমিটারের কত শতাংশ?`),
      traps: [[pctT(a, k * 10), `The ${b} cm was left out; convert everything to centimetres.`, `${b} সেন্টিমিটার বাদ পড়েছে; সবকিছু সেন্টিমিটারে বদলাও।`],
        [pctT(cm, k * 100), '1 km is 1000 m = 1,00,000 cm; a zero was lost.', '1 কিমি = 1000 মিটার = 1,00,000 সেমি; একটি শূন্য বাদ পড়েছে।']],
      steps: [T(`${a} m ${b} cm = ${cm} cm; ${k} km = ${num(k * 100000)} cm.`, `${a} মিটার ${b} সেমি = ${cm} সেমি; ${k} কিমি = ${num(k * 100000)} সেমি।`),
        T(`Percentage = ${cm}/${k * 100000} × 100 = ${mixed(cm, k * 1000)}%.`, `শতকরা = ${cm}/${k * 100000} × 100 = ${mixed(cm, k * 1000)}%।`)],
    };
  }
  const y = ri(2, 12);
  const p = ri(1, 19) * 5;
  if (!nice(p, y)) return null;
  return {
    sub, ans: [p, y],
    stem: T(`What percent is ${p} paise of ₹${y}?`, `${p} পয়সা ₹${y}-এর কত শতাংশ?`),
    traps: [[pctT(p * 100, y), `₹${y} was not changed into paise; ₹1 = 100 paise.`, `₹${y}-কে পয়সায় বদলানো হয়নি; ₹1 = 100 পয়সা।`],
      [pctT(y * 100, p), 'Part and whole were swapped.', 'অংশ ও সম্পূর্ণ উল্টে গেছে।']],
    steps: [T(`₹${y} = ${y * 100} paise.`, `₹${y} = ${y * 100} পয়সা।`), T(`Percentage = ${p}/${y * 100} × 100 = ${mixed(p, y)}%.`, `শতকরা = ${p}/${y * 100} × 100 = ${mixed(p, y)}%।`)],
  };
}

function oneQuantityAsPercent(kind = pick(['complement', 'units', 'cut', 'ratio', 'streams', 'digits'])) {
  const P = 'one_quantity_as_percent';
  const shortcut = T('Bring both quantities to the same unit, write part/whole (the whole is the quantity after "of"), cancel, then × 100.',
    'দুটি রাশিকে একই এককে আনো, অংশ/সম্পূর্ণ লেখো ("-এর" আগের রাশিটি সম্পূর্ণ), কাটাকাটি করে × 100 করো।');
  if (kind === 'complement') {
    const N = pick([400, 500, 600, 750, 800, 1200, 1250, 1500, 1600, 2000, 2400, 2500, 3000]);
    const p = ri(8, 60);
    if ((N * p) % 100) return null;
    const A = (N * p) / 100;
    return make(P, {
      tags: ['complement'], difficulty: 2, time: 45,
      stem: pick(COMPLEMENT)(A, N),
      o: opts(pctT(100 - p), [
        [pctT(p), 'That is the percentage who are in the group; the question asks for the rest.', 'এটি দলের ভিতরের শতকরা; প্রশ্নে বাকিদের কথা জানতে চাওয়া হয়েছে।'],
        [pctT(A * 100, N - A), 'Divide by the total, not by the number outside the group.', 'মোট সংখ্যা দিয়ে ভাগ করো, দলের বাইরের সংখ্যা দিয়ে নয়।'],
      ], pctFill(100 - p)),
      steps: [
        T(`Not in the group = ${num(N)} − ${num(A)} = ${num(N - A)}.`, `দলের বাইরে = ${num(N)} − ${num(A)} = ${num(N - A)}।`),
        T(`Percentage = ${num(N - A)}/${num(N)} × 100 = ${100 - p}%.`, `শতকরা = ${num(N - A)}/${num(N)} × 100 = ${100 - p}%।`),
      ],
      shortcut,
    });
  }
  if (kind === 'units') {
    const c = unitsCase();
    if (!c) return null;
    return make(P, {
      tags: ['unit_conversion', c.sub], difficulty: 2, time: 60,
      stem: c.stem, o: opts(pctT(...c.ans), c.traps, pctFill(...c.ans)), steps: c.steps, shortcut,
    });
  }
  if (kind === 'cut') {
    const L = ri(12, 80);
    const R = ri(2, L - 2);
    if (!nice(100 * (L - R), L)) return null;
    const [w, wb] = pick(CUTS);
    return make(P, {
      tags: ['remaining_part'], difficulty: 2, time: 45,
      stem: T(`What percentage of a ${L} metre long piece of ${w} should be cut off so that the remaining piece is ${R} metres long?`,
        `${L} মিটার লম্বা একটি ${wb} কত শতাংশ কেটে বাদ দিলে বাকি অংশটি ${R} মিটার থাকবে?`),
      o: opts(pctT(100 * (L - R), L), [
        [pctT(100 * R, L), 'That is the part that remains, not the part cut off.', 'এটি যে অংশ থেকে যায় তার শতকরা, কেটে বাদ দেওয়া অংশের নয়।'],
        [pctT(100 * (L - R), R), 'Divide by the whole length, not by the remaining piece.', 'পুরো দৈর্ঘ্য দিয়ে ভাগ করো, বাকি অংশ দিয়ে নয়।'],
      ], pctFill(100 * (L - R), L)),
      steps: [
        T(`Length cut off = ${L} − ${R} = ${L - R} m.`, `কেটে বাদ = ${L} − ${R} = ${L - R} মিটার।`),
        T(`Percentage = ${L - R}/${L} × 100 = ${mixed(100 * (L - R), L)}%.`, `শতকরা = ${L - R}/${L} × 100 = ${mixed(100 * (L - R), L)}%।`),
      ],
      shortcut,
    });
  }
  if (kind === 'ratio') {
    const a = ri(1, 9);
    const b = ri(1, 9);
    if (a === b || gcd(a, b) !== 1 || !nice(100 * a, a + b)) return null;
    const [x, xb, xg, y, yg, where, whereBn, whole, wholeBn] = pick(MIXES);
    return make(P, {
      tags: ['ratio_to_percent'], difficulty: 2, time: 45,
      stem: T(`The ratio of ${x} to ${y} in ${where} is ${a} : ${b}. Express the quantity of ${x} as a percentage of ${whole}.`,
        `${whereBn} ${xb} ও ${yg} অনুপাত ${a} : ${b}। ${xg} পরিমাণকে ${wholeBn} শতাংশ হিসাবে প্রকাশ করো।`),
      o: opts(pctT(100 * a, a + b), [
        [pctT(100 * a, b), `${x} was compared with ${y} only; compare it with the total, ${a} + ${b} parts.`, `${xb}-কে শুধু ${yg} সঙ্গে তুলনা করা হয়েছে; মোট ${a} + ${b} ভাগের সঙ্গে তুলনা করো।`],
        [pctT(100 * b, a + b), `That is the share of ${y}.`, `এটি ${yg} অংশ।`],
      ], pctFill(100 * a, a + b)),
      steps: [
        T(`Total = ${a} + ${b} = ${a + b} parts, of which ${x} is ${a} parts.`, `মোট = ${a} + ${b} = ${a + b} ভাগ, যার ${a} ভাগ ${xb}।`),
        T(`Percentage = ${a}/${a + b} × 100 = ${mixed(100 * a, a + b)}%.`, `শতকরা = ${a}/${a + b} × 100 = ${mixed(100 * a, a + b)}%।`),
      ],
      shortcut,
    });
  }
  if (kind === 'streams') {
    const N = pick([120, 150, 160, 180, 200, 240, 250, 300, 400, 500]);
    const s = ri(1, 8) * 5;
    const S = (N * s) / 100;
    const A = ri(Math.round(N * 0.2), Math.round(N * 0.6));
    const C = N - S - A;
    if (!Number.isInteger(S) || C <= 0 || !nice(100 * C, N)) return null;
    return make(P, {
      tags: ['three_groups'], difficulty: 2, time: 60,
      stem: T(`In a school there are ${N} students in the science, commerce and arts streams. ${s}% of them study science and ${A} study arts. What percentage of the students are in the commerce stream?`,
        `একটি বিদ্যালয়ে বিজ্ঞান, বাণিজ্য ও কলা বিভাগ মিলিয়ে ${N} জন ছাত্রছাত্রী আছে। তাদের ${s}% বিজ্ঞান পড়ে এবং ${A} জন কলা বিভাগে পড়ে। শতকরা কতজন ছাত্রছাত্রী বাণিজ্য বিভাগে পড়ে?`),
      o: opts(pctT(100 * C, N), [
        [pctT(100 * A, N), 'That is the arts percentage.', 'এটি কলা বিভাগের শতকরা।'],
        [pctT(100 * (N - A), N), 'The science students were not taken away.', 'বিজ্ঞানের ছাত্রছাত্রীদের বাদ দেওয়া হয়নি।'],
      ], pctFill(100 * C, N)),
      steps: [
        T(`Science = ${s}% of ${N} = ${S}.`, `বিজ্ঞান = ${N}-এর ${s}% = ${S} জন।`),
        T(`Commerce = ${N} − ${S} − ${A} = ${C}.`, `বাণিজ্য = ${N} − ${S} − ${A} = ${C} জন।`),
        T(`Percentage = ${C}/${N} × 100 = ${mixed(100 * C, N)}%.`, `শতকরা = ${C}/${N} × 100 = ${mixed(100 * C, N)}%।`),
      ],
      shortcut,
    });
  }
  // digits: numbers 1..N with given unit digits
  const N = ri(25, 160);
  const D = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, ri(1, 3)).sort((p, q) => p - q);
  let count = 0;
  for (let i = 1; i <= N; i++) if (D.includes(i % 10)) count++;
  if (!nice(100 * count, N) || 100 * count === 10 * D.length * N) return null;
  const list = D.length === 1 ? `${D[0]}` : `${D.slice(0, -1).join(', ')} or ${D[D.length - 1]}`;
  const listBn = D.length === 1 ? `${D[0]}` : `${D.slice(0, -1).join(', ')} বা ${D[D.length - 1]}`;
  return make(P, {
    tags: ['counting'], difficulty: 3, time: 75,
    stem: T(`What percentage of the numbers from 1 to ${N} have ${list} in the unit's place?`, `1 থেকে ${N} পর্যন্ত সংখ্যাগুলির শতকরা কতগুলির একক স্থানে ${listBn} আছে?`),
    o: opts(pctT(100 * count, N), [
      [pctT(10 * D.length), `${N} is not a multiple of 10, so each digit is not exactly one in ten of the numbers; count them.`, `${N} দশের গুণিতক নয়, তাই প্রতিটি অঙ্ক ঠিক দশটিতে একটি নয়; গুনে দেখো।`],
      [pctT(count), 'That is the count, not the percentage.', 'এটি সংখ্যার গণনা, শতকরা নয়।'],
    ], pctFill(100 * count, N)),
    steps: [
      T(`Numbers from 1 to ${N} ending in ${list}: ${count} of them.`, `1 থেকে ${N}-এর মধ্যে ${listBn} দিয়ে শেষ হওয়া সংখ্যা: ${count}টি।`),
      T(`Percentage = ${count}/${N} × 100 = ${mixed(100 * count, N)}%.`, `শতকরা = ${count}/${N} × 100 = ${mixed(100 * count, N)}%।`),
    ],
    shortcut: T('Each full block of ten (1–10, 11–20, ...) has one number for each digit; count the last part separately.', 'প্রতি দশের ব্লকে (1–10, 11–20, ...) প্রতিটি অঙ্কের জন্য একটি সংখ্যা; শেষের অংশটি আলাদা করে গোনো।'),
  });
}

/* ── percentage_change: change between an old and a new value ─────────────── */

const ITEMS = [['mangoes', 'আমের'], ['potatoes', 'আলুর'], ['onions', 'পেঁয়াজের'], ['rice', 'চালের'], ['sugar', 'চিনির'], ['lentils', 'ডালের']];

function percentageChange(kind = pick(['price', 'height', 'error'])) {
  const P = 'percentage_change';
  const shortcut = T('Change ÷ ORIGINAL value × 100; simplify the fraction before multiplying.', 'পরিবর্তন ÷ আগের (প্রাথমিক) মান × 100; গুণ করার আগে ভগ্নাংশ সরল করো।');
  if (kind === 'price') {
    const a = ri(12, 90);
    const up = pick([true, true, false]);
    const d = ri(1, Math.round(a * 0.4));
    const b = up ? a + d : a - d;
    if (!nice(100 * d, a)) return null;
    const [it, itBn] = pick(ITEMS);
    const word = up ? T('increase', 'বৃদ্ধি') : T('decrease', 'হ্রাস');
    return make(P, {
      tags: ['price'], difficulty: 2, time: 45,
      stem: T(`The price of ${it} ${up ? 'rose' : 'fell'} from ₹${a} to ₹${b} per kg. What is the percentage ${word.en} in the price?`,
        `${itBn} দাম প্রতি কেজি ₹${a} থেকে ${up ? 'বেড়ে' : 'কমে'} ₹${b} হল। দামের শতকরা ${word.bn} কত?`),
      o: opts(pctT(100 * d, a), [
        [pctT(100 * d, b), 'Divide by the old price, not the new one.', 'পুরোনো দাম দিয়ে ভাগ করো, নতুন দাম দিয়ে নয়।'],
        [pctT(d), 'The rupee difference is not a percentage.', 'টাকার পার্থক্য শতকরা নয়।'],
      ], pctFill(100 * d, a)),
      steps: [
        T(`Change = ${up ? `${b} − ${a}` : `${a} − ${b}`} = ₹${d}.`, `পরিবর্তন = ${up ? `${b} − ${a}` : `${a} − ${b}`} = ₹${d}।`),
        T(`Percentage ${word.en} = ${d}/${a} × 100 = ${mixed(100 * d, a)}%.`, `শতকরা ${word.bn} = ${d}/${a} × 100 = ${mixed(100 * d, a)}%।`),
      ],
      shortcut,
    });
  }
  if (kind === 'height') {
    const a = ri(100, 170);
    const h = ri(1, 16); // half-centimetres
    const b = a + h / 2;
    if (!nice(50 * h, a)) return null;
    const [X] = names(1);
    return make(P, {
      tags: ['growth'], difficulty: 2, time: 60,
      stem: T(`Last year ${X.en}'s height was ${a} cm. This year it is ${b} cm. By what percentage has ${X.en}'s height increased?`,
        `গত বছর ${X.bn}-এর উচ্চতা ছিল ${a} সেমি। এ বছর তা ${b} সেমি। ${X.bn}-এর উচ্চতা শতকরা কত বেড়েছে?`),
      o: opts(pctT(50 * h, a), [
        [pctT(100 * h, 2 * b), "Divide by last year's height, not this year's.", 'গত বছরের উচ্চতা দিয়ে ভাগ করো, এ বছরের নয়।'],
        [same(`${h / 2}%`), 'The increase in cm is not a percentage.', 'সেমি-তে বৃদ্ধি শতকরা নয়।'],
        [pctT(100 * 2 * b, 2 * a), "That is this year's height as a percentage of last year's; subtract 100.", 'এটি গত বছরের তুলনায় এ বছরের উচ্চতার শতকরা; 100 বিয়োগ করো।'],
      ], pctFill(50 * h, a)),
      steps: [
        T(`Increase = ${b} − ${a} = ${h / 2} cm.`, `বৃদ্ধি = ${b} − ${a} = ${h / 2} সেমি।`),
        T(`Percentage increase = ${h / 2}/${a} × 100 = ${mixed(50 * h, a)}%.`, `শতকরা বৃদ্ধি = ${h / 2}/${a} × 100 = ${mixed(50 * h, a)}%।`),
      ],
      shortcut,
    });
  }
  const b = ri(30, 95); // actual
  const e = ri(1, 12) * pick([1, -1]);
  const a = b + e; // shown
  const d = Math.abs(e);
  if (!nice(100 * d, b)) return null;
  const [X] = names(1);
  return make(P, {
    tags: ['error'], difficulty: 2, time: 45,
    stem: T(`Due to a fault in a weighing machine, ${X.en}'s weight was shown as ${a} kg against the actual weight of ${b} kg. What is the percentage error?`,
      `ওজন মাপার যন্ত্রের ত্রুটির জন্য ${X.bn}-এর প্রকৃত ওজন ${b} কেজির জায়গায় ${a} কেজি দেখাল। শতকরা ত্রুটি কত?`),
    o: opts(pctT(100 * d, b), [
      [pctT(100 * d, a), 'The error is measured against the actual weight, not the shown weight.', 'ত্রুটি মাপা হয় প্রকৃত ওজনের সাপেক্ষে, দেখানো ওজনের সাপেক্ষে নয়।'],
      [pctT(d), 'The error in kg is not a percentage.', 'কেজি-তে ত্রুটি শতকরা নয়।'],
    ], pctFill(100 * d, b)),
    steps: [
      T(`Error = ${Math.max(a, b)} − ${Math.min(a, b)} = ${d} kg.`, `ত্রুটি = ${Math.max(a, b)} − ${Math.min(a, b)} = ${d} কেজি।`),
      T(`Percentage error = ${d}/${b} × 100 = ${mixed(100 * d, b)}% (on the actual value).`, `শতকরা ত্রুটি = ${d}/${b} × 100 = ${mixed(100 * d, b)}% (প্রকৃত মানের উপর)।`),
    ],
    shortcut,
  });
}

/* ── find_whole_from_percent: a part (or a gap) is known, find the whole ─── */

const BUDGETS = [
  (x, y, H) => T(`A panchayat samity spends ${x}% of its government grant on health and ${y}% on education. If the expense on health is ${inr(H)}, what is the total amount of the grant?`,
    `একটি পঞ্চায়েত সমিতি সরকারি অনুদানের ${x}% স্বাস্থ্যে এবং ${y}% শিক্ষায় খরচ করে। স্বাস্থ্যে খরচ ${inr(H)} হলে মোট অনুদান কত?`),
  (x, y, H) => T(`A family spends ${x}% of its monthly income on food and ${y}% on rent. If it spends ${inr(H)} on food, what is its monthly income?`,
    `একটি পরিবার মাসিক আয়ের ${x}% খাবারে এবং ${y}% বাড়িভাড়ায় খরচ করে। খাবারে খরচ ${inr(H)} হলে পরিবারের মাসিক আয় কত?`),
  (x, y, H) => T(`A school spends ${x}% of its annual budget on books and ${y}% on sports. If ${inr(H)} is spent on books, what is the annual budget?`,
    `একটি বিদ্যালয় বার্ষিক বাজেটের ${x}% বইয়ে এবং ${y}% খেলাধুলায় খরচ করে। বইয়ে ${inr(H)} খরচ হলে বার্ষিক বাজেট কত?`),
];
const FRACS = [[2, 3], [3, 4], [3, 5], [2, 5], [4, 5], [5, 6], [3, 8], [5, 8], [4, 7], [3, 7]];
const TANK_GAPS = [[40, 3], [20, 3], [50, 3], [25, 2], [15, 2], [10, 1], [15, 1], [20, 1], [25, 1]]; // a − b as n/d percent

function findWholeFromPercent(kind = pick(['budget', 'rebate', 'instalments', 'tank', 'fraction'])) {
  const P = 'find_whole_from_percent';
  const shortcut = T('If x% is worth V, then 1% is V ÷ x and the whole (100%) is V × 100 ÷ x.', 'x% যদি V হয়, তবে 1% = V ÷ x এবং সম্পূর্ণ (100%) = V × 100 ÷ x।');
  if (kind === 'budget') {
    const x = ri(2, 12) * 5;
    const y = ri(2, 8) * 5;
    const G = ri(20, 900) * 100;
    if (x === y || x + y >= 95) return null;
    const H = (G * x) / 100;
    const sumWay = (H * 100) / (x + y);
    const yWay = (H * 100) / y;
    return make(P, {
      tags: ['budget'], difficulty: 2, time: 60,
      stem: pick(BUDGETS)(x, y, H),
      o: opts(same(inr(G)), [
        [Number.isInteger(sumWay) && same(inr(sumWay)), `${inr(H)} is the ${x}% share alone; do not use ${x} + ${y}.`, `${inr(H)} শুধু ${x}% অংশ; ${x} + ${y} নিও না।`],
        [Number.isInteger(yWay) && same(inr(yWay)), `Use the ${x}% that belongs to ${inr(H)}, not the other percentage.`, `${inr(H)}-এর সঙ্গে যে ${x}% যুক্ত সেটিই নাও, অন্য শতাংশ নয়।`],
        [Number.isInteger((H * x) / 100) && same(inr((H * x) / 100)), `That takes ${x}% of ${inr(H)}; ${inr(H)} is already the ${x}% share, so work backwards.`, `এটি ${inr(H)}-এর ${x}%; ${inr(H)} নিজেই ${x}% অংশ, তাই উল্টো দিকে হিসাব করো।`],
      ], intFill(G, 500, (v) => same(inr(v)))),
      steps: [
        T(`${x}% of the total = ${inr(H)}.`, `মোটের ${x}% = ${inr(H)}।`),
        T(`Total = ${num(H)} × 100 ÷ ${x} = ${inr(G)}.`, `মোট = ${num(H)} × 100 ÷ ${x} = ${inr(G)}।`),
      ],
      shortcut,
    });
  }
  if (kind === 'rebate') {
    const x = pick([2, 4, 5, 8, 10, 12, 15, 20, 25]);
    const B = ri(20, 600) * 5;
    if ((B * x) % 100) return null;
    const R = (B * x) / 100;
    const paidWay = (R * 100) / (100 - x);
    return make(P, {
      tags: ['rebate'], difficulty: 2, time: 45,
      stem: T(`A ${x}% rebate is given if the electricity bill is paid on time. A consumer who paid on time got a rebate of ${inr(R)}. What was the amount of the electricity bill?`,
        `সময়মতো বিদ্যুতের বিল মেটালে ${x}% ছাড় দেওয়া হয়। সময়মতো বিল মিটিয়ে একজন গ্রাহক ${inr(R)} ছাড় পেলেন। বিদ্যুতের বিলের পরিমাণ কত ছিল?`),
      o: opts(same(inr(B)), [
        [same(inr(B - R)), 'That is the amount paid after the rebate, not the bill.', 'এটি ছাড়ের পরে দেওয়া টাকা, বিলের পরিমাণ নয়।'],
        [Number.isInteger(paidWay) && same(inr(paidWay)), 'The rebate is a percentage of the bill itself, not of the amount paid.', 'ছাড় বিলের পরিমাণের উপর শতাংশ, দেওয়া টাকার উপর নয়।'],
      ], [same(inr(R * x)), ...intFill(B, 10, (v) => same(inr(v)))]),
      steps: [
        T(`${x}% of the bill = ${inr(R)}.`, `বিলের ${x}% = ${inr(R)}।`),
        T(`Bill = ${R} × 100 ÷ ${x} = ${inr(B)}.`, `বিল = ${R} × 100 ÷ ${x} = ${inr(B)}।`),
      ],
      shortcut,
    });
  }
  if (kind === 'instalments') {
    const x = pick([15, 20, 25, 30, 35, 40, 45, 60, 65, 75, 80]);
    const n = ri(8, 60);
    if ((n * x) % 100) return null;
    const k = (n * x) / 100;
    const restWay = (k * 100) / (100 - x);
    return make(P, {
      tags: ['instalments'], difficulty: 2, time: 60,
      stem: T(`As agreed with a bank, a businessman has to repay a loan in equal instalments without interest. After paying ${k} instalments he finds that ${x}% of the loan has been repaid. How many instalments were there in the agreement?`,
        `ব্যাংকের সঙ্গে চুক্তি অনুযায়ী একজন ব্যবসায়ীকে সুদ ছাড়া সমান কিস্তিতে ঋণ শোধ করতে হবে। ${k}টি কিস্তি দেওয়ার পর তিনি দেখলেন ঋণের ${x}% শোধ হয়েছে। চুক্তিতে মোট কতগুলি কিস্তি ছিল?`),
      o: opts(same(String(n)), [
        [same(String(n - k)), 'That is the number of instalments still to be paid.', 'এটি বাকি থাকা কিস্তির সংখ্যা।'],
        [Number.isInteger(restWay) && same(String(restWay)), `${k} instalments are ${x}% of the loan, not ${100 - x}%.`, `${k}টি কিস্তি ঋণের ${x}%, ${100 - x}% নয়।`],
      ], intFill(n, 3, (v) => same(String(v)))),
      steps: [
        T(`${k} instalments = ${x}% of the loan.`, `${k}টি কিস্তি = ঋণের ${x}%।`),
        T(`All instalments (100%) = ${k} × 100 ÷ ${x} = ${n}.`, `মোট কিস্তি (100%) = ${k} × 100 ÷ ${x} = ${n}টি।`),
      ],
      shortcut,
    });
  }
  if (kind === 'tank') {
    const [gn, gd] = pick(TANK_GAPS);
    const a = ri(8, 18) * 5;
    const bN = a * gd - gn; // b = bN / gd
    if (bN <= 0) return null;
    const L = ri(2, 24);
    if ((L * 100 * gd) % gn) return null;
    const C = (L * 100 * gd) / gn;
    if (C > 200) return null;
    const vessel = pick([['bucket', 'বালতি'], ['tank', 'ট্যাঙ্ক'], ['drum', 'ড্রাম']]);
    const lit = (v) => same(`${mixed(v[0], v[1])} litres`);
    const C2 = [C, 1];
    return make(P, {
      tags: ['gap_of_two_percents'], difficulty: 3, time: 75,
      stem: T(`If a ${vessel[0]} is ${a}% full, it contains ${L} litres more water than when it is ${mixed(bN, gd)}% full. What is the capacity of the ${vessel[0]}?`,
        `একটি ${vessel[1]} ${a}% ভর্তি থাকলে তাতে ${mixed(bN, gd)}% ভর্তি অবস্থার চেয়ে ${L} লিটার বেশি জল থাকে। ${vessel[1]}টির ধারণক্ষমতা কত?`),
      o: opts(lit(C2), [
        [lit([L * 100, a]), `${L} litres is the gap between the two levels, so it matches ${a}% − ${mixed(bN, gd)}%, not ${a}%.`, `${L} লিটার দুটি স্তরের পার্থক্য, তাই এটি ${a}% − ${mixed(bN, gd)}%-এর সমান, ${a}%-এর নয়।`],
        [lit([L * 100 * gd, bN]), `${L} litres is the gap, not the ${mixed(bN, gd)}% level.`, `${L} লিটার পার্থক্য, ${mixed(bN, gd)}% স্তর নয়।`],
      ], [lit([C + 5, 1]), lit([C + 10, 1]), lit([Math.max(1, C - 5), 1]), lit([C * 2, 1])]),
      steps: [
        T(`Gap = ${a}% − ${mixed(bN, gd)}% = ${mixed(gn, gd)}% of the capacity = ${L} litres.`, `পার্থক্য = ${a}% − ${mixed(bN, gd)}% = ধারণক্ষমতার ${mixed(gn, gd)}% = ${L} লিটার।`),
        T(`Capacity = ${L} × 100 ÷ ${mixed(gn, gd)} = ${L} × ${100 * gd}/${gn} = ${C} litres.`, `ধারণক্ষমতা = ${L} × 100 ÷ ${mixed(gn, gd)} = ${L} × ${100 * gd}/${gn} = ${C} লিটার।`),
      ],
      shortcut: T('Only the GAP between the two levels is given, so divide by the gap percentage.', 'শুধু দুই স্তরের পার্থক্য দেওয়া আছে, তাই পার্থক্যের শতাংশ দিয়ে ভাগ করো।'),
    });
  }
  const [p, q] = pick(FRACS);
  const m = ri(2, 30);
  const N = p * m;
  const M = q * m;
  const x = pick([10, 20, 25, 30, 40, 50, 60, 75]);
  const ans = (M * x) / 100;
  if (!Number.isInteger(ans * 10)) return null;
  const direct = (N * x) / 100;
  return make(P, {
    tags: ['fraction_then_percent'], difficulty: 2, time: 45,
    stem: T(`${p}/${q} of a number is ${N}. What is ${x}% of that number?`, `একটি সংখ্যার ${p}/${q} অংশ ${N}। সংখ্যাটির ${x}% কত?`),
    o: opts(same(dec(ans)), [
      [Number.isInteger(direct * 100) && same(dec(direct)), `That is ${x}% of ${N}; first find the number itself.`, `এটি ${N}-এর ${x}%; আগে সংখ্যাটি বের করো।`],
      [same(String(M)), `That is the number itself; the question asks for ${x}% of it.`, `এটি সংখ্যাটি নিজেই; প্রশ্নে এর ${x}% চাওয়া হয়েছে।`],
    ], [same(dec(ans + 1)), same(dec(ans - 1)), same(dec(ans + 0.5)), same(dec(ans * 2))].filter((o) => Number(o.en) > 0)),
    steps: [
      T(`Number = ${N} × ${q}/${p} = ${M}.`, `সংখ্যাটি = ${N} × ${q}/${p} = ${M}।`),
      T(`${x}% of ${M} = ${x}/100 × ${M} = ${dec(ans)}.`, `${M}-এর ${x}% = ${x}/100 × ${M} = ${dec(ans)}।`),
    ],
    shortcut,
  });
}

/* ── overlap_pass_fail: two subjects, both-group overlap ─────────────────── */

// [subject, subject in (bn, locative), ...]: "ইংরেজিতে ফেল"
const SUBJ = [['English', 'ইংরেজিতে', 'Mathematics', 'গণিতে'], ['Bengali', 'বাংলায়', 'History', 'ইতিহাসে'], ['Science', 'বিজ্ঞানে', 'Mathematics', 'গণিতে'], ['English', 'ইংরেজিতে', 'Arithmetic', 'পাটিগণিতে']];

function overlapPassFail(kind = pick(['passBoth', 'total', 'failTotal'])) {
  const P = 'overlap_pass_fail';
  const [s1, s1b, s2, s2b] = pick(SUBJ);
  const shortcut = T('Failed in at least one = fail₁ + fail₂ − both; passed in both = 100 − that.', 'অন্তত একটিতে ফেল = ফেল₁ + ফেল₂ − দুটিতেই ফেল; দুটিতেই পাস = 100 − সেটি।');
  if (kind === 'passBoth') {
    const a = ri(15, 65);
    const b = ri(15, 65);
    const c = ri(5, Math.min(a, b) - 3);
    const atLeast = a + b - c;
    if (atLeast >= 97) return null;
    const ans = 100 - atLeast;
    return make(P, {
      tags: ['pass_both'], difficulty: 3, time: 60,
      stem: T(`In an examination, ${a}% of the candidates failed in ${s1}, ${b}% failed in ${s2} and ${c}% failed in both. What percentage of the candidates passed in both subjects?`,
        `একটি পরীক্ষায় ${a}% পরীক্ষার্থী ${s1b}, ${b}% ${s2b} এবং ${c}% দুটি বিষয়েই ফেল করেছে। শতকরা কতজন পরীক্ষার্থী দুটি বিষয়েই পাস করেছে?`),
      o: opts(pctT(ans), [
        [100 - a - b > 0 && pctT(100 - a - b), `Those who failed in both were counted twice; add the ${c}% back.`, `দুটিতে ফেল করা ${c}% দুবার গোনা হয়েছে; তা আবার যোগ করো।`],
        [pctT(atLeast), 'That is the percentage who failed in at least one subject.', 'এটি অন্তত একটি বিষয়ে ফেল করাদের শতকরা।'],
        [pctT(a + b - 2 * c), 'That is the percentage who failed in exactly one subject.', 'এটি ঠিক একটি বিষয়ে ফেল করাদের শতকরা।'],
      ], pctFill(ans)),
      steps: [
        T(`Failed in at least one = ${a} + ${b} − ${c} = ${atLeast}%.`, `অন্তত একটিতে ফেল = ${a} + ${b} − ${c} = ${atLeast}%।`),
        T(`Passed in both = 100 − ${atLeast} = ${ans}%.`, `দুটিতেই পাস = 100 − ${atLeast} = ${ans}%।`),
      ],
      shortcut,
    });
  }
  const N = ri(4, 100) * 100; // total candidates
  if (kind === 'total') {
    const p1 = ri(50, 85);
    const p2 = ri(50, 85);
    const f = ri(5, 30);
    const pb = p1 + p2 + f - 100; // passed in both
    if (pb <= 5 || pb >= Math.min(p1, p2) || (N * pb) % 100) return null;
    const B = (N * pb) / 100;
    const noBoth = (B * 100) / (p1 + p2 - 100);
    const atLeastWay = (B * 100) / (100 - f);
    return make(P, {
      tags: ['find_total', 'pass_percents'], difficulty: 3, time: 75,
      stem: T(`In an examination, ${p1}% of the examinees passed in ${s1} and ${p2}% passed in ${s2}, but ${f}% failed in both. If ${num(B)} examinees passed in both subjects, what is the total number of examinees?`,
        `একটি পরীক্ষায় ${p1}% পরীক্ষার্থী ${s1b} এবং ${p2}% ${s2b} পাস করেছে, কিন্তু ${f}% দুটি বিষয়েই ফেল করেছে। ${num(B)} জন দুটি বিষয়েই পাস করলে মোট পরীক্ষার্থী কত?`),
      o: opts(same(num(N)), [
        [p1 + p2 > 100 && Number.isInteger(noBoth) && same(num(noBoth)), `The ${f}% who failed in both were left out.`, `দুটিতে ফেল করা ${f}% বাদ পড়েছে।`],
        [Number.isInteger(atLeastWay) && same(num(atLeastWay)), `${100 - f}% passed in at least one subject, not in both.`, `${100 - f}% অন্তত একটিতে পাস করেছে, দুটিতে নয়।`],
      ], intFill(N, 100, (v) => same(num(v)))),
      steps: [
        T(`Failed in ${s1} = ${100 - p1}%, in ${s2} = ${100 - p2}%, in both = ${f}%.`, `${s1b} ফেল = ${100 - p1}%, ${s2b} ফেল = ${100 - p2}%, দুটিতেই ফেল = ${f}%।`),
        T(`Failed in at least one = ${100 - p1} + ${100 - p2} − ${f} = ${100 - pb}%, so passed in both = ${pb}%.`, `অন্তত একটিতে ফেল = ${100 - p1} + ${100 - p2} − ${f} = ${100 - pb}%, তাই দুটিতেই পাস = ${pb}%।`),
        T(`${pb}% = ${num(B)}, so total = ${num(B)} × 100 ÷ ${pb} = ${num(N)}.`, `${pb}% = ${num(B)}, তাই মোট = ${num(B)} × 100 ÷ ${pb} = ${num(N)}।`),
      ],
      shortcut,
    });
  }
  const a = ri(10, 50);
  const b = ri(10, 50);
  const c = ri(3, Math.min(a, b) - 2);
  const pb = 100 - (a + b - c);
  if (pb <= 5 || (N * pb) % 100) return null;
  const B = (N * pb) / 100;
  const noBoth = (B * 100) / (100 - a - b);
  const wrongBase = (B * 100) / (a + b - c);
  return make(P, {
    tags: ['find_total', 'fail_percents'], difficulty: 3, time: 75,
    stem: T(`In an examination, ${a}% of the students failed in ${s1}, ${b}% failed in ${s2} and ${c}% failed in both. If ${num(B)} students passed in both subjects, how many students appeared?`,
      `একটি পরীক্ষায় ${a}% ছাত্রছাত্রী ${s1b}, ${b}% ${s2b} এবং ${c}% দুটি বিষয়েই ফেল করেছে। ${num(B)} জন দুটি বিষয়েই পাস করলে মোট কতজন পরীক্ষা দিয়েছিল?`),
    o: opts(same(num(N)), [
      [100 - a - b > 0 && Number.isInteger(noBoth) && same(num(noBoth)), `The ${c}% who failed in both were counted twice.`, `দুটিতে ফেল করা ${c}% দুবার গোনা হয়েছে।`],
      [Number.isInteger(wrongBase) && same(num(wrongBase)), `${a + b - c}% is the failed group; ${num(B)} belongs to the passed-in-both ${pb}%.`, `${a + b - c}% ফেল করা দল; ${num(B)} হল দুটিতেই পাস করা ${pb}%।`],
    ], intFill(N, 100, (v) => same(num(v)))),
    steps: [
      T(`Failed in at least one = ${a} + ${b} − ${c} = ${a + b - c}%, so passed in both = ${pb}%.`, `অন্তত একটিতে ফেল = ${a} + ${b} − ${c} = ${a + b - c}%, তাই দুটিতেই পাস = ${pb}%।`),
      T(`${pb}% = ${num(B)}, so total = ${num(B)} × 100 ÷ ${pb} = ${num(N)}.`, `${pb}% = ${num(B)}, তাই মোট = ${num(B)} × 100 ÷ ${pb} = ${num(N)}।`),
    ],
    shortcut,
  });
}

/* ── fraction_percentage_conversion ───────────────────────────────────────── */

const DENS = [3, 6, 8, 12, 15, 16, 20, 24, 25, 32, 40];

function fractionPercentage(kind = pick(['toPercent', 'toFraction'])) {
  const P = 'fraction_percentage_conversion';
  const q = pick(DENS);
  const p = ri(1, q - 1);
  if (gcd(p, q) !== 1 || !nice(100 * p, q)) return null;
  const shortcut = T('Fraction → percent: × 100. Percent → fraction: write over 100 and cancel. Learn 1/8 = 12½%, 1/6 = 16⅔%, 1/3 = 33⅓%.', 'ভগ্নাংশ → শতাংশ: × 100। শতাংশ → ভগ্নাংশ: 100-এর উপর লিখে কাটাকাটি। মনে রাখো 1/8 = 12½%, 1/6 = 16⅔%, 1/3 = 33⅓%।');
  if (kind === 'toPercent') {
    return make(P, {
      tags: ['to_percent'], difficulty: 2, time: 45,
      stem: pick([T(`Write down the percentage equivalent to the fraction ${p}/${q}.`, `${p}/${q} ভগ্নাংশটির সমান শতাংশ লেখো।`), T(`Express ${p}/${q} as a percentage.`, `${p}/${q}-কে শতাংশে প্রকাশ করো।`)]),
      o: opts(pctT(100 * p, q), [
        [pctT(100 * (q - p), q), `That is ${q - p}/${q}, the rest of the whole.`, `এটি ${q - p}/${q}, বাকি অংশ।`],
        [pctT(100 * q, p), 'The fraction was turned upside down.', 'ভগ্নাংশটি উল্টে গেছে।'],
      ], pctFill(100 * p, q)),
      steps: [
        T(`Multiply by 100: ${p}/${q} × 100 = ${100 * p}/${q}.`, `100 দিয়ে গুণ করো: ${p}/${q} × 100 = ${100 * p}/${q}।`),
        T(`${100 * p}/${q} = ${mixed(100 * p, q)}, so the answer is ${mixed(100 * p, q)}%.`, `${100 * p}/${q} = ${mixed(100 * p, q)}, তাই উত্তর ${mixed(100 * p, q)}%।`),
      ],
      shortcut,
    });
  }
  const fr = (a, b) => { const [x, y] = red(a, b); return same(`${x}/${y}`); };
  return make(P, {
    tags: ['to_fraction'], difficulty: 2, time: 45,
    stem: T(`Which fraction is equal to ${mixed(100 * p, q)}%?`, `কোন ভগ্নাংশটি ${mixed(100 * p, q)}%-এর সমান?`),
    o: opts(fr(p, q), [
      [q - p !== p && fr(q - p, q), `${q - p}/${q} is ${mixed(100 * (q - p), q)}%, the rest of the whole.`, `${q - p}/${q} হল ${mixed(100 * (q - p), q)}%, বাকি অংশ।`],
    ], [fr(p + 1, q), fr(Math.max(1, p - 1), q), fr(p, q + 1), fr(p, q * 10), fr(p + 1, q + 1)].filter((o) => o.en !== '0/1')),
    steps: [
      T(`${mixed(100 * p, q)}% means ${mixed(100 * p, q)} ÷ 100 = ${red(100 * p, q)[0]}/${100 * red(100 * p, q)[1]}.`, `${mixed(100 * p, q)}% মানে ${mixed(100 * p, q)} ÷ 100 = ${red(100 * p, q)[0]}/${100 * red(100 * p, q)[1]}।`),
      T(`Cancel the common factors: ${p}/${q}.`, `সাধারণ উৎপাদক কেটে: ${p}/${q}।`),
    ],
    shortcut,
  });
}

/* ── area_volume_percent_change (new pattern) ─────────────────────────────── */

/** Net % change from factors (100 + a_i); exact to 2 decimals or null. */
function netChange(changes) {
  let prod = 1;
  for (const a of changes) prod *= 100 + a;
  const scale = 100 ** (changes.length - 1);
  const hundredths = (prod * 100) / scale - 10000; // net change × 100
  return Number.isInteger(hundredths) ? hundredths / 100 : null;
}
const changeT = (v) => (v > 0 ? T(`${dec(v)}% increase`, `${dec(v)}% বৃদ্ধি`) : v < 0 ? T(`${dec(-v)}% decrease`, `${dec(-v)}% হ্রাস`) : T('no change', 'কোনো পরিবর্তন হয় না'));
const changeFill = (v) => [1, -1, 2, -2, 5, -5].map((k) => changeT(v + k));
const upDown = (a) => (a >= 0 ? T(`increased by ${a}%`, `${a}% বাড়ানো`) : T(`decreased by ${-a}%`, `${-a}% কমানো`));

function areaVolumeChange(kind = pick(['square', 'rect', 'times', 'cube', 'cylinder'])) {
  const P = 'area_volume_percent_change';
  const shortcut = T('Area uses two lengths and volume three: multiply the factors (1 ± r/100) once per length. Two changes a and b: a + b + ab/100.', 'ক্ষেত্রফলে দুটি দৈর্ঘ্য, আয়তনে তিনটি: প্রতিটি দৈর্ঘ্যের জন্য একবার করে (1 ± r/100) গুণ করো। দুটি পরিবর্তন a ও b হলে: a + b + ab/100।');
  const stepsTwo = (a, b, v) => [
    T(`Take each length as 100: the new product is ${100 + a} × ${100 + b} = ${(100 + a) * (100 + b)} against 100 × 100 = 10000.`, `প্রতিটি দৈর্ঘ্য 100 ধরো: নতুন গুণফল ${100 + a} × ${100 + b} = ${(100 + a) * (100 + b)}, আগে ছিল 100 × 100 = 10000।`),
    T(`Net change = ${sg(a)} + ${sg(b)} + (${sg(a)} × ${sg(b)})/100 = ${sg(v)}%, i.e. ${changeT(v).en}.`, `মোট পরিবর্তন = ${sg(a)} + ${sg(b)} + (${sg(a)} × ${sg(b)})/100 = ${sg(v)}%, অর্থাৎ ${changeT(v).bn}।`),
  ];
  if (kind === 'square') {
    const x = pick([4, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50]) * pick([1, 1, -1]);
    const v = netChange([x, x]);
    const fig = pick([[T('each side of a square', 'একটি বর্গক্ষেত্রের প্রতিটি বাহু'), T('area', 'ক্ষেত্রফল')], [T('the radius of a circle', 'একটি বৃত্তের ব্যাসার্ধ'), T('area', 'ক্ষেত্রফল')], [T('each side of a square field', 'একটি বর্গাকার মাঠের প্রতিটি বাহু'), T('area', 'ক্ষেত্রফল')]]);
    return make(P, {
      tags: ['square'], difficulty: 2, time: 45,
      stem: T(`If ${fig[0].en} is ${upDown(x).en}, what is the percentage change in its ${fig[1].en}?`, `যদি ${fig[0].bn} ${upDown(x).bn} হয়, তবে ${fig[1].bn} শতকরা কত পরিবর্তিত হবে?`),
      o: opts(changeT(v), [
        [changeT(2 * x), `Area = length × length, so add the ${x} × ${x}/100 term too.`, `ক্ষেত্রফল = দৈর্ঘ্য × দৈর্ঘ্য, তাই ${x} × ${x}/100 পদটিও যোগ করো।`],
        [changeT(x), 'Area does not change by the same percentage as the length.', 'ক্ষেত্রফল দৈর্ঘ্যের সমান শতাংশে বদলায় না।'],
      ], changeFill(v)),
      steps: stepsTwo(x, x, v),
      shortcut,
    });
  }
  if (kind === 'rect') {
    const a = ri(1, 10) * 5;
    const b = pick([a, ri(1, 10) * 5]);
    const signs = pick([[1, -1], [-1, 1], [-1, -1], [1, 1]]);
    const [la, lb] = [a * signs[0], b * signs[1]];
    const v = netChange([la, lb]);
    return make(P, {
      tags: ['rectangle'], difficulty: 3, time: 60,
      stem: T(`The length of a rectangle is ${upDown(la).en} and its breadth is ${upDown(lb).en}. What is the effect on its area?`,
        `একটি আয়তক্ষেত্রের দৈর্ঘ্য ${upDown(la).bn} হল এবং প্রস্থ ${upDown(lb).bn} হল। এর ক্ষেত্রফলের উপর কী প্রভাব পড়বে?`),
      o: opts(changeT(v), [
        [changeT(la + lb), `Simply adding ${sg(la)} and ${sg(lb)} misses the product term (${sg(la)} × ${sg(lb)})/100.`, `শুধু ${sg(la)} ও ${sg(lb)} যোগ করলে (${sg(la)} × ${sg(lb)})/100 গুণফল পদটি বাদ যায়।`],
        [changeT(-v), 'Check the sign: work it out from 100 × 100.', 'চিহ্নটি দেখো: 100 × 100 থেকে হিসাব করো।'],
      ], changeFill(v)),
      steps: stepsTwo(la, lb, v),
      shortcut,
    });
  }
  if (kind === 'times') {
    const k = pick([2, 3, 4]);
    const v = (k * k - 1) * 100;
    const fig = pick([
      [T(`The length and breadth of a rectangle are both ${k === 2 ? 'doubled' : k === 3 ? 'tripled' : 'made four times'}.`, `একটি আয়তক্ষেত্রের দৈর্ঘ্য ও প্রস্থ দুটিই ${k} গুণ করা হল।`)],
      [T(`The sides of a square are ${k === 2 ? 'doubled' : k === 3 ? 'tripled' : 'made four times'}.`, `একটি বর্গক্ষেত্রের বাহুগুলি ${k} গুণ করা হল।`)],
      [T(`Each edge of a cube is ${k === 2 ? 'doubled' : k === 3 ? 'tripled' : 'made four times'}.`, `একটি ঘনকের প্রতিটি ধার ${k} গুণ করা হল।`), 'surface'],
    ]);
    const what = fig[1] === 'surface' ? T('surface area', 'সমগ্রতলের ক্ষেত্রফল') : T('area', 'ক্ষেত্রফল');
    return make(P, {
      tags: ['multiple'], difficulty: 2, time: 45,
      stem: T(`${fig[0].en} What is the percentage increase in its ${what.en}?`, `${fig[0].bn} এর ${what.bn} শতকরা কত বৃদ্ধি পাবে?`),
      o: opts(changeT(v), [
        [changeT((k - 1) * 100), `The ${what.en} becomes ${k} × ${k} = ${k * k} times, not ${k} times.`, `${what.bn} ${k} × ${k} = ${k * k} গুণ হয়, ${k} গুণ নয়।`],
        [changeT(k * k * 100), `It becomes ${k * k} times, so the INCREASE is ${k * k} − 1 = ${k * k - 1} times.`, `এটি ${k * k} গুণ হয়, তাই বৃদ্ধি ${k * k} − 1 = ${k * k - 1} গুণ।`],
      ], [changeT(v - 100), changeT(v + 100), changeT(v / 2)]),
      steps: [
        T(`Each length is multiplied by ${k}, so the ${what.en} is multiplied by ${k} × ${k} = ${k * k}.`, `প্রতিটি দৈর্ঘ্য ${k} গুণ, তাই ${what.bn} ${k} × ${k} = ${k * k} গুণ।`),
        T(`Increase = (${k * k} − 1) × 100% = ${v}%.`, `বৃদ্ধি = (${k * k} − 1) × 100% = ${v}%।`),
      ],
      shortcut,
    });
  }
  if (kind === 'cube') {
    const x = pick([5, 10, 20, 30, 50]) * pick([1, -1]);
    const vol = pick([true, false]);
    const v = vol ? netChange([x, x, x]) : netChange([x, x]);
    if (v === null) return null;
    const what = vol ? T('volume', 'আয়তন') : T('surface area', 'সমগ্রতলের ক্ষেত্রফল');
    return make(P, {
      tags: ['cube', vol ? 'volume' : 'surface'], difficulty: 3, time: 60,
      stem: T(`If each edge of a cube is ${upDown(x).en}, by what percentage will its ${what.en} change?`, `একটি ঘনকের প্রতিটি ধার ${upDown(x).bn} হলে এর ${what.bn} শতকরা কত পরিবর্তিত হবে?`),
      o: opts(changeT(v), [
        [changeT((vol ? 3 : 2) * x), `The ${vol ? 'three' : 'two'} changes multiply; they cannot simply be added.`, `${vol ? 'তিনটি' : 'দুটি'} পরিবর্তন গুণ হয়; শুধু যোগ করা যায় না।`],
        [(vol || netChange([x, x, x]) !== null) && changeT(vol ? netChange([x, x]) : netChange([x, x, x])), vol ? 'Volume uses three edges (a³), not two.' : 'Surface area uses two edges (6a²), not three.', vol ? 'আয়তনে তিনটি ধার লাগে (a³), দুটি নয়।' : 'সমগ্রতলের ক্ষেত্রফলে দুটি ধার লাগে (6a²), তিনটি নয়।'],
      ], changeFill(v)),
      steps: [
        T(`Edge factor = ${(100 + x) / 100}; ${what.en} factor = (${(100 + x) / 100})${vol ? '³' : '²'} = ${exact(1 + v / 100)}.`, `ধারের গুণক = ${(100 + x) / 100}; ${what.bn}-এর গুণক = (${(100 + x) / 100})${vol ? '³' : '²'} = ${exact(1 + v / 100)}।`),
        T(`Change = ${exact(1 + v / 100)} − 1 = ${sg(Number(exact(v / 100)))} → ${changeT(v).en}.`, `পরিবর্তন = ${exact(1 + v / 100)} − 1 = ${sg(Number(exact(v / 100)))} → ${changeT(v).bn}।`),
      ],
      shortcut,
    });
  }
  const x = pick([10, 20, 30, 50, 100, 200, 300]);
  const v = netChange([x, x]);
  const cube = netChange([x, x, x]);
  return make(P, {
    tags: ['cylinder'], difficulty: 3, time: 60,
    stem: T(`The radius of a cylinder is increased by ${x}%, keeping its height unchanged. By what percentage does its volume change?`,
      `একটি বেলনের উচ্চতা একই রেখে ব্যাসার্ধ ${x}% বাড়ানো হল। এর আয়তন শতকরা কত পরিবর্তিত হবে?`),
    o: opts(changeT(v), [
      [changeT(2 * x), 'The two radius factors multiply; add the x²/100 term too.', 'ব্যাসার্ধের দুটি গুণক গুণ হয়; x²/100 পদটিও যোগ করো।'],
      [cube !== null && changeT(cube), 'The height is unchanged, so only r² changes, not r³.', 'উচ্চতা একই, তাই শুধু r² বদলায়, r³ নয়।'],
      [changeT(x), 'Volume = πr²h; it does not change by the same percentage as r.', 'আয়তন = πr²h; এটি r-এর সমান শতাংশে বদলায় না।'],
    ], changeFill(v)),
    steps: [
      T(`V = πr²h with h fixed, so V changes as r². Radius factor = ${(100 + x) / 100}, r² factor = ${exact(((100 + x) / 100) ** 2)}.`, `V = πr²h, h স্থির, তাই V বদলায় r²-এর মতো। ব্যাসার্ধের গুণক = ${(100 + x) / 100}, r²-এর গুণক = ${exact(((100 + x) / 100) ** 2)}।`),
      T(`Change = ${x} + ${x} + (${x} × ${x})/100 = ${dec(v)}% increase.`, `পরিবর্তন = ${x} + ${x} + (${x} × ${x})/100 = ${dec(v)}% বৃদ্ধি।`),
    ],
    shortcut,
  });
}

/* ── percent_equation (new pattern): x% of A = y% of B ───────────────────── */

const PCTS = [10, 15, 20, 25, 30, 40, 45, 50, 60, 75, 80, 90];
const FRAC_PCTS = [[250, 3], [100, 3], [200, 3], [25, 2], [75, 2], [125, 2], [50, 3], [175, 2]];

function percentEquation(kind = pick(['xOf', 'howMany', 'sum', 'equalAfter', 'savings'])) {
  const P = 'percent_equation';
  const shortcut = T('x% of A = y% of B ⇒ A : B = y : x. Cross the percentages over and simplify.', 'A-এর x% = B-এর y% ⇒ A : B = y : x। শতাংশগুলি আড়াআড়ি নিয়ে সরল করো।');
  if (kind === 'xOf') {
    const a = pick(PCTS);
    const b = pick(PCTS);
    if (a === b) return null;
    const askAofB = pick([true, false]);
    // a% of P = b% of Q  =>  P = (b/a) Q  and  Q = (a/b) P
    const [n, d] = askAofB ? [100 * b, a] : [100 * a, b];
    const [inN, inD] = askAofB ? [100 * a, b] : [100 * b, a];
    if (!nice(n, d)) return null;
    const [P1, P2] = pick([['A', 'B'], ['P', 'Q'], ['X', 'Y']]);
    const stem = askAofB
      ? T(`If ${a}% of ${P1} = ${b}% of ${P2}, then ${P1} = x% of ${P2}. What is the value of x?`, `যদি ${P1}-এর ${a}% = ${P2}-এর ${b}% হয়, এবং ${P1} = ${P2}-এর x% হয়, তবে x-এর মান কত?`)
      : T(`If ${a}% of ${P1} = ${b}% of ${P2}, what percentage of ${P1} is ${P2}?`, `যদি ${P1}-এর ${a}% = ${P2}-এর ${b}% হয়, তবে ${P2}, ${P1}-এর কত শতাংশ?`);
    const f = askAofB ? (p, q) => same(mixed(p, q)) : pctT;
    return make(P, {
      tags: ['ratio_from_equal_percents'], difficulty: 2, time: 45,
      stem,
      o: opts(f(n, d), [
        [f(inN, inD), 'The ratio was turned upside down: the smaller percentage belongs to the bigger quantity.', 'অনুপাত উল্টে গেছে: ছোট শতাংশ বড় রাশির সঙ্গে যায়।'],
        [f(n, 100 * d), 'Write the answer as a percentage: multiply the ratio by 100.', 'উত্তর শতাংশে লেখো: অনুপাতকে 100 দিয়ে গুণ করো।'],
      ], [f(n + 10 * d, d), f(Math.abs(n - 10 * d) || 5, d), f(n + 50 * d, d)]),
      steps: [
        T(`${a}/100 × ${P1} = ${b}/100 × ${P2}, so ${P1}/${P2} = ${b}/${a}.`, `${a}/100 × ${P1} = ${b}/100 × ${P2}, তাই ${P1}/${P2} = ${b}/${a}।`),
        askAofB
          ? T(`${P1} = ${b}/${a} × 100% of ${P2} = ${mixed(n, d)}% of ${P2}, so x = ${mixed(n, d)}.`, `${P1} = ${P2}-এর ${b}/${a} × 100% = ${mixed(n, d)}%, তাই x = ${mixed(n, d)}।`)
          : T(`${P2}/${P1} = ${a}/${b}, i.e. ${P2} = ${mixed(n, d)}% of ${P1}.`, `${P2}/${P1} = ${a}/${b}, অর্থাৎ ${P2} = ${P1}-এর ${mixed(n, d)}%।`),
      ],
      shortcut,
    });
  }
  if (kind === 'howMany') {
    const a = pick([20, 25, 30, 40, 45, 50, 60, 75, 80]);
    const [bn, bd] = pick(FRAC_PCTS);
    const N = ri(2, 60) * 6;
    // a% of X = (bn/bd)% of N  =>  X = N × bn / (bd × a)
    if ((N * bn) % (bd * a)) return null;
    const X = (N * bn) / (bd * a);
    const inv = (N * a * bd) / bn;
    const part = (N * bn) / (bd * 100);
    return make(P, {
      tags: ['find_unknown'], difficulty: 2, time: 60,
      stem: T(`${a}% of how many rupees is equal to ${mixed(bn, bd)}% of ₹${N}?`, `কত টাকার ${a}% = ₹${N}-এর ${mixed(bn, bd)}%?`),
      o: opts(same(`₹${X}`), [
        [Number.isInteger(inv) && same(`₹${inv}`), 'The two percentages were swapped.', 'দুটি শতাংশ অদলবদল হয়ে গেছে।'],
        [Number.isInteger(part) && same(`₹${part}`), `That is ${mixed(bn, bd)}% of ₹${N}; it must still be divided by ${a}%.`, `এটি ₹${N}-এর ${mixed(bn, bd)}%; একে আরও ${a}% দিয়ে ভাগ করতে হবে।`],
      ], intFill(X, Math.max(5, Math.round(X / 10)), (v) => same(`₹${v}`))),
      steps: [
        T(`${mixed(bn, bd)}% of ${N} = ${bn}/${bd * 100} × ${N} = ${dec(part)}.`, `${N}-এর ${mixed(bn, bd)}% = ${bn}/${bd * 100} × ${N} = ${dec(part)}।`),
        T(`${a}% of the sum = ${dec(part)}, so the sum = ${dec(part)} × 100 ÷ ${a} = ₹${X}.`, `টাকার ${a}% = ${dec(part)}, তাই টাকা = ${dec(part)} × 100 ÷ ${a} = ₹${X}।`),
      ],
      shortcut,
    });
  }
  if (kind === 'sum') {
    const a = ri(2, 8) * 5;
    const N = ri(4, 40) * 20;
    const b = ri(2, 10) * 5;
    const x = ri(2, 40) * 20;
    const A = (N * a) / 100;
    const B = (x * b) / 100;
    if (!Number.isInteger(A) || !Number.isInteger(B)) return null;
    const S = A + B;
    const noSub = (S * 100) / b;
    const added = ((S + A) * 100) / b;
    return make(P, {
      tags: ['linear'], difficulty: 2, time: 60,
      stem: T(`If ${a}% of ${N} is added to ${b}% of a number, the sum is ${S}. What is the number?`, `${N}-এর ${a}%-এর সঙ্গে একটি সংখ্যার ${b}% যোগ করলে যোগফল হয় ${S}। সংখ্যাটি কত?`),
      o: opts(same(String(x)), [
        [Number.isInteger(noSub) && same(String(noSub)), `${a}% of ${N} must be taken away from ${S} first.`, `আগে ${S} থেকে ${N}-এর ${a}% বাদ দিতে হবে।`],
        [Number.isInteger(added) && same(String(added)), `${A} should be subtracted from ${S}, not added.`, `${S} থেকে ${A} বিয়োগ করতে হবে, যোগ নয়।`],
      ], intFill(x, 20, (v) => same(String(v)))),
      steps: [
        T(`${a}% of ${N} = ${A}.`, `${N}-এর ${a}% = ${A}।`),
        T(`${b}% of the number = ${S} − ${A} = ${B}.`, `সংখ্যাটির ${b}% = ${S} − ${A} = ${B}।`),
        T(`Number = ${B} × 100 ÷ ${b} = ${x}.`, `সংখ্যাটি = ${B} × 100 ÷ ${b} = ${x}।`),
      ],
      shortcut,
    });
  }
  if (kind === 'equalAfter') {
    const a = ri(1, 10) * 5;
    const b = ri(1, 10) * 5;
    const r = ratioT(100 - b, 100 + a);
    return make(P, {
      tags: ['become_equal'], difficulty: 3, time: 60,
      stem: T(`Of two numbers, if the first is increased by ${a}% and the second is decreased by ${b}%, they become equal. What is the ratio of the first number to the second?`,
        `দুটি সংখ্যার প্রথমটিকে ${a}% বাড়ালে এবং দ্বিতীয়টিকে ${b}% কমালে তারা সমান হয়। প্রথম ও দ্বিতীয় সংখ্যার অনুপাত কত?`),
      o: opts(r, [
        [ratioT(100 + a, 100 - b), 'Reversed: the number that is increased must be the smaller one.', 'উল্টে গেছে: যে সংখ্যা বাড়ানো হয় সেটিই ছোট।'],
        [ratioT(a, b), 'The percentages themselves are not the numbers.', 'শতাংশগুলি নিজেরা সংখ্যা নয়।'],
      ], [ratioT(100 - a, 100 + b), ratioT(b, a), ratioT(100 + b, 100 - a)]),
      steps: [
        T(`${100 + a}% of the first = ${100 - b}% of the second.`, `প্রথমটির ${100 + a}% = দ্বিতীয়টির ${100 - b}%।`),
        T(`First : second = ${100 - b} : ${100 + a} = ${r.en}.`, `প্রথম : দ্বিতীয় = ${100 - b} : ${100 + a} = ${r.bn}।`),
      ],
      shortcut,
    });
  }
  const a = ri(2, 10) * 5;
  const b = ri(2, 10) * 5;
  if (a === b) return null;
  const [X, Y] = names(2);
  const r = ratioT(100 - b, 100 - a);
  return make(P, {
    tags: ['equal_expenditure'], difficulty: 3, time: 60,
    stem: T(`${X.en} saves ${a}% and ${Y.en} saves ${b}% of their respective incomes. If their expenditures are equal, what is the ratio of the incomes of ${X.en} and ${Y.en}?`,
      `${X.bn} নিজের আয়ের ${a}% এবং ${Y.bn} নিজের আয়ের ${b}% সঞ্চয় করে। তাদের খরচ সমান হলে ${X.bn} ও ${Y.bn}-এর আয়ের অনুপাত কত?`),
    o: opts(r, [
      [ratioT(100 - a, 100 - b), `Reversed: ${X.en} spends ${100 - a}% of income, so equal spending gives incomes in the ratio ${100 - b} : ${100 - a}.`, `উল্টে গেছে: ${X.bn} আয়ের ${100 - a}% খরচ করে, তাই খরচ সমান হলে আয়ের অনুপাত ${100 - b} : ${100 - a}।`],
      [ratioT(a, b), 'That compares the savings rates, not the incomes.', 'এটি সঞ্চয়ের হারের তুলনা, আয়ের নয়।'],
    ], [ratioT(b, a), ratioT(100 + a, 100 + b), ratioT(100 + b, 100 + a)]),
    steps: [
      T(`Expenditure = ${100 - a}% of ${X.en}'s income = ${100 - b}% of ${Y.en}'s income.`, `খরচ = ${X.bn}-এর আয়ের ${100 - a}% = ${Y.bn}-এর আয়ের ${100 - b}%।`),
      T(`So incomes ${X.en} : ${Y.en} = ${100 - b} : ${100 - a} = ${r.en}.`, `তাই আয় ${X.bn} : ${Y.bn} = ${100 - b} : ${100 - a} = ${r.bn}।`),
    ],
    shortcut,
  });
}

/** Generators return null for numbers that do not come out exact; draw again. */
function retry(g, tries = 50) {
  for (let i = 0; i < tries; i++) {
    const q = g();
    if (q) return q;
  }
  return null;
}

const GENS = {
  percentOfNumber, oneQuantityAsPercent, percentageChange, findWholeFromPercent,
  overlapPassFail, fractionPercentage, areaVolumeChange, percentEquation,
};

module.exports = {
  subject: 'quant',
  topics: [{ topic: TOPIC, weight: 1, gens: Object.values(GENS).map((g) => () => retry(g)) }],
  ...GENS,
  SUBTOPIC,
  mixed,
};
