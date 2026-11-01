'use strict';

/** Question patterns (db/patterns): one file per exam chapter, all valid. */

const test = require('node:test');
const assert = require('node:assert/strict');
const catalog = require('../db/seed/catalog');
const { loadPatterns } = require('../db/patterns');
const { validatePatterns } = require('../db/patterns/validate');
const { getPatterns } = require('../src/services/patterns.service');

// Current affairs changes too fast for fixed patterns.
const EXEMPT = new Set(['gs.current_affairs']);
const docs = loadPatterns();

test('every exam chapter has question patterns', () => {
  const want = new Set(catalog.flatMap((c) => c.subjects.flatMap((s) => s.topics.map((t) => `${s.code}.${t.code}`))));
  const have = new Set(docs.map(({ doc }) => `${doc.subject}.${doc.topic}`));
  assert.deepEqual([...want].filter((k) => !have.has(k) && !EXEMPT.has(k)), []);
});

test('every pattern file passes validation (both languages, 4 options, valid answer index, KaTeX)', () => {
  assert.deepEqual(docs.flatMap(({ file, doc }) => validatePatterns(doc, file)), []);
});

test('service returns a chapter\'s patterns, or an empty list', () => {
  assert.ok(getPatterns({ subject: 'quant', topic: 'percentage' }).patterns.length >= 3);
  assert.deepEqual(getPatterns({ subject: 'gs', topic: 'current_affairs' }).patterns, []);
});

test('Time & Work has a categorized pattern library linked to the question bank', () => {
  const { doc } = docs.find(({ doc }) => doc.subject === 'quant' && doc.topic === 'time_work');
  const keys = new Set(doc.patterns.map(({ key }) => key));
  const registryIds = new Set(doc.registry.map(({ id }) => id));

  assert.ok(doc.patterns.length >= 15);
  for (const pattern of doc.patterns) {
    assert.ok(pattern.name?.en && pattern.spot?.bn && pattern.typicalWording?.en);
    assert.ok(pattern.formula?.en && pattern.method.length >= 2 && pattern.shortcut?.bn && pattern.trap?.en);
    assert.ok(['beginner', 'intermediate', 'advanced'].includes(pattern.difficulty));
    if (pattern.important) assert.ok((pattern.examples?.length ?? 1) >= 2 || pattern.tryIt);
    if (pattern.registryLinked) assert.ok(registryIds.has(pattern.key));
    if (pattern.practiceKey) assert.ok(keys.has(pattern.practiceKey) || registryIds.has(pattern.practiceKey));
  }
});
