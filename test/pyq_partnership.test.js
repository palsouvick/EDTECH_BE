'use strict';

/** PYQ-gap generators for Partnership, re-solved independently from the stem numbers. */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { seed } = require('../scripts/generators/common');
const gen = require('../scripts/generators/supplement/pyq_partnership');
const { checkRules } = require('../src/services/patternTagger');

const one = (re, s) => { const m = re.exec(s); assert.ok(m, `no ${re} in: ${s}`); return m.slice(1); };
const rs = (x) => { assert.ok(Number.isInteger(x), `whole rupees: ${x}`); return `₹${x}`; };
const LABEL = { '1½': 3 / 2, '2½': 5 / 2, '1⅓': 4 / 3, '1¼': 5 / 4, 2: 2, 3: 3 };
const WORD = { Twice: 2, Thrice: 3, 'Four times': 4, 'Five times': 5, twice: 2, thrice: 3, 'four times': 4, 'five times': 5 };
const share = (weights, idx, amount) => (amount * weights[idx]) / weights.reduce((a, b) => a + b);

const SOLVERS = {
  charity_then_divide(s) {
    const first = s.split(' ')[0];
    let w;
    if (/in the ratio (\d+) : (\d+)/.test(s)) w = one(/in the ratio (\d+) : (\d+)/, s).map(Number);
    else w = one(/invests ₹(\d+) and \w+ invests ₹(\d+)/, s).map(Number);
    const [c] = one(/(\d+)% of the (?:total )?profit/, s).map(Number);
    if (/what is the total profit/.test(s)) {
      const [sa] = one(/share is ₹(\d+)/, s).map(Number);
      return rs(Math.round(((sa * (w[0] + w[1])) / w[0]) * 100 / (100 - c) * 1e6) / 1e6);
    }
    const [P] = one(/the profit is ₹(\d+)/, s).map(Number);
    const who = one(/What is (\w+)'s share/, s)[0];
    return rs(Math.round(share(w, who === first ? 0 : 1, (P * (100 - c)) / 100) * 1e6) / 1e6);
  },
  capital_relation_share(s, fw) {
    let w; let amount; let idx;
    if (fw === 'paid_times') {
      const [cost, sold] = one(/for ₹(\d+) and sold it for ₹(\d+)/, s).map(Number);
      const [n1, lab, n2] = one(/purchase (\w+) paid (\S+) times as much as (\w+)\./, s);
      const who = one(/How much did (\w+) receive/, s)[0];
      w = [LABEL[lab], 1]; amount = sold - cost; idx = who === n1 ? 0 : 1; void n2;
    } else if (fw === 'times_chain') {
      const [, k] = one(/(\w) invests (\d+) times as much as (\w)/, s);
      const [m, n] = one(/invests (\d+)\/(\d+) of what/, s).map(Number);
      const r = n; const q = m; const p = Number(k) * m; // R = n, Q = m, P = k m
      w = [p, q, r]; amount = Number(one(/profit is ₹(\d+)/, s)[0]);
      const names = one(/^(\w), (\w) and (\w)/, s);
      idx = names.indexOf(one(/share of (\w)\?/, s)[0]);
    } else {
      const [wa, wb] = one(/\. (\w+(?: times)?) the capital of \w equals (\w+(?: times)?) the capital/, s);
      const [k] = one(/is (\d+) times the capital of/, s).map(Number);
      const a = WORD[wa]; const b = WORD[wb];
      w = [b * k, a * k, a]; // aX = bY, Y = kZ
      amount = Number(one(/profit earned is ₹(\d+)/, s)[0]);
      const names = one(/^(\w), (\w) and (\w)/, s);
      idx = names.indexOf(one(/share of (\w)\?/, s)[0]);
    }
    return rs(Math.round(share(w, idx, amount) * 1e6) / 1e6);
  },
  loss_distribution(s, fw) {
    let w; let idx;
    const [L] = one(/loss of ₹(\d+)/, s).map(Number);
    if (fw === 'three_capitals') {
      w = one(/with ₹(\d+), ₹(\d+) and ₹(\d+) respectively/, s).map(Number);
      const names = one(/^(\w+), (\w+) and (\w+) started/, s);
      idx = names.indexOf(one(/How much did (\w+) lose/, s)[0]);
    } else {
      const [ca] = one(/business with ₹(\d+)\./, s).map(Number);
      const [after, , cb] = one(/After (\d+) months (\w+) joins with ₹(\d+)/, s);
      w = [ca * 12, Number(cb) * (12 - Number(after))];
      idx = one(/What is (\w+)'s share/, s)[0] === s.split(' ')[0] ? 0 : 1;
    }
    return rs(Math.round(share(w, idx, L) * 1e6) / 1e6);
  },
};

test('the solvers reproduce the PYQ answers', () => {
  assert.equal(SOLVERS.charity_then_divide('A and B invest in a business in the ratio 3 : 2. 5% of the total profit goes to charity and the rest is shared in the ratio of their investments. If A\'s share is ₹855, what is the total profit?'), '₹1500');
  assert.equal(SOLVERS.capital_relation_share('P, Q and R start a business. P invests 3 times as much as Q, and Q invests 2/3 of what R invests. If the total profit is ₹1320, what is the share of P?', 'times_chain'), '₹720');
  assert.equal(SOLVERS.capital_relation_share('X, Y and Z are business partners. Twice the capital of X equals thrice the capital of Y, and the capital of Y is 4 times the capital of Z. If the profit earned is ₹297000, what is the share of Y?', 'equation_chain'), '₹108000');
  assert.equal(SOLVERS.capital_relation_share('Jadu and Madhu together bought a car for ₹25000 and sold it for ₹26250. At the time of purchase Jadu paid 1½ times as much as Madhu. How much did Madhu receive out of the profit?', 'paid_times'), '₹500');
  assert.equal(SOLVERS.loss_distribution('A, B and C started a business with ₹1500, ₹1000 and ₹1750 respectively as capital. At the end of the year there was a loss of ₹425. How much did C lose?', 'three_capitals'), '₹175');
});

for (const [name, pattern] of [['charity', 'charity_then_divide'], ['capitalRelation', 'capital_relation_share'], ['lossShare', 'loss_distribution']]) {
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
      const fw = q.concept_tags.at(-1);
      seen.add(fw);
      stems.add(q.stem.en);
      const correct = q.options.find((o) => o.oid === q.correct_option_id).text.en;
      assert.equal(correct, SOLVERS[pattern](q.stem.en, fw), q.stem.en);
      assert.equal(new Set(q.options.map((o) => o.text.en)).size, 4, q.stem.en);
      assert.ok(q.options.every((o) => o.text.bn) && /[ঀ-৿]/.test(q.stem.bn));
      assert.ok(q.solution.steps.length >= 2 && q.solution.steps.every((s) => /[ঀ-৿]/.test(s.bn)));
      assert.ok(q.solution.shortcut?.en && q.solution.traps.length >= 1);
      assert.equal(q.pattern, pattern);
      assert.equal(q.subtopic, pattern);
      assert.equal(q.topic, 'partnership');
      assert.ok(q.difficulty >= 2 && q.difficulty <= 3);
    }
    assert.ok(made >= 300);
    assert.deepEqual([...seen].sort(), [...framings].sort());
    assert.ok(stems.size >= 40, `distinct ${stems.size}`);
  });
}

test('module shape, rules and PYQ map', () => {
  assert.equal(gen.topics[0].topic, 'partnership');
  seed(9);
  for (const fn of gen.topics[0].gens) assert.ok(fn());
  assert.deepEqual(checkRules(), []);
  const map = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/patterns/pyq_map/quant/partnership.json'), 'utf8'));
  assert.equal(Object.keys(map).length, 8);
});
