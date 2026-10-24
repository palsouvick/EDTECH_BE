'use strict';

/**
 * Generates and seeds bilingual (EN + BN) practice questions.
 *
 *   node --env-file-if-exists=.env scripts/generateAndSeed.js [flags]
 *
 *   --count <n>        questions per subject            (default 1000, env SEED_COUNT)
 *   --per-topic <n>    instead: top every chapter up to n generated questions (with --append: add n each)
 *   --subjects <list>  quant,english,reasoning,gs       (default: all)
 *   --batch <n>        insertMany batch size            (default 500)
 *   --seed <n>         PRNG seed for reproducible output (default 20240601)
 *   --pyq-ratio <0-1>  share of questions tagged with a pattern-based PYQ ref (default 0)
 *   --no-pyq           do not attach PYQ references
 *   --untag-synthetic-pyq  remove pattern-based PYQ refs (question_code contains "-SYN-")
 *                      from questions already in the database; the questions themselves stay
 *   --uri <mongo uri>  override MONGODB_URI
 *   --reset            delete previously generated docs (authored_by = seed_generator) first
 *   --append           add --count NEW questions even if generated ones already exist
 *                      (default: top up so each subject holds --count generated questions)
 *   --dry-run          generate + validate only; no database connection
 *
 * Schema mapping (the Question model differs from the brief's field names):
 *   category                -> exam_targets[{category, tier}]
 *   previous_year_reference -> pyq.refs[]  (question_code contains "SYN": pattern-based, not a verbatim PYQ)
 *   content.en / content.bn -> stem.{en,bn} and options[].text.{en,bn}
 *   generator topic codes   -> catalogue codes via src/services/taxonomy.js
 *                              (e.g. speed_distance -> time_speed_distance), so every
 *                              question is reachable from the topic funnel
 *
 * Why PYQ tagging is off by default: the app shows any pyq ref as a "PYQ Â· SSC CGL
 * 2019 Tier 1" badge and counts it on topic cards. Generated questions never
 * appeared in a real paper, so tagging them would mislead students. Pass
 * --pyq-ratio explicitly only for internal demos.
 */

const mongoose = require('mongoose');
const Question = require('../src/models/Question');
const { seed, rand, ri, pick } = require('./generators/common');
const { TOPIC_ALIASES, inCatalog, normalizeTopic } = require('../src/services/taxonomy');

const { factbankSpec } = require('./generators/supplement/factbanks');
const catalog = require('../db/seed/catalog');

// Each subject merges Copilot's generators with supplements (chapters they don't
// cover yet) and hand-authored fact banks. Topics with the same code are merged.
const SUBJECTS = {
  quant: { label: 'Math', prefix: 'QNT', mods: ['./generators/quant', './generators/supplement/quant', './generators/supplement/quant2', './generators/supplement/quant_more'] },
  english: { label: 'English', prefix: 'ENG', mods: ['./generators/english'], factbanks: true },
  reasoning: { label: 'Reasoning', prefix: 'RSN', mods: ['./generators/reasoning', './generators/supplement/reasoning'] },
  gs: { label: 'General Studies', prefix: 'GS', mods: ['./generators/supplement/gs'], factbanks: true },
};

function loadSpec(subject) {
  const meta = SUBJECTS[subject];
  const parts = meta.mods.map((m) => require(m));
  if (meta.factbanks) parts.push(factbankSpec(subject));
  return { subject, topics: parts.flatMap((p) => p.topics) };
}

/**
 * Every category whose syllabus (db/seed/catalog.js) lists this chapter, at its
 * main stage: a Percentage question is valid for SSC, Banking, WBPSC and WB Post
 * alike, while Banking Awareness belongs to Banking only.
 */
const MAIN_TIER = { SSC: 'TIER_1', BANK: 'PRELIMS', WBPSC: 'PRELIMS', WB_POST: 'SINGLE' };
function targetsFor(subject, topic) {
  return catalog
    .filter((c) => c.subjects.some((s) => s.code === subject && s.topics.some((t) => t.code === topic)))
    .map((c) => ({ category: c.code, tier: MAIN_TIER[c.code] }));
}

const CATEGORIES = [
  { key: 'SSC_CGL', category: 'SSC', tier: 'TIER_1', exam: 'SSC CGL' },
  { key: 'SSC_CHSL', category: 'SSC', tier: 'TIER_1', exam: 'SSC CHSL' },
  { key: 'BANK_PO', category: 'BANK', tier: 'PRELIMS', exam: 'Bank PO' },
  { key: 'BANK_CLERK', category: 'BANK', tier: 'PRELIMS', exam: 'Bank Clerk' },
  { key: 'WBPSC_WBCS', category: 'WBPSC', tier: 'PRELIMS', exam: 'WBCS' },
  { key: 'WB_POST_OFFICE', category: 'WB_POST', tier: 'SINGLE', exam: 'WB Post Office' },
];
const AUTHOR = 'seed_generator';
const MAX_MISSES = 600;

