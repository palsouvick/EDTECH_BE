'use strict';

/** Subject and chapter display names from the catalogue (identical across exam categories). */
const subjects = {};
const topics = {};
for (const c of require('../../db/seed/catalog')) {
  for (const s of c.subjects) {
    subjects[s.code] ||= s.name;
    for (const t of s.topics) topics[`${s.code}.${t.code}`] ||= t.name;
  }
}

const subjectName = (subject) => subjects[subject] ?? { en: subject };
const topicName = (subject, topic) => topics[`${subject}.${topic}`] ?? { en: topic };

module.exports = { subjectName, topicName };
