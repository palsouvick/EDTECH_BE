'use strict';

// Question patterns: Time, Speed & Distance. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'time_speed_distance',
  patterns: [
    {
      key: 'basic_units',
      emoji: '🚗',
      name: t('Distance, speed, time with km/h ↔ m/s', 'দূরত্ব, গতি, সময় (km/h ↔ m/s রূপান্তর)'),
      spot: t(
        'Speed is in **km/h** but time is in **seconds or minutes** (or the answer is wanted in metres). The units do not match.',
        'গতি দেওয়া **km/h**-এ, কিন্তু সময় **সেকেন্ড বা মিনিটে** (বা উত্তর মিটারে চাওয়া)। এককগুলো মিলছে না।',
      ),
      method: [
        t(r`Make units match. km/h to m/s: multiply by $\frac{5}{18}$. m/s to km/h: multiply by $\frac{18}{5}$.`, r`আগে একক মেলাও। km/h থেকে m/s: $\frac{5}{18}$ দিয়ে গুণ। m/s থেকে km/h: $\frac{18}{5}$ দিয়ে গুণ।`),
        t('Change minutes to seconds (× 60) if needed.', 'দরকার হলে মিনিটকে সেকেন্ডে বদলাও (× 60)।'),
        t(r`Use $\text{Distance} = \text{Speed} \times \text{Time}$.`, r`সূত্র: দূরত্ব = গতি × সময়।`),
      ],
      example: {
        question: t(
          'A car runs at 54 km/h. How many metres does it cover in 20 seconds?',
          'একটি গাড়ি 54 km/h বেগে চলে। 20 সেকেন্ডে সেটি কত মিটার যায়?',
        ),
        steps: [
          t(r`Speed in m/s: $54 \times \frac{5}{18} = 15$ m/s.`, r`m/s-এ গতি: $54 \times \frac{5}{18} = 15$ m/s।`),
          t(r`Distance $= 15 \times 20 = 300$ m.`, r`দূরত্ব $= 15 \times 20 = 300$ মিটার।`),
        ],
        answer: t('300 m', '300 মিটার'),
      },
      tryIt: {
        question: t(
          'A cyclist rides at 18 km/h. How many metres will he cover in 3 minutes?',
          'একজন সাইকেল আরোহী 18 km/h বেগে চলে। 3 মিনিটে সে কত মিটার যাবে?',
        ),
        options: [t('54', '54'), t('900', '900'), t('15', '15'), t('3240', '3240')],
        correct: 1,
        explanation: [
          t(r`Speed: $18 \times \frac{5}{18} = 5$ m/s. Time: $3 \times 60 = 180$ s.`, r`গতি: $18 \times \frac{5}{18} = 5$ m/s। সময়: $3 \times 60 = 180$ সেকেন্ড।`),
          t(r`Distance $= 5 \times 180 = 900$ m.`, r`দূরত্ব $= 5 \times 180 = 900$ মিটার।`),
        ],
      },
    },
    {
      key: 'train_crossing',
      emoji: '🚆',
      name: t('Train crossing a pole or a platform', 'ট্রেন খুঁটি বা প্ল্যাটফর্ম পার হওয়া'),
      spot: t(
        'A **train of given length** crosses a pole, a man, a tree, a platform, a bridge or a tunnel.',
        '**নির্দিষ্ট দৈর্ঘ্যের ট্রেন** কোনো খুঁটি, মানুষ, গাছ, প্ল্যাটফর্ম, সেতু বা সুড়ঙ্গ পার হয়।',
      ),
      method: [
        t('Pole / man / tree: distance = length of the train only.', 'খুঁটি / মানুষ / গাছ: দূরত্ব = শুধু ট্রেনের দৈর্ঘ্য।'),
        t('Platform / bridge / tunnel: distance = train length + platform length.', 'প্ল্যাটফর্ম / সেতু / সুড়ঙ্গ: দূরত্ব = ট্রেনের দৈর্ঘ্য + প্ল্যাটফর্মের দৈর্ঘ্য।'),
        t(r`Change speed to m/s ($\times \frac{5}{18}$), then time = distance ÷ speed.`, r`গতিকে m/s-এ বদলাও ($\times \frac{5}{18}$), তারপর সময় = দূরত্ব ÷ গতি।`),
      ],
      example: {
        question: t(
          'A train 240 m long is running at 54 km/h. How long will it take to cross a platform 210 m long?',
          '240 মিটার লম্বা একটি ট্রেন 54 km/h বেগে চলছে। 210 মিটার লম্বা একটি প্ল্যাটফর্ম পার হতে কত সময় লাগবে?',
        ),
        steps: [
          t(r`Distance $= 240 + 210 = 450$ m (train + platform).`, r`দূরত্ব $= 240 + 210 = 450$ মিটার (ট্রেন + প্ল্যাটফর্ম)।`),
          t(r`Speed $= 54 \times \frac{5}{18} = 15$ m/s.`, r`গতি $= 54 \times \frac{5}{18} = 15$ m/s।`),
          t(r`Time $= 450 \div 15 = 30$ seconds.`, r`সময় $= 450 \div 15 = 30$ সেকেন্ড।`),
        ],
        answer: t('30 seconds', '30 সেকেন্ড'),
      },
      tryIt: {
        question: t(
          'A train 180 m long is running at 72 km/h. In how many seconds will it cross a bridge 220 m long?',
          '180 মিটার লম্বা একটি ট্রেন 72 km/h বেগে চলছে। 220 মিটার লম্বা একটি সেতু পার হতে কত সেকেন্ড লাগবে?',
        ),
        options: [t('9', '9'), t('20', '20'), t('11', '11'), t('2', '2')],
        correct: 1,
        explanation: [
          t(r`Distance $= 180 + 220 = 400$ m. Speed $= 72 \times \frac{5}{18} = 20$ m/s.`, r`দূরত্ব $= 180 + 220 = 400$ মিটার। গতি $= 72 \times \frac{5}{18} = 20$ m/s।`),
          t(r`Time $= 400 \div 20 = 20$ seconds. (Using only the train's length gives the wrong 9.)`, r`সময় $= 400 \div 20 = 20$ সেকেন্ড। (শুধু ট্রেনের দৈর্ঘ্য নিলে ভুল উত্তর 9 আসে।)`),
        ],
      },
    },
    {
      key: 'relative_speed',
      emoji: '🏃',
      name: t('Meeting or overtaking (relative speed)', 'মুখোমুখি দেখা বা পিছন থেকে ধরা (আপেক্ষিক গতি)'),
      spot: t(
        'Two people, cars or trains move **towards each other** (meet) or **in the same direction** (one catches/overtakes the other).',
        'দুজন মানুষ, গাড়ি বা ট্রেন **পরস্পরের দিকে** আসে (দেখা হয়) বা **একই দিকে** চলে (একজন অন্যজনকে ধরে ফেলে)।',
      ),
      method: [
        t('Opposite directions (towards each other): relative speed = sum of speeds.', 'বিপরীত দিকে (মুখোমুখি): আপেক্ষিক গতি = গতির যোগফল।'),
        t('Same direction (chasing): relative speed = difference of speeds.', 'একই দিকে (তাড়া করা): আপেক্ষিক গতি = গতির বিয়োগফল।'),
        t('Time = gap between them ÷ relative speed (keep units the same).', 'সময় = দুজনের মধ্যে দূরত্ব ÷ আপেক্ষিক গতি (একক একই রাখো)।'),
      ],
      example: {
        question: t(
          'Two towns are 180 km apart. Two cars start at the same time from the two towns towards each other at 40 km/h and 50 km/h. After how long will they meet?',
          'দুটি শহরের মধ্যে দূরত্ব 180 km। দুই শহর থেকে একই সময়ে দুটি গাড়ি 40 km/h ও 50 km/h বেগে পরস্পরের দিকে রওনা দিল। কত সময় পরে তাদের দেখা হবে?',
        ),
        steps: [
          t(r`They move towards each other, so relative speed $= 40 + 50 = 90$ km/h.`, r`তারা পরস্পরের দিকে আসছে, তাই আপেক্ষিক গতি $= 40 + 50 = 90$ km/h।`),
          t(r`Time $= 180 \div 90 = 2$ hours.`, r`সময় $= 180 \div 90 = 2$ ঘণ্টা।`),
        ],
        answer: t('2 hours', '2 ঘণ্টা'),
      },
      tryIt: {
        question: t(
          'A policeman sees a thief 200 m ahead of him. The thief runs at 10 km/h and the policeman chases him at 12 km/h. In how many minutes will the policeman catch the thief?',
          'একজন পুলিশ তার 200 মিটার সামনে একজন চোরকে দেখল। চোর 10 km/h বেগে দৌড়ায় আর পুলিশ 12 km/h বেগে তাকে তাড়া করে। কত মিনিটে পুলিশ চোরকে ধরবে?',
        ),
        options: [t('1 min', '1 মিনিট'), t('6 min', '6 মিনিট'), t('1.2 min', '1.2 মিনিট'), t('100 min', '100 মিনিট')],
        correct: 1,
        explanation: [
          t(r`Same direction, so relative speed $= 12 - 10 = 2$ km/h.`, r`একই দিকে দৌড়াচ্ছে, তাই আপেক্ষিক গতি $= 12 - 10 = 2$ km/h।`),
          t(r`Gap $= 200$ m $= 0.2$ km. Time $= 0.2 \div 2 = 0.1$ hour.`, r`ব্যবধান $= 200$ মিটার $= 0.2$ km। সময় $= 0.2 \div 2 = 0.1$ ঘণ্টা।`),
          t(r`$0.1 \times 60 = 6$ minutes.`, r`$0.1 \times 60 = 6$ মিনিট।`),
        ],
      },
    },
    {
      key: 'average_speed',
      emoji: '🔁',
      name: t('Average speed for a round trip', 'যাওয়া-আসার গড় গতি'),
      spot: t(
        'Someone **goes at one speed and returns at another** over the same distance, and the question asks for the average speed.',
        'কেউ একই দূরত্ব **এক গতিতে যায় আর অন্য গতিতে ফেরে**, আর গড় গতি জানতে চাওয়া হয়।',
      ),
      method: [
        t('Average speed = total distance ÷ total time, NOT the simple average of the speeds.', 'গড় গতি = মোট দূরত্ব ÷ মোট সময়; গতি দুটোর সাধারণ গড় নয়।'),
        t(r`For equal distances use the shortcut $\frac{2xy}{x + y}$.`, r`সমান দূরত্ব হলে সংক্ষিপ্ত সূত্র $\frac{2xy}{x + y}$ ব্যবহার করো।`),
      ],
      example: {
        question: t(
          'A man goes from home to office at 40 km/h and comes back at 60 km/h. What is his average speed for the whole journey?',
          'একজন লোক বাড়ি থেকে অফিসে 40 km/h বেগে যান এবং 60 km/h বেগে ফেরেন। পুরো যাত্রায় তাঁর গড় গতি কত?',
        ),
        steps: [
          t(r`Same distance both ways, so average $= \frac{2 \times 40 \times 60}{40 + 60}$.`, r`যাওয়া-আসার দূরত্ব সমান, তাই গড় $= \frac{2 \times 40 \times 60}{40 + 60}$।`),
          t(r`$= \frac{4800}{100} = 48$ km/h.`, r`অর্থাৎ $\frac{4800}{100} = 48$ km/h।`),
          t('Check: for 120 km each way, time = 3 h + 2 h = 5 h, and 240 ÷ 5 = 48.', 'যাচাই: প্রতিদিকে 120 km ধরলে সময় = 3 ঘণ্টা + 2 ঘণ্টা = 5 ঘণ্টা, আর 240 ÷ 5 = 48।'),
        ],
        answer: t('48 km/h', 'ঘণ্টায় 48 km'),
      },
      tryIt: {
        question: t(
          'A bus goes from town A to town B at 30 km/h and returns along the same road at 45 km/h. Find its average speed (in km/h) for the round trip.',
          'একটি বাস শহর A থেকে শহর B-তে 30 km/h বেগে যায় এবং একই রাস্তায় 45 km/h বেগে ফেরে। পুরো যাওয়া-আসায় বাসের গড় গতি (km/h-এ) কত?',
        ),
        options: [t('37.5', '37.5'), t('36', '36'), t('75', '75'), t('15', '15')],
        correct: 1,
        explanation: [
          t(r`Average $= \frac{2 \times 30 \times 45}{30 + 45} = \frac{2700}{75}$.`, r`গড় $= \frac{2 \times 30 \times 45}{30 + 45} = \frac{2700}{75}$।`),
          t(r`$= 36$ km/h. (37.5 is the simple average, which is wrong here.)`, r`$= 36$ km/h। (37.5 হল সাধারণ গড়, যা এখানে ভুল।)`),
        ],
      },
    },
    {
      key: 'boats_streams',
      emoji: '🚣',
      name: t('Boats and streams', 'নৌকা ও স্রোত'),
      spot: t(
        'A boat moves **downstream** (with the current) and **upstream** (against the current); speed "in still water" or "of the stream" is asked.',
        'নৌকা **স্রোতের অনুকূলে** ও **স্রোতের প্রতিকূলে** চলে; "স্থির জলে" নৌকার গতি বা "স্রোতের" গতি জানতে চাওয়া হয়।',
      ),
      method: [
        t('Downstream speed = boat + stream. Upstream speed = boat − stream.', 'অনুকূলে গতি = নৌকা + স্রোত। প্রতিকূলে গতি = নৌকা − স্রোত।'),
        t('Find each speed from distance ÷ time.', 'প্রতিটি গতি বের করো দূরত্ব ÷ সময় দিয়ে।'),
        t(r`Boat in still water $= \frac{\text{down} + \text{up}}{2}$; stream $= \frac{\text{down} - \text{up}}{2}$.`, r`স্থির জলে নৌকা $= \frac{\text{D} + \text{U}}{2}$; স্রোত $= \frac{\text{D} - \text{U}}{2}$ (D = অনুকূলে, U = প্রতিকূলে গতি)।`),
      ],
      example: {
        question: t(
          'A boat goes 30 km downstream in 2 hours and 18 km upstream in 2 hours. Find the speed of the boat in still water and the speed of the stream.',
          'একটি নৌকা স্রোতের অনুকূলে 2 ঘণ্টায় 30 km এবং প্রতিকূলে 2 ঘণ্টায় 18 km যায়। স্থির জলে নৌকার গতি ও স্রোতের গতি নির্ণয় করো।',
        ),
        steps: [
          t(r`Downstream speed $= 30 \div 2 = 15$ km/h; upstream speed $= 18 \div 2 = 9$ km/h.`, r`অনুকূলে গতি $= 30 \div 2 = 15$ km/h; প্রতিকূলে গতি $= 18 \div 2 = 9$ km/h।`),
          t(r`Boat $= \frac{15 + 9}{2} = 12$ km/h.`, r`নৌকা $= \frac{15 + 9}{2} = 12$ km/h।`),
          t(r`Stream $= \frac{15 - 9}{2} = 3$ km/h.`, r`স্রোত $= \frac{15 - 9}{2} = 3$ km/h।`),
        ],
        answer: t('Boat 12 km/h, stream 3 km/h', 'নৌকা 12 km/h, স্রোত 3 km/h'),
      },
      tryIt: {
        question: t(
          'A boat covers 40 km downstream in 2 hours and 24 km upstream in 2 hours. What is the speed of the stream (in km/h)?',
          'একটি নৌকা স্রোতের অনুকূলে 2 ঘণ্টায় 40 km এবং প্রতিকূলে 2 ঘণ্টায় 24 km যায়। স্রোতের গতি (km/h-এ) কত?',
        ),
        options: [t('16', '16'), t('8', '8'), t('4', '4'), t('12', '12')],
        correct: 2,
        explanation: [
          t(r`Downstream $= 40 \div 2 = 20$ km/h; upstream $= 24 \div 2 = 12$ km/h.`, r`অনুকূলে $= 40 \div 2 = 20$ km/h; প্রতিকূলে $= 24 \div 2 = 12$ km/h।`),
          t(r`Stream $= \frac{20 - 12}{2} = 4$ km/h. (16 is the boat's speed; 8 forgets to halve.)`, r`স্রোত $= \frac{20 - 12}{2} = 4$ km/h। (16 হল নৌকার গতি; 8 এলে অর্ধেক করতে ভুলে গেছ।)`),
        ],
      },
    },
  ],
};
