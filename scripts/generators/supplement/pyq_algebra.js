'use strict';

/**
 * Algebra: standard-level practice for the WBPSC-family PYQ types with no same-type
 * practice — one-unknown word problems, "two kinds, one total" (heads & legs, coins,
 * negative marking), two numbers from sum/difference/product/quotient, and pair totals.
 * subtopic = pattern = a key of db/patterns/quant/algebra.js.
 *
 * Numbers are built backwards from whole-number answers, so every option is exact;
 * distractors are the real slips with a trap note.
 */

const { rand, ri, pick, shuffle, gcd, T, NAMES_M, NAMES_F, names, build } = require('../common');

const TOPIC = 'algebra';
const MINUS = '−';
const same = (s) => T(s, s);

/** Options: hints = [[value, trapEn, trapBn]]; fmt(v) -> string or { en, bn } (null = unusable). */
function opts(ans, fmt, hints = [], fillers = []) {
  const toT = (v) => { const x = fmt(v); return x === null || x === undefined ? null : typeof x === 'string' ? same(x) : x; };
  const c = toT(ans);
  const seen = new Set([c.en]);
  const wrong = [];
  const add = (v, trap) => {
    if (v === null || v === undefined || wrong.length >= 3) return;
    const x = toT(v);
    if (!x || seen.has(x.en)) return;
    seen.add(x.en);
    wrong.push({ ...x, ...(trap && { trap }) });
  };
  for (const [v, en, bn] of hints) add(v, T(en, bn));
  for (const v of shuffle(fillers)) add(v);
  return wrong.length < 3 ? null : { correct: c, wrong };
}
const posInt = (v) => (Number.isInteger(v) && v > 0 ? String(v) : null);
function finish(pattern, framing, difficulty, time, stem, options, steps, shortcut) {
  if (!options || !options.wrong.some((w) => w.trap)) return null;
  return build({ topic: TOPIC, subtopic: pattern, pattern, tags: [pattern, framing], difficulty, time, stem, ...options, steps, shortcut });
}
/** Exact text for a/b: "7/3" -> "2 1/3", "6/2" -> "3". */
function mixed(n, d) {
  const g = gcd(n, d); n /= g; d /= g;
  if (d === 1) return String(n);
  const w = Math.floor(n / d); const r = n - w * d;
  return w ? `${w} ${r}/${d}` : `${r}/${d}`;
}

