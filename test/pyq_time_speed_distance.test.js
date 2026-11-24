'use strict';

/**
 * PYQ-gap generators for Time, Speed & Distance (scripts/generators/supplement/pyq_time_speed_distance.js).
 * Every draw is re-solved by an independent solver that reads the numbers from the English
 * stem (only the generator's framing tag is used to pick the solver), and the answer must
 * be the option marked correct.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { seed } = require('../scripts/generators/common');
const gen = require('../scripts/generators/supplement/pyq_time_speed_distance');
const { clock, duration } = require('../scripts/generators/supplement/quant_chase');
const { checkRules } = require('../src/services/patternTagger');

// ---- independent exact arithmetic and display ----
const g = (a, b) => (b ? g(b, a % b) : Math.abs(a));
const F = (n, d = 1) => { const k = g(n, d) * Math.sign(d); return [n / k, d / k]; };
function show([n, d], dec = true) {
  if (d === 1) return String(n);
  if (dec && [2, 4, 5].includes(d)) return String(n / d);
  const w = Math.trunc(n / d);
  return w ? `${w} ${n % d}/${d}` : `${n}/${d}`;
}
const nums = (re, s) => { const m = re.exec(s); assert.ok(m, `no match ${re} in: ${s}`); return m.slice(1).map(Number); };
const WORDFRAC = { 'one-half': [1, 2], 'one-third': [1, 3], 'two-thirds': [2, 3], 'one-fourth': [1, 4], 'three-fourths': [3, 4], 'two-fifths': [2, 5], 'three-fifths': [3, 5] };
function minutesOf(s) { // "2 hours 30 minutes" / "45 minutes" / "1 hour"
  const h = /(\d+) hours?/.exec(s);
  const m = /(\d+) minutes?/.exec(s);
  return (h ? Number(h[1]) * 60 : 0) + (m ? Number(m[1]) : 0);
}
const clockMin = (s) => { const [, h, m, ap] = /(\d+):(\d\d) (a|p)\.m\./.exec(s); return ((Number(h) % 12) + (ap === 'p' ? 12 : 0)) * 60 + Number(m); };
const hourOf = (s) => (s === '12 noon' ? 12 : ((Number(s.split(' ')[0]) % 12) + (s.endsWith('p.m.') ? 12 : 0)));
const hourLabel = (h) => (h === 12 ? '12 noon' : `${h % 12 || 12} ${h < 12 ? 'a.m.' : 'p.m.'}`);

const SOLVERS = {
  average_speed(s, fw) {
    let x; let y;
    if (fw === 'percent') {
      [x] = nums(/at a speed of (\d+) km\/h/, s);
      const [p] = nums(/the speed by (\d+)%/, s);
      y = (x * (/increasing/.test(s) ? 100 + p : 100 - p)) / 100;
    } else [x, y] = [...s.matchAll(/(\d+) (?:km\/h|m\/s)/g)].map((m) => Number(m[1]));
    return `${show(F(2 * x * y, x + y))} ${/m\/s/.test(s) ? 'm/s' : 'km/h'}`;
  },
  boats_streams(s, fw) {
    let ans;
    if (fw === 'equal_time') {
      const [b] = nums(/still water is (\d+)/, s); const [d1] = nums(/(\d+) km downstream/, s); const [d2] = nums(/(\d+) km upstream/, s);
      ans = F(b * (d1 - d2), d1 + d2);
    } else {
      let d; let u;
      if (fw === 'down_up_speeds') [d, u] = nums(/downstream at (\d+) km\/h and upstream at (\d+) km\/h/, s);
      else if (fw === 'down_in_minutes') { const [m] = nums(/1 km downstream in (\d+) minutes/, s); d = 60 / m; [u] = nums(/upstream at (\d+) km\/h/, s); }
      else { const [a, t1] = nums(/(\d+) km downstream in (\d+) hours?/, s); const [c, t2] = nums(/(\d+) km upstream in (\d+) hours?/, s); d = a / t1; u = c / t2; }
      ans = /speed of the stream|of the stream\?/.test(s) ? F(d - u, 2) : F(d + u, 2);
    }
    return `${show(ans)} km/h`;
  },
  basic_units(s, fw) {
    if (fw === 'posts') {
      const [n] = nums(/counts (\d+)/, s); const m = /one minute/.test(s) ? 1 : nums(/in (\d+) minutes/, s)[0]; const [gap] = nums(/(\d+) metres apart/, s);
      return `${show(F((n - 1) * gap * 60, m * 1000))} km/h`;
    }
    if (fw === 'laps') {
      const k = { once: 1, twice: 2, 'three times': 3, 'four times': 4 }[/go (once|twice|three times|four times) around/.exec(s)[1]];
      const per = /square field of side (\d+)/.test(s) ? 4 * nums(/side (\d+) m/, s)[0] : 2 * nums(/(\d+) m long and (\d+) m wide/, s).reduce((a, b) => a + b);
      const [v] = nums(/speed is (\d+) km\/h/, s);
      return `${show(F(k * per * 18, 5 * v))} seconds`;
    }
    if (/m\/s in km\/h/.test(s)) {
      const m = /speed of (\d+) (\d+)\/(\d+) m\/s/.exec(s) || /speed of ()(\d+)\/(\d+) m\/s/.exec(s);
      const w = Number(m[1] || 0); const n = Number(m[2]); const d = Number(m[3]);
      return `${show(F((w * d + n) * 18, d * 5))} km/h`;
    }
    const [v] = nums(/rides at (\d+) km\/h/, s);
    return `${show(F(v * 5, 18), false)} m/s`;
  },
  meeting_point(s) {
    const [D] = nums(/between A and B is (\d+) km/, s); const [x, y] = nums(/at (\d+) km\/h and (\d+) km\/h/, s);
    if (/which of the following/.test(s)) return x > y ? 'AC > CB' : 'AC < CB';
    if (/from A\?/.test(s)) return `${show(F(D * x, x + y))} km`;
    if (/from B\?/.test(s)) return `${show(F(D * y, x + y))} km`;
    return `${show(F(D * Math.abs(x - y), x + y))} km`;
  },
  part_journey_speeds(s, fw) {
    if (fw === 'increasing') {
      const [v0] = nums(/speed of (\d+) km\/h/, s); const [inc] = nums(/increases by (\d+) km\/h/, s);
      const k = /every hour/.test(s) ? 1 : nums(/every (\d+) hours/, s)[0]; const [D] = nums(/cover (\d+) km/, s);
      let left = D; let v = v0; let mins = 0;
      while (left > v * k) { left -= v * k; mins += 60 * k; v += inc; }
      return duration(mins + (left * 60) / v).en;
    }
    if (fw === 'unequal_parts') {
      const [d1, v1] = nums(/first (\d+) km of a journey at (\d+) km\/h/, s); const [d2, v2] = nums(/next (\d+) km at (\d+) km\/h/, s);
      return `${show(F(d1 + d2, d1 / v1 + d2 / v2))} km/h`;
    }
    const [[t1, v1], [t2, v2]] = [...s.matchAll(/for (\d+) hours? at (\d+) km\/h/g)].map((m) => [Number(m[1]), Number(m[2])]);
    return `${show(F(t1 * v1 + t2 * v2, t1 + t2))} km/h`;
  },
  speed_ratio_time(s, fw) {
    if (fw === 'time_ratio') {
      const r = nums(/ratio (\d+) : (\d+) : (\d+)/, s);
      const l = r.reduce((a, b) => (a * b) / g(a, b));
      const t = r.map((v) => l / v); const k = t.reduce(g);
      return t.map((v) => v / k).join(' : ');
    }
    if (fw === 'percent_faster') {
      const [p] = nums(/is (\d+)% more/, s);
      const t0 = minutesOf(/takes (.*?) to cover/.exec(s)[1]);
      return duration((t0 * 100) / (100 + p)).en;
    }
    const [p, q] = nums(/is (\d+) : (\d+)\./, s); const [D, t] = nums(/covers (\d+) km in (\d+) hours/, s);
    const vA = F(D * p, t * q);
    if (fw === 'find_speed') return `${show(vA)} km/h`;
    const [t2] = nums(/travel in (\d+) hours/, s);
    return `${show(F(vA[0] * t2, vA[1]))} km`;
  },
  speed_for_remaining_part(s, fw) {
    let left; let leftMin;
    if (fw === 'fraction_time') {
      const [D] = nums(/distance of (\d+) km/, s); const Tm = minutesOf(/ km in (.*?)\. If/.exec(s)[1]);
      const [, fd, ft] = /If ([a-z-]+) of the distance is covered in ([a-z-]+) of/.exec(s);
      const [a, b] = WORDFRAC[fd]; const [c, d] = WORDFRAC[ft];
      left = F(D * (b - a), b); leftMin = Tm - (Tm * c) / d;
    } else if (fw === 'fraction_speed') {
      const [D, Tm] = nums(/distance of (\d+) km in (\d+) minutes/, s);
      const [, fd, v] = /covers ([a-z-]+) of the distance at (\d+) km\/h/.exec(s);
      const [a, b] = WORDFRAC[fd];
      const d1 = (D * a) / b; left = F(D - d1); leftMin = Tm - (d1 * 60) / Number(v);
    } else {
      const [D] = nums(/cover (\d+) km in/, s); const Tm = minutesOf(/ km in (.*?)\. It/.exec(s)[1]);
      const [d1, v] = nums(/first (\d+) km at (\d+) km\/h/, s);
      left = F(D - d1); leftMin = Tm - (d1 * 60) / v;
    }
    return `${show(F(left[0] * 60, left[1] * leftMin))} km/h`;
  },
  meeting_staggered_start(s, fw) {
    if (fw === 'late_start') {
      const [D] = nums(/are (\d+) km apart/, s);
      const [t1, t2] = [...s.matchAll(/\d+:\d\d (?:a|p)\.m\./g)].map((m) => clockMin(m[0]));
      const [v1, v2] = [...s.matchAll(/at (\d+) km\/h/g)].map((m) => Number(m[1]));
      const meet = t2 + ((D - (v1 * (t2 - t1)) / 60) * 60) / (v1 + v2);
      return clock(meet).en;
    }
    if (fw === 'timetable') {
      const hs = [...s.matchAll(/(\d+ (?:a|p)\.m\.|12 noon)/g)].map((m) => hourOf(m[1]));
      const [h1, a1, h3, a3] = hs; const T1 = a1 - h1; const T2 = a3 - h3;
      const at = F(h3 * 60 * (T1 + T2) + 60 * (T1 - (h3 - h1)) * T2, T1 + T2); // minutes after midnight
      if (at[1] === 1) return clock(at[0]).en;
      const h = Math.floor(at[0] / at[1] / 60);
      return `${show([at[0] - h * 60 * at[1], at[1]], false)} min past ${hourLabel(h)}`;
    }
    const [v1, v2] = nums(/at (\d+) km\/h and (\d+) km\/h/, s); const [D] = nums(/(\d+) km apart/, s); const [m] = nums(/stops (\d+) minutes/, s);
    const left = D - ((v1 + v2) * m) / 60;
    return `${show(F(m * v2 + left * 60, v2))} minutes`;
  },
};

/** Subtopics that differ from the pattern key (the key was already a subtopic with another meaning). */
const SUBTOPIC = { meeting_point: 'meeting_point_where' };

