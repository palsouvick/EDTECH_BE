'use strict';

const { ri, pick, gcd, n2, T, numOptions, textOptions, build } = require('./common');

const rs = (v) => T(`₹${n2(v)}`, `₹${n2(v)}`);
const pc = (v) => T(`${n2(v)}%`, `${n2(v)}%`);
const plain = (v) => T(n2(v), n2(v));
const unit = (en, bn) => (v) => T(`${n2(v)} ${en}`, `${n2(v)} ${bn}`);
const signedPct = (v) =>
  v > 0 ? T(`${n2(v)}% increase`, `${n2(v)}% বৃদ্ধি`) : T(`${n2(-v)}% decrease`, `${n2(-v)}% হ্রাস`);
const profitLoss = (v) =>
  v > 0 ? T(`${n2(v)}% profit`, `${n2(v)}% লাভ`) : T(`${n2(-v)}% loss`, `${n2(-v)}% ক্ষতি`);

const rand01 = () => ri(0, 1) === 1;
// hint(value, en, bn) -> numOptions hint tuple
const hint = (v, en, bn) => [v, en, bn];

// ---------------------------------------------------------------- Percentage (শতকরা)
function pctOfNumber() {
  const p = pick([5, 8, 10, 12, 15, 16, 18, 20, 24, 25, 30, 35, 36, 40, 45, 55, 60, 65, 72, 75, 80, 85, 90]);
  const N = p % 5 === 0 ? 20 * ri(8, 400) : 100 * ri(3, 120);
  const ans = (p * N) / 100;
  const o = numOptions(ans, plain, [
    hint(ans * 10, 'Decimal slip: percent means "per hundred", not "per ten".', 'দশমিক ভুল: শতকরা মানে প্রতি একশোয়, প্রতি দশে নয়।'),
    hint(N - ans, `That is the remaining ${100 - p}%, not ${p}%.`, `এটি অবশিষ্ট ${100 - p}%, ${p}% নয়।`),
  ]);
  return build({
    topic: 'percentage', subtopic: 'percentage_of_number', tags: ['percentage'], difficulty: 1, time: 30,
    stem: T(`What is ${p}% of ${N}?`, `${N}-এর ${p}% কত?`),
    ...o,
    steps: [
      T(`${p}% of ${N} = (${p}/100) × ${N}`, `${N}-এর ${p}% = (${p}/100) × ${N}`),
      T(`= ${n2(ans)}`, `= ${n2(ans)}`),
    ],
    shortcut: T(`Find 1% first (${n2(N / 100)}) and multiply by ${p}.`, `আগে ১% বের করো (${n2(N / 100)}), তারপর ${p} দিয়ে গুণ করো।`),
  });
}

function numberAfterChange() {
  const up = rand01();
  const p = pick([5, 10, 15, 20, 25, 30, 40, 50]);
  const N = 20 * ri(5, 150);
  const k = up ? 100 + p : 100 - p;
  const X = (N * k) / 100;
  const o = numOptions(N, plain, [
    hint(up ? X - (X * p) / 100 : X + (X * p) / 100, `Applying ${p}% on the final value instead of the original number.`, `মূল সংখ্যার বদলে ফলাফলের উপর ${p}% প্রয়োগ করা হয়েছে।`),
  ]);
  return build({
    topic: 'percentage', subtopic: 'percentage_change', tags: ['percentage', 'reverse_percentage'], difficulty: 2, time: 45,
    stem: up
      ? T(`A number is increased by ${p}% and the result is ${n2(X)}. What is the original number?`, `একটি সংখ্যা ${p}% বৃদ্ধি করায় ${n2(X)} হলো। মূল সংখ্যাটি কত?`)
      : T(`A number is decreased by ${p}% and the result is ${n2(X)}. What is the original number?`, `একটি সংখ্যা ${p}% হ্রাস করায় ${n2(X)} হলো। মূল সংখ্যাটি কত?`),
    ...o,
    steps: [
      T(`Let the original number be 100 parts. After the change it is ${k} parts.`, `ধরি, মূল সংখ্যা 100 অংশ। পরিবর্তনের পর হয় ${k} অংশ।`),
      T(`${k} parts = ${n2(X)}, so original = ${n2(X)} × 100 / ${k} = ${n2(N)}`, `${k} অংশ = ${n2(X)}, সুতরাং মূল সংখ্যা = ${n2(X)} × 100 / ${k} = ${n2(N)}`),
    ],
    shortcut: T('Original = Result × 100 / (100 ± change%).', 'মূল সংখ্যা = ফলাফল × 100 / (100 ± পরিবর্তনের শতকরা)।'),
  });
}

function whatPercent() {
  const p = pick([5, 10, 12.5, 20, 25, 30, 37.5, 40, 50, 60, 62.5, 75, 80, 120, 125, 150]);
  const B = 40 * ri(2, 60);
  const A = (p * B) / 100;
  const o = numOptions(p, pc, [
    hint((B / A) * 100, 'Inverted the ratio: percent = part / whole × 100, not whole / part.', 'অনুপাত উল্টে গেছে: শতকরা = অংশ / সম্পূর্ণ × 100।'),
  ]);
  return build({
    topic: 'percentage', subtopic: 'what_percent', tags: ['percentage'], difficulty: 1, time: 35,
    stem: T(`${A} is what percent of ${B}?`, `${A} হলো ${B}-এর কত শতাংশ?`),
    ...o,
    steps: [T(`Percent = (${A} / ${B}) × 100`, `শতকরা = (${A} / ${B}) × 100`), T(`= ${n2(p)}%`, `= ${n2(p)}%`)],
    shortcut: T('Percent = (part ÷ whole) × 100; the whole is the number after "of".', 'শতকরা = (অংশ ÷ সম্পূর্ণ) × 100; "-এর" এর আগের সংখ্যাটিই সম্পূর্ণ।'),
  });
}

function successivePct() {
  const a = pick([10, 20, 30, 40, 50]);
  const b = pick([10, 20, 30, 40, 50]);
  const net = a - b - (a * b) / 100;
  if (net === 0) return null;
  const o = numOptions(net, signedPct, [
    hint(a - b || 1, 'Subtracting directly ignores the compounding term ab/100.', 'সরাসরি বিয়োগ করায় ab/100 অংশটি বাদ পড়েছে।'),
  ], { neg: true });
  return build({
    topic: 'percentage', subtopic: 'successive_percentage_change', tags: ['percentage', 'successive_percentage'], difficulty: 3, time: 60,
    stem: T(`The price of an article is first increased by ${a}% and then decreased by ${b}%. What is the net change in price?`, `একটি জিনিসের দাম প্রথমে ${a}% বাড়ানো হলো, তারপর ${b}% কমানো হলো। দামের নেট পরিবর্তন কত?`),
    ...o,
    steps: [
      T(`Net change = a + b + ab/100 with a = +${a}, b = −${b}`, `নেট পরিবর্তন = a + b + ab/100, যেখানে a = +${a}, b = −${b}`),
      T(`= ${a} − ${b} − ${(a * b) / 100} = ${n2(net)}%`, `= ${a} − ${b} − ${(a * b) / 100} = ${n2(net)}%`),
    ],
    shortcut: T('Successive changes: a + b + ab/100 (use a negative sign for a decrease).', 'ক্রমিক পরিবর্তন: a + b + ab/100 (হ্রাসের জন্য ঋণাত্মক চিহ্ন বসাও)।'),
  });
}

// ---------------------------------------------------------------- Profit & Loss (লাভ ও ক্ষতি)
function plSellingPrice() {
  const gain = rand01();
  const p = pick([5, 10, 15, 20, 25, 30, 40, 50]);
  const CP = 20 * ri(10, 400);
  const k = gain ? 100 + p : 100 - p;
  const SP = (CP * k) / 100;
  const o = numOptions(SP, rs, [
    hint(gain ? CP - (CP * p) / 100 : CP + (CP * p) / 100, `${gain ? 'Subtracted' : 'Added'} the percentage instead of ${gain ? 'adding' : 'subtracting'} it.`, 'শতকরা অংশ ভুল চিহ্নে যোগ/বিয়োগ করা হয়েছে।'),
  ]);
  return build({
    topic: 'profit_loss', subtopic: gain ? 'profit_percent' : 'loss_percent', tags: ['profit', 'selling_price'], difficulty: 1, time: 40,
    stem: T(`An article bought for ₹${CP} is sold at a ${gain ? 'profit' : 'loss'} of ${p}%. Find the selling price.`, `₹${CP} ক্রয়মূল্যের একটি জিনিস ${p}% ${gain ? 'লাভে' : 'ক্ষতিতে'} বিক্রি করা হলো। বিক্রয়মূল্য কত?`),
    ...o,
    steps: [
      T(`SP = CP × (100 ${gain ? '+' : '−'} ${p}) / 100`, `বিক্রয়মূল্য = ক্রয়মূল্য × (100 ${gain ? '+' : '−'} ${p}) / 100`),
      T(`= ${CP} × ${k} / 100 = ₹${n2(SP)}`, `= ${CP} × ${k} / 100 = ₹${n2(SP)}`),
    ],
    shortcut: T(`Multiply CP by ${k / 100}.`, `ক্রয়মূল্যকে ${k / 100} দিয়ে গুণ করো।`),
  });
}

