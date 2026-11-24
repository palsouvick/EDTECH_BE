'use strict';

/**
 * Simplification PYQ-gap generators (scripts/generators/supplement/pyq_simplification.js).
 * Every draw is re-solved from the numbers printed in the English stem by an independent
 * exact-rational evaluator (BigInt) — none of the generator's own maths is imported.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { seed } = require('../scripts/generators/common');
const gen = require('../scripts/generators/supplement/pyq_simplification');
const { checkRules } = require('../src/services/patternTagger');
const { loadPatterns } = require('../db/patterns');

// ── exact rationals ────────────────────────────────────────────
const babs = (x) => (x < 0n ? -x : x);
const bgcd = (a, b) => { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a; };
function Q(n, d = 1n) {
  n = BigInt(n); d = BigInt(d);
  if (d === 0n) throw new Error('division by zero');
  if (d < 0n) { n = -n; d = -d; }
  const g = bgcd(n, d) || 1n;
  return { n: n / g, d: d / g };
}
const add = (a, b) => Q(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a, b) => Q(a.n * b.d - b.n * a.d, a.d * b.d);
const mul = (a, b) => Q(a.n * b.n, a.d * b.d);
const div = (a, b) => Q(a.n * b.d, a.d * b.n);
const eq = (a, b) => a.n === b.n && a.d === b.d;
const cmp = (a, b) => (a.n * b.d < b.n * a.d ? -1 : a.n * b.d > b.n * a.d ? 1 : 0);
function iroot(x, k) { // exact integer k-th root of BigInt x >= 0, or null
  if (x < 0n) return k % 2 ? (iroot(-x, k) === null ? null : -iroot(-x, k)) : null;
  let r = BigInt(Math.round(Number(x) ** (1 / k)));
  for (const c of [r - 1n, r, r + 1n]) if (c >= 0n && c ** BigInt(k) === x) return c;
  return null;
}
function qroot(a, k) {
  const n = iroot(a.n, k); const d = iroot(a.d, k);
  if (n === null || d === null) throw new Error(`inexact root of ${a.n}/${a.d}`);
  return Q(n, d);
}
const qpow = (a, p) => { let r = Q(1); for (let i = 0; i < p; i++) r = mul(r, a); return r; };
/** "₹ 1 2/3", "−0.027", "15/4", "12" -> rational. */
function parseNum(s) {
  s = s.replace(/₹|Rs\.|runs|kg|marks/g, '').replace(/−/g, '-').trim();
  let m;
  if ((m = /^(-?)(\d+) (\d+)\/(\d+)$/.exec(s))) { const v = add(Q(m[2]), Q(m[3], m[4])); return m[1] ? Q(-v.n, v.d) : v; }
  if ((m = /^(-?\d+)\/(\d+)$/.exec(s))) return Q(m[1], m[2]);
  if ((m = /^(-?)(\d+)(?:\.(\d+))?$/.exec(s))) {
    const frac = m[3] || '';
    const v = Q(BigInt(m[2] + frac), 10n ** BigInt(frac.length));
    return m[1] ? Q(-v.n, v.d) : v;
  }
  throw new Error(`cannot parse number "${s}"`);
}

