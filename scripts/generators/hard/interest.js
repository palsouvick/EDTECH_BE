'use strict';

/**
 * Hard Simple & Compound Interest questions. Pattern matrix: db/patterns/quant/hard/interest.js.
 */

const { pick, ri } = require('../common');
const { T, ex, gcd, clean, cents, ord, KINDS, makeQuestionFactory } = require('./framework');
const registry = require('../../../db/patterns/quant/hard/interest');

const q = makeQuestionFactory('interest', registry);
const RATES = [2, 2.5, 3, 4, 5, 6, 7.5, 8, 10, 12, 12.5, 15];
const pc = (r) => `${ex(r)}%`;

const gens = {
  i_si_two_amounts() {
    const variant = pick(['find_rate', 'find_principal']);
    const P = ri(10, 200) * 100;
    const r = pick(RATES);
    const t1 = ri(2, 5);
    const t2 = t1 + ri(1, 5);
    const y = (P * r) / 100;
    const A1 = P + t1 * y;
    const A2 = P + t2 * y;
    if (![y, A1, A2].every(Number.isInteger)) return null;
    const stem = T(`A sum lent at simple interest amounts to ₹${A1} in ${t1} years and to ₹${A2} in ${t2} years.`,
      `সরল সুদে ধার দেওয়া কিছু টাকা ${t1} বছরে সুদে-আসলে ₹${A1} এবং ${t2} বছরে ₹${A2} হয়।`);
    const steps = [
      T(`Interest for ${t2 - t1} extra years = ${A2} − ${A1} = ₹${A2 - A1}, so one year's interest = ₹${y}.`, `অতিরিক্ত ${t2 - t1} বছরের সুদ = ${A2} − ${A1} = ₹${A2 - A1}, তাই এক বছরের সুদ = ₹${y}।`),
      T(`Principal = ${A1} − ${t1} × ${y} = ₹${P}.`, `আসল = ${A1} − ${t1} × ${y} = ₹${P}।`),
    ];
    if (variant === 'find_rate') {
      return q({
        id: 'i_si_two_amounts', variant, kind: 'percent', answer: r, given: { A1, t1, A2, t2 },
        stem: T(`${stem.en} What is the rate of interest per annum?`, `${stem.bn} বার্ষিক সুদের হার কত?`),
        hints: [
          [(y / A1) * 100, 'Took the first amount as the principal.', 'প্রথম সমূল-সুদকেই আসল ধরা হয়েছে।'],
          [((A2 - A1) / A1) * 100, 'Did not divide the extra interest by the number of extra years, and used the amount as principal.', 'অতিরিক্ত সুদকে অতিরিক্ত বছর দিয়ে ভাগ করা হয়নি এবং সমূল-সুদকে আসল ধরা হয়েছে।'],
          [((A2 - A1) / t2 / P) * 100, 'Divided the extra interest by the total years instead of the extra years.', 'অতিরিক্ত সুদকে অতিরিক্ত বছরের বদলে মোট বছর দিয়ে ভাগ করা হয়েছে।'],
        ],
        steps: [...steps, T(`Rate = ${y} ÷ ${P} × 100 = ${pc(r)} per annum.`, `সুদের হার = ${y} ÷ ${P} × 100 = বার্ষিক ${pc(r)}।`)],
        shortcut: T('Yearly interest from the difference; principal = first amount − its years × yearly interest.', 'পার্থক্য থেকে বার্ষিক সুদ; আসল = প্রথম সমূল-সুদ − তার বছর × বার্ষিক সুদ।'),
      });
    }
    return q({
      id: 'i_si_two_amounts', variant, kind: 'money', answer: P, given: { A1, t1, A2, t2 },
      stem: T(`${stem.en} What is the sum?`, `${stem.bn} আসল কত?`),
      hints: [
        [A1 - y, 'Removed only one year of interest from the first amount.', 'প্রথম সমূল-সুদ থেকে মাত্র এক বছরের সুদ বাদ দেওয়া হয়েছে।'],
        [A1 - (A2 - A1), 'Treated the difference of the amounts as the interest for the first period.', 'সমূল-সুদের পার্থক্যকেই প্রথম সময়ের সুদ ধরা হয়েছে।'],
        [A2 - t1 * y, 'Removed the wrong number of years from the later amount.', 'পরের সমূল-সুদ থেকে ভুল সংখ্যক বছরের সুদ বাদ দেওয়া হয়েছে।'],
      ],
      steps: [...steps, T(`Check: ${P} + ${t2} × ${y} = ${A2}.`, `যাচাই: ${P} + ${t2} × ${y} = ${A2}।`)],
      shortcut: T('Principal = (t₂·A₁ − t₁·A₂) ÷ (t₂ − t₁).', 'আসল = (t₂·A₁ − t₁·A₂) ÷ (t₂ − t₁)।'),
    });
  },

  i_si_rate_change() {
    const variant = pick(['rate_up', 'time_up']);
    const P = ri(10, 300) * 100;
    if (variant === 'rate_up') {
      const d = pick([0.5, 1, 1.5, 2, 3, 4]);
      const t = ri(2, 8);
      const D = (P * d * t) / 100;
      if (!Number.isInteger(D)) return null;
      return q({
        id: 'i_si_rate_change', variant, kind: 'money', answer: P, given: { d, t, D },
        stem: T(`Had a sum been lent at simple interest at a rate ${ex(d)}% higher, it would have earned ₹${D} more in ${t} years. What is the sum?`,
          `কিছু টাকা সরল সুদে ${ex(d)}% বেশি হারে ধার দিলে ${t} বছরে ₹${D} বেশি সুদ পাওয়া যেত। আসল কত?`),
        hints: [
          [(100 * D) / d, 'Ignored the number of years.', 'বছরের সংখ্যা বাদ দেওয়া হয়েছে।'],
          [D * t, 'Multiplied by the years instead of dividing.', 'বছর দিয়ে ভাগের বদলে গুণ করা হয়েছে।'],
          [(100 * D) / (d + t), 'Added the rate and the years instead of multiplying them.', 'হার ও বছর গুণ না করে যোগ করা হয়েছে।'],
        ],
        steps: [
          T(`The extra interest comes only from the extra ${ex(d)}% for ${t} years.`, `অতিরিক্ত সুদ আসে শুধু ${t} বছরের অতিরিক্ত ${ex(d)}% হার থেকে।`),
          T(`P × ${ex(d)} × ${t} ÷ 100 = ${D}.`, `অর্থাৎ P × ${ex(d)} × ${t} ÷ 100 = ${D}।`),
          T(`P = ${D} × 100 ÷ ${ex(d * t)} = ₹${P}.`, `আসল P = ${D} × 100 ÷ ${ex(d * t)} = ₹${P}।`),
        ],
        shortcut: T('Sum = extra interest × 100 ÷ (extra rate × years).', 'আসল = অতিরিক্ত সুদ × 100 ÷ (অতিরিক্ত হার × বছর)।'),
      });
    }
    const r = pick(RATES);
    const dt = ri(1, 4);
    const D = (P * r * dt) / 100;
    if (!Number.isInteger(D)) return null;
    return q({
      id: 'i_si_rate_change', variant, kind: 'money', answer: P, given: { r, dt, D },
      stem: T(`Money deposited at ${pc(r)} simple interest per annum would have earned ₹${D} more if it had been left for ${dt} more year${dt > 1 ? 's' : ''}. How much was deposited?`,
        `বার্ষিক ${pc(r)} সরল সুদে জমা রাখা টাকা আরও ${dt} বছর রাখলে ₹${D} বেশি সুদ পাওয়া যেত। কত টাকা জমা রাখা হয়েছিল?`),
      hints: [
        [(100 * D) / r, 'Ignored the extra years.', 'অতিরিক্ত বছর বাদ দেওয়া হয়েছে।'],
        [D * dt, 'Multiplied the extra interest by the years.', 'অতিরিক্ত সুদকে বছর দিয়ে গুণ করা হয়েছে।'],
        [(D * r) / dt, 'Used the rate in the wrong place.', 'হারকে ভুল জায়গায় ব্যবহার করা হয়েছে।'],
      ],
      steps: [
        T(`Extra interest = interest for ${dt} extra year${dt > 1 ? 's' : ''} at ${pc(r)}.`, `অতিরিক্ত সুদ = ${pc(r)} হারে অতিরিক্ত ${dt} বছরের সুদ।`),
        T(`P × ${ex(r)} × ${dt} ÷ 100 = ${D}.`, `অর্থাৎ P × ${ex(r)} × ${dt} ÷ 100 = ${D}।`),
        T(`P = ${D} × 100 ÷ ${ex(r * dt)} = ₹${P}.`, `আসল P = ${D} × 100 ÷ ${ex(r * dt)} = ₹${P}।`),
      ],
      shortcut: T('Sum = extra interest × 100 ÷ (rate × extra years).', 'আসল = অতিরিক্ত সুদ × 100 ÷ (হার × অতিরিক্ত বছর)।'),
    });
  },

  i_si_multiple_times() {
    const variant = pick(['times_to_times', 'rate_equals_time']);
    if (variant === 'times_to_times') {
      const k1 = pick([2, 3, 4]);
      const t1 = ri(4, 16);
      const k2 = k1 + ri(1, 4);
      const t2 = (t1 * (k2 - 1)) / (k1 - 1);
      if (!clean(t2)) return null;
      return q({
        id: 'i_si_multiple_times', variant, kind: 'years', answer: t2, given: { k1, t1, k2 },
        stem: T(`At simple interest a sum of money becomes ${k1} times itself in ${t1} years. In how many years will it become ${k2} times itself at the same rate?`,
          `সরল সুদে কিছু টাকা ${t1} বছরে নিজের ${k1} গুণ হয়। একই হারে কত বছরে তা নিজের ${k2} গুণ হবে?`),
        hints: [
          [(t1 * k2) / k1, 'Scaled by the multiples; the interest is only (k − 1) times the sum.', 'গুণিতক দিয়ে অনুপাত করা হয়েছে; সুদ আসলের (k − 1) গুণ মাত্র।'],
          [t1 * (k2 - 1), 'Assumed the sum doubles in the given time.', 'ধরা হয়েছে প্রদত্ত সময়ে টাকা দ্বিগুণ হয়।'],
          [t1 + (k2 - k1) * t1, 'Added a full period for each extra multiple.', 'প্রতি অতিরিক্ত গুণের জন্য পুরো সময় যোগ করা হয়েছে।'],
        ],
        steps: [
          T(`In ${t1} years the interest is ${k1 - 1} times the sum.`, `${t1} বছরে সুদ = আসলের ${k1 - 1} গুণ।`),
          T(`To become ${k2} times, the interest must be ${k2 - 1} times the sum.`, `${k2} গুণ হতে সুদ হতে হবে আসলের ${k2 - 1} গুণ।`),
          T(`Simple interest grows evenly: time = ${t1} × ${k2 - 1}/${k1 - 1} = ${ex(t2)} years.`, `সরল সুদ সমানভাবে বাড়ে: সময় = ${t1} × ${k2 - 1}/${k1 - 1} = ${ex(t2)} বছর।`),
        ],
        shortcut: T('t₂ = t₁ × (k₂ − 1)/(k₁ − 1).', 'সূত্র: t₂ = t₁ × (k₂ − 1)/(k₁ − 1)।'),
      });
    }
    const r = ri(2, 15);
    const g = gcd(r * r, 100);
    const [a, b] = [(r * r) / g, 100 / g];
    if (b === 1) return null;
    return q({
      id: 'i_si_multiple_times', variant, kind: 'percent', answer: r, given: { a, b },
      stem: T(`The simple interest on a sum is ${a}/${b} of the sum, and the number of years is equal to the rate per cent per annum. What is the rate?`,
        `কিছু টাকার সরল সুদ আসলের ${a}/${b} অংশ, এবং বছরের সংখ্যা বার্ষিক শতকরা সুদের হারের সমান। সুদের হার কত?`),
      hints: [
        [(100 * a) / b, 'Forgot that rate × time = 100 × fraction, so a square root is needed.', 'হার × সময় = 100 × ভগ্নাংশ — তাই বর্গমূল নিতে হবে, তা ভুলে যাওয়া হয়েছে।'],
        [(100 * a) / b / 2, 'Halved instead of taking the square root.', 'বর্গমূলের বদলে অর্ধেক করা হয়েছে।'],
        [Math.sqrt(a / b) * 10 + (r % 2 ? 1 : 2), 'Arithmetic slip after the square root.', 'বর্গমূলের পরে গণনায় ভুল।'],
      ],
      steps: [
        T(`Let rate = time = r. Then P × r × r ÷ 100 = ${a}/${b} × P.`, `ধরি হার = সময় = r। তাহলে P × r × r ÷ 100 = ${a}/${b} × P।`),
        T(`r² = 100 × ${a}/${b} = ${r * r}.`, `অতএব r² = 100 × ${a}/${b} = ${r * r}।`),
        T(`r = ${r}, so the rate is ${r}% per annum.`, `r = ${r}, তাই সুদের হার বার্ষিক ${r}%।`),
      ],
      shortcut: T('r = 10 × √(fraction).', 'সূত্র: r = 10 × √(ভগ্নাংশ)।'),
    });
  },

  i_si_split_two_rates() {
    const variant = pick(['total_interest', 'equal_interest']);
    const P = ri(10, 100) * 1000;
    const [r1, r2] = [pick([4, 5, 6, 8, 10, 12]), pick([4, 5, 6, 8, 10, 12])];
    if (r1 === r2) return null;
    if (variant === 'total_interest') {
      const x = ri(1, P / 1000 - 1) * 1000;
      const t = ri(1, 4);
      const I = ((x * r1 + (P - x) * r2) * t) / 100;
      if (!Number.isInteger(I)) return null;
      return q({
        id: 'i_si_split_two_rates', variant, kind: 'money', answer: x, given: { P, r1, r2, t, I },
        stem: T(`₹${P} is lent out in two parts, one at ${r1}% and the other at ${r2}% simple interest per annum. The total interest after ${t} year${t > 1 ? 's' : ''} is ₹${I}. How much was lent at ${r1}%?`,
          `₹${P} দুই অংশে ধার দেওয়া হল — একটি বার্ষিক ${r1}% এবং অন্যটি ${r2}% সরল সুদে। ${t} বছর পরে মোট সুদ ₹${I}। ${r1}% হারে কত টাকা ধার দেওয়া হয়েছিল?`),
        hints: [
          [P - x, `This is the part lent at ${r2}%.`, `এটি ${r2}% হারে ধার দেওয়া অংশ।`],
          [P / 2, 'Assumed equal parts.', 'অংশ দুটি সমান ধরা হয়েছে।'],
          [(P * r2) / (r1 + r2), 'Divided in the ratio of the rates.', 'হারের অনুপাতে ভাগ করা হয়েছে।'],
        ],
        steps: [
          T(`Yearly interest = ${I} ÷ ${t} = ₹${ex(I / t)}, an average rate of ${ex((I / t / P) * 100)}%.`, `বার্ষিক সুদ = ${I} ÷ ${t} = ₹${ex(I / t)}, অর্থাৎ গড় হার ${ex((I / t / P) * 100)}%।`),
          T(`Let x be lent at ${r1}%: ${r1}x/100 + ${r2}(${P} − x)/100 = ${ex(I / t)}.`, `${r1}% হারে x টাকা ধরি: ${r1}x/100 + ${r2}(${P} − x)/100 = ${ex(I / t)}।`),
          T(`(${r1} − ${r2})x = ${ex((I / t) * 100)} − ${r2 * P} ⇒ x = ₹${x}.`, `সরল করে: (${r1} − ${r2})x = ${ex((I / t) * 100)} − ${r2 * P} ⇒ x = ₹${x}।`),
        ],
        shortcut: T('Alligation: the two parts are in the ratio of the distances of their rates from the average rate.', 'মিশ্রণ নিয়ম: অংশ দুটির অনুপাত = গড় হার থেকে তাদের হারের দূরত্বের বিপরীত অনুপাত।'),
      });
    }
    const [t1, t2] = [ri(2, 6), ri(2, 6)];
    const x = (P * r2 * t2) / (r1 * t1 + r2 * t2);
    if (!Number.isInteger(x) || t1 === t2) return null;
    return q({
      id: 'i_si_split_two_rates', variant, kind: 'money', answer: x, given: { P, r1, t1, r2, t2 },
      stem: T(`₹${P} is divided into two parts so that the simple interest on the first part at ${r1}% per annum for ${t1} years equals the simple interest on the second part at ${r2}% per annum for ${t2} years. Find the first part.`,
        `₹${P}-কে দুই অংশে এমনভাবে ভাগ করা হল যে প্রথম অংশের বার্ষিক ${r1}% হারে ${t1} বছরের সরল সুদ, দ্বিতীয় অংশের বার্ষিক ${r2}% হারে ${t2} বছরের সরল সুদের সমান। প্রথম অংশটি কত?`),
      hints: [
        [P - x, 'This is the second part.', 'এটি দ্বিতীয় অংশ।'],
        [(P * r1 * t1) / (r1 * t1 + r2 * t2), 'Shares are inversely proportional to rate × time, not directly.', 'অংশগুলি হার × সময়ের বিপরীত অনুপাতে, সরল অনুপাতে নয়।'],
        [(P * r2) / (r1 + r2), 'Ignored the different periods.', 'আলাদা সময়কাল বাদ দেওয়া হয়েছে।'],
      ],
      steps: [
        T(`Equal interest: x × ${r1} × ${t1} = (${P} − x) × ${r2} × ${t2}.`, `সুদ সমান: x × ${r1} × ${t1} = (${P} − x) × ${r2} × ${t2}।`),
        T(`So x : (${P} − x) = ${r2 * t2} : ${r1 * t1}.`, `তাই x : (${P} − x) = ${r2 * t2} : ${r1 * t1}।`),
        T(`x = ${P} × ${r2 * t2}/${r1 * t1 + r2 * t2} = ₹${x}.`, `প্রথম অংশ x = ${P} × ${r2 * t2}/${r1 * t1 + r2 * t2} = ₹${x}।`),
      ],
      shortcut: T('For equal interest, parts are inversely proportional to rate × time.', 'সুদ সমান হলে অংশগুলি হার × সময়ের বিপরীত অনুপাতে।'),
    });
  },

  i_si_equal_amounts() {
    const variant = pick(['first_share', 'share_ratio']);
    const r = pick([2, 4, 5, 6, 8, 10]);
    const a1 = ri(5, 13);
    const a2 = ri(a1 + 1, 16);
    const [t1, t2] = [18 - a1, 18 - a2];
    const k = [100 + r * t2, 100 + r * t1];
    if (variant === 'share_ratio') {
      return q({
        id: 'i_si_equal_amounts', variant, kind: 'ratio', answer: k, given: { a1, a2, r },
        stem: T(`A father invests money for his two sons, aged ${a1} and ${a2} years, at ${r}% simple interest per annum, so that each son receives the same amount when he turns 18. In what ratio should the money be divided (younger : elder)?`,
          `একজন বাবা তাঁর ${a1} ও ${a2} বছর বয়সী দুই ছেলের জন্য বার্ষিক ${r}% সরল সুদে টাকা রাখলেন, যাতে 18 বছর বয়সে প্রত্যেকে সমান টাকা পায়। টাকা কোন অনুপাতে ভাগ করা উচিত (ছোট : বড়)?`),
        hints: [
          [[k[1], k[0]], 'The ratio is the wrong way round: the younger son’s money grows for longer, so he needs less.', 'অনুপাত উল্টো: ছোট ছেলের টাকা বেশি দিন বাড়ে, তাই তার কম লাগে।'],
          [[t2, t1], 'Used only the years left, without the principal inside each amount.', 'শুধু বাকি বছর ধরা হয়েছে; সমূল-সুদে আসলও থাকে।'],
          [[1, 1], 'Assumed equal shares.', 'সমান ভাগ ধরা হয়েছে।'],
        ],
        steps: [
          T(`The younger son's money grows for ${t1} years, the elder's for ${t2} years.`, `ছোট ছেলের টাকা বাড়ে ${t1} বছর, বড় ছেলের ${t2} বছর।`),
          T(`Equal amounts: x(100 + ${r} × ${t1}) = y(100 + ${r} × ${t2}), i.e. ${k[1]}x = ${k[0]}y.`, `সমূল-সুদ সমান: x(100 + ${r} × ${t1}) = y(100 + ${r} × ${t2}), অর্থাৎ ${k[1]}x = ${k[0]}y।`),
          T(`x : y = ${k[0]} : ${k[1]} = ${KINDS.ratio(k).en}.`, `অতএব x : y = ${k[0]} : ${k[1]} = ${KINDS.ratio(k).en}।`),
        ],
        shortcut: T('Shares are inversely proportional to (100 + r × t) for each period.', 'অংশগুলি প্রতিটির (100 + r × t)-এর বিপরীত অনুপাতে।'),
      });
    }
    const P = ri(5, 60) * 1000;
    const x = (P * k[0]) / (k[0] + k[1]);
    if (!Number.isInteger(x)) return null;
    return q({
      id: 'i_si_equal_amounts', variant, kind: 'money', answer: x, given: { P, a1, a2, r },
      stem: T(`₹${P} is divided between two sisters aged ${a1} and ${a2} years and invested at ${r}% simple interest per annum, so that both get equal amounts at the age of 18. What is the younger sister's share?`,
        `₹${P} টাকা ${a1} ও ${a2} বছর বয়সী দুই বোনের মধ্যে ভাগ করে বার্ষিক ${r}% সরল সুদে রাখা হল, যাতে 18 বছর বয়সে দুজনেই সমান টাকা পায়। ছোট বোনের ভাগ কত?`),
      hints: [
        [P - x, "This is the elder sister's share.", 'এটি বড় বোনের ভাগ।'],
        [P / 2, 'Assumed equal shares.', 'সমান ভাগ ধরা হয়েছে।'],
        [(P * t2) / (t1 + t2), 'Divided in the ratio of years left, ignoring the principal in each amount.', 'বাকি বছরের অনুপাতে ভাগ করা হয়েছে; সমূল-সুদের আসল বাদ পড়েছে।'],
      ],
      steps: [
        T(`Younger: ${t1} years to 18; elder: ${t2} years.`, `ছোট বোনের 18 হতে ${t1} বছর, বড় বোনের ${t2} বছর।`),
        T(`x(100 + ${r * t1}) = (${P} − x)(100 + ${r * t2}) ⇒ x : (${P} − x) = ${k[0]} : ${k[1]}.`, `সমীকরণ: x(100 + ${r * t1}) = (${P} − x)(100 + ${r * t2}) ⇒ x : (${P} − x) = ${k[0]} : ${k[1]}।`),
        T(`x = ${P} × ${k[0]}/${k[0] + k[1]} = ₹${x}.`, `ছোট বোনের ভাগ = ${P} × ${k[0]}/${k[0] + k[1]} = ₹${x}।`),
      ],
      shortcut: T('The share that grows longer must be smaller: ratio = (100 + r·t₂) : (100 + r·t₁).', 'যে অংশ বেশি দিন বাড়ে সেটি ছোট হবে: অনুপাত = (100 + r·t₂) : (100 + r·t₁)।'),
    });
  },

  i_ci_si_difference() {
    const variant = pick(['two_years', 'three_years']);
    const r = pick([4, 5, 8, 10, 12, 15, 20, 25]);
    const P = ri(5, 200) * 100;
    if (variant === 'two_years') {
      const D = (P * r * r) / 10000;
      if (!clean(D) || D < 1) return null;
      return q({
        id: 'i_ci_si_difference', variant, kind: 'money', answer: P, given: { D, r },
        stem: T(`The difference between the compound interest (compounded annually) and the simple interest on a sum for 2 years at ${r}% per annum is ₹${ex(D)}. Find the sum.`,
          `কিছু টাকার বার্ষিক ${r}% হারে 2 বছরের চক্রবৃদ্ধি সুদ (বার্ষিক) ও সরল সুদের পার্থক্য ₹${ex(D)}। আসল কত?`),
        hints: [
          [(D * 100) / r, 'Treated the difference as one year’s simple interest on the sum.', 'পার্থক্যকে আসলের এক বছরের সরল সুদ ধরা হয়েছে।'],
          [(D * 10000) / (r * r) / 2, 'Halved the result.', 'ফলকে অর্ধেক করা হয়েছে।'],
          [(D * 100) / (2 * r), 'Treated the difference as two years’ simple interest.', 'পার্থক্যকে দুই বছরের সরল সুদ ধরা হয়েছে।'],
        ],
        steps: [
          T(`In the 2nd year, CI also earns interest on the 1st year's interest; that is the whole difference.`, `দ্বিতীয় বছরে চক্রবৃদ্ধি সুদে প্রথম বছরের সুদের উপরও সুদ হয়; সেটাই পুরো পার্থক্য।`),
          T(`D = P × (${r}/100)² = P × ${ex((r * r) / 10000)}.`, `অর্থাৎ D = P × (${r}/100)² = P × ${ex((r * r) / 10000)}।`),
          T(`P = ${ex(D)} ÷ ${ex((r * r) / 10000)} = ₹${P}.`, `আসল P = ${ex(D)} ÷ ${ex((r * r) / 10000)} = ₹${P}।`),
        ],
        shortcut: T('2 years: P = D × (100/r)².', '2 বছরের জন্য: P = D × (100/r)²।'),
      });
    }
    const D = (P * r * r * (300 + r)) / 1e6;
    if (!clean(D) || D < 1) return null;
    return q({
      id: 'i_ci_si_difference', variant, kind: 'money', answer: P, given: { D, r },
      stem: T(`On a certain sum, the compound interest (compounded annually) for 3 years at ${r}% per annum exceeds the simple interest for the same period by ₹${ex(D)}. What is the sum?`,
        `কিছু টাকার বার্ষিক ${r}% হারে 3 বছরের চক্রবৃদ্ধি সুদ (বার্ষিক), একই সময়ের সরল সুদের চেয়ে ₹${ex(D)} বেশি। আসল কত?`),
      hints: [
        [(D * 10000) / (r * r), 'Used the 2-year formula; 3 years has an extra (3 + r/100) factor.', '2 বছরের সূত্র ব্যবহার করা হয়েছে; 3 বছরে অতিরিক্ত (3 + r/100) গুণক আছে।'],
        [(D * 10000) / (r * r) / 3, 'Used a factor of 3 but missed the r/100 term.', '3 গুণক নেওয়া হয়েছে কিন্তু r/100 পদটি বাদ পড়েছে।'],
        [(D * 100) / (3 * r), 'Treated the difference as three years of simple interest.', 'পার্থক্যকে তিন বছরের সরল সুদ ধরা হয়েছে।'],
      ],
      steps: [
        T(`For 3 years, CI − SI = P(r/100)²(3 + r/100).`, `3 বছরের জন্য চক্রবৃদ্ধি − সরল সুদ = P(r/100)²(3 + r/100)।`),
        T(`= P × ${ex((r * r) / 10000)} × ${ex(3 + r / 100)} = P × ${ex((r * r * (300 + r)) / 1e6)}.`, `অর্থাৎ = P × ${ex((r * r) / 10000)} × ${ex(3 + r / 100)} = P × ${ex((r * r * (300 + r)) / 1e6)}।`),
        T(`P = ${ex(D)} ÷ ${ex((r * r * (300 + r)) / 1e6)} = ₹${P}.`, `আসল P = ${ex(D)} ÷ ${ex((r * r * (300 + r)) / 1e6)} = ₹${P}।`),
      ],
      shortcut: T('3 years: D = P(r/100)²(3 + r/100).', '3 বছরের জন্য: D = P(r/100)²(3 + r/100)।'),
    });
  },

  i_ci_consecutive_amounts() {
    const variant = pick(['find_rate', 'find_principal']);
    const r = pick([4, 5, 8, 10, 12.5, 15, 20, 25]);
    if (variant === 'find_rate') {
      const n = ri(2, 5);
      const M = ri(20, 400) * 100;
      const M2 = M * (1 + r / 100);
      if (!Number.isInteger(M2)) return null;
      return q({
        id: 'i_ci_consecutive_amounts', variant, kind: 'percent', answer: r, given: { M, n, M2 },
        stem: T(`A sum at compound interest (compounded annually) amounts to ₹${M} in ${n} years and to ₹${M2} in ${n + 1} years. What is the rate of interest?`,
          `চক্রবৃদ্ধি সুদে (বার্ষিক) কিছু টাকা ${n} বছরে ₹${M} এবং ${n + 1} বছরে ₹${M2} হয়। সুদের হার কত?`),
        hints: [
          [((M2 - M) / M2) * 100, 'Divided by the later amount; the interest is on the earlier one.', 'পরের সমূল-সুদ দিয়ে ভাগ করা হয়েছে; সুদ হয় আগেরটির উপর।'],
          [((M2 - M) / M) * 100 / (n + 1), 'Spread one year’s growth over all the years.', 'এক বছরের বৃদ্ধিকে সব বছরে ভাগ করা হয়েছে।'],
          [((M2 - M) / M) * 100 * 2, 'Doubled the one-year rate.', 'এক বছরের হার দ্বিগুণ করা হয়েছে।'],
        ],
        steps: [
          T(`The ${ord(n + 1)} year's interest = ${M2} − ${M} = ₹${M2 - M}.`, `${n + 1}তম বছরের সুদ = ${M2} − ${M} = ₹${M2 - M}।`),
          T(`It is earned on the amount at the start of that year, ₹${M}.`, `এই সুদ হয় সেই বছরের শুরুর সমূল-সুদ ₹${M}-এর উপর।`),
          T(`Rate = ${M2 - M} ÷ ${M} × 100 = ${pc(r)}.`, `সুদের হার = ${M2 - M} ÷ ${M} × 100 = ${pc(r)}।`),
        ],
        shortcut: T('Consecutive compound amounts: r = (later − earlier) ÷ earlier × 100.', 'পরপর চক্রবৃদ্ধি সমূল-সুদ: r = (পরের − আগের) ÷ আগের × 100।'),
      });
    }
    const P = ri(4, 200) * 100;
    const A2 = cents(P * (1 + r / 100) ** 2);
    const A3 = cents(P * (1 + r / 100) ** 3);
    if (!clean(P * (1 + r / 100) ** 2) || !clean(P * (1 + r / 100) ** 3) || A2 % 1 || A3 % 1) return null;
    return q({
      id: 'i_ci_consecutive_amounts', variant, kind: 'money', answer: P, given: { A2, A3 },
      stem: T(`At compound interest (compounded annually), a sum amounts to ₹${A2} in 2 years and to ₹${A3} in 3 years. What is the sum?`,
        `চক্রবৃদ্ধি সুদে (বার্ষিক) কিছু টাকা 2 বছরে ₹${A2} এবং 3 বছরে ₹${A3} হয়। আসল কত?`),
      hints: [
        [A2 - 2 * (A3 - A2), 'Took away two years of the third year’s interest, as if it were simple interest.', 'তৃতীয় বছরের সুদকে দুবার বিয়োগ করা হয়েছে, যেন সরল সুদ।'],
        [A2 / (1 + r / 100), 'Removed only one year of growth.', 'মাত্র এক বছরের বৃদ্ধি সরানো হয়েছে।'],
        [A2 - (A3 - A2), 'Subtracted one year’s interest once.', 'এক বছরের সুদ একবার বিয়োগ করা হয়েছে।'],
      ],
      steps: [
        T(`Rate = (${A3} − ${A2}) ÷ ${A2} × 100 = ${pc(r)}.`, `সুদের হার = (${A3} − ${A2}) ÷ ${A2} × 100 = ${pc(r)}।`),
        T(`So the yearly growth factor is ${ex(1 + r / 100)}.`, `তাই বার্ষিক বৃদ্ধির গুণক = ${ex(1 + r / 100)}।`),
        T(`Sum = ${A2} ÷ ${ex(1 + r / 100)}² = ₹${P}.`, `আসল = ${A2} ÷ ${ex(1 + r / 100)}² = ₹${P}।`),
      ],
      shortcut: T('Find r from the two amounts, then divide back by (1 + r/100) for each year.', 'দুই সমূল-সুদ থেকে হার বের করে প্রতি বছরের জন্য (1 + r/100) দিয়ে ভাগ করো।'),
    });
  },

  i_si_instalments() {
    const variant = pick(['instalment', 'total_paid']);
    const r = pick([4, 5, 6, 8, 10, 12, 15]);
    const n = ri(2, 4);
    const P = ri(2, 200) * 500;
    const due = P * (1 + (r * n) / 100);
    const exact = due / (n + (r * n * (n - 1)) / 200);
    const x = cents(exact);
    if (!clean(exact) || x % 1) return null;
    const ans = variant === 'instalment' ? x : n * x;
    return q({
      id: 'i_si_instalments', variant, kind: 'money', answer: ans, given: { P, r, n },
      stem: variant === 'instalment'
        ? T(`A loan of ₹${P} at ${r}% simple interest per annum is to be repaid in ${n} equal yearly instalments, the first due one year after the loan. What is each instalment?`,
          `বার্ষিক ${r}% সরল সুদে ₹${P} ঋণ ${n}টি সমান বার্ষিক কিস্তিতে শোধ করতে হবে; প্রথম কিস্তি ঋণের এক বছর পরে। প্রতিটি কিস্তি কত?`)
        : T(`A loan of ₹${P} at ${r}% simple interest per annum is cleared by ${n} equal yearly instalments, the first paid one year after the loan. How much is paid in all?`,
          `বার্ষিক ${r}% সরল সুদে ₹${P} ঋণ ${n}টি সমান বার্ষিক কিস্তিতে শোধ করা হল; প্রথম কিস্তি ঋণের এক বছর পরে। মোট কত টাকা দেওয়া হল?`),
      hints: variant === 'instalment'
        ? [
          [due / n, 'Split the amount due equally, forgetting that early instalments earn interest until the end.', 'বকেয়া সমান ভাগ করা হয়েছে; আগের কিস্তিগুলি শেষ পর্যন্ত সুদ পায়, তা ভুলে যাওয়া হয়েছে।'],
          [(P / n) * (1 + r / 100), 'Added one year’s interest to an equal share of the loan.', 'ঋণের সমান ভাগের সঙ্গে এক বছরের সুদ যোগ করা হয়েছে।'],
          [P / n, 'Ignored the interest entirely.', 'সুদ একেবারে বাদ দেওয়া হয়েছে।'],
        ]
        : [
          [due, 'This is the amount due at the end if nothing is paid earlier.', 'আগে কিছু না দিলে শেষে যা বকেয়া হত, এটি তা।'],
          [P, 'Ignored the interest.', 'সুদ বাদ দেওয়া হয়েছে।'],
          [P * (1 + r / 100), 'Added only one year’s interest.', 'মাত্র এক বছরের সুদ যোগ করা হয়েছে।'],
        ],
      steps: [
        T(`Amount due after ${n} years = ${P} × (1 + ${r} × ${n}/100) = ₹${ex(due)}.`, `${n} বছর পরে বকেয়া = ${P} × (1 + ${r} × ${n}/100) = ₹${ex(due)}।`),
        T(`An instalment paid with k years left earns x × ${r}k/100. The ${n} instalments together are worth x × (${n} + ${r} × ${(n * (n - 1)) / 2}/100) = ${ex(n + (r * n * (n - 1)) / 200)}x at the end.`, `যে কিস্তির পরে k বছর বাকি, তা x × ${r}k/100 সুদ পায়। ${n}টি কিস্তির শেষ মূল্য = x × (${n} + ${r} × ${(n * (n - 1)) / 2}/100) = ${ex(n + (r * n * (n - 1)) / 200)}x।`),
        T(`x = ${ex(due)} ÷ ${ex(n + (r * n * (n - 1)) / 200)} = ₹${ex(x)}${variant === 'total_paid' ? `; total paid = ${n} × ${ex(x)} = ₹${ex(n * x)}` : ''}.`, `কিস্তি x = ${ex(due)} ÷ ${ex(n + (r * n * (n - 1)) / 200)} = ₹${ex(x)}${variant === 'total_paid' ? `; মোট দেওয়া = ${n} × ${ex(x)} = ₹${ex(n * x)}` : ''}।`),
      ],
      shortcut: T('Instalment = amount due ÷ (n + r·n(n − 1)/200).', 'কিস্তি = বকেয়া ÷ (n + r·n(n − 1)/200)।'),
    });
  },

  i_ci_half_yearly() {
    const variant = pick(['difference', 'amount_18_months']);
    const r = pick([4, 8, 10, 12, 16, 20]);
    const P = ri(5, 400) * 100;
    if (variant === 'difference') {
      const D = P * (r / 200) ** 2;
      if (!clean(D) || D < 1) return null;
      return q({
        id: 'i_ci_half_yearly', variant, kind: 'money', answer: D, given: { P, r },
        stem: T(`₹${P} is invested for one year at ${r}% per annum. How much more interest does it earn if interest is compounded half-yearly instead of yearly?`,
          `₹${P} এক বছরের জন্য বার্ষিক ${r}% হারে রাখা হল। বার্ষিকের বদলে অর্ধবার্ষিক চক্রবৃদ্ধি হলে কত টাকা বেশি সুদ পাওয়া যাবে?`),
        hints: [
          [P * (r / 100) ** 2, 'Used the full yearly rate for the extra term; each half-year earns r/2.', 'অতিরিক্ত পদে পুরো বার্ষিক হার নেওয়া হয়েছে; প্রতি অর্ধবছরে হার r/2।'],
          [(P * r) / 200, 'This is one half-year’s interest, not the extra amount.', 'এটি এক অর্ধবছরের সুদ, অতিরিক্ত পরিমাণ নয়।'],
          [2 * P * (r / 200) ** 2, 'Counted the interest-on-interest twice.', 'সুদের উপর সুদ দুবার গোনা হয়েছে।'],
        ],
        steps: [
          T(`Yearly: interest = ${P} × ${r}/100 = ₹${ex((P * r) / 100)}.`, `বার্ষিক হিসেবে সুদ = ${P} × ${r}/100 = ₹${ex((P * r) / 100)}।`),
          T(`Half-yearly: rate ${r / 2}% for 2 periods; amount = ${P} × ${ex(1 + r / 200)}² = ₹${ex(P * (1 + r / 200) ** 2)}.`, `অর্ধবার্ষিক হিসেবে 2টি পর্বে ${r / 2}% হার; সমূল-সুদ = ${P} × ${ex(1 + r / 200)}² = ₹${ex(P * (1 + r / 200) ** 2)}।`),
          T(`Extra = ${ex(P * (1 + r / 200) ** 2 - P)} − ${ex((P * r) / 100)} = ₹${ex(D)}.`, `বেশি সুদ = ${ex(P * (1 + r / 200) ** 2 - P)} − ${ex((P * r) / 100)} = ₹${ex(D)}।`),
        ],
        shortcut: T('Extra in one year = P × (r/200)², the interest on the first half-year’s interest.', 'এক বছরে অতিরিক্ত = P × (r/200)² — প্রথম অর্ধবছরের সুদের উপর সুদ।'),
      });
    }
    const A = P * (1 + r / 200) ** 3;
    const CI = A - P;
    if (!clean(CI)) return null;
    return q({
      id: 'i_ci_half_yearly', variant, kind: 'money', answer: CI, given: { P, r },
      stem: T(`What is the compound interest on ₹${P} for 1½ years at ${r}% per annum, compounded half-yearly?`,
        `₹${P}-এর বার্ষিক ${r}% হারে 1½ বছরের অর্ধবার্ষিক চক্রবৃদ্ধি সুদ কত?`),
      hints: [
        [(P * r * 1.5) / 100, 'This is simple interest for 1½ years.', 'এটি 1½ বছরের সরল সুদ।'],
        [P * (1 + r / 200) ** 2 - P, 'Compounded for only two half-years.', 'মাত্র দুটি অর্ধবছর চক্রবৃদ্ধি করা হয়েছে।'],
        [P * (1 + r / 100) * (1 + r / 200) - P, 'Compounded the first year yearly and only the last half-year at r/2.', 'প্রথম বছর বার্ষিক এবং শুধু শেষ অর্ধবছর r/2 হারে ধরা হয়েছে।'],
      ],
      steps: [
        T(`Half-yearly: rate = ${r}/2 = ${r / 2}% per period; 1½ years = 3 periods.`, `অর্ধবার্ষিক: প্রতি পর্বে হার = ${r}/2 = ${r / 2}%; 1½ বছর = 3টি পর্ব।`),
        T(`Amount = ${P} × ${ex(1 + r / 200)}³ = ₹${ex(A)}.`, `সমূল-সুদ = ${P} × ${ex(1 + r / 200)}³ = ₹${ex(A)}।`),
        T(`CI = ${ex(A)} − ${P} = ₹${ex(CI)}.`, `চক্রবৃদ্ধি সুদ = ${ex(A)} − ${P} = ₹${ex(CI)}।`),
      ],
      shortcut: T('Halve the rate, double the periods.', 'হার অর্ধেক, পর্বের সংখ্যা দ্বিগুণ।'),
    });
  },

  i_si_ci_two_conditions() {
    const variant = pick(['find_rate', 'find_principal']);
    const r = pick([4, 5, 8, 10, 12.5, 15, 20, 25]);
    const P = ri(5, 300) * 100;
    if (!clean(P * ((1 + r / 100) ** 2 - 1))) return null;
    const S = cents((2 * P * r) / 100);
    const C = cents(P * ((1 + r / 100) ** 2 - 1));
    const stem = T(`On a certain sum, the simple interest for 2 years is ₹${ex(S)} and the compound interest (compounded annually) for 2 years at the same rate is ₹${ex(C)}.`,
      `কিছু টাকার 2 বছরের সরল সুদ ₹${ex(S)} এবং একই হারে 2 বছরের চক্রবৃদ্ধি সুদ (বার্ষিক) ₹${ex(C)}।`);
    const steps = [
      T(`One year's SI = ${ex(S)} ÷ 2 = ₹${ex(S / 2)}.`, `এক বছরের সরল সুদ = ${ex(S)} ÷ 2 = ₹${ex(S / 2)}।`),
      T(`CI − SI = ₹${ex(C - S)} is the interest on one year's interest, so rate = ${ex(C - S)} ÷ ${ex(S / 2)} × 100 = ${pc(r)}.`, `চক্রবৃদ্ধি − সরল = ₹${ex(C - S)}, যা এক বছরের সুদের উপর সুদ; তাই হার = ${ex(C - S)} ÷ ${ex(S / 2)} × 100 = ${pc(r)}।`),
    ];
    if (variant === 'find_rate') {
      return q({
        id: 'i_si_ci_two_conditions', variant, kind: 'percent', answer: r, given: { S, C },
        stem: T(`${stem.en} What is the rate of interest?`, `${stem.bn} সুদের হার কত?`),
        hints: [
          [((C - S) / S) * 100, 'Divided by two years’ SI; the extra is interest on one year’s interest.', 'দুই বছরের সরল সুদ দিয়ে ভাগ করা হয়েছে; অতিরিক্তটি এক বছরের সুদের উপর সুদ।'],
          [((C - S) / C) * 100 * 2, 'Divided by the compound interest.', 'চক্রবৃদ্ধি সুদ দিয়ে ভাগ করা হয়েছে।'],
          [(S / 2 / (S / 2 + C)) * 100, 'Mixed up the interests and the principal.', 'সুদ ও আসল গুলিয়ে ফেলা হয়েছে।'],
        ],
        steps: [...steps, T(`(The sum is ${ex(S / 2)} × 100 ÷ ${ex(r)} = ₹${P}.)`, `(আসল = ${ex(S / 2)} × 100 ÷ ${ex(r)} = ₹${P}।)`)],
        shortcut: T('r = 2(CI − SI) ÷ SI × 100 for two years.', 'দুই বছরের জন্য r = 2(চক্রবৃদ্ধি − সরল) ÷ সরল × 100।'),
      });
    }
    return q({
      id: 'i_si_ci_two_conditions', variant, kind: 'money', answer: P, given: { S, C },
      stem: T(`${stem.en} What is the sum?`, `${stem.bn} আসল কত?`),
      hints: [
        [(S * 100) / r, 'Used two years’ SI as if it were one year’s.', 'দুই বছরের সরল সুদকে এক বছরের ধরা হয়েছে।'],
        [(C * 100) / (2 * r), 'Used the compound interest in the simple-interest formula.', 'সরল সুদের সূত্রে চক্রবৃদ্ধি সুদ বসানো হয়েছে।'],
        [(S * S) / (4 * (C - S)) * 2, 'Doubled the result.', 'ফলকে দ্বিগুণ করা হয়েছে।'],
      ],
      steps: [...steps, T(`Sum = one year's SI × 100 ÷ rate = ${ex(S / 2)} × 100 ÷ ${ex(r)} = ₹${P}.`, `আসল = এক বছরের সরল সুদ × 100 ÷ হার = ${ex(S / 2)} × 100 ÷ ${ex(r)} = ₹${P}।`)],
      shortcut: T('Sum = SI² ÷ (4 × (CI − SI)) for two years.', 'দুই বছরের জন্য আসল = (সরল সুদ)² ÷ (4 × (চক্রবৃদ্ধি − সরল))।'),
    });
  },
};

module.exports = { topic: 'interest', registry, generators: gens };
