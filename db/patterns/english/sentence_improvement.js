'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'english',
  topic: 'sentence_improvement',
  patterns: [
    {
      key: 'verb_agreement',
      emoji: '🤝',
      name: t('Verb does not agree with the subject', 'Verb subject-এর সঙ্গে মিলছে না'),
      spot: t(
        'The bold part is a verb (is/are, was/were, has/have), and the subject is tricky: "news", "each", "neither... nor", or a subject with "of ...".',
        'Bold অংশটা একটা verb (is/are, was/were, has/have), আর subject-টা একটু কৌশলী: "news", "each", "neither... nor", বা "of ..." যুক্ত subject।',
      ),
      method: [
        t('Find the real subject of the bold verb.', 'Bold verb-এর আসল subject খুঁজে বের করো।'),
        t('Words like news, mathematics, each, every, everyone are singular → is/was/has.', 'news, mathematics, each, every, everyone — এগুলো একবচন → is/was/has।'),
        t('With "neither A nor B" / "either A or B", match the verb to B (the nearer subject).', '"neither A nor B" / "either A or B" হলে verb মেলাও B-এর সঙ্গে (যেটা কাছে)।'),
        t('Choose the option that fixes the verb; pick "No improvement" only if the sentence is already correct.', 'যে option verb-টা ঠিক করে সেটা বাছো; বাক্য আগে থেকেই ঠিক হলে তবেই "No improvement"।'),
      ],
      example: {
        question: t(
          'Improve the bold part: "The news from the villages **are** good." (a) is (b) were (c) have been (d) No improvement',
          'Bold অংশটি ঠিক করো: "The news from the villages **are** good." (a) is (b) were (c) have been (d) No improvement',
        ),
        steps: [
          t('The real subject is "The news", not "villages".', 'আসল subject হলো "The news", "villages" নয়।'),
          t('"News" looks plural but is singular, so it needs "is".', '"News" দেখতে বহুবচনের মতো হলেও একবচন, তাই "is" লাগবে।'),
          t('Correct: "The news from the villages is good."', 'ঠিক বাক্য: "The news from the villages is good."'),
        ],
        answer: t('(a) is', 'উত্তর: (a) is'),
      },
      tryIt: {
        question: t(
          'Improve the bold part: "Neither Rahul nor his friends **was present** at the party."',
          'Bold অংশটি ঠিক করো: "Neither Rahul nor his friends **was present** at the party."',
        ),
        options: [t('were present', 'were present'), t('is present', 'is present'), t('has present', 'has present'), t('No improvement', 'No improvement')],
        correct: 0,
        explanation: [
          t('With "neither A nor B", the verb agrees with B, the nearer subject.', '"neither A nor B" হলে verb মেলে B-এর সঙ্গে, যেটা verb-এর কাছে।'),
          t('Here B is "his friends", which is plural, so we need "were".', 'এখানে B হলো "his friends", যা বহুবচন, তাই "were" লাগবে।'),
          t('Correct: "Neither Rahul nor his friends were present at the party."', 'ঠিক বাক্য: "Neither Rahul nor his friends were present at the party."'),
        ],
      },
    },
    {
      key: 'wrong_preposition',
      emoji: '🔗',
      name: t('Wrong preposition in a fixed phrase', 'নির্দিষ্ট phrase-এ ভুল preposition'),
      spot: t(
        'The bold part is a short phrase with a preposition after an adjective or verb (senior than, good in, angry on, married with).',
        'Bold অংশে adjective বা verb-এর পরে একটা preposition আছে (senior than, good in, angry on, married with)।',
      ),
      method: [
        t('Read the word before the preposition and recall its fixed partner.', 'Preposition-এর আগের শব্দটা পড়ো আর তার নির্দিষ্ট সঙ্গীটা মনে করো।'),
        t('Common pairs: senior to, good at, angry with (a person), angry at (a thing), married to, afraid of, interested in, depend on.', 'চেনা জোড়া: senior to, good at, angry with (মানুষের উপর), angry at (কোনো জিনিসে), married to, afraid of, interested in, depend on।'),
        t('Pick the option with the correct pair.', 'ঠিক জোড়াটা যে option-এ আছে সেটা বাছো।'),
      ],
      example: {
        question: t(
          'Improve the bold part: "My brother is senior **than me**." (a) to me (b) from me (c) over me (d) No improvement',
          'Bold অংশটি ঠিক করো: "My brother is senior **than me**." (a) to me (b) from me (c) over me (d) No improvement',
        ),
        steps: [
          t('"Senior" (like junior, superior, inferior) is followed by "to", never "than".', '"Senior" (junior, superior, inferior-এর মতো)-এর পরে "to" বসে, কখনো "than" নয়।'),
          t('Correct: "My brother is senior to me."', 'ঠিক বাক্য: "My brother is senior to me."'),
        ],
        answer: t('(a) to me', 'উত্তর: (a) to me'),
      },
      tryIt: {
        question: t('Improve the bold part: "She is very good **in** mathematics."', 'Bold অংশটি ঠিক করো: "She is very good **in** mathematics."'),
        options: [t('on', 'on'), t('with', 'with'), t('at', 'at'), t('No improvement', 'No improvement')],
        correct: 2,
        explanation: [
          t('To talk about skill in a subject or activity, we say "good at".', 'কোনো বিষয় বা কাজে দক্ষতা বোঝাতে বলা হয় "good at"।'),
          t('"Good in" is a common mistake in this use.', 'এই অর্থে "good in" একটা সাধারণ ভুল।'),
          t('Correct: "She is very good at mathematics."', 'ঠিক বাক্য: "She is very good at mathematics."'),
        ],
      },
    },
    {
      key: 'redundancy',
      emoji: '✂️',
      name: t('Extra words that repeat the meaning (return back)', 'অর্থ পুনরাবৃত্তি করে এমন বাড়তি শব্দ (return back)'),
      spot: t(
        'The bold part has two words that mean the same thing: return back, repeat again, revert back, each and every, cousin brother, the reason is because.',
        'Bold অংশে একই মানের দুটো শব্দ আছে: return back, repeat again, revert back, each and every, cousin brother, the reason is because।',
      ),
      method: [
        t('Ask: does one word already carry the meaning of the other? "Return" already means "come back".', 'ভাবো: একটা শব্দেই কি অন্যটার অর্থ আছে? "Return" মানেই "come back" (ফিরে আসা)।'),
        t('Remove the extra word: return back → return, repeat again → repeat, cousin brother → cousin.', 'বাড়তি শব্দটা বাদ দাও: return back → return, repeat again → repeat, cousin brother → cousin।'),
        t('Choose the shortest option that keeps the full meaning and is grammatical.', 'যে option সবচেয়ে ছোট অথচ পুরো অর্থ রাখে এবং ব্যাকরণগতভাবে ঠিক, সেটা বাছো।'),
      ],
      example: {
        question: t(
          'Improve the bold part: "He **returned back** home late at night." (a) returned (b) returned again (c) was returning back (d) No improvement',
          'Bold অংশটি ঠিক করো: "He **returned back** home late at night." (a) returned (b) returned again (c) was returning back (d) No improvement',
        ),
        steps: [
          t('"Return" already means "come back", so "back" is extra.', '"Return" মানেই "come back", তাই "back" বাড়তি।'),
          t('Remove "back": "He returned home late at night."', '"back" বাদ দাও: "He returned home late at night."'),
        ],
        answer: t('(a) returned', 'উত্তর: (a) returned'),
      },
      tryIt: {
        question: t('Improve the bold part: "Please **repeat it again** for the whole class."', 'Bold অংশটি ঠিক করো: "Please **repeat it again** for the whole class."'),
        options: [t('again repeat it', 'again repeat it'), t('repeat back it', 'repeat back it'), t('No improvement', 'No improvement'), t('repeat it', 'repeat it')],
        correct: 3,
        explanation: [
          t('"Repeat" already means "say or do again", so "again" is extra.', '"Repeat" মানেই "আবার বলা বা করা", তাই "again" বাড়তি।'),
          t('Correct: "Please repeat it for the whole class."', 'ঠিক বাক্য: "Please repeat it for the whole class."'),
        ],
      },
    },
    {
      key: 'perfect_tense',
      emoji: '⏳',
      name: t('Wrong tense with since / for (I am knowing him for years)', 'since / for-এর সঙ্গে ভুল tense (I am knowing him for years)'),
      spot: t(
        'The sentence has "since" or "for" with an action that started in the past and is still going on, but the bold verb is in the simple or continuous present.',
        'বাক্যে "since" বা "for" আছে, কাজটা অতীতে শুরু হয়ে এখনো চলছে, কিন্তু bold verb-টা simple বা continuous present-এ আছে।',
      ),
      method: [
        t('An action that started in the past and continues now needs the present perfect (have known) or present perfect continuous (have been living).', 'অতীতে শুরু হয়ে এখনো চলছে এমন কাজে present perfect (have known) বা present perfect continuous (have been living) লাগে।'),
        t('Verbs of state (know, believe, own, like, understand) are not used in the -ing form: "have known", not "am knowing".', 'অবস্থা বোঝায় এমন verb (know, believe, own, like, understand) সাধারণত -ing রূপে বসে না: "have known", "am knowing" নয়।'),
        t('Check the time word: since + point of time (since 2015), for + length of time (for ten years).', 'সময়ের শব্দ দেখো: since + সময়ের বিন্দু (since 2015), for + সময়ের দৈর্ঘ্য (for ten years)।'),
      ],
      example: {
        question: t(
          'Improve the bold part: "I **am knowing** him for ten years." (a) know (b) have known (c) knew (d) No improvement',
          'Bold অংশটি ঠিক করো: "I **am knowing** him for ten years." (a) know (b) have known (c) knew (d) No improvement',
        ),
        steps: [
          t('"For ten years" shows the knowing started in the past and still continues.', '"For ten years" দেখাচ্ছে চেনাটা অতীতে শুরু হয়ে এখনো চলছে।'),
          t('So we need the present perfect. "Know" is a state verb, so no -ing form.', 'তাই present perfect লাগবে। "Know" অবস্থা-বোঝানো verb, তাই -ing রূপ হবে না।'),
          t('Correct: "I have known him for ten years."', 'ঠিক বাক্য: "I have known him for ten years."'),
        ],
        answer: t('(b) have known', 'উত্তর: (b) have known'),
      },
      tryIt: {
        question: t('Improve the bold part: "We **are living** in Kolkata since 2015."', 'Bold অংশটি ঠিক করো: "We **are living** in Kolkata since 2015."'),
        options: [t('lived', 'lived'), t('have been living', 'have been living'), t('were living', 'were living'), t('No improvement', 'No improvement')],
        correct: 1,
        explanation: [
          t('"Since 2015" shows the living started in the past and still goes on.', '"Since 2015" দেখাচ্ছে থাকা শুরু হয়েছে অতীতে এবং এখনো চলছে।'),
          t('For such an ongoing action we use the present perfect continuous.', 'এমন চলতে থাকা কাজে present perfect continuous বসে।'),
          t('Correct: "We have been living in Kolkata since 2015."', 'ঠিক বাক্য: "We have been living in Kolkata since 2015."'),
        ],
      },
    },
    {
      key: 'conditionals',
      emoji: '🔀',
      name: t('Conditional sentences (If I were, If I had known)', 'Conditional বাক্য (If I were, If I had known)'),
      spot: t(
        'The bold part is inside an "if" clause, and the other half has "would" or "would have".',
        'Bold অংশটা একটা "if" clause-এর ভেতরে, আর বাক্যের অন্য অংশে "would" বা "would have" আছে।',
      ),
      method: [
        t('Imaginary present: If + past (use "were" for all persons) + would + verb. "If I were rich, I would travel."', 'কাল্পনিক বর্তমান: If + past ("were" সব কর্তার সঙ্গে) + would + verb। "If I were rich, I would travel."'),
        t('Imaginary past: If + had + past participle + would have + past participle. "If I had known, I would have come."', 'কাল্পনিক অতীত: If + had + past participle + would have + past participle। "If I had known, I would have come."'),
        t('Never put "would" or "would have" inside the "if" clause.', '"if" clause-এর ভেতরে কখনো "would" বা "would have" বসবে না।'),
        t('Look at the other half first ("would" or "would have"), then fix the "if" half to match.', 'আগে অন্য অংশটা দেখো ("would" না "would have"), তারপর সেই অনুযায়ী "if" অংশটা ঠিক করো।'),
      ],
      example: {
        question: t(
          'Improve the bold part: "If I **would have known** your address, I would have written to you." (a) knew (b) had known (c) have known (d) No improvement',
          'Bold অংশটি ঠিক করো: "If I **would have known** your address, I would have written to you." (a) knew (b) had known (c) have known (d) No improvement',
        ),
        steps: [
          t('The other half has "would have written", so this is about an imaginary past.', 'অন্য অংশে "would have written" আছে, তাই এটা কাল্পনিক অতীতের কথা।'),
          t('The "if" clause then needs "had + past participle": "had known".', 'তাহলে "if" clause-এ লাগবে "had + past participle": "had known"।'),
          t('Correct: "If I had known your address, I would have written to you."', 'ঠিক বাক্য: "If I had known your address, I would have written to you."'),
        ],
        answer: t('(b) had known', 'উত্তর: (b) had known'),
      },
      tryIt: {
        question: t('Improve the bold part: "If I **was** you, I would accept the offer."', 'Bold অংশটি ঠিক করো: "If I **was** you, I would accept the offer."'),
        options: [t('am', 'am'), t('had been', 'had been'), t('were', 'were'), t('No improvement', 'No improvement')],
        correct: 2,
        explanation: [
          t('"I would accept" shows an imaginary present situation (I am not really you).', '"I would accept" একটা কাল্পনিক বর্তমান অবস্থা বোঝাচ্ছে (আমি আসলে তুমি নই)।'),
          t('In such imaginary "if" clauses, standard English uses "were" with every subject, including "I".', 'এমন কাল্পনিক "if" clause-এ প্রমিত ইংরেজিতে সব কর্তার সঙ্গে, "I"-এর সঙ্গেও, "were" বসে।'),
          t('Correct: "If I were you, I would accept the offer."', 'ঠিক বাক্য: "If I were you, I would accept the offer."'),
        ],
      },
    },
  ],
};
