'use strict';

/**
 * Concept sheets ("how to solve") for every catalogue topic, as TopicSummary
 * documents. The per-subject files hold the authored content; this adds the
 * fields derived from the catalogue (slug, syllabus_map, status).
 *
 * Check content with:  node db/seed/topic-summaries/validate.js db/seed/topic-summaries/*.js
 */

const fs = require('node:fs');
const path = require('node:path');
const catalog = require('../catalog');

const SUBJECTS = ['quant', 'reasoning', 'english', 'gs'];
// A subject's sheets may be split across files: quant.js, quant_more_a.js, ...
const SUBJECT_FILES = fs
  .readdirSync(__dirname)
  .filter((f) => f.endsWith('.js') && SUBJECTS.some((s) => f === `${s}.js` || f.startsWith(`${s}_`)))
  .sort()
  .map((f) => path.basename(f, '.js'));
// The first-stage paper each category's mocks and sheets are aimed at.
const MAIN_TIER = { SSC: 'TIER_1', BANK: 'PRELIMS', WBPSC: 'PRELIMS', WB_POST: 'SINGLE' };

/** Categories whose syllabus has this subject.topic, with their exam codes. */
function syllabusMapFor(subject, topic) {
  return catalog
    .filter((c) => c.subjects.some((s) => s.code === subject && s.topics.some((t) => t.code === topic)))
    .map((c) => ({ category: c.code, tier: MAIN_TIER[c.code], exam_codes: c.exams.map((e) => e.code) }));
}

function buildTopicSummaries() {
  return SUBJECT_FILES.flatMap((f) => require(`./${f}`)).map((s) => ({
    ...s,
    slug: `${s.subject}.${s.topic}`,
    subtopic: null,
    syllabus_map: syllabusMapFor(s.subject, s.topic),
    status: 'PUBLISHED',
  }));
}

module.exports = { buildTopicSummaries, syllabusMapFor, SUBJECT_FILES };
