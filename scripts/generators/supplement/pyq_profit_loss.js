'use strict';

/**
 * Profit & Loss: standard-level practice for the question types seen in WBPSC-family
 * PYQs that the bank had (almost) no exam-level practice for. One generator per
 * pattern of db/patterns/quant/profit_loss.js; subtopic = pattern = the pattern key.
 * PYQ -> pattern map: db/patterns/pyq_map/quant/profit_loss.json.
 *
 *   profit_loss_percent   CP and SP (after repairs / spoilt stock) -> profit or loss %
 *   cp_sp_ratio           CP : SP given, or "x% loss on SP is what % on CP"
 *   two_selling_prices    same article at two prices: resell at a new rate, equal
 *                         profit and loss, a price cut that turns gain into loss
 *   buy_sell_count_rates  bought n for ₹a, sold m for ₹b
 *   two_articles_find_cp  two articles with one total cost: find one CP
 *   successive_discounts  list price, one discount, the additional discount for a net price
 *   algebraic             profit % numerically equal to (a multiple of) the CP
 *
 * Every number is exact: percentages that are not whole are shown as mixed fractions
 * (33 1/3%), never as rounded decimals. Distractors are the real mistakes, with a trap note.
 */

const { ri, pick, shuffle, gcd, T, names, NAMES_M, build } = require('../common');

const TOPIC = 'profit_loss';

// ── exact fractions ──────────────────────────────────────────────────────────
/** Reduced fraction [n, d] with d > 0. */
function R(n, d = 1) {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(Math.abs(n), d) || 1;
  return [n / g, d / g];
}
/** [n, d] -> "33 1/3", "1/2", "25" (sign dropped; callers label profit / loss). */
function mixed([n, d]) {
  n = Math.abs(n);
  if (d === 1) return String(n);
  const w = Math.floor(n / d);
  const r = n % d;
  return w ? `${w} ${r}/${d}` : `${r}/${d}`;
}
/** Signed percentage -> "20% profit" / "12 1/2% loss" / "No profit, no loss". */
function result(p, gainWord = 'profit') {
  if (p[0] === 0) return T('No profit, no loss', 'লাভ বা ক্ষতি কিছুই নেই');
  const m = mixed(p);
  if (p[0] > 0) return gainWord === 'gain' ? T(`${m}% gain`, `${m}% লাভ`) : T(`${m}% profit`, `${m}% লাভ`);
  return T(`${m}% loss`, `${m}% ক্ষতি`);
}
const pctText = (p) => T(`${mixed(p)}%`, `${mixed(p)}%`);
const rupees = (v) => T(`₹${v}`, `₹${v}`);
const add = ([n, d], k) => R(n + k * d, d);
const isInt = (v) => Number.isInteger(v) && v > 0;

/** Four options: correct, trap distractors first, then fillers; null unless 3 distinct wrongs (at least one a real trap). */
function choose(correct, traps, fillers) {
  const seen = new Set([correct.en]);
  const wrong = [];
  const put = (o) => {
    if (!o || !o.en || seen.has(o.en) || wrong.length >= 3) return;
    seen.add(o.en);
    wrong.push(o);
  };
  traps.forEach(put);
  shuffle(fillers).forEach(put);
  return wrong.length === 3 && wrong.some((w) => w.trap) ? { correct, wrong } : null;
}
const trapped = (opt, en, bn) => ({ ...opt, trap: T(en, bn) });

const ITEMS = [
  ['fan', 'পাখা'], ['watch', 'ঘড়ি'], ['bicycle', 'সাইকেল'], ['radio', 'রেডিও'], ['table', 'টেবিল'],
  ['chair', 'চেয়ার'], ['mobile phone', 'মোবাইল ফোন'], ['saree', 'শাড়ি'], ['mixer', 'মিক্সি'],
  ['sewing machine', 'সেলাই মেশিন'], ['bookshelf', 'বইয়ের তাক'], ['television', 'টেলিভিশন'],
].map(([en, bn]) => T(en, bn));
const CHEAP = [
  ['pen', 'কলম'], ['book', 'বই'], ['umbrella', 'ছাতা'], ['toy', 'খেলনা'], ['school bag', 'স্কুলব্যাগ'], ['torch', 'টর্চ'], ['lunch box', 'টিফিন বাক্স'], ['wall clock', 'দেয়ালঘড়ি'],
].map(([en, bn]) => T(en, bn));
/** An article whose price suits the amount (no ₹40 televisions). */
const itemFor = (price) => (price < 600 ? pick(CHEAP) : pick(ITEMS));
const an = (w) => (/^[aeiou]/i.test(w) ? 'an' : 'a');

// ── 1. profit_loss_percent ───────────────────────────────────────────────────
const NICE_RATES = [[5, 1], [10, 1], [15, 1], [20, 1], [25, 1], [30, 1], [40, 1], [50, 1], [25, 2], [50, 3], [100, 3], [75, 2], [35, 1], [12, 1], [8, 1]];

