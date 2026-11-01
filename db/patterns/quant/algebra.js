'use strict';

// Question patterns: Algebra. Format: see ../validate.js.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'algebra',
  patterns: [
    // 1 ─────────────────────────────────────────────
    {
      key: 'square_from_sum_product',
      emoji: '🟦',
      name: t(r`Find $a^2 + b^2$ from $a + b$ and $ab$`, r`$a + b$ ও $ab$ থেকে $a^2 + b^2$ নির্ণয়`),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t(r`“If $a + b = \dots$ and $ab = \dots$, find $a^2 + b^2$.”`, r`“$a + b = \dots$ এবং $ab = \dots$ হলে $a^2 + b^2$ কত?”`),
      formula: t(r`$a^2 + b^2 = (a + b)^2 - 2ab$; with $a - b$ given, $a^2 + b^2 = (a - b)^2 + 2ab$.`, r`$a^2 + b^2 = (a + b)^2 - 2ab$; $a - b$ দেওয়া থাকলে $a^2 + b^2 = (a - b)^2 + 2ab$।`),
      shortcut: t('Square the given sum first, then subtract twice the product in one line — no need to find a and b separately.', 'আগে দেওয়া যোগফলের বর্গ করো, তারপর এক লাইনে গুণফলের দ্বিগুণ বিয়োগ করো — a ও b আলাদা করে বের করার দরকার নেই।'),
      trap: t(r`Subtract $2ab$, not just $ab$; and if $a - b$ is given the sign flips to plus.`, r`শুধু $ab$ নয়, $2ab$ বিয়োগ করো; আর $a - b$ দেওয়া থাকলে চিহ্ন উল্টে যোগ হয়।`),
      spot: t(
        r`The values of $a + b$ (or $a - b$) and $ab$ are given, and $a^2 + b^2$ is asked.`,
        r`$a + b$ (বা $a - b$) আর $ab$-এর মান দেওয়া থাকে, $a^2 + b^2$ জানতে চাওয়া হয়।`,
      ),
      method: [
        t(r`Use $a^2 + b^2 = (a + b)^2 - 2ab$.`, r`সূত্র: $a^2 + b^2 = (a + b)^2 - 2ab$।`),
        t(r`If $a - b$ is given, use $a^2 + b^2 = (a - b)^2 + 2ab$.`, r`$a - b$ দেওয়া থাকলে: $a^2 + b^2 = (a - b)^2 + 2ab$।`),
        t('Put in the numbers and simplify.', 'মান বসিয়ে সরল করো।'),
      ],
      example: {
        question: t(r`If $a + b = 9$ and $ab = 20$, find $a^2 + b^2$.`, r`$a + b = 9$ এবং $ab = 20$ হলে $a^2 + b^2$ কত?`),
        steps: [
          t(r`$(a + b)^2 = 9^2 = 81$.`, r`এখানে $(a + b)^2 = 9^2 = 81$।`),
          t(r`$2ab = 2 \times 20 = 40$.`, r`এখানে $2ab = 2 \times 20 = 40$।`),
          t(r`$a^2 + b^2 = 81 - 40 = 41$. (Check: $a = 4, b = 5$ gives $16 + 25 = 41$.)`, r`$a^2 + b^2 = 81 - 40 = 41$। (যাচাই: $a = 4, b = 5$ নিলে $16 + 25 = 41$।)`),
        ],
        answer: t(r`$a^2 + b^2 = 41$`, r`নির্ণেয় মান $41$।`),
      },
      tryIt: {
        question: t(r`If $a + b = 10$ and $ab = 21$, find $a^2 + b^2$.`, r`$a + b = 10$ এবং $ab = 21$ হলে $a^2 + b^2$ কত?`),
        options: [t('58', '58'), t('79', '79'), t('121', '121'), t('142', '142')],
        correct: 0,
        explanation: [
          t(r`$(a + b)^2 = 100$ and $2ab = 42$.`, r`$(a + b)^2 = 100$ এবং $2ab = 42$।`),
          t(r`$a^2 + b^2 = 100 - 42 = 58$. (Subtracting only $21$, or adding $42$, are the usual slips.)`, r`$a^2 + b^2 = 100 - 42 = 58$। (শুধু $21$ বিয়োগ করা বা $42$ যোগ করা, এই দুটো সাধারণ ভুল।)`),
        ],
      },
    },
    // 2 ─────────────────────────────────────────────
    {
      key: 'x_plus_one_over_x_square',
      emoji: '🔄',
      name: t(r`Find $x^2 + \frac{1}{x^2}$ from $x + \frac{1}{x}$`, r`$x + \frac{1}{x}$ থেকে $x^2 + \frac{1}{x^2}$ নির্ণয়`),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t(r`“If $x + \frac{1}{x} = k$, find $x^2 + \frac{1}{x^2}$.”`, r`“$x + \frac{1}{x} = k$ হলে $x^2 + \frac{1}{x^2}$ কত?”`),
      formula: t(r`$x^2 + \frac{1}{x^2} = k^2 - 2$, where $k = x + \frac{1}{x}$.`, r`$x^2 + \frac{1}{x^2} = k^2 - 2$, যেখানে $k = x + \frac{1}{x}$।`),
      shortcut: t('Just square the given value and subtract 2 — the cross term is always 2 because x and 1/x cancel.', 'দেওয়া মানের বর্গ করে 2 বিয়োগ করলেই হয় — মাঝের পদ সবসময় 2, কারণ x ও 1/x কেটে যায়।'),
      trap: t('Subtract 2, do not add it, and do not simply square the given value and stop.', '2 যোগ নয়, বিয়োগ করো; আর শুধু বর্গ করেই থেমে যেও না।'),
      spot: t(
        r`The question gives $x + \frac{1}{x}$ and asks for $x^2 + \frac{1}{x^2}$.`,
        r`প্রশ্নে $x + \frac{1}{x}$ দেওয়া থাকে আর $x^2 + \frac{1}{x^2}$ চাওয়া হয়।`,
      ),
      method: [
        t(r`Square both sides: $\left(x + \frac{1}{x}\right)^2 = x^2 + \frac{1}{x^2} + 2$.`, r`দুই দিক বর্গ করো: $\left(x + \frac{1}{x}\right)^2 = x^2 + \frac{1}{x^2} + 2$।`),
        t(r`So $x^2 + \frac{1}{x^2} = k^2 - 2$, where $k$ is the given value.`, r`তাই $x^2 + \frac{1}{x^2} = k^2 - 2$, যেখানে $k$ হল দেওয়া মান।`),
      ],
      example: {
        question: t(r`If $x + \frac{1}{x} = 5$, find $x^2 + \frac{1}{x^2}$.`, r`$x + \frac{1}{x} = 5$ হলে $x^2 + \frac{1}{x^2}$ কত?`),
        steps: [
          t(r`Square: $5^2 = 25$.`, r`বর্গ করো: $5^2 = 25$।`),
          t(r`Subtract $2$: $25 - 2 = 23$.`, r`$2$ বিয়োগ করো: $25 - 2 = 23$।`),
        ],
        answer: t(r`$x^2 + \frac{1}{x^2} = 23$`, r`নির্ণেয় মান $23$।`),
      },
      tryIt: {
        question: t(r`If $x + \frac{1}{x} = 4$, find $x^2 + \frac{1}{x^2}$.`, r`$x + \frac{1}{x} = 4$ হলে $x^2 + \frac{1}{x^2}$ কত?`),
        options: [t('12', '12'), t('14', '14'), t('16', '16'), t('18', '18')],
        correct: 1,
        explanation: [
          t(r`Square: $4^2 = 16$.`, r`বর্গ করো: $4^2 = 16$।`),
          t(r`Subtract $2$ (not add): $16 - 2 = 14$.`, r`$2$ বিয়োগ করো (যোগ নয়): $16 - 2 = 14$।`),
        ],
      },
    },
    // 3 ─────────────────────────────────────────────
    {
      key: 'cube_from_sum_product',
      emoji: '🧊',
      name: t(r`Find $a^3 + b^3$ from $a + b$ and $ab$`, r`$a + b$ ও $ab$ থেকে $a^3 + b^3$ নির্ণয়`),
      difficulty: 'advanced',
      practiceLevels: ['advanced'],
      typicalWording: t(r`“If $a + b = \dots$ and $ab = \dots$, find $a^3 + b^3$.”`, r`“$a + b = \dots$ এবং $ab = \dots$ হলে $a^3 + b^3$ কত?”`),
      formula: t(r`$a^3 + b^3 = (a + b)^3 - 3ab(a + b)$.`, r`সূত্র: $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$।`),
      shortcut: t('Compute the two parts separately — cube of the sum, and 3 × product × sum — then subtract once at the end.', 'দুটি অংশ আলাদা করে হিসাব করো — যোগফলের ঘন, আর 3 × গুণফল × যোগফল — শেষে একবার বিয়োগ করো।'),
      trap: t(r`The correction term is $3ab(a + b)$, not $3ab$ alone; forgetting the $(a + b)$ factor is the common slip.`, r`সংশোধনী পদটি $3ab(a + b)$, শুধু $3ab$ নয়; $(a + b)$ গুণকটি ভুলে যাওয়াই সাধারণ ভুল।`),
      spot: t(
        r`The values of $a + b$ and $ab$ are given, and $a^3 + b^3$ is asked.`,
        r`$a + b$ আর $ab$-এর মান দেওয়া থাকে, $a^3 + b^3$ জানতে চাওয়া হয়।`,
      ),
      method: [
        t(r`Use $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$.`, r`সূত্র: $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$।`),
        t(r`Work out $(a + b)^3$ and $3ab(a + b)$ separately, then subtract.`, r`$(a + b)^3$ আর $3ab(a + b)$ আলাদা করে বের করে বিয়োগ করো।`),
      ],
      example: {
        question: t(r`If $a + b = 5$ and $ab = 6$, find $a^3 + b^3$.`, r`$a + b = 5$ এবং $ab = 6$ হলে $a^3 + b^3$ কত?`),
        steps: [
          t(r`$(a + b)^3 = 5^3 = 125$.`, r`এখানে $(a + b)^3 = 5^3 = 125$।`),
          t(r`$3ab(a + b) = 3 \times 6 \times 5 = 90$.`, r`এখানে $3ab(a + b) = 3 \times 6 \times 5 = 90$।`),
          t(r`$a^3 + b^3 = 125 - 90 = 35$. (Check: $2^3 + 3^3 = 8 + 27 = 35$.)`, r`$a^3 + b^3 = 125 - 90 = 35$। (যাচাই: $2^3 + 3^3 = 8 + 27 = 35$।)`),
        ],
        answer: t(r`$a^3 + b^3 = 35$`, r`নির্ণেয় মান $35$।`),
      },
      tryIt: {
        question: t(r`If $a + b = 7$ and $ab = 12$, find $a^3 + b^3$.`, r`$a + b = 7$ এবং $ab = 12$ হলে $a^3 + b^3$ কত?`),
        options: [t('307', '307'), t('331', '331'), t('595', '595'), t('91', '91')],
        correct: 3,
        explanation: [
          t(r`$(a + b)^3 = 7^3 = 343$ and $3ab(a + b) = 3 \times 12 \times 7 = 252$.`, r`$(a + b)^3 = 7^3 = 343$ এবং $3ab(a + b) = 3 \times 12 \times 7 = 252$।`),
          t(r`$a^3 + b^3 = 343 - 252 = 91$. (Check: $3^3 + 4^3 = 27 + 64 = 91$.)`, r`$a^3 + b^3 = 343 - 252 = 91$। (যাচাই: $3^3 + 4^3 = 27 + 64 = 91$।)`),
        ],
      },
    },
    // 4 ─────────────────────────────────────────────
    {
      key: 'x_plus_one_over_x_cube',
      emoji: '🎲',
      name: t(r`Find $x^3 + \frac{1}{x^3}$ from $x + \frac{1}{x}$`, r`$x + \frac{1}{x}$ থেকে $x^3 + \frac{1}{x^3}$ নির্ণয়`),
      difficulty: 'advanced',
      typicalWording: t(r`“If $x + \frac{1}{x} = k$, find $x^3 + \frac{1}{x^3}$.”`, r`“$x + \frac{1}{x} = k$ হলে $x^3 + \frac{1}{x^3}$ কত?”`),
      formula: t(r`$x^3 + \frac{1}{x^3} = k^3 - 3k$, where $k = x + \frac{1}{x}$.`, r`$x^3 + \frac{1}{x^3} = k^3 - 3k$, যেখানে $k = x + \frac{1}{x}$।`),
      shortcut: t('Cube the given value and subtract three times the given value — one line, no expansion needed.', 'দেওয়া মানের ঘন করে তার তিনগুণ বিয়োগ করো — এক লাইনেই হয়, বিস্তার করার দরকার নেই।'),
      trap: t(r`Subtract $3k$, not $3$; the correction grows with $k$ itself.`, r`$3$ নয়, $3k$ বিয়োগ করো; সংশোধনী পদটি $k$-এর সঙ্গেই বাড়ে।`),
      spot: t(
        r`The question gives $x + \frac{1}{x}$ and asks for $x^3 + \frac{1}{x^3}$.`,
        r`প্রশ্নে $x + \frac{1}{x}$ দেওয়া থাকে আর $x^3 + \frac{1}{x^3}$ চাওয়া হয়।`,
      ),
      method: [
        t(r`Use $x^3 + \frac{1}{x^3} = k^3 - 3k$, where $k = x + \frac{1}{x}$.`, r`সূত্র: $x^3 + \frac{1}{x^3} = k^3 - 3k$, যেখানে $k = x + \frac{1}{x}$।`),
        t(r`This comes from $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$ with $ab = x \cdot \frac{1}{x} = 1$.`, r`এটা আসে $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$ থেকে, কারণ এখানে $ab = x \cdot \frac{1}{x} = 1$।`),
      ],
      example: {
        question: t(r`If $x + \frac{1}{x} = 3$, find $x^3 + \frac{1}{x^3}$.`, r`$x + \frac{1}{x} = 3$ হলে $x^3 + \frac{1}{x^3}$ কত?`),
        steps: [
          t(r`$k^3 = 3^3 = 27$.`, r`এখানে $k^3 = 3^3 = 27$।`),
          t(r`$3k = 3 \times 3 = 9$.`, r`এখানে $3k = 3 \times 3 = 9$।`),
          t(r`$x^3 + \frac{1}{x^3} = 27 - 9 = 18$.`, r`সুতরাং $x^3 + \frac{1}{x^3} = 27 - 9 = 18$।`),
        ],
        answer: t(r`$x^3 + \frac{1}{x^3} = 18$`, r`নির্ণেয় মান $18$।`),
      },
      tryIt: {
        question: t(r`If $x + \frac{1}{x} = 4$, find $x^3 + \frac{1}{x^3}$.`, r`$x + \frac{1}{x} = 4$ হলে $x^3 + \frac{1}{x^3}$ কত?`),
        options: [t('60', '60'), t('52', '52'), t('64', '64'), t('76', '76')],
        correct: 1,
        explanation: [
          t(r`$k^3 = 4^3 = 64$ and $3k = 12$.`, r`$k^3 = 4^3 = 64$ এবং $3k = 12$।`),
          t(r`$x^3 + \frac{1}{x^3} = 64 - 12 = 52$.`, r`সুতরাং $x^3 + \frac{1}{x^3} = 64 - 12 = 52$।`),
        ],
      },
    },
    // 5 ─────────────────────────────────────────────
    {
      key: 'sum_zero_cubes',
      emoji: '⚖️',
      name: t(r`If $a + b + c = 0$, then $a^3 + b^3 + c^3 = 3abc$`, r`$a + b + c = 0$ হলে $a^3 + b^3 + c^3 = 3abc$`),
      difficulty: 'advanced',
      typicalWording: t('“Find the value of $a^3 \pm b^3 \pm c^3$” where the bases with signs add to zero.', '“$a^3 \pm b^3 \pm c^3$-এর মান কত” যেখানে চিহ্নসহ ভিত্তিগুলোর যোগফল শূন্য।'),
      formula: t(r`If $a + b + c = 0$, then $a^3 + b^3 + c^3 = 3abc$.`, r`$a + b + c = 0$ হলে $a^3 + b^3 + c^3 = 3abc$।`),
      shortcut: t('Check the signed sum first: if it is zero, just multiply the three signed bases and triple the result — never cube the big numbers.', 'আগে চিহ্নসহ যোগফল দেখো: শূন্য হলে তিনটি চিহ্নসহ ভিত্তি গুণ করে তিনগুণ করো — বড়ো সংখ্যার ঘন কখনও করবে না।'),
      trap: t('The signs belong to the bases: a subtracted cube means a negative base, and two negatives make the final product positive.', 'চিহ্নগুলো ভিত্তির সঙ্গে থাকে: বিয়োগ করা ঘন মানে ঋণাত্মক ভিত্তি, আর দুটি ঋণাত্মক মিলে শেষ গুণফল ধনাত্মক হয়।'),
      spot: t(
        'Three cubes are added or subtracted, and the numbers inside (with their signs) add up to $0$.',
        'তিনটি ঘন যোগ-বিয়োগ করা আছে, আর ভেতরের সংখ্যাগুলো (চিহ্নসহ) যোগ করলে $0$ হয়।',
      ),
      method: [
        t(r`Write each term as a cube with its sign: $-15^3 = (-15)^3$.`, r`প্রতিটি পদকে চিহ্নসহ ঘন হিসেবে লেখো: $-15^3 = (-15)^3$।`),
        t(r`Check $a + b + c = 0$.`, r`দেখো $a + b + c = 0$ কি না।`),
        t(r`If yes, the answer is simply $3abc$. No need to cube big numbers.`, r`হলে উত্তর সোজা $3abc$। বড়ো সংখ্যার ঘন করার দরকার নেই।`),
      ],
      example: {
        question: t(r`Find the value of $25^3 - 15^3 - 10^3$.`, r`$25^3 - 15^3 - 10^3$-এর মান কত?`),
        steps: [
          t(r`Take $a = 25$, $b = -15$, $c = -10$. Then $a + b + c = 25 - 15 - 10 = 0$.`, r`ধরো $a = 25$, $b = -15$, $c = -10$। তাহলে $a + b + c = 25 - 15 - 10 = 0$।`),
          t(r`So the value $= 3abc = 3 \times 25 \times (-15) \times (-10)$.`, r`তাই মান $= 3abc = 3 \times 25 \times (-15) \times (-10)$।`),
          t(r`$= 3 \times 3750 = 11250$.`, r`অর্থাৎ $= 3 \times 3750 = 11250$।`),
        ],
        answer: t('The value is $11250$.', 'নির্ণেয় মান $11250$।'),
      },
      tryIt: {
        question: t(r`Find the value of $20^3 - 12^3 - 8^3$.`, r`$20^3 - 12^3 - 8^3$-এর মান কত?`),
        options: [t('0', '0'), t('1920', '1920'), t('2880', '2880'), t('5760', '5760')],
        correct: 3,
        explanation: [
          t(r`$20 - 12 - 8 = 0$, so the value is $3abc$.`, r`$20 - 12 - 8 = 0$, তাই মান $3abc$।`),
          t(r`$3 \times 20 \times (-12) \times (-8) = 3 \times 1920 = 5760$. (Forgetting the $3$ gives $1920$.)`, r`$3 \times 20 \times (-12) \times (-8) = 3 \times 1920 = 5760$। ($3$ গুণ করতে ভুলে গেলে $1920$ আসে।)`),
        ],
      },
    },
    // 6 ─────────────────────────────────────────────
    {
      key: 'linear_equation_word',
      emoji: '📝',
      name: t('Word problem: form one linear equation and solve', 'শব্দের প্রশ্ন: একটি একঘাত সমীকরণ গঠন করে সমাধান'),
      difficulty: 'beginner',
      typicalWording: t('“The sum of a number and three times the number is 36. Find the number.”', '“একটি সংখ্যা ও তার তিনগুণের যোগফল 36। সংখ্যাটি কত?”'),
      formula: t(r`Let the number be $x$; translate each phrase into an expression in $x$ and set the total equal to the given value.`, r`সংখ্যাটিকে $x$ ধরো; প্রতিটি বাক্যাংশকে $x$-এর রাশিতে বদলে মোট মানের সঙ্গে সমান করো।`),
      shortcut: t('The direct method is already fastest: name the unknown, write the equation in one line, and collect the x terms.', 'সরাসরি পদ্ধতিটাই সবচেয়ে দ্রুত: অজানাটির নাম দাও, এক লাইনে সমীকরণ লেখো, x-এর পদগুলো একত্র করো।'),
      trap: t('“Three times the number” is 3x added to x, not 3 added to x; read each phrase in order.', '“সংখ্যার তিনগুণ” মানে x-এর সঙ্গে 3x যোগ, x-এর সঙ্গে 3 যোগ নয়; প্রতিটি বাক্যাংশ পরপর পড়ো।'),
      spot: t(
        'A story about **one unknown number** — its multiples, or a number plus a fixed amount, add up to a given total.',
        '**একটি অজানা সংখ্যা** নিয়ে গল্প — তার গুণিতক, বা সংখ্যার সঙ্গে নির্দিষ্ট পরিমাণ যোগ করে মোট একটি মান দেওয়া থাকে।',
      ),
      method: [
        t('Let the unknown number be x.', 'অজানা সংখ্যাটিকে x ধরো।'),
        t('Turn each phrase into algebra: “three times the number” becomes 3x.', 'প্রতিটি বাক্যাংশকে বীজগণিতে বদলাও: “সংখ্যার তিনগুণ” হয় 3x।'),
        t('Write the equation from the total given and collect the x terms.', 'দেওয়া মোট মান থেকে সমীকরণ লিখে x-এর পদগুলো একত্র করো।'),
        t('Divide to find x, then check by putting it back into the story.', 'ভাগ করে x বের করো, তারপর গল্পে বসিয়ে যাচাই করো।'),
      ],
      example: {
        question: t(
          'The sum of a number and three times the number is 36. Find the number.',
          'একটি সংখ্যা ও তার তিনগুণের যোগফল 36। সংখ্যাটি নির্ণয় করো।',
        ),
        steps: [
          t(r`Let the number be $x$. Then three times the number is $3x$.`, r`ধরো সংখ্যাটি $x$। তাহলে তার তিনগুণ হল $3x$।`),
          t(r`Equation: $x + 3x = 36$, so $4x = 36$.`, r`সমীকরণ: $x + 3x = 36$, অর্থাৎ $4x = 36$।`),
          t(r`$x = 36 \div 4 = 9$. Check: $9 + 27 = 36$.`, r`$x = 36 \div 4 = 9$। যাচাই: $9 + 27 = 36$।`),
        ],
        answer: t('The number is 9', 'সংখ্যাটি 9'),
      },
      tryIt: {
        question: t(
          'Twice a number plus 5 equals 29. Find the number.',
          'একটি সংখ্যার দ্বিগুণের সঙ্গে 5 যোগ করলে 29 হয়। সংখ্যাটি কত?',
        ),
        options: [t('10', '10'), t('12', '12'), t('17', '17'), t('14', '14')],
        correct: 1,
        explanation: [
          t(r`Let the number be $x$: $2x + 5 = 29$.`, r`ধরো সংখ্যাটি $x$: $2x + 5 = 29$।`),
          t(r`$2x = 29 - 5 = 24$, so $x = 12$. (Adding 5 instead of subtracting gives 17.)`, r`$2x = 29 - 5 = 24$, তাই $x = 12$। (বিয়োগের বদলে 5 যোগ করলে 17 আসে।)`),
        ],
      },
    },
    // 7 ─────────────────────────────────────────────
    {
      key: 'factorise_and_evaluate',
      emoji: '🧩',
      name: t('Factorise a quadratic, then evaluate', 'দ্বিঘাত রাশির উৎপাদক বিশ্লেষণ করে মান নির্ণয়'),
      difficulty: 'beginner',
      typicalWording: t(r`“If $x = 7$, find the value of $x^2 - 5x + 6$” — or “factorise and hence evaluate”.`, r`“$x = 7$ হলে $x^2 - 5x + 6$-এর মান কত” — বা “উৎপাদকে বিশ্লেষণ করে মান নির্ণয় করো”।`),
      formula: t(r`$x^2 - (p + q)x + pq = (x - p)(x - q)$: find two numbers with product $pq$ and sum $p + q$.`, r`$x^2 - (p + q)x + pq = (x - p)(x - q)$: এমন দুটি সংখ্যা খোঁজো যাদের গুণফল $pq$ ও যোগফল $p + q$।`),
      shortcut: t('Once factorised, each bracket is a small subtraction — much faster and safer than squaring and multiplying the big value directly.', 'উৎপাদকে ভাঙলে প্রতিটি বন্ধনী ছোটো বিয়োগ হয় — বড়ো মানের বর্গ ও গুণ সরাসরি করার চেয়ে দ্রুত ও নিরাপদ।'),
      trap: t('Watch the signs: a positive constant with a negative middle term means both bracket signs are negative.', 'চিহ্ন খেয়াল করো: ধ্রুবক ধনাত্মক ও মাঝের পদ ঋণাত্মক হলে দুটি বন্ধনীর চিহ্নই ঋণাত্মক হয়।'),
      spot: t(
        r`A quadratic in $x$ is given **together with a value of $x$**, and its value is asked.`,
        r`$x$-এর একটি দ্বিঘাত রাশির সঙ্গে **$x$-এর একটি মান** দেওয়া থাকে, রাশিটির মান জানতে চাওয়া হয়।`,
      ),
      method: [
        t('Split the middle term using two numbers whose product is the constant term and whose sum is the middle coefficient.', 'মাঝের পদটিকে এমন দুই ভাগে ভাঙো যাদের গুণফল ধ্রুবক পদের সমান ও যোগফল মাঝের সহগের সমান।'),
        t('Group and take out common factors to write the two brackets.', 'দল করে সাধারণ উৎপাদক বের করে দুটি বন্ধনীতে লেখো।'),
        t('Put the given value of x into each bracket and multiply.', 'প্রতিটি বন্ধনীতে x-এর দেওয়া মান বসিয়ে গুণ করো।'),
      ],
      example: {
        question: t(r`If $x = 7$, find the value of $x^2 - 5x + 6$.`, r`$x = 7$ হলে $x^2 - 5x + 6$-এর মান কত?`),
        steps: [
          t(r`Split $-5x$ as $-2x - 3x$ (product $6$, sum $-5$): $x^2 - 2x - 3x + 6$.`, r`$-5x$-কে $-2x - 3x$ হিসেবে ভাঙো (গুণফল $6$, যোগফল $-5$): $x^2 - 2x - 3x + 6$।`),
          t(r`Factorise: $x(x - 2) - 3(x - 2) = (x - 2)(x - 3)$.`, r`উৎপাদকে বিশ্লেষণ: $x(x - 2) - 3(x - 2) = (x - 2)(x - 3)$।`),
          t(r`At $x = 7$: $(7 - 2)(7 - 3) = 5 \times 4 = 20$.`, r`$x = 7$ বসিয়ে: $(7 - 2)(7 - 3) = 5 \times 4 = 20$।`),
        ],
        answer: t('The value is 20', 'মানটি 20'),
      },
      tryIt: {
        question: t(r`If $x = 9$, find the value of $x^2 - 8x + 15$.`, r`$x = 9$ হলে $x^2 - 8x + 15$-এর মান কত?`),
        options: [t('20', '20'), t('24', '24'), t('30', '30'), t('15', '15')],
        correct: 1,
        explanation: [
          t(r`$x^2 - 8x + 15 = (x - 3)(x - 5)$, since $3 + 5 = 8$ and $3 \times 5 = 15$.`, r`$x^2 - 8x + 15 = (x - 3)(x - 5)$, কারণ $3 + 5 = 8$ এবং $3 \times 5 = 15$।`),
          t(r`At $x = 9$: $(9 - 3)(9 - 5) = 6 \times 4 = 24$.`, r`$x = 9$ বসিয়ে: $(9 - 3)(9 - 5) = 6 \times 4 = 24$।`),
        ],
      },
    },
    // 8 ─────────────────────────────────────────────
    {
      key: 'pair_linear_equations',
      emoji: '✌️',
      name: t('A pair of linear equations in two unknowns', 'দুটি অজানা রাশির একজোড়া একঘাত সমীকরণ'),
      difficulty: 'intermediate',
      typicalWording: t(r`“$x + y = 10$ and $x - y = 2$. Find $x$ and $y$.”`, r`“$x + y = 10$ এবং $x - y = 2$। $x$ ও $y$ নির্ণয় করো।”`),
      formula: t(r`Add the equations to eliminate the unknown that has opposite signs; subtract to eliminate the one with the same sign.`, r`বিপরীত চিহ্নের অজানাটি বাদ দিতে সমীকরণ দুটি যোগ করো; একই চিহ্নেরটি বাদ দিতে বিয়োগ করো।`),
      shortcut: t('When the pair is already a sum and a difference, add and halve for the first unknown, subtract and halve for the second — no substitution needed.', 'জোড়াটি যোগফল ও অন্তর আকারে থাকলে যোগ করে অর্ধেক করলে প্রথম অজানা, বিয়োগ করে অর্ধেক করলে দ্বিতীয়টি পাওয়া যায় — প্রতিস্থাপনের দরকার নেই।'),
      trap: t('Answer with the unknown that was asked: after adding, you get x, not y; mixing up the two values is the usual slip.', 'যে অজানাটি চাওয়া হয়েছে তার উত্তর দাও: যোগ করলে x পাওয়া যায়, y নয়; দুটি মান গুলিয়ে ফেলাই সাধারণ ভুল।'),
      spot: t(
        'Two equations with the **same two unknowns** are given together, and both values are asked.',
        'একই **দুটি অজানা রাশি** নিয়ে দুটি সমীকরণ একসঙ্গে দেওয়া থাকে, দুটিরই মান জানতে চাওয়া হয়।',
      ),
      method: [
        t('Look at the signs: choose addition or subtraction so one unknown cancels.', 'চিহ্ন দেখো: একটি অজানা যাতে কেটে যায় সেভাবে যোগ বা বিয়োগ বেছে নাও।'),
        t('Solve the single equation that remains for the first unknown.', 'যে একটি সমীকরণ বাকি থাকে তা থেকে প্রথম অজানাটি বের করো।'),
        t('Put that value into either original equation to get the second unknown.', 'সেই মানটি যেকোনো একটি মূল সমীকরণে বসিয়ে দ্বিতীয় অজানাটি বের করো।'),
        t('Check both values in the other equation.', 'অন্য সমীকরণে দুটি মান বসিয়ে যাচাই করো।'),
      ],
      example: {
        question: t(r`If $x + y = 10$ and $x - y = 2$, find $x$ and $y$.`, r`$x + y = 10$ এবং $x - y = 2$ হলে $x$ ও $y$ নির্ণয় করো।`),
        steps: [
          t(r`Add the equations: $2x = 12$, so $x = 6$.`, r`সমীকরণ দুটি যোগ করো: $2x = 12$, তাই $x = 6$।`),
          t(r`Put $x = 6$ in $x + y = 10$: $y = 10 - 6 = 4$.`, r`$x + y = 10$-এ $x = 6$ বসাও: $y = 10 - 6 = 4$।`),
          t(r`Check: $6 - 4 = 2$. Correct.`, r`যাচাই: $6 - 4 = 2$। সঠিক।`),
        ],
        answer: t(r`$x = 6$, $y = 4$`, 'মান: $x = 6$, $y = 4$'),
      },
      tryIt: {
        question: t(r`If $x + y = 13$ and $x - y = 3$, what is $x$?`, r`$x + y = 13$ এবং $x - y = 3$ হলে $x$ কত?`),
        options: [t('5', '5'), t('8', '8'), t('10', '10'), t('6', '6')],
        correct: 1,
        explanation: [
          t(r`Add the equations: $2x = 16$, so $x = 8$.`, r`সমীকরণ দুটি যোগ করো: $2x = 16$, তাই $x = 8$।`),
          t(r`Then $y = 13 - 8 = 5$ — that is the distractor 5, not $x$.`, r`তখন $y = 13 - 8 = 5$ — এই 5 হল বিভ্রান্তিকর বিকল্প, $x$ নয়।`),
        ],
      },
    },
    // 9 ─────────────────────────────────────────────
    {
      key: 'quadratic_sum_product_roots',
      emoji: '🌱',
      name: t('Sum and product of the roots of a quadratic', 'দ্বিঘাত সমীকরণের বীজদ্বয়ের যোগফল ও গুণফল'),
      difficulty: 'intermediate',
      typicalWording: t(r`“$\alpha$ and $\beta$ are the roots of $x^2 - 5x + 6 = 0$. Find $\alpha^2 + \beta^2$.”`, r`“$\alpha$ ও $\beta$, $x^2 - 5x + 6 = 0$ সমীকরণের বীজ। $\alpha^2 + \beta^2$ নির্ণয় করো।”`),
      formula: t(r`For $x^2 + px + q = 0$: $\alpha + \beta = -p$ and $\alpha\beta = q$. For $ax^2 + bx + c = 0$: sum $= -b/a$, product $= c/a$.`, r`$x^2 + px + q = 0$ হলে: $\alpha + \beta = -p$ এবং $\alpha\beta = q$। $ax^2 + bx + c = 0$ হলে: যোগফল $= -b/a$, গুণফল $= c/a$।`),
      shortcut: t('Never solve for the roots: read the sum and product straight from the coefficients, then use an identity like (sum)² − 2(product).', 'বীজ বের করার চেষ্টা করো না: সহগ থেকে সরাসরি যোগফল ও গুণফল পড়ে নাও, তারপর (যোগফল)² − 2(গুণফল)-এর মতো অভেদ ব্যবহার করো।'),
      trap: t('The sum of the roots takes the opposite sign of the middle coefficient: for x² − 5x + 6 the sum is +5, not −5.', 'বীজদ্বয়ের যোগফলে মাঝের সহগের বিপরীত চিহ্ন আসে: x² − 5x + 6-এর ক্ষেত্রে যোগফল +5, −5 নয়।'),
      spot: t(
        r`A quadratic equation is given and an expression in its roots $\alpha, \beta$ — like $\alpha^2 + \beta^2$ or $\frac{1}{\alpha} + \frac{1}{\beta}$ — is asked, without asking for the roots themselves.`,
        r`একটি দ্বিঘাত সমীকরণ দেওয়া থাকে এবং তার বীজ $\alpha, \beta$ দিয়ে গড়া রাশি — যেমন $\alpha^2 + \beta^2$ বা $\frac{1}{\alpha} + \frac{1}{\beta}$ — জানতে চাওয়া হয়, বীজ দুটি নিজে চাওয়া হয় না।`,
      ),
      method: [
        t(r`Read off $\alpha + \beta$ and $\alpha\beta$ from the coefficients (note the sign of the sum).`, r`সহগ থেকে $\alpha + \beta$ ও $\alpha\beta$ পড়ে নাও (যোগফলের চিহ্ন খেয়াল করো)।`),
        t('Rewrite the asked expression using the sum and product, e.g. α² + β² = (α + β)² − 2αβ.', 'চাওয়া রাশিটিকে যোগফল ও গুণফল দিয়ে সাজাও, যেমন α² + β² = (α + β)² − 2αβ।'),
        t('Put in the two values and simplify.', 'দুটি মান বসিয়ে সরল করো।'),
      ],
      example: {
        question: t(r`$\alpha$ and $\beta$ are the roots of $x^2 - 5x + 6 = 0$. Find $\alpha^2 + \beta^2$.`, r`$\alpha$ ও $\beta$, $x^2 - 5x + 6 = 0$ সমীকরণের বীজ। $\alpha^2 + \beta^2$ নির্ণয় করো।`),
        steps: [
          t(r`$\alpha + \beta = 5$ and $\alpha\beta = 6$.`, r`$\alpha + \beta = 5$ এবং $\alpha\beta = 6$।`),
          t(r`$\alpha^2 + \beta^2 = (\alpha + \beta)^2 - 2\alpha\beta = 25 - 12$.`, r`তাই $\alpha^2 + \beta^2 = (\alpha + \beta)^2 - 2\alpha\beta = 25 - 12$।`),
          t(r`$= 13$. (Check: the roots are $2$ and $3$, and $4 + 9 = 13$.)`, r`$= 13$। (যাচাই: বীজ দুটি $2$ ও $3$, এবং $4 + 9 = 13$।)`),
        ],
        answer: t(r`$\alpha^2 + \beta^2 = 13$`, r`নির্ণেয় মান $\alpha^2 + \beta^2 = 13$।`),
      },
      tryIt: {
        question: t(r`$\alpha$ and $\beta$ are the roots of $x^2 - 7x + 12 = 0$. Find $\alpha^2 + \beta^2$.`, r`$\alpha$ ও $\beta$, $x^2 - 7x + 12 = 0$ সমীকরণের বীজ। $\alpha^2 + \beta^2$ নির্ণয় করো।`),
        options: [t('37', '37'), t('25', '25'), t('49', '49'), t('13', '13')],
        correct: 1,
        explanation: [
          t(r`$\alpha + \beta = 7$ and $\alpha\beta = 12$.`, r`$\alpha + \beta = 7$ এবং $\alpha\beta = 12$।`),
          t(r`$\alpha^2 + \beta^2 = 7^2 - 2 \times 12 = 49 - 24 = 25$. (Subtracting only $12$ once gives the trap 37.)`, r`$\alpha^2 + \beta^2 = 7^2 - 2 \times 12 = 49 - 24 = 25$। ($12$ শুধু একবার বিয়োগ করলে ভুল 37 আসে।)`),
        ],
      },
    },
    // 10 ─────────────────────────────────────────────
    {
      key: 'x_minus_one_over_x',
      emoji: '➖',
      name: t(r`Find $x^2 + \frac{1}{x^2}$ from $x - \frac{1}{x}$ (the minus family)`, r`$x - \frac{1}{x}$ থেকে $x^2 + \frac{1}{x^2}$ নির্ণয় (বিয়োগ পরিবার)`),
      difficulty: 'intermediate',
      typicalWording: t(r`“If $x - \frac{1}{x} = k$, find $x^2 + \frac{1}{x^2}$.”`, r`“$x - \frac{1}{x} = k$ হলে $x^2 + \frac{1}{x^2}$ কত?”`),
      formula: t(r`$x^2 + \frac{1}{x^2} = k^2 + 2$, where $k = x - \frac{1}{x}$.`, r`$x^2 + \frac{1}{x^2} = k^2 + 2$, যেখানে $k = x - \frac{1}{x}$।`),
      shortcut: t('Same squaring as the plus family, but the sign flips: for the minus form you add 2 instead of subtracting it.', 'যোগ পরিবারের মতোই বর্গ, কিন্তু চিহ্ন উল্টো: বিয়োগ আকারে 2 বিয়োগের বদলে যোগ হয়।'),
      trap: t(r`Using $k^2 - 2$ here is the classic error — that rule belongs to $x + \frac{1}{x}$. With a minus, the cross term is $-2$, so it cancels by adding.`, r`এখানে $k^2 - 2$ ব্যবহার করাই চিরাচরিত ভুল — ওই নিয়ম $x + \frac{1}{x}$-এর। বিয়োগ থাকলে মাঝের পদ $-2$, তাই যোগ করে কাটাতে হয়।`),
      spot: t(
        r`The question gives $x - \frac{1}{x}$ — with a **minus** — and asks for $x^2 + \frac{1}{x^2}$.`,
        r`প্রশ্নে $x - \frac{1}{x}$ দেওয়া থাকে — **বিয়োগ** চিহ্নসহ — আর $x^2 + \frac{1}{x^2}$ চাওয়া হয়।`,
      ),
      method: [
        t(r`Square both sides: $\left(x - \frac{1}{x}\right)^2 = x^2 + \frac{1}{x^2} - 2$.`, r`দুই দিক বর্গ করো: $\left(x - \frac{1}{x}\right)^2 = x^2 + \frac{1}{x^2} - 2$।`),
        t(r`So $x^2 + \frac{1}{x^2} = k^2 + 2$, where $k$ is the given value.`, r`তাই $x^2 + \frac{1}{x^2} = k^2 + 2$, যেখানে $k$ হল দেওয়া মান।`),
        t('Check the sign in the question before choosing +2 or −2.', 'শেষে +2 না −2 বাছার আগে প্রশ্নের চিহ্নটি আবার দেখে নাও।'),
      ],
      example: {
        question: t(r`If $x - \frac{1}{x} = 3$, find $x^2 + \frac{1}{x^2}$.`, r`$x - \frac{1}{x} = 3$ হলে $x^2 + \frac{1}{x^2}$ কত?`),
        steps: [
          t(r`Square: $3^2 = 9$.`, r`বর্গ করো: $3^2 = 9$।`),
          t(r`Add $2$ (minus family): $9 + 2 = 11$.`, r`$2$ যোগ করো (বিয়োগ পরিবার): $9 + 2 = 11$।`),
        ],
        answer: t(r`$x^2 + \frac{1}{x^2} = 11$`, r`নির্ণেয় মান $11$।`),
      },
      tryIt: {
        question: t(r`If $x - \frac{1}{x} = 4$, find $x^2 + \frac{1}{x^2}$.`, r`$x - \frac{1}{x} = 4$ হলে $x^2 + \frac{1}{x^2}$ কত?`),
        options: [t('14', '14'), t('18', '18'), t('16', '16'), t('20', '20')],
        correct: 1,
        explanation: [
          t(r`Square: $4^2 = 16$.`, r`বর্গ করো: $4^2 = 16$।`),
          t(r`Add $2$, because the given form has a minus: $16 + 2 = 18$. (14 comes from wrongly subtracting 2.)`, r`$2$ যোগ করো, কারণ দেওয়া আকারে বিয়োগ আছে: $16 + 2 = 18$। (ভুল করে 2 বিয়োগ করলে 14 আসে।)`),
        ],
      },
    },
    // 11 ─────────────────────────────────────────────
    {
      key: 'sum_of_squares_from_pair',
      emoji: '🎛️',
      name: t(r`Find $a^2 + b^2$ from both $a + b$ and $a - b$`, r`$a + b$ ও $a - b$ দুটো থেকে $a^2 + b^2$ নির্ণয়`),
      difficulty: 'intermediate',
      typicalWording: t(r`“If $a + b = \dots$ and $a - b = \dots$, find $a^2 + b^2$.”`, r`“$a + b = \dots$ এবং $a - b = \dots$ হলে $a^2 + b^2$ কত?”`),
      formula: t(r`$a^2 + b^2 = \frac{(a + b)^2 + (a - b)^2}{2}$.`, r`সূত্র: $a^2 + b^2 = \frac{(a + b)^2 + (a - b)^2}{2}$।`),
      shortcut: t('Square both given values, add them and halve — the 2ab terms cancel, so you never need ab or the values of a and b.', 'দেওয়া দুটি মানের বর্গ করে যোগ করে অর্ধেক করো — 2ab পদ দুটি কেটে যায়, তাই ab বা a, b-এর মান লাগে না।'),
      trap: t('Do not forget to halve at the end: the sum of the two squares counts a² + b² twice.', 'শেষে অর্ধেক করতে ভুলবে না: দুটি বর্গের যোগফলে a² + b² দুবার গোনা হয়।'),
      spot: t(
        r`**Both** $a + b$ **and** $a - b$ are given (no product $ab$), and $a^2 + b^2$ is asked.`,
        r`$a + b$ **ও** $a - b$ **দুটোই** দেওয়া থাকে (গুণফল $ab$ দেওয়া থাকে না), $a^2 + b^2$ জানতে চাওয়া হয়।`,
      ),
      method: [
        t(r`Use $(a + b)^2 + (a - b)^2 = 2(a^2 + b^2)$ — the $2ab$ terms cancel.`, r`$(a + b)^2 + (a - b)^2 = 2(a^2 + b^2)$ ব্যবহার করো — $2ab$ পদ দুটি কেটে যায়।`),
        t('Square both given values and add them.', 'দেওয়া দুটি মানের বর্গ করে যোগ করো।'),
        t('Halve the total to get a² + b².', 'যোগফলকে অর্ধেক করলেই a² + b² পাওয়া যায়।'),
      ],
      example: {
        question: t(r`If $a + b = 12$ and $a - b = 4$, find $a^2 + b^2$.`, r`$a + b = 12$ এবং $a - b = 4$ হলে $a^2 + b^2$ কত?`),
        steps: [
          t(r`$(a + b)^2 = 144$ and $(a - b)^2 = 16$.`, r`$(a + b)^2 = 144$ এবং $(a - b)^2 = 16$।`),
          t(r`Sum $= 144 + 16 = 160 = 2(a^2 + b^2)$.`, r`যোগফল $= 144 + 16 = 160 = 2(a^2 + b^2)$।`),
          t(r`$a^2 + b^2 = 160 \div 2 = 80$. (Check: $a = 8, b = 4$ gives $64 + 16 = 80$.)`, r`$a^2 + b^2 = 160 \div 2 = 80$। (যাচাই: $a = 8, b = 4$ নিলে $64 + 16 = 80$।)`),
        ],
        answer: t(r`$a^2 + b^2 = 80$`, r`নির্ণেয় মান $80$।`),
      },
      tryIt: {
        question: t(r`If $a + b = 10$ and $a - b = 6$, find $a^2 + b^2$.`, r`$a + b = 10$ এবং $a - b = 6$ হলে $a^2 + b^2$ কত?`),
        options: [t('32', '32'), t('68', '68'), t('136', '136'), t('52', '52')],
        correct: 1,
        explanation: [
          t(r`$(a + b)^2 + (a - b)^2 = 100 + 36 = 136$.`, r`এখানে $(a + b)^2 + (a - b)^2 = 100 + 36 = 136$।`),
          t(r`Halve it: $136 \div 2 = 68$. (136 forgets the halving; 32 comes from subtracting the squares.)`, r`অর্ধেক করো: $136 \div 2 = 68$। (136 পাওয়া যায় অর্ধেক করতে ভুলে গেলে; বর্গ দুটি বিয়োগ করলে 32 আসে।)`),
        ],
      },
    },
    // 12 ─────────────────────────────────────────────
    {
      key: 'divide_equation_trick',
      emoji: '➗',
      name: t('Divide the equation by x to get the reciprocal form', 'সমীকরণকে x দিয়ে ভাগ করে অন্যোন্যক আকার আনা'),
      difficulty: 'advanced',
      typicalWording: t(r`“If $x^2 - 3x + 1 = 0$, find $x^2 + \frac{1}{x^2}$.”`, r`“$x^2 - 3x + 1 = 0$ হলে $x^2 + \frac{1}{x^2}$ কত?”`),
      formula: t(r`Dividing $x^2 - kx + 1 = 0$ by $x$ gives $x + \frac{1}{x} = k$; then $x^2 + \frac{1}{x^2} = k^2 - 2$.`, r`$x^2 - kx + 1 = 0$-কে $x$ দিয়ে ভাগ করলে $x + \frac{1}{x} = k$ পাওয়া যায়; তারপর $x^2 + \frac{1}{x^2} = k^2 - 2$।`),
      shortcut: t('Spot the constant term 1 and matching first coefficient: just read k off the middle term, then apply k² − 2.', 'ধ্রুবক পদ 1 ও প্রথম সহগ মিলছে দেখলেই মাঝের পদ থেকে সরাসরি k পড়ে নাও, তারপর k² − 2 প্রয়োগ করো।'),
      trap: t('Dividing by x is safe here only because x = 0 does not satisfy the equation (it would give 1 = 0); also keep the sign of the middle term when moving it across.', 'এখানে x দিয়ে ভাগ করা নিরাপদ শুধু এই কারণে যে x = 0 সমীকরণটিকে সিদ্ধ করে না (তাহলে 1 = 0 হত); মাঝের পদটি অন্য পাশে নেওয়ার সময় চিহ্ন ঠিক রাখো।'),
      spot: t(
        r`A quadratic equation in $x$ with **constant term $1$** is given (not an $x + \frac{1}{x}$ value), and a reciprocal expression is asked.`,
        r`$x$-এর একটি দ্বিঘাত সমীকরণ দেওয়া থাকে যার **ধ্রুবক পদ $1$** ($x + \frac{1}{x}$-এর মান দেওয়া থাকে না), অন্যোন্যক রাশির মান চাওয়া হয়।`,
      ),
      method: [
        t(r`Divide every term of the equation by $x$.`, r`সমীকরণের প্রতিটি পদকে $x$ দিয়ে ভাগ করো।`),
        t(r`Rearrange to get $x + \frac{1}{x} = k$ from the middle term.`, r`সাজিয়ে মাঝের পদ থেকে $x + \frac{1}{x} = k$ আকারে আনো।`),
        t(r`Now use the reciprocal identity: $x^2 + \frac{1}{x^2} = k^2 - 2$.`, r`এবার অন্যোন্যক অভেদ ব্যবহার করো: $x^2 + \frac{1}{x^2} = k^2 - 2$।`),
      ],
      example: {
        question: t(r`If $x^2 - 3x + 1 = 0$, find $x^2 + \frac{1}{x^2}$.`, r`$x^2 - 3x + 1 = 0$ হলে $x^2 + \frac{1}{x^2}$ কত?`),
        steps: [
          t(r`Divide by $x$: $x - 3 + \frac{1}{x} = 0$, so $x + \frac{1}{x} = 3$.`, r`$x$ দিয়ে ভাগ করো: $x - 3 + \frac{1}{x} = 0$, তাই $x + \frac{1}{x} = 3$।`),
          t(r`Square and subtract $2$: $3^2 - 2 = 9 - 2$.`, r`বর্গ করে $2$ বিয়োগ করো: $3^2 - 2 = 9 - 2$।`),
          t(r`$= 7$.`, 'তাই মান $7$।'),
        ],
        answer: t(r`$x^2 + \frac{1}{x^2} = 7$`, r`নির্ণেয় মান $7$।`),
      },
      tryIt: {
        question: t(r`If $x^2 - 5x + 1 = 0$, find $x^2 + \frac{1}{x^2}$.`, r`$x^2 - 5x + 1 = 0$ হলে $x^2 + \frac{1}{x^2}$ কত?`),
        options: [t('27', '27'), t('23', '23'), t('25', '25'), t('21', '21')],
        correct: 1,
        explanation: [
          t(r`Divide by $x$: $x + \frac{1}{x} = 5$.`, r`$x$ দিয়ে ভাগ করো: $x + \frac{1}{x} = 5$।`),
          t(r`$x^2 + \frac{1}{x^2} = 5^2 - 2 = 23$. (27 comes from adding 2 instead.)`, r`$x^2 + \frac{1}{x^2} = 5^2 - 2 = 23$। (2 বিয়োগের বদলে যোগ করলে 27 আসে।)`),
        ],
      },
    },
    // 13 ─────────────────────────────────────────────
    {
      key: 'remainder_factor_theorem',
      emoji: '🎯',
      name: t('Remainder and factor theorem for a polynomial', 'বহুপদ রাশির ভাগশেষ ও উৎপাদক উপপাদ্য'),
      difficulty: 'advanced',
      typicalWording: t('“Find the remainder when a polynomial is divided by x − a” or “show that x − a is a factor”.', '“একটি বহুপদকে x − a দিয়ে ভাগ করলে ভাগশেষ কত” বা “দেখাও যে x − a একটি উৎপাদক”।'),
      formula: t(r`The remainder on dividing $f(x)$ by $(x - a)$ is $f(a)$. If $f(a) = 0$, then $(x - a)$ is a factor of $f(x)$.`, r`$f(x)$-কে $(x - a)$ দিয়ে ভাগ করলে ভাগশেষ হয় $f(a)$। $f(a) = 0$ হলে $(x - a)$, $f(x)$-এর একটি উৎপাদক।`),
      shortcut: t('Skip the long division entirely: put x = a into the polynomial and simplify — that single value is the remainder.', 'দীর্ঘ ভাগ পুরোপুরি বাদ দাও: বহুপদে x = a বসিয়ে সরল করো — ওই একটিমাত্র মানই ভাগশেষ।'),
      trap: t(r`For a divisor $(x + a)$, put $x = -a$, not $+a$; the sign comes from setting the divisor equal to zero.`, r`ভাজক $(x + a)$ হলে $x = -a$ বসাও, $+a$ নয়; চিহ্নটি আসে ভাজককে শূন্য ধরে।`),
      spot: t(
        'A polynomial is **divided by a linear expression** like (x − 2), and only the remainder — or whether it divides exactly — is asked.',
        'একটি বহুপদকে (x − 2)-এর মতো **একঘাত রাশি দিয়ে ভাগ** করা হয়, শুধু ভাগশেষ — বা ঠিকঠাক ভাগ যায় কি না — জানতে চাওয়া হয়।',
      ),
      method: [
        t('Set the divisor equal to zero to find the value to substitute, e.g. x − 2 = 0 gives x = 2.', 'ভাজককে শূন্য ধরে বসানোর মানটি বের করো, যেমন x − 2 = 0 থেকে x = 2।'),
        t('Put that value into the polynomial in place of every x.', 'প্রতিটি x-এর জায়গায় ওই মানটি বসাও।'),
        t('Simplify carefully, term by term: the result is the remainder.', 'পদ ধরে ধরে সাবধানে সরল করো: ফলটিই ভাগশেষ।'),
        t('If the result is 0, the divisor is a factor of the polynomial.', 'ফল 0 হলে ভাজকটি বহুপদটির একটি উৎপাদক।'),
      ],
      example: {
        question: t(r`Find the remainder when $x^3 - 2x^2 + 3x - 5$ is divided by $(x - 2)$.`, r`$x^3 - 2x^2 + 3x - 5$-কে $(x - 2)$ দিয়ে ভাগ করলে ভাগশেষ কত?`),
        steps: [
          t(r`Put $x = 2$: $f(2) = 2^3 - 2 \times 2^2 + 3 \times 2 - 5$.`, r`$x = 2$ বসাও: $f(2) = 2^3 - 2 \times 2^2 + 3 \times 2 - 5$।`),
          t(r`$= 8 - 8 + 6 - 5$.`, 'অর্থাৎ $8 - 8 + 6 - 5$।'),
          t(r`$= 1$.`, 'তাই ভাগশেষ $1$।'),
        ],
        answer: t('The remainder is 1', 'ভাগশেষ 1'),
      },
      tryIt: {
        question: t(r`Find the remainder when $2x^3 - 3x^2 + 4x - 1$ is divided by $(x - 3)$.`, r`$2x^3 - 3x^2 + 4x - 1$-কে $(x - 3)$ দিয়ে ভাগ করলে ভাগশেষ কত?`),
        options: [t('28', '28'), t('38', '38'), t('32', '32'), t('44', '44')],
        correct: 1,
        explanation: [
          t(r`Put $x = 3$: $f(3) = 2 \times 27 - 3 \times 9 + 4 \times 3 - 1$.`, r`$x = 3$ বসাও: $f(3) = 2 \times 27 - 3 \times 9 + 4 \times 3 - 1$।`),
          t(r`$= 54 - 27 + 12 - 1 = 38$.`, 'অর্থাৎ $54 - 27 + 12 - 1 = 38$।'),
        ],
      },
    },
    // 14 ─────────────────────────────────────────────
    {
      key: 'ratio_value_of_expression',
      emoji: '⚗️',
      name: t('Value of an expression from a given ratio', 'প্রদত্ত অনুপাত থেকে একটি রাশির মান'),
      difficulty: 'advanced',
      typicalWording: t(r`“If $\frac{x}{y} = \frac{3}{4}$, find the value of $\frac{2x + 3y}{3x + 2y}$.”`, r`“$\frac{x}{y} = \frac{3}{4}$ হলে $\frac{2x + 3y}{3x + 2y}$-এর মান কত?”`),
      formula: t(r`Set $x = ak$ and $y = bk$ from $\frac{x}{y} = \frac{a}{b}$; the $k$ cancels in any ratio of expressions of the same degree.`, r`$\frac{x}{y} = \frac{a}{b}$ থেকে $x = ak$ ও $y = bk$ ধরো; একই ঘাতের রাশির অনুপাতে $k$ কেটে যায়।`),
      shortcut: t('Put the ratio numbers themselves in place of the letters (x = 3, y = 4) — since k cancels, the simplest values give the answer directly.', 'অক্ষরের জায়গায় অনুপাতের সংখ্যাগুলোই বসাও (x = 3, y = 4) — k কেটে যায় বলে সবচেয়ে সহজ মানেই সরাসরি উত্তর পাওয়া যায়।'),
      trap: t('Keep the order of the ratio straight: x takes the numerator number and y the denominator number; swapping them gives the reciprocal-style wrong answer.', 'অনুপাতের ক্রম ঠিক রাখো: x পায় লবের সংখ্যা, y পায় হরের সংখ্যা; উল্টে দিলে উল্টো ধরনের ভুল উত্তর আসে।'),
      spot: t(
        r`A ratio like $\frac{x}{y} = \frac{a}{b}$ is given, and the value of a **fraction built from $x$ and $y$** is asked.`,
        r`$\frac{x}{y} = \frac{a}{b}$-এর মতো একটি অনুপাত দেওয়া থাকে, **$x$ ও $y$ দিয়ে গড়া একটি ভগ্নাংশের** মান জানতে চাওয়া হয়।`,
      ),
      method: [
        t(r`Write $x = ak$ and $y = bk$ from the given ratio (or simply take $k = 1$).`, r`দেওয়া অনুপাত থেকে $x = ak$ ও $y = bk$ লেখো (বা সোজা $k = 1$ ধরো)।`),
        t('Substitute into the numerator and the denominator separately.', 'লব ও হরে আলাদা করে মান বসাও।'),
        t('Cancel k and simplify the fraction to its lowest terms.', 'k কেটে দিয়ে ভগ্নাংশটিকে লঘিষ্ঠ আকারে আনো।'),
      ],
      example: {
        question: t(r`If $\frac{x}{y} = \frac{3}{4}$, find the value of $\frac{2x + 3y}{3x + 2y}$.`, r`$\frac{x}{y} = \frac{3}{4}$ হলে $\frac{2x + 3y}{3x + 2y}$-এর মান কত?`),
        steps: [
          t(r`Take $x = 3$ and $y = 4$ (that is, $k = 1$).`, r`ধরো $x = 3$ ও $y = 4$ (অর্থাৎ $k = 1$)।`),
          t(r`Numerator: $2 \times 3 + 3 \times 4 = 6 + 12 = 18$. Denominator: $3 \times 3 + 2 \times 4 = 9 + 8 = 17$.`, r`লব: $2 \times 3 + 3 \times 4 = 6 + 12 = 18$। হর: $3 \times 3 + 2 \times 4 = 9 + 8 = 17$।`),
          t(r`Value $= \frac{18}{17}$.`, r`মান $= \frac{18}{17}$।`),
        ],
        answer: t(r`$\frac{18}{17}$`, r`মান $\frac{18}{17}$।`),
      },
      tryIt: {
        question: t(r`If $\frac{a}{b} = \frac{2}{3}$, find the value of $\frac{4a + 3b}{3a + 2b}$.`, r`$\frac{a}{b} = \frac{2}{3}$ হলে $\frac{4a + 3b}{3a + 2b}$-এর মান কত?`),
        options: [t(r`$\frac{12}{17}$`, r`$\frac{12}{17}$`), t(r`$\frac{17}{12}$`, r`$\frac{17}{12}$`), t('1', '1'), t(r`$\frac{13}{12}$`, r`$\frac{13}{12}$`)],
        correct: 1,
        explanation: [
          t(r`Take $a = 2$ and $b = 3$. Numerator: $4 \times 2 + 3 \times 3 = 8 + 9 = 17$.`, r`ধরো $a = 2$ ও $b = 3$। লব: $4 \times 2 + 3 \times 3 = 8 + 9 = 17$।`),
          t(r`Denominator: $3 \times 2 + 2 \times 3 = 6 + 6 = 12$, so the value is $\frac{17}{12}$.`, r`হর: $3 \times 2 + 2 \times 3 = 6 + 6 = 12$, তাই মান $\frac{17}{12}$।`),
        ],
      },
    },
  ],
};
