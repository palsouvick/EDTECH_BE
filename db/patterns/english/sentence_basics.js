'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'english',
  topic: 'sentence_basics',
  patterns: [
    {
      key: 'sentence_kinds',
      emoji: '📝',
      name: t('Name the kind of sentence', 'বাক্যের ধরনের নাম বলো'),
      spot: t(
        'The question asks what kind of sentence is given, or which option is an interrogative, imperative or exclamatory sentence.',
        'কোন ধরনের বাক্য দেওয়া আছে, বা কোন option-টি interrogative, imperative বা exclamatory বাক্য, তা জানতে চাওয়া হয়েছে।',
      ),
      method: [
        t('Affirmative gives information and ends with a full stop: "She is happy."', 'Affirmative তথ্য দেয়, full stop দিয়ে শেষ হয়: "She is happy."'),
        t('Interrogative asks and ends with ?: the helping verb comes first — "Is she happy?"', 'Interrogative প্রশ্ন করে, ? দিয়ে শেষ হয়: helping verb আগে আসে — "Is she happy?"'),
        t('Imperative orders or requests: the verb comes first and "you" stays hidden — "Close the door."', 'Imperative আদেশ বা অনুরোধ করে: verb আগে আসে, "you" লুকিয়ে থাকে — "Close the door."'),
        t('Exclamatory shows sudden, strong feeling and ends with !, starting with What or How: "What a beautiful garden!"', 'Exclamatory হঠাৎ জোরালো অনুভূতি দেখায়, ! দিয়ে শেষ হয়, What বা How দিয়ে শুরু: "What a beautiful garden!"'),
      ],
      example: {
        question: t('What kind of sentence is this? "What a beautiful garden!" (a) Affirmative (b) Interrogative (c) Imperative (d) Exclamatory', 'এটি কোন ধরনের বাক্য? "What a beautiful garden!" (a) Affirmative (b) Interrogative (c) Imperative (d) Exclamatory'),
        steps: [
          t('Look at the end mark: "!" — it shows a sudden, strong feeling.', 'শেষ চিহ্ন দেখো: "!" — এটি হঠাৎ জোরালো অনুভূতি দেখাচ্ছে।'),
          t('It starts with "What", which is the mark of an exclamatory sentence.', 'এটি "What" দিয়ে শুরু, যা exclamatory বাক্যের চিহ্ন।'),
        ],
        answer: t('(d) Exclamatory', 'উত্তর: (d) Exclamatory'),
      },
      tryIt: {
        question: t('Which one is an interrogative sentence?', 'কোনটি interrogative বাক্য?'),
        options: [
          t('She is happy.', 'She is happy.'),
          t('Is she happy?', 'Is she happy?'),
          t('Close the door.', 'Close the door.'),
          t('What a day!', 'What a day!'),
        ],
        correct: 1,
        explanation: [
          t('An interrogative sentence asks a question: the helping verb comes first and it ends with "?".', 'Interrogative বাক্য প্রশ্ন করে: helping verb আগে আসে, "?" দিয়ে শেষ হয়।'),
          t('"She is happy." is a statement, "Close the door." is an order, and "What a day!" is exclamatory.', '"She is happy." বিবৃতি, "Close the door." আদেশ, আর "What a day!" বিস্ময়বাচক।'),
        ],
      },
    },
    {
      key: 'make_negative_question',
      emoji: '🔄',
      name: t('Change the form: negative and questions', 'রূপ বদলাও: negative ও প্রশ্ন'),
      spot: t(
        'The question asks you to make a sentence negative, or to turn a statement into a yes/no or wh-question.',
        'বাক্যটিকে negative করতে, বা বিবৃতিকে yes/no বা wh-প্রশ্নে বদলাতে বলা হয়েছে।',
      ),
      method: [
        t('With a helping verb, put NOT just after it: "She is not happy."', 'Helping verb থাকলে তার ঠিক পরে NOT বসাও: "She is not happy."'),
        t('With no helping verb, bring in DO / DOES / DID + NOT and use the plain verb: "He does not play."', 'Helping verb না থাকলে DO / DOES / DID + NOT আনো, আর verb-এর আসল রূপ ব্যবহার করো: "He does not play."'),
        t('For a yes/no question, move the helper before the subject: "Is she happy?" With no helper: "Does he play?"', 'Yes/no প্রশ্নে helper-কে subject-এর আগে আনো: "Is she happy?" Helper না থাকলে: "Does he play?"'),
        t('After does / did the verb is always plain: never "does not plays" or "did not went".', 'Does / did-এর পরে verb সবসময় আসল রূপে থাকে: "does not plays" বা "did not went" কখনও নয়।'),
      ],
      example: {
        question: t('Make this sentence negative: "Rahul watches TV every night." (a) Rahul does not watch TV every night. (b) Rahul does not watches TV every night. (c) Rahul not watches TV every night. (d) Rahul did not watch TV every night.', 'এই বাক্যটিকে negative করো: "Rahul watches TV every night." (a) Rahul does not watch TV every night. (b) Rahul does not watches TV every night. (c) Rahul not watches TV every night. (d) Rahul did not watch TV every night.'),
        steps: [
          t('There is no helping verb. The sentence is simple present with "Rahul" (third person singular), so bring in "does not".', 'কোনো helping verb নেই। বাক্যটি simple present, "Rahul" third person singular, তাই "does not" আনতে হবে।'),
          t('The main verb goes back to its plain form: "watches" becomes "watch".', 'Main verb আসল রূপে ফিরবে: "watches" হয়ে যাবে "watch"।'),
        ],
        answer: t('(a) Rahul does not watch TV every night.', 'উত্তর: (a) Rahul does not watch TV every night.'),
      },
      tryIt: {
        question: t('Make a yes/no question: "She went home."', 'Yes/no প্রশ্ন বানাও: "She went home."'),
        options: [
          t('Did she go home?', 'Did she go home?'),
          t('Does she go home?', 'Does she go home?'),
          t('Did she went home?', 'Did she went home?'),
          t('Went she home?', 'Went she home?'),
        ],
        correct: 0,
        explanation: [
          t('The sentence is past tense with no helping verb, so bring in "did" and use the plain verb "go".', 'বাক্যটি অতীত কালে, helping verb নেই, তাই "did" আনো এবং verb-এর আসল রূপ "go" ব্যবহার করো।'),
          t('"Does" is present tense, "went" after "did" is wrong, and "went she home" has no helper at all.', '"Does" বর্তমান কাল, "did"-এর পরে "went" ভুল, আর "went she home"-এ কোনো helper-ই নেই।'),
        ],
      },
    },
    {
      key: 'fragments',
      emoji: '🧩',
      name: t('Complete sentence or fragment?', 'সম্পূর্ণ বাক্য না fragment?'),
      spot: t(
        'The question asks which group of words is a complete sentence, or which one is only a fragment.',
        'শব্দের কোন দলটি সম্পূর্ণ বাক্য, বা কোনটি শুধু fragment (অসম্পূর্ণ অংশ), তা জানতে চাওয়া হয়েছে।',
      ),
      method: [
        t('A complete sentence needs three things: a subject, a finite verb (a verb that shows tense), and complete sense.', 'সম্পূর্ণ বাক্যের তিনটি জিনিস দরকার: একটি subject, একটি finite verb (যে verb কাল দেখায়), এবং সম্পূর্ণ অর্থ।'),
        t('Read the group of words alone. If it cannot stand alone as a statement or question, it is a fragment.', 'শব্দের দলটিকে একা পড়ো। একা বিবৃতি বা প্রশ্ন হিসেবে দাঁড়াতে না পারলে সেটি fragment।'),
        t('Groups starting with because, when, although or if are usually fragments — they wait for a main part.', 'Because, when, although বা if দিয়ে শুরু দলগুলো সাধারণত fragment — এরা মূল অংশের অপেক্ষায় থাকে।'),
      ],
      example: {
        question: t('Which one is a complete sentence? (a) "After the rain stopped." (b) "After the rain stopped, we went out."', 'কোনটি সম্পূর্ণ বাক্য? (a) "After the rain stopped." (b) "After the rain stopped, we went out."'),
        steps: [
          t('Read (a) alone: "After the rain stopped..." — we keep waiting. What happened then? The sense is not complete.', '(a) একা পড়ো: "After the rain stopped..." — আমরা অপেক্ষায় থাকি। তারপর কী হল? অর্থ সম্পূর্ণ নয়।'),
          t('Sentence (b) adds the main part "we went out", so the sense is complete.', '(b) বাক্যে মূল অংশ "we went out" যোগ হয়েছে, তাই অর্থ সম্পূর্ণ।'),
        ],
        answer: t('(b) is the complete sentence. (a) is only a fragment.', 'উত্তর: (b) সম্পূর্ণ বাক্য। (a) শুধু একটি fragment।'),
      },
      tryIt: {
        question: t('Which group of words is a fragment?', 'শব্দের কোন দলটি fragment?'),
        options: [
          t('The boy in the blue shirt is my friend.', 'The boy in the blue shirt is my friend.'),
          t('Because he was ill, he stayed at home.', 'Because he was ill, he stayed at home.'),
          t('Running fast down the road.', 'Running fast down the road.'),
          t('She sings well.', 'She sings well.'),
        ],
        correct: 2,
        explanation: [
          t('"Running fast down the road" has no subject and no finite verb — it cannot stand alone.', '"Running fast down the road"-এ subject নেই, finite verb নেই — এটি একা দাঁড়াতে পারে না।'),
          t('The other three each have a subject, a finite verb and complete sense.', 'বাকি তিনটির প্রতিটিতে subject, finite verb ও সম্পূর্ণ অর্থ আছে।'),
        ],
      },
    },
  ],
};
