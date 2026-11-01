'use strict';

// Chapter lesson: Simplification & BODMAS. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });
const solved = (question, given, find, method, steps, answer, why) => ({
  question: t(question[0], question[1]),
  given: t(given[0], given[1]),
  find: t(find[0], find[1]),
  method: t(method[0], method[1]),
  steps: steps.map(([en, bn]) => t(en, bn)),
  answer: t(answer[0], answer[1]),
  why: t(why[0], why[1]),
});

module.exports = {
  subject: 'quant',
  topic: 'simplification',
  title: t('Simplification & BODMAS', 'সরলীকরণ ও BODMAS'),
  emoji: '🧮',
  intro: t(
    'Simplification means working out a long sum with many signs, step by step, to get one number. A fixed order of steps, called BODMAS, makes sure everyone gets the same answer.',
    'সরলীকরণ মানে অনেকগুলি চিহ্নযুক্ত একটি লম্বা অঙ্ককে ধাপে ধাপে কষে একটি সংখ্যায় পৌঁছানো। BODMAS নামের একটি নির্দিষ্ট ক্রম মেনে চললে সবাই একই উত্তর পায়।',
  ),
  strategy: {
    heading: t('A beginner’s decision guide', 'নতুনদের সিদ্ধান্ত নেওয়ার সহজ কৌশল'),
    sections: [
      { heading: t('1. Copy the expression carefully', '1. রাশিটি সাবধানে লেখো'), body: t('Keep every sign, bracket, fraction bar and decimal point. A small copying change can change the answer.', 'প্রতিটি চিহ্ন, বন্ধনী, ভগ্নাংশের রেখা ও দশমিক বিন্দু ঠিক রাখো। লেখায় সামান্য পরিবর্তনেও উত্তর বদলে যেতে পারে।') },
      { heading: t('2. Start with brackets', '2. বন্ধনী দিয়ে শুরু করো'), body: t('Work inside the innermost brackets first. Replace that bracket with its value before moving outward.', 'সবচেয়ে ভিতরের বন্ধনীর কাজ আগে করো। বাইরের দিকে যাওয়ার আগে বন্ধনীর জায়গায় তার মান বসাও।') },
      { heading: t('3. Do powers and roots next', '3. এরপর ঘাত ও বর্গমূল করো'), body: t('Evaluate orders such as squares, cubes and square roots after brackets, before ordinary multiplication or addition.', 'বন্ধনীর পরে এবং সাধারণ গুণ বা যোগের আগে বর্গ, ঘন ও বর্গমূলের মতো ঘাতের কাজ করো।') },
      { heading: t('4. Treat division and multiplication equally', '4. ভাগ ও গুণকে সমান গুরুত্ব দাও'), body: t('Do division and multiplication from left to right. Do not assume multiplication always comes before division.', 'ভাগ ও গুণ বাঁদিক থেকে ডানদিকে করো। গুণ সবসময় ভাগের আগে হবে—এমন ধরে নিও না।') },
      { heading: t('5. Then add and subtract left to right', '5. শেষে বাঁদিক থেকে যোগ-বিয়োগ করো'), body: t('Addition and subtraction have equal rank. Follow the written order from left to right after higher-priority operations are done.', 'যোগ ও বিয়োগের গুরুত্ব সমান। বেশি অগ্রাধিকারের কাজ শেষে লিখিত ক্রমে বাঁদিক থেকে ডানদিকে এগোও।') },
      { heading: t('6. Check each line and the size', '6. প্রতিটি ধাপ ও উত্তরের মান যাচাই করো'), body: t('Write one clear line per stage and estimate the result. If the estimate is far away, check signs, order and arithmetic again.', 'প্রতি ধাপে একটি পরিষ্কার লাইন লেখো এবং উত্তরটি আনুমানিক যাচাই করো। আনুমানিক মানের সঙ্গে না মিললে চিহ্ন, ক্রম ও হিসাব আবার দেখো।') },
    ],
  },
  practice: {
    question: t('Simplify: 36 ÷ (3 × 2) + 5² − 4.', 'সরল করো: 36 ÷ (3 × 2) + 5² − 4।'),
    steps: [
      t('Bracket first: 3 × 2 = 6; power: 5² = 25. The expression is 36 ÷ 6 + 25 − 4.', 'আগে বন্ধনী: 3 × 2 = 6; ঘাত: 5² = 25। রাশিটি হল 36 ÷ 6 + 25 − 4।'),
      t('Division, then left to right: 6 + 25 − 4 = 31 − 4 = 27.', 'ভাগ করে তারপর বাঁদিক থেকে: 6 + 25 − 4 = 31 − 4 = 27।'),
    ],
    answer: t('27', 'উত্তর 27'),
  },
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
          given: t('Expression: 35 + 5 × 6 − 20 ÷ 2.', 'রাশি: 35 + 5 × 6 − 20 ÷ 2।'),
          find: t('The simplified value.', 'সরলীকৃত মান।'),
          method: t('Do multiplication and division first, then addition and subtraction from left to right.', 'আগে গুণ ও ভাগ, তারপর বাঁদিক থেকে যোগ ও বিয়োগ করি।'),
          steps: [
            t('No brackets or powers. Do × and ÷ first: 5 × 6 = 30 and 20 ÷ 2 = 10.', 'বন্ধনী বা ঘাত নেই। আগে × ও ÷ করো: 5 × 6 = 30 এবং 20 ÷ 2 = 10।'),
            t('Now it is 35 + 30 − 10.', 'এখন হল 35 + 30 − 10।'),
            t('Left to right: 35 + 30 = 65, then 65 − 10 = 55.', 'বাঁদিক থেকে: 35 + 30 = 65, তারপর 65 − 10 = 55।'),
          ],
          answer: t('55', 'উত্তর 55'),
          why: t('The two higher-priority operations become 30 and 10, leaving 35 + 30 − 10.', 'আগের অগ্রাধিকারের কাজ দুটি 30 ও 10 হয়; তখন থাকে 35 + 30 − 10।'),
        },
        {
          question: t('Simplify: 32 + 5 × 3 − 24 ÷ 2', 'সরল করো: 32 + 5 × 3 − 24 ÷ 2'),
          given: t('Expression: 32 + 5 × 3 − 24 ÷ 2.', 'রাশি: 32 + 5 × 3 − 24 ÷ 2।'),
          find: t('The simplified value.', 'সরলীকৃত মান।'),
          method: t('Multiply and divide before adding or subtracting.', 'যোগ বা বিয়োগের আগে গুণ ও ভাগ করি।'),
          steps: [
            t('Multiplication and division first: 5 × 3 = 15 and 24 ÷ 2 = 12.', 'আগে গুণ ও ভাগ: 5 × 3 = 15 এবং 24 ÷ 2 = 12।'),
            t('32 + 15 − 12 = 47 − 12 = 35.', 'তারপর 32 + 15 − 12 = 47 − 12 = 35।'),
          ],
          answer: t('35', 'উত্তর 35'),
          why: t('After the priority operations, 32 + 15 − 12 is evaluated from left to right.', 'অগ্রাধিকারের কাজের পর 32 + 15 − 12 বাঁদিক থেকে হিসাব হয়।'),
        },
        {
          question: t('Simplify: 24 ÷ 4 × 2', 'সরল করো: 24 ÷ 4 × 2'),
          given: t('Expression: 24 ÷ 4 × 2.', 'রাশি: 24 ÷ 4 × 2।'),
          find: t('The simplified value.', 'সরলীকৃত মান।'),
          method: t('Division and multiplication have equal rank; proceed left to right.', 'ভাগ ও গুণের গুরুত্ব সমান; বাঁদিক থেকে এগোই।'),
          steps: [
            t('÷ and × have equal rank, so go from left to right. First 24 ÷ 4 = 6.', '÷ ও × সমান গুরুত্বের, তাই বাঁদিক থেকে ডানদিকে যাও। আগে 24 ÷ 4 = 6।'),
            t('Then 6 × 2 = 12.', 'তারপর 6 × 2 = 12।'),
            t('Common mistake: doing 4 × 2 = 8 first gives 24 ÷ 8 = 3, which is wrong.', 'সাধারণ ভুল: আগে 4 × 2 = 8 করলে 24 ÷ 8 = 3 আসে, যা ভুল।'),
          ],
          answer: t('12', 'উত্তর 12'),
          why: t('The written order is (24 ÷ 4) × 2, not 24 ÷ (4 × 2).', 'লিখিত ক্রমটি (24 ÷ 4) × 2, 24 ÷ (4 × 2) নয়।'),
        },
        solved(
          ['Simplify: (18 + 6) ÷ 3.', 'সরল করো: (18 + 6) ÷ 3।'],
          ['Expression: (18 + 6) ÷ 3.', 'রাশি: (18 + 6) ÷ 3।'],
          ['The simplified value.', 'সরলীকৃত মান।'],
          ['Evaluate the bracket, then divide.', 'আগে বন্ধনীর মান, তারপর ভাগ করি।'],
          [['18 + 6 = 24.', '18 + 6 = 24, তাই যোগফল 24।'], ['24 ÷ 3 = 8.', '24 ÷ 3 = 8, তাই উত্তর 8।']],
          ['8', 'উত্তর 8'],
          ['The bracket groups the addition, so its total is divided by 3.', 'বন্ধনী যোগকে একসঙ্গে রাখে, তাই যোগফলকে 3 দিয়ে ভাগ করতে হয়।'],
        ),
        solved(
          ['Simplify: 5² − 3 × 4.', 'সরল করো: 5² − 3 × 4।'],
          ['Expression: 5² − 3 × 4.', 'রাশি: 5² − 3 × 4।'],
          ['The simplified value.', 'সরলীকৃত মান।'],
          ['Evaluate the power and multiplication before subtraction.', 'বিয়োগের আগে ঘাত ও গুণের কাজ করি।'],
          [['5² = 25 and 3 × 4 = 12.', '5² = 25 এবং 3 × 4 = 12।'], ['25 − 12 = 13.', '25 − 12 = 13, তাই উত্তর 13।']],
          ['13', 'উত্তর 13'],
          ['Powers and multiplication come before subtraction in BODMAS.', 'BODMAS অনুযায়ী বিয়োগের আগে ঘাত ও গুণ হয়।'],
        ),
        solved(
          ['Simplify: 48 ÷ (6 × 2) + 7.', 'সরল করো: 48 ÷ (6 × 2) + 7।'],
          ['Expression: 48 ÷ (6 × 2) + 7.', 'রাশি: 48 ÷ (6 × 2) + 7।'],
          ['The simplified value.', 'সরলীকৃত মান।'],
          ['Solve the bracket first, then divide, then add.', 'আগে বন্ধনী, তারপর ভাগ, তারপর যোগ করি।'],
          [['6 × 2 = 12, so the expression becomes 48 ÷ 12 + 7.', '6 × 2 = 12, তাই রাশিটি হয় 48 ÷ 12 + 7।'], ['48 ÷ 12 = 4; 4 + 7 = 11.', '48 ÷ 12 = 4; 4 + 7 = 11, তাই উত্তর 11।']],
          ['11', 'উত্তর 11'],
          ['The bracket makes 6 × 2 the divisor; it must be completed before division.', 'বন্ধনীতে 6 × 2-ই ভাজক; ভাগের আগে বন্ধনীর কাজ শেষ করতে হয়।'],
        ),
        solved(
          ['Simplify: 3/4 + 1/2 × 2.', 'সরল করো: 3/4 + 1/2 × 2।'],
          ['Expression: 3/4 + 1/2 × 2.', 'রাশি: 3/4 + 1/2 × 2।'],
          ['The simplified value.', 'সরলীকৃত মান।'],
          ['Multiply before adding, then express the result as a fraction.', 'যোগের আগে গুণ করি, তারপর ভগ্নাংশে উত্তর লিখি।'],
          [['1/2 × 2 = 1.', '1/2 × 2 = 1, তাই গুণফল 1।'], ['3/4 + 1 = 3/4 + 4/4 = 7/4 = 1 3/4.', '3/4 + 1 = 3/4 + 4/4 = 7/4 = 1 3/4, তাই যোগফল 1 3/4।']],
          ['7/4 (or 1 3/4).', '7/4 (অথবা 1 3/4)।'],
          ['Multiplication is completed before addition, and equal denominators make the sum clear.', 'যোগের আগে গুণ হয়, আর সমান হর করলে যোগটি সহজে বোঝা যায়।'],
        ),
        solved(
          ['Simplify: (2.5 + 1.5) × 3 − 4.', 'সরল করো: (2.5 + 1.5) × 3 − 4।'],
          ['Expression: (2.5 + 1.5) × 3 − 4.', 'রাশি: (2.5 + 1.5) × 3 − 4।'],
          ['The simplified value.', 'সরলীকৃত মান।'],
          ['Add inside brackets, multiply, then subtract.', 'বন্ধনীর ভিতর যোগ, তারপর গুণ, শেষে বিয়োগ করি।'],
          [['2.5 + 1.5 = 4; then 4 × 3 = 12.', '2.5 + 1.5 = 4; এরপর 4 × 3 = 12।'], ['12 − 4 = 8.', '12 − 4 = 8, তাই উত্তর 8।']],
          ['8', 'উত্তর 8'],
          ['Following the brackets first keeps the grouped sum together.', 'আগে বন্ধনী করলে একসঙ্গে রাখা যোগফলটি ঠিকভাবে গুণ হয়।'],
        ),
        solved(
          ['Simplify: √81 + 2³ × 2.', 'সরল করো: √81 + 2³ × 2।'],
          ['Expression: √81 + 2³ × 2.', 'রাশি: √81 + 2³ × 2।'],
          ['The simplified value.', 'সরলীকৃত মান।'],
          ['Find the root and power, multiply, and then add.', 'বর্গমূল ও ঘাত বের করে গুণ, তারপর যোগ করি।'],
          [['√81 = 9 and 2³ = 8; then 8 × 2 = 16.', '√81 = 9 এবং 2³ = 8; এরপর 8 × 2 = 16।'], ['9 + 16 = 25.', '9 + 16 = 25, তাই উত্তর 25।']],
          ['25', 'উত্তর 25'],
          ['Orders are evaluated before multiplication, and multiplication before addition.', 'গুণের আগে ঘাতের কাজ এবং যোগের আগে গুণের কাজ হয়।'],
        ),
        solved(
          ['Simplify: 72 ÷ 8 × 3 − 5.', 'সরল করো: 72 ÷ 8 × 3 − 5।'],
          ['Expression: 72 ÷ 8 × 3 − 5.', 'রাশি: 72 ÷ 8 × 3 − 5।'],
          ['The simplified value.', 'সরলীকৃত মান।'],
          ['Do division and multiplication left to right, then subtract.', 'ভাগ ও গুণ বাঁদিক থেকে করে শেষে বিয়োগ করি।'],
          [['72 ÷ 8 = 9; then 9 × 3 = 27.', '72 ÷ 8 = 9; এরপর 9 × 3 = 27।'], ['27 − 5 = 22.', '27 − 5 = 22, তাই উত্তর 22।']],
          ['22', 'উত্তর 22'],
          ['Division and multiplication share a rank, so the left operation is done first.', 'ভাগ ও গুণের গুরুত্ব সমান, তাই বাঁদিকের কাজটি আগে হয়।'],
        ),
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
