'use strict';

/**
 * Interest PYQ-type generators (scripts/generators/supplement/pyq_interest.js).
 * Every answer is re-solved by an independent solver that reads the numbers from the
 * English stem (compound rates and times by search, not by the generator's formulae).
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { seed } = require('../scripts/generators/common');
const gen = require('../scripts/generators/supplement/pyq_interest');
const { checkRules, loadPyqMap } = require('../src/services/patternTagger');
const doc = require('../db/patterns/quant/interest');

const g = (a, b) => (b ? g(b, a % b) : Math.abs(a));
const toInt = (s) => Number(s.replace(/,/g, ''));
const inr = (v) => `₹${v.toLocaleString('en-IN')}`;
const ratio = (a, b) => `${a / g(a, b)} : ${b / g(a, b)}`;
const years = (n) => `${n} year${n === 1 ? '' : 's'}`;
/** "12 1/2" -> 12.5 */
function parseMixed(s) {
  const m = /^(?:(\d+) )?(\d+)\/(\d+)$/.exec(s.trim());
  return m ? Number(m[1] || 0) + Number(m[2]) / Number(m[3]) : Number(s);
}
/** Whole-number annual rate r with P(1 + r/100)^n = A exactly (searched, not derived). */
function ciRate(P, A, n) {
  for (let r = 1; r <= 400; r++) if (P * (100 + r) ** n === A * 100 ** n) return r;
  return null;
}

function solve(s) {
  let m;
  if ((m = /same rate of interest for (\d+) years to that for (\d+) years/.exec(s))) return ratio(Number(m[1]), Number(m[2]));
  if ((m = /simple interest on ₹([\d,]+) for (\d+) years at (\d+)% per annum to the simple interest on ₹([\d,]+) for (\d+) years at (\d+)% per annum/.exec(s))) {
    return ratio(toInt(m[1]) * Number(m[2]) * Number(m[3]), toInt(m[4]) * Number(m[5]) * Number(m[6]));
  }
  if ((m = /simple interest on ₹([\d,]+) for (\d+) (years|months) at ([\d /]+)% per annum\?$/.exec(s))) {
    const t = Number(m[2]) / (m[3] === 'months' ? 12 : 1);
    return inr(Math.round((toInt(m[1]) * parseMixed(m[4]) * t) / 100 * 1e6) / 1e6);
  }
  if ((m = /amount on ₹([\d,]+) for (\d+) (years|months) at ([\d /]+)% per annum simple interest/.exec(s))) {
    const P = toInt(m[1]);
    const t = Number(m[2]) / (m[3] === 'months' ? 12 : 1);
    return inr(P + Math.round(((P * parseMixed(m[4]) * t) / 100) * 1e6) / 1e6);
  }
  if ((m = /A sum of ₹([\d,]+) amounts to ₹([\d,]+) in (\d) years at compound interest/.exec(s))) return `${ciRate(toInt(m[1]), toInt(m[2]), Number(m[3]))}%`;
  if ((m = /In what time will ₹([\d,]+) amount to ₹([\d,]+) at (\d+)% per annum/.exec(s))) {
    const [P, A, r] = [toInt(m[1]), toInt(m[2]), Number(m[3])];
    for (let n = 1; n <= 10; n++) if (P * (100 + r) ** n === A * 100 ** n) return years(n);
    return null;
  }
  if ((m = /A sum of ₹([\d,]+) becomes ₹([\d,]+) in (\d) years at compound interest/.exec(s))) return `${ciRate(toInt(m[1]), toInt(m[2]), Number(m[3]))}%`;
  if ((m = /(?:becomes|grows to) ([\d.]+) times (?:itself|its value) in (\d) years/.exec(s))) {
    // k = (1 + r/100)^n with k given to at most 6 decimals: search r over halves.
    const k = Number(m[1]);
    for (let r2 = 1; r2 <= 800; r2++) if (Math.abs((1 + r2 / 200) ** Number(m[2]) - k) < 1e-9) return `${r2 / 2}%`;
    return null;
  }
  if ((m = /becomes (double|three times|four times) itself in (\d+) years at compound interest\. In how many years will it become (\d+) times/.exec(s))) {
    const base = { double: 2, 'three times': 3, 'four times': 4 }[m[1]];
    let periods = 0;
    for (let v = 1; v < Number(m[3]); v *= base) periods++;
    return years(periods * Number(m[2]));
  }
  throw new Error(`no solver for: ${s}`);
}

