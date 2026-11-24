'use strict';

/**
 * Problems on Ages: standard-level practice for the WBPSC-family PYQ types that had no
 * practice bank of their own (db/patterns/pyq_map/quant/ages.json):
 *
 *  - age_gaps_and_total  "Arun is senior to Barun by 6 years; the sum of their ages is 54"
 *                        (Clerkship 2004), "a father is 30 years older than his first son,
 *                        who is 10 years older than the second; the sum is 95" (Clerkship 2006).
 *  - three_person_ratio  "ages in the ratio 5 : 8 : 9 and A + C = 56" (Clerkship 2019),
 *                        "7 : 5 : 4 and first + third exceeds twice the second by 5"
 *                        (Clerkship 2019), "father : mother : son = 6 : 5 : 1; when the son
 *                        attains his father's present age the sum will be 135" (Clerkship 2023).
 *
 * Every age is a whole number; distractors are the real slips (chain gap not added up,
 * dividing by all the ratio parts, forgetting that every person ages, wrong person).
 */

const { ri, pick, gcd, T, names, NAMES_M, NAMES_F, numOptions, build } = require('../common');

const yrs = (v) => T(`${v} years`, `${v} বছর`);

/** Bengali possessive of a name: প্রিয়া → প্রিয়ার, রাজেশ → রাজেশের, বিশ্বজিৎ → বিশ্বজিতের, A → A-এর. */
function of(p) {
  const w = p.bn;
  if (/[A-Za-z]$/.test(w)) return `${w}-এর`;
  if (w.endsWith('ৎ')) return `${w.slice(0, -1)}তের`;
  return /[ািীুূৃেৈোৌঅআইঈউঊএঐওঔ]$/.test(w) ? `${w}র` : `${w}ের`;
}

/** Numeric options; hints that are not positive whole numbers are dropped (no 14.67-style distractors). */
function opts(ans, hints) {
  const clean = hints.filter(([v]) => Number.isInteger(v) && v > 0 && v !== ans);
  return numOptions(ans, yrs, clean);
}

// ---------------------------------------------------------------- age_gaps_and_total

const GAP_FRAMINGS = ['two', 'father_sons', 'grandmother', 'middle'];

