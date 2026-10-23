'use strict';

const { z } = require('zod');
const { EXAM_CATEGORIES, SLUG_RE } = require('../models/constants');

const LANGUAGE_ALIASES = {
  en: 'en', eng: 'en', english: 'en',
  bn: 'bn', ben: 'bn', bengali: 'bn', bangla: 'bn',
  hi: 'hi', hin: 'hi', hindi: 'hi',
};

/** Accepts "en" | "bn" | "hindi" | "Bengali"... and normalises to an ISO 639-1 code. */
const language = z
  .string()
  .trim()
  .toLowerCase()
  .refine((v) => v in LANGUAGE_ALIASES, { message: 'language must be one of en, bn, hi (hindi)' })
  .transform((v) => LANGUAGE_ALIASES[v]);

const category = z
  .string()
  .trim()
  .toUpperCase()
  .pipe(z.enum(EXAM_CATEGORIES));

const slug = z.string().trim().toLowerCase().regex(SLUG_RE, 'must be a lowercase slug, e.g. profit_loss');

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'must be a 24-character hex ObjectId');

const optionId = z.string().regex(/^opt_[a-z0-9]{4,16}$/, 'must be an option id like opt_3f9a1c2e');

module.exports = { language, category, slug, objectId, optionId };