// ── expression evaluator: + − × ÷ /, "of", brackets, √ ∛, ², ³, ^(p/q), mixed numbers ──
function tokenize(str) {
  const s = str.replace(/−/g, '-');
  const out = [];
  let i = 0;
  while (i < s.length) {
    const rest = s.slice(i);
    let m;
    if (/^\s/.test(rest)) { i++; continue; }
    if ((m = /^(\d+) (\d+)\/(\d+)/.exec(rest))) { out.push({ num: add(Q(m[1]), Q(m[2], m[3])) }); i += m[0].length; continue; }
    if ((m = /^(\d+)\/(\d+)/.exec(rest))) { out.push({ num: Q(m[1], m[2]) }); i += m[0].length; continue; }
    if ((m = /^(\d+)(?:\.(\d+))?/.exec(rest))) { out.push({ num: parseNum(m[0]) }); i += m[0].length; continue; }
    if ((m = /^of\b/.exec(rest))) { out.push({ op: 'of' }); i += 2; continue; }
    const c = s[i];
    if ('+-×÷/()[]{}√∛²³^'.includes(c)) { out.push({ op: c }); i++; continue; }
    throw new Error(`bad token at "${rest}" in "${str}"`);
  }
  return out;
}
function evaluate(str) {
  const t = tokenize(str);
  let p = 0;
  const peek = () => t[p]?.op;
  const OPEN = { '(': ')', '[': ']', '{': '}' };
  function primary() {
    const tok = t[p++];
    if (!tok) throw new Error(`unexpected end in "${str}"`);
    if (tok.num) return tok.num;
    if (OPEN[tok.op]) { const v = expr(); if (t[p++]?.op !== OPEN[tok.op]) throw new Error(`unbalanced in "${str}"`); return v; }
    throw new Error(`unexpected ${tok.op} in "${str}"`);
  }
  function prefix() {
    if (peek() === '√') { p++; return qroot(prefix(), 2); }
    if (peek() === '∛') { p++; return qroot(prefix(), 3); }
    return primary();
  }
  function power() {
    let v = prefix();
    for (;;) {
      if (peek() === '²') { p++; v = qpow(v, 2); } else if (peek() === '³') { p++; v = qpow(v, 3); } else if (peek() === '^') {
        p++; const e = primary();
        v = qpow(qroot(v, Number(e.d)), Number(e.n));
      } else return v;
    }
  }
  function unary() { if (peek() === '-') { p++; const v = unary(); return Q(-v.n, v.d); } return power(); }
  function ofTerm() { let v = unary(); while (peek() === 'of') { p++; v = mul(v, unary()); } return v; }
  function term() {
    let v = ofTerm();
    for (;;) {
      const o = peek();
      if (o === '×') { p++; v = mul(v, ofTerm()); } else if (o === '÷' || o === '/') { p++; v = div(v, ofTerm()); } else return v;
    }
  }
  function expr() {
    let v = term();
    for (;;) { const o = peek(); if (o === '+') { p++; v = add(v, term()); } else if (o === '-') { p++; v = sub(v, term()); } else return v; }
  }
  const v = expr();
  if (p !== t.length) throw new Error(`trailing tokens in "${str}"`);
  return v;
}

// ── independent solvers, one per pattern (English stem -> expected value or option text) ──
const between = (s, a, b) => { const i = s.indexOf(a); const j = s.lastIndexOf(b); assert.ok(i >= 0 && j > i, `cannot cut "${s}"`); return s.slice(i + a.length, j); };
const fracs = (s) => [...s.matchAll(/(\d+)\/(\d+)/g)].map((m) => Q(m[1], m[2]));

function solveFractionWord(s) {
  let m;
  if ((m = /, (\d+\/\d+) of the .* If (\d+\/\d+) of the .* and (\d+\/\d+) of the .* is (present|absent)\?$/.exec(s))) {
    const [pa, a, b] = [m[1], m[2], m[3]].map(parseNum);
    const absent = add(mul(pa, a), mul(sub(Q(1), pa), b));
    return m[4] === 'present' ? sub(Q(1), absent) : absent;
  }
  if ((m = /^(\d+\/\d+) of a \w+ holds (\d+) .* contains (\d+) /.exec(s))) return div(mul(Q(m[3]), parseNum(m[1])), Q(m[2]));
  if ((m = /^(\d+\/\d+) of which sum is equal to (.+) times ₹ (\d+)\?$/.exec(s))) return div(mul(parseNum(m[2]), Q(m[3])), parseNum(m[1]));
  if ((m = /group of (\d+) people, (\d+\/\d+) .* only, (\d+\/\d+) .* only/.exec(s))) {
    const both = sub(sub(Q(1), parseNum(m[2])), parseNum(m[3]));
    return /How many people/.test(s) ? mul(both, Q(m[1])) : both;
  }
  if ((m = /spends (\d+\/\d+) of \w+ monthly income on food and (\d+\/\d+) of (the remaining|it) on rent.*₹ (\d+)/.exec(s))) {
    const a = parseNum(m[1]); const b = parseNum(m[2]);
    const left = m[3] === 'it' ? sub(sub(Q(1), a), b) : mul(sub(Q(1), a), sub(Q(1), b));
    return div(Q(m[4]), left);
  }
  throw new Error(`unknown fraction stem: ${s}`);
}

