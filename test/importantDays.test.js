'use strict';

/** Important Days year view: built from the real verified month facts, nothing retyped. */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { GkFact, Question } = require('../src/models');
const { ensureGkLibrary } = require('../scripts/seedGkFacts');
const { parseMonthFact, similarNameGroups } = require('../src/services/importantDays.service');

const FILE = path.join(__dirname, '../db/gk/important_days.jsonl');
const facts = fs.readFileSync(FILE, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const month = (sub) => facts.find((f) => f.subtopic === sub);

test('every month fact parses into dated rows, in order, English and Bengali aligned', () => {
  let total = 0;
  for (const sub of ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']) {
    const rows = parseMonthFact(month(sub));
    assert.ok(rows, `${sub} parses`);
    for (const r of rows) assert.ok(r.name.en && r.name.bn, `${sub} ${r.day} has both languages`);
    total += rows.length;
  }
  assert.equal(total, 114);
  const jan = parseMonthFact(month('january'));
  assert.deepEqual(jan.find((r) => r.day === 12), {
    month: 1, day: 12,
    name: { en: 'National Youth Day (birth anniversary of Swami Vivekananda)', bn: 'জাতীয় যুব দিবস (স্বামী বিবেকানন্দের জন্মবার্ষিকী)' },
  });
});

test('a month fact in another shape is left out, never half-read', () => {
  const jan = month('january');
  const bad = (en, bn = jan.statement.bn) => parseMonthFact({ ...jan, statement: { en, bn } });
  assert.equal(bad(jan.statement.en.replace('12 January', '12 February')), null, 'wrong month');
  assert.equal(bad(jan.statement.en.replace('12 January –', 'Twelfth January –')), null, 'no day number');
  assert.equal(bad(jan.statement.en, jan.statement.bn.replace('১২ জানুয়ারি', '১৩ জানুয়ারি')), null, 'Bengali day differs');
  assert.equal(bad(jan.statement.en, jan.statement.bn.split('\n').slice(0, -1).join('\n')), null, 'line counts differ');
  assert.equal(parseMonthFact({ ...jan, subtopic: 'mixed' }), null);
});

test('similar names, different dates: the classic exam traps, without generic-word noise', () => {
  const rows = facts.flatMap((f) => parseMonthFact(f) || []);
  const groups = Object.fromEntries(similarNameGroups(rows).map((g) => [g.word, g.rows.map((r) => `${r.day}/${r.month}`)]));
  assert.deepEqual(groups.teachers, ['5/9', '5/10']);
  assert.deepEqual(groups.children, ['14/11', '20/11']);
  assert.deepEqual(groups.youth, ['12/1', '15/7', '12/8']);
  assert.deepEqual(groups.vijay, ['26/7', '16/12']);
  assert.equal(groups.girl, undefined, 'contained in the "child" group');
  for (const noise of ['anniversary', 'jayanti', 'day', 'world', 'international']) assert.equal(groups[noise], undefined, noise);
});

let mongod;
let server;
let root;
let dir;

test.before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri('important_days_test'));
  await Promise.all([GkFact.init(), Question.init()]);
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'days-'));
  fs.copyFileSync(FILE, path.join(dir, 'important_days.jsonl'));
  await ensureGkLibrary({ log: () => {}, dir });
  server = createApp().listen(0);
  root = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await mongoose.disconnect();
  await mongod?.stop();
  if (dir) fs.rmSync(dir, { recursive: true, force: true });
});

test('GET /gk/important-days: January to December, sources, similar names and confused pairs', async () => {
  const res = await fetch(`${root}/gk/important-days`);
  const { data } = await res.json();
  assert.equal(res.status, 200);
  assert.deepEqual(data.months.map((m) => m.month), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  assert.equal(data.dayCount, 114);
  assert.ok(data.months.every((m) => m.sources.length && m.sources.every((s) => /^https:\/\//.test(s.url))));
  assert.ok(data.similarNames.some((g) => g.word === 'teachers'));
  assert.equal(data.confusedPairsFactCode, 'GK-DAY-013');
  assert.equal(data.confusedPairs.length, 6);
  assert.match(data.confusedPairs[0].en, /National Voters' Day – 25 January \(NOT Republic Day, 26 January\)/);
  assert.ok(data.confusedPairs.every((p) => p.bn), 'Bengali lines aligned');
});

test('a month fact that is not published (e.g. sent back for review) disappears from the year view', async () => {
  await GkFact.updateOne({ code: 'GK-DAY-006' }, { $set: { status: 'DRAFT' } });
  const { data } = await (await fetch(`${root}/gk/important-days`)).json();
  assert.equal(data.months.some((m) => m.month === 6), false);
  await GkFact.updateOne({ code: 'GK-DAY-006' }, { $set: { status: 'PUBLISHED' } });
});