// ── 1. linear_equation_word ────────────────────────────────────
const LE_KINDS = ['mult_increase', 'same_result', 'square_increase', 'consec_squares', 'share'];
function linearEquationWord(kind = pick(LE_KINDS)) {
  if (kind === 'mult_increase') {
    const k = ri(3, 19); const x = ri(5, 60); const N = (k - 1) * x;
    const stem = T(`A number when multiplied by ${k} is increased by ${N}. The number is`, `একটি সংখ্যাকে ${k} দিয়ে গুণ করলে সেটি ${N} বৃদ্ধি পায়। সংখ্যাটি কত?`);
    const options = opts(x, posInt, [
      [N % k === 0 ? N / k : null, `${N} is the increase, which is ${k}x ${MINUS} x = ${k - 1}x, not ${k}x.`, `${N} হল বৃদ্ধি, অর্থাৎ ${k}x ${MINUS} x = ${k - 1}x, ${k}x নয়।`],
      [N % (k + 1) === 0 ? N / (k + 1) : null, `Divided by ${k + 1}; the number itself is subtracted, so divide by ${k - 1}.`, `${k + 1} দিয়ে ভাগ করা হয়েছে; সংখ্যাটা নিজে বিয়োগ হয়, তাই ${k - 1} দিয়ে ভাগ।`],
    ], [x + 1, x - 1, x + 5, x + 10, x - 5]);
    return finish('linear_equation_word', kind, 2, 45, stem, options, [
      T(`Let the number be x. Then ${k}x = x + ${N}.`, `ধরো সংখ্যাটি x। তাহলে ${k}x = x + ${N}।`),
      T(`${k - 1}x = ${N}, so x = ${N} ÷ ${k - 1} = ${x}.`, `${k - 1}x = ${N}, তাই x = ${N} ÷ ${k - 1} = ${x}।`),
    ], T(`Increase = (multiplier − 1) × number, so number = ${N} ÷ ${k - 1}.`, `বৃদ্ধি = (গুণক − 1) × সংখ্যা, তাই সংখ্যা = ${N} ÷ ${k - 1}।`));
  }
  if (kind === 'same_result') {
    // x + P = R·x with R = 1 + q/m  =>  x = P·m/q
    const m = ri(2, 9); const q = pick([1, 1, 2, 3]);
    if (q >= m || gcd(q, m) !== 1) return null;
    const usesR = rand() < 0.3;
    const Pn = usesR ? m + q : q * ri(1, 6) * m; const Pd = m; // P = Pn/Pd
    const x = (Pn * m) / (Pd * q);
    if (!Number.isInteger(x) || x < 2) return null;
    const r = mixed(m + q, m); const P = mixed(Pn, Pd);
    const stem = usesR
      ? T(`Which number gives the same result when added to ${r} and when multiplied by ${r}?`, `কোন সংখ্যার সঙ্গে ${r} যোগ করলে এবং সংখ্যাটিকে ${r} দিয়ে গুণ করলে একই ফল পাওয়া যায়?`)
      : T(`Which number gives the same result when ${P} is added to it and when it is multiplied by ${r}?`, `কোন সংখ্যার সঙ্গে ${P} যোগ করলে এবং সংখ্যাটিকে ${r} দিয়ে গুণ করলে একই ফল পাওয়া যায়?`);
    const options = opts(x, posInt, [
      [Number.isInteger((Pn * q) / (Pd * m)) ? (Pn * q) / (Pd * m) : null, `Multiplied ${P} by ${q}/${m} instead of dividing by it.`, `${P}-কে ${q}/${m} দিয়ে ভাগের বদলে গুণ করা হয়েছে।`],
      [m, `${m} is the denominator of ${r}; substitute to check — both results must be equal.`, `${m} হল ${r}-এর হর; বসিয়ে দেখো — দুটো ফল সমান হতে হবে।`],
    ], [x + 1, x + 2, x - 1, x + m, 2 * x]);
    return finish('linear_equation_word', kind, 3, 60, stem, options, [
      T(`x + ${P} = ${r} × x, so (${r} − 1)x = ${P}, i.e. ${q}x/${m} = ${P}.`, `x + ${P} = ${r} × x, তাই (${r} − 1)x = ${P}, অর্থাৎ ${q}x/${m} = ${P}।`),
      T(`x = ${P} × ${m}/${q} = ${x}.`, `x = ${P} × ${m}/${q} = ${x}।`),
      T(`Check: ${x} + ${P} = ${mixed(x * Pd + Pn, Pd)} and ${x} × ${r} = ${mixed(x * (m + q), m)}.`, `যাচাই: ${x} + ${P} = ${mixed(x * Pd + Pn, Pd)} এবং ${x} × ${r} = ${mixed(x * (m + q), m)}।`),
    ], T('x + P = Rx gives x = P ÷ (R − 1).', 'x + P = Rx থেকে x = P ÷ (R − 1)।'));
  }
  if (kind === 'square_increase') {
    const k = ri(6, 40);
    const stem = T(`If a positive number is multiplied by ${k}, the result is the number increased by the square of the number. The number is`, `একটি ধনাত্মক সংখ্যাকে ${k} দিয়ে গুণ করলে যে ফল হয়, তা সংখ্যাটির সঙ্গে তার বর্গ যোগ করার সমান। সংখ্যাটি কত?`);
    const options = opts(k - 1, posInt, [
      [k, `x = ${k} gives ${k * k} on one side and ${k + k * k} on the other; divide ${k}x = x + x² by x to get x = ${k} ${MINUS} 1.`, `x = ${k} বসালে মেলে না; ${k}x = x + x²-কে x দিয়ে ভাগ করলে x = ${k} ${MINUS} 1।`],
      [k + 1, `The x on the right moves across with a minus sign: x = ${k} ${MINUS} 1.`, `ডান দিকের x অন্য দিকে গেলে বিয়োগ হয়: x = ${k} ${MINUS} 1।`],
    ], [k - 2, k - 3, k + 2, 2 * k]);
    return finish('linear_equation_word', kind, 2, 50, stem, options, [
      T(`${k}x = x + x².`, `${k}x = x + x²।`),
      T(`Divide by x (x > 0): ${k} = 1 + x, so x = ${k - 1}.`, `x দিয়ে ভাগ করে (x > 0): ${k} = 1 + x, তাই x = ${k - 1}।`),
    ], T('kx = x + x² ⇒ x = k − 1.', 'kx = x + x² ⇒ x = k − 1।'));
  }
  if (kind === 'consec_squares') {
    const type = pick(['odd', 'even', 'plain']);
    let x; let D; let gap;
    if (type === 'plain') { x = ri(10, 99); gap = 1; D = 2 * x + 1; } else { x = 2 * ri(5, 60) + (type === 'odd' ? 1 : 0); gap = 2; D = 4 * x + 4; }
    const askLarger = rand() < 0.35;
    const ans = askLarger ? x + gap : x;
    const what = type === 'plain' ? T('consecutive natural numbers', 'ক্রমিক স্বাভাবিক সংখ্যা') : type === 'odd' ? T('consecutive odd integers', 'ক্রমিক বিজোড় পূর্ণসংখ্যা') : T('consecutive even integers', 'ক্রমিক জোড় পূর্ণসংখ্যা');
    const stem = T(`The difference of the squares of two ${what.en} is ${D}. The ${askLarger ? 'larger' : 'smaller'} of them is`, `দুটি ${what.bn}র বর্গের অন্তর ${D}। তাদের মধ্যে ${askLarger ? 'বড়টি' : 'ছোটটি'} কত?`);
    const options = opts(ans, posInt, [
      [askLarger ? x : x + gap, `That is the ${askLarger ? 'smaller' : 'larger'} number.`, `এটা ${askLarger ? 'ছোট' : 'বড়'} সংখ্যাটি।`],
      [gap === 2 ? D / 4 : D - 1, gap === 2 ? `(x + 2)² ${MINUS} x² = 4x + 4, not 4x.` : `(x + 1)² ${MINUS} x² = 2x + 1: after taking away 1, still halve.`, gap === 2 ? `(x + 2)² ${MINUS} x² = 4x + 4, 4x নয়।` : `(x + 1)² ${MINUS} x² = 2x + 1: 1 বিয়োগের পর অর্ধেকও করতে হবে।`],
    ], [ans + 2 * gap, ans - 2 * gap, ans + 4, ans - 4]);
    const n = type === 'plain' ? '1' : '2';
    return finish('linear_equation_word', kind, 3, 60, stem, options, [
      T(`Let the numbers be x and x + ${n}: (x + ${n})² ${MINUS} x² = ${gap === 2 ? '4x + 4' : '2x + 1'} = ${D}.`, `ধরো সংখ্যা দুটি x ও x + ${n}: (x + ${n})² ${MINUS} x² = ${gap === 2 ? '4x + 4' : '2x + 1'} = ${D}।`),
      T(`x = ${gap === 2 ? `(${D} ${MINUS} 4) ÷ 4` : `(${D} ${MINUS} 1) ÷ 2`} = ${x}; the numbers are ${x} and ${x + gap}.`, `x = ${gap === 2 ? `(${D} ${MINUS} 4) ÷ 4` : `(${D} ${MINUS} 1) ÷ 2`} = ${x}; সংখ্যা দুটি ${x} ও ${x + gap}।`),
    ], T('a² − b² = (a + b)(a − b): with a − b known, a + b = difference ÷ gap.', 'a² − b² = (a + b)(a − b): a − b জানা থাকলে a + b = অন্তর ÷ ব্যবধান।'));
  }
  // share: A = B + C, B = C + d, D = C
  const C = ri(4, 40) * 5; const d = ri(2, 30) * 5;
  const total = 5 * C + 2 * d;
  const ask = pick(['A', 'A', 'B', 'C']);
  const val = { A: 2 * C + d, B: C + d, C }[ask];
  const [p, q, r, s] = ['A', 'B', 'C', 'D'];
  const stem = T(`A sum of ₹ ${total} is distributed among ${p}, ${q}, ${r} and ${s} in such a manner that ${p} gets as much as ${q} and ${r} together, ${q} gets ₹ ${d} more than ${r}, and ${s} gets as much as ${r}. What is ${ask}'s share?`,
    `₹ ${total} টাকা ${p}, ${q}, ${r} ও ${s}-এর মধ্যে এমনভাবে ভাগ করা হল যে ${p} পায় ${q} ও ${r}-এর মিলিত ভাগের সমান, ${q} পায় ${r}-এর চেয়ে ₹ ${d} বেশি, আর ${s} পায় ${r}-এর সমান। ${ask}-এর ভাগ কত?`);
  const money = (v) => (Number.isInteger(v) && v > 0 ? `₹ ${v}` : null);
  const others = { A: 2 * C + d, B: C + d, C };
  const options = opts(val, money, [
    ...Object.entries(others).filter(([k]) => k !== ask).map(([k, v]) => [v, `That is ${k}'s share.`, `এটা ${k}-এর ভাগ।`]),
    [(total - d) / 4, `There are four people but C's amount appears 5 times: A (2C + ${d}) + B (C + ${d}) + C + D (C).`, `চারজন হলেও C-এর পরিমাণ 5 বার আসে: A (2C + ${d}) + B (C + ${d}) + C + D (C)।`],
  ], [val + 25, val - 25, val + 50]);
  return finish('linear_equation_word', kind, 3, 90, stem, options, [
    T(`Let C = x. Then D = x, B = x + ${d}, A = B + C = 2x + ${d}.`, `ধরো C = x। তাহলে D = x, B = x + ${d}, A = B + C = 2x + ${d}।`),
    T(`Total: 5x + ${2 * d} = ${total}, so x = ${C}.`, `মোট: 5x + ${2 * d} = ${total}, তাই x = ${C}।`),
    T(`${ask}'s share = ₹ ${val}.`, `${ask}-এর ভাগ = ₹ ${val}।`),
  ], T('Write everyone in terms of the smallest share, add, and solve once.', 'সবার ভাগ সবচেয়ে ছোট ভাগের হিসাবে লেখো, যোগ করো, একবারে সমাধান করো।'));
}

