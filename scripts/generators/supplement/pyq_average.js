'use strict';

/**
 * Average: standard-level practice for the WBPSC-family PYQ types that had no practice
 * bank of their own (db/patterns/pyq_map/quant/average.json):
 *
 *  - uniform_change_average   "average of ten numbers is 7; each is multiplied by 12"
 *                             (Clerkship 2023), "each number is increased by 5" (Clerkship 2023).
 *  - simple_average           "average of the first nine prime numbers" (Clerkship 2023),
 *                             "average of 6 numbers is 17, what is their sum?" (WBP Constable 2021).
 *  - missing_value            "the average of 15, 18, X, 14, 21, 26, 8 and 16 is 16" (Clerkship 2009).
 *  - mess_expenditure_change  "35 students; 7 more join; expenditure up ₹42, average down ₹1"
 *                             (WBP Constable 2021).
 *
 * Answers are exact: whole numbers, or a mixed fraction like 11 1/9 (never 11.11).
 */

const { ri, pick, shuffle, gcd, T, names, numOptions, textOptions, build } = require('../common');

const plain = (v) => T(String(v), String(v));
const rupee = (v) => T(`₹${v}`, `₹${v}`);
const unitFmt = (en, bn) => (v) => T(`${v} ${en}`, `${v} ${bn}`);

/**
 * Numeric options; hints that are not positive whole numbers are dropped. With a step
 * (e.g. ₹250 for salaries) the filler distractors move in that step instead of ±1.
 */
function opts(ans, fmt, hints, step = 0) {
  const clean = hints.filter(([v]) => Number.isInteger(v) && v > 0 && v !== ans);
  if (!step) return numOptions(ans, fmt, clean);
  const seen = new Set([ans]);
  const wrong = [];
  const add = (v, trap) => {
    if (!Number.isInteger(v) || v <= 0 || seen.has(v) || wrong.length >= 3) return;
    seen.add(v);
    wrong.push({ ...fmt(v), ...(trap && { trap }) });
  };
  for (const [v, en, bn] of clean.slice(0, 2)) add(v, T(en, bn));
  for (const k of shuffle([1, -1, 2, -2, 3, -3])) add(ans + k * step);
  return { correct: fmt(ans), wrong };
}

/** p/q as a mixed number: 100/9 -> "11 1/9", 24/1 -> "24". */
function mixed(p, q) {
  const g = gcd(p, q);
  p /= g; q /= g;
  if (q === 1) return String(p);
  const w = Math.floor(p / q);
  return w ? `${w} ${p % q}/${q}` : `${p}/${q}`;
}

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
const sum = (a) => a.reduce((x, y) => x + y, 0);
const isPrimeSmall = (x) => PRIMES.includes(x);

// ---------------------------------------------------------------- uniform_change_average

const CHANGE_KINDS = ['add', 'subtract', 'multiply', 'multiply_add', 'divide', 'reverse', 'marks', 'salary'];

