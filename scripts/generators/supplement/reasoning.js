'use strict';

/**
 * Seating arrangement puzzles with a guaranteed unique solution.
 *
 * A random line-up is drawn, then clues true for it are added one by one —
 * each only if it rules out more arrangements — until exactly one of the n!
 * possible line-ups fits. The question then asks something the clues fix
 * but do not state directly. Correctness is by brute force, not by hand.
 */

const { shuffle, pick, T, names, build } = require('../common');

/** Bengali possessive: রিমা -> রিমার, অমিত -> অমিতের, বিশ্বজিৎ -> বিশ্বজিতের. */
function poss(bn) {
  if (bn.endsWith('ৎ')) return `${bn.slice(0, -1)}তের`;
  return /[া-ৌঅ-ঔ]$/.test(bn) ? `${bn}র` : `${bn}ের`;
}

const ORD_EN = ['', 'first', 'second', 'third', 'fourth'];
const ORD_BN = ['', 'প্রথম', 'দ্বিতীয়', 'তৃতীয়', 'চতুর্থ'];

function permutations(arr) {
  if (arr.length <= 1) return [arr];
  return arr.flatMap((x, i) => permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((p) => [x, ...p]));
}

/** Clue candidates true for `line` (array of indices into people, left to right, facing north). */
function cluesFor(line, P) {
  const n = line.length;
  const pos = (p) => line.indexOf(p);
  const out = [];
  const nm = (i) => P[i];
  for (let i = 0; i < n; i++) {
    const x = line[i];
    if (i === 0) out.push({ test: (l) => l[0] === x, en: `${nm(x).en} sits at the extreme left end.`, bn: `${nm(x).bn} একেবারে বাঁ প্রান্তে বসে।` });
    if (i === n - 1) out.push({ test: (l) => l[n - 1] === x, en: `${nm(x).en} sits at the extreme right end.`, bn: `${nm(x).bn} একেবারে ডান প্রান্তে বসে।` });
    if (i === 0 || i === n - 1) out.push({ test: (l) => l[0] === x || l[n - 1] === x, en: `${nm(x).en} sits at one of the ends.`, bn: `${nm(x).bn} কোনো এক প্রান্তে বসে।` });
    else out.push({ test: (l) => l[0] !== x && l[n - 1] !== x, en: `${nm(x).en} does not sit at either end.`, bn: `${nm(x).bn} কোনো প্রান্তে বসে না।` });
    if (i > 0 && i < n - 1) {
      const [y, z] = shuffle([line[i - 1], line[i + 1]]);
      out.push({
        test: (l) => Math.abs(l.indexOf(y) - l.indexOf(x)) === 1 && Math.abs(l.indexOf(z) - l.indexOf(x)) === 1,
        en: `${nm(x).en} sits between ${nm(y).en} and ${nm(z).en}.`,
        bn: `${nm(x).bn}, ${nm(y).bn} ও ${poss(nm(z).bn)} মাঝখানে বসে।`,
      });
    }
  }
  for (let a = 0; a < n; a++) {
    for (let b = 0; b < n; b++) {
      if (a === b) continue;
      const x = line[a];
      const y = line[b];
      const k = a - b; // x is k places to the right of y when k > 0
      if (k === 1) out.push({ test: (l) => l.indexOf(x) - l.indexOf(y) === 1, en: `${nm(x).en} sits immediately to the right of ${nm(y).en}.`, bn: `${nm(x).bn}, ${poss(nm(y).bn)} ঠিক ডান দিকে বসে।` });
      if (k === -1) out.push({ test: (l) => l.indexOf(x) - l.indexOf(y) === -1, en: `${nm(x).en} sits immediately to the left of ${nm(y).en}.`, bn: `${nm(x).bn}, ${poss(nm(y).bn)} ঠিক বাঁ দিকে বসে।` });
      if (k >= 2 && k <= 3) out.push({ test: (l) => l.indexOf(x) - l.indexOf(y) === k, en: `${nm(x).en} sits ${ORD_EN[k]} to the right of ${nm(y).en}.`, bn: `${nm(x).bn}, ${poss(nm(y).bn)} ডান দিকে ${ORD_BN[k]} স্থানে বসে।` });
      if (a < b && b - a >= 2) {
        const gap = b - a - 1;
        out.push({ test: (l) => Math.abs(l.indexOf(x) - l.indexOf(y)) - 1 === gap, en: `Exactly ${gap} ${gap === 1 ? 'person sits' : 'people sit'} between ${nm(x).en} and ${nm(y).en}.`, bn: `${nm(x).bn} ও ${poss(nm(y).bn)} মাঝে ঠিক ${gap} জন বসে।` });
      }
    }
  }
  return out;
}

