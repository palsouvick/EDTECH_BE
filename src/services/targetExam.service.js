'use strict';

/**
 * Target exam (v1): the exam a student is preparing for, the syllabus
 * checklist for that exam, and a first generic readiness score.
 *
 * Honesty rules baked in here, not left to the client:
 *   - support is 'full' only when a study plan exists, 'partial' when real
 *     previous-year papers exist but no plan, 'minimal' otherwise (syllabus +
 *     pattern only). Nothing is ever presented as covered when it is not.
 *   - chapter weights come from the exam's own PYQ shares, or — only for the
 *     two exams with a plan and no PYQs to share — from the plan's session
 *     shares. Otherwise they are null, with a note saying why.
 *   - changing the target exam writes the target fields on the user and
 *     nothing else: progress, attempts, mistakes and plans are never
 *     touched. Daily study time and study language are profile fields, not
 *     exam fields — changing or clearing the exam leaves them alone.
 *   - there is no book-chapter signal here: books map PYQ refs to chapters,
 *     not catalogue topics, so hasBook is omitted rather than guessed.
 */

const mongoose = require('mongoose');
const { ExamCategory, Question, PracticeAttempt, User } = require('../models');
const AppError = require('../utils/AppError');
const { compactLocalized } = require('./presenters');
const { pyqRefBasis } = require('./questionProvenance');
const { getPriorities, buildPriorities } = require('./priority.service');
const { chapterMastery } = require('./mastery.service');
const { presentUser } = require('./auth.service');
const { loadLessons } = require('../../db/lessons');
const { HARD_BANKS } = require('./hardBanks');
const clerkshipPlan = require('../../db/plans/clerkship60');
const idoPlan = require('../../db/plans/ido');

const REAL_PAPER = ['OFFICIAL_VERIFIED', 'ADAPTED_PYQ'];
const TTL_MS = 5 * 60_000;

/**
 * Daily available study time (minutes/day) a student may choose in the
 * profile. Reused from the two study plans — Clerkship and IDO define the
 * same budget set, so the profile offers their union, not a third list.
 */
const DAILY_STUDY_MINUTES = Object.freeze(
  [...new Set([...(clerkshipPlan.BUDGETS ?? []), ...(idoPlan.BUDGETS ?? [])])].sort((a, b) => a - b),
);

/** Study languages the app actually supports (FE hooks/useLanguagePreference.js). */
const PREFERRED_LANGUAGES = Object.freeze(['en', 'bn']);

/**
 * Catalogue code -> the exam_name the bank's PYQ refs carry. Only these six
 * exams have real papers in the bank; every other code maps to null, and the
 * API says so instead of inventing papers.
 */
const PYQ_EXAM_NAME = Object.freeze({
  WBCS: 'WBCS (Exe.) Prelims',
  WBPSC_CLERKSHIP: 'WBPSC Clerkship (Part-I)',
  WBPSC_MISC: 'WBPSC Miscellaneous (Prelims)',
  WBPSC_IDO: 'Industrial Development Officer',
  WBP_CONSTABLE: 'WBP Constable (Prelims)',
  KP_CONSTABLE: 'Kolkata Police Constable (Prelims)',
});

/** Exams with a study plan, and where the client opens it. */
const PLANS = Object.freeze({
  WBPSC_CLERKSHIP: { code: 'CLERKSHIP_60', route: '/plan' },
  WBPSC_IDO: { code: 'IDO', route: '/plan/ido' },
});

const round1 = (x) => Math.round(x * 10) / 10;
const prettySlug = (s) => {
  const t = String(s).replace(/_/g, ' ');
  return { en: t.charAt(0).toUpperCase() + t.slice(1) };
};

let categoriesCache = { at: 0, data: null };
let pyqCache = { at: 0, data: null };
let lessonsCache = null;

const clearTargetExamCache = () => {
  categoriesCache = { at: 0, data: null };
  pyqCache = { at: 0, data: null };
  lessonsCache = null;
};