// ── 2. two_kinds_total ─────────────────────────────────────────
const A_ = (en, bn, g) => ({ en, bn, g });
const ANIMALS = [
  [A_('hens', 'মুরগি', 'মুরগির'), 2, A_('cows', 'গরু', 'গরুর'), 4], [A_('crows', 'কাক', 'কাকের'), 2, A_('cows', 'গরু', 'গরুর'), 4],
  [A_('ducks', 'হাঁস', 'হাঁসের'), 2, A_('goats', 'ছাগল', 'ছাগলের'), 4], [A_('pigeons', 'পায়রা', 'পায়রার'), 2, A_('rabbits', 'খরগোশ', 'খরগোশের'), 4],
  [A_('parrots', 'টিয়া', 'টিয়ার'), 2, A_('dogs', 'কুকুর', 'কুকুরের'), 4],
];
const TK_KINDS = ['heads_legs', 'heads_legs_ratio', 'legs_excess', 'coins', 'notes', 'marks', 'sweets'];
function twoKindsTotal(kind = pick(TK_KINDS)) {
  if (kind === 'heads_legs' || kind === 'heads_legs_ratio') {
    const [S, s, L, l] = pick(ANIMALS);
    const big = ri(3, 40); const small = ri(3, 40);
    if (big === small) return null;
    const H = big + small; const legs = big * l + small * s;
    const place = pick([T('In an enclosure', 'একটি খোঁয়াড়ে'), T('On a farm', 'একটি খামারে'), T('In a group', 'একটি দলে')]);
    if (kind === 'heads_legs_ratio') {
      const g = gcd(big, small);
      const rat = (a, b) => `${a / gcd(a, b)} : ${b / gcd(a, b)}`;
      if (big / g > 12 || small / g > 12) return null;
      const stem = T(`${place.en}, there are ${S.en} as well as ${L.en}. If there are ${H} heads and ${legs} legs, what is the ratio of the ${L.en} to the ${S.en}?`, `${place.bn} ${S.bn} ও ${L.bn} আছে। মোট মাথা ${H}টি ও পা ${legs}টি হলে ${L.bn} ও ${S.g} সংখ্যার অনুপাত কত?`);
      const options = opts(rat(big, small), (x) => x, [
        [rat(small, big), 'The ratio was turned round: the question asks for the larger animals first.', 'অনুপাত উল্টে গেছে: প্রশ্নে আগে বড় প্রাণীর সংখ্যা চাওয়া হয়েছে।'],
      ], [rat(big + 1, small), rat(big, small + 1), rat(big + 2, small), rat(1, 1), rat(3, 1), rat(1, 3)].filter((x) => x !== rat(big, small)));
      return finish('two_kinds_total', kind, 3, 60, stem, options, [
        T(`If all ${H} were ${S.en}: ${H} × ${s} = ${H * s} legs; extra legs = ${legs} ${MINUS} ${H * s} = ${legs - H * s}.`, `সবাই ${S.bn} হলে: ${H} × ${s} = ${H * s}টি পা; বাড়তি পা = ${legs} ${MINUS} ${H * s} = ${legs - H * s}।`),
        T(`${L.en} = ${legs - H * s} ÷ ${l - s} = ${big}, ${S.en} = ${small}; ratio ${rat(big, small)}.`, `${L.bn} = ${legs - H * s} ÷ ${l - s} = ${big}, ${S.bn} = ${small}; অনুপাত ${rat(big, small)}।`),
      ], T('Assume all are two-legged; extra legs ÷ 2 = four-legged ones.', 'ধরো সবাই দু-পেয়ে; বাড়তি পা ÷ 2 = চার-পেয়ে।'));
    }
    const askBig = rand() < 0.6;
    const ans = askBig ? big : small;
    const stem = T(`${place.en} there are some ${S.en} and ${L.en}. The total number of heads is ${H} and the total number of legs is ${legs}. How many ${askBig ? L.en : S.en} are there?`, `${place.bn} কিছু ${S.bn} ও ${L.bn} আছে। মোট মাথা ${H}টি এবং মোট পা ${legs}টি। ${askBig ? L.bn : S.bn} কয়টি?`);
    const options = opts(ans, posInt, [
      [askBig ? small : big, `That is the number of ${askBig ? S.en : L.en}.`, `এটা ${askBig ? S.g : L.g} সংখ্যা।`],
      [legs - H * s, `${legs - H * s} is the number of extra legs; each ${L.en.replace(/s$/, '')} has ${l - s} extra, so divide by ${l - s}.`, `${legs - H * s} হল বাড়তি পায়ের সংখ্যা; প্রতিটির ${l - s}টি বাড়তি পা, তাই ${l - s} দিয়ে ভাগ।`],
    ], [ans + 1, ans - 1, ans + 2, ans + 5, ans - 3]);
    return finish('two_kinds_total', kind, 2, 60, stem, options, [
      T(`If all ${H} were ${S.en}: ${H} × ${s} = ${H * s} legs.`, `সবাই ${S.bn} হলে: ${H} × ${s} = ${H * s}টি পা।`),
      T(`Extra legs = ${legs} ${MINUS} ${H * s} = ${legs - H * s}; ${L.en} = ${legs - H * s} ÷ ${l - s} = ${big}.`, `বাড়তি পা = ${legs} ${MINUS} ${H * s} = ${legs - H * s}; ${L.bn} = ${legs - H * s} ÷ ${l - s} = ${big}।`),
      T(`${S.en} = ${H} ${MINUS} ${big} = ${small}.`, `${S.bn} = ${H} ${MINUS} ${big} = ${small}।`),
    ], T('Assume all are two-legged; extra legs ÷ 2 = four-legged ones.', 'ধরো সবাই দু-পেয়ে; বাড়তি পা ÷ 2 = চার-পেয়ে।'));
  }
  if (kind === 'legs_excess') {
    const [S, , L] = pick(ANIMALS);
    const big = ri(3, 30); const k = 2;
    const E = 2 * big; // legs − 2 × heads = 2 × four-legged
    const stem = T(`In a group of ${L.en} and ${S.en}, the number of legs is ${E} more than ${k === 2 ? 'twice' : ''} the number of heads. How many ${L.en} are there?`, `${L.bn} ও ${S.g} একটি দলে পায়ের সংখ্যা মাথার সংখ্যার দ্বিগুণের চেয়ে ${E} বেশি। ${L.bn} কয়টি?`);
    const options = opts(big, posInt, [
      [E, `${E} is the number of extra legs; each ${L.en.replace(/s$/, '')} contributes 2 of them.`, `${E} হল বাড়তি পায়ের সংখ্যা; প্রতিটি থেকে 2টি করে আসে।`],
      [E % 4 === 0 ? E / 4 : null, 'Divided by 4 legs; only the 2 EXTRA legs per animal count here.', '4টি পা দিয়ে ভাগ করা হয়েছে; এখানে প্রতিটির শুধু 2টি বাড়তি পা গোনা হয়।'],
    ], [big + 1, big - 1, big + 2, big + 5, big - 2]);
    return finish('two_kinds_total', kind, 3, 60, stem, options, [
      T(`Let there be x ${L.en} and y ${S.en}: legs = 4x + 2y, heads = x + y.`, `ধরো ${L.bn} x টি, ${S.bn} y টি: পা = 4x + 2y, মাথা = x + y।`),
      T(`4x + 2y = 2(x + y) + ${E} ⇒ 2x = ${E} ⇒ x = ${big}.`, `4x + 2y = 2(x + y) + ${E} ⇒ 2x = ${E} ⇒ x = ${big}।`),
    ], T('Twice the heads covers 2 legs per animal; the excess is the extra 2 legs of each four-legged one.', 'মাথার দ্বিগুণ প্রতিটির 2টি পা ধরে নেয়; বাকিটা চার-পেয়েদের 2টি করে বাড়তি পা।'));
  }
  if (kind === 'coins' || kind === 'notes') {
    const coins = kind === 'coins';
    const [hi, lo] = coins ? pick([[50, 25], [50, 20], [100, 50], [25, 10], [200, 100]].slice(0, 4)) : pick([[200, 100], [500, 100], [100, 50], [500, 200], [2000, 500]]);
    const nh = ri(5, 60); const nl = ri(5, 60);
    const N = nh + nl; const V = nh * hi + nl * lo; // paise or rupees
    const vtxt = coins ? (V % 100 === 0 ? `Rs. ${V / 100}` : `Rs. ${(V / 100).toFixed(2)}`) : `₹ ${V}`;
    if (coins && V % 5) return null;
    const unit = (v) => (coins ? (v === 100 ? T('1 rupee', '1 টাকার') : T(`${v} paise`, `${v} পয়সার`)) : T(`${v} rupee`, `${v} টাকার`));
    const stem = coins
      ? T(`In a bag there are ${unit(hi).en} and ${unit(lo).en} coins. The total number of coins is ${N} and the total value is ${vtxt}. The number of ${unit(hi).en} coins is`, `একটি থলিতে ${unit(hi).bn} ও ${unit(lo).bn} মুদ্রা আছে। মোট মুদ্রা ${N}টি এবং মোট মূল্য ${vtxt.replace('Rs.', '₹')}। ${unit(hi).bn} মুদ্রা কয়টি?`)
      : T(`A man encashes a cheque of ₹ ${V} from a bank. The bank pays him in ${hi} rupee notes and ${lo} rupee notes, ${N} notes in all. The number of ${hi} rupee notes is`, `একজন ব্যক্তি ব্যাংক থেকে ₹ ${V}-এর একটি চেক ভাঙান। ব্যাংক তাঁকে ${hi} টাকার ও ${lo} টাকার নোটে, মোট ${N}টি নোট দেয়। ${hi} টাকার নোট কয়টি?`);
    const options = opts(nh, posInt, [
      [nl, `That is the number of ${coins ? unit(lo).en + ' coins' : lo + ' rupee notes'}.`, `এটা ${coins ? unit(lo).bn + ' মুদ্রার' : lo + ' টাকার নোটের'} সংখ্যা।`],
      [Number.isInteger((V - N * lo) / hi) ? (V - N * lo) / hi : null, `Divide the extra value by the DIFFERENCE ${hi} ${MINUS} ${lo}, not by ${hi}.`, `বাড়তি মূল্যকে পার্থক্য ${hi} ${MINUS} ${lo} দিয়ে ভাগ করো, ${hi} দিয়ে নয়।`],
    ], [nh + 1, nh - 1, nh + 2, nh + 5, nh - 4]);
    const u = coins ? 'paise' : 'rupees';
    const ub = coins ? 'পয়সা' : 'টাকা';
    return finish('two_kinds_total', kind, 3, 75, stem, options, [
      T(`Total value = ${V} ${u}. If all ${N} were ${lo}s: ${N} × ${lo} = ${N * lo} ${u}.`, `মোট মূল্য = ${V} ${ub}। সবগুলো ${lo}-এর হলে: ${N} × ${lo} = ${N * lo} ${ub}।`),
      T(`Extra = ${V} ${MINUS} ${N * lo} = ${V - N * lo}; each ${hi} adds ${hi - lo}, so number of ${hi}s = ${V - N * lo} ÷ ${hi - lo} = ${nh}.`, `বাড়তি = ${V} ${MINUS} ${N * lo} = ${V - N * lo}; প্রতিটি ${hi}-এ ${hi - lo} বেশি, তাই ${hi}-এর সংখ্যা = ${V - N * lo} ÷ ${hi - lo} = ${nh}।`),
    ], T('Assume all are the smaller kind; the shortfall ÷ the difference in value = the number of the bigger kind.', 'ধরো সবই ছোট মানের; ঘাটতি ÷ মানের পার্থক্য = বড় মানেরগুলোর সংখ্যা।'));
  }
  if (kind === 'marks') {
    const N = ri(4, 20) * 5; const a = pick([1, 2, 3, 4]); const b = pick([1, 1, 2]);
    if (b >= a && a !== 1) return null;
    if (a === 1 && b !== 1) return null;
    const c = ri(Math.ceil(N / 2), N - 2); const w = N - c;
    const S = a * c - b * w;
    if (S <= 0) return null;
    const P = pick([...NAMES_M, ...NAMES_F]);
    const stem = T(`There are ${N} questions in a test. Each correct answer gets ${a} mark${a > 1 ? 's' : ''} and ${b} mark${b > 1 ? 's are' : ' is'} deducted for each wrong answer. ${P.en} attempted all the questions and scored ${S}. How many questions did ${P.en} answer correctly?`,
      `একটি পরীক্ষায় ${N}টি প্রশ্ন। প্রতিটি ঠিক উত্তরে ${a} নম্বর এবং প্রতিটি ভুল উত্তরে ${b} নম্বর কাটা যায়। ${P.bn} সব প্রশ্নের উত্তর দিয়ে ${S} নম্বর পেয়েছে। ${P.bn} কয়টি প্রশ্নের ঠিক উত্তর দিয়েছে?`);
    const options = opts(c, posInt, [
      [w, 'That is the number of WRONG answers.', 'এটা ভুল উত্তরের সংখ্যা।'],
      [Number.isInteger(N - (a * N - S) / b) ? N - (a * N - S) / b : null, `Each wrong answer costs ${a} + ${b} = ${a + b} (marks missed plus the deduction), not just ${b}.`, `প্রতিটি ভুলে ${a} + ${b} = ${a + b} নম্বর যায় (না পাওয়া নম্বর আর কাটা নম্বর), শুধু ${b} নয়।`],
    ], [c + 1, c - 1, c + 2, c - 3, c + 5].filter((v) => v <= N));
    return finish('two_kinds_total', kind, 3, 75, stem, options, [
      T(`All correct would give ${N} × ${a} = ${a * N}; shortfall = ${a * N} ${MINUS} ${S} = ${a * N - S}.`, `সব ঠিক হলে ${N} × ${a} = ${a * N}; ঘাটতি = ${a * N} ${MINUS} ${S} = ${a * N - S}।`),
      T(`Each wrong answer costs ${a} + ${b} = ${a + b}, so wrong = ${a * N - S} ÷ ${a + b} = ${w}; correct = ${N} ${MINUS} ${w} = ${c}.`, `প্রতিটি ভুলে যায় ${a} + ${b} = ${a + b}, তাই ভুল = ${a * N - S} ÷ ${a + b} = ${w}; ঠিক = ${N} ${MINUS} ${w} = ${c}।`),
    ], T('Correct = (score + penalty × total) ÷ (marks + penalty).', 'ঠিক = (প্রাপ্ত নম্বর + কাটা নম্বর × মোট প্রশ্ন) ÷ (প্রতি ঠিকের নম্বর + কাটা নম্বর)।'));
  }
  // sweets / oranges among boys and girls
  const item = pick([T('oranges', 'কমলালেবু'), T('sweets', 'মিষ্টি'), T('pencils', 'পেনসিল'), T('bananas', 'কলা')]);
  const pb = ri(2, 6); let pg = ri(2, 7);
  if (pg === pb) pg += 1;
  const boys = ri(5, 40); const girls = ri(5, 40);
  const N = boys + girls; const tot = boys * pb + girls * pg;
  const stem = T(`${tot} ${item.en} are distributed among ${N} boys and girls such that each boy gets ${pb} ${item.en} and each girl gets ${pg} ${item.en}. The number of boys is`, `${tot}টি ${item.bn} ${N} জন ছেলেমেয়ের মধ্যে এমনভাবে ভাগ করা হল যে প্রত্যেক ছেলে ${pb}টি এবং প্রত্যেক মেয়ে ${pg}টি করে পায়। ছেলের সংখ্যা কত?`);
  const options = opts(boys, posInt, [
    [girls, 'That is the number of girls.', 'এটা মেয়েদের সংখ্যা।'],
    [Number.isInteger(Math.abs(tot - N * pg) / pb) ? Math.abs(tot - N * pg) / pb : null, `Divide by the difference ${Math.abs(pg - pb)}, not by ${pb}.`, `পার্থক্য ${Math.abs(pg - pb)} দিয়ে ভাগ করো, ${pb} দিয়ে নয়।`],
  ], [boys + 1, boys - 1, boys + 5, boys - 5, boys + 2]);
  return finish('two_kinds_total', kind, 2, 60, stem, options, [
    T(`If all ${N} were girls: ${N} × ${pg} = ${N * pg} ${item.en}.`, `সবাই মেয়ে হলে: ${N} × ${pg} = ${N * pg}টি।`),
    T(`Difference = ${Math.abs(N * pg - tot)}; each boy changes the total by ${Math.abs(pg - pb)}, so boys = ${Math.abs(N * pg - tot)} ÷ ${Math.abs(pg - pb)} = ${boys}.`, `পার্থক্য = ${Math.abs(N * pg - tot)}; প্রতিটি ছেলে মোটকে ${Math.abs(pg - pb)} বদলায়, তাই ছেলে = ${Math.abs(N * pg - tot)} ÷ ${Math.abs(pg - pb)} = ${boys}।`),
  ], T('Assume everyone is a girl; the gap ÷ the per-person difference = boys.', 'ধরো সবাই মেয়ে; পার্থক্য ÷ মাথাপিছু পার্থক্য = ছেলের সংখ্যা।'));
}

