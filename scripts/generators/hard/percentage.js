'use strict';

/**
 * Hard Percentage questions. Pattern matrix: db/patterns/quant/hard/percentage.js.
 * Numbers are chosen so every answer is exact to two decimals; a choice that is
 * not returns null and the bank simply draws again.
 */

const { pick, ri } = require('../common');
const { T, ex, clean, bnOf, makeQuestionFactory } = require('./framework');
const registry = require('../../../db/patterns/quant/hard/percentage');

const q = makeQuestionFactory('percentage', registry);
const f = (r) => 1 + r / 100;

// Price rises whose matching consumption cut is exact to two decimals (25 -> 20, 60 -> 37.5, ...).
const CLEAN_RISES = Array.from({ length: 300 }, (_, i) => i + 1).filter((a) => clean((a / (100 + a)) * 100));
const GOODS = [T('sugar', 'চিনি'), T('rice', 'চাল'), T('petrol', 'পেট্রোল'), T('mustard oil', 'সরষের তেল'), T('milk', 'দুধ')];

const gens = {
  pct_three_step_net() {
    const variant = pick(['price', 'population']);
    const a = pick([10, 20, 25, 30, 40, 50]);
    const b = pick([10, 20, 25, 30, 40]);
    const c = pick([5, 10, 15, 20, 25]);
    const net = (f(a) * f(-b) * f(c) - 1) * 100;
    if (!clean(net) || Math.abs(net) < 0.01) return null;
    const stem = variant === 'price'
      ? T(`The price of an article is first increased by ${a}%, then reduced by ${b}%, and finally increased by ${c}%. What is the net change in its price?`,
        `একটি জিনিসের দাম প্রথমে ${a}% বাড়ানো হল, তারপর ${b}% কমানো হল এবং শেষে আবার ${c}% বাড়ানো হল। দামের মোট পরিবর্তন কত?`)
      : T(`The population of a town rose by ${a}% in the first year, fell by ${b}% in the second year and rose by ${c}% in the third year. What is the net change over the three years?`,
        `একটি শহরের জনসংখ্যা প্রথম বছরে ${a}% বাড়ল, দ্বিতীয় বছরে ${b}% কমল এবং তৃতীয় বছরে ${c}% বাড়ল। তিন বছরে জনসংখ্যার মোট পরিবর্তন কত?`);
    return q({
      id: 'pct_three_step_net', variant, kind: 'change', answer: net, given: { a, b, c }, stem,
      hints: [
        [a - b + c, 'The rates were added and subtracted directly; each change acts on a new base.', 'হারগুলি সরাসরি যোগ-বিয়োগ করা হয়েছে; প্রতিটি পরিবর্তন নতুন ভিত্তির উপর হয়।'],
        [(f(a) * f(-b) - 1) * 100, 'Only the first two changes were applied.', 'শুধু প্রথম দুটি পরিবর্তন ধরা হয়েছে।'],
        [(f(a) * f(b) * f(c) - 1) * 100, 'The fall was treated as a rise.', 'কমাকে বাড়া হিসেবে ধরা হয়েছে।'],
      ],
      steps: [
        T('Take the starting value as 100.', 'শুরুর মান 100 ধরি।'),
        T(`After the three changes: 100 × ${ex(f(a))} × ${ex(f(-b))} × ${ex(f(c))} = ${ex(100 + net)}.`, `তিনটি পরিবর্তনের পর: 100 × ${ex(f(a))} × ${ex(f(-b))} × ${ex(f(c))} = ${ex(100 + net)}।`),
        T(`Net change = ${ex(100 + net)} − 100 = ${ex(net)}, i.e. ${ex(Math.abs(net))}% ${net >= 0 ? 'increase' : 'decrease'}.`, `মোট পরিবর্তন = ${ex(100 + net)} − 100 = ${ex(net)}, অর্থাৎ ${ex(Math.abs(net))}% ${net >= 0 ? 'বৃদ্ধি' : 'হ্রাস'}।`),
      ],
      shortcut: T('Multiply the factors (1 + r/100); never add percentage changes that act one after another.', 'গুণক (1 + r/100) গুণ করো; একটির পর একটি হওয়া শতকরা পরিবর্তন কখনও যোগ কোরো না।'),
    });
  },

  pct_comparison_chain() {
    const variant = pick(['two_links', 'common_base']);
    if (variant === 'two_links') {
      // A is a% more than B; B is b% less than C. A compared with C.
      const a = pick([10, 20, 25, 30, 40, 50, 60]);
      const b = pick([10, 20, 25, 30, 40]);
      const ans = (f(a) * f(-b) - 1) * 100;
      if (!clean(ans) || Math.abs(ans) < 0.01) return null;
      return q({
        id: 'pct_comparison_chain', variant, kind: 'moreLess', answer: ans, given: { a, b },
        stem: T(`Amal's income is ${a}% more than Bimal's, and Bimal's income is ${b}% less than Chandan's. Compared with Chandan's income, Amal's income is:`,
          `অমলের আয় বিমলের আয়ের চেয়ে ${a}% বেশি এবং বিমলের আয় চন্দনের আয়ের চেয়ে ${b}% কম। চন্দনের আয়ের তুলনায় অমলের আয়:`),
        hints: [
          [a - b, 'The two rates were subtracted, but they are on different bases.', 'দুটি হার বিয়োগ করা হয়েছে, কিন্তু তাদের ভিত্তি আলাদা।'],
          [(1 - f(a) * f(-b)) * 100, 'The comparison was reversed (Chandan against Amal).', 'তুলনাটি উল্টো দিকে করা হয়েছে।'],
          [(f(a) / f(b) - 1) * 100, '“b% less than C” was taken as C being b% more than B.', '“C-এর চেয়ে b% কম”-কে “B-এর চেয়ে C b% বেশি” ধরা হয়েছে।'],
        ],
        steps: [
          T("Let Chandan's income be 100.", 'চন্দনের আয় 100 ধরি।'),
          T(`Bimal = 100 × ${ex(f(-b))} = ${ex(100 * f(-b))}; Amal = ${ex(100 * f(-b))} × ${ex(f(a))} = ${ex(100 * f(-b) * f(a))}.`, `বিমল = 100 × ${ex(f(-b))} = ${ex(100 * f(-b))}; অমল = ${ex(100 * f(-b))} × ${ex(f(a))} = ${ex(100 * f(-b) * f(a))}।`),
          T(`On Chandan's 100, Amal's income is ${ex(Math.abs(ans))}% ${ans >= 0 ? 'more' : 'less'}.`, `চন্দনের 100-এর তুলনায় অমলের আয় ${ex(Math.abs(ans))}% ${ans >= 0 ? 'বেশি' : 'কম'}।`),
        ],
        shortcut: T('Put 100 on the quantity the comparison is made against, then chain the factors.', 'যার সঙ্গে তুলনা হচ্ছে তাকে 100 ধরে গুণকগুলি পরপর গুণ করো।'),
      });
    }
    // A is a% more than B, C is c% less than B. By what % is C less than A?
    const a = pick([20, 25, 50, 60, 75, 100]);
    const c = pick([10, 20, 25, 40, 50]);
    const ans = ((a + c) / (100 + a)) * 100;
    if (!clean(ans)) return null;
    return q({
      id: 'pct_comparison_chain', variant, kind: 'percent', answer: ans, given: { a, c },
      stem: T(`Rice costs ${a}% more than wheat, and maize costs ${c}% less than wheat. By what percent is maize cheaper than rice?`,
        `চালের দাম গমের দামের চেয়ে ${a}% বেশি এবং ভুট্টার দাম গমের দামের চেয়ে ${c}% কম। ভুট্টার দাম চালের দামের চেয়ে শতকরা কত কম?`),
      hints: [
        [a + c, 'The rates were added on the wheat base; the question asks on the rice base.', 'গমের ভিত্তিতে হার যোগ করা হয়েছে; প্রশ্নে চালের দামকে ভিত্তি ধরতে বলা হয়েছে।'],
        [((a + c) / (100 - c)) * 100, 'The difference was divided by the price of maize instead of rice.', 'পার্থক্যকে চালের বদলে ভুট্টার দাম দিয়ে ভাগ করা হয়েছে।'],
      ],
      steps: [
        T('Let wheat cost 100.', 'গমের দাম 100 ধরি।'),
        T(`Rice = ${100 + a}, maize = ${100 - c}; difference = ${a + c}.`, `চাল = ${100 + a}, ভুট্টা = ${100 - c}; পার্থক্য = ${a + c}।`),
        T(`On the rice price: ${a + c} ÷ ${100 + a} × 100 = ${ex(ans)}%.`, `চালের দামের উপর: ${a + c} ÷ ${100 + a} × 100 = ${ex(ans)}%।`),
      ],
      shortcut: T('“Cheaper than rice” means the base is rice: difference ÷ rice price × 100.', '“চালের চেয়ে সস্তা” মানে ভিত্তি চাল: পার্থক্য ÷ চালের দাম × 100।'),
    });
  },

  pct_expenditure_consumption() {
    const variant = pick(['same_spend', 'limited_rise']);
    const good = pick(GOODS);
    if (variant === 'same_spend') {
      const a = pick(CLEAN_RISES);
      const ans = (a / (100 + a)) * 100;
      return q({
        id: 'pct_expenditure_consumption', variant, kind: 'percent', answer: ans, given: { a },
        stem: T(`The price of ${good.en} rises by ${a}%. By what percent must a family reduce its consumption of ${good.en} so that its expenditure on it does not change?`,
          `${bnOf(good)} দাম ${a}% বেড়েছে। এর জন্য খরচ একই রাখতে একটি পরিবারকে ${bnOf(good)} ব্যবহার শতকরা কত কমাতে হবে?`),
        hints: [
          [a, 'The cut is not equal to the rise: it is measured on the new price.', 'কমানোর হার বৃদ্ধির হারের সমান নয়: তা নতুন দামের উপর মাপা হয়।'],
          a < 100 ? [(a / (100 - a)) * 100, 'Used (100 − rise) as the base.', '(100 − বৃদ্ধি)-কে ভিত্তি ধরা হয়েছে।'] : [a / 2, 'Halved the rise.', 'বৃদ্ধিকে অর্ধেক করা হয়েছে।'],
        ],
        steps: [
          T('Let price = 100 and consumption = 100, so expenditure = 10000.', 'দাম = 100 ও ব্যবহার = 100 ধরি, তাহলে খরচ = 10000।'),
          T(`New price = ${100 + a}; to keep expenditure 10000, consumption = 10000 ÷ ${100 + a} = ${ex(10000 / (100 + a))}.`, `নতুন দাম = ${100 + a}; খরচ 10000 রাখতে ব্যবহার = 10000 ÷ ${100 + a} = ${ex(10000 / (100 + a))}।`),
          T(`Reduction = ${ex(100 - 10000 / (100 + a))} on 100, i.e. ${ex(ans)}%.`, `কমাতে হবে 100-এর মধ্যে ${ex(100 - 10000 / (100 + a))}, অর্থাৎ ${ex(ans)}%।`),
        ],
        shortcut: T('Cut = rise ÷ (100 + rise) × 100.', 'কমানোর হার = বৃদ্ধি ÷ (100 + বৃদ্ধি) × 100।'),
      });
    }
    const a = ri(10, 150);
    const b = ri(2, Math.min(a - 2, 40));
    const ans = ((a - b) / (100 + a)) * 100;
    if (!clean(ans)) return null;
    return q({
      id: 'pct_expenditure_consumption', variant, kind: 'percent', answer: ans, given: { a, b },
      stem: T(`The price of cooking gas goes up by ${a}%, but a household can let its spending on gas rise by only ${b}%. By what percent must it cut its gas consumption?`,
        `রান্নার গ্যাসের দাম ${a}% বেড়েছে, কিন্তু একটি পরিবার গ্যাসের খরচ মাত্র ${b}% বাড়াতে পারে। গ্যাসের ব্যবহার শতকরা কত কমাতে হবে?`),
      hints: [
        [a - b, 'The rates were subtracted; consumption = spending ÷ price.', 'হার বিয়োগ করা হয়েছে; ব্যবহার = খরচ ÷ দাম।'],
        [((a - b) / (100 + b)) * 100, 'Divided by the new spending instead of the new price.', 'নতুন দামের বদলে নতুন খরচ দিয়ে ভাগ করা হয়েছে।'],
        [(a / (100 + a)) * 100, 'Ignored the allowed rise in spending.', 'খরচের অনুমোদিত বৃদ্ধি বাদ দেওয়া হয়েছে।'],
      ],
      steps: [
        T('Let price = 100 and consumption = 100, so spending = 10000.', 'দাম = 100 ও ব্যবহার = 100 ধরি, খরচ = 10000।'),
        T(`New price = ${100 + a}; allowed spending = ${100 * (100 + b)}; consumption = ${100 * (100 + b)} ÷ ${100 + a} = ${ex((100 * (100 + b)) / (100 + a))}.`, `নতুন দাম = ${100 + a}; অনুমোদিত খরচ = ${100 * (100 + b)}; ব্যবহার = ${100 * (100 + b)} ÷ ${100 + a} = ${ex((100 * (100 + b)) / (100 + a))}।`),
        T(`Cut = 100 − ${ex((100 * (100 + b)) / (100 + a))} = ${ex(ans)}%.`, `কমানো = 100 − ${ex((100 * (100 + b)) / (100 + a))} = ${ex(ans)}%।`),
      ],
      shortcut: T('Cut % = (price rise − spending rise) ÷ (100 + price rise) × 100.', 'কমানোর % = (দাম বৃদ্ধি − খরচ বৃদ্ধি) ÷ (100 + দাম বৃদ্ধি) × 100।'),
    });
  },

  pct_reverse_successive() {
    const variant = pick(['final_value', 'net_amount']);
    const a = pick([10, 20, 25, 30, 40, 50]);
    const b = pick([10, 20, 25, 30, 40].filter((x) => x !== a));
    const x = ri(8, 60) * 500;
    if (Math.abs(f(a) * f(-b) - 1) < 1e-9) return null; // the changes cancel out: no real question
    const final = x * f(a) * f(-b);
    if (!Number.isInteger(Math.round(final * 100) / 100) || !clean(final) || final % 1 !== 0) return null;
    if (variant === 'final_value') {
      return q({
        id: 'pct_reverse_successive', variant, kind: 'money', answer: x, given: { a, b, final },
        stem: T(`Ritu's salary was increased by ${a}% and later the new salary was reduced by ${b}%. Her salary is now ₹${final}. What was her original salary?`,
          `ঋতুর বেতন প্রথমে ${a}% বাড়ানো হল, পরে নতুন বেতন ${b}% কমানো হল। এখন তাঁর বেতন ₹${final}। তাঁর প্রথম বেতন কত ছিল?`),
        hints: [
          [final * f(-a) * f(b), 'Reversed with the opposite percentages on the final value; percentages do not undo that way.', 'শেষ মানের উপর উল্টো শতাংশ প্রয়োগ করা হয়েছে; এভাবে শতাংশ উল্টানো যায় না।'],
          [final / f(a - b), 'Used the simple difference of the rates as one change.', 'হারের সরল পার্থক্যকে একটি পরিবর্তন ধরা হয়েছে।'],
        ],
        steps: [
          T('Let the original salary be x.', 'প্রথম বেতন x ধরি।'),
          T(`After both changes: x × ${ex(f(a))} × ${ex(f(-b))} = ${ex(f(a) * f(-b))}x = ${final}.`, `দুটি পরিবর্তনের পর: x × ${ex(f(a))} × ${ex(f(-b))} = ${ex(f(a) * f(-b))}x = ${final}।`),
          T(`x = ${final} ÷ ${ex(f(a) * f(-b))} = ₹${x}.`, `অতএব x = ${final} ÷ ${ex(f(a) * f(-b))} = ₹${x}।`),
        ],
        shortcut: T('Divide the final value by the product of the factors.', 'শেষ মানকে গুণকগুলির গুণফল দিয়ে ভাগ করো।'),
      });
    }
    const diff = Math.abs(final - x);
    if (!diff) return null;
    const word = final > x ? T('more', 'বেশি') : T('less', 'কম');
    return q({
      id: 'pct_reverse_successive', variant, kind: 'money', answer: x, given: { a, b, diff },
      stem: T(`A shopkeeper raised the price of a cycle by ${a}% and then, during a sale, reduced the new price by ${b}%. The sale price is ₹${diff} ${word.en} than the original price. What was the original price?`,
        `একজন দোকানদার একটি সাইকেলের দাম ${a}% বাড়ালেন, তারপর সেলের সময় নতুন দাম ${b}% কমালেন। সেলের দাম আসল দামের চেয়ে ₹${diff} ${word.bn}। সাইকেলের আসল দাম কত ছিল?`),
      hints: [
        [(diff * 100) / Math.abs(a - b), 'Treated the net change as (a − b)%, ignoring the compounding.', 'মোট পরিবর্তনকে (a − b)% ধরা হয়েছে; পরপর প্রয়োগের প্রভাব বাদ পড়েছে।'],
        [final, 'This is the sale price, not the original price.', 'এটি সেলের দাম, আসল দাম নয়।'],
      ],
      steps: [
        T(`Net factor = ${ex(f(a))} × ${ex(f(-b))} = ${ex(f(a) * f(-b))}, a net change of ${ex((f(a) * f(-b) - 1) * 100)}%.`, `মোট গুণক = ${ex(f(a))} × ${ex(f(-b))} = ${ex(f(a) * f(-b))}, অর্থাৎ মোট পরিবর্তন ${ex((f(a) * f(-b) - 1) * 100)}%।`),
        T(`So ${ex(Math.abs(f(a) * f(-b) - 1) * 100)}% of the original price = ₹${diff}.`, `অতএব আসল দামের ${ex(Math.abs(f(a) * f(-b) - 1) * 100)}% = ₹${diff}।`),
        T(`Original price = ${diff} ÷ ${ex(Math.abs(f(a) * f(-b) - 1))} = ₹${x}.`, `আসল দাম = ${diff} ÷ ${ex(Math.abs(f(a) * f(-b) - 1))} = ₹${x}।`),
      ],
      shortcut: T('Find the net % change first; the given rupee difference is that % of the original.', 'আগে মোট শতকরা পরিবর্তন বের করো; দেওয়া টাকার পার্থক্যটি আসল দামের ওই শতাংশ।'),
    });
  },

  pct_election() {
    const variant = pick(['margin_to_total', 'total_to_votes']);
    const n = pick([10, 15, 20, 25]);
    const i = pick([4, 5, 10, 20]);
    const w = pick([52, 55, 56, 60, 62, 65, 70]);
    const N = ri(4, 40) * 1000;
    const cast = (N * (100 - n)) / 100;
    const valid = (cast * (100 - i)) / 100;
    const win = (valid * w) / 100;
    if (![cast, valid, win].every(Number.isInteger)) return null;
    const lose = valid - win;
    const margin = win - lose;
    if (variant === 'margin_to_total') {
      return q({
        id: 'pct_election', variant, kind: 'votes', answer: N, given: { n, i, w, margin },
        stem: T(`In an election between two candidates, ${n}% of the voters did not vote and ${i}% of the votes cast were invalid. The winner got ${w}% of the valid votes and won by ${margin} votes. How many voters were on the list?`,
          `দুজন প্রার্থীর একটি নির্বাচনে ${n}% ভোটার ভোট দেননি এবং প্রদত্ত ভোটের ${i}% বাতিল হয়েছে। বিজয়ী বৈধ ভোটের ${w}% পেয়ে ${margin} ভোটে জিতেছেন। ভোটার তালিকায় মোট কতজন ভোটার ছিলেন?`),
        hints: [
          [margin / ((2 * w - 100) / 100) / ((100 - n) / 100), 'The invalid votes were ignored.', 'বাতিল ভোট বাদ দেওয়া হয়নি।'],
          [margin / ((2 * w - 100) / 100), 'This is only the number of valid votes.', 'এটি শুধু বৈধ ভোটের সংখ্যা।'],
          [margin / (w / 100) / ((100 - n) / 100) / ((100 - i) / 100), 'The margin was taken as the winner’s share instead of the gap between the two.', 'জয়ের ব্যবধানকে বিজয়ীর অংশ ধরা হয়েছে।'],
        ],
        steps: [
          T(`Margin = ${w}% − ${100 - w}% = ${2 * w - 100}% of valid votes, so valid votes = ${margin} ÷ ${ex((2 * w - 100) / 100)} = ${valid}.`, `ব্যবধান = বৈধ ভোটের ${w}% − ${100 - w}% = ${2 * w - 100}%, তাই বৈধ ভোট = ${margin} ÷ ${ex((2 * w - 100) / 100)} = ${valid}।`),
          T(`Valid votes are ${100 - i}% of votes cast: cast = ${valid} ÷ ${ex((100 - i) / 100)} = ${cast}.`, `বৈধ ভোট প্রদত্ত ভোটের ${100 - i}%: প্রদত্ত ভোট = ${valid} ÷ ${ex((100 - i) / 100)} = ${cast}।`),
          T(`Votes cast are ${100 - n}% of the list: total = ${cast} ÷ ${ex((100 - n) / 100)} = ${N}.`, `প্রদত্ত ভোট তালিকার ${100 - n}%: মোট ভোটার = ${cast} ÷ ${ex((100 - n) / 100)} = ${N}।`),
        ],
        shortcut: T('Peel the layers from inside out: margin → valid → cast → electorate.', 'ভেতর থেকে বাইরে স্তর খোলো: ব্যবধান → বৈধ → প্রদত্ত → মোট ভোটার।'),
      });
    }
    return q({
      id: 'pct_election', variant, kind: 'votes', answer: lose, given: { N, n, i, w },
      stem: T(`A ward has ${N} voters. In a two-candidate election, ${n}% of them did not vote and ${i}% of the votes cast were rejected as invalid. The winner received ${w}% of the valid votes. How many votes did the losing candidate get?`,
        `একটি ওয়ার্ডে ${N} জন ভোটার। দুজন প্রার্থীর নির্বাচনে তাঁদের ${n}% ভোট দেননি এবং প্রদত্ত ভোটের ${i}% বাতিল হয়েছে। বিজয়ী বৈধ ভোটের ${w}% পেয়েছেন। পরাজিত প্রার্থী কত ভোট পেয়েছেন?`),
      hints: [
        [(cast * (100 - w)) / 100, 'The invalid votes were not removed first.', 'আগে বাতিল ভোট বাদ দেওয়া হয়নি।'],
        [(N * (100 - w)) / 100, 'Used the whole voter list instead of the valid votes.', 'বৈধ ভোটের বদলে পুরো ভোটার তালিকা ধরা হয়েছে।'],
        [win, 'This is the winner’s count.', 'এটি বিজয়ীর ভোট।'],
      ],
      steps: [
        T(`Votes cast = ${100 - n}% of ${N} = ${cast}.`, `প্রদত্ত ভোট = ${N}-এর ${100 - n}% = ${cast}।`),
        T(`Valid votes = ${100 - i}% of ${cast} = ${valid}.`, `বৈধ ভোট = ${cast}-এর ${100 - i}% = ${valid}।`),
        T(`Loser = ${100 - w}% of ${valid} = ${lose}.`, `পরাজিত প্রার্থী = ${valid}-এর ${100 - w}% = ${lose}।`),
      ],
      shortcut: T(`Loser = ${N} × ${ex((100 - n) / 100)} × ${ex((100 - i) / 100)} × ${ex((100 - w) / 100)}.`, `পরাজিতের ভোট = ${N} × ${ex((100 - n) / 100)} × ${ex((100 - i) / 100)} × ${ex((100 - w) / 100)}।`),
    });
  },

  pct_income_savings() {
    const variant = pick(['savings_change', 'expense_rise']);
    const s = pick([20, 25, 30, 40]);
    const a = pick([10, 15, 20, 25, 30]);
    if (variant === 'savings_change') {
      const b = pick([5, 10, 15, 20, 25].filter((x) => x !== a));
      const newS = 100 * f(a) - (100 - s) * f(b);
      const ans = ((newS - s) / s) * 100;
      if (!clean(ans) || newS <= 0 || Math.abs(ans) < 0.01) return null;
      return q({
        id: 'pct_income_savings', variant, kind: 'change', answer: ans, given: { s, a, b },
        stem: T(`A man saves ${s}% of his income. His income increases by ${a}% and his expenditure increases by ${b}%. What is the percentage change in his savings?`,
          `একজন ব্যক্তি তাঁর আয়ের ${s}% সঞ্চয় করেন। তাঁর আয় ${a}% এবং ব্যয় ${b}% বাড়ল। তাঁর সঞ্চয়ের শতকরা পরিবর্তন কত?`),
        hints: [
          [a - b, 'Savings is a difference, so its change is not (income rate − expense rate).', 'সঞ্চয় একটি পার্থক্য, তাই তার পরিবর্তন (আয়ের হার − ব্যয়ের হার) নয়।'],
          [a, 'Assumed savings change at the same rate as income.', 'ধরা হয়েছে সঞ্চয় আয়ের হারেই বদলায়।'],
          [newS - s, 'This is the change in rupees per ₹100 of income, not a percentage of savings.', 'এটি প্রতি ₹100 আয়ে টাকার পরিবর্তন, সঞ্চয়ের শতাংশ নয়।'],
        ],
        steps: [
          T(`Take income = 100: expenditure = ${100 - s}, savings = ${s}.`, `আয় = 100 ধরি: ব্যয় = ${100 - s}, সঞ্চয় = ${s}।`),
          T(`New income = ${ex(100 * f(a))}, new expenditure = ${ex((100 - s) * f(b))}, new savings = ${ex(newS)}.`, `নতুন আয় = ${ex(100 * f(a))}, নতুন ব্যয় = ${ex((100 - s) * f(b))}, নতুন সঞ্চয় = ${ex(newS)}।`),
          T(`Change in savings = (${ex(newS)} − ${s}) ÷ ${s} × 100 = ${ex(ans)}%.`, `সঞ্চয়ের পরিবর্তন = (${ex(newS)} − ${s}) ÷ ${s} × 100 = ${ex(ans)}%।`),
        ],
        shortcut: T('Work with income = 100 and compare savings before and after.', 'আয় = 100 ধরে আগের ও পরের সঞ্চয় তুলনা করো।'),
      });
    }
    const b = pick([5, 10, 15, 20]);
    const newS = 100 * f(a) - (100 - s) * f(b);
    const c = ((newS - s) / s) * 100;
    if (!clean(c) || c <= 0 || b >= a + 20) return null;
    return q({
      id: 'pct_income_savings', variant, kind: 'percent', answer: b, given: { s, a, c },
      stem: T(`A woman saves ${s}% of her income. Next year her income rises by ${a}% and her savings rise by ${ex(c)}%. By what percent did her expenditure rise?`,
        `একজন মহিলা তাঁর আয়ের ${s}% সঞ্চয় করেন। পরের বছর তাঁর আয় ${a}% এবং সঞ্চয় ${ex(c)}% বাড়ল। তাঁর ব্যয় শতকরা কত বাড়ল?`),
      hints: [
        [Math.abs(a - c), 'Subtracted the two rates; income, expenditure and savings have different bases.', 'দুটি হার বিয়োগ করা হয়েছে; আয়, ব্যয় ও সঞ্চয়ের ভিত্তি আলাদা।'],
        [((100 * f(a) - s * f(c)) - (100 - s)), 'Found the rupee rise per ₹100 of income, not the rate on expenditure.', 'প্রতি ₹100 আয়ে টাকার বৃদ্ধি বের হয়েছে, ব্যয়ের উপর হার নয়।'],
      ],
      steps: [
        T(`Income = 100: expenditure = ${100 - s}, savings = ${s}.`, `আয় = 100: ব্যয় = ${100 - s}, সঞ্চয় = ${s}।`),
        T(`New income = ${ex(100 * f(a))}, new savings = ${s} × ${ex(f(c))} = ${ex(s * f(c))}, so new expenditure = ${ex(100 * f(a) - s * f(c))}.`, `নতুন আয় = ${ex(100 * f(a))}, নতুন সঞ্চয় = ${s} × ${ex(f(c))} = ${ex(s * f(c))}, তাই নতুন ব্যয় = ${ex(100 * f(a) - s * f(c))}।`),
        T(`Rise in expenditure = (${ex(100 * f(a) - s * f(c))} − ${100 - s}) ÷ ${100 - s} × 100 = ${b}%.`, `ব্যয়ের বৃদ্ধি = (${ex(100 * f(a) - s * f(c))} − ${100 - s}) ÷ ${100 - s} × 100 = ${b}%।`),
      ],
      shortcut: T('New expenditure = new income − new savings; then compare with the old expenditure.', 'নতুন ব্যয় = নতুন আয় − নতুন সঞ্চয়; তারপর পুরনো ব্যয়ের সঙ্গে তুলনা করো।'),
    });
  },

  pct_pass_marks() {
    const variant = pick(['max_marks', 'pass_percent']);
    const M = pick([200, 300, 400, 500, 600, 800, 1000]);
    const a = ri(20, 35);
    const b = a + ri(8, 25);
    const P = ri(Math.ceil((a * M) / 100) + 5, Math.floor((b * M) / 100) - 5);
    const sa = (a * M) / 100;
    const sb = (b * M) / 100;
    if (!Number.isInteger(sa) || !Number.isInteger(sb)) return null;
    const m = P - sa;
    const n = sb - P;
    const pp = (P / M) * 100;
    if (m <= 0 || n <= 0 || !clean(pp)) return null;
    const stem = T(`In an examination, a candidate who scores ${a}% of the maximum marks fails by ${m} marks, while another who scores ${b}% gets ${n} marks more than the pass mark.`,
      `একটি পরীক্ষায় পূর্ণমানের ${a}% পাওয়া একজন পরীক্ষার্থী ${m} নম্বরের জন্য অকৃতকার্য হয়, আর ${b}% পাওয়া আরেকজন পাস নম্বরের চেয়ে ${n} নম্বর বেশি পায়।`);
    const common = [
      T(`The two scores differ by ${b}% − ${a}% = ${b - a}% of the maximum, and in marks by ${m} + ${n} = ${m + n}.`, `দুটি নম্বরের পার্থক্য পূর্ণমানের ${b}% − ${a}% = ${b - a}%, আবার নম্বরে ${m} + ${n} = ${m + n}।`),
      T(`So maximum marks = ${m + n} ÷ ${ex((b - a) / 100)} = ${M}.`, `অতএব পূর্ণমান = ${m + n} ÷ ${ex((b - a) / 100)} = ${M}।`),
    ];
    if (variant === 'max_marks') {
      return q({
        id: 'pct_pass_marks', variant, kind: 'marks', answer: M, given: { a, b, m, n },
        stem: T(`${stem.en} What are the maximum marks?`, `${stem.bn} পূর্ণমান কত?`),
        hints: [
          [((n - m) / (b - a)) * 100, 'The fail and pass gaps were subtracted; they lie on opposite sides of the pass mark, so they add.', 'ফেল ও পাসের ব্যবধান বিয়োগ করা হয়েছে; তারা পাস নম্বরের দুই দিকে, তাই যোগ হবে।'],
          [((m + n) / (b + a)) * 100, 'The percentages were added instead of subtracted.', 'শতাংশ দুটি বিয়োগের বদলে যোগ করা হয়েছে।'],
        ],
        steps: [...common, T(`Check: pass mark = ${sa} + ${m} = ${P} = ${sb} − ${n}.`, `যাচাই: পাস নম্বর = ${sa} + ${m} = ${P} = ${sb} − ${n}।`)],
        shortcut: T('Maximum = (sum of the two gaps) ÷ (difference of the percentages) × 100.', 'পূর্ণমান = (দুই ব্যবধানের যোগফল) ÷ (শতাংশের পার্থক্য) × 100।'),
      });
    }
    return q({
      id: 'pct_pass_marks', variant, kind: 'percent', answer: pp, given: { a, b, m, n },
      stem: T(`${stem.en} What percentage of the maximum marks is needed to pass?`, `${stem.bn} পাস করতে পূর্ণমানের শতকরা কত নম্বর লাগে?`),
      hints: [
        [(a + b) / 2, 'The pass mark is not halfway between the two percentages unless the gaps are equal.', 'ব্যবধান দুটি সমান না হলে পাস নম্বর দুই শতাংশের ঠিক মাঝখানে হয় না।'],
        [a + m / 10, 'The fail gap in marks was treated as a percentage.', 'নম্বরের ব্যবধানকে শতাংশ ধরা হয়েছে।'],
      ],
      steps: [...common, T(`Pass mark = ${a}% of ${M} + ${m} = ${sa} + ${m} = ${P}, which is ${ex(pp)}% of ${M}.`, `পাস নম্বর = ${M}-এর ${a}% + ${m} = ${sa} + ${m} = ${P}, যা ${M}-এর ${ex(pp)}%।`)],
      shortcut: T('Find the maximum from the two gaps first; then pass % = pass mark ÷ maximum × 100.', 'আগে দুই ব্যবধান থেকে পূর্ণমান বের করো; তারপর পাসের % = পাস নম্বর ÷ পূর্ণমান × 100।'),
    });
  },

  pct_overlap_fail() {
    const variant = pick(['total_from_passed', 'failed_one_subject']);
    const x = ri(15, 40);
    const y = ri(15, 40);
    const z = ri(5, Math.min(x, y) - 5);
    const pass = 100 - (x + y - z);
    const N = ri(4, 30) * 100;
    const P = (N * pass) / 100;
    if (!Number.isInteger(P) || pass <= 0) return null;
    if (variant === 'total_from_passed') {
      return q({
        id: 'pct_overlap_fail', variant, kind: 'persons', answer: N, given: { x, y, z, P },
        stem: T(`In an examination, ${x}% of the candidates failed in English, ${y}% failed in Mathematics and ${z}% failed in both. If ${P} candidates passed in both subjects, how many candidates appeared?`,
          `একটি পরীক্ষায় ${x}% পরীক্ষার্থী ইংরেজিতে, ${y}% গণিতে এবং ${z}% দুটিতেই অকৃতকার্য হয়েছে। যদি ${P} জন উভয় বিষয়ে পাস করে থাকে, তবে মোট কতজন পরীক্ষা দিয়েছিল?`),
        hints: [
          [P / (1 - (x + y) / 100), 'Those who failed in both were counted twice.', 'দুটিতেই অকৃতকার্যদের দুবার গোনা হয়েছে।'],
          [(P * 100) / (x + y - z), 'Used the failure percentage as if it were the pass percentage.', 'অকৃতকার্যের শতাংশকে পাসের শতাংশ ধরা হয়েছে।'],
        ],
        steps: [
          T(`Failed in at least one subject = ${x} + ${y} − ${z} = ${x + y - z}%.`, `অন্তত একটি বিষয়ে অকৃতকার্য = ${x} + ${y} − ${z} = ${x + y - z}%।`),
          T(`Passed in both = 100 − ${x + y - z} = ${pass}%.`, `উভয় বিষয়ে পাস = 100 − ${x + y - z} = ${pass}%।`),
          T(`${pass}% of the total = ${P}, so total = ${P} × 100 ÷ ${pass} = ${N}.`, `মোটের ${pass}% = ${P}, তাই মোট = ${P} × 100 ÷ ${pass} = ${N}।`),
        ],
        shortcut: T('Pass in both % = 100 − (x + y − both).', 'উভয়ে পাস % = 100 − (x + y − উভয়ে ফেল)।'),
      });
    }
    const one = (N * (x + y - 2 * z)) / 100;
    if (!Number.isInteger(one)) return null;
    return q({
      id: 'pct_overlap_fail', variant, kind: 'persons', answer: one, given: { N, x, y, z },
      stem: T(`${N} students took a test. ${x}% failed in English, ${y}% failed in Mathematics and ${z}% failed in both. How many students failed in exactly one subject?`,
        `${N} জন ছাত্রছাত্রী একটি পরীক্ষা দিয়েছে। ${x}% ইংরেজিতে, ${y}% গণিতে এবং ${z}% দুটিতেই অকৃতকার্য। ঠিক একটি বিষয়ে কতজন অকৃতকার্য হয়েছে?`),
      hints: [
        [(N * (x + y - z)) / 100, 'This counts those who failed in at least one subject, including both.', 'এতে অন্তত একটিতে ফেল করা সবাই আছে, দুটিতে ফেল করারাও।'],
        [(N * (x + y)) / 100, 'Simply added the two failure figures.', 'শুধু দুটি ফেলের সংখ্যা যোগ করা হয়েছে।'],
      ],
      steps: [
        T(`Only English = ${x} − ${z} = ${x - z}%; only Mathematics = ${y} − ${z} = ${y - z}%.`, `শুধু ইংরেজিতে = ${x} − ${z} = ${x - z}%; শুধু গণিতে = ${y} − ${z} = ${y - z}%।`),
        T(`Exactly one subject = ${x - z} + ${y - z} = ${x + y - 2 * z}%.`, `ঠিক একটি বিষয়ে = ${x - z} + ${y - z} = ${x + y - 2 * z}%।`),
        T(`${x + y - 2 * z}% of ${N} = ${one}.`, `${N}-এর ${x + y - 2 * z}% = ${one}।`),
      ],
      shortcut: T('Exactly one = x + y − 2 × both.', 'ঠিক একটিতে = x + y − 2 × উভয়ে।'),
    });
  },

  pct_dimension_reverse() {
    const variant = pick(['rectangle', 'revenue']);
    const a = pick([10, 20, 25, 30, 40, 50]);
    const b = pick([-30, -25, -20, -15, -10, -5, 5, 10, 20]);
    const c = (f(a) * f(b) - 1) * 100;
    if (!clean(c) || Math.abs(c) < 0.01) return null;
    const cWord = c >= 0 ? T(`increases by ${ex(c)}%`, `${ex(c)}% বাড়ে`) : T(`decreases by ${ex(-c)}%`, `${ex(-c)}% কমে`);
    const stem = variant === 'rectangle'
      ? T(`The length of a rectangle is increased by ${a}% and its breadth is changed so that its area ${cWord.en}. What is the change in the breadth?`,
        `একটি আয়তক্ষেত্রের দৈর্ঘ্য ${a}% বাড়ানো হল এবং প্রস্থ এমনভাবে বদলানো হল যে ক্ষেত্রফল ${cWord.bn}। প্রস্থের পরিবর্তন কত?`)
      : T(`A theatre raised its ticket price by ${a}%. As a result, its total collection ${cWord.en}. What was the change in the number of tickets sold?`,
        `একটি প্রেক্ষাগৃহ টিকিটের দাম ${a}% বাড়াল। এর ফলে মোট আদায় ${cWord.bn}। বিক্রি হওয়া টিকিটের সংখ্যায় পরিবর্তন কত?`);
    return q({
      id: 'pct_dimension_reverse', variant, kind: 'change', answer: b, given: { a, c: Math.abs(c), _cSign: Math.sign(c) },
      stem,
      hints: [
        [c - a, 'Percent changes of a product multiply; they do not subtract.', 'গুণফলের শতকরা পরিবর্তন গুণ হয়, বিয়োগ হয় না।'],
        [((c - a) / (100 + c)) * 100, 'Divided by the new total instead of the new first factor.', 'নতুন প্রথম গুণকের বদলে নতুন মোট দিয়ে ভাগ করা হয়েছে।'],
        [c + a, 'Added the two rates.', 'দুটি হার যোগ করা হয়েছে।'],
      ],
      steps: [
        T('For a product, (1 + a/100)(1 + b/100) = 1 + c/100.', 'গুণফলের জন্য (1 + a/100)(1 + b/100) = 1 + c/100।'),
        T(`1 + b/100 = ${ex(f(c))} ÷ ${ex(f(a))} = ${ex(f(b))}.`, `তাহলে 1 + b/100 = ${ex(f(c))} ÷ ${ex(f(a))} = ${ex(f(b))}।`),
        T(`So the other factor changes by ${ex(b)}%, i.e. ${ex(Math.abs(b))}% ${b >= 0 ? 'increase' : 'decrease'}.`, `অতএব অন্য গুণকটির পরিবর্তন ${ex(b)}%, অর্থাৎ ${ex(Math.abs(b))}% ${b >= 0 ? 'বৃদ্ধি' : 'হ্রাস'}।`),
      ],
      shortcut: T('Divide the factors: (100 + c)/(100 + a) − 1.', 'গুণক ভাগ করো: (100 + c)/(100 + a) − 1।'),
    });
  },

  pct_population_groups() {
    const variant = pick(['find_men', 'unchanged_total']);
    const N = ri(10, 60) * 1000;
    if (variant === 'find_men') {
      const m = pick([5, 8, 10, 12, 15, 20]);
      const w = pick([2, 4, 5, 6, 8].filter((x) => x < m));
      const men = ri(2, 8) * (N / 10);
      const o = ((men * m + (N - men) * w) / N);
      if (!clean(o) || !Number.isInteger(men) || men <= 0 || men >= N) return null;
      return q({
        id: 'pct_population_groups', variant, kind: 'persons', answer: men, given: { N, m, w, o },
        stem: T(`A town has ${N} people. In a year the number of men rises by ${m}% and the number of women by ${w}%, and the whole population rises by ${ex(o)}%. How many men were there at the start?`,
          `একটি শহরে ${N} জন মানুষ। এক বছরে পুরুষের সংখ্যা ${m}% এবং মহিলার সংখ্যা ${w}% বাড়ল, আর মোট জনসংখ্যা বাড়ল ${ex(o)}%। শুরুতে পুরুষ কতজন ছিলেন?`),
        hints: [
          [N - men, 'This is the number of women.', 'এটি মহিলাদের সংখ্যা।'],
          [(N * o) / m, 'Treated the whole increase as coming from men.', 'পুরো বৃদ্ধিকে শুধু পুরুষদের থেকে ধরা হয়েছে।'],
          [(N * (o - w)) / (m + w), 'The denominator must be the difference of the two rates.', 'হরে দুটি হারের পার্থক্য হবে।'],
        ],
        steps: [
          T(`Let men = M, women = ${N} − M. Increase: ${m}% of M + ${w}% of (${N} − M) = ${ex(o)}% of ${N}.`, `পুরুষ = M, মহিলা = ${N} − M ধরি। বৃদ্ধি: M-এর ${m}% + (${N} − M)-এর ${w}% = ${N}-এর ${ex(o)}%।`),
          T(`So (${m} − ${w})M = (${ex(o)} − ${w}) × ${N}.`, `অতএব (${m} − ${w})M = (${ex(o)} − ${w}) × ${N}।`),
          T(`M = ${ex((o - w) * N)} ÷ ${m - w} = ${men}.`, `অতএব M = ${ex((o - w) * N)} ÷ ${m - w} = ${men}।`),
        ],
        shortcut: T('Alligation on rates: men : women = (overall − women’s rate) : (men’s rate − overall).', 'হারে মিশ্রণ: পুরুষ : মহিলা = (মোট হার − মহিলার হার) : (পুরুষের হার − মোট হার)।'),
      });
    }
    const m = pick([10, 15, 20, 25, 30]);
    const w = pick([10, 15, 20, 25, 30].filter((x) => x !== m));
    const women = (N * m) / (m + w);
    const womenNow = women * f(-w);
    if (!Number.isInteger(women) || !Number.isInteger(womenNow)) return null;
    return q({
      id: 'pct_population_groups', variant, kind: 'persons', answer: womenNow, given: { N, m, w },
      stem: T(`A village has ${N} people. Over five years the number of men rose by ${m}% and the number of women fell by ${w}%, yet the total population did not change. How many women live in the village now?`,
        `একটি গ্রামে ${N} জন মানুষ। পাঁচ বছরে পুরুষের সংখ্যা ${m}% বেড়েছে এবং মহিলার সংখ্যা ${w}% কমেছে, তবু মোট জনসংখ্যা বদলায়নি। এখন গ্রামে কতজন মহিলা আছেন?`),
      hints: [
        [women, 'This was the number of women five years ago, before the fall.', 'এটি পাঁচ বছর আগের মহিলার সংখ্যা, কমার আগে।'],
        [(N * w) / (m + w), 'Swapped the ratio: men : women = w : m.', 'অনুপাত উল্টে গেছে: পুরুষ : মহিলা = w : m।'],
        [N / 2, 'Assumed equal numbers of men and women.', 'পুরুষ ও মহিলা সমান ধরা হয়েছে।'],
      ],
      steps: [
        T(`Total unchanged ⇒ ${m}% of men = ${w}% of women, so men : women = ${w} : ${m}.`, `মোট অপরিবর্তিত ⇒ পুরুষের ${m}% = মহিলার ${w}%, তাই পুরুষ : মহিলা = ${w} : ${m}।`),
        T(`Women five years ago = ${N} × ${m}/${m + w} = ${women}.`, `পাঁচ বছর আগে মহিলা = ${N} × ${m}/${m + w} = ${women}।`),
        T(`Women now = ${women} × ${ex(f(-w))} = ${womenNow}.`, `এখন মহিলা = ${women} × ${ex(f(-w))} = ${womenNow}।`),
      ],
      shortcut: T('No net change means the gain equals the loss: m% of men = w% of women.', 'মোট পরিবর্তন শূন্য মানে লাভ = ক্ষতি: পুরুষের m% = মহিলার w%।'),
    });
  },

  pct_salary_chain() {
    const variant = pick(['total_known', 'difference_known']);
    const a = pick([10, 20, 25, 50]);
    const b = pick([10, 20, 25, 40]);
    const C = ri(4, 30) * 1000;
    const B = C * f(-b);
    const A = B * f(a);
    if (!Number.isInteger(B) || !Number.isInteger(A)) return null;
    const rel = T(`A's salary is ${a}% more than B's, and B's salary is ${b}% less than C's.`, `A-র বেতন B-র বেতনের চেয়ে ${a}% বেশি, এবং B-র বেতন C-র বেতনের চেয়ে ${b}% কম।`);
    const k = f(-b) * f(a);
    if (variant === 'total_known') {
      const total = A + B + C;
      return q({
        id: 'pct_salary_chain', variant, kind: 'money', answer: A, given: { a, b, total },
        stem: T(`${rel.en} Together the three earn ₹${total} a month. What is A's monthly salary?`, `${rel.bn} তিনজনের মোট মাসিক বেতন ₹${total}। A-র মাসিক বেতন কত?`),
        hints: [
          [B, "This is B's salary.", 'এটি B-র বেতন।'],
          [(total / (1 + f(-b) + f(a - b))) * f(a - b), 'Combined the two percentages as one change of (a − b)%.', 'দুটি শতাংশকে একটি (a − b)% পরিবর্তন ধরা হয়েছে।'],
          [C, "This is C's salary.", 'এটি C-র বেতন।'],
        ],
        steps: [
          T(`Let C = 100. Then B = ${ex(100 * f(-b))} and A = ${ex(100 * f(-b))} × ${ex(f(a))} = ${ex(100 * k)}.`, `C = 100 ধরি। তাহলে B = ${ex(100 * f(-b))} এবং A = ${ex(100 * f(-b))} × ${ex(f(a))} = ${ex(100 * k)}।`),
          T(`A + B + C = ${ex(100 * k + 100 * f(-b) + 100)} parts = ₹${total}, so 1 part (C ÷ 100) = ₹${ex(C / 100)}.`, `A + B + C = ${ex(100 * k + 100 * f(-b) + 100)} ভাগ = ₹${total}, তাই 1 ভাগ (C ÷ 100) = ₹${ex(C / 100)}।`),
          T(`A = ${ex(100 * k)} × ${ex(C / 100)} = ₹${A}.`, `অতএব A = ${ex(100 * k)} × ${ex(C / 100)} = ₹${A}।`),
        ],
        shortcut: T('Fix the salary that both relations lead to (C) as 100; express the others and scale.', 'যে বেতনের সঙ্গে সম্পর্কগুলি যুক্ত (C) তাকে 100 ধরে বাকিদের প্রকাশ করো, তারপর অনুপাতে বড় করো।'),
      });
    }
    const d = A - C;
    if (!d) return null;
    const word = d > 0 ? T('more', 'বেশি') : T('less', 'কম');
    return q({
      id: 'pct_salary_chain', variant, kind: 'money', answer: C, given: { a, b, d: Math.abs(d) },
      stem: T(`${rel.en} A earns ₹${Math.abs(d)} ${word.en} than C. What is C's salary?`, `${rel.bn} A, C-র চেয়ে ₹${Math.abs(d)} ${word.bn} পান। C-র বেতন কত?`),
      hints: [
        [Math.abs(d) * 100 / Math.abs(a - b), 'Treated the chain as a single (a − b)% difference.', 'শৃঙ্খলটিকে একটি (a − b)% পার্থক্য ধরা হয়েছে।'],
        [A, "This is A's salary.", 'এটি A-র বেতন।'],
        [B, "This is B's salary.", 'এটি B-র বেতন।'],
      ],
      steps: [
        T(`Let C = 100: B = ${ex(100 * f(-b))}, A = ${ex(100 * k)}.`, `C = 100 ধরি: B = ${ex(100 * f(-b))}, A = ${ex(100 * k)}।`),
        T(`A − C = ${ex(100 * k - 100)} on C = 100, i.e. ${ex(Math.abs(k - 1) * 100)}% of C = ₹${Math.abs(d)}.`, `C = 100 হলে A − C = ${ex(100 * k - 100)}, অর্থাৎ C-র ${ex(Math.abs(k - 1) * 100)}% = ₹${Math.abs(d)}।`),
        T(`C = ${Math.abs(d)} ÷ ${ex(Math.abs(k - 1))} = ₹${C}.`, `অতএব C = ${Math.abs(d)} ÷ ${ex(Math.abs(k - 1))} = ₹${C}।`),
      ],
      shortcut: T('Combine the chain into one factor for A relative to C, then use the difference.', 'শৃঙ্খলটি C-র তুলনায় A-র একটি গুণকে পরিণত করো, তারপর পার্থক্য ব্যবহার করো।'),
    });
  },
};

module.exports = { topic: 'percentage', registry, generators: gens };
