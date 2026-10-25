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
const OFFICIAL_URL = '^https://([a-z0-9-]+\\.)*(psc\\.wb\\.gov\\.in|wbpsc\\.gov\\.in|ssc\\.gov\\.in|ssc\\.nic\\.in|ibps\\.in|sbi\\.co\\.in|bank\\.sbi|indiapost\\.gov\\.in|wbssc\\.gov\\.in|wbsc\\.gov\\.in)([:/?#]|$)';
const WBPSC_EXAM = '^(WBCS\\b|WBPSC\\b|Clerkship\\b|Miscellaneous\\b)';
const WBCS_EXAM = '^WBCS\\b';

function countFor(value) {
  return {
    questionCount: value?.questions ?? 0,
    pyqCount: value?.verifiedPyqs ?? 0,
    verifiedPyqCount: value?.verifiedPyqs ?? 0,
    wbcsPyqCount: value?.wbcsPyqs ?? 0,
    otherWbpscPyqCount: value?.otherWbpscPyqs ?? 0,
    adaptedPyqCount: value?.adaptedPyqs ?? 0,
    originalPracticeCount: value?.originalPractice ?? 0,
    unclassifiedCount: value?.unclassified ?? 0,
  };
}

const loadCategories = () =>
  cache.get('categories', () => ExamCategory.find({ is_active: true }).sort({ display_order: 1 }).lean());

async function findCategory(code) {
  const cat = (await loadCategories()).find((c) => c.code === code);
  if (!cat) throw AppError.notFound('CATEGORY_NOT_FOUND', `Unknown exam category ${code}`);
  return cat;
}

/** Map each topic and subtopic to distinct published-question provenance counts. */
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
        $addFields: {
          verifiedRefs: {
            $filter: {
              input: { $ifNull: ['$pyq.refs', []] },
              as: 'ref',
              cond: {
                $and: [
                  { $not: [{ $regexMatch: { input: { $ifNull: ['$$ref.question_code', ''] }, regex: '-SYN-', options: 'i' } }] },
                  { $regexMatch: { input: { $ifNull: ['$$ref.source_url', ''] }, regex: OFFICIAL_URL, options: 'i' } },
                  { $regexMatch: { input: { $ifNull: ['$$ref.answer_key_url', ''] }, regex: OFFICIAL_URL, options: 'i' } },
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          effectiveProvenance: {
            $ifNull: [
              '$provenance',
              {
                $switch: {
                  branches: [
                    { case: { $gt: [{ $size: '$verifiedRefs' }, 0] }, then: 'OFFICIAL_VERIFIED' },
                    {
                      case: {
                        $or: [
                          { $anyElementTrue: [{ $map: { input: { $ifNull: ['$pyq.refs', []] }, as: 'ref', in: { $regexMatch: { input: { $ifNull: ['$$ref.question_code', ''] }, regex: '-SYN-', options: 'i' } } } }] },
                          { $eq: ['$authored_by', 'seed_generator'] },
                          { $regexMatch: { input: { $ifNull: ['$authored_by', ''] }, regex: '^bulk-import:' } },
                          { $eq: ['$authored_by', 'import:exam-style-json'] },
                        ],
                      },
                      then: 'ORIGINAL_PRACTICE',
                    },
                  ],
                  default: 'UNCLASSIFIED',
                },
              },
            ],
          },
        },
      },
      {
        $group: {
          _id: { subject: '$subject', topic: '$topic', subtopic: '$subtopic' },
          questions: { $sum: 1 },
          verifiedPyqs: { $sum: { $cond: [{ $gt: [{ $size: '$verifiedRefs' }, 0] }, 1, 0] } },
          wbcsPyqs: {
            $sum: {
              $cond: [{
                $gt: [{
                  $size: {
                    $filter: {
                      input: '$verifiedRefs',
                      as: 'ref',
                      cond: { $regexMatch: { input: '$$ref.exam_name', regex: WBCS_EXAM, options: 'i' } },
                    },
                  },
                }, 0],
              }, 1, 0],
            },
          },
          otherWbpscPyqs: {
            $sum: {
              $cond: [{
                $gt: [{
                  $size: {
                    $filter: {
                      input: '$verifiedRefs',
                      as: 'ref',
                      cond: {
                        $and: [
                          { $regexMatch: { input: '$$ref.exam_name', regex: WBPSC_EXAM, options: 'i' } },
                          { $not: [{ $regexMatch: { input: '$$ref.exam_name', regex: WBCS_EXAM, options: 'i' } }] },
                        ],
                      },
                    },
                  },
                }, 0],
              }, 1, 0],
            },
          },
          adaptedPyqs: { $sum: { $cond: [{ $eq: ['$effectiveProvenance', 'ADAPTED_PYQ'] }, 1, 0] } },
          originalPractice: { $sum: { $cond: [{ $eq: ['$effectiveProvenance', 'ORIGINAL_PRACTICE'] }, 1, 0] } },
          unclassified: { $sum: { $cond: [{ $eq: ['$effectiveProvenance', 'UNCLASSIFIED'] }, 1, 0] } },
          avgDifficulty: { $avg: '$difficulty' },
        },
      },
    ]);
    const counts = new Map();
    for (const row of rows) {
      const topicKey = `${row._id.subject}.${row._id.topic}`;
      const topicTotal = counts.get(topicKey) || {
        questions: 0, verifiedPyqs: 0, wbcsPyqs: 0, otherWbpscPyqs: 0,
        adaptedPyqs: 0, originalPractice: 0, unclassified: 0, difficultyTotal: 0,
      };
      topicTotal.questions += row.questions;
      topicTotal.verifiedPyqs += row.verifiedPyqs;
      topicTotal.wbcsPyqs += row.wbcsPyqs;
      topicTotal.otherWbpscPyqs += row.otherWbpscPyqs;
      topicTotal.adaptedPyqs += row.adaptedPyqs;
      topicTotal.originalPractice += row.originalPractice;
      topicTotal.unclassified += row.unclassified;
      topicTotal.difficultyTotal += row.avgDifficulty * row.questions;
      counts.set(topicKey, topicTotal);
      if (row._id.subtopic) counts.set(`${topicKey}.${row._id.subtopic}`, row);
    }
    for (const value of counts.values()) {
      if (value.difficultyTotal !== undefined) {
        value.avgDifficulty = value.questions ? value.difficultyTotal / value.questions : null;
        delete value.difficultyTotal;
      }
    }
    return counts;
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
  const totals = {
    questions: 0, verifiedPyqs: 0, wbcsPyqs: 0, otherWbpscPyqs: 0,
    adaptedPyqs: 0, originalPractice: 0, unclassified: 0,
  };
  for (const t of subject.topics) {
    const c = counts.get(`${subject.code}.${t.code}`);
    for (const key of Object.keys(totals)) totals[key] += c?.[key] ?? 0;
  }
  return totals;
}

