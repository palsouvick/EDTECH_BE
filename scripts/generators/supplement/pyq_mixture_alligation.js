'use strict';

/**
 * Mixture & Alligation: standard-level practice for the PYQ types that had too few questions
 * of the same kind (see db/patterns/pyq_map/quant/mixture_alligation.json):
 *   mixing_two_mixtures            two blends 2 : 7 and 1 : 5 mixed to get 1 : 4 (or equal parts)
 *   add_pure_or_evaporate          300 g of 40% sugar solution -> add sugar (or boil off water) to make 50%
 *   dilution_target_concentration  add water to a mixture: the new water % / how much water for a target %
 */

const { ri, pick, gcd, T, build } = require('../common');
const { frac, retry } = require('./pyq_time_speed_distance');

const { fr, fsub, fdiv, isInt, fstr, fracOptions } = frac;
const TOPIC = 'mixture_alligation';
const ratioTxt = ([x, y]) => `${x} : ${y}`;
const reduce2 = (x, y) => { const g = gcd(x, y); return [x / g, y / g]; };

// =====================================================================
// mixing_two_mixtures
// =====================================================================
const MIX_FRAMINGS = ['target_ratio', 'equal'];
const MIX_CTX = [
  { a: ['milk', 'দুধ'], b: ['water', 'জল'], what: ['mixture', 'মিশ্রণ', 'মিশ্রণে'], vessel: ['vessels', 'পাত্রে'] },
  { a: ['Darjeeling tea', 'দার্জিলিং চা'], b: ['Assam tea', 'আসাম চা'], what: ['blend', 'মিশ্রণ', 'মিশ্রণে'], vessel: ['blends of tea', 'চায়ের মিশ্রণে'] },
  { a: ['alcohol', 'অ্যালকোহল'], b: ['water', 'জল'], what: ['solution', 'দ্রবণ', 'দ্রবণে'], vessel: ['solutions', 'দ্রবণে'] },
  { a: ['copper', 'তামা'], b: ['zinc', 'দস্তা'], what: ['alloy', 'সংকর ধাতু', 'সংকর ধাতুতে'], vessel: ['alloys', 'সংকর ধাতুতে'] },
];

