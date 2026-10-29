'use strict';

/**
 * Vocabulary Bank, batch 1: content integrity, reproducible lexical checks,
 * importer rules, seeding, and the Bengali review workflow.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const config = require('../src/config');
const { createApp } = require('../src/app');
const { VocabularyWord } = require('../src/models');
const { parseEntry, validateBatch } = require('../src/services/vocabularyImport');
const bank = require('../scripts/vocabulary/bank');
const { ensureVocabularyBank, AUTHOR } = require('../scripts/seedVocabularyBank');

const ADMIN_EMAIL = 'vocab-reviewer@example.test';
if (!config.auth.adminEmails.includes(ADMIN_EMAIL)) config.auth.adminEmails.push(ADMIN_EMAIL);
const BENGALI = /[ঀ-৿]/u;

// ------------------------------------------------------------------ content

test('batch 1: at least 250 unique, valid entries in known categories', () => {
  const { parsed, errors } = bank.parseBank();
  assert.deepEqual(errors, []);
  assert.ok(parsed.length >= 250, `${parsed.length} entries`);
  assert.equal(new Set(parsed.map((p) => p.entry.normalized_word)).size, parsed.length, 'no duplicate words');
  for (const { entry, row } of parsed) {
    assert.ok(BENGALI.test(entry.meaning_bn) && BENGALI.test(entry.example_bn) && BENGALI.test(entry.explanation_bn || ''), `${row} Bengali text`);
    assert.ok(entry.categories.every((c) => c in bank.CATEGORIES), row);
    assert.ok(entry.sources.length > 0, `${row} has source metadata`);
    const lower = entry.normalized_word;
    assert.ok(![...entry.synonyms, ...entry.near_synonyms, ...entry.antonyms].map((w) => w.toLowerCase()).includes(lower), `${row} self-reference`);
  }
});

test('lexicon-checks.json matches the current entries (reproducible checks)', async () => {
  const { computeChecks, serialize } = await import('../scripts/vocabulary/checkLexicon.mjs');
  const fresh = serialize(await computeChecks());
  assert.equal(fs.readFileSync(bank.CHECKS_FILE, 'utf8'), fresh, 'run npm run vocab:check');
});

test('every entry passes the publish rule; exam claims only with official paper and key', () => {
  const { parsed } = bank.parseBank();
  const checks = bank.loadChecks();
  const official = bank.officialPairs();
  for (const { entry, row } of parsed) {
    const verdict = bank.assess(entry, checks.entries[entry.normalized_word], official);
    assert.deepEqual(verdict.failures, [], `${row} ${entry.word}`);
    for (const r of entry.exam_relevance.filter((x) => x.basis === 'PYQ_VERIFIED')) {
      const urls = r.references.map((ref) => ref.url);
      assert.ok(urls.every((u) => u.startsWith('https://psc.wb.gov.in/')), row);
      assert.ok(r.references.some((ref) => /answer key/i.test(ref.title)), `${row} cites the answer key`);
    }
  }
  // Every single-word synonym/antonym question in the imported official papers is in the
  // bank, labelled PYQ_VERIFIED, and its official answer is one of the listed relations.
  for (const [word, pairs] of official) {
    const hit = parsed.find((p) => p.entry.normalized_word === word);
    assert.ok(hit, `${word} from an official paper is in the bank`);
    assert.ok(hit.entry.exam_relevance.some((r) => r.basis === 'PYQ_VERIFIED'), word);
    for (const p of pairs) {
      const list = p.type === 'synonym' ? hit.entry.synonyms : hit.entry.antonyms;
      assert.ok(list.map((w) => w.toLowerCase()).includes(p.answer), `${word}: official ${p.type} ${p.answer}`);
    }
  }
  // Nothing else claims an exam.
  const claimed = parsed.filter((p) => p.entry.exam_relevance.some((r) => r.basis === 'PYQ_VERIFIED'));
  assert.ok(claimed.length >= 8 && claimed.length <= 30);
});

test('pronunciations come only from CMUdict and are IPA', async () => {
  const { arpabetToIpa } = await import('../scripts/vocabulary/lexicon.mjs');
  assert.equal(arpabetToIpa('AH0 B AH1 N D AH0 N T'), 'əˈbʌndənt');
  assert.equal(arpabetToIpa('L OW0 K W EY1 SH AH0 S'), 'loʊˈkweɪʃəs');
  assert.equal(arpabetToIpa('S T R AO1 NG'), 'ˈstrɔŋ');
  const checks = bank.loadChecks();
  assert.equal(checks.entries.meagre.pronunciation, null, 'British spelling missing from CMUdict: none, not guessed');
  assert.match(checks.entries.abundant.pronunciation.ipa, /^\/.+\/$/);
});

// ------------------------------------------------------------------ importer rules

const base = {
  word: 'Candid', meaningBn: 'অকপট', definitionEn: 'Honest and direct in speech.', explanationBn: 'সোজাসুজি সত্যি কথা বলে।',
  partOfSpeech: 'ADJECTIVE', synonyms: ['frank'], antonyms: ['evasive'],
  exampleEn: 'She gave a candid answer.', exampleBn: 'সে অকপট উত্তর দিল।', difficulty: 'BEGINNER', categories: ['common_exam'],
};
const codes = (raw) => parseEntry(raw, 1).errors.map((e) => e.code);

test('importer: integrity rules', () => {
  assert.deepEqual(codes(base), []);
  assert.ok(codes({ ...base, synonyms: ['candid'] }).includes('SELF_REFERENCE'));
  assert.ok(codes({ ...base, antonyms: ['Candid'] }).includes('SELF_REFERENCE'));
  assert.ok(codes({ ...base, nearSynonyms: ['frank'] }).includes('RELATION_CONFLICT'));
  assert.ok(codes({ ...base, antonyms: ['frank'] }).includes('SYNONYM_ANTONYM_CONFLICT'));
  assert.ok(codes({ ...base, meaningBn: 'frank' }).includes('BENGALI_TEXT_REQUIRED'));
  assert.ok(codes({ ...base, exampleBn: 'An English line' }).includes('BENGALI_TEXT_REQUIRED'));
  assert.ok(codes({ ...base, definitionEn: 'অকপট মানুষের গুণ' }).includes('ENGLISH_TEXT_REQUIRED'));
  assert.ok(codes({ ...base, exampleEn: 'She answered every question.' }).includes('EXAMPLE_MISSING_WORD'));
  assert.ok(codes({ ...base, exampleEn: '' }).length > 0, 'empty example');
  assert.ok(codes({ ...base, difficulty: 'EASY' }).length > 0, 'invalid difficulty');
  // Antonyms are optional; a word still needs some relation, an idiom does not.
  assert.deepEqual(codes({ ...base, antonyms: [] }), []);
  assert.ok(codes({ ...base, synonyms: [], antonyms: [] }).includes('NO_RELATIONS'));
  assert.deepEqual(codes({ ...base, word: 'In a nutshell', partOfSpeech: 'PHRASE', synonyms: [], antonyms: [], exampleEn: 'In a nutshell, we won.' }), []);
  // Inflected forms in examples must be declared.
  assert.ok(codes({ ...base, word: 'Give up', partOfSpeech: 'PHRASE', exampleEn: 'He gave up smoking.' }).includes('EXAMPLE_MISSING_WORD'));
  assert.deepEqual(codes({ ...base, word: 'Give up', partOfSpeech: 'PHRASE', forms: ['gave up'], exampleEn: 'He gave up smoking.' }), []);
});

test('importer: duplicates, broken references and unknown categories across the batch', () => {
  const one = parseEntry({ ...base, confusables: [{ word: 'Nowhere', noteEn: 'Not a real pair.', noteBn: 'ভুল জোড়া' }] }, 1).entry;
  const two = parseEntry({ ...base, categories: ['made_up'] }, 2).entry;
  const errs = validateBatch([{ entry: one, row: 1 }, { entry: two, row: 2 }], { categories: Object.keys(bank.CATEGORIES) });
  const got = errs.map((e) => e.code).sort();
  assert.deepEqual(got, ['BROKEN_REFERENCE', 'DUPLICATE_WORD', 'UNKNOWN_CATEGORY']);
});

// ------------------------------------------------------------------ seeding and review

let mongod;
let server;
let api;

test('seed, Bengali review workflow and what students see', async (t) => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('vocabulary_bank_test'));
  await VocabularyWord.init();
  t.after(async () => {
    server?.close();
    await mongoose.disconnect();
    await mongod?.stop();
  });

  const quiet = { log: () => {} };
  const first = await ensureVocabularyBank(quiet);
  assert.equal(first.inserted, first.total);
  assert.equal(first.published, first.total);
  const again = await ensureVocabularyBank(quiet);
  assert.deepEqual([again.inserted, again.updated, again.unchanged], [0, 0, again.total], 'idempotent');

  const abundant = await VocabularyWord.findOne({ normalized_word: 'abundant' }).lean();
  assert.deepEqual([abundant.status, abundant.bengali_review.status, abundant.pronunciation_source, abundant.authored_by], ['PUBLISHED', 'PENDING', 'CMUDICT', AUTHOR]);
  assert.ok(abundant.lexical_checks.confirmed_synonyms.length > 0);
  const meagre = await VocabularyWord.findOne({ normalized_word: 'meagre' }).lean();
  assert.equal(meagre.pronunciation, undefined, 'no CMU entry, no invented pronunciation');

  server = createApp().listen(0);
  const root = `http://127.0.0.1:${server.address().port}/api/v1`;
  let cookie;
  api = async (method, path, body, { asAdmin = true, user } = {}) => {
    const res = await fetch(root + path, {
      method,
      headers: { 'content-type': 'application/json', ...(asAdmin && cookie && { cookie }), ...(user && { 'x-user-id': user }) },
      body: body ? JSON.stringify(body) : undefined,
    });
    return { status: res.status, body: await res.json() };
  };
  await api('POST', '/auth/register', { name: 'Reviewer', email: ADMIN_EMAIL, password: 'safe-password-123' });
  const login = await fetch(`${root}/auth/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: ADMIN_EMAIL, password: 'safe-password-123' }) });
  cookie = login.headers.get('set-cookie').split(';')[0];

  // Queue: official exam words first, then commonly tested.
  const queue = (await api('GET', '/admin/vocabulary/bengali-review?limit=20')).body.data;
  assert.equal(queue.counts.pending, first.total);
  assert.equal(queue.counts.reviewed, 0);
  assert.ok(queue.words.slice(0, 10).every((w) => w.examRelevance.some((r) => r.basis === 'PYQ_VERIFIED')), 'exam words first');
  const priorities = queue.words.map((w) => w.reviewPriority);
  assert.deepEqual(priorities, [...priorities].sort((a, b) => b - a));

  // Students cannot use the review endpoints: anonymous is 401, a signed-in student 403.
  assert.equal((await api('GET', '/admin/vocabulary/bengali-review', null, { asAdmin: false })).status, 401);
  assert.equal((await api('GET', '/admin/vocabulary/bengali-review', null, { asAdmin: false, user: 'student_1' })).status, 403);
  assert.equal((await api('PUT', `/admin/vocabulary/words/${String(abundant._id)}/bengali-review`, { status: 'REVIEWED' }, { asAdmin: false, user: 'student_1' })).status, 403);

  // Correct a meaning and mark it reviewed in one step: who, when and what changed are kept.
  const id = String(abundant._id);
  const edited = await api('PATCH', `/admin/vocabulary/words/${id}/content`, { meaningBn: 'প্রচুর; প্রাচুর্যপূর্ণ', markReviewed: true });
  assert.equal(edited.status, 200, JSON.stringify(edited.body));
  const w = edited.body.data;
  assert.deepEqual([w.meaningBn, w.bengaliReview.status, w.bengaliReview.reviewedBy], ['প্রচুর; প্রাচুর্যপূর্ণ', 'REVIEWED', ADMIN_EMAIL]);
  assert.ok(w.bengaliReview.reviewedAt);
  assert.deepEqual(w.editHistory[0].changes, [{ field: 'meaning_bn', from: 'প্রচুর; অঢেল', to: 'প্রচুর; প্রাচুর্যপূর্ণ' }]);

  // Bengali search follows the corrected meaning.
  const found = await api('GET', `/vocabulary/words?q=${encodeURIComponent('প্রাচুর্যপূর্ণ')}`, null, { asAdmin: false });
  assert.ok(found.body.data.words.some((x) => x.id === id));

  // Changing reviewed Bengali text without re-reviewing sends it back to pending.
  const changed = (await api('PATCH', `/admin/vocabulary/words/${id}/content`, { exampleBn: 'এই অঞ্চলে জুলাই মাসে প্রচুর বৃষ্টি হয়।' })).body.data;
  assert.deepEqual([changed.bengaliReview.status, changed.bengaliReview.reviewedBy], ['PENDING', null]);
  assert.equal(changed.editHistory.length, 2);
  // An English edit that breaks the example rule is refused.
  const bad = await api('PATCH', `/admin/vocabulary/words/${id}/content`, { exampleEn: 'It rains a lot in July.' });
  assert.equal(bad.status, 422);
  assert.equal(bad.body.error.code, 'VOCABULARY_EDIT_INVALID');
  // Review without edits.
  const reviewed = (await api('PUT', `/admin/vocabulary/words/${id}/bengali-review`, { status: 'REVIEWED' })).body.data;
  assert.equal(reviewed.bengaliReview.status, 'REVIEWED');

  // Re-seeding never overwrites an administrator's work.
  await ensureVocabularyBank(quiet);
  const kept = await VocabularyWord.findById(id).lean();
  assert.equal(kept.meaning_bn, 'প্রচুর; প্রাচুর্যপূর্ণ');
  assert.equal(kept.bengali_review.status, 'REVIEWED');

  // Students see the review status (never the reviewer) and the new relation fields.
  const pub = (await api('GET', '/vocabulary/words?q=abundant', null, { asAdmin: false })).body.data.words[0];
  assert.equal(pub.bengaliReview.status, 'REVIEWED');
  assert.equal(pub.bengaliReview.reviewedBy, undefined);
  assert.equal(pub.pronunciationSource, 'CMUDICT');
  assert.doesNotMatch(JSON.stringify(pub), new RegExp(ADMIN_EMAIL));
  const eminent = (await api('GET', '/vocabulary/words?q=eminent', null, { asAdmin: false })).body.data.words[0];
  assert.equal(eminent.bengaliReview.status, 'PENDING');
  assert.equal(eminent.confusables[0].word, 'Imminent');
});
