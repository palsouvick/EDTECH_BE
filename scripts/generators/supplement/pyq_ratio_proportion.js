'use strict';

/**
 * Ratio & Proportion: standard-level practice for the question types seen in
 * WBPSC-family PYQs that had no exam-level practice in the general pool (the Hard
 * bank's r_* questions serve Advanced quizzes only). One generator per pattern of
 * db/patterns/quant/ratio_proportion.js; subtopic = pattern = the pattern key.
 * PYQ -> pattern map: db/patterns/pyq_map/quant/ratio_proportion.json.
 *
 *   equal_parts_ratio         x% of A = y% of B, 1/2 of A = 5/6 of B, P is 60% more than Q ...
 *   fraction_ratio            ratio written as 1/a : 1/b : 1/c (sides, shares, least total)
 *   add_component_new_ratio   add one metal / liquid / group to reach a new ratio
 *   variation_direct_inverse  provisions for men and days, parts per worker, yield ∝ area
 *   transfer_ratio            one gives the other to equalise / reach a ratio; k more pass
 *   mean_proportional         between two numbers or fractions; continued-proportion product
 *   coins_value_ratio         equal numbers of coins, or coins in a count ratio, with a total value
 *   income_expenditure        incomes and expenditures in ratios, equal savings
 *
 * All answers are exact integers, reduced ratios or simple fractions.
 */

const { ri, pick, shuffle, gcd, T, names, build } = require('../common');

const TOPIC = 'ratio_proportion';

// ── helpers ──────────────────────────────────────────────────────────────────
const lcm = (a, b) => (a / gcd(a, b)) * b;
function R(n, d = 1) {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(Math.abs(n), d) || 1;
  return [n / g, d / g];
}
const fracText = ([n, d]) => (d === 1 ? String(n) : `${n}/${d}`);
/** Integers -> reduced "a : b : c". */
function ratio(...xs) {
  const g = xs.reduce((acc, x) => gcd(acc, x), 0) || 1;
  const s = xs.map((x) => x / g).join(' : ');
  return T(s, s);
}
/** Reciprocals of fractions [n, d] as a reduced integer ratio (quantity ∝ 1 / part). */
function recipInts(fs) {
  const L = fs.reduce((acc, [n]) => lcm(acc, n), 1);
  return fs.map(([n, d]) => (d * L) / n);
}
const isInt = (v) => Number.isInteger(v) && v > 0;
const plain = (v, enUnit = '', bnUnit = '') => T(`${v}${enUnit}`, `${v}${bnUnit}`);
const rupees = (v) => T(`₹${v}`, `₹${v}`);

function choose(correct, traps, fillers) {
  const seen = new Set([correct.en]);
  const wrong = [];
  const put = (o) => {
    if (!o || !o.en || seen.has(o.en) || wrong.length >= 3) return;
    seen.add(o.en);
    wrong.push(o);
  };
  traps.forEach(put);
  shuffle(fillers).forEach(put);
  return wrong.length === 3 && wrong.some((w) => w.trap) ? { correct, wrong } : null;
}
const trapped = (opt, en, bn) => ({ ...opt, trap: T(en, bn) });
/** Plausible wrong ratios near [x, y, ...]. */
function ratioFillers(xs) {
  const out = [];
  for (let i = 0; i < xs.length; i++) {
    for (const k of [1, -1, 2]) {
      const ys = xs.slice();
      ys[i] += k;
      if (ys.every((v) => v > 0)) out.push(ratio(...ys));
    }
  }
  if (xs.length === 2) out.push(ratio(xs[0] + xs[1], xs[1]), ratio(xs[0], xs[0] + xs[1]));
  else out.push(ratio(...xs.slice().reverse()), ratio(...shuffle(xs)));
  return out;
}
const numFillers = (ans, step, unit = ['', '']) => [1, -1, 2, -2, 3].map((k) => ans + k * step).filter((v) => v > 0).map((v) => plain(v, ...unit));

/** A fraction [n, d] shown as a percentage, decimal or fraction. */
function showPart([n, d], mode) {
  if (mode === 'pct' && (100 * n) % d === 0) return `${(100 * n) / d}%`;
  if (mode === 'dec' && (100 * n) % d === 0 && n < d) {
    const v = (100 * n) / d;
    return `0.${String(v).padStart(2, '0').replace(/0$/, '')}`;
  }
  return `${n}/${d}`;
}

// ── 1. equal_parts_ratio ─────────────────────────────────────────────────────
const PCTS = [10, 15, 20, 25, 30, 40, 45, 50, 60, 70, 75, 80, 90];
const FRACS = [[1, 2], [2, 3], [3, 4], [1, 3], [1, 4], [2, 5], [3, 5], [4, 5], [5, 6], [1, 5], [3, 8], [5, 8], [1, 6], [4, 7]];

