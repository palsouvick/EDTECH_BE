'use strict';

/**
 * Hard Time & Work questions. Pattern matrix: db/patterns/quant/hard/time_work.js.
 * Work is counted in LCM units, the method taught for this chapter.
 */

const { pick, ri, names } = require('../common');
const { T, ex, gcd, clean, cents, bnOf, makeQuestionFactory } = require('./framework');
const registry = require('../../../db/patterns/quant/hard/time_work');

const q = makeQuestionFactory('time_work', registry);
const lcm = (a, b) => (a / gcd(a, b)) * b;
const DAYS = [4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24, 25, 30, 36, 40, 45, 48, 60];
const two = () => {
  const a = pick(DAYS);
  const b = pick(DAYS);
  return a === b ? null : { a, b, L: lcm(a, b) };
};
const dayWord = (n) => T(`${ex(n)} day${n === 1 ? '' : 's'}`, `${ex(n)} দিন`);

const gens = {
  w_together_then_leave() {
    const variant = pick(['a_leaves', 'b_joins_later']);
    const p = two();
    if (!p) return null;
    const { a, b, L } = p;
    const [ra, rb] = [L / a, L / b];
    const [x, y] = names(2);
    const k = ri(1, Math.min(a, b) - 1);
    if (variant === 'a_leaves') {
      const rest = L - k * (ra + rb);
      const ans = rest / rb;
      if (rest <= 0 || !clean(ans)) return null;
      return q({
        id: 'w_together_then_leave', variant, kind: 'days', answer: ans, given: { a, b, k },
        stem: T(`${x.en} can finish a piece of work in ${a} days and ${y.en} in ${b} days. They work together for ${dayWord(k).en}, and then ${x.en} leaves. In how many more days will ${y.en} finish the remaining work?`,
          `${x.bn} একা একটি কাজ ${a} দিনে এবং ${y.bn} ${b} দিনে শেষ করতে পারেন। তাঁরা একসঙ্গে ${k} দিন কাজ করার পর ${x.bn} চলে যান। বাকি কাজ ${y.bn} আর কত দিনে শেষ করবেন?`),
        hints: [
          [b - k, 'Subtracted days directly; part of the work was done at the combined rate.', 'সরাসরি দিন বিয়োগ করা হয়েছে; কিছু কাজ দুজনে মিলে করেছেন।'],
          [rest / (ra + rb), 'Kept both working on the remaining work.', 'বাকি কাজেও দুজনকে ধরা হয়েছে।'],
          [(L - k * rb) / rb, `Ignored ${x.en}'s work in the first ${k} days.`, `প্রথম ${k} দিনে ${bnOf(x)} কাজ বাদ দেওয়া হয়েছে।`],
        ],
        steps: [
          T(`Take the work as ${L} units: ${x.en} does ${ra} units/day, ${y.en} ${rb} units/day.`, `মোট কাজ ${L} একক ধরি: ${x.bn} দিনে ${ra} একক, ${y.bn} দিনে ${rb} একক করেন।`),
          T(`In ${k} days together: ${k} × ${ra + rb} = ${k * (ra + rb)} units; remaining = ${rest} units.`, `একসঙ্গে ${k} দিনে: ${k} × ${ra + rb} = ${k * (ra + rb)} একক; বাকি = ${rest} একক।`),
          T(`${y.en} needs ${rest} ÷ ${rb} = ${ex(ans)} more days.`, `${y.bn} আরও ${rest} ÷ ${rb} = ${ex(ans)} দিন নেবেন।`),
        ],
        shortcut: T('Use LCM units so every rate is a whole number.', 'ল.সা.গু. একক ধরলে সব হার পূর্ণসংখ্যা হয়।'),
      });
    }
    const rest = L - k * ra;
    const ans = rest / (ra + rb);
    if (rest <= 0 || !clean(ans)) return null;
    return q({
      id: 'w_together_then_leave', variant, kind: 'days', answer: ans, given: { a, b, k },
      stem: T(`${x.en} alone can do a job in ${a} days and ${y.en} alone in ${b} days. ${x.en} starts the job alone, and ${y.en} joins after ${dayWord(k).en}. In how many more days is the job finished?`,
        `${x.bn} একা একটি কাজ ${a} দিনে এবং ${y.bn} একা ${b} দিনে করতে পারেন। ${x.bn} একা কাজ শুরু করেন, ${k} দিন পরে ${y.bn} যোগ দেন। আর কত দিনে কাজটি শেষ হবে?`),
      hints: [
        [L / (ra + rb), 'This is the time if both had worked together from the start.', 'শুরু থেকে দুজনে একসঙ্গে কাজ করলে যে সময় লাগত, এটি তা।'],
        [rest / rb, `${x.en} keeps working after ${y.en} joins.`, `${y.bn} যোগ দেওয়ার পরেও ${x.bn} কাজ চালিয়ে যান।`],
        [L / (ra + rb) - k, 'Subtracted the days instead of the work done.', 'করা কাজের বদলে দিন বিয়োগ করা হয়েছে।'],
      ],
      steps: [
        T(`Work = ${L} units; ${x.en}: ${ra}/day, ${y.en}: ${rb}/day.`, `মোট কাজ = ${L} একক; ${x.bn}: দিনে ${ra}, ${y.bn}: দিনে ${rb} একক।`),
        T(`${x.en} alone for ${k} days: ${k * ra} units; remaining ${rest} units.`, `${x.bn} একা ${k} দিনে: ${k * ra} একক; বাকি ${rest} একক।`),
        T(`Together: ${rest} ÷ ${ra + rb} = ${ex(ans)} more days.`, `একসঙ্গে: ${rest} ÷ ${ra + rb} = আরও ${ex(ans)} দিন।`),
      ],
      shortcut: T('Subtract the work done alone, then divide by the combined rate.', 'একা করা কাজ বাদ দিয়ে বাকিটা মিলিত হার দিয়ে ভাগ করো।'),
    });
  },

  w_efficiency_percent() {
    const variant = pick(['find_faster', 'find_slower']);
    const p = pick([20, 25, 50, 60, 100, 150]);
    const d = ri(4, 30);
    const total = d * (200 + p);
    const ans = variant === 'find_faster' ? total / (100 + p) : total / 100;
    if (!clean(ans)) return null;
    const [x, y] = names(2);
    return q({
      id: 'w_efficiency_percent', variant, kind: 'days', answer: ans, given: { p, d },
      stem: T(`${x.en} is ${p}% more efficient than ${y.en}. Working together, they finish a job in ${d} days. How long would ${variant === 'find_faster' ? x.en : y.en} take alone?`,
        `${x.bn} ${bnOf(y)} চেয়ে ${p}% বেশি দক্ষ। দুজনে একসঙ্গে একটি কাজ ${d} দিনে শেষ করেন। ${variant === 'find_faster' ? x.bn : y.bn} একা কাজটি কত দিনে করবেন?`),
      hints: [
        [2 * d, 'Assumed both are equally efficient.', 'দুজনকে সমান দক্ষ ধরা হয়েছে।'],
        [variant === 'find_faster' ? total / 100 : total / (100 + p), 'This is the other worker’s time.', 'এটি অন্যজনের সময়।'],
        [variant === 'find_faster' ? (total / 100) * (1 - p / 100) : (total / (100 + p)) * (1 + p / 100) + d, 'Changed the time by p%; time is inversely proportional to efficiency.', 'সময়কে p% বদলানো হয়েছে; সময় দক্ষতার বিপরীত অনুপাতে।'],
      ],
      steps: [
        T(`Efficiencies: ${x.en} : ${y.en} = ${100 + p} : 100 (units of work per day).`, `দক্ষতা: ${x.bn} : ${y.bn} = ${100 + p} : 100 (দিনে কাজের একক)।`),
        T(`Total work = ${d} × (${100 + p} + 100) = ${total} units.`, `মোট কাজ = ${d} × (${100 + p} + 100) = ${total} একক।`),
        T(`${variant === 'find_faster' ? x.en : y.en} alone: ${total} ÷ ${variant === 'find_faster' ? 100 + p : 100} = ${ex(ans)} days.`, `${variant === 'find_faster' ? x.bn : y.bn} একা: ${total} ÷ ${variant === 'find_faster' ? 100 + p : 100} = ${ex(ans)} দিন।`),
      ],
      shortcut: T('Turn the percentage into a ratio of daily work, then use total work ÷ rate.', 'শতাংশকে দৈনিক কাজের অনুপাতে আনো, তারপর মোট কাজ ÷ হার।'),
    });
  },

  w_men_days_hours() {
    const variant = pick(['find_days', 'find_men']);
    const [M1, H1, D1, W1] = [ri(6, 30), ri(5, 10), ri(5, 30), ri(2, 12)];
    const [H2, W2] = [ri(5, 10), ri(2, 12)];
    if (variant === 'find_days') {
      const M2 = ri(6, 40);
      const D2 = (D1 * M1 * H1 * W2) / (M2 * H2 * W1);
      if (!clean(D2) || D2 < 1 || (M1 === M2 && H1 === H2 && W1 === W2)) return null;
      return q({
        id: 'w_men_days_hours', variant, kind: 'days', answer: D2, given: { M1, H1, W1, D1, M2, H2, W2 },
        stem: T(`${M1} workers, working ${H1} hours a day, can lay ${W1} km of road in ${D1} days. How many days will ${M2} workers, working ${H2} hours a day, take to lay ${W2} km of road?`,
          `${M1} জন শ্রমিক দিনে ${H1} ঘণ্টা কাজ করে ${D1} দিনে ${W1} কিমি রাস্তা তৈরি করতে পারেন। ${M2} জন শ্রমিক দিনে ${H2} ঘণ্টা কাজ করে ${W2} কিমি রাস্তা কত দিনে তৈরি করবেন?`),
        hints: [
          [(D1 * M1 * W2) / (M2 * W1), 'Ignored the change in working hours.', 'কাজের ঘণ্টার পরিবর্তন বাদ দেওয়া হয়েছে।'],
          [(D1 * M2 * H2 * W2) / (M1 * H1 * W1), 'Treated workers and hours as directly proportional to days.', 'শ্রমিক ও ঘণ্টাকে দিনের সঙ্গে সরল অনুপাতে ধরা হয়েছে।'],
          [(D1 * W2) / W1, 'Scaled only by the length of road.', 'শুধু রাস্তার দৈর্ঘ্য দিয়ে অনুপাত করা হয়েছে।'],
        ],
        steps: [
          T('Work ∝ workers × hours per day × days, so M₁H₁D₁/W₁ = M₂H₂D₂/W₂.', 'কাজ ∝ শ্রমিক × দৈনিক ঘণ্টা × দিন, তাই M₁H₁D₁/W₁ = M₂H₂D₂/W₂।'),
          T(`${M1} × ${H1} × ${D1} / ${W1} = ${M2} × ${H2} × D₂ / ${W2}.`, `অর্থাৎ ${M1} × ${H1} × ${D1} / ${W1} = ${M2} × ${H2} × D₂ / ${W2}।`),
          T(`D₂ = ${M1 * H1 * D1 * W2} ÷ ${M2 * H2 * W1} = ${ex(D2)} days.`, `D₂ = ${M1 * H1 * D1 * W2} ÷ ${M2 * H2 * W1} = ${ex(D2)} দিন।`),
        ],
        shortcut: T('More workers or hours → fewer days; more work → more days.', 'শ্রমিক বা ঘণ্টা বাড়লে দিন কমে; কাজ বাড়লে দিন বাড়ে।'),
      });
    }
    const D2 = ri(4, 30);
    const M2 = (D1 * M1 * H1 * W2) / (D2 * H2 * W1);
    if (!Number.isInteger(M2) || M2 < 2 || (D1 === D2 && H1 === H2 && W1 === W2)) return null;
    return q({
      id: 'w_men_days_hours', variant, kind: 'persons', answer: M2, given: { M1, H1, W1, D1, D2, H2, W2 },
      stem: T(`${M1} workers, working ${H1} hours a day, can lay ${W1} km of road in ${D1} days. How many workers are needed to lay ${W2} km of road in ${D2} days, working ${H2} hours a day?`,
        `${M1} জন শ্রমিক দিনে ${H1} ঘণ্টা কাজ করে ${D1} দিনে ${W1} কিমি রাস্তা তৈরি করেন। দিনে ${H2} ঘণ্টা কাজ করে ${D2} দিনে ${W2} কিমি রাস্তা তৈরি করতে কতজন শ্রমিক লাগবে?`),
      hints: [
        [(M1 * D1 * W2) / (D2 * W1), 'Ignored the change in working hours.', 'কাজের ঘণ্টার পরিবর্তন বাদ দেওয়া হয়েছে।'],
        [(M1 * D2 * H2 * W2) / (D1 * H1 * W1), 'Treated days and hours as directly proportional to workers.', 'দিন ও ঘণ্টাকে শ্রমিকের সঙ্গে সরল অনুপাতে ধরা হয়েছে।'],
        [(M1 * W2) / W1, 'Scaled only by the length of road.', 'শুধু রাস্তার দৈর্ঘ্য দিয়ে অনুপাত করা হয়েছে।'],
      ],
      steps: [
        T('M₁H₁D₁/W₁ = M₂H₂D₂/W₂.', 'সূত্র: M₁H₁D₁/W₁ = M₂H₂D₂/W₂।'),
        T(`${M1} × ${H1} × ${D1} / ${W1} = M₂ × ${H2} × ${D2} / ${W2}.`, `অর্থাৎ ${M1} × ${H1} × ${D1} / ${W1} = M₂ × ${H2} × ${D2} / ${W2}।`),
        T(`M₂ = ${M1 * H1 * D1 * W2} ÷ ${D2 * H2 * W1} = ${M2} workers.`, `M₂ = ${M1 * H1 * D1 * W2} ÷ ${D2 * H2 * W1} = ${M2} জন শ্রমিক।`),
      ],
      shortcut: T('Put each change as a factor that raises or lowers the number of workers.', 'প্রতিটি পরিবর্তনকে এমন গুণক হিসেবে বসাও যা শ্রমিকসংখ্যা বাড়ায় বা কমায়।'),
    });
  },

  w_alternate_days() {
    const variant = pick(['a_first', 'b_first']);
    const p = two();
    if (!p) return null;
    const { a, b, L } = p;
    const [ra, rb] = [L / a, L / b];
    const [first, second] = variant === 'a_first' ? [ra, rb] : [rb, ra];
    const cycles = Math.floor(L / (first + second));
    let rem = L - cycles * (first + second);
    const left = rem;
    let days = 2 * cycles;
    if (rem === 0) {
      // finished exactly at the end of a cycle
    } else if (rem <= first) {
      days += rem / first;
    } else {
      rem -= first;
      days += 1 + rem / second;
    }
    if (!clean(days)) return null;
    const [x, y] = names(2);
    const starter = variant === 'a_first' ? x : y;
    const other = variant === 'a_first' ? y : x;
    const day1 = 2 * cycles + 1;
    let finish;
    if (left === 0) {
      finish = T(`The work is done exactly at the end of day ${2 * cycles}.`, `কাজ ঠিক ${2 * cycles}তম দিনের শেষে শেষ হয়।`);
    } else if (left <= first) {
      finish = T(
        `Day ${day1}: ${starter.en} needs ${left}/${first} = ${ex(left / first)} of a day. Total = ${2 * cycles} + ${ex(left / first)} = ${ex(days)} days.`,
        `${day1}তম দিনে ${starter.bn}কে ${left}/${first} = ${ex(left / first)} দিন কাজ করতে হয়। মোট = ${2 * cycles} + ${ex(left / first)} = ${ex(days)} দিন।`,
      );
    } else {
      finish = T(
        `Day ${day1}: ${starter.en} does ${first} units, leaving ${left - first}. Day ${day1 + 1}: ${other.en} needs ${left - first}/${second} = ${ex((left - first) / second)} of a day. Total = ${ex(days)} days.`,
        `${day1}তম দিনে ${starter.bn} ${first} একক করেন, বাকি ${left - first}। ${day1 + 1}তম দিনে ${other.bn}কে ${left - first}/${second} = ${ex((left - first) / second)} দিন লাগে। মোট = ${ex(days)} দিন।`,
      );
    }
    return q({
      id: 'w_alternate_days', variant, kind: 'days', answer: days, given: { a, b },
      stem: T(`${x.en} can do a job in ${a} days and ${y.en} in ${b} days. They work on alternate days, ${starter.en} working on the first day. In how many days will the job be finished?`,
        `${x.bn} একটি কাজ ${a} দিনে এবং ${y.bn} ${b} দিনে করতে পারেন। তাঁরা একদিন অন্তর কাজ করেন, প্রথম দিন কাজ করেন ${starter.bn}। কাজটি কত দিনে শেষ হবে?`),
      hints: [
        [L / (ra + rb), 'This is the time if they worked together every day.', 'প্রতিদিন একসঙ্গে কাজ করলে যে সময় লাগত, এটি তা।'],
        [(2 * L) / (ra + rb), 'Doubled the together-time; the last cycle may be partial.', 'একসঙ্গের সময় দ্বিগুণ করা হয়েছে; শেষ চক্রটি অসম্পূর্ণ হতে পারে।'],
        [(a + b) / 2, 'Averaged the two times.', 'দুজনের সময়ের গড় নেওয়া হয়েছে।'],
      ],
      steps: [
        T(`Work = ${L} units; ${x.en} does ${ra}/day, ${y.en} ${rb}/day; one 2-day cycle = ${ra + rb} units.`, `মোট কাজ = ${L} একক; ${x.bn} দিনে ${ra}, ${y.bn} দিনে ${rb}; 2 দিনের এক চক্রে = ${ra + rb} একক।`),
        T(`${cycles} full cycles (${2 * cycles} days) do ${cycles * (ra + rb)} units; ${L - cycles * (ra + rb)} units remain.`, `${cycles}টি পূর্ণ চক্রে (${2 * cycles} দিন) ${cycles * (ra + rb)} একক কাজ হয়; বাকি ${L - cycles * (ra + rb)} একক।`),
        finish,
      ],
      shortcut: T('Count whole 2-day cycles first, then finish the remainder in order.', 'আগে পূর্ণ 2-দিনের চক্র গোনো, তারপর বাকি কাজ ক্রম অনুযায়ী শেষ করো।'),
    });
  },

  w_leaves_before_end() {
    const variant = pick(['first_leaves', 'second_leaves']);
    const p = two();
    if (!p) return null;
    const { a, b, L } = p;
    const [ra, rb] = [L / a, L / b];
    const k = ri(1, 6);
    const leaver = variant === 'first_leaves' ? ra : rb;
    const total = (L + k * leaver) / (ra + rb);
    if (!clean(total) || total <= k) return null;
    const [x, y] = names(2);
    const who = variant === 'first_leaves' ? x : y;
    return q({
      id: 'w_leaves_before_end', variant, kind: 'days', answer: total, given: { a, b, k },
      stem: T(`${x.en} and ${y.en} can do a job in ${a} days and ${b} days respectively. They start together, but ${who.en} leaves ${dayWord(k).en} before the job is completed. In how many days is the job completed?`,
        `${x.bn} ও ${y.bn} একটি কাজ যথাক্রমে ${a} দিনে ও ${b} দিনে করতে পারেন। তাঁরা একসঙ্গে শুরু করেন, কিন্তু কাজ শেষ হওয়ার ${k} দিন আগে ${who.bn} চলে যান। কাজটি কত দিনে শেষ হয়?`),
      hints: [
        [L / (ra + rb) + k, 'Added the days to the together-time; only the leaver’s share of work is missing.', 'একসঙ্গের সময়ে দিন যোগ করা হয়েছে; আসলে শুধু যিনি গেলেন তাঁর কাজ কম হয়।'],
        [L / (ra + rb), 'This is the time if neither left.', 'কেউ না গেলে যে সময় লাগত, এটি তা।'],
        [(L - k * leaver) / (ra + rb), 'Subtracted the missing work instead of adding it.', 'বাদ পড়া কাজ যোগের বদলে বিয়োগ করা হয়েছে।'],
      ],
      steps: [
        T(`Work = ${L} units; rates ${ra} and ${rb} units/day. Let the job take T days.`, `মোট কাজ = ${L} একক; হার দিনে ${ra} ও ${rb} একক। কাজটিতে T দিন লাগে ধরি।`),
        T(`${who.en} works T − ${k} days, the other T days: ${variant === 'first_leaves' ? `${ra}(T − ${k}) + ${rb}T` : `${ra}T + ${rb}(T − ${k})`} = ${L}.`, `${who.bn} কাজ করেন T − ${k} দিন, অন্যজন T দিন: ${variant === 'first_leaves' ? `${ra}(T − ${k}) + ${rb}T` : `${ra}T + ${rb}(T − ${k})`} = ${L}।`),
        T(`${ra + rb}T = ${L} + ${k * leaver} ⇒ T = ${ex(total)} days.`, `সরল করে ${ra + rb}T = ${L} + ${k * leaver} ⇒ T = ${ex(total)} দিন।`),
      ],
      shortcut: T('Pretend the leaver stayed: add his missing work to the job, then divide by the combined rate.', 'ধরে নাও যিনি গেলেন তিনি থাকতেন: তাঁর বাদ পড়া কাজ মোটে যোগ করে মিলিত হার দিয়ে ভাগ করো।'),
    });
  },

  w_men_women_equivalence() {
    const variant = pick(['find_days', 'find_women']);
    const m1 = ri(4, 20);
    const w1 = ri(m1 + 2, 40);
    const D = ri(6, 40);
    if (variant === 'find_days') {
      const [m2, w2] = [ri(2, 15), ri(2, 20)];
      const days = D / (m2 / m1 + w2 / w1);
      if (!clean(days)) return null;
      return q({
        id: 'w_men_women_equivalence', variant, kind: 'days', answer: days, given: { m1, w1, D, m2, w2 },
        stem: T(`${m1} men or ${w1} women can complete a job in ${D} days. In how many days will ${m2} men and ${w2} women together complete it?`,
          `${m1} জন পুরুষ অথবা ${w1} জন মহিলা একটি কাজ ${D} দিনে শেষ করতে পারেন। ${m2} জন পুরুষ ও ${w2} জন মহিলা একসঙ্গে কাজটি কত দিনে শেষ করবেন?`),
        hints: [
          [(D * (m1 + w1)) / (m2 + w2), 'Treated men and women as equally efficient.', 'পুরুষ ও মহিলাকে সমান দক্ষ ধরা হয়েছে।'],
          [(D * m1) / m2, 'Ignored the women.', 'মহিলাদের বাদ দেওয়া হয়েছে।'],
          [D / (m2 / w1 + w2 / m1), 'Swapped the conversion between men and women.', 'পুরুষ-মহিলার রূপান্তর উল্টে গেছে।'],
        ],
        steps: [
          T(`${m1} men = ${w1} women, so 1 man = ${ex(w1 / m1)} women.`, `${m1} জন পুরুষ = ${w1} জন মহিলা, তাই 1 জন পুরুষ = ${ex(w1 / m1)} জন মহিলা।`),
          T(`${m2} men + ${w2} women = ${ex((m2 * w1) / m1 + w2)} women.`, `${m2} জন পুরুষ + ${w2} জন মহিলা = ${ex((m2 * w1) / m1 + w2)} জন মহিলা।`),
          T(`Days = ${D} × ${w1} ÷ ${ex((m2 * w1) / m1 + w2)} = ${ex(days)}.`, `দিন = ${D} × ${w1} ÷ ${ex((m2 * w1) / m1 + w2)} = ${ex(days)}।`),
        ],
        shortcut: T('Convert everyone into one kind of worker, then use workers × days = constant.', 'সবাইকে এক ধরনের কর্মীতে রূপান্তর করো, তারপর কর্মী × দিন = ধ্রুবক।'),
      });
    }
    const m2 = ri(1, m1 - 1);
    const D2 = ri(2, D - 1);
    const w2 = w1 * (D / D2 - m2 / m1);
    if (!Number.isInteger(Math.round(w2 * 1e9) / 1e9) || Math.round(w2) < 1 || Math.abs(w2 - Math.round(w2)) > 1e-9) return null;
    const women = Math.round(w2);
    return q({
      id: 'w_men_women_equivalence', variant, kind: 'persons', answer: women, given: { m1, w1, D, m2, D2 },
      stem: T(`${m1} men or ${w1} women can finish a job in ${D} days. How many women must join ${m2} men to finish the same job in ${D2} days?`,
        `${m1} জন পুরুষ অথবা ${w1} জন মহিলা একটি কাজ ${D} দিনে শেষ করতে পারেন। ${m2} জন পুরুষের সঙ্গে কতজন মহিলা যোগ দিলে কাজটি ${D2} দিনে শেষ হবে?`),
      hints: [
        [Math.round((w1 * D) / D2), 'Forgot the men already working.', 'যে পুরুষেরা আগে থেকেই কাজ করছেন, তাঁদের ভুলে যাওয়া হয়েছে।'],
        [Math.max(1, Math.round((m1 * D) / D2) - m2), 'Counted the answer in men instead of women.', 'উত্তর মহিলার বদলে পুরুষে গোনা হয়েছে।'],
        [women + Math.round(w1 / m1), 'Converted one man too many.', 'একজন পুরুষ বেশি রূপান্তর করা হয়েছে।'],
      ],
      steps: [
        T(`The job needs ${w1} × ${D} = ${w1 * D} woman-days; 1 man = ${ex(w1 / m1)} women.`, `কাজটিতে ${w1} × ${D} = ${w1 * D} মহিলা-দিন লাগে; 1 জন পুরুষ = ${ex(w1 / m1)} জন মহিলা।`),
        T(`In ${D2} days we need ${w1 * D} ÷ ${D2} = ${ex((w1 * D) / D2)} women-equivalents.`, `${D2} দিনে লাগবে ${w1 * D} ÷ ${D2} = ${ex((w1 * D) / D2)} জন মহিলার সমান কর্মী।`),
        T(`${m2} men = ${ex((m2 * w1) / m1)} women, so ${ex((w1 * D) / D2)} − ${ex((m2 * w1) / m1)} = ${women} women must join.`, `${m2} জন পুরুষ = ${ex((m2 * w1) / m1)} জন মহিলা, তাই যোগ দিতে হবে ${ex((w1 * D) / D2)} − ${ex((m2 * w1) / m1)} = ${women} জন মহিলাকে।`),
      ],
      shortcut: T('Count the job in woman-days, then subtract what the men supply.', 'কাজকে মহিলা-দিনে মাপো, তারপর পুরুষেরা যা দেন তা বাদ দাও।'),
    });
  },

  w_wages_share() {
    const variant = pick(['helper', 'three_workers']);
    const W = ri(6, 60) * 100;
    const [x, y] = names(2);
    if (variant === 'helper') {
      const p = two();
      if (!p) return null;
      const { a, b } = p;
      const d = ri(2, Math.floor((a * b) / (a + b)));
      const share = W * (1 - d / a - d / b);
      if (share <= 0 || !clean(share)) return null;
      return q({
        id: 'w_wages_share', variant, kind: 'money', answer: share, given: { a, b, W, d },
        stem: T(`${x.en} can do a job in ${a} days and ${y.en} in ${b} days. They take the job for ₹${W} and, with the help of Raju, finish it in ${d} days. How much should Raju get?`,
          `${x.bn} একটি কাজ ${a} দিনে এবং ${y.bn} ${b} দিনে করতে পারেন। তাঁরা ₹${W}-তে কাজটি নেন এবং রাজুর সাহায্যে ${d} দিনে শেষ করেন। রাজুর কত পাওয়া উচিত?`),
        hints: [
          [W / 3, 'Split the wage equally; wages follow the work done.', 'মজুরি সমান ভাগ করা হয়েছে; মজুরি কাজ অনুযায়ী হয়।'],
          [(W * d) / a, `This is ${x.en}'s share.`, `এটি ${bnOf(x)} ভাগ।`],
          [(W * d) / b, `This is ${y.en}'s share.`, `এটি ${bnOf(y)} ভাগ।`],
        ],
        steps: [
          T(`In ${d} days ${x.en} does ${d}/${a} of the job and ${y.en} ${d}/${b}.`, `${d} দিনে ${x.bn} করেন কাজের ${d}/${a} অংশ, ${y.bn} করেন ${d}/${b} অংশ।`),
          T(`Raju does 1 − ${d}/${a} − ${d}/${b} = ${ex(1 - d / a - d / b)} of the job.`, `রাজু করেন 1 − ${d}/${a} − ${d}/${b} = কাজের ${ex(1 - d / a - d / b)} অংশ।`),
          T(`Raju's share = ${W} × ${ex(1 - d / a - d / b)} = ₹${ex(share)}.`, `রাজুর ভাগ = ${W} × ${ex(1 - d / a - d / b)} = ₹${ex(share)}।`),
        ],
        shortcut: T('Each share = wage × fraction of the job that person did.', 'প্রত্যেকের ভাগ = মজুরি × তাঁর করা কাজের ভগ্নাংশ।'),
      });
    }
    const [a, b, c] = [pick(DAYS), pick(DAYS), pick(DAYS)];
    if (new Set([a, b, c]).size < 3) return null;
    const share = (W * (1 / b)) / (1 / a + 1 / b + 1 / c);
    if (!clean(share)) return null;
    return q({
      id: 'w_wages_share', variant, kind: 'money', answer: share, given: { a, b, c, W },
      stem: T(`${x.en}, ${y.en} and Raju can finish a job alone in ${a}, ${b} and ${c} days respectively. They work together and are paid ₹${W} in all. What is ${y.en}'s share?`,
        `${x.bn}, ${y.bn} ও রাজু একা একটি কাজ যথাক্রমে ${a}, ${b} ও ${c} দিনে শেষ করতে পারেন। তাঁরা একসঙ্গে কাজ করে মোট ₹${W} পান। ${bnOf(y)} ভাগ কত?`),
      hints: [
        [W / 3, 'Split equally; they did different amounts of work.', 'সমান ভাগ করা হয়েছে; তাঁরা আলাদা পরিমাণ কাজ করেছেন।'],
        [(W * b) / (a + b + c), 'Shared in proportion to the days taken alone; it should be the inverse.', 'একা লাগা দিনের অনুপাতে ভাগ করা হয়েছে; হওয়া উচিত বিপরীত অনুপাতে।'],
        [(W * (1 / a)) / (1 / a + 1 / b + 1 / c), `This is ${x.en}'s share.`, `এটি ${bnOf(x)} ভাগ।`],
      ],
      steps: [
        T(`Working together, each does work in proportion to his daily rate: 1/${a} : 1/${b} : 1/${c}.`, `একসঙ্গে কাজ করলে প্রত্যেকের কাজ তাঁর দৈনিক হারের অনুপাতে: 1/${a} : 1/${b} : 1/${c}।`),
        T(`${y.en}'s fraction = (1/${b}) ÷ (1/${a} + 1/${b} + 1/${c}) = ${ex(1 / b / (1 / a + 1 / b + 1 / c))}.`, `${bnOf(y)} অংশ = (1/${b}) ÷ (1/${a} + 1/${b} + 1/${c}) = ${ex(1 / b / (1 / a + 1 / b + 1 / c))}।`),
        T(`Share = ${W} × ${ex(1 / b / (1 / a + 1 / b + 1 / c))} = ₹${ex(share)}.`, `ভাগ = ${W} × ${ex(1 / b / (1 / a + 1 / b + 1 / c))} = ₹${ex(share)}।`),
      ],
      shortcut: T('Wages are in the ratio of efficiencies, i.e. the inverse of the days taken alone.', 'মজুরি দক্ষতার অনুপাতে, অর্থাৎ একা লাগা দিনের বিপরীত অনুপাতে।'),
    });
  },

  w_group_join_midway() {
    const variant = pick(['days_saved', 'find_original_men']);
    const M = ri(6, 40);
    const D = ri(10, 60);
    const k = ri(2, D - 3);
    const X = ri(2, 30);
    const rest = ((D - k) * M) / (M + X);
    const saved = D - k - rest;
    if (!clean(rest) || !clean(saved)) return null;
    if (variant === 'days_saved') {
      return q({
        id: 'w_group_join_midway', variant, kind: 'days', answer: saved, given: { M, D, k, X },
        stem: T(`${M} men can build a wall in ${D} days. After ${dayWord(k).en} of work, ${X} more men join them. How many days earlier than planned is the wall finished?`,
          `${M} জন লোক একটি দেওয়াল ${D} দিনে তৈরি করতে পারেন। ${k} দিন কাজের পর আরও ${X} জন লোক যোগ দেন। পরিকল্পনার চেয়ে কত দিন আগে দেওয়ালটি শেষ হয়?`),
        hints: [
          [(D * X) / (M + X), 'Applied the extra men to the whole job; they only help with the rest.', 'অতিরিক্ত লোকদের পুরো কাজে ধরা হয়েছে; তাঁরা শুধু বাকি কাজে সাহায্য করেন।'],
          [rest, 'This is the number of days after they joined, not the days saved.', 'এটি যোগ দেওয়ার পরের দিনসংখ্যা, বাঁচানো দিন নয়।'],
          [D - (D * M) / (M + X), 'Ignored the days already worked.', 'আগে কাজ করা দিনগুলি বাদ দেওয়া হয়েছে।'],
        ],
        steps: [
          T(`Total work = ${M} × ${D} = ${M * D} man-days; done in ${k} days = ${M * k}.`, `মোট কাজ = ${M} × ${D} = ${M * D} লোক-দিন; ${k} দিনে হয়েছে ${M * k}।`),
          T(`Remaining ${M * (D - k)} man-days with ${M + X} men take ${ex(rest)} days.`, `বাকি ${M * (D - k)} লোক-দিন ${M + X} জনে করতে লাগে ${ex(rest)} দিন।`),
          T(`Finished in ${k} + ${ex(rest)} = ${ex(k + rest)} days, i.e. ${ex(saved)} days early.`, `কাজ শেষ হয় ${k} + ${ex(rest)} = ${ex(k + rest)} দিনে, অর্থাৎ ${ex(saved)} দিন আগে।`),
        ],
        shortcut: T('Days saved = (days left) × X ÷ (M + X).', 'বাঁচানো দিন = (বাকি দিন) × X ÷ (M + X)।'),
      });
    }
    return q({
      id: 'w_group_join_midway', variant, kind: 'persons', answer: M, given: { D, k, X, saved },
      stem: T(`A group of men undertook to build a wall in ${D} days. After ${dayWord(k).en}, ${X} more men joined, and the wall was finished ${dayWord(saved).en} earlier than planned. How many men were in the group at first?`,
        `একদল লোক ${D} দিনে একটি দেওয়াল তৈরির দায়িত্ব নিলেন। ${k} দিন পরে আরও ${X} জন যোগ দিলেন এবং দেওয়ালটি পরিকল্পনার চেয়ে ${ex(saved)} দিন আগে শেষ হল। শুরুতে দলে কতজন ছিলেন?`),
      hints: [
        [M + X, 'This is the group after the others joined.', 'এটি অন্যরা যোগ দেওয়ার পরের দল।'],
        [(X * D) / saved - X, 'Used the whole planned time instead of the time left when they joined.', 'যোগ দেওয়ার সময় বাকি দিনের বদলে পুরো পরিকল্পিত সময় ধরা হয়েছে।'],
        [Math.round((X * (D - k)) / saved), 'Forgot that the original men kept working.', 'আগের লোকেরাও কাজ চালিয়ে গেছেন, তা ভুলে যাওয়া হয়েছে।'],
      ],
      steps: [
        T(`When the others join, ${D - k} days of planned work remain; it is done in ${ex(D - k - saved)} days.`, `যোগ দেওয়ার সময় পরিকল্পনার ${D - k} দিনের কাজ বাকি; তা শেষ হয় ${ex(D - k - saved)} দিনে।`),
        T(`M × ${D - k} = (M + ${X}) × ${ex(D - k - saved)}.`, `সমীকরণ: M × ${D - k} = (M + ${X}) × ${ex(D - k - saved)}।`),
        T(`M × ${ex(saved)} = ${X} × ${ex(D - k - saved)} ⇒ M = ${M}.`, `সরল করে M × ${ex(saved)} = ${X} × ${ex(D - k - saved)} ⇒ M = ${M}।`),
      ],
      shortcut: T('The remaining man-days are the same whichever group does them.', 'বাকি লোক-দিন যে দলই করুক, একই থাকে।'),
    });
  },

  w_pairwise_rates() {
    const variant = pick(['one_alone', 'all_then_one_leaves']);
    // Build from whole daily work rates (units/day) on a job of W units, so every
    // individual and pair time is exact.
    const W = pick([60, 72, 84, 90, 120, 144, 180, 210, 240, 360]);
    const [ra, rb, rc] = [ri(1, 12), ri(1, 12), ri(1, 12)];
    if (new Set([ra, rb, rc]).size < 3) return null;
    const [a, b, c] = [W / ra, W / rb, W / rc];
    const pair = (u, v) => 1 / (1 / u + 1 / v);
    if (![a, b, c, pair(a, b), pair(b, c), pair(c, a)].every(clean)) return null;
    const [xAB, yBC, zCA] = [pair(a, b), pair(b, c), pair(c, a)].map(cents);
    const [x, y] = names(2);
    const pairs = T(`${x.en} and ${y.en} can do a job in ${ex(xAB)} days, ${y.en} and Raju in ${ex(yBC)} days, and Raju and ${x.en} in ${ex(zCA)} days.`,
      `${x.bn} ও ${y.bn} একটি কাজ ${ex(xAB)} দিনে, ${y.bn} ও রাজু ${ex(yBC)} দিনে এবং রাজু ও ${x.bn} ${ex(zCA)} দিনে করতে পারেন।`);
    if (variant === 'one_alone') {
      return q({
        id: 'w_pairwise_rates', variant, kind: 'days', answer: a, given: { xAB, yBC, zCA },
        stem: T(`${pairs.en} How long would ${x.en} take alone?`, `${pairs.bn} ${x.bn} একা কাজটি কত দিনে করবেন?`),
        hints: [
          [xAB + zCA - yBC, 'Added and subtracted the days instead of the daily rates.', 'দৈনিক হারের বদলে দিন যোগ-বিয়োগ করা হয়েছে।'],
          [2 * xAB, 'Assumed the two partners are equally fast.', 'দুই সঙ্গীকে সমান দ্রুত ধরা হয়েছে।'],
          [b, `This is ${y.en}'s time alone.`, `এটি ${bnOf(y)} একা লাগা সময়।`],
        ],
        steps: [
          T(`Daily rates: 1/${ex(xAB)} + 1/${ex(yBC)} + 1/${ex(zCA)} = 2 × (all three together).`, `দৈনিক হার: 1/${ex(xAB)} + 1/${ex(yBC)} + 1/${ex(zCA)} = 2 × (তিনজন একসঙ্গে)।`),
          T(`All three together do ${ex((1 / a + 1 / b + 1 / c))} of the job a day.`, `তিনজন একসঙ্গে দিনে কাজের ${ex(1 / a + 1 / b + 1 / c)} অংশ করেন।`),
          T(`${x.en} alone = all three − (${y.en} + Raju) = ${ex(1 / a)} per day, i.e. ${a} days.`, `${x.bn} একা = তিনজন − (${y.bn} + রাজু) = দিনে ${ex(1 / a)} অংশ, অর্থাৎ ${a} দিন।`),
        ],
        shortcut: T('Half the sum of the pair rates is the rate of all three; subtract the other pair.', 'জোড়াগুলির হারের যোগফলের অর্ধেক = তিনজনের হার; তা থেকে অন্য জোড়াটি বাদ দাও।'),
      });
    }
    const k = ri(1, 4);
    const all = 1 / a + 1 / b + 1 / c;
    const rest = 1 - k * all;
    const more = rest / (1 / a + 1 / b);
    if (rest <= 0 || !clean(more)) return null;
    return q({
      id: 'w_pairwise_rates', variant, kind: 'days', answer: more, given: { xAB, yBC, zCA, k },
      stem: T(`${pairs.en} All three work together for ${dayWord(k).en}, and then Raju leaves. In how many more days will ${x.en} and ${y.en} finish the job?`,
        `${pairs.bn} তিনজন একসঙ্গে ${k} দিন কাজ করার পর রাজু চলে যান। ${x.bn} ও ${y.bn} আর কত দিনে কাজটি শেষ করবেন?`),
      hints: [
        [xAB - k, 'Subtracted days instead of work.', 'কাজের বদলে দিন বিয়োগ করা হয়েছে।'],
        [rest * xAB * 2, 'Used half the pair’s rate.', 'জোড়ার হারের অর্ধেক ধরা হয়েছে।'],
        [rest / all, 'Kept Raju working.', 'রাজুকেও কাজে রাখা হয়েছে।'],
      ],
      steps: [
        T(`All three together: half of (1/${ex(xAB)} + 1/${ex(yBC)} + 1/${ex(zCA)}) = ${ex(all)} of the job per day.`, `তিনজন একসঙ্গে: (1/${ex(xAB)} + 1/${ex(yBC)} + 1/${ex(zCA)})-এর অর্ধেক = দিনে কাজের ${ex(all)} অংশ।`),
        T(`In ${k} days they do ${ex(k * all)}; ${ex(rest)} of the job is left.`, `${k} দিনে হয় ${ex(k * all)} অংশ; বাকি ${ex(rest)} অংশ।`),
        T(`${x.en} and ${y.en} take ${ex(rest)} × ${ex(xAB)} = ${ex(more)} more days.`, `${x.bn} ও ${y.bn} আরও ${ex(rest)} × ${ex(xAB)} = ${ex(more)} দিন নেবেন।`),
      ],
      shortcut: T('Rate of all three = half the sum of the pair rates.', 'তিনজনের হার = জোড়াগুলির হারের যোগফলের অর্ধেক।'),
    });
  },

  w_efficiency_change() {
    const variant = pick(['slows_down', 'improves']);
    const a = pick(DAYS);
    const k = ri(1, a - 1);
    const p = variant === 'slows_down' ? pick([40, 50, 60, 75, 80]) : pick([20, 25, 50, 60, 100]);
    const total = variant === 'slows_down' ? k + ((a - k) * 100) / p : k + ((a - k) * 100) / (100 + p);
    if (!clean(total)) return null;
    const [x] = names(1);
    const change = variant === 'slows_down'
      ? T(`falls to ${p}% of what it was`, `আগের ${p}%-এ নেমে আসে`)
      : T(`increases by ${p}%`, `${p}% বেড়ে যায়`);
    return q({
      id: 'w_efficiency_change', variant, kind: 'days', answer: total, given: { a, k, p },
      stem: T(`${x.en} can finish a job alone in ${a} days. After working for ${dayWord(k).en}, ${x.en}'s efficiency ${change.en}. In how many days in all is the job finished?`,
        `${x.bn} একা একটি কাজ ${a} দিনে শেষ করতে পারেন। ${k} দিন কাজ করার পর তাঁর দক্ষতা ${change.bn}। মোট কত দিনে কাজটি শেষ হয়?`),
      hints: [
        [a, 'Ignored the change in efficiency.', 'দক্ষতার পরিবর্তন বাদ দেওয়া হয়েছে।'],
        [variant === 'slows_down' ? (a * 100) / p : (a * 100) / (100 + p), 'Applied the new efficiency to the whole job.', 'নতুন দক্ষতা পুরো কাজে প্রয়োগ করা হয়েছে।'],
        [variant === 'slows_down' ? k + ((a - k) * p) / 100 : k + ((a - k) * (100 + p)) / 100, 'Multiplied time by the efficiency; time is inversely proportional to it.', 'সময়কে দক্ষতা দিয়ে গুণ করা হয়েছে; সময় দক্ষতার বিপরীত অনুপাতে।'],
      ],
      steps: [
        T(`In ${k} days ${x.en} does ${k}/${a} of the job; ${a - k}/${a} remains (${a - k} days' work at the old rate).`, `${k} দিনে ${x.bn} করেন কাজের ${k}/${a} অংশ; বাকি ${a - k}/${a} অংশ (পুরনো হারে ${a - k} দিনের কাজ)।`),
        T(`At the new efficiency (${variant === 'slows_down' ? p : 100 + p}% of the old), that takes ${a - k} × 100/${variant === 'slows_down' ? p : 100 + p} = ${ex(total - k)} days.`, `নতুন দক্ষতায় (আগের ${variant === 'slows_down' ? p : 100 + p}%) তাতে লাগে ${a - k} × 100/${variant === 'slows_down' ? p : 100 + p} = ${ex(total - k)} দিন।`),
        T(`Total = ${k} + ${ex(total - k)} = ${ex(total)} days.`, `মোট = ${k} + ${ex(total - k)} = ${ex(total)} দিন।`),
      ],
      shortcut: T('Remaining days at the old rate × 100 ÷ (new efficiency %).', 'পুরনো হারে বাকি দিন × 100 ÷ (নতুন দক্ষতা %)।'),
    });
  },
};

module.exports = { topic: 'time_work', registry, generators: gens };
