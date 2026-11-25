'use strict';

/**
 * Number System PYQ-type generators (scripts/generators/supplement/pyq_number_system.js):
 * every answer is re-solved by brute force / own arithmetic from the numbers printed in
 * the English stem, options are 4 distinct values, Bengali is present, pattern = subtopic,
 * and the PYQ map / match rules point at real pattern keys.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { seed } = require('../scripts/generators/common');
const gen = require('../scripts/generators/supplement/pyq_number_system');
const { checkRules } = require('../src/services/patternTagger');

const BN = /[ঀ-৿]/;
const correctText = (q) => q.options.find((o) => o.oid === q.correct_option_id).text.en;
const nums = (s) => [...s.matchAll(/\d+/g)].map((m) => Number(m[0]));
const g = (a, b) => (b ? g(b, a % b) : a);
const l = (a, b) => (a / g(a, b)) * b;
const prime = (n) => n > 1 && ![...Array(n).keys()].slice(2).some((d) => n % d === 0);
const reduce = (p, q) => { const d = g(p, q); return q / d === 1 ? String(p / d) : `${p / d}/${q / d}`; };

function solveHcfRem(stem) {
  let m;
  if ((m = /prime numbers dividing (\d+) and leaving a remainder of (\d+) in each case are$/.exec(stem))) {
    const [N, r] = [Number(m[1]), Number(m[2])];
    const ps = [];
    for (let p = 2; p <= N; p++) if (prime(p) && N % p === r) ps.push(p);
    return ps.join(' and ');
  }
  if ((m = /divide ([\d, and]+) leaving the same remainder (\d+) in each case is$/.exec(stem))) {
    const Ns = nums(m[1]);
    const r = Number(m[2]);
    for (let d = Math.max(...Ns); d > r; d--) if (Ns.every((x) => x % d === r)) return String(d);
  }
  if ((m = /divides ([\d, and]+) leaving remainders ([\d, and]+) respectively\.$/.exec(stem))) {
    const Ns = nums(m[1]);
    const rs = nums(m[2]);
    for (let d = Math.max(...Ns); d > 1; d--) if (Ns.every((x, i) => x % d === rs[i])) return String(d);
  }
  throw new Error(`unparsed: ${stem}`);
}

function solveLcmRem(stem) {
  let m;
  if ((m = /If he packs ([\d, or]+) in a parcel, he is left with (one|\d+); if he packs (\d+) in a parcel, none is left over/.exec(stem))) {
    const ds = nums(m[1]);
    const r = m[2] === 'one' ? 1 : Number(m[2]);
    const p = Number(m[3]);
    for (let x = 1; ; x++) if (x > Math.max(...ds) && ds.every((d) => x % d === r) && x % p === 0) return String(x);
  }
  if ((m = /least 4-digit number which, when divided by ([\d, and]+), leaves a remainder of (\d+) in each case\?/.exec(stem))) {
    const ds = nums(m[1]);
    const r = Number(m[2]);
    for (let x = 1000; ; x++) if (ds.every((d) => x % d === r)) return String(x);
  }
  if ((m = /least number from which, if (\d+) is subtracted, the difference is divisible by ([\d, and]+)\?/.exec(stem))) {
    const r = Number(m[1]);
    const ds = nums(m[2]);
    for (let x = r + 1; ; x++) if (ds.every((d) => (x - r) % d === 0)) return String(x);
  }
  if ((m = /least number which, when divided by ([\d, and]+), leaves a remainder of (\d+) in each case\./.exec(stem))) {
    const ds = nums(m[1]);
    const r = Number(m[2]);
    for (let x = Math.max(...ds) + 1; ; x++) if (ds.every((d) => x % d === r)) return String(x);
  }
  throw new Error(`unparsed: ${stem}`);
}

function solveFrac(stem) {
  const m = /^Find the (LCM|HCF) of (.+)\.$/.exec(stem);
  const fr = [...m[2].matchAll(/(\d+)\/(\d+)/g)].map((x) => [Number(x[1]), Number(x[2])]);
  // Fractions in the stem are in lowest terms: LCM = LCM(nums)/HCF(dens), HCF = HCF(nums)/LCM(dens).
  const nsArr = fr.map((f) => f[0]);
  const dsArr = fr.map((f) => f[1]);
  if (m[1] === 'LCM') return reduce(nsArr.reduce(l), dsArr.reduce(g));
  return reduce(nsArr.reduce(g), dsArr.reduce(l));
}

function solveRatioHcf(stem) {
  const [a, b, h] = nums(stem);
  let t = 1;
  while (g(a * t, b * t) !== h) t++;
  const [x, y] = [a * t, b * t];
  if (/What are the numbers\?/.test(stem)) return `${x}, ${y}`;
  if (/LCM\?/.test(stem)) return String(l(x, y));
  return String(x + y);
}

function solveLcmExact(stem) {
  const ds = nums(stem.replace(/4-digit/, ''));
  const all = (x) => ds.every((d) => x % d === 0);
  if (/perfect square/.test(stem)) { for (let i = 1; ; i++) if (all(i * i)) return String(i * i); }
  if (/greatest 4-digit/.test(stem)) { for (let x = 9999; x >= 1000; x--) if (all(x)) return String(x); }
  if (/least 4-digit/.test(stem)) { for (let x = 1000; x <= 9999; x++) if (all(x)) return String(x); }
  for (let x = 1; ; x++) if (all(x)) return String(x);
}

/** Brute force: every pair (x ≤ y) is searched directly; no HCF × LCM formula is used. */
function solveProduct(stem) {
  const n = nums(stem);
  // every factor pair (x ≤ y) of P that satisfies pred
  const pairsWith = (pred, P) => { const out = []; for (let x = 1; x * x <= P; x++) if (P % x === 0 && pred(x, P / x)) out.push([x, P / x]); return out; };
  const only = (ps) => { assert.equal(ps.length, 1, `exactly one pair must fit: ${stem}`); return ps; };
  if (/How many such pairs/.test(stem)) {
    const [v, h] = n;
    const bySum = /sum of two numbers/.test(stem);
    let c = 0;
    for (let x = 1; bySum ? x < v - x : x * x < v; x++) {
      const y = bySum ? v - x : v / x;
      if (Number.isInteger(y) && g(x, y) === h) c++;
    }
    return String(c);
  }
  if (/sum of the reciprocals/.test(stem)) {
    const [S, P] = n;
    only(pairsWith((x, y) => x + y === S, P));
    return reduce(S, P);
  }
  if (/times their HCF/.test(stem)) {
    const [k, S, x] = n;
    for (let y = 1; y <= S; y++) {
      const h = g(x, y);
      if (l(x, y) === k * h && h + l(x, y) === S) return String(y);
    }
  }
  if (/(difference|sum) of the (two )?numbers/.test(stem)) {
    const [P, k] = n;
    const diff = /difference/.test(stem);
    const [[x, y]] = only(pairsWith((p, q) => (diff ? q - p === k : p + q === k), P));
    return String(/larger/.test(stem) ? y : x);
  }
  if (/product of two numbers is \d+ and their HCF/.test(stem) && /LCM/.test(stem)) {
    const [P, h] = n;
    for (let x = 1; x * x <= P; x++) if (P % x === 0 && g(x, P / x) === h) return String(l(x, P / x));
  }
  if (/product of two numbers is \d+ and their LCM/.test(stem)) {
    const [P, L] = n;
    for (let x = 1; x * x <= P; x++) if (P % x === 0 && l(x, P / x) === L) return String(g(x, P / x));
  }
  if (/What is the product of the two numbers\?/.test(stem)) {
    const [h, L] = n;
    for (let x = h; x <= L; x += h) for (let y = x; y <= L; y += h) if (g(x, y) === h && l(x, y) === L) return String(x * y);
  }
  const [h, L, x] = n;
  for (let y = h; y <= L; y += h) if (g(x, y) === h && l(x, y) === L) return String(y);
  throw new Error(`unparsed: ${stem}`);
}