function uniformChangeAverage(kind = pick(CHANGE_KINDS)) {
  const n = pick([5, 6, 8, 10, 12, 15, 20, 25]);
  const nWord = T(String(n), String(n));
  let stem; let ans; let hints; let steps; let fmt = plain;
  let difficulty = 2;
  if (kind === 'add' || kind === 'subtract') {
    const A = ri(12, 60);
    const k = ri(2, 12);
    if (kind === 'subtract' && k >= A) return null;
    ans = kind === 'add' ? A + k : A - k;
    stem = kind === 'add'
      ? T(`The average of ${n} numbers is ${A}. If each number is increased by ${k}, the new average is`, `${nWord.bn}টি সংখ্যার গড় ${A}। প্রতিটি সংখ্যা ${k} করে বাড়ালে নতুন গড় কত হবে?`)
      : T(`The average of ${n} numbers is ${A}. If ${k} is subtracted from each number, what is the new average?`, `${nWord.bn}টি সংখ্যার গড় ${A}। প্রতিটি সংখ্যা থেকে ${k} বিয়োগ করলে নতুন গড় কত হবে?`);
    hints = [
      [kind === 'add' ? A + n * k : A - n * k, `The TOTAL changes by ${n} × ${k} = ${n * k}, but the average changes by only ${k}.`, `মোট বদলায় ${n} × ${k} = ${n * k}, কিন্তু গড় বদলায় মাত্র ${k}।`],
      [A, 'The average does change when every number changes.', 'প্রতিটি সংখ্যা বদলালে গড়ও বদলায়।'],
    ];
    steps = [
      T(`Total = ${n} × ${A} = ${n * A}; every number ${kind === 'add' ? 'gains' : 'loses'} ${k}, so the total ${kind === 'add' ? 'rises' : 'falls'} by ${n} × ${k} = ${n * k}.`,
        `মোট = ${n} × ${A} = ${n * A}; প্রতিটি সংখ্যা ${k} ${kind === 'add' ? 'বাড়ে' : 'কমে'}, তাই মোট ${n} × ${k} = ${n * k} ${kind === 'add' ? 'বাড়ে' : 'কমে'}।`),
      T(`New average = ${kind === 'add' ? n * A + n * k : n * A - n * k} ÷ ${n} = ${ans}, i.e. ${A} ${kind === 'add' ? '+' : '−'} ${k}.`,
        `নতুন গড় = ${kind === 'add' ? n * A + n * k : n * A - n * k} ÷ ${n} = ${ans}, অর্থাৎ ${A} ${kind === 'add' ? '+' : '−'} ${k}।`),
    ];
  } else if (kind === 'multiply' || kind === 'divide') {
    const m = ri(2, 12);
    const A = kind === 'multiply' ? ri(4, 30) : m * ri(3, 15);
    ans = kind === 'multiply' ? A * m : A / m;
    stem = kind === 'multiply'
      ? T(`The average of ${n} numbers is ${A}. If each number is multiplied by ${m}, then the average of the new set of numbers is`, `${nWord.bn}টি সংখ্যার গড় ${A}। প্রতিটি সংখ্যাকে ${m} দিয়ে গুণ করলে নতুন সংখ্যাগুলির গড় কত হবে?`)
      : T(`The average of ${n} numbers is ${A}. If each number is divided by ${m}, what is the average of the new numbers?`, `${nWord.bn}টি সংখ্যার গড় ${A}। প্রতিটি সংখ্যাকে ${m} দিয়ে ভাগ করলে নতুন সংখ্যাগুলির গড় কত হবে?`);
    hints = kind === 'multiply'
      ? [[A + m, `The numbers were MULTIPLIED by ${m}, so the average is multiplied too — not increased by ${m}.`, `সংখ্যাগুলি ${m} দিয়ে গুণ করা হয়েছে, তাই গড়ও গুণ হবে — ${m} যোগ হবে না।`],
        [A * m - m, 'Nothing was subtracted: just multiply the old average.', 'কিছু বিয়োগ করা হয়নি: শুধু পুরোনো গড়কে গুণ করো।']]
      : [[A - m, `Dividing every number by ${m} divides the average by ${m}; it does not subtract ${m}.`, `প্রতিটি সংখ্যাকে ${m} দিয়ে ভাগ করলে গড়ও ${m} দিয়ে ভাগ হয়; ${m} বিয়োগ হয় না।`],
        [A, 'The average does change when every number changes.', 'প্রতিটি সংখ্যা বদলালে গড়ও বদলায়।']];
    steps = [
      T(`Total = ${n} × ${A} = ${n * A}; after ${kind === 'multiply' ? `multiplying by ${m} it is ${n * A * m}` : `dividing by ${m} it is ${(n * A) / m}`}.`,
        `মোট = ${n} × ${A} = ${n * A}; ${m} দিয়ে ${kind === 'multiply' ? `গুণ করলে হয় ${n * A * m}` : `ভাগ করলে হয় ${(n * A) / m}`}।`),
      T(`New average = ${kind === 'multiply' ? n * A * m : (n * A) / m} ÷ ${n} = ${ans}, i.e. ${A} ${kind === 'multiply' ? '×' : '÷'} ${m}.`,
        `নতুন গড় = ${kind === 'multiply' ? n * A * m : (n * A) / m} ÷ ${n} = ${ans}, অর্থাৎ ${A} ${kind === 'multiply' ? '×' : '÷'} ${m}।`),
    ];
  } else if (kind === 'multiply_add') {
    const m = ri(2, 6);
    const k = ri(2, 15);
    const A = ri(5, 30);
    ans = m * A + k;
    difficulty = 3;
    stem = T(`The average of ${n} numbers is ${A}. Each number is first multiplied by ${m} and then ${k} is added to it. What is the average of the new numbers?`,
      `${nWord.bn}টি সংখ্যার গড় ${A}। প্রতিটি সংখ্যাকে প্রথমে ${m} দিয়ে গুণ করে তারপর তার সঙ্গে ${k} যোগ করা হল। নতুন সংখ্যাগুলির গড় কত?`);
    hints = [
      [m * (A + k), `The order matters: multiply first, then add ${k} — ${m}(${A} + ${k}) adds ${k} before multiplying.`, `ক্রম গুরুত্বপূর্ণ: আগে গুণ, তারপর ${k} যোগ — ${m}(${A} + ${k}) করলে গুণের আগেই যোগ হয়ে যায়।`],
      [m * A + n * k, `Adding ${k} to each number raises the average by ${k}, not by ${n} × ${k}.`, `প্রতিটিতে ${k} যোগ করলে গড় বাড়ে ${k}, ${n} × ${k} নয়।`],
    ];
    steps = [
      T(`Multiplying every number by ${m}: average becomes ${A} × ${m} = ${m * A}.`, `প্রতিটি সংখ্যা ${m} দিয়ে গুণ: গড় হয় ${A} × ${m} = ${m * A}।`),
      T(`Adding ${k} to every number: average becomes ${m * A} + ${k} = ${ans}.`, `প্রতিটিতে ${k} যোগ: গড় হয় ${m * A} + ${k} = ${ans}।`),
    ];
  } else if (kind === 'reverse') {
    const m = ri(2, 5);
    const k = ri(2, 12);
    const A = ri(6, 30);
    const B = m * A - k;
    if (B <= 0) return null;
    ans = A;
    difficulty = 3;
    stem = T(`Each of ${n} numbers is multiplied by ${m} and then decreased by ${k}. The average of the resulting numbers is ${B}. What was the average of the original numbers?`,
      `${nWord.bn}টি সংখ্যার প্রতিটিকে ${m} দিয়ে গুণ করে তারপর ${k} কমানো হল। ফলে পাওয়া সংখ্যাগুলির গড় ${B}। আসল সংখ্যাগুলির গড় কত ছিল?`);
    hints = [
      [(B - k) / m, `Undo in reverse order: ADD ${k} back first (it was subtracted), then divide by ${m}.`, `উল্টো ক্রমে ফেরাও: আগে ${k} যোগ করো (কারণ বিয়োগ করা হয়েছিল), তারপর ${m} দিয়ে ভাগ।`],
      [B / m + k, `Undo the steps in reverse order: add ${k} first, then divide by ${m}.`, `ধাপগুলো উল্টো ক্রমে ফেরাও: আগে ${k} যোগ, তারপর ${m} দিয়ে ভাগ।`],
    ];
    steps = [
      T(`If the original average is A, the new average is ${m}A − ${k} = ${B}.`, `আসল গড় A হলে নতুন গড় ${m}A − ${k} = ${B}।`),
      T(`${m}A = ${B} + ${k} = ${B + k}, so A = ${B + k} ÷ ${m} = ${A}.`, `${m}A = ${B} + ${k} = ${B + k}, তাই A = ${B + k} ÷ ${m} = ${A}।`),
    ];
  } else if (kind === 'marks') {
    const A = ri(35, 70);
    const g = ri(2, 10);
    ans = A + g;
    fmt = unitFmt('marks', 'নম্বর');
    stem = T(`The average marks of ${n} students in a test is ${A}. The teacher later awards ${g} grace marks to every student. What is the new average?`,
      `একটি পরীক্ষায় ${n} জন ছাত্রছাত্রীর গড় নম্বর ${A}। পরে শিক্ষক প্রত্যেককে ${g} নম্বর গ্রেস দিলেন। এখন গড় নম্বর কত?`);
    hints = [
      [A + n * g, `${n} × ${g} = ${n * g} is the rise in the TOTAL marks; the average rises by ${g}.`, `${n} × ${g} = ${n * g} হল মোট নম্বরের বৃদ্ধি; গড় বাড়ে ${g}।`],
      [A, 'Every student gained marks, so the average must rise.', 'প্রত্যেকের নম্বর বেড়েছে, তাই গড়ও বাড়বে।'],
    ];
    steps = [
      T(`Every student gains ${g}, so the total rises by ${n} × ${g} = ${n * g}.`, `প্রত্যেকে ${g} পায়, তাই মোট বাড়ে ${n} × ${g} = ${n * g}।`),
      T(`The average rises by ${n * g} ÷ ${n} = ${g}: new average = ${A} + ${g} = ${ans}.`, `গড় বাড়ে ${n * g} ÷ ${n} = ${g}: নতুন গড় = ${A} + ${g} = ${ans}।`),
    ];
  } else {
    // salary: every salary doubled / raised by a fixed amount
    const A = ri(12, 40) * 500;
    const double = ri(0, 1) === 1;
    const k = ri(2, 10) * 250;
    ans = double ? 2 * A : A + k;
    fmt = rupee;
    stem = double
      ? T(`The average monthly salary of ${n} workers of a factory is ₹${A}. If the salary of every worker is doubled, what will be the new average salary?`,
        `একটি কারখানার ${n} জন শ্রমিকের গড় মাসিক বেতন ₹${A}। প্রত্যেক শ্রমিকের বেতন দ্বিগুণ করা হলে নতুন গড় বেতন কত হবে?`)
      : T(`The average monthly salary of ${n} workers of a factory is ₹${A}. If every worker gets a raise of ₹${k}, what will be the new average salary?`,
        `একটি কারখানার ${n} জন শ্রমিকের গড় মাসিক বেতন ₹${A}। প্রত্যেক শ্রমিকের বেতন ₹${k} বাড়লে নতুন গড় বেতন কত হবে?`);
    hints = double
      ? [[A + 2, 'Doubling every salary doubles the average.', 'প্রত্যেকের বেতন দ্বিগুণ হলে গড়ও দ্বিগুণ হয়।'], [2 * A * n, 'That is the new TOTAL salary bill, not the average.', 'এটি নতুন মোট বেতন, গড় নয়।']]
      : [[A + n * k, `₹${n * k} is the rise in the total bill; the average rises by ₹${k}.`, `₹${n * k} হল মোট বেতনের বৃদ্ধি; গড় বাড়ে ₹${k}।`], [A, 'Every salary rose, so the average must rise.', 'প্রত্যেকের বেতন বেড়েছে, তাই গড়ও বাড়বে।']];
    steps = double
      ? [T(`Total = ${n} × ${A} = ₹${n * A}; doubled, it is ₹${2 * n * A}.`, `মোট = ${n} × ${A} = ₹${n * A}; দ্বিগুণ হলে ₹${2 * n * A}।`), T(`New average = ${2 * n * A} ÷ ${n} = ₹${ans} (= 2 × ${A}).`, `নতুন গড় = ${2 * n * A} ÷ ${n} = ₹${ans} (= 2 × ${A})।`)]
      : [T(`The total rises by ${n} × ${k} = ₹${n * k}.`, `মোট বাড়ে ${n} × ${k} = ₹${n * k}।`), T(`New average = ${A} + ${n * k} ÷ ${n} = ${A} + ${k} = ₹${ans}.`, `নতুন গড় = ${A} + ${n * k} ÷ ${n} = ${A} + ${k} = ₹${ans}।`)];
  }
  const o = opts(ans, fmt, hints, fmt === rupee ? 250 : 0);
  return build({
    topic: 'average', subtopic: 'uniform_change_average', pattern: 'uniform_change_average',
    tags: ['average', 'uniform_change', kind], difficulty, time: difficulty === 2 ? 45 : 60,
    stem, ...o, steps,
    shortcut: T('Whatever is done to every number is done to the average (× m → × m, + k → + k); the count does not matter.', 'প্রতিটি সংখ্যার সঙ্গে যা করা হয়, গড়ের সঙ্গেও তাই হয় (× m → × m, + k → + k); সংখ্যা কতগুলি তাতে কিছু যায় আসে না।'),
  });
}

