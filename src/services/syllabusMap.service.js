'use strict';

/**
 * Exam Syllabus Map (Feature F2): for ANY catalogue exam, the full map of
 * what to study — Subject -> Chapter (catalogue topic) -> Topic (catalogue
 * subtopic) — with, per chapter:
 *
 *   syllabus   in / supplementary / out / unmapped, plus the basis it rests on
 *   priority   high / medium / low from the exam's own PYQ priorities
 *              (priority.service MUST / IMPORTANT / ADDITIONAL), else null
 *   weight     the exam's chapter weight where targetExam.getSyllabus can
 *              state one (PYQ share or plan share), else null — never invented
 *   status     not_started / in_progress / completed / mastered, for this student
 *   mastery    the insights mastery row (status, recent accuracy), reused as-is
 *
 * Verdict rules, strongest evidence first (a weaker rule never overrides a
 * stronger one):
 *   1. official      the catalogue topic's own syllabus_status, recorded
 *                    against an official syllabus (SYLLABUS / SUPPLEMENTARY)
 *   2. hardbank      Clerkship only: a quant chapter whose hard-bank patterns
 *                    are explicitly marked in/out of the Clerkship Part-I syllabus
 *   3. plan          exams with a study plan (Clerkship, IDO): listed in the
 *                    plan -> in; a chapter of a plan subject that is not
 *                    listed -> out; a whole subject absent from both the plan
 *                    and the official pattern -> out
 *   4. pyq           the chapter has real previous-year questions of THIS
 *                    exam in the bank -> in (it demonstrably appeared)
 *   5. unmapped      none of the above can say — flagged, never guessed.
 *                    (Absence from past papers alone never marks a chapter
 *                    out: a topic can be in the syllabus and simply not have
 *                    been asked yet, and section bookkeeping in a pattern is
 *                    too coarse to overrule that.)
 *
 * Nothing here creates a new taxonomy: subjects, chapters and subtopics are
 * the exam's own category catalogue; weights and completion come from
 * targetExam.getSyllabus; priorities from priority.service; mastery from
 * insights.service. This service only joins them and says what is unmapped.
 */

const mongoose = require('mongoose');
const { ExamCategory, Question, PracticeAttempt } = require('../models');
const AppError = require('../utils/AppError');
const { compactLocalized } = require('./presenters');
const { pyqRefBasis } = require('./questionProvenance');
const targetExam = require('./targetExam.service');
const { HARD_BANKS } = require('./hardBanks');
const { answersOf, buildMastery } = require('./insights.service');
const { chapterMastery } = require('./mastery.service');
const { loadLessons } = require('../../db/lessons');
const clerkshipPlan = require('../../db/plans/clerkship60');
const idoPlan = require('../../db/plans/ido');

const round1 = (x) => Math.round(x * 10) / 10;
const prettySlug = (s) => {
  const t = String(s).replace(/_/g, ' ');
  return { en: t.charAt(0).toUpperCase() + t.slice(1) };
};

const PRIORITY_OF_LEVEL = Object.freeze({ MUST: 'high', IMPORTANT: 'medium', ADDITIONAL: 'low' });

let categoriesCache = { at: 0, data: null };
const TTL_MS = 5 * 60_000;
async function loadCategories() {
  if (categoriesCache.data && Date.now() - categoriesCache.at < TTL_MS) return categoriesCache.data;
  const data = await ExamCategory.find({ is_active: true }).sort({ display_order: 1 }).lean();
  categoriesCache = { at: Date.now(), data };
  return data;
}
const clearSyllabusMapCache = () => {
  categoriesCache = { at: 0, data: null };
  pyqCache = new Map();
};

/**
 * This exam's real-paper PYQs, per chapter: ref counts (the weight basis
 * targetExam uses), distinct question counts and the question ids. Computed
 * here rather than read from getSyllabus because the base syllabus only
 * builds chapters for pattern/plan subjects — a chapter outside that scope
 * (e.g. quant in WBCS, whose pattern folds it into GS sections) still has
 * real PYQ evidence, and the map must not lose it.
 */
