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
  ],
};
