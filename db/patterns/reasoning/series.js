'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'reasoning',
  topic: 'series',
  patterns: [
    {
      key: 'difference_series',
      emoji: '➕',
      name: t(`Difference series (+ fixed / + growing)`, `পার্থক্যের শ্রেণি (+ স্থির / + বাড়ন্ত)`),
      spot: t(
        `The numbers rise (or fall) slowly and evenly. The gaps between terms are equal, or themselves go up by a fixed amount (3, 5, 7, 9 ...).`,
        `সংখ্যাগুলি ধীরে ও সমানভাবে বাড়ে (বা কমে)। পদগুলির ফাঁক সমান, অথবা ফাঁকগুলিও নিজেরা নির্দিষ্ট হারে বাড়ে (3, 5, 7, 9 ...)।`,
      ),
      method: [
        t(`Write the difference between each pair of next-door terms under the series.`, `শ্রেণির নিচে পাশাপাশি প্রতিটি পদের পার্থক্য লেখো।`),
        t(`If the differences are equal, keep adding the same. If not, look at the differences of the differences.`, `পার্থক্য সমান হলে একই সংখ্যা যোগ করতে থাকো। না হলে পার্থক্যগুলির পার্থক্য দেখো।`),
        t(`Find the next difference and add it to the last term.`, `পরের পার্থক্য বের করে শেষ পদের সঙ্গে যোগ করো।`),
      ],
      example: {
        question: t(`Find the next term: 2, 5, 10, 17, 26, ?`, `পরের পদটি নির্ণয় করো: 2, 5, 10, 17, 26, ?`),
        steps: [
          t(`Differences: 3, 5, 7, 9 (odd numbers, going up by 2).`, `পার্থক্য: 3, 5, 7, 9 (বিজোড় সংখ্যা, 2 করে বাড়ছে)।`),
          t(`Next difference = 11, so the next term = 26 + 11 = 37.`, `পরের পার্থক্য = 11, তাই পরের পদ = 26 + 11 = 37।`),
        ],
        answer: t(`37`, `উত্তর: 37`),
      },
      tryIt: {
        question: t(`Find the next term: 4, 6, 10, 16, 24, ?`, `পরের পদটি নির্ণয় করো: 4, 6, 10, 16, 24, ?`),
        options: [t('32', '32'), t('34', '34'), t('36', '36'), t('30', '30')],
        correct: 1,
        explanation: [
          t(`Differences: 2, 4, 6, 8 (going up by 2).`, `পার্থক্য: 2, 4, 6, 8 (2 করে বাড়ছে)।`),
          t(`Next difference = 10, so 24 + 10 = 34. (32 comes from adding 8 again.)`, `পরের পার্থক্য = 10, তাই 24 + 10 = 34। (আবার 8 যোগ করলে 32 আসে, সেটা ভুল।)`),
        ],
      },
    },
    {
      key: 'multiplication_series',
      emoji: '✖️',
      name: t(`Multiplication series (×n, ×n + k)`, `গুণের শ্রেণি (×n, ×n + k)`),
      spot: t(
        `The numbers grow very fast (2, 6, 18, 54 ...). Each term is about 2 or 3 times the one before.`,
        `সংখ্যাগুলি খুব তাড়াতাড়ি বাড়ে (2, 6, 18, 54 ...)। প্রতিটি পদ আগেরটার প্রায় 2 বা 3 গুণ।`,
      ),
      method: [
        t(`Divide each term by the one before it to see the multiplier.`, `প্রতিটি পদকে তার আগের পদ দিয়ে ভাগ করে গুণক দেখো।`),
        t(`If it is not exact, try "× n then + k" or "× n then − k" (e.g. ×2 + 1).`, `ঠিক না মিললে "× n তারপর + k" বা "× n তারপর − k" চেষ্টা করো (যেমন ×2 + 1)।`),
        t(`Check the rule on every term, then use it for the next one.`, `নিয়মটি প্রতিটি পদে মিলিয়ে দেখো, তারপর পরের পদ বের করো।`),
      ],
      example: {
        question: t(`Find the next term: 2, 6, 18, 54, ?`, `পরের পদটি নির্ণয় করো: 2, 6, 18, 54, ?`),
        steps: [
          t(`6 ÷ 2 = 3, 18 ÷ 6 = 3, 54 ÷ 18 = 3: each term is ×3.`, `6 ÷ 2 = 3, 18 ÷ 6 = 3, 54 ÷ 18 = 3: প্রতিটি পদ ×3।`),
          t(`54 × 3 = 162.`, `তাই 54 × 3 = 162।`),
        ],
        answer: t(`162`, `উত্তর: 162`),
      },
      tryIt: {
        question: t(`Find the next term: 3, 7, 15, 31, 63, ?`, `পরের পদটি নির্ণয় করো: 3, 7, 15, 31, 63, ?`),
        options: [t('126', '126'), t('95', '95'), t('127', '127'), t('125', '125')],
        correct: 2,
        explanation: [
          t(`3 × 2 + 1 = 7, 7 × 2 + 1 = 15, 15 × 2 + 1 = 31, 31 × 2 + 1 = 63: the rule is ×2 + 1.`, `3 × 2 + 1 = 7, 7 × 2 + 1 = 15, 15 × 2 + 1 = 31, 31 × 2 + 1 = 63: নিয়ম ×2 + 1।`),
          t(`63 × 2 + 1 = 127. (126 forgets the +1.)`, `63 × 2 + 1 = 127। (126 হলে +1 ভুলে গেছ।)`),
        ],
      },
    },
    {
      key: 'square_cube_series',
      emoji: '🟦',
      name: t(`Square and cube series (n², n³, n² ± 1)`, `বর্গ ও ঘনের শ্রেণি (n², n³, n² ± 1)`),
      spot: t(
        `The terms are close to perfect squares (1, 4, 9, 16 ...) or cubes (1, 8, 27, 64 ...), maybe one more or one less.`,
        `পদগুলি পূর্ণবর্গ (1, 4, 9, 16 ...) বা পূর্ণঘনের (1, 8, 27, 64 ...) কাছাকাছি, হয়তো এক বেশি বা এক কম।`,
      ),
      method: [
        t(`Compare each term with the nearest square or cube.`, `প্রতিটি পদকে নিকটতম বর্গ বা ঘনের সঙ্গে তুলনা করো।`),
        t(`Note the base numbers (2, 3, 4 ...) and the fixed "+1" or "−1" if any.`, `ভিত্তি সংখ্যাগুলি (2, 3, 4 ...) আর থাকলে নির্দিষ্ট "+1" বা "−1" লিখে রাখো।`),
        t(`Take the next base number and apply the same rule.`, `পরের ভিত্তি সংখ্যা নিয়ে একই নিয়ম প্রয়োগ করো।`),
      ],
      example: {
        question: t(`Find the next term: 0, 7, 26, 63, ?`, `পরের পদটি নির্ণয় করো: 0, 7, 26, 63, ?`),
        steps: [
          t(`0 = 1³ − 1, 7 = 2³ − 1, 26 = 3³ − 1, 63 = 4³ − 1.`, `দেখো: 0 = 1³ − 1, 7 = 2³ − 1, 26 = 3³ − 1, 63 = 4³ − 1।`),
          t(`Next: 5³ − 1 = 125 − 1 = 124.`, `পরের পদ: 5³ − 1 = 125 − 1 = 124।`),
        ],
        answer: t(`124`, `উত্তর: 124`),
      },
      tryIt: {
        question: t(`Find the next term: 3, 8, 15, 24, 35, ?`, `পরের পদটি নির্ণয় করো: 3, 8, 15, 24, 35, ?`),
        options: [t('48', '48'), t('49', '49'), t('46', '46'), t('50', '50')],
        correct: 0,
        explanation: [
          t(`3 = 2² − 1, 8 = 3² − 1, 15 = 4² − 1, 24 = 5² − 1, 35 = 6² − 1.`, `দেখো: 3 = 2² − 1, 8 = 3² − 1, 15 = 4² − 1, 24 = 5² − 1, 35 = 6² − 1।`),
          t(`Next: 7² − 1 = 49 − 1 = 48. (49 forgets the −1.)`, `পরের পদ: 7² − 1 = 49 − 1 = 48। (49 হলে −1 ভুলে গেছ।)`),
        ],
      },
    },
    {
      key: 'letter_series',
      emoji: '🔤',
      name: t(`Letter series`, `বর্ণের শ্রেণি`),
      spot: t(
        `The series is made of letters (A, C, F, J ...) instead of numbers.`,
        `শ্রেণিটি সংখ্যার বদলে বর্ণ দিয়ে তৈরি (A, C, F, J ...)।`,
      ),
      method: [
        t(`Change every letter to its position number (EJOTY: E = 5, J = 10, O = 15, T = 20, Y = 25).`, `প্রতিটি বর্ণকে তার স্থান-সংখ্যায় বদলাও (EJOTY: E = 5, J = 10, O = 15, T = 20, Y = 25)।`),
        t(`Now solve it like a number series (look at the differences).`, `এবার সংখ্যার শ্রেণির মতো সমাধান করো (পার্থক্য দেখো)।`),
        t(`Change the answer number back into a letter.`, `উত্তরের সংখ্যাটিকে আবার বর্ণে ফেরাও।`),
      ],
      example: {
        question: t(`Find the next letter: A, C, F, J, O, ?`, `পরের বর্ণটি নির্ণয় করো: A, C, F, J, O, ?`),
        steps: [
          t(`Positions: 1, 3, 6, 10, 15.`, `স্থান-সংখ্যা: 1, 3, 6, 10, 15।`),
          t(`Differences: +2, +3, +4, +5, so the next is +6.`, `পার্থক্য: +2, +3, +4, +5, তাই পরেরটি +6।`),
          t(`15 + 6 = 21, and the 21st letter is U.`, `15 + 6 = 21, আর 21-তম বর্ণ U।`),
        ],
        answer: t(`U`, `উত্তর: U`),
      },
      tryIt: {
        question: t(`Find the next letter: Z, W, T, Q, ?`, `পরের বর্ণটি নির্ণয় করো: Z, W, T, Q, ?`),
        options: [t('O', 'O'), t('M', 'M'), t('P', 'P'), t('N', 'N')],
        correct: 3,
        explanation: [
          t(`Positions: 26, 23, 20, 17: each step is −3.`, `স্থান-সংখ্যা: 26, 23, 20, 17: প্রতি ধাপে −3।`),
          t(`17 − 3 = 14, and the 14th letter is N.`, `17 − 3 = 14, আর 14-তম বর্ণ N।`),
        ],
      },
    },
    {
      key: 'alternating_series',
      emoji: '🔀',
      name: t(`Alternating series (two series mixed)`, `একান্তর শ্রেণি (দুটি শ্রেণি মেশানো)`),
      spot: t(
        `The numbers jump up and down with no single pattern (2, 10, 4, 20, 6 ...). Usually the series is long (7 or more terms).`,
        `সংখ্যাগুলি একবার বাড়ে একবার কমে, একটা নিয়মে মেলে না (2, 10, 4, 20, 6 ...)। সাধারণত শ্রেণিটি লম্বা (7 বা তার বেশি পদ)।`,
      ),
      method: [
        t(`Split the terms: 1st, 3rd, 5th, 7th ... (odd places) and 2nd, 4th, 6th ... (even places).`, `পদগুলি আলাদা করো: 1ম, 3য়, 5ম, 7ম ... (বিজোড় স্থান) আর 2য়, 4র্থ, 6ষ্ঠ ... (জোড় স্থান)।`),
        t(`Find the simple rule of each small series separately.`, `প্রতিটি ছোট শ্রেণির সহজ নিয়ম আলাদা করে বের করো।`),
        t(`Check whether the missing term is in an odd place or an even place, and use that series.`, `যে পদটি চাই সেটি বিজোড় স্থানে না জোড় স্থানে, দেখে সেই শ্রেণি ব্যবহার করো।`),
      ],
      example: {
        question: t(`Find the next term: 2, 10, 4, 20, 6, 30, ?`, `পরের পদটি নির্ণয় করো: 2, 10, 4, 20, 6, 30, ?`),
        steps: [
          t(`Odd places: 2, 4, 6 (+2). Even places: 10, 20, 30 (+10).`, `বিজোড় স্থান: 2, 4, 6 (+2)। জোড় স্থান: 10, 20, 30 (+10)।`),
          t(`The missing term is the 7th (odd place), so it is 6 + 2 = 8.`, `যে পদটি চাই সেটি 7ম (বিজোড় স্থান), তাই 6 + 2 = 8।`),
        ],
        answer: t(`8`, `উত্তর: 8`),
      },
      tryIt: {
        question: t(`Find the next term: 1, 20, 3, 18, 5, 16, 7, ?`, `পরের পদটি নির্ণয় করো: 1, 20, 3, 18, 5, 16, 7, ?`),
        options: [t('9', '9'), t('12', '12'), t('14', '14'), t('15', '15')],
        correct: 2,
        explanation: [
          t(`Odd places: 1, 3, 5, 7 (+2). Even places: 20, 18, 16 (−2).`, `বিজোড় স্থান: 1, 3, 5, 7 (+2)। জোড় স্থান: 20, 18, 16 (−2)।`),
          t(`The missing term is the 8th (even place): 16 − 2 = 14.`, `যে পদটি চাই সেটি 8ম (জোড় স্থান): 16 − 2 = 14।`),
          t(`9 is the trap: it continues the odd-place series, which is the wrong one here.`, `9 হল ফাঁদ: এটা বিজোড় স্থানের শ্রেণির পরের পদ, যা এখানে লাগবে না।`),
        ],
      },
    },
  ],
};