async function loadCategories() {
  if (categoriesCache.data && Date.now() - categoriesCache.at < TTL_MS) return categoriesCache.data;
  const data = await ExamCategory.find({ is_active: true }).sort({ display_order: 1 }).lean();
  categoriesCache = { at: Date.now(), data };
  return data;
}

/** The catalogue entry for one exam code, or a 422 when the code is unknown. */
async function findExam(examCode) {
  const cats = await loadCategories();
  for (const cat of cats) {
    const exam = (cat.exams || []).find((e) => e.code === examCode && e.is_active !== false);
    if (exam) return { category: cat, exam };
  }
  throw AppError.unprocessable('UNKNOWN_EXAM', `Unknown exam ${examCode}`);
}

const pyqExamNameForCode = (code) => PYQ_EXAM_NAME[code] ?? null;

/**
 * Published real-paper questions, aggregated once per cache window:
 * distinct question counts per exam, PYQ-ref counts per (exam, subject, topic)
 * and per (exam, subject), and the question ids behind each.
 * A ref counts only when pyqRefBasis accepts it — the same visibility rule
 * the PYQ pages use — so synthetic '-SYN-' refs never inflate a count.
 */
async function loadPyqData() {
  if (pyqCache.data && Date.now() - pyqCache.at < TTL_MS) return pyqCache.data;
  const docs = await Question.find({ status: 'PUBLISHED', provenance: { $in: REAL_PAPER }, 'pyq.is_pyq': true })
    .select('subject topic provenance pyq.refs')
    .lean();
  const countByExam = new Map();
  const refCountByExamTopic = new Map(); // examName -> Map 'subject.topic' -> refs
  const refCountByExamSubject = new Map(); // examName -> Map subject -> refs
  const questionsByExamTopic = new Map(); // examName -> Map 'subject.topic' -> Set(id)
  const questionsByExam = new Map(); // examName -> Set(id)
  for (const q of docs) {
    const seenExams = new Set();
    for (const ref of q.pyq.refs || []) {
      if (!pyqRefBasis(ref, q.provenance)) continue;
      const name = ref.exam_name;
      seenExams.add(name);
      const key = `${q.subject}.${q.topic}`;
      let m = refCountByExamTopic.get(name);
      if (!m) refCountByExamTopic.set(name, (m = new Map()));
      m.set(key, (m.get(key) ?? 0) + 1);
      let ms = refCountByExamSubject.get(name);
      if (!ms) refCountByExamSubject.set(name, (ms = new Map()));
      ms.set(q.subject, (ms.get(q.subject) ?? 0) + 1);
      let qm = questionsByExamTopic.get(name);
      if (!qm) questionsByExamTopic.set(name, (qm = new Map()));
      let set = qm.get(key);
      if (!set) qm.set(key, (set = new Set()));
      set.add(String(q._id));
    }
    for (const name of seenExams) {
      countByExam.set(name, (countByExam.get(name) ?? 0) + 1);
      let s = questionsByExam.get(name);
      if (!s) questionsByExam.set(name, (s = new Set()));
      s.add(String(q._id));
    }
  }
  const data = { countByExam, refCountByExamTopic, refCountByExamSubject, questionsByExamTopic, questionsByExam };
  pyqCache = { at: Date.now(), data };
  return data;
}

function lessonKeys() {
  if (!lessonsCache) lessonsCache = new Set(loadLessons().map(({ lesson }) => `${lesson.subject}.${lesson.topic}`));
  return lessonsCache;
}

/** The student's target exam as { code, examName } (examName null when the exam has no PYQs), or null. */
async function targetExamOf(userId) {
  if (!/^[a-f\d]{24}$/i.test(String(userId))) return null;
  const user = await User.findById(userId).select('target_exam').lean();
  if (!user?.target_exam) return null;
  return { code: user.target_exam, examName: pyqExamNameForCode(user.target_exam) };
}

