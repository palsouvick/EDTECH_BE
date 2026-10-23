'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'english',
  topic: 'synonyms_antonyms',
  patterns: [
    {
      key: 'direct_synonym',
      emoji: '🟰',
      name: t('Pick the synonym (same meaning)', 'Synonym বাছো (সমার্থক শব্দ)'),
      spot: t('"Choose the word most similar in meaning to..." with one word in capitals and four single-word options.', '"Choose the word most similar in meaning to..." — বড় হাতের অক্ষরে একটা শব্দ আর চারটে এক-শব্দের option।'),
      method: [
        t('Say the meaning of the given word in your own simple words first.', 'আগে নিজের সহজ ভাষায় দেওয়া শব্দটার মানে বলো।'),
        t('Cross out any option that is the OPPOSITE; it is the most common trap.', 'যে option বিপরীত অর্থের, সেটা কেটে দাও; এটাই সবচেয়ে বড় ফাঁদ।'),
        t('From the rest, pick the one that can replace the word in a sentence without changing the meaning.', 'বাকিগুলোর মধ্যে যেটা বাক্যে বসালে অর্থ বদলায় না, সেটা বাছো।'),
      ],
      example: {
        question: t('Choose the synonym of ABUNDANT: (a) scarce (b) plentiful (c) rare (d) small', 'ABUNDANT-এর synonym বাছো: (a) scarce (b) plentiful (c) rare (d) small'),
        steps: [
          t('"Abundant" means "more than enough; in large amounts".', '"Abundant" মানে "প্রয়োজনের চেয়েও বেশি; প্রচুর"।'),
          t('"Scarce" and "rare" are opposites; "small" does not fit.', '"Scarce" আর "rare" উল্টো অর্থের; "small" মেলে না।'),
          t('"Plentiful" also means "in large amounts".', '"Plentiful" মানেও "প্রচুর"।'),
        ],
        answer: t('(b) plentiful', 'উত্তর: (b) plentiful'),
      },
      tryIt: {
        question: t('Choose the synonym of CANDID:', 'CANDID-এর synonym বাছো:'),
        options: [t('clever', 'clever'), t('shy', 'shy'), t('frank', 'frank'), t('cruel', 'cruel')],
        correct: 2,
        explanation: [
          t('"Candid" means honest and open; saying what you really think.', '"Candid" মানে সৎ ও খোলামেলা; মনের কথা সোজাসুজি বলা (অকপট)।'),
          t('"Frank" has the same meaning. "Candid" does not mean clever (a common mix-up), shy or cruel.', '"Frank"-এর মানেও তাই। "Candid" মানে clever নয় (অনেকে গুলিয়ে ফেলে), shy বা cruel-ও নয়।'),
        ],
      },
    },
    {
      key: 'direct_antonym',
      emoji: '↔️',
      name: t('Pick the antonym (opposite meaning)', 'Antonym বাছো (বিপরীত শব্দ)'),
      spot: t('"Choose the word opposite in meaning to..." with one word in capitals.', '"Choose the word opposite in meaning to..." — বড় হাতের অক্ষরে একটা শব্দ দেওয়া।'),
      method: [
        t('Underline the word "opposite" in the question so you do not pick a synonym by mistake.', 'প্রশ্নের "opposite" শব্দটা দাগিয়ে রাখো, যাতে ভুল করে synonym বেছে না ফেলো।'),
        t('Find the meaning of the given word, then think of its opposite.', 'দেওয়া শব্দের মানে বের করো, তারপর তার বিপরীতটা ভাবো।'),
        t('Exam setters always put a synonym among the options as a trap; cross it out first.', 'পরীক্ষায় ফাঁদ হিসেবে option-এ প্রায়ই একটা synonym থাকে; আগে সেটা কেটে দাও।'),
      ],
      example: {
        question: t('Choose the antonym of ANCIENT: (a) old (b) modern (c) historic (d) aged', 'ANCIENT-এর antonym বাছো: (a) old (b) modern (c) historic (d) aged'),
        steps: [
          t('"Ancient" means "very old; from long ago".', '"Ancient" মানে "অনেক পুরোনো" (প্রাচীন)।'),
          t('"Old", "historic" and "aged" are close to the same meaning, so they are traps.', '"Old", "historic" আর "aged" মোটামুটি একই অর্থের, তাই এগুলো ফাঁদ।'),
          t('The opposite of "very old" is "new / of the present time" = "modern".', '"অনেক পুরোনো"-র বিপরীত হলো "নতুন / আধুনিক" = "modern"।'),
        ],
        answer: t('(b) modern', 'উত্তর: (b) modern'),
      },
      tryIt: {
        question: t('Choose the antonym of TIMID:', 'TIMID-এর antonym বাছো:'),
        options: [t('shy', 'shy'), t('weak', 'weak'), t('quiet', 'quiet'), t('bold', 'bold')],
        correct: 3,
        explanation: [
          t('"Timid" means easily frightened, lacking courage.', '"Timid" মানে সহজে ভয় পায়, সাহসের অভাব (ভীরু)।'),
          t('"Shy" is close to a synonym, so it is the trap. The opposite is "bold" (brave, confident).', '"Shy" প্রায় সমার্থক, তাই ওটা ফাঁদ। বিপরীত শব্দ "bold" (সাহসী)।'),
        ],
      },
    },
    {
      key: 'prefix_antonym',
      emoji: '➖',
      name: t('Antonyms made with a prefix (un-, in-, im-, ir-, il-, dis-)', 'Prefix দিয়ে তৈরি antonym (un-, in-, im-, ir-, il-, dis-)'),
      spot: t('The options are the same word with different negative prefixes: unlegal / illegal / inlegal / dislegal.', 'Option-গুলো একই শব্দ, শুধু আগে আলাদা আলাদা না-বাচক prefix: unlegal / illegal / inlegal / dislegal।'),
      method: [
        t('Before "l" → usually il- (illegal, illogical, illiterate).', '"l"-এর আগে সাধারণত il- (illegal, illogical, illiterate)।'),
        t('Before "r" → usually ir- (irregular, irresponsible, irrelevant).', '"r"-এর আগে সাধারণত ir- (irregular, irresponsible, irrelevant)।'),
        t('Before "m" or "p" → usually im- (impossible, immature, impatient).', '"m" বা "p"-এর আগে সাধারণত im- (impossible, immature, impatient)।'),
        t('Others need memory: unhappy, unable, dishonest, disagree, incorrect, inactive. Say the word aloud; the real one sounds familiar.', 'বাকিগুলো মনে রাখতে হয়: unhappy, unable, dishonest, disagree, incorrect, inactive। জোরে বলে দেখো; আসল শব্দটা চেনা শোনাবে।'),
      ],
      example: {
        question: t('Choose the antonym of LEGAL: (a) unlegal (b) inlegal (c) illegal (d) dislegal', 'LEGAL-এর antonym বাছো: (a) unlegal (b) inlegal (c) illegal (d) dislegal'),
        steps: [
          t('"Legal" starts with "l".', '"Legal" শুরু হয়েছে "l" দিয়ে।'),
          t('Words starting with "l" usually take "il-": "illegal".', '"l" দিয়ে শুরু শব্দে সাধারণত "il-" বসে: "illegal"।'),
        ],
        answer: t('(c) illegal', 'উত্তর: (c) illegal'),
      },
      tryIt: {
        question: t('Choose the antonym of RESPONSIBLE:', 'RESPONSIBLE-এর antonym বাছো:'),
        options: [t('unresponsible', 'unresponsible'), t('irresponsible', 'irresponsible'), t('disresponsible', 'disresponsible'), t('inresponsible', 'inresponsible')],
        correct: 1,
        explanation: [
          t('"Responsible" starts with "r", and words starting with "r" usually take "ir-".', '"Responsible" শুরু "r" দিয়ে, আর "r" দিয়ে শুরু শব্দে সাধারণত "ir-" বসে।'),
          t('So the opposite is "irresponsible". The other three are not real English words.', 'তাই বিপরীত শব্দ "irresponsible"। বাকি তিনটে আসল ইংরেজি শব্দই নয়।'),
        ],
      },
    },
    {
      key: 'word_in_context',
      emoji: '🔍',
      name: t('Synonym of a word used in a sentence', 'বাক্যে ব্যবহৃত শব্দের synonym'),
      spot: t('A full sentence is given with one word in capitals or bold, and you must find its meaning as used in that sentence.', 'একটা গোটা বাক্য দেওয়া, তার একটা শব্দ বড় হাতের অক্ষরে বা bold-এ; ওই বাক্যে শব্দটার যে মানে, সেটা খুঁজতে হবে।'),
      method: [
        t('Read the whole sentence; the other words are clues to the meaning.', 'গোটা বাক্যটা পড়ো; অন্য শব্দগুলোই অর্থের সূত্র দেয়।'),
        t('Cover the word and guess what simple word would fit in its place.', 'শব্দটা ঢেকে ভাবো তার জায়গায় কোন সহজ শব্দ বসবে।'),
        t('Put each option in the sentence; keep the one that keeps the same meaning.', 'প্রতিটা option বাক্যে বসাও; যেটায় অর্থ একই থাকে সেটা রাখো।'),
      ],
      example: {
        question: t(
          'Choose the word closest in meaning to the word in capitals: "His LUCID explanation helped everyone understand the topic." (a) confusing (b) clear (c) long (d) loud',
          'বড় হাতের অক্ষরের শব্দটির সবচেয়ে কাছাকাছি অর্থের শব্দ বাছো: "His LUCID explanation helped everyone understand the topic." (a) confusing (b) clear (c) long (d) loud',
        ),
        steps: [
          t('Clue: the explanation "helped everyone understand", so it must be easy to follow.', 'সূত্র: ব্যাখ্যাটা "সবাইকে বুঝতে সাহায্য করল", অর্থাৎ সহজবোধ্য।'),
          t('"Lucid" means clear and easy to understand. "Confusing" is the opposite.', '"Lucid" মানে স্পষ্ট ও সহজবোধ্য। "Confusing" এর বিপরীত।'),
        ],
        answer: t('(b) clear', 'উত্তর: (b) clear'),
      },
      tryIt: {
        question: t(
          'Choose the word closest in meaning to the word in capitals: "The old man was very FRUGAL and never wasted a single rupee."',
          'বড় হাতের অক্ষরের শব্দটির সবচেয়ে কাছাকাছি অর্থের শব্দ বাছো: "The old man was very FRUGAL and never wasted a single rupee."',
        ),
        options: [t('generous', 'generous'), t('rich', 'rich'), t('thrifty', 'thrifty'), t('careless', 'careless')],
        correct: 2,
        explanation: [
          t('Clue: he "never wasted a single rupee", so he was careful with money.', 'সূত্র: সে "একটা টাকাও নষ্ট করত না", অর্থাৎ টাকা খরচে খুব হিসেবি।'),
          t('"Frugal" means careful not to spend or waste money = "thrifty".', '"Frugal" মানে টাকা খরচ বা নষ্ট না করতে সাবধানী = "thrifty" (মিতব্যয়ী)।'),
          t('"Generous" and "careless" are nearly opposite; "rich" is about how much money he has, not how he spends it.', '"Generous" আর "careless" প্রায় বিপরীত; "rich" মানে কত টাকা আছে, কীভাবে খরচ করে তা নয়।'),
        ],
      },
    },
    {
      key: 'root_words',
      emoji: '🌱',
      name: t('Hard words: use the root (bene = good, mal = bad)', 'কঠিন শব্দ: root দেখে অর্থ বোঝো (bene = ভালো, mal = খারাপ)'),
      spot: t('The given word is long or unfamiliar, but it contains a common Latin or Greek root such as bene, mal, phil, chron, ver.', 'দেওয়া শব্দটা লম্বা বা অচেনা, কিন্তু তার ভেতরে bene, mal, phil, chron, ver-এর মতো চেনা Latin বা Greek root আছে।'),
      method: [
        t('Break the word into parts and find the root.', 'শব্দটা ভেঙে root খুঁজে বের করো।'),
        t('Common roots: bene = good, mal = bad, phil = love, mis = wrong/hate, chron = time, ver = true, vol = wish/will.', 'চেনা root: bene = ভালো, mal = খারাপ, phil = ভালোবাসা, mis = ভুল/ঘৃণা, chron = সময়, ver = সত্য, vol = ইচ্ছা।'),
        t('Use the root to decide if the word is positive or negative, then choose the option with the same feeling (or the opposite feeling for antonyms).', 'Root দেখে ঠিক করো শব্দটা ভালো অর্থের না খারাপ অর্থের, তারপর একই ভাবের option বাছো (antonym হলে উল্টো ভাবের)।'),
      ],
      example: {
        question: t('Choose the synonym of BENEVOLENT: (a) cruel (b) kind (c) proud (d) lazy', 'BENEVOLENT-এর synonym বাছো: (a) cruel (b) kind (c) proud (d) lazy'),
        steps: [
          t('Break it: bene (good) + vol (wish) → "wishing good to others".', 'ভাঙো: bene (ভালো) + vol (ইচ্ছা) → "অন্যের ভালো চাওয়া"।'),
          t('So "benevolent" means kind and generous. "Cruel" is the opposite.', 'তাই "benevolent" মানে দয়ালু, পরোপকারী। "Cruel" এর বিপরীত।'),
        ],
        answer: t('(b) kind', 'উত্তর: (b) kind'),
      },
      tryIt: {
        question: t('Choose the synonym of MALICIOUS:', 'MALICIOUS-এর synonym বাছো:'),
        options: [t('spiteful', 'spiteful'), t('kind', 'kind'), t('foolish', 'foolish'), t('delicious', 'delicious')],
        correct: 0,
        explanation: [
          t('The root "mal" means bad, so "malicious" is a negative word: wanting to harm others.', 'Root "mal" মানে খারাপ, তাই "malicious" খারাপ অর্থের শব্দ: অন্যের ক্ষতি করতে চাওয়া (বিদ্বেষপূর্ণ)।'),
          t('"Spiteful" also means wanting to hurt others. "Kind" is the opposite, "foolish" is a different idea, and "delicious" only sounds similar.', '"Spiteful" মানেও অন্যকে আঘাত করতে চাওয়া। "Kind" বিপরীত, "foolish" আলাদা অর্থ, আর "delicious" শুধু শুনতে একরকম।'),
        ],
      },
    },
  ],
};
