'use strict';

/**
 * Shared machinery for the Hard question banks (one generator per chapter in
 * this folder; pattern matrices in db/patterns/quant/hard/).
 *
 * A generator returns a question plus `_audit`: the answer, its kind, the numbers
 * shown to the student (`given`) and the framing (`variant`). Tests feed `given`
 * to an independent solver (./solvers) and require the same answer, so a wrong
 * formula in a generator cannot reach students unnoticed.
 */

const { seed, shuffle, build, r2, n2 } = require('../common');
const { questionDuplicateKeys } = require('../../../src/utils/questionDuplicateKeys');

const T = (en, bn) => ({ en, bn });
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));

/** Display formats, by kind. The same function formats generator and solver answers. */
const KINDS = {
  number: (v) => T(n2(v), n2(v)),
  money: (v) => T(`₹${n2(v)}`, `₹${n2(v)}`),
  percent: (v) => T(`${n2(v)}%`, `${n2(v)}%`),
  // Signed change: +12.5% -> "12.5% increase"
  change: (v) => (v >= 0 ? T(`${n2(v)}% increase`, `${n2(v)}% বৃদ্ধি`) : T(`${n2(-v)}% decrease`, `${n2(-v)}% হ্রাস`)),
  // Signed comparison: +8 -> "8% more", -8 -> "8% less"
  moreLess: (v) => (v >= 0 ? T(`${n2(v)}% more`, `${n2(v)}% বেশি`) : T(`${n2(-v)}% less`, `${n2(-v)}% কম`)),
  days: (v) => T(`${n2(v)} day${v === 1 ? '' : 's'}`, `${n2(v)} দিন`),
  years: (v) => T(`${n2(v)} year${v === 1 ? '' : 's'}`, `${n2(v)} বছর`),
  hours: (v) => T(`${n2(v)} hour${v === 1 ? '' : 's'}`, `${n2(v)} ঘণ্টা`),
  kmph: (v) => T(`${n2(v)} km/h`, `${n2(v)} কিমি/ঘণ্টা`),
  litres: (v) => T(`${n2(v)} litre${v === 1 ? '' : 's'}`, `${n2(v)} লিটার`),
  marks: (v) => T(`${n2(v)} marks`, `${n2(v)} নম্বর`),
  votes: (v) => T(`${n2(v)}`, `${n2(v)}`),
  persons: (v) => T(`${n2(v)}`, `${n2(v)}`),
  kg: (v) => T(`${n2(v)} kg`, `${n2(v)} কেজি`),
  // [a, b] (or [a, b, c]) -> "3 : 4", always in lowest terms
  ratio: (v) => {
    const g = v.reduce((x, y) => gcd(x, y));
    const s = v.map((x) => x / g).join(' : ');
    return T(s, s);
  },
};

/**
 * Bengali possessive of a name: -র after a vowel (প্রিয়া → প্রিয়ার), -এর after a
 * consonant (রাহুল → রাহুলের), and ৎ → তের (বিশ্বজিৎ → বিশ্বজিতের).
 */
function bnOf(name) {
  const bn = typeof name === 'string' ? name : name.bn;
  if (bn.endsWith('ৎ')) return `${bn.slice(0, -1)}তের`;
  return /[অ-ঔা-ৌ]$/u.test(bn) ? `${bn}র` : `${bn}ের`;
}

const sameValue = (kind, a, b) =>
  kind === 'ratio' ? KINDS.ratio(a).en === KINDS.ratio(b).en : Math.abs(r2(a) - r2(b)) < 1e-9;

/**
 * Four options: the answer, up to three distractors from real mistakes (each with
 * a trap note), then nearby values. Returns null when they cannot be made distinct.
 */
// Answers that can only be whole numbers (people, votes, coins).
const COUNT_KINDS = new Set(['persons', 'votes']);
/** A round step near 10% of the answer: 0.25, 0.5, 1, 2, 2.5, 5, 10, 20, 25, 50, ... */
function niceStep(answer, minimum) {
  const target = Math.max(minimum, Math.abs(answer) * 0.1);
  const steps = [0.25, 0.5];
  for (let p = 1; p <= 1e7; p *= 10) steps.push(p, 2 * p, 2.5 * p, 5 * p);
  return steps.filter((s) => s >= minimum && s <= target).pop() ?? minimum;
}

