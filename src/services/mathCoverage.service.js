'use strict';

/**
 * Math pattern-coverage report for the admin console: per chapter, how many questions, how
 * many distinct patterns and question shapes, the difficulty spread, and which learning
 * patterns have no questions yet (mathCoverage.logic.js). Read-only.
 */

const fs = require('node:fs');
const path = require('node:path');
const { Question } = require('../models');
const { REAL_PAPER } = require('./customTest.logic');
const { topicName } = require('./catalogNames');
const C = require('./mathCoverage.logic');

const PATTERN_DIR = path.join(__dirname, '..', '..', 'db', 'patterns', 'quant');

/** Learning pattern keys and Hard pattern ids per chapter, from the files that ship with the code. */
function patternFiles() {
  const library = new Map();
  for (const f of fs.readdirSync(PATTERN_DIR).filter((x) => x.endsWith('.js'))) {
    const d = require(path.join(PATTERN_DIR, f));
    library.set(d.topic, (d.patterns || []).map((p) => p.key));
  }
  const hard = new Map();
  const hardDir = path.join(PATTERN_DIR, 'hard');
  for (const f of fs.readdirSync(hardDir).filter((x) => x.endsWith('.js'))) {
    hard.set(f.replace(/\.js$/, ''), require(path.join(hardDir, f)).map((p) => p.id));
  }
  const { registry = [] } = require(path.join(PATTERN_DIR, 'profit_loss.js'));
  if (registry.length) hard.set('profit_loss', registry.map((p) => p.id));
  return { library, hard };
}

async function mathCoverage() {
  const { library, hard } = patternFiles();
  const docs = await Question.find({ subject: 'quant', status: 'PUBLISHED' }).select('topic pattern difficulty stem.en provenance pyq.is_pyq').lean();
  const byTopic = new Map();
  for (const q of docs) {
    if (!byTopic.has(q.topic)) byTopic.set(q.topic, []);
    byTopic.get(q.topic).push({ pattern: q.pattern, difficulty: q.difficulty, stem: q.stem?.en, pyq: Boolean(q.pyq?.is_pyq && REAL_PAPER.includes(q.provenance)) });
  }
  const topics = new Set([...library.keys(), ...byTopic.keys()]);
  const rows = C.sortRows([...topics].map((topic) => ({
    ...C.coverageRow({ topic, questions: byTopic.get(topic) || [], libraryPatterns: library.get(topic) || [], hardPatterns: hard.get(topic) || [] }),
    name: topicName('quant', topic),
  })));
  const count = (s) => rows.filter((r) => r.status === s).length;
  return {
    generatedAt: new Date(),
    thresholds: C.THRESHOLDS,
    totals: {
      questions: docs.length,
      chapters: rows.length,
      patternsAvailable: rows.reduce((a, r) => a + r.patternsAvailable, 0),
      patternsCovered: rows.reduce((a, r) => a + r.patternsCoveredTotal, 0),
      libraryPatterns: rows.reduce((a, r) => a + r.libraryPatterns, 0),
      hardPatterns: rows.reduce((a, r) => a + r.hardPatterns, 0),
      good: count('good'),
      needsMore: count('needs_more'),
      poor: count('poor'),
    },
    chapters: rows,
  };
}

module.exports = { mathCoverage };