function profitLossPercent(kind = pick(['simple', 'repair', 'waste'])) {
  let item = pick(ITEMS);
  const [X] = names(1, NAMES_M);
  const sign = pick([1, 1, -1]);
  const [rn, rd] = pick(NICE_RATES);
  const ans = R(sign * rn, rd);
  let stem;
  let cost;
  let sp;
  let traps = [];
  let steps;
  if (kind === 'simple') {
    cost = pick([20, 40, 60, 80, 120, 150, 160, 240, 250, 320, 360, 450, 480, 540, 640, 750, 840, 960, 1200, 1500, 1600, 2400, 2500]);
    item = itemFor(cost);
    sp = (cost * (100 * rd + sign * rn)) / (100 * rd);
    if (!isInt(sp)) return null;
    stem = pick([
      T(`A shopkeeper buys ${an(item.en)} ${item.en} for ₹${cost} and sells it for ₹${sp}. Find his profit or loss per cent.`,
        `একজন দোকানদার ₹${cost}-এ একটি ${item.bn} কিনে ₹${sp}-এ বিক্রি করলেন। তাঁর শতকরা লাভ বা ক্ষতি কত?`),
      T(`${X.en} purchased ${an(item.en)} ${item.en} for ₹${cost} and sold it for ₹${sp}. What is his percentage of profit or loss?`,
        `${X.bn} ₹${cost}-এ একটি ${item.bn} কিনে ₹${sp}-এ বেচে দিলেন। তাঁর শতকরা লাভ বা ক্ষতি কত?`),
    ]);
    steps = [
      T(`${sp > cost ? 'SP > CP, so it is a profit' : 'SP < CP, so it is a loss'} of ${Math.abs(sp - cost)} rupees.`, `${sp > cost ? 'SP > CP, তাই লাভ' : 'SP < CP, তাই ক্ষতি'} = ${Math.abs(sp - cost)} টাকা।`),
      T(`Per cent = ${Math.abs(sp - cost)}/${cost} × 100 = ${mixed(ans)}%.`, `শতকরা = ${Math.abs(sp - cost)}/${cost} × 100 = ${mixed(ans)}%।`),
    ];
  } else if (kind === 'repair') {
    cost = pick([400, 500, 600, 800, 1000, 1200, 1500, 1600, 2000, 2400, 2500, 3000, 4000, 5000]);
    const rep = cost * pick([1 / 10, 1 / 5, 1 / 4, 1 / 8, 3 / 20]);
    if (!isInt(rep)) return null;
    const buy = cost - rep;
    sp = (cost * (100 * rd + sign * rn)) / (100 * rd);
    if (!isInt(sp)) return null;
    stem = T(`${X.en} bought an old ${item.en} for ₹${buy} and spent ₹${rep} on its repairs. He then sold it for ₹${sp}. Find his gain or loss per cent.`,
      `${X.bn} ₹${buy}-এ একটি পুরোনো ${item.bn} কিনে তার মেরামতে ₹${rep} খরচ করলেন। তারপর ₹${sp}-এ সেটি বিক্রি করলেন। তাঁর শতকরা লাভ বা ক্ষতি কত?`);
    const noRepair = R(100 * (sp - buy), buy);
    if (noRepair[1] <= 12) traps.push(trapped(result(noRepair, 'gain'), 'The repair cost was left out: it is part of the cost price.', 'মেরামতের খরচ বাদ পড়েছে: সেটিও ক্রয়মূল্যের অংশ।'));
    steps = [
      T(`Total cost = ${buy} + ${rep} = ₹${cost}.`, `মোট খরচ = ${buy} + ${rep} = ₹${cost}।`),
      T(`${sp > cost ? 'Gain' : 'Loss'} = ${Math.abs(sp - cost)} rupees, so per cent = ${Math.abs(sp - cost)}/${cost} × 100 = ${mixed(ans)}%.`,
        `${sp > cost ? 'লাভ' : 'ক্ষতি'} = ${Math.abs(sp - cost)} টাকা, তাই শতকরা = ${Math.abs(sp - cost)}/${cost} × 100 = ${mixed(ans)}%।`),
    ];
  } else {
    const fruit = pick([T('mangoes', 'আম'), T('tomatoes', 'টমেটো'), T('onions', 'পেঁয়াজ'), T('potatoes', 'আলু'), T('grapes', 'আঙুর')]);
    const q = pick([20, 25, 40, 50, 60, 80, 100, 120]);
    const w = q * pick([1 / 10, 1 / 5, 1 / 4, 1 / 20]);
    const a = pick([16, 18, 20, 24, 25, 30, 32, 36, 40, 45, 48, 50, 60]);
    if (!isInt(w)) return null;
    cost = q * a;
    const b = (cost * (100 * rd + sign * rn)) / (100 * rd * (q - w));
    if (!isInt(b)) return null;
    sp = b * (q - w);
    stem = T(`A vendor buys ${q} kg of ${fruit.en} at ₹${a} per kg. ${w} kg get spoilt and are thrown away, and he sells the rest at ₹${b} per kg. Find his profit or loss per cent.`,
      `একজন বিক্রেতা ₹${a} কেজি দরে ${q} কেজি ${fruit.bn} কেনেন। ${w} কেজি নষ্ট হয়ে ফেলে দিতে হয়, বাকিটা তিনি ₹${b} কেজি দরে বেচেন। তাঁর শতকরা লাভ বা ক্ষতি কত?`);
    const noWaste = R(100 * (b - a), a);
    if (noWaste[1] <= 12 && b !== a) traps.push(trapped(result(noWaste), 'The spoilt stock was ignored: compare the whole cost with the takings from what was actually sold.', 'নষ্ট মাল উপেক্ষা করা হয়েছে: পুরো খরচের সঙ্গে আসলে যা বিক্রি হল তার টাকার তুলনা করো।'));
    steps = [
      T(`Cost = ${q} × ${a} = ₹${cost}; sold ${q - w} kg × ₹${b} = ₹${sp}.`, `খরচ = ${q} × ${a} = ₹${cost}; বিক্রি ${q - w} কেজি × ₹${b} = ₹${sp}।`),
      T(`${sp > cost ? 'Profit' : 'Loss'} = ${Math.abs(sp - cost)} rupees, so per cent = ${Math.abs(sp - cost)}/${cost} × 100 = ${mixed(ans)}%.`,
        `${sp > cost ? 'লাভ' : 'ক্ষতি'} = ${Math.abs(sp - cost)} টাকা, তাই শতকরা = ${Math.abs(sp - cost)}/${cost} × 100 = ${mixed(ans)}%।`),
    ];
  }
  const word = kind === 'repair' ? 'gain' : 'profit';
  const onSp = R(100 * (sp - cost), sp);
  if (onSp[1] <= 25) traps.push(trapped(result(onSp, word), 'That divides by the selling price; profit and loss % are always on the cost price.', 'এটি বিক্রয়মূল্য দিয়ে ভাগ করা; লাভ ও ক্ষতি % সবসময় ক্রয়মূল্যের উপর।'));
  traps.push(trapped(result(R(-ans[0], ans[1]), word), sign > 0 ? 'SP is more than CP here, so it is a profit, not a loss.' : 'SP is less than CP here, so it is a loss, not a profit.', sign > 0 ? 'এখানে SP > CP, তাই লাভ, ক্ষতি নয়।' : 'এখানে SP < CP, তাই ক্ষতি, লাভ নয়।'));
  traps = shuffle(traps.slice(0, 2)).concat(traps.slice(2));
  const fillers = [5, -5, 10, -10, 2, -2].map((k) => add(ans, sign * k)).filter((p) => p[0] * sign > 0).map((p) => result(p, word));
  const options = choose(result(ans, word), traps, fillers);
  if (!options) return null;
  return build({
    topic: TOPIC, subtopic: 'profit_loss_percent', pattern: 'profit_loss_percent',
    tags: ['profit_percent', 'loss_percent', kind], difficulty: kind === 'simple' ? 2 : 3, time: kind === 'simple' ? 45 : 75,
    stem, ...options, steps,
    shortcut: T('Find the total cost first, then (SP − total cost) ÷ total cost × 100; a negative answer is a loss.', 'আগে মোট খরচ বের করো, তারপর (SP − মোট খরচ) ÷ মোট খরচ × 100; ঋণাত্মক হলে ক্ষতি।'),
  });
}

