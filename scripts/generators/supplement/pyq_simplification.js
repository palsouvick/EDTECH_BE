'use strict';

/**
 * Simplification: standard-level practice for the WBPSC-family PYQ types that had
 * no (or too little) same-type practice. Each generator's subtopic = pattern = a key
 * of db/patterns/quant/simplification.js; the PYQ -> pattern map lives in
 * db/patterns/pyq_map/quant/simplification.json.
 *
 * All arithmetic is exact: fractions are kept as reduced integer pairs, decimals as
 * integers over a power of ten, so stems, options and steps never show rounding noise.
 * Distractors are the real slips (dropping the fraction part, reading "of" as ×
 * left to right, going to the wrong square, losing a decimal place ...) with a trap note.
 */

const { rand, ri, pick, shuffle, gcd, T, NAMES_M, NAMES_F, build } = require('../common');

const TOPIC = 'simplification';
const MINUS = '−';

// ── exact fractions ────────────────────────────────────────────
function F(n, d = 1) {
  if (d === 0) return null;
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(Math.abs(n), d) || 1;
  return { n: n / g, d: d / g };
}
const fadd = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d);
const fsub = (a, b) => F(a.n * b.d - b.n * a.d, a.d * b.d);
const fmul = (a, b) => F(a.n * b.n, a.d * b.d);
const fdiv = (a, b) => F(a.n * b.d, a.d * b.n);
const feq = (a, b) => a.n === b.n && a.d === b.d;
const sgn = (n) => (n < 0 ? MINUS : '');
/** 7/3 -> "7/3", 4/1 -> "4". */
const fs = (f) => (f.d === 1 ? `${sgn(f.n)}${Math.abs(f.n)}` : `${sgn(f.n)}${Math.abs(f.n)}/${f.d}`);
/** 7/3 -> "2 1/3", 2/3 -> "2/3", 4 -> "4". */
function mixed(f) {
  const a = Math.abs(f.n);
  if (f.d === 1 || a < f.d) return fs(f);
  const w = Math.floor(a / f.d);
  const r = a - w * f.d;
  return r ? `${sgn(f.n)}${w} ${r}/${f.d}` : `${sgn(f.n)}${w}`;
}
/** Integer n over 10^s -> exact decimal text: dec(27, 3) = "0.027", dec(-5, 1) = "−0.5". */
function dec(n, s) {
  const neg = n < 0;
  let str = String(Math.abs(n)).padStart(s + 1, '0');
  if (s > 0) str = `${str.slice(0, -s)}.${str.slice(-s)}`.replace(/\.?0+$/, '');
  return (neg ? MINUS : '') + str;
}
const same = (s) => T(s, s);

/** Options from exact values. hints = [[value, trapEn, trapBn]]; fillers have no trap. */
function opts(ans, fmt, hints = [], fillers = [], key = (v) => fmt(v)) {
  const seen = new Set([key(ans)]);
  const wrong = [];
  const add = (v, trap) => {
    if (v === null || v === undefined || wrong.length >= 3) return;
    const k = key(v);
    if (k === null || seen.has(k)) return;
    seen.add(k);
    const txt = fmt(v);
    wrong.push(typeof txt === 'string' ? { ...same(txt), ...(trap && { trap }) } : { ...txt, ...(trap && { trap }) });
  };
  for (const [v, en, bn] of hints) add(v, T(en, bn));
  for (const v of shuffle(fillers)) add(v);
  if (wrong.length < 3) return null;
  const c = fmt(ans);
  return { correct: typeof c === 'string' ? same(c) : c, wrong };
}

const pos = (f) => f && f.n > 0;

// ── 1. fraction_word_problem ───────────────────────────────────
const ABSENT_CTX = [
  { a: T('girls', 'ছাত্রী'), b: T('boys', 'ছাত্র'), w: T('students', 'ছাত্রছাত্রী'), wg: 'ছাত্রছাত্রীর', place: T('In a class', 'একটি ক্লাসে') },
  { a: T('women', 'মহিলা'), b: T('men', 'পুরুষ'), w: T('employees', 'কর্মী'), wg: 'কর্মীর', place: T('In an office', 'একটি অফিসে') },
  { a: T('ladies', 'মহিলা সদস্য'), b: T('gentlemen', 'পুরুষ সদস্য'), w: T('members', 'সদস্য'), wg: 'সদস্যদের', place: T('In a club', 'একটি ক্লাবে') },
];
const CONTAINERS = [
  { cg: 'ট্যাঙ্কের', c: T('tank', 'ট্যাঙ্ক'), s: T('water', 'জল'), u: T('litres', 'লিটার') },
  { cg: 'ড্রামের', c: T('drum', 'ড্রাম'), s: T('oil', 'তেল'), u: T('litres', 'লিটার') },
  { cg: 'বস্তার', c: T('sack', 'বস্তা'), s: T('rice', 'চাল'), u: T('kg', 'কেজি') },
  { cg: 'বয়ামের', c: T('jar', 'বয়াম'), s: T('sugar', 'চিনি'), u: T('kg', 'কেজি') },
];
const LIKES = [
  [T('rice', 'ভাত'), T('chapati', 'রুটি'), T('like to eat', 'খেতে ভালোবাসে')],
  [T('tea', 'চা'), T('coffee', 'কফি'), T('like to drink', 'পান করতে ভালোবাসে')],
  [T('cricket', 'ক্রিকেট'), T('football', 'ফুটবল'), T('like to play', 'খেলতে ভালোবাসে')],
  [T('Bengali films', 'বাংলা সিনেমা'), T('Hindi films', 'হিন্দি সিনেমা'), T('like to watch', 'দেখতে ভালোবাসে')],
];
const FW_KINDS = ['absent', 'tank', 'which_sum', 'both', 'income', 'income_rest'];