// ---------------------------------------------------------------- simple_average

const SIMPLE_KINDS = ['primes', 'sum_from_average', 'multiples', 'list'];

function simpleAverage(kind = pick(SIMPLE_KINDS)) {
  if (kind === 'primes') {
    // "the first n primes", or "all primes between 1 and X" (X not prime, so the list is unambiguous)
    const upTo = ri(0, 1) === 1 ? ri(10, 50) : 0;
    if (upTo && isPrimeSmall(upTo)) return null;
    const ps = upTo ? PRIMES.filter((p) => p < upTo) : PRIMES.slice(0, ri(4, 15));
    const n = ps.length;
    if (n < 4) return null;
    const S = sum(ps);
    const ans = mixed(S, n);
    const pool = [
      mixed(S - 2 + 1, n), // 1 counted as prime instead of 2
      mixed(S, n - 1),
      mixed(S + PRIMES[n], n),
      mixed(S - ps[n - 1], n),
      mixed(S + 1, n),
    ].filter((x) => x !== ans);
    const traps = {
      [mixed(S - 1, n)]: T('1 is not a prime; the first prime is 2.', '1 মৌলিক সংখ্যা নয়; প্রথম মৌলিক সংখ্যা 2।'),
      [mixed(S, n - 1)]: T(`Divide by the count of primes (${n}), not ${n - 1}.`, `মৌলিক সংখ্যার সংখ্যা (${n}) দিয়ে ভাগ করো, ${n - 1} দিয়ে নয়।`),
    };
    const o = textOptions(plain(ans), [...new Set(pool)].map(plain));
    if (o.wrong.length < 3) return null;
    o.wrong = o.wrong.map((w) => (traps[w.en] ? { ...w, trap: traps[w.en] } : w));
    return build({
      topic: 'average', subtopic: 'simple_average', pattern: 'simple_average',
      tags: ['average', 'primes'], difficulty: n > 9 ? 3 : 2, time: 60,
      stem: upTo
        ? T(`What is the average of all the prime numbers between 1 and ${upTo}?`, `1 থেকে ${upTo}-এর মধ্যে সকল মৌলিক সংখ্যার গড় কত?`)
        : T(`The average of the first ${n} prime numbers is`, `প্রথম ${n}টি মৌলিক সংখ্যার গড় কত?`),
      ...o,
      steps: [
        T(`The ${upTo ? `primes below ${upTo}` : `first ${n} primes`} are ${ps.join(', ')} — ${n} of them (1 is not prime).`, `${upTo ? `${upTo}-এর কম মৌলিক সংখ্যাগুলি` : `প্রথম ${n}টি মৌলিক সংখ্যা`} ${ps.join(', ')} — মোট ${n}টি (1 মৌলিক নয়)।`),
        T(`Their sum = ${S}.`, `এদের যোগফল = ${S}।`),
        T(`Average = ${S}/${n} = ${ans}.`, `গড় = ${S}/${n} = ${ans}।`),
      ],
      shortcut: T('Average = sum ÷ count; write the primes out carefully, starting from 2.', 'গড় = যোগফল ÷ সংখ্যা; 2 থেকে শুরু করে মৌলিক সংখ্যাগুলি সাবধানে লেখো।'),
    });
  }
  if (kind === 'sum_from_average') {
    const ctx = pick([
      { en: (n, a) => `If the average of ${n} numbers is ${a}, what is their sum?`, bn: (n, a) => `${n}টি সংখ্যার গড় ${a} হলে তাদের যোগফল কত?`, f: plain },
      { en: (n, a) => `The average weight of ${n} bags of rice is ${a} kg. What is the total weight of the bags?`, bn: (n, a) => `${n}টি চালের বস্তার গড় ওজন ${a} kg। বস্তাগুলির মোট ওজন কত?`, f: unitFmt('kg', 'kg') },
      { en: (n, a) => `A shopkeeper's average daily sale over ${n} days is ₹${a}. What is his total sale in these ${n} days?`, bn: (n, a) => `${n} দিনে এক দোকানদারের গড় দৈনিক বিক্রি ₹${a}। এই ${n} দিনে তাঁর মোট বিক্রি কত?`, f: rupee },
      { en: (n, a) => `A batsman's average over ${n} innings is ${a} runs. How many runs has he scored in all?`, bn: (n, a) => `${n}টি ইনিংসে এক ব্যাটসম্যানের গড় রান ${a}। তিনি মোট কত রান করেছেন?`, f: unitFmt('runs', 'রান') },
    ]);
    const n = ri(4, 15);
    const a = ri(12, 95);
    const ans = n * a;
    const o = opts(ans, ctx.f, [
      [(n - 1) * a, `Multiply by all ${n}, not ${n - 1}.`, `${n - 1} নয়, ${n} দিয়েই গুণ করো।`],
      [n + a, 'Sum = average × count (multiply, do not add).', 'যোগফল = গড় × সংখ্যা (গুণ করো, যোগ নয়)।'],
    ]);
    return build({
      topic: 'average', subtopic: 'simple_average', pattern: 'simple_average',
      tags: ['average', 'sum_from_average'], difficulty: 2, time: 30,
      stem: T(ctx.en(n, a), ctx.bn(n, a)), ...o,
      steps: [
        T('Sum = average × number of items.', 'যোগফল = গড় × রাশির সংখ্যা।'),
        T(`= ${a} × ${n} = ${ans}.`, `= ${a} × ${n} = ${ans}।`),
      ],
      shortcut: T('Average × count gives the total straight away.', 'গড় × সংখ্যা করলেই সরাসরি মোট পাওয়া যায়।'),
    });
  }
  if (kind === 'multiples') {
    const k = ri(3, 13);
    const lo = ri(10, 60);
    const hi = lo + ri(40, 160);
    const first = Math.ceil(lo / k) * k;
    const last = Math.floor(hi / k) * k;
    if (first === lo || last === hi) return null; // keep "between" unambiguous
    const count = (last - first) / k + 1;
    if (count < 4) return null;
    const num = first + last;
    const ans = mixed(num, 2);
    const cands = [mixed(lo + hi, 2), mixed(first + last - k, 2), mixed(first + last + k, 2), String(count), mixed(first + last, 1)];
    const o = textOptions(plain(ans), [...new Set(cands)].filter((x) => x !== ans).map(plain));
    if (o.wrong.length < 3) return null;
    const trapLoHi = mixed(lo + hi, 2);
    o.wrong = o.wrong.map((w) => (w.en === trapLoHi ? { ...w, trap: T(`${lo} and ${hi} themselves are not multiples of ${k}; average the first and last multiples (${first} and ${last}).`, `${lo} ও ${hi} নিজেরা ${k}-এর গুণিতক নয়; প্রথম ও শেষ গুণিতক (${first} ও ${last})-এর গড় নাও।`) } : w));
    return build({
      topic: 'average', subtopic: 'simple_average', pattern: 'simple_average',
      tags: ['average', 'multiples'], difficulty: 2, time: 50,
      stem: T(`What is the average of all the multiples of ${k} between ${lo} and ${hi}?`, `${lo} ও ${hi}-এর মধ্যে ${k}-এর সকল গুণিতকের গড় কত?`),
      ...o,
      steps: [
        T(`The multiples of ${k} between ${lo} and ${hi} run from ${first} to ${last} (${count} of them), equally spaced.`, `${lo} ও ${hi}-এর মধ্যে ${k}-এর গুণিতকগুলি ${first} থেকে ${last} পর্যন্ত (${count}টি), সমান ব্যবধানে।`),
        T(`For equally spaced numbers, average = (first + last) ÷ 2 = (${first} + ${last}) ÷ 2 = ${ans}.`, `সমান ব্যবধানের সংখ্যায় গড় = (প্রথম + শেষ) ÷ 2 = (${first} + ${last}) ÷ 2 = ${ans}।`),
      ],
      shortcut: T('Equally spaced list: average = (first + last) ÷ 2 — no need to add them all.', 'সমান ব্যবধানের তালিকা: গড় = (প্রথম + শেষ) ÷ 2 — সব যোগ করার দরকার নেই।'),
    });
  }
  // list: marks in n subjects
  const n = ri(5, 8);
  const vals = Array.from({ length: n }, () => ri(35, 98));
  const S = sum(vals);
  if (S % n) return null;
  const ans = S / n;
  const [P] = names(1);
  const o = opts(ans, plain, [
    [Math.round(S / (n - 1)) === S / (n - 1) ? S / (n - 1) : null, `There are ${n} marks, so divide by ${n}.`, `নম্বর ${n}টি, তাই ${n} দিয়ে ভাগ করো।`],
    [(Math.max(...vals) + Math.min(...vals)) / 2, 'The average of only the highest and lowest marks is not the average of all.', 'শুধু সর্বোচ্চ ও সর্বনিম্নের গড় সবার গড় নয়।'],
  ]);
  return build({
    topic: 'average', subtopic: 'simple_average', pattern: 'simple_average',
    tags: ['average', 'list'], difficulty: 2, time: 45,
    stem: T(`${P.en} scored ${vals.join(', ')} marks in ${n} subjects. What are the average marks?`, `${P.bn} ${n}টি বিষয়ে ${vals.join(', ')} নম্বর পেয়েছে। গড় নম্বর কত?`),
    ...o,
    steps: [
      T(`Sum = ${vals.join(' + ')} = ${S}.`, `যোগফল = ${vals.join(' + ')} = ${S}।`),
      T(`Average = ${S} ÷ ${n} = ${ans}.`, `গড় = ${S} ÷ ${n} = ${ans}।`),
    ],
    shortcut: T('Pick a round working mean (say 70), average the deviations, and add back.', 'একটি সুবিধাজনক সংখ্যা (ধরো 70) থেকে বিচ্যুতিগুলির গড় নিয়ে আবার যোগ করো।'),
  });
}

