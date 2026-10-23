'use strict';

// Chapter lesson: Simplification & BODMAS. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'simplification',
  title: t('Simplification & BODMAS', 'সরলীকরণ ও BODMAS'),
  emoji: '🧮',
  intro: t(
    'Simplification means working out a long sum with many signs, step by step, to get one number. A fixed order of steps, called BODMAS, makes sure everyone gets the same answer.',
    'সরলীকরণ মানে অনেকগুলি চিহ্নযুক্ত একটি লম্বা অঙ্ককে ধাপে ধাপে কষে একটি সংখ্যায় পৌঁছানো। BODMAS নামের একটি নির্দিষ্ট ক্রম মেনে চললে সবাই একই উত্তর পায়।',
  ),
  levels: [
    // ───────────────────────────── BASIC ─────────────────────────────
    {
      level: 'basic',
      sections: [
        {
          heading: t('Why do we need an order?', 'ক্রমের দরকার কেন?'),
          body: t(
            r`Look at $2 + 3 \times 4$.

- If you add first: $5 \times 4 = 20$.
- If you multiply first: $2 + 12 = 14$.

Two different answers! To stop this confusion, everyone follows the same **order of operations** (the order in which we do $+$, $-$, $\times$, $\div$). The correct answer is **14**.`,
            r`$2 + 3 \times 4$ দেখো।

- আগে যোগ করলে: $5 \times 4 = 20$।
- আগে গুণ করলে: $2 + 12 = 14$।

দুটি আলাদা উত্তর! এই গোলমাল এড়াতে সবাই একই **ক্রিয়ার ক্রম** মেনে চলে (অর্থাৎ $+$, $-$, $\times$, $\div$ কোনটা আগে করব)। ঠিক উত্তর হল **14**।`,
          ),
        },
        {
          heading: t('The BODMAS rule', 'BODMAS নিয়ম'),
          body: t(
            r`Each letter is one step, done in this order:

1. **B** — **Brackets** first.
2. **O** — **Of** and **Orders** (powers like $3^2$ and roots like $\sqrt{9}$).
3. **D, M** — **Division** and **Multiplication**, from **left to right**.
4. **A, S** — **Addition** and **Subtraction**, from **left to right**.

D and M are equal partners: do whichever comes first from the left. The same is true for A and S.`,
            r`প্রতিটি অক্ষর একটি ধাপ, এই ক্রমে করতে হয়:

1. **B** — **Brackets** (বন্ধনী) সবার আগে।
2. **O** — **Of** ("-এর", অর্থাৎ গুণ) এবং **Orders** (ঘাত যেমন $3^2$, বর্গমূল যেমন $\sqrt{9}$)।
3. **D, M** — **Division** (ভাগ) ও **Multiplication** (গুণ), **বাঁদিক থেকে ডানদিকে**।
4. **A, S** — **Addition** (যোগ) ও **Subtraction** (বিয়োগ), **বাঁদিক থেকে ডানদিকে**।

ভাগ আর গুণ সমান গুরুত্বের: বাঁদিক থেকে যেটি আগে আসে সেটি আগে করো। যোগ-বিয়োগের ক্ষেত্রেও তাই।`,
          ),
        },
      ],
      examples: [
        {
          question: t('Simplify: 35 + 5 × 6 − 20 ÷ 2', 'সরল করো: 35 + 5 × 6 − 20 ÷ 2'),
          steps: [
            t('No brackets or powers. Do × and ÷ first: 5 × 6 = 30 and 20 ÷ 2 = 10.', 'বন্ধনী বা ঘাত নেই। আগে × ও ÷ করো: 5 × 6 = 30 এবং 20 ÷ 2 = 10।'),
            t('Now it is 35 + 30 − 10.', 'এখন হল 35 + 30 − 10।'),
            t('Left to right: 35 + 30 = 65, then 65 − 10 = 55.', 'বাঁদিক থেকে: 35 + 30 = 65, তারপর 65 − 10 = 55।'),
          ],
          answer: t('55', 'উত্তর 55'),
        },
        {
          question: t('Simplify: 32 + 5 × 3 − 24 ÷ 2', 'সরল করো: 32 + 5 × 3 − 24 ÷ 2'),
          steps: [
            t('Multiplication and division first: 5 × 3 = 15 and 24 ÷ 2 = 12.', 'আগে গুণ ও ভাগ: 5 × 3 = 15 এবং 24 ÷ 2 = 12।'),
            t('32 + 15 − 12 = 47 − 12 = 35.', 'তারপর 32 + 15 − 12 = 47 − 12 = 35।'),
          ],
          answer: t('35', 'উত্তর 35'),
        },
        {
          question: t('Simplify: 24 ÷ 4 × 2', 'সরল করো: 24 ÷ 4 × 2'),
          steps: [
            t('÷ and × have equal rank, so go from left to right. First 24 ÷ 4 = 6.', '÷ ও × সমান গুরুত্বের, তাই বাঁদিক থেকে ডানদিকে যাও। আগে 24 ÷ 4 = 6।'),
            t('Then 6 × 2 = 12.', 'তারপর 6 × 2 = 12।'),
            t('Common mistake: doing 4 × 2 = 8 first gives 24 ÷ 8 = 3, which is wrong.', 'সাধারণ ভুল: আগে 4 × 2 = 8 করলে 24 ÷ 8 = 3 আসে, যা ভুল।'),
          ],
          answer: t('12', 'উত্তর 12'),
        },
      ],
    },
    // ───────────────────────────── INTERMEDIATE ─────────────────────────────
    {
      level: 'intermediate',
      sections: [
        {
          heading: t('Brackets inside brackets', 'বন্ধনীর ভিতরে বন্ধনী'),
          body: t(
            r`There are three kinds of brackets: **( )** small, **{ }** curly and **[ ]** square. Open them from the **inside out**:

1. First ( ),
2. then { },
3. then [ ].

Sometimes a line is drawn over numbers, like $\overline{7 - 3}$. This **bar** (vinculum) is also a bracket, and it is solved even before ( ).`,
            r`বন্ধনী তিন রকম: **( )** প্রথম বন্ধনী, **{ }** দ্বিতীয় বন্ধনী আর **[ ]** তৃতীয় বন্ধনী। **ভিতর থেকে বাইরের দিকে** খোলো:

1. আগে ( ),
2. তারপর { },
3. তারপর [ ]।

কখনো সংখ্যার উপরে একটি দাগ থাকে, যেমন $\overline{7 - 3}$। এই **রেখা-বন্ধনী** (ভিঙ্কুলাম)-ও একটি বন্ধনী, এবং ( )-এরও আগে এর কাজ করতে হয়।`,
          ),
        },
        {
          heading: t('Multiplying decimals', 'দশমিকের গুণ'),
          body: t(
            r`To multiply decimals, forget the points at first:

1. Multiply as whole numbers: $8.4 \times 0.8 \to 84 \times 8 = 672$.
2. Count the digits after the point in both numbers: $8.4$ has 1, $0.8$ has 1, total **2**.
3. Put the point so the answer has 2 digits after it: $6.72$.`,
            r`দশমিক গুণ করতে প্রথমে দশমিক বিন্দুগুলি ভুলে যাও:

1. পূর্ণসংখ্যার মতো গুণ করো: $8.4 \times 0.8 \to 84 \times 8 = 672$।
2. দুটি সংখ্যায় দশমিকের পরে কটি অঙ্ক আছে গোনো: $8.4$-এ 1টি, $0.8$-এ 1টি, মোট **2**টি।
3. উত্তরে দশমিকের পরে 2টি অঙ্ক রেখে বিন্দু বসাও: $6.72$।`,
          ),
        },
        {
          heading: t('A shortcut: difference of two squares', 'সংক্ষিপ্ত কৌশল: দুটি বর্গের অন্তর'),
          body: t(
            r`The **square** of a number is the number times itself: $5^2 = 25$.

Instead of squaring two big numbers and subtracting, use:

$$a^2 - b^2 = (a + b)(a - b)$$

$50^2 - 25^2 = (50 + 25)(50 - 25) = 75 \times 25 = 1875$. Much quicker than $2500 - 625$!`,
            r`কোনো সংখ্যার **বর্গ** মানে সংখ্যাটিকে নিজেকে দিয়েই গুণ: $5^2 = 25$।

দুটি বড় সংখ্যার বর্গ করে বিয়োগ না করে এই সূত্রটি লাগাও:

$$a^2 - b^2 = (a + b)(a - b)$$

$50^2 - 25^2 = (50 + 25)(50 - 25) = 75 \times 25 = 1875$। $2500 - 625$ করার থেকে অনেক দ্রুত!`,
          ),
        },
      ],
      examples: [
        {
          question: t('Simplify: 20 − [12 − {6 + (8 − 5)}]', 'সরল করো: 20 − [12 − {6 + (8 − 5)}]'),
          steps: [
            t('Small bracket first: 8 − 5 = 3.', 'আগে প্রথম বন্ধনী: 8 − 5 = 3।'),
            t('Curly bracket: 6 + 3 = 9.', 'তারপর দ্বিতীয় বন্ধনী: 6 + 3 = 9।'),
            t('Square bracket: 12 − 9 = 3.', 'তারপর তৃতীয় বন্ধনী: 12 − 9 = 3।'),
            t('Finally 20 − 3 = 17.', 'শেষে 20 − 3 = 17।'),
          ],
          answer: t('17', 'উত্তর 17'),
        },
        {
          question: t('Evaluate: 8.4 × 0.8 + 11', 'মান নির্ণয় করো: 8.4 × 0.8 + 11'),
          steps: [
            t('Multiply first: 84 × 8 = 672, and there are 2 decimal places in all, so 8.4 × 0.8 = 6.72.', 'আগে গুণ: 84 × 8 = 672, মোট 2টি দশমিক স্থান, তাই 8.4 × 0.8 = 6.72।'),
            t('Then add: 6.72 + 11 = 17.72.', 'তারপর যোগ: 6.72 + 11 = 17.72।'),
          ],
          answer: t('17.72', 'উত্তর 17.72'),
        },
        {
          question: t(r`Find the value of $33^2 - 23^2$.`, r`$33^2 - 23^2$-এর মান কত?`),
          steps: [
            t(r`Use $a^2 - b^2 = (a + b)(a - b)$ with $a = 33$, $b = 23$.`, r`$a^2 - b^2 = (a + b)(a - b)$ সূত্রে $a = 33$, $b = 23$ বসাও।`),
            t(r`$(33 + 23)(33 - 23) = 56 \times 10 = 560$.`, r`তাহলে $(33 + 23)(33 - 23) = 56 \times 10 = 560$।`),
            t(r`Check: $1089 - 529 = 560$.`, r`মিলিয়ে দেখো: $1089 - 529 = 560$।`),
          ],
          answer: t('560', 'উত্তর 560'),
        },
      ],
    },
    // ───────────────────────────── ADVANCED ─────────────────────────────
    {
      level: 'advanced',
      sections: [
        {
          heading: t('Spot the perfect square', 'পূর্ণবর্গ চিনে নাও'),
          body: t(
            r`Exams love hiding a known pattern inside a big expression. Learn these by heart:

- $(a + b)^2 = a^2 + 2ab + b^2$
- $(a - b)^2 = a^2 - 2ab + b^2$

So when you see $a^2 + 2ab + b^2$ under a square root, the answer is just $a + b$:

$$\sqrt{a^2 + 2ab + b^2} = a + b$$`,
            r`পরীক্ষায় প্রায়ই বড় রাশির ভিতরে চেনা ছক লুকানো থাকে। এগুলি মুখস্থ রাখো:

- $(a + b)^2 = a^2 + 2ab + b^2$
- $(a - b)^2 = a^2 - 2ab + b^2$

তাই বর্গমূলের ভিতরে $a^2 + 2ab + b^2$ দেখলে উত্তর সোজা $a + b$:

$$\sqrt{a^2 + 2ab + b^2} = a + b$$`,
          ),
        },
        {
          heading: t('Fast squares near 100', '100-এর কাছাকাছি সংখ্যার দ্রুত বর্গ'),
          body: t(
            r`Break the number around a round base:

- $103^2 = (100 + 3)^2 = 10000 + 600 + 9 = 10609$
- $98^2 = (100 - 2)^2 = 10000 - 400 + 4 = 9604$

The same idea works around 50, 1000 or any easy number.`,
            r`সংখ্যাটিকে একটি গোল সংখ্যার কাছাকাছি ভেঙে নাও:

- $103^2 = (100 + 3)^2 = 10000 + 600 + 9 = 10609$
- $98^2 = (100 - 2)^2 = 10000 - 400 + 4 = 9604$

50, 1000 বা যেকোনো সহজ সংখ্যার কাছেও এই কৌশল খাটে।`,
          ),
        },
        {
          heading: t('Take out the common factor', 'সাধারণ উৎপাদক বের করে নাও'),
          body: t(
            r`If the same number appears in every term, pull it out first (this is the **distributive law**):

$$ab + ac = a(b + c)$$

$47 \times 23 + 47 \times 77 = 47 \times (23 + 77) = 47 \times 100 = 4700$.`,
            r`প্রতিটি পদে একই সংখ্যা থাকলে আগে সেটিকে বাইরে আনো (একে বলে **বিচ্ছেদ নিয়ম**):

$$ab + ac = a(b + c)$$

$47 \times 23 + 47 \times 77 = 47 \times (23 + 77) = 47 \times 100 = 4700$।`,
          ),
        },
      ],
      examples: [
        {
          question: t(r`Find the value of $\sqrt{53^2 + 2 \times 53 \times 5 + 5^2}$.`, r`$\sqrt{53^2 + 2 \times 53 \times 5 + 5^2}$-এর মান কত?`),
          steps: [
            t(r`The expression inside is $a^2 + 2ab + b^2$ with $a = 53$, $b = 5$, which equals $(53 + 5)^2$.`, r`ভিতরের রাশিটি $a^2 + 2ab + b^2$, যেখানে $a = 53$, $b = 5$, অর্থাৎ এটি $(53 + 5)^2$।`),
            t(r`$\sqrt{(53 + 5)^2} = 53 + 5 = 58$.`, r`তাই $\sqrt{(53 + 5)^2} = 53 + 5 = 58$।`),
          ],
          answer: t('58', 'উত্তর 58'),
        },
        {
          question: t('Simplify: 999 × 999 + 999', 'সরল করো: 999 × 999 + 999'),
          steps: [
            t(r`999 appears in both terms: $999 \times 999 + 999 \times 1$.`, r`দুটি পদেই 999 আছে: $999 \times 999 + 999 \times 1$।`),
            t(r`Take it out: $999 \times (999 + 1) = 999 \times 1000 = 999000$.`, r`বাইরে আনো: $999 \times (999 + 1) = 999 \times 1000 = 999000$।`),
          ],
          answer: t('999000', 'উত্তর 999000'),
        },
        {
          question: t(r`Find the value of $93^2 - 18^2$.`, r`$93^2 - 18^2$-এর মান কত?`),
          steps: [
            t(r`$93^2 - 18^2 = (93 + 18)(93 - 18) = 111 \times 75$.`, r`সূত্র অনুযায়ী $93^2 - 18^2 = (93 + 18)(93 - 18) = 111 \times 75$।`),
            t(r`$111 \times 75 = 7500 + 750 + 75 = 8325$.`, r`$111 \times 75 = 7500 + 750 + 75 = 8325$ (100, 10 ও 1-এর গুণ যোগ করে)।`),
          ],
          answer: t('8325', 'উত্তর 8325'),
        },
      ],
    },
  ],
  rules: [
    {
      label: t('BODMAS order', 'BODMAS ক্রম'),
      latex: r`\text{Brackets} \to \text{Of, Orders} \to \div, \times \to +, -`,
      explain: t('Division and multiplication go left to right; so do addition and subtraction.', 'ভাগ ও গুণ বাঁদিক থেকে ডানদিকে; যোগ ও বিয়োগও বাঁদিক থেকে ডানদিকে।'),
    },
    {
      label: t('Brackets from the inside out', 'বন্ধনী ভিতর থেকে বাইরে'),
      latex: r`\overline{\;\;} \to (\;) \to \{\;\} \to [\;]`,
      explain: t('Bar first, then small, curly and square brackets.', 'আগে রেখা-বন্ধনী, তারপর প্রথম, দ্বিতীয় ও তৃতীয় বন্ধনী।'),
    },
    {
      label: t('Difference of squares', 'দুটি বর্গের অন্তর'),
      latex: r`a^2 - b^2 = (a + b)(a - b)`,
      explain: t('Turns two big squares into one easy multiplication.', 'দুটি বড় বর্গকে একটি সহজ গুণে বদলে দেয়।'),
    },
    {
      label: t('Square of a sum', 'যোগফলের বর্গ'),
      latex: r`(a + b)^2 = a^2 + 2ab + b^2`,
      explain: t('So the square root of a² + 2ab + b² is a + b.', 'তাই a² + 2ab + b²-এর বর্গমূল হল a + b।'),
    },
    {
      label: t('Square of a difference', 'অন্তরের বর্গ'),
      latex: r`(a - b)^2 = a^2 - 2ab + b^2`,
      explain: t('Useful for squares just below a round number, like 98².', 'গোল সংখ্যার ঠিক নিচের সংখ্যার বর্গ (যেমন 98²) করতে কাজে লাগে।'),
    },
    {
      label: t('Common factor', 'সাধারণ উৎপাদক'),
      latex: r`ab + ac = a(b + c)`,
      explain: t('Pull out the number that appears in every term.', 'যে সংখ্যা প্রতিটি পদে আছে, তাকে বাইরে আনো।'),
    },
  ],
  tips: [
    t('Multiplication does not always come before division. Whichever of ÷ and × comes first from the left is done first.', 'গুণ সবসময় ভাগের আগে নয়। ÷ আর ×-এর মধ্যে বাঁদিক থেকে যেটি আগে আসে, সেটি আগে করো।'),
    t('Likewise, 10 − 4 + 2 = 8, not 4. Go left to right with + and −.', 'তেমনি 10 − 4 + 2 = 8, 4 নয়। + ও − বাঁদিক থেকে ডানদিকে করো।'),
    t('When multiplying decimals, count the decimal places in both numbers and put the same total in the answer.', 'দশমিক গুণের সময় দুটি সংখ্যার দশমিক স্থান গুনে উত্তরে মোট ততগুলি স্থান রাখো।'),
    t('Before squaring big numbers, look for a² − b² or a² + 2ab + b². It saves a lot of time.', 'বড় সংখ্যার বর্গ করার আগে a² − b² বা a² + 2ab + b² ছক খোঁজো। অনেক সময় বাঁচে।'),
    t('In the options, check the last digit first: it often rules out wrong answers in seconds.', 'বিকল্পগুলির মধ্যে আগে শেষ অঙ্কটি মিলিয়ে দেখো: এতে কয়েক সেকেন্ডেই ভুল উত্তর বাদ যায়।'),
  ],
};
