'use strict';

// Question patterns: Simplification & BODMAS. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'simplification',
  patterns: [
    // 1 ─────────────────────────────────────────────
    {
      key: 'bodmas_order',
      emoji: '🧮',
      name: t('Simplify using the BODMAS order', 'BODMAS নিয়মে সরল করা'),
      spot: t(
        'A long line with ÷, ×, + and − mixed together, and the question says "simplify" or "find the value".',
        'একটা লম্বা রাশিতে ÷, ×, + ও − একসঙ্গে থাকে, আর প্রশ্নে "সরল করো" বা "মান নির্ণয় করো" বলা থাকে।',
      ),
      method: [
        t('Order: **B**rackets → **O**f → **D**ivision and **M**ultiplication → **A**ddition and **S**ubtraction.', 'ক্রম: **B** বন্ধনী → **O** "এর" (of) → **D** ভাগ ও **M** গুণ → **A** যোগ ও **S** বিয়োগ।'),
        t('÷ and × have equal rank: do them from **left to right**. Same for + and −.', '÷ আর × সমান গুরুত্বের: **বাঁ দিক থেকে ডান দিকে** করো। + আর −-এর ক্ষেত্রেও তাই।'),
        t('Rewrite the line after every step so you do not lose a sign.', 'প্রতিটা ধাপের পর রাশিটা আবার লেখো, যাতে কোনো চিহ্ন হারিয়ে না যায়।'),
      ],
      example: {
        question: t(r`Simplify: $18 + 24 \div 6 \times 3 - 4$`, r`সরল করো: $18 + 24 \div 6 \times 3 - 4$`),
        steps: [
          t(r`÷ and × first, left to right: $24 \div 6 = 4$, then $4 \times 3 = 12$.`, r`আগে ÷ ও ×, বাঁ দিক থেকে: $24 \div 6 = 4$, তারপর $4 \times 3 = 12$।`),
          t(r`Now the line is $18 + 12 - 4$.`, r`এবার রাশিটা হল $18 + 12 - 4$।`),
          t(r`$18 + 12 - 4 = 26$.`, r`যোগ-বিয়োগ করে পাই $18 + 12 - 4 = 26$।`),
        ],
        answer: t('26', 'মান 26'),
      },
      tryIt: {
        question: t(r`Simplify: $36 \div 4 \times 3 + 8 - 2 \times 5$`, r`সরল করো: $36 \div 4 \times 3 + 8 - 2 \times 5$`),
        options: [t('1', '1'), t('25', '25'), t('57', '57'), t('165', '165')],
        correct: 1,
        explanation: [
          t(r`Left to right: $36 \div 4 = 9$, then $9 \times 3 = 27$. Also $2 \times 5 = 10$.`, r`বাঁ দিক থেকে: $36 \div 4 = 9$, তারপর $9 \times 3 = 27$। আর $2 \times 5 = 10$।`),
          t(r`Now: $27 + 8 - 10 = 25$.`, r`এবার: $27 + 8 - 10 = 25$।`),
          t(r`1 comes from doing $4 \times 3$ before $36 \div 4$ — but ÷ comes first here because it is on the left.`, r`আগে $4 \times 3$ করে তারপর ভাগ করলে 1 আসে — কিন্তু এখানে ÷ বাঁ দিকে, তাই সেটাই আগে।`),
        ],
      },
    },

    // 2 ─────────────────────────────────────────────
    {
      key: 'nested_brackets',
      emoji: '📦',
      name: t('Brackets inside brackets', 'বন্ধনীর ভিতরে বন্ধনী'),
      spot: t(
        'The expression has ( ), { } and [ ] one inside another.',
        'রাশিতে ( ), { } আর [ ] একটার ভিতরে আর একটা থাকে।',
      ),
      method: [
        t('Start from the **innermost** bracket ( ), then { }, then [ ].', 'সবচেয়ে **ভিতরের** বন্ধনী ( ) থেকে শুরু করো, তারপর { }, তারপর [ ]।'),
        t('Finish one bracket fully and replace it by a single number before moving out.', 'একটা বন্ধনী পুরো শেষ করে একটা সংখ্যায় পরিণত করো, তারপর বাইরের দিকে যাও।'),
        t('A minus sign in front of a bracket acts on the whole bracket\'s value.', 'বন্ধনীর আগে বিয়োগ চিহ্ন থাকলে তা পুরো বন্ধনীর মানের উপর কাজ করে।'),
      ],
      example: {
        question: t(r`Simplify: $50 - [20 - \{12 - (8 - 3)\}]$`, r`সরল করো: $50 - [20 - \{12 - (8 - 3)\}]$`),
        steps: [
          t(r`Innermost: $(8 - 3) = 5$.`, r`সবচেয়ে ভিতরে: $(8 - 3) = 5$।`),
          t(r`Next: $\{12 - 5\} = 7$.`, r`তারপর: $\{12 - 5\} = 7$।`),
          t(r`Next: $[20 - 7] = 13$. Last: $50 - 13 = 37$.`, r`তারপর: $[20 - 7] = 13$। শেষে: $50 - 13 = 37$।`),
        ],
        answer: t('37', 'মান 37'),
      },
      tryIt: {
        question: t(r`Simplify: $60 - [25 - \{15 - (9 - 4)\}]$`, r`সরল করো: $60 - [25 - \{15 - (9 - 4)\}]$`),
        options: [t('45', '45'), t('37', '37'), t('7', '7'), t('25', '25')],
        correct: 0,
        explanation: [
          t(r`$(9 - 4) = 5$, then $\{15 - 5\} = 10$.`, r`প্রথমে $(9 - 4) = 5$, তারপর $\{15 - 5\} = 10$।`),
          t(r`$[25 - 10] = 15$, and $60 - 15 = 45$.`, r`এরপর $[25 - 10] = 15$, আর $60 - 15 = 45$।`),
          t(r`7 comes from dropping all brackets and subtracting everything: $60 - 25 - 15 - 9 - 4$.`, r`সব বন্ধনী তুলে দিয়ে সব বিয়োগ করলে ($60 - 25 - 15 - 9 - 4$) 7 আসে — এটা ভুল।`),
        ],
      },
    },

    // 3 ─────────────────────────────────────────────
    {
      key: 'find_missing_number',
      emoji: '❓',
      name: t('Find the value of ? in an equation', 'সমীকরণে ? -এর মান নির্ণয়'),
      spot: t(
        'A line with percentages or fractions has a "?" in it and an "=" sign: "25% of 480 + ? = 3/4 of 200".',
        'শতকরা বা ভগ্নাংশ মেশানো একটা লাইনে "?" আর "=" চিহ্ন থাকে: "480-এর 25% + ? = 200-এর 3/4"।',
      ),
      method: [
        t('Work out every part you can on both sides first (percent of, fraction of).', 'আগে দুই দিকের যত অংশ পারো হিসাব করে ফেলো (শতকরা, ভগ্নাংশ)।'),
        t('Now you have a simple line like 120 + ? = 150. Move the known number to the other side (+ becomes −, − becomes +).', 'এবার সহজ লাইন পাবে, যেমন 120 + ? = 150। জানা সংখ্যাকে অন্য দিকে নাও (+ হয় −, − হয় +)।'),
        t('Put your answer back in to check.', 'উত্তরটা বসিয়ে মিলিয়ে দেখো।'),
      ],
      example: {
        question: t(r`Find ?: 25% of 480 + ? = $\frac{3}{4}$ of 200`, r`? -এর মান কত: 480-এর 25% + ? = 200-এর $\frac{3}{4}$`),
        steps: [
          t(r`25% of 480 $= \frac{1}{4} \times 480 = 120$.`, r`480-এর 25% $= \frac{1}{4} \times 480 = 120$।`),
          t(r`$\frac{3}{4}$ of 200 $= 150$.`, r`200-এর $\frac{3}{4}$ $= 150$।`),
          t('120 + ? = 150, so ? = 150 − 120 = 30.', '120 + ? = 150, তাই ? = 150 − 120 = 30।'),
        ],
        answer: t('30', '? = 30 (উত্তর)'),
      },
      tryIt: {
        question: t(r`Find ?: 40% of 350 − ? = $\frac{2}{5}$ of 250`, r`? -এর মান কত: 350-এর 40% − ? = 250-এর $\frac{2}{5}$`),
        options: [t('240', '240'), t('140', '140'), t('40', '40'), t('100', '100')],
        correct: 2,
        explanation: [
          t(r`40% of 350 $= 140$, and $\frac{2}{5}$ of 250 $= 100$.`, r`350-এর 40% $= 140$, আর 250-এর $\frac{2}{5}$ $= 100$।`),
          t('140 − ? = 100, so ? = 140 − 100 = 40.', '140 − ? = 100, তাই ? = 140 − 100 = 40।'),
          t('240 comes from adding 140 + 100 — the sign was not handled correctly. Check: 140 − 40 = 100.', '140 + 100 যোগ করলে 240 আসে — চিহ্নের ভুল। মিলিয়ে দেখো: 140 − 40 = 100।'),
        ],
      },
    },

    // 4 ─────────────────────────────────────────────
    {
      key: 'approximation',
      emoji: '🎯',
      name: t('Approximate value (≈)', 'আসন্ন মান (≈)'),
      spot: t(
        'The question asks "what approximate value should come in place of ?" and the numbers are awkward, like 399.8 or 7.99.',
        'প্রশ্নে বলা থাকে "? -এর জায়গায় আনুমানিক কোন মান বসবে", আর সংখ্যাগুলো অদ্ভুত, যেমন 399.8 বা 7.99।',
      ),
      method: [
        t('Round each number to the nearest easy number (399.8 → 400, 7.99 → 8, 20.1 → 20).', 'প্রতিটা সংখ্যাকে কাছের সহজ সংখ্যায় নাও (399.8 → 400, 7.99 → 8, 20.1 → 20)।'),
        t('Then simplify with BODMAS as usual.', 'তারপর স্বাভাবিক BODMAS নিয়মে সরল করো।'),
        t('Pick the option closest to your answer — options are usually far apart.', 'তোমার উত্তরের সবচেয়ে কাছের অপশনটা বেছে নাও — অপশনগুলো সাধারণত অনেক দূরে দূরে থাকে।'),
      ],
      example: {
        question: t(r`Find the approximate value: $399.8 \times 20.1 \div 7.99$`, r`আসন্ন মান নির্ণয় করো: $399.8 \times 20.1 \div 7.99$`),
        steps: [
          t(r`Round: $400 \times 20 \div 8$.`, r`কাছের সহজ সংখ্যায় নিয়ে: $400 \times 20 \div 8$।`),
          t(r`Left to right: $400 \times 20 = 8000$, then $8000 \div 8 = 1000$.`, r`বাঁ দিক থেকে: $400 \times 20 = 8000$, তারপর $8000 \div 8 = 1000$।`),
        ],
        answer: t('About 1000', 'প্রায় 1000'),
      },
      tryIt: {
        question: t(r`What is the approximate value of $4999 \div 49.9 \times 15.02$?`, r`$4999 \div 49.9 \times 15.02$-এর আসন্ন মান কত?`),
        options: [t('150', '150'), t('1500', '1500'), t('15000', '15000'), t('6.67', '6.67')],
        correct: 1,
        explanation: [
          t(r`Round: $5000 \div 50 \times 15$.`, r`কাছের সহজ সংখ্যায় নিয়ে: $5000 \div 50 \times 15$।`),
          t(r`Left to right: $5000 \div 50 = 100$, then $100 \times 15 = 1500$.`, r`বাঁ দিক থেকে: $5000 \div 50 = 100$, তারপর $100 \times 15 = 1500$।`),
          t(r`6.67 comes from doing $50 \times 15$ first — wrong order.`, r`আগে $50 \times 15$ করলে 6.67 আসে — ক্রম ভুল।`),
        ],
      },
    },

    // 5 ─────────────────────────────────────────────
    {
      key: 'algebraic_identities',
      emoji: '🧩',
      name: t('Use algebra identities to simplify fast', 'বীজগাণিতিক সূত্র দিয়ে দ্রুত সরল করা'),
      spot: t(
        r`Big or decimal numbers appear as squares, like $856 \times 856 - 144 \times 144$ or $a \times a + 2 \times a \times b + b \times b$. Multiplying them out would take too long.`,
        r`বড় বা দশমিক সংখ্যা বর্গ হিসেবে থাকে, যেমন $856 \times 856 - 144 \times 144$ বা $a \times a + 2 \times a \times b + b \times b$। সোজা গুণ করলে অনেক সময় লাগবে।`,
      ),
      method: [
        t(r`Match the shape to a formula: $a^2 - b^2 = (a + b)(a - b)$, $a^2 + 2ab + b^2 = (a + b)^2$, $a^2 - 2ab + b^2 = (a - b)^2$.`, r`রাশির আকার একটা সূত্রের সঙ্গে মেলাও: $a^2 - b^2 = (a + b)(a - b)$, $a^2 + 2ab + b^2 = (a + b)^2$, $a^2 - 2ab + b^2 = (a - b)^2$।`),
        t('Write down what a and b are.', 'a আর b কত, লিখে ফেলো।'),
        t('Use the short form; things usually cancel or become round numbers.', 'ছোট রূপটা ব্যবহার করো; সাধারণত কাটাকাটি হয়ে যায় বা গোল সংখ্যা আসে।'),
      ],
      example: {
        question: t(r`Simplify: $\frac{856 \times 856 - 144 \times 144}{856 - 144}$`, r`সরল করো: $\frac{856 \times 856 - 144 \times 144}{856 - 144}$`),
        steps: [
          t(r`The top is $a^2 - b^2$ with $a = 856$, $b = 144$. So top $= (856 + 144)(856 - 144)$.`, r`লবটি $a^2 - b^2$ আকারের, যেখানে $a = 856$, $b = 144$। তাই লব $= (856 + 144)(856 - 144)$।`),
          t(r`$(856 - 144)$ cancels with the bottom, leaving $856 + 144 = 1000$.`, r`$(856 - 144)$ হরের সঙ্গে কেটে যায়, বাকি থাকে $856 + 144 = 1000$।`),
        ],
        answer: t('1000', 'মান 1000'),
      },
      tryIt: {
        question: t(r`Simplify: $3.7 \times 3.7 + 2 \times 3.7 \times 1.3 + 1.3 \times 1.3$`, r`সরল করো: $3.7 \times 3.7 + 2 \times 3.7 \times 1.3 + 1.3 \times 1.3$`),
        options: [t('5', '5'), t('15.38', '15.38'), t('10', '10'), t('25', '25')],
        correct: 3,
        explanation: [
          t(r`This is $a^2 + 2ab + b^2 = (a + b)^2$ with $a = 3.7$, $b = 1.3$.`, r`এটা $a^2 + 2ab + b^2 = (a + b)^2$, যেখানে $a = 3.7$, $b = 1.3$।`),
          t(r`$(3.7 + 1.3)^2 = 5^2 = 25$.`, r`তাই মান $(3.7 + 1.3)^2 = 5^2 = 25$।`),
          t('5 forgets to square, and 15.38 leaves out the middle term 2ab.', '5 হয় বর্গ করতে ভুলে গেলে, আর 15.38 হয় মাঝের পদ 2ab বাদ দিলে।'),
        ],
      },
    },
  ],
};