function equalPartsRatio(kind = pick(['pct2', 'frac2', 'three', 'sum2', 'share3', 'greater'])) {
  const [X, Y, Z] = names(3);
  let stem;
  let options;
  let steps;
  const ratioShortcut = T('Write each quantity as (common value) ÷ (its fraction) — the bigger fraction belongs to the smaller quantity.', 'প্রতিটি রাশি = (সাধারণ মান) ÷ (তার ভগ্নাংশ) — বড় ভগ্নাংশ মানে ছোট রাশি।');
  if (kind === 'pct2' || kind === 'frac2') {
    let fa;
    let fb;
    let sa;
    let sb;
    if (kind === 'pct2') {
      const [p, q] = shuffle(PCTS).slice(0, 2);
      fa = R(p, 100);
      fb = R(q, 100);
      sa = `${p}%`;
      sb = `${q}%`;
    } else {
      [fa, fb] = shuffle(FRACS).slice(0, 2);
      sa = showPart(fa, pick(['frac', 'frac', 'pct']));
      sb = showPart(fb, pick(['frac', 'pct']));
    }
    const [u, v] = recipInts([fa, fb]);
    const ans = ratio(u, v);
    if (ans.en.split(' : ').some((x) => Number(x) > 30)) return null;
    stem = pick([
      T(`If ${sa} of A is equal to ${sb} of B, then A : B is`, `A-এর ${sa} যদি B-এর ${sb}-এর সমান হয়, তবে A : B কত?`),
      T(`${sa} of a number is equal to ${sb} of another number. What is the ratio of the first number to the second?`, `একটি সংখ্যার ${sa} অন্য একটি সংখ্যার ${sb}-এর সমান। প্রথম ও দ্বিতীয় সংখ্যার অনুপাত কত?`),
    ]);
    options = choose(ans, [trapped(ratio(v, u), 'The ratio is inverted: the quantity taken with the smaller fraction is the larger one.', 'অনুপাত উল্টে গেছে: যে রাশির ছোট ভগ্নাংশ নেওয়া হয়েছে, সেটিই বড়।')], ratioFillers(ans.en.split(' : ').map(Number)));
    steps = [
      T(`${sa} × A = ${sb} × B, so A/B = (${fracText(fb)}) ÷ (${fracText(fa)}).`, `${sa} × A = ${sb} × B, তাই A/B = (${fracText(fb)}) ÷ (${fracText(fa)})।`),
      T(`A : B = ${ans.en}.`, `তাই A : B = ${ans.bn}।`),
    ];
  } else if (kind === 'three') {
    const fs = shuffle(FRACS.filter(([n, d]) => (100 * n) % d === 0)).slice(0, 3);
    const modes = shuffle(['pct', 'dec', 'frac']);
    const shown = fs.map((f, i) => showPart(f, modes[i]));
    const ints = recipInts(fs);
    if (Math.max(...ints) / ints.reduce((a, b) => gcd(a, b), 0) > 40) return null;
    const ans = ratio(...ints);
    const direct = recipInts(fs.map(([n, d]) => [d, n]));
    stem = T(`If ${shown[0]} of P = ${shown[1]} of Q = ${shown[2]} of R, then P : Q : R is`, `P-এর ${shown[0]} = Q-এর ${shown[1]} = R-এর ${shown[2]} হলে P : Q : R কত?`);
    options = choose(ans, [trapped(ratio(...direct), 'Those are the fractions themselves in ratio; each quantity is the common value DIVIDED by its fraction.', 'এগুলি ভগ্নাংশগুলিরই অনুপাত; প্রতিটি রাশি হল সাধারণ মানকে তার ভগ্নাংশ দিয়ে ভাগ করা।')], ratioFillers(ans.en.split(' : ').map(Number)));
    steps = [
      T(`Let each be k: P = k ÷ ${fracText(fs[0])}, Q = k ÷ ${fracText(fs[1])}, R = k ÷ ${fracText(fs[2])}.`, `প্রত্যেকটি k ধরো: P = k ÷ ${fracText(fs[0])}, Q = k ÷ ${fracText(fs[1])}, R = k ÷ ${fracText(fs[2])}।`),
      T(`Clearing the fractions, P : Q : R = ${ans.en}.`, `ভগ্নাংশ সরিয়ে P : Q : R = ${ans.bn}।`),
    ];
  } else if (kind === 'sum2') {
    const [fa, fb] = shuffle(FRACS).slice(0, 2);
    const [u, v] = recipInts([fa, fb]);
    const g = gcd(u, v);
    const [uu, vv] = [u / g, v / g];
    if (uu + vv > 25) return null;
    const k = ri(2, 12) * pick([1, 2, 5]);
    const total = k * (uu + vv);
    const askB = pick([true, false]);
    const ans = askB ? k * vv : k * uu;
    const wrongShare = askB ? k * uu : k * vv;
    stem = T(`The sum of the weights of ${X.en} and ${Y.en} is ${total} kg. ${fracText(fa)} of ${X.en}'s weight is equal to ${fracText(fb)} of ${Y.en}'s weight. Find the weight of ${askB ? Y.en : X.en}.`,
      `${X.bn} ও ${Y.bn}-এর ওজনের যোগফল ${total} কেজি। ${X.bn}-এর ওজনের ${fracText(fa)} অংশ ${Y.bn}-এর ওজনের ${fracText(fb)} অংশের সমান। ${askB ? Y.bn : X.bn}-এর ওজন কত?`);
    const traps = [trapped(plain(wrongShare, ' kg', ' কেজি'), 'The ratio was used upside down: the person whose smaller fraction is taken is the heavier one.', 'অনুপাত উল্টো ব্যবহার হয়েছে: যার ছোট ভগ্নাংশ নেওয়া হয়েছে, তিনিই বেশি ভারী।')];
    if (total % 2 === 0) traps.push(trapped(plain(total / 2, ' kg', ' কেজি'), 'Equal fractions do not mean equal weights.', 'ভগ্নাংশ সমান হলেই ওজন সমান হয় না।'));
    options = choose(plain(ans, ' kg', ' কেজি'), traps, numFillers(ans, pick([2, 5]), [' kg', ' কেজি']));
    steps = [
      T(`${fracText(fa)} × ${X.en} = ${fracText(fb)} × ${Y.en}, so ${X.en} : ${Y.en} = ${uu} : ${vv}.`, `${fracText(fa)} × ${X.bn} = ${fracText(fb)} × ${Y.bn}, তাই ${X.bn} : ${Y.bn} = ${uu} : ${vv}।`),
      T(`1 part = ${total} ÷ ${uu + vv} = ${k} kg, so ${askB ? Y.en : X.en} weighs ${askB ? vv : uu} × ${k} = ${ans} kg.`, `1 ভাগ = ${total} ÷ ${uu + vv} = ${k} কেজি, তাই ${askB ? Y.bn : X.bn}-এর ওজন ${askB ? vv : uu} × ${k} = ${ans} কেজি।`),
    ];
  } else if (kind === 'share3') {
    const dens = shuffle([2, 3, 4, 5, 6, 7, 8]).slice(0, 3);
    const times = pick([true, false]);
    // "1/a of X's share = ..." -> shares ∝ a : b : c; "a times X's share = ..." -> shares ∝ 1/a : 1/b : 1/c.
    const parts = times ? recipInts(dens.map((d) => [d, 1])) : dens.slice();
    const g = parts.reduce((a, b) => gcd(a, b), 0);
    const p = parts.map((x) => x / g);
    const sum = p.reduce((a, b) => a + b, 0);
    if (sum > 60) return null;
    const unit = pick([100, 200, 250, 500, 1000, 1500, 2000, 5000]);
    const total = unit * sum;
    const who = ri(0, 2);
    const people = [X, Y, Z];
    const ans = p[who] * unit;
    const other = times ? dens.slice() : recipInts(dens.map((d) => [d, 1]));
    const og = other.reduce((a, b) => gcd(a, b), 0);
    const osum = other.reduce((a, b) => a + b, 0) / og;
    const wrong = (total * (other[who] / og)) / osum;
    stem = times
      ? T(`₹${total} is divided among ${X.en}, ${Y.en} and ${Z.en} so that ${dens[0]} times ${X.en}'s share, ${dens[1]} times ${Y.en}'s share and ${dens[2]} times ${Z.en}'s share are all equal. Find ${people[who].en}'s share.`,
        `₹${total} ${X.bn}, ${Y.bn} ও ${Z.bn}-এর মধ্যে এমনভাবে ভাগ করা হল যে ${X.bn}-এর ভাগের ${dens[0]} গুণ, ${Y.bn}-এর ভাগের ${dens[1]} গুণ ও ${Z.bn}-এর ভাগের ${dens[2]} গুণ সমান। ${people[who].bn}-এর ভাগ কত?`)
      : T(`A man distributes ₹${total} among ${X.en}, ${Y.en} and ${Z.en} in such a manner that 1/${dens[0]} of ${X.en}'s share, 1/${dens[1]} of ${Y.en}'s share and 1/${dens[2]} of ${Z.en}'s share are equal. Find ${people[who].en}'s share.`,
        `একজন ব্যক্তি ₹${total} ${X.bn}, ${Y.bn} ও ${Z.bn}-এর মধ্যে এমনভাবে ভাগ করলেন যে ${X.bn}-এর ভাগের 1/${dens[0]}, ${Y.bn}-এর ভাগের 1/${dens[1]} ও ${Z.bn}-এর ভাগের 1/${dens[2]} সমান। ${people[who].bn}-এর ভাগ কত?`);
    const traps = [];
    if (isInt(wrong)) traps.push(trapped(rupees(wrong), times ? `"${dens[0]} times the share is equal" makes the shares ∝ 1/${dens[0]} : 1/${dens[1]} : 1/${dens[2]}, not ${dens.join(' : ')}.` : `"1/${dens[0]} of the share is equal" makes the shares ∝ ${dens.join(' : ')}, not their reciprocals.`, times ? `"ভাগের ${dens[0]} গুণ সমান" মানে ভাগগুলি ∝ 1/${dens[0]} : 1/${dens[1]} : 1/${dens[2]}, ${dens.join(' : ')} নয়।` : `"ভাগের 1/${dens[0]} সমান" মানে ভাগগুলি ∝ ${dens.join(' : ')}, তাদের অন্যোন্যক নয়।`));
    const nb = p[(who + 1) % 3] * unit;
    traps.push(trapped(rupees(nb), `That is ${people[(who + 1) % 3].en}'s share.`, `এটি ${people[(who + 1) % 3].bn}-এর ভাগ।`));
    options = choose(rupees(ans), traps, numFillers(ans, unit).map((o) => rupees(Number(o.en))));
    steps = [
      times
        ? T(`${dens[0]}·${X.en} = ${dens[1]}·${Y.en} = ${dens[2]}·${Z.en} = k gives shares k/${dens[0]}, k/${dens[1]}, k/${dens[2]}, i.e. ${p.join(' : ')}.`, `${dens[0]}·${X.bn} = ${dens[1]}·${Y.bn} = ${dens[2]}·${Z.bn} = k ধরলে ভাগ k/${dens[0]}, k/${dens[1]}, k/${dens[2]}, অর্থাৎ ${p.join(' : ')}।`)
        : T(`Each equal part = k gives shares ${dens[0]}k, ${dens[1]}k, ${dens[2]}k, i.e. ${p.join(' : ')}.`, `প্রতিটি সমান অংশ = k ধরলে ভাগ ${dens[0]}k, ${dens[1]}k, ${dens[2]}k, অর্থাৎ ${p.join(' : ')}।`),
      T(`1 part = ${total} ÷ ${sum} = ₹${unit}, so ${people[who].en} gets ${p[who]} × ${unit} = ₹${ans}.`, `1 ভাগ = ${total} ÷ ${sum} = ₹${unit}, তাই ${people[who].bn} পান ${p[who]} × ${unit} = ₹${ans}।`),
    ];
  } else {
    const [a, b] = shuffle([10, 20, 25, 30, 40, 50, 60, 75, 80]).slice(0, 2);
    const ans = ratio(100 + b, 100 + a);
    if (ans.en.split(' : ').some((x) => Number(x) > 40)) return null;
    stem = T(`P is greater than Q by ${a}% and greater than R by ${b}%. What is the ratio of Q to R?`, `P, Q-এর চেয়ে ${a}% বেশি এবং R-এর চেয়ে ${b}% বেশি। Q ও R-এর অনুপাত কত?`);
    options = choose(ans, [trapped(ratio(100 + a, 100 + b), `Inverted: ${100 + a} × Q = ${100 + b} × R, so Q : R = ${100 + b} : ${100 + a}, not the other way round.`, `উল্টে গেছে: P = Q-এর ${100 + a}% = R-এর ${100 + b}%, তাই Q : R = ${100 + b} : ${100 + a}।`), trapped(ratio(b, a), 'The percentages alone do not give the ratio; use 100 + each percentage.', 'শুধু শতাংশগুলি অনুপাত দেয় না; প্রতিটির সঙ্গে 100 যোগ করে নাও।')], ratioFillers(ans.en.split(' : ').map(Number)));
    steps = [
      T(`P = ${100 + a}% of Q and P = ${100 + b}% of R, so ${100 + a} × Q = ${100 + b} × R.`, `P = Q-এর ${100 + a}% এবং P = R-এর ${100 + b}%, তাই ${100 + a} × Q = ${100 + b} × R।`),
      T(`Q : R = ${100 + b} : ${100 + a} = ${ans.en}.`, `তাই Q : R = ${100 + b} : ${100 + a} = ${ans.bn}।`),
    ];
  }
  if (!options) return null;
  return build({
    topic: TOPIC, subtopic: 'equal_parts_ratio', pattern: 'equal_parts_ratio', tags: ['ratio', 'percentage', kind],
    difficulty: kind === 'pct2' ? 2 : 3, time: kind === 'pct2' ? 45 : 75, stem, ...options, steps, shortcut: ratioShortcut,
  });
}

