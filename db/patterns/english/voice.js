'use strict';

const t = (en, bn) => ({ en, bn });
const opts = (...s) => s.map((x) => t(x, x));

module.exports = {
  subject: 'english',
  topic: 'voice',
  patterns: [
    {
      key: 'simple_tense_passive',
      emoji: '🔄',
      name: t('Change a simple-tense sentence to the passive', 'Simple tense-এর বাক্যকে passive করা'),
      spot: t(
        'The question says "change into the passive voice" and the sentence is simple present, simple past or simple future with an object.',
        'প্রশ্নে "change into the passive voice" বলা আছে, আর বাক্যটা simple present, simple past বা simple future এবং তাতে object আছে।',
      ),
      method: [
        t('Find the subject, the verb and the object.', 'Subject, verb আর object খুঁজে বের করো।'),
        t('Move the object to the front as the new subject.', 'Object-কে নতুন subject করে সামনে আনো।'),
        t('Write be (in the same tense as the active verb) + V3.', 'Active verb-এর একই tense-এ be + V3 লেখো।'),
        t('Put the old subject after "by".', 'পুরোনো subject "by"-এর পরে বসাও।'),
      ],
      example: {
        question: t('Change into the passive voice: "The manager approved the leave."', 'Passive voice-এ বদলাও: "The manager approved the leave."'),
        steps: [
          t('Subject = the manager, verb = approved (simple past), object = the leave.', 'এখানে subject = the manager, verb = approved (simple past), object = the leave।'),
          t('The object goes to the front. Simple past needs "was" + V3: "was approved". Do not write "is approved".', 'Object সামনে যাবে। Simple past-এ "was" + V3: "was approved"। "is approved" লেখা যাবে না।'),
          t('The old subject goes after "by".', 'পুরোনো subject "by"-এর পরে।'),
        ],
        answer: t('The leave was approved by the manager.', 'উত্তর: The leave was approved by the manager.'),
      },
      tryIt: {
        question: t('Change into the passive voice: "Rina writes a letter."', 'Passive voice-এ বদলাও: "Rina writes a letter."'),
        options: opts('A letter is written by Rina.', 'A letter was written by Rina.', 'A letter is wrote by Rina.', 'A letter writes by Rina.'),
        correct: 0,
        explanation: [
          t('"Writes" is simple present, so the passive uses "is" + V3.', '"Writes" simple present, তাই passive-এ "is" + V3।'),
          t('The V3 of write is "written" (not "wrote"): "A letter is written by Rina."', 'Write-এর V3 "written" ("wrote" নয়): "A letter is written by Rina."'),
        ],
      },
    },
    {
      key: 'continuous_perfect_passive',
      emoji: '🧱',
      name: t('Continuous and perfect tenses in the passive', 'Continuous ও perfect tense-এর passive'),
      spot: t(
        'The active verb has -ing (is repairing) or have/has/had + V3 (have sold), and the options differ only in the be-words.',
        'Active verb-এ -ing (is repairing) বা have/has/had + V3 (have sold) আছে, আর option-গুলো শুধু be-শব্দে আলাদা।',
      ),
      method: [
        t('Continuous: is/am/are/was/were + being + V3.', 'Continuous হলে: is/am/are/was/were + being + V3।'),
        t('Perfect: has/have/had + been + V3.', 'Perfect হলে: has/have/had + been + V3।'),
        t('The passive always adds be-words (be / being / been) before V3.', 'Passive-এ V3-এর আগে সবসময় be-শব্দ (be / being / been) যোগ হয়।'),
      ],
      example: {
        question: t('Change into the passive voice: "They have sold the tickets."', 'Passive voice-এ বদলাও: "They have sold the tickets."'),
        steps: [
          t('"Have sold" is present perfect, so the passive pattern is have/has + been + V3.', '"Have sold" present perfect, তাই passive-এর ছক have/has + been + V3।'),
          t('The new subject "the tickets" is plural, so "have": "The tickets have been sold."', 'নতুন subject "the tickets" বহুবচন, তাই "have": "The tickets have been sold."'),
        ],
        answer: t('The tickets have been sold (by them).', 'উত্তর: The tickets have been sold (by them).'),
      },
      tryIt: {
        question: t('Change into the passive voice: "The workers are repairing the road."', 'Passive voice-এ বদলাও: "The workers are repairing the road."'),
        options: opts('The road is repaired by the workers.', 'The road has been repaired by the workers.', 'The road is being repaired by the workers.', 'The road was being repaired by the workers.'),
        correct: 2,
        explanation: [
          t('"Are repairing" is present continuous, so the passive pattern is is/am/are + being + V3.', '"Are repairing" present continuous, তাই passive-এর ছক is/am/are + being + V3।'),
          t('"The road" is singular, so "is being repaired": "The road is being repaired by the workers."', '"The road" একবচন, তাই "is being repaired": "The road is being repaired by the workers."'),
        ],
      },
    },
    {
      key: 'passive_questions',
      emoji: '❓',
      name: t('Passive of questions', 'প্রশ্নবাচক বাক্যের passive'),
      spot: t(
        'The active sentence is a question beginning with did, have, is or a wh-word.',
        'Active বাক্যটা একটা প্রশ্ন, যা did, have, is বা wh-শব্দ দিয়ে শুরু।',
      ),
      method: [
        t('Turn the question into a statement first, make the passive, then turn it back into a question.', 'আগে প্রশ্নটাকে statement করো, passive বানাও, তারপর আবার প্রশ্ন করো।'),
        t('The helping verb moves before the subject: Was the letter posted?', 'Helping verb subject-এর আগে যায়: Was the letter posted?'),
        t('Do/does/did disappear in the passive.', 'Passive-এ do/does/did থাকে না।'),
      ],
      example: {
        question: t('Change into the passive voice: "Did she post the letter?"', 'Passive voice-এ বদলাও: "Did she post the letter?"'),
        steps: [
          t('As a statement: "She posted the letter." Passive: "The letter was posted by her."', 'আগে statement: "She posted the letter." তার passive: "The letter was posted by her."'),
          t('Make it a question again by moving "was" to the front. "Did" disappears.', '"was" সামনে এনে আবার প্রশ্ন করো। "Did" বাদ যায়।'),
        ],
        answer: t('Was the letter posted by her?', 'উত্তর: Was the letter posted by her?'),
      },
      tryIt: {
        question: t('Change into the passive voice: "Have they cancelled the match?"', 'Passive voice-এ বদলাও: "Have they cancelled the match?"'),
        options: opts('Was the match cancelled by them?', 'Has the match been cancelled by them?', 'Have the match been cancelled by them?', 'Did the match cancelled by them?'),
        correct: 1,
        explanation: [
          t('As a statement: "They have cancelled the match" is present perfect, so the passive is "has been cancelled".', 'Statement "They have cancelled the match" present perfect, তাই passive "has been cancelled"।'),
          t('"The match" is singular, so "Has" moves to the front: "Has the match been cancelled by them?"', '"The match" একবচন, তাই "Has" সামনে যায়: "Has the match been cancelled by them?"'),
        ],
      },
    },
    {
      key: 'modal_passive',
      emoji: '🛠️',
      name: t('Modals in the passive: must be kept, can be done', 'Modal-এর passive: must be kept, can be done'),
      spot: t(
        'The active verb has a modal such as can, must, should or may.',
        'Active verb-এ can, must, should বা may-এর মতো modal আছে।',
      ),
      method: [
        t('Keep the modal as it is.', 'Modal যেমন আছে তেমন রাখো।'),
        t('Then write be + V3: modal + be + V3.', 'তারপর be + V3 লেখো: modal + be + V3।'),
        t('Do not change the modal into a past form, and do not drop "be".', 'Modal-কে অতীত রূপে বদলিও না, আর "be" বাদ দিও না।'),
      ],
      example: {
        question: t('Change into the passive voice: "You must keep the fire exits clear."', 'Passive voice-এ বদলাও: "You must keep the fire exits clear."'),
        steps: [
          t('The object "the fire exits" becomes the subject.', 'Object "the fire exits" subject হয়ে যায়।'),
          t('"Must" stays, then be + V3: "must be kept".', '"Must" থাকে, তারপর be + V3: "must be kept"।'),
        ],
        answer: t('The fire exits must be kept clear.', 'উত্তর: The fire exits must be kept clear.'),
      },
      tryIt: {
        question: t('Change into the passive voice: "We should clean this room."', 'Passive voice-এ বদলাও: "We should clean this room."'),
        options: opts('This room should cleaned by us.', 'This room should be clean by us.', 'This room should have been cleaned by us.', 'This room should be cleaned by us.'),
        correct: 3,
        explanation: [
          t('The passive of a modal is modal + be + V3, so "should be cleaned".', 'Modal-এর passive modal + be + V3, তাই "should be cleaned"।'),
          t('"Should cleaned" drops "be", "should be clean" uses V1, and "should have been cleaned" changes the meaning to the past.', '"Should cleaned"-এ "be" নেই, "should be clean"-এ V1, আর "should have been cleaned" অর্থ অতীতে নিয়ে যায়।'),
        ],
      },
    },
  ],
};