// ── 2. cp_sp_ratio ───────────────────────────────────────────────────────────
function cpSpRatio(kind = pick(['cp_sp', 'sp_cp', 'on_sp'])) {
  const item = pick(ITEMS);
  let ans;
  let stem;
  let steps;
  const traps = [];
  if (kind === 'on_sp') {
    const x = pick([5, 8, 10, 12, 15, 20, 25, 30, 40]);
    const loss = pick([true, false]);
    if (!loss && x >= 50) return null;
    const cpPart = loss ? 100 + x : 100 - x;
    ans = R((loss ? -100 : 100) * x, cpPart);
    if (ans[1] > 25) return null;
    stem = T(`A trader works out his ${loss ? 'loss' : 'profit'} as ${x}% of the selling price. What is his ${loss ? 'loss' : 'profit'} per cent on the cost price?`,
      `একজন ব্যবসায়ী তাঁর ${loss ? 'ক্ষতি' : 'লাভ'} বিক্রয়মূল্যের ${x}% হিসেবে ধরেন। ক্রয়মূল্যের উপর তাঁর শতকরা ${loss ? 'ক্ষতি' : 'লাভ'} কত?`);
    const other = R((loss ? -100 : 100) * x, loss ? 100 - x : 100 + x);
    if (other[1] <= 25) traps.push(trapped(result(other), loss ? 'With a loss, CP is SP + loss (100 + x), not SP − loss.' : 'With a profit, CP is SP − profit (100 − x), not SP + profit.', loss ? 'ক্ষতিতে CP = SP + ক্ষতি (100 + x), SP − ক্ষতি নয়।' : 'লাভে CP = SP − লাভ (100 − x), SP + লাভ নয়।'));
    traps.push(trapped(result(R(loss ? -x : x)), 'That is the percentage on the selling price; the question wants it on the cost price.', 'এটি বিক্রয়মূল্যের উপর শতাংশ; প্রশ্নে ক্রয়মূল্যের উপর চাওয়া হয়েছে।'));
    steps = [
      T(`Take SP = 100. The ${loss ? 'loss' : 'profit'} is ${x}, so CP = 100 ${loss ? '+' : '−'} ${x} = ${cpPart}.`, `SP = 100 ধরো। ${loss ? 'ক্ষতি' : 'লাভ'} = ${x}, তাই CP = 100 ${loss ? '+' : '−'} ${x} = ${cpPart}।`),
      T(`On the cost price: ${x}/${cpPart} × 100 = ${mixed(ans)}%.`, `ক্রয়মূল্যের উপর: ${x}/${cpPart} × 100 = ${mixed(ans)}%।`),
    ];
  } else {
    const a = ri(3, 25);
    const b = a + pick([1, 1, 2, 3, -1, -1, -2, -3, 4, 5]);
    if (b < 2 || gcd(a, b) !== 1) return null;
    ans = R(100 * (b - a), a);
    if (ans[1] > 12) return null;
    stem = kind === 'cp_sp'
      ? T(`The ratio of the cost price to the selling price of ${an(item.en)} ${item.en} is ${a} : ${b}. Find the profit or loss per cent.`,
        `একটি ${item.bn} কেনার দাম (ক্রয়মূল্য) ও বেচার দামের (বিক্রয়মূল্য) অনুপাত ${a} : ${b}। শতকরা লাভ বা ক্ষতি নির্ণয় করো।`)
      : T(`The selling price and the cost price of ${an(item.en)} ${item.en} are in the ratio ${b} : ${a}. What is the profit or loss per cent?`,
        `একটি ${item.bn} বেচার দাম (বিক্রয়মূল্য) ও কেনার দামের (ক্রয়মূল্য) অনুপাত ${b} : ${a}। শতকরা লাভ বা ক্ষতি কত?`);
    const onSp = R(100 * (b - a), b);
    if (onSp[1] <= 25) traps.push(trapped(result(onSp), 'That divides the difference by the SP part; percentages are taken on the CP part.', 'এটি পার্থক্যকে SP অংশ দিয়ে ভাগ করা; শতাংশ নেওয়া হয় CP অংশের উপর।'));
    const swapped = R(100 * (a - b), b);
    if (swapped[1] <= 25) traps.push(trapped(result(swapped), 'CP and SP were read the wrong way round from the ratio.', 'অনুপাত থেকে CP ও SP উল্টো করে পড়া হয়েছে।'));
    traps.push(trapped(result(R(-ans[0], ans[1])), b > a ? 'The SP part is bigger than the CP part, so it is a profit.' : 'The SP part is smaller than the CP part, so it is a loss.', b > a ? 'SP অংশ CP অংশের চেয়ে বড়, তাই লাভ।' : 'SP অংশ CP অংশের চেয়ে ছোট, তাই ক্ষতি।'));
    steps = [
      T(`Let CP = ${a}k and SP = ${b}k. ${b > a ? 'Profit' : 'Loss'} = ${Math.abs(b - a)}k.`, `ধরো CP = ${a}k এবং SP = ${b}k। ${b > a ? 'লাভ' : 'ক্ষতি'} = ${Math.abs(b - a)}k।`),
      T(`Per cent = ${Math.abs(b - a)}/${a} × 100 = ${mixed(ans)}%.`, `শতকরা = ${Math.abs(b - a)}/${a} × 100 = ${mixed(ans)}%।`),
    ];
  }
  const sign = Math.sign(ans[0]);
  const fillers = [2, -2, 5, -5, 1, -1].map((k) => add(ans, k)).filter((p) => p[0] * sign > 0).map((p) => result(p));
  const options = choose(result(ans), traps, fillers);
  if (!options) return null;
  return build({
    topic: TOPIC, subtopic: 'cp_sp_ratio', pattern: 'cp_sp_ratio', tags: ['ratio', 'profit_percent', kind],
    difficulty: kind === 'on_sp' ? 3 : 2, time: kind === 'on_sp' ? 60 : 45, stem, ...options, steps,
    shortcut: T('Difference of the CP and SP parts ÷ the CP part × 100 — no prices needed.', 'CP ও SP অংশের পার্থক্য ÷ CP অংশ × 100 — কোনো দাম লাগে না।'),
  });
}

// ── 3. two_selling_prices ────────────────────────────────────────────────────
const CPS = [160, 200, 240, 250, 300, 320, 400, 480, 500, 600, 640, 720, 800, 960, 1000, 1200, 1500, 1600, 1640, 2000, 2400, 2500, 3200, 4000, 5000, 8000, 10000];

