'use strict';

/**
 * Number System: standard-level practice for the WBPSC-family PYQ types whose pattern
 * had (almost) no practice bank (db/patterns/pyq_map/quant/number_system.json):
 *
 *  - hcf_with_remainders       "greatest number dividing 1356, 1868 and 2764 leaving remainder 12"
 *                              (Clerkship 2023), "prime numbers dividing 143 leaving remainder 3" (2023).
 *  - lcm_with_same_remainder   "packs 3, 4, 5 or 6 in a parcel, one is left; packs 7, none is left"
 *                              (WBCS 2019), "least number from which 1 is subtracted is divisible by
 *                              12, 16 and 28" (Misc 2023).
 *  - hcf_lcm_of_fractions      "LCM of 4/3, 8/9 and 3/5" (WBCS 2019).
 *  - ratio_hcf_find_numbers    "ratio 5 : 13 and gcd 11 — the numbers?" (Misc 2023).
 *  - lcm_exactly_divisible     "least perfect square divisible by 3, 4, 5, 6 and 8" (Clerkship 2023).
 *  - hcf_lcm_product           "HCF 16, LCM 240, one number 48 — the other?", "product 2160, HCF 12 —
 *                              LCM?", "HCF × LCM = 24, difference 2 — larger number?", pair counts.
 *  - remainder_by_factor       "divided by 65 leaves 48; divided by 13?" (Clerkship 2005, 2019 ×2).
 *  - fraction_decimal_compare  "2.002 < 2.02 < 2.2 < 2.222" (WBCS 2018), "greatest of 0.55, (0.5)²,
 *                              0.46, √0.4" (Clerkship 2005), "5/9, √(25/49), (0.8)²" (KP 2023).
 *  - digit_reverse_sum_diff    "digit sum 9; interchanging the digits changes it by 9" (Misc 2023).
 *
 * Every answer is exact; distractors are the real slips, each with a trap note.
 */

const { ri, pick, shuffle, sample, gcd, T, numOptions, build } = require('../common');

const plain = (v) => T(String(v), String(v));
const lcm2 = (a, b) => (a * b) / gcd(a, b);
const lcmAll = (xs) => xs.reduce(lcm2);
const gcdAll = (xs) => xs.reduce(gcd);
const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
const list = (xs, en = 'and', bn = 'ও') => T(`${xs.slice(0, -1).join(', ')} ${en} ${xs[xs.length - 1]}`, `${xs.slice(0, -1).join(', ')} ${bn} ${xs[xs.length - 1]}`);

/** Numeric options; hints that are not positive whole numbers are dropped. */
function opts(ans, hints, fmt = plain) {
  return numOptions(ans, fmt, hints.filter(([v]) => Number.isInteger(v) && v > 0 && v !== ans));
}

/** Text options from candidate { en, bn, trap? } objects (first three distinct, not the answer). */
function textOpts(correct, cands) {
  const seen = new Set([correct.en]);
  const wrong = [];
  for (const c of cands) {
    if (!c || seen.has(c.en) || wrong.length >= 3) continue;
    seen.add(c.en);
    wrong.push(c);
  }
  return wrong.length === 3 ? { correct, wrong } : null;
}

function base(pattern, tags, difficulty, time) {
  return { topic: 'number_system', subtopic: pattern, pattern, tags: ['number_system', ...tags], difficulty, time };
}

// ---------------------------------------------------------------- hcf_with_remainders

const HCF_REM_KINDS = ['same', 'different', 'primes'];

function hcfWithRemainders(kind = pick(HCF_REM_KINDS)) {
  if (kind === 'primes') {
    const r = ri(1, 4);
    const [p, q] = sample([5, 7, 11, 13, 17, 19, 23].filter((x) => x > r), 2).sort((a, b) => a - b);
    const cs = { 1: [1], 2: [1, 2, 4], 3: [1, 2, 3, 4, 6], 4: [1, 2, 3, 4, 6, 8] }[r];
    const M = p * q * pick(cs);
    const N = M + r;
    if (N > 999) return null;
    const S = []; // all primes leaving remainder r
    for (let x = r + 1; x <= N; x++) if (isPrime(x) && N % x === r) S.push(x);
    if (S.join() !== `${p},${q}`) return null;
    const pair = (a, b) => T(`${a} and ${b}`, `${a} ও ${b}`);
    const nPrimes = [];
    for (let x = 2; x <= N; x++) if (isPrime(x) && N % x === 0) nPrimes.push(x);
    const nextPrime = (x) => { let y = x + 1; while (!isPrime(y)) y++; return y; };
    const cands = [
      nPrimes.length >= 2 && { ...pair(nPrimes[0], nPrimes[1]), trap: T(`These divide ${N} exactly; subtract the remainder first and factorise ${N} − ${r} = ${M}.`, `এরা ${N}-কে নিঃশেষে ভাগ করে; আগে ভাগশেষ বিয়োগ করে ${N} − ${r} = ${M}-কে উৎপাদকে ভাঙো।`) },
      M % 2 === 0 && { ...pair(2, q), trap: T(`2 divides ${M}, but a divisor must be larger than the remainder ${r}.`, `2 দিয়ে ${M} বিভাজ্য, কিন্তু ভাজককে ভাগশেষ ${r}-এর চেয়ে বড়ো হতে হয়।`) },
      M % 3 === 0 && { ...pair(3, p), trap: T(`3 divides ${M}, but a divisor must be larger than the remainder ${r}.`, `3 দিয়ে ${M} বিভাজ্য, কিন্তু ভাজককে ভাগশেষ ${r}-এর চেয়ে বড়ো হতে হয়।`) },
      pair(p, nextPrime(q)),
      pair(nextPrime(p) === q ? nextPrime(q) : nextPrime(p), q),
      pair(3, 7),
      pair(2, 11),
    ].filter(Boolean).filter((c) => {
      const [a, b] = c.en.split(' and ').map(Number);
      return !(a === p && b === q);
    });
    const o = textOpts(pair(p, q), cands);
    if (!o) return null;
    return build({
      ...base('hcf_with_remainders', ['hcf', 'remainder', 'primes'], 2, 60),
      stem: T(`The prime numbers dividing ${N} and leaving a remainder of ${r} in each case are`, `যে মৌলিক সংখ্যাগুলি দিয়ে ${N}-কে ভাগ করলে প্রতিবার ${r} ভাগশেষ থাকে, সেগুলি হল`),
      ...o,
      steps: [
        T(`A divisor leaving remainder ${r} divides ${N} − ${r} = ${M} exactly, and must be greater than ${r}.`, `যে ভাজক ${r} ভাগশেষ রাখে সে ${N} − ${r} = ${M}-কে নিঃশেষে ভাগ করে, এবং ${r}-এর চেয়ে বড়ো।`),
        T(`${M} = ${M / (p * q) === 1 ? '' : `${M / (p * q)} × `}${p} × ${q}; the prime factors greater than ${r} are ${p} and ${q}.`, `${M} = ${M / (p * q) === 1 ? '' : `${M / (p * q)} × `}${p} × ${q}; ${r}-এর চেয়ে বড়ো মৌলিক উৎপাদক ${p} ও ${q}।`),
        T(`Check: ${N} = ${p} × ${(N - r) / p} + ${r} = ${q} × ${(N - r) / q} + ${r}.`, `যাচাই: ${N} = ${p} × ${(N - r) / p} + ${r} = ${q} × ${(N - r) / q} + ${r}।`),
      ],
      shortcut: T('Subtract the remainder, factorise, keep only the factors bigger than the remainder.', 'ভাগশেষ বিয়োগ করো, উৎপাদকে ভাঙো, ভাগশেষের চেয়ে বড়ো উৎপাদকগুলিই রাখো।'),
    });
  }

  const g = ri(12, 90);
  const ms = sample([5, 7, 8, 9, 11, 13, 14, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 37, 41, 43], 3).sort((a, b) => a - b);
  if (gcdAll(ms) !== 1 || gcd(ms[0], ms[1]) !== 1) return null;
  if (kind === 'same') {
    const r = ri(2, Math.min(g - 1, 25));
    const Ns = ms.map((m) => g * m + r);
    if (Ns[2] > 3000) return null;
    const raw = gcdAll(Ns);
    const o = opts(g, [
      [raw === g ? null : raw, `That is the HCF of the numbers themselves; subtract the remainder ${r} first.`, `এটি মূল সংখ্যাগুলির গসাগু; আগে ভাগশেষ ${r} বিয়োগ করো।`],
      [g % 2 === 0 && g / 2 > r ? g / 2 : null, `${g / 2} also works, but it is not the GREATEST such number.`, `${g / 2}-ও কাজ করে, কিন্তু এটি বৃহত্তম নয়।`],
      [2 * g, `${2 * g} does not divide ${Ns[0] - r} exactly.`, `${2 * g} দিয়ে ${Ns[0] - r} নিঃশেষে বিভাজ্য নয়।`],
    ]);
    return build({
      ...base('hcf_with_remainders', ['hcf', 'remainder', 'same'], 3, 75),
      stem: T(`The greatest number which can divide ${list(Ns).en} leaving the same remainder ${r} in each case is`, `যে বৃহত্তম সংখ্যা দিয়ে ${list(Ns).bn}-কে ভাগ করলে প্রতিবার একই ভাগশেষ ${r} থাকে, সেটি হল`),
      ...o,
      steps: [
        T(`Subtract the remainder: ${Ns.map((x) => x - r).join(', ')}.`, `ভাগশেষ বিয়োগ করো: ${Ns.map((x) => x - r).join(', ')}।`),
        T(`${Ns.map((x, i) => `${x - r} = ${g} × ${ms[i]}`).join('; ')}.`, `${Ns.map((x, i) => `${x - r} = ${g} × ${ms[i]}`).join('; ')}।`),
        T(`${ms.join(', ')} have no common factor, so the HCF is ${g} (and ${g} > ${r}).`, `${ms.join(', ')}-এর কোনো সাধারণ উৎপাদক নেই, তাই গসাগু ${g} (এবং ${g} > ${r})।`),
      ],
      shortcut: T('Greatest divisor leaving remainder r = HCF of (each number − r).', 'r ভাগশেষ রেখে বৃহত্তম ভাজক = (প্রতিটি সংখ্যা − r)-এর গসাগু।'),
    });
  }
  // different remainders
  const rs = sample(Array.from({ length: Math.min(g - 1, 20) }, (_, i) => i + 1), 3);
  if (new Set(rs).size < 3) return null;
  const Ns = ms.map((m, i) => g * m + rs[i]);
  if (Math.max(...Ns) > 3000) return null;
  const sameSlip = gcdAll(Ns.map((x) => x - rs[0]));
  const o = opts(g, [
    [sameSlip === g ? null : sameSlip, `Each number loses its OWN remainder (${rs.join(', ')}), not ${rs[0]} from all.`, `প্রতিটি সংখ্যা থেকে তার নিজের ভাগশেষ (${rs.join(', ')}) বাদ যায়, সবার থেকে ${rs[0]} নয়।`],
    [gcdAll(Ns) === g ? null : gcdAll(Ns), 'That is the HCF of the numbers themselves; subtract the remainders first.', 'এটি মূল সংখ্যাগুলির গসাগু; আগে ভাগশেষগুলি বিয়োগ করো।'],
  ]);
  return build({
    ...base('hcf_with_remainders', ['hcf', 'remainder', 'different'], 3, 75),
    stem: T(`Find the greatest number which divides ${list(Ns).en} leaving remainders ${list(rs).en} respectively.`, `কোন বৃহত্তম সংখ্যা দিয়ে ${list(Ns).bn}-কে ভাগ করলে যথাক্রমে ${list(rs).bn} ভাগশেষ থাকে?`),
    ...o,
    steps: [
      T(`Subtract each remainder: ${Ns.map((x, i) => `${x} − ${rs[i]} = ${x - rs[i]}`).join(', ')}.`, `প্রতিটি থেকে তার ভাগশেষ বিয়োগ করো: ${Ns.map((x, i) => `${x} − ${rs[i]} = ${x - rs[i]}`).join(', ')}।`),
      T(`${Ns.map((x, i) => `${x - rs[i]} = ${g} × ${ms[i]}`).join('; ')}.`, `${Ns.map((x, i) => `${x - rs[i]} = ${g} × ${ms[i]}`).join('; ')}।`),
      T(`HCF = ${g}, which is larger than every remainder.`, `গসাগু = ${g}, যা প্রতিটি ভাগশেষের চেয়ে বড়ো।`),
    ],
    shortcut: T('Subtract each number’s own remainder, then take one HCF.', 'প্রতিটি সংখ্যা থেকে তার নিজের ভাগশেষ বিয়োগ করো, তারপর একবারে গসাগু নাও।'),
  });
}

