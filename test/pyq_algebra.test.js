'use strict';

/**
 * Algebra PYQ-gap generators (scripts/generators/supplement/pyq_algebra.js).
 * Every draw is re-solved from the numbers in the English stem by an independent solver
 * (exact BigInt rationals) — none of the generator's own maths is imported.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { seed } = require('../scripts/generators/common');
const gen = require('../scripts/generators/supplement/pyq_algebra');
const { checkRules } = require('../src/services/patternTagger');
const { loadPatterns } = require('../db/patterns');

// ── exact rationals ────────────────────────────────────────────
const babs = (x) => (x < 0n ? -x : x);
const bgcd = (a, b) => { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a; };
function Q(n, d = 1n) {
  n = BigInt(n); d = BigInt(d);
  if (d < 0n) { n = -n; d = -d; }
  const g = bgcd(n, d) || 1n;
  return { n: n / g, d: d / g };
}
const add = (a, b) => Q(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a, b) => Q(a.n * b.d - b.n * a.d, a.d * b.d);
const mul = (a, b) => Q(a.n * b.n, a.d * b.d);
const div = (a, b) => Q(a.n * b.d, a.d * b.n);
const eq = (a, b) => a.n === b.n && a.d === b.d;
function isqrt(x) { const r = BigInt(Math.round(Math.sqrt(Number(x)))); assert.equal(r * r, x, `not a square: ${x}`); return r; }
/** "₹ 1 2/3", "13.75", "2/7", "67 runs" -> rational. */
function num(s) {
  s = s.replace(/₹|Rs\.|runs|kg|marks|per day/g, '').trim();
  let m;
  if ((m = /^(\d+) (\d+)\/(\d+)$/.exec(s))) return add(Q(m[1]), Q(m[2], m[3]));
  if ((m = /^(\d+)\/(\d+)$/.exec(s))) return Q(m[1], m[2]);
  if ((m = /^(\d+)(?:\.(\d+))?$/.exec(s))) { const f = m[2] || ''; return Q(BigInt(m[1] + f), 10n ** BigInt(f.length)); }
  throw new Error(`cannot parse "${s}"`);
}
const NUM = String.raw`\d+(?: \d+\/\d+|\/\d+|\.\d+)?`;
const FOUR_LEGGED = new Set(['cows', 'goats', 'rabbits', 'dogs']);

