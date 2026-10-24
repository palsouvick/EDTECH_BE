'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const common = require('../scripts/generators/common');
const extraQuant = require('../scripts/generators/supplement/quant_more');

const answerOf = (question) => question.options.find((option) => option.oid === question.correct_option_id).text.en;
const numericAnswerOf = (question) => Number(answerOf(question).match(/-?\d+(?:\.\d+)?/)[0]);
const generators = extraQuant.topics.flatMap(({ topic, gens }) => gens.map((generate) => ({ topic, generate })));

function expectedAnswer(topic, stem) {
  let match;
  switch (topic) {
    case 'percentage': {
      match = stem.match(/costs ₹(\d+)\. Its price is increased by (\d+)% and then reduced by (\d+)%/);
      return Number(match[1]) * (100 + Number(match[2])) * (100 - Number(match[3])) / 10000;
    }
    case 'average': {
      match = stem.match(/average mark of (\d+) students rises from (\d+) to (\d+).*original mark was (\d+)/);
      return Number(match[4]) + Number(match[1]) * (Number(match[3]) - Number(match[2]));
    }
    case 'ratio_proportion': {
      match = stem.match(/Find x if (\d+) : (\d+) = (\d+) : x/);
      return Number(match[2]) * Number(match[3]) / Number(match[1]);
    }
    case 'interest': {
      match = stem.match(/earns ₹([\d.]+) as simple interest at (\d+)% per year in (\d+) years/);
      return Number(match[1]) * 100 / (Number(match[2]) * Number(match[3]));
    }
    case 'number_system': {
      match = stem.match(/added to (\d+) to make it divisible by (\d+)/);
      const remainder = Number(match[1]) % Number(match[2]);
      return remainder === 0 ? Number(match[2]) : Number(match[2]) - remainder;
    }
    case 'time_speed_distance': {
      match = stem.match(/lengths (\d+) m and (\d+) m run in opposite directions at (\d+) km\/h and (\d+) km\/h/);
      return (Number(match[1]) + Number(match[2])) / ((Number(match[3]) + Number(match[4])) * 5 / 18);
    }
    case 'algebra': {
      match = stem.match(/Solve for x: (\d+)\(x \+ (\d+)\) = (\d+)x \+ (\d+)/);
      return (Number(match[4]) - Number(match[1]) * Number(match[2])) / (Number(match[1]) - Number(match[3]));
    }
    case 'mensuration': {
      match = stem.match(/uniform (\d+) m wide path .* measuring (\d+) m by (\d+) m/);
      const [width, length, breadth] = match.slice(1).map(Number);
      return (length + 2 * width) * (breadth + 2 * width) - length * breadth;
    }
    case 'ages': {
      match = stem.match(/(\d+) years ago, the ages of A and B were in the ratio (\d+) : (\d+)\. A was (\d+) years older/);
      const [years, olderPart, youngerPart, difference] = match.slice(1).map(Number);
      const onePart = difference / (olderPart - youngerPart);
      return (olderPart + youngerPart) * onePart + 2 * years;
    }
    default:
      throw new Error(`No answer check for ${topic}`);
  }
}

test('additional quantitative generators produce bilingual, unique-option questions with correct answers', () => {
  common.seed(240624);
  assert.equal(generators.length, 9);

  for (const { topic, generate } of generators) {
    for (let i = 0; i < 30; i++) {
      const question = generate();
      if (!question) continue;
      assert.equal(question.topic, topic);
      assert.ok(question.stem.en && question.stem.bn);
      assert.equal(question.options.length, 4);
      assert.equal(new Set(question.options.map((option) => option.text.en)).size, 4);
      assert.ok(question.options.every((option) => option.text.bn));
      assert.ok(question.solution.steps.length >= 2);
      assert.equal(numericAnswerOf(question), expectedAnswer(topic, question.stem.en), question.stem.en);
    }
  }
});