function fractionWordProblem(kind = pick(FW_KINDS)) {
  let stem; let ans; let fmt = fs; let hints = []; let fillers = []; let steps; let shortcut; let diff = 3;
  const near = (f) => [F(f.n + 1, f.d), F(f.n - 1, f.d), F(f.n + 2, f.d), F(f.n, f.d + 1), F(f.n + 1, f.d + 1)].filter((x) => x && x.n > 0 && x.n < x.d);

  if (kind === 'absent') {
    const q = pick([3, 4, 5, 7, 8]); const p = ri(1, q - 1); const pa = F(p, q); const pb = F(q - p, q);
    const a = F(ri(1, 4), pick([3, 4, 5, 6, 7, 9])); const b = F(ri(1, 4), pick([3, 4, 5, 6, 8, 9]));
    if (!pa || pa.d !== q || a.n >= a.d || b.n >= b.d || feq(a, b)) return null;
    const absent = fadd(fmul(pa, a), fmul(pb, b));
    const present = fsub(F(1), absent);
    if (absent.d > 90) return null;
    const askPresent = rand() < 0.7;
    ans = askPresent ? present : absent;
    const ctx = pick(ABSENT_CTX);
    const word = askPresent ? T('present', 'উপস্থিত') : T('absent', 'অনুপস্থিত');
    stem = T(`${ctx.place.en}, ${fs(pa)} of the ${ctx.w.en} are ${ctx.a.en} and the rest are ${ctx.b.en}. If ${fs(a)} of the ${ctx.a.en} and ${fs(b)} of the ${ctx.b.en} are absent, what part of the total number of ${ctx.w.en} is ${word.en}?`,
      `${ctx.place.bn} মোট ${ctx.wg} ${fs(pa)} অংশ ${ctx.a.bn}, বাকিরা ${ctx.b.bn}। ${ctx.a.bn}দের ${fs(a)} অংশ ও ${ctx.b.bn}দের ${fs(b)} অংশ অনুপস্থিত হলে মোট ${ctx.wg} কত অংশ ${word.bn}?`);
    const naive = fadd(a, b);
    const swapped = fadd(fmul(pa, b), fmul(pb, a));
    hints = [
      [askPresent ? absent : present, `That is the ${askPresent ? 'absent' : 'present'} part; the question asks for the ${word.en} part.`, `এটা ${askPresent ? 'অনুপস্থিত' : 'উপস্থিত'} অংশ; প্রশ্নে ${word.bn} অংশ চাওয়া হয়েছে।`],
      [askPresent ? (naive.n < naive.d ? fsub(F(1), naive) : null) : (naive.n < naive.d ? naive : null), `${fs(a)} and ${fs(b)} are fractions of each group, not of the whole — multiply by each group's share first.`, `${fs(a)} ও ${fs(b)} প্রতিটি দলের ভগ্নাংশ, পুরোর নয় — আগে দলের অংশ দিয়ে গুণ করো।`],
      [askPresent ? fsub(F(1), swapped) : swapped, `The two fractions were applied to the wrong groups.`, `ভগ্নাংশ দুটো উল্টো দলে বসানো হয়েছে।`],
    ];
    fillers = near(ans);
    steps = [
      T(`${ctx.b.en} = 1 ${MINUS} ${fs(pa)} = ${fs(pb)} of all.`, `${ctx.b.bn} = 1 ${MINUS} ${fs(pa)} = মোটের ${fs(pb)} অংশ।`),
      T(`Absent = ${fs(pa)} × ${fs(a)} + ${fs(pb)} × ${fs(b)} = ${fs(fmul(pa, a))} + ${fs(fmul(pb, b))} = ${fs(absent)}.`, `অনুপস্থিত = ${fs(pa)} × ${fs(a)} + ${fs(pb)} × ${fs(b)} = ${fs(fmul(pa, a))} + ${fs(fmul(pb, b))} = ${fs(absent)}।`),
      askPresent ? T(`Present = 1 ${MINUS} ${fs(absent)} = ${fs(present)}.`, `উপস্থিত = 1 ${MINUS} ${fs(absent)} = ${fs(present)}।`) : T(`So the absent part is ${fs(absent)}.`, `অতএব অনুপস্থিত অংশ ${fs(absent)}।`),
    ];
    shortcut = T(`Take the total as the LCM of the denominators: every group becomes a whole number.`, `মোটকে হরগুলোর ল.সা.গু. ধরো: প্রতিটি দল পূর্ণসংখ্যা হয়ে যাবে।`);
  } else if (kind === 'tank') {
    const ctx = pick(CONTAINERS);
    const part = pick([F(1, 2), F(1, 3), F(1, 4), F(1, 5), F(2, 3), F(3, 4), F(2, 5), F(3, 5), F(1, 6)]);
    const cap = ri(4, 60) * part.d * 5;
    const held = (cap * part.n) / part.d;
    const full = pick([F(1, 3), F(2, 3), F(1, 4), F(3, 4), F(2, 5), F(3, 5), F(4, 5), F(1, 6), F(5, 6), F(3, 8), F(5, 8), F(1, 2)]);
    const w = (cap * full.n) / full.d;
    if (!Number.isInteger(w) || !Number.isInteger(held) || w === held) return null;
    ans = full;
    stem = T(`${fs(part)} of a ${ctx.c.en} holds ${held} ${ctx.u.en} of ${ctx.s.en}. What part of the ${ctx.c.en} is full if it contains ${w} ${ctx.u.en} of ${ctx.s.en}?`,
      `একটি ${ctx.cg} ${fs(part)} অংশে ${held} ${ctx.u.bn} ${ctx.s.bn} ধরে। ${ctx.c.bn}টিতে ${w} ${ctx.u.bn} ${ctx.s.bn} থাকলে তার কত অংশ ভর্তি?`);
    hints = [
      [F(held, w), `That is ${held}/${w}, the ratio turned upside down.`, `এটা ${held}/${w} — অনুপাত উল্টে গেছে।`],
      [fmul(F(w, held), F(part.d, part.n)), `Dividing by ${fs(part)} instead of multiplying (or the other way round).`, `${fs(part)} দিয়ে গুণের বদলে ভাগ (বা উল্টোটা) করা হয়েছে।`],
      [F(w - held, cap), `Only the extra ${w - held} ${ctx.u.en} was counted.`, `শুধু বাড়তি ${w - held} ${ctx.u.bn} ধরা হয়েছে।`],
    ].filter(([v]) => v && v.n < v.d && v.n > 0);
    fillers = near(ans);
    steps = [
      T(`Full ${ctx.c.en} = ${held} ÷ ${fs(part)} = ${cap} ${ctx.u.en}.`, `পুরো ${ctx.c.bn} = ${held} ÷ ${fs(part)} = ${cap} ${ctx.u.bn}।`),
      T(`Part full = ${w}/${cap} = ${fs(full)}.`, `ভর্তি অংশ = ${w}/${cap} = ${fs(full)}।`),
    ];
    shortcut = T(`Part full = ${fs(part)} × ${w}/${held} — scale the known part directly.`, `ভর্তি অংশ = ${fs(part)} × ${w}/${held} — জানা অংশকে সরাসরি অনুপাতে বাড়াও।`);
    diff = 2;
  } else if (kind === 'which_sum') {
    const m = pick([F(5, 12), F(3, 8), F(2, 3), F(3, 4), F(4, 5), F(5, 6), F(3, 5), F(7, 12), F(5, 8)]);
    const mult = F(ri(1, 6) * 4 + pick([1, 2, 3]), 4); // A 1/4, A 1/2, A 3/4
    const alt = rand() < 0.4 ? F(ri(2, 7) * 3 + pick([1, 2]), 3) : mult;
    const N = pick([100, 200, 300, 120, 240, 60, 80, 160, 400]);
    const right = fmul(alt, F(N));
    const x = fdiv(right, m);
    if (x.d !== 1 || right.d !== 1 || x.n > 20000) return null;
    ans = x;
    fmt = (v) => (v.d === 1 ? `₹ ${v.n}` : null);
    const key = (v) => (v.d === 1 ? String(v.n) : null);
    stem = T(`${fs(m)} of which sum is equal to ${mixed(alt)} times ₹ ${N}?`, `কোন টাকার ${fs(m)} অংশ ₹ ${N}-এর ${mixed(alt)} গুণের সমান?`);
    const wh = Math.floor(alt.n / alt.d);
    hints = [
      [fmul(right, m), `Multiplied by ${fs(m)}; to undo “${fs(m)} of”, divide by it.`, `${fs(m)} দিয়ে গুণ করা হয়েছে; “${fs(m)} অংশ” উল্টাতে ভাগ করতে হয়।`],
      [fdiv(fmul(fsub(alt, F(wh)), F(N)), m), `The whole part ${wh} of ${mixed(alt)} was dropped.`, `${mixed(alt)}-এর পূর্ণ অংশ ${wh} বাদ পড়েছে।`],
      [right, `₹ ${right.n} is only ${mixed(alt)} × ${N}; it equals ${fs(m)} of the sum, not the sum itself.`, `₹ ${right.n} শুধু ${mixed(alt)} × ${N}; এটা টাকার ${fs(m)} অংশ, পুরো টাকা নয়।`],
    ];
    fillers = [x.n + 50, x.n - 50, x.n + 100, x.n - 100, x.n + 25].filter((v) => v > 0).map((v) => F(v));
    steps = [
      T(`${mixed(alt)} × ${N} = ${fs(alt)} × ${N} = ${right.n}.`, `${mixed(alt)} × ${N} = ${fs(alt)} × ${N} = ${right.n}।`),
      T(`${fs(m)} of the sum = ${right.n}, so the sum = ${right.n} ÷ ${fs(m)} = ${right.n} × ${m.d}/${m.n} = ₹ ${x.n}.`, `টাকার ${fs(m)} অংশ = ${right.n}, তাই টাকা = ${right.n} ÷ ${fs(m)} = ${right.n} × ${m.d}/${m.n} = ₹ ${x.n}।`),
    ];
    shortcut = T(`Sum = (value) × ${m.d}/${m.n}: divide by the fraction by flipping it.`, `টাকা = (মান) × ${m.d}/${m.n}: ভগ্নাংশ দিয়ে ভাগ মানে উল্টে গুণ।`);
    return finish('fraction_word_problem', kind, 2, 60, stem, opts(ans, fmt, hints, fillers, key), steps, shortcut);
  } else if (kind === 'both') {
    const [X, Y, verb] = pick(LIKES);
    const d = pick([5, 6, 8, 10, 12]);
    const a = F(ri(1, d - 2), d); const b = F(ri(1, d - 2), d);
    const both = fsub(fsub(F(1), a), b);
    if (!pos(both) || feq(a, b)) return null;
    const N = d * ri(3, 8);
    const askNum = rand() < 0.4;
    ans = askNum ? F((N * both.n) / both.d) : both;
    stem = T(`In a group of ${N} people, ${fs(a)} ${verb.en} ${X.en} only, ${fs(b)} ${verb.en} ${Y.en} only and the remaining people ${verb.en} both. ${askNum ? 'How many people' : 'What fraction of the group'} ${verb.en} both?`,
      `${N} জনের একটি দলে ${fs(a)} অংশ শুধু ${X.bn} ${verb.bn}, ${fs(b)} অংশ শুধু ${Y.bn} ${verb.bn}, আর বাকিরা দুটোই ${verb.bn}। ${askNum ? 'কতজন' : 'দলের কত অংশ'} দুটোই ${verb.bn}?`);
    const sc = (f) => (askNum ? F((N * f.n) / f.d) : f);
    hints = [
      [sc(fadd(a, b)), 'That is the part who like only one of the two.', 'এটা যারা দুটোর মধ্যে শুধু একটি পছন্দ করে তাদের অংশ।'],
      [sc(fsub(F(1), a)), `Only ${fs(a)} was taken away; ${fs(b)} must go too.`, `শুধু ${fs(a)} বাদ দেওয়া হয়েছে; ${fs(b)}-ও বাদ দিতে হবে।`],
    ].filter(([v]) => v && v.d === 1 ? v.n > 0 : v.n > 0 && v.n < v.d);
    fillers = askNum ? [ans.n + 1, ans.n - 1, ans.n + 2, ans.n + d, ans.n - 2].filter((v) => v > 0).map((v) => F(v)) : near(ans);
    steps = [
      T(`Only one = ${fs(a)} + ${fs(b)} = ${fs(fadd(a, b))}.`, `শুধু একটি = ${fs(a)} + ${fs(b)} = ${fs(fadd(a, b))}।`),
      T(`Both = 1 ${MINUS} ${fs(fadd(a, b))} = ${fs(both)}${askNum ? `; ${fs(both)} of ${N} = ${ans.n}` : ''}.`, `দুটোই = 1 ${MINUS} ${fs(fadd(a, b))} = ${fs(both)}${askNum ? `; ${N}-এর ${fs(both)} = ${ans.n}` : ''}।`),
    ];
    shortcut = T('“Only X” and “only Y” do not overlap, so both = 1 − (only X + only Y).', '“শুধু X” ও “শুধু Y” আলাদা, তাই দুটোই = 1 − (শুধু X + শুধু Y)।');
    diff = 2;
  } else {
    const rest = kind === 'income_rest';
    const a = pick([F(1, 3), F(1, 4), F(2, 5), F(1, 5), F(3, 8), F(1, 2), F(2, 7), F(3, 10)]);
    const b = pick([F(1, 3), F(1, 4), F(2, 5), F(1, 5), F(1, 6), F(3, 10), F(1, 8)]);
    const left = rest ? fmul(fsub(F(1), a), fsub(F(1), b)) : fsub(fsub(F(1), a), b);
    if (!pos(left)) return null;
    const I = left.d * ri(2, 40) * 100;
    const S = (I * left.n) / left.d;
    if (!Number.isInteger(S) || I > 200000) return null;
    ans = F(I);
    const male = rand() < 0.5;
    const P = pick(male ? NAMES_M : NAMES_F);
    const his = male ? 'his' : 'her'; const He = male ? 'He' : 'She';
    fmt = (v) => (v.d === 1 && v.n > 0 ? `₹ ${v.n}` : null);
    const key = (v) => (v.d === 1 ? String(v.n) : null);
    stem = rest
      ? T(`${P.en} spends ${fs(a)} of ${his} monthly income on food and ${fs(b)} of the remaining on rent. ${He} saves the rest, which is ₹ ${S}. What is ${his} monthly income?`,
        `${P.bn} মাসিক আয়ের ${fs(a)} অংশ খাবারে এবং বাকি টাকার ${fs(b)} অংশ বাড়িভাড়ায় খরচ করে। বাকি ₹ ${S} সে জমায়। তার মাসিক আয় কত?`)
      : T(`${P.en} spends ${fs(a)} of ${his} monthly income on food and ${fs(b)} of it on rent, and saves ₹ ${S}. What is ${his} monthly income?`,
        `${P.bn} মাসিক আয়ের ${fs(a)} অংশ খাবারে এবং ${fs(b)} অংশ বাড়িভাড়ায় খরচ করে, আর ₹ ${S} জমায়। তার মাসিক আয় কত?`);
    const wrongLeft = rest ? fsub(fsub(F(1), a), b) : fmul(fsub(F(1), a), fsub(F(1), b));
    hints = [
      [pos(wrongLeft) ? fdiv(F(S), wrongLeft) : null, rest ? `${fs(b)} is of the REMAINING money, not of the income.` : `Both fractions are of the income; do not take ${fs(b)} of the remainder.`, rest ? `${fs(b)} হল বাকি টাকার অংশ, পুরো আয়ের নয়।` : `দুটো ভগ্নাংশই আয়ের অংশ; বাকি টাকার ${fs(b)} নিও না।`],
      [fmul(F(S), left), `Multiplied the savings by ${fs(left)} instead of dividing.`, `জমাকে ${fs(left)} দিয়ে ভাগের বদলে গুণ করা হয়েছে।`],
    ].filter(([v]) => v && v.d === 1);
    fillers = [I + 100 * left.d, I - 100 * left.d, I + 200 * left.d, I + 500, I - 500].filter((v) => v > 0).map((v) => F(v));
    steps = [
      rest
        ? T(`After food, 1 ${MINUS} ${fs(a)} = ${fs(fsub(F(1), a))} is left; after rent, ${fs(fsub(F(1), a))} × ${fs(fsub(F(1), b))} = ${fs(left)} of the income is left.`, `খাবারের পর বাকি 1 ${MINUS} ${fs(a)} = ${fs(fsub(F(1), a))}; ভাড়ার পর বাকি ${fs(fsub(F(1), a))} × ${fs(fsub(F(1), b))} = আয়ের ${fs(left)} অংশ।`)
        : T(`Spent = ${fs(a)} + ${fs(b)} = ${fs(fadd(a, b))}, so saved = ${fs(left)} of the income.`, `খরচ = ${fs(a)} + ${fs(b)} = ${fs(fadd(a, b))}, তাই জমা = আয়ের ${fs(left)} অংশ।`),
      T(`${fs(left)} of income = ₹ ${S}, so income = ${S} × ${left.d}/${left.n} = ₹ ${I}.`, `আয়ের ${fs(left)} অংশ = ₹ ${S}, তাই আয় = ${S} × ${left.d}/${left.n} = ₹ ${I}।`),
    ];
    shortcut = T('Find the fraction saved, then income = savings ÷ that fraction.', 'জমার ভগ্নাংশ বের করো, তারপর আয় = জমা ÷ সেই ভগ্নাংশ।');
    return finish('fraction_word_problem', kind, 3, 75, stem, opts(ans, fmt, hints, fillers, key), steps, shortcut);
  }
  return finish('fraction_word_problem', kind, diff, diff === 2 ? 60 : 75, stem, opts(ans, fmt, hints, fillers, (v) => (v && v.n > 0 ? fmt(v) : null)), steps, shortcut);
}

function finish(pattern, framing, difficulty, time, stem, options, steps, shortcut) {
  if (!options || !options.wrong.some((w) => w.trap)) return null;
  return build({ topic: TOPIC, subtopic: pattern, pattern, tags: [pattern, framing], difficulty, time, stem, ...options, steps, shortcut });
}

