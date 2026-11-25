'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'english',
  topic: 'prepositions',
  patterns: [
    {
      key: 'time_at_on_in',
      emoji: '📅',
      name: t('Time: at, on or in', 'সময়: at, on না in'),
      spot: t(
        'A blank comes before a clock time, a day, a date, a month or a year, and the options are at / on / in.',
        'ঘড়ির সময়, দিন, তারিখ, মাস বা বছরের আগে শূন্যস্থান, আর option-গুলো at / on / in।',
      ),
      method: [
        t('AT for a point of time: at 5 o\'clock, at noon, at midnight, at dawn, at night.', 'কোনো মুহূর্তের জন্য AT: at 5 o\'clock, at noon, at midnight, at dawn, at night।'),
        t('ON for a day or a date: on Monday, on 15 August, on New Year\'s Day.', 'দিন বা তারিখের জন্য ON: on Monday, on 15 August, on New Year\'s Day।'),
        t('IN for a month, season, year or part of a day: in June, in 2024, in summer, in the morning.', 'মাস, ঋতু, বছর বা দিনের অংশের জন্য IN: in June, in 2024, in summer, in the morning।'),
        t('Point < day < period: the smaller the time, the smaller the word — at, then on, then in.', 'মুহূর্ত < দিন < সময়কাল: সময় যত ছোট, শব্দ তত ছোট — at, তারপর on, তারপর in।'),
      ],
      example: {
        question: t('Fill in the blanks: "The match starts ___ 3 pm ___ Sunday." (a) at, on (b) in, on (c) at, in (d) on, at', 'শূন্যস্থান পূরণ করো: "The match starts ___ 3 pm ___ Sunday." (a) at, on (b) in, on (c) at, in (d) on, at'),
        steps: [
          t('"3 pm" is a point of time (clock time). A point takes "at".', '"3 pm" ঘড়ির সময়, একটি মুহূর্ত। মুহূর্তের আগে "at" বসে।'),
          t('"Sunday" is a day. A day takes "on".', '"Sunday" একটি দিন। দিনের আগে "on" বসে।'),
        ],
        answer: t('(a) at, on — "The match starts at 3 pm on Sunday."', 'উত্তর: (a) at, on — "The match starts at 3 pm on Sunday."'),
      },
      tryIt: {
        question: t('Fill in the blank: "I was born ___ 2001."', 'শূন্যস্থান পূরণ করো: "I was born ___ 2001."'),
        options: [t('at', 'at'), t('on', 'on'), t('for', 'for'), t('in', 'in')],
        correct: 3,
        explanation: [
          t('"2001" is a year — a long period of time.', '"2001" একটি বছর — লম্বা সময়কাল।'),
          t('A period takes "in": "I was born in 2001." "At" is for clock time and "on" is for days.', 'সময়কালের আগে "in" বসে: "I was born in 2001." "At" ঘড়ির সময়ের জন্য, "on" দিনের জন্য।'),
        ],
      },
    },
    {
      key: 'place_at_on_in',
      emoji: '📍',
      name: t('Place: at, on or in', 'স্থান: at, on না in'),
      spot: t(
        'A blank comes before a place, a building, a town or a vehicle, and the options are at / on / in.',
        'কোনো জায়গা, বাড়ি, শহর বা যানবাহনের আগে শূন্যস্থান, আর option-গুলো at / on / in।',
      ),
      method: [
        t('AT for a point or an address: at the gate, at home, at school, at 12 Park Street.', 'কোনো বিন্দু বা ঠিকানার জন্য AT: at the gate, at home, at school, at 12 Park Street।'),
        t('ON for a surface and for public transport: on the table, on the wall, on the bus, on the train.', 'কোনো তল আর গণপরিবহনের জন্য ON: on the table, on the wall, on the bus, on the train।'),
        t('IN for the inside of a closed space, a town or a country: in the room, in the bag, in Kolkata, in India.', 'বন্ধ জায়গা, শহর বা দেশের ভেতরের জন্য IN: in the room, in the bag, in Kolkata, in India।'),
        t('Transport trap: on the bus / train / plane, but in the car / taxi / auto.', 'যানবাহনের ফাঁদ: on the bus / train / plane, কিন্তু in the car / taxi / auto।'),
      ],
      example: {
        question: t('Fill in the blank: "She is travelling ___ the bus." (a) in (b) on (c) at (d) by', 'শূন্যস্থান পূরণ করো: "She is travelling ___ the bus." (a) in (b) on (c) at (d) by'),
        steps: [
          t('A bus is public transport.', 'বাস হল গণপরিবহন।'),
          t('Public transport (bus, train, plane, ship) takes "on".', 'গণপরিবহনের (বাস, ট্রেন, প্লেন, জাহাজ) আগে "on" বসে।'),
        ],
        answer: t('(b) on — "She is travelling on the bus."', 'উত্তর: (b) on — "She is travelling on the bus."'),
      },
      tryIt: {
        question: t('Fill in the blank: "The keys are ___ the bag."', 'শূন্যস্থান পূরণ করো: "The keys are ___ the bag."'),
        options: [t('on', 'on'), t('at', 'at'), t('by', 'by'), t('in', 'in')],
        correct: 3,
        explanation: [
          t('The keys are inside a closed thing (the bag).', 'চাবিগুলো একটা বন্ধ জিনিসের (ব্যাগের) ভেতরে আছে।'),
          t('Inside a closed space takes "in": "The keys are in the bag."', 'বন্ধ জায়গার ভেতরে "in" বসে: "The keys are in the bag."'),
        ],
      },
    },
    {
      key: 'movement_into_onto',
      emoji: '➡️',
      name: t('Movement: into, onto, towards, across, through', 'চলন: into, onto, towards, across, through'),
      spot: t(
        'A blank comes before a place that someone or something moves into, onto, across or through.',
        'কোনো জায়গার আগে শূন্যস্থান, যার ভেতরে, উপরে, আড়াআড়ি বা ভেতর দিয়ে কেউ বা কিছু চলছে।',
      ),
      method: [
        t('INTO is movement to the inside; IN is already inside: jumped into the pond, swims in the pond.', 'INTO হল ভেতরের দিকে চলন; IN হল ইতিমধ্যে ভেতরে: jumped into the pond, swims in the pond।'),
        t('ONTO is movement to the top of a surface; ON is resting on it: jumped onto the roof, lies on the roof.', 'ONTO হল তলের উপরে ওঠা; ON হল তলের উপর থাকা: jumped onto the roof, lies on the roof।'),
        t('TO is direction; TOWARDS is the direction without arrival; ACROSS is one side to the other; THROUGH is one end to the other, inside.', 'TO হল দিক; TOWARDS হল না পৌঁছে দিক; ACROSS হল এক পাশ থেকে অন্য পাশ; THROUGH হল ভেতর দিয়ে এক প্রান্ত থেকে অন্য প্রান্ত।'),
      ],
      example: {
        question: t('Fill in the blank: "The frog jumped ___ the pond." (a) in (b) into (c) onto (d) at', 'শূন্যস্থান পূরণ করো: "The frog jumped ___ the pond." (a) in (b) into (c) onto (d) at'),
        steps: [
          t('The frog moved from outside to inside the water.', 'ব্যাঙটি জলের বাইরে থেকে ভেতরে গেল।'),
          t('Movement to the inside takes "into". "In" would mean it was already inside.', 'ভেতরের দিকে চলনে "into" বসে। "In" মানে ব্যাঙটি আগে থেকেই জলের ভেতরে ছিল।'),
        ],
        answer: t('(b) into — "The frog jumped into the pond."', 'উত্তর: (b) into — "The frog jumped into the pond."'),
      },
      tryIt: {
        question: t('Fill in the blank: "The cat jumped ___ the roof."', 'শূন্যস্থান পূরণ করো: "The cat jumped ___ the roof."'),
        options: [t('in', 'in'), t('on', 'on'), t('into', 'into'), t('onto', 'onto')],
        correct: 3,
        explanation: [
          t('The cat moved to the top of a surface (the roof).', 'বিড়ালটি একটি তলের (ছাদের) উপরে উঠল।'),
          t('Movement to the top of a surface takes "onto": "The cat jumped onto the roof."', 'তলের উপরে ওঠায় "onto" বসে: "The cat jumped onto the roof."'),
        ],
      },
    },
    {
      key: 'fixed_pairs',
      emoji: '🔗',
      name: t('Fixed pairs: the word before the blank decides', 'নির্দিষ্ট জোড়া: ফাঁকার আগের শব্দই উত্তর ঠিক করে'),
      spot: t(
        'A blank comes just after an adjective, a verb or a noun (good ___, depend ___, reason ___), and the options are prepositions.',
        'কোনো adjective, verb বা noun-এর ঠিক পরে শূন্যস্থান (good ___, depend ___, reason ___), আর option-গুলো preposition।',
      ),
      method: [
        t('Read the word before the blank first. If it is a table word, its fixed preposition is the answer.', 'আগে ফাঁকার আগের শব্দটি পড়ো। সেটি তালিকার শব্দ হলে তার নির্দিষ্ট preposition-ই উত্তর।'),
        t('Adjectives: good at, interested in, afraid of, famous for, married to, different from.', 'Adjective-এর জোড়া: good at, interested in, afraid of, famous for, married to, different from।'),
        t('Verbs: depend on, believe in, listen to, wait for, suffer from, consist of, rely on.', 'Verb-এর জোড়া: depend on, believe in, listen to, wait for, suffer from, consist of, rely on।'),
        t('Nouns: reason for, key to, access to, attention to, increase in, difference between.', 'Noun-এর জোড়া: reason for, key to, access to, attention to, increase in, difference between।'),
        t('Do not translate from Bengali and do not guess by logic; learn each pair whole.', 'বাংলা থেকে অনুবাদ করো না, যুক্তি দিয়ে আন্দাজ করো না; প্রতিটি জোড়া পুরো শেখো।'),
      ],
      example: {
        question: t('Fill in the blank: "She is interested ___ music." (a) in (b) for (c) at (d) with', 'শূন্যস্থান পূরণ করো: "She is interested ___ music." (a) in (b) for (c) at (d) with'),
        steps: [
          t('"Interested" is an adjective with a fixed preposition.', '"Interested" একটি adjective, যার একটি নির্দিষ্ট preposition আছে।'),
          t('The fixed pair is "interested in".', 'নির্দিষ্ট জোড়াটি হল "interested in"।'),
        ],
        answer: t('(a) in — "She is interested in music."', 'উত্তর: (a) in — "She is interested in music."'),
      },
      tryIt: {
        question: t('Fill in the blank: "Hard work is the key ___ success."', 'শূন্যস্থান পূরণ করো: "Hard work is the key ___ success."'),
        options: [t('for', 'for'), t('to', 'to'), t('of', 'of'), t('in', 'in')],
        correct: 1,
        explanation: [
          t('"Key" is a noun with a fixed preposition.', '"Key" একটি noun, যার একটি নির্দিষ্ট preposition আছে।'),
          t('The fixed pair is "key to": "Hard work is the key to success."', 'নির্দিষ্ট জোড়াটি হল "key to": "Hard work is the key to success."'),
        ],
      },
    },
    {
      key: 'adjective_pairs',
      emoji: '😊',
      name: t('Adjective + preposition pairs', 'Adjective + preposition-এর জোড়া'),
      spot: t(
        'A blank comes after an adjective (good, interested, afraid, proud) and before a noun.',
        'কোনো adjective-এর (good, interested, afraid, proud) পরে আর noun-এর আগে শূন্যস্থান।',
      ),
      method: [
        t('Good AT (skill), interested IN, afraid OF, fond OF, proud OF, famous FOR.', 'Good AT (দক্ষতা), interested IN, afraid OF, fond OF, proud OF, famous FOR।'),
        t('Surprised AT, sorry FOR, worried ABOUT, aware OF, capable OF, full OF.', 'আরও জোড়া: surprised AT, sorry FOR, worried ABOUT, aware OF, capable OF, full OF।'),
        t('Different FROM, married TO, known TO, senior TO, addicted TO, responsible FOR.', 'আরও জোড়া: different FROM, married TO, known TO, senior TO, addicted TO, responsible FOR।'),
        t('Angry WITH a person, angry AT a thing. Good AT, never good IN.', 'মানুষের উপর রাগ হলে angry WITH, জিনিসের উপর রাগ হলে angry AT। Good AT, কখনও good IN নয়।'),
      ],
      example: {
        question: t('Fill in the blank: "Darjeeling is famous ___ tea." (a) for (b) of (c) with (d) by', 'শূন্যস্থান পূরণ করো: "Darjeeling is famous ___ tea." (a) for (b) of (c) with (d) by'),
        steps: [
          t('"Famous" is an adjective with a fixed preposition.', '"Famous" একটি adjective, যার একটি নির্দিষ্ট preposition আছে।'),
          t('The fixed pair is "famous for".', 'নির্দিষ্ট জোড়াটি হল "famous for"।'),
        ],
        answer: t('(a) for — "Darjeeling is famous for tea."', 'উত্তর: (a) for — "Darjeeling is famous for tea."'),
      },
      tryIt: {
        question: t('Fill in the blank: "She is good ___ maths."', 'শূন্যস্থান পূরণ করো: "She is good ___ maths."'),
        options: [t('in', 'in'), t('for', 'for'), t('at', 'at'), t('with', 'with')],
        correct: 2,
        explanation: [
          t('"Good" takes "at" when it means skill.', '"Good" দক্ষতা বোঝালে "at" নেয়।'),
          t('"Good in maths" is wrong English; the pair is "good at": "She is good at maths."', '"Good in maths" ভুল ইংরেজি; জোড়াটি হল "good at": "She is good at maths."'),
        ],
      },
    },
    {
      key: 'verb_pairs',
      emoji: '🏃',
      name: t('Verb + preposition pairs', 'Verb + preposition-এর জোড়া'),
      spot: t(
        'A blank comes after a verb (depend, believe, listen, look) and the options are prepositions.',
        'কোনো verb-এর (depend, believe, listen, look) পরে শূন্যস্থান, আর option-গুলো preposition।',
      ),
      method: [
        t('Depend ON, believe IN, listen TO, wait FOR, rely ON, belong TO, refer TO.', 'মূল জোড়া: depend ON, believe IN, listen TO, wait FOR, rely ON, belong TO, refer TO।'),
        t('Look AT (see), look AFTER (take care of), look FOR (search) — the preposition changes the meaning.', 'Look AT (দেখা), look AFTER (দেখাশোনা করা), look FOR (খোঁজা) — preposition বদলালে অর্থ বদলে যায়।'),
        t('Suffer FROM, deal WITH, consist OF, complain ABOUT, remind OF, prevent FROM, object TO.', 'আরও জোড়া: suffer FROM, deal WITH, consist OF, complain ABOUT, remind OF, prevent FROM, object TO।'),
        t('Agree WITH a person, agree TO a plan, agree ON a date. Apologise TO a person FOR a mistake.', 'মানুষের সঙ্গে agree WITH, পরিকল্পনায় agree TO, তারিখে agree ON। মানুষের কাছে apologise TO, ভুলের জন্য apologise FOR।'),
      ],
      example: {
        question: t('Fill in the blank: "The child depends ___ his mother." (a) in (b) on (c) to (d) with', 'শূন্যস্থান পূরণ করো: "The child depends ___ his mother." (a) in (b) on (c) to (d) with'),
        steps: [
          t('"Depend" is a verb with a fixed preposition.', '"Depend" একটি verb, যার একটি নির্দিষ্ট preposition আছে।'),
          t('The fixed pair is "depend on".', 'নির্দিষ্ট জোড়াটি হল "depend on"।'),
        ],
        answer: t('(b) on — "The child depends on his mother."', 'উত্তর: (b) on — "The child depends on his mother."'),
      },
      tryIt: {
        question: t('Fill in the blank: "Please refer ___ page 10."', 'শূন্যস্থান পূরণ করো: "Please refer ___ page 10."'),
        options: [t('to', 'to'), t('at', 'at'), t('on', 'on'), t('for', 'for')],
        correct: 0,
        explanation: [
          t('"Refer" is a verb with a fixed preposition.', '"Refer" একটি verb, যার একটি নির্দিষ্ট preposition আছে।'),
          t('The fixed pair is "refer to": "Please refer to page 10."', 'নির্দিষ্ট জোড়াটি হল "refer to": "Please refer to page 10."'),
        ],
      },
    },
    {
      key: 'noun_pairs',
      emoji: '📦',
      name: t('Noun + preposition pairs', 'Noun + preposition-এর জোড়া'),
      spot: t(
        'A blank comes after a noun (reason, answer, key, access) and the options are prepositions.',
        'কোনো noun-এর (reason, answer, key, access) পরে শূন্যস্থান, আর option-গুলো preposition।',
      ),
      method: [
        t('Reason FOR, cause OF, answer TO, key TO, invitation TO, fear OF, love FOR.', 'মূল জোড়া: reason FOR, cause OF, answer TO, key TO, invitation TO, fear OF, love FOR।'),
        t('Need FOR, demand FOR, relationship WITH, difference BETWEEN, example OF, result OF.', 'আরও জোড়া: need FOR, demand FOR, relationship WITH, difference BETWEEN, example OF, result OF।'),
        t('Increase IN, interest IN, advantage OF, access TO, attention TO, excuse FOR, request FOR.', 'আরও জোড়া: increase IN, interest IN, advantage OF, access TO, attention TO, excuse FOR, request FOR।'),
        t('Noun pairs are the fastest marks in fill in the blanks: read the noun, and the pair answers at once.', 'Noun-এর জোড়া fill in the blanks-এ সবচেয়ে সহজ নম্বর: noun-টি পড়ো, জোড়াটিই সঙ্গে সঙ্গে উত্তর দেবে।'),
      ],
      example: {
        question: t('Fill in the blank: "What is the reason ___ your absence?" (a) of (b) for (c) to (d) with', 'শূন্যস্থান পূরণ করো: "What is the reason ___ your absence?" (a) of (b) for (c) to (d) with'),
        steps: [
          t('"Reason" is a noun with a fixed preposition.', '"Reason" একটি noun, যার একটি নির্দিষ্ট preposition আছে।'),
          t('The fixed pair is "reason for".', 'নির্দিষ্ট জোড়াটি হল "reason for"।'),
        ],
        answer: t('(b) for — "What is the reason for your absence?"', 'উত্তর: (b) for — "What is the reason for your absence?"'),
      },
      tryIt: {
        question: t('Fill in the blank: "Students have access ___ the library."', 'শূন্যস্থান পূরণ করো: "Students have access ___ the library."'),
        options: [t('for', 'for'), t('of', 'of'), t('in', 'in'), t('to', 'to')],
        correct: 3,
        explanation: [
          t('"Access" is a noun with a fixed preposition.', '"Access" একটি noun, যার একটি নির্দিষ্ট preposition আছে।'),
          t('The fixed pair is "access to": "Students have access to the library."', 'নির্দিষ্ট জোড়াটি হল "access to": "Students have access to the library."'),
        ],
      },
    },
    {
      key: 'lookalike_pairs',
      emoji: '⚖️',
      name: t('Look-alike pairs: between/among, since/for, by/with', 'দেখতে একরকম জোড়া: between/among, since/for, by/with'),
      spot: t(
        'The options are two similar prepositions (between/among, beside/besides, since/for, by/with).',
        'Option-গুলো দুটি দেখতে একরকম preposition (between/among, beside/besides, since/for, by/with)।',
      ),
      method: [
        t('BETWEEN is for two; AMONG is for more than two.', 'BETWEEN দুইয়ের জন্য; AMONG দুইয়ের বেশির জন্য।'),
        t('BESIDE means next to; BESIDES means in addition to, or except.', 'BESIDE মানে পাশে; BESIDES মানে এছাড়াও, বা ছাড়া।'),
        t('SINCE + a point in time, with the perfect tense; FOR + a period of time.', 'SINCE + সময়ের বিন্দু, perfect tense-এর সঙ্গে; FOR + সময়কাল।'),
        t('BY is the doer (passive) or a deadline; WITH is the tool, or together.', 'BY হল যে করেছে (passive-এ) বা শেষ সময়সীমা; WITH হল যন্ত্র, বা একসঙ্গে।'),
      ],
      example: {
        question: t('Fill in the blank: "The sweets were shared ___ the ten children." (a) between (b) among (c) beside (d) with', 'শূন্যস্থান পূরণ করো: "The sweets were shared ___ the ten children." (a) between (b) among (c) beside (d) with'),
        steps: [
          t('Count the children: ten — more than two.', 'বাচ্চা গোনো: দশজন — দুইয়ের বেশি।'),
          t('"Between" is for two; "among" is for more than two.', '"Between" দুইয়ের জন্য; "among" দুইয়ের বেশির জন্য।'),
        ],
        answer: t('(b) among — "The sweets were shared among the ten children."', 'উত্তর: (b) among — "The sweets were shared among the ten children."'),
      },
      tryIt: {
        question: t('Fill in the blank: "I have lived in this town ___ 2019."', 'শূন্যস্থান পূরণ করো: "I have lived in this town ___ 2019."'),
        options: [t('for', 'for'), t('since', 'since'), t('from', 'from'), t('at', 'at')],
        correct: 1,
        explanation: [
          t('"2019" is a point in time — when it started.', '"2019" সময়ের একটি বিন্দু — কখন শুরু হয়েছে।'),
          t('"Since" goes with a point and the perfect tense ("have lived"); "for" goes with a period ("for five years").', '"Since" বিন্দুর সঙ্গে ও perfect tense-এর ("have lived") সঙ্গে বসে; "for" সময়কালের সঙ্গে বসে ("for five years")।'),
        ],
      },
    },
    {
      key: 'no_preposition',
      emoji: '🚫',
      name: t('Spot the extra preposition', 'বাড়তি preposition খুঁজে বের করো'),
      spot: t(
        'In error spotting, a part of the sentence has a preposition after a verb that needs none (discussed about, comprise of).',
        'Error spotting-এ বাক্যের কোনো অংশে এমন verb-এর পরে preposition আছে, যার preposition লাগে না (discussed about, comprise of)।',
      ),
      method: [
        t('DISCUSS, DESCRIBE, EMPHASISE, COMPRISE, REACH, RESEMBLE, AWAIT and RETURN take no preposition.', 'DISCUSS, DESCRIBE, EMPHASISE, COMPRISE, REACH, RESEMBLE, AWAIT আর RETURN-এর preposition লাগে না।'),
        t('ENTER + a place takes no preposition: "enter the room". ENTER INTO is only for an agreement or contract.', 'ENTER + জায়গার preposition লাগে না: "enter the room"। ENTER INTO শুধু চুক্তির ক্ষেত্রে।'),
        t('The verb already contains the meaning: "discuss" means "talk about", so "discuss about" repeats it.', 'Verb-এর মধ্যেই অর্থ আছে: "discuss" মানেই "talk about", তাই "discuss about" অর্থ দুবার বলা।'),
        t('DIFFERENT FROM is the exam standard; "different than" is American English and is marked wrong.', 'DIFFERENT FROM পরীক্ষার মান; "different than" আমেরিকান ইংরেজি, পরীক্ষায় ভুল ধরা হয়।'),
      ],
      example: {
        question: t('Find the part with the error: "(A) We discussed about (B) the problem (C) for an hour. (D) No error"', 'কোন অংশে ভুল খোঁজো: "(A) We discussed about (B) the problem (C) for an hour. (D) No error"'),
        steps: [
          t('"Discuss" already means "talk about".', '"Discuss" মানেই "talk about"।'),
          t('Adding "about" repeats the meaning — it is an extra word.', '"About" যোগ করলে অর্থ দুবার বলা হয় — এটি বাড়তি শব্দ।'),
        ],
        answer: t('(A): "We discussed the problem for an hour."', 'উত্তর: (A): "We discussed the problem for an hour."'),
      },
      tryIt: {
        question: t('Choose the correct sentence.', 'সঠিক বাক্যটি বাছো।'),
        options: [
          t('He entered into the room.', 'He entered into the room.'),
          t('He entered the room.', 'He entered the room.'),
          t('He entered to the room.', 'He entered to the room.'),
          t('He entered in the room.', 'He entered in the room.'),
        ],
        correct: 1,
        explanation: [
          t('"Enter" + a place takes no preposition.', 'জায়গার আগে "enter"-এর কোনো preposition লাগে না।'),
          t('"Enter into" is correct only for an agreement or contract: "enter into an agreement".', '"Enter into" ঠিক শুধু চুক্তির ক্ষেত্রে: "enter into an agreement"।'),
        ],
      },
    },
  ],
};
