'use strict';

/**
 * Time, Speed & Distance: "Chase with a head start" (pattern chase_head_start in
 * db/patterns/quant/time_speed_distance.js), in the PYQ framings: two readers of the
 * same book (WBPSC Clerkship 2023), typists copying one manuscript, thief and police,
 * bus and car, walker and cyclist, goods and express train.
 *
 * Every question is built from exact integers: the head start (slower rate × gap)
 * and the catch-up time (head start ÷ rate difference) come out in whole minutes,
 * so clock-time answers are exact. Distractors are the real mistakes: counting
 * from the first starter's clock, dividing the head-start TIME by the difference,
 * adding the rates, or forgetting the head start.
 */

const { ri, pick, shuffle, gcd, n2, T, names, NAMES_F, NAMES_M, numOptions, build } = require('../common');

const PATTERN = 'chase_head_start';

/** Minutes from midnight -> "5:50 p.m." (as in the PYQ, in both languages). */
function clock(m) {
  const h24 = Math.floor(m / 60) % 24;
  const mm = m % 60;
  const s = `${h24 % 12 || 12}:${String(mm).padStart(2, '0')} ${h24 < 12 ? 'a.m.' : 'p.m.'}`;
  return T(s, s);
}

/** Minutes -> "2 hours 30 minutes" / "2 ঘণ্টা 30 মিনিট". */
function duration(m) {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  const en = [h && `${h} hour${h === 1 ? '' : 's'}`, mm && `${mm} minute${mm === 1 ? '' : 's'}`].filter(Boolean).join(' ');
  const bn = [h && `${h} ঘণ্টা`, mm && `${mm} মিনিট`].filter(Boolean).join(' ');
  return T(en, bn);
}

/** Minutes as a fraction of an hour: 50 -> "5/6", 90 -> "3/2", 60 -> "1". */
function hourFraction(m) {
  const g = gcd(m, 60);
  return 60 / g === 1 ? String(m / 60) : `${m / g}/${60 / g}`;
}

/** Four options for an answer in whole minutes; hints = [[minutes, trapEn, trapBn], ...]. */
function minuteOptions(ans, fmt, hints, step, max = Infinity) {
  const seen = new Set([ans]);
  const wrong = [];
  const add = (v, trap) => {
    if (!Number.isInteger(v) || v <= 0 || v > max || seen.has(v) || wrong.length >= 3) return;
    seen.add(v);
    wrong.push({ ...fmt(v), ...(trap && { trap }) });
  };
  for (const [v, en, bn] of hints.slice(0, 2)) add(v, T(en, bn));
  for (const k of shuffle([1, -1, 2, -2, 3])) add(ans + k * step);
  for (let k = 4; wrong.length < 3 && k < 40; k++) add(ans + (k % 2 ? k : -k) * step);
  return { correct: fmt(ans), wrong };
}

const KM = { en: 'km', bn: 'কিমি', rateEn: 'km/h', rateBn: 'কিমি/ঘণ্টা' };
const PAGES = { en: 'pages', bn: 'পৃষ্ঠা', rateEn: 'pages per hour', rateBn: 'পৃষ্ঠা/ঘণ্টা' };

/**
 * Framings: rates (slow a, difference d), gap in minutes, and the stems.
 * stem(kind, p) gets p = { X, Y, a, b, c1, c2, gap } and returns { en, bn }.
 */
