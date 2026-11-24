'use strict';

/**
 * Time & Work: standard-level practice for the PYQ types that had too few questions of
 * the same kind (see db/patterns/pyq_map/quant/time_work.json):
 *   part_work_given          "A does 1/2 of the work in 5 days, B 2/5 of it in 6 days; together?"
 *   w_efficiency_percent     "B is 40% more efficient than A, who takes 21 days"
 *   w_men_women_equivalence  "2 men + 7 boys in 14 days, 3 men + 8 boys in 11 days" / "3 men or 5 women"
 *   pairs_together           "P+Q in 12 days, Q+R in 15, R+P in 20"
 *   w_group_join_midway      workers leave / join after some days; food for a camp
 *   men_days_hours           M1 D1 H1 (/W1) = M2 D2 H2 (/W2)
 *   three_workers            A, B, C together; or C alone from the group time
 *   one_worker               "1/3 of a tank is emptied in 3 minutes; how much in 7 1/2?"
 * The w_* keys are pattern keys of db/patterns/quant/time_work/advanced.js; these are the
 * standard-level (difficulty 2-3) questions for them, not Hard-bank questions.
 */

const { ri, pick, shuffle, gcd, T, names, build } = require('../common');
const { frac, retry } = require('./pyq_time_speed_distance');

const { fr, fadd, fsub, fmul, fdiv, isInt, fstr, fracOptions } = frac;
const TOPIC = 'time_work';
const lcm = (a, b) => (a * b) / gcd(a, b);

const DAYS = (f) => T(`${fstr(f)} days`, `${fstr(f)} দিন`);
const PART = (f) => T(fstr(f), fstr(f));
const fracTxt = (f) => `${f[0]}/${f[1]}`;

// [en, bn, en "the …", bn "…টি", bn genitive]
const JOBS = [
  ['a piece of work', 'একটি কাজ', 'the work', 'কাজটি', 'একটি কাজের'],
  ['a wall', 'একটি দেওয়াল', 'the wall', 'দেওয়ালটি', 'একটি দেওয়ালের'],
  ['a road repair job', 'একটি রাস্তা মেরামতের কাজ', 'the job', 'কাজটি', 'একটি রাস্তা মেরামতের কাজের'],
  ['a report', 'একটি রিপোর্ট টাইপের কাজ', 'the report', 'রিপোর্টটি', 'একটি রিপোর্ট টাইপের কাজের'],
];
const DAYS_DEC = (f) => T(`${fstr(f, true)} days`, `${fstr(f, true)} দিন`);

// =====================================================================
// part_work_given
// =====================================================================
const PARTS = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [1, 5], [4, 5], [5, 6]];
const PWG_FRAMINGS = ['together', 'together_part'];

function partWorkGiven(framing = pick(PWG_FRAMINGS)) {
  const [pa, pb] = [pick(PARTS), pick(PARTS)];
  const TA = ri(2, 15) * pa[1]; // whole-job days for A
  const TB = ri(2, 15) * pb[1];
  const da = fmul(fr(TA), fr(pa[0], pa[1]));
  const db = fmul(fr(TB), fr(pb[0], pb[1]));
  if (!isInt(da) || !isInt(db) || TA === TB && pa === pb) return null;
  const tog = fr(TA * TB, TA + TB);
  if (tog[1] > 12) return null;
  const [A, B] = names(2);
  const job = pick(JOBS);
  let target = fr(1);
  let ask = T(`In how many days can they finish ${job[2]} working together?`, `দুজনে একসঙ্গে কাজ করলে ${job[3]} কত দিনে শেষ হবে?`);
  if (framing === 'together_part') {
    target = pick([fr(1, 2), fr(1, 3), fr(2, 3), fr(3, 4)]);
    ask = T(`Working together, in how many days will they finish ${fracTxt(target)} of ${job[2]}?`, `একসঙ্গে কাজ করলে ${job[3]}র ${fracTxt(target)} অংশ কত দিনে শেষ হবে?`);
  }
  const ans = fmul(tog, target);
  if (ans[1] > 12) return null;
  const stem = T(
    `${A.en} can do ${fracTxt(pa)} of ${job[0]} in ${da[0]} days and ${B.en} can do ${fracTxt(pb)} of the same work in ${db[0]} days. ${ask.en}`,
    `${A.bn} ${job[4]} ${fracTxt(pa)} অংশ ${da[0]} দিনে এবং ${B.bn} একই কাজের ${fracTxt(pb)} অংশ ${db[0]} দিনে করতে পারে। ${ask.bn}`,
  );
  const wrongA = fmul(da, fr(pa[0], pa[1]));
  const wrongB = fmul(db, fr(pb[0], pb[1]));
  const opts = fracOptions(ans, DAYS, [
    [fmul(fr(da[0] * db[0], da[0] + db[0]), target), 'The given days are for PART of the work; first find each one\'s time for the whole work.', 'দেওয়া দিনগুলো কাজের একটি অংশের; আগে প্রত্যেকের পুরো কাজের সময় বের করো।'],
    [fmul(fdiv(fmul(wrongA, wrongB), fadd(wrongA, wrongB)), target), 'The days were multiplied by the fraction; whole-job time = days ÷ fraction.', 'দিনকে ভগ্নাংশ দিয়ে গুণ করা হয়েছে; পুরো কাজের সময় = দিন ÷ ভগ্নাংশ।'],
    ...(framing === 'together_part' ? [[tog, `That is the time for the whole work; only ${fracTxt(target)} is asked.`, `এটি পুরো কাজের সময়; চাওয়া হয়েছে কেবল ${fracTxt(target)} অংশ।`]] : [[fr(da[0] + db[0]), 'Adding the days never gives a together-time.', 'দিন যোগ করলে কখনও একসঙ্গের সময় পাওয়া যায় না।']]),
  ]);
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'part_work_given', pattern: 'part_work_given',
    tags: ['time_work', 'work_rate', framing],
    difficulty: 3, time: 75, stem, ...opts,
    steps: [
      T(`${A.en} alone: ${da[0]} ÷ ${fracTxt(pa)} = ${TA} days; ${B.en} alone: ${db[0]} ÷ ${fracTxt(pb)} = ${TB} days.`, `${A.bn} একা: ${da[0]} ÷ ${fracTxt(pa)} = ${TA} দিন; ${B.bn} একা: ${db[0]} ÷ ${fracTxt(pb)} = ${TB} দিন।`),
      T(`One day together: 1/${TA} + 1/${TB} = ${fracTxt(fr(TA + TB, TA * TB))}, so the whole work takes ${fstr(tog)} days.`, `একসঙ্গে এক দিনে: 1/${TA} + 1/${TB} = ${fracTxt(fr(TA + TB, TA * TB))}, তাই পুরো কাজে ${fstr(tog)} দিন।`),
      ...(framing === 'together_part' ? [T(`${fracTxt(target)} of the work: ${fstr(tog)} × ${fracTxt(target)} = ${fstr(ans)} days.`, `কাজের ${fracTxt(target)} অংশ: ${fstr(tog)} × ${fracTxt(target)} = ${fstr(ans)} দিন।`)] : []),
    ],
    shortcut: T('Part in d days → whole in d ÷ part; then together = product ÷ sum.', 'd দিনে একটি অংশ → পুরো কাজ d ÷ অংশ দিনে; তারপর একসঙ্গে = গুণফল ÷ যোগফল।'),
  });
}

