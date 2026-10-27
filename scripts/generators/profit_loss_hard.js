'use strict';

const { seed, pick, T, n2, numOptions, build } = require('./common');
const { registry } = require('../../db/patterns/quant/profit_loss');
const { questionDuplicateKeys } = require('../../src/utils/questionDuplicateKeys');

const money = (v) => T(`₹${n2(v)}`, `₹${n2(v)}`);
const percent = (v) => T(`${n2(v)}%`, `${n2(v)}%`);
const outcome = (v) => v >= 0 ? T(`${n2(v)}% profit`, `${n2(v)}% লাভ`) : T(`${n2(-v)}% loss`, `${n2(-v)}% ক্ষতি`);

function q(id, { stem, answer, format = percent, hints = [], steps, shortcut, time = 75 }) {
  const pattern = registry.find((item) => item.id === id);
  if (!pattern) throw new Error(`Unknown Profit & Loss pattern: ${id}`);
  const choices = numOptions(answer, format, hints, { neg: true });
  if (choices.wrong.length !== 3) return null;
  const question = build({
    topic: 'profit_loss',
    subtopic: id,
    pattern: id,
    tags: pattern.concepts,
    difficulty: pattern.difficulty,
    time,
    stem,
    ...choices,
    steps,
    shortcut,
  });
  if (!question) return null;
  const answerText = format(answer).en;
  const correct = question.options.filter((option) => option.oid === question.correct_option_id);
  if (correct.length !== 1 || correct[0].text.en !== answerText) return null;
  const [fingerprint] = questionDuplicateKeys({ en: question.stem.en });
  return { ...question, fingerprint, _audit: { answer, answerText } };
}

