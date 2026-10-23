'use strict';

/** Shared enums. Kept in one place so models, validators and indexes never drift. */

const EXAM_CATEGORIES = Object.freeze(['SSC', 'BANK', 'WBPSC', 'WB_POST']);

// Stage of an exam. SINGLE = one-stage recruitment exams (e.g. WB Postal MTS).
const TIERS = Object.freeze(['TIER_1', 'TIER_2', 'TIER_3', 'PRELIMS', 'MAINS', 'SINGLE']);

// Content languages, ISO 639-1. Order matters: it is the canonical order used in lang_set.
const LANGUAGES = Object.freeze(['bn', 'en', 'hi']);

const QUESTION_STATUS = Object.freeze(['DRAFT', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED']);
const CONTENT_STATUS = Object.freeze(['DRAFT', 'PUBLISHED', 'ARCHIVED']);

// 1–5 calibrated difficulty. Bands are what mock blueprints are expressed in.
const DIFFICULTY_BANDS = Object.freeze({
  EASY: [1, 2],
  MEDIUM: [3],
  HARD: [4, 5],
});

// Taxonomy codes are stable lowercase slugs: "quant", "profit_loss", "marked_price_discount".
const SLUG_RE = /^[a-z0-9]+(?:_[a-z0-9]+)*$/;

module.exports = {
  EXAM_CATEGORIES,
  TIERS,
  LANGUAGES,
  QUESTION_STATUS,
  CONTENT_STATUS,
  DIFFICULTY_BANDS,
  SLUG_RE,
};
