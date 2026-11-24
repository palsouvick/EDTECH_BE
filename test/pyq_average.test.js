'use strict';

/**
 * Average PYQ-type generators (scripts/generators/supplement/pyq_average.js): every
 * answer is re-solved from the numbers printed in the English stem (own arithmetic, own
 * fraction formatting), options are 4 distinct values, Bengali is present, pattern =
 * subtopic, and the PYQ map / match rules point at real pattern keys.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { seed } = require('../scripts/generators/common');
const gen = require('../scripts/generators/supplement/pyq_average');
const { checkRules } = require('../src/services/patternTagger');

const BN = /[ঀ-৿]/;
const correctText = (q) => q.options.find((o) => o.oid === q.correct_option_id).text.en;
const nums = (s) => [...s.matchAll(/\d+/g)].map((m) => Number(m[0]));
const g = (a, b) => (b ? g(b, a % b) : a);
function asMixed(p, q) {
  const d = g(p, q);
  const [n, m] = [p / d, q / d];
  if (m === 1) return String(n);
  return n > m ? `${Math.floor(n / m)} ${n % m}/${m}` : `${n}/${m}`;
}

function solveChange(stem) {
  let m;
  if ((m = /^Each of (\d+) numbers is multiplied by (\d+) and then decreased by (\d+)\. The average of the resulting numbers is (\d+)\./.exec(stem))) {
    const [, , k, sub, B] = m.map(Number);
    return String((B + sub) / k);
  }
  if ((m = /average marks of (\d+) students in a test is (\d+)\. .* awards (\d+) grace marks/.exec(stem))) return `${Number(m[2]) + Number(m[3])} marks`;
  if ((m = /average monthly salary of (\d+) workers of a factory is ₹(\d+)\. If the salary of every worker is doubled/.exec(stem))) return `₹${2 * Number(m[2])}`;
  if ((m = /average monthly salary of (\d+) workers of a factory is ₹(\d+)\. If every worker gets a raise of ₹(\d+)/.exec(stem))) return `₹${Number(m[2]) + Number(m[3])}`;
  const A = Number(/average of \d+ numbers is (\d+)/.exec(stem)[1]);
  if ((m = /first multiplied by (\d+) and then (\d+) is added/.exec(stem))) return String(A * Number(m[1]) + Number(m[2]));
  if ((m = /increased by (\d+)/.exec(stem))) return String(A + Number(m[1]));
  if ((m = /If (\d+) is subtracted from each number/.exec(stem))) return String(A - Number(m[1]));
  if ((m = /multiplied by (\d+)/.exec(stem))) return String(A * Number(m[1]));
  if ((m = /divided by (\d+)/.exec(stem))) return String(A / Number(m[1]));
  throw new Error(`unparsed: ${stem}`);
}

function solveSimple(stem) {
  let m;
  if ((m = /^The average of the first (\d+) prime numbers is$/.exec(stem))) {
    const ps = [];
    for (let x = 2; ps.length < Number(m[1]); x++) if (![...Array(x).keys()].slice(2).some((d) => x % d === 0)) ps.push(x);
    return asMixed(ps.reduce((a, b) => a + b, 0), ps.length);
  }
  if ((m = /average of all the prime numbers between 1 and (\d+)\?/.exec(stem))) {
    const ps = [];
    for (let x = 2; x < Number(m[1]); x++) if (![...Array(x).keys()].slice(2).some((d) => x % d === 0)) ps.push(x);
    return asMixed(ps.reduce((a, b) => a + b, 0), ps.length);
  }
  if ((m = /average of all the multiples of (\d+) between (\d+) and (\d+)\?/.exec(stem))) {
    const [k, lo, hi] = [m[1], m[2], m[3]].map(Number);
    const xs = [];
    for (let x = lo + 1; x < hi; x++) if (x % k === 0) xs.push(x);
    return asMixed(xs.reduce((a, b) => a + b, 0), xs.length);
  }
  if ((m = /scored ([\d, ]+) marks in (\d+) subjects/.exec(stem))) {
    const xs = nums(m[1]);
    assert.equal(xs.length, Number(m[2]));
    return asMixed(xs.reduce((a, b) => a + b, 0), xs.length);
  }
  const [n, a] = nums(stem);
  if (/kg/.test(stem)) return `${n * a} kg`;
  if (/₹/.test(stem)) return `₹${n * a}`;
  if (/runs/.test(stem)) return `${n * a} runs`;
  return String(n * a);
}

function solveMissing(stem) {
  let m;
  if ((m = /^The average of ([\dX, ]+) is (\d+)\. The value of X is$/.exec(stem))) {
    const items = m[1].split(', ');
    const known = items.filter((x) => x !== 'X').map(Number);
    return String(items.length * Number(m[2]) - known.reduce((a, b) => a + b, 0));
  }
  if ((m = /scored ([\d, ]+) marks in (\d+) tests\. .* average of all (\d+) tests (\d+)\?/.exec(stem))) {
    const xs = nums(m[1]);
    return `${Number(m[3]) * Number(m[4]) - xs.reduce((a, b) => a + b, 0)} marks`;
  }
  const [n, A, n1, B] = nums(stem);
  assert.equal(n1, n - 1);
  return String(n * A - n1 * B);
}

function solveMess(stem) {
  const [n] = nums(stem);
  const j = Number(/(?:increases by|When) (\d+)(?: new members| more persons|,)/.exec(stem)[1]);
  const R = Number(/goes up by ₹(\d+)/.exec(stem)[1]);
  const d = Number(/goes down by ₹(\d+)/.exec(stem)[1]);
  for (let x = d + 1; x < 1000; x++) {
    if ((n + j) * (x - d) !== n * x + R) continue;
    if (/original total/.test(stem)) return `₹${n * x}`;
    if (/original average/.test(stem)) return `₹${x}`;
    return `₹${(n + j) * (x - d)}`;
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
  assert.equal(q.topic, 'average');
  assert.ok(q.difficulty >= 2 && q.difficulty <= 3);
  assert.ok(q.expected_time_sec >= 30 && q.expected_time_sec <= 90);
  assert.ok(!/\d\.\d/.test(q.options.map((o) => o.text.en).join(' ')), `no decimals in options: ${q.stem.en}`);
  assert.ok(!/\d\.\d{2}/.test(q.solution.steps.map((s) => s.en).join(' ')), `no recurring decimals in the working: ${q.stem.en}`);
}

test('PYQ numbers: ×12 of avg 7 -> 84; +5 of avg 20 -> 25; first nine primes -> 11 1/9; 15,18,X,…=16 -> 10; hostel 35+7, ₹42, ₹1 -> ₹420', () => {
  assert.equal(solveChange('The average of 10 numbers is 7. If each number is multiplied by 12, then the average of the new set of numbers is'), '84');
  assert.equal(solveChange('The average of 10 numbers is 20. If each number is increased by 5, the new average is'), '25');
  assert.equal(solveSimple('The average of the first 9 prime numbers is'), '11 1/9');
  assert.equal(solveSimple('If the average of 6 numbers is 17, what is their sum?'), '102');
  assert.equal(solveMissing('The average of 15, 18, X, 14, 21, 26, 8, 16 is 16. The value of X is'), '10');
  assert.equal(solveMess('There were 35 students in a hostel. When the number of students increases by 7, the daily expenditure goes up by ₹42, but the average expenditure per head goes down by ₹1. What was the original total daily expenditure?'), '₹420');
});

for (const [name, fn, kinds, solve] of [
  ['uniform_change_average', gen.uniformChangeAverage, gen.CHANGE_KINDS, solveChange],
  ['simple_average', gen.simpleAverage, gen.SIMPLE_KINDS, solveSimple],
  ['missing_value', gen.missingValue, gen.MISSING_KINDS, solveMissing],
  ['mess_expenditure_change', gen.messExpenditureChange, gen.MESS_SETTINGS, solveMess],
]) {
  test(`${name}: 300+ draws re-solved independently, every framing used, 40+ distinct stems`, () => {
    seed(20261124);
    const stems = new Set();
    const framings = new Set();
    let made = 0;
    for (let i = 0; i < 4000 && made < 400; i++) {
      const kind = kinds[i % kinds.length];
      const q = fn(kind);
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
  assert.equal(gen.topics[0].topic, 'average');
  seed(7);
  for (const g0 of gen.topics[0].gens) {
    let q = null;
    for (let i = 0; i < 300 && !q; i++) q = g0();
    assert.ok(q, 'every registered generator yields a question');
  }
  assert.deepEqual(checkRules(), []);
});
