'use strict';

/**
 * Hard Ratio & Proportion questions. Pattern matrix: db/patterns/quant/hard/ratio_proportion.js.
 */

const { pick, ri, names } = require('../common');
const { T, ex, gcd, clean, bnOf, KINDS, makeQuestionFactory } = require('./framework');
const registry = require('../../../db/patterns/quant/hard/ratio_proportion');

const q = makeQuestionFactory('ratio_proportion', registry);
const lcm = (a, b) => (a / gcd(a, b)) * b;
const R = (v) => KINDS.ratio(v).en; // "3 : 4", lowest terms
// Algebra coefficient: cx(1, 'u') -> "u", cx(5, 'u') -> "5u".
const cx = (n, v) => {
  if (n === 1) return v;
  const s = ex(n);
  return s.includes('/') ? `(${s})${v}` : `${s}${v}`;
};
const f = (r) => 1 + r / 100;

const gens = {
  r_compound_chain() {
    const variant = pick(['a_to_c', 'four_terms']);
    const [p, q1, r, s, u, v] = Array.from({ length: 6 }, () => ri(1, 9));
    if (p === q1 || r === s || q1 === r || u === v) return null;
    const [x, y] = names(2);
    if (variant === 'a_to_c') {
      const L = lcm(q1, r);
      return q({
        id: 'r_compound_chain', variant, kind: 'ratio', answer: [p * r, q1 * s], given: { p, q1, r, s },
        stem: T(`The ratio of ${x.en}'s savings to ${y.en}'s savings is ${p} : ${q1}, and the ratio of ${y.en}'s savings to Rana's is ${r} : ${s}. What is the ratio of ${x.en}'s savings to Rana's?`,
          `${bnOf(x)} সঞ্চয় ও ${bnOf(y)} সঞ্চয়ের অনুপাত ${p} : ${q1}, এবং ${bnOf(y)} সঞ্চয় ও রানার সঞ্চয়ের অনুপাত ${r} : ${s}। ${bnOf(x)} সঞ্চয় ও রানার সঞ্চয়ের অনুপাত কত?`),
        hints: [
          [[p, s], `The outer terms were taken directly, without making ${y.en}'s share equal in both ratios.`, `মাঝের ব্যক্তির অংশ দুই অনুপাতে সমান না করেই বাইরের পদ নেওয়া হয়েছে।`],
          [[p * s, q1 * r], 'Multiplied the wrong pair of terms.', 'ভুল জোড়া পদ গুণ করা হয়েছে।'],
          [[p + r, q1 + s], 'Added the ratios term by term.', 'অনুপাতগুলির পদ যোগ করা হয়েছে।'],
        ],
        steps: [
          T(`Make ${y.en}'s term the same: LCM of ${q1} and ${r} is ${L}.`, `মাঝের পদ সমান করি: ${q1} ও ${r}-এর ল.সা.গু. ${L}।`),
          T(`${x.en} : ${y.en} = ${p * (L / q1)} : ${L} and ${y.en} : Rana = ${L} : ${s * (L / r)}.`, `${x.bn} : ${y.bn} = ${p * (L / q1)} : ${L} এবং ${y.bn} : রানা = ${L} : ${s * (L / r)}।`),
          T(`So ${x.en} : Rana = ${p * (L / q1)} : ${s * (L / r)} = ${R([p * r, q1 * s])}.`, `অতএব ${x.bn} : রানা = ${p * (L / q1)} : ${s * (L / r)} = ${R([p * r, q1 * s])}।`),
        ],
        shortcut: T('A : C = (A : B) × (B : C) = (p × r) : (q × s).', 'সূত্র: A : C = (A : B) × (B : C) = (p × r) : (q × s)।'),
      });
    }
    const ans = [p * r * u, q1 * s * v];
    return q({
      id: 'r_compound_chain', variant, kind: 'ratio', answer: ans, given: { p, q1, r, s, u, v },
      stem: T(`If A : B = ${p} : ${q1}, B : C = ${r} : ${s} and C : D = ${u} : ${v}, then A : D is:`,
        `যদি A : B = ${p} : ${q1}, B : C = ${r} : ${s} এবং C : D = ${u} : ${v} হয়, তবে A : D কত?`),
      hints: [
        [[p, v], 'Took the first and last terms only.', 'শুধু প্রথম ও শেষ পদ নেওয়া হয়েছে।'],
        [[p * r * v, q1 * s * u], 'Inverted the last ratio.', 'শেষ অনুপাতটি উল্টে গেছে।'],
        [[p * r, q1 * s], 'Stopped at A : C.', 'A : C-তে থেমে যাওয়া হয়েছে।'],
      ],
      steps: [
        T('A : D = (A/B) × (B/C) × (C/D).', 'A : D = (A/B) × (B/C) × (C/D) — প্রতিটি ধাপের অনুপাত গুণ করি।'),
        T(`= (${p} × ${r} × ${u}) : (${q1} × ${s} × ${v}) = ${ans[0]} : ${ans[1]}.`, `অর্থাৎ A : D = (${p} × ${r} × ${u}) : (${q1} × ${s} × ${v}) = ${ans[0]} : ${ans[1]}।`),
        T(`In lowest terms, A : D = ${R(ans)}.`, `লঘিষ্ঠ আকারে A : D = ${R(ans)}।`),
      ],
      shortcut: T('Multiply all the antecedents together and all the consequents together.', 'সব পূর্বপদ একসঙ্গে এবং সব উত্তরপদ একসঙ্গে গুণ করো।'),
    });
  },

  r_add_to_change() {
    const variant = pick(['add_same', 'subtract_same']);
    const p = ri(2, 7);
    const q1 = ri(p + 1, 11);
    if (gcd(p, q1) !== 1) return null;
    const k = ri(3, 20);
    const x = ri(2, 15);
    const sign = variant === 'add_same' ? 1 : -1;
    const b = p * k + sign * x;
    const g = q1 * k + sign * x;
    if (b <= 0) return null;
    const [r, s] = [b / gcd(b, g), g / gcd(b, g)];
    if (r === p && s === q1) return null;
    const verb = variant === 'add_same' ? T(`${x} boys and ${x} girls join`, `${x} জন ছেলে ও ${x} জন মেয়ে যোগ দিলে`) : T(`${x} boys and ${x} girls leave`, `${x} জন ছেলে ও ${x} জন মেয়ে চলে গেলে`);
    return q({
      id: 'r_add_to_change', variant, kind: 'persons', answer: q1 * k, given: { p, q1, x, r, s },
      stem: T(`In a drawing club the numbers of boys and girls are in the ratio ${p} : ${q1}. If ${verb.en}, the ratio becomes ${r} : ${s}. How many girls were in the club at first?`,
        `একটি আঁকার ক্লাবে ছেলে ও মেয়ের সংখ্যার অনুপাত ${p} : ${q1}। ${verb.bn} অনুপাত হয় ${r} : ${s}। শুরুতে ক্লাবে কতজন মেয়ে ছিল?`),
      hints: [
        [p * k, 'This is the number of boys.', 'এটি ছেলেদের সংখ্যা।'],
        [g, 'This is the number of girls after the change.', 'এটি পরিবর্তনের পরের মেয়েদের সংখ্যা।'],
        [(p + q1) * k, 'This is the whole club at first.', 'এটি শুরুতে পুরো ক্লাবের সদস্যসংখ্যা।'],
      ],
      steps: [
        T(`Let boys = ${cx(p, 'k')} and girls = ${cx(q1, 'k')}.`, `ছেলে = ${cx(p, 'k')} ও মেয়ে = ${cx(q1, 'k')} ধরি।`),
        T(`(${cx(p, 'k')} ${sign > 0 ? '+' : '−'} ${x}) : (${cx(q1, 'k')} ${sign > 0 ? '+' : '−'} ${x}) = ${r} : ${s} ⇒ ${s}(${cx(p, 'k')} ${sign > 0 ? '+' : '−'} ${x}) = ${r}(${cx(q1, 'k')} ${sign > 0 ? '+' : '−'} ${x}) ⇒ k = ${k}.`, `সমীকরণ: (${cx(p, 'k')} ${sign > 0 ? '+' : '−'} ${x}) : (${cx(q1, 'k')} ${sign > 0 ? '+' : '−'} ${x}) = ${r} : ${s} ⇒ ${s}(${cx(p, 'k')} ${sign > 0 ? '+' : '−'} ${x}) = ${r}(${cx(q1, 'k')} ${sign > 0 ? '+' : '−'} ${x}) ⇒ k = ${k}।`),
        T(`Girls at first = ${q1} × ${k} = ${q1 * k}.`, `শুরুতে মেয়ে = ${q1} × ${k} = ${q1 * k}।`),
      ],
      shortcut: T('Check options: the right one is a multiple of the girls’ term and gives the new ratio after the change.', 'বিকল্প যাচাই করো: সঠিকটি মেয়েদের পদের গুণিতক এবং পরিবর্তনের পর নতুন অনুপাত দেয়।'),
    });
  },

  r_coins() {
    const variant = pick(['by_count', 'by_value']);
    const [a, b, c] = [ri(1, 6), ri(1, 6), ri(1, 6)];
    if (variant === 'by_count') {
      const k = ri(4, 40);
      const V = k * (a + b / 2 + c / 4);
      if (!Number.isInteger(V)) return null;
      return q({
        id: 'r_coins', variant, kind: 'persons', answer: b * k, given: { a, b, c, V },
        stem: T(`A bag contains ₹1, 50-paise and 25-paise coins whose numbers are in the ratio ${a} : ${b} : ${c}. The total value of the coins is ₹${V}. How many 50-paise coins are there?`,
          `একটি থলিতে ₹1, 50 পয়সা ও 25 পয়সার মুদ্রা আছে, যাদের সংখ্যার অনুপাত ${a} : ${b} : ${c}। মুদ্রাগুলির মোট মূল্য ₹${V}। 50 পয়সার মুদ্রা কয়টি?`),
        hints: [
          [(V * b) / (a + b + c), 'Divided the total value in the ratio of counts; values per coin differ.', 'মোট মূল্যকে সংখ্যার অনুপাতে ভাগ করা হয়েছে; প্রতিটি মুদ্রার মূল্য আলাদা।'],
          [(b * k) / 2, 'This is the value in rupees of the 50-paise coins, not their number.', 'এটি 50 পয়সার মুদ্রাগুলির টাকায় মূল্য, সংখ্যা নয়।'],
          [a * k, 'This is the number of ₹1 coins.', 'এটি ₹1 মুদ্রার সংখ্যা।'],
        ],
        steps: [
          T(`Let the numbers be ${cx(a, 'k')}, ${cx(b, 'k')} and ${cx(c, 'k')}.`, `মুদ্রার সংখ্যা ${cx(a, 'k')}, ${cx(b, 'k')} ও ${cx(c, 'k')} ধরি।`),
          T(`Value = ${cx(a, 'k')} × 1 + ${cx(b, 'k')} × 0.5 + ${cx(c, 'k')} × 0.25 = ${cx(ex(a + b / 2 + c / 4), 'k')} = ${V}, so k = ${k}.`, `মোট মূল্য = ${cx(a, 'k')} × 1 + ${cx(b, 'k')} × 0.5 + ${cx(c, 'k')} × 0.25 = ${cx(ex(a + b / 2 + c / 4), 'k')} = ${V}, তাই k = ${k}।`),
          T(`50-paise coins = ${b} × ${k} = ${b * k}.`, `50 পয়সার মুদ্রা = ${b} × ${k} = ${b * k}টি।`),
        ],
        shortcut: T('Convert the count ratio to a value ratio: a : b/2 : c/4.', 'সংখ্যার অনুপাতকে মূল্যের অনুপাতে আনো: a : b/2 : c/4।'),
      });
    }
    const t = ri(2, 30);
    const N = t * (a + 2 * b + 4 * c);
    return q({
      id: 'r_coins', variant, kind: 'persons', answer: 4 * c * t, given: { a, b, c, N },
      stem: T(`A box has ${N} coins of ₹1, 50 paise and 25 paise. The total values of the three kinds are in the ratio ${a} : ${b} : ${c}. How many 25-paise coins are there?`,
        `একটি বাক্সে ₹1, 50 পয়সা ও 25 পয়সার মোট ${N}টি মুদ্রা আছে। তিন রকম মুদ্রার মোট মূল্যের অনুপাত ${a} : ${b} : ${c}। 25 পয়সার মুদ্রা কয়টি?`),
      hints: [
        [(N * c) / (a + b + c), 'Divided the number of coins in the ratio of values.', 'মুদ্রার সংখ্যাকে মূল্যের অনুপাতে ভাগ করা হয়েছে।'],
        [c * t, 'This is the value in rupees of the 25-paise coins.', 'এটি 25 পয়সার মুদ্রাগুলির টাকায় মূল্য।'],
        [2 * b * t, 'This is the number of 50-paise coins.', 'এটি 50 পয়সার মুদ্রার সংখ্যা।'],
      ],
      steps: [
        T(`Let the values be ₹${cx(a, 't')}, ₹${cx(b, 't')} and ₹${cx(c, 't')}.`, `মূল্য ₹${cx(a, 't')}, ₹${cx(b, 't')} ও ₹${cx(c, 't')} ধরি।`),
        T(`Numbers = ${cx(a, 't')} ÷ 1, ${cx(b, 't')} ÷ 0.5, ${cx(c, 't')} ÷ 0.25 = ${cx(a, 't')}, ${cx(2 * b, 't')}, ${cx(4 * c, 't')}; total ${cx(a + 2 * b + 4 * c, 't')} = ${N}, so t = ${t}.`, `সংখ্যা = ${cx(a, 't')} ÷ 1, ${cx(b, 't')} ÷ 0.5, ${cx(c, 't')} ÷ 0.25 = ${cx(a, 't')}, ${cx(2 * b, 't')}, ${cx(4 * c, 't')}; মোট ${cx(a + 2 * b + 4 * c, 't')} = ${N}, তাই t = ${t}।`),
        T(`25-paise coins = ${4 * c} × ${t} = ${4 * c * t}.`, `25 পয়সার মুদ্রা = ${4 * c} × ${t} = ${4 * c * t}টি।`),
      ],
      shortcut: T('Count ratio = value ratio ÷ coin value: a : 2b : 4c.', 'সংখ্যার অনুপাত = মূল্যের অনুপাত ÷ মুদ্রার মূল্য: a : 2b : 4c।'),
    });
  },

  r_income_expense() {
    const variant = pick(['find_income', 'find_saving']);
    const p = ri(2, 9);
    const q1 = ri(2, 9);
    const r = ri(1, 9);
    const s = ri(1, 9);
    if (p === q1 || r === s || gcd(p, q1) !== 1 || gcd(r, s) !== 1) return null;
    if (Math.sign(p - q1) !== Math.sign(r - s)) return null;
    const t = ri(1, 8);
    const k = Math.abs(r - s) * t * 100;
    const m = Math.abs(p - q1) * t * 100;
    const S = p * k - r * m;
    if (S <= 0 || q1 * k - s * m !== S) return null;
    const [x, y] = names(2);
    const ratios = T(`The monthly incomes of ${x.en} and ${y.en} are in the ratio ${p} : ${q1} and their monthly expenses are in the ratio ${r} : ${s}.`,
      `${x.bn} ও ${bnOf(y)} মাসিক আয়ের অনুপাত ${p} : ${q1} এবং মাসিক খরচের অনুপাত ${r} : ${s}।`);
    if (variant === 'find_income') {
      return q({
        id: 'r_income_expense', variant, kind: 'money', answer: p * k, given: { p, q1, r, s, S },
        stem: T(`${ratios.en} If each of them saves ₹${S} a month, what is ${x.en}'s monthly income?`, `${ratios.bn} যদি দুজনেই মাসে ₹${S} করে সঞ্চয় করেন, তবে ${bnOf(x)} মাসিক আয় কত?`),
        hints: [
          [q1 * k, `This is ${y.en}'s income.`, `এটি ${bnOf(y)} আয়।`],
          [r * m, `This is ${x.en}'s expense.`, `এটি ${bnOf(x)} খরচ।`],
          [(S * p) / Math.abs(p - q1), 'Divided the saving by the difference of income terms alone, ignoring the expense ratio.', 'খরচের অনুপাত বাদ দিয়ে শুধু আয়ের পদের পার্থক্য দিয়ে ভাগ করা হয়েছে।'],
        ],
        steps: [
          T(`Incomes = ${cx(p, 'k')}, ${cx(q1, 'k')}; expenses = ${cx(r, 'm')}, ${cx(s, 'm')}; savings: ${cx(p, 'k')} − ${cx(r, 'm')} = ${S} and ${cx(q1, 'k')} − ${cx(s, 'm')} = ${S}.`, `আয় = ${cx(p, 'k')}, ${cx(q1, 'k')}; খরচ = ${cx(r, 'm')}, ${cx(s, 'm')}; সঞ্চয়: ${cx(p, 'k')} − ${cx(r, 'm')} = ${S} এবং ${cx(q1, 'k')} − ${cx(s, 'm')} = ${S}।`),
          T(`Equating the savings: ${cx(Math.abs(p - q1), 'k')} = ${cx(Math.abs(r - s), 'm')} ⇒ m = ${cx((p - q1) / (r - s), 'k')}. Substituting, k = ${k}.`, `সঞ্চয় সমান করে: ${cx(Math.abs(p - q1), 'k')} = ${cx(Math.abs(r - s), 'm')} ⇒ m = ${cx((p - q1) / (r - s), 'k')}। বসিয়ে পাই k = ${k}।`),
          T(`${x.en}'s income = ${p} × ${k} = ₹${p * k}.`, `${bnOf(x)} আয় = ${p} × ${k} = ₹${p * k}।`),
        ],
        shortcut: T('Test options: income − saving must split in the expense ratio for both people.', 'বিকল্প যাচাই করো: দুজনের ক্ষেত্রেই আয় − সঞ্চয় খরচের অনুপাতে থাকবে।'),
      });
    }
    return q({
      id: 'r_income_expense', variant, kind: 'money', answer: S, given: { p, q1, r, s, IA: p * k },
      stem: T(`${ratios.en} Both save the same amount every month. If ${x.en} earns ₹${p * k} a month, how much does each save?`, `${ratios.bn} দুজনেই প্রতি মাসে সমান টাকা সঞ্চয় করেন। ${bnOf(x)} মাসিক আয় ₹${p * k} হলে প্রত্যেকে কত সঞ্চয় করেন?`),
      hints: [
        [p * k - (p * k * r) / p, 'Assumed the expense scale equals the income scale.', 'ধরা হয়েছে খরচের গুণিতক আয়ের গুণিতকের সমান।'],
        [q1 * k, `This is ${y.en}'s income.`, `এটি ${bnOf(y)} আয়।`],
        [r * m, `This is ${x.en}'s expense.`, `এটি ${bnOf(x)} খরচ।`],
      ],
      steps: [
        T(`${x.en}'s income ${cx(p, 'k')} = ${p * k} ⇒ k = ${k}; ${y.en}'s income = ${q1 * k}.`, `${bnOf(x)} আয় ${cx(p, 'k')} = ${p * k} ⇒ k = ${k}; ${bnOf(y)} আয় = ${q1 * k}।`),
        T(`Equal savings: ${p * k} − ${cx(r, 'm')} = ${q1 * k} − ${cx(s, 'm')} ⇒ m = ${m}.`, `সঞ্চয় সমান: ${p * k} − ${cx(r, 'm')} = ${q1 * k} − ${cx(s, 'm')} ⇒ m = ${m}।`),
        T(`Saving = ${p * k} − ${r} × ${m} = ₹${S}.`, `সঞ্চয় = ${p * k} − ${r} × ${m} = ₹${S}।`),
      ],
      shortcut: T('With incomes known, the difference of incomes equals the difference of expenses.', 'আয় জানা থাকলে, আয়ের পার্থক্য = খরচের পার্থক্য।'),
    });
  },

  r_mixture_change() {
    const variant = pick(['add_water', 'reverse_quantity']);
    const p = ri(2, 9);
    const q1 = ri(1, 6);
    if (gcd(p, q1) !== 1) return null;
    if (variant === 'add_water') {
      const r = ri(1, p);
      const s = ri(q1 + 1, q1 + 6);
      if (gcd(r, s) !== 1 || r * q1 >= p * s) return null;
      const V = (p + q1) * r * ri(1, 6);
      const milk = (V * p) / (p + q1);
      const water = V - milk;
      const w = (milk * s) / r - water;
      if (!Number.isInteger(w) || w <= 0) return null;
      return q({
        id: 'r_mixture_change', variant, kind: 'litres', answer: w, given: { V, p, q1, r, s },
        stem: T(`${V} litres of a mixture contain milk and water in the ratio ${p} : ${q1}. How much water must be added to make the ratio ${r} : ${s}?`,
          `${V} লিটার মিশ্রণে দুধ ও জলের অনুপাত ${p} : ${q1}। অনুপাত ${r} : ${s} করতে কত লিটার জল মেশাতে হবে?`),
        hints: [
          [(milk * s) / r, 'This is the total water needed, not the water to add.', 'এটি মোট প্রয়োজনীয় জল, মেশাতে হবে এমন জল নয়।'],
          [(V * (s - q1)) / (p + q1), 'Used the difference of the water terms on the old scale; the scale changes.', 'পুরনো গুণিতকে জলের পদের পার্থক্য নেওয়া হয়েছে; গুণিতক বদলায়।'],
          [V * s / (r + s) - water, 'Kept the total fixed; the milk stays fixed, not the total.', 'মোট পরিমাণ স্থির ধরা হয়েছে; আসলে দুধ স্থির থাকে।'],
        ],
        steps: [
          T(`Milk = ${V} × ${p}/${p + q1} = ${milk} litres; water = ${water} litres.`, `দুধ = ${V} × ${p}/${p + q1} = ${milk} লিটার; জল = ${water} লিটার।`),
          T(`Milk does not change, so new water = ${milk} × ${s}/${r} = ${ex((milk * s) / r)} litres.`, `দুধ বদলায় না, তাই নতুন জল = ${milk} × ${s}/${r} = ${ex((milk * s) / r)} লিটার।`),
          T(`Water to add = ${ex((milk * s) / r)} − ${water} = ${w} litres.`, `মেশাতে হবে = ${ex((milk * s) / r)} − ${water} = ${w} লিটার।`),
        ],
        shortcut: T('Keep the unchanged part (milk) fixed and rescale the other part.', 'যে অংশ বদলায় না (দুধ) তাকে স্থির রেখে অন্য অংশের হিসাব করো।'),
      });
    }
    const r = ri(1, p);
    const s = ri(q1 + 1, q1 + 6);
    if (gcd(r, s) !== 1 || p * s <= q1 * r) return null;
    const x = ri(2, 30);
    const u = (r * x) / (p * s - q1 * r);
    if (!Number.isInteger(u)) return null;
    const total = (p + q1) * u;
    return q({
      id: 'r_mixture_change', variant, kind: 'litres', answer: total, given: { p, q1, x, r, s },
      stem: T(`A can holds milk and water in the ratio ${p} : ${q1}. When ${x} litres of water are added, the ratio becomes ${r} : ${s}. How many litres of mixture were in the can at first?`,
        `একটি পাত্রে দুধ ও জলের অনুপাত ${p} : ${q1}। ${x} লিটার জল মেশালে অনুপাত হয় ${r} : ${s}। শুরুতে পাত্রে কত লিটার মিশ্রণ ছিল?`),
      hints: [
        [p * u, 'This is the milk only.', 'এটি শুধু দুধের পরিমাণ।'],
        [total + x, 'This is the mixture after the water was added.', 'এটি জল মেশানোর পরের মিশ্রণ।'],
        [((p + q1) * x) / Math.abs(s - q1), 'Treated the water term difference as if the scale did not change.', 'জলের পদের পার্থক্য নেওয়া হয়েছে, যেন গুণিতক বদলায় না।'],
      ],
      steps: [
        T(`Let milk = ${cx(p, 'u')} and water = ${cx(q1, 'u')}. After adding: ${cx(p, 'u')} : (${cx(q1, 'u')} + ${x}) = ${r} : ${s}.`, `দুধ = ${cx(p, 'u')} ও জল = ${cx(q1, 'u')} ধরি। মেশানোর পর: ${cx(p, 'u')} : (${cx(q1, 'u')} + ${x}) = ${r} : ${s}।`),
          T(`${s} × ${cx(p, 'u')} = ${r}(${cx(q1, 'u')} + ${x}) ⇒ ${cx(p * s - q1 * r, 'u')} = ${r * x} ⇒ u = ${u}.`, `সমীকরণ: ${s} × ${cx(p, 'u')} = ${r}(${cx(q1, 'u')} + ${x}) ⇒ ${cx(p * s - q1 * r, 'u')} = ${r * x} ⇒ u = ${u}।`),
        T(`Original mixture = ${p + q1} × ${u} = ${total} litres.`, `শুরুর মিশ্রণ = ${p + q1} × ${u} = ${total} লিটার।`),
      ],
      shortcut: T('Milk is unchanged: write it from both ratios and equate.', 'দুধ অপরিবর্তিত: দুই অনুপাত থেকে দুধ লিখে সমান করো।'),
    });
  },

  r_percent_increments() {
    const variant = pick(['new_ratio', 'find_salary']);
    const p = ri(2, 9);
    const q1 = ri(2, 9);
    const a = pick([10, 15, 20, 25, 30, 40, 50]);
    const b = pick([5, 10, 15, 20, 25, 30].filter((x) => x !== a));
    if (p === q1 || gcd(p, q1) !== 1) return null;
    const [x, y] = names(2);
    if (variant === 'new_ratio') {
      const ans = [p * (100 + a), q1 * (100 + b)];
      return q({
        id: 'r_percent_increments', variant, kind: 'ratio', answer: ans, given: { p, q1, a, b },
        stem: T(`The salaries of ${x.en} and ${y.en} are in the ratio ${p} : ${q1}. If ${x.en}'s salary rises by ${a}% and ${y.en}'s by ${b}%, what is the new ratio of their salaries?`,
          `${x.bn} ও ${bnOf(y)} বেতনের অনুপাত ${p} : ${q1}। ${bnOf(x)} বেতন ${a}% এবং ${bnOf(y)} বেতন ${b}% বাড়লে তাঁদের বেতনের নতুন অনুপাত কত?`),
        hints: [
          [[p * (100 + b), q1 * (100 + a)], 'The two rises were swapped.', 'দুটি বৃদ্ধির হার অদলবদল হয়ে গেছে।'],
          [[p + a, q1 + b], 'Added the percentages to the ratio terms.', 'অনুপাতের পদের সঙ্গে শতাংশ যোগ করা হয়েছে।'],
          [[100 + a, 100 + b], 'Ignored the original ratio.', 'আসল অনুপাত বাদ দেওয়া হয়েছে।'],
        ],
        steps: [
          T(`Let the salaries be ${cx(p, 'k')} and ${cx(q1, 'k')}.`, `বেতন ${cx(p, 'k')} ও ${cx(q1, 'k')} ধরি।`),
          T(`New salaries: ${cx(p, 'k')} × ${ex(f(a))} = ${cx(ex(p * f(a)), 'k')} and ${cx(q1, 'k')} × ${ex(f(b))} = ${cx(ex(q1 * f(b)), 'k')}.`, `নতুন বেতন: ${cx(p, 'k')} × ${ex(f(a))} = ${cx(ex(p * f(a)), 'k')} এবং ${cx(q1, 'k')} × ${ex(f(b))} = ${cx(ex(q1 * f(b)), 'k')}।`),
          T(`New ratio = ${ex(p * f(a))} : ${ex(q1 * f(b))} = ${R(ans)}.`, `নতুন অনুপাত = ${ex(p * f(a))} : ${ex(q1 * f(b))} = ${R(ans)}।`),
        ],
        shortcut: T('New ratio = p(100 + a) : q(100 + b).', 'নতুন অনুপাত = p(100 + a) : q(100 + b)।'),
      });
    }
    const k = ri(2, 20) * 1000;
    const total = p * k * f(a) + q1 * k * f(b);
    if (!Number.isInteger(total)) return null;
    return q({
      id: 'r_percent_increments', variant, kind: 'money', answer: p * k, given: { p, q1, a, b, total },
      stem: T(`The salaries of ${x.en} and ${y.en} are in the ratio ${p} : ${q1}. After ${x.en}'s salary rises by ${a}% and ${y.en}'s by ${b}%, together they earn ₹${total}. What was ${x.en}'s salary before the rise?`,
        `${x.bn} ও ${bnOf(y)} বেতনের অনুপাত ${p} : ${q1}। ${bnOf(x)} বেতন ${a}% এবং ${bnOf(y)} বেতন ${b}% বাড়ার পর দুজনের মোট বেতন ₹${total}। বৃদ্ধির আগে ${bnOf(x)} বেতন কত ছিল?`),
      hints: [
        [(total * p) / (p + q1), 'Divided the new total in the old ratio.', 'নতুন মোটকে পুরনো অনুপাতে ভাগ করা হয়েছে।'],
        [p * k * f(a), `This is ${x.en}'s salary after the rise.`, `এটি বৃদ্ধির পরে ${bnOf(x)} বেতন।`],
        [q1 * k, `This is ${y.en}'s salary before the rise.`, `এটি বৃদ্ধির আগে ${bnOf(y)} বেতন।`],
      ],
      steps: [
        T(`Let the salaries be ${cx(p, 'k')} and ${cx(q1, 'k')}.`, `বেতন ${cx(p, 'k')} ও ${cx(q1, 'k')} ধরি।`),
        T(`After the rises: ${cx(ex(p * f(a)), 'k')} + ${cx(ex(q1 * f(b)), 'k')} = ${cx(ex(p * f(a) + q1 * f(b)), 'k')} = ${total} ⇒ k = ${k}.`, `বৃদ্ধির পর: ${cx(ex(p * f(a)), 'k')} + ${cx(ex(q1 * f(b)), 'k')} = ${cx(ex(p * f(a) + q1 * f(b)), 'k')} = ${total} ⇒ k = ${k}।`),
        T(`${x.en}'s salary before = ${p} × ${k} = ₹${p * k}.`, `বৃদ্ধির আগে ${bnOf(x)} বেতন = ${p} × ${k} = ₹${p * k}।`),
      ],
      shortcut: T('Grow each term by its own rate before using the total.', 'মোট ব্যবহারের আগে প্রতিটি পদকে নিজের হারে বাড়াও।'),
    });
  },

  r_variation() {
    const variant = pick(['direct_inverse', 'joint']);
    if (variant === 'direct_inverse') {
      const c = ri(2, 12);
      const [y1, z1, y2, z2] = [ri(2, 20), ri(2, 10), ri(2, 20), ri(2, 10)];
      const x1 = (c * y1) / z1;
      const x2 = (c * y2) / z2;
      if (!clean(x1) || !clean(x2) || (y1 === y2 && z1 === z2) || x1 === x2) return null;
      return q({
        id: 'r_variation', variant, kind: 'number', answer: x2, given: { y1, z1, x1, y2, z2 },
        stem: T(`x varies directly as y and inversely as z. When y = ${y1} and z = ${z1}, x = ${ex(x1)}. Find x when y = ${y2} and z = ${z2}.`,
          `x, y-এর সঙ্গে সরল ভেদে এবং z-এর সঙ্গে ব্যস্ত ভেদে আছে। y = ${y1} ও z = ${z1} হলে x = ${ex(x1)}। y = ${y2} ও z = ${z2} হলে x-এর মান কত?`),
        hints: [
          [(x1 * y2 * z2) / (y1 * z1), 'Treated z as a direct variation.', 'z-কে সরল ভেদে ধরা হয়েছে।'],
          [(x1 * y1 * z2) / (y2 * z1), 'Inverted both relations.', 'দুটি সম্পর্কই উল্টে গেছে।'],
          [(x1 * y2) / y1, 'Ignored the change in z.', 'z-এর পরিবর্তন বাদ পড়েছে।'],
        ],
        steps: [
          T('x = k·y/z for a constant k.', 'x = k·y/z, যেখানে k একটি ধ্রুবক।'),
          T(`${ex(x1)} = k × ${y1}/${z1} ⇒ k = ${c}.`, `${ex(x1)} = k × ${y1}/${z1} ⇒ ধ্রুবক k = ${c}।`),
          T(`x = ${c} × ${y2}/${z2} = ${ex(x2)}.`, `অতএব x = ${c} × ${y2}/${z2} = ${ex(x2)}।`),
        ],
        shortcut: T('x₂ = x₁ × (y₂/y₁) × (z₁/z₂).', 'সূত্র: x₂ = x₁ × (y₂/y₁) × (z₁/z₂)।'),
      });
    }
    // The cost of a carpet varies jointly as length and breadth; find a breadth.
    const c = pick([20, 25, 30, 40, 50, 60, 75, 80]);
    const [l1, b1, l2, b2] = [ri(4, 20), ri(3, 12), ri(4, 20), ri(3, 12)];
    const C1 = c * l1 * b1;
    const C2 = c * l2 * b2;
    if (l1 === l2 || b1 === b2) return null;
    return q({
      id: 'r_variation', variant, kind: 'number', answer: b2, given: { l1, b1, C1, l2, C2 },
      stem: T(`The cost of a carpet varies jointly as its length and breadth. A carpet ${l1} m long and ${b1} m wide costs ₹${C1}. What is the breadth (in m) of a carpet ${l2} m long that costs ₹${C2}?`,
        `একটি কার্পেটের দাম তার দৈর্ঘ্য ও প্রস্থের সঙ্গে যৌগিক ভেদে আছে। ${l1} মিটার লম্বা ও ${b1} মিটার চওড়া একটি কার্পেটের দাম ₹${C1}। ${l2} মিটার লম্বা যে কার্পেটের দাম ₹${C2}, তার প্রস্থ কত মিটার?`),
      hints: [
        [(C2 * b1) / C1, 'Ignored the change in length.', 'দৈর্ঘ্যের পরিবর্তন বাদ পড়েছে।'],
        [(C2 * l1 * b1) / (C1 * l2) * (l2 / l1) * (l2 / l1), 'Applied the length ratio the wrong way.', 'দৈর্ঘ্যের অনুপাত উল্টো দিকে প্রয়োগ করা হয়েছে।'],
        [b1, 'Assumed the breadth stays the same.', 'ধরা হয়েছে প্রস্থ একই থাকে।'],
      ],
      steps: [
        T('Cost = k × length × breadth.', 'দাম = k × দৈর্ঘ্য × প্রস্থ।'),
        T(`${C1} = k × ${l1} × ${b1} ⇒ k = ${c} (rupees per square metre).`, `${C1} = k × ${l1} × ${b1} ⇒ k = ${c} (প্রতি বর্গমিটারে টাকা)।`),
        T(`${C2} = ${c} × ${l2} × breadth ⇒ breadth = ${C2} ÷ ${c * l2} = ${b2} m.`, `${C2} = ${c} × ${l2} × প্রস্থ ⇒ প্রস্থ = ${C2} ÷ ${c * l2} = ${b2} মিটার।`),
      ],
      shortcut: T('Find the rate per unit area first; then divide the new cost by rate × length.', 'আগে প্রতি একক ক্ষেত্রফলের দর বের করো; তারপর নতুন দামকে দর × দৈর্ঘ্য দিয়ে ভাগ করো।'),
    });
  },

  r_partition_conditions() {
    const variant = pick(['two_conditions', 'equal_multiples']);
    if (variant === 'two_conditions') {
      const p = ri(1, 4);
      const q1 = ri(p + 1, 7);
      const r = ri(1, 4);
      const s = ri(r + 1, 7);
      if (gcd(p, q1) !== 1 || gcd(r, s) !== 1) return null;
      const N = lcm(p + q1, r + s) * ri(5, 60);
      const A = (N * p) / (p + q1);
      const B = (N * r) / (r + s);
      const C = N - A - B;
      if (C <= 0) return null;
      return q({
        id: 'r_partition_conditions', variant, kind: 'money', answer: C, given: { N, p, q1, r, s },
        stem: T(`₹${N} is divided among A, B and C so that A gets ${p}/${q1} of what B and C together get, and B gets ${r}/${s} of what A and C together get. What is C's share?`,
          `₹${N} টাকা A, B ও C-এর মধ্যে এমনভাবে ভাগ করা হল যে A পায় B ও C-এর মোট প্রাপ্যের ${p}/${q1} অংশ, এবং B পায় A ও C-এর মোট প্রাপ্যের ${r}/${s} অংশ। C-এর ভাগ কত?`),
        hints: [
          [A, "This is A's share.", 'এটি A-র ভাগ।'],
          [B, "This is B's share.", 'এটি B-র ভাগ।'],
          [N - (N * p) / q1 - (N * r) / s, 'Took the fractions of the whole sum instead of the others’ total.', 'অন্যদের মোটের বদলে পুরো টাকার ভগ্নাংশ নেওয়া হয়েছে।'],
        ],
        steps: [
          T(`A : (B + C) = ${p} : ${q1}, so A = ${p}/${p + q1} of ₹${N} = ₹${A}.`, `A : (B + C) = ${p} : ${q1}, তাই A = ₹${N}-এর ${p}/${p + q1} = ₹${A}।`),
          T(`B : (A + C) = ${r} : ${s}, so B = ${r}/${r + s} of ₹${N} = ₹${B}.`, `B : (A + C) = ${r} : ${s}, তাই B = ₹${N}-এর ${r}/${r + s} = ₹${B}।`),
          T(`C = ${N} − ${A} − ${B} = ₹${C}.`, `অতএব C-এর ভাগ = ${N} − ${A} − ${B} = ₹${C}।`),
        ],
        shortcut: T('“A gets p/q of the rest” means A is p/(p + q) of the whole.', '“A বাকিদের p/q অংশ পায়” মানে A পুরোটার p/(p + q) অংশ।'),
      });
    }
    const [u, v, w] = [ri(2, 7), ri(2, 7), ri(2, 7)];
    if (new Set([u, v, w]).size < 3) return null;
    const parts = [v * w, u * w, u * v];
    const g = parts.reduce((x, y) => gcd(x, y));
    const unit = parts.map((x) => x / g);
    const sum = unit.reduce((x, y) => x + y, 0);
    const N = sum * ri(3, 40);
    const B = (N * unit[1]) / sum;
    return q({
      id: 'r_partition_conditions', variant, kind: 'money', answer: B, given: { N, u, v, w },
      stem: T(`₹${N} is divided among A, B and C so that ${u} times A's share, ${v} times B's share and ${w} times C's share are all equal. What is B's share?`,
        `₹${N} টাকা A, B ও C-এর মধ্যে এমনভাবে ভাগ করা হল যে A-র ভাগের ${u} গুণ, B-র ভাগের ${v} গুণ এবং C-র ভাগের ${w} গুণ সমান। B-র ভাগ কত?`),
      hints: [
        [(N * v) / (u + v + w), 'Divided in the ratio u : v : w; equal multiples need the reciprocals.', 'u : v : w অনুপাতে ভাগ করা হয়েছে; সমান গুণিতকের জন্য বিপরীত রাশি লাগে।'],
        [(N * unit[0]) / sum, "This is A's share.", 'এটি A-র ভাগ।'],
        [(N * unit[2]) / sum, "This is C's share.", 'এটি C-র ভাগ।'],
      ],
      steps: [
        T(`${u}A = ${v}B = ${w}C ⇒ A : B : C = 1/${u} : 1/${v} : 1/${w}.`, `শর্ত অনুযায়ী ${u}A = ${v}B = ${w}C ⇒ A : B : C = 1/${u} : 1/${v} : 1/${w}।`),
        T(`Multiply by ${u * v * w}: A : B : C = ${parts.join(' : ')}${g > 1 ? ` = ${unit.join(' : ')}` : ''}.`, `${u * v * w} দিয়ে গুণ করে: A : B : C = ${parts.join(' : ')}${g > 1 ? ` = ${unit.join(' : ')}` : ''}।`),
        T(`B = ${unit[1]}/${sum} × ${N} = ₹${B}.`, `B-র ভাগ = ${unit[1]}/${sum} × ${N} = ₹${B}।`),
      ],
      shortcut: T('If uA = vB = wC, the shares are in the ratio of the reciprocals 1/u : 1/v : 1/w.', 'uA = vB = wC হলে ভাগগুলি বিপরীত রাশির অনুপাতে: 1/u : 1/v : 1/w।'),
    });
  },

  r_transfer() {
    const variant = pick(['find_total', 'find_moved']);
    const p = ri(3, 9);
    const q1 = ri(1, p - 1);
    const r = ri(1, 9);
    const s = ri(1, 9);
    if (gcd(p, q1) !== 1 || gcd(r, s) !== 1 || p * s <= q1 * r) return null;
    if (variant === 'find_total') {
      const k = ri(2, 15);
      const u = (k * (r + s)) / (p * s - q1 * r);
      if (!Number.isInteger(u) || p * u - k <= 0) return null;
      const T0 = (p + q1) * u;
      return q({
        id: 'r_transfer', variant, kind: 'persons', answer: T0, given: { p, q1, k, r, s },
        stem: T(`The numbers of students in sections A and B of a class are in the ratio ${p} : ${q1}. If ${k} students move from section A to section B, the ratio becomes ${r} : ${s}. How many students are there in the two sections together?`,
          `একটি শ্রেণির A ও B সেকশনে ছাত্রছাত্রীর সংখ্যার অনুপাত ${p} : ${q1}। A সেকশন থেকে ${k} জন B সেকশনে গেলে অনুপাত হয় ${r} : ${s}। দুটি সেকশনে মোট কতজন ছাত্রছাত্রী আছে?`),
        hints: [
          [p * u, 'This is section A only.', 'এটি শুধু A সেকশনের সংখ্যা।'],
          [(p + q1) * k, 'Used the number moved as the scale.', 'স্থানান্তরিত সংখ্যাকেই গুণিতক ধরা হয়েছে।'],
          [(r + s) * k, 'Used the new ratio with the number moved as the scale.', 'নতুন অনুপাতে স্থানান্তরিত সংখ্যাকেই গুণিতক ধরা হয়েছে।'],
        ],
        steps: [
          T(`Let A = ${cx(p, 'u')} and B = ${cx(q1, 'u')}. After the move: (${cx(p, 'u')} − ${k}) : (${cx(q1, 'u')} + ${k}) = ${r} : ${s}.`, `A = ${cx(p, 'u')} ও B = ${cx(q1, 'u')} ধরি। স্থানান্তরের পর: (${cx(p, 'u')} − ${k}) : (${cx(q1, 'u')} + ${k}) = ${r} : ${s}।`),
          T(`${s}(${cx(p, 'u')} − ${k}) = ${r}(${cx(q1, 'u')} + ${k}) ⇒ ${cx(p * s - q1 * r, 'u')} = ${k * (r + s)} ⇒ u = ${u}.`, `সমীকরণ: ${s}(${cx(p, 'u')} − ${k}) = ${r}(${cx(q1, 'u')} + ${k}) ⇒ ${cx(p * s - q1 * r, 'u')} = ${k * (r + s)} ⇒ u = ${u}।`),
          T(`Total = ${p + q1} × ${u} = ${T0} (it does not change with the move).`, `মোট = ${p + q1} × ${u} = ${T0} (স্থানান্তরে মোট বদলায় না)।`),
        ],
        shortcut: T('The total is fixed: it must be a multiple of both p + q and r + s.', 'মোট অপরিবর্তিত: তা p + q ও r + s দুটিরই গুণিতক হবে।'),
      });
    }
    const u = ri(2, 12) * (r + s);
    const k = ((p * s - q1 * r) * u) / (r + s);
    if (!Number.isInteger(k) || k <= 0 || p * u - k <= 0) return null;
    const T0 = (p + q1) * u;
    return q({
      id: 'r_transfer', variant, kind: 'persons', answer: k, given: { T0, p, q1, r, s },
      stem: T(`A school has ${T0} students in two hostels in the ratio ${p} : ${q1}. How many students must move from the first hostel to the second so that the ratio becomes ${r} : ${s}?`,
        `একটি স্কুলের ${T0} জন ছাত্র দুটি হোস্টেলে ${p} : ${q1} অনুপাতে থাকে। প্রথম হোস্টেল থেকে কতজন দ্বিতীয় হোস্টেলে গেলে অনুপাত ${r} : ${s} হবে?`),
      hints: [
        [Math.abs(p * u - (r * T0) / (r + s)) * 2, 'Counted the move twice; one student leaving A is the same student joining B.', 'স্থানান্তর দুবার গোনা হয়েছে; A থেকে যে যায়, সেই B-তে আসে।'],
        [(T0 * r) / (r + s), 'This is the new size of the first hostel.', 'এটি প্রথম হোস্টেলের নতুন সংখ্যা।'],
        [p * u, 'This is the original size of the first hostel.', 'এটি প্রথম হোস্টেলের আগের সংখ্যা।'],
      ],
      steps: [
        T(`Now: first = ${T0} × ${p}/${p + q1} = ${p * u}, second = ${q1 * u}.`, `এখন: প্রথম = ${T0} × ${p}/${p + q1} = ${p * u}, দ্বিতীয় = ${q1 * u}।`),
        T(`Required: first = ${T0} × ${r}/${r + s} = ${p * u - k}.`, `প্রয়োজন: প্রথম হোস্টেলে = ${T0} × ${r}/${r + s} = ${p * u - k} জন।`),
        T(`Students to move = ${p * u} − ${p * u - k} = ${k}.`, `যেতে হবে = ${p * u} − ${p * u - k} = ${k} জন।`),
      ],
      shortcut: T('Split the fixed total in the new ratio and compare with the old split.', 'স্থির মোটকে নতুন অনুপাতে ভাগ করে পুরনো ভাগের সঙ্গে তুলনা করো।'),
    });
  },

  r_share_change() {
    const variant = pick(['new_ratio', 'find_original_total']);
    const [a, b, c] = [ri(1, 9), ri(1, 9), ri(1, 9)];
    if ([a, b, c].reduce((x, y) => gcd(x, y)) !== 1) return null;
    const x = pick([10, 20, 25, 50]);
    const y = pick([10, 20, 25, 40]);
    if (variant === 'new_ratio') {
      const ans = [a * (100 + x), b * (100 - y), c * 100];
      return q({
        id: 'r_share_change', variant, kind: 'ratio', answer: ans, given: { a, b, c, x, y },
        stem: T(`The monthly allowances of three cousins are in the ratio ${a} : ${b} : ${c}. The first one's allowance is increased by ${x}%, the second one's is reduced by ${y}% and the third one's is unchanged. What is the new ratio?`,
          `তিন খুড়তুতো ভাইবোনের মাসিক হাতখরচের অনুপাত ${a} : ${b} : ${c}। প্রথমজনের হাতখরচ ${x}% বাড়ানো হল, দ্বিতীয়জনের ${y}% কমানো হল এবং তৃতীয়জনের অপরিবর্তিত রইল। নতুন অনুপাত কত?`),
        hints: [
          [[a * (100 - x), b * (100 + y), c * 100], 'The increase and the decrease were swapped.', 'বৃদ্ধি ও হ্রাস অদলবদল হয়ে গেছে।'],
          [[a * (100 + x), b * (100 + y), c * 100], 'The reduction was treated as an increase.', 'হ্রাসকে বৃদ্ধি ধরা হয়েছে।'],
          [[a + x, Math.max(1, b - y), c], 'Added the percentages to the ratio terms.', 'শতাংশ সরাসরি অনুপাতের পদে যোগ-বিয়োগ করা হয়েছে।'],
        ],
        steps: [
          T(`Let the allowances be ${cx(a, 'k')}, ${cx(b, 'k')} and ${cx(c, 'k')}.`, `হাতখরচ ${cx(a, 'k')}, ${cx(b, 'k')} ও ${cx(c, 'k')} ধরি।`),
          T(`New: ${cx(a, 'k')} × ${ex(f(x))} = ${cx(ex(a * f(x)), 'k')}, ${cx(b, 'k')} × ${ex(f(-y))} = ${cx(ex(b * f(-y)), 'k')}, ${cx(c, 'k')}.`, `নতুন: ${cx(a, 'k')} × ${ex(f(x))} = ${cx(ex(a * f(x)), 'k')}, ${cx(b, 'k')} × ${ex(f(-y))} = ${cx(ex(b * f(-y)), 'k')}, ${cx(c, 'k')}।`),
          T(`Ratio = ${ex(a * f(x))} : ${ex(b * f(-y))} : ${c} = ${R(ans)}.`, `অনুপাত = ${ex(a * f(x))} : ${ex(b * f(-y))} : ${c} = ${R(ans)}।`),
        ],
        shortcut: T('Multiply each term by its own factor, then clear decimals and simplify.', 'প্রতিটি পদকে নিজের গুণক দিয়ে গুণ করে দশমিক সরিয়ে সরল করো।'),
      });
    }
    const z = pick([10, 20, 25, 50].filter((v) => v !== x));
    const sum = a + b + c;
    const N = sum * ri(2, 30) * 100;
    const k = N / sum;
    const N2 = a * k * f(x) + b * k * f(-y) + c * k * f(z);
    if (!Number.isInteger(N2) || N2 === N) return null;
    return q({
      id: 'r_share_change', variant, kind: 'money', answer: N, given: { a, b, c, x, y, z, N2 },
      stem: T(`A sum of money was divided among P, Q and R in the ratio ${a} : ${b} : ${c}. Later P's share was increased by ${x}%, Q's reduced by ${y}% and R's increased by ${z}%, making the total ₹${N2}. What was the original sum?`,
        `কিছু টাকা P, Q ও R-এর মধ্যে ${a} : ${b} : ${c} অনুপাতে ভাগ করা হয়েছিল। পরে P-র ভাগ ${x}% বাড়ানো হল, Q-র ভাগ ${y}% কমানো হল এবং R-এর ভাগ ${z}% বাড়ানো হল; ফলে মোট হল ₹${N2}। প্রথমে মোট টাকা কত ছিল?`),
      hints: [
        [(N2 * 100) / (100 + x - y + z), 'Added the three rates as if they acted on the whole sum.', 'তিনটি হার যোগ করে পুরো টাকার উপর প্রয়োগ করা হয়েছে।'],
        [(N2 * 300) / (300 + x - y + z), 'Averaged the rates without weighting by the shares.', 'অংশ অনুযায়ী ওজন না দিয়ে হারের সাধারণ গড় নেওয়া হয়েছে।'],
        [N2, 'This is the new total.', 'এটি নতুন মোট।'],
      ],
      steps: [
        T(`Let the shares be ${cx(a, 'k')}, ${cx(b, 'k')} and ${cx(c, 'k')}.`, `ভাগগুলি ${cx(a, 'k')}, ${cx(b, 'k')} ও ${cx(c, 'k')} ধরি।`),
        T(`New total = ${cx(a, 'k')} × ${ex(f(x))} + ${cx(b, 'k')} × ${ex(f(-y))} + ${cx(c, 'k')} × ${ex(f(z))} = ${cx(ex(a * f(x) + b * f(-y) + c * f(z)), 'k')} = ${N2}.`, `নতুন মোট = ${cx(a, 'k')} × ${ex(f(x))} + ${cx(b, 'k')} × ${ex(f(-y))} + ${cx(c, 'k')} × ${ex(f(z))} = ${cx(ex(a * f(x) + b * f(-y) + c * f(z)), 'k')} = ${N2}।`),
        T(`k = ${k}, so the original sum = ${sum} × ${k} = ₹${N}.`, `k = ${k}, তাই প্রথমে মোট = ${sum} × ${k} = ₹${N}।`),
      ],
      shortcut: T('The total changes by the share-weighted average of the three rates.', 'মোট পরিবর্তন হয় তিনটি হারের ভাগ-ভিত্তিক ওজনযুক্ত গড়ে।'),
    });
  },
};

module.exports = { topic: 'ratio_proportion', registry, generators: gens };
