'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'reasoning',
  topic: 'direction_sense',
  patterns: [
    {
      key: 'final_direction_after_turns',
      emoji: '🧭',
      name: t(`Final direction after turns`, `কয়েকবার ঘোরার পর শেষ দিক`),
      spot: t(
        `Someone faces a direction and then turns left / right a few times. The question asks which way he is facing now.`,
        `কেউ একটা দিকে মুখ করে আছে, তারপর কয়েকবার বাঁয়ে / ডানে ঘোরে। প্রশ্ন: এখন সে কোন দিকে মুখ করে আছে?`,
      ),
      method: [
        t(`Remember the clock order N → E → S → W → N.`, `ঘড়ির কাঁটার ক্রম মনে রাখো: উত্তর (N) → পূর্ব (E) → দক্ষিণ (S) → পশ্চিম (W) → উত্তর।`),
        t(`A right turn moves one step forward in this order (clockwise); a left turn moves one step back.`, `ডানে ঘোরা মানে এই ক্রমে এক ধাপ সামনে (ঘড়ির কাঁটার দিকে); বাঁয়ে ঘোরা মানে এক ধাপ পিছনে।`),
        t(`Do the turns one by one and write the new direction each time.`, `একটা করে ঘোরা ধরো আর প্রতিবার নতুন দিকটা লিখে রাখো।`),
      ],
      example: {
        question: t(`Ram is facing North. He turns right, then right again, then left. Which direction is he facing now?`, `রাম উত্তর দিকে মুখ করে আছে। সে ডানে ঘোরে, আবার ডানে, তারপর বাঁয়ে। এখন সে কোন দিকে মুখ করে আছে?`),
        steps: [
          t(`North → right → East.`, `উত্তর → ডানে → পূর্ব।`),
          t(`East → right → South.`, `পূর্ব → ডানে → দক্ষিণ।`),
          t(`South → left → East.`, `দক্ষিণ → বাঁয়ে → পূর্ব।`),
        ],
        answer: t(`East`, `উত্তর: পূর্ব`),
      },
      tryIt: {
        question: t(`Sita is facing East. She turns left, then left again, then right. Which direction is she facing now?`, `সীতা পূর্ব দিকে মুখ করে আছে। সে বাঁয়ে ঘোরে, আবার বাঁয়ে, তারপর ডানে। এখন সে কোন দিকে মুখ করে আছে?`),
        options: [t('South', 'দক্ষিণ'), t('North', 'উত্তর'), t('East', 'পূর্ব'), t('West', 'পশ্চিম')],
        correct: 1,
        explanation: [
          t(`East → left → North, then North → left → West.`, `পূর্ব → বাঁয়ে → উত্তর, তারপর উত্তর → বাঁয়ে → পশ্চিম।`),
          t(`West → right → North.`, `পশ্চিম → ডানে → উত্তর।`),
        ],
      },
    },
    {
      key: 'net_distance_on_axes',
      emoji: '📏',
      name: t(`Net distance (walks that cancel out)`, `মোট দূরত্ব (উল্টো দিকের হাঁটা কাটাকাটি)`),
      spot: t(
        `A person walks several distances in different directions, and some walks go back the opposite way (East then West, North then South).`,
        `কেউ বিভিন্ন দিকে কয়েক বার হাঁটে, আর কিছু হাঁটা উল্টো দিকে ফিরে আসে (পূর্বে তারপর পশ্চিমে, উত্তরে তারপর দক্ষিণে)।`,
      ),
      method: [
        t(`Make two totals: North–South and East–West.`, `দুটো হিসাব করো: উত্তর–দক্ষিণ আর পূর্ব–পশ্চিম।`),
        t(`North walks minus South walks gives the net North (or South) distance. Do the same for East and West.`, `উত্তরের হাঁটা থেকে দক্ষিণের হাঁটা বাদ দিলে মোট উত্তর (বা দক্ষিণ) দূরত্ব পাবে। পূর্ব-পশ্চিমেও তাই করো।`),
        t(`If one total is zero, the answer is simply the other total and its direction.`, `একটা হিসাব শূন্য হলে উত্তর হল অন্য হিসাবটা আর তার দিক।`),
      ],
      example: {
        question: t(
          `A man walks 6 km East, then 4 km North, then 6 km West. How far is he from the start, and in which direction?`,
          `একজন লোক 6 কিমি পূর্বে, তারপর 4 কিমি উত্তরে, তারপর 6 কিমি পশ্চিমে হাঁটে। সে শুরুর জায়গা থেকে কত দূরে, কোন দিকে?`,
        ),
        steps: [
          t(`East–West: 6 East − 6 West = 0.`, `পূর্ব–পশ্চিম: 6 পূর্ব − 6 পশ্চিম = 0।`),
          t(`North–South: 4 km North.`, `উত্তর–দক্ষিণ: 4 কিমি উত্তর।`),
        ],
        answer: t(`4 km North`, `উত্তর: 4 কিমি উত্তরে`),
      },
      tryIt: {
        question: t(
          `Rahul walks 8 km South, then 5 km East, then 3 km North, then 5 km West. How far is he from the start, and in which direction?`,
          `রাহুল 8 কিমি দক্ষিণে, তারপর 5 কিমি পূর্বে, তারপর 3 কিমি উত্তরে, তারপর 5 কিমি পশ্চিমে হাঁটে। সে শুরুর জায়গা থেকে কত দূরে, কোন দিকে?`,
        ),
        options: [t('11 km South', '11 কিমি দক্ষিণে'), t('5 km North', '5 কিমি উত্তরে'), t('3 km South', '3 কিমি দক্ষিণে'), t('5 km South', '5 কিমি দক্ষিণে')],
        correct: 3,
        explanation: [
          t(`East–West: 5 East − 5 West = 0.`, `পূর্ব–পশ্চিম: 5 পূর্ব − 5 পশ্চিম = 0।`),
          t(`North–South: 8 South − 3 North = 5 km South.`, `উত্তর–দক্ষিণ: 8 দক্ষিণ − 3 উত্তর = 5 কিমি দক্ষিণ।`),
          t(`So he is 5 km South of the start. (11 km comes from adding instead of subtracting.)`, `তাই সে শুরু থেকে 5 কিমি দক্ষিণে। (বাদ না দিয়ে যোগ করলে 11 কিমি আসে।)`),
        ],
      },
    },
    {
      key: 'shortest_distance_pythagoras',
      emoji: '📐',
      name: t(`Shortest distance (Pythagoras)`, `সবচেয়ে কম দূরত্ব (পিথাগোরাস)`),
      spot: t(
        `The question asks for the "shortest distance" or "straight-line distance" from the start, and the walk has both a North–South and an East–West part.`,
        `প্রশ্নে শুরু থেকে "সবচেয়ে কম দূরত্ব" বা "সোজাসুজি দূরত্ব" চাওয়া হয়, আর হাঁটায় উত্তর–দক্ষিণ ও পূর্ব–পশ্চিম দুটো অংশই থাকে।`,
      ),
      method: [
        t(`Draw the path and work out the net North–South distance and the net East–West distance.`, `পথটা এঁকে মোট উত্তর–দক্ষিণ দূরত্ব আর মোট পূর্ব–পশ্চিম দূরত্ব বের করো।`),
        t(`These two are the sides of a right-angled triangle; the shortest distance is the long side: $\\sqrt{a^2 + b^2}$.`, `এই দুটি একটি সমকোণী ত্রিভুজের দুই বাহু; সবচেয়ে কম দূরত্ব হল অতিভুজ: $\\sqrt{a^2 + b^2}$।`),
        t(`Know the common triples: 3-4-5, 6-8-10, 5-12-13, 8-15-17.`, `চেনা ত্রয়ীগুলি মনে রাখো: 3-4-5, 6-8-10, 5-12-13, 8-15-17।`),
      ],
      example: {
        question: t(`Mina walks 3 km East and then 4 km North. What is the shortest distance between her and the starting point?`, `মিনা 3 কিমি পূর্বে তারপর 4 কিমি উত্তরে হাঁটে। শুরুর জায়গা থেকে তার সবচেয়ে কম দূরত্ব কত?`),
        steps: [
          t(`The two sides are 3 km (East) and 4 km (North), at a right angle.`, `দুই বাহু 3 কিমি (পূর্ব) আর 4 কিমি (উত্তর), সমকোণে।`),
          t(`Shortest distance = $\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$ km.`, `সবচেয়ে কম দূরত্ব = $\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$ কিমি।`),
        ],
        answer: t(`5 km`, `উত্তর: 5 কিমি`),
      },
      tryIt: {
        question: t(
          `Ajay walks 10 m North, turns right and walks 8 m, then turns right again and walks 4 m. What is the shortest distance between him and the starting point?`,
          `অজয় 10 মিটার উত্তরে হাঁটে, ডানে ঘুরে 8 মিটার হাঁটে, তারপর আবার ডানে ঘুরে 4 মিটার হাঁটে। শুরুর জায়গা থেকে তার সবচেয়ে কম দূরত্ব কত?`,
        ),
        options: [t('10 m', '10 মিটার'), t('14 m', '14 মিটার'), t('22 m', '22 মিটার'), t('12 m', '12 মিটার')],
        correct: 0,
        explanation: [
          t(`North → right = East (8 m), East → right = South (4 m).`, `উত্তর → ডানে = পূর্ব (8 মিটার), পূর্ব → ডানে = দক্ষিণ (4 মিটার)।`),
          t(`Net North = 10 − 4 = 6 m; net East = 8 m.`, `মোট উত্তর = 10 − 4 = 6 মিটার; মোট পূর্ব = 8 মিটার।`),
          t(`Shortest distance = $\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$ m. (22 m is the total walked, 14 m is 6 + 8.)`, `সবচেয়ে কম দূরত্ব = $\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$ মিটার। (22 মিটার হল মোট হাঁটা পথ, 14 মিটার হল 6 + 8।)`),
        ],
      },
    },
    {
      key: 'direction_from_start',
      emoji: '📍',
      name: t(`Direction from the starting point (NE, SW ...)`, `শুরুর জায়গা থেকে দিক (উত্তর-পূর্ব, দক্ষিণ-পশ্চিম ...)`),
      spot: t(
        `"In which direction is he now from the starting point?" or the reverse "In which direction is the starting point from him?" The answer is often a corner direction like North-East.`,
        `"শুরুর জায়গা থেকে সে এখন কোন দিকে?" বা উল্টোটা "তার থেকে শুরুর জায়গা কোন দিকে?" উত্তর প্রায়ই কোণের দিক, যেমন উত্তর-পূর্ব।`,
      ),
      method: [
        t(`Draw the path starting from a dot S and find the end point E.`, `একটা বিন্দু S থেকে পথটা আঁকো আর শেষ বিন্দু E বের করো।`),
        t(`If E is up and to the right of S, E is North-East of S; mix the two directions in the same way for other corners.`, `E যদি S-এর উপরে আর ডানে হয়, তবে E হল S-এর উত্তর-পূর্বে; অন্য কোণের জন্যও একইভাবে দুই দিক মেশাও।`),
        t(`Read the question carefully: "S from E" is the exact opposite of "E from S" (NE ↔ SW, NW ↔ SE).`, `প্রশ্নটা মন দিয়ে পড়ো: "E থেকে S" হল "S থেকে E"-এর ঠিক উল্টো (উত্তর-পূর্ব ↔ দক্ষিণ-পশ্চিম, উত্তর-পশ্চিম ↔ দক্ষিণ-পূর্ব)।`),
      ],
      example: {
        question: t(
          `Ravi walks 4 km North, then turns right and walks 4 km. In which direction is the starting point from him now?`,
          `রবি 4 কিমি উত্তরে হাঁটে, তারপর ডানে ঘুরে 4 কিমি হাঁটে। এখন তার থেকে শুরুর জায়গা কোন দিকে?`,
        ),
        steps: [
          t(`North → right = East, so he ends up North and East of the start: he is North-East of the start.`, `উত্তর → ডানে = পূর্ব, তাই সে শুরুর জায়গার উত্তরে ও পূর্বে: সে শুরুর উত্তর-পূর্বে আছে।`),
          t(`The question asks the opposite (the start from him), so take the opposite of North-East.`, `প্রশ্নে উল্টোটা চাওয়া হয়েছে (তার থেকে শুরুর জায়গা), তাই উত্তর-পূর্বের উল্টো নাও।`),
        ],
        answer: t(`South-West`, `উত্তর: দক্ষিণ-পশ্চিম`),
      },
      tryIt: {
        question: t(
          `Mohan walks 6 km South, then turns left and walks 6 km. In which direction is he now from his starting point?`,
          `মোহন 6 কিমি দক্ষিণে হাঁটে, তারপর বাঁয়ে ঘুরে 6 কিমি হাঁটে। এখন সে শুরুর জায়গা থেকে কোন দিকে?`,
        ),
        options: [t('South-West', 'দক্ষিণ-পশ্চিম'), t('North-West', 'উত্তর-পশ্চিম'), t('North-East', 'উত্তর-পূর্ব'), t('South-East', 'দক্ষিণ-পূর্ব')],
        correct: 3,
        explanation: [
          t(`Facing South, a left turn makes him face East.`, `দক্ষিণ দিকে মুখ করে বাঁয়ে ঘুরলে মুখ হয় পূর্ব দিকে।`),
          t(`He is 6 km South and 6 km East of the start, so he is South-East of it.`, `সে শুরু থেকে 6 কিমি দক্ষিণে আর 6 কিমি পূর্বে, তাই সে শুরুর দক্ষিণ-পূর্বে।`),
          t(`South-West comes from turning the wrong way; North-West is the start seen from him.`, `ভুল দিকে ঘুরলে দক্ষিণ-পশ্চিম আসে; উত্তর-পশ্চিম হল তার থেকে শুরুর জায়গার দিক।`),
        ],
      },
    },
    {
      key: 'shadow_direction',
      emoji: '🌅',
      name: t(`Shadow and sunrise questions`, `ছায়া ও সূর্যের প্রশ্ন`),
      spot: t(
        `The question mentions morning, evening, sunrise, sunset or a person's shadow falling to the left / right / behind.`,
        `প্রশ্নে সকাল, বিকেল/সন্ধ্যা, সূর্যোদয়, সূর্যাস্ত বা কারও ছায়া বাঁয়ে / ডানে / পিছনে পড়ার কথা থাকে।`,
      ),
      method: [
        t(`Morning: the sun is in the East, so shadows fall towards the **West**.`, `সকাল: সূর্য পূর্বে, তাই ছায়া পড়ে **পশ্চিমে**।`),
        t(`Evening: the sun is in the West, so shadows fall towards the **East**. (At noon in India there is almost no side shadow.)`, `বিকেল/সন্ধ্যা: সূর্য পশ্চিমে, তাই ছায়া পড়ে **পূর্বে**। (ভারতে দুপুরে পাশে প্রায় ছায়াই পড়ে না।)`),
        t(`Use the shadow's side (left / right) to find which way the person faces, then answer the question.`, `ছায়া কোন পাশে (বাঁ / ডান) পড়েছে তা দেখে বের করো লোকটি কোন দিকে মুখ করে আছে, তারপর প্রশ্নের উত্তর দাও।`),
      ],
      example: {
        question: t(`One evening, Suman was walking and his shadow fell to his left. In which direction was he walking?`, `এক বিকেলে সুমন হাঁটছিল আর তার ছায়া পড়েছিল তার বাঁ দিকে। সে কোন দিকে হাঁটছিল?`),
        steps: [
          t(`Evening: the sun is in the West, so the shadow points East.`, `বিকেল: সূর্য পশ্চিমে, তাই ছায়া পূর্ব দিকে।`),
          t(`The shadow is on his left, so his left hand points East.`, `ছায়া তার বাঁ দিকে, অর্থাৎ তার বাঁ হাত পূর্ব দিকে।`),
          t(`If your left hand points East, you are facing South.`, `বাঁ হাত পূর্ব দিকে থাকলে মুখ থাকে দক্ষিণ দিকে।`),
        ],
        answer: t(`South`, `উত্তর: দক্ষিণ`),
      },
      tryIt: {
        question: t(
          `One morning after sunrise, Anil and Bina were standing face to face, talking. Anil's shadow fell exactly to his right. Which direction was Bina facing?`,
          `এক সকালে সূর্যোদয়ের পর অনিল আর বীণা মুখোমুখি দাঁড়িয়ে কথা বলছিল। অনিলের ছায়া ঠিক তার ডান দিকে পড়েছিল। বীণা কোন দিকে মুখ করে ছিল?`,
        ),
        options: [t('South', 'দক্ষিণ'), t('East', 'পূর্ব'), t('North', 'উত্তর'), t('West', 'পশ্চিম')],
        correct: 2,
        explanation: [
          t(`Morning: the sun is in the East, so shadows fall to the West. Anil's right hand points West.`, `সকাল: সূর্য পূর্বে, তাই ছায়া পশ্চিমে। অনিলের ডান হাত পশ্চিম দিকে।`),
          t(`If your right hand points West, you are facing South. So Anil faces South.`, `ডান হাত পশ্চিমে থাকলে মুখ থাকে দক্ষিণে। তাই অনিল দক্ষিণ দিকে মুখ করে আছে।`),
          t(`Bina faces Anil, so she faces the opposite way: North. (South is Anil's direction, not Bina's.)`, `বীণা অনিলের মুখোমুখি, তাই তার মুখ উল্টো দিকে: উত্তর। (দক্ষিণ হল অনিলের দিক, বীণার নয়।)`),
        ],
      },
    },
  ],
};
