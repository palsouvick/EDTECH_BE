'use strict';

// Question patterns: Percentage. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'percentage',
  patterns: [
    // 1 ─────────────────────────────────────────────
    {
      key: 'percent_of_number',
      emoji: '🎯',
      name: t('Find x% of a number', 'কোনো সংখ্যার x% নির্ণয়'),
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“What is x% of N?” or “Find x% of N.”', '“N-এর x% কত?” বা “N-এর x% নির্ণয় করো।”'),
      formula: t(r`$x\%$ of $N = \frac{x}{100} \times N$.`, r`$N$-এর $x\% = \frac{x}{100} \times N$।`),
      shortcut: t('Use a fraction equivalent when one fits (25% = 1/4, 20% = 1/5), or swap: x% of y equals y% of x, whichever is easier.', 'ভগ্নাংশ রূপ মিললে তা ব্যবহার করো (25% = 1/4, 20% = 1/5), অথবা অদলবদল করো: y-এর x% মানেই x-এর y%, যেটা সহজ সেটাই নাও।'),
      trap: t('A slipped decimal point gives an answer 10 or 100 times too big or small; sanity-check the size first.', 'দশমিক বিন্দু সরে গেলে উত্তর 10 বা 100 গুণ বড় বা ছোট হয়ে যায়; আগে আকারটা যুক্তি দিয়ে মিলিয়ে দেখো।'),
      spot: t(
        'The question gives a percentage and a number and asks "what is x% of ...?" or "find x% of ...".',
        'প্রশ্নে একটা শতকরা আর একটা সংখ্যা দেওয়া থাকে, আর জানতে চায় "...-এর x% কত?"।',
      ),
      method: [
        t(r`Write x% as the fraction $\frac{x}{100}$.`, r`x%-কে ভগ্নাংশে লেখো: $\frac{x}{100}$।`),
        t('Multiply the number by this fraction.', 'সংখ্যাটিকে এই ভগ্নাংশ দিয়ে গুণ করো।'),
        t('Cancel first, then multiply: the numbers stay small.', 'আগে কাটাকাটি করো, তারপর গুণ — সংখ্যাগুলো ছোট থাকবে।'),
      ],
      example: {
        question: t('What is 35% of 640?', '640-এর 35% কত?'),
        steps: [
          t(r`35% of 640 $= \frac{35}{100} \times 640$.`, r`640-এর 35% $= \frac{35}{100} \times 640$।`),
          t(r`$\frac{640}{100} = 6.4$, so we need $6.4 \times 35$.`, r`$\frac{640}{100} = 6.4$, তাই আমাদের দরকার $6.4 \times 35$।`),
          t(r`$6.4 \times 35 = 224$.`, r`তাহলে $6.4 \times 35 = 224$।`),
        ],
        answer: t('224', 'উত্তর: 224'),
      },
      tryIt: {
        question: t('What is 45% of 360?', '360-এর 45% কত?'),
        options: [t('16.2', '16.2'), t('198', '198'), t('162', '162'), t('1620', '1620')],
        correct: 2,
        explanation: [
          t(r`45% of 360 $= \frac{45}{100} \times 360$.`, r`360-এর 45% $= \frac{45}{100} \times 360$।`),
          t(r`$\frac{360}{100} = 3.6$ and $3.6 \times 45 = 162$.`, r`$\frac{360}{100} = 3.6$ এবং $3.6 \times 45 = 162$।`),
          t('Careful: 16.2 or 1620 means the decimal point slipped; 198 is 55% (100 − 45), not 45%.', 'সাবধান: 16.2 বা 1620 এলে দশমিক বিন্দু ভুল জায়গায় বসেছে; 198 হল 55% (100 − 45), 45% নয়।'),
        ],
      },
    },

    // 2 ─────────────────────────────────────────────
    {
      key: 'more_than_less_than',
      emoji: '⚖️',
      name: t('A is x% more than B, so B is ?% less than A', 'A, B-এর চেয়ে x% বেশি, তাহলে B, A-এর চেয়ে কত % কম?'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“A is x% more than B. By what percent is B less than A?” (or the reverse).', '“A, B-এর চেয়ে x% বেশি। B, A-এর চেয়ে শতকরা কত কম?” (বা উল্টোটা)।'),
      formula: t(r`A is $x\%$ more than B $\Rightarrow$ B is less by $\frac{x}{100+x} \times 100\%$; A is $x\%$ less $\Rightarrow$ B is more by $\frac{x}{100-x} \times 100\%$.`, r`A, B-এর চেয়ে $x\%$ বেশি $\Rightarrow$ B কম $\frac{x}{100+x} \times 100\%$; A $x\%$ কম $\Rightarrow$ B বেশি $\frac{x}{100-x} \times 100\%$।`),
      shortcut: t('Set the compared-with quantity to 100, write the other as 100 plus or minus x, then divide the difference by the new base.', 'যার সঙ্গে তুলনা করা হচ্ছে তাকে 100 ধরো, অন্যটিকে 100 যোগ বা বিয়োগ x লেখো, তারপর পার্থক্যকে নতুন ভিত্তি দিয়ে ভাগ করো।'),
      trap: t('The reverse percentage is never x% itself, because the base changes when the comparison reverses.', 'উল্টো শতকরা কখনও x% হয় না, কারণ তুলনা উল্টালে ভিত্তি বদলে যায়।'),
      spot: t(
        'One quantity is given as "x% more (or less) than" another, and the question asks the same comparison the other way round.',
        'একটা রাশি অন্যটির চেয়ে "x% বেশি (বা কম)" বলা থাকে, আর প্রশ্নে উল্টো দিক থেকে তুলনাটা জানতে চায়।',
      ),
      method: [
        t('Take B = 100 (the one we compare with). Then A = 100 + x (or 100 − x).', 'যার সঙ্গে তুলনা করা হচ্ছে সেই B = 100 ধরো। তাহলে A = 100 + x (বা 100 − x)।'),
        t('The difference is still x, but now divide it by the **new base** (A).', 'পার্থক্য সেই x-ই, কিন্তু এবার ভাগ করো **নতুন ভিত্তি** (A) দিয়ে।'),
        t(r`If A is x% more: B is less by $\frac{x}{100 + x} \times 100\%$. If A is x% less: B is more by $\frac{x}{100 - x} \times 100\%$.`, r`A যদি x% বেশি হয়: B কম $\frac{x}{100 + x} \times 100\%$। A যদি x% কম হয়: B বেশি $\frac{x}{100 - x} \times 100\%$।`),
      ],
      example: {
        question: t(`Ram's income is 25% more than Shyam's. By what percent is Shyam's income less than Ram's?`, 'রামের আয় শ্যামের আয়ের চেয়ে 25% বেশি। শ্যামের আয় রামের আয়ের চেয়ে শতকরা কত কম?'),
        steps: [
          t(`Let Shyam's income = 100. Then Ram's = 125.`, 'ধরো শ্যামের আয় = 100। তাহলে রামের আয় = 125।'),
          t('Difference = 125 − 100 = 25. Now compare with Ram (125), not 100.', 'পার্থক্য = 125 − 100 = 25। এবার তুলনা রামের (125) সঙ্গে, 100-এর সঙ্গে নয়।'),
          t(r`$\frac{25}{125} \times 100 = 20\%$.`, r`শতকরা হিসাবে: $\frac{25}{125} \times 100 = 20\%$।`),
        ],
        answer: t(`Shyam's income is 20% less than Ram's.`, 'শ্যামের আয় রামের চেয়ে 20% কম।'),
      },
      tryIt: {
        question: t(`A's salary is 25% less than B's. By what percent is B's salary more than A's?`, 'A-এর বেতন B-এর বেতনের চেয়ে 25% কম। B-এর বেতন A-এর বেতনের চেয়ে শতকরা কত বেশি?'),
        options: [t('25%', '25%'), t(r`$33\frac{1}{3}\%$`, r`$33\frac{1}{3}\%$`), t('20%', '20%'), t('75%', '75%')],
        correct: 1,
        explanation: [
          t('Let B = 100. Then A = 75. The difference is 25.', 'ধরো B = 100। তাহলে A = 75। পার্থক্য 25।'),
          t(r`Compare with A (75): $\frac{25}{75} \times 100 = 33\frac{1}{3}\%$.`, r`A-এর (75) সঙ্গে তুলনা করো: $\frac{25}{75} \times 100 = 33\frac{1}{3}\%$।`),
          t('25% is the trap: the base has changed from B to A.', '25% হল ফাঁদ: ভিত্তি B থেকে বদলে A হয়ে গেছে।'),
        ],
      },
    },

    // 3 ─────────────────────────────────────────────
    {
      key: 'successive_change',
      emoji: '🔁',
      name: t('Successive percentage change', 'পরপর শতকরা পরিবর্তন'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“First increased by a%, then decreased by b%. What is the net change?”', '“প্রথমে a% বাড়ল, তারপর b% কমল। মোট পরিবর্তন কত?”'),
      formula: t(r`Net change $= a + b + \frac{ab}{100}\%$, with increase positive and decrease negative.`, r`মোট পরিবর্তন $= a + b + \frac{ab}{100}\%$, যেখানে বৃদ্ধি ধনাত্মক ও হ্রাস ঋণাত্মক।`),
      shortcut: t('Multiply the factors instead: start from 100, apply each factor (1 plus or minus rate over 100) in turn, and read the final value against 100.', 'বরং গুণকগুলো গুণ করো: 100 থেকে শুরু করে প্রতিটি গুণক (1 যোগ বা বিয়োগ হার ভাগ 100) পরপর প্রয়োগ করো, শেষ মান 100-এর সঙ্গে মেলাও।'),
      trap: t('Never just add or subtract the two percentages; the second change acts on the already-changed value.', 'দুটি শতকরা কখনও শুধু যোগ বা বিয়োগ কোরো না; দ্বিতীয় পরিবর্তন বদলে যাওয়া মানের উপর হয়।'),
      spot: t(
        'A value changes two times one after the other: "first increased by a%, then decreased by b%". The question asks the net (overall) change.',
        'একটা মান পরপর দুবার বদলায়: "প্রথমে a% বাড়ল, তারপর b% কমল"। প্রশ্নে মোট (নিট) পরিবর্তন জানতে চায়।',
      ),
      method: [
        t('Write an increase as +a and a decrease as −b.', 'বৃদ্ধিকে +a আর হ্রাসকে −b লেখো।'),
        t(r`Net change $= a + b + \frac{a \times b}{100}\%$ (use the signs!).`, r`মোট পরিবর্তন $= a + b + \frac{a \times b}{100}\%$ (চিহ্নসহ বসাও!)।`),
        t('A plus answer means increase, a minus answer means decrease. You can also check by starting from 100.', 'উত্তর ধনাত্মক হলে বৃদ্ধি, ঋণাত্মক হলে হ্রাস। 100 থেকে শুরু করে মিলিয়েও দেখতে পারো।'),
      ],
      example: {
        question: t('The price of a shirt is increased by 20% and then decreased by 10%. What is the net change?', 'একটা জামার দাম প্রথমে 20% বাড়ানো হল, তারপর 10% কমানো হল। মোট পরিবর্তন কত?'),
        steps: [
          t('Here a = +20 and b = −10.', 'এখানে a = +20 এবং b = −10।'),
          t(r`Net $= 20 - 10 + \frac{20 \times (-10)}{100} = 10 - 2 = 8\%$.`, r`মোট $= 20 - 10 + \frac{20 \times (-10)}{100} = 10 - 2 = 8\%$।`),
          t('Check: 100 → 120 → 120 − 12 = 108. Up by 8.', 'মিলিয়ে দেখো: 100 → 120 → 120 − 12 = 108। অর্থাৎ 8 বাড়ল।'),
        ],
        answer: t('8% increase', '8% বৃদ্ধি'),
      },
      tryIt: {
        question: t('A number is first increased by 30% and then decreased by 20%. What is the net change?', 'একটা সংখ্যাকে প্রথমে 30% বাড়ানো হল, তারপর 20% কমানো হল। মোট পরিবর্তন কত?'),
        options: [t('10% increase', '10% বৃদ্ধি'), t('4% decrease', '4% হ্রাস'), t('6% decrease', '6% হ্রাস'), t('4% increase', '4% বৃদ্ধি')],
        correct: 3,
        explanation: [
          t(r`Net $= 30 - 20 + \frac{30 \times (-20)}{100} = 10 - 6 = 4\%$.`, r`মোট $= 30 - 20 + \frac{30 \times (-20)}{100} = 10 - 6 = 4\%$।`),
          t('It is plus, so it is a 4% increase. Check: 100 → 130 → 130 − 26 = 104.', 'ধনাত্মক, তাই 4% বৃদ্ধি। মিলিয়ে দেখো: 100 → 130 → 130 − 26 = 104।'),
          t('Just doing 30 − 20 = 10% forgets that the 20% is taken on the bigger number 130.', 'শুধু 30 − 20 = 10% করলে ভুল হয়, কারণ 20% কমেছে বড় সংখ্যা 130-এর উপর।'),
        ],
      },
    },

    // 4 ─────────────────────────────────────────────
    {
      key: 'original_value',
      emoji: '⏪',
      name: t('Find the original value after a % increase or decrease', 'শতকরা বৃদ্ধি বা হ্রাসের পর আসল মান নির্ণয়'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“After an x% increase (or decrease), the value became V. Find the original value.”', '“x% বৃদ্ধির (বা হ্রাসের) পর মান হল V। আসল মান কত?”'),
      formula: t(r`Original $= V \times \frac{100}{100+x}$ after an increase, and $V \times \frac{100}{100-x}$ after a decrease.`, r`বৃদ্ধির পর আসল মান $= V \times \frac{100}{100+x}$, হ্রাসের পর $= V \times \frac{100}{100-x}$।`),
      shortcut: t('Think in parts: V stands for 100 plus or minus x parts, so one part is V divided by that, and the original is 100 parts.', 'অংশে ভাবো: V হল 100 যোগ বা বিয়োগ x অংশ, তাই এক অংশ হল V ভাগ ওই সংখ্যা, আর আসল মান 100 অংশ।'),
      trap: t('Do not add or subtract x% of the new value; that percentage is taken on the wrong base.', 'নতুন মানের x% যোগ বা বিয়োগ কোরো না; ওই শতকরা ভুল ভিত্তির উপর হিসাব হয়।'),
      spot: t(
        'The question gives the value **after** a change ("after a 25% rise it became ...") and asks what it was **before**.',
        'প্রশ্নে পরিবর্তনের **পরের** মান দেওয়া থাকে ("25% বাড়ার পর হল ...") আর জানতে চায় **আগে** কত ছিল।',
      ),
      method: [
        t('Take the original as 100. After x% increase it is 100 + x; after x% decrease it is 100 − x.', 'আসল মান 100 ধরো। x% বাড়লে হয় 100 + x; x% কমলে হয় 100 − x।'),
        t(r`Original $= \text{new value} \times \frac{100}{100 \pm x}$.`, r`আসল মান $= \text{নতুন মান} \times \frac{100}{100 \pm x}$।`),
        t('Never just add or subtract x% of the new value: that uses the wrong base.', 'নতুন মানের x% যোগ বা বিয়োগ কোরো না — তাতে ভিত্তি ভুল হয়।'),
      ],
      example: {
        question: t(`After a 25% increase, Mina's salary became ₹15000. What was her salary before?`, '25% বাড়ার পর মিনার বেতন হল ₹15000। আগে তার বেতন কত ছিল?'),
        steps: [
          t('Old salary = 100 parts, new salary = 125 parts.', 'আগের বেতন = 100 ভাগ, নতুন বেতন = 125 ভাগ।'),
          t(r`Old $= 15000 \times \frac{100}{125} = 120 \times 100 = 12000$.`, r`আগের বেতন $= 15000 \times \frac{100}{125} = 120 \times 100 = 12000$।`),
          t('Check: 25% of 12000 = 3000, and 12000 + 3000 = 15000.', 'মিলিয়ে দেখো: 12000-এর 25% = 3000, আর 12000 + 3000 = 15000।'),
        ],
        answer: t('₹12000', 'আগের বেতন ছিল ₹12000'),
      },
      tryIt: {
        question: t('After a 20% discount, a bag costs ₹640. What was its price before the discount?', '20% ছাড়ের পর একটা ব্যাগের দাম ₹640। ছাড়ের আগে দাম কত ছিল?'),
        options: [t('₹800', '₹800'), t('₹768', '₹768'), t('₹512', '₹512'), t('₹533.33', '₹533.33')],
        correct: 0,
        explanation: [
          t('Old price = 100 parts, new price = 100 − 20 = 80 parts.', 'আগের দাম = 100 ভাগ, নতুন দাম = 100 − 20 = 80 ভাগ।'),
          t(r`Old price $= 640 \times \frac{100}{80} = 8 \times 100 = 800$.`, r`আগের দাম $= 640 \times \frac{100}{80} = 8 \times 100 = 800$।`),
          t('₹768 comes from adding 20% of 640 — wrong base. Check: 20% of 800 = 160 and 800 − 160 = 640.', '640-এর 20% যোগ করলে ₹768 আসে — ভিত্তি ভুল। মিলিয়ে দেখো: 800-এর 20% = 160 আর 800 − 160 = 640।'),
        ],
      },
    },

    // 5 ─────────────────────────────────────────────
    {
      key: 'price_consumption',
      emoji: '🛒',
      name: t('Price goes up: how much to cut consumption?', 'দাম বাড়লে খরচ ঠিক রাখতে ব্যবহার কত কমাতে হবে?'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“Price rises by x%. By what percent should consumption fall so that expenditure stays the same?”', '“দাম x% বাড়ল। খরচ একই রাখতে ব্যবহার শতকরা কত কমাতে হবে?”'),
      formula: t(r`Cut in consumption $= \frac{x}{100+x} \times 100\%$ when the price rises by $x\%$.`, r`দাম $x\%$ বাড়লে ব্যবহার কমাতে হবে $= \frac{x}{100+x} \times 100\%$।`),
      shortcut: t('It is the same shape as the reverse-comparison formula: the difference x is measured on the new price, 100 plus x.', 'এটি উল্টো তুলনার সূত্রের মতোই: পার্থক্য x মাপা হয় নতুন দাম 100 যোগ x-এর উপর।'),
      trap: t('Cutting consumption by the same x% is wrong; the cut is always smaller than the price rise.', 'ব্যবহার একই x% কমানো ভুল; কমানোর হার সবসময় দাম বৃদ্ধির হারের চেয়ে ছোট হয়।'),
      spot: t(
        'The price of something rises (or falls) by x%, and the question asks how much the use (consumption) must change so that the **spending stays the same**.',
        'কোনো জিনিসের দাম x% বাড়ে (বা কমে), আর জানতে চায় **খরচ একই রাখতে** ব্যবহার কতটা বদলাতে হবে।',
      ),
      method: [
        t('Spending = price × consumption. If spending stays the same, when price goes up, consumption must come down.', 'খরচ = দাম × ব্যবহার। খরচ একই থাকলে দাম বাড়লে ব্যবহার কমাতেই হবে।'),
        t(r`Price up by x%: cut consumption by $\frac{x}{100 + x} \times 100\%$.`, r`দাম x% বাড়লে: ব্যবহার কমাও $\frac{x}{100 + x} \times 100\%$।`),
        t(r`Price down by x%: consumption can go up by $\frac{x}{100 - x} \times 100\%$.`, r`দাম x% কমলে: ব্যবহার বাড়ানো যায় $\frac{x}{100 - x} \times 100\%$।`),
      ],
      example: {
        question: t('The price of sugar rises by 25%. By what percent should a family reduce its sugar use so that its spending on sugar does not change?', 'চিনির দাম 25% বাড়ল। চিনির খরচ একই রাখতে একটা পরিবারকে চিনির ব্যবহার শতকরা কত কমাতে হবে?'),
        steps: [
          t('Price goes up, so use must go down. Here x = 25.', 'দাম বেড়েছে, তাই ব্যবহার কমবে। এখানে x = 25।'),
          t(r`Cut $= \frac{25}{100 + 25} \times 100 = \frac{25}{125} \times 100 = 20\%$.`, r`কমাতে হবে $= \frac{25}{100 + 25} \times 100 = \frac{25}{125} \times 100 = 20\%$।`),
          t('Check: old price 100, use 100 → spend 10000. New price 125, use 80 → 125 × 80 = 10000. Same!', 'মিলিয়ে দেখো: আগের দাম 100, ব্যবহার 100 → খরচ 10000। নতুন দাম 125, ব্যবহার 80 → 125 × 80 = 10000। একই!'),
        ],
        answer: t('20%', 'ব্যবহার 20% কমাতে হবে'),
      },
      tryIt: {
        question: t('The price of petrol rises by 20%. By what percent must a driver reduce petrol use so that his spending on petrol stays the same?', 'পেট্রোলের দাম 20% বাড়ল। পেট্রোলের খরচ একই রাখতে একজন চালককে পেট্রোলের ব্যবহার শতকরা কত কমাতে হবে?'),
        options: [t('25%', '25%'), t(r`$16\frac{2}{3}\%$`, r`$16\frac{2}{3}\%$`), t('20%', '20%'), t('10%', '10%')],
        correct: 1,
        explanation: [
          t(r`Cut $= \frac{20}{100 + 20} \times 100 = \frac{20}{120} \times 100 = 16\frac{2}{3}\%$.`, r`কমাতে হবে $= \frac{20}{100 + 20} \times 100 = \frac{20}{120} \times 100 = 16\frac{2}{3}\%$।`),
          t('Not 20%: cutting by the same 20% would make the spending fall. 25% comes from wrongly dividing by 80.', '20% নয়: একই 20% কমালে খরচ কমে যাবে। ভুল করে 80 দিয়ে ভাগ করলে 25% আসে।'),
        ],
      },
    },
    {
      key: 'percentage_change',
      emoji: '📈',
      name: t('Percentage increase or decrease between two values', 'দুটি মানের মধ্যে শতকরা বৃদ্ধি বা হ্রাস'),
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“A value changes from A to B. Find the percentage increase (or decrease).”', '“একটি মান A থেকে B-তে বদলাল। শতকরা বৃদ্ধি (বা হ্রাস) নির্ণয় করো।”'),
      formula: t(r`Change\% $= \frac{\text{New} - \text{Old}}{\text{Old}} \times 100\%$.`, r`পরিবর্তন\% $= \frac{\text{নতুন} - \text{পুরোনো}}{\text{পুরোনো}} \times 100\%$।`),
      shortcut: t('Find the ratio New over Old first; subtract 1 and multiply by 100 to get the change in one move.', 'আগে নতুন ভাগ পুরোনো অনুপাত বের করো; 1 বিয়োগ করে 100 দিয়ে গুণ করলেই এক ধাপে পরিবর্তন পাওয়া যায়।'),
      trap: t('Always divide by the original value, never by the new value.', 'সবসময় প্রাথমিক মান দিয়ে ভাগ করো, নতুন মান দিয়ে কখনও নয়।'),
      spot: t(
        'An original value and a new value are both given, and you must express their difference as a percentage of the original.',
        'প্রাথমিক ও নতুন মান দেওয়া থাকে, এবং পার্থক্যকে প্রাথমিক মানের শতকরা হিসাবে প্রকাশ করতে হয়।',
      ),
      method: [
        t('Find the change = new value − original value.', 'পরিবর্তন = নতুন মান − প্রাথমিক মান নির্ণয় করো।'),
        t('Divide the change by the original value, not the new value.', 'পরিবর্তনকে নতুন মান দিয়ে নয়, প্রাথমিক মান দিয়ে ভাগ করো।'),
        t(r`Multiply by $100\%$. A positive result is an increase; a negative result is a decrease.`, r`$100\%$ দিয়ে গুণ করো। ধনাত্মক ফল বৃদ্ধি, ঋণাত্মক ফল হ্রাস বোঝায়।`),
      ],
      example: {
        question: t('A town’s population rises from 24,000 to 27,000. Find the percentage increase.', 'একটি শহরের জনসংখ্যা 24,000 থেকে বেড়ে 27,000 হলো। শতকরা বৃদ্ধি নির্ণয় করো।'),
        steps: [
          t('Increase = 27,000 − 24,000 = 3,000.', 'বৃদ্ধি = 27,000 − 24,000 = 3,000।'),
          t(r`Percentage increase $= \frac{3,000}{24,000} \times 100 = 12.5\%$.`, r`শতকরা বৃদ্ধি $= \frac{3,000}{24,000} \times 100 = 12.5\%$।`),
        ],
        answer: t('12.5% increase', '12.5% বৃদ্ধি'),
      },
      tryIt: {
        question: t('A machine’s value falls from ₹8,000 to ₹6,800. What is the percentage decrease?', 'একটি যন্ত্রের মূল্য ₹8,000 থেকে কমে ₹6,800 হলো। শতকরা হ্রাস কত?'),
        options: [t('12%', '12%'), t('15%', '15%'), t('17.65%', '17.65%'), t('20%', '20%')],
        correct: 1,
        explanation: [
          t('Decrease = ₹8,000 − ₹6,800 = ₹1,200.', 'হ্রাস = ₹8,000 − ₹6,800 = ₹1,200।'),
          t(r`Use the original value as the base: $\frac{1,200}{8,000} \times 100 = 15\%$.`, r`প্রাথমিক মানকে ভিত্তি ধরো: $\frac{1,200}{8,000} \times 100 = 15\%$।`),
        ],
      },
    },
    {
      key: 'find_whole_from_percent',
      emoji: '🧩',
      name: t('Find the whole when a percentage part is known', 'শতকরা অংশ জানা থাকলে সম্পূর্ণ মান নির্ণয়'),
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“P is x% of a number. Find the number (or the total).”', '“P হল একটি সংখ্যার x%। সংখ্যাটি (বা মোট) নির্ণয় করো।”'),
      formula: t(r`Whole $= \frac{\text{part} \times 100}{x}$.`, r`সম্পূর্ণ $= \frac{\text{অংশ} \times 100}{x}$।`),
      shortcut: t('Find 1% first by dividing the part by x, then multiply by 100 for the whole.', 'আগে অংশকে x দিয়ে ভাগ করে 1% বের করো, তারপর 100 দিয়ে গুণ করে সম্পূর্ণ পাও।'),
      trap: t('Do not take x% of the part again; the part is the result of the percentage, so the working must run in reverse.', 'অংশের আবার x% নিও না; অংশটাই শতকরার ফল, তাই হিসাব উল্টো দিকে চালাতে হবে।'),
      spot: t(
        'The question says that a number or amount is a stated percentage of a total, then asks for the total.',
        'কোনো সংখ্যা বা পরিমাণকে মোটের নির্দিষ্ট শতকরা বলা হয়, তারপর মোট পরিমাণ জানতে চাওয়া হয়।',
      ),
      method: [
        t('Write the given part as a fraction of the unknown whole.', 'প্রদত্ত অংশকে অজানা সম্পূর্ণের ভগ্নাংশ হিসাবে লেখো।'),
        t(r`Whole $= \frac{\text{part} \times 100}{\text{percentage}}$.`, r`সম্পূর্ণ $= \frac{\text{অংশ} \times 100}{\text{শতকরা হার}}$।`),
        t('Check by taking the stated percentage of your answer.', 'উত্তরের শতকরা অংশ বের করে মিলিয়ে দেখো।'),
      ],
      example: {
        question: t('₹720 is 30% of a family’s monthly savings. What are the total savings?', 'একটি পরিবারের মাসিক সঞ্চয়ের 30% হলো ₹720। মোট সঞ্চয় কত?'),
        steps: [
          t('30% of the total = ₹720.', 'মোট সঞ্চয়ের 30% = ₹720।'),
          t('Total = ₹720 × 100 ÷ 30 = ₹2,400.', 'মোট সঞ্চয় = ₹720 × 100 ÷ 30 = ₹2,400।'),
        ],
        answer: t('₹2,400', 'মোট সঞ্চয় ₹2,400।'),
      },
      tryIt: {
        question: t('45 students are 15% of all students in a school. How many students are there in total?', 'একটি বিদ্যালয়ের মোট শিক্ষার্থীর 15% হলো 45 জন। বিদ্যালয়ে মোট কতজন শিক্ষার্থী আছে?'),
        options: [t('300', '300'), t('675', '675'), t('270', '270'), t('450', '450')],
        correct: 0,
        explanation: [
          t('45 is the part and 15 is the percentage.', '45 হলো অংশ এবং 15 হলো শতকরা হার।'),
          t('Whole = 45 × 100 ÷ 15 = 300 students.', 'মোট = 45 × 100 ÷ 15 = 300 জন শিক্ষার্থী।'),
        ],
      },
    },
    {
      key: 'one_quantity_as_percent',
      emoji: '🔎',
      name: t('Express one quantity as a percentage of another', 'একটি পরিমাণ অন্যটির শতকরা হিসাবে প্রকাশ'),
      difficulty: 'beginner',
      typicalWording: t('“A is what percent of B?” or “What percent of B is A?”', '“A, B-এর কত শতাংশ?” বা “B-এর কত শতাংশ A?”'),
      formula: t(r`Percentage $= \frac{\text{part}}{\text{whole}} \times 100\%$, where the whole is the quantity after “of”.`, r`শতকরা $= \frac{\text{অংশ}}{\text{সম্পূর্ণ}} \times 100\%$, যেখানে সম্পূর্ণ হল “এর” কথার পরের রাশি।`),
      shortcut: t('Simplify the fraction part over whole first, then convert: a denominator of 4, 5, 8, 20 or 25 scales straight to 100.', 'আগে অংশ ভাগ সম্পূর্ণ ভগ্নাংশটি লঘিষ্ঠ করো, তারপর বদলাও: হর 4, 5, 8, 20 বা 25 হলে সরাসরি 100-তে নেওয়া যায়।'),
      trap: t('Reversing part and whole gives a different, wrong percentage; check which quantity follows “of”.', 'অংশ ও সম্পূর্ণ উল্টে দিলে আলাদা ভুল শতকরা আসে; “এর” পর কোন রাশি আছে তা দেখে নাও।'),
      spot: t(
        'The question asks “A is what percent of B?” Identify the part and the whole before dividing.',
        'প্রশ্নে “A, B-এর কত শতাংশ?” জানতে চায়। ভাগ করার আগে অংশ ও সম্পূর্ণ নির্দিষ্ট করো।',
      ),
      method: [
        t('The quantity being compared is the part; the quantity after “of” is the whole.', 'যার তুলনা করা হচ্ছে সেটি অংশ; “এর” কথাটির পরের পরিমাণটি সম্পূর্ণ।'),
        t(r`Percentage $= \frac{\text{part}}{\text{whole}} \times 100\%$.`, r`শতকরা $= \frac{\text{অংশ}}{\text{সম্পূর্ণ}} \times 100\%$।`),
        t('Keep the order: reversing the fraction changes the answer.', 'ক্রম ঠিক রাখো: ভগ্নাংশ উল্টে দিলে উত্তর বদলে যাবে।'),
      ],
      example: {
        question: t('36 is what percent of 240?', '36 হলো 240-এর কত শতাংশ?'),
        steps: [
          t('Part = 36 and whole = 240.', 'অংশ = 36 এবং সম্পূর্ণ = 240।'),
          t(r`Percentage $= \frac{36}{240} \times 100 = 15\%$.`, r`শতকরা $= \frac{36}{240} \times 100 = 15\%$।`),
        ],
        answer: t('15%', 'উত্তর 15%।'),
      },
      tryIt: {
        question: t('54 is what percent of 360?', '54 হলো 360-এর কত শতাংশ?'),
        options: [t('12%', '12%'), t('15%', '15%'), t('18%', '18%'), t('20%', '20%')],
        correct: 1,
        explanation: [
          t('Divide the part by the whole: 54 ÷ 360 = 0.15.', 'অংশকে সম্পূর্ণ দিয়ে ভাগ করো: 54 ÷ 360 = 0.15।'),
          t('Convert to a percentage: 0.15 × 100 = 15%.', 'শতকরায় বদলাও: 0.15 × 100 = 15%।'),
        ],
      },
    },
    {
      key: 'population_growth',
      emoji: '👥',
      name: t('Population growth over several years', 'কয়েক বছরে জনসংখ্যা বৃদ্ধি'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“The population is P and grows by r% every year. Find the population after n years.”', '“জনসংখ্যা P এবং প্রতি বছর r% বাড়ে। n বছর পরে জনসংখ্যা কত?”'),
      formula: t(r`Population after $n$ years $= P\left(1 + \frac{r}{100}\right)^{n}$.`, r`$n$ বছর পরে জনসংখ্যা $= P\left(1 + \frac{r}{100}\right)^{n}$।`),
      shortcut: t('For 2 years, the net growth is 2r plus r squared over 100 percent; apply that single rate to P when the numbers are small.', '2 বছরের জন্য মোট বৃদ্ধি হল 2r যোগ r-এর বর্গ ভাগ 100 শতাংশ; সংখ্যা ছোট হলে ওই এক হার P-তে প্রয়োগ করো।'),
      trap: t('Growth compounds: each year the rate acts on the grown population, not on the original P every time.', 'বৃদ্ধি চক্রবৃদ্ধি হয়: প্রতি বছর হার বেড়ে যাওয়া জনসংখ্যার উপর কাজ করে, প্রতিবার আসল P-এর উপর নয়।'),
      spot: t(
        'A population grows by the same percentage each year and its value after several years is requested.',
        'জনসংখ্যা প্রতি বছর একই শতকরা হারে বাড়ে এবং কয়েক বছর পরের জনসংখ্যা জানতে চায়।',
      ),
      method: [
        t('Convert the annual increase r% to a multiplier: (100 + r)/100.', 'বার্ষিক r% বৃদ্ধিকে গুণকে বদলাও: (100 + r)/100।'),
        t('Raise the multiplier to the number of years.', 'গুণকটিকে বছরের সংখ্যার ঘাতে উন্নীত করো।'),
        t('Multiply by the starting population; do not add r% repeatedly to the original.', 'প্রাথমিক জনসংখ্যা দিয়ে গুণ করো; একই r% বারবার প্রাথমিক মানে যোগ কোরো না।'),
      ],
      example: {
        question: t('A town has 20,000 people. If its population grows by 10% each year, what will it be after 2 years?', 'একটি শহরে 20,000 জন বাস করে। জনসংখ্যা প্রতি বছর 10% বাড়লে 2 বছর পরে কত হবে?'),
        steps: [
          t('After year 1: 20,000 × 1.10 = 22,000.', 'প্রথম বছরের পরে: 20,000 × 1.10 = 22,000।'),
          t('After year 2: 22,000 × 1.10 = 24,200.', 'দ্বিতীয় বছরের পরে: 22,000 × 1.10 = 24,200।'),
        ],
        answer: t('24,200 people', '24,200 জন'),
      },
      tryIt: {
        question: t('A village has 8,000 people. At 5% annual growth, what will its population be after 2 years?', 'একটি গ্রামে 8,000 জন বাস করে। বার্ষিক 5% বৃদ্ধিতে 2 বছর পরে জনসংখ্যা কত হবে?'),
        options: [t('8,800', '8,800'), t('8,820', '8,820'), t('8,400', '8,400'), t('8,840', '8,840')],
        correct: 1,
        explanation: [
          t('After year 1: 8,000 × 1.05 = 8,400.', 'প্রথম বছরের পরে: 8,000 × 1.05 = 8,400।'),
          t('After year 2: 8,400 × 1.05 = 8,820.', 'দ্বিতীয় বছরের পরে: 8,400 × 1.05 = 8,820।'),
        ],
      },
    },
    {
      key: 'depreciation',
      emoji: '📉',
      name: t('Repeated depreciation in value', 'বারবার শতকরা হারে মূল্যহ্রাস'),
      difficulty: 'intermediate',
      typicalWording: t('“A machine (or car) worth V depreciates by r% every year. Find its value after n years.”', '“V মূল্যের একটি যন্ত্রের (বা গাড়ির) প্রতি বছর r% মূল্যহ্রাস হয়। n বছর পরে মূল্য কত?”'),
      formula: t(r`Value after $n$ years $= V\left(1 - \frac{r}{100}\right)^{n}$.`, r`$n$ বছর পরে মূল্য $= V\left(1 - \frac{r}{100}\right)^{n}$।`),
      shortcut: t('Work with what remains: each year multiply by the remaining percent (100 minus r) over 100, e.g. 10% depreciation means multiply by 0.9.', 'অবশিষ্ট দিয়ে কাজ করো: প্রতি বছর (100 বিয়োগ r) ভাগ 100 দিয়ে গুণ করো, যেমন 10% মূল্যহ্রাস মানে 0.9 দিয়ে গুণ।'),
      trap: t('Two years at r% is not a total fall of 2r%; the second year acts on the reduced value.', 'দুই বছরে r% করে মোট হ্রাস 2r% নয়; দ্বিতীয় বছর কমে যাওয়া মূল্যের উপর হিসাব হয়।'),
      spot: t(
        'An asset, vehicle or machine loses the same percentage of its current value each year.',
        'কোনো সম্পদ, যানবাহন বা যন্ত্রের বর্তমান মূল্য থেকে প্রতি বছর একই শতকরা হারে কমে।',
      ),
      method: [
        t('A decrease of r% leaves (100 − r)% of the value.', 'r% কমলে মূল্যের (100 − r)% অবশিষ্ট থাকে।'),
        t('Use the multiplier (100 − r)/100 once for each year.', 'প্রতি বছরের জন্য (100 − r)/100 গুণকটি একবার করে ব্যবহার করো।'),
        t('Multiply the original value by the multiplier raised to the number of years.', 'প্রাথমিক মূল্যকে গুণকের বছর-সংখ্যা ঘাত দিয়ে গুণ করো।'),
      ],
      example: {
        question: t('A machine costs ₹50,000 and depreciates by 10% each year. What is its value after 2 years?', 'একটি যন্ত্রের দাম ₹50,000 এবং প্রতি বছর 10% মূল্যহ্রাস হয়। 2 বছর পরে এর মূল্য কত?'),
        steps: [
          t('After year 1: ₹50,000 × 0.90 = ₹45,000.', 'প্রথম বছরের পরে: ₹50,000 × 0.90 = ₹45,000।'),
          t('After year 2: ₹45,000 × 0.90 = ₹40,500.', 'দ্বিতীয় বছরের পরে: ₹45,000 × 0.90 = ₹40,500।'),
        ],
        answer: t('₹40,500', 'যন্ত্রটির মূল্য ₹40,500।'),
      },
      tryIt: {
        question: t('A car is worth ₹4,00,000 and depreciates by 20% each year. What is it worth after 2 years?', 'একটি গাড়ির মূল্য ₹4,00,000 এবং প্রতি বছর 20% কমে। 2 বছর পরে গাড়িটির মূল্য কত?'),
        options: [t('₹2,40,000', '₹2,40,000'), t('₹2,56,000', '₹2,56,000'), t('₹3,20,000', '₹3,20,000'), t('₹2,80,000', '₹2,80,000')],
        correct: 1,
        explanation: [
          t('After year 1: ₹4,00,000 × 0.80 = ₹3,20,000.', 'প্রথম বছরের পরে: ₹4,00,000 × 0.80 = ₹3,20,000।'),
          t('After year 2: ₹3,20,000 × 0.80 = ₹2,56,000.', 'দ্বিতীয় বছরের পরে: ₹3,20,000 × 0.80 = ₹2,56,000।'),
        ],
      },
    },
    {
      key: 'exam_pass_marks',
      emoji: '🎓',
      name: t('Find total marks from pass-mark conditions', 'পাস নম্বরের শর্ত থেকে মোট নম্বর নির্ণয়'),
      difficulty: 'advanced',
      typicalWording: t('“A scores a% and fails by m marks; B scores b% and passes by n marks. Find the total marks.”', '“A a% পেয়ে m নম্বরে ফেল করে; B b% পেয়ে n নম্বর বেশি পায়। মোট নম্বর কত?”'),
      formula: t(r`Total marks $= \frac{(m+n) \times 100}{b-a}$, where $a$ and $b$ are the two percentages.`, r`মোট নম্বর $= \frac{(m+n) \times 100}{b-a}$, যেখানে $a$ ও $b$ দুটি শতকরা নম্বর।`),
      shortcut: t('The percentage gap between the two scores equals the mark gap across the pass mark, so one division gives the total directly.', 'দুটি নম্বরের শতকরা ব্যবধান পাস নম্বরের দুই পাশের নম্বর ব্যবধানের সমান, তাই একবার ভাগেই মোট পাওয়া যায়।'),
      trap: t('Add m and n, never subtract them: one student is below the pass mark and the other is above it.', 'm ও n যোগ করো, কখনও বিয়োগ কোরো না: একজন পাস নম্বরের নিচে, অন্যজন উপরে।'),
      spot: t(
        'Two candidates score different percentages; one fails by a stated number of marks and another passes by a stated number.',
        'দুই পরীক্ষার্থী ভিন্ন শতকরা নম্বর পায়; একজন নির্দিষ্ট নম্বরে ফেল করে এবং অন্যজন নির্দিষ্ট নম্বরে পাস করে।',
      ),
      method: [
        t('Find the difference between the two percentages.', 'দুটি শতকরা নম্বরের পার্থক্য নির্ণয় করো।'),
        t('That percentage difference of the total equals the sum of the marks below and above the pass mark.', 'মোট নম্বরের ওই শতকরা পার্থক্য পাস নম্বরের নিচে ও উপরে থাকা নম্বরের যোগফলের সমান।'),
        t('Total marks = combined mark difference × 100 ÷ percentage difference.', 'মোট নম্বর = নম্বরের মোট পার্থক্য × 100 ÷ শতকরা পার্থক্য।'),
      ],
      example: {
        question: t('A scores 30% and fails by 12 marks. B scores 40% and gets 8 marks above the pass mark. Find the total marks.', 'A 30% পেয়ে 12 নম্বরে ফেল করে। B 40% পেয়ে পাস নম্বরের চেয়ে 8 নম্বর বেশি পায়। মোট নম্বর কত?'),
        steps: [
          t('The score gap is 40% − 30% = 10% of the total; the mark gap is 12 + 8 = 20.', 'নম্বরের ব্যবধান = মোটের 40% − 30% = 10%; নম্বরের ব্যবধান 12 + 8 = 20।'),
          t('10% of total = 20, so total = 20 × 100 ÷ 10 = 200 marks.', 'মোটের 10% = 20, তাই মোট = 20 × 100 ÷ 10 = 200 নম্বর।'),
        ],
        answer: t('200 marks', '200 নম্বর'),
      },
      tryIt: {
        question: t('A gets 25% and fails by 15 marks. B gets 40% and scores 15 marks above the pass mark. Find the total marks.', 'A 25% পেয়ে 15 নম্বরে ফেল করে। B 40% পেয়ে পাস নম্বরের চেয়ে 15 নম্বর বেশি পায়। মোট নম্বর কত?'),
        options: [t('150', '150'), t('200', '200'), t('250', '250'), t('300', '300')],
        correct: 1,
        explanation: [
          t('The score gap is 40% − 25% = 15%; the mark gap is 15 + 15 = 30.', 'শতকরা ব্যবধান = 40% − 25% = 15%; নম্বরের ব্যবধান = 15 + 15 = 30।'),
          t('Total = 30 × 100 ÷ 15 = 200 marks.', 'মোট = 30 × 100 ÷ 15 = 200 নম্বর।'),
        ],
      },
    },
    {
      key: 'marks_percentage',
      emoji: '📝',
      name: t('Calculate an exam percentage from marks', 'প্রাপ্ত নম্বর থেকে পরীক্ষার শতকরা নির্ণয়'),
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“A student scores M marks out of N. What is the percentage?”', '“একজন শিক্ষার্থী N-এর মধ্যে M নম্বর পেয়েছে। শতকরা নম্বর কত?”'),
      formula: t(r`Percentage $= \frac{\text{marks obtained}}{\text{maximum marks}} \times 100\%$.`, r`শতকরা $= \frac{\text{প্রাপ্ত নম্বর}}{\text{পূর্ণমান}} \times 100\%$।`),
      shortcut: t('Simplify obtained over maximum first (420 over 600 is 7 over 10), then read it as a percent in one step.', 'আগে প্রাপ্ত ভাগ পূর্ণমান লঘিষ্ঠ করো (600-এর মধ্যে 420 হল 10 ভাগের 7), তারপর এক ধাপে শতকরায় পড়ো।'),
      trap: t('With several papers, total both the obtained marks and the maximum marks before dividing.', 'একাধিক পত্র থাকলে ভাগ করার আগে প্রাপ্ত নম্বর ও পূর্ণমান দুটোই যোগ করো।'),
      spot: t(
        'Marks obtained and maximum marks are given; convert the score to a percentage.',
        'প্রাপ্ত নম্বর ও পূর্ণমান দেওয়া থাকে; নম্বরকে শতকরায় রূপান্তর করতে হয়।',
      ),
      method: [
        t('Add the marks obtained if there are multiple papers.', 'একাধিক পত্র থাকলে প্রাপ্ত নম্বরগুলি যোগ করো।'),
        t('Add the maximum marks for those same papers.', 'সেই পত্রগুলির পূর্ণমানও যোগ করো।'),
        t('Divide obtained marks by maximum marks and multiply by 100.', 'প্রাপ্ত নম্বরকে পূর্ণমান দিয়ে ভাগ করে 100 দিয়ে গুণ করো।'),
      ],
      example: {
        question: t('A student scores 420 out of 600. What is the percentage?', 'একজন শিক্ষার্থী 600-এর মধ্যে 420 পেয়েছে। শতকরা নম্বর কত?'),
        steps: [
          t('Percentage = (marks obtained ÷ maximum marks) × 100.', 'শতকরা = (প্রাপ্ত নম্বর ÷ পূর্ণমান) × 100।'),
          t('420 ÷ 600 × 100 = 70%.', '420 ÷ 600 × 100 = 70% নম্বর।'),
        ],
        answer: t('70%', 'শতকরা নম্বর 70%।'),
      },
      tryIt: {
        question: t('A candidate gets 315 marks out of 450. What percentage did the candidate score?', 'একজন পরীক্ষার্থী 450-এর মধ্যে 315 নম্বর পেয়েছে। শতকরা কত নম্বর পেয়েছে?'),
        options: [t('65%', '65%'), t('70%', '70%'), t('72%', '72%'), t('75%', '75%')],
        correct: 1,
        explanation: [
          t('Percentage = 315 ÷ 450 × 100.', 'শতকরা = 315 ÷ 450 × 100।'),
          t('315 ÷ 450 = 0.7, so the score is 70%.', '315 ÷ 450 = 0.7, তাই প্রাপ্ত নম্বর 70%।'),
        ],
      },
    },
    {
      key: 'election_valid_votes',
      emoji: '🗳️',
      name: t('Election votes with invalid ballots', 'অবৈধ ভোটসহ নির্বাচনের হিসাব'),
      difficulty: 'advanced',
      typicalWording: t('“x% of votes are invalid. The winner gets y% of the valid votes. How many votes does the winner get?”', '“x% ভোট অবৈধ। বিজয়ী বৈধ ভোটের y% পেয়েছেন। বিজয়ী কত ভোট পেয়েছেন?”'),
      formula: t(r`Valid votes $= \text{Total} \times \frac{100-x}{100}$; winner votes $=$ valid votes $\times \frac{y}{100}$.`, r`বৈধ ভোট $= \text{মোট} \times \frac{100-x}{100}$; বিজয়ীর ভোট $=$ বৈধ ভোট $\times \frac{y}{100}$।`),
      shortcut: t('Chain the two multipliers in one line: total times (100 minus x) over 100 times y over 100, cancelling before multiplying.', 'দুটি গুণক এক লাইনে শৃঙ্খল করো: মোট গুণ (100 বিয়োগ x) ভাগ 100 গুণ y ভাগ 100, গুণের আগে কাটাকাটি করো।'),
      trap: t('The winner percentage applies only to valid votes, never to all ballots cast.', 'বিজয়ীর শতকরা শুধু বৈধ ভোটের উপর, সব দেওয়া ভোটের উপর কখনও নয়।'),
      spot: t(
        'The percentage of invalid votes and a winner’s percentage among valid votes are given; determine a candidate’s votes or the valid-vote total.',
        'অবৈধ ভোটের শতকরা হার এবং বৈধ ভোটের মধ্যে বিজয়ীর শতকরা হার দেওয়া থাকে; প্রার্থীর ভোট বা বৈধ ভোটের সংখ্যা নির্ণয় করতে হয়।',
      ),
      method: [
        t('Subtract the invalid-vote percentage from 100% to find the valid-vote percentage.', 'বৈধ ভোটের শতকরা পেতে 100% থেকে অবৈধ ভোটের হার বিয়োগ করো।'),
        t('Calculate the number of valid votes from the total ballots.', 'মোট ভোট থেকে বৈধ ভোটের সংখ্যা নির্ণয় করো।'),
        t('Apply the candidate’s percentage to valid votes, not to all ballots.', 'প্রার্থীর শতকরা হার মোট ভোটে নয়, বৈধ ভোটে প্রয়োগ করো।'),
      ],
      example: {
        question: t('Out of 10,000 ballots, 10% are invalid. The winner receives 60% of valid votes. How many votes does the winner receive?', '10,000টি ভোটের 10% অবৈধ। বিজয়ী বৈধ ভোটের 60% পেয়েছেন। বিজয়ী কত ভোট পেয়েছেন?'),
        steps: [
          t('Valid votes = 10,000 × 90% = 9,000.', 'বৈধ ভোট = 10,000 × 90% = 9,000।'),
          t('Winner’s votes = 9,000 × 60% = 5,400.', 'বিজয়ীর ভোট = 9,000 × 60% = 5,400।'),
        ],
        answer: t('5,400 votes', '5,400 ভোট'),
      },
      tryIt: {
        question: t('There are 8,000 ballots, of which 5% are invalid. A candidate gets 75% of valid votes. How many votes does the candidate get?', '8,000টি ভোটের 5% অবৈধ। একজন প্রার্থী বৈধ ভোটের 75% পান। তিনি কত ভোট পান?'),
        options: [t('5,700', '5,700'), t('6,000', '6,000'), t('5,800', '5,800'), t('5,600', '5,600')],
        correct: 0,
        explanation: [
          t('Valid votes = 8,000 × 95% = 7,600.', 'বৈধ ভোট = 8,000 × 95% = 7,600।'),
          t('Candidate’s votes = 7,600 × 75% = 5,700.', 'প্রার্থীর ভোট = 7,600 × 75% = 5,700।'),
        ],
      },
    },
    {
      key: 'savings_as_percent_income',
      emoji: '💰',
      name: t('Savings as a percentage of income', 'আয়ের শতকরা হিসাবে সঞ্চয়'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“A person earns I and spends E. What percent of the income is saved?”', '“একজনের আয় I এবং ব্যয় E। আয়ের কত শতাংশ সঞ্চয় হয়?”'),
      formula: t(r`Savings\% $= \frac{\text{Income} - \text{Expenditure}}{\text{Income}} \times 100\%$.`, r`সঞ্চয়\% $= \frac{\text{আয়} - \text{ব্যয়}}{\text{আয়}} \times 100\%$।`),
      shortcut: t('Equally fast: find the expenditure percent of income and subtract from 100 to get the savings percent.', 'সমান দ্রুত উপায়: আয়ের ব্যয়ের শতকরা বের করে 100 থেকে বিয়োগ করলেই সঞ্চয়ের শতকরা পাওয়া যায়।'),
      trap: t('Divide the savings by the income, not by the expenditure; the question asks for a percent of income.', 'সঞ্চয়কে আয় দিয়ে ভাগ করো, ব্যয় দিয়ে নয়; প্রশ্নে আয়ের শতকরা চাওয়া হয়েছে।'),
      spot: t(
        'Income and expenditure are given, and the question asks what percentage of income remains as savings.',
        'আয় ও ব্যয় দেওয়া থাকে এবং আয়ের কত শতাংশ সঞ্চয় হয় তা জানতে চায়।',
      ),
      method: [
        t('Savings = income − expenditure.', 'সঞ্চয় = আয় − ব্যয়।'),
        t('Use income as the base because the question asks “of income”.', 'প্রশ্নে “আয়ের কত” বলা হয়েছে, তাই আয়কে ভিত্তি ধরো।'),
        t('Savings percentage = savings ÷ income × 100.', 'সঞ্চয়ের শতকরা = সঞ্চয় ÷ আয় × 100।'),
      ],
      example: {
        question: t('A person earns ₹40,000 and spends ₹30,000 each month. What percentage of income is saved?', 'একজনের মাসিক আয় ₹40,000 এবং ব্যয় ₹30,000। আয়ের কত শতাংশ সঞ্চয় হয়?'),
        steps: [
          t('Savings = ₹40,000 − ₹30,000 = ₹10,000.', 'সঞ্চয় = ₹40,000 − ₹30,000 = ₹10,000।'),
          t('Savings percentage = 10,000 ÷ 40,000 × 100 = 25%.', 'সঞ্চয়ের শতকরা = 10,000 ÷ 40,000 × 100 = 25%।'),
        ],
        answer: t('25%', 'সঞ্চয় হয় 25%।'),
      },
      tryIt: {
        question: t('A worker earns ₹50,000 and spends ₹42,500. What percentage of income is saved?', 'একজন কর্মীর আয় ₹50,000 এবং ব্যয় ₹42,500। আয়ের কত শতাংশ সঞ্চয় হয়?'),
        options: [t('12%', '12%'), t('15%', '15%'), t('17.5%', '17.5%'), t('20%', '20%')],
        correct: 1,
        explanation: [
          t('Savings = ₹50,000 − ₹42,500 = ₹7,500.', 'সঞ্চয় = ₹50,000 − ₹42,500 = ₹7,500।'),
          t('₹7,500 ÷ ₹50,000 × 100 = 15%.', '₹7,500 ÷ ₹50,000 × 100 = 15% সঞ্চয়।'),
        ],
      },
    },
    {
      key: 'successive_percentage_of_remainder',
      emoji: '🔄',
      name: t('Apply percentages one after another to the remainder', 'অবশিষ্টের উপর পরপর শতকরা প্রয়োগ'),
      difficulty: 'advanced',
      typicalWording: t('“First a% is taken (or spent), then b% of the remainder is taken. How much remains (or is used)?”', '“প্রথমে a% নেওয়া (বা খরচ) হল, তারপর অবশিষ্টের b% নেওয়া হল। কত বাকি থাকে (বা ব্যবহৃত হয়)?”'),
      formula: t(r`Remainder after two steps $= \text{Total} \times \left(1 - \frac{a}{100}\right)\left(1 - \frac{b}{100}\right)$.`, r`দুই ধাপের পর অবশিষ্ট $= \text{মোট} \times \left(1 - \frac{a}{100}\right)\left(1 - \frac{b}{100}\right)$।`),
      shortcut: t('Start from 100 and keep only the running remainder after each step; the final remainder is already the answer in percent.', '100 থেকে শুরু করে প্রতিটি ধাপের পর শুধু চলমান অবশিষ্ট রাখো; শেষ অবশিষ্টই শতকরায় উত্তর।'),
      trap: t('The second percentage is of the remainder, not of the original total; adding a and b is wrong.', 'দ্বিতীয় শতকরা অবশিষ্টের উপর, আসল মোটের উপর নয়; a ও b যোগ করা ভুল।'),
      spot: t(
        'A quantity is reduced by one percentage and then another percentage is taken from what remains, not from the starting value.',
        'একটি পরিমাণ প্রথমে এক শতকরা হারে কমে, তারপর প্রাথমিক মানে নয়—অবশিষ্টের উপর আরেকটি শতকরা হিসাব হয়।',
      ),
      method: [
        t('Choose a convenient starting total, often 100.', 'সহজ একটি প্রাথমিক মোট ধরো, সাধারণত 100।'),
        t('Apply the first percentage and write down the remainder.', 'প্রথম শতকরা প্রয়োগ করে অবশিষ্টটি লেখো।'),
        t('Apply the next percentage to that remainder, then interpret what the question asks.', 'পরের শতকরা ওই অবশিষ্টে প্রয়োগ করে প্রশ্নের চাওয়া মান নির্ণয় করো।'),
      ],
      example: {
        question: t('A water tank is 80% full. During the day, 25% of the water in it is used. What percentage of the tank remains full?', 'একটি জলের ট্যাঙ্ক 80% ভর্তি। দিনে ট্যাঙ্কের জলের 25% ব্যবহার করা হলো। ট্যাঙ্কের কত শতাংশ জল অবশিষ্ট?'),
        steps: [
          t('Assume the tank holds 100 units: it contains 80 units of water.', 'ট্যাঙ্কের ধারণক্ষমতা 100 একক ধরলে জল আছে 80 একক।'),
          t('Water used = 25% of 80 = 20 units; remaining = 80 − 20 = 60 units.', 'ব্যবহৃত জল = 80-এর 25% = 20 একক; অবশিষ্ট = 80 − 20 = 60 একক।'),
        ],
        answer: t('60% of the tank', 'ট্যাঙ্কের 60%'),
      },
      tryIt: {
        question: t('A shop sells 30% of its stock in the morning, then 20% of the remaining stock in the afternoon. What percentage of the original stock remains?', 'একটি দোকান সকালে মজুতের 30% বিক্রি করে, পরে অবশিষ্টের 20% বিক্রি করে। প্রাথমিক মজুতের কত শতাংশ অবশিষ্ট?'),
        options: [t('50%', '50%'), t('56%', '56%'), t('60%', '60%'), t('70%', '70%')],
        correct: 1,
        explanation: [
          t('Start with 100 units. After selling 30%, 70 units remain.', '100 একক দিয়ে শুরু করো। 30% বিক্রির পর 70 একক থাকে।'),
          t('Afternoon sale = 20% of 70 = 14; remaining = 70 − 14 = 56 units, or 56%.', 'বিকেলের বিক্রি = 70-এর 20% = 14; অবশিষ্ট = 70 − 14 = 56 একক, অর্থাৎ 56%।'),
        ],
      },
    },
    {
      key: 'overlap_pass_fail',
      emoji: '🔀',
      name: t('Pass and fail in two subjects (overlap)', 'দুই বিষয়ে পাস ও ফেল (সাধারণ অংশ)'),
      difficulty: 'advanced',
      typicalWording: t('“x% fail in subject A, y% fail in subject B and z% fail in both. Find the percent who pass in both (or fail in exactly one).”', '“x% বিষয় A-তে ফেল, y% বিষয় B-তে ফেল এবং z% দুটিতেই ফেল। দুটিতেই পাসের (বা ঠিক একটিতে ফেলের) শতকরা কত?”'),
      formula: t(r`Fail in at least one $= x + y - z$; pass in both $= 100 - (x + y - z)$; fail in exactly one $= x + y - 2z$.`, r`অন্তত একটিতে ফেল $= x + y - z$; দুটিতেই পাস $= 100 - (x + y - z)$; ঠিক একটিতে ফেল $= x + y - 2z$।`),
      shortcut: t('Fill a 100-box Venn diagram starting with the both-fail overlap z, then each single-subject remainder, and read every group off the box.', 'দুটিতে ফেল z দিয়ে শুরু করে 100-ঘরের ভেন চিত্র পূরণ করো, তারপর প্রতিটি একক বিষয়ের অবশিষ্ট বসাও, সব দল চিত্র থেকেই পড়া যাবে।'),
      trap: t('Adding x and y without subtracting z counts the both-fail students twice.', 'z বিয়োগ না করে x ও y যোগ করলে দুটিতে ফেল করা শিক্ষার্থীরা দুবার গোনা হয়।'),
      spot: t(
        'Failure (or pass) percentages for two subjects are given together with the percent who fail (or pass) in both, and a missing group must be found.',
        'দুটি বিষয়ে ফেলের (বা পাসের) শতকরা দেওয়া থাকে, সঙ্গে দুটিতেই ফেল (বা পাস) করা শতকরা; একটি অনুপস্থিত দল বের করতে হয়।',
      ),
      method: [
        t('Failed in at least one subject = x + y − z (subtract the overlap once).', 'অন্তত একটি বিষয়ে ফেল = x + y − z (সাধারণ অংশ একবার বিয়োগ করো)।'),
        t('Passed in both = 100 − (failed in at least one).', 'দুটিতেই পাস = 100 − (অন্তত একটিতে ফেল)।'),
        t('Failed in exactly one = (x − z) + (y − z), if that is what is asked.', 'ঠিক একটিতে ফেল = (x − z) + (y − z), যদি সেটাই চাওয়া হয়।'),
        t('Convert the final percent to a number of students when a total is given.', 'মোট সংখ্যা দেওয়া থাকলে শেষ শতকরাকে শিক্ষার্থীর সংখ্যায় বদলাও।'),
      ],
      example: {
        question: t('In a class of 400 students, 40% fail in Mathematics, 30% fail in English and 20% fail in both subjects. How many students pass in both subjects?', '400 জন শিক্ষার্থীর একটি শ্রেণিতে 40% গণিতে ফেল করে, 30% ইংরেজিতে ফেল করে এবং 20% দুটি বিষয়েই ফেল করে। কতজন শিক্ষার্থী দুটি বিষয়েই পাস করে?'),
        steps: [
          t('Failed in at least one = 40 + 30 − 20 = 50%.', 'অন্তত একটি বিষয়ে ফেল = 40 + 30 − 20 = 50%।'),
          t('Passed in both = 100 − 50 = 50%.', 'দুটি বিষয়েই পাস = 100 − 50 = 50%।'),
          t('Number passing both = 50% of 400 = 200 students.', 'দুটিতেই পাসের সংখ্যা = 400-এর 50% = 200 জন শিক্ষার্থী।'),
        ],
        answer: t('200 students', '200 জন শিক্ষার্থী'),
      },
      tryIt: {
        question: t('In an exam, 45% of students fail in Mathematics, 35% fail in Science and 25% fail in both subjects. What percentage of students fail in exactly one subject?', 'একটি পরীক্ষায় 45% শিক্ষার্থী গণিতে ফেল করে, 35% বিজ্ঞানে ফেল করে এবং 25% দুটি বিষয়েই ফেল করে। শতকরা কতজন শিক্ষার্থী ঠিক একটি বিষয়ে ফেল করে?'),
        options: [t('55%', '55%'), t('30%', '30%'), t('80%', '80%'), t('45%', '45%')],
        correct: 1,
        explanation: [
          t('Fail only in Mathematics = 45 − 25 = 20%; fail only in Science = 35 − 25 = 10%.', 'শুধু গণিতে ফেল = 45 − 25 = 20%; শুধু বিজ্ঞানে ফেল = 35 − 25 = 10%।'),
          t('Fail in exactly one = 20 + 10 = 30%.', 'ঠিক একটিতে ফেল = 20 + 10 = 30%।'),
          t('55% failed in at least one subject and 45% passed in both, so neither is the exactly-one group.', '55% অন্তত একটিতে ফেল করেছে এবং 45% দুটিতেই পাস করেছে, তাই কোনোটিই ঠিক-একটি দল নয়।'),
        ],
      },
    },
  ],
  // Hard-bank pattern matrix (Advanced quizzes): see ./hard/percentage.js.
  registry: require('./hard/percentage'),
};
