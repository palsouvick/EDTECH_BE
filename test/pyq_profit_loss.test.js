'use strict';

/**
 * Profit & Loss PYQ-type generators (scripts/generators/supplement/pyq_profit_loss.js):
 * every answer is re-solved by an independent solver that reads the numbers from the
 * English stem, and the PYQ map / pattern rules point at real patterns.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { seed } = require('../scripts/generators/common');
const { GENERATORS } = require('../scripts/generators/supplement/pyq_profit_loss');
const { checkRules, loadPyqMap } = require('../src/services/patternTagger');
const { patterns, registry } = require('../db/patterns/quant/profit_loss');

// ── independent formatting (exact fractions) ─────────────────────────────────
const g = (a, b) => (b ? g(b, a % b) : Math.abs(a));
function pct(num, den) {
  if (den < 0) { num = -num; den = -den; }
  const k = g(Math.abs(num), den) || 1;
  const n = Math.abs(num) / k;
  const d = den / k;
  if (d === 1) return String(n);
  const w = Math.floor(n / d);
  return w ? `${w} ${n % d}/${d}` : `${n % d}/${d}`;
}
function label(num, den, word = 'profit') {
  if (num === 0) return 'No profit, no loss';
  return num * den > 0 ? `${pct(num, den)}% ${word}` : `${pct(num, den)}% loss`;
}
const nums = (s, re) => [...s.matchAll(re)].map((m) => Number(m[1]));
const rupeesIn = (s) => nums(s, /₹(\d+)/g);

// ── solvers, one per pattern ─────────────────────────────────────────────────
const SOLVE = {
  profit_loss_percent(s) {
    let cost;
    let sp;
    if (/repairs/.test(s)) {
      const [buy, rep, sell] = rupeesIn(s);
      cost = buy + rep;
      sp = sell;
      return label(100 * (sp - cost), cost, 'gain');
    }
    const kg = /buys (\d+) kg of \w+ at ₹(\d+) per kg\. (\d+) kg .* at ₹(\d+) per kg/.exec(s);
    if (kg) {
      const [q, a, w, b] = kg.slice(1).map(Number);
      cost = q * a;
      sp = (q - w) * b;
    } else [cost, sp] = rupeesIn(s);
    return label(100 * (sp - cost), cost);
  },
  cp_sp_ratio(s) {
    const onSp = /his (loss|profit) as (\d+)% of the selling price/.exec(s);
    if (onSp) {
      const x = Number(onSp[2]);
      return onSp[1] === 'loss' ? label(-100 * x, 100 + x) : label(100 * x, 100 - x);
    }
    const [p, q] = /(\d+) : (\d+)/.exec(s).slice(1).map(Number);
    const [cp, sp] = /cost price to the selling price/.test(s) ? [p, q] : [q, p];
    return label(100 * (sp - cp), cp);
  },
  two_selling_prices(s) {
    const r = rupeesIn(s);
    if (/twice the loss/.test(s)) return `₹${(r[0] + 2 * r[1]) / 3}`;
    if (/same as the loss/.test(s)) return `₹${(r[0] + r[1]) / 2}`;
    const drop = /by ₹(\d+), a gain of (\d+)% turns into a loss of (\d+)%/.exec(s);
    if (drop) {
      const [D, gain, loss] = drop.slice(1).map(Number);
      const cp = (D * 100) / (gain + loss);
      return `₹${/original selling price/.test(s) ? (cp * (100 + gain)) / 100 : cp}`;
    }
    const first = /for ₹(\d+), [A-Za-z ]+? (loses|gains) (\d+)%/.exec(s);
    const r1 = (first[2] === 'loses' ? -1 : 1) * Number(first[3]);
    const cp = (Number(first[1]) * 100) / (100 + r1);
    const red = /reduced to (\d+)%/.exec(s);
    const gain2 = /to gain (\d+)%/.exec(s);
    const lose2 = /to lose only (\d+)%/.exec(s);
    const r2 = red ? Number(red[1]) : gain2 ? Number(gain2[1]) : -Number(lose2[1]);
    return `₹${(cp * (100 + r2)) / 100}`;
  },
  buy_sell_count_rates(s) {
    const m = /bought (\d+) \w+ for ₹(\d+) and sold (\d+) \w+ for ₹(\d+)/.exec(s) || /at (\d+) for ₹(\d+) and sells them at (\d+) for ₹(\d+)/.exec(s);
    const [n, a, k, b] = m.slice(1).map(Number);
    // cost per article a/n, price per article b/k; per (n*k) articles: cost a*k, takings b*n
    return label(100 * (b * n - a * k), a * k, /fruit seller/.test(s) ? 'profit' : 'gain');
  },
  two_articles_find_cp(s) {
    const total = rupeesIn(s)[0];
    const swap = /first at (\d+)% profit and the second at (\d+)% profit\. Had .* got ₹(\d+) more/.exec(s);
    if (swap) {
      const [a, b, D] = swap.slice(1).map(Number);
      const diff = (100 * D) / (b - a);
      const first = (total + diff) / 2;
      return `₹${/of the first one/.test(s) ? first : total - first}`;
    }
    const [p, l] = /profit of (\d+)% and the other at a loss of (\d+)%/.exec(s).slice(1).map(Number);
    const og = /gained (\d+)%/.exec(s);
    const gain = og ? Number(og[1]) : 0;
    const cpProfit = (total * (gain + l)) / (p + l);
    return `₹${/sold at a profit\?/.test(s) ? cpProfit : total - cpProfit}`;
  },
  successive_discounts(s) {
    const add = /listed at ₹(\d+) and a discount of (\d+)% .* net price to ₹(\d+)/.exec(s);
    if (add) {
      const [L, d1, N] = add.slice(1).map(Number);
      const after = (L * (100 - d1)) / 100;
      return `${pct(100 * (after - N), after)}%`;
    }
    const [d1, d2] = nums(s, /(\d+)%/g);
    const N = rupeesIn(s)[0];
    return `₹${(N * 10000) / ((100 - d1) * (100 - d2))}`;
  },
  algebraic(s) {
    const S = rupeesIn(s)[0];
    const k = /twice the cost price/.test(s) ? 2 : /half the cost price/.test(s) ? 0.5 : 1;
    // k x^2 / 100 + x - S = 0, positive root
    const a = k / 100;
    const x = (-1 + Math.sqrt(1 + 4 * a * S)) / (2 * a);
    const xr = Math.round(x);
    assert.equal(xr + (k * xr * xr) / 100, S, s);
    return `₹${xr}`;
  },
};

test('solvers reproduce the PYQ answers', () => {
  assert.equal(SOLVE.two_selling_prices('By selling a table for ₹450, Amit loses 25%. At what price should he sell it to gain 25%?'), '₹750');
  assert.equal(SOLVE.two_selling_prices('By selling a bicycle for ₹2050, a shopkeeper gains 25%. If the profit is reduced to 10%, what will the selling price be?'), '₹1804');
  assert.equal(SOLVE.two_selling_prices('The profit earned by selling a fan for ₹1864 is the same as the loss incurred by selling it for ₹1490. What is the cost price of the fan?'), '₹1677');
  assert.equal(SOLVE.two_selling_prices('By reducing the selling price of a bookshelf by ₹2000, a gain of 10% turns into a loss of 10%. What was the original selling price of the bookshelf?'), '₹11000');
  assert.equal(SOLVE.buy_sell_count_rates('A fruit seller bought 15 apples for ₹12 and sold 12 apples for ₹15. Find his profit or loss per cent.'), '56 1/4% profit');
  assert.equal(SOLVE.buy_sell_count_rates('A fruit seller bought 11 apples for ₹10 and sold 10 apples for ₹11. Find his profit or loss per cent.'), '21% profit');
  assert.equal(SOLVE.cp_sp_ratio('A trader works out his loss as 15% of the selling price. What is his loss per cent on the cost price?'), '13 1/23% loss');
  assert.equal(SOLVE.cp_sp_ratio('The ratio of the cost price to the selling price of a pen is 10 : 11. Find the profit or loss per cent.'), '10% profit');
  assert.equal(SOLVE.two_articles_find_cp('Amit bought two watches for ₹560 in all. He sold one at a profit of 15% and the other at a loss of 10%, and on the whole he neither gained nor lost. What was the cost price of the one sold at a profit?'), '₹224');
  assert.equal(SOLVE.two_articles_find_cp('A shopkeeper bought two cycles for ₹1600 in total. He sold the first at 10% profit and the second at 20% profit. Had he sold the first at 20% profit and the second at 10% profit, he would have got ₹5 more. What was the cost price of the first one?'), '₹825');
  assert.equal(SOLVE.successive_discounts('A fan is listed at ₹1500 and a discount of 20% is offered on the list price. What additional discount must be offered to bring the net price to ₹1104?'), '8%');
  assert.equal(SOLVE.algebraic('A pen was sold for ₹144. If the percentage of profit was numerically equal to the cost price (in rupees), find the cost price.'), '₹80');
  assert.equal(SOLVE.profit_loss_percent('A shopkeeper buys a pen for ₹20 and sells it for ₹24. Find his profit or loss per cent.'), '20% profit');
});

const BENGALI = /[ঀ-৿]/;
const keys = new Set([...patterns.map((p) => p.key), ...registry.map((p) => p.id)]);

for (const [key, gen] of Object.entries(GENERATORS)) {
  test(`${key}: 300+ draws re-solved independently, 4 distinct options, bilingual, tagged`, () => {
    seed(20261124);
    assert.ok(keys.has(key), `${key} is a pattern of profit_loss.js`);
    const stems = new Set();
    let made = 0;
    for (let i = 0; i < 6000 && made < 400; i++) {
      const q = gen();
      if (!q) continue;
      made++;
      stems.add(q.stem.en);
      const correct = q.options.find((o) => o.oid === q.correct_option_id).text.en;
      assert.equal(correct, SOLVE[key](q.stem.en), q.stem.en);
      assert.equal(q.options.length, 4, q.stem.en);
      assert.equal(new Set(q.options.map((o) => o.text.en)).size, 4, q.stem.en);
      assert.ok(q.options.every((o) => o.text.bn), 'Bengali option text');
      assert.ok(BENGALI.test(q.stem.bn), `Bengali stem: ${q.stem.bn}`);
      assert.ok(q.solution.steps.length >= 2 && q.solution.steps.some((s) => BENGALI.test(s.bn)), 'Bengali steps');
      assert.ok(q.solution.shortcut?.en && q.solution.shortcut?.bn, 'shortcut');
      assert.ok(q.solution.traps.length >= 1, `at least one trap note: ${q.stem.en}`);
      assert.equal(q.pattern, key);
      assert.equal(q.subtopic, key);
      assert.equal(q.topic, 'profit_loss');
      assert.ok(q.difficulty >= 2 && q.difficulty <= 3, 'standard level');
      assert.ok(q.expected_time_sec >= 45 && q.expected_time_sec <= 90);
      const text = [q.stem.en, ...q.options.map((o) => o.text.en), ...q.solution.steps.map((s) => s.en)].join(' ');
      assert.ok(!/\d\.\d{2}/.test(text), `no long decimals: ${text}`);
    }
    assert.ok(made >= 300, `generated ${made}`);
    assert.ok(stems.size >= 40, `distinct stems ${stems.size}`);
  });
}

test('PYQ map and pattern rules point at real patterns', () => {
  assert.deepEqual(checkRules(), []);
  const map = loadPyqMap('quant', 'profit_loss');
  assert.ok(Object.keys(map).length >= 25);
  for (const k of Object.values(map)) assert.ok(keys.has(k), k);
});
