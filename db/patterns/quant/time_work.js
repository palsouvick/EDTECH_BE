'use strict';

// Question patterns: Time & Work. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'time_work',
  patterns: [
    {
      key: 'two_together',
      emoji: '🤝',
      name: t('Two people working together', 'দুজন একসঙ্গে কাজ করলে'),
      spot: t(
        'Each person\'s time to finish the job alone is given, and the question asks how long they take **together**.',
        'প্রত্যেকে একা কাজটা কত দিনে শেষ করে তা দেওয়া থাকে, আর জানতে চাওয়া হয় **একসঙ্গে** কাজ করলে কত দিন লাগবে।',
      ),
      method: [
        t('Take the total work = LCM of the given days (in units).', 'মোট কাজ = দেওয়া দিনগুলোর ল.সা.গু. (একক হিসেবে) ধরো।'),
        t('One day\'s work of each person = total work ÷ his days.', 'প্রত্যেকের 1 দিনের কাজ = মোট কাজ ÷ তার দিনসংখ্যা।'),
        t('Add the one-day works, then time together = total work ÷ (sum).', '1 দিনের কাজগুলো যোগ করো, তারপর একসঙ্গে সময় = মোট কাজ ÷ (যোগফল)।'),
      ],
      example: {
        question: t(
          'A can finish a job in 12 days and B can finish it in 24 days. In how many days will they finish it working together?',
          'A একটি কাজ 12 দিনে এবং B সেই কাজ 24 দিনে শেষ করতে পারে। দুজনে একসঙ্গে কাজ করলে কত দিনে কাজটি শেষ হবে?',
        ),
        steps: [
          t('Total work = LCM of 12 and 24 = $24$ units.', 'মোট কাজ = 12 ও 24-এর ল.সা.গু. = $24$ একক।'),
          t(r`A does $24 \div 12 = 2$ units a day; B does $24 \div 24 = 1$ unit a day.`, r`A রোজ করে $24 \div 12 = 2$ একক; B রোজ করে $24 \div 24 = 1$ একক।`),
          t(r`Together: $2 + 1 = 3$ units a day.`, r`একসঙ্গে রোজ $2 + 1 = 3$ একক।`),
          t(r`Time $= 24 \div 3 = 8$ days.`, r`সময় $= 24 \div 3 = 8$ দিন।`),
        ],
        answer: t('8 days', '8 দিন'),
      },
      tryIt: {
        question: t(
          'A can do a piece of work in 10 days and B can do it in 15 days. How many days will they take together?',
          'A একটি কাজ 10 দিনে এবং B সেই কাজ 15 দিনে করতে পারে। দুজনে একসঙ্গে করলে কত দিন লাগবে?',
        ),
        options: [t('12.5', '12.5'), t('6', '6'), t('25', '25'), t('5', '5')],
        correct: 1,
        explanation: [
          t('Total work = LCM of 10 and 15 = $30$ units.', 'মোট কাজ = 10 ও 15-এর ল.সা.গু. = $30$ একক।'),
          t(r`A does $3$ units a day, B does $2$ units a day, so together $5$ units a day.`, r`A রোজ $3$ একক, B রোজ $2$ একক করে, তাই একসঙ্গে রোজ $5$ একক।`),
          t(r`Time $= 30 \div 5 = 6$ days. (Do not add or average the days!)`, r`সময় $= 30 \div 5 = 6$ দিন। (দিনগুলো যোগ বা গড় করবে না!)`),
        ],
      },
    },
    {
      key: 'one_leaves',
      emoji: '🚪',
      name: t('One person leaves midway', 'মাঝপথে একজন চলে গেলে'),
      spot: t(
        'Both start together, but after some days one person **leaves** and the other finishes the rest.',
        'দুজনে একসঙ্গে কাজ শুরু করে, কিন্তু কিছু দিন পর একজন **চলে যায়** আর বাকি কাজ অন্যজন শেষ করে।',
      ),
      method: [
        t('Take total work = LCM of the days and find each one-day work.', 'মোট কাজ = দিনগুলোর ল.সা.গু. ধরে প্রত্যেকের 1 দিনের কাজ বের করো।'),
        t('Work done together = (sum of one-day works) × days worked together.', 'একসঙ্গে করা কাজ = (1 দিনের কাজের যোগফল) × একসঙ্গে কাজের দিন।'),
        t('Remaining work = total − work done.', 'বাকি কাজ = মোট কাজ − করা কাজ।'),
        t('Days for the one who stays = remaining work ÷ his one-day work.', 'যে থেকে গেল তার সময় = বাকি কাজ ÷ তার 1 দিনের কাজ।'),
      ],
      example: {
        question: t(
          'A can do a work in 20 days and B in 30 days. They work together for 6 days, then A leaves. In how many more days will B finish the work?',
          'A একটি কাজ 20 দিনে এবং B 30 দিনে করতে পারে। দুজনে 6 দিন একসঙ্গে কাজ করার পর A চলে গেল। বাকি কাজ শেষ করতে B-এর আর কত দিন লাগবে?',
        ),
        steps: [
          t(r`Total work = LCM of 20 and 30 = $60$ units. A does $3$ units a day, B does $2$.`, r`মোট কাজ = 20 ও 30-এর ল.সা.গু. = $60$ একক। A রোজ $3$ একক, B রোজ $2$ একক করে।`),
          t(r`In 6 days together: $(3 + 2) \times 6 = 30$ units.`, r`6 দিনে একসঙ্গে: $(3 + 2) \times 6 = 30$ একক।`),
          t(r`Remaining work $= 60 - 30 = 30$ units.`, r`বাকি কাজ $= 60 - 30 = 30$ একক।`),
          t(r`B alone: $30 \div 2 = 15$ days.`, r`B একা: $30 \div 2 = 15$ দিন।`),
        ],
        answer: t('15 more days', 'আরও 15 দিন'),
      },
      tryIt: {
        question: t(
          'A can finish a work in 12 days and B in 18 days. They work together for 4 days, and then A leaves. In how many more days will B finish the remaining work?',
          'A একটি কাজ 12 দিনে এবং B 18 দিনে শেষ করতে পারে। তারা 4 দিন একসঙ্গে কাজ করার পর A চলে গেল। বাকি কাজ শেষ করতে B-এর আর কত দিন লাগবে?',
        ),
        options: [t('12', '12'), t('8', '8'), t('14', '14'), t('9', '9')],
        correct: 1,
        explanation: [
          t(r`Total work = LCM of 12 and 18 = $36$ units. A does $3$ units a day, B does $2$.`, r`মোট কাজ = 12 ও 18-এর ল.সা.গু. = $36$ একক। A রোজ $3$ একক, B রোজ $2$ একক।`),
          t(r`In 4 days together: $5 \times 4 = 20$ units, so $36 - 20 = 16$ units are left.`, r`4 দিনে একসঙ্গে: $5 \times 4 = 20$ একক, তাই বাকি $36 - 20 = 16$ একক।`),
          t(r`B alone: $16 \div 2 = 8$ more days. (12 is the total time, not the extra time.)`, r`B একা: $16 \div 2 = 8$ দিন বেশি। (12 হল মোট সময়, বাড়তি সময় নয়।)`),
        ],
      },
    },
    {
      key: 'efficiency',
      emoji: '💪',
      name: t('"Twice as efficient" (efficiency ratio)', '"দ্বিগুণ দক্ষ" (দক্ষতার অনুপাত)'),
      spot: t(
        'Words like **"twice as efficient"**, "thrice as fast" or "A is 3 times as good a workman as B".',
        '**"দ্বিগুণ দক্ষ"**, "তিনগুণ তাড়াতাড়ি" বা "A, B-এর থেকে 3 গুণ ভালো কারিগর" — এমন কথা থাকে।',
      ),
      method: [
        t('Write the efficiencies (one-day work) as a ratio, e.g. A : B = 2 : 1.', 'দক্ষতা (1 দিনের কাজ) অনুপাতে লেখো, যেমন A : B = 2 : 1।'),
        t('Total work = (sum of efficiencies) × days taken together.', 'মোট কাজ = (দক্ষতার যোগফল) × একসঙ্গে লাগা দিন।'),
        t('Time for one person = total work ÷ his efficiency.', 'একজনের সময় = মোট কাজ ÷ তার দক্ষতা।'),
      ],
      example: {
        question: t(
          'A is twice as efficient as B. Together they finish a work in 14 days. In how many days can A alone finish it?',
          'A, B-এর দ্বিগুণ দক্ষ। দুজনে একসঙ্গে একটি কাজ 14 দিনে শেষ করে। A একা কাজটি কত দিনে শেষ করবে?',
        ),
        steps: [
          t(r`Efficiency A : B $= 2 : 1$. So A does $2$ units a day, B does $1$.`, r`দক্ষতা A : B $= 2 : 1$। তাই A রোজ $2$ একক, B রোজ $1$ একক করে।`),
          t(r`Total work $= (2 + 1) \times 14 = 42$ units.`, r`মোট কাজ $= (2 + 1) \times 14 = 42$ একক।`),
          t(r`A alone: $42 \div 2 = 21$ days.`, r`A একা: $42 \div 2 = 21$ দিন।`),
        ],
        answer: t('21 days', '21 দিন'),
      },
      tryIt: {
        question: t(
          'A is three times as efficient as B. Working together, they finish a job in 15 days. How many days will B alone take?',
          'A, B-এর থেকে তিনগুণ দক্ষ। একসঙ্গে কাজ করে তারা একটি কাজ 15 দিনে শেষ করে। B একা কত দিনে কাজটি করবে?',
        ),
        options: [t('20', '20'), t('45', '45'), t('60', '60'), t('30', '30')],
        correct: 2,
        explanation: [
          t(r`A : B $= 3 : 1$, so total work $= (3 + 1) \times 15 = 60$ units.`, r`A : B $= 3 : 1$, তাই মোট কাজ $= (3 + 1) \times 15 = 60$ একক।`),
          t(r`B does $1$ unit a day, so B alone takes $60 \div 1 = 60$ days. (20 days is A's time.)`, r`B রোজ $1$ একক করে, তাই B একা নেয় $60 \div 1 = 60$ দিন। (20 দিন হল A-এর সময়।)`),
        ],
      },
    },
    {
      key: 'men_days_hours',
      emoji: '👷',
      name: t('Men, days and hours (M₁D₁H₁ = M₂D₂H₂)', 'লোক, দিন ও ঘণ্টা (M₁D₁H₁ = M₂D₂H₂)'),
      spot: t(
        'A group of **men/workers** finishes a job in some days working some **hours a day**; the number of men or hours changes.',
        'কিছু **লোক/শ্রমিক** রোজ কয়েক **ঘণ্টা** কাজ করে কিছু দিনে কাজ শেষ করে; পরে লোকসংখ্যা বা ঘণ্টা বদলে যায়।',
      ),
      method: [
        t(r`For the same work: $M_1 \times D_1 \times H_1 = M_2 \times D_2 \times H_2$.`, r`একই কাজের জন্য: $M_1 \times D_1 \times H_1 = M_2 \times D_2 \times H_2$।`),
        t('Put in the known numbers and keep the unknown on one side.', 'জানা সংখ্যাগুলো বসাও, অজানাটি এক দিকে রাখো।'),
        t('Divide to find the unknown (more men → fewer days).', 'ভাগ করে অজানাটি বের করো (লোক বেশি → দিন কম)।'),
      ],
      example: {
        question: t(
          '15 men can build a wall in 12 days working 8 hours a day. In how many days will 20 men build the same wall working 9 hours a day?',
          '15 জন লোক রোজ 8 ঘণ্টা কাজ করে একটি দেয়াল 12 দিনে তৈরি করে। 20 জন লোক রোজ 9 ঘণ্টা কাজ করলে একই দেয়াল কত দিনে তৈরি করবে?',
        ),
        steps: [
          t(r`Let the days be $D$: $15 \times 12 \times 8 = 20 \times D \times 9$`, r`ধরো দিনসংখ্যা $D$: $15 \times 12 \times 8 = 20 \times D \times 9$`),
          t(r`$1440 = 180 \times D$`, r`অর্থাৎ $1440 = 180 \times D$`),
          t(r`$D = 1440 \div 180 = 8$ days.`, r`$D = 1440 \div 180 = 8$ দিন।`),
        ],
        answer: t('8 days', '8 দিন'),
      },
      tryIt: {
        question: t(
          '18 men can dig a pond in 20 days working 6 hours a day. How many days will 24 men take to dig the same pond working 5 hours a day?',
          '18 জন লোক রোজ 6 ঘণ্টা কাজ করে একটি পুকুর 20 দিনে খোঁড়ে। 24 জন লোক রোজ 5 ঘণ্টা কাজ করলে একই পুকুর খুঁড়তে কত দিন লাগবে?',
        ),
        options: [t('15', '15'), t('12.5', '12.5'), t('18', '18'), t('24', '24')],
        correct: 2,
        explanation: [
          t(r`$18 \times 20 \times 6 = 24 \times D \times 5$, so $2160 = 120 \times D$.`, r`$18 \times 20 \times 6 = 24 \times D \times 5$, তাই $2160 = 120 \times D$।`),
          t(r`$D = 2160 \div 120 = 18$ days. (Forgetting the hours gives 15.)`, r`$D = 2160 \div 120 = 18$ দিন। (ঘণ্টা বাদ দিলে ভুল করে 15 আসে।)`),
        ],
      },
    },
    {
      key: 'pairs_together',
      emoji: '👥',
      name: t('Pairs given: A+B, B+C, C+A', 'জোড়ায় জোড়ায় দেওয়া: A+B, B+C, C+A'),
      spot: t(
        'The times for **pairs** (A and B, B and C, C and A) are given, and you must find the time for all three or for one person alone.',
        '**জোড়ায়** (A ও B, B ও C, C ও A) কাজ করার সময় দেওয়া থাকে; তিনজনের একসঙ্গে বা একজনের একার সময় বের করতে হয়।',
      ),
      method: [
        t('Total work = LCM of the three times; find each pair\'s one-day work.', 'মোট কাজ = তিনটি সময়ের ল.সা.গু.; প্রতিটি জোড়ার 1 দিনের কাজ বের করো।'),
        t('Add all three pair-works: this is 2(A + B + C). Halve it to get A + B + C.', 'তিনটি জোড়ার কাজ যোগ করো: এটা হল 2(A + B + C)। অর্ধেক করলে A + B + C পাবে।'),
        t('One person alone, e.g. A = (A + B + C) − (B + C).', 'একজনের কাজ, যেমন A = (A + B + C) − (B + C)।'),
        t('Time = total work ÷ one-day work.', 'সময় = মোট কাজ ÷ 1 দিনের কাজ।'),
      ],
      example: {
        question: t(
          'A and B can do a work in 12 days, B and C in 15 days, and C and A in 20 days. In how many days will A, B and C together finish it?',
          'A ও B একটি কাজ 12 দিনে, B ও C 15 দিনে এবং C ও A 20 দিনে করতে পারে। A, B ও C একসঙ্গে কাজটি কত দিনে শেষ করবে?',
        ),
        steps: [
          t(r`Total work = LCM of 12, 15, 20 = $60$ units.`, r`মোট কাজ = 12, 15, 20-এর ল.সা.গু. = $60$ একক।`),
          t(r`A+B $= 5$, B+C $= 4$, C+A $= 3$ units a day.`, r`A+B রোজ $5$, B+C রোজ $4$, C+A রোজ $3$ একক।`),
          t(r`$2(A + B + C) = 5 + 4 + 3 = 12$, so $A + B + C = 6$ units a day.`, r`$2(A + B + C) = 5 + 4 + 3 = 12$, তাই $A + B + C = 6$ একক রোজ।`),
          t(r`Time $= 60 \div 6 = 10$ days.`, r`সময় $= 60 \div 6 = 10$ দিন।`),
        ],
        answer: t('10 days', '10 দিন'),
      },
      tryIt: {
        question: t(
          'A and B can do a work in 10 days, B and C in 12 days, and C and A in 15 days. In how many days can A alone do it?',
          'A ও B একটি কাজ 10 দিনে, B ও C 12 দিনে এবং C ও A 15 দিনে করতে পারে। A একা কাজটি কত দিনে করবে?',
        ),
        options: [t('8', '8'), t('6', '6'), t('24', '24'), t('40', '40')],
        correct: 2,
        explanation: [
          t(r`Total work = LCM of 10, 12, 15 = $60$ units. A+B $= 6$, B+C $= 5$, C+A $= 4$.`, r`মোট কাজ = 10, 12, 15-এর ল.সা.গু. = $60$ একক। A+B $= 6$, B+C $= 5$, C+A $= 4$।`),
          t(r`$2(A + B + C) = 15$, so $A + B + C = 7.5$ units a day.`, r`$2(A + B + C) = 15$, তাই $A + B + C = 7.5$ একক রোজ।`),
          t(r`A $= 7.5 - 5 = 2.5$ units a day, so A alone takes $60 \div 2.5 = 24$ days.`, r`A $= 7.5 - 5 = 2.5$ একক রোজ, তাই A একা নেয় $60 \div 2.5 = 24$ দিন।`),
        ],
      },
    },
  ],
  // Hard-bank pattern matrix (Advanced quizzes): see ./hard/time_work.js.
  registry: require('./hard/time_work'),
};