function mixTwo(framing = pick(MIX_FRAMINGS)) {
  const c = pick(MIX_CTX);
  const r1 = reduce2(ri(1, 9), ri(1, 9));
  const r2 = reduce2(ri(1, 9), ri(1, 9));
  const rt = framing === 'equal' ? [1, 1] : reduce2(ri(1, 9), ri(1, 9));
  const f1 = fr(r1[0], r1[0] + r1[1]);
  const f2 = fr(r2[0], r2[0] + r2[1]);
  const ft = fr(rt[0], rt[0] + rt[1]);
  const lt = (a, b) => a[0] * b[1] < b[0] * a[1];
  if (!(lt(f1, ft) && lt(ft, f2)) && !(lt(f2, ft) && lt(ft, f1))) return null;
  const d1 = fsub(f2, ft); // weight of mixture 1 ∝ |f2 − ft|
  const d2 = fsub(ft, f1);
  const q = fdiv(d1, d2); // x : y = q
  if (q[0] <= 0 || q[0] > 20 || q[1] > 20) return null;
  const ans = [q[0], q[1]];
  const stem = framing === 'equal'
    ? T(
      `In one ${c.what[0]} the ratio of ${c.a[0]} to ${c.b[0]} is ${ratioTxt(r1)}, and in another it is ${ratioTxt(r2)}. In what ratio should the two be mixed so that the new ${c.what[0]} contains equal quantities of ${c.a[0]} and ${c.b[0]}?`,
      `একটি ${c.what[2]} ${c.a[1]} ও ${c.b[1]}-এর অনুপাত ${ratioTxt(r1)}, আরেকটিতে ${ratioTxt(r2)}। দুটিকে কোন অনুপাতে মেশালে নতুন ${c.what[2]} ${c.a[1]} ও ${c.b[1]}-এর পরিমাণ সমান হবে?`,
    )
    : T(
      `In two ${c.vessel[0]}, the ratios of ${c.a[0]} and ${c.b[0]} are ${ratioTxt(r1)} and ${ratioTxt(r2)} respectively. In what ratio should these two be mixed so that the ratio of ${c.a[0]} and ${c.b[0]} in the new ${c.what[0]} is ${ratioTxt(rt)}?`,
      `দুটি ${c.vessel[1]} ${c.a[1]} ও ${c.b[1]}-এর অনুপাত যথাক্রমে ${ratioTxt(r1)} ও ${ratioTxt(r2)}। এই দুটিকে কোন অনুপাতে মেশালে নতুন ${c.what[2]} ${c.a[1]} ও ${c.b[1]}-এর অনুপাত ${ratioTxt(rt)} হবে?`,
    );
  // distractors as ratios
  const fmtR = (f) => T(ratioTxt(f), ratioTxt(f));
  const asFrac = (a, b) => fr(a, b);
  const naive = (() => { // alligation on a/b (the ratio value) instead of the fraction a/(a + b)
    const v1 = fr(r1[0], r1[1]); const v2 = fr(r2[0], r2[1]); const vt = fr(rt[0], rt[1]);
    const x = fdiv(fsub(v2, vt), fsub(vt, v1));
    return x[0] > 0 ? x : null;
  })();
  const opts = fracOptions(asFrac(ans[0], ans[1]), fmtR, [
    [fr(ans[1], ans[0]), 'The alligation differences go CROSSWISE: the first mixture gets (second − target).', 'অ্যালিগেশনের পার্থক্য আড়াআড়ি বসে: প্রথম মিশ্রণ পায় (দ্বিতীয় − লক্ষ্য)।'],
    ...(naive ? [[naive, `Work with the FRACTION of ${c.a[0]} in each (${r1[0]}/${r1[0] + r1[1]}, ${r2[0]}/${r2[0] + r2[1]}), not the ratio value.`, `প্রতিটিতে ${c.a[1]}-এর ভগ্নাংশ (${r1[0]}/${r1[0] + r1[1]}, ${r2[0]}/${r2[0] + r2[1]}) নিয়ে কাজ করো, অনুপাতের মান নয়।`]] : []),
  ], [fr(ans[0] + 1, ans[1]), fr(ans[0], ans[1] + 1), fr(ans[0] + ans[1], ans[1])].filter((f) => f[1] <= 20));
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'mixing_two_mixtures', pattern: 'mixing_two_mixtures',
    tags: ['mixture', 'alligation', framing],
    difficulty: 3, time: 90, stem, ...opts,
    steps: [
      T(`Fraction of ${c.a[0]}: first ${fstr(f1)}, second ${fstr(f2)}, wanted ${fstr(ft)}.`, `${c.a[1]}-এর ভগ্নাংশ: প্রথমটিতে ${fstr(f1)}, দ্বিতীয়টিতে ${fstr(f2)}, চাই ${fstr(ft)}।`),
      T(`Alligation: first : second = (${fstr(f2)} − ${fstr(ft)}) : (${fstr(ft)} − ${fstr(f1)}) = ${fstr(d1[0] < 0 ? [-d1[0], d1[1]] : d1)} : ${fstr(d2[0] < 0 ? [-d2[0], d2[1]] : d2)} = ${ratioTxt(ans)}.`, `অ্যালিগেশন: প্রথম : দ্বিতীয় = (${fstr(f2)} − ${fstr(ft)}) : (${fstr(ft)} − ${fstr(f1)}) = ${fstr(d1[0] < 0 ? [-d1[0], d1[1]] : d1)} : ${fstr(d2[0] < 0 ? [-d2[0], d2[1]] : d2)} = ${ratioTxt(ans)}।`),
    ],
    shortcut: T('Turn every ratio into the fraction of ONE ingredient, then alligate: (dear − mean) : (mean − cheap), crosswise.', 'প্রতিটি অনুপাতকে একটি উপাদানের ভগ্নাংশে বদলাও, তারপর অ্যালিগেশন: (বেশি − গড়) : (গড় − কম), আড়াআড়ি।'),
  });
}

// =====================================================================
// add_pure_or_evaporate
// =====================================================================
const PURE_FRAMINGS = ['add_solute', 'evaporate'];
const SOLUTES = [['sugar', 'চিনি', 'sugar solution', 'চিনির দ্রবণ'], ['salt', 'নুন', 'salt solution', 'নুনের দ্রবণ'], ['alcohol', 'অ্যালকোহল', 'alcohol solution', 'অ্যালকোহলের দ্রবণ']];

