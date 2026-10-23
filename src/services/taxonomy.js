'use strict';

const catalog = require('../../db/seed/catalog');

/**
 * One place that knows the syllabus taxonomy (db/seed/catalog.js), shared by
 * every way questions enter the bank: the JSON importer, Copilot's generators
 * (scripts/generateAndSeed.js), and later the CMS.
 *
 * The funnel lists only catalogue topics, so a question saved under any other
 * topic code is in the database but unreachable: not counted on topic cards,
 * never served in practice. Normalising codes on the way in prevents that.
 */

// Codes other tools use -> catalogue codes. value: topic, or [topic, subtopic].
const TOPIC_ALIASES = {
  quant: {
    simple_compound_interest: 'interest',
    simple_interest: ['interest', 'simple_interest'],
    compound_interest: ['interest', 'compound_interest'],
    speed_distance: 'time_speed_distance',
    averages: 'average',
  },
  english: {
    error_detection: 'error_spotting',
    prepositions: ['grammar', 'prepositions'],
    subject_verb_agreement: ['grammar', 'subject_verb_agreement'],
    conjunctions: ['grammar', 'conjunctions'],
  },
  reasoning: {
    number_series: 'series',
  },
};

/** subject -> Set(topic codes), merged across categories. */
const CATALOG_TOPICS = (() => {
  const map = new Map();
  for (const c of catalog) {
    for (const s of c.subjects) {
      if (!map.has(s.code)) map.set(s.code, new Set());
      for (const t of s.topics) map.get(s.code).add(t.code);
    }
  }
  return map;
})();

const inCatalog = (subject, topic) => Boolean(CATALOG_TOPICS.get(subject)?.has(topic));

/**
 * Map a (subject, topic, subtopic) onto the catalogue. When an alias also
 * names a subtopic, the original finer subtopic is kept as a concept tag so
 * no information is lost.
 *
 * @returns {{ topic: string, subtopic?: string, extraTags: string[], changed: boolean }}
 */
function normalizeTopic(subject, topic, subtopic) {
  const alias = TOPIC_ALIASES[subject]?.[topic];
  if (!alias) return { topic, subtopic, extraTags: [], changed: false };
  const [to, sub] = Array.isArray(alias) ? alias : [alias, undefined];
  const extraTags = sub && subtopic && subtopic !== sub ? [subtopic] : [];
  return { topic: to, subtopic: sub ?? subtopic, extraTags, changed: true };
}

module.exports = { TOPIC_ALIASES, CATALOG_TOPICS, inCatalog, normalizeTopic };