// ---------------------------------------------------------------- lcm_with_same_remainder

const LCM_REM_KINDS = ['same_remainder', 'subtract', 'parcels', 'four_digit'];
const DIV_SETS = [[12, 16, 28], [12, 15, 20], [6, 9, 15], [8, 12, 18], [10, 15, 25], [9, 12, 15], [6, 8, 10], [12, 18, 24], [14, 21, 28], [16, 20, 24], [15, 20, 30], [8, 10, 14], [9, 15, 21], [10, 12, 16], [18, 24, 30], [6, 10, 14]];
const PARCEL_SETS = [[3, 4, 5, 6], [2, 3, 4, 5, 6], [4, 5, 6], [4, 6, 10], [3, 5, 8], [5, 6, 8], [2, 4, 5, 6], [6, 8, 9], [4, 6, 9]];

function lcmWithSameRemainder(kind = pick(LCM_REM_KINDS)) {
  if (kind === 'parcels') {
    const ds = pick(PARCEL_SETS);
    const L = lcmAll(ds);
    const r = ri(1, Math.min(2, ds[0] - 1));
    const p = pick([7, 11, 13].filter((x) => gcd(x, L) === 1 && !ds.includes(x)));
    let k = 1;
    while ((L * k + r) % p) k++;
    const ans = L * k + r;
    const o = opts(ans, [
      [L + r, `${L + r} leaves ${r} on division by ${ds.join(', ')}, but is not divisible by ${p}.`, `${L + r} দিয়ে ${ds.join(', ')}-এ ভাগশেষ ${r} থাকে, কিন্তু এটি ${p} দিয়ে বিভাজ্য নয়।`],
      [ans + L * p, `${ans + L * p} also fits, but it is not the least.`, `${ans + L * p}-ও শর্ত মানে, কিন্তু এটি ক্ষুদ্রতম নয়।`],
      [L * p, `${L * p} is divisible by ${p} but leaves no remainder on division by ${ds[0]}.`, `${L * p} দিয়ে ${p} বিভাজ্য, কিন্তু ${ds[0]} দিয়ে ভাগ করলে কোনো ভাগশেষ থাকে না।`],
    ]);
    const left = r === 1 ? T('he is left with one', 'একটি বাক্স বাকি থাকে') : T(`he is left with ${r}`, `${r}টি বাক্স বাকি থাকে`);
    return build({
      ...base('lcm_with_same_remainder', ['lcm', 'remainder', 'parcels'], 3, 90),
      stem: T(`A man has a certain number of small boxes to pack into parcels. If he packs ${list(ds, 'or', 'বা').en} in a parcel, ${left.en}; if he packs ${p} in a parcel, none is left over. What is the least number of boxes he can have?`,
        `এক ব্যক্তির কাছে কিছু ছোটো বাক্স আছে, সেগুলি পার্সেলে ভরতে হবে। প্রতি পার্সেলে ${list(ds, 'or', 'বা').bn}টি করে ভরলে ${left.bn}; ${p}টি করে ভরলে কোনো বাক্স বাকি থাকে না। তাঁর কাছে ন্যূনতম কতগুলি বাক্স আছে?`),
      ...o,
      steps: [
        T(`LCM of ${ds.join(', ')} = ${L}, so the number is of the form ${L}k + ${r}.`, `${ds.join(', ')}-এর লসাগু = ${L}, তাই সংখ্যাটি ${L}k + ${r} আকারের।`),
        T(`Try k = 1, 2, 3, …: the first value divisible by ${p} is at k = ${k}.`, `k = 1, 2, 3, … বসাও: k = ${k}-এ প্রথম ${p} দিয়ে বিভাজ্য মান পাওয়া যায়।`),
        T(`${L} × ${k} + ${r} = ${ans} = ${p} × ${ans / p}.`, `${L} × ${k} + ${r} = ${ans} = ${p} × ${ans / p}।`),
      ],
      shortcut: T('Write the number as LCM × k + remainder and test k = 1, 2, 3… against the last divisor.', 'সংখ্যাটিকে লসাগু × k + ভাগশেষ লিখে k = 1, 2, 3… বসিয়ে শেষ ভাজক দিয়ে যাচাই করো।'),
    });
  }

  const ds = pick(DIV_SETS);
  const L = lcmAll(ds);
  if (kind === 'four_digit') {
    const r = ri(1, Math.min(...ds) - 1);
    const k = Math.ceil((1000 - r) / L);
    const ans = L * k + r;
    if (ans > 9999) return null;
    const o = opts(ans, [
      [L * k, `${L * k} is divisible by all of them; the remainder ${r} must still be added.`, `${L * k} সবকটি দিয়ে বিভাজ্য; ভাগশেষ ${r} এখনও যোগ করতে হবে।`],
      [ans + L, `${ans + L} also leaves remainder ${r}, but ${ans} is smaller and still has 4 digits.`, `${ans + L}-ও ${r} ভাগশেষ রাখে, কিন্তু ${ans} ছোটো এবং চার অঙ্কেরই।`],
      [1000 + r, `${1000 + r} − ${r} = 1000 is not a multiple of ${L}.`, `${1000 + r} − ${r} = 1000, যা ${L}-এর গুণিতক নয়।`],
    ]);
    return build({
      ...base('lcm_with_same_remainder', ['lcm', 'remainder', 'four_digit'], 3, 75),
      stem: T(`What is the least 4-digit number which, when divided by ${list(ds).en}, leaves a remainder of ${r} in each case?`, `চার অঙ্কের কোন ক্ষুদ্রতম সংখ্যাকে ${list(ds).bn} দিয়ে ভাগ করলে প্রতিবার ${r} ভাগশেষ থাকে?`),
      ...o,
      steps: [
        T(`LCM of ${ds.join(', ')} = ${L}.`, `${ds.join(', ')}-এর লসাগু = ${L}।`),
        T(`The least multiple of ${L} that gives a 4-digit number after adding ${r}: ${L} × ${k} = ${L * k}.`, `${r} যোগ করে চার অঙ্কের সংখ্যা দেয় এমন ক্ষুদ্রতম ${L}-এর গুণিতক: ${L} × ${k} = ${L * k}।`),
        T(`Answer = ${L * k} + ${r} = ${ans}.`, `উত্তর = ${L * k} + ${r} = ${ans}।`),
      ],
      shortcut: T('Find the first multiple of the LCM near 1000, then add the remainder.', '1000-এর কাছাকাছি লসাগুর প্রথম গুণিতক বের করে ভাগশেষ যোগ করো।'),
    });
  }
  const r = ri(1, Math.min(...ds) - 1);
  const ans = L + r;
  const o = opts(ans, [
    [L, `${L} is the LCM itself — the remainder ${r} must still be added.`, `${L} কেবল লসাগু — ভাগশেষ ${r} এখনও যোগ করতে হবে।`],
    [L - r, `The remainder is added to the LCM, not subtracted.`, 'ভাগশেষ লসাগুর সঙ্গে যোগ হয়, বিয়োগ নয়।'],
    [ds.reduce((x, y) => x * y, 1) + r, 'The product of the divisors is a common multiple, but not the least one.', 'ভাজকগুলির গুণফল একটি সাধারণ গুণিতক, কিন্তু ক্ষুদ্রতম নয়।'],
  ]);
  const stem = kind === 'subtract'
    ? T(`What is the least number from which, if ${r} is subtracted, the difference is divisible by ${list(ds).en}?`, `কোন ক্ষুদ্রতম সংখ্যা থেকে ${r} বিয়োগ করলে বিয়োগফল ${list(ds).bn} দিয়ে বিভাজ্য হয়?`)
    : T(`Find the least number which, when divided by ${list(ds).en}, leaves a remainder of ${r} in each case.`, `কোন ক্ষুদ্রতম সংখ্যাকে ${list(ds).bn} দিয়ে ভাগ করলে প্রতিবার ${r} ভাগশেষ থাকে?`);
  return build({
    ...base('lcm_with_same_remainder', ['lcm', 'remainder', kind], 2, 50),
    stem, ...o,
    steps: [
      T(`LCM of ${ds.join(', ')} = ${L}.`, `${ds.join(', ')}-এর লসাগু = ${L}।`),
      T(`The number is ${r} more than a multiple of ${L}; the least is ${L} + ${r} = ${ans}.`, `সংখ্যাটি ${L}-এর কোনো গুণিতকের চেয়ে ${r} বেশি; ক্ষুদ্রতমটি ${L} + ${r} = ${ans}।`),
    ],
    shortcut: T('Least number leaving the same remainder r = LCM + r.', 'একই ভাগশেষ r রাখা ক্ষুদ্রতম সংখ্যা = লসাগু + r।'),
  });
}

