'use strict';

/**
 * Question-bank versioning + synchronisation upgrade:
 *  - seed_state carries version, status lifecycle and totals
 *  - file imports sync: insert missing, update changed, protect admin edits
 *  - pre-flight validation aborts a bad file as a whole
 *  - status is visible via /healthz, the public status endpoint and the
 *    admin endpoints; force-sync is admin-only
 */

process.env.SEED_QUESTIONS_PER_TOPIC = '2';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const config = require('../src/config');
const ADMIN_EMAIL = 'qb-admin@example.test';
if (!config.auth.adminEmails.includes(ADMIN_EMAIL)) config.auth.adminEmails.push(ADMIN_EMAIL);

const { Question } = require('../src/models');
const { seedQuestionBank } = require('../src/db/bootstrap');
const { importQuestionFile, validateQuestionFile } = require('../src/db/seedData');
const { QUESTION_BANK_VERSION } = require('../src/db/questionBankVersion');
const { createApp } = require('../src/app');

let mongod;
let server;
let base;
let adminCookie;
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'qb-sync-'));

const item = (explanation, optionB = '2% decrease') => ({
  category: 'WBPSC_WBCS',
  subject: 'Mathematics',
  topic: 'Percentage',
  difficulty: 'Easy',
  previous_year_reference: 'WBCS Prelims pattern (exam-style, not verbatim)',
  correct_option_id: 'D',
  content: {
    en: {
      question_text: 'A number is first increased by 20% and then decreased by 20%. What is the net change?',
      options: [
        { id: 'A', text: 'No change' },
        { id: 'B', text: optionB },
        { id: 'C', text: '4% increase' },
        { id: 'D', text: '4% decrease' },
      ],
      explanation,
    },
  },
});
const writeFile = (name, items) => {
  const f = path.join(tmp, name);
  fs.writeFileSync(f, JSON.stringify(items));
  return f;
};

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('qb_sync_test'));
  await Question.init();
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await mongoose.disconnect();
  await mongod?.stop();
  fs.rmSync(tmp, { recursive: true, force: true });
});

test('seed stamps version, status lifecycle and totals; re-run is a no-op', async () => {
  await seedQuestionBank();
  const state = await mongoose.connection.db.collection('seed_state').findOne({ _id: 'question_bank' });
  assert.equal(state.question_bank_version, QUESTION_BANK_VERSION);
  assert.equal(state.status, 'completed');
  assert.equal(state.source_fingerprint, state.fingerprint);
  assert.match(state.fingerprint, /^[0-9a-f]{40}$/);
  assert.ok(state.last_completed_at);
  assert.equal(state.total_questions, await Question.countDocuments());
  assert.equal(typeof state.last_run.inserted, 'number');

  const generated = await Question.countDocuments({ authored_by: 'seed_generator' });
  assert.ok(generated > 0);
  const again = await seedQuestionBank();
  assert.equal(again.skipped, 'up-to-date');
  assert.equal(await Question.countDocuments({ authored_by: 'seed_generator' }), generated);

  const forced = await seedQuestionBank({ force: true });
  assert.equal(typeof forced.total_questions, 'number', 'forced run actually re-ran and re-stamped');
  assert.equal(await Question.countDocuments({ authored_by: 'seed_generator' }), generated, 'force re-sync duplicates nothing');
});

test('file sync inserts, updates changed content, and protects admin edits', async () => {
  const v1 = writeFile('q-v1.json', [item('Original explanation text.')]);
  const r1 = await importQuestionFile(v1, { sync: true, preflight: true, log: () => {}, warn: () => {} });
  assert.equal(r1.written, 1);
  assert.equal(r1.aborted, false);
  const q = await Question.findOne({ authored_by: 'import:exam-style-json' }).select('+solution +import_fingerprint').lean();
  assert.ok(q.import_fingerprint, 'fingerprint stored on import');
  assert.equal(await Question.countDocuments({ code: q.code }), 1);

  // Runtime/admin state that a sync must never clobber.
  await Question.updateOne({ _id: q._id }, { $set: { status: 'REJECTED', 'stats.attempts': 7 } });

  const v2 = writeFile('q-v2.json', [item('REVISEDXYZ explanation text.', '3% decrease')]);
  const r2 = await importQuestionFile(v2, { sync: true, preflight: true, log: () => {}, warn: () => {} });
  assert.equal(r2.updated, 1);
  assert.equal(await Question.countDocuments({ code: q.code }), 1, 'update created no duplicate');
  const after = await Question.findById(q._id).select('+solution').lean();
  assert.match(JSON.stringify(after.solution), /REVISEDXYZ/);
  assert.equal(after.stats.attempts, 7, 'stats preserved');
  assert.equal(after.status, 'REJECTED', 'status preserved');

  const r3 = await importQuestionFile(v2, { sync: true, log: () => {}, warn: () => {} });
  assert.equal(r3.updated, 0);
  assert.equal(r3.skipped, 1, 'identical content is skipped');

  // An admin edit bumps version (questionEdit.service) — after that the sync hands off.
  await Question.updateOne({ _id: q._id }, { $set: { version: 2 } });
  const v3 = writeFile('q-v3.json', [item('THIRDXYZ explanation text.', '5% decrease')]);
  const r4 = await importQuestionFile(v3, { sync: true, log: () => {}, warn: () => {} });
  assert.equal(r4.protected, 1);
  assert.equal(r4.updated, 0);
  const kept = await Question.findById(q._id).select('+solution').lean();
  assert.doesNotMatch(JSON.stringify(kept.solution), /THIRDXYZ/);
});

