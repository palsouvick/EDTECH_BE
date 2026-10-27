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
 * easier difficulty, so every level always has a quiz.
 *
 * Repeat attempts get different questions: the client sends the ids it has
 * already seen and the draw skips them. Once a level runs out of unseen
 * questions the draw starts over (`restarted: true`).
 */

const mongoose = require('mongoose');
const { Question } = require('../models');
const { langSetsContaining } = require('../models/schemas/localized');
const catalog = require('../../db/seed/catalog');
const { loadLessons } = require('../../db/lessons');
const AppError = require('../utils/AppError');
const { gradeAnswers } = require('./grading');
const { PUBLIC_QUESTION_FIELDS, presentQuestion } = require('./presenters');
const { registry: PROFIT_LOSS_PATTERNS } = require('../../db/patterns/quant/profit_loss');

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
const COUNTS_TTL_MS = 5 * 60_000;
const PROFIT_LOSS_HARD_MIX = Object.freeze({ 3: 2, 4: 5, 5: 3 });
const PROFIT_LOSS_PATTERN_IDS = PROFIT_LOSS_PATTERNS.map((pattern) => pattern.id);

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

// { "quant.percentage": { 1: 40, 2: 44, 3: 17 } }, cached briefly: it backs every chapter list.
let countsCache = { at: 0, data: null };
async function difficultyCounts() {
  if (countsCache.data && Date.now() - countsCache.at < COUNTS_TTL_MS) return countsCache.data;
  const rows = await Question.aggregate([
    { $match: { status: 'PUBLISHED', subject: { $in: SUBJECTS.map((s) => s.code) }, lang_set: { $in: BILINGUAL_SETS } } },
    { $group: { _id: { s: '$subject', t: '$topic', d: '$difficulty' }, n: { $sum: 1 } } },
  ]);
  const data = {};
  for (const { _id, n } of rows) ((data[`${_id.s}.${_id.t}`] ||= {})[_id.d] = n);
  countsCache = { at: Date.now(), data };
  return data;
}

function clearLearnCache() {
  countsCache = { at: 0, data: null };
}

/** Difficulties that make up each level's pool for one chapter, and the pool size. */
function levelPools(counts = {}, { subject, topic } = {}) {
  const sum = (ds) => ds.reduce((a, d) => a + (counts[d] || 0), 0);
  return LEVELS.map(({ level, difficulties, borrow, timed }) => {
    const isProfitLossHard = subject === 'quant' && topic === 'profit_loss' && level === 'advanced';
    const ds = isProfitLossHard ? [3, 4, 5] : sum(difficulties) < MIN_POOL ? [...borrow, ...difficulties] : difficulties;
    const count = sum(ds);
    return {
      level,
      difficulties: ds,
      count,
      timed,
      questionCount: Math.min(QUIZ_SIZE, count),
      timeLimitSec: timed ? Math.min(QUIZ_SIZE, count) * SECONDS_PER_ADVANCED_QUESTION : null,
    };
  });
}

const publicLevels = (pools) => pools.map(({ difficulties, ...rest }) => rest);