/** All 16 catalogue exams with their honest support level and PYQ count. */
async function listTargetExams(language) {
  const cats = await loadCategories();
  const pyq = await loadPyqData();
  const exams = [];
  for (const cat of cats) {
    for (const e of (cat.exams || []).filter((x) => x.is_active !== false)) {
      const pyqName = pyqExamNameForCode(e.code);
      const plan = PLANS[e.code] ?? null;
      // 'full' = a plan exists; 'partial' = real papers but no plan;
      // 'minimal' = neither — syllabus + pattern only.
      const support = plan ? 'full' : pyqName ? 'partial' : 'minimal';
      exams.push({
        code: e.code,
        name: compactLocalized(e.name),
        category: cat.code,
        categoryName: compactLocalized(cat.name),
        fullName: compactLocalized(e.full_name),
        support,
        hasPlan: Boolean(plan),
        planCode: plan?.code ?? null,
        planRoute: plan?.route ?? null,
        pyqCount: pyqName ? pyq.countByExam.get(pyqName) ?? 0 : 0,
        hasPattern: (e.stages || []).some((s) => (s.sections || []).length > 0),
        patternAsOf: e.pattern_as_of ?? null,
      });
    }
  }
  return { language, exams };
}

function parseExamDate(value) {
  if (value == null) return null;
  if (typeof value !== 'string') throw AppError.unprocessable('INVALID_EXAM_DATE', 'Exam date must be a date string');
  const s = value.trim();
  if (!s) return null;
  if (!/^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:?\d{2})?)?$/.test(s)) {
    throw AppError.unprocessable('INVALID_EXAM_DATE', 'Exam date must be YYYY-MM-DD or an ISO date');
  }
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) throw AppError.unprocessable('INVALID_EXAM_DATE', 'Exam date is not a real calendar date');
  if (/^\d{4}-\d{2}-\d{2}$/.test(s) && d.toISOString().slice(0, 10) !== s) {
    throw AppError.unprocessable('INVALID_EXAM_DATE', 'Exam date is not a real calendar date');
  }
  return d;
}

/**
 * Set the student's target-exam profile. Partial update: a field that is
 * absent (undefined) is left alone; null clears it; a value sets it.
 *   - examCode: null clears the exam AND the date (setAt null). A new code
 *     stamps target_exam_set_at with now; the date comes from examDate and
 *     is null when examDate is absent — the old date does not linger across
 *     an exam change. Absent examCode with an examDate updates just the
 *     date on the current target exam (422 NO_TARGET_EXAM when none is set).
 *   - dailyStudyMinutes / preferredLanguage: profile fields, validated
 *     against the plan budgets / live languages. Clearing the exam never
 *     clears them.
 * Writes only these fields — progress, attempts, mistakes and plans are
 * never touched here.
 */
async function setTargetExam(userId, { examCode, examDate, dailyStudyMinutes, preferredLanguage }) {
  const update = {};

  if (examCode !== undefined) {
    let code = typeof examCode === 'string' ? examCode.trim().toUpperCase() : examCode;
    if (code === '') code = null;
    if (code == null) {
      update.target_exam = null;
      update.target_exam_date = null;
      update.target_exam_set_at = null;
    } else {
      await findExam(code); // unknown code -> 422 UNKNOWN_EXAM
      update.target_exam = code;
      update.target_exam_date = parseExamDate(examDate);
      update.target_exam_set_at = new Date();
    }
  } else if (examDate !== undefined) {
    // Date-only change: only meaningful on an exam already held.
    const current = await User.findById(userId).select('target_exam').lean();
    if (!current) throw AppError.notFound('USER_NOT_FOUND', 'Account not found');
    if (!current.target_exam) throw AppError.unprocessable('NO_TARGET_EXAM', 'Pick a target exam first');
    update.target_exam_date = parseExamDate(examDate);
  }

  if (dailyStudyMinutes !== undefined) {
    if (dailyStudyMinutes == null) {
      update.daily_study_minutes = null;
    } else {
      if (!Number.isInteger(dailyStudyMinutes) || !DAILY_STUDY_MINUTES.includes(dailyStudyMinutes)) {
        throw AppError.unprocessable('INVALID_DAILY_STUDY_MINUTES', `Daily study time must be one of ${DAILY_STUDY_MINUTES.join(', ')} minutes`);
      }
      update.daily_study_minutes = dailyStudyMinutes;
    }
  }

  if (preferredLanguage !== undefined) {
    if (preferredLanguage == null) {
      update.preferred_language = null;
    } else {
      const lang = String(preferredLanguage).trim().toLowerCase();
      if (!PREFERRED_LANGUAGES.includes(lang)) {
        throw AppError.unprocessable('INVALID_LANGUAGE', `Study language must be one of ${PREFERRED_LANGUAGES.join(', ')}`);
      }
      update.preferred_language = lang;
    }
  }

  if (!Object.keys(update).length) {
    const user = await User.findById(userId);
    if (!user) throw AppError.notFound('USER_NOT_FOUND', 'Account not found');
    return presentUser(user);
  }
  const user = await User.findByIdAndUpdate(userId, { $set: update }, { returnDocument: 'after' });
  if (!user) throw AppError.notFound('USER_NOT_FOUND', 'Account not found');
  return presentUser(user);
}