// ---------------------------------------------------------------- hcf_lcm_of_fractions

const FRAC_KINDS = ['lcm3', 'hcf3', 'lcm2', 'hcf2'];
const fracStr = (n, d) => { const g = gcd(n, d); n /= g; d /= g; return d === 1 ? String(n) : `${n}/${d}`; };

function hcfLcmOfFractions(kind = pick(FRAC_KINDS)) {
  const count = kind.endsWith('3') ? 3 : 2;
  const fr = [];
  for (let i = 0; i < count; i++) {
    const d = ri(2, 15);
    const n = ri(1, 16);
    if (gcd(n, d) !== 1) return null;
    fr.push([n, d]);
  }
  if (new Set(fr.map(([n, d]) => `${n}/${d}`)).size < count) return null;
  const nums = fr.map((f) => f[0]);
  const dens = fr.map((f) => f[1]);
  const isLcm = kind.startsWith('lcm');
  const ans = isLcm ? fracStr(lcmAll(nums), gcdAll(dens)) : fracStr(gcdAll(nums), lcmAll(dens));
  const swapped = isLcm ? fracStr(lcmAll(nums), lcmAll(dens)) : fracStr(gcdAll(nums), gcdAll(dens));
  const other = isLcm ? fracStr(gcdAll(nums), lcmAll(dens)) : fracStr(lcmAll(nums), gcdAll(dens));
  const [an, ad] = ans.includes('/') ? ans.split('/').map(Number) : [Number(ans), 1];
  const recip = fracStr(ad, an);
  const o = textOpts(plain(ans), [
    { ...plain(swapped), trap: isLcm ? T('For the LCM, take the HCF (not the LCM) of the denominators.', 'লসাগুর জন্য হরগুলির গসাগু নাও, লসাগু নয়।') : T('For the HCF, take the LCM (not the HCF) of the denominators.', 'গসাগুর জন্য হরগুলির লসাগু নাও, গসাগু নয়।') },
    { ...plain(other), trap: isLcm ? T('That is the HCF of the fractions, not the LCM.', 'এটি ভগ্নাংশগুলির গসাগু, লসাগু নয়।') : T('That is the LCM of the fractions, not the HCF.', 'এটি ভগ্নাংশগুলির লসাগু, গসাগু নয়।') },
    { ...plain(recip), trap: T('Numerator and denominator are upside down.', 'লব ও হর উল্টে গেছে।') },
    plain(fracStr(lcmAll(nums) * 2, gcdAll(dens))),
    plain(fracStr(lcmAll(nums), gcdAll(dens) * 2)),
  ]);
  if (!o) return null;
  const fl = fr.map(([n, d]) => `${n}/${d}`);
  const what = isLcm ? T('LCM', 'লসাগু') : T('HCF', 'গসাগু');
  return build({
    ...base('hcf_lcm_of_fractions', ['hcf_lcm', 'fractions', kind], count === 3 ? 3 : 2, 60),
    stem: T(`Find the ${what.en} of ${list(fl).en}.`, `${list(fl).bn}-এর ${what.bn} নির্ণয় করো।`),
    ...o,
    steps: isLcm
      ? [
        T(`LCM of fractions = LCM of numerators ÷ HCF of denominators.`, 'ভগ্নাংশের লসাগু = লবগুলির লসাগু ÷ হরগুলির গসাগু।'),
        T(`LCM(${nums.join(', ')}) = ${lcmAll(nums)}; HCF(${dens.join(', ')}) = ${gcdAll(dens)}.`, `লসাগু(${nums.join(', ')}) = ${lcmAll(nums)}; গসাগু(${dens.join(', ')}) = ${gcdAll(dens)}।`),
        T(`LCM = ${lcmAll(nums)}/${gcdAll(dens)} = ${ans}.`, `লসাগু = ${lcmAll(nums)}/${gcdAll(dens)} = ${ans}।`),
      ]
      : [
        T('HCF of fractions = HCF of numerators ÷ LCM of denominators.', 'ভগ্নাংশের গসাগু = লবগুলির গসাগু ÷ হরগুলির লসাগু।'),
        T(`HCF(${nums.join(', ')}) = ${gcdAll(nums)}; LCM(${dens.join(', ')}) = ${lcmAll(dens)}.`, `গসাগু(${nums.join(', ')}) = ${gcdAll(nums)}; লসাগু(${dens.join(', ')}) = ${lcmAll(dens)}।`),
        T(`HCF = ${gcdAll(nums)}/${lcmAll(dens)} = ${ans}.`, `গসাগু = ${gcdAll(nums)}/${lcmAll(dens)} = ${ans}।`),
      ],
    shortcut: T('LCM: LCM on top, HCF below. HCF: HCF on top, LCM below. Reduce each fraction first.', 'লসাগু: উপরে লসাগু, নিচে গসাগু। গসাগু: উপরে গসাগু, নিচে লসাগু। আগে প্রতিটি ভগ্নাংশ লঘিষ্ঠ আকারে আনো।'),
  });
}

// ---------------------------------------------------------------- ratio_hcf_find_numbers

const RATIO_HCF_KINDS = ['numbers', 'numbers', 'lcm', 'sum'];

function ratioHcfFindNumbers(kind = pick(RATIO_HCF_KINDS)) {
  const a = ri(2, 13);
  const b = ri(a + 1, 17);
  if (gcd(a, b) !== 1) return null;
  const h = ri(3, 19);
  const word = pick([T('HCF', 'গসাগু'), T('gcd', 'গসাগু'), T('highest common factor', 'গরিষ্ঠ সাধারণ গুণনীয়ক')]);
  const intro = T(`The ratio of two numbers is ${a} : ${b} and their ${word.en} is ${h}.`, `দুটি সংখ্যার অনুপাত ${a} : ${b} এবং তাদের ${word.bn} ${h}।`);
  if (kind === 'numbers') {
    const pair = (x, y) => T(`${x}, ${y}`, `${x}, ${y}`);
    const o = textOpts(pair(a * h, b * h), [
      { ...pair(2 * a * h, 2 * b * h), trap: T(`The HCF of ${2 * a * h} and ${2 * b * h} is ${2 * h}, not ${h}.`, `${2 * a * h} ও ${2 * b * h}-এর গসাগু ${2 * h}, ${h} নয়।`) },
      { ...pair(a + h, b + h), trap: T('Multiply each ratio term by the HCF; do not add it.', 'অনুপাতের প্রতিটি পদকে গসাগু দিয়ে গুণ করো; যোগ নয়।') },
      { ...pair(a * h, a * b * h), trap: T(`${a * b * h} is their LCM, not the second number.`, `${a * b * h} হল তাদের লসাগু, দ্বিতীয় সংখ্যা নয়।`) },
      pair(a * a, b * a),
    ]);
    if (!o) return null;
    return build({
      ...base('ratio_hcf_find_numbers', ['hcf', 'ratio', 'numbers'], 2, 40),
      stem: T(`${intro.en} What are the numbers?`, `${intro.bn} সংখ্যা দুটি কী কী?`),
      ...o,
      steps: [
        T(`Since ${a} and ${b} have no common factor, the numbers are ${a}h and ${b}h with h = HCF = ${h}.`, `${a} ও ${b}-এর কোনো সাধারণ উৎপাদক নেই, তাই সংখ্যা দুটি ${a}h ও ${b}h, যেখানে h = গসাগু = ${h}।`),
        T(`Numbers = ${a} × ${h} = ${a * h} and ${b} × ${h} = ${b * h}.`, `সংখ্যা দুটি = ${a} × ${h} = ${a * h} এবং ${b} × ${h} = ${b * h}।`),
      ],
      shortcut: T('Numbers = ratio terms × HCF (the ratio must be in lowest terms).', 'সংখ্যা = অনুপাতের পদ × গসাগু (অনুপাত লঘিষ্ঠ আকারে থাকতে হবে)।'),
    });
  }
  const ans = kind === 'lcm' ? a * b * h : (a + b) * h;
  const o = kind === 'lcm'
    ? opts(ans, [
      [a * b, `That is only ${a} × ${b}; multiply by the HCF ${h} as well.`, `এটি শুধু ${a} × ${b}; গসাগু ${h} দিয়েও গুণ করো।`],
      [a * b * h * h, `${a * h} × ${b * h} is the product of the numbers (= HCF × LCM); divide it by the HCF.`, `${a * h} × ${b * h} হল সংখ্যা দুটির গুণফল (= গসাগু × লসাগু); একে গসাগু দিয়ে ভাগ করো।`],
    ])
    : opts(ans, [
      [a + b + h, 'Multiply each ratio term by the HCF; do not add it.', 'অনুপাতের প্রতিটি পদকে গসাগু দিয়ে গুণ করো; যোগ নয়।'],
      [a * b * h, 'That is their LCM, not their sum.', 'এটি তাদের লসাগু, যোগফল নয়।'],
    ]);
  return build({
    ...base('ratio_hcf_find_numbers', ['hcf', 'ratio', kind], 2, 45),
    stem: kind === 'lcm' ? T(`${intro.en} What is their LCM?`, `${intro.bn} তাদের লসাগু কত?`) : T(`${intro.en} What is the sum of the two numbers?`, `${intro.bn} সংখ্যা দুটির যোগফল কত?`),
    ...o,
    steps: [
      T(`The numbers are ${a} × ${h} = ${a * h} and ${b} × ${h} = ${b * h}.`, `সংখ্যা দুটি ${a} × ${h} = ${a * h} এবং ${b} × ${h} = ${b * h}।`),
      kind === 'lcm'
        ? T(`LCM = ${a} × ${b} × ${h} = ${ans}.`, `লসাগু = ${a} × ${b} × ${h} = ${ans}।`)
        : T(`Sum = ${a * h} + ${b * h} = ${ans}.`, `যোগফল = ${a * h} + ${b * h} = ${ans}।`),
    ],
    shortcut: kind === 'lcm' ? T('LCM = a × b × HCF.', 'লসাগু = a × b × গসাগু।') : T('Sum = (a + b) × HCF.', 'যোগফল = (a + b) × গসাগু।'),
  });
}

