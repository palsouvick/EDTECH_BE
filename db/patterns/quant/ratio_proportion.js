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
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“₹N is divided among A, B and C in the ratio a : b : c. Find B\'s share.”', '“₹N টাকা A, B ও C-এর মধ্যে a : b : c অনুপাতে ভাগ করা হল। B-এর ভাগ কত?”'),
      formula: t(r`Share $=$ (own term $\div$ sum of terms) $\times$ total.`, r`ভাগ $=$ (নিজের পদ $\div$ পদগুলোর যোগফল) $\times$ মোট পরিমাণ।`),
      shortcut: t('Find the value of 1 part once (total ÷ sum of terms), then multiply it by each term — faster than working out a separate fraction for every person.', 'একবারে 1 ভাগের মান বের করো (মোট ÷ পদগুলোর যোগফল), তারপর প্রতিটি পদ দিয়ে গুণ করো — প্রতিজনের জন্য আলাদা ভগ্নাংশ করার চেয়ে দ্রুত।'),
      trap: t('Divide by the sum of the ratio terms, not by the number of people — equal sharing ignores the ratio.', 'অনুপাতের পদগুলোর যোগফল দিয়ে ভাগ করো, লোকের সংখ্যা দিয়ে নয় — সমান ভাগ করলে অনুপাতটাই বাদ যায়।'),
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
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“A : B = 2 : 3 and B : C = 4 : 5. Find A : B : C (or A : C).”', '“A : B = 2 : 3 এবং B : C = 4 : 5। A : B : C (বা A : C) নির্ণয় করো।”'),
      formula: t(r`$A : B = a : b$ and $B : C = c : d$ give $A : B : C = ac : bc : bd$.`, r`$A : B = a : b$ ও $B : C = c : d$ হলে $A : B : C = ac : bc : bd$।`),
      shortcut: t('Make the common term the LCM of its two values by scaling each whole ratio, then read off A : B : C in one line.', 'সাধারণ পদটিকে তার দুটো মানের ল.সা.গু. করো — প্রতিটি অনুপাতকে পুরোটা স্কেল করে — তারপর এক লাইনে A : B : C পড়ে নাও।'),
      trap: t('Never just glue the two ratios together (2 : 3 and 4 : 5 is not 2 : 3 : 5): the common term must first be made equal in both.', 'দুটো অনুপাত সরাসরি জুড়ে দিও না (2 : 3 ও 4 : 5 মানে 2 : 3 : 5 নয়): আগে সাধারণ পদটিকে দুই জায়গায় সমান করতে হয়।'),
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
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“Find the fourth proportional to a, b, c” or “the mean / third proportional of a and b.”', '“a, b, c-এর চতুর্থ সমানুপাতী” বা “a ও b-এর মধ্য / তৃতীয় সমানুপাতী নির্ণয় করো।”'),
      formula: t(r`In $a : b = c : d$: fourth $d = \frac{bc}{a}$; mean of $a, b = \sqrt{ab}$; third of $a, b = \frac{b^2}{a}$.`, r`$a : b = c : d$ হলে: চতুর্থ $d = \frac{bc}{a}$; $a, b$-এর মধ্য $= \sqrt{ab}$; তৃতীয় $= \frac{b^2}{a}$।`),
      shortcut: t('Use product of extremes = product of means (ad = bc) and solve for the one unknown — one cross-multiplication settles every type.', 'প্রান্তীয় পদের গুণফল = মধ্যপদের গুণফল (ad = bc) ব্যবহার করে একটিমাত্র অজানা বের করো — এক আড়গুণনেই সব ধরনের উত্তর মেলে।'),
      trap: t('The mean proportional is a geometric mean (square root of the product), not the ordinary average; and for the fourth proportional the order of the three given numbers matters.', 'মধ্যসমানুপাতী হল গুণোত্তর গড় (গুণফলের বর্গমূল), সাধারণ গড় নয়; আর চতুর্থ সমানুপাতীতে দেওয়া তিনটি সংখ্যার ক্রম গুরুত্বপূর্ণ।'),
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
      difficulty: 'intermediate',
      typicalWording: t('“Two numbers are in the ratio a : b. If k is added to (subtracted from) each, the ratio becomes c : d. Find the numbers.”', '“দুটি সংখ্যার অনুপাত a : b। প্রত্যেকটির সঙ্গে k যোগ (বা বিয়োগ) করলে অনুপাত হয় c : d। সংখ্যা দুটি নির্ণয় করো।”'),
      formula: t(r`Numbers $ax, bx$ with the same change $k$: $\frac{ax + k}{bx + k} = \frac{c}{d}$ (use $-k$ if subtracted).`, r`সংখ্যা $ax, bx$-এর সঙ্গে একই পরিবর্তন $k$: $\frac{ax + k}{bx + k} = \frac{c}{d}$ (বিয়োগ হলে $-k$ নাও)।`),
      shortcut: t('Cross-multiply straight away: the x terms collect on one side and the constants on the other, giving x in one or two lines.', 'সরাসরি আড়গুণ করো: x-ওয়ালা পদ একদিকে, ধ্রুবক অন্যদিকে জমা হয় — এক-দুই লাইনেই x পাওয়া যায়।'),
      trap: t('x is not the answer — the question asks for the numbers ax and bx. Also the same number is added to both terms, not multiplied.', 'x উত্তর নয় — প্রশ্নে সংখ্যা দুটি অর্থাৎ ax ও bx চাওয়া হয়। আর একই সংখ্যা দুটি পদের সঙ্গে যোগ হয়, গুণ নয়।'),
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
      difficulty: 'intermediate',
      typicalWording: t('“The incomes of A and B are in the ratio a : b and their expenditures in the ratio c : d. If each saves ₹S, find A\'s income.”', '“A ও B-এর আয়ের অনুপাত a : b এবং ব্যয়ের অনুপাত c : d। প্রত্যেকে ₹S সঞ্চয় করলে A-এর আয় কত?”'),
      formula: t(r`Saving $=$ income $-$ expenditure: $ax - cy = S$ and $bx - dy = S$.`, r`সঞ্চয় $=$ আয় $-$ ব্যয়: $ax - cy = S$ এবং $bx - dy = S$।`),
      shortcut: t('Eliminate y first: scale the two saving equations so the y terms match, subtract, and x falls out directly — income follows at once.', 'আগে y বাদ দাও: দুটি সঞ্চয়ের সমীকরণ এমনভাবে স্কেল করো যাতে y-এর পদ মিলে যায়, বিয়োগ করলেই x সরাসরি পাওয়া যায় — তারপর আয় তৎক্ষণাৎ।'),
      trap: t('Incomes and expenditures need two different multipliers (x and y): one part of income is not worth the same rupees as one part of expenditure.', 'আয় ও ব্যয়ের জন্য দুটো আলাদা গুণক (x ও y) লাগে: আয়ের এক অংশ আর ব্যয়ের এক অংশের টাকার মান এক নয়।'),
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

    // 6 ─────────────────────────────────────────────
    {
      key: 'simplify_proportion_terms',
      emoji: '🔍',
      name: t('Find the missing term of a proportion', 'সমানুপাতের হারানো পদ নির্ণয়'),
      difficulty: 'beginner',
      typicalWording: t('“Find x if 5 : x = 15 : 45” or “The numbers a, b, c, x are in proportion.”', '“5 : x = 15 : 45 হলে x নির্ণয় করো” বা “a, b, c, x সংখ্যাগুলি সমানুপাতে আছে।”'),
      formula: t(r`In $a : b = c : d$, product of extremes $=$ product of means: $ad = bc$.`, r`$a : b = c : d$ হলে প্রান্তীয় পদের গুণফল $=$ মধ্যপদের গুণফল: $ad = bc$।`),
      shortcut: t('Spot the scale factor between the two known matching terms first (15 is 3 × 5), then apply the same factor to the other term — no equation needed.', 'আগে দুটি জানা মিলে-যাওয়া পদের মধ্যে গুণকটি দেখো (15 হল 3 × 5), তারপর একই গুণক অন্য পদে লাগাও — সমীকরণ লাগে না।'),
      trap: t('Keep the positions straight: the first term pairs with the fourth (extremes) and the middle two pair together (means) — swapping a term changes the answer.', 'পদগুলোর অবস্থান ঠিক রাখো: প্রথম পদ চতুর্থটির সঙ্গে (প্রান্তীয়) আর মাঝের দুটি একসঙ্গে (মধ্য) জোড়া বাঁধে — পদ বদলে গেলে উত্তর বদলে যায়।'),
      spot: t(
        'Four quantities are stated to be **in proportion** (or written a : b = c : d) with exactly one term missing, marked x.',
        'চারটি রাশি **সমানুপাতে** আছে বলা থাকে (বা a : b = c : d আকারে লেখা থাকে), আর ঠিক একটি পদ x হিসেবে হারানো থাকে।',
      ),
      method: [
        t('Write the proportion in order: first : second = third : fourth.', 'সমানুপাতটি ক্রমে লেখো: প্রথম : দ্বিতীয় = তৃতীয় : চতুর্থ।'),
        t('Set product of extremes = product of means.', 'প্রান্তীয় পদের গুণফল = মধ্যপদের গুণফল লেখো।'),
        t('Divide by the coefficient of x to get the missing term.', 'x-এর সহগ দিয়ে ভাগ করে হারানো পদটি বের করো।'),
      ],
      example: {
        question: t('Find x if 5 : x = 15 : 45.', '5 : x = 15 : 45 হলে x-এর মান নির্ণয় করো।'),
        steps: [
          t(r`Extremes are $5$ and $45$; means are $x$ and $15$. So $5 \times 45 = 15x$.`, r`প্রান্তীয় পদ $5$ ও $45$; মধ্যপদ $x$ ও $15$। তাই $5 \times 45 = 15x$।`),
          t(r`$225 = 15x$, so $x = 225 \div 15 = 15$.`, r`$225 = 15x$, তাই $x = 225 \div 15 = 15$।`),
          t('Check: 5 : 15 = 1 : 3 and 15 : 45 = 1 : 3.', 'মিলিয়ে দেখো: 5 : 15 = 1 : 3 এবং 15 : 45 = 1 : 3।'),
        ],
        answer: t('15', 'উত্তর 15'),
      },
      tryIt: {
        question: t('Find x if 8 : 12 = x : 18.', '8 : 12 = x : 18 হলে x-এর মান কত?'),
        options: [t('27', '27'), t('12', '12'), t('8', '8'), t('16', '16')],
        correct: 1,
        explanation: [
          t(r`Product of extremes $=$ product of means: $8 \times 18 = 12x$.`, r`প্রান্তীয় পদের গুণফল $=$ মধ্যপদের গুণফল: $8 \times 18 = 12x$।`),
          t(r`$144 = 12x$, so $x = 12$. Check: $8 : 12 = 2 : 3$ and $12 : 18 = 2 : 3$.`, r`$144 = 12x$, তাই $x = 12$। মিলিয়ে দেখো: $8 : 12 = 2 : 3$ এবং $12 : 18 = 2 : 3$।`),
          t('27 comes from applying the factor the wrong way round (18 × 12 ÷ 8).', '27 আসে গুণকটি উল্টোদিকে লাগালে (18 × 12 ÷ 8)।'),
        ],
      },
    },

    // 7 ─────────────────────────────────────────────
    {
      key: 'coins_value_ratio',
      emoji: '🪙',
      name: t('Coins and notes in a ratio: count versus value', 'অনুপাতে মুদ্রা ও নোট: সংখ্যা বনাম মূল্য'),
      difficulty: 'beginner',
      typicalWording: t('“A bag has ₹1, 50 paise and 25 paise coins in the ratio a : b : c. The total value is ₹N. How many coins of each kind?”', '“একটি থলিতে ₹1, 50 পয়সা ও 25 পয়সার মুদ্রা a : b : c অনুপাতে আছে। মোট মূল্য ₹N। প্রত্যেক ধরনের মুদ্রা কটি করে?”'),
      formula: t(r`Value of one set $= \sum (\text{ratio term} \times \text{coin value})$; number of sets $=$ total value $\div$ value of one set.`, r`এক সেটের মূল্য $= \sum (\text{অনুপাতের পদ} \times \text{মুদ্রার মূল্য})$; সেটের সংখ্যা $=$ মোট মূল্য $\div$ এক সেটের মূল্য।`),
      shortcut: t('Work out the value of one "set" (one lot of the ratio counts) once, divide the total by it, then multiply the counts — this is the direct method, and it is already the fastest.', 'এক "সেট"-এর (অনুপাতের সংখ্যা অনুযায়ী এক গোছা) মূল্য একবার বের করো, মোটকে তা দিয়ে ভাগ করো, তারপর সংখ্যাগুলো গুণ করো — এটাই সরাসরি পদ্ধতি, আর এটাই সবচেয়ে দ্রুত।'),
      trap: t('The ratio is usually of the NUMBER of coins, not of their values — a 25 paise coin counts as 0.25 rupees when you total the value.', 'অনুপাত সাধারণত মুদ্রার সংখ্যার হয়, তাদের মূল্যের নয় — মোট মূল্য হিসাবের সময় 25 পয়সার মুদ্রা 0.25 টাকা ধরতে হয়।'),
      spot: t(
        'Coins or notes of **different denominations** are mixed, their counts are in a ratio, and the **total value** (or total count) is given.',
        '**বিভিন্ন মূল্যের** মুদ্রা বা নোট মেশানো আছে, তাদের সংখ্যা একটি অনুপাতে, আর **মোট মূল্য** (বা মোট সংখ্যা) দেওয়া থাকে।',
      ),
      method: [
        t('Decide whether the ratio is of counts or of values — the wording "number of coins" means counts.', 'অনুপাতটি সংখ্যার নাকি মূল্যের তা ঠিক করো — "মুদ্রার সংখ্যা" লেখা থাকলে তা সংখ্যার অনুপাত।'),
        t('Value of one set = each ratio term × its denomination, added up (in rupees).', 'এক সেটের মূল্য = প্রতিটি অনুপাতের পদ × তার মূল্য, যোগ করে (টাকায়)।'),
        t('Number of sets = total value ÷ value of one set.', 'সেটের সংখ্যা = মোট মূল্য ÷ এক সেটের মূল্য।'),
        t('Each count = its ratio term × number of sets.', 'প্রতিটি সংখ্যা = তার অনুপাতের পদ × সেটের সংখ্যা।'),
      ],
      example: {
        question: t('A bag contains ₹1, 50 paise and 25 paise coins in the ratio 2 : 3 : 4. If the total value is ₹90, how many 50 paise coins are there?', 'একটি থলিতে ₹1, 50 পয়সা ও 25 পয়সার মুদ্রা 2 : 3 : 4 অনুপাতে আছে। মোট মূল্য ₹90 হলে 50 পয়সার মুদ্রা কটি আছে?'),
        steps: [
          t(r`Value of one set $= 2 \times 1 + 3 \times 0.50 + 4 \times 0.25 = 2 + 1.50 + 1 = ₹4.50$.`, r`এক সেটের মূল্য $= 2 \times 1 + 3 \times 0.50 + 4 \times 0.25 = 2 + 1.50 + 1 = ₹4.50$।`),
          t(r`Number of sets $= 90 \div 4.50 = 20$.`, r`সেটের সংখ্যা $= 90 \div 4.50 = 20$।`),
          t(r`50 paise coins $= 3 \times 20 = 60$. (The bag has 40 one-rupee and 80 twenty-five paise coins.)`, r`50 পয়সার মুদ্রা $= 3 \times 20 = 60$টি। (থলিতে ₹1-এর মুদ্রা 40টি ও 25 পয়সার মুদ্রা 80টি আছে।)`),
        ],
        answer: t('60 coins', '60টি মুদ্রা'),
      },
      tryIt: {
        question: t('A cash box has ₹5, ₹2 and ₹1 notes in the ratio 5 : 3 : 2 (by number). If the total value is ₹132, how many ₹2 notes are there?', 'একটি ক্যাশ বাক্সে ₹5, ₹2 ও ₹1-এর নোট সংখ্যার অনুপাতে 5 : 3 : 2 আছে। মোট মূল্য ₹132 হলে ₹2-এর নোট কটি আছে?'),
        options: [t('20', '20'), t('8', '8'), t('12', '12'), t('4', '4')],
        correct: 2,
        explanation: [
          t(r`Value of one set $= 5 \times 5 + 3 \times 2 + 2 \times 1 = 25 + 6 + 2 = ₹33$.`, r`এক সেটের মূল্য $= 5 \times 5 + 3 \times 2 + 2 \times 1 = 25 + 6 + 2 = ₹33$।`),
          t(r`Number of sets $= 132 \div 33 = 4$, so ₹2 notes $= 3 \times 4 = 12$.`, r`সেটের সংখ্যা $= 132 \div 33 = 4$, তাই ₹2-এর নোট $= 3 \times 4 = 12$টি।`),
          t('20 is the number of ₹5 notes, and 4 is only the number of sets.', '20 হল ₹5-এর নোটের সংখ্যা, আর 4 শুধু সেটের সংখ্যা।'),
        ],
      },
    },

    // 8 ─────────────────────────────────────────────
    {
      key: 'ratio_from_percentages',
      emoji: '💯',
      name: t('Turn percentages into a ratio', 'শতকরা হার থেকে অনুপাত তৈরি'),
      difficulty: 'beginner',
      typicalWording: t('“A gets 45%, B gets 35% and C gets 20% of an amount. Find the ratio of their shares.”', '“A পায় 45%, B পায় 35% এবং C পায় 20%। তাদের ভাগের অনুপাত নির্ণয় করো।”'),
      formula: t(r`Shares are in the ratio of the percentages themselves: $p_1 : p_2 : p_3$, then divide every term by the HCF.`, r`ভাগগুলি শতকরা হারগুলির অনুপাতেই থাকে: $p_1 : p_2 : p_3$, তারপর প্রতিটি পদকে গ.সা.গু. দিয়ে ভাগ করো।`),
      shortcut: t('When all percentages are of the SAME total, skip the total entirely — write the percentages as the ratio and cancel the common factor.', 'সব শতকরা একই মোটের অংশ হলে মোটটাই বাদ দাও — শতকরাগুলোকেই অনুপাত হিসেবে লিখে সাধারণ গুণনীয়ক কেটে দাও।'),
      trap: t('Percentages of different totals (e.g. marks out of different maximums) cannot be compared directly — first convert each to the same base.', 'ভিন্ন মোটের শতকরা (যেমন আলাদা পূর্ণমানের নম্বর) সরাসরি তুলনা করা যায় না — আগে প্রতিটিকে একই ভিত্তিতে আনো।'),
      spot: t(
        'Quantities are described as **percentages of the same total** (shares, marks out of the same maximum, votes) and a ratio is asked.',
        'রাশিগুলি **একই মোটের শতকরা** হিসেবে দেওয়া থাকে (ভাগ, একই পূর্ণমানের নম্বর, ভোট) আর অনুপাত জানতে চায়।',
      ),
      method: [
        t('Check that every percentage is taken of the same total.', 'দেখো প্রতিটি শতকরা একই মোটের উপর নেওয়া হয়েছে কিনা।'),
        t('Write the percentages side by side as a ratio.', 'শতকরাগুলো পাশাপাশি লিখে অনুপাত তৈরি করো।'),
        t('Divide all terms by their HCF to get the simplest form.', 'সব পদকে গ.সা.গু. দিয়ে ভাগ করে সরলতম আকারে আনো।'),
      ],
      example: {
        question: t('A sum is shared so that A gets 45%, B gets 35% and C gets 20%. Find the ratio of their shares.', 'একটি টাকা এমনভাবে ভাগ করা হল যাতে A পায় 45%, B পায় 35% এবং C পায় 20%। তাদের ভাগের অনুপাত নির্ণয় করো।'),
        steps: [
          t('All three percentages are of the same sum, so the shares are in the ratio 45 : 35 : 20.', 'তিনটি শতকরাই একই টাকার, তাই ভাগের অনুপাত 45 : 35 : 20।'),
          t('HCF of 45, 35 and 20 is 5. Divide each term by 5.', '45, 35 ও 20-এর গ.সা.গু. 5। প্রতিটি পদকে 5 দিয়ে ভাগ করো।'),
          t('45 : 35 : 20 = 9 : 7 : 4.', 'তাই 45 : 35 : 20 = 9 : 7 : 4।'),
        ],
        answer: t('9 : 7 : 4', 'ভাগের অনুপাত 9 : 7 : 4'),
      },
      tryIt: {
        question: t('In a test out of the same total marks, Ravi scored 80%, Sana scored 60% and Tom scored 40%. What is the ratio of their marks?', 'একই পূর্ণমানের একটি পরীক্ষায় রবি পেয়েছে 80%, সানা 60% এবং টম 40%। তাদের নম্বরের অনুপাত কত?'),
        options: [t('8 : 6 : 4', '8 : 6 : 4'), t('4 : 3 : 2', '4 : 3 : 2'), t('2 : 3 : 4', '2 : 3 : 4'), t('80 : 60 : 40', '80 : 60 : 40')],
        correct: 1,
        explanation: [
          t('The marks are in the ratio 80 : 60 : 40, since all are percentages of the same total.', 'সব নম্বর একই মোটের শতকরা, তাই অনুপাত 80 : 60 : 40।'),
          t('Divide every term by 20: 80 : 60 : 40 = 4 : 3 : 2.', 'প্রতিটি পদকে 20 দিয়ে ভাগ করো: 80 : 60 : 40 = 4 : 3 : 2।'),
          t('8 : 6 : 4 is the same ratio but not in its simplest form.', '8 : 6 : 4 একই অনুপাত, কিন্তু সরলতম আকারে নয়।'),
        ],
      },
    },

    // 9 ─────────────────────────────────────────────
    {
      key: 'mean_proportional',
      emoji: '⚖️',
      name: t('Mean proportional between two numbers', 'দুটি সংখ্যার মধ্যসমানুপাতী'),
      difficulty: 'intermediate',
      typicalWording: t('“Find the mean proportional between a and b” or “a, x, b are in continued proportion.”', '“a ও b-এর মধ্যসমানুপাতী নির্ণয় করো” বা “a, x, b ক্রমাগত সমানুপাতে আছে।”'),
      formula: t(r`Mean proportional $x$ of $a$ and $b$: $a : x = x : b$, so $x = \sqrt{ab}$.`, r`$a$ ও $b$-এর মধ্যসমানুপাতী $x$: $a : x = x : b$, তাই $x = \sqrt{ab}$।`),
      shortcut: t('If both numbers are perfect squares times a common factor (4 = 4×1, 25 = 25×1), take square roots term-wise: √4 × √25 = 2 × 5 = 10.', 'দুটি সংখ্যাই পূর্ণবর্গ হলে পদ ধরে বর্গমূল নাও: √4 × √25 = 2 × 5 = 10 — গুণফল বের করার দরকার পড়ে না।'),
      trap: t('It is NOT the ordinary average (a + b)/2: for 4 and 25 the average is 14.5 but the mean proportional is 10.', 'এটি সাধারণ গড় (a + b)/2 নয়: 4 ও 25-এর গড় 14.5, কিন্তু মধ্যসমানুপাতী 10।'),
      spot: t(
        'Only **two numbers** are given and the single value sitting between them in continued proportion (a : x = x : b) is asked.',
        'শুধু **দুটি সংখ্যা** দেওয়া থাকে, আর ক্রমাগত সমানুপাতে (a : x = x : b) তাদের মাঝে বসা একটিমাত্র মান জানতে চায়।',
      ),
      method: [
        t('Set up a : x = x : b, with x repeated in the middle.', 'a : x = x : b সাজাও, যেখানে x মাঝখানে দুবার আসে।'),
        t('Cross-multiply: x² = a × b.', 'আড়গুণ করো: x² = a × b।'),
        t('Take the positive square root: x = √(ab).', 'ধনাত্মক বর্গমূল নাও: x = √(ab)।'),
      ],
      example: {
        question: t('Find the mean proportional between 4 and 25.', '4 ও 25-এর মধ্যসমানুপাতী নির্ণয় করো।'),
        steps: [
          t(r`Let it be $x$: $4 : x = x : 25$, so $x^2 = 4 \times 25 = 100$.`, r`ধরো তা $x$: $4 : x = x : 25$, তাই $x^2 = 4 \times 25 = 100$।`),
          t(r`$x = \sqrt{100} = 10$.`, r`তাই $x = \sqrt{100} = 10$।`),
          t('Check: 4 : 10 = 2 : 5 and 10 : 25 = 2 : 5.', 'মিলিয়ে দেখো: 4 : 10 = 2 : 5 এবং 10 : 25 = 2 : 5।'),
        ],
        answer: t('10', 'মধ্যসমানুপাতী 10'),
      },
      tryIt: {
        question: t('What is the mean proportional between 8 and 32?', '8 ও 32-এর মধ্যসমানুপাতী কত?'),
        options: [t('20', '20'), t('256', '256'), t('12', '12'), t('16', '16')],
        correct: 3,
        explanation: [
          t(r`$x = \sqrt{8 \times 32} = \sqrt{256}$.`, r`মধ্যসমানুপাতী $x = \sqrt{8 \times 32} = \sqrt{256}$।`),
          t(r`$\sqrt{256} = 16$. Check: $8 : 16 = 1 : 2$ and $16 : 32 = 1 : 2$.`, r`$\sqrt{256} = 16$। মিলিয়ে দেখো: $8 : 16 = 1 : 2$ এবং $16 : 32 = 1 : 2$।`),
          t('20 is the ordinary average of 8 and 32, and 256 forgets the square root.', '20 হল 8 ও 32-এর সাধারণ গড়, আর 256 হল বর্গমূল নিতে ভুলে যাওয়া।'),
        ],
      },
    },

    // 10 ─────────────────────────────────────────────
    {
      key: 'add_remove_change_ratio',
      emoji: '🎚️',
      name: t('What to add to (or remove from) both terms of a ratio', 'অনুপাতের দুটি পদে কত যোগ (বা বিয়োগ) করলে নতুন অনুপাত হবে'),
      difficulty: 'intermediate',
      typicalWording: t('“What number should be added to both terms of 7 : 11 to make it 3 : 4?”', '“7 : 11-এর দুটি পদের সঙ্গে কত যোগ করলে অনুপাতটি 3 : 4 হবে?”'),
      formula: t(r`For target $\frac{c}{d}$: $\frac{a + x}{b + x} = \frac{c}{d}$, giving $x = \frac{bc - ad}{d - c}$ (use $-x$ for subtraction).`, r`লক্ষ্য $\frac{c}{d}$ হলে: $\frac{a + x}{b + x} = \frac{c}{d}$, যেখান থেকে $x = \frac{bc - ad}{d - c}$ (বিয়োগের ক্ষেত্রে $-x$ নাও)।`),
      shortcut: t('Cross-multiply once and collect x on one side — the equation is always linear, so x comes out in two lines without any guessing.', 'একবার আড়গুণ করে x-কে একদিকে জমা করো — সমীকরণ সবসময় সরলরৈখিক, তাই অনুমান ছাড়াই দুই লাইনে x বেরিয়ে আসে।'),
      trap: t('The same x goes into BOTH terms (numerator and denominator). Adding it only to the smaller term, or adding different numbers, breaks the pattern.', 'একই x দুটি পদেই (লব ও হর) বসে। শুধু ছোট পদে যোগ করলে, বা আলাদা সংখ্যা যোগ করলে, নিয়ম ভেঙে যায়।'),
      spot: t(
        'A **single ratio** a : b is given (not two unknown numbers), and the question asks what must be added to or subtracted from **both its terms** to turn it into a target ratio.',
        'একটি **একক অনুপাত** a : b দেওয়া থাকে (দুটি অজানা সংখ্যা নয়), আর জানতে চায় তার **দুটি পদের** সঙ্গে কত যোগ বা বিয়োগ করলে লক্ষ্য অনুপাত পাওয়া যাবে।',
      ),
      method: [
        t('Let the number to add be x and write (a + x) : (b + x) = c : d.', 'যোগ করতে হবে এমন সংখ্যাটি x ধরে (a + x) : (b + x) = c : d লেখো।'),
        t('Cross-multiply to get a linear equation in x.', 'আড়গুণ করে x-এর সরল সমীকরণ তৈরি করো।'),
        t('Solve for x and verify by substituting it back into both terms.', 'x বের করে দুটি পদে বসিয়ে মিলিয়ে দেখো।'),
      ],
      example: {
        question: t('What number should be added to both terms of the ratio 7 : 11 to make it 3 : 4?', '7 : 11 অনুপাতের দুটি পদের সঙ্গে কত যোগ করলে তা 3 : 4 হবে?'),
        steps: [
          t(r`Let the number be $x$: $\frac{7 + x}{11 + x} = \frac{3}{4}$.`, r`ধরো সংখ্যাটি $x$: $\frac{7 + x}{11 + x} = \frac{3}{4}$।`),
          t(r`Cross-multiply: $28 + 4x = 33 + 3x$, so $x = 5$.`, r`আড়গুণ করে: $28 + 4x = 33 + 3x$, তাই $x = 5$।`),
          t('Check: (7 + 5) : (11 + 5) = 12 : 16 = 3 : 4.', 'মিলিয়ে দেখো: (7 + 5) : (11 + 5) = 12 : 16 = 3 : 4।'),
        ],
        answer: t('5', 'যোগ করতে হবে 5'),
      },
      tryIt: {
        question: t('What number should be subtracted from both terms of the ratio 15 : 19 to make it 3 : 4?', '15 : 19 অনুপাতের দুটি পদ থেকে কত বিয়োগ করলে তা 3 : 4 হবে?'),
        options: [t('3', '3'), t('5', '5'), t('2', '2'), t('7', '7')],
        correct: 0,
        explanation: [
          t(r`$\frac{15 - x}{19 - x} = \frac{3}{4}$, so cross-multiply: $60 - 4x = 57 - 3x$.`, r`$\frac{15 - x}{19 - x} = \frac{3}{4}$, আড়গুণ করে: $60 - 4x = 57 - 3x$।`),
          t(r`$60 - 57 = 4x - 3x$, so $x = 3$.`, r`$60 - 57 = 4x - 3x$, তাই $x = 3$।`),
          t('Check: (15 − 3) : (19 − 3) = 12 : 16 = 3 : 4.', 'মিলিয়ে দেখো: (15 − 3) : (19 − 3) = 12 : 16 = 3 : 4।'),
        ],
      },
    },

    // 11 ─────────────────────────────────────────────
    {
      key: 'variation_direct_inverse',
      emoji: '🔄',
      name: t('Direct and inverse variation', 'সরল ও ব্যস্ত ভেদ'),
      difficulty: 'intermediate',
      typicalWording: t('“x varies directly as y; when y = 4, x = 12. Find x when y = 7” or “8 men finish a job in 15 days; how long for 10 men?”', '“x, y-এর সঙ্গে সরল ভেদে আছে; y = 4 হলে x = 12। y = 7 হলে x কত?” বা “8 জন লোক একটি কাজ 15 দিনে করে; 10 জন লোকের কত দিন লাগবে?”'),
      formula: t(r`Direct: $\frac{x_1}{y_1} = \frac{x_2}{y_2}$. Inverse: $x_1 y_1 = x_2 y_2$.`, r`সরল ভেদ: $\frac{x_1}{y_1} = \frac{x_2}{y_2}$। ব্যস্ত ভেদ: $x_1 y_1 = x_2 y_2$।`),
      shortcut: t('Find the unit rate in direct variation (value per 1 unit) and multiply; in inverse variation keep the total product (men × days) fixed and divide.', 'সরল ভেদে একক হার (1 এককের মান) বের করে গুণ করো; ব্যস্ত ভেদে মোট গুণফল (লোক × দিন) স্থির রেখে ভাগ করো।'),
      trap: t('Decide the type first: more men means FEWER days (inverse). Using the direct formula there doubles the error instead of halving the time.', 'আগে ভেদের ধরন ঠিক করো: লোক বেশি মানে দিন কম (ব্যস্ত)। সেখানে সরল সূত্র লাগালে সময় অর্ধেক হওয়ার বদলে ভুল দ্বিগুণ হয়।'),
      spot: t(
        'One quantity changes **with** another: either both grow together (price with weight) or one grows while the other shrinks (workers versus days for the same job). One pair of values is given, a second value of one quantity is given, and its partner is asked.',
        'একটি রাশি অন্যটির সঙ্গে বদলায়: হয় দুটোই একসঙ্গে বাড়ে (ওজনের সঙ্গে দাম), নয় একটি বাড়লে অন্যটি কমে (একই কাজে শ্রমিক বনাম দিন)। একজোড়া মান দেওয়া থাকে, একটি রাশির দ্বিতীয় মান দেওয়া থাকে, তার সঙ্গীটি জানতে চায়।',
      ),
      method: [
        t('Decide: do the two quantities grow together (direct) or in opposite directions (inverse)?', 'ঠিক করো: রাশি দুটি একই দিকে বাড়ে (সরল), নাকি বিপরীত দিকে (ব্যস্ত)?'),
        t('Direct: keep x/y the same for both pairs. Inverse: keep x × y the same for both pairs.', 'সরল হলে দুই জোড়াতেই x/y একই রাখো। ব্যস্ত হলে দুই জোড়াতেই x × y একই রাখো।'),
        t('Solve for the unknown and sanity-check the direction of change.', 'অজানাটি বের করে পরিবর্তনের দিকটা যুক্তি দিয়ে মিলিয়ে দেখো।'),
      ],
      example: {
        question: t('If 4 kg of rice costs ₹180, what will 7 kg cost, the price varying directly with weight?', '4 কেজি চালের দাম ₹180 হলে, দাম ওজনের সঙ্গে সরল ভেদে থাকলে, 7 কেজি চালের দাম কত হবে?'),
        steps: [
          t(r`Price per kg $= 180 \div 4 = ₹45$.`, r`প্রতি কেজির দাম $= 180 \div 4 = ₹45$।`),
          t(r`Direct variation: $\frac{x}{7} = \frac{180}{4}$.`, r`সরল ভেদ: $\frac{x}{7} = \frac{180}{4}$।`),
          t(r`$x = 45 \times 7 = ₹315$.`, r`তাই $x = 45 \times 7 = ₹315$।`),
        ],
        answer: t('₹315', 'মোট দাম ₹315'),
      },
      tryIt: {
        question: t('8 workers can finish a job in 15 days. How many days will 10 workers take to finish the same job?', '8 জন শ্রমিক একটি কাজ 15 দিনে শেষ করতে পারে। 10 জন শ্রমিক একই কাজ কত দিনে শেষ করবে?'),
        options: [t('18.75', '18.75'), t('12', '12'), t('17', '17'), t('20', '20')],
        correct: 1,
        explanation: [
          t('More workers means fewer days, so this is inverse variation: total worker-days stay fixed.', 'শ্রমিক বেশি মানে দিন কম, তাই এটি ব্যস্ত ভেদ: মোট শ্রমিক-দিন স্থির থাকে।'),
          t(r`$8 \times 15 = 10 \times D$, so $120 = 10D$ and $D = 12$ days.`, r`$8 \times 15 = 10 \times D$, তাই $120 = 10D$ এবং $D = 12$ দিন।`),
          t('18.75 comes from wrongly using direct variation (15 × 10 ÷ 8).', '18.75 আসে ভুল করে সরল ভেদ ব্যবহার করলে (15 × 10 ÷ 8)।'),
        ],
      },
    },

    // 12 ─────────────────────────────────────────────
    {
      key: 'percent_increase_terms',
      emoji: '📈',
      name: t('Ratio after each term rises by a different percentage', 'প্রতিটি পদ আলাদা শতকরায় বাড়লে নতুন অনুপাত'),
      difficulty: 'advanced',
      typicalWording: t('“A : B = 3 : 4. A is increased by 20% and B by 25%. Find the new ratio.”', '“A : B = 3 : 4। A বাড়ানো হল 20% এবং B 25%। নতুন অনুপাত নির্ণয় করো।”'),
      formula: t(r`New term $=$ old term $\times (1 + \frac{p}{100})$; apply each term's own percentage, then simplify.`, r`নতুন পদ $=$ পুরনো পদ $\times (1 + \frac{p}{100})$; প্রতিটি পদে তার নিজের শতকরা লাগিয়ে তারপর সরল করো।`),
      shortcut: t('Use multiplier fractions instead of decimals: +20% means × 6/5 and +25% means × 5/4, so 3 × 6/5 : 4 × 5/4 = 18/5 : 5 = 18 : 25 with no decimal work.', 'দশমিকের বদলে গুণকের ভগ্নাংশ ব্যবহার করো: +20% মানে × 6/5, +25% মানে × 5/4, তাই 3 × 6/5 : 4 × 5/4 = 18/5 : 5 = 18 : 25 — দশমিকের হিসাবই লাগে না।'),
      trap: t('Do NOT add the percentages to the ratio (3 + 20 : 4 + 25) and do NOT apply one common percentage to both terms — each term grows by its own rate.', 'শতকরা হার অনুপাতে যোগ করবে না (3 + 20 : 4 + 25), আর দুটি পদে একই শতকরাও লাগাবে না — প্রতিটি পদ তার নিজের হারে বাড়ে।'),
      spot: t(
        'A ratio is given, then **each term is increased (or decreased) by its own different percentage**, and the new ratio is asked.',
        'একটি অনুপাত দেওয়া থাকে, তারপর **প্রতিটি পদকে তার নিজের আলাদা শতকরা হারে বাড়ানো (বা কমানো) হয়**, আর নতুন অনুপাত জানতে চায়।',
      ),
      method: [
        t('Write each term with its own multiplier: term × (1 + p/100) for an increase, term × (1 − p/100) for a decrease.', 'প্রতিটি পদকে তার নিজের গুণক দিয়ে লেখো: বৃদ্ধির জন্য পদ × (1 + p/100), হ্রাসের জন্য পদ × (1 − p/100)।'),
        t('Compute both new terms (fractions or decimals are fine).', 'দুটি নতুন পদই হিসাব করো (ভগ্নাংশ বা দশমিক, যেকোনোটি চলবে)।'),
        t('Write the new ratio and divide both terms by their HCF (clearing decimals first if needed).', 'নতুন অনুপাত লিখে দুটি পদকে গ.সা.গু. দিয়ে ভাগ করো (দরকার হলে আগে দশমিক সরাও)।'),
      ],
      example: {
        question: t('A : B = 3 : 4. If A is increased by 20% and B is increased by 25%, find the new ratio A : B.', 'A : B = 3 : 4। A-কে 20% এবং B-কে 25% বাড়ানো হলে নতুন অনুপাত A : B নির্ণয় করো।'),
        steps: [
          t(r`New A $= 3 \times 1.20 = 3.6$. New B $= 4 \times 1.25 = 5$.`, r`নতুন A $= 3 \times 1.20 = 3.6$। নতুন B $= 4 \times 1.25 = 5$।`),
          t('New ratio = 3.6 : 5. Multiply both terms by 10: 36 : 50.', 'নতুন অনুপাত = 3.6 : 5। দুটি পদকে 10 দিয়ে গুণ করো: 36 : 50।'),
          t('Divide both terms by 2: 36 : 50 = 18 : 25.', 'দুটি পদকে 2 দিয়ে ভাগ করো: 36 : 50 = 18 : 25।'),
        ],
        answer: t('18 : 25', 'নতুন অনুপাত 18 : 25'),
      },
      tryIt: {
        question: t('P : Q = 2 : 5. If P is increased by 50% and Q is increased by 20%, what is the new ratio P : Q?', 'P : Q = 2 : 5। P-কে 50% এবং Q-কে 20% বাড়ানো হলে নতুন অনুপাত P : Q কত?'),
        options: [t('3 : 5', '3 : 5'), t('52 : 25', '52 : 25'), t('1 : 2', '1 : 2'), t('2 : 3', '2 : 3')],
        correct: 2,
        explanation: [
          t(r`New P $= 2 \times 1.50 = 3$. New Q $= 5 \times 1.20 = 6$.`, r`নতুন P $= 2 \times 1.50 = 3$। নতুন Q $= 5 \times 1.20 = 6$।`),
          t('New ratio = 3 : 6 = 1 : 2 after dividing both terms by 3.', 'নতুন অনুপাত = 3 : 6, দুটি পদকে 3 দিয়ে ভাগ করলে 1 : 2।'),
          t('52 : 25 comes from adding the percentages to the terms instead of multiplying.', '52 : 25 আসে গুণের বদলে শতকরা হার পদগুলোর সঙ্গে যোগ করলে।'),
        ],
      },
    },

    // 13 ─────────────────────────────────────────────
    {
      key: 'vessels_mixture_ratio',
      emoji: '🥛',
      name: t('Mixing two vessels: resulting ratio of the liquids', 'দুটি পাত্র মেশানো: তরলগুলির ফলাফল অনুপাত'),
      difficulty: 'advanced',
      typicalWording: t('“Vessel A has milk and water in the ratio 3 : 1, vessel B in the ratio 5 : 3. Equal quantities are mixed. Find the ratio of milk to water in the mixture.”', '“A পাত্রে দুধ ও জল 3 : 1 অনুপাতে, B পাত্রে 5 : 3 অনুপাতে আছে। সমান পরিমাণ মেশানো হল। মিশ্রণে দুধ ও জলের অনুপাত নির্ণয় করো।”'),
      formula: t(r`For equal volumes $V$: milk $= V\left(\frac{a}{a+b} + \frac{c}{c+d}\right)$, water $= V\left(\frac{b}{a+b} + \frac{d}{c+d}\right)$.`, r`সমান আয়তন $V$ হলে: দুধ $= V\left(\frac{a}{a+b} + \frac{c}{c+d}\right)$, জল $= V\left(\frac{b}{a+b} + \frac{d}{c+d}\right)$।`),
      shortcut: t('Take the mixed volume as the LCM-friendly common amount (e.g. 8 litres from each vessel when the part-sums are 4 and 8) so every liquid amount comes out a whole number.', 'মেশানোর পরিমাণ এমন একটি সুবিধাজনক সংখ্যা ধরো (যেমন অংশ-যোগ 4 ও 8 হলে প্রতিটি পাত্র থেকে 8 লিটার) যাতে প্রতিটি তরলের পরিমাণ পূর্ণসংখ্যা হয়।'),
      trap: t('Never average or add the two ratios directly (3 : 1 and 5 : 3 do not mix into 8 : 4): the liquids must be totalled separately, and unequal volumes must be weighted.', 'দুটি অনুপাত সরাসরি গড় বা যোগ করবে না (3 : 1 ও 5 : 3 মিশে 8 : 4 হয় না): তরলগুলিকে আলাদাভাবে যোগ করতে হয়, আর আয়তন অসমান হলে ওজন দিতে হয়।'),
      spot: t(
        'Two vessels (or mixtures) each hold two liquids in a **different given ratio**; some amount from each is **poured together** and the ratio in the final mixture is asked.',
        'দুটি পাত্রে (বা মিশ্রণে) দুটি তরল **আলাদা আলাদা অনুপাতে** থাকে; প্রতিটি থেকে কিছু পরিমাণ **একসঙ্গে ঢালা** হয়, আর চূড়ান্ত মিশ্রণে অনুপাত জানতে চায়।',
      ),
      method: [
        t('Fix the amount taken from each vessel (equal amounts: pick a convenient volume, often the LCM of the part-sums).', 'প্রতিটি পাত্র থেকে নেওয়া পরিমাণ ঠিক করো (সমান পরিমাণ হলে সুবিধাজনক একটি আয়তন নাও, প্রায়ই অংশ-যোগগুলির ল.সা.গু.)।'),
        t('From each vessel, split its volume by its own ratio into liquid 1 and liquid 2.', 'প্রতিটি পাত্রের আয়তনকে তার নিজের অনুপাতে তরল 1 ও তরল 2-তে ভাগ করো।'),
        t('Add all the liquid 1 amounts together and all the liquid 2 amounts together.', 'তরল 1-এর সব পরিমাণ যোগ করো, তেমনি তরল 2-এর সব পরিমাণ যোগ করো।'),
        t('Write the two totals as a ratio and simplify.', 'দুটি মোটকে অনুপাতে লিখে সরল করো।'),
      ],
      example: {
        question: t('Vessel A contains milk and water in the ratio 3 : 1 and vessel B contains them in the ratio 5 : 3. If 8 litres are taken from each vessel and mixed, find the ratio of milk to water in the mixture.', 'A পাত্রে দুধ ও জল 3 : 1 অনুপাতে এবং B পাত্রে 5 : 3 অনুপাতে আছে। প্রতিটি পাত্র থেকে 8 লিটার করে নিয়ে মেশানো হলে মিশ্রণে দুধ ও জলের অনুপাত নির্ণয় করো।'),
        steps: [
          t('From A (8 litres, ratio 3 : 1): milk = 6 litres, water = 2 litres.', 'A থেকে (8 লিটার, অনুপাত 3 : 1): দুধ = 6 লিটার, জল = 2 লিটার।'),
          t('From B (8 litres, ratio 5 : 3): milk = 5 litres, water = 3 litres.', 'B থেকে (8 লিটার, অনুপাত 5 : 3): দুধ = 5 লিটার, জল = 3 লিটার।'),
          t('Total milk = 6 + 5 = 11 litres; total water = 2 + 3 = 5 litres.', 'মোট দুধ = 6 + 5 = 11 লিটার; মোট জল = 2 + 3 = 5 লিটার।'),
          t('Ratio of milk to water = 11 : 5.', 'দুধ ও জলের অনুপাত = 11 : 5।'),
        ],
        answer: t('11 : 5', 'দুধ : জল = 11 : 5'),
      },
      tryIt: {
        question: t('Vessel A has milk and water in the ratio 2 : 1 and vessel B in the ratio 3 : 2. If 30 litres are taken from each and mixed, what is the ratio of milk to water in the mixture?', 'A পাত্রে দুধ ও জল 2 : 1 অনুপাতে এবং B পাত্রে 3 : 2 অনুপাতে আছে। প্রতিটি থেকে 30 লিটার করে নিয়ে মেশানো হলে মিশ্রণে দুধ ও জলের অনুপাত কত?'),
        options: [t('5 : 3', '5 : 3'), t('19 : 11', '19 : 11'), t('38 : 22', '38 : 22'), t('3 : 2', '3 : 2')],
        correct: 1,
        explanation: [
          t('From A (30 litres, ratio 2 : 1): milk = 20 litres, water = 10 litres. From B (30 litres, ratio 3 : 2): milk = 18 litres, water = 12 litres.', 'A থেকে (30 লিটার, অনুপাত 2 : 1): দুধ = 20 লিটার, জল = 10 লিটার। B থেকে (30 লিটার, অনুপাত 3 : 2): দুধ = 18 লিটার, জল = 12 লিটার।'),
          t('Total milk = 20 + 18 = 38 litres; total water = 10 + 12 = 22 litres.', 'মোট দুধ = 20 + 18 = 38 লিটার; মোট জল = 10 + 12 = 22 লিটার।'),
          t('38 : 22 simplifies to 19 : 11 (divide by 2). 38 : 22 itself is the unsimplified form.', '38 : 22-কে 2 দিয়ে ভাগ করলে সরল আকার 19 : 11 হয়। 38 : 22 নিজে অসরলিত আকার।'),
        ],
      },
    },

    // 14 ─────────────────────────────────────────────
    {
      key: 'transfer_ratio',
      emoji: '🔀',
      name: t('Transfer between two people to equalise (or reach a target ratio)', 'দুজনের মধ্যে স্থানান্তর করে সমান করা (বা লক্ষ্য অনুপাতে পৌঁছানো)'),
      difficulty: 'advanced',
      typicalWording: t('“A and B have money in the ratio 7 : 5. How much should A give B so that both have equal amounts?”', '“A ও B-এর কাছে টাকা 7 : 5 অনুপাতে আছে। A, B-কে কত টাকা দিলে দুজনের টাকা সমান হবে?”'),
      formula: t(r`To equalise: transfer $= \frac{\text{larger share} - \text{smaller share}}{2}$; the total never changes.`, r`সমান করতে: স্থানান্তর $= \frac{\text{বড় ভাগ} - \text{ছোট ভাগ}}{2}$; মোট কখনো বদলায় না।`),
      shortcut: t('For equalising, just halve the difference of the two shares — one subtraction and one halving, no equation needed. For a target ratio, re-split the unchanged total in the target ratio and compare.', 'সমান করার জন্য দুটি ভাগের পার্থক্যকে অর্ধেক করলেই হয় — এক বিয়োগ, এক অর্ধেক, সমীকরণ লাগে না। লক্ষ্য অনুপাতের জন্য অপরিবর্তিত মোটকে লক্ষ্য অনুপাতে আবার ভাগ করে তুলনা করো।'),
      trap: t('Transferring the FULL difference overshoots: every rupee given lowers the giver and raises the receiver, so the gap closes by ₹2 for each ₹1 moved.', 'পুরো পার্থক্যটা দিয়ে দিলে বেশি হয়ে যায়: প্রতি ₹1 দিলে দাতা কমে আর গ্রহীতা বাড়ে, তাই ফারাক প্রতি ₹1-তে ₹2 করে কমে।'),
      spot: t(
        'Two people hold amounts in a ratio; one **gives some amount to the other** (the total stays the same) and after the transfer the amounts become equal, or reach a stated new ratio.',
        'দুজনের কাছে অনুপাতে পরিমাণ আছে; একজন **অন্যজনকে কিছু পরিমাণ দেয়** (মোট একই থাকে), আর স্থানান্তরের পর পরিমাণ দুটি সমান হয়, বা একটি নির্দিষ্ট নতুন অনুপাতে পৌঁছায়।',
      ),
      method: [
        t('Find both actual shares from the ratio and the total (value of 1 part).', 'অনুপাত ও মোট থেকে দুজনের প্রকৃত ভাগ বের করো (1 ভাগের মান দিয়ে)।'),
        t('Note the total is unchanged by the transfer. For equal shares, each must end with total ÷ 2.', 'মনে রাখো, স্থানান্তরে মোট বদলায় না। সমান ভাগের জন্য প্রত্যেকের শেষে থাকবে মোট ÷ 2।'),
        t('Transfer = larger share − (total ÷ 2), which is half the difference of the shares.', 'স্থানান্তর = বড় ভাগ − (মোট ÷ 2), অর্থাৎ ভাগ দুটির পার্থক্যের অর্ধেক।'),
        t('Check by moving the amount: giver minus transfer, receiver plus transfer.', 'পরিমাণ সরিয়ে মিলিয়ে দেখো: দাতা বিয়োগ স্থানান্তর, গ্রহীতা যোগ স্থানান্তর।'),
      ],
      example: {
        question: t('A and B have money in the ratio 7 : 5 and together they have ₹2400. How much should A give to B so that both have equal amounts?', 'A ও B-এর কাছে টাকা 7 : 5 অনুপাতে আছে এবং দুজনের মোট ₹2400। A, B-কে কত টাকা দিলে দুজনের টাকা সমান হবে?'),
        steps: [
          t('Total parts = 7 + 5 = 12, so 1 part = 2400 ÷ 12 = ₹200. A has ₹1400 and B has ₹1000.', 'মোট ভাগ = 7 + 5 = 12, তাই 1 ভাগ = 2400 ÷ 12 = ₹200। A-এর আছে ₹1400, B-এর ₹1000।'),
          t('Equal shares would be 2400 ÷ 2 = ₹1200 each.', 'সমান ভাগ হলে প্রত্যেকে পাবে 2400 ÷ 2 = ₹1200।'),
          t('A must give 1400 − 1200 = ₹200. Check: A is left with ₹1200 and B rises to ₹1200.', 'A-কে দিতে হবে 1400 − 1200 = ₹200। মিলিয়ে দেখো: A-এর থাকে ₹1200, B-এর বেড়ে হয় ₹1200।'),
        ],
        answer: t('₹200', 'দিতে হবে ₹200'),
      },
      tryIt: {
        question: t('P and Q have stamps in the ratio 9 : 7 and together they have 3200 stamps. How many stamps should P give to Q so that both have equal numbers?', 'P ও Q-এর কাছে ডাকটিকিট 9 : 7 অনুপাতে আছে এবং দুজনের মোট 3200টি ডাকটিকিট আছে। P, Q-কে কটি ডাকটিকিট দিলে দুজনের সংখ্যা সমান হবে?'),
        options: [t('400', '400'), t('100', '100'), t('200', '200'), t('1600', '1600')],
        correct: 2,
        explanation: [
          t('Total parts = 16, so 1 part = 3200 ÷ 16 = 200. P has 1800 stamps and Q has 1400.', 'মোট ভাগ = 16, তাই 1 ভাগ = 3200 ÷ 16 = 200। P-এর আছে 1800টি, Q-এর 1400টি।'),
          t('Equal shares are 3200 ÷ 2 = 1600 each, so P gives 1800 − 1600 = 200 stamps.', 'সমান ভাগ প্রত্যেকের 3200 ÷ 2 = 1600টি, তাই P দেয় 1800 − 1600 = 200টি।'),
          t('400 is the full difference of the shares — giving that much would overshoot and swap who has more.', '400 হল ভাগ দুটির পুরো পার্থক্য — ততটা দিলে বেশি হয়ে গিয়ে কে বেশি পেল তা উল্টে যাবে।'),
        ],
      },
    },
  ],
  // Hard-bank pattern matrix (Advanced quizzes): see ./hard/ratio_proportion.js.
  registry: require('./hard/ratio_proportion'),
};
