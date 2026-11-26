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