function twoSellingPrices(kind = pick(['resell', 'reduce', 'equal', 'double', 'drop'])) {
  const item = pick(ITEMS);
  const [X] = names(1, NAMES_M);
  const art = `${an(item.en)} ${item.en}`;
  let stem;
  let answer;
  let steps;
  const traps = [];
  const money = (v) => rupees(v);
  if (kind === 'resell' || kind === 'reduce') {
    const cp = pick(CPS);
    let r1;
    let r2;
    if (kind === 'resell') {
      r1 = pick([-5, -10, -15, -20, -25, 10, 20]);
      r2 = r1 < 0 ? pick([5, 10, 15, 20, 25]) : pick([-5, -10, 30, 40]);
    } else {
      r1 = pick([20, 25, 30, 40, 50]);
      r2 = pick([5, 10, 12, 15]);
    }
    const s1 = (cp * (100 + r1)) / 100;
    answer = (cp * (100 + r2)) / 100;
    if (!isInt(s1) || !isInt(answer)) return null;
    const w = (r) => (r < 0 ? T(`loses ${-r}%`, `${-r}% ক্ষতি হয়`) : T(`gains ${r}%`, `${r}% লাভ হয়`));
    stem = kind === 'resell'
      ? T(`By selling ${art} for ₹${s1}, ${X.en} ${w(r1).en}. At what price should he sell it to ${r2 < 0 ? `lose only ${-r2}%` : `gain ${r2}%`}?`,
        `${X.bn} ₹${s1}-এ একটি ${item.bn} বিক্রি করলে তাঁর ${w(r1).bn}। ${r2 < 0 ? `মাত্র ${-r2}% ক্ষতি` : `${r2}% লাভ`} করতে তাঁকে কত দামে বিক্রি করতে হবে?`)
      : T(`By selling ${art} for ₹${s1}, a shopkeeper gains ${r1}%. If the profit is reduced to ${r2}%, what will the selling price be?`,
        `একজন দোকানদার ₹${s1}-এ একটি ${item.bn} বিক্রি করে ${r1}% লাভ করেন। লাভ কমিয়ে ${r2}% করলে বিক্রয়মূল্য কত হবে?`);
    const onSp = (s1 * (100 + r2 - r1)) / 100;
    if (isInt(onSp)) traps.push(trapped(money(onSp), 'The change of rate was applied to the first selling price; both rates are on the cost price.', 'হারের পরিবর্তন প্রথম বিক্রয়মূল্যের উপর ধরা হয়েছে; দুটি হারই ক্রয়মূল্যের উপর।'));
    traps.push(trapped(money(cp), 'That is only the cost price; the question asks the new selling price.', 'এটি শুধু ক্রয়মূল্য; প্রশ্নে নতুন বিক্রয়মূল্য চাওয়া হয়েছে।'));
    steps = [
      T(`₹${s1} is ${100 + r1}% of CP, so CP = ${s1} × 100/${100 + r1} = ₹${cp}.`, `₹${s1} হল CP-এর ${100 + r1}%, তাই CP = ${s1} × 100/${100 + r1} = ₹${cp}।`),
      T(`New SP = ${cp} × ${100 + r2}/100 = ₹${answer}.`, `নতুন SP = ${cp} × ${100 + r2}/100 = ₹${answer}।`),
    ];
  } else if (kind === 'equal' || kind === 'double') {
    const cp = ri(60, 400) * 5 + pick([0, 1, 2, 3, 4]);
    const d = ri(10, 90) * pick([1, 2, 3]) * (kind === 'double' ? 2 : 1);
    const s2 = cp - d;
    if (s2 < cp / 2) return null;
    const s1 = kind === 'equal' ? cp + d : cp + 2 * d;
    answer = cp;
    stem = kind === 'equal'
      ? T(`The profit earned by selling ${art} for ₹${s1} is the same as the loss incurred by selling it for ₹${s2}. What is the cost price of the ${item.en}?`,
        `একটি ${item.bn} ₹${s1}-এ বিক্রি করলে যত লাভ হয়, ₹${s2}-এ বিক্রি করলে তত ক্ষতি হয়। ${item.bn}টির ক্রয়মূল্য কত?`)
      : T(`The profit made by selling ${art} for ₹${s1} is twice the loss made by selling it for ₹${s2}. What is the cost price of the ${item.en}?`,
        `একটি ${item.bn} ₹${s1}-এ বিক্রি করলে যা লাভ হয়, তা ₹${s2}-এ বিক্রি করলে যা ক্ষতি হয় তার দ্বিগুণ। ${item.bn}টির ক্রয়মূল্য কত?`);
    if (kind === 'equal') {
      traps.push(trapped(money(d), 'Half the gap between the prices is the profit itself, not the cost price.', 'দুটি দামের ফারাকের অর্ধেক হল লাভের পরিমাণ, ক্রয়মূল্য নয়।'));
      traps.push(trapped(money(s1 - s2), 'That is the gap between the two prices; the CP lies midway between them.', 'এটি দুটি দামের ফারাক; CP থাকে দুটির ঠিক মাঝখানে।'));
      steps = [
        T(`Profit = ${s1} − CP and loss = CP − ${s2}. Equal, so 2 × CP = ${s1} + ${s2} = ${s1 + s2}.`, `লাভ = ${s1} − CP এবং ক্ষতি = CP − ${s2}। দুটি সমান, তাই 2 × CP = ${s1} + ${s2} = ${s1 + s2}।`),
        T(`CP = ${s1 + s2} ÷ 2 = ₹${cp}.`, `তাই CP = ${s1 + s2} ÷ 2 = ₹${cp}।`),
      ];
    } else {
      const avg = (s1 + s2) / 2;
      if (Number.isInteger(avg)) traps.push(trapped(money(avg), 'That treats the profit and the loss as equal; here the profit is twice the loss.', 'এটি লাভ ও ক্ষতিকে সমান ধরেছে; এখানে লাভ ক্ষতির দ্বিগুণ।'));
      steps = [
        T(`${s1} − CP = 2 × (CP − ${s2}), so 3 × CP = ${s1} + 2 × ${s2} = ${s1 + 2 * s2}.`, `${s1} − CP = 2 × (CP − ${s2}), তাই 3 × CP = ${s1} + 2 × ${s2} = ${s1 + 2 * s2}।`),
        T(`CP = ${s1 + 2 * s2} ÷ 3 = ₹${cp}.`, `তাই CP = ${s1 + 2 * s2} ÷ 3 = ₹${cp}।`),
      ];
    }
  } else {
    const cp = pick(CPS);
    const g = pick([5, 10, 15, 20, 25]);
    const l = pick([5, 10, 15, 20]);
    const D = (cp * (g + l)) / 100;
    const sp = (cp * (100 + g)) / 100;
    if (!isInt(D) || !isInt(sp)) return null;
    const askSp = pick([true, false]);
    answer = askSp ? sp : cp;
    stem = T(`By reducing the selling price of ${art} by ₹${D}, a gain of ${g}% turns into a loss of ${l}%. What ${askSp ? `was the original selling price` : 'is the cost price'} of the ${item.en}?`,
      `একটি ${item.bn} যে দামে বিক্রি হচ্ছিল তা ₹${D} কমালে ${g}% লাভ বদলে ${l}% ক্ষতি হয়। ${item.bn}টির ${askSp ? 'আগের বিক্রয়মূল্য' : 'ক্রয়মূল্য'} কত?`);
    traps.push(trapped(money(askSp ? cp : sp), askSp ? 'That is the cost price; the question asks the original selling price.' : 'That is the original selling price; the question asks the cost price.', askSp ? 'এটি ক্রয়মূল্য; প্রশ্নে আগের বিক্রয়মূল্য চাওয়া হয়েছে।' : 'এটি আগের বিক্রয়মূল্য; প্রশ্নে ক্রয়মূল্য চাওয়া হয়েছে।'));
    if (g !== l) {
      const wrongCp = (D * 100) / Math.abs(g - l);
      const wrong = askSp ? (wrongCp * (100 + g)) / 100 : wrongCp;
      if (isInt(wrong)) traps.push(trapped(money(wrong), 'Going from a gain to a loss, the rates ADD up: the price fell by (gain % + loss %) of CP.', 'লাভ থেকে ক্ষতিতে গেলে হার যোগ হয়: দাম কমেছে CP-এর (লাভ % + ক্ষতি %)।'));
    }
    steps = [
      T(`The price fell from ${100 + g}% of CP to ${100 - l}% of CP, a drop of ${g + l}% of CP = ₹${D}.`, `দাম CP-এর ${100 + g}% থেকে ${100 - l}%-এ নেমেছে, অর্থাৎ CP-এর ${g + l}% = ₹${D}।`),
      T(`CP = ${D} × 100/${g + l} = ₹${cp}${askSp ? `; original SP = ${cp} × ${100 + g}/100 = ₹${sp}` : ''}.`, `তাই CP = ${D} × 100/${g + l} = ₹${cp}${askSp ? `; আগের SP = ${cp} × ${100 + g}/100 = ₹${sp}` : ''}।`),
    ];
  }
  const step = answer >= 1000 ? pick([50, 100]) : answer >= 200 ? pick([10, 20, 25]) : 5;
  const fillers = [1, -1, 2, -2, 3].map((k) => answer + k * step).filter((v) => v > 0).map(money);
  const options = choose(money(answer), traps, fillers);
  if (!options) return null;
  return build({
    topic: TOPIC, subtopic: 'two_selling_prices', pattern: 'two_selling_prices', tags: ['find_cost_price', 'selling_price', kind],
    difficulty: kind === 'drop' || kind === 'double' ? 3 : 2, time: kind === 'drop' || kind === 'double' ? 75 : 60, stem, ...options, steps,
    shortcut: kind === 'equal'
      ? T('Equal profit and loss: the cost price is the average of the two selling prices.', 'লাভ ও ক্ষতি সমান হলে ক্রয়মূল্য হল দুটি বিক্রয়মূল্যের গড়।')
      : T('Write both prices as percentages of the same CP; the rupee figure given fixes the CP.', 'দুটি দামকেই একই CP-এর শতাংশ হিসেবে লেখো; দেওয়া টাকার অঙ্ক থেকেই CP ঠিক হয়।'),
  });
}

