'use strict';

/**
 * Time, Speed & Distance: standard-level practice for the PYQ types that had too few
 * questions of the same kind (see db/patterns/pyq_map/quant/time_speed_distance.json).
 * One generator per pattern, each with several exam framings:
 *   average_speed            go at x, return at y / return y% slower / half the distance at each speed
 *   boats_streams            equal times down & up, down/up speeds, "1 km in 6 minutes"
 *   basic_units              counting telephone posts, laps of a field, m/s <-> km/h with fractions
 *   meeting_point            where (how far from A) two people walking towards each other meet
 *   part_journey_speeds      speed rising every 2 hours, unequal parts, hours at each speed
 *   speed_ratio_time         speed ratio -> speed / distance, three-car time ratio, "25% faster"
 *   speed_for_remaining_part cover D km in T min after part is done
 *   meeting_staggered_start  towards each other with a later start, timetable trains, one train stops
 *
 * Numbers are built backwards from exact answers; fractions are shown as "26 2/3",
 * terminating halves as "87.5". Distractors are the real slips, each with a trap note.
 * The small fraction helpers are exported for the other pyq_* chapter modules.
 */

const { ri, pick, shuffle, gcd, T, names, build } = require('../common');
const { clock, duration } = require('./quant_chase');

const TOPIC = 'time_speed_distance';

