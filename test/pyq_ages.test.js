'use strict';

/**
 * Ages PYQ-type generators (scripts/generators/supplement/pyq_ages.js): every answer is
 * re-solved by brute force from the numbers printed in the English stem, options are 4
 * distinct values, Bengali is present, and pattern = subtopic. The PYQ map and match
 * rules must point at real pattern keys.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { seed } = require('../scripts/generators/common');
const gen = require('../scripts/generators/supplement/pyq_ages');
const { checkRules } = require('../src/services/patternTagger');

const BN = /[ঀ-৿]/;
const correctText = (q) => q.options.find((o) => o.oid === q.correct_option_id).text.en;
const years = (v) => `${v} years`;

/** age_gaps_and_total: brute-force the youngest age. */
function solveGaps(stem) {
  let m;
  if ((m = /older than his elder son by (\d+) years, and the elder son is older than the younger son by (\d+) years\. If the sum of the ages of all three is (\d+) years, find the age of the (father|elder son|younger son)\./.exec(stem))
    || (m = /grandmother is (\d+) years older than the mother, and the mother is (\d+) years older than the granddaughter\. If the sum of the ages of all three is (\d+) years, find the age of the (grandmother|mother|granddaughter)\./.exec(stem))) {
    const [g1, g2, S] = [m[1], m[2], m[3]].map(Number);
    for (let low = 1; low < 100; low++) {
      const mid = low + g2;
      const top = mid + g1;
      if (top + mid + low === S) return years({ father: top, 'elder son': mid, 'younger son': low, grandmother: top, mother: mid, granddaughter: low }[m[4]]);
    }
    return null;
  }
  if ((m = /^(\w+) is (\d+) years older than (\w+) but (\d+) years younger than (\w+)\. The total of the ages of .* is (\d+) years\. How old is (\w+)\?$/.exec(stem))) {
    const [, X, g1, Y, g2, Z, S, who] = m;
    for (let x = 1; x < 120; x++) {
      const age = { [X]: x, [Y]: x - Number(g1), [Z]: x + Number(g2) };
      if (age[X] + age[Y] + age[Z] === Number(S)) return years(age[who]);
    }
    return null;
  }
  // two people
  let older; let younger; let g;
  if ((m = /^(\w+) is senior to (\w+) by (\d+) years/.exec(stem))) [, older, younger, g] = m;
  else if ((m = /^(\w+) is (\d+) years older than (\w+)/.exec(stem))) [, older, g, younger] = m;
  else if ((m = /^(\w+) is (\d+) years younger than (\w+)/.exec(stem))) [, younger, g, older] = m;
  const S = Number(/sum of their ages is (\d+) years/.exec(stem)[1]);
  const who = /what is the age of (\w+)\?/.exec(stem)[1];
  for (let y = 1; y < 100; y++) if (2 * y + Number(g) === S) return years(who === older ? y + Number(g) : y);
  return null;
}

