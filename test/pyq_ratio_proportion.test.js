'use strict';

/**
 * Ratio & Proportion PYQ-type generators (scripts/generators/supplement/pyq_ratio_proportion.js):
 * every answer is re-solved by an independent solver that reads the numbers from the
 * English stem, and the PYQ map / pattern rules point at real patterns.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { seed } = require('../scripts/generators/common');
const { GENERATORS } = require('../scripts/generators/supplement/pyq_ratio_proportion');
const { checkRules, loadPyqMap } = require('../src/services/patternTagger');
const { patterns } = require('../db/patterns/quant/ratio_proportion');

const g = (a, b) => (b ? g(b, a % b) : Math.abs(a));
const ratioOf = (...xs) => {
  const k = xs.reduce((acc, x) => g(acc, x), 0);
  return xs.map((x) => x / k).join(' : ');
};
/** Whole number from a float that must be (almost) integral. */
function whole(v, s) {
  const r = Math.round(v);
  assert.ok(Math.abs(v - r) < 1e-9, `not a whole number (${v}) for: ${s}`);
  return r;
}
/** "40%" | "0.75" | "2/3" -> [num, den]. */
function part(tok) {
  if (tok.endsWith('%')) return [Number(tok.slice(0, -1)), 100];
  if (tok.includes('/')) return tok.split('/').map(Number);
  const dec = tok.split('.')[1];
  return [Number(dec), 10 ** dec.length];
}
const val = ([n, d]) => n / d;
/** Ratio of quantities x_i where part_i × x_i are all equal: x_i ∝ den_i / num_i. */
function inverseRatio(parts) {
  const prod = parts.reduce((acc, [n]) => acc * n, 1);
  return ratioOf(...parts.map(([n, d]) => (d * prod) / n));
}
const coinPaise = (tok) => (tok.startsWith('₹') ? 100 * Number(tok.slice(1)) : Number(tok.split(' ')[0]));

