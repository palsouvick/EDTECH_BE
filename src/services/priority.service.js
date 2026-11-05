'use strict';

/**
 * Chapter priority (Must know / Important / Additional) from WBPSC previous-year papers.
 * Counted from the published PYQs students can see (questionProvenance.pyqRefBasis), per
 * subject, so a chapter is ranked against the other chapters of its own subject. The rule
 * is returned with the result and shown to students as is.
 */

const { Question } = require('../models');
const { pyqRefBasis } = require('./questionProvenance');
const { subjectName, topicName } = require('./catalogNames');

const RULE = Object.freeze({
  must: { minShare: 0.1, minPaperShare: 0.8 }, // ≥10% of the subject's PYQs AND in ≥80% of papers
  important: { minShare: 0.04, minPaperShare: 0.5 }, // ≥4% OR in ≥50% of papers
});
const TTL_MS = 5 * 60_000;
let cache = { at: 0, data: null };
const clearPriorityCache = () => {
  cache = { at: 0, data: null };
};

function levelFor({ share, paperShare }) {
  if (share >= RULE.must.minShare && paperShare >= RULE.must.minPaperShare) return 'MUST';
  if (share >= RULE.important.minShare || paperShare >= RULE.important.minPaperShare) return 'IMPORTANT';
  return 'ADDITIONAL';
}

/** rows: [{ subject, topic, paper }] one per visible PYQ ref → priorities by subject and topic. */
function buildPriorities(rows) {
  const papers = new Set(rows.map((r) => r.paper));
  const subjects = {};
  for (const r of rows) {
    const s = (subjects[r.subject] ??= { name: subjectName(r.subject), total: 0, topics: {} });
    s.total += 1;
    const t = (s.topics[r.topic] ??= { name: topicName(r.subject, r.topic), count: 0, papers: new Set() });
    t.count += 1;
    t.papers.add(r.paper);
  }
  for (const s of Object.values(subjects)) {
    for (const [code, t] of Object.entries(s.topics)) {
      const share = t.count / s.total;
      const paperShare = papers.size ? t.papers.size / papers.size : 0;
      s.topics[code] = { name: t.name, count: t.count, share: Math.round(share * 1000) / 10, papers: t.papers.size, level: levelFor({ share, paperShare }) };
    }
  }
  return {
    paperCount: papers.size,
    questionCount: rows.length,
    rule: { mustPercent: 10, mustPaperPercent: 80, importantPercent: 4, importantPaperPercent: 50 },
    subjects,
  };
}

async function getPriorities() {
  if (cache.data && Date.now() - cache.at < TTL_MS) return cache.data;
  const docs = await Question.find({ status: 'PUBLISHED', provenance: { $in: ['OFFICIAL_VERIFIED', 'ADAPTED_PYQ'] }, 'pyq.is_pyq': true })
    .select('subject topic provenance pyq.refs')
    .lean();
  const rows = [];
  for (const q of docs) {
    for (const ref of q.pyq.refs) {
      if (pyqRefBasis(ref, q.provenance)) rows.push({ subject: q.subject, topic: q.topic, paper: `${ref.exam_name}|${ref.year}|${ref.shift ?? ''}` });
    }
  }
  cache = { at: Date.now(), data: buildPriorities(rows) };
  return cache.data;
}

module.exports = { getPriorities, buildPriorities, levelFor, clearPriorityCache, RULE };
