'use strict';

const t = (en, bn) => ({ en, bn });
const opts = (...s) => s.map((x) => t(x, x));

module.exports = {
  subject: 'english',
  topic: 'narration',
  patterns: [
    {
      key: 'tense_backshift',
      emoji: '⬅️',
      name: t('Tense moves one step back', 'Tense এক ধাপ পিছিয়ে যায়'),
      spot: t(
        'The reporting verb is in the past (said, told, asked), and the reported speech has a present or future verb.',
        'Reporting verb অতীতে (said, told, asked), আর reported speech-এ বর্তমান বা ভবিষ্যতের verb আছে।',
      ),
      method: [
        t('Remove the quotation marks and the comma, and add "that".', 'Quotation mark আর কমা তুলে দিয়ে "that" বসাও।'),
        t('Move the verb one step back: am/is -> was, are -> were, work -> worked, will -> would, can -> could, may -> might.', 'Verb এক ধাপ পিছিয়ে দাও: am/is -> was, are -> were, work -> worked, will -> would, can -> could, may -> might।'),
        t('Present perfect and simple past both become past perfect: have worked / worked -> had worked.', 'Present perfect আর simple past দুটোই past perfect হয়: have worked / worked -> had worked।'),
      ],
      example: {
        question: t('Change into indirect speech: He said, "I am busy."', 'Indirect speech-এ বদলাও: He said, "I am busy."'),
        steps: [
          t('The reporting verb "said" is past, so "am" moves one step back: am -> was.', 'Reporting verb "said" অতীত, তাই "am" এক ধাপ পিছোয়: am -> was।'),
          t('"I" is the speaker, so it becomes "he". Add "that".', '"I" বক্তা, তাই "he" হয়। "that" বসাও।'),
        ],
        answer: t('He said that he was busy.', 'উত্তর: He said that he was busy.'),
      },
      tryIt: {
        question: t('Change into indirect speech: She said, "I like tea."', 'Indirect speech-এ বদলাও: She said, "I like tea."'),
        options: opts('She said that she was liking tea.', 'She said that she had liked tea.', 'She said that she liked tea.', 'She said that she will like tea.'),
        correct: 2,
        explanation: [
          t('"Said" is past, so the simple present "like" moves one step back to the simple past "liked".', '"Said" অতীত, তাই simple present "like" এক ধাপ পিছিয়ে simple past "liked" হয়।'),
          t('"I" becomes "she": "She said that she liked tea."', '"I" হয় "she": "She said that she liked tea."'),
        ],
      },
    },
    {
      key: 'pronoun_change',
      emoji: '👥',
      name: t('Pronouns follow the speaker and the listener', 'Pronoun বদলায় বক্তা ও শ্রোতা অনুযায়ী'),
      spot: t(
        'The reported speech contains I, my, me or you, your, and the sentence has a speaker and a listener.',
        'Reported speech-এ I, my, me বা you, your আছে, আর বাক্যে একজন বক্তা ও একজন শ্রোতা আছে।',
      ),
      method: [
        t('Ask: who is speaking and who is listening?', 'ভাবো: কে বলছে আর কে শুনছে?'),
        t('I / my / me change to match the speaker (he, she, his, her).', 'I / my / me বদলে বক্তার সঙ্গে মেলে (he, she, his, her)।'),
        t('You / your change to match the listener (me if it is you who is reporting, or him / her if it is another person).', 'You / your বদলে শ্রোতার সঙ্গে মেলে (তুমি নিজে report করলে me, অন্য কেউ হলে him / her)।'),
        t('He / she / they usually stay the same.', 'He / she / they সাধারণত একই থাকে।'),
      ],
      example: {
        question: t('Fill in the blank: Ravi said to me, "I will help you." -> Ravi told me that ___ would help me. (he / I / you)', 'শূন্যস্থান পূরণ করো: Ravi said to me, "I will help you." -> Ravi told me that ___ would help me. (he / I / you)'),
        steps: [
          t('"I" is the speaker, Ravi. When I report it, Ravi is "he".', '"I" বক্তা, অর্থাৎ Ravi। আমি report করলে Ravi হয় "he"।'),
          t('Keeping "I" would mean that I (the listener) am the one helping. Also "will" becomes "would" and "you" becomes "me".', '"I" রাখলে মনে হত আমিই (শ্রোতা) সাহায্য করব। আর "will" হয় "would", "you" হয় "me"।'),
        ],
        answer: t('he — "Ravi told me that he would help me."', 'উত্তর: he — "Ravi told me that he would help me."'),
      },
      tryIt: {
        question: t('Change into indirect speech: Hari said to Gopal, "I will give you my notes."', 'Indirect speech-এ বদলাও: Hari said to Gopal, "I will give you my notes."'),
        options: opts('Hari told Gopal that I would give you my notes.', 'Hari told Gopal that he would give him his notes.', 'Hari told Gopal that Gopal would give him his notes.', 'Hari told Gopal that he would give you his notes.'),
        correct: 1,
        explanation: [
          t('"I" is Hari the speaker, so it becomes "he", and "my" becomes "his". "You" is Gopal the listener, so it becomes "him".', '"I" বক্তা Hari, তাই "he", আর "my" হয় "his"। "You" শ্রোতা Gopal, তাই "him"।'),
          t('"Will" moves back to "would": "Hari told Gopal that he would give him his notes."', '"Will" পিছিয়ে "would": "Hari told Gopal that he would give him his notes."'),
        ],
      },
    },
    {
      key: 'time_place_words',
      emoji: '🕰️',
      name: t('Time and place words change', 'সময় ও স্থানের শব্দ বদলায়'),
      spot: t(
        'The reported speech contains now, today, tomorrow, yesterday, ago, here, this or these.',
        'Reported speech-এ now, today, tomorrow, yesterday, ago, here, this বা these আছে।',
      ),
      method: [
        t('now -> then, today -> that day, here -> there, this / these -> that / those, ago -> before.', 'এই বদলগুলো মনে রাখো: now -> then, today -> that day, here -> there, this / these -> that / those, ago -> before।'),
        t('tomorrow -> the next day / the following day.', 'আগামীকাল বোঝাতে: tomorrow -> the next day / the following day।'),
        t('yesterday -> the day before / the previous day. Note that tomorrow and yesterday go in opposite directions.', 'yesterday -> the day before / the previous day। মনে রেখো tomorrow আর yesterday উল্টো দিকে যায়।'),
      ],
      example: {
        question: t('Fill in the blank: He said, "I will come tomorrow." -> He said that he would come ___. (that day / the next day / the day before)', 'শূন্যস্থান পূরণ করো: He said, "I will come tomorrow." -> He said that he would come ___. (that day / the next day / the day before)'),
        steps: [
          t('"Tomorrow" is the day after the speaking day, so it becomes "the next day".', '"Tomorrow" বলার দিনের পরের দিন, তাই "the next day" হয়।'),
          t('"The day before" is for "yesterday", the opposite direction.', '"The day before" "yesterday"-র জন্য, উল্টো দিক।'),
        ],
        answer: t('the next day — "He said that he would come the next day."', 'উত্তর: the next day — "He said that he would come the next day."'),
      },
      tryIt: {
        question: t('Change into indirect speech: She said, "I joined this office two years ago."', 'Indirect speech-এ বদলাও: She said, "I joined this office two years ago."'),
        options: opts('She said that she joined this office two years ago.', 'She said that she had joined that office two years before.', 'She said that she had joined that office two years later.', 'She said that she joined that office two years before.'),
        correct: 1,
        explanation: [
          t('"This" becomes "that" and "ago" becomes "before".', '"This" হয় "that" আর "ago" হয় "before"।'),
          t('"Joined" is simple past, so it moves back to "had joined": "She said that she had joined that office two years before."', '"Joined" simple past, তাই পিছিয়ে "had joined": "She said that she had joined that office two years before."'),
        ],
      },
    },
    {
      key: 'said_told_error',
      emoji: '🗨️',
      name: t('said to me or told me', 'said to me না told me'),
      spot: t(
        'A reporting verb is followed directly by a person (me, him, her, Gopal), and the options are said and told.',
        'Reporting verb-এর ঠিক পরেই একজন মানুষ (me, him, her, Gopal), আর option-এ said ও told।',
      ),
      method: [
        t('"Said" is not followed directly by a person.', '"Said"-এর পরে সরাসরি মানুষ বসে না।'),
        t('Use "told" + person, or "said to" + person.', '"Told" + person, বা "said to" + person ব্যবহার করো।'),
        t('Check that the rest of the sentence (backshift, pronoun) is already correct before changing anything else.', 'আর কিছু বদলানোর আগে দেখে নাও বাকি অংশ (backshift, pronoun) ঠিক আছে কি না।'),
      ],
      example: {
        question: t('Spot the error: "He (A) said me (B) that he was (C) tired."', 'ভুল খোঁজো: "He (A) said me (B) that he was (C) tired."'),
        steps: [
          t('"Said" cannot be followed directly by "me". We need "told me" (or "said to me").', '"Said"-এর পরে সরাসরি "me" বসে না। "told me" (বা "said to me") লাগবে।'),
          t('The rest is correct: "was" is the backshift of "am", and "he" is right.', 'বাকিটা ঠিক: "was" হল "am"-এর backshift, আর "he" সঠিক।'),
        ],
        answer: t('A ("said me" should be "told me")', 'উত্তর: A ("said me"-এর জায়গায় "told me" হবে)'),
      },
      tryIt: {
        question: t('Fill in the blank: "She ___ me that she was late."', 'শূন্যস্থান পূরণ করো: "She ___ me that she was late."'),
        options: opts('said', 'spoke', 'talked', 'told'),
        correct: 3,
        explanation: [
          t('The verb is followed directly by the person "me", and "said" cannot take a person directly.', 'Verb-এর পরে সরাসরি "me", আর "said" সরাসরি মানুষের সঙ্গে বসে না।'),
          t('"Told" takes a person: "She told me that she was late." ("Spoke" and "talked" need "to".)', '"Told"-এর পরে মানুষ বসে: "She told me that she was late." ("Spoke" ও "talked"-এর পরে "to" লাগে।)'),
        ],
      },
    },
    {
      key: 'no_backshift',
      emoji: '🌍',
      name: t('When the tense does not move back', 'যখন tense পিছোয় না'),
      spot: t(
        'The reporting verb is in the present or future (says, will say), or the reported speech is a proverb or a scientific fact.',
        'Reporting verb বর্তমান বা ভবিষ্যতে (says, will say), অথবা reported speech একটা প্রবাদ বা বৈজ্ঞানিক সত্য।',
      ),
      method: [
        t('Present or future reporting verb (says, has said, will say): keep the tense as it is and adjust only the pronouns.', 'Reporting verb বর্তমান বা ভবিষ্যৎ (says, has said, will say) হলে tense যেমন আছে রাখো, শুধু pronoun মেলাও।'),
        t('Universal truths, proverbs and scientific facts keep the present tense even after "said".', 'সার্বজনীন সত্য, প্রবাদ আর বৈজ্ঞানিক তথ্য "said"-এর পরেও present tense-এ থাকে।'),
        t('So check the type of statement before you apply backshift.', 'তাই backshift করার আগে বক্তব্যের ধরন দেখে নাও।'),
      ],
      example: {
        question: t('Change into indirect speech: He says, "I am tired."', 'Indirect speech-এ বদলাও: He says, "I am tired."'),
        steps: [
          t('The reporting verb "says" is present, so the tense inside does not change.', 'Reporting verb "says" বর্তমান, তাই ভিতরের tense বদলায় না।'),
          t('Only the pronoun changes: "I" becomes "he".', 'শুধু pronoun বদলায়: "I" হয় "he"।'),
        ],
        answer: t('He says that he is tired.', 'উত্তর: He says that he is tired.'),
      },
      tryIt: {
        question: t('Change into indirect speech: The teacher said, "The earth moves round the sun."', 'Indirect speech-এ বদলাও: The teacher said, "The earth moves round the sun."'),
        options: opts('The teacher said that the earth moved round the sun.', 'The teacher said that the earth had moved round the sun.', 'The teacher said that the earth was moving round the sun.', 'The teacher said that the earth moves round the sun.'),
        correct: 3,
        explanation: [
          t('"The earth moves round the sun" is a scientific fact, a universal truth.', '"The earth moves round the sun" একটা বৈজ্ঞানিক সত্য, সার্বজনীন সত্য।'),
          t('A universal truth keeps the present tense even after "said": "The teacher said that the earth moves round the sun."', 'সার্বজনীন সত্য "said"-এর পরেও present tense-এ থাকে: "The teacher said that the earth moves round the sun."'),
        ],
      },
    },
  ],
};
