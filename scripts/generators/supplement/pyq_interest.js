'use strict';

/**
 * Simple & Compound Interest: standard-level practice (difficulty 2-3) for the PYQ
 * types that had no exam-level practice (map: db/patterns/pyq_map/quant/interest.json):
 * simple interest with months / fractional rates / ratios of interest, the rate or time
 * from a compound amount, and a sum becoming k times itself at compound interest.
 *
 * All numbers are exact: principals are chosen so every amount is a whole number of
 * rupees, and rates are whole or have denominator 2 or 4 (12 1/2%, 6 1/4%).
 */

const { ri, pick, shuffle, gcd, T, build } = require('../common');

const TOPIC = 'interest';

function red(n, d) {
  const g = gcd(Math.abs(n), Math.abs(d)) || 1;
  return [n / g, d / g];
}
/** n/d >= 0 as "12", "1/2" or "12 1/2". */
function mixed(n, d = 1) {
  [n, d] = red(n, d);
  if (d === 1) return String(n);
  const w = Math.floor(n / d);
  return w ? `${w} ${n % d}/${d}` : `${n % d}/${d}`;
}
const same = (s) => T(s, s);
const num = (v) => v.toLocaleString('en-IN');
const inr = (v) => `₹${num(v)}`;
const ratioT = (a, b) => { const g = gcd(a, b); return same(`${a / g} : ${b / g}`); };
const yearsT = (v) => T(`${mixed(v[0], v[1])} year${v[0] === v[1] ? '' : 's'}`, `${mixed(v[0], v[1])} বছর`);

/** correct + traps ([option, noteEn, noteBn]) + fillers -> { correct, wrong } or null. */
function opts(correct, traps, fillers = []) {
  const seen = new Set([correct.en]);
  const wrong = [];
  const add = (o, trap) => {
    if (!o || wrong.length >= 3 || seen.has(o.en)) return;
    seen.add(o.en);
    wrong.push(trap ? { en: o.en, bn: o.bn, trap } : { en: o.en, bn: o.bn });
  };
  for (const [o, en, bn] of traps) add(o, T(en, bn));
  if (!wrong.length) return null; // at least one distractor must be a real, explained mistake
  for (const o of shuffle(fillers)) add(o);
  return wrong.length === 3 ? { correct, wrong } : null;
}
const intFill = (v, step, f) => [1, 2, 3, -1, -2, -3].map((k) => v + k * step).filter((x) => x > 0).map(f);

function make(pattern, { tags = [], difficulty, time, stem, o, steps, shortcut }) {
  if (!o) return null;
  return build({ topic: TOPIC, subtopic: pattern, pattern, tags: [pattern, ...tags], difficulty, time, stem, correct: o.correct, wrong: o.wrong, steps, shortcut });
}

/* ── find_simple_interest: SI = P × R × T / 100, exam forms ──────────────── */

// Rates as [numerator, denominator]: 12 1/2% = [25, 2].
const RATES = [[4, 1], [5, 1], [6, 1], [8, 1], [10, 1], [12, 1], [15, 1], [15, 2], [25, 2], [25, 4], [5, 2], [35, 4]];
const MONTHS = [6, 8, 9, 15, 18, 20, 30, 42];

