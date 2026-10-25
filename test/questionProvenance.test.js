'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { classifyLegacyQuestion, hasVerifiedPaperReference } = require('../src/services/questionProvenance');

const officialRef = {
  exam_name: 'WBCS (Exe.) Prelims',
  question_code: 'WBCS-2022-Q1',
  source_url: 'https://psc.wb.gov.in/Download?paper=1',
  answer_key_url: 'https://psc.wb.gov.in/Download?key=1',
};

test('classifies only fully source-linked official references as verified PYQs', () => {
  assert.equal(hasVerifiedPaperReference({ pyq: { refs: [officialRef] } }), true);
  assert.equal(hasVerifiedPaperReference({
    pyq: { refs: [{ ...officialRef, answer_key_url: 'https://example.com/key.pdf' }] },
  }), false);
  assert.equal(hasVerifiedPaperReference({
    pyq: { refs: [{ ...officialRef, question_code: 'WBCS-2022-SYN-Q1' }] },
  }), false);
});

test('legacy provenance backfill leaves unsupported classifications unclassified', () => {
  assert.equal(classifyLegacyQuestion({ pyq: { refs: [officialRef] } }), 'OFFICIAL_VERIFIED');
  assert.equal(classifyLegacyQuestion({ authored_by: 'seed_generator', pyq: { refs: [] } }), 'ORIGINAL_PRACTICE');
  assert.equal(classifyLegacyQuestion({ authored_by: 'bulk-import:abc', pyq: { refs: [] } }), 'ORIGINAL_PRACTICE');
  assert.equal(classifyLegacyQuestion({
    pyq: { refs: [{ ...officialRef, question_code: 'WBCS-2022-SYN-Q1' }] },
  }), 'ORIGINAL_PRACTICE');
  assert.equal(classifyLegacyQuestion({ pyq: { refs: [{ exam_name: 'WBCS', question_code: 'WBCS-2022-Q1' }] } }), 'UNCLASSIFIED');
  assert.equal(classifyLegacyQuestion({ authored_by: 'unknown', pyq: { refs: [] } }), 'UNCLASSIFIED');
});
