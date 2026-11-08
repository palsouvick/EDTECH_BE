'use strict';

const { z } = require('zod');
const { language, slug, objectId, optionId } = require('./common');
const L = require('../services/customTest.logic');

const subject = z.enum(L.SUBJECTS);

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
    timeLimitMinutes: z.number().int().min(1).max(300).optional(),
    followUpOf: objectId.optional(),
    language: language.default('en'),
  })
  .transform((b) => ({ ...b, topics: [...new Set(b.topics)] }));

const optionsQuery = z.object({ subject, language: language.default('en') });
const historyQuery = z.object({ subject });
const sessionParams = z.object({ sessionId: objectId });
// questionId is the alias the live screen shows (or a real id): any 24-hex string.
const checkBody = z.object({ questionId: objectId, selectedOptionId: optionId });

module.exports = { testBody, optionsQuery, historyQuery, sessionParams, checkBody };