function findSimpleInterest(kind = pick(['years', 'months', 'ratioSame', 'ratioMixed'])) {
  const P = 'find_simple_interest';
  const shortcut = T('SI = P × R × T ÷ 100, with T in years: months ÷ 12. Cancel before multiplying.', 'সরল সুদ = P × R × T ÷ 100, T বছরে: মাস ÷ 12। গুণ করার আগে কাটাকাটি করো।');
  if (kind === 'years' || kind === 'months') {
    const [rn, rd] = pick(RATES);
    const P0 = ri(4, 400) * 50;
    const tn = kind === 'months' ? pick(MONTHS) : ri(2, 8);
    const td = kind === 'months' ? 12 : 1;
    const siNum = P0 * rn * tn;
    const siDen = 100 * rd * td;
    if (siNum % siDen) return null;
    const SI = siNum / siDen;
    const askAmount = pick([false, false, true]);
    const ans = askAmount ? P0 + SI : SI;
    const rate = mixed(rn, rd);
    const timeEn = kind === 'months' ? `${tn} months` : `${tn} years`;
    const timeBn = kind === 'months' ? `${tn} মাসের` : `${tn} বছরের`;
    const traps = [
      [same(inr(askAmount ? SI : P0 + SI)), askAmount ? 'That is only the interest; the amount is principal + interest.' : 'That is the amount (principal + interest), not the interest.', askAmount ? 'এটি শুধু সুদ; সমূল-সুদ = আসল + সুদ।' : 'এটি সমূল-সুদ (আসল + সুদ), শুধু সুদ নয়।'],
    ];
    if (kind === 'months' && (P0 * rn * tn) % (100 * rd) === 0) {
      const asYears = (P0 * rn * tn) / (100 * rd);
      traps.push([same(inr(askAmount ? P0 + asYears : asYears)), 'The months were used as years; divide by 12 first.', 'মাসকে বছর ধরা হয়েছে; আগে 12 দিয়ে ভাগ করো।']);
    } else if (kind === 'years' && (P0 * rn) % (100 * rd) === 0) {
      const oneYear = (P0 * rn) / (100 * rd);
      traps.push([same(inr(askAmount ? P0 + oneYear : oneYear)), `That is the interest for one year only; multiply by ${tn}.`, `এটি শুধু এক বছরের সুদ; ${tn} দিয়ে গুণ করো।`]);
    }
    return make(P, {
      tags: [kind === 'months' ? 'time_in_months' : 'basic', rd > 1 ? 'fractional_rate' : 'whole_rate'], difficulty: 2, time: 45,
      stem: askAmount
        ? T(`Find the amount on ${inr(P0)} for ${timeEn} at ${rate}% per annum simple interest.`, `বার্ষিক ${rate}% সরল সুদের হারে ${inr(P0)}-এর ${timeBn} সমূল-সুদ কত?`)
        : T(`What is the simple interest on ${inr(P0)} for ${timeEn} at ${rate}% per annum?`, `বার্ষিক ${rate}% হারে ${inr(P0)}-এর ${timeBn} সরল সুদ কত?`),
      o: opts(same(inr(ans)), traps, intFill(ans, Math.max(10, Math.round(SI / 100) * 10), (v) => same(inr(v)))),
      steps: [
        kind === 'months'
          ? T(`T = ${tn} months = ${mixed(tn, 12)} year${tn > 12 ? 's' : ''}; R = ${rate}%.`, `T = ${tn} মাস = ${mixed(tn, 12)} বছর; R = ${rate}%।`)
          : T(`P = ${inr(P0)}, R = ${rate}%, T = ${tn} years.`, `P = ${inr(P0)}, R = ${rate}%, T = ${tn} বছর।`),
        T(`SI = ${num(P0)} × ${rate} × ${mixed(tn, td)} ÷ 100 = ${inr(SI)}.`, `সরল সুদ = ${num(P0)} × ${rate} × ${mixed(tn, td)} ÷ 100 = ${inr(SI)}।`),
        ...(askAmount ? [T(`Amount = ${num(P0)} + ${num(SI)} = ${inr(ans)}.`, `সমূল-সুদ = ${num(P0)} + ${num(SI)} = ${inr(ans)}।`)] : []),
      ],
      shortcut,
    });
  }
  if (kind === 'ratioSame') {
    const t1 = ri(2, 12);
    const t2 = ri(2, 12);
    if (t1 === t2) return null;
    const r = ratioT(t1, t2);
    return make(P, {
      tags: ['ratio'], difficulty: 2, time: 45,
      stem: T(`What is the ratio of the simple interest earned by a certain sum at the same rate of interest for ${t1} years to that for ${t2} years?`,
        `একই সুদের হারে একটি নির্দিষ্ট টাকার ${t1} বছরের সরল সুদ ও ${t2} বছরের সরল সুদের অনুপাত কত?`),
      o: opts(r, [
        [ratioT(t2, t1), 'Reversed: keep the order the question asks for.', 'উল্টে গেছে: প্রশ্নের ক্রম বজায় রাখো।'],
        [ratioT(t1, t1 + t2), 'Compare the two interests with each other, not one with the total.', 'দুটি সুদকে পরস্পরের সঙ্গে তুলনা করো, একটিকে মোটের সঙ্গে নয়।'],
      ], [ratioT(t1 * t1, t2 * t2), ratioT(t1 + 1, t2 + 1), ratioT(t1 + t2, t2)]),
      steps: [
        T('With the same principal and rate, SI = P × R × T ÷ 100 is proportional to T.', 'আসল ও হার একই থাকলে সরল সুদ = P × R × T ÷ 100, তাই সুদ T-এর সমানুপাতী।'),
        T(`Ratio = ${t1} : ${t2} = ${r.en}.`, `অনুপাত = ${t1} : ${t2} = ${r.bn}।`),
      ],
      shortcut: T('Same P and R: the interests are in the ratio of the times.', 'P ও R একই হলে সুদের অনুপাত = সময়ের অনুপাত।'),
    });
  }
  const P1 = ri(2, 20) * 500;
  const P2 = ri(2, 20) * 500;
  const r1 = ri(2, 12);
  const r2 = ri(2, 12);
  const t1 = ri(2, 6);
  const t2 = ri(2, 6);
  if (P1 === P2 || r1 * t1 === r2 * t2) return null;
  const a = P1 * r1 * t1;
  const b = P2 * r2 * t2;
  if (Math.max(a, b) / gcd(a, b) > 40) return null; // exam keys reduce to small ratios
  const r = ratioT(a, b);
  return make(P, {
    tags: ['ratio', 'two_loans'], difficulty: 3, time: 60,
    stem: T(`What is the ratio of the simple interest on ${inr(P1)} for ${t1} years at ${r1}% per annum to the simple interest on ${inr(P2)} for ${t2} years at ${r2}% per annum?`,
      `বার্ষিক ${r1}% হারে ${inr(P1)}-এর ${t1} বছরের সরল সুদ এবং বার্ষিক ${r2}% হারে ${inr(P2)}-এর ${t2} বছরের সরল সুদের অনুপাত কত?`),
    o: opts(r, [
      [ratioT(b, a), 'Reversed: keep the order the question asks for.', 'উল্টে গেছে: প্রশ্নের ক্রম বজায় রাখো।'],
      [ratioT(P1, P2), 'The interest also depends on the rate and the time, not only on the principal.', 'সুদ শুধু আসলের উপর নয়, হার ও সময়ের উপরও নির্ভর করে।'],
      [ratioT(r1 * t1, r2 * t2), 'The principals are different; include them.', 'আসল দুটি আলাদা; সেগুলিও ধরতে হবে।'],
    ], [ratioT(a + b, b), ratioT(a, a + b)]),
    steps: [
      T(`SI₁ ∝ ${num(P1)} × ${r1} × ${t1} = ${num(a)}; SI₂ ∝ ${num(P2)} × ${r2} × ${t2} = ${num(b)} (the ÷ 100 cancels).`, `সুদ₁ ∝ ${num(P1)} × ${r1} × ${t1} = ${num(a)}; সুদ₂ ∝ ${num(P2)} × ${r2} × ${t2} = ${num(b)} (÷ 100 কেটে যায়)।`),
      T(`Ratio = ${num(a)} : ${num(b)} = ${r.en}.`, `অনুপাত = ${num(a)} : ${num(b)} = ${r.bn}।`),
    ],
    shortcut: T('Ratio of SI = ratio of P × R × T; cancel common factors before multiplying.', 'সরল সুদের অনুপাত = P × R × T-এর অনুপাত; গুণ করার আগে সাধারণ উৎপাদক কাটো।'),
  });
}

