'use strict';

/**
 * Additional quantitative question forms for the existing catalogue topics.
 * Questions are generated from exact integer inputs and use the shared
 * generator contract so existing validation, targeting and de-duplication
 * continue to apply.
 */

const { ri, gcd, n2, T, numOptions, build } = require('../common');

const plain = (v) => T(n2(v), n2(v));
const unit = (en, bn) => (v) => T(`${n2(v)} ${en}`, `${n2(v)} ${bn}`);
const hint = (v, en, bn) => [v, en, bn];
const ratioText = (a, b) => {
  const g = gcd(a, b);
  return `${a / g} : ${b / g}`;
};

function pctSuccessivePrice() {
  const original = 100 * ri(2, 80);
  const increase = [10, 20, 25, 30][ri(0, 3)];
  const decrease = [10, 20, 25, 30][ri(0, 3)];
  const afterIncrease = original * (100 + increase) / 100;
  const answer = afterIncrease * (100 - decrease) / 100;
  const options = numOptions(answer, plain, [
    hint(original * (100 + increase - decrease) / 100, 'The two percentage changes use different bases; apply them in order.', 'দুটি শতকরা পরিবর্তনের ভিত্তি আলাদা; পরিবর্তন দুটি ক্রমানুসারে প্রয়োগ করো।'),
  ]);
  return build({
    topic: 'percentage', subtopic: 'successive_change_amount', tags: ['percentage', 'successive_percentage'],
    difficulty: 2, time: 45,
    stem: T(
      `An article costs ₹${original}. Its price is increased by ${increase}% and then reduced by ${decrease}%. What is its final price?`,
      `একটি জিনিসের দাম ₹${original}। দাম ${increase}% বাড়িয়ে পরে ${decrease}% কমানো হলো। শেষ দাম কত?`,
    ),
    ...options,
    steps: [
      T(`After the increase: ₹${original} × ${100 + increase}/100 = ₹${n2(afterIncrease)}.`, `বৃদ্ধির পরে: ₹${original} × ${100 + increase}/100 = ₹${n2(afterIncrease)}।`),
      T(`After the reduction: ₹${n2(afterIncrease)} × ${100 - decrease}/100 = ₹${n2(answer)}.`, `হ্রাসের পরে: ₹${n2(afterIncrease)} × ${100 - decrease}/100 = ₹${n2(answer)}।`),
    ],
    shortcut: T('Convert each change to a multiplier and apply the multipliers in order.', 'প্রতিটি পরিবর্তনকে গুণকে বদলে ক্রমানুসারে গুণ করো।'),
  });
}

function averageReplacement() {
  const count = ri(5, 12);
  const average = ri(45, 65);
  const oldScore = average - ri(5, 10);
  const increase = ri(1, 3);
  const newAverage = average + increase;
  const answer = oldScore + count * increase;
  const options = numOptions(answer, plain, [
    hint(oldScore + increase, 'The total rises by the average change multiplied by the number of observations.', 'মোট যোগফল বাড়ে গড়ের পরিবর্তনকে সংখ্যার পরিমাণ দিয়ে গুণ করলে।'),
  ]);
  return build({
    topic: 'average', subtopic: 'replacement_and_average', tags: ['average', 'replacement'],
    difficulty: 2, time: 45,
    stem: T(
      `The average mark of ${count} students rises from ${average} to ${newAverage} when one student's mark is corrected. If the original mark was ${oldScore}, what is the corrected mark?`,
      `${count} জন ছাত্রের গড় নম্বর ${average} থেকে ${newAverage} হলো, কারণ একজনের নম্বর সংশোধন করা হয়েছে। তার আগের নম্বর ${oldScore} হলে সংশোধিত নম্বর কত?`,
    ),
    ...options,
    steps: [
      T(`Increase in the group's total marks = ${count} × (${newAverage} − ${average}) = ${count * increase}.`, `দলের মোট নম্বরের বৃদ্ধি = ${count} × (${newAverage} − ${average}) = ${count * increase}।`),
      T(`Corrected mark = ${oldScore} + ${count * increase} = ${answer}.`, `সংশোধিত নম্বর = ${oldScore} + ${count * increase} = ${answer}।`),
    ],
    shortcut: T('Change in one value = change in average × number of values.', 'একটি মানের পরিবর্তন = গড়ের পরিবর্তন × মোট মানের সংখ্যা।'),
  });
}

