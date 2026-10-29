'use strict';

/**
 * Learn section: Math and English chapters, each with a lesson
 * (db/lessons, basic -> advanced, English + Bengali) and quizzes at three levels.
 *
 * Quiz levels come from question difficulty (1-5):
 *   beginner      1-2   no timer
 *   intermediate  3     no timer
 *   advanced      4-5   timed
 * A chapter with fewer than MIN_POOL questions at a level borrows the nearest
 * easier difficulty, so every level always has a quiz; the level and the quiz then
 * report `borrowed: true` so the student is told.
 *
 * Chapters with a Hard bank (services/hardBanks.js) are different at Advanced: the
 * quiz comes only from the bank (difficulty 3/4/5 in a 2/5/3 mix, many patterns,
 * see selectHard) and never borrows. Bank questions never appear at lower levels.
 *
 * Repeat attempts get different questions: the client sends the ids it has
 * already seen and the draw skips them. Once a level runs out of unseen
 * questions the draw starts over (`restarted: true`).
 *
 * Every quiz carries a signed `quizToken` listing its question ids. Checking a
 * quiz needs that token and only marks those ids, so the check endpoint cannot
 * be used to look up the answer to an arbitrary question (for example one seen
 * in a mock test).
 */

const mongoose = require('mongoose');
const { Question } = require('../models');
const { langSetsContaining } = require('../models/schemas/localized');
const catalog = require('../../db/seed/catalog');
const { loadLessons } = require('../../db/lessons');
const AppError = require('../utils/AppError');
const { gradeAnswers } = require('./grading');
const { signToken, verifySignedToken } = require('./signedToken');
const { PUBLIC_QUESTION_FIELDS, presentQuestion } = require('./presenters');
const { HARD_AUTHORS, MIX: HARD_MIX, MIN_PATTERNS_PER_QUIZ, MAX_PER_PATTERN, hardBankFor } = require('./hardBanks');

const SUBJECTS = [
  { code: 'quant', title: { en: 'Math', bn: 'গণিত', hi: 'गणित' }, emoji: '🔢' },
  { code: 'english', title: { en: 'English', bn: 'ইংরেজি', hi: 'अंग्रेज़ी' }, emoji: '🔤' },
];
const LEVELS = [
  { level: 'beginner', difficulties: [1, 2], borrow: [], timed: false },
  { level: 'intermediate', difficulties: [3], borrow: [2], timed: false },
  { level: 'advanced', difficulties: [4, 5], borrow: [3], timed: true },
];
const QUIZ_SIZE = 10;
const MIN_POOL = 2 * QUIZ_SIZE;
const SECONDS_PER_ADVANCED_QUESTION = 60;
const QUIZ_TOKEN_PURPOSE = 'learn-quiz';
// Long enough to read every explanation before submitting; a quiz is not resumable after a reload anyway.
const QUIZ_TOKEN_TTL_SEC = 6 * 3600;
const COUNTS_TTL_MS = 5 * 60_000;
const HARD_DIFFICULTIES = Object.keys(HARD_MIX).map(Number);

// Bengali is required: only questions available in both English and Bengali are served.
const BILINGUAL_SETS = langSetsContaining('bn').filter((s) => s.split('_').includes('en'));

// Chapter titles from the catalogue (identical in every exam category).
const TOPIC_TITLES = {};
for (const c of catalog) for (const s of c.subjects) for (const t of s.topics) TOPIC_TITLES[`${s.code}.${t.code}`] ||= t.name;

const SUBJECT_TOPICS = Object.fromEntries(
  SUBJECTS.map(({ code }) => [code, [...new Set(catalog.flatMap((c) => c.subjects.filter((s) => s.code === code).flatMap((s) => s.topics.map((t) => t.code))))]]),
);

let lessonsCache;
function lessons() {
  if (!lessonsCache) lessonsCache = new Map(loadLessons().map(({ lesson }) => [`${lesson.subject}.${lesson.topic}`, lesson]));
  return lessonsCache;
}

function subjectOr404(subject) {
  const s = SUBJECTS.find((x) => x.code === subject);
  if (!s) throw AppError.notFound('SUBJECT_NOT_FOUND', `Unknown subject ${subject}`);
  return s;
}

function topicOr404(subject, topic) {
  subjectOr404(subject);
  if (!SUBJECT_TOPICS[subject].includes(topic)) throw AppError.notFound('CHAPTER_NOT_FOUND', `Unknown chapter ${subject}/${topic}`);
}

