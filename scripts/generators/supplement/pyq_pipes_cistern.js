'use strict';

/**
 * Pipes & Cistern: standard-level practice for the PYQ types that had too few questions of
 * the same kind (see db/patterns/pyq_map/quant/pipes_cistern.json):
 *   two_filling_pipes  two taps fill (or two taps empty) together; or find the second tap
 *   part_then_outlet   reservoir already half / partly full, a filling and an emptying tap
 *                      opened together: time to empty it (PYQ form) or to fill the rest
 */

const { ri, pick, shuffle, T, build } = require('../common');
const { frac, retry } = require('./pyq_time_speed_distance');

const { fr, fadd, fsub, fdiv, isInt, fstr, fracOptions } = frac;
const TOPIC = 'pipes_cistern';

const UNITS = { min: ['minutes', 'মিনিট'], hr: ['hours', 'ঘণ্টা'] };
const fmtU = (u) => (f) => T(`${fstr(f)} ${UNITS[u][0]}`, `${fstr(f)} ${UNITS[u][1]}`);
const TANKS = [['cistern', 'চৌবাচ্চা', 'চৌবাচ্চার'], ['tank', 'ট্যাঙ্ক', 'ট্যাঙ্কের'], ['reservoir', 'জলাধার', 'জলাধারের'], ['water tanker', 'জলের ট্যাঙ্কার', 'জলের ট্যাঙ্কারের']];
const TIMES = { min: [6, 8, 9, 10, 12, 15, 18, 20, 24, 25, 30, 36, 40, 45, 60], hr: [2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24] };

// =====================================================================
// two_filling_pipes
// =====================================================================
const TWO_FRAMINGS = ['fill_both', 'empty_both', 'find_other'];

