'use strict';

/**
 * New chapters (mixture & alligation, seating arrangement, fact banks) and the
 * runner's per-chapter mode. Answers are re-derived independently from each
 * question's own text, not trusted from the generator.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const common = require('../scripts/generators/common');
const mixture = require('../scripts/generators/supplement/quant');
const seating = require('../scripts/generators/supplement/reasoning');
const { validateBank, minCount } = require('../scripts/generators/factbank/validate');
const { Question } = require('../src/models');
const catalog = require('../db/seed/catalog');

const answerOf = (q) => q.options.find((o) => o.oid === q.correct_option_id).text.en;
const sample = (gen, n) => {
  const out = [];
  for (let i = 0; out.length < n && i < n * 20; i++) {
    const q = gen();
    if (q) out.push(q);
  }
  return out;
};
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const ratio = (a, b) => `${a / gcd(a, b)} : ${b / gcd(a, b)}`;
const money = (s) => Number(s.replace(/[₹,]/g, ''));

test('mixture & alligation: every answer re-derived from the question text', () => {
  common.seed(101);
  const [priceRatio, meanPrice, addWater, replacement, concentration] = mixture.topics[0].gens;

  for (const q of sample(priceRatio, 60)) {
    const [p1, p2, m] = q.stem.en.match(/₹(\d+)\/kg/g).map((x) => Number(x.slice(1, -3)));
    assert.equal(answerOf(q), ratio(p2 - m, m - p1), q.stem.en);
  }
  for (const q of sample(meanPrice, 60)) {
    const [x, p1, y, p2] = q.stem.en.match(/(\d+) kg of .* ₹(\d+)\/kg .* (\d+) kg costing ₹(\d+)\/kg/).slice(1).map(Number);
    assert.equal(money(answerOf(q)), Math.round(((x * p1 + y * p2) / (x + y)) * 100) / 100, q.stem.en);
  }
  for (const q of sample(addWater, 60)) {
    const [total, a, b, c, d] = q.stem.en.match(/A (\d+)-litre .* ratio (\d+) : (\d+)\. .* ratio (\d+) : (\d+)\?/).slice(1).map(Number);
    const milk = (total * a) / (a + b);
    const water = total - milk;
    assert.equal(parseFloat(answerOf(q)), (milk * d) / c - water, q.stem.en);
  }
  for (const q of sample(replacement, 60)) {
    const [V, x, n] = q.stem.en.match(/holds (\d+) litres .* (\d+) litres are taken .* done (\d+) times/).slice(1).map(Number);
    assert.equal(parseFloat(answerOf(q)), Math.round(V * (1 - x / V) ** n * 100) / 100, q.stem.en);
  }
  for (const q of sample(concentration, 60)) {
    const [p, qq, r] = q.stem.en.match(/(\d+)%/g).map((s) => Number(s.slice(0, -1)));
    assert.equal(answerOf(q), ratio(qq - r, r - p), q.stem.en);
  }
});

test('seating arrangement: brute force confirms exactly one line-up fits the clues, and the key matches it', () => {
  common.seed(202);
  const { permutations } = seating._internal;
  const qs = seating.topics[0].gens.flatMap((g) => sample(g, 40));
  assert.ok(qs.length >= 100);
  for (const q of qs) {
    const names = q.stem.en.match(/— (.*) — sit/)[1].replace(' and ', ', ').split(', ');
    const lines = q.stem.en.split('\n').filter((l) => /^\d+\. /.test(l)).map((l) => l.replace(/^\d+\. /, ''));
    const question = q.stem.en.trim().split('\n').pop();
    const at = (l, n) => l.indexOf(n);
    const ends = (l, n) => at(l, n) === 0 || at(l, n) === l.length - 1;
    const rules = lines.map((c) => {
      let m;
      if ((m = c.match(/^(\w+) sits at the extreme left end\.$/))) return (l) => at(l, m[1]) === 0;
      if ((m = c.match(/^(\w+) sits at the extreme right end\.$/))) return (l) => at(l, m[1]) === l.length - 1;
      if ((m = c.match(/^(\w+) sits at one of the ends\.$/))) return (l) => ends(l, m[1]);
      if ((m = c.match(/^(\w+) does not sit at either end\.$/))) return (l) => !ends(l, m[1]);
      if ((m = c.match(/^(\w+) sits between (\w+) and (\w+)\.$/))) return (l) => Math.abs(at(l, m[1]) - at(l, m[2])) === 1 && Math.abs(at(l, m[1]) - at(l, m[3])) === 1;
      if ((m = c.match(/^(\w+) sits immediately to the right of (\w+)\.$/))) return (l) => at(l, m[1]) - at(l, m[2]) === 1;
      if ((m = c.match(/^(\w+) sits immediately to the left of (\w+)\.$/))) return (l) => at(l, m[1]) - at(l, m[2]) === -1;
      if ((m = c.match(/^(\w+) sits (second|third) to the right of (\w+)\.$/))) return (l) => at(l, m[1]) - at(l, m[3]) === (m[2] === 'second' ? 2 : 3);
      if ((m = c.match(/^Exactly (\d+) (?:person sits|people sit) between (\w+) and (\w+)\.$/))) return (l) => Math.abs(at(l, m[2]) - at(l, m[3])) - 1 === Number(m[1]);
      throw new Error(`unparsed clue: ${c}`);
    });
    const fits = permutations(names).filter((l) => rules.every((r) => r(l)));
    assert.equal(fits.length, 1, `${q.stem.en}\n=> ${fits.length} line-ups`);
    const l = fits[0];
    let m;
    let expected;
    if (/extreme left/.test(question)) expected = l[0];
    else if (/extreme right/.test(question)) expected = l[l.length - 1];
    else if (/second from the right/.test(question)) expected = l[l.length - 2];
    else if (/second from the left/.test(question)) expected = l[1];
    else if (/middle/.test(question)) expected = l[(l.length - 1) / 2];
    else if ((m = question.match(/right of (\w+)\?/))) expected = l[at(l, m[1]) + 1];
    assert.equal(answerOf(q), expected, `${q.stem.en}\n=> ${l.join(', ')}`);
  }
});

test('every fact bank is valid and big enough (100 questions; 30 for a month of current affairs)', () => {
  const dir = path.join(__dirname, '../scripts/generators/factbank');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js') && f !== 'validate.js');
  assert.ok(files.length > 0);
  for (const f of files) {
    const bank = require(path.join(dir, f));
    const { errors, count } = validateBank(bank, f);
    assert.deepEqual(errors, [], f);
    assert.ok(count >= minCount(bank), `${f}: ${count} questions`);
  }
});

let mongod;
let uri;
const run = (args) =>
  new Promise((resolve, reject) => {
    const c = spawn(process.execPath, [path.join(__dirname, '../scripts/generateAndSeed.js'), ...args], { env: { ...process.env, MONGODB_URI: uri } });
    let out = '';
    c.stdout.on('data', (d) => (out += d));
    c.stderr.on('data', (d) => (out += d));
    c.on('exit', (code) => (code === 0 ? resolve(out) : reject(new Error(out))));
  });

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  uri = mongod.getUri('supplement_test');
  await mongoose.connect(uri);
  await Question.init();
});
test.after(async () => {
  await mongoose.disconnect();
  await mongod?.stop();
});

test('--per-topic tops every chapter up, targets every syllabus category, and re-targets old questions', async () => {
  // An "old" generated question tagged to one random category, as earlier runs did.
  common.seed(5);
  const old = sample(mixture.topics[0].gens[1], 1)[0];
  await Question.create({ ...old, code: 'QA-OLD-1', subject: 'quant', exam_targets: [{ category: 'BANK', tier: 'PRELIMS' }], status: 'PUBLISHED', authored_by: 'seed_generator' });

  const out = await run(['--per-topic', '30', '--subjects', 'quant,reasoning']);
  assert.match(out, /Targets: 1 existing questions/);

  const quantTopics = catalog[0].subjects.find((s) => s.code === 'quant').topics.map((t) => t.code);
  for (const topic of quantTopics) {
    for (const category of ['SSC', 'BANK', 'WBPSC', 'WB_POST']) {
      const n = await Question.countDocuments({ subject: 'quant', topic, 'exam_targets.category': category, status: 'PUBLISHED' });
      assert.ok(n >= 30, `quant.${topic} in ${category}: ${n}`);
    }
  }
  assert.ok((await Question.countDocuments({ topic: 'seating_arrangement' })) >= 30);
  const re = await Question.findOne({ code: 'QA-OLD-1' }).lean();
  assert.deepEqual(re.exam_targets.map((t) => t.category).sort(), ['BANK', 'SSC', 'WBPSC', 'WB_POST']);

  // Second run: already topped up, inserts nothing, deletes nothing.
  const before = await Question.countDocuments();
  const again = await run(['--per-topic', '30', '--subjects', 'quant,reasoning']);
  assert.match(again, /every chapter already has at least 30/);
  assert.equal(await Question.countDocuments(), before);
});