const baseFilter = (subject, topic) => ({ status: 'PUBLISHED', subject, topic, lang_set: { $in: BILINGUAL_SETS } });

// { "quant.percentage": { 1: 40, 2: 44, 3: 17, hard: { 3: 54, 4: 90, 5: 56 } } }, cached briefly:
// it backs every chapter list. Hard-bank questions are counted apart; they serve only Advanced.
let countsCache = { at: 0, data: null };
async function difficultyCounts() {
  if (countsCache.data && Date.now() - countsCache.at < COUNTS_TTL_MS) return countsCache.data;
  const rows = await Question.aggregate([
    { $match: { status: 'PUBLISHED', subject: { $in: SUBJECTS.map((s) => s.code) }, lang_set: { $in: BILINGUAL_SETS } } },
    { $group: { _id: { s: '$subject', t: '$topic', d: '$difficulty', h: { $in: ['$authored_by', HARD_AUTHORS] } }, n: { $sum: 1 } } },
  ]);
  const data = {};
  for (const { _id, n } of rows) {
    const chapter = (data[`${_id.s}.${_id.t}`] ||= { hard: {} });
    if (_id.h) (chapter.hard ||= {})[_id.d] = n;
    else chapter[_id.d] = n;
  }
  countsCache = { at: Date.now(), data };
  return data;
}

function clearLearnCache() {
  countsCache = { at: 0, data: null };
}

/**
 * Difficulties that make up each level's pool for one chapter, and the pool size.
 * In a Hard-bank chapter, Advanced counts only bank questions (counts.hard) and never
 * borrows. Elsewhere a thin level borrows the next easier difficulty, and says so
 * (`borrowed`), so the app can tell the student instead of quietly mixing levels.
 */
function levelPools(counts = {}, { subject, topic } = {}) {
  const sum = (ds, from = counts) => ds.reduce((a, d) => a + (from[d] || 0), 0);
  const bank = hardBankFor(subject, topic);
  return LEVELS.map(({ level, difficulties, borrow, timed }) => {
    let ds = difficulties;
    let count;
    let borrowed = false;
    if (bank && level === 'advanced') {
      ds = HARD_DIFFICULTIES;
      count = sum(ds, counts.hard ?? counts);
    } else {
      borrowed = sum(difficulties) < MIN_POOL && borrow.length > 0;
      if (borrowed) ds = [...borrow, ...difficulties];
      count = sum(ds);
    }
    return {
      level,
      difficulties: ds,
      count,
      timed,
      source: bank && level === 'advanced' ? 'hard_bank' : 'general',
      borrowed,
      questionCount: Math.min(QUIZ_SIZE, count),
      timeLimitSec: timed ? Math.min(QUIZ_SIZE, count) * SECONDS_PER_ADVANCED_QUESTION : null,
    };
  });
}

/** Every bilingual question in a chapter, general and Hard bank. */
const chapterTotal = ({ hard = {}, ...general } = {}) =>
  [...Object.values(general), ...Object.values(hard)].reduce((a, n) => a + n, 0);

const publicLevels = (pools) => pools.map(({ difficulties, ...rest }) => rest);

async function listSubjects() {
  const counts = await difficultyCounts();
  return {
    subjects: SUBJECTS.map((s) => ({
      ...s,
      chapterCount: SUBJECT_TOPICS[s.code].length,
      questionCount: SUBJECT_TOPICS[s.code].reduce((a, t) => a + chapterTotal(counts[`${s.code}.${t}`]), 0),
    })),
  };
}

async function getSubject(subject) {
  const s = subjectOr404(subject);
  const counts = await difficultyCounts();
  return {
    subject: s,
    chapters: SUBJECT_TOPICS[subject].map((topic) => {
      const lesson = lessons().get(`${subject}.${topic}`);
      return {
        topic,
        title: lesson?.title ?? TOPIC_TITLES[`${subject}.${topic}`],
        emoji: lesson?.emoji ?? s.emoji,
        intro: lesson?.intro ?? null,
        hasLesson: Boolean(lesson),
        levels: publicLevels(levelPools(counts[`${subject}.${topic}`], { subject, topic })),
      };
    }),
  };
}

