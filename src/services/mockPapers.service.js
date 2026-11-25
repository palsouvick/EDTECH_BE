'use strict';

const crypto = require('node:crypto');
const { MockPaper, MockPaperAttempt } = require('../models');
const AppError = require('../utils/AppError');
const { parsePaperText } = require('./mockPaperParser');

const BENGALI_RE = /[\u0980-\u09FF]/;
const FIGURE_RE = /figure|diagram|table|graph|picture|চিত্র|ছবি/i;
const WARNING_VALUES = ['option_count', 'duplicate_stem', 'figure_reference', 'answer_out_of_range'];

function hasBengali(text) {
  return Boolean(text) && BENGALI_RE.test(text);
}

/** Language derived server-side from the questions: all EN-only -> en, all BN-only -> bn, else both. */
function deriveLanguage(questions) {
  let anyEn = false;
  let anyBn = false;
  for (const q of questions || []) {
    // Each stem counts by its script, whichever bucket it was stored in.
    for (const stem of [q.stem_en, q.stem_bn]) {
      if (!stem || !stem.trim()) continue;
      if (hasBengali(stem)) anyBn = true;
      else anyEn = true;
    }
  }
  if (anyEn && anyBn) return 'both';
  if (anyBn) return 'bn';
  return 'en';
}

function normaliseStem(question) {
  const stemEn = question.stem_en ?? question.stemEn ?? null;
  const stemBn = question.stem_bn ?? question.stemBn ?? null;
  return `${stemEn || ''} ${stemBn || ''}`
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.!?,;:।]+$/, '')
    .trim();
}

/**
 * Recompute the duplicate_stem and figure_reference warnings on every save.
 * Warnings sent by the client are kept only when they are valid enum values;
 * option_count and answer_out_of_range are recomputed from the data too, so
 * a stored question can never claim a warning its content contradicts.
 */
function recomputeWarnings(questions) {
  const counts = new Map();
  for (const q of questions) {
    const key = normaliseStem(q);
    if (key) counts.set(key, (counts.get(key) || 0) + 1);
  }
  return questions.map((q) => {
    const warnings = new Set((q.warnings || []).filter((w) => WARNING_VALUES.includes(w)));
    const options = q.options || [];
    if (options.length !== 4) warnings.add('option_count');
    else warnings.delete('option_count');
    if (q.correct_index !== null && q.correct_index !== undefined && (q.correct_index < 0 || q.correct_index >= options.length)) {
      warnings.add('answer_out_of_range');
    } else {
      warnings.delete('answer_out_of_range');
    }
    const stemText = `${q.stem_en || ''} ${q.stem_bn || ''}`;
    if (FIGURE_RE.test(stemText) || options.some((t) => FIGURE_RE.test(t))) warnings.add('figure_reference');
    else warnings.delete('figure_reference');
    const key = normaliseStem(q);
    if (key && counts.get(key) > 1) warnings.add('duplicate_stem');
    else warnings.delete('duplicate_stem');
    return { ...q, warnings: [...warnings] };
  });
}

function toStoredQuestion(q) {
  return {
    n: q.n,
    stem_en: q.stemEn ?? null,
    stem_bn: q.stemBn ?? null,
    options: [...q.options],
    correct_index: q.correctIndex ?? null,
    explanation_en: q.explanationEn ?? null,
    explanation_bn: q.explanationBn ?? null,
    warnings: [...(q.warnings || [])],
  };
}

function toStoredEditQuestion(q) {
  return {
    n: q.n,
    stem_en: q.stemEn ?? null,
    stem_bn: q.stemBn ?? null,
    options: [...q.options],
    correct_index: q.correctIndex ?? null,
    explanation_en: q.explanationEn ?? null,
    explanation_bn: q.explanationBn ?? null,
    warnings: [...(q.warnings || [])],
  };
}

function presentAdminPaper(paper) {
  return {
    id: String(paper._id),
    title: paper.title,
    sourceLabel: paper.source_label,
    subject: paper.subject ?? null,
    language: paper.language,
    status: paper.status,
    questions: (paper.questions || []).map((q) => ({
      n: q.n,
      stemEn: q.stem_en ?? null,
      stemBn: q.stem_bn ?? null,
      options: [...q.options],
      correctIndex: q.correct_index ?? null,
      explanationEn: q.explanation_en ?? null,
      explanationBn: q.explanation_bn ?? null,
      warnings: [...(q.warnings || [])],
    })),
    unparsed: (paper.unparsed || []).map((u) => ({ text: u.text })),
    createdAt: paper.created_at,
    updatedAt: paper.updated_at,
  };
}

