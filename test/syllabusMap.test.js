'use strict';

/**
 * Exam Syllabus Map (F2): GET /me/target-exam/syllabus-map/:examCode for any
 * catalogue exam — subject -> chapter -> subtopic with syllabus verdicts
 * (in / supplementary / out / unmapped, never guessed), PYQ-based priorities,
 * honest weights, and the student's status + mastery per chapter.
 *
 * Seeding mirrors targetExam.test.js: the real catalogue, a small bank, and
 * real-paper PYQs for WBCS, Clerkship, WBP Constable and KP Constable.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { ExamCategory, Question, User, PracticeAttempt, ReviewItem, StudyPlanProgress } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const { clearTargetExamCache } = require('../src/services/targetExam.service');
const { clearPriorityCache } = require('../src/services/priority.service');
const { clearSyllabusMapCache, chapterVerdict } = require('../src/services/syllabusMap.service');
const catalog = require('../db/seed/catalog');

let mongod;
let server;
let base;

async function call(method, url, { body, cookie } = {}) {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', ...(cookie && { cookie }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json(), setCookie: res.headers.get('set-cookie') };
}
const cookieFrom = (setCookie) => setCookie?.split(';')[0];

const OFFICIAL = 'https://psc.wb.gov.in/Download?paper=1';
const OFFICIAL_KEY = 'https://psc.wb.gov.in/Download?key=1';
const POLICE_COPY = 'https://teachingninja.in/papers/wbp-2021.pdf';

let seq = 0;
function bankQuestion(subject, topic) {
  seq += 1;
  const oids = ['a', 'b', 'c', 'd'].map((c) => `opt_${seq.toString(16).padStart(6, '0')}${c}0`);
  return {
    code: `SM-T-${String(seq).padStart(5, '0')}`,
    exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }],
    subject,
    topic,
    difficulty: 3,
    stem: { en: `Bank Q${seq}`, bn: `প্রশ্ন ${seq}` },
    options: oids.map((oid, k) => ({ oid, text: { en: `${k}`, bn: `${k}` } })),
    correct_option_id: oids[0],
    solution: { steps: [{ en: 'Step', bn: 'ধাপ' }] },
    status: 'PUBLISHED',
  };
}

function pyqQuestion(subject, topic, examName, year, { adapted = false } = {}) {
  seq += 1;
  const oids = ['a', 'b', 'c', 'd'].map((c) => `opt_${seq.toString(16).padStart(6, '0')}${c}0`);
  return {
    code: `SM-P-${String(seq).padStart(5, '0')}`,
    exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }],
    subject,
    topic,
    difficulty: 3,
    stem: { en: `PYQ Q${seq}`, bn: `প্রশ্ন ${seq}` },
    options: oids.map((oid, k) => ({ oid, text: { en: `${k}`, bn: `${k}` } })),
    correct_option_id: oids[0],
    solution: { steps: [{ en: 'Step', bn: 'ধাপ' }] },
    status: 'PUBLISHED',
    provenance: adapted ? 'ADAPTED_PYQ' : 'OFFICIAL_VERIFIED',
    pyq: {
      is_pyq: true,
      refs: [{
        exam_name: examName,
        tier: 'PRELIMS',
        year,
        question_code: `SM-${year}-Q${seq}`,
        source_url: adapted ? POLICE_COPY : OFFICIAL,
        ...(adapted ? {} : { answer_key_url: OFFICIAL_KEY }),
      }],
    },
  };
}

const bank = {};
async function seedBank() {
  const spec = [
    ['quant', 'percentage', 10], ['quant', 'profit_loss', 10], ['quant', 'number_system', 10],
    ['english', 'grammar', 10], ['english', 'synonyms_antonyms', 5],
    ['gs', 'polity', 10], ['gs', 'geography', 5], ['gs', 'indian_history', 5],
    ['reasoning', 'series', 5],
  ];
  for (const [subject, topic, n] of spec) {
    bank[`${subject}.${topic}`] = await Question.insertMany(Array.from({ length: n }, () => bankQuestion(subject, topic)));
  }
  const pyqSpec = [
    ['quant', 'percentage', 'WBCS (Exe.) Prelims', 2023, 4],
    ['quant', 'profit_loss', 'WBCS (Exe.) Prelims', 2023, 2],
    ['english', 'grammar', 'WBCS (Exe.) Prelims', 2023, 3],
    ['gs', 'polity', 'WBCS (Exe.) Prelims', 2023, 2],
    ['gs', 'geography', 'WBCS (Exe.) Prelims', 2023, 1],
    ['reasoning', 'series', 'WBCS (Exe.) Prelims', 2023, 1],
    ['quant', 'percentage', 'WBPSC Clerkship (Part-I)', 2023, 2],
    ['english', 'grammar', 'WBPSC Clerkship (Part-I)', 2023, 1],
    ['gs', 'polity', 'WBPSC Clerkship (Part-I)', 2023, 1],
    ['quant', 'percentage', 'WBP Constable (Prelims)', 2021, 2, true],
    ['gs', 'polity', 'WBP Constable (Prelims)', 2021, 1, true],
    ['quant', 'number_system', 'Kolkata Police Constable (Prelims)', 2023, 2, true],
  ];
  for (const [subject, topic, examName, year, n, adapted] of pyqSpec) {
    for (let i = 0; i < n; i++) await Question.create(pyqQuestion(subject, topic, examName, year, { adapted: Boolean(adapted) }));
  }
}

async function registerUser(email) {
  const reg = await call('POST', '/auth/register', { body: { name: 'Map Student', email, password: 'secret123' } });
  assert.equal(reg.status, 201, JSON.stringify(reg.body));
  return { id: reg.body.data.user.id, cookie: cookieFrom(reg.setCookie) };
}

const chapterOf = (map, subject, topic) =>
  map.subjects.find((s) => s.subject === subject)?.chapters.find((c) => c.topic === topic);

/** A catalogue topic of the category whose official status is UNVERIFIED — safe for unmapped assertions. */
function anUnverifiedTopic(categoryCode, subject) {
  const cat = catalog.find((c) => c.code === categoryCode);
  const sub = cat.subjects.find((s) => s.code === subject);
  return sub.topics.find((t) => (t.syllabus_status ?? 'UNVERIFIED') === 'UNVERIFIED');
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('syllabus_map_test'));
  await Promise.all([ExamCategory.init(), Question.init(), User.init(), PracticeAttempt.init(), ReviewItem.init(), StudyPlanProgress.init()]);
  await ExamCategory.insertMany(catalog);
  await seedBank();
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod.stop();
});