async function getChapter(subject, topic) {
  topicOr404(subject, topic);
  const s = subjectOr404(subject);
  const counts = await difficultyCounts();
  const keys = SUBJECT_TOPICS[subject];
  const i = keys.indexOf(topic);
  const neighbour = (t) => (t ? { topic: t, title: lessons().get(`${subject}.${t}`)?.title ?? TOPIC_TITLES[`${subject}.${t}`] } : null);
  return {
    subject: s,
    topic,
    title: TOPIC_TITLES[`${subject}.${topic}`],
    lesson: lessons().get(`${subject}.${topic}`) ?? null,
    levels: publicLevels(levelPools(counts[`${subject}.${topic}`], { subject, topic })),
    previous: neighbour(keys[i - 1]),
    next: neighbour(keys[i + 1]),
  };
}

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function sample(match, size) {
  if (size <= 0) return [];
  const ids = await Question.aggregate([{ $match: match }, { $sample: { size } }, { $project: { _id: 1 } }]);
  if (!ids.length) return [];
  const docs = await Question.find({ _id: { $in: ids.map((d) => d._id) } }).select(PUBLIC_QUESTION_FIELDS).lean();
  return docs;
}

const fingerprintOf = (question) => question.duplicate_keys?.[0] ?? question.fingerprint ?? String(question._id);
const shapeOf = (question) => question.pattern_variant ?? question.pattern;

/**
 * Picks a Hard quiz from bank candidates: the HARD_MIX difficulty split (2/5/3 at
 * difficulty 3/4/5), at most MAX_PER_PATTERN questions per pattern, at least
 * MIN_PATTERNS_PER_QUIZ patterns, no repeated stem, and a second question from a
 * pattern only in a different framing (pattern_variant) when one is available.
 * Patterns seen in recent quizzes (recentPatterns, most recent last) go to the back.
 * Returns [] when those rules cannot all be met.
 */
function selectHard(bank, candidates, recentPatterns = []) {
  const recent = new Map(recentPatterns.map((pattern, index) => [pattern, index]));
  const unique = new Map();
  for (const question of candidates) {
    if (!bank.ids.includes(question.pattern)) continue;
    const fingerprint = fingerprintOf(question);
    if (!unique.has(fingerprint)) unique.set(fingerprint, question);
  }

  const selected = [];
  const selectedFingerprints = new Set();
  const usedShapes = new Set();
  const perPattern = new Map();
  for (const [difficulty, quota] of Object.entries(HARD_MIX)) {
    const byPattern = new Map();
    for (const question of unique.values()) {
      if (question.difficulty !== Number(difficulty)) continue;
      if (!byPattern.has(question.pattern)) byPattern.set(question.pattern, []);
      byPattern.get(question.pattern).push(question);
    }
    const groups = shuffle([...byPattern.entries()]).sort(([a], [b]) => {
      const recentA = recent.has(a) ? recent.get(a) : -1;
      const recentB = recent.has(b) ? recent.get(b) : -1;
      return recentA - recentB;
    });
    for (const group of groups) group[1] = shuffle(group[1]);

    // Round-robin over patterns. A pass first takes only framings not used yet, so a
    // second question from a pattern is a different framing whenever the bank has one.
    let remaining = quota;
    let strict = true;
    while (remaining > 0) {
      let added = 0;
      for (const [pattern, questions] of groups) {
        if (remaining === 0) break;
        if ((perPattern.get(pattern) || 0) >= MAX_PER_PATTERN) continue;
        const fresh = questions.filter((question) => !selectedFingerprints.has(fingerprintOf(question)));
        const next = fresh.find((question) => !usedShapes.has(shapeOf(question))) ?? (strict ? null : fresh[0]);
        if (!next) continue;
        selected.push(next);
        selectedFingerprints.add(fingerprintOf(next));
        usedShapes.add(shapeOf(next));
        perPattern.set(pattern, (perPattern.get(pattern) || 0) + 1);
        remaining -= 1;
        added += 1;
      }
      if (!added) {
        if (!strict) break;
        strict = false; // no unused framing left at this difficulty: allow a repeat framing
      }
    }
  }

  const distinctPatterns = new Set(selected.map((question) => question.pattern));
  if (
    selected.length !== QUIZ_SIZE ||
    distinctPatterns.size < MIN_PATTERNS_PER_QUIZ ||
    [...perPattern.values()].some((count) => count > MAX_PER_PATTERN) ||
    Object.entries(HARD_MIX).some(([difficulty, quota]) =>
      selected.filter((question) => question.difficulty === Number(difficulty)).length !== quota)
  ) return [];
  return selected;
}