function presentSummary(paper) {
  return {
    id: String(paper._id),
    title: paper.title,
    sourceLabel: paper.source_label,
    subject: paper.subject ?? null,
    language: paper.language,
    questionCount: (paper.questions || []).length,
    timeLimitMin: (paper.questions || []).length,
    createdAt: paper.created_at,
  };
}

function presentAttemptSummary(attempt) {
  return {
    id: String(attempt._id),
    startedAt: attempt.started_at,
    submittedAt: attempt.submitted_at ?? null,
    score: attempt.score ?? null,
    total: attempt.total,
    status: attempt.status,
  };
}

function shuffleOrder(count) {
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

async function getPaperOr404(paperId) {
  const paper = await MockPaper.findById(paperId).lean();
  if (!paper) throw AppError.notFound('PAPER_NOT_FOUND', 'Mock paper not found');
  return paper;
}

async function getPublishedPaperOr404(paperId) {
  const paper = await MockPaper.findOne({ _id: paperId, status: 'PUBLISHED' }).lean();
  if (!paper) throw AppError.notFound('PAPER_NOT_FOUND', 'Mock paper not found');
  return paper;
}

async function getAttemptOr404(attemptId, userId) {
  const attempt = await MockPaperAttempt.findOne({ _id: attemptId, user_id: userId }).lean();
  if (!attempt) throw AppError.notFound('ATTEMPT_NOT_FOUND', 'Mock paper attempt not found');
  return attempt;
}

// ------------------------------------------------------------------ admin

async function listAdminPapers() {
  const papers = await MockPaper.find({}).sort({ created_at: -1 }).lean();
  return {
    papers: papers.map((p) => ({
      id: String(p._id),
      title: p.title,
      sourceLabel: p.source_label,
      subject: p.subject ?? null,
      language: p.language,
      status: p.status,
      questionCount: (p.questions || []).length,
      missingAnswerCount: (p.questions || []).filter((q) => q.correct_index === null || q.correct_index === undefined).length,
      unparsedCount: (p.unparsed || []).length,
      createdAt: p.created_at,
    })),
  };
}

async function createPaper({ title, sourceLabel, subject, text }, createdBy) {
  const { questions, unparsed } = parsePaperText(text);
  const stored = recomputeWarnings(questions.map(toStoredQuestion));
  const paper = await MockPaper.create({
    title,
    source_label: sourceLabel,
    subject: subject ?? null,
    language: deriveLanguage(stored),
    status: 'DRAFT',
    created_by: createdBy,
    questions: stored,
    unparsed: unparsed.map((u) => ({ text: u.text })),
  });
  return { paper: presentAdminPaper(paper.toObject()) };
}

async function getAdminPaper(paperId) {
  const paper = await getPaperOr404(paperId);
  return { paper: presentAdminPaper(paper) };
}

async function updatePaper(paperId, body) {
  const paper = await MockPaper.findById(paperId);
  if (!paper) throw AppError.notFound('PAPER_NOT_FOUND', 'Mock paper not found');
  if (paper.status !== 'DRAFT') {
    throw AppError.conflict('PAPER_NOT_EDITABLE', 'Only a draft paper can be edited');
  }
  if (await MockPaperAttempt.exists({ paper_id: paper._id })) {
    throw AppError.conflict('PAPER_NOT_EDITABLE', 'A paper with attempts cannot be edited');
  }
  if (body.title !== undefined) paper.title = body.title;
  if (body.sourceLabel !== undefined) paper.source_label = body.sourceLabel;
  if (body.subject !== undefined) paper.subject = body.subject;
  if (body.questions !== undefined) {
    paper.questions = recomputeWarnings(body.questions.map(toStoredEditQuestion));
    paper.language = deriveLanguage(paper.questions);
  }
  if (body.unparsed !== undefined) paper.unparsed = body.unparsed.map((u) => ({ text: u.text }));
  await paper.save();
  return { paper: presentAdminPaper(paper.toObject()) };
}

async function publishPaper(paperId) {
  const paper = await MockPaper.findById(paperId);
  if (!paper) throw AppError.notFound('PAPER_NOT_FOUND', 'Mock paper not found');
  if ((paper.questions || []).length === 0) {
    throw AppError.conflict('EMPTY_PAPER', 'A paper with no questions cannot be published');
  }
  if ((paper.questions || []).some((q) => q.correct_index === null || q.correct_index === undefined)) {
    throw AppError.conflict('MISSING_ANSWERS', 'Every question needs an answer before publishing');
  }
  if ((paper.unparsed || []).length > 0) {
    throw AppError.conflict('UNPARSED_BLOCKS', 'Unparsed blocks must be fixed or discarded before publishing');
  }
  paper.status = 'PUBLISHED';
  await paper.save();
  return { paper: presentAdminPaper(paper.toObject()) };
}

async function unpublishPaper(paperId) {
  const paper = await MockPaper.findById(paperId);
  if (!paper) throw AppError.notFound('PAPER_NOT_FOUND', 'Mock paper not found');
  paper.status = 'DRAFT';
  await paper.save();
  return { paper: presentAdminPaper(paper.toObject()) };
}

async function deletePaper(paperId) {
  const paper = await MockPaper.findById(paperId);
  if (!paper) throw AppError.notFound('PAPER_NOT_FOUND', 'Mock paper not found');
  if (paper.status !== 'DRAFT') {
    throw AppError.conflict('PAPER_NOT_EDITABLE', 'Only a draft paper can be deleted');
  }
  if (await MockPaperAttempt.exists({ paper_id: paper._id })) {
    throw AppError.conflict('PAPER_HAS_ATTEMPTS', 'A paper with attempts cannot be deleted');
  }
  await MockPaper.deleteOne({ _id: paper._id });
  return { deleted: true };
}

// ------------------------------------------------------------------ student

async function listPapers(userId) {
  const papers = await MockPaper.find({ status: 'PUBLISHED' }).sort({ created_at: -1 }).lean();
  const ids = papers.map((p) => p._id);
  const attempts = ids.length
    ? await MockPaperAttempt.find({ paper_id: { $in: ids }, user_id: userId }).select('paper_id score status').lean()
    : [];
  const byPaper = new Map();
  for (const a of attempts) {
    const key = String(a.paper_id);
    if (!byPaper.has(key)) byPaper.set(key, []);
    byPaper.get(key).push(a);
  }
  return {
    papers: papers.map((p) => {
      const mine = byPaper.get(String(p._id)) || [];
      const submitted = mine.filter((a) => a.status === 'SUBMITTED' && a.score !== null && a.score !== undefined);
      return {
        ...presentSummary(p),
        myAttempts: {
          count: mine.length,
          bestScore: submitted.length ? Math.max(...submitted.map((a) => a.score)) : null,
        },
      };
    }),
  };
}

async function getPaper(paperId, userId) {
  const paper = await getPublishedPaperOr404(paperId);
  const attempts = await MockPaperAttempt.find({ paper_id: paper._id, user_id: userId })
    .sort({ started_at: -1 })
    .lean();
  return {
    paper: presentSummary(paper),
    questions: (paper.questions || []).map((q) => ({
      n: q.n,
      stemEn: q.stem_en ?? null,
      stemBn: q.stem_bn ?? null,
      options: [...q.options],
    })),
    myAttempts: attempts.map(presentAttemptSummary),
  };
}

async function listMyAttempts(paperId, userId) {
  await getPublishedPaperOr404(paperId);
  const attempts = await MockPaperAttempt.find({ paper_id: paperId, user_id: userId })
    .sort({ started_at: -1 })
    .lean();
  return { attempts: attempts.map(presentAttemptSummary) };
}

function questionsInOrder(paper, order) {
  return order.map((questionIndex) => {
    const q = paper.questions[questionIndex];
    return {
      questionIndex,
      n: q.n,
      stemEn: q.stem_en ?? null,
      stemBn: q.stem_bn ?? null,
      options: [...q.options],
    };
  });
}

async function startAttempt(paperId, userId) {
  const paper = await getPublishedPaperOr404(paperId);
  const order = shuffleOrder(paper.questions.length);
  const attempt = await MockPaperAttempt.create({
    paper_id: paper._id,
    user_id: userId,
    order,
    answers: [],
    status: 'ACTIVE',
    score: null,
    total: paper.questions.length,
    time_limit_min: paper.questions.length,
    started_at: new Date(),
    submitted_at: null,
  });
  return {
    attempt: {
      id: String(attempt._id),
      paperId: String(paper._id),
      order: [...attempt.order],
      timeLimitMin: attempt.time_limit_min,
      startedAt: attempt.started_at,
    },
    questions: questionsInOrder(paper, order),
  };
}

async function getAttempt(attemptId, userId) {
  const attempt = await getAttemptOr404(attemptId, userId);
  // An owned attempt stays readable even if the paper was later unpublished;
  // ownership (not publication) is what guards this route.
  const paper = await getPaperOr404(attempt.paper_id);
  if (attempt.status === 'SUBMITTED') {
    return buildResult(paper, attempt);
  }
  return {
    attempt: {
      id: String(attempt._id),
      paperId: String(paper._id),
      order: [...attempt.order],
      timeLimitMin: attempt.time_limit_min,
      startedAt: attempt.started_at,
    },
    questions: questionsInOrder(paper, attempt.order),
  };
}

function buildResult(paper, attempt) {
  const byIndex = new Map((attempt.answers || []).map((a) => [a.question_index, a.selected ?? null]));
  const review = attempt.order.map((questionIndex) => {
    const q = paper.questions[questionIndex];
    const selected = byIndex.has(questionIndex) ? byIndex.get(questionIndex) : null;
    return {
      questionIndex,
      n: q.n,
      stemEn: q.stem_en ?? null,
      stemBn: q.stem_bn ?? null,
      options: [...q.options],
      selected,
      correctIndex: q.correct_index ?? null,
      correct: selected !== null && selected !== undefined && selected === q.correct_index,
      explanationEn: q.explanation_en ?? null,
      explanationBn: q.explanation_bn ?? null,
    };
  });
  const timeUsedSec = attempt.submitted_at && attempt.started_at
    ? Math.max(0, Math.round((new Date(attempt.submitted_at) - new Date(attempt.started_at)) / 1000))
    : 0;
  return {
    attempt: {
      id: String(attempt._id),
      score: attempt.score,
      total: attempt.total,
      timeUsedSec,
      submittedAt: attempt.submitted_at,
    },
    review,
  };
}

async function submitAttempt(attemptId, userId, answers) {
  // A full document (not lean): this is the one write in the attempt flow.
  const attempt = await MockPaperAttempt.findOne({ _id: attemptId, user_id: userId });
  if (!attempt) throw AppError.notFound('ATTEMPT_NOT_FOUND', 'Mock paper attempt not found');
  if (attempt.status === 'SUBMITTED') {
    throw AppError.conflict('ATTEMPT_ALREADY_SUBMITTED', 'This attempt has already been submitted');
  }
  const paper = await MockPaper.findById(attempt.paper_id).lean();
  if (!paper) throw AppError.notFound('PAPER_NOT_FOUND', 'Mock paper not found');

  // Range checks the schema cannot do: questionIndex must name a question
  // in this paper, and a non-null selected must name one of its options.
  for (const a of answers || []) {
    if (a.questionIndex < 0 || a.questionIndex >= paper.questions.length) {
      throw new AppError(400, 'VALIDATION_FAILED', 'questionIndex is out of range');
    }
    const optionCount = paper.questions[a.questionIndex].options.length;
    if (a.selected !== null && a.selected !== undefined && (a.selected < 0 || a.selected >= optionCount)) {
      throw new AppError(400, 'VALIDATION_FAILED', 'selected is out of range for its question');
    }
  }

  const byIndex = new Map();
  for (const a of answers || []) byIndex.set(a.questionIndex, a.selected ?? null);
  const storedAnswers = attempt.order.map((questionIndex) => ({
    question_index: questionIndex,
    selected: byIndex.has(questionIndex) ? byIndex.get(questionIndex) : null,
  }));
  let score = 0;
  for (const a of storedAnswers) {
    const q = paper.questions[a.question_index];
    if (q && a.selected !== null && a.selected !== undefined && a.selected === q.correct_index) score += 1;
  }
  const submittedAt = new Date();
  attempt.answers = storedAnswers;
  attempt.status = 'SUBMITTED';
  attempt.score = score;
  attempt.submitted_at = submittedAt;
  await attempt.save();
  return buildResult(paper, attempt.toObject());
}

module.exports = {
  deriveLanguage,
  recomputeWarnings,
  listAdminPapers,
  createPaper,
  getAdminPaper,
  updatePaper,
  publishPaper,
  unpublishPaper,
  deletePaper,
  listPapers,
  getPaper,
  listMyAttempts,
  startAttempt,
  getAttempt,
  submitAttempt,
};