// ── 2. fraction_ratio ────────────────────────────────────────────────────────
const DENS = [2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 20];

function fractionRatio(kind = pick(['triangle', 'divide', 'minimum'])) {
  const count = kind === 'minimum' ? pick([3, 4]) : 3;
  const dens = shuffle(DENS).slice(0, count);
  const L = dens.reduce(lcm, 1);
  if (L > 180) return null;
  const raw = dens.map((d) => L / d);
  const g = raw.reduce((a, b) => gcd(a, b), 0);
  const ints = raw.map((x) => x / g);
  const sum = ints.reduce((a, b) => a + b, 0);
  const shown = dens.map((d) => `1/${d}`).join(' : ');
  const [X, Y, Z] = names(3);
  let stem;
  let options;
  let last;
  if (kind === 'triangle') {
    const mx = Math.max(...ints);
    if (mx >= sum - mx || sum > 40) return null; // must be a real triangle
    const k = ri(1, 8);
    const P = k * sum;
    const longest = pick([true, false]);
    const ans = k * (longest ? mx : Math.min(...ints));
    const traps = [trapped(plain(k * (longest ? Math.min(...ints) : mx), ' cm', ' সেমি'), `The largest denominator gives the ${longest ? 'SHORTEST' : 'LONGEST'} side, not the ${longest ? 'longest' : 'shortest'}.`, `সবচেয়ে বড় হর দেয় ${longest ? 'ক্ষুদ্রতম' : 'বৃহত্তম'} বাহু।`)];
    const dSum = dens.reduce((a, b) => a + b, 0);
    const naive = (P * (longest ? Math.max(...dens) : Math.min(...dens))) / dSum;
    if (isInt(naive)) traps.push(trapped(plain(naive, ' cm', ' সেমি'), 'The denominators were used as the ratio; first turn 1/a : 1/b : 1/c into whole numbers with the LCM.', 'হরগুলিকেই অনুপাত ধরা হয়েছে; আগে ল.সা.গু. দিয়ে 1/a : 1/b : 1/c-কে পূর্ণসংখ্যায় আনো।'));
    stem = T(`The sides of a triangle are in the ratio ${shown} and its perimeter is ${P} cm. Find the length of the ${longest ? 'longest' : 'shortest'} side.`,
      `একটি ত্রিভুজের বাহুগুলি ${shown} অনুপাতে এবং পরিসীমা ${P} সেমি। ${longest ? 'বৃহত্তম' : 'ক্ষুদ্রতম'} বাহুর দৈর্ঘ্য কত?`);
    options = choose(plain(ans, ' cm', ' সেমি'), traps, numFillers(ans, k, [' cm', ' সেমি']));
    last = T(`1 part = ${P} ÷ ${sum} = ${k} cm, so the ${longest ? 'longest' : 'shortest'} side = ${ans / k} × ${k} = ${ans} cm.`, `1 ভাগ = ${P} ÷ ${sum} = ${k} সেমি, তাই ${longest ? 'বৃহত্তম' : 'ক্ষুদ্রতম'} বাহু = ${ans / k} × ${k} = ${ans} সেমি।`);
  } else if (kind === 'divide') {
    if (sum > 60) return null;
    const unit = pick([5, 10, 20, 25, 30, 40, 50, 100]);
    const T0 = unit * sum;
    const who = ri(0, 2);
    const ppl = [X, Y, Z];
    const ans = ints[who] * unit;
    const dSum = dens.reduce((a, b) => a + b, 0);
    const traps = [];
    const naive = (T0 * dens[who]) / dSum;
    if (isInt(naive)) traps.push(trapped(rupees(naive), 'The denominators were used as the ratio; a bigger denominator means a SMALLER share.', 'হরগুলিকেই অনুপাত ধরা হয়েছে; বড় হর মানে ছোট ভাগ।'));
    traps.push(trapped(rupees(ints[(who + 2) % 3] * unit), `That is ${ppl[(who + 2) % 3].en}'s share.`, `এটি ${ppl[(who + 2) % 3].bn}-এর ভাগ।`));
    stem = T(`₹${T0} is divided among ${X.en}, ${Y.en} and ${Z.en} in the ratio ${shown}. How much does ${ppl[who].en} get?`,
      `₹${T0} ${X.bn}, ${Y.bn} ও ${Z.bn}-এর মধ্যে ${shown} অনুপাতে ভাগ করা হল। ${ppl[who].bn} কত পান?`);
    options = choose(rupees(ans), traps, numFillers(ans, unit).map((o) => rupees(Number(o.en))));
    last = T(`1 part = ${T0} ÷ ${sum} = ₹${unit}, so ${ppl[who].en} gets ${ints[who]} × ${unit} = ₹${ans}.`, `1 ভাগ = ${T0} ÷ ${sum} = ₹${unit}, তাই ${ppl[who].bn} পান ${ints[who]} × ${unit} = ₹${ans}।`);
  } else {
    const dSum = dens.reduce((a, b) => a + b, 0);
    const traps = [trapped(plain(dSum), 'Adding the denominators does not give shares in the stated ratio.', 'হরগুলি যোগ করলে বলা অনুপাতে ভাগ হয় না।')];
    if (g > 1) traps.push(trapped(plain(raw.reduce((a, b) => a + b, 0)), `${raw.join(' : ')} still has a common factor ${g}; the least total uses ${ints.join(' : ')}.`, `${raw.join(' : ')}-এ এখনও সাধারণ উৎপাদক ${g} আছে; ন্যূনতম মোটের জন্য ${ints.join(' : ')} নাও।`));
    traps.push(trapped(plain(L), 'The LCM only clears the fractions; the least total is the sum of the resulting terms.', 'ল.সা.গু. শুধু ভগ্নাংশ সরায়; ন্যূনতম মোট হল পাওয়া পদগুলির যোগফল।'));
    const thing = pick([T('pens', 'কলম'), T('marbles', 'মার্বেল'), T('mangoes', 'আম'), T('chocolates', 'চকোলেট')]);
    stem = T(`A person distributes ${thing.en} among ${count} friends in the ratio ${shown}. What is the minimum number of ${thing.en} he should have?`,
      `একজন ব্যক্তি ${count} বন্ধুর মধ্যে ${thing.bn} ${shown} অনুপাতে ভাগ করে দেন। তাঁর কাছে অন্তত কতগুলি ${thing.bn} থাকা দরকার?`);
    options = choose(plain(sum), traps, numFillers(sum, 1));
    last = T(`Least number = ${ints.join(' + ')} = ${sum}.`, `ন্যূনতম সংখ্যা = ${ints.join(' + ')} = ${sum}।`);
  }
  if (!options) return null;
  return build({
    topic: TOPIC, subtopic: 'fraction_ratio', pattern: 'fraction_ratio', tags: ['ratio', 'lcm', kind],
    difficulty: kind === 'minimum' ? 2 : 3, time: kind === 'minimum' ? 60 : 75, stem, ...options,
    steps: [
      T(`LCM of ${dens.join(', ')} = ${L}; multiplying, ${shown} = ${raw.join(' : ')}${g > 1 ? ` = ${ints.join(' : ')}` : ''}.`, `${dens.join(', ')}-এর ল.সা.গু. = ${L}; গুণ করে ${shown} = ${raw.join(' : ')}${g > 1 ? ` = ${ints.join(' : ')}` : ''}।`),
      last,
    ],
    shortcut: T('Multiply every term by the LCM of the denominators, cancel any common factor, then divide the total.', 'হরগুলির ল.সা.গু. দিয়ে সব পদ গুণ করো, সাধারণ উৎপাদক কাটো, তারপর মোটকে ভাগ করো।'),
  });
}