function solveRemFactor(stem) {
  const [D, R, d] = nums(stem);
  const someNumber = D * 37 + R;
  return String(someNumber % d);
}

function value(s) {
  let m;
  if ((m = /^\((0\.\d+)\)²$/.exec(s))) return Number(m[1]) * Number(m[1]);
  if ((m = /^√\((\d+)\/(\d+)\)$/.exec(s))) return Math.sqrt(Number(m[1])) / Math.sqrt(Number(m[2]));
  if ((m = /^(\d+)\/(\d+)$/.exec(s))) return Number(m[1]) / Number(m[2]);
  return parseFloat(s);
}

function solveCompare(stem) {
  let m;
  if ((m = /correct (ascending|descending) order of (.+)\?$/.exec(stem))) {
    const xs = m[2].replace(' and ', ', ').split(', ');
    const asc = m[1] === 'ascending';
    xs.sort((a, b) => (asc ? parseFloat(a) - parseFloat(b) : parseFloat(b) - parseFloat(a)));
    return xs.join(asc ? ' < ' : ' > ');
  }
  m = /^Which is the (greatest|smallest) among (.+)\?$/.exec(stem);
  const items = m[2].replace(' and ', ', ').split(', ');
  const vals = items.map(value);
  const target = m[1] === 'greatest' ? Math.max(...vals) : Math.min(...vals);
  return items[vals.indexOf(target)];
}

