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
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“Simplify: $18 + 24 \\div 6 \\times 3 - 4$” or “Find the value of the expression.”', '“সরল করো: $18 + 24 \\div 6 \\times 3 - 4$” বা “রাশিটির মান নির্ণয় করো।”'),
      formula: t(r`Order: Brackets $\to$ Of $\to$ Division/Multiplication (left to right) $\to$ Addition/Subtraction (left to right).`, r`ক্রম: বন্ধনী $\to$ "এর" (of) $\to$ ভাগ/গুণ (বাঁ দিক থেকে ডান দিকে) $\to$ যোগ/বিয়োগ (বাঁ দিক থেকে ডান দিকে)।`),
      shortcut: t('Clear brackets and "of" first, then do all the ÷ and × in ONE left-to-right pass before touching any + or −.', 'আগে বন্ধনী ও "এর" শেষ করো, তারপর সব ÷ ও × একবারে বাঁ দিক থেকে ডান দিকে করে ফেলো, তারপর যোগ-বিয়োগ।'),
      trap: t('× does NOT come before ÷ — they have equal rank, so $24 \\div 6 \\times 3 = 12$, not $24 \\div 18$.', '×, ÷-এর আগে আসে না — দুটোই সমান গুরুত্বের, তাই $24 \\div 6 \\times 3 = 12$, $24 \\div 18$ নয়।'),
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
      difficulty: 'intermediate',
      typicalWording: t('“Simplify: $50 - [20 - \\{12 - (8 - 3)\\}]$”', '“সরল করো: $50 - [20 - \\{12 - (8 - 3)\\}]$”'),
      formula: t(r`Open brackets inside-out: $(\ ) \to \{\ \} \to [\ ]$; a minus before a bracket flips the bracket's effect: $a - (b - c) = a - b + c$.`, r`বন্ধনী ভিতর থেকে বাইরে খোলো: $(\ ) \to \{\ \} \to [\ ]$; বন্ধনীর আগের বিয়োগ চিহ্ন বন্ধনীর প্রভাব উল্টে দেয়: $a - (b - c) = a - b + c$।`),
      shortcut: t('Replace each finished bracket by its single value and rewrite the line at once — never try to hold two open brackets in your head.', 'প্রতিটা বন্ধনী শেষ হলেই তার একক মান বসিয়ে রাশিটা আবার লেখো — দুটো খোলা বন্ধনী একসঙ্গে মাথায় রাখতে যেও না।'),
      trap: t('Dropping all the brackets and subtracting everything in sight gives a much smaller, wrong answer — each minus only acts on the bracket right after it.', 'সব বন্ধনী তুলে দিয়ে চোখে পড়া সবকিছু বিয়োগ করলে অনেক ছোট ভুল উত্তর আসে — প্রতিটা বিয়োগ চিহ্ন শুধু তার ঠিক পরের বন্ধনীর উপরই কাজ করে।'),
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
      difficulty: 'beginner',
      typicalWording: t('“25% of 480 + ? = $\\frac{3}{4}$ of 200. Find ?”', '“480-এর 25% + ? = 200-এর $\\frac{3}{4}$। ? কত?”'),
      formula: t(r`If $a + ? = b$ then $? = b - a$; if $a - ? = b$ then $? = a - b$.`, r`যদি $a + ? = b$ হয় তবে $? = b - a$; যদি $a - ? = b$ হয় তবে $? = a - b$।`),
      shortcut: t('Evaluate every "of" part on both sides first — the line collapses to one tiny equation like $120 + ? = 150$, which solves in one step.', 'আগে দুই দিকের সব "এর" অংশের মান বের করো — রাশিটা $120 + ? = 150$-এর মতো ছোট সমীকরণে পরিণত হবে, যা এক ধাপে মিলে যায়।'),
      trap: t('When ? is being subtracted ($140 - ? = 100$), the answer is $140 - 100 = 40$, not $140 + 100$ — do not just add the two known numbers.', 'যখন ? বিয়োগ হচ্ছে ($140 - ? = 100$), উত্তর $140 - 100 = 40$, $140 + 100$ নয় — দুটো জানা সংখ্যা শুধু যোগ করে দিও না।'),
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
      difficulty: 'intermediate',
      typicalWording: t('“What approximate value should come in place of ?”', '“? -এর জায়গায় আসন্ন কোন মান বসবে?”'),
      formula: t(r`Round each number to a nearby friendly value, then apply BODMAS: answer $\approx$ the value of the rounded expression.`, r`প্রতিটা সংখ্যাকে কাছের সহজ সংখ্যায় নাও, তারপর BODMAS প্রয়োগ করো: উত্তর $\approx$ সহজ করা রাশিটির মান।`),
      shortcut: t('Round to numbers that divide cleanly — $4999 \div 49.9 \approx 5000 \div 50 = 100$ turns the whole sum into mental maths.', 'এমন সংখ্যায় নাও যাতে ভাগ সহজে মিলে যায় — $4999 \div 49.9 \approx 5000 \div 50 = 100$ হলে পুরো অঙ্কটাই মুখে মুখে হয়ে যায়।'),
      trap: t('Round to the NEAREST easy number, not always up; and never waste time calculating the exact value first — the options are far apart on purpose.', 'সবচেয়ে কাছের সহজ সংখ্যায় নাও, সবসময় বাড়িয়ে নয়; আর আগেভাগে সঠিক মান বের করে সময় নষ্ট করো না — অপশনগুলো ইচ্ছে করেই অনেক দূরে দূরে থাকে।'),
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
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“Simplify: $\\dfrac{856 \\times 856 - 144 \\times 144}{856 - 144}$”', '“সরল করো: $\\dfrac{856 \\times 856 - 144 \\times 144}{856 - 144}$”'),
      formula: t(r`$a^2 - b^2 = (a + b)(a - b)$; $(a + b)^2 = a^2 + 2ab + b^2$; $(a - b)^2 = a^2 - 2ab + b^2$.`, r`সূত্রগুলি: $a^2 - b^2 = (a + b)(a - b)$; $(a + b)^2 = a^2 + 2ab + b^2$; $(a - b)^2 = a^2 - 2ab + b^2$।`),
      shortcut: t('If the denominator equals one factor of the identity ($a - b$ or $a + b$), it cancels — the answer is simply the other factor, no big multiplication at all.', 'হর যদি সূত্রের একটি উৎপাদকের ($a - b$ বা $a + b$) সমান হয়, তা কেটে যায় — উত্তর হয় শুধু অন্য উৎপাদকটি, বড় গুণ করার দরকারই পড়ে না।'),
      trap: t('$(a + b)^2$ is NOT $a^2 + b^2$ — forgetting the middle term $2ab$ gives 15.38 instead of 25 in the try-it below.', '$(a + b)^2$ মানে $a^2 + b^2$ নয় — মাঝের পদ $2ab$ ভুলে গেলে নিচের অনুশীলনীতে 25-এর বদলে 15.38 আসবে।'),
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

    // 6 ─────────────────────────────────────────────
    {
      key: 'fraction_chain_of',
      emoji: '🔗',
      name: t('Chain of "of" with fractions', 'ভগ্নাংশের পরপর "এর" শৃঙ্খল'),
      difficulty: 'beginner',
      typicalWording: t('“Find $\\frac{2}{3}$ of $\\frac{3}{5}$ of 450.”', '“450-এর $\\frac{3}{5}$-এর $\\frac{2}{3}$ নির্ণয় করো।”'),
      formula: t(r`$\frac{a}{b}$ of $\frac{c}{d}$ of $N = \frac{a}{b} \times \frac{c}{d} \times N$ — every "of" is a multiplication.`, r`$\frac{a}{b}$-এর $\frac{c}{d}$-এর $N = \frac{a}{b} \times \frac{c}{d} \times N$ — প্রতিটা "এর" মানেই গুণ।`),
      shortcut: t('Cancel common factors across the WHOLE chain before multiplying anything (the 3 in 2/3 cancels the 3 in 3/5), so only small numbers are left to multiply.', 'কিছু গুণ করার আগেই পুরো শৃঙ্খল জুড়ে সাধারণ গুণনীয়ক কেটে দাও (2/3-এর 3, 3/5-এর 3-এর সঙ্গে কেটে যায়), ফলে গুণ করতে হয় শুধু ছোট সংখ্যা।'),
      trap: t('Do not add the fractions or work out each "of" separately on the full number — cancelling first is both faster and safer.', 'ভগ্নাংশগুলো যোগ করো না, বা প্রতিটা "এর" আলাদা করে পুরো সংখ্যার উপর হিসাব করো না — আগে কাটাকাটি করাই দ্রুত ও নিরাপদ।'),
      spot: t(
        'The word "of" appears two or more times in a row with fractions, like "2/3 of 3/5 of 450".',
        '"এর" শব্দটা ভগ্নাংশসহ পরপর দুই বা ততোধিকবার থাকে, যেমন "450-এর 3/5-এর 2/3"।',
      ),
      method: [
        t('Replace every "of" by ×.', 'প্রতিটা "এর"-এর জায়গায় × বসাও।'),
        t('Cancel any numerator with any denominator sharing a common factor.', 'কোনো লবের সঙ্গে কোনো হরের সাধারণ গুণনীয়ক থাকলে কেটে দাও।'),
        t('Multiply what is left.', 'যা বাকি থাকে, গুণ করো।'),
      ],
      example: {
        question: t(r`Find $\frac{2}{3}$ of $\frac{3}{5}$ of $450$.`, r`$450$-এর $\frac{3}{5}$-এর $\frac{2}{3}$ নির্ণয় করো।`),
        steps: [
          t(r`Write it as a product: $\frac{2}{3} \times \frac{3}{5} \times 450$.`, r`গুণ আকারে লেখো: $\frac{2}{3} \times \frac{3}{5} \times 450$।`),
          t(r`Cancel the 3s: $\frac{2}{5} \times 450$.`, r`3 দুটি কেটে দাও: $\frac{2}{5} \times 450$।`),
          t(r`$\frac{2}{5} \times 450 = 2 \times 90 = 180$.`, r`তাই $\frac{2}{5} \times 450 = 2 \times 90 = 180$।`),
        ],
        answer: t('180', 'মান 180'),
      },
      tryIt: {
        question: t(r`Find $\frac{3}{4}$ of $\frac{4}{7}$ of $280$.`, r`$280$-এর $\frac{4}{7}$-এর $\frac{3}{4}$ নির্ণয় করো।`),
        options: [t('210', '210'), t('120', '120'), t('160', '160'), t('90', '90')],
        correct: 1,
        explanation: [
          t(r`As a product: $\frac{3}{4} \times \frac{4}{7} \times 280$. The 4s cancel.`, r`গুণ আকারে: $\frac{3}{4} \times \frac{4}{7} \times 280$। 4 দুটি কেটে যায়।`),
          t(r`$\frac{3}{7} \times 280 = 3 \times 40 = 120$.`, r`তাই $\frac{3}{7} \times 280 = 3 \times 40 = 120$।`),
          t(r`210 is only $\frac{3}{4}$ of 280 and 160 is only $\frac{4}{7}$ of 280 — both stop one "of" early.`, r`210 হল শুধু 280-এর $\frac{3}{4}$, আর 160 হল শুধু 280-এর $\frac{4}{7}$ — দুটোই একটা "এর" আগেই থেমে যায়।`),
        ],
      },
    },

    // 7 ─────────────────────────────────────────────
    {
      key: 'decimal_squares_cubes',
      emoji: '🔢',
      name: t('Squares and cubes of decimals', 'দশমিক সংখ্যার বর্গ ও ঘন'),
      difficulty: 'beginner',
      typicalWording: t('“Find the value of $1.2^2 + 0.8^3$.”', '“$1.2^2 + 0.8^3$-এর মান নির্ণয় করো।”'),
      formula: t(r`Ignore the point, square/cube the digits, then place the point: a square has $2 \times$ the decimal places of the number, a cube has $3 \times$.`, r`দশমিক বিন্দু উপেক্ষা করে অঙ্কগুলির বর্গ/ঘন করো, তারপর বিন্দু বসাও: বর্গে দশমিক স্থান সংখ্যার $2 \times$ গুণ, ঘনে $3 \times$ গুণ হয়।`),
      shortcut: t(r`For a difference of decimal squares use the identity: $2.5^2 - 1.5^2 = (2.5 + 1.5)(2.5 - 1.5) = 4 \times 1 = 4$ — no decimal squaring needed.`, r`দশমিক বর্গের বিয়োগের ক্ষেত্রে সূত্র ব্যবহার করো: $2.5^2 - 1.5^2 = (2.5 + 1.5)(2.5 - 1.5) = 4 \times 1 = 4$ — দশমিকের বর্গ করার দরকারই নেই।`),
      trap: t(r`$0.8^3 = 0.512$, not 5.12 or 0.0512 — count the places: $3 \times 1 = 3$ decimal places in a cube of a 1-place decimal.`, r`$0.8^3 = 0.512$, 5.12 বা 0.0512 নয় — স্থান গুনে নাও: 1 দশমিক স্থানের সংখ্যার ঘনে $3 \times 1 = 3$টি দশমিক স্থান থাকে।`),
      spot: t(
        'Small decimals like 1.2, 0.8 or 2.5 are raised to the power 2 or 3.',
        '1.2, 0.8 বা 2.5-এর মতো ছোট দশমিক সংখ্যার ঘাত 2 বা 3 থাকে।',
      ),
      method: [
        t('Square or cube the digits as if they were whole numbers ($12^2 = 144$, $8^3 = 512$).', 'অঙ্কগুলিকে পূর্ণসংখ্যা ধরে বর্গ বা ঘন করো ($12^2 = 144$, $8^3 = 512$)।'),
        t('Count the decimal places: double them for a square, triple them for a cube.', 'দশমিক স্থান গোনো: বর্গে দ্বিগুণ, ঘনে তিনগুণ করো।'),
        t('Place the decimal point, then finish any + or − in the line.', 'দশমিক বিন্দু বসাও, তারপর রাশিতে থাকা + বা − শেষ করো।'),
      ],
      example: {
        question: t(r`Find the value of $1.2^2 + 0.8^3$.`, r`$1.2^2 + 0.8^3$-এর মান নির্ণয় করো।`),
        steps: [
          t(r`$1.2^2$: $12^2 = 144$, with $2$ decimal places $= 1.44$.`, r`$1.2^2$: $12^2 = 144$, $2$টি দশমিক স্থান দিয়ে $= 1.44$।`),
          t(r`$0.8^3$: $8^3 = 512$, with $3$ decimal places $= 0.512$.`, r`$0.8^3$: $8^3 = 512$, $3$টি দশমিক স্থান দিয়ে $= 0.512$।`),
          t(r`Add: $1.44 + 0.512 = 1.952$.`, r`যোগ করো: $1.44 + 0.512 = 1.952$।`),
        ],
        answer: t('1.952', 'মান 1.952'),
      },
      tryIt: {
        question: t(r`Find the value of $2.5^2 - 1.5^2$.`, r`$2.5^2 - 1.5^2$-এর মান নির্ণয় করো।`),
        options: [t('8.5', '8.5'), t('1', '1'), t('4', '4'), t('2.25', '2.25')],
        correct: 2,
        explanation: [
          t(r`$2.5^2 = 6.25$ and $1.5^2 = 2.25$.`, r`$2.5^2 = 6.25$ এবং $1.5^2 = 2.25$।`),
          t(r`$6.25 - 2.25 = 4$. (Shortcut: $(2.5 + 1.5)(2.5 - 1.5) = 4 \times 1 = 4$.)`, r`তাই $6.25 - 2.25 = 4$। (শর্টকাট: $(2.5 + 1.5)(2.5 - 1.5) = 4 \times 1 = 4$।)`),
          t(r`8.5 comes from adding the squares; 1 is $(2.5 - 1.5)^2$, a different question.`, r`বর্গদুটি যোগ করলে 8.5 আসে; 1 হল $(2.5 - 1.5)^2$, যা আলাদা প্রশ্ন।`),
        ],
      },
    },

    // 8 ─────────────────────────────────────────────
    {
      key: 'square_cube_roots',
      emoji: '🌱',
      name: t('Square roots and cube roots', 'বর্গমূল ও ঘনমূল'),
      difficulty: 'beginner',
      typicalWording: t('“Find $\\sqrt{729} + \\sqrt[3]{512}$.”', '“$\\sqrt{729} + \\sqrt[3]{512}$-এর মান নির্ণয় করো।”'),
      formula: t(r`$\sqrt{a^2} = a$ and $\sqrt[3]{a^3} = a$: by prime factorisation, a square root takes one factor from each pair, a cube root one from each triple.`, r`$\sqrt{a^2} = a$ এবং $\sqrt[3]{a^3} = a$: মৌলিক উৎপাদকে বিশ্লেষণে বর্গমূলে প্রতিটি জোড়া থেকে একটি, ঘনমূলে প্রতিটি ত্রয়ী থেকে একটি উৎপাদক নেওয়া হয়।`),
      shortcut: t('Learn squares up to 30 and cubes up to 10 by heart — nearly every exam root comes from those two lists, so you can read the answer off directly.', '30 পর্যন্ত বর্গ ও 10 পর্যন্ত ঘন মুখস্থ রাখো — পরীক্ষার প্রায় সব মূলই এই দুটি তালিকা থেকে আসে, তাই উত্তর সরাসরি পড়ে ফেলা যায়।'),
      trap: t(r`$\sqrt{a + b}$ is NOT $\sqrt{a} + \sqrt{b}$: $\sqrt{25 + 144} = \sqrt{169} = 13$, not $5 + 12 = 17$. Add first, then take the root.`, r`$\sqrt{a + b}$ মানে $\sqrt{a} + \sqrt{b}$ নয়: $\sqrt{25 + 144} = \sqrt{169} = 13$, $5 + 12 = 17$ নয়। আগে যোগ করো, তারপর মূল নাও।`),
      spot: t(
        'The question has √ or ∛ signs over largish numbers like 729, 576 or 512.',
        'প্রশ্নে 729, 576 বা 512-এর মতো বড় সংখ্যার উপর √ বা ∛ চিহ্ন থাকে।',
      ),
      method: [
        t('Break the number into prime factors.', 'সংখ্যাটিকে মৌলিক উৎপাদকে ভাঙো।'),
        t('For √ group the factors in pairs; for ∛ group them in triples.', '√-এর জন্য উৎপাদকগুলি জোড়ায়, ∛-এর জন্য ত্রয়ীতে ভাগ করো।'),
        t('Take one factor from each group and multiply them — that is the root.', 'প্রতিটি দল থেকে একটি করে উৎপাদক নিয়ে গুণ করো — সেটাই মূল।'),
      ],
      example: {
        question: t(r`Find $\sqrt{729} + \sqrt[3]{512}$.`, r`$\sqrt{729} + \sqrt[3]{512}$-এর মান নির্ণয় করো।`),
        steps: [
          t(r`$729 = 3^6$, three pairs, so $\sqrt{729} = 3^3 = 27$.`, r`$729 = 3^6$, তিনটি জোড়া, তাই $\sqrt{729} = 3^3 = 27$।`),
          t(r`$512 = 2^9$, three triples, so $\sqrt[3]{512} = 2^3 = 8$.`, r`$512 = 2^9$, তিনটি ত্রয়ী, তাই $\sqrt[3]{512} = 2^3 = 8$।`),
          t(r`Add: $27 + 8 = 35$.`, r`যোগ করো: $27 + 8 = 35$।`),
        ],
        answer: t('35', 'মান 35'),
      },
      tryIt: {
        question: t(r`Find $\sqrt{576} + \sqrt[3]{343}$.`, r`$\sqrt{576} + \sqrt[3]{343}$-এর মান নির্ণয় করো।`),
        options: [t('30', '30'), t('31', '31'), t('17', '17'), t('32', '32')],
        correct: 1,
        explanation: [
          t(r`$576 = 24^2$, so $\sqrt{576} = 24$.`, r`$576 = 24^2$, তাই $\sqrt{576} = 24$।`),
          t(r`$343 = 7^3$, so $\sqrt[3]{343} = 7$.`, r`$343 = 7^3$, তাই $\sqrt[3]{343} = 7$।`),
          t(r`$24 + 7 = 31$. (17 comes from subtracting the roots instead of adding.)`, r`তাই $24 + 7 = 31$। (মূলদুটি বিয়োগ করলে 17 আসে।)`),
        ],
      },
    },

    // 9 ─────────────────────────────────────────────
    {
      key: 'surds_indices_laws',
      emoji: '⚡',
      name: t('Laws of indices and fractional powers', 'সূচকের নিয়ম ও ভগ্নাংশ ঘাত'),
      difficulty: 'intermediate',
      typicalWording: t('“Simplify: $27^{2/3} + 8^{2/3}$.”', '“সরল করো: $27^{2/3} + 8^{2/3}$।”'),
      formula: t(r`$a^{p/q} = (\sqrt[q]{a})^p$; $a^m \times a^n = a^{m+n}$; $\frac{a^m}{a^n} = a^{m-n}$; $a^{-n} = \frac{1}{a^n}$.`, r`নিয়মগুলি: $a^{p/q} = (\sqrt[q]{a})^p$; $a^m \times a^n = a^{m+n}$; $\frac{a^m}{a^n} = a^{m-n}$; $a^{-n} = \frac{1}{a^n}$।`),
      shortcut: t('Always take the ROOT first, then the power: $27^{2/3} = (\sqrt[3]{27})^2 = 3^2 = 9$. Doing the power first makes the numbers huge.', 'সবসময় আগে মূল, তারপর ঘাত নাও: $27^{2/3} = (\sqrt[3]{27})^2 = 3^2 = 9$। আগে ঘাত করলে সংখ্যা বিশাল হয়ে যায়।'),
      trap: t(r`In $a^{p/q}$ the denominator $q$ is the root and the numerator $p$ is the power — swapping them gives a wrong value. Also $2^{-2} = \frac{1}{4}$, never $-4$.`, r`$a^{p/q}$-তে হর $q$ হল মূল আর লব $p$ হল ঘাত — উল্টে দিলে ভুল মান আসে। আর $2^{-2} = \frac{1}{4}$, কখনোই $-4$ নয়।`),
      spot: t(
        'Powers are fractions or negative numbers, like $27^{2/3}$, $32^{2/5}$ or $2^{-2}$.',
        'ঘাতগুলি ভগ্নাংশ বা ঋণাত্মক সংখ্যা হয়, যেমন $27^{2/3}$, $32^{2/5}$ বা $2^{-2}$।',
      ),
      method: [
        t('Read a fractional index as "root, then power": denominator = root, numerator = power.', 'ভগ্নাংশ সূচককে "আগে মূল, তারপর ঘাত" হিসেবে পড়ো: হর = মূল, লব = ঘাত।'),
        t('Take the root first to keep the numbers small, then raise to the power.', 'সংখ্যা ছোট রাখতে আগে মূল নাও, তারপর ঘাত তোলো।'),
        t('If bases match, finish with the index laws (add indices on ×, subtract on ÷).', 'ভিত্তি এক হলে সূচকের নিয়ম দিয়ে শেষ করো (গুণে সূচক যোগ, ভাগে বিয়োগ)।'),
      ],
      example: {
        question: t(r`Simplify: $27^{2/3} + 8^{2/3}$.`, r`সরল করো: $27^{2/3} + 8^{2/3}$।`),
        steps: [
          t(r`$27^{2/3} = (\sqrt[3]{27})^2 = 3^2 = 9$.`, r`প্রথমটি: $27^{2/3} = (\sqrt[3]{27})^2 = 3^2 = 9$।`),
          t(r`$8^{2/3} = (\sqrt[3]{8})^2 = 2^2 = 4$.`, r`দ্বিতীয়টি: $8^{2/3} = (\sqrt[3]{8})^2 = 2^2 = 4$।`),
          t(r`Add: $9 + 4 = 13$.`, r`যোগ করো: $9 + 4 = 13$।`),
        ],
        answer: t('13', 'মান 13'),
      },
      tryIt: {
        question: t(r`Simplify: $32^{2/5} \times 2^3$.`, r`সরল করো: $32^{2/5} \times 2^3$।`),
        options: [t('16', '16'), t('32', '32'), t('64', '64'), t('8', '8')],
        correct: 1,
        explanation: [
          t(r`$32^{2/5} = (\sqrt[5]{32})^2 = 2^2 = 4$.`, r`প্রথমে: $32^{2/5} = (\sqrt[5]{32})^2 = 2^2 = 4$।`),
          t(r`$2^3 = 8$, so $4 \times 8 = 32$.`, r`$2^3 = 8$, তাই $4 \times 8 = 32$।`),
          t(r`8 is just $2^3$ on its own — it forgets the first factor completely.`, r`8 হল শুধু $2^3$ — এতে প্রথম উৎপাদকটাই বাদ পড়ে যায়।`),
        ],
      },
    },

    // 10 ─────────────────────────────────────────────
    {
      key: 'recurring_decimal_arithmetic',
      emoji: '🔁',
      name: t('Adding recurring decimals', 'আবৃত্ত দশমিকের যোগ-বিয়োগ'),
      difficulty: 'intermediate',
      typicalWording: t('“Find the value of $0.\\overline{3} + 0.\\overline{6}$.”', '“$0.\\overline{3} + 0.\\overline{6}$-এর মান নির্ণয় করো।”'),
      formula: t(r`$0.\overline{a} = \frac{a}{9}$ and $0.\overline{ab} = \frac{ab}{99}$ — the repeating digits over as many 9s as there are repeating digits.`, r`$0.\overline{a} = \frac{a}{9}$ এবং $0.\overline{ab} = \frac{ab}{99}$ — আবৃত্ত অঙ্কগুলি লবে, হরে আবৃত্ত অঙ্কের সংখ্যার সমান 9।`),
      shortcut: t('Convert each recurring decimal to its fraction first and add the fractions — the arithmetic is exact and usually collapses to something clean like 1.', 'আগে প্রতিটা আবৃত্ত দশমিককে ভগ্নাংশে বদলে ভগ্নাংশগুলি যোগ করো — হিসাব একদম সঠিক হয় এবং সাধারণত 1-এর মতো পরিষ্কার উত্তরে মিলে যায়।'),
      trap: t(r`$0.\overline{3}$ is exactly $\frac{1}{3}$, not 0.3 and not $\frac{3}{10}$ — adding the cut-off decimals $0.3 + 0.6 = 0.9$ misses the true answer 1.`, r`$0.\overline{3}$ ঠিক $\frac{1}{3}$, 0.3 নয়, $\frac{3}{10}$-ও নয় — কাটা দশমিক $0.3 + 0.6 = 0.9$ যোগ করলে আসল উত্তর 1 পাওয়া যায় না।`),
      spot: t(
        'Decimals carry a bar over the repeating digits, like $0.\\overline{3}$ or $0.\\overline{27}$.',
        'দশমিক সংখ্যায় আবৃত্ত অঙ্কগুলির উপর রেখা (bar) থাকে, যেমন $0.\\overline{3}$ বা $0.\\overline{27}$।',
      ),
      method: [
        t('Write each recurring decimal as a fraction: repeating digits over 9, 99, 999…', 'প্রতিটা আবৃত্ত দশমিককে ভগ্নাংশে লেখো: আবৃত্ত অঙ্ক লবে, হরে 9, 99, 999…'),
        t('Add or subtract the fractions as usual.', 'ভগ্নাংশগুলি স্বাভাবিক নিয়মে যোগ বা বিয়োগ করো।'),
        t('Give the result as the fraction or whole number it simplifies to.', 'ফলাফল যেই ভগ্নাংশ বা পূর্ণসংখ্যায় সরল হয়, সেটাই উত্তর।'),
      ],
      example: {
        question: t(r`Find the value of $0.\overline{3} + 0.\overline{6}$.`, r`$0.\overline{3} + 0.\overline{6}$-এর মান নির্ণয় করো।`),
        steps: [
          t(r`$0.\overline{3} = \frac{3}{9} = \frac{1}{3}$.`, r`প্রথমটি: $0.\overline{3} = \frac{3}{9} = \frac{1}{3}$।`),
          t(r`$0.\overline{6} = \frac{6}{9} = \frac{2}{3}$.`, r`দ্বিতীয়টি: $0.\overline{6} = \frac{6}{9} = \frac{2}{3}$।`),
          t(r`$\frac{1}{3} + \frac{2}{3} = 1$.`, r`তাই $\frac{1}{3} + \frac{2}{3} = 1$।`),
        ],
        answer: t('1', 'মান 1'),
      },
      tryIt: {
        question: t(r`$0.\overline{27}$ is equal to which fraction?`, r`$0.\overline{27}$ কোন ভগ্নাংশের সমান?`),
        options: [t('27/100', '27/100'), t('3/11', '3/11'), t('1/3', '1/3'), t('11/27', '11/27')],
        correct: 1,
        explanation: [
          t(r`Two digits repeat, so $0.\overline{27} = \frac{27}{99}$.`, r`দুটি অঙ্ক আবৃত্ত হয়, তাই $0.\overline{27} = \frac{27}{99}$।`),
          t(r`Divide top and bottom by 9: $\frac{27}{99} = \frac{3}{11}$.`, r`লব ও হরকে 9 দিয়ে ভাগ করো: $\frac{27}{99} = \frac{3}{11}$।`),
          t(r`27/100 is the value of the TERMINATING decimal 0.27 — the bar changes everything.`, r`27/100 হল সসীম দশমিক 0.27-এর মান — উপরের রেখাটাই সব বদলে দেয়।`),
        ],
      },
    },

    // 11 ─────────────────────────────────────────────
    {
      key: 'mixed_fraction_operations',
      emoji: '🍰',
      name: t('Mixed fraction operations', 'মিশ্র ভগ্নাংশের হিসাব'),
      difficulty: 'intermediate',
      typicalWording: t('“Simplify: $2\\frac{1}{2} + 3\\frac{1}{3} - 1\\frac{3}{4}$.”', '“সরল করো: $2\\frac{1}{2} + 3\\frac{1}{3} - 1\\frac{3}{4}$।”'),
      formula: t(r`Convert to improper fractions first: $a\frac{b}{c} = \frac{ac + b}{c}$, then combine over the LCM of the denominators.`, r`আগে অপ্রকৃত ভগ্নাংশে বদলাও: $a\frac{b}{c} = \frac{ac + b}{c}$, তারপর হরগুলির ল.সা.গু. নিয়ে হিসাব করো।`),
      shortcut: t('For pure + questions you may add whole parts and fraction parts separately; but the moment ×, ÷ or a borrowing − appears, improper fractions are the safe single route.', 'শুধু + থাকলে পূর্ণ অংশ ও ভগ্নাংশ অংশ আলাদা করে যোগ করা যায়; কিন্তু ×, ÷ বা ধার নেওয়ার − এলেই অপ্রকৃত ভগ্নাংশই একমাত্র নিরাপদ পথ।'),
      trap: t(r`$2\frac{1}{2} \times 3\frac{1}{3}$ is NOT $6\frac{1}{6}$ — never multiply the whole parts and the fraction parts separately. Convert first: $\frac{5}{2} \times \frac{10}{3}$.`, r`$2\frac{1}{2} \times 3\frac{1}{3}$ মানে $6\frac{1}{6}$ নয় — পূর্ণ অংশ ও ভগ্নাংশ অংশ আলাদা করে গুণ করো না। আগে বদলাও: $\frac{5}{2} \times \frac{10}{3}$।`),
      spot: t(
        'Numbers are written as a whole part plus a fraction — $2\\frac{1}{2}$, $3\\frac{1}{3}$, $1\\frac{3}{4}$ — mixed with +, −, × or ÷.',
        'সংখ্যাগুলি পূর্ণ অংশ ও ভগ্নাংশ মিলিয়ে লেখা থাকে — $2\\frac{1}{2}$, $3\\frac{1}{3}$, $1\\frac{3}{4}$ — সঙ্গে +, −, × বা ÷ থাকে।',
      ),
      method: [
        t('Convert every mixed number to an improper fraction.', 'প্রতিটা মিশ্র সংখ্যাকে অপ্রকৃত ভগ্নাংশে বদলাও।'),
        t('Take the LCM of the denominators and combine the numerators.', 'হরগুলির ল.সা.গু. নিয়ে লবগুলি মেলাও।'),
        t('Simplify, and convert back to a mixed number if the answer needs one.', 'সরল করো, দরকার হলে আবার মিশ্র ভগ্নাংশে ফিরিয়ে নাও।'),
      ],
      example: {
        question: t(r`Simplify: $2\frac{1}{2} + 3\frac{1}{3} - 1\frac{3}{4}$.`, r`সরল করো: $2\frac{1}{2} + 3\frac{1}{3} - 1\frac{3}{4}$।`),
        steps: [
          t(r`Improper fractions: $\frac{5}{2} + \frac{10}{3} - \frac{7}{4}$.`, r`অপ্রকৃত ভগ্নাংশে: $\frac{5}{2} + \frac{10}{3} - \frac{7}{4}$।`),
          t(r`LCM of 2, 3, 4 is 12: $\frac{30}{12} + \frac{40}{12} - \frac{21}{12}$.`, r`2, 3, 4-এর ল.সা.গু. 12: $\frac{30}{12} + \frac{40}{12} - \frac{21}{12}$।`),
          t(r`$= \frac{49}{12} = 4\frac{1}{12}$.`, r`তাই $= \frac{49}{12} = 4\frac{1}{12}$।`),
        ],
        answer: t(r`$4\frac{1}{12}$`, r`মান $4\frac{1}{12}$`),
      },
      tryIt: {
        question: t(r`Simplify: $3\frac{1}{3} \times 1\frac{1}{2}$.`, r`সরল করো: $3\frac{1}{3} \times 1\frac{1}{2}$।`),
        options: [t('29/6', '29/6'), t('5', '5'), t('2', '2'), t('10', '10')],
        correct: 1,
        explanation: [
          t(r`Convert: $3\frac{1}{3} = \frac{10}{3}$ and $1\frac{1}{2} = \frac{3}{2}$.`, r`বদলাও: $3\frac{1}{3} = \frac{10}{3}$ এবং $1\frac{1}{2} = \frac{3}{2}$।`),
          t(r`$\frac{10}{3} \times \frac{3}{2} = \frac{30}{6} = 5$ (the 3s cancel).`, r`তাই $\frac{10}{3} \times \frac{3}{2} = \frac{30}{6} = 5$ (3 দুটি কেটে যায়)।`),
          t(r`29/6 comes from ADDING the two mixed numbers instead of multiplying them.`, r`দুটি মিশ্র সংখ্যা গুণের বদলে যোগ করলে 29/6 আসে।`),
        ],
      },
    },

    // 12 ─────────────────────────────────────────────
    {
      key: 'continued_fraction',
      emoji: '🪜',
      name: t('Continued fractions', 'অবিরত ভগ্নাংশ'),
      difficulty: 'advanced',
      typicalWording: t('“Simplify: $1 + \\dfrac{1}{2 + \\dfrac{1}{3}}$.”', '“সরল করো: $1 + \\dfrac{1}{2 + \\dfrac{1}{3}}$।”'),
      formula: t(r`Work from the bottom up: simplify the deepest fraction to a single number, then climb one level at a time — each level is "add, then flip if it sits under a 1".`, r`নিচ থেকে উপরে ওঠো: সবচেয়ে গভীরের ভগ্নাংশটিকে একটিমাত্র সংখ্যায় পরিণত করো, তারপর এক ধাপ করে ওপরে ওঠো — প্রতিটি ধাপে "যোগ করো, 1-এর নিচে থাকলে উল্টে দাও"।`),
      shortcut: t('Start at the innermost denominator and climb steadily: every step is just one small addition and one reciprocal, so nothing ever gets big.', 'সবচেয়ে ভিতরের হর থেকে শুরু করে ধীরে ধীরে ওঠো: প্রতিটি ধাপে শুধু একটি ছোট যোগ ও একটি অনোন্যক, তাই সংখ্যা কখনো বড় হয় না।'),
      trap: t('Do NOT start from the top: $1 + \\frac{1}{2}$ first gives the wrong value. The deepest level must be settled before anything above it.', 'উপর থেকে শুরু করো না: আগে $1 + \\frac{1}{2}$ করলে ভুল মান আসে। সবচেয়ে গভীরের ধাপটা আগে মেটাতেই হবে।'),
      spot: t(
        'Fractions are stacked inside fractions: $1 + \\frac{1}{2 + \\frac{1}{3}}$ — a ladder of denominators.',
        'ভগ্নাংশের ভিতরে ভগ্নাংশ সাজানো থাকে: $1 + \\frac{1}{2 + \\frac{1}{3}}$ — হরের একটা সিঁড়ির মতো।',
      ),
      method: [
        t('Find the deepest (bottom-most) fraction and simplify it to a single number.', 'সবচেয়ে গভীরের (একদম নিচের) ভগ্নাংশটি খুঁজে একটিমাত্র সংখ্যায় পরিণত করো।'),
        t('Move one level up: add the number above it, then take the reciprocal if a fraction bar demands it.', 'এক ধাপ উপরে যাও: উপরের সংখ্যাটি যোগ করো, ভগ্নাংশের দাগ চাইলে অনোন্যক নাও।'),
        t('Repeat until a single number remains.', 'একটিমাত্র সংখ্যা না থাকা পর্যন্ত পুনরাবৃত্তি করো।'),
      ],
      example: {
        question: t(r`Simplify: $1 + \frac{1}{2 + \frac{1}{3}}$.`, r`সরল করো: $1 + \frac{1}{2 + \frac{1}{3}}$।`),
        steps: [
          t(r`Deepest level: $2 + \frac{1}{3} = \frac{7}{3}$.`, r`সবচেয়ে গভীরে: $2 + \frac{1}{3} = \frac{7}{3}$।`),
          t(r`It sits under a 1, so flip it: $\frac{1}{7/3} = \frac{3}{7}$.`, r`এটি 1-এর নিচে আছে, তাই উল্টে দাও: $\frac{1}{7/3} = \frac{3}{7}$।`),
          t(r`Top level: $1 + \frac{3}{7} = \frac{10}{7}$.`, r`সবচেয়ে উপরে: $1 + \frac{3}{7} = \frac{10}{7}$।`),
        ],
        answer: t(r`$\frac{10}{7}$`, r`মান $\frac{10}{7}$`),
      },
      tryIt: {
        question: t(r`Simplify: $2 + \frac{1}{1 + \frac{1}{2}}$.`, r`সরল করো: $2 + \frac{1}{1 + \frac{1}{2}}$।`),
        options: [t('5/2', '5/2'), t('7/3', '7/3'), t('8/3', '8/3'), t('3', '3')],
        correct: 2,
        explanation: [
          t(r`Deepest level: $1 + \frac{1}{2} = \frac{3}{2}$.`, r`সবচেয়ে গভীরে: $1 + \frac{1}{2} = \frac{3}{2}$।`),
          t(r`Flip it: $\frac{1}{3/2} = \frac{2}{3}$.`, r`উল্টে দাও: $\frac{1}{3/2} = \frac{2}{3}$।`),
          t(r`Top level: $2 + \frac{2}{3} = \frac{8}{3}$. (5/2 comes from wrongly adding $\frac{1}{2}$ at the top level.)`, r`সবচেয়ে উপরে: $2 + \frac{2}{3} = \frac{8}{3}$। (উপরের ধাপেই $\frac{1}{2}$ যোগ করে ফেললে 5/2 আসে।)`),
        ],
      },
    },

    // 13 ─────────────────────────────────────────────
    {
      key: 'rationalise_surd',
      emoji: '🌟',
      name: t('Rationalising a surd denominator', 'হরের করণীমুক্তকরণ'),
      difficulty: 'advanced',
      typicalWording: t('“Rationalise the denominator of $\\dfrac{6}{\\sqrt{3} - 1}$.”', '“$\\dfrac{6}{\\sqrt{3} - 1}$-এর হরের করণীমুক্ত করো।”'),
      formula: t(r`Multiply top and bottom by the conjugate: $\frac{1}{\sqrt{a} - \sqrt{b}} = \frac{\sqrt{a} + \sqrt{b}}{a - b}$, using $(\sqrt{a} - \sqrt{b})(\sqrt{a} + \sqrt{b}) = a - b$.`, r`লব ও হরকে অনুবন্ধী দিয়ে গুণ করো: $\frac{1}{\sqrt{a} - \sqrt{b}} = \frac{\sqrt{a} + \sqrt{b}}{a - b}$, কারণ $(\sqrt{a} - \sqrt{b})(\sqrt{a} + \sqrt{b}) = a - b$।`),
      shortcut: t(r`When the denominator is $\sqrt{a} + 1$ or $\sqrt{a} - 1$, the new denominator $a - 1$ often divides the numerator exactly, so the answer collapses to a single surd term like $\sqrt{5} - 1$.`, r`হর $\sqrt{a} + 1$ বা $\sqrt{a} - 1$ হলে নতুন হর $a - 1$ প্রায়ই লবকে ঠিকঠাক ভাগ করে, তাই উত্তর $\sqrt{5} - 1$-এর মতো একটি মাত্র করণী পদে মিলে যায়।`),
      trap: t(r`The new denominator is $a - b$, the difference of the numbers UNDER the roots — not $(\sqrt{a} - \sqrt{b})^2$. And the conjugate flips only the MIDDLE sign.`, r`নতুন হর হয় $a - b$, মূলচিহ্নের নিচের সংখ্যাদুটির বিয়োগফল — $(\sqrt{a} - \sqrt{b})^2$ নয়। আর অনুবন্ধীতে শুধু মাঝের চিহ্নটাই বদলায়।`),
      spot: t(
        'A fraction has a √ in its denominator, like $\\frac{6}{\\sqrt{3} - 1}$, and the question says "rationalise" or "simplify".',
        'কোনো ভগ্নাংশের হরে √ চিহ্ন থাকে, যেমন $\\frac{6}{\\sqrt{3} - 1}$, আর প্রশ্নে "করণীমুক্ত করো" বা "সরল করো" বলা থাকে।',
      ),
      method: [
        t('Write the conjugate of the denominator: flip the sign in the middle ($\sqrt{3} - 1 \to \sqrt{3} + 1$).', 'হরের অনুবন্ধী লেখো: মাঝের চিহ্নটা উল্টে দাও ($\sqrt{3} - 1 \to \sqrt{3} + 1$)।'),
        t('Multiply numerator AND denominator by that conjugate.', 'লব ও হর — দুটোকেই সেই অনুবন্ধী দিয়ে গুণ করো।'),
        t('The denominator becomes a plain number ($a - b$); simplify and cancel.', 'হর হয়ে যায় একটি সরল সংখ্যা ($a - b$); সরল করে কাটাকাটি করো।'),
      ],
      example: {
        question: t(r`Rationalise the denominator of $\frac{6}{\sqrt{3} - 1}$.`, r`$\frac{6}{\sqrt{3} - 1}$-এর হরের করণীমুক্ত করো।`),
        steps: [
          t(r`Multiply top and bottom by the conjugate $\sqrt{3} + 1$: $\frac{6(\sqrt{3} + 1)}{(\sqrt{3} - 1)(\sqrt{3} + 1)}$.`, r`লব ও হরকে অনুবন্ধী $\sqrt{3} + 1$ দিয়ে গুণ করো: $\frac{6(\sqrt{3} + 1)}{(\sqrt{3} - 1)(\sqrt{3} + 1)}$।`),
          t(r`Denominator: $(\sqrt{3})^2 - 1^2 = 3 - 1 = 2$.`, r`হর: $(\sqrt{3})^2 - 1^2 = 3 - 1 = 2$।`),
          t(r`So the value is $\frac{6(\sqrt{3} + 1)}{2} = 3(\sqrt{3} + 1) = 3\sqrt{3} + 3$.`, r`তাই মান $\frac{6(\sqrt{3} + 1)}{2} = 3(\sqrt{3} + 1) = 3\sqrt{3} + 3$।`),
        ],
        answer: t(r`$3\sqrt{3} + 3$`, r`মান $3\sqrt{3} + 3$`),
      },
      tryIt: {
        question: t(r`Simplify: $\frac{4}{\sqrt{5} + 1}$.`, r`সরল করো: $\frac{4}{\sqrt{5} + 1}$।`),
        options: [t(r`$\sqrt{5} + 1$`, r`$\sqrt{5} + 1$`), t(r`$\sqrt{5} - 1$`, r`$\sqrt{5} - 1$`), t(r`$2\sqrt{5} - 2$`, r`$2\sqrt{5} - 2$`), t(r`$4\sqrt{5} - 4$`, r`$4\sqrt{5} - 4$`)],
        correct: 1,
        explanation: [
          t(r`Multiply top and bottom by the conjugate $\sqrt{5} - 1$: denominator $= 5 - 1 = 4$.`, r`লব ও হরকে অনুবন্ধী $\sqrt{5} - 1$ দিয়ে গুণ করো: হর $= 5 - 1 = 4$।`),
          t(r`$\frac{4(\sqrt{5} - 1)}{4} = \sqrt{5} - 1$.`, r`তাই $\frac{4(\sqrt{5} - 1)}{4} = \sqrt{5} - 1$।`),
          t(r`$2\sqrt{5} - 2$ comes from dividing by 2 instead of the correct new denominator 4.`, r`সঠিক নতুন হর 4-এর বদলে 2 দিয়ে ভাগ করলে $2\sqrt{5} - 2$ আসে।`),
        ],
      },
    },

    // 14 ─────────────────────────────────────────────
    {
      key: 'exponents_find_x',
      emoji: '🔑',
      name: t('Find x in an exponential equation', 'সূচকীয় সমীকরণে x-এর মান নির্ণয়'),
      difficulty: 'advanced',
      typicalWording: t('“If $2^{x + 1} = 32$, find the value of x.”', '“যদি $2^{x + 1} = 32$ হয়, তবে x-এর মান কত?”'),
      formula: t(r`If $a^m = a^n$ with the same base $a$, then $m = n$ — so first write both sides as powers of ONE base.`, r`একই ভিত্তি $a$ হলে $a^m = a^n$ থেকে $m = n$ — তাই আগে দুই দিককেই একটি ভিত্তির ঘাতে লেখো।`),
      shortcut: t('Memorise powers of 2 (up to $2^{10}$) and of 3 (up to $3^5$): then $32 = 2^5$ and $243 = 3^5$ are read off instantly, with no factorising.', '2-এর ঘাত ($2^{10}$ পর্যন্ত) ও 3-এর ঘাত ($3^5$ পর্যন্ত) মুখস্থ রাখো: তাহলে $32 = 2^5$ ও $243 = 3^5$ উৎপাদকে বিশ্লেষণ ছাড়াই চোখে পড়ে যাবে।'),
      trap: t(r`The exponent is the WHOLE expression: $2^{x + 1} = 32$ gives $x + 1 = 5$, so $x = 4$ — do not stop at 5 and report the exponent itself.`, r`সূচক হল পুরো রাশিটা: $2^{x + 1} = 32$ থেকে $x + 1 = 5$, তাই $x = 4$ — 5-এ থেমে গিয়ে সূচকটাকেই উত্তর বোলো না।`),
      spot: t(
        'An equation has x up in the power, like $2^{x + 1} = 32$, and asks for the value of x.',
        'সমীকরণে x থাকে ঘাতের জায়গায়, যেমন $2^{x + 1} = 32$, আর x-এর মান জানতে চাওয়া হয়।',
      ),
      method: [
        t('Write the plain number side as a power of the same base ($32 = 2^5$).', 'সরল সংখ্যার দিকটিকে একই ভিত্তির ঘাতে লেখো ($32 = 2^5$)।'),
        t('Equate the exponents — equal bases with equal values have equal powers.', 'সূচকদুটিকে সমান ধরো — ভিত্তি ও মান সমান হলে ঘাতও সমান।'),
        t('Solve the small linear equation that remains.', 'যে ছোট একঘাত সমীকরণটা বাকি থাকে, সেটা মেলাও।'),
      ],
      example: {
        question: t(r`If $2^{x + 1} = 32$, find $x$.`, r`যদি $2^{x + 1} = 32$ হয়, তবে $x$-এর মান কত?`),
        steps: [
          t(r`Write 32 as a power of 2: $32 = 2^5$, so $2^{x + 1} = 2^5$.`, r`32-কে 2-এর ঘাতে লেখো: $32 = 2^5$, তাই $2^{x + 1} = 2^5$।`),
          t(r`Same base, so the exponents are equal: $x + 1 = 5$.`, r`ভিত্তি এক, তাই সূচকদুটি সমান: $x + 1 = 5$।`),
          t(r`$x = 5 - 1 = 4$. Check: $2^{4 + 1} = 2^5 = 32$. ✓`, r`তাই $x = 5 - 1 = 4$। যাচাই: $2^{4 + 1} = 2^5 = 32$। ✓`),
        ],
        answer: t('x = 4', 'x = 4 (উত্তর)'),
      },
      tryIt: {
        question: t(r`If $3^{x + 2} = 243$, find $x$.`, r`যদি $3^{x + 2} = 243$ হয়, তবে $x$-এর মান কত?`),
        options: [t('5', '5'), t('2', '2'), t('3', '3'), t('7', '7')],
        correct: 2,
        explanation: [
          t(r`$243 = 3^5$, so $3^{x + 2} = 3^5$.`, r`$243 = 3^5$, তাই $3^{x + 2} = 3^5$।`),
          t(r`Equate exponents: $x + 2 = 5$, so $x = 3$.`, r`সূচক সমান ধরো: $x + 2 = 5$, তাই $x = 3$।`),
          t(r`5 is the exponent itself — the question asks for x, so the $+2$ still has to come off.`, r`5 হল সূচকটা নিজেই — প্রশ্নে x চাওয়া হয়েছে, তাই $+2$ এখনও বাদ দিতে হবে।`),
        ],
      },
    },
    // 15 ─────────────────────────────────────────────
    {
      key: 'fraction_word_problem',
      emoji: '🍰',
      name: t('Fractions of a whole — word problems', 'পূর্ণের ভগ্নাংশ — শব্দের প্রশ্ন'),
      difficulty: 'intermediate',
      typicalWording: t('“In a class $\\frac{3}{5}$ of the students are girls. If $\\frac{2}{9}$ of the girls and $\\frac{1}{4}$ of the boys are absent, what part of the class is present?”', '“একটি ক্লাসের $\\frac{3}{5}$ অংশ ছাত্রী। ছাত্রীদের $\\frac{2}{9}$ অংশ ও ছাত্রদের $\\frac{1}{4}$ অংশ অনুপস্থিত হলে ক্লাসের কত অংশ উপস্থিত?”'),
      formula: t(r`Part $=$ fraction $\times$ whole, so whole $=$ part $\div$ fraction. A fraction of a group: $\frac{a}{b}$ of $\frac{p}{q}$ of the total $= \frac{ap}{bq}$ of the total.`, r`অংশ $=$ ভগ্নাংশ $\times$ পূর্ণ, তাই পূর্ণ $=$ অংশ $\div$ ভগ্নাংশ। একটি দলের ভগ্নাংশ: মোটের $\frac{p}{q}$-এর $\frac{a}{b}$ $=$ মোটের $\frac{ap}{bq}$।`),
      shortcut: t('Take the whole as the LCM of all the denominators (e.g. 180 students) — every part becomes a whole number and the answer is a simple ratio.', 'পূর্ণকে সব হরের ল.সা.গু. ধরো (যেমন 180 জন ছাত্রছাত্রী) — প্রতিটা অংশ পূর্ণসংখ্যা হয়ে যায়, উত্তর একটা সহজ অনুপাত।'),
      trap: t('“$\\frac{2}{9}$ of the girls” is a fraction of the girls, not of the whole class — multiply by the girls\' share first. And if “present” is asked, subtract the absent part from 1.', '“ছাত্রীদের $\\frac{2}{9}$” মানে ছাত্রীদের ভগ্নাংশ, পুরো ক্লাসের নয় — আগে ছাত্রীদের অংশ দিয়ে গুণ করো। আর “উপস্থিত” চাইলে অনুপস্থিত অংশ 1 থেকে বিয়োগ করো।'),
      spot: t(
        'Parts of a whole are described by fractions (“3/5 are girls”, “1/4 of a tank holds 135 litres”, “5/12 of a sum equals …”) and another part, or the whole, is asked.',
        'পূর্ণের বিভিন্ন অংশ ভগ্নাংশে বলা থাকে (“3/5 অংশ ছাত্রী”, “ট্যাঙ্কের 1/4 অংশে 135 লিটার ধরে”, “একটি টাকার 5/12 অংশ …-এর সমান”) আর অন্য একটি অংশ বা পূর্ণটি জানতে চাওয়া হয়।',
      ),
      method: [
        t('Name the whole (class, tank, income, sum) and write each given part as a fraction of it.', 'পূর্ণটি কী (ক্লাস, ট্যাঙ্ক, আয়, টাকা) ঠিক করো, আর প্রতিটা দেওয়া অংশকে তার ভগ্নাংশ হিসেবে লেখো।'),
        t('A fraction of a sub-group: multiply the two fractions to get it as a part of the whole.', 'উপ-দলের ভগ্নাংশ হলে দুটো ভগ্নাংশ গুণ করে পূর্ণের অংশ হিসেবে লেখো।'),
        t('If a part is known in units (litres, ₹), whole = units ÷ fraction; then answer what is asked.', 'কোনো অংশের পরিমাণ (লিটার, ₹) জানা থাকলে পূর্ণ = পরিমাণ ÷ ভগ্নাংশ; তারপর যা চাওয়া হয়েছে তা বের করো।'),
      ],
      example: {
        question: t(r`In a class $\frac{3}{5}$ of the students are girls and the rest are boys. $\frac{2}{9}$ of the girls and $\frac{1}{4}$ of the boys are absent. What part of the class is present?`, r`একটি ক্লাসের $\frac{3}{5}$ অংশ ছাত্রী, বাকিরা ছাত্র। ছাত্রীদের $\frac{2}{9}$ অংশ ও ছাত্রদের $\frac{1}{4}$ অংশ অনুপস্থিত। ক্লাসের কত অংশ উপস্থিত?`),
        steps: [
          t(r`Boys $= 1 - \frac{3}{5} = \frac{2}{5}$ of the class.`, r`ছাত্র $= 1 - \frac{3}{5} = \frac{2}{5}$ অংশ।`),
          t(r`Absent $= \frac{3}{5} \times \frac{2}{9} + \frac{2}{5} \times \frac{1}{4} = \frac{2}{15} + \frac{1}{10} = \frac{7}{30}$.`, r`অনুপস্থিত $= \frac{3}{5} \times \frac{2}{9} + \frac{2}{5} \times \frac{1}{4} = \frac{2}{15} + \frac{1}{10} = \frac{7}{30}$।`),
          t(r`Present $= 1 - \frac{7}{30} = \frac{23}{30}$.`, r`উপস্থিত $= 1 - \frac{7}{30} = \frac{23}{30}$।`),
        ],
        answer: t(r`$\frac{23}{30}$ of the class`, r`ক্লাসের $\frac{23}{30}$ অংশ`),
      },
      tryIt: {
        question: t(r`$\frac{1}{4}$ of a tank holds 135 litres of water. What part of the tank is full when it contains 180 litres?`, r`একটি ট্যাঙ্কের $\frac{1}{4}$ অংশে 135 লিটার জল ধরে। ট্যাঙ্কে 180 লিটার জল থাকলে তার কত অংশ ভর্তি?`),
        options: [t(r`$\frac{1}{3}$`, r`$\frac{1}{3}$`), t(r`$\frac{2}{3}$`, r`$\frac{2}{3}$`), t(r`$\frac{3}{4}$`, r`$\frac{3}{4}$`), t(r`$\frac{1}{6}$`, r`$\frac{1}{6}$`)],
        correct: 0,
        explanation: [
          t(r`Full tank $= 135 \div \frac{1}{4} = 540$ litres.`, r`পুরো ট্যাঙ্ক $= 135 \div \frac{1}{4} = 540$ লিটার।`),
          t(r`Part full $= \frac{180}{540} = \frac{1}{3}$. ($\frac{3}{4}$ comes from $\frac{135}{180}$ — the ratio turned upside down.)`, r`ভর্তি অংশ $= \frac{180}{540} = \frac{1}{3}$। ($\frac{135}{180}$ উল্টো অনুপাত নিলে $\frac{3}{4}$ আসে — ভুল।)`),
        ],
      },
    },

    // 16 ─────────────────────────────────────────────
    {
      key: 'near_whole_mixed_multiply',
      emoji: '🔢',
      name: t('Big mixed number × its denominator', 'বড় মিশ্র ভগ্নাংশ × তার হর'),
      difficulty: 'intermediate',
      typicalWording: t(r`“The value of $999\frac{995}{999} \times 999$ is”`, r`“$999\frac{995}{999} \times 999$-এর মান”`),
      formula: t(r`$\left(A + \frac{r}{d}\right) \times d = A \times d + r$, and $A \times 999 = A \times 1000 - A$.`, r`$\left(A + \frac{r}{d}\right) \times d = A \times d + r$, আর $A \times 999 = A \times 1000 - A$।`),
      shortcut: t('Split the mixed number: whole part × multiplier, plus the fraction × multiplier (which cancels to a small number). Never convert to an improper fraction.', 'মিশ্র ভগ্নাংশটা ভেঙে নাও: পূর্ণ অংশ × গুণক, তার সঙ্গে ভগ্নাংশ × গুণক (যা কেটে ছোট সংখ্যা হয়)। কখনো অপ্রকৃত ভগ্নাংশে বদলাবে না।'),
      trap: t(r`$999 \times 999 = 998001$ is only the whole part — the fraction part still adds $995$. Forgetting it is the most common wrong option.`, r`$999 \times 999 = 998001$ শুধু পূর্ণ অংশের গুণফল — ভগ্নাংশ অংশ থেকে আরও $995$ যোগ হবে। এটা ভুলে যাওয়াই সবচেয়ে সাধারণ ভুল বিকল্প।`),
      spot: t(
        r`A mixed number with a large whole part, like $999\frac{995}{999}$, is multiplied by its own denominator or by a factor of it.`,
        r`বড় পূর্ণ অংশওয়ালা একটি মিশ্র ভগ্নাংশ, যেমন $999\frac{995}{999}$, তার নিজের হর বা হরের কোনো উৎপাদক দিয়ে গুণ করা থাকে।`,
      ),
      method: [
        t(r`Write the mixed number as $A + \frac{r}{d}$.`, r`মিশ্র ভগ্নাংশটিকে $A + \frac{r}{d}$ হিসেবে লেখো।`),
        t(r`Multiply each part separately: $A \times m$ and $\frac{r}{d} \times m$ (this cancels).`, r`প্রতিটা অংশ আলাদা গুণ করো: $A \times m$ আর $\frac{r}{d} \times m$ (এটা কেটে যায়)।`),
        t(r`Use $A \times 999 = A \times 1000 - A$ (or $\times 99$, $\times 9999$) for the big product, then add.`, r`বড় গুণফলের জন্য $A \times 999 = A \times 1000 - A$ (বা $\times 99$, $\times 9999$) ব্যবহার করো, তারপর যোগ করো।`),
      ],
      example: {
        question: t(r`Find the value of $999\frac{995}{999} \times 999$.`, r`$999\frac{995}{999} \times 999$-এর মান নির্ণয় করো।`),
        steps: [
          t(r`$= 999 \times 999 + \frac{995}{999} \times 999 = 999 \times 999 + 995$.`, r`ভেঙে গুণ করো: $= 999 \times 999 + \frac{995}{999} \times 999 = 999 \times 999 + 995$।`),
          t(r`$999 \times 999 = 999000 - 999 = 998001$.`, r`বড় গুণফল: $999 \times 999 = 999000 - 999 = 998001$।`),
          t(r`$998001 + 995 = 998996$.`, r`যোগ করে পাই $998001 + 995 = 998996$।`),
        ],
        answer: t('998996', 'মান 998996'),
      },
      tryIt: {
        question: t(r`Find the value of $99\frac{97}{99} \times 99$.`, r`$99\frac{97}{99} \times 99$-এর মান নির্ণয় করো।`),
        options: [t('9801', '9801'), t('9898', '9898'), t('9900', '9900'), t('9897', '9897')],
        correct: 1,
        explanation: [
          t(r`$99 \times 99 + 97 = 9801 + 97$.`, r`ভেঙে গুণ করো: $99 \times 99 + 97 = 9801 + 97$।`),
          t(r`$= 9898$. (9801 forgets the $+97$ from the fraction part.)`, r`$= 9898$। (9801 হলে ভগ্নাংশ অংশের $+97$ বাদ পড়েছে।)`),
        ],
      },
    },

    // 17 ─────────────────────────────────────────────
    {
      key: 'symbol_operations',
      emoji: '🔣',
      name: t('Changed signs and newly defined operations', 'চিহ্ন বদল ও নতুন সংজ্ঞায়িত প্রক্রিয়া'),
      difficulty: 'intermediate',
      typicalWording: t('“If ‘<’ means ‘minus’, ‘>’ means ‘plus’, ‘=’ means ‘multiplied by’ and ‘@’ means ‘divided by’, find the value of 27 > 81 @ 9 < 6.”', '“যদি ‘<’ মানে ‘বিয়োগ’, ‘>’ মানে ‘যোগ’, ‘=’ মানে ‘গুণ’ এবং ‘@’ মানে ‘ভাগ’ হয়, তবে 27 > 81 @ 9 < 6-এর মান কত?”'),
      formula: t(r`Decode first, then BODMAS: $\div$ and $\times$ left to right, then $+$ and $-$. For a defined operation like $a * b = ab + b - a$, work the innermost bracket first.`, r`আগে চিহ্ন বদলাও, তারপর BODMAS: $\div$ ও $\times$ বাঁ দিক থেকে, তারপর $+$ ও $-$। $a * b = ab + b - a$-এর মতো নতুন প্রক্রিয়ায় আগে ভিতরের বন্ধনী।`),
      shortcut: t('Write the decoded line under the given one before doing any arithmetic — most mistakes come from decoding in your head.', 'কোনো হিসাব করার আগে বদলানো লাইনটা প্রশ্নের নিচে লিখে ফেলো — বেশিরভাগ ভুল হয় মনে মনে চিহ্ন বদলাতে গিয়ে।'),
      trap: t('After decoding, the real signs still follow BODMAS — working strictly left to right gives a wrong option. And $(a * b) * c$ is usually not $a * (b * c)$.', 'চিহ্ন বদলানোর পরেও আসল চিহ্নগুলো BODMAS মেনে চলে — শুধু বাঁ দিক থেকে ডান দিকে করলে ভুল বিকল্প আসে। আর $(a * b) * c$ সাধারণত $a * (b * c)$ নয়।'),
      spot: t(
        'The question redefines the signs (“÷ means +”), defines a new operation like $a * b = ab + b - a$, or asks which two numbers or signs to interchange to make an equation true.',
        'প্রশ্নে চিহ্নের মানে বদলে দেওয়া থাকে (“÷ মানে +”), $a * b = ab + b - a$-এর মতো নতুন প্রক্রিয়া সংজ্ঞায়িত থাকে, বা কোন দুটি সংখ্যা/চিহ্ন অদলবদল করলে সমীকরণ ঠিক হবে তা জানতে চাওয়া হয়।',
      ),
      method: [
        t('Rewrite the expression with the real meaning of each symbol (or with the two items interchanged).', 'প্রতিটা চিহ্নের আসল মানে বসিয়ে (বা দুটি জিনিস অদলবদল করে) রাশিটা আবার লেখো।'),
        t('Apply BODMAS to the rewritten line; for a defined operation, evaluate the bracket first using the rule.', 'নতুন লাইনে BODMAS প্রয়োগ করো; সংজ্ঞায়িত প্রক্রিয়ায় নিয়ম মেনে আগে বন্ধনীর মান বের করো।'),
        t('For “which interchange”, test each option until both sides are equal.', '“কোন অদলবদল” প্রশ্নে প্রতিটা বিকল্প বসিয়ে দেখো কোনটায় দুই দিক সমান হয়।'),
      ],
      example: {
        question: t('If ‘<’ means ‘minus’, ‘>’ means ‘plus’, ‘=’ means ‘multiplied by’ and ‘@’ means ‘divided by’, find the value of 27 > 81 @ 9 < 6.', 'যদি ‘<’ মানে ‘বিয়োগ’, ‘>’ মানে ‘যোগ’, ‘=’ মানে ‘গুণ’ এবং ‘@’ মানে ‘ভাগ’ হয়, তবে 27 > 81 @ 9 < 6-এর মান কত?'),
        steps: [
          t(r`Decoded: $27 + 81 \div 9 - 6$.`, r`চিহ্ন বদলে: $27 + 81 \div 9 - 6$।`),
          t(r`Division first: $81 \div 9 = 9$.`, r`আগে ভাগ: $81 \div 9 = 9$।`),
          t(r`$27 + 9 - 6 = 30$.`, r`তারপর যোগ-বিয়োগ: $27 + 9 - 6 = 30$।`),
        ],
        answer: t('30', 'মান 30'),
      },
      tryIt: {
        question: t(r`If $a * b = ab + a - b$, find the value of $(3 * 2) * 4$.`, r`$a * b = ab + a - b$ হলে $(3 * 2) * 4$-এর মান কত?`),
        options: [t('15', '15'), t('27', '27'), t('31', '31'), t('35', '35')],
        correct: 2,
        explanation: [
          t(r`Bracket first: $3 * 2 = 6 + 3 - 2 = 7$.`, r`আগে বন্ধনী: $3 * 2 = 6 + 3 - 2 = 7$।`),
          t(r`$7 * 4 = 28 + 7 - 4 = 31$. (15 comes from working $3 * (2 * 4)$ instead.)`, r`$7 * 4 = 28 + 7 - 4 = 31$। ($3 * (2 * 4)$ করলে 15 আসে — ভুল।)`),
        ],
      },
    },

    // 18 ─────────────────────────────────────────────
    {
      key: 'perfect_square_adjust',
      emoji: '🟩',
      name: t('Make a number a perfect square', 'সংখ্যাকে পূর্ণবর্গ করা'),
      difficulty: 'intermediate',
      typicalWording: t('“The least number to be subtracted from 11100 to make it a perfect square is” / “By what number should 1083 be multiplied to make it a perfect square?”', '“11100 থেকে ন্যূনতম কোন সংখ্যা বিয়োগ করলে পূর্ণবর্গ হবে?” / “1083-কে ন্যূনতম কোন সংখ্যা দিয়ে গুণ করলে পূর্ণবর্গ হবে?”'),
      formula: t(r`Subtract $N - k^2$ where $k^2$ is the square just below $N$; add $(k + 1)^2 - N$. Multiply (or divide) by the product of the primes that occur an odd number of times in $N$.`, r`বিয়োগ: $N - k^2$, যেখানে $k^2$ হল $N$-এর ঠিক নিচের বর্গ; যোগ: $(k + 1)^2 - N$। গুণ (বা ভাগ): $N$-এ যে মৌলিক উৎপাদকগুলো বিজোড় বার আছে তাদের গুণফল।`),
      shortcut: t(r`Bracket $N$ between squares of round numbers: $105^2 = 11025 < 11100 < 106^2 = 11236$. For decimals, use squares like $2.2^2 = 4.84$.`, r`$N$-কে গোল সংখ্যার বর্গের মাঝে ফেলো: $105^2 = 11025 < 11100 < 106^2 = 11236$। দশমিকে $2.2^2 = 4.84$-এর মতো বর্গ নাও।`),
      trap: t('Subtracting goes DOWN to the square below; adding goes UP to the square above. Mixing them up gives the other distance (136 instead of 75 for 11100).', 'বিয়োগ করলে নিচের বর্গে নামতে হয়; যোগ করলে উপরের বর্গে উঠতে হয়। গুলিয়ে ফেললে অন্য দূরত্বটা আসে (11100-এর ক্ষেত্রে 75-এর বদলে 136)।'),
      spot: t(
        'The question asks for the least number to be added, subtracted, multiplied or divided so that the result is a perfect square.',
        'প্রশ্নে জানতে চাওয়া হয় ন্যূনতম কোন সংখ্যা যোগ, বিয়োগ, গুণ বা ভাগ করলে ফল পূর্ণবর্গ হবে।',
      ),
      method: [
        t(r`Add/subtract: find the whole number $k$ with $k^2 \le N < (k + 1)^2$ (division method or nearby round squares).`, r`যোগ/বিয়োগ: এমন পূর্ণসংখ্যা $k$ বের করো যাতে $k^2 \le N < (k + 1)^2$ (ভাগ পদ্ধতি বা কাছের গোল বর্গ দিয়ে)।`),
        t(r`Subtract: answer $N - k^2$. Add: answer $(k + 1)^2 - N$.`, r`বিয়োগ: উত্তর $N - k^2$। যোগ: উত্তর $(k + 1)^2 - N$।`),
        t('Multiply/divide: split N into primes; the primes with an odd power, multiplied together, give the answer.', 'গুণ/ভাগ: N-কে মৌলিক উৎপাদকে ভাঙো; যেগুলোর ঘাত বিজোড়, তাদের গুণফলই উত্তর।'),
      ],
      example: {
        question: t('Find the least number which must be subtracted from 11100 to make it a perfect square.', '11100 থেকে ন্যূনতম কোন সংখ্যা বিয়োগ করলে সেটি পূর্ণবর্গ হবে?'),
        steps: [
          t(r`$105^2 = 11025$ and $106^2 = 11236$, so $11025 < 11100 < 11236$.`, r`$105^2 = 11025$ আর $106^2 = 11236$, তাই $11025 < 11100 < 11236$।`),
          t(r`Go down to $11025$: $11100 - 11025 = 75$.`, r`নিচের বর্গ $11025$-এ নামো: $11100 - 11025 = 75$।`),
        ],
        answer: t('75', 'উত্তর 75'),
      },
      tryIt: {
        question: t('Find the smallest number by which 5808 should be multiplied so that the product is a perfect square.', '5808-কে ন্যূনতম কোন সংখ্যা দিয়ে গুণ করলে গুণফল পূর্ণবর্গ হবে?'),
        options: [t('2', '2'), t('3', '3'), t('6', '6'), t('11', '11')],
        correct: 1,
        explanation: [
          t(r`$5808 = 2^4 \times 3 \times 11^2$.`, r`মৌলিক উৎপাদকে ভাঙলে $5808 = 2^4 \times 3 \times 11^2$।`),
          t(r`Only $3$ has an odd power, so multiply by $3$: $5808 \times 3 = 17424 = 132^2$.`, r`শুধু $3$-এর ঘাত বিজোড়, তাই $3$ দিয়ে গুণ করো: $5808 \times 3 = 17424 = 132^2$।`),
        ],
      },
    },
  ],
};