/** Defined operation "a * b = ...": build it from the printed rule only. */
function definedOp(rule) {
  const js = (rhs) => rhs.replace(/−/g, '-').replace(/ab/g, '(a*b)').replace(/a²/g, '(a*a)').replace(/(\d)([ab])/g, '$1*$2');
  if (/ if /.test(rule)) {
    const clauses = rule.split(/, and |, /).map((c) => /a \* b = (.+) if a ([<>=]) b/.exec(c));
    const fns = clauses.map((c) => ({ f: new Function('a', 'b', `return ${js(c[1])};`), rel: c[2] }));
    return (a, b) => fns.find(({ rel }) => (rel === '<' ? a < b : rel === '>' ? a > b : a === b)).f(a, b);
  }
  return new Function('a', 'b', `return ${js(/a \* b = (.+)$/.exec(rule)[1])};`);
}
function evalDefined(expr, op) {
  const t = expr.match(/\d+|[*+()]/g); let p = 0;
  const prim = () => { const x = t[p++]; if (x === '(') { const v = sum(); p++; return v; } return Number(x); };
  const star = () => { let v = prim(); while (t[p] === '*') { p++; v = op(v, prim()); } return v; };
  const sum = () => { let v = star(); while (t[p] === '+') { p++; v = v + star(); } return v; };
  return sum();
}
const WORD = { plus: '+', minus: '-', 'multiplied by': '×', 'divided by': '÷' };
function solveSymbols(s, optionTexts) {
  if (s.startsWith('If ‘')) {
    const map = Object.fromEntries([...s.matchAll(/‘(.+?)’ means ‘(.+?)’/g)].map((m) => [m[1], WORD[m[2]]]));
    const expr = between(s, 'value of ', '?').split(' ').map((tok, i) => (i % 2 ? map[tok] : tok)).join(' ');
    return { value: evaluate(expr) };
  }
  if (s.startsWith('Suppose')) {
    const rule = between(s, 'Suppose ', '. Find');
    return { value: Q(evalDefined(between(s, 'value of ', '.'), definedOp(rule))) };
  }
  const [lhs, rhs] = s.slice(s.indexOf('? ') + 2).split(' = ');
  const target = Q(rhs);
  const toks = lhs.split(' ');
  const works = optionTexts.filter((o) => {
    let swapped;
    if (/ and /.test(o)) {
      const [x, y] = o.split(' and ');
      swapped = toks.map((tk) => (tk === x ? y : tk === y ? x : tk));
    } else {
      const [x, y] = o.split(', ');
      swapped = toks.map((tk) => (tk === x ? y : tk === y ? x : tk));
    }
    try { return eq(evaluate(swapped.join(' ')), target); } catch { return false; }
  });
  assert.equal(works.length, 1, `exactly one option should work: ${s} | ${optionTexts}`);
  return { text: works[0] };
}

function squarefree(n) {
  let out = 1n; let x = BigInt(n);
  for (let p = 2n; p * p <= x; p++) { let e = 0; while (x % p === 0n) { x /= p; e++; } if (e % 2) out *= p; }
  return out * x;
}
function solvePerfectSquare(s) {
  const m = /(\d+(?:\.\d+)?)/.exec(s);
  const N = parseNum(m[1]);
  if (/multiplied|divided/.test(s)) return Q(squarefree(N.n));
  const scale = N.d === 1n ? 1n : 100n;
  const v = N.n * (scale / N.d);
  let k = iroot(v, 2) ?? BigInt(Math.floor(Math.sqrt(Number(v))));
  while (k * k > v) k--; while ((k + 1n) * (k + 1n) <= v) k++;
  const ans = /subtracted/.test(s) ? v - k * k : (k + 1n) * (k + 1n) - v;
  return Q(ans, scale);
}
function solveRoots(s) {
  let m;
  if ((m = /^The (square|cube) root of ([\d.]+) is$/.exec(s))) return evaluate(`${m[1] === 'square' ? '√' : '∛'}${m[2]}`);
  if ((m = /collects ₹ (\d+)|plants (\d+) trees|^(\d+) soldiers/.exec(s))) return qroot(Q(m[1] || m[2] || m[3]), 2);
  if (s.startsWith('The value of ')) return evaluate(between(s, 'The value of ', ' is'));
  return evaluate(s.replace(/ = \?$/, ''));
}
function solveMixedMissing(s) {
  if (s.startsWith('Simplify: ')) return evaluate(s.slice(10));
  const eqn = s.startsWith('If ') ? s.slice(3, s.indexOf(',')) : s;
  const [l, r] = eqn.split(' = ');
  const f = (x) => sub(evaluate(l.replace('?', x)), evaluate(r));
  const f0 = f('0'); const f1 = f('1');
  return div(Q(-f0.n, f0.d), sub(f1, f0));
}