// ---------------------------------------------------------------- hcf_lcm_product

/**
 * HCF × LCM = product of the two numbers, in every framing seen in papers:
 * other number from HCF/LCM; LCM from product + HCF; HCF from product + LCM; the product;
 * product + difference / sum → a number; "LCM is k times HCF, HCF + LCM = S"; number of
 * pairs with a given sum or product and HCF; sum of reciprocals.
 */
const PRODUCT_KINDS = ['other_number', 'lcm_from_product', 'hcf_from_product', 'product', 'diff_number', 'sum_number', 'lcm_multiple_hcf', 'pairs_sum', 'pairs_product', 'reciprocal_sum'];

const distinctPrimes = (n) => { let c = 0; for (let p = 2; p * p <= n; p++) if (n % p === 0) { c++; while (n % p === 0) n /= p; } return c + (n > 1 ? 1 : 0); };
const PAIR_M = [6, 10, 12, 14, 15, 18, 20, 21, 22, 24, 28, 30, 36, 40, 42, 60, 72, 84, 90, 120, 210];

function hcfLcmProduct(kind = pick(PRODUCT_KINDS)) {
  const B = (tags, d, t) => base('hcf_lcm_product', ['hcf', 'lcm', 'product', ...tags], d, t);
  const ruleStep = T('For two numbers, HCF × LCM = product of the numbers.', 'দুটি সংখ্যার ক্ষেত্রে গসাগু × লসাগু = সংখ্যা দুটির গুণফল।');

  if (kind === 'other_number' || kind === 'lcm_from_product' || kind === 'hcf_from_product' || kind === 'product') {
    const a = ri(kind === 'other_number' ? 2 : 1, 11);
    const b = ri(a + 1, 17);
    if (gcd(a, b) !== 1) return null;
    const h = ri(2, 30);
    const L = h * a * b;
    const P = h * L;
    if (L > 3000) return null;
    if (kind === 'other_number') {
      const giveFirst = ri(0, 1) === 1;
      const x = giveFirst ? h * a : h * b;
      const ans = giveFirst ? h * b : h * a;
      const o = opts(ans, [
        [L % x === 0 ? L / x : null, `That is LCM ÷ given number; multiply by the HCF ${h} first.`, `এটি লসাগু ÷ দেওয়া সংখ্যা; আগে গসাগু ${h} দিয়ে গুণ করো।`],
        [L - x, 'HCF × LCM = product of the numbers; subtracting gives nothing.', 'গসাগু × লসাগু = সংখ্যা দুটির গুণফল; বিয়োগ করে কিছু পাওয়া যায় না।'],
      ]);
      const stem = ri(0, 1)
        ? T(`The HCF and LCM of two numbers are ${h} and ${L} respectively. If one of the numbers is ${x}, the other number is`, `দুটি সংখ্যার গসাগু ও লসাগু যথাক্রমে ${h} ও ${L}। যদি একটি সংখ্যা ${x} হয়, তবে অপর সংখ্যাটি হল`)
        : T(`Two numbers have HCF ${h} and LCM ${L}. One of them is ${x}. What is the other number?`, `দুটি সংখ্যার গসাগু ${h} এবং লসাগু ${L}। একটি সংখ্যা ${x} হলে অপর সংখ্যাটি কত?`);
      return build({
        ...B(['other_number'], 2, 45), stem, ...o,
        steps: [ruleStep, T(`Other number = ${h} × ${L} ÷ ${x} = ${P} ÷ ${x} = ${ans}.`, `অপর সংখ্যা = ${h} × ${L} ÷ ${x} = ${P} ÷ ${x} = ${ans}।`), T(`Check: HCF(${x}, ${ans}) = ${h}, LCM = ${L}.`, `যাচাই: গসাগু(${x}, ${ans}) = ${h}, লসাগু = ${L}।`)],
        shortcut: T('Other number = HCF × LCM ÷ given number.', 'অপর সংখ্যা = গসাগু × লসাগু ÷ দেওয়া সংখ্যা।'),
      });
    }
    if (kind === 'lcm_from_product') {
      const o = opts(L, [
        [a * b, `That divides by the HCF twice; divide the product by the HCF only once.`, `এখানে গসাগু দিয়ে দুবার ভাগ করা হয়েছে; গুণফলকে গসাগু দিয়ে একবারই ভাগ করো।`],
        [P - h, 'HCF × LCM = product; divide, do not subtract.', 'গসাগু × লসাগু = গুণফল; ভাগ করো, বিয়োগ নয়।'],
      ]);
      const stem = ri(0, 1)
        ? T(`The product of two numbers is ${P} and their HCF is ${h}. Their LCM is`, `দুটি সংখ্যার গুণফল ${P} এবং তাদের গসাগু ${h} হলে, সংখ্যা দুটির লসাগু কত?`)
        : T(`If the product of two numbers is ${P} and their HCF is ${h}, what is their LCM?`, `দুটি সংখ্যার গুণফল ${P} ও গসাগু ${h}। তাদের লসাগু নির্ণয় করো।`);
      return build({
        ...B(['find_lcm'], 2, 40), stem, ...o,
        steps: [ruleStep, T(`LCM = ${P} ÷ ${h} = ${L}.`, `লসাগু = ${P} ÷ ${h} = ${L}।`), T(`Check: the numbers can be ${h * a} and ${h * b} (HCF ${h}, LCM ${L}).`, `যাচাই: সংখ্যা দুটি ${h * a} ও ${h * b} হতে পারে (গসাগু ${h}, লসাগু ${L})।`)],
        shortcut: T('LCM = product ÷ HCF.', 'লসাগু = গুণফল ÷ গসাগু।'),
      });
    }
    if (kind === 'hcf_from_product') {
      const o = opts(h, [
        [a * b === h ? null : a * b, `That is LCM ÷ HCF; the HCF is product ÷ LCM.`, `এটি লসাগু ÷ গসাগু; গসাগু = গুণফল ÷ লসাগু।`],
      ]);
      return build({
        ...B(['find_hcf'], 2, 40),
        stem: T(`The product of two numbers is ${P} and their LCM is ${L}. Their HCF is`, `দুটি সংখ্যার গুণফল ${P} এবং তাদের লসাগু ${L} হলে, সংখ্যা দুটির গসাগু কত?`),
        ...o,
        steps: [ruleStep, T(`HCF = ${P} ÷ ${L} = ${h}.`, `গসাগু = ${P} ÷ ${L} = ${h}।`), T(`Check: the numbers can be ${h * a} and ${h * b}.`, `যাচাই: সংখ্যা দুটি ${h * a} ও ${h * b} হতে পারে।`)],
        shortcut: T('HCF = product ÷ LCM.', 'গসাগু = গুণফল ÷ লসাগু।'),
      });
    }
    const o = opts(P, [
      [L / h, 'That is LCM ÷ HCF; the product of the numbers is HCF × LCM.', 'এটি লসাগু ÷ গসাগু; সংখ্যা দুটির গুণফল = গসাগু × লসাগু।'],
      [L + h, 'Multiply the HCF and LCM; do not add them.', 'গসাগু ও লসাগু গুণ করো; যোগ নয়।'],
    ]);
    return build({
      ...B(['find_product'], 2, 40),
      stem: T(`The HCF and LCM of two numbers are ${h} and ${L}. What is the product of the two numbers?`, `দুটি সংখ্যার গসাগু ${h} ও লসাগু ${L}। সংখ্যা দুটির গুণফল কত?`),
      ...o,
      steps: [ruleStep, T(`Product = ${h} × ${L} = ${P}.`, `গুণফল = ${h} × ${L} = ${P}।`)],
      shortcut: T('Product of the two numbers = HCF × LCM.', 'সংখ্যা দুটির গুণফল = গসাগু × লসাগু।'),
    });
  }

  if (kind === 'diff_number' || kind === 'sum_number') {
    const y = ri(2, 45);
    const x = y + ri(1, 15);
    const P = x * y;
    if (P > 2500) return null;
    const diff = kind === 'diff_number';
    const k = diff ? x - y : x + y;
    const larger = ri(0, 1) === 1;
    const ans = larger ? x : y;
    const other = larger ? y : x;
    const root = Math.round(Math.sqrt(P));
    const rel0 = diff ? 'অন্তর' : 'যোগফল';
    const o = opts(ans, [
      [other, `That is the ${larger ? 'smaller' : 'larger'} number; the question asks for the ${larger ? 'larger' : 'smaller'} one.`, `এটি ${larger ? 'ছোটো' : 'বড়ো'} সংখ্যাটি; প্রশ্নে ${larger ? 'বড়ো' : 'ছোটো'} সংখ্যাটি চাওয়া হয়েছে।`],
      [root, `${root} is about √${P} — only the place to start the search; the two numbers must ${diff ? 'differ by' : 'add up to'} ${k}.`, `${root} হল √${P}-এর কাছাকাছি — খোঁজা শুরুর জায়গা মাত্র; সংখ্যা দুটির ${rel0} ${k} হতে হবে।`],
    ]);
    const ask = larger ? T('the larger number', 'বড়ো সংখ্যাটি') : T('the smaller number', 'ছোটো সংখ্যাটি');
    const rel = diff ? T('difference', 'বিয়োগফল') : T('sum', 'যোগফল');
    const stem = ri(0, 1)
      ? T(`The product of the LCM and HCF of two numbers is ${P}. If the ${rel.en} of the two numbers is ${k}, ${ask.en} is`, `দুটি সংখ্যার লসাগু ও গসাগু-এর গুণফল ${P}। সংখ্যা দুটির ${rel.bn} ${k} হলে, ${ask.bn} কত?`)
      : T(`The HCF and LCM of two numbers multiply to give ${P}, and the ${rel.en} of the numbers is ${k}. Find ${ask.en}.`, `দুটি সংখ্যার গসাগু ও লসাগু-এর গুণফল ${P} এবং সংখ্যা দুটির ${rel.bn} ${k}। ${ask.bn} নির্ণয় করো।`);
    return build({
      ...B([diff ? 'difference' : 'sum'], 3, 60), stem, ...o,
      steps: [
        T(`HCF × LCM = product of the numbers, so the two numbers multiply to ${P}.`, `গসাগু × লসাগু = সংখ্যা দুটির গুণফল, তাই সংখ্যা দুটির গুণফল ${P}।`),
        T(`Find the factor pair of ${P} whose ${rel.en} is ${k}: ${y} × ${x} = ${P} and ${diff ? `${x} − ${y}` : `${y} + ${x}`} = ${k}.`, `${P}-এর সেই উৎপাদক-জোড়া খোঁজো যাদের ${rel.bn} ${k}: ${y} × ${x} = ${P} এবং ${diff ? `${x} − ${y}` : `${y} + ${x}`} = ${k}।`),
        T(`So ${ask.en} is ${ans}.`, `তাই ${ask.bn} ${ans}।`),
      ],
      shortcut: diff
        ? T('Numbers multiply to HCF × LCM; with difference d, try x(x − d) = product, starting near √product.', 'সংখ্যা দুটির গুণফল = গসাগু × লসাগু; অন্তর d হলে √গুণফলের কাছ থেকে x(x − d) = গুণফল পরীক্ষা করো।')
        : T('Numbers multiply to HCF × LCM; with sum s, they are the roots of t² − st + product = 0.', 'সংখ্যা দুটির গুণফল = গসাগু × লসাগু; যোগফল s হলে তারা t² − st + গুণফল = 0-এর বীজ।'),
    });
  }

  if (kind === 'lcm_multiple_hcf') {
    const a = ri(2, 7);
    const b = ri(a + 1, 11);
    if (gcd(a, b) !== 1) return null;
    const k = a * b;
    const h = ri(3, 40);
    const L = k * h;
    const S = h + L;
    const giveFirst = ri(0, 1) === 1;
    const x = giveFirst ? h * a : h * b;
    const ans = giveFirst ? h * b : h * a;
    const o = opts(ans, [
      [S - x, `${S} is HCF + LCM, not the sum of the two numbers.`, `${S} হল গসাগু + লসাগু, সংখ্যা দুটির যোগফল নয়।`],
      [L, `${L} is the LCM, not the other number.`, `${L} হল লসাগু, অপর সংখ্যা নয়।`],
    ]);
    return build({
      ...B(['lcm_multiple_hcf'], 3, 75),
      stem: T(`The LCM of two numbers is ${k} times their HCF. The sum of the HCF and the LCM is ${S}. If one of the numbers is ${x}, the other number is`, `দুটি সংখ্যার লসাগু তাদের গসাগু-এর ${k} গুণ। গসাগু ও লসাগু-এর যোগফল ${S}। একটি সংখ্যা ${x} হলে অপর সংখ্যাটি কত?`),
      ...o,
      steps: [
        T(`Let HCF = h; then LCM = ${k}h and h + ${k}h = ${S}, so h = ${S} ÷ ${k + 1} = ${h} and LCM = ${L}.`, `ধরো গসাগু = h; তাহলে লসাগু = ${k}h এবং h + ${k}h = ${S}, তাই h = ${S} ÷ ${k + 1} = ${h} এবং লসাগু = ${L}।`),
        T(`Other number = HCF × LCM ÷ ${x} = ${h} × ${L} ÷ ${x} = ${ans}.`, `অপর সংখ্যা = গসাগু × লসাগু ÷ ${x} = ${h} × ${L} ÷ ${x} = ${ans}।`),
      ],
      shortcut: T('HCF = (HCF + LCM) ÷ (k + 1); then other = HCF × LCM ÷ given number.', 'গসাগু = (গসাগু + লসাগু) ÷ (k + 1); তারপর অপর সংখ্যা = গসাগু × লসাগু ÷ দেওয়া সংখ্যা।'),
    });
  }

  if (kind === 'pairs_sum') {
    const m = ri(5, 30);
    const h = ri(2, 25);
    const S = m * h;
    let ans = 0;
    for (let p = 1; 2 * p < m; p++) if (gcd(p, m - p) === 1) ans++;
    const all = Math.floor((m - 1) / 2);
    const o = opts(ans, [
      [all, `${all} counts every split of ${m} into two parts, including parts that share a factor (their HCF would be larger than ${h}).`, `${all}-তে ${m}-এর সব ভাগ ধরা হয়েছে, যেসব অংশের সাধারণ উৎপাদক আছে সেগুলিও (তাদের গসাগু ${h}-এর চেয়ে বড়ো হবে)।`],
      [2 * ans, 'Each pair has been counted twice (a, b) and (b, a).', 'প্রতিটি জোড়া দুবার গোনা হয়েছে: (a, b) ও (b, a)।'],
    ]);
    return build({
      ...B(['count_pairs', 'sum'], 3, 75),
      stem: T(`The sum of two numbers is ${S} and their HCF is ${h}. How many such pairs of numbers are possible?`, `দুটি সংখ্যার যোগফল ${S} এবং তাদের গসাগু ${h}। এমন কতগুলি সংখ্যা-জোড়া সম্ভব?`),
      ...o,
      steps: [
        T(`Write the numbers as ${h}a and ${h}b with a, b co-prime: ${h}(a + b) = ${S}, so a + b = ${m}.`, `সংখ্যা দুটি ${h}a ও ${h}b লেখো, যেখানে a, b পরস্পর মৌলিক: ${h}(a + b) = ${S}, তাই a + b = ${m}।`),
        T(`Co-prime pairs with a < b and a + b = ${m}: ${ans}.`, `a < b এবং a + b = ${m} এমন পরস্পর মৌলিক জোড়া: ${ans}টি।`),
      ],
      shortcut: T('Divide the sum by the HCF, then count co-prime splits of that number.', 'যোগফলকে গসাগু দিয়ে ভাগ করো, তারপর সেই সংখ্যার পরস্পর মৌলিক ভাগগুলি গোনো।'),
    });
  }

  if (kind === 'pairs_product') {
    const m = pick(PAIR_M);
    const h = ri(2, 15);
    const P = h * h * m;
    const ans = 2 ** (distinctPrimes(m) - 1);
    let all = 0;
    for (let p = 1; p * p < m; p++) if (m % p === 0) all++;
    const o = opts(ans, [
      [all, `${all} counts every factor pair of ${m}, but a pair sharing a factor would make the HCF larger than ${h}.`, `${all}-তে ${m}-এর সব উৎপাদক-জোড়া ধরা হয়েছে, কিন্তু সাধারণ উৎপাদক থাকলে গসাগু ${h}-এর চেয়ে বড়ো হয়ে যায়।`],
      [2 * ans, 'Each pair has been counted twice (a, b) and (b, a).', 'প্রতিটি জোড়া দুবার গোনা হয়েছে: (a, b) ও (b, a)।'],
    ]);
    return build({
      ...B(['count_pairs'], 3, 75),
      stem: T(`The product of two numbers is ${P} and their HCF is ${h}. How many such pairs of numbers are possible?`, `দুটি সংখ্যার গুণফল ${P} এবং তাদের গসাগু ${h}। এমন কতগুলি সংখ্যা-জোড়া সম্ভব?`),
      ...o,
      steps: [
        T(`Write the numbers as ${h}a and ${h}b with a, b co-prime: ${h * h}ab = ${P}, so ab = ${m}.`, `সংখ্যা দুটি ${h}a ও ${h}b লেখো, যেখানে a, b পরস্পর মৌলিক: ${h * h}ab = ${P}, তাই ab = ${m}।`),
        T(`${m} has ${distinctPrimes(m)} distinct prime factor(s); each prime power goes wholly to a or to b, giving ${ans} co-prime pair(s) with a < b.`, `${m}-এর ${distinctPrimes(m)}টি ভিন্ন মৌলিক উৎপাদক; প্রতিটি মৌলিক ঘাত পুরোটা a-তে বা b-তে যায়, তাই a < b এমন পরস্পর মৌলিক জোড়া ${ans}টি।`),
      ],
      shortcut: T('ab = product ÷ HCF²; number of co-prime pairs = 2^(distinct primes − 1).', 'ab = গুণফল ÷ গসাগু²; পরস্পর মৌলিক জোড়ার সংখ্যা = 2^(ভিন্ন মৌলিকের সংখ্যা − 1)।'),
    });
  }

  // reciprocal_sum
  const x = ri(3, 40);
  const y = ri(x + 1, 60);
  const S = x + y;
  const P = x * y;
  const fr = (p, q) => { const d = gcd(p, q); return q / d === 1 ? plain(p / d) : plain(`${p / d}/${q / d}`); };
  const o = textOpts(fr(S, P), [
    { ...fr(P, S), trap: T('Upside down: 1/a + 1/b = (a + b)/(ab), so the sum goes on top.', 'উল্টে গেছে: 1/a + 1/b = (a + b)/(ab), তাই যোগফল উপরে বসে।') },
    { ...fr(1, S), trap: T('1/(a + b) is not 1/a + 1/b.', '1/(a + b) আর 1/a + 1/b এক নয়।') },
    fr(S + 1, P), fr(S - 1, P), fr(S, P + 1),
  ]);
  if (!o) return null;
  return build({
    ...B(['reciprocal'], 3, 60),
    stem: T(`The sum of two numbers is ${S} and the product of their HCF and LCM is ${P}. What is the sum of the reciprocals of the two numbers?`, `দুটি সংখ্যার যোগফল ${S} এবং তাদের গসাগু ও লসাগু-এর গুণফল ${P}। সংখ্যা দুটির অন্যোন্যকের (উল্টো রাশির) যোগফল কত?`),
    ...o,
    steps: [
      T(`HCF × LCM = product of the numbers, so ab = ${P}.`, `গসাগু × লসাগু = সংখ্যা দুটির গুণফল, তাই ab = ${P}।`),
      T(`1/a + 1/b = (a + b)/(ab) = ${S}/${P} = ${fr(S, P).en}.`, `1/a + 1/b = (a + b)/(ab) = ${S}/${P} = ${fr(S, P).bn}।`),
    ],
    shortcut: T('Sum of reciprocals = sum ÷ (HCF × LCM).', 'অন্যোন্যকের যোগফল = যোগফল ÷ (গসাগু × লসাগু)।'),
  });
}