function ratioFourthProportional() {
  const a = ri(2, 12);
  const multiplier = ri(2, 8);
  const b = ri(3, 15);
  const c = a * multiplier;
  const answer = b * multiplier;
  const options = numOptions(answer, plain, [
    hint(b * c, 'Keep the two ratios in the same order and cross-multiply.', 'দুটি অনুপাত একই ক্রমে রেখে আড়াআড়ি গুণ করো।'),
    hint(a * b / c, 'The unknown is the fourth proportional: x = b × c ÷ a.', 'অজানা চতুর্থ সমানুপাতিক: x = b × c ÷ a।'),
  ]);
  return build({
    topic: 'ratio_proportion', subtopic: 'fourth_proportional', tags: ['ratio', 'proportion'],
    difficulty: 1, time: 35,
    stem: T(`Find x if ${a} : ${b} = ${c} : x.`, `${a} : ${b} = ${c} : x হলে x-এর মান নির্ণয় করো।`),
    ...options,
    steps: [
      T(`Write the proportion as ${a}/${b} = ${c}/x.`, `সমানুপাতটি লেখো: ${a}/${b} = ${c}/x।`),
      T(`Cross-multiply: ${a}x = ${b} × ${c}, so x = ${b * c}/${a} = ${answer}.`, `আড়াআড়ি গুণ করলে: ${a}x = ${b} × ${c}, তাই x = ${b * c}/${a} = ${answer}।`),
    ],
    shortcut: T('For a : b = c : x, the fourth proportional is x = bc/a.', 'a : b = c : x হলে চতুর্থ সমানুপাতিক x = bc/a।'),
  });
}

function simpleInterestPrincipal() {
  const principal = 100 * ri(5, 100);
  const rate = [5, 8, 10, 12][ri(0, 3)];
  const years = ri(2, 5);
  const interest = principal * rate * years / 100;
  const options = numOptions(principal, unit('rupees', 'টাকা'), [
    hint(interest, 'That is the interest earned, not the principal invested.', 'এটি অর্জিত সুদ, বিনিয়োগ করা আসল নয়।'),
    hint(principal + interest, 'That is the amount (principal plus interest), not the principal.', 'এটি আসল ও সুদের যোগফল, শুধু আসল নয়।'),
  ]);
  return build({
    topic: 'interest', subtopic: 'simple_interest_principal', tags: ['simple_interest', 'principal'],
    difficulty: 2, time: 45,
    stem: T(
      `A sum earns ₹${n2(interest)} as simple interest at ${rate}% per year in ${years} years. What was the principal?`,
      `${rate}% বার্ষিক সরল সুদে ${years} বছরে একটি আসল থেকে ₹${n2(interest)} সুদ হয়েছে। আসল কত ছিল?`,
    ),
    ...options,
    steps: [
      T(`Simple interest = P × R × T / 100.`, `সরল সুদ = P × R × T / 100।`),
      T(`P = ${n2(interest)} × 100 / (${rate} × ${years}) = ₹${n2(principal)}.`, `P = ${n2(interest)} × 100 / (${rate} × ${years}) = ₹${n2(principal)}।`),
    ],
    shortcut: T('Rearrange the simple-interest formula: P = SI × 100 / (R × T).', 'সরল সুদের সূত্র সাজাও: P = SI × 100 / (R × T)।'),
  });
}

function smallestAdditionForDivisibility() {
  const divisor = ri(7, 25);
  const number = ri(120, 999);
  const remainder = number % divisor;
  const answer = remainder === 0 ? divisor : divisor - remainder;
  const options = numOptions(answer, plain, [
    hint(remainder, 'That is the remainder to subtract, not the amount to add.', 'এটি বিয়োগ করার ভাগশেষ, যোগ করার পরিমাণ নয়।'),
  ]);
  return build({
    topic: 'number_system', subtopic: 'divisibility_smallest_addition', tags: ['divisibility', 'remainder'],
    difficulty: 1, time: 35,
    stem: T(`What is the smallest positive number that must be added to ${number} to make it divisible by ${divisor}?`, `${number}-এর সঙ্গে ক্ষুদ্রতম কত ধনাত্মক সংখ্যা যোগ করলে যোগফল ${divisor} দিয়ে বিভাজ্য হবে?`),
    ...options,
    steps: [
      T(`${number} divided by ${divisor} leaves remainder ${remainder}.`, `${number}-কে ${divisor} দিয়ে ভাগ করলে ভাগশেষ ${remainder}।`),
      T(`Add ${divisor} − ${remainder} = ${answer} to reach the next multiple of ${divisor}.`, `পরের ${divisor}-এর গুণিতকে পৌঁছতে ${divisor} − ${remainder} = ${answer} যোগ করো।`),
    ],
    shortcut: T('Required addition = divisor − remainder; if the remainder is zero, add one full divisor.', 'প্রয়োজনীয় যোগ = ভাজক − ভাগশেষ; ভাগশেষ শূন্য হলে একটি পূর্ণ ভাজক যোগ করো।'),
  });
}