// ---------- exact fractions [n, d] ----------
const fr = (n, d = 1) => {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(Math.abs(n), d) || 1;
  return [n / g, d / g];
};
const fadd = (a, b) => fr(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const fsub = (a, b) => fr(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const fmul = (a, b) => fr(a[0] * b[0], a[1] * b[1]);
const fdiv = (a, b) => fr(a[0] * b[1], a[1] * b[0]);
const isInt = (f) => f[1] === 1;
/** "26 2/3", "2/3", "7"; halves, quarters and fifths as decimals ("87.5") when `dec`. */
function fstr([n, d], dec = false) {
  if (d === 1) return String(n);
  if (dec && [2, 4, 5].includes(d)) return String(n / d);
  const w = Math.trunc(n / d);
  const r = Math.abs(n % d);
  return w ? `${w} ${r}/${d}` : `${n}/${d}`;
}

/**
 * Four options for an exact answer. fmt(frac) -> { en, bn }; hints = [[frac, trapEn, trapBn], ...]
 * are the real mistakes (up to 3 kept); near = extra plausible values. Null if 4 distinct can't be made.
 */
function fracOptions(ans, fmt, hints = [], near = []) {
  const seen = new Set([fmt(ans).en]);
  const wrong = [];
  const add = (f, trap) => {
    if (!f || wrong.length >= 3 || !(f[0] > 0) || !Number.isFinite(f[0] / f[1]) || f[1] > Math.max(12, ans[1])) return;
    const o = fmt(f);
    if (seen.has(o.en)) return;
    seen.add(o.en);
    wrong.push({ ...o, ...(trap && { trap }) });
  };
  for (const [f, en, bn] of hints) add(f, en ? T(en, bn) : null);
  for (const f of shuffle(near)) add(f);
  const v = ans[0] / ans[1];
  const step = v >= 20 ? Math.max(1, Math.round(v / 10)) : 1;
  for (let k = 1; wrong.length < 3 && k < 40; k++) add(fadd(ans, fr((k % 2 ? 1 : -1) * Math.ceil(k / 2) * step)));
  // at least one distractor must be a named mistake
  return wrong.length === 3 && wrong.some((w) => w.trap) ? { correct: fmt(ans), wrong } : null;
}

/** "5 ঘণ্টায়" / "40 মিনিটে": duration in the locative, for "in <time>". */
const durIn = (m) => { const d = duration(m); return T(d.en, d.bn.endsWith('ঘণ্টা') ? `${d.bn}য়` : `${d.bn}ে`); };

const unitFmt = (en, bn, dec = true) => (f) => T(`${fstr(f, dec)} ${en}`, `${fstr(f, dec)} ${bn}`);
const KMH = unitFmt('km/h', 'কিমি/ঘণ্টা');
const MS = unitFmt('m/s', 'মিটার/সেকেন্ড');
const KM = unitFmt('km', 'কিমি');

/** Option set for a whole number of minutes, shown with duration(). */
function durationOptions(ans, hints, step) {
  return fracOptions(fr(ans), (f) => (isInt(f) ? duration(f[0]) : T(`${fstr(f)} minutes`, `${fstr(f)} মিনিট`)), hints.map(([v, en, bn]) => [fr(v), en, bn]), [ans + step, ans - step, ans + 2 * step].map((x) => fr(x)));
}

const PLACES = [['Howrah', 'হাওড়া'], ['Bardhaman', 'বর্ধমান'], ['Durgapur', 'দুর্গাপুর'], ['Asansol', 'আসানসোল'], ['Kharagpur', 'খড়্গপুর'], ['Siliguri', 'শিলিগুড়ি'], ['Malda', 'মালদা'], ['Krishnanagar', 'কৃষ্ণনগর'], ['Bolpur', 'বোলপুর'], ['Haldia', 'হলদিয়া']].map(([en, bn]) => T(en, bn));
const twoPlaces = () => shuffle(PLACES).slice(0, 2);

// =====================================================================
// average_speed
// =====================================================================
const AVG_FRAMINGS = ['round_trip', 'school', 'train', 'percent', 'half_distance'];

function averageSpeed(framing = pick(AVG_FRAMINGS)) {
  let x;
  let y;
  let stem;
  let fmt = KMH;
  let pStep = null;
  if (framing === 'percent') {
    const p = pick([10, 20, 25, 40, 50]);
    const up = pick([true, false]);
    x = pick([20, 30, 40, 50, 60, 80, 100]);
    y = (x * (up ? 100 + p : 100 - p)) / 100;
    if (!Number.isInteger(y)) return null;
    const [P, Q] = twoPlaces();
    const [X] = names(1);
    stem = T(
      `${X.en} travels from ${P.en} to ${Q.en} at a speed of ${x} km/h and returns by ${up ? 'increasing' : 'decreasing'} the speed by ${p}%. What is the average speed for the whole journey?`,
      `${X.bn} ঘণ্টায় ${x} কিমি বেগে ${P.bn} থেকে ${Q.bn} যায় এবং গতি ${p}% ${up ? 'বাড়িয়ে' : 'কমিয়ে'} ফিরে আসে। পুরো যাত্রায় গড় গতি কত?`,
    );
    pStep = T(`Return speed = ${x} ${up ? '+' : '−'} ${p}% of ${x} = ${y} km/h.`, `ফেরার গতি = ${x} ${up ? '+' : '−'} ${x}-এর ${p}% = ${y} কিমি/ঘণ্টা।`);
  } else if (framing === 'half_distance') {
    [x, y] = shuffle([5, 8, 10, 12, 15, 20, 24, 25, 30, 36, 40, 45, 60]).slice(0, 2);
    fmt = MS;
    const what = pick([['A body', 'একটি বস্তু'], ['A cyclist', 'একজন সাইকেল আরোহী'], ['A car', 'একটি গাড়ি']]);
    stem = T(
      `${what[0]} covers half of a distance with a speed of ${x} m/s and the other half with a speed of ${y} m/s. What is the average speed over the whole journey?`,
      `${what[1]} মোট পথের অর্ধেক ${x} মিটার/সেকেন্ড বেগে এবং বাকি অর্ধেক ${y} মিটার/সেকেন্ড বেগে অতিক্রম করে। পুরো যাত্রায় গড় গতি কত?`,
    );
  } else {
    const pool = framing === 'school' ? [6, 8, 9, 10, 12, 15, 16, 18, 20, 24] : framing === 'train' ? [40, 45, 50, 60, 72, 75, 80, 90, 100, 120] : [20, 24, 30, 36, 40, 45, 48, 50, 60, 64, 75];
    [x, y] = shuffle(pool).slice(0, 2);
    if (framing === 'school') {
      const [X] = names(1);
      stem = T(
        `${X.en} went to school by cycle at ${x} km/h and returned home along the same road at ${y} km/h. What is the average speed for the entire ride?`,
        `${X.bn} ঘণ্টায় ${x} কিমি বেগে সাইকেলে স্কুলে গেল এবং একই রাস্তায় ঘণ্টায় ${y} কিমি বেগে বাড়ি ফিরল। পুরো যাতায়াতে গড় গতি কত?`,
      );
    } else if (framing === 'train') {
      const [P, Q] = twoPlaces();
      stem = T(
        `An express train goes from ${P.en} to ${Q.en} at ${x} km/h and returns at ${y} km/h. What is the average speed of the train for the whole journey?`,
        `একটি এক্সপ্রেস ট্রেন ${P.bn} থেকে ${Q.bn} ঘণ্টায় ${x} কিমি বেগে যায় এবং ঘণ্টায় ${y} কিমি বেগে ফেরে। পুরো যাত্রায় ট্রেনটির গড় গতি কত?`,
      );
    } else {
      const [X] = names(1);
      stem = T(
        `${X.en} drives from town A to town B at ${x} km/h and comes back over the same road at ${y} km/h. Find the average speed for the round trip.`,
        `${X.bn} শহর A থেকে শহর B পর্যন্ত ঘণ্টায় ${x} কিমি বেগে গাড়ি চালায় এবং একই রাস্তায় ঘণ্টায় ${y} কিমি বেগে ফেরে। যাওয়া-আসায় গড় গতি নির্ণয় করো।`,
      );
    }
  }
  const ans = fr(2 * x * y, x + y);
  if (ans[1] > 12) return null;
  const opts = fracOptions(ans, fmt, [
    [fr(x + y, 2), 'That is the simple mean of the speeds; more time is spent at the slower speed, so use 2xy/(x + y).', 'এটি গতি দুটির সাধারণ গড়; ধীর গতিতে বেশি সময় কাটে, তাই 2xy/(x + y) নাও।'],
    [fr(x * y, x + y), 'The factor 2 is missing: the total distance is 2d, not d.', '2 গুণকটি বাদ পড়েছে: মোট দূরত্ব 2d, d নয়।'],
    ...(framing === 'percent' ? [[fr(y), 'That is only the return speed.', 'এটি কেবল ফেরার গতি।']] : []),
  ]);
  if (!opts) return null;
  const u = fmt === MS ? T('m/s', 'মিটার/সেকেন্ড') : T('km/h', 'কিমি/ঘণ্টা');
  const steps = [
    ...(pStep ? [pStep] : []),
    T(`Equal distances, so average speed = 2xy ÷ (x + y) = (2 × ${x} × ${y}) ÷ (${x} + ${y}).`, `দূরত্ব সমান, তাই গড় গতি = 2xy ÷ (x + y) = (2 × ${x} × ${y}) ÷ (${x} + ${y})।`),
    T(`= ${2 * x * y} ÷ ${x + y} = ${fstr(ans, true)} ${u.en}.`, `= ${2 * x * y} ÷ ${x + y} = ${fstr(ans, true)} ${u.bn}।`),
  ];
  return build({
    topic: TOPIC, subtopic: 'average_speed', pattern: 'average_speed',
    tags: ['speed_distance', 'average_speed', framing],
    difficulty: framing === 'percent' ? 3 : 2, time: framing === 'percent' ? 60 : 45,
    stem, ...opts, steps,
    shortcut: T('Same distance both ways: average speed = 2xy/(x + y), never (x + y)/2.', 'দুই দিকে একই দূরত্ব: গড় গতি = 2xy/(x + y), কখনও (x + y)/2 নয়।'),
  });
}

// =====================================================================
// boats_streams
// =====================================================================
const BOAT_FRAMINGS = ['equal_time', 'down_up_speeds', 'down_in_minutes', 'down_up_distances'];

function boatsStreams(framing = pick(BOAT_FRAMINGS)) {
  const boat = pick([['A boat', 'একটি নৌকা'], ['A motor boat', 'একটি মোটরবোট'], ['A man rowing a boat', 'নৌকা বেয়ে একজন লোক']]);
  let stem;
  let ans;
  let hints;
  let steps;
  let ask = 'stream';
  if (framing === 'equal_time') {
    const b = ri(6, 20);
    const s = ri(1, Math.min(6, b - 2));
    const t = ri(1, 4);
    const d1 = (b + s) * t;
    const d2 = (b - s) * t;
    stem = T(
      `The speed of a boat in still water is ${b} km/h. If it can travel ${d1} km downstream and ${d2} km upstream in the same time, what is the speed of the stream?`,
      `স্থির জলে একটি নৌকার গতি ঘণ্টায় ${b} কিমি। নৌকাটি একই সময়ে স্রোতের অনুকূলে ${d1} কিমি এবং স্রোতের প্রতিকূলে ${d2} কিমি যেতে পারলে স্রোতের বেগ কত?`,
    );
    ans = fr(s);
    hints = [
      [fr(d1 - d2, 2), 'Half the difference of the DISTANCES is not a speed; equate the two times instead.', 'দূরত্বের পার্থক্যের অর্ধেক কোনো গতি নয়; বরং দুটি সময় সমান করো।'],
      [fr(b - s), 'That is the upstream speed of the boat, not the stream.', 'এটি স্রোতের প্রতিকূলে নৌকার গতি, স্রোতের বেগ নয়।'],
    ];
    steps = [
      T(`Let the stream be s km/h. Equal times: ${d1} ÷ (${b} + s) = ${d2} ÷ (${b} − s).`, `ধরো স্রোতের বেগ s কিমি/ঘণ্টা। সময় সমান: ${d1} ÷ (${b} + s) = ${d2} ÷ (${b} − s)।`),
      T(`${d1}(${b} − s) = ${d2}(${b} + s) → ${d1 * b} − ${d2 * b} = ${d1 + d2}s → s = ${(d1 - d2) * b} ÷ ${d1 + d2} = ${s} km/h.`, `${d1}(${b} − s) = ${d2}(${b} + s) → ${d1 * b} − ${d2 * b} = ${d1 + d2}s → s = ${(d1 - d2) * b} ÷ ${d1 + d2} = ${s} কিমি/ঘণ্টা।`),
    ];
  } else if (framing === 'down_up_speeds' || framing === 'down_in_minutes') {
    let d;
    let u;
    let intro;
    if (framing === 'down_up_speeds') {
      const b = ri(4, 18);
      const s = ri(1, Math.min(6, b - 1));
      d = b + s; u = b - s;
      ask = pick(['stream', 'stream', 'still']);
      const who = pick([['A man can swim', 'একজন লোক সাঁতার কেটে'], ['A man can row', 'একজন লোক নৌকা বেয়ে'], ['A boat can travel', 'একটি নৌকা']]);
      intro = T(`${who[0]} downstream at ${d} km/h and upstream at ${u} km/h.`, `${who[1]} স্রোতের অনুকূলে ঘণ্টায় ${d} কিমি এবং স্রোতের প্রতিকূলে ঘণ্টায় ${u} কিমি বেগে যেতে পারে।`);
    } else {
      const m = pick([3, 4, 5, 6, 10, 12, 15]);
      d = 60 / m;
      u = d - 2 * ri(1, Math.floor((d - 1) / 2));
      if (u <= 0) return null;
      intro = T(`${boat[0]} goes 1 km downstream in ${m} minutes and goes upstream at ${u} km/h.`, `${boat[1]} স্রোতের অনুকূলে ${m} মিনিটে 1 কিমি যায় এবং স্রোতের প্রতিকূলে ঘণ্টায় ${u} কিমি বেগে যায়।`);
    }
    const q = ask === 'stream' ? T('What is the speed of the stream?', 'স্রোতের বেগ কত?') : T('What is the speed in still water?', 'স্থির জলে গতি কত?');
    stem = T(`${intro.en} ${q.en}`, `${intro.bn} ${q.bn}`);
    ans = ask === 'stream' ? fr(d - u, 2) : fr(d + u, 2);
    hints = [
      [fr(d - u), 'Halve the difference: downstream − upstream = 2 × stream.', 'পার্থক্যকে অর্ধেক করো: অনুকূল − প্রতিকূল = 2 × স্রোত।'],
      [ask === 'stream' ? fr(d + u, 2) : fr(d - u, 2), ask === 'stream' ? 'That is the speed in still water (half the SUM).' : 'That is the speed of the stream (half the DIFFERENCE).', ask === 'stream' ? 'এটি স্থির জলে গতি (যোগফলের অর্ধেক)।' : 'এটি স্রোতের বেগ (পার্থক্যের অর্ধেক)।'],
    ];
    steps = [
      ...(framing === 'down_in_minutes' ? [T(`1 km in ${60 / d} minutes → downstream speed = 60 ÷ ${60 / d} = ${d} km/h.`, `${60 / d} মিনিটে 1 কিমি → অনুকূলে গতি = 60 ÷ ${60 / d} = ${d} কিমি/ঘণ্টা।`)] : []),
      ask === 'stream'
        ? T(`Stream = (downstream − upstream) ÷ 2 = (${d} − ${u}) ÷ 2 = ${fstr(ans, true)} km/h.`, `স্রোতের বেগ = (অনুকূল − প্রতিকূল) ÷ 2 = (${d} − ${u}) ÷ 2 = ${fstr(ans, true)} কিমি/ঘণ্টা।`)
        : T(`Still water = (downstream + upstream) ÷ 2 = (${d} + ${u}) ÷ 2 = ${fstr(ans, true)} km/h.`, `স্থির জলে গতি = (অনুকূল + প্রতিকূল) ÷ 2 = (${d} + ${u}) ÷ 2 = ${fstr(ans, true)} কিমি/ঘণ্টা।`),
    ];
    if (steps.length < 2) steps.unshift(T(`Downstream = boat + stream = ${d}; upstream = boat − stream = ${u}.`, `অনুকূলে = নৌকা + স্রোত = ${d}; প্রতিকূলে = নৌকা − স্রোত = ${u}।`));
  } else {
    const b = ri(5, 18);
    const s = ri(1, Math.min(6, b - 2));
    const t1 = ri(1, 4);
    const t2 = ri(1, 5);
    const d1 = (b + s) * t1;
    const d2 = (b - s) * t2;
    ask = pick(['stream', 'still']);
    stem = T(
      `${boat[0]} goes ${d1} km downstream in ${t1} hour${t1 > 1 ? 's' : ''} and ${d2} km upstream in ${t2} hour${t2 > 1 ? 's' : ''}. What is the speed ${ask === 'stream' ? 'of the stream' : 'of the boat in still water'}?`,
      `${boat[1]} স্রোতের অনুকূলে ${t1} ঘণ্টায় ${d1} কিমি এবং স্রোতের প্রতিকূলে ${t2} ঘণ্টায় ${d2} কিমি যায়। ${ask === 'stream' ? 'স্রোতের বেগ' : 'স্থির জলে নৌকার গতি'} কত?`,
    );
    ans = fr(ask === 'stream' ? s : b);
    hints = [
      [fr(2 * (ask === 'stream' ? s : b)), 'Downstream and upstream speeds must be halved after adding/subtracting.', 'অনুকূল ও প্রতিকূল গতি যোগ/বিয়োগ করার পরে অর্ধেক করতে হয়।'],
      [fr(ask === 'stream' ? b : s), ask === 'stream' ? 'That is the speed in still water.' : 'That is the speed of the stream.', ask === 'stream' ? 'এটি স্থির জলে গতি।' : 'এটি স্রোতের বেগ।'],
      [fr(d1 - d2, 2), 'The distances must first be turned into speeds (distance ÷ time).', 'আগে দূরত্বকে গতিতে বদলাতে হবে (দূরত্ব ÷ সময়)।'],
    ];
    steps = [
      T(`Downstream speed = ${d1} ÷ ${t1} = ${b + s} km/h; upstream speed = ${d2} ÷ ${t2} = ${b - s} km/h.`, `অনুকূলে গতি = ${d1} ÷ ${t1} = ${b + s} কিমি/ঘণ্টা; প্রতিকূলে গতি = ${d2} ÷ ${t2} = ${b - s} কিমি/ঘণ্টা।`),
      ask === 'stream'
        ? T(`Stream = (${b + s} − ${b - s}) ÷ 2 = ${s} km/h.`, `স্রোতের বেগ = (${b + s} − ${b - s}) ÷ 2 = ${s} কিমি/ঘণ্টা।`)
        : T(`Still water = (${b + s} + ${b - s}) ÷ 2 = ${b} km/h.`, `স্থির জলে গতি = (${b + s} + ${b - s}) ÷ 2 = ${b} কিমি/ঘণ্টা।`),
    ];
  }
  const opts = fracOptions(ans, KMH, hints);
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'boats_streams', pattern: 'boats_streams',
    tags: ['speed_distance', 'boats_streams', framing],
    difficulty: framing === 'equal_time' ? 3 : 2, time: framing === 'equal_time' ? 75 : 45,
    stem, ...opts, steps,
    shortcut: T('Downstream = b + s, upstream = b − s; so b = (down + up) ÷ 2 and s = (down − up) ÷ 2.', 'অনুকূলে = b + s, প্রতিকূলে = b − s; তাই b = (অনুকূল + প্রতিকূল) ÷ 2 এবং s = (অনুকূল − প্রতিকূল) ÷ 2।'),
  });
}