// ---------------------------------------------------------------- lcm_exactly_divisible

const LCM_EXACT_KINDS = ['plain', 'perfect_square', 'greatest_4digit', 'least_4digit'];
const SQ_SETS_FIXED = [[3, 4, 5, 6, 8], [2, 3, 4, 5, 6], [4, 6, 10], [6, 9, 15], [8, 12, 15], [3, 4, 5, 6], [10, 12, 15], [4, 9, 10, 15], [6, 8, 12], [12, 18, 30], [2, 4, 5, 6, 7], [5, 6, 9], [8, 9, 10], [6, 10, 14], [3, 5, 7], [4, 5, 7]];
const EXACT_SETS_FIXED = [[12, 15, 20], [16, 24, 36], [18, 24, 30], [15, 25, 40], [12, 18, 27], [14, 21, 35], [20, 25, 30], [9, 12, 16], [10, 16, 24], [21, 28, 36], [8, 12, 30], [15, 18, 24], [12, 16, 28], [6, 15, 21], [24, 32, 40]];

/** Divisor sets: the textbook ones, or a fresh random set of 3-5 (perfect square) / 3 numbers. */
function sqSet() {
  if (ri(0, 2) === 0) return pick(SQ_SETS_FIXED);
  const ds = sample([2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20], ri(3, 5)).sort((a, b) => a - b);
  return ds.some((d) => ds.some((e) => e !== d && e % d === 0 && ds.length === 3)) ? null : ds;
}
function exactSet() {
  if (ri(0, 2) === 0) return pick(EXACT_SETS_FIXED);
  const ds = sample([6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27, 28, 30, 32, 35, 36, 40, 42, 45], 3).sort((a, b) => a - b);
  const L = lcmAll(ds);
  if (ds.some((d) => ds.some((e) => e !== d && e % d === 0))) return null; // no divisor that is redundant
  return L >= 60 && L <= 2000 ? ds : null;
}