const SOLVERS = {
  fraction_word_problem: (q) => ({ value: solveFractionWord(q.stem.en) }),
  near_whole_mixed_multiply: (q) => ({ value: evaluate(between(q.stem.en, 'The value of ', ' is')) }),
  symbol_operations: (q) => solveSymbols(q.stem.en, q.options.map((o) => o.text.en)),
  perfect_square_adjust: (q) => ({ value: solvePerfectSquare(q.stem.en) }),
  square_cube_roots: (q) => ({ value: solveRoots(q.stem.en) }),
  algebraic_identities: (q) => ({ value: evaluate(between(q.stem.en, 'The simplified value of ', ' is')) }),
  mixed_fraction_operations: (q) => ({ value: solveMixedMissing(q.stem.en) }),
  fraction_chain_of: (q) => ({ value: evaluate(q.stem.en.startsWith('Find') ? between(q.stem.en, 'Find the value of ', '.') : q.stem.en.replace(/ = \?$/, '')) }),
  decimal_squares_cubes: (q) => ({ value: evaluate(q.stem.en.startsWith('Find') ? between(q.stem.en, 'Find the value of ', '.') : between(q.stem.en, 'The value of ', ' is')) }),
  surds_indices_laws: (q) => {
    const s = q.stem.en;
    if (s.startsWith('Of ')) {
      const list = between(s, 'Of ', ', which').replace(' and ', ', ').split(', ');
      const vals = list.map((x) => ({ x, v: evaluate(x) }));
      const best = vals.reduce((a, b) => ((/greatest/.test(s) ? cmp(b.v, a.v) > 0 : cmp(b.v, a.v) < 0) ? b : a));
      return { text: best.x };
    }
    return { value: evaluate(s.startsWith('Simplify: ') ? s.slice(10) : between(s, 'Find the value of ', '.')) };
  },
};