// =====================================================================
// basic_units (standard level: posts, laps, fractional conversions)
// =====================================================================
const UNIT_FRAMINGS = ['posts', 'laps', 'convert'];

function basicUnits(framing = pick(UNIT_FRAMINGS)) {
  let stem;
  let opts;
  let steps;
  if (framing === 'posts') {
    const g = pick([25, 40, 50, 60, 75, 100]);
    const m = pick([1, 1, 2, 3]);
    const n = ri(8, 40);
    const v = fr((n - 1) * g * 60, m * 1000); // km/h
    if (!isInt(v) || v[0] < 18 || v[0] > 150) return null;
    const what = pick([['telephone posts', 'টেলিফোনের খুঁটি'], ['electric poles', 'বিদ্যুতের খুঁটি'], ['telegraph posts', 'টেলিগ্রাফের খুঁটি']]);
    stem = T(
      `A man sitting in a train counts ${n} ${what[0]} in ${m === 1 ? 'one minute' : `${m} minutes`}. If the posts are ${g} metres apart, at what speed is the train travelling?`,
      `ট্রেনে বসে একজন লোক ${m === 1 ? 'এক মিনিটে' : `${m} মিনিটে`} ${n}টি ${what[1]} গোনেন। খুঁটিগুলি পরস্পর থেকে ${g} মিটার দূরে থাকলে ট্রেনটি কত বেগে চলছে?`,
    );
    opts = fracOptions(v, KMH, [
      [fr(n * g * 60, m * 1000), `${n} posts have only ${n - 1} gaps between them; count gaps, not posts.`, `${n}টি খুঁটির মধ্যে ফাঁক মাত্র ${n - 1}টি; খুঁটি নয়, ফাঁক গোনো।`],
      [fr((n - 1) * g, m * 60), 'That is the speed in m/s; the question wants km/h.', 'এটি মিটার/সেকেন্ডে গতি; প্রশ্নে কিমি/ঘণ্টা চাওয়া হয়েছে।'],
    ]);
    steps = [
      T(`${n} posts → ${n - 1} gaps, so distance = ${n - 1} × ${g} = ${(n - 1) * g} m in ${m} minute${m > 1 ? 's' : ''}.`, `${n}টি খুঁটি → ${n - 1}টি ফাঁক, তাই দূরত্ব = ${n - 1} × ${g} = ${(n - 1) * g} মিটার, ${m} মিনিটে।`),
      T(`In 60 minutes: ${(n - 1) * g} × ${60 / m} = ${(n - 1) * g * 60 / m} m = ${v[0]} km, so ${v[0]} km/h.`, `60 মিনিটে: ${(n - 1) * g} × ${60 / m} = ${(n - 1) * g * 60 / m} মিটার = ${v[0]} কিমি, তাই ঘণ্টায় ${v[0]} কিমি।`),
    ];
  } else if (framing === 'laps') {
    const v = pick([6, 9, 12, 18, 27, 36]);
    const vms = fr(v * 5, 18);
    const square = pick([true, false]);
    const a = ri(4, 30) * 5;
    const b2 = square ? a : ri(4, 30) * 5;
    if (!square && b2 === a) return null;
    const k = pick([1, 2, 3, 4]);
    const per = square ? 4 * a : 2 * (a + b2);
    const tt = fdiv(fr(k * per), vms);
    if (!isInt(tt) || tt[0] > 1200) return null;
    const field = square ? T(`a square field of side ${a} m`, `${a} মিটার বাহুবিশিষ্ট একটি বর্গাকার মাঠ`) : T(`a rectangular field ${a} m long and ${b2} m wide`, `${a} মিটার লম্বা ও ${b2} মিটার চওড়া একটি আয়তাকার মাঠ`);
    const times = { 1: ['once', 'একবার'], 2: ['twice', 'দুবার'], 3: ['three times', 'তিনবার'], 4: ['four times', 'চারবার'] }[k];
    stem = T(
      `How many seconds will a man take to go ${times[0]} around ${field.en} if his speed is ${v} km/h?`,
      `ঘণ্টায় ${v} কিমি বেগে চললে একজন লোকের ${field.bn} ${times[1]} ঘুরে আসতে কত সেকেন্ড লাগবে?`,
    );
    const sec = (f) => T(`${fstr(f)} seconds`, `${fstr(f)} সেকেন্ড`);
    opts = fracOptions(tt, sec, [
      ...(k > 1 ? [[fdiv(fr(per), vms), `That is one round only; he goes around ${k} times.`, `এটি কেবল এক পাক; সে ${k} বার ঘোরে।`]] : []),
      [fdiv(fr(k * (square ? 2 * a : a + b2)), vms), 'Half the perimeter was used; one round is the full boundary.', 'অর্ধেক পরিসীমা নেওয়া হয়েছে; এক পাক মানে পুরো সীমানা।'],
      [fdiv(fr(k * per), fr(v)), 'The speed was not converted to m/s (× 5/18).', 'গতিকে মিটার/সেকেন্ডে (× 5/18) বদলানো হয়নি।'],
    ]);
    steps = [
      T(`Distance = ${k} × ${square ? `4 × ${a}` : `2 × (${a} + ${b2})`} = ${k * per} m.`, `দূরত্ব = ${k} × ${square ? `4 × ${a}` : `2 × (${a} + ${b2})`} = ${k * per} মিটার।`),
      T(`Speed = ${v} × 5/18 = ${fstr(vms, true)} m/s; time = ${k * per} ÷ ${fstr(vms, true)} = ${tt[0]} seconds.`, `গতি = ${v} × 5/18 = ${fstr(vms, true)} মিটার/সেকেন্ড; সময় = ${k * per} ÷ ${fstr(vms, true)} = ${tt[0]} সেকেন্ড।`),
    ];
  } else {
    const toKmh = pick([true, true, false]);
    const kmh = ri(2, 30) * pick([1, 1, 2]);
    const ms = fr(kmh * 5, 18);
    if (isInt(ms) && toKmh) return null; // the PYQ form has a fractional m/s
    if (toKmh) {
      stem = T(`What is the speed of ${fstr(ms)} m/s in km/h?`, `${fstr(ms)} মিটার/সেকেন্ড গতিকে কিমি/ঘণ্টায় প্রকাশ করলে কত হয়?`);
      opts = fracOptions(fr(kmh), KMH, [
        [fmul(ms, fr(5, 18)), 'Multiplied by 5/18; m/s → km/h needs × 18/5.', '5/18 দিয়ে গুণ করা হয়েছে; মিটার/সেকেন্ড থেকে কিমি/ঘণ্টায় × 18/5 লাগে।'],
        [fr(Math.floor(ms[0] / ms[1]) * 18, 5), 'Only the whole-number part of the mixed fraction was converted.', 'মিশ্র ভগ্নাংশের শুধু পূর্ণ অংশটি রূপান্তর করা হয়েছে।'],
      ]);
      steps = [
        T(`${fstr(ms)} m/s = ${ms[0]}/${ms[1]} m/s.`, `${fstr(ms)} মিটার/সেকেন্ড = ${ms[0]}/${ms[1]} মিটার/সেকেন্ড।`),
        T(`× 18/5: (${ms[0]} × 18) ÷ (${ms[1]} × 5) = ${kmh} km/h.`, `× 18/5: (${ms[0]} × 18) ÷ (${ms[1]} × 5) = ${kmh} কিমি/ঘণ্টা।`),
      ];
    } else {
      stem = T(`A cyclist rides at ${kmh} km/h. What is the speed in metres per second?`, `একজন সাইকেল আরোহী ঘণ্টায় ${kmh} কিমি বেগে চলেন। তাঁর গতি মিটার/সেকেন্ডে কত?`);
      opts = fracOptions(ms, unitFmt('m/s', 'মিটার/সেকেন্ড', false), [
        [fr(kmh * 18, 5), 'Multiplied by 18/5; km/h → m/s needs × 5/18.', '18/5 দিয়ে গুণ করা হয়েছে; কিমি/ঘণ্টা থেকে মিটার/সেকেন্ডে × 5/18 লাগে।'],
        [fr(kmh * 1000, 60), 'Divided by 60 only (that is metres per minute).', 'শুধু 60 দিয়ে ভাগ করা হয়েছে (এটি মিটার প্রতি মিনিট)।'],
      ], [fadd(ms, fr(1)), fsub(ms, fr(1, 2))]);
      steps = [
        T(`1 km/h = 1000 m ÷ 3600 s = 5/18 m/s.`, `1 কিমি/ঘণ্টা = 1000 মিটার ÷ 3600 সেকেন্ড = 5/18 মিটার/সেকেন্ড।`),
        T(`${kmh} × 5/18 = ${fstr(ms)} m/s.`, `${kmh} × 5/18 = ${fstr(ms)} মিটার/সেকেন্ড।`),
      ];
    }
  }
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'basic_units', pattern: 'basic_units',
    tags: ['speed_distance', 'unit_conversion', framing],
    difficulty: 2, time: 45,
    stem, ...opts, steps,
    shortcut: T('km/h → m/s: × 5/18; m/s → km/h: × 18/5. n posts or trees in a row have n − 1 gaps.', 'কিমি/ঘণ্টা → মিটার/সেকেন্ড: × 5/18; মিটার/সেকেন্ড → কিমি/ঘণ্টা: × 18/5। সারিতে n টি খুঁটি বা গাছের মধ্যে n − 1 টি ফাঁক।'),
  });
}

