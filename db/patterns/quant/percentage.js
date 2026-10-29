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
    {
      key: 'percentage_change',
      emoji: '📈',
      name: t('Percentage increase or decrease between two values', 'দুটি মানের মধ্যে শতকরা বৃদ্ধি বা হ্রাস'),
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
  ],
  // Hard-bank pattern matrix (Advanced quizzes): see ./hard/percentage.js.
  registry: require('./hard/percentage'),
};
