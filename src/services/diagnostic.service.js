'use strict';

/**
 * F7 — "Find My Starting Level": an optional, short diagnostic for the
 * student's target exam.
 *
 *   status  GET  /me/diagnostic          offer / skipped / completed (+ result)
 *   start   POST /me/diagnostic/start    30–40 questions, signed token
 *   submit  POST /me/diagnostic/submit   marks it, saves the starting signal
 *   skip    POST /me/diagnostic/skip     never offered again for that exam
 *
 * How the test is built (rules in diagnostic.logic.js):
 *   - sections are the exam's own written-paper sections (pattern), so the
 *     question count per section follows the official marks;
 *   - inside a section, chapters are sampled in-syllabus first, by the
 *     exam's PYQ/plan weight and F2 priority (the syllabus map is reused,
 *     not re-derived) — about two questions per chapter, easy then medium;
 *   - only original practice questions: real previous-year questions are
 *     excluded, so nothing in a diagnostic carries or imitates a PYQ label,
 *     and every question is labelled a diagnostic question; General Studies
 *     questions must be source-verified; difficulty 4–5 never appears.
 *
 * What it is NOT: practice history. Marking uses grading.gradeAnswers with
 * record:false — no PracticeAttempt, no mistake-notebook entry, no skip, no
 * question stats — so mastery, accuracy and readiness are untouched and a
 * single test can never permanently label a student. Today's Study reads
 * the saved result only as a starting signal (startingSignal below).
 */

const { Question, DiagnosticResult } = require('../models');
const { langSetsContaining } = require('../models/schemas/localized');
const AppError = require('../utils/AppError');
const { PUBLIC_QUESTION_FIELDS, compactLocalized, presentQuestion } = require('./presenters');
const { gradeAnswers } = require('./grading');
const { signToken, verifySignedToken } = require('./signedToken');
const { topicName } = require('./catalogNames');
const targetExam = require('./targetExam.service');
const syllabusMap = require('./syllabusMap.service');
const idoPlan = require('../../db/plans/ido');
const L = require('./diagnostic.logic');

const PURPOSE = 'exam-diagnostic';
const TTL_SEC = 6 * 3600;
const REAL_PAPER = ['OFFICIAL_VERIFIED', 'ADAPTED_PYQ'];
const POOL = 8; // questions sampled per chapter before the easy/medium pick
const MIN_SERVABLE = 10; // below this the bank cannot support a diagnostic for the exam
const SEC_PER_QUESTION = 45; // easy–medium, untimed — only a guide for the student

const t = (en, bn) => ({ en, bn });

async function requireTarget(userId) {
  const current = await targetExam.targetExamOf(userId);
  if (!current) throw AppError.unprocessable('NO_TARGET_EXAM', 'Pick a target exam first');
  return current.code;
}

/** The exam, its pattern and the diagnostic's sections. */
async function examContext(examCode) {
  const { category, exam } = await targetExam.findExam(examCode);
  const pattern = targetExam.presentPattern(exam);
  const subjects = (category.subjects || []).map((s) => ({ code: s.code, name: compactLocalized(s.name) }));
  const { basis, blocks } = L.blocksFor(examCode, pattern, subjects, idoPlan.SECTIONS);
  return { category, exam, pattern, basis, blocks };
}

const minutesFor = (n) => Math.round((n * SEC_PER_QUESTION) / 60);

const BASIS_NOTE = {
  pattern: t(
    'Sections and question counts follow the official paper pattern of this exam.',
    'বিভাগ ও প্রশ্নসংখ্যা এই পরীক্ষার সরকারি প্রশ্নপত্রের কাঠামো অনুযায়ী।',
  ),
  plan_notice: t(
    'Sections follow the official notice’s section split for this exam.',
    'বিভাগগুলো এই পরীক্ষার সরকারি বিজ্ঞপ্তির বিভাগ-ভাগ অনুযায়ী।',
  ),
  equal: t(
    'No official paper pattern is recorded for this exam yet, so every subject gets an equal share.',
    'এই পরীক্ষার সরকারি প্রশ্নপত্রের কাঠামো এখনও নথিভুক্ত নেই, তাই প্রতিটি বিষয় সমান ভাগ পেয়েছে।',
  ),
};