function makeOptions(kind, answer, hints = []) {
  const fmt = KINDS[kind];
  const used = new Set([fmt(answer).en]);
  const wrong = [];
  // A distractor must look like a possible answer: a whole number when the answer is one
  // (or when the quantity is a count), otherwise exact to two decimals. "46.67 coins" or
  // "7.51%" beside "6.25%" would give the answer away.
  const wholeOnly = kind !== 'ratio' && (COUNT_KINDS.has(kind) || Number.isInteger(r2(answer)));
  const add = (value, trap) => {
    if (wrong.length === 3) return;
    if (kind !== 'ratio') {
      if (!Number.isFinite(value) || r2(value) === 0) return;
      if (kind !== 'change' && kind !== 'moreLess' && value < 0) return;
      if (wholeOnly ? !Number.isInteger(r2(value)) : !clean(value)) return;
    } else if (!Array.isArray(value) || value.some((x) => !Number.isInteger(x) || x <= 0)) return;
    const text = fmt(kind === 'ratio' ? value : r2(value));
    if (used.has(text.en)) return;
    used.add(text.en);
    wrong.push({ ...text, ...(trap && { trap }) });
  };
  for (const [value, en, bn] of hints) add(value, en ? T(en, bn) : undefined);
  if (kind === 'ratio') {
    const g = answer.reduce((x, y) => gcd(x, y));
    const base = answer.map((x) => x / g);
    const near = [[...base].reverse(), [base[1], base[0], ...base.slice(2)]];
    base.forEach((_, i) => {
      near.push(base.map((x, j) => (j === i ? x + 1 : x)));
      if (base[i] > 1) near.push(base.map((x, j) => (j === i ? x - 1 : x)));
    });
    for (const v of shuffle(near)) add(v);
  } else {
    // Round, uneven offsets, so the answer is not simply the middle of evenly spaced options.
    const step = niceStep(answer, wholeOnly ? 1 : 0.25);
    for (const k of shuffle([1, -1, 2, -2, 3, 4])) add(answer + k * step);
    for (let k = 5; wrong.length < 3 && k < 60; k++) add(answer + k * step);
  }
  if (wrong.length !== 3) return null;
  return { correct: fmt(answer), wrong };
}

/**
 * Builds one validated question, or null (the caller retries with new numbers).
 * spec: { id, variant, kind, answer, hints, stem, steps, shortcut, given, time }
 */
function makeQuestionFactory(topic, registry) {
  const byId = new Map(registry.map((p) => [p.id, p]));
  return function makeQuestion(spec) {
    const pattern = byId.get(spec.id);
    if (!pattern) throw new Error(`${topic}: unknown pattern ${spec.id}`);
    if (!pattern.variants.includes(spec.variant)) throw new Error(`${topic}.${spec.id}: unknown variant ${spec.variant}`);
    if (!KINDS[spec.kind]) throw new Error(`${topic}.${spec.id}: unknown answer kind ${spec.kind}`);
    if (spec.kind !== 'ratio' && !Number.isFinite(spec.answer)) return null;
    const options = makeOptions(spec.kind, spec.answer, spec.hints);
    if (!options) return null;
    const question = build({
      topic,
      subtopic: spec.id,
      pattern: spec.id,
      tags: pattern.concepts,
      difficulty: pattern.difficulty,
      time: spec.time ?? 60 + 15 * (pattern.difficulty - 3),
      stem: spec.stem,
      ...options,
      steps: spec.steps,
      shortcut: spec.shortcut,
    });
    if (!question) return null;
    const answerText = KINDS[spec.kind](spec.answer).en;
    const correct = question.options.filter((o) => o.oid === question.correct_option_id);
    if (correct.length !== 1 || correct[0].text.en !== answerText) return null;
    const [fingerprint] = questionDuplicateKeys({ en: question.stem.en });
    return {
      ...question,
      pattern_variant: `${spec.id}.${spec.variant}`,
      fingerprint,
      _audit: { answer: spec.answer, kind: spec.kind, answerText, given: spec.given, variant: spec.variant },
    };
  };
}

/**
 * A number exactly as a student would write it in a solution: a terminating decimal of up
 * to 6 places (0.825, 1.125, 0.004864), otherwise a fraction (1/90, 7/3). Steps must never
 * show a rounded value that breaks the arithmetic (writing 0.83 for 0.825). Throws
 * rather than round when no small fraction fits, so a bad step fails the tests.
 */
function ex(x) {
  if (typeof x === 'string') return x;
  if (!Number.isFinite(x)) throw new Error(`ex: not a number (${x})`);
  for (const scale of [1e4, 1e6]) {
    const r = Math.round(x * scale) / scale;
    if (Math.abs(x - r) < 1e-12 * Math.max(1, Math.abs(x)) + 1e-12) return String(Object.is(r, -0) ? 0 : r);
  }
  for (let q = 2; q <= 10_000; q++) {
    const p = Math.round(x * q);
    if (Math.abs(p / q - x) < 1e-9) return `${p}/${q}`;
  }
  throw new Error(`ex: ${x} has no exact short form`);
}