function squareUp(L) {
  let m = 1;
  let x = L;
  for (let p = 2; x > 1; p++) {
    let e = 0;
    while (x % p === 0) { x /= p; e++; }
    if (e % 2) m *= p;
  }
  return { mult: m, sq: L * m };
}

function lcmExactlyDivisible(kind = pick(LCM_EXACT_KINDS)) {
  if (kind === 'perfect_square') {
    const ds = sqSet();
    if (!ds) return null;
    const L = lcmAll(ds);
    const { mult, sq } = squareUp(L);
    if (mult === 1 || sq > 50000) return null;
    const root = Math.round(Math.sqrt(sq));
    const o = opts(sq, [
      [L, `${L} is the LCM, but it is not a perfect square.`, `${L} হল লসাগু, কিন্তু এটি পূর্ণবর্গ নয়।`],
      [L * L, `${L}² is a perfect square divisible by all of them, but not the least one.`, `${L}² একটি পূর্ণবর্গ এবং সবকটি দিয়ে বিভাজ্য, কিন্তু ক্ষুদ্রতম নয়।`],
      [Math.round(Math.sqrt(L)) ** 2 === L ? null : (Math.floor(Math.sqrt(L)) + 1) ** 2, 'The nearest perfect square above the LCM need not be divisible by all the numbers.', 'লসাগুর ঠিক উপরের পূর্ণবর্গ সবকটি দিয়ে বিভাজ্য না-ও হতে পারে।'],
    ]);
    return build({
      ...base('lcm_exactly_divisible', ['lcm', 'perfect_square'], 3, 75),
      stem: T(`The least perfect square number divisible by ${list(ds).en} is`, `${list(ds).bn} দিয়ে বিভাজ্য ক্ষুদ্রতম পূর্ণবর্গ সংখ্যা কোনটি?`),
      ...o,
      steps: [
        T(`LCM of ${ds.join(', ')} = ${L}.`, `${ds.join(', ')}-এর লসাগু = ${L}।`),
        T(`In ${L} the primes with an odd power multiply to ${mult}; multiply by ${mult} to make every power even.`, `${L}-এ বিজোড় ঘাতের মৌলিক উৎপাদকগুলির গুণফল ${mult}; সব ঘাত জোড় করতে ${mult} দিয়ে গুণ করো।`),
        T(`${L} × ${mult} = ${sq} = ${root}².`, `${L} × ${mult} = ${sq} = ${root}²।`),
      ],
      shortcut: T('Take the LCM, then multiply by each prime that appears to an odd power.', 'লসাগু নাও, তারপর যে মৌলিকগুলি বিজোড় ঘাতে আছে সেগুলি দিয়ে গুণ করো।'),
    });
  }
  const ds = exactSet();
  if (!ds) return null;
  const L = lcmAll(ds);
  if (kind === 'greatest_4digit' || kind === 'least_4digit') {
    const great = kind === 'greatest_4digit';
    const ans = great ? Math.floor(9999 / L) * L : Math.ceil(1000 / L) * L;
    const o = opts(ans, great
      ? [[ans - L, `${ans - L} is divisible too, but ${ans} is larger and still has 4 digits.`, `${ans - L}-ও বিভাজ্য, কিন্তু ${ans} বড়ো এবং চার অঙ্কেরই।`], [9999 - L, `Subtract the REMAINDER of 9999 ÷ ${L} (${9999 % L}), not the LCM.`, `9999 ÷ ${L}-এর ভাগশেষ (${9999 % L}) বিয়োগ করো, লসাগু নয়।`]]
      : [[ans + L, `${ans + L} is divisible too, but ${ans} is smaller and still has 4 digits.`, `${ans + L}-ও বিভাজ্য, কিন্তু ${ans} ছোটো এবং চার অঙ্কেরই।`], [1000 + (1000 % L), `Add (${L} − remainder), not the remainder of 1000 ÷ ${L}.`, `(${L} − ভাগশেষ) যোগ করো, 1000 ÷ ${L}-এর ভাগশেষ নয়।`]]);
    return build({
      ...base('lcm_exactly_divisible', ['lcm', kind], 3, 60),
      stem: great
        ? T(`What is the greatest 4-digit number which is exactly divisible by ${list(ds).en}?`, `${list(ds).bn} দিয়ে নিঃশেষে বিভাজ্য চার অঙ্কের বৃহত্তম সংখ্যা কোনটি?`)
        : T(`What is the least 4-digit number which is exactly divisible by ${list(ds).en}?`, `${list(ds).bn} দিয়ে নিঃশেষে বিভাজ্য চার অঙ্কের ক্ষুদ্রতম সংখ্যা কোনটি?`),
      ...o,
      steps: great
        ? [T(`LCM of ${ds.join(', ')} = ${L}.`, `${ds.join(', ')}-এর লসাগু = ${L}।`), T(`9999 ÷ ${L} leaves remainder ${9999 % L}.`, `9999 ÷ ${L}-এর ভাগশেষ ${9999 % L}।`), T(`Answer = 9999 − ${9999 % L} = ${ans}.`, `উত্তর = 9999 − ${9999 % L} = ${ans}।`)]
        : [T(`LCM of ${ds.join(', ')} = ${L}.`, `${ds.join(', ')}-এর লসাগু = ${L}।`), T(`1000 ÷ ${L} leaves remainder ${1000 % L}.`, `1000 ÷ ${L}-এর ভাগশেষ ${1000 % L}।`), T(`Answer = 1000 + (${L} − ${1000 % L}) = ${ans}.`, `উত্তর = 1000 + (${L} − ${1000 % L}) = ${ans}।`)],
      shortcut: great ? T('Greatest n-digit multiple = largest n-digit number − (its remainder by the LCM).', 'বৃহত্তম n-অঙ্কের গুণিতক = বৃহত্তম n-অঙ্কের সংখ্যা − (লসাগু দিয়ে ভাগশেষ)।') : T('Least n-digit multiple = smallest n-digit number + (LCM − remainder).', 'ক্ষুদ্রতম n-অঙ্কের গুণিতক = ক্ষুদ্রতম n-অঙ্কের সংখ্যা + (লসাগু − ভাগশেষ)।'),
    });
  }
  const o = opts(L, [
    [lcm2(ds[0], ds[1]), `That is the LCM of ${ds[0]} and ${ds[1]} only; ${ds[2]} does not divide it.`, `এটি শুধু ${ds[0]} ও ${ds[1]}-এর লসাগু; ${ds[2]} দিয়ে এটি বিভাজ্য নয়।`],
    [ds[0] * ds[1] * ds[2], 'The product is a common multiple, but not the least.', 'গুণফলটি একটি সাধারণ গুণিতক, কিন্তু ক্ষুদ্রতম নয়।'],
  ].filter(([v]) => v % ds[2] !== 0 || v === ds[0] * ds[1] * ds[2]));
  return build({
    ...base('lcm_exactly_divisible', ['lcm', 'plain'], 2, 45),
    stem: T(`Find the least number which is exactly divisible by ${list(ds).en}.`, `${list(ds).bn} দিয়ে নিঃশেষে বিভাজ্য ক্ষুদ্রতম সংখ্যাটি নির্ণয় করো।`),
    ...o,
    steps: [
      T(`Least number exactly divisible by all = LCM of ${ds.join(', ')}.`, `সবকটি দিয়ে নিঃশেষে বিভাজ্য ক্ষুদ্রতম সংখ্যা = ${ds.join(', ')}-এর লসাগু।`),
      T(`LCM = ${L}.`, `লসাগু = ${L}।`),
    ],
    shortcut: T('“Least” + “exactly divisible” = LCM; take the highest power of each prime.', '“ক্ষুদ্রতম” + “নিঃশেষে বিভাজ্য” = লসাগু; প্রতিটি মৌলিকের সর্বোচ্চ ঘাত নাও।'),
  });
}

