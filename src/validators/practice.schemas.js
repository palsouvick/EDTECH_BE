'use strict';

const { z } = require('zod');
const { language, category, slug, objectId, optionId } = require('./common');
const { REPORT_REASONS } = require('../models/QuestionReport');

const topicViewQuery = z.object({
  category,
  subject: slug,
  topic: slug,
  language: language.default('en'),
  page: z.coerce.number().int().min(1).max(500).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

const topicSummaryQuery = z.object({ category, subject: slug, topic: slug });

const questionStreamQuery = z.object({
  category,
  subject: slug,
  topic: slug,
  language: language.default('en'),
  cursor: z.string().max(200).regex(/^[A-Za-z0-9_-]+$/, 'malformed cursor').optional(),
  limit: z.coerce.number().int().min(1).max(20).default(5),
});

const verifyAnswerBody = z.object({
  questionId: objectId,
  selectedOptionId: optionId,
  // Optional; feeds the average-time metric when present.
  timeSpentSec: z.number().min(0).max(3600).optional(),
  // The category the student is practising under; lets "My performance" link back to the topic.
  category: category.optional(),
});

const questionIdParams = z.object({ questionId: objectId });

const reportErrorBody = z.object({
  questionId: objectId,
  reason: z.enum(REPORT_REASONS),
  message: z.string().trim().max(1000).optional(),
  language: language.optional(),
});

module.exports = {
  topicViewQuery,
  topicSummaryQuery,
  questionStreamQuery,
  verifyAnswerBody,
  questionIdParams,
  reportErrorBody,
};