// =====================================================================
// w_efficiency_percent
// =====================================================================
const EFF_FRAMINGS = ['more_alone', 'less_alone', 'more_together'];

function efficiencyPercent(framing = pick(EFF_FRAMINGS)) {
  const [A, B] = names(2);
  const p = framing === 'less_alone' ? pick([20, 25, 40, 50, 60, 75]) : pick([20, 25, 40, 50, 60, 75, 100]);
  const n = ri(4, 40);
  const factor = framing === 'less_alone' ? fr(100 - p, 100) : fr(100 + p, 100); // B's rate ÷ A's rate
  const tB = fdiv(fr(n), factor);
  let stem;
  let ans;
  let hints;
  let steps;
  if (framing === 'more_alone' || framing === 'less_alone') {
    if (!isInt(tB) && tB[1] > 4) return null;
    ans = tB;
    const more = framing === 'more_alone';
    stem = T(
      `${A.en} alone can do a piece of work in ${n} days. ${B.en}, who is ${p}% ${more ? 'more' : 'less'} efficient than ${A.en}, will finish the same work in how many days?`,
      `${A.bn} একা একটি কাজ ${n} দিনে করতে পারে। ${B.bn}, যে ${A.bn}-এর চেয়ে ${p}% ${more ? 'বেশি' : 'কম'} দক্ষ, একই কাজ কত দিনে শেষ করবে?`,
    );
    hints = [
      [fmul(fr(n), more ? fr(100 - p, 100) : fr(100 + p, 100)), `The time does not change by ${p}%; divide the time by the efficiency factor ${fstr(factor, true)}.`, `সময় ${p}% বদলায় না; সময়কে দক্ষতার গুণক ${fstr(factor, true)} দিয়ে ভাগ করো।`],
      [fmul(fr(n), factor), `Time is INVERSE to efficiency: ${more ? 'more' : 'less'} efficient means ${more ? 'fewer' : 'more'} days.`, `সময় দক্ষতার ব্যস্তানুপাতিক: ${more ? 'বেশি' : 'কম'} দক্ষ মানে ${more ? 'কম' : 'বেশি'} দিন।`],
    ];
    steps = [
      T(`Efficiency ${A.en} : ${B.en} = 100 : ${more ? 100 + p : 100 - p}, so time ${A.en} : ${B.en} = ${more ? 100 + p : 100 - p} : 100.`, `দক্ষতা ${A.bn} : ${B.bn} = 100 : ${more ? 100 + p : 100 - p}, তাই সময় ${A.bn} : ${B.bn} = ${more ? 100 + p : 100 - p} : 100।`),
      T(`${B.en}'s time = ${n} × 100/${more ? 100 + p : 100 - p} = ${fstr(ans)} days.`, `${B.bn}-এর সময় = ${n} × 100/${more ? 100 + p : 100 - p} = ${fstr(ans)} দিন।`),
    ];
  } else {
    ans = fdiv(fr(n), fadd(fr(1), factor));
    if (ans[1] > 12) return null;
    stem = T(
      `${A.en} alone can finish a job in ${n} days. ${B.en} is ${p}% more efficient than ${A.en}. Working together, in how many days will they finish the job?`,
      `${A.bn} একা একটি কাজ ${n} দিনে শেষ করতে পারে। ${B.bn}, ${A.bn}-এর চেয়ে ${p}% বেশি দক্ষ। একসঙ্গে কাজ করলে তারা কত দিনে কাজটি শেষ করবে?`,
    );
    hints = [
      [fdiv(fr(n), fadd(fr(1), fr(100 - p, 100))), `${B.en} is FASTER, so ${B.en}'s rate is ${fstr(factor, true)} times ${A.en}'s, not less.`, `${B.bn} বেশি দ্রুত, তাই ${B.bn}-এর হার ${A.bn}-এর ${fstr(factor, true)} গুণ, কম নয়।`],
      [tB, `That is ${B.en}'s time alone, not the together time.`, `এটি ${B.bn}-এর একার সময়, একসঙ্গের সময় নয়।`],
      [fr(n, 2), 'Halving the time assumes equal efficiency.', 'সময় অর্ধেক করা মানে দুজনকে সমান দক্ষ ধরা।'],
    ];
    steps = [
      T(`Let ${A.en} do 100 units a day; ${B.en} does ${100 + p}. Work = 100 × ${n} = ${100 * n} units.`, `ধরো ${A.bn} রোজ 100 একক করে; ${B.bn} করে ${100 + p}। মোট কাজ = 100 × ${n} = ${100 * n} একক।`),
      T(`Together: ${100 * n} ÷ (100 + ${100 + p}) = ${fstr(ans)} days.`, `একসঙ্গে: ${100 * n} ÷ (100 + ${100 + p}) = ${fstr(ans)} দিন।`),
    ];
  }
  const opts = fracOptions(ans, DAYS, hints);
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'w_efficiency_percent', pattern: 'w_efficiency_percent',
    tags: ['time_work', 'efficiency', framing],
    difficulty: framing === 'more_together' ? 3 : 2, time: framing === 'more_together' ? 75 : 60,
    stem, ...opts, steps,
    shortcut: T('p% more efficient → time × 100/(100 + p); p% less efficient → time × 100/(100 − p).', 'p% বেশি দক্ষ → সময় × 100/(100 + p); p% কম দক্ষ → সময় × 100/(100 − p)।'),
  });
}

