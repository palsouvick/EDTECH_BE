'use strict';

const t = (en, bn) => ({ en, bn });

const P_SUNDARBANS =
  '> The Sundarbans is the largest mangrove forest in the world. It lies in the delta of the Ganga, Brahmaputra and Meghna rivers. The forest is home to the Royal Bengal Tiger. Twice a day the tide rises and covers the roots of the trees with salty water.';
const P_TAGORE =
  '> Rabindranath Tagore was born in Kolkata in 1861. He wrote poems, stories, songs and plays. In 1913, he became the first Asian to win the Nobel Prize in Literature. He also started a school at Santiniketan, which later grew into Visva-Bharati University.';
const P_WATER =
  '> In many villages, water becomes scarce in summer. The ponds dry up and the wells give very little water. Women often walk several kilometres to fetch a single pot. Every drop is used with great care.';
const P_BRIDGE =
  '> The old bridge over the river had become so fragile that the officials closed it. They feared it might break under the weight of heavy trucks. Cracks could be seen in many places. A new and stronger bridge is now being built next to it.';
const P_TREES =
  '> Trees give us oxygen and clean the air we breathe. Their roots hold the soil together and prevent floods. They give shelter to birds and animals, and fruit and wood to people. Without trees, life on Earth would become very difficult.';
const P_PHONES =
  '> Mobile phones have changed the way students learn. With a phone, a student can watch lessons, look up facts and talk to teachers from home. However, many students spend hours on games and social media. This harms their sleep, their eyes and their studies.';
const P_BEES =
  '> Honeybees live in large groups called colonies. Each colony has one queen, who lays all the eggs. The worker bees collect nectar from flowers and turn it into honey. While moving from flower to flower, bees also carry pollen, which helps plants produce fruit.';
const P_RAIL =
  '> Indian Railways is one of the largest railway networks in the world. It carries millions of passengers every day. The first passenger train in India ran between Bombay (now Mumbai) and Thane in 1853. Today it also carries goods such as coal, food grains and cement.';
const P_RINA =
  '> Rina looked out of the window at the dark clouds. The wind was getting stronger and the birds were flying back to their nests. She picked up her umbrella before leaving for school.';
const P_AMIT =
  '> Amit\'s alarm rang at 6 a.m., but he switched it off and went back to sleep. When he opened his eyes again, the clock showed 8:45. He jumped out of bed, skipped breakfast and ran to the bus stop. His exam was to begin at 9 o\'clock.';

const read = 'Read the passage and answer the question.';
const readBn = 'অনুচ্ছেদটি পড়ে প্রশ্নের উত্তর দাও।';