test('verdict rules: official beats everything, plan absence is out, PYQ presence is in, otherwise unmapped', () => {
  const node = (syllabus_status) => ({ syllabus_status, syllabus_note: undefined, syllabus_source_url: undefined });
  const base = { examCode: 'WBCS', subject: 'quant', topic: 'percentage', plan: null, patternSubjects: null, pyqCount: 0 };
  assert.equal(chapterVerdict({ ...base, topicNode: node('SYLLABUS'), pyqCount: 0 }).status, 'in');
  assert.equal(chapterVerdict({ ...base, topicNode: node('SYLLABUS') }).basis, 'official');
  assert.equal(chapterVerdict({ ...base, topicNode: node('SUPPLEMENTARY'), pyqCount: 9 }).status, 'supplementary');
  assert.equal(chapterVerdict({ ...base, topicNode: node('UNVERIFIED'), pyqCount: 3 }).status, 'in');
  assert.equal(chapterVerdict({ ...base, topicNode: node('UNVERIFIED'), pyqCount: 3 }).basis, 'pyq');
  assert.equal(chapterVerdict({ ...base, topicNode: node('UNVERIFIED'), pyqCount: 0 }).status, 'unmapped');
  const plan = { subjects: new Set(['quant']), topics: new Set(['quant.percentage']), subjectLevel: new Set() };
  assert.equal(chapterVerdict({ ...base, topicNode: node('UNVERIFIED'), plan }).status, 'in');
  assert.equal(chapterVerdict({ ...base, topicNode: node('UNVERIFIED'), plan, topic: 'algebra' }).status, 'out');
  assert.equal(chapterVerdict({ ...base, topicNode: node('UNVERIFIED'), plan, topic: 'algebra' }).basis, 'plan');
});