function plCostPrice() {
  const gain = rand01();
  const p = pick([5, 10, 20, 25, 30, 40, 50]);
  const CP = 20 * ri(10, 300);
  const k = gain ? 100 + p : 100 - p;
  const SP = (CP * k) / 100;
  const o = numOptions(CP, rs, [
    hint(gain ? SP - (SP * p) / 100 : SP + (SP * p) / 100, `Taking ${p}% of the selling price; profit/loss % is always on the cost price.`, `বিক্রয়মূল্যের ${p}% ধরা হয়েছে; লাভ/ক্ষতির শতকরা সর্বদা ক্রয়মূল্যের উপর।`),
  ]);
  return build({
    topic: 'profit_loss', subtopic: 'find_cost_price', tags: ['profit', 'cost_price'], difficulty: 2, time: 45,
    stem: T(`By selling an article for ₹${n2(SP)}, a trader makes a ${gain ? 'profit' : 'loss'} of ${p}%. What is the cost price?`, `₹${n2(SP)} দামে একটি জিনিস বিক্রি করে এক ব্যবসায়ীর ${p}% ${gain ? 'লাভ' : 'ক্ষতি'} হয়। ক্রয়মূল্য কত?`),
    ...o,
    steps: [
      T(`SP = CP × ${k}/100`, `বিক্রয়মূল্য = ক্রয়মূল্য × ${k}/100`),
      T(`CP = ${n2(SP)} × 100 / ${k} = ₹${n2(CP)}`, `ক্রয়মূল্য = ${n2(SP)} × 100 / ${k} = ₹${n2(CP)}`),
    ],
    shortcut: T('CP = SP × 100 / (100 ± p).', 'ক্রয়মূল্য = বিক্রয়মূল্য × 100 / (100 ± p)।'),
  });
}

function plMarkupDiscount() {
  const m = pick([20, 30, 40, 50, 60]);
  const d = pick([10, 20, 30, 40]);
  const net = m - d - (m * d) / 100;
  if (net === 0) return null;
  const sp = ((100 + m) * (100 - d)) / 100;
  const o = numOptions(net, profitLoss, [
    hint(m - d || 1, 'Discount is on the marked price (larger than CP), so it cannot be subtracted directly.', 'ছাড় ধার্যমূল্যের উপর (যা ক্রয়মূল্যের চেয়ে বেশি), তাই সরাসরি বিয়োগ করা যায় না।'),
  ], { neg: true });
  return build({
    topic: 'profit_loss', subtopic: 'marked_price_discount', tags: ['profit', 'discount', 'marked_price'], difficulty: 3, time: 60,
    stem: T(`A shopkeeper marks his goods ${m}% above the cost price and allows a discount of ${d}%. What is his profit or loss percentage?`, `এক দোকানদার ক্রয়মূল্যের ${m}% বেশি ধার্যমূল্য রেখে ${d}% ছাড় দেন। তাঁর শতকরা লাভ বা ক্ষতি কত?`),
    ...o,
    steps: [
      T(`Let CP = ₹100, so MP = ₹${100 + m}`, `ধরি, ক্রয়মূল্য = ₹100, তাহলে ধার্যমূল্য = ₹${100 + m}`),
      T(`SP = ${100 + m} × ${100 - d}/100 = ₹${n2(sp)}`, `বিক্রয়মূল্য = ${100 + m} × ${100 - d}/100 = ₹${n2(sp)}`),
      T(`Net = SP − CP = ${n2(sp - 100)}, i.e. ${n2(net)}% on CP`, `নেট = বিক্রয়মূল্য − ক্রয়মূল্য = ${n2(sp - 100)}, অর্থাৎ ক্রয়মূল্যের ${n2(net)}%`),
    ],
    shortcut: T(`Treat as successive changes: ${m} − ${d} − ${m}×${d}/100.`, `ক্রমিক পরিবর্তন ধরো: ${m} − ${d} − ${m}×${d}/100।`),
  });
}

function plSamePriceTwoArticles() {
  const p = pick([5, 10, 15, 20, 25, 30]);
  const loss = (p * p) / 100;
  const o = numOptions(loss, pc, [
    hint(p / 2, 'Gain and loss do not cancel: the percentages are on different cost prices.', 'লাভ ও ক্ষতি কাটাকাটি হয় না: শতকরা দুটি ভিন্ন ক্রয়মূল্যের উপর।'),
  ]);
  return build({
    topic: 'profit_loss', subtopic: 'two_articles_same_price', tags: ['profit', 'loss'], difficulty: 3, time: 50,
    stem: T(`Two articles are sold at the same price; one at a gain of ${p}% and the other at a loss of ${p}%. What is the overall loss percent?`, `দুটি জিনিস একই দামে বিক্রি হলো; একটিতে ${p}% লাভ এবং অন্যটিতে ${p}% ক্ষতি। মোট শতকরা ক্ষতি কত?`),
    ...o,
    steps: [T(`Overall loss % = (p/10)² = (${p}/10)²`, `মোট শতকরা ক্ষতি = (p/10)² = (${p}/10)²`), T(`= ${n2(loss)}%`, `= ${n2(loss)}%`)],
    shortcut: T('Equal SP with equal gain and loss percent ⇒ always a loss of p²/100 %.', 'সমান বিক্রয়মূল্য ও সমান শতকরা লাভ-ক্ষতি হলে সর্বদা p²/100 % ক্ষতি।'),
  });
}

function plArticlesExchange() {
  const y = pick([4, 5, 10, 20, 25]);
  const extra = pick([1, 2, 3, 4, 5]);
  const x = y + extra;
  const gain = (extra * 100) / y;
  const o = numOptions(gain, pc, [
    hint((extra * 100) / x, 'Percent gain is on the cost price, so divide by the number of articles sold (y), not x.', 'শতকরা লাভ ক্রয়মূল্যের উপর, তাই ভাজক হবে বিক্রিত সংখ্যা (y), x নয়।'),
  ]);
  return build({
    topic: 'profit_loss', subtopic: 'cp_sp_articles', tags: ['profit'], difficulty: 3, time: 55,
    stem: T(`The cost price of ${x} articles is equal to the selling price of ${y} articles. Find the gain percent.`, `${x}টি জিনিসের ক্রয়মূল্য ${y}টি জিনিসের বিক্রয়মূল্যের সমান। শতকরা লাভ কত?`),
    ...o,
    steps: [
      T(`Let the CP of each article be 1. Then CP of ${x} = ${x} = SP of ${y}.`, `ধরি, প্রতিটির ক্রয়মূল্য = 1। তাহলে ${x}টির ক্রয়মূল্য = ${x} = ${y}টির বিক্রয়মূল্য।`),
      T(`Gain % = (${x} − ${y}) / ${y} × 100 = ${n2(gain)}%`, `লাভ % = (${x} − ${y}) / ${y} × 100 = ${n2(gain)}%`),
    ],
    shortcut: T('Gain % = (more − less) / less × 100.', 'লাভ % = (বেশি − কম) / কম × 100।'),
  });
}

// ---------------------------------------------------------------- Ratio & Proportion (অনুপাত ও সমানুপাত)
function ratioTwoShares() {
  const a = ri(1, 9), b = ri(1, 9);
  if (a === b) return null;
  const tot = (a + b) * 10 * ri(3, 60);
  const big = Math.max(a, b);
  const ans = (tot * big) / (a + b);
  const o = numOptions(ans, rs, [
    hint((tot * Math.min(a, b)) / (a + b), 'That is the smaller share.', 'এটি ছোট অংশ।'),
  ]);
  return build({
    topic: 'ratio_proportion', subtopic: 'dividing_in_ratio', tags: ['ratio'], difficulty: 1, time: 40,
    stem: T(`₹${tot} is divided between two persons in the ratio ${a} : ${b}. What is the larger share?`, `₹${tot} দুইজনের মধ্যে ${a} : ${b} অনুপাতে ভাগ করা হলো। বড় অংশটি কত?`),
    ...o,
    steps: [T(`Sum of ratio parts = ${a} + ${b} = ${a + b}`, `অনুপাতের অংশের সমষ্টি = ${a} + ${b} = ${a + b}`), T(`Larger share = ${tot} × ${big}/${a + b} = ₹${n2(ans)}`, `বড় অংশ = ${tot} × ${big}/${a + b} = ₹${n2(ans)}`)],
    shortcut: T('Share = Total × (its ratio part / sum of parts).', 'অংশ = মোট × (তার অনুপাতের অংশ / অনুপাতের সমষ্টি)।'),
  });
}