// ---------------------------------------------------------------- missing_value

const MISSING_KINDS = ['list_x', 'next_test', 'one_of_group'];

function missingValue(kind = pick(MISSING_KINDS)) {
  if (kind === 'list_x') {
    const n = ri(6, 9);
    const A = ri(12, 40);
    const known = Array.from({ length: n - 1 }, () => ri(Math.max(2, A - 15), A + 15));
    const x = n * A - sum(known);
    if (x < 2 || x > 99 || known.includes(x)) return null;
    const pos = ri(1, n - 2);
    const list = [...known.slice(0, pos), 'X', ...known.slice(pos)];
    const o = opts(x, plain, [
      [(n - 1) * A - sum(known), `There are ${n} numbers including X, so the total is ${n} × ${A}, not ${n - 1} × ${A}.`, `X-সহ সংখ্যা ${n}টি, তাই মোট ${n} × ${A}, ${n - 1} × ${A} নয়।`],
      [A, 'X is not the average itself; use totals.', 'X নিজে গড় নয়; মোট ধরে হিসাব করো।'],
    ]);
    return build({
      topic: 'average', subtopic: 'missing_value', pattern: 'missing_value',
      tags: ['average', 'missing_value', 'list_x'], difficulty: 2, time: 50,
      stem: T(`The average of ${list.join(', ')} is ${A}. The value of X is`, `${list.join(', ')}-এর গড় ${A}। X-এর মান কত?`),
      ...o,
      steps: [
        T(`There are ${n} numbers with average ${A}, so their total = ${n} × ${A} = ${n * A}.`, `${n}টি সংখ্যার গড় ${A}, তাই মোট = ${n} × ${A} = ${n * A}।`),
        T(`Sum of the known numbers = ${sum(known)}.`, `জানা সংখ্যাগুলির যোগফল = ${sum(known)}।`),
        T(`X = ${n * A} − ${sum(known)} = ${x}.`, `X = ${n * A} − ${sum(known)} = ${x}।`),
      ],
      shortcut: T('Missing value = count × average − sum of the rest.', 'হারানো মান = সংখ্যা × গড় − বাকিগুলির যোগফল।'),
    });
  }
  if (kind === 'next_test') {
    const n = ri(3, 5);
    const target = ri(55, 80);
    const marks = Array.from({ length: n }, () => ri(target - 15, target + 12));
    const need = (n + 1) * target - sum(marks);
    if (need < 30 || need > 100) return null;
    const [P] = names(1);
    const o = opts(need, unitFmt('marks', 'নম্বর'), [
      [n * target - sum(marks) > 0 ? n * target - sum(marks) : null, `With the next test there are ${n + 1} tests: the required total is ${n + 1} × ${target}.`, `পরের পরীক্ষা ধরে মোট ${n + 1}টি: প্রয়োজনীয় মোট ${n + 1} × ${target}।`],
      [target, 'Scoring the target average once does not make up for the earlier shortfall or surplus.', 'একবার লক্ষ্য গড় পেলেই আগের ঘাটতি বা বাড়তি মেটে না।'],
    ]);
    return build({
      topic: 'average', subtopic: 'missing_value', pattern: 'missing_value',
      tags: ['average', 'missing_value', 'next_test'], difficulty: 2, time: 50,
      stem: T(`${P.en} scored ${marks.join(', ')} marks in ${n} tests. How many marks must ${P.en} score in the next test to make the average of all ${n + 1} tests ${target}?`,
        `${P.bn} ${n}টি পরীক্ষায় ${marks.join(', ')} নম্বর পেয়েছে। সব ${n + 1}টি পরীক্ষার গড় ${target} করতে পরের পরীক্ষায় কত নম্বর পেতে হবে?`),
      ...o,
      steps: [
        T(`Required total for ${n + 1} tests = ${n + 1} × ${target} = ${(n + 1) * target}.`, `${n + 1}টি পরীক্ষায় প্রয়োজনীয় মোট = ${n + 1} × ${target} = ${(n + 1) * target}।`),
        T(`Marks so far = ${marks.join(' + ')} = ${sum(marks)}.`, `এ পর্যন্ত নম্বর = ${marks.join(' + ')} = ${sum(marks)}।`),
        T(`Needed = ${(n + 1) * target} − ${sum(marks)} = ${need}.`, `প্রয়োজন = ${(n + 1) * target} − ${sum(marks)} = ${need}।`),
      ],
      shortcut: T('Needed score = target × (tests including the next) − marks already scored.', 'প্রয়োজনীয় নম্বর = লক্ষ্য গড় × (পরেরটি ধরে মোট পরীক্ষা) − এ পর্যন্ত প্রাপ্ত নম্বর।'),
    });
  }
  // one_of_group: average of n numbers is A, average of (n−1) of them is B -> remaining one
  const n = ri(4, 12);
  const A = ri(15, 60);
  const B = A + pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
  const x = n * A - (n - 1) * B;
  if (x <= 0) return null;
  const o = opts(x, plain, [
    [Math.abs(A - B) * n, 'The difference of the averages is not the number; work with the totals.', 'গড়ের পার্থক্যই সংখ্যাটি নয়; মোট ধরে হিসাব করো।'],
    [n * A - n * B, `Only ${n - 1} numbers have average ${B}; their total is ${n - 1} × ${B}.`, `কেবল ${n - 1}টি সংখ্যার গড় ${B}; তাদের মোট ${n - 1} × ${B}।`],
  ]);
  return build({
    topic: 'average', subtopic: 'missing_value', pattern: 'missing_value',
    tags: ['average', 'missing_value', 'one_of_group'], difficulty: 3, time: 50,
    stem: T(`The average of ${n} numbers is ${A}. The average of ${n - 1} of them is ${B}. What is the remaining number?`, `${n}টি সংখ্যার গড় ${A}। তাদের মধ্যে ${n - 1}টির গড় ${B}। বাকি সংখ্যাটি কত?`),
    ...o,
    steps: [
      T(`Total of all ${n} = ${n} × ${A} = ${n * A}; total of ${n - 1} of them = ${n - 1} × ${B} = ${(n - 1) * B}.`, `${n}টির মোট = ${n} × ${A} = ${n * A}; ${n - 1}টির মোট = ${n - 1} × ${B} = ${(n - 1) * B}।`),
      T(`Remaining number = ${n * A} − ${(n - 1) * B} = ${x}.`, `বাকি সংখ্যা = ${n * A} − ${(n - 1) * B} = ${x}।`),
    ],
    shortcut: T('Remaining = (count × average) − (count of the rest × their average).', 'বাকি = (মোট সংখ্যা × গড়) − (বাকিদের সংখ্যা × তাদের গড়)।'),
  });
}