function addPure(framing = pick(PURE_FRAMINGS)) {
  const [sol, solb, solution, solutionb] = pick(SOLUTES);
  const unit = sol === 'alcohol' ? ['litres', 'লিটার'] : ['gm', 'গ্রাম'];
  const W = ri(2, 40) * (unit[0] === 'gm' ? 25 : 5);
  const p = pick([5, 10, 12, 15, 20, 25, 30, 40]);
  const q = pick([10, 15, 20, 25, 30, 40, 50, 60, 75]);
  if (q <= p) return null;
  let ans;
  let stem;
  let hints;
  let steps;
  const fmt = (f) => T(`${fstr(f, true)} ${unit[0]}`, `${fstr(f, true)} ${unit[1]}`);
  if (framing === 'add_solute') {
    ans = fr(W * (q - p), 100 - q);
    stem = T(
      `${W} ${unit[0]} of ${solution} has ${p}% ${sol} in it. How much ${sol} should be added to make it ${q}% ${sol} in the solution?`,
      `${W} ${unit[1]} ${solutionb}ে ${p}% ${solb} আছে। দ্রবণে ${solb}-এর পরিমাণ ${q}% করতে কত ${solb} মেশাতে হবে?`,
    );
    hints = [
      [fr(W * (q - p), 100), `${q - p}% of the solution is not enough: the added ${sol} also makes the solution heavier.`, `দ্রবণের ${q - p}% যথেষ্ট নয়: মেশানো ${solb} দ্রবণের ওজনও বাড়ায়।`],
      [fr(W * (q - p), q), `Divide by the new share of the OTHER part (${100 - q}%), not by ${q}.`, `অন্য অংশের নতুন ভাগ (${100 - q}%) দিয়ে ভাগ করো, ${q} দিয়ে নয়।`],
    ];
    steps = [
      T(`${sol[0].toUpperCase() + sol.slice(1)} now = ${p}% of ${W} = ${W * p / 100} ${unit[0]}; the rest, ${W - W * p / 100} ${unit[0]}, does not change.`, `এখন ${solb} = ${W}-এর ${p}% = ${W * p / 100} ${unit[1]}; বাকি ${W - W * p / 100} ${unit[1]} বদলায় না।`),
      T(`That rest must be ${100 - q}% of the new total: new total = ${W - W * p / 100} × 100/${100 - q} = ${fstr(fr((W - W * p / 100) * 100, 100 - q), true)} ${unit[0]}.`, `ওই বাকি অংশ নতুন মোটের ${100 - q}% হবে: নতুন মোট = ${W - W * p / 100} × 100/${100 - q} = ${fstr(fr((W - W * p / 100) * 100, 100 - q), true)} ${unit[1]}।`),
      T(`${sol[0].toUpperCase() + sol.slice(1)} to add = ${fstr(fr((W - W * p / 100) * 100, 100 - q), true)} − ${W} = ${fstr(ans, true)} ${unit[0]}.`, `মেশাতে হবে = ${fstr(fr((W - W * p / 100) * 100, 100 - q), true)} − ${W} = ${fstr(ans, true)} ${unit[1]} ${solb}।`),
    ];
  } else {
    if (sol === 'alcohol') return null; // boiling off water from alcohol is not sensible
    ans = fr(W * (q - p), q);
    stem = T(
      `${W} ${unit[0]} of ${solution} contains ${p}% ${sol}. How much water must be evaporated so that the solution contains ${q}% ${sol}?`,
      `${W} ${unit[1]} ${solutionb}ে ${p}% ${solb} আছে। কত জল বাষ্পীভূত করলে দ্রবণে ${solb}-এর পরিমাণ ${q}% হবে?`,
    );
    hints = [
      [fr(W * (q - p), 100), `Evaporating ${q - p}% of the solution is not right; the ${sol} must become ${q}% of what is LEFT.`, `দ্রবণের ${q - p}% বাষ্প করা ঠিক নয়; যা বাকি থাকবে তার ${q}% হতে হবে ${solb}।`],
      [fr(W * p, q), `That is the weight LEFT after evaporation, not the water removed.`, 'এটি বাষ্পীভবনের পরে বাকি ওজন, সরানো জল নয়।'],
    ];
    steps = [
      T(`${sol[0].toUpperCase() + sol.slice(1)} = ${p}% of ${W} = ${W * p / 100} ${unit[0]}, and it does not change.`, `${solb} = ${W}-এর ${p}% = ${W * p / 100} ${unit[1]}, এটি বদলায় না।`),
      T(`New total = ${W * p / 100} × 100/${q} = ${fstr(fr(W * p, q), true)} ${unit[0]}; water to evaporate = ${W} − ${fstr(fr(W * p, q), true)} = ${fstr(ans, true)} ${unit[0]}.`, `নতুন মোট = ${W * p / 100} × 100/${q} = ${fstr(fr(W * p, q), true)} ${unit[1]}; বাষ্প করতে হবে = ${W} − ${fstr(fr(W * p, q), true)} = ${fstr(ans, true)} ${unit[1]} জল।`),
    ];
  }
  if (!isInt(fr(W * p, 100)) || ![1, 2].includes(ans[1])) return null;
  const opts = fracOptions(ans, fmt, hints.filter(([f]) => [1, 2].includes(f[1])));
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'add_pure_or_evaporate', pattern: 'add_pure_or_evaporate',
    tags: ['mixture', 'concentration', framing],
    difficulty: framing === 'add_solute' ? 3 : 2, time: 75, stem, ...opts, steps,
    shortcut: T('Hold the part that does NOT change fixed: adding solute keeps the water fixed; evaporating keeps the solute fixed.', 'যে অংশ বদলায় না সেটি স্থির ধরো: দ্রব্য মেশালে জল স্থির থাকে; বাষ্প করলে দ্রব্য স্থির থাকে।'),
  });
}

