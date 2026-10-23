'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'reasoning',
  topic: 'analogy',
  patterns: [
    {
      key: 'word_pair_relation',
      emoji: '🔗',
      name: t(`Word analogy (A : B :: C : ?)`, `শব্দের সাদৃশ্য (A : B :: C : ?)`),
      spot: t(
        `Two words are joined by a colon, then a third word is given with a question mark, e.g. Bird : Nest :: Bee : ?`,
        `কোলন দিয়ে দুটি শব্দ জোড়া থাকে, তারপর তৃতীয় শব্দের পাশে প্রশ্নচিহ্ন, যেমন Bird : Nest :: Bee : ?`,
      ),
      method: [
        t(`Make a short sentence that links the first pair, e.g. "A bird lives in a nest".`, `প্রথম জোড়াকে জুড়ে একটি ছোট বাক্য বানাও, যেমন "পাখি বাসায় থাকে"।`),
        t(`Put the third word into the same sentence: "A bee lives in a ___".`, `তৃতীয় শব্দটি একই বাক্যে বসাও: "মৌমাছি ___-এ থাকে"।`),
        t(`Pick the option that fits the sentence exactly. Watch out for options that are only "connected" but not in the same way.`, `যে বিকল্প বাক্যে ঠিকঠাক বসে, সেটাই উত্তর। শুধু "সম্পর্কিত" কিন্তু একই ধরনের সম্পর্ক নয়, এমন বিকল্প থেকে সাবধান।`),
      ],
      example: {
        question: t(`Bird : Nest :: Bee : ?`, `Bird (পাখি) : Nest (বাসা) :: Bee (মৌমাছি) : ?`),
        steps: [
          t(`Sentence for the first pair: a bird lives in a nest (animal : its home).`, `প্রথম জোড়ার বাক্য: পাখি বাসায় থাকে (প্রাণী : তার বাসস্থান)।`),
          t(`Same sentence for the bee: a bee lives in a hive.`, `মৌমাছির জন্য একই বাক্য: মৌমাছি মৌচাকে (Hive) থাকে।`),
        ],
        answer: t(`Hive`, `উত্তর: Hive (মৌচাক)`),
      },
      tryIt: {
        question: t(`Carpenter : Saw :: Surgeon : ?`, `Carpenter (ছুতোর) : Saw (করাত) :: Surgeon (শল্যচিকিৎসক) : ?`),
        options: [t('Hospital', 'Hospital (হাসপাতাল)'), t('Scalpel', 'Scalpel (স্ক্যালপেল)'), t('Patient', 'Patient (রোগী)'), t('Doctor', 'Doctor (ডাক্তার)')],
        correct: 1,
        explanation: [
          t(`Sentence: a carpenter works with a saw (worker : tool).`, `বাক্য: ছুতোর করাত দিয়ে কাজ করে (কর্মী : যন্ত্র)।`),
          t(`A surgeon works with a scalpel. Hospital is a place, patient is a person, doctor is a similar job: none of them is a tool.`, `শল্যচিকিৎসক স্ক্যালপেল দিয়ে কাজ করেন। হাসপাতাল একটি জায়গা, রোগী একজন মানুষ, ডাক্তার প্রায় একই পেশা: কোনোটাই যন্ত্র নয়।`),
          t(`So the answer is Scalpel.`, `তাই উত্তর Scalpel।`),
        ],
      },
    },
    {
      key: 'choose_similar_pair',
      emoji: '🧩',
      name: t(`Choose the pair with the same relation`, `একই সম্পর্কের জোড়া বেছে নাও`),
      spot: t(
        `One pair is given and every option is also a pair: "Which pair has the same relationship as Thermometer : Temperature?"`,
        `একটি জোড়া দেওয়া থাকে আর প্রতিটি বিকল্পও একটি জোড়া: "কোন জোড়ার সম্পর্ক Thermometer : Temperature-এর মতো?"`,
      ),
      method: [
        t(`Make a sentence for the given pair: "A thermometer measures temperature".`, `দেওয়া জোড়ার জন্য বাক্য বানাও: "থার্মোমিটার তাপমাত্রা মাপে"।`),
        t(`Test each option with the same sentence, keeping the same order (first word does the action on the second).`, `প্রতিটি বিকল্প একই বাক্যে ফেলে দেখো, ক্রম একই রেখে (প্রথম শব্দ দ্বিতীয়টির উপর কাজ করে)।`),
        t(`Only one option fits fully; if two seem to fit, make your sentence more exact.`, `শুধু একটি বিকল্পই পুরোপুরি মেলে; দুটি মিললে বাক্যটিকে আরও নির্দিষ্ট করো।`),
      ],
      example: {
        question: t(
          `Which pair has the same relationship as Thermometer : Temperature?\n(a) Speedometer : Car (b) Barometer : Pressure (c) Clock : Wall (d) Pen : Ink`,
          `কোন জোড়ার সম্পর্ক Thermometer : Temperature-এর মতো?\n(a) Speedometer : Car (b) Barometer : Pressure (c) Clock : Wall (d) Pen : Ink`,
        ),
        steps: [
          t(`Sentence: a thermometer **measures** temperature (instrument : what it measures).`, `বাক্য: থার্মোমিটার তাপমাত্রা **মাপে** (যন্ত্র : যা মাপে)।`),
          t(`A speedometer measures speed, not the car. A clock is hung on a wall. A pen holds ink; it does not measure it.`, `স্পিডোমিটার গতি মাপে, গাড়ি নয়। ঘড়ি দেয়ালে টাঙানো থাকে। কলমে কালি ভরা থাকে, কলম কালি মাপে না।`),
          t(`A barometer measures pressure: exactly the same relation.`, `ব্যারোমিটার চাপ মাপে: হুবহু একই সম্পর্ক।`),
        ],
        answer: t(`(b) Barometer : Pressure`, `উত্তর: (b) Barometer : Pressure`),
      },
      tryIt: {
        question: t(`Which pair has the same relationship as Tree : Forest?`, `কোন জোড়ার সম্পর্ক Tree (গাছ) : Forest (বন)-এর মতো?`),
        options: [t('Fish : Water', 'Fish : Water'), t('Soldier : Army', 'Soldier : Army'), t('Teacher : School', 'Teacher : School'), t('Book : Shelf', 'Book : Shelf')],
        correct: 1,
        explanation: [
          t(`Sentence: many trees together make a forest (member : group).`, `বাক্য: অনেক গাছ মিলে একটি বন তৈরি হয় (সদস্য : দল)।`),
          t(`Many soldiers together make an army. A fish lives in water, a teacher works in a school, a book is kept on a shelf.`, `অনেক সৈনিক মিলে একটি সেনাবাহিনী হয়। মাছ জলে থাকে, শিক্ষক স্কুলে কাজ করেন, বই তাকে রাখা হয়।`),
          t(`So Soldier : Army is the answer.`, `তাই উত্তর Soldier : Army।`),
        ],
      },
    },
    {
      key: 'number_analogy',
      emoji: '🔢',
      name: t(`Number analogy (squares, cubes, ×k, n² ± 1)`, `সংখ্যার সাদৃশ্য (বর্গ, ঘন, ×k, n² ± 1)`),
      spot: t(
        `The pairs are numbers, e.g. 3 : 27 :: 5 : ?. The second number is usually made from the first by squaring, cubing, multiplying or adding a little.`,
        `জোড়াগুলি সংখ্যা, যেমন 3 : 27 :: 5 : ?। সাধারণত প্রথম সংখ্যার বর্গ, ঘন, গুণ বা সামান্য যোগ করে দ্বিতীয়টি তৈরি হয়।`,
      ),
      method: [
        t(`Check the common rules on the first pair: n², n³, n² + 1, n² − 1, n³ + 1, n × k.`, `প্রথম জোড়ায় চেনা নিয়মগুলি পরখ করো: n², n³, n² + 1, n² − 1, n³ + 1, n × k।`),
        t(`Keep a list of squares (1 to 30) and cubes (1 to 15) in your head; they make this fast.`, `১ থেকে ৩০-এর বর্গ আর ১ থেকে ১৫-এর ঘন মুখস্থ রাখো; এতে খুব তাড়াতাড়ি হয়।`),
        t(`Apply the exact same rule to the third number.`, `ঠিক একই নিয়ম তৃতীয় সংখ্যায় প্রয়োগ করো।`),
      ],
      example: {
        question: t(`3 : 27 :: 5 : ?`, `প্রশ্নচিহ্নের জায়গায় কী বসবে? 3 : 27 :: 5 : ?`),
        steps: [
          t(`27 = 3 × 3 × 3, so the rule is "cube of the number" (n³).`, `27 = 3 × 3 × 3, তাই নিয়ম হল "সংখ্যার ঘন" (n³)।`),
          t(`Cube of 5 = 5 × 5 × 5 = 125.`, `5-এর ঘন = 5 × 5 × 5 = 125।`),
        ],
        answer: t(`125`, `উত্তর: 125`),
      },
      tryIt: {
        question: t(`7 : 50 :: 9 : ?`, `প্রশ্নচিহ্নের জায়গায় কী বসবে? 7 : 50 :: 9 : ?`),
        options: [t('81', '81'), t('82', '82'), t('83', '83'), t('80', '80')],
        correct: 1,
        explanation: [
          t(`7² = 49 and 49 + 1 = 50, so the rule is n² + 1.`, `7² = 49 আর 49 + 1 = 50, তাই নিয়ম n² + 1।`),
          t(`9² = 81, then 81 + 1 = 82. (81 is the trap: you forgot the +1.)`, `9² = 81, তারপর 81 + 1 = 82। (81 হল ফাঁদ: +1 যোগ করতে ভুলে গেলে আসে।)`),
        ],
      },
    },
    {
      key: 'letter_shift_analogy',
      emoji: '🔤',
      name: t(`Letter-group analogy (fixed shift)`, `বর্ণগুচ্ছের সাদৃশ্য (নির্দিষ্ট সরণ)`),
      spot: t(
        `The pairs are groups of capital letters, e.g. CAT : DBU :: PEN : ?. Each letter moves forward or backward by the same number.`,
        `জোড়াগুলি বড় হাতের বর্ণের গুচ্ছ, যেমন CAT : DBU :: PEN : ?। প্রতিটি বর্ণ একই সংখ্যায় সামনে বা পিছনে সরে।`,
      ),
      method: [
        t(`Write the position number under each letter. Use **EJOTY** (E = 5, J = 10, O = 15, T = 20, Y = 25) to find positions fast.`, `প্রতিটি বর্ণের নিচে তার স্থান-সংখ্যা লেখো। তাড়াতাড়ি বের করতে **EJOTY** মনে রাখো (E = 5, J = 10, O = 15, T = 20, Y = 25)।`),
        t(`Find the change from each letter of the first group to the matching letter of the second (e.g. +1, +3, −2).`, `প্রথম গুচ্ছের প্রতিটি বর্ণ থেকে দ্বিতীয় গুচ্ছের মিলিয়ে থাকা বর্ণে কত সরণ হল দেখো (যেমন +1, +3, −2)।`),
        t(`Apply the same changes, in the same order, to the third group.`, `একই সরণ, একই ক্রমে, তৃতীয় গুচ্ছে প্রয়োগ করো।`),
      ],
      example: {
        question: t(`CAT : DBU :: PEN : ?`, `প্রশ্নচিহ্নের জায়গায় কী বসবে? CAT : DBU :: PEN : ?`),
        steps: [
          t(`C → D, A → B, T → U: every letter moves +1.`, `C → D, A → B, T → U: প্রতিটি বর্ণ +1 সরেছে।`),
          t(`P + 1 = Q, E + 1 = F, N + 1 = O.`, `তাই P + 1 = Q, E + 1 = F, N + 1 = O।`),
        ],
        answer: t(`QFO`, `উত্তর: QFO`),
      },
      tryIt: {
        question: t(`BDF : EGI :: JLN : ?`, `প্রশ্নচিহ্নের জায়গায় কী বসবে? BDF : EGI :: JLN : ?`),
        options: [t('LNP', 'LNP'), t('KMO', 'KMO'), t('MOQ', 'MOQ'), t('NPR', 'NPR')],
        correct: 2,
        explanation: [
          t(`B(2) → E(5), D(4) → G(7), F(6) → I(9): each letter moves +3.`, `B(2) → E(5), D(4) → G(7), F(6) → I(9): প্রতিটি বর্ণ +3 সরেছে।`),
          t(`J(10) + 3 = M(13), L(12) + 3 = O(15), N(14) + 3 = Q(17).`, `তাই J(10) + 3 = M(13), L(12) + 3 = O(15), N(14) + 3 = Q(17)।`),
          t(`So the answer is MOQ.`, `তাই উত্তর MOQ।`),
        ],
      },
    },
    {
      key: 'opposite_letter_analogy',
      emoji: '🪞',
      name: t(`Opposite-letter analogy (A ↔ Z)`, `বিপরীত বর্ণের সাদৃশ্য (A ↔ Z)`),
      spot: t(
        `Letters in the second group are far away at the other end of the alphabet, e.g. DEF : WVU. Each pair of letters adds up to 27.`,
        `দ্বিতীয় গুচ্ছের বর্ণগুলি বর্ণমালার উল্টো প্রান্তে, যেমন DEF : WVU। প্রতিটি বর্ণজোড়ার স্থান-সংখ্যার যোগফল 27।`,
      ),
      method: [
        t(`Check if position of letter + position of its partner = 27 (A–Z, B–Y, C–X, ...).`, `দেখো বর্ণের স্থান + তার জোড়ার স্থান = 27 কিনা (A–Z, B–Y, C–X, ...)।`),
        t(`Opposite of a letter = 27 − its position. Handy pairs: **AZ, BY, CX, DW, EV, FU, GT, HS, IR, JQ, KP, LO, MN**.`, `কোনো বর্ণের বিপরীত = 27 − তার স্থান। কাজের জোড়া: **AZ, BY, CX, DW, EV, FU, GT, HS, IR, JQ, KP, LO, MN**।`),
        t(`Replace every letter of the third group by its opposite, keeping the order.`, `তৃতীয় গুচ্ছের প্রতিটি বর্ণকে তার বিপরীত দিয়ে বদলাও, ক্রম একই রেখে।`),
      ],
      example: {
        question: t(`DEF : WVU :: HIJ : ?`, `প্রশ্নচিহ্নের জায়গায় কী বসবে? DEF : WVU :: HIJ : ?`),
        steps: [
          t(`D(4) + W(23) = 27, E(5) + V(22) = 27, F(6) + U(21) = 27: opposite letters.`, `D(4) + W(23) = 27, E(5) + V(22) = 27, F(6) + U(21) = 27: বিপরীত বর্ণ।`),
          t(`Opposite of H(8) is S(19), of I(9) is R(18), of J(10) is Q(17).`, `H(8)-এর বিপরীত S(19), I(9)-এর R(18), J(10)-এর Q(17)।`),
        ],
        answer: t(`SRQ`, `উত্তর: SRQ`),
      },
      tryIt: {
        question: t(`GOLD : TLOW :: IRON : ?`, `প্রশ্নচিহ্নের জায়গায় কী বসবে? GOLD : TLOW :: IRON : ?`),
        options: [t('JSPO', 'JSPO'), t('RJLM', 'RJLM'), t('NORI', 'NORI'), t('RILM', 'RILM')],
        correct: 3,
        explanation: [
          t(`G ↔ T, O ↔ L, L ↔ O, D ↔ W: each letter is replaced by its opposite.`, `G ↔ T, O ↔ L, L ↔ O, D ↔ W: প্রতিটি বর্ণ তার বিপরীত বর্ণ দিয়ে বদলেছে।`),
          t(`I ↔ R, R ↔ I, O ↔ L, N ↔ M.`, `এবার IRON-এ: I ↔ R, R ↔ I, O ↔ L, N ↔ M।`),
          t(`So IRON becomes RILM. (JSPO is a +1 shift, NORI is just the word reversed.)`, `তাই IRON হয় RILM। (JSPO হল +1 সরণ, NORI শুধু শব্দটা উল্টো করে লেখা।)`),
        ],
      },
    },
  ],
};
