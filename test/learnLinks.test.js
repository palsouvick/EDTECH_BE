'use strict';

/**
 * "📖 Learn this topic" back-links (F6): each question links to where its concept is taught, using only
 * relationships that already exist (book section tags, the checked PYQ map, GK fact links, a chapter's
 * declared subtopics, lessons, concept sheets), and to nothing when none applies. Uses the real books in
 * db/books.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { Question, GkFact, TopicSummary } = require('../src/models');
const books = require('../src/services/books');
const statsBuffer = require('../src/services/questionStats.buffer');
const { learnLinksFor, clearLearnLinksCache } = require('../src/services/learnLinks.service');

let mongod;
let server;
let base;

async function api(method, url, body, user = 'student_ll') {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', ...(user && { 'x-user-id': user }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json() };
}

let n = 0;
/** A published question; `extra` sets taxonomy, tags, facts and PYQ refs. */
function Q(extra) {
  n += 1;
  const ids = ['a', 'b', 'c', 'd'].map((c) => `opt_ll${String(n).padStart(3, '0')}${c}`);
  return {
    code: `LL-${n}`,
    exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }],
    subject: 'gs',
    topic: 'indian_history',
    difficulty: 2,
    stem: { en: `Learn-link question ${n}`, bn: `প্রশ্ন ${n}` },
    options: ids.map((oid, k) => ({ oid, text: { en: `Option ${k}`, bn: `বিকল্প ${k}` } })),
    correct_option_id: ids[0],
    solution: { steps: [{ en: 'Because.', bn: 'কারণ।' }] },
    status: 'PUBLISHED',
    ...extra,
  };
}
const pyqRef = (code) => ({ pyq: { refs: [{ exam_name: 'WBCS (Exe.) Prelims', year: 2015, question_code: code }] } });

const his19 = () => books.loadBook('history').chapters.get('HIS-19');
const ids = {};

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('learn_links_test'));
  await Promise.all([Question.init(), GkFact.init(), TopicSummary.init()]);

  // Facts go in raw: the link only needs code, topic, subtopic, title and status.
  const [pub, draft] = [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()];
  await GkFact.collection.insertMany([
    { _id: pub, code: 'GK-HIS-901', topic: 'indian_history', subtopic: 'revolt_1857', title: { en: 'Barrackpore, 1857', bn: 'ব্যারাকপুর, ১৮৫৭' }, status: 'PUBLISHED' },
    { _id: draft, code: 'GK-HIS-902', topic: 'indian_history', subtopic: 'revolt_1857', title: { en: 'Draft fact' }, status: 'DRAFT' },
  ]);
  await TopicSummary.collection.insertOne({ subject: 'reasoning', topic: 'analogy', subtopic: null, status: 'PUBLISHED', slug: 'reasoning.analogy', syllabus_map: [{ category: 'WB_POLICE' }, { category: 'WBPSC' }] });

  const docs = {
    bookTagged: Q({ subtopic: 'revolt_1857', concept_tags: ['book', 'book:HIS-19', 'book:HIS-19:repression', 'level:basic'] }),
    taughtPyq: Q(pyqRef('WBCS-EXE-PRELIMS-2015-PRELIMS-Q37')),
    untaughtPyq: Q({ subtopic: 'revolt_1857', ...pyqRef('INDUSTRIAL-DEVELOPMENT-OFFICER-2019-SINGLE-Q17') }),
    factLinked: Q({ subtopic: 'revolt_1857', fact_ids: [pub] }),
    draftFactOnly: Q({ subtopic: 'sultanate_x', fact_ids: [draft] }),
    subtopicOnly: Q({ subtopic: 'revolt_1857' }),
    ambiguous: Q({ topic: 'polity', subtopic: 'parliament' }),
    noSource: Q({ topic: 'current_affairs' }),
    lesson: Q({ subject: 'quant', topic: 'percentage', pattern: 'percent_of_number' }),
    sheet: Q({ subject: 'reasoning', topic: 'analogy', exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }] }),
    noSheet: Q({ subject: 'reasoning', topic: 'syllogism' }),
  };
  const inserted = await Question.insertMany(Object.values(docs));
  Object.keys(docs).forEach((k, i) => {
    ids[k] = String(inserted[i]._id);
  });
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  books.setOverrides(new Map());
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

test('a book question links to its own section, with Subject → Chapter → Topic', async () => {
  const l = (await learnLinksFor([ids.bookTagged])).get(ids.bookTagged);
  const ch = his19();
  assert.deepEqual(
    { kind: l.kind, card: l.card, book: l.book, chapter: l.chapter, section: l.section },
    { kind: 'book', card: 'indian_history', book: 'history', chapter: 'HIS-19', section: 'repression' },
  );
  assert.deepEqual(l.crumbs, [
    { en: 'Indian History', bn: 'ভারতের ইতিহাস' },
    { bn: ch.title },
    { bn: ch.sections.find((s) => s.id === 'repression').heading },
  ]);
});