// ── 2. near_whole_mixed_multiply ───────────────────────────────
const NW_KINDS = ['own', 'own', 'factor'];
function nearWholeMixed(kind = pick(NW_KINDS)) {
  const A = pick([99, 999, 9999, 199, 499, 899, 998, 9998, 99, 999]);
  if (kind === 'own') {
    const d = rand() < 0.5 ? A : pick([99, 999, 101, 125, 49, 19, 199, 999]);
    const r = ri(Math.ceil(d / 2), d - 1);
    if (gcd(r, d) !== 1) return null;
    const ans = A * d + r;
    const q = T(`The value of ${A} ${r}/${d} × ${d} is`, `${A} ${r}/${d} × ${d}-এর মান`);
    const options = opts(ans, String, [
      [A * d, `${A} × ${d} is only the whole part; ${r}/${d} × ${d} = ${r} must be added.`, `${A} × ${d} শুধু পূর্ণ অংশ; ${r}/${d} × ${d} = ${r} যোগ করতে হবে।`],
      [(A + 1) * d - r, `Rounding up to ${A + 1} you must take away ${d} ${MINUS} ${r} = ${d - r}, not ${r}.`, `${A + 1} ধরে নিলে ${d} ${MINUS} ${r} = ${d - r} বাদ দিতে হয়, ${r} নয়।`],
      [A * d - r, 'The fraction part adds; it is not subtracted.', 'ভগ্নাংশ অংশ যোগ হয়, বিয়োগ নয়।'],
    ], [ans + 1, ans - 1, ans + 10, ans + d]);
    const big = /^9+$/.test(String(d)) ? T(`${A} × ${d} = ${A} × ${d + 1} ${MINUS} ${A} = ${A * d}.`, `${A} × ${d} = ${A} × ${d + 1} ${MINUS} ${A} = ${A * d}।`) : T(`${A} × ${d} = ${A * d}.`, `${A} × ${d} = ${A * d}।`);
    return finish('near_whole_mixed_multiply', kind, 2, 50, q, options, [
      T(`Split the mixed number: ${A} ${r}/${d} × ${d} = ${A} × ${d} + ${r}/${d} × ${d} = ${A} × ${d} + ${r}.`, `মিশ্র ভগ্নাংশ ভেঙে: ${A} ${r}/${d} × ${d} = ${A} × ${d} + ${r}/${d} × ${d} = ${A} × ${d} + ${r}।`),
      big,
      T(`Add the numerator: ${A * d} + ${r} = ${ans}.`, `লব যোগ করে: ${A * d} + ${r} = ${ans}।`),
    ], T('(A + r/d) × d = A × d + r — never convert to an improper fraction.', '(A + r/d) × d = A × d + r — অপ্রকৃত ভগ্নাংশে বদলাবে না।'));
  }
  // factor: p/k + A r/d × m with d = m·k
  const m = pick([9, 99, 999, 11, 25, 49]);
  const k = pick([2, 3, 4, 5, 6, 8]);
  const d = m * k;
  const r = ri(Math.ceil(d / 2), d - 1);
  const rm = r % k;
  if (!rm || gcd(r, d) !== 1) return null;
  const p = k - rm;
  const frac = F(p, k);
  const ans = A * m + (r + p) / k;
  const stem = T(`The value of ${fs(frac)} + ${A} ${r}/${d} × ${m} is`, `${fs(frac)} + ${A} ${r}/${d} × ${m}-এর মান`);
  const options = opts(ans, String, [
    [A * m, `The fraction part ${r}/${d} × ${m} = ${fs(F(r, k))} was dropped.`, `ভগ্নাংশ অংশ ${r}/${d} × ${m} = ${fs(F(r, k))} বাদ পড়েছে।`],
    [A * m + r, `${r}/${d} × ${m} is ${fs(F(r, k))}, not ${r}: the ${d} only cancels the ${m} partly.`, `${r}/${d} × ${m} হল ${fs(F(r, k))}, ${r} নয়: ${d} পুরোটা ${m} দিয়ে কাটে না।`],
    [(A + 1) * m, `Rounding ${A} ${r}/${d} up to ${A + 1} is only approximate.`, `${A} ${r}/${d}-কে ${A + 1} ধরা শুধু আসন্ন মান।`],
  ], [ans + 1, ans - 1, ans * 10, ans + 100]);
  return finish('near_whole_mixed_multiply', kind, 3, 75, stem, options, [
    T(`${A} ${r}/${d} × ${m} = ${A} × ${m} + ${r}/${d} × ${m} = ${A * m} + ${r}/${k}.`, `${A} ${r}/${d} × ${m} = ${A} × ${m} + ${r}/${d} × ${m} = ${A * m} + ${r}/${k}।`),
    T(`${r}/${k} + ${p}/${k} = ${(r + p) / k}.`, `${r}/${k} + ${p}/${k} = ${(r + p) / k}।`),
    T(`Total = ${A * m} + ${(r + p) / k} = ${ans}.`, `মোট = ${A * m} + ${(r + p) / k} = ${ans}।`),
  ], T(`Split the mixed number; ${d} = ${m} × ${k}, so the fraction part becomes ${r}/${k}.`, `মিশ্র ভগ্নাংশ ভাঙো; ${d} = ${m} × ${k}, তাই ভগ্নাংশ অংশ হয় ${r}/${k}।`));
}

// ── 3. symbol_operations ───────────────────────────────────────
const OPS = { '+': (a, b) => fadd(a, b), [MINUS]: (a, b) => fsub(a, b), '×': (a, b) => fmul(a, b), '÷': (a, b) => fdiv(a, b) };
const OP_WORD = { '+': T('plus', 'যোগ'), [MINUS]: T('minus', 'বিয়োগ'), '×': T('multiplied by', 'গুণ'), '÷': T('divided by', 'ভাগ') };
/** BODMAS over a flat token list [n, op, n, op, n ...] of fractions; null on ÷0. */
function bodmas(nums, ops) {
  const ns = [nums[0]]; const os = [];
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === '×' || ops[i] === '÷') {
      if (ops[i] === '÷' && nums[i + 1].n === 0) return null;
      ns[ns.length - 1] = OPS[ops[i]](ns[ns.length - 1], nums[i + 1]);
    } else { os.push(ops[i]); ns.push(nums[i + 1]); }
  }
  let v = ns[0];
  for (let i = 0; i < os.length; i++) v = OPS[os[i]](v, ns[i + 1]);
  return v;
}
function leftToRight(nums, ops) {
  let v = nums[0];
  for (let i = 0; i < ops.length; i++) { if (ops[i] === '÷' && nums[i + 1].n === 0) return null; v = OPS[ops[i]](v, nums[i + 1]); }
  return v;
}
const SYMBOL_SETS = [['<', '>', '=', '@'], ['P', 'Q', 'R', 'S'], ['+', MINUS, '×', '÷'], ['#', '&', '@', '~']];
const SO_KINDS = ['meaning', 'meaning', 'swap_numbers', 'swap_signs', 'defined', 'defined'];
const DEFINED = [
  { en: 'a * b = ab + a − b', f: (a, b) => a * b + a - b },
  { en: 'a * b = ab + b − a', f: (a, b) => a * b + b - a },
  { en: 'a * b = a + b + ab', f: (a, b) => a + b + a * b },
  { en: 'a * b = 2a + 3b', f: (a, b) => 2 * a + 3 * b },
  { en: 'a * b = a² − b', f: (a, b) => a * a - b },
  { en: 'a * b = a + b if a < b, a * b = a − b if a > b, and a * b = 2a if a = b', f: (a, b) => (a < b ? a + b : a > b ? a - b : 2 * a) },
];