// =====================================================================
// meeting_point
// =====================================================================
const MEET_FRAMINGS = [
  { key: 'walkers', speeds: [2, 3, 4, 5, 6], who: () => names(2), verb: ['walk', 'হাঁটতে থাকে'], k: [1, 2, 3] },
  { key: 'cyclists', speeds: [8, 9, 10, 12, 14, 15, 16, 18, 20], who: () => names(2), verb: ['cycle', 'সাইকেল চালায়'], k: [1, 2, 3] },
  { key: 'cars', speeds: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80], who: () => [T('a car', 'একটি গাড়ি'), T('a bus', 'একটি বাস')], verb: ['drive', 'চলতে থাকে'], k: [1, 2, 3, 4] },
];
const MEET_ASKS = ['from_a', 'from_b', 'difference', 'compare'];

function meetingPoint(framing = pick(MEET_FRAMINGS), ask = pick(MEET_ASKS)) {
  const [x, y] = shuffle(framing.speeds).slice(0, 2);
  const D = (x + y) * pick(framing.k);
  const ac = fr(D * x, x + y);
  const cb = fr(D * y, x + y);
  const intro = T(
    `The distance between A and B is ${D} km. ${framing.key === 'cars' ? 'A car and a bus start' : 'Two persons start'} from A and B respectively at the same time and ${framing.verb[0]} towards each other at ${x} km/h and ${y} km/h respectively. They meet at a point C.`,
    `A ও B-এর মধ্যে দূরত্ব ${D} কিমি। ${framing.key === 'cars' ? 'একটি গাড়ি ও একটি বাস' : 'দুজন ব্যক্তি'} একই সময়ে যথাক্রমে A ও B থেকে রওনা দিয়ে যথাক্রমে ঘণ্টায় ${x} কিমি ও ${y} কিমি বেগে পরস্পরের দিকে ${framing.verb[1]}। তাদের C বিন্দুতে দেখা হয়।`,
  );
  const tm = fr(D, x + y);
  let q;
  let opts;
  if (ask === 'compare') {
    if (x === y) return null;
    q = T('Then which of the following is true?', 'তাহলে নিচের কোনটি সত্য?');
    const right = x > y ? T('AC > CB', 'AC > CB') : T('AC < CB', 'AC < CB');
    const wrongSide = x > y ? T('AC < CB', 'AC < CB') : T('AC > CB', 'AC > CB');
    opts = {
      correct: right,
      wrong: [
        { ...wrongSide, trap: T('The faster one covers MORE in the same time, so his side of C is longer.', 'একই সময়ে দ্রুতগামী জন বেশি পথ যায়, তাই C থেকে তার দিকের অংশ বড়।') },
        { ...T('AC = CB', 'AC = CB'), trap: T('They meet at the middle only if their speeds are equal.', 'গতি সমান হলে তবেই মাঝখানে দেখা হয়।') },
        { ...T(`AC = ${fstr(tm, true)} km`, `AC = ${fstr(tm, true)} কিমি`), trap: T('That number is the meeting TIME in hours, not a distance.', 'এই সংখ্যাটি ঘণ্টায় দেখা হওয়ার সময়, দূরত্ব নয়।') },
      ],
    };
  } else {
    const ans = ask === 'from_a' ? ac : ask === 'from_b' ? cb : fr(Math.abs(D * (x - y)), x + y);
    if (ask === 'difference' && x === y) return null;
    q = {
      from_a: T('How far is C from A?', 'A থেকে C কত দূরে?'),
      from_b: T('How far is C from B?', 'B থেকে C কত দূরে?'),
      difference: T('By how many km is AC different from CB?', 'AC ও CB-এর মধ্যে পার্থক্য কত কিমি?'),
    }[ask];
    const other = ask === 'from_a' ? cb : ac;
    opts = fracOptions(ans, KM, [
      ...(ask === 'difference' ? [] : [[other, 'That is the distance from the other end; each covers speed × meeting time.', 'এটি অন্য প্রান্ত থেকে দূরত্ব; প্রত্যেকে যায় গতি × দেখা হওয়ার সময়।']]),
      [fr(D, 2), 'The halfway point is correct only when the speeds are equal.', 'গতি সমান হলে তবেই মাঝপথে দেখা হয়।'],
      [tm, 'That is the meeting time in hours, not a distance.', 'এটি ঘণ্টায় দেখা হওয়ার সময়, দূরত্ব নয়।'],
    ]);
  }
  if (!opts) return null;
  const steps = [
    T(`Towards each other: closing speed = ${x} + ${y} = ${x + y} km/h; time to meet = ${D} ÷ ${x + y} = ${fstr(tm)} h.`, `পরস্পরের দিকে: ব্যবধান কমার গতি = ${x} + ${y} = ${x + y} কিমি/ঘণ্টা; দেখা হওয়ার সময় = ${D} ÷ ${x + y} = ${fstr(tm)} ঘণ্টা।`),
    T(`AC = ${x} × ${fstr(tm)} = ${fstr(ac, true)} km and CB = ${y} × ${fstr(tm)} = ${fstr(cb, true)} km (they split ${D} in the ratio ${x} : ${y}).`, `AC = ${x} × ${fstr(tm)} = ${fstr(ac, true)} কিমি এবং CB = ${y} × ${fstr(tm)} = ${fstr(cb, true)} কিমি (${D}-কে ${x} : ${y} অনুপাতে ভাগ)।`),
  ];
  return build({
    topic: TOPIC, subtopic: 'meeting_point_where', pattern: 'meeting_point', // 'meeting_point' is taken: that older subtopic asks WHEN they meet (relative_speed)
    tags: ['speed_distance', 'relative_speed', 'meeting_point', framing.key],
    difficulty: ask === 'compare' ? 2 : 3, time: ask === 'compare' ? 45 : 60,
    stem: T(`${intro.en} ${q.en}`, `${intro.bn} ${q.bn}`), ...opts, steps,
    shortcut: T('Same time for both, so the distances are in the ratio of the speeds: split the total in x : y.', 'দুজনের সময় একই, তাই দূরত্ব গতির অনুপাতে: মোট দূরত্বকে x : y অনুপাতে ভাগ করো।'),
  });
}

// =====================================================================
// part_journey_speeds
// =====================================================================
const PART_FRAMINGS = ['increasing', 'unequal_parts', 'time_parts'];

