'use strict';

const { ContentRevision } = require('../models');

const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

/** [{ field, from, to }] for every listed field whose value differs. */
function diff(before, after, fields) {
  const out = [];
  for (const field of fields) {
    const from = field.split('.').reduce((o, k) => o?.[k], before);
    const to = field.split('.').reduce((o, k) => o?.[k], after);
    if (!same(from, to)) out.push({ field, from: from ?? null, to: to ?? null });
  }
  return out;
}

/** Appends one history row (never updated afterwards). */
function record({ entity, doc, version, action, by, reason, changes = [], answerChanged = false }) {
  return ContentRevision.create({
    entity,
    entity_id: doc._id,
    code: doc.code,
    version,
    action,
    by,
    reason,
    changes,
    answer_changed: answerChanged,
  });
}

async function history(entity, id, limit = 50) {
  const rows = await ContentRevision.find({ entity, entity_id: id }).sort({ created_at: -1 }).limit(limit).lean();
  return rows.map((r) => ({
    version: r.version,
    action: r.action,
    by: r.by,
    reason: r.reason ?? null,
    answerChanged: r.answer_changed,
    changes: r.changes,
    at: r.created_at,
  }));
}

module.exports = { diff, record, history };
