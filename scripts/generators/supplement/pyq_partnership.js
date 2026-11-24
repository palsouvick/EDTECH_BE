'use strict';

/**
 * Partnership: standard-level practice for the PYQ types that had too few questions of the
 * same kind (see db/patterns/pyq_map/quant/partnership.json):
 *   charity_then_divide     x% of the profit goes to charity first; share -> total or total -> share
 *   capital_relation_share  capitals given as relations: "P = 3Q, Q = 2/3 R", "2X = 3Y, Y = 4Z",
 *                           "Jadu paid 1½ times as much as Madhu for the car"
 *   loss_distribution       a year-end loss shared in the capital (× months) ratio
 */

const { ri, pick, gcd, T, names, build } = require('../common');
const { frac, retry } = require('./pyq_time_speed_distance');

const { fr, isInt, fstr, fracOptions } = frac;
const TOPIC = 'partnership';
const RS = (f) => T(`₹${fstr(f)}`, `₹${fstr(f)}`);
const simplify = (arr) => { const g = arr.reduce((a, b) => gcd(a, b)); return arr.map((x) => x / g); };

// =====================================================================
// charity_then_divide
// =====================================================================
const CH_FRAMINGS = ['find_total', 'find_share', 'amounts'];

function charity(framing = pick(CH_FRAMINGS)) {
  const [A, B] = names(2);
  const c = pick([5, 10, 15, 20, 25]);
  let p;
  let q;
  let capTxt;
  if (framing === 'amounts') {
    const ca = ri(4, 40) * 500;
    const cb = ri(4, 40) * 500;
    if (ca === cb) return null;
    [p, q] = simplify([ca, cb]);
    if (p + q > 20) return null;
    capTxt = T(`${A.en} invests ₹${ca} and ${B.en} invests ₹${cb} in a business.`, `${A.bn} ₹${ca} এবং ${B.bn} ₹${cb} দিয়ে একটি ব্যবসা শুরু করে।`);
  } else {
    p = ri(1, 9); q = ri(1, 9);
    if (p === q || gcd(p, q) !== 1) return null;
    capTxt = T(`${A.en} and ${B.en} invest in a business in the ratio ${p} : ${q}.`, `${A.bn} ও ${B.bn} ${p} : ${q} অনুপাতে একটি ব্যবসায় বিনিয়োগ করে।`);
  }
  const P = (ri(2, 60) * (p + q) * 100) / gcd(100 - c, 100); // the part left after charity splits exactly in p : q
  const rest = fr(P * (100 - c), 100);
  const shareA = fr(rest[0] * p, rest[1] * (p + q));
  if (!isInt(rest) || !isInt(shareA)) return null;
  let stem;
  let ans;
  let hints;
  let steps;
  if (framing === 'find_total') {
    stem = T(
      `${capTxt.en} ${c}% of the total profit goes to charity and the rest is shared in the ratio of their investments. If ${A.en}'s share is ₹${shareA[0]}, what is the total profit?`,
      `${capTxt.bn} মোট লাভের ${c}% দাতব্য কাজে যায় এবং বাকিটা বিনিয়োগের অনুপাতে ভাগ হয়। ${A.bn}-এর ভাগ ₹${shareA[0]} হলে মোট লাভ কত?`,
    );
    ans = fr(P);
    hints = [
      [fr(shareA[0] * (p + q), p), `That is only the profit left after charity; the total is larger by ${c}%.`, `এটি দাতব্যের পরে বাকি লাভ; মোট লাভ আরও বেশি।`],
      [fr(shareA[0] * (p + q) * (100 + c), p * 100), `Adding ${c}% to the remainder is wrong: the remainder is ${100 - c}% of the total.`, `বাকির সঙ্গে ${c}% যোগ করা ভুল: বাকিটা মোটের ${100 - c}%।`],
      [fr(shareA[0] * (p + q) * 100, q * (100 - c)), 'The ratio was used the wrong way round.', 'অনুপাত উল্টো নেওয়া হয়েছে।'],
    ];
    steps = [
      T(`${A.en} gets ${p}/${p + q} of the ${100 - c}% left: (${p}/${p + q}) × (${100 - c}/100) × P = ${shareA[0]}.`, `${A.bn} পায় বাকি ${100 - c}%-এর ${p}/${p + q} অংশ: (${p}/${p + q}) × (${100 - c}/100) × P = ${shareA[0]}।`),
      T(`P = ${shareA[0]} × ${p + q}/${p} × 100/${100 - c} = ₹${P}.`, `মোট লাভ P = ${shareA[0]} × ${p + q}/${p} × 100/${100 - c} = ₹${P}।`),
    ];
  } else {
    const askB = framing === 'amounts';
    const who = askB ? B : A;
    const share = askB ? fr(rest[0] * q, rest[1] * (p + q)) : shareA;
    if (!isInt(share)) return null;
    stem = T(
      `${capTxt.en} At the end of the year the profit is ₹${P}. First ${c}% of the profit is given as a donation, and the rest is divided in the ratio of their capitals. What is ${who.en}'s share?`,
      `${capTxt.bn} বছরের শেষে লাভ হয় ₹${P}। প্রথমে লাভের ${c}% দান করা হয়, বাকিটা মূলধনের অনুপাতে ভাগ হয়। ${who.bn}-এর ভাগ কত?`,
    );
    ans = share;
    const mine = askB ? q : p;
    const other = askB ? p : q;
    hints = [
      [fr(P * mine, p + q), 'The donation must be taken out before the profit is divided.', 'লাভ ভাগের আগে দানের অংশ বাদ দিতে হবে।'],
      [fr(rest[0] * other, p + q), 'That is the other partner\'s share.', 'এটি অন্য অংশীদারের ভাগ।'],
      [fr(P * mine * 100 - P * c * (p + q), 100 * (p + q)), 'The whole donation was taken from one partner\'s share only.', 'পুরো দান কেবল একজনের ভাগ থেকে কাটা হয়েছে।'],
    ];
    steps = [
      T(`Left after donation = ${100 - c}% of ${P} = ₹${rest[0]}.`, `দানের পরে বাকি = ${P}-এর ${100 - c}% = ₹${rest[0]}।`),
      T(`${who.en}'s share = ${mine}/${p + q} × ${rest[0]} = ₹${share[0]}.`, `${who.bn}-এর ভাগ = ${mine}/${p + q} × ${rest[0]} = ₹${share[0]}।`),
    ];
  }
  const near = [fr(ans[0] + rest[0] / (p + q)), fr(ans[0] - rest[0] / (p + q))].filter(isInt);
  const opts = fracOptions(ans, RS, hints.filter(([f]) => f && isInt(f)), near);
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'charity_then_divide', pattern: 'charity_then_divide',
    tags: ['partnership', 'profit_share', framing],
    difficulty: framing === 'find_total' ? 3 : 2, time: framing === 'find_total' ? 75 : 60,
    stem, ...opts, steps,
    shortcut: T('A partner\'s share = (own ratio part) × (100 − c)% × total profit.', 'একজনের ভাগ = (নিজের অনুপাতের অংশ) × (100 − c)% × মোট লাভ।'),
  });
}

