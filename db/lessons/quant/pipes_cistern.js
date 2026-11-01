'use strict';

// Lesson: Pipes & Cistern. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'pipes_cistern',
  title: t('Pipes & Cistern', 'নল ও চৌবাচ্চা'),
  emoji: '🚰',
  intro: t(
    'A cistern is a water tank, like the one on the roof of your house. In this chapter we find how long pipes take to fill or empty a tank. It is just like Time & Work: filling the tank is the "work".',
    'চৌবাচ্চা মানে জলের ট্যাঙ্ক, যেমন তোমাদের বাড়ির ছাদের ট্যাঙ্ক। এই অধ্যায়ে আমরা দেখব নল দিয়ে একটা ট্যাঙ্ক ভরতে বা খালি করতে কত সময় লাগে। এটা ঠিক সময় ও কার্যের মতোই: ট্যাঙ্ক ভরানোটাই হল "কাজ"।',
  ),
  levels: [
    {
      level: 'basic',
      sections: [
        {
          heading: t('Inlet and outlet pipes', 'প্রবেশ নল ও নির্গম নল'),
          body: t(
            r`A tank can have two kinds of pipes:

- An **inlet pipe** brings water **in**. It **fills** the tank.
- An **outlet pipe** takes water **out**. It **empties** the tank.
- The **capacity** of a tank is how much water it holds when full, for example $100$ litres.`,
            r`একটা ট্যাঙ্কে দুরকম নল থাকতে পারে:

- **প্রবেশ নল** (inlet) জল **ভিতরে** আনে। এটা ট্যাঙ্ক **ভরে**।
- **নির্গম নল** (outlet) জল **বাইরে** বার করে দেয়। এটা ট্যাঙ্ক **খালি** করে।
- ট্যাঙ্কের **ধারণক্ষমতা** মানে ভর্তি অবস্থায় তাতে কতটা জল ধরে, যেমন $100$ লিটার।`,
          ),
        },
        {
          heading: t('Time = capacity ÷ rate', 'সময় = ধারণক্ষমতা ÷ হার'),
          body: t(
            r`The **rate** of a pipe is how much water it moves in one minute (or one hour).

- If a tap pours $5$ litres every minute into a $60$-litre tank, it needs $60 \div 5 = 12$ minutes.
- So: $\text{time} = \dfrac{\text{capacity}}{\text{rate}}$.`,
            r`নলের **হার** মানে এক মিনিটে (বা এক ঘণ্টায়) সে কতটা জল সরায়।

- একটা কল যদি প্রতি মিনিটে $5$ লিটার জল $60$ লিটারের ট্যাঙ্কে ঢালে, তবে লাগবে $60 \div 5 = 12$ মিনিট।
- অর্থাৎ: $\text{সময়} = \dfrac{\text{ধারণক্ষমতা}}{\text{হার}}$।`,
          ),
        },
        {
          heading: t('Both pipes open: the net rate', 'দুটো নলই খোলা: নিট হার'),
          body: t(
            r`If an inlet and an outlet are both open, water comes in **and** goes out at the same time.

- **Net rate** (what really stays in the tank each minute) $=$ filling rate $-$ emptying rate.
- Then time $= \dfrac{\text{capacity}}{\text{net rate}}$.
- Think of pocket money: you get ₹10 a day and spend ₹4 a day, so you really save ₹6 a day.`,
            r`প্রবেশ নল আর নির্গম নল দুটোই খোলা থাকলে, একই সময়ে জল ঢোকে **আবার** বেরিয়েও যায়।

- **নিট হার** (প্রতি মিনিটে আসলে যতটা জল ট্যাঙ্কে থেকে যায়) $=$ ভরার হার $-$ খালি হওয়ার হার।
- তারপর সময় $= \dfrac{\text{ধারণক্ষমতা}}{\text{নিট হার}}$।
- হাতখরচের কথা ভাবো: রোজ ₹10 পাও আর ₹4 খরচ করো, তাহলে আসলে রোজ ₹6 জমে।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'A tap fills a 60-litre bucket at 5 litres per minute. How long does it take to fill the bucket?',
            'একটা কল প্রতি মিনিটে 5 লিটার করে একটা 60 লিটারের বালতি ভরে। বালতিটা ভরতে কত সময় লাগবে?',
          ),
          steps: [
            t('Capacity = 60 litres, rate = 5 litres per minute.', 'ধারণক্ষমতা = 60 লিটার, হার = মিনিটে 5 লিটার।'),
            t(r`Time $= 60 \div 5 = 12$ minutes.`, r`সময় $= 60 \div 5 = 12$ মিনিট।`),
          ],
          answer: t('12 minutes', '12 মিনিট'),
        },
        {
          question: t(
            'A tank of capacity 102 litres is empty. An inlet pipe fills 10 litres per minute while an outlet pipe drains 4 litres per minute. How many minutes will it take to fill the tank when both are open?',
            '102 লিটার ধারণক্ষমতার একটা ট্যাঙ্ক খালি আছে। প্রবেশ নল মিনিটে 10 লিটার ভরে, আর নির্গম নল মিনিটে 4 লিটার বার করে দেয়। দুটোই খোলা থাকলে ট্যাঙ্ক ভরতে কত মিনিট লাগবে?',
          ),
          steps: [
            t(r`Net rate $= 10 - 4 = 6$ litres per minute.`, r`নিট হার $= 10 - 4 = 6$ লিটার প্রতি মিনিট।`),
            t(r`Time $= 102 \div 6 = 17$ minutes.`, r`সময় $= 102 \div 6 = 17$ মিনিট।`),
          ],
          answer: t('17 minutes', '17 মিনিট'),
        },
        {
          question: t(
            'A tank of capacity 576 litres is empty. An inlet pipe fills 38 litres per minute while an outlet pipe drains 6 litres per minute. How long will it take to fill the tank when both are open?',
            '576 লিটারের একটা খালি ট্যাঙ্কে প্রবেশ নল মিনিটে 38 লিটার ভরে, আর নির্গম নল মিনিটে 6 লিটার বার করে। দুটোই খোলা থাকলে ট্যাঙ্ক ভরতে কত সময় লাগবে?',
          ),
          steps: [
            t(r`Net rate $= 38 - 6 = 32$ litres per minute.`, r`নিট হার $= 38 - 6 = 32$ লিটার প্রতি মিনিট।`),
            t(r`Time $= 576 \div 32 = 18$ minutes.`, r`সময় $= 576 \div 32 = 18$ মিনিট।`),
          ],
          answer: t('18 minutes', '18 মিনিট'),
        },
      ],
    },
    {
      level: 'intermediate',
      sections: [
        {
          heading: t('Part of the tank in one hour', 'এক ঘণ্টায় ট্যাঙ্কের কতটা'),
          body: t(
            r`Often the capacity is not given. Instead we are told "pipe A fills the tank in $15$ hours". Then we think in **parts of the tank**, exactly like Time & Work.

- If a pipe fills the tank in $x$ hours, in $1$ hour it fills $\frac{1}{x}$ of the tank.
- If a pipe empties the full tank in $y$ hours, in $1$ hour it empties $\frac{1}{y}$ of the tank.`,
            r`অনেক সময় ধারণক্ষমতা দেওয়া থাকে না। বলা থাকে "A নল ট্যাঙ্কটা $15$ ঘণ্টায় ভরে"। তখন আমরা **ট্যাঙ্কের অংশ** হিসেবে ভাবি, ঠিক সময় ও কার্যের মতো।

- কোনো নল $x$ ঘণ্টায় ট্যাঙ্ক ভরলে, $1$ ঘণ্টায় ভরে ট্যাঙ্কের $\frac{1}{x}$ অংশ।
- কোনো নল ভর্তি ট্যাঙ্ক $y$ ঘণ্টায় খালি করলে, $1$ ঘণ্টায় খালি করে $\frac{1}{y}$ অংশ।`,
          ),
        },
        {
          heading: t('Add for filling, subtract for emptying', 'ভরলে যোগ, খালি করলে বিয়োগ'),
          body: t(
            r`- Two **inlet** pipes help each other, so **add**: $\frac{1}{x} + \frac{1}{y}$.
- An **inlet** with an **outlet** work against each other, so **subtract**: $\frac{1}{x} - \frac{1}{y}$.
- Flip the final fraction to get the time.
- If the outlet is faster than the inlet, the answer is negative: the tank will **never fill**, it will empty.`,
            r`- দুটো **প্রবেশ নল** একে অপরকে সাহায্য করে, তাই **যোগ**: $\frac{1}{x} + \frac{1}{y}$।
- **প্রবেশ নল** আর **নির্গম নল** একে অপরের বিরুদ্ধে কাজ করে, তাই **বিয়োগ**: $\frac{1}{x} - \frac{1}{y}$।
- শেষের ভগ্নাংশটা উল্টে দিলেই সময়।
- নির্গম নল যদি প্রবেশ নলের চেয়ে দ্রুত হয়, উত্তর ঋণাত্মক হবে: ট্যাঙ্ক **কখনো ভরবে না**, বরং খালি হবে।`,
          ),
        },
        {
          heading: t('The LCM trick', 'ল.সা.গু. কৌশল'),
          body: t(
            r`To avoid fractions, **pretend the tank holds LCM litres** (LCM = lowest common multiple of the given hours).

Example: pipes take $15$ and $10$ hours. LCM $= 30$. Imagine a $30$-litre tank: the first pipe fills $2$ litres an hour, the second $3$ litres an hour. Now it is just like the basic level!`,
            r`ভগ্নাংশ এড়াতে **ধরে নাও ট্যাঙ্কে ল.সা.গু.-র সমান লিটার জল ধরে** (ল.সা.গু. = দেওয়া ঘণ্টাগুলোর লঘিষ্ঠ সাধারণ গুণিতক)।

যেমন: নল দুটোর লাগে $15$ ও $10$ ঘণ্টা। ল.সা.গু. $= 30$। ধরো ট্যাঙ্কটা $30$ লিটারের: প্রথম নল ঘণ্টায় $2$ লিটার, দ্বিতীয়টা ঘণ্টায় $3$ লিটার ভরে। এবার অঙ্কটা প্রাথমিক স্তরের মতোই সহজ!`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'Pipe A can fill a tank in 15 hours and pipe B can fill it in 10 hours. If both are opened together, in how many hours will the tank be full?',
            'A নল একটা ট্যাঙ্ক 15 ঘণ্টায় এবং B নল 10 ঘণ্টায় ভরতে পারে। দুটো একসঙ্গে খুললে কত ঘণ্টায় ট্যাঙ্ক ভরবে?',
          ),
          steps: [
            t(r`In 1 hour: $\frac{1}{15} + \frac{1}{10} = \frac{2}{30} + \frac{3}{30} = \frac{5}{30} = \frac{1}{6}$ of the tank.`, r`1 ঘণ্টায়: $\frac{1}{15} + \frac{1}{10} = \frac{2}{30} + \frac{3}{30} = \frac{5}{30} = \frac{1}{6}$ অংশ।`),
            t(r`Flip $\frac{1}{6}$: the tank fills in $6$ hours.`, r`$\frac{1}{6}$ উল্টে দিলে: ট্যাঙ্ক ভরবে $6$ ঘণ্টায়।`),
          ],
          answer: t('6 hours', '6 ঘণ্টা'),
        },
        {
          question: t(
            'An inlet pipe fills a tank in 6 hours and an outlet pipe empties it in 9 hours. If both are opened together, in how many hours will the empty tank be full?',
            'একটা প্রবেশ নল ট্যাঙ্ক 6 ঘণ্টায় ভরে এবং একটা নির্গম নল সেটা 9 ঘণ্টায় খালি করে। দুটো একসঙ্গে খুললে খালি ট্যাঙ্ক কত ঘণ্টায় ভরবে?',
          ),
          steps: [
            t(r`Filling minus emptying in 1 hour: $\frac{1}{6} - \frac{1}{9}$.`, r`1 ঘণ্টায় ভরা বিয়োগ খালি: $\frac{1}{6} - \frac{1}{9}$।`),
            t(r`$\frac{3}{18} - \frac{2}{18} = \frac{1}{18}$ of the tank per hour.`, r`প্রতি ঘণ্টায় $\frac{3}{18} - \frac{2}{18} = \frac{1}{18}$ অংশ ভরে।`),
            t(r`Flip: $18$ hours.`, r`উল্টে দিলে: $18$ ঘণ্টা।`),
          ],
          answer: t('18 hours', '18 ঘণ্টা'),
        },
        {
          question: t(
            'An inlet pipe fills a tank in 9 hours and an outlet pipe empties it in 18 hours. Both are opened together. When will the empty tank be full? (Use the LCM trick.)',
            'একটা প্রবেশ নল ট্যাঙ্ক 9 ঘণ্টায় ভরে এবং নির্গম নল সেটা 18 ঘণ্টায় খালি করে। দুটো একসঙ্গে খোলা হল। খালি ট্যাঙ্ক কখন ভরবে? (ল.সা.গু. কৌশলে করো।)',
          ),
          steps: [
            t(r`LCM$(9, 18) = 18$, so imagine an $18$-litre tank.`, r`ল.সা.গু.$(9, 18) = 18$, তাই ধরো ট্যাঙ্কটা $18$ লিটারের।`),
            t(r`Inlet: $18 \div 9 = 2$ litres/hour in. Outlet: $18 \div 18 = 1$ litre/hour out. Net $= 1$ litre/hour.`, r`প্রবেশ নল: ঘণ্টায় $18 \div 9 = 2$ লিটার ঢোকে। নির্গম নল: ঘণ্টায় $18 \div 18 = 1$ লিটার বেরোয়। নিট $= 1$ লিটার/ঘণ্টা।`),
            t(r`Time $= 18 \div 1 = 18$ hours.`, r`সময় $= 18 \div 1 = 18$ ঘণ্টা।`),
          ],
          answer: t('18 hours', '18 ঘণ্টা'),
        },
      ],
    },
    {
      level: 'advanced',
      sections: [
        {
          heading: t('Leaks', 'ফুটো (লিক)'),
          body: t(
            r`A **leak** is a hole at the bottom of the tank. It behaves exactly like an **outlet pipe**.

- A pipe alone fills the tank in $x$ hours. Because of a leak it takes longer, $y$ hours.
- Leak's rate $= \frac{1}{x} - \frac{1}{y}$ (normal filling minus actual filling).
- So the leak alone empties the full tank in $\dfrac{xy}{y - x}$ hours.`,
            r`**ফুটো** (লিক) হল ট্যাঙ্কের তলায় একটা ছিদ্র। এটা ঠিক একটা **নির্গম নলের** মতো আচরণ করে।

- একটা নল একা $x$ ঘণ্টায় ট্যাঙ্ক ভরে। ফুটোর জন্য বেশি সময় লাগে, $y$ ঘণ্টা।
- ফুটোর হার $= \frac{1}{x} - \frac{1}{y}$ (স্বাভাবিক ভরা বিয়োগ আসলে ভরা)।
- তাই ফুটো একা ভর্তি ট্যাঙ্ক খালি করে $\dfrac{xy}{y - x}$ ঘণ্টায়।`,
          ),
        },
        {
          heading: t('Pipes closed midway', 'মাঝপথে নল বন্ধ করা'),
          body: t(
            r`Some questions open pipes together for a while and then close one. Solve in two parts:

1. Find how much of the tank is filled while all pipes are open.
2. The rest $= 1 -$ (filled part).
3. Time for the remaining pipe $=$ rest $\times$ that pipe's own time.`,
            r`কিছু প্রশ্নে কয়েকটা নল কিছুক্ষণ একসঙ্গে খোলা রেখে তারপর একটা বন্ধ করা হয়। দুই ভাগে সমাধান করো:

1. সব নল খোলা থাকার সময়ে ট্যাঙ্কের কতটা ভরল বার করো।
2. বাকি অংশ $= 1 -$ (ভরা অংশ)।
3. বাকি নলটার সময় $=$ বাকি অংশ $\times$ সেই নলের নিজের সময়।`,
          ),
        },
        {
          heading: t('Exam shortcuts', 'পরীক্ষার শর্টকাট'),
          body: t(
            r`- Two inlets: time $= \dfrac{xy}{x + y}$.
- Inlet ($x$ hours) with outlet ($y$ hours), $y > x$: time $= \dfrac{xy}{y - x}$.
- The leak formula is the **same** $\dfrac{xy}{y - x}$: just put the normal time as $x$ and the slower time as $y$.
- Three pipes: add the inlets, subtract the outlets: $\frac{1}{a} + \frac{1}{b} - \frac{1}{c}$.`,
            r`- দুটো প্রবেশ নল: সময় $= \dfrac{xy}{x + y}$।
- প্রবেশ নল ($x$ ঘণ্টা) ও নির্গম নল ($y$ ঘণ্টা), $y > x$: সময় $= \dfrac{xy}{y - x}$।
- ফুটোর সূত্রও **একই** $\dfrac{xy}{y - x}$: স্বাভাবিক সময় $x$ আর ধীর সময় $y$ বসাও।
- তিনটে নল: প্রবেশ নলগুলো যোগ, নির্গম নলগুলো বিয়োগ: $\frac{1}{a} + \frac{1}{b} - \frac{1}{c}$।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'A pipe can fill a tank in 8 hours, but due to a leak at the bottom it takes 24 hours. How long will the leak alone take to empty the full tank?',
            'একটা নল 8 ঘণ্টায় ট্যাঙ্ক ভরতে পারে, কিন্তু তলায় ফুটো থাকায় 24 ঘণ্টা লাগে। ফুটোটা একা ভর্তি ট্যাঙ্ক কত সময়ে খালি করবে?',
          ),
          steps: [
            t(r`Leak's rate $= \frac{1}{8} - \frac{1}{24} = \frac{3}{24} - \frac{1}{24} = \frac{2}{24} = \frac{1}{12}$.`, r`ফুটোর হার $= \frac{1}{8} - \frac{1}{24} = \frac{3}{24} - \frac{1}{24} = \frac{2}{24} = \frac{1}{12}$।`),
            t(r`Shortcut check: $\frac{8 \times 24}{24 - 8} = \frac{192}{16} = 12$.`, r`শর্টকাটে যাচাই: $\frac{8 \times 24}{24 - 8} = \frac{192}{16} = 12$।`),
          ],
          answer: t('12 hours', '12 ঘণ্টা'),
        },
        {
          question: t(
            'Pipes A and B can fill a tank in 12 hours and 15 hours. Both are opened for 4 hours, then A is closed. How many more hours will B take to fill the tank?',
            'A ও B নল একটা ট্যাঙ্ক যথাক্রমে 12 ও 15 ঘণ্টায় ভরতে পারে। দুটো 4 ঘণ্টা খোলা রাখার পর A বন্ধ করা হল। ট্যাঙ্ক ভরতে B-র আর কত ঘণ্টা লাগবে?',
          ),
          steps: [
            t(r`Together in 1 hour: $\frac{1}{12} + \frac{1}{15} = \frac{5}{60} + \frac{4}{60} = \frac{9}{60} = \frac{3}{20}$.`, r`একসঙ্গে 1 ঘণ্টায়: $\frac{1}{12} + \frac{1}{15} = \frac{5}{60} + \frac{4}{60} = \frac{9}{60} = \frac{3}{20}$।`),
            t(r`In 4 hours: $4 \times \frac{3}{20} = \frac{12}{20} = \frac{3}{5}$ filled.`, r`4 ঘণ্টায় ভরে: $4 \times \frac{3}{20} = \frac{12}{20} = \frac{3}{5}$ অংশ।`),
            t(r`Left $= 1 - \frac{3}{5} = \frac{2}{5}$. B needs $\frac{2}{5} \times 15 = 6$ hours.`, r`বাকি $= 1 - \frac{3}{5} = \frac{2}{5}$। B-র লাগবে $\frac{2}{5} \times 15 = 6$ ঘণ্টা।`),
          ],
          answer: t('6 more hours', 'আরও 6 ঘণ্টা'),
        },
        {
          question: t(
            'Pipes A and B fill a tank in 10 hours and 12 hours. Pipe C empties it in 15 hours. If all three are opened together, when will the empty tank be full?',
            'A ও B নল একটা ট্যাঙ্ক যথাক্রমে 10 ও 12 ঘণ্টায় ভরে। C নল সেটা 15 ঘণ্টায় খালি করে। তিনটে একসঙ্গে খুললে খালি ট্যাঙ্ক কখন ভরবে?',
          ),
          steps: [
            t(r`LCM$(10, 12, 15) = 60$ units. A: $+6$, B: $+5$, C: $-4$ units per hour.`, r`ল.সা.গু.$(10, 12, 15) = 60$ একক। ঘণ্টায় A: $+6$, B: $+5$, C: $-4$ একক।`),
            t(r`Net $= 6 + 5 - 4 = 7$ units per hour.`, r`নিট $= 6 + 5 - 4 = 7$ একক প্রতি ঘণ্টা।`),
            t(r`Time $= \frac{60}{7} = 8\frac{4}{7}$ hours.`, r`সময় $= \frac{60}{7} = 8\frac{4}{7}$ ঘণ্টা।`),
          ],
          answer: t(r`$8\frac{4}{7}$ hours`, r`$8\frac{4}{7}$ ঘণ্টা`),
        },
      ],
    },
  ],
  rules: [
    {
      label: t('Time from capacity', 'ধারণক্ষমতা থেকে সময়'),
      latex: r`\text{Time} = \dfrac{\text{Capacity}}{\text{Fill rate} - \text{Empty rate}}`,
      explain: t('Divide the tank size by the water that really stays in each minute.', 'ট্যাঙ্কের মাপকে প্রতি মিনিটে আসলে যতটা জল থেকে যায় তা দিয়ে ভাগ করো।'),
    },
    {
      label: t('Part filled in one hour', 'এক ঘণ্টায় ভরা অংশ'),
      latex: r`\text{1 hour's part} = \dfrac{1}{x}`,
      explain: t('A pipe that fills the tank in x hours fills 1/x of it each hour.', 'যে নল x ঘণ্টায় ট্যাঙ্ক ভরে, সে প্রতি ঘণ্টায় 1/x অংশ ভরে।'),
    },
    {
      label: t('Two inlet pipes', 'দুটো প্রবেশ নল'),
      latex: r`T = \dfrac{xy}{x + y}`,
      explain: t('Both pipes fill, so their parts add up.', 'দুটো নলই ভরে, তাই তাদের অংশ যোগ হয়।'),
    },
    {
      label: t('Inlet with outlet', 'প্রবেশ নল ও নির্গম নল'),
      latex: r`T = \dfrac{xy}{y - x}`,
      explain: t('Inlet fills in x hours, outlet empties in y hours (y bigger than x). The outlet takes away part of the filling.', 'প্রবেশ নল x ঘণ্টায় ভরে, নির্গম নল y ঘণ্টায় খালি করে (y, x-এর চেয়ে বড়)। নির্গম নল ভরার কিছুটা কেড়ে নেয়।'),
    },
    {
      label: t('Leak alone', 'শুধু ফুটো'),
      latex: r`T_{\text{leak}} = \dfrac{xy}{y - x}`,
      explain: t('Normal time x, time with the leak y. The leak empties the full tank in xy/(y − x) hours.', 'স্বাভাবিক সময় x, ফুটো-সহ সময় y। ফুটো একা ভর্তি ট্যাঙ্ক xy/(y − x) ঘণ্টায় খালি করে।'),
    },
    {
      label: t('Many pipes', 'অনেকগুলো নল'),
      latex: r`\dfrac{1}{T} = \dfrac{1}{a} + \dfrac{1}{b} - \dfrac{1}{c}`,
      explain: t('Add the parts of the filling pipes, subtract the parts of the emptying pipes, then flip.', 'ভরার নলগুলোর অংশ যোগ করো, খালি করার নলগুলোর অংশ বিয়োগ করো, তারপর উল্টে দাও।'),
    },
  ],
  tips: [
    t('Outlet pipes and leaks always get a minus sign.', 'নির্গম নল আর ফুটো সবসময় বিয়োগ চিহ্ন পায়।'),
    t('If the outlet is faster than the inlet, the tank never fills.', 'নির্গম নল প্রবেশ নলের চেয়ে দ্রুত হলে ট্যাঙ্ক কখনো ভরবে না।'),
    t('A leak makes filling slower, so the leak alone always takes longer than the pipe alone.', 'ফুটো ভরাকে ধীর করে, তাই ফুটো একা সবসময় নলের একার চেয়ে বেশি সময় নেয়।'),
    t('Check units: do not mix minutes and hours in one sum.', 'একক মিলিয়ে নাও: একই অঙ্কে মিনিট আর ঘণ্টা মিশিও না।'),
    t('Use the LCM of the hours as the tank size to skip fractions.', 'ভগ্নাংশ এড়াতে ঘণ্টাগুলোর ল.সা.গু.-কে ট্যাঙ্কের মাপ ধরো।'),
  ],
};