// ── 4. buy_sell_count_rates ──────────────────────────────────────────────────
const FRUITS = [['apples', 'আপেল'], ['oranges', 'কমলালেবু'], ['bananas', 'কলা'], ['lemons', 'লেবু'], ['eggs', 'ডিম'], ['mangoes', 'আম'], ['pens', 'কলম'], ['guavas', 'পেয়ারা']].map(([en, bn]) => T(en, bn));

function buySellCountRates(kind = pick(['for', 'at'])) {
  const f = pick(FRUITS);
  const n = ri(2, 20);
  const a = ri(1, 30);
  const m = ri(2, 20);
  const b = ri(1, 30);
  if (n === m || n * b === m * a) return null;
  const ans = R(100 * (n * b - m * a), m * a);
  if (ans[1] > 4 || Math.abs(ans[0] / ans[1]) < 4 || Math.abs(ans[0] / ans[1]) > 60) return null;
  const stem = kind === 'for'
    ? T(`A fruit seller bought ${n} ${f.en} for ₹${a} and sold ${m} ${f.en} for ₹${b}. Find his profit or loss per cent.`,
      `একজন বিক্রেতা ₹${a}-এ ${n}টি ${f.bn} কিনে ₹${b}-এ ${m}টি করে বিক্রি করলেন। তাঁর শতকরা লাভ বা ক্ষতি কত?`)
    : T(`A vendor buys ${f.en} at ${n} for ₹${a} and sells them at ${m} for ₹${b}. What is his gain or loss per cent?`,
      `একজন বিক্রেতা ₹${a}-এ ${n}টি দরে ${f.bn} কিনে ₹${b}-এ ${m}টি দরে বিক্রি করেন। তাঁর শতকরা লাভ বা ক্ষতি কত?`);
  const word = kind === 'for' ? 'profit' : 'gain';
  const traps = [];
  const onSp = R(100 * (n * b - m * a), n * b);
  if (onSp[1] <= 25) traps.push(trapped(result(onSp, word), 'That divides by the takings; the percentage is on the cost.', 'এটি বিক্রির টাকা দিয়ে ভাগ করা; শতাংশ হয় খরচের উপর।'));
  if (a !== b) {
    const naive = R(100 * (b - a), a);
    if (naive[1] <= 25) traps.push(trapped(result(naive, word), `₹${a} and ₹${b} are prices of different numbers of ${f.en}; compare them on the same number.`, `₹${a} আর ₹${b} আলাদা সংখ্যক ${f.bn}-এর দাম; একই সংখ্যায় এনে তুলনা করো।`));
  }
  traps.push(trapped(result(R(-ans[0], ans[1]), word), 'The direction is wrong: compare the selling price of the same number with its cost.', 'দিক ভুল হয়েছে: একই সংখ্যার বিক্রয়মূল্যকে তার খরচের সঙ্গে তুলনা করো।'));
  const sign = Math.sign(ans[0]);
  const fillers = [5, -5, 10, -10, 1, -1].map((k) => add(ans, k)).filter((p) => p[0] * sign > 0).map((p) => result(p, word));
  const options = choose(result(ans, word), shuffle(traps.slice(0, 2)).concat(traps.slice(2)), fillers);
  if (!options) return null;
  const N = n * m;
  return build({
    topic: TOPIC, subtopic: 'buy_sell_count_rates', pattern: 'buy_sell_count_rates', tags: ['profit_percent', 'unit_price', kind],
    difficulty: 3, time: 75, stem, ...options,
    steps: [
      T(`Take ${N} ${f.en} (${n} × ${m}). Cost = ${m} × ₹${a} = ₹${m * a}; selling price = ${n} × ₹${b} = ₹${n * b}.`, `${N}টি ${f.bn} ধরো (${n} × ${m})। খরচ = ${m} × ₹${a} = ₹${m * a}; বিক্রয়মূল্য = ${n} × ₹${b} = ₹${n * b}।`),
      T(`${n * b > m * a ? 'Profit' : 'Loss'} = ${Math.abs(n * b - m * a)} rupees on ₹${m * a}, so ${Math.abs(n * b - m * a)}/${m * a} × 100 = ${mixed(ans)}%.`, `₹${m * a}-এ ${n * b > m * a ? 'লাভ' : 'ক্ষতি'} ${Math.abs(n * b - m * a)} টাকা, তাই ${Math.abs(n * b - m * a)}/${m * a} × 100 = ${mixed(ans)}%।`),
    ],
    shortcut: T('Cross-multiply: (n × b − m × a) ÷ (m × a) × 100 for "bought n for ₹a, sold m for ₹b".', 'আড়াআড়ি গুণ: "₹a-এ nটি কেনা, ₹b-এ mটি বেচা" হলে (n × b − m × a) ÷ (m × a) × 100।'),
  });
}

