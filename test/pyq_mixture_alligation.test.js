'use strict';

/** PYQ-gap generators for Mixture & Alligation, re-solved independently from the stem numbers. */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { seed } = require('../scripts/generators/common');
const gen = require('../scripts/generators/supplement/pyq_mixture_alligation');
const { checkRules } = require('../src/services/patternTagger');

const g = (a, b) => (b ? g(b, a % b) : Math.abs(a));
const one = (re, s) => { const m = re.exec(s); assert.ok(m, `no ${re} in: ${s}`); return m.slice(1).map(Number); };
function num(x) { // exact for halves/quarters/fifths, as the options print them
  const r = Math.round(x * 1e6) / 1e6;
  assert.ok(Number.isInteger(r * 20), `not a short decimal: ${x}`);
  return String(r);
}

const SOLVERS = {
  mixing_two_mixtures(s) {
    const r = [...s.matchAll(/(\d+) : (\d+)/g)].map((m) => [Number(m[1]), Number(m[2])]);
    const [r1, r2] = r;
    const rt = /equal quantities/.test(s) ? [1, 1] : r[2];
    // x·a1/(a1+b1) + y·a2/(a2+b2) = (x + y)·at/(at+bt)  ->  x/y = (f2 − ft)/(ft − f1), in integers:
    const s1 = r1[0] + r1[1]; const s2 = r2[0] + r2[1]; const st = rt[0] + rt[1];
    let x = r2[0] * st - rt[0] * s2; let y = rt[0] * s1 - r1[0] * st; // scaled by s2·st and s1·st
    x *= s1; y *= s2;
    if (x < 0) { x = -x; y = -y; }
    const k = g(x, y);
    return `${x / k} : ${y / k}`;
  },
  add_pure_or_evaporate(s) {
    const [W] = one(/^(\d+)/, s); const [p] = one(/(\d+)% \w+/, s); const [q] = one(/(\d+)% \w+(?: in the solution)?\?/, s);
    const unit = /litres/.test(s) ? 'litres' : 'gm';
    if (/evaporated/.test(s)) return `${num(W - (W * p) / q)} ${unit}`;
    return `${num((W * (100 - p)) / (100 - q) - W)} ${unit}`;
  },
  dilution_target_concentration(s) {
    const [W] = one(/(\d+)-(?:litre|gram) mixture/, s);
    const unit = /-litre/.test(s) ? 'litres' : 'gm';
    if (/percentage of water/.test(s)) {
      const [w] = one(/water is (\d+)%/, s); const [x] = one(/If (\d+) /, s);
      return `${num(((W * w) / 100 + x) / (W + x) * 100)}%`;
    }
    const [p] = one(/contains (\d+)%/, s); const [q] = one(/down to (\d+)%/, s);
    return `${num((W * p) / q - W)} ${unit}`;
  },
};

test('the solvers reproduce the PYQ answers', () => {
  assert.equal(SOLVERS.mixing_two_mixtures('In one mixture the ratio of first liquid to second liquid is 2 : 3, and in another it is 5 : 4. In what ratio should the two be mixed so that the new mixture contains equal quantities of the two?'), '5 : 9');
  assert.equal(SOLVERS.mixing_two_mixtures('In two blends of tea, the ratios of Darjeeling tea and Assam tea are 2 : 7 and 1 : 5 respectively. In what ratio should these two be mixed so that the ratio of Darjeeling tea and Assam tea in the new blend is 1 : 4?'), '3 : 2');
  assert.equal(SOLVERS.add_pure_or_evaporate('300 gm of sugar solution has 40% sugar in it. How much sugar should be added to make it 50% sugar in the solution?'), '60 gm');
  assert.equal(SOLVERS.add_pure_or_evaporate('150 gm of sugar solution has 20% sugar in it. How much sugar should be added to make it 25% sugar in the solution?'), '10 gm');
  assert.equal(SOLVERS.dilution_target_concentration('In a 60-gram mixture of milk and water, the proportion of water is 75%. If 15 gm of water is added to it, what will be the percentage of water in the new mixture?'), '80%');
});

for (const [name, pattern] of [['mixTwo', 'mixing_two_mixtures'], ['addPure', 'add_pure_or_evaporate'], ['dilution', 'dilution_target_concentration']]) {
  test(`${pattern}: 300+ draws re-solved independently, 4 distinct options, Bengali, tagged`, () => {
    seed(20261124);
    const framings = gen.FRAMINGS[name];
    const seen = new Set();
    const stems = new Set();
    let made = 0;
    for (let i = 0; made < 360 && i < 20000; i++) {
      const q = gen[name](framings[i % framings.length]);
      if (!q) continue;
      made++;
      seen.add(q.concept_tags.at(-1));
      stems.add(q.stem.en);
      const correct = q.options.find((o) => o.oid === q.correct_option_id).text.en;
      assert.equal(correct, SOLVERS[pattern](q.stem.en), q.stem.en);
      assert.equal(new Set(q.options.map((o) => o.text.en)).size, 4, q.stem.en);
      assert.ok(q.options.every((o) => o.text.bn) && /[ঀ-৿]/.test(q.stem.bn));
      assert.ok(q.solution.steps.length >= 2 && q.solution.steps.every((s) => /[ঀ-৿]/.test(s.bn)));
      assert.ok(q.solution.shortcut?.en && q.solution.traps.length >= 1);
      assert.equal(q.pattern, pattern);
      assert.equal(q.subtopic, pattern);
      assert.equal(q.topic, 'mixture_alligation');
      assert.ok(q.difficulty >= 2 && q.difficulty <= 3);
    }
    assert.ok(made >= 300);
    assert.deepEqual([...seen].sort(), [...framings].sort());
    assert.ok(stems.size >= 40, `distinct ${stems.size}`);
  });
}

test('module shape, rules and PYQ map', () => {
  assert.equal(gen.topics[0].topic, 'mixture_alligation');
  seed(9);
  for (const fn of gen.topics[0].gens) assert.ok(fn());
  assert.deepEqual(checkRules(), []);
  const map = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/patterns/pyq_map/quant/mixture_alligation.json'), 'utf8'));
  assert.equal(Object.keys(map).length, 7);
});
