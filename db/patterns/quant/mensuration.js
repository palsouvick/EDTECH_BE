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
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“Find the cost of fencing / levelling / carpeting a rectangular field of length l and breadth b.”', '“দৈর্ঘ্য l ও প্রস্থ b-এর আয়তাকার মাঠে বেড়া দেওয়ার / সমান করার / কার্পেট বিছানোর খরচ নির্ণয় করো।”'),
      formula: t(r`Perimeter $= 2(l + b)$; area $= l \times b$; cost $=$ measure $\times$ rate.`, r`পরিসীমা $= 2(l + b)$; ক্ষেত্রফল $= l \times b$; খরচ $=$ পরিমাপ $\times$ দর।`),
      shortcut: t('Read the rate unit first: per metre means perimeter, per square metre means area — that one word picks the formula.', 'আগে দরের একক দেখো: প্রতি মিটার হলে পরিসীমা, প্রতি বর্গমিটার হলে ক্ষেত্রফল — এই একটিমাত্র শব্দেই সূত্র ঠিক হয়ে যায়।'),
      trap: t('Do not fence with the area or carpet with the perimeter; also remember the factor 2 in the perimeter.', 'ক্ষেত্রফল দিয়ে বেড়া বা পরিসীমা দিয়ে কার্পেট হিসাব করবে না; পরিসীমায় 2 গুণকটাও ভুলবে না।'),
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
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“The sides of a triangle are a, b and c. Find its area.”', '“একটি ত্রিভুজের বাহুগুলো a, b ও c। এর ক্ষেত্রফল নির্ণয় করো।”'),
      formula: t(r`$s = \frac{a + b + c}{2}$; area $= \sqrt{s(s - a)(s - b)(s - c)}$.`, r`$s = \frac{a + b + c}{2}$; ক্ষেত্রফল $= \sqrt{s(s - a)(s - b)(s - c)}$।`),
      shortcut: t('Factorise the product under the root into pairs before multiplying out — paired factors come straight out of the square root.', 'বর্গমূলের ভিতরের গুণফলটি আগে জোড়ায় জোড়ায় উৎপাদকে ভাঙো — জোড়া উৎপাদক সরাসরি বর্গমূলের বাইরে চলে আসে।'),
      trap: t(r`Do not use $\frac{1}{2} \times$ base $\times$ another side unless the height (or a right angle) is actually given.`, r`উচ্চতা (বা সমকোণ) সত্যিই দেওয়া না থাকলে $\frac{1}{2} \times$ ভূমি $\times$ অন্য বাহু ব্যবহার করবে না।`),
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
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“A wheel of radius r makes how many revolutions in covering a distance of D?”', '“r ব্যাসার্ধের একটি চাকা D দূরত্ব যেতে কতবার ঘুরবে?”'),
      formula: t(r`One revolution $=$ circumference $= 2\pi r$; revolutions $=$ distance $\div 2\pi r$.`, r`এক পাক $=$ পরিধি $= 2\pi r$; ঘূর্ণন সংখ্যা $=$ দূরত্ব $\div 2\pi r$।`),
      shortcut: t(r`With $\pi = \frac{22}{7}$, pick radii that are multiples of 7 so the 7 cancels at once and the circumference comes out whole.`, r`$\pi = \frac{22}{7}$ নিলে 7-এর গুণিতক ব্যাসার্ধে 7 সঙ্গে সঙ্গে কেটে যায় এবং পরিধি পূর্ণসংখ্যায় আসে।`),
      trap: t('Convert the distance and the circumference to the same unit before dividing, and use the radius, not the diameter, in 2πr.', 'ভাগ করার আগে দূরত্ব ও পরিধিকে একই এককে আনো, আর 2πr-এ ব্যাস নয়, ব্যাসার্ধ ব্যবহার করো।'),
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
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“A box / tank / brick is l × b × h. Find its volume and total surface area.”', '“একটি বাক্স / ট্যাঙ্ক / ইটের মাপ l × b × h। এর আয়তন ও সমগ্র তলের ক্ষেত্রফল নির্ণয় করো।”'),
      formula: t(r`Volume $= lbh$; total surface area $= 2(lb + bh + hl)$.`, r`আয়তন $= lbh$; সমগ্র তলের ক্ষেত্রফল $= 2(lb + bh + hl)$।`),
      shortcut: t('Compute the three face products lb, bh, hl once — their sum doubled is the surface area and lb × h is the volume, so one set of products serves both.', 'তিনটি তলের গুণফল lb, bh, hl একবারই বের করো — তাদের যোগফলের দ্বিগুণই তলের ক্ষেত্রফল আর lb × h-ই আয়তন, তাই একই গুণফল দুটোতেই কাজে লাগে।'),
      trap: t('Surface area is in square units and volume in cubic units; forgetting the leading 2 halves the surface area.', 'তলের ক্ষেত্রফল বর্গ এককে আর আয়তন ঘন এককে হয়; সামনের 2 ভুলে গেলে তলের ক্ষেত্রফল অর্ধেক হয়ে যায়।'),
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
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“Find the volume of a cylinder / cone / sphere of radius r and height h.”', '“r ব্যাসার্ধ ও h উচ্চতার একটি বেলন / শঙ্কু / গোলকের আয়তন নির্ণয় করো।”'),
      formula: t(r`Cylinder $\pi r^2 h$; cone $\frac{1}{3}\pi r^2 h$; sphere $\frac{4}{3}\pi r^3$.`, r`বেলন $\pi r^2 h$; শঙ্কু $\frac{1}{3}\pi r^2 h$; গোলক $\frac{4}{3}\pi r^3$।`),
      shortcut: t(r`Compute $\pi r^2 h$ once: that is the cylinder; the cone with the same base and height is exactly one-third of it.`, r`$\pi r^2 h$ একবার বের করো: এটাই বেলন; একই ভূমি ও উচ্চতার শঙ্কু ঠিক তার তিন ভাগের এক ভাগ।`),
      trap: t(r`The cone needs the $\frac{1}{3}$ and the sphere needs $r^3$, not $r^2$; also halve a given diameter first.`, r`শঙ্কুতে $\frac{1}{3}$ লাগে আর গোলকে $r^2$ নয়, $r^3$ লাগে; ব্যাস দেওয়া থাকলে আগে অর্ধেক করো।`),
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
    {
      key: 'hemisphere',
      emoji: '🥣',
      name: t('Hemisphere: volume and surface area', 'অর্ধগোলক: আয়তন ও তলের ক্ষেত্রফল'),
      difficulty: 'beginner',
      typicalWording: t('“A hemispherical bowl / dome has radius r. Find its volume (capacity) or total surface area.”', '“একটি অর্ধগোলাকার বাটি / গম্বুজের ব্যাসার্ধ r। এর আয়তন (ধারণক্ষমতা) বা সমগ্র তলের ক্ষেত্রফল নির্ণয় করো।”'),
      formula: t(r`Volume $= \frac{2}{3}\pi r^3$; curved surface $= 2\pi r^2$; total surface $= 3\pi r^2$.`, r`আয়তন $= \frac{2}{3}\pi r^3$; বক্রতল $= 2\pi r^2$; সমগ্রতল $= 3\pi r^2$।`),
      shortcut: t('Start from the full sphere and halve it for volume and curved surface; for the total surface just add the flat circular base πr² back.', 'পূর্ণ গোলক থেকে শুরু করে আয়তন ও বক্রতলের জন্য অর্ধেক নাও; সমগ্রতলের জন্য শুধু সমতল বৃত্তাকার ভূমি πr² আবার যোগ করো।'),
      trap: t('Total surface area of a solid hemisphere is 3πr², not 2πr² — the flat base counts too.', 'নিরেট অর্ধগোলকের সমগ্র তলের ক্ষেত্রফল 2πr² নয়, 3πr² — সমতল ভূমিটাও গুনতে হয়।'),
      spot: t(
        'A **hemisphere** — a bowl, dome or half-ball — and its volume, curved surface or total surface is asked.',
        'একটি **অর্ধগোলক** — বাটি, গম্বুজ বা অর্ধেক বল — এবং তার আয়তন, বক্রতল বা সমগ্রতল জানতে চাওয়া হয়।',
      ),
      method: [
        t(r`Volume $= \frac{2}{3}\pi r^3$ (half the sphere's volume).`, r`আয়তন $= \frac{2}{3}\pi r^3$ (গোলকের আয়তনের অর্ধেক)।`),
        t(r`Curved surface area $= 2\pi r^2$ (half the sphere's surface).`, r`বক্রতলের ক্ষেত্রফল $= 2\pi r^2$ (গোলকের তলের অর্ধেক)।`),
        t(r`Total surface area $= 2\pi r^2 + \pi r^2 = 3\pi r^2$ (add the flat base).`, r`সমগ্র তলের ক্ষেত্রফল $= 2\pi r^2 + \pi r^2 = 3\pi r^2$ (সমতল ভূমি যোগ করো)।`),
      ],
      example: {
        question: t(
          'Find the total surface area of a solid hemisphere of radius 7 cm.',
          '7 cm ব্যাসার্ধের একটি নিরেট অর্ধগোলকের সমগ্র তলের ক্ষেত্রফল নির্ণয় করো।',
        ),
        steps: [
          t(r`Curved surface $= 2\pi r^2 = 2 \times \frac{22}{7} \times 49 = 308$ cm².`, r`বক্রতল $= 2\pi r^2 = 2 \times \frac{22}{7} \times 49 = 308$ বর্গ cm।`),
          t(r`Flat base $= \pi r^2 = \frac{22}{7} \times 49 = 154$ cm².`, r`সমতল ভূমি $= \pi r^2 = \frac{22}{7} \times 49 = 154$ বর্গ cm।`),
          t(r`Total surface area $= 308 + 154 = 462$ cm².`, r`সমগ্র তলের ক্ষেত্রফল $= 308 + 154 = 462$ বর্গ cm।`),
        ],
        answer: t('462 cm²', '462 বর্গ cm'),
      },
      tryIt: {
        question: t(
          'What is the total surface area (in cm²) of a solid hemisphere of radius 14 cm?',
          '14 cm ব্যাসার্ধের একটি নিরেট অর্ধগোলকের সমগ্র তলের ক্ষেত্রফল কত বর্গ cm?',
        ),
        options: [t('1232', '1232'), t('616', '616'), t('1848', '1848'), t('2464', '2464')],
        correct: 2,
        explanation: [
          t(r`Total surface area $= 3\pi r^2 = 3 \times \frac{22}{7} \times 14 \times 14$.`, r`সমগ্র তলের ক্ষেত্রফল $= 3\pi r^2 = 3 \times \frac{22}{7} \times 14 \times 14$।`),
          t(r`$= 3 \times 22 \times 28 = 1848$ cm². (1232 is only the curved surface $2\pi r^2$.)`, r`অর্থাৎ $3 \times 22 \times 28 = 1848$ বর্গ cm। (1232 শুধু বক্রতল $2\pi r^2$।)`),
        ],
      },
    },
    {
      key: 'rhombus_parallelogram_equilateral',
      emoji: '🔷',
      name: t('Rhombus, parallelogram and equilateral triangle areas', 'রম্বস, সামান্তরিক ও সমবাহু ত্রিভুজের ক্ষেত্রফল'),
      difficulty: 'beginner',
      typicalWording: t('“The diagonals of a rhombus are d₁ and d₂…” / “base and height of a parallelogram…” / “side of an equilateral triangle…”', '“একটি রম্বসের কর্ণদ্বয় d₁ ও d₂…” / “সামান্তরিকের ভূমি ও উচ্চতা…” / “সমবাহু ত্রিভুজের বাহু…”'),
      formula: t(r`Rhombus $= \frac{1}{2}d_1 d_2$; parallelogram $=$ base $\times$ height; equilateral triangle $= \frac{\sqrt{3}}{4}a^2$.`, r`রম্বস $= \frac{1}{2}d_1 d_2$; সামান্তরিক $=$ ভূমি $\times$ উচ্চতা; সমবাহু ত্রিভুজ $= \frac{\sqrt{3}}{4}a^2$।`),
      shortcut: t('For a rhombus, just halve the product of the diagonals — no side or height is needed at all.', 'রম্বসের ক্ষেত্রে শুধু কর্ণদ্বয়ের গুণফলের অর্ধেক নাও — বাহু বা উচ্চতার কোনো দরকারই নেই।'),
      trap: t('In a parallelogram use the vertical height for the chosen base, not the slant side; in a rhombus do not forget the half.', 'সামান্তরিকে নির্বাচিত ভূমির জন্য লম্ব উচ্চতা নাও, তির্যক বাহু নয়; রম্বসে অর্ধেক করতে ভুলবে না।'),
      spot: t(
        'The figure is a **rhombus** (diagonals given), a **parallelogram** (base and height given) or an **equilateral triangle** (side given).',
        'চিত্রটি **রম্বস** (কর্ণ দেওয়া), **সামান্তরিক** (ভূমি ও উচ্চতা দেওয়া) বা **সমবাহু ত্রিভুজ** (বাহু দেওয়া)।',
      ),
      method: [
        t('Name the figure first — each of the three has its own one-line formula.', 'আগে চিত্রটির নাম ঠিক করো — তিনটির প্রত্যেকের নিজস্ব এক লাইনের সূত্র আছে।'),
        t(r`Rhombus: area $= \frac{1}{2} \times d_1 \times d_2$ using the two diagonals.`, r`রম্বস: ক্ষেত্রফল $= \frac{1}{2} \times d_1 \times d_2$, দুই কর্ণ ব্যবহার করে।`),
        t(r`Parallelogram: area $=$ base $\times$ height; equilateral triangle: area $= \frac{\sqrt{3}}{4} \times$ side².`, r`সামান্তরিক: ক্ষেত্রফল $=$ ভূমি $\times$ উচ্চতা; সমবাহু ত্রিভুজ: ক্ষেত্রফল $= \frac{\sqrt{3}}{4} \times$ বাহু²।`),
      ],
      example: {
        question: t(
          'The diagonals of a rhombus are 16 cm and 12 cm. Find its area.',
          'একটি রম্বসের কর্ণদ্বয় 16 cm ও 12 cm। এর ক্ষেত্রফল নির্ণয় করো।',
        ),
        steps: [
          t(r`Area of a rhombus $= \frac{1}{2} \times d_1 \times d_2$.`, r`রম্বসের ক্ষেত্রফল $= \frac{1}{2} \times d_1 \times d_2$।`),
          t(r`$= \frac{1}{2} \times 16 \times 12$.`, r`অর্থাৎ $\frac{1}{2} \times 16 \times 12$।`),
          t(r`$= 8 \times 12 = 96$ cm².`, r`অর্থাৎ $8 \times 12 = 96$ বর্গ cm।`),
        ],
        answer: t('96 cm²', '96 বর্গ cm'),
      },
      tryIt: {
        question: t(
          'A parallelogram has a base of 18 cm and a height of 9 cm. What is its area in cm²?',
          'একটি সামান্তরিকের ভূমি 18 cm ও উচ্চতা 9 cm। এর ক্ষেত্রফল কত বর্গ cm?',
        ),
        options: [t('81', '81'), t('54', '54'), t('162', '162'), t('108', '108')],
        correct: 2,
        explanation: [
          t(r`Area of a parallelogram $=$ base $\times$ height $= 18 \times 9$.`, r`সামান্তরিকের ক্ষেত্রফল $=$ ভূমি $\times$ উচ্চতা $= 18 \times 9$।`),
          t(r`$= 162$ cm². (81 wrongly halves it like a triangle; a parallelogram is not halved.)`, r`অর্থাৎ $162$ বর্গ cm। (81 এলে ত্রিভুজের মতো ভুল করে অর্ধেক করা হয়েছে; সামান্তরিককে অর্ধেক করা হয় না।)`),
        ],
      },
    },
    {
      key: 'path_area',
      emoji: '🛤️',
      name: t('Path inside or outside a field', 'মাঠের ভিতরে বা বাইরে রাস্তা'),
      difficulty: 'intermediate',
      typicalWording: t('“A path of width w runs inside / around a rectangular field. Find the area (or cost) of the path.”', '“একটি আয়তাকার মাঠের ভিতরে / চারপাশে w চওড়া রাস্তা আছে। রাস্তার ক্ষেত্রফল (বা খরচ) নির্ণয় করো।”'),
      formula: t(r`Outside path: $(l + 2w)(b + 2w) - lb$; inside path: $lb - (l - 2w)(b - 2w)$.`, r`বাইরের রাস্তা: $(l + 2w)(b + 2w) - lb$; ভিতরের রাস্তা: $lb - (l - 2w)(b - 2w)$।`),
      shortcut: t(r`Outside path area $= 2w(l + b) + 4w^2$ and inside path area $= 2w(l + b) - 4w^2$ — one line, no big multiplications.`, r`বাইরের রাস্তার ক্ষেত্রফল $= 2w(l + b) + 4w^2$ আর ভিতরের রাস্তার ক্ষেত্রফল $= 2w(l + b) - 4w^2$ — এক লাইনেই হয়, বড় গুণ লাগে না।`),
      trap: t('The width is added or subtracted on BOTH sides, so length and breadth each change by 2w, not by w.', 'প্রস্থটি দুই দিকেই যোগ বা বিয়োগ হয়, তাই দৈর্ঘ্য ও প্রস্থ প্রত্যেকটি w নয়, 2w করে বদলায়।'),
      spot: t(
        'A rectangular field or garden has a **path of uniform width** running around it, either **outside** or **inside** along the boundary.',
        'একটি আয়তাকার মাঠ বা বাগানের সীমানা বরাবর **সমান প্রস্থের রাস্তা** আছে, হয় **বাইরে** নয় **ভিতরে**।',
      ),
      method: [
        t('Decide inside or outside: outside grows the outer rectangle, inside shrinks the inner rectangle.', 'ভিতরে না বাইরে ঠিক করো: বাইরে হলে বাইরের আয়তক্ষেত্র বড় হয়, ভিতরে হলে ভিতরেরটি ছোটো হয়।'),
        t('Adjust BOTH length and breadth by 2w (width on two sides) and find the new area.', 'দৈর্ঘ্য ও প্রস্থ দুটোতেই 2w (দুই দিকের প্রস্থ) যোগ বা বিয়োগ করে নতুন ক্ষেত্রফল বের করো।'),
        t('Path area = area of the bigger rectangle − area of the smaller rectangle.', 'রাস্তার ক্ষেত্রফল = বড় আয়তক্ষেত্রের ক্ষেত্রফল − ছোটো আয়তক্ষেত্রের ক্ষেত্রফল।'),
      ],
      example: {
        question: t(
          'A lawn is 50 m long and 35 m wide. A path 3 m wide runs outside it all around. Find the area of the path.',
          'একটি লনের দৈর্ঘ্য 50 m ও প্রস্থ 35 m। এর চারপাশে বাইরে 3 m চওড়া একটি রাস্তা আছে। রাস্তাটির ক্ষেত্রফল নির্ণয় করো।',
        ),
        steps: [
          t(r`Outer size $= (50 + 6) \times (35 + 6) = 56 \times 41$ m (3 m on both sides).`, r`বাইরের মাপ $= (50 + 6) \times (35 + 6) = 56 \times 41$ m (দুই দিকে 3 m করে)।`),
          t(r`Outer area $= 56 \times 41 = 2296$ m²; lawn area $= 50 \times 35 = 1750$ m².`, r`বাইরের ক্ষেত্রফল $= 56 \times 41 = 2296$ বর্গ m; লনের ক্ষেত্রফল $= 50 \times 35 = 1750$ বর্গ m।`),
          t(r`Path area $= 2296 - 1750 = 546$ m².`, r`রাস্তার ক্ষেত্রফল $= 2296 - 1750 = 546$ বর্গ m।`),
        ],
        answer: t('546 m²', '546 বর্গ m'),
      },
      tryIt: {
        question: t(
          'A field is 60 m by 40 m. A path 2 m wide runs inside it along the boundary. What is the area (in m²) of the path?',
          'একটি মাঠের মাপ 60 m × 40 m। এর সীমানা বরাবর ভিতরে 2 m চওড়া একটি রাস্তা আছে। রাস্তাটির ক্ষেত্রফল কত বর্গ m?',
        ),
        options: [t('400', '400'), t('384', '384'), t('416', '416'), t('200', '200')],
        correct: 1,
        explanation: [
          t(r`Inner size $= (60 - 4) \times (40 - 4) = 56 \times 36$ m, so inner area $= 2016$ m².`, r`ভিতরের মাপ $= (60 - 4) \times (40 - 4) = 56 \times 36$ m, তাই ভিতরের ক্ষেত্রফল $= 2016$ বর্গ m।`),
          t(r`Path area $= 60 \times 40 - 2016 = 2400 - 2016 = 384$ m².`, r`রাস্তার ক্ষেত্রফল $= 60 \times 40 - 2016 = 2400 - 2016 = 384$ বর্গ m।`),
          t('(Changing each side by only 2 m instead of 4 m gives the wrong 400-ish answers.)', '(প্রতিটি দিকে 4 m-এর বদলে মাত্র 2 m বদলালে 400-এর কাছাকাছি ভুল উত্তর আসে।)'),
        ],
      },
    },
    {
      key: 'four_walls_flooring_cost',
      emoji: '🏠',
      name: t('Four walls and flooring cost of a room', 'ঘরের চার দেয়াল ও মেঝের খরচ'),
      difficulty: 'intermediate',
      typicalWording: t('“Find the cost of painting the four walls / tiling the floor of a room l × b × h at a given rate.”', '“প্রদত্ত দরে l × b × h মাপের ঘরের চার দেয়ালে রং করার / মেঝেতে টাইলস বসানোর খরচ নির্ণয় করো।”'),
      formula: t(r`Four walls $= 2(l + b)h$; floor $= l \times b$; cost $=$ area $\times$ rate.`, r`চার দেয়াল $= 2(l + b)h$; মেঝে $= l \times b$; খরচ $=$ ক্ষেত্রফল $\times$ দর।`),
      shortcut: t('Four walls = perimeter of the floor × height: compute 2(l + b) once and multiply by h.', 'চার দেয়াল = মেঝের পরিসীমা × উচ্চতা: 2(l + b) একবার বের করে h দিয়ে গুণ করো।'),
      trap: t('Four walls exclude the floor and the ceiling, and the walls use the height — do not use the full cuboid surface area 2(lb + bh + hl).', 'চার দেয়ালে মেঝে ও ছাদ থাকে না, আর দেয়ালে উচ্চতা লাগে — আয়তঘনের পূর্ণ তলের ক্ষেত্রফল 2(lb + bh + hl) নেবে না।'),
      spot: t(
        'A **room** with length, breadth and height, and a cost for **painting/plastering the four walls** or for **flooring/tiling the floor**.',
        'দৈর্ঘ্য, প্রস্থ ও উচ্চতা দেওয়া একটি **ঘর**, আর **চার দেয়ালে রং/প্লাস্টার** বা **মেঝেতে ফ্লোরিং/টাইলসের** খরচ।',
      ),
      method: [
        t('Four walls: use only the wall area, not floor or ceiling.', 'চার দেয়াল: শুধু দেয়ালের ক্ষেত্রফল নাও, মেঝে বা ছাদ নয়।'),
        t(r`Four walls area $= 2(l + b) \times h$; floor area $= l \times b$.`, r`চার দেয়ালের ক্ষেত্রফল $= 2(l + b) \times h$; মেঝের ক্ষেত্রফল $= l \times b$।`),
        t('Cost = the required area × rate per square unit.', 'খরচ = প্রয়োজনীয় ক্ষেত্রফল × প্রতি বর্গ এককের দর।'),
      ],
      example: {
        question: t(
          'A room is 10 m long, 8 m wide and 4 m high. Find the cost of painting its four walls at ₹10 per m².',
          'একটি ঘরের দৈর্ঘ্য 10 m, প্রস্থ 8 m ও উচ্চতা 4 m। প্রতি বর্গ m ₹10 দরে এর চার দেয়ালে রং করতে কত খরচ হবে?',
        ),
        steps: [
          t(r`Four walls area $= 2(10 + 8) \times 4$.`, r`চার দেয়ালের ক্ষেত্রফল $= 2(10 + 8) \times 4$।`),
          t(r`$= 2 \times 18 \times 4 = 144$ m².`, r`অর্থাৎ $2 \times 18 \times 4 = 144$ বর্গ m।`),
          t(r`Cost $= 144 \times 10 = 1440$ rupees.`, r`খরচ $= 144 \times 10 = 1440$ টাকা।`),
        ],
        answer: t('₹1440', '1440 টাকা'),
      },
      tryIt: {
        question: t(
          'The floor of a room is 12 m long and 9 m wide. What is the cost (in ₹) of tiling it at ₹25 per m²?',
          'একটি ঘরের মেঝের দৈর্ঘ্য 12 m ও প্রস্থ 9 m। প্রতি বর্গ m ₹25 দরে টাইলস বসাতে কত টাকা খরচ হবে?',
        ),
        options: [t('1050', '1050'), t('2700', '2700'), t('5400', '5400'), t('1350', '1350')],
        correct: 1,
        explanation: [
          t(r`Floor area $= 12 \times 9 = 108$ m² (the height is not needed for the floor).`, r`মেঝের ক্ষেত্রফল $= 12 \times 9 = 108$ বর্গ m (মেঝের জন্য উচ্চতা লাগে না)।`),
          t(r`Cost $= 108 \times 25 = 2700$ rupees.`, r`খরচ $= 108 \times 25 = 2700$ টাকা।`),
        ],
      },
    },
    {
      key: 'sector_arc_area',
      emoji: '🍕',
      name: t('Sector: arc length and sector area', 'বৃত্তকলা: চাপের দৈর্ঘ্য ও বৃত্তকলার ক্ষেত্রফল'),
      difficulty: 'intermediate',
      typicalWording: t('“A sector of a circle of radius r has central angle θ°. Find the arc length / area of the sector.”', '“r ব্যাসার্ধের বৃত্তের একটি বৃত্তকলার কেন্দ্রস্থ কোণ θ°। চাপের দৈর্ঘ্য / বৃত্তকলার ক্ষেত্রফল নির্ণয় করো।”'),
      formula: t(r`Arc $= \frac{\theta}{360} \times 2\pi r$; sector area $= \frac{\theta}{360} \times \pi r^2 = \frac{1}{2} \times$ arc $\times r$.`, r`চাপ $= \frac{\theta}{360} \times 2\pi r$; বৃত্তকলার ক্ষেত্রফল $= \frac{\theta}{360} \times \pi r^2 = \frac{1}{2} \times$ চাপ $\times r$।`),
      shortcut: t(r`If the arc length is already known, sector area $= \frac{1}{2} \times$ arc $\times$ radius — no angle needed.`, r`চাপের দৈর্ঘ্য জানা থাকলে বৃত্তকলার ক্ষেত্রফল $= \frac{1}{2} \times$ চাপ $\times$ ব্যাসার্ধ — কোণের দরকার নেই।`),
      trap: t('The fraction is θ/360 of the FULL circle, and the perimeter of a sector also needs the two radii: arc + 2r.', 'ভগ্নাংশটি পূর্ণ বৃত্তের θ/360 অংশ, আর বৃত্তকলার পরিসীমায় দুটি ব্যাসার্ধও লাগে: চাপ + 2r।'),
      spot: t(
        'A **slice of a circle** with radius and **central angle θ**; the arc length or the area of the slice (sector) is asked.',
        'ব্যাসার্ধ ও **কেন্দ্রস্থ কোণ θ** দেওয়া **বৃত্তের একটি খণ্ড**; চাপের দৈর্ঘ্য বা খণ্ডটির (বৃত্তকলার) ক্ষেত্রফল জানতে চাওয়া হয়।',
      ),
      method: [
        t(r`Take the fraction $\frac{\theta}{360}$ of the full circle.`, r`পূর্ণ বৃত্তের $\frac{\theta}{360}$ অংশ নাও।`),
        t(r`Arc length $= \frac{\theta}{360} \times 2\pi r$.`, r`চাপের দৈর্ঘ্য $= \frac{\theta}{360} \times 2\pi r$।`),
        t(r`Sector area $= \frac{\theta}{360} \times \pi r^2$.`, r`বৃত্তকলার ক্ষেত্রফল $= \frac{\theta}{360} \times \pi r^2$।`),
      ],
      example: {
        question: t(
          'A sector of a circle of radius 21 cm has a central angle of 90°. Find its arc length and its area.',
          '21 cm ব্যাসার্ধের বৃত্তের একটি বৃত্তকলার কেন্দ্রস্থ কোণ 90°। এর চাপের দৈর্ঘ্য ও ক্ষেত্রফল নির্ণয় করো।',
        ),
        steps: [
          t(r`Fraction of the circle $= \frac{90}{360} = \frac{1}{4}$.`, r`বৃত্তের ভগ্নাংশ $= \frac{90}{360} = \frac{1}{4}$।`),
          t(r`Arc $= \frac{1}{4} \times 2 \times \frac{22}{7} \times 21 = 33$ cm.`, r`চাপ $= \frac{1}{4} \times 2 \times \frac{22}{7} \times 21 = 33$ cm।`),
          t(r`Area $= \frac{1}{4} \times \frac{22}{7} \times 21 \times 21 = 346.5$ cm².`, r`ক্ষেত্রফল $= \frac{1}{4} \times \frac{22}{7} \times 21 \times 21 = 346.5$ বর্গ cm।`),
        ],
        answer: t('Arc 33 cm, area 346.5 cm²', 'চাপ 33 cm, ক্ষেত্রফল 346.5 বর্গ cm'),
      },
      tryIt: {
        question: t(
          'A sector of a circle of radius 21 cm has a central angle of 60°. What is the area of the sector in cm²?',
          '21 cm ব্যাসার্ধের বৃত্তের একটি বৃত্তকলার কেন্দ্রস্থ কোণ 60°। বৃত্তকলাটির ক্ষেত্রফল কত বর্গ cm?',
        ),
        options: [t('231', '231'), t('1386', '1386'), t('693', '693'), t('115.5', '115.5')],
        correct: 0,
        explanation: [
          t(r`Area $= \frac{60}{360} \times \frac{22}{7} \times 21 \times 21 = \frac{1}{6} \times 1386$.`, r`ক্ষেত্রফল $= \frac{60}{360} \times \frac{22}{7} \times 21 \times 21 = \frac{1}{6} \times 1386$।`),
          t(r`$= 231$ cm². (1386 is the area of the whole circle; 693 wrongly takes half the circle.)`, r`অর্থাৎ $231$ বর্গ cm। (1386 পূর্ণ বৃত্তের ক্ষেত্রফল; 693 এলে ভুল করে বৃত্তের অর্ধেক নেওয়া হয়েছে।)`),
        ],
      },
    },
    {
      key: 'dimension_percent_change',
      emoji: '📈',
      name: t('Percentage change in area or volume when dimensions change', 'মাপ বদলালে ক্ষেত্রফল বা আয়তনের শতকরা পরিবর্তন'),
      difficulty: 'advanced',
      typicalWording: t('“Each edge / the radius increases (or decreases) by x%. Find the percentage change in surface area or volume.”', '“প্রতিটি ধার / ব্যাসার্ধ x% বাড়লে (বা কমলে) তলের ক্ষেত্রফল বা আয়তনের শতকরা পরিবর্তন নির্ণয় করো।”'),
      formula: t(r`If length scales by factor $k$: area scales by $k^2$, volume by $k^3$; for $+x\%$, $k = 1 + \frac{x}{100}$.`, r`দৈর্ঘ্য $k$ গুণ হলে: ক্ষেত্রফল $k^2$ গুণ, আয়তন $k^3$ গুণ হয়; $+x\%$-এর জন্য $k = 1 + \frac{x}{100}$।`),
      shortcut: t('Apply the percentage successively: for area use the change twice (x + x + x²/100), for volume three times — never just double or triple x.', 'শতকরাটি পরপর প্রয়োগ করো: ক্ষেত্রফলে পরিবর্তন দুবার (x + x + x²/100), আয়তনে তিনবার — কখনো শুধু x-এর দ্বিগুণ বা তিনগুণ করবে না।'),
      trap: t('A 10% increase in each edge is NOT a 20% area increase or a 30% volume increase — the cross terms add extra.', 'প্রতিটি ধার 10% বাড়া মানে ক্ষেত্রফল 20% বা আয়তন 30% বাড়া নয় — মাঝের পদগুলো অতিরিক্ত যোগ হয়।'),
      spot: t(
        'Every dimension of a solid (or the radius) is **increased or decreased by a percentage**, and the resulting **percentage change in area or volume** is asked.',
        'একটি ঘনবস্তুর প্রতিটি মাপ (বা ব্যাসার্ধ) **কিছু শতাংশ বাড়ানো বা কমানো** হয়, আর তার ফলে **ক্ষেত্রফল বা আয়তনের শতকরা পরিবর্তন** জানতে চাওয়া হয়।',
      ),
      method: [
        t('Convert the percentage change into a length factor k (e.g. +10% → k = 1.1).', 'শতকরা পরিবর্তনকে দৈর্ঘ্যের গুণক k-তে বদলাও (যেমন +10% → k = 1.1)।'),
        t('Area uses k² and volume uses k³, because area depends on two lengths and volume on three.', 'ক্ষেত্রফলে k² আর আয়তনে k³ ব্যবহার করো, কারণ ক্ষেত্রফল দুটি দৈর্ঘ্যের ও আয়তন তিনটি দৈর্ঘ্যের উপর নির্ভর করে।'),
        t('Percentage change = (factor − 1) × 100; a factor below 1 means a decrease.', 'শতকরা পরিবর্তন = (গুণক − 1) × 100; গুণক 1-এর কম হলে হ্রাস বোঝায়।'),
      ],
      example: {
        question: t(
          'Each edge of a cube is increased by 10%. Find the percentage increase in its volume.',
          'একটি ঘনকের প্রতিটি ধার 10% বাড়ানো হল। এর আয়তনের শতকরা বৃদ্ধি নির্ণয় করো।',
        ),
        steps: [
          t(r`Length factor $k = 1 + \frac{10}{100} = 1.1$.`, r`দৈর্ঘ্যের গুণক $k = 1 + \frac{10}{100} = 1.1$।`),
          t(r`Volume factor $= k^3 = 1.1^3 = 1.331$.`, r`আয়তনের গুণক $= k^3 = 1.1^3 = 1.331$।`),
          t(r`Increase $= (1.331 - 1) \times 100 = 33.1\%$.`, r`বৃদ্ধি $= (1.331 - 1) \times 100 = 33.1\%$।`),
        ],
        answer: t('33.1% increase', '33.1% বৃদ্ধি'),
      },
      tryIt: {
        question: t(
          'The radius of a circle is increased by 20%. By what percent does its area increase?',
          'একটি বৃত্তের ব্যাসার্ধ 20% বাড়ানো হল। এর ক্ষেত্রফল শতকরা কত বাড়বে?',
        ),
        options: [t('40%', '40%'), t('44%', '44%'), t('20%', '20%'), t('36%', '36%')],
        correct: 1,
        explanation: [
          t(r`Length factor $k = 1.2$, so area factor $= 1.2^2 = 1.44$.`, r`দৈর্ঘ্যের গুণক $k = 1.2$, তাই ক্ষেত্রফলের গুণক $= 1.2^2 = 1.44$।`),
          t(r`Increase $= (1.44 - 1) \times 100 = 44\%$. (Simply doubling 20% gives the wrong 40%.)`, r`বৃদ্ধি $= (1.44 - 1) \times 100 = 44\%$। (শুধু 20%-এর দ্বিগুণ করলে ভুল 40% আসে।)`),
        ],
      },
    },
    {
      key: 'melting_and_recasing',
      emoji: '🔥',
      name: t('Melting and recasting: volume stays the same', 'গলিয়ে নতুন আকার দেওয়া: আয়তন একই থাকে'),
      difficulty: 'advanced',
      typicalWording: t('“A solid is melted and recast into smaller solids / drawn into a wire. How many pieces / how long is the wire?”', '“একটি ঘনবস্তু গলিয়ে ছোটো ছোটো ঘনবস্তুতে / টেনে তারে পরিণত করা হল। কতগুলি টুকরো হবে / তারটি কত লম্বা হবে?”'),
      formula: t(r`Volume before $=$ volume after: $V_{\text{old}} = n \times V_{\text{one new piece}}$ (or $V_{\text{old}} = \pi r^2 l$ for a wire).`, r`আগের আয়তন $=$ পরের আয়তন: $V_{\text{আগের}} = n \times V_{\text{একটি নতুন টুকরো}}$ (বা তারের জন্য $V_{\text{আগের}} = \pi r^2 l$)।`),
      shortcut: t(r`For same-shape recasting, the count is the cube of the size ratio: $n = (\frac{R}{r})^3$ for spheres or cubes — $\pi$ cancels.`, r`একই আকৃতিতে রূপান্তরে সংখ্যা হল আকার-অনুপাতের ঘন: গোলক বা ঘনকের জন্য $n = (\frac{R}{r})^3$ — $\pi$ কেটে যায়।`),
      trap: t('It is the VOLUME that is conserved, not the surface area, and not the count of dimensions; also convert wire length units (cm to m) at the end.', 'আয়তন সংরক্ষিত থাকে, তলের ক্ষেত্রফল বা মাপের সংখ্যা নয়; শেষে তারের দৈর্ঘ্যের একক (cm থেকে m) বদলাতেও ভুলবে না।'),
      spot: t(
        'One solid is **melted and recast** into another shape, many small solids, or **drawn into a wire**; a count or a length is asked.',
        'একটি ঘনবস্তু **গলিয়ে অন্য আকৃতিতে**, অনেক ছোটো ঘনবস্তুতে, বা **টেনে তারে** পরিণত করা হয়; সংখ্যা বা দৈর্ঘ্য জানতে চাওয়া হয়।',
      ),
      method: [
        t('Write the volume of the original solid.', 'মূল ঘনবস্তুর আয়তন লেখো।'),
        t('Write the total volume after recasting: number of pieces × volume of one piece (or πr² × length for a wire).', 'রূপান্তরের পর মোট আয়তন লেখো: টুকরোর সংখ্যা × একটি টুকরোর আয়তন (বা তারের জন্য πr² × দৈর্ঘ্য)।'),
        t('Equate the two volumes — melting loses no material — and solve for the unknown.', 'দুটি আয়তন সমান ধরো — গলালে উপাদান নষ্ট হয় না — এবং অজানাটি বের করো।'),
      ],
      example: {
        question: t(
          'A solid metallic sphere of radius 6 cm is melted and recast into small spheres of radius 2 cm. How many small spheres are obtained?',
          '6 cm ব্যাসার্ধের একটি নিরেট ধাতব গোলক গলিয়ে 2 cm ব্যাসার্ধের ছোটো ছোটো গোলক তৈরি করা হল। কতগুলি ছোটো গোলক পাওয়া যাবে?',
        ),
        steps: [
          t(r`Volume is conserved: number $n \times \frac{4}{3}\pi (2)^3 = \frac{4}{3}\pi (6)^3$.`, r`আয়তন সংরক্ষিত: সংখ্যা $n \times \frac{4}{3}\pi (2)^3 = \frac{4}{3}\pi (6)^3$।`),
          t(r`Cancelling $\frac{4}{3}\pi$: $n \times 8 = 216$.`, r`$\frac{4}{3}\pi$ কেটে দিলে: $n \times 8 = 216$।`),
          t(r`$n = 216 \div 8 = 27$.`, r`অর্থাৎ $n = 216 \div 8 = 27$।`),
        ],
        answer: t('27 small spheres', '27টি ছোটো গোলক'),
      },
      tryIt: {
        question: t(
          'A solid sphere of radius 6 cm is melted and drawn into a wire of radius 0.2 cm. What is the length of the wire in metres?',
          '6 cm ব্যাসার্ধের একটি নিরেট গোলক গলিয়ে 0.2 cm ব্যাসার্ধের তারে টানা হল। তারটির দৈর্ঘ্য কত মিটার?',
        ),
        options: [t('36', '36'), t('7.2', '7.2'), t('72', '72'), t('720', '720')],
        correct: 2,
        explanation: [
          t(r`Sphere volume $= \frac{4}{3}\pi \times 6^3 = 288\pi$ cm³; wire volume $= \pi \times (0.2)^2 \times l = 0.04\pi l$.`, r`গোলকের আয়তন $= \frac{4}{3}\pi \times 6^3 = 288\pi$ ঘন cm; তারের আয়তন $= \pi \times (0.2)^2 \times l = 0.04\pi l$।`),
          t(r`Equating: $l = 288 \div 0.04 = 7200$ cm.`, r`সমান ধরে: $l = 288 \div 0.04 = 7200$ cm।`),
          t(r`$7200$ cm $= 72$ m. (Leaving the answer in cm gives 7200; halving the sphere volume wrongly gives 36 m.)`, r`অর্থাৎ $7200$ cm $= 72$ m। (উত্তর cm-এ রাখলে 7200 আসে; গোলকের আয়তন ভুল করে অর্ধেক নিলে 36 m আসে।)`),
        ],
      },
    },
    {
      key: 'frustum',
      emoji: '🪣',
      name: t('Frustum of a cone (bucket shape)', 'শঙ্কুর ছিন্নক (বালতি আকৃতি)'),
      difficulty: 'advanced',
      typicalWording: t('“A bucket / frustum has radii R and r at the two ends and height h. Find its volume or surface area.”', '“একটি বালতি / ছিন্নকের দুই প্রান্তের ব্যাসার্ধ R ও r এবং উচ্চতা h। এর আয়তন বা তলের ক্ষেত্রফল নির্ণয় করো।”'),
      formula: t(r`Volume $= \frac{1}{3}\pi h(R^2 + r^2 + Rr)$; slant $l = \sqrt{h^2 + (R - r)^2}$; curved surface $= \pi(R + r)l$.`, r`আয়তন $= \frac{1}{3}\pi h(R^2 + r^2 + Rr)$; তির্যক $l = \sqrt{h^2 + (R - r)^2}$; বক্রতল $= \pi(R + r)l$।`),
      shortcut: t('Note R² + r² + Rr is the bracket from R³ − r³ = (R − r)(R² + Rr + r²) — remembering that identity rebuilds the frustum formula as big cone minus small cone.', 'মনে রাখো R² + r² + Rr হল R³ − r³ = (R − r)(R² + Rr + r²) অভেদের বন্ধনী — এই অভেদটি মনে রাখলেই ছিন্নকের সূত্র বড় শঙ্কু বিয়োগ ছোটো শঙ্কু হিসেবে ফিরে আসে।'),
      trap: t('The volume bracket needs all three terms R², r² AND Rr, and the slant height uses the DIFFERENCE (R − r), not the sum.', 'আয়তনের বন্ধনীতে তিনটি পদই লাগে — R², r² এবং Rr, আর তির্যক উচ্চতায় যোগফল নয়, অন্তর (R − r) লাগে।'),
      spot: t(
        'A **bucket-shaped** solid — a cone with its top cut off — with **two different radii** R and r and a height h.',
        '**বালতি আকৃতির** ঘনবস্তু — উপরের অংশ কাটা শঙ্কু — যার **দুটি ভিন্ন ব্যাসার্ধ** R ও r এবং উচ্চতা h দেওয়া।',
      ),
      method: [
        t('Identify the two end radii R (bigger) and r (smaller) and the vertical height h.', 'দুই প্রান্তের ব্যাসার্ধ R (বড়) ও r (ছোটো) এবং উল্লম্ব উচ্চতা h চিহ্নিত করো।'),
        t(r`Compute the bracket $R^2 + r^2 + Rr$ once and reuse it.`, r`বন্ধনী $R^2 + r^2 + Rr$ একবার বের করে আবার ব্যবহার করো।`),
        t(r`Volume $= \frac{1}{3}\pi h(R^2 + r^2 + Rr)$; for surface, first get $l = \sqrt{h^2 + (R - r)^2}$, then CSA $= \pi(R + r)l$.`, r`আয়তন $= \frac{1}{3}\pi h(R^2 + r^2 + Rr)$; তলের জন্য আগে $l = \sqrt{h^2 + (R - r)^2}$ বের করো, তারপর বক্রতল $= \pi(R + r)l$।`),
      ],
      example: {
        question: t(
          'A frustum has radii 14 cm and 7 cm at its two ends and a height of 6 cm. Find its volume.',
          'একটি ছিন্নকের দুই প্রান্তের ব্যাসার্ধ 14 cm ও 7 cm এবং উচ্চতা 6 cm। এর আয়তন নির্ণয় করো।',
        ),
        steps: [
          t(r`Bracket: $R^2 + r^2 + Rr = 196 + 49 + 98 = 343$.`, r`বন্ধনী: $R^2 + r^2 + Rr = 196 + 49 + 98 = 343$।`),
          t(r`Volume $= \frac{1}{3} \times \frac{22}{7} \times 6 \times 343$.`, r`আয়তন $= \frac{1}{3} \times \frac{22}{7} \times 6 \times 343$।`),
          t(r`$= 22 \times 49 \times 2 = 2156$ cm³.`, r`অর্থাৎ $22 \times 49 \times 2 = 2156$ ঘন cm।`),
        ],
        answer: t('2156 cm³', '2156 ঘন cm'),
      },
      tryIt: {
        question: t(
          'A frustum has end radii 14 cm and 7 cm and height 3 cm. What is its volume in cm³?',
          'একটি ছিন্নকের প্রান্তের ব্যাসার্ধ 14 cm ও 7 cm এবং উচ্চতা 3 cm। এর আয়তন কত ঘন cm?',
        ),
        options: [t('1078', '1078'), t('2156', '2156'), t('539', '539'), t('1617', '1617')],
        correct: 0,
        explanation: [
          t(r`Bracket: $14^2 + 7^2 + 14 \times 7 = 196 + 49 + 98 = 343$.`, r`বন্ধনী: $14^2 + 7^2 + 14 \times 7 = 196 + 49 + 98 = 343$।`),
          t(r`Volume $= \frac{1}{3} \times \frac{22}{7} \times 3 \times 343 = 22 \times 49 = 1078$ cm³.`, r`আয়তন $= \frac{1}{3} \times \frac{22}{7} \times 3 \times 343 = 22 \times 49 = 1078$ ঘন cm।`),
          t('(2156 uses double the height; dropping the Rr term shrinks the bracket and the answer.)', '(2156 এলে দ্বিগুণ উচ্চতা নেওয়া হয়েছে; Rr পদ বাদ দিলে বন্ধনী ও উত্তর দুটোই ছোটো হয়।)'),
        ],
      },
    },
    {
      key: 'water_rise_immersion',
      emoji: '🌊',
      name: t('Water level rises when a solid is immersed', 'ঘনবস্তু ডোবালে জলের স্তর ওঠে'),
      difficulty: 'advanced',
      typicalWording: t('“A solid is dropped into a vessel of water. By how much does the water level rise?”', '“একটি ঘনবস্তু জলভরা পাত্রে ফেলা হল। জলের স্তর কতটা উঠবে?”'),
      formula: t(r`Rise $=$ volume of immersed solid $\div$ base area of the vessel (water spreads over the vessel's base).`, r`উত্থান $=$ ডোবানো ঘনবস্তুর আয়তন $\div$ পাত্রের ভূমির ক্ষেত্রফল (জল পাত্রের ভূমি জুড়ে ছড়িয়ে থাকে)।`),
      shortcut: t('Think of the risen water as a thin slab: its volume is exactly the solid’s volume, so rise = solid volume ÷ base area in one division.', 'উঠে আসা জলকে একটি পাতলা স্তর ভাবো: তার আয়তন ঠিক ঘনবস্তুর আয়তনের সমান, তাই উত্থান = ঘনবস্তুর আয়তন ÷ ভূমির ক্ষেত্রফল, একটিমাত্র ভাগে।'),
      trap: t('Divide by the base area of the VESSEL, not of the solid, and only the submerged part of the solid displaces water.', 'পাত্রের ভূমির ক্ষেত্রফল দিয়ে ভাগ করো, ঘনবস্তুর ভূমি দিয়ে নয়, আর ঘনবস্তুর শুধু ডোবা অংশই জল সরায়।'),
      spot: t(
        'A solid is **fully immersed** in water in a tank or cylindrical vessel, and the **rise in the water level** is asked.',
        'একটি ঘনবস্তু ট্যাঙ্ক বা বেলনাকার পাত্রের জলে **সম্পূর্ণ ডোবানো** হয়, আর **জলের স্তর কতটা উঠবে** তা জানতে চাওয়া হয়।',
      ),
      method: [
        t('Find the volume of the immersed solid — this equals the volume of water displaced.', 'ডোবানো ঘনবস্তুর আয়তন বের করো — এটাই সরে যাওয়া জলের আয়তনের সমান।'),
        t('Find the base area of the vessel (l × b for a tank, πR² for a cylindrical vessel).', 'পাত্রের ভূমির ক্ষেত্রফল বের করো (ট্যাঙ্কের জন্য l × b, বেলনাকার পাত্রের জন্য πR²)।'),
        t('Rise = volume of solid ÷ base area of vessel.', 'উত্থান = ঘনবস্তুর আয়তন ÷ পাত্রের ভূমির ক্ষেত্রফল।'),
      ],
      example: {
        question: t(
          'A cube of side 10 cm is fully immersed in a rectangular tank whose base is 20 cm by 10 cm. By how much does the water level rise?',
          '10 cm ধারবিশিষ্ট একটি ঘনককে 20 cm × 10 cm ভূমির একটি আয়তাকার ট্যাঙ্কের জলে সম্পূর্ণ ডোবানো হল। জলের স্তর কতটা উঠবে?',
        ),
        steps: [
          t(r`Volume of the cube $= 10^3 = 1000$ cm³ — this is the water displaced.`, r`ঘনকের আয়তন $= 10^3 = 1000$ ঘন cm — এটাই সরে যাওয়া জলের পরিমাণ।`),
          t(r`Base area of the tank $= 20 \times 10 = 200$ cm².`, r`ট্যাঙ্কের ভূমির ক্ষেত্রফল $= 20 \times 10 = 200$ বর্গ cm।`),
          t(r`Rise $= 1000 \div 200 = 5$ cm.`, r`উত্থান $= 1000 \div 200 = 5$ cm।`),
        ],
        answer: t('5 cm', '5 cm উঠবে'),
      },
      tryIt: {
        question: t(
          'A solid cylinder of radius 7 cm and height 8 cm is fully immersed in a cylindrical vessel of radius 14 cm containing water. By how much (in cm) does the water level rise?',
          '7 cm ব্যাসার্ধ ও 8 cm উচ্চতার একটি নিরেট বেলনকে 14 cm ব্যাসার্ধের জলভরা বেলনাকার পাত্রে সম্পূর্ণ ডোবানো হল। জলের স্তর কত cm উঠবে?',
        ),
        options: [t('4', '4'), t('2', '2'), t('8', '8'), t('1', '1')],
        correct: 1,
        explanation: [
          t(r`Volume of the solid $= \pi \times 7^2 \times 8 = 392\pi$ cm³.`, r`ঘনবস্তুর আয়তন $= \pi \times 7^2 \times 8 = 392\pi$ ঘন cm।`),
          t(r`Base area of the vessel $= \pi \times 14^2 = 196\pi$ cm².`, r`পাত্রের ভূমির ক্ষেত্রফল $= \pi \times 14^2 = 196\pi$ বর্গ cm।`),
          t(r`Rise $= 392\pi \div 196\pi = 2$ cm. (Dividing by the solid's own base area wrongly gives 8.)`, r`উত্থান $= 392\pi \div 196\pi = 2$ cm। (ঘনবস্তুর নিজের ভূমি দিয়ে ভাগ করলে ভুল করে 8 আসে।)`),
        ],
      },
    },
    {
      key: 'wire_bent_shapes',
      emoji: '〰️',
      name: t('Wire bent from one shape to another (perimeter conserved)', 'এক আকৃতি থেকে বাঁকিয়ে অন্য আকৃতি (পরিসীমা সংরক্ষিত)'),
      difficulty: 'intermediate',
      typicalWording: t('A wire in the form of a circle of radius 14 cm is bent into a square. Find the area of the square.', '14 cm ব্যাসার্ধের বৃত্তের আকারে থাকা একটি তার বাঁকিয়ে বর্গক্ষেত্র বানানো হল। বর্গক্ষেত্রটির ক্ষেত্রফল নির্ণয় করো।'),
      formula: t(r`Length of wire is conserved: circumference $=$ perimeter of the new shape. Circle: $2\pi r$; square: $4 \times side$; rectangle: $2(l + b)$.`, r`তারের দৈর্ঘ্য সংরক্ষিত থাকে: পরিধি $=$ নতুন আকৃতির পরিসীমা। বৃত্ত: $2\pi r$; বর্গক্ষেত্র: $4 \times বাহু$; আয়তক্ষেত্র: $2(l + b)$।`),
      shortcut: t(r`Areas are NOT conserved — for the same perimeter, a circle encloses more area than a square ($616$ cm² vs $484$ cm² in the example), a favourite comparison question.`, r`ক্ষেত্রফল সংরক্ষিত থাকে না — একই পরিসীমায় বৃত্ত বর্গক্ষেত্রের চেয়ে বেশি ক্ষেত্রফল ঘিরে রাখে (উদাহরণে $616$ বর্গ cm বনাম $484$ বর্গ cm), যা একটি প্রিয় তুলনামূলক প্রশ্ন।`),
      trap: t('Equating the two AREAS instead of the two perimeters — bending changes the shape, so only the boundary length (the wire) stays the same.', 'দুটি ক্ষেত্রফল সমান ধরা, পরিসীমার বদলে — বাঁকালে আকৃতি বদলায়, তাই শুধু সীমানার দৈর্ঘ্য (তার) একই থাকে।'),
      spot: t('A wire, rope or frame is reshaped from one figure into another — nothing is added or cut off.', 'একটি তার, দড়ি বা কাঠামো এক আকৃতি থেকে অন্য আকৃতিতে বদলানো হয় — কিছু যোগ বা কাটা হয় না।'),
      method: [
        t('Find the perimeter/circumference of the original shape — that is the wire length.', 'আসল আকৃতির পরিসীমা/পরিধি নির্ণয় করো — সেটাই তারের দৈর্ঘ্য।'),
        t('Set the new shape\u2019s perimeter equal to that length and solve for its unknown side or radius.', 'নতুন আকৃতির পরিসীমাকে সেই দৈর্ঘ্যের সমান ধরে তার অজানা বাহু বা ব্যাসার্ধ বের করো।'),
        t('Now compute whatever is asked (usually the new area) from that side or radius.', 'এবার সেই বাহু বা ব্যাসার্ধ থেকে যা চাওয়া হয়েছে (সাধারণত নতুন ক্ষেত্রফল) হিসাব করো।'),
      ],
      example: {
        question: t('A wire is bent in the form of a circle of radius 14 cm. It is re-bent into a square. Find the area of the square.', 'একটি তার 14 cm ব্যাসার্ধের বৃত্তের আকারে বাঁকানো আছে। সেটিকে আবার বাঁকিয়ে বর্গক্ষেত্র বানানো হল। বর্গক্ষেত্রের ক্ষেত্রফল নির্ণয় করো।'),
        steps: [
          t('Wire length = circumference = 2 × (22/7) × 14 = 88 cm.', 'তারের দৈর্ঘ্য = পরিধি = 2 × (22/7) × 14 = 88 cm।'),
          t('Square side = 88 ÷ 4 = 22 cm.', 'বর্গক্ষেত্রের বাহু = 88 ÷ 4 = 22 cm।'),
          t('Area of the square = 22² = 484 cm². (The circle\u2019s area was 616 cm² — area is not conserved.)', 'বর্গক্ষেত্রের ক্ষেত্রফল = 22² = 484 বর্গ cm। (বৃত্তের ক্ষেত্রফল ছিল 616 বর্গ cm — ক্ষেত্রফল সংরক্ষিত থাকে না।)'),
        ],
        answer: t('484 cm²', '484 বর্গ cm'),
      },
      tryIt: {
        question: t('A wire is first bent into a square of side 44 cm, then re-bent into a circle. The area of the circle is:', 'একটি তার প্রথমে 44 cm বাহুর বর্গক্ষেত্রে বাঁকানো হল, তারপর আবার বাঁকিয়ে বৃত্ত বানানো হল। বৃত্তের ক্ষেত্রফল হল:'),
        options: [t('1936 cm²', '1936 বর্গ cm'), t('2464 cm²', '2464 বর্গ cm'), t('616 cm²', '616 বর্গ cm'), t('1232 cm²', '1232 বর্গ cm')],
        correct: 1,
        explanation: [
          t('Wire length = perimeter of the square = 4 × 44 = 176 cm.', 'তারের দৈর্ঘ্য = বর্গক্ষেত্রের পরিসীমা = 4 × 44 = 176 cm।'),
          t('Circle radius: 2 × (22/7) × r = 176, so r = 28 cm.', 'বৃত্তের ব্যাসার্ধ: 2 × (22/7) × r = 176, তাই r = 28 cm।'),
          t('Area = (22/7) × 28² = 2464 cm² — larger than the square\u2019s 1936 cm², as expected. (1936 cm² is the square\u2019s area, the trap.)', 'ক্ষেত্রফল = (22/7) × 28² = 2464 বর্গ cm — প্রত্যাশামতো বর্গক্ষেত্রের 1936 বর্গ cm-এর চেয়ে বড়। (1936 বর্গ cm হল বর্গক্ষেত্রের ক্ষেত্রফল, ফাঁদ।)'),
        ],
      },
    },
    {
      key: 'inscribed_circumscribed',
      emoji: '🔘',
      name: t('Largest circle in a square / square in a circle', 'বর্গক্ষেত্রের ভিতরে বৃহত্তম বৃত্ত / বৃত্তের ভিতরে বর্গক্ষেত্র'),
      difficulty: 'advanced',
      typicalWording: t('Find the area of the largest circle that can be drawn inside a square of side 14 cm. / A square is inscribed in a circle of radius 10 cm; find its area.', '14 cm বাহুর বর্গক্ষেত্রের ভিতরে আঁকা যায় এমন বৃহত্তম বৃত্তের ক্ষেত্রফল নির্ণয় করো। / 10 cm ব্যাসার্ধের বৃত্তের ভিতরে একটি বর্গক্ষেত্র অন্তর্লিখিত আছে; তার ক্ষেত্রফল নির্ণয় করো।'),
      formula: t(r`Circle inside square: diameter $=$ side, so $r = \frac{a}{2}$. Square inside circle: diagonal $=$ diameter, so side $= r\sqrt{2}$ and area $= 2r^2$.`, r`বর্গক্ষেত্রের ভিতরে বৃত্ত: ব্যাস $=$ বাহু, তাই $r = \frac{a}{2}$। বৃত্তের ভিতরে বর্গক্ষেত্র: কর্ণ $=$ ব্যাস, তাই বাহু $= r\sqrt{2}$ এবং ক্ষেত্রফল $= 2r^2$।`),
      shortcut: t(r`For the inscribed square skip the side entirely: area $= \frac{(diagonal)^2}{2} = \frac{(2r)^2}{2} = 2r^2$.`, r`অন্তর্লিখিত বর্গক্ষেত্রের জন্য বাহু পুরোপুরি বাদ দাও: ক্ষেত্রফল $= \frac{(কর্ণ)^2}{2} = \frac{(2r)^2}{2} = 2r^2$।`),
      trap: t(r`For a square inside a circle, using the radius as the side (area $r^2$) or the diameter as the side (area $4r^2$) — the diameter is the DIAGONAL, not a side.`, r`বৃত্তের ভিতরের বর্গক্ষেত্রের জন্য ব্যাসার্ধকে বাহু (ক্ষেত্রফল $r^2$) বা ব্যাসকে বাহু (ক্ষেত্রফল $4r^2$) ধরা — ব্যাস হল কর্ণ, বাহু নয়।`),
      spot: t('One shape is fitted exactly inside another — "largest circle in a square", "square inscribed in a circle", often asking for the leftover area.', 'একটি আকৃতি ঠিকঠাক অন্যটির ভিতরে বসানো — "বর্গক্ষেত্রে বৃহত্তম বৃত্ত", "বৃত্তে অন্তর্লিখিত বর্গক্ষেত্র", প্রায়ই অবশিষ্ট ক্ষেত্রফল চাওয়া হয়।'),
      method: [
        t('Find the linking length: for circle-in-square it is side = diameter; for square-in-circle it is diagonal = diameter.', 'সংযোগকারী দৈর্ঘ্যটি বের করো: বর্গে-বৃত্তের জন্য বাহু = ব্যাস; বৃত্তে-বর্গের জন্য কর্ণ = ব্যাস।'),
        t('Get the inner shape\u2019s radius or side from that link.', 'সেই সংযোগ থেকে ভিতরের আকৃতির ব্যাসার্ধ বা বাহু বের করো।'),
        t('Compute the asked area — and subtract if the leftover (outer − inner) area is asked.', 'চাওয়া ক্ষেত্রফল হিসাব করো — অবশিষ্ট (বাইরের − ভিতরের) ক্ষেত্রফল চাইলে বিয়োগ করো।'),
      ],
      example: {
        question: t('Find the area of the largest circle that can be drawn inside a square of side 14 cm.', '14 cm বাহুর বর্গক্ষেত্রের ভিতরে আঁকা যায় এমন বৃহত্তম বৃত্তের ক্ষেত্রফল নির্ণয় করো।'),
        steps: [
          t('The largest circle touches all four sides, so its diameter = side = 14 cm and r = 7 cm.', 'বৃহত্তম বৃত্ত চারটি বাহুকেই স্পর্শ করে, তাই তার ব্যাস = বাহু = 14 cm এবং r = 7 cm।'),
          t('Area = (22/7) × 7² = 154 cm².', 'ক্ষেত্রফল = (22/7) × 7² = 154 বর্গ cm।'),
          t('Leftover area, if asked = 14² − 154 = 196 − 154 = 42 cm².', 'অবশিষ্ট ক্ষেত্রফল, চাইলে = 14² − 154 = 196 − 154 = 42 বর্গ cm।'),
        ],
        answer: t('154 cm²', '154 বর্গ cm'),
      },
      tryIt: {
        question: t('A square is inscribed in a circle of radius 10 cm. The area of the square is:', '10 cm ব্যাসার্ধের একটি বৃত্তে একটি বর্গক্ষেত্র অন্তর্লিখিত আছে। বর্গক্ষেত্রটির ক্ষেত্রফল হল:'),
        options: [t('100 cm²', '100 বর্গ cm'), t('200 cm²', '200 বর্গ cm'), t('400 cm²', '400 বর্গ cm'), t('314 cm²', '314 বর্গ cm')],
        correct: 1,
        explanation: [
          t('The diagonal of the square = diameter = 20 cm.', 'বর্গক্ষেত্রের কর্ণ = ব্যাস = 20 cm।'),
          t('Area = diagonal² ÷ 2 = 400 ÷ 2 = 200 cm². (400 cm² treats the diameter as a side; 314 cm² is the circle\u2019s area.)', 'ক্ষেত্রফল = কর্ণ² ÷ 2 = 400 ÷ 2 = 200 বর্গ cm। (400 বর্গ cm ব্যাসকে বাহু ধরে; 314 বর্গ cm হল বৃত্তের ক্ষেত্রফল।)'),
        ],
      },
    },
  ],
};
