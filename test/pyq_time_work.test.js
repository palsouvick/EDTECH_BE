'use strict';

/**
 * PYQ-gap generators for Time & Work (scripts/generators/supplement/pyq_time_work.js).
 * Each draw is re-solved from the numbers in the English stem by an independent solver.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { seed } = require('../scripts/generators/common');
const gen = require('../scripts/generators/supplement/pyq_time_work');
const { checkRules } = require('../src/services/patternTagger');

const g = (a, b) => (b ? g(b, a % b) : Math.abs(a));
const F = (n, d = 1) => { const k = g(n, d) * Math.sign(d); return [n / k, d / k]; };
const add = (a, b) => F(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const sub = (a, b) => F(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const mul = (a, b) => F(a[0] * b[0], a[1] * b[1]);
const div = (a, b) => F(a[0] * b[1], a[1] * b[0]);
function show([n, d], dec = false) {
  if (d === 1) return String(n);
  if (dec && [2, 4, 5].includes(d)) return String(n / d);
  const w = Math.trunc(n / d);
  return w ? `${w} ${n % d}/${d}` : `${n}/${d}`;
}
const days = (f, dec) => `${show(f, dec)} days`;
const one = (re, s) => { const m = re.exec(s); assert.ok(m, `no ${re} in: ${s}`); return m.slice(1); };
const mixed = (s) => { const m = /^(\d+)(?: (\d+)\/(\d+))?$/.exec(s); return m[2] ? F(Number(m[1]) * Number(m[3]) + Number(m[2]), Number(m[3])) : F(Number(m[1])); };
const people = (s) => [...s.matchAll(/(\d+) (?:men|man) (?:and|or) (\d+) (?:boys?|wom[ae]n)/g)].map((m) => [Number(m[1]), Number(m[2])]);

const SOLVERS = {
  part_work_given(s) {
    const [[p1, q1, d1], [p2, q2, d2]] = [...s.matchAll(/can do (\d+)\/(\d+) of .*? in (\d+) days/g)].map((m) => m.slice(1).map(Number));
    const ta = F(d1 * q1, p1); const tb = F(d2 * q2, p2);
    const tog = div(mul(ta, tb), add(ta, tb));
    const part = /finish (\d+)\/(\d+) of/.exec(s);
    return days(part ? mul(tog, F(Number(part[1]), Number(part[2]))) : tog);
  },
  w_efficiency_percent(s) {
    const [n] = one(/in (\d+) days/, s).map(Number);
    const [p, ml] = one(/(\d+)% (more|less) efficient/, s);
    const k = F(ml === 'more' ? 100 + Number(p) : 100 - Number(p), 100);
    if (/Working together/.test(s)) return days(div(F(n), add(F(1), k)));
    return days(div(F(n), k));
  },
  w_men_women_equivalence(s, fw) {
    const grps = people(s);
    if (fw === 'or_given') {
      const [[a, b], [x, y]] = grps; const [d] = one(/in (\d+) days/, s).map(Number);
      const r = F(b, a); // one man = r of the others
      return days(div(F(b * d), add(mul(F(x), r), F(y))));
    }
    const [d1, d2] = [...s.matchAll(/in (\d+) days/g)].map((m) => Number(m[1]));
    const [[a1, b1], [a2, b2]] = grps;
    const r = F(d2 * b2 - d1 * b1, d1 * a1 - d2 * a2);
    const W = mul(F(d1), add(mul(F(a1), r), F(b1)));
    if (/1 man alone/.test(s)) return days(div(W, r));
    const [a3, b3] = one(/can (\d+) (?:men|man) and (\d+)/, s).map(Number);
    const k = /twice/.test(s) ? 2 : /three times/.test(s) ? 3 : 1;
    return days(div(mul(F(k), W), add(mul(F(a3), r), F(b3))));
  },
  pairs_together(s) {
    const pairs = [...s.matchAll(/(\w) and (\w) (?:can do .*? )?in (\d+) days/g)].map((m) => [m[1], m[2], Number(m[3])]);
    const rate = (who) => pairs.reduce((acc, [x, y, d]) => add(acc, F(x === who || y === who ? 1 : -1, d)), F(0)); // (pairs with who) − (pair without who)
    const all = F(1, 1);
    const halfSum = mul(pairs.reduce((acc, [, , d]) => add(acc, F(1, d)), F(0)), F(1, 2));
    const alone = /will (\w) alone/.exec(s);
    if (!alone) return days(div(all, halfSum));
    return days(div(all, mul(rate(alone[1]), F(1, 2))));
  },
  w_group_join_midway(s, fw) {
    const [N] = one(/^(?:A camp has food for )?(\d+)/, s).map(Number);
    const [D] = one(/(?:in|for) (\d+) days\./, s).map(Number);
    const [d] = one(/After (\d+) days/, s).map(Number);
    let N2;
    if (/(\d+) more workers join/.test(s)) N2 = N + Number(one(/(\d+) more workers join/, s)[0]);
    else if (/(\d+)% of the/.test(s)) N2 = N - (N * Number(one(/(\d+)% of the/, s)[0])) / 100;
    else N2 = N - Number(one(/, (\d+) (?:people|workers) leave/, s)[0]);
    const rest = F(N * (D - d), N2);
    return days(/in all/.test(s) ? add(rest, F(d)) : rest, true);
  },
  men_days_hours(s) {
    const [M1, , W1, D1, H1] = one(/^If (\d+) persons can finish ((\d+) m of \w+|a piece of work) in (\d+) days working (\d+) hours a day/, s);
    const W2 = /complete (\d+) m of/.exec(s);
    const scale = W1 ? F(Number(W2[1]), Number(W1)) : F(1);
    const total = mul(F(M1 * D1 * H1), scale);
    let v; let unit;
    if (/how many hours a day/.test(s)) { const [m, d] = one(/should (\d+) persons work .*? in (\d+) days/, s).map(Number); v = div(total, F(m * d)); unit = 'hours'; }
    else if (/how many persons/.test(s)) { const [h, d] = one(/working (\d+) hours a day, are needed .*? in (\d+) days/, s).map(Number); v = div(total, F(h * d)); unit = 'persons'; }
    else { const [m, h] = one(/will (\d+) persons working (\d+) hours a day/, s).map(Number); v = div(total, F(m * h)); unit = 'days'; }
    return `${show(v)} ${unit}`;
  },
  three_workers(s, fw) {
    if (fw === 'together') {
      const t = one(/in (\d+), (\d+) and (\d+) days respectively/, s).map(Number);
      return days(div(F(1), t.reduce((acc, x) => add(acc, F(1, x)), F(0))));
    }
    const [ta, tb] = one(/in (\d+) days and \w+ in (\d+) days/, s).map(Number);
    const [all] = one(/(?:finish it|complete it) in (\d+) days/, s).map(Number);
    const c = sub(sub(F(1, all), F(1, ta)), F(1, tb));
    const pay = /receive ₹(\d+)/.exec(s);
    return pay ? `₹${show(mul(mul(F(Number(pay[1])), c), F(all)))}` : days(div(F(1), c));
  },
  one_worker(s, fw) {
    if (fw === 'tank_part') {
      const [p, q, t] = one(/^(\d+)\/(\d+) of a tank can be \w+ by a pipe in (\d+) minutes?/, s).map(Number);
      const t2 = mixed(one(/in ([\d /]+?) minutes\?/, s)[0]);
      return show(mul(t2, F(p, q * t)));
    }
    const [p, q, d] = one(/does (\d+)\/(\d+) of .*? in (\d+) days/, s).map(Number);
    return days(sub(F(d * q, p), F(d)));
  },
};

const CASES = [
  ['partWorkGiven', 'part_work_given'], ['efficiencyPercent', 'w_efficiency_percent'], ['menWomen', 'w_men_women_equivalence'], ['pairsTogether', 'pairs_together'],
  ['groupChange', 'w_group_join_midway'], ['menDaysHours', 'men_days_hours'], ['threeWorkers', 'three_workers'], ['oneWorker', 'one_worker'],
];

test('the solvers reproduce the PYQ answers', () => {
  assert.equal(SOLVERS.part_work_given('A can do 1/2 of a piece of work in 5 days and B can do 2/5 of the same work in 6 days. In how many days can they finish the work working together?'), '6 days');
  assert.equal(SOLVERS.part_work_given('A can do 1/3 of a piece of work in 5 days and B can do 2/5 of the same work in 10 days. In how many days can they finish the work working together?'), '9 3/8 days');
  assert.equal(SOLVERS.w_efficiency_percent('A alone can do a piece of work in 21 days. B, who is 40% more efficient than A, will finish the same work in how many days?'), '15 days');
  assert.equal(SOLVERS.w_men_women_equivalence('2 men and 7 boys can do a piece of work in 14 days; 3 men and 8 boys can do the same work in 11 days. In how many days can 8 men and 6 boys do three times the amount of this work?', 'two_groups'), '21 days');
  assert.equal(SOLVERS.w_men_women_equivalence('2 men and 7 boys can do a piece of work in 4 days; 4 men and 4 boys can do the same work in 3 days. How long would 1 man alone take to do it?', 'two_groups'), '15 days');
  assert.equal(SOLVERS.pairs_together('P and Q can do a piece of work in 12 days, Q and R in 15 days, and R and P in 20 days. In what time will P alone do it?'), '30 days');
  assert.equal(SOLVERS.w_group_join_midway('60 workers can dig a pond in 20 days. After 5 days of work, 30 workers leave. In how many more days will the remaining work be done?'), '30 days');
  assert.equal(SOLVERS.w_group_join_midway('20 workers can complete a job in 10 days. After 5 days of work, 20 more workers join. In how many days in all will the work be completed?'), '7.5 days');
  assert.equal(SOLVERS.w_group_join_midway('A camp has food for 4000 people for 190 days. After 30 days, 800 people leave. For how many more days will the remaining food last for those who stay?'), '200 days');
  assert.equal(SOLVERS.men_days_hours('If 80 persons can finish a piece of work in 16 days working 6 hours a day, how many hours a day should 64 persons work to complete the same work in 15 days?'), '8 hours');
  assert.equal(SOLVERS.three_workers('A, B and C can do a piece of work in 6, 12 and 24 days respectively. Working together, in how many days will they complete it?', 'together'), '3 3/7 days');
  assert.equal(SOLVERS.three_workers('A can complete a piece of work in 9 days and B in 6 days. With C joining them, all three complete it in 3 days. How many days will C take to complete it alone?', 'find_third'), '18 days');
  assert.equal(SOLVERS.three_workers('A can do a piece of work in 20 days and B in 30 days. With the help of C they finish it in 10 days. If they receive ₹600 for the work, how much should C get?', 'find_third'), '₹100');
  assert.equal(SOLVERS.one_worker('1/3 of a tank can be emptied by a pipe in 3 minutes. What part of the tank will be emptied in 7 1/2 minutes?', 'tank_part'), '5/6');
});

for (const [name, pattern] of CASES) {
  test(`${pattern}: 300+ draws re-solved independently, 4 distinct options, Bengali, tagged`, () => {
    seed(20261124);
    const framings = gen.FRAMINGS[name];
    const seenFraming = new Set();
    const stems = new Set();
    let made = 0;
    for (let i = 0; made < 360 && i < 30000; i++) {
      const q = gen[name](framings[i % framings.length]);
      if (!q) continue;
      made++;
      const framing = q.concept_tags.at(-1);
      seenFraming.add(framing);
      stems.add(q.stem.en);
      const correct = q.options.find((o) => o.oid === q.correct_option_id).text.en;
      assert.equal(correct, SOLVERS[pattern](q.stem.en, framing), q.stem.en);
      assert.equal(q.options.length, 4, q.stem.en);
      assert.equal(new Set(q.options.map((o) => o.text.en)).size, 4, q.stem.en);
      assert.ok(q.options.every((o) => o.text.bn) && /[ঀ-৿]/.test(q.stem.bn), 'Bengali present');
      assert.ok(q.solution.steps.length >= 2 && q.solution.steps.every((s) => /[ঀ-৿]/.test(s.bn)), 'Bengali steps');
      assert.ok(q.solution.shortcut?.en && q.solution.traps.length >= 1, 'shortcut and at least one trap');
      assert.equal(q.pattern, pattern);
      assert.equal(q.subtopic, pattern);
      assert.equal(q.topic, 'time_work');
      assert.ok(q.difficulty >= 2 && q.difficulty <= 3);
      assert.ok(q.expected_time_sec >= 45 && q.expected_time_sec <= 90);
      assert.ok(!/\d\.\d{3}/.test(q.solution.steps.map((s) => s.en).join(' ')), `no long decimals: ${q.stem.en}`);
    }
    assert.ok(made >= 300, `made ${made}`);
    assert.deepEqual([...seenFraming].sort(), [...framings].sort(), 'every framing produces questions');
    assert.ok(stems.size >= 40, `distinct stems ${stems.size}`);
  });
}

test('module shape and pattern keys', () => {
  assert.equal(gen.topics[0].topic, 'time_work');
  assert.equal(gen.topics[0].gens.length, CASES.length);
  seed(5);
  for (const fn of gen.topics[0].gens) assert.ok(fn());
  assert.deepEqual(checkRules(), []);
  const map = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/patterns/pyq_map/quant/time_work.json'), 'utf8'));
  assert.ok(Object.keys(map).length >= 20);
});