// ── 5. two_articles_find_cp ──────────────────────────────────────────────────
const PAIRS = [['watches', 'ঘড়ি'], ['cycles', 'সাইকেল'], ['goats', 'ছাগল'], ['fans', 'পাখা'], ['radios', 'রেডিও'], ['tables', 'টেবিল'], ['cows', 'গরু']].map(([en, bn]) => T(en, bn));

function twoArticlesFindCp(kind = pick(['balance', 'balance', 'swap', 'overall'])) {
  const it = pick(PAIRS);
  const [X] = names(1, NAMES_M);
  let stem;
  let answer;
  let other;
  let total;
  let steps;
  const traps = [];
  if (kind === 'balance' || kind === 'overall') {
    const p = pick([10, 15, 20, 25, 30]);
    const l = pick([5, 10, 15, 20]);
    const g = kind === 'overall' ? pick([2, 4, 5, 6, 8]) : 0;
    if (g >= p || (kind === 'balance' && p === l)) return null;
    const [u, v] = R(l + g, p - g); // CP(profit) : CP(loss)
    const unit = pick([40, 50, 60, 75, 80, 100, 112, 120, 150, 200, 250]);
    if (u === v) return null;
    const cpP = u * unit;
    const cpL = v * unit;
    total = cpP + cpL;
    const askProfit = pick([true, false]);
    answer = askProfit ? cpP : cpL;
    other = askProfit ? cpL : cpP;
    const cond = kind === 'balance'
      ? T('and on the whole he neither gained nor lost', 'এবং সব মিলিয়ে তাঁর লাভ-ক্ষতি কিছুই হল না')
      : T(`and on the whole he gained ${g}%`, `এবং সব মিলিয়ে তাঁর ${g}% লাভ হল`);
    stem = T(`${X.en} bought two ${it.en} for ₹${total} in all. He sold one at a profit of ${p}% and the other at a loss of ${l}%, ${cond.en}. What was the cost price of the one sold at a ${askProfit ? 'profit' : 'loss'}?`,
      `${X.bn} মোট ₹${total}-এ দুটি ${it.bn} কিনলেন। একটি ${p}% লাভে এবং অন্যটি ${l}% ক্ষতিতে বিক্রি করলেন, ${cond.bn}। যেটি ${askProfit ? 'লাভে' : 'ক্ষতিতে'} বিক্রি হল তার ক্রয়মূল্য কত?`);
    traps.push(trapped(rupees(other), 'The cost prices are in the INVERSE ratio of the rates — that is the other article.', 'ক্রয়মূল্যগুলি হারের বিপরীত অনুপাতে — এটি অন্য জিনিসটির দাম।'));
    if (total % 2 === 0) traps.push(trapped(rupees(total / 2), 'Different rates can only balance if the cost prices are different.', 'হার আলাদা হলে দাম সমান হলে লাভ-ক্ষতি মিলবে না।'));
    steps = kind === 'balance'
      ? [
        T(`Profit on one = loss on the other: ${p}% of CP₁ = ${l}% of CP₂, so CP₁ : CP₂ = ${l} : ${p} = ${u} : ${v}.`, `একটির লাভ = অন্যটির ক্ষতি: CP₁-এর ${p}% = CP₂-এর ${l}%, তাই CP₁ : CP₂ = ${l} : ${p} = ${u} : ${v}।`),
        T(`1 part = ${total} ÷ ${u + v} = ₹${unit}, so CP₁ (profit) = ₹${cpP} and CP₂ (loss) = ₹${cpL}.`, `1 ভাগ = ${total} ÷ ${u + v} = ₹${unit}, তাই CP₁ (লাভ) = ₹${cpP} এবং CP₂ (ক্ষতি) = ₹${cpL}।`),
      ]
      : [
        T(`Overall ${g}% gain: (${p} − ${g})% of CP₁ = (${g} + ${l})% of CP₂, so CP₁ : CP₂ = ${l + g} : ${p - g} = ${u} : ${v}.`, `মোট ${g}% লাভ: CP₁-এর (${p} − ${g})% = CP₂-এর (${g} + ${l})%, তাই CP₁ : CP₂ = ${l + g} : ${p - g} = ${u} : ${v}।`),
        T(`1 part = ${total} ÷ ${u + v} = ₹${unit}, so CP₁ (profit) = ₹${cpP} and CP₂ (loss) = ₹${cpL}.`, `1 ভাগ = ${total} ÷ ${u + v} = ₹${unit}, তাই CP₁ (লাভ) = ₹${cpP} এবং CP₂ (ক্ষতি) = ₹${cpL}।`),
      ];
  } else {
    const r1 = pick([5, 10, 15]);
    const r2 = r1 + pick([5, 10]);
    const y = ri(12, 60) * 25;
    const x = y + ri(1, 12) * 10;
    const D = ((r2 - r1) * (x - y)) / 100;
    if (!Number.isInteger(D) || D <= 0) return null;
    total = x + y;
    const askFirst = pick([true, false]);
    answer = askFirst ? x : y;
    other = askFirst ? y : x;
    stem = T(`A shopkeeper bought two ${it.en} for ₹${total} in total. He sold the first at ${r1}% profit and the second at ${r2}% profit. Had he sold the first at ${r2}% profit and the second at ${r1}% profit, he would have got ₹${D} more. What was the cost price of the ${askFirst ? 'first' : 'second'} one?`,
      `একজন দোকানদার মোট ₹${total}-এ দুটি ${it.bn} কিনলেন। প্রথমটি ${r1}% লাভে ও দ্বিতীয়টি ${r2}% লাভে বিক্রি করলেন। প্রথমটি ${r2}% ও দ্বিতীয়টি ${r1}% লাভে বিক্রি করলে তিনি ₹${D} বেশি পেতেন। ${askFirst ? 'প্রথমটির' : 'দ্বিতীয়টির'} ক্রয়মূল্য কত?`);
    traps.push(trapped(rupees(other), 'Swapping the rates brings in MORE only if the first one cost more — the values are the wrong way round.', 'হার অদলবদলে বেশি টাকা আসে শুধু যদি প্রথমটির দাম বেশি হয় — মান দুটি উল্টে গেছে।'));
    const naive = total / 2 + (askFirst ? D : -D);
    if (isInt(naive)) traps.push(trapped(rupees(naive), `₹${D} is ${r2 - r1}% of the difference of the costs, not the difference itself.`, `₹${D} হল দাম দুটির পার্থক্যের ${r2 - r1}%, পার্থক্য নিজে নয়।`));
    steps = [
      T(`Swapping adds ${r2 - r1}% of CP₁ and removes ${r2 - r1}% of CP₂, so ${r2 - r1}% of (CP₁ − CP₂) = ₹${D} and CP₁ − CP₂ = ₹${x - y}.`, `অদলবদলে CP₁-এর ${r2 - r1}% যোগ ও CP₂-এর ${r2 - r1}% বাদ হয়, তাই (CP₁ − CP₂)-এর ${r2 - r1}% = ₹${D} এবং CP₁ − CP₂ = ₹${x - y}।`),
      T(`CP₁ + CP₂ = ${total}, so CP₁ = (${total} + ${x - y}) ÷ 2 = ₹${x} and CP₂ = ₹${y}.`, `CP₁ + CP₂ = ${total}, তাই CP₁ = (${total} + ${x - y}) ÷ 2 = ₹${x} এবং CP₂ = ₹${y}।`),
    ];
  }
  const step = pick([10, 20, 25]);
  const fillers = [1, -1, 2, -2, 3, -3].map((k) => answer + k * step).filter((v) => v > 0 && v < total).map(rupees);
  const options = choose(rupees(answer), traps, fillers);
  if (!options) return null;
  return build({
    topic: TOPIC, subtopic: 'two_articles_find_cp', pattern: 'two_articles_find_cp', tags: ['find_cost_price', 'two_articles', kind],
    difficulty: 3, time: 90, stem, ...options, steps,
    shortcut: kind === 'swap'
      ? T('Swapping two rates changes the takings by (rate gap)% of (CP₁ − CP₂); get the difference, then use the total.', 'দুটি হার অদলবদলে বিক্রির টাকা বদলায় (CP₁ − CP₂)-এর (হারের ফারাক)%; পার্থক্য বের করে মোট দিয়ে ভাগ করো।')
      : T('Cost prices are in the inverse ratio of how far each rate is from the overall result.', 'ক্রয়মূল্যগুলি প্রতিটি হার সামগ্রিক ফল থেকে কত দূরে, তার বিপরীত অনুপাতে।'),
  });
}