const REAL_PAPER = ['OFFICIAL_VERIFIED', 'ADAPTED_PYQ'];
let pyqCache = new Map();
async function loadExamPyq(examName) {
  const cached = pyqCache.get(examName);
  if (cached && Date.now() - cached.at < TTL_MS) return cached.data;
  const docs = await Question.find({ status: 'PUBLISHED', provenance: { $in: REAL_PAPER }, 'pyq.is_pyq': true })
    .select('subject topic provenance pyq.refs')
    .lean();
  const refByKey = new Map();
  const refBySubject = new Map();
  const idsByKey = new Map();
  for (const q of docs) {
    let counted = false;
    for (const ref of q.pyq.refs || []) {
      if (ref.exam_name !== examName) continue;
      if (!pyqRefBasis(ref, q.provenance)) continue;
      const key = `${q.subject}.${q.topic}`;
      refByKey.set(key, (refByKey.get(key) ?? 0) + 1);
      refBySubject.set(q.subject, (refBySubject.get(q.subject) ?? 0) + 1);
      counted = true;
    }
    if (counted) {
      const key = `${q.subject}.${q.topic}`;
      if (!idsByKey.has(key)) idsByKey.set(key, new Set());
      idsByKey.get(key).add(String(q._id));
    }
  }
  const countByKey = new Map([...idsByKey].map(([k, s]) => [k, s.size]));
  const data = { refByKey, refBySubject, countByKey, idsByKey };
  pyqCache.set(examName, { at: Date.now(), data });
  return data;
}

async function findExam(examCode) {
  const cats = await loadCategories();
  for (const cat of cats) {
    const exam = (cat.exams || []).find((e) => e.code === examCode && e.is_active !== false);
    if (exam) return { category: cat, exam };
  }
  throw AppError.unprocessable('UNKNOWN_EXAM', `Unknown exam ${examCode}`);
}

/** Plan membership for the two plan exams: { subjects:Set, topics:Set<'subject.topic'>, subjectLevel:Set<subject> } or null. */
function planMembership(examCode) {
  if (examCode === 'WBPSC_CLERKSHIP') {
    const topics = new Set();
    const subjects = new Set();
    for (const [subject, list] of Object.entries({ quant: clerkshipPlan.ARITHMETIC, english: clerkshipPlan.ENGLISH, gs: clerkshipPlan.GS })) {
      subjects.add(subject);
      for (const [topic] of list) topics.add(`${subject}.${topic}`);
    }
    return { subjects, topics, subjectLevel: new Set() };
  }
  if (examCode === 'WBPSC_IDO') {
    const topics = new Set();
    const subjects = new Set();
    const subjectLevel = new Set();
    for (const s of idoPlan.SECTIONS) {
      subjects.add(s.subject);
      if (s.topic == null) subjectLevel.add(s.subject);
      else topics.add(`${s.subject}.${s.topic}`);
    }
    return { subjects, topics, subjectLevel };
  }
  return null;
}

function clerkshipSignal(topic) {
  const bank = HARD_BANKS[topic];
  if (!bank) return null;
  if (bank.registry.some((p) => p.clerkship === true)) return true;
  if (bank.registry.length && bank.registry.every((p) => p.clerkship === false)) return false;
  return null;
}

const OFFICIAL_MAP = Object.freeze({ SYLLABUS: 'in', SUPPLEMENTARY: 'supplementary', UNVERIFIED: null });

function chapterVerdict({ examCode, subject, topic, topicNode, plan, patternSubjects, pyqCount }) {
  // 1. Official syllabus mapping recorded on the catalogue chapter itself.
  const official = OFFICIAL_MAP[topicNode?.syllabus_status ?? 'UNVERIFIED'];
  if (official) {
    return {
      status: official,
      basis: 'official',
      note: topicNode.syllabus_note ? compactLocalized(topicNode.syllabus_note) : null,
      sourceUrl: topicNode.syllabus_source_url ?? null,
    };
  }
  // 2. Clerkship hard-bank in/out marks (quant chapters with a hard bank).
  if (examCode === 'WBPSC_CLERKSHIP') {
    const signal = clerkshipSignal(topic);
    if (signal === true) return { status: 'in', basis: 'hardbank', note: null, sourceUrl: null };
    if (signal === false) return { status: 'out', basis: 'hardbank', note: null, sourceUrl: null };
  }
  // 3. Study-plan membership (Clerkship, IDO).
  if (plan) {
    const key = `${subject}.${topic}`;
    if (plan.topics.has(key)) return { status: 'in', basis: 'plan', note: null, sourceUrl: null };
    if (plan.subjectLevel.has(subject)) return { status: 'in', basis: 'plan_subject', note: null, sourceUrl: null };
    if (plan.subjects.has(subject)) return { status: 'out', basis: 'plan', note: null, sourceUrl: null };
    if (patternSubjects && !patternSubjects.has(subject)) return { status: 'out', basis: 'plan_pattern', note: null, sourceUrl: null };
  }
  // 4. Real papers of this exam asked from this chapter.
  if (pyqCount > 0) return { status: 'in', basis: 'pyq', note: null, sourceUrl: null };
  // 5. Nothing can say — flag it.
  return { status: 'unmapped', basis: null, note: null, sourceUrl: null };
}

function subtopicVerdict(subtopic) {
  const mapped = OFFICIAL_MAP[subtopic.syllabus_status ?? 'UNVERIFIED'];
  return mapped
    ? { status: mapped, basis: 'official' }
    : { status: 'unmapped', basis: null };
}

