'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'english',
  topic: 'idioms_phrases',
  patterns: [
    {
      key: 'body_part_idioms',
      emoji: '👂',
      name: t('Body-part idioms (turn a deaf ear, cold shoulder)', 'শরীরের অঙ্গ নিয়ে idiom (turn a deaf ear, cold shoulder)'),
      spot: t('The idiom uses a part of the body (ear, eye, hand, shoulder, nose, heart) but is not really about that body part.', 'Idiom-এ শরীরের কোনো অঙ্গের নাম আছে (ear, eye, hand, shoulder, nose, heart), কিন্তু আসলে কথাটা ওই অঙ্গ নিয়ে নয়।'),
      method: [
        t('Never choose the literal (word-for-word) meaning; an idiom has a hidden meaning.', 'কখনো আক্ষরিক (শব্দে শব্দে) মানে বেছো না; idiom-এর একটা লুকোনো মানে থাকে।'),
        t('Picture the action: a "deaf ear" cannot hear, so "turn a deaf ear" = refuse to listen.', 'ছবিটা কল্পনা করো: "deaf ear" শুনতে পায় না, তাই "turn a deaf ear" = কথা শুনতে না চাওয়া।'),
        t('Learn the common ones: see eye to eye = agree; cold shoulder = deliberate ignoring; by heart = from memory; lend a hand = help; pay through the nose = pay far too much.', 'চেনাগুলো শিখে রাখো: see eye to eye = একমত হওয়া; cold shoulder = ইচ্ছে করে উপেক্ষা; by heart = মুখস্থ; lend a hand = সাহায্য করা; pay through the nose = অনেক বেশি দাম দেওয়া।'),
      ],
      example: {
        question: t(
          'Choose the meaning of the idiom "to turn a deaf ear": (a) to become deaf (b) to refuse to listen (c) to listen carefully (d) to speak loudly',
          '"to turn a deaf ear" idiom-এর মানে বাছো: (a) to become deaf (b) to refuse to listen (c) to listen carefully (d) to speak loudly',
        ),
        steps: [
          t('Option (a) is the literal meaning, so it is a trap.', 'Option (a) আক্ষরিক মানে, তাই ওটা ফাঁদ।'),
          t('A deaf ear hears nothing, so turning one towards someone means you choose not to listen to them.', 'বধির কান কিছু শোনে না; কারও দিকে সেটা ফেরানো মানে তার কথা ইচ্ছে করে না শোনা।'),
          t('Example: "He turned a deaf ear to his parents\' advice."', 'উদাহরণ: "He turned a deaf ear to his parents\' advice." (বাবা-মায়ের উপদেশে কান দিল না)'),
        ],
        answer: t('(b) to refuse to listen', 'উত্তর: (b) to refuse to listen (কথায় কান না দেওয়া)'),
      },
      tryIt: {
        question: t('Choose the meaning of the idiom "to give someone the cold shoulder":', '"to give someone the cold shoulder" idiom-এর মানে বাছো:'),
        options: [
          t('to help someone who is ill', 'to help someone who is ill'),
          t('to ignore someone on purpose', 'to ignore someone on purpose'),
          t('to give someone cold water', 'to give someone cold water'),
          t('to blame someone for a mistake', 'to blame someone for a mistake'),
        ],
        correct: 1,
        explanation: [
          t('"Cold" here means unfriendly, not low temperature.', 'এখানে "cold" মানে বন্ধুত্বহীন, ঠান্ডা তাপমাত্রা নয়।'),
          t('To give someone the cold shoulder is to ignore them deliberately or treat them in an unfriendly way.', 'কাউকে cold shoulder দেওয়া মানে ইচ্ছে করে তাকে উপেক্ষা করা বা অবহেলা দেখানো।'),
        ],
      },
    },
    {
      key: 'animal_idioms',
      emoji: '🐘',
      name: t('Animal idioms (crocodile tears, white elephant)', 'পশুপাখি নিয়ে idiom (crocodile tears, white elephant)'),
      spot: t('The idiom has an animal in it (cat, elephant, crocodile, horse, bull, lion).', 'Idiom-এ কোনো পশুপাখির নাম আছে (cat, elephant, crocodile, horse, bull, lion)।'),
      method: [
        t('Ignore options that talk about the real animal; those are traps.', 'যে option আসল পশুটার কথা বলে, সেটা বাদ দাও; ওগুলো ফাঁদ।'),
        t('Think of the story or quality behind the animal: a crocodile was said to cry while eating its prey, so "crocodile tears" = fake sorrow.', 'পশুটার পেছনের গল্প বা গুণ ভাবো: বলা হতো কুমির শিকার খেতে খেতে কাঁদে, তাই "crocodile tears" = মিথ্যে দুঃখ (মায়াকান্না)।'),
        t('Learn the common ones: let the cat out of the bag = reveal a secret; white elephant = costly but useless possession; lion\'s share = the largest part; take the bull by the horns = face a problem boldly.', 'চেনাগুলো শিখে রাখো: let the cat out of the bag = গোপন কথা ফাঁস করা; white elephant = খরচসাপেক্ষ কিন্তু অকেজো জিনিস; lion\'s share = সবচেয়ে বড় ভাগ; take the bull by the horns = সাহস করে সমস্যার মোকাবিলা করা।'),
      ],
      example: {
        question: t(
          'Choose the meaning of "crocodile tears": (a) tears of a crocodile (b) tears of joy (c) a false show of sorrow (d) very deep sorrow',
          '"crocodile tears"-এর মানে বাছো: (a) tears of a crocodile (b) tears of joy (c) a false show of sorrow (d) very deep sorrow',
        ),
        steps: [
          t('(a) is literal, so it is a trap.', '(a) আক্ষরিক মানে, তাই ফাঁদ।'),
          t('The old story says crocodiles shed tears while eating their prey, so the tears are not real sorrow.', 'পুরোনো গল্প বলে, কুমির শিকার খাওয়ার সময় চোখের জল ফেলে, অর্থাৎ ওই কান্না আসল দুঃখের নয়।'),
          t('So "crocodile tears" = pretended sorrow.', 'তাই "crocodile tears" = লোক-দেখানো দুঃখ (মায়াকান্না)।'),
        ],
        answer: t('(c) a false show of sorrow', 'উত্তর: (c) a false show of sorrow (মায়াকান্না)'),
      },
      tryIt: {
        question: t('Choose the meaning of "a white elephant":', '"a white elephant"-এর মানে বাছো:'),
        options: [
          t('a rare and lucky animal', 'a rare and lucky animal'),
          t('a very peaceful person', 'a very peaceful person'),
          t('a costly possession that is of little use', 'a costly possession that is of little use'),
          t('a great achievement', 'a great achievement'),
        ],
        correct: 2,
        explanation: [
          t('Option (a) is about a real animal, so it is a trap.', 'Option (a) আসল পশুর কথা বলছে, তাই ওটা ফাঁদ।'),
          t('A white elephant is something that costs a lot to own or maintain but gives little use, like a huge building nobody uses.', 'White elephant মানে এমন জিনিস যা রাখতে বা চালাতে অনেক খরচ, কিন্তু কাজে লাগে সামান্য — যেমন কেউ ব্যবহার করে না এমন বিশাল বাড়ি।'),
        ],
      },
    },
    {
      key: 'number_colour_idioms',
      emoji: '🌈',
      name: t('Number and colour idioms (once in a blue moon, at sixes and sevens)', 'সংখ্যা ও রং নিয়ে idiom (once in a blue moon, at sixes and sevens)'),
      spot: t('The idiom has a number or a colour (blue moon, red-letter day, in black and white, sixes and sevens).', 'Idiom-এ কোনো সংখ্যা বা রং আছে (blue moon, red-letter day, in black and white, sixes and sevens)।'),
      method: [
        t('These rarely have anything to do with real numbers or colours; skip literal options.', 'এগুলোর সঙ্গে আসল সংখ্যা বা রঙের সাধারণত কোনো সম্পর্ক নেই; আক্ষরিক option বাদ দাও।'),
        t('Learn the set: once in a blue moon = very rarely; red-letter day = a very special, happy day; in black and white = in writing; at sixes and sevens = in confusion or disorder; in the red = in debt.', 'তালিকাটা শেখো: once in a blue moon = কালেভদ্রে; red-letter day = বিশেষ আনন্দের দিন; in black and white = লিখিতভাবে; at sixes and sevens = বিশৃঙ্খল অবস্থায়; in the red = ঋণে।'),
        t('Check your choice by putting it into a sentence.', 'উত্তরটা একটা বাক্যে বসিয়ে যাচাই করো।'),
      ],
      example: {
        question: t(
          'Choose the meaning of "once in a blue moon": (a) every night (b) very rarely (c) on a full-moon night (d) very often',
          '"once in a blue moon"-এর মানে বাছো: (a) every night (b) very rarely (c) on a full-moon night (d) very often',
        ),
        steps: [
          t('A "blue moon" is a rare event, so the idiom is about something that hardly ever happens.', '"Blue moon" খুব কম দেখা যায়, তাই idiom-টা এমন কিছুর কথা বলে যা প্রায় ঘটেই না।'),
          t('Example: "My uncle visits us once in a blue moon." = very rarely.', 'উদাহরণ: "My uncle visits us once in a blue moon." = কালেভদ্রে আসেন।'),
        ],
        answer: t('(b) very rarely', 'উত্তর: (b) very rarely (কালেভদ্রে)'),
      },
      tryIt: {
        question: t('Choose the meaning of "at sixes and sevens": "After the sudden flood, everything in the village was at sixes and sevens."', '"at sixes and sevens"-এর মানে বাছো: "After the sudden flood, everything in the village was at sixes and sevens."'),
        options: [
          t('at the right time', 'at the right time'),
          t('very quickly', 'very quickly'),
          t('counted carefully', 'counted carefully'),
          t('in a state of confusion and disorder', 'in a state of confusion and disorder'),
        ],
        correct: 3,
        explanation: [
          t('The numbers are a trap; nothing is being counted.', 'সংখ্যাগুলো ফাঁদ; এখানে কিছু গোনা হচ্ছে না।'),
          t('After a flood a village is messy and confused, which matches "at sixes and sevens" = in disorder.', 'বন্যার পরে গ্রাম এলোমেলো, বিশৃঙ্খল থাকে — এটাই "at sixes and sevens" = বিশৃঙ্খল অবস্থা।'),
        ],
      },
    },
    {
      key: 'idiom_in_sentence',
      emoji: '📝',
      name: t('Idiom used in a sentence (burn the midnight oil)', 'বাক্যের মধ্যে idiom (burn the midnight oil)'),
      spot: t('A full sentence is given with the idiom in bold or underlined, and you must choose what it means in that sentence.', 'একটা গোটা বাক্য দেওয়া, idiom-টা bold বা দাগানো; ওই বাক্যে তার মানে কী, বাছতে হবে।'),
      method: [
        t('Read the whole sentence and see what situation it describes (an exam, a fight, a defeat...).', 'গোটা বাক্যটা পড়ে দেখো কোন পরিস্থিতির কথা বলছে (পরীক্ষা, ঝগড়া, হার...)।'),
        t('Replace the idiom with each option; the right one makes the sentence sensible.', 'Idiom-এর জায়গায় প্রতিটা option বসাও; ঠিকটা বসালে বাক্যের মানে দাঁড়ায়।'),
        t('Reject literal options (real oil, real pie) even if they sound funny-correct.', 'আক্ষরিক option (আসল তেল, আসল pie) বাদ দাও, শুনতে যতই ঠিক লাগুক।'),
      ],
      example: {
        question: t(
          'Choose the meaning of the bold part: "Ravi **burnt the midnight oil** before his board exams." (a) wasted oil at night (b) worked or studied late into the night (c) slept early (d) cooked late at night',
          'Bold অংশের মানে বাছো: "Ravi **burnt the midnight oil** before his board exams." (a) wasted oil at night (b) worked or studied late into the night (c) slept early (d) cooked late at night',
        ),
        steps: [
          t('The situation is "before his board exams", so it is about studying.', 'পরিস্থিতি হলো "board exam-এর আগে", তাই কথাটা পড়াশোনা নিয়ে।'),
          t('In old days people burnt oil lamps to work at night, so the idiom means working or studying very late.', 'আগেকার দিনে রাতে কাজ করতে তেলের প্রদীপ জ্বালাতে হতো, তাই idiom-টার মানে অনেক রাত পর্যন্ত কাজ বা পড়াশোনা করা।'),
        ],
        answer: t('(b) worked or studied late into the night', 'উত্তর: (b) worked or studied late into the night (রাত জেগে পড়াশোনা করা)'),
      },
      tryIt: {
        question: t('Choose the meaning of the bold part: "After boasting so much, the team had to **eat humble pie** when they lost 5–0."', 'Bold অংশের মানে বাছো: "After boasting so much, the team had to **eat humble pie** when they lost 5–0."'),
        options: [
          t('to eat cheap food', 'to eat cheap food'),
          t('to admit a mistake and be humble', 'to admit a mistake and be humble'),
          t('to celebrate a win', 'to celebrate a win'),
          t('to fall ill', 'to fall ill'),
        ],
        correct: 1,
        explanation: [
          t('The team boasted and then lost badly, so they were proved wrong.', 'দলটা খুব বড়াই করেছিল, তারপর বিশ্রীভাবে হারল — অর্থাৎ ওরা ভুল প্রমাণিত হলো।'),
          t('"Eat humble pie" = admit you were wrong and apologise or act humbly.', '"Eat humble pie" = নিজের ভুল স্বীকার করে নত হওয়া।'),
        ],
      },
    },
    {
      key: 'tricky_idioms',
      emoji: '🎯',
      name: t('Tricky idioms with a misleading literal picture (a bolt from the blue)', 'আক্ষরিক ছবিতে ভুল পথে নিয়ে যায় এমন idiom (a bolt from the blue)'),
      spot: t('The options include one literal picture (lightning, a nail, a cat) and several meanings that sound close; only one matches the dictionary meaning exactly.', 'Option-এ একটা আক্ষরিক ছবি (বাজ, পেরেক, বিড়াল) আর কয়েকটা কাছাকাছি মানে থাকে; অভিধানের মানের সঙ্গে হুবহু মেলে শুধু একটা।'),
      method: [
        t('Drop the literal option first.', 'প্রথমেই আক্ষরিক option বাদ দাও।'),
        t('Between close options, look for the key idea: sudden? risky? exact? planned?', 'কাছাকাছি option-গুলোর মধ্যে মূল ভাবটা খোঁজো: হঠাৎ? ঝুঁকিপূর্ণ? একদম ঠিক? পরিকল্পিত?'),
        t('Learn these: a bolt from the blue = a complete surprise; hit the nail on the head = say exactly the right thing; bell the cat = take a risk for the sake of others; beat about the bush = avoid the main point.', 'এগুলো শিখে রাখো: a bolt from the blue = সম্পূর্ণ অপ্রত্যাশিত ঘটনা (বিনা মেঘে বজ্রপাত); hit the nail on the head = একদম ঠিক কথাটা বলা; bell the cat = অন্যের জন্য ঝুঁকি নেওয়া; beat about the bush = আসল কথা এড়িয়ে যাওয়া।'),
      ],
      example: {
        question: t(
          'Choose the meaning of "to hit the nail on the head": (a) to hurt someone (b) to say or do exactly the right thing (c) to work as a carpenter (d) to make a big mistake',
          '"to hit the nail on the head"-এর মানে বাছো: (a) to hurt someone (b) to say or do exactly the right thing (c) to work as a carpenter (d) to make a big mistake',
        ),
        steps: [
          t('(c) is the literal picture of hammering, so drop it.', '(c) হাতুড়ি পেটানোর আক্ষরিক ছবি, তাই বাদ।'),
          t('Hitting a nail exactly on its head is the perfect shot, so the idiom means being exactly right.', 'পেরেকের ঠিক মাথায় আঘাত করা মানে নিখুঁত আঘাত, তাই idiom-টার মানে একদম ঠিক কথাটা বলা।'),
        ],
        answer: t('(b) to say or do exactly the right thing', 'উত্তর: (b) to say or do exactly the right thing (একদম ঠিক কথাটা বলা)'),
      },
      tryIt: {
        question: t('Choose the meaning of "a bolt from the blue": "The news of the factory closing was a bolt from the blue for the workers."', '"a bolt from the blue"-এর মানে বাছো: "The news of the factory closing was a bolt from the blue for the workers."'),
        options: [
          t('a completely unexpected event', 'a completely unexpected event'),
          t('a flash of lightning in a clear sky', 'a flash of lightning in a clear sky'),
          t('a long-expected event', 'a long-expected event'),
          t('a piece of good luck', 'a piece of good luck'),
        ],
        correct: 0,
        explanation: [
          t('Option (b) is the literal picture, so drop it.', 'Option (b) আক্ষরিক ছবি, তাই বাদ।'),
          t('Lightning from a clear blue sky is something nobody expects, so the idiom means a sudden, unexpected event (often a shock).', 'পরিষ্কার নীল আকাশ থেকে বাজ পড়ার কথা কেউ ভাবে না, তাই idiom-টার মানে হঠাৎ, অপ্রত্যাশিত ঘটনা (প্রায়ই ধাক্কা দেওয়ার মতো)।'),
          t('The workers did not expect the closure, so it was "a completely unexpected event", not good luck and not long-expected.', 'শ্রমিকরা কারখানা বন্ধের কথা ভাবেনি, তাই এটা "সম্পূর্ণ অপ্রত্যাশিত ঘটনা" — সৌভাগ্য বা আগে থেকে জানা ঘটনা নয়।'),
        ],
      },
    },
  ],
};