// ── 3. add_component_new_ratio ───────────────────────────────────────────────
const MIXES = [
  { a: T('lead', 'সীসা'), b: T('tin', 'টিন'), whole: T('solder', 'ঝালাইয়ের মশলায়'), u: [' kg', ' কেজি'] },
  { a: T('copper', 'তামা'), b: T('zinc', 'দস্তা'), whole: T('brass', 'পিতলে'), u: [' kg', ' কেজি'] },
  { a: T('gold', 'সোনা'), b: T('copper', 'তামা'), whole: T('an alloy', 'একটি সংকর ধাতুতে'), u: [' g', ' গ্রাম'] },
  { a: T('milk', 'দুধ'), b: T('water', 'জল'), whole: T('a mixture', 'একটি মিশ্রণে'), u: [' litres', ' লিটার'] },
  { a: T('acid', 'অ্যাসিড'), b: T('water', 'জল'), whole: T('a solution', 'একটি দ্রবণে'), u: [' litres', ' লিটার'] },
  { a: T('boys', 'ছাত্র'), b: T('girls', 'ছাত্রী'), whole: T('a class', 'একটি ক্লাস'), u: ['', 'জন'], people: true },
];

function addComponent(kind = pick(['two', 'two', 'three'])) {
  let stem;
  let ans;
  let unit;
  let steps;
  const traps = [];
  if (kind === 'two') {
    const mx = pick(MIXES);
    unit = mx.u;
    const a = ri(1, 9);
    const b = ri(1, 9);
    if (gcd(a, b) !== 1 || a === b) return null;
    const k = ri(2, 12) * (mx.people ? 2 : 1);
    const W = k * (a + b);
    const addFirst = pick([true, false]);
    const p = ri(1, 9);
    const q = ri(1, 9);
    if (gcd(p, q) !== 1) return null;
    // keep the fixed component; the added one must grow
    if (addFirst ? p * b <= q * a : q * a <= p * b) return null;
    const A = k * a;
    const B = k * b;
    const newAmt = addFirst ? (B * p) / q : (A * q) / p;
    if (!isInt(newAmt)) return null;
    ans = newAmt - (addFirst ? A : B);
    if (ans > W) return null;
    const comp = addFirst ? mx.a : mx.b;
    const fixed = addFirst ? mx.b : mx.a;
    stem = mx.people
      ? T(`${mx.whole.en.replace(/^a/, 'A')} has ${W} students, and the ratio of ${mx.a.en} to ${mx.b.en} is ${a} : ${b}. How many more ${comp.en} must join so that the ratio of ${mx.a.en} to ${mx.b.en} becomes ${p} : ${q}?`,
        `একটি ক্লাসে ${W} জন পড়ুয়া, ${mx.a.bn} ও ${mx.b.bn}-এর অনুপাত ${a} : ${b}। আর কতজন ${comp.bn} ভর্তি হলে ${mx.a.bn} ও ${mx.b.bn}-এর অনুপাত ${p} : ${q} হবে?`)
      : T(`In ${W}${unit[0]} of ${mx.whole.en}, ${mx.a.en} and ${mx.b.en} are in the ratio ${a} : ${b}. How much ${comp.en} must be added to make the ratio of ${mx.a.en} to ${mx.b.en} ${p} : ${q}?`,
        `${W}${unit[1]} ${mx.whole.bn.replace(/^একটি /, '')} ${mx.a.bn} ও ${mx.b.bn} ${a} : ${b} অনুপাতে আছে। ${mx.a.bn} ও ${mx.b.bn}-এর অনুপাত ${p} : ${q} করতে কত ${comp.bn} মেশাতে হবে?`);
    const resplit = (W * (addFirst ? p : q)) / (p + q) - (addFirst ? A : B);
    if (isInt(resplit)) traps.push(trapped(plain(resplit, ...unit), 'The OLD total was re-split in the new ratio; the total grows, so anchor on the component that does not change.', 'পুরোনো মোটকে নতুন অনুপাতে ভাগ করা হয়েছে; মোট বাড়ে, তাই অপরিবর্তিত উপাদানকে ধরে হিসাব করো।'));
    const partsDiff = k * (addFirst ? p - a : q - b);
    if (isInt(partsDiff)) traps.push(trapped(plain(partsDiff, ...unit), `The ratio parts were compared without rescaling: ${fixed.en} must keep the same number of parts in both ratios first.`, `অনুপাতের ভাগ সরাসরি তুলনা হয়েছে: আগে দুটি অনুপাতে ${fixed.bn}-এর ভাগ সমান করতে হবে।`));
    steps = [
      T(`${mx.a.en.replace(/^./, (c) => c.toUpperCase())} = ${a}/${a + b} × ${W} = ${A}${unit[0]}, ${mx.b.en} = ${B}${unit[0]}. ${fixed.en.replace(/^./, (c) => c.toUpperCase())} does not change.`, `${mx.a.bn} = ${a}/${a + b} × ${W} = ${A}${unit[1]}, ${mx.b.bn} = ${B}${unit[1]}। ${fixed.bn} বদলায় না।`),
      T(`For ${p} : ${q}, ${comp.en} must become ${addFirst ? `${B} × ${p}/${q}` : `${A} × ${q}/${p}`} = ${newAmt}${unit[0]}, so add ${newAmt} − ${addFirst ? A : B} = ${ans}${unit[0]}.`, `${p} : ${q}-এর জন্য ${comp.bn} হতে হবে ${addFirst ? `${B} × ${p}/${q}` : `${A} × ${q}/${p}`} = ${newAmt}${unit[1]}, তাই মেশাতে হবে ${newAmt} − ${addFirst ? A : B} = ${ans}${unit[1]}।`),
    ];
  } else {
    unit = [' kg', ' কেজি'];
    const base = pick([[4, 3, 2], [5, 3, 2], [3, 2, 1], [5, 2, 3], [7, 2, 1], [4, 1, 3], [6, 5, 1]]);
    const [a, b, c] = base;
    const m = pick([1, 2, 3]);
    const z = b * m + ri(1, 4);
    const tg = [a * m, z, c * m];
    const g = tg.reduce((x, y) => gcd(x, y), 0);
    const tr = tg.map((x) => x / g);
    const k = ri(2, 10);
    const W = k * (a + b + c);
    ans = (k * z) / m - k * b;
    if (!isInt(ans)) return null;
    stem = T(`In a type of German silver, copper, zinc and nickel are in the ratio ${a} : ${b} : ${c}. How much zinc should be added to ${W} kg of it to make the ratio ${tr.join(' : ')}?`,
      `এক ধরনের জার্মান সিলভারে তামা, দস্তা ও নিকেল ${a} : ${b} : ${c} অনুপাতে আছে। এর ${W} কেজিতে কত দস্তা মেশালে অনুপাত ${tr.join(' : ')} হবে?`);
    const resplit = (W * tr[1]) / (tr[0] + tr[1] + tr[2]) - k * b;
    if (isInt(resplit)) traps.push(trapped(plain(resplit, ...unit), 'The OLD total was re-split in the new ratio; adding zinc makes the total bigger.', 'পুরোনো মোটকে নতুন অনুপাতে ভাগ করা হয়েছে; দস্তা মেশালে মোট বেড়ে যায়।'));
    const naive = k * (tr[1] - b);
    if (isInt(naive)) traps.push(trapped(plain(naive, ...unit), 'The zinc parts were compared directly; first make copper (which does not change) the same number of parts in both ratios.', 'দস্তার ভাগ সরাসরি তুলনা হয়েছে; আগে অপরিবর্তিত তামার ভাগ দুটি অনুপাতে সমান করো।'));
    const per = (k * a) / tr[0];
    steps = [
      T(`Copper = ${k * a} kg, zinc = ${k * b} kg, nickel = ${k * c} kg.`, `তামা = ${k * a} কেজি, দস্তা = ${k * b} কেজি, নিকেল = ${k * c} কেজি।`),
      T(`Copper stays ${k * a} kg = ${tr[0]} parts, so 1 part = ${per} kg and zinc must become ${tr[1]} × ${per} = ${(k * z) / m} kg.`, `তামা ${k * a} কেজিই থাকে = ${tr[0]} ভাগ, তাই 1 ভাগ = ${per} কেজি এবং দস্তা হতে হবে ${tr[1]} × ${per} = ${(k * z) / m} কেজি।`),
      T(`Zinc to add = ${(k * z) / m} − ${k * b} = ${ans} kg.`, `মেশাতে হবে = ${(k * z) / m} − ${k * b} = ${ans} কেজি দস্তা।`),
    ];
    if (!Number.isInteger(per)) return null;
  }
  const options = choose(plain(ans, ...unit), traps, numFillers(ans, Math.max(1, Math.round(ans / 5)), unit));
  if (!options) return null;
  return build({
    topic: TOPIC, subtopic: 'add_component_new_ratio', pattern: 'add_component_new_ratio', tags: ['ratio', 'mixture', kind],
    difficulty: 3, time: 75, stem, ...options, steps,
    shortcut: T('Hold the unchanged component fixed: scale the new ratio so it has the same number of parts, and the extra parts of the added component are the answer.', 'অপরিবর্তিত উপাদান স্থির রাখো: নতুন অনুপাতকে এমনভাবে বাড়াও যাতে তার ভাগ একই থাকে; যোগ করা উপাদানের বাড়তি ভাগই উত্তর।'),
  });
}