function parseArgs(argv) {
  const opts = {
    count: Number(process.env.SEED_COUNT) || 1000,
    subjects: Object.keys(SUBJECTS),
    batch: 500,
    seed: 20240601,
    pyqRatio: 0,
    untagSyntheticPyq: false,
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/edtech',
    reset: false,
    append: false,
    dryRun: false,
    perTopic: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const eq = a.startsWith('--') ? a.indexOf('=') : -1;
    const flag = eq > -1 ? a.slice(0, eq) : a;
    const val = () => (eq > -1 ? a.slice(eq + 1) : argv[++i]);
    switch (flag) {
      case '--count': opts.count = Number(val()); break;
      case '--per-topic': opts.perTopic = Number(val()); break;
      case '--subjects': opts.subjects = val().split(',').map((s) => s.trim().toLowerCase()); break;
      case '--batch': opts.batch = Number(val()); break;
      case '--seed': opts.seed = Number(val()); break;
      case '--pyq-ratio': opts.pyqRatio = Number(val()); break;
      case '--no-pyq': opts.pyqRatio = 0; break;
      case '--untag-synthetic-pyq': opts.untagSyntheticPyq = true; break;
      case '--uri': opts.uri = val(); break;
      case '--reset': opts.reset = true; break;
      case '--append': opts.append = true; break;
      case '--dry-run': opts.dryRun = true; break;
      case '--help': case '-h':
        console.log(require('fs').readFileSync(__filename, 'utf8').split('*/')[0]);
        process.exit(0);
        break;
      default: throw new Error(`Unknown flag: ${a}`);
    }
  }
  if (!Number.isInteger(opts.count) || opts.count < 1) throw new Error('--count must be a positive integer');
  if (opts.perTopic !== null && (!Number.isInteger(opts.perTopic) || opts.perTopic < 1)) throw new Error('--per-topic must be a positive integer');
  if (!Number.isInteger(opts.batch) || opts.batch < 1) throw new Error('--batch must be a positive integer');
  if (!(opts.pyqRatio >= 0 && opts.pyqRatio <= 1)) throw new Error('--pyq-ratio must be between 0 and 1');
  for (const s of opts.subjects) if (!SUBJECTS[s]) throw new Error(`Unknown subject "${s}". Use: ${Object.keys(SUBJECTS).join(', ')}`);
  return opts;
}

/** Split total across topics by weight (largest remainder). */
function allocate(topics, total) {
  const sum = topics.reduce((s, t) => s + t.weight, 0);
  const alloc = topics.map((t) => Math.floor((t.weight / sum) * total));
  let rest = total - alloc.reduce((a, b) => a + b, 0);
  for (let i = 0; rest > 0; i = (i + 1) % topics.length, rest--) alloc[i]++;
  return alloc;
}

/**
 * Generate `count` unique-by-stem question bodies for one subject, or, with
 * `perTopicNeed` (array aligned with spec.topics), exactly that many per topic
 * entry with no spill-over into other chapters.
 */
