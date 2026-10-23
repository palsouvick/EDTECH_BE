'use strict';

/**
 * "How to solve" concept sheets for Reasoning topics.
 * Format: see ./validate.js header.
 */

module.exports = [
  // ───────────────────────────── ANALOGY ─────────────────────────────
  {
    subject: 'reasoning',
    topic: 'analogy',
    title: { en: 'Analogy', bn: 'সাদৃশ্য (অ্যানালজি)', hi: 'सादृश्यता' },
    overview: {
      en: `An analogy question gives one related pair (**A : B**) and asks you to find the term that has the **same relationship** with a third term (**C : ?**). The pairs can be words (worker–tool, product–raw material, part–whole), numbers (square, cube, ×k, n² + 1) or letter groups (fixed shifts, opposite letters). First find the exact rule linking A to B, then apply the same rule, in the same direction, to C. If two rules fit the first pair, use the options or a second given pair to decide.`,
      bn: `সাদৃশ্যের প্রশ্নে একটি সম্পর্কযুক্ত জোড়া (**A : B**) দেওয়া থাকে, আর তৃতীয় পদের (**C : ?**) সঙ্গে **একই সম্পর্ক** আছে এমন পদটি খুঁজতে হয়। জোড়াগুলি শব্দ (কর্মী–যন্ত্র, পণ্য–কাঁচামাল, অংশ–সমগ্র), সংখ্যা (বর্গ, ঘন, ×k, n² + 1) বা বর্ণগুচ্ছ (নির্দিষ্ট সরণ, বিপরীত বর্ণ) হতে পারে। আগে A থেকে B-তে যাওয়ার সঠিক নিয়মটি বের করুন, তারপর সেই নিয়মই একই দিকে C-এর উপর প্রয়োগ করুন। প্রথম জোড়ায় দুটি নিয়ম খাটলে বিকল্পগুলি বা দেওয়া দ্বিতীয় জোড়া দেখে সিদ্ধান্ত নিন।`,
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'Frame a precise sentence', bn: 'একটি নির্দিষ্ট বাক্য তৈরি করুন', hi: 'एक सटीक वाक्य बनाएँ' },
        body: {
          en: 'For word pairs, describe the relation in one sentence and test every option with the *same* sentence.\n\nExample: **Pen : Writer :: Scalpel : ?** → "A ___ is the tool used by a writer" → a scalpel is the tool used by a **surgeon**.',
          bn: 'শব্দ-জোড়ার ক্ষেত্রে সম্পর্কটি একটি বাক্যে লিখুন এবং প্রতিটি বিকল্প *সেই একই* বাক্য দিয়ে যাচাই করুন।\n\nউদাহরণ: **Pen : Writer :: Scalpel : ?** → "পেন লেখকের ব্যবহৃত যন্ত্র" → স্ক্যালপেল ব্যবহার করেন **সার্জন (Surgeon)**।',
        },
      },
      {
        title: { en: 'Number pairs: test the standard operations', bn: 'সংখ্যা-জোড়া: প্রচলিত প্রক্রিয়াগুলি যাচাই করুন', hi: 'संख्या युग्म: सामान्य संक्रियाएँ जाँचें' },
        body: {
          en: 'Check in this order: $\\times$ / $\\div$ by a constant, square or cube, $n^2 \\pm 1$, $n^3 \\pm 1$, digit sum or digit reversal.\n\nExample: **5 : 26 :: 7 : ?** → $5^2 + 1 = 26$, so $7^2 + 1 = 50$.',
          bn: 'এই ক্রমে যাচাই করুন: ধ্রুবক দিয়ে $\\times$ / $\\div$, বর্গ বা ঘন, $n^2 \\pm 1$, $n^3 \\pm 1$, অঙ্কের যোগফল বা অঙ্ক উল্টানো।\n\nউদাহরণ: **5 : 26 :: 7 : ?** → $5^2 + 1 = 26$, তাই $7^2 + 1 = 50$।',
        },
      },
      {
        title: { en: 'Letter pairs: convert to positions', bn: 'বর্ণ-জোড়া: অবস্থান সংখ্যায় বদলান', hi: 'अक्षर युग्म: स्थान संख्या में बदलें' },
        body: {
          en: 'Write the alphabet position under each letter and find the change letter by letter.\n\nExample: **FACE : HCEG :: GOLD : ?** → every letter moves $+2$ (F→H, A→C, C→E, E→G), so G→I, O→Q, L→N, D→F = **IQNF**.',
          bn: 'প্রতিটি বর্ণের নিচে তার বর্ণমালার অবস্থান লিখুন এবং বর্ণ ধরে ধরে পরিবর্তনটি বের করুন।\n\nউদাহরণ: **FACE : HCEG :: GOLD : ?** → প্রতিটি বর্ণ $+2$ সরেছে (F→H, A→C, C→E, E→G), তাই G→I, O→Q, L→N, D→F = **IQNF**।',
        },
      },
      {
        title: { en: 'Keep the direction and eliminate', bn: 'দিক ঠিক রাখুন ও বাদ দিন', hi: 'दिशा बनाए रखें और विकल्प हटाएँ' },
        body: {
          en: 'The relation must run the same way on both sides: if A is the *worker* and B the *place*, then C must be the worker and ? the place. Strike out options that reverse the order or only loosely belong to the same category.',
          bn: 'সম্পর্কটি দুই দিকেই একইভাবে চলতে হবে: A যদি *কর্মী* আর B *কর্মস্থল* হয়, তবে C হবে কর্মী আর ? হবে কর্মস্থল। যে বিকল্পে ক্রম উল্টে গেছে বা যা কেবল আলগাভাবে একই শ্রেণির, সেগুলি বাদ দিন।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Opposite-letter pairs (sum = 27)', bn: 'বিপরীত বর্ণ-জোড়া (যোগফল = 27)', hi: 'विपरीत अक्षर युग्म (योग = 27)' },
        body: {
          en: 'If the two letters in each pair have positions adding to 27, they are opposites.\n\nExample: **AZ : BY :: CX : ?** → A+Z = 1+26, B+Y = 2+25, C+X = 3+24, so the next pair is D(4) and W(23) = **DW**.',
          bn: 'প্রতিটি জোড়ার দুটি বর্ণের অবস্থানের যোগফল 27 হলে তারা পরস্পরের বিপরীত বর্ণ।\n\nউদাহরণ: **AZ : BY :: CX : ?** → A+Z = 1+26, B+Y = 2+25, C+X = 3+24, তাই পরের জোড়া D(4) ও W(23) = **DW**।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Unit-digit check for number analogies', bn: 'সংখ্যার সাদৃশ্যে একক অঙ্ক যাচাই', hi: 'संख्या सादृश्यता में इकाई अंक जाँच' },
        body: {
          en: 'Once you know the rule, you rarely need the full answer — the last digit often picks the option.\n\nExample: **12 : 144 :: 15 : ?** → rule is squaring; $15^2$ must end in 5, so pick the only option ending in 5: **225**.',
          bn: 'নিয়ম জানা হয়ে গেলে পুরো উত্তর কষার দরকার প্রায় হয় না — শেষ অঙ্ক দেখেই প্রায়ই বিকল্প বাছা যায়।\n\nউদাহরণ: **12 : 144 :: 15 : ?** → নিয়ম বর্গ করা; $15^2$-এর শেষ অঙ্ক 5 হবেই, তাই 5 দিয়ে শেষ হওয়া একমাত্র বিকল্প **225** বেছে নিন।',
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: 'Know the common word relations', bn: 'প্রচলিত শব্দ-সম্পর্কগুলি মনে রাখুন', hi: 'सामान्य शब्द संबंध याद रखें' },
        body: {
          en: 'Most word analogies fall into a few families: worker–tool (Carpenter : Saw), worker–product (Poet : Poem), animal–young one (Cow : Calf, Dog : Puppy), animal–sound (Lion : Roar), unit–quantity (Ohm : Resistance), part–whole (Petal : Flower). Naming the family instantly narrows the options.',
          bn: 'বেশিরভাগ শব্দ-সাদৃশ্য কয়েকটি পরিবারে পড়ে: কর্মী–যন্ত্র (Carpenter : Saw), কর্মী–সৃষ্টি (Poet : Poem), প্রাণী–শাবক (Cow : Calf, Dog : Puppy), প্রাণী–ডাক (Lion : Roar), একক–রাশি (Ohm : Resistance), অংশ–সমগ্র (Petal : Flower)। পরিবারটি চিনে ফেললেই বিকল্প দ্রুত কমে যায়।',
        },
        approx_time_saved_sec: 10,
      },
    ],
    common_traps: [
      {
        en: '**Reversed order.** In *Doctor : Hospital :: Teacher : ?* the answer is **School**; an option written as "School : Teacher" uses the right words but in the wrong order.',
        bn: '**ক্রম উল্টে ফেলা।** *Doctor : Hospital :: Teacher : ?*-এর উত্তর **School**; "School : Teacher"-এর মতো বিকল্পে শব্দগুলি ঠিক থাকলেও ক্রম ভেঙে যায়।',
      },
      {
        en: '**Stopping at the first rule that fits.** In **2 : 8 :: 3 : ?**, both "cube" ($3^3 = 27$) and "×4" ($3 \\times 4 = 12$) fit the first pair. Check the options or any second pair before choosing.',
        bn: '**প্রথম মানানসই নিয়মেই থেমে যাওয়া।** **2 : 8 :: 3 : ?**-তে "ঘন" ($3^3 = 27$) এবং "×4" ($3 \\times 4 = 12$) দুটিই প্রথম জোড়ায় খাটে। বেছে নেওয়ার আগে বিকল্পগুলি বা দ্বিতীয় জোড়া দেখে নিন।',
      },
      {
        en: '**A loose category match is not the same relation.** *Cow : Calf* is animal–young one; "Cow : Milk" is animal–product. Both involve a cow, but only the first matches *Horse : Foal*.',
        bn: '**কেবল একই শ্রেণির হওয়া মানেই একই সম্পর্ক নয়।** *Cow : Calf* হল প্রাণী–শাবক; "Cow : Milk" হল প্রাণী–উৎপন্ন দ্রব্য। দুটিতেই গরু আছে, কিন্তু *Horse : Foal*-এর সঙ্গে মেলে কেবল প্রথমটি।',
      },
    ],
  },

  // ───────────────────────────── CODING-DECODING ─────────────────────────────
  {
    subject: 'reasoning',
    topic: 'coding_decoding',
    title: { en: 'Coding-Decoding', bn: 'কোডিং-ডিকোডিং', hi: 'कोडिंग-डिकोडिंग' },
    overview: {
      en: `A word, number or sentence is written in a secret code and you must find the rule, then code or decode a new item. The common types are **letter shifting** (each letter moved forward/backward), **opposite letters** (A↔Z, B↔Y), **letter-to-number** coding (positions, their sum or product), **substitution** ("if sky is called sea…") and **sentence coding** (find common words across sentences). Always write the alphabet positions, compare the given word and its code letter by letter, and confirm the rule on every letter before applying it.`,
      bn: `একটি শব্দ, সংখ্যা বা বাক্যকে গোপন কোডে লেখা হয়; নিয়মটি খুঁজে বের করে নতুন কোনো পদকে কোড বা ডিকোড করতে হয়। প্রচলিত ধরন হল **বর্ণ সরানো** (প্রতিটি বর্ণ সামনে/পিছনে সরে), **বিপরীত বর্ণ** (A↔Z, B↔Y), **বর্ণ থেকে সংখ্যা** (অবস্থান, তাদের যোগফল বা গুণফল), **প্রতিস্থাপন** ("আকাশকে যদি সমুদ্র বলা হয়…") এবং **বাক্য কোডিং** (একাধিক বাক্যের সাধারণ শব্দ খোঁজা)। সবসময় বর্ণমালার অবস্থান লিখে নিন, দেওয়া শব্দ ও তার কোড বর্ণ ধরে ধরে মেলান, এবং প্রয়োগের আগে প্রতিটি বর্ণে নিয়মটি মিলিয়ে দেখুন।`,
    },
    formulas: [
      {
        key: 'letter_position',
        label: { en: 'Alphabet positions', bn: 'বর্ণমালার অবস্থান', hi: 'वर्णमाला में स्थान' },
        latex: 'A = 1,\\; B = 2,\\; \\ldots,\\; M = 13,\\; N = 14,\\; \\ldots,\\; Z = 26',
        explanation: {
          en: 'The reverse position (counting from Z) of a letter at position $n$ is also $27 - n$.',
          bn: '$n$ অবস্থানের বর্ণের বিপরীত দিক থেকে (Z থেকে গুনে) অবস্থানও $27 - n$।',
        },
      },
      {
        key: 'opposite_letter',
        label: { en: 'Opposite letter', bn: 'বিপরীত বর্ণ', hi: 'विपरीत अक्षर' },
        latex: '\\text{Opposite}(n) = 27 - n',
        variables: [
          { symbol: 'n', meaning: { en: 'Position of the letter (A = 1)', bn: 'বর্ণটির অবস্থান (A = 1)' } },
        ],
        explanation: {
          en: 'Example: G = 7, so its opposite is $27 - 7 = 20$ = T.',
          bn: 'উদাহরণ: G = 7, তাই এর বিপরীত বর্ণ $27 - 7 = 20$ = T।',
        },
      },
      {
        key: 'shift_wrap',
        label: { en: 'Forward shift with wrap-around', bn: 'ঘুরে আসা সহ সামনে সরানো', hi: 'चक्रीय आगे खिसकाना' },
        latex: '\\text{new} = n + k \\;\\; (\\text{subtract } 26 \\text{ if the result} > 26)',
        explanation: {
          en: 'Example: Y (25) shifted by $+3$ gives $28 - 26 = 2$ = B.',
          bn: 'উদাহরণ: Y (25)-কে $+3$ সরালে $28 - 26 = 2$ = B।',
        },
      },
    ],
    derivation_rules: [
      {
        title: { en: 'Letter-by-letter comparison', bn: 'বর্ণ ধরে ধরে তুলনা', hi: 'अक्षर-दर-अक्षर तुलना' },
        body: {
          en: 'Write the word, its code and the position difference for each letter. The differences reveal the rule (constant, increasing, alternating or opposite).\n\nExample: **COLD → DPME** (each $+1$), so **WARM → XBSN** (W→X, A→B, R→S, M→N).',
          bn: 'শব্দ, তার কোড এবং প্রতিটি বর্ণের অবস্থানের পার্থক্য লিখুন। পার্থক্যগুলিই নিয়ম দেখিয়ে দেয় (স্থির, বাড়তে থাকা, পর্যায়ক্রমিক বা বিপরীত)।\n\nউদাহরণ: **COLD → DPME** (প্রতিটি $+1$), তাই **WARM → XBSN** (W→X, A→B, R→S, M→N)।',
        },
      },
      {
        title: { en: 'Opposite-letter coding', bn: 'বিপরীত বর্ণ দিয়ে কোডিং', hi: 'विपरीत अक्षर कोडिंग' },
        body: {
          en: 'If each pair (letter, code letter) adds up to 27, the code uses opposites.\n\nExample: **GOOD → TLLW** (G7→T20, O15→L12, D4→W23), so **BAD → YZW**.',
          bn: 'প্রতিটি (বর্ণ, কোড-বর্ণ) জোড়ার যোগফল 27 হলে কোডে বিপরীত বর্ণ ব্যবহার হয়েছে।\n\nউদাহরণ: **GOOD → TLLW** (G7→T20, O15→L12, D4→W23), তাই **BAD → YZW**।',
        },
      },
      {
        title: { en: 'Letter-to-number coding', bn: 'বর্ণ থেকে সংখ্যা কোডিং', hi: 'अक्षर से संख्या कोडिंग' },
        body: {
          en: 'Test the sum of positions first, then product, reverse positions, or (sum × number of letters).\n\nExample: **CAT = 24** because $3 + 1 + 20 = 24$; so **DOG** $= 4 + 15 + 7 = 26$.',
          bn: 'আগে অবস্থানগুলির যোগফল যাচাই করুন, তারপর গুণফল, বিপরীত অবস্থান, বা (যোগফল × বর্ণের সংখ্যা)।\n\nউদাহরণ: **CAT = 24**, কারণ $3 + 1 + 20 = 24$; তাই **DOG** $= 4 + 15 + 7 = 26$।',
        },
      },
      {
        title: { en: 'Sentence coding: match common words', bn: 'বাক্য কোডিং: সাধারণ শব্দ মেলান', hi: 'वाक्य कोडिंग: समान शब्द मिलाएँ' },
        body: {
          en: 'A word that appears in two sentences has the code that appears in both codes.\n\nExample: "tom pi ka" = "sun is hot" and "ka zo ri" = "moon is bright". The only common word is **is** and the only common code is **ka**, so ka = is.',
          bn: 'যে শব্দ দুটি বাক্যেই আছে, তার কোড হল যে কোড দুটি কোড-বাক্যেই আছে।\n\nউদাহরণ: "tom pi ka" = "sun is hot" এবং "ka zo ri" = "moon is bright"। একমাত্র সাধারণ শব্দ **is** আর একমাত্র সাধারণ কোড **ka**, তাই ka = is।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'EJOTY for instant positions', bn: 'চটজলদি অবস্থানের জন্য EJOTY', hi: 'तुरंत स्थान के लिए EJOTY' },
        body: {
          en: 'E = 5, J = 10, O = 15, T = 20, Y = 25. Jump to the nearest anchor and count 1–2 steps.\n\nExample: R = T − 2 = 20 − 2 = **18**; Q = O + 2 = **17**.',
          bn: 'E = 5, J = 10, O = 15, T = 20, Y = 25। কাছের নোঙর-বর্ণে গিয়ে 1–2 ঘর গুনে নিন।\n\nউদাহরণ: R = T − 2 = 20 − 2 = **18**; Q = O + 2 = **17**।',
        },
        approx_time_saved_sec: 20,
      },
      {
        title: { en: 'Memorise the 13 opposite pairs', bn: '13টি বিপরীত জোড়া মুখস্থ রাখুন', hi: '13 विपरीत युग्म याद रखें' },
        body: {
          en: 'AZ, BY, CX, DW, EV, FU, GT, HS, IR, JQ, KP, LO, MN. Hooks: **BY**e, **D**e**W**, **G**rand **T**runk road, **L**O**ve**, **MN** (the middle pair, 13 + 14).\n\nExample: opposite of K is P (11 + 16 = 27).',
          bn: 'AZ, BY, CX, DW, EV, FU, GT, HS, IR, JQ, KP, LO, MN। মনে রাখার সূত্র: **BY**e, **D**e**W**, **G**rand **T**runk রোড, **L**O**ve**, **MN** (মাঝের জোড়া, 13 + 14)।\n\nউদাহরণ: K-এর বিপরীত P (11 + 16 = 27)।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Check only first and last letters', bn: 'শুধু প্রথম ও শেষ বর্ণ যাচাই করুন', hi: 'केवल पहला और अंतिम अक्षर जाँचें' },
        body: {
          en: 'Once the rule is found, code just the first and last letters of the new word and match options; usually only one survives.\n\nExample: rule $+1$, word **WARM**: first X, last N → pick the option of the form X _ _ N (**XBSN**).',
          bn: 'নিয়ম পাওয়ার পর নতুন শব্দের কেবল প্রথম ও শেষ বর্ণ কোড করে বিকল্প মেলান; সাধারণত একটিই টিকে থাকে।\n\nউদাহরণ: নিয়ম $+1$, শব্দ **WARM**: প্রথম X, শেষ N → X _ _ N ধাঁচের বিকল্পটি (**XBSN**) বাছুন।',
        },
        approx_time_saved_sec: 20,
      },
    ],
    common_traps: [
      {
        en: '**Assuming a constant shift.** In **CAT → DCW** the shifts are $+1, +2, +3$ (C→D, A→C, T→W), not a single $+1$. Check every letter.',
        bn: '**সরণ সবসময় স্থির ধরে নেওয়া।** **CAT → DCW**-তে সরণ $+1, +2, +3$ (C→D, A→C, T→W), একটিমাত্র $+1$ নয়। প্রতিটি বর্ণ যাচাই করুন।',
      },
      {
        en: '**Forgetting wrap-around.** Moving past Z restarts at A: X $+3$ = A, Y $+3$ = B. Moving back from A: B $-3$ = Y.',
        bn: '**ঘুরে আসার কথা ভুলে যাওয়া।** Z পেরোলে আবার A থেকে শুরু: X $+3$ = A, Y $+3$ = B। A-র আগে পিছোলে: B $-3$ = Y।',
      },
      {
        en: '**Coding vs decoding direction.** If the rule is "code = letter $+2$", then decoding means *subtracting* 2. Read which way the question asks.',
        bn: '**কোডিং আর ডিকোডিং-এর দিক গুলিয়ে ফেলা।** নিয়ম "কোড = বর্ণ $+2$" হলে ডিকোড করতে 2 *বিয়োগ* করতে হবে। প্রশ্ন কোন দিকে চাইছে তা পড়ে নিন।',
      },
      {
        en: '**In sentence coding, code order is random.** "tom pi ka" for "sun is hot" does not mean tom = sun; only words matched across sentences can be fixed.',
        bn: '**বাক্য কোডিং-এ কোডের ক্রম এলোমেলো।** "sun is hot"-এর কোড "tom pi ka" মানে tom = sun নয়; কেবল একাধিক বাক্যে মিলিয়ে পাওয়া শব্দই নিশ্চিত করা যায়।',
      },
    ],
  },

  // ───────────────────────────── SERIES ─────────────────────────────
  {
    subject: 'reasoning',
    topic: 'series',
    title: { en: 'Number & Letter Series', bn: 'সংখ্যা ও বর্ণ শ্রেণি', hi: 'संख्या और अक्षर श्रृंखला' },
    overview: {
      en: `A series follows a hidden rule and you must find the **next term**, a **missing term** or the **wrong term**. Number series are built from differences (constant or growing), ratios (×k), mixed operations (×2 + 1), squares/cubes ($n^2 \\pm 1$, $n(n+1)$) or two alternating series. Letter series work the same way after converting letters to positions (A = 1 … Z = 26). Look at how fast the terms grow: slow growth suggests addition, fast growth suggests multiplication or powers. Verify the rule on at least three consecutive terms before answering.`,
      bn: `শ্রেণি একটি লুকোনো নিয়ম মেনে চলে; **পরের পদ**, **অনুপস্থিত পদ** বা **ভুল পদ** খুঁজে বের করতে হয়। সংখ্যা শ্রেণি তৈরি হয় অন্তর (স্থির বা বাড়ন্ত), অনুপাত (×k), মিশ্র প্রক্রিয়া (×2 + 1), বর্গ/ঘন ($n^2 \\pm 1$, $n(n+1)$) বা দুটি পর্যায়ক্রমিক শ্রেণি দিয়ে। বর্ণ শ্রেণিও একইভাবে চলে, শুধু বর্ণকে অবস্থান-সংখ্যায় (A = 1 … Z = 26) বদলে নিতে হয়। পদগুলি কত দ্রুত বাড়ছে দেখুন: ধীরে বাড়লে সম্ভবত যোগ, দ্রুত বাড়লে গুণ বা ঘাত। উত্তর দেওয়ার আগে অন্তত পরপর তিনটি পদে নিয়মটি যাচাই করুন।`,
    },
    formulas: [
      {
        key: 'pronic',
        label: { en: 'Product of consecutive numbers', bn: 'পরপর দুটি সংখ্যার গুণফল', hi: 'क्रमागत संख्याओं का गुणनफल' },
        latex: 'n(n+1):\\; 2,\\, 6,\\, 12,\\, 20,\\, 30,\\, 42,\\, \\ldots',
        explanation: {
          en: '$1 \\times 2,\\ 2 \\times 3,\\ 3 \\times 4, \\ldots$ Its differences are $4, 6, 8, 10, \\ldots$',
          bn: '$1 \\times 2,\\ 2 \\times 3,\\ 3 \\times 4, \\ldots$ এর অন্তরগুলি $4, 6, 8, 10, \\ldots$',
        },
      },
      {
        key: 'square_plus_minus',
        label: { en: 'Squares plus/minus one', bn: 'বর্গের সঙ্গে এক যোগ/বিয়োগ', hi: 'वर्ग में एक जोड़/घटाव' },
        latex: 'n^2 + 1:\\; 2,\\, 5,\\, 10,\\, 17,\\, 26 \\qquad n^2 - 1:\\; 0,\\, 3,\\, 8,\\, 15,\\, 24',
      },
      {
        key: 'cube_minus_one',
        label: { en: 'Cubes minus one', bn: 'ঘন থেকে এক বিয়োগ', hi: 'घन में से एक घटाएँ' },
        latex: 'n^3 - 1:\\; 0,\\, 7,\\, 26,\\, 63,\\, 124',
      },
      {
        key: 'times_two_plus_one',
        label: { en: 'Double and add one', bn: 'দ্বিগুণ করে এক যোগ', hi: 'दोगुना करके एक जोड़ें' },
        latex: 'a_{k+1} = 2a_k + 1:\\; 3,\\, 7,\\, 15,\\, 31,\\, 63',
        explanation: {
          en: 'Here the differences $4, 8, 16, 32$ also double, a quick way to spot it.',
          bn: 'এখানে অন্তরগুলি $4, 8, 16, 32$-ও দ্বিগুণ হচ্ছে, এটাই দ্রুত চেনার উপায়।',
        },
      },
    ],
    derivation_rules: [
      {
        title: { en: 'Step 1: first differences', bn: 'ধাপ 1: প্রথম অন্তর', hi: 'चरण 1: पहला अंतर' },
        body: {
          en: 'Subtract each term from the next. If the differences form a simple pattern, extend it.\n\nExample: **4, 6, 10, 16, 24, ?** → differences 2, 4, 6, 8 → next difference 10 → **34**.',
          bn: 'প্রতিটি পদকে পরের পদ থেকে বিয়োগ করুন। অন্তরগুলি সহজ কোনো ধারা তৈরি করলে সেটি এগিয়ে নিন।\n\nউদাহরণ: **4, 6, 10, 16, 24, ?** → অন্তর 2, 4, 6, 8 → পরের অন্তর 10 → **34**।',
        },
      },
      {
        title: { en: 'Step 2: ratios for fast growth', bn: 'ধাপ 2: দ্রুত বৃদ্ধিতে অনুপাত', hi: 'चरण 2: तेज़ वृद्धि में अनुपात' },
        body: {
          en: 'If terms roughly double or triple, divide consecutive terms; then check for a small $\\pm$ correction.\n\nExample: **2, 6, 18, 54, ?** → ×3 each time → **162**. And **3, 7, 15, 31, ?** → ×2 + 1 → **63**.',
          bn: 'পদগুলি মোটামুটি দ্বিগুণ বা তিনগুণ হলে পরপর পদগুলিকে ভাগ করুন; তারপর ছোট কোনো $\\pm$ সংশোধন আছে কিনা দেখুন।\n\nউদাহরণ: **2, 6, 18, 54, ?** → প্রতিবার ×3 → **162**। আর **3, 7, 15, 31, ?** → ×2 + 1 → **63**।',
        },
      },
      {
        title: { en: 'Step 3: split into alternate terms', bn: 'ধাপ 3: একান্তর পদে ভাগ করুন', hi: 'चरण 3: एकांतर पदों में बाँटें' },
        body: {
          en: 'If the series rises and falls irregularly, read the 1st, 3rd, 5th… terms and the 2nd, 4th, 6th… terms separately, or look for two alternating operations.\n\nExample: **1, 10, 3, 20, 5, 30, ?** → odd places 1, 3, 5 → **7**.\n\nExample: **5, 10, 13, 26, 29, ?** → ×2, +3 alternate → $29 \\times 2 =$ **58**.',
          bn: 'শ্রেণি অনিয়মিতভাবে ওঠানামা করলে 1ম, 3য়, 5ম… পদ এবং 2য়, 4র্থ, 6ষ্ঠ… পদ আলাদা করে পড়ুন, বা দুটি পর্যায়ক্রমিক প্রক্রিয়া খুঁজুন।\n\nউদাহরণ: **1, 10, 3, 20, 5, 30, ?** → বিজোড় স্থানে 1, 3, 5 → **7**।\n\nউদাহরণ: **5, 10, 13, 26, 29, ?** → পালা করে ×2, +3 → $29 \\times 2 =$ **58**।',
        },
      },
      {
        title: { en: 'Letter series: convert to numbers', bn: 'বর্ণ শ্রেণি: সংখ্যায় রূপান্তর', hi: 'अक्षर श्रृंखला: संख्या में बदलें' },
        body: {
          en: 'Write the position of every letter, solve it as a number series, and convert back (wrap past Z to A).\n\nExample: **B, E, H, K, ?** → 2, 5, 8, 11 (+3) → 14 = **N**. Example with wrap: **X, A, D, G, ?** → 24, 1 (27 − 26), 4, 7 → 10 = **J**.',
          bn: 'প্রতিটি বর্ণের অবস্থান লিখুন, সংখ্যা শ্রেণির মতো সমাধান করুন, তারপর আবার বর্ণে ফেরান (Z পেরোলে A থেকে ঘুরে আসুন)।\n\nউদাহরণ: **B, E, H, K, ?** → 2, 5, 8, 11 (+3) → 14 = **N**। ঘুরে আসার উদাহরণ: **X, A, D, G, ?** → 24, 1 (27 − 26), 4, 7 → 10 = **J**।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Spot near-squares and near-cubes', bn: 'বর্গ ও ঘনের কাছাকাছি সংখ্যা চিনুন', hi: 'वर्ग और घन के पास की संख्याएँ पहचानें' },
        body: {
          en: 'Know squares to 30 and cubes to 15. Terms that sit one away from them reveal the rule at a glance.\n\nExample: **3, 8, 15, 24, 35, ?** → $2^2 - 1, 3^2 - 1, \\ldots, 6^2 - 1$ → $7^2 - 1 =$ **48**.',
          bn: '30 পর্যন্ত বর্গ ও 15 পর্যন্ত ঘন মুখস্থ রাখুন। এদের থেকে এক কম/বেশি পদ দেখলেই নিয়মটি ধরা পড়ে।\n\nউদাহরণ: **3, 8, 15, 24, 35, ?** → $2^2 - 1, 3^2 - 1, \\ldots, 6^2 - 1$ → $7^2 - 1 =$ **48**।',
        },
        approx_time_saved_sec: 20,
      },
      {
        title: { en: 'EJOTY for letter series', bn: 'বর্ণ শ্রেণিতে EJOTY', hi: 'अक्षर श्रृंखला में EJOTY' },
        body: {
          en: 'E5, J10, O15, T20, Y25 give positions without counting from A.\n\nExample: **C, G, K, O, ?** → 3, 7, 11, 15 (+4) → 19 = T − 1 = **S**.',
          bn: 'E5, J10, O15, T20, Y25 মনে থাকলে A থেকে গুনতে হয় না।\n\nউদাহরণ: **C, G, K, O, ?** → 3, 7, 11, 15 (+4) → 19 = T − 1 = **S**।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Wrong-term: test the round numbers', bn: 'ভুল পদ: গোল সংখ্যাগুলো যাচাই করুন', hi: 'गलत पद: आसपास की संख्याएँ जाँचें' },
        body: {
          en: 'In "find the wrong term" questions, the odd one is usually just 1 or 2 away from the correct value.\n\nExample: **3, 9, 27, 80, 243** → ×3 rule; $27 \\times 3 = 81$, so **80** is wrong.',
          bn: '"ভুল পদ খুঁজুন" প্রশ্নে বেমানান পদটি সাধারণত সঠিক মানের থেকে মাত্র 1 বা 2 দূরে থাকে।\n\nউদাহরণ: **3, 9, 27, 80, 243** → ×3 নিয়ম; $27 \\times 3 = 81$, তাই **80** ভুল।',
        },
        approx_time_saved_sec: 15,
      },
    ],
    common_traps: [
      {
        en: '**Fitting a rule to only two terms.** Any two numbers fit many rules; check the third and fourth terms before trusting a pattern.',
        bn: '**কেবল দুটি পদ দেখে নিয়ম ঠিক করা।** যেকোনো দুটি সংখ্যায় অনেক নিয়মই খাটে; কোনো ধারায় ভরসা করার আগে তৃতীয় ও চতুর্থ পদেও যাচাই করুন।',
      },
      {
        en: '**Missing an alternating series.** When differences jump up and down (e.g. +9, −7, +17, −15), split the series into odd and even places instead of hunting for one formula.',
        bn: '**পর্যায়ক্রমিক শ্রেণি চিনতে না পারা।** অন্তর ওঠানামা করলে (যেমন +9, −7, +17, −15) একটিমাত্র সূত্র না খুঁজে শ্রেণিটিকে বিজোড় ও জোড় স্থানে ভাগ করুন।',
      },
      {
        en: '**Letter counting errors and wrap-around.** After Z comes A again (Y + 3 = B). Counting on fingers from A is slow and error-prone — use EJOTY anchors.',
        bn: '**বর্ণ গোনায় ভুল ও ঘুরে আসা।** Z-এর পর আবার A আসে (Y + 3 = B)। আঙুলে A থেকে গোনা ধীর ও ভুলপ্রবণ — EJOTY নোঙর ব্যবহার করুন।',
      },
      {
        en: '**Next term vs missing term.** In a missing-term question, the answer must also fit the term *after* the blank. Recheck it.',
        bn: '**পরের পদ বনাম অনুপস্থিত পদ।** অনুপস্থিত পদের প্রশ্নে উত্তরটিকে ফাঁকা ঘরের *পরের* পদের সঙ্গেও মিলতে হবে। আবার যাচাই করুন।',
      },
    ],
  },

  // ───────────────────────────── BLOOD RELATIONS ─────────────────────────────
  {
    subject: 'reasoning',
    topic: 'blood_relations',
    title: { en: 'Blood Relations', bn: 'রক্তের সম্পর্ক', hi: 'रक्त संबंध' },
    overview: {
      en: `Blood relation questions describe family links and ask how two people are related. They come as **direct statements** ("A is the brother of B"), **pointing / photo puzzles** ("Pointing to a man, Riya said…"), and **coded relations** ("A + B means A is the father of B"). The reliable method is to draw a small family tree with gender marks, marriage links and generation levels, decode the sentence from the end that mentions the speaker ("my…"), and read the answer only from what the tree proves. Never guess a gender that the question does not fix.`,
      bn: `রক্তের সম্পর্কের প্রশ্নে পরিবারের যোগসূত্র বর্ণনা করে জানতে চাওয়া হয় দুজন ব্যক্তি পরস্পরের কী হন। প্রশ্ন আসে **সরাসরি বিবৃতি** ("A হল B-এর ভাই"), **ছবি দেখিয়ে / ইঙ্গিত করে** ("একজন লোককে দেখিয়ে রিয়া বলল…") এবং **কোড করা সম্পর্ক** ("A + B মানে A হল B-এর বাবা") আকারে। নির্ভরযোগ্য উপায় হল লিঙ্গ-চিহ্ন, বিবাহ-সংযোগ ও প্রজন্মের স্তর দিয়ে একটি ছোট পারিবারিক বংশতালিকা আঁকা, বক্তার দিক ("আমার…") থেকে বাক্যটি ভাঙা, এবং কেবল তালিকা যা প্রমাণ করে সেটুকুই উত্তর হিসেবে নেওয়া। প্রশ্নে নির্দিষ্ট না থাকলে কারো লিঙ্গ কখনো অনুমান করবেন না।`,
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'Draw the tree with standard symbols', bn: 'প্রচলিত চিহ্ন দিয়ে বংশতালিকা আঁকুন', hi: 'मानक चिह्नों से वंश-वृक्ष बनाएँ' },
        body: {
          en: 'Use **+** (or a square) for male, **−** (or a circle) for female, a double line **=** for husband–wife, a horizontal line for siblings, and a vertical line to go one generation down. Put each generation on its own row.',
          bn: 'পুরুষের জন্য **+** (বা বর্গক্ষেত্র), মহিলার জন্য **−** (বা বৃত্ত), স্বামী–স্ত্রীর জন্য জোড়া রেখা **=**, ভাই-বোনের জন্য অনুভূমিক রেখা এবং এক প্রজন্ম নিচে নামতে উল্লম্ব রেখা ব্যবহার করুন। প্রতিটি প্রজন্ম আলাদা সারিতে রাখুন।',
        },
      },
      {
        title: { en: 'Decode from the speaker outward', bn: 'বক্তার দিক থেকে ভাঙুন', hi: 'वक्ता की ओर से सुलझाएँ' },
        body: {
          en: 'Start at "my" and replace each phrase step by step.\n\nExample: *Pointing to a man, Riya said, "He is the son of my grandfather\'s only son."* → my grandfather\'s only son = my **father**; son of my father = my **brother**. So the man is Riya\'s brother.',
          bn: '"আমার" থেকে শুরু করে প্রতিটি অংশ ধাপে ধাপে বদলান।\n\nউদাহরণ: *একজন লোককে দেখিয়ে রিয়া বলল, "ইনি আমার ঠাকুরদার একমাত্র ছেলের ছেলে।"* → আমার ঠাকুরদার একমাত্র ছেলে = আমার **বাবা**; বাবার ছেলে = আমার **ভাই**। তাই লোকটি রিয়ার ভাই।',
        },
      },
      {
        title: { en: 'Coded relations: translate symbol by symbol', bn: 'কোড করা সম্পর্ক: প্রতিটি চিহ্ন অনুবাদ করুন', hi: 'कोडित संबंध: हर चिह्न का अनुवाद करें' },
        body: {
          en: 'Let A + B mean "A is the father of B", A − B mean "A is the wife of B" and A × B mean "A is the brother of B".\n\n**P + Q × R** → P is father of Q, Q is brother of R → P is the **father** of R.\n\n**P − Q + R** → P is wife of Q, Q is father of R → P is the **mother** of R.',
          bn: 'ধরা যাক A + B মানে "A হল B-এর বাবা", A − B মানে "A হল B-এর স্ত্রী" এবং A × B মানে "A হল B-এর ভাই"।\n\n**P + Q × R** → P হল Q-এর বাবা, Q হল R-এর ভাই → P হল R-এর **বাবা**।\n\n**P − Q + R** → P হল Q-এর স্ত্রী, Q হল R-এর বাবা → P হল R-এর **মা**।',
        },
      },
      {
        title: { en: 'Answer only what the tree proves', bn: 'বংশতালিকা যা প্রমাণ করে কেবল তা-ই উত্তর', hi: 'केवल वही उत्तर दें जो वंश-वृक्ष सिद्ध करे' },
        body: {
          en: 'If a person\'s gender is never stated, relations like "brother or sister" cannot be decided — the correct option may be **"cannot be determined"**. Check the tree once more before choosing.',
          bn: 'কোনো ব্যক্তির লিঙ্গ কোথাও বলা না থাকলে "ভাই না বোন" জাতীয় সম্পর্ক নির্ণয় করা যায় না — সঠিক বিকল্প হতে পারে **"নির্ণয় করা যায় না"**। বেছে নেওয়ার আগে বংশতালিকাটি আরেকবার দেখে নিন।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Count generations', bn: 'প্রজন্ম গুনুন', hi: 'पीढ़ियाँ गिनें' },
        body: {
          en: 'Score the speaker as 0, each parent step as $+1$, each child step as $-1$. The final score tells you the generation.\n\nExample: "my mother\'s father\'s daughter" → $+1 +1 -1 = +1$ → parent generation, female → **mother or maternal aunt**.',
          bn: 'বক্তাকে 0 ধরুন, প্রতিটি বাবা/মা ধাপে $+1$, প্রতিটি সন্তান ধাপে $-1$। শেষ ফল প্রজন্মটি বলে দেয়।\n\nউদাহরণ: "আমার মায়ের বাবার মেয়ে" → $+1 +1 -1 = +1$ → বাবা-মায়ের প্রজন্ম, মহিলা → **মা অথবা মাসি**।',
        },
        approx_time_saved_sec: 20,
      },
      {
        title: { en: 'Standard shortcuts', bn: 'প্রচলিত শর্টকাট', hi: 'मानक शॉर्टकट' },
        body: {
          en: '"Grandfather\'s only son" = father (paternal side). "Mother\'s only daughter" (said by a man) = his sister. "Father\'s brother" = paternal uncle; "mother\'s brother" = maternal uncle. "Brother\'s wife" = sister-in-law; "wife\'s brother" = brother-in-law.',
          bn: '"ঠাকুরদার একমাত্র ছেলে" = বাবা। "মায়ের একমাত্র মেয়ে" (কোনো পুরুষ বললে) = তার বোন। "বাবার ভাই" = কাকা/জ্যাঠা; "মায়ের ভাই" = মামা। "ভাইয়ের স্ত্রী" = বৌদি/ভাইবৌ; "স্ত্রীর ভাই" = শ্যালক।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Photo puzzles: reduce "my …" first', bn: 'ছবির ধাঁধা: আগে "আমার …" অংশটি ছোট করুন', hi: 'फ़ोटो पहेली: पहले "मेरे …" भाग को छोटा करें' },
        body: {
          en: 'Collapse the speaker\'s phrase into one word, then attach the rest.\n\nExample: Pointing to a girl, a man said, *"Her mother is the only daughter of my mother."* → only daughter of my mother = my **sister** → the girl\'s mother is his sister → the girl is his **niece**.',
          bn: 'বক্তার অংশটিকে আগে একটি শব্দে নামিয়ে আনুন, তারপর বাকিটা জুড়ুন।\n\nউদাহরণ: একটি মেয়েকে দেখিয়ে একজন পুরুষ বললেন, *"ওর মা আমার মায়ের একমাত্র মেয়ে।"* → আমার মায়ের একমাত্র মেয়ে = আমার **বোন** → মেয়েটির মা তাঁর বোন → মেয়েটি তাঁর **ভাগ্নী**।',
        },
        approx_time_saved_sec: 20,
      },
    ],
    common_traps: [
      {
        en: '**"Father\'s father\'s son" is not always the father.** Without the word *only*, it can be the father **or a paternal uncle**.',
        bn: '**"বাবার বাবার ছেলে" সবসময় বাবা নয়।** *একমাত্র* শব্দটি না থাকলে তিনি বাবা **অথবা কাকা/জ্যাঠা** হতে পারেন।',
      },
      {
        en: '**Assuming gender from a name or role.** "A is the sibling of B" or "A is the child of B" does not tell A\'s gender. If gender is never fixed, choose "cannot be determined".',
        bn: '**নাম বা ভূমিকা দেখে লিঙ্গ ধরে নেওয়া।** "A হল B-এর ভাইবোন" বা "A হল B-এর সন্তান" থেকে A-র লিঙ্গ জানা যায় না। লিঙ্গ কোথাও নির্দিষ্ট না হলে "নির্ণয় করা যায় না" বাছুন।',
      },
      {
        en: '**Speaker can be the answer.** When a *woman* says "the only daughter of my mother", that is the woman herself, not her sister.',
        bn: '**বক্তা নিজেই উত্তর হতে পারেন।** কোনো *মহিলা* "আমার মায়ের একমাত্র মেয়ে" বললে তিনি নিজেকেই বোঝাচ্ছেন, বোনকে নয়।',
      },
      {
        en: '**Reading the relation backwards.** "What is P to R?" asks for P\'s relation *to* R. If P is R\'s father, R is P\'s son/daughter — pick the one the question asks.',
        bn: '**সম্পর্ক উল্টো দিক থেকে পড়া।** "P, R-এর কে?" মানে R-এর সাপেক্ষে P-এর সম্পর্ক। P যদি R-এর বাবা হন, তবে R হল P-এর ছেলে/মেয়ে — প্রশ্ন যেটা চাইছে সেটাই বাছুন।',
      },
    ],
  },

  // ───────────────────────────── DIRECTION SENSE ─────────────────────────────
  {
    subject: 'reasoning',
    topic: 'direction_sense',
    title: { en: 'Direction Sense', bn: 'দিকনির্ণয়', hi: 'दिशा ज्ञान' },
    overview: {
      en: `Direction questions describe a walk or drive with turns and ask for the **final direction**, the **shortest distance** from the start, or the **direction of one point from another**. Some use the sun and shadows (morning sun in the east, evening sun in the west). Always draw the path on rough paper with North at the top and East on the right, convert every "left/right" into a compass direction, and then add up the net East–West and North–South movements. The straight-line distance follows from Pythagoras.`,
      bn: `দিকনির্ণয়ের প্রশ্নে বাঁক সহ কোনো হাঁটা বা যাত্রার বর্ণনা দিয়ে **শেষ দিক**, শুরুর বিন্দু থেকে **ন্যূনতম দূরত্ব**, বা **এক বিন্দু থেকে অন্য বিন্দুর দিক** জানতে চাওয়া হয়। কিছু প্রশ্নে সূর্য ও ছায়া থাকে (সকালে সূর্য পূর্বে, সন্ধ্যায় পশ্চিমে)। সবসময় খাতায় উপরে উত্তর ও ডানে পূর্ব রেখে পথটি আঁকুন, প্রতিটি "বাঁ/ডান"-কে কম্পাসের দিকে বদলান, তারপর মোট পূর্ব–পশ্চিম ও উত্তর–দক্ষিণ সরণ যোগ করুন। সরলরেখায় দূরত্ব পাওয়া যায় পিথাগোরাসের উপপাদ্য থেকে।`,
    },
    formulas: [
      {
        key: 'pythagoras_distance',
        label: { en: 'Shortest distance from start', bn: 'শুরুর বিন্দু থেকে ন্যূনতম দূরত্ব', hi: 'आरंभ बिंदु से न्यूनतम दूरी' },
        latex: 'd = \\sqrt{x^2 + y^2}',
        variables: [
          { symbol: 'x', meaning: { en: 'Net East–West displacement', bn: 'মোট পূর্ব–পশ্চিম সরণ' } },
          { symbol: 'y', meaning: { en: 'Net North–South displacement', bn: 'মোট উত্তর–দক্ষিণ সরণ' } },
        ],
        explanation: {
          en: 'Example: 6 km North then 8 km East → $\\sqrt{36 + 64} = 10$ km.',
          bn: 'উদাহরণ: 6 km উত্তরে তারপর 8 km পূর্বে → $\\sqrt{36 + 64} = 10$ km।',
        },
      },
      {
        key: 'turn_rule',
        label: { en: 'Turns as angles', bn: 'বাঁককে কোণ হিসেবে', hi: 'मोड़ को कोण के रूप में' },
        latex: '\\text{Right} = 90^\\circ \\text{ clockwise}, \\qquad \\text{Left} = 90^\\circ \\text{ anticlockwise}',
      },
    ],
    derivation_rules: [
      {
        title: { en: 'Draw, then convert every turn', bn: 'আঁকুন, তারপর প্রতিটি বাঁক বদলান', hi: 'चित्र बनाएँ, फिर हर मोड़ बदलें' },
        body: {
          en: 'Keep North up. A right turn is 90° clockwise from the direction you are *currently facing*: North→East→South→West→North. A left turn goes the other way.\n\nFacing North, right = East; facing South, right = **West**.',
          bn: 'উত্তর উপরে রাখুন। ডানে ঘোরা মানে *এখন যেদিকে মুখ* সেখান থেকে ঘড়ির কাঁটার দিকে 90°: উত্তর→পূর্ব→দক্ষিণ→পশ্চিম→উত্তর। বাঁয়ে ঘোরা উল্টো দিকে।\n\nউত্তরমুখী হলে ডান = পূর্ব; দক্ষিণমুখী হলে ডান = **পশ্চিম**।',
        },
      },
      {
        title: { en: 'Net displacement method', bn: 'মোট সরণ পদ্ধতি', hi: 'कुल विस्थापन विधि' },
        body: {
          en: 'Add East as $+$, West as $-$; North as $+$, South as $-$.\n\nExample: 10 km East, turn left 7 km (North), turn left 4 km (West), turn left 15 km (South). East–West: $10 - 4 = 6$ East; North–South: $7 - 15 = -8$, i.e. 8 South. Distance $= \\sqrt{6^2 + 8^2} = 10$ km, towards the **South-East**.',
          bn: 'পূর্বকে $+$, পশ্চিমকে $-$; উত্তরকে $+$, দক্ষিণকে $-$ ধরে যোগ করুন।\n\nউদাহরণ: 10 km পূর্বে, বাঁয়ে ঘুরে 7 km (উত্তরে), বাঁয়ে ঘুরে 4 km (পশ্চিমে), বাঁয়ে ঘুরে 15 km (দক্ষিণে)। পূর্ব–পশ্চিম: $10 - 4 = 6$ পূর্বে; উত্তর–দক্ষিণ: $7 - 15 = -8$, অর্থাৎ 8 দক্ষিণে। দূরত্ব $= \\sqrt{6^2 + 8^2} = 10$ km, **দক্ষিণ-পূর্ব** দিকে।',
        },
      },
      {
        title: { en: 'Shadow questions', bn: 'ছায়ার প্রশ্ন', hi: 'छाया वाले प्रश्न' },
        body: {
          en: 'Morning: sun in the East, shadow falls to the **West**. Evening: sun in the West, shadow falls to the **East**. Then convert to left/right for the person.\n\nExample: In the morning a man faces North; his shadow (West) is to his **left**.',
          bn: 'সকাল: সূর্য পূর্বে, ছায়া পড়ে **পশ্চিমে**। সন্ধ্যা: সূর্য পশ্চিমে, ছায়া পড়ে **পূর্বে**। তারপর ব্যক্তির সাপেক্ষে বাঁ/ডানে বদলান।\n\nউদাহরণ: সকালে একজন উত্তরমুখী; তাঁর ছায়া (পশ্চিমে) পড়বে তাঁর **বাঁ দিকে**।',
        },
      },
      {
        title: { en: 'Direction of one point from another', bn: 'এক বিন্দু থেকে অন্য বিন্দুর দিক', hi: 'एक बिंदु से दूसरे बिंदु की दिशा' },
        body: {
          en: '"Direction of B from A" means stand at A and look at B. Reverse it for the opposite question: if B is North-East of A, then A is **South-West** of B.',
          bn: '"A থেকে B কোন দিকে" মানে A-তে দাঁড়িয়ে B-এর দিকে তাকানো। উল্টো প্রশ্নে দিকও উল্টে যায়: B যদি A-র উত্তর-পূর্বে থাকে, তবে A আছে B-র **দক্ষিণ-পশ্চিমে**।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Pythagorean triples', bn: 'পিথাগোরীয় ত্রয়ী', hi: 'पाइथागोरस त्रिक' },
        body: {
          en: 'Most exam answers are triples: 3-4-5, 6-8-10, 5-12-13, 8-15-17, 7-24-25 (and multiples).\n\nExample: net 5 km North and 12 km West → **13 km**, no square root needed.',
          bn: 'পরীক্ষার বেশিরভাগ উত্তর এই ত্রয়ীগুলি: 3-4-5, 6-8-10, 5-12-13, 8-15-17, 7-24-25 (ও এদের গুণিতক)।\n\nউদাহরণ: মোট 5 km উত্তরে ও 12 km পশ্চিমে → **13 km**, বর্গমূল কষতে হয় না।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Net-turn counting', bn: 'মোট বাঁক গোনা', hi: 'कुल मोड़ गिनना' },
        body: {
          en: 'For "which way is he facing now?", score right $= +90^\\circ$, left $= -90^\\circ$ and add; ignore the distances.\n\nExample: facing North, turns right, right, left → $+90 + 90 - 90 = +90^\\circ$ → **East**. Also: 135° clockwise then 45° anticlockwise = net 90° clockwise.',
          bn: '"এখন সে কোন দিকে মুখ করে আছে?" প্রশ্নে ডান $= +90^\\circ$, বাঁ $= -90^\\circ$ ধরে যোগ করুন; দূরত্ব উপেক্ষা করুন।\n\nউদাহরণ: উত্তরমুখী, ডান, ডান, বাঁ → $+90 + 90 - 90 = +90^\\circ$ → **পূর্ব**। আবার: 135° ঘড়ির কাঁটার দিকে তারপর 45° বিপরীতে = মোট 90° ঘড়ির কাঁটার দিকে।',
        },
        approx_time_saved_sec: 20,
      },
      {
        title: { en: 'Cancel opposite legs first', bn: 'আগে বিপরীত সরণগুলি কাটাকাটি করুন', hi: 'पहले विपरीत चालें रद्द करें' },
        body: {
          en: 'Pair off North with South and East with West before drawing anything.\n\nExample: 5 N, 3 E, 9 N, 7 E, 2 S → North–South $5 + 9 - 2 = 12$ N, East $3 + 7 = 10$ E → answer lies **North-East**.',
          bn: 'কিছু আঁকার আগেই উত্তরকে দক্ষিণের সঙ্গে আর পূর্বকে পশ্চিমের সঙ্গে কাটাকাটি করুন।\n\nউদাহরণ: 5 উ, 3 পূ, 9 উ, 7 পূ, 2 দ → উত্তর–দক্ষিণ $5 + 9 - 2 = 12$ উত্তরে, পূর্ব $3 + 7 = 10$ → শেষ বিন্দু **উত্তর-পূর্ব** দিকে।',
        },
        approx_time_saved_sec: 15,
      },
    ],
    common_traps: [
      {
        en: '**Left/right when facing South or West.** A person facing South has East on his *left* and West on his *right* — the opposite of the page. Always turn from the direction the person is facing, not from the page.',
        bn: '**দক্ষিণ বা পশ্চিমমুখী অবস্থায় বাঁ/ডান।** দক্ষিণমুখী ব্যক্তির *বাঁয়ে* পূর্ব আর *ডানে* পশ্চিম — কাগজের উল্টো। সবসময় ব্যক্তি যেদিকে মুখ করে আছেন সেদিক থেকে ঘোরান, কাগজের দিক থেকে নয়।',
      },
      {
        en: '**Total distance walked vs shortest distance.** 6 km North + 8 km East is 14 km walked but only 10 km from the start. Read which one is asked.',
        bn: '**মোট হাঁটা দূরত্ব বনাম ন্যূনতম দূরত্ব।** 6 km উত্তর + 8 km পূর্ব মানে হাঁটা হয়েছে 14 km, কিন্তু শুরু থেকে দূরত্ব মাত্র 10 km। কোনটি চাওয়া হয়েছে পড়ে নিন।',
      },
      {
        en: '**Direction of start from end vs end from start.** If the final point is South-East of the start, the start is **North-West** of the final point.',
        bn: '**শেষ থেকে শুরু বনাম শুরু থেকে শেষের দিক।** শেষ বিন্দু যদি শুরুর দক্ষিণ-পূর্বে থাকে, তবে শুরুর বিন্দু শেষ বিন্দুর **উত্তর-পশ্চিমে**।',
      },
      {
        en: '**Shadow side.** In the morning the shadow is to the West, not the East. A man facing South in the morning has his shadow on his **right**.',
        bn: '**ছায়ার দিক।** সকালে ছায়া পড়ে পশ্চিমে, পূর্বে নয়। সকালে দক্ষিণমুখী ব্যক্তির ছায়া পড়বে তাঁর **ডান দিকে**।',
      },
    ],
  },

  // ───────────────────────────── SYLLOGISM ─────────────────────────────
  {
    subject: 'reasoning',
    topic: 'syllogism',
    title: { en: 'Syllogism', bn: 'সিলোজিজম (ন্যায়বাক্য)', hi: 'न्याय निगमन (सिलोजिज़्म)' },
    overview: {
      en: `Syllogism gives two or more statements (All / Some / No / Some … not) and asks which conclusions **definitely follow**, even if the statements sound absurd. Treat the statements as true and ignore real-world facts. Draw the **minimum Venn diagram** that satisfies every statement; a conclusion follows only if it is true in **every** possible diagram, while a "possibility" conclusion follows if it is true in **at least one** valid diagram. Learn the standard conversions and the two-statement combination table to answer most questions without drawing.`,
      bn: `সিলোজিজমে দুই বা ততোধিক বিবৃতি (সব / কিছু / কোনো … নয় / কিছু … নয়) দিয়ে জিজ্ঞাসা করা হয় কোন সিদ্ধান্তগুলি **নিশ্চিতভাবে অনুসরণ করে**, বিবৃতিগুলি অবাস্তব শোনালেও। বিবৃতিগুলিকে সত্য ধরে নিন এবং বাস্তব জগতের তথ্য উপেক্ষা করুন। সব বিবৃতি মেনে চলে এমন **ন্যূনতম ভেন চিত্র** আঁকুন; কোনো সিদ্ধান্ত তখনই অনুসরণ করে যখন তা **প্রতিটি** সম্ভাব্য চিত্রে সত্য, আর "সম্ভাবনা"-র সিদ্ধান্ত অনুসরণ করে যদি তা **অন্তত একটি** বৈধ চিত্রে সত্য হয়। প্রচলিত রূপান্তর এবং দুই-বিবৃতির সংযোজন সারণি শিখে রাখলে বেশিরভাগ প্রশ্ন না এঁকেই করা যায়।`,
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'Venn diagram method', bn: 'ভেন চিত্র পদ্ধতি', hi: 'वेन आरेख विधि' },
        body: {
          en: '"All A are B" → circle A inside B. "Some A are B" → A and B overlap. "No A is B" → separate circles. Draw only what is forced, then test each conclusion: true in every valid diagram → **follows**; false in even one → **does not follow**.\n\nExample: All pens are books; all books are bags → pen ⊂ book ⊂ bag → "All pens are bags" follows, "Some bags are pens" follows, "All bags are pens" does **not**.',
          bn: '"সব A হল B" → A-বৃত্ত B-এর ভিতরে। "কিছু A হল B" → A ও B পরস্পরকে ছেদ করে। "কোনো A B নয়" → আলাদা বৃত্ত। শুধু যা বাধ্যতামূলক তা-ই আঁকুন, তারপর প্রতিটি সিদ্ধান্ত যাচাই করুন: প্রতিটি বৈধ চিত্রে সত্য → **অনুসরণ করে**; একটিতেও মিথ্যা → **অনুসরণ করে না**।\n\nউদাহরণ: সব pen হল book; সব book হল bag → pen ⊂ book ⊂ bag → "সব pen হল bag" অনুসরণ করে, "কিছু bag হল pen" অনুসরণ করে, "সব bag হল pen" অনুসরণ **করে না**।',
        },
      },
      {
        title: { en: 'Standard conversions', bn: 'প্রচলিত রূপান্তর', hi: 'मानक रूपांतरण' },
        body: {
          en: '- All A are B → Some A are B, and Some B are A (never All B are A).\n- Some A are B ↔ Some B are A.\n- No A is B ↔ No B is A; it also gives Some A are not B and Some B are not A.\n- Some A are not B → **no** conversion.',
          bn: '- সব A হল B → কিছু A হল B, এবং কিছু B হল A (কখনোই সব B হল A নয়)।\n- কিছু A হল B ↔ কিছু B হল A।\n- কোনো A B নয় ↔ কোনো B A নয়; এ থেকে কিছু A B নয় ও কিছু B A নয়-ও পাওয়া যায়।\n- কিছু A B নয় → কোনো রূপান্তর **হয় না**।',
        },
      },
      {
        title: { en: 'Possibility conclusions', bn: 'সম্ভাবনার সিদ্ধান্ত', hi: 'संभावना वाले निष्कर्ष' },
        body: {
          en: '"X being Y is a possibility" follows if you can draw at least one valid diagram where it is true, i.e. no statement forbids it.\n\nExample: All dogs are animals; some animals are cats. "Some dogs are cats" does **not** follow definitely, but "Some dogs being cats is a possibility" **follows**. If a statement says "No A is B", then "All A being B is a possibility" does **not** follow.',
          bn: '"X-এর Y হওয়ার সম্ভাবনা আছে" অনুসরণ করে, যদি অন্তত একটি বৈধ চিত্র আঁকা যায় যেখানে তা সত্য, অর্থাৎ কোনো বিবৃতি তা নিষেধ করে না।\n\nউদাহরণ: সব dog হল animal; কিছু animal হল cat। "কিছু dog হল cat" নিশ্চিতভাবে অনুসরণ **করে না**, কিন্তু "কিছু dog-এর cat হওয়ার সম্ভাবনা আছে" **অনুসরণ করে**। কোনো বিবৃতি "কোনো A B নয়" বললে "সব A-এর B হওয়ার সম্ভাবনা আছে" অনুসরণ **করে না**।',
        },
      },
      {
        title: { en: 'Either–or (complementary pair)', bn: 'হয় অথবা (পরিপূরক জোড়া)', hi: 'या तो–या (पूरक युग्म)' },
        body: {
          en: 'If neither of two conclusions follows on its own, but they have the same two terms and together cover every case — "Some A are B" with "No A is B", or "All A are B" with "Some A are not B" — the answer is **either I or II follows**.',
          bn: 'দুটি সিদ্ধান্তের কোনোটিই আলাদাভাবে অনুসরণ না করলেও, যদি তাদের পদ দুটি একই হয় এবং একসঙ্গে সব সম্ভাবনা ঢেকে দেয় — "কিছু A হল B" ও "কোনো A B নয়", অথবা "সব A হল B" ও "কিছু A B নয়" — তবে উত্তর **হয় I অথবা II অনুসরণ করে**।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Two-statement combination table', bn: 'দুই-বিবৃতির সংযোজন সারণি', hi: 'दो-कथन संयोजन तालिका' },
        body: {
          en: 'With the middle term B linking A and C (A–B, B–C):\n- All + All → All A are C\n- All + No → No A is C\n- Some + All → Some A are C\n- Some + No → Some A are not C\n- All + Some, Some + Some, No + No → no definite A–C conclusion\n\nExample: Some pens are pencils; no pencil is a box → **Some pens are not boxes**.',
          bn: 'মধ্যপদ B যখন A ও C-কে যুক্ত করে (A–B, B–C):\n- সব + সব → সব A হল C\n- সব + কোনো নয় → কোনো A C নয়\n- কিছু + সব → কিছু A হল C\n- কিছু + কোনো নয় → কিছু A C নয়\n- সব + কিছু, কিছু + কিছু, কোনো নয় + কোনো নয় → A–C সম্পর্কে নিশ্চিত সিদ্ধান্ত নেই\n\nউদাহরণ: কিছু pen হল pencil; কোনো pencil box নয় → **কিছু pen box নয়**।',
        },
        approx_time_saved_sec: 30,
      },
      {
        title: { en: '"Some … not" can never be reversed', bn: '"কিছু … নয়" কখনো উল্টানো যায় না', hi: '"कुछ … नहीं" कभी उलटा नहीं होता' },
        body: {
          en: 'Whenever a conclusion just flips a "Some A are not B" statement, mark it false immediately.\n\nExample: Statement "Some fruits are not apples" → conclusion "Some apples are not fruits" does **not** follow (all apples could be fruits).',
          bn: 'কোনো সিদ্ধান্ত যদি কেবল "কিছু A B নয়" বিবৃতিটিকে উল্টে দেয়, তবে সঙ্গে সঙ্গে সেটিকে বাতিল করুন।\n\nউদাহরণ: বিবৃতি "কিছু fruit apple নয়" → সিদ্ধান্ত "কিছু apple fruit নয়" অনুসরণ **করে না** (সব apple-ই fruit হতে পারে)।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'No + All gives a reversed "Some … not"', bn: 'কোনো নয় + সব থেকে উল্টো "কিছু … নয়"', hi: 'कोई नहीं + सभी से उलटा "कुछ … नहीं"' },
        body: {
          en: 'No A is B + All B are C does **not** give "No A is C"; it gives **Some C are not A** (the C\'s that are B cannot be A).\n\nExample: No cat is a dog; all dogs are pets → "Some pets are not cats" follows; "No cat is a pet" does not.',
          bn: 'কোনো A B নয় + সব B হল C থেকে "কোনো A C নয়" পাওয়া **যায় না**; পাওয়া যায় **কিছু C A নয়** (যে C-গুলি B, সেগুলি A হতে পারে না)।\n\nউদাহরণ: কোনো cat dog নয়; সব dog হল pet → "কিছু pet cat নয়" অনুসরণ করে; "কোনো cat pet নয়" অনুসরণ করে না।',
        },
        approx_time_saved_sec: 15,
      },
    ],
    common_traps: [
      {
        en: '**"Some A are B" does not imply "Some A are not B".** "Some" means *at least one, possibly all*. So from "Some A are B", "All A are B" is still a possibility.',
        bn: '**"কিছু A হল B" থেকে "কিছু A B নয়" বোঝায় না।** "কিছু" মানে *অন্তত একটি, সবগুলিও হতে পারে*। তাই "কিছু A হল B" থাকলেও "সব A হল B" একটি সম্ভাবনা থেকে যায়।',
      },
      {
        en: '**"All A are B" does not mean "All B are A".** It only gives "Some B are A".',
        bn: '**"সব A হল B" মানে "সব B হল A" নয়।** এ থেকে কেবল "কিছু B হল A" পাওয়া যায়।',
      },
      {
        en: '**Using real-world knowledge.** "All cats are tables; all tables are birds" → "All cats are birds" **follows**, however silly it sounds. Judge only by the statements.',
        bn: '**বাস্তব জ্ঞান প্রয়োগ করা।** "সব cat হল table; সব table হল bird" → "সব cat হল bird" **অনুসরণ করে**, যত অদ্ভুতই শোনাক। কেবল বিবৃতি দেখে বিচার করুন।',
      },
      {
        en: '**Applying either–or wrongly.** Use it only when neither conclusion follows on its own and both have exactly the same two terms. If one of them already follows, the answer is "only that one follows".',
        bn: '**ভুলভাবে "হয় অথবা" প্রয়োগ।** কেবল তখনই ব্যবহার করুন যখন কোনো সিদ্ধান্তই আলাদাভাবে অনুসরণ করে না এবং দুটিরই পদ হুবহু একই। একটি আগেই অনুসরণ করলে উত্তর হবে "শুধু সেটিই অনুসরণ করে"।',
      },
    ],
  },

  // ───────────────────────────── SEATING ARRANGEMENT ─────────────────────────────
  {
    subject: 'reasoning',
    topic: 'seating_arrangement',
    title: { en: 'Seating Arrangement', bn: 'বসার বিন্যাস', hi: 'बैठक व्यवस्था' },
    overview: {
      en: `Seating puzzles place people in a **single row**, **two parallel rows** facing each other, or around a **circle / square table** (facing the centre, facing outside, or mixed), and ask who sits where. The approach is the same for all: identify the type and which way people face, start with the **definite** clues (ends, middle, fixed neighbours), then use **relative** clues to build one or two possible cases, and finally use the **negative** clues ("D is not next to A") to eliminate cases. Re-check every clue against the final arrangement before answering.`,
      bn: `বসার বিন্যাসের ধাঁধায় লোকেদের **এক সারিতে**, মুখোমুখি **দুটি সমান্তরাল সারিতে**, বা **বৃত্তাকার / বর্গাকার টেবিলের** চারপাশে (কেন্দ্রমুখী, বাইরের দিকে মুখ, বা মিশ্র) বসিয়ে জিজ্ঞাসা করা হয় কে কোথায় বসেছে। সব ধরনেই পদ্ধতি এক: ধরন ও মুখের দিক চিনুন, **নিশ্চিত** সূত্রগুলি (প্রান্ত, মাঝখান, নির্দিষ্ট প্রতিবেশী) দিয়ে শুরু করুন, তারপর **আপেক্ষিক** সূত্র দিয়ে এক বা দুটি সম্ভাব্য বিন্যাস তৈরি করুন, এবং শেষে **নেতিবাচক** সূত্র ("D, A-র পাশে নয়") দিয়ে বিন্যাস বাদ দিন। উত্তর দেওয়ার আগে চূড়ান্ত বিন্যাসে প্রতিটি সূত্র আবার মিলিয়ে নিন।`,
    },
    formulas: [
      {
        key: 'row_total',
        label: { en: 'Total in a row from two ranks', bn: 'দুই দিকের অবস্থান থেকে সারির মোট সংখ্যা', hi: 'दो ओर के स्थान से पंक्ति में कुल संख्या' },
        latex: 'N = L + R - 1',
        variables: [
          { symbol: 'L', meaning: { en: 'Position from the left end', bn: 'বাঁ প্রান্ত থেকে অবস্থান' } },
          { symbol: 'R', meaning: { en: 'Position from the right end', bn: 'ডান প্রান্ত থেকে অবস্থান' } },
        ],
        explanation: {
          en: 'Example: 7th from the left and 12th from the right → $7 + 12 - 1 = 18$ people.',
          bn: 'উদাহরণ: বাঁ দিক থেকে 7ম ও ডান দিক থেকে 12তম → $7 + 12 - 1 = 18$ জন।',
        },
      },
      {
        key: 'circle_between',
        label: { en: 'People between two persons in a circle', bn: 'বৃত্তে দুজনের মাঝে লোকসংখ্যা', hi: 'वृत्त में दो व्यक्तियों के बीच लोग' },
        latex: '\\text{other side} = n - k - 2',
        variables: [
          { symbol: 'n', meaning: { en: 'Total people in the circle', bn: 'বৃত্তে মোট লোক' } },
          { symbol: 'k', meaning: { en: 'People between them on one side', bn: 'এক দিকে তাদের মাঝে লোকসংখ্যা' } },
        ],
        explanation: {
          en: 'Example: 10 people, 3 between A and B on one side → $10 - 3 - 2 = 5$ on the other side.',
          bn: 'উদাহরণ: 10 জন, এক দিকে A ও B-র মাঝে 3 জন → অন্য দিকে $10 - 3 - 2 = 5$ জন।',
        },
      },
    ],
    derivation_rules: [
      {
        title: { en: 'Fix the facing direction first', bn: 'আগে মুখের দিক ঠিক করুন', hi: 'पहले मुख की दिशा तय करें' },
        body: {
          en: '- Row facing **North**: their left/right = your left/right on paper.\n- Row facing **South**: left/right are reversed.\n- Circle facing the **centre**: right = anticlockwise, left = clockwise.\n- Circle facing **outside**: right = clockwise, left = anticlockwise.',
          bn: '- **উত্তরমুখী** সারি: তাদের বাঁ/ডান = কাগজে আপনার বাঁ/ডান।\n- **দক্ষিণমুখী** সারি: বাঁ/ডান উল্টে যায়।\n- **কেন্দ্রমুখী** বৃত্ত: ডান = ঘড়ির কাঁটার বিপরীতে, বাঁ = ঘড়ির কাঁটার দিকে।\n- **বাইরের দিকে মুখ** করা বৃত্ত: ডান = ঘড়ির কাঁটার দিকে, বাঁ = ঘড়ির কাঁটার বিপরীতে।',
        },
      },
      {
        title: { en: 'Definite clues first, then relative, then negative', bn: 'আগে নিশ্চিত, তারপর আপেক্ষিক, শেষে নেতিবাচক সূত্র', hi: 'पहले निश्चित, फिर सापेक्ष, अंत में नकारात्मक सूत्र' },
        body: {
          en: 'Example: A, B, C, D, E sit in a row facing North. C is in the middle; A is at the left end; B is immediately right of C; D is not next to A.\n\nSeats 1–5 from left: A = 1, C = 3, B = 4 (definite). D and E take seats 2 and 5; D is not next to A, so D = 5, E = 2. Order: **A E C B D**.',
          bn: 'উদাহরণ: A, B, C, D, E উত্তরমুখী হয়ে এক সারিতে বসে। C মাঝখানে; A বাঁ প্রান্তে; B ঠিক C-র ডানে; D, A-র পাশে নয়।\n\nবাঁ দিক থেকে আসন 1–5: A = 1, C = 3, B = 4 (নিশ্চিত)। D ও E বাকি আসন 2 ও 5-এ; D, A-র পাশে নয়, তাই D = 5, E = 2। ক্রম: **A E C B D**।',
        },
      },
      {
        title: { en: 'Branch into cases, then eliminate', bn: 'বিকল্প বিন্যাসে ভাগ করে বাদ দিন', hi: 'संभावित स्थितियाँ बनाकर हटाएँ' },
        body: {
          en: 'When a clue allows two positions ("X sits at one of the ends"), draw Case 1 and Case 2 side by side and continue both. The first clue that breaks a case removes it; the surviving case is the answer.',
          bn: 'কোনো সূত্রে দুটি অবস্থান সম্ভব হলে ("X কোনো এক প্রান্তে বসে"), বিন্যাস 1 ও বিন্যাস 2 পাশাপাশি আঁকুন ও দুটিই এগিয়ে নিন। যে সূত্র কোনো বিন্যাস ভেঙে দেয়, সেটি বাদ যায়; টিকে থাকা বিন্যাসটিই উত্তর।',
        },
      },
      {
        title: { en: 'Final check', bn: 'শেষ যাচাই', hi: 'अंतिम जाँच' },
        body: {
          en: 'Read every clue once more against the finished arrangement. One overlooked clue (often a negative one) is the most common reason for a wrong answer.',
          bn: 'চূড়ান্ত বিন্যাসের সঙ্গে প্রতিটি সূত্র আরেকবার মিলিয়ে পড়ুন। একটি বাদ পড়া সূত্র (প্রায়ই নেতিবাচকটি) ভুল উত্তরের সবচেয়ে সাধারণ কারণ।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Opposite seat in an even circle', bn: 'জোড় সংখ্যার বৃত্তে বিপরীত আসন', hi: 'सम संख्या वाले वृत्त में सामने की सीट' },
        body: {
          en: 'With $n$ people (even) evenly spaced, the person directly opposite is $\\frac{n}{2}$ seats away in either direction.\n\nExample: 8 people → 4th to the left and 4th to the right of A are the same person, sitting opposite A.',
          bn: '$n$ জন (জোড় সংখ্যা) সমান দূরত্বে বসলে ঠিক বিপরীতের ব্যক্তি যেকোনো দিকে $\\frac{n}{2}$ আসন দূরে।\n\nউদাহরণ: 8 জন → A-র বাঁ দিকে 4র্থ ও ডান দিকে 4র্থ একই ব্যক্তি, যিনি A-র ঠিক বিপরীতে বসে।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: '"k-th to the left" in an n-circle', bn: 'n-জনের বৃত্তে "বাঁ দিকে k-তম"', hi: 'n-व्यक्ति वृत्त में "बाएँ k-वाँ"' },
        body: {
          en: 'In a circle of $n$, the $k$-th person to the left is the same as the $(n - k)$-th person to the right.\n\nExample: 8 people, "3rd to the left of A" = "5th to the right of A".',
          bn: '$n$ জনের বৃত্তে বাঁ দিকে $k$-তম ব্যক্তি আর ডান দিকে $(n - k)$-তম ব্যক্তি একই।\n\nউদাহরণ: 8 জন, "A-র বাঁ দিকে 3য়" = "A-র ডান দিকে 5ম"।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Row total in one line', bn: 'এক লাইনে সারির মোট সংখ্যা', hi: 'एक पंक्ति में कुल संख्या' },
        body: {
          en: 'Rank from left + rank from right − 1. If two different people are given (A is 5th from left, B is 6th from right, 3 people between them, A left of B, no overlap), total $= 5 + 3 + 6 = 14$.',
          bn: 'বাঁ দিক থেকে অবস্থান + ডান দিক থেকে অবস্থান − 1। দুজন আলাদা ব্যক্তি দেওয়া থাকলে (A বাঁ দিক থেকে 5ম, B ডান দিক থেকে 6ষ্ঠ, তাদের মাঝে 3 জন, A আছে B-র বাঁয়ে, কেউ দুবার গোনা হয়নি), মোট $= 5 + 3 + 6 = 14$।',
        },
        approx_time_saved_sec: 20,
      },
    ],
    common_traps: [
      {
        en: '**Facing outside or South reverses left/right.** Applying the "facing centre" rule to people facing outside puts everyone on the wrong side.',
        bn: '**বাইরের দিকে বা দক্ষিণমুখী হলে বাঁ/ডান উল্টে যায়।** বাইরের দিকে মুখ করা লোকেদের উপর "কেন্দ্রমুখী" নিয়ম খাটালে সবাই ভুল দিকে বসে যায়।',
      },
      {
        en: '**"Second to the right" ≠ "two people between".** Second to the right of A means exactly **one** person sits between them.',
        bn: '**"ডান দিকে দ্বিতীয়" ≠ "মাঝে দুজন"।** A-র ডান দিকে দ্বিতীয় মানে তাদের মাঝে ঠিক **একজন** বসে।',
      },
      {
        en: '**"Immediate" matters.** "B sits to the right of C" (anywhere to the right) is weaker than "B sits to the immediate right of C". Do not fix a seat from the weaker clue.',
        bn: '**"ঠিক পাশে" শব্দটি গুরুত্বপূর্ণ।** "B, C-র ডানে বসে" (ডান দিকে যেকোনো জায়গায়) কথাটি "B, ঠিক C-র ডানে বসে"-র চেয়ে দুর্বল। দুর্বল সূত্র থেকে আসন নির্দিষ্ট করবেন না।',
      },
      {
        en: '**Mixed facing in one circle.** When some face the centre and some face outside, find each person\'s left/right separately; neighbours are the same, but "to the right of" changes with the person.',
        bn: '**একই বৃত্তে মিশ্র মুখ।** কেউ কেন্দ্রমুখী আর কেউ বাইরের দিকে মুখ করে থাকলে প্রত্যেকের বাঁ/ডান আলাদাভাবে বের করুন; প্রতিবেশী একই থাকে, কিন্তু "ডানে" ব্যক্তিভেদে বদলায়।',
      },
    ],
  },
];
