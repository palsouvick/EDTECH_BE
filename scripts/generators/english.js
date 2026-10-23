'use strict';

const { ri, pick, sample, shuffle, T, same, names, NAMES_M, NAMES_ALL, build, textOptions } = require('./common');

const S = same;

// ---------------------------------------------------------------- Error detection (ভুল সনাক্তকরণ)
const ERR = {
  compound: {
    en: 'Two subjects joined by "and" take a plural verb.',
    bn: '"and" দ্বারা যুক্ত দুটি কর্তা থাকলে ক্রিয়া বহুবচন হয়।',
  },
  didBase: {
    en: 'After "did/does/do", the main verb stays in its base (first) form.',
    bn: '"did/does/do"-এর পর মূল ক্রিয়া সর্বদা মূল রূপে (Verb-এর প্রথম রূপ) থাকে।',
  },
  doubleComp: {
    en: 'Never use "more" with a comparative ending in -er (double comparative).',
    bn: '-er যুক্ত তুলনামূলক বিশেষণের আগে "more" বসে না (দ্বিগুণ তুলনা ভুল)।',
  },
  preferTo: {
    en: '"Prefer" is followed by "to", never by "than".',
    bn: '"Prefer"-এর পর "to" বসে, "than" নয়।',
  },
  stative: {
    en: 'Stative verbs (know, understand, believe) are not used in continuous tenses.',
    bn: 'অবস্থাবাচক ক্রিয়া (know, understand, believe) Continuous Tense-এ ব্যবহৃত হয় না।',
  },
  eachOf: {
    en: '"Each of" + plural noun takes a singular verb.',
    bn: '"Each of" + বহুবচন বিশেষ্যের পর ক্রিয়া একবচন হয়।',
  },
  seniorTo: {
    en: 'Senior, junior, superior and inferior are followed by "to", not "than".',
    bn: 'Senior, junior, superior, inferior-এর পর "to" বসে, "than" নয়।',
  },
  neitherOf: {
    en: '"Neither of" + plural noun takes a singular verb.',
    bn: '"Neither of" + বহুবচন বিশেষ্যের পর ক্রিয়া একবচন হয়।',
  },
  tellSay: {
    en: '"Say" is not followed by a personal object; use "tell someone".',
    bn: '"Say"-এর পর ব্যক্তিবাচক কর্ম বসে না; "tell someone" ব্যবহার করতে হয়।',
  },
  hardlyWhen: {
    en: '"Hardly/Scarcely" is followed by "when", while "No sooner" is followed by "than".',
    bn: '"Hardly/Scarcely"-এর পর "when" বসে; "No sooner"-এর পর "than" বসে।',
  },
  thoughBut: {
    en: '"Though/Although" and "but" cannot be used together in one sentence.',
    bn: '"Though/Although" এবং "but" একই বাক্যে একসঙ্গে ব্যবহার করা যায় না।',
  },
  uncountable: {
    en: 'Furniture, luggage, information, equipment and scenery are uncountable and take a singular verb.',
    bn: 'Furniture, luggage, information, equipment, scenery অগণনীয় বিশেষ্য, তাই একবচন ক্রিয়া বসে।',
  },
  agreeVerb: {
    en: '"Agree" is a verb, so "is agree" is wrong; use "agrees".',
    bn: '"Agree" নিজেই ক্রিয়া, তাই "is agree" ভুল; "agrees" হবে।',
  },
  oneOf: {
    en: '"One of the" must be followed by a plural noun.',
    bn: '"One of the"-এর পর বহুবচন বিশেষ্য বসে।',
  },
  uncountNoun: {
    en: 'Advice and information are uncountable: no "a/an" and no plural form.',
    bn: 'Advice ও information অগণনীয়: এদের আগে "a/an" বসে না এবং বহুবচন হয় না।',
  },
  wishWere: {
    en: 'For an unreal condition or wish, use "were" for all persons.',
    bn: 'অবাস্তব শর্ত বা ইচ্ছা বোঝাতে সব পুরুষের জন্য "were" ব্যবহৃত হয়।',
  },
};

const nm = () => pick(NAMES_ALL).en;
const two = () => names(2).map((n) => n.en);