function generateBodies(spec, count, knownStems, perTopicNeed = null) {
  const state = spec.topics.map((t) => ({ t, cursor: 0, misses: 0, done: false }));
  const need = perTopicNeed ?? allocate(spec.topics, count);
  const bodies = [];
  const seen = new Set(knownStems);

  const fill = (idx, target) => {
    const st = state[idx];
    let got = 0;
    while (got < target && !st.done) {
      const gen = st.t.gens[st.cursor++ % st.t.gens.length];
      let body = null;
      try { body = gen(); } catch (e) { body = null; }
      if (body && !seen.has(body.stem.en)) {
        seen.add(body.stem.en);
        bodies.push(body);
        got++;
        st.misses = 0;
      } else if (++st.misses >= MAX_MISSES) {
        st.done = true;
      }
    }
    return got;
  };

  if (perTopicNeed) {
    // A chapter can draw on several sources (a generator, fact banks such as
    // polity.js + polity_2.js). What one source runs out of, the chapter's other
    // sources top up; nothing spills into other chapters.
    const chapterOf = spec.topics.map((t) => normalizeTopic(spec.subject, t.topic).topic);
    const missByChapter = {};
    need.forEach((n, i) => {
      const miss = n - fill(i, n);
      if (miss > 0) missByChapter[chapterOf[i]] = (missByChapter[chapterOf[i]] || 0) + miss;
    });
    for (const chapter of Object.keys(missByChapter)) {
      for (let i = 0; i < state.length && missByChapter[chapter] > 0; i++) {
        if (chapterOf[i] === chapter && !state[i].done) missByChapter[chapter] -= fill(i, missByChapter[chapter]);
      }
      if (missByChapter[chapter] <= 0) delete missByChapter[chapter];
    }
    const shortfall = Object.values(missByChapter).reduce((a, b) => a + b, 0);
    return { bodies, shortfall, shortByTopic: missByChapter };
  }

  let shortfall = 0;
  need.forEach((n, i) => {
    shortfall += n - fill(i, n);
  });
  // Redistribute what exhausted topics could not supply.
  while (shortfall > 0) {
    const live = state.map((s, i) => [s, i]).filter(([s]) => !s.done);
    if (!live.length) break;
    const before = shortfall;
    for (const [, i] of live) {
      if (shortfall <= 0) break;
      shortfall -= fill(i, Math.min(shortfall, Math.ceil(shortfall / live.length)));
    }
    if (shortfall === before) break;
  }
  return { bodies, shortfall };
}

function toDocument(body, subject, code, index, opts) {
  const tax = normalizeTopic(subject, body.topic, body.subtopic);
  const syllabus = targetsFor(subject, tax.topic);
  let primary;
  let targets;
  if (syllabus.length) {
    // Served to every category whose syllabus has this chapter.
    targets = syllabus;
    const pool = CATEGORIES.filter((c) => syllabus.some((t) => t.category === c.category));
    primary = pool[index % pool.length];
  } else {
    // Chapter not in the catalogue (warned about elsewhere): Copilot's original random targeting.
    primary = CATEGORIES[index % CATEGORIES.length];
    targets = [{ category: primary.category, tier: primary.tier }];
    if (rand() < 0.5) {
      const other = pick(CATEGORIES.filter((c) => c.category !== primary.category));
      targets.push({ category: other.category, tier: other.tier });
    }
  }
  const doc = {
    code,
    exam_targets: targets,
    subject,
    ...body,
    topic: tax.topic,
    subtopic: tax.subtopic,
    concept_tags: [...new Set([...(body.concept_tags || []), ...tax.extraTags, primary.key.toLowerCase()])],
    status: 'PUBLISHED',
    version: 1,
    authored_by: AUTHOR,
  };
  if (rand() < opts.pyqRatio) {
    const year = ri(2016, 2024);
    doc.pyq = {
      refs: [{
        exam_name: primary.exam,
        tier: primary.tier,
        year,
        shift: `Shift ${ri(1, 3)}`,
        question_code: `${primary.key}-${year}-SYN-${code}`.slice(0, 80),
      }],
    };
  }
  return doc;
}

async function insertBatch(batch) {
  try {
    const res = await Question.insertMany(batch, { ordered: false });
    return { inserted: res.length, skipped: 0 };
  } catch (err) {
    // Duplicate keys (re-runs) are expected with ordered:false; the rest of the batch is still written.
    const writeErrors = err.writeErrors || err.result?.result?.writeErrors || [];
    const inserted = err.insertedDocs?.length ?? err.result?.insertedCount ?? err.result?.result?.nInserted;
    if (inserted === undefined || (err.code !== 11000 && !writeErrors.length)) throw err;
    return { inserted, skipped: batch.length - inserted };
  }
}

/**
 * Re-point questions stored under pre-catalogue topic codes (from earlier
 * generator runs) at the catalogue codes. Idempotent; nothing is deleted.
 * A finer subtopic replaced by the alias (e.g. grammar/prepositions) is kept
 * in concept_tags.
 */
async function migrateLegacyTopics() {
  let moved = 0;
  for (const [subject, aliases] of Object.entries(TOPIC_ALIASES)) {
    for (const [legacy, alias] of Object.entries(aliases)) {
      const [topic, subtopic] = Array.isArray(alias) ? alias : [alias, undefined];
      const set = { topic };
      if (subtopic) set.subtopic = subtopic;
      const res = await Question.updateMany({ subject, topic: legacy }, [
        {
          $set: {
            ...set,
            concept_tags: subtopic
              ? {
                  $setUnion: [
                    { $ifNull: ['$concept_tags', []] },
                    { $cond: [{ $and: ['$subtopic', { $ne: ['$subtopic', subtopic] }] }, ['$subtopic'], []] },
                  ],
                }
              : { $ifNull: ['$concept_tags', []] },
          },
        },
      ], { updatePipeline: true }); // Mongoose 9 requires opting in to pipeline updates
      if (res.modifiedCount) console.log(`  topic ${subject}.${legacy} -> ${subject}.${topic}${subtopic ? `/${subtopic}` : ''}: ${res.modifiedCount}`);
      moved += res.modifiedCount;
    }
  }
  return moved;
}

