'use strict';

const { ExamCategory, Question, TopicSummary } = require('../models');
const { langSetsContaining } = require('../models/schemas/localized');
const AppError = require('../utils/AppError');
const { createTtlCache } = require('../utils/ttlCache');
const { compactLocalized } = require('./presenters');

/**
 * Data for the selection funnel: categories -> subjects -> topics, with
 * question / PYQ counts and a difficulty level per topic.
 *
 * Counts are one $group over the category's published questions in the chosen
 * language, cached briefly per (category, language): they change only when
 * editors publish.
 */
const cache = createTtlCache(5 * 60_000);

const loadCategories = () =>
  cache.get('categories', () => ExamCategory.find({ is_active: true }).sort({ display_order: 1 }).lean());

async function findCategory(code) {
  const cat = (await loadCategories()).find((c) => c.code === code);
  if (!cat) throw AppError.notFound('CATEGORY_NOT_FOUND', `Unknown exam category ${code}`);
  return cat;
}

/** Map "subject.topic" -> { questions, pyqs, avgDifficulty } for one category + language. */
function topicCounts(category, language) {
  return cache.get(`counts:${category}:${language}`, async () => {
    const rows = await Question.aggregate([
      {
        $match: {
          status: 'PUBLISHED',
          'exam_targets.category': category,
          lang_set: { $in: langSetsContaining(language) },
        },
      },
      {
        $group: {
          _id: { subject: '$subject', topic: '$topic' },
          questions: { $sum: 1 },
          // latest_pyq_year is set exactly when a question has PYQ refs, and it is an index key.
          pyqs: { $sum: { $cond: [{ $isNumber: '$latest_pyq_year' }, 1, 0] } },
          avgDifficulty: { $avg: '$difficulty' },
        },
      },
    ]);
    return new Map(rows.map((r) => [`${r._id.subject}.${r._id.topic}`, r]));
  });
}

const summarisedTopics = () =>
  cache.get('summaries', async () => {
    const rows = await TopicSummary.find({ status: 'PUBLISHED', subtopic: null }).select('subject topic').lean();
    return new Set(rows.map((r) => `${r.subject}.${r.topic}`));
  });

/** 1-5 average -> the three labels students recognise. */
function difficultyLevel(avg) {
  if (avg == null) return null;
  if (avg < 2.5) return 'EASY';
  if (avg < 3.5) return 'MODERATE';
  return 'HARD';
}

const presentExam = (e) => ({ code: e.code, name: compactLocalized(e.name) });

const presentStage = (st) => {
  const sections = (st.sections || []).map((x) => ({
    subject: x.subject,
    title: compactLocalized(x.title),
    questions: x.num_questions,
    marksEach: x.marks_per_question ?? null,
    marks: x.max_marks ?? x.num_questions * x.marks_per_question,
    negative: x.negative_marks ?? null, // null: not stated per question; see the stage's negativeNote
    sectionalMin: x.sectional_time_min ?? null,
    session: x.session ?? null,
    note: compactLocalized(x.note),
  }));
  return {
    tier: st.tier,
    name: compactLocalized(st.name),
    mode: st.mode,
    durationMin: st.duration_min ?? null,
    languagesNote: compactLocalized(st.languages_note),
    negativeNote: compactLocalized(st.negative_note),
    note: compactLocalized(st.note),
    sections,
    totalQuestions: sections.reduce((n, x) => n + x.questions, 0),
    totalMarks: sections.reduce((n, x) => n + x.marks, 0),
  };
};

/** Everything the exam info panel shows: pattern, past cycles, and where each fact came from. */
const presentExamDetail = (e) => ({
  ...presentExam(e),
  fullName: compactLocalized(e.full_name),
  selectionNote: compactLocalized(e.selection_note),
  stages: (e.stages || []).map(presentStage),
  nextStages: (e.next_stages || []).map(compactLocalized).filter(Boolean),
  patternAsOf: e.pattern_as_of ?? null,
  sourceUrl: e.source_url ?? null,
  cycles: (e.cycles || []).map((c) => ({
    year: c.year,
    stage: compactLocalized(c.stage),
    dates: c.dates ?? null,
    vacancies: c.vacancies ?? null,
    vacanciesNote: compactLocalized(c.vacancies_note),
    note: compactLocalized(c.note),
    sourceUrl: c.source_url,
    sourceType: c.source_type,
  })),
  notes: compactLocalized(e.notes),
});

function subjectTotals(subject, counts) {
  let questions = 0;
  let pyqs = 0;
  for (const t of subject.topics) {
    const c = counts.get(`${subject.code}.${t.code}`);
    questions += c?.questions ?? 0;
    pyqs += c?.pyqs ?? 0;
  }
  return { questions, pyqs };
}

async function listCategories(language) {
  const cats = await loadCategories();
  return {
    language,
    categories: await Promise.all(
      cats.map(async (c) => {
        const counts = await topicCounts(c.code, language);
        const questionCount = c.subjects.reduce((n, s) => n + subjectTotals(s, counts).questions, 0);
        return {
          code: c.code,
          name: compactLocalized(c.name),
          conductingBody: compactLocalized(c.conducting_body),
          exams: c.exams.filter((e) => e.is_active !== false).map(presentExam),
          subjectCount: c.subjects.length,
          questionCount,
        };
      }),
    ),
  };
}

async function getCategory(code, language) {
  const cat = await findCategory(code);
  const counts = await topicCounts(code, language);
  return {
    language,
    category: {
      code: cat.code,
      name: compactLocalized(cat.name),
      conductingBody: compactLocalized(cat.conducting_body),
      website: cat.website ?? null,
      exams: cat.exams.filter((e) => e.is_active !== false).map(presentExamDetail),
    },
    subjects: cat.subjects.map((s) => {
      const totals = subjectTotals(s, counts);
      return {
        code: s.code,
        name: compactLocalized(s.name),
        topicCount: s.topics.length,
        questionCount: totals.questions,
        pyqCount: totals.pyqs,
      };
    }),
  };
}

async function getSubject(code, subjectCode, language) {
  const cat = await findCategory(code);
  const subject = cat.subjects.find((s) => s.code === subjectCode);
  if (!subject) throw AppError.notFound('SUBJECT_NOT_FOUND', `Unknown subject ${subjectCode} for ${code}`);

  const [counts, summaries] = await Promise.all([topicCounts(code, language), summarisedTopics()]);
  return {
    language,
    category: { code: cat.code, name: compactLocalized(cat.name) },
    subject: { code: subject.code, name: compactLocalized(subject.name) },
    topics: subject.topics.map((t) => {
      const c = counts.get(`${subject.code}.${t.code}`);
      return {
        code: t.code,
        name: compactLocalized(t.name),
        questionCount: c?.questions ?? 0,
        pyqCount: c?.pyqs ?? 0,
        avgDifficulty: c ? Math.round(c.avgDifficulty * 10) / 10 : null,
        difficulty: difficultyLevel(c?.avgDifficulty),
        hasSummary: summaries.has(`${subject.code}.${t.code}`),
      };
    }),
  };
}

module.exports = { listCategories, getCategory, getSubject, difficultyLevel, clearCatalogCache: cache.clear };
