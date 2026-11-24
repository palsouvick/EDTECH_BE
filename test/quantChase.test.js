'use strict';

/**
 * "Chase with a head start" generator (WBPSC Clerkship 2023 reading-pages PYQ and its
 * family): every answer is re-solved independently from the numbers shown in the stem,
 * and the pattern rule tags both the generated questions and the PYQ wording.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { seed } = require('../scripts/generators/common');
const { chaseHeadStart, FRAMINGS, clock, duration } = require('../scripts/generators/supplement/quant_chase');
const { classify, checkRules, loadRules } = require('../src/services/patternTagger');

/** Independent solver: rates, start times (or gap) and the question asked, read from the stem. */
function solve(stem) {
  const [a, b] = [...stem.matchAll(/(\d+) (?:pages per hour|km\/h)/g)].map((x) => Number(x[1]));
  const times = [...stem.matchAll(/(\d+):(\d\d) (a|p)\.m\./g)].map((x) => ((Number(x[1]) % 12) + (x[3] === 'p' ? 12 : 0)) * 60 + Number(x[2]));
  let gap;
  if (times.length === 2) gap = times[1] - times[0];
  else {
    const h = /(\d+) hours?/.exec(stem);
    const m = /(\d+) minutes?/.exec(stem);
    gap = (h ? Number(h[1]) * 60 : 0) + (m ? Number(m[1]) : 0);
  }
  const catchUp = (a * gap) / (b - a); // minutes after the second start
  if (/at what time/i.test(stem)) return clock(times[1] + catchUp).en;
  if (/How long/.test(stem)) return duration(catchUp).en;
  return `${(b * catchUp) / 60} ${/pages/.test(stem) ? 'pages' : 'km'}`;
}

test('PYQ numbers: Ruma 30 p/h from 2:30, Neera 40 p/h from 3:20 -> 5:50 p.m.', () => {
  const stem = 'Ruma reads at an average rate of 30 pages per hour while Neera reads at 40 pages per hour. If Ruma starts reading a novel at 2:30 p.m. and Neera begins reading an identical copy at 3:20 p.m., at what time will they be reading the same page?';
  assert.equal(solve(stem), '5:50 p.m.');
});

test('every generated chase question has the independently solved answer and 4 distinct options', () => {
  seed(20241124);
  const seen = new Set();
  let made = 0;
  for (let i = 0; i < 1200; i++) {
    const q = chaseHeadStart(FRAMINGS[i % FRAMINGS.length]);
    if (!q) continue;
    made++;
    seen.add(FRAMINGS[i % FRAMINGS.length].key);
    const correct = q.options.find((o) => o.oid === q.correct_option_id).text.en;
    assert.equal(correct, solve(q.stem.en), q.stem.en);
    assert.equal(q.options.length, 4, q.stem.en);
    assert.equal(new Set(q.options.map((o) => o.text.en)).size, 4, q.stem.en);
    assert.ok(q.options.every((o) => o.text.bn), 'Bengali option text');
    assert.ok(q.stem.bn && q.solution.steps.length >= 3);
    assert.equal(q.pattern, 'chase_head_start');
    assert.equal(q.subtopic, 'chase_head_start');
    assert.ok(!/\d\.\d{2}/.test(q.solution.steps.map((s) => s.en).join(' ')), `no recurring decimals in the working: ${q.stem.en}`);
  }
  assert.ok(made > 300, `generated ${made}`);
  assert.equal(seen.size, FRAMINGS.length, 'every framing produces questions');
});

test('pattern rule tags the generated subtopic and the PYQ wording', () => {
  assert.deepEqual(checkRules(), [], 'rule keys are real pattern keys');
  const rules = loadRules().quant.time_speed_distance;
  assert.equal(classify(rules, { subtopic: 'chase_head_start', stem: { en: '' } }), 'chase_head_start');
  assert.equal(
    classify(rules, { stem: { en: 'Ruma reads at 30 pages per hour ... at what time will they be reading the same page?' } }),
    'chase_head_start',
  );
});