const errTemplates = [
  () => {
    const [a, b] = two();
    const [ing, where] = pick([['playing', 'in the park'], ['waiting', 'for the bus'], ['working', 'on the project'], ['studying', 'at the library'], ['going', 'to the market'], ['walking', 'towards the station']]);
    return { segs: [`${a} and ${b}`, `is ${ing}`, where, pick(['right now', 'at this moment', 'these days', 'this evening'])], err: 1, fixed: `are ${ing}`, rule: ERR.compound, sub: 'subject_verb' };
  },
  () => ({ segs: [nm(), 'did not went', `to ${pick(['school', 'the market', 'the temple', 'the office', 'the station'])}`, pick(['yesterday', 'last Sunday', 'last week', 'this morning'])], err: 1, fixed: 'did not go', rule: ERR.didBase, sub: 'verb_forms' }),
  () => {
    const [a, b] = two();
    const adj = pick(['taller', 'stronger', 'smarter', 'faster', 'older']);
    return { segs: [`${a} is`, `more ${adj}`, `than ${b}`, pick(['in the class', 'in the team', 'in the family'])], err: 1, fixed: adj, rule: ERR.doubleComp, sub: 'comparison' };
  },
  () => {
    const [x, y] = pick([['tea', 'coffee'], ['cricket', 'football'], ['rice', 'bread'], ['books', 'movies'], ['trains', 'buses']]);
    return { segs: [nm(), `prefers ${x}`, `than ${y}`, pick(['in the morning', 'during holidays', 'on weekends'])], err: 2, fixed: `to ${y}`, rule: ERR.preferTo, sub: 'prepositions' };
  },
  () => {
    const a = nm();
    if (ri(0, 1)) return { segs: ['I have been knowing', `${a} very well`, 'since', String(ri(1995, 2018))], err: 0, fixed: 'I have known', rule: ERR.stative, sub: 'tenses' };
    return { segs: [`${a} is knowing`, 'the answer to', 'this question', pick(['very well', 'perfectly', 'quite clearly'])], err: 0, fixed: `${a} knows`, rule: ERR.stative, sub: 'tenses' };
  },
  () => {
    const pl = pick(['boys', 'girls', 'students', 'players', 'candidates']);
    return { segs: [`Each of the ${pl}`, 'have completed', `their ${pick(['homework', 'assignment', 'project', 'task'])}`, pick(['on time', 'this week', 'before noon'])], err: 1, fixed: 'has completed', rule: ERR.eachOf, sub: 'subject_verb' };
  },
  () => {
    const w = pick(['senior', 'junior', 'superior', 'inferior']);
    const tail = w === 'senior' || w === 'junior' ? `by ${pick(['two', 'three', 'five', 'ten'])} years` : pick(['in every respect', 'in many ways']);
    return { segs: [nm(), `is ${w}`, `than ${nm()}`, tail], err: 2, fixed: 'to', rule: ERR.seniorTo, sub: 'prepositions' };
  },
  () => {
    const pl = pick(['boys', 'girls', 'students', 'players', 'candidates']);
    return { segs: [`Neither of the ${pl}`, 'are', pick(['ready', 'prepared']), `for the ${pick(['test', 'interview', 'journey', 'match'])}`], err: 1, fixed: 'is', rule: ERR.neitherOf, sub: 'subject_verb' };
  },
  () => ({ segs: [nm(), 'said me', `that the ${pick(['train', 'bus', 'flight', 'meeting'])}`, `was ${pick(['late', 'cancelled', 'delayed'])}`], err: 1, fixed: 'told me', rule: ERR.tellSay, sub: 'verb_forms' }),
  () => {
    const who = pick(['he', 'she', 'we', 'they']);
    return { segs: [`Hardly had ${who} reached`, `the ${pick(['station', 'office', 'school', 'hospital'])}`, 'than', pick(['the train left', 'the bell rang', 'it started raining', 'the lights went out'])], err: 2, fixed: 'when', rule: ERR.hardlyWhen, sub: 'conjunctions' };
  },
  () => {
    const a = pick(NAMES_M).en;
    const [x, y] = pick([['poor', 'honest'], ['weak', 'courageous'], ['tired', 'cheerful'], ['young', 'wise']]);
    return { segs: [`Though ${a} was ${x}`, 'but', 'he remained', y], err: 1, fixed: '(delete "but")', rule: ERR.thoughBut, sub: 'conjunctions' };
  },
  () => ({ segs: [`The ${pick(['furniture', 'luggage', 'information', 'equipment', 'scenery'])}`, 'are', pick(['very old', 'quite expensive', 'extremely useful', 'in good condition']), pick(['according to the manager', 'as per the report', 'in my opinion'])], err: 1, fixed: 'is', rule: ERR.uncountable, sub: 'subject_verb' }),
  () => ({ segs: [nm(), 'is agree', 'with the', pick(['proposal', 'decision', 'plan', 'suggestion'])], err: 1, fixed: 'agrees', rule: ERR.agreeVerb, sub: 'verb_forms' }),
  () => {
    const [sing, plur, where] = pick([['player', 'players', 'in the team'], ['student', 'students', 'in the class'], ['writer', 'writers', 'in the country'], ['singer', 'singers', 'in the city'], ['teacher', 'teachers', 'in the school']]);
    return { segs: [`${nm()} is one`, 'of the best', sing, where], err: 2, fixed: plur, rule: ERR.oneOf, sub: 'plurals' };
  },
  () => {
    const [wrong, right] = pick([['an advice', 'some advice'], ['many informations', 'a lot of information'], ['an information', 'some information'], ['many advices', 'a lot of advice']]);
    return { segs: [`${nm()} gave me`, wrong, 'about the', pick(['examination', 'interview', 'investment', 'journey'])], err: 1, fixed: right, rule: ERR.uncountNoun, sub: 'nouns' };
  },
  () => {
    if (ri(0, 1)) return { segs: ['If I was', 'you, I would', 'accept the', pick(['offer', 'proposal', 'job', 'scholarship'])], err: 0, fixed: 'If I were', rule: ERR.wishWere, sub: 'conditionals' };
    return { segs: ['I wish', 'I was', pick(['a millionaire', 'the principal', 'a doctor', 'a pilot']), pick(['in this city', 'in this country', 'at this school'])], err: 1, fixed: 'I were', rule: ERR.wishWere, sub: 'conditionals' };
  },
];

function errorDetectionGen(template) {
  return () => {
    const d = template();
    if (!d || new Set(d.segs).size !== 4) return null;
    const sentence = `${d.segs.join(' ')}.`;
    const bad = d.segs[d.err];
    return build({
      topic: 'error_detection', subtopic: d.sub, tags: ['grammar', 'error_spotting'], difficulty: ri(2, 3), time: 30,
      stem: T(`Identify the part of the sentence that contains a grammatical error:\n"${sentence}"`, `বাক্যটির কোন অংশে ব্যাকরণগত ভুল আছে তা চিহ্নিত করো:\n"${sentence}"`),
      correct: S(bad),
      wrong: d.segs.filter((_, i) => i !== d.err).map(S),
      steps: [
        T(`Check each part against grammar rules. The error is in "${bad}".`, `প্রতিটি অংশ ব্যাকরণের নিয়ম মিলিয়ে দেখো। ভুলটি "${bad}" অংশে।`),
        T(`Correct form: ${d.fixed}. Rule: ${d.rule.en}`, `সঠিক রূপ: ${d.fixed}। নিয়ম: ${d.rule.bn}`),
      ],
      shortcut: T(d.rule.en, d.rule.bn),
    });
  };
}