const FRAMINGS = [
  {
    key: 'reading', unit: PAGES,
    a: [20, 25, 30, 35, 40, 45, 50], d: [5, 10, 15, 20], gap: [20, 30, 40, 45, 50, 60, 80, 90],
    people: () => names(2),
    stem: (kind, { X, Y, a, b, c1, c2, gap }) => {
      const intro = kind === 'clock'
        ? T(`${X.en} reads at an average rate of ${a} pages per hour while ${Y.en} reads at ${b} pages per hour. If ${X.en} starts reading a novel at ${c1.en} and ${Y.en} begins reading an identical copy at ${c2.en},`,
          `${X.bn} ঘণ্টায় গড়ে ${a} পৃষ্ঠা পড়ে, আর ${Y.bn} ঘণ্টায় ${b} পৃষ্ঠা পড়ে। ${X.bn} ${c1.bn}-এ একটি উপন্যাস পড়তে শুরু করে এবং ${Y.bn} ${c2.bn}-এ একই বইয়ের আরেকটি কপি পড়তে শুরু করে।`)
        : T(`${X.en} reads at ${a} pages per hour and ${Y.en} at ${b} pages per hour. ${X.en} starts a novel and ${Y.en} starts an identical copy ${gap.en} later.`,
          `${X.bn} ঘণ্টায় ${a} পৃষ্ঠা এবং ${Y.bn} ঘণ্টায় ${b} পৃষ্ঠা পড়ে। ${X.bn} একটি উপন্যাস পড়া শুরু করে এবং ${gap.bn} পরে ${Y.bn} একই বইয়ের আরেকটি কপি পড়া শুরু করে।`);
      const ask = {
        clock: T('at what time will they be reading the same page?', 'কোন সময়ে তারা একই পৃষ্ঠা পড়বে?'),
        duration: T(`How long after ${Y.en} starts will they be reading the same page?`, `${Y.bn} পড়া শুরু করার কত সময় পরে তারা একই পৃষ্ঠা পড়বে?`),
        distance: T('How many pages will each of them have read when they reach the same page?', 'যখন তারা একই পৃষ্ঠায় পৌঁছবে, তখন প্রত্যেকে কত পৃষ্ঠা পড়ে ফেলেছে?'),
      }[kind];
      return T(`${intro.en} ${ask.en}`, `${intro.bn} ${ask.bn}`);
    },
  },
  {
    key: 'typing', unit: PAGES,
    a: [6, 8, 9, 10, 12, 15], d: [2, 3, 4, 5, 6], gap: [20, 30, 40, 45, 60],
    people: () => names(2),
    stem: (kind, { X, Y, a, b, c1, c2, gap }) => {
      const when = kind === 'clock'
        ? T(`At ${c1.en} ${X.en} starts typing, and at ${c2.en} ${Y.en} starts.`, `${X.bn} ${c1.bn}-এ এবং ${Y.bn} ${c2.bn}-এ শুরু করে।`)
        : T(`${Y.en} starts ${gap.en} after ${X.en}.`, `${X.bn} শুরু করার ${gap.bn} পরে ${Y.bn} শুরু করে।`);
      const ask = {
        clock: T('At what time will both be typing the same page?', 'কোন সময়ে দুজনে একই পৃষ্ঠা টাইপ করবে?'),
        duration: T(`How long after starting will ${Y.en} catch up with ${X.en}?`, `শুরু করার কত সময় পরে ${Y.bn} ${X.bn}-কে ধরে ফেলবে?`),
        distance: T('How many pages will each have typed at that moment?', 'সেই মুহূর্তে প্রত্যেকে কত পৃষ্ঠা টাইপ করে ফেলেছে?'),
      }[kind];
      return T(
        `${X.en} types ${a} pages per hour and ${Y.en} types ${b} pages per hour. Both type copies of the same manuscript from page 1. ${when.en} ${ask.en}`,
        `${X.bn} ঘণ্টায় ${a} পৃষ্ঠা এবং ${Y.bn} ঘণ্টায় ${b} পৃষ্ঠা টাইপ করে। দুজনেই একই পাণ্ডুলিপি প্রথম পৃষ্ঠা থেকে টাইপ করে। ${when.bn} ${ask.bn}`,
      );
    },
  },
  {
    key: 'thief_police', unit: KM,
    a: [6, 8, 9, 10, 12], d: [2, 3, 4, 5, 6], gap: [10, 15, 20, 30, 40, 45],
    people: () => [T('the thief', 'চোর'), T('the policeman', 'পুলিশ')],
    stem: (kind, { a, b, c1, c2, gap }) => {
      const intro = kind === 'clock'
        ? T(`A thief runs away from a market at ${c1.en} at ${a} km/h. A policeman starts chasing him from the same place at ${c2.en} at ${b} km/h.`,
          `একজন চোর ${c1.bn}-এ একটি বাজার থেকে ঘণ্টায় ${a} কিমি বেগে পালায়। একজন পুলিশ ${c2.bn}-এ একই জায়গা থেকে ঘণ্টায় ${b} কিমি বেগে তাকে তাড়া করে।`)
        : T(`A thief runs away from a market at ${a} km/h. ${gap.en} later a policeman starts chasing him from the same place at ${b} km/h.`,
          `একজন চোর একটি বাজার থেকে ঘণ্টায় ${a} কিমি বেগে পালায়। ${gap.bn} পরে একজন পুলিশ একই জায়গা থেকে ঘণ্টায় ${b} কিমি বেগে তাকে তাড়া করে।`);
      const ask = {
        clock: T('At what time will the thief be caught?', 'কখন চোর ধরা পড়বে?'),
        duration: T('How long after the policeman starts will the thief be caught?', 'পুলিশ রওনা দেওয়ার কত সময় পরে চোর ধরা পড়বে?'),
        distance: T('How far from the market will the thief be caught?', 'বাজার থেকে কত দূরে চোর ধরা পড়বে?'),
      }[kind];
      return T(`${intro.en} ${ask.en}`, `${intro.bn} ${ask.bn}`);
    },
  },
  {
    key: 'bus_car', unit: KM,
    a: [30, 36, 40, 45, 48, 50], d: [10, 12, 15, 20, 24, 30], gap: [20, 30, 40, 45, 60, 90],
    people: () => [T('the bus', 'বাস'), T('the car', 'গাড়ি')],
    stem: (kind, { a, b, c1, c2, gap }) => {
      const intro = kind === 'clock'
        ? T(`A bus leaves a depot at ${c1.en} at ${a} km/h. A car leaves the same depot at ${c2.en} and follows the same road at ${b} km/h.`,
          `একটি বাস ${c1.bn}-এ একটি ডিপো থেকে ঘণ্টায় ${a} কিমি বেগে রওনা দেয়। একটি গাড়ি ${c2.bn}-এ একই ডিপো থেকে একই রাস্তায় ঘণ্টায় ${b} কিমি বেগে যায়।`)
        : T(`A bus leaves a depot at ${a} km/h. ${gap.en} later a car leaves the same depot along the same road at ${b} km/h.`,
          `একটি বাস একটি ডিপো থেকে ঘণ্টায় ${a} কিমি বেগে রওনা দেয়। ${gap.bn} পরে একটি গাড়ি একই ডিপো থেকে একই রাস্তায় ঘণ্টায় ${b} কিমি বেগে যায়।`);
      const ask = {
        clock: T('At what time will the car overtake the bus?', 'কখন গাড়িটি বাসটিকে ধরে ফেলবে?'),
        duration: T('How long after it starts will the car catch the bus?', 'রওনা দেওয়ার কত সময় পরে গাড়িটি বাসটিকে ধরবে?'),
        distance: T('How far from the depot will the car catch the bus?', 'ডিপো থেকে কত দূরে গাড়িটি বাসটিকে ধরবে?'),
      }[kind];
      return T(`${intro.en} ${ask.en}`, `${intro.bn} ${ask.bn}`);
    },
  },
  {
    key: 'walk_cycle', unit: KM,
    a: [3, 4, 5, 6], d: [6, 8, 9, 10, 12], gap: [15, 20, 30, 40, 45, 60],
    people: () => [pick(NAMES_M), pick(NAMES_F)],
    stem: (kind, { X, Y, a, b, c1, c2, gap }) => {
      const intro = kind === 'clock'
        ? T(`${X.en} leaves home at ${c1.en} and walks at ${a} km/h. ${Y.en} leaves the same home at ${c2.en} and cycles along the same road at ${b} km/h.`,
          `${X.bn} ${c1.bn}-এ বাড়ি থেকে বেরিয়ে ঘণ্টায় ${a} কিমি বেগে হাঁটে। ${Y.bn} ${c2.bn}-এ একই বাড়ি থেকে একই রাস্তায় ঘণ্টায় ${b} কিমি বেগে সাইকেল চালায়।`)
        : T(`${X.en} leaves home walking at ${a} km/h. ${gap.en} later ${Y.en} leaves the same home and cycles along the same road at ${b} km/h.`,
          `${X.bn} বাড়ি থেকে ঘণ্টায় ${a} কিমি বেগে হাঁটতে শুরু করে। ${gap.bn} পরে ${Y.bn} একই বাড়ি থেকে একই রাস্তায় ঘণ্টায় ${b} কিমি বেগে সাইকেল চালায়।`);
      const ask = {
        clock: T(`At what time will ${Y.en} catch up with ${X.en}?`, `কখন ${Y.bn} ${X.bn}-কে ধরে ফেলবে?`),
        duration: T(`How long after setting out will ${Y.en} catch up with ${X.en}?`, `রওনা দেওয়ার কত সময় পরে ${Y.bn} ${X.bn}-কে ধরবে?`),
        distance: T(`How far from home will ${Y.en} catch up with ${X.en}?`, `বাড়ি থেকে কত দূরে ${Y.bn} ${X.bn}-কে ধরবে?`),
      }[kind];
      return T(`${intro.en} ${ask.en}`, `${intro.bn} ${ask.bn}`);
    },
  },
  {
    key: 'trains', unit: KM,
    a: [30, 36, 40, 45, 48], d: [15, 20, 24, 30, 36], gap: [20, 30, 40, 45, 60, 90],
    people: () => [T('the goods train', 'মালগাড়ি'), T('the express train', 'এক্সপ্রেস ট্রেন')],
    stem: (kind, { a, b, c1, c2, gap }) => {
      const intro = kind === 'clock'
        ? T(`A goods train leaves a station at ${c1.en} at ${a} km/h. An express train leaves the same station at ${c2.en} on a parallel track in the same direction at ${b} km/h.`,
          `একটি মালগাড়ি ${c1.bn}-এ একটি স্টেশন থেকে ঘণ্টায় ${a} কিমি বেগে ছাড়ে। একটি এক্সপ্রেস ট্রেন ${c2.bn}-এ একই স্টেশন থেকে সমান্তরাল লাইনে একই দিকে ঘণ্টায় ${b} কিমি বেগে ছাড়ে।`)
        : T(`A goods train leaves a station at ${a} km/h. ${gap.en} later an express train leaves the same station on a parallel track in the same direction at ${b} km/h.`,
          `একটি মালগাড়ি একটি স্টেশন থেকে ঘণ্টায় ${a} কিমি বেগে ছাড়ে। ${gap.bn} পরে একটি এক্সপ্রেস ট্রেন একই স্টেশন থেকে সমান্তরাল লাইনে একই দিকে ঘণ্টায় ${b} কিমি বেগে ছাড়ে।`);
      const ask = {
        clock: T('At what time will the express train draw level with the goods train?', 'কখন এক্সপ্রেস ট্রেনটি মালগাড়িকে ধরে ফেলবে?'),
        duration: T('How long after it starts will the express train draw level with the goods train?', 'ছাড়ার কত সময় পরে এক্সপ্রেস ট্রেনটি মালগাড়িকে ধরবে?'),
        distance: T('How far from the station will the express train draw level with the goods train?', 'স্টেশন থেকে কত দূরে এক্সপ্রেস ট্রেনটি মালগাড়িকে ধরবে?'),
      }[kind];
      return T(`${intro.en} ${ask.en}`, `${intro.bn} ${ask.bn}`);
    },
  },
];

