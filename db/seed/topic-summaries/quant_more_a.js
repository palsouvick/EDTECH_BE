'use strict';

/**
 * "How to solve" concept sheets for Quantitative Aptitude (part A):
 * simplification, algebra, mensuration.
 * Format: see ./validate.js header.
 *
 *   node db/seed/topic-summaries/validate.js db/seed/topic-summaries/quant_more_a.js
 */

// String.raw keeps LaTeX backslashes readable (\frac instead of \\frac).
const r = String.raw;
const t = (en, bn) => ({ en, bn });
const v = (symbol, en, bn) => ({ symbol, meaning: { en, bn } });

module.exports = [
  // ───────────────────────────── SIMPLIFICATION ─────────────────────────────
  {
    subject: 'quant',
    topic: 'simplification',
    title: { en: 'Simplification & BODMAS', bn: 'সরলীকরণ ও BODMAS', hi: 'सरलीकरण और BODMAS' },
    overview: t(
      r`Simplification questions test whether you apply the **order of operations (VBODMAS)** correctly and quickly: Vinculum (bar), Brackets $( \,) \to \{ \,\} \to [ \,]$, Of, Division and Multiplication (left to right), then Addition and Subtraction (left to right). Most sums also mix fractions, decimals, **indices and surds**, so convert everything to one convenient form first (same base for powers, fractions for recurring decimals). In "approximate value" questions, round each number to a friendly value and pick the nearest option. Always look for a hidden identity such as $\frac{a^2 - b^2}{a + b} = a - b$, and verify long products with the **digit-sum (casting out nines) check** or the unit digit instead of recomputing.`,
      r`সরলীকরণের প্রশ্নে দেখা হয় আপনি **ক্রিয়ার ক্রম (VBODMAS)** ঠিকভাবে ও দ্রুত প্রয়োগ করতে পারছেন কি না: রেখাবন্ধনী (Vinculum), বন্ধনী $( \,) \to \{ \,\} \to [ \,]$, Of (এর), তারপর ভাগ ও গুণ (বাঁ দিক থেকে ডান দিকে), শেষে যোগ ও বিয়োগ (বাঁ দিক থেকে ডান দিকে)। বেশিরভাগ অঙ্কে ভগ্নাংশ, দশমিক, **সূচক ও করণী** মেশানো থাকে, তাই আগে সবকিছুকে একটি সুবিধাজনক রূপে আনুন (ঘাতের ক্ষেত্রে একই ভিত্তি, আবৃত্ত দশমিককে ভগ্নাংশ)। "আসন্ন মান" প্রশ্নে প্রতিটি সংখ্যাকে কাছাকাছি সহজ সংখ্যায় পরিণত করে নিকটতম বিকল্পটি বেছে নিন। সর্বদা লুকোনো অভেদ খুঁজুন, যেমন $\frac{a^2 - b^2}{a + b} = a - b$, এবং বড় গুণফল আবার না কষে **অঙ্কের যোগফল (9 বাদ দেওয়া) পদ্ধতি** বা একক অঙ্ক দিয়ে যাচাই করুন।`,
    ),
    formulas: [
      {
        key: 'vbodmas_order',
        label: t('Order of operations (VBODMAS)', 'ক্রিয়ার ক্রম (VBODMAS)'),
        latex: r`\overline{\;\;} \to (\,) \to \{\,\} \to [\,] \to \text{of} \to \div, \times \to +, -`,
        explanation: t(
          r`Division and multiplication have equal priority and are done **left to right**; so are addition and subtraction. "Of" means multiply, but it is done **before** division: $48 \div 4 \text{ of } 3 = 48 \div 12 = 4$.`,
          r`ভাগ ও গুণের অগ্রাধিকার সমান, এগুলি **বাঁ দিক থেকে ডান দিকে** করতে হয়; যোগ ও বিয়োগের ক্ষেত্রেও তাই। "Of (এর)" মানে গুণ, কিন্তু তা ভাগের **আগে** করতে হয়: $48 \div 4 \text{ of } 3 = 48 \div 12 = 4$।`,
        ),
      },
      {
        key: 'laws_of_indices',
        label: t('Laws of indices', 'সূচকের নিয়মাবলি'),
        latex: r`a^m a^n = a^{m+n},\quad \dfrac{a^m}{a^n} = a^{m-n},\quad (a^m)^n = a^{mn},\quad (ab)^n = a^n b^n`,
        variables: [v('a, b', 'Non-zero bases', 'অশূন্য ভিত্তি'), v('m, n', 'Indices (powers)', 'সূচক (ঘাত)')],
      },
      {
        key: 'zero_negative_fractional_index',
        label: t('Zero, negative and fractional indices', 'শূন্য, ঋণাত্মক ও ভগ্নাংশ সূচক'),
        latex: r`a^0 = 1,\quad a^{-n} = \dfrac{1}{a^n},\quad a^{p/q} = \sqrt[q]{a^p} = \left(\sqrt[q]{a}\right)^p`,
        explanation: t(
          r`Example: $27^{2/3} = (\sqrt[3]{27})^2 = 3^2 = 9$ and $\left(\frac{4}{9}\right)^{-1/2} = \frac{3}{2}$.`,
          r`উদাহরণ: $27^{2/3} = (\sqrt[3]{27})^2 = 3^2 = 9$ এবং $\left(\frac{4}{9}\right)^{-1/2} = \frac{3}{2}$।`,
        ),
      },
      {
        key: 'surd_rationalise',
        label: t('Surds: product rule and rationalising', 'করণী: গুণের নিয়ম ও হরের করণী-মুক্তকরণ'),
        latex: r`\sqrt{ab} = \sqrt{a}\,\sqrt{b},\qquad \dfrac{1}{\sqrt{a} + \sqrt{b}} = \dfrac{\sqrt{a} - \sqrt{b}}{a - b}`,
        explanation: t(
          r`Multiply numerator and denominator by the **conjugate**. Example: $\frac{1}{\sqrt{3} + \sqrt{2}} = \sqrt{3} - \sqrt{2}$ because $3 - 2 = 1$. Note $\sqrt{a + b} \ne \sqrt{a} + \sqrt{b}$.`,
          r`লব ও হরকে **অনুবন্ধী (conjugate)** করণী দিয়ে গুণ করুন। উদাহরণ: $\frac{1}{\sqrt{3} + \sqrt{2}} = \sqrt{3} - \sqrt{2}$, কারণ $3 - 2 = 1$। মনে রাখুন $\sqrt{a + b} \ne \sqrt{a} + \sqrt{b}$।`,
        ),
      },
      {
        key: 'square_root_of_surd',
        label: t('Square root of a + 2√b', 'a + 2√b-এর বর্গমূল'),
        latex: r`\sqrt{a \pm 2\sqrt{b}} = \sqrt{x} \pm \sqrt{y},\quad \text{where } x + y = a,\; xy = b,\; x > y`,
        explanation: t(
          r`Find two numbers with sum $a$ and product $b$. Example: $\sqrt{5 + 2\sqrt{6}} = \sqrt{3} + \sqrt{2}$ (since $3 + 2 = 5$, $3 \times 2 = 6$).`,
          r`এমন দুটি সংখ্যা খুঁজুন যাদের যোগফল $a$ ও গুণফল $b$। উদাহরণ: $\sqrt{5 + 2\sqrt{6}} = \sqrt{3} + \sqrt{2}$ (কারণ $3 + 2 = 5$, $3 \times 2 = 6$)।`,
        ),
      },
      {
        key: 'nested_roots',
        label: t('Repeated (nested) roots', 'পুনরাবৃত্ত (নেস্টেড) বর্গমূল'),
        latex: r`\sqrt{x\sqrt{x\sqrt{x\cdots}}} = x,\qquad \underbrace{\sqrt{x\sqrt{x\cdots\sqrt{x}}}}_{n \text{ roots}} = x^{\frac{2^n - 1}{2^n}}`,
        explanation: t(
          r`If $x = n(n+1)$ then $\sqrt{x + \sqrt{x + \cdots}} = n + 1$ and $\sqrt{x - \sqrt{x - \cdots}} = n$. Example: $\sqrt{12 + \sqrt{12 + \cdots}} = 4$, $\sqrt{12 - \sqrt{12 - \cdots}} = 3$ (since $12 = 3 \times 4$).`,
          r`যদি $x = n(n+1)$ হয়, তবে $\sqrt{x + \sqrt{x + \cdots}} = n + 1$ এবং $\sqrt{x - \sqrt{x - \cdots}} = n$। উদাহরণ: $\sqrt{12 + \sqrt{12 + \cdots}} = 4$, $\sqrt{12 - \sqrt{12 - \cdots}} = 3$ (কারণ $12 = 3 \times 4$)।`,
        ),
      },
      {
        key: 'recurring_decimal',
        label: t('Recurring decimal to fraction', 'আবৃত্ত দশমিক থেকে ভগ্নাংশ'),
        latex: r`0.\overline{ab} = \dfrac{ab}{99},\qquad 0.a\overline{b} = \dfrac{ab - a}{90}`,
        explanation: t(
          r`Pure recurring: write the repeating digits over as many 9s. Mixed: (all digits $-$ non-repeating digits) over 9s for the repeating part followed by 0s for the non-repeating part. Examples: $0.\overline{36} = \frac{36}{99} = \frac{4}{11}$, $0.1\overline{6} = \frac{16 - 1}{90} = \frac{1}{6}$.`,
          r`বিশুদ্ধ আবৃত্ত: আবৃত্ত অঙ্কগুলিকে লবে লিখুন, হরে ততগুলি 9। মিশ্র আবৃত্ত: (সব অঙ্ক $-$ অনাবৃত্ত অঙ্ক) লবে, হরে আবৃত্ত অঙ্কের সমান সংখ্যক 9 এবং তার পরে অনাবৃত্ত অঙ্কের সমান সংখ্যক 0। উদাহরণ: $0.\overline{36} = \frac{36}{99} = \frac{4}{11}$, $0.1\overline{6} = \frac{16 - 1}{90} = \frac{1}{6}$।`,
        ),
      },
      {
        key: 'simplification_identities',
        label: t('Identities hidden in simplification', 'সরলীকরণে লুকোনো অভেদ'),
        latex: r`\dfrac{a^2 - b^2}{a + b} = a - b,\qquad \dfrac{a^3 + b^3}{a^2 - ab + b^2} = a + b,\qquad \dfrac{a^3 - b^3}{a^2 + ab + b^2} = a - b`,
        explanation: t(
          r`Example: $\frac{0.75^3 + 0.25^3}{0.75^2 - 0.75 \times 0.25 + 0.25^2} = 0.75 + 0.25 = 1$.`,
          r`উদাহরণ: $\frac{0.75^3 + 0.25^3}{0.75^2 - 0.75 \times 0.25 + 0.25^2} = 0.75 + 0.25 = 1$।`,
        ),
      },
      {
        key: 'digit_sum_check',
        label: t('Digit-sum (casting out nines) check', 'অঙ্কের যোগফল (9 বাদ দেওয়া) যাচাই'),
        latex: r`S(a \times b) \equiv S(a) \times S(b) \pmod{9},\qquad S(a \pm b) \equiv S(a) \pm S(b) \pmod{9}`,
        variables: [v('S(n)', 'Repeated digit sum of n (a 9 counts as 0)', 'n-এর অঙ্কগুলির বারবার যোগফল (9-কে 0 ধরা হয়)')],
      },
      {
        key: 'square_ending_5',
        label: t('Square of a number ending in 5', '5 দিয়ে শেষ হওয়া সংখ্যার বর্গ'),
        latex: r`(10n + 5)^2 = 100\,n(n + 1) + 25`,
        explanation: t(
          r`Example: $75^2$: $7 \times 8 = 56$, then append $25$, giving $5625$.`,
          r`উদাহরণ: $75^2$: $7 \times 8 = 56$, তার পরে $25$ বসালে $5625$।`,
        ),
      },
    ],
    derivation_rules: [
      {
        title: t('Open the brackets from the inside out', 'ভিতরের বন্ধনী থেকে বাইরের দিকে খুলুন'),
        body: t(
          r`Remove the vinculum first, then $( \,)$, $\{ \,\}$, $[ \,]$ in that order; inside each bracket follow the same VBODMAS order.

Example: $18 - [5 - \{6 + 2(7 - \overline{8 - 3})\}]$: bar $= 5$; $7 - 5 = 2$; $2 \times 2 = 4$; $6 + 4 = 10$; $5 - 10 = -5$; $18 - (-5) = 23$.`,
          r`প্রথমে রেখাবন্ধনী, তারপর ক্রমানুসারে $( \,)$, $\{ \,\}$, $[ \,]$ সরান; প্রতিটি বন্ধনীর ভিতরেও একই VBODMAS ক্রম মেনে চলুন।

উদাহরণ: $18 - [5 - \{6 + 2(7 - \overline{8 - 3})\}]$: রেখাবন্ধনী $= 5$; $7 - 5 = 2$; $2 \times 2 = 4$; $6 + 4 = 10$; $5 - 10 = -5$; $18 - (-5) = 23$।`,
        ),
      },
      {
        title: t('Indices: bring everything to one base', 'সূচক: সবকিছুকে একই ভিত্তিতে আনুন'),
        body: t(
          r`Write each number as a power of a prime ($8 = 2^3$, $27 = 3^3$, $0.25 = 2^{-2}$), apply the laws of indices, then compare exponents.

Example: $2^{x+3} = 32 = 2^5 \Rightarrow x + 3 = 5 \Rightarrow x = 2$. Also $27^{2/3} \times 9^{-1/2} = 9 \times \frac{1}{3} = 3$.`,
          r`প্রতিটি সংখ্যাকে মৌলিক সংখ্যার ঘাত হিসেবে লিখুন ($8 = 2^3$, $27 = 3^3$, $0.25 = 2^{-2}$), সূচকের নিয়ম প্রয়োগ করুন, তারপর সূচকগুলি তুলনা করুন।

উদাহরণ: $2^{x+3} = 32 = 2^5 \Rightarrow x + 3 = 5 \Rightarrow x = 2$। আবার $27^{2/3} \times 9^{-1/2} = 9 \times \frac{1}{3} = 3$।`,
        ),
      },
      {
        title: t('Approximation: round, compute, choose nearest', 'আসন্ন মান: পূর্ণসংখ্যায় আনুন, কষুন, নিকটতম বাছুন'),
        body: t(
          r`Round decimals and percentages to the nearest convenient value, and square roots to the nearest perfect square. Then compute and choose the closest option.

Example: $39.89\%$ of $1200.15 + 14.95 \times 7.99 \approx 40\%$ of $1200 + 15 \times 8 = 480 + 120 = 600$. Similarly $\sqrt{1520} \approx 39$ because $39^2 = 1521$.`,
          r`দশমিক ও শতকরাকে কাছাকাছি সহজ মানে, আর বর্গমূলকে নিকটতম পূর্ণবর্গে পরিণত করুন। তারপর হিসাব করে সবচেয়ে কাছের বিকল্পটি বাছুন।

উদাহরণ: $1200.15$-এর $39.89\% + 14.95 \times 7.99 \approx 1200$-এর $40\% + 15 \times 8 = 480 + 120 = 600$। একইভাবে $\sqrt{1520} \approx 39$, কারণ $39^2 = 1521$।`,
        ),
      },
      {
        title: t('Comparing surds: equalise the root order', 'করণীর তুলনা: মূলের ক্রম সমান করুন'),
        body: t(
          r`To compare $\sqrt[m]{a}$ and $\sqrt[n]{b}$, raise both to the power $\text{LCM}(m, n)$.

Example: $\sqrt[3]{4}$ vs $\sqrt{3}$: raise to the 6th power: $4^2 = 16$ and $3^3 = 27$, so $\sqrt{3} > \sqrt[3]{4}$.`,
          r`$\sqrt[m]{a}$ ও $\sqrt[n]{b}$ তুলনা করতে দুটিকেই $\text{LCM}(m, n)$ ঘাতে তুলুন।

উদাহরণ: $\sqrt[3]{4}$ বনাম $\sqrt{3}$: 6 ঘাতে তুললে $4^2 = 16$ এবং $3^3 = 27$, তাই $\sqrt{3} > \sqrt[3]{4}$।`,
        ),
      },
    ],
    speed_tricks: [
      {
        title: t('Verify with the digit sum', 'অঙ্কের যোগফল দিয়ে যাচাই'),
        body: t(
          r`Reduce each number to a single digit by adding its digits, do the same operation on these digits, and keep only the options with a matching digit sum.

Example: $457 \times 38$: $4 + 5 + 7 = 16 \to 7$ and $3 + 8 = 11 \to 2$; $7 \times 2 = 14 \to 5$. The answer $17366$ has digit sum $23 \to 5$, so it fits.`,
          r`প্রতিটি সংখ্যার অঙ্কগুলি যোগ করে একটি অঙ্কে নামিয়ে আনুন, সেই অঙ্কগুলিতে একই ক্রিয়া করুন, এবং যে বিকল্পের অঙ্ক-যোগফল মেলে শুধু সেটিই রাখুন।

উদাহরণ: $457 \times 38$: $4 + 5 + 7 = 16 \to 7$ এবং $3 + 8 = 11 \to 2$; $7 \times 2 = 14 \to 5$। উত্তর $17366$-এর অঙ্ক-যোগফল $23 \to 5$, তাই এটি মেলে।`,
        ),
        approx_time_saved_sec: 30,
      },
      {
        title: t('Unit-digit elimination', 'একক অঙ্ক দিয়ে বাদ দেওয়া'),
        body: t(
          r`When the options differ in their last digit, compute only the last digit.

Example: $87 \times 63$ ends in $1$ (since $7 \times 3 = 21$), so the answer is $5481$ without full multiplication.`,
          r`বিকল্পগুলির শেষ অঙ্ক আলাদা হলে শুধু শেষ অঙ্কটি হিসাব করুন।

উদাহরণ: $87 \times 63$-এর শেষ অঙ্ক $1$ (কারণ $7 \times 3 = 21$), তাই পুরো গুণ না করেই উত্তর $5481$।`,
        ),
        approx_time_saved_sec: 20,
      },
      {
        title: t('Mixed fractions: add whole parts separately', 'মিশ্র ভগ্নাংশ: পূর্ণ অংশ আলাদা করে যোগ করুন'),
        body: t(
          r`Example: $3\frac{1}{2} + 2\frac{1}{3} - 1\frac{1}{4} = (3 + 2 - 1) + \left(\frac{1}{2} + \frac{1}{3} - \frac{1}{4}\right) = 4 + \frac{6 + 4 - 3}{12} = 4\frac{7}{12}$.`,
          r`উদাহরণ: $3\frac{1}{2} + 2\frac{1}{3} - 1\frac{1}{4} = (3 + 2 - 1) + \left(\frac{1}{2} + \frac{1}{3} - \frac{1}{4}\right) = 4 + \frac{6 + 4 - 3}{12} = 4\frac{7}{12}$।`,
        ),
        approx_time_saved_sec: 20,
      },
      {
        title: t('Spot the identity before calculating', 'হিসাবের আগে অভেদটি চিনে নিন'),
        body: t(
          r`Large squares or cubes in a fraction almost always hide an identity.

Example: $\frac{987^2 - 13^2}{987 + 13} = 987 - 13 = 974$ — no squaring needed.`,
          r`ভগ্নাংশে বড় বর্গ বা ঘন থাকলে প্রায় সবসময় একটি অভেদ লুকিয়ে থাকে।

উদাহরণ: $\frac{987^2 - 13^2}{987 + 13} = 987 - 13 = 974$ — বর্গ করার দরকার নেই।`,
        ),
        approx_time_saved_sec: 40,
      },
    ],
    common_traps: [
      t(
        r`**"Of" before division.** $48 \div 4 \text{ of } 3 = 48 \div 12 = 4$, not $12 \times 3 = 36$. But $48 \div 4 \times 3 = 36$ (left to right).`,
        r`**ভাগের আগে "of"।** $48 \div 4 \text{ of } 3 = 48 \div 12 = 4$, $12 \times 3 = 36$ নয়। কিন্তু $48 \div 4 \times 3 = 36$ (বাঁ দিক থেকে ডান দিকে)।`,
      ),
      t(
        r`**Addition is not done before subtraction.** $20 - 5 + 3 = 18$ (left to right), not $20 - 8 = 12$.`,
        r`**বিয়োগের আগে যোগ করা হয় না।** $20 - 5 + 3 = 18$ (বাঁ দিক থেকে ডান দিকে), $20 - 8 = 12$ নয়।`,
      ),
      t(
        r`**The bar is a bracket.** $10 - \overline{6 - 2} = 10 - 4 = 6$, not $10 - 6 - 2 = 2$.`,
        r`**রেখাবন্ধনী একটি বন্ধনী।** $10 - \overline{6 - 2} = 10 - 4 = 6$, $10 - 6 - 2 = 2$ নয়।`,
      ),
      t(
        r`**Roots do not split over addition.** $\sqrt{16 + 9} = \sqrt{25} = 5$, not $4 + 3 = 7$; likewise $(a + b)^2 \ne a^2 + b^2$.`,
        r`**যোগের উপর বর্গমূল ভাগ হয় না।** $\sqrt{16 + 9} = \sqrt{25} = 5$, $4 + 3 = 7$ নয়; একইভাবে $(a + b)^2 \ne a^2 + b^2$।`,
      ),
      t(
        r`**Sign of a negative base.** $(-2)^4 = 16$ but $-2^4 = -(2^4) = -16$; an even power of a negative number is positive, an odd power is negative.`,
        r`**ঋণাত্মক ভিত্তির চিহ্ন।** $(-2)^4 = 16$ কিন্তু $-2^4 = -(2^4) = -16$; ঋণাত্মক সংখ্যার জোড় ঘাত ধনাত্মক, বিজোড় ঘাত ঋণাত্মক।`,
      ),
    ],
  },

  // ───────────────────────────── ALGEBRA ─────────────────────────────
  {
    subject: 'quant',
    topic: 'algebra',
    title: { en: 'Algebra', bn: 'বীজগণিত', hi: 'बीजगणित' },
    overview: t(
      r`Exam algebra is mostly about **standard identities** applied quickly: squares and cubes of binomials, $a^3 + b^3 + c^3 - 3abc$, and the $x + \frac{1}{x}$ family. First rewrite the given condition into a known form (for example, divide $x^2 - 5x + 1 = 0$ by $x$ to get $x + \frac{1}{x} = 5$), then build the required expression step by step. When a condition is symmetric, such as $a + b + c = 0$, you can often **substitute simple values** that satisfy it and check the options. For linear equations use elimination; for polynomials use the remainder theorem; and remember that a sum of squares equal to zero forces each square to be zero.`,
      r`পরীক্ষার বীজগণিত মূলত **প্রচলিত অভেদগুলির** দ্রুত প্রয়োগ: দ্বিপদের বর্গ ও ঘন, $a^3 + b^3 + c^3 - 3abc$, এবং $x + \frac{1}{x}$ ধরনের রাশি। প্রথমে দেওয়া শর্তটিকে একটি পরিচিত রূপে লিখুন (যেমন $x^2 - 5x + 1 = 0$-কে $x$ দিয়ে ভাগ করলে $x + \frac{1}{x} = 5$), তারপর ধাপে ধাপে নির্ণেয় রাশিটি গড়ে তুলুন। শর্তটি প্রতিসম হলে, যেমন $a + b + c = 0$, প্রায়ই শর্ত মেনে চলা **সহজ মান বসিয়ে** বিকল্পগুলি যাচাই করা যায়। রৈখিক সমীকরণে অপনয়ন পদ্ধতি, বহুপদীতে ভাগশেষ উপপাদ্য ব্যবহার করুন; আর মনে রাখুন, কয়েকটি বর্গের যোগফল শূন্য হলে প্রতিটি বর্গই শূন্য।`,
    ),
    formulas: [
      {
        key: 'square_identities',
        label: t('Squares of a binomial', 'দ্বিপদের বর্গ'),
        latex: r`(a \pm b)^2 = a^2 \pm 2ab + b^2,\qquad (a + b)^2 - (a - b)^2 = 4ab`,
        explanation: t(
          r`Also $(a + b)^2 + (a - b)^2 = 2(a^2 + b^2)$ and $a^2 - b^2 = (a + b)(a - b)$.`,
          r`এছাড়া $(a + b)^2 + (a - b)^2 = 2(a^2 + b^2)$ এবং $a^2 - b^2 = (a + b)(a - b)$।`,
        ),
      },
      {
        key: 'cube_identities',
        label: t('Cubes of a binomial', 'দ্বিপদের ঘন'),
        latex: r`(a + b)^3 = a^3 + b^3 + 3ab(a + b),\qquad (a - b)^3 = a^3 - b^3 - 3ab(a - b)`,
      },
      {
        key: 'sum_difference_cubes',
        label: t('Sum and difference of cubes', 'ঘনের যোগফল ও অন্তরফল'),
        latex: r`a^3 + b^3 = (a + b)(a^2 - ab + b^2),\qquad a^3 - b^3 = (a - b)(a^2 + ab + b^2)`,
        explanation: t(
          r`In terms of $a + b$ and $ab$: $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$.`,
          r`$a + b$ ও $ab$-এর সাহায্যে: $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$।`,
        ),
      },
      {
        key: 'trinomial_square',
        label: t('Square of a trinomial', 'ত্রিপদের বর্গ'),
        latex: r`(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)`,
      },
      {
        key: 'abc_identity',
        label: t('Identity for a³ + b³ + c³ − 3abc', 'a³ + b³ + c³ − 3abc-এর অভেদ'),
        latex: r`a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)`,
        explanation: t(
          r`Hence **if $a + b + c = 0$, then $a^3 + b^3 + c^3 = 3abc$**. Also $a^2 + b^2 + c^2 - ab - bc - ca = \frac{1}{2}\left[(a - b)^2 + (b - c)^2 + (c - a)^2\right]$.`,
          r`অতএব **$a + b + c = 0$ হলে $a^3 + b^3 + c^3 = 3abc$**। এছাড়া $a^2 + b^2 + c^2 - ab - bc - ca = \frac{1}{2}\left[(a - b)^2 + (b - c)^2 + (c - a)^2\right]$।`,
        ),
      },
      {
        key: 'x_plus_1_by_x',
        label: t('If x + 1/x = k', 'যদি x + 1/x = k হয়'),
        latex: r`x^2 + \dfrac{1}{x^2} = k^2 - 2,\qquad x^3 + \dfrac{1}{x^3} = k^3 - 3k,\qquad x^4 + \dfrac{1}{x^4} = (k^2 - 2)^2 - 2`,
        explanation: t(
          r`Also $x - \frac{1}{x} = \pm\sqrt{k^2 - 4}$ and $x^2 - \frac{1}{x^2} = \left(x + \frac{1}{x}\right)\left(x - \frac{1}{x}\right)$.`,
          r`এছাড়া $x - \frac{1}{x} = \pm\sqrt{k^2 - 4}$ এবং $x^2 - \frac{1}{x^2} = \left(x + \frac{1}{x}\right)\left(x - \frac{1}{x}\right)$।`,
        ),
      },
      {
        key: 'x_minus_1_by_x',
        label: t('If x − 1/x = m', 'যদি x − 1/x = m হয়'),
        latex: r`x^2 + \dfrac{1}{x^2} = m^2 + 2,\qquad x^3 - \dfrac{1}{x^3} = m^3 + 3m`,
      },
      {
        key: 'special_values_x_1_by_x',
        label: t('Special values of x + 1/x', 'x + 1/x-এর বিশেষ মান'),
        latex: r`x + \tfrac{1}{x} = 2 \Rightarrow x = 1;\quad x + \tfrac{1}{x} = 1 \Rightarrow x^3 = -1;\quad x + \tfrac{1}{x} = -1 \Rightarrow x^3 = 1;\quad x + \tfrac{1}{x} = \sqrt{3} \Rightarrow x^6 = -1`,
        explanation: t(
          r`Use these to find high powers: if $x + \frac{1}{x} = 1$ then $x^3 + \frac{1}{x^3} = -2$; if $x + \frac{1}{x} = \sqrt{3}$ then $x^3 + \frac{1}{x^3} = 0$. Also $x + \frac{1}{x} = -2 \Rightarrow x = -1$. (No real $x$ gives $x + \frac{1}{x} = 1$ or $\sqrt{3}$: for real $x > 0$ the sum is always at least 2. These values come from complex roots, but the exam shortcut still works.)`,
          r`বড় ঘাত বের করতে এগুলি কাজে লাগান: $x + \frac{1}{x} = 1$ হলে $x^3 + \frac{1}{x^3} = -2$; $x + \frac{1}{x} = \sqrt{3}$ হলে $x^3 + \frac{1}{x^3} = 0$। এছাড়া $x + \frac{1}{x} = -2 \Rightarrow x = -1$। (কোনো বাস্তব $x$-এর জন্য $x + \frac{1}{x} = 1$ বা $\sqrt{3}$ হয় না: ধনাত্মক বাস্তব $x$-এ যোগফল সবসময় অন্তত 2। মানগুলি জটিল মূল থেকে আসে, তবে পরীক্ষার শর্টকাটটি ঠিকই কাজ করে।)`,
        ),
      },
      {
        key: 'linear_pair_conditions',
        label: t('Pair of linear equations: number of solutions', 'রৈখিক সমীকরণ-জোড়: সমাধানের সংখ্যা'),
        latex: r`\dfrac{a_1}{a_2} \ne \dfrac{b_1}{b_2}:\ \text{unique};\quad \dfrac{a_1}{a_2} = \dfrac{b_1}{b_2} \ne \dfrac{c_1}{c_2}:\ \text{none};\quad \dfrac{a_1}{a_2} = \dfrac{b_1}{b_2} = \dfrac{c_1}{c_2}:\ \text{infinite}`,
        explanation: t(
          r`For $a_1x + b_1y = c_1$ and $a_2x + b_2y = c_2$, the unique solution is $x = \frac{c_1b_2 - c_2b_1}{a_1b_2 - a_2b_1}$, $y = \frac{a_1c_2 - a_2c_1}{a_1b_2 - a_2b_1}$.`,
          r`$a_1x + b_1y = c_1$ ও $a_2x + b_2y = c_2$-এর একমাত্র সমাধান $x = \frac{c_1b_2 - c_2b_1}{a_1b_2 - a_2b_1}$, $y = \frac{a_1c_2 - a_2c_1}{a_1b_2 - a_2b_1}$।`,
        ),
      },
      {
        key: 'quadratic_roots',
        label: t('Roots of a quadratic', 'দ্বিঘাত সমীকরণের বীজ'),
        latex: r`ax^2 + bx + c = 0:\quad \alpha + \beta = -\dfrac{b}{a},\quad \alpha\beta = \dfrac{c}{a},\quad x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}`,
        explanation: t(
          r`Roots are real and distinct if $b^2 - 4ac > 0$, equal if $= 0$, not real if $< 0$.`,
          r`$b^2 - 4ac > 0$ হলে বীজ বাস্তব ও অসমান, $= 0$ হলে সমান, $< 0$ হলে বাস্তব নয়।`,
        ),
      },
    ],
    derivation_rules: [
      {
        title: t('Climb the x + 1/x ladder', 'x + 1/x-এর ধাপ বেয়ে উঠুন'),
        body: t(
          r`Convert the given equation to $x + \frac{1}{x} = k$, then build higher powers one step at a time.

Example: $x^2 - 5x + 1 = 0 \Rightarrow x + \frac{1}{x} = 5$. Then $x^2 + \frac{1}{x^2} = 25 - 2 = 23$, $x^3 + \frac{1}{x^3} = 125 - 15 = 110$, $x^4 + \frac{1}{x^4} = 23^2 - 2 = 527$.`,
          r`দেওয়া সমীকরণটিকে $x + \frac{1}{x} = k$ রূপে আনুন, তারপর এক এক ধাপে বড় ঘাত গড়ে তুলুন।

উদাহরণ: $x^2 - 5x + 1 = 0 \Rightarrow x + \frac{1}{x} = 5$। তাহলে $x^2 + \frac{1}{x^2} = 25 - 2 = 23$, $x^3 + \frac{1}{x^3} = 125 - 15 = 110$, $x^4 + \frac{1}{x^4} = 23^2 - 2 = 527$।`,
        ),
      },
      {
        title: t('Work with sum and product', 'যোগফল ও গুণফল দিয়ে কাজ করুন'),
        body: t(
          r`For symmetric expressions in $a$ and $b$, express everything in $a + b$ and $ab$ instead of finding $a$ and $b$.

Example: $a + b = 7$, $ab = 12$: $a^2 + b^2 = 49 - 24 = 25$ and $a^3 + b^3 = 7^3 - 3 \times 12 \times 7 = 343 - 252 = 91$.`,
          r`$a$ ও $b$-এর প্রতিসম রাশিতে $a$, $b$ আলাদা করে না বের করে সবকিছু $a + b$ ও $ab$-এর মাধ্যমে প্রকাশ করুন।

উদাহরণ: $a + b = 7$, $ab = 12$: $a^2 + b^2 = 49 - 24 = 25$ এবং $a^3 + b^3 = 7^3 - 3 \times 12 \times 7 = 343 - 252 = 91$।`,
        ),
      },
      {
        title: t('Use a + b + c = 0', 'a + b + c = 0 শর্তের ব্যবহার'),
        body: t(
          r`Whenever three terms add to zero, their cubes add to three times their product.

Example: $(x - y) + (y - z) + (z - x) = 0$, so $(x - y)^3 + (y - z)^3 + (z - x)^3 = 3(x - y)(y - z)(z - x)$. Also, if $a + b + c = 0$, then $\frac{a^2}{bc} + \frac{b^2}{ca} + \frac{c^2}{ab} = \frac{a^3 + b^3 + c^3}{abc} = 3$.`,
          r`তিনটি পদের যোগফল শূন্য হলে তাদের ঘনের যোগফল তাদের গুণফলের তিনগুণ।

উদাহরণ: $(x - y) + (y - z) + (z - x) = 0$, তাই $(x - y)^3 + (y - z)^3 + (z - x)^3 = 3(x - y)(y - z)(z - x)$। আবার $a + b + c = 0$ হলে $\frac{a^2}{bc} + \frac{b^2}{ca} + \frac{c^2}{ab} = \frac{a^3 + b^3 + c^3}{abc} = 3$।`,
        ),
      },
      {
        title: t('Remainder and factor theorem', 'ভাগশেষ ও উৎপাদক উপপাদ্য'),
        body: t(
          r`When $p(x)$ is divided by $x - a$, the remainder is $p(a)$; for $ax - b$ put $x = \frac{b}{a}$. If the remainder is $0$, the divisor is a factor.

Example: $x^3 - 3x^2 + 4x - 5$ divided by $x - 2$: $8 - 12 + 8 - 5 = -1$. If $x - 1$ is a factor of $x^3 + kx - 4$, then $1 + k - 4 = 0$, so $k = 3$.`,
          r`$p(x)$-কে $x - a$ দিয়ে ভাগ করলে ভাগশেষ $p(a)$; $ax - b$ হলে $x = \frac{b}{a}$ বসান। ভাগশেষ $0$ হলে ভাজকটি একটি উৎপাদক।

উদাহরণ: $x^3 - 3x^2 + 4x - 5$-কে $x - 2$ দিয়ে ভাগ: $8 - 12 + 8 - 5 = -1$। $x - 1$ যদি $x^3 + kx - 4$-এর উৎপাদক হয়, তবে $1 + k - 4 = 0$, অর্থাৎ $k = 3$।`,
        ),
      },
      {
        title: t('Linear equations by elimination', 'অপনয়ন পদ্ধতিতে রৈখিক সমীকরণ'),
        body: t(
          r`Multiply the equations so that one variable has equal and opposite coefficients, add, solve, then substitute back.

Example: $2x + 3y = 12$ and $3x - y = 7$. Multiply the second by $3$: $9x - 3y = 21$. Adding: $11x = 33 \Rightarrow x = 3$, then $y = 3 \times 3 - 7 = 2$.`,
          r`সমীকরণগুলিকে এমনভাবে গুণ করুন যাতে একটি চলের সহগ সমান ও বিপরীত চিহ্নের হয়, যোগ করে সমাধান করুন, তারপর অন্য সমীকরণে বসান।

উদাহরণ: $2x + 3y = 12$ এবং $3x - y = 7$। দ্বিতীয়টিকে $3$ দিয়ে গুণ: $9x - 3y = 21$। যোগ করলে: $11x = 33 \Rightarrow x = 3$, তারপর $y = 3 \times 3 - 7 = 2$।`,
        ),
      },
    ],
    speed_tricks: [
      {
        title: t('Substitute values that satisfy the condition', 'শর্ত মেনে চলা মান বসান'),
        body: t(
          r`If the answer must hold for all values meeting the condition, pick the simplest such values.

Example: $a + b + c = 0$; find $\frac{a^2}{bc} + \frac{b^2}{ca} + \frac{c^2}{ab}$. Take $a = 1$, $b = 1$, $c = -2$: $-\frac{1}{2} - \frac{1}{2} + 4 = 3$.`,
          r`উত্তর যদি শর্ত মেনে চলা সব মানের জন্য একই হয়, তবে সবচেয়ে সহজ মানগুলি বেছে নিন।

উদাহরণ: $a + b + c = 0$; $\frac{a^2}{bc} + \frac{b^2}{ca} + \frac{c^2}{ab}$ কত? $a = 1$, $b = 1$, $c = -2$ নিলে: $-\frac{1}{2} - \frac{1}{2} + 4 = 3$।`,
        ),
        approx_time_saved_sec: 45,
      },
      {
        title: t('High powers from special values', 'বিশেষ মান থেকে বড় ঘাত'),
        body: t(
          r`If $x + \frac{1}{x} = 1$, then $x^3 = -1$. So $x^{99} = (x^3)^{33} = -1$ and $x^{99} + \frac{1}{x^{99}} = -2$. Reduce the exponent modulo 3 (or 6 for $x + \frac{1}{x} = \sqrt{3}$).`,
          r`$x + \frac{1}{x} = 1$ হলে $x^3 = -1$। তাই $x^{99} = (x^3)^{33} = -1$ এবং $x^{99} + \frac{1}{x^{99}} = -2$। সূচককে 3 দিয়ে ভাগ করে ভাগশেষ দেখুন ($x + \frac{1}{x} = \sqrt{3}$ হলে 6 দিয়ে)।`,
        ),
        approx_time_saved_sec: 40,
      },
      {
        title: t('Sum of squares = 0', 'বর্গের যোগফল = 0'),
        body: t(
          r`Complete the squares; for real numbers each square must then be zero.

Example: $x^2 + y^2 + z^2 - 2x + 4y - 6z + 14 = 0 \Rightarrow (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 0$, so $x = 1$, $y = -2$, $z = 3$ and $x + y + z = 2$. Similarly, $a^2 + b^2 + c^2 = ab + bc + ca$ means $a = b = c$.`,
          r`পূর্ণবর্গ তৈরি করুন; বাস্তব সংখ্যার ক্ষেত্রে তখন প্রতিটি বর্গই শূন্য হবে।

উদাহরণ: $x^2 + y^2 + z^2 - 2x + 4y - 6z + 14 = 0 \Rightarrow (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 0$, তাই $x = 1$, $y = -2$, $z = 3$ এবং $x + y + z = 2$। একইভাবে $a^2 + b^2 + c^2 = ab + bc + ca$ মানে $a = b = c$।`,
        ),
        approx_time_saved_sec: 40,
      },
      {
        title: t('Check a factorisation by putting a number', 'একটি সংখ্যা বসিয়ে উৎপাদক যাচাই'),
        body: t(
          r`Put a small value such as $x = 2$ into the expression and into each option; the matching option is correct.

Example: is $x^3 - 1 = (x - 1)(x^2 + x + 1)$? At $x = 2$: $7 = 1 \times 7$. Yes.`,
          r`রাশিতে ও প্রতিটি বিকল্পে $x = 2$-এর মতো ছোট মান বসান; যে বিকল্পের মান মেলে সেটিই সঠিক।

উদাহরণ: $x^3 - 1 = (x - 1)(x^2 + x + 1)$ কি? $x = 2$ বসালে: $7 = 1 \times 7$। হ্যাঁ।`,
        ),
        approx_time_saved_sec: 30,
      },
    ],
    common_traps: [
      t(
        r`**Missing middle term.** $(a + b)^2 = a^2 + 2ab + b^2$, not $a^2 + b^2$; and $(a + b)^3 \ne a^3 + b^3$.`,
        r`**মাঝের পদ বাদ পড়া।** $(a + b)^2 = a^2 + 2ab + b^2$, $a^2 + b^2$ নয়; আর $(a + b)^3 \ne a^3 + b^3$।`,
      ),
      t(
        r`**Wrong cube formula.** If $x + \frac{1}{x} = k$ then $x^3 + \frac{1}{x^3} = k^3 - 3k$, not $k^3 - 3$; if $x - \frac{1}{x} = m$ then $x^3 - \frac{1}{x^3} = m^3 + 3m$ (plus sign).`,
        r`**ঘনের সূত্রে ভুল।** $x + \frac{1}{x} = k$ হলে $x^3 + \frac{1}{x^3} = k^3 - 3k$, $k^3 - 3$ নয়; $x - \frac{1}{x} = m$ হলে $x^3 - \frac{1}{x^3} = m^3 + 3m$ (যোগ চিহ্ন)।`,
      ),
      t(
        r`**Ignoring the ± sign.** From $x + \frac{1}{x} = k$, $x - \frac{1}{x} = \pm\sqrt{k^2 - 4}$; pick the sign only if the question fixes $x > 1$ or $0 < x < 1$.`,
        r`**± চিহ্ন উপেক্ষা করা।** $x + \frac{1}{x} = k$ থেকে $x - \frac{1}{x} = \pm\sqrt{k^2 - 4}$; প্রশ্নে $x > 1$ বা $0 < x < 1$ বলা থাকলে তবেই চিহ্ন বাছুন।`,
      ),
      t(
        r`**Reversing the a + b + c = 0 rule.** If $a^3 + b^3 + c^3 = 3abc$, then **either** $a + b + c = 0$ **or** $a = b = c$ — not necessarily $a + b + c = 0$.`,
        r`**a + b + c = 0 নিয়মটি উল্টো প্রয়োগ।** $a^3 + b^3 + c^3 = 3abc$ হলে **হয়** $a + b + c = 0$ **নয়তো** $a = b = c$ — সবসময় $a + b + c = 0$ নয়।`,
      ),
      t(
        r`**Cancelling a variable factor loses a root.** In $x(x - 2) = 3(x - 2)$, cancelling $x - 2$ gives only $x = 3$; the roots are $x = 2$ and $x = 3$.`,
        r`**চলযুক্ত উৎপাদক কেটে দিলে একটি বীজ হারায়।** $x(x - 2) = 3(x - 2)$-এ $x - 2$ কেটে দিলে শুধু $x = 3$ পাওয়া যায়; প্রকৃত বীজ $x = 2$ ও $x = 3$।`,
      ),
      t(
        r`**No solution vs infinitely many.** When $\frac{a_1}{a_2} = \frac{b_1}{b_2}$, also compare $\frac{c_1}{c_2}$: equal means infinitely many solutions, unequal means none.`,
        r`**কোনো সমাধান নেই বনাম অসংখ্য সমাধান।** $\frac{a_1}{a_2} = \frac{b_1}{b_2}$ হলে $\frac{c_1}{c_2}$-ও তুলনা করুন: সমান হলে অসংখ্য সমাধান, অসমান হলে কোনো সমাধান নেই।`,
      ),
    ],
  },

  // ───────────────────────────── MENSURATION ─────────────────────────────
  {
    subject: 'quant',
    topic: 'mensuration',
    title: { en: 'Mensuration', bn: 'পরিমিতি', hi: 'क्षेत्रमिति' },
    overview: t(
      r`Mensuration deals with the **perimeter and area of 2D figures** (triangle, quadrilaterals, circle, sector) and the **surface area and volume of 3D solids** (cube, cuboid, cylinder, cone, sphere, hemisphere, frustum). First identify the shape and what is asked — curved surface, total surface, or volume — and **convert all lengths to one unit** before substituting. Use $\pi = \frac{22}{7}$ when the radius is a multiple of 7, and keep $\pi$ as a symbol until the last step. In melting or recasting problems the **volume stays the same**; in scaling problems area changes with the square and volume with the cube of the length ratio.`,
      r`পরিমিতিতে **দ্বিমাত্রিক চিত্রের পরিসীমা ও ক্ষেত্রফল** (ত্রিভুজ, চতুর্ভুজ, বৃত্ত, বৃত্তকলা) এবং **ত্রিমাত্রিক ঘনবস্তুর তলের ক্ষেত্রফল ও আয়তন** (ঘনক, আয়তঘন, চোঙ, শঙ্কু, গোলক, অর্ধগোলক, শঙ্কুর ছিন্নক) নিয়ে কাজ করা হয়। প্রথমে চিত্রটি চিনুন এবং কী চাওয়া হয়েছে — বক্রতল, সমগ্রতল না আয়তন — তা ঠিক করুন, আর মান বসানোর আগে **সব দৈর্ঘ্য একই এককে আনুন**। ব্যাসার্ধ 7-এর গুণিতক হলে $\pi = \frac{22}{7}$ নিন, এবং শেষ ধাপ পর্যন্ত $\pi$-কে প্রতীক হিসেবেই রাখুন। গলিয়ে নতুন বস্তু তৈরির প্রশ্নে **আয়তন একই থাকে**; মাপ বাড়া-কমার প্রশ্নে ক্ষেত্রফল দৈর্ঘ্য-অনুপাতের বর্গ এবং আয়তন ঘন অনুযায়ী বদলায়।`,
    ),
    formulas: [
      {
        key: 'triangle_area',
        label: t('Area of a triangle (incl. Heron)', 'ত্রিভুজের ক্ষেত্রফল (হেরনের সূত্রসহ)'),
        latex: r`A = \dfrac{1}{2}\, b h = \sqrt{s(s - a)(s - b)(s - c)},\qquad s = \dfrac{a + b + c}{2}`,
        variables: [
          v('b, h', 'Base and corresponding height', 'ভূমি ও সংশ্লিষ্ট উচ্চতা'),
          v('a, b, c', 'Three sides (in Heron)', 'তিনটি বাহু (হেরনের সূত্রে)'),
          v('s', 'Semi-perimeter', 'অর্ধপরিসীমা'),
        ],
        explanation: t(
          r`Equilateral triangle of side $a$: area $= \frac{\sqrt{3}}{4}a^2$, height $= \frac{\sqrt{3}}{2}a$, inradius $= \frac{a}{2\sqrt{3}}$, circumradius $= \frac{a}{\sqrt{3}}$. A regular hexagon is 6 such triangles: area $= \frac{3\sqrt{3}}{2}a^2$.`,
          r`$a$ বাহুবিশিষ্ট সমবাহু ত্রিভুজ: ক্ষেত্রফল $= \frac{\sqrt{3}}{4}a^2$, উচ্চতা $= \frac{\sqrt{3}}{2}a$, অন্তর্ব্যাসার্ধ $= \frac{a}{2\sqrt{3}}$, পরিব্যাসার্ধ $= \frac{a}{\sqrt{3}}$। সুষম ষড়ভুজ এমন 6টি ত্রিভুজ দিয়ে তৈরি: ক্ষেত্রফল $= \frac{3\sqrt{3}}{2}a^2$।`,
        ),
      },
      {
        key: 'quadrilaterals',
        label: t('Quadrilaterals', 'চতুর্ভুজ'),
        latex: r`\text{Rectangle} = lb,\quad \text{Square} = a^2 = \dfrac{d^2}{2},\quad \text{Rhombus} = \dfrac{1}{2}d_1 d_2,\quad \text{Parallelogram} = b h,\quad \text{Trapezium} = \dfrac{1}{2}(a + b)h`,
        explanation: t(
          r`Rectangle: perimeter $2(l + b)$, diagonal $\sqrt{l^2 + b^2}$. Square: diagonal $a\sqrt{2}$. Rhombus: side $= \frac{1}{2}\sqrt{d_1^2 + d_2^2}$. In the trapezium $a, b$ are the parallel sides and $h$ the distance between them.`,
          r`আয়তক্ষেত্র: পরিসীমা $2(l + b)$, কর্ণ $\sqrt{l^2 + b^2}$। বর্গক্ষেত্র: কর্ণ $a\sqrt{2}$। রম্বস: বাহু $= \frac{1}{2}\sqrt{d_1^2 + d_2^2}$। ট্রাপিজিয়ামে $a, b$ সমান্তরাল বাহু এবং $h$ তাদের মধ্যে দূরত্ব।`,
        ),
      },
      {
        key: 'circle',
        label: t('Circle', 'বৃত্ত'),
        latex: r`\text{Area} = \pi r^2,\qquad \text{Circumference} = 2\pi r = \pi d`,
        explanation: t(
          r`Semicircle: area $\frac{1}{2}\pi r^2$, perimeter $\pi r + 2r$. Ring between radii $R$ and $r$: area $\pi(R^2 - r^2)$.`,
          r`অর্ধবৃত্ত: ক্ষেত্রফল $\frac{1}{2}\pi r^2$, পরিসীমা $\pi r + 2r$। $R$ ও $r$ ব্যাসার্ধের মাঝের বলয়: ক্ষেত্রফল $\pi(R^2 - r^2)$।`,
        ),
      },
      {
        key: 'sector_arc',
        label: t('Sector and arc', 'বৃত্তকলা ও বৃত্তচাপ'),
        latex: r`l = \dfrac{\theta}{360^\circ} \times 2\pi r,\qquad \text{Sector area} = \dfrac{\theta}{360^\circ} \times \pi r^2 = \dfrac{1}{2}\, l r`,
        variables: [
          v(r`\theta`, 'Central angle in degrees', 'কেন্দ্রস্থ কোণ (ডিগ্রিতে)'),
          v('l', 'Arc length', 'চাপের দৈর্ঘ্য'),
        ],
        explanation: t(
          r`Perimeter of a sector $= l + 2r$.`,
          r`বৃত্তকলার পরিসীমা $= l + 2r$।`,
        ),
      },
      {
        key: 'cuboid_cube',
        label: t('Cuboid and cube', 'আয়তঘন ও ঘনক'),
        latex: r`\text{Cuboid: } V = lbh,\ \ \text{TSA} = 2(lb + bh + hl),\ \ d = \sqrt{l^2 + b^2 + h^2};\qquad \text{Cube: } V = a^3,\ \ \text{TSA} = 6a^2,\ \ d = a\sqrt{3}`,
        explanation: t(
          r`Lateral surface (four walls) of a cuboid $= 2h(l + b)$; of a cube $= 4a^2$.`,
          r`আয়তঘনের পার্শ্বতল (চার দেওয়াল) $= 2h(l + b)$; ঘনকের $= 4a^2$।`,
        ),
      },
      {
        key: 'cylinder',
        label: t('Right circular cylinder', 'লম্ববৃত্তাকার চোঙ'),
        latex: r`V = \pi r^2 h,\qquad \text{CSA} = 2\pi r h,\qquad \text{TSA} = 2\pi r(r + h)`,
        explanation: t(
          r`Hollow cylinder (outer $R$, inner $r$): volume of material $= \pi(R^2 - r^2)h$.`,
          r`ফাঁপা চোঙ (বাইরের ব্যাসার্ধ $R$, ভিতরের $r$): উপাদানের আয়তন $= \pi(R^2 - r^2)h$।`,
        ),
      },
      {
        key: 'cone',
        label: t('Right circular cone', 'লম্ববৃত্তাকার শঙ্কু'),
        latex: r`V = \dfrac{1}{3}\pi r^2 h,\qquad l = \sqrt{r^2 + h^2},\qquad \text{CSA} = \pi r l,\qquad \text{TSA} = \pi r(l + r)`,
        variables: [
          v('h', 'Vertical height', 'উল্লম্ব উচ্চতা'),
          v('l', 'Slant height', 'তির্যক উচ্চতা'),
        ],
      },
      {
        key: 'sphere_hemisphere',
        label: t('Sphere and hemisphere', 'গোলক ও অর্ধগোলক'),
        latex: r`\text{Sphere: } V = \dfrac{4}{3}\pi r^3,\ \ S = 4\pi r^2;\qquad \text{Hemisphere: } V = \dfrac{2}{3}\pi r^3,\ \ \text{CSA} = 2\pi r^2,\ \ \text{TSA} = 3\pi r^2`,
        explanation: t(
          r`Hollow sphere (outer $R$, inner $r$): material volume $= \frac{4}{3}\pi(R^3 - r^3)$.`,
          r`ফাঁপা গোলক (বাইরের ব্যাসার্ধ $R$, ভিতরের $r$): উপাদানের আয়তন $= \frac{4}{3}\pi(R^3 - r^3)$।`,
        ),
      },
      {
        key: 'frustum',
        label: t('Frustum of a cone', 'শঙ্কুর ছিন্নক'),
        latex: r`V = \dfrac{1}{3}\pi h\,(R^2 + r^2 + Rr),\qquad \text{CSA} = \pi(R + r)\,l,\qquad l = \sqrt{h^2 + (R - r)^2}`,
        variables: [
          v('R, r', 'Radii of the two circular ends', 'দুই বৃত্তাকার প্রান্তের ব্যাসার্ধ'),
          v('h', 'Vertical height', 'উল্লম্ব উচ্চতা'),
          v('l', 'Slant height', 'তির্যক উচ্চতা'),
        ],
        explanation: t(
          r`TSA $= \pi(R + r)l + \pi R^2 + \pi r^2$ (for a bucket open at the top, drop the $\pi R^2$ of the top end).`,
          r`সমগ্রতল $= \pi(R + r)l + \pi R^2 + \pi r^2$ (উপরের মুখ খোলা বালতির ক্ষেত্রে উপরের প্রান্তের $\pi R^2$ বাদ দিন)।`,
        ),
      },
      {
        key: 'unit_conversions',
        label: t('Unit conversions', 'একক রূপান্তর'),
        latex: r`1\,\text{m}^3 = 1000\,\text{L},\quad 1\,\text{L} = 1000\,\text{cm}^3,\quad 1\,\text{m}^2 = 10^4\,\text{cm}^2,\quad 1\,\text{hectare} = 10^4\,\text{m}^2`,
        explanation: t(
          r`Also $1\,\text{cm}^3 = 1\,\text{mL}$, $1\,\text{km}^2 = 100$ hectares $= 10^6\,\text{m}^2$, $1\,\text{m}^3 = 10^6\,\text{cm}^3$.`,
          r`এছাড়া $1\,\text{cm}^3 = 1\,\text{mL}$, $1\,\text{km}^2 = 100$ হেক্টর $= 10^6\,\text{m}^2$, $1\,\text{m}^3 = 10^6\,\text{cm}^3$।`,
        ),
      },
    ],
    derivation_rules: [
      {
        title: t('Identify, convert, substitute', 'চিনুন, একক বদলান, মান বসান'),
        body: t(
          r`(1) Name the shape and the quantity asked (CSA, TSA, volume). (2) Convert all lengths to the same unit — and diameter to radius. (3) Write the formula with $\pi$ kept as a symbol, simplify, and multiply by $\pi$ at the end.

Example: a circle has circumference $44$ cm: $2 \times \frac{22}{7} \times r = 44 \Rightarrow r = 7$, area $= \frac{22}{7} \times 49 = 154\,\text{cm}^2$.`,
          r`(1) চিত্রটির নাম এবং কোন রাশি চাওয়া হয়েছে (বক্রতল, সমগ্রতল, আয়তন) তা ঠিক করুন। (2) সব দৈর্ঘ্য একই এককে আনুন — আর ব্যাস দেওয়া থাকলে ব্যাসার্ধে বদলান। (3) $\pi$-কে প্রতীক রেখেই সূত্রে মান বসিয়ে সরল করুন, শেষে $\pi$ দিয়ে গুণ করুন।

উদাহরণ: একটি বৃত্তের পরিধি $44$ সেমি: $2 \times \frac{22}{7} \times r = 44 \Rightarrow r = 7$, ক্ষেত্রফল $= \frac{22}{7} \times 49 = 154$ বর্গসেমি।`,
        ),
      },
      {
        title: t('Melting and recasting: volume is conserved', 'গলিয়ে নতুন বস্তু: আয়তন অপরিবর্তিত'),
        body: t(
          r`Set (volume of original) $=$ (number of new pieces) $\times$ (volume of one piece).

Example: a sphere of radius $3$ cm is drawn into a wire of radius $0.1$ cm. $\frac{4}{3}\pi \times 27 = \pi \times 0.01 \times l \Rightarrow l = \frac{36}{0.01} = 3600$ cm $= 36$ m. Number of spheres of radius $1$ cm from one of radius $4$ cm $= \left(\frac{4}{1}\right)^3 = 64$.`,
          r`(মূল বস্তুর আয়তন) $=$ (নতুন টুকরোর সংখ্যা) $\times$ (একটি টুকরোর আয়তন) ধরে সমীকরণ গঠন করুন।

উদাহরণ: $3$ সেমি ব্যাসার্ধের একটি গোলক থেকে $0.1$ সেমি ব্যাসার্ধের তার তৈরি হল। $\frac{4}{3}\pi \times 27 = \pi \times 0.01 \times l \Rightarrow l = \frac{36}{0.01} = 3600$ সেমি $= 36$ মিটার। $4$ সেমি ব্যাসার্ধের গোলক থেকে $1$ সেমি ব্যাসার্ধের গোলক তৈরি হবে $\left(\frac{4}{1}\right)^3 = 64$টি।`,
        ),
      },
      {
        title: t('Heron for three given sides', 'তিনটি বাহু দেওয়া থাকলে হেরনের সূত্র'),
        body: t(
          r`Find $s$, then the three differences $s - a$, $s - b$, $s - c$, and factorise before taking the square root.

Example: sides $13, 14, 15$: $s = 21$; area $= \sqrt{21 \times 8 \times 7 \times 6} = \sqrt{7056} = 84$ sq units.`,
          r`প্রথমে $s$ বের করুন, তারপর তিনটি অন্তর $s - a$, $s - b$, $s - c$; বর্গমূল নেওয়ার আগে উৎপাদকে ভাঙুন।

উদাহরণ: বাহু $13, 14, 15$: $s = 21$; ক্ষেত্রফল $= \sqrt{21 \times 8 \times 7 \times 6} = \sqrt{7056} = 84$ বর্গ একক।`,
        ),
      },
      {
        title: t('Paths and borders', 'রাস্তা ও পাড়'),
        body: t(
          r`For a rectangle $l \times b$ with a path of width $w$: outside path area $= (l + 2w)(b + 2w) - lb = 2w(l + b) + 4w^2$; inside path area $= 2w(l + b) - 4w^2$; two cross roads through the middle $= w(l + b) - w^2$.

Example: lawn $40 \times 30$ m with a $2$ m path outside: $44 \times 34 - 1200 = 296\,\text{m}^2$. At ₹ 10 per $\text{m}^2$, cost $=$ ₹ 2960.`,
          r`$l \times b$ আয়তক্ষেত্রের চারপাশে $w$ চওড়া রাস্তা: বাইরের রাস্তার ক্ষেত্রফল $= (l + 2w)(b + 2w) - lb = 2w(l + b) + 4w^2$; ভিতরের রাস্তার ক্ষেত্রফল $= 2w(l + b) - 4w^2$; মাঝখান দিয়ে আড়াআড়ি দুটি রাস্তা $= w(l + b) - w^2$।

উদাহরণ: $40 \times 30$ মিটার লনের বাইরে $2$ মিটার চওড়া রাস্তা: $44 \times 34 - 1200 = 296$ বর্গমিটার। প্রতি বর্গমিটার ₹ 10 হলে খরচ $=$ ₹ 2960।`,
        ),
      },
      {
        title: t('Percentage change in dimensions', 'মাপের শতকরা পরিবর্তন'),
        body: t(
          r`Area depends on two lengths, volume on three, so apply the length factor twice or three times.

Example: each edge of a cube increases by $10\%$: volume factor $= 1.1^3 = 1.331$, a $33.1\%$ increase; surface area factor $= 1.1^2 = 1.21$, a $21\%$ increase. If the radius of a sphere is doubled, surface area becomes $4$ times and volume $8$ times.`,
          r`ক্ষেত্রফল দুটি দৈর্ঘ্যের উপর, আয়তন তিনটির উপর নির্ভর করে, তাই দৈর্ঘ্যের গুণককে দুবার বা তিনবার প্রয়োগ করুন।

উদাহরণ: ঘনকের প্রতিটি ধার $10\%$ বাড়লে: আয়তনের গুণক $= 1.1^3 = 1.331$, অর্থাৎ $33.1\%$ বৃদ্ধি; তলের ক্ষেত্রফলের গুণক $= 1.1^2 = 1.21$, অর্থাৎ $21\%$ বৃদ্ধি। গোলকের ব্যাসার্ধ দ্বিগুণ হলে তলের ক্ষেত্রফল $4$ গুণ এবং আয়তন $8$ গুণ হয়।`,
        ),
      },
    ],
    speed_tricks: [
      {
        title: t('Know the Pythagorean triplets', 'পিথাগোরীয় ত্রয়ী মুখস্থ রাখুন'),
        body: t(
          r`$(3, 4, 5)$, $(5, 12, 13)$, $(8, 15, 17)$, $(7, 24, 25)$, $(20, 21, 29)$, $(9, 40, 41)$ and their multiples.

Example: a cone with $r = 5$, $h = 12$ has slant height $13$ at once, so CSA $= \pi \times 5 \times 13 = 65\pi$.`,
          r`$(3, 4, 5)$, $(5, 12, 13)$, $(8, 15, 17)$, $(7, 24, 25)$, $(20, 21, 29)$, $(9, 40, 41)$ এবং এদের গুণিতক।

উদাহরণ: $r = 5$, $h = 12$ শঙ্কুর তির্যক উচ্চতা সঙ্গে সঙ্গে $13$, তাই বক্রতল $= \pi \times 5 \times 13 = 65\pi$।`,
        ),
        approx_time_saved_sec: 20,
      },
      {
        title: t('Ratios of similar solids', 'সদৃশ ঘনবস্তুর অনুপাত'),
        body: t(
          r`If lengths are in ratio $a : b$, areas are $a^2 : b^2$ and volumes $a^3 : b^3$. Spheres with radii $2 : 3$ have volumes $8 : 27$ and surface areas $4 : 9$.

With the same radius $r$ and height $r$: cone : hemisphere : cylinder volumes $= 1 : 2 : 3$. A cone and a cylinder with equal base and height: $1 : 3$.`,
          r`দৈর্ঘ্যের অনুপাত $a : b$ হলে ক্ষেত্রফলের অনুপাত $a^2 : b^2$ এবং আয়তনের অনুপাত $a^3 : b^3$। $2 : 3$ ব্যাসার্ধের দুটি গোলকের আয়তন $8 : 27$ এবং তলের ক্ষেত্রফল $4 : 9$।

একই ব্যাসার্ধ $r$ এবং উচ্চতা $r$ হলে: শঙ্কু : অর্ধগোলক : চোঙের আয়তন $= 1 : 2 : 3$। একই ভূমি ও উচ্চতার শঙ্কু ও চোঙ: $1 : 3$।`,
        ),
        approx_time_saved_sec: 30,
      },
      {
        title: t('Rectangle area from perimeter and diagonal', 'পরিসীমা ও কর্ণ থেকে আয়তক্ষেত্রের ক্ষেত্রফল'),
        body: t(
          r`Use $2lb = (l + b)^2 - (l^2 + b^2)$ without finding $l$ and $b$.

Example: perimeter $34$ ($l + b = 17$), diagonal $13$: $2lb = 289 - 169 = 120$, so area $= 60$. For a square, area $= \frac{d^2}{2}$: diagonal $10 \Rightarrow$ area $50$.`,
          r`$l$ ও $b$ আলাদা করে না বের করে $2lb = (l + b)^2 - (l^2 + b^2)$ ব্যবহার করুন।

উদাহরণ: পরিসীমা $34$ ($l + b = 17$), কর্ণ $13$: $2lb = 289 - 169 = 120$, তাই ক্ষেত্রফল $= 60$। বর্গক্ষেত্রে ক্ষেত্রফল $= \frac{d^2}{2}$: কর্ণ $10 \Rightarrow$ ক্ষেত্রফল $50$।`,
        ),
        approx_time_saved_sec: 30,
      },
      {
        title: t('Choose π = 22/7 when r is a multiple of 7', 'r 7-এর গুণিতক হলে π = 22/7 নিন'),
        body: t(
          r`Options usually come out as whole numbers with $\frac{22}{7}$. Remember: $r = 7$ gives circumference $44$ and area $154$; $r = 14$ gives $88$ and $616$; $r = 21$ gives $132$ and $1386$.`,
          r`$\frac{22}{7}$ নিলে উত্তর সাধারণত পূর্ণসংখ্যা হয়। মনে রাখুন: $r = 7$ হলে পরিধি $44$, ক্ষেত্রফল $154$; $r = 14$ হলে $88$ ও $616$; $r = 21$ হলে $132$ ও $1386$।`,
        ),
        approx_time_saved_sec: 20,
      },
    ],
    common_traps: [
      t(
        r`**Unit slips.** $1\,\text{m}^3 = 1000$ litres (not 100) and $1\,\text{m}^2 = 10000\,\text{cm}^2$ (not 100). Convert lengths before squaring or cubing.`,
        r`**এককের ভুল।** $1\,\text{m}^3 = 1000$ লিটার (100 নয়) এবং $1\,\text{m}^2 = 10000\,\text{cm}^2$ (100 নয়)। বর্গ বা ঘন করার আগেই দৈর্ঘ্যের একক বদলান।`,
      ),
      t(
        r`**Diameter given, radius used.** Many questions give the diameter; halve it first, otherwise the area comes out $4$ times and a sphere's volume $8$ times too big.`,
        r`**ব্যাস দেওয়া, ব্যাসার্ধ ধরা।** অনেক প্রশ্নে ব্যাস দেওয়া থাকে; আগে অর্ধেক করুন, নইলে ক্ষেত্রফল $4$ গুণ এবং গোলকের আয়তন $8$ গুণ বেশি আসবে।`,
      ),
      t(
        r`**Slant vs vertical height in a cone.** Volume uses the vertical height $h$; curved surface uses the slant height $l = \sqrt{r^2 + h^2}$.`,
        r`**শঙ্কুর তির্যক বনাম উল্লম্ব উচ্চতা।** আয়তনে উল্লম্ব উচ্চতা $h$ লাগে; বক্রতলে তির্যক উচ্চতা $l = \sqrt{r^2 + h^2}$।`,
      ),
      t(
        r`**Which surface?** A solid hemisphere has TSA $3\pi r^2$, but a hemispherical bowl has only $2\pi r^2$. A tank open at the top has area $2\pi r h + \pi r^2$, not $2\pi r(r + h)$.`,
        r`**কোন তল?** নিরেট অর্ধগোলকের সমগ্রতল $3\pi r^2$, কিন্তু অর্ধগোলাকার বাটির শুধু $2\pi r^2$। উপরের মুখ খোলা চৌবাচ্চার ক্ষেত্রফল $2\pi r h + \pi r^2$, $2\pi r(r + h)$ নয়।`,
      ),
      t(
        r`**Sector perimeter.** The perimeter of a sector is arc $+ 2r$, not just the arc length.`,
        r`**বৃত্তকলার পরিসীমা।** বৃত্তকলার পরিসীমা $=$ চাপ $+ 2r$, শুধু চাপের দৈর্ঘ্য নয়।`,
      ),
    ],
  },
];