// ---------------------------------------------------------------- Prepositions (Preposition)
const PREPS = ['of', 'at', 'in', 'on', 'with', 'for', 'to', 'from', 'about', 'by'];
const COLLOC = [
  ['is fond', 'of', ['classical music', 'spicy food', 'cricket', 'old movies'], []],
  ['is good', 'at', ['mathematics', 'singing', 'chess', 'drawing'], ['in']],
  ['is afraid', 'of', ['dogs', 'darkness', 'heights', 'snakes'], []],
  ['is capable', 'of', ['handling this project', 'solving the problem', 'leading the team', 'winning the match'], []],
  ['is proud', 'of', ['the result', 'this victory', 'the team', 'the school'], ['about']],
  ['is jealous', 'of', ['the winner', 'the new student', 'their success', 'the champion'], ['at']],
  ['is aware', 'of', ['the danger', 'the rules', 'the problem', 'the deadline'], ['about']],
  ['is responsible', 'for', ['the delay', 'the mistake', 'the safety of children', 'this project'], ['to']],
  ['is famous', 'for', ['honesty', 'bravery', 'generosity', 'punctuality'], []],
  ['is suitable', 'for', ['this job', 'the post', 'the occasion', 'the role'], ['to']],
  ['is angry', 'with', ['the driver', 'the manager', 'the shopkeeper', 'the neighbour'], ['at', 'about']],
  ['is married', 'to', ['a doctor', 'an engineer', 'a teacher', 'a lawyer'], []],
  ['is superior', 'to', ['all rivals', 'the others', 'every competitor', 'the old model'], []],
  ['is interested', 'in', ['music', 'politics', 'history', 'astronomy'], []],
  ['is weak', 'in', ['English', 'mathematics', 'geography', 'physics'], ['at']],
  ['is addicted', 'to', ['mobile games', 'chocolates', 'social media', 'online shopping'], []],
  ['is allergic', 'to', ['dust', 'pollen', 'peanuts', 'certain medicines'], []],
  ['is satisfied', 'with', ['the result', 'the service', 'the arrangements', 'the answer'], []],
  ['is tired', 'of', ['waiting', 'the same food', 'this routine', 'excuses'], ['with']],
  ['is keen', 'on', ['learning French', 'playing football', 'joining the army', 'becoming a doctor'], ['about']],
  ['is accused', 'of', ['theft', 'fraud', 'cheating', 'negligence'], []],
  ['is guilty', 'of', ['the crime', 'negligence', 'dishonesty', 'breaking the rule'], []],
  ['depends', 'on', ['the parents', 'the weather', 'your performance', 'the results'], []],
  ['insists', 'on', ['going alone', 'paying the bill', 'an early start', 'a written reply'], []],
  ['listens', 'to', ['the radio', 'the news', 'old songs', 'the teacher'], []],
  ['waits', 'for', ['the bus', 'the train', 'the results', 'the doctor'], ['on']],
  ['apologised', 'for', ['the delay', 'the mistake', 'being late', 'the trouble'], ['about']],
  ['complained', 'about', ['the noise', 'the food', 'the delay', 'the service'], ['of']],
  ['applied', 'for', ['a loan', 'the job', 'a passport', 'leave'], ['to']],
  ['succeeded', 'in', ['passing the test', 'winning the race', 'clearing the exam', 'solving the puzzle'], []],
  ['believes', 'in', ['hard work', 'destiny', 'honesty', 'God'], []],
  ['laughed', 'at', ['the joke', 'the mistake', 'the clown', 'the story'], []],
  ['died', 'of', ['cholera', 'cancer', 'a heart attack', 'malaria'], ['from']],
  ['is blind', 'to', ['the truth', 'the facts', 'the warnings', 'all faults'], []],
];

function prepositionQ() {
  const [pre, prep, objs, ex] = pick(COLLOC);
  const obj = pick(objs);
  const who = nm();
  const wrong = sample(PREPS.filter((p) => p !== prep && !ex.includes(p)), 3);
  const sentence = `${who} ${pre} ___ ${obj}.`;
  return build({
    topic: 'prepositions', subtopic: 'fixed_prepositions', tags: ['grammar', 'prepositions'], difficulty: ri(1, 3), time: 20,
    stem: T(`Fill in the blank with the correct preposition:\n${sentence}`, `শূন্যস্থানে সঠিক Preposition বসাও:\n${sentence}`),
    correct: S(prep), wrong: wrong.map(S),
    steps: [
      T(`"${pre.replace(/^is /, '')}" takes the fixed preposition "${prep}".`, `"${pre.replace(/^is /, '')}"-এর সঙ্গে নির্দিষ্ট Preposition "${prep}" বসে।`),
      T(`Correct sentence: ${sentence.replace('___', prep)}`, `সঠিক বাক্য: ${sentence.replace('___', prep)}`),
    ],
    shortcut: T('Learn adjective/verb + preposition pairs as fixed collocations.', 'Adjective/Verb + Preposition জোড়াগুলি নির্দিষ্ট প্রয়োগ হিসেবে মুখস্থ রাখো।'),
  });
}