function solveLinear(s) {
  let m;
  if ((m = /multiplied by (\d+) is increased by (\d+)/.exec(s))) return div(Q(m[2]), Q(BigInt(m[1]) - 1n));
  if ((m = new RegExp(`when added to (${NUM}) and when multiplied by (${NUM})\\?`).exec(s))) { const r = num(m[2]); return div(num(m[1]), sub(r, Q(1))); }
  if ((m = new RegExp(`when (${NUM}) is added to it and when it is multiplied by (${NUM})\\?`).exec(s))) { const r = num(m[2]); return div(num(m[1]), sub(r, Q(1))); }
  if ((m = /multiplied by (\d+), the result is the number increased by the square/.exec(s))) return Q(BigInt(m[1]) - 1n);
  if ((m = /squares of two consecutive (natural numbers|odd integers|even integers) is (\d+)\. The (larger|smaller)/.exec(s))) {
    const D = BigInt(m[2]); const gap = m[1] === 'natural numbers' ? 1n : 2n;
    // (x + g)² − x² = 2gx + g² = D
    const x = (D - gap * gap) / (2n * gap);
    assert.equal(2n * gap * x + gap * gap, D);
    return Q(m[3] === 'larger' ? x + gap : x);
  }
  if ((m = /₹ (\d+) is distributed .* gets ₹ (\d+) more than .* What is (\w)'s share\?/.exec(s))) {
    // A = B + C, B = C + d, D = C: total = 5C + 2d
    const S = Q(m[1]); const d = Q(m[2]);
    const C = div(sub(S, mul(Q(2), d)), Q(5));
    return { A: add(add(C, d), C), B: add(C, d), C }[m[3]];
  }
  throw new Error(`unknown linear stem: ${s}`);
}

function solveTwoKinds(s) {
  let m;
  if ((m = /there are (\w+) as well as (\w+)\. If there are (\d+) heads and (\d+) legs, what is the ratio of the (\w+) to the (\w+)\?/.exec(s))) {
    const H = Number(m[3]); const L = Number(m[4]);
    const big = (L - 2 * H) / 2; const small = H - big;
    const cnt = (w) => (FOUR_LEGGED.has(w) ? big : small);
    const a = cnt(m[5]); const b = cnt(m[6]); const g = Number(bgcd(BigInt(a), BigInt(b)));
    return { text: `${a / g} : ${b / g}` };
  }
  if ((m = /heads is (\d+) and the total number of legs is (\d+)\. How many (\w+) are there\?/.exec(s))) {
    const H = Number(m[1]); const L = Number(m[2]); const big = (L - 2 * H) / 2;
    return { value: Q(FOUR_LEGGED.has(m[3]) ? big : H - big) };
  }
  if ((m = /number of legs is (\d+) more than twice the number of heads/.exec(s))) return { value: Q(Number(m[1]) / 2) };
  if ((m = /there are (\d+ paise|1 rupee) and (\d+ paise|1 rupee) coins\. The total number of coins is (\d+) and the total value is Rs\. ([\d.]+)\. The number of (\d+ paise|1 rupee) coins/.exec(s))) {
    const p = (t) => (t === '1 rupee' ? 100 : parseInt(t, 10));
    const hi = p(m[1]); const lo = p(m[2]); const N = Number(m[3]);
    const V = Number(mul(num(m[4]), Q(100)).n);
    const nHi = (V - N * lo) / (hi - lo);
    return { value: Q(p(m[5]) === hi ? nHi : N - nHi) };
  }
  if ((m = /cheque of ₹ (\d+) .* in (\d+) rupee notes and (\d+) rupee notes, (\d+) notes in all\. The number of (\d+) rupee notes/.exec(s))) {
    const V = Number(m[1]); const hi = Number(m[2]); const lo = Number(m[3]); const N = Number(m[4]);
    const nHi = (V - N * lo) / (hi - lo);
    return { value: Q(Number(m[5]) === hi ? nHi : N - nHi) };
  }
  if ((m = /There are (\d+) questions .* gets (\d+) marks? and (\d+) marks? (?:is|are) deducted .* scored (\d+)\./.exec(s))) {
    const [N, a, b, S] = m.slice(1, 5).map(Number);
    return { value: Q((S + b * N) / (a + b)) };
  }
  if ((m = /^(\d+) \w+ are distributed among (\d+) boys and girls such that each boy gets (\d+) \w+ and each girl gets (\d+) \w+\. The number of boys is$/.exec(s))) {
    const [tot, N, pb, pg] = m.slice(1, 5).map(Number);
    return { value: Q((tot - N * pg) / (pb - pg)) };
  }
  throw new Error(`unknown two-kinds stem: ${s}`);
}

function solveTwoNumbers(s) {
  let m;
  if ((m = new RegExp(`sum and difference of two numbers are (${NUM}) and (${NUM})`).exec(s)) || (m = new RegExp(`sum of two numbers is (${NUM}) and their difference is (${NUM})`).exec(s))) {
    const S = num(m[1]); const D = num(m[2]);
    return div(sub(mul(S, S), mul(D, D)), Q(4));
  }
  if ((m = /product of two numbers is (\d+) and their quotient is (\d+)\/(\d+)\. The (sum|difference)/.exec(s))) {
    const P = BigInt(m[1]); const a = BigInt(m[2]); const b = BigInt(m[3]);
    const k = isqrt(P / (a * b));
    assert.equal(a * b * k * k, P);
    return Q(m[4] === 'sum' ? (a + b) * k : babs(b - a) * k);
  }
  throw new Error(`unknown two-numbers stem: ${s}`);
}

function solvePairs(s) {
  const amounts = (txt) => [...txt.matchAll(/(\w+) and (\w+) together \w+ (?:₹ )?(\d+)/g)].map((m) => ({ who: [m[1], m[2]], v: Number(m[3]) }));
  const who = /(?:of|does) (\w+)(?: score)?\?$/.exec(s)[1];
  const sentences = s.split('. ');
  const totalM = /^\w+, \w+ and \w+ together \w+ (?:₹ )?(\d+)/.exec(sentences[0]);
  if (totalM) {
    const pairs = amounts(sentences.slice(1).join('. '));
    assert.equal(pairs.length, 2, s);
    assert.ok(pairs.every((p) => p.who.includes(who)), s);
    return Q(pairs[0].v + pairs[1].v - Number(totalM[1]));
  }
  const pairs = amounts(s);
  assert.equal(pairs.length, 3, s);
  const half = pairs.reduce((a, p) => a + p.v, 0) / 2;
  return Q(half - pairs.find((p) => !p.who.includes(who)).v);
}

const SOLVERS = {
  linear_equation_word: (q) => ({ value: solveLinear(q.stem.en) }),
  two_kinds_total: (q) => solveTwoKinds(q.stem.en),
  two_numbers_sum_diff_product: (q) => ({ value: solveTwoNumbers(q.stem.en) }),
  pairwise_totals: (q) => ({ value: solvePairs(q.stem.en) }),
};

test('solvers reproduce the PYQ keys', () => {
  assert.equal(solveTwoKinds('In an enclosure, there are crows as well as cows. If there are 30 heads and 100 legs, what is the ratio of the cows to the crows?').text, '2 : 1');
  assert.ok(eq(solveTwoKinds('There are 62 questions in a test. Each correct answer gets 2 marks and 1 mark is deducted for each wrong answer. Ramen attempted all the questions and scored 34. How many questions did Ramen answer correctly?').value, Q(32)));
  assert.ok(eq(solveTwoKinds('In a bag there are 50 paise and 25 paise coins. The total number of coins is 60 and the total value is Rs. 25. The number of 50 paise coins is').value, Q(40)));
  assert.ok(eq(solveTwoNumbers('The sum and difference of two numbers are 7.75 and 2.25 respectively. Then their product is'), num('13.75')));
  assert.ok(eq(solveTwoNumbers('The sum of two numbers is 16 1/3 and their difference is 3 2/3. Their product is'), num('63 1/3')));
  assert.ok(eq(solveTwoNumbers('The product of two numbers is 4332 and their quotient is 3/4. The sum of the numbers is'), Q(133)));
  assert.ok(eq(solveLinear('Which number gives the same result when added to 1 1/2 and when multiplied by 1 1/2?'), Q(3)));
  assert.ok(eq(solveLinear('The difference of the squares of two consecutive odd integers is 200. The smaller of them is'), Q(49)));
  assert.ok(eq(solveLinear('A sum of ₹ 750 is distributed among A, B, C and D in such a manner that A gets as much as B and C together, B gets ₹ 125 more than C, and D gets as much as C. What is A\'s share?'), Q(325)));
  assert.ok(eq(solvePairs('A, B and C together earn ₹ 300 per day. A and C together earn ₹ 188 per day, while B and C together earn ₹ 152 per day. What is the daily earning of C?'), Q(40)));
});

const BENGALI = /[ঀ-৿]/;
const DRAWS = 360;
for (const [pattern, [fn, kinds]] of Object.entries(gen.GENERATORS)) {
  test(`${pattern}: ${DRAWS}+ draws re-solved independently, 4 distinct options, Bengali, tags`, () => {
    seed(20261124);
    const stems = new Set();
    const perKind = Object.fromEntries(kinds.map((k) => [k, 0]));
    let made = 0;
    for (let i = 0; made < DRAWS && i < DRAWS * 60; i++) {
      const kind = kinds[i % kinds.length];
      const q = fn(kind);
      if (!q) continue;
      made++; perKind[kind]++;
      const s = q.stem.en;
      stems.add(s);
      assert.equal(q.pattern, pattern, s);
      assert.equal(q.subtopic, pattern, s);
      assert.equal(q.topic, 'algebra');
      assert.ok(q.difficulty >= 2 && q.difficulty <= 3, `difficulty ${q.difficulty}`);
      assert.ok(q.expected_time_sec >= 45 && q.expected_time_sec <= 90, `time ${q.expected_time_sec}`);
      assert.equal(q.options.length, 4, s);
      assert.equal(new Set(q.options.map((o) => o.text.en)).size, 4, s);
      assert.ok(q.options.every((o) => o.text.bn), s);
      assert.ok(BENGALI.test(q.stem.bn), `Bengali stem: ${q.stem.bn}`);
      assert.ok(q.solution.steps.length >= 2 && q.solution.steps.every((x) => x.en && x.bn) && q.solution.steps.some((x) => BENGALI.test(x.bn)), s);
      assert.ok(q.solution.shortcut?.en && q.solution.shortcut?.bn, s);
      assert.ok(q.solution.traps.length >= 1, `trap note: ${s}`);
      assert.ok(!/NaN|undefined|null|Infinity|\[object|\.\d{10,}/.test(JSON.stringify([q.stem, q.options, q.solution.steps])), `bad text: ${s}`);
      const correct = q.options.find((o) => o.oid === q.correct_option_id).text.en;
      const got = SOLVERS[pattern](q);
      if (got.text !== undefined) assert.equal(correct, got.text, s);
      else {
        assert.ok(eq(num(correct), got.value), `${s}\n  key ${correct}, solver ${got.value.n}/${got.value.d}`);
        for (const o of q.options.filter((x) => x.oid !== q.correct_option_id)) assert.ok(!eq(num(o.text.en), got.value), `distractor equals the answer: ${s}`);
      }
    }
    assert.ok(made >= DRAWS, `${pattern}: only ${made} questions`);
    assert.ok(stems.size >= 40, `${pattern}: only ${stems.size} distinct stems`);
    for (const k of kinds) assert.ok(perKind[k] > 0, `${pattern}/${k} never produced a question`);
  });
}

test('module shape and pattern docs', () => {
  assert.equal(gen.subject, 'quant');
  assert.equal(gen.topics[0].topic, 'algebra');
  const doc = loadPatterns().find(({ doc: d }) => d.subject === 'quant' && d.topic === 'algebra').doc;
  const keys = new Set(doc.patterns.map((p) => p.key));
  for (const k of Object.keys(gen.GENERATORS)) assert.ok(keys.has(k), `pattern doc has ${k}`);
  const map = require('../db/patterns/pyq_map/quant/algebra.json');
  for (const [code, k] of Object.entries(map)) assert.ok(keys.has(k), `${code} -> ${k}`);
  for (let i = 0; i < 50; i++) for (const g of gen.topics[0].gens) assert.ok(g(), 'wrapped generator yields a question');
});

test('pattern rules and PYQ maps point at real patterns', () => {
  assert.deepEqual(checkRules(), []);
});