const gens = {
  mixed_sales: () => {
    const n = pick([10, 12, 15, 20]);
    const soldAtGain = pick([4, 5, 6, 8]);
    const gain = pick([20, 25, 30]);
    const loss = pick([10, 15, 20]);
    const net = ((soldAtGain * gain) - ((n - soldAtGain) * loss)) / n;
    return q('mixed_sales', {
      stem: T(
        `A trader buys ${n} identical articles at the same cost per article. He sells ${soldAtGain} at a ${gain}% profit and the rest at a ${loss}% loss. What is his overall result?`,
        `একজন ব্যবসায়ী একই ক্রয়মূল্যে ${n}টি একই রকম জিনিস কেনেন। তিনি ${soldAtGain}টি ${gain}% লাভে এবং বাকিগুলি ${loss}% ক্ষতিতে বিক্রি করেন। মোট লাভ বা ক্ষতি কত শতাংশ?`,
      ),
      answer: net,
      format: outcome,
      hints: [
        [gain - loss, 'Subtracting the rates ignores the different quantities.', 'বিক্রির সংখ্যা আলাদা হলেও শুধু শতকরা হার বিয়োগ করা হয়েছে।'],
        [(soldAtGain * gain + (n - soldAtGain) * loss) / n, 'Both parts were treated as profits.', 'দুই অংশকেই লাভ হিসেবে ধরা হয়েছে।'],
      ],
      steps: [
        T(`Let each article cost ₹100. Total CP = ${n} × 100 = ₹${n * 100}.`, `প্রতিটি জিনিসের CP ₹100 ধরি। মোট CP = ${n} × 100 = ₹${n * 100}।`),
        T(`SP = ${soldAtGain} × 100 × ${100 + gain}/100 + ${n - soldAtGain} × 100 × ${100 - loss}/100 = ₹${n * 100 + (soldAtGain * gain) - ((n - soldAtGain) * loss)}.`, `মোট SP = ${soldAtGain} × 100 × ${100 + gain}/100 + ${n - soldAtGain} × 100 × ${100 - loss}/100 = ₹${n * 100 + (soldAtGain * gain) - ((n - soldAtGain) * loss)}।`),
        T(`Net result = (total SP − total CP) / total CP × 100 = ${n2(net)}%.`, `মোট ফল = (মোট SP − মোট CP) / মোট CP × 100 = ${n2(net)}%।`),
      ],
      shortcut: T('With equal CP per article, use the quantity-weighted average of the profit/loss rates.', 'প্রতিটি জিনিসের CP সমান হলে লাভ-ক্ষতির হারকে বিক্রির সংখ্যা দিয়ে ওজনযুক্ত গড় নাও।'),
    });
  },
  markup_discounts: () => {
    const markup = pick([40, 50, 60]);
    const first = pick([10, 20, 25]);
    const second = pick([5, 10, 20]);
    const net = ((100 + markup) * (100 - first) * (100 - second)) / 10000 - 100;
    return q('markup_discounts', {
      stem: T(
        `A shopkeeper marks an article ${markup}% above CP and gives successive discounts of ${first}% and ${second}%. Find the final profit or loss percent.`,
        `একজন দোকানদার একটি জিনিসের ধার্যমূল্য CP-এর চেয়ে ${markup}% বেশি রাখেন এবং পরপর ${first}% ও ${second}% ছাড় দেন। শেষ পর্যন্ত লাভ বা ক্ষতি কত শতাংশ?`,
      ),
      answer: net,
      format: outcome,
      hints: [
        [markup - first - second, 'Successive discounts do not add directly.', 'পরপর ছাড়ের হার সরাসরি বিয়োগ করা যায় না।'],
        [markup - first, 'The second discount was ignored.', 'দ্বিতীয় ছাড়টি হিসাব করা হয়নি।'],
      ],
      steps: [
        T('Take CP = ₹100; then MP = ₹100 + markup.', 'CP = ₹100 ধরলে MP = ₹100 + মার্কআপ।'),
        T(`After the discounts, SP = ${100 + markup} × ${100 - first}/100 × ${100 - second}/100 = ₹${n2(100 + net)}.`, `দুটি ছাড়ের পর SP = ${100 + markup} × ${100 - first}/100 × ${100 - second}/100 = ₹${n2(100 + net)}।`),
        T(`Compare this SP with CP ₹100: net result = ${n2(net)}%.`, `এই SP-কে CP ₹100-এর সঙ্গে তুলনা করলে মোট ফল = ${n2(net)}%।`),
      ],
      shortcut: T('Multiply the three factors: (1 + markup/100)(1 − first/100)(1 − second/100).', 'তিনটি গুণক গুণ করো: (1 + মার্কআপ/100)(1 − প্রথম ছাড়/100)(1 − দ্বিতীয় ছাড়/100)।'),
    });
  },
  successive_discounts: () => {
    const markup = 50;
    const first = 20;
    const targetProfit = pick([5, 8, 10, 15]);
    const priceAfterFirst = (100 + markup) * (100 - first) / 100;
    const second = 100 - ((100 + targetProfit) * 100) / priceAfterFirst;
    return q('successive_discounts', {
      stem: T(
        `An article is marked ${markup}% above CP. After a ${first}% discount, what further discount will leave the seller with exactly ${targetProfit}% profit?`,
        `একটি জিনিসের MP, CP-এর চেয়ে ${markup}% বেশি। ${first}% ছাড় দেওয়ার পর ঠিক ${targetProfit}% লাভ রাখতে আরও কত শতাংশ ছাড় দিতে হবে?`,
      ),
      answer: second,
      format: percent,
      hints: [
        [100 - targetProfit, 'The required further discount is on the reduced price, not on the original MP.', 'আরও ছাড়টি কমে যাওয়া দামের উপর, মূল MP-এর উপর নয়।'],
        [100 - ((100 + targetProfit) / (100 + markup)) * 100, 'This finds a single total discount rather than the additional discount.', 'এতে অতিরিক্ত ছাড় নয়, মোট ছাড়ের হার বের করা হয়েছে।'],
      ],
      steps: [
        T('Assume CP = 100, so MP = 100 + markup.', 'CP = 100 ধরলে MP = 100 + মার্কআপ।'),
        T(`After ${first}% off, price = ${100 + markup} × ${100 - first}/100 = ${n2(priceAfterFirst)}. Target SP = ${100 + targetProfit}.`, `${first}% ছাড়ের পর দাম = ${100 + markup} × ${100 - first}/100 = ${n2(priceAfterFirst)}। লক্ষ্য SP = ${100 + targetProfit}।`),
        T(`Further discount = (${n2(priceAfterFirst)} − ${100 + targetProfit}) / ${n2(priceAfterFirst)} × 100 = ${n2(second)}%.`, `আরও ছাড় = (${n2(priceAfterFirst)} − ${100 + targetProfit}) / ${n2(priceAfterFirst)} × 100 = ${n2(second)}%।`),
      ],
      shortcut: T('Further discount = 1 − (target SP ÷ price after the first discount).', 'আরও ছাড় = 1 − (লক্ষ্য SP ÷ প্রথম ছাড়ের পরের দাম)।'),
    });
  },
  same_sp_rates: () => {
    const sp = pick([240, 300, 360, 480]);
    const gain = pick([20, 25, 50]);
    const loss = pick([10, 20, 25]);
    const cp1 = sp * 100 / (100 + gain);
    const cp2 = sp * 100 / (100 - loss);
    const net = ((2 * sp - cp1 - cp2) / (cp1 + cp2)) * 100;
    return q('same_sp_rates', {
      stem: T(
        `Two articles are sold for ₹${sp} each. One is sold at a ${gain}% profit and the other at a ${loss}% loss. Find the overall profit or loss percent.`,
        `দুটি জিনিসই ₹${sp} দরে বিক্রি করা হয়। একটিতে ${gain}% লাভ এবং অন্যটিতে ${loss}% ক্ষতি হয়। মোট লাভ বা ক্ষতি কত শতাংশ?`,
      ),
      answer: net,
      format: outcome,
      hints: [
        [(gain - loss) / 2, 'Averaging the two rates ignores their different cost prices.', 'দুটি হারের গড় নিলে ভিন্ন CP-এর প্রভাব বাদ পড়ে।'],
        [gain - loss, 'The percentages cannot be subtracted directly.', 'শতকরা হার সরাসরি বিয়োগ করা যায় না।'],
      ],
      steps: [
        T(`First CP = ${sp} × 100/${100 + gain} = ₹${n2(cp1)}; second CP = ${sp} × 100/${100 - loss} = ₹${n2(cp2)}.`, `প্রথম CP = ${sp} × 100/${100 + gain} = ₹${n2(cp1)}; দ্বিতীয় CP = ${sp} × 100/${100 - loss} = ₹${n2(cp2)}।`),
        T(`Total CP = ₹${n2(cp1 + cp2)} and total SP = ₹${2 * sp}.`, `মোট CP = ₹${n2(cp1 + cp2)} এবং মোট SP = ₹${2 * sp}।`),
        T(`Overall result = (total SP − total CP) / total CP × 100 = ${n2(net)}%.`, `মোট ফল = (মোট SP − মোট CP) / মোট CP × 100 = ${n2(net)}%।`),
      ],
      shortcut: T('Convert each rate back to its own CP first; calculate the combined result on total CP.', 'প্রথমে প্রতিটি হারের জন্য আলাদা CP বের করো; তারপর মোট CP-এর উপর সম্মিলিত ফল হিসাব করো।'),
    });
  },
  same_cp_rates: () => {
    const cp = pick([200, 300, 400, 600]);
    const p1 = pick([15, 20, 25, 30]);
    const p2 = pick([10, 15, 20]);
    const loss = pick([10, 15, 20, 25]);
    const count = pick([2, 3, 4]);
    const net = (2 * p1 + p2 - loss * (count - 1)) / (count + 2);
    return q('same_cp_rates', {
      stem: T(
        `A trader buys ${2 + count} articles at ₹${cp} each. He sells two at ${p1}% profit, one at ${p2}% profit, and the remaining ${count - 1} at ${loss}% loss. Find the overall result.`,
        `একজন ব্যবসায়ী ${2 + count}টি জিনিস প্রতিটি ₹${cp} দরে কেনেন। দুটি ${p1}% লাভে, একটি ${p2}% লাভে এবং বাকি ${count - 1}টি ${loss}% ক্ষতিতে বিক্রি করেন। মোট ফল কত শতাংশ?`,
      ),
      answer: net,
      format: outcome,
      hints: [
        [(p1 + p2 - loss) / 3, 'The quantities in the three groups were ignored.', 'তিনটি দলে জিনিসের সংখ্যা বিবেচনা করা হয়নি।'],
        [(p1 + p2 - loss * count) / 3, 'The loss group was divided by the wrong total quantity.', 'ক্ষতির দলের সংখ্যা দিয়ে হিসাবের ভিত্তি ভুল হয়েছে।'],
      ],
      steps: [
        T(`Total CP = ${2 + count} × ₹${cp} = ₹${(2 + count) * cp}.`, `মোট CP = ${2 + count} × ₹${cp} = ₹${(2 + count) * cp}।`),
        T(`Net percentage-points across equal CP items = 2 × ${p1} + ${p2} − ${count - 1} × ${loss} = ${n2(2 * p1 + p2 - loss * (count - 1))}.`, `সমান CP-র জিনিসগুলির মোট শতকরা পয়েন্ট = 2 × ${p1} + ${p2} − ${count - 1} × ${loss} = ${n2(2 * p1 + p2 - loss * (count - 1))}।`),
        T(`Divide by ${count + 2}: overall result = ${n2(net)}%.`, `${count + 2} দিয়ে ভাগ করলে মোট ফল = ${n2(net)}%।`),
      ],
      shortcut: T('With equal CP, weight each percentage by the number of articles in that group.', 'CP সমান হলে প্রতিটি দলের শতকরা হারকে সেই দলের জিনিসের সংখ্যা দিয়ে ওজন দাও।'),
    });
  },
  false_weight_discount: () => {
    const trueGrams = 1000;
    const delivered = pick([800, 900, 920]);
    const cpPerKg = pick([100, 200, 250]);
    const discount = pick([10, 20]);
    const mp = cpPerKg * 1.5;
    const sp = mp * (100 - discount) / 100;
    const actualCp = cpPerKg * delivered / trueGrams;
    const net = (sp - actualCp) / actualCp * 100;
    return q('false_weight_discount', {
      stem: T(
        `A dealer buys goods at ₹${cpPerKg} per kg, marks a 1 kg packet at ₹${mp}, and gives ${discount}% discount. But he supplies only ${delivered} g. Find his actual profit percent.`,
        `একজন ব্যবসায়ী প্রতি কেজি ₹${cpPerKg} দরে পণ্য কেনেন, ১ কেজির প্যাকেটের দাম ₹${mp} লেখেন এবং ${discount}% ছাড় দেন। কিন্তু তিনি দেন মাত্র ${delivered} গ্রাম। তাঁর প্রকৃত লাভ কত শতাংশ?`,
      ),
      answer: net,
      format: percent,
      hints: [
        [(mp * (100 - discount) / 100 - cpPerKg) / cpPerKg * 100, 'This assumes the full kilogram was supplied.', 'এতে পুরো এক কেজি পণ্য দেওয়া হয়েছে বলে ধরা হয়েছে।'],
        [(mp - cpPerKg) / cpPerKg * 100, 'The discount and short weight were both ignored.', 'ছাড় ও কম ওজন—দুটিই বাদ পড়েছে।'],
      ],
      steps: [
        T(`Net SP after discount = ₹${mp} × ${100 - discount}/100 = ₹${n2(sp)}.`, `ছাড়ের পর নেট SP = ₹${mp} × ${100 - discount}/100 = ₹${n2(sp)}।`),
        T(`Actual CP of ${delivered} g = ₹${cpPerKg} × ${delivered}/1000 = ₹${n2(actualCp)}.`, `${delivered} গ্রামের প্রকৃত CP = ₹${cpPerKg} × ${delivered}/1000 = ₹${n2(actualCp)}।`),
        T(`Actual profit percent = (${n2(sp)} − ${n2(actualCp)}) / ${n2(actualCp)} × 100 = ${n2(net)}%.`, `প্রকৃত লাভ = (${n2(sp)} − ${n2(actualCp)}) / ${n2(actualCp)} × 100 = ${n2(net)}%।`),
      ],
      shortcut: T('Compare the amount received with the cost of the quantity actually delivered, not the labelled quantity.', 'লেবেলে লেখা পরিমাণ নয়, বাস্তবে দেওয়া পরিমাণের ক্রয়মূল্যের সঙ্গে প্রাপ্ত টাকা তুলনা করো।'),
    });
  },
  articles_ratio: () => {
    const buy = pick([12, 15, 18, 20]);
    const sell = buy - pick([2, 3, 4, 5]);
    const profit = ((buy - sell) / sell) * 100;
    return q('articles_ratio', {
      stem: T(
        `The CP of ${buy} articles equals the SP of ${sell} articles. If the articles have the same unit CP and unit SP, what is the gain percent?`,
        `${buy}টি জিনিসের CP, ${sell}টি জিনিসের SP-এর সমান। প্রতিটি জিনিসের CP ও SP একই হলে লাভের হার কত শতাংশ?`,
      ),
      answer: profit,
      format: outcome,
      hints: [
        [((buy - sell) / buy) * 100, 'The percentage base is the cost of the sold articles, so divide by sell, not buy.', 'শতকরা ভিত্তি হল বিক্রি হওয়া জিনিসগুলির CP; তাই buy নয়, sell দিয়ে ভাগ করতে হবে।'],
        [(buy - sell) / sell, 'The ratio was not multiplied by 100 to convert it to a percentage.', 'অনুপাতটিকে শতকরায় বদলাতে 100 দিয়ে গুণ করা হয়নি।'],
      ],
      steps: [
        T(`Let CP per article = ₹1. Then CP of ${buy} articles = ₹${buy}, equal to SP of ${sell} articles.`, `প্রতিটির CP ₹1 ধরি। তাহলে ${buy}টির CP = ₹${buy}, যা ${sell}টির SP-এর সমান।`),
        T(`SP per article = ₹${buy}/${sell}; profit per article = ${buy}/${sell} − 1 = ${(buy - sell)}/${sell}.`, `প্রতিটির SP = ₹${buy}/${sell}; প্রতি জিনিসে লাভ = ${buy}/${sell} − 1 = ${(buy - sell)}/${sell}।`),
        T(`Gain percent = (profit per article / CP per article) × 100 = ${n2(profit)}%.`, `শতকরা লাভ = (প্রতি জিনিসে লাভ / প্রতি জিনিসের CP) × 100 = ${n2(profit)}%।`),
      ],
      shortcut: T('Use the stated CP:SP ratio for the sold units, then add the full cost of unsold units to total CP.', 'বিক্রি হওয়া এককগুলির CP:SP অনুপাত নাও, তারপর অবিক্রীত জিনিসের সম্পূর্ণ খরচ মোট CP-তে যোগ করো।'),
    });
  },
  reverse_conditions: () => {
    const mp = pick([1200, 1500, 1800, 2400]);
    const firstDiscount = pick([10, 20, 25]);
    const firstProfit = pick([20, 25, 50]);
    const secondDiscount = pick([20, 30, 40].filter((discount) => discount !== firstDiscount));
    const cp = mp * (100 - firstDiscount) / (100 + firstProfit);
    const secondSp = mp * (100 - secondDiscount) / 100;
    const net = (secondSp - cp) / cp * 100;
    return q('reverse_conditions', {
      stem: T(
        `An article marked at ₹${mp} is sold after a ${firstDiscount}% discount at a ${firstProfit}% profit. If the discount were instead ${secondDiscount}%, what would the profit/loss percent be on the same CP?`,
        `₹${mp} ধার্যমূল্যের একটি জিনিস ${firstDiscount}% ছাড়ে বিক্রি করে ${firstProfit}% লাভ হয়। একই CP-তে ছাড় ${secondDiscount}% হলে লাভ বা ক্ষতি কত শতাংশ হতো?`,
      ),
      answer: net,
      format: outcome,
      hints: [
        [firstProfit + firstDiscount - secondDiscount, 'The first sale condition must be used to recover CP before applying the new discount.', 'নতুন ছাড় বসানোর আগে প্রথম শর্ত থেকে CP বের করতে হবে।'],
        [((100 - secondDiscount) - (100 + firstProfit)) / (100 + firstProfit) * 100, 'This compares percentages on MP and CP as if their bases were the same.', 'এতে MP ও CP-এর উপর শতকরা হিসাবকে একই ভিত্তির বলে ধরা হয়েছে।'],
      ],
      steps: [
        T(`First SP = ₹${mp} × ${100 - firstDiscount}/100 = ₹${n2(mp * (100 - firstDiscount) / 100)}.`, `প্রথম SP = ₹${mp} × ${100 - firstDiscount}/100 = ₹${n2(mp * (100 - firstDiscount) / 100)}।`),
        T(`That SP is ${100 + firstProfit}% of CP, so CP = ₹${n2(cp)}.`, `এই SP হল CP-এর ${100 + firstProfit}%, তাই CP = ₹${n2(cp)}।`),
        T(`New SP = ₹${mp} × ${100 - secondDiscount}/100 = ₹${n2(secondSp)}; compare with CP to get ${n2(net)}%.`, `নতুন SP = ₹${mp} × ${100 - secondDiscount}/100 = ₹${n2(secondSp)}; CP-এর সঙ্গে তুলনা করলে ${n2(net)}% হয়।`),
      ],
      shortcut: T('Recover CP by dividing the first SP by its profit multiplier; then apply the alternative discount.', 'প্রথম SP-কে লাভের গুণক দিয়ে ভাগ করে CP বের করো; তারপর বিকল্প ছাড় প্রয়োগ করো।'),
    });
  },
  combined_articles: () => {
    const count = pick([8, 10, 12, 15]);
    const cp = pick([100, 200, 250, 400]);
    const secondCp = cp * 2;
    const firstCount = Math.floor(count / 2);
    const p1 = pick([20, 25, 30]);
    const p2 = pick([10, 15, 20]);
    const totalCp = firstCount * cp + (count - firstCount) * secondCp;
    const sp = firstCount * cp * (100 + p1) / 100 + (count - firstCount) * secondCp * (100 - p2) / 100;
    const net = (sp - totalCp) / totalCp * 100;
    return q('combined_articles', {
      stem: T(
        `A shopkeeper buys ${firstCount} articles at ₹${cp} each and ${count - firstCount} articles at ₹${secondCp} each. He sells the two batches at ${p1}% profit and ${p2}% loss respectively. Find the combined result.`,
        `একজন দোকানদার ${firstCount}টি জিনিস প্রতিটি ₹${cp} দরে এবং ${count - firstCount}টি প্রতিটি ₹${secondCp} দরে কেনেন। দুই দলকে যথাক্রমে ${p1}% লাভে ও ${p2}% ক্ষতিতে বিক্রি করেন। মোট ফল কত?`,
      ),
      answer: net,
      format: outcome,
      hints: [
        [(p1 - p2) / 2, 'This treats each group as having equal total CP.', 'এতে দুই দলের মোট CP সমান বলে ধরা হয়েছে।'],
        [p1 - p2, 'The two rates were subtracted without weighting by their different costs.', 'ভিন্ন CP-র ওজন না ধরে দুটি হার সরাসরি বিয়োগ হয়েছে।'],
      ],
      steps: [
        T(`Total CP = ${firstCount} × ₹${cp} + ${count - firstCount} × ₹${secondCp} = ₹${totalCp}.`, `মোট CP = ${firstCount} × ₹${cp} + ${count - firstCount} × ₹${secondCp} = ₹${totalCp}।`),
        T(`Total SP = ${firstCount} × ${cp} × ${100 + p1}/100 + ${count - firstCount} × ${secondCp} × ${100 - p2}/100 = ₹${n2(sp)}.`, `মোট SP = ${firstCount} × ${cp} × ${100 + p1}/100 + ${count - firstCount} × ${secondCp} × ${100 - p2}/100 = ₹${n2(sp)}।`),
        T(`Combined result = (${n2(sp)} − ${totalCp}) / ${totalCp} × 100 = ${n2(net)}%.`, `মোট ফল = (${n2(sp)} − ${totalCp}) / ${totalCp} × 100 = ${n2(net)}%।`),
      ],
      shortcut: T('Add all selling prices first, then compare once against the aggregate cost price.', 'প্রথমে সব বিক্রয়মূল্য যোগ করো, তারপর মোট ক্রয়মূল্যের সঙ্গে একবার তুলনা করো।'),
    });
  },
  expenses: () => {
    const cp = pick([800, 1000, 1200, 1500]);
    const expensePct = pick([5, 10, 15]);
    const markup = pick([30, 40, 50]);
    const discount = pick([10, 20, 25]);
    const totalCost = cp * (100 + expensePct) / 100;
    const mp = cp * (100 + markup) / 100;
    const sp = mp * (100 - discount) / 100;
    const net = (sp - totalCost) / totalCost * 100;
    return q('expenses', {
      stem: T(
        `A trader buys an article for ₹${cp}, pays transport equal to ${expensePct}% of CP, marks it ${markup}% above CP, then gives a ${discount}% discount on MP. Find the actual profit/loss percent after transport.`,
        `একজন ব্যবসায়ী ₹${cp}-এ একটি জিনিস কিনে CP-এর ${expensePct}% পরিবহন খরচ দেন, CP-এর চেয়ে ${markup}% বেশি MP রাখেন এবং MP-তে ${discount}% ছাড় দেন। পরিবহন খরচ ধরার পর প্রকৃত লাভ বা ক্ষতি কত শতাংশ?`,
      ),
      answer: net,
      format: outcome,
      hints: [
        [markup - discount - expensePct, 'The discount is on MP, while transport is part of the cost base.', 'ছাড় MP-এর উপর, আর পরিবহন খরচ মোট CP-এর অংশ।'],
        [(mp - totalCost) / totalCost * 100, 'The marked price was used as the final selling price without taking off the discount.', 'MP-কে ছাড় না কেটে শেষ বিক্রয়মূল্য ধরা হয়েছে।'],
      ],
      steps: [
        T(`Total cost = ₹${cp} + ${expensePct}% of ₹${cp} = ₹${n2(totalCost)}.`, `মোট খরচ = ₹${cp} + ₹${cp}-এর ${expensePct}% = ₹${n2(totalCost)}।`),
        T(`MP = ₹${cp} × ${100 + markup}/100 = ₹${n2(mp)}; discounted SP = ₹${n2(mp)} × ${100 - discount}/100 = ₹${n2(sp)}.`, `MP = ₹${cp} × ${100 + markup}/100 = ₹${n2(mp)}; ছাড়ের পর SP = ₹${n2(mp)} × ${100 - discount}/100 = ₹${n2(sp)}।`),
        T(`Profit/loss percent uses total cost (including transport): (${n2(sp)} − ${n2(totalCost)}) / ${n2(totalCost)} × 100 = ${n2(net)}%.`, `লাভ-ক্ষতির শতকরা মোট খরচের (পরিবহনসহ) উপর: (${n2(sp)} − ${n2(totalCost)}) / ${n2(totalCost)} × 100 = ${n2(net)}%।`),
      ],
      shortcut: T('Count transport in the effective CP before measuring profit; discounts apply to MP, not CP.', 'লাভ হিসাবের আগে পরিবহন খরচ কার্যকর CP-তে যোগ করো; ছাড় MP-এর উপর, CP-এর উপর নয়।'),
    });
  },
  target_price: () => {
    const cp = pick([600, 800, 1000, 1200]);
    const expense = pick([5, 10, 15]);
    const profit = pick([20, 25, 30]);
    const discount = pick([10, 20, 25]);
    const cost = cp * (100 + expense) / 100;
    const sp = cost * (100 + profit) / 100;
    const mp = sp * 100 / (100 - discount);
    return q('target_price', {
      stem: T(
        `An article costs ₹${cp}; additional expenses are ${expense}% of CP. What MP should be set so that after a ${discount}% discount the seller still earns ${profit}% on total cost?`,
        `একটি জিনিসের CP ₹${cp}; অতিরিক্ত খরচ CP-এর ${expense}%। ${discount}% ছাড় দেওয়ার পর মোট খরচে ${profit}% লাভ রাখতে MP কত ধার্য করতে হবে?`,
      ),
      answer: mp,
      format: money,
      hints: [
        [cp * (100 + profit) / 10000, 'This ignores both additional expenses and the discount.', 'এতে অতিরিক্ত খরচ ও ছাড়—দুটিই বাদ পড়েছে।'],
        [sp, 'This is the required selling price, not the marked price before discount.', 'এটি ছাড়ের পর দরকারি SP, ছাড়ের আগের MP নয়।'],
      ],
      steps: [
        T(`Total cost = ₹${cp} × ${100 + expense}/100 = ₹${n2(cost)}.`, `মোট খরচ = ₹${cp} × ${100 + expense}/100 = ₹${n2(cost)}।`),
        T(`Required SP = ₹${n2(cost)} × ${100 + profit}/100 = ₹${n2(sp)}.`, `প্রয়োজনীয় SP = ₹${n2(cost)} × ${100 + profit}/100 = ₹${n2(sp)}।`),
        T(`After a ${discount}% discount, SP is ${100 - discount}% of MP; therefore MP = ₹${n2(sp)} × 100/${100 - discount} = ₹${n2(mp)}.`, `${discount}% ছাড়ের পর SP হল MP-এর ${100 - discount}%; তাই MP = ₹${n2(sp)} × 100/${100 - discount} = ₹${n2(mp)}।`),
      ],
      shortcut: T('Work backwards: total cost → target SP → divide by the retained-price percentage to get MP.', 'উল্টো পথে হিসাব করো: মোট খরচ → লক্ষ্য SP → অবশিষ্ট দামের শতকরা দিয়ে ভাগ করে MP।'),
    });
  },
  price_changes: () => {
    const initialCp = 1000;
    const initialProfit = pick([20, 25, 30]);
    const cpChange = pick([10, 20, 25]);
    const spChange = pick([5, 10, 20]);
    const discount = pick([5, 10, 20]);
    const newCp = initialCp * (100 + cpChange) / 100;
    const newSp = initialCp * (100 + initialProfit) / 100 * (100 + spChange) / 100 * (100 - discount) / 100;
    const net = (newSp - newCp) / newCp * 100;
    return q('price_changes', {
      stem: T(
        `A trader originally sells an article at ${initialProfit}% profit. CP then rises by ${cpChange}%, while its old SP is increased by ${spChange}% and a ${discount}% discount is offered on the new price. Find the new profit/loss percent.`,
        `একজন ব্যবসায়ী প্রথমে ${initialProfit}% লাভে জিনিস বিক্রি করেন। পরে CP ${cpChange}% বাড়ে; পুরনো SP ${spChange}% বাড়িয়ে নতুন দামে ${discount}% ছাড় দেওয়া হয়। নতুন লাভ বা ক্ষতি কত শতাংশ?`,
      ),
      answer: net,
      format: outcome,
      hints: [
        [initialProfit + spChange - discount - cpChange, 'Price-change rates compound and use different bases.', 'দামের পরিবর্তনের হারগুলি পরপর প্রয়োগ হয় এবং তাদের ভিত্তি আলাদা।'],
        [initialProfit - cpChange, 'The SP increase and discount were ignored.', 'SP বৃদ্ধি ও ছাড় হিসাব করা হয়নি।'],
      ],
      steps: [
        T(`Let old CP = ₹100. Old SP = ₹${100 + initialProfit}.`, `পুরনো CP = ₹100 ধরলে পুরনো SP = ₹${100 + initialProfit}।`),
        T(`New CP = ₹${100 + cpChange}; new SP = ₹${100 + initialProfit} × ${100 + spChange}/100 × ${100 - discount}/100 = ₹${n2(newSp / 10)} on this scale.`, `নতুন CP = ₹${100 + cpChange}; নতুন SP = ₹${100 + initialProfit} × ${100 + spChange}/100 × ${100 - discount}/100 = এই স্কেলে ₹${n2(newSp / 10)}।`),
        T(`New result = (new SP − new CP) / new CP × 100 = ${n2(net)}%.`, `নতুন ফল = (নতুন SP − নতুন CP) / নতুন CP × 100 = ${n2(net)}%।`),
      ],
      shortcut: T('Express each changed price as a multiplier, then compare the final SP multiplier to the new CP multiplier.', 'প্রতিটি পরিবর্তিত দামকে গুণক হিসেবে লেখো, তারপর শেষ SP-র গুণককে নতুন CP-র গুণকের সঙ্গে তুলনা করো।'),
    });
  },
  ratio_based: () => {
    const ratio = pick([[2, 3], [3, 5], [4, 5], [5, 7]]);
    const [a, b] = ratio;
    const p = pick([20, 25, 30]);
    const loss = pick([10, 15, 20]);
    const net = (a * p - b * loss) / (a + b);
    return q('ratio_based', {
      stem: T(
        `The total CP of two groups of articles is in the ratio ${a}:${b}. The first group is sold at ${p}% profit and the second at ${loss}% loss. Find the overall result percent.`,
        `দুটি দলে থাকা জিনিসের মোট CP-এর অনুপাত ${a}:${b}। প্রথম দল ${p}% লাভে এবং দ্বিতীয় দল ${loss}% ক্ষতিতে বিক্রি হয়। মোট লাভ বা ক্ষতি কত শতাংশ?`,
      ),
      answer: net,
      format: outcome,
      hints: [
        [(p - loss) / 2, 'An unweighted average is wrong because the group cost totals differ.', 'দুই দলের মোট CP আলাদা, তাই সাধারণ গড় ভুল।'],
        [a * p / (a + b), 'The loss on the second group was omitted.', 'দ্বিতীয় দলের ক্ষতি বাদ পড়েছে।'],
      ],
      steps: [
        T(`Assume group CPs are ₹${a * 100} and ₹${b * 100}; total CP = ₹${(a + b) * 100}.`, `দুই দলের CP যথাক্রমে ₹${a * 100} ও ₹${b * 100} ধরলে মোট CP = ₹${(a + b) * 100}।`),
        T(`Net amount = ${a * 100} × ${p}/100 − ${b * 100} × ${loss}/100 = ₹${n2(a * p - b * loss)}.`, `নেট টাকা = ${a * 100} × ${p}/100 − ${b * 100} × ${loss}/100 = ₹${n2(a * p - b * loss)}।`),
        T(`Overall result = ${n2(a * p - b * loss)} / ${100 * (a + b)} × 100 = ${n2(net)}%.`, `মোট ফল = ${n2(a * p - b * loss)} / ${100 * (a + b)} × 100 = ${n2(net)}%।`),
      ],
      shortcut: T('Weight each rate by its group’s share of total CP, not by the number of groups.', 'প্রতিটি হারকে মোট CP-তে দলের অংশ দিয়ে ওজন দাও, দলের সংখ্যা দিয়ে নয়।'),
    });
  },
  algebraic: () => {
    const cp = pick([50, 75, 100, 125]);
    const profitRate = 2 * cp;
    const sp = cp + cp * profitRate / 100;
    return q('algebraic', {
      stem: T(
        `An article is sold for ₹${sp}. The numerical profit percentage is twice its CP in rupees. Find the CP.`,
        `একটি জিনিস ₹${sp}-এ বিক্রি করা হলো। লাভের শতকরা হার সংখ্যামানে টাকায় CP-এর দ্বিগুণ। CP কত?`,
      ),
      answer: cp,
      format: money,
      hints: [
        [sp - sp * sp / 100, 'The profit percent is based on CP, not SP.', 'লাভের শতকরা SP নয়, CP-এর উপর হিসাব হয়।'],
        [sp / 2, 'The percentage value and rupee cost are related by an equation, not a 50–50 split.', 'শতকরা হার ও টাকার CP সমীকরণে যুক্ত, অর্ধেক ভাগে নয়।'],
      ],
      steps: [
        T(`Let CP = x rupees. The profit rate is 2x%, so profit = 2x% of x = x²/50.`, `CP = x টাকা ধরি। লাভের হার 2x%, তাই লাভ = x-এর 2x% = x²/50 টাকা।`),
        T(`SP = x + x²/50 = ${sp}; hence x² + 50x − ${sp * 50} = 0.`, `SP = x + x²/50 = ${sp}; তাই x² + 50x − ${sp * 50} = 0।`),
        T(`Factor: (x − ${cp})(x + ${cp + 50}) = 0. Reject the negative root; CP = ₹${cp}. Check: ${cp} + ${profitRate}% of ${cp} = ${sp}.`, `বিশ্লেষণ: (x − ${cp})(x + ${cp + 50}) = 0। ঋণাত্মক মূল বাদ দিলে CP = ₹${cp}। যাচাই: ${cp}-এর ${profitRate}% লাভ যোগ করলে ${sp} হয়।`),
      ],
      shortcut: T(`Use the quadratic: x² + 50x − 50 × SP = 0; the positive root is ${cp}.`, `দ্বিঘাত সমীকরণ x² + 50x − 50 × SP = 0 ব্যবহার করো; ধনাত্মক মূল ${cp}।`),
    });
  },
  multi_condition: () => {
    const cp = 500;
    const markup = 50;
    const firstDiscount = 20;
    const secondDiscount = 10;
    const expense = 8;
    const extraDiscount = pick([5, 10, 15]);
    const mp = cp * (100 + markup) / 100;
    const sp = mp * (100 - firstDiscount) / 100 * (100 - secondDiscount) / 100 * (100 - extraDiscount) / 100;
    const totalCost = cp + expense;
    const net = (sp - totalCost) / totalCost * 100;
    return q('multi_condition', {
      stem: T(
        `A shopkeeper buys an article for ₹${cp}, pays ₹${expense} delivery, marks it ${markup}% above CP, then gives successive discounts of ${firstDiscount}% and ${secondDiscount}%. A further ${extraDiscount}% cash discount is applied to the reduced price. Find the final result on total cost.`,
        `একজন দোকানদার ₹${cp}-এ জিনিস কিনে ₹${expense} পরিবহন খরচ দেন। CP-এর চেয়ে ${markup}% বেশি MP রেখে পরপর ${firstDiscount}% ও ${secondDiscount}% ছাড় দেন। কমে যাওয়া দামে আরও ${extraDiscount}% নগদ ছাড় দিলে মোট খরচের উপর শেষ ফল কত?`,
      ),
      answer: net,
      format: outcome,
      hints: [
        [markup - firstDiscount - secondDiscount - extraDiscount, 'Discounts compound; delivery also changes the cost base.', 'ছাড়গুলি পরপর প্রয়োগ হয়; পরিবহন খরচও CP-এর ভিত্তি বদলায়।'],
        [((100 + markup) * (100 - firstDiscount - secondDiscount - extraDiscount) / 100) - 100, 'Each discount must be applied to the current reduced price.', 'প্রতিটি ছাড় তখনকার কমে যাওয়া দামের উপর প্রয়োগ করতে হবে।'],
      ],
      steps: [
        T(`Total cost = ₹${cp} + ₹${expense} = ₹${totalCost}; MP = ₹${mp}.`, `মোট খরচ = ₹${cp} + ₹${expense} = ₹${totalCost}; MP = ₹${mp}।`),
        T(`Final SP = ₹${mp} × ${100 - firstDiscount}/100 × ${100 - secondDiscount}/100 × ${100 - extraDiscount}/100 = ₹${n2(sp)}.`, `শেষ SP = ₹${mp} × ${100 - firstDiscount}/100 × ${100 - secondDiscount}/100 × ${100 - extraDiscount}/100 = ₹${n2(sp)}।`),
        T(`Compare with total cost ₹${totalCost}: result = (${n2(sp)} − ${totalCost}) / ${totalCost} × 100 = ${n2(net)}%.`, `মোট খরচ ₹${totalCost}-এর সঙ্গে তুলনা করলে ফল = (${n2(sp)} − ${totalCost}) / ${totalCost} × 100 = ${n2(net)}%।`),
      ],
      shortcut: T('Keep one price chain for MP → each successive discount, and a separate total-cost base including expenses.', 'MP থেকে পরপর প্রতিটি ছাড়ের জন্য একটিই দামের শৃঙ্খল রাখো; খরচের ভিত্তিতে অতিরিক্ত খরচ আলাদা যোগ করো।'),
    });
  },
};