// ── 4. variation_direct_inverse ──────────────────────────────────────────────
function variation(kind = pick(['food', 'food', 'direct', 'cloth', 'area', 'work'])) {
  let stem;
  let ans;
  let unit = ['', ''];
  let steps;
  const traps = [];
  if (kind === 'food') {
    const M = pick([200, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2000, 2400, 3000, 4000]);
    const D = pick([30, 40, 45, 50, 60, 75, 80, 90, 100, 120, 150, 190]);
    const t = pick([5, 10, 12, 15, 20, 25, 30]);
    if (t >= D / 2) return null;
    const leave = pick([true, false]);
    const L = M * pick([1 / 5, 1 / 4, 1 / 10, 1 / 2, 1 / 3]);
    if (!isInt(L)) return null;
    const M2 = leave ? M - L : M + L;
    ans = (M * (D - t)) / M2;
    if (!isInt(ans)) return null;
    unit = [' days', ' দিন'];
    stem = T(`In a camp there was food for ${D} days for ${M} men. After ${t} days, ${L} men ${leave ? 'left' : 'joined'}. For how many days will the remaining food last the ${leave ? 'remaining' : 'enlarged group of'} men?`,
      `একটি শিবিরে ${M} জনের ${D} দিনের খাবার ছিল। ${t} দিন পর ${L} জন ${leave ? 'চলে গেল' : 'যোগ দিল'}। বাকি খাবারে ${leave ? 'বাকি' : 'বেড়ে যাওয়া'} লোকেদের কত দিন চলবে?`);
    const noT = (M * D) / M2;
    if (isInt(noT)) traps.push(trapped(plain(noT, ...unit), `The ${t} days already eaten were forgotten: only ${D - t} days of food were left.`, `যে ${t} দিনের খাবার খাওয়া হয়ে গেছে তা বাদ পড়েছে: বাকি ছিল ${D - t} দিনের খাবার।`));
    const direct = ((D - t) * M2) / M;
    if (isInt(direct)) traps.push(trapped(plain(direct, ...unit), `More men finish food faster: days vary INVERSELY with men, so multiply by ${M}/${M2}, not ${M2}/${M}.`, `লোক বাড়লে খাবার তাড়াতাড়ি ফুরোয়: দিন লোকসংখ্যার ব্যস্তানুপাতিক, তাই ${M}/${M2} দিয়ে গুণ করো, ${M2}/${M} নয়।`));
    steps = [
      T(`After ${t} days the food left would last ${M} men for ${D} − ${t} = ${D - t} days.`, `${t} দিন পর বাকি খাবারে ${M} জনের ${D} − ${t} = ${D - t} দিন চলত।`),
      T(`Men now = ${M2}; days = ${M} × ${D - t} ÷ ${M2} = ${ans}.`, `এখন লোক = ${M2}; দিন = ${M} × ${D - t} ÷ ${M2} = ${ans}।`),
    ];
  } else if (kind === 'direct') {
    const a = ri(2, 12);
    const b = ri(1, 9);
    if (gcd(a, b) !== 1 || a === b) return null;
    const N = a * ri(5, 40);
    ans = (N * b) / a;
    unit = ['', 'জন'];
    stem = T(`How many workers are to be employed to produce ${N} machine parts per day if the ratio of the number of parts to the number of workers per day is ${a} : ${b}?`,
      `প্রতিদিন যন্ত্রাংশের সংখ্যা ও শ্রমিকের সংখ্যার অনুপাত ${a} : ${b} হলে প্রতিদিন ${N}টি যন্ত্রাংশ তৈরি করতে কতজন শ্রমিক লাগবে?`);
    const inv = (N * a) / b;
    if (isInt(inv)) traps.push(trapped(plain(inv, ...unit), 'The ratio was used upside down: workers are the second term.', 'অনুপাত উল্টো ব্যবহার হয়েছে: শ্রমিক হল দ্বিতীয় পদ।'));
    steps = [
      T(`Parts : workers = ${a} : ${b}, so workers = parts × ${b}/${a}.`, `যন্ত্রাংশ : শ্রমিক = ${a} : ${b}, তাই শ্রমিক = যন্ত্রাংশ × ${b}/${a}।`),
      T(`${N} × ${b}/${a} = ${ans} workers.`, `${N} × ${b}/${a} = ${ans} জন শ্রমিক।`),
    ];
  } else if (kind === 'cloth') {
    const k = pick([3, 4, 5, 6, 8, 12, 15]);
    const per = pick([40, 45, 60, 75, 80, 90, 120, 150]);
    const n = ri(2, 25);
    if (n === k) return null;
    const C = k * per;
    ans = n * per;
    unit = ['₹', '₹'];
    stem = T(`If ${k} metres of cloth cost ₹${C}, what will ${n} metres of the same cloth cost?`, `${k} মিটার কাপড়ের দাম ₹${C} হলে একই কাপড়ের ${n} মিটারের দাম কত?`);
    const inv = (C * k) / n;
    if (isInt(inv)) traps.push(trapped(rupees(inv), 'Cost grows WITH length (direct proportion); this treats it as inverse.', 'দৈর্ঘ্য বাড়লে দামও বাড়ে (সরল সমানুপাত); এখানে ব্যস্ত ধরা হয়েছে।'));
    steps = [
      T(`Cost of 1 metre = ${C} ÷ ${k} = ₹${per}.`, `1 মিটারের দাম = ${C} ÷ ${k} = ₹${per}।`),
      T(`Cost of ${n} metres = ${n} × ${per} = ₹${ans}.`, `${n} মিটারের দাম = ${n} × ${per} = ₹${ans}।`),
    ];
  } else if (kind === 'area') {
    const s1 = pick([20, 30, 40, 50, 60, 80]);
    const s2 = pick([30, 40, 50, 60, 70, 90, 100, 120]);
    if (s1 === s2) return null;
    const Y = pick([800, 900, 1200, 1600, 2000, 2400, 3200, 3600]);
    ans = (Y * s2 * s2) / (s1 * s1);
    if (!isInt(ans)) return null;
    unit = [' kg', ' কেজি'];
    stem = T(`A square field of side ${s1} m produces ${Y} kg of rice. How much rice will a similar square field of side ${s2} m produce?`,
      `${s1} মিটার বাহুবিশিষ্ট একটি বর্গাকার জমিতে ${Y} কেজি ধান হয়। একই রকম ${s2} মিটার বাহুর বর্গাকার জমিতে কত ধান হবে?`);
    const lin = (Y * s2) / s1;
    if (isInt(lin)) traps.push(trapped(plain(lin, ...unit), 'Production goes with the AREA, so the side ratio must be squared.', 'উৎপাদন ক্ষেত্রফলের সমানুপাতিক, তাই বাহুর অনুপাতকে বর্গ করতে হবে।'));
    steps = [
      T(`Production ∝ area: ${s1}² = ${s1 * s1} m² and ${s2}² = ${s2 * s2} m².`, `উৎপাদন ∝ ক্ষেত্রফল: ${s1}² = ${s1 * s1} বর্গমিটার এবং ${s2}² = ${s2 * s2} বর্গমিটার।`),
      T(`Rice = ${Y} × ${s2 * s2}/${s1 * s1} = ${ans} kg.`, `ধান = ${Y} × ${s2 * s2}/${s1 * s1} = ${ans} কেজি।`),
    ];
  } else {
    const M = pick([6, 8, 9, 10, 12, 15, 16, 18, 20, 24, 30]);
    const D = pick([10, 12, 15, 18, 20, 24, 30, 36, 40, 45]);
    const M2 = pick([4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 25, 30, 36, 40]);
    if (M2 === M) return null;
    ans = (M * D) / M2;
    if (!isInt(ans)) return null;
    unit = [' days', ' দিন'];
    stem = T(`${M} workers can build a wall in ${D} days. In how many days can ${M2} workers build the same wall?`, `${M} জন শ্রমিক ${D} দিনে একটি দেয়াল গাঁথতে পারে। ${M2} জন শ্রমিক একই দেয়াল কত দিনে গাঁথবে?`);
    const dir = (D * M2) / M;
    if (isInt(dir)) traps.push(trapped(plain(dir, ...unit), 'More workers need FEWER days: this is inverse proportion.', 'শ্রমিক বেশি হলে দিন কম লাগে: এটি ব্যস্ত সমানুপাত।'));
    steps = [
      T(`Total work = ${M} × ${D} = ${M * D} worker-days.`, `মোট কাজ = ${M} × ${D} = ${M * D} শ্রমিক-দিন।`),
      T(`Days for ${M2} workers = ${M * D} ÷ ${M2} = ${ans}.`, `${M2} জনের লাগবে = ${M * D} ÷ ${M2} = ${ans} দিন।`),
    ];
  }
  const fmt = (v) => (unit[0] === '₹' ? rupees(v) : plain(v, ...unit));
  const step = Math.max(1, Math.round(ans / 10));
  const options = choose(fmt(ans), traps, [1, -1, 2, -2, 3].map((k) => ans + k * step).filter((v) => v > 0).map(fmt));
  if (!options) return null;
  return build({
    topic: TOPIC, subtopic: 'variation_direct_inverse', pattern: 'variation_direct_inverse', tags: ['proportion', kind === 'food' || kind === 'work' ? 'inverse' : 'direct', kind],
    difficulty: kind === 'food' || kind === 'area' ? 3 : 2, time: kind === 'food' ? 75 : 60, stem, ...options, steps,
    shortcut: kind === 'food' || kind === 'work'
      ? T('Inverse proportion: the product (men × days) stays the same, so new days = old product ÷ new number of men.', 'ব্যস্ত সমানুপাত: (লোক × দিন) গুণফল একই থাকে, তাই নতুন দিন = পুরোনো গুণফল ÷ নতুন লোকসংখ্যা।')
      : T('Direct proportion: the ratio stays the same, so multiply by (new ÷ old) — squared when the quantity goes with area.', 'সরল সমানুপাত: অনুপাত একই থাকে, তাই (নতুন ÷ পুরোনো) দিয়ে গুণ করো — ক্ষেত্রফলের সঙ্গে চললে বর্গ করে।'),
  });
}