/** Questions whose answer the clues fix. answer(l) must return an index into P (or a number for 'count'). */
function questionsFor(n, P) {
  const qs = [
    { key: 'leftEnd', en: 'Who sits at the extreme left end?', bn: 'একেবারে বাঁ প্রান্তে কে বসে?', answer: (l) => l[0] },
    { key: 'rightEnd', en: 'Who sits at the extreme right end?', bn: 'একেবারে ডান প্রান্তে কে বসে?', answer: (l) => l[n - 1] },
    { key: 'secondRight', en: 'Who sits second from the right end?', bn: 'ডান প্রান্ত থেকে দ্বিতীয় স্থানে কে বসে?', answer: (l) => l[n - 2] },
    { key: 'secondLeft', en: 'Who sits second from the left end?', bn: 'বাঁ প্রান্ত থেকে দ্বিতীয় স্থানে কে বসে?', answer: (l) => l[1] },
  ];
  if (n % 2 === 1) qs.push({ key: 'middle', en: 'Who sits exactly in the middle?', bn: 'ঠিক মাঝখানে কে বসে?', answer: (l) => l[(n - 1) / 2] });
  for (let x = 0; x < n; x++) {
    qs.push({ key: `rightOf${x}`, en: `Who sits immediately to the right of ${P[x].en}?`, bn: `${poss(P[x].bn)} ঠিক ডান দিকে কে বসে?`, answer: (l) => l[l.indexOf(x) + 1] });
  }
  return qs;
}

function seating(n) {
  return function seatingPuzzle() {
    const P = names(n);
    const all = permutations([...Array(n).keys()]);
    const line = pick(all);
    let candidates = all;
    const used = [];
    for (const c of shuffle(cluesFor(line, P))) {
      const next = candidates.filter(c.test);
      if (next.length < candidates.length) {
        candidates = next;
        used.push(c);
      }
      if (candidates.length === 1) break;
    }
    if (candidates.length !== 1 || used.length > n + 1) return null;

    // Ask something not stated outright by a clue.
    const stated = used.map((c) => c.en).join(' ');
    const q = shuffle(questionsFor(n, P)).find((qq) => {
      const ans = qq.answer(line);
      if (ans === undefined) return false;
      if (qq.key === 'leftEnd' && stated.includes(`${P[ans].en} sits at the extreme left end`)) return false;
      if (qq.key === 'rightEnd' && stated.includes(`${P[ans].en} sits at the extreme right end`)) return false;
      if (qq.key.startsWith('rightOf') && stated.includes(`${P[ans].en} sits immediately to the right`)) return false;
      return true;
    });
    if (!q) return null;
    const ans = q.answer(line);
    const wrong = shuffle([...Array(n).keys()].filter((i) => i !== ans)).slice(0, 3).map((i) => ({ en: P[i].en, bn: P[i].bn }));

    const nameList = (lang) => P.map((p) => p[lang]);
    const listEn = `${nameList('en').slice(0, -1).join(', ')} and ${P[n - 1].en}`;
    const listBn = `${nameList('bn').slice(0, -1).join(', ')} ও ${P[n - 1].bn}`;
    const order = (lang) => line.map((i) => P[i][lang]).join(' — ');
    const countEn = ['', '', '', 'Three', 'Four', 'Five', 'Six'][n];
    const countBn = ['', '', '', 'তিনজন', 'চারজন', 'পাঁচজন', 'ছয়জন'][n];

    return build({
      topic: 'seating_arrangement',
      subtopic: 'linear_row',
      tags: ['seating_arrangement', 'puzzle'],
      difficulty: n >= 6 ? 4 : 3,
      time: n >= 6 ? 120 : 90,
      stem: T(
        `${countEn} friends — ${listEn} — sit in a row facing north.\n\n${used.map((c, i) => `${i + 1}. ${c.en}`).join('\n')}\n\n${q.en}`,
        `${countBn} বন্ধু — ${listBn} — উত্তর দিকে মুখ করে এক সারিতে বসে আছে।\n\n${used.map((c, i) => `${i + 1}. ${c.bn}`).join('\n')}\n\n${q.bn}`,
      ),
      correct: { en: P[ans].en, bn: P[ans].bn },
      wrong,
      steps: [
        T('Facing north, their left and right are the same as yours. Place the fixed positions first, then the relative clues.', 'উত্তরমুখী হলে তাদের বাঁ-ডান আর তোমার বাঁ-ডান একই। আগে নির্দিষ্ট অবস্থানগুলো বসাও, তারপর আপেক্ষিক সূত্রগুলো।'),
        T(`Only one arrangement fits every clue (left to right): ${order('en')}.`, `সব সূত্র মেনে একটিমাত্র বিন্যাস সম্ভব (বাঁ থেকে ডানে): ${order('bn')}।`),
        T(`So the answer is ${P[ans].en}.`, `অতএব উত্তর: ${P[ans].bn}।`),
      ],
    });
  };
}

module.exports = {
  subject: 'reasoning',
  topics: [{ topic: 'seating_arrangement', weight: 1, gens: [seating(5), seating(5), seating(6)] }],
  // exported for tests
  _internal: { poss, permutations, cluesFor },
};