function symbolOperations(kind = pick(SO_KINDS)) {
  const isInt = (f) => f && f.d === 1;
  if (kind === 'meaning') {
    const set = pick(SYMBOL_SETS);
    const real = ['+', MINUS, '×', '÷'];
    let perm;
    do perm = shuffle(real); while (set[0] === '+' && perm.some((p, i) => p === set[i]));
    const meaning = Object.fromEntries(set.map((s, i) => [s, perm[i]]));
    const nOps = pick([3, 3, 4]);
    const useSyms = shuffle(set).slice(0, nOps);
    const ops = useSyms.map((s) => meaning[s]);
    const nums = [];
    for (let i = 0; i <= nOps; i++) nums.push(ri(2, 30));
    for (let i = 0; i < nOps; i++) if (ops[i] === '÷') { const dv = ri(2, 9); nums[i + 1] = dv; nums[i] = dv * ri(2, 12); }
    for (let i = 0; i < nOps; i++) if (ops[i] === '÷' && i > 0 && ops[i - 1] === '×') return null;
    const fr = nums.map((n) => F(n));
    const v = bodmas(fr, ops);
    if (!isInt(v) || v.n <= 0 || v.n > 999) return null;
    const ltr = leftToRight(fr, ops);
    const face = set[0] === '+' ? bodmas(fr, useSyms) : null;
    const flip = { '×': '÷', '÷': '×', '+': MINUS, [MINUS]: '+' };
    const mixedUp = bodmas(fr, ops.map((o) => (o === '×' || o === '÷' ? flip[o] : o)));
    const pmUp = bodmas(fr, ops.map((o) => (o === '+' || o === MINUS ? flip[o] : o)));
    const expr = nums.map((n, i) => (i < nOps ? `${n} ${useSyms[i]} ` : `${n}`)).join('');
    const defs = set.map((s) => `‘${s}’ means ‘${OP_WORD[meaning[s]].en}’`);
    const defsBn = set.map((s) => `‘${s}’ মানে ‘${OP_WORD[meaning[s]].bn}’`);
    const stem = T(`If ${defs.slice(0, -1).join(', ')} and ${defs[3]}, then what is the value of ${expr}?`, `যদি ${defsBn.slice(0, -1).join(', ')} এবং ${defsBn[3]} হয়, তবে ${expr}-এর মান কত?`);
    const decoded = nums.map((n, i) => (i < nOps ? `${n} ${ops[i]} ` : `${n}`)).join('');
    const options = opts(v.n, String, [
      [isInt(ltr) && ltr.n > 0 ? ltr.n : null, 'Worked strictly left to right; after decoding, ÷ and × still come before + and −.', 'শুধু বাঁ দিক থেকে ডান দিকে করা হয়েছে; চিহ্ন বদলের পরেও ÷ ও × আগে।'],
      [isInt(face) && face.n > 0 ? face.n : null, 'The signs were read at face value instead of with their new meanings.', 'চিহ্নগুলোর নতুন মানে না নিয়ে চোখে দেখা মানে নেওয়া হয়েছে।'],
      [isInt(mixedUp) && mixedUp.n > 0 ? mixedUp.n : null, 'The meanings of ‘multiplied by’ and ‘divided by’ were mixed up while decoding.', 'চিহ্ন বদলানোর সময় ‘গুণ’ আর ‘ভাগ’-এর মানে গুলিয়ে গেছে।'],
      [isInt(pmUp) && pmUp.n > 0 ? pmUp.n : null, 'The meanings of ‘plus’ and ‘minus’ were mixed up while decoding.', 'চিহ্ন বদলানোর সময় ‘যোগ’ আর ‘বিয়োগ’-এর মানে গুলিয়ে গেছে।'],
    ], [v.n + 1, v.n - 1, v.n + 2, v.n + 6, v.n - 3, v.n + 10].filter((x) => x > 0));
    return finish('symbol_operations', kind, 2, 60, stem, options, [
      T(`Decode: ${decoded}.`, `চিহ্ন বদলে: ${decoded}।`),
      T(`BODMAS: ÷ and × first, then + and −, giving ${v.n}.`, `BODMAS: আগে ÷ ও ×, তারপর + ও −; মান ${v.n}।`),
    ], T('Write the decoded line first, then simplify it like any BODMAS sum.', 'আগে বদলানো লাইনটা লেখো, তারপর সাধারণ BODMAS-এর মতো সরল করো।'));
  }
  if (kind === 'swap_numbers') {
    // a × b ÷ c + d − e = V, true after swapping two of the shown numbers
    const ops = shuffle(['×', '÷', '+', MINUS]);
    const nums = Array.from({ length: 5 }, () => ri(2, 20));
    if (new Set(nums).size !== 5) return null;
    const fr = nums.map((n) => F(n));
    const V = bodmas(fr, ops);
    if (!isInt(V) || V.n < 0) return null;
    const [i, j] = shuffle([0, 1, 2, 3, 4]).slice(0, 2);
    const shown = nums.slice(); [shown[i], shown[j]] = [shown[j], shown[i]];
    const works = (x, y) => { const s = shown.slice(); [s[x], s[y]] = [s[y], s[x]]; const r = bodmas(s.map((n) => F(n)), ops); return r && feq(r, V); };
    const pairs = [];
    for (let x = 0; x < 5; x++) for (let y = x + 1; y < 5; y++) pairs.push([x, y]);
    if (pairs.filter(([x, y]) => works(x, y)).length !== 1) return null;
    const label = ([x, y]) => { const [p, q] = [shown[x], shown[y]].sort((m, n) => m - n); return `${p}, ${q}`; };
    const correct = label([i, j].sort());
    const wrongPairs = shuffle(pairs.filter(([x, y]) => !works(x, y))).slice(0, 3).map(label);
    const expr = shown.map((n, k) => (k < 4 ? `${n} ${ops[k]} ` : `${n}`)).join('');
    const stem = T(`Which of the following interchanges of numbers would make the given equation correct? ${expr} = ${V.n}`, `নিচের কোন দুটি সংখ্যা অদলবদল করলে প্রদত্ত সমীকরণটি সঠিক হবে? ${expr} = ${V.n}`);
    const fixed = nums.map((n, k) => (k < 4 ? `${n} ${ops[k]} ` : `${n}`)).join('');
    const options = { correct: same(correct), wrong: wrongPairs.map((w, k) => ({ ...same(w), ...(k === 0 && { trap: T('Check it: after this swap the two sides are still unequal (do ÷ and × first).', 'বসিয়ে দেখো: এই অদলবদলের পরেও দুই দিক সমান হয় না (আগে ÷ ও ×)।') }) })) };
    if (options.wrong.length < 3) return null;
    return finish('symbol_operations', kind, 3, 90, stem, options, [
      T(`Interchange ${correct}: ${fixed}.`, `${correct} অদলবদল করলে: ${fixed}।`),
      T(`BODMAS (÷, × first): the left side = ${V.n}, which matches the right side.`, `BODMAS (আগে ÷, ×): বাঁ দিক = ${V.n}, ডান দিকের সমান।`),
      T('Every other pair leaves the two sides unequal.', 'অন্য কোনো জোড়ায় দুই দিক সমান হয় না।'),
    ], T('Try the options one by one, doing ÷ and × first each time; stop when both sides match.', 'বিকল্পগুলো একে একে বসাও, প্রতিবার আগে ÷ ও ×; দুই দিক মিললেই থামো।'));
  }
  if (kind === 'swap_signs') {
    const ops = shuffle(['×', '÷', '+', MINUS]);
    const nums = Array.from({ length: 5 }, () => ri(2, 15));
    const fr = nums.map((n) => F(n));
    const V = bodmas(fr, ops);
    if (!isInt(V) || V.n < 0) return null;
    const [i, j] = shuffle([0, 1, 2, 3]).slice(0, 2);
    const shownOps = ops.slice(); [shownOps[i], shownOps[j]] = [shownOps[j], shownOps[i]];
    const swapAll = (a, b) => shownOps.map((o) => (o === a ? b : o === b ? a : o));
    const SIGN_PAIRS = [['+', '×'], ['+', '÷'], ['+', MINUS], [MINUS, '×'], [MINUS, '÷'], ['×', '÷']];
    const works = ([a, b]) => { const r = bodmas(fr, swapAll(a, b)); return r && feq(r, V); };
    if (SIGN_PAIRS.filter(works).length !== 1) return null;
    const lab = ([a, b]) => T(`${a} and ${b}`, `${a} ও ${b}`);
    const right = SIGN_PAIRS.find(works);
    const wrong = shuffle(SIGN_PAIRS.filter((p) => !works(p))).slice(0, 3).map(lab);
    const expr = nums.map((n, k) => (k < 4 ? `${n} ${shownOps[k]} ` : `${n}`)).join('');
    const stem = T(`Which two signs should be interchanged to make the following equation correct? ${expr} = ${V.n}`, `নিচের সমীকরণটি সঠিক করতে কোন দুটি চিহ্ন অদলবদল করতে হবে? ${expr} = ${V.n}`);
    const fixed = nums.map((n, k) => (k < 4 ? `${n} ${ops[k]} ` : `${n}`)).join('');
    wrong[0] = { ...wrong[0], trap: T('After this interchange the sides do not match — remember ÷ and × are done before + and −.', 'এই অদলবদলের পরে দুই দিক মেলে না — মনে রেখো ÷ ও × আগে, + ও − পরে।') };
    return finish('symbol_operations', kind, 3, 90, stem, { correct: lab(right), wrong }, [
      T(`Interchange ${right[0]} and ${right[1]}: ${fixed}.`, `${right[0]} ও ${right[1]} অদলবদল করলে: ${fixed}।`),
      T(`BODMAS gives ${V.n} on the left, equal to the right side.`, `BODMAS করে বাঁ দিকে ${V.n}, যা ডান দিকের সমান।`),
    ], T('Test each pair of signs; do ÷ and × before + and − every time.', 'প্রতিটা চিহ্ন-জোড়া বসিয়ে দেখো; প্রতিবার আগে ÷ ও ×, পরে + ও −।'));
  }
  // defined operation
  const def = pick(DEFINED);
  const x = ri(1, 9); const y = ri(1, 9); const z = ri(1, 9);
  const form = pick(['left', 'right', 'both']);
  const L = def.f(def.f(x, y), z);
  const R = def.f(x, def.f(y, z));
  let v; let expr; let alt; let altNote;
  if (form === 'left') { v = L; expr = `(${x} * ${y}) * ${z}`; alt = R; altNote = T(`That is ${x} * (${y} * ${z}); the bracket here is (${x} * ${y}).`, `এটা ${x} * (${y} * ${z}); এখানে বন্ধনী (${x} * ${y})।`); }
  else if (form === 'right') { v = R; expr = `${x} * (${y} * ${z})`; alt = L; altNote = T(`That is (${x} * ${y}) * ${z}; the bracket here is (${y} * ${z}).`, `এটা (${x} * ${y}) * ${z}; এখানে বন্ধনী (${y} * ${z})।`); }
  else { v = R + L; expr = `${x} * (${y} * ${z}) + (${x} * ${y}) * ${z}`; alt = 2 * R; altNote = T('Both halves are not equal: work each bracket separately.', 'দুই অংশ সমান নয়: প্রতিটা বন্ধনী আলাদা করে করো।'); }
  if (v <= 0 || L === R || v > 2000) return null;
  const ordinary = form === 'left' ? x * y * z : form === 'right' ? x * y * z : 2 * x * y * z;
  const bn = def.en.replace(/ if /g, ' যদি ').replace(/, and /g, ' এবং ');
  const stem = T(`Suppose ${def.en}. Find the value of ${expr}.`, `ধরো ${bn}। ${expr}-এর মান নির্ণয় করো।`);
  const inner = form === 'left' ? [`${x} * ${y} = ${def.f(x, y)}`, `${def.f(x, y)} * ${z} = ${L}`] : form === 'right' ? [`${y} * ${z} = ${def.f(y, z)}`, `${x} * ${def.f(y, z)} = ${R}`] : [`${y} * ${z} = ${def.f(y, z)}, ${x} * ${def.f(y, z)} = ${R}`, `${x} * ${y} = ${def.f(x, y)}, ${def.f(x, y)} * ${z} = ${L}; ${R} + ${L} = ${v}`];
  const options = opts(v, String, [
    [alt > 0 ? alt : null, altNote.en, altNote.bn],
    [ordinary, '“*” is the new operation defined in the question, not ordinary multiplication.', '“*” প্রশ্নে সংজ্ঞায়িত নতুন প্রক্রিয়া, সাধারণ গুণ নয়।'],
  ], [v + 1, v - 1, v + 2, v + 5, v - 4].filter((n) => n > 0));
  return finish('symbol_operations', kind, 3, 75, stem, options, [
    T(`Bracket first: ${inner[0]}.`, `আগে বন্ধনী: ${inner[0]}।`),
    T(`Then ${inner[1]}.`, `তারপর ${inner[1]}।`),
  ], T('Apply the rule to the innermost bracket first, writing each result before the next step.', 'নিয়মটা আগে সবচেয়ে ভিতরের বন্ধনীতে প্রয়োগ করো, প্রতিটা ফল লিখে পরের ধাপে যাও।'));
}

