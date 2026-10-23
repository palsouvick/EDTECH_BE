'use strict';

module.exports = {
  subject: 'english',
  topic: 'fill_blanks',
  title: { en: 'Fill in the Blanks', bn: 'শূন্যস্থান পূরণ' },
  emoji: '📝',
  intro: {
    en: 'In fill in the blanks, a sentence has a gap (___) and you choose the word that fits best. The answer may be an article (*a, an, the*), a tense, a phrasal verb, a preposition or a vocabulary word. The other words in the sentence always give you a clue.',
    bn: 'Fill in the blanks-এ বাক্যে একটি ফাঁকা জায়গা (___) থাকে, আর সবচেয়ে মানানসই শব্দটি বাছতে হয়। উত্তর হতে পারে article (*a, an, the*), tense, phrasal verb, preposition বা কোনো শব্দভাণ্ডারের শব্দ। বাক্যের অন্য শব্দগুলোই সবসময় সূত্র দেয়।',
  },
  levels: [
    {
      level: 'basic',
      sections: [
        {
          heading: { en: 'Articles: a, an, the', bn: 'Article (পদাশ্রিত নির্দেশক): a, an, the' },
          body: {
            en: `**Articles** are the little words *a, an, the* that come before a noun (a naming word like *book*, *apple*).

- **a** before a consonant **sound**: *a boy, a cat, **a university*** (sounds like "you-niversity")
- **an** before a vowel **sound** (a, e, i, o, u sounds): *an apple, an egg, **an honest** man* (the *h* is silent: "onest")
- **the** for something specific or the only one: *the sun, **the best** player, the book I gave you*

Look at the **sound**, not the letter!
✓ *a **u**niform* ✓ *an **h**our* ✓ *a **o**ne-rupee coin* ✓ *an **M**LA* ("em-el-ay")`,
            bn: `**Article** হল *a, an, the*: ছোট শব্দ যা noun (নাম-শব্দ, যেমন *book*, *apple*)-এর আগে বসে।

- **a** বসে ব্যঞ্জনবর্ণের **উচ্চারণের** আগে: *a boy, a cat, **a university*** (উচ্চারণ "ইউ-নিভার্সিটি")
- **an** বসে স্বরবর্ণের **উচ্চারণের** আগে (a, e, i, o, u-এর ধ্বনি): *an apple, an egg, **an honest** man* (*h* উচ্চারিত হয় না: "অনেস্ট")
- **the** বসে নির্দিষ্ট কিছু বা একমাত্র জিনিসের আগে: *the sun, **the best** player, the book I gave you*

অক্ষর নয়, **উচ্চারণ** দেখো!
✓ *a **u**niform* ✓ *an **h**our* ✓ *a **o**ne-rupee coin* ✓ *an **M**LA* ("এম-এল-এ")`,
          },
        },
        {
          heading: { en: 'Simple present for facts and habits', bn: 'সত্য ও অভ্যাসের জন্য simple present' },
          body: {
            en: `Use the **simple present** for things that are always true or happen regularly:

✓ *The sun **rises** in the east.* (a fact)
✓ *Water **boils** at 100 °C.*
✓ *Riya **goes** to school every day.* (a habit)

With *he / she / it / one name*, add **-s** or **-es**: *he plays, she watches*.`,
            bn: `যা সবসময় সত্য বা নিয়মিত ঘটে, তার জন্য **simple present** বসে:

✓ *The sun **rises** in the east.* (চিরসত্য)
✓ *Water **boils** at 100 °C.*
✓ *Riya **goes** to school every day.* (অভ্যাস)

*he / she / it / কোনো একজনের নাম* থাকলে verb-এ **-s** বা **-es** যোগ হয়: *he plays, she watches*।`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Fill in the blank: "He is ___ honest man." (a / an / the / no article)', bn: 'শূন্যস্থান পূরণ করো: "He is ___ honest man." (a / an / the / no article)' },
          steps: [
            { en: 'In *honest*, the *h* is silent. The word starts with the sound "o".', bn: '*honest*-এ *h* উচ্চারিত হয় না। শব্দটি "অ" ধ্বনি দিয়ে শুরু।' },
            { en: 'A vowel sound takes *an*.', bn: 'স্বরধ্বনির আগে *an* বসে।' },
          ],
          answer: { en: '**an**: He is an honest man.', bn: 'সঠিক উত্তর: **an**: He is an honest man.' },
        },
        {
          question: { en: 'Fill in the blank: "She is ___ university student." (a / an / the / no article)', bn: 'শূন্যস্থান পূরণ করো: "She is ___ university student." (a / an / the / no article)' },
          steps: [
            { en: '*University* starts with the letter *u*, but the sound is "you", a consonant sound.', bn: '*University* অক্ষর *u* দিয়ে শুরু, কিন্তু উচ্চারণ "ইউ", যা ব্যঞ্জনধ্বনি।' },
            { en: 'A consonant sound takes *a*.', bn: 'ব্যঞ্জনধ্বনির আগে *a* বসে।' },
          ],
          answer: { en: '**a**: She is a university student.', bn: 'সঠিক উত্তর: **a**: She is a university student.' },
        },
        {
          question: { en: 'Fill in the blank: "The sun ___ in the east." (rose / has risen / is rising / rises)', bn: 'শূন্যস্থান পূরণ করো: "The sun ___ in the east." (rose / has risen / is rising / rises)' },
          steps: [
            { en: 'This is a fact that is always true.', bn: 'এটি একটি চিরসত্য।' },
            { en: 'Facts take the simple present, and *the sun* is singular, so add *-s*.', bn: 'চিরসত্যে simple present বসে, আর *the sun* singular, তাই *-s* যোগ হবে।' },
          ],
          answer: { en: '**rises**: The sun rises in the east.', bn: 'সঠিক উত্তর: **rises**: The sun rises in the east.' },
        },
      ],
    },
    {
      level: 'intermediate',
      sections: [
        {
          heading: { en: 'Phrasal verbs', bn: 'Phrasal verb (বিশেষ ক্রিয়াবাক্যাংশ)' },
          body: {
            en: `A **phrasal verb** is a verb + a small word (*up, off, out, after*) that together have a new meaning:

- **look up** = search for (a word) in a dictionary
- **look after** = take care of
- **call off** = cancel: *The match was called off due to rain.*
- **put out** = stop a fire: *The firemen put out the fire.*
- **put off** = postpone (do later)
- **take after** = look or behave like an older family member: *She takes after her mother.*
- **give up** = stop trying / stop a habit
- **turn down** = refuse: *He turned down the offer.*`,
            bn: `**Phrasal verb** হল verb + একটি ছোট শব্দ (*up, off, out, after*), যা মিলে নতুন অর্থ তৈরি করে:

- **look up** = অভিধানে (শব্দ) খোঁজা
- **look after** = দেখাশোনা করা
- **call off** = বাতিল করা: *The match was called off due to rain.*
- **put out** = আগুন নেভানো: *The firemen put out the fire.*
- **put off** = স্থগিত করা (পরে করা)
- **take after** = পরিবারের বড় কারও মতো দেখতে বা স্বভাবের হওয়া: *She takes after her mother.*
- **give up** = হাল ছেড়ে দেওয়া / অভ্যাস ছাড়া
- **turn down** = প্রত্যাখ্যান করা: *He turned down the offer.*`,
          },
        },
        {
          heading: { en: 'Words that go together (collocations)', bn: 'যে শব্দগুলো একসঙ্গে বসে (collocation)' },
          body: {
            en: `Some words naturally go together. These pairs are called **collocations**:

- *The police **registered** a case.* (not *wrote* a case)
- ***make** a mistake*, ***do** homework*, ***take** a decision*, ***pay** attention*
- ***heavy** rain* (not *strong rain*), ***strong** tea*, ***fast** colours*

Read each option inside the sentence and ask: "Have I heard this pair before?"`,
            bn: `কিছু শব্দ স্বাভাবিকভাবে একসঙ্গে বসে। এই জোড়াগুলোকে বলে **collocation**:

- *The police **registered** a case.* (*wrote* a case নয়)
- ***make** a mistake*, ***do** homework*, ***take** a decision*, ***pay** attention*
- ***heavy** rain* (*strong rain* নয়), ***strong** tea*, ***fast** colours*

প্রতিটি option বাক্যে বসিয়ে পড়ো আর ভাবো: "এই জোড়াটি কি আগে শুনেছি?"`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Fill in the blank: "The meeting was ___ because the chairman was ill." (called for / called off / called up / called on)', bn: 'শূন্যস্থান পূরণ করো: "The meeting was ___ because the chairman was ill." (called for / called off / called up / called on)' },
          steps: [
            { en: 'The chairman was ill, so the meeting could not happen.', bn: 'চেয়ারম্যান অসুস্থ ছিলেন, তাই মিটিং হতে পারেনি।' },
            { en: '*Call off* means cancel, which fits the meaning.', bn: '*Call off* মানে বাতিল করা, যা অর্থের সঙ্গে মেলে।' },
          ],
          answer: { en: '**called off**: The meeting was called off because the chairman was ill.', bn: 'সঠিক উত্তর: **called off**: The meeting was called off because the chairman was ill.' },
        },
        {
          question: { en: 'Fill in the blank: "The little girl takes ___ her mother; they look alike." (over / up / after / off)', bn: 'শূন্যস্থান পূরণ করো: "The little girl takes ___ her mother; they look alike." (over / up / after / off)' },
          steps: [
            { en: 'The clue is *they look alike* (they look the same).', bn: 'সূত্র হল *they look alike* (দেখতে একরকম)।' },
            { en: '*Take after* means to look like an older family member.', bn: '*Take after* মানে পরিবারের বড় কারও মতো দেখতে হওয়া।' },
          ],
          answer: { en: '**after**: The little girl takes after her mother; they look alike.', bn: 'সঠিক উত্তর: **after**: The little girl takes after her mother; they look alike.' },
        },
      ],
    },
    {
      level: 'advanced',
      sections: [
        {
          heading: { en: 'Use the clue words in the sentence', bn: 'বাক্যের সূত্র-শব্দ ব্যবহার করো' },
          body: {
            en: `Hard vocabulary blanks always contain a clue:

- **Contrast clue** (*though, but, yet, although*): the blank means the **opposite** of the other part.
  *Though he is rich, he is **stingy** and never spends money on others.* (rich ↔ unwilling to spend)
- **Cause clue** (*so, because, therefore*): the blank **leads to** the result.
  *The witness gave a **vague** account, so the police could not rely on it.* (vague = unclear)
- **Definition clue**: the rest of the sentence explains the word.
  *The professor's **abstruse** lecture was full of rare words that few students understood.* (abstruse = hard to understand)

Watch out for **look-alike words**: *vague / vogue / valid*, *preposterous* (absurd) / *prosperous* (rich).`,
            bn: `কঠিন শব্দের শূন্যস্থানে সবসময় একটি সূত্র থাকে:

- **বৈপরীত্যের সূত্র** (*though, but, yet, although*): শূন্যস্থানের শব্দটি অন্য অংশের **বিপরীত** অর্থ দেয়।
  *Though he is rich, he is **stingy** and never spends money on others.* (ধনী ↔ খরচ করতে চায় না, কৃপণ)
- **কারণের সূত্র** (*so, because, therefore*): শূন্যস্থানের শব্দ থেকেই **ফলাফল** আসে।
  *The witness gave a **vague** account, so the police could not rely on it.* (vague = অস্পষ্ট)
- **সংজ্ঞার সূত্র**: বাক্যের বাকি অংশই শব্দটির অর্থ বুঝিয়ে দেয়।
  *The professor's **abstruse** lecture was full of rare words that few students understood.* (abstruse = দুর্বোধ্য)

**একরকম দেখতে শব্দ** থেকে সাবধান: *vague / vogue / valid*, *preposterous* (অযৌক্তিক, হাস্যকর) / *prosperous* (সমৃদ্ধ)।`,
          },
        },
        {
          heading: { en: 'Future perfect and tricky prepositions', bn: 'Future perfect আর কঠিন preposition' },
          body: {
            en: `- **By + a future time** → **will have + 3rd form** (future perfect: the action will be finished before that time).
  ✓ *By December next year, they **will have completed** the bridge.*
- Some fixed prepositions at exam level:
  *applicable **to***, *comply **with***, *abide **by***, *insist **on***, *accused **of***, *charged **with***, *congratulate **on***, *die **of** a disease*.
  ✓ *The new rule is not applicable **to** senior citizens.*`,
            bn: `- **By + ভবিষ্যতের সময়** → **will have + 3rd form** (future perfect: সেই সময়ের আগেই কাজটি শেষ হয়ে যাবে)।
  ✓ *By December next year, they **will have completed** the bridge.*
- পরীক্ষার স্তরের কিছু নির্দিষ্ট preposition:
  *applicable **to***, *comply **with***, *abide **by***, *insist **on***, *accused **of***, *charged **with***, *congratulate **on***, *die **of** a disease*।
  ✓ *The new rule is not applicable **to** senior citizens.*`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Fill in the blank: "By December next year, they ___ the new bridge." (completed / had completed / will have completed / have completed)', bn: 'শূন্যস্থান পূরণ করো: "By December next year, they ___ the new bridge." (completed / had completed / will have completed / have completed)' },
          steps: [
            { en: '*Next year* tells us the time is in the future.', bn: '*Next year* বলছে সময়টা ভবিষ্যৎ।' },
            { en: '*By December* means the work will be finished before that point.', bn: '*By December* মানে ওই সময়ের আগেই কাজ শেষ হবে।' },
            { en: 'A future action finished before a future time takes *will have + 3rd form*.', bn: 'ভবিষ্যতের কোনো সময়ের আগে শেষ হওয়া কাজে *will have + 3rd form* বসে।' },
          ],
          answer: { en: '**will have completed**: By December next year, they will have completed the new bridge.', bn: 'সঠিক উত্তর: **will have completed**: By December next year, they will have completed the new bridge.' },
        },
        {
          question: { en: 'Fill in the blank: "The scientist\'s claim was so ___ that nobody took it seriously." (precious / preposterous / preliminary / prosperous)', bn: 'শূন্যস্থান পূরণ করো: "The scientist\'s claim was so ___ that nobody took it seriously." (precious / preposterous / preliminary / prosperous)' },
          steps: [
            { en: 'Clue: *nobody took it seriously*. So the claim must have been silly or unbelievable.', bn: 'সূত্র: *nobody took it seriously*। তাই দাবিটি নিশ্চয়ই হাস্যকর বা অবিশ্বাস্য ছিল।' },
            { en: '*Preposterous* means completely absurd. *Prosperous* (rich) only looks similar.', bn: '*Preposterous* মানে একেবারে অযৌক্তিক। *Prosperous* (সমৃদ্ধ) শুধু দেখতে একরকম।' },
          ],
          answer: { en: '**preposterous**: The scientist\'s claim was so preposterous that nobody took it seriously.', bn: 'সঠিক উত্তর: **preposterous**: The scientist\'s claim was so preposterous that nobody took it seriously.' },
        },
        {
          question: { en: 'Fill in the blank: "Though he is rich, he is ___ and never spends money on others." (stingy / generous / liberal / lavish)', bn: 'শূন্যস্থান পূরণ করো: "Though he is rich, he is ___ and never spends money on others." (stingy / generous / liberal / lavish)' },
          steps: [
            { en: '*Though* is a contrast clue, and *never spends money on others* explains the word.', bn: '*Though* হল বৈপরীত্যের সূত্র, আর *never spends money on others* শব্দটির অর্থ বুঝিয়ে দেয়।' },
            { en: '*Generous*, *liberal* and *lavish* all mean giving freely, the opposite of what we need.', bn: '*Generous*, *liberal* আর *lavish* সবকটির অর্থ উদারভাবে দেওয়া, যা আমাদের দরকারের উল্টো।' },
            { en: '*Stingy* means unwilling to spend money (miserly).', bn: '*Stingy* মানে টাকা খরচ করতে অনিচ্ছুক (কৃপণ)।' },
          ],
          answer: { en: '**stingy**: Though he is rich, he is stingy and never spends money on others.', bn: 'সঠিক উত্তর: **stingy**: Though he is rich, he is stingy and never spends money on others.' },
        },
      ],
    },
  ],
  rules: [
    {
      label: { en: 'a / an depends on the first sound', bn: 'a / an নির্ভর করে প্রথম উচ্চারণের উপর' },
      explain: { en: '*an hour, an honest man, an MBA*; *a university, a European, a one-way street*.', bn: 'অক্ষর নয়, উচ্চারণ দেখো: *an hour, an honest man, an MBA*; *a university, a European, a one-way street*।' },
    },
    {
      label: { en: 'the + superlative / only one', bn: 'the + superlative / একমাত্র জিনিস' },
      explain: { en: '*He is **the** best player in our team. **The** moon goes round **the** earth.*', bn: 'সবচেয়ে সেরা বা একমাত্র জিনিসের আগে *the*: *He is **the** best player in our team. **The** moon goes round **the** earth.*' },
    },
    {
      label: { en: 'Facts and habits → simple present', bn: 'চিরসত্য ও অভ্যাস → simple present' },
      explain: { en: '*The earth **moves** round the sun. He **reads** the newspaper every morning.*', bn: 'যা সবসময় সত্য বা রোজ ঘটে: *The earth **moves** round the sun. He **reads** the newspaper every morning.*' },
    },
    {
      label: { en: 'By + future time → will have + 3rd form', bn: 'By + ভবিষ্যতের সময় → will have + 3rd form' },
      explain: { en: '*By 2030, I **will have finished** my studies.*', bn: 'ওই সময়ের আগেই কাজ শেষ হবে: *By 2030, I **will have finished** my studies.*' },
    },
    {
      label: { en: 'Phrasal verbs change meaning with the small word', bn: 'ছোট শব্দ বদলালে phrasal verb-এর অর্থ বদলায়' },
      explain: { en: '*put out* (stop a fire) vs *put off* (postpone); *look up* (search) vs *look after* (take care of).', bn: '*put out* (আগুন নেভানো) আর *put off* (স্থগিত করা); *look up* (খোঁজা) আর *look after* (দেখাশোনা করা)।' },
    },
    {
      label: { en: 'Contrast words flip the meaning', bn: 'বৈপরীত্যের শব্দ অর্থ উল্টে দেয়' },
      explain: { en: 'After *though / but / yet*, expect the opposite idea: *She is poor **but** honest.*', bn: '*though / but / yet*-এর পরে উল্টো ভাব আশা করো: *She is poor **but** honest.*' },
    },
  ],
  tips: [
    { en: 'Say the word aloud before choosing *a* or *an*: it is the sound that matters, not the spelling.', bn: '*a* না *an* বাছার আগে শব্দটি জোরে উচ্চারণ করো: বানান নয়, উচ্চারণই আসল।' },
    { en: 'Common mistake: "a honest man", "an university". Correct: *an honest man*, *a university*.', bn: 'সাধারণ ভুল: "a honest man", "an university"। সঠিক: *an honest man*, *a university*।' },
    { en: 'Underline clue words like *though, so, because, by next year* before looking at the options.', bn: 'Option দেখার আগে *though, so, because, by next year*-এর মতো সূত্র-শব্দে দাগ দাও।' },
    { en: 'Beware of look-alike options (*vague / vogue*, *prosperous / preposterous*). Check the meaning, not the look.', bn: 'একরকম দেখতে option (*vague / vogue*, *prosperous / preposterous*) থেকে সাবধান। চেহারা নয়, অর্থ মেলাও।' },
    { en: 'Put your answer in the blank and read the full sentence once more. If it sounds odd, think again.', bn: 'উত্তরটি শূন্যস্থানে বসিয়ে পুরো বাক্য আবার পড়ো। অদ্ভুত লাগলে আবার ভাবো।' },
  ],
};