const lesson = module.exports;
const basic = lesson.levels[0].examples;
[
  {
    given: t('Capacity 60 L; inlet rate 5 L per minute.', 'ধারণক্ষমতা 60 লিটার; প্রবেশ নলের হার মিনিটে 5 লিটার।'),
    find: t('Time to fill.', 'ভরতে সময়।'),
    method: t('Divide capacity by filling rate.', 'ধারণক্ষমতাকে ভরার হার দিয়ে ভাগ করো।'),
    why: t('Each minute adds 5 L, so the number of such minutes is 60 ÷ 5.', 'প্রতি মিনিটে 5 লিটার করে জমে, তাই মিনিটের সংখ্যা 60 ÷ 5।'),
  },
  {
    given: t('Tank capacity 102 L; inlet 10 L/min; outlet 4 L/min.', 'ট্যাঙ্কের ধারণক্ষমতা 102 লিটার; প্রবেশ নল 10 লিটার/মিনিট; নির্গম নল 4 লিটার/মিনিট।'),
    find: t('Time to fill with both pipes open.', 'দুটো নল খোলা রেখে ভরতে সময়।'),
    method: t('Subtract the outlet rate, then divide capacity by net rate.', 'নির্গম নলের হার বিয়োগ করে ধারণক্ষমতাকে নিট হার দিয়ে ভাগ করো।'),
    why: t('Only the water remaining after drainage increases the tank level.', 'বার হওয়ার পরে যে জল থাকে সেটুকুই ট্যাঙ্কের জল বাড়ায়।'),
  },
  {
    given: t('Tank capacity 576 L; inlet 38 L/min; outlet 6 L/min.', 'ট্যাঙ্কের ধারণক্ষমতা 576 লিটার; প্রবেশ নল 38 লিটার/মিনিট; নির্গম নল 6 লিটার/মিনিট।'),
    find: t('Time to fill with both pipes open.', 'দুটো নল খোলা রেখে ভরতে সময়।'),
    method: t('Use net filling rate.', 'নিট ভরার হার ব্যবহার করো।'),
    why: t('The inlet adds more than the outlet removes, so the tank fills at their difference.', 'প্রবেশ নল যতটা জল আনে, নির্গম নল তার চেয়ে কম বার করে; তাই পার্থক্য হারে ট্যাঙ্ক ভরে।'),
  },
].forEach((details, index) => Object.assign(basic[index], details));
const example = (q, g, f, m, steps, a, w) => ({
  question: t(q[0], q[1]), given: t(g[0], g[1]), find: t(f[0], f[1]),
  method: t(m[0], m[1]), steps: steps.map((s) => t(s[0], s[1])),
  answer: t(a[0], a[1]), why: t(w[0], w[1]),
});
basic.push(
  example(
    ['A 30-litre bucket is filled at 6 litres per minute. How long does it take?', 'একটি 30 লিটারের বালতি মিনিটে 6 লিটার হারে ভরে। কত সময় লাগবে?'],
    ['Capacity 30 L; filling rate 6 L/min.', 'ধারণক্ষমতা 30 লিটার; ভরার হার 6 লিটার/মিনিট।'], ['Filling time.', 'ভরার সময়।'],
    ['Time = capacity ÷ rate.', 'সময় = ধারণক্ষমতা ÷ হার।'],
    [['Time = 30 ÷ 6 = 5 minutes.', 'সময় = 30 ÷ 6 = 5 মিনিট।'], ['Check: 6 L/min × 5 min = 30 L.', 'যাচাই: 6 লিটার/মিনিট × 5 মিনিট = 30 লিটার।']],
    ['5 minutes', '5 মিনিট'], ['The rate multiplied by the time equals the full capacity.', 'হারকে সময় দিয়ে গুণ করলে সম্পূর্ণ ধারণক্ষমতা হয়।'],
  ),
  example(
    ['A pipe fills a 120-litre tank in 8 hours. What is its rate per hour?', 'একটি নল 8 ঘণ্টায় 120 লিটারের ট্যাঙ্ক ভরে। প্রতি ঘণ্টায় তার হার কত?'],
    ['Capacity 120 L; filling time 8 hours.', 'ধারণক্ষমতা 120 লিটার; ভরার সময় 8 ঘণ্টা।'], ['Filling rate.', 'ভরার হার।'],
    ['Rate = capacity ÷ time.', 'হার = ধারণক্ষমতা ÷ সময়।'],
    [['Rate = 120 ÷ 8 = 15 L per hour.', 'হার = 120 ÷ 8 = ঘণ্টায় 15 লিটার।'], ['Check: 15 × 8 = 120 L.', 'যাচাই: 15 × 8 = 120 লিটার।']],
    ['15 L/hour', '15 লিটার/ঘণ্টা'], ['Eight equal hourly amounts of 15 L fill the tank.', 'প্রতি ঘণ্টার 15 লিটারের আটটি সমান পরিমাণে ট্যাঙ্ক ভরে।'],
  ),
  example(
    ['Two inlet pipes fill a 200-litre tank at 8 and 12 litres per minute. Find the filling time.', 'দুটি প্রবেশ নল মিনিটে 8 ও 12 লিটার হারে 200 লিটারের ট্যাঙ্ক ভরে। ভরতে সময় কত?'],
    ['Capacity 200 L; inlet rates 8 and 12 L/min.', 'ধারণক্ষমতা 200 লিটার; প্রবেশ নলের হার 8 ও 12 লিটার/মিনিট।'], ['Time with both inlets open.', 'দুটি প্রবেশ নল খোলা থাকলে সময়।'],
    ['Add both filling rates, then divide capacity.', 'দুটি ভরার হার যোগ করে ধারণক্ষমতা ভাগ করো।'],
    [['Combined rate = 8 + 12 = 20 L/min.', 'মিলিত হার = 8 + 12 = 20 লিটার/মিনিট।'], ['Time = 200 ÷ 20 = 10 minutes.', 'সময় = 200 ÷ 20 = 10 মিনিট।']],
    ['10 minutes', '10 মিনিট'], ['Both pipes add water together, so their rates add.', 'দুটি নল একসঙ্গে জল ঢালে, তাই তাদের হার যোগ হয়।'],
  ),
  example(
    ['An inlet fills at 15 L/min and an outlet drains at 5 L/min. How long to fill a 250-litre tank?', 'প্রবেশ নল মিনিটে 15 লিটার ভরে এবং নির্গম নল মিনিটে 5 লিটার বার করে। 250 লিটারের ট্যাঙ্ক ভরতে কত সময়?'],
    ['Capacity 250 L; inlet 15 L/min; outlet 5 L/min.', 'ধারণক্ষমতা 250 লিটার; প্রবেশ নল 15 লিটার/মিনিট; নির্গম নল 5 লিটার/মিনিট।'], ['Filling time with both open.', 'দুটো নল খোলা রেখে ভরার সময়।'],
    ['Subtract drainage from filling, then divide.', 'ভরার হার থেকে নির্গমন বিয়োগ করে ভাগ করো।'],
    [['Net rate = 15 − 5 = 10 L/min.', 'নিট হার = 15 − 5 = 10 লিটার/মিনিট।'], ['Time = 250 ÷ 10 = 25 minutes.', 'সময় = 250 ÷ 10 = 25 মিনিট।']],
    ['25 minutes', '25 মিনিট'], ['Every minute only 10 L remains in the tank after 5 L drains away.', 'প্রতি মিনিটে 5 লিটার বেরিয়ে যাওয়ার পর ট্যাঙ্কে 10 লিটার থাকে।'],
  ),
  example(
    ['A pipe fills 90 litres in 6 minutes. At the same rate, how long to fill 180 litres?', 'একটি নল 6 মিনিটে 90 লিটার ভরে। একই হারে 180 লিটার ভরতে কত সময়?'],
    ['90 L in 6 minutes; target capacity 180 L.', '6 মিনিটে 90 লিটার; কাঙ্ক্ষিত ধারণক্ষমতা 180 লিটার।'], ['Time to fill 180 L.', '180 লিটার ভরতে সময়।'],
    ['Find the rate, then use time = capacity ÷ rate.', 'হার বার করে সময় = ধারণক্ষমতা ÷ হার ব্যবহার করো।'],
    [['Rate = 90 ÷ 6 = 15 L/min.', 'হার = 90 ÷ 6 = 15 লিটার/মিনিট।'], ['Time = 180 ÷ 15 = 12 minutes.', 'সময় = 180 ÷ 15 = 12 মিনিট।']],
    ['12 minutes', '12 মিনিট'], ['180 L is twice 90 L, so at the same rate it takes twice 6 minutes.', '180 লিটার 90 লিটারের দ্বিগুণ, তাই একই হারে 6 মিনিটের দ্বিগুণ সময় লাগে।'],
  ),
  example(
    ['An inlet fills at 20 L/min and an outlet drains at 8 L/min. How long to fill a 240-litre tank?', 'প্রবেশ নল মিনিটে 20 লিটার ভরে এবং নির্গম নল মিনিটে 8 লিটার বার করে। 240 লিটারের ট্যাঙ্ক ভরতে কত সময়?'],
    ['Capacity 240 L; inlet 20 L/min; outlet 8 L/min.', 'ধারণক্ষমতা 240 লিটার; প্রবেশ নল 20 লিটার/মিনিট; নির্গম নল 8 লিটার/মিনিট।'], ['Filling time.', 'ভরার সময়।'],
    ['Calculate the net rate first.', 'আগে নিট হার হিসাব করো।'],
    [['Net rate = 20 − 8 = 12 L/min.', 'নিট হার = 20 − 8 = 12 লিটার/মিনিট।'], ['Time = 240 ÷ 12 = 20 minutes.', 'সময় = 240 ÷ 12 = 20 মিনিট।']],
    ['20 minutes', '20 মিনিট'], ['The tank gains 12 L each minute, and 12 × 20 = 240 L.', 'প্রতি মিনিটে ট্যাঙ্কে 12 লিটার জমে, এবং 12 × 20 = 240 লিটার।'],
  ),
  example(
    ['A pipe fills a 300-litre tank in 15 minutes; an outlet empties it in 25 minutes. How long to fill with both open?', 'একটি নল 15 মিনিটে 300 লিটারের ট্যাঙ্ক ভরে; একটি নির্গম নল 25 মিনিটে খালি করে। দুটো খোলা থাকলে ভরতে কত সময়?'],
    ['Capacity 300 L; inlet time 15 min; outlet time 25 min.', 'ধারণক্ষমতা 300 লিটার; প্রবেশ নলের সময় 15 মিনিট; নির্গম নলের সময় 25 মিনিট।'], ['Net filling time.', 'নিট ভরার সময়।'],
    ['Convert each time to a rate, subtract, then divide capacity.', 'প্রত্যেক সময়কে হারে রূপান্তর করে বিয়োগ করো, তারপর ধারণক্ষমতা ভাগ করো।'],
    [['Inlet rate = 300 ÷ 15 = 20 L/min; outlet rate = 300 ÷ 25 = 12 L/min.', 'প্রবেশ নলের হার = 300 ÷ 15 = 20 লিটার/মিনিট; নির্গম নলের হার = 300 ÷ 25 = 12 লিটার/মিনিট।'], ['Net rate = 8 L/min; time = 300 ÷ 8 = 37.5 minutes.', 'নিট হার = 8 লিটার/মিনিট; সময় = 300 ÷ 8 = 37.5 মিনিট।']],
    ['37.5 minutes (37 minutes 30 seconds)', '37.5 মিনিট (37 মিনিট 30 সেকেন্ড)'], ['The inlet is faster, leaving a positive net rate of 8 L/min.', 'প্রবেশ নল দ্রুত, তাই নিট হার ধনাত্মক 8 লিটার/মিনিট।'],
  ),
);
lesson.strategy = {
  heading: t('A beginner’s pipes-and-cisterns guide', 'নতুনদের জন্য নল ও চৌবাচ্চার কৌশল'),
  sections: [
    { heading: t('1. Mark each pipe’s job', '1. প্রতিটি নলের কাজ চিহ্নিত করো'), body: t('An inlet fills and adds water. An outlet or leak empties and removes water.', 'প্রবেশ নল ভরে ও জল যোগ করে। নির্গম নল বা ফুটো খালি করে ও জল বার করে।') },
    { heading: t('2. Keep units consistent', '2. একক একই রাখো'), body: t('Rates and times must use matching units. Convert hours to minutes before combining rates if needed.', 'হার ও সময়ের একক মিলতে হবে। হার যোগ করার আগে প্রয়োজনে ঘণ্টাকে মিনিটে বদলাও।') },
    { heading: t('3. Convert time to rate when needed', '3. দরকার হলে সময়কে হারে বদলাও'), body: t('If a pipe fills a full tank in T units of time, its rate is one tank divided by T; with known capacity, use capacity ÷ T.', 'কোনো নল T সময়ে পুরো ট্যাঙ্ক ভরলে হার এক ট্যাঙ্ক ÷ T; ধারণক্ষমতা জানা থাকলে ধারণক্ষমতা ÷ T করো।') },
    { heading: t('4. Add and subtract in the right direction', '4. সঠিকভাবে যোগ-বিয়োগ করো'), body: t('Add inlet rates. Subtract every outlet or leak rate. If the result is zero or negative, the tank will not fill.', 'প্রবেশ নলের হার যোগ করো। প্রতিটি নির্গম নল বা ফুটোর হার বিয়োগ করো। ফল শূন্য বা ঋণাত্মক হলে ট্যাঙ্ক ভরবে না।') },
    { heading: t('5. Divide capacity by net rate', '5. ধারণক্ষমতাকে নিট হার দিয়ে ভাগ করো'), body: t('Once the net filling rate is known, time = capacity ÷ net rate. Check that rate × time returns the capacity.', 'নিট ভরার হার পেলে সময় = ধারণক্ষমতা ÷ নিট হার। হার × সময়ে ধারণক্ষমতা ফিরে আসে কি না যাচাই করো।') },
  ],
};
lesson.practice = {
  question: t('A 180 L tank has an inlet of 15 L/min and outlet of 3 L/min. How long to fill?', '180 লিটারের ট্যাঙ্কে প্রবেশ নল মিনিটে 15 লিটার ভরে এবং নির্গম নল 3 লিটার বার করে। ভরতে কত সময়?'),
  steps: [
    t('Net rate = 15 − 3 = 12 L/min.', 'নিট হার = 15 − 3 = 12 লিটার/মিনিট।'),
    t('Time = 180 ÷ 12 = 15 minutes.', 'সময় = 180 ÷ 12 = 15 মিনিট।'),
  ],
  answer: t('15 minutes', '15 মিনিট'),
};