function trainCrossingTrain() {
  const speedA = 36 * ri(1, 2);
  const speedB = 36 * ri(1, 2);
  const seconds = ri(5, 15);
  const msA = speedA * 5 / 18;
  const msB = speedB * 5 / 18;
  const lengthA = msA * seconds;
  const lengthB = msB * seconds;
  const answer = (lengthA + lengthB) / (msA + msB);
  const options = numOptions(answer, unit('seconds', 'সেকেন্ড'), [
    hint((lengthA + lengthB) / Math.abs(msA - msB), 'For trains moving in opposite directions, add their speeds.', 'বিপরীত দিকে চলা ট্রেনের আপেক্ষিক দ্রুতি পেতে দ্রুতিগুলি যোগ করতে হয়।'),
  ]);
  return build({
    topic: 'time_speed_distance', subtopic: 'trains_crossing_each_other', tags: ['speed_distance', 'trains', 'relative_speed'],
    difficulty: 3, time: 55,
    stem: T(
      `Two trains of lengths ${lengthA} m and ${lengthB} m run in opposite directions at ${speedA} km/h and ${speedB} km/h. How many seconds do they take to cross each other completely?`,
      `${lengthA} মিটার ও ${lengthB} মিটার দীর্ঘ দুটি ট্রেন যথাক্রমে ${speedA} ও ${speedB} কিমি/ঘণ্টা বেগে বিপরীত দিকে চলে। একে অপরকে সম্পূর্ণ অতিক্রম করতে কত সেকেন্ড লাগবে?`,
    ),
    ...options,
    steps: [
      T(`Combined length = ${lengthA} + ${lengthB} = ${lengthA + lengthB} m.`, `মোট দৈর্ঘ্য = ${lengthA} + ${lengthB} = ${lengthA + lengthB} মিটার।`),
      T(`Relative speed = (${speedA} + ${speedB}) × 5/18 = ${n2(msA + msB)} m/s; time = ${lengthA + lengthB} ÷ ${n2(msA + msB)} = ${answer} seconds.`, `আপেক্ষিক দ্রুতি = (${speedA} + ${speedB}) × 5/18 = ${n2(msA + msB)} মি/সে; সময় = ${lengthA + lengthB} ÷ ${n2(msA + msB)} = ${answer} সেকেন্ড।`),
    ],
    shortcut: T('Opposite directions: add speeds and add train lengths before dividing.', 'বিপরীত দিকে চললে দ্রুতিগুলি ও ট্রেনের দৈর্ঘ্য যোগ করে ভাগ করো।'),
  });
}

function linearEquationWithBrackets() {
  const x = ri(2, 20);
  const a = ri(2, 9);
  const b = ri(2, 9);
  const c = ri(2, 20);
  const right = a * (x + b) - c * x;
  if (a === c || right <= 0) return null;
  const options = numOptions(x, plain, [
    hint(right / (a - c), 'Move the x terms together, preserving the sign of each term.', 'x-যুক্ত পদগুলি এক পাশে নাও এবং প্রতিটি পদের চিহ্ন ঠিক রাখো।'),
  ]);
  return build({
    topic: 'algebra', subtopic: 'linear_equation_brackets', tags: ['algebra', 'linear_equation'],
    difficulty: 2, time: 40,
    stem: T(`Solve for x: ${a}(x + ${b}) = ${c}x + ${right}.`, `x-এর মান নির্ণয় করো: ${a}(x + ${b}) = ${c}x + ${right}।`),
    ...options,
    steps: [
      T(`Expand the bracket: ${a}x + ${a * b} = ${c}x + ${right}.`, `বন্ধনী খুললে: ${a}x + ${a * b} = ${c}x + ${right}।`),
      T(`Rearrange: ${a - c}x = ${right - a * b}; therefore x = ${x}.`, `পদ সাজালে: ${a - c}x = ${right - a * b}; অতএব x = ${x}।`),
    ],
    shortcut: T('Expand first, then collect x terms on one side and constants on the other.', 'আগে বন্ধনী খোলো, তারপর x-যুক্ত পদ ও ধ্রুবক আলাদা পাশে নাও।'),
  });
}