test('pre-flight validation rejects a bad file as a whole, but only warns on in-file duplicates', async () => {
  // Broken references are fatal: nothing from the file is imported.
  const bad = writeFile('q-bad.json', [{ ...item('X.'), topic: 'No Such Topic' }]);
  const badCheck = await validateQuestionFile(bad);
  assert.equal(badCheck.ok, false);
  const r = await importQuestionFile(bad, { sync: true, preflight: true, log: () => {}, warn: () => {} });
  assert.equal(r.aborted, true);
  assert.equal(r.written, 0);

  // A question repeated inside one file (real papers do this) is a warning,
  // not a failure: the file imports and the extra copy is deduped.
  const dupItem = item('Dup explanation.');
  dupItem.content.en.question_text = 'A number is increased by 10% and then decreased by 10%. What is the net change?';
  const dup = writeFile('q-dup.json', [dupItem, dupItem]);
  const check = await validateQuestionFile(dup);
  assert.equal(check.ok, true);
  assert.ok(check.warnings.some((w) => /duplicate/i.test(w)));
  const before = await Question.countDocuments({ authored_by: 'import:exam-style-json' });
  const r2 = await importQuestionFile(dup, { sync: true, preflight: true, log: () => {}, warn: () => {} });
  assert.equal(r2.aborted, false);
  assert.equal(r2.written, 1);
  assert.equal(r2.skipped, 1, 'second copy in the same file is skipped');
  assert.equal(await Question.countDocuments({ authored_by: 'import:exam-style-json' }), before + 1);
});

test('status surfaces: healthz, public endpoint, admin-only force sync', async () => {
  const health = await (await fetch(`${base.replace('/api/v1', '')}/healthz`)).json();
  assert.equal(health.status, 'ok');
  assert.equal(health.questionBank.version, QUESTION_BANK_VERSION);
  assert.equal(typeof health.questionBank.is_initialized, 'boolean');

  const pub = await (await fetch(`${base}/question-bank/status`)).json();
  assert.equal(pub.success, true);
  assert.equal(pub.data.version, QUESTION_BANK_VERSION);
  assert.equal(pub.data.status, 'completed');
  assert.equal(pub.data.is_initialized, true);
  // total_questions is the stamp from the last completed bank sync; questions
  // added by file imports afterwards are counted at the next sync (the force
  // sync at the end of this test re-stamps it exactly).
  const stamped = await mongoose.connection.db.collection('seed_state').findOne({ _id: 'question_bank' });
  assert.equal(pub.data.total_questions, stamped.total_questions);
  assert.equal(pub.data.last_error, undefined, 'public status leaks no internals');

  const anonSync = await fetch(`${base}/admin/question-bank/sync`, { method: 'POST' });
  assert.ok([401, 403].includes(anonSync.status), `anonymous sync refused (${anonSync.status})`);
  const studentSync = await fetch(`${base}/admin/question-bank/sync`, { method: 'POST', headers: { 'x-user-id': 'dev_student_1' } });
  assert.ok([401, 403].includes(studentSync.status), `dev student header never qualifies as admin (${studentSync.status})`);
  const anonStatus = await fetch(`${base}/admin/question-bank/status`);
  assert.ok([401, 403].includes(anonStatus.status));

  await fetch(`${base}/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'QB Admin', email: ADMIN_EMAIL, password: 'safe-password-123' }),
  });
  const login = await fetch(`${base}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: 'safe-password-123' }),
  });
  adminCookie = login.headers.get('set-cookie')?.split(';')[0];
  assert.ok(adminCookie, 'admin signed in');

  const adminStatus = await (await fetch(`${base}/admin/question-bank/status`, { headers: { cookie: adminCookie } })).json();
  assert.equal(adminStatus.data.version, QUESTION_BANK_VERSION);
  assert.equal(adminStatus.data.source_current, true);
  assert.ok('last_run' in adminStatus.data);

  const started = await fetch(`${base}/admin/question-bank/sync`, { method: 'POST', headers: { cookie: adminCookie } });
  assert.equal(started.status, 202);
  assert.equal((await started.json()).data.started, true);

  // The sync runs in the background; poll the admin status until it settles.
  let status = 'initializing';
  for (let i = 0; i < 240 && status === 'initializing'; i += 1) {
    await new Promise((r) => setTimeout(r, 2000));
    status = (await (await fetch(`${base}/admin/question-bank/status`, { headers: { cookie: adminCookie } })).json()).data.status;
  }
  assert.equal(status, 'completed');
  await new Promise((r) => setTimeout(r, 1000)); // let the post-chain totals stamp land
  const total = await Question.countDocuments();
  const finalState = await mongoose.connection.db.collection('seed_state').findOne({ _id: 'question_bank' });
  assert.equal(finalState.total_questions, total);
});