// =====================================================================
// w_men_women_equivalence
// =====================================================================
const MW_FRAMINGS = ['two_groups', 'or_given'];
const KINDS = [['men', 'boys', ' জন পুরুষ', ' জন বালক'], ['men', 'women', ' জন পুরুষ', ' জন মহিলা'], ['men', 'boys', ' জন পুরুষ', ' জন বালক']];
const SING = { men: 'man', boys: 'boy', women: 'woman' };
const many = (n, pl) => `${n} ${n === 1 ? SING[pl] : pl}`;

function menWomen(framing = pick(MW_FRAMINGS)) {
  const [m, w, mb, wb] = pick(KINDS);
  const w1 = w === 'boys' ? 'boy' : 'woman';
  const r = pick([2, 2, 3, 3, 4]); // 1 man = r of the other kind
  const job = pick(JOBS);
  const grp = (a, b) => T(`${many(a, m)} and ${many(b, w)}`, `${a}${mb} ও ${b}${wb}`);
  if (framing === 'two_groups') {
    const a1 = ri(1, 4); const b1 = ri(2, 9); const a2 = ri(1, 5); const b2 = ri(2, 9);
    if (a1 * b2 === a2 * b1 || a1 === a2) return null;
    const u1 = a1 * r + b1; const u2 = a2 * r + b2;
    const W = lcm(u1, u2) * pick([1, 1, 2]);
    const d1 = W / u1; const d2 = W / u2;
    if (d1 > 40 || d2 > 40 || d1 < 3 || d2 < 3 || d1 === d2) return null;
    const L = w === 'boys' ? 'B' : 'W';
    const ask = pick(['one_man', 'group']);
    let ans;
    let q;
    let a3; let b3; let k = 1;
    if (ask === 'one_man') {
      ans = fr(W, r);
      q = T('How long would 1 man alone take to do it?', `1${mb} একা কাজটি কত দিনে করবে?`);
      if (!isInt(ans)) return null;
    } else {
      a3 = ri(1, 8); b3 = ri(1, 10); k = pick([1, 1, 2, 3]);
      ans = fr(k * W, a3 * r + b3);
      if (!isInt(ans) && ans[1] > 4) return null;
      q = k === 1
        ? T(`In how many days can ${many(a3, m)} and ${many(b3, w)} do it?`, `${a3}${mb} ও ${b3}${wb} কাজটি কত দিনে করবে?`)
        : T(`In how many days can ${many(a3, m)} and ${many(b3, w)} do ${k === 2 ? 'twice' : 'three times'} the amount of this work?`, `${a3}${mb} ও ${b3}${wb} এই কাজের ${k} গুণ কাজ কত দিনে করবে?`);
    }
    const stem = T(
      `${grp(a1, b1).en} can do ${job[0]} in ${d1} days; ${grp(a2, b2).en} can do the same work in ${d2} days. ${q.en}`,
      `${grp(a1, b1).bn} ${job[1]} ${d1} দিনে করতে পারে; ${grp(a2, b2).bn} একই কাজ ${d2} দিনে করতে পারে। ${q.bn}`,
    );
    const hints = ask === 'one_man'
      ? [[fr(W), `${W} is the work in ${w1}-days; one man does ${r} units a day.`, `${W} হল কাজটি একক হিসেবে; একজন পুরুষ রোজ ${r} একক করে।`],
        [fr(W, r + 1), 'The man : other ratio was read the wrong way.', 'পুরুষ : অন্যজনের অনুপাত উল্টো পড়া হয়েছে।']]
      : [[fr(k * W, a3 + b3 * r), `1 man = ${r} ${w}, not the other way round.`, `1 পুরুষ = ${r} ${w === 'boys' ? 'বালক' : 'মহিলা'}, উল্টোটা নয়।`],
        ...(k > 1 ? [[fr(W, a3 * r + b3), `The question asks for ${k} times the work.`, `প্রশ্নে কাজের ${k} গুণ চাওয়া হয়েছে।`]] : [[fr(W, a3 + b3), 'A man and a boy/woman do not work at the same rate.', 'একজন পুরুষ ও একজন বালক/মহিলার কাজের হার সমান নয়।']])];
    const opts = fracOptions(ans, DAYS, hints);
    if (!opts) return null;
    return build({
      topic: TOPIC, subtopic: 'w_men_women_equivalence', pattern: 'w_men_women_equivalence',
      tags: ['time_work', 'men_women', framing],
      difficulty: 3, time: 90, stem, ...opts,
      steps: [
        T(`Same work: ${d1}(${a1}M + ${b1}${L}) = ${d2}(${a2}M + ${b2}${L}) → ${d1 * a1}M + ${d1 * b1}${L} = ${d2 * a2}M + ${d2 * b2}${L}.`, `একই কাজ: ${d1}(${a1}M + ${b1}${L}) = ${d2}(${a2}M + ${b2}${L}) → ${d1 * a1}M + ${d1 * b1}${L} = ${d2 * a2}M + ${d2 * b2}${L}।`),
        T(`So ${Math.abs(d1 * a1 - d2 * a2)}M = ${Math.abs(d2 * b2 - d1 * b1)}${L}, i.e. 1 man = ${r} ${w}. Work = ${d1} × (${a1} × ${r} + ${b1}) = ${W} ${w1}-days.`, `তাই ${Math.abs(d1 * a1 - d2 * a2)}M = ${Math.abs(d2 * b2 - d1 * b1)}${L}, অর্থাৎ 1 পুরুষ = ${r}${wb}। মোট কাজ = ${d1} × (${a1} × ${r} + ${b1}) = ${W} একক।`),
        ask === 'one_man'
          ? T(`1 man does ${r} units a day: ${W} ÷ ${r} = ${fstr(ans)} days.`, `1 পুরুষ রোজ ${r} একক করে: ${W} ÷ ${r} = ${fstr(ans)} দিন।`)
          : T(`${many(a3, m)} + ${many(b3, w)} = ${a3 * r + b3} units a day: ${k > 1 ? `${k} × ` : ''}${W} ÷ ${a3 * r + b3} = ${fstr(ans)} days.`, `${a3}${mb} + ${b3}${wb} = রোজ ${a3 * r + b3} একক: ${k > 1 ? `${k} × ` : ''}${W} ÷ ${a3 * r + b3} = ${fstr(ans)} দিন।`),
      ],
      shortcut: T('Equate the two work totals to get 1 man = r boys, then count everything in boy-days.', 'দুটি মোট কাজ সমান করে 1 পুরুষ = r বালক বের করো, তারপর সবকিছু বালক-দিনে গোনো।'),
    });
  }
  // or_given: "a men or b women can do it in d days"
  const a = ri(2, 8);
  const b = a * r;
  const d = ri(4, 30);
  const W = a * r * d; // in women-days
  const x = ri(1, 6); const y = ri(1, 12);
  const ans = fr(W, x * r + y);
  if (ans[1] > 4) return null;
  const stem = T(
    `${many(a, m)} or ${many(b, w)} can do ${job[0]} in ${d} days. In how many days will ${many(x, m)} and ${many(y, w)} together do it?`,
    `${a}${mb} অথবা ${b}${wb} ${job[1]} ${d} দিনে করতে পারে। ${x}${mb} ও ${y}${wb} একসঙ্গে কাজটি কত দিনে করবে?`,
  );
  const opts = fracOptions(ans, DAYS, [
    [fr(W, x + y), `1 man = ${r} ${w} (${a} men do what ${b} ${w} do); they are not equal workers.`, `1 পুরুষ = ${r}${wb} (${a} পুরুষ যা করে ${b} জন তা-ই করে); তারা সমান কর্মী নয়।`],
    [fr(W, x + y * r), 'The conversion was applied the wrong way round.', 'রূপান্তর উল্টো দিকে করা হয়েছে।'],
  ]);
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'w_men_women_equivalence', pattern: 'w_men_women_equivalence',
    tags: ['time_work', 'men_women', framing],
    difficulty: 2, time: 60, stem, ...opts,
    steps: [
      T(`${a} ${m} = ${b} ${w}, so 1 man = ${r} ${w}. Work = ${b} × ${d} = ${W} ${w1}-days.`, `${a} পুরুষ = ${b}${wb}, তাই 1 পুরুষ = ${r}${wb}। মোট কাজ = ${b} × ${d} = ${W} একক।`),
      T(`${many(x, m)} + ${many(y, w)} = ${many(x * r + y, w)}; time = ${W} ÷ ${x * r + y} = ${fstr(ans)} days.`, `${x}${mb} + ${y}${wb} = ${x * r + y} জনের সমান; সময় = ${W} ÷ ${x * r + y} = ${fstr(ans)} দিন।`),
    ],
    shortcut: T('Turn everyone into one kind of worker first, then work ÷ workers = days.', 'আগে সবাইকে এক ধরনের কর্মীতে বদলাও, তারপর কাজ ÷ কর্মী = দিন।'),
  });
}