/* ── ci_rate_from_amount: rate (or time) from a compound amount ───────────── */

function ciPrincipal(r, n) {
  const big = (100 + r) ** n;
  const base = 100 ** n;
  const step = base / gcd(big, base); // smallest principal giving a whole amount
  const k = ri(1, Math.max(1, Math.floor(200000 / step)));
  const P0 = step * k;
  if (P0 < 500 || P0 > 200000) return null;
  return { P0, A: (P0 * big) / base };
}

function ciRateFromAmount(kind = pick(['rate', 'rate', 'time'])) {
  const P = 'ci_rate_from_amount';
  const n = pick([2, 2, 3]);
  const r = n === 2 ? pick([4, 5, 6, 8, 10, 12, 15, 20, 25]) : pick([5, 10, 20, 25, 50]);
  const c = ciPrincipal(r, n);
  if (!c) return null;
  const { P0, A } = c;
  const factor = `${100 + r}/100`;
  const [an, ad] = red(A, P0);
  const [fn, fd] = red(100 + r, 100);
  const pow = n === 2 ? '²' : '³';
  const steps = [
    T(`Amount ÷ principal = ${num(A)}/${num(P0)} = ${an}/${ad} = (${fn}/${fd})${pow}.`, `সমূল-সুদ ÷ আসল = ${num(A)}/${num(P0)} = ${an}/${ad} = (${fn}/${fd})${pow}।`),
    T(`So 1 + R/100 = ${fn}/${fd}, i.e. R = ${r}% for ${n} years.`, `তাই 1 + R/100 = ${fn}/${fd}, অর্থাৎ R = ${r}%, সময় ${n} বছর।`),
  ];
  const shortcut = T(`Divide A by P and recognise the power: (1 + R/100)ⁿ = A/P; test the options instead of taking roots.`, `A-কে P দিয়ে ভাগ করে ঘাতটি চেনো: (1 + R/100)ⁿ = A/P; বর্গমূল না করে বিকল্পগুলি বসিয়ে যাচাই করো।`);
  if (kind === 'rate') {
    const siRate = ((A - P0) * 100) / (P0 * n);
    const total = ((A - P0) * 100) / P0;
    return make(P, {
      tags: ['find_rate', `${n}_years`], difficulty: 3, time: 75,
      stem: T(`A sum of ${inr(P0)} amounts to ${inr(A)} in ${n} years at compound interest, compounded annually. What is the rate of interest per annum?`,
        `বার্ষিক চক্রবৃদ্ধি সুদে ${inr(P0)} টাকা ${n} বছরে সমূল-সুদে ${inr(A)} হয়। বার্ষিক সুদের হার কত?`),
      o: opts(same(`${r}%`), [
        [Number.isInteger(siRate * 4) && same(`${mixed(siRate * 4, 4)}%`), 'That treats the interest as simple interest; at CI the yearly rate is smaller.', 'এটি সুদকে সরল সুদ ধরে হিসাব; চক্রবৃদ্ধিতে বার্ষিক হার কম হয়।'],
        [Number.isInteger(total * 4) && same(`${mixed(total * 4, 4)}%`), `That is the total growth over ${n} years, not the yearly rate.`, `এটি ${n} বছরের মোট বৃদ্ধি, বার্ষিক হার নয়।`],
      ], [r + 1, r - 1, r + 2, r - 2, r + 5].filter((v) => v > 0).map((v) => same(`${v}%`))),
      steps,
      shortcut,
    });
  }
  const siYears = ((A - P0) * 100) / (P0 * r);
  return make(P, {
    tags: ['find_time', `${n}_years`], difficulty: 3, time: 75,
    stem: T(`In what time will ${inr(P0)} amount to ${inr(A)} at ${r}% per annum, compounded annually?`,
      `বার্ষিক ${r}% চক্রবৃদ্ধি সুদের হারে ${inr(P0)} কত বছরে সমূল-সুদে ${inr(A)} হবে?`),
    o: opts(yearsT([n, 1]), [
      [Number.isInteger(siYears * 4) && siYears !== n && yearsT([siYears * 4, 4]), 'That divides the interest by simple yearly interest; at CI each year earns interest on interest.', 'এটি সরল সুদের মতো ভাগ করা হয়েছে; চক্রবৃদ্ধিতে প্রতি বছর সুদের উপরও সুদ হয়।'],
    ], [1, 4, 5, 6].filter((v) => v !== n).map((v) => yearsT([v, 1]))),
    steps: [
      T(`Each year the amount is multiplied by ${factor}: ${num(P0)} → ${num((P0 * (100 + r)) / 100)} → ${num((P0 * (100 + r) ** 2) / 10000)}${n === 3 ? ` → ${num(A)}` : ''}.`,
        `প্রতি বছর টাকা ${factor} গুণ হয়: ${num(P0)} → ${num((P0 * (100 + r)) / 100)} → ${num((P0 * (100 + r) ** 2) / 10000)}${n === 3 ? ` → ${num(A)}` : ''}।`),
      T(`${inr(A)} is reached after ${n} years.`, `${n} বছর পরে ${inr(A)} হয়।`),
    ],
    shortcut,
  });
}