function outsidePathArea() {
  const length = ri(12, 40);
  const width = ri(8, length - 2);
  const path = ri(1, 5);
  const answer = (length + 2 * path) * (width + 2 * path) - length * width;
  const options = numOptions(answer, unit('m²', 'বর্গমিটার'), [
    hint(2 * path * (length + width), 'That expression misses the four corner squares of the outside path.', 'এই রাশিতে বাইরের পথের চারটি কোণের বর্গক্ষেত্র বাদ পড়েছে।'),
  ]);
  return build({
    topic: 'mensuration', subtopic: 'area_path_around_rectangle', tags: ['mensuration', 'area', 'rectangle'],
    difficulty: 2, time: 45,
    stem: T(
      `A uniform ${path} m wide path is built outside a rectangular garden measuring ${length} m by ${width} m. Find the area of the path.`,
      `${length} মিটার × ${width} মিটার আয়তাকার বাগানের বাইরে ${path} মিটার চওড়া সমান পথ তৈরি করা হলো। পথটির ক্ষেত্রফল কত?`,
    ),
    ...options,
    steps: [
      T(`Outer dimensions = (${length} + 2 × ${path}) m by (${width} + 2 × ${path}) m.`, `বাইরের মাপ = (${length} + 2 × ${path}) মিটার × (${width} + 2 × ${path}) মিটার।`),
      T(`Path area = (${length + 2 * path} × ${width + 2 * path}) − (${length} × ${width}) = ${answer} m².`, `পথের ক্ষেত্রফল = (${length + 2 * path} × ${width + 2 * path}) − (${length} × ${width}) = ${answer} বর্গমিটার।`),
    ],
    shortcut: T('Area of outside path = outer rectangle area − garden area.', 'বাইরের পথের ক্ষেত্রফল = বাইরের আয়তক্ষেত্রের ক্ষেত্রফল − বাগানের ক্ষেত্রফল।'),
  });
}

function pastAgeRatioAndDifference() {
  let youngerRatio = ri(1, 4);
  let olderRatio = ri(youngerRatio + 1, 7);
  while (gcd(youngerRatio, olderRatio) !== 1) {
    youngerRatio = ri(1, 4);
    olderRatio = ri(youngerRatio + 1, 7);
  }
  const yearsAgo = ri(2, 8);
  const factor = ri(3, 12);
  const youngerThen = youngerRatio * factor;
  const olderThen = olderRatio * factor;
  const difference = olderThen - youngerThen;
  const answer = (olderThen + yearsAgo) + (youngerThen + yearsAgo);
  const options = numOptions(answer, unit('years', 'বছর'), [
    hint(olderThen + youngerThen, 'That is their age sum then; add the elapsed years for both people.', 'এটি তখনকার বয়সের যোগফল; দুজনের জন্য অতিবাহিত বছর যোগ করো।'),
  ]);
  return build({
    topic: 'ages', subtopic: 'past_ratio_and_difference', tags: ['ages', 'ratio'],
    difficulty: 3, time: 55,
    stem: T(
      `${yearsAgo} years ago, the ages of A and B were in the ratio ${olderRatio} : ${youngerRatio}. A was ${difference} years older than B. What is the sum of their present ages?`,
      `${yearsAgo} বছর আগে A ও B-এর বয়সের অনুপাত ছিল ${olderRatio} : ${youngerRatio}। A, B-এর চেয়ে ${difference} বছর বড় ছিল। বর্তমানে তাদের বয়সের যোগফল কত?`,
    ),
    ...options,
    steps: [
      T(`Difference in ratio parts = ${olderRatio} − ${youngerRatio} = ${olderRatio - youngerRatio}; one part = ${difference} ÷ ${olderRatio - youngerRatio} = ${factor}.`, `অনুপাতের পদের পার্থক্য = ${olderRatio} − ${youngerRatio} = ${olderRatio - youngerRatio}; এক ভাগ = ${difference} ÷ ${olderRatio - youngerRatio} = ${factor}।`),
      T(`Their ages then totalled ${olderThen} + ${youngerThen} = ${olderThen + youngerThen}; present total = ${olderThen + youngerThen} + 2 × ${yearsAgo} = ${answer} years.`, `তখন বয়সের যোগফল ছিল ${olderThen} + ${youngerThen} = ${olderThen + youngerThen}; বর্তমানে = ${olderThen + youngerThen} + 2 × ${yearsAgo} = ${answer} বছর।`),
    ],
    shortcut: T('Use the age difference to find one ratio part, then add twice the elapsed years.', 'বয়সের পার্থক্য দিয়ে অনুপাতের এক ভাগ বের করে অতিবাহিত বছরের দ্বিগুণ যোগ করো।'),
  });
}

module.exports = {
  subject: 'quant',
  topics: [
    { topic: 'percentage', weight: 1, gens: [pctSuccessivePrice] },
    { topic: 'average', weight: 1, gens: [averageReplacement] },
    { topic: 'ratio_proportion', weight: 1, gens: [ratioFourthProportional] },
    { topic: 'interest', weight: 1, gens: [simpleInterestPrincipal] },
    { topic: 'number_system', weight: 1, gens: [smallestAdditionForDivisibility] },
    { topic: 'time_speed_distance', weight: 1, gens: [trainCrossingTrain] },
    { topic: 'algebra', weight: 1, gens: [linearEquationWithBrackets] },
    { topic: 'mensuration', weight: 1, gens: [outsidePathArea] },
    { topic: 'ages', weight: 1, gens: [pastAgeRatioAndDifference] },
  ],
};