const SIGNAL_NOTE = t(
  'This is a starting signal from one short test, not a verdict. It shapes your first recommendations for 30 days, and each chapter switches to your own practice results once you have answered 5 questions there.',
  'এটি একটি ছোট পরীক্ষা থেকে পাওয়া শুরুর সংকেত, চূড়ান্ত রায় নয়। এটি ৩০ দিন তোমার প্রথম সুপারিশ ঠিক করবে, আর কোনো অধ্যায়ে নিজে ৫টি প্রশ্নের উত্তর দিলেই সেখানে তোমার নিজের অনুশীলনের ফল ধরা হবে।',
);

function presentResult(doc) {
  if (!doc || doc.status !== 'completed') return null;
  const until = new Date(new Date(doc.taken_at).getTime() + L.SIGNAL_DAYS * 86_400_000);
  const topics = (doc.topics || []).map((x) => ({
    subject: x.subject,
    topic: x.topic,
    name: topicName(x.subject, x.topic),
    total: x.total,
    attempted: x.attempted,
    unattempted: x.unattempted,
    correct: x.correct,
    wrong: x.wrong,
    accuracy: x.accuracy ?? null,
    score: x.score ?? null,
    signal: x.signal,
  }));
  const short = ({ subject, topic, name, total, attempted, correct, score }) => ({ subject, topic, name, total, attempted, correct, score });
  return {
    takenAt: new Date(doc.taken_at).toISOString(),
    attempts: doc.attempts,
    basis: doc.basis ?? null,
    startingMastery: doc.starting_mastery,
    level: doc.level,
    summary: doc.summary,
    sections: doc.sections ?? [],
    subjects: doc.subjects ?? [],
    topics,
    weakTopics: topics.filter((x) => x.signal === 'start_here').sort((a, b) => a.score - b.score || b.total - a.total).map(short),
    strongTopics: topics.filter((x) => x.signal === 'looks_strong').map(short),
    signal: { active: L.signalIsActive(doc.taken_at), until: until.toISOString(), note: SIGNAL_NOTE },
  };
}

/** The diagnostic offer / result for the student's current target exam. */
async function getStatus(userId) {
  const current = await targetExam.targetExamOf(userId);
  if (!current) return { exam: null, state: 'no_target', offer: false, preview: null, result: null };
  const ctx = await examContext(current.code);
  const alloc = L.allocate(ctx.blocks);
  const doc = await DiagnosticResult.findOne({ user_id: String(userId), exam_code: current.code }).lean();
  const state = doc?.status ?? 'none';
  return {
    exam: { code: current.code, name: compactLocalized(ctx.exam.name) },
    state,
    offer: state === 'none',
    preview: {
      totalQuestions: alloc.reduce((a, b) => a + b, 0),
      minutes: minutesFor(L.TOTAL),
      basis: ctx.basis,
      basisNote: BASIS_NOTE[ctx.basis],
      sections: ctx.blocks.map((b, i) => ({ key: b.key, title: b.title, subject: b.subject, questions: alloc[i] })),
    },
    result: presentResult(doc),
  };
}

/** Up to POOL random diagnostic-eligible questions (id + difficulty) of one chapter. */
async function poolFor(base, subject, topic, exclude) {
  return Question.aggregate([
    {
      $match: {
        ...base,
        subject,
        topic,
        _id: { $nin: exclude },
        // General Studies: the answer must have been checked against a source.
        ...(subject === 'gs' && { 'source_check.status': 'SOURCE_VERIFIED' }),
      },
    },
    { $sample: { size: POOL } },
    { $project: { _id: 1, difficulty: 1 } },
  ]);
}