function ageGapsAndTotal(framing = pick(GAP_FRAMINGS)) {
  if (framing === 'two') {
    const [X, Y] = names(2);
    const y = ri(12, 45);
    const g = ri(2, 16);
    const x = y + g;
    const S = x + y;
    const askY = ri(0, 1) === 1;
    const rel = pick([
      T(`${X.en} is senior to ${Y.en} by ${g} years`, `${X.bn} ${of(Y)} চেয়ে ${g} বছরের বড়ো`),
      T(`${X.en} is ${g} years older than ${Y.en}`, `${X.bn} ${of(Y)} চেয়ে ${g} বছরের বড়ো`),
      T(`${Y.en} is ${g} years younger than ${X.en}`, `${Y.bn} ${of(X)} চেয়ে ${g} বছরের ছোটো`),
    ]);
    const who = askY ? Y : X;
    const ans = askY ? y : x;
    const stem = T(
      `${rel.en}. If the sum of their ages is ${S} years, what is the age of ${who.en}?`,
      `${rel.bn}। তাদের বয়সের যোগফল ${S} বছর হলে ${of(who)} বয়স কত?`,
    );
    const o = opts(ans, [
      [askY ? x : y, `That is ${askY ? X.en : Y.en}'s age; the question asks for ${who.en}.`, `এটি ${of(askY ? X : Y)} বয়স; প্রশ্নে ${of(who)} বয়স চাওয়া হয়েছে।`],
      [S / 2, 'Halving the sum ignores the gap between the two ages.', 'যোগফলকে অর্ধেক করলে দুজনের বয়সের ব্যবধান বাদ পড়ে যায়।'],
      [askY ? S - g : S + g, `That is (sum ${askY ? '−' : '+'} gap) — it still has to be halved.`, `এটি (যোগফল ${askY ? '−' : '+'} ব্যবধান) — একে এখনও অর্ধেক করতে হবে।`],
    ]);
    return build({
      topic: 'ages', subtopic: 'age_gaps_and_total', pattern: 'age_gaps_and_total',
      tags: ['ages', 'age_gap', 'two'], difficulty: 2, time: 45,
      stem, ...o,
      steps: [
        T(`Let ${Y.en}'s age be x years; then ${X.en} = x + ${g}.`, `${of(Y)} বয়স x বছর ধরো; তাহলে ${X.bn} = x + ${g}।`),
        T(`x + (x + ${g}) = ${S}, so 2x = ${S - g} and x = ${y}.`, `x + (x + ${g}) = ${S}, তাই 2x = ${S - g} এবং x = ${y}।`),
        T(`${who.en} = ${ans} years (${X.en} ${x}, ${Y.en} ${y}).`, `${who.bn} = ${ans} বছর (${X.bn} ${x}, ${Y.bn} ${y})।`),
      ],
      shortcut: T('Younger = (sum − gap) ÷ 2; elder = (sum + gap) ÷ 2.', 'ছোটো = (যোগফল − ব্যবধান) ÷ 2; বড়ো = (যোগফল + ব্যবধান) ÷ 2।'),
    });
  }

  if (framing === 'father_sons' || framing === 'grandmother') {
    // chain: top -> mid -> low, gaps g1 (top over mid) and g2 (mid over low)
    const low = ri(4, 22);
    const g2 = ri(2, 12);
    const g1 = framing === 'father_sons' ? ri(24, 36) : ri(20, 30);
    const mid = low + g2;
    const top = mid + g1;
    if (framing === 'grandmother' && mid < 22) return null;
    const S = top + mid + low;
    const ask = pick(['top', 'top', 'low', 'mid']);
    const P = framing === 'father_sons'
      ? { top: T('the father', 'বাবার'), mid: T('the elder son', 'বড়ো ছেলের'), low: T('the younger son', 'ছোটো ছেলের') }
      : { top: T('the grandmother', 'দিদিমার'), mid: T('the mother', 'মায়ের'), low: T('the granddaughter', 'নাতনির') };
    const intro = framing === 'father_sons'
      ? T(`A father is older than his elder son by ${g1} years, and the elder son is older than the younger son by ${g2} years.`,
        `বাবা তাঁর বড়ো ছেলের চেয়ে ${g1} বছরের বড়ো, আর বড়ো ছেলে ছোটো ছেলের চেয়ে ${g2} বছরের বড়ো।`)
      : T(`A grandmother is ${g1} years older than the mother, and the mother is ${g2} years older than the granddaughter.`,
        `দিদিমা মায়ের চেয়ে ${g1} বছরের বড়ো, আর মা নাতনির চেয়ে ${g2} বছরের বড়ো।`);
    const val = { top, mid, low };
    const ans = val[ask];
    const stem = T(
      `${intro.en} If the sum of the ages of all three is ${S} years, find the age of ${P[ask].en}.`,
      `${intro.bn} তিনজনের বয়সের যোগফল ${S} বছর হলে ${P[ask].bn} বয়স নির্ণয় করো।`,
    );
    // Slip: treating g1 as the top's lead over the YOUNGEST (gaps not added along the chain).
    const xSlip = (S - g1 - g2) / 3;
    const slip = { top: xSlip + g1, mid: xSlip + g2, low: xSlip }[ask];
    const other = ask === 'top' ? mid : top;
    const o = opts(ans, [
      [slip, `Along a chain the gaps add up: ${P.top.en} is ${g1} + ${g2} = ${g1 + g2} years older than ${P.low.en}.`, `শৃঙ্খলে ব্যবধান যোগ হয়: ${P.top.bn} ${P.low.bn} চেয়ে ${g1} + ${g2} = ${g1 + g2} বছরের বড়ো।`],
      [other, `That is the age of ${ask === 'top' ? P.mid.en : P.top.en}, not ${P[ask].en}.`, `এটি ${ask === 'top' ? P.mid.bn : P.top.bn} বয়স, ${P[ask].bn} নয়।`],
      [S / 3, 'Dividing the total by 3 ignores the age gaps.', 'মোটকে 3 দিয়ে ভাগ করলে বয়সের ব্যবধান বাদ পড়ে যায়।'],
    ]);
    return build({
      topic: 'ages', subtopic: 'age_gaps_and_total', pattern: 'age_gaps_and_total',
      tags: ['ages', 'age_gap', framing], difficulty: 3, time: 60,
      stem, ...o,
      steps: [
        T(`Let ${P.low.en} be x years. Then ${P.mid.en} = x + ${g2} and ${P.top.en} = x + ${g2} + ${g1} = x + ${g1 + g2}.`,
          `${P.low.bn} বয়স x বছর ধরো। তাহলে ${P.mid.bn} = x + ${g2} এবং ${P.top.bn} = x + ${g2} + ${g1} = x + ${g1 + g2}।`),
        T(`x + (x + ${g2}) + (x + ${g1 + g2}) = ${S}, so 3x + ${g1 + 2 * g2} = ${S} and 3x = ${S - g1 - 2 * g2}.`,
          `x + (x + ${g2}) + (x + ${g1 + g2}) = ${S}, তাই 3x + ${g1 + 2 * g2} = ${S} এবং 3x = ${S - g1 - 2 * g2}।`),
        T(`x = ${low}; so ${P.low.en} ${low}, ${P.mid.en} ${mid}, ${P.top.en} ${top} → answer ${ans} years.`,
          `x = ${low}; তাই ${P.low.bn} ${low}, ${P.mid.bn} ${mid}, ${P.top.bn} ${top} → উত্তর ${ans} বছর।`),
      ],
      shortcut: T('Take the youngest as x, add the gaps along the chain, and divide what is left of the total by 3.', 'সবচেয়ে ছোটোকে x ধরো, শৃঙ্খল ধরে ব্যবধান যোগ করো, তারপর মোট থেকে সেগুলো বাদ দিয়ে 3 দিয়ে ভাগ করো।'),
    });
  }

  // middle: X is g1 older than Y but g2 younger than Z
  const [X, Y, Z] = names(3);
  const x = ri(14, 40);
  const g1 = ri(2, 10);
  const g2 = ri(2, 10);
  if (g1 === g2) return null;
  const y = x - g1;
  const z = x + g2;
  const S = x + y + z;
  const ask = pick(['x', 'y', 'z']);
  const who = { x: X, y: Y, z: Z }[ask];
  const ans = { x, y, z }[ask];
  const stem = T(
    `${X.en} is ${g1} years older than ${Y.en} but ${g2} years younger than ${Z.en}. The total of the ages of ${X.en}, ${Y.en} and ${Z.en} is ${S} years. How old is ${who.en}?`,
    `${X.bn} ${of(Y)} চেয়ে ${g1} বছরের বড়ো কিন্তু ${of(Z)} চেয়ে ${g2} বছরের ছোটো। ${X.bn}, ${Y.bn} ও ${of(Z)} বয়সের যোগফল ${S} বছর। ${of(who)} বয়স কত?`,
  );
  const signSlip = (S + g1 + g2) / 3; // X found with the gaps' signs mixed up
  const sx = { x: signSlip, y: signSlip - g1, z: signSlip + g2 }[ask];
  const o = opts(ans, [
    [ask === 'x' ? y : x, `That is ${ask === 'x' ? Y.en : X.en}'s age.`, `এটি ${of(ask === 'x' ? Y : X)} বয়স।`],
    [sx, `${Y.en} is younger than ${X.en} (x − ${g1}) and ${Z.en} is older (x + ${g2}); the signs were mixed up.`, `${Y.bn} ${of(X)} চেয়ে ছোটো (x − ${g1}) আর ${Z.bn} বড়ো (x + ${g2}); চিহ্ন গুলিয়ে ফেলা হয়েছে।`],
    [S / 3, 'Dividing the total by 3 ignores the age gaps.', 'মোটকে 3 দিয়ে ভাগ করলে বয়সের ব্যবধান বাদ পড়ে যায়।'],
  ]);
  return build({
    topic: 'ages', subtopic: 'age_gaps_and_total', pattern: 'age_gaps_and_total',
    tags: ['ages', 'age_gap', 'middle'], difficulty: 3, time: 60,
    stem, ...o,
    steps: [
      T(`Let ${X.en} be x years: ${Y.en} = x − ${g1}, ${Z.en} = x + ${g2}.`, `${of(X)} বয়স x বছর ধরো: ${Y.bn} = x − ${g1}, ${Z.bn} = x + ${g2}।`),
      T(`x + (x − ${g1}) + (x + ${g2}) = ${S}, so 3x = ${S} + ${g1} − ${g2} = ${3 * x} and x = ${x}.`, `x + (x − ${g1}) + (x + ${g2}) = ${S}, তাই 3x = ${S} + ${g1} − ${g2} = ${3 * x} এবং x = ${x}।`),
      T(`${X.en} ${x}, ${Y.en} ${y}, ${Z.en} ${z} → ${who.en} is ${ans} years old.`, `${X.bn} ${x}, ${Y.bn} ${y}, ${Z.bn} ${z} → ${of(who)} বয়স ${ans} বছর।`),
    ],
    shortcut: T('Write everyone in terms of the person the others are compared with, then solve one equation.', 'যার সঙ্গে সবার তুলনা করা হয়েছে তাকে x ধরে সবাইকে লেখো, তারপর একটি সমীকরণ সমাধান করো।'),
  });
}