// ---------------------------------------------------------------- Subject-Verb Agreement (কর্তা-ক্রিয়ার সামঞ্জস্য)
const SUBJECTS = [
  ['Each of the students', false, '"Each of" takes a singular verb.', '"Each of"-এর পর একবচন ক্রিয়া বসে।'],
  ['Neither of the answers', false, '"Neither of" takes a singular verb.', '"Neither of"-এর পর একবচন ক্রিয়া বসে।'],
  ['Either of the two roads', false, '"Either of" takes a singular verb.', '"Either of"-এর পর একবচন ক্রিয়া বসে।'],
  ['One of my friends', false, 'The subject is "One", not "friends".', 'কর্তা "One", "friends" নয়, তাই একবচন ক্রিয়া।'],
  ['Everyone in the class', false, 'Everyone/Everybody take singular verbs.', 'Everyone/Everybody-র সঙ্গে একবচন ক্রিয়া বসে।'],
  ['Nobody', false, '"Nobody" is singular.', '"Nobody" একবচন।'],
  ['Somebody', false, '"Somebody" is singular.', '"Somebody" একবচন।'],
  ['The news', false, '"News" is singular despite the final -s.', '"News" শেষে -s থাকলেও একবচন।'],
  ['Mathematics', false, 'Subject names ending in -s are singular.', '-s দিয়ে শেষ হওয়া বিষয়ের নাম একবচন।'],
  ['Economics', false, 'Subject names ending in -s are singular.', '-s দিয়ে শেষ হওয়া বিষয়ের নাম একবচন।'],
  ['The number of applicants', false, '"The number of" takes a singular verb.', '"The number of"-এর পর একবচন ক্রিয়া বসে।'],
  ['Every boy and every girl', false, 'Each/every with "and" still takes a singular verb.', 'Each/every থাকলে "and" যুক্ত কর্তার ক্রিয়া একবচন হয়।'],
  ['Ten kilometres', false, 'A distance or amount seen as one unit is singular.', 'দূরত্ব বা পরিমাণ একক হিসেবে ধরলে একবচন ক্রিয়া বসে।'],
  ['The teacher along with her students', false, 'With/along with: the verb agrees with the first subject.', 'With/along with থাকলে ক্রিয়া প্রথম কর্তার সঙ্গে মিলবে।'],
  ['The captain, together with his players', false, 'With/together with: the verb agrees with the first subject.', 'With/together with থাকলে ক্রিয়া প্রথম কর্তার সঙ্গে মিলবে।'],
  ['Bread and butter', false, 'Two things forming one idea take a singular verb.', 'দুটি জিনিস মিলে একটি ধারণা বোঝালে একবচন ক্রিয়া হয়।'],
  ['Neither the boys nor the girl', false, 'With neither…nor the verb agrees with the nearer subject (girl).', 'neither…nor-এ ক্রিয়া নিকটতম কর্তার (girl) সঙ্গে মিলবে।'],
  ['Both of the boys', true, '"Both" is always plural.', '"Both" সর্বদা বহুবচন।'],
  ['A number of students', true, '"A number of" takes a plural verb.', '"A number of"-এর পর বহুবচন ক্রিয়া বসে।'],
  ['The police', true, '"Police" is a plural noun.', '"Police" বহুবচন বিশেষ্য।'],
  ['Few of the members', true, '"Few" is plural.', '"Few" বহুবচন।'],
  ['Several books', true, '"Several" is plural.', '"Several" বহুবচন।'],
  ['My brother and sister', true, 'Two subjects joined by "and" take a plural verb.', '"and" দ্বারা যুক্ত দুটি কর্তার ক্রিয়া বহুবচন হয়।'],
  ['The manager and the accountant', true, 'Two persons joined by "and" take a plural verb.', '"and" দ্বারা যুক্ত দুজন ব্যক্তির ক্রিয়া বহুবচন হয়।'],
  ['The poor', true, '"The + adjective" for a class of people is plural.', '"The + adjective" একটি শ্রেণি বোঝালে বহুবচন।'],
  ['The young', true, '"The + adjective" for a class of people is plural.', '"The + adjective" একটি শ্রেণি বোঝালে বহুবচন।'],
  ['Cattle', true, '"Cattle" is a plural noun.', '"Cattle" বহুবচন বিশেষ্য।'],
  ['People', true, '"People" is a plural noun.', '"People" বহুবচন বিশেষ্য।'],
  ['These scissors', true, 'Scissors, trousers, spectacles are plural.', 'Scissors, trousers, spectacles বহুবচন।'],
  ['Many of the candidates', true, '"Many of" + plural noun takes a plural verb.', '"Many of" + বহুবচন বিশেষ্যের পর বহুবচন ক্রিয়া বসে।'],
  ['The teachers as well as the principal', true, 'With "as well as" the verb agrees with the first subject (plural).', '"as well as" থাকলে ক্রিয়া প্রথম কর্তার (বহুবচন) সঙ্গে মিলবে।'],
  ['Neither the girl nor the boys', true, 'With neither…nor the verb agrees with the nearer subject (boys).', 'neither…nor-এ ক্রিয়া নিকটতম কর্তার (boys) সঙ্গে মিলবে।'],
];
const FRAMES = [
  ["___ mentioned in today's report.", 'is', 'are', ['be', 'being']],
  ['___ very important for the final result.', 'is', 'are', ['be', 'being']],
  ['___ been reported in the newspaper.', 'has', 'have', ['having', 'is']],
  ['___ under discussion at present.', 'is', 'are', ['be', 'being']],
  ['___ not been announced yet.', 'has', 'have', ['having', 'is']],
  ['___ discussed in detail yesterday.', 'was', 'were', ['be', 'been']],
  ['___ going to be examined next week.', 'is', 'are', ['be', 'being']],
  ['___ always considered a serious matter.', 'is', 'are', ['be', 'being']],
];

function svaQ() {
  const [text, plural, ruleEn, ruleBn] = pick(SUBJECTS);
  const [frame, sing, plur, extra] = pick(FRAMES);
  const ans = plural ? plur : sing;
  const wrongForm = plural ? sing : plur;
  const sentence = `${text} ${frame}`;
  return build({
    topic: 'subject_verb_agreement', subtopic: 'agreement_rules', tags: ['grammar', 'subject_verb_agreement'], difficulty: ri(2, 4), time: 25,
    stem: T(`Choose the correct verb to fill in the blank:\n${sentence}`, `শূন্যস্থানে সঠিক Verb বসাও (Subject-Verb Agreement):\n${sentence}`),
    correct: S(ans),
    wrong: [{ ...S(wrongForm), trap: T(`This verb does not agree with the subject "${text}". ${ruleEn}`, `এই ক্রিয়াটি কর্তা "${text}"-এর সঙ্গে মেলে না। ${ruleBn}`) }, S(extra[0]), S(extra[1])],
    steps: [
      T(`Identify the real subject: "${text}". ${ruleEn}`, `আসল কর্তা চিহ্নিত করো: "${text}"। ${ruleBn}`),
      T(`The subject is ${plural ? 'plural' : 'singular'}, so the verb is "${ans}".`, `কর্তা ${plural ? 'বহুবচন' : 'একবচন'}, তাই ক্রিয়া হবে "${ans}"।`),
    ],
    shortcut: T('Ignore words between the subject and verb; find the true head of the subject.', 'কর্তা ও ক্রিয়ার মাঝের শব্দ উপেক্ষা করে আসল কর্তাটি খুঁজে বের করো।'),
  });
}

