'use strict';

const { z } = require('zod');
const { objectId, slug } = require('./common');

// Warning values are validated by the service (invalid ones are stripped
// instead of rejected); the list lives in src/models/MockPaper.js.

const paperIdParams = z.object({ paperId: objectId });
const attemptIdParams = z.object({ attemptId: objectId });

// Subjects offered in the admin paper form (PLAN §5 / contract §5).
const SUBJECTS = ['quant', 'english', 'gs', 'reasoning', 'mixed'];

const subjectField = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/, 'must be a lowercase slug')
  .max(40);

const createPaperBody = z.object({
  title: z.string().trim().min(1).max(200),
  sourceLabel: z.string().trim().min(1).max(200),
  subject: subjectField.optional(),
  text: z.string().min(1).max(200_000),
}).refine((b) => b.text.trim().length > 0, { path: ['text'], message: 'text must not be blank' });

const mockQuestion = z
  .object({
    n: z.number().int().min(1),
    // Nullable + default null: the review screen always sends both stems,
    // but an omitted stem is an empty stem, not a malformed question.
    stemEn: z.string().trim().max(5000).nullable().default(null),
    stemBn: z.string().trim().max(5000).nullable().default(null),
    options: z.array(z.string().trim().min(1).max(2000)).min(2).max(5),
    correctIndex: z.number().int().min(0).nullable().default(null),
    explanationEn: z.string().trim().max(5000).nullable().optional(),
    explanationBn: z.string().trim().max(5000).nullable().optional(),
    // Invalid warning values are stripped by the service, not rejected:
    // warnings are advisory, and a bad value must never block a save.
    warnings: z.array(z.string().trim()).default([]),
  })
  .refine((q) => (q.stemEn && q.stemEn.length > 0) || (q.stemBn && q.stemBn.length > 0), {
    message: 'at least one stem must be non-empty',
  })
  .refine((q) => q.correctIndex === null || q.correctIndex < q.options.length, {
    path: ['correctIndex'],
    message: 'correctIndex must be within the options',
  });

const updatePaperBody = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    sourceLabel: z.string().trim().min(1).max(200).optional(),
    subject: subjectField.nullable().optional(),
    questions: z.array(mockQuestion).max(500).optional(),
    unparsed: z.array(z.object({ text: z.string().trim().min(1).max(200_000) })).max(500).optional(),
  })
  .refine((b) => Object.keys(b).length > 0, { message: 'nothing to change' });

const submitAttemptBody = z.object({
  answers: z
    .array(
      z.object({
        questionIndex: z.number().int().min(0),
        selected: z.number().int().min(0).nullable(),
      }),
    )
    .max(500)
    .default([]),
}).refine(
  (b) => new Set(b.answers.map((a) => a.questionIndex)).size === b.answers.length,
  { path: ['answers'], message: 'each questionIndex may appear only once' },
);

module.exports = {
  paperIdParams,
  attemptIdParams,
  createPaperBody,
  updatePaperBody,
  submitAttemptBody,
  mockQuestion,
  SUBJECTS,
  // Re-exported for route files that validate ids the same way as the rest of the codebase.
  slug,
};