/** three_person_ratio: brute-force the ratio multiplier k. */
function solveRatio(stem) {
  let m;
  if ((m = /father, a mother and their son is (\d+) : (\d+) : (\d+)\. When the son attains the present age of his father, the sum of their ages will be (\d+) years\. What is the present age of the (father|mother|son)\?/.exec(stem))) {
    const [f, mo, s, S] = [1, 2, 3, 4].map((i) => Number(m[i]));
    for (let k = 1; k < 50; k++) {
      const wait = f * k - s * k;
      if (f * k + mo * k + s * k + 3 * wait === S) return years({ father: f * k, mother: mo * k, son: s * k }[m[5]]);
    }
    return null;
  }
  const r = /(\d+) : (\d+) : (\d+)/.exec(stem).slice(1).map(Number);
  const ordIdx = { first: 0, second: 1, third: 2 };
  let people = null;
  const pm = /ages of (\w+), (\w+) and (\w+) (?:is|are)/.exec(stem);
  if (pm) people = pm.slice(1, 4);
  const idx = (name) => (people ? people.indexOf(name) : ordIdx[name]);
  const tryK = (ok, ask) => { for (let k = 1; k < 60; k++) if (ok(r.map((x) => x * k))) return years(r[ask] * k); return null; };

  if ((m = /If the sum of the ages of (\w+) and (\w+) is (\d+) years, the age of (\w+) is$/.exec(stem))) {
    const [i, j, S, a] = [idx(m[1]), idx(m[2]), Number(m[3]), idx(m[4])];
    return tryK((ag) => ag[i] + ag[j] === S, a);
  }
  if ((m = /The sum of the ages of (\w+) and (\w+) exceeds (twice the age|the age) of (\w+) by (\d+) years\. Find the age of (\w+)\./.exec(stem))
    || (m = /The sum of the ages of the (\w+) and the (\w+) exceeds (twice the age|the age) of the (\w+) person by (\d+) years\. The age of the (\w+) person is$/.exec(stem))) {
    const [i, j, mult, q, d, a] = [idx(m[1]), idx(m[2]), m[3].startsWith('twice') ? 2 : 1, idx(m[4]), Number(m[5]), idx(m[6])];
    return tryK((ag) => ag[i] + ag[j] - mult * ag[q] === d, a);
  }
  if ((m = /(\d+) years ago, the sum of their ages was (\d+) years\./.exec(stem)) || (m = /After (\d+) years, the sum of their ages will be (\d+) years\./.exec(stem))) {
    const n = Number(m[1]) * (/ago/.test(m[0]) ? -1 : 1);
    const S = Number(m[2]);
    const a = idx(/present age of (\w+)\?/.exec(stem)[1]);
    return tryK((ag) => ag.reduce((x, y) => x + y + n, 0) === S, a);
  }
  if ((m = /(\w+) is (\d+) years older than (\w+)\. What is the age of (\w+)\?/.exec(stem))) {
    const [hi, d, lo, a] = [idx(m[1]), Number(m[2]), idx(m[3]), idx(m[4])];
    return tryK((ag) => ag[hi] - ag[lo] === d, a);
  }
  throw new Error(`unparsed: ${stem}`);
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
  assert.equal(q.topic, 'ages');
  assert.ok(q.difficulty >= 2 && q.difficulty <= 3);
  assert.ok(q.expected_time_sec >= 45 && q.expected_time_sec <= 90);
  assert.ok(!/\d\.\d/.test(q.options.map((o) => o.text.en).join(' ')), `whole-number options: ${q.stem.en}`);
}

test('PYQ numbers: Arun/Barun 6 and 54 -> 24; father/sons 30, 10, 95 -> 55; 5:8:9 with A+C=56 -> 32; 6:5:1 and 135 -> 25', () => {
  assert.equal(solveGaps('Arun is senior to Barun by 6 years. If the sum of their ages is 54 years, what is the age of Barun?'), '24 years');
  assert.equal(solveGaps('A father is older than his elder son by 30 years, and the elder son is older than the younger son by 10 years. If the sum of the ages of all three is 95 years, find the age of the father.'), '55 years');
  assert.equal(solveRatio('The ratio of the ages of A, B and C is 5 : 8 : 9. If the sum of the ages of A and C is 56 years, the age of B is'), '32 years');
  assert.equal(solveRatio('The ratio of the ages of three persons is 7 : 5 : 4. The sum of the ages of the first and the third exceeds twice the age of the second person by 5 years. The age of the second person is'), '25 years');
  assert.equal(solveRatio('The ratio of the present ages of a father, a mother and their son is 6 : 5 : 1. When the son attains the present age of his father, the sum of their ages will be 135 years. What is the present age of the mother?'), '25 years');
});

for (const [name, fn, kinds, solve, pattern] of [
  ['age_gaps_and_total', gen.ageGapsAndTotal, gen.GAP_FRAMINGS, solveGaps, 'age_gaps_and_total'],
  ['three_person_ratio', gen.threePersonRatio, gen.RATIO_FRAMINGS, solveRatio, 'three_person_ratio'],
]) {
  test(`${name}: 300+ draws re-solved independently, every framing used, 40+ distinct stems`, () => {
    seed(20261124);
    const stems = new Set();
    const framings = new Set();
    let made = 0;
    for (let i = 0; i < 1500 && made < 400; i++) {
      const kind = kinds[i % kinds.length];
      const q = fn(kind);
      if (!q) continue;
      made++;
      framings.add(kind);
      stems.add(q.stem.en);
      check(q, solve, pattern);
    }
    assert.ok(made >= 300, `generated ${made}`);
    assert.equal(framings.size, kinds.length, 'every framing produces questions');
    assert.ok(stems.size >= 40, `distinct stems ${stems.size}`);
  });
}

test('module shape and pattern rules', () => {
  assert.equal(gen.subject, 'quant');
  assert.equal(gen.topics[0].topic, 'ages');
  seed(7);
  for (const g of gen.topics[0].gens) {
    let q = null;
    for (let i = 0; i < 200 && !q; i++) q = g();
    assert.ok(q, 'every registered generator yields a question');
  }
  assert.deepEqual(checkRules(), []);
});
