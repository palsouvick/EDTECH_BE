'use strict';

/**
 * Percentage PYQ-type generators (scripts/generators/supplement/pyq_percentage.js).
 * Every answer is re-solved by an independent solver that reads the numbers from the
 * English stem; the generator's own arithmetic is never imported.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { seed } = require('../scripts/generators/common');
const gen = require('../scripts/generators/supplement/pyq_percentage');
const { checkRules, loadPyqMap } = require('../src/services/patternTagger');
const doc = require('../db/patterns/quant/percentage');

/* ── independent arithmetic ─────────────────────────────────────────────── */

const g = (a, b) => (b ? g(b, a % b) : Math.abs(a));
/** Fraction n/d (integers) as "25", "3/8", "16 2/3". */
function mix(n, d = 1) {
  const k = g(n, d);
  n /= k; d /= k;
  if (d === 1) return String(n);
  return Math.floor(n / d) ? `${Math.floor(n / d)} ${n % d}/${d}` : `${n % d}/${d}`;
}
const pct = (n, d = 1) => `${mix(n, d)}%`;
const toInt = (s) => Number(s.replace(/,/g, ''));
const inr = (v) => `₹${v.toLocaleString('en-IN')}`;
/** "51 2/3" -> [155, 3]; "65" -> [65, 1]. */
function parseMixed(s) {
  const m = /^(?:(\d+) )?(\d+)\/(\d+)$/.exec(s.trim());
  if (!m) return [Number(s), 1];
  const d = Number(m[3]);
  return [Number(m[1] || 0) * d + Number(m[2]), d];
}
const r2 = (x) => Math.round(x * 100) / 100;
const change = (v) => (Math.abs(v) < 1e-9 ? 'no change' : v > 0 ? `${r2(v)}% increase` : `${r2(-v)}% decrease`);
const signed = (w, x) => (w === 'increased' ? x : -x);
const ratio = (a, b) => `${a / g(a, b)} : ${b / g(a, b)}`;

