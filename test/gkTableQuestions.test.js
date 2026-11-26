'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { tableQuestions } = require('../src/services/gkTableQuestions');
const { loadRecords } = require('../scripts/seedGkFacts');

const L = (en, bn) => ({ en, bn });
const pack = (columns, rows, caption = L('Books and authors', 'বই ও লেখক')) => ({ code: 'GK-SGK-999', difficulty: 2, title: caption, pack: { table: { caption, columns, rows } } });
const books = pack([L('Book', 'বই'), L('Author', 'লেখক')], [
  [L('Gitanjali', 'গীতাঞ্জলি'), L('Rabindranath Tagore', 'রবীন্দ্রনাথ ঠাকুর')],
  [L('Anandamath', 'আনন্দমঠ'), L('Bankim Chandra', 'বঙ্কিমচন্দ্র')],
  [L('Pather Panchali', 'পথের পাঁচালী'), L('Bibhutibhushan', 'বিভূতিভূষণ')],
  [L('Devdas', 'দেবদাস'), L('Sarat Chandra', 'শরৎচন্দ্র')],
  [L('Chokher Bali', 'চোখের বালি'), L('Rabindranath Tagore', 'রবীন্দ্রনাথ ঠাকুর')],
]);

test('each row is asked forward; a value shared by two rows is never asked in reverse', () => {
  const qs = tableQuestions(books);
  const forward = qs.filter((q) => q.q[0].includes('which author goes with'));
  const reverse = qs.filter((q) => q.q[0].includes('which book has author'));
  assert.equal(forward.length, 5);
  assert.equal(reverse.length, 3, 'Tagore wrote two of the books, so he is not asked in reverse');
  for (const q of qs) {
    assert.equal(q.w.length, 3);
    assert.ok(!q.w.some((w) => w[0] === q.a[0] || w[1] === q.a[1]), 'no wrong option equals the answer');
    assert.equal(new Set(q.w.map((w) => w[0])).size, 3, 'wrong options are distinct');
    assert.match(q.q[1], /[ঀ-৿]/);
  }
  assert.deepEqual(qs.map((q) => q.code_suffix), qs.map((_, i) => `T${i + 1}`));
  assert.deepEqual(tableQuestions(books), qs, 'deterministic: an unchanged table gives the same questions');
});

test('serial-number first column: the next column is the key; small or odd tables give nothing', () => {
  const pres = pack([L('No.', 'ক্রম'), L('President', 'রাষ্ট্রপতি'), L('From', 'শুরু')], ['A', 'B', 'C', 'D', 'E'].map((n, i) => [L(String(i + 1), String(i + 1)), L(`P${n}`, `প${n}`), L(`19${i}0`, `১৯${i}০`)]));
  const qs = tableQuestions(pres);
  assert.ok(qs.some((q) => q.q[0] === 'Books and authors: which no. goes with "PA"?'));
  assert.ok(!qs.some((q) => q.q[0].includes('goes with "1"')));
  assert.deepEqual(tableQuestions(pack(books.pack.table.columns, books.pack.table.rows.slice(0, 3))), [], 'fewer than 4 rows');
  assert.deepEqual(tableQuestions(pack([L('A', 'ক'), L('A', 'ক')], books.pack.table.rows)), [], 'repeated headers');
  const withNone = pack(books.pack.table.columns, [...books.pack.table.rows, [L('Ghare Baire', 'ঘরে বাইরে'), L('None recorded', 'নেই')]]);
  assert.ok(!tableQuestions(withNone).some((q) => q.a[0] === 'None recorded' || q.w.some((w) => w[0] === 'None recorded')));
});