/** English ordinal: 1st, 2nd, 3rd, 4th, 11th, 21st ... */
const ord = (n) => `${n}${[11, 12, 13].includes(n % 100) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' })[n % 10] || 'th'}`;

/** Rounded to paise/cents, so float noise (13225.000000000002) does not hide a whole number. */
const cents = (x) => Math.round(x * 100) / 100;

/** True when x has at most two decimal places (answers must display exactly). */
const clean = (x) => Number.isFinite(x) && Math.abs(x * 100 - Math.round(x * 100)) < 1e-7;

const BENGALI = /[ঀ-৿]/u;

/** Every rule a published Hard question must meet. Returns a list of problems. */
function validateQuestion(question) {
  const errors = [];
  if (!question?.stem?.en || !question?.stem?.bn) errors.push('English and Bengali stems are required');
  if (!BENGALI.test(question?.stem?.bn || '')) errors.push('Bengali stem must contain Bengali script');
  if (question?.options?.length !== 4) errors.push('exactly four options are required');
  const en = question?.options?.map((o) => o.text.en) || [];
  const bn = question?.options?.map((o) => o.text.bn) || [];
  if (new Set(en).size !== 4 || new Set(bn).size !== 4) errors.push('options must be distinct in both languages');
  if (question && question.options.filter((o) => o.oid === question.correct_option_id).length !== 1) errors.push('the answer must map to exactly one option');
  const steps = question?.solution?.steps || [];
  if (steps.length < 3) errors.push('at least three solution steps are required');
  if (steps.some((s) => !s.en || !s.bn || !BENGALI.test(s.bn))) errors.push('every step needs a Bengali translation');
  if (!question?.solution?.shortcut?.en || !BENGALI.test(question?.solution?.shortcut?.bn || '')) errors.push('a bilingual shortcut is required');
  if (![3, 4, 5].includes(question?.difficulty)) errors.push('Hard questions are difficulty 3-5');
  if (/NaN|undefined|Infinity|\[object/.test(JSON.stringify({ s: question?.stem, o: question?.options, x: question?.solution }))) errors.push('text contains NaN/undefined');
  return errors;
}

/**
 * `count` unique questions, round-robin over the registry so every pattern is
 * covered. `generators[id]()` returns a question or null.
 */
function generateBank(topic, registry, generators, count, { seed: seedValue = 20261029, knownFingerprints = [] } = {}) {
  if (!Number.isInteger(count) || count < 1) throw new TypeError('count must be a positive integer');
  for (const p of registry) if (typeof generators[p.id] !== 'function') throw new Error(`${topic}: no generator for ${p.id}`);
  seed(seedValue);
  const known = new Set(knownFingerprints);
  const out = [];
  // Each turn retries one pattern until it yields a new question, so patterns whose
  // numbers are often rejected (inexact answers) still get their fair share.
  const order = [...registry];
  const shapeCount = new Map();
  let turn = 0;
  while (out.length < count && order.length) {
    const pattern = order[turn % order.length];
    turn += 1;
    // Keep the framings of a pattern balanced: for most tries, accept a framing only if
    // it is not already ahead of the pattern's least-used framing.
    const used = (shape) => shapeCount.get(shape) || 0;
    const least = Math.min(...pattern.variants.map((v) => used(`${pattern.id}.${v}`)));
    let question = null;
    for (let tries = 0; tries < 400 && !question; tries++) {
      const candidate = generators[pattern.id]();
      if (!candidate || known.has(candidate.fingerprint)) continue;
      if (tries < 300 && used(candidate.pattern_variant) > least) continue;
      question = candidate;
    }
    if (!question) {
      order.splice(order.indexOf(pattern), 1); // no new questions left in this pattern
      continue;
    }
    const errors = validateQuestion(question);
    if (errors.length) throw new Error(`${topic}.${pattern.id}: ${errors.join('; ')}`);
    known.add(question.fingerprint);
    shapeCount.set(question.pattern_variant, (shapeCount.get(question.pattern_variant) || 0) + 1);
    out.push(question);
  }
  if (out.length !== count) throw new Error(`${topic}: generated only ${out.length}/${count} unique Hard questions`);
  return out;
}

module.exports = { T, gcd, clean, cents, ex, ord, bnOf, KINDS, sameValue, makeOptions, makeQuestionFactory, validateQuestion, generateBank };