/** Kept for existing callers: the Profit & Loss bank through the general selector. */
const selectHardProfitLoss = (candidates, recentPatterns) => selectHard(hardBankFor('quant', 'profit_loss'), candidates, recentPatterns);

async function hardCandidates(bank, match, excludedIds = [], excludedFingerprints = []) {
  return Question.find({
    ...match,
    authored_by: bank.author,
    difficulty: { $in: HARD_DIFFICULTIES },
    pattern: { $in: bank.ids },
    ...(excludedIds.length && { _id: { $nin: excludedIds } }),
    ...(excludedFingerprints.length && { duplicate_keys: { $nin: excludedFingerprints } }),
  }).select(`${PUBLIC_QUESTION_FIELDS} pattern_variant`).lean();
}

async function createQuiz({ subject, topic, level, exclude = [], excludeFingerprints = [], recentPatterns = [] }) {
  topicOr404(subject, topic);
  const pool = levelPools((await difficultyCounts())[`${subject}.${topic}`], { subject, topic }).find((p) => p.level === level);
  if (!pool.count) throw AppError.unprocessable('NO_QUESTIONS', 'This level has no questions yet');

  const seen = exclude.map((id) => new mongoose.Types.ObjectId(id));
  const bank = pool.source === 'hard_bank' ? hardBankFor(subject, topic) : null;
  let selected;
  let restarted = false;
  if (bank) {
    const match = baseFilter(subject, topic);
    selected = selectHard(bank, await hardCandidates(bank, match, seen, excludeFingerprints), recentPatterns);
    if (!selected.length) {
      // Every bank question seen recently: start a new cycle over the whole bank.
      restarted = true;
      selected = selectHard(bank, await hardCandidates(bank, match), recentPatterns);
    }
    if (!selected.length) {
      // Never fall back to easier questions: Advanced here means the Hard bank or nothing.
      throw AppError.unprocessable('HARD_POOL_NOT_READY', 'The Advanced question bank for this chapter is still being prepared. Please try Intermediate for now.');
    }
  } else {
    // General pool; Hard-bank questions are reserved for Advanced in their own chapters.
    const match = { ...baseFilter(subject, topic), difficulty: { $in: pool.difficulties }, authored_by: { $nin: HARD_AUTHORS } };
    const fresh = await sample({ ...match, _id: { $nin: seen } }, QUIZ_SIZE);
    // Every question seen already: start the cycle again, still avoiding repeats within this quiz.
    restarted = fresh.length < Math.min(QUIZ_SIZE, pool.count);
    const refill = restarted ? await sample({ ...match, _id: { $nin: fresh.map((q) => q._id) } }, QUIZ_SIZE - fresh.length) : [];
    selected = [...fresh, ...refill];
  }

  const questions = shuffle(selected).map((q, i) => {
    const p = presentQuestion(q, { index: i + 1 });
    return { ...p, options: shuffle(p.options) };
  });
  return {
    subject,
    topic,
    level,
    timed: pool.timed,
    timeLimitSec: pool.timed ? questions.length * SECONDS_PER_ADVANCED_QUESTION : null,
    source: pool.source,
    // True when this level had too few questions of its own and includes the next easier level.
    borrowed: pool.borrowed,
    restarted,
    quizToken: signToken(QUIZ_TOKEN_PURPOSE, { s: subject, t: topic, q: questions.map((q) => q.questionId) }, QUIZ_TOKEN_TTL_SEC),
    questions,
  };
}

/** Marks a finished quiz and returns every question's answer and explanation. */
async function checkQuiz({ subject, topic, quizToken, answers }, userId) {
  const issued = verifySignedToken(QUIZ_TOKEN_PURPOSE, quizToken);
  if (!issued || issued.s !== subject || issued.t !== topic) {
    throw new AppError(403, 'QUIZ_TOKEN_INVALID', 'This quiz has expired or was not issued by the server. Start a new quiz.');
  }
  const allowed = new Set(issued.q);
  if (answers.some((a) => !allowed.has(a.questionId))) {
    throw new AppError(403, 'QUESTION_NOT_IN_QUIZ', 'Answers include questions that are not part of this quiz');
  }
  const { results, score } = await gradeAnswers(answers, { userId, source: 'learn' });
  return { subject, topic, results, score };
}

module.exports = {
  SUBJECTS,
  QUIZ_SIZE,
  listSubjects,
  getSubject,
  getChapter,
  createQuiz,
  checkQuiz,
  levelPools,
  selectHard,
  selectHardProfitLoss,
  clearLearnCache,
};