function ratioThreeShares() {
  const a = ri(1, 6), b = ri(2, 8), c = ri(3, 9);
  if (new Set([a, b, c]).size < 3) return null;
  const S = a + b + c;
  const tot = S * 10 * ri(3, 50);
  const idx = ri(0, 2);
  const part = [a, b, c][idx];
  const label = ['first', 'second', 'third'][idx];
  const labelBn = ['প্রথম', 'দ্বিতীয়', 'তৃতীয়'][idx];
  const ans = (tot * part) / S;
  const o = numOptions(ans, rs, [hint(tot / 3, 'The shares are not equal; they follow the ratio.', 'অংশগুলি সমান নয়; অনুপাত অনুযায়ী ভাগ হবে।')]);
  return build({
    topic: 'ratio_proportion', subtopic: 'three_way_division', tags: ['ratio'], difficulty: 2, time: 50,
    stem: T(`₹${tot} is divided among three persons in the ratio ${a} : ${b} : ${c}. What does the ${label} person get?`, `₹${tot} তিনজনের মধ্যে ${a} : ${b} : ${c} অনুপাতে ভাগ করা হলো। ${labelBn} ব্যক্তি কত পাবেন?`),
    ...o,
    steps: [T(`Total parts = ${S}; one part = ₹${n2(tot / S)}`, `মোট অংশ = ${S}; এক অংশ = ₹${n2(tot / S)}`), T(`Share = ${part} × ${n2(tot / S)} = ₹${n2(ans)}`, `অংশ = ${part} × ${n2(tot / S)} = ₹${n2(ans)}`)],
    shortcut: T('Find the value of one ratio part, then multiply.', 'এক অনুপাত-অংশের মান বের করে গুণ করো।'),
  });
}

function fourthProportional() {
  const a = ri(2, 12), m = ri(2, 9), c = ri(2, 15);
  const b = a * m, x = c * m;
  const o = numOptions(x, plain, [hint(Math.round((a * c) / b) || 1, 'Cross-multiplied the wrong pair.', 'ভুল জোড়া আড়গুণন করা হয়েছে।')]);
  return build({
    topic: 'ratio_proportion', subtopic: 'fourth_proportional', tags: ['proportion'], difficulty: 2, time: 40,
    stem: T(`If ${a} : ${b} = ${c} : x, find the value of x.`, `যদি ${a} : ${b} = ${c} : x হয়, তবে x-এর মান নির্ণয় করো।`),
    ...o,
    steps: [T(`Product of extremes = product of means: ${a} × x = ${b} × ${c}`, `প্রান্তীয় পদের গুণফল = মধ্যপদের গুণফল: ${a} × x = ${b} × ${c}`), T(`x = ${b * c}/${a} = ${x}`, `x = ${b * c}/${a} = ${x}`)],
    shortcut: T('x = (second × third) / first.', 'x = (দ্বিতীয় × তৃতীয়) / প্রথম।'),
  });
}

function ratioSumDifference() {
  const a = ri(2, 9), b = ri(2, 9);
  if (a === b) return null;
  const k = ri(2, 30);
  const sum = (a + b) * k, diff = Math.abs(a - b) * k;
  const o = numOptions(diff, plain, [hint(sum, 'That is the sum, not the difference.', 'এটি যোগফল, অন্তর নয়।')]);
  return build({
    topic: 'ratio_proportion', subtopic: 'ratio_sum_difference', tags: ['ratio'], difficulty: 2, time: 45,
    stem: T(`Two numbers are in the ratio ${a} : ${b} and their sum is ${sum}. What is their difference?`, `দুটি সংখ্যার অনুপাত ${a} : ${b} এবং তাদের যোগফল ${sum}। সংখ্যা দুটির অন্তর কত?`),
    ...o,
    steps: [T(`One part = ${sum}/(${a}+${b}) = ${k}`, `এক অংশ = ${sum}/(${a}+${b}) = ${k}`), T(`Difference = |${a} − ${b}| × ${k} = ${diff}`, `অন্তর = |${a} − ${b}| × ${k} = ${diff}`)],
    shortcut: T('Difference = sum × (difference of parts / sum of parts).', 'অন্তর = যোগফল × (অংশের অন্তর / অংশের সমষ্টি)।'),
  });
}

function compoundRatio() {
  const [a, b, c, d] = [ri(1, 9), ri(1, 9), ri(1, 9), ri(1, 9)];
  const fmt = (x, y) => {
    const g = gcd(x, y);
    return T(`${x / g} : ${y / g}`, `${x / g} : ${y / g}`);
  };
  const ans = fmt(a * c, b * d);
  const pool = [fmt(a * d, b * c), fmt(b * d, a * c), fmt(a * c, b * c), fmt(a * d, b * d), fmt(a + c, b + d)];
  const { wrong } = textOptions(ans, pool);
  if (wrong.length < 3) return null;
  wrong[0].trap = T('Compound ratio multiplies like terms: A : C = (a×c) : (b×d); the mixed product is a trap.', 'যৌগিক অনুপাতে সমজাতীয় পদ গুণ হয়: A : C = (a×c) : (b×d); মিশ্র গুণফল ভুল।');
  return build({
    topic: 'ratio_proportion', subtopic: 'compound_ratio', tags: ['ratio'], difficulty: 3, time: 60,
    stem: T(`If A : B = ${a} : ${b} and B : C = ${c} : ${d}, then A : C = ?`, `A : B = ${a} : ${b} এবং B : C = ${c} : ${d} হলে A : C = ?`),
    correct: ans, wrong,
    steps: [T(`A : B : C = (${a}×${c}) : (${b}×${c}) : (${b}×${d})`, `A : B : C = (${a}×${c}) : (${b}×${c}) : (${b}×${d})`), T(`A : C = ${a * c} : ${b * d} = ${ans.en}`, `A : C = ${a * c} : ${b * d} = ${ans.en}`)],
    shortcut: T('A : C = (a × c) : (b × d), then reduce.', 'A : C = (a × c) : (b × d), তারপর সরল করো।'),
  });
}

// ---------------------------------------------------------------- Simple & Compound Interest (সরল ও চক্রবৃদ্ধি সুদ)
function siFindInterest() {
  const P = 200 * ri(2, 100), R = ri(3, 15), t = pick([1, 2, 3, 4, 5, 6, 2.5, 1.5, 3.5]);
  const SI = (P * R * t) / 100;
  const o = numOptions(SI, rs, [hint(P + SI, 'That is the amount (principal + interest), not the interest.', 'এটি সুদাসল (আসল + সুদ), শুধু সুদ নয়।')]);
  return build({
    topic: 'simple_compound_interest', subtopic: 'simple_interest', tags: ['simple_interest'], difficulty: 1, time: 40,
    stem: T(`Find the simple interest on ₹${P} at ${R}% per annum for ${t} ${t === 1 ? 'year' : 'years'}.`, `₹${P} টাকার বার্ষিক ${R}% হারে ${t} বছরের সরল সুদ নির্ণয় করো।`),
    ...o,
    steps: [T('SI = P × R × T / 100', 'সরল সুদ = আসল × হার × সময় / 100'), T(`= ${P} × ${R} × ${t} / 100 = ₹${n2(SI)}`, `= ${P} × ${R} × ${t} / 100 = ₹${n2(SI)}`)],
    shortcut: T("Find 1 year's interest (P × R / 100) and multiply by the years.", 'এক বছরের সুদ (আসল × হার / 100) বের করে বছর দিয়ে গুণ করো।'),
  });
}

function siFindRate() {
  const P = 500 * ri(2, 60), R = ri(3, 15), t = ri(2, 8);
  const SI = (P * R * t) / 100;
  const o = numOptions(R, pc, [hint(R * t, 'Forgot to divide by time.', 'সময় দিয়ে ভাগ করা হয়নি।')]);
  return build({
    topic: 'simple_compound_interest', subtopic: 'find_rate', tags: ['simple_interest'], difficulty: 2, time: 45,
    stem: T(`At what rate percent per annum will ₹${P} earn a simple interest of ₹${SI} in ${t} ${t === 1 ? 'year' : 'years'}?`, `বার্ষিক শতকরা কত হার সুদে ₹${P} টাকা ${t} বছরে ₹${SI} সরল সুদ দেবে?`),
    ...o,
    steps: [T('R = SI × 100 / (P × T)', 'হার = সুদ × 100 / (আসল × সময়)'), T(`= ${SI} × 100 / (${P} × ${t}) = ${R}%`, `= ${SI} × 100 / (${P} × ${t}) = ${R}%`)],
    shortcut: T('Rate = (SI / P) × (100 / T).', 'হার = (সুদ / আসল) × (100 / সময়)।'),
  });
}