// ── 6. successive_discounts (list price -> net price) ────────────────────────
function successiveDiscounts(kind = pick(['additional', 'additional', 'list'])) {
  const item = pick(ITEMS);
  const L = pick([500, 600, 800, 1000, 1200, 1500, 1600, 2000, 2400, 2500, 3000, 4000, 5000, 6000, 8000]);
  const d1 = pick([10, 15, 20, 25, 30]);
  const d2 = pick([4, 5, 8, 10, 12, 15, 20, 25]);
  const p1 = (L * (100 - d1)) / 100;
  const N = (p1 * (100 - d2)) / 100;
  if (!isInt(p1) || !isInt(N)) return null;
  let stem;
  let options;
  let steps;
  if (kind === 'additional') {
    stem = T(`${an(item.en).replace(/^a/, 'A')} ${item.en} is listed at ₹${L} and a discount of ${d1}% is offered on the list price. What additional discount must be offered to bring the net price to ₹${N}?`,
      `একটি ${item.bn}, তালিকা-মূল্য ₹${L}; তালিকা-মূল্যে ${d1}% ছাড় দেওয়া হয়। নিট দাম ₹${N}-এ নামাতে আরও কত শতাংশ ছাড় দিতে হবে?`);
    const traps = [];
    const fromList = R(100 * (L - N) - d1 * L, L);
    if (fromList[0] > 0 && fromList[1] <= 25) traps.push(trapped(pctText(fromList), `The total cut from ₹${L} minus ${d1}% is not the second discount: the second discount is on the reduced price ₹${p1}.`, `₹${L} থেকে মোট কমতি থেকে ${d1}% বাদ দিলে দ্বিতীয় ছাড় হয় না: দ্বিতীয় ছাড় কমে যাওয়া দাম ₹${p1}-এর উপর।`));
    const onList = R(100 * (p1 - N), L);
    if (onList[1] <= 25) traps.push(trapped(pctText(onList), `The ₹${p1 - N} cut was divided by the list price; divide by the reduced price ₹${p1}.`, `₹${p1 - N} কমতিকে তালিকা-মূল্য দিয়ে ভাগ করা হয়েছে; কমে যাওয়া দাম ₹${p1} দিয়ে ভাগ করো।`));
    const fillers = [2, -2, 3, -3, 5, -5].map((k) => d2 + k).filter((v) => v > 0).map((v) => pctText(R(v)));
    options = choose(pctText(R(d2)), traps, fillers);
    steps = [
      T(`After ${d1}% off: ${L} × ${100 - d1}/100 = ₹${p1}.`, `${d1}% ছাড়ের পর: ${L} × ${100 - d1}/100 = ₹${p1}।`),
      T(`Further cut needed = ${p1} − ${N} = ₹${p1 - N}, which is ${p1 - N}/${p1} × 100 = ${d2}% of ₹${p1}.`, `আরও কমাতে হবে = ${p1} − ${N} = ₹${p1 - N}, যা ₹${p1}-এর ${p1 - N}/${p1} × 100 = ${d2}%।`),
    ];
  } else {
    stem = T(`After two successive discounts of ${d1}% and ${d2}%, ${an(item.en)} ${item.en} is sold for ₹${N}. What is its list price?`,
      `পরপর ${d1}% ও ${d2}% ছাড়ের পর একটি ${item.bn} ₹${N}-এ বিক্রি হল। তার তালিকা-মূল্য কত?`);
    const traps = [];
    const added = (N * 100) / (100 - d1 - d2);
    if (isInt(added) && added !== L) traps.push(trapped(rupees(added), `Successive discounts do not add up to ${d1 + d2}%: the second is taken on the already reduced price.`, `পরপর ছাড় যোগ করে ${d1 + d2}% হয় না: দ্বিতীয়টি আগেই কমে যাওয়া দামের উপর।`));
    const upward = (N * (100 + d1 + d2)) / 100;
    if (isInt(upward)) traps.push(trapped(rupees(upward), 'Adding the percentages back to the net price uses the wrong base; divide by the retained fractions instead.', 'নিট দামের উপর শতাংশ যোগ করলে ভিত্তি ভুল হয়; বরং অবশিষ্ট ভগ্নাংশ দিয়ে ভাগ করো।'));
    const step = L >= 2000 ? 100 : 50;
    const fillers = [1, -1, 2, -2, 3].map((k) => L + k * step).map(rupees);
    options = choose(rupees(L), traps, fillers);
    steps = [
      T(`The customer pays ${100 - d1}% of ${100 - d2}% of the list price: L × ${100 - d1}/100 × ${100 - d2}/100 = ${N}.`, `ক্রেতা দেন তালিকা-মূল্যের ${100 - d2}%-এর ${100 - d1}%: L × ${100 - d1}/100 × ${100 - d2}/100 = ${N}।`),
      T(`L = ${N} × 100/${100 - d2} × 100/${100 - d1} = ${p1} × 100/${100 - d1} = ₹${L}.`, `তাই তালিকা-মূল্য L = ${N} × 100/${100 - d2} × 100/${100 - d1} = ${p1} × 100/${100 - d1} = ₹${L}।`),
    ];
  }
  if (!options) return null;
  return build({
    topic: TOPIC, subtopic: 'successive_discounts', pattern: 'successive_discounts', tags: ['successive_discount', 'net_price', kind],
    difficulty: kind === 'additional' ? 2 : 3, time: 60, stem, ...options, steps,
    shortcut: T('Each discount is taken on the price left after the previous one: multiply the retained fractions (100 − d)/100.', 'প্রতিটি ছাড় আগের ছাড়ের পর বাকি দামের উপর: অবশিষ্ট ভগ্নাংশগুলি (100 − d)/100 গুণ করো।'),
  });
}