const KINDS = {
  findSimpleInterest: ['find_simple_interest', ['years', 'months', 'ratioSame', 'ratioMixed']],
  ciRateFromAmount: ['ci_rate_from_amount', ['rate', 'time']],
  ciSumBecomesTimes: ['ci_sum_becomes_times', ['rate', 'time']],
};
const BENGALI = /[ঀ-৿]/;
const patternKeys = new Set(doc.patterns.map((p) => p.key));

test('the PYQ statements solve to their keyed answers (solver sanity)', () => {
  assert.equal(solve('What is the simple interest on ₹400 for 5 years at 6% per annum?'), '₹120');
  assert.equal(solve('In what time will ₹2,400 amount to ₹2,646 at 5% per annum, compounded annually?'), '2 years');
  assert.equal(solve('A sum of money becomes 27 times itself in 3 years at compound interest. What is the rate of interest per annum?'), '200%');
  assert.equal(solve('A sum of money becomes 4 times itself in 2 years at compound interest. What is the rate of interest per annum?'), '100%');
  assert.equal(solve('What is the ratio of the simple interest earned by a certain sum at the same rate of interest for 6 years to that for 9 years?'), '2 : 3');
  assert.equal(solve('A sum of money becomes double itself in 5 years at compound interest. In how many years will it become 8 times itself at the same rate?'), '15 years');
});

for (const [name, [pattern, kinds]] of Object.entries(KINDS)) {
  test(`${name}: answers re-solved from the stem, 4 distinct bilingual options, tagged ${pattern}`, () => {
    seed(20261124);
    assert.ok(patternKeys.has(pattern), `${pattern} is a pattern of interest.js`);
    const stems = new Set();
    const perKind = {};
    let made = 0;
    for (let i = 0; made < 400 && i < 40000; i++) {
      const kind = kinds[i % kinds.length];
      const q = gen[name](kind);
      if (!q) continue;
      made++;
      perKind[kind] = (perKind[kind] || 0) + 1;
      stems.add(q.stem.en);
      const correct = q.options.find((o) => o.oid === q.correct_option_id).text.en;
      assert.equal(correct, solve(q.stem.en), q.stem.en);
      assert.equal(q.options.length, 4, q.stem.en);
      assert.equal(new Set(q.options.map((o) => o.text.en)).size, 4, q.stem.en);
      assert.ok(q.options.every((o) => o.text.bn), 'Bengali option text');
      assert.ok(BENGALI.test(q.stem.bn), `Bengali stem: ${q.stem.bn}`);
      assert.ok(q.solution.steps.length >= 2 && q.solution.steps.every((st) => BENGALI.test(st.bn)), 'bilingual steps');
      assert.ok(q.solution.shortcut?.en && BENGALI.test(q.solution.shortcut.bn), 'shortcut');
      assert.ok(q.solution.traps.length >= 1 && q.solution.traps.every((t) => t.note.en && BENGALI.test(t.note.bn)), `trap notes: ${q.stem.en}`);
      assert.equal(q.pattern, pattern);
      assert.equal(q.subtopic, pattern);
      assert.equal(q.topic, 'interest');
      assert.ok([2, 3].includes(q.difficulty) && q.expected_time_sec >= 45 && q.expected_time_sec <= 90);
      assert.ok(!/\d\.\d{5,}/.test(JSON.stringify(q)), `no long decimals: ${q.stem.en}`);
      assert.ok(!/NaN|undefined|Infinity/.test(JSON.stringify(q)), q.stem.en);
    }
    assert.ok(made >= 400, `generated ${made}`);
    assert.ok(stems.size >= 40, `distinct stems ${stems.size}`);
    assert.deepEqual(kinds.filter((k) => !perKind[k]), [], 'every framing produces questions');
  });
}

test('module shape: every generator registered for the interest chapter', () => {
  assert.equal(gen.subject, 'quant');
  assert.equal(gen.topics.length, 1);
  assert.equal(gen.topics[0].topic, 'interest');
  assert.equal(gen.topics[0].gens.length, Object.keys(KINDS).length);
  for (const g0 of gen.topics[0].gens) assert.ok(g0(), 'registered generator yields a question');
});

test('pattern rules and PYQ map point at real patterns', () => {
  assert.deepEqual(checkRules(), []);
  const map = loadPyqMap('quant', 'interest');
  assert.equal(Object.keys(map).length, 24);
  for (const [code, key] of Object.entries(map)) assert.ok(patternKeys.has(key), `${code} -> ${key}`);
});