async function getSyllabusMap(userId, examCode, language) {
  const { category, exam } = await findExam(examCode);
  const target = await targetExam.targetExamOf(userId);
  const base = await targetExam.getSyllabus(userId, examCode, language);
  const prioritiesRes = await targetExam.getPrioritiesForExam(examCode);
  const priorities = prioritiesRes.priorities ?? { subjects: {}, rule: null, paperCount: 0 };
  const plan = planMembership(examCode);
  const patternSubjects = base.pattern ? new Set(base.pattern.sections.map((s) => s.subject)) : null;
  const pyqName = targetExam.pyqExamNameForCode(examCode);

  // Base chapters (weights, completion, PYQ progress) keyed by subject.topic.
  const baseByKey = new Map();
  const baseSubjectByCode = new Map();
  for (const s of base.subjects) {
    baseSubjectByCode.set(s.subject, s);
    for (const c of s.chapters) {
      if (c.topic != null) baseByKey.set(`${s.subject}.${c.topic}`, c);
    }
  }

  // This exam's PYQ evidence for every chapter (see loadExamPyq), and which
  // of those PYQs this student has solved (latest answer correct).
  const examPyq = pyqName ? await loadExamPyq(pyqName) : null;
  const solvedByKey = new Map();
  if (examPyq) {
    const allIds = [...examPyq.idsByKey.values()].flatMap((s) => [...s]);
    if (allIds.length) {
      const latest = await PracticeAttempt.aggregate([
        { $match: { user_id: String(userId), question_id: { $in: allIds.map((id) => new mongoose.Types.ObjectId(id)) } } },
        { $sort: { created_at: -1 } },
        { $group: { _id: '$question_id', correct: { $first: '$correct' } } },
      ]);
      const keyOf = new Map();
      for (const [key, set] of examPyq.idsByKey) for (const id of set) keyOf.set(id, key);
      for (const a of latest) {
        if (!a.correct) continue;
        const k = keyOf.get(String(a._id));
        if (k) solvedByKey.set(k, (solvedByKey.get(k) ?? 0) + 1);
      }
    }
  }

  // Bank size + this student's distinct answered questions for EVERY chapter,
  // so chapters outside the base syllabus scope still carry honest progress.
  const bankRows = await Question.aggregate([
    { $match: { status: 'PUBLISHED' } },
    { $group: { _id: { subject: '$subject', topic: '$topic' }, n: { $sum: 1 } } },
  ]);
  const bankByKey = new Map(bankRows.map((r) => [`${r._id.subject}.${r._id.topic}`, r.n]));
  const ansRows = await PracticeAttempt.aggregate([
    { $match: { user_id: String(userId) } },
    { $group: { _id: { subject: '$subject', topic: '$topic' }, qids: { $addToSet: '$question_id' } } },
  ]);
  const answeredByKey = new Map(ansRows.map((r) => [`${r._id.subject}.${r._id.topic}`, r.qids.length]));

  // Mastery, exactly as the insights/mastery map computes it.
  // F9: the unified stage per chapter (mastery.service), plus the insights
  // row for its recent-answer counts — both from the same answers.
  const answersAll = await answersOf(userId);
  const unified = await chapterMastery(userId, { answers: answersAll });
  const masteryByKey = new Map(buildMastery(answersAll, unified).map((m) => [`${m.subject}.${m.topic}`, m]));

  const lessons = new Set(loadLessons().map(({ lesson }) => `${lesson.subject}.${lesson.topic}`));

  const coverage = {
    chapters: { total: 0, in: 0, supplementary: 0, out: 0, unmapped: 0, withPriority: 0, withWeight: 0 },
    subtopics: { total: 0, mapped: 0, unmapped: 0 },
  };
  const unmappedTopics = [];

  const subjects = (category.subjects || []).map((catSubject) => {
    const subjectCode = catSubject.code;
    const baseSubject = baseSubjectByCode.get(subjectCode);
    const chapters = (catSubject.topics || []).map((t) => {
      const key = `${subjectCode}.${t.code}`;
      const b = baseByKey.get(key);
      const bankCount = b?.bankCount ?? bankByKey.get(key) ?? 0;
      const answered = b?.answered ?? answeredByKey.get(key) ?? 0;
      const completion = b?.completion ?? (bankCount ? round1((answered / bankCount) * 100) : null);
      const pyqCount = examPyq ? examPyq.countByKey.get(key) ?? 0 : b?.pyqCount ?? 0;
      let weight = b?.weight ?? null;
      let weightSource = b?.weightSource ?? null;
      if (weight == null && examPyq) {
        const subjectRefs = examPyq.refBySubject.get(subjectCode) ?? 0;
        if (subjectRefs) {
          weight = round1(((examPyq.refByKey.get(key) ?? 0) / subjectRefs) * 100);
          weightSource = 'pyq';
        }
      }
      const verdict = chapterVerdict({ examCode, subject: subjectCode, topic: t.code, topicNode: t, plan, patternSubjects, pyqCount });
      const level = priorities.subjects?.[subjectCode]?.topics?.[t.code]?.level ?? null;
      const priority = level ? PRIORITY_OF_LEVEL[level] : null;
      const masteryRow = masteryByKey.get(key) ?? null;
      const mastery = masteryRow
        ? {
          stage: masteryRow.stage ?? 'not_started',
          score: masteryRow.score ?? null,
          next: masteryRow.next ?? null,
          status: masteryRow.status,
          accuracyPct: masteryRow.accuracyPct,
          recentAnswers: masteryRow.recentAnswers,
          answers: masteryRow.answers,
        }
        : { stage: 'not_started', score: null, next: null, status: 'not_started', accuracyPct: null, recentAnswers: 0, answers: 0 };
      // "mastered" only when the unified stage says so (F9) — no longer from
      // ten good answers; a chapter read but not practised is in progress.
      const status = mastery.stage === 'mastered'
        ? 'mastered'
        : completion != null && completion >= 100
          ? 'completed'
          : mastery.stage !== 'not_started' || answered > 0
            ? 'in_progress'
            : 'not_started';
      const subtopics = (t.subtopics || []).map((u) => {
        const v = subtopicVerdict(u);
        coverage.subtopics.total += 1;
        if (v.status === 'unmapped') coverage.subtopics.unmapped += 1;
        else coverage.subtopics.mapped += 1;
        return { code: u.code, name: compactLocalized(u.name), syllabus: v.status, basis: v.basis };
      });

      coverage.chapters.total += 1;
      coverage.chapters[verdict.status] += 1;
      if (priority) coverage.chapters.withPriority += 1;
      if (weight != null) coverage.chapters.withWeight += 1;
      if (verdict.status === 'unmapped') unmappedTopics.push(key);

      return {
        topic: t.code,
        name: compactLocalized(t.name),
        syllabus: verdict.status,
        syllabusBasis: verdict.basis,
        ...(verdict.note ? { syllabusNote: verdict.note } : {}),
        ...(verdict.sourceUrl ? { syllabusSourceUrl: verdict.sourceUrl } : {}),
        priority,
        priorityLevel: level,
        weight,
        weightSource,
        pyqCount,
        pyqSolved: b?.pyqSolved ?? solvedByKey.get(key) ?? 0,
        bankCount,
        answered,
        completion,
        hasLesson: b?.hasLesson ?? lessons.has(key),
        status,
        mastery,
        subtopics,
      };
    });
    return {
      subject: subjectCode,
      name: compactLocalized(catSubject.name),
      weight: baseSubject?.weight ?? null,
      weightSource: baseSubject?.weightSource ?? null,
      inPattern: patternSubjects ? patternSubjects.has(subjectCode) : null,
      ...(baseSubject?.note ? { note: baseSubject.note } : {}),
      chapters,
    };
  });

  const dataGaps = [];
  if (coverage.chapters.unmapped) {
    dataGaps.push(`${coverage.chapters.unmapped} of ${coverage.chapters.total} chapters have no verified syllabus mapping for this exam yet — they are flagged "unmapped", not guessed.`);
  }
  if (coverage.subtopics.unmapped) {
    dataGaps.push(`${coverage.subtopics.unmapped} of ${coverage.subtopics.total} topics (subtopics) have no official syllabus mapping recorded in the catalogue.`);
  }
  if (!pyqName) {
    dataGaps.push('No previous-year questions for this exam are in the bank yet, so chapter priorities and PYQ-based weights cannot be computed for it.');
  } else if (coverage.chapters.withPriority < coverage.chapters.total) {
    dataGaps.push(`Priorities are PYQ-based: ${coverage.chapters.total - coverage.chapters.withPriority} chapters have no ${exam.name?.en ?? examCode} PYQs in the bank, so no priority is stated for them.`);
  }
  if (!base.pattern) {
    dataGaps.push('No official written-paper pattern is recorded for this exam yet, so subject weights are not stated.');
  }

  return {
    exam: {
      code: examCode,
      name: compactLocalized(exam.name),
      fullName: compactLocalized(exam.full_name),
      category: category.code,
      categoryName: compactLocalized(category.name),
      support: base.exam.support,
      hasPlan: Boolean(plan),
      isTarget: target?.code === examCode,
    },
    pattern: base.pattern,
    priorityRule: priorities.rule ?? null,
    priorityPaperCount: priorities.paperCount ?? 0,
    subjects,
    coverage,
    unmappedTopics,
    dataGaps,
    readiness: base.readiness,
  };
}

module.exports = { getSyllabusMap, clearSyllabusMapCache, chapterVerdict, PRIORITY_OF_LEVEL };
