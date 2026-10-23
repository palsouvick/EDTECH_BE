'use strict';

const t = (en, bn) => ({ en, bn });

const OPTS = [
  t('Only I follows', 'কেবল I অনুসরণ করে'),
  t('Only II follows', 'কেবল II অনুসরণ করে'),
  t('Both I and II follow', 'I ও II দুটোই অনুসরণ করে'),
  t('Neither I nor II follows', 'I বা II কোনোটিই অনুসরণ করে না'),
];

module.exports = {
  subject: 'reasoning',
  topic: 'syllogism',
  patterns: [
    {
      key: 'all_all',
      emoji: '⭕',
      name: t(`"All + All" statements`, `"সব + সব" বিবৃতি`),
      spot: t(
        `Both statements start with "All", e.g. "All cats are animals. All animals are living things."`,
        `দুটো বিবৃতিই "সব" দিয়ে শুরু, যেমন "সব বিড়াল প্রাণী। সব প্রাণী জীব।"`,
      ),
      method: [
        t(`Draw circles inside circles: "All A are B" means the A circle sits fully inside the B circle.`, `বৃত্তের ভিতরে বৃত্ত আঁকো: "সব A হল B" মানে A-বৃত্ত পুরোটা B-বৃত্তের ভিতরে।`),
        t(`A conclusion follows only if it is true in your diagram **and** in every other possible diagram.`, `সিদ্ধান্ত তখনই অনুসরণ করে যখন তা তোমার ছবিতে **এবং** সম্ভাব্য সব ছবিতে সত্যি।`),
        t(`"All A are B" never means "All B are A" (all cats are animals, but not all animals are cats). It does give "Some B are A".`, `"সব A হল B" মানে কখনোই "সব B হল A" নয় (সব বিড়াল প্রাণী, কিন্তু সব প্রাণী বিড়াল নয়)। তবে এ থেকে "কিছু B হল A" পাওয়া যায়।`),
      ],
      example: {
        question: t(
          `Statements: All cats are animals. All animals are living things.\nConclusions: I. All cats are living things. II. All living things are cats.`,
          `বিবৃতি: সব বিড়াল প্রাণী। সব প্রাণী জীব।\nসিদ্ধান্ত: I. সব বিড়াল জীব। II. সব জীব বিড়াল।`,
        ),
        steps: [
          t(`Draw: cats circle inside animals circle, animals circle inside living-things circle.`, `আঁকো: বিড়াল-বৃত্ত প্রাণী-বৃত্তের ভিতরে, প্রাণী-বৃত্ত জীব-বৃত্তের ভিতরে।`),
          t(`The cats circle is inside living things, so I follows.`, `বিড়াল-বৃত্ত জীব-বৃত্তের ভিতরে, তাই I অনুসরণ করে।`),
          t(`The living-things circle is bigger than the cats circle (plants, birds ...), so II does not follow.`, `জীব-বৃত্ত বিড়াল-বৃত্তের চেয়ে অনেক বড় (গাছ, পাখি ...), তাই II অনুসরণ করে না।`),
        ],
        answer: t(`Only I follows`, `উত্তর: কেবল I অনুসরণ করে`),
      },
      tryIt: {
        question: t(
          `Statements: All pens are books. All books are bags.\nConclusions: I. Some bags are pens. II. All bags are books.`,
          `বিবৃতি: সব কলম বই। সব বই ব্যাগ।\nসিদ্ধান্ত: I. কিছু ব্যাগ কলম। II. সব ব্যাগ বই।`,
        ),
        options: OPTS,
        correct: 0,
        explanation: [
          t(`Pens circle is inside books, and books circle is inside bags.`, `কলম-বৃত্ত বইয়ের ভিতরে, আর বই-বৃত্ত ব্যাগের ভিতরে।`),
          t(`All pens are bags, so some bags (the pen part) are pens: I follows.`, `সব কলম ব্যাগ, তাই কিছু ব্যাগ (কলমের অংশটা) কলম: I অনুসরণ করে।`),
          t(`The bags circle can be bigger than the books circle, so "All bags are books" is not certain: II does not follow.`, `ব্যাগ-বৃত্ত বই-বৃত্তের চেয়ে বড় হতে পারে, তাই "সব ব্যাগ বই" নিশ্চিত নয়: II অনুসরণ করে না।`),
        ],
      },
    },
    {
      key: 'some_all',
      emoji: '🔗',
      name: t(`"Some + All" statements`, `"কিছু + সব" বিবৃতি`),
      spot: t(
        `One statement says "Some A are B" and the next says "All B are C".`,
        `একটা বিবৃতি বলে "কিছু A হল B" আর পরেরটা বলে "সব B হল C"।`,
      ),
      method: [
        t(`Draw A and B as two overlapping circles; then put the whole B circle inside a bigger C circle.`, `A আর B-কে দুটি পরস্পরছেদী বৃত্ত হিসেবে আঁকো; তারপর পুরো B-বৃত্তটাকে একটা বড় C-বৃত্তের ভিতরে রাখো।`),
        t(`The shared part of A and B is now inside C, so "Some A are C" always follows.`, `A আর B-এর সাধারণ অংশটা এখন C-এর ভিতরে, তাই "কিছু A হল C" সবসময় অনুসরণ করে।`),
        t(`"Some A are C" and "Some C are A" mean the same thing: if one follows, the other follows too.`, `"কিছু A হল C" আর "কিছু C হল A" একই কথা: একটা অনুসরণ করলে অন্যটাও করে।`),
        t(`Careful: the order matters. "All A are B, Some B are C" gives **no** definite link between A and C.`, `সাবধান: ক্রম গুরুত্বপূর্ণ। "সব A হল B, কিছু B হল C" থেকে A আর C-এর মধ্যে **কোনো** নিশ্চিত সম্পর্ক পাওয়া যায় না।`),
      ],
      example: {
        question: t(
          `Statements: Some boys are players. All players are tall.\nConclusions: I. Some boys are tall. II. All tall people are boys.`,
          `বিবৃতি: কিছু ছেলে খেলোয়াড়। সব খেলোয়াড় লম্বা।\nসিদ্ধান্ত: I. কিছু ছেলে লম্বা। II. সব লম্বা মানুষ ছেলে।`,
        ),
        steps: [
          t(`Boys and players overlap; the players circle sits inside the tall circle.`, `ছেলে আর খেলোয়াড় বৃত্ত পরস্পর ছেদ করে; খেলোয়াড়-বৃত্ত লম্বা-বৃত্তের ভিতরে।`),
          t(`The boys who are players are inside "tall", so some boys are tall: I follows.`, `যে ছেলেরা খেলোয়াড়, তারা "লম্বা"-র ভিতরে, তাই কিছু ছেলে লম্বা: I অনুসরণ করে।`),
          t(`Tall people may include girls and others, so II does not follow.`, `লম্বা মানুষের মধ্যে মেয়েরা বা অন্যরাও থাকতে পারে, তাই II অনুসরণ করে না।`),
        ],
        answer: t(`Only I follows`, `উত্তর: কেবল I অনুসরণ করে`),
      },
      tryIt: {
        question: t(
          `Statements: Some cups are plates. All plates are spoons.\nConclusions: I. Some cups are spoons. II. Some spoons are cups.`,
          `বিবৃতি: কিছু কাপ প্লেট। সব প্লেট চামচ।\nসিদ্ধান্ত: I. কিছু কাপ চামচ। II. কিছু চামচ কাপ।`,
        ),
        options: OPTS,
        correct: 2,
        explanation: [
          t(`The cups that are plates are inside the spoons circle, so some cups are spoons: I follows.`, `যে কাপগুলো প্লেট, সেগুলো চামচ-বৃত্তের ভিতরে, তাই কিছু কাপ চামচ: I অনুসরণ করে।`),
          t(`"Some spoons are cups" is the same fact read the other way, so II also follows.`, `"কিছু চামচ কাপ" একই কথা উল্টো দিক থেকে পড়া, তাই II-ও অনুসরণ করে।`),
          t(`So both follow. (Choosing "Only I" is the common mistake.)`, `তাই দুটোই অনুসরণ করে। ("কেবল I" বাছাই হল সাধারণ ভুল।)`),
        ],
      },
    },
    {
      key: 'negative_no',
      emoji: '🚫',
      name: t(`Statements with "No"`, `"কোনো ... নয়" বিবৃতি`),
      spot: t(
        `One statement says "No A is B" (two circles that do not touch at all).`,
        `একটা বিবৃতি বলে "কোনো A, B নয়" (দুটি বৃত্ত যারা একদম ছোঁয় না)।`,
      ),
      method: [
        t(`Draw "No A is B" as two separate circles with a gap between them.`, `"কোনো A, B নয়" আঁকো দুটি আলাদা বৃত্ত হিসেবে, মাঝখানে ফাঁক রেখে।`),
        t(`"All C are A" + "No A is B" gives "No C is B" (C sits inside A, far from B).`, `"সব C হল A" + "কোনো A, B নয়" থেকে পাওয়া যায় "কোনো C, B নয়" (C আছে A-এর ভিতরে, B থেকে দূরে)।`),
        t(`"Some C are A" + "No A is B" gives only "Some C are not B"; it does **not** give "No C is B".`, `"কিছু C হল A" + "কোনো A, B নয়" থেকে শুধু পাওয়া যায় "কিছু C, B নয়"; এ থেকে "কোনো C, B নয়" **পাওয়া যায় না**।`),
      ],
      example: {
        question: t(
          `Statements: No fruit is a vegetable. All apples are fruits.\nConclusions: I. No apple is a vegetable. II. Some vegetables are apples.`,
          `বিবৃতি: কোনো ফল সবজি নয়। সব আপেল ফল।\nসিদ্ধান্ত: I. কোনো আপেল সবজি নয়। II. কিছু সবজি আপেল।`,
        ),
        steps: [
          t(`Fruits and vegetables are two separate circles. The apples circle is inside fruits.`, `ফল আর সবজি দুটি আলাদা বৃত্ত। আপেল-বৃত্ত ফলের ভিতরে।`),
          t(`Apples can never touch vegetables, so I follows and II does not.`, `আপেল কখনো সবজিকে ছুঁতে পারে না, তাই I অনুসরণ করে আর II করে না।`),
        ],
        answer: t(`Only I follows`, `উত্তর: কেবল I অনুসরণ করে`),
      },
      tryIt: {
        question: t(
          `Statements: Some actors are singers. No singer is a dancer.\nConclusions: I. No actor is a dancer. II. Some actors are not dancers.`,
          `বিবৃতি: কিছু অভিনেতা গায়ক। কোনো গায়ক নর্তক নয়।\nসিদ্ধান্ত: I. কোনো অভিনেতা নর্তক নয়। II. কিছু অভিনেতা নর্তক নয়।`,
        ),
        options: OPTS,
        correct: 1,
        explanation: [
          t(`Actors and singers overlap; singers and dancers do not touch.`, `অভিনেতা আর গায়ক বৃত্ত ছেদ করে; গায়ক আর নর্তক বৃত্ত ছোঁয় না।`),
          t(`The actors who are singers can never be dancers, so some actors are not dancers: II follows.`, `যে অভিনেতারা গায়ক, তারা কখনো নর্তক হতে পারে না, তাই কিছু অভিনেতা নর্তক নয়: II অনুসরণ করে।`),
          t(`Other actors (not singers) may still be dancers, so "No actor is a dancer" is not certain: I does not follow.`, `অন্য অভিনেতারা (যারা গায়ক নয়) নর্তক হতেই পারে, তাই "কোনো অভিনেতা নর্তক নয়" নিশ্চিত নয়: I অনুসরণ করে না।`),
        ],
      },
    },
    {
      key: 'possibility',
      emoji: '🤔',
      name: t(`Possibility conclusions ("... is a possibility")`, `সম্ভাবনার সিদ্ধান্ত ("... হওয়ার সম্ভাবনা আছে")`),
      spot: t(
        `A conclusion says "... is a possibility" or "... can be true" (common in Banking exams).`,
        `কোনো সিদ্ধান্তে লেখা থাকে "... হওয়ার সম্ভাবনা আছে" বা "... সত্যি হতে পারে" (ব্যাঙ্কের পরীক্ষায় খুব আসে)।`,
      ),
      method: [
        t(`A normal conclusion must be true in **every** diagram.`, `সাধারণ সিদ্ধান্তকে **সব** ছবিতেই সত্যি হতে হবে।`),
        t(`A possibility conclusion only needs **one** diagram where it can be true, without breaking any statement.`, `সম্ভাবনার সিদ্ধান্তের জন্য শুধু **একটা** ছবি লাগে যেখানে তা সত্যি হতে পারে, কোনো বিবৃতি না ভেঙে।`),
        t(`A possibility fails if a statement (or a definite conclusion) already says the opposite, e.g. "No A is B" kills "All A being B is possible".`, `কোনো বিবৃতি (বা নিশ্চিত সিদ্ধান্ত) যদি আগে থেকেই উল্টো কথা বলে, তবে সম্ভাবনা বাতিল, যেমন "কোনো A, B নয়" থাকলে "সব A, B হওয়ার সম্ভাবনা" বাতিল।`),
      ],
      example: {
        question: t(
          `Statements: All roses are flowers. Some flowers are red.\nConclusions: I. Some roses are red. II. Some roses being red is a possibility.`,
          `বিবৃতি: সব গোলাপ ফুল। কিছু ফুল লাল।\nসিদ্ধান্ত: I. কিছু গোলাপ লাল। II. কিছু গোলাপ লাল হওয়ার সম্ভাবনা আছে।`,
        ),
        steps: [
          t(`Roses are inside flowers; red overlaps flowers. The red part may or may not touch the roses.`, `গোলাপ ফুলের ভিতরে; লাল-বৃত্ত ফুলকে ছেদ করে। লাল অংশ গোলাপকে ছুঁতেও পারে, না-ও পারে।`),
          t(`So "Some roses are red" is not certain: I does not follow.`, `তাই "কিছু গোলাপ লাল" নিশ্চিত নয়: I অনুসরণ করে না।`),
          t(`But we can draw red touching roses without breaking any statement, so II follows.`, `কিন্তু কোনো বিবৃতি না ভেঙেই লালকে গোলাপ ছুঁয়ে আঁকা যায়, তাই II অনুসরণ করে।`),
        ],
        answer: t(`Only II follows`, `উত্তর: কেবল II অনুসরণ করে`),
      },
      tryIt: {
        question: t(
          `Statements: No book is a pen. All pens are erasers.\nConclusions: I. Some erasers are not books. II. All erasers being books is a possibility.`,
          `বিবৃতি: কোনো বই কলম নয়। সব কলম রবার।\nসিদ্ধান্ত: I. কিছু রবার বই নয়। II. সব রবার বই হওয়ার সম্ভাবনা আছে।`,
        ),
        options: OPTS,
        correct: 0,
        explanation: [
          t(`Pens are inside erasers, and pens never touch books.`, `কলম রবারের ভিতরে, আর কলম কখনো বইকে ছোঁয় না।`),
          t(`The pen part of erasers is not books, so "Some erasers are not books" is definite: I follows.`, `রবারের যে অংশটা কলম, সেটা বই নয়, তাই "কিছু রবার বই নয়" নিশ্চিত: I অনুসরণ করে।`),
          t(`Since some erasers are surely not books, "all erasers are books" can never happen: II does not follow.`, `যেহেতু কিছু রবার নিশ্চিতভাবেই বই নয়, "সব রবার বই" কখনো হতে পারে না: II অনুসরণ করে না।`),
        ],
      },
    },
    {
      key: 'either_or',
      emoji: '⚖️',
      name: t(`Either I or II follows (complementary pair)`, `হয় I নয় II অনুসরণ করে (পরিপূরক জোড়া)`),
      spot: t(
        `Both conclusions talk about the same two groups, one says "Some A are B" and the other "No A is B", and neither is certain alone.`,
        `দুটো সিদ্ধান্তই একই দুটি দলের কথা বলে, একটা বলে "কিছু A হল B" আর অন্যটা "কোনো A, B নয়", আর কোনোটাই একা নিশ্চিত নয়।`,
      ),
      method: [
        t(`First check each conclusion on its own. If one follows definitely, it is not an either-or case.`, `আগে প্রতিটি সিদ্ধান্ত আলাদা করে দেখো। একটা নিশ্চিতভাবে অনুসরণ করলে এটা "হয়-নয়" নয়।`),
        t(`If neither follows, check the pair: same two groups, one "Some ... are" and one "No ... is" (or "All" and "Some ... not").`, `কোনোটাই অনুসরণ না করলে জোড়াটা দেখো: একই দুটি দল, একটা "কিছু ... হল" আর একটা "কোনো ... নয়" (বা "সব" আর "কিছু ... নয়")।`),
        t(`Such a pair covers every case (the groups either meet or they do not), so the answer is "Either I or II follows".`, `এমন জোড়া সব সম্ভাবনা ঢেকে দেয় (দল দুটি হয় মেশে, নয় মেশে না), তাই উত্তর "হয় I নয় II অনুসরণ করে"।`),
      ],
      example: {
        question: t(
          `Statements: Some pens are pencils. Some pencils are erasers.\nConclusions: I. Some pens are erasers. II. No pen is an eraser.`,
          `বিবৃতি: কিছু কলম পেনসিল। কিছু পেনসিল রবার।\nসিদ্ধান্ত: I. কিছু কলম রবার। II. কোনো কলম রবার নয়।`,
        ),
        steps: [
          t(`Pens and erasers both touch pencils, but they may or may not touch each other: neither I nor II is certain alone.`, `কলম আর রবার দুটোই পেনসিলকে ছোঁয়, কিন্তু নিজেরা ছুঁতেও পারে, না-ও পারে: I বা II কোনোটাই একা নিশ্চিত নয়।`),
          t(`I and II are about the same groups (pens, erasers), one "Some" and one "No": one of them must be true.`, `I আর II একই দলের (কলম, রবার) কথা বলে, একটা "কিছু" আর একটা "কোনো ... নয়": এদের একটা সত্যি হতেই হবে।`),
        ],
        answer: t(`Either I or II follows`, `উত্তর: হয় I নয় II অনুসরণ করে`),
      },
      tryIt: {
        question: t(
          `Statements: All chairs are tables. Some tables are fans.\nConclusions: I. Some chairs are fans. II. No chair is a fan.`,
          `বিবৃতি: সব চেয়ার টেবিল। কিছু টেবিল পাখা।\nসিদ্ধান্ত: I. কিছু চেয়ার পাখা। II. কোনো চেয়ার পাখা নয়।`,
        ),
        options: [
          t('Only I follows', 'কেবল I অনুসরণ করে'),
          t('Only II follows', 'কেবল II অনুসরণ করে'),
          t('Either I or II follows', 'হয় I নয় II অনুসরণ করে'),
          t('Neither I nor II follows', 'I বা II কোনোটিই অনুসরণ করে না'),
        ],
        correct: 2,
        explanation: [
          t(`Chairs sit inside tables; fans overlap tables. The fan part may or may not touch the chairs, so neither I nor II is certain alone.`, `চেয়ার টেবিলের ভিতরে; পাখা টেবিলকে ছেদ করে। পাখার অংশ চেয়ারকে ছুঁতেও পারে, না-ও পারে, তাই I বা II কোনোটাই একা নিশ্চিত নয়।`),
          t(`I ("Some chairs are fans") and II ("No chair is a fan") are a complementary pair: exactly one must be true.`, `I ("কিছু চেয়ার পাখা") আর II ("কোনো চেয়ার পাখা নয়") পরিপূরক জোড়া: ঠিক একটা সত্যি হবেই।`),
          t(`So the answer is "Either I or II follows", not "Neither".`, `তাই উত্তর "হয় I নয় II অনুসরণ করে", "কোনোটিই নয়" নয়।`),
        ],
      },
    },
  ],
};