const SOLVE = {
  equal_parts_ratio(s) {
    let m = /greater than Q by (\d+)% and greater than R by (\d+)%/.exec(s);
    if (m) return ratioOf(100 + Number(m[2]), 100 + Number(m[1]));
    m = /^(?:If )?(\S+) of (?:A|a number) is equal to (\S+) of (?:B|another number)/.exec(s);
    if (m) return inverseRatio([part(m[1]), part(m[2])]);
    m = /If (\S+) of P = (\S+) of Q = (\S+) of R/.exec(s);
    if (m) return inverseRatio([part(m[1]), part(m[2]), part(m[3])]);
    m = /weights of (\w+) and (\w+) is (\d+) kg\. (\S+) of \w+'s weight is equal to (\S+) of \w+'s weight\. Find the weight of (\w+)/.exec(s);
    if (m) {
      const total = Number(m[3]);
      const fa = val(part(m[4]));
      const fb = val(part(m[5]));
      const a = (total * fb) / (fa + fb); // a·fa = b·fb, a + b = total
      return `${whole(m[6] === m[1] ? a : total - a, s)} kg`;
    }
    const total = Number(/₹(\d+)/.exec(s)[1]);
    const who = /Find (\w+)'s share/.exec(s)[1];
    m = /(\d+) times (\w+)'s share, (\d+) times (\w+)'s share and (\d+) times (\w+)'s share/.exec(s);
    let weights;
    let people;
    if (m) {
      weights = [1 / m[1], 1 / m[3], 1 / m[5]];
      people = [m[2], m[4], m[6]];
    } else {
      m = /1\/(\d+) of (\w+)'s share, 1\/(\d+) of (\w+)'s share and 1\/(\d+) of (\w+)'s share/.exec(s);
      weights = [Number(m[1]), Number(m[3]), Number(m[5])];
      people = [m[2], m[4], m[6]];
    }
    const sum = weights.reduce((a, b) => a + b, 0);
    return `₹${whole((total * weights[people.indexOf(who)]) / sum, s)}`;
  },
  fraction_ratio(s) {
    const dens = [.../ratio ((?:1\/\d+(?: : )?)+)/.exec(s)[1].matchAll(/1\/(\d+)/g)].map((x) => Number(x[1]));
    const inv = dens.map((d) => 1 / d);
    const sum = inv.reduce((a, b) => a + b, 0);
    let m = /perimeter is (\d+) cm\. Find the length of the (longest|shortest)/.exec(s);
    if (m) {
      const pick = m[2] === 'longest' ? Math.max(...inv) : Math.min(...inv);
      return `${whole((Number(m[1]) * pick) / sum, s)} cm`;
    }
    m = /₹(\d+) is divided among (\w+), (\w+) and (\w+) .* How much does (\w+) get/.exec(s);
    if (m) {
      const i = [m[2], m[3], m[4]].indexOf(m[5]);
      return `₹${whole((Number(m[1]) * inv[i]) / sum, s)}`;
    }
    // least total: scale by the LCM, cancel the common factor
    const L = dens.reduce((a, b) => (a * b) / g(a, b), 1);
    const ints = dens.map((d) => L / d);
    const k = ints.reduce((a, b) => g(a, b), 0);
    return String(ints.reduce((a, b) => a + b, 0) / k);
  },
  add_component_new_ratio(s) {
    let m = /ratio (\d+) : (\d+) : (\d+)\. How much zinc should be added to (\d+) kg of it to make the ratio (\d+) : (\d+) : (\d+)/.exec(s);
    if (m) {
      const [a, b, c, W, p, q] = m.slice(1, 7).map(Number);
      const copper = (W * a) / (a + b + c);
      const zinc = (W * b) / (a + b + c);
      return `${whole((copper * q) / p - zinc, s)} kg`;
    }
    const unitM = /^In (\d+) (kg|g|litres) of/.exec(s);
    const W = Number(/(\d+)/.exec(s)[1]);
    m = /(\w+) and (\w+) are in the ratio (\d+) : (\d+)/.exec(s) || /ratio of (\w+) to (\w+) is (\d+) : (\d+)/.exec(s);
    const [first, second] = [m[1], m[2]];
    const [a, b] = [Number(m[3]), Number(m[4])];
    const added = (/How much (\w+) must/.exec(s) || /How many more (\w+) must/.exec(s))[1];
    const [p, q] = /(\d+) : (\d+)\?$/.exec(s).slice(1).map(Number);
    const A = (W * a) / (a + b);
    const B = (W * b) / (a + b);
    const amount = added === first ? (B * p) / q - A : (A * q) / p - B;
    assert.ok([first, second].includes(added), s);
    return `${whole(amount, s)}${unitM ? ` ${unitM[2]}` : ''}`;
  },
  variation_direct_inverse(s) {
    let m = /food for (\d+) days for (\d+) men\. After (\d+) days, (\d+) men (left|joined)/.exec(s);
    if (m) {
      const [D, M, t, L] = m.slice(1, 5).map(Number);
      return `${whole((M * (D - t)) / (m[5] === 'left' ? M - L : M + L), s)} days`;
    }
    m = /produce (\d+) machine parts .* is (\d+) : (\d+)/.exec(s);
    if (m) return String(whole((Number(m[1]) * Number(m[3])) / Number(m[2]), s));
    m = /If (\d+) metres of cloth cost ₹(\d+), what will (\d+) metres/.exec(s);
    if (m) return `₹${whole((Number(m[2]) / Number(m[1])) * Number(m[3]), s)}`;
    m = /side (\d+) m produces (\d+) kg .* side (\d+) m/.exec(s);
    if (m) return `${whole((Number(m[2]) * Number(m[3]) ** 2) / Number(m[1]) ** 2, s)} kg`;
    m = /(\d+) workers can build a wall in (\d+) days\. In how many days can (\d+) workers/.exec(s);
    return `${whole((Number(m[1]) * Number(m[2])) / Number(m[3]), s)} days`;
  },
  transfer_ratio(s) {
    let m = /Of (\d+) examinees .* is (\d+) : (\d+)\. If (\d+) more/.exec(s);
    if (m) {
      const [N, a, b, k] = m.slice(1).map(Number);
      const P = (N * a) / (a + b);
      return ratioOf(P + k, N - P - k);
    }
    m = /ratio (\d+) : (\d+), and together they have ₹(\d+)/.exec(s);
    const [a, b, Tot] = m.slice(1).map(Number);
    const A = (Tot * a) / (a + b);
    const tgt = /becomes (\d+) : (\d+)/.exec(s);
    const endA = tgt ? (Tot * Number(tgt[1])) / (Number(tgt[1]) + Number(tgt[2])) : Tot / 2;
    return `₹${whole(A - endA, s)}`;
  },
  mean_proportional(s) {
    let m = /between 1\/(\d+) and 1\/(\d+)/.exec(s);
    if (m) return `1/${whole(Math.sqrt(Number(m[1]) * Number(m[2])), s)}`;
    m = /between (\d+) and (\d+)/.exec(s) || /If (\d+), x and (\d+) are/.exec(s);
    if (m) return String(whole(Math.sqrt(Number(m[1]) * Number(m[2])), s));
    m = /continued proportion is (\d+)\./.exec(s);
    return String(whole(Math.cbrt(Number(m[1])), s));
  },
  coins_value_ratio(s) {
    const list = /(?:equal number of|numbers of) (.+?) coins/.exec(s)[1];
    const toks = list.split(/, | and /);
    const paise = toks.map(coinPaise);
    const V = 100 * Number(/total value is ₹(\d+)/.exec(s)[1]);
    if (/equal number/.test(s)) return String(whole(V / paise.reduce((a, b) => a + b, 0), s));
    const r = /ratio (\d+) : (\d+) : (\d+)/.exec(s).slice(1).map(Number);
    const x = V / (r[0] * paise[0] + r[1] * paise[1] + r[2] * paise[2]);
    const who = toks.indexOf(/How many (.+?) coins are there/.exec(s)[1]);
    return String(whole(r[who] * x, s));
  },
  income_expenditure(s) {
    const m = /incomes of (\w+) and (\w+) are in the ratio (\d+) : (\d+) and their expenditures are in the ratio (\d+) : (\d+)\. If each of them saves ₹(\d+), what is (\w+)'s income/.exec(s);
    const [a, b, c, d, S] = m.slice(3, 8).map(Number);
    // a x − c y = S and b x − d y = S
    const x = (S * (c - d)) / (b * c - a * d);
    return `₹${whole((m[8] === m[1] ? a : b) * x, s)}`;
  },
};

