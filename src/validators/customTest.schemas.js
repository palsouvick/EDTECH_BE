'use strict';

const { z } = require('zod');
const { language, slug, objectId, optionId } = require('./common');
const L = require('../services/customTest.logic');
const S = require('../services/stuck.logic');

const subject = z.enum(L.SUBJECTS);

// PYQ-only tests (preset 'pyq'): exam is one of the three exams with real papers
// (or omitted = all West Bengal exams); year is 'all', 'recent' (5 most recent years
// in the pool), one year, or a from/to range; repeatMode is how already-seen PYQs
// are treated. These fields are ignored by every other preset.
const pyqExam = z.enum(L.PYQ_EXAMS).optional();
const pyqYear = z.union([z.literal('all'), z.literal('recent'), z.number().int().min(1990).max(2100)]).optional();
const pyqYearBound = z.number().int().min(1990).max(2100).optional();

// Settings left out take the service's defaults (20 questions, exam level, smart split, exam mode).
const testBody = z
  .object({
    subject,
    preset: z.enum(L.PRESETS).default('custom'),
    topics: z.array(slug).max(40).default([]),
    questionCount: z.number().int().min(L.MIN_QUESTIONS).max(L.MAX_QUESTIONS).optional(),
    difficulty: z.enum(L.DIFFICULTIES).optional(),
    distribution: z.enum(['balanced', 'smart']).optional(),
    mode: z.enum(['exam', 'practice']).optional(),
    // Omitted = the smart time for the questions actually picked.
    // Explicit null = no time limit (an untimed test).
    timeLimitMinutes: z.number().int().min(1).max(300).nullable().optional(),
    followUpOf: objectId.optional(),
    language: language.default('en'),
    pyqExam,
    pyqYear,
    pyqYearFrom: pyqYearBound,
    pyqYearTo: pyqYearBound,
    repeatMode: z.enum(L.PYQ_REPEAT_MODES).optional(),
    // Practice My Weakness (preset 'stuck', Math): the kind of practice and its level. Level
    // omitted = the adaptive level (stuck.logic nextLevel / startLevel). Ignored by other presets.
    stuckMode: z.enum(S.MODES).optional(),
    stuckLevel: z.enum(S.LEVELS).optional(),
  })
  .transform((b) => ({ ...b, topics: [...new Set(b.topics)] }));

const optionsQuery = z.object({ subject, language: language.default('en') });
const historyQuery = z.object({ subject });
const sessionParams = z.object({ sessionId: objectId });
// questionId is the alias the live screen shows (or a real id): any 24-hex string.
const checkBody = z.object({ questionId: objectId, selectedOptionId: optionId });

module.exports = { testBody, optionsQuery, historyQuery, sessionParams, checkBody };