/** Build a diagnostic for the student's target exam: questions without answers + a signed token. */
async function startTest(userId, { language = 'en' } = {}) {
  const examCode = await requireTarget(userId);
  const ctx = await examContext(examCode);
  const map = await syllabusMap.getSyllabusMap(userId, examCode, language);
  const chaptersBySubject = new Map(map.subjects.map((s) => [s.subject, s.chapters]));
  const alloc = L.allocate(ctx.blocks);

  const base = {
    status: 'PUBLISHED',
    difficulty: { $lte: Math.max(...L.LEVEL.MEDIUM) },
    'pyq.is_pyq': { $ne: true },
    provenance: { $nin: REAL_PAPER },
    lang_set: { $in: langSetsContaining(language) },
    'exam_targets.category': ctx.category.code,
  };

  const used = [];
  const items = []; // { id, block, difficulty }
  const shortBlocks = [];
  for (let b = 0; b < ctx.blocks.length; b += 1) {
    const block = ctx.blocks[b];
    const n = alloc[b];
    const candidates = L.rankCandidates(block, chaptersBySubject.get(block.subject) ?? []);
    const pools = new Map();
    const picked = [];
    // Pass 1: about PER_TOPIC per chapter, best chapters first — so the
    // block probes ceil(n / PER_TOPIC) distinct chapters, easy then medium.
    for (const c of candidates) {
      if (picked.length >= n) break;
      const pool = await poolFor(base, block.subject, c.topic, used);
      pools.set(c.topic, pool);
      const take = L.pickForTopic(pool, Math.min(L.PER_TOPIC, n - picked.length));
      for (const q of take) {
        picked.push({ id: q._id, block: b, difficulty: q.difficulty });
        used.push(q._id);
      }
    }
    // Pass 2 (thin chapters or a block naming one chapter): top up from the
    // pools already drawn, in the same chapter order.
    for (const c of candidates) {
      if (picked.length >= n) break;
      const left = (pools.get(c.topic) ?? []).filter((q) => !used.some((u) => String(u) === String(q._id)));
      for (const q of L.pickForTopic(left, n - picked.length)) {
        picked.push({ id: q._id, block: b, difficulty: q.difficulty });
        used.push(q._id);
      }
    }
    if (picked.length < n) shortBlocks.push({ key: block.key, title: block.title, wanted: n, found: picked.length });
    // Easy → medium inside each section.
    picked.sort((x, y) => x.difficulty - y.difficulty);
    items.push(...picked);
  }

  if (items.length < MIN_SERVABLE) {
    throw AppError.unprocessable('DIAGNOSTIC_UNAVAILABLE', 'There are not enough checked questions for this exam to build a starting-level test yet');
  }

  const docs = await Question.find({ _id: { $in: items.map((x) => x.id) } }).select(PUBLIC_QUESTION_FIELDS).lean();
  const byId = new Map(docs.map((d) => [String(d._id), d]));
  const kept = items.filter((x) => byId.has(String(x.id)));
  let seq = 0;
  const sections = ctx.blocks
    .map((block, b) => ({
      key: block.key,
      title: block.title,
      subject: block.subject,
      questions: kept.filter((x) => x.block === b).map((x) => {
        const q = byId.get(String(x.id));
        seq += 1;
        return presentQuestion(q, { seq, subject: q.subject, diagnostic: true, level: L.levelOf(q.difficulty) });
      }),
    }))
    .filter((s) => s.questions.length);

  const notes = [BASIS_NOTE[ctx.basis]];
  if (kept.length < L.MIN_TOTAL) {
    notes.push(t(
      `Only ${kept.length} checked easy–medium questions are available for this exam right now, so this check is shorter than the usual ${L.TOTAL}.`,
      `এই পরীক্ষার জন্য এখন মাত্র ${kept.length}টি যাচাই-করা সহজ–মাঝারি প্রশ্ন আছে, তাই এই পরীক্ষাটি সাধারণ ${L.TOTAL}টির চেয়ে ছোট।`,
    ));
  }

  return {
    exam: { code: examCode, name: compactLocalized(ctx.exam.name) },
    label: 'DIAGNOSTIC',
    totalQuestions: kept.length,
    minutes: minutesFor(kept.length),
    timed: false,
    negativeMarking: 0,
    basis: ctx.basis,
    notes,
    shortBlocks,
    sections,
    testToken: signToken(PURPOSE, { e: examCode, q: kept.map((x) => String(x.id)), b: kept.map((x) => x.block) }, TTL_SEC),
  };
}