// =====================================================================
// capital_relation_share
// =====================================================================
const REL_FRAMINGS = ['times_chain', 'equation_chain', 'paid_times'];
const HALVES = [[3, 2, '1½'], [5, 2, '2½'], [4, 3, '1⅓'], [5, 4, '1¼'], [2, 1, '2'], [3, 1, '3']];

function capitalRelation(framing = pick(REL_FRAMINGS)) {
  let stem;
  let parts;
  let ask;
  let profit;
  let first;
  let cost = 0;
  let misread = null; // the share if "aX = bY" is read as X : Y = a : b
  const Pn = pick([['P', 'Q', 'R'], ['X', 'Y', 'Z'], ['A', 'B', 'C']]);
  if (framing === 'paid_times') {
    const [[en1, bn1], [en2, bn2]] = pick([[['Jadu', 'যদু'], ['Madhu', 'মধু']], [['Ram', 'রাম'], ['Shyam', 'শ্যাম']], [['Rahim', 'রহিম'], ['Karim', 'করিম']], [['Gopal', 'গোপাল'], ['Haru', 'হারু']]]);
    const [a, b, label] = pick(HALVES);
    const item = pick([['a car', 'একটি গাড়ি'], ['a plot of land', 'এক টুকরো জমি'], ['a shop', 'একটি দোকান'], ['a tractor', 'একটি ট্রাক্টর']]);
    cost = ri(4, 40) * 5000;
    profit = ri(2, 30) * 50 * (a + b);
    parts = [a, b];
    ask = pick([0, 1]);
    const who = ask === 0 ? [en1, bn1] : [en2, bn2];
    stem = T(
      `${en1} and ${en2} together bought ${item[0]} for ₹${cost} and sold it for ₹${cost + profit}. At the time of purchase ${en1} paid ${label} times as much as ${en2}. How much did ${who[0]} receive out of the profit?`,
      `${bn1} ও ${bn2} একসঙ্গে ₹${cost} দিয়ে ${item[1]} কিনে ₹${cost + profit}-এ বিক্রি করল। কেনার সময় ${bn1} ${bn2}-এর ${label} গুণ টাকা দিয়েছিল। লাভ থেকে ${who[1]} কত পেল?`,
    );
    first = T(`Profit = ${cost + profit} − ${cost} = ₹${profit}. Payments ${en1} : ${en2} = ${label} : 1 = ${a} : ${b}.`, `লাভ = ${cost + profit} − ${cost} = ₹${profit}। দেওয়া টাকা ${bn1} : ${bn2} = ${label} : 1 = ${a} : ${b}।`);
  } else if (framing === 'times_chain') {
    const k = ri(2, 5);
    const [m, n] = pick([[2, 3], [3, 4], [1, 2], [3, 5], [2, 5], [4, 5], [1, 3]]); // Q = m/n of R
    // R = n units, Q = m, P = k m
    parts = simplify([k * m, m, n]);
    profit = ri(2, 40) * 10 * (parts[0] + parts[1] + parts[2]);
    ask = ri(0, 2);
    stem = T(
      `${Pn[0]}, ${Pn[1]} and ${Pn[2]} start a business. ${Pn[0]} invests ${k} times as much as ${Pn[1]}, and ${Pn[1]} invests ${m}/${n} of what ${Pn[2]} invests. If the total profit is ₹${profit}, what is the share of ${Pn[ask]}?`,
      `${Pn[0]}, ${Pn[1]} ও ${Pn[2]} একটি ব্যবসা শুরু করে। ${Pn[0]}, ${Pn[1]}-এর ${k} গুণ বিনিয়োগ করে এবং ${Pn[1]}, ${Pn[2]}-এর বিনিয়োগের ${m}/${n} অংশ বিনিয়োগ করে। মোট লাভ ₹${profit} হলে ${Pn[ask]}-এর ভাগ কত?`,
    );
    first = T(`Let ${Pn[2]} = ${n} units; then ${Pn[1]} = ${m} and ${Pn[0]} = ${k} × ${m} = ${k * m}. Ratio = ${parts.join(' : ')}.`, `ধরো ${Pn[2]} = ${n} একক; তাহলে ${Pn[1]} = ${m} এবং ${Pn[0]} = ${k} × ${m} = ${k * m}। অনুপাত = ${parts.join(' : ')}।`);
  } else {
    const a = ri(2, 5);
    const b = ri(2, 5);
    if (a === b || gcd(a, b) !== 1) return null;
    const k = ri(2, 5); // Y = k Z
    // aX = bY -> X : Y = b : a; Y : Z = k : 1 -> X : Y : Z = b k : a k : a
    parts = simplify([b * k, a * k, a]);
    profit = ri(2, 30) * 1000 * (parts[0] + parts[1] + parts[2]);
    ask = ri(0, 2);
    const word = { 2: ['Twice', 'দ্বিগুণ'], 3: ['Thrice', 'তিনগুণ'], 4: ['Four times', 'চারগুণ'], 5: ['Five times', 'পাঁচগুণ'] };
    const low = (w) => w.toLowerCase();
    stem = T(
      `${Pn[0]}, ${Pn[1]} and ${Pn[2]} are business partners. ${word[a][0]} the capital of ${Pn[0]} equals ${low(word[b][0])} the capital of ${Pn[1]}, and the capital of ${Pn[1]} is ${k} times the capital of ${Pn[2]}. If the profit earned is ₹${profit}, what is the share of ${Pn[ask]}?`,
      `${Pn[0]}, ${Pn[1]} ও ${Pn[2]} ব্যবসার অংশীদার। ${Pn[0]}-এর মূলধনের ${word[a][1]} ${Pn[1]}-এর মূলধনের ${word[b][1]}-এর সমান, এবং ${Pn[1]}-এর মূলধন ${Pn[2]}-এর মূলধনের ${k} গুণ। লাভ ₹${profit} হলে ${Pn[ask]}-এর ভাগ কত?`,
    );
    first = T(`${a}${Pn[0]} = ${b}${Pn[1]} gives ${Pn[0]} : ${Pn[1]} = ${b} : ${a}; ${Pn[1]} : ${Pn[2]} = ${k} : 1. Making ${Pn[1]} equal: ${parts.join(' : ')}.`, `${a}${Pn[0]} = ${b}${Pn[1]} থেকে ${Pn[0]} : ${Pn[1]} = ${b} : ${a}; ${Pn[1]} : ${Pn[2]} = ${k} : 1। ${Pn[1]} সমান করে: ${parts.join(' : ')}।`);
    misread = simplify([a * k, b * k, b]);
  }
  const total = parts.reduce((x, y) => x + y);
  const ans = fr(profit * parts[ask], total);
  if (!isInt(ans)) return null;
  const hints = [];
  const others = parts.map((_, i) => i).filter((i) => i !== ask);
  hints.push([fr(profit * parts[others[0]], total), 'That is another partner\'s share; check whose share is asked.', 'এটি অন্য অংশীদারের ভাগ; কার ভাগ চাওয়া হয়েছে দেখে নাও।']);
  if (framing === 'equation_chain') {
    hints.push([fr(profit * misread[ask], misread.reduce((x, y) => x + y)), '"aX = bY" means X : Y = b : a, not a : b.', '"aX = bY" মানে X : Y = b : a, a : b নয়।']);
  } else if (framing === 'times_chain') {
    hints.push([fr(profit, parts.length), 'Equal shares are wrong; the capitals are different.', 'সমান ভাগ ভুল; মূলধন আলাদা।']);
  } else {
    hints.push([fr((cost + profit) * parts[ask], total), 'Only the profit is shared, not the selling price.', 'শুধু লাভ ভাগ হয়, বিক্রয়মূল্য নয়।']);
    hints.push([fr(profit, 2), 'Equal shares are wrong: they paid different amounts.', 'সমান ভাগ ভুল: তারা আলাদা পরিমাণ টাকা দিয়েছিল।']);
  }
  const opts = fracOptions(ans, RS, hints.filter(([f]) => isInt(f)), [fr(profit * (parts[ask] + 1), total), fr(profit * (parts[ask] - 1), total)].filter(isInt));
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'capital_relation_share', pattern: 'capital_relation_share',
    tags: ['partnership', 'ratio', framing],
    difficulty: framing === 'paid_times' ? 2 : 3, time: framing === 'paid_times' ? 60 : 75,
    stem, ...opts,
    steps: [first, T(`Share = ${parts[ask]}/${total} × ${profit} = ₹${ans[0]}.`, `ভাগ = ${parts[ask]}/${total} × ${profit} = ₹${ans[0]}।`)],
    shortcut: T('Give the partner common to both relations the LCM of his terms; read the others off; then parts ÷ total × profit.', 'দুটি সম্পর্কে থাকা অংশীদারকে তার পদগুলোর ল.সা.গু. দাও; বাকিদের মান বের করো; তারপর অংশ ÷ মোট × লাভ।'),
  });
}