module.exports = {
  subject: 'english',
  topic: 'reading_comprehension',
  patterns: [
    {
      key: 'direct_fact',
      emoji: '🔎',
      name: t('Direct fact question (who, what, where, when)', 'সরাসরি তথ্যের প্রশ্ন (who, what, where, when)'),
      spot: t('The question asks for a fact stated plainly in the passage, using who, what, where, when, which or how many.', 'প্রশ্নে who, what, where, when, which বা how many দিয়ে এমন তথ্য চাওয়া হয়েছে যা অনুচ্ছেদে সোজাসুজি লেখা আছে।'),
      method: [
        t('Read the question first and pick out the key word (a name, a place, a year).', 'আগে প্রশ্নটা পড়ো আর মূল শব্দটা (নাম, জায়গা, সাল) চিহ্নিত করো।'),
        t('Scan the passage for that key word and read that sentence carefully.', 'অনুচ্ছেদে সেই মূল শব্দটা খুঁজে বের করো আর ওই বাক্যটা মন দিয়ে পড়ো।'),
        t('Choose the option that matches the passage, not your own general knowledge.', 'যে option অনুচ্ছেদের সঙ্গে মেলে সেটা বাছো, নিজের সাধারণ জ্ঞান দিয়ে নয়।'),
      ],
      example: {
        question: t(
          `${read}\n\n${P_SUNDARBANS}\n\nWhich animal is the forest home to?`,
          `${readBn}\n\n${P_SUNDARBANS}\n\nWhich animal is the forest home to? (বনটি কোন প্রাণীর বাসস্থান?)`,
        ),
        steps: [
          t('Key words: "home to".', 'মূল শব্দ: "home to"।'),
          t('The third sentence says: "The forest is home to the Royal Bengal Tiger."', 'তৃতীয় বাক্যে লেখা: "The forest is home to the Royal Bengal Tiger."'),
        ],
        answer: t('The Royal Bengal Tiger.', 'উত্তর: The Royal Bengal Tiger (রয়্যাল বেঙ্গল টাইগার)।'),
      },
      tryIt: {
        question: t(
          `${read}\n\n${P_TAGORE}\n\nWhere did Tagore start a school?`,
          `${readBn}\n\n${P_TAGORE}\n\nWhere did Tagore start a school? (রবীন্দ্রনাথ কোথায় স্কুল শুরু করেছিলেন?)`,
        ),
        options: [t('Kolkata', 'Kolkata'), t('Santiniketan', 'Santiniketan'), t('Delhi', 'Delhi'), t('Stockholm', 'Stockholm')],
        correct: 1,
        explanation: [
          t('Key words: "started a school". Find them in the passage.', 'মূল শব্দ: "started a school"। অনুচ্ছেদে খুঁজে বের করো।'),
          t('The last sentence says: "He also started a school at Santiniketan".', 'শেষ বাক্যে লেখা: "He also started a school at Santiniketan"।'),
          t('Kolkata is where he was born, which is the trap.', 'Kolkata হলো তাঁর জন্মস্থান — ওটাই ফাঁদ।'),
        ],
      },
    },
    {
      key: 'word_meaning',
      emoji: '📖',
      name: t('Meaning of a word as used in the passage', 'অনুচ্ছেদে ব্যবহৃত শব্দের মানে'),
      spot: t('The question says "The word ___ as used in the passage means..." or asks for a synonym or antonym of a passage word.', 'প্রশ্নে লেখা "The word ___ as used in the passage means..." অথবা অনুচ্ছেদের কোনো শব্দের synonym বা antonym চাওয়া হয়েছে।'),
      method: [
        t('Find the word in the passage and read the sentences before and after it.', 'অনুচ্ছেদে শব্দটা খুঁজে তার আগের আর পরের বাক্যগুলো পড়ো।'),
        t('Use those clues to guess the meaning in your own words.', 'ওই সূত্রগুলো দিয়ে নিজের ভাষায় মানেটা আন্দাজ করো।'),
        t('Put each option in place of the word; the right one keeps the sentence\'s meaning.', 'প্রতিটা option শব্দটার জায়গায় বসাও; ঠিক option বসালে বাক্যের অর্থ বদলায় না।'),
      ],
      example: {
        question: t(
          `${read}\n\n${P_WATER}\n\nThe word "scarce" as used in the passage means:`,
          `${readBn}\n\n${P_WATER}\n\nThe word "scarce" as used in the passage means: (অনুচ্ছেদে "scarce" শব্দের মানে কী?)`,
        ),
        steps: [
          t('Clues: ponds dry up, wells give very little water, women walk kilometres for one pot.', 'সূত্র: পুকুর শুকিয়ে যায়, কুয়োয় খুব কম জল, এক কলসি জলের জন্য মেয়েরা কয়েক কিলোমিটার হাঁটে।'),
          t('So "scarce" means there is not enough of it.', 'তাই "scarce" মানে যথেষ্ট পরিমাণে নেই (দুষ্প্রাপ্য)।'),
        ],
        answer: t('not enough; in short supply', 'উত্তর: not enough; in short supply (অপ্রতুল, দুষ্প্রাপ্য)'),
      },
      tryIt: {
        question: t(
          `${read}\n\n${P_BRIDGE}\n\nThe word "fragile" as used in the passage means:`,
          `${readBn}\n\n${P_BRIDGE}\n\nThe word "fragile" as used in the passage means: (অনুচ্ছেদে "fragile" শব্দের মানে কী?)`,
        ),
        options: [t('very old', 'very old'), t('very busy', 'very busy'), t('beautifully made', 'beautifully made'), t('weak and easily broken', 'weak and easily broken')],
        correct: 3,
        explanation: [
          t('Clues: "might break", "cracks", and the new bridge is "stronger".', 'সূত্র: "might break" (ভেঙে যেতে পারে), "cracks" (ফাটল), আর নতুন সেতুটা "stronger" (আরও মজবুত)।'),
          t('So "fragile" means weak and easily broken.', 'তাই "fragile" মানে দুর্বল, সহজে ভেঙে যায় (ভঙ্গুর)।'),
          t('"Very old" is tempting because the bridge is old, but that is not what "fragile" means.', 'সেতুটা পুরোনো বলে "very old" বাছতে ইচ্ছে করে, কিন্তু "fragile"-এর মানে সেটা নয়।'),
        ],
      },
    },
    {
      key: 'main_idea_title',
      emoji: '🏷️',
      name: t('Main idea / best title', 'মূল ভাব / সবচেয়ে উপযুক্ত শিরোনাম'),
      spot: t('The question asks "What is the main idea?", "What is the passage mainly about?" or "Choose the best title".', 'প্রশ্নে জানতে চাওয়া হয়েছে "What is the main idea?", "What is the passage mainly about?" বা "Choose the best title"।'),
      method: [
        t('Ask: what is EVERY sentence talking about? That is the main idea.', 'ভাবো: প্রতিটা বাক্য কী নিয়ে কথা বলছে? সেটাই মূল ভাব।'),
        t('Reject titles that are too narrow (only one detail) or too wide (more than the passage covers).', 'যে শিরোনাম খুব সংকীর্ণ (শুধু একটা খুঁটিনাটি) বা খুব বিস্তৃত (অনুচ্ছেদের বাইরের কথা), সেটা বাদ দাও।'),
        t('Reject titles that are more extreme than the passage ("never", "always").', 'যে শিরোনাম অনুচ্ছেদের চেয়ে বেশি চরম ("never", "always"), সেটাও বাদ দাও।'),
        t('If the passage gives two sides (good and bad), the title must show both.', 'অনুচ্ছেদে দুই দিক (ভালো আর খারাপ) থাকলে শিরোনামেও দুটোই থাকতে হবে।'),
      ],
      example: {
        question: t(
          `${read}\n\n${P_TREES}\n\nChoose the best title for the passage: (a) Birds and Their Nests (b) How to Plant a Tree (c) Why Trees Matter (d) Floods in India`,
          `${readBn}\n\n${P_TREES}\n\nঅনুচ্ছেদের সবচেয়ে উপযুক্ত শিরোনাম বাছো: (a) Birds and Their Nests (b) How to Plant a Tree (c) Why Trees Matter (d) Floods in India`,
        ),
        steps: [
          t('Every sentence lists a way trees help us: oxygen, soil, shelter, fruit and wood.', 'প্রতিটা বাক্যে গাছ আমাদের কীভাবে সাহায্য করে তা বলা: অক্সিজেন, মাটি, আশ্রয়, ফল আর কাঠ।'),
          t('"Birds" and "Floods" are single details (too narrow); planting is never discussed.', '"Birds" আর "Floods" শুধু একটা করে খুঁটিনাটি (খুব সংকীর্ণ); গাছ লাগানোর কথা অনুচ্ছেদে নেই।'),
        ],
        answer: t('(c) Why Trees Matter', 'উত্তর: (c) Why Trees Matter (গাছ কেন গুরুত্বপূর্ণ)'),
      },
      tryIt: {
        question: t(
          `${read}\n\n${P_PHONES}\n\nChoose the best title for the passage:`,
          `${readBn}\n\n${P_PHONES}\n\nঅনুচ্ছেদের সবচেয়ে উপযুক্ত শিরোনাম বাছো:`,
        ),
        options: [
          t('The History of Mobile Phones', 'The History of Mobile Phones'),
          t('Students Should Never Use Phones', 'Students Should Never Use Phones'),
          t('Mobile Phones: Helpful but Harmful if Overused', 'Mobile Phones: Helpful but Harmful if Overused'),
          t('How to Play Games on a Phone', 'How to Play Games on a Phone'),
        ],
        correct: 2,
        explanation: [
          t('The passage gives two sides: phones help students learn, but too much use harms them.', 'অনুচ্ছেদে দুই দিক আছে: ফোন পড়াশোনায় সাহায্য করে, কিন্তু বেশি ব্যবহারে ক্ষতি হয়।'),
          t('"Never Use Phones" is too extreme; history and how to play games are not discussed.', '"Never Use Phones" খুব চরম; ইতিহাস বা গেম খেলার পদ্ধতির কথা অনুচ্ছেদে নেই।'),
          t('Only the third title shows both the good and the bad side.', 'শুধু তৃতীয় শিরোনামে ভালো আর খারাপ দুই দিকই আছে।'),
        ],
      },
    },
    {
      key: 'not_true',
      emoji: '❌',
      name: t('Which statement is NOT true / NOT mentioned', 'কোন বক্তব্যটি সত্য নয় / উল্লেখ নেই'),
      spot: t('The question has a capital NOT or EXCEPT: "Which of the following is NOT true according to the passage?"', 'প্রশ্নে বড় হাতের NOT বা EXCEPT আছে: "Which of the following is NOT true according to the passage?"'),
      method: [
        t('Circle the word NOT so you do not forget it halfway.', 'NOT শব্দটায় গোল দাগ দাও, যাতে মাঝপথে ভুলে না যাও।'),
        t('Check each option against the passage and mark it True or False.', 'প্রতিটা option অনুচ্ছেদের সঙ্গে মিলিয়ে সত্য বা মিথ্যা দাগাও।'),
        t('Watch for small changes: a wrong number, year, name, or "all" instead of "some".', 'ছোট ছোট বদল খেয়াল করো: ভুল সংখ্যা, সাল, নাম, বা "some"-এর জায়গায় "all"।'),
        t('The answer is the one option that is False (or not stated).', 'উত্তর হলো সেই একটা option যেটা মিথ্যা (বা অনুচ্ছেদে বলা নেই)।'),
      ],
      example: {
        question: t(
          `${read}\n\n${P_BEES}\n\nWhich of the following is NOT true according to the passage? (a) Bees live in colonies. (b) Each colony has one queen. (c) Worker bees lay all the eggs. (d) Bees help plants produce fruit.`,
          `${readBn}\n\n${P_BEES}\n\nঅনুচ্ছেদ অনুযায়ী কোনটি সত্য নয়? (a) Bees live in colonies. (b) Each colony has one queen. (c) Worker bees lay all the eggs. (d) Bees help plants produce fruit.`,
        ),
        steps: [
          t('(a) True: "live in large groups called colonies". (b) True: "Each colony has one queen".', '(a) সত্য: "live in large groups called colonies"। (b) সত্য: "Each colony has one queen"।'),
          t('(c) False: the passage says the QUEEN lays all the eggs, not the workers.', '(c) মিথ্যা: অনুচ্ছেদ বলছে সব ডিম পাড়ে রানি (queen), কর্মী মৌমাছি নয়।'),
          t('(d) True: carrying pollen "helps plants produce fruit".', '(d) সত্য: পরাগ বহন করে "helps plants produce fruit"।'),
        ],
        answer: t('(c) Worker bees lay all the eggs.', 'উত্তর: (c) Worker bees lay all the eggs. (এটা সত্য নয়)'),
      },
      tryIt: {
        question: t(
          `${read}\n\n${P_RAIL}\n\nWhich of the following is NOT true according to the passage?`,
          `${readBn}\n\n${P_RAIL}\n\nঅনুচ্ছেদ অনুযায়ী কোনটি সত্য নয়?`,
        ),
        options: [
          t('The first passenger train ran between Bombay and Thane.', 'The first passenger train ran between Bombay and Thane.'),
          t('Indian Railways carries goods such as coal.', 'Indian Railways carries goods such as coal.'),
          t('It carries millions of passengers every day.', 'It carries millions of passengers every day.'),
          t('The first passenger train in India ran in 1953.', 'The first passenger train in India ran in 1953.'),
        ],
        correct: 3,
        explanation: [
          t('Options 1, 2 and 3 match the passage word for word.', 'Option 1, 2 আর 3 অনুচ্ছেদের সঙ্গে হুবহু মেলে।'),
          t('The passage says the first train ran in 1853, not 1953. A changed year is a common trick.', 'অনুচ্ছেদে আছে প্রথম ট্রেন চলেছিল 1853 সালে, 1953-এ নয়। সাল বদলে দেওয়া একটা চেনা কৌশল।'),
        ],
      },
    },
    {
      key: 'inference',
      emoji: '🧠',
      name: t('Inference: what can be concluded', 'অনুমান (Inference): কী সিদ্ধান্তে আসা যায়'),
      spot: t('The question says "It can be inferred that...", "The passage suggests..." or "What can you conclude?". The answer is not written directly.', 'প্রশ্নে লেখা "It can be inferred that...", "The passage suggests..." বা "What can you conclude?"। উত্তর সরাসরি লেখা থাকে না।'),
      method: [
        t('Collect the clues in the passage (times, actions, feelings).', 'অনুচ্ছেদ থেকে সূত্রগুলো জড়ো করো (সময়, কাজ, অনুভূতি)।'),
        t('Join the clues to reach the most sensible conclusion, like a detective.', 'গোয়েন্দার মতো সূত্রগুলো জুড়ে সবচেয়ে যুক্তিসঙ্গত সিদ্ধান্তে পৌঁছোও।'),
        t('Reject options that go against a clue, or that need information the passage never gives (e.g. "always").', 'যে option কোনো সূত্রের বিরুদ্ধে যায়, বা অনুচ্ছেদে নেই এমন তথ্যের উপর নির্ভর করে (যেমন "always"), সেটা বাদ দাও।'),
        t('The right inference is strongly supported but not copied word for word.', 'ঠিক অনুমানটা অনুচ্ছেদ দিয়ে জোরালোভাবে সমর্থিত, কিন্তু হুবহু লেখা থাকে না।'),
      ],
      example: {
        question: t(
          `${read}\n\n${P_RINA}\n\nWhat can be inferred from the passage?`,
          `${readBn}\n\n${P_RINA}\n\nঅনুচ্ছেদ থেকে কী অনুমান করা যায়?`,
        ),
        steps: [
          t('Clues: dark clouds, stronger wind, birds going back to their nests.', 'সূত্র: কালো মেঘ, জোরালো হাওয়া, পাখিরা বাসায় ফিরছে।'),
          t('These are signs of coming rain, and she takes an umbrella.', 'এগুলো বৃষ্টি আসার লক্ষণ, আর রিনা ছাতা নিল।'),
          t('So Rina expected it to rain, though the passage never says "rain".', 'তাই রিনা ভেবেছিল বৃষ্টি হবে, যদিও অনুচ্ছেদে "rain" শব্দটাই নেই।'),
        ],
        answer: t('Rina thought it was going to rain.', 'উত্তর: Rina thought it was going to rain. (রিনা ভেবেছিল বৃষ্টি আসবে)'),
      },
      tryIt: {
        question: t(
          `${read}\n\n${P_AMIT}\n\nWhat can be inferred from the passage?`,
          `${readBn}\n\n${P_AMIT}\n\nঅনুচ্ছেদ থেকে কী অনুমান করা যায়?`,
        ),
        options: [
          t('Amit was relaxed because he had plenty of time.', 'Amit was relaxed because he had plenty of time.'),
          t('Amit was in danger of being late for his exam.', 'Amit was in danger of being late for his exam.'),
          t('Amit had no exam that day.', 'Amit had no exam that day.'),
          t('Amit always skips breakfast.', 'Amit always skips breakfast.'),
        ],
        correct: 1,
        explanation: [
          t('Clues: he woke at 8:45, the exam started at 9:00, and he skipped breakfast and ran.', 'সূত্র: সে উঠেছে 8:45-এ, পরীক্ষা 9:00-এ, আর সে না খেয়ে দৌড়েছে।'),
          t('Only 15 minutes were left, so he was in danger of being late.', 'হাতে মাত্র 15 মিনিট ছিল, তাই তার দেরি হয়ে যাওয়ার ভয় ছিল।'),
          t('"Relaxed" and "no exam" go against the clues; "always" is not supported, since we only know about this one day.', '"Relaxed" আর "no exam" সূত্রের বিরুদ্ধে যায়; "always" সমর্থিত নয়, কারণ আমরা শুধু এই একদিনের কথা জানি।'),
        ],
      },
    },
  ],
};