/* ── ci_sum_becomes_times: k times at compound interest ───────────────────── */

// [growth factor per year as n/d, years, "k times" text]
const GROWTH = [
  [[2, 1], 2], [[3, 1], 2], [[4, 1], 2], [[2, 1], 3], [[3, 1], 3],
  [[11, 10], 2], [[6, 5], 2], [[5, 4], 2], [[3, 2], 2], [[11, 10], 3], [[6, 5], 3], [[3, 2], 3],
  [[5, 1], 2], [[4, 1], 3], [[7, 5], 2], [[13, 10], 2], [[9, 5], 2],
];
const timesWord = (k) => ({ 2: T('double', 'দ্বিগুণ'), 3: T('three times', '3 গুণ'), 4: T('four times', '4 গুণ') }[k] || T(`${k} times`, `${k} গুণ`));

function ciSumBecomesTimes(kind = pick(['rate', 'time'])) {
  const P = 'ci_sum_becomes_times';
  if (kind === 'rate') {
    const [[gn, gd], n] = pick(GROWTH);
    const k = (gn / gd) ** n;
    const kText = String(Number(k.toFixed(6)));
    const rate = ((gn - gd) * 100) / gd;
    const siRate = ((k - 1) * 100) / n;
    const P0 = ri(1, 50) * 1000;
    const A = (P0 * gn ** n) / gd ** n;
    const stem = pick([
      T(`A sum of money becomes ${kText} times itself in ${n} years at compound interest. What is the rate of interest per annum?`,
        `চক্রবৃদ্ধি সুদে একটি টাকা ${n} বছরে নিজের ${kText} গুণ হয়। বার্ষিক সুদের হার কত?`),
      T(`At compound interest (compounded annually), a deposit grows to ${kText} times its value in ${n} years. Find the annual rate of interest.`,
        `বার্ষিক চক্রবৃদ্ধি সুদে একটি জমা টাকা ${n} বছরে তার ${kText} গুণ হয়। বার্ষিক সুদের হার নির্ণয় করো।`),
      Number.isInteger(A) && T(`A sum of ${inr(P0)} becomes ${inr(A)} in ${n} years at compound interest. What is the rate of interest per annum?`,
        `চক্রবৃদ্ধি সুদে ${inr(P0)} টাকা ${n} বছরে ${inr(A)} হয়। বার্ষিক সুদের হার কত?`),
    ].filter(Boolean)); // the rupee framing only when the amount is a whole number
    return make(P, {
      tags: ['find_rate'], difficulty: 3, time: 60,
      stem,
      o: opts(same(`${rate}%`), [
        [Number.isInteger(siRate * 4) && same(`${mixed(Math.round(siRate * 4), 4)}%`), 'That spreads the growth evenly as simple interest; at CI the factor (1 + R/100) is multiplied each year.', 'এটি সরল সুদের মতো সমানভাবে ভাগ করা; চক্রবৃদ্ধিতে প্রতি বছর (1 + R/100) গুণ হয়।'],
        [same(`${(gn * 100) / gd}%`), `(1 + R/100) = ${mixed(gn, gd)}; subtract 1 before turning it into a rate.`, `(1 + R/100) = ${mixed(gn, gd)}; হার পেতে আগে 1 বিয়োগ করো।`],
      ], [rate + 10, rate * 2, rate + 50, Math.max(5, rate - 5)].map((v) => same(`${v}%`))),
      steps: [
        T(`(1 + R/100)${n === 2 ? '²' : '³'} = ${kText}, so 1 + R/100 = ${mixed(gn, gd)}.`, `(1 + R/100)${n === 2 ? '²' : '³'} = ${kText}, তাই 1 + R/100 = ${mixed(gn, gd)}।`),
        T(`R/100 = ${mixed(gn - gd, gd)}, so R = ${rate}%.`, `R/100 = ${mixed(gn - gd, gd)}, তাই R = ${rate}%।`),
      ],
      shortcut: T('Take the n-th root of the multiple: becomes 9 times in 2 years → 3 times a year → R = 200%.', 'গুণিতকের n-তম মূল নাও: 2 বছরে 9 গুণ → প্রতি বছর 3 গুণ → R = 200%।'),
    });
  }
  const m = pick([2, 2, 3]);
  const t = ri(2, 12);
  const j = pick([2, 3, 4].filter((x) => m ** x <= 81));
  const target = m ** j;
  const ans = t * j;
  const siWay = (t * (target - 1)) / (m - 1);
  return make(P, {
    tags: ['find_time'], difficulty: 3, time: 60,
    stem: T(`A sum of money becomes ${timesWord(m).en} itself in ${t} years at compound interest. In how many years will it become ${target} times itself at the same rate?`,
      `চক্রবৃদ্ধি সুদে একটি টাকা ${t} বছরে নিজের ${timesWord(m).bn} হয়। একই হারে কত বছরে সেটি নিজের ${target} গুণ হবে?`),
    o: opts(yearsT([ans, 1]), [
      [Number.isInteger(siWay) && yearsT([siWay, 1]), 'That is the simple-interest answer; at CI the multiples multiply, they do not add.', 'এটি সরল সুদের উত্তর; চক্রবৃদ্ধিতে গুণিতকগুলি গুণ হয়, যোগ হয় না।'],
      [yearsT([t * target / m, 1]), `${target} = ${m}^${j}, so it takes ${j} periods of ${t} years, not ${target / m}.`, `${target} = ${m}^${j}, তাই ${t} বছরের ${j}টি পর্যায় লাগে, ${target / m}টি নয়।`],
    ], [ans + t, ans - 1, ans + 2, ans - t].filter((v) => v > 0).map((v) => yearsT([v, 1]))),
    steps: [
      T(`In every ${t} years the sum is multiplied by ${m}.`, `প্রতি ${t} বছরে টাকা ${m} গুণ হয়।`),
      T(`${target} = ${Array(j).fill(m).join(' × ')}, i.e. ${j} such periods.`, `${target} = ${Array(j).fill(m).join(' × ')}, অর্থাৎ ${j}টি পর্যায়।`),
      T(`Time = ${j} × ${t} = ${ans} years.`, `সময় = ${j} × ${t} = ${ans} বছর।`),
    ],
    shortcut: T('At CI the multiple grows by powers: if it becomes m times in t years, it becomes mʲ times in j × t years.', 'চক্রবৃদ্ধিতে গুণিতক ঘাতে বাড়ে: t বছরে m গুণ হলে j × t বছরে mʲ গুণ হয়।'),
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

const GENS = { findSimpleInterest, ciRateFromAmount, ciSumBecomesTimes };

module.exports = {
  subject: 'quant',
  topics: [{ topic: TOPIC, weight: 1, gens: Object.values(GENS).map((g) => () => retry(g)) }],
  ...GENS,
  mixed,
};