/** Drop pattern-based ("-SYN-") PYQ refs; the questions stay, they just stop showing a PYQ badge. */
async function untagSyntheticPyq() {
  const res = await Question.updateMany(
    { 'pyq.refs.question_code': { $regex: '-SYN-' } },
    // pyq.is_pyq / latest_pyq_year are normally derived on save; updateMany must set them itself.
    { $set: { 'pyq.refs': [], 'pyq.is_pyq': false, latest_pyq_year: null } },
  );
  return res.modifiedCount;
}

/**
 * Earlier runs tagged each generated question with one or two random
 * categories, so a chapter could hold 180 questions but show ~45 in WBPSC.
 * Re-target generated questions at every category whose syllabus has their
 * chapter. Only widens visibility; nothing is deleted. Idempotent.
 */
async function retargetGenerated() {
  let changed = 0;
  const seen = new Set();
  for (const c of catalog) {
    for (const s of c.subjects) {
      for (const t of s.topics) {
        const key = `${s.code}.${t.code}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const targets = targetsFor(s.code, t.code);
        const res = await Question.updateMany(
          {
            authored_by: AUTHOR,
            subject: s.code,
            topic: t.code,
            // already exactly these categories? skip
            $nor: [{ exam_targets: { $size: targets.length, $all: targets.map((x) => ({ $elemMatch: x })) } }],
          },
          { $set: { exam_targets: targets } },
        );
        changed += res.modifiedCount;
      }
    }
  }
  return changed;
}

async function nextCodeNumber(prefix, dryRun) {
  if (dryRun) return 1;
  const re = new RegExp(`^QA-${prefix}-(\\d+)$`);
  const last = await Question.find({ code: { $regex: `^QA-${prefix}-` } }).sort({ code: -1 }).limit(1).select('code').lean();
  const m = last[0] && re.exec(last[0].code);
  return m ? Number(m[1]) + 1 : 1;
}

/**
 * `embedded`: called from the running server (src/db/bootstrap.js), which owns
 * the connection and builds indexes itself.
 */
async function main(opts = parseArgs(process.argv.slice(2)), { embedded = false } = {}) {
  const started = Date.now();
  console.log(`Seeding ${opts.perTopic !== null ? `${opts.perTopic} questions/chapter` : `${opts.count} questions/subject`} [${opts.subjects.join(', ')}] seed=${opts.seed} batch=${opts.batch}${opts.dryRun ? ' (dry run)' : ''}`);

  if (!opts.dryRun) {
    if (!embedded) await mongoose.connect(opts.uri);
    console.log(`Connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
    if (opts.reset) {
      const r = await Question.deleteMany({ authored_by: AUTHOR });
      console.log(`Reset: removed ${r.deletedCount} previously generated questions.`);
    }
    const moved = await migrateLegacyTopics();
    if (moved) console.log(`Taxonomy: moved ${moved} existing questions onto catalogue topic codes.`);
    const retargeted = await retargetGenerated();
    if (retargeted) console.log(`Targets: ${retargeted} existing questions now reach every category whose syllabus has their chapter.`);
    if (opts.untagSyntheticPyq) {
      console.log(`PYQ: removed pattern-based PYQ tags from ${await untagSyntheticPyq()} questions (questions kept).`);
    } else {
      const tagged = await Question.countDocuments({ 'pyq.refs.question_code': { $regex: '-SYN-' } });
      if (tagged) console.warn(`  ! ${tagged} questions carry pattern-based PYQ tags shown to students as real PYQs. Run with --untag-synthetic-pyq to remove the tags (questions are kept).`);
    }
  }

  const totals = { generated: 0, inserted: 0, skipped: 0 };
  for (const [si, subject] of opts.subjects.entries()) {
    const meta = SUBJECTS[subject];
    seed(opts.seed + si * 7919);
    const spec = loadSpec(subject);

    // Stems of earlier generated docs keep re-runs from producing duplicate content.
    const known = new Set();
    const existingByTopic = {};
    let target = opts.count;
    if (!opts.dryRun) {
      const rows = await Question.find({ subject, authored_by: AUTHOR }).select('stem.en topic').lean();
      rows.forEach((r) => {
        known.add(r.stem.en);
        existingByTopic[r.topic] = (existingByTopic[r.topic] || 0) + 1;
      });
      if (!opts.append) target = opts.count - rows.length;
      if (target <= 0 && opts.perTopic === null) {
        console.log(`âœ” ${meta.label}: already has ${rows.length} generated questions (use --append to add more, --reset to rebuild).`);
        continue;
      }
    }

    // Chapters in the syllabus with no generator or bank at all: nothing can be produced for them.
    const covered = new Set(spec.topics.map((t) => normalizeTopic(subject, t.topic).topic));
    const syllabusTopics = [...new Set(catalog.flatMap((c) => c.subjects.filter((x) => x.code === subject).flatMap((x) => x.topics.map((t) => t.code))))];
    const uncovered = syllabusTopics.filter((t) => !covered.has(t));
    if (uncovered.length) console.warn(`  ! ${meta.label}: no generator or fact bank yet for: ${uncovered.join(', ')}`);
    if (!spec.topics.length) continue;

    // --per-topic N: top every chapter up to N generated questions (or add N each with --append).
    let perTopicNeed = null;
    if (opts.perTopic !== null) {
      const entriesByTopic = {};
      spec.topics.forEach((t, i) => {
        const code = normalizeTopic(subject, t.topic).topic;
        (entriesByTopic[code] ||= []).push(i);
      });
      perTopicNeed = spec.topics.map(() => 0);
      for (const [code, idxs] of Object.entries(entriesByTopic)) {
        const deficit = opts.append ? opts.perTopic : Math.max(0, opts.perTopic - (existingByTopic[code] || 0));
        allocate(idxs.map((i) => spec.topics[i]), deficit).forEach((n, k) => { perTopicNeed[idxs[k]] = n; });
      }
      target = perTopicNeed.reduce((a, b) => a + b, 0);
      if (target === 0) {
        console.log(`âœ” ${meta.label}: every chapter already has at least ${opts.perTopic} generated questions.`);
        continue;
      }
    }

    const { bodies, shortfall, shortByTopic } = generateBodies(spec, target, known, perTopicNeed);
    if (shortfall > 0) {
      const detail = shortByTopic && Object.keys(shortByTopic).length ? ` (short: ${Object.entries(shortByTopic).map(([t, n]) => `${t} âˆ’${n}`).join(', ')})` : '';
      console.warn(`  ! ${meta.label}: only ${bodies.length}/${target} unique questions possible with current generators${detail}.`);
    }
    // A topic outside the catalogue would be saved but unreachable in the app: say so loudly.
    const offCatalog = [...new Set(bodies.map((b) => normalizeTopic(subject, b.topic, b.subtopic).topic))].filter((t) => !inCatalog(subject, t));
    if (offCatalog.length) console.warn(`  ! ${meta.label}: topics not in db/seed/catalog.js (add them there or alias them in src/services/taxonomy.js): ${offCatalog.join(', ')}`);

    let codeNo = await nextCodeNumber(meta.prefix, opts.dryRun);
    const docs = [];
    for (const [i, body] of bodies.entries()) {
      const code = `QA-${meta.prefix}-${String(codeNo++).padStart(6, '0')}`;
      const doc = toDocument(body, subject, code, i, opts);
      await new Question(doc).validate();
      docs.push(doc);
    }
    totals.generated += docs.length;

    let done = 0;
    for (let i = 0; i < docs.length; i += opts.batch) {
      const batch = docs.slice(i, i + opts.batch);
      if (opts.dryRun) {
        done += batch.length;
      } else {
        const r = await insertBatch(batch);
        done += r.inserted;
        totals.inserted += r.inserted;
        totals.skipped += r.skipped;
      }
      console.log(`Seeded ${Math.min(i + batch.length, docs.length)}/${docs.length} ${meta.label} questions...`);
    }
    console.log(`âœ” ${meta.label}: ${opts.dryRun ? `${docs.length} validated` : `${done} inserted`}`);
  }

  if (!opts.dryRun && !embedded) {
    try { await Question.createIndexes(); } catch (e) { console.warn(`Index warning: ${e.message}`); }
  }
  console.log(`Done in ${((Date.now() - started) / 1000).toFixed(1)}s. Generated=${totals.generated} Inserted=${totals.inserted} Skipped(duplicates)=${totals.skipped}`);
  return totals;
}

module.exports = { main, parseArgs, AUTHOR };

if (require.main === module) {
  main()
    .catch((err) => {
      console.error(`Seeding failed: ${err.message}`);
      process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect().catch(() => {}));
}
