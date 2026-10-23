'use strict';

// Question patterns: Mensuration. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'mensuration',
  patterns: [
    {
      key: 'rectangle_fencing',
      emoji: '🟩',
      name: t('Rectangle: fencing (perimeter) or flooring (area)', 'আয়তক্ষেত্র: বেড়া (পরিসীমা) বা মেঝে (ক্ষেত্রফল)'),
      spot: t(
        'A rectangular field, garden or room with a **cost per metre** (fencing → perimeter) or **cost per square metre** (flooring, grass → area).',
        'আয়তাকার মাঠ, বাগান বা ঘর, সঙ্গে **প্রতি মিটারে খরচ** (বেড়া → পরিসীমা) বা **প্রতি বর্গমিটারে খরচ** (মেঝে, ঘাস → ক্ষেত্রফল)।',
      ),
      method: [
        t('Decide: "per metre" → perimeter; "per square metre" → area.', 'ঠিক করো: "প্রতি মিটার" → পরিসীমা; "প্রতি বর্গমিটার" → ক্ষেত্রফল।'),
        t(r`Perimeter $= 2(l + b)$; area $= l \times b$.`, r`পরিসীমা $= 2(l + b)$; ক্ষেত্রফল $= l \times b$।`),
        t('Cost = perimeter (or area) × rate.', 'খরচ = পরিসীমা (বা ক্ষেত্রফল) × দর।'),
      ],
      example: {
        question: t(
          'A rectangular field is 40 m long and 25 m wide. Find the cost of fencing it at ₹15 per metre.',
          'একটি আয়তাকার মাঠের দৈর্ঘ্য 40 মিটার ও প্রস্থ 25 মিটার। প্রতি মিটার ₹15 দরে মাঠটি বেড়া দিয়ে ঘিরতে কত খরচ হবে?',
        ),
        steps: [
          t('Fencing goes around the field, so we need the perimeter.', 'বেড়া মাঠের চারদিক ঘিরে দেয়, তাই পরিসীমা লাগবে।'),
          t(r`Perimeter $= 2(40 + 25) = 130$ m.`, r`পরিসীমা $= 2(40 + 25) = 130$ মিটার।`),
          t(r`Cost $= 130 \times 15 = 1950$ rupees.`, r`খরচ $= 130 \times 15 = 1950$ টাকা।`),
        ],
        answer: t('₹1950', '1950 টাকা'),
      },
      tryIt: {
        question: t(
          'A rectangular garden is 36 m long and 24 m wide. What is the cost (in ₹) of fencing it at ₹12 per metre?',
          'একটি আয়তাকার বাগানের দৈর্ঘ্য 36 মিটার ও প্রস্থ 24 মিটার। প্রতি মিটার ₹12 দরে বেড়া দিতে কত টাকা খরচ হবে?',
        ),
        options: [t('720', '720'), t('1440', '1440'), t('10368', '10368'), t('864', '864')],
        correct: 1,
        explanation: [
          t(r`Perimeter $= 2(36 + 24) = 120$ m.`, r`পরিসীমা $= 2(36 + 24) = 120$ মিটার।`),
          t(r`Cost $= 120 \times 12 = 1440$ rupees. (Using the area $864$ is wrong for fencing; forgetting the 2 gives 720.)`, r`খরচ $= 120 \times 12 = 1440$ টাকা। (বেড়ার জন্য ক্ষেত্রফল $864$ নেওয়া ভুল; 2 দিয়ে গুণ করতে ভুললে 720 আসে।)`),
        ],
      },
    },
    {
      key: 'triangle_heron',
      emoji: '🔺',
      name: t("Triangle with three sides (Heron's formula)", 'তিন বাহু জানা ত্রিভুজ (হেরনের সূত্র)'),
      spot: t(
        'All **three sides** of a triangle are given, but no height. The area is asked.',
        'ত্রিভুজের **তিনটি বাহুই** দেওয়া, কিন্তু উচ্চতা নেই। ক্ষেত্রফল জানতে চাওয়া হয়।',
      ),
      method: [
        t(r`Half-perimeter $s = \frac{a + b + c}{2}$.`, r`অর্ধপরিসীমা $s = \frac{a + b + c}{2}$।`),
        t(r`Find $s - a$, $s - b$, $s - c$.`, r`$s - a$, $s - b$, $s - c$ বের করো।`),
        t(r`Area $= \sqrt{s(s - a)(s - b)(s - c)}$.`, r`ক্ষেত্রফল $= \sqrt{s(s - a)(s - b)(s - c)}$।`),
      ],
      example: {
        question: t(
          'Find the area of a triangle whose sides are 13 cm, 14 cm and 15 cm.',
          'একটি ত্রিভুজের বাহুগুলো 13 cm, 14 cm ও 15 cm। ত্রিভুজটির ক্ষেত্রফল নির্ণয় করো।',
        ),
        steps: [
          t(r`$s = \frac{13 + 14 + 15}{2} = 21$.`, r`অর্ধপরিসীমা $s = \frac{13 + 14 + 15}{2} = 21$।`),
          t(r`$s - a = 8$, $s - b = 7$, $s - c = 6$.`, r`এখন $s - a = 8$, $s - b = 7$, $s - c = 6$।`),
          t(r`Area $= \sqrt{21 \times 8 \times 7 \times 6} = \sqrt{7056} = 84$ cm².`, r`ক্ষেত্রফল $= \sqrt{21 \times 8 \times 7 \times 6} = \sqrt{7056} = 84$ বর্গ cm।`),
        ],
        answer: t('84 cm²', '84 বর্গ cm'),
      },
      tryIt: {
        question: t(
          'The sides of a triangle are 11 cm, 13 cm and 20 cm. What is its area in cm²?',
          'একটি ত্রিভুজের বাহুগুলো 11 cm, 13 cm ও 20 cm। এর ক্ষেত্রফল কত বর্গ cm?',
        ),
        options: [t('71.5', '71.5'), t('66', '66'), t('44', '44'), t('132', '132')],
        correct: 1,
        explanation: [
          t(r`$s = \frac{11 + 13 + 20}{2} = 22$; $s - a = 11$, $s - b = 9$, $s - c = 2$.`, r`অর্ধপরিসীমা $s = \frac{11 + 13 + 20}{2} = 22$; $s - a = 11$, $s - b = 9$, $s - c = 2$।`),
          t(r`Area $= \sqrt{22 \times 11 \times 9 \times 2} = \sqrt{4356} = 66$ cm².`, r`ক্ষেত্রফল $= \sqrt{22 \times 11 \times 9 \times 2} = \sqrt{4356} = 66$ বর্গ cm।`),
          t(r`(71.5 comes from wrongly using $\frac{1}{2} \times 11 \times 13$; that works only for a right angle between those sides.)`, r`(ভুল করে $\frac{1}{2} \times 11 \times 13$ নিলে 71.5 আসে; ওই দুই বাহুর মধ্যে সমকোণ থাকলে তবেই এটা চলে।)`),
        ],
      },
    },
    {
      key: 'circle_wheel',
      emoji: '🛞',
      name: t('Circle: wheel revolutions', 'বৃত্ত: চাকার ঘূর্ণন সংখ্যা'),
      spot: t(
        'A **wheel** of given radius or diameter covers some distance; the number of **revolutions (turns)** is asked.',
        'নির্দিষ্ট ব্যাসার্ধ বা ব্যাসের একটি **চাকা** কিছু দূরত্ব যায়; কতবার **ঘোরে (পাক খায়)** তা জানতে চাওয়া হয়।',
      ),
      method: [
        t(r`One turn covers the circumference: $2\pi r$ (take $\pi = \frac{22}{7}$).`, r`এক পাকে চাকা পরিধির সমান দূরত্ব যায়: $2\pi r$ ($\pi = \frac{22}{7}$ ধরো)।`),
        t('Make units the same (1 m = 100 cm, 1 km = 1000 m).', 'একক একই করো (1 m = 100 cm, 1 km = 1000 m)।'),
        t('Revolutions = total distance ÷ circumference.', 'ঘূর্ণন সংখ্যা = মোট দূরত্ব ÷ পরিধি।'),
      ],
      example: {
        question: t(
          'The radius of a wheel is 35 cm. How many revolutions will it make to cover 1.1 km?',
          'একটি চাকার ব্যাসার্ধ 35 cm। 1.1 km যেতে চাকাটি কতবার ঘুরবে?',
        ),
        steps: [
          t(r`Circumference $= 2 \times \frac{22}{7} \times 35 = 220$ cm $= 2.2$ m.`, r`পরিধি $= 2 \times \frac{22}{7} \times 35 = 220$ cm $= 2.2$ m।`),
          t(r`Distance $= 1.1$ km $= 1100$ m.`, r`দূরত্ব $= 1.1$ km $= 1100$ m।`),
          t(r`Revolutions $= 1100 \div 2.2 = 500$.`, r`ঘূর্ণন সংখ্যা $= 1100 \div 2.2 = 500$।`),
        ],
        answer: t('500 revolutions', '500 বার'),
      },
      tryIt: {
        question: t(
          'A wheel has a radius of 21 cm. How many revolutions will it make in covering 264 m?',
          'একটি চাকার ব্যাসার্ধ 21 cm। 264 m যেতে চাকাটি কতবার ঘুরবে?',
        ),
        options: [t('100', '100'), t('200', '200'), t('400', '400'), t('2', '2')],
        correct: 1,
        explanation: [
          t(r`Circumference $= 2 \times \frac{22}{7} \times 21 = 132$ cm.`, r`পরিধি $= 2 \times \frac{22}{7} \times 21 = 132$ cm।`),
          t(r`Distance $= 264$ m $= 26400$ cm, so revolutions $= 26400 \div 132 = 200$.`, r`দূরত্ব $= 264$ m $= 26400$ cm, তাই ঘূর্ণন $= 26400 \div 132 = 200$।`),
          t('(Forgetting to change m to cm gives 2; taking 21 as the diameter gives 400.)', '(m-কে cm-এ না বদলালে 2 আসে; 21-কে ব্যাস ধরলে 400 আসে।)'),
        ],
      },
    },
    {
      key: 'cuboid_surface',
      emoji: '📦',
      name: t('Cuboid: volume and surface area', 'আয়তঘন: আয়তন ও তলের ক্ষেত্রফল'),
      spot: t(
        'A box, room, tank or brick with **length, breadth and height**: "how much it holds" (volume) or "area to paint/cover" (surface area).',
        '**দৈর্ঘ্য, প্রস্থ ও উচ্চতা** দেওয়া বাক্স, ঘর, ট্যাঙ্ক বা ইট: "কতটা ধরে" (আয়তন) বা "কতটা রং/ঢাকতে হবে" (তলের ক্ষেত্রফল)।',
      ),
      method: [
        t(r`Volume $= l \times b \times h$.`, r`আয়তন $= l \times b \times h$।`),
        t(r`Total surface area $= 2(lb + bh + hl)$ (all 6 faces).`, r`সমগ্র তলের ক্ষেত্রফল $= 2(lb + bh + hl)$ (6টি তলই)।`),
        t(r`Four walls only (no floor or roof) $= 2(l + b) \times h$.`, r`শুধু চার দেয়াল (মেঝে ও ছাদ বাদে) $= 2(l + b) \times h$।`),
      ],
      example: {
        question: t(
          'A box is 12 cm long, 8 cm wide and 5 cm high. Find its volume and its total surface area.',
          'একটি বাক্সের দৈর্ঘ্য 12 cm, প্রস্থ 8 cm ও উচ্চতা 5 cm। এর আয়তন ও সমগ্র তলের ক্ষেত্রফল নির্ণয় করো।',
        ),
        steps: [
          t(r`Volume $= 12 \times 8 \times 5 = 480$ cm³.`, r`আয়তন $= 12 \times 8 \times 5 = 480$ ঘন cm।`),
          t(r`$lb = 96$, $bh = 40$, $hl = 60$.`, r`এখানে $lb = 96$, $bh = 40$, $hl = 60$।`),
          t(r`Total surface area $= 2(96 + 40 + 60) = 2 \times 196 = 392$ cm².`, r`সমগ্র তলের ক্ষেত্রফল $= 2(96 + 40 + 60) = 2 \times 196 = 392$ বর্গ cm।`),
        ],
        answer: t('Volume 480 cm³, surface area 392 cm²', 'আয়তন 480 ঘন cm, তলের ক্ষেত্রফল 392 বর্গ cm'),
      },
      tryIt: {
        question: t(
          'Find the total surface area (in cm²) of a cuboid measuring 10 cm × 6 cm × 4 cm.',
          '10 cm × 6 cm × 4 cm মাপের একটি আয়তঘনের সমগ্র তলের ক্ষেত্রফল (বর্গ cm-এ) নির্ণয় করো।',
        ),
        options: [t('240', '240'), t('124', '124'), t('248', '248'), t('128', '128')],
        correct: 2,
        explanation: [
          t(r`$lb = 60$, $bh = 24$, $hl = 40$; sum $= 124$.`, r`$lb = 60$, $bh = 24$, $hl = 40$; যোগফল $= 124$।`),
          t(r`Total surface area $= 2 \times 124 = 248$ cm². (240 is the volume; 124 forgets the 2.)`, r`সমগ্র তলের ক্ষেত্রফল $= 2 \times 124 = 248$ বর্গ cm। (240 হল আয়তন; 124 এলে 2 দিয়ে গুণ করতে ভুলেছ।)`),
        ],
      },
    },
    {
      key: 'cylinder_cone_sphere',
      emoji: '🥫',
      name: t('Cylinder, cone and sphere volume', 'বেলন, শঙ্কু ও গোলকের আয়তন'),
      spot: t(
        'Round solids: a **cylinder** (pipe, tin, well), a **cone** (ice-cream cone, heap of grain) or a **sphere** (ball).',
        'গোল ঘনবস্তু: **বেলন** (পাইপ, টিন, কুয়ো), **শঙ্কু** (আইসক্রিমের কোন, শস্যের স্তূপ) বা **গোলক** (বল)।',
      ),
      method: [
        t(r`Cylinder: $V = \pi r^2 h$.`, r`বেলন: $V = \pi r^2 h$।`),
        t(r`Cone: $V = \frac{1}{3}\pi r^2 h$ (one-third of the cylinder with the same base and height).`, r`শঙ্কু: $V = \frac{1}{3}\pi r^2 h$ (একই ভূমি ও উচ্চতার বেলনের তিন ভাগের এক ভাগ)।`),
        t(r`Sphere: $V = \frac{4}{3}\pi r^3$. Take $\pi = \frac{22}{7}$ when $r$ is a multiple of 7.`, r`গোলক: $V = \frac{4}{3}\pi r^3$। $r$ যদি 7-এর গুণিতক হয়, $\pi = \frac{22}{7}$ ধরো।`),
      ],
      example: {
        question: t(
          'Find the volume of a cylinder with radius 7 cm and height 10 cm.',
          '7 cm ব্যাসার্ধ ও 10 cm উচ্চতার একটি বেলনের আয়তন নির্ণয় করো।',
        ),
        steps: [
          t(r`$V = \pi r^2 h = \frac{22}{7} \times 7 \times 7 \times 10$.`, r`আয়তন $= \pi r^2 h = \frac{22}{7} \times 7 \times 7 \times 10$।`),
          t(r`$= 22 \times 7 \times 10 = 1540$ cm³.`, r`অর্থাৎ $22 \times 7 \times 10 = 1540$ ঘন cm।`),
        ],
        answer: t('1540 cm³', '1540 ঘন cm'),
      },
      tryIt: {
        question: t(
          'A cone has a base radius of 7 cm and a height of 12 cm. What is its volume in cm³?',
          'একটি শঙ্কুর ভূমির ব্যাসার্ধ 7 cm এবং উচ্চতা 12 cm। এর আয়তন কত ঘন cm?',
        ),
        options: [t('1848', '1848'), t('616', '616'), t('88', '88'), t('924', '924')],
        correct: 1,
        explanation: [
          t(r`$V = \frac{1}{3} \times \frac{22}{7} \times 7 \times 7 \times 12$.`, r`আয়তন $= \frac{1}{3} \times \frac{22}{7} \times 7 \times 7 \times 12$।`),
          t(r`$= 22 \times 7 \times 4 = 616$ cm³. (Forgetting the $\frac{1}{3}$ gives 1848, the cylinder's volume.)`, r`অর্থাৎ $22 \times 7 \times 4 = 616$ ঘন cm। ($\frac{1}{3}$ বাদ দিলে 1848 আসে, যা বেলনের আয়তন।)`),
        ],
      },
    },
  ],
};
