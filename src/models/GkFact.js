'use strict';

const { Schema, model } = require('mongoose');
const { LocalizedText, hasAnyLanguage } = require('./schemas/localized');
const { SLUG_RE } = require('./constants');

/**
 * One fact in the GK library (db/gk/*.jsonl, or added by an admin). A fact is
 * what students read and revise; the questions that test it are ordinary
 * question-bank documents listed in question_ids.
 *
 * Two independent statuses:
 *  - verification: is the fact itself backed by a source that supports the
 *    specific answer (VERIFIED), still doubtful (NEEDS_REVIEW) or unchecked?
 *  - bengali_review: has a person approved the Bengali wording? Starts PENDING;
 *    only an admin action sets REVIEWED (with who and when).
 *
 * Every change made through the admin console is written to content_revisions.
 */

const VERIFICATION_STATUS = Object.freeze(['VERIFIED', 'NEEDS_REVIEW', 'UNVERIFIED']);
const FACT_STATUS = Object.freeze(['DRAFT', 'PUBLISHED', 'RETIRED']);
const MILESTONE_KINDS = Object.freeze([
  'PROPOSED', 'FOUNDATION', 'CONSTRUCTED', 'INAUGURATED', 'COMMERCIAL_OPERATION', 'ADOPTED', 'NOTIFIED', 'ENACTED', 'IN_FORCE', 'LAUNCHED', 'EVENT',
]);

const SourceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 300 },
    url: { type: String, required: true, trim: true, maxlength: 1024, match: /^https:\/\/\S+$/ },
    publisher: { type: String, trim: true, maxlength: 200 },
    publisher_type: { type: String, enum: ['OFFICIAL', 'INSTITUTIONAL', 'REFERENCE'], required: true },
    accessed_at: { type: Date },
    quote: { type: String, trim: true, maxlength: 2000 },
  },
  { _id: false },
);

const MilestoneSchema = new Schema(
  {
    kind: { type: String, enum: MILESTONE_KINDS, required: true },
    date: { type: String, required: true, match: /^-?\d{1,4}(-\d{2}(-\d{2})?)?$/ }, // year, year-month or full date
    note: { type: LocalizedText },
  },
  { _id: false },
);

const GkFactSchema = new Schema(
  {
    code: { type: String, required: true, trim: true, uppercase: true, match: /^GK-[A-Z]{2,4}-\d{3,5}$/ },
    topic: { type: String, required: true, match: SLUG_RE },
    subtopic: { type: String, required: true, match: SLUG_RE },
    tags: { type: [String], default: [] },
    fact_kind: { type: String, enum: ['STATIC', 'CHANGING'], default: 'STATIC' },

    title: { type: LocalizedText, required: true, validate: hasAnyLanguage },
    statement: { type: LocalizedText, required: true, validate: hasAnyLanguage },
    explanation: { type: LocalizedText, default: undefined },
    milestones: { type: [MilestoneSchema], default: [] },
    dates: {
      event_date: { type: Date, default: null },
      valid_from: { type: Date, default: null },
      valid_to: { type: Date, default: null },
      review_by: { type: Date, default: null },
    },
    reference_year: { type: Number, min: 1800, max: 2100, default: null },
    difficulty: { type: Number, required: true, min: 1, max: 5, validate: Number.isInteger },
    exam_relevance: { type: [String], default: [] },

    sources: { type: [SourceSchema], default: [] },
    verification: {
      status: { type: String, enum: VERIFICATION_STATUS, default: 'UNVERIFIED' },
      method: { type: String, maxlength: 120 },
      verified_at: { type: Date, default: null },
      verified_by: { type: String, default: null },
      notes: { type: String, maxlength: 2000 },
    },
    bengali_review: {
      status: { type: String, enum: ['PENDING', 'REVIEWED'], default: 'PENDING' },
      reviewed_by: { type: String, default: null },
      reviewed_at: { type: Date, default: null },
    },

    // Topic pack (db/gk/README.md "Topic packs"): table, must-remember, don't-confuse, memory trick,
    // related codes, keywords and PYQ search terms. Shape checked by gkFacts.validate.validatePack.
    pack: { type: Schema.Types.Mixed, default: undefined },
    question_ids: { type: [Schema.Types.ObjectId], ref: 'Question', default: [] },
    status: { type: String, enum: FACT_STATUS, default: 'DRAFT' },
    retired_reason: { type: String, maxlength: 500 },
    version: { type: Number, default: 1 },
    // Set when an admin edits the fact: the seed script then leaves its content alone.
    admin_edited: { type: Boolean, default: false },
    content_hash: { type: String },
    origin: { type: String, enum: ['GK_LIBRARY', 'ADMIN'], default: 'GK_LIBRARY' },
  },
  { collection: 'gk_facts', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, minimize: false },
);

GkFactSchema.pre('validate', function check() {
  if (this.fact_kind === 'CHANGING' && (!this.dates?.valid_from || !this.dates?.review_by)) {
    this.invalidate('dates', 'A CHANGING fact needs dates.valid_from and dates.review_by');
  }
  if (this.verification?.status === 'VERIFIED') {
    const backed = (this.sources || []).some((s) => s.url && s.quote && s.title);
    if (!backed) this.invalidate('verification.status', 'A VERIFIED fact needs a source with a title, url and supporting quote');
  }
});

GkFactSchema.index({ code: 1 }, { name: 'uniq_gk_fact_code', unique: true });
// Read & Learn: published facts of a card, by subcategory.
GkFactSchema.index({ status: 1, topic: 1, subtopic: 1, code: 1 }, { name: 'gk_fact_topic' });
// The West Bengal card also lists facts tagged west_bengal from other cards.
GkFactSchema.index({ status: 1, tags: 1, code: 1 }, { name: 'gk_fact_tags' });
// Admin queues: unverified facts, Bengali pending review, facts due for review.
GkFactSchema.index({ 'verification.status': 1, topic: 1 }, { name: 'gk_fact_verification' });
GkFactSchema.index({ 'bengali_review.status': 1, topic: 1 }, { name: 'gk_fact_bengali_review' });
GkFactSchema.index(
  { 'dates.review_by': 1 },
  { name: 'gk_fact_review_by', partialFilterExpression: { 'dates.review_by': { $type: 'date' } } },
);

module.exports = model('GkFact', GkFactSchema);
module.exports.VERIFICATION_STATUS = VERIFICATION_STATUS;
module.exports.FACT_STATUS = FACT_STATUS;
module.exports.MILESTONE_KINDS = MILESTONE_KINDS;
