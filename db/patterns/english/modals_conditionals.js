'use strict';

const t = (en, bn) => ({ en, bn });
const opts = (...s) => s.map((x) => t(x, x));

module.exports = {
  subject: 'english',
  topic: 'modals_conditionals',
  patterns: [
    {
      key: 'modal_base_verb',
      emoji: '🧱',
      name: t('After a modal, the base verb', 'Modal-এর পরে base verb'),
      spot: t(
        'A blank follows can, could, may, must, should, will or would, and the options show -s, -ed, -ing or "to" forms.',
        'শূন্যস্থান can, could, may, must, should, will বা would-এর পরে, আর option-এ -s, -ed, -ing বা "to"-যুক্ত রূপ আছে।',
      ),
      method: [
        t('Find the modal.', 'Modal-টা খুঁজে বের করো।'),
        t('The next verb is in its base form (V1): no -s, no -ed, no -ing and no "to".', 'পরের verb base form (V1)-এ: -s, -ed, -ing বা "to" কিছুই নয়।'),
        t('Only "ought" keeps its "to": ought to go.', 'শুধু "ought" তার "to" রাখে: ought to go।'),
      ],
      example: {
        question: t('Fill in the blank: "He can ___ three languages." (speak / speaks / speaking / to speak)', 'শূন্যস্থান পূরণ করো: "He can ___ three languages." (speak / speaks / speaking / to speak)'),
        steps: [
          t('"Can" is a modal, so the next verb must be in the base form.', '"Can" modal, তাই পরের verb base form-এ হবে।'),
          t('"He" is singular, so many students add -s. A modal never takes -s.', '"He" একবচন, তাই অনেকে -s যোগ করে। Modal-এর পরে -s বসে না।'),
        ],
        answer: t('speak — "He can speak three languages."', 'উত্তর: speak — "He can speak three languages."'),
      },
      tryIt: {
        question: t('Fill in the blank: "You should ___ a doctor about this cough."', 'শূন্যস্থান পূরণ করো: "You should ___ a doctor about this cough."'),
        options: opts('sees', 'seeing', 'see', 'to see'),
        correct: 2,
        explanation: [
          t('"Should" is a modal, so the verb after it takes the base form.', '"Should" modal, তাই তার পরের verb base form নেয়।'),
          t('"Sees", "seeing" and "to see" are all wrong: "You should see a doctor about this cough."', '"Sees", "seeing" আর "to see" সবই ভুল: "You should see a doctor about this cough."'),
        ],
      },
    },
    {
      key: 'first_conditional',
      emoji: '🌧️',
      name: t('First conditional: if + simple present, will + base verb', 'First conditional (বাস্তব ভবিষ্যৎ): if + simple present, will + base verb'),
      spot: t(
        'A real, possible future situation: "If ___, ... will ...".',
        'বাস্তবে ঘটতে পারে এমন ভবিষ্যৎ পরিস্থিতি: "If ___, ... will ..."।',
      ),
      method: [
        t('The if-part takes the simple present, never "will".', 'If-অংশে simple present, কখনও "will" নয়।'),
        t('The main part takes will + base verb.', 'Main অংশে will + base verb।'),
        t('Zero conditional (always true) uses the simple present in both parts: If you heat ice, it melts.', 'Zero conditional (সবসময় সত্য)-এ দুই অংশেই simple present: If you heat ice, it melts।'),
      ],
      example: {
        question: t('Fill in the blank: "If it rains, the match ___ postponed." (will be / would be / was / is being)', 'শূন্যস্থান পূরণ করো: "If it rains, the match ___ postponed." (will be / would be / was / is being)'),
        steps: [
          t('"Rains" is simple present in the if-part: a real possibility, so first conditional.', 'If-অংশে "rains" simple present: বাস্তব সম্ভাবনা, তাই first conditional।'),
          t('The main part takes will + base verb. "Would be" belongs to imaginary situations.', 'Main অংশে will + base verb। "Would be" কল্পিত পরিস্থিতির জন্য।'),
        ],
        answer: t('will be — "If it rains, the match will be postponed."', 'উত্তর: will be — "If it rains, the match will be postponed."'),
      },
      tryIt: {
        question: t('Fill in the blank: "If he ___ hard, he will pass the exam."', 'শূন্যস্থান পূরণ করো: "If he ___ hard, he will pass the exam."'),
        options: opts('will work', 'works', 'would work', 'worked'),
        correct: 1,
        explanation: [
          t('The main part has "will pass", so this is a real future possibility: first conditional.', 'Main অংশে "will pass", তাই এটা বাস্তব ভবিষ্যৎ সম্ভাবনা: first conditional।'),
          t('The if-part takes the simple present, and "he" needs -s: "If he works hard, he will pass the exam."', 'If-অংশে simple present, আর "he"-এর সঙ্গে -s: "If he works hard, he will pass the exam."'),
        ],
      },
    },
    {
      key: 'second_conditional',
      emoji: '💭',
      name: t('Second conditional: if + were, would + base verb', 'Second conditional (কল্পিত বর্তমান): if + were, would + base verb'),
      spot: t(
        'An imaginary or unreal present situation: "If I were the manager ..." or "If I had more money ...".',
        'কল্পিত বা অবাস্তব বর্তমান পরিস্থিতি: "If I were the manager ..." বা "If I had more money ..."।',
      ),
      method: [
        t('Check that the situation is imaginary: it is not true now.', 'দেখো পরিস্থিতিটা কল্পিত কি না: এখন সেটা সত্য নয়।'),
        t('The if-part takes the simple past; in exams use "were" for every person (If I were, If she were).', 'If-অংশে simple past; পরীক্ষায় সব person-এর সঙ্গে "were" (If I were, If she were)।'),
        t('The main part takes would + base verb. Never put "would" in the if-part.', 'Main অংশে would + base verb। If-অংশে কখনও "would" নয়।'),
      ],
      example: {
        question: t('Fill in the blank: "If I ___ the manager, I would give everyone a holiday." (am / were / will be)', 'শূন্যস্থান পূরণ করো: "If I ___ the manager, I would give everyone a holiday." (am / were / will be)'),
        steps: [
          t('I am not the manager, so this is imaginary (present).', 'আমি manager নই, তাই এটা কল্পিত (বর্তমান)।'),
          t('Imaginary present: if + simple past (were), would + base verb.', 'কল্পিত বর্তমান: if + simple past (were), would + base verb।'),
        ],
        answer: t('were — "If I were the manager, I would give everyone a holiday."', 'উত্তর: were — "If I were the manager, I would give everyone a holiday."'),
      },
      tryIt: {
        question: t('Fill in the blank: "If I ___ you, I would accept the offer."', 'শূন্যস্থান পূরণ করো: "If I ___ you, I would accept the offer."'),
        options: opts('am', 'will be', 'had been', 'were'),
        correct: 3,
        explanation: [
          t('I cannot be "you", so the situation is imaginary and the main part has "would accept".', 'আমি "তুমি" হতে পারি না, তাই পরিস্থিতি কল্পিত, আর main অংশে "would accept"।'),
          t('The if-part takes "were": "If I were you, I would accept the offer."', 'If-অংশে "were": "If I were you, I would accept the offer."'),
        ],
      },
    },
    {
      key: 'third_conditional',
      emoji: '⏮️',
      name: t('Third conditional: if + had + V3, would have + V3', 'Third conditional (কল্পিত অতীত): if + had + V3, would have + V3'),
      spot: t(
        'An imagined past that cannot change, showing regret or criticism: "If he had studied, he would have passed".',
        'অতীতের একটা কল্পিত ঘটনা যা আর বদলানো যায় না, আফসোস বা সমালোচনা বোঝায়: "If he had studied, he would have passed"।',
      ),
      method: [
        t('Look at the result part: would have + V3 means the if-part must be had + V3.', 'Result অংশ দেখো: would have + V3 থাকলে if-অংশে had + V3 হবে।'),
        t('Never write "would have" in the if-part: not "If he would have studied".', 'If-অংশে "would have" কখনও নয়: "If he would have studied" ভুল।'),
        t('"Would" must be followed by "have": not "would passed".', '"Would"-এর পরে "have" লাগে: "would passed" ভুল।'),
      ],
      example: {
        question: t('Fill in the blank: "If he ___ studied, he would have passed." (has / had / would have)', 'শূন্যস্থান পূরণ করো: "If he ___ studied, he would have passed." (has / had / would have)'),
        steps: [
          t('The result part has "would have passed", so this is the imaginary past.', 'Result অংশে "would have passed", তাই এটা কল্পিত অতীত।'),
          t('The if-part takes had + V3, and "would have" is wrong there.', 'If-অংশে had + V3, আর সেখানে "would have" ভুল।'),
        ],
        answer: t('had — "If he had studied, he would have passed."', 'উত্তর: had — "If he had studied, he would have passed."'),
      },
      tryIt: {
        question: t('Fill in the blank: "If you had told me, I ___ you."', 'শূন্যস্থান পূরণ করো: "If you had told me, I ___ you."'),
        options: opts('would help', 'would have helped', 'will have helped', 'had helped'),
        correct: 1,
        explanation: [
          t('The if-part "had told" is the imaginary past, so the result takes would have + V3.', 'If-অংশ "had told" কল্পিত অতীত, তাই result-এ would have + V3।'),
          t('So: "If you had told me, I would have helped you." ("Would help" is for the present.)', 'তাই: "If you had told me, I would have helped you." ("Would help" বর্তমানের জন্য।)'),
        ],
      },
    },
    {
      key: 'modal_have_v3',
      emoji: '🔍',
      name: t('Modal + have + V3: talking about the past', 'Modal + have + V3: অতীত নিয়ে কথা'),
      spot: t(
        'A sentence looks back at the past with a guess, regret or missed chance: "He must have left", "I should have informed".',
        'বাক্যে অতীতের দিকে তাকিয়ে অনুমান, আফসোস বা হারানো সুযোগের কথা: "He must have left", "I should have informed"।',
      ),
      method: [
        t('must have + V3 = a strong guess; can\'t have + V3 = sure it did not happen.', 'must have + V3 = দৃঢ় অনুমান; can\'t have + V3 = নিশ্চিত যে ঘটেনি।'),
        t('should have + V3 = regret or advice not followed; could have + V3 = possible but did not happen.', 'should have + V3 = আফসোস বা না মানা পরামর্শ; could have + V3 = সম্ভব ছিল কিন্তু ঘটেনি।'),
        t('"Have" never becomes has or had here, and the next word is V3: must have gone, not must have went.', 'এখানে "have" কখনও has বা had হয় না, আর পরের শব্দ V3: must have gone, must have went নয়।'),
      ],
      example: {
        question: t('Fill in the blank: "He is not at his desk. He ___." (must have left / must left / must has left)', 'শূন্যস্থান পূরণ করো: "He is not at his desk. He ___." (must have left / must left / must has left)'),
        steps: [
          t('This is a strong guess about something that has already happened.', 'এটা ইতিমধ্যে ঘটে যাওয়া কিছু নিয়ে দৃঢ় অনুমান।'),
          t('Past guess: must + have + V3. "Have" stays "have" and the verb is V3.', 'অতীতের অনুমান: must + have + V3। "Have" "have"-ই থাকে আর verb V3।'),
        ],
        answer: t('must have left — "He must have left."', 'উত্তর: must have left — "He must have left."'),
      },
      tryIt: {
        question: t('Fill in the blank: "I missed the train. I ___ earlier." (I regret it.)', 'শূন্যস্থান পূরণ করো: "I missed the train. I ___ earlier." (আমার আফসোস হচ্ছে।)'),
        options: opts('should have left', 'should has left', 'should had left', 'should have leave'),
        correct: 0,
        explanation: [
          t('Regret about the past takes should + have + V3.', 'অতীত নিয়ে আফসোসে should + have + V3।'),
          t('"Have" does not change to has or had, and V3 of leave is "left": "I should have left earlier."', '"Have" has বা had হয় না, আর leave-এর V3 "left": "I should have left earlier."'),
        ],
      },
    },
    {
      key: 'unless_sentences',
      emoji: '🚫',
      name: t('Unless means if ... not', 'Unless মানে if ... not'),
      spot: t(
        'A sentence has "unless", and an option puts "not" or "will" after it.',
        'বাক্যে "unless" আছে, আর কোনো option-এ তার পরে "not" বা "will" বসানো।',
      ),
      method: [
        t('Replace "unless" with "if ... not" to check the meaning.', 'অর্থ যাচাই করতে "unless"-এর জায়গায় "if ... not" বসাও।'),
        t('The verb after "unless" is already negative in meaning, so it stays positive in form: Unless you work hard ...', '"Unless"-এর পরের verb অর্থে না-বাচক, তাই রূপে হ্যাঁ-বাচক থাকে: Unless you work hard ...'),
        t('Use the simple present after "unless", not "will".', '"Unless"-এর পরে simple present, "will" নয়।'),
      ],
      example: {
        question: t('Fill in the blank: "You will fail unless you ___ hard." (work / do not work / will work)', 'শূন্যস্থান পূরণ করো: "You will fail unless you ___ hard." (work / do not work / will work)'),
        steps: [
          t('"Unless you work" means "if you do not work".', '"Unless you work" মানে "if you do not work"।'),
          t('"Unless" already carries the "not", so the verb stays positive: "do not work" would be a double negative.', '"Unless"-এর মধ্যেই "not" আছে, তাই verb হ্যাঁ-বাচক থাকে: "do not work" হলে দ্বিগুণ না-বাচক হত।'),
        ],
        answer: t('work — "You will fail unless you work hard."', 'উত্তর: work — "You will fail unless you work hard."'),
      },
      tryIt: {
        question: t('Fill in the blank: "You will miss the bus unless you ___."', 'শূন্যস্থান পূরণ করো: "You will miss the bus unless you ___."'),
        options: opts('do not hurry', 'will hurry', 'hurry', 'hurried'),
        correct: 2,
        explanation: [
          t('"Unless you hurry" means "if you do not hurry", so the verb after "unless" stays positive.', '"Unless you hurry" মানে "if you do not hurry", তাই "unless"-এর পরের verb হ্যাঁ-বাচক থাকে।'),
          t('"Will hurry" is wrong in a condition clause and "hurried" is the wrong tense: "You will miss the bus unless you hurry."', 'শর্তের clause-এ "will hurry" ভুল আর "hurried" ভুল tense: "You will miss the bus unless you hurry."'),
        ],
      },
    },
  ],
};
