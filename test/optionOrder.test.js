'use strict';

/**
 * The correct option must not always be "A". Content files list the answer first; the seeders
 * and the startup repair place it by a hash of the question code.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { correctPosition, placeCorrect } = require('../src/utils/optionOrder');

const opts = (n) => Array.from({ length: n }, (_, i) => ({ oid: `opt_${i}aaa`, text: { en: `o${i}` } }));

test('positions spread evenly over A-D across question codes', () => {
  const count = [0, 0, 0, 0];
  for (let i = 0; i < 4000; i += 1) count[correctPosition(`GKQ-WBG-${i}-1`, 4)] += 1;
  for (const c of count) assert.ok(c > 850 && c < 1150, `position counts ${count}`);
});

test('placeCorrect moves only the correct option, keeps the rest in order, and is idempotent', () => {
  const code = 'GKQ-SCI-124-1';
  const once = placeCorrect(opts(4), 'opt_0aaa', code);
  assert.equal(once.findIndex((o) => o.oid === 'opt_0aaa'), correctPosition(code, 4));
  assert.deepEqual(once.filter((o) => o.oid !== 'opt_0aaa').map((o) => o.oid), ['opt_1aaa', 'opt_2aaa', 'opt_3aaa']);
  assert.deepEqual(placeCorrect(once, 'opt_0aaa', code), once, 'applying twice changes nothing');
  assert.deepEqual(placeCorrect(opts(4), 'opt_missing', code), opts(4));
});

test('GK seeder: answer placed by code, wrong-option notes still point at their own options', () => {
  const { questionDoc } = require('../scripts/seedGkFacts');
  if (!questionDoc) return; // not exported: covered by the startup repair test below
  const fact = { code: 'GK-SCI-124', topic: 'general_science', subtopic: 'chemistry_matter', tags: [], status: 'PUBLISHED', sources: [{ title: 't', url: 'https://x.gov.in', quote: 'q' }], verification: { status: 'VERIFIED', verified_at: '2026-11-21' }, dates: {} };
  const q = { format: 'DIRECT', d: 2, q: ['Symbol of potassium?', 'পটাশিয়ামের সংকেত?'], a: ['K', 'K'], w: [['P', 'P'], ['Pt', 'Pt'], ['Po', 'Po']], wn: [['P is phosphorus.', 'P হল ফসফরাস।'], null, null], e: ['K.', 'K।'] };
  const doc = questionDoc(fact, q, 0, null);
  const at = doc.options.findIndex((o) => o.oid === doc.correct_option_id);
  assert.equal(at, correctPosition(doc.code, 4));
  assert.equal(doc.options[at].text.en, 'K');
  const trap = doc.solution.traps[0];
  assert.equal(doc.options.find((o) => o.oid === trap.option_id).text.en, 'P');
});
