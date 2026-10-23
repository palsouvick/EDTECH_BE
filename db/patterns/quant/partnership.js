'use strict';

// Question patterns: Partnership. Format: see ../validate.js.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'partnership',
  patterns: [
    // 1 ─────────────────────────────────────────────
    {
      key: 'profit_by_capital',
      emoji: '🤝',
      name: t('Same time: share profit by money invested', 'একই সময়: মূলধনের অনুপাতে লাভ ভাগ'),
      spot: t(
        'Partners invest different amounts for the **same time** (say, the whole year), and one partner\'s share of profit is asked.',
        'অংশীদাররা **একই সময়ের** জন্য (ধরো সারা বছর) আলাদা আলাদা টাকা খাটায়, আর কোনো একজনের লাভের ভাগ জানতে চাওয়া হয়।',
      ),
      method: [
        t('Write the investments as a ratio and simplify it.', 'মূলধনগুলোর অনুপাত লিখে সরল করো।'),
        t('Add the ratio parts to get the total parts.', 'অনুপাতের অংশগুলো যোগ করে মোট অংশ বের করো।'),
        t(r`Share $= \dfrac{\text{own parts}}{\text{total parts}} \times \text{profit}$.`, r`ভাগ $= \dfrac{\text{নিজের অংশ}}{\text{মোট অংশ}} \times \text{লাভ}$।`),
      ],
      example: {
        question: t('A invests ₹$4000$ and B invests ₹$6000$ in a business for one year. The profit is ₹$2500$. Find each one\'s share.', 'A ₹$4000$ এবং B ₹$6000$ দিয়ে এক বছরের জন্য ব্যবসা শুরু করল। লাভ হল ₹$2500$। কে কত পাবে?'),
        steps: [
          t(r`Ratio $= 4000 : 6000 = 2 : 3$. Total parts $= 5$.`, r`অনুপাত $= 4000 : 6000 = 2 : 3$। মোট অংশ $= 5$।`),
          t(r`A's share $= \dfrac{2}{5} \times 2500 = 1000$.`, r`A-এর ভাগ $= \dfrac{2}{5} \times 2500 = 1000$।`),
          t(r`B's share $= \dfrac{3}{5} \times 2500 = 1500$.`, r`B-এর ভাগ $= \dfrac{3}{5} \times 2500 = 1500$।`),
        ],
        answer: t('A gets ₹$1000$, B gets ₹$1500$.', 'A পাবে ₹$1000$, B পাবে ₹$1500$।'),
      },
      tryIt: {
        question: t('A and B start a business with ₹$15000$ and ₹$25000$ for one year. Out of a profit of ₹$12000$, what is B\'s share?', 'A ও B যথাক্রমে ₹$15000$ ও ₹$25000$ দিয়ে এক বছরের জন্য ব্যবসা করে। ₹$12000$ লাভ হলে B-এর ভাগ কত?'),
        options: [t('₹4500', '₹4500'), t('₹6000', '₹6000'), t('₹7500', '₹7500'), t('₹8000', '₹8000')],
        correct: 2,
        explanation: [
          t(r`Ratio $= 15000 : 25000 = 3 : 5$. Total parts $= 8$.`, r`অনুপাত $= 15000 : 25000 = 3 : 5$। মোট অংশ $= 8$।`),
          t(r`B's share $= \dfrac{5}{8} \times 12000 = 7500$. (₹$4500$ is A's share.)`, r`B-এর ভাগ $= \dfrac{5}{8} \times 12000 = 7500$। (₹$4500$ হল A-এর ভাগ।)`),
        ],
      },
    },
    // 2 ─────────────────────────────────────────────
    {
      key: 'capital_times_months',
      emoji: '📅',
      name: t('Different times: multiply money by months', 'আলাদা সময়: টাকা × মাস'),
      spot: t(
        'Partners invest for **different periods**, for example one "joins after 4 months" or invests "for 6 months".',
        'অংশীদাররা **আলাদা আলাদা সময়ের** জন্য টাকা খাটায়, যেমন কেউ "4 মাস পরে যোগ দেয়" বা "6 মাসের জন্য" টাকা রাখে।',
      ),
      method: [
        t(r`For each partner, find $\text{money} \times \text{months}$.`, r`প্রত্যেক অংশীদারের জন্য $\text{টাকা} \times \text{মাস}$ বের করো।`),
        t('"Joins after 4 months" in a 12-month year means he stays $12 - 4 = 8$ months.', '12 মাসের বছরে "4 মাস পরে যোগ দেয়" মানে সে থাকে $12 - 4 = 8$ মাস।'),
        t('Profit is shared in the ratio of these products.', 'এই গুণফলগুলোর অনুপাতে লাভ ভাগ হয়।'),
      ],
      example: {
        question: t('A invests ₹$12000$ for $12$ months and B invests ₹$18000$ for $6$ months. The profit is ₹$7000$. Find each share.', 'A ₹$12000$ খাটায় $12$ মাস, আর B ₹$18000$ খাটায় $6$ মাস। লাভ ₹$7000$ হলে কে কত পাবে?'),
        steps: [
          t(r`A: $12000 \times 12 = 144000$. B: $18000 \times 6 = 108000$.`, r`A-এর হিসাব: $12000 \times 12 = 144000$। B-এর হিসাব: $18000 \times 6 = 108000$।`),
          t(r`Ratio $= 144000 : 108000 = 4 : 3$. Total parts $= 7$.`, r`অনুপাত $= 144000 : 108000 = 4 : 3$। মোট অংশ $= 7$।`),
          t(r`A $= \dfrac{4}{7} \times 7000 = 4000$, B $= \dfrac{3}{7} \times 7000 = 3000$.`, r`A পাবে $\dfrac{4}{7} \times 7000 = 4000$, B পাবে $\dfrac{3}{7} \times 7000 = 3000$।`),
        ],
        answer: t('A gets ₹$4000$, B gets ₹$3000$.', 'A পাবে ₹$4000$, B পাবে ₹$3000$।'),
      },
      tryIt: {
        question: t('A starts a business with ₹$8000$. After $4$ months, B joins with ₹$12000$. Out of a yearly profit of ₹$9000$, what is B\'s share?', 'A ₹$8000$ দিয়ে ব্যবসা শুরু করে। $4$ মাস পরে B ₹$12000$ নিয়ে যোগ দেয়। বছর শেষে ₹$9000$ লাভ হলে B-এর ভাগ কত?'),
        options: [t('₹5400', '₹5400'), t('₹3600', '₹3600'), t('₹6000', '₹6000'), t('₹4500', '₹4500')],
        correct: 3,
        explanation: [
          t(r`A: $8000 \times 12 = 96000$. B stays $8$ months: $12000 \times 8 = 96000$.`, r`A-এর হিসাব: $8000 \times 12 = 96000$। B থাকে $8$ মাস: $12000 \times 8 = 96000$।`),
          t(r`Ratio $= 1 : 1$, so B gets half: $9000 \div 2 = 4500$.`, r`অনুপাত $= 1 : 1$, তাই B পাবে অর্ধেক: $9000 \div 2 = 4500$।`),
          t('(Ignoring the months gives the ratio $2 : 3$ and the wrong answer ₹$5400$.)', '(মাস হিসাব না করলে অনুপাত $2 : 3$ হয় আর ভুল উত্তর ₹$5400$ আসে।)'),
        ],
      },
    },
    // 3 ─────────────────────────────────────────────
    {
      key: 'capital_changes_midway',
      emoji: '🔀',
      name: t('Money added or withdrawn midway', 'মাঝপথে টাকা বাড়ানো বা তুলে নেওয়া'),
      spot: t(
        'A partner **adds** more money or **withdraws** some money after a few months.',
        'কোনো অংশীদার কয়েক মাস পরে আরও টাকা **যোগ করে** বা কিছু টাকা **তুলে নেয়**।',
      ),
      method: [
        t('Split that partner\'s year into parts: before the change and after the change.', 'ওই অংশীদারের বছরটাকে দুই ভাগে ভাগ করো: পরিবর্তনের আগে আর পরে।'),
        t(r`Add up $\text{money} \times \text{months}$ for each part.`, r`প্রতিটি ভাগের $\text{টাকা} \times \text{মাস}$ যোগ করো।`),
        t('Compare with the other partners and share the profit in that ratio.', 'অন্য অংশীদারদের সঙ্গে তুলনা করে সেই অনুপাতে লাভ ভাগ করো।'),
      ],
      example: {
        question: t('A starts with ₹$20000$ and withdraws ₹$5000$ after $6$ months. B invests ₹$15000$ for the whole year. Find A\'s share of a profit of ₹$26000$.', 'A ₹$20000$ দিয়ে শুরু করে $6$ মাস পরে ₹$5000$ তুলে নেয়। B সারা বছর ₹$15000$ রাখে। ₹$26000$ লাভের মধ্যে A-এর ভাগ কত?'),
        steps: [
          t(r`A: $20000 \times 6 + 15000 \times 6 = 120000 + 90000 = 210000$.`, r`A-এর হিসাব: $20000 \times 6 + 15000 \times 6 = 120000 + 90000 = 210000$।`),
          t(r`B: $15000 \times 12 = 180000$.`, r`B-এর হিসাব: $15000 \times 12 = 180000$।`),
          t(r`Ratio $= 210000 : 180000 = 7 : 6$. Total $= 13$ parts.`, r`অনুপাত $= 210000 : 180000 = 7 : 6$। মোট $= 13$ অংশ।`),
          t(r`A's share $= \dfrac{7}{13} \times 26000 = 14000$.`, r`A-এর ভাগ $= \dfrac{7}{13} \times 26000 = 14000$।`),
        ],
        answer: t('A gets ₹$14000$.', 'A পাবে ₹$14000$।'),
      },
      tryIt: {
        question: t('A invests ₹$30000$ and adds ₹$10000$ more after $4$ months. B invests ₹$45000$ for the whole year. Find A\'s share of a profit of ₹$9800$.', 'A ₹$30000$ খাটায় এবং $4$ মাস পরে আরও ₹$10000$ যোগ করে। B সারা বছর ₹$45000$ রাখে। ₹$9800$ লাভের মধ্যে A-এর ভাগ কত?'),
        options: [t('₹3920', '₹3920'), t('₹4400', '₹4400'), t('₹4900', '₹4900'), t('₹5400', '₹5400')],
        correct: 1,
        explanation: [
          t(r`A: $30000 \times 4 + 40000 \times 8 = 120000 + 320000 = 440000$. B: $45000 \times 12 = 540000$.`, r`A-এর হিসাব: $30000 \times 4 + 40000 \times 8 = 120000 + 320000 = 440000$। B-এর হিসাব: $45000 \times 12 = 540000$।`),
          t(r`Ratio $= 440000 : 540000 = 22 : 27$. Total $= 49$ parts.`, r`অনুপাত $= 440000 : 540000 = 22 : 27$। মোট $= 49$ অংশ।`),
          t(r`A's share $= \dfrac{22}{49} \times 9800 = 22 \times 200 = 4400$.`, r`A-এর ভাগ $= \dfrac{22}{49} \times 9800 = 22 \times 200 = 4400$।`),
        ],
      },
    },
    // 4 ─────────────────────────────────────────────
    {
      key: 'working_partner',
      emoji: '👷',
      name: t('Working partner gets a share for managing', 'পরিচালনার জন্য কর্মরত অংশীদারের আলাদা পাওনা'),
      spot: t(
        'One partner **manages** the business and first gets a fixed percentage (or salary) from the profit; the **rest** is shared by capital.',
        'একজন অংশীদার ব্যবসা **দেখাশোনা** করে, তাই লাভ থেকে আগে নির্দিষ্ট শতাংশ (বা বেতন) পায়; **বাকি** লাভ মূলধনের অনুপাতে ভাগ হয়।',
      ),
      method: [
        t('Take out the manager\'s share first.', 'আগে পরিচালকের পাওনা আলাদা করে নাও।'),
        t('Divide the remaining profit in the ratio of investments.', 'বাকি লাভ মূলধনের অনুপাতে ভাগ করো।'),
        t('Manager\'s total $=$ managing share $+$ his part of the rest.', 'পরিচালকের মোট $=$ পরিচালনার পাওনা $+$ বাকি লাভে তার ভাগ।'),
      ],
      example: {
        question: t('A invests ₹$30000$ and B invests ₹$20000$. A manages the business and gets $10\\%$ of the profit for it; the rest is shared by capital. Out of a profit of ₹$10000$, how much does A get in all?', 'A ₹$30000$ ও B ₹$20000$ খাটায়। A ব্যবসা দেখাশোনা করে বলে লাভের $10\\%$ আগে পায়; বাকি লাভ মূলধনের অনুপাতে ভাগ হয়। ₹$10000$ লাভ হলে A মোট কত পাবে?'),
        steps: [
          t('Managing share $= 10\\%$ of $10000 = 1000$. Rest $= 9000$.', 'পরিচালনার পাওনা $= 10000$-এর $10\\% = 1000$। বাকি $= 9000$।'),
          t(r`Capital ratio $= 30000 : 20000 = 3 : 2$. A's part $= \dfrac{3}{5} \times 9000 = 5400$.`, r`মূলধনের অনুপাত $= 30000 : 20000 = 3 : 2$। A-এর ভাগ $= \dfrac{3}{5} \times 9000 = 5400$।`),
          t('A gets $1000 + 5400 = 6400$.', 'A পায় $1000 + 5400 = 6400$।'),
        ],
        answer: t('A gets ₹$6400$ (and B gets ₹$3600$).', 'A পাবে ₹$6400$ (আর B পাবে ₹$3600$)।'),
      },
      tryIt: {
        question: t('A invests ₹$40000$ and B invests ₹$60000$. B manages the business and first gets $20\\%$ of the profit; the rest is shared by capital. Out of a profit of ₹$15000$, how much does B get in all?', 'A ₹$40000$ ও B ₹$60000$ খাটায়। B ব্যবসা দেখাশোনা করে বলে লাভের $20\\%$ আগে পায়; বাকি লাভ মূলধনের অনুপাতে ভাগ হয়। ₹$15000$ লাভ হলে B মোট কত পাবে?'),
        options: [t('₹9000', '₹9000'), t('₹7200', '₹7200'), t('₹12000', '₹12000'), t('₹10200', '₹10200')],
        correct: 3,
        explanation: [
          t('Managing share $= 20\\%$ of $15000 = 3000$. Rest $= 12000$.', 'পরিচালনার পাওনা $= 15000$-এর $20\\% = 3000$। বাকি $= 12000$।'),
          t(r`Capital ratio $= 2 : 3$. B's part $= \dfrac{3}{5} \times 12000 = 7200$.`, r`মূলধনের অনুপাত $= 2 : 3$। B-এর ভাগ $= \dfrac{3}{5} \times 12000 = 7200$।`),
          t('B gets $3000 + 7200 = 10200$. (₹$7200$ forgets the managing share.)', 'B পায় $3000 + 7200 = 10200$। (₹$7200$ নিলে পরিচালনার পাওনা বাদ পড়ে যায়।)'),
        ],
      },
    },
    // 5 ─────────────────────────────────────────────
    {
      key: 'find_unknown_time',
      emoji: '⏳',
      name: t('Find when a partner joined', 'অংশীদার কবে যোগ দিল তা নির্ণয়'),
      spot: t(
        'The **profit ratio** is given, and you must find how many months a partner stayed or after how many months he joined.',
        '**লাভের অনুপাত** দেওয়া থাকে, আর বের করতে হয় কোনো অংশীদার কত মাস ছিল বা কত মাস পরে যোগ দিয়েছিল।',
      ),
      method: [
        t('Let the unknown number of months be $x$.', 'অজানা মাসের সংখ্যা $x$ ধরো।'),
        t(r`Set $\dfrac{\text{money}_A \times \text{months}_A}{\text{money}_B \times x} = $ given profit ratio, and solve.`, r`লেখো $\dfrac{\text{A-এর টাকা} \times \text{A-এর মাস}}{\text{B-এর টাকা} \times x} = $ দেওয়া লাভের অনুপাত, তারপর সমাধান করো।`),
        t('"Joined after" $= 12 - x$. Read carefully which one is asked.', '"কত মাস পরে যোগ দিল" $= 12 - x$। কোনটা চাওয়া হয়েছে ভালো করে পড়ো।'),
      ],
      example: {
        question: t('A starts a business with ₹$6000$. Some months later B joins with ₹$9000$. At the end of the year the profit is shared equally. After how many months did B join?', 'A ₹$6000$ দিয়ে ব্যবসা শুরু করে। কয়েক মাস পরে B ₹$9000$ নিয়ে যোগ দেয়। বছর শেষে লাভ সমান ভাগ হয়। B কত মাস পরে যোগ দিয়েছিল?'),
        steps: [
          t('Let B stay $x$ months. Equal profit means equal $\\text{money} \\times \\text{months}$.', 'ধরো B ছিল $x$ মাস। সমান লাভ মানে $\\text{টাকা} \\times \\text{মাস}$ সমান।'),
          t(r`$6000 \times 12 = 9000 \times x$, so $x = \dfrac{72000}{9000} = 8$.`, r`$6000 \times 12 = 9000 \times x$, তাই $x = \dfrac{72000}{9000} = 8$।`),
          t('B stayed $8$ months, so he joined after $12 - 8 = 4$ months.', 'B ছিল $8$ মাস, তাই সে যোগ দিয়েছিল $12 - 8 = 4$ মাস পরে।'),
        ],
        answer: t('B joined after $4$ months.', 'B $4$ মাস পরে যোগ দিয়েছিল।'),
      },
      tryIt: {
        question: t('A starts a business with ₹$10000$. Later B joins with ₹$15000$. At the end of the year the profit is shared in the ratio $2 : 1$ (A : B). After how many months did B join?', 'A ₹$10000$ দিয়ে ব্যবসা শুরু করে। পরে B ₹$15000$ নিয়ে যোগ দেয়। বছর শেষে লাভ $2 : 1$ (A : B) অনুপাতে ভাগ হয়। B কত মাস পরে যোগ দিয়েছিল?'),
        options: [t('4 months', '4 মাস'), t('8 months', '8 মাস'), t('6 months', '6 মাস'), t('3 months', '3 মাস')],
        correct: 1,
        explanation: [
          t(r`Let B stay $x$ months: $\dfrac{10000 \times 12}{15000 \times x} = \dfrac{2}{1}$.`, r`ধরো B ছিল $x$ মাস: $\dfrac{10000 \times 12}{15000 \times x} = \dfrac{2}{1}$।`),
          t(r`$120000 = 30000x$, so $x = 4$.`, r`তাহলে $120000 = 30000x$, তাই $x = 4$।`),
          t('B stayed $4$ months, so he joined after $12 - 4 = 8$ months. ($4$ is how long he stayed, not when he joined.)', 'B ছিল $4$ মাস, তাই যোগ দিয়েছিল $12 - 4 = 8$ মাস পরে। ($4$ হল সে কত মাস ছিল, কখন যোগ দিল তা নয়।)'),
        ],
      },
    },
  ],
};