// ── 4. perfect_square_adjust ───────────────────────────────────
const PS_KINDS = ['subtract', 'add', 'nearest_above', 'multiply', 'divide', 'decimal_add', 'decimal_subtract'];
function primeFactors(n) {
  const out = {};
  for (let p = 2; p * p <= n; p++) while (n % p === 0) { out[p] = (out[p] || 0) + 1; n /= p; }
  if (n > 1) out[n] = (out[n] || 0) + 1;
  return out;
}
const SUP = { 1: '', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸' };
const showFactors = (pf) => Object.entries(pf).map(([p, e]) => `${p}${SUP[e] ?? `^${e}`}`).join(' × ');

function perfectSquareAdjust(kind = pick(PS_KINDS)) {
  if (kind === 'subtract' || kind === 'add' || kind === 'nearest_above') {
    const k = ri(25, 320);
    const r = ri(1, 2 * k);
    const N = k * k + r;
    const down = r; const up = (k + 1) * (k + 1) - N;
    const sub = kind === 'subtract';
    const ans = sub ? down : up;
    const stem = sub
      ? T(`The least positive integer which must be subtracted from ${N} to make it a perfect square is`, `${N} থেকে ন্যূনতম কোন ধনাত্মক পূর্ণসংখ্যা বিয়োগ করলে সেটি পূর্ণবর্গ হবে?`)
      : kind === 'add'
        ? T(`What is the least number that must be added to ${N} to make it a perfect square?`, `${N}-এর সঙ্গে ন্যূনতম কোন সংখ্যা যোগ করলে সেটি পূর্ণবর্গ হবে?`)
        : T(`The difference between ${N} and the nearest perfect square above it is`, `${N} এবং তার ঠিক বড় পূর্ণবর্গের পার্থক্য`);
    const options = opts(ans, String, [
      [sub ? up : down, sub ? `That is the distance UP to ${(k + 1) * (k + 1)}; subtracting goes DOWN to ${k * k}.` : `That is the distance DOWN to ${k * k}; adding goes UP to ${(k + 1) * (k + 1)}.`, sub ? `এটা উপরের ${(k + 1) * (k + 1)} পর্যন্ত দূরত্ব; বিয়োগ করলে নিচের ${k * k}-এ নামতে হয়।` : `এটা নিচের ${k * k} পর্যন্ত দূরত্ব; যোগ করলে উপরের ${(k + 1) * (k + 1)}-এ উঠতে হয়।`],
      [sub ? N - (k - 1) * (k - 1) : (k + 2) * (k + 2) - N, `Went one square too far (${sub ? (k - 1) * (k - 1) : (k + 2) * (k + 2)}); the nearest one is ${sub ? k * k : (k + 1) * (k + 1)}.`, `একটা বর্গ বেশি দূরে চলে গেছ (${sub ? (k - 1) * (k - 1) : (k + 2) * (k + 2)}); সবচেয়ে কাছেরটা ${sub ? k * k : (k + 1) * (k + 1)}।`],
    ], [ans + 1, ans - 1, ans + 2, ans + 10, ans - 5].filter((n) => n > 0));
    return finish('perfect_square_adjust', kind, 2, 60, stem, options, [
      T(`${k}² = ${k * k} and ${k + 1}² = ${(k + 1) * (k + 1)}, so ${k * k} < ${N} < ${(k + 1) * (k + 1)}.`, `${k}² = ${k * k} এবং ${k + 1}² = ${(k + 1) * (k + 1)}, তাই ${k * k} < ${N} < ${(k + 1) * (k + 1)}।`),
      sub ? T(`Subtract down to ${k * k}: ${N} ${MINUS} ${k * k} = ${ans}.`, `নিচের ${k * k}-এ নামতে বিয়োগ: ${N} ${MINUS} ${k * k} = ${ans}।`) : T(`Go up to ${(k + 1) * (k + 1)}: ${(k + 1) * (k + 1)} ${MINUS} ${N} = ${ans}.`, `উপরের ${(k + 1) * (k + 1)}-এ উঠতে: ${(k + 1) * (k + 1)} ${MINUS} ${N} = ${ans}।`),
    ], T('Bracket the number between two consecutive squares; subtract to the lower, add to the upper.', 'সংখ্যাটাকে পরপর দুটি বর্গের মাঝে ফেলো; বিয়োগে নিচেরটা, যোগে উপরেরটা।'));
  }
  if (kind === 'multiply' || kind === 'divide') {
    const s = pick([2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 21]);
    const m = ri(6, 60);
    const N = s * m * m;
    if (N < 300 || N > 99999) return null;
    const pf = primeFactors(N);
    const allPrimes = Object.keys(pf).map(Number);
    const radical = allPrimes.reduce((a, b) => a * b, 1);
    const smallest = Math.min(...allPrimes);
    const mul = kind === 'multiply';
    const stem = mul
      ? T(`Find the smallest number by which ${N} should be multiplied so that the product becomes a perfect square.`, `${N}-কে ন্যূনতম কোন সংখ্যা দিয়ে গুণ করলে গুণফল পূর্ণবর্গ হবে?`)
      : T(`By what least number should ${N} be divided so that the quotient is a perfect square?`, `${N}-কে ন্যূনতম কোন সংখ্যা দিয়ে ভাগ করলে ভাগফল পূর্ণবর্গ হবে?`);
    const others = [2, 3, 5, 7, 11, 13].filter((p) => p !== s);
    const options = opts(s, String, [
      [radical, 'That multiplies EVERY prime factor; only the primes with an odd power are needed.', 'এতে সব মৌলিক উৎপাদক নেওয়া হয়েছে; শুধু বিজোড় ঘাতের মৌলিকগুলো লাগে।'],
      [smallest, `${smallest} is the smallest prime factor, but its power is already even.`, `${smallest} সবচেয়ে ছোট মৌলিক উৎপাদক, কিন্তু তার ঘাত আগেই জোড়।`],
    ], [...others, s * 2, s * 3]);
    const res = mul ? N * s : N / s;
    return finish('perfect_square_adjust', kind, 3, 75, stem, options, [
      T(`${N} = ${showFactors(pf)}.`, `${N} = ${showFactors(pf)}।`),
      T(`The primes with an odd power multiply to ${s}.`, `বিজোড় ঘাতের মৌলিকগুলোর গুণফল ${s}।`),
      T(`${N} ${mul ? '×' : '÷'} ${s} = ${res} = ${Math.round(Math.sqrt(res))}².`, `${N} ${mul ? '×' : '÷'} ${s} = ${res} = ${Math.round(Math.sqrt(res))}²।`),
    ], T('Pair up the prime factors; the unpaired primes, multiplied, are the answer.', 'মৌলিক উৎপাদকগুলো জোড়ায় সাজাও; যেগুলো জোড়া পায় না তাদের গুণফলই উত্তর।'));
  }
  // decimals: perfect squares of one-decimal numbers
  const a = ri(12, 60); // x = a/10
  const sub = kind === 'decimal_subtract';
  const gap = sub ? 2 * a + 1 : 2 * a - 1; // hundredths between a² and the neighbour square
  const e = ri(1, gap - 1);
  const Nh = sub ? a * a + e : a * a - e; // N in hundredths
  if (Nh % 10 === 0) return null;
  const ans = e;
  const N = dec(Nh, 2);
  const sq = dec(a * a, 2);
  const stem = sub
    ? T(`The smallest number to be subtracted from ${N} so that the result may be a perfect square is`, `${N} থেকে ন্যূনতম কোন সংখ্যা বিয়োগ করলে ফল পূর্ণবর্গ হবে?`)
    : T(`The smallest number to be added to ${N} so that the sum may be a perfect square is`, `${N}-এর সঙ্গে ন্যূনতম কোন সংখ্যা যোগ করলে যোগফল পূর্ণবর্গ হবে?`);
  const other = gap - e;
  const options = opts(ans, (v) => dec(v, 2), [
    [other, sub ? 'That is the distance to the square ABOVE; subtracting goes down.' : 'That is the distance to the square BELOW; adding goes up.', sub ? 'এটা উপরের বর্গ পর্যন্ত দূরত্ব; বিয়োগে নিচে নামতে হয়।' : 'এটা নিচের বর্গ পর্যন্ত দূরত্ব; যোগে উপরে উঠতে হয়।'],
    [ans * 10, 'Decimal place slip: squares of one-decimal numbers have two decimal places.', 'দশমিকের ভুল: এক দশমিকের সংখ্যার বর্গে দুই ঘর দশমিক থাকে।'],
  ], [ans + 1, ans + 10, ans - 1, ans + 5].filter((n) => n > 0));
  return finish('perfect_square_adjust', kind, 3, 75, stem, options, [
    T(`${dec(a, 1)}² = ${sq} is the nearest square ${sub ? 'below' : 'above'} ${N}.`, `${dec(a, 1)}² = ${sq} হল ${N}-এর ঠিক ${sub ? 'নিচের' : 'উপরের'} বর্গ।`),
    sub ? T(`${N} ${MINUS} ${sq} = ${dec(ans, 2)}.`, `${N} ${MINUS} ${sq} = ${dec(ans, 2)}।`) : T(`${sq} ${MINUS} ${N} = ${dec(ans, 2)}.`, `${sq} ${MINUS} ${N} = ${dec(ans, 2)}।`),
  ], T('Think of the number ×100 as a whole number (465) and find the nearest square of the right kind (484 = 22²).', 'সংখ্যাটিকে 100 দিয়ে গুণ করে পূর্ণসংখ্যা ভাবো (465), তারপর ঠিক দিকের কাছের বর্গ খোঁজো (484 = 22²)।'));
}

// ── 5. square_cube_roots (decimal and nested roots) ───────────
const SR_KINDS = ['sum4', 'nested', 'nested_plus', 'tiny', 'contribution'];
function squareCubeRoots(kind = pick(SR_KINDS)) {
  if (kind === 'sum4') {
    // √(v²) with v = n/10^s, s ∈ {1, 2}
    const terms = [];
    for (let i = 0; i < 4; i++) {
      const s = pick([1, 1, 2]);
      const n = s === 1 ? ri(1, 15) : ri(1, 9);
      if (n % 10 === 0) return null;
      terms.push({ n, s });
    }
    const keys = terms.map((t) => `${t.n}/${t.s}`);
    if (new Set(keys).size !== 4) return null;
    const total = terms.reduce((a, t) => a + t.n * 10 ** (2 - t.s), 0); // hundredths
    const slip = terms.findIndex((t) => t.s === 2);
    const slipTotal = slip >= 0 ? total - terms[slip].n + terms[slip].n * 10 : null; // √0.0009 read as 0.3
    const shown = terms.map((t) => `√${dec(t.n * t.n, 2 * t.s)}`).join(' + ');
    const stem = T(`The value of ${shown} is`, `${shown}-এর মান`);
    const options = opts(total, (v) => dec(v, 2), [
      [slipTotal, `√${dec(terms[Math.max(slip, 0)].n ** 2, 4)} = ${dec(terms[Math.max(slip, 0)].n, 2)}: the root has HALF as many decimal places.`, `√${dec(terms[Math.max(slip, 0)].n ** 2, 4)} = ${dec(terms[Math.max(slip, 0)].n, 2)}: বর্গমূলে দশমিকের ঘর অর্ধেক হয়।`],
    ], [total + 1, total - 1, total + 10, total - 10, total + 2].filter((v) => v > 0));
    return finish('square_cube_roots', kind, 2, 60, stem, options, [
      T(terms.map((t) => `√${dec(t.n * t.n, 2 * t.s)} = ${dec(t.n, t.s)}`).join(', ') + '.', terms.map((t) => `√${dec(t.n * t.n, 2 * t.s)} = ${dec(t.n, t.s)}`).join(', ') + '।'),
      T(`Sum = ${terms.map((t) => dec(t.n, t.s)).join(' + ')} = ${dec(total, 2)}.`, `যোগফল = ${terms.map((t) => dec(t.n, t.s)).join(' + ')} = ${dec(total, 2)}।`),
    ], T('A decimal with 2k places has a square root with k places: √0.0009 = 0.03.', '2k ঘর দশমিকের বর্গমূলে k ঘর থাকে: √0.0009 = 0.03।'));
  }
  if (kind === 'nested' || kind === 'nested_plus') {
    const x = ri(2, 9); // outer root = x/10, inner sum = x²/100
    const c = ri(1, x * x - 1); // √b = c/100
    const aH = x * x - c; // a in hundredths
    const a = dec(aH, 2); const b = dec(c * c, 4);
    if (c >= 10 && c % 10 === 0) return null;
    const plus = kind === 'nested_plus';
    const e = ri(1, 9);
    const ans = plus ? x * 10 + e * 10 : x * 10; // hundredths
    const expr = plus ? `√(${a} + √${b}) + √${dec(e * e, 2)}` : `√(${a} + √${b})`;
    const stem = plus ? T(`The value of ${expr} is`, `${expr}-এর মান`) : T(`${expr} = ?`, `${expr}-এর মান কত?`);
    const options = opts(ans, (v) => dec(v, 2), [
      [plus ? x * x + e * 10 : x * x, 'The outer square root was not taken.', 'বাইরের বর্গমূলটা নেওয়া হয়নি।'],
      [plus ? x + e * 10 : x, `√${dec(x * x, 2)} = ${dec(x, 1)}, not ${dec(x, 2)} — the root has half as many decimal places.`, `√${dec(x * x, 2)} = ${dec(x, 1)}, ${dec(x, 2)} নয় — বর্গমূলে দশমিকের ঘর অর্ধেক।`],
    ], [ans + 10, ans - 10, ans + 20, ans * 10].filter((v) => v > 0));
    return finish('square_cube_roots', kind, 3, 75, stem, options, [
      T(`Inner root: √${b} = ${dec(c, 2)}.`, `ভিতরের বর্গমূল: √${b} = ${dec(c, 2)}।`),
      T(`${a} + ${dec(c, 2)} = ${dec(x * x, 2)}, and √${dec(x * x, 2)} = ${dec(x, 1)}.`, `${a} + ${dec(c, 2)} = ${dec(x * x, 2)}, আর √${dec(x * x, 2)} = ${dec(x, 1)}।`),
      ...(plus ? [T(`√${dec(e * e, 2)} = ${dec(e, 1)}; total = ${dec(x, 1)} + ${dec(e, 1)} = ${dec(ans, 2)}.`, `√${dec(e * e, 2)} = ${dec(e, 1)}; মোট = ${dec(x, 1)} + ${dec(e, 1)} = ${dec(ans, 2)}।`)] : []),
    ], T('Work from the inside out; write each decimal root with half the decimal places.', 'ভিতর থেকে বাইরে করো; প্রতিটা দশমিক বর্গমূলে দশমিকের ঘর অর্ধেক।'));
  }
  if (kind === 'tiny') {
    const cube = rand() < 0.4;
    const n = ri(1, 9);
    const k = cube ? pick([1, 2]) : pick([2, 3, 4]); // root has k decimal places
    const places = cube ? 3 * k : 2 * k;
    const radicand = dec(cube ? n ** 3 : n * n, places);
    const sym = cube ? '∛' : '√';
    const stem = T(`The ${cube ? 'cube' : 'square'} root of ${radicand} is`, `${radicand}-এর ${cube ? 'ঘনমূল' : 'বর্গমূল'}`);
    // answer n / 10^k as text; compare as strings
    const ans = dec(n, k);
    const wrong = [dec(n, k + 1), dec(n, k - 1 > 0 ? k - 1 : k + 2), dec(n, places)].filter((s, i, arr) => s !== ans && arr.indexOf(s) === i);
    const fill = [dec(n, k + 2), dec(n * n, k), dec(n + 1, k)];
    const hints = [
      [wrong[0], `Count again: ${radicand} has ${places} decimal places, so its ${cube ? 'cube' : 'square'} root has ${k}.`, `আবার গোনো: ${radicand}-এ ${places} ঘর দশমিক, তাই ${cube ? 'ঘনমূলে' : 'বর্গমূলে'} ${k} ঘর।`],
      [dec(n, places), 'The number of decimal places was not reduced at all.', 'দশমিকের ঘর একটুও কমানো হয়নি।'],
    ];
    const options = opts(ans, (s) => s, hints, [...wrong, ...fill]);
    return finish('square_cube_roots', kind, 2, 45, stem, options, [
      T(`${radicand} = ${cube ? n ** 3 : n * n}/1${'0'.repeat(places)} = (${n}/1${'0'.repeat(k)})${cube ? '³' : '²'}.`, `${radicand} = ${cube ? n ** 3 : n * n}/1${'0'.repeat(places)} = (${n}/1${'0'.repeat(k)})${cube ? '³' : '²'}।`),
      T(`So ${sym}${radicand} = ${ans}.`, `তাই ${sym}${radicand} = ${ans}।`),
    ], T(`A ${cube ? 'cube' : 'square'} root has 1/${cube ? 3 : 2} as many decimal places as the number.`, `${cube ? 'ঘনমূলে' : 'বর্গমূলে'} দশমিকের ঘর সংখ্যার ঘরের 1/${cube ? 3 : 2} ভাগ।`));
  }
  // contribution / square arrangement
  const n = ri(21, 150);
  const N = n * n;
  const ctx = pick(['class', 'trees', 'soldiers']);
  const stem = ctx === 'class'
    ? T(`A group of students collects ₹ ${N}. The amount contributed by each student is equal to the number of students in the group. The number of students is`, `একদল ছাত্রছাত্রী মোট ₹ ${N} চাঁদা তোলে। প্রত্যেকে দলের ছাত্রছাত্রী-সংখ্যার সমান টাকা দেয়। ছাত্রছাত্রীর সংখ্যা কত?`)
    : ctx === 'trees'
      ? T(`A gardener plants ${N} trees in rows so that the number of rows equals the number of trees in each row. How many rows are there?`, `একজন মালী ${N}টি গাছ সারিতে এমনভাবে লাগান যে সারির সংখ্যা প্রতিটি সারির গাছের সংখ্যার সমান। সারি কয়টি?`)
      : T(`${N} soldiers stand in a square formation (as many rows as soldiers in each row). How many soldiers are there in each row?`, `${N} জন সৈন্য বর্গাকারে দাঁড়ায় (যত সারি, প্রতি সারিতে তত জন)। প্রতি সারিতে কতজন সৈন্য?`);
  const twin = n % 10 && n % 10 !== 5 ? Math.floor(n / 10) * 10 + (10 - (n % 10)) : null;
  const options = opts(n, String, [
    [twin, `${twin}² also ends in the digit ${N % 10}, but ${twin}² = ${twin * twin}; pick the root by size.`, `${twin}²-এর শেষেও ${N % 10}, কিন্তু ${twin}² = ${twin * twin}; আকার দেখে বর্গমূল বাছো।`],
    [N % 2 === 0 ? N / 2 : null, 'Halved the total; the total is a number × itself, so take the square root.', 'মোটকে অর্ধেক করা হয়েছে; মোট = সংখ্যা × সংখ্যা, তাই বর্গমূল নিতে হবে।'],
  ], [n + 2, n - 2, n + 10, n - 10, n + 4].filter((v) => v > 0));
  return finish('square_cube_roots', kind, 2, 50, stem, options, [
    T(`Number × number = ${N}, so the number = √${N}.`, `সংখ্যা × সংখ্যা = ${N}, তাই সংখ্যা = √${N}।`),
    T(`√${N} = ${n} (check: ${n} × ${n} = ${N}).`, `√${N} = ${n} (যাচাই: ${n} × ${n} = ${N})।`),
  ], T(`The unit digit and the nearest round squares pin the root: ${N} lies between ${Math.floor(n / 10) * 10}² and ${Math.floor(n / 10) * 10 + 10}².`, `একক অঙ্ক আর কাছের গোল বর্গ দেখে বর্গমূল ধরা যায়: ${N} আছে ${Math.floor(n / 10) * 10}² ও ${Math.floor(n / 10) * 10 + 10}²-এর মাঝে।`));
}

// ── 6. algebraic_identities (cube identities) ─────────────────
const AI_KINDS = ['sum_long', 'diff_long', 'diff_compact', 'sum_compact'];
function algebraicIdentities(kind = pick(AI_KINDS)) {
  const isSum = kind.startsWith('sum');
  const compact = kind.endsWith('compact');
  let A; let B; // hundredths
  if (compact) {
    B = ri(1, 9) * 10; // one-decimal b
    A = isSum ? pick([100, 200, 300, 400, 500]) - B + (rand() < 0.5 ? 0 : 100) : B + pick([100, 200, 300, 400]);
    if (A % 10) return null;
  } else {
    const S = isSum ? pick([500, 700, 900, 1000, 1100, 1300, 1500]) : pick([100, 200, 300, 500, 700]);
    if (isSum) { B = ri(110, Math.floor(S / 2) - 5); A = S - B; } else { B = ri(110, 900); A = B + S; }
    if (A % 10 === 0 || B % 10 === 0) return null;
  }
  if (A <= B || B <= 0) return null;
  const a = dec(A, 2); const b = dec(B, 2);
  const ans = isSum ? A + B : A - B; // hundredths
  let expr;
  if (!compact) {
    expr = isSum
      ? `(${a} × ${a} × ${a} + ${b} × ${b} × ${b}) / (${a} × ${a} ${MINUS} ${a} × ${b} + ${b} × ${b})`
      : `(${a} × ${a} × ${a} ${MINUS} ${b} × ${b} × ${b}) / (${a} × ${a} + ${a} × ${b} + ${b} × ${b})`;
  } else {
    const b3 = dec((B / 10) ** 3, 3); const ab = dec((A / 10) * (B / 10), 2); const b2 = dec((B / 10) ** 2, 2);
    expr = isSum
      ? `(${a} × ${a} × ${a} + ${b3}) / (${a} × ${a} ${MINUS} ${ab} + ${b2})`
      : `(${a} × ${a} × ${a} ${MINUS} ${b3}) / (${a} × ${a} + ${ab} + ${b2})`;
  }
  const stem = T(`The simplified value of ${expr} is`, `${expr}-এর সরলতম মান`);
  const options = opts(ans, (v) => dec(v, 2), [
    [isSum ? A - B : A + B, isSum ? 'With a³ + b³ the denominator is a² − ab + b², so the answer is a + b, not a − b.' : 'With a³ − b³ the denominator is a² + ab + b², so the answer is a − b, not a + b.', isSum ? 'a³ + b³-এর সঙ্গে হর a² − ab + b², তাই উত্তর a + b, a − b নয়।' : 'a³ − b³-এর সঙ্গে হর a² + ab + b², তাই উত্তর a − b, a + b নয়।'],
    [100, 'Numerator and denominator are not equal; only the factor a² ∓ ab + b² cancels.', 'লব ও হর সমান নয়; শুধু a² ∓ ab + b² উৎপাদকটা কাটে।'],
  ], [ans + 100, ans - 100, ans + 200, ans * 2].filter((v) => v > 0));
  const compactNote = compact ? T(`Here ${dec((B / 10) ** 3, 3)} = ${b}³, ${dec((A / 10) * (B / 10), 2)} = ${a} × ${b} and ${dec((B / 10) ** 2, 2)} = ${b}².`, `এখানে ${dec((B / 10) ** 3, 3)} = ${b}³, ${dec((A / 10) * (B / 10), 2)} = ${a} × ${b} এবং ${dec((B / 10) ** 2, 2)} = ${b}²।`) : null;
  return finish('algebraic_identities', kind, compact ? 3 : 2, compact ? 75 : 60, stem, options, [
    ...(compactNote ? [compactNote] : []),
    T(isSum ? `Put a = ${a}, b = ${b}: the expression is (a³ + b³)/(a² − ab + b²).` : `Put a = ${a}, b = ${b}: the expression is (a³ − b³)/(a² + ab + b²).`, isSum ? `a = ${a}, b = ${b} ধরলে রাশিটি (a³ + b³)/(a² − ab + b²)।` : `a = ${a}, b = ${b} ধরলে রাশিটি (a³ − b³)/(a² + ab + b²)।`),
    T(isSum ? `a³ + b³ = (a + b)(a² − ab + b²), so the value is a + b = ${a} + ${b} = ${dec(ans, 2)}.` : `a³ − b³ = (a − b)(a² + ab + b²), so the value is a − b = ${a} ${MINUS} ${b} = ${dec(ans, 2)}.`, isSum ? `a³ + b³ = (a + b)(a² − ab + b²), তাই মান a + b = ${a} + ${b} = ${dec(ans, 2)}।` : `a³ − b³ = (a − b)(a² + ab + b²), তাই মান a − b = ${a} ${MINUS} ${b} = ${dec(ans, 2)}।`),
  ], T('Spot a³ ± b³ over the matching quadratic: the answer is just a ± b — no multiplication needed.', 'a³ ± b³-এর নিচে মানানসই দ্বিঘাত দেখলেই উত্তর a ± b — গুণ করার দরকার নেই।'));
}

// ── 7. mixed_fraction_operations ───────────────────────────────
const MF_KINDS = ['add_sub_missing', 'sub_sub_missing', 'direct'];
const DENS = [2, 3, 4, 5, 6, 8, 9, 12];
function randMixed(minW, maxW) {
  const d = pick(DENS); const n = ri(1, d - 1);
  if (gcd(n, d) !== 1) return null;
  return F(ri(minW, maxW) * d + n, d);
}
/** Whole parts and fraction parts handled separately with no borrowing (the classic slip). */
function noBorrow(terms, signs) {
  let w = 0; let f = F(0);
  terms.forEach((t, i) => {
    const wh = Math.floor(t.n / t.d); const fr = F(t.n - wh * t.d, t.d);
    w += signs[i] * wh; f = signs[i] > 0 ? fadd(f, fr) : fsub(f, fr);
  });
  if (f.n >= 0) return null;
  return fadd(F(w), F(-f.n, f.d));
}
function mixedFractionOps(kind = pick(MF_KINDS)) {
  const A = randMixed(10, 40); const B = randMixed(2, 30); const C = randMixed(2, 40);
  if (!A || !B || !C) return null;
  let ans; let stem; let steps; let slip;
  if (kind === 'add_sub_missing') {
    ans = fsub(fadd(A, B), C);
    stem = T(`If ${mixed(A)} + ${mixed(B)} ${MINUS} ? = ${mixed(C)}, then the value of ? is`, `যদি ${mixed(A)} + ${mixed(B)} ${MINUS} ? = ${mixed(C)} হয়, তবে ? -এর মান`);
    slip = noBorrow([A, B, C], [1, 1, -1]);
    steps = [
      T(`Move ? to the other side: ? = ${mixed(A)} + ${mixed(B)} ${MINUS} ${mixed(C)}.`, `? -কে অন্য দিকে নিয়ে: ? = ${mixed(A)} + ${mixed(B)} ${MINUS} ${mixed(C)}।`),
      T(`${mixed(A)} + ${mixed(B)} = ${mixed(fadd(A, B))}.`, `${mixed(A)} + ${mixed(B)} = ${mixed(fadd(A, B))}।`),
      T(`${mixed(fadd(A, B))} ${MINUS} ${mixed(C)} = ${mixed(ans)}.`, `${mixed(fadd(A, B))} ${MINUS} ${mixed(C)} = ${mixed(ans)}।`),
    ];
  } else if (kind === 'sub_sub_missing') {
    ans = fsub(fsub(A, B), C);
    stem = T(`If ${mixed(A)} ${MINUS} ${mixed(B)} ${MINUS} ? = ${mixed(C)}, find the number in place of ?.`, `যদি ${mixed(A)} ${MINUS} ${mixed(B)} ${MINUS} ? = ${mixed(C)} হয়, তবে ? -এর জায়গায় কোন সংখ্যা বসবে?`);
    slip = noBorrow([A, B, C], [1, -1, -1]);
    steps = [
      T(`Move ? to the other side: ? = ${mixed(A)} ${MINUS} ${mixed(B)} ${MINUS} ${mixed(C)}.`, `? -কে অন্য দিকে নিয়ে: ? = ${mixed(A)} ${MINUS} ${mixed(B)} ${MINUS} ${mixed(C)}।`),
      T(`${mixed(A)} ${MINUS} ${mixed(B)} = ${mixed(fsub(A, B))}.`, `${mixed(A)} ${MINUS} ${mixed(B)} = ${mixed(fsub(A, B))}।`),
      T(`${mixed(fsub(A, B))} ${MINUS} ${mixed(C)} = ${mixed(ans)}.`, `${mixed(fsub(A, B))} ${MINUS} ${mixed(C)} = ${mixed(ans)}।`),
    ];
  } else {
    ans = fsub(fadd(A, B), C);
    stem = T(`Simplify: ${mixed(A)} + ${mixed(B)} ${MINUS} ${mixed(C)}`, `সরল করো: ${mixed(A)} + ${mixed(B)} ${MINUS} ${mixed(C)}`);
    slip = noBorrow([A, B, C], [1, 1, -1]);
    steps = [
      T(`Wholes: ${Math.floor(A.n / A.d)} + ${Math.floor(B.n / B.d)} ${MINUS} ${Math.floor(C.n / C.d)}; fractions: ${fs(F(A.n % A.d, A.d))} + ${fs(F(B.n % B.d, B.d))} ${MINUS} ${fs(F(C.n % C.d, C.d))}.`, `পূর্ণ অংশ: ${Math.floor(A.n / A.d)} + ${Math.floor(B.n / B.d)} ${MINUS} ${Math.floor(C.n / C.d)}; ভগ্নাংশ: ${fs(F(A.n % A.d, A.d))} + ${fs(F(B.n % B.d, B.d))} ${MINUS} ${fs(F(C.n % C.d, C.d))}।`),
      T(`Combine (borrow 1 if the fraction part is negative): ${mixed(ans)}.`, `একসঙ্গে করো (ভগ্নাংশ ঋণাত্মক হলে 1 ধার নাও): ${mixed(ans)}।`),
    ];
  }
  if (!pos(ans) || ans.d === 1 || ans.n / ans.d < 1 || ans.d > 36) return null;
  const options = opts(ans, mixed, [
    [slip, 'The fraction part went negative and the sign was dropped instead of borrowing 1 from the whole part.', 'ভগ্নাংশ অংশ ঋণাত্মক হয়েছিল, পূর্ণ অংশ থেকে 1 ধার না নিয়ে চিহ্ন ফেলে দেওয়া হয়েছে।'],
    [kind === 'sub_sub_missing' ? fadd(fsub(A, B), C) : fadd(fadd(A, B), C), kind === 'direct' ? `${mixed(C)} carries a minus sign; it was added.` : `${mixed(C)} must be subtracted, not added, when ? is moved across.`, kind === 'direct' ? `${mixed(C)}-এর আগে বিয়োগ চিহ্ন; যোগ করা হয়েছে।` : `? -কে অন্য দিকে নিলে ${mixed(C)} বিয়োগ হয়, যোগ নয়।`],
  ], [fadd(ans, F(1)), fsub(ans, F(1)), fadd(ans, F(1, ans.d)), fsub(ans, F(1, ans.d)), fadd(ans, F(2))].filter(pos), (v) => (pos(v) ? mixed(v) : null));
  return finish('mixed_fraction_operations', kind, kind === 'direct' ? 2 : 3, 75, stem, options, steps,
    T('Add the whole parts and the fraction parts separately over the LCM; borrow 1 whole if the fraction part comes out negative.', 'পূর্ণ অংশ আর ভগ্নাংশ অংশ ল.সা.গু. নিয়ে আলাদা যোগ-বিয়োগ করো; ভগ্নাংশ ঋণাত্মক হলে পূর্ণ অংশ থেকে 1 ধার নাও।'));
}

// ── 8. fraction_chain_of (BODMAS with "of") ────────────────────
const FC_KINDS = ['minus_of_div_of', 'plus_of_div_of', 'chain_div'];
const SHOWABLE = (f) => f && f.n > 0 && f.d <= 12 && f.n <= 80 && f.d > 1;
function splitProduct(X) {
  // a showable factor pair P × Q = X (both fractions, at least one mixed)
  for (let t = 0; t < 20; t++) {
    const P = F(ri(2, 40), ri(2, 12));
    if (!SHOWABLE(P)) continue;
    const Q = fdiv(X, P);
    if (SHOWABLE(Q) && (P.n > P.d || Q.n > Q.d)) return [P, Q];
  }
  return null;
}
function fractionChainOf(kind = pick(FC_KINDS)) {
  if (kind === 'chain_div') {
    const a = F(ri(1, 5), ri(2, 9)); const b = F(ri(1, 5), ri(2, 9));
    if (a.n >= a.d || b.n >= b.d || a.d === 1 || b.d === 1) return null;
    const N = a.d * b.d * ri(1, 6);
    const left = fmul(fmul(a, b), F(N));
    const c = F(ri(1, 4), ri(2, 6));
    if (c.n >= c.d || c.d === 1) return null;
    const M = c.d * ri(1, 8);
    const right = fmul(c, F(M));
    const ans = fdiv(left, right);
    if (ans.d > 12 || left.d !== 1 || right.d !== 1) return null;
    const ltr = fmul(fdiv(left, c), F(M));
    const stem = T(`Find the value of ${fs(a)} of ${fs(b)} of ${N} ÷ ${fs(c)} of ${M}.`, `${N}-এর ${fs(b)}-এর ${fs(a)} ÷ ${M}-এর ${fs(c)}-এর মান নির্ণয় করো (অর্থাৎ ${fs(a)} of ${fs(b)} of ${N} ÷ ${fs(c)} of ${M})।`);
    const options = opts(ans, mixed, [
      [ltr, '“of” must be done before ÷: the divisor is the whole of “' + `${fs(c)} of ${M}` + '”.', '“of” (এর) ÷-এর আগে করতে হয়: ভাজক হল পুরো “' + `${M}-এর ${fs(c)}` + '”।'],
      [fmul(left, right), 'Multiplied instead of dividing by the second part.', 'দ্বিতীয় অংশ দিয়ে ভাগের বদলে গুণ করা হয়েছে।'],
    ], [fadd(ans, F(1)), fsub(ans, F(1)), fadd(ans, F(2)), fmul(ans, F(2))].filter(pos), (v) => (pos(v) ? mixed(v) : null));
    return finish('fraction_chain_of', kind, 2, 60, stem, options, [
      T(`“of” first: ${fs(a)} × ${fs(b)} × ${N} = ${left.n} and ${fs(c)} × ${M} = ${right.n}.`, `আগে “of”: ${fs(a)} × ${fs(b)} × ${N} = ${left.n} এবং ${fs(c)} × ${M} = ${right.n}।`),
      T(`Then ÷: ${left.n} ÷ ${right.n} = ${mixed(ans)}.`, `তারপর ÷: ${left.n} ÷ ${right.n} = ${mixed(ans)}।`),
    ], T('In BODMAS “of” is a multiplication done before ÷ and ×: turn every “x of y” into one number first.', 'BODMAS-এ “of” এমন গুণ যা ÷ ও ×-এর আগে হয়: আগে প্রতিটা “x of y”-কে একটা সংখ্যা বানাও।'));
  }
  const X = F(ri(2, 12)); const Y = F(ri(2, 12));
  const pq = splitProduct(X); const rs = splitProduct(Y);
  if (!pq || !rs) return null;
  const [P, Q] = pq; const [R, S] = rs;
  const q = fdiv(X, Y);
  if (q.d > 6) return null;
  const minus = kind === 'minus_of_div_of';
  const Aint = ri(Math.ceil(q.n / q.d) + 1, Math.ceil(q.n / q.d) + 12);
  const A = F(Aint);
  const ans = minus ? fsub(A, q) : fadd(A, q);
  const expr = `${Aint} ${minus ? MINUS : '+'} ${mixed(P)} of ${mixed(Q)} ÷ ${mixed(R)} of ${mixed(S)}`;
  const exprBn = `${Aint} ${minus ? MINUS : '+'} ${mixed(Q)}-এর ${mixed(P)} ÷ ${mixed(S)}-এর ${mixed(R)}`;
  const stem = T(`${expr} = ?`, `${exprBn} = ? (অর্থাৎ ${expr})`);
  const ltrQ = fmul(fdiv(X, R), S); // ignoring the priority of the second "of"
  const subFirst = minus ? fdiv(fsub(A, X), Y) : fdiv(fadd(A, X), Y);
  const options = opts(ans, mixed, [
    [minus ? fsub(A, ltrQ) : fadd(A, ltrQ), `“${mixed(R)} of ${mixed(S)}” is one number (${fs(Y)}) and must be found before dividing.`, `“${mixed(S)}-এর ${mixed(R)}” একটাই সংখ্যা (${fs(Y)}), ভাগের আগে সেটা বের করতে হবে।`],
    [subFirst, `${minus ? 'Subtraction' : 'Addition'} was done before division; ÷ comes first.`, `ভাগের আগে ${minus ? 'বিয়োগ' : 'যোগ'} করা হয়েছে; ÷ আগে।`],
  ], [fadd(ans, F(1)), fsub(ans, F(1)), fadd(ans, F(2)), fsub(ans, F(2))].filter(pos), (v) => (pos(v) ? mixed(v) : null));
  return finish('fraction_chain_of', kind, 3, 90, stem, options, [
    T(`“of” first: ${mixed(P)} of ${mixed(Q)} = ${fs(P)} × ${fs(Q)} = ${fs(X)}; ${mixed(R)} of ${mixed(S)} = ${fs(R)} × ${fs(S)} = ${fs(Y)}.`, `আগে “of”: ${mixed(Q)}-এর ${mixed(P)} = ${fs(P)} × ${fs(Q)} = ${fs(X)}; ${mixed(S)}-এর ${mixed(R)} = ${fs(R)} × ${fs(S)} = ${fs(Y)}।`),
    T(`Then ÷: ${fs(X)} ÷ ${fs(Y)} = ${mixed(q)}.`, `তারপর ÷: ${fs(X)} ÷ ${fs(Y)} = ${mixed(q)}।`),
    T(`${Aint} ${minus ? MINUS : '+'} ${mixed(q)} = ${mixed(ans)}.`, `${Aint} ${minus ? MINUS : '+'} ${mixed(q)} = ${mixed(ans)}।`),
  ], T('Convert mixed numbers to improper fractions, finish both “of” products, then ÷, then + or −.', 'মিশ্র ভগ্নাংশকে অপ্রকৃত ভগ্নাংশ করো, দুটো “of” গুণ শেষ করো, তারপর ÷, শেষে + বা −।'));
}

// ── 9. decimal_squares_cubes ───────────────────────────────────
const DS_KINDS = ['cube_product', 'square_plus_cube'];
function decimalSquaresCubes(kind = pick(DS_KINDS)) {
  if (kind === 'cube_product') {
    const a = ri(2, 5); const d = ri(1, 9);
    const s1 = pick([1, -1]); const s2 = pick([1, -1]); const s3 = pick([1, -1]);
    const sign = s1 * s2 * s3;
    const ans = sign * d ** 3; // thousandths
    const show = (s, txt) => (s < 0 ? `(${MINUS}${txt})³` : `(${txt})³`);
    const order = shuffle([show(s1, String(a)), show(s2, `1/${a}`), show(s3, dec(d, 1))]);
    const stem = T(`The value of ${order.join(' × ')} is`, `${order.join(' × ')}-এর মান`);
    const options = opts(ans, (v) => dec(v, 3), [
      [-ans, `Count the negative bases: ${[s1, s2, s3].filter((s) => s < 0).length} of them, so the product is ${sign < 0 ? 'negative' : 'positive'}.`, `ঋণাত্মক ভিত্তি গোনো: ${[s1, s2, s3].filter((s) => s < 0).length}টি, তাই গুণফল ${sign < 0 ? 'ঋণাত্মক' : 'ধনাত্মক'}।`],
      [ans * 10, `(${dec(d, 1)})³ has three decimal places: ${dec(d ** 3, 3)}.`, `(${dec(d, 1)})³-এ তিন ঘর দশমিক: ${dec(d ** 3, 3)}।`],
    ], [ans / 10, sign * d * d * 10, sign * d * 100].filter((v) => v !== 0 && v !== ans && Number.isInteger(v)), (v) => (Number.isInteger(v) && v !== 0 ? dec(v, 3) : null));
    return finish('decimal_squares_cubes', kind, 2, 60, stem, options, [
      T(`All three are cubes, so the product = (${s1 < 0 ? MINUS : ''}${a} × ${s2 < 0 ? MINUS : ''}1/${a} × ${s3 < 0 ? MINUS : ''}${dec(d, 1)})³.`, `তিনটিই ঘন, তাই গুণফল = (${s1 < 0 ? MINUS : ''}${a} × ${s2 < 0 ? MINUS : ''}1/${a} × ${s3 < 0 ? MINUS : ''}${dec(d, 1)})³।`),
      T(`Inside: ${dec(sign * d, 1)}; cubed: ${dec(ans, 3)}.`, `ভিতরে: ${dec(sign * d, 1)}; ঘন করলে: ${dec(ans, 3)}।`),
    ], T('aⁿ × bⁿ × cⁿ = (abc)ⁿ — multiply the bases first; an odd number of negatives makes the cube negative.', 'aⁿ × bⁿ × cⁿ = (abc)ⁿ — আগে ভিত্তিগুলো গুণ করো; বিজোড় সংখ্যক ঋণাত্মক থাকলে ঘন ঋণাত্মক।'));
  }
  const x = ri(11, 25); const y = ri(2, 9); // x/10 squared, y/10 cubed
  if (x % 10 === 0) return null;
  const ans = x * x * 10 + y ** 3; // thousandths
  const stem = T(`Find the value of (${dec(x, 1)})² + (${dec(y, 1)})³.`, `(${dec(x, 1)})² + (${dec(y, 1)})³-এর মান নির্ণয় করো।`);
  const options = opts(ans, (v) => dec(v, 3), [
    [x * 2 * 100 + y * 3 * 100, 'A square is the number times itself, not times 2 (and a cube is not times 3).', 'বর্গ মানে সংখ্যা × সংখ্যা, 2 দিয়ে গুণ নয় (ঘনও 3 দিয়ে গুণ নয়)।'],
    [x * x * 10 + y ** 3 * 10, `(${dec(y, 1)})³ = ${dec(y ** 3, 3)}: three decimal places, not two.`, `(${dec(y, 1)})³ = ${dec(y ** 3, 3)}: তিন ঘর দশমিক, দুই ঘর নয়।`],
  ], [ans + 10, ans - 10, ans + 100, ans + 1].filter((v) => v > 0));
  return finish('decimal_squares_cubes', kind, 2, 60, stem, options, [
    T(`(${dec(x, 1)})² = ${dec(x * x, 2)} and (${dec(y, 1)})³ = ${dec(y ** 3, 3)}.`, `(${dec(x, 1)})² = ${dec(x * x, 2)} এবং (${dec(y, 1)})³ = ${dec(y ** 3, 3)}।`),
    T(`${dec(x * x, 2)} + ${dec(y ** 3, 3)} = ${dec(ans, 3)}.`, `${dec(x * x, 2)} + ${dec(y ** 3, 3)} = ${dec(ans, 3)}।`),
  ], T('Square/cube the digits, then place the decimal point: places × 2 for a square, × 3 for a cube.', 'অঙ্কগুলোর বর্গ/ঘন করো, তারপর দশমিক বসাও: বর্গে ঘর × 2, ঘনে × 3।'));
}

// ── 10. surds_indices_laws (fractional powers) ────────────────
const SI_KINDS = ['greatest', 'smallest', 'evaluate', 'evaluate_int'];
function powerTerm() {
  // returns { txt, v } with v in ten-thousandths (exact)
  const f = pick(['sq', 'half', 'third', 'frac', 'cube']);
  if (f === 'sq') { const d = ri(1, 9); return { txt: `(${dec(d, 1)})²`, v: d * d * 100, why: `(${dec(d, 1)})² = ${dec(d * d, 2)}` }; }
  if (f === 'cube') { const d = ri(2, 9); return { txt: `(${dec(d, 1)})³`, v: d ** 3 * 10, why: `(${dec(d, 1)})³ = ${dec(d ** 3, 3)}` }; }
  if (f === 'half') { const s = pick([1, 2]); const d = ri(1, 9); return { txt: `(${dec(d * d, 2 * s)})^(1/2)`, v: d * 10 ** (4 - s), why: `(${dec(d * d, 2 * s)})^(1/2) = ${dec(d, s)}` }; }
  if (f === 'third') { const d = ri(1, 9); return { txt: `(${dec(d ** 3, 3)})^(1/3)`, v: d * 1000, why: `(${dec(d ** 3, 3)})^(1/3) = ${dec(d, 1)}` }; }
  const q = pick([100, 50, 25, 20, 1000]); const p = ri(1, 9);
  const v = (p * 10000) / q;
  if (!Number.isInteger(v) || gcd(p, q) !== 1) return null;
  return { txt: `${p}/${q}`, v, why: `${p}/${q} = ${dec(v, 4)}` };
}
function surdsIndicesLaws(kind = pick(SI_KINDS)) {
  if (kind === 'greatest' || kind === 'smallest') {
    const terms = [];
    for (let t = 0; t < 30 && terms.length < 4; t++) {
      const x = powerTerm();
      if (x && !terms.some((y) => y.v === x.v || y.txt === x.txt)) terms.push(x);
    }
    if (terms.length < 4) return null;
    const best = kind === 'greatest' ? terms.reduce((a, b) => (b.v > a.v ? b : a)) : terms.reduce((a, b) => (b.v < a.v ? b : a));
    const stem = T(`Of ${terms.slice(0, 3).map((x) => x.txt).join(', ')} and ${terms[3].txt}, which one is the ${kind}?`, `${terms.slice(0, 3).map((x) => x.txt).join(', ')} এবং ${terms[3].txt}-এর মধ্যে কোনটি ${kind === 'greatest' ? 'বৃহত্তম' : 'ক্ষুদ্রতম'}?`);
    const wrong = terms.filter((x) => x !== best).map((x) => ({ ...same(x.txt), trap: T(`${x.why}.`, `${x.why}।`) }));
    return finish('surds_indices_laws', kind, 3, 75, stem, { correct: same(best.txt), wrong }, [
      T(`Values: ${terms.map((x) => x.why).join('; ')}.`, `মান: ${terms.map((x) => x.why).join('; ')}।`),
      T(`The ${kind} is ${best.txt} = ${dec(best.v, 4)}.`, `${kind === 'greatest' ? 'বৃহত্তম' : 'ক্ষুদ্রতম'} হল ${best.txt} = ${dec(best.v, 4)}।`),
    ], T('Turn each into a plain decimal: a power ^(1/2) halves the decimal places, ^(1/3) divides them by 3; squaring a decimal below 1 makes it smaller.', 'প্রতিটাকে সাধারণ দশমিকে আনো: ^(1/2) দশমিকের ঘর অর্ধেক করে, ^(1/3) তিন ভাগের এক ভাগ; 1-এর ছোট দশমিকের বর্গ আরও ছোট।'));
  }
  if (kind === 'evaluate') {
    const a = ri(1, 9); const b = ri(1, 9); const c = ri(1, 9);
    const ans = a * 10 + b * 10 - c * c; // hundredths: (a/10) + (b/10) − (c/10)²
    if (ans <= 0) return null;
    const stem = T(`Find the value of (${dec(a ** 3, 3)})^(1/3) + (${dec(b * b, 2)})^(1/2) ${MINUS} (${dec(c, 1)})².`, `(${dec(a ** 3, 3)})^(1/3) + (${dec(b * b, 2)})^(1/2) ${MINUS} (${dec(c, 1)})²-এর মান নির্ণয় করো।`);
    const options = opts(ans, (v) => dec(v, 2), [
      [a + b * 10 - c * c, `(${dec(a ** 3, 3)})^(1/3) = ${dec(a, 1)}, not ${dec(a, 2)}: the cube root has one third of the decimal places.`, `(${dec(a ** 3, 3)})^(1/3) = ${dec(a, 1)}, ${dec(a, 2)} নয়: ঘনমূলে দশমিকের ঘর তিন ভাগের এক ভাগ।`],
      [a * 10 + b * 10 - c * 10, `(${dec(c, 1)})² = ${dec(c * c, 2)}, not ${dec(c, 1)} doubled or unchanged.`, `(${dec(c, 1)})² = ${dec(c * c, 2)}।`],
    ], [ans + 10, ans - 10, ans + 100, ans + 1].filter((v) => v > 0));
    return finish('surds_indices_laws', kind, 3, 75, stem, options, [
      T(`(${dec(a ** 3, 3)})^(1/3) = ${dec(a, 1)}, (${dec(b * b, 2)})^(1/2) = ${dec(b, 1)}, (${dec(c, 1)})² = ${dec(c * c, 2)}.`, `(${dec(a ** 3, 3)})^(1/3) = ${dec(a, 1)}, (${dec(b * b, 2)})^(1/2) = ${dec(b, 1)}, (${dec(c, 1)})² = ${dec(c * c, 2)}।`),
      T(`So the value = ${dec(a, 1)} + ${dec(b, 1)} ${MINUS} ${dec(c * c, 2)} = ${dec(ans, 2)}.`, `অতএব মান = ${dec(a, 1)} + ${dec(b, 1)} ${MINUS} ${dec(c * c, 2)} = ${dec(ans, 2)}।`),
    ], T('x^(1/n) is the n-th root: write the decimal as a power of a one-decimal number first.', 'x^(1/n) মানে n-তম মূল: আগে দশমিকটাকে এক দশমিকের সংখ্যার ঘাত হিসেবে লেখো।'));
  }
  // integer bases: m^q raised to p/q, two terms added
  const t1 = pick([[2, 3], [3, 2], [2, 2], [3, 3], [4, 2], [5, 2], [2, 4], [2, 5], [3, 4], [6, 2], [7, 2], [4, 3]]);
  const t2 = pick([[2, 3], [3, 2], [2, 2], [3, 3], [4, 2], [5, 2], [2, 4], [2, 5], [3, 4], [6, 2]]);
  const term = ([m, q]) => { const p = pick(q === 2 ? [1, 3] : q === 3 ? [1, 2] : [3, 1]); return { m, q, p, base: m ** q, val: m ** p }; };
  const A = term(t1); const B = term(t2);
  if (A.base === B.base || A.val + B.val > 1000) return null;
  const ans = A.val + B.val;
  const stem = T(`Simplify: ${A.base}^(${A.p}/${A.q}) + ${B.base}^(${B.p}/${B.q})`, `সরল করো: ${A.base}^(${A.p}/${A.q}) + ${B.base}^(${B.p}/${B.q})`);
  const wrongMul = (A.base * A.p) / A.q + (B.base * B.p) / B.q;
  const options = opts(ans, String, [
    [Number.isInteger(wrongMul) ? wrongMul : null, 'The base was multiplied by the fraction; a fractional power means root, then power.', 'ভিত্তিকে ভগ্নাংশ দিয়ে গুণ করা হয়েছে; ভগ্নাংশ ঘাত মানে আগে মূল, তারপর ঘাত।'],
    [A.m + B.m, 'Only the roots were taken; the numerator of the power was forgotten.', 'শুধু মূল নেওয়া হয়েছে; ঘাতের লবটা ভুলে গেছ।'],
  ], [ans + 1, ans - 1, ans + 2, ans + 8].filter((v) => v > 0));
  return finish('surds_indices_laws', kind, 2, 60, stem, options, [
    T(`${A.base} = ${A.m}^${A.q}, so ${A.base}^(${A.p}/${A.q}) = ${A.m}^${A.p} = ${A.val}.`, `${A.base} = ${A.m}^${A.q}, তাই ${A.base}^(${A.p}/${A.q}) = ${A.m}^${A.p} = ${A.val}।`),
    T(`${B.base} = ${B.m}^${B.q}, so ${B.base}^(${B.p}/${B.q}) = ${B.m}^${B.p} = ${B.val}; sum = ${ans}.`, `${B.base} = ${B.m}^${B.q}, তাই ${B.base}^(${B.p}/${B.q}) = ${B.m}^${B.p} = ${B.val}; যোগফল = ${ans}।`),
  ], T('a^(p/q): take the q-th root first (keeps numbers small), then raise to p.', 'a^(p/q): আগে q-তম মূল নাও (সংখ্যা ছোট থাকে), তারপর p ঘাত।'));
}

/** A few internal retries so a rarely-valid framing does not count as a miss upstream. */
function retry(fn, kind, n = 40) {
  for (let i = 0; i < n; i++) { const q = fn(kind); if (q) return q; }
  return null;
}

const GENERATORS = {
  fraction_word_problem: [fractionWordProblem, FW_KINDS],
  near_whole_mixed_multiply: [nearWholeMixed, ['own', 'factor']],
  symbol_operations: [symbolOperations, ['meaning', 'swap_numbers', 'swap_signs', 'defined']],
  perfect_square_adjust: [perfectSquareAdjust, PS_KINDS],
  square_cube_roots: [squareCubeRoots, SR_KINDS],
  algebraic_identities: [algebraicIdentities, AI_KINDS],
  mixed_fraction_operations: [mixedFractionOps, MF_KINDS],
  fraction_chain_of: [fractionChainOf, FC_KINDS],
  decimal_squares_cubes: [decimalSquaresCubes, DS_KINDS],
  surds_indices_laws: [surdsIndicesLaws, SI_KINDS],
};

module.exports = {
  subject: 'quant',
  topics: [{
    topic: TOPIC,
    weight: 1,
    gens: Object.values(GENERATORS).flatMap(([fn, kinds]) => kinds.map((k) => () => retry(fn, k))),
  }],
  GENERATORS,
  fractionWordProblem,
  nearWholeMixed,
  symbolOperations,
  perfectSquareAdjust,
  squareCubeRoots,
  algebraicIdentities,
  mixedFractionOps,
  fractionChainOf,
  decimalSquaresCubes,
  surdsIndicesLaws,
};
