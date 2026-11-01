'use strict';

// Question patterns: Simple & Compound Interest. Format: see ../validate.js.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'interest',
  patterns: [
    // 1 ─────────────────────────────────────────────
    {
      key: 'find_simple_interest',
      emoji: '💰',
      name: t('Find simple interest', 'সরল সুদ নির্ণয়'),
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“Find the simple interest on Rs. P at R% per annum for T years.”', '“T বছরের জন্য বার্ষিক R% হারে P টাকার সরল সুদ নির্ণয় করো।”'),
      formula: t(r`$SI = \dfrac{P \times R \times T}{100}$ and $A = P + SI$.`, r`$SI = \dfrac{P \times R \times T}{100}$ এবং $A = P + SI$।`),
      shortcut: t('Find one year\'s interest first (R% of P), then multiply by T — at simple interest every year earns the same.', 'প্রথমে এক বছরের সুদ বের করো (P-এর R%), তারপর T দিয়ে গুণ করো — সরল সুদে প্রতি বছর একই সুদ হয়।'),
      trap: t('Do not report the amount when only the interest is asked, and convert months into years before using the formula.', 'শুধু সুদ চাইলে সুদ-আসল বলবে না, আর সূত্র ব্যবহারের আগে মাসকে বছরে বদলে নাও।'),
      spot: t(
        'Principal, rate and time are given, and the question asks for the **simple interest** (or the amount).',
        'আসল, সুদের হার আর সময় দেওয়া থাকে, জানতে চাওয়া হয় **সরল সুদ** (বা সুদ-আসল) কত।',
      ),
      method: [
        t(r`Use $SI = \dfrac{P \times R \times T}{100}$.`, r`সূত্র: $SI = \dfrac{P \times R \times T}{100}$।`),
        t(r`If the amount is asked, add: $A = P + SI$.`, r`সুদ-আসল চাইলে যোগ করো: $A = P + SI$।`),
        t('Keep time in years (6 months $= \\frac{1}{2}$ year).', 'সময় বছরে রাখো (6 মাস $= \\frac{1}{2}$ বছর)।'),
      ],
      example: {
        question: t('Find the simple interest on ₹$5000$ at $8\\%$ per annum for $3$ years.', '₹$5000$-এর বার্ষিক $8\\%$ হারে $3$ বছরের সরল সুদ কত?'),
        steps: [
          t(r`$SI = \dfrac{5000 \times 8 \times 3}{100}$.`, r`এখানে $SI = \dfrac{5000 \times 8 \times 3}{100}$।`),
          t(r`Cancel the zeros: $= 50 \times 8 \times 3$.`, r`শূন্য কাটলে: $= 50 \times 8 \times 3$।`),
          t(r`$= 50 \times 24 = 1200$.`, r`অর্থাৎ $= 50 \times 24 = 1200$।`),
        ],
        answer: t('Simple interest $=$ ₹$1200$', 'সরল সুদ $=$ ₹$1200$'),
      },
      tryIt: {
        question: t('Find the simple interest on ₹$4500$ at $6\\%$ per annum for $4$ years.', '₹$4500$-এর বার্ষিক $6\\%$ হারে $4$ বছরের সরল সুদ কত?'),
        options: [t('₹108', '₹108'), t('₹270', '₹270'), t('₹1080', '₹1080'), t('₹5580', '₹5580')],
        correct: 2,
        explanation: [
          t(r`$SI = \dfrac{4500 \times 6 \times 4}{100} = 45 \times 24 = 1080$.`, r`এখানে $SI = \dfrac{4500 \times 6 \times 4}{100} = 45 \times 24 = 1080$।`),
          t('₹$270$ is just one year, and ₹$5580$ is the amount, not the interest.', '₹$270$ শুধু এক বছরের সুদ, আর ₹$5580$ হল সুদ-আসল, সুদ নয়।'),
        ],
      },
    },
    // 2 ─────────────────────────────────────────────
    {
      key: 'sum_becomes_n_times_si',
      emoji: '✖️',
      name: t('Sum becomes $n$ times at simple interest', 'সরল সুদে টাকা $n$ গুণ হওয়া'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“A sum doubles / becomes 3 times itself in T years. Find the rate (or the time).”', '“কোনো টাকা T বছরে দ্বিগুণ / 3 গুণ হয়। হার (বা সময়) নির্ণয় করো।”'),
      formula: t(r`If a sum becomes $n$ times, $R \times T = (n - 1) \times 100$.`, r`কোনো টাকা $n$ গুণ হলে $R \times T = (n - 1) \times 100$।`),
      shortcut: t('Put P = 100, so the interest needed is $(n-1) \times 100$; then divide by the given T or R.', 'P = 100 ধরো, তাহলে দরকারি সুদ $(n-1) \times 100$; তারপর দেওয়া T বা R দিয়ে ভাগ করো।'),
      trap: t('Becoming $n$ times means the interest is $(n-1)P$, not $nP$ — doubling needs interest equal to P only.', '$n$ গুণ হওয়া মানে সুদ $(n-1)P$, $nP$ নয় — দ্বিগুণ হতে সুদ শুধু P-এর সমান হলেই চলে।'),
      spot: t(
        'Words like "a sum **doubles**", "becomes **3 times**" or "**4 times** itself" at simple interest, with the rate or time asked.',
        'সরল সুদে "টাকা **দ্বিগুণ** হয়", "**3 গুণ** হয়", "**4 গুণ** হয়" এমন কথা থাকে, আর হার বা সময় জানতে চাওয়া হয়।',
      ),
      method: [
        t('Take principal $= 100$ (any value works).', 'আসল $= 100$ ধরো (যেকোনো মান চলে)।'),
        t(r`If it becomes $n$ times, interest $= (n - 1) \times P$. (Doubling means interest $= P$.)`, r`$n$ গুণ হলে সুদ $= (n - 1) \times P$। (দ্বিগুণ মানে সুদ $= P$।)`),
        t(r`Then $R \times T = (n - 1) \times 100$. Divide to get the missing one.`, r`তাহলে $R \times T = (n - 1) \times 100$। ভাগ করে অজানাটি বের করো।`),
      ],
      example: {
        question: t('At what rate of simple interest will a sum become $3$ times itself in $20$ years?', 'বার্ষিক কত সরল সুদের হারে কোনো টাকা $20$ বছরে $3$ গুণ হবে?'),
        steps: [
          t('Let $P = 100$. Amount $= 300$, so interest $= 200$.', 'ধরো $P = 100$। সুদ-আসল $= 300$, তাই সুদ $= 200$।'),
          t(r`$200 = \dfrac{100 \times R \times 20}{100}$, so $20R = 200$.`, r`$200 = \dfrac{100 \times R \times 20}{100}$, তাই $20R = 200$।`),
          t('$R = 10\\%$.', 'সুতরাং $R = 10\\%$।'),
        ],
        answer: t('Rate $= 10\\%$ per annum', 'সুদের হার বার্ষিক $10\\%$'),
      },
      tryIt: {
        question: t('At what rate of simple interest will a sum become $4$ times itself in $15$ years?', 'বার্ষিক কত সরল সুদের হারে কোনো টাকা $15$ বছরে $4$ গুণ হবে?'),
        options: [t(r`$13\frac{1}{3}\%$`, r`$13\frac{1}{3}\%$`), t('$20\\%$', '$20\\%$'), t('$25\\%$', '$25\\%$'), t(r`$26\frac{2}{3}\%$`, r`$26\frac{2}{3}\%$`)],
        correct: 1,
        explanation: [
          t('Let $P = 100$. Amount $= 400$, so interest $= 300$ (not $400$).', 'ধরো $P = 100$। সুদ-আসল $= 400$, তাই সুদ $= 300$ ($400$ নয়)।'),
          t(r`$R = \dfrac{300}{15} = 20\%$.`, r`সুতরাং $R = \dfrac{300}{15} = 20\%$।`),
        ],
      },
    },
    // 3 ─────────────────────────────────────────────
    {
      key: 'ci_two_years',
      emoji: '📈',
      name: t('Compound interest for 2 years', '2 বছরের চক্রবৃদ্ধি সুদ'),
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“Find the compound interest on Rs. P at R% per annum for 2 years, compounded annually.”', '“বার্ষিক চক্রবৃদ্ধি হারে 2 বছরের জন্য বার্ষিক R% হারে P টাকার চক্রবৃদ্ধি সুদ নির্ণয় করো।”'),
      formula: t(r`$A = P\left(1 + \dfrac{R}{100}\right)^T$ and $CI = A - P$.`, r`$A = P\left(1 + \dfrac{R}{100}\right)^T$ এবং $CI = A - P$।`),
      shortcut: t(r`Use the effective 2-year rate $2R + \dfrac{R^2}{100}$ on P directly: at $10\%$ that is $21\%$ of P.`, r`সরাসরি P-এর ওপর 2 বছরের কার্যকর হার $2R + \dfrac{R^2}{100}$ ব্যবহার করো: $10\%$ হারে তা P-এর $21\%$।`),
      trap: t('The second year\'s interest is on the new amount, not on the original principal — that extra bit is exactly what makes CI bigger than SI.', 'দ্বিতীয় বছরের সুদ নতুন সুদ-আসলের ওপর হয়, মূল আসলের ওপর নয় — এই বাড়তি অংশটাই CI-কে SI-এর চেয়ে বড় করে।'),
      spot: t(
        'The words **compound interest** or "compounded annually", usually for $2$ or $3$ years.',
        '**চক্রবৃদ্ধি সুদ** বা "বার্ষিক চক্রবৃদ্ধি হারে" কথাটা থাকে, সাধারণত $2$ বা $3$ বছরের জন্য।',
      ),
      method: [
        t(r`Amount $A = P\left(1 + \dfrac{R}{100}\right)^T$.`, r`সুদ-আসল $A = P\left(1 + \dfrac{R}{100}\right)^T$।`),
        t(r`Compound interest $CI = A - P$.`, r`চক্রবৃদ্ধি সুদ $CI = A - P$।`),
        t('Shortcut for 2 years: add the interest of each year, where year 2 also earns interest on year 1\'s interest.', '2 বছরের সহজ পথ: প্রতি বছরের সুদ যোগ করো, দ্বিতীয় বছরে প্রথম বছরের সুদের ওপরও সুদ হয়।'),
      ],
      example: {
        question: t('Find the compound interest on ₹$10000$ at $10\\%$ per annum for $2$ years.', '₹$10000$-এর বার্ষিক $10\\%$ হারে $2$ বছরের চক্রবৃদ্ধি সুদ কত?'),
        steps: [
          t('Year 1 interest: $10\\%$ of $10000 = 1000$. New amount $= 11000$.', 'প্রথম বছরের সুদ: $10000$-এর $10\\% = 1000$। নতুন সুদ-আসল $= 11000$।'),
          t('Year 2 interest: $10\\%$ of $11000 = 1100$. Amount $= 12100$.', 'দ্বিতীয় বছরের সুদ: $11000$-এর $10\\% = 1100$। সুদ-আসল $= 12100$।'),
          t('$CI = 12100 - 10000 = 2100$.', 'তাই $CI = 12100 - 10000 = 2100$।'),
        ],
        answer: t('Compound interest $=$ ₹$2100$', 'চক্রবৃদ্ধি সুদ $=$ ₹$2100$'),
      },
      tryIt: {
        question: t('Find the compound interest on ₹$8000$ at $5\\%$ per annum for $2$ years.', '₹$8000$-এর বার্ষিক $5\\%$ হারে $2$ বছরের চক্রবৃদ্ধি সুদ কত?'),
        options: [t('₹800', '₹800'), t('₹820', '₹820'), t('₹840', '₹840'), t('₹8820', '₹8820')],
        correct: 1,
        explanation: [
          t('Year 1: $5\\%$ of $8000 = 400$, amount $= 8400$.', 'প্রথম বছর: $8000$-এর $5\\% = 400$, সুদ-আসল $= 8400$।'),
          t('Year 2: $5\\%$ of $8400 = 420$, amount $= 8820$.', 'দ্বিতীয় বছর: $8400$-এর $5\\% = 420$, সুদ-আসল $= 8820$।'),
          t('$CI = 8820 - 8000 = 820$. (₹$800$ is the simple interest.)', '$CI = 8820 - 8000 = 820$। (₹$800$ হল সরল সুদ।)'),
        ],
      },
    },
    // 4 ─────────────────────────────────────────────
    {
      key: 'ci_si_difference',
      emoji: '🔍',
      name: t('Difference between CI and SI for 2 years', '2 বছরে চক্রবৃদ্ধি ও সরল সুদের পার্থক্য'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“The difference between CI and SI on Rs. P for 2 years at R% is Rs. D. Find D (or P).”', '“R% হারে 2 বছরে P টাকার CI ও SI-এর পার্থক্য D টাকা। D (বা P) নির্ণয় করো।”'),
      formula: t(r`For 2 years: $CI - SI = P\left(\dfrac{R}{100}\right)^2$.`, r`2 বছরের জন্য: $CI - SI = P\left(\dfrac{R}{100}\right)^2$।`),
      shortcut: t('The difference is just the interest on the first year\'s interest, so write R% as a fraction and apply it twice to P.', 'পার্থক্য হল শুধু প্রথম বছরের সুদের ওপর সুদ, তাই R%-কে ভগ্নাংশে লিখে P-এর ওপর দুবার প্রয়োগ করো।'),
      trap: t(r`This $P(R/100)^2$ shortcut works only for 2 years; for 3 years the difference has an extra factor.`, r`এই $P(R/100)^2$ সহজ পথ শুধু 2 বছরের জন্য; 3 বছরে পার্থক্যে বাড়তি গুণনীয়ক থাকে।`),
      spot: t(
        'The question talks about the **difference** between compound and simple interest for $2$ years, and asks for the difference or the principal.',
        'প্রশ্নে $2$ বছরের চক্রবৃদ্ধি ও সরল সুদের **পার্থক্য** নিয়ে কথা থাকে, আর পার্থক্য বা আসল জানতে চাওয়া হয়।',
      ),
      method: [
        t(r`For 2 years: $CI - SI = P\left(\dfrac{R}{100}\right)^2$.`, r`2 বছরের জন্য: $CI - SI = P\left(\dfrac{R}{100}\right)^2$।`),
        t(r`If the difference is given, $P = \text{difference} \times \left(\dfrac{100}{R}\right)^2$.`, r`পার্থক্য দেওয়া থাকলে $P = \text{পার্থক্য} \times \left(\dfrac{100}{R}\right)^2$।`),
        t('First confirm the time is exactly 2 years — this direct formula does not hold for any other period.', 'আগে নিশ্চিত হও সময় ঠিক 2 বছর — এই সরাসরি সূত্র অন্য মেয়াদে খাটে না।'),
      ],
      example: {
        question: t('Find the difference between compound and simple interest on ₹$5000$ at $4\\%$ per annum for $2$ years.', '₹$5000$-এর বার্ষিক $4\\%$ হারে $2$ বছরের চক্রবৃদ্ধি সুদ ও সরল সুদের পার্থক্য কত?'),
        steps: [
          t(r`Difference $= 5000 \times \left(\dfrac{4}{100}\right)^2 = 5000 \times \dfrac{16}{10000}$.`, r`পার্থক্য $= 5000 \times \left(\dfrac{4}{100}\right)^2 = 5000 \times \dfrac{16}{10000}$।`),
          t(r`Cancel: $= \dfrac{5000 \times 16}{10000} = \dfrac{16}{2}$.`, r`কাটাকুটি করে: $= \dfrac{5000 \times 16}{10000} = \dfrac{16}{2}$।`),
          t(r`$= \dfrac{16}{2} = 8$.`, r`অর্থাৎ $= \dfrac{16}{2} = 8$।`),
        ],
        answer: t('Difference $=$ ₹$8$', 'পার্থক্য $=$ ₹$8$'),
      },
      tryIt: {
        question: t('The difference between compound and simple interest on a sum for $2$ years at $4\\%$ per annum is ₹$48$. Find the sum.', 'কোনো টাকার বার্ষিক $4\\%$ হারে $2$ বছরের চক্রবৃদ্ধি সুদ ও সরল সুদের পার্থক্য ₹$48$। আসল কত?'),
        options: [t('₹1200', '₹1200'), t('₹12000', '₹12000'), t('₹30000', '₹30000'), t('₹60000', '₹60000')],
        correct: 2,
        explanation: [
          t(r`$P = 48 \times \left(\dfrac{100}{4}\right)^2 = 48 \times 25^2$.`, r`এখানে $P = 48 \times \left(\dfrac{100}{4}\right)^2 = 48 \times 25^2$।`),
          t(r`$= 48 \times 625 = 30000$. (Using $25$ instead of $25^2$ gives ₹$1200$.)`, r`$= 48 \times 625 = 30000$। ($25^2$-এর বদলে $25$ নিলে ₹$1200$ আসে।)`),
        ],
      },
    },
    // 5 ─────────────────────────────────────────────
    {
      key: 'ci_rate_from_amount',
      emoji: '🎯',
      name: t('Rate from amount at compound interest', 'চক্রবৃদ্ধি সুদ-আসল থেকে হার নির্ণয়'),
      difficulty: 'intermediate',
      typicalWording: t('“A sum amounts to Rs. A in 2 years at compound interest. Find the rate.”', '“চক্রবৃদ্ধি সুদে কোনো টাকা 2 বছরে A টাকা হয়। হার নির্ণয় করো।”'),
      formula: t(r`$\dfrac{A}{P} = \left(1 + \dfrac{R}{100}\right)^T$.`, r`সূত্র: $\dfrac{A}{P} = \left(1 + \dfrac{R}{100}\right)^T$।`),
      shortcut: t('Reduce A/P to lowest terms and recognise it as a perfect square (for 2 years) or cube (for 3 years); the root gives $1 + R/100$ at once.', 'A/P-কে লঘিষ্ঠ আকারে এনে দেখো তা কোন সংখ্যার বর্গ (2 বছরে) বা ঘন (3 বছরে); মূলটিই একবারে $1 + R/100$ দেয়।'),
      trap: t('Do not use the simple interest formula on the total gain — at CI the growth is multiplied each year, not added.', 'মোট লাভের ওপর সরল সুদের সূত্র লাগাবে না — CI-তে বৃদ্ধি প্রতি বছর গুণ হয়, যোগ হয় না।'),
      spot: t(
        'A sum **amounts to** a given value in $2$ or $3$ years at compound interest, and the **rate** is asked.',
        'চক্রবৃদ্ধি সুদে কোনো টাকা $2$ বা $3$ বছরে নির্দিষ্ট সুদ-আসলে **পরিণত হয়**, আর **হার** জানতে চাওয়া হয়।',
      ),
      method: [
        t(r`Write $\dfrac{A}{P} = \left(1 + \dfrac{R}{100}\right)^T$ and simplify the fraction.`, r`লেখো $\dfrac{A}{P} = \left(1 + \dfrac{R}{100}\right)^T$, তারপর ভগ্নাংশটি সরল করো।`),
        t('Spot the square (or cube) on both top and bottom, for example $\\frac{121}{100} = \\left(\\frac{11}{10}\\right)^2$.', 'লব আর হর দুটোই কোন সংখ্যার বর্গ (বা ঘন) তা চিনে নাও, যেমন $\\frac{121}{100} = \\left(\\frac{11}{10}\\right)^2$।'),
        t('Then $1 + \\frac{R}{100}$ equals that root; solve for $R$.', 'তাহলে $1 + \\frac{R}{100}$ হবে সেই মূল; এখান থেকে $R$ বের করো।'),
      ],
      example: {
        question: t('₹$10000$ amounts to ₹$12100$ in $2$ years at compound interest. Find the rate.', 'চক্রবৃদ্ধি সুদে ₹$10000$ টাকা $2$ বছরে ₹$12100$ হয়। সুদের হার কত?'),
        steps: [
          t(r`$\dfrac{12100}{10000} = \dfrac{121}{100} = \left(\dfrac{11}{10}\right)^2$.`, r`এখানে $\dfrac{12100}{10000} = \dfrac{121}{100} = \left(\dfrac{11}{10}\right)^2$।`),
          t(r`So $1 + \dfrac{R}{100} = \dfrac{11}{10}$, which means $\dfrac{R}{100} = \dfrac{1}{10}$.`, r`তাই $1 + \dfrac{R}{100} = \dfrac{11}{10}$, অর্থাৎ $\dfrac{R}{100} = \dfrac{1}{10}$।`),
          t('$R = 10\\%$.', 'সুতরাং $R = 10\\%$।'),
        ],
        answer: t('Rate $= 10\\%$ per annum', 'সুদের হার বার্ষিক $10\\%$'),
      },
      tryIt: {
        question: t('₹$6250$ amounts to ₹$7290$ in $2$ years at compound interest. Find the rate.', 'চক্রবৃদ্ধি সুদে ₹$6250$ টাকা $2$ বছরে ₹$7290$ হয়। সুদের হার কত?'),
        options: [t('$4\\%$', '$4\\%$'), t('$8\\%$', '$8\\%$'), t('$8.32\\%$', '$8.32\\%$'), t('$16.64\\%$', '$16.64\\%$')],
        correct: 1,
        explanation: [
          t(r`$\dfrac{7290}{6250} = \dfrac{729}{625} = \left(\dfrac{27}{25}\right)^2$.`, r`এখানে $\dfrac{7290}{6250} = \dfrac{729}{625} = \left(\dfrac{27}{25}\right)^2$।`),
          t(r`$1 + \dfrac{R}{100} = \dfrac{27}{25}$, so $\dfrac{R}{100} = \dfrac{2}{25}$ and $R = 8\%$.`, r`$1 + \dfrac{R}{100} = \dfrac{27}{25}$, তাই $\dfrac{R}{100} = \dfrac{2}{25}$ এবং $R = 8\%$।`),
          t('($8.32\\%$ is what you get by wrongly using the simple interest formula.)', '(ভুল করে সরল সুদের সূত্র লাগালে $8.32\\%$ আসে।)'),
        ],
      },
    },
    // 6 ─────────────────────────────────────────────
    {
      key: 'si_reverse_find',
      emoji: '🔄',
      name: t('Reverse simple interest: find P, R or T', 'উল্টো সরল সুদ: P, R বা T নির্ণয়'),
      difficulty: 'beginner',
      typicalWording: t('“The simple interest on a sum for T years at R% is Rs. I. Find the sum (rate / time).”', '“R% হারে T বছরে কোনো টাকার সরল সুদ I টাকা। আসল (হার / সময়) নির্ণয় করো।”'),
      formula: t(r`$P = \dfrac{SI \times 100}{R \times T}$, $R = \dfrac{SI \times 100}{P \times T}$, $T = \dfrac{SI \times 100}{P \times R}$.`, r`উল্টো সূত্রগুলো: $P = \dfrac{SI \times 100}{R \times T}$, $R = \dfrac{SI \times 100}{P \times T}$, $T = \dfrac{SI \times 100}{P \times R}$।`),
      shortcut: t('Rearrange $SI = PRT/100$ once: the missing value is $SI \times 100$ divided by the product of the other two.', '$SI = PRT/100$ একবার সাজিয়ে নাও: অজানা মানটি হল $SI \times 100$ ভাগ অন্য দুটির গুণফল।'),
      trap: t('If the amount is given instead of the interest, first take $SI = A - P$; using A in place of SI inflates every answer.', 'সুদের বদলে সুদ-আসল দেওয়া থাকলে আগে $SI = A - P$ নাও; SI-এর জায়গায় A বসালে সব উত্তর বড় হয়ে যাবে।'),
      spot: t(
        'The **interest** (and two of P, R, T) is given, and the missing third value — principal, rate or time — is asked.',
        '**সুদ** (এবং P, R, T-এর মধ্যে দুটি) দেওয়া থাকে, আর বাকি তৃতীয় মানটি — আসল, হার বা সময় — জানতে চাওয়া হয়।',
      ),
      method: [
        t(r`Start from $SI = \dfrac{P \times R \times T}{100}$.`, r`শুরু করো $SI = \dfrac{P \times R \times T}{100}$ থেকে।`),
        t('Put the unknown alone on one side: unknown $= \\dfrac{SI \\times 100}{\\text{product of the other two}}$.', 'অজানাটিকে এক দিকে একা রাখো: অজানা $= \\dfrac{SI \\times 100}{\\text{বাকি দুটির গুণফল}}$।'),
        t('Substitute the given numbers and simplify.', 'দেওয়া সংখ্যাগুলো বসিয়ে সরল করো।'),
      ],
      example: {
        question: t('The simple interest on a sum at $6\\%$ per annum for $3$ years is ₹$720$. Find the sum.', 'বার্ষিক $6\\%$ হারে $3$ বছরে কোনো টাকার সরল সুদ ₹$720$। আসল কত?'),
        steps: [
          t(r`$P = \dfrac{SI \times 100}{R \times T} = \dfrac{720 \times 100}{6 \times 3}$.`, r`এখানে $P = \dfrac{SI \times 100}{R \times T} = \dfrac{720 \times 100}{6 \times 3}$।`),
          t(r`Denominator: $6 \times 3 = 18$.`, r`হর: $6 \times 3 = 18$।`),
          t(r`$P = \dfrac{72000}{18} = 4000$.`, r`তাই $P = \dfrac{72000}{18} = 4000$।`),
        ],
        answer: t('Principal $=$ ₹$4000$', 'আসল $=$ ₹$4000$'),
      },
      tryIt: {
        question: t('The simple interest on ₹$6000$ for $3$ years is ₹$900$. Find the rate per annum.', '₹$6000$-এর $3$ বছরের সরল সুদ ₹$900$। বার্ষিক সুদের হার কত?'),
        options: [t('$3\\%$', '$3\\%$'), t('$5\\%$', '$5\\%$'), t('$6\\%$', '$6\\%$'), t('$15\\%$', '$15\\%$')],
        correct: 1,
        explanation: [
          t(r`$R = \dfrac{SI \times 100}{P \times T} = \dfrac{900 \times 100}{6000 \times 3}$.`, r`এখানে $R = \dfrac{SI \times 100}{P \times T} = \dfrac{900 \times 100}{6000 \times 3}$।`),
          t(r`$= \dfrac{90000}{18000} = 5\%$. ($15\%$ comes from forgetting to divide by the 3 years.)`, r`$= \dfrac{90000}{18000} = 5\%$। (3 বছর দিয়ে ভাগ ভুলে গেলে $15\%$ আসে।)`),
        ],
      },
    },
    // 7 ─────────────────────────────────────────────
    {
      key: 'si_two_amounts',
      emoji: '📊',
      name: t('Principal and rate from two amounts (SI)', 'দুটি সুদ-আসল থেকে আসল ও হার (সরল সুদ)'),
      difficulty: 'intermediate',
      typicalWording: t('“A sum amounts to Rs. A1 in t1 years and Rs. A2 in t2 years at simple interest. Find the sum and the rate.”', '“সরল সুদে কোনো টাকা t1 বছরে A1 টাকা এবং t2 বছরে A2 টাকা হয়। আসল ও হার নির্ণয় করো।”'),
      formula: t(r`One year's interest $= \dfrac{A_2 - A_1}{t_2 - t_1}$; then $P = A_1 - (\text{yearly interest}) \times t_1$.`, r`এক বছরের সুদ $= \dfrac{A_2 - A_1}{t_2 - t_1}$; তারপর $P = A_1 - (\text{বার্ষিক সুদ}) \times t_1$।`),
      shortcut: t('Subtract the two amounts first — the principal cancels and only the extra years of interest remain.', 'আগে দুটি সুদ-আসলের বিয়োগ করো — আসল কেটে যায়, শুধু বাড়তি বছরগুলোর সুদ থাকে।'),
      trap: t('The difference of the amounts is the interest for the gap years only, not for the full second period.', 'সুদ-আসল দুটির পার্থক্য শুধু মাঝের বছরগুলোর সুদ, পুরো দ্বিতীয় মেয়াদের সুদ নয়।'),
      spot: t(
        'The same sum is shown **amounting to two different values after two different times** at simple interest, and P (and usually R) is asked.',
        'একই টাকা সরল সুদে **দুটি ভিন্ন সময়ে দুটি ভিন্ন সুদ-আসলে** পরিণত হয়, আর P (সাধারণত R-ও) জানতে চাওয়া হয়।',
      ),
      method: [
        t('Subtract the amounts: the difference is the interest for the extra years between the two times.', 'সুদ-আসল দুটি বিয়োগ করো: পার্থক্যটি হল দুই সময়ের মাঝের বাড়তি বছরগুলোর সুদ।'),
        t('Divide by the gap in years to get one year\'s interest.', 'বছরের ব্যবধান দিয়ে ভাগ করে এক বছরের সুদ বের করো।'),
        t('Principal $=$ earlier amount $-$ (yearly interest $\\times$ earlier time).', 'আসল $=$ আগের সুদ-আসল $-$ (বার্ষিক সুদ $\\times$ আগের সময়)।'),
        t('Rate $=$ yearly interest $\\div P \\times 100$.', 'হার $=$ বার্ষিক সুদ $\\div P \\times 100$।'),
      ],
      example: {
        question: t('A sum amounts to ₹$920$ in $3$ years and to ₹$1000$ in $5$ years at simple interest. Find the sum and the rate.', 'সরল সুদে কোনো টাকা $3$ বছরে ₹$920$ এবং $5$ বছরে ₹$1000$ হয়। আসল ও সুদের হার নির্ণয় করো।'),
        steps: [
          t(r`Interest for $5 - 3 = 2$ years $= 1000 - 920 = 80$, so one year's interest $= 80 \div 2 = 40$.`, r`$5 - 3 = 2$ বছরের সুদ $= 1000 - 920 = 80$, তাই এক বছরের সুদ $= 80 \div 2 = 40$।`),
          t(r`Interest for 3 years $= 40 \times 3 = 120$, so $P = 920 - 120 = 800$.`, r`3 বছরের সুদ $= 40 \times 3 = 120$, তাই $P = 920 - 120 = 800$।`),
          t(r`Rate $= \dfrac{40}{800} \times 100 = 5\%$.`, r`হার $= \dfrac{40}{800} \times 100 = 5\%$।`),
        ],
        answer: t('Principal $=$ ₹$800$, rate $= 5\\%$ per annum', 'আসল $=$ ₹$800$, হার বার্ষিক $5\\%$'),
      },
      tryIt: {
        question: t('A sum amounts to ₹$1180$ in $3$ years and to ₹$1360$ in $6$ years at simple interest. Find the principal.', 'সরল সুদে কোনো টাকা $3$ বছরে ₹$1180$ এবং $6$ বছরে ₹$1360$ হয়। আসল নির্ণয় করো।'),
        options: [t('₹900', '₹900'), t('₹1000', '₹1000'), t('₹1060', '₹1060'), t('₹1120', '₹1120')],
        correct: 1,
        explanation: [
          t(r`Interest for $6 - 3 = 3$ years $= 1360 - 1180 = 180$, so one year's interest $= 60$.`, r`$6 - 3 = 3$ বছরের সুদ $= 1360 - 1180 = 180$, তাই এক বছরের সুদ $= 60$।`),
          t(r`Interest for 3 years $= 180$, so $P = 1180 - 180 = 1000$.`, r`3 বছরের সুদ $= 180$, তাই $P = 1180 - 180 = 1000$।`),
        ],
      },
    },
    // 8 ─────────────────────────────────────────────
    {
      key: 'ci_half_yearly_quarterly',
      emoji: '🗓',
      name: t('CI compounded half-yearly or quarterly', 'ষাণ্মাসিক বা ত্রৈমাসিক চক্রবৃদ্ধি সুদ'),
      difficulty: 'intermediate',
      typicalWording: t('“Find the compound interest on Rs. P at R% per annum for T years, compounded half-yearly (or quarterly).”', '“ষাণ্মাসিক (বা ত্রৈমাসিক) চক্রবৃদ্ধি হারে T বছরের জন্য বার্ষিক R% হারে P টাকার চক্রবৃদ্ধি সুদ নির্ণয় করো।”'),
      formula: t(r`Half-yearly: $A = P\left(1 + \dfrac{R/2}{100}\right)^{2T}$; quarterly: $A = P\left(1 + \dfrac{R/4}{100}\right)^{4T}$.`, r`ষাণ্মাসিক: $A = P\left(1 + \dfrac{R/2}{100}\right)^{2T}$; ত্রৈমাসিক: $A = P\left(1 + \dfrac{R/4}{100}\right)^{4T}$।`),
      shortcut: t('Convert first, calculate second: write down the rate per period and the number of periods before touching P.', 'আগে রূপান্তর, পরে হিসাব: P-তে হাত দেওয়ার আগে প্রতি পর্যায়ের হার ও পর্যায়ের সংখ্যা লিখে নাও।'),
      trap: t('Half-yearly means halve the rate AND double the periods — changing only one of the two is the classic error.', 'ষাণ্মাসিক মানে হার অর্ধেক এবং পর্যায় দ্বিগুণ — দুটির একটি মাত্র বদলানোই চিরাচরিত ভুল।'),
      spot: t(
        'The words **compounded half-yearly** or **compounded quarterly** appear, so the year is split into 2 or 4 compounding periods.',
        '**ষাণ্মাসিক চক্রবৃদ্ধি** বা **ত্রৈমাসিক চক্রবৃদ্ধি** কথাটা থাকে, তাই বছরটি 2 বা 4টি পর্যায়ে ভাগ হয়।',
      ),
      method: [
        t('Halve the rate and double the periods for half-yearly; quarter the rate and multiply periods by 4 for quarterly.', 'ষাণ্মাসিকে হার অর্ধেক ও পর্যায় দ্বিগুণ করো; ত্রৈমাসিকে হার এক-চতুর্থাংশ ও পর্যায় 4 গুণ করো।'),
        t(r`Use $A = P\left(1 + \dfrac{\text{rate per period}}{100}\right)^{\text{periods}}$.`, r`ব্যবহার করো $A = P\left(1 + \dfrac{\text{প্রতি পর্যায়ের হার}}{100}\right)^{\text{পর্যায়সংখ্যা}}$।`),
        t(r`Compound interest $CI = A - P$.`, r`চক্রবৃদ্ধি সুদ $CI = A - P$।`),
      ],
      example: {
        question: t('Find the compound interest on ₹$5000$ at $16\\%$ per annum for $6$ months, compounded quarterly.', 'ত্রৈমাসিক চক্রবৃদ্ধি হারে ₹$5000$-এর বার্ষিক $16\\%$ হারে $6$ মাসের চক্রবৃদ্ধি সুদ কত?'),
        steps: [
          t(r`Quarterly: rate per period $= 16 \div 4 = 4\%$, periods $= 2$.`, r`ত্রৈমাসিক: প্রতি পর্যায়ের হার $= 16 \div 4 = 4\%$, পর্যায় $= 2$টি।`),
          t(r`$A = 5000 \times \left(\dfrac{104}{100}\right)^2 = 5000 \times \dfrac{10816}{10000}$.`, r`এখানে $A = 5000 \times \left(\dfrac{104}{100}\right)^2 = 5000 \times \dfrac{10816}{10000}$।`),
          t(r`$A = 5408$, so $CI = 5408 - 5000 = 408$.`, r`তাই $A = 5408$, সুতরাং $CI = 5408 - 5000 = 408$।`),
        ],
        answer: t('Compound interest $=$ ₹$408$', 'চক্রবৃদ্ধি সুদ $=$ ₹$408$'),
      },
      tryIt: {
        question: t('Find the compound interest on ₹$16000$ at $10\\%$ per annum for $1$ year, compounded half-yearly.', 'ষাণ্মাসিক চক্রবৃদ্ধি হারে ₹$16000$-এর বার্ষিক $10\\%$ হারে $1$ বছরের চক্রবৃদ্ধি সুদ কত?'),
        options: [t('₹1600', '₹1600'), t('₹1640', '₹1640'), t('₹3200', '₹3200'), t('₹17640', '₹17640')],
        correct: 1,
        explanation: [
          t(r`Half-yearly: rate per period $= 5\%$, periods $= 2$. $A = 16000 \times (1.05)^2 = 16000 \times 1.1025 = 17640$.`, r`ষাণ্মাসিক: প্রতি পর্যায়ের হার $= 5\%$, পর্যায় $= 2$টি। $A = 16000 \times (1.05)^2 = 16000 \times 1.1025 = 17640$।`),
          t(r`$CI = 17640 - 16000 = 1640$. (₹$1600$ is the simple interest for the year.)`, r`তাই $CI = 17640 - 16000 = 1640$। (₹$1600$ হল ওই বছরের সরল সুদ।)`),
        ],
      },
    },
    // 9 ─────────────────────────────────────────────
    {
      key: 'ci_sum_becomes_times',
      emoji: '🚀',
      name: t('Sum becomes $n$ times at compound interest', 'চক্রবৃদ্ধি সুদে টাকা $n$ গুণ হওয়া'),
      difficulty: 'intermediate',
      typicalWording: t('“A sum doubles in T years at compound interest. In how many years will it become 8 times (16 times)?”', '“চক্রবৃদ্ধি সুদে কোনো টাকা T বছরে দ্বিগুণ হয়। কত বছরে তা 8 গুণ (16 গুণ) হবে?”'),
      formula: t(r`If a sum becomes $2$ times in $T$ years, it becomes $2^k$ times in $kT$ years.`, r`কোনো টাকা $T$ বছরে $2$ গুণ হলে $kT$ বছরে তা $2^k$ গুণ হয়।`),
      shortcut: t('Express the target multiple as a power of the given multiple: $8 = 2^3$ means 3 doubling periods.', 'লক্ষ্য গুণটিকে দেওয়া গুণের ঘাত হিসেবে লেখো: $8 = 2^3$ মানে 3টি দ্বিগুণ-হওয়ার মেয়াদ।'),
      trap: t('At CI the multiples multiply, they do not add: becoming 8 times does not take 4 times the doubling time under a simple proportion of the amount.', 'CI-তে গুণগুলো গুণ হয়, যোগ হয় না: 8 গুণ হতে দ্বিগুণ হওয়ার সময়ের সরল অনুপাতে হিসাব চলে না।'),
      spot: t(
        'A sum **doubles (or triples) in a given time** at compound interest, and the time to become a **higher multiple** of itself is asked.',
        'চক্রবৃদ্ধি সুদে কোনো টাকা **নির্দিষ্ট সময়ে দ্বিগুণ (বা তিনগুণ) হয়**, আর তার **আরও বড় গুণ** হতে কত সময় লাগবে তা জানতে চাওয়া হয়।',
      ),
      method: [
        t('Note the given multiple and its time, e.g. $2$ times in $T$ years.', 'দেওয়া গুণ ও তার সময় লিখে নাও, যেমন $T$ বছরে $2$ গুণ।'),
        t('Write the target multiple as a power of the given multiple, e.g. $8 = 2^3$.', 'লক্ষ্য গুণটিকে দেওয়া গুণের ঘাত হিসেবে লেখো, যেমন $8 = 2^3$।'),
        t('Multiply the given time by the power: time $=$ power $\\times T$.', 'দেওয়া সময়কে ঘাত দিয়ে গুণ করো: সময় $=$ ঘাত $\\times T$।'),
      ],
      example: {
        question: t('A sum doubles in $5$ years at compound interest. In how many years will it become $8$ times itself?', 'চক্রবৃদ্ধি সুদে কোনো টাকা $5$ বছরে দ্বিগুণ হয়। কত বছরে তা $8$ গুণ হবে?'),
        steps: [
          t(r`$8 = 2^3$, so the sum must double $3$ times in a row.`, r`এখানে $8 = 2^3$, তাই টাকাটিকে পরপর $3$ বার দ্বিগুণ হতে হবে।`),
          t(r`Each doubling takes $5$ years.`, r`প্রতিটি দ্বিগুণ হতে লাগে $5$ বছর।`),
          t(r`Total time $= 3 \times 5 = 15$ years.`, r`মোট সময় $= 3 \times 5 = 15$ বছর।`),
        ],
        answer: t('$15$ years', '$15$ বছর'),
      },
      tryIt: {
        question: t('A sum doubles in $6$ years at compound interest. In how many years will it become $16$ times itself?', 'চক্রবৃদ্ধি সুদে কোনো টাকা $6$ বছরে দ্বিগুণ হয়। কত বছরে তা $16$ গুণ হবে?'),
        options: [t('12 years', '12 বছর'), t('18 years', '18 বছর'), t('24 years', '24 বছর'), t('48 years', '48 বছর')],
        correct: 2,
        explanation: [
          t(r`$16 = 2^4$, so $4$ doublings are needed.`, r`এখানে $16 = 2^4$, তাই $4$ বার দ্বিগুণ হওয়া দরকার।`),
          t(r`Time $= 4 \times 6 = 24$ years. (48 years would be $2^8$ times, far too far.)`, r`সময় $= 4 \times 6 = 24$ বছর। (48 বছর হলে $2^8$ গুণ হয়ে যেত, অনেক বেশি।)`),
        ],
      },
    },
    // 10 ─────────────────────────────────────────────
    {
      key: 'si_split_sum',
      emoji: '✂️',
      name: t('Sum split and lent at two different rates (SI)', 'টাকা ভাগ করে দুটি ভিন্ন হারে খাটানো (সরল সুদ)'),
      difficulty: 'advanced',
      typicalWording: t('“A sum is lent partly at R1% and partly at R2%. The total interest in T years is Rs. I. Find each part.”', '“কোনো টাকার একাংশ R1% হারে ও বাকি অংশ R2% হারে খাটানো হয়। T বছরে মোট সুদ I টাকা। প্রতিটি অংশ নির্ণয় করো।”'),
      formula: t(r`If part $x$ is at $R_1\%$ and the rest at $R_2\%$: $\dfrac{x R_1 T}{100} + \dfrac{(S - x) R_2 T}{100} = I$.`, r`একাংশ $x$ যদি $R_1\%$ হারে ও বাকি অংশ $R_2\%$ হারে থাকে: $\dfrac{x R_1 T}{100} + \dfrac{(S - x) R_2 T}{100} = I$।`),
      shortcut: t('Pretend the whole sum is at the lower rate; the extra interest divided by the rate gap (times 100/T) gives the part at the higher rate.', 'পুরো টাকা কম হারে আছে ধরে নাও; বাড়তি সুদকে হারের পার্থক্য দিয়ে ভাগ (100/T গুণসহ) করলেই বেশি হারের অংশ পাওয়া যায়।'),
      trap: t('The part you solve for belongs to the rate you assigned to $x$ — check which part the question actually asks for before answering.', 'যে অংশের জন্য সমাধান করছ তা $x$-এর জন্য ধরা হারের অংশ — প্রশ্নে আসলে কোন অংশ চাওয়া হয়েছে দেখে উত্তর দাও।'),
      spot: t(
        'One sum is **split into two parts lent at two different rates**, and only the **combined interest** is given; a part (or both parts) is asked.',
        'একটি টাকা **ভাগ করে দুটি ভিন্ন হারে খাটানো** হয়, আর শুধু **মোট সুদ** দেওয়া থাকে; একটি অংশ (বা দুটি অংশই) জানতে চাওয়া হয়।',
      ),
      method: [
        t('Let one part be $x$; the other part is then $S - x$.', 'একটি অংশ $x$ ধরো; অন্য অংশটি হবে $S - x$।'),
        t('Write the total interest as the sum of the two simple interests and set it equal to the given interest.', 'মোট সুদকে দুটি সরল সুদের যোগফল হিসেবে লিখে দেওয়া সুদের সমান ধরো।'),
        t('Solve for $x$, then find the other part as $S - x$.', '$x$ বের করো, তারপর অন্য অংশ $S - x$ হিসেবে বের করো।'),
      ],
      example: {
        question: t('A sum of ₹$10000$ is lent partly at $6\\%$ and partly at $8\\%$ per annum. If the total interest in $1$ year is ₹$740$, find the part lent at $6\\%$.', '₹$10000$ টাকার একাংশ বার্ষিক $6\\%$ ও বাকি অংশ $8\\%$ হারে খাটানো হয়। $1$ বছরে মোট সুদ ₹$740$ হলে $6\\%$ হারে খাটানো অংশ কত?'),
        steps: [
          t(r`Let $x$ be lent at $6\%$: $\dfrac{6x}{100} + \dfrac{8(10000 - x)}{100} = 740$.`, r`ধরো $6\%$ হারে খাটানো অংশ $x$: $\dfrac{6x}{100} + \dfrac{8(10000 - x)}{100} = 740$।`),
          t(r`Multiply by 100: $6x + 80000 - 8x = 74000$, so $-2x = -6000$.`, r`100 দিয়ে গুণ করে: $6x + 80000 - 8x = 74000$, তাই $-2x = -6000$।`),
          t(r`$x = 3000$.`, r`সুতরাং $x = 3000$।`),
          t('So ₹$3000$ is at $6\\%$ (and the remaining ₹$7000$ is at $8\\%$).', 'তাই ₹$3000$ আছে $6\\%$ হারে (আর বাকি ₹$7000$ আছে $8\\%$ হারে)।'),
        ],
        answer: t('₹$3000$ at $6\\%$', '$6\\%$ হারে ₹$3000$'),
      },
      tryIt: {
        question: t('A sum of ₹$5000$ is lent partly at $5\\%$ and partly at $7\\%$ per annum. The total interest in $1$ year is ₹$310$. Find the part lent at $5\\%$.', '₹$5000$ টাকার একাংশ বার্ষিক $5\\%$ ও বাকি অংশ $7\\%$ হারে খাটানো হয়। $1$ বছরে মোট সুদ ₹$310$। $5\\%$ হারে খাটানো অংশ কত?'),
        options: [t('₹1500', '₹1500'), t('₹2000', '₹2000'), t('₹3000', '₹3000'), t('₹3500', '₹3500')],
        correct: 1,
        explanation: [
          t(r`Let $x$ be at $5\%$: $5x + 7(5000 - x) = 31000$, so $35000 - 2x = 31000$.`, r`ধরো $5\%$ হারে অংশ $x$: $5x + 7(5000 - x) = 31000$, তাই $35000 - 2x = 31000$।`),
          t(r`$2x = 4000$, so $x = 2000$. (₹$3000$ is the part at $7\%$, not at $5\%$.)`, r`তাই $2x = 4000$, সুতরাং $x = 2000$। (₹$3000$ হল $7\%$ হারের অংশ, $5\%$-এর নয়।)`),
        ],
      },
    },
    // 11 ─────────────────────────────────────────────
    {
      key: 'si_equal_amounts',
      emoji: '⚖️',
      name: t('Split so both parts give equal amounts (SI)', 'দুটি অংশের সুদ-আসল সমান হবে এমনভাবে ভাগ (সরল সুদ)'),
      difficulty: 'advanced',
      typicalWording: t('“Divide Rs. S into two parts so that the amount of the first in t1 years at R1% equals the amount of the second in t2 years at R2%.”', '“S টাকাকে এমন দুই ভাগে ভাগ করো যাতে R1% হারে t1 বছরে প্রথম অংশের সুদ-আসল, R2% হারে t2 বছরে দ্বিতীয় অংশের সুদ-আসলের সমান হয়।”'),
      formula: t(r`$P_1\left(1 + \dfrac{R_1 T_1}{100}\right) = P_2\left(1 + \dfrac{R_2 T_2}{100}\right)$ with $P_1 + P_2 = S$, so $P_1 : P_2$ is inverse to the two growth factors.`, r`$P_1\left(1 + \dfrac{R_1 T_1}{100}\right) = P_2\left(1 + \dfrac{R_2 T_2}{100}\right)$ এবং $P_1 + P_2 = S$, তাই $P_1 : P_2$ দুটি বৃদ্ধি-গুণনীয়কের উল্টো অনুপাতে থাকে।`),
      shortcut: t('Compute each growth factor as a fraction, swap them to get the ratio of the parts, then split S in that ratio.', 'প্রতিটি বৃদ্ধি-গুণনীয়ক ভগ্নাংশে বের করো, সেগুলো অদলবদল করে অংশ দুটির অনুপাত পাও, তারপর S-কে সেই অনুপাতে ভাগ করো।'),
      trap: t('Equal amounts does not mean equal parts — the part growing more slowly must be the larger part.', 'সুদ-আসল সমান মানে অংশ দুটি সমান নয় — যে অংশ ধীরে বাড়ে তাকে বড় হতেই হবে।'),
      spot: t(
        'A sum is divided so that the **amount from the first part** after its time and rate **equals the amount from the second part** after a different time or rate.',
        'একটি টাকা এমনভাবে ভাগ করা হয় যাতে নিজ নিজ সময় ও হার শেষে **প্রথম অংশের সুদ-আসল দ্বিতীয় অংশের সুদ-আসলের সমান** হয়, যেখানে সময় বা হার আলাদা।',
      ),
      method: [
        t(r`Find each part's growth factor $1 + \dfrac{RT}{100}$ and write it as a fraction.`, r`প্রতিটি অংশের বৃদ্ধি-গুণনীয়ক $1 + \dfrac{RT}{100}$ বের করে ভগ্নাংশে লেখো।`),
        t('Equal amounts means the parts are in the inverse ratio of the growth factors.', 'সুদ-আসল সমান মানে অংশ দুটি বৃদ্ধি-গুণনীয়কের উল্টো অনুপাতে থাকে।'),
        t('Split the total sum in that ratio.', 'মোট টাকাকে সেই অনুপাতে ভাগ করো।'),
        t('Check by growing both parts — the two amounts must match.', 'দুটি অংশ বাড়িয়ে যাচাই করো — সুদ-আসল দুটি মিলতে হবে।'),
      ],
      example: {
        question: t('Divide ₹$4900$ into two parts so that the amount of the first part in $2$ years at $10\\%$ per annum equals the amount of the second part in $5$ years at $5\\%$ per annum (simple interest). Find the first part.', '$4900$ টাকাকে এমন দুই ভাগে ভাগ করো যাতে বার্ষিক $10\\%$ সরল সুদে $2$ বছরে প্রথম অংশের সুদ-আসল, বার্ষিক $5\\%$ সরল সুদে $5$ বছরে দ্বিতীয় অংশের সুদ-আসলের সমান হয়। প্রথম অংশ কত?'),
        steps: [
          t(r`Growth factors: first $= 1 + \dfrac{10 \times 2}{100} = \dfrac{6}{5}$; second $= 1 + \dfrac{5 \times 5}{100} = \dfrac{5}{4}$.`, r`বৃদ্ধি-গুণনীয়ক: প্রথম $= 1 + \dfrac{10 \times 2}{100} = \dfrac{6}{5}$; দ্বিতীয় $= 1 + \dfrac{5 \times 5}{100} = \dfrac{5}{4}$।`),
          t(r`Parts are inverse to the factors: $P_1 : P_2 = \dfrac{5}{4} : \dfrac{6}{5} = 25 : 24$.`, r`অংশ দুটি গুণনীয়কের উল্টো অনুপাতে: $P_1 : P_2 = \dfrac{5}{4} : \dfrac{6}{5} = 25 : 24$।`),
          t(r`First part $= 4900 \times \dfrac{25}{49} = 2500$.`, r`প্রথম অংশ $= 4900 \times \dfrac{25}{49} = 2500$।`),
          t(r`Check: $2500 \times \dfrac{6}{5} = 3000$ and $2400 \times \dfrac{5}{4} = 3000$. Equal!`, r`যাচাই: $2500 \times \dfrac{6}{5} = 3000$ এবং $2400 \times \dfrac{5}{4} = 3000$। সমান!`),
        ],
        answer: t('First part $=$ ₹$2500$', 'প্রথম অংশ $=$ ₹$2500$'),
      },
      tryIt: {
        question: t('Divide ₹$4600$ into two parts so that the amount of the first part in $2$ years at $5\\%$ per annum equals the amount of the second part in $4$ years at $5\\%$ per annum (simple interest). Find the first part.', '$4600$ টাকাকে এমন দুই ভাগে ভাগ করো যাতে বার্ষিক $5\\%$ সরল সুদে $2$ বছরে প্রথম অংশের সুদ-আসল, বার্ষিক $5\\%$ সরল সুদে $4$ বছরে দ্বিতীয় অংশের সুদ-আসলের সমান হয়। প্রথম অংশ কত?'),
        options: [t('₹2200', '₹2200'), t('₹2300', '₹2300'), t('₹2400', '₹2400'), t('₹2640', '₹2640')],
        correct: 2,
        explanation: [
          t(r`Growth factors: first $= 1.10 = \dfrac{11}{10}$; second $= 1.20 = \dfrac{6}{5}$. So $P_1 : P_2 = \dfrac{6}{5} : \dfrac{11}{10} = 12 : 11$.`, r`বৃদ্ধি-গুণনীয়ক: প্রথম $= 1.10 = \dfrac{11}{10}$; দ্বিতীয় $= 1.20 = \dfrac{6}{5}$। তাই $P_1 : P_2 = \dfrac{6}{5} : \dfrac{11}{10} = 12 : 11$।`),
          t(r`First part $= 4600 \times \dfrac{12}{23} = 2400$. Check: $2400 \times 1.10 = 2640 = 2200 \times 1.20$.`, r`প্রথম অংশ $= 4600 \times \dfrac{12}{23} = 2400$। যাচাই: $2400 \times 1.10 = 2640 = 2200 \times 1.20$।`),
        ],
      },
    },
    // 12 ─────────────────────────────────────────────
    {
      key: 'ci_varying_rates',
      emoji: '🎢',
      name: t('CI with a different rate each year', 'প্রতি বছর ভিন্ন হারে চক্রবৃদ্ধি সুদ'),
      difficulty: 'advanced',
      typicalWording: t('“Find the amount / CI on Rs. P for 3 years at R1% in the first year, R2% in the second and R3% in the third.”', '“প্রথম বছরে R1%, দ্বিতীয় বছরে R2% ও তৃতীয় বছরে R3% হারে 3 বছরে P টাকার সুদ-আসল / CI নির্ণয় করো।”'),
      formula: t(r`$A = P\left(1 + \dfrac{R_1}{100}\right)\left(1 + \dfrac{R_2}{100}\right)\left(1 + \dfrac{R_3}{100}\right)$.`, r`সূত্র: $A = P\left(1 + \dfrac{R_1}{100}\right)\left(1 + \dfrac{R_2}{100}\right)\left(1 + \dfrac{R_3}{100}\right)$।`),
      shortcut: t('Grow the running amount year by year with that year\'s rate only — the running total already carries all the earlier growth.', 'চলতি সুদ-আসলকে প্রতি বছর শুধু সেই বছরের হার দিয়ে বাড়াও — চলতি মোটেই আগের সব বৃদ্ধি ধরা থাকে।'),
      trap: t('Do not average the rates or add them and apply one combined rate — each rate acts on a different, growing base.', 'হারগুলোর গড় করবে না বা যোগ করে একটিমাত্র হার লাগাবে না — প্রতিটি হার আলাদা, ক্রমবর্ধমান ভিত্তির ওপর কাজ করে।'),
      spot: t(
        'Compound interest where the **rate changes from year to year** — a different percentage is named for the first, second (and third) year.',
        'চক্রবৃদ্ধি সুদ যেখানে **হার প্রতি বছর বদলায়** — প্রথম, দ্বিতীয় (ও তৃতীয়) বছরের জন্য আলাদা শতকরা হার দেওয়া থাকে।',
      ),
      method: [
        t('Start with P and apply the first year\'s rate to get the amount after year 1.', 'P দিয়ে শুরু করে প্রথম বছরের হার লাগিয়ে 1 বছর পরের সুদ-আসল বের করো।'),
        t('Apply the second year\'s rate to that new amount, and so on for each year.', 'দ্বিতীয় বছরের হার সেই নতুন সুদ-আসলের ওপর লাগাও, এভাবে প্রতি বছর এগোও।'),
        t(r`Compound interest $CI = \text{final amount} - P$.`, r`চক্রবৃদ্ধি সুদ $CI = \text{শেষ সুদ-আসল} - P$।`),
      ],
      example: {
        question: t('Find the amount on ₹$10000$ at compound interest for $3$ years, the rates being $5\\%$ for the first year, $10\\%$ for the second and $20\\%$ for the third.', 'চক্রবৃদ্ধি সুদে ₹$10000$-এর $3$ বছরের সুদ-আসল নির্ণয় করো, যেখানে হার প্রথম বছরে $5\\%$, দ্বিতীয় বছরে $10\\%$ ও তৃতীয় বছরে $20\\%$।'),
        steps: [
          t(r`After year 1: $10000 \times 1.05 = 10500$.`, r`1 বছর পরে: $10000 \times 1.05 = 10500$।`),
          t(r`After year 2: $10500 \times 1.10 = 11550$.`, r`2 বছর পরে: $10500 \times 1.10 = 11550$।`),
          t(r`After year 3: $11550 \times 1.20 = 13860$.`, r`3 বছর পরে: $11550 \times 1.20 = 13860$।`),
        ],
        answer: t('Amount $=$ ₹$13860$ (CI $=$ ₹$3860$)', 'সুদ-আসল $=$ ₹$13860$ (CI $=$ ₹$3860$)'),
      },
      tryIt: {
        question: t('Find the compound interest on ₹$20000$ for $2$ years, the rate being $10\\%$ for the first year and $20\\%$ for the second year.', '₹$20000$-এর $2$ বছরের চক্রবৃদ্ধি সুদ নির্ণয় করো, যেখানে হার প্রথম বছরে $10\\%$ ও দ্বিতীয় বছরে $20\\%$।'),
        options: [t('₹6000', '₹6000'), t('₹6400', '₹6400'), t('₹6600', '₹6600'), t('₹26400', '₹26400')],
        correct: 1,
        explanation: [
          t(r`After year 1: $20000 \times 1.10 = 22000$. After year 2: $22000 \times 1.20 = 26400$.`, r`1 বছর পরে: $20000 \times 1.10 = 22000$। 2 বছর পরে: $22000 \times 1.20 = 26400$।`),
          t(r`$CI = 26400 - 20000 = 6400$. (₹$6000$ is what adding the rates as simple interest would give.)`, r`তাই $CI = 26400 - 20000 = 6400$। (হার যোগ করে সরল সুদ ধরলে ₹$6000$ আসত।)`),
        ],
      },
    },
    // 13 ─────────────────────────────────────────────
    {
      key: 'instalments',
      emoji: '🧾',
      name: t('Annual instalment to clear a loan (SI)', 'ঋণ শোধের বার্ষিক কিস্তি (সরল সুদ)'),
      difficulty: 'advanced',
      typicalWording: t('“A loan of Rs. A is to be cleared in T equal annual instalments at R% simple interest. Find each instalment.”', '“R% সরল সুদে A টাকার ঋণ Tটি সমান বার্ষিক কিস্তিতে শোধ করতে হবে। প্রতিটি কিস্তি নির্ণয় করো।”'),
      formula: t(r`Instalment $x = \dfrac{100A}{100T + \dfrac{R \times T(T - 1)}{2}}$, where $A$ is the total amount payable at the end.`, r`কিস্তি $x = \dfrac{100A}{100T + \dfrac{R \times T(T - 1)}{2}}$, যেখানে $A$ হল মেয়াদ শেষে মোট পরিশোধযোগ্য টাকা।`),
      shortcut: t('Value each instalment at the end date: the first earns interest for $T-1$ years, the next for $T-2$, and the last for none; add the values and divide A by the total factor.', 'প্রতিটি কিস্তির মূল্য শেষ তারিখে হিসাব করো: প্রথমটি $T-1$ বছরের, পরেরটি $T-2$ বছরের সুদ পায়, শেষটি পায় না; মানগুলো যোগ করে A-কে মোট গুণনীয়ক দিয়ে ভাগ করো।'),
      trap: t('Do not just divide the loan by the number of instalments — instalments paid early also settle the interest they would have earned till the end.', 'ঋণকে কিস্তির সংখ্যা দিয়ে স্রেফ ভাগ করবে না — আগে দেওয়া কিস্তিগুলো শেষ পর্যন্ত পাওয়া সুদও শোধ করে ধরা হয়।'),
      spot: t(
        'A debt due at a future date is to be cleared by **equal annual instalments**, with simple interest allowed on each payment made early.',
        'ভবিষ্যতে পরিশোধযোগ্য ঋণ **সমান বার্ষিক কিস্তিতে** শোধ করতে হয়, যেখানে আগে দেওয়া প্রতিটি কিস্তির ওপর সরল সুদ ধরা হয়।',
      ),
      method: [
        t('Let each instalment be $x$, paid at the end of each year.', 'প্রতিটি কিস্তি $x$ ধরো, প্রতি বছরের শেষে দেওয়া হয়।'),
        t('Grow each instalment with simple interest up to the final date: earlier instalments earn interest for more years.', 'শেষ তারিখ পর্যন্ত প্রতিটি কিস্তিকে সরল সুদে বাড়াও: আগের কিস্তিগুলো বেশি বছরের সুদ পায়।'),
        t('Add the grown values, set the sum equal to the amount due, and solve for $x$.', 'বাড়ানো মানগুলো যোগ করে মোট পরিশোধযোগ্য টাকার সমান ধরো এবং $x$ বের করো।'),
      ],
      example: {
        question: t('A debt of ₹$3150$ is due in $3$ years at $5\\%$ simple interest. Find the equal annual instalment that will clear it.', 'বার্ষিক $5\\%$ সরল সুদে ₹$3150$ টাকার ঋণ $3$ বছরে পরিশোধযোগ্য। ঋণ শোধের সমান বার্ষিক কিস্তি নির্ণয় করো।'),
        steps: [
          t(r`Let each instalment be $x$. Valued at the end of year 3: the 1st grows for 2 years to $x \times 1.10$, the 2nd for 1 year to $x \times 1.05$, the 3rd stays $x$.`, r`প্রতিটি কিস্তি $x$ ধরো। 3য় বছরের শেষে হিসাব করলে: 1মটি 2 বছরে বেড়ে $x \times 1.10$, 2য়টি 1 বছরে $x \times 1.05$, 3য়টি থাকে $x$।`),
          t(r`Sum: $1.10x + 1.05x + x = 3.15x$.`, r`যোগফল: $1.10x + 1.05x + x = 3.15x$।`),
          t(r`$3.15x = 3150$, so $x = 1000$.`, r`এখানে $3.15x = 3150$, তাই $x = 1000$।`),
        ],
        answer: t('Annual instalment $=$ ₹$1000$', 'বার্ষিক কিস্তি $=$ ₹$1000$'),
      },
      tryIt: {
        question: t('A debt of ₹$4620$ is due in $3$ years at $10\\%$ simple interest. Find the equal annual instalment that will clear it.', 'বার্ষিক $10\\%$ সরল সুদে ₹$4620$ টাকার ঋণ $3$ বছরে পরিশোধযোগ্য। ঋণ শোধের সমান বার্ষিক কিস্তি নির্ণয় করো।'),
        options: [t('₹1200', '₹1200'), t('₹1400', '₹1400'), t('₹1540', '₹1540'), t('₹4620', '₹4620')],
        correct: 1,
        explanation: [
          t(r`Valued at the end: instalments grow to $1.20x$, $1.10x$ and $x$, a total of $3.30x$.`, r`শেষে হিসাব করলে কিস্তিগুলো হয় $1.20x$, $1.10x$ ও $x$, মোট $3.30x$।`),
          t(r`$3.30x = 4620$, so $x = 1400$. (₹$1540$ is just $4620 \div 3$, ignoring interest on early instalments.)`, r`তাই $3.30x = 4620$, সুতরাং $x = 1400$। (₹$1540$ হল শুধু $4620 \div 3$, আগের কিস্তির সুদ বাদ দিয়ে।)`),
        ],
      },
    },
    // 14 ─────────────────────────────────────────────
    {
      key: 'si_then_ci_reinvest',
      emoji: '♻️',
      name: t('SI amount reinvested at compound interest', 'সরল সুদের সুদ-আসল আবার চক্রবৃদ্ধি সুদে খাটানো'),
      difficulty: 'advanced',
      typicalWording: t('“A sum is lent at SI for some years; the amount received is then invested at CI for some years. Find the final amount / total interest.”', '“কোনো টাকা কিছু বছর সরল সুদে খাটানো হয়; প্রাপ্ত সুদ-আসল তারপর কিছু বছর চক্রবৃদ্ধি সুদে খাটানো হয়। শেষ সুদ-আসল / মোট সুদ নির্ণয় করো।”'),
      formula: t(r`Stage 1: $A_1 = P + \dfrac{P R_1 T_1}{100}$. Stage 2: $A_2 = A_1\left(1 + \dfrac{R_2}{100}\right)^{T_2}$.`, r`ধাপ 1: $A_1 = P + \dfrac{P R_1 T_1}{100}$। ধাপ 2: $A_2 = A_1\left(1 + \dfrac{R_2}{100}\right)^{T_2}$।`),
      shortcut: t('Treat it as two separate one-chapter questions joined by one number: finish the SI stage completely, circle its amount, and use only that as the CI principal.', 'এটিকে একটি সংখ্যা দিয়ে জোড়া দুটি আলাদা প্রশ্ন ভাবো: SI ধাপ পুরো শেষ করে তার সুদ-আসলটি গোল দাগ দিয়ে রাখো, শুধু সেটিকেই CI-এর আসল হিসেবে ব্যবহার করো।'),
      trap: t('The CI stage starts from the SI amount (principal plus SI interest), not from the original principal and not from the SI interest alone — unless the question says only the interest is reinvested.', 'CI ধাপ শুরু হয় SI-এর সুদ-আসল (আসল + সরল সুদ) থেকে, মূল আসল বা শুধু সরল সুদ থেকে নয় — যদি না প্রশ্নে শুধু সুদ পুনঃখাটানোর কথা বলা থাকে।'),
      spot: t(
        'The money passes through **two stages**: first it grows at **simple interest**, then the whole amount received is **reinvested at compound interest**.',
        'টাকাটি **দুটি ধাপে** বাড়ে: প্রথমে **সরল সুদে** বাড়ে, তারপর প্রাপ্ত পুরো সুদ-আসল **চক্রবৃদ্ধি সুদে পুনরায় খাটানো** হয়।',
      ),
      method: [
        t('Stage 1: find the simple interest and the amount $A_1 = P + SI$.', 'ধাপ 1: সরল সুদ ও সুদ-আসল $A_1 = P + SI$ বের করো।'),
        t('Stage 2: take $A_1$ as the new principal and grow it at compound interest for the second period.', 'ধাপ 2: $A_1$-কে নতুন আসল ধরে দ্বিতীয় মেয়াদে চক্রবৃদ্ধি সুদে বাড়াও।'),
        t('Total interest earned $=$ final amount $-$ original principal.', 'মোট অর্জিত সুদ $=$ শেষ সুদ-আসল $-$ মূল আসল।'),
      ],
      example: {
        question: t('₹$5000$ is lent at $10\\%$ simple interest for $2$ years. The amount received is then invested at $10\\%$ compound interest for $2$ years. Find the final amount.', '₹$5000$ বার্ষিক $10\\%$ সরল সুদে $2$ বছরের জন্য খাটানো হয়। প্রাপ্ত সুদ-আসল তারপর বার্ষিক $10\\%$ চক্রবৃদ্ধি সুদে $2$ বছর খাটানো হয়। শেষ সুদ-আসল নির্ণয় করো।'),
        steps: [
          t(r`Stage 1: $SI = \dfrac{5000 \times 10 \times 2}{100} = 1000$, so $A_1 = 5000 + 1000 = 6000$.`, r`ধাপ 1: $SI = \dfrac{5000 \times 10 \times 2}{100} = 1000$, তাই $A_1 = 5000 + 1000 = 6000$।`),
          t(r`Stage 2: $A_2 = 6000 \times (1.10)^2 = 6000 \times 1.21$.`, r`ধাপ 2: $A_2 = 6000 \times (1.10)^2 = 6000 \times 1.21$।`),
          t(r`$A_2 = 7260$.`, r`সুতরাং $A_2 = 7260$।`),
        ],
        answer: t('Final amount $=$ ₹$7260$', 'শেষ সুদ-আসল $=$ ₹$7260$'),
      },
      tryIt: {
        question: t('₹$10000$ is lent at $5\\%$ simple interest for $2$ years. The amount received is then invested at $10\\%$ compound interest for $2$ years. Find the total interest earned over both stages.', '₹$10000$ বার্ষিক $5\\%$ সরল সুদে $2$ বছরের জন্য খাটানো হয়। প্রাপ্ত সুদ-আসল তারপর বার্ষিক $10\\%$ চক্রবৃদ্ধি সুদে $2$ বছর খাটানো হয়। দুই ধাপে মোট অর্জিত সুদ নির্ণয় করো।'),
        options: [t('₹3000', '₹3000'), t('₹3100', '₹3100'), t('₹3310', '₹3310'), t('₹13310', '₹13310')],
        correct: 2,
        explanation: [
          t(r`Stage 1: $SI = \dfrac{10000 \times 5 \times 2}{100} = 1000$, so the amount is $11000$.`, r`ধাপ 1: $SI = \dfrac{10000 \times 5 \times 2}{100} = 1000$, তাই সুদ-আসল $11000$।`),
          t(r`Stage 2: $11000 \times (1.10)^2 = 11000 \times 1.21 = 13310$.`, r`ধাপ 2: $11000 \times (1.10)^2 = 11000 \times 1.21 = 13310$।`),
          t(r`Total interest $= 13310 - 10000 = 3310$. (₹$13310$ is the final amount, not the interest.)`, r`মোট সুদ $= 13310 - 10000 = 3310$। (₹$13310$ হল শেষ সুদ-আসল, সুদ নয়।)`),
        ],
      },
    },
  ],
  // Hard-bank pattern matrix (Advanced quizzes): see ./hard/interest.js.
  registry: require('./hard/interest'),
};
