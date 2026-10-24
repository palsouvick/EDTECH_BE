'use strict';

const { Schema, model } = require('mongoose');

const QuestionImportBatchSchema = new Schema(
  {
    status: { type: String, enum: ['PREVIEWED', 'IMPORTING', 'COMPLETED', 'PARTIAL'], required: true, default: 'PREVIEWED' },
    uploaded_by: { type: String, required: true },
    confirmed_by: { type: String },
    category: { type: String, required: true },
    exam_code: { type: String, required: true },
    file_name: { type: String, required: true, maxlength: 255 },
    summary: { type: Schema.Types.Mixed, required: true },
    rows: { type: [Schema.Types.Mixed], default: [] },
    confirmed_at: { type: Date },
    import_started_at: { type: Date },
    published_at: { type: Date },
    published_count: { type: Number, min: 0, default: 0 },
  },
  {
    collection: 'question_import_batches',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

QuestionImportBatchSchema.index({ created_at: -1 }, { name: 'recent_import_batches' });

module.exports = model('QuestionImportBatch', QuestionImportBatchSchema);