test('rows written in the statement are asked too: long descriptions become the clue, names the options', () => {
  const straits = {
    code: 'GK-GEO-999', difficulty: 2, title: L('World straits', 'বিশ্বের প্রণালী'),
    statement: L(
      'Strait of Malacca — between the Malay Peninsula and Sumatra, linking the Indian and Pacific Oceans.\nStrait of Hormuz — between Iran and Oman.\nStrait of Gibraltar — between Spain and Morocco.\nBering Strait — between Russia and Alaska.\nBab-el-Mandeb — between Yemen and Djibouti.\nDeserts: the Sahara is the largest hot desert.',
      'মালাক্কা প্রণালী — মালয় উপদ্বীপ ও সুমাত্রার মাঝে, ভারত ও প্রশান্ত মহাসাগরকে যুক্ত করে।\nহরমুজ প্রণালী — ইরান ও ওমানের মাঝে।\nজিব্রাল্টার প্রণালী — স্পেন ও মরক্কোর মাঝে।\nবেরিং প্রণালী — রাশিয়া ও আলাস্কার মাঝে।\nবাব-এল-মান্দেব — ইয়েমেন ও জিবুতির মাঝে।\nমরুভূমি: সাহারা বৃহত্তম উষ্ণ মরুভূমি।',
    ),
  };
  const qs = tableQuestions(straits);
  assert.ok(qs.every((q) => q.code_suffix.startsWith('S')));
  const reverse = qs.filter((q) => q.q[0].includes('which one is this'));
  assert.equal(reverse.length, 5, 'every strait is asked');
  const hormuz = reverse.find((q) => q.q[0].includes('between Iran and Oman'));
  assert.deepEqual(hormuz.a, ['Strait of Hormuz', 'হরমুজ প্রণালী']);
  assert.match(hormuz.q[1], /ইরান ও ওমানের মাঝে/);
  // Languages that do not line up give nothing rather than mismatched pairs.
  assert.deepEqual(tableQuestions({ ...straits, statement: L(straits.statement.en, straits.statement.bn.split('\n').slice(1).join('\n')) }), []);
});

test('library tables: every generated question has 4 distinct options in both languages', () => {
  let n = 0;
  for (const r of loadRecords().records) {
    for (const q of tableQuestions(r)) {
      n += 1;
      const opts = [q.a, ...q.w];
      assert.equal(new Set(opts.map((o) => o[0])).size, 4, `${r.code} ${q.code_suffix}`);
      assert.equal(new Set(opts.map((o) => o[1])).size, 4, `${r.code} ${q.code_suffix}`);
    }
  }
  assert.ok(n > 100);
});

test('question stems keep their line breaks (lists in MATCH questions are not run together)', () => {
  const { questionDoc } = require('../scripts/seedGkFacts');
  const fact = { code: 'GK-GEO-999', topic: 'geography', subtopic: 'world_geography', tags: [], status: 'PUBLISHED', dates: {}, verification: { status: 'VERIFIED', verified_at: null, notes: '' }, sources: [{ title: 'NCERT', url: 'https://ncert.nic.in/x.pdf', quote: 'q', publisher_type: 'INSTITUTIONAL' }] };
  const q = { format: 'MATCH', d: 2, q: ['Match:\nA. Malacca\nB. Bering\n\n| x | y |\n|---|---|\n| 1 | 2 |', 'মেলাও:\nA. মালাক্কা\nB. বেরিং'], a: ['A-1', 'A-১'], w: [['A-2', 'A-২'], ['A-3', 'A-৩'], ['A-4', 'A-৪']], e: ['e', 'ব্যাখ্যা'] };
  const doc = questionDoc(fact, q, 0, null);
  assert.equal(doc.stem.en, 'Match:  \nA. Malacca  \nB. Bering\n\n| x | y |\n|---|---|\n| 1 | 2 |', 'hard breaks, table rows untouched');
  assert.equal(doc.stem.bn, 'মেলাও:  \nA. মালাক্কা  \nB. বেরিং');
});

test('awkward tables are normalised: side-by-side repeats stacked, repeated keys joined, duplicate rows dropped', () => {
  const { normalizeTable } = require('../src/services/gkTableQuestions');
  const side = normalizeTable({ caption: L('c', 'গ'), columns: [L('Element', 'মৌল'), L('Symbol', 'সংকেত'), L('Element', 'মৌল'), L('Symbol', 'সংকেত')], rows: [[L('Iron', 'লোহা'), L('Fe', 'Fe'), L('Gold', 'সোনা'), L('Au', 'Au')]] });
  assert.deepEqual(side.rows.map((r) => r[0].en), ['Iron', 'Gold']);
  assert.equal(side.columns.length, 2);
  const summits = normalizeTable({ caption: L('c', 'গ'), columns: [L('Summit', 'সম্মেলন'), L('Year', 'বছর'), L('Host', 'আয়োজক')], rows: [
    [L('G7', 'G7'), L('2025', '২০২৫'), L('Canada', 'কানাডা')], [L('G7', 'G7'), L('2026', '২০২৬'), L('France', 'ফ্রান্স')], [L('G7', 'G7'), L('2026', '২০২৬'), L('France', 'ফ্রান্স')],
  ] });
  assert.deepEqual(summits.rows.map((r) => r[0].en), ['G7 · 2025', 'G7 · 2026'], 'joined key; the duplicate row is gone');
  assert.equal(summits.columns[0].en, 'Summit · Year');
});
