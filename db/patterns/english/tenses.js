'use strict';

const t = (en, bn) => ({ en, bn });
const opts = (...s) => s.map((x) => t(x, x));

module.exports = {
  subject: 'english',
  topic: 'tenses',
  patterns: [
    {
      key: 'finished_time_simple_past',
      emoji: '⏳',
      name: t('Finished time words ask for the simple past', 'শেষ হয়ে যাওয়া সময়ের শব্দ মানে simple past'),
      spot: t(
        'The sentence has yesterday, last week, ago, in 2019 or "when I was young", and the options mix simple past with present perfect.',
        'বাক্যে yesterday, last week, ago, in 2019 বা "when I was young" আছে, আর option-এ simple past ও present perfect মেশানো।',
      ),
      method: [
        t('Spot the time word and ask: is the time finished and named?', 'সময়ের শব্দটা খুঁজে ভাবো: সময়টা কি শেষ হয়ে গেছে এবং নির্দিষ্ট করে বলা?'),
        t('A finished, named time takes simple past (V2): I met him two days ago.', 'শেষ হওয়া নির্দিষ্ট সময়ে simple past (V2): I met him two days ago।'),
        t('Present perfect never sits with ago, yesterday or last week.', 'ago, yesterday বা last week-এর সঙ্গে present perfect কখনও বসে না।'),
      ],
      example: {
        question: t('Choose the correct sentence: (a) I have met him two days ago. (b) I met him two days ago.', 'সঠিক বাক্য বাছো: (a) I have met him two days ago. (b) I met him two days ago.'),
        steps: [
          t('"Ago" names a finished time in the past.', '"Ago" অতীতের একটা শেষ হয়ে যাওয়া সময় বোঝায়।'),
          t('So the simple past is needed; present perfect cannot be used with "ago".', 'তাই simple past লাগবে; "ago"-এর সঙ্গে present perfect চলে না।'),
        ],
        answer: t('(b) I met him two days ago.', 'উত্তর: (b) I met him two days ago.'),
      },
      tryIt: {
        question: t('Fill in the blank: "They ___ cricket yesterday evening."', 'শূন্যস্থান পূরণ করো: "They ___ cricket yesterday evening."'),
        options: opts('have played', 'played', 'are playing', 'will play'),
        correct: 1,
        explanation: [
          t('"Yesterday evening" is a finished time in the past.', '"Yesterday evening" অতীতের একটা শেষ হয়ে যাওয়া সময়।'),
          t('A finished time takes the simple past: "They played cricket yesterday evening."', 'শেষ হওয়া সময়ে simple past: "They played cricket yesterday evening."'),
        ],
      },
    },
    {
      key: 'since_for_present_perfect',
      emoji: '📅',
      name: t('Since and for ask for the present perfect', 'Since আর for মানে present perfect'),
      spot: t(
        'The sentence has since + a starting point or for + a length of time, and the action continues up to now.',
        'বাক্যে since + শুরুর সময় বা for + সময়ের দৈর্ঘ্য আছে, আর কাজটা এখন পর্যন্ত চলছে।',
      ),
      method: [
        t('Since + starting point (since 2015, since Monday); for + length of time (for ten years, for two hours).', 'Since + শুরুর বিন্দু (since 2015, since Monday); for + সময়ের দৈর্ঘ্য (for ten years, for two hours)।'),
        t('Both ask for a perfect tense: has/have + V3, or has/have been + V-ing.', 'দুটোতেই perfect tense লাগে: has/have + V3, বা has/have been + V-ing।'),
        t('Choose have for I/you/we/they and has for he/she/it.', 'I/you/we/they-এর সঙ্গে have, he/she/it-এর সঙ্গে has।'),
      ],
      example: {
        question: t('Fill in the blank: "He ___ in Siliguri since 2015." (lives / lived / has lived)', 'শূন্যস্থান পূরণ করো: "He ___ in Siliguri since 2015." (lives / lived / has lived)'),
        steps: [
          t('"Since 2015" is a starting point that continues till now.', '"Since 2015" এমন একটা শুরুর সময় যা এখন পর্যন্ত চলছে।'),
          t('"Lives" and "lived" are tempting, but "since" needs a perfect tense.', '"Lives" আর "lived" লোভ দেখায়, কিন্তু "since"-এর সঙ্গে perfect tense লাগে।'),
        ],
        answer: t('has lived — "He has lived in Siliguri since 2015."', 'উত্তর: has lived — "He has lived in Siliguri since 2015."'),
      },
      tryIt: {
        question: t('Fill in the blank: "She ___ ill since Monday."', 'শূন্যস্থান পূরণ করো: "She ___ ill since Monday."'),
        options: opts('is', 'was', 'has been', 'will be'),
        correct: 2,
        explanation: [
          t('"Since Monday" is a starting point, and the illness continues up to now.', '"Since Monday" একটা শুরুর বিন্দু, আর অসুস্থতা এখন পর্যন্ত চলছে।'),
          t('That needs the present perfect, and "she" takes "has": "She has been ill since Monday."', 'এর জন্য present perfect লাগে, আর "she"-এর সঙ্গে "has": "She has been ill since Monday."'),
        ],
      },
    },
    {
      key: 'stative_verbs_no_ing',
      emoji: '🧠',
      name: t('Stative verbs do not take -ing', 'Stative verb-এ -ing বসে না'),
      spot: t(
        'The verb is know, understand, believe, like, love, want, need, own or belong, and one option is in the continuous form.',
        'Verb-টা know, understand, believe, like, love, want, need, own বা belong, আর একটা option continuous রূপে।',
      ),
      method: [
        t('Ask: is this a state (a condition) or an action in progress?', 'ভাবো: এটা একটা অবস্থা (state) না চলমান কাজ?'),
        t('States such as know, own, like, want, need and belong are normally not used with -ing.', 'know, own, like, want, need, belong-এর মতো state সাধারণত -ing-এর সঙ্গে ব্যবহার হয় না।'),
        t('Use the simple form: I know the answer, She owns a bakery.', 'Simple রূপ বসাও: I know the answer, She owns a bakery।'),
        t('Some verbs have an action meaning too, and then -ing is fine: I am having lunch.', 'কিছু verb-এর কাজের অর্থও আছে, তখন -ing চলে: I am having lunch।'),
      ],
      example: {
        question: t('Spot the error: "I (A) am knowing (B) the answer (C) to this question."', 'ভুল খোঁজো: "I (A) am knowing (B) the answer (C) to this question."'),
        steps: [
          t('"Know" is a stative verb: it shows a state of mind, not an action in progress.', '"Know" stative verb: এটা মনের অবস্থা বোঝায়, চলমান কাজ নয়।'),
          t('Stative verbs do not take -ing. The correct form is "I know the answer".', 'Stative verb-এ -ing বসে না। সঠিক রূপ "I know the answer"।'),
        ],
        answer: t('A ("am knowing" should be "know")', 'উত্তর: A ("am knowing"-এর জায়গায় "know" হবে)'),
      },
      tryIt: {
        question: t('Fill in the blank: "She ___ a bakery in Howrah."', 'শূন্যস্থান পূরণ করো: "She ___ a bakery in Howrah."'),
        options: opts('is owning', 'owns', 'is owned', 'has been owning'),
        correct: 1,
        explanation: [
          t('"Own" is a stative verb, so the continuous forms (is owning, has been owning) are wrong.', '"Own" stative verb, তাই continuous রূপ (is owning, has been owning) ভুল।'),
          t('"Is owned" is passive and changes the meaning. The simple present fits: "She owns a bakery in Howrah."', '"Is owned" passive, অর্থ বদলে যায়। Simple present ঠিক: "She owns a bakery in Howrah."'),
        ],
      },
    },
    {
      key: 'past_perfect_earlier_action',
      emoji: '⏪',
      name: t('Two past actions: the earlier one takes the past perfect', 'দুটো অতীতের কাজ: আগের কাজে past perfect'),
      spot: t(
        'The sentence tells two past events with before, after, when or "by the time", and one verb must show the earlier event.',
        'বাক্যে before, after, when বা "by the time" দিয়ে অতীতের দুটো ঘটনা বলা হয়েছে, আর একটা verb-কে আগের ঘটনা বোঝাতে হবে।',
      ),
      method: [
        t('Decide which action happened first.', 'কোন কাজটা আগে ঘটেছে ঠিক করো।'),
        t('The earlier action takes the past perfect (had + V3); the later action takes the simple past.', 'আগের কাজে past perfect (had + V3); পরের কাজে simple past।'),
        t('Do not use has/have in a story told in the past: "has left" belongs to the present.', 'অতীতের গল্পে has/have বসিও না: "has left" বর্তমানের tense।'),
      ],
      example: {
        question: t('Fill in the blank: "The train ___ before we reached the station." (has left / had left / leaves)', 'শূন্যস্থান পূরণ করো: "The train ___ before we reached the station." (has left / had left / leaves)'),
        steps: [
          t('Two past actions: the train left first, we reached later.', 'অতীতের দুটো কাজ: ট্রেন আগে ছেড়েছে, আমরা পরে পৌঁছেছি।'),
          t('The earlier action takes the past perfect. "Has left" is a present tense.', 'আগের কাজে past perfect। "Has left" বর্তমানের tense।'),
        ],
        answer: t('had left — "The train had left before we reached the station."', 'উত্তর: had left — "The train had left before we reached the station."'),
      },
      tryIt: {
        question: t('Fill in the blank: "When we reached the hall, the meeting ___ already."', 'শূন্যস্থান পূরণ করো: "When we reached the hall, the meeting ___ already."'),
        options: opts('starts', 'has started', 'had started', 'will start'),
        correct: 2,
        explanation: [
          t('Two past events: the meeting started first, then we reached the hall.', 'অতীতের দুটো ঘটনা: সভা আগে শুরু হয়েছে, তারপর আমরা হলে পৌঁছেছি।'),
          t('The earlier event takes the past perfect: "the meeting had started already."', 'আগের ঘটনায় past perfect: "the meeting had started already."'),
        ],
      },
    },
    {
      key: 'present_for_future_in_clauses',
      emoji: '🔮',
      name: t('After if, when, until, as soon as: simple present, not will', 'If, when, until, as soon as-এর পরে will নয়, simple present'),
      spot: t(
        'A future sentence has a time or condition clause starting with if, when, until, as soon as or before.',
        'ভবিষ্যতের বাক্যে if, when, until, as soon as বা before দিয়ে শুরু হওয়া সময় বা শর্তের clause আছে।',
      ),
      method: [
        t('Find the clause that starts with if, when, until, as soon as or before.', 'if, when, until, as soon as বা before দিয়ে শুরু হওয়া clause খোঁজো।'),
        t('In that clause use the simple present, even though the meaning is future.', 'সেই clause-এ অর্থ ভবিষ্যৎ হলেও simple present বসাও।'),
        t('Keep "will" only in the main clause: I will call you as soon as I reach home.', '"Will" শুধু main clause-এ রাখো: I will call you as soon as I reach home।'),
      ],
      example: {
        question: t('Fill in the blank: "If it ___ tomorrow, we will cancel the match." (rains / will rain / would rain)', 'শূন্যস্থান পূরণ করো: "If it ___ tomorrow, we will cancel the match." (rains / will rain / would rain)'),
        steps: [
          t('The "if" clause is about a future condition.', '"If" clause-টা ভবিষ্যতের একটা শর্ত নিয়ে।'),
          t('A condition clause takes the simple present; "will" stays in the main clause.', 'শর্তের clause-এ simple present; "will" থাকে main clause-এ।'),
        ],
        answer: t('rains — "If it rains tomorrow, we will cancel the match."', 'উত্তর: rains — "If it rains tomorrow, we will cancel the match."'),
      },
      tryIt: {
        question: t('Fill in the blank: "I will call you as soon as I ___ home."', 'শূন্যস্থান পূরণ করো: "I will call you as soon as I ___ home."'),
        options: opts('will reach', 'reached', 'would reach', 'reach'),
        correct: 3,
        explanation: [
          t('"As soon as" starts a time clause about the future.', '"As soon as" ভবিষ্যতের একটা সময়ের clause শুরু করে।'),
          t('A time clause takes the simple present, not "will": "I will call you as soon as I reach home."', 'সময়ের clause-এ "will" নয়, simple present: "I will call you as soon as I reach home."'),
        ],
      },
    },
  ],
};