// =====================================================================
// loss_distribution
// =====================================================================
const LOSS_FRAMINGS = ['three_capitals', 'months'];

function lossShare(framing = pick(LOSS_FRAMINGS)) {
  const ppl = names(3);
  let parts;
  let stem;
  let ask;
  let first;
  let Lx;
  let raw = null;
  if (framing === 'three_capitals') {
    const caps = [ri(2, 16), ri(2, 16), ri(2, 16)].map((x) => x * 250);
    if (new Set(caps).size < 3) return null;
    parts = simplify(caps);
    const tot = parts.reduce((x, y) => x + y);
    if (tot > 40) return null;
    const L = ri(1, 30) * 5 * tot;
    ask = ri(0, 2);
    stem = T(
      `${ppl[0].en}, ${ppl[1].en} and ${ppl[2].en} started a business with ₹${caps[0]}, ₹${caps[1]} and ₹${caps[2]} respectively as capital. At the end of the year there was a loss of ₹${L}. How much did ${ppl[ask].en} lose?`,
      `${ppl[0].bn}, ${ppl[1].bn} ও ${ppl[2].bn} যথাক্রমে ₹${caps[0]}, ₹${caps[1]} ও ₹${caps[2]} মূলধন নিয়ে একটি ব্যবসা শুরু করে। বছরের শেষে ₹${L} ক্ষতি হয়। ${ppl[ask].bn}-এর ক্ষতি কত?`,
    );
    first = T(`Loss is shared like profit, in the capital ratio ${caps.join(' : ')} = ${parts.join(' : ')} (total ${tot}).`, `ক্ষতিও লাভের মতো মূলধনের অনুপাতে ভাগ হয়: ${caps.join(' : ')} = ${parts.join(' : ')} (মোট ${tot})।`);
    Lx = L;
  } else {
    const ca = ri(2, 20) * 1000;
    const cb = ri(2, 20) * 1000;
    const mb = pick([3, 4, 6, 8, 9]);
    parts = simplify([ca * 12, cb * mb]);
    const tot = parts[0] + parts[1];
    if (tot > 40) return null;
    const L = ri(1, 40) * 10 * tot;
    ask = ri(0, 1);
    stem = T(
      `${ppl[0].en} starts a business with ₹${ca}. After ${12 - mb} months ${ppl[1].en} joins with ₹${cb}. At the end of the year the business shows a loss of ₹${L}. What is ${ppl[ask].en}'s share of the loss?`,
      `${ppl[0].bn} ₹${ca} দিয়ে একটি ব্যবসা শুরু করে। ${12 - mb} মাস পরে ${ppl[1].bn} ₹${cb} নিয়ে যোগ দেয়। বছরের শেষে ব্যবসায় ₹${L} ক্ষতি হয়। ক্ষতিতে ${ppl[ask].bn}-এর ভাগ কত?`,
    );
    first = T(`Capital × months: ${ca} × 12 : ${cb} × ${mb} = ${parts.join(' : ')} (total ${tot}).`, `মূলধন × মাস: ${ca} × 12 : ${cb} × ${mb} = ${parts.join(' : ')} (মোট ${tot})।`);
    Lx = L;
    raw = simplify([ca, cb]);
  }
  const tot = parts.reduce((x, y) => x + y);
  const ans = fr(Lx * parts[ask], tot);
  if (!isInt(ans)) return null;
  const hints = [
    [fr(Lx, parts.length), 'A loss is not shared equally; it follows the capital ratio.', 'ক্ষতি সমান ভাগ হয় না; মূলধনের অনুপাতে ভাগ হয়।'],
    [fr(Lx * parts[(ask + 1) % parts.length], tot), 'That is another partner\'s loss.', 'এটি অন্য অংশীদারের ক্ষতি।'],
    ...(raw ? [[fr(Lx * raw[ask], raw[0] + raw[1]), 'The months were left out; multiply each capital by its months.', 'মাস বাদ পড়েছে; প্রত্যেক মূলধনকে তার মাস দিয়ে গুণ করো।']] : []),
  ];
  const opts = fracOptions(ans, RS, hints.filter(([f]) => isInt(f)), [fr(Lx * (parts[ask] + 1), tot), fr(Lx * (parts[ask] - 1), tot)].filter(isInt));
  if (!opts) return null;
  return build({
    topic: TOPIC, subtopic: 'loss_distribution', pattern: 'loss_distribution',
    tags: ['partnership', 'loss', framing],
    difficulty: framing === 'months' ? 3 : 2, time: framing === 'months' ? 60 : 45,
    stem, ...opts,
    steps: [first, T(`Loss of ${ppl[ask].en} = ${parts[ask]}/${tot} × ${Lx} = ₹${ans[0]}.`, `${ppl[ask].bn}-এর ক্ষতি = ${parts[ask]}/${tot} × ${Lx} = ₹${ans[0]}।`)],
    shortcut: T('Share a loss exactly like a profit: own parts ÷ total parts × loss.', 'ক্ষতি লাভের মতোই ভাগ করো: নিজের অংশ ÷ মোট অংশ × ক্ষতি।'),
  });
}

const GENERATORS = { charity, capitalRelation, lossShare };
const FRAMINGS = { charity: CH_FRAMINGS, capitalRelation: REL_FRAMINGS, lossShare: LOSS_FRAMINGS };

module.exports = {
  subject: 'quant',
  topics: [{ topic: TOPIC, weight: 1, gens: Object.entries(GENERATORS).map(([k, fn]) => retry(fn, FRAMINGS[k])) }],
  ...GENERATORS,
  FRAMINGS,
};
