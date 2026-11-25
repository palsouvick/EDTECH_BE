'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'english',
  topic: 'question_tags',
  patterns: [
    {
      key: 'tag_basics',
      emoji: '❓',
      name: t('The golden rule: opposite tag, copied helper, pronoun', 'সোনার নিয়ম: উল্টো tag, নকল helper, pronoun'),
      spot: t(
        'The sentence ends with a comma and a blank before the question mark: "She can swim, ___?"',
        'বাক্যের শেষে কমা আর প্রশ্নচিহ্নের আগে শূন্যস্থান: "She can swim, ___?"',
      ),
      method: [
        t('Positive sentence → negative tag (with n\'t); negative sentence → positive tag (no n\'t).', 'হ্যাঁ-বাচক বাক্য → না-বাচক tag (n\'t দিয়ে); না-বাচক বাক্য → হ্যাঁ-বাচক tag (n\'t ছাড়া)।'),
        t('Copy the helping verb: is, can, will, has. The tag keeps the same auxiliary.', 'সাহায্যকারী verb নকল করো: is, can, will, has। Tag একই auxiliary রাখে।'),
        t('End with a pronoun, never a name: "Ravi is late, isn\'t he?" — never "isn\'t Ravi".', 'Pronoun দিয়ে শেষ করো, নাম দিয়ে নয়: "Ravi is late, isn\'t he?" — "isn\'t Ravi" কখনও নয়।'),
        t('Cannot counts as negative: "He cannot swim, can he?"', 'Cannot না-বাচক হিসেবে ধরা হয়: "He cannot swim, can he?"'),
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
        question: t('Add the correct tag: "Rahul is late, ___?"', 'ঠিক tag বসাও: "Rahul is late, ___?"'),
        options: [t('isn\'t he', 'isn\'t he'), t('isn\'t Rahul', 'isn\'t Rahul'), t('is he', 'is he'), t('doesn\'t he', 'doesn\'t he')],
        correct: 0,
        explanation: [
          t('The statement is positive, so the tag is negative: "isn\'t".', 'বিবৃতিটি হ্যাঁ-বাচক, তাই tag না-বাচক: "isn\'t"।'),
          t('The tag uses a pronoun, never a name: "isn\'t he", not "isn\'t Rahul".', 'Tag-এ pronoun বসে, নাম নয়: "isn\'t he", "isn\'t Rahul" নয়।'),
        ],
      },
    },
    {
      key: 'tags_do_does_did',
      emoji: '🔧',
      name: t('No helper? Borrow do / does / did', 'Helper নেই? do / does / did ধার নাও'),
      spot: t(
        'The sentence is in the simple present or simple past with no helping verb: "He plays football, ___?"',
        'বাক্যটি simple present বা simple past-এ, কোনো helping verb নেই: "He plays football, ___?"',
      ),
      method: [
        t('Simple present with he / she / it → DOES: "He plays football, doesn\'t he?"', 'He / she / it-এর সঙ্গে simple present → DOES: "He plays football, doesn\'t he?"'),
        t('Simple present with I / you / we / they → DO: "They live here, don\'t they?"', 'I / you / we / they-এর সঙ্গে simple present → DO: "They live here, don\'t they?"'),
        t('Simple past (all persons) → DID: "She wrote a letter, didn\'t she?"', 'Simple past (সবার ক্ষেত্রে) → DID: "She wrote a letter, didn\'t she?"'),
        t('The tag follows the TENSE, not the words: "He played, didn\'t he?" — never "doesn\'t".', 'Tag বিবৃতির কাল মেনে চলে, তার শব্দ নয়: "He played, didn\'t he?" — "doesn\'t" কখনও নয়।'),
      ],
      example: {
        question: t('Add the correct tag: "He plays football, ___?" (a) doesn\'t he (b) don\'t he (c) didn\'t he (d) isn\'t he', 'ঠিক tag বসাও: "He plays football, ___?" (a) doesn\'t he (b) don\'t he (c) didn\'t he (d) isn\'t he'),
        steps: [
          t('There is no helping verb. The sentence is simple present with "he", so borrow "does".', 'কোনো helping verb নেই। বাক্যটি simple present, subject "he", তাই "does" ধার নাও।'),
          t('The statement is positive, so the tag is negative: "doesn\'t". The pronoun is "he".', 'বিবৃতি হ্যাঁ-বাচক, তাই tag না-বাচক: "doesn\'t"। Pronoun হল "he"।'),
        ],
        answer: t('(a) doesn\'t he — "He plays football, doesn\'t he?"', 'উত্তর: (a) doesn\'t he — "He plays football, doesn\'t he?"'),
      },
      tryIt: {
        question: t('Add the correct tag: "The boys went home, ___?"', 'ঠিক tag বসাও: "The boys went home, ___?"'),
        options: [t('don\'t they', 'don\'t they'), t('didn\'t they', 'didn\'t they'), t('doesn\'t they', 'doesn\'t they'), t('weren\'t they', 'weren\'t they')],
        correct: 1,
        explanation: [
          t('The sentence is simple past with no helping verb, so borrow "did".', 'বাক্যটি simple past, helping verb নেই, তাই "did" ধার নাও।'),
          t('The statement is positive, so the tag is negative: "didn\'t". "The boys" becomes the pronoun "they".', 'বিবৃতি হ্যাঁ-বাচক, তাই tag না-বাচক: "didn\'t"। "The boys" pronoun হয়ে যায় "they"।'),
        ],
      },
    },
    {
      key: 'tags_special_subjects',
      emoji: '👥',
      name: t('Nobody, everybody, nothing — and negative words', 'Nobody, everybody, nothing — আর না-বাচক শব্দ'),
      spot: t(
        'The subject is nobody, everybody, nothing, or the sentence has never, hardly, few or little.',
        'Subject nobody, everybody, nothing, বা বাক্যে never, hardly, few বা little আছে।',
      ),
      method: [
        t('Nobody, everybody, somebody, anyone → THEY. Nothing, everything, something → IT.', 'Nobody, everybody, somebody, anyone-এর pronoun THEY। Nothing, everything, something-এর pronoun IT।'),
        t('Nobody and nothing MEAN negative, so their tags are POSITIVE: "Nobody called, did they?"', 'Nobody আর nothing অর্থে না-বাচক, তাই এদের tag হ্যাঁ-বাচক: "Nobody called, did they?"'),
        t('Never, hardly, scarcely, seldom, rarely, few, little also make the sentence negative: "He never comes late, does he?"', 'Never, hardly, scarcely, seldom, rarely, few, little-ও বাক্যকে না-বাচক করে: "He never comes late, does he?"'),
        t('But A FEW (some) is positive: "A few students passed, didn\'t they?"', 'কিন্তু A FEW (কিছু) হ্যাঁ-বাচক: "A few students passed, didn\'t they?"'),
      ],
      example: {
        question: t('Add the correct tag: "Nobody phoned, ___?" (a) didn\'t they (b) did they (c) doesn\'t they (d) isn\'t it', 'ঠিক tag বসাও: "Nobody phoned, ___?" (a) didn\'t they (b) did they (c) doesn\'t they (d) isn\'t it'),
        steps: [
          t('"Nobody" takes the pronoun "they".', '"Nobody"-র pronoun হল "they"।'),
          t('"Nobody" means negative, so the tag must be positive — no n\'t. The sentence is past, so "did".', '"Nobody" অর্থে না-বাচক, তাই tag হ্যাঁ-বাচক হবে — n\'t ছাড়া। বাক্যটি অতীত কালে, তাই "did"।'),
        ],
        answer: t('(b) did they — "Nobody phoned, did they?"', 'উত্তর: (b) did they — "Nobody phoned, did they?"'),
      },
      tryIt: {
        question: t('Add the correct tag: "She hardly speaks, ___?"', 'ঠিক tag বসাও: "She hardly speaks, ___?"'),
        options: [t('doesn\'t she', 'doesn\'t she'), t('does she', 'does she'), t('didn\'t she', 'didn\'t she'), t('does not she', 'does not she')],
        correct: 1,
        explanation: [
          t('"Hardly" carries a negative meaning, so the statement counts as negative and the tag is positive.', '"Hardly" না-বাচক অর্থ বহন করে, তাই বিবৃতিটি না-বাচক ধরা হয়, আর tag হ্যাঁ-বাচক হয়।'),
          t('Present tense with "she" and no helper → "does": "She hardly speaks, does she?"', 'বর্তমান কাল, "she", helper নেই → "does": "She hardly speaks, does she?"'),
        ],
      },
    },
    {
      key: 'tags_exceptions',
      emoji: '⭐',
      name: t('Fixed exceptions: I am, let\'s, orders, used to, have got', 'নির্দিষ্ট ব্যতিক্রম: I am, let\'s, আদেশ, used to, have got'),
      spot: t(
        'The sentence starts with "I am", "Let\'s", an order, "used to", "have got" or "there".',
        'বাক্য "I am", "Let\'s", কোনো আদেশ, "used to", "have got" বা "there" দিয়ে শুরু।',
      ),
      method: [
        t('I AM → AREN\'T I? (there is no "amn\'t"). I am not → am I?', 'I AM → AREN\'T I? ("amn\'t" বলে কিছু নেই)। I am not → am I?'),
        t('LET\'S (a suggestion) → SHALL WE? Imperatives (orders, requests) → WILL YOU?', 'LET\'S (প্রস্তাব) → SHALL WE? Imperative (আদেশ, অনুরোধ) → WILL YOU?'),
        t('USED TO → DID. HAVE GOT → HAVE. THERE stays THERE: "There is little hope, is there?"', 'USED TO → DID। HAVE GOT → HAVE। THERE একই থাকে: "There is little hope, is there?"'),
        t('HAVE meaning OWNING is a main verb, so use DO: "She has a car, doesn\'t she?" But HAVE as a helper keeps HAVE: "She has finished, hasn\'t she?"', 'HAVE মালিকানা বোঝালে সেটি main verb, তাই DO বসে: "She has a car, doesn\'t she?" কিন্তু helper হিসেবে HAVE থাকলে HAVE-ই থাকে: "She has finished, hasn\'t she?"'),
      ],
      example: {
        question: t('Add the correct tag: "I am your friend, ___?" (a) amn\'t I (b) aren\'t I (c) am I (d) isn\'t I', 'ঠিক tag বসাও: "I am your friend, ___?" (a) amn\'t I (b) aren\'t I (c) am I (d) isn\'t I'),
        steps: [
          t('The statement is positive, so the tag must be negative.', 'বিবৃতিটি হ্যাঁ-বাচক, তাই tag না-বাচক হবে।'),
          t('There is no "amn\'t" in English. The fixed tag for "I am" is "aren\'t I".', 'ইংরেজিতে "amn\'t" বলে কিছু নেই। "I am"-এর নির্দিষ্ট tag হল "aren\'t I"।'),
        ],
        answer: t('(b) aren\'t I — "I am your friend, aren\'t I?"', 'উত্তর: (b) aren\'t I — "I am your friend, aren\'t I?"'),
      },
      tryIt: {
        question: t('Add the correct tag: "Open the door, ___?"', 'ঠিক tag বসাও: "Open the door, ___?"'),
        options: [t('shall we', 'shall we'), t('will you', 'will you'), t('won\'t you', 'won\'t you'), t('do you', 'do you')],
        correct: 1,
        explanation: [
          t('"Open the door" is an imperative — an order.', '"Open the door" একটি imperative — আদেশ।'),
          t('Imperatives take "will you": "Open the door, will you?" "Shall we" is only for "Let\'s".', 'Imperative নেয় "will you": "Open the door, will you?" "Shall we" শুধু "Let\'s"-এর জন্য।'),
        ],
      },
    },
  ],
};
