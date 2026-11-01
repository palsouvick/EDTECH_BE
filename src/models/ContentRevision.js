'use strict';

const { Schema, model } = require('mongoose');

/**
 * Change history for edited content: one row per admin save of a question or a
 * GK fact, listing every changed field with its old and new value. Rows are only
 * ever inserted, never updated, so a corrected answer can always be traced.
 */
const ChangeSchema = new Schema(
  {
    field: { type: String, required: true, maxlength: 120 },
    from: { type: Schema.Types.Mixed },
    to: { type: Schema.Types.Mixed },
  },
  { _id: false },
);

const ContentRevisionSchema = new Schema(
  {
    entity: { type: String, enum: ['question', 'gk_fact'], required: true },
    entity_id: { type: Schema.Types.ObjectId, required: true },
    code: { type: String }, // the question or fact code, for readable logs
    version: { type: Number, required: true }, // version after this change
    action: { type: String, enum: ['EDIT', 'VERIFY', 'BENGALI_REVIEW', 'RETIRE', 'RESTORE', 'SOURCE_STATUS', 'CREATE'], required: true },
    by: { type: String, required: true },
    reason: { type: String, maxlength: 500 },
    // True when the correct answer itself changed: these are the edits students most need to know about.
    answer_changed: { type: Boolean, default: false },
    changes: { type: [ChangeSchema], default: [] },
  },
  { collection: 'content_revisions', timestamps: { createdAt: 'created_at', updatedAt: false } },
);

ContentRevisionSchema.index({ entity: 1, entity_id: 1, created_at: -1 }, { name: 'revision_entity_recent' });
ContentRevisionSchema.index(
  { answer_changed: 1, created_at: -1 },
  { name: 'revision_answer_changes', partialFilterExpression: { answer_changed: true } },
);

module.exports = model('ContentRevision', ContentRevisionSchema);