function siFindPrincipal() {
  const R = pick([4, 5, 6, 8, 10, 12]), t = ri(2, 6), P = 250 * ri(2, 80);
  const SI = (P * R * t) / 100;
  const o = numOptions(P, rs, [hint(P + SI, 'Added the interest; the question asks for the sum lent.', 'সুদ যোগ করা হয়েছে; প্রশ্নে আসল চাওয়া হয়েছে।')]);
  return build({
    topic: 'simple_compound_interest', subtopic: 'find_principal', tags: ['simple_interest'], difficulty: 2, time: 45,
    stem: T(`A sum of money earns a simple interest of ₹${SI} in ${t} ${t === 1 ? 'year' : 'years'} at ${R}% per annum. Find the sum.`, `বার্ষিক ${R}% সরল সুদে একটি অর্থ ${t} বছরে ₹${SI} সুদ দেয়। আসল অর্থ কত?`),
    ...o,
    steps: [T('P = SI × 100 / (R × T)', 'আসল = সুদ × 100 / (হার × সময়)'), T(`= ${SI} × 100 / (${R} × ${t}) = ₹${P}`, `= ${SI} × 100 / (${R} × ${t}) = ₹${P}`)],
    shortcut: T('Principal = SI ÷ (R × T / 100).', 'আসল = সুদ ÷ (হার × সময় / 100)।'),
  });
}

function siDoubling() {
  const n = pick([4, 5, 8, 10, 20, 25]);
  const R = 100 / n;
  const o = numOptions(R, pc, [hint(n, 'Rate is 100 divided by the years, not the number of years itself.', 'হার = 100 ÷ বছর; বছরের সংখ্যাটিই হার নয়।')]);
  return build({
    topic: 'simple_compound_interest', subtopic: 'doubling_time', tags: ['simple_interest'], difficulty: 2, time: 40,
    stem: T(`A sum becomes double in ${n} ${n === 1 ? 'year' : 'years'} at simple interest. What is the rate of interest per annum?`, `সরল সুদে একটি অর্থ ${n} বছরে দ্বিগুণ হয়। বার্ষিক সুদের হার কত?`),
    ...o,
    steps: [T(`Interest = Principal, so P = P × R × ${n} / 100`, `সুদ = আসল, সুতরাং P = P × R × ${n} / 100`), T(`R = 100/${n} = ${n2(R)}%`, `R = 100/${n} = ${n2(R)}%`)],
    shortcut: T('Doubling at SI: R × T = 100.', 'সরল সুদে দ্বিগুণ হলে: R × T = 100।'),
  });
}

function ciCompound() {
  const R = pick([4, 5, 8, 10, 12, 20]);
  const t = pick([2, 2, 3]);
  const base = 100 ** t, f = (100 + R) ** t;
  const step = base / gcd(base, f);
  const P = step * ri(1, Math.max(1, Math.floor(20000 / step)));
  const A = (P * f) / base;
  const ci = A - P;
  const si = (P * R * t) / 100;
  const o = numOptions(ci, rs, [hint(si, 'That is the simple interest; compound interest earns interest on interest.', 'এটি সরল সুদ; চক্রবৃদ্ধি সুদে সুদের উপরও সুদ ধরা হয়।')]);
  return build({
    topic: 'simple_compound_interest', subtopic: 'compound_interest', tags: ['compound_interest'], difficulty: 3, time: 75,
    stem: T(`Find the compound interest on ₹${P} for ${t} ${t === 1 ? 'year' : 'years'} at ${R}% per annum, compounded annually.`, `বার্ষিক ${R}% চক্রবৃদ্ধি হারে ₹${P} টাকার ${t} বছরের চক্রবৃদ্ধি সুদ নির্ণয় করো (সুদ বার্ষিক যুক্ত হয়)।`),
    ...o,
    steps: [
      T(`A = P(1 + R/100)^n = ${P} × (${100 + R}/100)^${t} = ₹${n2(A)}`, `সুদাসল = আসল(1 + হার/100)^সময় = ${P} × (${100 + R}/100)^${t} = ₹${n2(A)}`),
      T(`CI = A − P = ${n2(A)} − ${P} = ₹${n2(ci)}`, `চক্রবৃদ্ধি সুদ = সুদাসল − আসল = ${n2(A)} − ${P} = ₹${n2(ci)}`),
    ],
    shortcut: T(`Multiply by ${(100 + R) / 100} once per year, then subtract P.`, `প্রতি বছর ${(100 + R) / 100} দিয়ে গুণ করো, শেষে আসল বিয়োগ করো।`),
  });
}

function ciMinusSi() {
  const R = pick([5, 10, 20, 4, 8, 12]);
  const step = 10000 / gcd(10000, R * R);
  const P = step * ri(1, Math.max(1, Math.floor(50000 / step)));
  const diff = (P * R * R) / 10000;
  const o = numOptions(diff, rs, [hint((P * R) / 100, "That is one year's interest, not the CI − SI difference.", 'এটি এক বছরের সুদ, চক্রবৃদ্ধি ও সরল সুদের পার্থক্য নয়।')]);
  return build({
    topic: 'simple_compound_interest', subtopic: 'ci_si_difference', tags: ['compound_interest', 'simple_interest'], difficulty: 4, time: 60,
    stem: T(`What is the difference between the compound interest and the simple interest on ₹${P} for 2 years at ${R}% per annum?`, `বার্ষিক ${R}% হারে ₹${P} টাকার 2 বছরের চক্রবৃদ্ধি সুদ ও সরল সুদের পার্থক্য কত?`),
    ...o,
    steps: [T('For 2 years, CI − SI = P × (R/100)²', '2 বছরের জন্য, চক্রবৃদ্ধি সুদ − সরল সুদ = আসল × (হার/100)²'), T(`= ${P} × (${R}/100)² = ₹${n2(diff)}`, `= ${P} × (${R}/100)² = ₹${n2(diff)}`)],
    shortcut: T('2-year difference formula: P × R² / 10000.', '2 বছরের পার্থক্যের সূত্র: আসল × হার² / 10000।'),
  });
}

// ---------------------------------------------------------------- Time & Work (সময় ও কাজ)
function twPair() {
  const m = ri(1, 4), n = ri(1, 4);
  if (m === n || gcd(m, n) !== 1) return null;
  const s = ri(1, 5);
  return { a: s * m * (m + n), b: s * n * (m + n), t: s * m * n, m, n, s };
}

function twTogether() {
  const p = twPair();
  if (!p) return null;
  const o = numOptions(p.t, unit('days', 'দিন'), [hint((p.a + p.b) / 2, 'Averaging the two times is wrong; add the rates, not the times.', 'সময় দুটির গড় নেওয়া ভুল; কাজের হার যোগ করতে হয়।')]);
  return build({
    topic: 'time_work', subtopic: 'working_together', tags: ['time_work'], difficulty: 2, time: 50,
    stem: T(`A can complete a work in ${p.a} days and B in ${p.b} days. In how many days will they finish it working together?`, `ক একটি কাজ ${p.a} দিনে এবং খ ${p.b} দিনে শেষ করতে পারে। একসঙ্গে কাজ করলে কত দিনে শেষ হবে?`),
    ...o,
    steps: [T(`One day's work together = 1/${p.a} + 1/${p.b}`, `একসঙ্গে একদিনের কাজ = 1/${p.a} + 1/${p.b}`), T(`Time = ${p.a} × ${p.b} / (${p.a} + ${p.b}) = ${p.t} days`, `সময় = ${p.a} × ${p.b} / (${p.a} + ${p.b}) = ${p.t} দিন`)],
    shortcut: T('Together = (a × b) / (a + b).', 'একসঙ্গে সময় = (a × b) / (a + b)।'),
  });
}