function twoPipes(framing = pick(TWO_FRAMINGS)) {
  const u = pick(['min', 'hr']);
  const [tk, tkb, tkg] = pick(TANKS);
  const unit = UNITS[u];
  let stem;
  let opts;
  let steps;
  if (framing === 'fill_both' || framing === 'empty_both') {
    const [a, b] = shuffle(TIMES[u]).slice(0, 2);
    const ans = fr(a * b, a + b);
    if (ans[1] > 12) return null;
    const fill = framing === 'fill_both';
    const verb = fill ? ['fill', 'ভর্তি'] : ['empty', 'খালি'];
    stem = pick([
      () => T(
        `A tap can ${verb[0]} a ${tk} in ${a} ${unit[0]} and another tap can ${verb[0]} it in ${b} ${unit[0]}. If both taps are opened together, in how much time will the ${tk} be ${fill ? 'full' : 'empty'}?`,
        `একটি কল একটি ${tkb} ${a} ${unit[1]}য় ${verb[1]} করতে পারে এবং আরেকটি কল ${b} ${unit[1]}য় ${verb[1]} করতে পারে। দুটি কল একসঙ্গে খুলে দিলে ${tkb}টি কত সময়ে ${verb[1]} হবে?`.replace(/মিনিটয়/g, 'মিনিটে'),
      ),
      () => T(
        `Pipe A can ${verb[0]} a ${fill ? 'empty' : 'full'} ${tk} in ${a} ${unit[0]} and pipe B can ${verb[0]} it in ${b} ${unit[0]}. How long will A and B together take to ${verb[0]} the ${tk}?`,
        `A নলটি একটি ${fill ? 'খালি' : 'ভর্তি'} ${tkb} ${a} ${unit[1]}য় এবং B নলটি ${b} ${unit[1]}য় ${verb[1]} করতে পারে। A ও B একসঙ্গে ${tkb}টি ${verb[1]} করতে কত সময় নেবে?`.replace(/মিনিটয়/g, 'মিনিটে'),
      ),
    ])();
    opts = fracOptions(ans, fmtU(u), [
      [fr(a + b, 2), 'Averaging the two times is wrong: add the work done per unit of time.', 'দুটি সময়ের গড় নেওয়া ভুল: প্রতি একক সময়ে কাজের পরিমাণ যোগ করো।'],
      [fr(a + b), 'Adding the times makes the job SLOWER; two taps together must be faster than either.', 'সময় যোগ করলে কাজ ধীর হয়; দুটি কল একসঙ্গে যেকোনো একটির চেয়ে দ্রুত।'],
      [fr(Math.abs(a - b)), 'Subtracting is only for one tap filling while the other empties.', 'বিয়োগ কেবল তখনই, যখন একটি ভরে আর অন্যটি খালি করে।'],
    ]);
    steps = [
      T(`In 1 ${unit[0].slice(0, -1)}: 1/${a} + 1/${b} = ${fr(a + b, a * b).join('/')} of the ${tk}.`, `1 ${unit[1]}য়: 1/${a} + 1/${b} = ${tkg} ${fr(a + b, a * b).join('/')} অংশ।`.replace(/মিনিটয়/g, 'মিনিটে')),
      T(`Time = ${a * b} ÷ ${a + b} = ${fstr(ans)} ${unit[0]}.`, `সময় = ${a * b} ÷ ${a + b} = ${fstr(ans)} ${unit[1]}।`),
    ];
  } else {
    const a = pick(TIMES[u]);
    const b = pick(TIMES[u]);
    const t = fr(a * b, a + b);
    if (!isInt(t) || a === b) return null;
    stem = T(
      `Pipe A alone can fill a ${tk} in ${a} ${unit[0]}. Pipes A and B together fill it in ${t[0]} ${unit[0]}. How long will pipe B alone take to fill the ${tk}?`,
      `শুধু A নল একটি ${tkb} ${a} ${unit[1]}য় ভর্তি করতে পারে। A ও B নল একসঙ্গে সেটি ${t[0]} ${unit[1]}য় ভর্তি করে। শুধু B নল ${tkb}টি ভর্তি করতে কত সময় নেবে?`.replace(/মিনিটয়/g, 'মিনিটে'),
    );
    opts = fracOptions(fr(b), fmtU(u), [
      [fr(a - t[0]), 'Subtracting the TIMES is wrong; subtract the rates 1/t − 1/a.', 'সময় বিয়োগ করা ভুল; হার বিয়োগ করো 1/t − 1/a।'],
      [fr(a * t[0], a + t[0]), 'The rates were added instead of subtracted.', 'হার বিয়োগের বদলে যোগ করা হয়েছে।'],
      [fr(2 * t[0]), 'Doubling the together-time assumes the two pipes are equal.', 'একসঙ্গের সময় দ্বিগুণ করা মানে দুটি নল সমান ধরা।'],
    ]);
    steps = [
      T(`B's rate = 1/${t[0]} − 1/${a} = ${fsub(fr(1, t[0]), fr(1, a)).join('/')} of the ${tk} per ${unit[0].slice(0, -1)}.`, `B-র হার = 1/${t[0]} − 1/${a} = প্রতি ${unit[1]}য় ${fsub(fr(1, t[0]), fr(1, a)).join('/')} অংশ।`.replace(/মিনিটয়/g, 'মিনিটে')),
      T(`So B alone takes ${b} ${unit[0]}.`, `তাই B একা ${b} ${unit[1]} নেয়।`),
    ];
  }
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'two_filling_pipes', pattern: 'two_filling_pipes',
    tags: ['pipes', 'work_rate', framing],
    difficulty: framing === 'find_other' ? 3 : 2, time: framing === 'find_other' ? 60 : 45,
    stem, ...opts, steps,
    shortcut: T('Two taps doing the same job: time = (a × b) ÷ (a + b). Finding one tap: 1/b = 1/together − 1/a.', 'দুটি কল একই কাজ করলে: সময় = (a × b) ÷ (a + b)। একটি কল খুঁজতে: 1/b = 1/একসঙ্গে − 1/a।'),
  });
}

// =====================================================================
// part_then_outlet
// =====================================================================
const PART_FRAMINGS = ['empties', 'fills_rest'];
const START = [[1, 2, 'half full', 'অর্ধেক ভর্তি'], [1, 3, 'one-third full', 'এক-তৃতীয়াংশ ভর্তি'], [2, 3, 'two-thirds full', 'দুই-তৃতীয়াংশ ভর্তি'], [1, 4, 'one-fourth full', 'এক-চতুর্থাংশ ভর্তি'], [3, 4, 'three-fourths full', 'তিন-চতুর্থাংশ ভর্তি'], [2, 5, 'two-fifths full', 'দুই-পঞ্চমাংশ ভর্তি']];