const KINDS = ['clock', 'clock', 'duration', 'distance']; // clock time is the PYQ form

function chaseHeadStart(framing = pick(FRAMINGS), kind = pick(KINDS)) {
  const a = pick(framing.a);
  const d = pick(framing.d);
  const b = a + d;
  const g = pick(framing.gap);
  const tMin = (a * g) / d; // catch-up time in minutes, counted from the second start
  if (!Number.isInteger(tMin) || tMin % 5 || tMin < 15 || tMin > 8 * 60) return null;
  const headStart = (a * g) / 60; // units the slower one is ahead
  if (!Number.isInteger(headStart)) return null; // keep the working in whole pages / km, as in exam keys
  const total = (b * tMin) / 60; // units each has covered when level
  if (kind === 'distance' && !Number.isInteger(total)) return null;

  const t1 = ri(6 * 6, 16 * 6) * 10; // 6:00 a.m. .. 4:00 p.m., 10-minute steps
  const t2 = t1 + g;
  if (t2 + tMin >= 23 * 60) return null;
  const [X, Y] = framing.people();
  const u = framing.unit;
  const stem = framing.stem(kind, { X, Y, a, b, c1: clock(t1), c2: clock(t2), gap: duration(g) });

  // Traps, in minutes after the second start.
  const timeNotDistance = (g * 60) / d; // head-start TIME ÷ difference
  const addedRates = (a * g) / (a + b); // gap ÷ (a + b)
  let options;
  if (kind === 'clock') {
    options = minuteOptions(t2 + tMin, clock, [
      [t1 + tMin, 'The catch-up time is counted from when the second one starts, not the first.', 'ধরে ফেলার সময় দ্বিতীয় জনের শুরু থেকে গোনা হয়, প্রথম জনের শুরু থেকে নয়।'],
      [t2 + timeNotDistance, 'The head-start TIME was divided by the difference; first turn it into a head-start distance.', 'আগাম শুরুর সময়কে পার্থক্য দিয়ে ভাগ করা হয়েছে; আগে সেটিকে আগাম দূরত্বে বদলাও।'],
      [t2 + addedRates, 'Both move the same way, so subtract the rates; adding them is for moving towards each other.', 'দুজনে একই দিকে চলে, তাই হার বিয়োগ করতে হয়; যোগ করা হয় পরস্পরের দিকে চললে।'],
    ], 10, 23 * 60 + 50); // same day: no "2:10 a.m." after an afternoon start
  } else if (kind === 'duration') {
    options = minuteOptions(tMin, duration, [
      [timeNotDistance, 'The head-start TIME was divided by the difference; first turn it into a head-start distance.', 'আগাম শুরুর সময়কে পার্থক্য দিয়ে ভাগ করা হয়েছে; আগে সেটিকে আগাম দূরত্বে বদলাও।'],
      [tMin + g, 'That is counted from the first start; the question asks from the second start.', 'এটি প্রথম জনের শুরু থেকে গোনা; প্রশ্নে দ্বিতীয় জনের শুরু থেকে জানতে চাওয়া হয়েছে।'],
      [addedRates, 'Both move the same way, so subtract the rates; adding them is for moving towards each other.', 'দুজনে একই দিকে চলে, তাই হার বিয়োগ করতে হয়; যোগ করা হয় পরস্পরের দিকে চললে।'],
    ], 10);
  } else {
    const hints = [];
    const chaseOnly = (a * tMin) / 60;
    if (Number.isInteger(chaseOnly)) hints.push([chaseOnly, 'The head start was left out: the slower one had already covered some before the chase.', 'আগাম অংশটি বাদ পড়েছে: তাড়া শুরুর আগেই ধীর জন কিছুটা এগিয়ে ছিল।']);
    if (Number.isInteger(headStart)) hints.push([headStart, 'That is only the head start, not where they become level.', 'এটি কেবল আগাম অংশ, যেখানে তারা সমান হয় সেটি নয়।']);
    options = numOptions(total, (v) => T(`${n2(v)} ${u.en}`, `${n2(v)} ${u.bn}`), hints);
  }

  const steps = [
    g % 60
      ? T(`Gap between the starts = ${duration(g).en} = ${hourFraction(g)} hour.`, `দুজনের শুরুর ব্যবধান = ${duration(g).bn} = ${hourFraction(g)} ঘণ্টা।`)
      : T(`Gap between the starts = ${duration(g).en}.`, `দুজনের শুরুর ব্যবধান = ${duration(g).bn}।`),
    T(`Head start (covered by the slower one alone) = ${a} × ${hourFraction(g)} = ${n2(headStart)} ${u.en}.`, `আগাম অংশ (শুধু ধীর জন যা এগিয়েছে) = ${a} × ${hourFraction(g)} = ${n2(headStart)} ${u.bn}।`),
    T(`Same direction, so the gap closes at ${b} − ${a} = ${d} ${u.rateEn}; catch-up time = ${n2(headStart)} ÷ ${d} = ${duration(tMin).en}.`,
      `একই দিকে, তাই ব্যবধান কমে ${b} − ${a} = ${d} ${u.rateBn} হারে; ধরে ফেলার সময় = ${n2(headStart)} ÷ ${d} = ${duration(tMin).bn}।`),
  ];
  if (kind === 'clock') steps.push(T(`Second start ${clock(t2).en} + ${duration(tMin).en} → answer ${clock(t2 + tMin).en}`, `দ্বিতীয় জনের শুরু ${clock(t2).bn} + ${duration(tMin).bn} → উত্তর ${clock(t2 + tMin).bn}`));
  if (kind === 'distance') steps.push(T(`Each has covered ${b} × ${hourFraction(tMin)} = ${n2(total)} ${u.en} (check: ${a} × ${hourFraction(g + tMin)} = ${n2(total)}).`, `প্রত্যেকে অতিক্রম করেছে ${b} × ${hourFraction(tMin)} = ${n2(total)} ${u.bn} (যাচাই: ${a} × ${hourFraction(g + tMin)} = ${n2(total)})।`));

  return build({
    topic: 'time_speed_distance', subtopic: PATTERN, pattern: PATTERN,
    tags: ['speed_distance', 'relative_speed', 'head_start', framing.key],
    difficulty: kind === 'duration' ? 2 : 3,
    time: kind === 'duration' ? 60 : 75,
    stem,
    ...options,
    steps,
    shortcut: T('Head start = slower rate × gap; catch-up time = head start ÷ (faster − slower), counted from the second start.', 'আগাম অংশ = ধীর হার × ব্যবধান; ধরার সময় = আগাম অংশ ÷ (দ্রুত − ধীর), দ্বিতীয় জনের শুরু থেকে।'),
  });
}

module.exports = {
  subject: 'quant',
  topics: [{ topic: 'time_speed_distance', weight: 1, gens: FRAMINGS.map((f) => () => chaseHeadStart(f)) }],
  chaseHeadStart,
  FRAMINGS,
  clock,
  duration,
};
