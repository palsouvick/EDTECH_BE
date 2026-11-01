'use strict';

// Question patterns: Pipes & Cistern. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'pipes_cistern',
  patterns: [
    {
      key: 'two_filling_pipes',
      emoji: '🚰',
      name: t('Two filling pipes together', 'দুটি ভরার নল একসঙ্গে'),
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“A fills the tank in x hours and B in y hours. If both are opened together, how long will they take?”', '“A চৌবাচ্চা x ঘণ্টায় ও B y ঘণ্টায় ভরে। দুটো একসঙ্গে খুললে কত সময় লাগবে?”'),
      formula: t(r`Rates add: $\frac{1}{x} + \frac{1}{y}$ per hour, so together time $= \frac{xy}{x + y}$.`, r`হার যোগ হয়: ঘণ্টায় $\frac{1}{x} + \frac{1}{y}$, তাই একসঙ্গে সময় $= \frac{xy}{x + y}$।`),
      shortcut: t('For two filling pipes, skip the LCM: time = (product of the solo times) ÷ (sum of the solo times).', 'দুটি ভরার নলের ক্ষেত্রে ল.সা.গু. বাদ দাও: সময় = (একা সময়ের গুণফল) ÷ (একা সময়ের যোগফল)।'),
      trap: t('Never add or average the two times — the together time is always less than the faster pipe alone.', 'দুটি সময় যোগ বা গড় কখনো করবে না — একসঙ্গে সময় সবসময় দ্রুততর নলটির একার সময়ের চেয়েও কম।'),
      spot: t(
        'Two pipes each **fill** the tank alone in a given time, and both are opened **together**.',
        'দুটি নল আলাদাভাবে নির্দিষ্ট সময়ে চৌবাচ্চা **ভরে**, আর দুটোকে **একসঙ্গে** খুলে দেওয়া হয়।',
      ),
      method: [
        t('Tank capacity = LCM of the times (in units).', 'চৌবাচ্চার ধারণক্ষমতা = সময়গুলোর ল.সা.গু. (একক হিসেবে)।'),
        t('Each pipe fills capacity ÷ its time units per hour.', 'প্রতিটি নল ঘণ্টায় ভরে ধারণক্ষমতা ÷ তার সময় একক।'),
        t('Time together = capacity ÷ (sum of hourly units).', 'একসঙ্গে সময় = ধারণক্ষমতা ÷ (ঘণ্টায় ভরা এককের যোগফল)।'),
      ],
      example: {
        question: t(
          'Pipe A can fill a tank in 20 hours and pipe B in 30 hours. If both are opened together, how long will they take to fill the tank?',
          'নল A একটি চৌবাচ্চা 20 ঘণ্টায় এবং নল B 30 ঘণ্টায় ভরতে পারে। দুটো একসঙ্গে খুলে দিলে চৌবাচ্চা ভরতে কত সময় লাগবে?',
        ),
        steps: [
          t(r`Capacity = LCM of 20 and 30 = $60$ units.`, r`ধারণক্ষমতা = 20 ও 30-এর ল.সা.গু. = $60$ একক।`),
          t(r`A fills $3$ units per hour, B fills $2$ units per hour.`, r`A ঘণ্টায় $3$ একক, B ঘণ্টায় $2$ একক ভরে।`),
          t(r`Together $3 + 2 = 5$ units per hour, so time $= 60 \div 5 = 12$ hours.`, r`একসঙ্গে ঘণ্টায় $3 + 2 = 5$ একক, তাই সময় $= 60 \div 5 = 12$ ঘণ্টা।`),
        ],
        answer: t('12 hours', '12 ঘণ্টা'),
      },
      tryIt: {
        question: t(
          'Pipe A fills a tank in 18 hours and pipe B fills it in 9 hours. How many hours will both pipes take together?',
          'নল A একটি চৌবাচ্চা 18 ঘণ্টায় এবং নল B 9 ঘণ্টায় ভরে। দুটি নল একসঙ্গে খুললে কত ঘণ্টা লাগবে?',
        ),
        options: [t('13.5', '13.5'), t('27', '27'), t('6', '6'), t('9', '9')],
        correct: 2,
        explanation: [
          t(r`Capacity = LCM of 18 and 9 = $18$ units. A fills $1$ unit per hour, B fills $2$.`, r`ধারণক্ষমতা = 18 ও 9-এর ল.সা.গু. = $18$ একক। A ঘণ্টায় $1$ একক, B ঘণ্টায় $2$ একক ভরে।`),
          t(r`Together $3$ units per hour, so time $= 18 \div 3 = 6$ hours. (Together must be faster than either pipe alone.)`, r`একসঙ্গে ঘণ্টায় $3$ একক, তাই সময় $= 18 \div 3 = 6$ ঘণ্টা। (একসঙ্গে সময় যে-কোনো একটি নলের সময়ের থেকে কম হবেই।)`),
        ],
      },
    },
    {
      key: 'fill_and_leak',
      emoji: '💧',
      name: t('One fills, one empties', 'একটি ভরে, একটি খালি করে'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“A pipe fills the tank in x hours and a leak empties it in y hours. If both are open, how long to fill the tank?”', '“একটি নল চৌবাচ্চা x ঘণ্টায় ভরে আর একটি ফুটো y ঘণ্টায় খালি করে। দুটোই খোলা থাকলে ভরতে কত সময় লাগবে?”'),
      formula: t(r`Net rate $= \frac{1}{x} - \frac{1}{y}$ per hour, so time $= \frac{xy}{y - x}$ (needs $y > x$).`, r`নিট হার $= \frac{1}{x} - \frac{1}{y}$ প্রতি ঘণ্টা, তাই সময় $= \frac{xy}{y - x}$ ($y > x$ হতে হবে)।`),
      shortcut: t('Use LCM units and give the emptying pipe a minus sign; capacity ÷ net units is the whole method — no fractions needed.', 'ল.সা.গু. একক নাও আর খালি করা নলকে বিয়োগ চিহ্ন দাও; ধারণক্ষমতা ÷ নিট একক — এটাই পুরো পদ্ধতি, ভগ্নাংশ লাগে না।'),
      trap: t('If the outlet empties faster than the inlet fills, the net is zero or negative and the tank never fills — check the sign before dividing.', 'নির্গম নল ভরার নলের চেয়ে দ্রুত খালি করলে নিট শূন্য বা ঋণাত্মক হয় আর চৌবাচ্চা কখনো ভরে না — ভাগ করার আগে চিহ্নটা দেখে নাও।'),
      spot: t(
        'One pipe **fills** and another pipe (or a hole/leak) **empties**, and both are open at the same time.',
        'একটি নল **ভরে** আর অন্য নল (বা ফুটো) **খালি করে**, এবং দুটোই একসঙ্গে খোলা থাকে।',
      ),
      method: [
        t('Capacity = LCM of the two times.', 'ধারণক্ষমতা = দুটি সময়ের ল.সা.গু.।'),
        t('Filling pipe = + units per hour, emptying pipe = − units per hour.', 'ভরার নল = + একক প্রতি ঘণ্টা, খালি করার নল = − একক প্রতি ঘণ্টা।'),
        t('Net = filling − emptying. Time = capacity ÷ net.', 'নিট = ভরা − খালি। সময় = ধারণক্ষমতা ÷ নিট।'),
      ],
      example: {
        question: t(
          'A pipe can fill a tank in 6 hours, and a leak can empty the full tank in 9 hours. If both are open, how long will it take to fill the tank?',
          'একটি নল চৌবাচ্চা 6 ঘণ্টায় ভরতে পারে, আর একটি ফুটো ভরা চৌবাচ্চা 9 ঘণ্টায় খালি করে। দুটোই খোলা থাকলে চৌবাচ্চা ভরতে কত সময় লাগবে?',
        ),
        steps: [
          t(r`Capacity = LCM of 6 and 9 = $18$ units.`, r`ধারণক্ষমতা = 6 ও 9-এর ল.সা.গু. = $18$ একক।`),
          t(r`Pipe: $+3$ units per hour. Leak: $-2$ units per hour.`, r`নল: ঘণ্টায় $+3$ একক। ফুটো: ঘণ্টায় $-2$ একক।`),
          t(r`Net $= 3 - 2 = 1$ unit per hour, so time $= 18 \div 1 = 18$ hours.`, r`নিট $= 3 - 2 = 1$ একক প্রতি ঘণ্টা, তাই সময় $= 18 \div 1 = 18$ ঘণ্টা।`),
        ],
        answer: t('18 hours', '18 ঘণ্টা'),
      },
      tryIt: {
        question: t(
          'A pipe fills a tank in 8 hours, while an outlet pipe empties the full tank in 12 hours. If both are opened together on an empty tank, when will it be full?',
          'একটি নল চৌবাচ্চা 8 ঘণ্টায় ভরে, আর একটি নির্গম নল ভরা চৌবাচ্চা 12 ঘণ্টায় খালি করে। খালি চৌবাচ্চায় দুটো একসঙ্গে খুললে কত ঘণ্টায় ভরবে?',
        ),
        options: [t('4.8', '4.8'), t('24', '24'), t('4', '4'), t('20', '20')],
        correct: 1,
        explanation: [
          t(r`Capacity = LCM of 8 and 12 = $24$ units. Fill pipe $+3$, outlet $-2$ units per hour.`, r`ধারণক্ষমতা = 8 ও 12-এর ল.সা.গু. = $24$ একক। ভরার নল $+3$, নির্গম নল $-2$ একক প্রতি ঘণ্টা।`),
          t(r`Net $= 1$ unit per hour, so time $= 24 \div 1 = 24$ hours. (Adding both as filling gives the wrong 4.8.)`, r`নিট $= 1$ একক প্রতি ঘণ্টা, তাই সময় $= 24 \div 1 = 24$ ঘণ্টা। (দুটোকেই ভরার নল ধরলে ভুল উত্তর 4.8 আসে।)`),
        ],
      },
    },
    {
      key: 'find_the_leak',
      emoji: '🕳️',
      name: t('Leak makes it slower: find the leak', 'ফুটোর জন্য দেরি: ফুটোর সময় বের করো'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“A pipe fills the tank in x hours, but because of a leak it takes y hours. In how many hours can the leak alone empty the full tank?”', '“একটি নল চৌবাচ্চা x ঘণ্টায় ভরে, কিন্তু ফুটোর জন্য y ঘণ্টা লাগে। ফুটো একা ভরা চৌবাচ্চা কত ঘণ্টায় খালি করবে?”'),
      formula: t(r`Leak rate $= \frac{1}{x} - \frac{1}{y}$ per hour, so leak time $= \frac{xy}{y - x}$.`, r`ফুটোর হার $= \frac{1}{x} - \frac{1}{y}$ প্রতি ঘণ্টা, তাই ফুটোর সময় $= \frac{xy}{y - x}$।`),
      shortcut: t('In LCM units: leak units per hour = (pipe alone units) − (pipe with leak units); then capacity ÷ leak units.', 'ল.সা.গু. এককে: ফুটোর প্রতি ঘণ্টার একক = (নল একার একক) − (ফুটোসহ নলের একক); তারপর ধারণক্ষমতা ÷ ফুটোর একক।'),
      trap: t('The leak time is not the difference of the two times (y − x) — rates subtract, times never do.', 'ফুটোর সময় দুটি সময়ের বিয়োগফল (y − x) নয় — হার বিয়োগ হয়, সময় কখনো নয়।'),
      spot: t(
        'A pipe normally fills a tank in some time, but **because of a leak** it takes longer. You must find how long the leak alone takes to empty the tank.',
        'একটি নল সাধারণত নির্দিষ্ট সময়ে চৌবাচ্চা ভরে, কিন্তু **ফুটোর জন্য** বেশি সময় লাগে। ফুটো একা কত সময়ে ভরা চৌবাচ্চা খালি করবে তা বের করতে হয়।',
      ),
      method: [
        t('Capacity = LCM of the normal time and the slower time.', 'ধারণক্ষমতা = স্বাভাবিক সময় ও দেরির সময়ের ল.সা.গু.।'),
        t('Pipe alone fills more per hour; pipe + leak fills less per hour.', 'নল একা ঘণ্টায় বেশি ভরে; নল + ফুটো মিলে ঘণ্টায় কম ভরে।'),
        t('Leak = (pipe alone) − (pipe with leak). Time for leak = capacity ÷ leak.', 'ফুটো = (নল একা) − (ফুটোসহ নল)। ফুটোর সময় = ধারণক্ষমতা ÷ ফুটো।'),
      ],
      example: {
        question: t(
          'A pipe fills a tank in 10 hours. Because of a leak at the bottom, it takes 12 hours. In how many hours can the leak alone empty the full tank?',
          'একটি নল চৌবাচ্চা 10 ঘণ্টায় ভরে। তলায় একটি ফুটো থাকায় 12 ঘণ্টা লাগে। ফুটোটি একা ভরা চৌবাচ্চা কত ঘণ্টায় খালি করবে?',
        ),
        steps: [
          t(r`Capacity = LCM of 10 and 12 = $60$ units.`, r`ধারণক্ষমতা = 10 ও 12-এর ল.সা.গু. = $60$ একক।`),
          t(r`Pipe alone: $6$ units per hour. Pipe with leak: $5$ units per hour.`, r`নল একা: ঘণ্টায় $6$ একক। ফুটোসহ: ঘণ্টায় $5$ একক।`),
          t(r`Leak empties $6 - 5 = 1$ unit per hour, so it takes $60 \div 1 = 60$ hours.`, r`ফুটো ঘণ্টায় $6 - 5 = 1$ একক খালি করে, তাই সময় $60 \div 1 = 60$ ঘণ্টা।`),
        ],
        answer: t('60 hours', '60 ঘণ্টা'),
      },
      tryIt: {
        question: t(
          'A tap can fill a cistern in 6 hours. Due to a leak, it takes 8 hours to fill. How long will the leak take to empty the full cistern?',
          'একটি কল একটি চৌবাচ্চা 6 ঘণ্টায় ভরতে পারে। একটি ফুটোর জন্য ভরতে 8 ঘণ্টা লাগে। ফুটোটি ভরা চৌবাচ্চা কত ঘণ্টায় খালি করবে?',
        ),
        options: [t('2', '2'), t('14', '14'), t('24', '24'), t('48', '48')],
        correct: 2,
        explanation: [
          t(r`Capacity = LCM of 6 and 8 = $24$ units. Tap alone $4$ units per hour; with leak $3$ units per hour.`, r`ধারণক্ষমতা = 6 ও 8-এর ল.সা.গু. = $24$ একক। কল একা ঘণ্টায় $4$ একক; ফুটোসহ ঘণ্টায় $3$ একক।`),
          t(r`Leak $= 4 - 3 = 1$ unit per hour, so it empties the tank in $24 \div 1 = 24$ hours.`, r`ফুটো $= 4 - 3 = 1$ একক প্রতি ঘণ্টা, তাই খালি করতে লাগে $24 \div 1 = 24$ ঘণ্টা।`),
        ],
      },
    },
    {
      key: 'three_pipes',
      emoji: '🔀',
      name: t('Three pipes: two fill, one empties', 'তিনটি নল: দুটি ভরে, একটি খালি করে'),
      difficulty: 'intermediate',
      typicalWording: t('“A and B can fill the tank in x and y hours; C can empty it in z hours. If all three are opened together, when will the tank be full?”', '“A ও B চৌবাচ্চা x ও y ঘণ্টায় ভরতে পারে; C এটি z ঘণ্টায় খালি করে। তিনটি একসঙ্গে খুললে কখন চৌবাচ্চা ভরবে?”'),
      formula: t(r`Net rate $= \frac{1}{x} + \frac{1}{y} - \frac{1}{z}$ per hour; time $= 1 \div$ net rate.`, r`নিট হার $= \frac{1}{x} + \frac{1}{y} - \frac{1}{z}$ প্রতি ঘণ্টা; সময় $= 1 \div$ নিট হার।`),
      shortcut: t('Take one LCM of all three times, write the three signed units (+ for fill, − for empty) and add them in a single line.', 'তিনটি সময়ের একটাই ল.সা.গু. নাও, তিনটি চিহ্নযুক্ত একক (ভরলে +, খালি করলে −) লিখে এক লাইনে যোগ করো।'),
      trap: t('Giving the emptying pipe a plus sign is the classic error — the answer then looks deceptively small.', 'খালি করা নলকে যোগ চিহ্ন দেওয়াই চিরাচরিত ভুল — তখন উত্তরটা বিভ্রান্তিকরভাবে ছোট দেখায়।'),
      spot: t(
        '**Three pipes** are opened together; one or more of them empties the tank.',
        '**তিনটি নল** একসঙ্গে খোলা হয়; তার মধ্যে এক বা একাধিক নল চৌবাচ্চা খালি করে।',
      ),
      method: [
        t('Capacity = LCM of all three times.', 'ধারণক্ষমতা = তিনটি সময়ের ল.সা.গু.।'),
        t('Write each pipe\'s hourly units with sign: + for filling, − for emptying.', 'প্রতিটি নলের ঘণ্টার একক চিহ্নসহ লেখো: ভরলে +, খালি করলে −।'),
        t('Add them to get the net; time = capacity ÷ net.', 'যোগ করে নিট পাও; সময় = ধারণক্ষমতা ÷ নিট।'),
      ],
      example: {
        question: t(
          'Pipes A and B can fill a tank in 12 hours and 15 hours respectively. Pipe C can empty the full tank in 10 hours. If all three are opened together, in how many hours will the tank be full?',
          'নল A ও B একটি চৌবাচ্চা যথাক্রমে 12 ঘণ্টা ও 15 ঘণ্টায় ভরতে পারে। নল C ভরা চৌবাচ্চা 10 ঘণ্টায় খালি করে। তিনটি নল একসঙ্গে খুললে কত ঘণ্টায় চৌবাচ্চা ভরবে?',
        ),
        steps: [
          t(r`Capacity = LCM of 12, 15, 10 = $60$ units.`, r`ধারণক্ষমতা = 12, 15, 10-এর ল.সা.গু. = $60$ একক।`),
          t(r`A: $+5$, B: $+4$, C: $-6$ units per hour.`, r`A: $+5$, B: $+4$, C: $-6$ একক প্রতি ঘণ্টা।`),
          t(r`Net $= 5 + 4 - 6 = 3$ units per hour, so time $= 60 \div 3 = 20$ hours.`, r`নিট $= 5 + 4 - 6 = 3$ একক প্রতি ঘণ্টা, তাই সময় $= 60 \div 3 = 20$ ঘণ্টা।`),
        ],
        answer: t('20 hours', '20 ঘণ্টা'),
      },
      tryIt: {
        question: t(
          'Two pipes can fill a tank in 8 hours and 12 hours. A third pipe can empty the full tank in 6 hours. If all three are opened together on an empty tank, how many hours will it take to fill?',
          'দুটি নল একটি চৌবাচ্চা 8 ঘণ্টা ও 12 ঘণ্টায় ভরতে পারে। তৃতীয় একটি নল ভরা চৌবাচ্চা 6 ঘণ্টায় খালি করে। খালি চৌবাচ্চায় তিনটি নল একসঙ্গে খুললে ভরতে কত ঘণ্টা লাগবে?',
        ),
        options: [t('24', '24'), t(r`$2\frac{2}{3}$`, r`$2\frac{2}{3}$`), t('4.8', '4.8'), t('26', '26')],
        correct: 0,
        explanation: [
          t(r`Capacity = LCM of 8, 12, 6 = $24$ units. Pipes: $+3$, $+2$, $-4$ units per hour.`, r`ধারণক্ষমতা = 8, 12, 6-এর ল.সা.গু. = $24$ একক। নলগুলো: $+3$, $+2$, $-4$ একক প্রতি ঘণ্টা।`),
          t(r`Net $= 3 + 2 - 4 = 1$ unit per hour, so time $= 24 \div 1 = 24$ hours.`, r`নিট $= 3 + 2 - 4 = 1$ একক প্রতি ঘণ্টা, তাই সময় $= 24 \div 1 = 24$ ঘণ্টা।`),
          t(r`Careful: taking the third pipe as filling gives $24 \div 9 = 2\frac{2}{3}$ (wrong).`, r`সাবধান: তৃতীয় নলটিকে ভরার নল ধরলে $24 \div 9 = 2\frac{2}{3}$ আসে (ভুল)।`),
        ],
      },
    },
    {
      key: 'pipe_closed_midway',
      emoji: '⏱️',
      name: t('A pipe is closed after some time', 'কিছুক্ষণ পর একটি নল বন্ধ করা হলে'),
      difficulty: 'advanced',
      typicalWording: t('“Both pipes are opened together, but after m minutes pipe A is closed. In how many minutes in all will the tank be full?”', '“দুটি নল একসঙ্গে খোলা হল, কিন্তু m মিনিট পর নল A বন্ধ করা হল। মোট কত মিনিটে চৌবাচ্চা ভরবে?”'),
      formula: t(r`Filled together $= (r_A + r_B) \times m$; extra time $=$ remaining units $\div r$ of the pipe left open.`, r`একসঙ্গে ভরা $= (r_A + r_B) \times m$; বাড়তি সময় $=$ বাকি একক $\div$ খোলা থাকা নলের $r$।`),
      shortcut: t('Work in per-minute LCM units: the joint phase is just (sum of units) × minutes, then one division finishes it.', 'প্রতি মিনিটের ল.সা.গু. এককে কাজ করো: যৌথ পর্যায় হল শুধু (এককের যোগফল) × মিনিট, তারপর একটা ভাগেই শেষ।'),
      trap: t('Read the question carefully: the extra time after closing and the total time differ by the joint minutes — answering the wrong one is the standard slip.', 'প্রশ্নটা মন দিয়ে পড়ো: বন্ধ করার পরের বাড়তি সময় আর মোট সময়ের তফাৎ যৌথ মিনিটগুলো — ভুলটা উত্তর দেওয়াই চেনা ভুল।'),
      spot: t(
        'Both pipes are opened together, but one is **closed (turned off) after a few minutes**, and the other fills the rest.',
        'দুটি নল একসঙ্গে খোলা হয়, কিন্তু **কয়েক মিনিট পর একটি বন্ধ করে দেওয়া হয়**, বাকিটা অন্য নল ভরে।',
      ),
      method: [
        t('Capacity = LCM of the times; find each pipe\'s units per minute.', 'ধারণক্ষমতা = সময়গুলোর ল.সা.গু.; প্রতিটি নলের প্রতি মিনিটের একক বের করো।'),
        t('Filled together = (sum) × minutes both were open.', 'একসঙ্গে ভরা = (যোগফল) × দুটো যতক্ষণ খোলা ছিল।'),
        t('Remaining ÷ the open pipe\'s rate = extra minutes.', 'বাকি অংশ ÷ খোলা নলের হার = বাড়তি মিনিট।'),
        t('Read the question: does it want the extra time or the total time?', 'প্রশ্নটা ভালো করে পড়ো: বাড়তি সময় চাইছে, না মোট সময়?'),
      ],
      example: {
        question: t(
          'Pipes A and B can fill a tank in 15 minutes and 20 minutes. Both are opened together, and after 6 minutes pipe A is closed. In how many minutes in all will the tank be full?',
          'নল A ও B একটি চৌবাচ্চা 15 মিনিট ও 20 মিনিটে ভরতে পারে। দুটো একসঙ্গে খোলার 6 মিনিট পর নল A বন্ধ করা হল। মোট কত মিনিটে চৌবাচ্চা ভরবে?',
        ),
        steps: [
          t(r`Capacity = LCM of 15 and 20 = $60$ units. A fills $4$, B fills $3$ units per minute.`, r`ধারণক্ষমতা = 15 ও 20-এর ল.সা.গু. = $60$ একক। A মিনিটে $4$, B মিনিটে $3$ একক ভরে।`),
          t(r`In 6 minutes together: $7 \times 6 = 42$ units. Remaining $= 60 - 42 = 18$ units.`, r`6 মিনিটে একসঙ্গে: $7 \times 6 = 42$ একক। বাকি $= 60 - 42 = 18$ একক।`),
          t(r`B alone: $18 \div 3 = 6$ more minutes.`, r`B একা: $18 \div 3 = 6$ মিনিট বেশি।`),
          t(r`Total time $= 6 + 6 = 12$ minutes.`, r`মোট সময় $= 6 + 6 = 12$ মিনিট।`),
        ],
        answer: t('12 minutes', '12 মিনিট'),
      },
      tryIt: {
        question: t(
          'Pipes A and B can fill a tank in 24 minutes and 36 minutes respectively. Both are opened together, and after 8 minutes pipe A is turned off. How many more minutes will B take to fill the tank?',
          'নল A ও B একটি চৌবাচ্চা যথাক্রমে 24 মিনিট ও 36 মিনিটে ভরতে পারে। দুটো একসঙ্গে খোলার 8 মিনিট পর নল A বন্ধ করা হল। চৌবাচ্চা ভরতে B-এর আর কত মিনিট লাগবে?',
        ),
        options: [t('24', '24'), t('28', '28'), t('16', '16'), t('32', '32')],
        correct: 2,
        explanation: [
          t(r`Capacity = LCM of 24 and 36 = $72$ units. A fills $3$, B fills $2$ units per minute.`, r`ধারণক্ষমতা = 24 ও 36-এর ল.সা.গু. = $72$ একক। A মিনিটে $3$, B মিনিটে $2$ একক ভরে।`),
          t(r`In 8 minutes together: $5 \times 8 = 40$ units, so $72 - 40 = 32$ units are left.`, r`8 মিনিটে একসঙ্গে: $5 \times 8 = 40$ একক, তাই বাকি $72 - 40 = 32$ একক।`),
          t(r`B alone: $32 \div 2 = 16$ more minutes. (24 is the total time, not the extra time.)`, r`B একা: $32 \div 2 = 16$ মিনিট বেশি। (24 হল মোট সময়, বাড়তি সময় নয়।)`),
        ],
      },
    },
    {
      key: 'fraction_rate',
      emoji: '🧩',
      name: t('Rate from a filled fraction', 'ভরা ভগ্নাংশ থেকে হার'),
      difficulty: 'beginner',
      typicalWording: t('“A pipe fills 3/5 of the tank in 12 minutes. How long will it take to fill the whole tank?”', '“একটি নল 12 মিনিটে চৌবাচ্চার 3/5 অংশ ভরে। পুরো চৌবাচ্চা ভরতে কত সময় লাগবে?”'),
      formula: t(r`If fraction $f$ is filled in time $T$, full time $= T \div f = T \times \frac{1}{f}$.`, r`যদি $T$ সময়ে $f$ ভগ্নাংশ ভরে, পুরো সময় $= T \div f = T \times \frac{1}{f}$।`),
      shortcut: t('Multiply the given time by the flipped fraction (denominator ÷ numerator): 12 min for 3/5 means 12 × 5/3.', 'দেওয়া সময়কে উল্টানো ভগ্নাংশ (হর ÷ লব) দিয়ে গুণ করো: 3/5-এর জন্য 12 মিনিট মানে 12 × 5/3।'),
      trap: t('Do not multiply by the fraction itself — that gives the time for an even smaller part, not the whole tank.', 'ভগ্নাংশটা দিয়েই গুণ করবে না — তাতে আরও ছোট অংশের সময় আসবে, পুরো চৌবাচ্চার নয়।'),
      spot: t(
        'No full-tank time is given. Instead, the pipe fills a **fraction of the tank** (like 3/5 or 2/3) in a stated time, and you must scale up to the whole tank.',
        'পুরো চৌবাচ্চার সময় দেওয়া নেই। বরং নলটি নির্দিষ্ট সময়ে চৌবাচ্চার একটি **ভগ্নাংশ** (যেমন 3/5 বা 2/3) ভরে, আর সেখান থেকে পুরোটার হিসাব করতে হয়।',
      ),
      method: [
        t('Rate per unit time = filled fraction ÷ time taken.', 'প্রতি একক সময়ের হার = ভরা ভগ্নাংশ ÷ লাগা সময়।'),
        t('Full time = 1 ÷ rate, i.e. time × (denominator ÷ numerator of the fraction).', 'পুরো সময় = 1 ÷ হার, অর্থাৎ সময় × (ভগ্নাংশের হর ÷ লব)।'),
        t('For any other fraction, multiply the rate by the minutes (or the full time by the fraction).', 'অন্য কোনো ভগ্নাংশের জন্য হারকে মিনিট দিয়ে (বা পুরো সময়কে ভগ্নাংশ দিয়ে) গুণ করো।'),
      ],
      example: {
        question: t(
          'A pipe fills 3/5 of a tank in 12 minutes. In how many minutes will it fill the whole tank?',
          'একটি নল 12 মিনিটে একটি চৌবাচ্চার 3/5 অংশ ভরে। পুরো চৌবাচ্চা ভরতে কত মিনিট লাগবে?',
        ),
        steps: [
          t(r`In 1 minute the pipe fills $\frac{3}{5} \div 12 = \frac{1}{20}$ of the tank.`, r`1 মিনিটে নলটি ভরে $\frac{3}{5} \div 12 = \frac{1}{20}$ অংশ।`),
          t(r`So the whole tank takes $1 \div \frac{1}{20} = 20$ minutes.`, r`তাই পুরো চৌবাচ্চা ভরতে লাগে $1 \div \frac{1}{20} = 20$ মিনিট।`),
          t(r`Quick check: $12 \times \frac{5}{3} = 20$ minutes.`, r`ঝটপট যাচাই: $12 \times \frac{5}{3} = 20$ মিনিট।`),
        ],
        answer: t('20 minutes', '20 মিনিট'),
      },
      tryIt: {
        question: t(
          'A tap fills 2/5 of a cistern in 10 minutes. How many minutes will it take to fill the whole cistern?',
          'একটি কল 10 মিনিটে একটি চৌবাচ্চার 2/5 অংশ ভরে। পুরো চৌবাচ্চা ভরতে কত মিনিট লাগবে?',
        ),
        options: [t('4', '4'), t('25', '25'), t('20', '20'), t('15', '15')],
        correct: 1,
        explanation: [
          t(r`Rate per minute $= \frac{2}{5} \div 10 = \frac{1}{25}$ of the cistern.`, r`প্রতি মিনিটের হার $= \frac{2}{5} \div 10 = \frac{1}{25}$ অংশ।`),
          t(r`Full time $= 10 \times \frac{5}{2} = 25$ minutes. (Multiplying by 2/5 instead gives the wrong 4.)`, r`পুরো সময় $= 10 \times \frac{5}{2} = 25$ মিনিট। (2/5 দিয়ে গুণ করলে ভুল উত্তর 4 আসে।)`),
        ],
      },
    },
    {
      key: 'efficiency_ratio_pipes',
      emoji: '⚡',
      name: t('One pipe is twice as fast (efficiency ratio)', 'একটি নল দ্বিগুণ দ্রুত (দক্ষতার অনুপাত)'),
      difficulty: 'beginner',
      typicalWording: t('“Pipe A is twice as fast as pipe B. Together they fill the tank in x hours. How long does A (or B) alone take?”', '“নল A, নল B-এর দ্বিগুণ দ্রুত। একসঙ্গে তারা চৌবাচ্চা x ঘণ্টায় ভরে। A (বা B) একা কত সময় নেবে?”'),
      formula: t(r`Speed ratio $a:b$ means hourly units $a:b$; capacity $= (a + b) \times$ together time.`, r`গতির অনুপাত $a:b$ হলে ঘণ্টার একক $a:b$; ধারণক্ষমতা $= (a + b) \times$ একসঙ্গে লাগা সময়।`),
      shortcut: t('Use the ratio numbers directly as units per hour — no solo times and no LCM are needed at all.', 'অনুপাতের সংখ্যাগুলোকেই সরাসরি প্রতি ঘণ্টার একক ধরো — একার সময় বা ল.সা.গু. কোনোটাই লাগে না।'),
      trap: t('The faster pipe takes the smaller time: time ratio is the inverse of the speed ratio, so do not give A the bigger share of time.', 'দ্রুততর নল কম সময় নেয়: সময়ের অনুপাত গতির অনুপাতের উল্টো, তাই A-কে বেশি সময় দিও না।'),
      spot: t(
        'The pipes are compared by **speed** — “A is twice/thrice as fast as B” — and their **together time** is given instead of solo times.',
        'নলগুলোর তুলনা হয় **গতি** দিয়ে — “A, B-এর দ্বিগুণ/তিনগুণ দ্রুত” — আর একার সময়ের বদলে **একসঙ্গে লাগা সময়** দেওয়া থাকে।',
      ),
      method: [
        t('Write the speeds as units per hour from the ratio, e.g. A : B = 2 : 1.', 'অনুপাত থেকে গতি প্রতি ঘণ্টার এককে লেখো, যেমন A : B = 2 : 1।'),
        t('Capacity = (sum of units) × together time.', 'ধারণক্ষমতা = (এককের যোগফল) × একসঙ্গে লাগা সময়।'),
        t('Solo time of a pipe = capacity ÷ its units.', 'কোনো নলের একার সময় = ধারণক্ষমতা ÷ তার একক।'),
      ],
      example: {
        question: t(
          'Pipe A is twice as fast as pipe B. Together they can fill a tank in 6 hours. In how many hours can pipe A alone fill the tank?',
          'নল A, নল B-এর দ্বিগুণ দ্রুত। দুটো একসঙ্গে একটি চৌবাচ্চা 6 ঘণ্টায় ভরতে পারে। নল A একা চৌবাচ্চাটি কত ঘণ্টায় ভরবে?',
        ),
        steps: [
          t(r`Speeds A : B $= 2 : 1$, so A fills $2$ units and B fills $1$ unit per hour.`, r`গতি A : B $= 2 : 1$, তাই A ঘণ্টায় $2$ একক ও B ঘণ্টায় $1$ একক ভরে।`),
          t(r`Capacity $= (2 + 1) \times 6 = 18$ units.`, r`ধারণক্ষমতা $= (2 + 1) \times 6 = 18$ একক।`),
          t(r`A alone: $18 \div 2 = 9$ hours.`, r`A একা: $18 \div 2 = 9$ ঘণ্টা।`),
        ],
        answer: t('9 hours', '9 ঘণ্টা'),
      },
      tryIt: {
        question: t(
          'Pipe A is three times as fast as pipe B. Working together, they fill a tank in 6 hours. How many hours will pipe B alone take to fill the tank?',
          'নল A, নল B-এর তিনগুণ দ্রুত। দুটো একসঙ্গে কাজ করে একটি চৌবাচ্চা 6 ঘণ্টায় ভরে। নল B একা চৌবাচ্চাটি ভরতে কত ঘণ্টা নেবে?',
        ),
        options: [t('8', '8'), t('24', '24'), t('18', '18'), t('12', '12')],
        correct: 1,
        explanation: [
          t(r`Speeds A : B $= 3 : 1$, so capacity $= (3 + 1) \times 6 = 24$ units.`, r`গতি A : B $= 3 : 1$, তাই ধারণক্ষমতা $= (3 + 1) \times 6 = 24$ একক।`),
          t(r`B fills $1$ unit per hour, so B alone takes $24 \div 1 = 24$ hours. (8 hours is A's time — the faster pipe.)`, r`B ঘণ্টায় $1$ একক ভরে, তাই B একা নেয় $24 \div 1 = 24$ ঘণ্টা। (8 ঘণ্টা হল দ্রুততর নল A-এর সময়।)`),
        ],
      },
    },
    {
      key: 'tank_capacity_litres',
      emoji: '🪣',
      name: t('Find the capacity in litres', 'ধারণক্ষমতা লিটারে বের করো'),
      difficulty: 'intermediate',
      typicalWording: t('“A pipe pours x litres per minute and fills the tank in T minutes. Find the capacity of the tank / how long another pipe takes.”', '“একটি নল প্রতি মিনিটে x লিটার ঢালে এবং T মিনিটে চৌবাচ্চা ভরে। চৌবাচ্চার ধারণক্ষমতা / অন্য নলের সময় বের করো।”'),
      formula: t(r`Capacity (litres) $=$ flow rate (litres per minute) $\times$ filling time (minutes).`, r`ধারণক্ষমতা (লিটার) $=$ প্রবাহের হার (লিটার প্রতি মিনিট) $\times$ ভরার সময় (মিনিট)।`),
      shortcut: t('Once the capacity in litres is known, every other pipe is just capacity ÷ its own litre-rate — treat litres as the LCM units.', 'ধারণক্ষমতা লিটারে পেয়ে গেলে বাকি সব নল হল ধারণক্ষমতা ÷ তার নিজের লিটার-হার — লিটারকেই ল.সা.গু. এককের মতো ব্যবহার করো।'),
      trap: t('Keep the time unit consistent: a rate in litres per minute must be multiplied by minutes, not hours — convert first if the time is given in hours.', 'সময়ের একক মিলিয়ে রাখো: প্রতি মিনিটের হারকে মিনিট দিয়েই গুণ করতে হবে, ঘণ্টা দিয়ে নয় — সময় ঘণ্টায় থাকলে আগে বদলে নাও।'),
      spot: t(
        'A pipe\'s flow is given in **litres per minute** along with its filling time, and the question asks for the tank\'s **capacity in litres** (or uses that capacity for a second pipe).',
        'একটি নলের প্রবাহ **লিটার প্রতি মিনিটে** দেওয়া থাকে, সঙ্গে তার ভরার সময়ও; প্রশ্নে চৌবাচ্চার **ধারণক্ষমতা লিটারে** চাওয়া হয় (বা সেই ধারণক্ষমতা দিয়ে দ্বিতীয় নলের হিসাব করতে হয়)।',
      ),
      method: [
        t('Capacity = flow rate × filling time of that pipe (watch the units).', 'ধারণক্ষমতা = প্রবাহের হার × সেই নলের ভরার সময় (একক খেয়াল রাখো)।'),
        t('For combined pipes, add the litre-rates first, then time = capacity ÷ combined rate.', 'দুটি নল একসঙ্গে হলে আগে লিটার-হার যোগ করো, তারপর সময় = ধারণক্ষমতা ÷ মিলিত হার।'),
        t('For another single pipe, time = capacity ÷ its litre-rate.', 'অন্য একটি নলের জন্য সময় = ধারণক্ষমতা ÷ তার লিটার-হার।'),
      ],
      example: {
        question: t(
          'Pipe A pours 30 litres per minute and fills a tank in 40 minutes. Pipe B pours 20 litres per minute. If both pipes are opened together, in how many minutes will the tank be full?',
          'নল A প্রতি মিনিটে 30 লিটার জল ঢালে এবং একটি চৌবাচ্চা 40 মিনিটে ভরে। নল B প্রতি মিনিটে 20 লিটার ঢালে। দুটি নল একসঙ্গে খুললে কত মিনিটে চৌবাচ্চা ভরবে?',
        ),
        steps: [
          t(r`Capacity of the tank $= 30 \times 40 = 1200$ litres.`, r`চৌবাচ্চার ধারণক্ষমতা $= 30 \times 40 = 1200$ লিটার।`),
          t(r`Together the pipes pour $30 + 20 = 50$ litres per minute.`, r`একসঙ্গে নলদুটি মিনিটে $30 + 20 = 50$ লিটার ঢালে।`),
          t(r`Time $= 1200 \div 50 = 24$ minutes.`, r`সময় $= 1200 \div 50 = 24$ মিনিট।`),
        ],
        answer: t('24 minutes', '24 মিনিট'),
      },
      tryIt: {
        question: t(
          'A pipe pours 25 litres per minute and can fill a tank in 48 minutes. Another pipe pours 40 litres per minute. How many minutes will the second pipe alone take to fill the same tank?',
          'একটি নল প্রতি মিনিটে 25 লিটার ঢালে এবং একটি চৌবাচ্চা 48 মিনিটে ভরতে পারে। অন্য একটি নল প্রতি মিনিটে 40 লিটার ঢালে। দ্বিতীয় নলটি একা একই চৌবাচ্চা ভরতে কত মিনিট নেবে?',
        ),
        options: [t('48', '48'), t('30', '30'), t('24', '24'), t('60', '60')],
        correct: 1,
        explanation: [
          t(r`Capacity $= 25 \times 48 = 1200$ litres.`, r`ধারণক্ষমতা $= 25 \times 48 = 1200$ লিটার।`),
          t(r`Second pipe: $1200 \div 40 = 30$ minutes. (A faster flow must take less time than 48 minutes.)`, r`দ্বিতীয় নল: $1200 \div 40 = 30$ মিনিট। (বেশি প্রবাহ মানেই 48 মিনিটের চেয়ে কম সময়।)`),
        ],
      },
    },
    {
      key: 'delayed_opening',
      emoji: '⏰',
      name: t('Second pipe opened later', 'দ্বিতীয় নল পরে খোলা হলে'),
      difficulty: 'intermediate',
      typicalWording: t('“Pipe A is opened first. After x hours, pipe B is also opened. In how much time in all will the tank be full?”', '“প্রথমে নল A খোলা হল। x ঘণ্টা পর নল B-ও খোলা হল। মোট কত সময়ে চৌবাচ্চা ভরবে?”'),
      formula: t(r`Filled in the delay $= r_A \times d$; total time $= d + \frac{\text{capacity} - r_A d}{r_A + r_B}$.`, r`বিলম্বের সময়ে ভরা $= r_A \times d$; মোট সময় $= d + \frac{\text{ধারণক্ষমতা} - r_A d}{r_A + r_B}$।`),
      shortcut: t('Subtract what the first pipe fills during the delay, then it is a plain together-time problem on the remainder — plus the delay hours at the end.', 'বিলম্বের সময়ে প্রথম নল যা ভরেছে তা বিয়োগ করো, তারপর বাকি অংশে সাধারণ একসঙ্গে-সময়ের হিসাব — শেষে বিলম্বের ঘণ্টা যোগ করো।'),
      trap: t('The together rate applies only after the second pipe opens; using it from the very start undercounts the total time.', 'একসঙ্গে হার শুধু দ্বিতীয় নল খোলার পর থেকে খাটে; শুরু থেকেই সেটা ধরলে মোট সময় কম আসবে।'),
      spot: t(
        'The two pipes do **not start together**: one pipe runs alone for some hours, and only **then is the second pipe opened**; both finish the job.',
        'দুটি নল **একসঙ্গে শুরু হয় না**: একটি নল কিছু ঘণ্টা একা চলে, **তারপর দ্বিতীয় নলটি খোলা হয়**; দুটো মিলে কাজ শেষ করে।',
      ),
      method: [
        t('Capacity = LCM of the solo times; find each pipe\'s units per hour.', 'ধারণক্ষমতা = একার সময়গুলোর ল.সা.গু.; প্রতিটি নলের প্রতি ঘণ্টার একক বের করো।'),
        t('Work done alone = first pipe\'s units × delay hours.', 'একা করা কাজ = প্রথম নলের একক × বিলম্বের ঘণ্টা।'),
        t('Remaining ÷ (sum of units) = joint hours; add the delay for the total.', 'বাকি অংশ ÷ (এককের যোগফল) = যৌথ ঘণ্টা; মোটের জন্য বিলম্ব যোগ করো।'),
      ],
      example: {
        question: t(
          'Pipe A can fill a tank in 12 hours and pipe B in 18 hours. Pipe A is opened first, and pipe B is opened after 2 hours. In how many hours in all will the tank be full?',
          'নল A একটি চৌবাচ্চা 12 ঘণ্টায় এবং নল B 18 ঘণ্টায় ভরতে পারে। প্রথমে নল A খোলা হল, আর 2 ঘণ্টা পর নল B খোলা হল। মোট কত ঘণ্টায় চৌবাচ্চা ভরবে?',
        ),
        steps: [
          t(r`Capacity = LCM of 12 and 18 = $36$ units. A fills $3$, B fills $2$ units per hour.`, r`ধারণক্ষমতা = 12 ও 18-এর ল.সা.গু. = $36$ একক। A ঘণ্টায় $3$, B ঘণ্টায় $2$ একক ভরে।`),
          t(r`In the first 2 hours A alone fills $3 \times 2 = 6$ units. Remaining $= 36 - 6 = 30$ units.`, r`প্রথম 2 ঘণ্টায় A একা ভরে $3 \times 2 = 6$ একক। বাকি $= 36 - 6 = 30$ একক।`),
          t(r`Together: $30 \div (3 + 2) = 6$ hours.`, r`একসঙ্গে: $30 \div (3 + 2) = 6$ ঘণ্টা।`),
          t(r`Total time $= 2 + 6 = 8$ hours.`, r`মোট সময় $= 2 + 6 = 8$ ঘণ্টা।`),
        ],
        answer: t('8 hours', '8 ঘণ্টা'),
      },
      tryIt: {
        question: t(
          'Pipe A can fill a tank in 20 hours and pipe B in 30 hours. A is opened first and B is joined after 5 hours. In how many hours in all will the tank be full?',
          'নল A একটি চৌবাচ্চা 20 ঘণ্টায় এবং নল B 30 ঘণ্টায় ভরতে পারে। প্রথমে A খোলা হল এবং 5 ঘণ্টা পর B যোগ দিল। মোট কত ঘণ্টায় চৌবাচ্চা ভরবে?',
        ),
        options: [t('12', '12'), t('14', '14'), t('9', '9'), t('15', '15')],
        correct: 1,
        explanation: [
          t(r`Capacity = LCM of 20 and 30 = $60$ units. A fills $3$, B fills $2$ units per hour.`, r`ধারণক্ষমতা = 20 ও 30-এর ল.সা.গু. = $60$ একক। A ঘণ্টায় $3$, B ঘণ্টায় $2$ একক ভরে।`),
          t(r`A alone in 5 hours fills $15$ units; remaining $= 60 - 15 = 45$ units.`, r`A একা 5 ঘণ্টায় ভরে $15$ একক; বাকি $= 60 - 15 = 45$ একক।`),
          t(r`Together: $45 \div 5 = 9$ hours, so total $= 5 + 9 = 14$ hours. (12 is the time if both had started together.)`, r`একসঙ্গে: $45 \div 5 = 9$ ঘণ্টা, তাই মোট $= 5 + 9 = 14$ ঘণ্টা। (12 হল দুটো একসঙ্গে শুরু করলে লাগা সময়।)`),
        ],
      },
    },
    {
      key: 'inlet_with_two_outlets',
      emoji: '🚿',
      name: t('One inlet with two outlets', 'একটি ভরার নল ও দুটি নির্গম নল'),
      difficulty: 'intermediate',
      typicalWording: t('“An inlet fills the tank in x hours; two outlet pipes empty it in y and z hours. All opened together, when will the tank fill?”', '“একটি ভরার নল চৌবাচ্চা x ঘণ্টায় ভরে; দুটি নির্গম নল y ও z ঘণ্টায় খালি করে। সব একসঙ্গে খুললে কখন চৌবাচ্চা ভরবে?”'),
      formula: t(r`Net rate $= \frac{1}{x} - \frac{1}{y} - \frac{1}{z}$ per hour; time $= 1 \div$ net rate.`, r`নিট হার $= \frac{1}{x} - \frac{1}{y} - \frac{1}{z}$ প্রতি ঘণ্টা; সময় $= 1 \div$ নিট হার।`),
      shortcut: t('Add the two outlet units first, then subtract once from the inlet units — one net number, one division.', 'আগে দুটি নির্গম নলের একক যোগ করো, তারপর ভরার নলের একক থেকে একবারই বিয়োগ করো — একটাই নিট সংখ্যা, একটাই ভাগ।'),
      trap: t('Both outlets must be subtracted. Forgetting the second outlet makes the net too big and the time too small.', 'দুটি নির্গম নলই বিয়োগ করতে হবে। দ্বিতীয়টা ভুলে গেলে নিট বেশি হবে আর সময় কম আসবে।'),
      spot: t(
        'There is exactly **one filling pipe** but **two emptying pipes** (or an inlet plus an outlet and a leak), all open at once.',
        'ঠিক **একটি ভরার নল** আছে কিন্তু **খালি করার নল দুটি** (বা ভরার নলের সঙ্গে একটি নির্গম নল ও একটি ফুটো), সব একসঙ্গে খোলা।',
      ),
      method: [
        t('Capacity = LCM of all three times.', 'ধারণক্ষমতা = তিনটি সময়ের ল.সা.গু.।'),
        t('Inlet = + units per hour; each outlet = − units per hour.', 'ভরার নল = + একক প্রতি ঘণ্টা; প্রতিটি নির্গম নল = − একক প্রতি ঘণ্টা।'),
        t('Net = inlet − (outlet 1 + outlet 2). Time = capacity ÷ net.', 'নিট = ভরার নল − (নির্গম 1 + নির্গম 2)। সময় = ধারণক্ষমতা ÷ নিট।'),
      ],
      example: {
        question: t(
          'An inlet pipe can fill a tank in 5 hours. Two outlet pipes can empty the full tank in 10 hours and 20 hours respectively. If all three are opened together, in how many hours will the tank be full?',
          'একটি ভরার নল একটি চৌবাচ্চা 5 ঘণ্টায় ভরতে পারে। দুটি নির্গম নল ভরা চৌবাচ্চা যথাক্রমে 10 ঘণ্টা ও 20 ঘণ্টায় খালি করে। তিনটি একসঙ্গে খুললে কত ঘণ্টায় চৌবাচ্চা ভরবে?',
        ),
        steps: [
          t(r`Capacity = LCM of 5, 10, 20 = $20$ units.`, r`ধারণক্ষমতা = 5, 10, 20-এর ল.সা.গু. = $20$ একক।`),
          t(r`Inlet: $+4$ units per hour. Outlets: $-2$ and $-1$ units per hour.`, r`ভরার নল: ঘণ্টায় $+4$ একক। নির্গম নলদুটি: ঘণ্টায় $-2$ ও $-1$ একক।`),
          t(r`Net $= 4 - 2 - 1 = 1$ unit per hour, so time $= 20 \div 1 = 20$ hours.`, r`নিট $= 4 - 2 - 1 = 1$ একক প্রতি ঘণ্টা, তাই সময় $= 20 \div 1 = 20$ ঘণ্টা।`),
        ],
        answer: t('20 hours', '20 ঘণ্টা'),
      },
      tryIt: {
        question: t(
          'An inlet can fill a tank in 4 hours, while two outlets can empty the full tank in 8 hours and 12 hours. If all three are opened together on an empty tank, how long will it take to fill?',
          'একটি ভরার নল একটি চৌবাচ্চা 4 ঘণ্টায় ভরতে পারে, আর দুটি নির্গম নল ভরা চৌবাচ্চা 8 ঘণ্টা ও 12 ঘণ্টায় খালি করে। খালি চৌবাচ্চায় তিনটি একসঙ্গে খুললে ভরতে কত সময় লাগবে?',
        ),
        options: [t('8', '8'), t('24', '24'), t('6', '6'), t('12', '12')],
        correct: 1,
        explanation: [
          t(r`Capacity = LCM of 4, 8, 12 = $24$ units. Inlet $+6$; outlets $-3$ and $-2$ units per hour.`, r`ধারণক্ষমতা = 4, 8, 12-এর ল.সা.গু. = $24$ একক। ভরার নল $+6$; নির্গম নলদুটি $-3$ ও $-2$ একক প্রতি ঘণ্টা।`),
          t(r`Net $= 6 - 3 - 2 = 1$ unit per hour, so time $= 24 \div 1 = 24$ hours. (Ignoring one outlet gives 8 or 6 — both wrong.)`, r`নিট $= 6 - 3 - 2 = 1$ একক প্রতি ঘণ্টা, তাই সময় $= 24 \div 1 = 24$ ঘণ্টা। (একটি নির্গম নল বাদ দিলে 8 বা 6 আসে — দুটোই ভুল।)`),
        ],
      },
    },
    {
      key: 'alternate_pipes',
      emoji: '🔄',
      name: t('Pipes opened alternately', 'নল পালা করে খোলা হলে'),
      difficulty: 'advanced',
      typicalWording: t('“Pipes A and B are opened alternately for one hour (minute) each, A first. How long will the tank take to fill?”', '“নল A ও B পালা করে এক ঘণ্টা (মিনিট) করে খোলা হয়, প্রথমে A। চৌবাচ্চা ভরতে কত সময় লাগবে?”'),
      formula: t(r`One 2-turn cycle adds $r_A + r_B$ units; full cycles first, then finish the remainder with whosever turn comes next.`, r`দুই পালার এক চক্রে যোগ হয় $r_A + r_B$ একক; আগে পূর্ণ চক্র, তারপর বাকি অংশ যার পালা আসে তাকে দিয়ে শেষ করো।`),
      shortcut: t('Divide capacity by the cycle units to get whole cycles, then handle only the small remainder turn by turn — never simulate hour by hour from the start.', 'ধারণক্ষমতাকে চক্রের একক দিয়ে ভাগ করে পূর্ণ চক্র বের করো, তারপর শুধু ছোট বাকি অংশটা পালা অনুযায়ী হিসাব করো — শুরু থেকে ঘণ্টা ধরে ধরে এগিও না।'),
      trap: t('The pipes are never open together, so the plain together-time is wrong; also note which pipe starts — the last partial turn belongs to that cycle\'s next pipe.', 'নলগুলো কখনো একসঙ্গে খোলা থাকে না, তাই সাধারণ একসঙ্গে-সময় ভুল; কোন নল শুরু করেছে তাও খেয়াল রাখো — শেষ আংশিক পালাটা সেই চক্রের পরের নলের।'),
      spot: t(
        'The pipes take **turns**: each is opened alone for one hour (or minute) at a time, **alternately**, until the tank fills.',
        'নলগুলো **পালা করে** চলে: প্রতিটি একবারে এক ঘণ্টা (বা মিনিট) করে একা খোলা থাকে, **একটার পর একটা**, চৌবাচ্চা না ভরা পর্যন্ত।',
      ),
      method: [
        t('Capacity = LCM of the times; find each pipe\'s units per turn.', 'ধারণক্ষমতা = সময়গুলোর ল.সা.গু.; প্রতিটি নলের প্রতি পালার একক বের করো।'),
        t('One full cycle (A\'s turn + B\'s turn) adds the sum of the two units.', 'একটি পূর্ণ চক্রে (A-এর পালা + B-এর পালা) দুটি এককের যোগফল যোগ হয়।'),
        t('Take as many whole cycles as fit without crossing the capacity.', 'ধারণক্ষমতা না পেরিয়ে যতগুলো পূর্ণ চক্র হয় নাও।'),
        t('Finish the remainder with the next pipe in turn — it may need only part of its turn.', 'বাকি অংশ পরের পালার নল দিয়ে শেষ করো — তার পালার অংশবিশেষই লাগতে পারে।'),
      ],
      example: {
        question: t(
          'Pipe A can fill a tank in 10 minutes and pipe B in 15 minutes. They are opened alternately for one minute each, A first. In how many minutes will the tank be full?',
          'নল A একটি চৌবাচ্চা 10 মিনিটে এবং নল B 15 মিনিটে ভরতে পারে। দুটোকে পালা করে এক মিনিট করে খোলা হয়, প্রথমে A। কত মিনিটে চৌবাচ্চা ভরবে?',
        ),
        steps: [
          t(r`Capacity = LCM of 10 and 15 = $30$ units. A fills $3$, B fills $2$ units per minute.`, r`ধারণক্ষমতা = 10 ও 15-এর ল.সা.গু. = $30$ একক। A মিনিটে $3$, B মিনিটে $2$ একক ভরে।`),
          t(r`One cycle of 2 minutes adds $3 + 2 = 5$ units.`, r`2 মিনিটের এক চক্রে যোগ হয় $3 + 2 = 5$ একক।`),
          t(r`$30 \div 5 = 6$ full cycles, taking $6 \times 2 = 12$ minutes.`, r`$30 \div 5 = 6$টি পূর্ণ চক্র, সময় লাগে $6 \times 2 = 12$ মিনিট।`),
        ],
        answer: t('12 minutes', '12 মিনিট'),
      },
      tryIt: {
        question: t(
          'Pipe A can fill a tank in 10 hours and pipe B in 20 hours. They are opened alternately for one hour each, A first. In how many hours will the tank be full?',
          'নল A একটি চৌবাচ্চা 10 ঘণ্টায় এবং নল B 20 ঘণ্টায় ভরতে পারে। দুটোকে পালা করে এক ঘণ্টা করে খোলা হয়, প্রথমে A। কত ঘণ্টায় চৌবাচ্চা ভরবে?',
        ),
        options: [t('12', '12'), t('14', '14'), t('13', '13'), t('20', '20')],
        correct: 2,
        explanation: [
          t(r`Capacity = LCM of 10 and 20 = $20$ units. A fills $2$, B fills $1$ unit per hour.`, r`ধারণক্ষমতা = 10 ও 20-এর ল.সা.গু. = $20$ একক। A ঘণ্টায় $2$, B ঘণ্টায় $1$ একক ভরে।`),
          t(r`One 2-hour cycle adds $3$ units. In 6 cycles (12 hours) $18$ units are filled.`, r`2 ঘণ্টার এক চক্রে যোগ হয় $3$ একক। 6 চক্রে (12 ঘণ্টায়) ভরে $18$ একক।`),
          t(r`Remaining $2$ units fall in A's next turn: A fills exactly $2$ units in 1 hour, so total $= 12 + 1 = 13$ hours.`, r`বাকি $2$ একক A-এর পরের পালায় পড়ে: A ঠিক $2$ একক ভরে 1 ঘণ্টায়, তাই মোট $= 12 + 1 = 13$ ঘণ্টা।`),
        ],
      },
    },
    {
      key: 'outlet_opens_midway',
      emoji: '🚪',
      name: t('Outlet opened midway while filling', 'ভরার মাঝপথে নির্গম নল খোলা হলে'),
      difficulty: 'advanced',
      typicalWording: t('“An inlet is filling the tank. After x hours an outlet is also opened. In how much time in all will the tank be full?”', '“একটি ভরার নল চৌবাচ্চা ভরছে। x ঘণ্টা পর একটি নির্গম নলও খোলা হল। মোট কত সময়ে চৌবাচ্চা ভরবে?”'),
      formula: t(r`Before: $r_{in} \times h$ units. After: net $= r_{in} - r_{out}$; total $= h + \frac{\text{capacity} - r_{in} h}{r_{in} - r_{out}}$.`, r`আগে: $r_{in} \times h$ একক। পরে: নিট $= r_{in} - r_{out}$; মোট $= h + \frac{\text{ধারণক্ষমতা} - r_{in} h}{r_{in} - r_{out}}$।`),
      shortcut: t('Split the timeline at the moment the outlet opens: full inlet rate before, net rate after. Two short phases, no equations.', 'নির্গম নল খোলার মুহূর্তে সময়রেখা ভাগ করো: আগে পুরো ভরার হার, পরে নিট হার। দুটি ছোট পর্যায়, সমীকরণ লাগে না।'),
      trap: t('Applying the net rate from the very beginning overstates the time — the first hours had no outlet draining the tank.', 'শুরু থেকেই নিট হার ধরলে সময় বেশি আসবে — প্রথম ঘণ্টাগুলোতে কোনো নির্গম নল জল বের করছিল না।'),
      spot: t(
        'Filling starts with the **inlet alone**, but **midway an outlet (or leak) is opened** and stays open; the inlet keeps running against it.',
        'ভরা শুরু হয় **ভরার নল একা** দিয়ে, কিন্তু **মাঝপথে একটি নির্গম নল (বা ফুটো) খোলা হয়** আর খোলাই থাকে; ভরার নলও তার বিরুদ্ধে চলতে থাকে।',
      ),
      method: [
        t('Capacity = LCM of the inlet and outlet times; find the signed units per hour.', 'ধারণক্ষমতা = ভরার ও নির্গম নলের সময়ের ল.সা.গু.; চিহ্নসহ প্রতি ঘণ্টার একক বের করো।'),
        t('Phase 1: units filled by the inlet alone before the outlet opens.', 'পর্যায় 1: নির্গম নল খোলার আগে ভরার নল একা যত একক ভরেছে।'),
        t('Phase 2: remaining units ÷ (inlet − outlet) net units.', 'পর্যায় 2: বাকি একক ÷ (ভরার − নির্গম) নিট একক।'),
        t('Total time = phase 1 hours + phase 2 hours.', 'মোট সময় = পর্যায় 1-এর ঘণ্টা + পর্যায় 2-এর ঘণ্টা।'),
      ],
      example: {
        question: t(
          'An inlet pipe can fill a tank in 12 hours. It is opened on an empty tank, and after 4 hours an outlet pipe that can empty the full tank in 18 hours is also opened. In how many hours in all will the tank be full?',
          'একটি ভরার নল একটি চৌবাচ্চা 12 ঘণ্টায় ভরতে পারে। খালি চৌবাচ্চায় নলটি খোলা হল, আর 4 ঘণ্টা পর একটি নির্গম নলও খোলা হল যা ভরা চৌবাচ্চা 18 ঘণ্টায় খালি করে। মোট কত ঘণ্টায় চৌবাচ্চা ভরবে?',
        ),
        steps: [
          t(r`Capacity = LCM of 12 and 18 = $36$ units. Inlet: $+3$, outlet: $-2$ units per hour.`, r`ধারণক্ষমতা = 12 ও 18-এর ল.সা.গু. = $36$ একক। ভরার নল: $+3$, নির্গম নল: $-2$ একক প্রতি ঘণ্টা।`),
          t(r`In the first 4 hours the inlet alone fills $3 \times 4 = 12$ units. Remaining $= 36 - 12 = 24$ units.`, r`প্রথম 4 ঘণ্টায় ভরার নল একা ভরে $3 \times 4 = 12$ একক। বাকি $= 36 - 12 = 24$ একক।`),
          t(r`After the outlet opens, net $= 3 - 2 = 1$ unit per hour, so $24 \div 1 = 24$ more hours.`, r`নির্গম নল খোলার পর নিট $= 3 - 2 = 1$ একক প্রতি ঘণ্টা, তাই আরও $24 \div 1 = 24$ ঘণ্টা।`),
          t(r`Total time $= 4 + 24 = 28$ hours.`, r`মোট সময় $= 4 + 24 = 28$ ঘণ্টা।`),
        ],
        answer: t('28 hours', '28 ঘণ্টা'),
      },
      tryIt: {
        question: t(
          'An inlet can fill a tank in 10 hours. After it has run alone for 5 hours, an outlet that can empty the full tank in 15 hours is opened. In how many hours in all will the tank be full?',
          'একটি ভরার নল একটি চৌবাচ্চা 10 ঘণ্টায় ভরতে পারে। নলটি 5 ঘণ্টা একা চলার পর একটি নির্গম নল খোলা হল যা ভরা চৌবাচ্চা 15 ঘণ্টায় খালি করে। মোট কত ঘণ্টায় চৌবাচ্চা ভরবে?',
        ),
        options: [t('15', '15'), t('20', '20'), t('30', '30'), t('25', '25')],
        correct: 1,
        explanation: [
          t(r`Capacity = LCM of 10 and 15 = $30$ units. Inlet $+3$, outlet $-2$ units per hour.`, r`ধারণক্ষমতা = 10 ও 15-এর ল.সা.গু. = $30$ একক। ভরার নল $+3$, নির্গম নল $-2$ একক প্রতি ঘণ্টা।`),
          t(r`In 5 hours alone the inlet fills $15$ units; remaining $= 30 - 15 = 15$ units.`, r`5 ঘণ্টা একা চলে ভরার নল ভরে $15$ একক; বাকি $= 30 - 15 = 15$ একক।`),
          t(r`Net after opening $= 1$ unit per hour, so $15$ more hours; total $= 5 + 15 = 20$ hours. (30 would be the time if the outlet had been open from the start.)`, r`খোলার পর নিট $= 1$ একক প্রতি ঘণ্টা, তাই আরও $15$ ঘণ্টা; মোট $= 5 + 15 = 20$ ঘণ্টা। (নির্গম নল শুরু থেকে খোলা থাকলে 30 ঘণ্টা লাগত।)`),
        ],
      },
    },
    {
      key: 'part_then_outlet',
      emoji: '🥤',
      name: t('Tank partly full, then outlet opened', 'চৌবাচ্চা আংশিক ভরা, তারপর নির্গম নল খোলা'),
      difficulty: 'advanced',
      typicalWording: t('“A tank is already 3/5 full. An inlet and an outlet are both opened. How long will it take to fill the tank completely?”', '“একটি চৌবাচ্চা আগেই 3/5 ভরা। একটি ভরার নল ও একটি নির্গম নল দুটোই খোলা হল। চৌবাচ্চা পুরোপুরি ভরতে কত সময় লাগবে?”'),
      formula: t(r`Remaining units $=$ capacity $\times (1 - f)$; time $=$ remaining units $\div (r_{in} - r_{out})$.`, r`বাকি একক $=$ ধারণক্ষমতা $\times (1 - f)$; সময় $=$ বাকি একক $\div (r_{in} - r_{out})$।`),
      shortcut: t('Convert the given fraction straight into units (fraction × capacity) and work only on what is left to fill — the filled part never enters the rate arithmetic.', 'দেওয়া ভগ্নাংশকে সরাসরি এককে বদলে নাও (ভগ্নাংশ × ধারণক্ষমতা) আর শুধু ভরতে বাকি অংশ নিয়েই হিসাব করো — ভরা অংশ হার-এর হিসাবে আসে না।'),
      trap: t('Dividing the full capacity by the net rate ignores the head start and overstates the time.', 'পুরো ধারণক্ষমতাকে নিট হার দিয়ে ভাগ করলে আগের ভরা অংশটা বাদ পড়ে আর সময় বেশি আসে।'),
      spot: t(
        'The tank does **not start empty**: it is already filled to a stated **fraction**, and then an inlet and an outlet are opened **together** to finish the job.',
        'চৌবাচ্চা **খালি থেকে শুরু হয় না**: আগেই একটি নির্দিষ্ট **ভগ্নাংশ** ভরা আছে, তারপর একটি ভরার নল ও একটি নির্গম নল **একসঙ্গে** খুলে কাজ শেষ করা হয়।',
      ),
      method: [
        t('Capacity = LCM of the inlet and outlet times; find the signed units per hour.', 'ধারণক্ষমতা = ভরার ও নির্গম নলের সময়ের ল.সা.গু.; চিহ্নসহ প্রতি ঘণ্টার একক বের করো।'),
        t('Already filled = given fraction × capacity; remaining = capacity − filled.', 'আগে ভরা = দেওয়া ভগ্নাংশ × ধারণক্ষমতা; বাকি = ধারণক্ষমতা − ভরা।'),
        t('Net rate = inlet units − outlet units.', 'নিট হার = ভরার নলের একক − নির্গম নলের একক।'),
        t('Time to finish = remaining ÷ net rate.', 'শেষ করতে সময় = বাকি ÷ নিট হার।'),
      ],
      example: {
        question: t(
          'A tank is already 3/5 full. An inlet that can fill the empty tank in 10 hours and an outlet that can empty the full tank in 15 hours are both opened. In how many hours will the tank be completely full?',
          'একটি চৌবাচ্চা আগেই 3/5 ভরা। খালি চৌবাচ্চা 10 ঘণ্টায় ভরতে পারে এমন একটি ভরার নল এবং ভরা চৌবাচ্চা 15 ঘণ্টায় খালি করতে পারে এমন একটি নির্গম নল দুটোই খোলা হল। কত ঘণ্টায় চৌবাচ্চা পুরোপুরি ভরবে?',
        ),
        steps: [
          t(r`Capacity = LCM of 10 and 15 = $30$ units. Inlet: $+3$, outlet: $-2$ units per hour.`, r`ধারণক্ষমতা = 10 ও 15-এর ল.সা.গু. = $30$ একক। ভরার নল: $+3$, নির্গম নল: $-2$ একক প্রতি ঘণ্টা।`),
          t(r`Already filled $= \frac{3}{5} \times 30 = 18$ units, so remaining $= 30 - 18 = 12$ units.`, r`আগে ভরা $= \frac{3}{5} \times 30 = 18$ একক, তাই বাকি $= 30 - 18 = 12$ একক।`),
          t(r`Net $= 3 - 2 = 1$ unit per hour, so time $= 12 \div 1 = 12$ hours.`, r`নিট $= 3 - 2 = 1$ একক প্রতি ঘণ্টা, তাই সময় $= 12 \div 1 = 12$ ঘণ্টা।`),
        ],
        answer: t('12 hours', '12 ঘণ্টা'),
      },
      tryIt: {
        question: t(
          'A tank is half full. An inlet that fills the empty tank in 8 hours and an outlet that empties the full tank in 24 hours are both opened. How many hours will it take to fill the tank completely?',
          'একটি চৌবাচ্চা অর্ধেক ভরা। খালি চৌবাচ্চা 8 ঘণ্টায় ভরতে পারে এমন একটি ভরার নল এবং ভরা চৌবাচ্চা 24 ঘণ্টায় খালি করতে পারে এমন একটি নির্গম নল দুটোই খোলা হল। চৌবাচ্চা পুরোপুরি ভরতে কত ঘণ্টা লাগবে?',
        ),
        options: [t('12', '12'), t('6', '6'), t('4', '4'), t('8', '8')],
        correct: 1,
        explanation: [
          t(r`Capacity = LCM of 8 and 24 = $24$ units. Inlet $+3$, outlet $-1$; net $= 2$ units per hour.`, r`ধারণক্ষমতা = 8 ও 24-এর ল.সা.গু. = $24$ একক। ভরার নল $+3$, নির্গম নল $-1$; নিট $= 2$ একক প্রতি ঘণ্টা।`),
          t(r`Half is already filled, so only $12$ units remain: $12 \div 2 = 6$ hours. (12 hours is the time from a fully empty tank.)`, r`অর্ধেক আগেই ভরা, তাই বাকি মাত্র $12$ একক: $12 \div 2 = 6$ ঘণ্টা। (12 ঘণ্টা হল পুরো খালি চৌবাচ্চা থেকে লাগা সময়।)`),
        ],
      },
    },
    {
      key: 'schedule_all_three',
      emoji: '🗓️',
      name: t('Three pipes on an opening schedule', 'খোলা-বন্ধের সূচিতে তিনটি নল'),
      difficulty: 'advanced',
      typicalWording: t('“Pipes A and B run throughout; outlet C is open only in alternate hours, following a fixed schedule. When will the tank be full?”', '“নল A ও B সবসময় চলে; নির্গম নল C শুধু এক ঘণ্টা পরপর খোলা থাকে, একটি নির্দিষ্ট সূচি অনুযায়ী। কখন চৌবাচ্চা ভরবে?”'),
      formula: t(r`Work in cycles: units per cycle $=$ sum of each hour-type $\times$ hours of that type in the cycle; finish the remainder hour by hour.`, r`চক্র ধরে হিসাব করো: প্রতি চক্রের একক $=$ প্রতিটি ধরনের ঘণ্টার হার $\times$ চক্রে সেই ধরনের ঘণ্টার সংখ্যার যোগফল; বাকি অংশ ঘণ্টা ধরে ধরে শেষ করো।`),
      shortcut: t('Compute one full schedule cycle (usually 2 hours) once, jump through whole cycles, and only walk the last partial cycle hour by hour.', 'একটি পূর্ণ সূচি-চক্র (সাধারণত 2 ঘণ্টা) একবার হিসাব করো, পূর্ণ চক্রগুলো লাফিয়ে যাও, আর শুধু শেষ আংশিক চক্রটা ঘণ্টা ধরে ধরে হিসাব করো।'),
      trap: t('Do not average the open and closed hours into one steady rate — the tank may fill partway through an hour, and the answer depends on which hour-type comes last.', 'খোলা ও বন্ধ ঘণ্টা গড় করে একটা স্থির হার ধরবে না — চৌবাচ্চা কোনো ঘণ্টার মাঝখানে ভরে যেতে পারে, আর উত্তর নির্ভর করে শেষে কোন ধরনের ঘণ্টা আসছে তার উপর।'),
      spot: t(
        '**Three pipes** follow a repeating **schedule**: some pipes run in every hour, while another is open only in **alternate (1st, 3rd, 5th…) hours**.',
        '**তিনটি নল** একটি পুনরাবৃত্ত **সূচি** মেনে চলে: কিছু নল প্রতি ঘণ্টায় চলে, আরেকটি শুধু **এক ঘণ্টা পরপর (1ম, 3য়, 5ম…) ঘণ্টায়** খোলা থাকে।',
      ),
      method: [
        t('Capacity = LCM of all three times; find each pipe\'s signed units per hour.', 'ধারণক্ষমতা = তিনটি সময়ের ল.সা.গু.; প্রতিটি নলের চিহ্নসহ প্রতি ঘণ্টার একক বের করো।'),
        t('Net units for each hour-type in the schedule (e.g. all three open vs outlet closed).', 'সূচির প্রতিটি ধরনের ঘণ্টার নিট একক বের করো (যেমন তিনটিই খোলা বনাম নির্গম বন্ধ)।'),
        t('Add one full cycle; repeat whole cycles while the level stays below capacity.', 'একটি পূর্ণ চক্র যোগ করো; স্তর ধারণক্ষমতার নিচে থাকা পর্যন্ত পূর্ণ চক্র চালিয়ে যাও।'),
        t('Walk the final hours one by one; the last hour may be needed only in part.', 'শেষ ঘণ্টাগুলো একে একে হিসাব করো; শেষ ঘণ্টাটা আংশিকই লাগতে পারে।'),
      ],
      example: {
        question: t(
          'Pipes A and B can fill a tank in 12 hours and 18 hours, and outlet C can empty it in 36 hours. A and B run all the time, but C is open only in the 1st, 3rd, 5th … hours (closed in the 2nd, 4th … hours). In how many hours will the tank be full?',
          'নল A ও B একটি চৌবাচ্চা 12 ঘণ্টা ও 18 ঘণ্টায় ভরতে পারে, আর নির্গম নল C এটি 36 ঘণ্টায় খালি করে। A ও B সবসময় চলে, কিন্তু C শুধু 1ম, 3য়, 5ম … ঘণ্টায় খোলা থাকে (2য়, 4র্থ … ঘণ্টায় বন্ধ)। কত ঘণ্টায় চৌবাচ্চা ভরবে?',
        ),
        steps: [
          t(r`Capacity = LCM of 12, 18, 36 = $36$ units. A: $+3$, B: $+2$, C: $-1$ units per hour.`, r`ধারণক্ষমতা = 12, 18, 36-এর ল.সা.গু. = $36$ একক। A: $+3$, B: $+2$, C: $-1$ একক প্রতি ঘণ্টা।`),
          t(r`Odd hour (C open): net $= 3 + 2 - 1 = 4$ units. Even hour (C closed): net $= 3 + 2 = 5$ units.`, r`বিজোড় ঘণ্টা (C খোলা): নিট $= 3 + 2 - 1 = 4$ একক। জোড় ঘণ্টা (C বন্ধ): নিট $= 3 + 2 = 5$ একক।`),
          t(r`One 2-hour cycle adds $4 + 5 = 9$ units. $36 \div 9 = 4$ cycles exactly.`, r`2 ঘণ্টার এক চক্রে যোগ হয় $4 + 5 = 9$ একক। $36 \div 9 = 4$টি চক্র ঠিকঠাক।`),
          t(r`Total time $= 4 \times 2 = 8$ hours.`, r`মোট সময় $= 4 \times 2 = 8$ ঘণ্টা।`),
        ],
        answer: t('8 hours', '8 ঘণ্টা'),
      },
      tryIt: {
        question: t(
          'Pipes A and B can fill a tank in 10 hours and 15 hours, and outlet C can empty it in 30 hours. A and B run all the time, but C is open only in the 1st, 3rd, 5th … hours. In how much time will the tank be full?',
          'নল A ও B একটি চৌবাচ্চা 10 ঘণ্টা ও 15 ঘণ্টায় ভরতে পারে, আর নির্গম নল C এটি 30 ঘণ্টায় খালি করে। A ও B সবসময় চলে, কিন্তু C শুধু 1ম, 3য়, 5ম … ঘণ্টায় খোলা থাকে। কত সময়ে চৌবাচ্চা ভরবে?',
        ),
        options: [t('6 hours', '6 ঘণ্টা'), t('6 hours 45 minutes', '6 ঘণ্টা 45 মিনিট'), t('7 hours', '7 ঘণ্টা'), t('6 hours 30 minutes', '6 ঘণ্টা 30 মিনিট')],
        correct: 1,
        explanation: [
          t(r`Capacity = LCM of 10, 15, 30 = $30$ units. A: $+3$, B: $+2$, C: $-1$ units per hour.`, r`ধারণক্ষমতা = 10, 15, 30-এর ল.সা.গু. = $30$ একক। A: $+3$, B: $+2$, C: $-1$ একক প্রতি ঘণ্টা।`),
          t(r`Odd hour net $= 4$, even hour net $= 5$, so one cycle adds $9$ units. In 3 cycles (6 hours) $27$ units are filled.`, r`বিজোড় ঘণ্টায় নিট $= 4$, জোড় ঘণ্টায় নিট $= 5$, তাই এক চক্রে যোগ হয় $9$ একক। 3 চক্রে (6 ঘণ্টায়) ভরে $27$ একক।`),
          t(r`Remaining $3$ units fall in the 7th (odd) hour at net $4$ units per hour: $3 \div 4 = \frac{3}{4}$ hour $= 45$ minutes. Total $= 6$ hours $45$ minutes.`, r`বাকি $3$ একক 7ম (বিজোড়) ঘণ্টায় পড়ে, যেখানে নিট $4$ একক প্রতি ঘণ্টা: $3 \div 4 = \frac{3}{4}$ ঘণ্টা $= 45$ মিনিট। মোট $= 6$ ঘণ্টা $45$ মিনিট।`),
        ],
      },
    },
  ],
};