// ── 5. transfer_ratio ────────────────────────────────────────────────────────
function transferRatio(kind = pick(['equal', 'ratio', 'pass'])) {
  const [X, Y] = names(2);
  let stem;
  let options;
  let steps;
  if (kind === 'pass') {
    const a = ri(2, 12);
    const b = ri(1, 6);
    if (gcd(a, b) !== 1) return null;
    const k0 = ri(4, 20);
    const N = k0 * (a + b);
    const P = k0 * a;
    const F = k0 * b;
    const k = ri(1, Math.max(1, Math.floor(F / 2)));
    if (k >= F) return null;
    const ans = ratio(P + k, F - k);
    const traps = [];
    if (b - k > 0) traps.push(trapped(ratio(a + k, b - k), `${k} was added to the ratio terms; add it to the actual numbers (${P} and ${F}).`, `${k} অনুপাতের পদে যোগ করা হয়েছে; আসল সংখ্যায় (${P} ও ${F}) যোগ করো।`));
    traps.push(trapped(ratio(F - k, P + k), 'The ratio is the wrong way round: successful first.', 'অনুপাত উল্টো: আগে সফল।'));
    traps.push(trapped(ratio(P + k, F), 'Every extra pass is one fewer failure: the unsuccessful number also drops.', 'প্রতিটি বাড়তি পাশ মানে একজন কম ফেল: অসফলের সংখ্যাও কমে।'));
    stem = T(`Of ${N} examinees of a school, the ratio of successful to unsuccessful students is ${a} : ${b}. If ${k} more students had passed, what would the ratio of successful to unsuccessful students have been?`,
      `একটি স্কুলের ${N} জন পরীক্ষার্থীর মধ্যে সফল ও অসফলের অনুপাত ${a} : ${b}। আর ${k} জন পাশ করলে সফল ও অসফলের অনুপাত কত হত?`);
    options = choose(ans, traps, ratioFillers(ans.en.split(' : ').map(Number)));
    steps = [
      T(`Successful = ${a}/${a + b} × ${N} = ${P}; unsuccessful = ${F}.`, `সফল = ${a}/${a + b} × ${N} = ${P}; অসফল = ${F}।`),
      T(`With ${k} more passing: ${P + k} : ${F - k} = ${ans.en}.`, `আর ${k} জন পাশ করলে: ${P + k} : ${F - k} = ${ans.bn}।`),
    ];
  } else {
    const a = ri(3, 11);
    const b = ri(1, a - 1);
    if (gcd(a, b) !== 1) return null;
    const unit = pick([10, 20, 25, 50, 100, 150, 200]);
    const Tot = unit * (a + b);
    const A = unit * a;
    const B = unit * b;
    let ans;
    let target;
    if (kind === 'equal') {
      ans = (A - B) / 2;
      if (!isInt(ans)) return null;
      target = T('both have equal amounts', 'দুজনের টাকা সমান হয়');
    } else {
      const c = ri(1, 9);
      const d = ri(1, 9);
      if (gcd(c, d) !== 1 || c * b >= a * d || c === d) return null;
      const newA = (Tot * c) / (c + d);
      if (!isInt(newA)) return null;
      ans = A - newA;
      target = T(`the ratio of their amounts becomes ${c} : ${d}`, `তাদের টাকার অনুপাত ${c} : ${d} হয়`);
    }
    if (!isInt(ans)) return null;
    stem = T(`The amounts of money with ${X.en} and ${Y.en} are in the ratio ${a} : ${b}, and together they have ₹${Tot}. How much should ${X.en} give ${Y.en} so that ${target.en}?`,
      `${X.bn} ও ${Y.bn}-এর টাকার অনুপাত ${a} : ${b} এবং দুজনের মোট ₹${Tot}। ${X.bn}, ${Y.bn}-কে কত টাকা দিলে ${target.bn}?`);
    const traps = [];
    if (kind === 'equal') traps.push(trapped(rupees(A - B), 'Giving the FULL difference overshoots: each rupee moved closes the gap by ₹2.', 'পুরো পার্থক্য দিলে বেশি হয়ে যায়: প্রতি ₹1 সরালে ফারাক ₹2 কমে।'));
    else {
      const half = (A - B) / 2;
      if (isInt(half)) traps.push(trapped(rupees(half), 'That makes them equal; the target ratio is different.', 'এতে দুজনে সমান হয়; লক্ষ্য অনুপাত আলাদা।'));
    }
    traps.push(trapped(rupees(A), `That is all of ${X.en}'s money.`, `এটি ${X.bn}-এর সব টাকা।`));
    options = choose(rupees(ans), traps, numFillers(ans, Math.max(5, unit / 2)).map((o) => rupees(Number(o.en))));
    steps = [
      T(`1 part = ${Tot} ÷ ${a + b} = ₹${unit}; ${X.en} has ₹${A}, ${Y.en} has ₹${B}. The total stays ₹${Tot}.`, `1 ভাগ = ${Tot} ÷ ${a + b} = ₹${unit}; ${X.bn}-এর ₹${A}, ${Y.bn}-এর ₹${B}। মোট ₹${Tot}-ই থাকে।`),
      T(`${X.en} must end with ₹${A - ans}, so he gives ${A} − ${A - ans} = ₹${ans}.`, `${X.bn}-এর শেষে থাকবে ₹${A - ans}, তাই দিতে হবে ${A} − ${A - ans} = ₹${ans}।`),
    ];
  }
  if (!options) return null;
  return build({
    topic: TOPIC, subtopic: 'transfer_ratio', pattern: 'transfer_ratio', tags: ['ratio', 'transfer', kind],
    difficulty: kind === 'equal' ? 2 : 3, time: kind === 'equal' ? 45 : 75, stem, ...options, steps,
    shortcut: T('The total never changes in a transfer: re-split the same total in the new ratio and compare with the old share.', 'স্থানান্তরে মোট বদলায় না: একই মোটকে নতুন অনুপাতে ভাগ করে পুরোনো ভাগের সঙ্গে তুলনা করো।'),
  });
}

