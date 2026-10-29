'use strict';

/**
 * Hard Average questions. Pattern matrix: db/patterns/quant/hard/average.js.
 */

const { pick, ri } = require('../common');
const { T, ex, clean, ord, makeQuestionFactory } = require('./framework');
const registry = require('../../../db/patterns/quant/hard/average');

const q = makeQuestionFactory('average', registry);
const SPEEDS = [10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 48, 60, 72, 80, 90];

const gens = {
  a_wrong_entry() {
    const variant = pick(['one_misread', 'two_misread']);
    const n = ri(10, 50);
    const A = ri(20, 80);
    if (variant === 'one_misread') {
      const x = ri(10, 99);
      const y = ri(10, 99);
      const ans = A + (x - y) / n;
      if (x === y || !clean(ans)) return null;
      return q({
        id: 'a_wrong_entry', variant, kind: 'number', answer: ans, given: { n, A, x, y },
        stem: T(`The average of ${n} observations was calculated as ${A}. It was later found that the observation ${x} had been copied as ${y}. What is the correct average?`,
          `${n}টি পর্যবেক্ষণের গড় ${A} নির্ণয় করা হয়েছিল। পরে দেখা গেল ${x} পর্যবেক্ষণটি ভুল করে ${y} লেখা হয়েছিল। সঠিক গড় কত?`),
        hints: [
          [A - (x - y) / n, 'The correction was applied in the wrong direction.', 'সংশোধন উল্টো দিকে করা হয়েছে।'],
          [A + (x - y), 'The error was not divided by the number of observations.', 'ভুলের পরিমাণকে পর্যবেক্ষণের সংখ্যা দিয়ে ভাগ করা হয়নি।'],
          [A + (x - y) / (n - 1), 'Divided by one less than the number of observations.', 'পর্যবেক্ষণের সংখ্যার চেয়ে একটি কম দিয়ে ভাগ করা হয়েছে।'],
        ],
        steps: [
          T(`Wrong total = ${n} × ${A} = ${n * A}.`, `ভুল যোগফল = ${n} × ${A} = ${n * A}।`),
          T(`Correct total = ${n * A} − ${y} + ${x} = ${n * A - y + x}.`, `সঠিক যোগফল = ${n * A} − ${y} + ${x} = ${n * A - y + x}।`),
          T(`Correct average = ${n * A - y + x} ÷ ${n} = ${ex(ans)}.`, `সঠিক গড় = ${n * A - y + x} ÷ ${n} = ${ex(ans)}।`),
        ],
        shortcut: T('Correct average = old average + (true − copied) ÷ count.', 'সঠিক গড় = পুরনো গড় + (আসল − ভুল লেখা) ÷ সংখ্যা।'),
      });
    }
    const [x1, y1, x2, y2] = [ri(10, 99), ri(10, 99), ri(10, 99), ri(10, 99)];
    const err = x1 + x2 - y1 - y2;
    const ans = A + err / n;
    if (new Set([x1, y1, x2, y2]).size < 4 || !err || !clean(ans)) return null;
    return q({
      id: 'a_wrong_entry', variant, kind: 'number', answer: ans, given: { n, A, x1, y1, x2, y2 },
      stem: T(`The mean of ${n} numbers was found to be ${A}. Later it was discovered that ${x1} had been taken as ${y1} and ${x2} had been taken as ${y2}. Find the correct mean.`,
        `${n}টি সংখ্যার গড় ${A} পাওয়া গেল। পরে জানা গেল ${x1}-কে ${y1} এবং ${x2}-কে ${y2} ধরা হয়েছিল। সঠিক গড় নির্ণয় করো।`),
      hints: [
        [A + (x1 - y1) / n, 'Only the first error was corrected.', 'শুধু প্রথম ভুলটি সংশোধন করা হয়েছে।'],
        [A - err / n, 'The corrections were applied in the wrong direction.', 'সংশোধন উল্টো দিকে করা হয়েছে।'],
        [A + err, 'The total error was not divided by the count.', 'মোট ভুলকে সংখ্যা দিয়ে ভাগ করা হয়নি।'],
      ],
      steps: [
        T(`Wrong total = ${n} × ${A} = ${n * A}.`, `ভুল যোগফল = ${n} × ${A} = ${n * A}।`),
        T(`Correct total = ${n * A} − (${y1} + ${y2}) + (${x1} + ${x2}) = ${n * A + err}.`, `সঠিক যোগফল = ${n * A} − (${y1} + ${y2}) + (${x1} + ${x2}) = ${n * A + err}।`),
        T(`Correct mean = ${n * A + err} ÷ ${n} = ${ex(ans)}.`, `সঠিক গড় = ${n * A + err} ÷ ${n} = ${ex(ans)}।`),
      ],
      shortcut: T('Add the net error (sum of true − sum of copied values) ÷ count to the old mean.', 'পুরনো গড়ের সঙ্গে মোট ভুল (আসলগুলির যোগফল − ভুলগুলির যোগফল) ÷ সংখ্যা যোগ করো।'),
    });
  },

  a_replace_member() {
    const variant = pick(['increase', 'decrease']);
    const n = ri(5, 30);
    const x = ri(30, 70);
    const d = pick([0.5, 1, 1.5, 2, 2.5, 3]);
    const sign = variant === 'increase' ? 1 : -1;
    const ans = x + sign * n * d;
    if (!clean(ans) || ans < 18 || ans > 95) return null;
    const verb = sign > 0 ? T('increases', 'বাড়ে') : T('decreases', 'কমে');
    return q({
      id: 'a_replace_member', variant, kind: 'years', answer: ans, given: { n, d, x },
      stem: T(`The average age of the ${n} members of a committee ${verb.en} by ${ex(d)} year${d === 1 ? '' : 's'} when a member aged ${x} years is replaced by a new member. How old is the new member?`,
        `একটি কমিটির ${n} জন সদস্যের গড় বয়স ${ex(d)} বছর ${verb.bn}, যখন ${x} বছর বয়সী একজন সদস্যের জায়গায় একজন নতুন সদস্য আসেন। নতুন সদস্যের বয়স কত?`),
      hints: [
        [x + sign * d, 'The change in average was not multiplied by the number of members.', 'গড়ের পরিবর্তনকে সদস্যসংখ্যা দিয়ে গুণ করা হয়নি।'],
        [x + sign * (n - 1) * d, 'Multiplied by one member too few.', 'একজন কম সদস্য দিয়ে গুণ করা হয়েছে।'],
        [x - sign * n * d, 'The change went the wrong way.', 'পরিবর্তন উল্টো দিকে ধরা হয়েছে।'],
      ],
      steps: [
        T(`The total age ${verb.en} by ${n} × ${ex(d)} = ${ex(n * d)} years.`, `মোট বয়স ${n} × ${ex(d)} = ${ex(n * d)} বছর ${verb.bn}।`),
        T(`That change is (new member − ${x}).`, `এই পরিবর্তন = (নতুন সদস্য − ${x})।`),
        T(`New member = ${x} ${sign > 0 ? '+' : '−'} ${ex(n * d)} = ${ex(ans)} years.`, `নতুন সদস্যের বয়স = ${x} ${sign > 0 ? '+' : '−'} ${ex(n * d)} = ${ex(ans)} বছর।`),
      ],
      shortcut: T('Newcomer = person replaced ± (group size × change in average).', 'নতুন সদস্য = যিনি গেলেন ± (সদস্যসংখ্যা × গড়ের পরিবর্তন)।'),
    });
  },

  a_batsman() {
    const variant = pick(['new_average', 'required_score']);
    const n = ri(8, 30);
    const A = ri(20, 60);
    const d = pick([0.5, 1, 1.5, 2, 2.5, 3, 4]);
    const S = A + (n + 1) * d;
    if (!Number.isInteger(S)) return null;
    if (variant === 'new_average') {
      return q({
        id: 'a_batsman', variant, kind: 'number', answer: A + d, given: { n, S, d },
        stem: T(`A batsman had played ${n} innings. In his ${ord(n + 1)} innings he scored ${S} runs, which raised his average by ${ex(d)} runs. What is his average after the ${ord(n + 1)} innings?`,
          `একজন ব্যাটসম্যান ${n}টি ইনিংস খেলেছেন। ${n + 1}তম ইনিংসে তিনি ${S} রান করায় তাঁর গড় ${ex(d)} রান বেড়ে গেল। ${n + 1}তম ইনিংসের পর তাঁর গড় কত?`),
        hints: [
          [A, 'This is the average before the innings.', 'এটি ইনিংসটির আগের গড়।'],
          [S - n * d, 'Multiplied the rise by the old number of innings instead of the new one.', 'বৃদ্ধিকে নতুনের বদলে পুরনো ইনিংসসংখ্যা দিয়ে গুণ করা হয়েছে।'],
          [S / (n + 1), 'Divided the latest score by the number of innings.', 'শেষ ইনিংসের রানকে ইনিংসসংখ্যা দিয়ে ভাগ করা হয়েছে।'],
        ],
        steps: [
          T(`Let the old average be x. Then ${n}x + ${S} = ${n + 1}(x + ${ex(d)}).`, `পুরনো গড় x ধরি। তাহলে ${n}x + ${S} = ${n + 1}(x + ${ex(d)})।`),
          T(`So x = ${S} − ${n + 1} × ${ex(d)} = ${A}.`, `তাই x = ${S} − ${n + 1} × ${ex(d)} = ${A}।`),
          T(`New average = ${A} + ${ex(d)} = ${ex(A + d)}.`, `নতুন গড় = ${A} + ${ex(d)} = ${ex(A + d)}।`),
        ],
        shortcut: T('New average = score in the new innings − (innings before) × rise.', 'নতুন গড় = নতুন ইনিংসের রান − (আগের ইনিংসসংখ্যা) × বৃদ্ধি।'),
      });
    }
    return q({
      id: 'a_batsman', variant, kind: 'number', answer: S, given: { n, A, d },
      stem: T(`After ${n} innings a batsman's average is ${A} runs. How many runs must he score in the next innings to raise his average by ${ex(d)} runs?`,
        `${n}টি ইনিংসের পর একজন ব্যাটসম্যানের গড় ${A} রান। পরের ইনিংসে কত রান করলে তাঁর গড় ${ex(d)} রান বাড়বে?`),
      hints: [
        [A + d, 'Scoring the new average once is not enough; every earlier innings must be lifted too.', 'একবার নতুন গড়ের সমান রান যথেষ্ট নয়; আগের প্রতিটি ইনিংসের গড়ও তুলতে হবে।'],
        [A + n * d, 'Multiplied the rise by the old number of innings.', 'বৃদ্ধিকে পুরনো ইনিংসসংখ্যা দিয়ে গুণ করা হয়েছে।'],
        [(n + 1) * (A + d), 'This is the new total, not the next score.', 'এটি নতুন মোট রান, পরের ইনিংসের রান নয়।'],
      ],
      steps: [
        T(`Runs so far = ${n} × ${A} = ${n * A}.`, `এখন পর্যন্ত রান = ${n} × ${A} = ${n * A}।`),
        T(`Needed after ${n + 1} innings = ${n + 1} × ${ex(A + d)} = ${ex((n + 1) * (A + d))}.`, `${n + 1}টি ইনিংসের পর প্রয়োজন = ${n + 1} × ${ex(A + d)} = ${ex((n + 1) * (A + d))}।`),
        T(`Next innings = ${ex((n + 1) * (A + d))} − ${n * A} = ${S} runs.`, `পরের ইনিংসে লাগবে = ${ex((n + 1) * (A + d))} − ${n * A} = ${S} রান।`),
      ],
      shortcut: T('Required score = present average + (innings after) × rise.', 'প্রয়োজনীয় রান = বর্তমান গড় + (পরের মোট ইনিংস) × বৃদ্ধি।'),
    });
  },

  a_overlap_middle() {
    const variant = pick(['results', 'temperature']);
    const k = ri(4, 9);
    // Temperatures stay in a believable range for West Bengal (°C); results are marks out of 100.
    const M = variant === 'temperature' ? ri(14, 36) : ri(30, 70);
    const P = M + ri(-4, 4);
    const Q = M + ri(-4, 4);
    const m = k * (P + Q) - (2 * k - 1) * M;
    const [lo, hi] = variant === 'temperature' ? [8, 46] : [1, 100];
    if (P === Q || m < lo || m > hi) return null;
    const total = 2 * k - 1;
    const stem = variant === 'results'
      ? T(`The average of ${total} results is ${M}. The average of the first ${k} is ${P} and the average of the last ${k} is ${Q}. What is the ${ord(k)} result?`,
        `${total}টি ফলের গড় ${M}। প্রথম ${k}টির গড় ${P} এবং শেষ ${k}টির গড় ${Q}। ${k}তম ফলটি কত?`)
      : T(`The average temperature over ${total} consecutive days was ${M}°C. The average for the first ${k} days was ${P}°C and for the last ${k} days ${Q}°C. What was the temperature (in °C) on the ${ord(k)} day?`,
        `পরপর ${total} দিনের গড় তাপমাত্রা ছিল ${M}°C। প্রথম ${k} দিনের গড় ${P}°C এবং শেষ ${k} দিনের গড় ${Q}°C। ${k}তম দিনের তাপমাত্রা কত °C ছিল?`);
    return q({
      id: 'a_overlap_middle', variant, kind: 'number', answer: m, given: { total, M, k, P, Q },
      stem,
      hints: [
        [(P + Q) / 2, 'Averaged the two group averages; the middle value is not their mean.', 'দুই দলের গড়ের গড় নেওয়া হয়েছে; মাঝের মান তা নয়।'],
        [k * (P + Q) - 2 * k * M, 'Used one value too many in the total.', 'মোটে একটি মান বেশি ধরা হয়েছে।'],
        [M, 'This is the overall average.', 'এটি সামগ্রিক গড়।'],
      ],
      steps: [
        T(`First ${k}: ${k} × ${P} = ${k * P}; last ${k}: ${k} × ${Q} = ${k * Q}.`, `প্রথম ${k}টি: ${k} × ${P} = ${k * P}; শেষ ${k}টি: ${k} × ${Q} = ${k * Q}।`),
        T(`All ${total}: ${total} × ${M} = ${total * M}.`, `সব ${total}টি: ${total} × ${M} = ${total * M}।`),
        T(`The ${ord(k)} value is counted twice: ${k * P} + ${k * Q} − ${total * M} = ${m}.`, `${k}তম মানটি দুবার গোনা হয়েছে: ${k * P} + ${k * Q} − ${total * M} = ${m}।`),
      ],
      shortcut: T('Shared value = sum of the two overlapping parts − total sum.', 'সাধারণ মান = দুই অংশের যোগফল − সমস্ত মানের যোগফল।'),
    });
  },

  a_boys_girls() {
    const variant = pick(['find_girls', 'find_total']);
    const nb = ri(10, 50);
    const ng = ri(10, 50);
    const B = ri(40, 90);
    const G = ri(30, 85);
    const N = nb + ng;
    const A = (nb * B + ng * G) / N;
    if (B === G || !clean(A) || nb === ng) return null;
    if (variant === 'find_girls') {
      return q({
        id: 'a_boys_girls', variant, kind: 'persons', answer: ng, given: { N, B, G, A },
        stem: T(`In a class of ${N} students, the average marks of the boys are ${B} and of the girls ${G}. The average for the whole class is ${ex(A)}. How many girls are there in the class?`,
          `${N} জন ছাত্রছাত্রীর একটি শ্রেণিতে ছেলেদের গড় নম্বর ${B} এবং মেয়েদের ${G}। পুরো শ্রেণির গড় ${ex(A)}। শ্রেণিতে কতজন মেয়ে আছে?`),
        hints: [
          [nb, 'This is the number of boys; the sizes are inverse to the distances from the class average.', 'এটি ছেলেদের সংখ্যা; সংখ্যাগুলি শ্রেণির গড় থেকে দূরত্বের বিপরীত অনুপাতে।'],
          [N / 2, 'Assumed equal numbers of boys and girls.', 'ছেলে ও মেয়ে সমান ধরা হয়েছে।'],
        ],
        steps: [
          T(`Let girls = g, boys = ${N} − g. Total marks: ${B}(${N} − g) + ${G}g = ${ex(A)} × ${N} = ${ex(A * N)}.`, `মেয়ে = g, ছেলে = ${N} − g ধরি। মোট নম্বর: ${B}(${N} − g) + ${G}g = ${ex(A)} × ${N} = ${ex(A * N)}।`),
          T(`Collect the g terms: (${B} − ${G})g = ${B} × ${N} − ${ex(A * N)} = ${ex(B * N - A * N)}.`, `g-যুক্ত পদ একদিকে এনে: (${B} − ${G})g = ${B} × ${N} − ${ex(A * N)} = ${ex(B * N - A * N)}।`),
          T(`g = ${ng} girls.`, `অতএব মেয়ে g = ${ng} জন।`),
        ],
        shortcut: T('Boys : girls = (class average − girls’ average) : (boys’ average − class average).', 'ছেলে : মেয়ে = (শ্রেণির গড় − মেয়েদের গড়) : (ছেলেদের গড় − শ্রেণির গড়)।'),
      });
    }
    return q({
      id: 'a_boys_girls', variant, kind: 'persons', answer: N, given: { nb, B, G, A },
      stem: T(`A class has ${nb} boys whose average marks are ${B}. The girls' average is ${G}, and the average of the whole class is ${ex(A)}. How many students are in the class?`,
        `একটি শ্রেণিতে ${nb} জন ছেলে আছে, যাদের গড় নম্বর ${B}। মেয়েদের গড় ${G} এবং পুরো শ্রেণির গড় ${ex(A)}। শ্রেণিতে মোট কতজন ছাত্রছাত্রী?`),
      hints: [
        [ng, 'This is the number of girls only.', 'এটি শুধু মেয়েদের সংখ্যা।'],
        [2 * nb, 'Assumed as many girls as boys.', 'ছেলেদের সমান সংখ্যক মেয়ে ধরা হয়েছে।'],
        [nb + Math.round((nb * Math.abs(A - G)) / Math.abs(B - A)), 'Used the distances the wrong way round.', 'দূরত্বগুলি উল্টো করে ব্যবহার করা হয়েছে।'],
      ],
      steps: [
        T(`Let girls = g: ${nb} × ${B} + ${G}g = ${ex(A)}(${nb} + g).`, `মেয়ে = g ধরি: ${nb} × ${B} + ${G}g = ${ex(A)}(${nb} + g)।`),
        T(`${nb} × (${B} − ${ex(A)}) = (${ex(A)} − ${G})g ⇒ g = ${ng}.`, `সরল করে: ${nb} × (${B} − ${ex(A)}) = (${ex(A)} − ${G})g ⇒ g = ${ng}।`),
        T(`Total = ${nb} + ${ng} = ${N}.`, `মোট ছাত্রছাত্রী = ${nb} + ${ng} = ${N}।`),
      ],
      shortcut: T('Boys × (their distance from the class average) = girls × (their distance).', 'ছেলে × (শ্রেণির গড় থেকে তাদের দূরত্ব) = মেয়ে × (তাদের দূরত্ব)।'),
    });
  },

  a_family_newborn() {
    const variant = pick(['baby_age', 'years_ago']);
    if (variant === 'baby_age') {
      const n = ri(3, 6);
      const t = ri(3, 8);
      const b = ri(1, t - 1);
      const A = b + n * t;
      return q({
        id: 'a_family_newborn', variant, kind: 'years', answer: b, given: { n, t, A },
        stem: T(`${t} years ago, the average age of a family of ${n} members was ${A} years. A baby has been born since then, and the average age of the family today is still ${A} years. How old is the baby?`,
          `${t} বছর আগে ${n} জনের একটি পরিবারের গড় বয়স ছিল ${A} বছর। তারপর একটি শিশুর জন্ম হয়েছে, এবং আজও পরিবারের গড় বয়স ${A} বছর। শিশুটির বয়স কত?`),
        hints: [
          [A - t, 'Only one member’s ageing was taken into account.', 'শুধু একজন সদস্যের বয়স বাড়া ধরা হয়েছে।'],
          [n * t, 'This is how much the old members aged together, not the baby’s age.', 'এটি পুরনো সদস্যদের মোট বয়স বৃদ্ধি, শিশুর বয়স নয়।'],
          [Math.abs(A - (n + 1) * t), 'Counted the baby as ageing over the whole period too.', 'শিশুটিকেও পুরো সময় ধরে বড় হতে দেখা হয়েছে।'],
        ],
        steps: [
          T(`Total ${t} years ago = ${n} × ${A} = ${n * A}; today those ${n} members total ${n * A} + ${n} × ${t} = ${n * A + n * t}.`, `${t} বছর আগে মোট = ${n} × ${A} = ${n * A}; আজ ওই ${n} জনের মোট = ${n * A} + ${n} × ${t} = ${n * A + n * t}।`),
          T(`Today the family of ${n + 1} totals ${n + 1} × ${A} = ${(n + 1) * A}.`, `আজ ${n + 1} জনের পরিবারের মোট বয়স = ${n + 1} × ${A} = ${(n + 1) * A}।`),
          T(`Baby = ${(n + 1) * A} − ${n * A + n * t} = ${b} years.`, `শিশুর বয়স = ${(n + 1) * A} − ${n * A + n * t} = ${b} বছর।`),
        ],
        shortcut: T('Baby’s age = average − (old members × years passed).', 'শিশুর বয়স = গড় − (পুরনো সদস্যসংখ্যা × অতিক্রান্ত বছর)।'),
      });
    }
    const A1 = ri(22, 32);
    const t = ri(3, 14);
    const c = ri(1, t - 1);
    const A2 = (2 * (A1 + t) + c) / 3;
    if (!clean(A2)) return null;
    return q({
      id: 'a_family_newborn', variant, kind: 'years', answer: t, given: { A1, c, A2 },
      stem: T(`At the time of their marriage, the average age of a husband and wife was ${A1} years. Some years later they have one child aged ${c} year${c === 1 ? '' : 's'}, and the average age of the three is ${ex(A2)} years. How many years ago did they marry?`,
        `বিয়ের সময় স্বামী-স্ত্রীর গড় বয়স ছিল ${A1} বছর। কয়েক বছর পরে তাঁদের ${c} বছর বয়সী একটি সন্তান আছে এবং তিনজনের গড় বয়স ${ex(A2)} বছর। কত বছর আগে তাঁদের বিয়ে হয়েছিল?`),
      hints: [
        [(3 * A2 - 2 * A1) / 2, 'The child’s age was left out of the total.', 'মোট বয়সে সন্তানের বয়স ধরা হয়নি।'],
        [A2 - A1, 'Compared averages of groups of different sizes.', 'ভিন্ন সদস্যসংখ্যার দলের গড় সরাসরি তুলনা করা হয়েছে।'],
        [3 * A2 - 2 * A1 - c, 'Forgot that both husband and wife aged.', 'স্বামী ও স্ত্রী দুজনেরই বয়স বেড়েছে, তা ভুলে যাওয়া হয়েছে।'],
      ],
      steps: [
        T(`Today the three total ${ex(A2)} × 3 = ${ex(3 * A2)} years; the couple alone total ${ex(3 * A2)} − ${c} = ${ex(3 * A2 - c)}.`, `আজ তিনজনের মোট বয়স ${ex(A2)} × 3 = ${ex(3 * A2)} বছর; শুধু দম্পতির = ${ex(3 * A2)} − ${c} = ${ex(3 * A2 - c)}।`),
          T(`At marriage the couple totalled 2 × ${A1} = ${2 * A1}. Each has aged t years: ${2 * A1} + 2t = ${ex(3 * A2 - c)}.`, `বিয়ের সময় দম্পতির মোট বয়স 2 × ${A1} = ${2 * A1}। প্রত্যেকের বয়স t বছর বেড়েছে: ${2 * A1} + 2t = ${ex(3 * A2 - c)}।`),
        T(`t = ${t} years.`, `অতএব t = ${t} বছর।`),
      ],
      shortcut: T('Remove the child from today’s total; the rest grew by 2 × years passed.', 'আজকের মোট থেকে সন্তানের বয়স বাদ দাও; বাকিটা বেড়েছে 2 × অতিক্রান্ত বছর।'),
    });
  },

  a_required_future() {
    const variant = pick(['remaining_average', 'max_possible']);
    const n = ri(6, 12);
    const k = ri(2, n - 2);
    const A1 = ri(40, 80);
    if (variant === 'remaining_average') {
      const A = ri(A1 - 10, A1 + 15);
      const need = (n * A - k * A1) / (n - k);
      if (A === A1 || !clean(need) || need <= 0 || need > 100) return null;
      return q({
        id: 'a_required_future', variant, kind: 'marks', answer: need, given: { n, k, A1, A },
        stem: T(`A student will take ${n} unit tests, each marked out of 100. Her average in the first ${k} tests is ${A1}. What average must she score in the remaining tests to finish with an overall average of ${A}?`,
          `একজন ছাত্রী ${n}টি ইউনিট টেস্ট দেবে, প্রতিটির পূর্ণমান 100। প্রথম ${k}টি টেস্টে তার গড় ${A1}। সব মিলিয়ে ${A} গড় পেতে বাকি টেস্টগুলিতে তাকে কত গড় পেতে হবে?`),
        hints: [
          [2 * A - A1, 'Balanced the two averages as if the two parts had the same number of tests.', 'দুই অংশে সমান সংখ্যক টেস্ট ধরে গড় মেলানো হয়েছে।'],
          [(n * A - k * A1) / n, 'Divided the shortfall by all the tests.', 'ঘাটতিকে সব টেস্ট দিয়ে ভাগ করা হয়েছে।'],
          [A, 'This is the target overall average.', 'এটি লক্ষ্য গড়।'],
        ],
        steps: [
          T(`Target total = ${n} × ${A} = ${n * A}; scored so far = ${k} × ${A1} = ${k * A1}.`, `লক্ষ্য মোট = ${n} × ${A} = ${n * A}; এ পর্যন্ত = ${k} × ${A1} = ${k * A1}।`),
          T(`Still needed = ${n * A - k * A1} marks over ${n - k} tests.`, `আরও প্রয়োজন = ${n - k}টি টেস্টে ${n * A - k * A1} নম্বর।`),
          T(`Required average = ${n * A - k * A1} ÷ ${n - k} = ${ex(need)}.`, `প্রয়োজনীয় গড় = ${n * A - k * A1} ÷ ${n - k} = ${ex(need)}।`),
        ],
        shortcut: T('Required = (target × all tests − total so far) ÷ tests left.', 'প্রয়োজনীয় গড় = (লক্ষ্য × মোট টেস্ট − এ পর্যন্ত মোট) ÷ বাকি টেস্ট।'),
      });
    }
    const M = pick([50, 100]);
    const a1 = Math.min(A1, M - 5);
    const best = (k * a1 + (n - k) * M) / n;
    if (!clean(best)) return null;
    return q({
      id: 'a_required_future', variant, kind: 'marks', answer: best, given: { n, M, k, a1 },
      stem: T(`A course has ${n} quizzes, each out of ${M}. After ${k} quizzes a student's average is ${a1}. What is the highest overall average he can still finish with?`,
        `একটি কোর্সে ${n}টি কুইজ, প্রতিটির পূর্ণমান ${M}। ${k}টি কুইজের পর একজন ছাত্রের গড় ${a1}। সব শেষে সে সর্বোচ্চ কত গড় পেতে পারে?`),
      hints: [
        [(a1 + M) / 2, 'Averaged the two averages as if both parts had the same number of quizzes.', 'দুই অংশে সমান কুইজ ধরে গড়ের গড় নেওয়া হয়েছে।'],
        [M, 'Full marks in the rest cannot cancel the quizzes already taken.', 'বাকিগুলিতে পূর্ণ নম্বর পেলেও আগের কুইজগুলির প্রভাব মুছে যায় না।'],
        [(k * a1 + (n - k) * M) / (n - k), 'Divided by the remaining quizzes instead of all quizzes.', 'সব কুইজের বদলে শুধু বাকি কুইজ দিয়ে ভাগ করা হয়েছে।'],
      ],
      steps: [
        T(`Marks so far = ${k} × ${a1} = ${k * a1}.`, `এ পর্যন্ত নম্বর = ${k} × ${a1} = ${k * a1}।`),
        T(`Best case: full marks in the other ${n - k} quizzes = ${(n - k) * M}.`, `সেরা ক্ষেত্রে: বাকি ${n - k}টি কুইজে পূর্ণ নম্বর = ${(n - k) * M}।`),
        T(`Highest average = (${k * a1} + ${(n - k) * M}) ÷ ${n} = ${ex(best)}.`, `সর্বোচ্চ গড় = (${k * a1} + ${(n - k) * M}) ÷ ${n} = ${ex(best)}।`),
      ],
      shortcut: T('Best overall average = (marks so far + full marks for the rest) ÷ all quizzes.', 'সর্বোচ্চ গড় = (এ পর্যন্ত নম্বর + বাকিগুলির পূর্ণমান) ÷ মোট কুইজ।'),
    });
  },

  a_speed_equal_distances() {
    const variant = pick(['three_legs', 'round_trip_find_speed']);
    if (variant === 'three_legs') {
      const [a, b, c] = [pick(SPEEDS), pick(SPEEDS), pick(SPEEDS)];
      const avg = 3 / (1 / a + 1 / b + 1 / c);
      if (new Set([a, b, c]).size < 3 || !clean(avg)) return null;
      return q({
        id: 'a_speed_equal_distances', variant, kind: 'kmph', answer: avg, given: { a, b, c },
        stem: T(`A cyclist covers three equal stretches of a road at ${a} km/h, ${b} km/h and ${c} km/h respectively. What is the average speed for the whole journey?`,
          `একজন সাইকেল আরোহী একটি রাস্তার তিনটি সমান অংশ যথাক্রমে ${a} কিমি/ঘণ্টা, ${b} কিমি/ঘণ্টা ও ${c} কিমি/ঘণ্টা বেগে অতিক্রম করেন। পুরো যাত্রায় তাঁর গড় গতিবেগ কত?`),
        hints: [
          [(a + b + c) / 3, 'Took the mean of the speeds; more time is spent at the slower speeds.', 'গতিবেগগুলির সাধারণ গড় নেওয়া হয়েছে; ধীর গতিতে বেশি সময় লাগে।'],
          [(2 * a * b) / (a + b), 'Used only the first two stretches.', 'শুধু প্রথম দুটি অংশ ধরা হয়েছে।'],
          [[a, b, c].sort((x, y) => x - y)[1], 'Picked the middle speed.', 'মাঝের গতিবেগটি নেওয়া হয়েছে।'],
        ],
        steps: [
          T('Let each stretch be d km.', 'প্রতিটি অংশ d কিমি ধরি।'),
          T(`Total time = d/${a} + d/${b} + d/${c} = d × ${ex(1 / a + 1 / b + 1 / c)} hours.`, `মোট সময় = d/${a} + d/${b} + d/${c} = d × ${ex(1 / a + 1 / b + 1 / c)} ঘণ্টা।`),
          T(`Average speed = 3d ÷ total time = 3 ÷ (1/${a} + 1/${b} + 1/${c}) = ${ex(avg)} km/h.`, `গড় গতিবেগ = 3d ÷ মোট সময় = 3 ÷ (1/${a} + 1/${b} + 1/${c}) = ${ex(avg)} কিমি/ঘণ্টা।`),
        ],
        shortcut: T('For equal distances use the harmonic mean: n ÷ (sum of 1/speed).', 'সমান দূরত্বে হারমোনিক গড়: n ÷ (1/গতিবেগগুলির যোগফল)।'),
      });
    }
    const u = pick(SPEEDS);
    const v = pick(SPEEDS);
    const w = (u * v) / (2 * u - v);
    if (v === u || v >= 2 * u || !clean(w) || w <= 0 || w > 150) return null;
    return q({
      id: 'a_speed_equal_distances', variant, kind: 'kmph', answer: w, given: { u, v },
      stem: T(`A car goes from town A to town B at ${u} km/h. At what speed must it come back along the same road so that the average speed for the whole trip is ${v} km/h?`,
        `একটি গাড়ি A শহর থেকে B শহরে ${u} কিমি/ঘণ্টা বেগে যায়। একই পথে কত বেগে ফিরলে পুরো যাত্রার গড় গতিবেগ ${v} কিমি/ঘণ্টা হবে?`),
      hints: [
        [2 * v - u, 'Treated the average speed as the mean of the two speeds.', 'গড় গতিবেগকে দুই গতিবেগের সাধারণ গড় ধরা হয়েছে।'],
        [(u + v) / 2, 'Averaged the outward speed and the target.', 'যাওয়ার গতিবেগ ও লক্ষ্যের গড় নেওয়া হয়েছে।'],
        [v, 'Returning at the target speed does not give that average.', 'লক্ষ্য গতিবেগে ফিরলে ওই গড় হয় না।'],
      ],
      steps: [
        T(`Let AB = d. Whole trip takes 2d/${v} hours; the outward leg takes d/${u}.`, `AB = d ধরি। পুরো যাত্রায় সময় 2d/${v} ঘণ্টা; যেতে লাগে d/${u} ঘণ্টা।`),
        T(`Return time = 2d/${v} − d/${u} = d/${ex(w)} hours.`, `ফেরার সময় = 2d/${v} − d/${u} = d/${ex(w)} ঘণ্টা।`),
        T(`Return speed = d ÷ (d/${ex(w)}) = ${ex(w)} km/h.`, `ফেরার গতিবেগ = d ÷ (d/${ex(w)}) = ${ex(w)} কিমি/ঘণ্টা।`),
      ],
      shortcut: T('Return speed = u·v ÷ (2u − v).', 'ফেরার গতিবেগ = u·v ÷ (2u − v)।'),
    });
  },

  a_successive_joiners() {
    const variant = pick(['second_weight', 'difference']);
    const n = ri(5, 20);
    const W = ri(40, 70);
    const p = pick([0.5, 1, 1.5, 2]);
    const qd = pick([0.5, 1, 1.5, 2]);
    const A = W + (n + 1) * p;
    const B = W + p - (n + 2) * qd;
    if (!clean(A) || !clean(B) || B < 25 || A > 130 || A === B) return null;
    const stem = T(`The average weight of ${n} friends is ${W} kg. When Ajay joins them the average rises by ${ex(p)} kg; when Bablu joins as well, the average falls by ${ex(qd)} kg.`,
      `${n} জন বন্ধুর গড় ওজন ${W} কেজি। অজয় যোগ দিলে গড় ${ex(p)} কেজি বাড়ে; তারপর বাবলু যোগ দিলে গড় ${ex(qd)} কেজি কমে যায়।`);
    const steps = [
      T(`With Ajay: ${n + 1} × ${ex(W + p)} = ${ex((n + 1) * (W + p))}; Ajay = ${ex((n + 1) * (W + p))} − ${n * W} = ${ex(A)} kg.`, `অজয়সহ: ${n + 1} × ${ex(W + p)} = ${ex((n + 1) * (W + p))}; অজয় = ${ex((n + 1) * (W + p))} − ${n * W} = ${ex(A)} কেজি।`),
      T(`With Bablu: ${n + 2} × ${ex(W + p - qd)} = ${ex((n + 2) * (W + p - qd))}.`, `বাবলুসহ: ${n + 2} × ${ex(W + p - qd)} = ${ex((n + 2) * (W + p - qd))}।`),
      T(`Bablu = ${ex((n + 2) * (W + p - qd))} − ${ex((n + 1) * (W + p))} = ${ex(B)} kg.`, `বাবলু = ${ex((n + 2) * (W + p - qd))} − ${ex((n + 1) * (W + p))} = ${ex(B)} কেজি।`),
    ];
    if (variant === 'second_weight') {
      return q({
        id: 'a_successive_joiners', variant, kind: 'kg', answer: B, given: { n, W, p, qd },
        stem: T(`${stem.en} What is Bablu's weight?`, `${stem.bn} বাবলুর ওজন কত?`),
        hints: [
          [W - (n + 2) * qd, 'Measured the fall from the original average instead of the average after Ajay joined.', 'অজয় যোগ দেওয়ার পরের গড় নয়, প্রথম গড় থেকে কমা ধরা হয়েছে।'],
          [W + p - (n + 1) * qd, 'Multiplied the fall by one person too few.', 'একজন কম দিয়ে কমার পরিমাণ গুণ করা হয়েছে।'],
          [A, "This is Ajay's weight.", 'এটি অজয়ের ওজন।'],
        ],
        steps,
        shortcut: T('Second newcomer = average just before him − (new count × fall).', 'দ্বিতীয় নতুনজন = তাঁর আগের গড় − (নতুন সদস্যসংখ্যা × কমার পরিমাণ)।'),
      });
    }
    return q({
      id: 'a_successive_joiners', variant, kind: 'kg', answer: Math.abs(A - B), given: { n, W, p, qd },
      stem: T(`${stem.en} By how many kg does Ajay's weight differ from Bablu's?`, `${stem.bn} অজয় ও বাবলুর ওজনের পার্থক্য কত কেজি?`),
      hints: [
        [Math.abs((n + 1) * p + (n + 1) * qd), 'Used the same group size for both changes.', 'দুই পরিবর্তনে একই সদস্যসংখ্যা ধরা হয়েছে।'],
        [p + qd, 'Added the two changes in average without multiplying by the group sizes.', 'গড়ের দুই পরিবর্তন যোগ করা হয়েছে, সদস্যসংখ্যা দিয়ে গুণ না করে।'],
        [B, "This is Bablu's weight.", 'এটি বাবলুর ওজন।'],
      ],
      steps: [...steps.slice(0, 2), T(`Bablu = ${ex(B)} kg, so the difference = ${ex(A)} − ${ex(B)} = ${ex(Math.abs(A - B))} kg.`, `বাবলু = ${ex(B)} কেজি, তাই পার্থক্য = ${ex(A)} − ${ex(B)} = ${ex(Math.abs(A - B))} কেজি।`)],
      shortcut: T('Find each newcomer from the totals before and after; then subtract.', 'আগে-পরের মোট থেকে প্রত্যেক নতুনজনকে বের করে বিয়োগ করো।'),
    });
  },

  a_missing_group() {
    const variant = pick(['third_average', 'third_count']);
    const [n1, n2c, n3] = [ri(15, 45), ri(15, 45), ri(15, 45)];
    const [a1, a2, a3] = [ri(40, 80), ri(40, 80), ri(40, 80)];
    const A = (n1 * a1 + n2c * a2 + n3 * a3) / (n1 + n2c + n3);
    if (!clean(A) || new Set([a1, a2, a3]).size < 3) return null;
    // If the third batch's average equals the overall one, any batch size fits: ambiguous.
    if (variant === 'third_count' && Math.abs(a3 - A) < 1e-9) return null;
    if (variant === 'third_average') {
      return q({
        id: 'a_missing_group', variant, kind: 'marks', answer: a3, given: { n1, n2c, n3, a1, a2, A },
        stem: T(`Three sections of a class have ${n1}, ${n2c} and ${n3} students. The average marks of the first two sections are ${a1} and ${a2}, and the average of all the students together is ${ex(A)}. What is the average of the third section?`,
          `একটি শ্রেণির তিনটি সেকশনে যথাক্রমে ${n1}, ${n2c} ও ${n3} জন ছাত্রছাত্রী। প্রথম দুটি সেকশনের গড় নম্বর ${a1} ও ${a2}, আর সব ছাত্রছাত্রীর মিলিত গড় ${ex(A)}। তৃতীয় সেকশনের গড় নম্বর কত?`),
        hints: [
          [3 * A - a1 - a2, 'Treated the sections as equal in size.', 'সেকশনগুলির ছাত্রসংখ্যা সমান ধরা হয়েছে।'],
          [A, 'This is the overall average.', 'এটি মিলিত গড়।'],
          [(a1 + a2) / 2, 'Averaged the other two sections.', 'অন্য দুটি সেকশনের গড় নেওয়া হয়েছে।'],
        ],
        steps: [
          T(`Total of all = ${ex(A)} × ${n1 + n2c + n3} = ${ex(A * (n1 + n2c + n3))}.`, `সবার মোট নম্বর = ${ex(A)} × ${n1 + n2c + n3} = ${ex(A * (n1 + n2c + n3))}।`),
          T(`First two sections = ${n1} × ${a1} + ${n2c} × ${a2} = ${n1 * a1 + n2c * a2}.`, `প্রথম দুটি সেকশন = ${n1} × ${a1} + ${n2c} × ${a2} = ${n1 * a1 + n2c * a2}।`),
          T(`Third section average = (${ex(A * (n1 + n2c + n3))} − ${n1 * a1 + n2c * a2}) ÷ ${n3} = ${a3}.`, `তৃতীয় সেকশনের গড় = (${ex(A * (n1 + n2c + n3))} − ${n1 * a1 + n2c * a2}) ÷ ${n3} = ${a3}।`),
        ],
        shortcut: T('Work with totals (count × average), never with the averages alone.', 'সবসময় মোট (সংখ্যা × গড়) দিয়ে কাজ করো, শুধু গড় দিয়ে নয়।'),
      });
    }
    return q({
      id: 'a_missing_group', variant, kind: 'persons', answer: n3, given: { n1, n2c, a1, a2, a3, A },
      stem: T(`Three batches of trainees took the same test. The first batch of ${n1} averaged ${a1} marks, the second batch of ${n2c} averaged ${a2}, and the third batch averaged ${a3}. All the trainees together averaged ${ex(A)}. How many trainees were in the third batch?`,
        `তিনটি ব্যাচের প্রশিক্ষণার্থী একই পরীক্ষা দিয়েছেন। ${n1} জনের প্রথম ব্যাচের গড় ${a1}, ${n2c} জনের দ্বিতীয় ব্যাচের গড় ${a2} এবং তৃতীয় ব্যাচের গড় ${a3}। সবার মিলিত গড় ${ex(A)}। তৃতীয় ব্যাচে কতজন ছিলেন?`),
      hints: [
        [Math.round((n1 + n2c) / 2), 'Assumed the third batch is the average size of the other two.', 'তৃতীয় ব্যাচকে অন্য দুটির গড় আকার ধরা হয়েছে।'],
        [n1, 'This is the first batch.', 'এটি প্রথম ব্যাচ।'],
        [n1 + n2c + n3, 'This is all the trainees together.', 'এটি সব প্রশিক্ষণার্থীর মোট সংখ্যা।'],
      ],
      steps: [
        T(`Let the third batch have x trainees: ${n1 * a1} + ${n2c * a2} + ${a3}x = ${ex(A)}(${n1 + n2c} + x).`, `তৃতীয় ব্যাচে x জন ধরি: ${n1 * a1} + ${n2c * a2} + ${a3}x = ${ex(A)}(${n1 + n2c} + x)।`),
        T(`(${a3} − ${ex(A)})x = ${ex(A)} × ${n1 + n2c} − ${n1 * a1 + n2c * a2} = ${ex(A * (n1 + n2c) - n1 * a1 - n2c * a2)}.`, `সরল করে: (${a3} − ${ex(A)})x = ${ex(A)} × ${n1 + n2c} − ${n1 * a1 + n2c * a2} = ${ex(A * (n1 + n2c) - n1 * a1 - n2c * a2)}।`),
        T(`x = ${n3}.`, `অতএব x = ${n3} জন।`),
      ],
      shortcut: T('Each batch pulls the overall average by (its average − overall) × its size; the pulls cancel.', 'প্রতিটি ব্যাচ মিলিত গড়কে (নিজের গড় − মিলিত গড়) × সদস্যসংখ্যা পরিমাণ টানে; টানগুলি কাটাকাটি হয়।'),
    });
  },
};

module.exports = { topic: 'average', registry, generators: gens };
