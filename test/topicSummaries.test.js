'use strict';

/** Concept sheets: every catalogue topic has one, and each passes content checks and the model. */

const test = require('node:test');
const assert = require('node:assert/strict');
const { TopicSummary } = require('../src/models');
const catalog = require('../db/seed/catalog');
const { buildTopicSummaries } = require('../db/seed/topic-summaries');
const { validateSummaries } = require('../db/seed/topic-summaries/validate');

const sheets = buildTopicSummaries();

test('every catalogue topic has exactly one concept sheet', () => {
  const want = new Set(catalog.flatMap((c) => c.subjects.flatMap((s) => s.topics.map((t) => `${s.code}.${t.code}`))));
  const have = sheets.map((s) => s.slug);
  assert.equal(new Set(have).size, have.length, 'no duplicate slugs');
  assert.deepEqual([...want].filter((slug) => !have.includes(slug)), [], 'missing sheets');
  assert.deepEqual(have.filter((slug) => !want.has(slug)), [], 'sheets for topics not in the catalogue');
});

test('sheets pass the content checks (minimums, KaTeX, Bengali script)', () => {
  assert.deepEqual(validateSummaries(sheets, 'all'), []);
});

test('sheets pass TopicSummary model validation, with a syllabus map from the catalogue', async () => {
  for (const s of sheets) await new TopicSummary(s).validate();
  const pl = sheets.find((s) => s.slug === 'quant.profit_loss');
  assert.deepEqual(pl.syllabus_map.map((m) => m.category), ['SSC', 'BANK', 'WBPSC', 'WB_POST']);
  assert.deepEqual(pl.syllabus_map[0], { category: 'SSC', tier: 'TIER_1', exam_codes: ['SSC_CGL', 'SSC_CHSL', 'SSC_MTS'] });
  const wb = sheets.find((s) => s.slug === 'gs.west_bengal_gk');
  assert.deepEqual(wb.syllabus_map.map((m) => m.category), ['WBPSC', 'WB_POST']);
});
