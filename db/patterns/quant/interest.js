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
      spot: t(
        'The question talks about the **difference** between compound and simple interest for $2$ years, and asks for the difference or the principal.',
        'প্রশ্নে $2$ বছরের চক্রবৃদ্ধি ও সরল সুদের **পার্থক্য** নিয়ে কথা থাকে, আর পার্থক্য বা আসল জানতে চাওয়া হয়।',
      ),
      method: [
        t(r`For 2 years: $CI - SI = P\left(\dfrac{R}{100}\right)^2$.`, r`2 বছরের জন্য: $CI - SI = P\left(\dfrac{R}{100}\right)^2$।`),
        t(r`If the difference is given, $P = \text{difference} \times \left(\dfrac{100}{R}\right)^2$.`, r`পার্থক্য দেওয়া থাকলে $P = \text{পার্থক্য} \times \left(\dfrac{100}{R}\right)^2$।`),
      ],
      example: {
        question: t('Find the difference between compound and simple interest on ₹$5000$ at $4\\%$ per annum for $2$ years.', '₹$5000$-এর বার্ষিক $4\\%$ হারে $2$ বছরের চক্রবৃদ্ধি সুদ ও সরল সুদের পার্থক্য কত?'),
        steps: [
          t(r`Difference $= 5000 \times \left(\dfrac{4}{100}\right)^2 = 5000 \times \dfrac{16}{10000}$.`, r`পার্থক্য $= 5000 \times \left(\dfrac{4}{100}\right)^2 = 5000 \times \dfrac{16}{10000}$।`),
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
  ],
};