// ---------------------------------------------------------------- Idioms & Phrases (বাগধারা ও বাক্যাংশ)
const IDIOMS = [
  ['a piece of cake', 'something very easy', 'খুব সহজ কাজ'],
  ['break the ice', 'to start a conversation in an awkward situation', 'আড়ষ্টতা কাটিয়ে আলাপ শুরু করা'],
  ['hit the nail on the head', 'to say exactly the right thing', 'ঠিক কথাটি বলা'],
  ['once in a blue moon', 'very rarely', 'কালেভদ্রে'],
  ['spill the beans', 'to reveal a secret', 'গোপন কথা ফাঁস করা'],
  ['the last straw', 'the final problem that makes a situation unbearable', 'সহ্যের শেষ সীমা'],
  ['cost an arm and a leg', 'to be very expensive', 'অত্যন্ত দামি হওয়া'],
  ['bite the bullet', 'to face a painful situation bravely', 'কষ্ট সহ্য করে সাহসের সঙ্গে মোকাবিলা করা'],
  ['beat around the bush', 'to avoid coming to the main point', 'আসল কথা এড়িয়ে ঘুরিয়ে বলা'],
  ['call it a day', 'to stop working for the day', 'সেদিনের মতো কাজ বন্ধ করা'],
  ['under the weather', 'feeling slightly ill', 'শরীর খারাপ লাগা'],
  ['burn the midnight oil', 'to work or study late into the night', 'গভীর রাত পর্যন্ত পড়াশোনা বা কাজ করা'],
  ['cry over spilt milk', 'to regret something that cannot be undone', 'যা হয়ে গেছে তার জন্য আক্ষেপ করা'],
  ['a blessing in disguise', 'a misfortune that eventually brings good', 'ছদ্মবেশে আশীর্বাদ'],
  ['at the drop of a hat', 'immediately, without hesitation', 'সঙ্গে সঙ্গে, বিনা দ্বিধায়'],
  ['barking up the wrong tree', 'pursuing a mistaken course of action', 'ভুল পথে চেষ্টা করা'],
  ['kick the bucket', 'to die', 'মারা যাওয়া'],
  ["pull someone's leg", 'to tease someone jokingly', 'মজা করে বোকা বানানো'],
  ['cut corners', 'to do something in the cheapest or easiest way', 'ফাঁকি দিয়ে বা কম খরচে কাজ সারা'],
  ['face the music', 'to accept the consequences of one’s actions', 'নিজের কাজের পরিণতি মেনে নেওয়া'],
  ['go the extra mile', 'to make a special effort', 'বাড়তি চেষ্টা করা'],
  ['hold your horses', 'to wait and be patient', 'ধৈর্য ধরা'],
  ['in hot water', 'in trouble', 'বিপদে পড়া'],
  ['jump the gun', 'to act too soon', 'তাড়াহুড়ো করে আগেই কাজ করে ফেলা'],
  ['a white elephant', 'a costly possession that is useless', 'ব্যয়বহুল অথচ অকেজো সম্পদ'],
  ['a red-letter day', 'a memorable and joyful day', 'স্মরণীয় আনন্দের দিন'],
  ['add fuel to the fire', 'to make a bad situation worse', 'আগুনে ঘি ঢালা'],
  ['turn a blind eye', 'to deliberately ignore something', 'ইচ্ছাকৃতভাবে উপেক্ষা করা'],
  ['take the bull by the horns', 'to face a difficulty boldly', 'সাহসের সঙ্গে কঠিন সমস্যার মোকাবিলা করা'],
  ['at sixes and sevens', 'in a state of confusion', 'বিশৃঙ্খল অবস্থায়'],
  ['by hook or by crook', 'by any means possible', 'যেকোনো উপায়ে'],
  ['a bolt from the blue', 'a sudden and unexpected event', 'অপ্রত্যাশিত ঘটনা'],
  ['eat humble pie', 'to apologise humbly', 'নতি স্বীকার করে ক্ষমা চাওয়া'],
  ['in a nutshell', 'in brief', 'সংক্ষেপে'],
  ['leave no stone unturned', 'to try every possible means', 'সব রকম চেষ্টা করা'],
  ["the lion's share", 'the largest part', 'সিংহভাগ'],
  ['throw in the towel', 'to give up', 'হার স্বীকার করা'],
  ['smell a rat', 'to suspect that something is wrong', 'সন্দেহ করা'],
  ['play truant', 'to stay away from school without permission', 'স্কুল ফাঁকি দেওয়া'],
  ['be all ears', 'to listen attentively', 'মন দিয়ে শোনা'],
  ['a dark horse', 'an unexpectedly successful person', 'অপ্রত্যাশিত বিজয়ী'],
  ['see eye to eye', 'to agree fully', 'সম্পূর্ণ একমত হওয়া'],
  ['show the white feather', 'to show cowardice', 'ভীরুতা দেখানো'],
  ['pay through the nose', 'to pay an excessively high price', 'অতিরিক্ত দাম দেওয়া'],
  ['an apple of discord', 'a cause of quarrel', 'বিবাদের কারণ'],
  ["Achilles' heel", 'a person’s weak point', 'দুর্বল স্থান'],
  ['bell the cat', 'to undertake a risky task', 'ঝুঁকিপূর্ণ কাজের দায়িত্ব নেওয়া'],
  ['a storm in a teacup', 'a big fuss over a small matter', 'তুচ্ছ বিষয়ে হইচই'],
  ['keep at bay', 'to keep away', 'দূরে সরিয়ে রাখা'],
  ['make both ends meet', 'to manage with a small income', 'সামান্য আয়ে সংসার চালানো'],
  ['on cloud nine', 'extremely happy', 'আনন্দে আত্মহারা'],
].map(([idiom, en, bn]) => ({ idiom, en, bn }));