// ── 3. two_numbers_sum_diff_product ────────────────────────────
const TN_KINDS = ['sum_diff_decimal', 'sum_diff_mixed', 'product_quotient'];
function dec2(h) { // hundredths -> exact text
  const s = (h / 100).toFixed(2).replace(/\.?0+$/, '');
  return s;
}
function twoNumbers(kind = pick(TN_KINDS)) {
  if (kind === 'sum_diff_decimal') {
    const X = ri(9, 60); const Y = ri(2, X - 1); // quarters
    if ((X * Y) % 4 !== 0 || (X - Y) % 4 === 0 && (X + Y) % 4 === 0) return null;
    const S = (X + Y) * 25; const D = (X - Y) * 25; // hundredths
    const P = (X * Y * 100) / 16; // hundredths
    const stem = T(`The sum and difference of two numbers are ${dec2(S)} and ${dec2(D)} respectively. Then their product is`, `দুটি সংখ্যার যোগফল ও অন্তর যথাক্রমে ${dec2(S)} ও ${dec2(D)}। তাদের গুণফল কত?`);
    const options = opts(P, (v) => (Number.isInteger(v) && v > 0 ? dec2(v) : null), [
      [Number.isInteger((S * D) / 100) ? (S * D) / 100 : null, 'Sum × difference is a² − b², not the product ab.', 'যোগফল × অন্তর = a² − b², গুণফল ab নয়।'],
      [Number.isInteger(((S * S - D * D) / 100) / 2) ? ((S * S - D * D) / 100) / 2 : null, '(S² − D²) must be divided by 4, not by 2.', '(S² − D²)-কে 4 দিয়ে ভাগ করতে হবে, 2 দিয়ে নয়।'],
    ], [P + 100, P - 100, P + 50, P + 25, P - 50]);
    return finish('two_numbers_sum_diff_product', kind, 2, 60, stem, options, [
      T(`Larger = (${dec2(S)} + ${dec2(D)}) ÷ 2 = ${dec2(X * 25)}; smaller = (${dec2(S)} ${MINUS} ${dec2(D)}) ÷ 2 = ${dec2(Y * 25)}.`, `বড়টি = (${dec2(S)} + ${dec2(D)}) ÷ 2 = ${dec2(X * 25)}; ছোটটি = (${dec2(S)} ${MINUS} ${dec2(D)}) ÷ 2 = ${dec2(Y * 25)}।`),
      T(`Product = ${dec2(X * 25)} × ${dec2(Y * 25)} = ${dec2(P)}.`, `গুণফল = ${dec2(X * 25)} × ${dec2(Y * 25)} = ${dec2(P)}।`),
    ], T('Product = (sum² − difference²) ÷ 4.', 'গুণফল = (যোগফল² − অন্তর²) ÷ 4।'));
  }
  if (kind === 'sum_diff_mixed') {
    const X = ri(10, 60); const Y = ri(4, X - 1); // thirds
    if ((X + Y) % 3 === 0 || (X - Y) % 3 === 0 || (X * Y) % 9 === 0) return null;
    const stem = T(`The sum of two numbers is ${mixed(X + Y, 3)} and their difference is ${mixed(X - Y, 3)}. Their product is`, `দুটি সংখ্যার যোগফল ${mixed(X + Y, 3)} এবং অন্তর ${mixed(X - Y, 3)}। তাদের গুণফল কত?`);
    const P = [X * Y, 9]; // as ninths
    const m9 = (n) => (n > 0 ? mixed(n, 9) : null);
    const options = opts(X * Y, m9, [
      [(X + Y) * (X - Y), 'Sum × difference is a² − b², not ab.', 'যোগফল × অন্তর = a² − b², ab নয়।'],
      [X * Y * 4, 'The numbers are (sum ± difference) ÷ 2 — the halving was skipped.', 'সংখ্যা দুটি (যোগফল ± অন্তর) ÷ 2 — অর্ধেক করা বাদ গেছে।'],
    ], [X * Y + 9, X * Y - 9, X * Y + 3, X * Y + 18, X * Y - 6]);
    return finish('two_numbers_sum_diff_product', kind, 3, 75, stem, options, [
      T(`Larger = (${mixed(X + Y, 3)} + ${mixed(X - Y, 3)}) ÷ 2 = ${mixed(2 * X, 3)} ÷ 2 = ${mixed(X, 3)}; smaller = ${mixed(2 * Y, 3)} ÷ 2 = ${mixed(Y, 3)}.`, `বড়টি = (${mixed(X + Y, 3)} + ${mixed(X - Y, 3)}) ÷ 2 = ${mixed(2 * X, 3)} ÷ 2 = ${mixed(X, 3)}; ছোটটি = ${mixed(2 * Y, 3)} ÷ 2 = ${mixed(Y, 3)}।`),
      T(`Product = ${X}/3 × ${Y}/3 = ${P[0]}/9 = ${mixed(P[0], 9)}.`, `গুণফল = ${X}/3 × ${Y}/3 = ${P[0]}/9 = ${mixed(P[0], 9)}।`),
    ], T('Work in thirds: the numbers are (sum ± difference) ÷ 2, then multiply.', 'তৃতীয়াংশে হিসাব করো: সংখ্যা দুটি (যোগফল ± অন্তর) ÷ 2, তারপর গুণ।'));
  }
  // product & quotient
  let a = ri(1, 9); let b = ri(2, 9);
  if (a === b || gcd(a, b) !== 1) return null;
  if (a > b) [a, b] = [b, a];
  const k = ri(2, 25);
  const P = a * b * k * k;
  const askSum = rand() < 0.7;
  const ans = askSum ? (a + b) * k : (b - a) * k;
  const stem = T(`The product of two numbers is ${P} and their quotient is ${a}/${b}. The ${askSum ? 'sum' : 'difference'} of the numbers is`, `দুটি সংখ্যার গুণফল ${P} এবং ভাগফল ${a}/${b}। সংখ্যা দুটির ${askSum ? 'যোগফল' : 'অন্তর'} কত?`);
  const options = opts(ans, posInt, [
    [k, `${k} is only k; the numbers are ${a}k and ${b}k.`, `${k} শুধু k-এর মান; সংখ্যা দুটি ${a}k ও ${b}k।`],
    [askSum ? (b - a) * k : (a + b) * k, `That is the ${askSum ? 'difference' : 'sum'} of the numbers.`, `এটা সংখ্যা দুটির ${askSum ? 'অন্তর' : 'যোগফল'}।`],
  ], [ans + 1, ans - 1, ans + a + b, ans + 10, ans - 3]);
  return finish('two_numbers_sum_diff_product', kind, 3, 75, stem, options, [
    T(`Let the numbers be ${a}k and ${b}k: ${a * b}k² = ${P}, so k² = ${k * k} and k = ${k}.`, `ধরো সংখ্যা দুটি ${a}k ও ${b}k: ${a * b}k² = ${P}, তাই k² = ${k * k}, k = ${k}।`),
    T(`Numbers: ${a * k} and ${b * k}; ${askSum ? 'sum' : 'difference'} = ${ans}.`, `সংখ্যা দুটি ${a * k} ও ${b * k}; ${askSum ? 'যোগফল' : 'অন্তর'} = ${ans}।`),
  ], T('Divide the product by a × b and take the square root to get k.', 'গুণফলকে a × b দিয়ে ভাগ করে বর্গমূল নিলেই k।'));
}

