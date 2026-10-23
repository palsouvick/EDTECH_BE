'use strict';

/**
 * Quant chapters Copilot's generators/quant.js does not cover yet.
 * Same contract: each generator returns build(...) output or null (retry).
 * Merged into the quant subject by scripts/generateAndSeed.js.
 */

const { ri, pick, gcd, r2, n2, T, numOptions, build } = require('../common');

const ratio = (a, b) => {
  const g = gcd(a, b);
  return `${a / g} : ${b / g}`;
};
const ratioOpt = (a, b) => ({ en: ratio(a, b), bn: ratio(a, b) });
const unit = (en, bn) => (v) => ({ en: `${n2(v)} ${en}`, bn: `${n2(v)} ${bn}` });
const rupee = (v) => ({ en: `₹${n2(v)}`, bn: `₹${n2(v)}` });
/** Bengali possessive: গম -> গমের, চা-পাতা -> চা-পাতার. */
const poss = (bn) => (/[া-ৌ]$/.test(bn) ? `${bn}র` : `${bn}ের`);
/** "(45 − 42) : (42 − 34) = 3 : 8", adding the reduced form only when it differs. */
const ratioSteps = (a, b) => (ratio(a, b) === `${a} : ${b}` ? `${a} : ${b}` : `${a} : ${b} = ${ratio(a, b)}`);

const ITEMS = [
  ['rice', 'চাল'],
  ['sugar', 'চিনি'],
  ['tea', 'চা-পাতা'],
  ['pulses', 'ডাল'],
  ['wheat', 'গম'],
  ['coffee', 'কফি'],
];

/** Wrong ratio options: the classic reversal plus near misses. */
function ratioOptions(a, b) {
  const correct = ratioOpt(a, b);
  const pool = [
    { ...ratioOpt(b, a), trap: T('You reversed the ratio. In alligation each quantity is paired with the difference on the OPPOSITE side.', 'অনুপাত উল্টে ফেলেছেন। অ্যালিগেশনে প্রতিটি পরিমাণ বিপরীত দিকের পার্থক্যের সঙ্গে জোড়া হয়।') },
    ratioOpt(a + 1, b),
    ratioOpt(a, b + 1),
    ratioOpt(a + b, b),
  ];
  const seen = new Set([correct.en]);
  const wrong = [];
  for (const o of pool) if (!seen.has(o.en)) { seen.add(o.en); wrong.push(o); }
  return { correct, wrong: wrong.slice(0, 3) };
}

/** Alligation: in what ratio should two varieties be mixed to get a target price? */
function allPriceRatio() {
  const p1 = ri(20, 60);
  const p2 = p1 + ri(6, 40);
  const m = ri(p1 + 1, p2 - 1);
  const a = p2 - m; // cheaper share
  const b = m - p1; // dearer share
  if (a === b) return null;
  const [it, itBn] = pick(ITEMS);
  const o = ratioOptions(a, b);
  if (o.wrong.length < 3) return null;
  return build({
    topic: 'mixture_alligation', subtopic: 'alligation_ratio', tags: ['alligation'], difficulty: 2, time: 50,
    stem: T(
      `In what ratio must ${it} at ₹${p1}/kg be mixed with ${it} at ₹${p2}/kg so that the mixture is worth ₹${m}/kg?`,
      `₹${p1}/কেজি দামের ${itBn} এবং ₹${p2}/কেজি দামের ${itBn} কোন অনুপাতে মেশালে মিশ্রণের দাম ₹${m}/কেজি হবে?`,
    ),
    ...o,
    steps: [
      T(`Alligation: cheaper : dearer = (dearer − mean) : (mean − cheaper).`, `অ্যালিগেশন: সস্তা : দামি = (দামি − গড়) : (গড় − সস্তা)।`),
      T(`= (${p2} − ${m}) : (${m} − ${p1}) = ${ratioSteps(a, b)}`, `= (${p2} − ${m}) : (${m} − ${p1}) = ${ratioSteps(a, b)}`),
    ],
    shortcut: T('Write the two prices on top, the mean in the middle, and subtract diagonally.', 'উপরে দুটি দাম, মাঝে গড় দাম লিখে আড়াআড়ি বিয়োগ করো।'),
  });
}

