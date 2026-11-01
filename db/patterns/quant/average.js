'use strict';

// Question patterns: Average. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'average',
  patterns: [
    // 1 ─────────────────────────────────────────────
    {
      key: 'simple_average',
      emoji: '📊',
      name: t('Find the average of given numbers', 'প্রদত্ত সংখ্যাগুলোর গড় নির্ণয়'),
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“Find the average / mean of these numbers (marks, runs, ages, weights).”', '“এই সংখ্যাগুলোর (নম্বর, রান, বয়স, ওজন) গড় / mean নির্ণয় করো।”'),
      formula: t(r`Average $= \frac{\text{sum of all values}}{\text{number of values}}$.`, r`গড় $= \frac{\text{সব মানের যোগফল}}{\text{মানগুলোর সংখ্যা}}$।`),
      shortcut: t('If the numbers have equal gaps, skip the adding: the average is the middle number (for an even count, the mean of the two middle numbers).', 'সংখ্যাগুলোর ব্যবধান সমান হলে যোগ করা বাদ দাও: গড় হল মাঝের সংখ্যাটি (জোড় সংখ্যক হলে মাঝের দুটির গড়)।'),
      trap: t('Dividing by the wrong count, or giving the sum itself as the average.', 'ভুল সংখ্যা দিয়ে ভাগ করা, অথবা যোগফলকেই গড় বলে দেওয়া।'),
      spot: t(
        'A list of numbers (marks, runs, ages, weights) is given and the question asks "find the average" or "mean".',
        'কয়েকটা সংখ্যা (নম্বর, রান, বয়স, ওজন) দেওয়া থাকে আর প্রশ্নে "গড় কত" জানতে চায়।',
      ),
      method: [
        t('Add all the numbers to get the sum.', 'সব সংখ্যা যোগ করে যোগফল বের করো।'),
        t(r`Average $= \frac{\text{sum}}{\text{how many numbers}}$.`, r`গড় $= \frac{\text{যোগফল}}{\text{সংখ্যার মোট পরিমাণ}}$।`),
        t('Shortcut: for numbers with equal gaps (like 12, 15, 18, ...), the average is the middle number.', 'শর্টকাট: সমান ব্যবধানের সংখ্যায় (যেমন 12, 15, 18, ...) গড় হল মাঝের সংখ্যা।'),
      ],
      example: {
        question: t('Find the average of 12, 15, 18, 21 and 24.', '12, 15, 18, 21 ও 24-এর গড় নির্ণয় করো।'),
        steps: [
          t('Sum = 12 + 15 + 18 + 21 + 24 = 90.', 'যোগফল = 12 + 15 + 18 + 21 + 24 = 90।'),
          t('There are 5 numbers, so average = 90 ÷ 5 = 18.', 'মোট 5টি সংখ্যা, তাই গড় = 90 ÷ 5 = 18।'),
          t('Shortcut check: the gaps are all 3, and the middle number is 18.', 'শর্টকাট দিয়ে মিলিয়ে দেখো: সব ব্যবধান 3, আর মাঝের সংখ্যা 18।'),
        ],
        answer: t('18', 'গড় 18'),
      },
      tryIt: {
        question: t('A batsman scores 45, 60, 38, 72, 50 and 65 runs in 6 matches. What is his average score?', 'একজন ব্যাটসম্যান 6টি ম্যাচে 45, 60, 38, 72, 50 ও 65 রান করলেন। তাঁর গড় রান কত?'),
        options: [t('55', '55'), t('66', '66'), t('50', '50'), t('330', '330')],
        correct: 0,
        explanation: [
          t('Sum = 45 + 60 + 38 + 72 + 50 + 65 = 330.', 'যোগফল = 45 + 60 + 38 + 72 + 50 + 65 = 330।'),
          t('Average = 330 ÷ 6 = 55.', 'গড় = 330 ÷ 6 = 55।'),
          t('66 comes from dividing by 5 instead of 6 — always count the numbers.', '6-এর বদলে 5 দিয়ে ভাগ করলে 66 আসে — সংখ্যাগুলো ভালো করে গুনে নাও।'),
        ],
      },
    },

    // 2 ─────────────────────────────────────────────
    {
      key: 'missing_value',
      emoji: '🔍',
      name: t('Find the missing number from the average', 'গড় থেকে হারানো সংখ্যা নির্ণয়'),
      difficulty: 'beginner',
      typicalWording: t('“The average of n numbers is A; all but one are given” or “how much must he score next to make the average ...?”', '“nটি সংখ্যার গড় A; একটি বাদে সব দেওয়া” অথবা “গড় ... করতে পরেরটায় কত পেতে হবে?”'),
      formula: t(r`Missing value $=$ (target average $\times$ new count) $-$ sum of the known values.`, r`হারানো মান $=$ (লক্ষ্য গড় $\times$ নতুন সংখ্যা) $-$ জানা মানগুলোর যোগফল।`),
      shortcut: t('When the average must rise by d over the old items, the new value = new average + (old count × d) — no big totals needed.', 'পুরোনো মানগুলোর ওপর গড় d বাড়াতে হলে নতুন মান = নতুন গড় + (পুরোনো সংখ্যা × d) — বড় মোট যোগফল লাগে না।'),
      trap: t('Adding only the rise d to the new average (like 75 + 3 = 78): every old item must also rise by d, so the new value carries all of it.', 'নতুন গড়ের সঙ্গে শুধু বৃদ্ধি d যোগ করা (যেমন 75 + 3 = 78): প্রতিটি পুরোনো মানেরও d বাড়া দরকার, তাই পুরো ভার নতুন মানের ওপর পড়ে।'),
      spot: t(
        'The average of a group is given, and all values but one are known; or the question asks "how much must he score next to make the average ...".',
        'একটা দলের গড় দেওয়া থাকে আর একটা বাদে সব মান জানা; অথবা প্রশ্ন হয় "গড় ... করতে পরেরটায় কত পেতে হবে?"।',
      ),
      method: [
        t('Total = average × number of items. Find the total the group must have.', 'মোট = গড় × সংখ্যার পরিমাণ। দলের মোট কত হওয়া দরকার বের করো।'),
        t('Subtract the total of the known values.', 'জানা মানগুলোর যোগফল বিয়োগ করো।'),
        t('What is left is the missing number.', 'যা বাকি থাকে সেটাই হারানো সংখ্যা।'),
      ],
      example: {
        question: t('The average of 5 numbers is 30. Four of them are 20, 28, 34 and 36. Find the fifth number.', '5টি সংখ্যার গড় 30। তাদের চারটি হল 20, 28, 34 ও 36। পঞ্চম সংখ্যাটি কত?'),
        steps: [
          t('Total of all 5 = 5 × 30 = 150.', '5টি সংখ্যার মোট = 5 × 30 = 150।'),
          t('Total of the four = 20 + 28 + 34 + 36 = 118.', 'চারটির যোগফল = 20 + 28 + 34 + 36 = 118।'),
          t('Fifth number = 150 − 118 = 32.', 'পঞ্চম সংখ্যা = 150 − 118 = 32।'),
        ],
        answer: t('32', 'পঞ্চম সংখ্যা 32'),
      },
      tryIt: {
        question: t(`Riya's average mark in 4 subjects is 72. How many marks must she get in the 5th subject so that her average becomes 75?`, 'রিয়ার 4টি বিষয়ে গড় নম্বর 72। পঞ্চম বিষয়ে কত পেলে তার গড় 75 হবে?'),
        options: [t('78', '78'), t('87', '87'), t('75', '75'), t('81', '81')],
        correct: 1,
        explanation: [
          t('Total needed for 5 subjects = 5 × 75 = 375.', '5টি বিষয়ে মোট দরকার = 5 × 75 = 375।'),
          t('Total she has in 4 subjects = 4 × 72 = 288.', '4টি বিষয়ে তার মোট = 4 × 72 = 288।'),
          t('Marks needed = 375 − 288 = 87. (78 just adds 3 to 75 — but all 5 subjects must rise by 3.)', 'দরকারি নম্বর = 375 − 288 = 87। (78 মানে 75-এর সঙ্গে শুধু 3 যোগ — কিন্তু 5টি বিষয়েরই গড় 3 করে বাড়াতে হবে।)'),
        ],
      },
    },

    // 3 ─────────────────────────────────────────────
    {
      key: 'join_leave_replace',
      emoji: '🚶',
      name: t('Someone joins, leaves or is replaced', 'কেউ যোগ দিলে, চলে গেলে বা বদলালে'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“When the teacher is included / a new student joins / one person is replaced, the average becomes ...”', '“শিক্ষককে ধরলে / নতুন ছাত্র যোগ দিলে / একজন বদলালে গড় হয় ...”'),
      formula: t(r`Joining: new person $=(n+1)\times$ new average $- n\times$ old average. Replacing: new person $=$ old person $+ n\times$ (change in average).`, r`যোগ দিলে: নতুন ব্যক্তি $=(n+1)\times$ নতুন গড় $- n\times$ পুরোনো গড়। বদলালে: নতুন ব্যক্তি $=$ পুরোনো ব্যক্তি $+ n\times$ (গড়ের পরিবর্তন)।`),
      shortcut: t('For a replacement the count never changes, so skip both totals: new = old + n × change in average, in one line.', 'বদলের ক্ষেত্রে সংখ্যা বদলায় না, তাই দুটি মোটই বাদ দাও: নতুন = পুরোনো + n × গড়ের পরিবর্তন, এক লাইনে।'),
      trap: t('Using the old count n after someone joins (the new total is shared by n + 1) or after someone leaves (n − 1).', 'কেউ যোগ দেওয়ার পরেও পুরোনো সংখ্যা n ব্যবহার করা (নতুন মোট n + 1 জনে ভাগ হয়) বা কেউ চলে গেলে n − 1 না করা।'),
      spot: t(
        'The average of a group changes because a person (teacher, new student, new player) is added, removed or replaces someone. That person\'s age or weight is asked.',
        'কেউ (শিক্ষক, নতুন ছাত্র, নতুন খেলোয়াড়) দলে ঢুকলে, বেরোলে বা কারো জায়গা নিলে গড় বদলায়। সেই ব্যক্তির বয়স বা ওজন জানতে চায়।',
      ),
      method: [
        t('Joins: new person = new total − old total = (new count × new average) − (old count × old average).', 'যোগ দিলে: নতুন ব্যক্তি = নতুন মোট − পুরোনো মোট = (নতুন সংখ্যা × নতুন গড়) − (পুরোনো সংখ্যা × পুরোনো গড়)।'),
        t('Replaced (count stays n): new person = old person + n × (change in average).', 'বদলালে (সংখ্যা n একই থাকে): নতুন ব্যক্তি = পুরোনো ব্যক্তি + n × (গড়ের পরিবর্তন)।'),
        t('If the average goes down, the change is negative.', 'গড় কমলে পরিবর্তনটা ঋণাত্মক ধরবে।'),
      ],
      example: {
        question: t('The average age of 30 students is 14 years. When the teacher\'s age is included, the average becomes 15 years. Find the teacher\'s age.', '30 জন ছাত্রছাত্রীর গড় বয়স 14 বছর। শিক্ষকের বয়স ধরলে গড় হয় 15 বছর। শিক্ষকের বয়স কত?'),
        steps: [
          t('Old total = 30 × 14 = 420 years.', 'পুরোনো মোট = 30 × 14 = 420 বছর।'),
          t('New total (31 people) = 31 × 15 = 465 years.', 'নতুন মোট (31 জন) = 31 × 15 = 465 বছর।'),
          t('Teacher = 465 − 420 = 45 years.', 'শিক্ষকের বয়স = 465 − 420 = 45 বছর।'),
        ],
        answer: t('45 years', '45 বছর'),
      },
      tryIt: {
        question: t('The average weight of 8 people goes up by 2.5 kg when a new person comes in place of one who weighs 65 kg. What is the weight of the new person?', '65 kg ওজনের একজনের জায়গায় একজন নতুন লোক এলে 8 জনের গড় ওজন 2.5 kg বেড়ে যায়। নতুন লোকটির ওজন কত?'),
        options: [t('67.5 kg', '67.5 kg'), t('75 kg', '75 kg'), t('90 kg', '90 kg'), t('85 kg', '85 kg')],
        correct: 3,
        explanation: [
          t('The count stays 8. Total weight goes up by 8 × 2.5 = 20 kg.', 'লোকসংখ্যা 8-ই থাকে। মোট ওজন বাড়ে 8 × 2.5 = 20 kg।'),
          t('So the new person is 20 kg heavier than the one who left: 65 + 20 = 85 kg.', 'তাই নতুন লোকটি চলে যাওয়া লোকের চেয়ে 20 kg ভারী: 65 + 20 = 85 kg।'),
          t('67.5 kg (65 + 2.5) forgets that the 2.5 kg rise is shared by all 8 people.', '67.5 kg (65 + 2.5) ভুল, কারণ 2.5 kg বৃদ্ধি 8 জনের প্রত্যেকের।'),
        ],
      },
    },

    // 4 ─────────────────────────────────────────────
    {
      key: 'wrong_entry',
      emoji: '✏️',
      name: t('A number was copied wrongly: correct the average', 'ভুল লেখা সংখ্যা: সঠিক গড় নির্ণয়'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“Later it was found that a number was wrongly read / written as ... Find the correct average.”', '“পরে দেখা গেল একটি সংখ্যা ভুল করে ... পড়া / লেখা হয়েছিল। সঠিক গড় নির্ণয় করো।”'),
      formula: t(r`Correct average $=$ old average $+ \frac{\text{correct value} - \text{wrong value}}{n}$.`, r`সঠিক গড় $=$ পুরোনো গড় $+ \frac{\text{সঠিক মান} - \text{ভুল মান}}{n}$।`),
      shortcut: t('Work only with the single difference: divide the error by n and adjust the old average — never rebuild the whole total.', 'শুধু একটি পার্থক্য নিয়ে কাজ করো: ভুলের পরিমাণকে n দিয়ে ভাগ করে পুরোনো গড়ে যোগ-বিয়োগ করো — পুরো মোট আবার বানাতে যেও না।'),
      trap: t('Getting the sign wrong (the average falls if the correct value is smaller), or adding the whole error without dividing by n.', 'চিহ্ন উল্টে ফেলা (সঠিক মান ছোট হলে গড় কমে), অথবা n দিয়ে ভাগ না করে পুরো ভুলের পরিমাণ যোগ করা।'),
      spot: t(
        'The question says "later it was found that one number ... was wrongly read / written as ...". The correct average is asked.',
        'প্রশ্নে বলা থাকে "পরে দেখা গেল একটা সংখ্যা ... ভুল করে ... লেখা হয়েছিল"। সঠিক গড় জানতে চায়।',
      ),
      method: [
        t('Error = correct value − wrong value.', 'ভুলের পরিমাণ = সঠিক মান − ভুল মান।'),
        t(r`Correct average $= \text{old average} + \frac{\text{error}}{n}$.`, r`সঠিক গড় $= \text{পুরোনো গড়} + \frac{\text{ভুলের পরিমাণ}}{n}$।`),
        t('If the correct value is smaller, the error is negative and the average goes down.', 'সঠিক মান ছোট হলে ভুলের পরিমাণ ঋণাত্মক, গড় কমবে।'),
      ],
      example: {
        question: t('The average of 20 numbers is 45. Later it was found that 64 was wrongly written as 46. Find the correct average.', '20টি সংখ্যার গড় 45। পরে দেখা গেল 64 ভুল করে 46 লেখা হয়েছিল। সঠিক গড় কত?'),
        steps: [
          t('Error = 64 − 46 = 18 (the total was 18 too small).', 'ভুলের পরিমাণ = 64 − 46 = 18 (মোট 18 কম ধরা হয়েছিল)।'),
          t(r`Correct average $= 45 + \frac{18}{20} = 45 + 0.9 = 45.9$.`, r`সঠিক গড় $= 45 + \frac{18}{20} = 45 + 0.9 = 45.9$।`),
        ],
        answer: t('45.9', 'সঠিক গড় 45.9'),
      },
      tryIt: {
        question: t('The average of 25 numbers was found to be 40. Later it was noticed that the number 72 had been written as 47. What is the correct average?', '25টি সংখ্যার গড় পাওয়া গেল 40। পরে দেখা গেল 72 সংখ্যাটিকে 47 লেখা হয়েছিল। সঠিক গড় কত?'),
        options: [t('39', '39'), t('65', '65'), t('40.5', '40.5'), t('41', '41')],
        correct: 3,
        explanation: [
          t('Error = 72 − 47 = 25, so the total was 25 too small.', 'ভুলের পরিমাণ = 72 − 47 = 25, অর্থাৎ মোট 25 কম ধরা হয়েছিল।'),
          t(r`Correct average $= 40 + \frac{25}{25} = 40 + 1 = 41$.`, r`সঠিক গড় $= 40 + \frac{25}{25} = 40 + 1 = 41$।`),
          t('39 subtracts instead of adding; 65 adds the whole 25 without dividing by 25.', '39 হয় যোগের বদলে বিয়োগ করলে; 65 হয় 25 দিয়ে ভাগ না করে পুরো 25 যোগ করলে।'),
        ],
      },
    },

    // 5 ─────────────────────────────────────────────
    {
      key: 'average_speed',
      emoji: '🚗',
      name: t('Average speed for the same distance both ways', 'একই দূরত্ব যাওয়া-আসায় গড় গতিবেগ'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“Goes at x km/h and returns at y km/h. Find the average speed for the whole journey.”', '“x km/h বেগে যায় এবং y km/h বেগে ফেরে। পুরো যাত্রার গড় গতিবেগ নির্ণয় করো।”'),
      formula: t(r`For equal distances at speeds $x$ and $y$: average speed $= \frac{2xy}{x + y}$.`, r`সমান দূরত্বে $x$ ও $y$ গতিতে: গড় গতিবেগ $= \frac{2xy}{x + y}$।`),
      shortcut: t(r`Use $\frac{2xy}{x+y}$ only when the two distances are equal; if they are not, go back to total distance $\div$ total time.`, r`দুটি দূরত্ব সমান হলেই $\frac{2xy}{x+y}$ ব্যবহার করো; সমান না হলে মোট দূরত্ব $\div$ মোট সময়ে ফিরে যাও।`),
      trap: t('Taking the simple average of the two speeds, (x + y)/2 — more time is spent at the slower speed, so the true average is always lower.', 'দুই গতির সাধারণ গড় (x + y)/2 নেওয়া — ধীর গতিতে বেশি সময় কাটে, তাই আসল গড় সবসময় তার চেয়ে কম হয়।'),
      spot: t(
        'Someone goes a distance at one speed and comes back (or covers an equal distance) at another speed. The average speed for the whole trip is asked.',
        'কেউ একটা দূরত্ব এক গতিতে যায় আর আর এক গতিতে ফেরে (বা সমান দূরত্ব যায়)। পুরো যাত্রার গড় গতিবেগ জানতে চায়।',
      ),
      method: [
        t(r`Average speed $= \frac{\text{total distance}}{\text{total time}}$, **not** the simple average of the two speeds.`, r`গড় গতিবেগ $= \frac{\text{মোট দূরত্ব}}{\text{মোট সময়}}$, দুই গতির সাধারণ গড় **নয়**।`),
        t(r`For equal distances at speeds x and y: average speed $= \frac{2xy}{x + y}$.`, r`সমান দূরত্বে x ও y গতিতে: গড় গতিবেগ $= \frac{2xy}{x + y}$।`),
      ],
      example: {
        question: t('A car goes from town A to town B at 40 km/h and returns at 60 km/h. Find its average speed for the whole journey.', 'একটা গাড়ি A শহর থেকে B শহরে 40 km/h বেগে যায় এবং 60 km/h বেগে ফেরে। পুরো যাত্রায় গড় গতিবেগ কত?'),
        steps: [
          t(r`Average speed $= \frac{2 \times 40 \times 60}{40 + 60} = \frac{4800}{100} = 48$ km/h.`, r`গড় গতিবেগ $= \frac{2 \times 40 \times 60}{40 + 60} = \frac{4800}{100} = 48$ km/h।`),
          t('Check with a distance of 120 km: time = 3 h + 2 h = 5 h for 240 km, and 240 ÷ 5 = 48.', '120 km দূরত্ব ধরে মিলিয়ে দেখো: সময় = 3 ঘণ্টা + 2 ঘণ্টা = 5 ঘণ্টায় 240 km, আর 240 ÷ 5 = 48।'),
        ],
        answer: t('48 km/h', 'গড় গতিবেগ 48 km/h'),
      },
      tryIt: {
        question: t('A boy cycles to school at 30 km/h and comes back home by the same road at 20 km/h. What is his average speed?', 'একটি ছেলে 30 km/h বেগে সাইকেলে স্কুলে যায় এবং একই রাস্তায় 20 km/h বেগে বাড়ি ফেরে। তার গড় গতিবেগ কত?'),
        options: [t('25 km/h', '25 km/h'), t('24 km/h', '24 km/h'), t('26 km/h', '26 km/h'), t('50 km/h', '50 km/h')],
        correct: 1,
        explanation: [
          t(r`Average speed $= \frac{2 \times 30 \times 20}{30 + 20} = \frac{1200}{50} = 24$ km/h.`, r`গড় গতিবেগ $= \frac{2 \times 30 \times 20}{30 + 20} = \frac{1200}{50} = 24$ km/h।`),
          t('25 km/h is the simple average — wrong, because he spends more time at the slower speed.', '25 km/h হল সাধারণ গড় — ভুল, কারণ ধীর গতিতে সে বেশি সময় কাটায়।'),
        ],
      },
    },

    // 6 ─────────────────────────────────────────────
    {
      key: 'natural_numbers_formula_averages',
      emoji: '🔢',
      name: t('Averages of the first n natural, even and odd numbers', 'প্রথম nটি স্বাভাবিক, জোড় ও বিজোড় সংখ্যার গড়'),
      difficulty: 'beginner',
      typicalWording: t('“Find the average of the first n natural / even / odd numbers” or “of the squares / cubes of the first n natural numbers.”', '“প্রথম nটি স্বাভাবিক / জোড় / বিজোড় সংখ্যার গড় নির্ণয় করো” অথবা “প্রথম nটি স্বাভাবিক সংখ্যার বর্গের / ঘনের গড়।”'),
      formula: t(r`First $n$ natural: $\frac{n+1}{2}$; first $n$ even: $n+1$; first $n$ odd: $n$; squares of first $n$: $\frac{(n+1)(2n+1)}{6}$; cubes of first $n$: $\frac{n(n+1)^2}{4}$.`, r`প্রথম $n$টি স্বাভাবিক: $\frac{n+1}{2}$; প্রথম $n$টি জোড়: $n+1$; প্রথম $n$টি বিজোড়: $n$; প্রথম $n$টির বর্গ: $\frac{(n+1)(2n+1)}{6}$; প্রথম $n$টির ঘন: $\frac{n(n+1)^2}{4}$।`),
      shortcut: t('Memorise the five results as a set and pick by the word natural / even / odd / squares / cubes — no series needs to be written out.', 'পাঁচটি ফল একসঙ্গে মনে রাখো এবং natural / even / odd / squares / cubes শব্দ দেখে বেছে নাও — ধারাটি লেখার দরকার নেই।'),
      trap: t('Mixing up the even and odd results (n + 1 vs n), or using the squares formula when the question asks for the numbers themselves.', 'জোড় ও বিজোড়ের ফল গুলিয়ে ফেলা (n + 1 বনাম n), অথবা সংখ্যাগুলোর গড় চাইলে বর্গের সূত্র ব্যবহার করা।'),
      spot: t(
        'The list is not written out — it is described as "the first n natural / even / odd numbers" or their squares or cubes.',
        'তালিকাটি লেখা থাকে না — বলা থাকে "প্রথম nটি স্বাভাবিক / জোড় / বিজোড় সংখ্যা" অথবা তাদের বর্গ বা ঘন।',
      ),
      method: [
        t('Identify which family is asked: natural, even, odd, squares or cubes.', 'কোন পরিবার চাওয়া হয়েছে চিনে নাও: স্বাভাবিক, জোড়, বিজোড়, বর্গ নাকি ঘন।'),
        t('Pick the matching ready result for the first n of that family.', 'সেই পরিবারের প্রথম nটির জন্য মানানসই তৈরি ফলটি বেছে নাও।'),
        t('Put in n and simplify.', 'n বসিয়ে সরল করো।'),
      ],
      example: {
        question: t('Find the average of the first 20 natural numbers.', 'প্রথম 20টি স্বাভাবিক সংখ্যার গড় নির্ণয় করো।'),
        steps: [
          t('The family is the first n natural numbers, with n = 20.', 'পরিবারটি হল প্রথম nটি স্বাভাবিক সংখ্যা, যেখানে n = 20।'),
          t(r`Average $= \frac{n + 1}{2} = \frac{20 + 1}{2} = \frac{21}{2} = 10.5$.`, r`গড় $= \frac{n + 1}{2} = \frac{20 + 1}{2} = \frac{21}{2} = 10.5$।`),
          t('Check: the numbers run 1 to 20, and (first + last) ÷ 2 = 21 ÷ 2 = 10.5.', 'মিলিয়ে দেখো: সংখ্যাগুলো 1 থেকে 20, আর (প্রথম + শেষ) ÷ 2 = 21 ÷ 2 = 10.5।'),
        ],
        answer: t('10.5', 'গড় 10.5'),
      },
      tryIt: {
        question: t('What is the average of the squares of the first 10 natural numbers?', 'প্রথম 10টি স্বাভাবিক সংখ্যার বর্গের গড় কত?'),
        options: [t('30.25', '30.25'), t('385', '385'), t('38.5', '38.5'), t('55', '55')],
        correct: 2,
        explanation: [
          t(r`Average of squares $= \frac{(n + 1)(2n + 1)}{6} = \frac{11 \times 21}{6} = \frac{231}{6} = 38.5$.`, r`বর্গের গড় $= \frac{(n + 1)(2n + 1)}{6} = \frac{11 \times 21}{6} = \frac{231}{6} = 38.5$।`),
          t('Check: the squares add up to 385, and 385 ÷ 10 = 38.5.', 'মিলিয়ে দেখো: বর্গগুলোর যোগফল 385, আর 385 ÷ 10 = 38.5।'),
          t('385 is the sum, not the average; 30.25 is the square of the plain average 5.5.', '385 হল যোগফল, গড় নয়; 30.25 হল সাধারণ গড় 5.5-এর বর্গ।'),
        ],
      },
    },

    // 7 ─────────────────────────────────────────────
    {
      key: 'consecutive_series_average',
      emoji: '📏',
      name: t('Consecutive numbers: the average is the middle', 'ক্রমিক সংখ্যা: গড়ই মাঝের সংখ্যা'),
      difficulty: 'beginner',
      typicalWording: t('“The average of k consecutive (even / odd) numbers is A. Find the largest / smallest number.”', '“kটি ক্রমিক (জোড় / বিজোড়) সংখ্যার গড় A। বৃহত্তম / ক্ষুদ্রতম সংখ্যাটি নির্ণয় করো।”'),
      formula: t(r`For evenly spaced numbers, average $= \frac{\text{first} + \text{last}}{2}$, and with an odd count the average is the middle term itself.`, r`সমান ব্যবধানের সংখ্যায় গড় $= \frac{\text{প্রথম} + \text{শেষ}}{2}$, আর সংখ্যা বিজোড় হলে গড়ই মাঝের পদটি।`),
      shortcut: t('Start from the average as the middle term and step out by the gap: for 7 terms go 3 steps each way, for 5 terms 2 steps each way.', 'গড়কে মাঝের পদ ধরে ব্যবধান অনুযায়ী এগিয়ে-পিছিয়ে যাও: 7টি পদের জন্য দুদিকে 3 ধাপ, 5টি পদের জন্য দুদিকে 2 ধাপ।'),
      trap: t('Using a gap of 1 for consecutive even or odd numbers — their gap is 2, so each step away from the middle moves by 2.', 'ক্রমিক জোড় বা বিজোড় সংখ্যায় ব্যবধান 1 ধরা — তাদের ব্যবধান 2, তাই মাঝখান থেকে প্রতিটি ধাপে 2 করে বাড়ে-কমে।'),
      spot: t(
        'The numbers are described as **consecutive** (or consecutive even / odd), only their count and average are given, and one end number — or all the numbers — is asked.',
        'সংখ্যাগুলোকে **ক্রমিক** (বা ক্রমিক জোড় / বিজোড়) বলা থাকে, শুধু তাদের সংখ্যা ও গড় দেওয়া থাকে, আর এক প্রান্তের সংখ্যা — বা সব সংখ্যা — জানতে চায়।',
      ),
      method: [
        t('The average is the middle term when the count is odd.', 'সংখ্যা বিজোড় হলে গড়ই মাঝের পদ।'),
        t('Note the gap: 1 for consecutive numbers, 2 for consecutive even or odd numbers.', 'ব্যবধান লক্ষ করো: ক্রমিক সংখ্যায় 1, ক্রমিক জোড় বা বিজোড় সংখ্যায় 2।'),
        t('Move from the middle by whole steps of the gap to reach the first or the last term.', 'মাঝখান থেকে ব্যবধানের পূর্ণ ধাপে এগিয়ে প্রথম বা শেষ পদে পৌঁছাও।'),
      ],
      example: {
        question: t('The average of 7 consecutive numbers is 20. Find the largest number.', '7টি ক্রমিক সংখ্যার গড় 20। বৃহত্তম সংখ্যাটি নির্ণয় করো।'),
        steps: [
          t('With 7 numbers, the average 20 is the 4th (middle) number.', '7টি সংখ্যা থাকায় গড় 20 হল 4র্থ (মাঝের) সংখ্যা।'),
          t('The numbers are 17, 18, 19, 20, 21, 22, 23 — three steps of 1 on each side of 20.', 'সংখ্যাগুলো 17, 18, 19, 20, 21, 22, 23 — 20-এর দুদিকে 1 করে তিন ধাপ।'),
          t('The largest number is 20 + 3 = 23.', 'বৃহত্তম সংখ্যা 20 + 3 = 23।'),
        ],
        answer: t('23', 'বৃহত্তম সংখ্যা 23'),
      },
      tryIt: {
        question: t('The average of 5 consecutive even numbers is 30. Find the smallest number.', '5টি ক্রমিক জোড় সংখ্যার গড় 30। ক্ষুদ্রতম সংখ্যাটি নির্ণয় করো।'),
        options: [t('30', '30'), t('26', '26'), t('28', '28'), t('34', '34')],
        correct: 1,
        explanation: [
          t('The average 30 is the middle (3rd) even number.', 'গড় 30 হল মাঝের (3য়) জোড় সংখ্যা।'),
          t('Even numbers step by 2, so two steps back: 30 − 2 − 2 = 26.', 'জোড় সংখ্যা 2 করে বাড়ে, তাই দুই ধাপ পিছিয়ে: 30 − 2 − 2 = 26।'),
          t('The numbers are 26, 28, 30, 32, 34. (28 steps back by 1s as if the gap were 1.)', 'সংখ্যাগুলো 26, 28, 30, 32, 34। (28 হয় ব্যবধান 1 ধরে পিছোলে।)'),
        ],
      },
    },

    // 8 ─────────────────────────────────────────────
    {
      key: 'frequency_table_average',
      emoji: '📋',
      name: t('Average from a frequency table', 'পরিসংখ্যা (frequency) সারণি থেকে গড়'),
      difficulty: 'beginner',
      typicalWording: t('“The following table shows values and how many times each occurs. Find the mean.”', '“নিচের সারণিতে মান ও প্রতিটি কতবার এসেছে তা দেওয়া আছে। গড় নির্ণয় করো।”'),
      formula: t(r`Average $= \frac{\sum (x \times f)}{\sum f}$, where $x$ is a value and $f$ is how many times it occurs.`, r`গড় $= \frac{\sum (x \times f)}{\sum f}$, যেখানে $x$ একটি মান এবং $f$ হল সেটি কতবার এসেছে।`),
      shortcut: t('Build two running totals as you read the table — sum of x × f and sum of f — then divide once at the end.', 'সারণি পড়তে পড়তে দুটি চলমান মোট রাখো — x × f-এর যোগফল ও f-এর যোগফল — তারপর শেষে একবার ভাগ করো।'),
      trap: t('Averaging the listed values alone and ignoring the frequencies, or dividing by the number of rows instead of the total frequency.', 'পরিসংখ্যা উপেক্ষা করে শুধু লেখা মানগুলোর গড় করা, অথবা মোট পরিসংখ্যার বদলে সারির সংখ্যা দিয়ে ভাগ করা।'),
      spot: t(
        'Data comes as a **table**: each value appears with a frequency (number of students, days, families) telling how many times it occurs.',
        'তথ্য আসে একটি **সারণি** আকারে: প্রতিটি মানের সঙ্গে পরিসংখ্যা (ছাত্রসংখ্যা, দিন, পরিবার) থাকে, যা বলে মানটি কতবার এসেছে।',
      ),
      method: [
        t('Multiply each value by its frequency: x × f.', 'প্রতিটি মানকে তার পরিসংখ্যা দিয়ে গুণ করো: x × f।'),
        t('Add all the x × f products to get the true total.', 'সব x × f গুণফল যোগ করে আসল মোট পাও।'),
        t('Add all the frequencies, then average = total ÷ total frequency.', 'সব পরিসংখ্যা যোগ করো, তারপর গড় = মোট ÷ মোট পরিসংখ্যা।'),
      ],
      example: {
        question: t('A value 5 occurs 2 times, 10 occurs 4 times, 15 occurs 3 times and 20 occurs 1 time. Find the average of all the values.', 'মান 5 এসেছে 2 বার, 10 এসেছে 4 বার, 15 এসেছে 3 বার এবং 20 এসেছে 1 বার। সব মানের গড় নির্ণয় করো।'),
        steps: [
          t('Products: 5 × 2 = 10, 10 × 4 = 40, 15 × 3 = 45, 20 × 1 = 20.', 'গুণফল: 5 × 2 = 10, 10 × 4 = 40, 15 × 3 = 45, 20 × 1 = 20।'),
          t('Total = 10 + 40 + 45 + 20 = 115, and total frequency = 2 + 4 + 3 + 1 = 10.', 'মোট = 10 + 40 + 45 + 20 = 115, আর মোট পরিসংখ্যা = 2 + 4 + 3 + 1 = 10।'),
          t('Average = 115 ÷ 10 = 11.5.', 'গড় = 115 ÷ 10 = 11.5।'),
        ],
        answer: t('11.5', 'গড় 11.5'),
      },
      tryIt: {
        question: t('In a survey, 10 occurs 3 times, 20 occurs 5 times and 30 occurs 2 times. Find the average.', 'একটি সমীক্ষায় 10 এসেছে 3 বার, 20 এসেছে 5 বার এবং 30 এসেছে 2 বার। গড় নির্ণয় করো।'),
        options: [t('20', '20'), t('18', '18'), t('21', '21'), t('19', '19')],
        correct: 3,
        explanation: [
          t('Total = 10 × 3 + 20 × 5 + 30 × 2 = 30 + 100 + 60 = 190.', 'মোট = 10 × 3 + 20 × 5 + 30 × 2 = 30 + 100 + 60 = 190।'),
          t('Total frequency = 3 + 5 + 2 = 10, so average = 190 ÷ 10 = 19.', 'মোট পরিসংখ্যা = 3 + 5 + 2 = 10, তাই গড় = 190 ÷ 10 = 19।'),
          t('20 is the plain average of 10, 20, 30 — it ignores that 20 occurs most often.', '20 হল 10, 20, 30-এর সাধারণ গড় — এতে 20 সবচেয়ে বেশিবার এসেছে তা ধরা হয় না।'),
        ],
      },
    },

    // 9 ─────────────────────────────────────────────
    {
      key: 'weighted_combined_groups',
      emoji: '⚖️',
      name: t('Combined average of two groups (weighted average)', 'দুটি দলের মিলিত গড় (ভারযুক্ত গড়)'),
      difficulty: 'intermediate',
      typicalWording: t('“Group A has n₁ members with average a₁ and group B has n₂ members with average a₂. Find the combined average.”', '“A দলে n₁ জন, গড় a₁ এবং B দলে n₂ জন, গড় a₂। মিলিত গড় নির্ণয় করো।”'),
      formula: t(r`Combined average $= \frac{n_1 a_1 + n_2 a_2}{n_1 + n_2}$.`, r`মিলিত গড় $= \frac{n_1 a_1 + n_2 a_2}{n_1 + n_2}$।`),
      shortcut: t('Start from one group average and shift by the other group share: combined = a₁ + (a₂ − a₁) × n₂/(n₁ + n₂) — handy when the numbers are large.', 'একটি দলের গড় থেকে শুরু করে অন্য দলের অংশ অনুযায়ী সরাও: মিলিত = a₁ + (a₂ − a₁) × n₂/(n₁ + n₂) — সংখ্যা বড় হলে সুবিধাজনক।'),
      trap: t('Taking the plain average of the two averages, (a₁ + a₂)/2 — that is right only when both groups are the same size.', 'দুটি গড়ের সাধারণ গড় (a₁ + a₂)/2 নেওয়া — তা শুধু দুটি দলের আকার সমান হলেই ঠিক।'),
      spot: t(
        'Two (or more) groups of **different sizes** are given, each with its own average, and the average of everyone together is asked.',
        '**আলাদা আকারের** দুটি (বা তার বেশি) দল দেওয়া থাকে, প্রতিটির নিজের গড়সহ, আর সবার একসঙ্গে গড় জানতে চায়।',
      ),
      method: [
        t('Turn each group average back into a total: n₁ × a₁ and n₂ × a₂.', 'প্রতিটি দলের গড়কে মোটে ফিরিয়ে নাও: n₁ × a₁ এবং n₂ × a₂।'),
        t('Add the two totals and add the two sizes.', 'দুটি মোট যোগ করো এবং দুটি আকার যোগ করো।'),
        t('Combined average = combined total ÷ combined size.', 'মিলিত গড় = মিলিত মোট ÷ মিলিত আকার।'),
      ],
      example: {
        question: t('A class has 40 boys with an average mark of 50 and 60 girls with an average mark of 60. Find the average mark of the whole class.', 'একটি শ্রেণিতে 40 জন ছেলের গড় নম্বর 50 এবং 60 জন মেয়ের গড় নম্বর 60। পুরো শ্রেণির গড় নম্বর নির্ণয় করো।'),
        steps: [
          t('Boys total = 40 × 50 = 2000; girls total = 60 × 60 = 3600.', 'ছেলেদের মোট = 40 × 50 = 2000; মেয়েদের মোট = 60 × 60 = 3600।'),
          t('Combined total = 2000 + 3600 = 5600, and combined size = 40 + 60 = 100.', 'মিলিত মোট = 2000 + 3600 = 5600, আর মিলিত আকার = 40 + 60 = 100।'),
          t('Combined average = 5600 ÷ 100 = 56.', 'মিলিত গড় = 5600 ÷ 100 = 56।'),
        ],
        answer: t('56', 'মিলিত গড় 56'),
      },
      tryIt: {
        question: t('Section A has 25 students with an average weight of 48 kg and section B has 15 students with an average weight of 64 kg. Find the combined average weight.', 'A শাখায় 25 জন ছাত্রের গড় ওজন 48 kg এবং B শাখায় 15 জন ছাত্রের গড় ওজন 64 kg। মিলিত গড় ওজন নির্ণয় করো।'),
        options: [t('56 kg', '56 kg'), t('54 kg', '54 kg'), t('52 kg', '52 kg'), t('58 kg', '58 kg')],
        correct: 1,
        explanation: [
          t('Totals: 25 × 48 = 1200 and 15 × 64 = 960, so combined total = 2160.', 'মোট: 25 × 48 = 1200 এবং 15 × 64 = 960, তাই মিলিত মোট = 2160।'),
          t('Combined average = 2160 ÷ (25 + 15) = 2160 ÷ 40 = 54 kg.', 'মিলিত গড় = 2160 ÷ (25 + 15) = 2160 ÷ 40 = 54 kg।'),
          t('56 kg is the plain average of 48 and 64 — wrong, because the groups are not equal in size.', '56 kg হল 48 ও 64-এর সাধারণ গড় — ভুল, কারণ দল দুটির আকার সমান নয়।'),
        ],
      },
    },

    // 10 ─────────────────────────────────────────────
    {
      key: 'removal_average',
      emoji: '➖',
      name: t('One value is removed: find the removed value', 'একটি মান বাদ গেলে: বাদ যাওয়া মানটি নির্ণয়'),
      difficulty: 'intermediate',
      typicalWording: t('“The average of n numbers is A. When one number is removed, the average of the rest is B. Find the removed number.”', '“nটি সংখ্যার গড় A। একটি সংখ্যা বাদ দিলে বাকিগুলোর গড় হয় B। বাদ যাওয়া সংখ্যাটি নির্ণয় করো।”'),
      formula: t(r`Removed value $= n \times A - (n - 1) \times B$, where $A$ is the old average and $B$ the average of the rest.`, r`বাদ যাওয়া মান $= n \times A - (n - 1) \times B$, যেখানে $A$ পুরোনো গড় এবং $B$ বাকিগুলোর গড়।`),
      shortcut: t('Removed value = new average + n × (old average − new average): the removed value carries the whole drop of the group.', 'বাদ যাওয়া মান = নতুন গড় + n × (পুরোনো গড় − নতুন গড়): দলের পুরো পতন বাদ যাওয়া মানটি বহন করে।'),
      trap: t('Dividing or multiplying by n after removal — the remaining total uses n − 1 items, not n.', 'বাদ দেওয়ার পরেও n দিয়ে গুণ বা ভাগ করা — বাকি মোটে থাকে n − 1টি মান, nটি নয়।'),
      spot: t(
        'The average **before** removal and the average of the **remaining** values are both given, and the value that was taken out is asked.',
        'বাদ দেওয়ার **আগের** গড় এবং **বাকি** মানগুলোর গড় দুটোই দেওয়া থাকে, আর বাদ যাওয়া মানটি জানতে চায়।',
      ),
      method: [
        t('Old total = old average × n.', 'পুরোনো মোট = পুরোনো গড় × n।'),
        t('Remaining total = new average × (n − 1).', 'বাকি মোট = নতুন গড় × (n − 1)।'),
        t('Removed value = old total − remaining total.', 'বাদ যাওয়া মান = পুরোনো মোট − বাকি মোট।'),
      ],
      example: {
        question: t('The average of 10 numbers is 40. When one number is removed, the average of the remaining 9 numbers is 38. Find the removed number.', '10টি সংখ্যার গড় 40। একটি সংখ্যা বাদ দিলে বাকি 9টি সংখ্যার গড় হয় 38। বাদ যাওয়া সংখ্যাটি নির্ণয় করো।'),
        steps: [
          t('Old total = 10 × 40 = 400.', 'পুরোনো মোট = 10 × 40 = 400।'),
          t('Remaining total = 9 × 38 = 342.', 'বাকি মোট = 9 × 38 = 342।'),
          t('Removed number = 400 − 342 = 58.', 'বাদ যাওয়া সংখ্যা = 400 − 342 = 58।'),
        ],
        answer: t('58', 'বাদ যাওয়া সংখ্যা 58'),
      },
      tryIt: {
        question: t('The average of 8 numbers is 25. After removing one number, the average of the remaining 7 numbers is 24. What number was removed?', '8টি সংখ্যার গড় 25। একটি সংখ্যা বাদ দেওয়ার পর বাকি 7টি সংখ্যার গড় 24। কোন সংখ্যাটি বাদ গিয়েছিল?'),
        options: [t('25', '25'), t('31', '31'), t('32', '32'), t('24', '24')],
        correct: 2,
        explanation: [
          t('Old total = 8 × 25 = 200; remaining total = 7 × 24 = 168.', 'পুরোনো মোট = 8 × 25 = 200; বাকি মোট = 7 × 24 = 168।'),
          t('Removed number = 200 − 168 = 32.', 'বাদ যাওয়া সংখ্যা = 200 − 168 = 32।'),
          t('Shortcut check: 24 + 8 × (25 − 24) = 24 + 8 = 32.', 'শর্টকাটে মিলিয়ে দেখো: 24 + 8 × (25 − 24) = 24 + 8 = 32।'),
        ],
      },
    },

    // 11 ─────────────────────────────────────────────
    {
      key: 'average_after_years',
      emoji: '🎂',
      name: t('Average age after (or before) some years', 'কিছু বছর পরে (বা আগে) গড় বয়স'),
      difficulty: 'intermediate',
      typicalWording: t('“The average age of a group is A now. What will it be after n years?” or the reverse: the later average is given, find the present one.”', '“একটি দলের গড় বয়স এখন A। n বছর পরে তা কত হবে?” অথবা উল্টোটা: পরের গড় দেওয়া, বর্তমান গড় নির্ণয় করো।”'),
      formula: t(r`After $k$ years, new average $=$ old average $+ k$; the total rises by $n \times k$ for $n$ people.`, r`$k$ বছর পরে নতুন গড় $=$ পুরোনো গড় $+ k$; $n$ জনের মোট বাড়ে $n \times k$।`),
      shortcut: t('Every member ages by the same k years, so the average itself simply moves by k — no totals are needed at all.', 'প্রতিটি সদস্যের বয়স একই k বছর বাড়ে, তাই গড় নিজেই শুধু k সরে যায় — মোট হিসাবের দরকারই নেই।'),
      trap: t('Adding k only once to the total instead of n × k, or moving the average by n × k instead of k.', 'মোটে শুধু একবার k যোগ করা n × k-এর বদলে, অথবা গড়কে k-এর বদলে n × k সরানো।'),
      spot: t(
        'An average **age** is given at one time and asked at another time — "after 5 years", "3 years ago" — with the same group of people.',
        'এক সময়ের গড় **বয়স** দেওয়া থাকে আর অন্য সময়েরটা জানতে চায় — "5 বছর পরে", "3 বছর আগে" — একই দলের লোকেদের জন্য।',
      ),
      method: [
        t('Check that the group is unchanged: the same people, nobody joins or leaves.', 'দল অপরিবর্তিত আছে কিনা দেখো: একই লোকজন, কেউ যোগ দেয়নি বা চলে যায়নি।'),
        t('Each person ages by k years, so the total age rises by n × k.', 'প্রতিজনের বয়স k বছর বাড়ে, তাই মোট বয়স বাড়ে n × k।'),
        t('So the average also rises by exactly k (or falls by k when going back in time).', 'তাই গড়ও ঠিক k বাড়ে (পিছনের সময়ে গেলে k কমে)।'),
      ],
      example: {
        question: t('The average age of the 5 members of a family is 32 years now. What will their average age be after 8 years?', 'একটি পরিবারের 5 জন সদস্যের গড় বয়স এখন 32 বছর। 8 বছর পরে তাদের গড় বয়স কত হবে?'),
        steps: [
          t('Total age now = 5 × 32 = 160 years.', 'এখন মোট বয়স = 5 × 32 = 160 বছর।'),
          t('In 8 years the total rises by 5 × 8 = 40, becoming 160 + 40 = 200 years.', '8 বছরে মোট বাড়বে 5 × 8 = 40, হয়ে যাবে 160 + 40 = 200 বছর।'),
          t('New average = 200 ÷ 5 = 40 years — exactly 8 more than 32.', 'নতুন গড় = 200 ÷ 5 = 40 বছর — 32-এর চেয়ে ঠিক 8 বেশি।'),
        ],
        answer: t('40 years', '40 বছর'),
      },
      tryIt: {
        question: t('After 3 years, the average age of 10 students will be 19 years. What is their average age now?', '3 বছর পরে 10 জন ছাত্রের গড় বয়স হবে 19 বছর। এখন তাদের গড় বয়স কত?'),
        options: [t('19 years', '19 বছর'), t('22 years', '22 বছর'), t('13 years', '13 বছর'), t('16 years', '16 বছর')],
        correct: 3,
        explanation: [
          t('Going back 3 years, every student was 3 years younger, so the average was 3 less.', '3 বছর পিছিয়ে গেলে প্রতিটি ছাত্র 3 বছর ছোট ছিল, তাই গড়ও 3 কম ছিল।'),
          t('Present average = 19 − 3 = 16 years.', 'বর্তমান গড় = 19 − 3 = 16 বছর।'),
          t('22 adds the 3 years instead of subtracting; 13 subtracts 3 twice over.', '22 হয় 3 বিয়োগের বদলে যোগ করলে; 13 হয় 3 দুবার বিয়োগ করলে।'),
        ],
      },
    },

    // 12 ─────────────────────────────────────────────
    {
      key: 'innings_average_batsman',
      emoji: '🏏',
      name: t('Batsman\'s average rises or falls after an innings', 'একটি ইনিংসের পর ব্যাটসম্যানের গড় বাড়ে বা কমে'),
      difficulty: 'advanced',
      typicalWording: t('“After scoring s runs in his nth innings, a batsman\'s average rises / falls by d. Find his new (or old) average.”', '“nতম ইনিংসে s রান করে এক ব্যাটসম্যানের গড় d বাড়ল / কমল। তাঁর নতুন (বা পুরোনো) গড় নির্ণয় করো।”'),
      formula: t(r`Let the old average be $x$ over $n-1$ innings: $(n-1)x + s = n(x \pm d)$; a not-out innings adds runs but does **not** add a dismissal.`, r`ধরো আগের $n-1$টি ইনিংসে গড় $x$: $(n-1)x + s = n(x \pm d)$; নট-আউট ইনিংসে রান যোগ হয় কিন্তু আউট হওয়ার সংখ্যা বাড়ে **না**।`),
      shortcut: t('New average = s − (n − 1) × d when the average rises by d: the new score must cover d extra for every earlier innings plus its own share.', 'গড় d বাড়লে নতুন গড় = s − (n − 1) × d: নতুন স্কোরকে আগের প্রতিটি ইনিংসের জন্য d করে বাড়তি আর নিজের অংশ জোগাতে হয়।'),
      trap: t('Counting a not-out innings as a dismissal: a batting average divides runs by times out, so a not-out innings leaves the divisor unchanged.', 'নট-আউট ইনিংসকে আউট হওয়া হিসেবে গোনা: ব্যাটিং গড়ে রানকে আউট হওয়ার সংখ্যা দিয়ে ভাগ করা হয়, তাই নট-আউট ইনিংসে ভাজক বদলায় না।'),
      spot: t(
        'A cricket score in the latest innings is given together with **how much the average rose or fell** — the old average itself is never stated.',
        'সর্বশেষ ইনিংসের রান দেওয়া থাকে **গড় কতটা বাড়ল বা কমল** তার সঙ্গে — পুরোনো গড় নিজে কখনও বলা থাকে না।',
      ),
      method: [
        t('Let the average before this innings be x, over n − 1 innings, so old runs = (n − 1)x.', 'এই ইনিংসের আগের গড় x ধরো, n − 1টি ইনিংসে, তাই পুরোনো রান = (n − 1)x।'),
        t('Add the new score and set the new total equal to n × (x ± change).', 'নতুন স্কোর যোগ করো এবং নতুন মোটকে n × (x ± পরিবর্তন)-এর সমান ধরো।'),
        t('Solve for x, then add or subtract the change to get the new average.', 'x বের করো, তারপর পরিবর্তন যোগ বা বিয়োগ করে নতুন গড় পাও।'),
        t('If the innings is not out, keep the number of dismissals unchanged when dividing.', 'ইনিংস নট-আউট হলে ভাগের সময় আউট হওয়ার সংখ্যা অপরিবর্তিত রাখো।'),
      ],
      example: {
        question: t('A batsman scores 90 runs in his 12th innings and his average rises by 5. Find his new average.', 'একজন ব্যাটসম্যান তাঁর 12তম ইনিংসে 90 রান করলেন এবং তাঁর গড় 5 বাড়ল। তাঁর নতুন গড় নির্ণয় করো।'),
        steps: [
          t('Let the old average over 11 innings be x, so old runs = 11x.', 'আগের 11টি ইনিংসে গড় x ধরো, তাই পুরোনো রান = 11x।'),
          t(r`New total: $11x + 90 = 12(x + 5) = 12x + 60$.`, r`নতুন মোট: $11x + 90 = 12(x + 5) = 12x + 60$।`),
          t(r`So $x = 90 - 60 = 30$, the old average.`, r`তাই $x = 90 - 60 = 30$, পুরোনো গড়।`),
          t('New average = 30 + 5 = 35. Check: (11 × 30 + 90) ÷ 12 = 420 ÷ 12 = 35.', 'নতুন গড় = 30 + 5 = 35। মিলিয়ে দেখো: (11 × 30 + 90) ÷ 12 = 420 ÷ 12 = 35।'),
        ],
        answer: t('35', 'নতুন গড় 35'),
      },
      tryIt: {
        question: t('A batsman was out in each of his first 10 innings and his average is 42. In his 11th innings he scores 78 and remains not out. What is his new batting average?', 'একজন ব্যাটসম্যান প্রথম 10টি ইনিংসের প্রতিটিতেই আউট হয়েছিলেন এবং তাঁর গড় 42। 11তম ইনিংসে তিনি 78 রান করে নট-আউট থাকলেন। তাঁর নতুন ব্যাটিং গড় কত?'),
        options: [t('45.27', '45.27'), t('49.8', '49.8'), t('48', '48'), t('42', '42')],
        correct: 1,
        explanation: [
          t('Runs so far = 10 × 42 = 420; after the new innings, runs = 420 + 78 = 498.', 'এখন পর্যন্ত রান = 10 × 42 = 420; নতুন ইনিংসের পর রান = 420 + 78 = 498।'),
          t('He was not out, so the dismissals stay at 10, not 11.', 'তিনি নট-আউট ছিলেন, তাই আউট হওয়ার সংখ্যা 10-ই থাকে, 11 নয়।'),
          t('New average = 498 ÷ 10 = 49.8. (45.27 wrongly divides by 11 innings.)', 'নতুন গড় = 498 ÷ 10 = 49.8। (45.27 হয় ভুল করে 11 ইনিংস দিয়ে ভাগ করলে।)'),
        ],
      },
    },

    // 13 ─────────────────────────────────────────────
    {
      key: 'subgroup_averages_find_one_group',
      emoji: '👥',
      name: t('Overall and one subgroup average given: find the other group', 'সামগ্রিক ও একটি উপদলের গড় দেওয়া: অন্য দলটি নির্ণয়'),
      difficulty: 'advanced',
      typicalWording: t('“The average of all N students is A. The average of n₁ of them (boys / girls / pass students) is a₁. Find the average of the rest.”', '“সব N জন ছাত্রের গড় A। তাদের n₁ জনের (ছেলে / মেয়ে / পাস করা ছাত্র) গড় a₁। বাকিদের গড় নির্ণয় করো।”'),
      formula: t(r`Other group average $= \frac{N \times A - n_1 \times a_1}{N - n_1}$.`, r`অন্য দলের গড় $= \frac{N \times A - n_1 \times a_1}{N - n_1}$।`),
      shortcut: t('The other group must balance the first group\'s surplus or deficit against the overall average, scaled by the size ratio n₁/(N − n₁).', 'অন্য দলকে সামগ্রিক গড়ের সাপেক্ষে প্রথম দলের উদ্বৃত্ত বা ঘাটতি পুষিয়ে দিতে হয়, আকারের অনুপাত n₁/(N − n₁) অনুযায়ী।'),
      trap: t('Dividing the leftover total by N or by n₁ instead of by the other group\'s own size, N − n₁.', 'অবশিষ্ট মোটকে অন্য দলের নিজের আকার N − n₁-এর বদলে N বা n₁ দিয়ে ভাগ করা।'),
      spot: t(
        'Three averages appear in one question: the **whole group**, one named **subgroup**, and the rest — whose average is the unknown.',
        'একটি প্রশ্নে তিনটি গড় আসে: **পুরো দল**, একটি নামকরা **উপদল**, আর বাকিরা — যাদের গড়ই অজানা।',
      ),
      method: [
        t('Overall total = N × overall average.', 'সামগ্রিক মোট = N × সামগ্রিক গড়।'),
        t('Known subgroup total = n₁ × its average.', 'জানা উপদলের মোট = n₁ × তার গড়।'),
        t('Other group total = overall total − subgroup total.', 'অন্য দলের মোট = সামগ্রিক মোট − উপদলের মোট।'),
        t('Divide by the other group\'s size, N − n₁.', 'অন্য দলের আকার N − n₁ দিয়ে ভাগ করো।'),
      ],
      example: {
        question: t('The average mark of 50 students is 58. The average mark of the 30 boys is 55. Find the average mark of the 20 girls.', '50 জন ছাত্রছাত্রীর গড় নম্বর 58। 30 জন ছেলের গড় নম্বর 55। 20 জন মেয়ের গড় নম্বর নির্ণয় করো।'),
        steps: [
          t('Overall total = 50 × 58 = 2900.', 'সামগ্রিক মোট = 50 × 58 = 2900।'),
          t('Boys total = 30 × 55 = 1650.', 'ছেলেদের মোট = 30 × 55 = 1650।'),
          t('Girls total = 2900 − 1650 = 1250.', 'মেয়েদের মোট = 2900 − 1650 = 1250।'),
          t('Girls average = 1250 ÷ 20 = 62.5.', 'মেয়েদের গড় = 1250 ÷ 20 = 62.5।'),
        ],
        answer: t('62.5', 'মেয়েদের গড় 62.5'),
      },
      tryIt: {
        question: t('The average weight of a class of 40 students is 65 kg. The 25 girls have an average weight of 68 kg. Find the average weight of the 15 boys.', '40 জন ছাত্রের একটি শ্রেণির গড় ওজন 65 kg। 25 জন মেয়ের গড় ওজন 68 kg। 15 জন ছেলের গড় ওজন নির্ণয় করো।'),
        options: [t('62 kg', '62 kg'), t('65 kg', '65 kg'), t('60 kg', '60 kg'), t('58 kg', '58 kg')],
        correct: 2,
        explanation: [
          t('Overall total = 40 × 65 = 2600; girls total = 25 × 68 = 1700.', 'সামগ্রিক মোট = 40 × 65 = 2600; মেয়েদের মোট = 25 × 68 = 1700।'),
          t('Boys total = 2600 − 1700 = 900.', 'ছেলেদের মোট = 2600 − 1700 = 900।'),
          t('Boys average = 900 ÷ 15 = 60 kg. (It must sit below 65, to balance the girls above 65.)', 'ছেলেদের গড় = 900 ÷ 15 = 60 kg। (65-এর ওপরে থাকা মেয়েদের ভারসাম্য রাখতে এটি 65-এর নিচেই থাকবে।)'),
        ],
      },
    },

    // 14 ─────────────────────────────────────────────
    {
      key: 'average_expenditure_split_period',
      emoji: '🧾',
      name: t('First days and last days overlap: find the middle day', 'প্রথম দিন ও শেষ দিন ওভারল্যাপ করলে: মাঝের দিনটি নির্ণয়'),
      difficulty: 'advanced',
      typicalWording: t('“The average expenditure for the first m days is A and for the last n days is B. The total for the whole period is given. Find the expenditure on the overlapping day.”', '“প্রথম m দিনের গড় খরচ A এবং শেষ n দিনের গড় খরচ B। পুরো সময়ের মোট দেওয়া আছে। ওভারল্যাপ করা দিনের খরচ নির্ণয় করো।”'),
      formula: t(r`Overlapping day $= m \times A + n \times B - \text{total for all } (m + n - 1) \text{ days}$.`, r`ওভারল্যাপ করা দিন $= m \times A + n \times B - \text{সব } (m + n - 1) \text{ দিনের মোট}$।`),
      shortcut: t('Add the two group totals and subtract the grand total — whatever is left was counted twice, and that is exactly the overlapping day.', 'দুটি দলের মোট যোগ করে সর্বমোট বিয়োগ করো — যা বাকি থাকে তা দুবার গোনা হয়েছে, আর সেটাই ওভারল্যাপ করা দিন।'),
      trap: t('Treating the period as m + n days: the two groups share exactly one day, so the whole period has m + n − 1 days.', 'সময়টিকে m + n দিন ধরা: দুটি দল ঠিক একটি দিন ভাগ করে, তাই পুরো সময় হয় m + n − 1 দিন।'),
      spot: t(
        'Averages are given for the **first** part and the **last** part of one period, the two parts **share one day**, and the grand total for the whole period is also given.',
        'একটি সময়ের **প্রথম** অংশ ও **শেষ** অংশের গড় দেওয়া থাকে, দুটি অংশ **একটি দিন ভাগ করে**, আর পুরো সময়ের সর্বমোটও দেওয়া থাকে।',
      ),
      method: [
        t('First part total = m × its average; last part total = n × its average.', 'প্রথম অংশের মোট = m × তার গড়; শেষ অংশের মোট = n × তার গড়।'),
        t('Add the two totals: the overlapping day is counted twice in this sum.', 'দুটি মোট যোগ করো: এই যোগফলে ওভারল্যাপ করা দিনটি দুবার গোনা হয়েছে।'),
        t('Subtract the grand total for the whole (m + n − 1)-day period.', 'পুরো (m + n − 1) দিনের সর্বমোট বিয়োগ করো।'),
        t('The remainder is the expenditure on the overlapping day alone.', 'যা বাকি থাকে তাই ওভারল্যাপ করা এক দিনের খরচ।'),
      ],
      example: {
        question: t('A man\'s average daily expenditure for the first 10 days of a 19-day trip is ₹80 and for the last 10 days is ₹90. His total expenditure on the trip is ₹1610. Find his expenditure on the 10th day.', '19 দিনের একটি ভ্রমণে এক ব্যক্তির প্রথম 10 দিনের গড় দৈনিক খরচ ₹80 এবং শেষ 10 দিনের গড় ₹90। ভ্রমণে তাঁর মোট খরচ ₹1610। 10তম দিনে তাঁর খরচ নির্ণয় করো।'),
        steps: [
          t('First 10 days total = 10 × 80 = ₹800; last 10 days total = 10 × 90 = ₹900.', 'প্রথম 10 দিনের মোট = 10 × 80 = ₹800; শেষ 10 দিনের মোট = 10 × 90 = ₹900।'),
          t('Adding them: 800 + 900 = ₹1700, in which the 10th day is counted twice (10 + 10 − 1 = 19 days).', 'যোগ করলে: 800 + 900 = ₹1700, যেখানে 10তম দিনটি দুবার গোনা হয়েছে (10 + 10 − 1 = 19 দিন)।'),
          t('10th day = 1700 − 1610 = ₹90.', '10তম দিন = 1700 − 1610 = ₹90।'),
        ],
        answer: t('₹90', '10তম দিনে খরচ ₹90'),
      },
      tryIt: {
        question: t('During a 15-day tour, a student\'s average daily expense for the first 8 days is ₹50 and for the last 8 days is ₹60. His total expense is ₹800. Find his expense on the 8th day.', '15 দিনের একটি ভ্রমণে এক ছাত্রের প্রথম 8 দিনের গড় দৈনিক খরচ ₹50 এবং শেষ 8 দিনের গড় ₹60। তার মোট খরচ ₹800। 8ম দিনে তার খরচ নির্ণয় করো।'),
        options: [t('₹70', '₹70'), t('₹55', '₹55'), t('₹100', '₹100'), t('₹80', '₹80')],
        correct: 3,
        explanation: [
          t('First 8 days total = 8 × 50 = ₹400; last 8 days total = 8 × 60 = ₹480.', 'প্রথম 8 দিনের মোট = 8 × 50 = ₹400; শেষ 8 দিনের মোট = 8 × 60 = ₹480।'),
          t('The two groups cover 8 + 8 − 1 = 15 days, with the 8th day counted twice.', 'দুটি দল মিলে 8 + 8 − 1 = 15 দিন, যেখানে 8ম দিনটি দুবার গোনা হয়েছে।'),
          t('8th day = 400 + 480 − 800 = ₹80.', '8ম দিন = 400 + 480 − 800 = ₹80।'),
        ],
      },
    },
  ],
  // Hard-bank pattern matrix (Advanced quizzes): see ./hard/average.js.
  registry: require('./hard/average'),
};