// ── 7. algebraic (profit % numerically tied to the CP) ───────────────────────
const LINKS = [
  { k: [1, 1], step: 10, en: 'the cost price', bn: 'ক্রয়মূল্যের' },
  { k: [2, 1], step: 10, en: 'twice the cost price', bn: 'ক্রয়মূল্যের দ্বিগুণের' },
  { k: [1, 2], step: 20, en: 'half the cost price', bn: 'ক্রয়মূল্যের অর্ধেকের' },
];

function algebraic(link = pick(LINKS)) {
  const x = ri(2, 15) * link.step;
  const item = itemFor(x);
  const [kn, kd] = link.k;
  const profit = (kn * x * x) / (kd * 100);
  if (!isInt(profit)) return null;
  const S = x + profit;
  const kText = kn === 1 && kd === 1 ? '' : kn === 2 ? '2 × ' : '1/2 × ';
  const stem = T(`${an(item.en).replace(/^a/, 'A')} ${item.en} was sold for ₹${S}. If the percentage of profit was numerically equal to ${link.en} (in rupees), find the cost price.`,
    `একটি ${item.bn} ₹${S}-এ বিক্রি হল। শতকরা লাভ যদি সংখ্যায় ${link.bn} (টাকায়) সমান হয়, তবে ক্রয়মূল্য কত?`);
  const traps = [];
  traps.push(trapped(rupees(profit), 'That is the profit in rupees, not the cost price.', 'এটি টাকায় লাভের পরিমাণ, ক্রয়মূল্য নয়।'));
  if (S % 2 === 0) traps.push(trapped(rupees(S / 2), 'That treats the profit as x rupees; the profit is x% OF the cost price x, i.e. x²/100.', 'এটি লাভকে x টাকা ধরেছে; লাভ হল ক্রয়মূল্য x-এর x%, অর্থাৎ x²/100।'));
  const fillers = [1, -1, 2, -2].map((k) => x + k * link.step).filter((v) => v > 0).map(rupees);
  const options = choose(rupees(x), traps, fillers);
  if (!options) return null;
  return build({
    topic: TOPIC, subtopic: 'algebraic', pattern: 'algebraic', tags: ['find_cost_price', 'quadratic'],
    difficulty: 3, time: 90, stem, ...options,
    steps: [
      T(`Let CP = x. Profit % = ${kText}x, so profit = ${kText}x × x/100 and x + ${kText}x²/100 = ${S}.`, `ধরো CP = x। শতকরা লাভ = ${kText}x, তাই লাভ = ${kText}x × x/100 এবং x + ${kText}x²/100 = ${S}।`),
      T(`Try the options: x = ${x} gives ${x} + ${profit} = ${S}, so CP = ₹${x}.`, `বিকল্পগুলি বসিয়ে দেখো: x = ${x} হলে ${x} + ${profit} = ${S}, তাই CP = ₹${x}।`),
    ],
    shortcut: T('Do not solve the quadratic in the exam — substitute each option into CP + (profit % × CP)/100 and keep the one that gives the SP.', 'পরীক্ষায় দ্বিঘাত সমীকরণ সমাধান কোরো না — প্রতিটি বিকল্প CP + (শতকরা লাভ × CP)/100-এ বসিয়ে যেটি SP দেয় সেটি নাও।'),
  });
}

const GENERATORS = {
  profit_loss_percent: profitLossPercent,
  cp_sp_ratio: cpSpRatio,
  two_selling_prices: twoSellingPrices,
  buy_sell_count_rates: buySellCountRates,
  two_articles_find_cp: twoArticlesFindCp,
  successive_discounts: successiveDiscounts,
  algebraic,
};

module.exports = {
  subject: 'quant',
  topics: [{ topic: TOPIC, weight: 1, gens: Object.values(GENERATORS).map((g) => () => g()) }],
  GENERATORS,
  profitLossPercent, cpSpRatio, twoSellingPrices, buySellCountRates, twoArticlesFindCp, successiveDiscounts, algebraic,
};
