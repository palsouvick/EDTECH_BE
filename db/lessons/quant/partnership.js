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