function solveDigits(stem) {
  const [s, D] = nums(stem.replace('two-digit', ''));
  const up = /number increases by|more than the original/.test(stem);
  for (let x = 10; x < 100; x++) {
    const t = Math.floor(x / 10);
    const u = x % 10;
    if (t + u !== s || u === 0) continue;
    const rev = 10 * u + t;
    if (up ? rev - x === D : x - rev === D) return String(x);
  }
  return null;
}

function check(q, solve, pattern) {
  assert.equal(correctText(q), solve(q.stem.en), q.stem.en);
  assert.equal(q.options.length, 4, q.stem.en);
  assert.equal(new Set(q.options.map((o) => o.text.en)).size, 4, q.stem.en);
  assert.ok(q.options.every((o) => o.text.bn), 'Bengali option text');
  assert.ok(BN.test(q.stem.bn), `Bengali stem: ${q.stem.bn}`);
  assert.ok(q.solution.steps.length >= 2 && q.solution.steps.some((s) => BN.test(s.bn)));
  assert.ok(q.solution.shortcut?.en && q.solution.shortcut?.bn);
  assert.equal(q.pattern, pattern);
  assert.equal(q.subtopic, pattern);
  assert.equal(q.topic, 'number_system');
  assert.ok(q.difficulty >= 2 && q.difficulty <= 3);
  assert.ok(q.expected_time_sec >= 40 && q.expected_time_sec <= 90);
}