function twFindOther() {
  const p = twPair();
  if (!p) return null;
  const o = numOptions(p.b, unit('days', 'দিন'), [hint(p.a - p.t, 'Subtracting times is wrong; subtract rates (1/t − 1/a).', 'সময় বিয়োগ ভুল; কাজের হার বিয়োগ করতে হয় (1/t − 1/a)।')]);
  return build({
    topic: 'time_work', subtopic: 'find_individual_time', tags: ['time_work'], difficulty: 3, time: 60,
    stem: T(`A and B together can do a piece of work in ${p.t} days. A alone can do it in ${p.a} days. In how many days can B alone do it?`, `ক ও খ একসঙ্গে একটি কাজ ${p.t} দিনে করতে পারে। ক একা ${p.a} দিনে করতে পারে। খ একা কত দিনে করতে পারবে?`),
    ...o,
    steps: [T(`B's one day's work = 1/${p.t} − 1/${p.a}`, `খ-এর একদিনের কাজ = 1/${p.t} − 1/${p.a}`), T(`= ${p.a - p.t}/(${p.t} × ${p.a}) ⇒ B takes ${p.b} days`, `= ${p.a - p.t}/(${p.t} × ${p.a}) ⇒ খ একা সময় নেবে ${p.b} দিন`)],
    shortcut: T('B = (a × t) / (a − t).', 'খ = (a × t) / (a − t)।'),
  });
}

/** Reduced fraction text: frac(20, 56) -> "5/14". */
const frac = (num, den) => {
  const g = gcd(num, den);
  return `${num / g}/${den / g}`;
};

function twLeaves() {
  const p = twPair();
  if (!p) return null;
  const j = ri(1, p.s * (p.m + p.n) - 1);
  const d = p.m * j;
  const left = p.b - p.n * j;
  if (left <= 0) return null;
  const o = numOptions(left, unit('days', 'দিন'), [hint(p.b - d, 'Days of different workers cannot be subtracted directly; convert work done into a fraction first.', 'ভিন্ন কর্মীর দিন সরাসরি বিয়োগ করা যায় না; আগে কাজকে ভগ্নাংশে রূপান্তর করো।')]);
  return build({
    topic: 'time_work', subtopic: 'partial_work', tags: ['time_work'], difficulty: 4, time: 80,
    stem: T(`A can finish a job in ${p.a} days and B in ${p.b} days. A works for ${d} days and then leaves. In how many more days will B finish the remaining work?`, `ক একটি কাজ ${p.a} দিনে এবং খ ${p.b} দিনে শেষ করতে পারে। ক ${d} দিন কাজ করে চলে গেল। বাকি কাজ শেষ করতে খ-এর আরও কত দিন লাগবে?`),
    ...o,
    steps: [
      // Exact fractions: rounded decimals (0.64 × 42) do not multiply out to the stated answer.
      T(`A's work in ${d} days = ${frac(d, p.a)}`, `${d} দিনে ক-এর কাজ = ${frac(d, p.a)}`),
      T(`Remaining = 1 − ${frac(d, p.a)} = ${frac(p.a - d, p.a)}; B needs ${frac(p.a - d, p.a)} × ${p.b} = ${left} days`, `বাকি কাজ = 1 − ${frac(d, p.a)} = ${frac(p.a - d, p.a)}; খ-এর লাগবে ${frac(p.a - d, p.a)} × ${p.b} = ${left} দিন`),
    ],
    shortcut: T("Convert to fractions of work: remaining × B's total days.", 'কাজকে ভগ্নাংশে ধরে: বাকি কাজ × খ-এর মোট দিন।'),
  });
}

function twEfficiency() {
  const k = pick([2, 3, 4]);
  const s = ri(2, 15);
  const b = (k + 1) * s;
  const o = numOptions(s, unit('days', 'দিন'), [hint(b / k, 'That is A alone, not A and B together.', 'এটি শুধু ক-এর সময়, দুজনের একসঙ্গে সময় নয়।')]);
  return build({
    topic: 'time_work', subtopic: 'efficiency_ratio', tags: ['time_work', 'efficiency'], difficulty: 3, time: 55,
    stem: T(`A is ${k} times as efficient as B. B alone can finish a work in ${b} days. In how many days can A and B together finish it?`, `ক, খ-এর চেয়ে ${k} গুণ দক্ষ। খ একা কাজটি ${b} দিনে শেষ করতে পারে। দুজন একসঙ্গে কত দিনে শেষ করবে?`),
    ...o,
    steps: [T(`Efficiency A : B = ${k} : 1; total work = ${b} units (B does 1 unit/day)`, `দক্ষতা ক : খ = ${k} : 1; মোট কাজ = ${b} একক (খ প্রতিদিন 1 একক করে)`), T(`Together = ${k + 1} units/day ⇒ ${b}/${k + 1} = ${s} days`, `একসঙ্গে প্রতিদিন ${k + 1} একক ⇒ ${b}/${k + 1} = ${s} দিন`)],
    shortcut: T('Take total work = LCM; add daily efficiencies.', 'মোট কাজ = ল.সা.গু. ধরে প্রতিদিনের দক্ষতা যোগ করো।'),
  });
}

function twWages() {
  const p = twPair();
  if (!p) return null;
  const W = (p.m + p.n) * 100 * ri(1, 20);
  const aShare = (W * p.n) / (p.m + p.n);
  const o = numOptions(aShare, rs, [hint(W / 2, 'Wages are shared in the ratio of work done (inverse of days), not equally.', 'মজুরি কাজের অনুপাতে (দিনের বিপরীত অনুপাতে) ভাগ হয়, সমান নয়।')]);
  return build({
    topic: 'time_work', subtopic: 'wages_sharing', tags: ['time_work', 'wages'], difficulty: 4, time: 70,
    stem: T(`A and B can complete a work in ${p.a} and ${p.b} days respectively. They are paid ₹${W} for doing it together. What is A's share?`, `ক ও খ একটি কাজ যথাক্রমে ${p.a} ও ${p.b} দিনে করতে পারে। একসঙ্গে কাজটি করার জন্য তারা ₹${W} পায়। ক-এর অংশ কত?`),
    ...o,
    steps: [T(`Ratio of work = 1/${p.a} : 1/${p.b} = ${p.n} : ${p.m}`, `কাজের অনুপাত = 1/${p.a} : 1/${p.b} = ${p.n} : ${p.m}`), T(`A's share = ${W} × ${p.n}/${p.m + p.n} = ₹${n2(aShare)}`, `ক-এর অংশ = ${W} × ${p.n}/${p.m + p.n} = ₹${n2(aShare)}`)],
    shortcut: T('Wages ∝ efficiency ∝ 1 / days.', 'মজুরি ∝ দক্ষতা ∝ 1 / দিন।'),
  });
}

// ---------------------------------------------------------------- Speed & Distance (দ্রুতি ও দূরত্ব)
function sdDistance() {
  const s = ri(20, 90), t = pick([2, 3, 4, 5, 6, 2.5, 3.5]);
  const d = s * t;
  const o = numOptions(d, unit('km', 'কিমি'), [hint(s / t, 'Distance = speed × time; dividing gives the wrong result.', 'দূরত্ব = দ্রুতি × সময়; ভাগ করলে ভুল হয়।')]);
  return build({
    topic: 'speed_distance', subtopic: 'basic_distance', tags: ['speed_distance'], difficulty: 1, time: 30,
    stem: T(`A car travels at ${s} km/h for ${t} hours. What distance does it cover?`, `একটি গাড়ি ঘণ্টায় ${s} কিমি বেগে ${t} ঘণ্টা চলে। গাড়িটি কত দূরত্ব অতিক্রম করবে?`),
    ...o,
    steps: [T('Distance = Speed × Time', 'দূরত্ব = দ্রুতি × সময়'), T(`= ${s} × ${t} = ${n2(d)} km`, `= ${s} × ${t} = ${n2(d)} কিমি`)],
    shortcut: T('Keep units consistent (km/h with hours).', 'এককের সামঞ্জস্য রাখো (কিমি/ঘণ্টার সঙ্গে ঘণ্টা)।'),
  });
}

function sdAverageSpeed() {
  const [x0, y0, avg0] = pick([[40, 60, 48], [30, 60, 40], [20, 30, 24], [60, 90, 72], [45, 90, 60], [10, 15, 12], [50, 75, 60], [12, 24, 16], [15, 30, 20]]);
  const c = ri(1, 3);
  const [x, y, avg] = [x0 * c, y0 * c, avg0 * c];
  const o = numOptions(avg, unit('km/h', 'কিমি/ঘণ্টা'), [hint((x + y) / 2, 'For equal distances the average speed is the harmonic mean, not the arithmetic mean.', 'সমান দূরত্বের জন্য গড় দ্রুতি সমমিত (হারমোনিক) গড়, সাধারণ গড় নয়।')]);
  return build({
    topic: 'speed_distance', subtopic: 'average_speed', tags: ['speed_distance', 'average_speed'], difficulty: 3, time: 55,
    stem: T(`A man travels from A to B at ${x} km/h and returns along the same route at ${y} km/h. What is his average speed for the whole journey?`, `একজন ব্যক্তি A থেকে B-তে ঘণ্টায় ${x} কিমি বেগে যান এবং একই পথে ঘণ্টায় ${y} কিমি বেগে ফেরেন। সম্পূর্ণ যাত্রায় গড় দ্রুতি কত?`),
    ...o,
    steps: [T(`Average speed = 2xy/(x + y) = 2 × ${x} × ${y} / (${x} + ${y})`, `গড় দ্রুতি = 2xy/(x + y) = 2 × ${x} × ${y} / (${x} + ${y})`), T(`= ${n2(avg)} km/h`, `= ${n2(avg)} কিমি/ঘণ্টা`)],
    shortcut: T('Equal distances: 2xy/(x+y).', 'সমান দূরত্ব হলে: 2xy/(x+y)।'),
  });
}