// =====================================================================
// pairs_together
// =====================================================================
const PAIR_FRAMINGS = ['all_three', 'one_alone'];

function pairsTogether(framing = pick(PAIR_FRAMINGS)) {
  const [a, b, c] = [ri(1, 6), ri(1, 6), ri(1, 6)];
  const base = lcm(lcm(a + b, b + c), c + a);
  const W = base * pick([1, 2]);
  if (W > 120) return null;
  const [dab, dbc, dca] = [W / (a + b), W / (b + c), W / (c + a)];
  if (new Set([dab, dbc, dca]).size < 3) return null;
  const P = pick([['P', 'Q', 'R'], ['A', 'B', 'C'], ['X', 'Y', 'Z']]);
  const job = pick(JOBS);
  const intro = T(
    `${P[0]} and ${P[1]} can do ${job[0]} in ${dab} days, ${P[1]} and ${P[2]} in ${dbc} days, and ${P[2]} and ${P[0]} in ${dca} days.`,
    `${P[0]} ও ${P[1]} ${job[1]} ${dab} দিনে, ${P[1]} ও ${P[2]} ${dbc} দিনে, এবং ${P[2]} ও ${P[0]} ${dca} দিনে করতে পারে।`,
  );
  const sum = a + b + c;
  const all = fr(W, sum);
  let ans;
  let q;
  let hints;
  let last;
  if (framing === 'all_three') {
    ans = all;
    q = T('In how many days can all three together do it?', 'তিনজন একসঙ্গে কাজটি কত দিনে করবে?');
    hints = [
      [fr(W, 2 * sum), 'Adding the three pair-rates counts everyone twice; halve the sum.', 'তিন জোড়ার হার যোগ করলে প্রত্যেকে দুবার গোনা হয়; যোগফল অর্ধেক করো।'],
      [fr(dab + dbc + dca, 3), 'Averaging the days is not a work calculation.', 'দিনের গড় নেওয়া কাজের হিসাব নয়।'],
    ];
    last = T(`All three: ${W} ÷ ${sum} = ${fstr(ans)} days.`, `তিনজন একসঙ্গে: ${W} ÷ ${sum} = ${fstr(ans)} দিন।`);
  } else {
    const i = ri(0, 2);
    const rate = [a, b, c][i];
    const opp = [b + c, c + a, a + b][i]; // the pair without person i
    ans = fr(W, rate);
    if (!isInt(ans) && ans[1] > 6) return null;
    q = T(`In what time will ${P[i]} alone do it?`, `${P[i]} একা কাজটি কত দিনে করবে?`);
    hints = [
      [all, 'That is the time for all three together.', 'এটি তিনজনের একসঙ্গে সময়।'],
      [fr(W, 2 * sum - opp), 'Subtract the pair WITHOUT this person from the all-three rate.', 'তিনজনের হার থেকে এই ব্যক্তিকে বাদ দেওয়া জোড়ার হার বিয়োগ করো।'],
      [fr(W, [b, c, a][i]), 'That is another person\'s time.', 'এটি অন্য একজনের সময়।'],
    ];
    last = T(`${P[i]} alone = ${sum} − ${opp} = ${rate} unit${rate > 1 ? 's' : ''} a day → ${W} ÷ ${rate} = ${fstr(ans)} days.`, `${P[i]} একা = ${sum} − ${opp} = রোজ ${rate} একক → ${W} ÷ ${rate} = ${fstr(ans)} দিন।`);
  }
  const opts = fracOptions(ans, DAYS, hints);
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'pairs_together', pattern: 'pairs_together',
    tags: ['time_work', 'pairs', framing],
    difficulty: 3, time: 90,
    stem: T(`${intro.en} ${q.en}`, `${intro.bn} ${q.bn}`), ...opts,
    steps: [
      T(`Take the work = ${W} units (a common multiple of ${dab}, ${dbc}, ${dca}). Pair rates: ${a + b}, ${b + c}, ${c + a} units a day.`, `মোট কাজ = ${W} একক ধরো (${dab}, ${dbc}, ${dca}-এর সাধারণ গুণিতক)। জোড়ার হার: রোজ ${a + b}, ${b + c}, ${c + a} একক।`),
      T(`2(${P.join(' + ')}) = ${2 * sum}, so all three do ${sum} units a day.`, `2(${P.join(' + ')}) = ${2 * sum}, তাই তিনজনে রোজ ${sum} একক করে।`),
      last,
    ],
    shortcut: T('Add the three pair-rates and halve: that is all three together; subtract a pair to get the third person.', 'তিন জোড়ার হার যোগ করে অর্ধেক করো: সেটি তিনজন একসঙ্গে; একটি জোড়া বিয়োগ করলে তৃতীয়জন।'),
  });
}