function partJourney(framing = pick(PART_FRAMINGS)) {
  let stem;
  let opts;
  let steps;
  let difficulty = 3;
  if (framing === 'increasing') {
    const v0 = pick([30, 40, 45, 50, 60, 70]);
    const inc = pick([5, 10, 15, 20]);
    const k = pick([1, 2, 2]);
    const n = ri(1, 3);
    const r = ri(1, k * 12 - 1) * 5; // minutes into the next block
    let D = 0;
    const parts = [];
    for (let i = 0; i < n; i++) { D += (v0 + i * inc) * k; parts.push(`${k} h × ${v0 + i * inc} = ${(v0 + i * inc) * k}`); }
    const vLast = v0 + n * inc;
    const last = fr(vLast * r, 60);
    if (!isInt(last)) return null;
    D += last[0];
    const total = n * k * 60 + r;
    const vehicle = pick([['A motor car', 'একটি মোটরগাড়ি'], ['A bus', 'একটি বাস'], ['A truck', 'একটি ট্রাক']]);
    const every = k === 1 ? T('every hour', 'প্রতি ঘণ্টায়') : T(`every ${k} hours`, `প্রতি ${k} ঘণ্টায়`);
    stem = T(
      `${vehicle[0]} starts with a speed of ${v0} km/h, and its speed increases by ${inc} km/h ${every.en}. In how much time will it cover ${D} km?`,
      `${vehicle[1]} ঘণ্টায় ${v0} কিমি বেগে যাত্রা শুরু করে এবং ${every.bn} তার গতি ঘণ্টায় ${inc} কিমি করে বাড়ে। ${D} কিমি যেতে কত সময় লাগবে?`,
    );
    const flat = fr(D * 60, v0);
    opts = durationOptions(total, [
      ...(isInt(flat) ? [[flat[0], 'The speed does not stay at the starting value; it rises block by block.', 'গতি শুরুর মানে থাকে না; প্রতি পর্বে বাড়ে।']] : []),
      [(n + 1) * k * 60, 'The last block is only partly used; find the time for the leftover distance alone.', 'শেষ পর্বটি পুরো লাগে না; বাকি দূরত্বের সময় আলাদা করে বের করো।'],
    ], 15);
    steps = [
      T(`Full blocks: ${parts.join('; ')} → ${D - last[0]} km in ${n * k} hours.`, `পূর্ণ পর্ব: ${parts.join('; ')} → ${n * k} ঘণ্টায় ${D - last[0]} কিমি।`),
      T(`Left: ${D} − ${D - last[0]} = ${last[0]} km at ${vLast} km/h → ${last[0]} ÷ ${vLast} h = ${r} minutes.`, `বাকি: ${D} − ${D - last[0]} = ${last[0]} কিমি, ঘণ্টায় ${vLast} কিমি বেগে → ${last[0]} ÷ ${vLast} ঘণ্টা = ${r} মিনিট।`),
      T(`Total = ${n * k} hours + ${r} minutes = ${duration(total).en}.`, `মোট = ${n * k} ঘণ্টা + ${r} মিনিট = ${duration(total).bn}।`),
    ];
  } else if (framing === 'unequal_parts') {
    const v1 = pick([20, 25, 30, 40, 45, 50, 60]);
    const v2 = pick([30, 36, 40, 48, 50, 60, 75, 80]);
    if (v1 === v2) return null;
    const t1 = pick([1, 2, 3, 4]);
    const t2 = pick([1, 2, 3, 5]);
    const d1 = v1 * t1;
    const d2 = v2 * t2;
    if (d1 === d2) return null;
    const ans = fr(d1 + d2, t1 + t2);
    if (ans[1] > 9) return null;
    const [X] = names(1);
    stem = T(
      `${X.en} travels the first ${d1} km of a journey at ${v1} km/h and the next ${d2} km at ${v2} km/h. What is the average speed for the whole journey?`,
      `${X.bn} একটি যাত্রার প্রথম ${d1} কিমি ঘণ্টায় ${v1} কিমি বেগে এবং পরের ${d2} কিমি ঘণ্টায় ${v2} কিমি বেগে যায়। পুরো যাত্রায় গড় গতি কত?`,
    );
    opts = fracOptions(ans, KMH, [
      [fr(v1 + v2, 2), 'The plain mean of the speeds ignores how long each part took.', 'গতির সাধারণ গড়ে প্রতিটি অংশে কত সময় লেগেছে তা ধরা হয় না।'],
      [fr(2 * v1 * v2, v1 + v2), '2xy/(x + y) works only when the two distances are equal.', '2xy/(x + y) কেবল দুটি দূরত্ব সমান হলে খাটে।'],
    ]);
    steps = [
      T(`Times: ${d1} ÷ ${v1} = ${t1} h and ${d2} ÷ ${v2} = ${t2} h; total ${t1 + t2} h.`, `সময়: ${d1} ÷ ${v1} = ${t1} ঘণ্টা এবং ${d2} ÷ ${v2} = ${t2} ঘণ্টা; মোট ${t1 + t2} ঘণ্টা।`),
      T(`Average = (${d1} + ${d2}) ÷ ${t1 + t2} = ${fstr(ans, true)} km/h.`, `গড় = (${d1} + ${d2}) ÷ ${t1 + t2} = ${fstr(ans, true)} কিমি/ঘণ্টা।`),
    ];
  } else {
    difficulty = 2;
    const v1 = pick([30, 35, 40, 45, 50, 60]);
    const v2 = pick([40, 48, 54, 60, 64, 72, 80]);
    const t1 = pick([1, 2, 3]);
    const t2 = pick([1, 2, 3, 4]);
    if (v1 === v2 || t1 === t2) return null;
    const ans = fr(v1 * t1 + v2 * t2, t1 + t2);
    if (ans[1] > 7) return null;
    const vehicle = pick([['A car', 'একটি গাড়ি'], ['A bus', 'একটি বাস'], ['A train', 'একটি ট্রেন']]);
    stem = T(
      `${vehicle[0]} runs for ${t1} hour${t1 > 1 ? 's' : ''} at ${v1} km/h and then for ${t2} hour${t2 > 1 ? 's' : ''} at ${v2} km/h. What is its average speed for the whole run?`,
      `${vehicle[1]} ${t1} ঘণ্টা ঘণ্টায় ${v1} কিমি বেগে এবং তারপর ${t2} ঘণ্টা ঘণ্টায় ${v2} কিমি বেগে চলে। পুরো যাত্রায় গড় গতি কত?`,
    );
    opts = fracOptions(ans, KMH, [
      [fr(v1 + v2, 2), 'The plain mean is right only if both parts last equally long.', 'দুটি অংশ সমান সময় চললে তবেই সাধারণ গড় ঠিক।'],
      [fr(2 * v1 * v2, v1 + v2), '2xy/(x + y) is for equal DISTANCES; here the times are given.', '2xy/(x + y) সমান দূরত্বের জন্য; এখানে সময় দেওয়া আছে।'],
    ]);
    steps = [
      T(`Distance = ${v1} × ${t1} + ${v2} × ${t2} = ${v1 * t1 + v2 * t2} km in ${t1 + t2} hours.`, `দূরত্ব = ${v1} × ${t1} + ${v2} × ${t2} = ${v1 * t1 + v2 * t2} কিমি, ${t1 + t2} ঘণ্টায়।`),
      T(`Average = ${v1 * t1 + v2 * t2} ÷ ${t1 + t2} = ${fstr(ans, true)} km/h.`, `গড় = ${v1 * t1 + v2 * t2} ÷ ${t1 + t2} = ${fstr(ans, true)} কিমি/ঘণ্টা।`),
    ];
  }
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'part_journey_speeds', pattern: 'part_journey_speeds',
    tags: ['speed_distance', 'average_speed', framing],
    difficulty, time: framing === 'increasing' ? 90 : 60,
    stem, ...opts, steps,
    shortcut: T('Work part by part: time = distance ÷ speed for each part, then total distance ÷ total time.', 'অংশ ধরে ধরে হিসাব: প্রতিটি অংশে সময় = দূরত্ব ÷ গতি, তারপর মোট দূরত্ব ÷ মোট সময়।'),
  });
}

// =====================================================================
// speed_ratio_time
// =====================================================================
const RATIO_FRAMINGS = ['find_speed', 'distance', 'time_ratio', 'percent_faster'];
const TRAIN_PAIRS = [[['Rajdhani Express', 'রাজধানী এক্সপ্রেস'], ['Poorva Express', 'পূর্বা এক্সপ্রেস']], [['the first train', 'প্রথম ট্রেন'], ['the second train', 'দ্বিতীয় ট্রেন']], [['the car', 'গাড়ি'], ['the bus', 'বাস']], [['Shatabdi Express', 'শতাব্দী এক্সপ্রেস'], ['a local train', 'একটি লোকাল ট্রেন']]];