// ── 6. mean_proportional ─────────────────────────────────────────────────────
function meanProportional(kind = pick(['int', 'frac', 'product'])) {
  let stem;
  let options;
  let steps;
  if (kind === 'int') {
    const u = pick([1, 2, 3, 5, 6, 7]);
    const m = ri(1, 12);
    const n = ri(2, 15);
    if (m === n) return null;
    const a = u * m * m;
    const b = u * n * n;
    const ans = u * m * n;
    stem = pick([
      T(`Find the mean proportional between ${a} and ${b}.`, `${a} ও ${b}-এর মধ্যসমানুপাতী নির্ণয় করো।`),
      T(`If ${a}, x and ${b} are in continued proportion, find x.`, `${a}, x ও ${b} ক্রমিক সমানুপাতে থাকলে x-এর মান কত?`),
    ]);
    const traps = [];
    if ((a + b) % 2 === 0) traps.push(trapped(plain((a + b) / 2), 'That is the arithmetic mean; the mean proportional is √(a × b).', 'এটি সমান্তর গড়; মধ্যসমানুপাতী হল √(a × b)।'));
    traps.push(trapped(plain(a * b), 'The square root was forgotten: x² = a × b.', 'বর্গমূল নিতে ভুলে গেছে: x² = a × b।'));
    options = choose(plain(ans), traps, numFillers(ans, u));
    steps = [
      T(`x² = ${a} × ${b} = ${a * b}.`, `x² = ${a} × ${b} = ${a * b}, তাই বর্গমূল নাও।`),
      T(`x = √${a * b} = ${ans}.`, `x = √${a * b} = ${ans}।`),
    ];
  } else if (kind === 'frac') {
    const m = ri(2, 9);
    const n = ri(2, 12);
    if (m === n) return null;
    const ans = R(1, m * n);
    stem = T(`Find the mean proportional between 1/${m * m} and 1/${n * n}.`, `1/${m * m} ও 1/${n * n}-এর মধ্যসমানুপাতী নির্ণয় করো।`);
    const am = R(m * m + n * n, 2 * m * m * n * n);
    const traps = [
      trapped(plain(fracText(R(1, m * m * n * n))), 'The square root was forgotten: x² is the product, x is its square root.', 'বর্গমূল নিতে ভুলে গেছে: গুণফল হল x², x তার বর্গমূল।'),
      trapped(plain(fracText(am)), 'That is the arithmetic mean, not the mean proportional.', 'এটি সমান্তর গড়, মধ্যসমানুপাতী নয়।'),
    ];
    const fillers = [1, -1, 2, -2, 4].map((k) => m * n + k).filter((v) => v > 1).map((v) => plain(`1/${v}`));
    options = choose(plain(fracText(ans)), traps, fillers);
    steps = [
      T(`x² = 1/${m * m} × 1/${n * n} = 1/${m * m * n * n}.`, `x² = 1/${m * m} × 1/${n * n} = 1/${m * m * n * n}, তাই বর্গমূল নাও।`),
      T(`x = 1/√${m * m * n * n} = 1/${m * n}.`, `x = 1/√${m * m * n * n} = 1/${m * n}।`),
    ];
  } else {
    const b = ri(2, 15);
    const P = b * b * b;
    stem = T(`The product of three positive numbers in continued proportion is ${P}. What is the mean proportional of the first and the third number?`,
      `ক্রমিক সমানুপাতে থাকা তিনটি ধনাত্মক সংখ্যার গুণফল ${P}। প্রথম ও তৃতীয় সংখ্যার মধ্যসমানুপাতী কত?`);
    const traps = [];
    if (P % 3 === 0) traps.push(trapped(plain(P / 3), 'Dividing by 3 is for a sum, not a product: the product of a, b, c is b³.', '3 দিয়ে ভাগ যোগফলের ক্ষেত্রে, গুণফলে নয়: a, b, c-এর গুণফল b³।'));
    const sq = Math.sqrt(P);
    if (Number.isInteger(sq)) traps.push(trapped(plain(sq), 'Since b² = ac, the product is b³ — take the CUBE root, not the square root.', 'b² = ac, তাই গুণফল b³ — ঘনমূল নাও, বর্গমূল নয়।'));
    traps.push(trapped(plain(b * b), 'That is b² (= first × third); the mean proportional is b itself.', 'এটি b² (= প্রথম × তৃতীয়); মধ্যসমানুপাতী হল b নিজে।'));
    options = choose(plain(b), traps, numFillers(b, 1));
    steps = [
      T(`For a, b, c in continued proportion b² = ac, so abc = b³ = ${P}.`, `a, b, c ক্রমিক সমানুপাতে থাকলে b² = ac, তাই abc = b³ = ${P}।`),
      T(`b = ∛${P} = ${b}, which is the mean proportional of a and c.`, `b = ∛${P} = ${b}, যা a ও c-এর মধ্যসমানুপাতী।`),
    ];
  }
  if (!options) return null;
  return build({
    topic: TOPIC, subtopic: 'mean_proportional', pattern: 'mean_proportional', tags: ['proportion', 'mean_proportional', kind],
    difficulty: kind === 'int' ? 2 : 3, time: 60, stem, ...options, steps,
    shortcut: T('Mean proportional of a and b = √(a × b); for three in continued proportion the middle term is the cube root of their product.', 'a ও b-এর মধ্যসমানুপাতী = √(a × b); ক্রমিক সমানুপাতে তিনটির মাঝের পদ = তাদের গুণফলের ঘনমূল।'),
  });
}

// ── 7. coins_value_ratio ─────────────────────────────────────────────────────
const COIN = (p) => (p >= 100 ? T(`₹${p / 100}`, `₹${p / 100}`) : T(`${p} paise`, `${p} পয়সা`));
const COIN_SETS = [[100, 50, 25], [200, 100, 50], [500, 200, 100], [100, 50, 10], [50, 25, 10], [1000, 500, 100], [200, 50, 25]];