const CASES = [
  ['averageSpeed', 'average_speed'], ['boatsStreams', 'boats_streams'], ['basicUnits', 'basic_units'], ['meetingPoint', 'meeting_point'],
  ['partJourney', 'part_journey_speeds'], ['speedRatio', 'speed_ratio_time'], ['remainingSpeed', 'speed_for_remaining_part'], ['meetingStaggered', 'meeting_staggered_start'],
];

test('the solvers reproduce the PYQ answers', () => {
  assert.equal(SOLVERS.average_speed('A person travels from P to Q at a speed of 40 km/h and returns by increasing the speed by 50%. What is the average speed for the whole journey?', 'percent'), '48 km/h');
  assert.equal(SOLVERS.boats_streams('The speed of a boat in still water is 10 km/h. If it can travel 26 km downstream and 14 km upstream in the same time, what is the speed of the stream?', 'equal_time'), '3 km/h');
  assert.equal(SOLVERS.basic_units('A man sitting in a train counts 21 telephone posts in one minute. If the posts are 50 metres apart, at what speed is the train travelling?', 'posts'), '60 km/h');
  assert.equal(SOLVERS.basic_units('What is the speed of 2 2/9 m/s in km/h?', 'convert'), '8 km/h');
  assert.equal(SOLVERS.basic_units('How many seconds will a man take to go twice around a square field of side 45 m if his speed is 9 km/h?', 'laps'), '144 seconds');
  assert.equal(SOLVERS.part_journey_speeds('A motor car starts with a speed of 70 km/h, and its speed increases by 10 km/h every 2 hours. In how much time will it cover 345 km?', 'increasing'), '4 hours 30 minutes');
  assert.equal(SOLVERS.speed_ratio_time('The ratio of the speeds of the first train and the second train is 7 : 8. The second train covers 400 km in 4 hours. What is the speed of the first train?', 'find_speed'), '87.5 km/h');
  assert.equal(SOLVERS.speed_ratio_time('The speeds of three cars are in the ratio 2 : 3 : 4. What is the ratio of the times taken by them to travel the same distance?', 'time_ratio'), '6 : 4 : 3');
  assert.equal(SOLVERS.speed_ratio_time('The speed of an electric train is 25% more than that of a steam-engine train. The steam-engine train takes 4 hours 25 minutes to cover a certain distance. How long will the electric train take to cover the same distance?', 'percent_faster'), '3 hours 32 minutes');
  assert.equal(SOLVERS.speed_for_remaining_part('Ravi has to cover a distance of 6 km in 45 minutes. If one-half of the distance is covered in two-thirds of the total time, what must the speed be to cover the remaining distance in the remaining time?', 'fraction_time'), '12 km/h');
  assert.equal(SOLVERS.speed_for_remaining_part('Ravi decided to cover a distance of 6 km in 84 minutes. Ravi covers two-thirds of the distance at 4 km/h and the rest at a different speed. What is the speed for the remaining distance?', 'fraction_speed'), '5 km/h');
  assert.equal(SOLVERS.meeting_staggered_start('X and Y are 465 km apart. A train starts from X towards Y at 10:00 a.m. at 65 km/h. Another train leaves Y towards X at 11:00 a.m. at 35 km/h. At what time do the trains meet?', 'late_start'), '3:00 p.m.');
  assert.equal(SOLVERS.meeting_staggered_start('A train starts from Howrah at 8 a.m. and reaches Bardhaman at 12 noon. Another train leaves Bardhaman at 9 a.m. and reaches Howrah at 12 noon. When do the two trains meet?', 'timetable'), '17 1/7 min past 10 a.m.');
  assert.equal(SOLVERS.meeting_staggered_start('Two trains start at the same time, at 60 km/h and 30 km/h, towards each other from two stations 120 km apart. The faster train stops 40 minutes after its departure. After how many minutes from the start will the other train meet it?', 'stops'), '160 minutes');
});

