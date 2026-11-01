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
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“A invests ₹X and B invests ₹Y for a year. The profit is ₹Z — find each one\'s share.”', '“A ₹X ও B ₹Y এক বছরের জন্য বিনিয়োগ করে। লাভ ₹Z — প্রত্যেকের ভাগ বের করো।”'),
      formula: t(r`When the time is the same: $P_A : P_B = C_A : C_B$, and share $=\dfrac{\text{own capital}}{\text{total capital}}\times\text{profit}$.`, r`সময় একই হলে: $P_A : P_B = C_A : C_B$, এবং ভাগ $=\dfrac{\text{নিজের মূলধন}}{\text{মোট মূলধন}}\times\text{লাভ}$।`),
      shortcut: t('Cancel the common zeros and reduce the capitals to a small ratio first; then one part = profit ÷ total parts, and multiply.', 'আগে সাধারণ শূন্য কেটে মূলধনগুলো ছোট অনুপাতে আনো; তারপর এক অংশ = লাভ ÷ মোট অংশ বের করে গুণ করো।'),
      trap: t('Equal time does not mean equal shares — the partner who invests more capital gets the bigger share.', 'সময় সমান হলেই ভাগ সমান নয় — যে বেশি মূলধন দেয় তার ভাগ বড় হয়।'),
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
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“A starts the business and B joins after 4 months” or “B invests for 6 months only.”', '“A ব্যবসা শুরু করে আর B 4 মাস পরে যোগ দেয়” বা “B মাত্র 6 মাসের জন্য বিনিয়োগ করে।”'),
      formula: t(r`Profit ratio $= C_1T_1 : C_2T_2$ — each partner's capital $\times$ his months.`, r`লাভের অনুপাত $= C_1T_1 : C_2T_2$ — প্রত্যেক অংশীদারের মূলধন $\times$ তার মাস।`),
      shortcut: t('Reduce the capital ratio and the time ratio separately, then multiply them term by term to get the profit ratio.', 'মূলধনের অনুপাত ও সময়ের অনুপাত আলাদাভাবে লঘিষ্ঠ করো, তারপর পদে পদে গুণ করে লাভের অনুপাত পাও।'),
      trap: t('“Joins after 4 months” means his money stays for $12 - 4 = 8$ months, not for 4 months.', '“4 মাস পরে যোগ দেয়” মানে তার টাকা থাকে $12 - 4 = 8$ মাস, 4 মাস নয়।'),
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
      difficulty: 'advanced',
      typicalWording: t('“After 6 months, A withdraws ₹5000” or “A adds ₹10000 more after 4 months.”', '“6 মাস পরে A ₹5000 তুলে নেয়” বা “A 4 মাস পরে আরও ₹10000 যোগ করে।”'),
      formula: t(r`Effective investment $= \sum (\text{capital} \times \text{months at that capital})$ over each period of the year.`, r`কার্যকর বিনিয়োগ $= \sum (\text{মূলধন} \times \text{সেই মূলধনে থাকা মাস})$ বছরের প্রতিটি সময়কাল ধরে।`),
      shortcut: t('Make a small table — capital and months for each period — and add the products; never average the old and new capitals.', 'একটি ছোট ছক তৈরি করো — প্রতিটি সময়কালের মূলধন ও মাস — এবং গুণফলগুলো যোগ করো; পুরনো ও নতুন মূলধনের গড় কখনো করো না।'),
      trap: t('The changed capital applies only from the month of the change, not for the whole year.', 'বদলানো মূলধন শুধু পরিবর্তনের মাস থেকে প্রযোজ্য, সারা বছরের জন্য নয়।'),
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
      difficulty: 'intermediate',
      typicalWording: t('“A manages the business and gets 10% of the profit for managing; the rest is divided in the ratio of capitals.”', '“A ব্যবসা দেখাশোনা করে বলে লাভের 10% পায়; বাকি লাভ মূলধনের অনুপাতে ভাগ হয়।”'),
      formula: t(r`Manager's total $=$ managing share $+$ his capital share of $($profit $-$ managing share$)$.`, r`পরিচালকের মোট $=$ পরিচালনার পাওনা $+$ $($লাভ $-$ পরিচালনার পাওনা$)$-এর মধ্যে তার মূলধনের ভাগ।`),
      shortcut: t('Find the profit left for division in one step — profit $\times (1 - \%/100)$ — then apply the capital ratio to that amount only.', 'এক ধাপে ভাগের জন্য বাকি লাভ বের করো — লাভ $\times (1 - \%/100)$ — তারপর শুধু সেই পরিমাণের উপর মূলধনের অনুপাত প্রয়োগ করো।'),
      trap: t('Do not divide the whole profit by capital first — the managing share comes off the top before the ratio split.', 'পুরো লাভ আগে মূলধনের অনুপাতে ভাগ করো না — পরিচালনার পাওনা সবার আগে বাদ যায়, তারপর অনুপাতে ভাগ হয়।'),
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
      difficulty: 'intermediate',
      typicalWording: t('“The profit is shared equally (or in a given ratio). After how many months did B join?”', '“লাভ সমান ভাগ হয় (বা নির্দিষ্ট অনুপাতে)। B কত মাস পরে যোগ দিয়েছিল?”'),
      formula: t(r`$\dfrac{C_A \times T_A}{C_B \times T_B} = \dfrac{P_A}{P_B}$; solve for the unknown time $T$.`, r`$\dfrac{C_A \times T_A}{C_B \times T_B} = \dfrac{P_A}{P_B}$; অজানা সময় $T$-এর সমাধান করো।`),
      shortcut: t('When the profit is equal, the products are equal: unknown months $=$ the other partner\'s product $\div$ his capital.', 'লাভ সমান হলে গুণফলও সমান: অজানা মাস $=$ অন্য অংশীদারের গুণফল $\div$ তার মূলধন।'),
      trap: t('Months stayed and “months after joining” are different answers: joined after $= 12 -$ months stayed.', 'কত মাস ছিল আর “কত মাস পরে যোগ দিল” — দুটি আলাদা উত্তর: যোগ দেওয়ার সময় $= 12 -$ থাকার মাস।'),
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
    // 6 ─────────────────────────────────────────────
    {
      key: 'pasture_rent',
      emoji: '🐄',
      name: t('Pasture rent shared by cattle and months', 'গরু ও মাস অনুযায়ী চারণভূমির ভাড়া ভাগ'),
      difficulty: 'beginner',
      typicalWording: t('“A grazes x cows for m months and B grazes y cows for n months in a field. How is the rent shared?”', '“A xটি গরু m মাস ও B yটি গরু n মাস মাঠে চরায়। ভাড়া কীভাবে ভাগ হবে?”'),
      formula: t(r`Rent ratio $=$ (cows $\times$ months) ratio, exactly like capital $\times$ time.`, r`ভাড়ার অনুপাত $=$ (গরুর সংখ্যা $\times$ মাস)-এর অনুপাত, ঠিক মূলধন $\times$ সময়ের মতো।`),
      shortcut: t('Treat each cow-month as one unit of “capital” and reduce the products before dividing the rent.', 'প্রতিটি গরু-মাসকে “মূলধনের” এক একক ধরো এবং ভাড়া ভাগ করার আগে গুণফলগুলো লঘিষ্ঠ করো।'),
      trap: t('Do not share the rent by the number of cows alone — a herd that stays longer pays more.', 'শুধু গরুর সংখ্যা দিয়ে ভাড়া ভাগ করো না — যে পাল বেশিদিন থাকে সে বেশি দেয়।'),
      spot: t(
        'Farmers **graze cattle** in a shared field for different numbers of months, and the **rent of the pasture** has to be divided.',
        'কৃষকরা একটি যৌথ মাঠে আলাদা আলাদা মাস ধরে **গরু চরায়**, আর **চারণভূমির ভাড়া** ভাগ করতে হয়।',
      ),
      method: [
        t('For each farmer, multiply the number of cows by the months he used the field.', 'প্রত্যেক কৃষকের জন্য গরুর সংখ্যা × সে কত মাস মাঠ ব্যবহার করেছে, গুণ করো।'),
        t('Write these products as a ratio and simplify it.', 'এই গুণফলগুলো অনুপাতে লিখে সরল করো।'),
        t('Divide the total rent in that ratio.', 'মোট ভাড়া সেই অনুপাতে ভাগ করো।'),
      ],
      example: {
        question: t('A grazes $30$ cows for $4$ months, B grazes $20$ cows for $9$ months and C grazes $40$ cows for $3$ months in a field. The rent is ₹$2100$. How much should each pay?', 'A $30$টি গরু $4$ মাস, B $20$টি গরু $9$ মাস এবং C $40$টি গরু $3$ মাস একটি মাঠে চরায়। ভাড়া ₹$2100$। কে কত দেবে?'),
        steps: [
          t(r`A: $30 \times 4 = 120$. B: $20 \times 9 = 180$. C: $40 \times 3 = 120$.`, r`A-এর হিসাব: $30 \times 4 = 120$। B-এর হিসাব: $20 \times 9 = 180$। C-এর হিসাব: $40 \times 3 = 120$।`),
          t(r`Ratio $= 120 : 180 : 120 = 2 : 3 : 2$. Total parts $= 7$.`, r`অনুপাত $= 120 : 180 : 120 = 2 : 3 : 2$। মোট অংশ $= 7$।`),
          t(r`A pays $\dfrac{2}{7} \times 2100 = 600$, B pays $\dfrac{3}{7} \times 2100 = 900$, C pays $600$.`, r`A দেবে $\dfrac{2}{7} \times 2100 = 600$, B দেবে $\dfrac{3}{7} \times 2100 = 900$, C দেবে $600$।`),
        ],
        answer: t('A pays ₹$600$, B pays ₹$900$, C pays ₹$600$.', 'A দেবে ₹$600$, B দেবে ₹$900$, C দেবে ₹$600$।'),
      },
      tryIt: {
        question: t('A grazes $20$ cows for $6$ months and B grazes $25$ cows for $8$ months in a field. The rent is ₹$1600$. How much should B pay?', 'A $20$টি গরু $6$ মাস এবং B $25$টি গরু $8$ মাস একটি মাঠে চরায়। ভাড়া ₹$1600$। B কত দেবে?'),
        options: [t('₹600', '₹600'), t('₹1000', '₹1000'), t('₹800', '₹800'), t('₹1200', '₹1200')],
        correct: 1,
        explanation: [
          t(r`A: $20 \times 6 = 120$. B: $25 \times 8 = 200$. Ratio $= 3 : 5$.`, r`A-এর হিসাব: $20 \times 6 = 120$। B-এর হিসাব: $25 \times 8 = 200$। অনুপাত $= 3 : 5$।`),
          t(r`B pays $\dfrac{5}{8} \times 1600 = 1000$. (₹$600$ is what A pays.)`, r`B দেবে $\dfrac{5}{8} \times 1600 = 1000$। (₹$600$ হল A-এর দেওয়ার কথা।)`),
        ],
      },
    },
    // 7 ─────────────────────────────────────────────
    {
      key: 'loss_distribution',
      emoji: '📉',
      name: t('Loss shared in the capital ratio', 'মূলধনের অনুপাতে ক্ষতি ভাগ'),
      difficulty: 'beginner',
      typicalWording: t('“The business makes a loss of ₹Z in the year. How much loss does each partner bear?”', '“বছরে ব্যবসায় ₹Z ক্ষতি হয়। প্রত্যেক অংশীদার কত ক্ষতি বহন করবে?”'),
      formula: t(r`Loss is shared in the same ratio as profit: $C_1T_1 : C_2T_2$.`, r`ক্ষতি লাভের একই অনুপাতে ভাগ হয়: $C_1T_1 : C_2T_2$।`),
      shortcut: t('Use the profit-sharing method unchanged — find one part = loss ÷ total parts, then multiply by each partner\'s parts.', 'লাভ ভাগের পদ্ধতিই অপরিবর্তিত রাখো — এক অংশ = ক্ষতি ÷ মোট অংশ বের করে প্রত্যেকের অংশ দিয়ে গুণ করো।'),
      trap: t('A loss is not shared equally, and not in the inverse ratio — it follows the same capital ratio as a profit.', 'ক্ষতি সমান ভাগে বা ব্যস্ত অনুপাতে ভাগ হয় না — লাভের মতোই মূলধনের অনুপাতে ভাগ হয়।'),
      spot: t(
        'The business ends in a **loss** instead of a profit, and each partner\'s share of the loss is asked.',
        'ব্যবসায় লাভের বদলে **ক্ষতি** হয়, আর প্রত্যেক অংশীদারের ক্ষতির ভাগ জানতে চাওয়া হয়।',
      ),
      method: [
        t('Write the investments (× months, if times differ) as a ratio and simplify.', 'মূলধনগুলো (সময় আলাদা হলে × মাস) অনুপাতে লিখে সরল করো।'),
        t('Add the ratio parts to get the total parts.', 'অনুপাতের অংশগুলো যোগ করে মোট অংশ বের করো।'),
        t(r`Each partner's loss $= \dfrac{\text{own parts}}{\text{total parts}} \times \text{total loss}$.`, r`প্রত্যেকের ক্ষতি $= \dfrac{\text{নিজের অংশ}}{\text{মোট অংশ}} \times \text{মোট ক্ষতি}$।`),
      ],
      example: {
        question: t('A invests ₹$5000$ and B invests ₹$7000$ in a business for one year. The business makes a loss of ₹$2400$. How much loss does each bear?', 'A ₹$5000$ এবং B ₹$7000$ দিয়ে এক বছরের জন্য ব্যবসা করে। ব্যবসায় ₹$2400$ ক্ষতি হলে কে কত ক্ষতি বহন করবে?'),
        steps: [
          t(r`Ratio $= 5000 : 7000 = 5 : 7$. Total parts $= 12$.`, r`অনুপাত $= 5000 : 7000 = 5 : 7$। মোট অংশ $= 12$।`),
          t(r`A's loss $= \dfrac{5}{12} \times 2400 = 1000$.`, r`A-এর ক্ষতি $= \dfrac{5}{12} \times 2400 = 1000$।`),
          t(r`B's loss $= \dfrac{7}{12} \times 2400 = 1400$.`, r`B-এর ক্ষতি $= \dfrac{7}{12} \times 2400 = 1400$।`),
        ],
        answer: t('A bears ₹$1000$ loss, B bears ₹$1400$ loss.', 'A বহন করবে ₹$1000$ ক্ষতি, B বহন করবে ₹$1400$ ক্ষতি।'),
      },
      tryIt: {
        question: t('A, B and C invest ₹$8000$, ₹$12000$ and ₹$10000$ for one year. The business makes a loss of ₹$6000$. How much loss does C bear?', 'A, B ও C এক বছরের জন্য যথাক্রমে ₹$8000$, ₹$12000$ ও ₹$10000$ বিনিয়োগ করে। ব্যবসায় ₹$6000$ ক্ষতি হলে C কত ক্ষতি বহন করবে?'),
        options: [t('₹1600', '₹1600'), t('₹2000', '₹2000'), t('₹2400', '₹2400'), t('₹3000', '₹3000')],
        correct: 1,
        explanation: [
          t(r`Ratio $= 8000 : 12000 : 10000 = 4 : 6 : 5$. Total parts $= 15$.`, r`অনুপাত $= 8000 : 12000 : 10000 = 4 : 6 : 5$। মোট অংশ $= 15$।`),
          t(r`C's loss $= \dfrac{5}{15} \times 6000 = 2000$. (₹$1600$ is A's loss and ₹$2400$ is B's.)`, r`C-এর ক্ষতি $= \dfrac{5}{15} \times 6000 = 2000$। (₹$1600$ হল A-এর ক্ষতি, ₹$2400$ হল B-এর।)`),
        ],
      },
    },
    // 8 ─────────────────────────────────────────────
    {
      key: 'find_unknown_capital',
      emoji: '🔍',
      name: t('Find the unknown capital from profit shares', 'লাভের ভাগ থেকে অজানা মূলধন নির্ণয়'),
      difficulty: 'intermediate',
      typicalWording: t('“A invests ₹X for the year. B invests an unknown amount for some months. The profits are equal (or in a given ratio) — find B\'s capital.”', '“A সারা বছর ₹X বিনিয়োগ করে। B কিছু মাসের জন্য অজানা পরিমাণ বিনিয়োগ করে। লাভ সমান (বা নির্দিষ্ট অনুপাতে) — B-এর মূলধন বের করো।”'),
      formula: t(r`$\dfrac{C_A \times T_A}{C_B \times T_B} = \dfrac{P_A}{P_B}$; cross-multiply and solve for the unknown capital.`, r`$\dfrac{C_A \times T_A}{C_B \times T_B} = \dfrac{P_A}{P_B}$; আড়গুণন করে অজানা মূলধনের সমাধান করো।`),
      shortcut: t('When the profits are equal, skip the equation: unknown capital = the other partner\'s (capital × months) ÷ his own months.', 'লাভ সমান হলে সমীকরণ ছাড়াই হয়: অজানা মূলধন = অন্য অংশীদারের (মূলধন × মাস) ÷ তার নিজের মাস।'),
      trap: t('Keep the order matched on both sides: A\'s profit ratio part goes with A\'s capital × time, not with B\'s.', 'দুই পাশে ক্রম মেলাও: A-এর লাভের অংশ A-এর মূলধন × সময়ের সঙ্গে যাবে, B-এর সঙ্গে নয়।'),
      spot: t(
        'One partner\'s **capital is not given**; the other partner\'s capital and time, the unknown partner\'s time, and the **profit ratio** are given.',
        'একজন অংশীদারের **মূলধন দেওয়া নেই**; অন্য অংশীদারের মূলধন ও সময়, অজানা অংশীদারের সময় এবং **লাভের অনুপাত** দেওয়া থাকে।',
      ),
      method: [
        t('Let the unknown capital be $x$.', 'অজানা মূলধন $x$ ধরো।'),
        t(r`Write each partner's $\text{capital} \times \text{months}$, keeping $x$ in the unknown partner's product.`, r`প্রত্যেক অংশীদারের $\text{মূলধন} \times \text{মাস}$ লেখো, অজানা অংশীদারের গুণফলে $x$ রাখো।`),
        t('Set the ratio of the products equal to the given profit ratio and solve for $x$.', 'গুণফলগুলোর অনুপাতকে দেওয়া লাভের অনুপাতের সমান ধরে $x$-এর সমাধান করো।'),
      ],
      example: {
        question: t('A invests ₹$12000$ for $12$ months. B invests an unknown amount for $8$ months. At the end of the year the profits of A and B are equal. How much did B invest?', 'A $12$ মাসের জন্য ₹$12000$ বিনিয়োগ করে। B $8$ মাসের জন্য অজানা পরিমাণ বিনিয়োগ করে। বছর শেষে A ও B-এর লাভ সমান হয়। B কত বিনিয়োগ করেছিল?'),
        steps: [
          t(r`A's product $= 12000 \times 12 = 144000$.`, r`A-এর গুণফল $= 12000 \times 12 = 144000$।`),
          t('Equal profits mean equal products, so B\'s product is also $144000$.', 'লাভ সমান মানে গুণফলও সমান, তাই B-এর গুণফলও $144000$।'),
          t(r`B's capital $= 144000 \div 8 = 18000$.`, r`B-এর মূলধন $= 144000 \div 8 = 18000$।`),
        ],
        answer: t('B invested ₹$18000$.', 'B বিনিয়োগ করেছিল ₹$18000$।'),
      },
      tryIt: {
        question: t('A invests ₹$10000$ for $12$ months. B invests an unknown amount for $6$ months. The profit is shared in the ratio $2 : 3$ (A : B). Find B\'s capital.', 'A $12$ মাসের জন্য ₹$10000$ বিনিয়োগ করে। B $6$ মাসের জন্য অজানা পরিমাণ বিনিয়োগ করে। লাভ $2 : 3$ (A : B) অনুপাতে ভাগ হয়। B-এর মূলধন কত?'),
        options: [t('₹20000', '₹20000'), t('₹30000', '₹30000'), t('₹15000', '₹15000'), t('₹25000', '₹25000')],
        correct: 1,
        explanation: [
          t(r`Let B's capital be $x$: $\dfrac{10000 \times 12}{x \times 6} = \dfrac{2}{3}$.`, r`ধরো B-এর মূলধন $x$: $\dfrac{10000 \times 12}{x \times 6} = \dfrac{2}{3}$।`),
          t(r`Cross-multiplying: $120000 \times 3 = 2 \times 6x$, so $360000 = 12x$ and $x = 30000$.`, r`আড়গুণন করে: $120000 \times 3 = 2 \times 6x$, তাই $360000 = 12x$ এবং $x = 30000$।`),
        ],
      },
    },
    // 9 ─────────────────────────────────────────────
    {
      key: 'charity_then_divide',
      emoji: '🤲',
      name: t('Charity deducted first, then profit shared', 'আগে দান বাদ দিয়ে তারপর লাভ ভাগ'),
      difficulty: 'intermediate',
      typicalWording: t('“5% of the profit is given to charity and the remaining profit is shared between A and B in the ratio of their capitals.”', '“লাভের 5% দান করা হয় এবং বাকি লাভ A ও B-এর মধ্যে মূলধনের অনুপাতে ভাগ করা হয়।”'),
      formula: t(r`Divisible profit $=$ profit $\times \left(1 - \dfrac{\text{charity}\%}{100}\right)$; then share it by capital $\times$ time.`, r`ভাগযোগ্য লাভ $=$ লাভ $\times \left(1 - \dfrac{\text{দানের}\ \%}{100}\right)$; তারপর মূলধন $\times$ সময় অনুযায়ী ভাগ করো।`),
      shortcut: t('Reduce the profit to the divisible amount in a single multiplication (5% charity → multiply by $0.95$) before applying the ratio.', 'অনুপাত প্রয়োগের আগে একটিমাত্র গুণে লাভকে ভাগযোগ্য পরিমাণে নামাও (5% দান → $0.95$ দিয়ে গুণ)।'),
      trap: t('Do not share the full profit by capital and ignore the charity — the charity part never reaches the partners.', 'দান উপেক্ষা করে পুরো লাভ মূলধনের অনুপাতে ভাগ করো না — দানের অংশ অংশীদারদের কাছে পৌঁছায়ই না।'),
      spot: t(
        'A percentage of the profit is first **given away as charity or donation**, and only the **remaining** profit is shared between the partners.',
        'লাভের একটি শতাংশ আগে **দান হিসেবে দেওয়া হয়**, এবং শুধু **বাকি** লাভ অংশীদারদের মধ্যে ভাগ হয়।',
      ),
      method: [
        t('Find the charity amount = given % of the total profit.', 'দানের পরিমাণ = মোট লাভের দেওয়া % বের করো।'),
        t('Remaining profit = total profit − charity.', 'বাকি লাভ = মোট লাভ − দান।'),
        t('Share the remaining profit in the ratio of capitals (× months, if times differ).', 'বাকি লাভ মূলধনের অনুপাতে (সময় আলাদা হলে × মাস) ভাগ করো।'),
      ],
      example: {
        question: t('A invests ₹$30000$ and B invests ₹$20000$ for one year. Out of a profit of ₹$20000$, $5\\%$ is given to charity and the rest is shared by capital. Find A\'s share.', 'A ₹$30000$ ও B ₹$20000$ এক বছরের জন্য বিনিয়োগ করে। ₹$20000$ লাভ থেকে $5\\%$ দান করা হয় এবং বাকি লাভ মূলধনের অনুপাতে ভাগ হয়। A-এর ভাগ কত?'),
        steps: [
          t('Charity $= 5\\%$ of $20000 = 1000$. Remaining profit $= 20000 - 1000 = 19000$.', 'দান $= 20000$-এর $5\\% = 1000$। বাকি লাভ $= 20000 - 1000 = 19000$।'),
          t(r`Capital ratio $= 30000 : 20000 = 3 : 2$. Total parts $= 5$.`, r`মূলধনের অনুপাত $= 30000 : 20000 = 3 : 2$। মোট অংশ $= 5$।`),
          t(r`A's share $= \dfrac{3}{5} \times 19000 = 11400$. (B gets $7600$.)`, r`A-এর ভাগ $= \dfrac{3}{5} \times 19000 = 11400$। (B পাবে $7600$।)`),
        ],
        answer: t('A gets ₹$11400$.', 'A পাবে ₹$11400$।'),
      },
      tryIt: {
        question: t('A invests ₹$20000$ and B invests ₹$10000$ for one year. Out of a profit of ₹$15000$, $10\\%$ is given to charity and the rest is shared by capital. Find B\'s share.', 'A ₹$20000$ ও B ₹$10000$ এক বছরের জন্য বিনিয়োগ করে। ₹$15000$ লাভ থেকে $10\\%$ দান করা হয় এবং বাকি লাভ মূলধনের অনুপাতে ভাগ হয়। B-এর ভাগ কত?'),
        options: [t('₹5000', '₹5000'), t('₹4500', '₹4500'), t('₹6000', '₹6000'), t('₹4000', '₹4000')],
        correct: 1,
        explanation: [
          t('Charity $= 10\\%$ of $15000 = 1500$. Remaining profit $= 13500$.', 'দান $= 15000$-এর $10\\% = 1500$। বাকি লাভ $= 13500$।'),
          t(r`Capital ratio $= 2 : 1$. B's share $= \dfrac{1}{3} \times 13500 = 4500$. (₹$5000$ forgets the charity.)`, r`মূলধনের অনুপাত $= 2 : 1$। B-এর ভাগ $= \dfrac{1}{3} \times 13500 = 4500$। (₹$5000$ নিলে দান বাদ দিতে ভুলে যাওয়া হয়।)`),
        ],
      },
    },
    // 10 ─────────────────────────────────────────────
    {
      key: 'profit_percent_on_capital',
      emoji: '📈',
      name: t('Profit as a percentage of own capital', 'নিজের মূলধনের শতাংশ হিসেবে লাভ'),
      difficulty: 'intermediate',
      typicalWording: t('“What percentage profit did B make on his own investment?”', '“B তার নিজের বিনিয়োগের উপর কত শতাংশ লাভ করল?”'),
      formula: t(r`Return $\% = \dfrac{\text{partner's profit share}}{\text{his own capital}} \times 100$.`, r`লাভের $\% = \dfrac{\text{অংশীদারের লাভের ভাগ}}{\text{তার নিজের মূলধন}} \times 100$।`),
      shortcut: t('The direct method is already the fastest: share first by capital × time, then one division by his own capital. Do not average the two partners\' percentages.', 'সরাসরি পদ্ধতিই সবচেয়ে দ্রুত: আগে মূলধন × সময় অনুযায়ী ভাগ, তারপর তার নিজের মূলধন দিয়ে একটি ভাগ। দুই অংশীদারের শতাংশের গড় করো না।'),
      trap: t('The base of the percentage is his own capital — dividing his profit by the total capital or by the total profit gives a wrong answer.', 'শতাংশের ভিত্তি তার নিজের মূলধন — তার লাভকে মোট মূলধন বা মোট লাভ দিয়ে ভাগ করলে ভুল উত্তর আসে।'),
      spot: t(
        'After the profit is shared, the question asks for one partner\'s profit **as a percentage of that partner\'s own capital**.',
        'লাভ ভাগ হওয়ার পর জানতে চাওয়া হয় কোনো অংশীদারের লাভ **তার নিজের মূলধনের কত শতাংশ**।',
      ),
      method: [
        t(r`Find each partner's $\text{capital} \times \text{months}$ and the profit ratio.`, r`প্রত্যেক অংশীদারের $\text{মূলধন} \times \text{মাস}$ ও লাভের অনুপাত বের করো।`),
        t('Find the required partner\'s share of the total profit.', 'প্রয়োজনীয় অংশীদারের মোট লাভের ভাগ বের করো।'),
        t(r`Percentage $= \dfrac{\text{his share}}{\text{his capital}} \times 100$.`, r`শতাংশ $= \dfrac{\text{তার ভাগ}}{\text{তার মূলধন}} \times 100$।`),
      ],
      example: {
        question: t('A invests ₹$30000$ for $12$ months and B invests ₹$20000$ for $6$ months. The total profit is ₹$12000$. What percentage profit did B make on his own capital?', 'A $12$ মাসের জন্য ₹$30000$ এবং B $6$ মাসের জন্য ₹$20000$ বিনিয়োগ করে। মোট লাভ ₹$12000$। B তার নিজের মূলধনের উপর কত শতাংশ লাভ করল?'),
        steps: [
          t(r`A: $30000 \times 12 = 360000$. B: $20000 \times 6 = 120000$. Ratio $= 3 : 1$.`, r`A-এর হিসাব: $30000 \times 12 = 360000$। B-এর হিসাব: $20000 \times 6 = 120000$। অনুপাত $= 3 : 1$।`),
          t(r`B's share $= \dfrac{1}{4} \times 12000 = 3000$.`, r`B-এর ভাগ $= \dfrac{1}{4} \times 12000 = 3000$।`),
          t(r`B's return $= \dfrac{3000}{20000} \times 100 = 15\%$.`, r`B-এর লাভের হার $= \dfrac{3000}{20000} \times 100 = 15\%$।`),
        ],
        answer: t('B made $15\\%$ profit on his capital.', 'B তার মূলধনের উপর $15\\%$ লাভ করেছে।'),
      },
      tryIt: {
        question: t('A invests ₹$60000$ for $12$ months and B invests ₹$30000$ for $8$ months. The total profit is ₹$12000$. What percentage profit did B make on his own capital?', 'A $12$ মাসের জন্য ₹$60000$ এবং B $8$ মাসের জন্য ₹$30000$ বিনিয়োগ করে। মোট লাভ ₹$12000$। B তার নিজের মূলধনের উপর কত শতাংশ লাভ করল?'),
        options: [t('15%', '15%'), t('10%', '10%'), t('20%', '20%'), t('7.5%', '7.5%')],
        correct: 1,
        explanation: [
          t(r`A: $60000 \times 12 = 720000$. B: $30000 \times 8 = 240000$. Ratio $= 3 : 1$.`, r`A-এর হিসাব: $60000 \times 12 = 720000$। B-এর হিসাব: $30000 \times 8 = 240000$। অনুপাত $= 3 : 1$।`),
          t(r`B's share $= \dfrac{1}{4} \times 12000 = 3000$. Return $= \dfrac{3000}{30000} \times 100 = 10\%$. ($15\%$ is A's return.)`, r`B-এর ভাগ $= \dfrac{1}{4} \times 12000 = 3000$। লাভের হার $= \dfrac{3000}{30000} \times 100 = 10\%$। ($15\%$ হল A-এর লাভের হার।)`),
        ],
      },
    },
    // 11 ─────────────────────────────────────────────
    {
      key: 'salary_plus_share',
      emoji: '💼',
      name: t('Working partner takes a monthly salary first', 'কর্মরত অংশীদার আগে মাসিক বেতন নেয়'),
      difficulty: 'advanced',
      typicalWording: t('“A looks after the business and gets a salary of ₹500 per month out of the profit; the remaining profit is shared in the ratio of capitals.”', '“A ব্যবসা দেখাশোনা করে এবং লাভ থেকে মাসে ₹500 বেতন পায়; বাকি লাভ মূলধনের অনুপাতে ভাগ হয়।”'),
      formula: t(r`Yearly salary $=$ monthly salary $\times 12$; manager's total $=$ yearly salary $+$ his capital share of (profit $-$ yearly salary).`, r`বার্ষিক বেতন $=$ মাসিক বেতন $\times 12$; পরিচালকের মোট $=$ বার্ষিক বেতন $+$ (লাভ $-$ বার্ষিক বেতন)-এর মধ্যে তার মূলধনের ভাগ।`),
      shortcut: t('Convert the salary to a yearly amount and subtract it once, right at the start — after that it is a plain capital-ratio split.', 'বেতনকে বার্ষিক পরিমাণে বদলে শুরুতেই একবার বিয়োগ করো — তারপর এটি সাধারণ মূলধন-অনুপাতের ভাগ।'),
      trap: t('Subtracting only one month\'s salary from the yearly profit, or sharing the full profit by capital before removing the salary.', 'বার্ষিক লাভ থেকে মাত্র এক মাসের বেতন বিয়োগ করা, অথবা বেতন বাদ দেওয়ার আগে পুরো লাভ মূলধনের অনুপাতে ভাগ করা।'),
      spot: t(
        'The managing partner is paid a **fixed salary per month** out of the profit (not a percentage of it), and the **rest** is shared by capital.',
        'পরিচালক অংশীদার লাভ থেকে **প্রতি মাসে নির্দিষ্ট বেতন** পায় (লাভের শতাংশ নয়), আর **বাকি** লাভ মূলধনের অনুপাতে ভাগ হয়।',
      ),
      method: [
        t('Yearly salary = monthly salary × 12. Take it out of the profit first.', 'বার্ষিক বেতন = মাসিক বেতন × 12। লাভ থেকে আগে তা বাদ দাও।'),
        t('Share the remaining profit in the ratio of capitals.', 'বাকি লাভ মূলধনের অনুপাতে ভাগ করো।'),
        t('Manager\'s total = yearly salary + his part of the remaining profit.', 'পরিচালকের মোট = বার্ষিক বেতন + বাকি লাভে তার ভাগ।'),
      ],
      example: {
        question: t('A invests ₹$50000$ and B invests ₹$30000$. A manages the business and gets a salary of ₹$500$ per month out of the profit; the rest is shared by capital. Out of a yearly profit of ₹$22000$, how much does A get in all?', 'A ₹$50000$ ও B ₹$30000$ বিনিয়োগ করে। A ব্যবসা দেখাশোনা করে লাভ থেকে মাসে ₹$500$ বেতন পায়; বাকি লাভ মূলধনের অনুপাতে ভাগ হয়। বার্ষিক ₹$22000$ লাভ হলে A মোট কত পাবে?'),
        steps: [
          t('Yearly salary $= 500 \\times 12 = 6000$. Remaining profit $= 22000 - 6000 = 16000$.', 'বার্ষিক বেতন $= 500 \\times 12 = 6000$। বাকি লাভ $= 22000 - 6000 = 16000$।'),
          t(r`Capital ratio $= 50000 : 30000 = 5 : 3$. A's part of the rest $= \dfrac{5}{8} \times 16000 = 10000$.`, r`মূলধনের অনুপাত $= 50000 : 30000 = 5 : 3$। বাকি লাভে A-এর ভাগ $= \dfrac{5}{8} \times 16000 = 10000$।`),
          t('A gets $6000 + 10000 = 16000$ in all. (B gets $6000$.)', 'A মোট পায় $6000 + 10000 = 16000$। (B পায় $6000$।)'),
        ],
        answer: t('A gets ₹$16000$ in all.', 'A মোট পাবে ₹$16000$।'),
      },
      tryIt: {
        question: t('A invests ₹$60000$ and B invests ₹$40000$. B manages the business and gets a salary of ₹$1000$ per month out of the profit; the rest is shared by capital. Out of a yearly profit of ₹$32000$, how much does B get in all?', 'A ₹$60000$ ও B ₹$40000$ বিনিয়োগ করে। B ব্যবসা দেখাশোনা করে লাভ থেকে মাসে ₹$1000$ বেতন পায়; বাকি লাভ মূলধনের অনুপাতে ভাগ হয়। বার্ষিক ₹$32000$ লাভ হলে B মোট কত পাবে?'),
        options: [t('₹8000', '₹8000'), t('₹12800', '₹12800'), t('₹20000', '₹20000'), t('₹12000', '₹12000')],
        correct: 2,
        explanation: [
          t('Yearly salary $= 1000 \\times 12 = 12000$. Remaining profit $= 32000 - 12000 = 20000$.', 'বার্ষিক বেতন $= 1000 \\times 12 = 12000$। বাকি লাভ $= 32000 - 12000 = 20000$।'),
          t(r`Capital ratio $= 3 : 2$. B's part of the rest $= \dfrac{2}{5} \times 20000 = 8000$.`, r`মূলধনের অনুপাত $= 3 : 2$। বাকি লাভে B-এর ভাগ $= \dfrac{2}{5} \times 20000 = 8000$।`),
          t('B gets $12000 + 8000 = 20000$. (₹$8000$ forgets the salary; ₹$12800$ shares the full profit.)', 'B পায় $12000 + 8000 = 20000$। (₹$8000$ নিলে বেতন বাদ পড়ে; ₹$12800$ হলে পুরো লাভ ভাগ করা হয়।)'),
        ],
      },
    },
    // 12 ─────────────────────────────────────────────
    {
      key: 'withdraw_add_capital',
      emoji: '🔄',
      name: t('Partner withdraws or adds a fraction of his capital', 'অংশীদার নিজের মূলধনের ভগ্নাংশ তোলে বা যোগ করে'),
      difficulty: 'advanced',
      typicalWording: t('“After 6 months, A withdraws 1/4 of his capital” or “After 4 months, A increases his capital by 1/3.”', '“6 মাস পরে A তার মূলধনের 1/4 তুলে নেয়” বা “4 মাস পরে A তার মূলধন 1/3 বাড়ায়।”'),
      formula: t(r`New capital $=$ old capital $\times \left(1 \pm \text{fraction}\right)$; effective investment $= \sum (\text{capital} \times \text{months})$ over the periods.`, r`নতুন মূলধন $=$ পুরনো মূলধন $\times \left(1 \pm \text{ভগ্নাংশ}\right)$; কার্যকর বিনিয়োগ $= \sum (\text{মূলধন} \times \text{মাস})$ প্রতিটি সময়কাল ধরে।`),
      shortcut: t('First turn the fraction into the new capital amount (1/4 withdrawn from ₹48000 leaves ₹36000); only then build the two period products.', 'আগে ভগ্নাংশটিকে নতুন মূলধনের পরিমাণে বদলাও (₹48000 থেকে 1/4 তুললে থাকে ₹36000); তারপরেই দুই সময়কালের গুণফল তৈরি করো।'),
      trap: t('The fraction is taken from his capital, not from the profit, and the changed capital runs only for the remaining months.', 'ভগ্নাংশটি তার মূলধন থেকে নেওয়া হয়, লাভ থেকে নয়, এবং বদলানো মূলধন শুধু বাকি মাসগুলোর জন্য চলে।'),
      spot: t(
        'A partner changes **his own** capital mid-year by a **fraction** — like withdrawing $\\frac{1}{4}$ of it or adding $\\frac{1}{3}$ more. Nobody joins or leaves the business.',
        'একজন অংশীদার বছরের মাঝে **নিজের** মূলধন **ভগ্নাংশ** অনুযায়ী বদলায় — যেমন $\\frac{1}{4}$ অংশ তুলে নেয় বা $\\frac{1}{3}$ বেশি যোগ করে। কেউ ব্যবসায় যোগ দেয় বা ছেড়ে যায় না।',
      ),
      method: [
        t('Find the capital after the change: apply the fraction to the starting capital.', 'পরিবর্তনের পরের মূলধন বের করো: শুরুর মূলধনের উপর ভগ্নাংশটি প্রয়োগ করো।'),
        t('Split his year into two periods — before the change and after it.', 'তার বছরটিকে দুই ভাগে ভাগ করো — পরিবর্তনের আগে ও পরে।'),
        t(r`Add the two $\text{capital} \times \text{months}$ products to get his effective investment.`, r`দুটি $\text{মূলধন} \times \text{মাস}$ গুণফল যোগ করে তার কার্যকর বিনিয়োগ বের করো।`),
        t('Share the profit in the ratio of the effective investments.', 'কার্যকর বিনিয়োগের অনুপাতে লাভ ভাগ করো।'),
      ],
      example: {
        question: t('A invests ₹$48000$. After $6$ months he withdraws $\\frac{1}{4}$ of his capital. B invests ₹$36000$ for the whole year. Find A\'s share of a profit of ₹$26000$.', 'A ₹$48000$ বিনিয়োগ করে। $6$ মাস পরে সে তার মূলধনের $\\frac{1}{4}$ অংশ তুলে নেয়। B সারা বছর ₹$36000$ রাখে। ₹$26000$ লাভের মধ্যে A-এর ভাগ কত?'),
        steps: [
          t(r`Withdrawn $= \dfrac{1}{4} \times 48000 = 12000$, so A's capital for the last $6$ months $= 48000 - 12000 = 36000$.`, r`তোলা হয় $= \dfrac{1}{4} \times 48000 = 12000$, তাই শেষ $6$ মাসে A-এর মূলধন $= 48000 - 12000 = 36000$।`),
          t(r`A: $48000 \times 6 + 36000 \times 6 = 288000 + 216000 = 504000$. B: $36000 \times 12 = 432000$.`, r`A-এর হিসাব: $48000 \times 6 + 36000 \times 6 = 288000 + 216000 = 504000$। B-এর হিসাব: $36000 \times 12 = 432000$।`),
          t(r`Ratio $= 504000 : 432000 = 7 : 6$. Total $= 13$ parts.`, r`অনুপাত $= 504000 : 432000 = 7 : 6$। মোট $= 13$ অংশ।`),
          t(r`A's share $= \dfrac{7}{13} \times 26000 = 14000$.`, r`A-এর ভাগ $= \dfrac{7}{13} \times 26000 = 14000$।`),
        ],
        answer: t('A gets ₹$14000$.', 'A পাবে ₹$14000$।'),
      },
      tryIt: {
        question: t('A invests ₹$60000$. After $4$ months he adds $\\frac{1}{3}$ more to his capital. B invests ₹$50000$ for the whole year. Find A\'s share of a profit of ₹$18500$.', 'A ₹$60000$ বিনিয়োগ করে। $4$ মাস পরে সে তার মূলধনের আরও $\\frac{1}{3}$ অংশ যোগ করে। B সারা বছর ₹$50000$ রাখে। ₹$18500$ লাভের মধ্যে A-এর ভাগ কত?'),
        options: [t('₹7500', '₹7500'), t('₹11000', '₹11000'), t('₹9250', '₹9250'), t('₹10000', '₹10000')],
        correct: 1,
        explanation: [
          t(r`Added $= \dfrac{1}{3} \times 60000 = 20000$, so A's new capital $= 80000$.`, r`যোগ হয় $= \dfrac{1}{3} \times 60000 = 20000$, তাই A-এর নতুন মূলধন $= 80000$।`),
          t(r`A: $60000 \times 4 + 80000 \times 8 = 240000 + 640000 = 880000$. B: $50000 \times 12 = 600000$.`, r`A-এর হিসাব: $60000 \times 4 + 80000 \times 8 = 240000 + 640000 = 880000$। B-এর হিসাব: $50000 \times 12 = 600000$।`),
          t(r`Ratio $= 22 : 15$. Total $= 37$ parts. A's share $= \dfrac{22}{37} \times 18500 = 11000$.`, r`অনুপাত $= 22 : 15$। মোট $= 37$ অংশ। A-এর ভাগ $= \dfrac{22}{37} \times 18500 = 11000$।`),
        ],
      },
    },
    // 13 ─────────────────────────────────────────────
    {
      key: 'equal_profit_inverse',
      emoji: '⚖️',
      name: t('Equal profits: capitals are inverse to times', 'সমান লাভ: মূলধন সময়ের ব্যস্ত অনুপাতে থাকে'),
      difficulty: 'advanced',
      typicalWording: t('“A and B invest for different periods and earn equal profits. Together they invest ₹Z — find each one\'s capital.”', '“A ও B আলাদা সময়ের জন্য বিনিয়োগ করে সমান লাভ পায়। দুজনে মিলে ₹Z বিনিয়োগ করে — প্রত্যেকের মূলধন বের করো।”'),
      formula: t(r`Equal profit $\Rightarrow C_A \times T_A = C_B \times T_B$, so $C_A : C_B = T_B : T_A$ — the inverse of the time ratio.`, r`সমান লাভ $\Rightarrow C_A \times T_A = C_B \times T_B$, তাই $C_A : C_B = T_B : T_A$ — সময়ের অনুপাতের ব্যস্ত অনুপাত।`),
      shortcut: t('Flip the time ratio to get the capital ratio directly, then split the total capital in that flipped ratio — no equation needed.', 'সময়ের অনুপাত উল্টে দিলেই মূলধনের অনুপাত পাওয়া যায়, তারপর মোট মূলধন সেই উল্টানো অনুপাতে ভাগ করো — সমীকরণের দরকার নেই।'),
      trap: t('Using the time ratio itself as the capital ratio. The partner who stays for less time must invest more to earn the same profit.', 'সময়ের অনুপাতকেই মূলধনের অনুপাত ধরা। যে কম সময় থাকে তাকে সমান লাভের জন্য বেশি বিনিয়োগ করতে হয়।'),
      spot: t(
        'The two partners earn **equal profits** even though they stayed for **different periods**, and a capital — or the split of a total capital — is asked.',
        'দুই অংশীদার **আলাদা সময়** থাকলেও **সমান লাভ** পায়, আর কোনো মূলধন — বা মোট মূলধনের ভাগ — জানতে চাওয়া হয়।',
      ),
      method: [
        t('Equal profits mean the two capital × time products are equal.', 'লাভ সমান মানে দুটি মূলধন × সময় গুণফল সমান।'),
        t('So the capital ratio is the inverse (flipped) time ratio.', 'তাই মূলধনের অনুপাত হল সময়ের অনুপাতের ব্যস্ত (উল্টানো) অনুপাত।'),
        t('Split the total capital in this inverse ratio, or solve the product equation for the one unknown capital.', 'মোট মূলধন এই ব্যস্ত অনুপাতে ভাগ করো, অথবা গুণফলের সমীকরণ থেকে একটি অজানা মূলধন বের করো।'),
      ],
      example: {
        question: t('A invests his capital for $9$ months and B invests his for $12$ months. Together they invest ₹$35000$ and at the end of the year their profits are equal. Find A\'s capital.', 'A তার মূলধন $9$ মাস এবং B তার মূলধন $12$ মাস বিনিয়োগ করে। দুজনে মিলে ₹$35000$ বিনিয়োগ করে এবং বছর শেষে তাদের লাভ সমান হয়। A-এর মূলধন কত?'),
        steps: [
          t('Equal profits: $C_A \\times 9 = C_B \\times 12$, so $C_A : C_B = 12 : 9 = 4 : 3$.', 'লাভ সমান: $C_A \\times 9 = C_B \\times 12$, তাই $C_A : C_B = 12 : 9 = 4 : 3$।'),
          t(r`Total parts $= 7$. A's capital $= \dfrac{4}{7} \times 35000 = 20000$.`, r`মোট অংশ $= 7$। A-এর মূলধন $= \dfrac{4}{7} \times 35000 = 20000$।`),
          t('Check: $20000 \\times 9 = 180000$ and $15000 \\times 12 = 180000$ — the products match.', 'যাচাই: $20000 \\times 9 = 180000$ এবং $15000 \\times 12 = 180000$ — গুণফল মিলে গেছে।'),
        ],
        answer: t('A\'s capital is ₹$20000$ (and B\'s is ₹$15000$).', 'A-এর মূলধন ₹$20000$ (আর B-এর ₹$15000$)।'),
      },
      tryIt: {
        question: t('A invests his capital for $8$ months and B invests his for $12$ months. Together they invest ₹$40000$ and their profits are equal. Find A\'s capital.', 'A তার মূলধন $8$ মাস এবং B তার মূলধন $12$ মাস বিনিয়োগ করে। দুজনে মিলে ₹$40000$ বিনিয়োগ করে এবং তাদের লাভ সমান হয়। A-এর মূলধন কত?'),
        options: [t('₹16000', '₹16000'), t('₹24000', '₹24000'), t('₹20000', '₹20000'), t('₹28000', '₹28000')],
        correct: 1,
        explanation: [
          t('Equal profits: $C_A : C_B = 12 : 8 = 3 : 2$ (the inverse of the time ratio $8 : 12$).', 'লাভ সমান: $C_A : C_B = 12 : 8 = 3 : 2$ (সময়ের অনুপাত $8 : 12$-এর ব্যস্ত অনুপাত)।'),
          t(r`A's capital $= \dfrac{3}{5} \times 40000 = 24000$. (₹$16000$ comes from using the time ratio directly — that is B's capital.)`, r`A-এর মূলধন $= \dfrac{3}{5} \times 40000 = 24000$। (₹$16000$ আসে সময়ের অনুপাত সরাসরি ব্যবহার করলে — সেটি B-এর মূলধন।)`),
        ],
      },
    },
    // 14 ─────────────────────────────────────────────
    {
      key: 'three_way_mixed_duration',
      emoji: '🧩',
      name: t('Three partners: late joining plus a capital change', 'তিন অংশীদার: দেরিতে যোগদান ও মূলধন পরিবর্তন একসঙ্গে'),
      difficulty: 'advanced',
      typicalWording: t('“A starts the business. B joins after a few months and C joins still later; C then increases (or withdraws) his capital. The profit is...”', '“A ব্যবসা শুরু করে। B কিছু মাস পরে যোগ দেয়, C আরও পরে যোগ দেয়; তারপর C তার মূলধন বাড়ায় (বা তোলে)। লাভ হল...”'),
      formula: t(r`Share ratio $=$ ratio of the partners' totals of $\sum (\text{capital} \times \text{months})$, worked out period by period for each partner.`, r`ভাগের অনুপাত $=$ অংশীদারদের $\sum (\text{মূলধন} \times \text{মাস})$ মোটের অনুপাত, প্রত্যেকের জন্য সময়কাল ধরে ধরে হিসাব করা।`),
      shortcut: t('Make one row per partner and write every period product in it; add each row, then cancel a common factor from all three totals before splitting the profit.', 'প্রত্যেক অংশীদারের জন্য একটি সারি তৈরি করে সব সময়কালের গুণফল তাতে লেখো; প্রতিটি সারি যোগ করো, তারপর লাভ ভাগের আগে তিনটি মোট থেকে একটি সাধারণ গুণনীয়ক কাটো।'),
      trap: t('Giving a late joiner the full 12 months, or forgetting that after a capital change the new amount runs only for the months left.', 'দেরিতে যোগ দেওয়া অংশীদারকে পুরো 12 মাস দেওয়া, অথবা মূলধন বদলের পর নতুন পরিমাণ শুধু বাকি মাসগুলোতেই চলে তা ভুলে যাওয়া।'),
      spot: t(
        '**Three** partners with **different joining months**, and one of them also **changes his capital** midway — several timelines have to be tracked at the same time.',
        '**তিনজন** অংশীদার **আলাদা আলাদা মাসে যোগ দেয়**, এবং তাদের একজন মাঝপথে **মূলধনও বদলায়** — একসঙ্গে একাধিক সময়রেখা হিসাব রাখতে হয়।',
      ),
      method: [
        t('Draw a timeline for each partner: when he joins, how long each amount of capital stays.', 'প্রত্যেক অংশীদারের সময়রেখা আঁকো: সে কখন যোগ দেয়, প্রতিটি মূলধন কতদিন থাকে।'),
        t(r`For each partner add up $\text{capital} \times \text{months}$ over all his periods.`, r`প্রত্যেক অংশীদারের সব সময়কালের $\text{মূলধন} \times \text{মাস}$ যোগ করো।`),
        t('Write the three totals as a ratio, simplify, and share the profit in that ratio.', 'তিনটি মোট অনুপাতে লিখে সরল করো এবং সেই অনুপাতে লাভ ভাগ করো।'),
      ],
      example: {
        question: t('A starts a business with ₹$24000$. B joins after $4$ months with ₹$30000$. C joins after $6$ months with ₹$16000$ and after $3$ more months raises his capital to ₹$24000$. The yearly profit is ₹$27000$. Find each share.', 'A ₹$24000$ দিয়ে ব্যবসা শুরু করে। B $4$ মাস পরে ₹$30000$ নিয়ে যোগ দেয়। C $6$ মাস পরে ₹$16000$ নিয়ে যোগ দেয় এবং আরও $3$ মাস পরে তার মূলধন বাড়িয়ে ₹$24000$ করে। বার্ষিক লাভ ₹$27000$। প্রত্যেকের ভাগ বের করো।'),
        steps: [
          t(r`A: $24000 \times 12 = 288000$. B stays $8$ months: $30000 \times 8 = 240000$.`, r`A-এর হিসাব: $24000 \times 12 = 288000$। B থাকে $8$ মাস: $30000 \times 8 = 240000$।`),
          t(r`C stays $6$ months: $16000 \times 3 + 24000 \times 3 = 48000 + 72000 = 120000$.`, r`C থাকে $6$ মাস: $16000 \times 3 + 24000 \times 3 = 48000 + 72000 = 120000$।`),
          t(r`Ratio $= 288000 : 240000 : 120000 = 12 : 10 : 5$. Total parts $= 27$.`, r`অনুপাত $= 288000 : 240000 : 120000 = 12 : 10 : 5$। মোট অংশ $= 27$।`),
          t(r`A $= \dfrac{12}{27} \times 27000 = 12000$, B $= \dfrac{10}{27} \times 27000 = 10000$, C $= \dfrac{5}{27} \times 27000 = 5000$.`, r`A পাবে $\dfrac{12}{27} \times 27000 = 12000$, B পাবে $\dfrac{10}{27} \times 27000 = 10000$, C পাবে $\dfrac{5}{27} \times 27000 = 5000$।`),
        ],
        answer: t('A gets ₹$12000$, B gets ₹$10000$, C gets ₹$5000$.', 'A পাবে ₹$12000$, B পাবে ₹$10000$, C পাবে ₹$5000$।'),
      },
      tryIt: {
        question: t('A starts a business with ₹$30000$. B joins after $6$ months with ₹$40000$. C joins after $3$ months with ₹$20000$ and after $3$ months withdraws half of his capital. The yearly profit is ₹$18000$. Find C\'s share.', 'A ₹$30000$ দিয়ে ব্যবসা শুরু করে। B $6$ মাস পরে ₹$40000$ নিয়ে যোগ দেয়। C $3$ মাস পরে ₹$20000$ নিয়ে যোগ দেয় এবং $3$ মাস পরে তার মূলধনের অর্ধেক তুলে নেয়। বার্ষিক লাভ ₹$18000$। C-এর ভাগ কত?'),
        options: [t('₹3000', '₹3000'), t('₹6000', '₹6000'), t('₹9000', '₹9000'), t('₹4500', '₹4500')],
        correct: 0,
        explanation: [
          t(r`A: $30000 \times 12 = 360000$. B stays $6$ months: $40000 \times 6 = 240000$.`, r`A-এর হিসাব: $30000 \times 12 = 360000$। B থাকে $6$ মাস: $40000 \times 6 = 240000$।`),
          t(r`C: $20000 \times 3 + 10000 \times 6 = 60000 + 60000 = 120000$.`, r`C-এর হিসাব: $20000 \times 3 + 10000 \times 6 = 60000 + 60000 = 120000$।`),
          t(r`Ratio $= 3 : 2 : 1$. C's share $= \dfrac{1}{6} \times 18000 = 3000$.`, r`অনুপাত $= 3 : 2 : 1$। C-এর ভাগ $= \dfrac{1}{6} \times 18000 = 3000$।`),
        ],
      },
    },
  ],
};
