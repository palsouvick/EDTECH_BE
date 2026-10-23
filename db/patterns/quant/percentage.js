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
  ],
};