function validateQuestion(question) {
  const errors = [];
  if (!question || !question.stem?.en || !question.stem?.bn) errors.push('English and Bengali stems are required');
  if (!/[ঀ-৿]/u.test(question?.stem?.bn || '')) errors.push('Bengali stem must contain Bengali script');
  if (question?.options?.length !== 4) errors.push('exactly four options are required');
  const englishOptions = question?.options?.map((option) => option.text.en) || [];
  const bengaliOptions = question?.options?.map((option) => option.text.bn) || [];
  if (new Set(englishOptions).size !== 4 || new Set(bengaliOptions).size !== 4) errors.push('options must be distinct in both languages');
  if (question && question.options.filter((option) => option.oid === question.correct_option_id).length !== 1) errors.push('correct answer must map to exactly one option');
  if (!question?.solution?.steps?.length || question.solution.steps.length < 3) errors.push('at least three solution steps are required');
  if (question?.solution?.steps?.some((step) => !step.en || !step.bn || !/[ঀ-৿]/u.test(step.bn))) errors.push('every solution step needs a Bengali translation');
  if (!question?.solution?.shortcut?.en || !question.solution.shortcut.bn) errors.push('a bilingual shortcut is required');
  return errors;
}

function generateQuestions(count = 100, { seed: seedValue = 20261027, knownFingerprints = [] } = {}) {
  if (!Number.isInteger(count) || count < 1) throw new TypeError('count must be a positive integer');
  seed(seedValue);
  const known = new Set(knownFingerprints);
  const questions = [];
  let attempts = 0;
  while (questions.length < count && attempts < count * 100) {
    const pattern = registry[attempts % registry.length];
    attempts += 1;
    const question = gens[pattern.id]?.();
    if (!question || known.has(question.fingerprint)) continue;
    const errors = validateQuestion(question);
    if (errors.length) throw new Error(`${pattern.id}: ${errors.join('; ')}`);
    known.add(question.fingerprint);
    questions.push(question);
  }
  if (questions.length !== count) throw new Error(`Could generate only ${questions.length}/${count} unique Profit & Loss questions`);
  return questions;
}

module.exports = { generateQuestions, validateQuestion, registry, generators: gens };