/** Weighted mean price of a mixture. */
function allMeanPrice() {
  const x = ri(2, 12);
  const y = ri(2, 12);
  const p1 = ri(20, 70);
  const p2 = p1 + ri(5, 40);
  const mean = (x * p1 + y * p2) / (x + y);
  if (!Number.isInteger(mean * 100)) return null;
  const [it, itBn] = pick(ITEMS);
  const simple = (p1 + p2) / 2;
  const o = numOptions(mean, rupee, [
    [simple, 'You took the simple average of the two prices; the quantities are different, so weight each price by its quantity.', 'আপনি দুটি দামের সাধারণ গড় নিয়েছেন; পরিমাণ আলাদা, তাই প্রতিটি দামকে তার পরিমাণ দিয়ে গুণ করে গড় নিতে হবে।'],
  ]);
  if (r2(simple) === r2(mean)) return null;
  return build({
    topic: 'mixture_alligation', subtopic: 'mean_price', tags: ['weighted_average'], difficulty: 2, time: 45,
    stem: T(
      `${x} kg of ${it} costing ₹${p1}/kg is mixed with ${y} kg costing ₹${p2}/kg. What is the price of the mixture per kg?`,
      `₹${p1}/কেজি দামের ${x} কেজি ${poss(itBn)} সঙ্গে ₹${p2}/কেজি দামের ${y} কেজি ${itBn} মেশানো হল। মিশ্রণের প্রতি কেজির দাম কত?`,
    ),
    ...o,
    steps: [
      T(`Total cost = ${x} × ${p1} + ${y} × ${p2} = ₹${x * p1 + y * p2}`, `মোট দাম = ${x} × ${p1} + ${y} × ${p2} = ₹${x * p1 + y * p2}`),
      T(`Price per kg = ${x * p1 + y * p2} ÷ ${x + y} = ₹${n2(mean)}`, `প্রতি কেজির দাম = ${x * p1 + y * p2} ÷ ${x + y} = ₹${n2(mean)}`),
    ],
  });
}

/** Add water to change a milk : water ratio. */
function allAddWater() {
  const a = ri(3, 9);
  const b = ri(1, a - 1);
  if (gcd(a, b) !== 1) return null;
  const k = ri(2, 12);
  const milk = a * k;
  const water = b * k;
  // target milk : water = c : d with a smaller milk share
  const c = ri(1, a);
  const d = ri(b + 1, b + 6);
  if (c / d >= a / b || gcd(c, d) !== 1) return null;
  const add = (milk * d) / c - water;
  if (!Number.isInteger(add) || add <= 0 || add > 200) return null;
  const total = milk + water;
  const o = numOptions(add, unit('litres', 'লিটার'), [
    [(total * d) / c - water, 'You applied the new ratio to the whole mixture; the milk quantity is what stays fixed.', 'আপনি নতুন অনুপাত পুরো মিশ্রণে প্রয়োগ করেছেন; দুধের পরিমাণই অপরিবর্তিত থাকে।'],
  ]);
  return build({
    topic: 'mixture_alligation', subtopic: 'add_water', tags: ['ratio_change'], difficulty: 3, time: 60,
    stem: T(
      `A ${total}-litre mixture contains milk and water in the ratio ${a} : ${b}. How much water must be added to make the ratio ${c} : ${d}?`,
      `${total} লিটার মিশ্রণে দুধ ও জলের অনুপাত ${a} : ${b}। অনুপাতটি ${c} : ${d} করতে কত লিটার জল মেশাতে হবে?`,
    ),
    ...o,
    steps: [
      T(`Milk = ${total} × ${a}/${a + b} = ${milk} L, water = ${water} L. Adding water does not change the milk.`, `দুধ = ${total} × ${a}/${a + b} = ${milk} লিটার, জল = ${water} লিটার। জল মেশালে দুধের পরিমাণ বদলায় না।`),
      T(`New water = ${milk} × ${d}/${c} = ${(milk * d) / c} L, so add ${(milk * d) / c} − ${water} = ${add} L.`, `নতুন জল = ${milk} × ${d}/${c} = ${(milk * d) / c} লিটার, অতএব মেশাতে হবে ${(milk * d) / c} − ${water} = ${add} লিটার।`),
    ],
  });
}

