'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'english',
  topic: 'error_spotting',
  patterns: [
    {
      key: 'subject_verb_agreement',
      emoji: '🤝',
      name: t('Subject-verb agreement errors', 'Subject-verb agreement-এর ভুল (কর্তা আর ক্রিয়ার মিল)'),
      spot: t(
        'The sentence has phrases like "one of", "each of", "the quality of", "neither... nor", or a long phrase between the subject and the verb (is/are, was/were, has/have).',
        'বাক্যে "one of", "each of", "the quality of", "neither... nor" আছে, অথবা subject (কর্তা) আর verb (is/are, was/were, has/have)-এর মাঝে লম্বা একটা phrase আছে।',
      ),
      method: [
        t('Find the real subject. Ignore the "of ..." phrase that comes after it.', 'আসল subject খুঁজে বের করো। তার পরের "of ..." অংশটা বাদ দিয়ে ভাবো।'),
        t('Singular subject takes a singular verb (is, was, has); plural subject takes a plural verb (are, were, have).', 'Subject একবচন হলে verb-ও একবচন (is, was, has); বহুবচন হলে verb বহুবচন (are, were, have)।'),
        t('"One of", "each of", "every", "either of", "neither of" always take a singular verb.', '"One of", "each of", "every", "either of", "neither of" — এদের পরে সবসময় একবচন verb বসে।'),
        t('With "neither A nor B" or "either A or B", the verb agrees with B (the nearer subject).', '"neither A nor B" বা "either A or B" হলে verb মেলে B-এর সঙ্গে (যেটা verb-এর কাছে)।'),
      ],
      example: {
        question: t(
          'Find the part with an error: (A) One of the boys / (B) are absent / (C) today. / (D) No error',
          'কোন অংশে ভুল আছে খুঁজে বের করো: (A) One of the boys / (B) are absent / (C) today. / (D) No error',
        ),
        steps: [
          t('The real subject is "One", not "boys". "of the boys" only tells us which group.', 'আসল subject হলো "One", "boys" নয়। "of the boys" শুধু বলছে কোন দলের একজন।'),
          t('"One" is singular, so the verb must be singular: "is", not "are".', '"One" একবচন, তাই verb-ও একবচন হবে: "are" নয়, "is"।'),
          t('Correct sentence: "One of the boys is absent today."', 'ঠিক বাক্য: "One of the boys is absent today."'),
        ],
        answer: t('(B) — "are" should be "is".', 'উত্তর: (B) — "are"-এর বদলে "is" হবে।'),
      },
      tryIt: {
        question: t(
          'Find the part with an error: (A) The quality of these mangoes / (B) are not / (C) very good. / (D) No error',
          'কোন অংশে ভুল আছে খুঁজে বের করো: (A) The quality of these mangoes / (B) are not / (C) very good. / (D) No error',
        ),
        options: [t('A', 'A'), t('B', 'B'), t('C', 'C'), t('D', 'D')],
        correct: 1,
        explanation: [
          t('The real subject is "The quality", not "mangoes".', 'আসল subject হলো "The quality", "mangoes" নয়।'),
          t('"Quality" is singular, so we need "is", not "are".', '"Quality" একবচন, তাই "are" নয়, "is" লাগবে।'),
          t('Correct: "The quality of these mangoes is not very good." So the error is in (B).', 'ঠিক বাক্য: "The quality of these mangoes is not very good." তাই ভুল (B)-তে।'),
        ],
      },
    },
    {
      key: 'uncountable_nouns',
      emoji: '🪑',
      name: t('Uncountable nouns used as plural (advices, furnitures)', 'Uncountable noun-কে plural করা (advices, furnitures)'),
      spot: t(
        'Look for words like advice, furniture, information, luggage, baggage, scenery, equipment, news, poetry with an "-s" added, or with "a/an" or "many".',
        'advice, furniture, information, luggage, baggage, scenery, equipment, news, poetry — এই শব্দগুলোর শেষে "-s" লাগানো আছে, বা আগে "a/an" বা "many" আছে কিনা দেখো।',
      ),
      method: [
        t('Remember the list: advice, furniture, information, luggage, baggage, scenery, equipment, machinery, poetry, news. These are uncountable.', 'তালিকাটা মনে রাখো: advice, furniture, information, luggage, baggage, scenery, equipment, machinery, poetry, news — এগুলো uncountable (গোনা যায় না)।'),
        t('They never take "-s" and never take "a/an".', 'এদের শেষে কখনো "-s" বসে না, আগে "a/an"-ও বসে না।'),
        t('Use "much", "some", "a lot of", or "a piece of" with them (a piece of advice, an item of furniture).', 'এদের সঙ্গে "much", "some", "a lot of" বা "a piece of" ব্যবহার করো (a piece of advice, an item of furniture)।'),
        t('They take a singular verb: "The furniture is new."', 'এদের পরে একবচন verb বসে: "The furniture is new."'),
      ],
      example: {
        question: t(
          'Find the part with an error: (A) He gave me / (B) many good advices / (C) before the exam. / (D) No error',
          'কোন অংশে ভুল আছে খুঁজে বের করো: (A) He gave me / (B) many good advices / (C) before the exam. / (D) No error',
        ),
        steps: [
          t('"Advice" is an uncountable noun, so "advices" is wrong.', '"Advice" একটি uncountable noun, তাই "advices" ভুল।'),
          t('"Many" is used only with countable nouns, so it must also change.', '"Many" শুধু গোনা যায় এমন noun-এর সঙ্গে বসে, তাই এটাও বদলাতে হবে।'),
          t('Correct: "He gave me a lot of good advice before the exam."', 'ঠিক বাক্য: "He gave me a lot of good advice before the exam."'),
        ],
        answer: t('(B) — "many good advices" should be "a lot of good advice".', 'উত্তর: (B) — "many good advices"-এর বদলে "a lot of good advice" হবে।'),
      },
      tryIt: {
        question: t(
          'Find the part with an error: (A) She bought / (B) new furnitures / (C) for her flat. / (D) No error',
          'কোন অংশে ভুল আছে খুঁজে বের করো: (A) She bought / (B) new furnitures / (C) for her flat. / (D) No error',
        ),
        options: [t('A', 'A'), t('B', 'B'), t('C', 'C'), t('D', 'D')],
        correct: 1,
        explanation: [
          t('"Furniture" is uncountable, so it never takes "-s".', '"Furniture" uncountable, তাই এর শেষে কখনো "-s" বসে না।'),
          t('Correct: "She bought new furniture for her flat." The error is in (B).', 'ঠিক বাক্য: "She bought new furniture for her flat." ভুল (B)-তে।'),
        ],
      },
    },
    {
      key: 'degree_of_comparison',
      emoji: '📏',
      name: t('Degree of comparison errors (more taller)', 'Degree of comparison-এর ভুল (more taller)'),
      spot: t(
        'The sentence compares two or more things using "than", "more", "most", "-er", "-est", or "than any".',
        'বাক্যে "than", "more", "most", "-er", "-est" বা "than any" দিয়ে দুই বা তার বেশি জিনিসের তুলনা করা হয়েছে।',
      ),
      method: [
        t('Never use double comparatives or superlatives: "more taller" → "taller", "most tallest" → "tallest".', 'দুবার comparative/superlative বসবে না: "more taller" → "taller", "most tallest" → "tallest"।'),
        t('"Than any" with something of the same group needs "other": "than any other boy".', 'একই দলের কারও সঙ্গে তুলনায় "than any"-র পরে "other" লাগে: "than any other boy"।'),
        t('Words like superior, inferior, senior, junior, prefer take "to", not "than".', 'superior, inferior, senior, junior, prefer — এদের পরে "than" নয়, "to" বসে।'),
        t('Compare like with like: "My pen is better than yours" (not "than you").', 'একই জাতের জিনিসের তুলনা করো: "My pen is better than yours" ("than you" নয়)।'),
      ],
      example: {
        question: t(
          'Find the part with an error: (A) Ravi is / (B) more taller / (C) than his brother. / (D) No error',
          'কোন অংশে ভুল আছে খুঁজে বের করো: (A) Ravi is / (B) more taller / (C) than his brother. / (D) No error',
        ),
        steps: [
          t('"Taller" is already the comparative form of "tall".', '"Taller" নিজেই "tall"-এর comparative রূপ।'),
          t('Adding "more" makes it a double comparative, which is wrong.', 'এর আগে "more" বসালে দুবার comparative হয়ে যায়, যা ভুল।'),
          t('Correct: "Ravi is taller than his brother."', 'ঠিক বাক্য: "Ravi is taller than his brother."'),
        ],
        answer: t('(B) — remove "more".', 'উত্তর: (B) — "more" বাদ দিতে হবে।'),
      },
      tryIt: {
        question: t(
          'Find the part with an error: (A) Mount Everest is higher / (B) than any mountain / (C) in the world. / (D) No error',
          'কোন অংশে ভুল আছে খুঁজে বের করো: (A) Mount Everest is higher / (B) than any mountain / (C) in the world. / (D) No error',
        ),
        options: [t('A', 'A'), t('B', 'B'), t('C', 'C'), t('D', 'D')],
        correct: 1,
        explanation: [
          t('Everest is itself a mountain, so it is being compared with its own group.', 'Everest নিজেও একটা পর্বত, তাই নিজের দলের সঙ্গেই তুলনা হচ্ছে।'),
          t('Then we need "than any other mountain"; otherwise it means Everest is higher than itself too.', 'তাই "than any other mountain" লাগবে; না হলে মানে দাঁড়ায় Everest নিজের থেকেও উঁচু।'),
          t('The error is in (B).', 'ভুল (B)-তে।'),
        ],
      },
    },
    {
      key: 'wrong_preposition',
      emoji: '🔗',
      name: t('Wrong preposition after a fixed word (prefer to, senior to)', 'নির্দিষ্ট শব্দের পরে ভুল preposition (prefer to, senior to)'),
      spot: t(
        'A word that always goes with a fixed preposition (prefer, senior, superior, married, consist, comply, discuss, cope) is followed by the wrong one, or by an extra one.',
        'যে শব্দের পরে নির্দিষ্ট preposition বসে (prefer, senior, superior, married, consist, comply, discuss, cope), তার পরে ভুল বা বাড়তি preposition বসানো আছে।',
      ),
      method: [
        t('Learn the fixed pairs: prefer to, senior/junior to, superior/inferior to, married to, consist of, comply with, cope with, accused of.', 'নির্দিষ্ট জোড়াগুলো মুখস্থ রাখো: prefer to, senior/junior to, superior/inferior to, married to, consist of, comply with, cope with, accused of।'),
        t('Some verbs take NO preposition: discuss, describe, reach, enter, order, request (not "discuss about", "reach at").', 'কিছু verb-এর পরে কোনো preposition বসে না: discuss, describe, reach, enter, order, request ("discuss about", "reach at" ভুল)।'),
        t('Read the word and the preposition together; if the pair sounds unfamiliar, that is likely the error.', 'শব্দ আর preposition একসঙ্গে পড়ো; জোড়াটা অচেনা লাগলে সেখানেই ভুল থাকার সম্ভাবনা বেশি।'),
      ],
      example: {
        question: t(
          'Find the part with an error: (A) He prefers tea / (B) than coffee / (C) in the morning. / (D) No error',
          'কোন অংশে ভুল আছে খুঁজে বের করো: (A) He prefers tea / (B) than coffee / (C) in the morning. / (D) No error',
        ),
        steps: [
          t('"Prefer" is always followed by "to" when comparing two things: prefer A to B.', 'দুটো জিনিসের তুলনায় "prefer"-এর পরে সবসময় "to" বসে: prefer A to B।'),
          t('So "than coffee" is wrong; it should be "to coffee".', 'তাই "than coffee" ভুল; হবে "to coffee"।'),
          t('Correct: "He prefers tea to coffee in the morning."', 'ঠিক বাক্য: "He prefers tea to coffee in the morning."'),
        ],
        answer: t('(B) — "than" should be "to".', 'উত্তর: (B) — "than"-এর বদলে "to" হবে।'),
      },
      tryIt: {
        question: t(
          'Find the part with an error: (A) We discussed about / (B) the problem / (C) for an hour. / (D) No error',
          'কোন অংশে ভুল আছে খুঁজে বের করো: (A) We discussed about / (B) the problem / (C) for an hour. / (D) No error',
        ),
        options: [t('A', 'A'), t('B', 'B'), t('C', 'C'), t('D', 'D')],
        correct: 0,
        explanation: [
          t('"Discuss" means "talk about", so it takes no preposition after it.', '"Discuss" মানেই "talk about" (আলোচনা করা), তাই এর পরে কোনো preposition বসে না।'),
          t('Correct: "We discussed the problem for an hour." The error is in (A).', 'ঠিক বাক্য: "We discussed the problem for an hour." ভুল (A)-তে।'),
        ],
      },
    },
    {
      key: 'tense_errors',
      emoji: '⏰',
      name: t('Wrong tense / tense sequence', 'ভুল tense / tense-এর ক্রম'),
      spot: t(
        'The sentence has a time word (yesterday, ago, last year, since, for, tomorrow) or an "if / when" clause about the future.',
        'বাক্যে সময় বোঝানো শব্দ আছে (yesterday, ago, last year, since, for, tomorrow), অথবা ভবিষ্যৎ নিয়ে "if / when" clause আছে।',
      ),
      method: [
        t('A finished past time (yesterday, ago, last year, in 2010) takes the simple past, not the present perfect: "I met him yesterday", not "I have met him yesterday".', 'অতীতের নির্দিষ্ট সময় (yesterday, ago, last year, in 2010) থাকলে simple past বসে, present perfect নয়: "I met him yesterday", "I have met him yesterday" নয়।'),
        t('In an "if / when / unless / before / as soon as" clause about the future, use the simple present, not "will": "If it rains, ..."', 'ভবিষ্যৎ বোঝাতে "if / when / unless / before / as soon as" clause-এ "will" নয়, simple present বসে: "If it rains, ..."'),
        t('"Since" is used with a point of time (since Monday); "for" with a length of time (for three days).', '"Since" বসে সময়ের একটা বিন্দুর সঙ্গে (since Monday); "for" বসে সময়ের দৈর্ঘ্যের সঙ্গে (for three days)।'),
        t('If the main verb is in the past, the verb in the joined clause is usually in the past too: "He said that he was ill."', 'মূল verb অতীতে থাকলে সাধারণত পরের clause-এর verb-ও অতীতে হয়: "He said that he was ill."'),
      ],
      example: {
        question: t(
          'Find the part with an error: (A) I have met him / (B) yesterday / (C) at the station. / (D) No error',
          'কোন অংশে ভুল আছে খুঁজে বের করো: (A) I have met him / (B) yesterday / (C) at the station. / (D) No error',
        ),
        steps: [
          t('"Yesterday" is a finished past time.', '"Yesterday" অতীতের নির্দিষ্ট, শেষ হয়ে যাওয়া সময়।'),
          t('With such a time word we use the simple past, so "have met" must become "met".', 'এমন সময়-বোঝানো শব্দের সঙ্গে simple past বসে, তাই "have met" হবে "met"।'),
          t('Correct: "I met him yesterday at the station."', 'ঠিক বাক্য: "I met him yesterday at the station."'),
        ],
        answer: t('(A) — "have met" should be "met".', 'উত্তর: (A) — "have met"-এর বদলে "met" হবে।'),
      },
      tryIt: {
        question: t(
          'Find the part with an error: (A) If it will rain / (B) tomorrow, / (C) the match will be cancelled. / (D) No error',
          'কোন অংশে ভুল আছে খুঁজে বের করো: (A) If it will rain / (B) tomorrow, / (C) the match will be cancelled. / (D) No error',
        ),
        options: [t('A', 'A'), t('B', 'B'), t('C', 'C'), t('D', 'D')],
        correct: 0,
        explanation: [
          t('This is an "if" clause about the future, so it takes the simple present, not "will".', 'এটা ভবিষ্যৎ নিয়ে "if" clause, তাই এখানে "will" নয়, simple present বসবে।'),
          t('"Will" stays only in the main clause: "the match will be cancelled".', '"Will" থাকবে শুধু মূল clause-এ: "the match will be cancelled"।'),
          t('Correct: "If it rains tomorrow, the match will be cancelled." The error is in (A).', 'ঠিক বাক্য: "If it rains tomorrow, the match will be cancelled." ভুল (A)-তে।'),
        ],
      },
    },
  ],
};
