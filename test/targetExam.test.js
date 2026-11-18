'use strict';

/**
 * Target exam v1: model + presenter, options list, syllabus checklist,
 * readiness, scoped priorities, and the guarantee that switching the
 * target exam never deletes progress, attempts, mistakes or plans.
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
    code: `TE-T-${String(seq).padStart(5, '0')}`,
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

// One real-paper question: refs that pyqRefBasis accepts, so the student-facing counts see it.
function pyqQuestion(subject, topic, examName, year, { adapted = false } = {}) {
  seq += 1;
  const oids = ['a', 'b', 'c', 'd'].map((c) => `opt_${seq.toString(16).padStart(6, '0')}${c}0`);
  return {
    code: `TE-P-${String(seq).padStart(5, '0')}`,
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
        question_code: `TE-${year}-Q${seq}`,
        source_url: adapted ? POLICE_COPY : OFFICIAL,
        ...(adapted ? {} : { answer_key_url: OFFICIAL_KEY }),
      }],
    },
  };
}

const bank = {}; // 'subject.topic' -> [docs]
const pyqs = {}; // examName -> [docs]
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
    // WBCS (Exe.) Prelims: 13 questions.
    ['quant', 'percentage', 'WBCS (Exe.) Prelims', 2023, 4],
    ['quant', 'profit_loss', 'WBCS (Exe.) Prelims', 2023, 2],
    ['english', 'grammar', 'WBCS (Exe.) Prelims', 2023, 3],
    ['gs', 'polity', 'WBCS (Exe.) Prelims', 2023, 2],
    ['gs', 'geography', 'WBCS (Exe.) Prelims', 2023, 1],
    ['reasoning', 'series', 'WBCS (Exe.) Prelims', 2023, 1],
    // WBPSC Clerkship (Part-I): 4 questions.
    ['quant', 'percentage', 'WBPSC Clerkship (Part-I)', 2023, 2],
    ['english', 'grammar', 'WBPSC Clerkship (Part-I)', 2023, 1],
    ['gs', 'polity', 'WBPSC Clerkship (Part-I)', 2023, 1],
    // WBP Constable (Prelims): 3 adapted questions.
    ['quant', 'percentage', 'WBP Constable (Prelims)', 2021, 2, true],
    ['gs', 'polity', 'WBP Constable (Prelims)', 2021, 1, true],
    // Kolkata Police Constable (Prelims): 2 adapted questions.
    ['quant', 'number_system', 'Kolkata Police Constable (Prelims)', 2023, 2, true],
  ];
  for (const [subject, topic, examName, year, n, adapted] of pyqSpec) {
    const docs = [];
    for (let i = 0; i < n; i++) docs.push(await Question.create(pyqQuestion(subject, topic, examName, year, { adapted: Boolean(adapted) })));
    (pyqs[examName] ??= []).push(...docs);
  }
}

async function registerUser(email) {
  const reg = await call('POST', '/auth/register', { body: { name: 'Test Student', email, password: 'secret123' } });
  assert.equal(reg.status, 201, JSON.stringify(reg.body));
  return { id: reg.body.data.user.id, cookie: cookieFrom(reg.setCookie) };
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('target_exam_test'));
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

test('GET /me returns targetExam; set / change / clear round-trips, bad input is rejected', async () => {
  const u = await registerUser('target1@example.com');

  const me0 = await call('GET', '/me', { cookie: u.cookie });
  assert.equal(me0.status, 200, JSON.stringify(me0.body));
  assert.equal(me0.body.data.user.targetExam, null);

  const set = await call('PUT', '/me/target-exam', { cookie: u.cookie, body: { examCode: 'WBCS', examDate: '2027-02-01' } });
  assert.equal(set.status, 200, JSON.stringify(set.body));
  assert.equal(set.body.data.user.targetExam.code, 'WBCS');
  assert.equal(set.body.data.user.targetExam.date, '2027-02-01');
  assert.ok(set.body.data.user.targetExam.setAt);

  const me1 = await call('GET', '/me', { cookie: u.cookie });
  assert.equal(me1.body.data.user.targetExam.code, 'WBCS');
  assert.equal(me1.body.data.user.targetExam.date, '2027-02-01');

  // Change without a date: the old date does not linger.
  const change = await call('PUT', '/me/target-exam', { cookie: u.cookie, body: { examCode: 'KP_CONSTABLE', examDate: null } });
  assert.equal(change.status, 200, JSON.stringify(change.body));
  assert.equal(change.body.data.user.targetExam.code, 'KP_CONSTABLE');
  assert.equal(change.body.data.user.targetExam.date, null);
  assert.ok(change.body.data.user.targetExam.setAt);

  // Unknown code and bad dates are rejected.
  const unknown = await call('PUT', '/me/target-exam', { cookie: u.cookie, body: { examCode: 'NOPE', examDate: null } });
  assert.equal(unknown.status, 422);
  assert.equal(unknown.body.error.code, 'UNKNOWN_EXAM');
  const badDate = await call('PUT', '/me/target-exam', { cookie: u.cookie, body: { examCode: 'WBCS', examDate: '2027-02-30' } });
  assert.equal(badDate.status, 422);
  assert.equal(badDate.body.error.code, 'INVALID_EXAM_DATE');
  const junkDate = await call('PUT', '/me/target-exam', { cookie: u.cookie, body: { examCode: 'WBCS', examDate: 'next month' } });
  assert.equal(junkDate.status, 422);

  // Clear: exam, date and setAt all go null — even when a date is sent with the clear.
  const clear = await call('PUT', '/me/target-exam', { cookie: u.cookie, body: { examCode: null, examDate: '2027-02-01' } });
  assert.equal(clear.status, 200, JSON.stringify(clear.body));
  assert.equal(clear.body.data.user.targetExam, null);
  const stored = await User.findById(u.id).lean();
  assert.equal(stored.target_exam, null);
  assert.equal(stored.target_exam_date, null);
  assert.equal(stored.target_exam_set_at, null);
});

test('options list has all 16 exams with honest support levels and PYQ counts', async () => {
  const u = await registerUser('target2@example.com');
  const res = await call('GET', '/me/target-exam/options', { cookie: u.cookie });
  assert.equal(res.status, 200, JSON.stringify(res.body));
  const exams = res.body.data.exams;
  assert.equal(exams.length, 16);
  const byCode = new Map(exams.map((e) => [e.code, e]));
  const support = (level) => exams.filter((e) => e.support === level).map((e) => e.code).sort();
  assert.deepEqual(support('full'), ['WBPSC_CLERKSHIP', 'WBPSC_IDO']);
  assert.deepEqual(support('partial'), ['KP_CONSTABLE', 'WBCS', 'WBPSC_MISC', 'WBP_CONSTABLE']);
  assert.equal(support('minimal').length, 10);
  assert.deepEqual(exams.filter((e) => e.pyqCount > 0).map((e) => e.code).sort(),
    ['KP_CONSTABLE', 'WBCS', 'WBPSC_CLERKSHIP', 'WBP_CONSTABLE']);
  assert.equal(byCode.get('WBCS').pyqCount, 13);
  assert.equal(byCode.get('WBPSC_CLERKSHIP').pyqCount, 4);
  assert.equal(byCode.get('WBP_CONSTABLE').pyqCount, 3);
  assert.equal(byCode.get('KP_CONSTABLE').pyqCount, 2);
  assert.equal(byCode.get('WBPSC_MISC').pyqCount, 0);
  assert.equal(byCode.get('SSC_CGL').pyqCount, 0);
  assert.equal(byCode.get('WBPSC_CLERKSHIP').planCode, 'CLERKSHIP_60');
  assert.equal(byCode.get('WBPSC_CLERKSHIP').planRoute, '/plan');
  assert.equal(byCode.get('WBPSC_IDO').planCode, 'IDO');
  assert.equal(byCode.get('WBPSC_IDO').planRoute, '/plan/ido');
  assert.equal(byCode.get('WBCS').planCode, null);
  assert.equal(byCode.get('WBCS').hasPattern, true);
  assert.equal(byCode.get('WB_POST_GDS').hasPattern, false);
});

test('syllabus for WBCS: pattern weights, PYQ chapter weights, completion and readiness', async () => {
  const u = await registerUser('target3@example.com');
  await call('PUT', '/me/target-exam', { cookie: u.cookie, body: { examCode: 'WBCS', examDate: null } });

  // 5 polity bank (4 right), 2 geography bank (right), 1 grammar bank (right):
  // 10 attempts in all, 9 correct. Plus 2 WBCS polity PYQs solved.
  const attempts = [
    ...bank['gs.polity'].slice(0, 5).map((q, i) => ({ question_id: q._id, subject: 'gs', topic: 'polity', correct: i < 4 })),
    ...bank['gs.geography'].slice(0, 2).map((q) => ({ question_id: q._id, subject: 'gs', topic: 'geography', correct: true })),
    ...bank['english.grammar'].slice(0, 1).map((q) => ({ question_id: q._id, subject: 'english', topic: 'grammar', correct: true })),
    ...pyqs['WBCS (Exe.) Prelims'].filter((q) => q.topic === 'polity').map((q) => ({ question_id: q._id, subject: 'gs', topic: 'polity', correct: true })),
  ];
  await PracticeAttempt.insertMany(attempts.map((a) => ({ user_id: u.id, ...a, source: 'practice' })));

  const res = await call('GET', '/me/target-exam/syllabus', { cookie: u.cookie });
  assert.equal(res.status, 200, JSON.stringify(res.body));
  const s = res.body.data;
  assert.equal(s.exam.code, 'WBCS');
  assert.equal(s.exam.support, 'partial');
  assert.equal(s.pattern.totalMarks, 200);
  assert.equal(s.pattern.sections.length, 8);

  const bySubject = new Map(s.subjects.map((x) => [x.subject, x]));
  // Pattern subjects only: WBCS Prelims has no quant section.
  assert.deepEqual([...bySubject.keys()].sort(), ['english', 'gs', 'reasoning']);
  assert.equal(bySubject.get('english').weight, 12.5);
  assert.equal(bySubject.get('gs').weight, 75);
  assert.equal(bySubject.get('reasoning').weight, 12.5);
  assert.equal(bySubject.get('english').weightSource, 'pattern');

  // Chapter weights are this exam's PYQ shares within the subject.
  const gsChapters = new Map(bySubject.get('gs').chapters.map((c) => [c.topic, c]));
  assert.equal(gsChapters.get('polity').weight, 66.7); // 2 of 3 GS refs
  assert.equal(gsChapters.get('polity').weightSource, 'pyq');
  assert.equal(gsChapters.get('geography').weight, 33.3); // 1 of 3
  assert.equal(bySubject.get('english').chapters.find((c) => c.topic === 'grammar').weight, 100);
  assert.equal(bySubject.get('reasoning').chapters.find((c) => c.topic === 'series').weight, 100);

  // Completion and PYQ progress per chapter. bankCount counts every published
  // question in the topic, PYQs included (they are part of the bank).
  assert.equal(gsChapters.get('polity').bankCount, 14); // 10 bank + 4 PYQs (WBCS 2, Clerkship 1, WBP 1)
  assert.equal(gsChapters.get('polity').answered, 7); // 5 bank + 2 PYQ
  assert.equal(gsChapters.get('polity').completion, 50);
  assert.equal(gsChapters.get('polity').pyqCount, 2);
  assert.equal(gsChapters.get('polity').pyqSolved, 2);
  assert.equal(gsChapters.get('geography').completion, 33.3); // 2 of 6 (5 bank + 1 PYQ)
  assert.equal(gsChapters.get('polity').hasLesson, false);

  // Readiness: coverage from the data, accuracy 9/10, pyq 2/13.
  assert.equal(s.readiness.components.accuracy, 90);
  assert.equal(s.readiness.components.pyq, 15.4);
  assert.ok(s.readiness.components.coverage > 0);
  const { coverage, accuracy, pyq } = s.readiness.components;
  assert.equal(s.readiness.score, Math.round(0.5 * coverage + 0.3 * accuracy + 0.2 * pyq));
  assert.deepEqual(s.readiness.basis.missing, []);
  assert.equal(s.countdown, null); // no exam date set
});

test('syllabus for WBP_CONSTABLE and KP_CONSTABLE reflects their own patterns', async () => {
  const u = await registerUser('target4@example.com');

  await call('PUT', '/me/target-exam', { cookie: u.cookie, body: { examCode: 'WBP_CONSTABLE', examDate: null } });
  const wbp = await call('GET', '/me/target-exam/syllabus', { cookie: u.cookie });
  assert.equal(wbp.status, 200, JSON.stringify(wbp.body));
  const wbpSubjects = new Map(wbp.body.data.subjects.map((x) => [x.subject, x]));
  assert.deepEqual([...wbpSubjects.keys()].sort(), ['english', 'gs', 'quant', 'reasoning']);
  // 85 marks in total (25 + 10 + 25 + 25), so the shares are not round numbers.
  assert.equal(wbpSubjects.get('gs').weight, 29.4);
  assert.equal(wbpSubjects.get('english').weight, 11.8);
  assert.equal(wbpSubjects.get('quant').weight, 29.4);
  assert.equal(wbpSubjects.get('reasoning').weight, 29.4);
  // WBP quant PYQs are all percentage: weight 100 within quant.
  assert.equal(wbpSubjects.get('quant').chapters.find((c) => c.topic === 'percentage').weight, 100);
  assert.equal(wbpSubjects.get('quant').chapters.find((c) => c.topic === 'percentage').pyqCount, 2);

  // KP Prelims has NO English section — English must not appear at all.
  await call('PUT', '/me/target-exam', { cookie: u.cookie, body: { examCode: 'KP_CONSTABLE', examDate: null } });
  const kp = await call('GET', '/me/target-exam/syllabus', { cookie: u.cookie });
  assert.equal(kp.status, 200, JSON.stringify(kp.body));
  const kpSubjects = new Map(kp.body.data.subjects.map((x) => [x.subject, x]));
  assert.deepEqual([...kpSubjects.keys()].sort(), ['gs', 'quant', 'reasoning']);
  assert.equal(kpSubjects.get('gs').weight, 40);
  assert.equal(kpSubjects.get('quant').weight, 30);
  assert.equal(kpSubjects.get('reasoning').weight, 30);
  assert.equal(kpSubjects.get('quant').chapters.find((c) => c.topic === 'number_system').pyqCount, 2);
});

test('syllabus for SSC_CGL is minimal: null chapter weights, honest notes, no readiness without data', async () => {
  const u = await registerUser('target5@example.com');
  await call('PUT', '/me/target-exam', { cookie: u.cookie, body: { examCode: 'SSC_CGL', examDate: null } });
  const res = await call('GET', '/me/target-exam/syllabus', { cookie: u.cookie });
  assert.equal(res.status, 200, JSON.stringify(res.body));
  const s = res.body.data;
  assert.equal(s.exam.support, 'minimal');
  assert.equal(s.exam.hasPlan, false);
  const bySubject = new Map(s.subjects.map((x) => [x.subject, x]));
  assert.equal(bySubject.get('quant').weight, 25);
  assert.equal(bySubject.get('english').weight, 25);
  for (const subj of s.subjects) {
    assert.ok(subj.chapters.length > 0);
    assert.ok(subj.chapters.every((c) => c.weight === null && c.weightSource === null), subj.subject);
    assert.ok(subj.note, `expected a note on ${subj.subject}`);
    assert.ok(subj.chapters.every((c) => c.pyqCount === 0));
  }
  assert.equal(s.readiness.score, null);
  assert.deepEqual(s.readiness.components, { coverage: null, accuracy: null, pyq: null });
  assert.match(s.readiness.note, /Not enough data yet/);
});

test('syllabus with no target exam is a 422 NO_TARGET_EXAM; countdown appears once a date is set', async () => {
  const u = await registerUser('target6@example.com');
  const none = await call('GET', '/me/target-exam/syllabus', { cookie: u.cookie });
  assert.equal(none.status, 422);
  assert.equal(none.body.error.code, 'NO_TARGET_EXAM');

  // A date 30 days out: daysLeft is 30 (UTC-midnight math, same as the service).
  const in30 = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
  await call('PUT', '/me/target-exam', { cookie: u.cookie, body: { examCode: 'WBCS', examDate: in30 } });
  const res = await call('GET', '/me/target-exam/syllabus', { cookie: u.cookie });
  assert.equal(res.status, 200, JSON.stringify(res.body));
  assert.equal(res.body.data.countdown.examDate, in30);
  assert.equal(res.body.data.countdown.daysLeft, 30);
});

test('priorities scoped to WBCS differ from pooled; unknown code is a 422, no-PYQ code is empty with a note', async () => {
  const u = await registerUser('target7@example.com');
  const scoped = await call('GET', '/pyq/priorities?exam=WBCS', { cookie: u.cookie });
  assert.equal(scoped.status, 200, JSON.stringify(scoped.body));
  assert.equal(scoped.body.data.questionCount, 13);
  assert.equal(scoped.body.data.exam, 'WBCS');
  assert.equal(scoped.body.data.examName, 'WBCS (Exe.) Prelims');
  assert.equal(scoped.body.data.subjects.gs.topics.polity.count, 2);

  const pooled = await call('GET', '/pyq/priorities', { cookie: u.cookie });
  assert.equal(pooled.status, 200, JSON.stringify(pooled.body));
  assert.equal(pooled.body.data.questionCount, 22); // 13 WBCS + 4 Clerkship + 3 WBP + 2 KP
  assert.ok(!('exam' in pooled.body.data));

  const unknown = await call('GET', '/pyq/priorities?exam=NOPE', { cookie: u.cookie });
  assert.equal(unknown.status, 422);
  assert.equal(unknown.body.error.code, 'UNKNOWN_EXAM');

  const minimal = await call('GET', '/pyq/priorities?exam=SSC_CGL', { cookie: u.cookie });
  assert.equal(minimal.status, 200, JSON.stringify(minimal.body));
  assert.equal(minimal.body.data.questionCount, 0);
  assert.deepEqual(minimal.body.data.subjects, {});
  assert.ok(minimal.body.data.note);
  clearPriorityCache();
  clearTargetExamCache();
});

test('switching the target exam leaves attempts, mistakes and plan progress untouched', async () => {
  const u = await registerUser('target8@example.com');
  const q = bank['quant.percentage'][0];
  await PracticeAttempt.create({ user_id: u.id, question_id: q._id, subject: 'quant', topic: 'percentage', correct: true, source: 'practice' });
  await ReviewItem.create({
    user_id: u.id, question_id: q._id, subject: 'quant', topic: 'percentage',
    from_mistake: true, wrong_count: 1, due_at: new Date(),
  });
  await StudyPlanProgress.create({ user_id: u.id, plan: 'CLERKSHIP_60', start_date: '2026-11-01', done: ['d1-1'], plan_version: 1 });

  const before = {
    attempts: await PracticeAttempt.countDocuments({ user_id: u.id }),
    review: await ReviewItem.countDocuments({ user_id: u.id }),
    plans: await StudyPlanProgress.countDocuments({ user_id: u.id }),
  };
  assert.deepEqual(before, { attempts: 1, review: 1, plans: 1 });

  await call('PUT', '/me/target-exam', { cookie: u.cookie, body: { examCode: 'WBCS', examDate: '2027-02-01' } });
  await call('PUT', '/me/target-exam', { cookie: u.cookie, body: { examCode: 'SSC_CGL', examDate: null } });
  await call('PUT', '/me/target-exam', { cookie: u.cookie, body: { examCode: null, examDate: null } });

  const after = {
    attempts: await PracticeAttempt.countDocuments({ user_id: u.id }),
    review: await ReviewItem.countDocuments({ user_id: u.id }),
    plans: await StudyPlanProgress.countDocuments({ user_id: u.id }),
  };
  assert.deepEqual(after, before);
  const planRow = await StudyPlanProgress.findOne({ user_id: u.id }).lean();
  assert.deepEqual(planRow.done, ['d1-1']);
});