function coins(kind = pick(['equal', 'ratio', 'ratio'])) {
  const set = pick(COIN_SETS);
  const [c1, c2, c3] = set.map(COIN);
  const list = T(`${c1.en}, ${c2.en} and ${c3.en}`, `${c1.bn}, ${c2.bn} ও ${c3.bn}`);
  const per = set.reduce((a, b) => a + b, 0);
  let stem;
  let options;
  let steps;
  if (kind === 'equal') {
    const n = ri(4, 60) * 2;
    const V = (n * per) / 100;
    if (!isInt(V)) return null;
    stem = T(`A bag contains an equal number of ${list.en} coins. If their total value is ₹${V}, how many coins of each type are there?`,
      `একটি থলিতে সমান সংখ্যক ${list.bn}-এর মুদ্রা আছে। মোট মূল্য ₹${V} হলে প্রতিটি ধরনের কতগুলি মুদ্রা আছে?`);
    const traps = [trapped(plain(3 * n), 'That is the total number of coins, not the number of each type.', 'এটি মোট মুদ্রার সংখ্যা, প্রতিটি ধরনের নয়।')];
    if (V % 3 === 0) traps.push(trapped(plain(V / 3), 'The VALUE was split equally; it is the NUMBER of coins that is equal.', 'মূল্য সমান ভাগ করা হয়েছে; সমান হল মুদ্রার সংখ্যা।'));
    options = choose(plain(n), traps, numFillers(n, pick([2, 5, 10])));
    steps = [
      T(`One coin of each type is worth ${set.join(' + ')} = ${per} paise.`, `প্রতিটি ধরনের একটি করে মুদ্রার মূল্য ${set.join(' + ')} = ${per} পয়সা।`),
      T(`₹${V} = ${V * 100} paise, so each type has ${V * 100} ÷ ${per} = ${n} coins.`, `₹${V} = ${V * 100} পয়সা, তাই প্রতিটি ধরনের মুদ্রা ${V * 100} ÷ ${per} = ${n}টি।`),
    ];
  } else {
    const r = [ri(1, 9), ri(1, 9), ri(1, 9)];
    if (r.reduce((a, b) => gcd(a, b), 0) !== 1) return null;
    const unitVal = r[0] * set[0] + r[1] * set[1] + r[2] * set[2];
    const x = ri(2, 40) * pick([1, 2, 5]);
    const V = (x * unitVal) / 100;
    if (!isInt(V)) return null;
    const who = ri(0, 2);
    const ans = r[who] * x;
    const coinsArr = [c1, c2, c3];
    stem = T(`The numbers of ${list.en} coins in a bag are in the ratio ${r.join(' : ')}, and their total value is ₹${V}. How many ${coinsArr[who].en} coins are there?`,
      `একটি থলিতে ${list.bn}-এর মুদ্রার সংখ্যা ${r.join(' : ')} অনুপাতে, মোট মূল্য ₹${V}। ${coinsArr[who].bn}-এর মুদ্রা কতগুলি?`);
    const traps = [];
    const valueShare = (V * r[who]) / (r[0] + r[1] + r[2]);
    if (isInt(valueShare)) traps.push(trapped(plain(valueShare), 'The total VALUE was divided in the count ratio; the ratio is of numbers of coins, not of values.', 'মোট মূল্যকে সংখ্যার অনুপাতে ভাগ করা হয়েছে; অনুপাতটি মুদ্রার সংখ্যার, মূল্যের নয়।'));
    traps.push(trapped(plain(x * (r[0] + r[1] + r[2])), 'That is the total number of coins of all three types.', 'এটি তিন ধরনের মিলিয়ে মোট মুদ্রার সংখ্যা।'));
    const nxt = r[(who + 1) % 3] * x;
    if (nxt !== ans) traps.push(trapped(plain(nxt), `That is the number of ${coinsArr[(who + 1) % 3].en} coins.`, `এটি ${coinsArr[(who + 1) % 3].bn}-এর মুদ্রার সংখ্যা।`));
    options = choose(plain(ans), traps, numFillers(ans, Math.max(1, r[who])));
    steps = [
      T(`Let the numbers be ${r[0]}x, ${r[1]}x, ${r[2]}x. Value = ${r[0]}x × ${set[0]} + ${r[1]}x × ${set[1]} + ${r[2]}x × ${set[2]} = ${unitVal}x paise.`, `সংখ্যাগুলি ${r[0]}x, ${r[1]}x, ${r[2]}x ধরো। মূল্য = ${r[0]}x × ${set[0]} + ${r[1]}x × ${set[1]} + ${r[2]}x × ${set[2]} = ${unitVal}x পয়সা।`),
      T(`${unitVal}x = ${V * 100}, so x = ${x} and there are ${r[who]} × ${x} = ${ans} ${coinsArr[who].en} coins.`, `${unitVal}x = ${V * 100}, তাই x = ${x} এবং ${coinsArr[who].bn}-এর মুদ্রা ${r[who]} × ${x} = ${ans}টি।`),
    ];
  }
  if (!options) return null;
  return build({
    topic: TOPIC, subtopic: 'coins_value_ratio', pattern: 'coins_value_ratio', tags: ['ratio', 'coins', kind],
    difficulty: kind === 'equal' ? 2 : 3, time: kind === 'equal' ? 60 : 75, stem, ...options, steps,
    shortcut: T('Work in paise: value of one "set" of coins (counts in the ratio) ÷ into the total value gives the multiplier.', 'পয়সায় হিসাব করো: অনুপাত অনুযায়ী এক "সেট" মুদ্রার মূল্য দিয়ে মোট মূল্যকে ভাগ করলে গুণক পাওয়া যায়।'),
  });
}

// ── 8. income_expenditure ────────────────────────────────────────────────────
function incomeExpenditure() {
  const [X, Y] = names(2);
  const a = ri(2, 9);
  const b = ri(2, 9);
  const c = ri(2, 9);
  const d = ri(2, 9);
  if (a === b || c === d || gcd(a, b) !== 1 || gcd(c, d) !== 1 || a * d === b * c) return null;
  if (Math.sign(a - b) !== Math.sign(c - d)) return null;
  const g = gcd(Math.abs(a - b), Math.abs(c - d));
  const x0 = Math.abs(c - d) / g;
  const y0 = Math.abs(a - b) / g;
  const S0 = a * x0 - c * y0;
  if (S0 <= 0) return null;
  const M = pick([100, 200, 250, 500, 1000, 1500, 2000]);
  const x = x0 * M;
  const y = y0 * M;
  const S = S0 * M;
  if (a * x > 200000) return null;
  const askA = pick([true, false]);
  const ans = askA ? a * x : b * x;
  const period = pick([T('monthly ', 'মাসিক '), T('', ''), T('annual ', 'বার্ষিক ')]);
  const stem = T(`The ${period.en}incomes of ${X.en} and ${Y.en} are in the ratio ${a} : ${b} and their expenditures are in the ratio ${c} : ${d}. If each of them saves ₹${S}, what is ${askA ? X.en : Y.en}'s income?`,
    `${X.bn} ও ${Y.bn}-এর ${period.bn}আয়ের অনুপাত ${a} : ${b} এবং ব্যয়ের অনুপাত ${c} : ${d}। প্রত্যেকে ₹${S} সঞ্চয় করলে ${askA ? X.bn : Y.bn}-এর আয় কত?`);
  const traps = [
    trapped(rupees(askA ? b * x : a * x), `That is ${askA ? Y.en : X.en}'s income.`, `এটি ${askA ? Y.bn : X.bn}-এর আয়।`),
    trapped(rupees(askA ? c * y : d * y), 'That is the expenditure; income = expenditure + saving.', 'এটি ব্যয়; আয় = ব্যয় + সঞ্চয়।'),
  ];
  const options = choose(rupees(ans), traps, numFillers(ans, M).map((o) => rupees(Number(o.en))));
  if (!options) return null;
  return build({
    topic: TOPIC, subtopic: 'income_expenditure', pattern: 'income_expenditure', tags: ['ratio', 'savings'],
    difficulty: 3, time: 90, stem, ...options,
    steps: [
      T(`Incomes ${a}x, ${b}x; expenditures ${c}y, ${d}y. Savings: ${a}x − ${c}y = ${S} and ${b}x − ${d}y = ${S}.`, `আয় ${a}x, ${b}x; ব্যয় ${c}y, ${d}y। সঞ্চয়: ${a}x − ${c}y = ${S} এবং ${b}x − ${d}y = ${S}।`),
      T(`Subtracting, ${a - b}x = ${c - d}y, which gives x = ${x} and y = ${y}.`, `বিয়োগ করে ${a - b}x = ${c - d}y, তা থেকে x = ${x} এবং y = ${y}।`),
      T(`${askA ? X.en : Y.en}'s income = ${askA ? a : b} × ${x} = ₹${ans}.`, `${askA ? X.bn : Y.bn}-এর আয় = ${askA ? a : b} × ${x} = ₹${ans}।`),
    ],
    shortcut: T('Equal savings: subtract the two saving equations to link x and y, then substitute back — or test the options (income − saving must fit the expenditure ratio).', 'সমান সঞ্চয়: দুটি সঞ্চয়ের সমীকরণ বিয়োগ করে x ও y-এর সম্পর্ক বের করো — অথবা বিকল্প বসিয়ে দেখো (আয় − সঞ্চয় ব্যয়ের অনুপাতে মিলতে হবে)।'),
  });
}

const GENERATORS = {
  equal_parts_ratio: equalPartsRatio,
  fraction_ratio: fractionRatio,
  add_component_new_ratio: addComponent,
  variation_direct_inverse: variation,
  transfer_ratio: transferRatio,
  mean_proportional: meanProportional,
  coins_value_ratio: coins,
  income_expenditure: incomeExpenditure,
};

module.exports = {
  subject: 'quant',
  topics: [{ topic: TOPIC, weight: 1, gens: Object.values(GENERATORS).map((g) => () => g()) }],
  GENERATORS,
  equalPartsRatio, fractionRatio, addComponent, variation, transferRatio, meanProportional, coins, incomeExpenditure,
};