/**
 * Chapter priorities scoped to one exam (priority.service, reused, not
 * re-derived). An exam with no PYQs returns empty subjects with an honest
 * note instead of an error.
 */
async function getPrioritiesForExam(examCode) {
  await findExam(examCode); // unknown code -> 422 UNKNOWN_EXAM
  const examName = pyqExamNameForCode(examCode);
  if (!examName) {
    return {
      examCode,
      examName: null,
      note: 'No previous-year questions for this exam are in the bank yet, so there are no chapter priorities for it.',
      priorities: buildPriorities([]),
    };
  }
  return { examCode, examName, priorities: await getPriorities(examName) };
}

/* ------------------------------------------------------------------ syllabus */

/** First stage that actually has sections — the written paper students prepare for. */
function firstWrittenStage(exam) {
  return (exam.stages || []).find((s) => (s.sections || []).length > 0) ?? null;
}

function presentPattern(exam) {
  const stage = firstWrittenStage(exam);
  if (!stage) return null;
  const sections = (stage.sections || []).map((x) => {
    const marks = x.max_marks ?? x.num_questions * x.marks_per_question;
    return {
      subject: x.subject,
      name: compactLocalized(x.title),
      questions: x.num_questions,
      marks,
      negative: x.negative_marks ?? null,
    };
  });
  const totalMarks = sections.reduce((n, x) => n + x.marks, 0);
  for (const s of sections) s.weight = totalMarks ? round1((s.marks / totalMarks) * 100) : null;
  const negatives = [...new Set(sections.map((s) => s.negative).filter((n) => n != null))];
  return {
    stageName: compactLocalized(stage.name),
    tier: stage.tier,
    durationMin: stage.duration_min ?? null,
    negative: negatives.length === 1 ? negatives[0] : null,
    negativeNote: compactLocalized(stage.negative_note),
    patternAsOf: exam.pattern_as_of ?? null,
    sections,
    totalQuestions: sections.reduce((n, x) => n + x.questions, 0),
    totalMarks,
  };
}

/** Marks share per subject (0–100) from the first written stage, or nulls when there is no pattern. */
function subjectWeights(pattern) {
  if (!pattern) return new Map();
  const bySubject = new Map();
  for (const s of pattern.sections) bySubject.set(s.subject, (bySubject.get(s.subject) ?? 0) + s.marks);
  const out = new Map();
  for (const [subject, marks] of bySubject) out.set(subject, pattern.totalMarks ? round1((marks / pattern.totalMarks) * 100) : null);
  return out;
}

// [topic, sessions] deduped, sessions summed, in plan order.
function dedupePlanList(list) {
  const out = [];
  const seen = new Map();
  for (const [topic, sessions] of list) {
    if (seen.has(topic)) seen.get(topic).sessions += sessions;
    else {
      const row = { topic, sessions };
      seen.set(topic, row);
      out.push(row);
    }
  }
  return out;
}