// ---------------------------------------------------------------- remainder_by_factor

const REM_WORDINGS = [
  (D, R, d) => T(`When a number is divided by ${D} it leaves a remainder ${R}. When it is divided by ${d}, the remainder will be`, `একটি সংখ্যাকে ${D} দিয়ে ভাগ করলে ভাগশেষ ${R} থাকে। সংখ্যাটিকে ${d} দিয়ে ভাগ করলে ভাগশেষ কত হবে?`),
  (D, R, d) => T(`A number when divided by ${D} leaves remainder ${R}. The same number when divided by ${d} will leave remainder`, `একটি সংখ্যাকে ${D} দিয়ে ভাগ করলে ${R} অবশিষ্ট থাকে। ওই সংখ্যাকেই ${d} দিয়ে ভাগ করলে অবশিষ্ট কত থাকবে?`),
  (D, R, d) => T(`A certain number when divided by ${D} leaves remainder ${R}. When the same number is divided by ${d}, the remainder is`, `একটি নির্দিষ্ট সংখ্যাকে ${D} দিয়ে ভাগ করলে ভাগশেষ ${R}। একই সংখ্যাকে ${d} দিয়ে ভাগ করলে ভাগশেষ কত?`),
];

function remainderByFactor(wording = pick(REM_WORDINGS)) {
  const d = ri(4, 30);
  const m = ri(2, 9);
  const D = d * m;
  if (D > 300) return null;
  const R = ri(d + 1, D - 1);
  const ans = R % d;
  if (ans === 0) return null;
  const o = opts(ans, [
    [R, `${R} is bigger than ${d}, so it cannot be the remainder; divide it by ${d} again.`, `${R} সংখ্যাটি ${d}-এর চেয়ে বড়ো, তাই এটি ভাগশেষ হতে পারে না; একে আবার ${d} দিয়ে ভাগ করো।`],
    [R % m === ans ? null : R % m, `${m} is the quotient ${D} ÷ ${d}; the remainder must be taken by ${d}.`, `${m} হল ${D} ÷ ${d}-এর ভাগফল; ভাগশেষ ${d} দিয়েই নিতে হবে।`],
    [d - ans, `That is what must be ADDED to reach the next multiple of ${d}, not the remainder.`, `এটি ${d}-এর পরের গুণিতকে পৌঁছতে যত যোগ করতে হয়, ভাগশেষ নয়।`],
  ]);
  return build({
    ...base('remainder_by_factor', ['remainder'], 2, 40),
    stem: wording(D, R, d), ...o,
    steps: [
      T(`Write the number as ${D}k + ${R}.`, `সংখ্যাটিকে ${D}k + ${R} লেখো।`),
      T(`${D} = ${d} × ${m}, so ${D}k is exactly divisible by ${d}.`, `${D} = ${d} × ${m}, তাই ${D}k, ${d} দিয়ে নিঃশেষে বিভাজ্য।`),
      T(`${R} = ${d} × ${Math.floor(R / d)} + ${ans}, so the remainder is ${ans}.`, `${R} = ${d} × ${Math.floor(R / d)} + ${ans}, তাই ভাগশেষ ${ans}।`),
    ],
    shortcut: T('When the new divisor is a factor of the old one, just divide the old remainder by it.', 'নতুন ভাজক পুরোনো ভাজকের উৎপাদক হলে শুধু পুরোনো ভাগশেষকে নতুন ভাজক দিয়ে ভাগ করো।'),
  });
}

// ---------------------------------------------------------------- fraction_decimal_compare

const CMP_KINDS = ['order_decimals', 'fractions_max', 'fractions_min', 'mixed_max', 'mixed_min'];

/** Value of a displayed item: "5/9", "0.46", "(0.8)²", "√(25/49)", "2.02". */
function itemValue(s) {
  let m;
  if ((m = /^\(([\d.]+)\)²$/.exec(s))) return Number(m[1]) ** 2;
  if ((m = /^√\((\d+)\/(\d+)\)$/.exec(s))) return Math.sqrt(Number(m[1]) / Number(m[2]));
  if ((m = /^(\d+)\/(\d+)$/.exec(s))) return Number(m[1]) / Number(m[2]);
  return Number(s);
}