function speedRatio(framing = pick(RATIO_FRAMINGS)) {
  let stem;
  let opts;
  let steps;
  if (framing === 'find_speed' || framing === 'distance') {
    const p = ri(2, 9);
    const q = ri(2, 9);
    if (p === q || gcd(p, q) !== 1) return null;
    const [A, B] = pick(TRAIN_PAIRS).map(([en, bn]) => T(en, bn));
    const t = pick([2, 3, 4, 5, 6]);
    const vB = ri(4, 24) * 5;
    const D = vB * t;
    const cap = (s) => s[0].toUpperCase() + s.slice(1);
    const intro = T(
      `The ratio of the speeds of ${A.en} and ${B.en} is ${p} : ${q}. ${cap(B.en)} covers ${D} km in ${t} hours.`,
      `${A.bn} ও ${B.bn}-এর গতির অনুপাত ${p} : ${q}। ${B.bn} ${t} ঘণ্টায় ${D} কিমি যায়।`,
    );
    const vA = fr(vB * p, q);
    if (framing === 'find_speed') {
      if (![1, 2].includes(vA[1])) return null;
      stem = T(`${intro.en} What is the speed of ${A.en}?`, `${intro.bn} ${A.bn}-এর গতি কত?`);
      opts = fracOptions(vA, KMH, [
        [fr(vB * q, p), 'The ratio was turned upside down: speed of the first = second × p/q.', 'অনুপাত উল্টে গেছে: প্রথমের গতি = দ্বিতীয়ের গতি × p/q।'],
        [fr(vB), 'That is the speed of the second one.', 'এটি দ্বিতীয়টির গতি।'],
      ]);
      steps = [
        T(`Speed of ${B.en} = ${D} ÷ ${t} = ${vB} km/h.`, `${B.bn}-এর গতি = ${D} ÷ ${t} = ${vB} কিমি/ঘণ্টা।`),
        T(`Speed of ${A.en} = ${vB} × ${p}/${q} = ${fstr(vA, true)} km/h.`, `${A.bn}-এর গতি = ${vB} × ${p}/${q} = ${fstr(vA, true)} কিমি/ঘণ্টা।`),
      ];
    } else {
      const t2 = pick([2, 3, 4, 5]);
      const dA = fmul(vA, fr(t2));
      if (!isInt(dA)) return null;
      stem = T(`${intro.en} How far will ${A.en} travel in ${t2} hours?`, `${intro.bn} ${A.bn} ${t2} ঘণ্টায় কত দূর যাবে?`);
      opts = fracOptions(dA, KM, [
        [fr(vB * q * t2, p), 'The ratio was turned upside down.', 'অনুপাত উল্টে গেছে।'],
        [fr(vB * t2), `That is how far ${B.en} goes in ${t2} hours.`, `এটি ${t2} ঘণ্টায় ${B.bn} যতটা যায়।`],
        [fmul(vA, fr(t)), `That uses ${t} hours instead of ${t2}.`, `এখানে ${t2}-এর বদলে ${t} ঘণ্টা ধরা হয়েছে।`],
      ]);
      steps = [
        T(`Speed of ${B.en} = ${D} ÷ ${t} = ${vB} km/h, so ${A.en} runs at ${vB} × ${p}/${q} = ${fstr(vA, true)} km/h.`, `${B.bn}-এর গতি = ${D} ÷ ${t} = ${vB} কিমি/ঘণ্টা, তাই ${A.bn}-এর গতি ${vB} × ${p}/${q} = ${fstr(vA, true)} কিমি/ঘণ্টা।`),
        T(`Distance in ${t2} hours = ${fstr(vA, true)} × ${t2} = ${dA[0]} km.`, `${t2} ঘণ্টায় দূরত্ব = ${fstr(vA, true)} × ${t2} = ${dA[0]} কিমি।`),
      ];
    }
  } else if (framing === 'time_ratio') {
    const s = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
    if (gcd(gcd(s[0], s[1]), s[2]) !== 1) return null;
    const l = s.reduce((a, b) => (a * b) / gcd(a, b));
    const tr = s.map((v) => l / v);
    const g = tr.reduce((a, b) => gcd(a, b));
    const tt = tr.map((v) => v / g);
    const fmtR = (r) => T(r.join(' : '), r.join(' : '));
    const what = pick([['three cars', 'তিনটি গাড়ির'], ['three cyclists', 'তিনজন সাইকেল আরোহীর'], ['three trains', 'তিনটি ট্রেনের']]);
    stem = T(
      `The speeds of ${what[0]} are in the ratio ${s.join(' : ')}. What is the ratio of the times taken by them to travel the same distance?`,
      `${what[1]} গতির অনুপাত ${s.join(' : ')}। একই দূরত্ব যেতে তাদের সময়ের অনুপাত কত?`,
    );
    const cands = [
      [s, 'Time is INVERSELY proportional to speed; the speed ratio cannot be copied.', 'সময় গতির ব্যস্তানুপাতিক; গতির অনুপাত হুবহু লেখা যায় না।'],
      [[...s].reverse(), 'Just reversing the order works for two terms only; take reciprocals and clear the fractions.', 'শুধু ক্রম উল্টে দেওয়া কেবল দুটি পদে চলে; উল্টো ভগ্নাংশ নিয়ে হর সরাও।'],
      [[...tt].reverse(), 'The reciprocals are right but written in the wrong order.', 'উল্টো ভগ্নাংশ ঠিক, কিন্তু ক্রম ভুল।'],
      [[tt[1], tt[0], tt[2]], null],
      [[tt[0], tt[2], tt[1]], null],
    ];
    const seen = new Set([tt.join(':')]);
    const wrong = [];
    for (const [r, en, bn] of cands) {
      if (seen.has(r.join(':')) || wrong.length >= 3) continue;
      seen.add(r.join(':'));
      wrong.push({ ...fmtR(r), ...(en && { trap: T(en, bn) }) });
    }
    if (wrong.length < 3) return null;
    opts = { correct: fmtR(tt), wrong };
    steps = [
      T(`Same distance, so time ∝ 1/speed: 1/${s[0]} : 1/${s[1]} : 1/${s[2]}.`, `একই দূরত্বে সময় ∝ 1/গতি: 1/${s[0]} : 1/${s[1]} : 1/${s[2]}।`),
      T(`Multiply by the LCM ${l}: ${tr.join(' : ')}${g > 1 ? ` = ${tt.join(' : ')}` : ''}.`, `ল.সা.গু. ${l} দিয়ে গুণ করে: ${tr.join(' : ')}${g > 1 ? ` = ${tt.join(' : ')}` : ''}।`),
    ];
  } else {
    const p = pick([20, 25, 50, 60, 100, 150]);
    const T0 = ri(6, 60) * 10; // minutes
    const tA = fr(T0 * 100, 100 + p);
    if (!isInt(tA) || tA[0] % 5) return null;
    const V = {
      electric: ['an electric train', 'the electric train', 'বৈদ্যুতিক ট্রেন', 'বৈদ্যুতিক ট্রেনের'],
      steam: ['a steam-engine train', 'the steam-engine train', 'বাষ্পচালিত ট্রেন', 'বাষ্পচালিত ট্রেনের'],
      car: ['a car', 'the car', 'গাড়ি', 'গাড়ির'],
      bus: ['a bus', 'the bus', 'বাস', 'বাসের'],
      bike: ['a motorbike', 'the motorbike', 'মোটরবাইক', 'মোটরবাইকের'],
      cycle: ['a bicycle', 'the bicycle', 'সাইকেল', 'সাইকেলের'],
    };
    const [A, B] = pick([['electric', 'steam'], ['car', 'bus'], ['bike', 'cycle'], ['car', 'cycle']]).map((k) => V[k]);
    const cap = (x) => x[0].toUpperCase() + x.slice(1);
    stem = T(
      `The speed of ${A[0]} is ${p}% more than that of ${B[0]}. ${cap(B[1])} takes ${duration(T0).en} to cover a certain distance. How long will ${A[1]} take to cover the same distance?`,
      `একটি ${A[3]} গতি একটি ${B[3]} গতির থেকে ${p}% বেশি। ${B[2]}টি একটি নির্দিষ্ট দূরত্ব যেতে ${duration(T0).bn} নেয়। ${A[2]}টি একই দূরত্ব যেতে কত সময় নেবে?`,
    );
    const cut = fr(T0 * (100 - p), 100);
    opts = durationOptions(tA[0], [
      ...(p < 100 && isInt(cut) ? [[cut[0], `Cutting the time by ${p}% is wrong: time = old time × 100/${100 + p}.`, `সময় ${p}% কমানো ভুল: সময় = পুরনো সময় × 100/${100 + p}।`]] : []),
      ...(isInt(fr(T0 * (100 + p), 100)) ? [[T0 * (100 + p) / 100, 'A faster vehicle takes LESS time, not more.', 'দ্রুততর যান কম সময় নেয়, বেশি নয়।']] : []),
    ], 10);
    steps = [
      T(`Speeds are in the ratio ${100 + p} : 100, so for the same distance the times are 100 : ${100 + p}.`, `গতির অনুপাত ${100 + p} : 100, তাই একই দূরত্বে সময়ের অনুপাত 100 : ${100 + p}।`),
      T(`Time = ${T0} min × 100/${100 + p} = ${tA[0]} minutes${tA[0] >= 60 ? ` = ${duration(tA[0]).en}` : ''}.`, `সময় = ${T0} মিনিট × 100/${100 + p} = ${tA[0]} মিনিট${tA[0] >= 60 ? ` = ${duration(tA[0]).bn}` : ''}।`),
    ];
  }
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'speed_ratio_time', pattern: 'speed_ratio_time',
    tags: ['speed_distance', 'ratio', framing],
    difficulty: framing === 'percent_faster' ? 3 : 2, time: framing === 'percent_faster' ? 75 : 45,
    stem, ...opts, steps,
    shortcut: T('Same distance: times are the inverse ratio of speeds. Same time: distances are in the ratio of speeds.', 'একই দূরত্বে: সময় গতির ব্যস্ত অনুপাতে। একই সময়ে: দূরত্ব গতির অনুপাতে।'),
  });
}

// =====================================================================
// speed_for_remaining_part
// =====================================================================
const REM_FRAMINGS = ['fraction_time', 'fraction_speed', 'km_speed'];
// [num, den, English, Bengali, Bengali locative]
const FRACS = [[1, 2, 'one-half', 'অর্ধেক', 'অর্ধেকে'], [1, 3, 'one-third', 'এক-তৃতীয়াংশ', 'এক-তৃতীয়াংশে'], [2, 3, 'two-thirds', 'দুই-তৃতীয়াংশ', 'দুই-তৃতীয়াংশে'], [1, 4, 'one-fourth', 'এক-চতুর্থাংশ', 'এক-চতুর্থাংশে'], [3, 4, 'three-fourths', 'তিন-চতুর্থাংশ', 'তিন-চতুর্থাংশে'], [2, 5, 'two-fifths', 'দুই-পঞ্চমাংশ', 'দুই-পঞ্চমাংশে'], [3, 5, 'three-fifths', 'তিন-পঞ্চমাংশ', 'তিন-পঞ্চমাংশে']];