test('solvers reproduce the PYQ answers', () => {
  assert.equal(SOLVE.equal_parts_ratio('If 40% of P = 0.75 of Q = 1/4 of R, then P : Q : R is'), '15 : 8 : 24');
  assert.equal(SOLVE.equal_parts_ratio('If 2/3 of A is equal to 75% of B, then A : B is'), '9 : 8');
  assert.equal(SOLVE.equal_parts_ratio('P is greater than Q by 60% and greater than R by 30%. What is the ratio of Q to R?'), '13 : 16');
  assert.equal(SOLVE.equal_parts_ratio('A man distributes ₹165000 among Rina, Mita and Amit in such a manner that 1/2 of Rina\'s share, 1/4 of Mita\'s share and 1/5 of Amit\'s share are equal. Find Rina\'s share.'), '₹30000');
  assert.equal(SOLVE.equal_parts_ratio('The sum of the weights of Amit and Rina is 80 kg. 1/2 of Amit\'s weight is equal to 5/6 of Rina\'s weight. Find the weight of Rina.'), '30 kg');
  assert.equal(SOLVE.fraction_ratio('The sides of a triangle are in the ratio 1/20 : 1/15 : 1/12 and its perimeter is 36 cm. Find the length of the longest side.'), '15 cm');
  assert.equal(SOLVE.fraction_ratio('A person distributes pens among 4 friends in the ratio 1/3 : 1/4 : 1/5 : 1/6. What is the minimum number of pens he should have?'), '57');
  assert.equal(SOLVE.add_component_new_ratio('In a type of German silver, copper, zinc and nickel are in the ratio 4 : 3 : 2. How much zinc should be added to 54 kg of it to make the ratio 6 : 5 : 3?'), '2 kg');
  assert.equal(SOLVE.add_component_new_ratio('In 33 kg of solder, lead and tin are in the ratio 4 : 7. How much lead must be added to make the ratio of lead to tin 1 : 1?'), '9 kg');
  assert.equal(SOLVE.variation_direct_inverse('In a camp there was food for 190 days for 4000 men. After 30 days, 800 men left. For how many days will the remaining food last the remaining men?'), '200 days');
  assert.equal(SOLVE.variation_direct_inverse('A square field of side 40 m produces 2000 kg of rice. How much rice will a similar square field of side 50 m produce?'), '3125 kg');
  assert.equal(SOLVE.variation_direct_inverse('How many workers are to be employed to produce 125 machine parts per day if the ratio of the number of parts to the number of workers per day is 5 : 2?'), '50');
  assert.equal(SOLVE.transfer_ratio('The amounts of money with Amit and Rina are in the ratio 4 : 3, and together they have ₹700. How much should Amit give Rina so that both have equal amounts?'), '₹50');
  assert.equal(SOLVE.transfer_ratio('Of 132 examinees of a school, the ratio of successful to unsuccessful students is 9 : 2. If 4 more students had passed, what would the ratio of successful to unsuccessful students have been?'), '28 : 5');
  assert.equal(SOLVE.mean_proportional('Find the mean proportional between 1/4 and 1/36.'), '1/12');
  assert.equal(SOLVE.mean_proportional('The product of three positive numbers in continued proportion is 343. What is the mean proportional of the first and the third number?'), '7');
  assert.equal(SOLVE.coins_value_ratio('A bag contains an equal number of ₹1, 50 paise and 25 paise coins. If their total value is ₹35, how many coins of each type are there?'), '20');
  assert.equal(SOLVE.coins_value_ratio('The numbers of 50 paise, 25 paise and 10 paise coins in a bag are in the ratio 5 : 8 : 3, and their total value is ₹144. How many 50 paise coins are there?'), '150');
  assert.equal(SOLVE.income_expenditure('The incomes of Amit and Rina are in the ratio 3 : 2 and their expenditures are in the ratio 5 : 3. If each of them saves ₹1000, what is Rina\'s income?'), '₹4000');
});

