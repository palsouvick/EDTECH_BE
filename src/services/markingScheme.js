'use strict';

const catalog = require('../../db/seed/catalog');
const AppError = require('../utils/AppError');

/**
 * Marking for a mock test, decided on the server from the exam patterns in
 * db/seed/exams.js (each read from the commission's notice, linked by
 * source_url). The browser never chooses marks.
 *
 * Only the first stage (Tier-I / Prelims / Part-I) is used: that is what a
 * single-subject mock imitates. A section counts when it states marks per
 * question; its negative marks count only when the notice states the amount.
 *
 * basis:
 *   OFFICIAL                marks and negative marks both from the notice
 *   OFFICIAL_NO_NEGATIVE    marks from the notice; it confirms negative marking
 *                           without the amount, so none is deducted (never guessed)
 *   PRACTICE                no verified pattern covers this subject: +1, no negative
 */

const PRACTICE = Object.freeze({ positive: 1, negative: 0, basis: 'PRACTICE', examCode: null, sourceUrl: null, patternAsOf: null });

function sectionMarking(exam, subject) {
  const stage = exam.stages?.[0];
  const section = stage?.sections?.find((s) => s.subject === subject && typeof s.marks_per_question === 'number');
  if (!section) return null;
  const negativeStated = typeof section.negative_marks === 'number';
  return {
    positive: section.marks_per_question,
    negative: negativeStated ? section.negative_marks : 0,
    basis: negativeStated ? 'OFFICIAL' : 'OFFICIAL_NO_NEGATIVE',
    examCode: exam.code,
    sourceUrl: exam.source_url ?? null,
    patternAsOf: exam.pattern_as_of ?? null,
  };
}

/**
 * @param {{ category: string, subject: string, examCode?: string }} params
 * With examCode: that exam's marking, or 422 when the exam is not in the
 * category or does not test the subject. Without: the category's first exam
 * (catalogue order) with fully stated marking for the subject, then one with
 * marks only, then the practice default.
 */
function resolveMarking({ category, subject, examCode }) {
  const exams = catalog.find((c) => c.code === category)?.exams ?? [];
  if (examCode) {
    const exam = exams.find((e) => e.code === examCode);
    if (!exam) throw AppError.unprocessable('UNKNOWN_EXAM', `${examCode} is not an exam in ${category}`);
    const marking = sectionMarking(exam, subject);
    if (!marking) throw AppError.unprocessable('SUBJECT_NOT_IN_EXAM', `${examCode} has no ${subject} section with stated marks`);
    return marking;
  }
  const candidates = exams.map((e) => sectionMarking(e, subject)).filter(Boolean);
  return candidates.find((m) => m.basis === 'OFFICIAL') ?? candidates[0] ?? PRACTICE;
}

module.exports = { resolveMarking };