// ---------------------------------------------------------------- three_person_ratio

const TRIPLES = [
  [5, 8, 9], [7, 5, 4], [2, 3, 4], [3, 4, 5], [4, 5, 6], [3, 5, 7], [2, 5, 6], [5, 6, 8], [4, 7, 9], [3, 7, 8], [6, 5, 1], [7, 6, 2], [8, 7, 3], [9, 8, 3], [5, 4, 1],
];
const RATIO_FRAMINGS = ['pair_sum', 'exceeds', 'time_shift', 'son_attains', 'difference'];
const ORD = [T('first', 'প্রথম'), T('second', 'দ্বিতীয়'), T('third', 'তৃতীয়')];

function threePersonRatio(framing = pick(RATIO_FRAMINGS)) {
  if (framing === 'son_attains') {
    // father : mother : son = f : m : s, son reaches the father's present age after (f − s)k years.
    const [f, m, s] = pick([[6, 5, 1], [7, 6, 2], [8, 7, 3], [5, 4, 1], [9, 8, 3], [7, 6, 1], [8, 7, 2]]);
    const k = ri(3, 8);
    if (s * k < 3 || f * k > 75) return null;
    const yrsAhead = (f - s) * k;
    const S = (f + m + s) * k + 3 * yrsAhead;
    const ask = pick(['mother', 'mother', 'father', 'son']);
    const coef = { father: f, mother: m, son: s }[ask];
    const ans = coef * k;
    const P = { father: T('the father', 'বাবার'), mother: T('the mother', 'মায়ের'), son: T('the son', 'ছেলের') };
    const stem = T(
      `The ratio of the present ages of a father, a mother and their son is ${f} : ${m} : ${s}. When the son attains the present age of his father, the sum of their ages will be ${S} years. What is the present age of ${P[ask].en}?`,
      `বাবা, মা ও তাদের ছেলের বর্তমান বয়সের অনুপাত ${f} : ${m} : ${s}। ছেলে যখন বাবার বর্তমান বয়সে পৌঁছবে, তখন তিনজনের বয়সের যোগফল হবে ${S} বছর। ${P[ask].bn} বর্তমান বয়স কত?`,
    );
    const total = f + m + s;
    const o = opts(ans, [
      [coef * S / total, 'The sum is for a FUTURE year: each of the three gains the same number of years, so you cannot divide it by the present parts.', 'যোগফলটি ভবিষ্যতের: তিনজনেরই একই বছর বাড়বে, তাই একে বর্তমান অংশ দিয়ে ভাগ করা যায় না।'],
      [coef * S / (total + (f - s)), `Every one of the three ages by ${f - s}k years, not just the son: add 3 × ${f - s}k.`, `শুধু ছেলের নয়, তিনজনেরই বয়স ${f - s}k বছর বাড়ে: 3 × ${f - s}k যোগ করো।`],
      [ans + yrsAhead, 'That is the age at the future time, not the present age.', 'এটি ভবিষ্যতের বয়স, বর্তমান বয়স নয়।'],
    ]);
    return build({
      topic: 'ages', subtopic: 'three_person_ratio', pattern: 'three_person_ratio',
      tags: ['ages', 'ratio', 'three_people', 'son_attains'], difficulty: 3, time: 75,
      stem, ...o,
      steps: [
        T(`Let the present ages be ${f}k, ${m}k and ${s}k.`, `বর্তমান বয়স ${f}k, ${m}k ও ${s}k ধরো।`),
        T(`The son reaches ${f}k after ${f}k − ${s}k = ${f - s}k years, and each of the three gains ${f - s}k years.`, `ছেলে ${f}k-তে পৌঁছবে ${f}k − ${s}k = ${f - s}k বছর পরে, আর তিনজনেরই ${f - s}k বছর বাড়বে।`),
        T(`Sum then = ${total}k + 3 × ${f - s}k = ${total + 3 * (f - s)}k = ${S}, so k = ${k}.`, `তখন যোগফল = ${total}k + 3 × ${f - s}k = ${total + 3 * (f - s)}k = ${S}, তাই k = ${k}।`),
        T(`${P[ask].en} = ${coef} × ${k} = ${ans} years.`, `${P[ask].bn} = ${coef} × ${k} = ${ans} বছর।`),
      ],
      shortcut: T('Years to wait = (father − son) parts; future sum = (all parts + 3 × waiting parts) × k.', 'অপেক্ষার বছর = (বাবা − ছেলে) অংশ; ভবিষ্যতের যোগফল = (সব অংশ + 3 × অপেক্ষার অংশ) × k।'),
    });
  }

  const tri = pick(TRIPLES);
  const k = ri(2, 9);
  const ages = tri.map((r) => r * k);
  if (Math.max(...ages) > 80 || Math.min(...ages) < 4) return null;
  const useNames = ri(0, 1) === 1;
  const ppl = useNames ? names(3) : [T('A', 'A'), T('B', 'B'), T('C', 'C')];
  const lab = (i) => ppl[i];
  const total = tri[0] + tri[1] + tri[2];
  const intro = T(
    `The ratio of the ages of ${lab(0).en}, ${lab(1).en} and ${lab(2).en} is ${tri.join(' : ')}.`,
    `${lab(0).bn}, ${lab(1).bn} ও ${of(lab(2))} বয়সের অনুপাত ${tri.join(' : ')}।`,
  );

  if (framing === 'pair_sum') {
    const [i, j] = pick([[0, 2], [0, 1], [1, 2]]);
    const ask = [0, 1, 2].find((q) => q !== i && q !== j);
    const S = ages[i] + ages[j];
    const ans = ages[ask];
    const stem = T(
      `${intro.en} If the sum of the ages of ${lab(i).en} and ${lab(j).en} is ${S} years, the age of ${lab(ask).en} is`,
      `${intro.bn} ${lab(i).bn} ও ${of(lab(j))} বয়সের যোগফল ${S} বছর হলে ${of(lab(ask))} বয়স কত?`,
    );
    const o = opts(ans, [
      [(S * tri[ask]) / total, `${S} is the sum of only ${tri[i]} + ${tri[j]} = ${tri[i] + tri[j]} parts; dividing by all ${total} parts is wrong.`, `${S} হল শুধু ${tri[i]} + ${tri[j]} = ${tri[i] + tri[j]} অংশের যোগফল; সব ${total} অংশ দিয়ে ভাগ করা ভুল।`],
      [k, `That is one part (k = ${k}); multiply it by ${tri[ask]}.`, `এটি এক অংশ (k = ${k}); একে ${tri[ask]} দিয়ে গুণ করো।`],
    ]);
    return build({
      topic: 'ages', subtopic: 'three_person_ratio', pattern: 'three_person_ratio',
      tags: ['ages', 'ratio', 'three_people', 'pair_sum'], difficulty: 2, time: 50,
      stem, ...o,
      steps: [
        T(`Let the ages be ${tri[0]}k, ${tri[1]}k and ${tri[2]}k.`, `বয়সগুলি ${tri[0]}k, ${tri[1]}k ও ${tri[2]}k ধরো।`),
        T(`${lab(i).en} + ${lab(j).en} = ${tri[i]}k + ${tri[j]}k = ${tri[i] + tri[j]}k = ${S}, so k = ${k}.`, `${lab(i).bn} + ${lab(j).bn} = ${tri[i]}k + ${tri[j]}k = ${tri[i] + tri[j]}k = ${S}, তাই k = ${k}।`),
        T(`${lab(ask).en} = ${tri[ask]} × ${k} = ${ans} years.`, `${lab(ask).bn} = ${tri[ask]} × ${k} = ${ans} বছর।`),
      ],
      shortcut: T('Count only the parts the given sum covers; one part = sum ÷ those parts.', 'প্রদত্ত যোগফলে যে অংশগুলো আছে শুধু সেগুলো গোনো; এক অংশ = যোগফল ÷ সেই অংশ।'),
    });
  }

  if (framing === 'exceeds') {
    // (age_i + age_j) − m × age_q = d, with q the remaining person and a positive whole gap
    const q = ri(0, 2);
    const [i, j] = [0, 1, 2].filter((x) => x !== q);
    const m = pick([1, 2]);
    const e = tri[i] + tri[j] - m * tri[q];
    if (e <= 0) return null;
    const d = e * k;
    const ask = pick([q, i, j]);
    const ans = ages[ask];
    const twice = m === 2 ? T('twice the age', 'বয়সের দ্বিগুণের') : T('the age', 'বয়সের');
    const stem = useNames
      ? T(`${intro.en} The sum of the ages of ${lab(i).en} and ${lab(j).en} exceeds ${twice.en} of ${lab(q).en} by ${d} years. Find the age of ${lab(ask).en}.`,
        `${intro.bn} ${lab(i).bn} ও ${of(lab(j))} বয়সের যোগফল ${of(lab(q))} ${twice.bn} চেয়ে ${d} বছর বেশি। ${of(lab(ask))} বয়স নির্ণয় করো।`)
      : T(`The ratio of the ages of three persons is ${tri.join(' : ')}. The sum of the ages of the ${ORD[i].en} and the ${ORD[j].en} exceeds ${twice.en} of the ${ORD[q].en} person by ${d} years. The age of the ${ORD[ask].en} person is`,
        `তিনজনের বয়সের অনুপাত ${tri.join(' : ')}। ${ORD[i].bn} ও ${ORD[j].bn} জনের বয়সের যোগফল ${ORD[q].bn} জনের ${twice.bn} চেয়ে ${d} বছর বেশি। ${ORD[ask].bn} জনের বয়স কত?`);
    const o = opts(ans, [
      [d, `${d} years is the gap (${e} part${e > 1 ? 's' : ''}), not an age.`, `${d} বছর হল ব্যবধান (${e} অংশ), কারও বয়স নয়।`],
      [m === 2 ? (d / (tri[i] + tri[j] - tri[q])) * tri[ask] : (d / (tri[i] + tri[j] - 2 * tri[q])) * tri[ask],
        m === 2 ? `“Twice the age” means 2 × ${tri[q]}k; the doubling was left out.` : `“Exceeds the age” means subtract ${tri[q]}k once, not twice.`,
        m === 2 ? `“বয়সের দ্বিগুণ” মানে 2 × ${tri[q]}k; দ্বিগুণ করা বাদ পড়েছে।` : `“বয়সের চেয়ে বেশি” মানে ${tri[q]}k একবারই বিয়োগ, দুবার নয়।`],
    ]);
    return build({
      topic: 'ages', subtopic: 'three_person_ratio', pattern: 'three_person_ratio',
      tags: ['ages', 'ratio', 'three_people', 'exceeds'], difficulty: 3, time: 60,
      stem, ...o,
      steps: [
        T(`Let the ages be ${tri[0]}k, ${tri[1]}k and ${tri[2]}k.`, `বয়সগুলি ${tri[0]}k, ${tri[1]}k ও ${tri[2]}k ধরো।`),
        T(`(${tri[i]}k + ${tri[j]}k) − ${m === 2 ? `2 × ${tri[q]}k` : `${tri[q]}k`} = ${tri[i] + tri[j]}k − ${m * tri[q]}k = ${e}k = ${d}, so k = ${k}.`,
          `(${tri[i]}k + ${tri[j]}k) − ${m === 2 ? `2 × ${tri[q]}k` : `${tri[q]}k`} = ${tri[i] + tri[j]}k − ${m * tri[q]}k = ${e}k = ${d}, তাই k = ${k}।`),
        T(`Required age = ${tri[ask]} × ${k} = ${ans} years.`, `নির্ণেয় বয়স = ${tri[ask]} × ${k} = ${ans} বছর।`),
      ],
      shortcut: T('Turn the sentence into parts first (11k − 10k = k), then one part equals the stated gap.', 'বাক্যটিকে আগে অংশে বদলাও (11k − 10k = k), তারপর এক অংশই প্রদত্ত ব্যবধান।'),
    });
  }

  if (framing === 'time_shift') {
    const n = ri(2, 10);
    const ago = ri(0, 1) === 1;
    if (ago && Math.min(...ages) <= n) return null;
    const S = ages[0] + ages[1] + ages[2] + (ago ? -3 * n : 3 * n);
    const ask = ri(0, 2);
    const ans = ages[ask];
    const when = ago ? T(`${n} years ago, the sum of their ages was ${S} years.`, `${n} বছর আগে তাদের বয়সের যোগফল ছিল ${S} বছর।`)
      : T(`After ${n} years, the sum of their ages will be ${S} years.`, `${n} বছর পরে তাদের বয়সের যোগফল হবে ${S} বছর।`);
    const stem = T(
      `The present ages of ${lab(0).en}, ${lab(1).en} and ${lab(2).en} are in the ratio ${tri.join(' : ')}. ${when.en} What is the present age of ${lab(ask).en}?`,
      `${lab(0).bn}, ${lab(1).bn} ও ${of(lab(2))} বর্তমান বয়সের অনুপাত ${tri.join(' : ')}। ${when.bn} ${of(lab(ask))} বর্তমান বয়স কত?`,
    );
    const presentSum = S + (ago ? 3 * n : -3 * n);
    const o = opts(ans, [
      [(S * tri[ask]) / total, `${S} is the sum ${ago ? 'in the past' : 'in the future'}; first ${ago ? 'add' : 'subtract'} 3 × ${n} = ${3 * n} to get today's sum.`, `${S} হল ${ago ? 'অতীতের' : 'ভবিষ্যতের'} যোগফল; আজকের যোগফলের জন্য আগে 3 × ${n} = ${3 * n} ${ago ? 'যোগ' : 'বিয়োগ'} করো।`],
      [((S + (ago ? n : -n)) * tri[ask]) / total, `All three people age by ${n} years, so the sum changes by 3 × ${n}, not ${n}.`, `তিনজনেরই ${n} বছর বাড়ে, তাই যোগফল বদলায় 3 × ${n}, ${n} নয়।`],
      [ans + (ago ? -n : n), `That is ${lab(ask).en}'s age ${ago ? `${n} years ago` : `after ${n} years`}, not now.`, `এটি ${of(lab(ask))} ${ago ? `${n} বছর আগের` : `${n} বছর পরের`} বয়স, এখনকার নয়।`],
    ]);
    return build({
      topic: 'ages', subtopic: 'three_person_ratio', pattern: 'three_person_ratio',
      tags: ['ages', 'ratio', 'three_people', 'time_shift'], difficulty: 3, time: 60,
      stem, ...o,
      steps: [
        T(`Present sum = ${S} ${ago ? '+' : '−'} 3 × ${n} = ${presentSum} (each of the three ${ago ? 'has aged' : 'will age'} ${n} years).`, `বর্তমান যোগফল = ${S} ${ago ? '+' : '−'} 3 × ${n} = ${presentSum} (তিনজনেরই ${n} বছর ${ago ? 'বেড়েছে' : 'বাড়বে'})।`),
        T(`Ages ${tri[0]}k, ${tri[1]}k, ${tri[2]}k: ${total}k = ${presentSum}, so k = ${k}.`, `বয়স ${tri[0]}k, ${tri[1]}k, ${tri[2]}k: ${total}k = ${presentSum}, তাই k = ${k}।`),
        T(`${lab(ask).en} = ${tri[ask]} × ${k} = ${ans} years.`, `${lab(ask).bn} = ${tri[ask]} × ${k} = ${ans} বছর।`),
      ],
      shortcut: T('Shift the sum to today first (± 3 × years), then split it in the ratio.', 'আগে যোগফলকে আজকের দিনে আনো (± 3 × বছর), তারপর অনুপাতে ভাগ করো।'),
    });
  }

  // difference: eldest − youngest = D
  const hi = tri.indexOf(Math.max(...tri));
  const lo = tri.indexOf(Math.min(...tri));
  const D = ages[hi] - ages[lo];
  const ask = pick([0, 1, 2]);
  const ans = ages[ask];
  const stem = T(
    `${intro.en} ${lab(hi).en} is ${D} years older than ${lab(lo).en}. What is the age of ${lab(ask).en}?`,
    `${intro.bn} ${lab(hi).bn} ${of(lab(lo))} চেয়ে ${D} বছরের বড়ো। ${of(lab(ask))} বয়স কত?`,
  );
  const o = opts(ans, [
    [(D * tri[ask]) / total, `${D} is a DIFFERENCE of ${tri[hi] - tri[lo]} parts; dividing by the total ${total} parts is for a sum.`, `${D} হল ${tri[hi] - tri[lo]} অংশের অন্তর; মোট ${total} অংশ দিয়ে ভাগ করা হয় যোগফলের বেলায়।`],
    [k, `That is one part (k = ${k}); multiply it by ${tri[ask]}.`, `এটি এক অংশ (k = ${k}); একে ${tri[ask]} দিয়ে গুণ করো।`],
  ]);
  return build({
    topic: 'ages', subtopic: 'three_person_ratio', pattern: 'three_person_ratio',
    tags: ['ages', 'ratio', 'three_people', 'difference'], difficulty: 2, time: 50,
    stem, ...o,
    steps: [
      T(`Let the ages be ${tri[0]}k, ${tri[1]}k and ${tri[2]}k.`, `বয়সগুলি ${tri[0]}k, ${tri[1]}k ও ${tri[2]}k ধরো।`),
      T(`${tri[hi]}k − ${tri[lo]}k = ${tri[hi] - tri[lo]}k = ${D}, so k = ${k}.`, `${tri[hi]}k − ${tri[lo]}k = ${tri[hi] - tri[lo]}k = ${D}, তাই k = ${k}।`),
      T(`${lab(ask).en} = ${tri[ask]} × ${k} = ${ans} years.`, `${lab(ask).bn} = ${tri[ask]} × ${k} = ${ans} বছর।`),
    ],
    shortcut: T('One part = given difference ÷ difference of the ratio terms.', 'এক অংশ = প্রদত্ত অন্তর ÷ অনুপাতের পদগুলির অন্তর।'),
  });
}

module.exports = {
  subject: 'quant',
  topics: [{
    topic: 'ages',
    weight: 1,
    gens: [
      ...GAP_FRAMINGS.map((f) => () => ageGapsAndTotal(f)),
      ...RATIO_FRAMINGS.map((f) => () => threePersonRatio(f)),
    ],
  }],
  ageGapsAndTotal,
  threePersonRatio,
  GAP_FRAMINGS,
  RATIO_FRAMINGS,
  NAMES: [...NAMES_M, ...NAMES_F],
};