/** Chapter lists for the two exams with plans; null otherwise (catalogue topics are used). */
function planChapters(examCode) {
  if (examCode === 'WBPSC_CLERKSHIP') {
    return {
      quant: dedupePlanList(clerkshipPlan.ARITHMETIC).map(({ topic, sessions }) => ({ topic, sessions })),
      english: dedupePlanList(clerkshipPlan.ENGLISH).map(({ topic, sessions }) => ({ topic, sessions })),
      gs: dedupePlanList(clerkshipPlan.GS).map(({ topic, sessions }) => ({ topic, sessions })),
    };
  }
  if (examCode === 'WBPSC_IDO') {
    // One entry per official section. Sections with topic null (English,
    // Arithmetic, Mental Ability) are subject-level entries under the
    // section's own title — the notice gives no topic split for them.
    const bySubject = {};
    for (const s of idoPlan.SECTIONS) {
      (bySubject[s.subject] ??= []).push({ topic: s.topic, title: s.title, sessions: null });
    }
    return bySubject;
  }
  return null;
}

/** Plan session shares per subject, for the fallback when an exam has no PYQs to weigh chapters by. */
function planSessionShares(examCode) {
  const lists = examCode === 'WBPSC_CLERKSHIP'
    ? { quant: clerkshipPlan.ARITHMETIC, english: clerkshipPlan.ENGLISH, gs: clerkshipPlan.GS }
    : examCode === 'WBPSC_IDO'
      ? { quant: idoPlan.ARITHMETIC, english: idoPlan.ENGLISH, gs: idoPlan.GS, reasoning: idoPlan.MENTAL_ABILITY }
      : null;
  if (!lists) return null;
  const out = new Map();
  for (const [subject, list] of Object.entries(lists)) {
    const deduped = dedupePlanList(list);
    const total = deduped.reduce((n, r) => n + r.sessions, 0);
    out.set(subject, new Map(deduped.map((r) => [r.topic, total ? round1((r.sessions / total) * 100) : null])));
  }
  return out;
}

// Whether any hard-bank pattern for this topic sits inside the Clerkship
// Part-I syllabus; null when the topic has no hard bank at all.
function clerkshipSignal(topic) {
  const bank = HARD_BANKS[topic];
  if (!bank) return null;
  return bank.registry.some((p) => p.clerkship === true);
}

/**
 * The syllabus checklist for one exam: pattern, subjects with chapter weights,
 * per-chapter completion and PYQ progress, and a readiness score.
 * examCode is the catalogue code; the countdown uses the student's stored
 * exam date, and only when this exam is their current target.
 */
