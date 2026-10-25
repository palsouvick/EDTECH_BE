'use strict';

const { Schema, model } = require('mongoose');

const ReferenceSchema = new Schema(
  {
    type: { type: String, enum: ['DICTIONARY', 'OFFICIAL_PAPER', 'EDITORIAL'], required: true },
    title: { type: String, trim: true, maxlength: 200 },
    url: { type: String, trim: true, maxlength: 1024 },
    exam_name: { type: String, trim: true, maxlength: 120 },
    year: { type: Number, min: 1990, max: 2100, validate: Number.isInteger },
    question_code: { type: String, trim: true, maxlength: 100 },
  },
  { _id: false },
);

const ExamRelevanceSchema = new Schema(
  {
    exam_code: { type: String, trim: true, uppercase: true, maxlength: 40 },
    basis: { type: String, enum: ['PYQ_VERIFIED', 'CURRICULUM_RECOMMENDED', 'GENERAL'], required: true },
    references: { type: [ReferenceSchema], default: [] },
  },
  { _id: false },
);

const VocabularyWordSchema = new Schema(
  {
    word: { type: String, required: true, trim: true, maxlength: 100 },
    normalized_word: { type: String, required: true, lowercase: true, trim: true, maxlength: 100 },
    meaning_bn: { type: String, required: true, trim: true, maxlength: 300 },
    meaning_bn_normalized: { type: String, required: true, trim: true, maxlength: 300 },
    meaning_bn_tokens: { type: [String], default: [] },
    definition_en: { type: String, required: true, trim: true, maxlength: 600 },
    explanation_bn: { type: String, trim: true, maxlength: 1000 },
    part_of_speech: {
      type: String,
      enum: ['NOUN', 'VERB', 'ADJECTIVE', 'ADVERB', 'PREPOSITION', 'CONJUNCTION', 'INTERJECTION', 'PHRASE'],
      required: true,
    },
    pronunciation: { type: String, trim: true, maxlength: 100 },
    synonyms: { type: [String], default: [] },
    antonyms: { type: [String], default: [] },
    example_en: { type: String, required: true, trim: true, maxlength: 500 },
    example_bn: { type: String, required: true, trim: true, maxlength: 500 },
    collocations: { type: [String], default: [] },
    difficulty: { type: String, enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], required: true },
    categories: { type: [String], required: true, validate: (v) => v.length > 0 },
    exam_relevance: { type: [ExamRelevanceSchema], default: [] },
    sources: { type: [ReferenceSchema], default: [] },
    source_status: { type: String, enum: ['UNVERIFIED', 'EDITORIAL_REVIEWED', 'DICTIONARY_CHECKED'], default: 'UNVERIFIED' },
    status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], default: 'DRAFT' },
    authored_by: { type: String, maxlength: 120 },
    reviewed_by: { type: String, maxlength: 200 },
    reviewed_at: { type: Date },
    import_batch_id: { type: String, maxlength: 40, select: false },
  },
  { collection: 'vocabulary_words', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

VocabularyWordSchema.index({ normalized_word: 1 }, { name: 'uniq_vocabulary_word', unique: true });
VocabularyWordSchema.index({ status: 1, difficulty: 1, normalized_word: 1 }, { name: 'published_vocabulary_level' });
VocabularyWordSchema.index({ status: 1, categories: 1, normalized_word: 1 }, { name: 'published_vocabulary_category' });
VocabularyWordSchema.index({ status: 1, meaning_bn_normalized: 1 }, { name: 'published_vocabulary_bengali' });
VocabularyWordSchema.index({ status: 1, meaning_bn_tokens: 1 }, { name: 'published_vocabulary_bengali_tokens' });
VocabularyWordSchema.index(
  { import_batch_id: 1 },
  { name: 'vocabulary_import_batch', partialFilterExpression: { import_batch_id: { $type: 'string' } } },
);

module.exports = model('VocabularyWord', VocabularyWordSchema);
