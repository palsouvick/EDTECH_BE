'use strict';

// Lesson: Time & Work. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'time_work',
  title: t('Time & Work', 'সময় ও কার্য'),
  emoji: '🛠️',
  intro: t(
    'Time & Work is about how long people take to finish a job, alone or together. We meet it every day: painting a wall, finishing homework with a friend, or workers building a house.',
    'সময় ও কার্য অধ্যায়ে আমরা শিখব, কেউ একা বা কয়েকজন মিলে একটা কাজ শেষ করতে কত সময় নেয়। দেয়াল রং করা, বন্ধুর সঙ্গে মিলে বাড়ির কাজ শেষ করা কিংবা মিস্ত্রিদের বাড়ি তৈরি করা — রোজকার জীবনে এমন হিসাব সবসময় লাগে।',
  ),
  levels: [
    {
      level: 'basic',
      sections: [
        {
          heading: t('What is "work"?', '"কাজ" বলতে কী বুঝি?'),
          body: t(
            r`**Work** is any job that has a clear end, like painting one wall or making 100 sweets.

- We call the whole job **1 work** (one complete job).
- If Raju paints a wall in $4$ days, then every day he paints **one part out of 4**, that is $\frac{1}{4}$ of the wall.
- After $2$ days he has painted $\frac{2}{4} = \frac{1}{2}$ of the wall. After $4$ days the whole wall ($\frac{4}{4} = 1$) is done.`,
            r`শুরু ও শেষ আছে এমন যে-কোনো কাজকেই আমরা **কাজ** বলি, যেমন একটা দেয়াল রং করা বা 100টা মিষ্টি বানানো।

- পুরো কাজটাকে আমরা **1 কাজ** (একটা সম্পূর্ণ কাজ) ধরি।
- রাজু যদি $4$ দিনে একটা দেয়াল রং করে, তবে সে রোজ দেয়ালের **4 ভাগের 1 ভাগ**, অর্থাৎ $\frac{1}{4}$ অংশ রং করে।
- $2$ দিনে সে রং করে $\frac{2}{4} = \frac{1}{2}$ অংশ। $4$ দিনে পুরো দেয়াল ($\frac{4}{4} = 1$) শেষ।`,
          ),
        },
        {
          heading: t("One day's work", 'এক দিনের কাজ'),
          body: t(
            r`The most useful idea in this chapter is **one day's work**: how much of the job gets done in one day.

- If a person finishes a job in $n$ days, one day's work $= \frac{1}{n}$.
- It also works backwards: if a person does $\frac{1}{n}$ of the job each day, he needs $n$ days.
- **Why?** Because $n$ equal pieces of size $\frac{1}{n}$ make the whole job.`,
            r`এই অধ্যায়ের সবচেয়ে কাজের ধারণা হল **এক দিনের কাজ** — অর্থাৎ এক দিনে কাজের কতটা অংশ শেষ হয়।

- কেউ $n$ দিনে একটা কাজ শেষ করলে, তার এক দিনের কাজ $= \frac{1}{n}$।
- উল্টো দিক থেকেও খাটে: কেউ রোজ কাজের $\frac{1}{n}$ অংশ করলে, পুরো কাজ শেষ করতে তার $n$ দিন লাগবে।
- **কেন?** কারণ $\frac{1}{n}$ মাপের $n$টা টুকরো জুড়লেই পুরো কাজটা হয়।`,
          ),
        },
        {
          heading: t('Working together', 'একসঙ্গে কাজ করা'),
          body: t(
            r`When two people work together, their work in one day gets **added**.

- Add the one-day works: A's part $+$ B's part.
- Then flip the answer to get the number of days.
- **Never add the days!** If A takes $3$ days and B takes $6$ days, together they cannot take $9$ days. Working together is always **faster** than working alone.`,
            r`দুজন একসঙ্গে কাজ করলে তাদের এক দিনের কাজ **যোগ** হয়।

- এক দিনের কাজগুলো যোগ করো: A-র অংশ $+$ B-র অংশ।
- তারপর উত্তরটা উল্টে দিলেই মোট দিন পাওয়া যাবে।
- **দিনগুলো কখনো যোগ কোরো না!** A-র $3$ দিন আর B-র $6$ দিন লাগলে, একসঙ্গে $9$ দিন লাগতে পারে না। একসঙ্গে কাজ করলে সবসময় একা করার চেয়ে **কম** সময় লাগে।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'Raju paints a wall in 4 days. How much of the wall does he paint in 1 day? How much in 3 days?',
            'রাজু 4 দিনে একটা দেয়াল রং করে। 1 দিনে সে দেয়ালের কতটা রং করে? 3 দিনে কতটা?',
          ),
          steps: [
            t(r`Whole wall in $4$ days, so 1 day's work $= \frac{1}{4}$.`, r`পুরো দেয়াল $4$ দিনে, তাই 1 দিনের কাজ $= \frac{1}{4}$।`),
            t(r`In $3$ days: $3 \times \frac{1}{4} = \frac{3}{4}$.`, r`$3$ দিনে: $3 \times \frac{1}{4} = \frac{3}{4}$।`),
          ],
          answer: t(r`$\frac{1}{4}$ of the wall in 1 day; $\frac{3}{4}$ of the wall in 3 days.`, r`1 দিনে দেয়ালের $\frac{1}{4}$ অংশ; 3 দিনে $\frac{3}{4}$ অংশ।`),
        },
        {
          question: t(
            'Mita can clean a room in 3 hours. Her brother can clean it in 6 hours. How long will they take together?',
            'মিতা 3 ঘণ্টায় একটা ঘর পরিষ্কার করতে পারে। তার ভাই পারে 6 ঘণ্টায়। দুজনে একসঙ্গে করলে কত সময় লাগবে?',
          ),
          steps: [
            t(r`Mita's 1 hour work $= \frac{1}{3}$, brother's 1 hour work $= \frac{1}{6}$.`, r`মিতার 1 ঘণ্টার কাজ $= \frac{1}{3}$, ভাইয়ের 1 ঘণ্টার কাজ $= \frac{1}{6}$।`),
            t(r`Together in 1 hour: $\frac{1}{3} + \frac{1}{6} = \frac{2}{6} + \frac{1}{6} = \frac{3}{6} = \frac{1}{2}$.`, r`একসঙ্গে 1 ঘণ্টায়: $\frac{1}{3} + \frac{1}{6} = \frac{2}{6} + \frac{1}{6} = \frac{3}{6} = \frac{1}{2}$।`),
            t(r`Half the room each hour, so the whole room takes $2$ hours.`, r`প্রতি ঘণ্টায় অর্ধেক ঘর, তাই পুরো ঘরে লাগবে $2$ ঘণ্টা।`),
          ],
          answer: t('2 hours', '2 ঘণ্টা'),
        },
        {
          question: t(
            'A can complete a work in 5 days and B in 20 days. In how many days will they finish it working together?',
            'A একটা কাজ 5 দিনে এবং B 20 দিনে শেষ করতে পারে। দুজনে একসঙ্গে করলে কত দিনে কাজটা শেষ হবে?',
          ),
          steps: [
            t(r`One day: A does $\frac{1}{5}$, B does $\frac{1}{20}$.`, r`এক দিনে: A করে $\frac{1}{5}$, B করে $\frac{1}{20}$।`),
            t(r`Together: $\frac{1}{5} + \frac{1}{20} = \frac{4}{20} + \frac{1}{20} = \frac{5}{20} = \frac{1}{4}$.`, r`একসঙ্গে: $\frac{1}{5} + \frac{1}{20} = \frac{4}{20} + \frac{1}{20} = \frac{5}{20} = \frac{1}{4}$।`),
            t(r`Flip $\frac{1}{4}$: they need $4$ days.`, r`$\frac{1}{4}$ উল্টে দিলে: $4$ দিন লাগবে।`),
          ],
          answer: t('4 days', '4 দিন'),
        },
      ],
    },
    {
      level: 'intermediate',
      sections: [
        {
          heading: t('The total-work (LCM) method', 'মোট কাজ (ল.সা.গু.) পদ্ধতি'),
          body: t(
            r`Fractions can get messy. A neat trick: **pretend the job has a fixed number of units**.

- Take the total work $=$ the **LCM** (lowest common multiple: the smallest number that all the given numbers divide exactly) of the days.
- Find how many units each person does in one day.
- Days needed $= \dfrac{\text{total units}}{\text{units per day}}$.

Example: A takes $12$ days, B takes $18$ days. LCM $= 36$ units. A does $36 \div 12 = 3$ units a day, B does $36 \div 18 = 2$ units a day.`,
            r`ভগ্নাংশ অনেক সময় জটিল হয়ে যায়। একটা সহজ কৌশল: **ধরে নাও কাজটা কয়েকটা নির্দিষ্ট একক (unit) নিয়ে তৈরি**।

- মোট কাজ ধরো দিনসংখ্যাগুলোর **ল.সা.গু.** (লঘিষ্ঠ সাধারণ গুণিতক: সবচেয়ে ছোট যে সংখ্যাকে দেওয়া প্রতিটি সংখ্যা দিয়ে নিঃশেষে ভাগ করা যায়)।
- প্রত্যেকে দিনে কত একক কাজ করে বার করো।
- দরকারি দিন $= \dfrac{\text{মোট একক}}{\text{দিনে একক}}$।

যেমন: A-র $12$ দিন, B-র $18$ দিন লাগে। ল.সা.গু. $= 36$ একক। A দিনে করে $36 \div 12 = 3$ একক, B করে $36 \div 18 = 2$ একক।`,
          ),
        },
        {
          heading: t('Finding one person from "together"', '"একসঙ্গে" থেকে একজনের সময় বার করা'),
          body: t(
            r`Sometimes we know the time taken **together** and the time of **one** person. Then we **subtract**.

- B's one-day work $=$ (together one-day work) $-$ (A's one-day work).
- Then flip to get B's days.
- **Why subtract?** Together work $=$ A's part $+$ B's part, so B's part is what is left after taking away A's part.`,
            r`কখনো কখনো জানা থাকে দুজনে **একসঙ্গে** কত দিনে করে, আর **একজন** একা কত দিনে করে। তখন আমরা **বিয়োগ** করি।

- B-র এক দিনের কাজ $=$ (একসঙ্গে এক দিনের কাজ) $-$ (A-র এক দিনের কাজ)।
- তারপর উল্টে দিলে B-র দিনসংখ্যা পাওয়া যায়।
- **কেন বিয়োগ?** একসঙ্গের কাজ $=$ A-র অংশ $+$ B-র অংশ, তাই A-র অংশ বাদ দিলে যা থাকে সেটাই B-র অংশ।`,
          ),
        },
        {
          heading: t('Efficiency: who works faster?', 'দক্ষতা: কে বেশি তাড়াতাড়ি কাজ করে?'),
          body: t(
            r`**Efficiency** means how much work a person does in one day. A faster worker has higher efficiency.

- If A is **2 times as efficient** as B, A does double the work each day, so A needs **half** the days.
- Efficiency and days are **opposite (inverse)**: more efficiency $\Rightarrow$ fewer days.
- Trick: give B efficiency $1$ unit/day and A efficiency $k$ units/day. Total work $=$ B's days $\times 1$.`,
            r`**দক্ষতা** মানে কেউ এক দিনে কতটা কাজ করে। যে তাড়াতাড়ি কাজ করে, তার দক্ষতা বেশি।

- A যদি B-র **2 গুণ দক্ষ** হয়, তবে A রোজ দ্বিগুণ কাজ করে, তাই A-র লাগে **অর্ধেক** দিন।
- দক্ষতা আর দিনসংখ্যা **ব্যস্ত সম্পর্কে** থাকে: দক্ষতা বেশি $\Rightarrow$ দিন কম।
- কৌশল: B-র দক্ষতা দিনে $1$ একক, A-র দক্ষতা দিনে $k$ একক ধরো। মোট কাজ $=$ B-র দিন $\times 1$।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'A can complete a piece of work in 12 days and B can complete it in 18 days. In how many days will they complete it working together?',
            'A একটা কাজ 12 দিনে এবং B 18 দিনে শেষ করতে পারে। একসঙ্গে কাজ করলে তারা কত দিনে কাজটা শেষ করবে?',
          ),
          steps: [
            t(r`Total work $=$ LCM$(12, 18) = 36$ units.`, r`মোট কাজ $=$ ল.সা.গু.$(12, 18) = 36$ একক।`),
            t(r`A does $36 \div 12 = 3$ units/day; B does $36 \div 18 = 2$ units/day. Together $= 5$ units/day.`, r`A দিনে করে $36 \div 12 = 3$ একক; B করে $36 \div 18 = 2$ একক। একসঙ্গে দিনে $= 5$ একক।`),
            t(r`Days $= \frac{36}{5} = 7\frac{1}{5} = 7.2$.`, r`দিন $= \frac{36}{5} = 7\frac{1}{5} = 7.2$।`),
          ],
          answer: t(r`$7\frac{1}{5}$ days (7.2 days)`, r`$7\frac{1}{5}$ দিন (7.2 দিন)`),
        },
        {
          question: t(
            'A and B together can do a piece of work in 4 days. A alone can do it in 5 days. In how many days can B alone do it?',
            'A ও B একসঙ্গে একটা কাজ 4 দিনে করতে পারে। A একা পারে 5 দিনে। B একা কত দিনে কাজটা করবে?',
          ),
          steps: [
            t(r`Total work $=$ LCM$(4, 5) = 20$ units.`, r`মোট কাজ $=$ ল.সা.গু.$(4, 5) = 20$ একক।`),
            t(r`A and B together: $20 \div 4 = 5$ units/day. A alone: $20 \div 5 = 4$ units/day.`, r`A ও B একসঙ্গে: দিনে $20 \div 4 = 5$ একক। A একা: দিনে $20 \div 5 = 4$ একক।`),
            t(r`B does $5 - 4 = 1$ unit/day, so B needs $20 \div 1 = 20$ days.`, r`B দিনে করে $5 - 4 = 1$ একক, তাই B-র লাগবে $20 \div 1 = 20$ দিন।`),
          ],
          answer: t('20 days', '20 দিন'),
        },
        {
          question: t(
            'A is 3 times as efficient as B. B alone can finish a work in 12 days. In how many days can A and B together finish it?',
            'A, B-র চেয়ে 3 গুণ দক্ষ। B একা একটা কাজ 12 দিনে শেষ করতে পারে। A ও B একসঙ্গে কত দিনে কাজটা শেষ করবে?',
          ),
          steps: [
            t(r`Let B's efficiency $= 1$ unit/day, so A's $= 3$ units/day.`, r`B-র দক্ষতা দিনে $1$ একক ধরলে, A-র দক্ষতা দিনে $3$ একক।`),
            t(r`Total work $=$ B's days $\times$ B's efficiency $= 12 \times 1 = 12$ units.`, r`মোট কাজ $=$ B-র দিন $\times$ B-র দক্ষতা $= 12 \times 1 = 12$ একক।`),
            t(r`Together: $1 + 3 = 4$ units/day, so days $= 12 \div 4 = 3$.`, r`একসঙ্গে: দিনে $1 + 3 = 4$ একক, তাই দিন $= 12 \div 4 = 3$।`),
          ],
          answer: t('3 days', '3 দিন'),
        },
      ],
    },
    {
      level: 'advanced',
      sections: [
        {
          heading: t('When someone leaves midway', 'কেউ মাঝপথে কাজ ছেড়ে দিলে'),
          body: t(
            r`Exam questions often say "A works for some days and then leaves; B finishes the rest". Break it into steps:

1. Work done by A $= \frac{\text{days A worked}}{\text{A's total days}}$.
2. Work left $= 1 -$ work done.
3. B's time $=$ work left $\times$ B's total days.`,
            r`পরীক্ষায় প্রায়ই আসে: "A কিছুদিন কাজ করে চলে গেল; বাকি কাজ B শেষ করল।" ধাপে ধাপে ভাঙো:

1. A-র করা কাজ $= \frac{\text{A যত দিন কাজ করেছে}}{\text{A-র মোট দিন}}$।
2. বাকি কাজ $= 1 -$ করা কাজ।
3. B-র সময় $=$ বাকি কাজ $\times$ B-র মোট দিন।`,
          ),
        },
        {
          heading: t('Sharing the wages', 'পারিশ্রমিক ভাগ করা'),
          body: t(
            r`When people are paid together for one job, the money is shared **in the ratio of the work each one did**.

- If they work for the **same number of days**, work done is in the ratio of their efficiencies.
- Efficiency is the inverse of days: if A takes $x$ days and B takes $y$ days, share ratio $= \frac{1}{x} : \frac{1}{y} = y : x$.
- So the **faster** worker (fewer days) gets **more** money.`,
            r`একটা কাজের জন্য কয়েকজনকে একসঙ্গে টাকা দিলে, টাকা ভাগ হয় **প্রত্যেকে যতটা কাজ করেছে সেই অনুপাতে**।

- সবাই **সমান দিন** কাজ করলে, কাজের অনুপাত $=$ দক্ষতার অনুপাত।
- দক্ষতা দিনের উল্টো: A-র $x$ দিন ও B-র $y$ দিন লাগলে, ভাগের অনুপাত $= \frac{1}{x} : \frac{1}{y} = y : x$।
- তাই যে **তাড়াতাড়ি** কাজ করে (কম দিন), সে **বেশি** টাকা পায়।`,
          ),
        },
        {
          heading: t('Shortcuts for the exam', 'পরীক্ষার জন্য শর্টকাট'),
          body: t(
            r`- **Two people together:** $\dfrac{xy}{x+y}$ days. For $x = 12$, $y = 18$: $\frac{216}{30} = 7.2$ days.
- **Men and days:** more workers finish faster. $M_1 \times D_1 = M_2 \times D_2$, where $M$ is the number of men and $D$ the number of days. Total "man-days" for a job stay the same.
- If hours per day also change: $M_1 D_1 H_1 = M_2 D_2 H_2$.
- **Quick check:** the together-time must be **smaller** than the faster person's time alone.`,
            r`- **দুজন একসঙ্গে:** $\dfrac{xy}{x+y}$ দিন। $x = 12$, $y = 18$ হলে: $\frac{216}{30} = 7.2$ দিন।
- **লোক ও দিন:** লোক বেশি হলে কাজ তাড়াতাড়ি শেষ হয়। $M_1 \times D_1 = M_2 \times D_2$, যেখানে $M$ লোকসংখ্যা, $D$ দিনসংখ্যা। একটা কাজের মোট "লোক-দিন" একই থাকে।
- রোজ কত ঘণ্টা কাজ হয় সেটাও বদলালে: $M_1 D_1 H_1 = M_2 D_2 H_2$।
- **ঝটপট যাচাই:** একসঙ্গের সময় সবসময় দ্রুততর লোকের একার সময়ের চেয়ে **কম** হবে।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'A can finish a job in 100 days and B in 25 days. A works for 60 days and then leaves. In how many more days will B finish the remaining work?',
            'A একটা কাজ 100 দিনে এবং B 25 দিনে শেষ করতে পারে। A 60 দিন কাজ করে চলে গেল। বাকি কাজ শেষ করতে B-র আর কত দিন লাগবে?',
          ),
          steps: [
            t(r`Work done by A $= \frac{60}{100} = \frac{3}{5}$.`, r`A-র করা কাজ $= \frac{60}{100} = \frac{3}{5}$।`),
            t(r`Work left $= 1 - \frac{3}{5} = \frac{2}{5}$.`, r`বাকি কাজ $= 1 - \frac{3}{5} = \frac{2}{5}$।`),
            t(r`B's time $= \frac{2}{5} \times 25 = 10$ days.`, r`B-র সময় $= \frac{2}{5} \times 25 = 10$ দিন।`),
          ],
          answer: t('10 days', '10 দিন'),
        },
        {
          question: t(
            "A and B can complete a work in 20 and 30 days respectively. They are paid ₹2500 for doing it together. What is A's share?",
            'A ও B একটা কাজ যথাক্রমে 20 ও 30 দিনে করতে পারে। একসঙ্গে কাজটা করে তারা ₹2500 পেল। A-র ভাগ কত?',
          ),
          steps: [
            t(r`Efficiency ratio $= \frac{1}{20} : \frac{1}{30} = 30 : 20 = 3 : 2$.`, r`দক্ষতার অনুপাত $= \frac{1}{20} : \frac{1}{30} = 30 : 20 = 3 : 2$।`),
            t(r`They work the same days, so the money is split $3 : 2$. Total parts $= 5$.`, r`দুজনে সমান দিন কাজ করেছে, তাই টাকা ভাগ হবে $3 : 2$ অনুপাতে। মোট ভাগ $= 5$।`),
            t(r`A's share $= \frac{3}{5} \times 2500 = 1500$.`, r`A-র ভাগ $= \frac{3}{5} \times 2500 = 1500$।`),
          ],
          answer: t("A's share is ₹1500", 'A-র ভাগ ₹1500'),
        },
        {
          question: t(
            '6 workers can build a wall in 10 days. How many days will 15 workers take to build the same wall?',
            '6 জন মিস্ত্রি 10 দিনে একটা দেয়াল তৈরি করতে পারে। 15 জন মিস্ত্রির একই দেয়াল তৈরি করতে কত দিন লাগবে?',
          ),
          steps: [
            t(r`Total man-days $= 6 \times 10 = 60$.`, r`মোট লোক-দিন $= 6 \times 10 = 60$।`),
            t(r`Use $M_1 D_1 = M_2 D_2$: $15 \times D_2 = 60$, so $D_2 = 60 \div 15 = 4$.`, r`$M_1 D_1 = M_2 D_2$ সূত্রে: $15 \times D_2 = 60$, তাই $D_2 = 60 \div 15 = 4$।`),
          ],
          answer: t('4 days', '4 দিন'),
        },
      ],
    },
  ],
  rules: [
    {
      label: t("One day's work", 'এক দিনের কাজ'),
      latex: r`\text{1 day's work} = \dfrac{1}{n}`,
      explain: t('If a job takes n days, one day finishes 1/n of it.', 'কোনো কাজে n দিন লাগলে, এক দিনে তার 1/n অংশ শেষ হয়।'),
    },
    {
      label: t('Two people together', 'দুজন একসঙ্গে'),
      latex: r`T = \dfrac{xy}{x+y}`,
      explain: t('A takes x days and B takes y days; together they take xy/(x+y) days.', 'A-র x দিন ও B-র y দিন লাগলে, একসঙ্গে লাগে xy/(x+y) দিন।'),
    },
    {
      label: t('One person from "together"', '"একসঙ্গে" থেকে একজনের সময়'),
      latex: r`T_B = \dfrac{T \times x}{x - T}`,
      explain: t('Together they take T days and A alone takes x days; then B alone takes Tx/(x − T) days.', 'একসঙ্গে T দিন এবং A একা x দিন লাগলে, B একা নেয় Tx/(x − T) দিন।'),
    },
    {
      label: t('Efficiency and days', 'দক্ষতা ও দিন'),
      latex: r`\text{Efficiency} \propto \dfrac{1}{\text{Days}}`,
      explain: t('Twice as efficient means half the days.', '2 গুণ দক্ষ মানে অর্ধেক দিন লাগবে।'),
    },
    {
      label: t('Men, days and hours', 'লোক, দিন ও ঘণ্টা'),
      latex: r`M_1 D_1 H_1 = M_2 D_2 H_2`,
      explain: t('For the same job, (men × days × hours) stays the same.', 'একই কাজের জন্য (লোক × দিন × ঘণ্টা) একই থাকে।'),
    },
    {
      label: t('Sharing wages', 'পারিশ্রমিক ভাগ'),
      latex: r`A : B = \dfrac{1}{x} : \dfrac{1}{y} = y : x`,
      explain: t('Working the same days, money is shared in the ratio of work done, which is the opposite of the ratio of days.', 'সমান দিন কাজ করলে টাকা ভাগ হয় কাজের অনুপাতে, যা দিনের অনুপাতের উল্টো।'),
    },
    {
      label: t('Work left', 'বাকি কাজ'),
      latex: r`\text{Work left} = 1 - \dfrac{d}{x}`,
      explain: t('A person who needs x days and works for d days leaves 1 − d/x of the job.', 'যার x দিন লাগে সে d দিন কাজ করলে, বাকি থাকে 1 − d/x অংশ।'),
    },
  ],
  tips: [
    t('Add the one-day works, never the days.', 'এক দিনের কাজ যোগ করো, দিনসংখ্যা কখনো যোগ কোরো না।'),
    t('Together is always faster: the answer must be less than the faster person alone.', 'একসঙ্গে সবসময় তাড়াতাড়ি হয়: উত্তর দ্রুততর লোকের একার সময়ের চেয়ে কম হবেই।'),
    t('Use the LCM of the days as total work to avoid messy fractions.', 'ভগ্নাংশের ঝামেলা এড়াতে দিনসংখ্যাগুলোর ল.সা.গু.-কে মোট কাজ ধরো।'),
    t('"2 times as efficient" means half the time, not double the time.', '"2 গুণ দক্ষ" মানে অর্ধেক সময়, দ্বিগুণ সময় নয়।'),
    t('In wage problems the faster worker gets the bigger share.', 'পারিশ্রমিকের অঙ্কে যে তাড়াতাড়ি কাজ করে সে বেশি টাকা পায়।'),
    t(r`An answer like $\frac{36}{5}$ days can be written as $7\frac{1}{5}$ or $7.2$ days: check which form the options use.`, r`$\frac{36}{5}$ দিনের মতো উত্তর $7\frac{1}{5}$ বা $7.2$ দিন হিসেবেও লেখা যায়: বিকল্পগুলো কোন রূপে আছে দেখে নাও।`),
  ],
};