function sdTrainLength() {
  const S = 18 * ri(2, 8), t = ri(5, 30);
  const ms = (S / 18) * 5;
  const L = ms * t;
  const o = numOptions(L, unit('m', 'মিটার'), [hint(S * t, 'Speed must be converted from km/h to m/s (× 5/18) first.', 'আগে কিমি/ঘণ্টাকে মিটার/সেকেন্ডে (× 5/18) রূপান্তর করতে হবে।')]);
  return build({
    topic: 'speed_distance', subtopic: 'train_crossing_pole', tags: ['speed_distance', 'trains'], difficulty: 2, time: 50,
    stem: T(`A train running at ${S} km/h crosses a pole in ${t} seconds. What is the length of the train?`, `ঘণ্টায় ${S} কিমি বেগে চলা একটি ট্রেন একটি খুঁটি ${t} সেকেন্ডে অতিক্রম করে। ট্রেনটির দৈর্ঘ্য কত?`),
    ...o,
    steps: [T(`Speed = ${S} × 5/18 = ${ms} m/s`, `দ্রুতি = ${S} × 5/18 = ${ms} মি/সে`), T(`Length = speed × time = ${ms} × ${t} = ${n2(L)} m`, `দৈর্ঘ্য = দ্রুতি × সময় = ${ms} × ${t} = ${n2(L)} মিটার`)],
    shortcut: T('km/h → m/s: multiply by 5/18.', 'কিমি/ঘণ্টা → মি/সে: 5/18 দিয়ে গুণ করো।'),
  });
}

function sdPlatform() {
  const S = 18 * ri(2, 8), t = ri(10, 40);
  const ms = (S / 18) * 5;
  const total = ms * t;
  const L = 10 * ri(2, Math.max(2, Math.floor(total / 20)));
  const plat = total - L;
  if (plat <= 0) return null;
  const o = numOptions(plat, unit('m', 'মিটার'), [hint(total, 'That is train + platform; subtract the train length.', 'এটি ট্রেন + প্ল্যাটফর্মের মোট দৈর্ঘ্য; ট্রেনের দৈর্ঘ্য বিয়োগ করতে হবে।')]);
  return build({
    topic: 'speed_distance', subtopic: 'train_crossing_platform', tags: ['speed_distance', 'trains'], difficulty: 3, time: 70,
    stem: T(`A ${L} m long train running at ${S} km/h crosses a platform in ${t} seconds. What is the length of the platform?`, `${L} মিটার দীর্ঘ একটি ট্রেন ঘণ্টায় ${S} কিমি বেগে একটি প্ল্যাটফর্ম ${t} সেকেন্ডে অতিক্রম করে। প্ল্যাটফর্মের দৈর্ঘ্য কত?`),
    ...o,
    steps: [T(`Distance covered = ${ms} × ${t} = ${n2(total)} m`, `অতিক্রান্ত দূরত্ব = ${ms} × ${t} = ${n2(total)} মিটার`), T(`Platform = ${n2(total)} − ${L} = ${n2(plat)} m`, `প্ল্যাটফর্ম = ${n2(total)} − ${L} = ${n2(plat)} মিটার`)],
    shortcut: T('Crossing a platform: distance = train + platform length.', 'প্ল্যাটফর্ম অতিক্রমে: দূরত্ব = ট্রেনের দৈর্ঘ্য + প্ল্যাটফর্মের দৈর্ঘ্য।'),
  });
}

function sdOppositeTrains() {
  const q = ri(3, 10), sum = 18 * q;
  const s1 = ri(10, sum - 10), s2 = sum - s1;
  const t = ri(4, 20);
  const total = 5 * q * t;
  const L1 = 5 * ri(1, Math.max(1, Math.floor(total / 10)));
  const L2 = total - L1;
  if (L2 <= 0 || L1 <= 0) return null;
  const o = numOptions(t, unit('seconds', 'সেকেন্ড'), [hint(Math.round(total / (((Math.abs(s1 - s2) || 9) * 5) / 18)), 'For trains moving in opposite directions, add the speeds (do not subtract).', 'বিপরীত দিকে চলা ট্রেনের ক্ষেত্রে দ্রুতি যোগ করতে হয় (বিয়োগ নয়)।')]);
  return build({
    topic: 'speed_distance', subtopic: 'relative_speed_trains', tags: ['speed_distance', 'relative_speed'], difficulty: 4, time: 80,
    stem: T(`Two trains of length ${L1} m and ${L2} m run in opposite directions at ${s1} km/h and ${s2} km/h. In how many seconds will they cross each other?`, `${L1} মিটার ও ${L2} মিটার দীর্ঘ দুটি ট্রেন বিপরীত দিকে যথাক্রমে ঘণ্টায় ${s1} কিমি ও ${s2} কিমি বেগে চলছে। কত সেকেন্ডে তারা পরস্পরকে অতিক্রম করবে?`),
    ...o,
    steps: [T(`Relative speed = (${s1} + ${s2}) × 5/18 = ${5 * q} m/s`, `আপেক্ষিক দ্রুতি = (${s1} + ${s2}) × 5/18 = ${5 * q} মি/সে`), T(`Time = (${L1} + ${L2}) / ${5 * q} = ${t} s`, `সময় = (${L1} + ${L2}) / ${5 * q} = ${t} সেকেন্ড`)],
    shortcut: T('Opposite: add speeds; same direction: subtract. Distance = sum of lengths.', 'বিপরীত দিকে: দ্রুতি যোগ; একই দিকে: বিয়োগ। দূরত্ব = দৈর্ঘ্যের সমষ্টি।'),
  });
}

function sdMeeting() {
  const s1 = ri(20, 60), s2 = ri(20, 60), t = ri(2, 8);
  const d = (s1 + s2) * t;
  const o = numOptions(t, unit('hours', 'ঘণ্টা'), [hint(d / Math.max(s1, s2), 'They approach each other, so use the combined speed.', 'তারা পরস্পরের দিকে আসছে, তাই মিলিত দ্রুতি ব্যবহার করো।')]);
  return build({
    topic: 'speed_distance', subtopic: 'meeting_point', tags: ['speed_distance', 'relative_speed'], difficulty: 2, time: 50,
    stem: T(`Two towns are ${d} km apart. Two cars start from them at the same time towards each other at ${s1} km/h and ${s2} km/h. After how many hours will they meet?`, `দুটি শহরের দূরত্ব ${d} কিমি। দুটি গাড়ি একই সময়ে পরস্পরের দিকে ঘণ্টায় ${s1} কিমি ও ${s2} কিমি বেগে রওনা হলো। কত ঘণ্টা পরে তারা মিলিত হবে?`),
    ...o,
    steps: [T(`Relative speed = ${s1} + ${s2} = ${s1 + s2} km/h`, `আপেক্ষিক দ্রুতি = ${s1} + ${s2} = ${s1 + s2} কিমি/ঘণ্টা`), T(`Time = ${d} / ${s1 + s2} = ${t} hours`, `সময় = ${d} / ${s1 + s2} = ${t} ঘণ্টা`)],
    shortcut: T('Time to meet = distance / (sum of speeds).', 'মিলিত হওয়ার সময় = দূরত্ব / (দ্রুতির সমষ্টি)।'),
  });
}

// ---------------------------------------------------------------- Averages (গড়)
function avgNatural() {
  const n = ri(5, 99);
  const ans = (n + 1) / 2;
  const sum = (n * (n + 1)) / 2;
  const o = numOptions(ans, plain, [hint(n / 2, 'Average of 1..n is (n + 1)/2, not n/2.', '1 থেকে n পর্যন্ত স্বাভাবিক সংখ্যার গড় (n + 1)/2, n/2 নয়।')]);
  return build({
    topic: 'averages', subtopic: 'average_natural_numbers', tags: ['average'], difficulty: 1, time: 30,
    stem: T(`What is the average of the first ${n} natural numbers?`, `প্রথম ${n}টি স্বাভাবিক সংখ্যার গড় কত?`),
    ...o,
    steps: [T(`Sum = n(n+1)/2 = ${sum}`, `সমষ্টি = n(n+1)/2 = ${sum}`), T(`Average = ${sum} / ${n} = ${n2(ans)}`, `গড় = ${sum} / ${n} = ${n2(ans)}`)],
    shortcut: T('Average of 1..n = (n + 1)/2.', '1..n সংখ্যার গড় = (n + 1)/2।'),
  });
}