test('auth + unknown exam handling', async () => {
  clearTargetExamCache(); clearPriorityCache(); clearSyllabusMapCache();
  const anon = await call('GET', '/me/target-exam/syllabus-map/WBCS');
  assert.equal(anon.status, 401);
  const u = await registerUser('map0@example.com');
  const bad = await call('GET', '/me/target-exam/syllabus-map/NOPE_EXAM', { cookie: u.cookie });
  assert.equal(bad.status, 422);
  assert.equal(bad.body.error.code, 'UNKNOWN_EXAM');
});

test('WBCS map: full category coverage, PYQ chapters in with priority, untouched chapters unmapped — nothing invented', async () => {
  const u = await registerUser('map1@example.com');
  const res = await call('GET', '/me/target-exam/syllabus-map/WBCS', { cookie: u.cookie });
  assert.equal(res.status, 200, JSON.stringify(res.body));
  const d = res.body.data;
  assert.equal(d.exam.code, 'WBCS');
  assert.equal(d.exam.category, 'WBPSC');
  assert.equal(d.exam.isTarget, false);
  const cat = catalog.find((c) => c.code === 'WBPSC');
  const totalTopics = cat.subjects.reduce((n, s) => n + s.topics.length, 0);
  assert.equal(d.coverage.chapters.total, totalTopics);
  const cov = d.coverage.chapters;
  assert.equal(cov.in + cov.supplementary + cov.out + cov.unmapped, cov.total, 'verdicts must partition the chapters');

  const pct = chapterOf(d, 'quant', 'percentage');
  assert.equal(pct.syllabus, 'in');
  assert.equal(pct.syllabusBasis, 'pyq');
  assert.equal(pct.pyqCount, 4);
  assert.equal(pct.priority, 'high'); // 4 of 6 WBCS quant refs, in the only paper -> MUST
  assert.equal(pct.priorityLevel, 'MUST');
  assert.ok(pct.weight > 0 && pct.weightSource === 'pyq');
  assert.equal(pct.status, 'not_started');
  assert.equal(pct.mastery.status, 'not_started');
  assert.ok(Array.isArray(pct.subtopics));

  const geo = chapterOf(d, 'gs', 'geography');
  assert.equal(geo.syllabus, 'in');
  assert.equal(geo.pyqCount, 1);

  // A chapter WBCS papers never asked from, with no official mapping:
  // unmapped, no priority; its PYQ-share weight is a measured 0, not a guess.
  const catQ = catalog.find((c) => c.code === 'WBPSC').subjects.find((s) => s.code === 'quant');
  const untouched = catQ.topics.find((t) => (t.syllabus_status ?? 'UNVERIFIED') === 'UNVERIFIED' && !['percentage', 'profit_loss'].includes(t.code));
  const un = chapterOf(d, 'quant', untouched.code);
  assert.equal(un.syllabus, 'unmapped');
  assert.equal(un.priority, null);
  assert.equal(un.weight, 0);
  assert.equal(un.weightSource, 'pyq');
  assert.ok(d.unmappedTopics.includes(`quant.${untouched.code}`));
  assert.ok(d.dataGaps.length >= 1);
  assert.ok(d.priorityRule && d.priorityPaperCount === 1);
});

test('Clerkship map: plan chapters in, reasoning out (no plan subject, no pattern section), priorities from Clerkship PYQs', async () => {
  const u = await registerUser('map2@example.com');
  const res = await call('GET', '/me/target-exam/syllabus-map/WBPSC_CLERKSHIP', { cookie: u.cookie });
  assert.equal(res.status, 200, JSON.stringify(res.body));
  const d = res.body.data;
  assert.equal(d.exam.hasPlan, true);

  const pct = chapterOf(d, 'quant', 'percentage');
  assert.equal(pct.syllabus, 'in');
  assert.ok(['plan', 'pyq', 'hardbank', 'official'].includes(pct.syllabusBasis));
  assert.equal(pct.pyqCount, 2);

  const series = chapterOf(d, 'reasoning', 'series');
  assert.equal(series.syllabus, 'out', 'Clerkship Part-I has no reasoning in plan or pattern');

  const cov = d.coverage.chapters;
  assert.equal(cov.in + cov.supplementary + cov.out + cov.unmapped, cov.total);
  assert.ok(cov.out >= 1);
});