/** Mark a diagnostic, save the starting signal, return the result and every answer with its explanation. */
async function submitTest(userId, { testToken, answers }) {
  const issued = verifySignedToken(PURPOSE, testToken);
  if (!issued || !Array.isArray(issued.q) || !Array.isArray(issued.b) || issued.q.length !== issued.b.length) {
    throw new AppError(403, 'TEST_TOKEN_INVALID', 'This starting-level test has expired or was not issued by the server. Start it again.');
  }
  const allowed = new Set(issued.q);
  if (answers.some((a) => !allowed.has(a.questionId))) {
    throw new AppError(403, 'QUESTION_NOT_IN_TEST', 'Answers include questions that are not part of this test');
  }

  const given = new Map(answers.map((a) => [a.questionId, a]));
  const full = issued.q.map((id) => {
    const a = given.get(id);
    return { questionId: id, selectedOptionId: a?.selectedOptionId ?? null, timeSpentSec: a?.timeSpentSec };
  });
  // record:false — a diagnostic never becomes practice history (see header).
  const { results } = await gradeAnswers(full, { source: 'learn', record: false });
  const graded = new Map(results.map((r) => [r.questionId, r]));

  const meta = new Map((await Question.find({ _id: { $in: issued.q } }).select('subject topic difficulty').lean()).map((q) => [String(q._id), q]));
  const items = issued.q
    .map((id, i) => {
      const q = meta.get(id);
      return q && graded.has(id) ? { questionId: id, block: issued.b[i], subject: q.subject, topic: q.topic, difficulty: q.difficulty } : null;
    })
    .filter(Boolean);

  const ctx = await examContext(issued.e);
  const r = L.score(items, graded, ctx.blocks, topicName);

  const doc = await DiagnosticResult.findOneAndUpdate(
    { user_id: String(userId), exam_code: issued.e },
    {
      $set: {
        status: 'completed',
        taken_at: new Date(),
        basis: ctx.basis,
        starting_mastery: r.startingMastery,
        level: r.level,
        summary: r.summary,
        sections: r.sections,
        subjects: r.subjects,
        topics: r.topics.map(({ name, ...rest }) => rest),
      },
      $inc: { attempts: 1 },
    },
    { upsert: true, returnDocument: 'after' },
  ).lean();

  return { exam: { code: issued.e, name: compactLocalized(ctx.exam.name) }, result: presentResult(doc), results };
}

/** "Not now": the offer is not shown again for this exam. A completed result is never overwritten. */
async function skip(userId) {
  const examCode = await requireTarget(userId);
  await DiagnosticResult.updateOne(
    { user_id: String(userId), exam_code: examCode, status: { $ne: 'completed' } },
    { $set: { status: 'skipped', skipped_at: new Date() } },
    { upsert: true },
  ).catch((err) => {
    // A completed doc already exists: the filter missed it and the upsert hit the unique index.
    if (err?.code !== 11000) throw err;
  });
  return getStatus(userId);
}

/**
 * The starting signal for Today's Study: the "start here" and "looks solid"
 * chapters of a completed diagnostic for this exam, while it is active
 * (SIGNAL_DAYS). Callers drop a chapter once the student has OWN_DATA_MIN
 * answers of their own there. null when there is nothing to use.
 */
async function startingSignal(userId, examCode) {
  if (!examCode) return null;
  const doc = await DiagnosticResult.findOne({ user_id: String(userId), exam_code: examCode, status: 'completed' }).lean();
  if (!doc || !L.signalIsActive(doc.taken_at)) return null;
  const rows = doc.topics || [];
  return {
    takenAt: doc.taken_at,
    startingMastery: doc.starting_mastery,
    level: doc.level,
    weak: rows.filter((x) => x.signal === 'start_here').sort((a, b) => a.score - b.score),
    strong: rows.filter((x) => x.signal === 'looks_strong'),
  };
}

module.exports = { getStatus, startTest, submitTest, skip, startingSignal };