// =====================================================================
// w_group_join_midway (workers leave / join, provisions)
// =====================================================================
const GROUP_FRAMINGS = ['leave', 'join', 'food'];

function groupChange(framing = pick(GROUP_FRAMINGS)) {
  const N = ri(2, 20) * pick([2, 5, 10]);
  const D = ri(4, 30) * (framing === 'food' ? 5 : 1);
  const d = ri(1, D - 1);
  let N2;
  let change;
  const pct = pick([null, 20, 25, 50]);
  if (framing === 'join') {
    const k = pick([N / 2, N, N / 4, N * 2, 10, 20].filter(Number.isInteger));
    N2 = N + k;
    change = T(`${k} more workers join`, `আরও ${k} জন শ্রমিক যোগ দেয়`);
  } else if (pct && (N * pct) % 100 === 0) {
    N2 = N - (N * pct) / 100;
    change = framing === 'food' ? T(`${pct}% of the people leave`, `${pct}% লোক চলে যায়`) : T(`${pct}% of the workers leave`, `${pct}% শ্রমিক চলে যায়`);
  } else {
    const k = ri(1, N - 1);
    N2 = N - k;
    change = framing === 'food' ? T(`${k} people leave`, `${k} জন চলে যায়`) : T(`${k} workers leave`, `${k} জন শ্রমিক চলে যায়`);
  }
  const rest = fr(N * (D - d), N2);
  if (rest[1] > 2 || rest[0] / rest[1] > 400) return null;
  let stem;
  let ans;
  let hints;
  const askTotal = framing === 'join' && pick([true, false]);
  if (framing === 'food') {
    stem = T(
      `A camp has food for ${N} people for ${D} days. After ${d} days, ${change.en}. For how many more days will the remaining food last for those who stay?`,
      `একটি শিবিরে ${N} জনের ${D} দিনের খাবার আছে। ${d} দিন পরে ${change.bn}। বাকি খাবার যারা থাকল তাদের আর কত দিন চলবে?`,
    );
  } else {
    const job = pick([['dig a pond', 'একটি পুকুর খুঁড়তে'], ['build a wall', 'একটি দেওয়াল তৈরি করতে'], ['complete a job', 'একটি কাজ শেষ করতে'], ['lay a road', 'একটি রাস্তা তৈরি করতে']]);
    stem = T(
      `${N} workers can ${job[0]} in ${D} days. After ${d} days of work, ${change.en}. ${askTotal ? 'In how many days in all will the work be completed?' : 'In how many more days will the remaining work be done?'}`,
      `${N} জন শ্রমিক ${job[1]} ${D} দিন সময় নেয়। ${d} দিন কাজ করার পর ${change.bn}। ${askTotal ? 'মোট কত দিনে কাজটি শেষ হবে?' : 'বাকি কাজ আর কত দিনে শেষ হবে?'}`,
    );
  }
  ans = askTotal ? fadd(rest, fr(d)) : rest;
  hints = [
    [fr(N * D, N2), `The first ${d} days of work (or food) are already used up; only ${N} × ${D - d} is left.`, `প্রথম ${d} দিনের কাজ (বা খাবার) আগেই হয়ে গেছে; বাকি কেবল ${N} × ${D - d}।`],
    askTotal ? [rest, `That is only the time after the change; add the first ${d} days.`, `এটি কেবল পরিবর্তনের পরের সময়; প্রথম ${d} দিন যোগ করো।`] : [fadd(rest, fr(d)), `That counts from the very start; the question asks for the days after the change.`, 'এটি একেবারে শুরু থেকে গোনা; প্রশ্নে পরিবর্তনের পরের দিন চাওয়া হয়েছে।'],
    framing === 'join'
      ? [fadd(fr((D - d) * N2, N), askTotal ? fr(d) : fr(0)), 'More workers need FEWER days: workers and days are in inverse proportion.', 'বেশি শ্রমিকের কম দিন লাগে: শ্রমিক ও দিন ব্যস্ত অনুপাতে।']
      : [fr((D - d) * N2, N), 'Fewer people need MORE days (inverse proportion), not fewer.', 'কম লোকের বেশি দিন লাগে (ব্যস্ত অনুপাত), কম নয়।'],
  ];
  const opts = fracOptions(ans, DAYS_DEC, hints);
  if (!opts) return null;
  const unit = framing === 'food' ? T('person-days', 'জন-দিন') : T('worker-days', 'শ্রমিক-দিন');
  return build({
    topic: TOPIC, subtopic: 'w_group_join_midway', pattern: 'w_group_join_midway',
    tags: ['time_work', 'man_days', framing],
    difficulty: framing === 'join' ? 3 : 2, time: 60, stem, ...opts,
    steps: [
      T(`Total = ${N} × ${D} = ${N * D} ${unit.en}; used in ${d} days = ${N * d}; left = ${N * (D - d)}.`, `মোট = ${N} × ${D} = ${N * D} ${unit.bn}; ${d} দিনে খরচ = ${N * d}; বাকি = ${N * (D - d)}।`),
      T(`Now ${N2} ${framing === 'food' ? 'people' : 'workers'}: ${N * (D - d)} ÷ ${N2} = ${fstr(rest, true)} days${askTotal ? `; in all ${d} + ${fstr(rest, true)} = ${fstr(ans, true)} days` : ''}.`, `এখন ${N2} জন: ${N * (D - d)} ÷ ${N2} = ${fstr(rest, true)} দিন${askTotal ? `; মোট ${d} + ${fstr(rest, true)} = ${fstr(ans, true)} দিন` : ''}।`),
    ],
    shortcut: T('N1 × (days left) = N2 × (new days): only the part not yet done changes hands.', 'N1 × (বাকি দিন) = N2 × (নতুন দিন): শুধু বাকি অংশটুকুই নতুন দলে যায়।'),
  });
}

