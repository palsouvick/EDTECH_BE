'use strict';

// Chapter lesson: Partnership. Format: see ../validate.js.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'partnership',
  title: t('Partnership', 'অংশীদারি কারবার'),
  emoji: '🤝',
  intro: t(
    'When two or more people put money together to run a shop or business, they are partners. At the end they share the profit fairly: whoever put in more money, for longer, gets a bigger share.',
    'দুই বা তার বেশি জন মিলে টাকা দিয়ে দোকান বা ব্যবসা চালালে তাদের বলে অংশীদার। শেষে তারা লাভ ন্যায্যভাবে ভাগ করে নেয়: যে বেশি টাকা, বেশি দিন ধরে খাটিয়েছে, সে বেশি ভাগ পায়।',
  ),
  levels: [
    // ─────────────────────────── BASIC ───────────────────────────
    {
      level: 'basic',
      sections: [
        {
          heading: t('What is a partnership?', 'অংশীদারি কারবার কী?'),
          body: t(
            r`Riya and Sam open a lemonade stall at the school fair. Riya puts in ₹200 and Sam puts in ₹300.

- The money each person puts in is called their **capital** (or investment).
- The people are **partners**.
- The extra money earned is the **profit**. If money is lost, it is a **loss**, and that is shared in the same way.

Is it fair to split the profit half and half? No! Sam gave more money, so he should get more.`,
            r`স্কুলের মেলায় রিয়া আর স্যাম একটা লেবুর শরবতের দোকান দিল। রিয়া দিল ₹200, স্যাম দিল ₹300।

- প্রত্যেকে যে টাকা দেয় তাকে বলে তার **মূলধন** (বা বিনিয়োগ)।
- যারা টাকা দেয় তারা **অংশীদার**।
- ব্যবসায় যে বাড়তি টাকা আসে তা **লাভ**। টাকা কমে গেলে তা **ক্ষতি**, আর সেটাও একইভাবে ভাগ হয়।

লাভ কি আধাআধি ভাগ করা ন্যায্য? না! স্যাম বেশি টাকা দিয়েছে, তাই সে বেশি পাবে।`,
          ),
        },
        {
          heading: t('Share in the ratio of money', 'টাকার অনুপাতে ভাগ'),
          body: t(
            r`When everyone invests for the **same time**, the profit is shared in the **ratio of their capitals**.

Riya : Sam $= 200 : 300 = 2 : 3$. That means the profit is cut into $2 + 3 = 5$ equal parts: Riya gets $2$ parts, Sam gets $3$ parts.

Steps:
1. Write the ratio and make it as small as possible.
2. Add the ratio numbers to get the total parts.
3. One part $=$ profit $\div$ total parts. Multiply by each person's parts.`,
            r`সবাই **একই সময়ের** জন্য টাকা খাটালে লাভ ভাগ হয় **মূলধনের অনুপাতে**।

রিয়া : স্যাম $= 200 : 300 = 2 : 3$। অর্থাৎ লাভকে $2 + 3 = 5$টি সমান ভাগে কাটা হবে: রিয়া পাবে $2$ ভাগ, স্যাম পাবে $3$ ভাগ।

ধাপগুলো:
1. অনুপাত লিখে যতটা সম্ভব ছোটো করো।
2. অনুপাতের সংখ্যাগুলো যোগ করে মোট ভাগ বের করো।
3. এক ভাগ $=$ লাভ $\div$ মোট ভাগ। এবার প্রত্যেকের ভাগের সংখ্যা দিয়ে গুণ করো।`,
          ),
        },
      ],
      examples: [
        {
          question: t('Riya invests ₹200 and Sam invests ₹300 in a stall. They make a profit of ₹100. How much does each get?', 'রিয়া ₹200 আর স্যাম ₹300 দিয়ে একটা দোকান দিল। লাভ হল ₹100। কে কত পাবে?'),
          steps: [
            t(r`Ratio $= 200 : 300 = 2 : 3$. Total parts $= 5$.`, r`অনুপাত $= 200 : 300 = 2 : 3$। মোট ভাগ $= 5$।`),
            t(r`One part $= 100 \div 5 = ₹20$.`, r`এক ভাগ $= 100 \div 5 = ₹20$।`),
            t(r`Riya $= 2 \times 20 = ₹40$, Sam $= 3 \times 20 = ₹60$. Check: $40 + 60 = 100$.`, r`রিয়া $= 2 \times 20 = ₹40$, স্যাম $= 3 \times 20 = ₹60$। যাচাই: $40 + 60 = 100$।`),
          ],
          answer: t('Riya ₹40, Sam ₹60', 'রিয়া ₹40, স্যাম ₹60'),
        },
        {
          question: t('A and B invest ₹143 and ₹286 respectively in a business for the same period. Out of a total profit of ₹3900, find A\'s share.', 'A ও B একই সময়ের জন্য একটি ব্যবসায় যথাক্রমে ₹143 ও ₹286 বিনিয়োগ করল। মোট লাভ ₹3900 হলে A-এর ভাগ কত?'),
          steps: [
            t(r`$286 = 2 \times 143$, so the ratio is $1 : 2$. Total parts $= 3$.`, r`$286 = 2 \times 143$, তাই অনুপাত $1 : 2$। মোট ভাগ $= 3$।`),
            t(r`A's share $= \dfrac{1}{3} \times 3900 = ₹1300$.`, r`A-এর ভাগ $= \dfrac{1}{3} \times 3900 = ₹1300$।`),
          ],
          answer: t('₹1300', 'A-এর ভাগ ₹1300'),
        },
      ],
    },
    // ─────────────────────── INTERMEDIATE ───────────────────────
    {
      level: 'intermediate',
      sections: [
        {
          heading: t('When time is different too', 'সময়ও যখন আলাদা'),
          body: t(
            r`₹1000 kept in a business for $2$ months helps as much as ₹2000 kept for $1$ month. So we multiply **money × time**. This product is sometimes called the **effective capital**.

Profit ratio $=$ (capital of A × time of A) : (capital of B × time of B).

Use the **same unit of time** (usually months) for everyone.`,
            r`ব্যবসায় ₹1000, $2$ মাস খাটানো আর ₹2000, $1$ মাস খাটানো একই কাজে লাগে। তাই আমরা **টাকা × সময়** গুণ করি। এই গুণফলকে অনেক সময় **কার্যকর মূলধন** বলে।

লাভের অনুপাত $=$ (A-এর মূলধন × A-এর সময়) : (B-এর মূলধন × B-এর সময়)।

সবার জন্য **একই এককে সময়** (সাধারণত মাসে) নিতে হবে।`,
          ),
        },
        {
          heading: t('A partner who joins later', 'যে অংশীদার পরে যোগ দেয়'),
          body: t(
            r`"B joins after $4$ months" in a $12$-month year means B's money works for only $12 - 4 = 8$ months.

A common mistake is to use $4$ instead of $8$. Always ask: **for how many months was this money actually in the business?**`,
            r`বছরে $12$ মাস ধরলে "B $4$ মাস পরে যোগ দিল" মানে B-এর টাকা খেটেছে মাত্র $12 - 4 = 8$ মাস।

অনেকে ভুল করে $8$-এর বদলে $4$ ধরে। সবসময় নিজেকে জিজ্ঞাসা করো: **এই টাকা আসলে কত মাস ব্যবসায় ছিল?**`,
          ),
        },
      ],
      examples: [
        {
          question: t('A invests ₹7000 for 6 months and B invests ₹2000 for 3 months. If the total profit is ₹640, what is B\'s share?', 'A ₹7000, 6 মাসের জন্য এবং B ₹2000, 3 মাসের জন্য বিনিয়োগ করল। মোট লাভ ₹640 হলে B-এর ভাগ কত?'),
          steps: [
            t(r`A : B $= 7000 \times 6 : 2000 \times 3 = 42000 : 6000 = 7 : 1$.`, r`A : B $= 7000 \times 6 : 2000 \times 3 = 42000 : 6000 = 7 : 1$, এটাই লাভের অনুপাত।`),
            t(r`Total parts $= 8$. B's share $= \dfrac{1}{8} \times 640 = ₹80$.`, r`মোট ভাগ $= 8$। B-এর ভাগ $= \dfrac{1}{8} \times 640 = ₹80$।`),
          ],
          answer: t('₹80', 'B-এর ভাগ ₹80'),
        },
        {
          question: t('A starts a business with ₹6000. After 4 months B joins with ₹6000. At the end of the year the profit is ₹850. Find A\'s share.', 'A ₹6000 দিয়ে ব্যবসা শুরু করল। 4 মাস পরে B ₹6000 নিয়ে যোগ দিল। বছরের শেষে লাভ হল ₹850। A-এর ভাগ কত?'),
          steps: [
            t(r`A's money works $12$ months, B's works $12 - 4 = 8$ months.`, r`A-এর টাকা খেটেছে $12$ মাস, B-এর $12 - 4 = 8$ মাস।`),
            t(r`A : B $= 6000 \times 12 : 6000 \times 8 = 12 : 8 = 3 : 2$.`, r`A : B $= 6000 \times 12 : 6000 \times 8 = 12 : 8 = 3 : 2$, এটাই লাভের অনুপাত।`),
            t(r`A's share $= \dfrac{3}{5} \times 850 = ₹510$.`, r`A-এর ভাগ $= \dfrac{3}{5} \times 850 = ₹510$।`),
          ],
          answer: t('₹510', 'A-এর ভাগ ₹510'),
        },
        {
          question: t('A starts a business with ₹3000. After 2 months B joins with ₹8000. At the end of the year the profit is ₹3770. Find A\'s share.', 'A ₹3000 দিয়ে ব্যবসা শুরু করল। 2 মাস পরে B ₹8000 নিয়ে যোগ দিল। বছরের শেষে লাভ ₹3770। A-এর ভাগ কত?'),
          steps: [
            t(r`B works $12 - 2 = 10$ months. A: $3000 \times 12 = 36000$. B: $8000 \times 10 = 80000$.`, r`B খেটেছে $12 - 2 = 10$ মাস। A: $3000 \times 12 = 36000$। B: $8000 \times 10 = 80000$।`),
            t(r`Ratio $= 36000 : 80000 = 9 : 20$. Total parts $= 29$.`, r`অনুপাত $= 36000 : 80000 = 9 : 20$। মোট ভাগ $= 29$।`),
            t(r`One part $= 3770 \div 29 = 130$. A's share $= 9 \times 130 = ₹1170$.`, r`এক ভাগ $= 3770 \div 29 = 130$। A-এর ভাগ $= 9 \times 130 = ₹1170$।`),
          ],
          answer: t('₹1170', 'A-এর ভাগ ₹1170'),
        },
      ],
    },
    // ───────────────────────── ADVANCED ─────────────────────────
    {
      level: 'advanced',
      sections: [
        {
          heading: t('Money that changes in the middle', 'মাঝপথে টাকার পরিমাণ বদলালে'),
          body: t(
            r`If a partner adds or takes out money during the year, break the year into pieces and add up **money × months** for each piece.

Example: A puts ₹40000, and after $4$ months takes out ₹10000. A's effective capital $= 40000 \times 4 + 30000 \times 8$.`,
            r`বছরের মাঝে কোনো অংশীদার টাকা বাড়ালে বা তুলে নিলে, বছরটাকে টুকরো করে প্রতিটা টুকরোর **টাকা × মাস** যোগ করো।

উদাহরণ: A দিল ₹40000, $4$ মাস পরে ₹10000 তুলে নিল। A-এর কার্যকর মূলধন $= 40000 \times 4 + 30000 \times 8$।`,
          ),
        },
        {
          heading: t('Working partner and finding the missing piece', 'কর্মরত অংশীদার ও অজানা মান খোঁজা'),
          body: t(
            r`- A **working partner** also runs the business. He first gets a salary or a fixed percentage of the profit; only the **remaining** profit is shared in the capital ratio.
- If the profit ratio is given and the time or money of one partner is missing, write
  $\dfrac{C_1 T_1}{C_2 T_2} = \dfrac{\text{profit}_1}{\text{profit}_2}$ and solve for the unknown.`,
            r`- **কর্মরত অংশীদার** নিজে ব্যবসাও চালান। তিনি আগে বেতন বা লাভের নির্দিষ্ট শতাংশ পান; **বাকি** লাভটুকু মূলধনের অনুপাতে ভাগ হয়।
- লাভের অনুপাত দেওয়া থাকলে আর কোনো অংশীদারের সময় বা টাকা অজানা হলে লেখো
  $\dfrac{C_1 T_1}{C_2 T_2} = \dfrac{\text{profit}_1}{\text{profit}_2}$ (অর্থাৎ মূলধন × সময়ের অনুপাত = লাভের অনুপাত), তারপর অজানাটি বের করো।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'A starts with ₹40000 and after 4 months withdraws ₹10000. B invests ₹30000 for the whole year. The year\'s profit is ₹19000. Find each share.',
            'A ₹40000 দিয়ে শুরু করে 4 মাস পরে ₹10000 তুলে নিল। B সারা বছর ₹30000 খাটাল। বছরের লাভ ₹19000। কে কত পাবে?',
          ),
          steps: [
            t(r`A $= 40000 \times 4 + 30000 \times 8 = 160000 + 240000 = 400000$.`, r`A-এর কার্যকর মূলধন $= 40000 \times 4 + 30000 \times 8 = 160000 + 240000 = 400000$।`),
            t(r`B $= 30000 \times 12 = 360000$. Ratio $= 400000 : 360000 = 10 : 9$.`, r`B-এর কার্যকর মূলধন $= 30000 \times 12 = 360000$। অনুপাত $= 400000 : 360000 = 10 : 9$।`),
            t(r`One part $= 19000 \div 19 = 1000$. A $= ₹10000$, B $= ₹9000$.`, r`এক ভাগ $= 19000 \div 19 = 1000$। A পাবে $₹10000$, B পাবে $₹9000$।`),
          ],
          answer: t('A ₹10000, B ₹9000', 'A পাবে ₹10000, B পাবে ₹9000'),
        },
        {
          question: t(
            'A invests ₹5000 for 12 months. B invests ₹6000 but joins later. The profit is shared in the ratio 5 : 4. After how many months did B join?',
            'A ₹5000, 12 মাসের জন্য খাটাল। B ₹6000 নিয়ে পরে যোগ দিল। লাভ ভাগ হল 5 : 4 অনুপাতে। B কত মাস পরে যোগ দিয়েছিল?',
          ),
          steps: [
            t(r`Let B's money work for $t$ months: $\dfrac{5000 \times 12}{6000 \times t} = \dfrac{5}{4}$.`, r`ধরো B-এর টাকা $t$ মাস খেটেছে: $\dfrac{5000 \times 12}{6000 \times t} = \dfrac{5}{4}$।`),
            t(r`$60000 \times 4 = 5 \times 6000t$, so $240000 = 30000t$ and $t = 8$.`, r`আড়গুণ করে $60000 \times 4 = 5 \times 6000t$, তাই $240000 = 30000t$ এবং $t = 8$।`),
            t(r`B worked $8$ months, so B joined after $12 - 8 = 4$ months.`, r`B খেটেছে $8$ মাস, তাই যোগ দিয়েছে $12 - 8 = 4$ মাস পরে।`),
          ],
          answer: t('After 4 months', '4 মাস পরে'),
        },
        {
          question: t(
            'A and B invest in the ratio 3 : 2. A is the working partner and first takes 10% of the profit. The rest is shared in the capital ratio. If the profit is ₹5000, how much does A get in total?',
            'A ও B 3 : 2 অনুপাতে মূলধন দিল। A কর্মরত অংশীদার, তিনি আগে লাভের 10% নেন। বাকিটা মূলধনের অনুপাতে ভাগ হয়। লাভ ₹5000 হলে A মোট কত পাবেন?',
          ),
          steps: [
            t(r`A's working share $= 10\%$ of $5000 = ₹500$. Remaining $= 4500$.`, r`কাজের জন্য A পান $5000$-এর $10\% = ₹500$। বাকি থাকে $4500$।`),
            t(r`A's capital share $= \dfrac{3}{5} \times 4500 = ₹2700$ (B gets ₹1800).`, r`মূলধন অনুযায়ী A-এর ভাগ $= \dfrac{3}{5} \times 4500 = ₹2700$ (B পান ₹1800)।`),
            t(r`A's total $= 500 + 2700 = ₹3200$.`, r`A-এর মোট প্রাপ্য $= 500 + 2700 = ₹3200$।`),
          ],
          answer: t('₹3200', 'A মোট পাবেন ₹3200'),
        },
      ],
    },
  ],
  rules: [
    {
      label: t('Same time: share by capital', 'একই সময়: মূলধনের অনুপাতে ভাগ'),
      latex: r`P_A : P_B = C_A : C_B`,
      explain: t('If everyone invests for the same time, profit follows the money ratio.', 'সবাই একই সময় খাটালে লাভ ভাগ হয় টাকার অনুপাতে।'),
    },
    {
      label: t('Different time: capital × time', 'আলাদা সময়: মূলধন × সময়'),
      latex: r`P_A : P_B = C_A T_A : C_B T_B`,
      explain: t('Multiply each person\'s money by the months it was invested.', 'প্রত্যেকের টাকাকে যত মাস খেটেছে তা দিয়ে গুণ করো।'),
    },
    {
      label: t('One person\'s share', 'একজনের ভাগ'),
      latex: r`\text{Share} = \dfrac{\text{own ratio part}}{\text{sum of ratio parts}} \times \text{Total profit}`,
      explain: t('Find one part (profit ÷ total parts), then multiply by that person\'s parts.', 'এক ভাগ (লাভ ÷ মোট ভাগ) বের করে সেই ব্যক্তির ভাগের সংখ্যা দিয়ে গুণ করো।'),
    },
    {
      label: t('Late joiner', 'পরে যোগ দেওয়া অংশীদার'),
      latex: r`T = 12 - (\text{months after which he joined})`,
      explain: t('Count only the months the money was really in the business.', 'শুধু যত মাস টাকা আসলে ব্যবসায় ছিল সেটুকু ধরো।'),
    },
    {
      label: t('Changing capital', 'মূলধন বদলালে'),
      latex: r`\text{Effective capital} = C_1 t_1 + C_2 t_2 + \dots`,
      explain: t('Add money × months for every period the amount stayed the same.', 'যতবার টাকার পরিমাণ একই ছিল, প্রতিবারের টাকা × মাস যোগ করো।'),
    },
  ],
  tips: [
    t('Profit is shared equally only if money and time are both equal. Never split half-half by habit.', 'টাকা আর সময় দুটোই সমান হলে তবেই লাভ সমান ভাগ হয়। অভ্যাসে আধাআধি ভাগ কোরো না।'),
    t('"Joins after 4 months" means the money worked 12 − 4 = 8 months, not 4.', '"4 মাস পরে যোগ দিল" মানে টাকা খেটেছে 12 − 4 = 8 মাস, 4 মাস নয়।'),
    t('Cancel common zeros and factors in the ratio first; the numbers become small and easy.', 'আগে অনুপাতের সাধারণ শূন্য ও উৎপাদক কেটে ফেলো; সংখ্যাগুলো ছোটো আর সহজ হয়ে যাবে।'),
    t('Check: all the shares must add up to the total profit.', 'যাচাই: সবার ভাগ যোগ করলে মোট লাভ হতেই হবে।'),
    t('For a working partner, take out the salary first, then share the rest.', 'কর্মরত অংশীদারের ক্ষেত্রে আগে বেতন বাদ দাও, তারপর বাকিটা ভাগ করো।'),
  ],
};