function idiomQ() {
  const kind = ri(0, 2);
  const d = pick(IDIOMS);
  if (kind < 2) {
    const q = kind === 0 ? 'Choose the correct meaning of the idiom' : 'Select the option that best explains the phrase';
    const { correct, wrong } = textOptions(T(d.en, d.bn), IDIOMS.map((x) => T(x.en, x.bn)));
    return build({
      topic: 'idioms_phrases', subtopic: 'idiom_meaning', tags: ['vocabulary', 'idioms'], difficulty: ri(1, 3), time: 20,
      stem: T(`${q}: "${d.idiom}"`, `"${d.idiom}" – এই Idiom/Phrase-টির সঠিক অর্থ নির্বাচন করো:`),
      correct, wrong,
      steps: [T(`"${d.idiom}" means ${d.en}.`, `"${d.idiom}" অর্থ: ${d.bn}।`)],
      shortcut: T('Guess from context: idioms are never meant literally.', 'প্রসঙ্গ থেকে অনুমান করো: Idiom-এর আক্ষরিক অর্থ ধরা হয় না।'),
    });
  }
  const { correct, wrong } = textOptions(S(d.idiom), IDIOMS.map((x) => S(x.idiom)));
  return build({
    topic: 'idioms_phrases', subtopic: 'idiom_from_meaning', tags: ['vocabulary', 'idioms'], difficulty: ri(2, 3), time: 25,
    stem: T(`Which idiom means "${d.en}"?`, `কোন Idiom-টির অর্থ "${d.en}" (${d.bn})?`),
    correct, wrong,
    steps: [T(`The idiom meaning "${d.en}" is "${d.idiom}".`, `"${d.bn}" অর্থে ব্যবহৃত Idiom হলো "${d.idiom}"।`)],
    shortcut: T('Eliminate idioms whose meanings you know are different.', 'যে Idiom-গুলির অর্থ আলাদা বলে জানো সেগুলি বাদ দাও।'),
  });
}

// ---------------------------------------------------------------- Synonyms / Antonyms (সমার্থক ও বিপরীতার্থক শব্দ)
const WORDS = [
  ['abundant', 'প্রচুর', ['plentiful', 'ample'], ['scarce', 'meagre']],
  ['benevolent', 'দয়ালু', ['charitable', 'kindhearted'], ['malevolent', 'spiteful']],
  ['candid', 'স্পষ্টবাদী', ['frank', 'outspoken'], ['devious', 'secretive']],
  ['diligent', 'পরিশ্রমী', ['industrious', 'assiduous'], ['lazy', 'indolent']],
  ['eminent', 'খ্যাতিমান', ['renowned', 'illustrious'], ['obscure', 'unknown']],
  ['frugal', 'মিতব্যয়ী', ['thrifty', 'economical'], ['extravagant', 'wasteful']],
  ['gloomy', 'বিষণ্ণ', ['dismal', 'sombre'], ['cheerful', 'radiant']],
  ['hostile', 'শত্রুভাবাপন্ন', ['antagonistic', 'inimical'], ['amicable', 'friendly']],
  ['inevitable', 'অনিবার্য', ['unavoidable', 'inescapable'], ['avoidable', 'preventable']],
  ['jubilant', 'উল্লসিত', ['elated', 'overjoyed'], ['dejected', 'sorrowful']],
  ['keen', 'আগ্রহী', ['eager', 'avid'], ['apathetic', 'indifferent']],
  ['lucid', 'সুস্পষ্ট', ['clear', 'transparent'], ['vague', 'ambiguous']],
  ['mundane', 'সাধারণ', ['ordinary', 'commonplace'], ['extraordinary', 'exceptional']],
  ['nimble', 'ক্ষিপ্র', ['agile', 'spry'], ['clumsy', 'sluggish']],
  ['obstinate', 'একগুঁয়ে', ['stubborn', 'headstrong'], ['pliable', 'yielding']],
  ['prudent', 'বিচক্ষণ', ['wise', 'discreet'], ['reckless', 'imprudent']],
  ['rapid', 'দ্রুত', ['swift', 'speedy'], ['slow', 'gradual']],
  ['serene', 'প্রশান্ত', ['calm', 'tranquil'], ['turbulent', 'agitated']],
  ['tedious', 'ক্লান্তিকর', ['boring', 'monotonous'], ['thrilling', 'exciting']],
  ['vivid', 'জীবন্ত', ['graphic', 'striking'], ['dull', 'faint']],
  ['zealous', 'উদ্যমী', ['fervent', 'ardent'], ['lukewarm', 'listless']],
  ['ancient', 'প্রাচীন', ['antique', 'archaic'], ['modern', 'contemporary']],
  ['brave', 'সাহসী', ['courageous', 'valiant'], ['cowardly', 'timid']],
  ['cruel', 'নিষ্ঠুর', ['ruthless', 'merciless'], ['compassionate', 'gentle']],
  ['destroy', 'ধ্বংস করা', ['demolish', 'annihilate'], ['construct', 'create']],
  ['expand', 'সম্প্রসারিত করা', ['enlarge', 'extend'], ['contract', 'shrink']],
  ['fragile', 'ভঙ্গুর', ['delicate', 'brittle'], ['sturdy', 'robust']],
  ['generous', 'উদার', ['liberal', 'magnanimous'], ['miserly', 'stingy']],
  ['humble', 'বিনয়ী', ['modest', 'unassuming'], ['arrogant', 'haughty']],
  ['illegal', 'অবৈধ', ['unlawful', 'illicit'], ['legal', 'lawful']],
  ['lenient', 'সহনশীল', ['merciful', 'tolerant'], ['strict', 'harsh']],
  ['mature', 'পরিণত', ['ripe', 'grown'], ['immature', 'childish']],
  ['noble', 'মহৎ', ['honourable', 'virtuous'], ['ignoble', 'wicked']],
  ['pacify', 'শান্ত করা', ['appease', 'placate'], ['provoke', 'aggravate']],
  ['rigid', 'কঠোর', ['inflexible', 'unbending'], ['flexible', 'supple']],
  ['urban', 'শহুরে', ['metropolitan', 'civic'], ['rural', 'rustic']],
  ['victory', 'জয়', ['triumph', 'conquest'], ['defeat', 'failure']],
  ['wealthy', 'ধনী', ['affluent', 'prosperous'], ['impoverished', 'destitute']],
  ['ban', 'নিষিদ্ধ করা', ['prohibit', 'forbid'], ['permit', 'allow']],
  ['conceal', 'লুকানো', ['hide', 'cloak'], ['reveal', 'disclose']],
  ['decline', 'হ্রাস পাওয়া', ['diminish', 'dwindle'], ['increase', 'flourish']],
  ['enormous', 'বিশাল', ['huge', 'colossal'], ['tiny', 'minute']],
  ['fertile', 'উর্বর', ['fruitful', 'productive'], ['barren', 'sterile']],
  ['genuine', 'খাঁটি', ['authentic', 'bona fide'], ['counterfeit', 'spurious']],
  ['hasten', 'ত্বরান্বিত করা', ['expedite', 'accelerate'], ['delay', 'hinder']],
  ['idle', 'অলস', ['inactive', 'unoccupied'], ['busy', 'occupied']],
  ['loyal', 'অনুগত', ['faithful', 'devoted'], ['treacherous', 'disloyal']],
  ['obedient', 'বাধ্য', ['compliant', 'dutiful'], ['disobedient', 'rebellious']],
  ['permanent', 'স্থায়ী', ['lasting', 'enduring'], ['temporary', 'transient']],
  ['reluctant', 'অনিচ্ছুক', ['unwilling', 'hesitant'], ['willing', 'ready']],
  ['spacious', 'প্রশস্ত', ['roomy', 'capacious'], ['cramped', 'confined']],
  ['sufficient', 'যথেষ্ট', ['adequate', 'enough'], ['inadequate', 'deficient']],
  ['trivial', 'তুচ্ছ', ['insignificant', 'negligible'], ['significant', 'crucial']],
  ['unique', 'অনন্য', ['singular', 'matchless'], ['typical', 'widespread']],
  ['valid', 'বৈধ', ['cogent', 'justifiable'], ['invalid', 'baseless']],
  ['weary', 'ক্লান্ত', ['exhausted', 'fatigued'], ['energetic', 'refreshed']],
  ['yield', 'নতি স্বীকার করা', ['surrender', 'submit'], ['resist', 'withstand']],
].map(([word, bn, syn, ant]) => ({ word, bn, syn, ant }));