function remainingSpeed(framing = pick(REM_FRAMINGS)) {
  const [X] = names(1);
  let stem;
  let D;
  let Tm;
  let left;
  let leftMin;
  let first;
  if (framing === 'fraction_time') {
    const fd = pick(FRACS);
    const ft = pick(FRACS);
    if (ft[0] * fd[1] <= fd[0] * ft[1]) return null; // first part slower than plan, so the rest needs speed
    D = ri(2, 12) * fd[1];
    Tm = ri(1, 12) * 15;
    if ((Tm * ft[0]) % ft[1]) return null;
    left = fr(D * (fd[1] - fd[0]), fd[1]);
    leftMin = Tm - (Tm * ft[0]) / ft[1];
    stem = T(
      `${X.en} has to cover a distance of ${D} km in ${duration(Tm).en}. If ${fd[2]} of the distance is covered in ${ft[2]} of the total time, what must the speed be to cover the remaining distance in the remaining time?`,
      `${X.bn}কে ${durIn(Tm).bn} ${D} কিমি পথ যেতে হবে। পথের ${fd[3]} যদি মোট সময়ের ${ft[4]} যাওয়া হয়, তবে বাকি সময়ে বাকি পথ যেতে গতি কত হতে হবে?`,
    );
    first = T(`Distance left = ${D} − ${fstr(fr(D * fd[0], fd[1]))} = ${fstr(left)} km; time used = ${ft[0]}/${ft[1]} × ${Tm} = ${Tm - leftMin} min, so time left = ${leftMin} min.`, `বাকি পথ = ${D} − ${fstr(fr(D * fd[0], fd[1]))} = ${fstr(left)} কিমি; খরচ হওয়া সময় = ${ft[0]}/${ft[1]} × ${Tm} = ${Tm - leftMin} মিনিট, তাই বাকি সময় = ${leftMin} মিনিট।`);
  } else {
    const v = framing === 'km_speed' ? pick([30, 36, 40, 45, 48, 50, 60]) : pick([3, 4, 5, 6, 8, 10, 12, 15]);
    let d1;
    if (framing === 'fraction_speed') {
      const fd = pick(FRACS);
      D = ri(1, 15) * fd[1];
      d1 = (D * fd[0]) / fd[1];
      Tm = ri(2, 24) * 6;
      stem = T(
        `${X.en} decided to cover a distance of ${D} km in ${Tm} minutes. ${X.en} covers ${fd[2]} of the distance at ${v} km/h and the rest at a different speed. What is the speed for the remaining distance?`,
        `${X.bn} ${Tm} মিনিটে ${D} কিমি পথ যাওয়ার সিদ্ধান্ত নিল। পথের ${fd[3]} ঘণ্টায় ${v} কিমি বেগে যায় এবং বাকিটা অন্য গতিতে। বাকি পথের জন্য গতি কত?`,
      );
    } else {
      D = ri(4, 40) * 10;
      d1 = ri(1, D / 10 - 1) * 10;
      Tm = ri(2, 10) * 60;
      const veh = pick([['A bus', 'একটি বাস'], ['A truck', 'একটি ট্রাক'], ['A car', 'একটি গাড়ি']]);
      stem = T(
        `${veh[0]} has to cover ${D} km in ${duration(Tm).en}. It covers the first ${d1} km at ${v} km/h. At what speed must it cover the rest to arrive on time?`,
        `${veh[1]}কে ${durIn(Tm).bn} ${D} কিমি যেতে হবে। প্রথম ${d1} কিমি সেটি ঘণ্টায় ${v} কিমি বেগে যায়। সময়মতো পৌঁছতে বাকি পথ কত বেগে যেতে হবে?`,
      );
    }
    const used = fr(d1 * 60, v);
    if (!isInt(used) || used[0] >= Tm) return null;
    left = fr(D - d1);
    leftMin = Tm - used[0];
    first = T(`Time used = ${d1} ÷ ${v} h = ${used[0]} min, so time left = ${Tm} − ${used[0]} = ${leftMin} min; distance left = ${D} − ${d1} = ${D - d1} km.`, `খরচ হওয়া সময় = ${d1} ÷ ${v} ঘণ্টা = ${used[0]} মিনিট, তাই বাকি সময় = ${Tm} − ${used[0]} = ${leftMin} মিনিট; বাকি পথ = ${D} − ${d1} = ${D - d1} কিমি।`);
  }
  if (left[0] <= 0) return null;
  const ans = fdiv(left, fr(leftMin, 60));
  const av = ans[0] / ans[1];
  if (![1, 2].includes(ans[1]) || (framing === 'km_speed' ? av < 20 || av > 90 : av > 24)) return null;
  const opts = fracOptions(ans, KMH, [
    [fr(D * 60, Tm), 'That is the planned average speed for the whole trip, not the speed needed for the rest.', 'এটি পুরো পথের পরিকল্পিত গড় গতি, বাকি পথের প্রয়োজনীয় গতি নয়।'],
    [fdiv(left, fr(Tm, 60)), 'The time left must be used, not the whole time.', 'পুরো সময় নয়, বাকি সময় নিতে হবে।'],
  ]);
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'speed_for_remaining_part', pattern: 'speed_for_remaining_part',
    tags: ['speed_distance', 'remaining_speed', framing],
    difficulty: 3, time: 75,
    stem, ...opts,
    steps: [first, T(`Speed = ${fstr(left)} km ÷ ${leftMin}/60 h = ${fstr(ans, true)} km/h.`, `গতি = ${fstr(left)} কিমি ÷ ${leftMin}/60 ঘণ্টা = ${fstr(ans, true)} কিমি/ঘণ্টা।`)],
    shortcut: T('Only what is left matters: (distance left) ÷ (time left in hours).', 'শুধু বাকি অংশ নিয়েই হিসাব: (বাকি দূরত্ব) ÷ (ঘণ্টায় বাকি সময়)।'),
  });
}

// =====================================================================
// meeting_staggered_start
// =====================================================================
const STAG_FRAMINGS = ['late_start', 'timetable', 'stops'];

/** Ends a sentence after a label that may already end in "a.m.". */
const dot = (x) => (x.endsWith('.') ? x : `${x}.`);

/** Whole hour h (0..23) -> "8 a.m." / "12 noon" / "3 p.m." in both languages. */
function hourLabel(h) {
  if (h === 12) return T('12 noon', 'দুপুর 12টা');
  const en = `${h % 12 || 12} ${h < 12 ? 'a.m.' : 'p.m.'}`;
  const bn = `${h < 12 ? 'সকাল' : h < 16 ? 'দুপুর' : h < 18 ? 'বিকেল' : 'সন্ধ্যা'} ${h % 12 || 12}টা`;
  return T(en, bn);
}
/** minutes-after-midnight as a fraction -> "17 1/7 min past 10 a.m." or clock("10:20 a.m.") when whole. */
function meetLabel(f) {
  if (isInt(f)) return clock(f[0]);
  const h = Math.floor(f[0] / f[1] / 60);
  const m = fsub(f, fr(h * 60));
  return T(`${fstr(m)} min past ${hourLabel(h).en}`, `${hourLabel(h).bn} বেজে ${fstr(m)} মিনিট`);
}