// =====================================================================
// dilution_target_concentration
// =====================================================================
const DIL_FRAMINGS = ['add_given', 'find_water'];

function dilution(framing = pick(DIL_FRAMINGS)) {
  const liquid = pick([['milk', 'দুধ', 'litres', 'লিটার'], ['milk', 'দুধ', 'gm', 'গ্রাম'], ['juice', 'রস', 'litres', 'লিটার'], ['acid', 'অ্যাসিড', 'litres', 'লিটার']]);
  const [li, lib, u, ub] = liquid;
  const adj = (n) => `${n}-${u === 'litres' ? 'litre' : 'gram'}`; // "a 40-litre mixture"
  const W = ri(2, 30) * pick([5, 10, 20]);
  if (framing === 'add_given') {
    const w = pick([10, 20, 25, 30, 40, 50, 60, 75]); // water %
    const x = ri(1, 12) * 5;
    const water = fr(W * w, 100);
    if (!isInt(water)) return null;
    const ans = fr((water[0] + x) * 100, W + x);
    if (!isInt(ans)) return null;
    const pct = (f) => T(`${fstr(f, true)}%`, `${fstr(f, true)}%`);
    const stem = T(
      `In a ${adj(W)} mixture of ${li} and water, the proportion of water is ${w}%. If ${x} ${u} of water is added to it, what will be the percentage of water in the new mixture?`,
      `${li === 'acid' ? 'অ্যাসিড' : lib} ও জলের ${W} ${ub} মিশ্রণে জলের পরিমাণ ${w}%। এতে ${x} ${ub} জল মেশালে নতুন মিশ্রণে জলের শতাংশ কত হবে?`,
    );
    const opts = fracOptions(ans, pct, [
      [fr((water[0] + x) * 100, W), 'The total also grows when water is added; divide by the NEW total.', 'জল মেশালে মোট পরিমাণও বাড়ে; নতুন মোট দিয়ে ভাগ করো।'],
      [fr(w + (x * 100) / W), `Adding ${x} ${u} does not simply add ${fstr(fr(x * 100, W), true)} percentage points.`, `${x} ${u} মেশালে শতাংশে সরাসরি ${fstr(fr(x * 100, W), true)} যোগ হয় না।`],
    ].filter(([f]) => f[0] / f[1] < 100 && [1, 2, 4, 5].includes(f[1])), [fr(ans[0] + 5), fr(ans[0] - 5), fr(ans[0] + 10)].filter((f) => f[0] < 100));
    if (!opts) return null;
    return build({
      topic: TOPIC, subtopic: 'dilution_target_concentration', pattern: 'dilution_target_concentration',
      tags: ['mixture', 'concentration', framing], difficulty: 2, time: 60, stem, ...opts,
      steps: [
        T(`Water now = ${w}% of ${W} = ${water[0]} ${u}. After adding ${x}: water = ${water[0] + x} ${u} in ${W + x} ${u}.`, `এখন জল = ${W}-এর ${w}% = ${water[0]} ${ub}। ${x} মেশানোর পরে: জল = ${water[0] + x} ${ub}, মোট ${W + x} ${ub}।`),
        T(`Water % = ${water[0] + x}/${W + x} × 100 = ${fstr(ans, true)}%.`, `জলের শতাংশ = ${water[0] + x}/${W + x} × 100 = ${fstr(ans, true)}%।`),
      ],
      shortcut: T('New % = (old amount + added) ÷ (old total + added) × 100.', 'নতুন % = (আগের পরিমাণ + মেশানো) ÷ (আগের মোট + মেশানো) × 100।'),
    });
  }
  const p = pick([40, 50, 60, 75, 80, 90]); // % of the liquid now
  const q = pick([25, 30, 40, 50, 60, 75]); // target %
  if (q >= p) return null;
  const ans = fr(W * (p - q), q);
  if (![1, 2].includes(ans[1])) return null;
  const fmt = (f) => T(`${fstr(f, true)} ${u}`, `${fstr(f, true)} ${ub}`);
  const stem = T(
    `A ${adj(W)} mixture contains ${p}% ${li} and the rest water. How much water must be added to bring the ${li} down to ${q}% of the mixture?`,
    `${W} ${ub} একটি মিশ্রণে ${p}% ${lib}, বাকিটা জল। মিশ্রণে ${lib}-এর পরিমাণ কমিয়ে ${q}% করতে কত জল মেশাতে হবে?`,
  );
  const opts = fracOptions(ans, fmt, [
    [fr(W * (p - q), 100), `${p - q}% of the mixture is too little: after adding water the ${li} must be ${q}% of the NEW total.`, `মিশ্রণের ${p - q}% কম পড়ে: জল মেশানোর পরে নতুন মোটের ${q}% হবে ${lib}।`],
    [fr(W * p, q), 'That is the new TOTAL, not the water added.', 'এটি নতুন মোট পরিমাণ, মেশানো জল নয়।'],
  ].filter(([f]) => [1, 2].includes(f[1])));
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'dilution_target_concentration', pattern: 'dilution_target_concentration',
    tags: ['mixture', 'concentration', framing], difficulty: 3, time: 75, stem, ...opts,
    steps: [
      T(`${li[0].toUpperCase() + li.slice(1)} = ${p}% of ${W} = ${fstr(fr(W * p, 100), true)} ${u}; it must be ${q}% of the new total.`, `${lib} = ${W}-এর ${p}% = ${fstr(fr(W * p, 100), true)} ${ub}; এটি নতুন মোটের ${q}% হবে।`),
      T(`New total = ${fstr(fr(W * p, 100), true)} × 100/${q} = ${fstr(fr(W * p, q), true)} ${u}; water to add = ${fstr(fr(W * p, q), true)} − ${W} = ${fstr(ans, true)} ${u}.`, `নতুন মোট = ${fstr(fr(W * p, 100), true)} × 100/${q} = ${fstr(fr(W * p, q), true)} ${ub}; মেশাতে হবে = ${fstr(fr(W * p, q), true)} − ${W} = ${fstr(ans, true)} ${ub} জল।`),
    ],
    shortcut: T('The liquid itself does not change: new total = liquid ÷ target %; water to add = new total − old total.', 'তরলটির পরিমাণ বদলায় না: নতুন মোট = তরল ÷ লক্ষ্য %; মেশাতে হবে = নতুন মোট − আগের মোট।'),
  });
}

const GENERATORS = { mixTwo, addPure, dilution };
const FRAMINGS = { mixTwo: MIX_FRAMINGS, addPure: PURE_FRAMINGS, dilution: DIL_FRAMINGS };

module.exports = {
  subject: 'quant',
  topics: [{ topic: TOPIC, weight: 1, gens: Object.entries(GENERATORS).map(([k, fn]) => retry(fn, FRAMINGS[k])) }],
  ...GENERATORS,
  FRAMINGS,
};