// A word appearing in two entries could make a "wrong" option actually correct.
{
  const seen = new Set();
  for (const w of WORDS) {
    for (const x of [w.word, ...w.syn, ...w.ant]) {
      if (seen.has(x)) throw new Error(`english.js: duplicate vocabulary entry "${x}"`);
      seen.add(x);
    }
  }
}

function synAntQ() {
  const entry = pick(WORDS);
  const isSyn = ri(0, 1) === 0;
  const variant = pick(isSyn ? ['Choose the word most similar in meaning to', 'Select the synonym of'] : ['Choose the word opposite in meaning to', 'Select the antonym of']);
  const good = pick(isSyn ? entry.syn : entry.ant);
  const trapWord = pick(isSyn ? entry.ant : entry.syn);
  const taken = new Set([entry.word, ...entry.syn, ...entry.ant]);
  const others = WORDS.filter((w) => w !== entry).flatMap((w) => [...w.syn, ...w.ant]).filter((w) => !taken.has(w));
  const rest = sample(others, 2);
  return build({
    topic: 'synonyms_antonyms', subtopic: isSyn ? 'synonyms' : 'antonyms', tags: ['vocabulary', isSyn ? 'synonym' : 'antonym'], difficulty: ri(2, 4), time: 20,
    stem: T(`${variant}: "${entry.word}"`, `"${entry.word}" শব্দটির ${isSyn ? 'সমার্থক (Synonym)' : 'বিপরীতার্থক (Antonym)'} শব্দ কোনটি?`),
    correct: S(good),
    wrong: [{ ...S(trapWord), trap: isSyn ? T(`"${trapWord}" is an antonym (opposite), not a synonym.`, `"${trapWord}" বিপরীতার্থক শব্দ, সমার্থক নয়।`) : T(`"${trapWord}" is a synonym (same meaning), not an antonym.`, `"${trapWord}" সমার্থক শব্দ, বিপরীতার্থক নয়।`) }, ...rest.map(S)],
    steps: [
      T(`"${entry.word}" means "${entry.bn}". Synonyms: ${entry.syn.join(', ')}. Antonyms: ${entry.ant.join(', ')}.`, `"${entry.word}" অর্থ "${entry.bn}"। সমার্থক: ${entry.syn.join(', ')}। বিপরীতার্থক: ${entry.ant.join(', ')}।`),
      T(`So the answer is "${good}".`, `সুতরাং উত্তর "${good}"।`),
    ],
    shortcut: T('Check whether the question asks for the same or the opposite meaning before choosing.', 'উত্তর বাছার আগে দেখো প্রশ্নে সমার্থক না বিপরীতার্থক চাওয়া হয়েছে।'),
  });
}