test('a real PYQ links to the section the checked PYQ map says teaches it', async () => {
  const l = (await learnLinksFor([ids.taughtPyq])).get(ids.taughtPyq);
  assert.equal(l.chapter, 'HIS-19');
  assert.equal(l.section, 'repression');
});

test('a PYQ the chapter marks "not taught" is not sent to that chapter', async () => {
  assert.equal((await learnLinksFor([ids.untaughtPyq])).get(ids.untaughtPyq), null);
});

test('a GK-fact question links to its published fact; a draft fact gives no link', async () => {
  const links = await learnLinksFor([ids.factLinked, ids.draftFactOnly]);
  const f = links.get(ids.factLinked);
  assert.equal(f.kind, 'fact');
  assert.equal(f.code, 'GK-HIS-901');
  assert.deepEqual(f.crumbs, [{ en: 'Indian History', bn: 'ভারতের ইতিহাস' }, { en: 'Revolt of 1857', bn: '১৮৫৭-র বিদ্রোহ' }, { en: 'Barrackpore, 1857', bn: 'ব্যারাকপুর, ১৮৫৭' }]);
  assert.equal(links.get(ids.draftFactOnly), null);
});

test('a GS subtopic links to its chapter only when exactly one published chapter covers it', async () => {
  const links = await learnLinksFor([ids.subtopicOnly, ids.ambiguous, ids.noSource]);
  const l = links.get(ids.subtopicOnly);
  assert.equal(l.kind, 'book');
  assert.equal(l.chapter, 'HIS-19');
  assert.equal(l.section, null);
  assert.equal(l.crumbs.length, 2);
  assert.equal(links.get(ids.ambiguous), null, 'polity "parliament" is covered by two chapters');
  assert.equal(links.get(ids.noSource), null);
});

test('Math links to its lesson (with the pattern as topic); Reasoning to its concept sheet; nothing without one', async () => {
  clearLearnLinksCache();
  const links = await learnLinksFor([ids.lesson, ids.sheet, ids.noSheet]);
  const lesson = links.get(ids.lesson);
  assert.deepEqual({ kind: lesson.kind, subject: lesson.subject, topic: lesson.topic }, { kind: 'lesson', subject: 'quant', topic: 'percentage' });
  assert.equal(lesson.crumbs.length, 3);
  assert.equal(lesson.crumbs[1].en, 'Percentage');
  assert.equal(lesson.crumbs[2].en, 'Find x% of a number');
  const sheet = links.get(ids.sheet);
  assert.deepEqual({ kind: sheet.kind, category: sheet.category, topic: sheet.topic }, { kind: 'sheet', category: 'WBPSC', topic: 'analogy' });
  assert.equal(links.get(ids.noSheet), null);
});

test('an unpublished chapter is never linked', async () => {
  books.setOverrides(new Map([['history:HIS-19', 'DRAFT']]));
  try {
    const links = await learnLinksFor([ids.bookTagged, ids.taughtPyq, ids.subtopicOnly]);
    assert.equal(links.get(ids.bookTagged), null);
    assert.equal(links.get(ids.taughtPyq), null);
    assert.equal(links.get(ids.subtopicOnly), null);
  } finally {
    books.setOverrides(new Map());
  }
});

test('API: a wrong answer (practice and PYQ) shows the link, and so does the mistake notebook', async () => {
  const wrongOf = async (id) => (await Question.findById(id).lean()).options[1].oid;

  const pyq = await api('POST', '/practice/verify-answer', { questionId: ids.taughtPyq, selectedOptionId: await wrongOf(ids.taughtPyq), category: 'WBPSC' });
  assert.equal(pyq.status, 200, JSON.stringify(pyq.body));
  assert.equal(pyq.body.data.isCorrect, false);
  assert.equal(pyq.body.data.learn.section, 'repression');

  const fact = await api('POST', '/practice/verify-answer', { questionId: ids.factLinked, selectedOptionId: await wrongOf(ids.factLinked), category: 'WBPSC' });
  assert.equal(fact.body.data.learn.code, 'GK-HIS-901');

  const none = await api('POST', '/practice/verify-answer', { questionId: ids.noSource, selectedOptionId: await wrongOf(ids.noSource), category: 'WBPSC' });
  assert.equal(none.body.data.learn, null);

  await new Promise((r) => setTimeout(r, 150)); // mistakes are recorded without blocking the answer
  const book = await api('GET', '/review/mistakes?status=all');
  assert.equal(book.status, 200, JSON.stringify(book.body));
  const byQ = new Map(book.body.data.items.map((i) => [i.question.questionId ?? i.question.id, i.learn]));
  assert.equal(byQ.get(ids.taughtPyq)?.chapter, 'HIS-19');
  assert.equal(byQ.get(ids.factLinked)?.kind, 'fact');
  assert.equal(byQ.get(ids.noSource), null);
});
