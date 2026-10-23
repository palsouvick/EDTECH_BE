'use strict';

// Question patterns: Ratio & Proportion. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'ratio_proportion',
  patterns: [
    // 1 ─────────────────────────────────────────────
    {
      key: 'divide_in_ratio',
      emoji: '🍰',
      name: t('Divide an amount in a given ratio', 'নির্দিষ্ট অনুপাতে কোনো পরিমাণ ভাগ করা'),
      spot: t(
        'A total amount is "divided among A, B (and C) in the ratio a : b (: c)" and someone\'s share is asked.',
        'মোট পরিমাণ "A, B (ও C)-এর মধ্যে a : b (: c) অনুপাতে ভাগ করা হল", আর কারো ভাগ জানতে চায়।',
      ),
      method: [
        t('Add the ratio terms to get the total number of parts.', 'অনুপাতের পদগুলো যোগ করে মোট ভাগের সংখ্যা বের করো।'),
        t('Value of 1 part = total amount ÷ total parts.', '1 ভাগের মান = মোট পরিমাণ ÷ মোট ভাগ।'),
        t(`Each person's share = his ratio term × value of 1 part.`, 'প্রত্যেকের ভাগ = তার অনুপাতের পদ × 1 ভাগের মান।'),
      ],
      example: {
        question: t('Divide ₹1200 between Amit and Bina in the ratio 3 : 5.', '₹1200 অমিত ও বীণার মধ্যে 3 : 5 অনুপাতে ভাগ করো।'),
        steps: [
          t('Total parts = 3 + 5 = 8.', 'মোট ভাগ = 3 + 5 = 8।'),
          t('1 part = 1200 ÷ 8 = ₹150.', '1 ভাগ = 1200 ÷ 8 = ₹150।'),
          t('Amit = 3 × 150 = ₹450, Bina = 5 × 150 = ₹750. Check: 450 + 750 = 1200.', 'অমিত = 3 × 150 = ₹450, বীণা = 5 × 150 = ₹750। মিলিয়ে দেখো: 450 + 750 = 1200।'),
        ],
        answer: t('Amit ₹450, Bina ₹750', 'অমিত ₹450, বীণা ₹750'),
      },
      tryIt: {
        question: t(`₹2100 is divided among A, B and C in the ratio 2 : 3 : 5. What is B's share?`, '₹2100 টাকা A, B ও C-এর মধ্যে 2 : 3 : 5 অনুপাতে ভাগ করা হল। B-এর ভাগ কত?'),
        options: [t('₹420', '₹420'), t('₹630', '₹630'), t('₹700', '₹700'), t('₹1050', '₹1050')],
        correct: 1,
        explanation: [
          t('Total parts = 2 + 3 + 5 = 10, so 1 part = 2100 ÷ 10 = ₹210.', 'মোট ভাগ = 2 + 3 + 5 = 10, তাই 1 ভাগ = 2100 ÷ 10 = ₹210।'),
          t(`B's share = 3 × 210 = ₹630.`, 'B-এর ভাগ = 3 × 210 = ₹630।'),
          t('₹700 is 2100 ÷ 3 (equal sharing), which ignores the ratio.', '₹700 হল 2100 ÷ 3 (সমান ভাগ), যেখানে অনুপাতটাই ভুলে যাওয়া হয়েছে।'),
        ],
      },
    },

    // 2 ─────────────────────────────────────────────
    {
      key: 'combine_ratios',
      emoji: '🔗',
      name: t('Join two ratios: A : B and B : C give A : B : C', 'দুটি অনুপাত জোড়া: A : B ও B : C থেকে A : B : C'),
      spot: t(
        'Two ratios share a common person or thing, like "A : B = 2 : 3 and B : C = 4 : 5", and the question asks A : B : C or A : C.',
        'দুটি অনুপাতে একটা সাধারণ পদ থাকে, যেমন "A : B = 2 : 3 এবং B : C = 4 : 5", আর প্রশ্নে A : B : C বা A : C জানতে চায়।',
      ),
      method: [
        t('Look at the common term (B). It has two different values in the two ratios.', 'সাধারণ পদটা (B) দেখো। দুটি অনুপাতে তার দুটো আলাদা মান।'),
        t('Make B the same in both: multiply each ratio so that B becomes the LCM of its two values.', 'দুই জায়গায় B সমান করো: প্রতিটা অনুপাতকে এমনভাবে গুণ করো যাতে B তার দুটো মানের ল.সা.গু. হয়।'),
        t('Now write A : B : C in one line. Multiply a whole ratio by the same number on both sides.', 'এবার A : B : C এক লাইনে লেখো। একটা অনুপাতের দুটো পদকেই একই সংখ্যা দিয়ে গুণ করবে।'),
      ],
      example: {
        question: t('If A : B = 2 : 3 and B : C = 4 : 5, find A : B : C.', 'যদি A : B = 2 : 3 এবং B : C = 4 : 5 হয়, তবে A : B : C নির্ণয় করো।'),
        steps: [
          t('B is 3 in the first ratio and 4 in the second. LCM of 3 and 4 = 12.', 'প্রথম অনুপাতে B = 3, দ্বিতীয়তে B = 4। 3 ও 4-এর ল.সা.গু. = 12।'),
          t('A : B = 2 : 3 = 8 : 12 (× 4). B : C = 4 : 5 = 12 : 15 (× 3).', '4 দিয়ে গুণ করে A : B = 2 : 3 = 8 : 12। 3 দিয়ে গুণ করে B : C = 4 : 5 = 12 : 15।'),
          t('So A : B : C = 8 : 12 : 15.', 'তাই A : B : C = 8 : 12 : 15।'),
        ],
        answer: t('8 : 12 : 15', 'নির্ণেয় অনুপাত 8 : 12 : 15'),
      },
      tryIt: {
        question: t('If A : B = 3 : 4 and B : C = 6 : 7, find A : B : C.', 'যদি A : B = 3 : 4 এবং B : C = 6 : 7 হয়, তবে A : B : C কত?'),
        options: [t('3 : 4 : 7', '3 : 4 : 7'), t('18 : 24 : 21', '18 : 24 : 21'), t('9 : 12 : 14', '9 : 12 : 14'), t('9 : 14 : 12', '9 : 14 : 12')],
        correct: 2,
        explanation: [
          t('B is 4 and 6. LCM of 4 and 6 = 12.', 'B-এর মান 4 ও 6। 4 ও 6-এর ল.সা.গু. = 12।'),
          t('A : B = 3 : 4 = 9 : 12 (× 3). B : C = 6 : 7 = 12 : 14 (× 2).', '3 দিয়ে গুণ করে A : B = 3 : 4 = 9 : 12। 2 দিয়ে গুণ করে B : C = 6 : 7 = 12 : 14।'),
          t('So A : B : C = 9 : 12 : 14. Writing 3 : 4 : 7 just glues the ratios without making B equal.', 'তাই A : B : C = 9 : 12 : 14। 3 : 4 : 7 লিখলে B সমান না করেই অনুপাত জোড়া হয় — ভুল।'),
        ],
      },
    },

    // 3 ─────────────────────────────────────────────
    {
      key: 'fourth_mean_proportional',
      emoji: '🧮',
      name: t('Fourth proportional and mean proportional', 'চতুর্থ সমানুপাতী ও মধ্যসমানুপাতী'),
      spot: t(
        'The words "fourth proportional", "third proportional" or "mean proportional" appear in the question.',
        'প্রশ্নে "চতুর্থ সমানুপাতী", "তৃতীয় সমানুপাতী" বা "মধ্যসমানুপাতী" কথাগুলো থাকে।',
      ),
      method: [
        t(r`Fourth proportional to a, b, c: $a : b = c : d$, so $d = \frac{b \times c}{a}$.`, r`a, b, c-এর চতুর্থ সমানুপাতী: $a : b = c : d$, তাই $d = \frac{b \times c}{a}$।`),
        t(r`Mean proportional between a and b: $a : x = x : b$, so $x = \sqrt{a \times b}$.`, r`a ও b-এর মধ্যসমানুপাতী: $a : x = x : b$, তাই $x = \sqrt{a \times b}$।`),
        t(r`Third proportional to a and b: $a : b = b : x$, so $x = \frac{b^2}{a}$.`, r`a ও b-এর তৃতীয় সমানুপাতী: $a : b = b : x$, তাই $x = \frac{b^2}{a}$।`),
      ],
      example: {
        question: t('Find (i) the fourth proportional to 4, 9, 12 and (ii) the mean proportional between 9 and 16.', '(i) 4, 9, 12-এর চতুর্থ সমানুপাতী এবং (ii) 9 ও 16-এর মধ্যসমানুপাতী নির্ণয় করো।'),
        steps: [
          t(r`(i) $4 : 9 = 12 : d$, so $d = \frac{9 \times 12}{4} = \frac{108}{4} = 27$.`, r`(i) $4 : 9 = 12 : d$, তাই $d = \frac{9 \times 12}{4} = \frac{108}{4} = 27$।`),
          t(r`(ii) $x = \sqrt{9 \times 16} = \sqrt{144} = 12$.`, r`(ii) মধ্যসমানুপাতী $x = \sqrt{9 \times 16} = \sqrt{144} = 12$।`),
        ],
        answer: t('(i) 27, (ii) 12', '(i) 27, (ii) 12 — এটাই উত্তর'),
      },
      tryIt: {
        question: t('Find the mean proportional between 12 and 27.', '12 ও 27-এর মধ্যসমানুপাতী কত?'),
        options: [t('19.5', '19.5'), t('18', '18'), t('324', '324'), t('15', '15')],
        correct: 1,
        explanation: [
          t(r`Mean proportional $= \sqrt{12 \times 27} = \sqrt{324}$.`, r`মধ্যসমানুপাতী $= \sqrt{12 \times 27} = \sqrt{324}$।`),
          t(r`$\sqrt{324} = 18$. Check: $12 : 18 = 2 : 3$ and $18 : 27 = 2 : 3$.`, r`$\sqrt{324} = 18$। মিলিয়ে দেখো: $12 : 18 = 2 : 3$ এবং $18 : 27 = 2 : 3$।`),
          t('19.5 is the ordinary average, and 324 forgets the square root.', '19.5 হল সাধারণ গড়, আর 324 হল বর্গমূল নিতে ভুলে যাওয়া।'),
        ],
      },
    },

    // 4 ─────────────────────────────────────────────
    {
      key: 'ratio_after_change',
      emoji: '➕',
      name: t('Ratio changes when a number is added or taken away', 'একই সংখ্যা যোগ বা বিয়োগ করলে অনুপাত বদলায়'),
      spot: t(
        'Two numbers are in one ratio; after adding (or subtracting) the same number to each, the ratio becomes a new one. The numbers are asked.',
        'দুটি সংখ্যা একটা অনুপাতে আছে; প্রত্যেকটির সঙ্গে একই সংখ্যা যোগ (বা বিয়োগ) করলে নতুন অনুপাত হয়। সংখ্যা দুটি জানতে চায়।',
      ),
      method: [
        t('Write the numbers as ax and bx.', 'সংখ্যা দুটি ax ও bx ধরো।'),
        t('Add or subtract the given number and set the new ratio equal: (ax + k) : (bx + k) = c : d.', 'দেওয়া সংখ্যা যোগ বা বিয়োগ করে নতুন অনুপাতের সমান লেখো: (ax + k) : (bx + k) = c : d।'),
        t('Cross-multiply, solve for x, then find ax and bx. Check with the new ratio.', 'আড়াআড়ি গুণ করে x বের করো, তারপর ax ও bx। নতুন অনুপাতে মিলিয়ে দেখো।'),
      ],
      example: {
        question: t('Two numbers are in the ratio 3 : 5. If 10 is added to each, the ratio becomes 5 : 7. Find the numbers.', 'দুটি সংখ্যার অনুপাত 3 : 5। প্রত্যেকটির সঙ্গে 10 যোগ করলে অনুপাত হয় 5 : 7। সংখ্যা দুটি নির্ণয় করো।'),
        steps: [
          t(r`Let the numbers be $3x$ and $5x$. Then $\frac{3x + 10}{5x + 10} = \frac{5}{7}$.`, r`ধরো সংখ্যা দুটি $3x$ ও $5x$। তাহলে $\frac{3x + 10}{5x + 10} = \frac{5}{7}$।`),
          t(r`Cross-multiply: $21x + 70 = 25x + 50$, so $4x = 20$ and $x = 5$.`, r`আড়াআড়ি গুণ করে: $21x + 70 = 25x + 50$, তাই $4x = 20$ এবং $x = 5$।`),
          t('Numbers = 15 and 25. Check: 25 : 35 = 5 : 7.', 'সংখ্যা দুটি = 15 ও 25। মিলিয়ে দেখো: 25 : 35 = 5 : 7।'),
        ],
        answer: t('15 and 25', '15 ও 25'),
      },
      tryIt: {
        question: t('Two numbers are in the ratio 2 : 3. If 5 is subtracted from each, the ratio becomes 1 : 2. What is the larger number?', 'দুটি সংখ্যার অনুপাত 2 : 3। প্রত্যেকটি থেকে 5 বিয়োগ করলে অনুপাত হয় 1 : 2। বড় সংখ্যাটি কত?'),
        options: [t('15', '15'), t('10', '10'), t('5', '5'), t('30', '30')],
        correct: 0,
        explanation: [
          t(r`Let the numbers be $2x$ and $3x$. Then $\frac{2x - 5}{3x - 5} = \frac{1}{2}$.`, r`ধরো সংখ্যা দুটি $2x$ ও $3x$। তাহলে $\frac{2x - 5}{3x - 5} = \frac{1}{2}$।`),
          t(r`Cross-multiply: $4x - 10 = 3x - 5$, so $x = 5$.`, r`আড়াআড়ি গুণ করে: $4x - 10 = 3x - 5$, তাই $x = 5$।`),
          t('Numbers = 10 and 15, so the larger is 15. Check: 5 : 10 = 1 : 2. (5 is only x, and 10 is the smaller number.)', 'সংখ্যা দুটি 10 ও 15, তাই বড়টি 15। মিলিয়ে দেখো: 5 : 10 = 1 : 2। (5 শুধু x-এর মান, আর 10 ছোট সংখ্যা।)'),
        ],
      },
    },

    // 5 ─────────────────────────────────────────────
    {
      key: 'income_expenditure',
      emoji: '👛',
      name: t('Income and expenditure ratios with equal savings', 'আয় ও ব্যয়ের অনুপাত, সমান সঞ্চয়'),
      spot: t(
        'The incomes of two people are in one ratio, their expenditures in another, and "each saves ₹..." is given. An income is asked.',
        'দুজনের আয় একটা অনুপাতে, ব্যয় আর একটা অনুপাতে, আর "প্রত্যেকে ₹... সঞ্চয় করে" দেওয়া থাকে। কারো আয় জানতে চায়।',
      ),
      method: [
        t('Let incomes be ax and bx, and expenditures cy and dy (use two different letters!).', 'আয় ax ও bx, আর ব্যয় cy ও dy ধরো (দুটো আলাদা অক্ষর নেবে!)।'),
        t('Saving = income − expenditure, so ax − cy = S and bx − dy = S.', 'সঞ্চয় = আয় − ব্যয়, তাই ax − cy = S এবং bx − dy = S।'),
        t('Solve the two equations to get x (and y), then find the income asked.', 'দুটি সমীকরণ সমাধান করে x (ও y) বের করো, তারপর যার আয় চাওয়া হয়েছে তা বের করো।'),
      ],
      example: {
        question: t('The incomes of A and B are in the ratio 4 : 3 and their expenditures are in the ratio 3 : 2. If each saves ₹600, find A\'s income.', 'A ও B-এর আয়ের অনুপাত 4 : 3 এবং ব্যয়ের অনুপাত 3 : 2। প্রত্যেকে ₹600 সঞ্চয় করলে A-এর আয় কত?'),
        steps: [
          t(r`$4x - 3y = 600$ and $3x - 2y = 600$.`, r`সমীকরণ দুটি: $4x - 3y = 600$ এবং $3x - 2y = 600$।`),
          t(r`Multiply the first by 2 and the second by 3: $8x - 6y = 1200$, $9x - 6y = 1800$. Subtract: $x = 600$.`, r`প্রথমটিকে 2 ও দ্বিতীয়টিকে 3 দিয়ে গুণ করো: $8x - 6y = 1200$, $9x - 6y = 1800$। বিয়োগ করলে: $x = 600$।`),
          t(r`A's income $= 4 \times 600 = 2400$. Check: $y = 600$, so A spends 1800 and saves 600.`, r`A-এর আয় $= 4 \times 600 = 2400$। মিলিয়ে দেখো: $y = 600$, তাই A খরচ করে 1800 আর সঞ্চয় করে 600।`),
        ],
        answer: t('₹2400', 'A-এর আয় ₹2400'),
      },
      tryIt: {
        question: t('The incomes of P and Q are in the ratio 5 : 4 and their expenditures are in the ratio 3 : 2. If each saves ₹1000, what is P\'s income?', 'P ও Q-এর আয়ের অনুপাত 5 : 4 এবং ব্যয়ের অনুপাত 3 : 2। প্রত্যেকে ₹1000 সঞ্চয় করলে P-এর আয় কত?'),
        options: [t('₹2000', '₹2000'), t('₹1500', '₹1500'), t('₹5000', '₹5000'), t('₹2500', '₹2500')],
        correct: 3,
        explanation: [
          t(r`$5x - 3y = 1000$ and $4x - 2y = 1000$.`, r`সমীকরণ দুটি: $5x - 3y = 1000$ এবং $4x - 2y = 1000$।`),
          t(r`Multiply by 2 and 3: $10x - 6y = 2000$, $12x - 6y = 3000$. Subtract: $2x = 1000$, so $x = 500$.`, r`2 ও 3 দিয়ে গুণ করো: $10x - 6y = 2000$, $12x - 6y = 3000$। বিয়োগ করলে: $2x = 1000$, তাই $x = 500$।`),
          t(r`P's income $= 5 \times 500 = 2500$. Check: $y = 500$, P spends 1500 and saves 1000. (₹2000 is Q's income.)`, r`P-এর আয় $= 5 \times 500 = 2500$। মিলিয়ে দেখো: $y = 500$, P খরচ করে 1500 আর সঞ্চয় করে 1000। (₹2000 হল Q-এর আয়।)`),
        ],
      },
    },
  ],
};