for (const [name, pattern] of CASES) {
  test(`${pattern}: 300+ draws re-solved independently, 4 distinct options, Bengali, tagged`, () => {
    seed(20261124);
    const framings = gen.FRAMINGS[name].map((f) => f.key || f);
    const seenFraming = new Set();
    const stems = new Set();
    let made = 0;
    for (let i = 0; made < 360 && i < 20000; i++) {
      const fw = gen.FRAMINGS[name][i % framings.length];
      const q = gen[name](fw);
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
      assert.equal(q.subtopic, SUBTOPIC[pattern] || pattern);
      assert.equal(q.topic, 'time_speed_distance');
      assert.ok(q.difficulty >= 2 && q.difficulty <= 3);
      assert.ok(q.expected_time_sec >= 45 && q.expected_time_sec <= 90);
      assert.ok(!/\d\.\d{3}/.test(q.solution.steps.map((s) => s.en).join(' ')), `no long decimals: ${q.stem.en}`);
    }
    assert.ok(made >= 300, `made ${made}`);
    assert.deepEqual([...seenFraming].sort(), [...framings].sort(), 'every framing produces questions');
    assert.ok(stems.size >= 40, `distinct stems ${stems.size}`);
  });
}

test('module shape: one retrying generator per pattern, all in this chapter', () => {
  assert.equal(gen.subject, 'quant');
  assert.equal(gen.topics.length, 1);
  assert.equal(gen.topics[0].topic, 'time_speed_distance');
  assert.equal(gen.topics[0].gens.length, CASES.length);
  seed(3);
  for (const fn of gen.topics[0].gens) assert.ok(fn(), 'wrapped generator yields a question');
});

test('pattern rules and the PYQ map point at real patterns', () => {
  assert.deepEqual(checkRules(), []);
  const map = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/patterns/pyq_map/quant/time_speed_distance.json'), 'utf8'));
  assert.equal(map['IMP-FDB6FF6DA8'], 'chase_head_start');
});