const BENGALI = /[ঀ-৿]/;
const keys = new Set(patterns.map((p) => p.key));

for (const [key, gen] of Object.entries(GENERATORS)) {
  test(`${key}: 300+ draws re-solved independently, 4 distinct options, bilingual, tagged`, () => {
    seed(20261124);
    assert.ok(keys.has(key), `${key} is a pattern of ratio_proportion.js`);
    const stems = new Set();
    let made = 0;
    for (let i = 0; i < 12000 && made < 400; i++) {
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
      assert.equal(q.topic, 'ratio_proportion');
      assert.ok(q.difficulty >= 2 && q.difficulty <= 3, 'standard level');
      assert.ok(q.expected_time_sec >= 45 && q.expected_time_sec <= 90);
      const text = [q.stem.en, ...q.options.map((o) => o.text.en), ...q.solution.steps.map((s) => s.en)].join(' ');
      assert.ok(!/\d\.\d{3}/.test(text), `no long decimals: ${text}`);
    }
    assert.ok(made >= 300, `generated ${made}`);
    assert.ok(stems.size >= 40, `distinct stems ${stems.size}`);
  });
}

test('PYQ map and pattern rules point at real patterns', () => {
  assert.deepEqual(checkRules(), []);
  const map = loadPyqMap('quant', 'ratio_proportion');
  assert.ok(Object.keys(map).length >= 35);
  for (const k of Object.values(map)) assert.ok(keys.has(k), k);
});
