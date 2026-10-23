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
  ],
};