async function getSyllabus(userId, examCode, language) {
  const { category, exam } = await findExam(examCode);
  const user = await User.findById(userId).select('target_exam target_exam_date').lean();
  const pattern = presentPattern(exam);
  const weights = subjectWeights(pattern);
  const pyqName = pyqExamNameForCode(examCode);
  const pyq = await loadPyqData();
  const plan = PLANS[examCode] ?? null;

  // Which subjects, and which chapters in each.
  const catalogueSubjects = new Map(category.subjects.map((s) => [s.code, s]));
  const planLists = planChapters(examCode);
  let subjectCodes;
  if (planLists) subjectCodes = Object.keys(planLists);
  else if (pattern) subjectCodes = [...new Set(pattern.sections.map((s) => s.subject))];
  else subjectCodes = category.subjects.map((s) => s.code);

  // Chapter weights: this exam's PYQ shares within each subject, else the
  // plan's session shares (plan exams only), else null — never invented.
  const refCounts = pyqName ? pyq.refCountByExamTopic.get(pyqName) ?? new Map() : new Map();
  const refSubjectTotals = pyqName ? pyq.refCountByExamSubject.get(pyqName) ?? new Map() : new Map();
  const sessionShares = plan && !pyqName ? planSessionShares(examCode) : null;
  const weightFor = (subject, topic) => {
    if (pyqName) {
      const total = refSubjectTotals.get(subject) ?? 0;
      if (!total) return { weight: null, source: null };
      if (topic == null) return { weight: 100, source: 'pyq' };
      return { weight: round1(((refCounts.get(`${subject}.${topic}`) ?? 0) / total) * 100), source: 'pyq' };
    }
    if (sessionShares) {
      if (topic == null) return { weight: 100, source: 'plan' };
      const w = sessionShares.get(subject)?.get(topic);
      return { weight: w ?? null, source: w == null ? null : 'plan' };
    }
    return { weight: null, source: null };
  };

  // Bank sizes and the student's distinct answered questions, per chapter and per subject.
  const bankRows = await Question.aggregate([
    { $match: { status: 'PUBLISHED' } },
    { $group: { _id: { subject: '$subject', topic: '$topic' }, n: { $sum: 1 } } },
  ]);
  const bankByKey = new Map(bankRows.map((r) => [`${r._id.subject}.${r._id.topic}`, r.n]));
  const bankBySubject = new Map();
  for (const [key, n] of bankByKey) {
    const subject = key.split('.')[0];
    bankBySubject.set(subject, (bankBySubject.get(subject) ?? 0) + n);
  }
  const ansRows = await PracticeAttempt.aggregate([
    { $match: { user_id: String(userId) } },
    { $group: { _id: { subject: '$subject', topic: '$topic' }, qids: { $addToSet: '$question_id' } } },
  ]);
  const answeredByKey = new Map(ansRows.map((r) => [`${r._id.subject}.${r._id.topic}`, r.qids.length]));
  const answeredBySubject = new Map();
  for (const [key, n] of answeredByKey) {
    const subject = key.split('.')[0];
    answeredBySubject.set(subject, (answeredBySubject.get(subject) ?? 0) + n);
  }

  // PYQs of this exam the student has solved (latest answer correct), per chapter and in total.
  const examQByTopic = pyqName ? pyq.questionsByExamTopic.get(pyqName) ?? new Map() : new Map();
  const examQIds = pyqName ? [...(pyq.questionsByExam.get(pyqName) ?? [])] : [];
  const solvedByKey = new Map();
  let solvedTotal = 0;
  if (examQIds.length) {
    const latest = await PracticeAttempt.aggregate([
      { $match: { user_id: String(userId), question_id: { $in: examQIds.map((id) => new mongoose.Types.ObjectId(id)) } } },
      { $sort: { created_at: -1 } },
      { $group: { _id: '$question_id', correct: { $first: '$correct' } } },
    ]);
    const keyOf = new Map();
    for (const [key, set] of examQByTopic) for (const id of set) keyOf.set(id, key);
    for (const a of latest) {
      if (!a.correct) continue;
      solvedTotal += 1;
      const k = keyOf.get(String(a._id));
      if (k) solvedByKey.set(k, (solvedByKey.get(k) ?? 0) + 1);
    }
  }
  const solvedBySubject = new Map();
  for (const [key, n] of solvedByKey) {
    const subject = key.split('.')[0];
    solvedBySubject.set(subject, (solvedBySubject.get(subject) ?? 0) + n);
  }
  const pyqCountByKey = new Map([...examQByTopic].map(([key, set]) => [key, set.size]));
  const pyqCountBySubject = new Map();
  for (const [key, n] of pyqCountByKey) {
    const subject = key.split('.')[0];
    pyqCountBySubject.set(subject, (pyqCountBySubject.get(subject) ?? 0) + n);
  }

  const lessons = lessonKeys();
  const topicNameOf = (subject, topic) => {
    const t = catalogueSubjects.get(subject)?.topics.find((x) => x.code === topic);
    return t ? compactLocalized(t.name) : prettySlug(topic);
  };

  const subjects = subjectCodes.map((subjectCode) => {
    const catSubject = catalogueSubjects.get(subjectCode);
    const subjectWeight = pattern ? weights.get(subjectCode) ?? null : null;
    let chapters;
    if (planLists) {
      chapters = planLists[subjectCode].map(({ topic, title }) => {
        const w = weightFor(subjectCode, topic);
        const key = topic == null ? null : `${subjectCode}.${topic}`;
        const bankCount = topic == null ? bankBySubject.get(subjectCode) ?? 0 : bankByKey.get(key) ?? 0;
        const answered = topic == null ? answeredBySubject.get(subjectCode) ?? 0 : answeredByKey.get(key) ?? 0;
        const chapterPyqCount = topic == null ? pyqCountBySubject.get(subjectCode) ?? 0 : pyqCountByKey.get(key) ?? 0;
        const chapterPyqSolved = topic == null ? solvedBySubject.get(subjectCode) ?? 0 : solvedByKey.get(key) ?? 0;
        const ch = {
          topic,
          name: title ? compactLocalized(title) : topicNameOf(subjectCode, topic),
          weight: w.weight,
          weightSource: w.source,
          pyqCount: chapterPyqCount,
          bankCount,
          answered,
          pyqSolved: chapterPyqSolved,
          completion: bankCount ? round1((answered / bankCount) * 100) : null,
          hasLesson: topic == null
            ? [...lessons].some((k) => k.startsWith(`${subjectCode}.`))
            : lessons.has(key),
        };
        if (examCode === 'WBPSC_CLERKSHIP' && topic != null) ch.inClerkshipSyllabus = clerkshipSignal(topic);
        return ch;
      });
    } else {
      chapters = (catSubject?.topics || []).map((t) => {
        const w = weightFor(subjectCode, t.code);
        const key = `${subjectCode}.${t.code}`;
        const bankCount = bankByKey.get(key) ?? 0;
        const answered = answeredByKey.get(key) ?? 0;
        return {
          topic: t.code,
          name: compactLocalized(t.name),
          weight: w.weight,
          weightSource: w.source,
          pyqCount: pyqCountByKey.get(key) ?? 0,
          bankCount,
          answered,
          pyqSolved: solvedByKey.get(key) ?? 0,
          completion: bankCount ? round1((answered / bankCount) * 100) : null,
          hasLesson: lessons.has(key),
        };
      });
    }

    let note = null;
    if (!pattern) {
      note = 'No written-paper pattern is recorded for this exam yet, so subject weights are not stated — the chapters below are the full catalogue syllabus for its category.';
    } else if (subjectWeight == null) {
      note = 'This subject has no section of its own in the official pattern, so its weight is not stated.';
      if (examCode === 'WBPSC_IDO' && subjectCode === 'reasoning') {
        note = 'Mental Ability has no separate section in the official pattern — its 8 marks sit inside the combined Arithmetic & Mental Ability section (20 marks).';
      }
    } else if (chapters.length && chapters.every((c) => c.weight == null)) {
      note = pyqName
        ? 'No previous-year questions for this exam fall in this subject yet, so chapter weights are not estimated — work through the chapters in order.'
        : 'No previous-year questions for this exam are in the bank yet, so chapter weights are not estimated — work through the chapters in order.';
    }
    return {
      subject: subjectCode,
      name: catSubject ? compactLocalized(catSubject.name) : prettySlug(subjectCode),
      weight: subjectWeight,
      weightSource: pattern ? 'pattern' : null,
      ...(note ? { note } : {}),
      chapters,
    };
  });

  // ---- Readiness (first generic server-side score) ----
  // coverage: chapter completion averaged within each subject (by chapter
  // weight where the exam has one, equally otherwise), then across subjects
  // by subject weight where the pattern gives one, equally otherwise.
  // mastery: the unified chapter mastery score (mastery.service), see below
  // pyq: solved PYQs of this exam / all its PYQs
  // (null when the exam has no PYQs). score is the weighted mean of the
  // components present (0.5 / 0.3 / 0.2, renormalised); null when coverage
  // is null — there is not enough data yet to say anything.
  const subjectCoverages = [];
  for (const s of subjects) {
    // A chapter counts toward coverage only once the student has answered at
    // least one question in it — before that there is nothing to average, so
    // coverage (and the score) stay null instead of reporting a 0 verdict
    // for a student who has not started.
    const done = s.chapters.filter((c) => c.completion != null && c.answered > 0);
    if (!done.length) continue;
    const weighted = done.some((c) => c.weight != null && c.weight > 0);
    const cov = weighted
      ? done.reduce((n, c) => n + c.completion * (c.weight ?? 0), 0) / done.reduce((n, c) => n + (c.weight ?? 0), 0)
      : done.reduce((n, c) => n + c.completion, 0) / done.length;
    subjectCoverages.push({ coverage: cov, weight: s.weight });
  }
  let coverage = null;
  if (subjectCoverages.length) {
    const weighted = subjectCoverages.some((s) => s.weight != null && s.weight > 0);
    coverage = weighted
      ? round1(subjectCoverages.reduce((n, s) => n + s.coverage * (s.weight ?? 0), 0) / subjectCoverages.reduce((n, s) => n + (s.weight ?? 0), 0))
      : round1(subjectCoverages.reduce((n, s) => n + s.coverage, 0) / subjectCoverages.length);
  }
  // mastery (F9/F10): the unified mastery score of the chapters the student
  // has started in this exam's subjects — the same score Home, the subject
  // pages and Today's Study show — averaged within each subject (a started
  // chapter without a score yet counts 0), then across subjects by pattern
  // weight. null until at least one chapter has a score.
  const unified = await chapterMastery(userId, { subjects: subjectCodes });
  const subjectMastery = [];
  for (const s of subjects) {
    const rows = s.chapters
      .map((c) => (c.topic == null ? null : unified.get(`${s.subject}.${c.topic}`)))
      .filter((r) => r && r.stage !== 'not_started');
    if (!rows.some((r) => r.score != null)) continue;
    subjectMastery.push({ mastery: rows.reduce((n, r) => n + (r.score ?? 0), 0) / rows.length, weight: s.weight });
  }
  let mastery = null;
  if (subjectMastery.length) {
    const weighted = subjectMastery.some((s) => s.weight != null && s.weight > 0);
    mastery = weighted
      ? round1(subjectMastery.reduce((n, s) => n + s.mastery * (s.weight ?? 0), 0) / subjectMastery.reduce((n, s) => n + (s.weight ?? 0), 0))
      : round1(subjectMastery.reduce((n, s) => n + s.mastery, 0) / subjectMastery.length);
  }
  const pyqTotal = examQIds.length;
  const pyqScore = pyqTotal ? round1((solvedTotal / pyqTotal) * 100) : null;
  const components = { coverage, mastery, pyq: pyqScore };
  const missing = Object.entries(components).filter(([, v]) => v == null).map(([k]) => k);
  let score = null;
  let readinessNote;
  if (coverage == null) {
    readinessNote = 'Not enough data yet — answer questions in this exam’s subjects to build a readiness score.';
  } else {
    const parts = [['coverage', 0.5], ['mastery', 0.3], ['pyq', 0.2]].filter(([k]) => components[k] != null);
    score = Math.round(parts.reduce((n, [k, w]) => n + components[k] * w, 0) / parts.reduce((n, [, w]) => n + w, 0));
    readinessNote = missing.length
      ? `Readiness uses ${parts.map(([k]) => k).join(' + ')}; ${missing.join(' + ')} not available yet.`
      : 'Readiness uses coverage, mastery and PYQ progress.';
  }
  const readiness = { score, components, basis: { included: ['coverage', 'mastery', 'pyq'].filter((k) => components[k] != null), missing }, note: readinessNote };

  // ---- Countdown (the student's own exam date, only for their current target) ----
  let countdown = null;
  if (user?.target_exam === examCode && user.target_exam_date) {
    const startOfDay = (d) => {
      const x = new Date(d);
      x.setUTCHours(0, 0, 0, 0);
      return x.getTime();
    };
    countdown = {
      examDate: new Date(user.target_exam_date).toISOString().slice(0, 10),
      daysLeft: Math.round((startOfDay(user.target_exam_date) - startOfDay(new Date())) / 86400000),
    };
  }

  return {
    exam: {
      code: examCode,
      name: compactLocalized(exam.name),
      support: plan ? 'full' : pyqName ? 'partial' : 'minimal',
      hasPlan: Boolean(plan),
      planCode: plan?.code ?? null,
      planRoute: plan?.route ?? null,
    },
    pattern,
    subjects,
    readiness,
    countdown,
  };
}

module.exports = {
  listTargetExams,
  setTargetExam,
  getSyllabus,
  getPrioritiesForExam,
  targetExamOf,
  findExam,
  presentPattern,
  pyqExamNameForCode,
  clearTargetExamCache,
  DAILY_STUDY_MINUTES,
  PREFERRED_LANGUAGES,
};