async function listCategories(language) {
  const cats = await loadCategories();
  return {
    language,
    categories: await Promise.all(
      cats.map(async (c) => {
        const counts = await topicCounts(c.code, language);
        const totals = c.subjects.reduce((acc, subject) => {
          const subjectCount = subjectTotals(subject, counts);
          for (const key of Object.keys(acc)) acc[key] += subjectCount[key];
          return acc;
        }, { questions: 0, verifiedPyqs: 0, wbcsPyqs: 0, otherWbpscPyqs: 0, adaptedPyqs: 0, originalPractice: 0, unclassified: 0 });
        return {
          code: c.code,
          name: compactLocalized(c.name),
          conductingBody: compactLocalized(c.conducting_body),
          exams: c.exams.filter((e) => e.is_active !== false).map(presentExam),
          subjectCount: c.subjects.length,
          ...countFor(totals),
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
        ...countFor(totals),
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
        syllabusStatus: t.syllabus_status || 'UNVERIFIED',
        ...countFor(c),
        avgDifficulty: c ? Math.round(c.avgDifficulty * 10) / 10 : null,
        difficulty: difficultyLevel(c?.avgDifficulty),
        hasSummary: summaries.has(`${subject.code}.${t.code}`),
        subtopics: (t.subtopics || []).map((subtopic) => ({
          code: subtopic.code,
          name: compactLocalized(subtopic.name),
          syllabusStatus: subtopic.syllabus_status || 'UNVERIFIED',
          ...countFor(counts.get(`${subject.code}.${t.code}.${subtopic.code}`)),
        })),
      };
    }),
  };
}

module.exports = { listCategories, getCategory, getSubject, difficultyLevel, clearCatalogCache: cache.clear };