/** Repeated replacement: V(1 − x/V)^n. */
function allReplacement() {
  const V = pick([20, 40, 50, 60, 80, 100]);
  const x = pick([2, 4, 5, 8, 10, 20].filter((v) => v < V / 2));
  const n = pick([2, 2, 3]);
  const left = V * Math.pow(1 - x / V, n);
  if (!Number.isInteger(left * 100)) return null;
  const o = numOptions(left, unit('litres', 'লিটার'), [
    [V - n * x, 'Each later draw removes a mixture, not pure milk, so you cannot subtract the same amount every time.', 'পরের প্রতিবার তোলা হয় মিশ্রণ, খাঁটি দুধ নয়; তাই প্রতিবার একই পরিমাণ বিয়োগ করা যায় না।'],
  ]);
  return build({
    topic: 'mixture_alligation', subtopic: 'replacement', tags: ['replacement'], difficulty: 4, time: 75,
    stem: T(
      `A vessel holds ${V} litres of pure milk. ${x} litres are taken out and replaced with water; this is done ${n} times in all. How much milk is left?`,
      `একটি পাত্রে ${V} লিটার খাঁটি দুধ আছে। ${x} লিটার তুলে নিয়ে সমপরিমাণ জল মেশানো হল; এভাবে মোট ${n} বার করা হল। পাত্রে কত লিটার দুধ রইল?`,
    ),
    ...o,
    steps: [
      T(`Milk left = V × (1 − x/V)ⁿ = ${V} × (1 − ${x}/${V})^${n}`, `অবশিষ্ট দুধ = V × (1 − x/V)ⁿ = ${V} × (1 − ${x}/${V})^${n}`),
      T(`= ${V} × (${V - x}/${V})^${n} = ${n2(left)} litres`, `= ${V} × (${V - x}/${V})^${n} = ${n2(left)} লিটার`),
    ],
    shortcut: T('Each round keeps the same fraction (V − x)/V of the milk.', 'প্রতিবার দুধের একই ভগ্নাংশ (V − x)/V থেকে যায়।'),
  });
}

/** Mix two solutions of different strength to reach a target strength. */
function allConcentration() {
  const p = ri(5, 40);
  const q = p + ri(10, 50);
  const r = ri(p + 1, q - 1);
  const a = q - r;
  const b = r - p;
  if (a === b) return null;
  const sub = pick([['acid', 'অ্যাসিড'], ['alcohol', 'অ্যালকোহল'], ['salt', 'লবণ']]);
  const o = ratioOptions(a, b);
  if (o.wrong.length < 3) return null;
  return build({
    topic: 'mixture_alligation', subtopic: 'concentration', tags: ['alligation', 'percentage'], difficulty: 3, time: 55,
    stem: T(
      `In what ratio should a ${p}% ${sub[0]} solution be mixed with a ${q}% ${sub[0]} solution to get a ${r}% solution?`,
      `${p}% ${sub[1]} দ্রবণ ও ${q}% ${sub[1]} দ্রবণ কোন অনুপাতে মেশালে ${r}% দ্রবণ পাওয়া যাবে?`,
    ),
    ...o,
    steps: [
      T(`Weaker : stronger = (${q} − ${r}) : (${r} − ${p}) = ${ratioSteps(a, b)}`, `দুর্বল : তীব্র = (${q} − ${r}) : (${r} − ${p}) = ${ratioSteps(a, b)}`),
    ],
  });
}

module.exports = {
  subject: 'quant',
  topics: [{ topic: 'mixture_alligation', weight: 1, gens: [allPriceRatio, allMeanPrice, allAddWater, allReplacement, allConcentration] }],
};