function fractionDecimalCompare(kind = pick(CMP_KINDS)) {
  if (kind === 'order_decimals') {
    const w = ri(1, 9);
    const e = ri(1, 9);
    const pool = [`${w}.${e}`, `${w}.0${e}`, `${w}.00${e}`, `${w}.${e}${e}`, `${w}.${e}${e}${e}`, `${w}.${e}0${e}`, `${w}.0${e}${e}`];
    const items = sample(pool, 4);
    const asc = ri(0, 2) > 0;
    const sign = asc ? ' < ' : ' > ';
    const order = (arr) => T(arr.join(sign), arr.join(sign));
    const sorted = [...items].sort((x, y) => (asc ? Number(x) - Number(y) : Number(y) - Number(x)));
    const byLength = [...items].sort((x, y) => (asc ? x.length - y.length || Number(x) - Number(y) : y.length - x.length || Number(y) - Number(x)));
    const reversed = [...sorted].reverse();
    const o = textOpts(order(sorted), [
      { ...order(byLength), trap: T('More decimal places does not mean a bigger number: compare place by place (tenths first).', 'বেশি দশমিক স্থান মানেই বড়ো সংখ্যা নয়: স্থান ধরে তুলনা করো (আগে দশাংশ)।') },
      { ...order(reversed), trap: T(asc ? 'This order runs from largest to smallest, but its signs say “<”.' : 'This order runs from smallest to largest, but its signs say “>”.', asc ? 'এই ক্রম বড়ো থেকে ছোটো, অথচ চিহ্ন “<”।' : 'এই ক্রম ছোটো থেকে বড়ো, অথচ চিহ্ন “>”।') },
      order(shuffle(items)),
      order(shuffle(items)),
      order(shuffle(items)),
    ]);
    if (!o) return null;
    const shown = shuffle(items);
    return build({
      ...base('fraction_decimal_compare', ['decimals', 'ordering'], 2, 45),
      stem: T(`Which of the following is the correct ${asc ? 'ascending' : 'descending'} order of ${list(shown).en}?`, `${list(shown).bn}-এর সঠিক ${asc ? 'ঊর্ধ্বক্রম (ছোটো থেকে বড়ো)' : 'অধঃক্রম (বড়ো থেকে ছোটো)'} কোনটি?`),
      ...o,
      steps: [
        T(`Write all with the same number of decimal places: ${items.map((x) => `${x} = ${Number(x).toFixed(3)}`).join(', ')}.`, `সবকটি সমান দশমিক স্থানে লেখো: ${items.map((x) => `${x} = ${Number(x).toFixed(3)}`).join(', ')}।`),
        T(`Now compare them as whole numbers of thousandths: ${sorted.join(sign)}.`, `এবার হাজারতম অংশ হিসেবে পূর্ণসংখ্যার মতো তুলনা করো: ${sorted.join(sign)}।`),
      ],
      shortcut: T('Pad with zeros to equal length, then compare like whole numbers.', 'শূন্য বসিয়ে সমান দৈর্ঘ্য করো, তারপর পূর্ণসংখ্যার মতো তুলনা করো।'),
    });
  }

  let items;
  if (kind.startsWith('fractions')) {
    items = [];
    for (let i = 0; i < 4; i++) {
      const d = ri(3, 15);
      const n = ri(1, d - 1);
      if (gcd(n, d) !== 1) return null;
      items.push(`${n}/${d}`);
    }
  } else {
    const p = ri(2, 11);
    const q = ri(p + 1, 13);
    const a = ri(1, 8);
    const b = ri(a + 1, 9);
    if (gcd(p, q) !== 1 || gcd(a, b) !== 1) return null;
    items = [`${p}/${q}`, `0.${ri(11, 89)}`, `(0.${ri(2, 9)})²`, `√(${a * a}/${b * b})`];
  }
  const vals = items.map(itemValue);
  const sortedVals = [...vals].sort((x, y) => x - y);
  for (let i = 1; i < 4; i++) if (sortedVals[i] - sortedVals[i - 1] < 0.015) return null;
  if (new Set(items).size < 4) return null;
  const max = kind.endsWith('max');
  const best = vals.indexOf(max ? sortedVals[3] : sortedVals[0]);
  const show = (s) => T(s, s);
  const approx = (s) => { const v = itemValue(s); return Math.abs(v * 1000 - Math.round(v * 1000)) < 1e-9 ? `${s} = ${Number(v.toFixed(3))}` : `${s} ≈ ${v.toFixed(3)}`; };
  const noteFor = (s) => {
    if (/²$/.test(s)) return T(`${s} = ${itemValue(s).toFixed(2)}: squaring a decimal below 1 makes it SMALLER.`, `${s} = ${itemValue(s).toFixed(2)}: 1-এর কম দশমিকের বর্গ করলে মান কমে যায়।`);
    if (/^√/.test(s)) return T(`${s} is exactly ${s.slice(2, -1).split('/').map((x) => Math.sqrt(Number(x))).join('/')} ≈ ${itemValue(s).toFixed(2)}.`, `${s} ঠিক ${s.slice(2, -1).split('/').map((x) => Math.sqrt(Number(x))).join('/')} ≈ ${itemValue(s).toFixed(2)}।`);
    if (/\//.test(s)) return T(`${s} ≈ ${itemValue(s).toFixed(2)} — a big numerator or denominator alone decides nothing.`, `${s} ≈ ${itemValue(s).toFixed(2)} — শুধু বড়ো লব বা হর দেখে কিছু বলা যায় না।`);
    return T(`${s} is ${max ? 'not the largest' : 'not the smallest'} once all are written as decimals.`, `সবকটি দশমিকে লিখলে ${s} ${max ? 'বৃহত্তম' : 'ক্ষুদ্রতম'} নয়।`);
  };
  const wrong = items.filter((_, i) => i !== best).map((s) => ({ ...show(s), trap: noteFor(s) }));
  const o = { correct: show(items[best]), wrong };
  const asked = max ? T('greatest', 'বৃহত্তম') : T('smallest', 'ক্ষুদ্রতম');
  const isMixed = kind.startsWith('mixed');
  return build({
    ...base('fraction_decimal_compare', [isMixed ? 'mixed_forms' : 'fractions', max ? 'max' : 'min'], isMixed ? 3 : 2, isMixed ? 60 : 50),
    stem: T(`Which is the ${asked.en} among ${list(items).en}?`, `${list(items).bn}-এর মধ্যে ${asked.bn} কোনটি?`),
    ...o,
    steps: [
      T(`Convert each to a decimal: ${items.map(approx).join(', ')}.`, `প্রতিটিকে দশমিকে লেখো: ${items.map(approx).join(', ')}।`),
      T(`Compare: the ${asked.en} is ${items[best]}.`, `তুলনা করো: ${asked.bn} হল ${items[best]}।`),
    ],
    shortcut: isMixed
      ? T('Bring everything to one form (two decimal places is enough): (0.x)² shrinks, √(a²/b²) is just a/b.', 'সবকিছু একই রূপে আনো (দুই দশমিক স্থানই যথেষ্ট): (0.x)² ছোটো হয়, √(a²/b²) মানে শুধু a/b।')
      : T('Cross-multiply pairs (a/b > c/d when ad > bc), or turn each into a decimal.', 'জোড়ায় জোড়ায় আড়াআড়ি গুণ করো (ad > bc হলে a/b > c/d), অথবা প্রতিটিকে দশমিকে লেখো।'),
  });
}

// ---------------------------------------------------------------- digit_reverse_sum_diff

const DIGIT_KINDS = ['increase', 'decrease', 'interchange'];

function digitReverseSumDiff(kind = pick(DIGIT_KINDS)) {
  const t = ri(1, 9);
  const u = ri(1, 9);
  if (t === u) return null;
  if ((kind === 'increase') !== (u > t)) return null;
  const N = 10 * t + u;
  const Rv = 10 * u + t;
  const s = t + u;
  const D = 9 * Math.abs(t - u);
  const alt = ri(0, 1) === 1;
  const stem = alt ? {
    increase: T(`A two-digit number has digits adding up to ${s}. The number formed by reversing its digits is ${D} more than the original number. What is the original number?`, `দুই অঙ্কের একটি সংখ্যার অঙ্ক দুটির যোগফল ${s}। অঙ্ক দুটি উল্টে যে সংখ্যা হয় তা আসল সংখ্যার চেয়ে ${D} বেশি। আসল সংখ্যাটি কত?`),
    decrease: T(`A two-digit number has digits adding up to ${s}. The number formed by reversing its digits is ${D} less than the original number. What is the original number?`, `দুই অঙ্কের একটি সংখ্যার অঙ্ক দুটির যোগফল ${s}। অঙ্ক দুটি উল্টে যে সংখ্যা হয় তা আসল সংখ্যার চেয়ে ${D} কম। আসল সংখ্যাটি কত?`),
    interchange: T(`In a two-digit number the tens digit is larger than the units digit, and the two digits add up to ${s}. Interchanging the digits makes the number ${D} smaller. What is the number?`, `দুই অঙ্কের একটি সংখ্যার দশকের অঙ্ক এককের অঙ্কের চেয়ে বড়ো, আর অঙ্ক দুটির যোগফল ${s}। অঙ্ক দুটি স্থান বদল করলে সংখ্যাটি ${D} ছোটো হয়ে যায়। সংখ্যাটি কত?`),
  }[kind] : {
    increase: T(`The sum of the digits of a two-digit number is ${s}. If the digits are reversed, the number increases by ${D}. Find the number.`, `দুই অঙ্কের একটি সংখ্যার অঙ্ক দুটির যোগফল ${s}। অঙ্ক দুটি উল্টে দিলে সংখ্যাটি ${D} বেড়ে যায়। সংখ্যাটি কত?`),
    decrease: T(`The sum of the digits of a two-digit number is ${s}. If the digits are reversed, the number decreases by ${D}. Find the number.`, `দুই অঙ্কের একটি সংখ্যার অঙ্ক দুটির যোগফল ${s}। অঙ্ক দুটি উল্টে দিলে সংখ্যাটি ${D} কমে যায়। সংখ্যাটি কত?`),
    interchange: T(`The sum of the units digit and the tens digit of a number is ${s}. After interchanging the digits, the difference between the earlier number and the present number is ${D}, the earlier number being the larger. What is the number?`, `একটি সংখ্যার একক ও দশকের অঙ্কের যোগফল ${s}। অঙ্ক দুটি স্থান বদল করলে আগের ও এখনকার সংখ্যার অন্তর ${D}, আগের সংখ্যাটি বড়ো। সংখ্যাটি কত?`),
  }[kind];
  // same digit sum, wrong difference
  const near = t > u ? (u > 1 ? 10 * (t + 1) + (u - 1) : 10 * (t - 1) + (u + 1)) : (t > 1 ? 10 * (t - 1) + (u + 1) : 10 * (t + 1) + (u - 1));
  const hints = [
    [Rv, `That is the number AFTER reversing; ${kind === 'increase' ? 'the original must be the smaller one' : 'the original must be the larger one'}.`, `এটি উল্টানোর পরের সংখ্যা; ${kind === 'increase' ? 'আসল সংখ্যাটি ছোটোটি হবে' : 'আসল সংখ্যাটি বড়োটি হবে'}।`],
    [near >= 10 && near <= 99 && near % 10 !== Math.floor(near / 10) && Math.abs(near - (10 * (near % 10) + Math.floor(near / 10))) !== D ? near : null, `Its digits add to ${s}, but reversing changes it by ${Math.abs(near - (10 * (near % 10) + Math.floor(near / 10)))}, not ${D}.`, `এর অঙ্কের যোগফল ${s}, কিন্তু উল্টালে পরিবর্তন হয় ${Math.abs(near - (10 * (near % 10) + Math.floor(near / 10)))}, ${D} নয়।`],
  ];
  // Fillers stay two-digit numbers with different digits (no 125 for a two-digit answer).
  const seen = new Set([N]);
  const wrong = [];
  for (const [v, en, bn] of hints) {
    if (!Number.isInteger(v) || seen.has(v)) continue;
    seen.add(v);
    wrong.push({ ...plain(v), trap: T(en, bn) });
  }
  for (const v of shuffle([N + 9, N - 9, N + 18, N - 18, N + 11, N - 11, N + 1, N - 1, N + 10, N - 10])) {
    if (wrong.length >= 3) break;
    if (v < 12 || v > 98 || v % 10 === 0 || v % 10 === Math.floor(v / 10) || seen.has(v)) continue;
    seen.add(v);
    wrong.push(plain(v));
  }
  if (wrong.length < 3) return null;
  const o = { correct: plain(N), wrong };
  return build({
    ...base('digit_reverse_sum_diff', ['digits', kind], 2, 60),
    stem, ...o,
    steps: [
      T(`Let the tens digit be x and the units digit y: x + y = ${s}.`, `দশকের অঙ্ক x ও এককের অঙ্ক y ধরো: x + y = ${s}।`),
      T(`Reversing changes the number by 9 × (difference of digits): 9|x − y| = ${D}, so |x − y| = ${D / 9}; the ${kind === 'increase' ? 'units' : 'tens'} digit is the larger.`, `উল্টালে সংখ্যা বদলায় 9 × (অঙ্কের অন্তর): 9|x − y| = ${D}, তাই |x − y| = ${D / 9}; ${kind === 'increase' ? 'একক' : 'দশক'}-এর অঙ্কটি বড়ো।`),
      T(`x = ${t}, y = ${u}, so the number is ${N} (check: ${Math.max(N, Rv)} − ${Math.min(N, Rv)} = ${D}).`, `x = ${t}, y = ${u}, তাই সংখ্যাটি ${N} (যাচাই: ${Math.max(N, Rv)} − ${Math.min(N, Rv)} = ${D})।`),
    ],
    shortcut: T('Difference of digits = change ÷ 9; then the two digits come from their sum and difference.', 'অঙ্কের অন্তর = পরিবর্তন ÷ 9; তারপর যোগফল ও অন্তর থেকে অঙ্ক দুটি বের করো।'),
  });
}

module.exports = {
  subject: 'quant',
  topics: [{
    topic: 'number_system',
    weight: 1,
    gens: [
      ...HCF_REM_KINDS.map((k) => () => hcfWithRemainders(k)),
      ...LCM_REM_KINDS.map((k) => () => lcmWithSameRemainder(k)),
      ...FRAC_KINDS.map((k) => () => hcfLcmOfFractions(k)),
      ...['numbers', 'lcm', 'sum'].map((k) => () => ratioHcfFindNumbers(k)),
      ...LCM_EXACT_KINDS.map((k) => () => lcmExactlyDivisible(k)),
      ...PRODUCT_KINDS.map((k) => () => hcfLcmProduct(k)),
      () => remainderByFactor(),
      ...CMP_KINDS.map((k) => () => fractionDecimalCompare(k)),
      ...DIGIT_KINDS.map((k) => () => digitReverseSumDiff(k)),
    ],
  }],
  hcfWithRemainders,
  lcmWithSameRemainder,
  hcfLcmOfFractions,
  ratioHcfFindNumbers,
  lcmExactlyDivisible,
  hcfLcmProduct,
  remainderByFactor,
  fractionDecimalCompare,
  digitReverseSumDiff,
  HCF_REM_KINDS,
  LCM_REM_KINDS,
  FRAC_KINDS,
  LCM_EXACT_KINDS,
  PRODUCT_KINDS,
  CMP_KINDS,
  DIGIT_KINDS,
  itemValue,
};
