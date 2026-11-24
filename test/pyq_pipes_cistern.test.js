'use strict';

/** PYQ-gap generators for Pipes & Cistern, re-solved independently from the stem numbers. */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { seed } = require('../scripts/generators/common');
const gen = require('../scripts/generators/supplement/pyq_pipes_cistern');
const { checkRules } = require('../src/services/patternTagger');

const g = (a, b) => (b ? g(b, a % b) : Math.abs(a));
const F = (n, d = 1) => { const k = g(n, d) * Math.sign(d); return [n / k, d / k]; };
function show([n, d]) {
  if (d === 1) return String(n);
  const w = Math.trunc(n / d);
  return w ? `${w} ${n % d}/${d}` : `${n}/${d}`;
}
const START = { 'half full': [1, 2], 'one-third full': [1, 3], 'two-thirds full': [2, 3], 'one-fourth full': [1, 4], 'three-fourths full': [3, 4], 'two-fifths full': [2, 5] };

const SOLVERS = {
  two_filling_pipes(s) {
    const t = [...s.matchAll(/in (\d+) (minutes|hours)/g)].map((m) => [Number(m[1]), m[2]]);
    const unit = t[0][1];
    if (/together fill it in/.test(s)) { const [[a], [tt]] = t; return `${show(F(a * tt, a - tt))} ${unit}`; }
    const [[a], [b]] = t;
    return `${show(F(a * b, a + b))} ${unit}`;
  },
  part_then_outlet(s) {
    const [, fill, unit] = /can fill an empty \w+(?: \w+)? in (\d+) (minutes|hours)/.exec(s);
    const [, emp] = /can empty the full \w+(?: \w+)? in (\d+)/.exec(s);
    const [p, q] = START[/is already ([a-z-]+ full)/.exec(s)[1]];
    const a = Number(fill); const b = Number(emp);
    // signed: + fills. level goes from p/q to 0 (empty) or 1 (full)
    const net = F(b - a, a * b); // 1/a − 1/b
    const need = /be empty/.test(s) ? F(-p, q) : F(q - p, q);
    const t = F(need[0] * net[1], need[1] * net[0]);
    assert.ok(t[0] > 0, 'reachable');
    return `${show(t)} ${unit}`;
  },
};

test('the solvers reproduce the PYQ answers', () => {
  assert.equal(SOLVERS.two_filling_pipes('A tap can fill a cistern in 20 minutes and another tap can fill it in 30 minutes. If both taps are opened together, in how much time will the cistern be full?'), '12 minutes');
  assert.equal(SOLVERS.two_filling_pipes('A tap can fill a tank in 9 hours and another tap can fill it in 12 hours. If both taps are opened together, in how much time will the tank be full?'), '5 1/7 hours');
  assert.equal(SOLVERS.part_then_outlet('A tap can fill an empty reservoir in 45 minutes; another tap can empty the full reservoir in 30 minutes. When the reservoir is already half full, both taps are opened together. In how much time will the reservoir be empty?'), '45 minutes');
  assert.equal(SOLVERS.part_then_outlet('A tap can fill an empty reservoir in 20 minutes; another tap can empty the full reservoir in 15 minutes. When the reservoir is already half full, both taps are opened together. In how much time will the reservoir be empty?'), '30 minutes');
});

for (const [name, pattern] of [['twoPipes', 'two_filling_pipes'], ['partThenOutlet', 'part_then_outlet']]) {
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
      assert.ok(!/(?:ট্যাঙ্ক|জলাধার|মিনিট)(?:র|য়)\b/.test(q.stem.bn + q.solution.steps.map((s) => s.bn).join(' ')), `Bengali case endings: ${q.stem.bn}`);
      assert.ok(q.solution.shortcut?.en && q.solution.traps.length >= 1);
      assert.equal(q.pattern, pattern);
      assert.equal(q.subtopic, pattern);
      assert.equal(q.topic, 'pipes_cistern');
      assert.ok(q.difficulty >= 2 && q.difficulty <= 3);
    }
    assert.ok(made >= 300);
    assert.deepEqual([...seen].sort(), [...framings].sort());
    assert.ok(stems.size >= 40, `distinct ${stems.size}`);
  });
}

test('module shape, rules and PYQ map', () => {
  assert.equal(gen.topics[0].topic, 'pipes_cistern');
  seed(9);
  for (const fn of gen.topics[0].gens) assert.ok(fn());
  assert.deepEqual(checkRules(), []);
  const map = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/patterns/pyq_map/quant/pipes_cistern.json'), 'utf8'));
  assert.equal(Object.keys(map).length, 8);
});