function partThenOutlet(framing = pick(PART_FRAMINGS)) {
  const u = pick(['min', 'min', 'hr']);
  const unit = UNITS[u];
  const [tk, tkb, tkg] = pick(TANKS.slice(0, 3));
  const st = framing === 'empties' ? pick([START[0], START[0], ...START]) : pick(START);
  const f = fr(st[0], st[1]);
  const [x, y] = shuffle(TIMES[u]).slice(0, 2);
  const fillT = framing === 'empties' ? Math.max(x, y) : Math.min(x, y); // emptying tap is the faster one when it empties
  const emptyT = framing === 'empties' ? Math.min(x, y) : Math.max(x, y);
  const net = fsub(fr(1, emptyT), fr(1, fillT)); // per unit time, positive = draining (empties) / negative = filling
  const amount = framing === 'empties' ? f : fsub(fr(1), f);
  const rate = framing === 'empties' ? net : fsub(fr(1, fillT), fr(1, emptyT));
  const ans = fdiv(amount, rate);
  if (ans[1] > 6 || ans[0] / ans[1] > 200) return null;
  const goal = framing === 'empties' ? T('be empty', 'খালি হবে') : T('be full', 'পুরো ভর্তি হবে');
  const stem = T(
    `A tap can fill an empty ${tk} in ${fillT} ${unit[0]}; another tap can empty the full ${tk} in ${emptyT} ${unit[0]}. When the ${tk} is already ${st[2]}, both taps are opened together. In how much time will the ${tk} ${goal.en}?`,
    `একটি কল একটি খালি ${tkb} ${fillT} ${unit[1]}য় ভর্তি করতে পারে; আরেকটি কল ভর্তি ${tkb} ${emptyT} ${unit[1]}য় খালি করতে পারে। ${tkb}টি যখন ${st[3]}, তখন দুটি কল একসঙ্গে খুলে দেওয়া হল। কত সময়ে ${tkb}টি ${goal.bn}?`.replace(/মিনিটয়/g, 'মিনিটে'),
  );
  const opts = fracOptions(ans, fmtU(u), [
    [fdiv(fr(1), rate), `The ${tk} is not ${framing === 'empties' ? 'full' : 'empty'} at the start; only ${fstr(amount)} of it has to be ${framing === 'empties' ? 'emptied' : 'filled'}.`, `শুরুতে ${tkb}টি ${framing === 'empties' ? 'পুরো ভর্তি' : 'খালি'} নয়; কেবল ${fstr(amount)} অংশ ${framing === 'empties' ? 'খালি' : 'ভর্তি'} করতে হবে।`],
    [fdiv(amount, fadd(fr(1, fillT), fr(1, emptyT))), 'One tap fills while the other empties, so subtract the rates; do not add them.', 'একটি কল ভরে আর অন্যটি খালি করে, তাই হার বিয়োগ করো; যোগ নয়।'],
    [fdiv(fsub(fr(1), amount), rate), `That uses the wrong part: ${fstr(amount)} of the ${tk} has to be ${framing === 'empties' ? 'emptied' : 'filled'}.`, `ভুল অংশ নেওয়া হয়েছে: ${tkg} ${fstr(amount)} অংশ ${framing === 'empties' ? 'খালি' : 'ভর্তি'} করতে হবে।`],
  ]);
  if (!opts) return null;
  const per = unit[0].slice(0, -1);
  return build({
    topic: TOPIC, subtopic: 'part_then_outlet', pattern: 'part_then_outlet',
    tags: ['pipes', 'fill_and_leak', framing],
    difficulty: 3, time: 60, stem, ...opts,
    steps: [
      framing === 'empties'
        ? T(`Net emptying per ${per} = 1/${emptyT} − 1/${fillT} = ${fstr(rate)} of the ${tk} (the emptying tap is faster).`, `প্রতি ${unit[1]}য় নিট খালি = 1/${emptyT} − 1/${fillT} = ${tkg} ${fstr(rate)} অংশ (খালি করার কলটি দ্রুততর)।`.replace(/মিনিটয়/g, 'মিনিটে'))
        : T(`Net filling per ${per} = 1/${fillT} − 1/${emptyT} = ${fstr(rate)} of the ${tk}.`, `প্রতি ${unit[1]}য় নিট ভর্তি = 1/${fillT} − 1/${emptyT} = ${tkg} ${fstr(rate)} অংশ।`.replace(/মিনিটয়/g, 'মিনিটে')),
      T(`Part to ${framing === 'empties' ? 'empty' : 'fill'} = ${fstr(amount)}; time = ${fstr(amount)} ÷ ${fstr(rate)} = ${fstr(ans)} ${unit[0]}.`, `${framing === 'empties' ? 'খালি' : 'ভর্তি'} করতে হবে ${fstr(amount)} অংশ; সময় = ${fstr(amount)} ÷ ${fstr(rate)} = ${fstr(ans)} ${unit[1]}।`),
    ],
    shortcut: T('Net rate = (faster tap) − (slower tap); time = part still to be done ÷ net rate.', 'নিট হার = (দ্রুত কল) − (ধীর কল); সময় = বাকি অংশ ÷ নিট হার।'),
  });
}

const GENERATORS = { twoPipes, partThenOutlet };
const FRAMINGS = { twoPipes: TWO_FRAMINGS, partThenOutlet: PART_FRAMINGS };

module.exports = {
  subject: 'quant',
  topics: [{ topic: TOPIC, weight: 1, gens: Object.entries(GENERATORS).map(([k, fn]) => retry(fn, FRAMINGS[k])) }],
  ...GENERATORS,
  FRAMINGS,
};