function solve(s) {
  let m;
  // percent_of_number
  if ((m = /(?:won|salary is|grant of) ₹([\d,]+).*?(\d+)% of (?:the money|it)/.exec(s))) return inr((toInt(m[1]) * (100 - Number(m[2]))) / 100);
  if ((m = /(\d+)% more/.exec(s))) {
    const N = toInt(/([\d,]+) (?:copies|people|bicycles)/.exec(s)[1]);
    return ((N * (100 + Number(m[1]))) / 100).toLocaleString('en-IN');
  }
  if ((m = /rate of (\d+)% on the part of the income exceeding ₹([\d,]+)\. If .* annual income is ₹([\d,]+)/.exec(s))) return inr(((toInt(m[3]) - toInt(m[2])) * Number(m[1])) / 100);
  if ((m = /^What is ([\d.]+)% of ₹([\d,]+)\?$/.exec(s))) return inr((toInt(m[2]) * Math.round(Number(m[1]) * 100)) / 10000);
  // one_quantity_as_percent
  if ((m = /^([\d,]+) students out of ([\d,]+)/.exec(s))) return pct(100 * (toInt(m[2]) - toInt(m[1])), toInt(m[2]));
  if ((m = /village of ([\d,]+) voters, ([\d,]+) cast|has ([\d,]+) members, of whom ([\d,]+) borrowed/.exec(s))) {
    const N = toInt(m[1] || m[3]);
    return pct(100 * (N - toInt(m[2] || m[4])), N);
  }
  if ((m = /What percent is (\d+) minutes? (\d+) seconds of an hour/.exec(s))) return pct(100 * (60 * Number(m[1]) + Number(m[2])), 3600);
  if ((m = /What percentage is (\d+) kg (\d+) g of ([\d.]+) quintal/.exec(s))) return pct(100 * (1000 * Number(m[1]) + Number(m[2])), Math.round(Number(m[3]) * 100) * 1000);
  if ((m = /What percentage is (\d+) m (\d+) cm of (\d+) km/.exec(s))) return pct(100 * (100 * Number(m[1]) + Number(m[2])), Number(m[3]) * 100000);
  if ((m = /What percent is (\d+) paise of ₹(\d+)/.exec(s))) return pct(100 * Number(m[1]), 100 * Number(m[2]));
  if ((m = /a (\d+) metre long piece .* remaining piece is (\d+) metres/.exec(s))) return pct(100 * (Number(m[1]) - Number(m[2])), Number(m[1]));
  if ((m = /The ratio of \w+ to \w+ in .* is (\d+) : (\d+)\./.exec(s))) return pct(100 * Number(m[1]), Number(m[1]) + Number(m[2]));
  if ((m = /there are (\d+) students in the science.* (\d+)% of them study science and (\d+) study arts/.exec(s))) {
    const N = Number(m[1]);
    return pct(100 * (N - (N * Number(m[2])) / 100 - Number(m[3])), N);
  }
  if ((m = /numbers from 1 to (\d+) have (.+) in the unit's place/.exec(s))) {
    const digits = m[2].match(/\d/g).map(Number);
    let c = 0;
    for (let i = 1; i <= Number(m[1]); i++) if (digits.includes(i % 10)) c++;
    return pct(100 * c, Number(m[1]));
  }
  // percentage_change
  if ((m = /(?:rose|fell) from ₹(\d+) to ₹(\d+) per kg/.exec(s))) return pct(100 * Math.abs(Number(m[2]) - Number(m[1])), Number(m[1]));
  if ((m = /height was (\d+) cm\. This year it is ([\d.]+) cm/.exec(s))) return pct(Math.round(2 * (Number(m[2]) - Number(m[1]))) * 50, Number(m[1]));
  if ((m = /shown as (\d+) kg against the actual weight of (\d+) kg/.exec(s))) return pct(100 * Math.abs(Number(m[1]) - Number(m[2])), Number(m[2]));
  // find_whole_from_percent
  if ((m = /^A (\d+)% rebate .* rebate of ₹([\d,]+)/.exec(s))) return inr((toInt(m[2]) * 100) / Number(m[1]));
  if ((m = /After paying (\d+) instalments .* (\d+)% of the loan/.exec(s))) return String((Number(m[1]) * 100) / Number(m[2]));
  if ((m = /is (\d+)% full, it contains (\d+) litres more water than when it is ([\d /]+)% full/.exec(s))) {
    const [bn, bd] = parseMixed(m[3]);
    const gap = [Number(m[1]) * bd - bn, bd]; // percent gap as fraction
    return `${mix(Number(m[2]) * 100 * gap[1], gap[0])} litres`;
  }
  if ((m = /^(\d+)\/(\d+) of a number is (\d+)\. What is (\d+)% of that number/.exec(s))) return String(r2((((Number(m[3]) * Number(m[2])) / Number(m[1])) * Number(m[4])) / 100));
  if ((m = /spends (\d+)% of .*?(?:expense on \w+ is|spends|If) ₹([\d,]+)/.exec(s))) return inr((toInt(m[2]) * 100) / Number(m[1]));
  // overlap_pass_fail
  if ((m = /(\d+)% of the candidates failed in \w+, (\d+)% failed in \w+ and (\d+)% failed in both/.exec(s))) return pct(100 - (Number(m[1]) + Number(m[2]) - Number(m[3])));
  if ((m = /(\d+)% of the examinees passed in \w+ and (\d+)% passed in \w+, but (\d+)% failed in both\. If ([\d,]+)/.exec(s))) {
    const both = Number(m[1]) + Number(m[2]) - (100 - Number(m[3]));
    return ((toInt(m[4]) * 100) / both).toLocaleString('en-IN');
  }
  if ((m = /(\d+)% of the students failed in \w+, (\d+)% failed in \w+ and (\d+)% failed in both\. If ([\d,]+)/.exec(s))) {
    const both = 100 - (Number(m[1]) + Number(m[2]) - Number(m[3]));
    return ((toInt(m[4]) * 100) / both).toLocaleString('en-IN');
  }
  // fraction_percentage_conversion
  if ((m = /the fraction (\d+)\/(\d+)\.|^Express (\d+)\/(\d+) as a percentage/.exec(s))) return pct(100 * Number(m[1] || m[3]), Number(m[2] || m[4]));
  if ((m = /Which fraction is equal to ([\d /]+)%\?/.exec(s))) {
    const [n, d] = parseMixed(m[1]);
    const k = g(n, 100 * d);
    return `${n / k}/${(100 * d) / k}`;
  }
  // area_volume_percent_change
  if ((m = /If (?:each side of a square(?: field)?|the radius of a circle) is (increased|decreased) by (\d+)%/.exec(s))) {
    const x = signed(m[1], Number(m[2]));
    return change(((100 + x) ** 2) / 100 - 100);
  }
  if ((m = /length of a rectangle is (increased|decreased) by (\d+)% and its breadth is (increased|decreased) by (\d+)%/.exec(s))) {
    return change(((100 + signed(m[1], Number(m[2]))) * (100 + signed(m[3], Number(m[4])))) / 100 - 100);
  }
  if ((m = /(doubled|tripled|made four times)/.exec(s))) {
    const k = { doubled: 2, tripled: 3, 'made four times': 4 }[m[1]];
    return change((k * k - 1) * 100);
  }
  if ((m = /each edge of a cube is (increased|decreased) by (\d+)%, by what percentage will its (volume|surface area)/.exec(s))) {
    const f = 1 + signed(m[1], Number(m[2])) / 100;
    return change(((m[3] === 'volume' ? f ** 3 : f ** 2) - 1) * 100);
  }
  if ((m = /radius of a cylinder is increased by (\d+)%/.exec(s))) return change(((1 + Number(m[1]) / 100) ** 2 - 1) * 100);
  // percent_equation
  if ((m = /^If (\d+)% of (\w) = (\d+)% of (\w), then \w = x% of \w/.exec(s))) return mix(100 * Number(m[3]), Number(m[1]));
  if ((m = /^If (\d+)% of (\w) = (\d+)% of (\w), what percentage of \w is \w\?/.exec(s))) return pct(100 * Number(m[1]), Number(m[3]));
  if ((m = /^(\d+)% of how many rupees is equal to ([\d /]+)% of ₹(\d+)\?/.exec(s))) {
    const [bn, bd] = parseMixed(m[2]);
    return `₹${(Number(m[3]) * bn) / (bd * Number(m[1]))}`;
  }
  if ((m = /^If (\d+)% of (\d+) is added to (\d+)% of a number, the sum is (\d+)/.exec(s))) {
    return String(((Number(m[4]) - (Number(m[1]) * Number(m[2])) / 100) * 100) / Number(m[3]));
  }
  if ((m = /first is increased by (\d+)% and the second is decreased by (\d+)%/.exec(s))) return ratio(100 - Number(m[2]), 100 + Number(m[1]));
  if ((m = /saves (\d+)% and \w+ saves (\d+)% of their respective incomes/.exec(s))) return ratio(100 - Number(m[2]), 100 - Number(m[1]));
  throw new Error(`no solver for: ${s}`);
}

/* ── tests ──────────────────────────────────────────────────────────────── */

const KINDS = {
  percentOfNumber: ['percent_of_number', ['deduct', 'rise', 'excess', 'small']],
  oneQuantityAsPercent: ['one_quantity_as_percent', ['complement', 'units', 'cut', 'ratio', 'streams', 'digits']],
  percentageChange: ['percentage_change', ['price', 'height', 'error']],
  findWholeFromPercent: ['find_whole_from_percent', ['budget', 'rebate', 'instalments', 'tank', 'fraction']],
  overlapPassFail: ['overlap_pass_fail', ['passBoth', 'total', 'failTotal']],
  fractionPercentage: ['fraction_percentage_conversion', ['toPercent', 'toFraction']],
  areaVolumeChange: ['area_volume_percent_change', ['square', 'rect', 'times', 'cube', 'cylinder']],
  percentEquation: ['percent_equation', ['xOf', 'howMany', 'sum', 'equalAfter', 'savings']],
};
const BENGALI = /[ঀ-৿]/;
const patternKeys = new Set(doc.patterns.map((p) => p.key));

test('the PYQ statements solve to their keyed answers (solver sanity)', () => {
  assert.equal(solve('What percentage of a 40 metre long piece of cloth should be cut off so that the remaining piece is 7 metres long?'), '82 1/2%');
  assert.equal(solve('If 90% of A = 30% of B, what percentage of A is B?'), '300%');
  assert.equal(solve('60% of how many rupees is equal to 83 1/3% of ₹90?'), '₹125');
  assert.equal(solve('If a bucket is 60% full, it contains 4 litres more water than when it is 46 2/3% full. What is the capacity of the bucket?'), '30 litres');
  assert.equal(solve('What percentage is 2 kg 250 g of 0.72 quintal?'), '3 1/8%');
  assert.equal(solve('The radius of a cylinder is increased by 300%, keeping its height unchanged. By what percentage does its volume change?'), '1500% increase');
  assert.equal(solve('In an examination, 60% of the examinees passed in English and 70% passed in Mathematics, but 20% failed in both. If 2,500 examinees passed in both subjects, what is the total number of examinees?'), '5,000');
  assert.equal(solve('Simon saves 25% and Anik saves 40% of their respective incomes. If their expenditures are equal, what is the ratio of the incomes of Simon and Anik?'), '4 : 5');
});

for (const [name, [pattern, kinds]] of Object.entries(KINDS)) {
  test(`${name}: answers re-solved from the stem, 4 distinct bilingual options, tagged ${pattern}`, () => {
    seed(20261124);
    assert.ok(patternKeys.has(pattern), `${pattern} is a pattern of percentage.js`);
    const stems = new Set();
    const perKind = {};
    let made = 0;
    for (let i = 0; made < 400 && i < 40000; i++) {
      const q = gen[name](kinds[i % kinds.length]);
      if (!q) continue;
      made++;
      perKind[kinds[i % kinds.length]] = (perKind[kinds[i % kinds.length]] || 0) + 1;
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
      assert.equal(q.subtopic, pattern === 'percentage_change' ? 'percentage_change_values' : pattern); // old bank uses 'percentage_change' for another type
      assert.equal(q.topic, 'percentage');
      assert.ok([2, 3].includes(q.difficulty) && q.expected_time_sec >= 45 && q.expected_time_sec <= 90);
      assert.ok(!/\d\.\d{5,}/.test(JSON.stringify(q)), `no long decimals: ${q.stem.en}`);
      assert.ok(!/NaN|undefined|Infinity/.test(JSON.stringify(q)), q.stem.en);
    }
    assert.ok(made >= 400, `generated ${made}`);
    assert.ok(stems.size >= 40, `distinct stems ${stems.size}`);
    assert.deepEqual(kinds.filter((k) => !perKind[k]), [], 'every framing produces questions');
  });
}

test('module shape: every generator registered for the percentage chapter', () => {
  assert.equal(gen.subject, 'quant');
  assert.equal(gen.topics.length, 1);
  assert.equal(gen.topics[0].topic, 'percentage');
  assert.equal(gen.topics[0].gens.length, Object.keys(KINDS).length);
  for (const g0 of gen.topics[0].gens) assert.ok(g0(), 'registered generator yields a question');
});

test('pattern rules and PYQ map point at real patterns', () => {
  assert.deepEqual(checkRules(), []);
  const map = loadPyqMap('quant', 'percentage');
  assert.ok(Object.keys(map).length >= 60);
  const ids = new Set([...patternKeys, ...doc.registry.map((p) => p.id)]);
  for (const [code, key] of Object.entries(map)) assert.ok(ids.has(key), `${code} -> ${key}`);
});