// ── 4. pairwise_totals ─────────────────────────────────────────
const PT_CTX = [
  { what: T('score', 'রান করে'), unit: T('runs', 'রান'), money: false, verbAll: T('together score', 'একসঙ্গে করে'), q: T('How many runs does', 'কত রান করে') },
  { what: T('earn', 'আয় করে'), unit: T('per day', 'দৈনিক'), money: true, verbAll: T('together earn', 'একসঙ্গে আয় করে'), q: T('What is the daily earning of', 'দৈনিক আয় কত') },
  { what: T('weigh', 'ওজন'), unit: T('kg', 'কেজি'), money: false, verbAll: T('together weigh', 'একসঙ্গে ওজন'), q: T('What is the weight of', 'ওজন কত') },
  { what: T('score', 'নম্বর পায়'), unit: T('marks', 'নম্বর'), money: false, verbAll: T('together score', 'একসঙ্গে পায়'), q: T('How many marks does', 'কত নম্বর পায়') },
];
const PT_KINDS = ['with_total', 'pairs_only'];
function pairwiseTotals(kind = pick(PT_KINDS)) {
  const ctx = pick(PT_CTX);
  const [A, B, C] = names(3);
  const v = { A: ri(15, 150), B: ri(15, 150), C: ri(15, 150) };
  const nm = { A, B, C };
  const ask = pick(['A', 'B', 'C']);
  const amt = (x) => (ctx.money ? `₹ ${x}` : `${x} ${ctx.unit.en}`);
  const amtBn = (x) => (ctx.money ? `₹ ${x}` : `${x} ${ctx.unit.bn}`);
  const fmt = (x) => (Number.isInteger(x) && x > 0 ? T(amt(x), amtBn(x)) : null);
  const ending = (who) => (ctx.q.en.startsWith('How many') ? T(`${ctx.q.en} ${nm[who].en} ${ctx.what.en}?`, `${nm[who].bn} ${ctx.q.bn}?`) : T(`${ctx.q.en} ${nm[who].en}?`, `${nm[who].bn}-এর ${ctx.q.bn}?`));
  const pair = (x, y) => T(`${nm[x].en} and ${nm[y].en} together ${ctx.what.en} ${amt(v[x] + v[y])}`, `${nm[x].bn} ও ${nm[y].bn} ${ctx.verbAll.bn} ${amtBn(v[x] + v[y])}`);
  const all = ['A', 'B', 'C'];
  const others = all.filter((x) => x !== ask);
  if (kind === 'with_total') {
    const T3 = v.A + v.B + v.C;
    // give the two pairs containing `ask`
    const p1 = pair(ask, others[0]); const p2 = pair(ask, others[1]);
    const stem = T(`${A.en}, ${B.en} and ${C.en} ${ctx.verbAll.en} ${amt(T3)}${ctx.money ? ' per day' : ''}. ${p1.en}${ctx.money ? ' per day' : ''}, while ${p2.en}${ctx.money ? ' per day' : ''}. ${ending(ask).en}`,
      `${A.bn}, ${B.bn} ও ${C.bn} ${ctx.verbAll.bn} ${amtBn(T3)}${ctx.money ? ' (দৈনিক)' : ''}। ${p1.bn}, আর ${p2.bn}। ${ending(ask).bn}`);
    const s = v[ask] + v[others[0]] + v[ask] + v[others[1]];
    const options = opts(v[ask], fmt, [
      [(s - T3) % 2 === 0 ? (s - T3) / 2 : null, `${nm[ask].en} is counted twice in the two pair totals; subtracting the grand total already leaves exactly one ${nm[ask].en} — do not halve.`, `দুই জোড়ার মোটে ${nm[ask].bn} দুবার আছে; সবার মোট বিয়োগ করলেই ঠিক একবার ${nm[ask].bn} থাকে — অর্ধেক কোরো না।`],
      [T3 - (v[ask] + v[others[0]]), `That is ${nm[others[1]].en}'s value.`, `এটা ${nm[others[1]].bn}-এর মান।`],
    ], [v[ask] + 10, v[ask] - 10, v[ask] + 5, v[ask] + 12]);
    return finish('pairwise_totals', kind, 2, 60, stem, options, [
      T(`(${nm[ask].en} + ${nm[others[0]].en}) + (${nm[ask].en} + ${nm[others[1]].en}) = ${v[ask] + v[others[0]]} + ${v[ask] + v[others[1]]} = ${s}; this counts ${nm[ask].en} twice.`, `(${nm[ask].bn} + ${nm[others[0]].bn}) + (${nm[ask].bn} + ${nm[others[1]].bn}) = ${v[ask] + v[others[0]]} + ${v[ask] + v[others[1]]} = ${s}; এতে ${nm[ask].bn} দুবার।`),
      T(`${nm[ask].en} = ${s} ${MINUS} ${T3} = ${v[ask]}.`, `${nm[ask].bn} = ${s} ${MINUS} ${T3} = ${v[ask]}।`),
    ], T('Two pair totals that share one person, minus the grand total, leave that person.', 'একজন সাধারণ এমন দুই জোড়ার মোট থেকে সবার মোট বিয়োগ করলে সেই জনই থাকে।'));
  }
  const s3 = 2 * (v.A + v.B + v.C);
  const pairs = shuffle([['A', 'B'], ['B', 'C'], ['A', 'C']]);
  const txt = pairs.map(([x, y]) => pair(x, y));
  const stem = T(`${txt[0].en}, ${txt[1].en}, and ${txt[2].en}. ${ending(ask).en}`, `${txt[0].bn}, ${txt[1].bn}, এবং ${txt[2].bn}। ${ending(ask).bn}`);
  const half = s3 / 2;
  const without = v[others[0]] + v[others[1]];
  const options = opts(v[ask], fmt, [
    [s3 - without, 'The three pair totals count everyone twice — halve the sum before subtracting.', 'তিন জোড়ার মোটে প্রত্যেকে দুবার — বিয়োগের আগে যোগফল অর্ধেক করো।'],
    [half, `${half} is the total of all three, not ${nm[ask].en}'s share.`, `${half} হল তিনজনের মোট, ${nm[ask].bn}-এর ভাগ নয়।`],
    [v[others[0]], `That is ${nm[others[0]].en}'s value.`, `এটা ${nm[others[0]].bn}-এর মান।`],
  ], [v[ask] + 10, v[ask] - 10, v[ask] + 6]);
  return finish('pairwise_totals', kind, 3, 75, stem, options, [
    T(`Add the three pair totals: 2(${A.en} + ${B.en} + ${C.en}) = ${s3}, so all three = ${half}.`, `তিন জোড়ার মোট যোগ করো: 2(${A.bn} + ${B.bn} + ${C.bn}) = ${s3}, তাই তিনজনের মোট = ${half}।`),
    T(`${nm[ask].en} = ${half} ${MINUS} (${nm[others[0]].en} + ${nm[others[1]].en}) = ${half} ${MINUS} ${without} = ${v[ask]}.`, `${nm[ask].bn} = ${half} ${MINUS} (${nm[others[0]].bn} + ${nm[others[1]].bn}) = ${half} ${MINUS} ${without} = ${v[ask]}।`),
  ], T('Half the sum of the pair totals is the grand total; subtract the pair without the person.', 'জোড়ার মোটগুলোর যোগফলের অর্ধেক = সবার মোট; যাকে চাই তাকে বাদ দেওয়া জোড়াটা বিয়োগ করো।'));
}

/** A few internal retries so a rarely-valid framing does not count as a miss upstream. */
function retry(fn, kind, n = 40) {
  for (let i = 0; i < n; i++) { const q = fn(kind); if (q) return q; }
  return null;
}

const GENERATORS = {
  linear_equation_word: [linearEquationWord, LE_KINDS],
  two_kinds_total: [twoKindsTotal, TK_KINDS],
  two_numbers_sum_diff_product: [twoNumbers, TN_KINDS],
  pairwise_totals: [pairwiseTotals, PT_KINDS],
};

module.exports = {
  subject: 'quant',
  topics: [{ topic: TOPIC, weight: 1, gens: Object.values(GENERATORS).flatMap(([fn, kinds]) => kinds.map((k) => () => retry(fn, k))) }],
  GENERATORS,
  linearEquationWord,
  twoKindsTotal,
  twoNumbers,
  pairwiseTotals,
};
