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
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“A car runs at x km/h. How many metres does it cover in y seconds?”', '“একটি গাড়ি x km/h বেগে চলে। y সেকেন্ডে সেটি কত মিটার যাবে?”'),
      formula: t(r`Distance $=$ Speed $\times$ Time; $1$ km/h $=\frac{5}{18}$ m/s and $1$ m/s $=\frac{18}{5}$ km/h.`, r`দূরত্ব $=$ গতি $\times$ সময়; $1$ km/h $=\frac{5}{18}$ m/s এবং $1$ m/s $=\frac{18}{5}$ km/h।`),
      shortcut: t(r`Convert first, calculate second: multiply km/h by $\frac{5}{18}$ the moment you see seconds or metres in the question.`, r`আগে রূপান্তর, পরে হিসাব: প্রশ্নে সেকেন্ড বা মিটার দেখলেই km/h-কে $\frac{5}{18}$ দিয়ে গুণ করে নাও।`),
      trap: t('Multiplying km/h directly by seconds mixes units and gives a wildly wrong distance.', 'km/h-কে সরাসরি সেকেন্ড দিয়ে গুণ করলে একক মিশে গিয়ে সম্পূর্ণ ভুল দূরত্ব আসে।'),
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
      key: 'average_speed',
      emoji: '🔁',
      name: t('Average speed for a round trip', 'যাওয়া-আসার গড় গতি'),
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“He goes at x km/h and returns at y km/h. What is the average speed?”', '“সে x km/h বেগে যায় এবং y km/h বেগে ফেরে। গড় গতি কত?”'),
      formula: t(r`Average speed $=$ total distance $\div$ total time; for equal distances $=\frac{2xy}{x+y}$.`, r`গড় গতি $=$ মোট দূরত্ব $\div$ মোট সময়; সমান দূরত্বের ক্ষেত্রে $=\frac{2xy}{x+y}$।`),
      shortcut: t(r`For a go-and-return over the same road, use $\frac{2xy}{x+y}$ directly — no need to know the distance.`, r`একই রাস্তায় যাওয়া-আসার ক্ষেত্রে সরাসরি $\frac{2xy}{x+y}$ ব্যবহার করো — দূরত্ব জানার দরকার নেই।`),
      trap: t('Never take the simple average (x + y)/2 — more time is spent at the slower speed, so the true average is always lower.', 'সাধারণ গড় (x + y)/2 কখনো নিও না — ধীর গতিতে বেশি সময় কাটে, তাই আসল গড় সবসময় কম হয়।'),
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
      key: 'train_crossing',
      emoji: '🚆',
      name: t('Train crossing a pole or a platform', 'ট্রেন খুঁটি বা প্ল্যাটফর্ম পার হওয়া'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“A train x m long running at y km/h crosses a platform/bridge in how many seconds?”', '“x মিটার লম্বা একটি ট্রেন y km/h বেগে একটি প্ল্যাটফর্ম/সেতু কত সেকেন্ডে পার হবে?”'),
      formula: t(r`Time $=\frac{\text{train length} + \text{object length}}{\text{speed in m/s}}$; for a pole or a man the object length is $0$.`, r`সময় $=\frac{\text{ট্রেনের দৈর্ঘ্য} + \text{বস্তুর দৈর্ঘ্য}}{\text{m/s-এ গতি}}$; খুঁটি বা মানুষের ক্ষেত্রে বস্তুর দৈর্ঘ্য $0$।`),
      shortcut: t('Crossing is complete only when the tail clears the object — so always ask "has the whole train passed?" and add both lengths for anything with length.', 'ট্রেনের শেষ প্রান্ত বস্তুটি ছাড়ালেই পার হওয়া সম্পূর্ণ হয় — তাই দৈর্ঘ্যওয়ালা বস্তুর ক্ষেত্রে দুটি দৈর্ঘ্যই যোগ করো।'),
      trap: t('For a platform or bridge, using only the train\'s own length is the classic wrong answer.', 'প্ল্যাটফর্ম বা সেতুর ক্ষেত্রে শুধু ট্রেনের নিজের দৈর্ঘ্য নেওয়াই সবচেয়ে পরিচিত ভুল উত্তর।'),
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
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“Two cars start towards each other…” or “A chases B who is ahead of him…”', '“দুটি গাড়ি পরস্পরের দিকে রওনা দিল…” বা “A তার সামনে থাকা B-কে তাড়া করল…”'),
      formula: t(r`Relative speed $=$ sum of speeds (opposite directions) or difference of speeds (same direction); time $=$ gap $\div$ relative speed.`, r`আপেক্ষিক গতি $=$ গতির যোগফল (বিপরীত দিকে) বা গতির বিয়োগফল (একই দিকে); সময় $=$ ব্যবধান $\div$ আপেক্ষিক গতি।`),
      shortcut: t('Pretend one body is standing still and the other moves at the relative speed — the gap then closes at that single speed.', 'একজনকে স্থির ধরে নাও, অন্যজন আপেক্ষিক গতিতে চলছে ভাবো — ব্যবধান তখন সেই একটি গতিতেই কমে।'),
      trap: t('Adding the speeds when both move the same way (or subtracting when they approach) reverses the whole method.', 'একই দিকে চললে গতি যোগ করা (বা মুখোমুখি হলে বিয়োগ করা) পুরো পদ্ধতিটাই উল্টে দেয়।'),
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
      key: 'boats_streams',
      emoji: '🚣',
      name: t('Boats and streams', 'নৌকা ও স্রোত'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“A boat goes x km downstream in a hours and y km upstream in b hours. Find the speed of the stream.”', '“একটি নৌকা অনুকূলে a ঘণ্টায় x km এবং প্রতিকূলে b ঘণ্টায় y km যায়। স্রোতের গতি নির্ণয় করো।”'),
      formula: t(r`Downstream $=$ boat $+$ stream, upstream $=$ boat $-$ stream; boat $=\frac{D+U}{2}$, stream $=\frac{D-U}{2}$.`, r`অনুকূলে $=$ নৌকা $+$ স্রোত, প্রতিকূলে $=$ নৌকা $-$ স্রোত; নৌকা $=\frac{D+U}{2}$, স্রোত $=\frac{D-U}{2}$।`),
      shortcut: t('The stream is half the gap between the downstream and upstream speeds — compute both speeds first, then halve the difference.', 'স্রোত হল অনুকূল ও প্রতিকূল গতির পার্থক্যের অর্ধেক — আগে দুটি গতি বের করো, তারপর পার্থক্যের অর্ধেক নাও।'),
      trap: t('Forgetting to halve: the full difference D − U is twice the stream\'s speed, not the stream itself.', 'অর্ধেক করতে ভুলে যাওয়া: পুরো পার্থক্য D − U হল স্রোতের গতির দ্বিগুণ, স্রোত নিজে নয়।'),
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
    {
      key: 'meeting_point',
      emoji: '📍',
      name: t('Where do they meet? (meeting point)', 'কোথায় দেখা হবে? (মিলনস্থল)'),
      difficulty: 'intermediate',
      typicalWording: t('“Two cars start from A and B towards each other. At what distance from A will they meet?”', '“দুটি গাড়ি A ও B থেকে পরস্পরের দিকে রওনা দিল। A থেকে কত দূরে তাদের দেখা হবে?”'),
      formula: t(r`Meeting time $=\frac{\text{total distance}}{x+y}$; distance from a start $=$ that traveller's speed $\times$ meeting time.`, r`মিলনের সময় $=\frac{\text{মোট দূরত্ব}}{x+y}$; কোনো শুরু থেকে দূরত্ব $=$ সেই যাত্রীর গতি $\times$ মিলনের সময়।`),
      shortcut: t('At the meeting point the distances covered are in the ratio of the speeds — split the total distance in the speed ratio.', 'মিলনস্থলে অতিক্রান্ত দূরত্ব গতির অনুপাতে থাকে — মোট দূরত্বকে গতির অনুপাতে ভাগ করলেই মিলনস্থল পাওয়া যায়।'),
      trap: t('Answering with the meeting time when the question asks for the meeting place (distance from a named town).', 'প্রশ্নে মিলনস্থল (নির্দিষ্ট শহর থেকে দূরত্ব) চাওয়া হলে মিলনের সময় উত্তর দিয়ে দেওয়া।'),
      spot: t(
        'Two travellers start from opposite ends **towards each other**, and the question asks **where** (how far from one end) they meet, not just when.',
        'দুজন যাত্রী দুই প্রান্ত থেকে **পরস্পরের দিকে** রওনা দেয়, আর প্রশ্নে জানতে চাওয়া হয় তারা **কোথায়** (এক প্রান্ত থেকে কত দূরে) মিলবে, শুধু কখন নয়।',
      ),
      method: [
        t('Add the speeds to get the relative speed (they move towards each other).', 'আপেক্ষিক গতি পেতে গতিদুটি যোগ করো (তারা পরস্পরের দিকে আসছে)।'),
        t('Meeting time = total distance ÷ relative speed.', 'মিলনের সময় = মোট দূরত্ব ÷ আপেক্ষিক গতি।'),
        t('Distance from a town = speed of the traveller who started there × meeting time.', 'কোনো শহর থেকে দূরত্ব = সেখান থেকে রওনা দেওয়া যাত্রীর গতি × মিলনের সময়।'),
      ],
      example: {
        question: t(
          'Two stations are 240 km apart. A train starts from the first station at 60 km/h and another from the second station at 40 km/h, at the same time, towards each other. At what distance from the first station will they meet?',
          'দুটি স্টেশনের মধ্যে দূরত্ব 240 km। একই সময়ে প্রথম স্টেশন থেকে একটি ট্রেন 60 km/h বেগে এবং দ্বিতীয় স্টেশন থেকে আরেকটি ট্রেন 40 km/h বেগে পরস্পরের দিকে রওনা দিল। প্রথম স্টেশন থেকে কত দূরে তাদের দেখা হবে?',
        ),
        steps: [
          t(r`Relative speed $= 60 + 40 = 100$ km/h.`, r`আপেক্ষিক গতি $= 60 + 40 = 100$ km/h।`),
          t(r`Meeting time $= 240 \div 100 = 2.4$ hours.`, r`মিলনের সময় $= 240 \div 100 = 2.4$ ঘণ্টা।`),
          t(r`Distance from the first station $= 60 \times 2.4 = 144$ km.`, r`প্রথম স্টেশন থেকে দূরত্ব $= 60 \times 2.4 = 144$ km।`),
        ],
        answer: t('144 km from the first station', 'প্রথম স্টেশন থেকে 144 km দূরে'),
      },
      tryIt: {
        question: t(
          'Two towns are 300 km apart. Two cars start at the same time from the towns towards each other at 70 km/h and 80 km/h. At what distance from the town of the faster car will they meet?',
          'দুটি শহরের মধ্যে দূরত্ব 300 km। একই সময়ে দুই শহর থেকে দুটি গাড়ি 70 km/h ও 80 km/h বেগে পরস্পরের দিকে রওনা দিল। দ্রুতগামী গাড়ির শহর থেকে কত দূরে তাদের দেখা হবে?',
        ),
        options: [t('140 km', '140 km'), t('160 km', '160 km'), t('150 km', '150 km'), t('120 km', '120 km')],
        correct: 1,
        explanation: [
          t(r`Meeting time $= 300 \div (70 + 80) = 2$ hours.`, r`মিলনের সময় $= 300 \div (70 + 80) = 2$ ঘণ্টা।`),
          t(r`The faster car covers $80 \times 2 = 160$ km in that time. (140 km is the distance from the slower car's town.)`, r`দ্রুতগামী গাড়ি ওই সময়ে $80 \times 2 = 160$ km যায়। (140 km হল ধীর গাড়ির শহর থেকে দূরত্ব।)`),
        ],
      },
    },
    {
      key: 'late_early',
      emoji: '⏰',
      name: t('Late at one speed, early at another', 'এক গতিতে দেরি, অন্য গতিতে আগে পৌঁছানো'),
      difficulty: 'intermediate',
      typicalWording: t('“Walking at 4 km/h he is 10 minutes late; at 5 km/h he is 5 minutes early. Find the distance.”', '“4 km/h বেগে হাঁটলে 10 মিনিট দেরি হয়; 5 km/h বেগে গেলে 5 মিনিট আগে পৌঁছায়। দূরত্ব নির্ণয় করো।”'),
      formula: t(r`$\frac{D}{x}-\frac{D}{y}=$ total time gap (late $+$ early, in hours).`, r`$\frac{D}{x}-\frac{D}{y}=$ মোট সময়ের ব্যবধান (দেরি $+$ আগে, ঘণ্টায়)।`),
      shortcut: t(r`Use $D=\frac{xy}{y-x}\times$ (time gap in hours) — put the gap in hours first, then one multiplication gives the distance.`, r`$D=\frac{xy}{y-x}\times$ (ঘণ্টায় সময়ের ব্যবধান) ব্যবহার করো — আগে ব্যবধান ঘণ্টায় নাও, তারপর এক গুণেই দূরত্ব পাবে।`),
      trap: t('Using only the late minutes (or only the early minutes) instead of late + early as the total gap between the two journeys.', 'দুটি যাত্রার মোট ব্যবধান হিসেবে দেরি + আগের যোগফলের বদলে শুধু দেরির মিনিট (বা শুধু আগের মিনিট) নেওয়া।'),
      spot: t(
        'The same person covers the **same route** at two different speeds: at one speed he is some minutes **late**, at the other some minutes **early** (or late by a different amount).',
        'একই ব্যক্তি **একই পথ** দুটি ভিন্ন গতিতে যায়: এক গতিতে কয়েক মিনিট **দেরি**, অন্য গতিতে কয়েক মিনিট **আগে** পৌঁছায় (বা ভিন্ন পরিমাণ দেরি হয়)।',
      ),
      method: [
        t('Let the distance be D. Time at the slower speed minus time at the faster speed = total gap.', 'ধরো দূরত্ব D। ধীর গতির সময় − দ্রুত গতির সময় = মোট ব্যবধান।'),
        t('Total gap = late minutes + early minutes; convert it to hours.', 'মোট ব্যবধান = দেরির মিনিট + আগের মিনিট; এটিকে ঘণ্টায় বদলাও।'),
        t(r`Solve $\frac{D}{x}-\frac{D}{y}=$ gap for D.`, r`$\frac{D}{x}-\frac{D}{y}=$ ব্যবধান সমীকরণ থেকে D বের করো।`),
      ],
      example: {
        question: t(
          'A student walks to school at 4 km/h and reaches 10 minutes late. If he walks at 5 km/h, he reaches 5 minutes early. Find the distance of the school from his home.',
          'একজন ছাত্র 4 km/h বেগে হেঁটে স্কুলে গেলে 10 মিনিট দেরিতে পৌঁছায়। 5 km/h বেগে হাঁটলে সে 5 মিনিট আগে পৌঁছায়। বাড়ি থেকে স্কুলের দূরত্ব নির্ণয় করো।',
        ),
        steps: [
          t(r`Total time gap $= 10 + 5 = 15$ minutes $= \frac{1}{4}$ hour.`, r`মোট সময়ের ব্যবধান $= 10 + 5 = 15$ মিনিট $= \frac{1}{4}$ ঘণ্টা।`),
          t(r`$\frac{D}{4}-\frac{D}{5}=\frac{1}{4}$, so $\frac{D}{20}=\frac{1}{4}$.`, r`$\frac{D}{4}-\frac{D}{5}=\frac{1}{4}$, অর্থাৎ $\frac{D}{20}=\frac{1}{4}$।`),
          t(r`$D = 20 \times \frac{1}{4} = 5$ km.`, r`অর্থাৎ $D = 20 \times \frac{1}{4} = 5$ km।`),
        ],
        answer: t('5 km', 'দূরত্ব 5 km'),
      },
      tryIt: {
        question: t(
          'A man cycles to his office at 3 km/h and is 20 minutes late. At 4 km/h he reaches 10 minutes early. What is the distance of his office?',
          'একজন লোক 3 km/h বেগে সাইকেলে অফিসে গেলে 20 মিনিট দেরি হয়। 4 km/h বেগে গেলে সে 10 মিনিট আগে পৌঁছায়। তার অফিসের দূরত্ব কত?',
        ),
        options: [t('5 km', '5 km'), t('6 km', '6 km'), t('8 km', '8 km'), t('12 km', '12 km')],
        correct: 1,
        explanation: [
          t(r`Total gap $= 20 + 10 = 30$ minutes $= \frac{1}{2}$ hour.`, r`মোট ব্যবধান $= 20 + 10 = 30$ মিনিট $= \frac{1}{2}$ ঘণ্টা।`),
          t(r`$\frac{D}{3}-\frac{D}{4}=\frac{D}{12}=\frac{1}{2}$, so $D = 6$ km.`, r`$\frac{D}{3}-\frac{D}{4}=\frac{D}{12}=\frac{1}{2}$, তাই $D = 6$ km।`),
        ],
      },
    },
    {
      key: 'chase_head_start',
      emoji: '🚓',
      name: t('Chase with a head start', 'আগাম শুরু নিয়ে তাড়া করা'),
      difficulty: 'intermediate',
      typicalWording: t('“A thief starts at 8 km/h. Half an hour later a policeman chases him at 12 km/h. When will he be caught?”', '“একজন চোর 8 km/h বেগে রওনা দিল। আধ ঘণ্টা পরে একজন পুলিশ 12 km/h বেগে তাকে তাড়া করল। কখন সে ধরা পড়বে?”'),
      formula: t(r`Catch-up time $=\frac{\text{head-start distance}}{\text{speed difference}}$; head-start distance $=$ slower speed $\times$ head-start time.`, r`ধরার সময় $=\frac{\text{আগাম দূরত্ব}}{\text{গতির পার্থক্য}}$; আগাম দূরত্ব $=$ ধীর গতি $\times$ আগাম সময়।`),
      shortcut: t('First turn the head-start time into a distance, then it is the ordinary gap ÷ difference chase — two quick steps.', 'আগে আগাম সময়টিকে দূরত্বে বদলাও, তারপর এটি সাধারণ ব্যবধান ÷ পার্থক্যের তাড়া — দুটি দ্রুত ধাপ।'),
      trap: t('Dividing the head-start TIME (not the distance it creates) by the speed difference.', 'গতির পার্থক্য দিয়ে আগাম দূরত্বের বদলে আগাম সময়কে ভাগ করা।'),
      spot: t(
        'One person or vehicle **starts earlier** and the faster one **starts later** from the same place, in the same direction; the question asks when (or where) the second catches the first.',
        'একজন ব্যক্তি বা যান **আগে রওনা** দেয় এবং দ্রুতগামী জন একই জায়গা থেকে একই দিকে **পরে রওনা** দেয়; জানতে চাওয়া হয় দ্বিতীয় জন কখন (বা কোথায়) প্রথম জনকে ধরবে।',
      ),
      method: [
        t('Head-start distance = first traveller\'s speed × the time gap before the chase begins.', 'আগাম দূরত্ব = প্রথম যাত্রীর গতি × তাড়া শুরু হওয়ার আগের সময়ের ব্যবধান।'),
        t('Relative speed = faster speed − slower speed (same direction).', 'আপেক্ষিক গতি = দ্রুত গতি − ধীর গতি (একই দিকে)।'),
        t('Catch-up time = head-start distance ÷ relative speed, counted from when the chaser starts.', 'ধরার সময় = আগাম দূরত্ব ÷ আপেক্ষিক গতি, তাড়াকারীর রওনা থেকে গণনা করে।'),
      ],
      example: {
        question: t(
          'A thief runs away at 8 km/h. After 30 minutes a policeman starts chasing him at 12 km/h from the same place. After how much time from the policeman\'s start will the thief be caught?',
          'একজন চোর 8 km/h বেগে পালিয়ে যায়। 30 মিনিট পরে একজন পুলিশ একই জায়গা থেকে 12 km/h বেগে তাকে তাড়া করে। পুলিশের রওনা দেওয়ার কত সময় পরে চোর ধরা পড়বে?',
        ),
        steps: [
          t(r`Head start in 30 minutes $= 0.5$ h: distance $= 8 \times 0.5 = 4$ km.`, r`30 মিনিট $= 0.5$ ঘণ্টার আগাম শুরুতে দূরত্ব $= 8 \times 0.5 = 4$ km।`),
          t(r`Relative speed $= 12 - 8 = 4$ km/h.`, r`আপেক্ষিক গতি $= 12 - 8 = 4$ km/h।`),
          t(r`Catch-up time $= 4 \div 4 = 1$ hour after the policeman starts.`, r`ধরার সময় $= 4 \div 4 = 1$ ঘণ্টা, পুলিশের রওনা দেওয়ার পর থেকে।`),
        ],
        answer: t('1 hour', '1 ঘণ্টা'),
      },
      tryIt: {
        question: t(
          'A bus leaves a depot at 40 km/h. One hour later a car starts from the same depot in the same direction at 60 km/h. In how many hours will the car catch the bus?',
          'একটি বাস 40 km/h বেগে একটি ডিপো ছাড়ে। এক ঘণ্টা পরে একটি গাড়ি একই ডিপো থেকে একই দিকে 60 km/h বেগে রওনা দেয়। কত ঘণ্টায় গাড়িটি বাসকে ধরবে?',
        ),
        options: [t('1.5 hours', '1.5 ঘণ্টা'), t('2 hours', '2 ঘণ্টা'), t('3 hours', '3 ঘণ্টা'), t('4 hours', '4 ঘণ্টা')],
        correct: 1,
        explanation: [
          t(r`Head-start distance $= 40 \times 1 = 40$ km.`, r`আগাম দূরত্ব $= 40 \times 1 = 40$ km।`),
          t(r`Relative speed $= 60 - 40 = 20$ km/h, so time $= 40 \div 20 = 2$ hours.`, r`আপেক্ষিক গতি $= 60 - 40 = 20$ km/h, তাই সময় $= 40 \div 20 = 2$ ঘণ্টা।`),
        ],
      },
    },
    {
      key: 'part_journey_speeds',
      emoji: '🧩',
      name: t('Journey in parts at different speeds', 'ভিন্ন গতিতে অংশে অংশে যাত্রা'),
      difficulty: 'intermediate',
      typicalWording: t('“He covers the first 100 km at 25 km/h and the next 80 km at 40 km/h. Find the average speed.”', '“সে প্রথম 100 km, 25 km/h বেগে এবং পরের 80 km, 40 km/h বেগে যায়। গড় গতি নির্ণয় করো।”'),
      formula: t(r`Average speed $=\frac{\text{sum of part distances}}{\text{sum of part times}}$, each part time $=\frac{\text{part distance}}{\text{part speed}}$.`, r`গড় গতি $=\frac{\text{অংশগুলির দূরত্বের যোগফল}}{\text{অংশগুলির সময়ের যোগফল}}$, প্রতিটি অংশের সময় $=\frac{\text{অংশের দূরত্ব}}{\text{অংশের গতি}}$।`),
      shortcut: t('When the parts are unequal, there is no 2xy/(x+y) shortcut — add up distances and times separately; it is only two or three divisions.', 'অংশগুলি অসমান হলে 2xy/(x+y) সংক্ষিপ্ত সূত্র চলে না — দূরত্ব ও সময় আলাদা করে যোগ করো; মাত্র দু-তিনটি ভাগের কাজ।'),
      trap: t(r`Using $\frac{2xy}{x+y}$ or the plain mean of the speeds when the parts have different distances.`, r`অংশগুলির দূরত্ব আলাদা হলে $\frac{2xy}{x+y}$ বা গতিগুলির সাধারণ গড় ব্যবহার করা।`),
      spot: t(
        'One journey is split into **two or more parts**, each part with its **own distance and speed** (the parts are usually unequal), and the total time or overall average speed is asked.',
        'একটি যাত্রা **দুই বা ততোধিক অংশে** ভাগ করা থাকে, প্রতিটি অংশের **নিজস্ব দূরত্ব ও গতি** থাকে (অংশগুলি সাধারণত অসমান), আর মোট সময় বা সামগ্রিক গড় গতি জানতে চাওয়া হয়।',
      ),
      method: [
        t('Find the time of each part: part distance ÷ part speed.', 'প্রতিটি অংশের সময় বের করো: অংশের দূরত্ব ÷ অংশের গতি।'),
        t('Add all the distances and add all the times separately.', 'সব দূরত্ব যোগ করো এবং সব সময় আলাদাভাবে যোগ করো।'),
        t('Average speed = total distance ÷ total time.', 'গড় গতি = মোট দূরত্ব ÷ মোট সময়।'),
      ],
      example: {
        question: t(
          'A man travels 100 km at 25 km/h and then another 80 km at 40 km/h. Find his average speed for the whole journey.',
          'একজন লোক 25 km/h বেগে 100 km এবং তারপর 40 km/h বেগে আরও 80 km ভ্রমণ করে। পুরো যাত্রায় তার গড় গতি নির্ণয় করো।',
        ),
        steps: [
          t(r`Time for the first part $= 100 \div 25 = 4$ hours; for the second part $= 80 \div 40 = 2$ hours.`, r`প্রথম অংশের সময় $= 100 \div 25 = 4$ ঘণ্টা; দ্বিতীয় অংশের সময় $= 80 \div 40 = 2$ ঘণ্টা।`),
          t(r`Total distance $= 100 + 80 = 180$ km; total time $= 4 + 2 = 6$ hours.`, r`মোট দূরত্ব $= 100 + 80 = 180$ km; মোট সময় $= 4 + 2 = 6$ ঘণ্টা।`),
          t(r`Average speed $= 180 \div 6 = 30$ km/h.`, r`গড় গতি $= 180 \div 6 = 30$ km/h।`),
        ],
        answer: t('30 km/h', 'গড় গতি 30 km/h'),
      },
      tryIt: {
        question: t(
          'A car covers 60 km at 20 km/h and the remaining 90 km of its journey at 30 km/h. What is its average speed (in km/h) for the whole journey?',
          'একটি গাড়ি 20 km/h বেগে 60 km এবং যাত্রার বাকি 90 km, 30 km/h বেগে যায়। পুরো যাত্রায় গাড়ির গড় গতি (km/h-এ) কত?',
        ),
        options: [t('24', '24'), t('25', '25'), t('26', '26'), t('27.5', '27.5')],
        correct: 1,
        explanation: [
          t(r`Times: $60 \div 20 = 3$ hours and $90 \div 30 = 3$ hours, so total time $= 6$ hours.`, r`সময়: $60 \div 20 = 3$ ঘণ্টা এবং $90 \div 30 = 3$ ঘণ্টা, তাই মোট সময় $= 6$ ঘণ্টা।`),
          t(r`Average $= (60 + 90) \div 6 = 150 \div 6 = 25$ km/h. (27.5 wrongly uses the equal-distance shortcut; 24 and 26 are near-miss slips.)`, r`গড় $= (60 + 90) \div 6 = 150 \div 6 = 25$ km/h। (27.5 ভুলভাবে সমান-দূরত্বের সংক্ষিপ্ত সূত্র ব্যবহার করে; 24 ও 26 কাছাকাছি হিসাবের ভুল।)`),
        ],
      },
    },
    {
      key: 'stoppage_time',
      emoji: '🛑',
      name: t('Stoppage time per hour', 'প্রতি ঘণ্টায় থামার সময়'),
      difficulty: 'advanced',
      typicalWording: t('“A train travels at 60 km/h without stoppages and 48 km/h with stoppages. For how many minutes per hour does it stop?”', '“একটি ট্রেন না থামলে 60 km/h এবং থেমে থেমে গেলে 48 km/h বেগে চলে। প্রতি ঘণ্টায় সেটি কত মিনিট থামে?”'),
      formula: t(r`Stoppage per hour $=\frac{\text{speed without} - \text{speed with}}{\text{speed without}} \times 60$ minutes.`, r`প্রতি ঘণ্টায় থামা $=\frac{\text{না-থামা গতি} - \text{থামাসহ গতি}}{\text{না-থামা গতি}} \times 60$ মিনিট।`),
      shortcut: t('The distance "lost" in one hour is the difference of the two speeds; divide that lost distance by the no-stoppage speed and multiply by 60.', 'এক ঘণ্টায় "হারানো" দূরত্ব হল দুই গতির পার্থক্য; সেই হারানো দূরত্বকে না-থামা গতি দিয়ে ভাগ করে 60 দিয়ে গুণ করো।'),
      trap: t('Dividing the speed difference by the WITH-stoppage speed instead of the without-stoppage speed.', 'গতির পার্থক্যকে না-থামা গতির বদলে থামাসহ গতি দিয়ে ভাগ করা।'),
      spot: t(
        'A train or bus is quoted with **two average speeds**: one "excluding stoppages" and a lower one "including stoppages", and the stoppage minutes **per hour** are asked.',
        'একটি ট্রেন বা বাসের **দুটি গড় গতি** দেওয়া থাকে: একটি "থামা ছাড়া" এবং কম আরেকটি "থামাসহ", আর **প্রতি ঘণ্টায়** থামার মিনিট জানতে চাওয়া হয়।',
      ),
      method: [
        t('In one hour with stoppages, the train covers only the lower speed\'s distance.', 'থামাসহ এক ঘণ্টায় ট্রেনটি শুধু কম গতির দূরত্বটুকুই অতিক্রম করে।'),
        t('Find how long the train takes, at its full (no-stoppage) speed, to cover that distance.', 'ট্রেনটি তার পূর্ণ (না-থামা) গতিতে ওই দূরত্ব যেতে কত সময় নেয় তা বের করো।'),
        t('Stoppage per hour = 60 minutes − that running time in minutes.', 'প্রতি ঘণ্টায় থামা = 60 মিনিট − চলমান সময় (মিনিটে)।'),
      ],
      example: {
        question: t(
          'A train travels at 60 km/h without stoppages and at 48 km/h with stoppages. For how many minutes per hour does the train stop on average?',
          'একটি ট্রেন না থামলে 60 km/h বেগে এবং থেমে থেমে গেলে 48 km/h বেগে চলে। গড়ে প্রতি ঘণ্টায় ট্রেনটি কত মিনিট থামে?',
        ),
        steps: [
          t('In 1 hour with stoppages the train covers 48 km.', 'থামাসহ 1 ঘণ্টায় ট্রেনটি 48 km যায়।'),
          t(r`At 60 km/h, covering 48 km takes $48 \div 60 = 0.8$ hour $= 48$ minutes of running.`, r`60 km/h বেগে 48 km যেতে লাগে $48 \div 60 = 0.8$ ঘণ্টা $= 48$ মিনিট চলা।`),
          t(r`Stoppage $= 60 - 48 = 12$ minutes per hour.`, r`থামা $= 60 - 48 = 12$ মিনিট প্রতি ঘণ্টায়।`),
        ],
        answer: t('12 minutes per hour', 'প্রতি ঘণ্টায় 12 মিনিট'),
      },
      tryIt: {
        question: t(
          'A bus runs at 54 km/h excluding stoppages and 45 km/h including stoppages. For how many minutes per hour does the bus stop?',
          'একটি বাস থামা ছাড়া 54 km/h বেগে এবং থামাসহ 45 km/h বেগে চলে। প্রতি ঘণ্টায় বাসটি কত মিনিট থামে?',
        ),
        options: [t('9 minutes', '9 মিনিট'), t('10 minutes', '10 মিনিট'), t('12 minutes', '12 মিনিট'), t('15 minutes', '15 মিনিট')],
        correct: 1,
        explanation: [
          t(r`Stoppage $=\frac{54 - 45}{54} \times 60 = \frac{9}{54} \times 60$.`, r`থামা $=\frac{54 - 45}{54} \times 60 = \frac{9}{54} \times 60$।`),
          t(r`$= 10$ minutes per hour. (Dividing by 45 instead gives the wrong 12.)`, r`$= 10$ মিনিট প্রতি ঘণ্টায়। (45 দিয়ে ভাগ করলে ভুল উত্তর 12 আসে।)`),
        ],
      },
    },
    {
      key: 'races_beats',
      emoji: '🏅',
      name: t('Races: "A beats B by …"', 'দৌড়: "A, B-কে … ব্যবধানে হারায়"'),
      difficulty: 'advanced',
      typicalWording: t('“In a 1 km race, A beats B by 100 m.” Asked: a speed, a start, or by how much B beats C.', '“1 km দৌড়ে A, B-কে 100 মিটারে হারায়।” জানতে চাওয়া হয়: গতি, আগাম শুরু, বা B কত ব্যবধানে C-কে হারায়।'),
      formula: t(r`If A beats B by $d$ in a race of length $L$: $S_A : S_B = L : (L - d)$.`, r`A যদি $L$ দৈর্ঘ্যের দৌড়ে B-কে $d$ ব্যবধানে হারায়: $S_A : S_B = L : (L - d)$।`),
      shortcut: t('Read "beats by d" as a photograph at the finish: winner at L, loser at L − d. That one picture gives the speed ratio instantly.', '"d ব্যবধানে হারায়" মানে শেষ মুহূর্তের ছবি: বিজয়ী L-এ, পরাজিত L − d-এ। সেই একটি ছবি থেকেই গতির অনুপাত সঙ্গে সঙ্গে পাওয়া যায়।'),
      trap: t('Treating "beats by 100 m" as a time gap, or using d itself (instead of L − d) as the loser\'s distance.', '"100 মিটারে হারায়"-কে সময়ের ব্যবধান ভাবা, বা পরাজিতের দূরত্ব হিসেবে L − d-এর বদলে শুধু d নেওয়া।'),
      spot: t(
        'A **race** where the result is stated as **"A beats B by x metres"** (or by some seconds, or A gives B a start), and a speed ratio, a start, or a third runner\'s result is asked.',
        'একটি **দৌড়** যেখানে ফলাফল বলা হয় **"A, B-কে x মিটারে হারায়"** (বা কয়েক সেকেন্ডে, বা A, B-কে আগাম শুরু দেয়), আর গতির অনুপাত, আগাম শুরু, বা তৃতীয় দৌড়বিদের ফল জানতে চাওয়া হয়।',
      ),
      method: [
        t('When the winner finishes the full race length L, the loser has covered only L − (margin).', 'বিজয়ী পুরো দৌড়ের দৈর্ঘ্য L শেষ করার সময় পরাজিত মাত্র L − (ব্যবধান) গেছে।'),
        t('Speeds are in the same ratio as these distances: S_A : S_B = L : (L − margin).', 'গতিগুলি এই দূরত্বগুলির অনুপাতেই থাকে: S_A : S_B = L : (L − ব্যবধান)।'),
        t('Use the ratio to scale a known speed, or to convert one margin into another.', 'অনুপাত দিয়ে জানা গতিকে বড়-ছোট করো, বা একটি ব্যবধানকে অন্য ব্যবধানে বদলাও।'),
      ],
      example: {
        question: t(
          'In a 1000 m race, A beats B by 100 m. If A runs at 5 m/s, find the speed of B.',
          '1000 মিটার দৌড়ে A, B-কে 100 মিটারে হারায়। A যদি 5 m/s বেগে দৌড়ায়, তবে B-এর গতি নির্ণয় করো।',
        ),
        steps: [
          t('When A finishes 1000 m, B has covered only 1000 − 100 = 900 m in the same time.', 'A 1000 মিটার শেষ করার সময় B একই সময়ে মাত্র 1000 − 100 = 900 মিটার গেছে।'),
          t(r`Speed ratio $S_A : S_B = 1000 : 900 = 10 : 9$.`, r`গতির অনুপাত $S_A : S_B = 1000 : 900 = 10 : 9$।`),
          t(r`$S_B = 5 \times \frac{9}{10} = 4.5$ m/s.`, r`অতএব $S_B = 5 \times \frac{9}{10} = 4.5$ m/s।`),
        ],
        answer: t('4.5 m/s', 'B-এর গতি 4.5 m/s'),
      },
      tryIt: {
        question: t(
          'In a 400 m race, A beats B by 40 m. If A runs at 8 m/s, what is the speed of B (in m/s)?',
          '400 মিটার দৌড়ে A, B-কে 40 মিটারে হারায়। A যদি 8 m/s বেগে দৌড়ায়, তবে B-এর গতি (m/s-এ) কত?',
        ),
        options: [t('7', '7'), t('7.2', '7.2'), t('7.5', '7.5'), t('8.8', '8.8')],
        correct: 1,
        explanation: [
          t('When A covers 400 m, B covers 400 − 40 = 360 m in the same time.', 'A 400 মিটার যাওয়ার সময় B একই সময়ে 400 − 40 = 360 মিটার যায়।'),
          t(r`$S_B = 8 \times \frac{360}{400} = 7.2$ m/s.`, r`অতএব $S_B = 8 \times \frac{360}{400} = 7.2$ m/s।`),
        ],
      },
    },
    {
      key: 'circular_track_meeting',
      emoji: '🔄',
      name: t('Meeting on a circular track', 'বৃত্তাকার পথে দেখা হওয়া'),
      difficulty: 'advanced',
      typicalWording: t('“Two runners start together on a circular track. When will they meet again at the starting point?”', '“দুজন দৌড়বিদ একটি বৃত্তাকার পথে একসঙ্গে রওনা দিল। আবার কখন তারা শুরুর বিন্দুতে মিলবে?”'),
      formula: t(r`Meeting at the start point $=$ LCM of the two lap times; first meeting anywhere (same direction) $=\frac{\text{track length}}{\text{speed difference}}$.`, r`শুরুর বিন্দুতে মিলন $=$ দুটি চক্করের সময়ের ল.সা.গু.; যেকোনো জায়গায় প্রথম মিলন (একই দিকে) $=\frac{\text{পথের দৈর্ঘ্য}}{\text{গতির পার্থক্য}}$।`),
      shortcut: t('For "at the starting point", skip speeds entirely — just take the LCM of the lap times.', '"শুরুর বিন্দুতে" হলে গতি নিয়ে মাথা ঘামিও না — সরাসরি দুটি চক্করের সময়ের ল.সা.গু. নাও।'),
      trap: t('Giving the first-meeting-anywhere time when the question asks for meeting AT the starting point (or the reverse).', 'শুরুর বিন্দুতেই মিলন চাওয়া হলে যেকোনো জায়গায় প্রথম মিলনের সময় উত্তর দেওয়া (বা উল্টোটা)।'),
      spot: t(
        'Two runners start **together** on a **circular track** and the question asks when they will be together again — especially **at the starting point**.',
        'দুজন দৌড়বিদ একটি **বৃত্তাকার পথে একসঙ্গে** রওনা দেয় এবং জানতে চাওয়া হয় আবার কখন তারা একসঙ্গে হবে — বিশেষ করে **শুরুর বিন্দুতে**।',
      ),
      method: [
        t('Find each runner\'s lap time: track length ÷ his speed (or take the lap times as given).', 'প্রত্যেকের এক চক্করের সময় বের করো: পথের দৈর্ঘ্য ÷ তার গতি (বা দেওয়া চক্করের সময়ই নাও)।'),
        t('They are together at the start point only when both have completed whole laps.', 'তারা শুরুর বিন্দুতে তখনই একসঙ্গে থাকে যখন দুজনেই পূর্ণ চক্কর শেষ করে।'),
        t('That time = LCM of the two lap times.', 'সেই সময় = দুটি চক্করের সময়ের ল.সা.গু.।'),
      ],
      example: {
        question: t(
          'Two runners start together on a 400 m circular track. One completes a lap in 50 seconds and the other in 80 seconds. After how long will they meet again at the starting point?',
          'দুজন দৌড়বিদ 400 মিটার বৃত্তাকার পথে একসঙ্গে রওনা দিল। একজন 50 সেকেন্ডে এবং অন্যজন 80 সেকেন্ডে এক চক্কর সম্পূর্ণ করে। কত সময় পরে তারা আবার শুরুর বিন্দুতে মিলবে?',
        ),
        steps: [
          t('At the starting point, each must have finished a whole number of laps.', 'শুরুর বিন্দুতে দুজনকেই পূর্ণসংখ্যক চক্কর শেষ করতে হবে।'),
          t('Required time = LCM of 50 and 80.', 'প্রয়োজনীয় সময় = 50 ও 80-এর ল.সা.গু.।'),
          t(r`LCM$(50, 80) = 400$ seconds $= 6$ minutes $40$ seconds.`, r`ল.সা.গু.$(50, 80) = 400$ সেকেন্ড $= 6$ মিনিট $40$ সেকেন্ড।`),
        ],
        answer: t('400 seconds', '400 সেকেন্ড'),
      },
      tryIt: {
        question: t(
          'On a circular track, A takes 45 seconds per lap and B takes 60 seconds per lap. Starting together, after how many seconds will they meet again at the starting point?',
          'একটি বৃত্তাকার পথে A প্রতি চক্করে 45 সেকেন্ড এবং B প্রতি চক্করে 60 সেকেন্ড নেয়। একসঙ্গে রওনা দিলে কত সেকেন্ড পরে তারা আবার শুরুর বিন্দুতে মিলবে?',
        ),
        options: [t('120', '120'), t('150', '150'), t('180', '180'), t('240', '240')],
        correct: 2,
        explanation: [
          t('Both must complete whole laps, so the time is the LCM of 45 and 60.', 'দুজনকেই পূর্ণ চক্কর শেষ করতে হবে, তাই সময় হল 45 ও 60-এর ল.সা.গু.।'),
          t(r`LCM$(45, 60) = 180$ seconds. (120 is a multiple of 60 but not of 45.)`, r`ল.সা.গু.$(45, 60) = 180$ সেকেন্ড। (120, 60-এর গুণিতক কিন্তু 45-এর নয়।)`),
        ],
      },
    },
    {
      key: 'boat_round_trip_total_time',
      emoji: '↩️',
      name: t('Boat round trip: total time given', 'নৌকার যাওয়া-আসা: মোট সময় দেওয়া'),
      difficulty: 'advanced',
      typicalWording: t('“A boat goes to a place and returns in 5 hours in all. Find the distance of the place.”', '“একটি নৌকা একটি জায়গায় গিয়ে মোট 5 ঘণ্টায় ফিরে আসে। জায়গাটির দূরত্ব নির্ণয় করো।”'),
      formula: t(r`$\frac{D}{b+s}+\frac{D}{b-s}=$ total time, where $b$ is the boat's speed in still water and $s$ the stream's.`, r`$\frac{D}{b+s}+\frac{D}{b-s}=$ মোট সময়, যেখানে $b$ স্থির জলে নৌকার গতি এবং $s$ স্রোতের গতি।`),
      shortcut: t(r`Use $D=\frac{(b^2-s^2)\times T}{2b}$: for fixed speeds, total time is directly proportional to distance, so one clean multiplication finishes it.`, r`$D=\frac{(b^2-s^2)\times T}{2b}$ ব্যবহার করো: গতি স্থির থাকলে মোট সময় দূরত্বের সরাসরি সমানুপাতী, তাই এক পরিষ্কার গুণেই কাজ শেষ।`),
      trap: t('Adding the downstream and upstream speeds and dividing the total time by that — the times of the two legs must be added, not the speeds.', 'অনুকূল ও প্রতিকূল গতি যোগ করে মোট সময়কে তা দিয়ে ভাগ করা — দুই অংশের সময় যোগ করতে হয়, গতি নয়।'),
      spot: t(
        'The boat\'s speed in still water and the stream\'s speed are known, and only the **total time for going and coming back** is given; the **distance** (one way) is asked.',
        'স্থির জলে নৌকার গতি ও স্রোতের গতি জানা থাকে, আর শুধু **যাওয়া-আসার মোট সময়** দেওয়া থাকে; **একদিকের দূরত্ব** জানতে চাওয়া হয়।',
      ),
      method: [
        t('Downstream speed = boat + stream; upstream speed = boat − stream.', 'অনুকূলে গতি = নৌকা + স্রোত; প্রতিকূলে গতি = নৌকা − স্রোত।'),
        t(r`Write the total time as $\frac{D}{\text{down}} + \frac{D}{\text{up}} = T$ with the unknown distance D.`, r`মোট সময়কে লেখো $\frac{D}{\text{অনুকূল}} + \frac{D}{\text{প্রতিকূল}} = T$, যেখানে D অজানা দূরত্ব।`),
        t('Take D common, solve the simple equation, and check by adding the two leg times.', 'D সাধারণ নিয়ে সরল সমীকরণটি সমাধান করো, এবং দুই অংশের সময় যোগ করে যাচাই করো।'),
      ],
      example: {
        question: t(
          'The speed of a boat in still water is 10 km/h and the speed of the stream is 2 km/h. The boat goes to a place and returns in 5 hours in all. Find the distance of the place.',
          'স্থির জলে একটি নৌকার গতি 10 km/h এবং স্রোতের গতি 2 km/h। নৌকাটি একটি জায়গায় গিয়ে মোট 5 ঘণ্টায় ফিরে আসে। জায়গাটির দূরত্ব নির্ণয় করো।',
        ),
        steps: [
          t(r`Downstream speed $= 10 + 2 = 12$ km/h; upstream speed $= 10 - 2 = 8$ km/h.`, r`অনুকূলে গতি $= 10 + 2 = 12$ km/h; প্রতিকূলে গতি $= 10 - 2 = 8$ km/h।`),
          t(r`$\frac{D}{12} + \frac{D}{8} = 5$, so $D \times \frac{5}{24} = 5$.`, r`$\frac{D}{12} + \frac{D}{8} = 5$, অর্থাৎ $D \times \frac{5}{24} = 5$।`),
          t(r`$D = 24$ km. Check: $24 \div 12 + 24 \div 8 = 2 + 3 = 5$ hours. ✓`, r`$D = 24$ km। যাচাই: $24 \div 12 + 24 \div 8 = 2 + 3 = 5$ ঘণ্টা। ✓`),
        ],
        answer: t('24 km', 'দূরত্ব 24 km'),
      },
      tryIt: {
        question: t(
          'A boat whose speed in still water is 15 km/h goes to a place downstream and returns upstream in a stream of 3 km/h. If the whole trip takes 5 hours, how far is the place (in km)?',
          'স্থির জলে 15 km/h গতির একটি নৌকা 3 km/h স্রোতের নদীতে অনুকূলে একটি জায়গায় গিয়ে প্রতিকূলে ফিরে আসে। পুরো যাত্রায় 5 ঘণ্টা লাগলে জায়গাটি কত দূরে (km-এ)?',
        ),
        options: [t('30', '30'), t('36', '36'), t('40', '40'), t('45', '45')],
        correct: 1,
        explanation: [
          t(r`Downstream $= 18$ km/h, upstream $= 12$ km/h. $\frac{D}{18} + \frac{D}{12} = 5$.`, r`অনুকূলে $= 18$ km/h, প্রতিকূলে $= 12$ km/h। $\frac{D}{18} + \frac{D}{12} = 5$।`),
          t(r`$D \times \frac{5}{36} = 5$, so $D = 36$ km. Check: $36 \div 18 + 36 \div 12 = 2 + 3 = 5$ hours.`, r`$D \times \frac{5}{36} = 5$, তাই $D = 36$ km। যাচাই: $36 \div 18 + 36 \div 12 = 2 + 3 = 5$ ঘণ্টা।`),
        ],
      },
    },
    {
      key: 'two_trains_crossing',
      emoji: '🚄',
      name: t('Two trains crossing each other', 'দুটি ট্রেন পরস্পরকে পার হওয়া'),
      difficulty: 'advanced',
      typicalWording: t('“Two trains of lengths x m and y m run in opposite directions. In how many seconds do they cross each other?” (or one length is unknown)', '“x মিটার ও y মিটার লম্বা দুটি ট্রেন বিপরীত দিকে চলে। কত সেকেন্ডে তারা পরস্পরকে পার হবে?” (বা একটি দৈর্ঘ্য অজানা)'),
      formula: t(r`Crossing time $=\frac{L_1 + L_2}{\text{relative speed}}$; relative speed $=$ sum (opposite) or difference (same direction).`, r`পার হওয়ার সময় $=\frac{L_1 + L_2}{\text{আপেক্ষিক গতি}}$; আপেক্ষিক গতি $=$ যোগফল (বিপরীত দিকে) বা বিয়োগফল (একই দিকে)।`),
      shortcut: t('One combined picture: stick the two trains nose-to-tail into one long train of length L₁ + L₂ moving at the relative speed — then it is the single-train formula.', 'একটি মিলিত ছবি: দুটি ট্রেনকে নাক-থেকে-লেজ জুড়ে L₁ + L₂ দৈর্ঘ্যের একটি লম্বা ট্রেন ভাবো যা আপেক্ষিক গতিতে চলছে — তারপর এটি একক ট্রেনের সূত্রই।'),
      trap: t('Using only one train\'s length, or forgetting to convert the relative speed from km/h to m/s before dividing metres by it.', 'শুধু একটি ট্রেনের দৈর্ঘ্য নেওয়া, বা মিটারকে ভাগ করার আগে আপেক্ষিক গতিকে km/h থেকে m/s-এ বদলাতে ভুলে যাওয়া।'),
      spot: t(
        '**Two trains, both with lengths**, pass each other (opposite directions, or the faster overtakes in the same direction); the crossing time, or one train\'s length or speed, is asked.',
        '**দুটি ট্রেন, দুটিরই দৈর্ঘ্য আছে**, পরস্পরকে পার হয় (বিপরীত দিকে, বা একই দিকে দ্রুতগামীটি পিছন থেকে পার হয়); পার হওয়ার সময়, বা একটি ট্রেনের দৈর্ঘ্য বা গতি জানতে চাওয়া হয়।',
      ),
      method: [
        t('Total distance to be covered = sum of the two train lengths.', 'অতিক্রম করতে হবে এমন মোট দূরত্ব = দুটি ট্রেনের দৈর্ঘ্যের যোগফল।'),
        t('Relative speed: add the speeds for opposite directions, subtract for the same direction; convert to m/s.', 'আপেক্ষিক গতি: বিপরীত দিকে গতি যোগ, একই দিকে বিয়োগ; m/s-এ বদলাও।'),
        t('Crossing time = total length ÷ relative speed. If a length is unknown, put it as x in the same equation.', 'পার হওয়ার সময় = মোট দৈর্ঘ্য ÷ আপেক্ষিক গতি। কোনো দৈর্ঘ্য অজানা হলে সেটিকে x ধরে একই সমীকরণে বসাও।'),
      ],
      example: {
        question: t(
          'Two trains 120 m and 180 m long are running in opposite directions at 54 km/h and 36 km/h. In how many seconds will they cross each other?',
          '120 মিটার ও 180 মিটার লম্বা দুটি ট্রেন বিপরীত দিকে 54 km/h ও 36 km/h বেগে চলছে। কত সেকেন্ডে তারা পরস্পরকে পার হবে?',
        ),
        steps: [
          t(r`Total length $= 120 + 180 = 300$ m.`, r`মোট দৈর্ঘ্য $= 120 + 180 = 300$ মিটার।`),
          t(r`Relative speed $= 54 + 36 = 90$ km/h $= 90 \times \frac{5}{18} = 25$ m/s.`, r`আপেক্ষিক গতি $= 54 + 36 = 90$ km/h $= 90 \times \frac{5}{18} = 25$ m/s।`),
          t(r`Time $= 300 \div 25 = 12$ seconds.`, r`সময় $= 300 \div 25 = 12$ সেকেন্ড।`),
        ],
        answer: t('12 seconds', '12 সেকেন্ড'),
      },
      tryIt: {
        question: t(
          'Two trains run in opposite directions at 20 m/s and 15 m/s. One train is 200 m long and they cross each other in 12 seconds. What is the length of the other train?',
          'দুটি ট্রেন বিপরীত দিকে 20 m/s ও 15 m/s বেগে চলে। একটি ট্রেন 200 মিটার লম্বা এবং তারা 12 সেকেন্ডে পরস্পরকে পার হয়। অন্য ট্রেনটির দৈর্ঘ্য কত?',
        ),
        options: [t('200 m', '200 মিটার'), t('220 m', '220 মিটার'), t('250 m', '250 মিটার'), t('420 m', '420 মিটার')],
        correct: 1,
        explanation: [
          t(r`Relative speed $= 20 + 15 = 35$ m/s, so total length $= 35 \times 12 = 420$ m.`, r`আপেক্ষিক গতি $= 20 + 15 = 35$ m/s, তাই মোট দৈর্ঘ্য $= 35 \times 12 = 420$ মিটার।`),
          t(r`Other train $= 420 - 200 = 220$ m. (420 m is the combined length, not the answer.)`, r`অন্য ট্রেন $= 420 - 200 = 220$ মিটার। (420 মিটার হল দুটির মিলিত দৈর্ঘ্য, উত্তর নয়।)`),
        ],
      },
    },
  ],
};