// =====================================================================
// men_days_hours
// =====================================================================
const MDH_FRAMINGS = ['find_hours', 'find_men', 'find_days', 'with_work'];

function menDaysHours(framing = pick(MDH_FRAMINGS)) {
  const M1 = ri(2, 20) * pick([2, 4, 5]);
  const D1 = ri(4, 30);
  const H1 = ri(4, 10);
  let W1 = 1;
  let W2 = 1;
  if (framing === 'with_work') { W1 = ri(2, 12) * 10; W2 = ri(2, 12) * 10; if (W1 === W2) return null; }
  let M2 = ri(2, 20) * pick([2, 4, 5]);
  let D2 = ri(4, 30);
  let H2 = ri(4, 10);
  const total = M1 * D1 * H1; // per W1 units
  const need = (x, y) => fr(total * W2, W1 * x * y);
  let ans;
  let ask;
  let unit;
  if (framing === 'find_hours') { ans = need(M2, D2); H2 = null; ask = 'hours'; unit = T('hours', 'ঘণ্টা'); }
  else if (framing === 'find_men') { ans = need(D2, H2); M2 = null; ask = 'men'; unit = T('persons', 'জন'); }
  else { ans = need(M2, H2); D2 = null; ask = 'days'; unit = T('days', 'দিন'); }
  if (!isInt(ans) || ans[0] < 2 || (ask === 'hours' && ans[0] > 14)) return null;
  const v = ans[0];
  const work = framing === 'with_work' ? pick([['m of road', 'মিটার রাস্তা'], ['m of wall', 'মিটার দেওয়াল'], ['m of canal', 'মিটার খাল']]) : null;
  const what1 = work ? T(`${W1} ${work[0]}`, `${W1} ${work[1]}`) : T('a piece of work', 'একটি কাজ');
  const what2 = work ? T(`${W2} ${work[0]}`, `${W2} ${work[1]}`) : T('the same work', 'একই কাজ');
  const q = {
    hours: T(`how many hours a day should ${M2} persons work to complete ${what2.en} in ${D2} days?`, `${M2} জনকে ${D2} দিনে ${what2.bn} শেষ করতে দিনে কত ঘণ্টা কাজ করতে হবে?`),
    men: T(`how many persons, working ${H2} hours a day, are needed to complete ${what2.en} in ${D2} days?`, `দিনে ${H2} ঘণ্টা কাজ করে ${D2} দিনে ${what2.bn} শেষ করতে কত জন লাগবে?`),
    days: T(`in how many days will ${M2} persons working ${H2} hours a day complete ${what2.en}?`, `দিনে ${H2} ঘণ্টা কাজ করে ${M2} জন কত দিনে ${what2.bn} শেষ করবে?`),
  }[ask];
  const stem = T(
    `If ${M1} persons can finish ${what1.en} in ${D1} days working ${H1} hours a day, ${q.en}`,
    `${M1} জন দিনে ${H1} ঘণ্টা কাজ করে ${D1} দিনে ${what1.bn} শেষ করলে, ${q.bn}`,
  );
  const known = { hours: [M2, D2], men: [D2, H2], days: [M2, H2] }[ask];
  const orig = { hours: [H1, M1 * D1], men: [M1, D1 * H1], days: [D1, M1 * H1] }[ask]; // [asked value before, product of the other two]
  const hints = [
    [fr(orig[0] * known[0] * known[1], orig[1]), 'More persons (or hours) means FEWER days: the proportion is inverse, not direct.', 'বেশি লোক (বা ঘণ্টা) মানে কম দিন: অনুপাতটি ব্যস্ত, সরল নয়।'],
    ...(ask === 'hours' ? [] : [[fr(M1 * D1 * W2, W1 * (ask === 'men' ? D2 : M2)), 'Hours per day must enter the product M × D × H.', 'M × D × H গুণফলে দৈনিক ঘণ্টা রাখতে হবে।']]),
    ...(work ? [[fr(total, known[0] * known[1]), `The amount of work changed too: multiply by ${W2}/${W1}.`, `কাজের পরিমাণও বদলেছে: ${W2}/${W1} দিয়ে গুণ করো।`]] : []),
  ];
  const opts = fracOptions(ans, (f) => T(`${fstr(f)} ${unit.en}`, `${fstr(f)} ${unit.bn}`), hints.filter(([f]) => isInt(f) && f[0] > 0));
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'men_days_hours', pattern: 'men_days_hours',
    tags: ['time_work', 'man_hours', framing],
    difficulty: framing === 'with_work' ? 3 : 2, time: framing === 'with_work' ? 75 : 60, stem, ...opts,
    steps: [
      T(`${work ? 'M₁D₁H₁/W₁ = M₂D₂H₂/W₂' : 'M₁ × D₁ × H₁ = M₂ × D₂ × H₂'}: ${M1} × ${D1} × ${H1}${work ? ` ÷ ${W1}` : ''} = ${[M2 ?? 'x', D2 ?? 'x', H2 ?? 'x'].join(' × ')}${work ? ` ÷ ${W2}` : ''}.`, `একই ধরনের কাজে ${work ? 'M₁D₁H₁/W₁ = M₂D₂H₂/W₂' : 'M₁ × D₁ × H₁ = M₂ × D₂ × H₂'}: ${M1} × ${D1} × ${H1}${work ? ` ÷ ${W1}` : ''} = ${[M2 ?? 'x', D2 ?? 'x', H2 ?? 'x'].join(' × ')}${work ? ` ÷ ${W2}` : ''}।`),
      T(`x = ${total}${work ? ` × ${W2} ÷ ${W1}` : ''} ÷ ${known[0] * known[1]} = ${v} ${unit.en}.`, `x = ${total}${work ? ` × ${W2} ÷ ${W1}` : ''} ÷ ${known[0] * known[1]} = ${v} ${unit.bn}।`),
    ],
    shortcut: T('M × D × H ÷ W stays the same for the same kind of work.', 'একই ধরনের কাজে M × D × H ÷ W একই থাকে।'),
  });
}

// =====================================================================
// three_workers
// =====================================================================
const THREE_FRAMINGS = ['together', 'find_third'];