// ---------------------------------------------------------------- mess_expenditure_change

const MESS_SETTINGS = [
  { key: 'hostel', en: (n) => `There were ${n} students in a hostel.`, bn: (n) => `একটি হোস্টেলে ${n} জন ছাত্র ছিল।`, joinEn: (j) => `When the number of students increases by ${j},`, joinBn: (j) => `ছাত্রসংখ্যা ${j} জন বাড়লে`, who: T('student', 'ছাত্র') },
  { key: 'mess', en: (n) => `A mess had ${n} members.`, bn: (n) => `একটি মেসে ${n} জন সদস্য ছিল।`, joinEn: (j) => `When ${j} new members join,`, joinBn: (j) => `${j} জন নতুন সদস্য যোগ দিলে`, who: T('member', 'সদস্য') },
  { key: 'tour', en: (n) => `A tour party of ${n} persons shares its daily food bill equally.`, bn: (n) => `${n} জনের একটি ভ্রমণদল দৈনিক খাবারের খরচ সমান ভাগে দেয়।`, joinEn: (j) => `When ${j} more persons join the party,`, joinBn: (j) => `দলে আরও ${j} জন যোগ দিলে`, who: T('person', 'জন') },
];

function messExpenditureChange(setting = pick(MESS_SETTINGS), ask = pick(['total', 'total', 'average', 'new_total'])) {
  const n = ri(20, 60);
  const j = ri(3, 15);
  const N = n + j;
  const d = ri(1, 3);
  const x = ri(8, 40); // old average per head
  const R = j * x - N * d; // rise in the total
  if (R <= 0 || R % 1) return null;
  const old = n * x;
  const neu = N * (x - d);
  const ans = { total: old, average: x, new_total: neu }[ask];
  const askT = {
    total: T('What was the original total daily expenditure?', 'আগের মোট দৈনিক খরচ কত ছিল?'),
    average: T('What was the original average expenditure per head?', 'আগের মাথাপিছু গড় খরচ কত ছিল?'),
    new_total: T('What is the new total daily expenditure?', 'এখন মোট দৈনিক খরচ কত?'),
  }[ask];
  const stem = T(
    `${setting.en(n)} ${setting.joinEn(j)} the daily expenditure goes up by ₹${R}, but the average expenditure per head goes down by ₹${d}. ${askT.en}`,
    `${setting.bn(n)} ${setting.joinBn(j)} দৈনিক খরচ ₹${R} বাড়ে, কিন্তু মাথাপিছু গড় খরচ ₹${d} কমে। ${askT.bn}`,
  );
  const hints = {
    total: [[x, 'That is the average per head; the question asks for the total.', 'এটি মাথাপিছু গড়; প্রশ্নে মোট খরচ চাওয়া হয়েছে।'], [neu, 'That is the total AFTER the new members joined.', 'এটি নতুনরা যোগ দেওয়ার পরের মোট।']],
    average: [[x - d, 'That is the new (reduced) average.', 'এটি নতুন (কমে যাওয়া) গড়।'], [(R + n * d) / j, `The fall of ₹${d} applies to all ${N} people now, so use ${N} × ${d}, not ${n} × ${d}.`, `₹${d} কমেছে এখনকার ${N} জনেরই, তাই ${N} × ${d} নাও, ${n} × ${d} নয়।`]],
    new_total: [[old, 'That is the original total, before the increase.', 'এটি আগের মোট, বৃদ্ধির আগের।'], [old - R, `The total went UP by ₹${R}.`, `মোট ₹${R} বেড়েছে।`]],
  }[ask];
  const o = opts(ans, rupee, hints);
  return build({
    topic: 'average', subtopic: 'mess_expenditure_change', pattern: 'mess_expenditure_change',
    tags: ['average', 'mess_expenditure', setting.key, ask], difficulty: 3, time: 75,
    stem, ...o,
    steps: [
      T(`Let the original average be ₹x. Old total = ${n}x; new total = ${N}(x − ${d}).`, `আগের গড় ₹x ধরো। আগের মোট = ${n}x; নতুন মোট = ${N}(x − ${d})।`),
      T(`${N}(x − ${d}) = ${n}x + ${R} ⇒ ${N}x − ${N * d} = ${n}x + ${R} ⇒ ${j}x = ${R + N * d}, so x = ${x}.`, `${N}(x − ${d}) = ${n}x + ${R} ⇒ ${N}x − ${N * d} = ${n}x + ${R} ⇒ ${j}x = ${R + N * d}, তাই x = ${x}।`),
      T(`Original total = ${n} × ${x} = ₹${old}; new total = ${N} × ${x - d} = ₹${neu} → answer ₹${ans}.`, `আগের মোট = ${n} × ${x} = ₹${old}; নতুন মোট = ${N} × ${x - d} = ₹${neu} → উত্তর ₹${ans}।`),
    ],
    shortcut: T('Old average = (new count × fall + rise in total) ÷ number who joined.', 'আগের গড় = (নতুন সংখ্যা × গড়ের হ্রাস + মোটের বৃদ্ধি) ÷ যতজন যোগ দিল।'),
  });
}

module.exports = {
  subject: 'quant',
  topics: [{
    topic: 'average',
    weight: 1,
    gens: [
      ...CHANGE_KINDS.map((k) => () => uniformChangeAverage(k)),
      ...SIMPLE_KINDS.map((k) => () => simpleAverage(k)),
      ...MISSING_KINDS.map((k) => () => missingValue(k)),
      ...MESS_SETTINGS.map((s) => () => messExpenditureChange(s)),
    ],
  }],
  uniformChangeAverage,
  simpleAverage,
  missingValue,
  messExpenditureChange,
  CHANGE_KINDS,
  SIMPLE_KINDS,
  MISSING_KINDS,
  MESS_SETTINGS,
  mixed,
};
