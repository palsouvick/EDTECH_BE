'use strict';

/**
 * General Studies practice order (practiceMix.js): easy → medium → hard, with each GK subtopic spread
 * through its band. Regression: 26 generated "district headquarters" questions used to fill the first
 * 26 slots of West Bengal GK.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { Types } = require('mongoose');
const { mixedKeys, keysAfter, encodeMixCursor, decodeMixCursor } = require('../src/services/practiceMix');

let seq = 0;
const row = (subtopic, difficulty = 1, year = null) => {
  seq += 1;
  return { _id: new Types.ObjectId(seq.toString(16).padStart(24, '0')), subtopic, difficulty, latest_pyq_year: year };
};

// The West Bengal GK shape: one big generated family inserted together, then many small subtopics.
function wbLike() {
  const rows = [];
  for (let i = 0; i < 26; i += 1) rows.push(row('districts_admin', 1));
  for (const s of ['history', 'renaissance', 'geography_rivers', 'literature_culture', 'personalities', 'schemes', 'festivals_folk']) {
    for (let i = 0; i < 4; i += 1) rows.push(row(s, 1));
    for (let i = 0; i < 6; i += 1) rows.push(row(s, 2));
    for (let i = 0; i < 5; i += 1) rows.push(row(s, 3));
  }
  for (let i = 0; i < 10; i += 1) rows.push(row(null, 4));
  return rows;
}

const longestRun = (keys, s) => {
  let best = 0;
  let run = 0;
  for (const k of keys) {
    run = k.s === s ? run + 1 : 0;
    best = Math.max(best, run);
  }
  return best;
};

test('a big subtopic is spread out, not served as one block', () => {
  const keys = mixedKeys(wbLike());
  const first20 = keys.slice(0, 20);
  assert.ok(new Set(first20.map((k) => k.s)).size >= 6, 'the first 20 questions cover many subtopics');
  assert.ok(first20.filter((k) => k.s === 'districts_admin').length <= 6, 'district HQ is a share of the start, not all of it');
  assert.ok(longestRun(keys, 'districts_admin') <= 2, 'never more than 2 district-HQ questions in a row');
});

test('bands stay easy → medium → hard, and each subtopic stays easy → hard inside its band', () => {
  const rows = wbLike();
  const byId = new Map(rows.map((r) => [String(r._id), r]));
  const keys = mixedKeys(rows);
  const bands = keys.map((k) => k.b);
  assert.deepEqual(bands, [...bands].sort((a, b) => a - b));
  const lastDifficulty = new Map();
  for (const k of keys) {
    const d = byId.get(k.id).difficulty;
    const tag = `${k.b}|${k.s}`;
    assert.ok((lastDifficulty.get(tag) ?? 0) <= d, `${k.s} goes easy → hard`);
    lastDifficulty.set(tag, d);
  }
});

test('a more recent PYQ comes first within a subtopic of equal difficulty', () => {
  const [old, none, recent] = [row('history', 1, 2015), row('history', 1, null), row('history', 1, 2023)];
  assert.deepEqual(mixedKeys([old, none, recent]).map((k) => k.id), [recent, old, none].map((r) => String(r._id)));
});

test('paging with the cursor returns every question exactly once, in order', () => {
  const keys = mixedKeys(wbLike());
  const seen = [];
  let cursor = null;
  for (let guard = 0; guard < 100; guard += 1) {
    const page = keysAfter(keys, cursor ? decodeMixCursor(cursor) : null).slice(0, 15);
    seen.push(...page.map((k) => k.id));
    if (page.length < 15) break;
    cursor = encodeMixCursor(page[page.length - 1]);
  }
  assert.deepEqual(seen, keys.map((k) => k.id));
});

test('the order is deterministic, whatever order the rows arrive in', () => {
  const rows = wbLike();
  assert.deepEqual(mixedKeys([...rows].reverse()), mixedKeys(rows));
});

test('malformed or plain-order cursors are rejected', () => {
  assert.equal(decodeMixCursor('not-base64-json'), null);
  const plain = Buffer.from(JSON.stringify({ d: 1, y: null, id: String(new Types.ObjectId()) })).toString('base64url');
  assert.equal(decodeMixCursor(plain), null);
});