const lesson = module.exports;
const basic = lesson.levels[0].examples;
[
  {
    given: t('Riya invests ₹200, Sam invests ₹300 for the same time; profit ₹100.', 'রিয়া ₹200 ও স্যাম ₹300 একই সময়ের জন্য বিনিয়োগ করেছে; লাভ ₹100।'),
    find: t('Each partner’s profit share.', 'প্রত্যেক অংশীদারের লাভের ভাগ।'),
    method: t('Simplify the capital ratio and divide profit by its total parts.', 'মূলধনের অনুপাত সরল করে মোট অংশ দিয়ে লাভ ভাগ করো।'),
    why: t('Equal time means profit depends directly on invested capital.', 'সময় সমান বলে লাভ সরাসরি বিনিয়োগ করা মূলধনের অনুপাতে ভাগ হবে।'),
  },
  {
    given: t('A invests ₹143 and B invests ₹286 for the same time; total profit ₹3,900.', 'A ₹143 ও B ₹286 একই সময়ের জন্য বিনিয়োগ করেছে; মোট লাভ ₹3,900।'),
    find: t('A’s profit share.', 'A-এর লাভের ভাগ।'),
    method: t('Use capital ratio as profit ratio.', 'মূলধনের অনুপাতকেই লাভের অনুপাত ধরো।'),
    why: t('B invests twice A’s capital, so A receives one of three equal profit parts.', 'B-এর মূলধন A-এর দ্বিগুণ, তাই A মোট তিন ভাগের এক ভাগ পাবে।'),
  },
].forEach((details, index) => Object.assign(basic[index], details));
const example = (q, g, f, m, steps, a, w) => ({
  question: t(q[0], q[1]), given: t(g[0], g[1]), find: t(f[0], f[1]),
  method: t(m[0], m[1]), steps: steps.map((s) => t(s[0], s[1])),
  answer: t(a[0], a[1]), why: t(w[0], w[1]),
});
basic.push(
  example(
    ['A and B invest ₹4,000 and ₹6,000 for the same period. If profit is ₹2,500, find each share.', 'A ও B একই সময়ের জন্য ₹4,000 ও ₹6,000 বিনিয়োগ করল। লাভ ₹2,500 হলে প্রত্যেকের ভাগ কত?'],
    ['Capital ratio 4,000 : 6,000; profit ₹2,500.', 'মূলধনের অনুপাত 4,000 : 6,000; লাভ ₹2,500।'],
    ['A and B’s shares.', 'A ও B-এর ভাগ।'], ['Simplify the ratio and split the profit into parts.', 'অনুপাত সরল করে লাভকে অংশে ভাগ করো।'],
    [['Ratio = 4,000 : 6,000 = 2 : 3; total parts = 5.', 'অনুপাত = 4,000 : 6,000 = 2 : 3; মোট অংশ = 5।'], ['One part = 2,500 ÷ 5 = ₹500; shares = 2 × 500 and 3 × 500.', 'এক অংশ = 2,500 ÷ 5 = ₹500; ভাগ = 2 × 500 ও 3 × 500।']],
    ['A ₹1,000; B ₹1,500', 'A-এর ভাগ ₹1,000; B-এর ভাগ ₹1,500'], ['Their shares add to the total ₹2,500 and follow the 2 : 3 capital ratio.', 'ভাগ দুটো যোগে মোট ₹2,500 হয় এবং 2 : 3 মূলধনের অনুপাত মেনে চলে।'],
  ),
  example(
    ['A, B, and C invest in ratio 2 : 3 : 5 and earn ₹2,000 profit. Find C’s share.', 'A, B ও C-এর বিনিয়োগের অনুপাত 2 : 3 : 5 এবং লাভ ₹2,000। C-এর ভাগ কত?'],
    ['Investment ratio 2 : 3 : 5; profit ₹2,000.', 'বিনিয়োগের অনুপাত 2 : 3 : 5; লাভ ₹2,000।'],
    ['C’s share.', 'C-এর ভাগ।'], ['Use the ratio parts directly.', 'অনুপাতের অংশ সরাসরি ব্যবহার করো।'],
    [['Total parts = 2 + 3 + 5 = 10; one part = ₹2,000 ÷ 10 = ₹200.', 'মোট অংশ = 2 + 3 + 5 = 10; এক অংশ = ₹2,000 ÷ 10 = ₹200।'], ['C has 5 parts, so C’s share = 5 × ₹200 = ₹1,000.', 'C-এর 5 অংশ, তাই ভাগ = 5 × ₹200 = ₹1,000।']],
    ['₹1,000', 'C-এর ভাগ ₹1,000'], ['C supplied half of the total ratio parts, so C gets half of the profit.', 'মোট অনুপাতের অর্ধেক অংশ C-এর, তাই লাভেরও অর্ধেক পায়।'],
  ),
  example(
    ['A invests ₹3,000 for 12 months and B invests ₹6,000 for 6 months. Find the profit ratio.', 'A ₹3,000 12 মাস এবং B ₹6,000 6 মাস বিনিয়োগ করে। লাভের অনুপাত কত?'],
    ['A: ₹3,000 for 12 months; B: ₹6,000 for 6 months.', 'A: ₹3,000, 12 মাস; B: ₹6,000, 6 মাস।'],
    ['A : B profit ratio.', 'লাভের A : B অনুপাত।'], ['Compare capital × time.', 'মূলধন × সময় তুলনা করো।'],
    [['A’s effective capital = 3,000 × 12 = 36,000; B’s = 6,000 × 6 = 36,000.', 'A-এর কার্যকর মূলধন = 3,000 × 12 = 36,000; B-এর = 6,000 × 6 = 36,000।'], ['Ratio = 36,000 : 36,000 = 1 : 1.', 'অনুপাত = 36,000 : 36,000 = 1 : 1।']],
    ['1 : 1', '1 : 1 অনুপাতে'], ['Both partners supplied equal capital-months, despite investing different amounts for different times.', 'বিনিয়োগের অঙ্ক ও সময় আলাদা হলেও দুজনের মূলধন-মাস সমান।'],
  ),
  example(
    ['A starts with ₹5,000; B joins 4 months later with ₹5,000. At year-end, find their profit ratio.', 'A ₹5,000 দিয়ে শুরু করে; 4 মাস পরে B ₹5,000 নিয়ে যোগ দেয়। বছরের শেষে লাভের অনুপাত কত?'],
    ['A’s capital ₹5,000 for 12 months; B’s ₹5,000 joins after 4 months.', 'A-এর ₹5,000 12 মাস; B-এর ₹5,000 4 মাস পরে যোগ দেয়।'],
    ['A : B profit ratio.', 'লাভের A : B অনুপাত।'], ['Count each partner’s actual months, then multiply by capital.', 'প্রত্যেকের প্রকৃত মাস গুনে মূলধনের সঙ্গে গুণ করো।'],
    [['A: 5,000 × 12 = 60,000; B works 12 − 4 = 8 months, so 5,000 × 8 = 40,000.', 'A: 5,000 × 12 = 60,000; B খাটে 12 − 4 = 8 মাস, তাই 5,000 × 8 = 40,000।'], ['Ratio = 60,000 : 40,000 = 3 : 2.', 'অনুপাত = 60,000 : 40,000 = 3 : 2।']],
    ['3 : 2', '3 : 2 অনুপাতে'], ['A’s money works four months longer, so A earns the larger share.', 'A-এর টাকা চার মাস বেশি খাটে, তাই A বেশি ভাগ পায়।'],
  ),
  example(
    ['A and B invest ₹8,000 and ₹12,000 for the same time. Find A’s share of a ₹5,000 loss.', 'A ও B একই সময়ের জন্য ₹8,000 ও ₹12,000 বিনিয়োগ করে। ₹5,000 ক্ষতিতে A-এর ভাগ কত?'],
    ['Capital ₹8,000 and ₹12,000; loss ₹5,000.', 'মূলধন ₹8,000 ও ₹12,000; ক্ষতি ₹5,000।'],
    ['A’s share of the loss.', 'ক্ষতির মধ্যে A-এর ভাগ।'], ['Share loss in the capital ratio.', 'মূলধনের অনুপাতে ক্ষতি ভাগ করো।'],
    [['Ratio = 8,000 : 12,000 = 2 : 3; total parts = 5.', 'অনুপাত = 8,000 : 12,000 = 2 : 3; মোট অংশ = 5।'], ['A’s loss share = 2/5 × 5,000 = ₹2,000.', 'A-এর ক্ষতির ভাগ = 2/5 × 5,000 = ₹2,000।']],
    ['₹2,000 loss', '₹2,000 ক্ষতি'], ['Loss follows the same investment ratio as profit.', 'লাভের মতো ক্ষতিও একই বিনিয়োগের অনুপাতে ভাগ হয়।'],
  ),
  example(
    ['A invests ₹2,000 for 6 months and B invests ₹3,000 for 4 months. If profit is ₹1,200, find B’s share.', 'A ₹2,000 6 মাস এবং B ₹3,000 4 মাস বিনিয়োগ করে। লাভ ₹1,200 হলে B-এর ভাগ কত?'],
    ['A: ₹2,000 × 6 months; B: ₹3,000 × 4 months; profit ₹1,200.', 'A: ₹2,000 × 6 মাস; B: ₹3,000 × 4 মাস; লাভ ₹1,200।'],
    ['B’s share.', 'B-এর ভাগ।'], ['Compare capital-months, then split profit.', 'মূলধন-মাস তুলনা করে লাভ ভাগ করো।'],
    [['A effective capital = 12,000; B = 12,000; ratio = 1 : 1.', 'A-এর কার্যকর মূলধন = 12,000; B = 12,000; অনুপাত = 1 : 1।'], ['B receives half: ₹1,200 ÷ 2 = ₹600.', 'B অর্ধেক পায়: ₹1,200 ÷ 2 = ₹600।']],
    ['₹600', 'B-এর ভাগ ₹600'], ['Equal capital-months give equal profit shares.', 'মূলধন-মাস সমান হলে লাভের ভাগও সমান হয়।'],
  ),
  example(
    ['A and B share profit in ratio 3 : 2. If A receives ₹900, find the total profit.', 'A ও B লাভ 3 : 2 অনুপাতে ভাগ করে। A ₹900 পেলে মোট লাভ কত?'],
    ['Share ratio 3 : 2; A’s 3 parts equal ₹900.', 'ভাগের অনুপাত 3 : 2; A-এর 3 অংশের মূল্য ₹900।'],
    ['Total profit.', 'মোট লাভ।'], ['Find one ratio part and multiply by all parts.', 'এক অনুপাত-অংশের মূল্য বার করে মোট অংশ দিয়ে গুণ করো।'],
    [['One part = ₹900 ÷ 3 = ₹300; total parts = 3 + 2 = 5.', 'এক অংশ = ₹900 ÷ 3 = ₹300; মোট অংশ = 3 + 2 = 5।'], ['Total profit = 5 × ₹300 = ₹1,500.', 'মোট লাভ = 5 × ₹300 = ₹1,500।']],
    ['₹1,500', 'মোট লাভ ₹1,500'], ['A and B together hold five equal parts, worth ₹300 each.', 'A ও B মিলে পাঁচটি সমান অংশ পায়; প্রতিটি অংশের মূল্য ₹300।'],
  ),
  example(
    ['A and B invest ₹7,000 and ₹5,000 for the same period. Find A’s share of ₹3,600 profit.', 'A ও B একই সময়ের জন্য ₹7,000 ও ₹5,000 বিনিয়োগ করে। ₹3,600 লাভে A-এর ভাগ কত?'],
    ['Capital ratio 7,000 : 5,000; profit ₹3,600.', 'মূলধনের অনুপাত 7,000 : 5,000; লাভ ₹3,600।'],
    ['A’s profit share.', 'A-এর লাভের ভাগ।'], ['Reduce the ratio and calculate the corresponding share.', 'অনুপাত সরল করে A-এর ভাগ হিসাব করো।'],
    [['Ratio = 7 : 5; total parts = 12.', 'অনুপাত = 7 : 5; মোট অংশ = 12।'], ['One part = 3,600 ÷ 12 = ₹300; A gets 7 × 300 = ₹2,100.', 'এক অংশ = 3,600 ÷ 12 = ₹300; A পায় 7 × 300 = ₹2,100।']],
    ['₹2,100', 'A-এর ভাগ ₹2,100'], ['A contributes 7 of the 12 ratio parts, so A receives 7/12 of the profit.', 'A মোট 12 অনুপাত-অংশের 7টি দেয়, তাই লাভের 7/12 পায়।'],
  ),
);
lesson.strategy = {
  heading: t('A beginner’s partnership guide', 'নতুনদের জন্য অংশীদারি কৌশল'),
  sections: [
    { heading: t('1. List every partner’s capital', '1. প্রত্যেকের মূলধন লেখো'), body: t('Write the amount each person invested. Keep currency units consistent.', 'প্রত্যেকে কত টাকা বিনিয়োগ করেছে লেখো। মুদ্রার একক একই রাখো।') },
    { heading: t('2. Check the time period', '2. সময়কাল যাচাই করো'), body: t('If everyone invests for the same period, compare capital only. If not, write each actual number of months.', 'সবার সময় সমান হলে শুধু মূলধন তুলনা করো। না হলে প্রত্যেকের প্রকৃত মাস লেখো।') },
    { heading: t('3. Calculate effective capital', '3. কার্যকর মূলধন হিসাব করো'), body: t('For different times, multiply capital × months for each partner. A late joiner works for total months minus months before joining.', 'সময় আলাদা হলে প্রত্যেকের মূলধন × মাস গুণ করো। পরে যোগ দিলে মোট মাস থেকে যোগ দেওয়ার আগের মাস বাদ দাও।') },
    { heading: t('4. Simplify the sharing ratio', '4. ভাগের অনুপাত সরল করো'), body: t('Reduce the capital or capital-month ratio by common factors. Keep partner names beside their ratio parts.', 'মূলধন বা মূলধন-মাসের অনুপাতকে সাধারণ উৎপাদক দিয়ে সরল করো। অনুপাতের পাশে অংশীদারের নাম রাখো।') },
    { heading: t('5. Divide and check', '5. ভাগ করে যাচাই করো'), body: t('Add all ratio parts, find one part of profit or loss, then multiply. Check that all shares sum to the total.', 'অনুপাতের অংশ যোগ করে লাভ বা ক্ষতির এক অংশ বার করো, তারপর গুণ করো। সব ভাগ যোগে মোট অঙ্ক হচ্ছে কি না দেখো।') },
  ],
};
lesson.practice = {
  question: t('A and B invest in ratio 2 : 3 and earn ₹1,000. Find B’s share.', 'A ও B 2 : 3 অনুপাতে বিনিয়োগ করে ₹1,000 লাভ করে। B-এর ভাগ কত?'),
  steps: [
    t('Total parts = 2 + 3 = 5; one part = ₹1,000 ÷ 5 = ₹200.', 'মোট অংশ = 2 + 3 = 5; এক অংশ = ₹1,000 ÷ 5 = ₹200।'),
    t('B has 3 parts, so B receives 3 × ₹200 = ₹600.', 'B-এর 3 অংশ, তাই B পায় 3 × ₹200 = ₹600।'),
  ],
  answer: t('₹600', 'B-এর ভাগ ₹600'),
};