// ---------------------------------------------------------------- One Word Substitution (এক কথায় প্রকাশ)
const OWS = [
  ['A person who loves mankind', 'philanthropist', 'মানবপ্রেমী/দানশীল ব্যক্তি'],
  ['Study of birds', 'ornithology', 'পাখি সম্পর্কিত বিদ্যা'],
  ['One who knows everything', 'omniscient', 'সর্বজ্ঞ'],
  ['Government by the people', 'democracy', 'জনগণের শাসন'],
  ['Fear of heights', 'acrophobia', 'উচ্চতাভীতি'],
  ['A person who walks in sleep', 'somnambulist', 'ঘুমের মধ্যে হাঁটে যে'],
  ['Murder of a king', 'regicide', 'রাজহত্যা'],
  ["Killing of one's brother", 'fratricide', 'ভ্রাতৃহত্যা'],
  ['Life story of a person written by himself', 'autobiography', 'আত্মজীবনী'],
  ['Life story of a person written by another', 'biography', 'জীবনী'],
  ['One who eats human flesh', 'cannibal', 'নরখাদক'],
  ['That which cannot be read', 'illegible', 'অপাঠ্য'],
  ['That which cannot be heard', 'inaudible', 'শ্রুতির অগোচর'],
  ['One who is present everywhere', 'omnipresent', 'সর্বব্যাপী'],
  ['Lasting for a very short time', 'ephemeral', 'ক্ষণস্থায়ী'],
  ['One who does not believe in God', 'atheist', 'নাস্তিক'],
  ['A place where birds are kept', 'aviary', 'পাখিশালা'],
  ['A place where bees are kept', 'apiary', 'মৌমাছির খামার'],
  ['A collection of poems', 'anthology', 'কাব্যসংকলন'],
  ['A speech delivered without preparation', 'extempore', 'প্রস্তুতিহীন বক্তৃতা'],
  ['One who can use both hands equally well', 'ambidextrous', 'দুই হাতে সমান দক্ষ'],
  ['A lover of books', 'bibliophile', 'গ্রন্থপ্রেমী'],
  ['Fear of water', 'hydrophobia', 'জলাতঙ্ক'],
  ['Government by one person', 'autocracy', 'স্বৈরতন্ত্র'],
  ['Rule by the rich', 'plutocracy', 'ধনিকতন্ত্র'],
  ['Government by a small group of people', 'oligarchy', 'গোষ্ঠীতন্ত্র'],
  ['A medicine that cures all diseases', 'panacea', 'সর্বরোগহর ওষুধ'],
  ['One who is new to a field', 'novice', 'নবিশ'],
  ['One who can speak two languages', 'bilingual', 'দ্বিভাষী'],
  ['One who looks at the bright side of things', 'optimist', 'আশাবাদী'],
  ['One who always expects the worst', 'pessimist', 'নিরাশাবাদী'],
  ['A doctor who treats children', 'paediatrician', 'শিশুরোগ বিশেষজ্ঞ'],
  ['Study of ancient remains', 'archaeology', 'প্রত্নতত্ত্ব'],
  ['Study of human beings and their origins', 'anthropology', 'নৃবিজ্ঞান'],
  ['Study of insects', 'entomology', 'কীটতত্ত্ব'],
  ['Study of the earth', 'geology', 'ভূবিজ্ঞান'],
  ['A place where grain is stored', 'granary', 'শস্যাগার'],
  ['A disease that spreads quickly over a large area', 'epidemic', 'মহামারি'],
  ['Lasting forever', 'eternal', 'চিরন্তন'],
  ['A woman whose husband has died', 'widow', 'বিধবা'],
  ['One who cannot pay his debts', 'insolvent', 'দেউলিয়া'],
  ['A place where coins are made', 'mint', 'টাকশাল'],
  ['Violation of something sacred', 'sacrilege', 'পবিত্র বস্তুর অবমাননা'],
  ['One who is fond of fine food', 'gourmet', 'সুখাদ্যরসিক'],
  ['A person who is indifferent to pleasure and pain', 'stoic', 'নির্লিপ্ত ব্যক্তি'],
  ['A government run by officials', 'bureaucracy', 'আমলাতন্ত্র'],
  ['A remedy for poison', 'antidote', 'প্রতিষেধক'],
].map(([en, word, bn]) => ({ en, word, bn }));

function owsQ() {
  const kind = ri(0, 2);
  const d = pick(OWS);
  if (kind < 2) {
    const q = kind === 0 ? 'Choose the one word that can substitute the expression' : 'Select the single word for';
    const { correct, wrong } = textOptions(S(d.word), OWS.map((x) => S(x.word)));
    return build({
      topic: 'one_word_substitution', subtopic: 'word_for_phrase', tags: ['vocabulary', 'one_word'], difficulty: ri(2, 4), time: 20,
      stem: T(`${q}: "${d.en}"`, `নিচের ব্যাখ্যাটির জন্য এক কথায় প্রকাশ (One Word Substitution) কোনটি?\n"${d.en}" (${d.bn})`),
      correct, wrong,
      steps: [T(`"${d.en}" is expressed in one word as "${d.word}".`, `"${d.bn}" এক কথায় "${d.word}"।`)],
      shortcut: T('Learn Greek/Latin roots: -cide (killing), -phobia (fear), -ology (study), -cracy (rule).', 'গ্রিক/ল্যাটিন মূল শিখো: -cide (হত্যা), -phobia (ভয়), -ology (বিদ্যা), -cracy (শাসন)।'),
    });
  }
  const { correct, wrong } = textOptions(T(d.en, d.bn), OWS.map((x) => T(x.en, x.bn)));
  return build({
    topic: 'one_word_substitution', subtopic: 'phrase_for_word', tags: ['vocabulary', 'one_word'], difficulty: ri(2, 4), time: 25,
    stem: T(`"${d.word}" means:`, `"${d.word}" শব্দটির অর্থ কী?`),
    correct, wrong,
    steps: [T(`"${d.word}" means "${d.en}".`, `"${d.word}" অর্থ "${d.bn}"।`)],
    shortcut: T('Split the word into root and suffix to guess its meaning.', 'শব্দটিকে মূল ও প্রত্যয়ে ভেঙে অর্থ অনুমান করো।'),
  });
}

module.exports = {
  subject: 'english',
  topics: [
    { topic: 'error_detection', weight: 5, gens: errTemplates.map(errorDetectionGen) },
    { topic: 'prepositions', weight: 4, gens: [prepositionQ] },
    { topic: 'subject_verb_agreement', weight: 4, gens: [svaQ] },
    { topic: 'idioms_phrases', weight: 4, gens: [idiomQ] },
    { topic: 'synonyms_antonyms', weight: 4, gens: [synAntQ] },
    { topic: 'one_word_substitution', weight: 3, gens: [owsQ] },
  ],
};