function avgNewNumber() {
  const n = ri(4, 15), A = ri(20, 60), B = A + ri(1, 6);
  const x = B * (n + 1) - A * n;
  const o = numOptions(x, plain, [hint(B, 'The new average is not the new number; use totals.', 'নতুন গড়ই নতুন সংখ্যা নয়; মোট সমষ্টি ধরে হিসাব করো।')]);
  return build({
    topic: 'averages', subtopic: 'new_member_added', tags: ['average'], difficulty: 3, time: 60,
    stem: T(`The average of ${n} numbers is ${A}. When one more number is included, the average becomes ${B}. Find the new number.`, `${n}টি সংখ্যার গড় ${A}। আরও একটি সংখ্যা যোগ করলে গড় হয় ${B}। নতুন সংখ্যাটি কত?`),
    ...o,
    steps: [T(`Old total = ${n} × ${A} = ${n * A}; new total = ${n + 1} × ${B} = ${(n + 1) * B}`, `পুরনো সমষ্টি = ${n} × ${A} = ${n * A}; নতুন সমষ্টি = ${n + 1} × ${B} = ${(n + 1) * B}`), T(`New number = ${(n + 1) * B} − ${n * A} = ${x}`, `নতুন সংখ্যা = ${(n + 1) * B} − ${n * A} = ${x}`)],
    shortcut: T('New number = old average + (increase × new count).', 'নতুন সংখ্যা = পুরনো গড় + (গড়ের বৃদ্ধি × নতুন সদস্যসংখ্যা)।'),
  });
}

function avgTeacherAge() {
  const n = ri(10, 40), A = ri(12, 18), d = ri(1, 3);
  const teacher = A + d * (n + 1);
  const o = numOptions(teacher, unit('years', 'বছর'), [hint(A + d, "The teacher's age raises the average for all students, so work with totals.", 'শিক্ষকের বয়স সকলের গড় বাড়ায়, তাই মোট সমষ্টি ধরে হিসাব করো।')]);
  return build({
    topic: 'averages', subtopic: 'average_age', tags: ['average', 'age'], difficulty: 3, time: 60,
    stem: T(`The average age of ${n} students is ${A} years. When the teacher's age is included, the average increases by ${d} year${d > 1 ? 's' : ''}. Find the teacher's age.`, `${n} জন শিক্ষার্থীর গড় বয়স ${A} বছর। শিক্ষকের বয়স যোগ করলে গড় ${d} বছর বাড়ে। শিক্ষকের বয়স কত?`),
    ...o,
    steps: [T("Teacher's age = new average × (n + 1) − old total", 'শিক্ষকের বয়স = নতুন গড় × (n + 1) − পুরনো সমষ্টি'), T(`= ${A + d} × ${n + 1} − ${A} × ${n} = ${teacher}`, `= ${A + d} × ${n + 1} − ${A} × ${n} = ${teacher}`)],
    shortcut: T('Age = old average + increase × (n + 1).', 'বয়স = পুরনো গড় + গড়ের বৃদ্ধি × (n + 1)।'),
  });
}

function avgGroups() {
  for (let i = 0; i < 100; i++) {
    const n1 = ri(2, 9), n2c = ri(2, 9), a = ri(20, 80), b = ri(20, 80);
    const tot = n1 * a + n2c * b;
    if (tot % (n1 + n2c) !== 0 || a === b) continue;
    const ans = tot / (n1 + n2c);
    const o = numOptions(ans, plain, [hint((a + b) / 2, 'A simple mean of the two averages ignores group sizes (a weighted average is needed).', 'দুটি গড়ের সাধারণ গড় দলের আকার উপেক্ষা করে (ভারযুক্ত গড় দরকার)।')]);
    return build({
      topic: 'averages', subtopic: 'weighted_average', tags: ['average', 'weighted_average'], difficulty: 3, time: 60,
      stem: T(`The average of ${n1} numbers is ${a} and the average of another ${n2c} numbers is ${b}. What is the average of all ${n1 + n2c} numbers?`, `${n1}টি সংখ্যার গড় ${a} এবং অন্য ${n2c}টি সংখ্যার গড় ${b}। সবগুলি ${n1 + n2c}টি সংখ্যার গড় কত?`),
      ...o,
      steps: [T(`Total = ${n1} × ${a} + ${n2c} × ${b} = ${tot}`, `মোট সমষ্টি = ${n1} × ${a} + ${n2c} × ${b} = ${tot}`), T(`Average = ${tot} / ${n1 + n2c} = ${n2(ans)}`, `গড় = ${tot} / ${n1 + n2c} = ${n2(ans)}`)],
      shortcut: T('Weighted average = (n₁a + n₂b) / (n₁ + n₂).', 'ভারযুক্ত গড় = (n₁a + n₂b) / (n₁ + n₂)।'),
    });
  }
  return null;
}

function avgConsecutive() {
  const n = pick([5, 7, 9, 11]);
  const A = ri(10, 90);
  const largest = A + (n - 1) / 2;
  const o = numOptions(largest, plain, [hint(A, 'The average is the middle term, not the largest.', 'গড় হলো মধ্যপদ, বৃহত্তম পদ নয়।')]);
  return build({
    topic: 'averages', subtopic: 'consecutive_numbers', tags: ['average'], difficulty: 2, time: 40,
    stem: T(`The average of ${n} consecutive integers is ${A}. What is the largest of them?`, `${n}টি ক্রমিক পূর্ণসংখ্যার গড় ${A}। সংখ্যাগুলির মধ্যে বৃহত্তমটি কত?`),
    ...o,
    steps: [T(`For an odd count the average is the middle term, so ${(n - 1) / 2} terms lie above ${A}`, `বিজোড় সংখ্যক পদে গড় মধ্যপদ, তাই ${A}-এর উপরে ${(n - 1) / 2}টি পদ আছে`), T(`Largest = ${A} + ${(n - 1) / 2} = ${largest}`, `বৃহত্তম = ${A} + ${(n - 1) / 2} = ${largest}`)],
    shortcut: T('Largest = average + (n − 1)/2.', 'বৃহত্তম = গড় + (n − 1)/2।'),
  });
}

// ---------------------------------------------------------------- Number System (সংখ্যা পদ্ধতি)
function nsOddSum() {
  const n = ri(10, 80);
  const o = numOptions(n * n, plain, [hint(n * (n + 1), 'n(n+1) is the sum of the first n EVEN numbers.', 'n(n+1) হলো প্রথম n সংখ্যক জোড় সংখ্যার যোগফল।')]);
  return build({
    topic: 'number_system', subtopic: 'sum_of_series', tags: ['number_system', 'series'], difficulty: 2, time: 35,
    stem: T(`What is the sum of the first ${n} odd natural numbers?`, `প্রথম ${n}টি বিজোড় স্বাভাবিক সংখ্যার যোগফল কত?`),
    ...o,
    steps: [T('Sum of the first n odd numbers = n²', 'প্রথম n সংখ্যক বিজোড় সংখ্যার যোগফল = n²'), T(`= ${n}² = ${n * n}`, `= ${n}² = ${n * n}`)],
    shortcut: T('Odd: n². Even: n(n+1). Natural: n(n+1)/2.', 'বিজোড়: n²। জোড়: n(n+1)। স্বাভাবিক: n(n+1)/2।'),
  });
}

function nsNaturalSum() {
  const n = ri(10, 150);
  const s = (n * (n + 1)) / 2;
  const o = numOptions(s, plain, [hint(n * n, 'n² is the sum of the first n odd numbers.', 'n² হলো প্রথম n সংখ্যক বিজোড় সংখ্যার যোগফল।')]);
  return build({
    topic: 'number_system', subtopic: 'sum_of_series', tags: ['number_system', 'series'], difficulty: 1, time: 30,
    stem: T(`Find the sum of all natural numbers from 1 to ${n}.`, `1 থেকে ${n} পর্যন্ত সকল স্বাভাবিক সংখ্যার যোগফল নির্ণয় করো।`),
    ...o,
    steps: [T('Sum = n(n + 1)/2', 'যোগফল = n(n + 1)/2'), T(`= ${n} × ${n + 1} / 2 = ${s}`, `= ${n} × ${n + 1} / 2 = ${s}`)],
    shortcut: T('Pair first and last terms: each pair sums to n + 1.', 'প্রথম ও শেষ পদ জোড়া করো: প্রতি জোড়ার যোগফল n + 1।'),
  });
}