test('evaluator sanity on the PYQ numbers', () => {
  assert.ok(eq(evaluate('999 995/999 × 999'), Q(998996)));
  assert.ok(eq(evaluate('1/5 + 999 494/495 × 99'), Q(99000)));
  assert.ok(eq(evaluate('9 − 1 2/9 of 3 3/11 ÷ 5 1/7 of 7/9'), Q(8)));
  assert.ok(eq(evaluate('√(0.01 + √0.0064) + √0.16'), parseNum('0.7')));
  assert.ok(eq(evaluate('(2.3 × 2.3 × 2.3 − 0.027) / (2.3 × 2.3 + 0.69 + 0.09)'), Q(2)));
  assert.ok(eq(evaluate('(−3)³ × (−1/3)³ × (0.3)³'), parseNum('0.027')));
  assert.ok(eq(evaluate('(0.008)^(1/3)'), parseNum('0.2')));
  assert.ok(eq(solveMixedMissing('If 20 1/2 + 30 1/3 − ? = 35 2/3, then the value of ? is'), parseNum('15 1/6')));
  assert.ok(eq(solvePerfectSquare('The least positive integer which must be subtracted from 11100 to make it a perfect square is'), Q(75)));
  assert.ok(eq(solvePerfectSquare('The smallest number to be added to 4.65 so that the sum may be a perfect square is'), parseNum('0.19')));
  assert.ok(eq(solvePerfectSquare('Find the smallest number by which 5808 should be multiplied so that the product becomes a perfect square.'), Q(3)));
  assert.ok(eq(solveSymbols("If ‘<’ means ‘minus’, ‘>’ means ‘plus’, ‘=’ means ‘multiplied by’ and ‘@’ means ‘divided by’, then what is the value of 27 > 81 @ 9 < 6?").value, Q(30)));
  assert.ok(eq(solveSymbols('Suppose a * b = a + b if a < b, a * b = a − b if a > b, and a * b = 2a if a = b. Find the value of 5 * (7 * 2) + (5 * 7) * 2.').value, Q(20)));
  assert.equal(solveSymbols('Which of the following interchanges of numbers would make the given equation correct? 8 × 20 ÷ 3 + 9 − 5 = 38', ['3, 8', '8, 9', '3, 5', '3, 9']).text, '3, 5');
  assert.ok(eq(solveFractionWord('In a class, 3/5 of the students are girls and the rest are boys. If 2/9 of the girls and 1/4 of the boys are absent, what part of the total number of students is present?'), Q(23, 30)));
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
      stems.add(q.stem.en);
      const s = q.stem.en;
      assert.equal(q.pattern, pattern, s);
      assert.equal(q.subtopic, pattern, s);
      assert.equal(q.topic, 'simplification');
      assert.ok(q.difficulty >= 2 && q.difficulty <= 3, `difficulty ${q.difficulty}`);
      assert.ok(q.expected_time_sec >= 45 && q.expected_time_sec <= 90, `time ${q.expected_time_sec}`);
      assert.equal(q.options.length, 4, s);
      assert.equal(new Set(q.options.map((o) => o.text.en)).size, 4, s);
      assert.ok(q.options.every((o) => o.text.bn), s);
      assert.ok(BENGALI.test(q.stem.bn), `Bengali stem: ${q.stem.bn}`);
      assert.ok(q.solution.steps.length >= 2 && q.solution.steps.every((x) => x.en && x.bn) && q.solution.steps.some((x) => BENGALI.test(x.bn)), s);
      assert.ok(q.solution.shortcut?.en && q.solution.shortcut?.bn, s);
      const all = JSON.stringify(q);
      assert.ok(!/NaN|undefined|null|Infinity|\[object/.test(JSON.stringify([q.stem, q.options, q.solution.steps])), `bad text: ${all.slice(0, 300)}`);
      assert.ok(!/\.\d{10,}/.test(JSON.stringify([q.stem, q.options, q.solution.steps])), `float noise in text: ${s}`);
      assert.ok(q.solution.traps.length >= 1, `trap note: ${s}`);
      const correct = q.options.find((o) => o.oid === q.correct_option_id).text.en;
      const got = SOLVERS[pattern](q);
      if (got.text !== undefined) assert.equal(correct, got.text, s);
      else {
        assert.ok(eq(parseNum(correct), got.value), `${s}\n  key ${correct}, solver ${got.value.n}/${got.value.d}`);
        const others = q.options.filter((o) => o.oid !== q.correct_option_id).map((o) => o.text.en);
        for (const o of others) { let v; try { v = parseNum(o); } catch { continue; } assert.ok(!eq(v, got.value), `distractor equals the answer: ${s}`); }
      }
    }
    assert.ok(made >= DRAWS, `${pattern}: only ${made} questions`);
    assert.ok(stems.size >= 40, `${pattern}: only ${stems.size} distinct stems`);
    for (const k of kinds) assert.ok(perKind[k] > 0, `${pattern}/${k} never produced a question`);
  });
}

test('module shape and pattern docs', () => {
  assert.equal(gen.subject, 'quant');
  assert.equal(gen.topics[0].topic, 'simplification');
  assert.ok(gen.topics[0].gens.length >= Object.keys(gen.GENERATORS).length);
  const doc = loadPatterns().find(({ doc: d }) => d.subject === 'quant' && d.topic === 'simplification').doc;
  const keys = new Set(doc.patterns.map((p) => p.key));
  for (const k of Object.keys(gen.GENERATORS)) assert.ok(keys.has(k), `pattern doc has ${k}`);
  for (const k of ['bodmas_order', 'nested_brackets', 'mixed_fraction_operations', 'fraction_chain_of']) assert.ok(keys.has(k), `Stuck diagnosis key ${k} kept`);
  const map = require('../db/patterns/pyq_map/quant/simplification.json');
  for (const [code, k] of Object.entries(map)) assert.ok(keys.has(k), `${code} -> ${k}`);
});

test('pattern rules and PYQ maps point at real patterns', () => {
  assert.deepEqual(checkRules(), []);
});
