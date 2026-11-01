'use strict';

const { Schema, model } = require('mongoose');

/**
 * Daily GK: the facts picked for one student on one local day, so the set stays
 * the same after a refresh or on another device and the student can continue
 * where they left off. `done_ids` are the facts already reviewed today.
 */
const GkDailySetSchema = new Schema(
  {
    user_id: { type: String, required: true },
    day: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ }, // the student's local date
    fact_ids: { type: [Schema.Types.ObjectId], default: [] },
    done_ids: { type: [Schema.Types.ObjectId], default: [] },
  },
  { collection: 'gk_daily_sets', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

GkDailySetSchema.index({ user_id: 1, day: 1 }, { name: 'uniq_user_gk_day', unique: true });

module.exports = model('GkDailySet', GkDailySetSchema);
