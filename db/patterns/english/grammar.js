'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'english',
  topic: 'grammar',
  patterns: [
    {
      key: 'articles',
      emoji: '🅰️',
      name: t('Articles: a, an or the', 'Article: a, an না the'),
      spot: t(
        'A blank comes just before a noun or an adjective + noun, and the options are a / an / the / no article.',
        'কোনো noun বা adjective + noun-এর ঠিক আগে একটা শূন্যস্থান, আর option-গুলো a / an / the / no article।',
      ),
      method: [
        t('Go by the first SOUND, not the first letter: "an" before a vowel sound, "a" before a consonant sound.', 'প্রথম অক্ষর নয়, প্রথম উচ্চারণ (sound) দেখো: স্বরধ্বনির আগে "an", ব্যঞ্জনধ্বনির আগে "a"।'),
        t('Silent "h" gives a vowel sound: an hour, an honest man, an heir.', '"h" উচ্চারণ না হলে স্বরধ্বনি হয়: an hour, an honest man, an heir।'),
        t('"U" or "eu" sounding like "you", and "o" sounding like "wa", give a consonant sound: a university, a European, a one-rupee coin.', '"U" বা "eu" যদি "ইউ" শোনায়, আর "o" যদি "ওয়া" শোনায়, তাহলে ব্যঞ্জনধ্বনি: a university, a European, a one-rupee coin।'),
        t('Use "the" for something already known or the only one: the sun, the Ganga, the Himalayas.', 'জানা বা একটাই আছে এমন জিনিসের আগে "the": the sun, the Ganga, the Himalayas।'),
      ],
      example: {
        question: t('Fill in the blank: "He is ___ honest man." (a) a (b) an (c) the (d) no article', 'শূন্যস্থান পূরণ করো: "He is ___ honest man." (a) a (b) an (c) the (d) no article'),
        steps: [
          t('"Honest" is spoken as "onest"; the "h" is silent.', '"Honest"-এর উচ্চারণ "অনেস্ট"; "h" উচ্চারিত হয় না।'),
          t('So it begins with a vowel sound and takes "an".', 'তাই এটা স্বরধ্বনি দিয়ে শুরু, আর এর আগে "an" বসবে।'),
        ],
        answer: t('(b) an — "He is an honest man."', 'উত্তর: (b) an — "He is an honest man."'),
      },
      tryIt: {
        question: t('Fill in the blank: "It took me ___ hour to finish the work."', 'শূন্যস্থান পূরণ করো: "It took me ___ hour to finish the work."'),
        options: [t('a', 'a'), t('an', 'an'), t('the', 'the'), t('no article', 'no article')],
        correct: 1,
        explanation: [
          t('In "hour" the "h" is silent; it sounds like "our".', '"hour"-এ "h" উচ্চারিত হয় না; শোনায় "আওয়ার"।'),
          t('A vowel sound takes "an", so: "It took me an hour to finish the work."', 'স্বরধ্বনির আগে "an" বসে, তাই: "It took me an hour to finish the work."'),
        ],
      },
    },
    {
      key: 'prepositions_time_place',
      emoji: '📅',
      name: t('Prepositions of time and place: in, on, at', 'সময় ও স্থানের preposition: in, on, at'),
      spot: t('A blank comes before a time, a date, a day or a place, and the options are in / on / at and similar words.', 'কোনো সময়, তারিখ, দিন বা জায়গার আগে শূন্যস্থান, আর option-গুলো in / on / at ইত্যাদি।'),
      method: [
        t('AT for an exact clock time or a point: at 6 o\'clock, at night, at the bus stop.', 'নির্দিষ্ট ঘড়ির সময় বা একটা বিন্দুর জন্য AT: at 6 o\'clock, at night, at the bus stop।'),
        t('ON for days and dates: on Monday, on 15 August, on my birthday.', 'দিন আর তারিখের জন্য ON: on Monday, on 15 August, on my birthday।'),
        t('IN for months, years, seasons, parts of the day and big areas: in May, in 2020, in winter, in the morning, in Kolkata.', 'মাস, বছর, ঋতু, দিনের অংশ আর বড় জায়গার জন্য IN: in May, in 2020, in winter, in the morning, in Kolkata।'),
        t('Big unit → in, smaller (day/date) → on, smallest (exact time/point) → at.', 'বড় একক → in, ছোট (দিন/তারিখ) → on, সবচেয়ে ছোট (নির্দিষ্ট সময়/বিন্দু) → at।'),
      ],
      example: {
        question: t('Fill in the blank: "I was born ___ 15 August." (a) in (b) on (c) at (d) by', 'শূন্যস্থান পূরণ করো: "I was born ___ 15 August." (a) in (b) on (c) at (d) by'),
        steps: [
          t('"15 August" is a date.', '"15 August" একটা তারিখ।'),
          t('Dates and days take "on".', 'তারিখ আর দিনের আগে "on" বসে।'),
        ],
        answer: t('(b) on — "I was born on 15 August."', 'উত্তর: (b) on — "I was born on 15 August."'),
      },
      tryIt: {
        question: t('Fill in the blank: "The train will arrive ___ 6:30 pm."', 'শূন্যস্থান পূরণ করো: "The train will arrive ___ 6:30 pm."'),
        options: [t('on', 'on'), t('in', 'in'), t('for', 'for'), t('at', 'at')],
        correct: 3,
        explanation: [
          t('"6:30 pm" is an exact clock time.', '"6:30 pm" একটা নির্দিষ্ট ঘড়ির সময়।'),
          t('An exact time takes "at": "The train will arrive at 6:30 pm."', 'নির্দিষ্ট সময়ের আগে "at" বসে: "The train will arrive at 6:30 pm."'),
        ],
      },
    },
    {
      key: 'question_tags',
      emoji: '❓',
      name: t('Question tags (isn\'t he? shall we?)', 'Question tag — বাক্যের শেষে ছোট প্রশ্ন (isn\'t he? shall we?)'),
      spot: t('The sentence ends with a comma and a blank before the question mark: "She can swim, ___?"', 'বাক্যের শেষে কমা আর প্রশ্নচিহ্নের আগে শূন্যস্থান: "She can swim, ___?"'),
      method: [
        t('Positive sentence → negative tag; negative sentence → positive tag.', 'হ্যাঁ-বাচক বাক্য → না-বাচক tag; না-বাচক বাক্য → হ্যাঁ-বাচক tag।'),
        t('Repeat the helping verb (is, can, will, has...). If there is none, use do/does/did.', 'সাহায্যকারী verb (is, can, will, has...) আবার বসাও। না থাকলে do/does/did বসাও।'),
        t('Use a pronoun in the tag: "Ravi is late, isn\'t he?"', 'Tag-এ pronoun বসাও: "Ravi is late, isn\'t he?"'),
        t('Special cases: "I am..., aren\'t I?", "Let\'s..., shall we?", "Nobody/Everyone..., ... they?", words like never/hardly make the sentence negative.', 'বিশেষ ক্ষেত্র: "I am..., aren\'t I?", "Let\'s..., shall we?", "Nobody/Everyone..., ... they?"; never/hardly থাকলে বাক্যটা না-বাচক ধরা হয়।'),
      ],
      example: {
        question: t('Add the correct tag: "She can swim, ___?" (a) can she (b) can\'t she (c) doesn\'t she (d) isn\'t she', 'ঠিক tag বসাও: "She can swim, ___?" (a) can she (b) can\'t she (c) doesn\'t she (d) isn\'t she'),
        steps: [
          t('The sentence is positive, so the tag must be negative.', 'বাক্যটা হ্যাঁ-বাচক, তাই tag হবে না-বাচক।'),
          t('The helping verb is "can", so the tag uses "can\'t" + "she".', 'সাহায্যকারী verb "can", তাই tag হবে "can\'t" + "she"।'),
        ],
        answer: t('(b) can\'t she — "She can swim, can\'t she?"', 'উত্তর: (b) can\'t she — "She can swim, can\'t she?"'),
      },
      tryIt: {
        question: t('Add the correct tag: "Let\'s go for a walk, ___?"', 'ঠিক tag বসাও: "Let\'s go for a walk, ___?"'),
        options: [t('shall we', 'shall we'), t('don\'t we', 'don\'t we'), t('isn\'t it', 'isn\'t it'), t('won\'t you', 'won\'t you')],
        correct: 0,
        explanation: [
          t('"Let\'s" (let us) is a suggestion that includes the speaker.', '"Let\'s" (let us) মানে একসঙ্গে কিছু করার প্রস্তাব, বক্তা নিজেও তার মধ্যে আছে।'),
          t('The fixed tag for "Let\'s..." is "shall we?": "Let\'s go for a walk, shall we?"', '"Let\'s..."-এর নির্দিষ্ট tag হলো "shall we?": "Let\'s go for a walk, shall we?"'),
        ],
      },
    },
    {
      key: 'active_passive',
      emoji: '🔄',
      name: t('Active to passive voice', 'Active থেকে passive voice'),
      spot: t('The question gives a sentence and asks for its passive (or active) form; the options look alike but differ in tense.', 'একটা বাক্য দিয়ে তার passive (বা active) রূপ চাওয়া হয়েছে; option-গুলো দেখতে প্রায় এক, শুধু tense-এ তফাত।'),
      method: [
        t('Swap places: the object becomes the subject, and the old subject goes after "by".', 'জায়গা বদলাও: object হয়ে যায় subject, আর পুরোনো subject চলে যায় "by"-এর পরে।'),
        t('Use the correct form of "be" + past participle (V3): writes → is written, wrote → was written, has written → has been written.', '"be"-এর ঠিক রূপ + past participle (V3) বসাও: writes → is written, wrote → was written, has written → has been written।'),
        t('Keep the SAME tense as the active sentence. This is where most wrong options go wrong.', 'Active বাক্যের tense একই রাখো। বেশিরভাগ ভুল option এখানেই ভুল করে।'),
        t('Change pronouns: I → me, he → him, they → them after "by".', '"by"-এর পরে pronoun বদলাও: I → me, he → him, they → them।'),
      ],
      example: {
        question: t('Change into passive voice: "Rita writes a letter."', 'Passive voice-এ বদলাও: "Rita writes a letter."'),
        steps: [
          t('Object "a letter" becomes the subject; "Rita" goes after "by".', 'Object "a letter" হবে subject; "Rita" যাবে "by"-এর পরে।'),
          t('"Writes" is simple present, so we use "is" + "written".', '"Writes" simple present, তাই "is" + "written" বসবে।'),
          t('Result: "A letter is written by Rita."', 'ফল: "A letter is written by Rita."'),
        ],
        answer: t('"A letter is written by Rita."', 'উত্তর: "A letter is written by Rita."'),
      },
      tryIt: {
        question: t('Choose the correct passive form: "The police caught the thief."', 'ঠিক passive রূপটি বাছো: "The police caught the thief."'),
        options: [
          t('The thief is caught by the police.', 'The thief is caught by the police.'),
          t('The thief has been caught by the police.', 'The thief has been caught by the police.'),
          t('The thief was caught by the police.', 'The thief was caught by the police.'),
          t('The thief was being caught by the police.', 'The thief was being caught by the police.'),
        ],
        correct: 2,
        explanation: [
          t('"Caught" here is simple past, so the passive needs "was/were" + V3.', 'এখানে "caught" simple past, তাই passive-এ লাগবে "was/were" + V3।'),
          t('"The thief" is singular, so "was caught".', '"The thief" একবচন, তাই "was caught"।'),
          t('"is caught" is present, "has been caught" is present perfect, and "was being caught" is past continuous, so they change the tense.', '"is caught" present, "has been caught" present perfect, আর "was being caught" past continuous — এগুলো tense বদলে দেয়।'),
        ],
      },
    },
    {
      key: 'direct_indirect',
      emoji: '💬',
      name: t('Direct to indirect speech', 'Direct থেকে indirect speech'),
      spot: t('The question gives a sentence with quotation marks and asks for its indirect (reported) form.', 'উদ্ধৃতিচিহ্ন ("...") সহ একটা বাক্য দিয়ে তার indirect (reported) রূপ চাওয়া হয়েছে।'),
      method: [
        t('Change "said to" → "told"; for a plain statement, join with "that".', '"said to" → "told" হবে; সাধারণ বিবৃতিতে "that" দিয়ে জোড়ো।'),
        t('If the reporting verb is past (said), move the tense one step back: am/is → was, will → would, can → could, present perfect → past perfect.', 'Reporting verb অতীতে (said) হলে tense এক ধাপ পিছিয়ে দাও: am/is → was, will → would, can → could, present perfect → past perfect।'),
        t('Change pronouns to match the speaker and the listener (I → he/she, you → me/him...).', 'বক্তা আর শ্রোতা অনুযায়ী pronoun বদলাও (I → he/she, you → me/him...)।'),
        t('Change time and place words: now → then, today → that day, tomorrow → the next day, yesterday → the previous day, here → there.', 'সময় ও জায়গার শব্দ বদলাও: now → then, today → that day, tomorrow → the next day, yesterday → the previous day, here → there।'),
      ],
      example: {
        question: t('Change into indirect speech: He said, "I am tired."', 'Indirect speech-এ বদলাও: He said, "I am tired."'),
        steps: [
          t('It is a statement, so we join with "that".', 'এটা একটা বিবৃতি, তাই "that" দিয়ে জোড়া হবে।'),
          t('"I" refers to "he", so "I" → "he".', '"I" বলতে "he"-কে বোঝাচ্ছে, তাই "I" → "he"।'),
          t('"Said" is past, so "am" → "was".', '"Said" অতীত, তাই "am" → "was"।'),
        ],
        answer: t('He said that he was tired.', 'উত্তর: He said that he was tired.'),
      },
      tryIt: {
        question: t('Choose the correct indirect speech: She said to me, "I will help you tomorrow."', 'ঠিক indirect speech-টি বাছো: She said to me, "I will help you tomorrow."'),
        options: [
          t('She told me that she will help you tomorrow.', 'She told me that she will help you tomorrow.'),
          t('She told me that she would help me the next day.', 'She told me that she would help me the next day.'),
          t('She said me that she would help me the next day.', 'She said me that she would help me the next day.'),
          t('She told me that I would help her the next day.', 'She told me that I would help her the next day.'),
        ],
        correct: 1,
        explanation: [
          t('"Said to me" → "told me", and "will" → "would" because the reporting verb is past.', '"Said to me" → "told me", আর reporting verb অতীত বলে "will" → "would"।'),
          t('"I" (the speaker) → "she", "you" (the listener, me) → "me"; "tomorrow" → "the next day".', '"I" (বক্তা) → "she", "you" (শ্রোতা, অর্থাৎ আমি) → "me"; "tomorrow" → "the next day"।'),
          t('"Said me" is wrong English, and the last option swaps who helps whom.', '"Said me" ভুল ইংরেজি, আর শেষ option-এ কে কাকে সাহায্য করবে সেটা উল্টে গেছে।'),
        ],
      },
    },
  ],
};
