'use strict';

/** Seeded PRNG + helpers shared by all generators. Same --seed => same dataset. */

let state = 1;
function seed(s) {
  state = (Number(s) >>> 0) || 1;
}
function rand() {
  // mulberry32
  state = (state + 0x6d2b79f5) >>> 0;
  let t = state;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const ri = (a, b) => a + Math.floor(rand() * (b - a + 1));
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
function shuffle(arr) {
  const x = arr.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}
const sample = (arr, n) => shuffle(arr).slice(0, n);
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const r2 = (x) => Math.round(x * 100) / 100;
const n2 = (x) => String(r2(x));
const T = (en, bn) => ({ en, bn });
const same = (s) => ({ en: s, bn: s });

const NAMES_M = [
  ['Rahul', 'রাহুল'], ['Amit', 'অমিত'], ['Sourav', 'সৌরভ'], ['Arjun', 'অর্জুন'],
  ['Debashis', 'দেবাশিস'], ['Rajesh', 'রাজেশ'], ['Sandip', 'সন্দীপ'], ['Subhash', 'সুভাষ'],
  ['Tapan', 'তপন'], ['Anirban', 'অনির্বাণ'], ['Biswajit', 'বিশ্বজিৎ'], ['Kaushik', 'কৌশিক'],
].map(([en, bn]) => T(en, bn));
const NAMES_F = [
  ['Priya', 'প্রিয়া'], ['Anita', 'অনিতা'], ['Sneha', 'স্নেহা'], ['Rina', 'রীনা'],
  ['Mita', 'মিতা'], ['Puja', 'পূজা'], ['Kavita', 'কবিতা'], ['Swati', 'স্বাতী'],
  ['Moumita', 'মৌমিতা'], ['Rima', 'রিমা'], ['Sunita', 'সুনীতা'], ['Tanushree', 'তনুশ্রী'],
].map(([en, bn]) => T(en, bn));
const NAMES_ALL = [...NAMES_M, ...NAMES_F];

/** Pick n distinct names (objects with en/bn). */
const names = (n, pool = NAMES_ALL) => sample(pool, n);

const newOid = () => `opt_${((rand() * 0x100000000) >>> 0).toString(16).padStart(8, '0')}`;

/**
 * Assemble a question body (everything except code/exam_targets/pyq/subject).
 * correct / wrong[i] are { en, bn } (wrong[i].trap optional { en, bn } note).
 * Returns null when options collide, so callers can simply retry.
 */
function build({ topic, subtopic, tags = [], difficulty, time = 60, stem, correct, wrong, steps, shortcut, traps = [] }) {
  if (wrong.length < 2 || wrong.length > 3) return null;
  const all = [correct, ...wrong];
  const enSet = new Set(all.map((o) => o.en));
  if (enSet.size !== all.length || all.some((o) => !o.en || !o.bn)) return null;

  const options = [];
  const oidBySrc = new Map();
  const used = new Set();
  for (const src of shuffle(all)) {
    let oid = newOid();
    while (used.has(oid)) oid = newOid();
    used.add(oid);
    oidBySrc.set(src, oid);
    options.push({ oid, text: { en: src.en, bn: src.bn } });
  }

  const trapDocs = wrong
    .filter((w) => w.trap)
    .map((w) => ({ option_id: oidBySrc.get(w), note: { en: w.trap.en, bn: w.trap.bn } }));
  for (const t of traps) trapDocs.push({ note: t });

  return {
    topic,
    subtopic,
    concept_tags: tags,
    difficulty,
    expected_time_sec: time,
    stem: { en: stem.en, bn: stem.bn },
    options,
    correct_option_id: oidBySrc.get(correct),
    solution: {
      steps: steps.map((s) => ({ en: s.en, bn: s.bn })),
      shortcut: shortcut ? { en: shortcut.en, bn: shortcut.bn } : undefined,
      traps: trapDocs,
    },
  };
}

/**
 * Numeric options. hints = [[value, noteEn, noteBn], ...] are plausible wrong
 * answers from common mistakes; they become trap notes. f(v) -> { en, bn }.
 */
function numOptions(ans, f, hints = [], { neg = false } = {}) {
  const seen = new Set([r2(ans)]);
  const wrong = [];
  const add = (v, trap) => {
    v = r2(v);
    if (!Number.isFinite(v) || seen.has(v)) return;
    if (neg ? v === 0 : v <= 0) return;
    seen.add(v);
    wrong.push({ ...f(v), trap });
  };
  for (const [v, en, bn] of hints.slice(0, 2)) add(v, { en, bn });
  const base = Math.max(1, Math.abs(ans));
  const step = Number.isInteger(ans) ? Math.max(1, Math.round(base * 0.1)) : Math.max(0.5, r2(base * 0.1));
  const cands = shuffle([ans + step, ans - step, ans + 2 * step, ans - 2 * step, ans + 3 * step, ans - 3 * step, ans + 1, ans - 1]);
  for (const c of cands) if (wrong.length < 3) add(c);
  for (let k = 4; wrong.length < 3; k++) add(ans + k * step);
  return { correct: f(r2(ans)), wrong: wrong.slice(0, 3) };
}

/** Text options from pre-made { en, bn } objects; wrong is sampled from `pool`. */
function textOptions(correct, pool, n = 3, key = (o) => o.en) {
  const seen = new Set([key(correct)]);
  const wrong = [];
  for (const o of shuffle(pool)) {
    if (seen.has(key(o))) continue;
    seen.add(key(o));
    wrong.push({ en: o.en, bn: o.bn });
    if (wrong.length === n) break;
  }
  return { correct: { en: correct.en, bn: correct.bn }, wrong };
}

module.exports = {
  seed, rand, ri, pick, shuffle, sample, gcd, r2, n2, T, same,
  NAMES_M, NAMES_F, NAMES_ALL, names, build, numOptions, textOptions,
};