function threeWorkers(framing = pick(THREE_FRAMINGS)) {
  const [A, B, C] = names(3);
  const job = pick(JOBS);
  if (framing === 'together') {
    const t = shuffle([4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24, 30, 36, 40, 45, 60]).slice(0, 3).sort((x, y) => x - y);
    const L = t.reduce(lcm);
    const units = t.map((x) => L / x);
    const ans = fr(L, units[0] + units[1] + units[2]);
    if (L > 360 || ans[1] > 12) return null;
    const stem = T(
      `${A.en}, ${B.en} and ${C.en} can do ${job[0]} in ${t[0]}, ${t[1]} and ${t[2]} days respectively. Working together, in how many days will they complete it?`,
      `${A.bn}, ${B.bn} ও ${C.bn} যথাক্রমে ${t[0]}, ${t[1]} ও ${t[2]} দিনে ${job[1]} করতে পারে। একসঙ্গে কাজ করলে কত দিনে শেষ হবে?`,
    );
    const opts = fracOptions(ans, DAYS, [
      [fr(t[0] + t[1] + t[2], 3), 'The average of the days is not the together time; add the one-day works.', 'দিনের গড় একসঙ্গের সময় নয়; এক দিনের কাজ যোগ করো।'],
      [fr(t[0] * t[1], t[0] + t[1]), `That leaves out ${C.en}.`, `এখানে ${C.bn} বাদ পড়েছে।`],
    ]);
    if (!opts) return null;
    return build({
      topic: TOPIC, subtopic: 'three_workers', pattern: 'three_workers',
      tags: ['time_work', 'work_rate', framing], difficulty: 2, time: 60, stem, ...opts,
      steps: [
        T(`Work = LCM(${t.join(', ')}) = ${L} units; daily: ${units.join(', ')} units.`, `মোট কাজ = ল.সা.গু.(${t.join(', ')}) = ${L} একক; দৈনিক: ${units.join(', ')} একক।`),
        T(`Together ${units[0] + units[1] + units[2]} units a day: ${L} ÷ ${units[0] + units[1] + units[2]} = ${fstr(ans)} days.`, `একসঙ্গে রোজ ${units[0] + units[1] + units[2]} একক: ${L} ÷ ${units[0] + units[1] + units[2]} = ${fstr(ans)} দিন।`),
      ],
      shortcut: T('Take the LCM of the days as the work; add the daily units; divide.', 'দিনগুলোর ল.সা.গু.-কে মোট কাজ ধরো; দৈনিক একক যোগ করে ভাগ করো।'),
    });
  }
  const [ta, tb] = shuffle([6, 8, 9, 10, 12, 15, 18, 20, 24, 30]).slice(0, 2);
  const tc = pick([6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60]);
  const all = fr(ta * tb * tc, ta * tb + tb * tc + tc * ta);
  if (!isInt(all)) return null;
  const pay = pick([null, null, ri(3, 30) * 100]);
  const stem = pay
    ? T(`${A.en} can do ${job[0]} in ${ta} days and ${B.en} in ${tb} days. With the help of ${C.en} they finish it in ${all[0]} days. If they receive ₹${pay} for the work, how much should ${C.en} get?`,
      `${A.bn} ${job[1]} ${ta} দিনে এবং ${B.bn} ${tb} দিনে করতে পারে। ${C.bn}-এর সাহায্যে তারা কাজটি ${all[0]} দিনে শেষ করে। কাজের জন্য মোট ₹${pay} পেলে ${C.bn} কত পাবে?`)
    : T(`${A.en} can complete ${job[0]} in ${ta} days and ${B.en} in ${tb} days. With ${C.en} joining them, all three complete it in ${all[0]} days. How many days will ${C.en} take to complete it alone?`,
      `${A.bn} ${job[1]} ${ta} দিনে এবং ${B.bn} ${tb} দিনে শেষ করতে পারে। ${C.bn} যোগ দিলে তিনজনে ${all[0]} দিনে শেষ করে। ${C.bn} একা কাজটি কত দিনে শেষ করবে?`);
  let opts;
  if (pay) {
    const share = fr(pay * all[0], tc);
    if (!isInt(share)) return null;
    const RS = (f) => T(`₹${fstr(f)}`, `₹${fstr(f)}`);
    opts = fracOptions(share, RS, [
      [fr(pay, 3), 'Equal shares ignore how much work each did.', 'সমান ভাগে কে কত কাজ করেছে তা ধরা হয় না।'],
      [fr(pay * all[0], ta), `That is ${A.en}'s share.`, `এটি ${A.bn}-এর ভাগ।`],
    ]);
  } else {
    opts = fracOptions(fr(tc), DAYS, [
      [fr(ta + tb + all[0]), 'Adding days does not give a rate.', 'দিন যোগ করলে হার পাওয়া যায় না।'],
      [fr(ta * tb, ta + tb), `That is ${A.en} and ${B.en} together.`, `এটি ${A.bn} ও ${B.bn}-এর একসঙ্গের সময়।`],
    ]);
  }
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'three_workers', pattern: 'three_workers',
    tags: ['time_work', 'work_rate', framing], difficulty: 3, time: 75, stem, ...opts,
    steps: [
      T(`${C.en}'s one-day work = 1/${all[0]} − 1/${ta} − 1/${tb} = 1/${tc}.`, `${C.bn}-এর এক দিনের কাজ = 1/${all[0]} − 1/${ta} − 1/${tb} = 1/${tc}।`),
      pay
        ? T(`In ${all[0]} days ${C.en} does ${all[0]}/${tc} of the work, so gets ₹${pay} × ${all[0]}/${tc} = ₹${pay * all[0] / tc}.`, `${all[0]} দিনে ${C.bn} কাজের ${all[0]}/${tc} অংশ করে, তাই পায় ₹${pay} × ${all[0]}/${tc} = ₹${pay * all[0] / tc}।`)
        : T(`So ${C.en} alone takes ${tc} days.`, `তাই ${C.bn} একা ${tc} দিন নেয়।`),
    ],
    shortcut: T('Third person\'s rate = group rate − the known rates.', 'তৃতীয়জনের হার = দলের হার − জানা হারগুলো।'),
  });
}

// =====================================================================
// one_worker
// =====================================================================
const ONE_FRAMINGS = ['tank_part', 'work_rest'];

