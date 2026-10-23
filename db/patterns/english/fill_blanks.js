'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'english',
  topic: 'fill_blanks',
  patterns: [
    {
      key: 'fixed_preposition',
      emoji: '🔗',
      name: t('Fixed preposition after a word (fond of, accused of)', 'শব্দের পরে নির্দিষ্ট preposition (fond of, accused of)'),
      spot: t('The blank comes right after an adjective or verb, and all four options are prepositions.', 'শূন্যস্থানটা কোনো adjective বা verb-এর ঠিক পরে, আর চারটে option-ই preposition।'),
      method: [
        t('Look at the word just before the blank; it decides the preposition.', 'শূন্যস্থানের ঠিক আগের শব্দটা দেখো; preposition সেটাই ঠিক করে।'),
        t('Recall the fixed pair: fond of, afraid of, accused of, proud of, good at, interested in, depend on, agree with (a person), agree to (a plan).', 'নির্দিষ্ট জোড়াটা মনে করো: fond of, afraid of, accused of, proud of, good at, interested in, depend on, agree with (মানুষের সঙ্গে), agree to (প্রস্তাবে)।'),
        t('Read the full sentence with your answer to check it sounds natural.', 'উত্তর বসিয়ে গোটা বাক্যটা পড়ে দেখো স্বাভাবিক শোনাচ্ছে কিনা।'),
      ],
      example: {
        question: t('Fill in the blank: "My sister is very fond ___ music." (a) with (b) of (c) for (d) in', 'শূন্যস্থান পূরণ করো: "My sister is very fond ___ music." (a) with (b) of (c) for (d) in'),
        steps: [
          t('The word before the blank is "fond".', 'শূন্যস্থানের আগের শব্দ "fond"।'),
          t('"Fond" always goes with "of" (fond of = liking something).', '"Fond"-এর সঙ্গে সবসময় "of" বসে (fond of = কিছু পছন্দ করা)।'),
        ],
        answer: t('(b) of — "My sister is very fond of music."', 'উত্তর: (b) of — "My sister is very fond of music."'),
      },
      tryIt: {
        question: t('Fill in the blank: "The clerk was accused ___ stealing the money."', 'শূন্যস্থান পূরণ করো: "The clerk was accused ___ stealing the money."'),
        options: [t('for', 'for'), t('with', 'with'), t('of', 'of'), t('about', 'about')],
        correct: 2,
        explanation: [
          t('The fixed pair is "accused of" (blamed for doing something wrong).', 'নির্দিষ্ট জোড়াটা হলো "accused of" (কোনো অন্যায়ের জন্য অভিযুক্ত)।'),
          t('"Accused for" is a common mistake because we say "blamed for". Correct: "accused of stealing".', '"blamed for" বলা হয় বলে অনেকে "accused for" লেখে, সেটা ভুল। ঠিক: "accused of stealing"।'),
        ],
      },
    },
    {
      key: 'connectors',
      emoji: '🧩',
      name: t('Linking words: although, because, unless, so', 'সংযোজক শব্দ: although, because, unless, so'),
      spot: t('The blank joins two parts of a sentence, and the options are words like although, because, unless, so, but, if.', 'শূন্যস্থানটা বাক্যের দুটো অংশকে জোড়ে, আর option-গুলো although, because, unless, so, but, if জাতীয় শব্দ।'),
      method: [
        t('Read both parts and decide how they are related: contrast, reason, result or condition.', 'দুটো অংশ পড়ে ঠিক করো ওদের সম্পর্ক কী: বৈপরীত্য, কারণ, ফল না শর্ত।'),
        t('Contrast (surprise) → although / though / but. Reason → because / since. Result → so / therefore.', 'বৈপরীত্য (অপ্রত্যাশিত) → although / though / but। কারণ → because / since। ফল → so / therefore।'),
        t('Condition "if not" → unless. "Unless" already means "if not", so do not add another "not" after it.', 'শর্ত "যদি না" → unless। "Unless" মানেই "if not", তাই এর পরে আর "not" বসবে না।'),
        t('Do not use "although" and "but" together in one sentence.', 'একই বাক্যে "although" আর "but" একসঙ্গে বসবে না।'),
      ],
      example: {
        question: t('Fill in the blank: "___ it was raining heavily, we went out to play." (a) Because (b) Although (c) Unless (d) So', 'শূন্যস্থান পূরণ করো: "___ it was raining heavily, we went out to play." (a) Because (b) Although (c) Unless (d) So'),
        steps: [
          t('Heavy rain usually stops people from going out, but they went out anyway.', 'জোর বৃষ্টিতে সাধারণত লোকে বাইরে যায় না, কিন্তু ওরা তবুও গেল।'),
          t('That is a contrast (a surprise), so we need "Although".', 'এটা বৈপরীত্য (অপ্রত্যাশিত ঘটনা), তাই "Although" লাগবে।'),
        ],
        answer: t('(b) Although', 'উত্তর: (b) Although'),
      },
      tryIt: {
        question: t('Fill in the blank: "You will not pass the exam ___ you work hard."', 'শূন্যস্থান পূরণ করো: "You will not pass the exam ___ you work hard."'),
        options: [t('if', 'if'), t('because', 'because'), t('although', 'although'), t('unless', 'unless')],
        correct: 3,
        explanation: [
          t('The meaning is: you will not pass if you do NOT work hard. That is a condition with "if not".', 'অর্থ হলো: পরিশ্রম না করলে তুমি পাস করবে না। এটা "if not" (যদি না) ধরনের শর্ত।'),
          t('"If not" = "unless", so: "You will not pass the exam unless you work hard."', '"If not" = "unless", তাই: "You will not pass the exam unless you work hard."'),
          t('"If" makes the sentence illogical (working hard would stop you from passing).', '"If" বসালে মানে উল্টে যায় (পরিশ্রম করলে পাস করবে না!)।'),
        ],
      },
    },
    {
      key: 'collocations',
      emoji: '🧲',
      name: t('Word partners (heavy rain, make a mistake)', 'যেসব শব্দ একসঙ্গে বসে (heavy rain, make a mistake)'),
      spot: t('All options have a similar meaning (heavy/strong/big, make/do), but only one is the natural partner of the noun next to the blank.', 'সব option-এর মানে কাছাকাছি (heavy/strong/big, make/do), কিন্তু শূন্যস্থানের পাশের noun-এর সঙ্গে স্বাভাবিকভাবে বসে শুধু একটা।'),
      method: [
        t('Look at the noun the blank describes or goes with.', 'শূন্যস্থান যে noun-এর সঙ্গে যুক্ত, সেটা দেখো।'),
        t('Recall common partners: heavy rain/traffic, strong tea/wind, make a mistake/a decision/a promise, do homework/a favour/your duty.', 'চেনা জুটিগুলো মনে করো: heavy rain/traffic, strong tea/wind, make a mistake/a decision/a promise, do homework/a favour/your duty।'),
        t('Pick the word that native speakers actually use with that noun, even if others "mean" the same.', 'অন্য শব্দের মানে কাছাকাছি হলেও, ওই noun-এর সঙ্গে ইংরেজিতে যেটা আসলে ব্যবহার হয় সেটাই বাছো।'),
      ],
      example: {
        question: t('Fill in the blank: "She ___ a mistake in the last sum." (a) did (b) made (c) took (d) gave', 'শূন্যস্থান পূরণ করো: "She ___ a mistake in the last sum." (a) did (b) made (c) took (d) gave'),
        steps: [
          t('The noun is "mistake".', 'Noun হলো "mistake"।'),
          t('The fixed partner is "make a mistake", so the past form is "made".', 'নির্দিষ্ট জুটি "make a mistake", তাই অতীত রূপে "made"।'),
        ],
        answer: t('(b) made', 'উত্তর: (b) made'),
      },
      tryIt: {
        question: t('Fill in the blank: "There was ___ rain last night, so the roads were flooded."', 'শূন্যস্থান পূরণ করো: "There was ___ rain last night, so the roads were flooded."'),
        options: [t('strong', 'strong'), t('heavy', 'heavy'), t('big', 'big'), t('thick', 'thick')],
        correct: 1,
        explanation: [
          t('The noun is "rain". In English we say "heavy rain" for a lot of rain.', 'Noun হলো "rain"। প্রচুর বৃষ্টি বোঝাতে ইংরেজিতে বলা হয় "heavy rain"।'),
          t('"Strong" goes with wind or tea, not rain; "big rain" and "thick rain" are not used.', '"Strong" বসে wind বা tea-র সঙ্গে, rain-এর সঙ্গে নয়; "big rain" বা "thick rain" ব্যবহার হয় না।'),
        ],
      },
    },
    {
      key: 'confusing_words',
      emoji: '👯',
      name: t('Look-alike words (affect/effect, principal/principle)', 'দেখতে/শুনতে একরকম শব্দ (affect/effect, principal/principle)'),
      spot: t('The options are words that look or sound almost the same but have different meanings or parts of speech.', 'Option-গুলো এমন শব্দ যেগুলো দেখতে বা শুনতে প্রায় এক, কিন্তু মানে বা parts of speech আলাদা।'),
      method: [
        t('Decide what the blank needs: a noun, a verb or an adjective (look at the word before it: "the" → noun, "will/can/to" → verb).', 'শূন্যস্থানে কী লাগবে ঠিক করো: noun, verb না adjective (আগের শব্দ দেখো: "the" → noun, "will/can/to" → verb)।'),
        t('Know the common pairs: affect (verb, to influence) / effect (noun, result); principal (head of a school; main) / principle (a rule); stationary (not moving) / stationery (paper, pens); accept (take) / except (but not).', 'চেনা জোড়াগুলো জেনে রাখো: affect (verb, প্রভাবিত করা) / effect (noun, ফল); principal (স্কুলের প্রধান; মুখ্য) / principle (নীতি); stationary (স্থির) / stationery (কাগজ, কলম); accept (গ্রহণ করা) / except (বাদে)।'),
        t('Put the word in and check that the meaning fits.', 'শব্দটা বসিয়ে দেখো অর্থ মিলছে কিনা।'),
      ],
      example: {
        question: t('Fill in the blank: "The ___ of our school gave a speech on Independence Day." (a) principle (b) principal (c) principals (d) principled', 'শূন্যস্থান পূরণ করো: "The ___ of our school gave a speech on Independence Day." (a) principle (b) principal (c) principals (d) principled'),
        steps: [
          t('We need a person (the head) who gave a speech.', 'এখানে একজন মানুষ (প্রধান) দরকার, যিনি বক্তৃতা দিলেন।'),
          t('"Principal" = the head of a school; "principle" = a rule. "Principals" is plural but "The ___ ... gave" refers to one person.', '"Principal" = স্কুলের প্রধান; "principle" = নীতি। "Principals" বহুবচন, কিন্তু এখানে একজনের কথা বলা হচ্ছে।'),
        ],
        answer: t('(b) principal', 'উত্তর: (b) principal'),
      },
      tryIt: {
        question: t('Fill in the blank: "Smoking can badly ___ your health."', 'শূন্যস্থান পূরণ করো: "Smoking can badly ___ your health."'),
        options: [t('effect', 'effect'), t('affect', 'affect'), t('infect', 'infect'), t('defect', 'defect')],
        correct: 1,
        explanation: [
          t('After "can" we need a verb meaning "to harm or influence".', '"can"-এর পরে একটা verb লাগবে যার মানে "ক্ষতি করা বা প্রভাবিত করা"।'),
          t('"Affect" is that verb. "Effect" is normally a noun (the result), so "Smoking can badly affect your health."', '"Affect" সেই verb। "Effect" সাধারণত noun (ফল), তাই ঠিক বাক্য: "Smoking can badly affect your health."'),
        ],
      },
    },
    {
      key: 'phrasal_verbs',
      emoji: '🧗',
      name: t('Phrasal verbs (put up with, call off)', 'Phrasal verb — verb + ছোট শব্দ (put up with, call off)'),
      spot: t('The options share the same verb with different small words (put up / put off / put on / put out), or the blank is after a verb.', 'Option-গুলোতে একই verb, শুধু পরের ছোট শব্দটা আলাদা (put up / put off / put on / put out), অথবা শূন্যস্থান কোনো verb-এর পরে।'),
      method: [
        t('Work out the meaning the sentence needs (cancel? tolerate? postpone?).', 'বাক্যে কোন অর্থ দরকার সেটা বোঝো (বাতিল? সহ্য? পিছিয়ে দেওয়া?)।'),
        t('Match it with a phrasal verb you know: call off = cancel, put off = postpone, put up with = tolerate, look after = take care of, give up = stop or quit, run out of = have none left.', 'জানা phrasal verb-এর সঙ্গে মেলাও: call off = বাতিল করা, put off = পিছিয়ে দেওয়া, put up with = সহ্য করা, look after = দেখাশোনা করা, give up = ছেড়ে দেওয়া, run out of = ফুরিয়ে যাওয়া।'),
        t('Do not guess from the main verb alone; the small word changes the meaning completely.', 'শুধু মূল verb দেখে আন্দাজ কোরো না; পরের ছোট শব্দটা অর্থ পুরো বদলে দেয়।'),
      ],
      example: {
        question: t('Fill in the blank: "The match was ___ because of heavy rain." (a) called on (b) called off (c) called up (d) called for', 'শূন্যস্থান পূরণ করো: "The match was ___ because of heavy rain." (a) called on (b) called off (c) called up (d) called for'),
        steps: [
          t('Because of heavy rain the match did not happen, so we need "cancelled".', 'জোর বৃষ্টির জন্য খেলা হয়নি, তাই "বাতিল করা" অর্থ লাগবে।'),
          t('"Call off" means "cancel".', '"Call off" মানে "বাতিল করা"।'),
        ],
        answer: t('(b) called off', 'উত্তর: (b) called off'),
      },
      tryIt: {
        question: t('Fill in the blank: "I cannot ___ with his rude behaviour any longer."', 'শূন্যস্থান পূরণ করো: "I cannot ___ with his rude behaviour any longer."'),
        options: [t('put off', 'put off'), t('put on', 'put on'), t('put up', 'put up'), t('put out', 'put out')],
        correct: 2,
        explanation: [
          t('The sentence means "I cannot tolerate his rude behaviour any more".', 'বাক্যের মানে "আমি ওর অভদ্র আচরণ আর সহ্য করতে পারছি না"।'),
          t('"Put up with" = tolerate. "Put off" = postpone, "put on" = wear, "put out" = extinguish (a fire).', '"Put up with" = সহ্য করা। "Put off" = পিছিয়ে দেওয়া, "put on" = পরা, "put out" = (আগুন) নেভানো।'),
        ],
      },
    },
  ],
};