test('PYQ numbers re-solve to the official keys', () => {
  assert.equal(solveHcfRem('The prime numbers dividing 143 and leaving a remainder of 3 in each case are'), '5 and 7');
  assert.equal(solveHcfRem('The greatest number which can divide 1356, 1868 and 2764 leaving the same remainder 12 in each case is'), '64');
  assert.equal(solveLcmRem('A man has a certain number of small boxes to pack into parcels. If he packs 3, 4, 5 or 6 in a parcel, he is left with one; if he packs 7 in a parcel, none is left over. What is the least number of boxes he can have?'), '301');
  assert.equal(solveLcmRem('What is the least number from which, if 1 is subtracted, the difference is divisible by 12, 16 and 28?'), '337');
  assert.equal(solveFrac('Find the LCM of 4/3, 8/9 and 3/5.'), '24');
  assert.equal(solveRatioHcf('The ratio of two numbers is 5 : 13 and their gcd is 11. What are the numbers?'), '55, 143');
  assert.equal(solveLcmExact('The least perfect square number divisible by 3, 4, 5, 6 and 8 is'), '3600');
  // Owner-supplied HCF × LCM questions (2026-11-25).
  assert.equal(solveProduct('The product of two numbers is 2160 and their HCF is 12. Their LCM is'), '180');
  assert.equal(solveProduct('The product of the LCM and HCF of two numbers is 24. If the difference of the two numbers is 2, the larger number is'), '6');
  assert.equal(solveRatioHcf('The ratio of two numbers is 3 : 4 and their HCF is 4. What is their LCM?'), '48');
  assert.equal(solveProduct('The HCF and LCM of two numbers are 16 and 240 respectively. If one of the numbers is 48, the other number is'), '80');
  assert.equal(solveRemFactor('When a number is divided by 65 it leaves a remainder 48. When it is divided by 13, the remainder will be'), '9');
  assert.equal(solveRemFactor('A certain number when divided by 175 leaves remainder 132. When the same number is divided by 25, the remainder is'), '7');
  assert.equal(solveCompare('Which of the following is the correct ascending order of 2.2, 2.02, 2.002 and 2.222?'), '2.002 < 2.02 < 2.2 < 2.222');
  assert.equal(solveCompare('Which is the greatest among 5/9, √(25/49), 0.23 and (0.8)²?'), '√(25/49)');
  assert.equal(solveDigits('The sum of the units digit and the tens digit of a number is 9. After interchanging the digits, the difference between the earlier number and the present number is 9, the earlier number being the larger. What is the number?'), '54');
});

const CASES = [
  ['hcf_with_remainders', gen.hcfWithRemainders, gen.HCF_REM_KINDS, solveHcfRem],
  ['lcm_with_same_remainder', gen.lcmWithSameRemainder, gen.LCM_REM_KINDS, solveLcmRem],
  ['hcf_lcm_of_fractions', gen.hcfLcmOfFractions, gen.FRAC_KINDS, solveFrac],
  ['ratio_hcf_find_numbers', gen.ratioHcfFindNumbers, ['numbers', 'lcm', 'sum'], solveRatioHcf],
  ['lcm_exactly_divisible', gen.lcmExactlyDivisible, gen.LCM_EXACT_KINDS, solveLcmExact],
  ['hcf_lcm_product', gen.hcfLcmProduct, gen.PRODUCT_KINDS, solveProduct],
  ['remainder_by_factor', gen.remainderByFactor, [undefined], solveRemFactor],
  ['fraction_decimal_compare', gen.fractionDecimalCompare, gen.CMP_KINDS, solveCompare],
  ['digit_reverse_sum_diff', gen.digitReverseSumDiff, gen.DIGIT_KINDS, solveDigits],
];

for (const [name, fn, kinds, solve] of CASES) {
  test(`${name}: 300+ draws re-solved independently, every framing used, 40+ distinct stems`, () => {
    seed(20261124);
    const stems = new Set();
    const framings = new Set();
    let made = 0;
    for (let i = 0; i < 6000 && made < 400; i++) {
      const q = fn(kinds[i % kinds.length]);
      if (!q) continue;
      made++;
      framings.add(i % kinds.length);
      stems.add(q.stem.en);
      check(q, solve, name);
    }
    assert.ok(made >= 300, `generated ${made}`);
    assert.equal(framings.size, kinds.length, 'every framing produces questions');
    assert.ok(stems.size >= 40, `distinct stems ${stems.size}`);
  });
}

test('module shape and pattern rules', () => {
  assert.equal(gen.subject, 'quant');
  assert.equal(gen.topics[0].topic, 'number_system');
  seed(7);
  for (const g0 of gen.topics[0].gens) {
    let q = null;
    for (let i = 0; i < 500 && !q; i++) q = g0();
    assert.ok(q, 'every registered generator yields a question');
  }
  assert.deepEqual(checkRules(), []);
});