function oneWorker(framing = pick(ONE_FRAMINGS)) {
  const p = pick(PARTS);
  if (framing === 'tank_part') {
    const t = ri(1, 12);
    const full = fr(t * p[1], p[0]); // minutes for the whole tank
    const t2 = pick([fr(ri(1, 20)), fr(ri(1, 20) * 2 + 1, 2)]);
    const ans = fdiv(t2, full);
    if (ans[0] >= ans[1] || ans[1] > 12 || t2[0] / t2[1] === t) return null;
    const pipeEmpty = pick([true, false]);
    const stem = T(
      `${fracTxt(p)} of a tank can be ${pipeEmpty ? 'emptied' : 'filled'} by a pipe in ${t} minute${t > 1 ? 's' : ''}. What part of the tank will be ${pipeEmpty ? 'emptied' : 'filled'} in ${fstr(t2)} minutes?`,
      `একটি নল ${t} মিনিটে একটি ট্যাঙ্কের ${fracTxt(p)} অংশ ${pipeEmpty ? 'খালি' : 'ভর্তি'} করতে পারে। ${fstr(t2)} মিনিটে ট্যাঙ্কের কত অংশ ${pipeEmpty ? 'খালি' : 'ভর্তি'} হবে?`,
    );
    const opts = fracOptions(ans, PART, [
      ...(fdiv(t2, fr(t))[0] < fdiv(t2, fr(t))[1] ? [[fdiv(t2, fr(t)), `${t} minutes is the time for ${fracTxt(p)} of the tank, not for the whole tank.`, `${t} মিনিট হল ট্যাঙ্কের ${fracTxt(p)} অংশের সময়, পুরো ট্যাঙ্কের নয়।`]] : []),
      [fdiv(t2, fmul(fr(t), fr(p[0], p[1]))), 'The time for the whole tank is t ÷ fraction, not t × fraction.', 'পুরো ট্যাঙ্কের সময় t ÷ ভগ্নাংশ, t × ভগ্নাংশ নয়।'],
      [fsub(fr(1), ans), 'That is the part NOT yet done.', 'এটি যে অংশ এখনও হয়নি।'],
    ], [fadd(ans, fr(1, ans[1])), fsub(ans, fr(1, ans[1]))]);
    if (!opts) return null;
    return build({
      topic: TOPIC, subtopic: 'one_worker', pattern: 'one_worker',
      tags: ['time_work', 'work_rate', framing], difficulty: 2, time: 45, stem, ...opts,
      steps: [
        T(`${fracTxt(p)} in ${t} min → whole tank in ${t} ÷ ${fracTxt(p)} = ${fstr(full)} min, i.e. ${fracTxt(fr(full[1], full[0]))} of the tank per minute.`, `${t} মিনিটে ${fracTxt(p)} → পুরো ট্যাঙ্ক ${t} ÷ ${fracTxt(p)} = ${fstr(full)} মিনিটে, অর্থাৎ মিনিটে ট্যাঙ্কের ${fracTxt(fr(full[1], full[0]))} অংশ।`),
        T(`In ${fstr(t2)} min: ${fstr(t2)} × ${fracTxt(fr(full[1], full[0]))} = ${fstr(ans)}.`, `${fstr(t2)} মিনিটে: ${fstr(t2)} × ${fracTxt(fr(full[1], full[0]))} = ${fstr(ans)}।`),
      ],
      shortcut: T('Part done is proportional to time: (new time ÷ old time) × old part.', 'কাজের অংশ সময়ের সমানুপাতিক: (নতুন সময় ÷ পুরনো সময়) × পুরনো অংশ।'),
    });
  }
  const d = ri(1, 12);
  const full = fr(d * p[1], p[0]);
  if (!isInt(full)) return null;
  const restDays = fsub(full, fr(d));
  const [A] = names(1);
  const job = pick(JOBS);
  const stem = T(
    `${A.en} does ${fracTxt(p)} of ${job[0]} in ${d} days. Working at the same rate, in how many more days will ${A.en} finish the rest?`,
    `${A.bn} ${d} দিনে ${job[4]} ${fracTxt(p)} অংশ করে। একই হারে কাজ করলে বাকি কাজ শেষ করতে আর কত দিন লাগবে?`,
  );
  const opts = fracOptions(restDays, DAYS, [
    [full, 'That is the time for the whole work; subtract the days already worked.', 'এটি পুরো কাজের সময়; ইতিমধ্যে কাজ করা দিন বাদ দাও।'],
    [fmul(fr(d), fsub(fr(1), fr(p[0], p[1]))), 'The rest is not "days × remaining fraction"; find the daily rate first.', 'বাকি সময় "দিন × বাকি ভগ্নাংশ" নয়; আগে দৈনিক হার বের করো।'],
  ]);
  if (!opts || restDays[0] <= 0) return null;
  return build({
    topic: TOPIC, subtopic: 'one_worker', pattern: 'one_worker',
    tags: ['time_work', 'work_rate', framing], difficulty: 2, time: 45, stem, ...opts,
    steps: [
      T(`Whole work = ${d} ÷ ${fracTxt(p)} = ${fstr(full)} days.`, `পুরো কাজ = ${d} ÷ ${fracTxt(p)} = ${fstr(full)} দিন।`),
      T(`More days = ${fstr(full)} − ${d} = ${fstr(restDays)} days.`, `আর দিন = ${fstr(full)} − ${d} = ${fstr(restDays)} দিন।`),
    ],
    shortcut: T('Days for the rest = days spent × (remaining fraction ÷ done fraction).', 'বাকির জন্য দিন = খরচ হওয়া দিন × (বাকি ভগ্নাংশ ÷ করা ভগ্নাংশ)।'),
  });
}

const GENERATORS = { partWorkGiven, efficiencyPercent, menWomen, pairsTogether, groupChange, menDaysHours, threeWorkers, oneWorker };
const FRAMINGS = { partWorkGiven: PWG_FRAMINGS, efficiencyPercent: EFF_FRAMINGS, menWomen: MW_FRAMINGS, pairsTogether: PAIR_FRAMINGS, groupChange: GROUP_FRAMINGS, menDaysHours: MDH_FRAMINGS, threeWorkers: THREE_FRAMINGS, oneWorker: ONE_FRAMINGS };

module.exports = {
  subject: 'quant',
  topics: [{ topic: TOPIC, weight: 1, gens: Object.entries(GENERATORS).map(([k, fn]) => retry(fn, FRAMINGS[k])) }],
  ...GENERATORS,
  FRAMINGS,
};
