'use strict';

const t = (en, bn) => ({ en, bn });
const opts = (...s) => s.map((x) => t(x, x));

module.exports = {
  subject: 'english',
  topic: 'parts_of_speech',
  patterns: [
    {
      key: 'adjective_or_adverb',
      emoji: '🗣️',
      name: t('Adjective or adverb after an action verb', 'Action verb-এর পরে adjective না adverb'),
      spot: t(
        'A blank sits next to a verb of action, and the options are an adjective and its -ly adverb: "She sings ___" (beautiful / beautifully).',
        'কোনো action verb-এর পাশে শূন্যস্থান, আর option-এ একটা adjective এবং তার -ly adverb: "She sings ___" (beautiful / beautifully)।',
      ),
      method: [
        t('Ask what the blank describes: a noun or a verb?', 'ভাবো শূন্যস্থানের শব্দটা কাকে বর্ণনা করছে: noun না verb?'),
        t('A noun is described by an adjective; a verb is described by an adverb (how? when? where?).', 'Noun-কে বর্ণনা করে adjective; verb-কে বর্ণনা করে adverb (কীভাবে? কখন? কোথায়?)।'),
        t('Many adverbs end in -ly: beautifully, slowly, politely.', 'অনেক adverb -ly দিয়ে শেষ হয়: beautifully, slowly, politely।'),
      ],
      example: {
        question: t('Fill in the blank: "She sings ___." (beautiful / beautifully)', 'শূন্যস্থান পূরণ করো: "She sings ___." (beautiful / beautifully)'),
        steps: [
          t('The missing word tells how she sings, so it describes the verb "sings".', 'শূন্যস্থানের শব্দটা বলছে সে কীভাবে গান গায়, অর্থাৎ verb "sings"-কে বর্ণনা করছে।'),
          t('A verb is described by an adverb, not an adjective.', 'Verb-কে বর্ণনা করে adverb, adjective নয়।'),
        ],
        answer: t('beautifully — "She sings beautifully."', 'উত্তর: beautifully — "She sings beautifully."'),
      },
      tryIt: {
        question: t('Fill in the blank: "She speaks very ___ to everyone."', 'শূন্যস্থান পূরণ করো: "She speaks very ___ to everyone."'),
        options: opts('polite', 'politely', 'politeness', 'politer'),
        correct: 1,
        explanation: [
          t('The blank tells how she speaks, so it describes the verb "speaks".', 'শূন্যস্থান বলছে সে কীভাবে কথা বলে, তাই এটা verb "speaks"-কে বর্ণনা করছে।'),
          t('A verb needs an adverb, and "very" can only be followed by a plain adverb: "She speaks very politely to everyone."', 'Verb-এর জন্য adverb লাগে, আর "very"-এর পরে সাধারণ adverb বসে: "She speaks very politely to everyone."'),
        ],
      },
    },
    {
      key: 'linking_verb_adjective',
      emoji: '🔗',
      name: t('Linking verbs take an adjective', 'Linking verb-এর পরে adjective বসে'),
      spot: t(
        'The verb is smell, look, taste, feel, seem, become or sound, and the options are an adjective and an adverb: "The soup smells ___".',
        'Verb-টা smell, look, taste, feel, seem, become বা sound, আর option-এ adjective ও adverb: "The soup smells ___"।',
      ),
      method: [
        t('Check whether the verb shows an action or only joins the subject to a quality.', 'দেখো verb-টা কাজ বোঝাচ্ছে, না শুধু subject-কে তার গুণের সঙ্গে জুড়ছে।'),
        t('If it only links the subject to a quality, the blank describes the subject, so use an adjective.', 'শুধু জুড়ে দিলে শূন্যস্থান subject-কে বর্ণনা করছে, তাই adjective বসাও।'),
        t('Do not choose the -ly word just because it looks "more correct".', '-ly শব্দটা "বেশি শুদ্ধ" দেখায় বলেই সেটা বেছো না।'),
      ],
      example: {
        question: t('Choose the correct word: "The soup smells ___." (delicious / deliciously)', 'সঠিক শব্দ বাছো: "The soup smells ___." (delicious / deliciously)'),
        steps: [
          t('Here "smells" is a linking verb: it says what the soup is like, not how it does an action.', 'এখানে "smells" linking verb: এটা বলছে স্যুপটা কেমন, স্যুপ কীভাবে কোনো কাজ করছে তা নয়।'),
          t('After a linking verb we use an adjective.', 'Linking verb-এর পরে adjective বসে।'),
        ],
        answer: t('delicious — "The soup smells delicious."', 'উত্তর: delicious — "The soup smells delicious."'),
      },
      tryIt: {
        question: t('Choose the correct word: "The flowers look ___."', 'সঠিক শব্দ বাছো: "The flowers look ___."'),
        options: opts('beautifully', 'beauty', 'beautify', 'beautiful'),
        correct: 3,
        explanation: [
          t('"Look" here means "appear": it links the flowers to a quality.', 'এখানে "look" মানে "দেখতে লাগা": এটা flowers-কে একটা গুণের সঙ্গে জুড়ছে।'),
          t('A quality of a noun is an adjective: "The flowers look beautiful."', 'Noun-এর গুণ বোঝায় adjective: "The flowers look beautiful."'),
        ],
      },
    },
    {
      key: 'pronoun_case',
      emoji: '👤',
      name: t('Pronoun case: I or me, my or mine', 'Pronoun-এর রূপ: I না me, my না mine'),
      spot: t(
        'The blank is a pronoun, often after "and" or a preposition, or a possessive that stands alone: "gave Raju and ___", "This pen is ___".',
        'শূন্যস্থানে pronoun, প্রায়ই "and" বা preposition-এর পরে, কিংবা একা বসা possessive: "gave Raju and ___", "This pen is ___"।',
      ),
      method: [
        t('Remove the other person from the pair. "Raju and ___ went" becomes "___ went".', 'জোড়ার অন্য মানুষটাকে বাদ দাও। "Raju and ___ went" হয়ে যায় "___ went"।'),
        t('A doer takes the subject form (I, he, we, they); a receiver or a word after a preposition takes the object form (me, him, us, them).', 'কাজ যে করে তার subject রূপ (I, he, we, they); কাজ যে পায় বা preposition-এর পরের শব্দের object রূপ (me, him, us, them)।'),
        t('If nothing follows the blank, use the standalone possessive (mine, yours, hers, ours, theirs). If a noun follows, use my, your, her, our, their.', 'শূন্যস্থানের পরে কিছু না থাকলে একা বসা possessive (mine, yours, hers, ours, theirs)। Noun থাকলে my, your, her, our, their।'),
      ],
      example: {
        question: t('Fill in the blank: "The teacher gave Raju and ___ some books." (I / me)', 'শূন্যস্থান পূরণ করো: "The teacher gave Raju and ___ some books." (I / me)'),
        steps: [
          t('Remove "Raju and": "The teacher gave ___ some books." Nobody says "gave I".', '"Raju and" বাদ দাও: "The teacher gave ___ some books." কেউ "gave I" বলে না।'),
          t('The pair receives the action, so the object form is needed.', 'জোড়াটা কাজের receiver, তাই object রূপ লাগবে।'),
        ],
        answer: t('me — "The teacher gave Raju and me some books."', 'উত্তর: me — "The teacher gave Raju and me some books."'),
      },
      tryIt: {
        question: t('Fill in the blank: "This gift is for you and ___."', 'শূন্যস্থান পূরণ করো: "This gift is for you and ___."'),
        options: opts('I', 'me', 'my', 'mine'),
        correct: 1,
        explanation: [
          t('Remove "you and": "This gift is for ___." We say "for me", never "for I".', '"you and" বাদ দাও: "This gift is for ___." আমরা "for me" বলি, "for I" নয়।'),
          t('"For" is a preposition, so the pronoun after it takes the object form: "This gift is for you and me."', '"For" preposition, তাই তার পরের pronoun object রূপ নেয়: "This gift is for you and me."'),
        ],
      },
    },
    {
      key: 'who_whom_whose',
      emoji: '❔',
      name: t('Who, whom or whose', 'Who, whom না whose'),
      spot: t(
        'The blank is a who-word that may join a clause or open a question, often after a preposition: "To ___ did you give it?"',
        'শূন্যস্থানে একটা who-জাতীয় শব্দ, যা clause জুড়ছে বা প্রশ্ন শুরু করছে, প্রায়ই preposition-এর পরে: "To ___ did you give it?"',
      ),
      method: [
        t('Test with he / him: if "he" fits, use who; if "him" fits, use whom.', 'he / him দিয়ে পরীক্ষা করো: "he" বসলে who; "him" বসলে whom।'),
        t('After a preposition (to, with, by, for) exams expect whom.', 'Preposition (to, with, by, for)-এর পরে পরীক্ষায় whom আসে।'),
        t('Whose shows belonging: the woman whose bag was stolen.', 'Whose মালিকানা বোঝায়: the woman whose bag was stolen।'),
      ],
      example: {
        question: t('Fill in the blank: "To ___ did you give the letter?" (who / whom)', 'শূন্যস্থান পূরণ করো: "To ___ did you give the letter?" (who / whom)'),
        steps: [
          t('The blank follows the preposition "to". Try the answer "to him" (not "to he").', 'শূন্যস্থান preposition "to"-এর পরে। "to him" বসিয়ে দেখো ("to he" নয়)।'),
          t('"Him" matches "whom".', '"Him"-এর সঙ্গে মেলে "whom"।'),
        ],
        answer: t('whom — "To whom did you give the letter?"', 'উত্তর: whom — "To whom did you give the letter?"'),
      },
      tryIt: {
        question: t('Fill in the blank: "The boy ___ won the prize is my cousin."', 'শূন্যস্থান পূরণ করো: "The boy ___ won the prize is my cousin."'),
        options: opts('whom', 'whose', 'who', 'which'),
        correct: 2,
        explanation: [
          t('The blank is the doer of "won": "he won the prize" fits, so the word is who.', 'শূন্যস্থান "won"-এর কর্তা: "he won the prize" বসে, তাই who।'),
          t('"Whom" is for a receiver, "whose" shows belonging and "which" is not used for a person: "The boy who won the prize is my cousin."', '"Whom" receiver-এর জন্য, "whose" মালিকানার জন্য আর "which" মানুষের জন্য হয় না: "The boy who won the prize is my cousin."'),
        ],
      },
    },
    {
      key: 'word_by_its_job',
      emoji: '🧩',
      name: t('Name the part of speech by its job', 'কাজ দেখে part of speech চেনা'),
      spot: t(
        'A question asks which part of speech a word in capitals is, and the word can play more than one role (fast, light, plays).',
        'প্রশ্নে বড় হাতের একটা শব্দের part of speech জিজ্ঞাসা করা হয়েছে, আর শব্দটা একাধিক ভূমিকায় বসতে পারে (fast, light, plays)।',
      ),
      method: [
        t('Do not judge the word alone; read the whole sentence.', 'শব্দটাকে একা বিচার করো না; পুরো বাক্য পড়ো।'),
        t('Ask what the word does: names something (noun), shows an action (verb), describes a noun (adjective), tells how, when or where (adverb).', 'ভাবো শব্দটা কী করছে: নাম বোঝাচ্ছে (noun), কাজ বোঝাচ্ছে (verb), noun-কে বর্ণনা করছে (adjective), কীভাবে/কখন/কোথায় বলছে (adverb)।'),
        t('Check the neighbours: a subject before it suggests a verb, a noun after it or after "is" suggests an adjective.', 'পাশের শব্দ দেখো: আগে subject থাকলে verb হতে পারে, "is"-এর পরে বা noun-এর আগে থাকলে adjective হতে পারে।'),
      ],
      example: {
        question: t('Name the part of speech of the word in capitals: "Mina PLAYS the harmonium every evening."', 'বড় হাতের শব্দের part of speech বলো: "Mina PLAYS the harmonium every evening."'),
        steps: [
          t('Does the word show an action? Yes, Mina does something: she plays.', 'শব্দটা কি কাজ বোঝায়? হ্যাঁ, Mina কিছু করছে: সে বাজায়।'),
          t('It has the subject "Mina", so it is a verb, even though "plays" can also be a noun (a play).', 'এর subject "Mina", তাই এটা verb, যদিও "plays" noun-ও হতে পারে (a play)।'),
        ],
        answer: t('Verb', 'উত্তর: Verb'),
      },
      tryIt: {
        question: t('What part of speech is LIGHT in "The bag is light."?', '"The bag is light." বাক্যে LIGHT কোন part of speech?'),
        options: opts('Noun', 'Verb', 'Adjective', 'Adverb'),
        correct: 2,
        explanation: [
          t('The word comes after "is" and tells what the bag is like.', 'শব্দটা "is"-এর পরে বসে বলছে ব্যাগটা কেমন।'),
          t('A word that describes a noun is an adjective. (As a noun it would be "the light", as a verb "to light a lamp".)', 'যে শব্দ noun-কে বর্ণনা করে সেটা adjective। (Noun হলে "the light", verb হলে "to light a lamp"।)'),
        ],
      },
    },
  ],
};