test('WBP and KP maps (WB_POLICE category): adapted PYQs count, KP english is not claimed in', async () => {
  const u = await registerUser('map3@example.com');
  const wbp = await call('GET', '/me/target-exam/syllabus-map/WBP_CONSTABLE', { cookie: u.cookie });
  assert.equal(wbp.status, 200, JSON.stringify(wbp.body));
  const wd = wbp.body.data;
  assert.equal(wd.exam.category, 'WB_POLICE');
  const wpct = chapterOf(wd, 'quant', 'percentage');
  assert.equal(wpct.syllabus, 'in');
  assert.equal(wpct.syllabusBasis, 'pyq');
  assert.equal(wpct.pyqCount, 2);

  const kp = await call('GET', '/me/target-exam/syllabus-map/KP_CONSTABLE', { cookie: u.cookie });
  assert.equal(kp.status, 200, JSON.stringify(kp.body));
  const kd = kp.body.data;
  const knum = chapterOf(kd, 'quant', 'number_system');
  assert.equal(knum.syllabus, 'in');
  assert.equal(knum.pyqCount, 2);
  // KP's official pattern has no English section and no KP English PYQs are
  // seeded: the map must not claim English chapters are in the syllabus.
  const kEng = chapterOf(kd, 'english', 'grammar');
  assert.notEqual(kEng.syllabus, 'in');
});

test('student status + mastery: mastered / in_progress / not_started from real attempts', async () => {
  const u = await registerUser('map4@example.com');
  // Every published percentage question (bank + PYQs share the pool) answered
  // correctly -> completion 100 and, with 10+ recent answers at 100% on
  // difficulty-3 questions, mastery strong.
  const allPct = await Question.find({ subject: 'quant', topic: 'percentage', status: 'PUBLISHED' }).lean();
  assert.ok(allPct.length >= 10);
  await PracticeAttempt.insertMany(allPct.map((q) => ({
    user_id: u.id, question_id: q._id, subject: 'quant', topic: 'percentage', correct: true, source: 'practice',
  })));
  // 3 of 10 profit_loss answered -> in progress.
  await PracticeAttempt.insertMany(bank['quant.profit_loss'].slice(0, 3).map((q) => ({
    user_id: u.id, question_id: q._id, subject: 'quant', topic: 'profit_loss', correct: false, source: 'practice',
  })));

  const res = await call('GET', '/me/target-exam/syllabus-map/WBCS', { cookie: u.cookie });
  assert.equal(res.status, 200, JSON.stringify(res.body));
  const d = res.body.data;
  const pct = chapterOf(d, 'quant', 'percentage');
  assert.equal(pct.completion, 100);
  assert.equal(pct.mastery.status, 'strong');
  assert.equal(pct.status, 'mastered');
  const pl = chapterOf(d, 'quant', 'profit_loss');
  assert.equal(pl.status, 'in_progress');
  assert.equal(pl.answered, 3);
  const geo = chapterOf(d, 'gs', 'geography');
  assert.equal(geo.status, 'not_started');
});

test('an exam with no PYQs and no plan (SSC_CGL) still maps, with priorities null and the gap stated', async () => {
  const u = await registerUser('map5@example.com');
  const res = await call('GET', '/me/target-exam/syllabus-map/SSC_CGL', { cookie: u.cookie });
  assert.equal(res.status, 200, JSON.stringify(res.body));
  const d = res.body.data;
  assert.equal(d.exam.category, 'SSC');
  assert.equal(d.coverage.chapters.withPriority, 0);
  assert.ok(d.dataGaps.some((g) => g.includes('previous-year')), JSON.stringify(d.dataGaps));
});
