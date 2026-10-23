'use strict';

const { z } = require('zod');
const { language, category, slug, objectId, optionId } = require('./common');

// 20 is kept for existing clients; the CBT setup offers 10 / 25 / 50 / 100.
const QUESTION_COUNTS = [10, 20, 25, 50, 100];

const createSessionBody = z
  .object({
    category,
    subject: slug,
    // Topic slugs (e.g. "profit_loss"); empty = whole subject.
    topicIds: z.array(slug).max(25).default([]),
    questionCount: z.union(QUESTION_COUNTS.map((n) => z.literal(n)), {
      message: `questionCount must be one of ${QUESTION_COUNTS.join(', ')}`,
    }),
    // Overall mode: the total. Per-question mode: derived from perQuestionSeconds when omitted.
    timeLimitMinutes: z.number().int().min(1).max(300).optional(),
    perQuestionTimer: z.boolean().default(false),
    // Per-question mode: seconds each question gets (e.g. 45). Overrides the even split of timeLimitMinutes.
    perQuestionSeconds: z.number().int().min(10).max(600).optional(),
    allowPause: z.boolean().default(false),
    markingScheme: z
      .object({
        positive: z.number().positive().max(10),
        negative: z.number().min(0).max(10),
      })
      .default({ positive: 1, negative: 0.25 }),
    language: language.default('en'),
  })
  .refine((b) => b.markingScheme.negative <= b.markingScheme.positive, {
    path: ['markingScheme', 'negative'],
    message: 'negative marks cannot exceed positive marks',
  })
  .transform((b) =>
    b.perQuestionTimer && b.perQuestionSeconds && b.timeLimitMinutes === undefined
      ? { ...b, timeLimitMinutes: Math.ceil((b.questionCount * b.perQuestionSeconds) / 60) }
      : b,
  )
  .refine((b) => b.timeLimitMinutes !== undefined, {
    path: ['timeLimitMinutes'],
    message: 'timeLimitMinutes is required (or perQuestionTimer with perQuestionSeconds)',
  })
  .refine((b) => b.timeLimitMinutes === undefined || b.timeLimitMinutes * 60 >= b.questionCount * 10, {
    path: ['timeLimitMinutes'],
    message: 'time limit must allow at least 10 seconds per question',
  })
  .transform((b) => ({ ...b, topicIds: [...new Set(b.topicIds)] }));

const submitSessionBody = z.object({
  sessionId: objectId,
  responses: z
    .array(
      z.object({
        questionId: objectId,
        selectedOptionId: optionId.nullable().default(null),
        timeSpentSec: z.number().min(0).max(3 * 3600).default(0),
        // CBT "Marked for Review" flag, kept for the review matrix filter. Does not affect scoring.
        markedForReview: z.boolean().default(false),
      }),
    )
    .max(Math.max(...QUESTION_COUNTS))
    .refine((rs) => new Set(rs.map((r) => r.questionId)).size === rs.length, {
      message: 'each questionId may appear only once',
    }),
});

const sessionIdParams = z.object({ sessionId: objectId });

module.exports = { createSessionBody, submitSessionBody, sessionIdParams, QUESTION_COUNTS };