function meetingStaggered(framing = pick(STAG_FRAMINGS)) {
  let stem;
  let opts;
  let steps;
  if (framing === 'late_start') {
    const v1 = ri(6, 16) * 5;
    const v2 = ri(6, 16) * 5;
    const g = pick([30, 60, 60, 90, 120]); // minutes
    const tMeet = ri(2, 16) * 15; // after the second start
    const head = fr(v1 * g, 60);
    const D = fadd(head, fr((v1 + v2) * tMeet, 60));
    if (!isInt(D) || !isInt(head)) return null;
    const t1 = ri(5, 11) * 60 + pick([0, 0, 30]);
    const t2 = t1 + g;
    const [P, Q] = twoPlaces();
    stem = T(
      `${P.en} and ${Q.en} are ${D[0]} km apart. A train starts from ${P.en} towards ${Q.en} at ${clock(t1).en} at ${v1} km/h. Another train leaves ${Q.en} towards ${P.en} at ${clock(t2).en} at ${v2} km/h. At what time do the trains meet?`,
      `${P.bn} ও ${Q.bn}-এর মধ্যে দূরত্ব ${D[0]} কিমি। একটি ট্রেন ${clock(t1).bn}-এ ${P.bn} থেকে ${Q.bn}-এর দিকে ঘণ্টায় ${v1} কিমি বেগে রওনা দেয়। আরেকটি ট্রেন ${clock(t2).bn}-এ ${Q.bn} থেকে ${P.bn}-এর দিকে ঘণ্টায় ${v2} কিমি বেগে ছাড়ে। কখন ট্রেন দুটির দেখা হবে?`,
    );
    const noHead = fr(D[0] * 60, v1 + v2);
    opts = fracOptions(fr(t2 + tMeet), (f) => (isInt(f) ? clock(f[0]) : meetLabel(f)), [
      [fr(t1 + tMeet), 'The meeting time is counted from the SECOND train\'s start.', 'দেখা হওয়ার সময় দ্বিতীয় ট্রেনের রওনা থেকে গুনতে হয়।'],
      [fadd(fr(t2), noHead), 'The first train\'s head start was ignored; subtract what it covered alone.', 'প্রথম ট্রেনের আগাম যাত্রা বাদ পড়েছে; সে একা যতটা গেছে তা বাদ দাও।'],
    ], [fr(t2 + tMeet + 60), fr(t2 + tMeet - 60), fr(t2 + tMeet + 30)]);
    steps = [
      T(`From ${clock(t1).en} to ${clock(t2).en} only the first train runs: ${v1} × ${fstr(fr(g, 60))} = ${head[0]} km. Gap left = ${D[0]} − ${head[0]} = ${D[0] - head[0]} km.`, `${clock(t1).bn} থেকে ${clock(t2).bn} পর্যন্ত শুধু প্রথম ট্রেন চলে: ${v1} × ${fstr(fr(g, 60))} = ${head[0]} কিমি। বাকি ব্যবধান = ${D[0]} − ${head[0]} = ${D[0] - head[0]} কিমি।`),
      T(`Closing speed = ${v1} + ${v2} = ${v1 + v2} km/h; time = ${D[0] - head[0]} ÷ ${v1 + v2} = ${duration(tMeet).en}.`, `ব্যবধান কমার গতি = ${v1} + ${v2} = ${v1 + v2} কিমি/ঘণ্টা; সময় = ${D[0] - head[0]} ÷ ${v1 + v2} = ${duration(tMeet).bn}।`),
      T(`${clock(t2).en} + ${duration(tMeet).en} → they meet at ${clock(t2 + tMeet).en}`, `${clock(t2).bn} + ${duration(tMeet).bn} = ${clock(t2 + tMeet).bn}।`),
    ];
  } else if (framing === 'timetable') {
    const h1 = ri(5, 9);
    const T1 = ri(2, 6);
    const s = ri(0, T1 - 1);
    const T2 = ri(2, 6);
    const h3 = h1 + s;
    if (T1 === T2 && s === 0) return null;
    const meetAfter = fr(60 * (T1 - s) * T2, T1 + T2); // minutes after h3
    const at = fadd(fr(h3 * 60), meetAfter);
    if (isInt(at) && at[0] % 60 === 0) return null;
    const [P, Q] = twoPlaces();
    stem = T(
      `A train starts from ${P.en} at ${hourLabel(h1).en} and reaches ${dot(`${Q.en} at ${hourLabel(h1 + T1).en}`)} Another train leaves ${Q.en} at ${hourLabel(h3).en} and reaches ${dot(`${P.en} at ${hourLabel(h3 + T2).en}`)} When do the two trains meet?`,
      `একটি ট্রেন ${hourLabel(h1).bn}য় ${P.bn} থেকে ছেড়ে ${hourLabel(h1 + T1).bn}য় ${Q.bn} পৌঁছায়। আরেকটি ট্রেন ${hourLabel(h3).bn}য় ${Q.bn} থেকে ছেড়ে ${hourLabel(h3 + T2).bn}য় ${P.bn} পৌঁছায়। ট্রেন দুটির কখন দেখা হবে?`,
    );
    const hints = [];
    if (s > 0) hints.push([fadd(fr(h3 * 60), fr(60 * T1 * T2, T1 + T2)), 'The first train had already covered part of the route before the second one started.', 'দ্বিতীয় ট্রেন ছাড়ার আগেই প্রথম ট্রেন পথের কিছুটা পেরিয়ে গিয়েছিল।']);
    hints.push([fsub(at, fr(60)), 'Check the hour: the meeting is counted from the later start.', 'ঘণ্টাটি খেয়াল করো: দেখা হওয়ার সময় পরের রওনা থেকে গোনা হয়।']);
    hints.push([fadd(at, fr(60)), null, null]);
    opts = fracOptions(at, meetLabel, hints);
    steps = [
      T(`Take the route as 1. First train: 1/${T1} of the route per hour; second: 1/${T2} per hour.`, `পুরো পথকে 1 ধরো। প্রথম ট্রেন: ঘণ্টায় পথের 1/${T1}; দ্বিতীয়: ঘণ্টায় 1/${T2}।`),
      s > 0
        ? T(`By ${hourLabel(h3).en} the first train has covered ${s}/${T1}; left = ${T1 - s}/${T1}.`, `${hourLabel(h3).bn}র মধ্যে প্রথম ট্রেন ${s}/${T1} অংশ গেছে; বাকি = ${T1 - s}/${T1}।`)
        : T('Both start together, so the whole route is left.', 'দুটি একসঙ্গে ছাড়ে, তাই পুরো পথ বাকি।'),
      T(`Time = (${T1 - s}/${T1}) ÷ (1/${T1} + 1/${T2}) = ${fstr(fr((T1 - s) * T2, T1 + T2))} h = ${fstr(meetAfter)} min after ${hourLabel(h3).en} → ${dot(meetLabel(at).en)}`, `সময় = (${T1 - s}/${T1}) ÷ (1/${T1} + 1/${T2}) = ${fstr(fr((T1 - s) * T2, T1 + T2))} ঘণ্টা = ${hourLabel(h3).bn}র ${fstr(meetAfter)} মিনিট পরে → ${meetLabel(at).bn}।`),
    ];
  } else {
    const v1 = pick([40, 45, 50, 60, 72, 80, 90]);
    const v2 = pick([20, 24, 25, 30, 36, 40]);
    if (v2 >= v1) return null;
    const m = pick([20, 30, 40, 45, 50, 60]);
    const D = ri(4, 30) * 10;
    const done = fr((v1 + v2) * m, 60);
    if (!isInt(done) || done[0] >= D) return null;
    const rest = fr((D - done[0]) * 60, v2);
    if (!isInt(rest)) return null;
    const total = m + rest[0];
    stem = T(
      `Two trains start at the same time, at ${v1} km/h and ${v2} km/h, towards each other from two stations ${D} km apart. The faster train stops ${m} minutes after its departure. After how many minutes from the start will the other train meet it?`,
      `${D} কিমি দূরের দুটি স্টেশন থেকে দুটি ট্রেন একই সময়ে ঘণ্টায় ${v1} কিমি ও ${v2} কিমি বেগে পরস্পরের দিকে রওনা দেয়। দ্রুতগামী ট্রেনটি রওনার ${m} মিনিট পরে থেমে যায়। রওনার কত মিনিট পরে অন্য ট্রেনটি তার কাছে পৌঁছবে?`,
    );
    const mins = (f) => T(`${fstr(f)} minutes`, `${fstr(f)} মিনিট`);
    opts = fracOptions(fr(total), mins, [
      [fr(D * 60, v1 + v2), 'That assumes both keep moving; the faster one has stopped.', 'এটি ধরে নেয় দুটিই চলছে; দ্রুতগামীটি থেমে গেছে।'],
      [rest, `That is only the time after the stop; add the first ${m} minutes.`, `এটি কেবল থামার পরের সময়; প্রথম ${m} মিনিট যোগ করো।`],
    ], [fr(total + 10), fr(total - 10)]);
    steps = [
      T(`In ${m} min both move: (${v1} + ${v2}) × ${fstr(fr(m, 60))} = ${done[0]} km closed; ${D - done[0]} km left.`, `${m} মিনিটে দুটিই চলে: (${v1} + ${v2}) × ${fstr(fr(m, 60))} = ${done[0]} কিমি কমে; বাকি ${D - done[0]} কিমি।`),
      T(`Only the slower train moves now: ${D - done[0]} ÷ ${v2} h = ${rest[0]} min.`, `এখন শুধু ধীর ট্রেনটি চলে: ${D - done[0]} ÷ ${v2} ঘণ্টা = ${rest[0]} মিনিট।`),
      T(`Total = ${m} + ${rest[0]} = ${total} minutes.`, `মোট = ${m} + ${rest[0]} = ${total} মিনিট।`),
    ];
  }
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'meeting_staggered_start', pattern: 'meeting_staggered_start',
    tags: ['speed_distance', 'relative_speed', framing],
    difficulty: 3, time: 90,
    stem, ...opts, steps,
    shortcut: T('Two phases: subtract what is covered before both are moving, then divide the gap left by the sum of the speeds.', 'দুই ধাপ: দুজনে চলা শুরুর আগে যতটা পথ হয়েছে তা বাদ দাও, তারপর বাকি ব্যবধানকে গতির যোগফল দিয়ে ভাগ করো।'),
  });
}

/** Generators reject awkward numbers by returning null; the seeder gets a few tries per call. */
const retry = (fn, framings) => () => {
  const framing = framings && pick(framings); // keep the framings evenly mixed
  for (let i = 0; i < 40; i++) {
    const q = fn(framing);
    if (q) return q;
  }
  return null;
};

const GENERATORS = { averageSpeed, boatsStreams, basicUnits, meetingPoint, partJourney, speedRatio, remainingSpeed, meetingStaggered };

const FRAMINGS = { averageSpeed: AVG_FRAMINGS, boatsStreams: BOAT_FRAMINGS, basicUnits: UNIT_FRAMINGS, meetingPoint: MEET_FRAMINGS, partJourney: PART_FRAMINGS, speedRatio: RATIO_FRAMINGS, remainingSpeed: REM_FRAMINGS, meetingStaggered: STAG_FRAMINGS };

module.exports = {
  subject: 'quant',
  topics: [{ topic: TOPIC, weight: 1, gens: Object.entries(GENERATORS).map(([k, fn]) => retry(fn, FRAMINGS[k])) }],
  ...GENERATORS,
  FRAMINGS,
  retry,
  frac: { fr, fadd, fsub, fmul, fdiv, isInt, fstr, fracOptions, unitFmt },
};
