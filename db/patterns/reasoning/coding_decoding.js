'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'reasoning',
  topic: 'coding_decoding',
  patterns: [
    {
      key: 'letter_shift',
      emoji: '➡️',
      name: t(`Letter shift (+n / −n)`, `বর্ণ সরণ (+n / −n)`),
      spot: t(
        `A word is written as another group of letters of the same length, and each code letter is just a few steps ahead of (or behind) the original letter.`,
        `একটি শব্দকে সমান দৈর্ঘ্যের অন্য বর্ণগুচ্ছ হিসেবে লেখা হয়, আর প্রতিটি কোড-বর্ণ আসল বর্ণ থেকে কয়েক ঘর সামনে (বা পিছনে) থাকে।`,
      ),
      method: [
        t(`Write the word and its code one below the other, letter under letter.`, `শব্দ আর তার কোড একটার নিচে আরেকটা লেখো, বর্ণের নিচে বর্ণ।`),
        t(`Find the shift for each letter using positions (EJOTY: E = 5, J = 10, O = 15, T = 20, Y = 25).`, `স্থান-সংখ্যা দিয়ে প্রতিটি বর্ণের সরণ বের করো (EJOTY: E = 5, J = 10, O = 15, T = 20, Y = 25)।`),
        t(`If the shift is the same for all letters, apply it to the new word. After Z, go back to A.`, `সব বর্ণের সরণ একই হলে নতুন শব্দে সেটাই প্রয়োগ করো। Z-এর পরে আবার A থেকে শুরু।`),
      ],
      example: {
        question: t(`If CAT is coded as DBU, how is DOG coded?`, `যদি CAT-কে DBU লেখা হয়, তবে DOG-কে কী লেখা হবে?`),
        steps: [
          t(`C → D, A → B, T → U: each letter moves +1.`, `C → D, A → B, T → U: প্রতিটি বর্ণ +1 সরেছে।`),
          t(`D + 1 = E, O + 1 = P, G + 1 = H.`, `তাই D + 1 = E, O + 1 = P, G + 1 = H।`),
        ],
        answer: t(`EPH`, `উত্তর: EPH`),
      },
      tryIt: {
        question: t(`In a certain code, MANGO is written as OCPIQ. How is APPLE written in that code?`, `একটি সাংকেতিক ভাষায় MANGO-কে OCPIQ লেখা হয়। সেই ভাষায় APPLE-কে কী লেখা হবে?`),
        options: [t('BQQMF', 'BQQMF'), t('YNNJC', 'YNNJC'), t('CRRNG', 'CRRNG'), t('CRRMG', 'CRRMG')],
        correct: 2,
        explanation: [
          t(`M → O, A → C, N → P, G → I, O → Q: each letter moves +2.`, `M → O, A → C, N → P, G → I, O → Q: প্রতিটি বর্ণ +2 সরেছে।`),
          t(`A → C, P → R, P → R, L → N, E → G.`, `তাই APPLE-এ: A → C, P → R, P → R, L → N, E → G।`),
          t(`So APPLE = CRRNG. (BQQMF is +1 and YNNJC is −2: wrong shift.)`, `অর্থাৎ APPLE = CRRNG। (BQQMF হল +1 আর YNNJC হল −2: ভুল সরণ।)`),
        ],
      },
    },
    {
      key: 'reverse_alphabet',
      emoji: '🔁',
      name: t(`Reverse alphabet (opposite letters, A ↔ Z)`, `উল্টো বর্ণমালা (বিপরীত বর্ণ, A ↔ Z)`),
      spot: t(
        `Code letters come from the other end of the alphabet: A becomes Z, B becomes Y, and so on. Check: letter position + code position = 27.`,
        `কোড-বর্ণ বর্ণমালার উল্টো প্রান্ত থেকে আসে: A হয় Z, B হয় Y, এভাবে। পরীক্ষা: বর্ণের স্থান + কোডের স্থান = 27।`,
      ),
      method: [
        t(`Check one or two letters: if their positions add up to 27, it is opposite-letter coding.`, `এক-দুটি বর্ণ পরখ করো: স্থান-সংখ্যার যোগফল 27 হলে এটা বিপরীত বর্ণের কোড।`),
        t(`Remember the pairs: **AZ, BY, CX, DW, EV, FU, GT, HS, IR, JQ, KP, LO, MN**.`, `জোড়াগুলি মনে রাখো: **AZ, BY, CX, DW, EV, FU, GT, HS, IR, JQ, KP, LO, MN**।`),
        t(`Replace each letter of the new word by its partner, without changing the order.`, `নতুন শব্দের প্রতিটি বর্ণ তার জোড়া দিয়ে বদলাও, ক্রম না বদলে।`),
      ],
      example: {
        question: t(`If BAD is coded as YZW, how is FACE coded?`, `যদি BAD-কে YZW লেখা হয়, তবে FACE-কে কী লেখা হবে?`),
        steps: [
          t(`B(2) + Y(25) = 27, A(1) + Z(26) = 27, D(4) + W(23) = 27: opposite letters.`, `B(2) + Y(25) = 27, A(1) + Z(26) = 27, D(4) + W(23) = 27: বিপরীত বর্ণ।`),
          t(`F ↔ U, A ↔ Z, C ↔ X, E ↔ V.`, `FACE-এ: F ↔ U, A ↔ Z, C ↔ X, E ↔ V।`),
        ],
        answer: t(`UZXV`, `উত্তর: UZXV`),
      },
      tryIt: {
        question: t(`If ROSE is coded as ILHV, how is LILY coded?`, `যদি ROSE-কে ILHV লেখা হয়, তবে LILY-কে কী লেখা হবে?`),
        options: [t('OROB', 'OROB'), t('MJMZ', 'MJMZ'), t('BORO', 'BORO'), t('OSOB', 'OSOB')],
        correct: 0,
        explanation: [
          t(`R ↔ I, O ↔ L, S ↔ H, E ↔ V: each pair adds to 27, so it is opposite-letter coding.`, `R ↔ I, O ↔ L, S ↔ H, E ↔ V: প্রতিটি জোড়ার যোগফল 27, তাই বিপরীত বর্ণের কোড।`),
          t(`L ↔ O, I ↔ R, L ↔ O, Y ↔ B.`, `LILY-তে: L ↔ O, I ↔ R, L ↔ O, Y ↔ B।`),
          t(`So LILY = OROB. (BORO is the right letters in reverse order; MJMZ is a +1 shift.)`, `অর্থাৎ LILY = OROB। (BORO-তে বর্ণ ঠিক কিন্তু ক্রম উল্টো; MJMZ হল +1 সরণ।)`),
        ],
      },
    },
    {
      key: 'letter_to_number',
      emoji: '🔢',
      name: t(`Letter-to-number coding (position values)`, `বর্ণ থেকে সংখ্যা কোড (স্থান-মান)`),
      spot: t(
        `A word is given a number, e.g. "If CAB = 6". The number usually comes from adding (or writing) the alphabet positions of the letters.`,
        `একটি শব্দকে একটি সংখ্যা দেওয়া হয়, যেমন "যদি CAB = 6"। সংখ্যাটি সাধারণত বর্ণগুলির স্থান-মান যোগ করে (বা পাশাপাশি লিখে) তৈরি হয়।`,
      ),
      method: [
        t(`Write the position of every letter (A = 1 ... Z = 26; use EJOTY to count fast).`, `প্রতিটি বর্ণের স্থান-মান লেখো (A = 1 ... Z = 26; তাড়াতাড়ি গুনতে EJOTY)।`),
        t(`Test the simple rules on the given word: sum of positions, positions written side by side, or sum × something.`, `দেওয়া শব্দে সহজ নিয়মগুলি পরখ করো: স্থান-মানের যোগফল, পাশাপাশি লেখা, বা যোগফল × কিছু।`),
        t(`Use the rule that gives exactly the given number, then apply it to the new word.`, `যে নিয়মে ঠিক দেওয়া সংখ্যাটাই আসে, সেটি নতুন শব্দে প্রয়োগ করো।`),
      ],
      example: {
        question: t(`If CAB = 6, then BED = ?`, `যদি CAB = 6 হয়, তবে BED = কত?`),
        steps: [
          t(`C = 3, A = 1, B = 2, and 3 + 1 + 2 = 6. Rule: add the positions.`, `C = 3, A = 1, B = 2, আর 3 + 1 + 2 = 6। নিয়ম: স্থান-মান যোগ করো।`),
          t(`B = 2, E = 5, D = 4, so 2 + 5 + 4 = 11.`, `B = 2, E = 5, D = 4, তাই 2 + 5 + 4 = 11।`),
        ],
        answer: t(`11`, `উত্তর: 11`),
      },
      tryIt: {
        question: t(`If PEN = 35, then INK = ?`, `যদি PEN = 35 হয়, তবে INK = কত?`),
        options: [t('35', '35'), t('34', '34'), t('33', '33'), t('91411', '91411')],
        correct: 1,
        explanation: [
          t(`P = 16, E = 5, N = 14, and 16 + 5 + 14 = 35. Rule: add the positions.`, `P = 16, E = 5, N = 14, আর 16 + 5 + 14 = 35। নিয়ম: স্থান-মান যোগ করো।`),
          t(`I = 9, N = 14, K = 11, so 9 + 14 + 11 = 34.`, `I = 9, N = 14, K = 11, তাই 9 + 14 + 11 = 34।`),
          t(`91411 is the positions written side by side, but PEN was not coded that way.`, `91411 হল স্থান-মান পাশাপাশি লেখা, কিন্তু PEN-কে সেভাবে কোড করা হয়নি।`),
        ],
      },
    },
    {
      key: 'word_substitution',
      emoji: '🔄',
      name: t(`Word substitution ("sky is called sea")`, `শব্দ প্রতিস্থাপন ("আকাশকে সমুদ্র বলা হয়")`),
      spot: t(
        `A chain of "X is called Y" statements is given, then a real-life question like "Where do fish live?" or "What is the colour of grass?"`,
        `"X-কে Y বলা হয়" ধরনের পরপর কয়েকটি বাক্য থাকে, তারপর বাস্তব জীবনের প্রশ্ন, যেমন "মাছ কোথায় থাকে?" বা "ঘাসের রং কী?"`,
      ),
      method: [
        t(`First answer the question in real life (fish live in water).`, `আগে প্রশ্নটার আসল উত্তর ভাবো (মাছ জলে থাকে)।`),
        t(`Find that real answer on the **left side** of a statement ("water is called ...").`, `সেই আসল উত্তরটা কোনো বাক্যের **বাঁ দিকে** খোঁজো ("জলকে ... বলা হয়")।`),
        t(`The new name on the right side is the answer. Do not stop at the real word.`, `ডান দিকের নতুন নামটাই উত্তর। আসল শব্দেই থেমে যেও না।`),
      ],
      example: {
        question: t(
          `If 'sky' is called 'sea', 'sea' is called 'water', 'water' is called 'air' and 'air' is called 'cloud', then where do fish live?`,
          `যদি 'sky'-কে 'sea', 'sea'-কে 'water', 'water'-কে 'air' এবং 'air'-কে 'cloud' বলা হয়, তবে মাছ কোথায় থাকে?`,
        ),
        steps: [
          t(`In real life, fish live in water.`, `বাস্তবে মাছ জলে (water) থাকে।`),
          t(`'water' is called 'air' in this code.`, `এই কোডে 'water'-কে 'air' বলা হয়।`),
        ],
        answer: t(`air`, `উত্তর: air`),
      },
      tryIt: {
        question: t(
          `If 'red' means 'blue', 'blue' means 'green', 'green' means 'yellow' and 'yellow' means 'white', then what is the colour of grass?`,
          `যদি 'red' মানে 'blue', 'blue' মানে 'green', 'green' মানে 'yellow' এবং 'yellow' মানে 'white' হয়, তবে ঘাসের রং কী?`,
        ),
        options: [t('green', 'green'), t('blue', 'blue'), t('white', 'white'), t('yellow', 'yellow')],
        correct: 3,
        explanation: [
          t(`In real life, grass is green.`, `বাস্তবে ঘাসের রং সবুজ (green)।`),
          t(`'green' means 'yellow' in this code, so the answer is yellow. (Choosing 'green' means you stopped at the real word.)`, `এই কোডে 'green' মানে 'yellow', তাই উত্তর yellow। ('green' বাছলে আসল শব্দেই থেমে গেছ।)`),
        ],
      },
    },
    {
      key: 'rearranging_letters',
      emoji: '🔀',
      name: t(`Coding by rearranging letters`, `বর্ণ সাজিয়ে কোড`),
      spot: t(
        `The code uses exactly the same letters as the word, only in a different order (reversed, halves reversed, pairs swapped).`,
        `কোডে শব্দের ঠিক একই বর্ণগুলি থাকে, শুধু ক্রম আলাদা (উল্টো, অর্ধেক অর্ধেক উল্টো, জোড়ায় জোড়ায় অদলবদল)।`,
      ),
      method: [
        t(`Check that the code has the same letters; if yes, it is a rearrangement, not a shift.`, `দেখো কোডে একই বর্ণ আছে কিনা; থাকলে এটা সাজানো, সরণ নয়।`),
        t(`Split the word into parts (two halves, or pairs) and see what happened to each part.`, `শব্দটাকে ভাগ করো (দুই অর্ধেক, বা জোড়া) আর দেখো প্রতিটি ভাগের কী হল।`),
        t(`Do exactly the same to the new word.`, `নতুন শব্দে হুবহু একই কাজ করো।`),
      ],
      example: {
        question: t(`If GARDEN is coded as RAGNED, how is FLOWER coded?`, `যদি GARDEN-কে RAGNED লেখা হয়, তবে FLOWER-কে কী লেখা হবে?`),
        steps: [
          t(`Split: GAR | DEN. Code: RAG | NED. Each half is written in reverse.`, `ভাগ করো: GAR | DEN। কোড: RAG | NED। প্রতিটি অর্ধেক উল্টো করে লেখা।`),
          t(`FLOWER → FLO | WER → OLF | REW.`, `তাই FLOWER → FLO | WER → OLF | REW।`),
        ],
        answer: t(`OLFREW`, `উত্তর: OLFREW`),
      },
      tryIt: {
        question: t(`If MOTHER is written as TOMREH, how is PLANET written?`, `যদি MOTHER-কে TOMREH লেখা হয়, তবে PLANET-কে কী লেখা হবে?`),
        options: [t('TENALP', 'TENALP'), t('ALPTEN', 'ALPTEN'), t('NETPLA', 'NETPLA'), t('ALPNET', 'ALPNET')],
        correct: 1,
        explanation: [
          t(`MOT | HER → TOM | REH: each half is reversed.`, `MOT | HER → TOM | REH: প্রতিটি অর্ধেক উল্টো হয়েছে।`),
          t(`PLA | NET → ALP | TEN, so PLANET = ALPTEN.`, `PLA | NET → ALP | TEN, তাই PLANET = ALPTEN।`),
          t(`TENALP reverses the whole word, and ALPNET reverses only the first half: both are wrong.`, `TENALP-এ পুরো শব্দ উল্টো, আর ALPNET-এ শুধু প্রথম অর্ধেক উল্টো: দুটোই ভুল।`),
        ],
      },
    },
  ],
};