async function listSubjects() {
  const counts = await difficultyCounts();
  return {
    subjects: SUBJECTS.map((s) => ({
      ...s,
      chapterCount: SUBJECT_TOPICS[s.code].length,
      questionCount: SUBJECT_TOPICS[s.code].reduce((a, t) => a + Object.values(counts[`${s.code}.${t}`] || {}).reduce((x, y) => x + y, 0), 0),
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

function selectHardProfitLoss(candidates, recentPatterns = []) {
  const recent = new Map(recentPatterns.map((pattern, index) => [pattern, index]));
  const fingerprintOf = (question) => question.duplicate_keys?.[0] ?? question.fingerprint ?? String(question._id);
  const unique = new Map();
  for (const question of candidates) {
    if (!PROFIT_LOSS_PATTERN_IDS.includes(question.pattern)) continue;
    const fingerprint = fingerprintOf(question);
    if (!unique.has(fingerprint)) unique.set(fingerprint, question);
  }

  const selected = [];
  const selectedFingerprints = new Set();
  const perPattern = new Map();
  for (const [difficulty, quota] of Object.entries(PROFIT_LOSS_HARD_MIX)) {
    const byPattern = new Map();
    for (const question of unique.values()) {
      if (question.difficulty !== Number(difficulty)) continue;
      if (!byPattern.has(question.pattern)) byPattern.set(question.pattern, []);
      byPattern.get(question.pattern).push(question);
    }
    const groups = [...byPattern.entries()].sort(([a], [b]) => {
      const recentA = recent.has(a) ? recent.get(a) : -1;
      const recentB = recent.has(b) ? recent.get(b) : -1;
      return recentA - recentB || a.localeCompare(b);
    });
    for (const [, questions] of groups) {
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }
    }

    let remaining = quota;
    while (remaining > 0) {
      let added = 0;
      for (const [pattern, questions] of groups) {
        if (remaining === 0) break;
        if ((perPattern.get(pattern) || 0) >= 2) continue;
        const next = questions.find((question) => !selectedFingerprints.has(fingerprintOf(question)));
        if (!next) continue;
        selected.push(next);
        selectedFingerprints.add(fingerprintOf(next));
        perPattern.set(pattern, (perPattern.get(pattern) || 0) + 1);
        remaining -= 1;
        added += 1;
      }
      if (!added) break;
    }
  }

  const distinctPatterns = new Set(selected.map((question) => question.pattern));
  if (
    selected.length !== QUIZ_SIZE ||
    distinctPatterns.size < 7 ||
    [...perPattern.values()].some((count) => count > 2) ||
    Object.entries(PROFIT_LOSS_HARD_MIX).some(([difficulty, quota]) =>
      selected.filter((question) => question.difficulty === Number(difficulty)).length !== quota)
  ) return [];
  return selected;
}

async function profitLossHardCandidates(match, excludedIds = [], excludedFingerprints = []) {
  return Question.find({
    ...match,
    difficulty: { $in: Object.keys(PROFIT_LOSS_HARD_MIX).map(Number) },
    pattern: { $in: PROFIT_LOSS_PATTERN_IDS },
    ...(excludedIds.length && { _id: { $nin: excludedIds } }),
    ...(excludedFingerprints.length && { duplicate_keys: { $nin: excludedFingerprints } }),
  }).select(PUBLIC_QUESTION_FIELDS).lean();
}

async function createQuiz({ subject, topic, level, exclude = [], excludeFingerprints = [], recentPatterns = [] }) {
  topicOr404(subject, topic);
  const pool = levelPools((await difficultyCounts())[`${subject}.${topic}`], { subject, topic }).find((p) => p.level === level);
  if (!pool.count) throw AppError.unprocessable('NO_QUESTIONS', 'This level has no questions yet');

  const match = { ...baseFilter(subject, topic), difficulty: { $in: pool.difficulties } };
  const seen = exclude.map((id) => new mongoose.Types.ObjectId(id));
  const isProfitLossHard = subject === 'quant' && topic === 'profit_loss' && level === 'advanced';
  let selected;
  let restarted = false;
  if (isProfitLossHard) {
    const freshCandidates = await profitLossHardCandidates(match, seen, excludeFingerprints);
    selected = selectHardProfitLoss(freshCandidates, recentPatterns);
    if (!selected.length) {
      restarted = true;
      const allCandidates = await profitLossHardCandidates(match);
      selected = selectHardProfitLoss(allCandidates, recentPatterns);
    }
    if (!selected.length) {
      throw AppError.unprocessable('HARD_POOL_NOT_READY', 'Profit & Loss Hard requires 10 validated questions across at least 7 patterns; the hard bank is not ready yet');
    }
  } else {
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
    restarted,
    questions,
  };
}

/** Marks a finished quiz and returns every question's answer and explanation. */
async function checkQuiz({ subject, topic, answers }, userId) {
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
  selectHardProfitLoss,
  clearLearnCache,
};