function nsHcfLcm() {
  const h = ri(2, 15), a = ri(2, 9), b = ri(2, 9);
  if (a === b || gcd(a, b) !== 1) return null;
  const x = h * a, y = h * b, l = h * a * b;
  const o = numOptions(y, plain, [hint(l / x, 'Use HCF × LCM = product of the two numbers.', 'ব্যবহার করো: গ.সা.গু. × ল.সা.গু. = সংখ্যা দুটির গুণফল।')]);
  return build({
    topic: 'number_system', subtopic: 'hcf_lcm', tags: ['number_system', 'hcf_lcm'], difficulty: 3, time: 50,
    stem: T(`The HCF and LCM of two numbers are ${h} and ${l}. If one number is ${x}, find the other.`, `দুটি সংখ্যার গ.সা.গু. ও ল.সা.গু. যথাক্রমে ${h} ও ${l}। একটি সংখ্যা ${x} হলে অপরটি কত?`),
    ...o,
    steps: [T('HCF × LCM = product of the two numbers', 'গ.সা.গু. × ল.সা.গু. = সংখ্যা দুটির গুণফল'), T(`Other = ${h} × ${l} / ${x} = ${y}`, `অপর সংখ্যা = ${h} × ${l} / ${x} = ${y}`)],
    shortcut: T('Other number = (HCF × LCM) / given number.', 'অপর সংখ্যা = (গ.সা.গু. × ল.সা.গু.) / প্রদত্ত সংখ্যা।'),
  });
}

function nsDividend() {
  const d = ri(7, 49), q = ri(11, 99), r = ri(1, d - 1);
  const N = d * q + r;
  const o = numOptions(N, plain, [hint(d * q, 'Remember to add the remainder: Dividend = Divisor × Quotient + Remainder.', 'ভাগশেষ যোগ করতে ভুলো না: ভাজ্য = ভাজক × ভাগফল + ভাগশেষ।')]);
  return build({
    topic: 'number_system', subtopic: 'division_algorithm', tags: ['number_system'], difficulty: 1, time: 35,
    stem: T(`On dividing a number by ${d}, the quotient is ${q} and the remainder is ${r}. What is the number?`, `একটি সংখ্যাকে ${d} দিয়ে ভাগ করলে ভাগফল ${q} এবং ভাগশেষ ${r} হয়। সংখ্যাটি কত?`),
    ...o,
    steps: [T('Dividend = Divisor × Quotient + Remainder', 'ভাজ্য = ভাজক × ভাগফল + ভাগশেষ'), T(`= ${d} × ${q} + ${r} = ${N}`, `= ${d} × ${q} + ${r} = ${N}`)],
    shortcut: T('Verify by dividing the answer back by the divisor.', 'উত্তরটিকে ভাজক দিয়ে ভাগ করে মিলিয়ে নাও।'),
  });
}

function nsLeastAdd() {
  const d = pick([7, 9, 11, 12, 13, 15, 17, 19, 23]);
  const X = ri(200, 9999);
  const rem = X % d;
  if (rem === 0) return null;
  const add = d - rem;
  const o = numOptions(add, plain, [hint(rem, 'The remainder is what must be subtracted; to add, use divisor − remainder.', 'ভাগশেষ হলো বিয়োগ করার সংখ্যা; যোগ করতে হলে ভাজক − ভাগশেষ।')]);
  return build({
    topic: 'number_system', subtopic: 'divisibility', tags: ['number_system', 'divisibility'], difficulty: 2, time: 45,
    stem: T(`What is the least number that must be added to ${X} so that the sum is exactly divisible by ${d}?`, `${X}-এর সঙ্গে ন্যূনতম কোন সংখ্যা যোগ করলে যোগফল ${d} দ্বারা নিঃশেষে বিভাজ্য হবে?`),
    ...o,
    steps: [T(`${X} ÷ ${d} leaves remainder ${rem}`, `${X} ÷ ${d} করলে ভাগশেষ ${rem}`), T(`Required number = ${d} − ${rem} = ${add}`, `নির্ণেয় সংখ্যা = ${d} − ${rem} = ${add}`)],
    shortcut: T('Least number to add = divisor − remainder.', 'ন্যূনতম যোগ্য সংখ্যা = ভাজক − ভাগশেষ।'),
  });
}

function nsMultiples() {
  const k = ri(3, 19), N = ri(100, 999);
  const c = Math.floor(N / k);
  const o = numOptions(c, plain, [hint(c + 1, 'Only complete multiples count: take the floor of N/k.', 'শুধু পূর্ণ গুণিতক গণনা হবে: N/k-এর পূর্ণসংখ্যা অংশ নাও।')]);
  return build({
    topic: 'number_system', subtopic: 'counting_multiples', tags: ['number_system'], difficulty: 2, time: 40,
    stem: T(`How many numbers from 1 to ${N} are divisible by ${k}?`, `1 থেকে ${N} পর্যন্ত কতগুলি সংখ্যা ${k} দ্বারা বিভাজ্য?`),
    ...o,
    steps: [T(`Count = ⌊${N} / ${k}⌋`, `সংখ্যা = ⌊${N} / ${k}⌋`), T(`= ${c}`, `= ${c}`)],
    shortcut: T('Count of multiples up to N = integer part of N/k.', 'N পর্যন্ত k-এর গুণিতকের সংখ্যা = N/k-এর পূর্ণসংখ্যা অংশ।'),
  });
}

function nsMissingDigit() {
  const A = ri(10, 99), B = ri(0, 99);
  const digits = (v) => String(v).split('').reduce((x, y) => x + Number(y), 0);
  const Bs = String(B).padStart(2, '0');
  const s = digits(A) + digits(Bs);
  if (s % 9 === 0) return null;
  const x = 9 - (s % 9);
  const o = numOptions(x, plain, [hint(s % 9, 'The digit must make the digit sum a multiple of 9: use 9 − remainder.', 'অঙ্কটি এমন হবে যাতে অঙ্কসমষ্টি 9-এর গুণিতক হয়: 9 − ভাগশেষ।')]);
  const num = `${A}x${Bs}`;
  return build({
    topic: 'number_system', subtopic: 'divisibility_by_9', tags: ['number_system', 'divisibility'], difficulty: 3, time: 50,
    stem: T(`Find the digit x so that the number ${num} is divisible by 9.`, `x-এর মান কত হলে ${num} সংখ্যাটি 9 দ্বারা বিভাজ্য হবে?`),
    ...o,
    steps: [T(`Sum of the known digits = ${s}`, `জানা অঙ্কগুলির সমষ্টি = ${s}`), T(`${s} + x must be a multiple of 9 ⇒ x = ${x}`, `${s} + x অবশ্যই 9-এর গুণিতক ⇒ x = ${x}`)],
    shortcut: T('Divisible by 9 ⇔ digit sum divisible by 9.', '9 দ্বারা বিভাজ্য ⇔ অঙ্কসমষ্টি 9 দ্বারা বিভাজ্য।'),
  });
}

module.exports = {
  subject: 'quant',
  topics: [
    { topic: 'percentage', weight: 1, gens: [pctOfNumber, numberAfterChange, whatPercent, successivePct] },
    { topic: 'profit_loss', weight: 1, gens: [plSellingPrice, plCostPrice, plMarkupDiscount, plSamePriceTwoArticles, plArticlesExchange] },
    { topic: 'ratio_proportion', weight: 1, gens: [ratioTwoShares, ratioThreeShares, fourthProportional, ratioSumDifference, compoundRatio] },
    { topic: 'simple_compound_interest', weight: 1, gens: [siFindInterest, siFindRate, siFindPrincipal, siDoubling, ciCompound, ciMinusSi] },
    { topic: 'time_work', weight: 1, gens: [twTogether, twFindOther, twLeaves, twEfficiency, twWages] },
    { topic: 'speed_distance', weight: 1, gens: [sdDistance, sdAverageSpeed, sdTrainLength, sdPlatform, sdOppositeTrains, sdMeeting] },
    { topic: 'averages', weight: 1, gens: [avgNatural, avgNewNumber, avgTeacherAge, avgGroups, avgConsecutive] },
    { topic: 'number_system', weight: 1, gens: [nsOddSum, nsNaturalSum, nsHcfLcm, nsDividend, nsLeastAdd, nsMultiples, nsMissingDigit] },
  ],
};
