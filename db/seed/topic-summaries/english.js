'use strict';

/**
 * English Language concept sheets ("how to solve") for SSC / Banking / WBCS / WB Postal.
 * Explanations are bilingual; the English words and sentences being discussed stay in English.
 *
 *   node db/seed/topic-summaries/validate.js db/seed/topic-summaries/english.js
 */

module.exports = [
  // ─────────────────────────────────────────────────────────────── Reading Comprehension
  {
    subject: 'english',
    topic: 'reading_comprehension',
    title: { en: 'Reading Comprehension', bn: 'রিডিং কম্প্রিহেনশন (অনুচ্ছেদ পাঠ)', hi: 'अपठित गद्यांश' },
    overview: {
      en: "You get a passage of 250-600 words followed by 4-6 questions: main idea, title, author's tone, direct facts, inferences and the meaning of a word in context. Every answer must come **from the passage**, not from your own knowledge. Glance at the questions first, then read the passage once at a steady pace, noting the main idea of each paragraph. Go back to the passage to verify each answer instead of relying on memory. Do direct-fact and vocabulary questions first; leave the main-idea and inference questions for last, when you understand the whole passage.",
      bn: 'একটি 250-600 শব্দের অনুচ্ছেদ দেওয়া থাকে, তারপর 4-6টি প্রশ্ন: মূল ভাব, শিরোনাম (title), লেখকের সুর (tone), সরাসরি তথ্য, অনুমান (inference) এবং প্রসঙ্গ অনুযায়ী শব্দের অর্থ। প্রতিটি উত্তর অবশ্যই **অনুচ্ছেদ থেকে** আসবে, নিজের সাধারণ জ্ঞান থেকে নয়। আগে প্রশ্নগুলিতে একবার চোখ বুলিয়ে নিন, তারপর স্থির গতিতে অনুচ্ছেদটি একবার পড়ুন এবং প্রতিটি প্যারাগ্রাফের মূল কথা মনে রাখুন। স্মৃতির উপর ভরসা না করে প্রতিটি উত্তর অনুচ্ছেদে ফিরে গিয়ে মিলিয়ে নিন। সরাসরি তথ্য ও শব্দার্থের প্রশ্ন আগে করুন; মূল ভাব ও অনুমানের প্রশ্ন শেষে করুন, যখন পুরো অনুচ্ছেদটি বোঝা হয়ে গেছে।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'Read the question stems before the passage', bn: 'অনুচ্ছেদের আগে প্রশ্নগুলি পড়ুন' },
        body: {
          en: "Read only the question stems (not the options) first. Then, while reading, you know what to look for. Example: if a question asks *Why did the farmers protest?*, you will notice the sentence that gives the reason the moment you reach it.",
          bn: 'আগে শুধু প্রশ্নগুলি পড়ুন (বিকল্পগুলি নয়)। তাহলে পড়ার সময় জানবেন কী খুঁজতে হবে। উদাহরণ: প্রশ্ন যদি হয় *Why did the farmers protest?*, তাহলে কারণটি যে বাক্যে আছে সেখানে পৌঁছানো মাত্র আপনার চোখে পড়বে।',
        },
      },
      {
        title: { en: 'Main idea and title: look at the first and last paragraphs', bn: 'মূল ভাব ও শিরোনাম: প্রথম ও শেষ প্যারাগ্রাফ দেখুন' },
        body: {
          en: 'The central idea is usually stated in the opening paragraph and restated in the conclusion. The correct title covers the **whole** passage: it is neither too broad (*Science*) nor too narrow (one example from paragraph 2). For a passage on how plastic harms marine life, *Plastic and the Oceans* beats both *Pollution* and *Turtles*.',
          bn: 'কেন্দ্রীয় ভাবটি সাধারণত প্রথম প্যারাগ্রাফে বলা থাকে এবং উপসংহারে আবার বলা হয়। সঠিক শিরোনাম **পুরো** অনুচ্ছেদকে ধরে: খুব বিস্তৃত (*Science*) নয়, আবার খুব সংকীর্ণও (দ্বিতীয় প্যারাগ্রাফের একটি উদাহরণ) নয়। সমুদ্রের প্রাণীদের উপর প্লাস্টিকের ক্ষতি নিয়ে লেখা অনুচ্ছেদের জন্য *Plastic and the Oceans* শিরোনামটি *Pollution* বা *Turtles*-এর চেয়ে ভালো।',
        },
      },
      {
        title: { en: 'Answer only from the passage', bn: 'শুধু অনুচ্ছেদ থেকে উত্তর দিন' },
        body: {
          en: "An option can be true in real life and still be wrong if the passage does not say it. If the passage says *Exercise improves mood*, the option *Exercise prevents heart disease* is wrong even though it is a fact; the passage never mentions it.",
          bn: 'একটি বিকল্প বাস্তবে সত্য হলেও ভুল হতে পারে, যদি অনুচ্ছেদে সেটি বলা না থাকে। অনুচ্ছেদে যদি থাকে *Exercise improves mood*, তাহলে *Exercise prevents heart disease* বিকল্পটি ভুল, যদিও এটি একটি সত্য তথ্য; কারণ অনুচ্ছেদে এর উল্লেখ নেই।',
        },
      },
      {
        title: { en: 'Vocabulary in context: substitute and re-read', bn: 'প্রসঙ্গে শব্দার্থ: বসিয়ে আবার পড়ুন' },
        body: {
          en: "Put each option in place of the word and re-read the sentence. The passage meaning wins over the dictionary meaning. In *The committee will **table** the proposal next week*, **table** means *present for discussion*, not a piece of furniture.",
          bn: 'প্রতিটি বিকল্প শব্দটির জায়গায় বসিয়ে বাক্যটি আবার পড়ুন। অভিধানের অর্থের চেয়ে অনুচ্ছেদের প্রসঙ্গের অর্থই আসল। *The committee will **table** the proposal next week* বাক্যে **table** মানে *আলোচনার জন্য পেশ করা*, আসবাবপত্র নয়।',
        },
      },
      {
        title: { en: 'Inference: supported, not stated, not extreme', bn: 'অনুমান (inference): সমর্থিত, সরাসরি বলা নয়, চরম নয়' },
        body: {
          en: "An inference is something the passage **implies** and that must be true if the passage is true. If the passage says *Sales fell sharply after the price rise*, a valid inference is *Customers were sensitive to price*; *The company will shut down* goes too far.",
          bn: 'Inference হল এমন কিছু যা অনুচ্ছেদ **ইঙ্গিত** করে এবং অনুচ্ছেদ সত্য হলে যা অবশ্যই সত্য। অনুচ্ছেদে যদি থাকে *Sales fell sharply after the price rise*, তবে সঠিক অনুমান *Customers were sensitive to price*; কিন্তু *The company will shut down* বাড়াবাড়ি, অনুচ্ছেদ এতদূর বলে না।',
        },
      },
      {
        title: { en: "Tone: watch the author's adjectives", bn: 'সুর (tone): লেখকের বিশেষণগুলি লক্ষ করুন' },
        body: {
          en: "Words like *alarming*, *reckless*, *sadly* signal a critical or concerned tone; *remarkable*, *promising* signal an appreciative or optimistic tone. Exam answers are usually moderate: *critical* or *analytical* is more likely than *furious* or *hostile*.",
          bn: '*alarming*, *reckless*, *sadly* জাতীয় শব্দ সমালোচনামূলক বা উদ্বিগ্ন সুর বোঝায়; *remarkable*, *promising* প্রশংসাসূচক বা আশাবাদী সুর বোঝায়। পরীক্ষায় সঠিক উত্তর সাধারণত মাঝামাঝি হয়: *furious* বা *hostile*-এর চেয়ে *critical* বা *analytical* বেশি সম্ভাব্য।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Scan for keywords to locate fact questions', bn: 'কীওয়ার্ড খুঁজে তথ্যের প্রশ্নের উত্তর বের করুন' },
        body: {
          en: "For a direct question, pick a rare word from it (a name, number or technical term) and scan for that word instead of re-reading the passage. Question: *What did the 1991 reforms remove?* Scan for **1991**; the answer is in that sentence or the next one.",
          bn: 'সরাসরি তথ্যের প্রশ্নে একটি বিশেষ শব্দ (নাম, সংখ্যা বা পারিভাষিক শব্দ) বেছে নিন এবং পুরো অনুচ্ছেদ আবার না পড়ে শুধু সেই শব্দটি খুঁজুন। প্রশ্ন: *What did the 1991 reforms remove?* **1991** খুঁজুন; উত্তর সেই বাক্যে বা তার পরের বাক্যে থাকবে।',
        },
        approx_time_saved_sec: 30,
      },
      {
        title: { en: 'Strike out extreme options', bn: 'চরম শব্দযুক্ত বিকল্প বাদ দিন' },
        body: {
          en: "Options containing **always, never, all, only, completely** are usually wrong unless the passage uses the same strong word. *Technology has **completely** solved poverty* can be crossed out at once for a passage that says technology *has helped reduce* poverty.",
          bn: '**always, never, all, only, completely** জাতীয় শব্দযুক্ত বিকল্প সাধারণত ভুল, যদি না অনুচ্ছেদেও একই জোরালো শব্দ থাকে। অনুচ্ছেদে যদি থাকে প্রযুক্তি দারিদ্র্য *কমাতে সাহায্য করেছে*, তবে *Technology has **completely** solved poverty* বিকল্পটি সঙ্গে সঙ্গে কেটে দিন।',
        },
        approx_time_saved_sec: 20,
      },
      {
        title: { en: 'Read topic sentences on a long passage', bn: 'বড় অনুচ্ছেদে প্রতিটি প্যারাগ্রাফের প্রথম বাক্য পড়ুন' },
        body: {
          en: "When time is short, read the first and last sentence of every paragraph carefully and skim the middle. Topic sentences carry the main idea, which is enough for title, theme and tone questions.",
          bn: 'সময় কম থাকলে প্রতিটি প্যারাগ্রাফের প্রথম ও শেষ বাক্য মন দিয়ে পড়ুন এবং মাঝের অংশে দ্রুত চোখ বুলিয়ে যান। প্রথম বাক্যেই (topic sentence) মূল ভাব থাকে, যা শিরোনাম, বিষয়বস্তু ও সুরের প্রশ্নের জন্য যথেষ্ট।',
        },
        approx_time_saved_sec: 60,
      },
      {
        title: { en: 'Answer vocabulary questions without reading the whole passage', bn: 'পুরো অনুচ্ছেদ না পড়েই শব্দার্থের প্রশ্ন করুন' },
        body: {
          en: "A vocabulary question needs only the sentence containing the word and the one before it. Do these first; they are quick marks. Example: for **meticulous** in *She kept meticulous records of every rupee spent*, the context points to *very careful*.",
          bn: 'শব্দার্থের প্রশ্নের জন্য শুধু শব্দটি যে বাক্যে আছে সেটি এবং তার আগের বাক্যটি পড়লেই চলে। এগুলো আগে করুন; দ্রুত নম্বর পাওয়া যায়। উদাহরণ: *She kept meticulous records of every rupee spent* বাক্যে **meticulous**-এর অর্থ প্রসঙ্গ থেকেই বোঝা যায়: *very careful* (অত্যন্ত যত্নশীল)।',
        },
        approx_time_saved_sec: 25,
      },
    ],
    common_traps: [
      {
        en: "**Outside knowledge.** Choosing an option because it is true in the real world, though the passage does not say it.",
        bn: '**বাইরের জ্ঞান ব্যবহার।** বাস্তবে সত্য বলে একটি বিকল্প বেছে নেওয়া, যদিও অনুচ্ছেদে সেটি বলা নেই।',
      },
      {
        en: "**Half-right options.** The first half matches the passage, the second half adds a cause or result the author never gave. Check every part of the option.",
        bn: '**অর্ধেক সঠিক বিকল্প।** বিকল্পের প্রথম অংশ অনুচ্ছেদের সঙ্গে মেলে, কিন্তু দ্বিতীয় অংশে এমন কারণ বা ফল যোগ করা থাকে যা লেখক বলেননি। বিকল্পের প্রতিটি অংশ যাচাই করুন।',
      },
      {
        en: "**Mixing up the author's view with a quoted view.** *Critics argue that the plan is costly* is the critics' opinion; the author may go on to reject it.",
        bn: '**লেখকের মত আর উদ্ধৃত মত গুলিয়ে ফেলা।** *Critics argue that the plan is costly* হল সমালোচকদের মত; লেখক পরে হয়তো সেটি খণ্ডন করেছেন।',
      },
      {
        en: "**Dictionary meaning in a vocabulary question.** The most common meaning of the word is often placed as a wrong option; always use the meaning in context.",
        bn: '**শব্দার্থের প্রশ্নে অভিধানের অর্থ বেছে নেওয়া।** শব্দটির সবচেয়ে প্রচলিত অর্থটি প্রায়ই ভুল বিকল্প হিসেবে রাখা হয়; সবসময় প্রসঙ্গের অর্থটি নিন।',
      },
      {
        en: "**Too broad or too narrow titles.** A title built on one example, or one that could fit any passage on the subject, is wrong.",
        bn: '**খুব বিস্তৃত বা খুব সংকীর্ণ শিরোনাম।** একটি মাত্র উদাহরণের উপর ভিত্তি করে তৈরি শিরোনাম, অথবা এই বিষয়ের যেকোনো অনুচ্ছেদে খাটে এমন শিরোনাম ভুল।',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Error Spotting
  {
    subject: 'english',
    topic: 'error_spotting',
    title: { en: 'Error Spotting', bn: 'ভুল খোঁজা (Error Spotting)', hi: 'त्रुटि पहचान' },
    overview: {
      en: "A sentence is split into 3-4 parts and you must find the part that contains a grammatical error, or mark *No error*. Read the whole sentence once for meaning, then check it in a fixed order: **subject-verb agreement → tense → pronoun → preposition/conjunction → article/adjective → word choice**. Most errors sit around a small set of trigger words such as *each, one of, neither…nor, hardly, since, than*. Mark *No error* only after the full checklist finds nothing.",
      bn: 'একটি বাক্যকে 3-4টি অংশে ভাগ করা থাকে; যে অংশে ব্যাকরণগত ভুল আছে সেটি বের করতে হবে, অথবা *No error* চিহ্নিত করতে হবে। প্রথমে অর্থ বোঝার জন্য পুরো বাক্যটি একবার পড়ুন, তারপর একটি নির্দিষ্ট ক্রমে যাচাই করুন: **subject-verb agreement → tense → pronoun → preposition/conjunction → article/adjective → শব্দচয়ন**। বেশিরভাগ ভুল কিছু নির্দিষ্ট ট্রিগার শব্দের আশেপাশে থাকে, যেমন *each, one of, neither…nor, hardly, since, than*। পুরো চেকলিস্ট মিলিয়ে কোনো ভুল না পেলে তবেই *No error* দিন।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'Find the real subject first', bn: 'প্রথমে আসল কর্তা (subject) খুঁজুন' },
        body: {
          en: "Ignore the phrase between the subject and the verb. *The quality of the mangoes **were** good* is wrong: the subject is **quality** (singular), so it should be *The quality of the mangoes **was** good*.",
          bn: 'কর্তা ও ক্রিয়ার মাঝের phrase-টি বাদ দিয়ে দেখুন। *The quality of the mangoes **were** good* ভুল: এখানে কর্তা **quality** (একবচন), তাই সঠিক হবে *The quality of the mangoes **was** good*।',
        },
      },
      {
        title: { en: 'Keep tenses consistent', bn: 'কালের (tense) সামঞ্জস্য রাখুন' },
        body: {
          en: "A past main clause normally takes a past reporting/subordinate clause: *He said that he **would** come* (not *will*). In the third conditional both halves move back: *If he **had worked** hard, he **would have passed***.",
          bn: 'মূল clause অতীত কালে থাকলে সাধারণত অধীন clause-ও অতীতে যায়: *He said that he **would** come* (*will* নয়)। Third conditional-এ দুই অংশই পিছিয়ে যায়: *If he **had worked** hard, he **would have passed***।',
        },
      },
      {
        title: { en: 'Since / for take the perfect tense', bn: 'Since / for থাকলে perfect tense হয়' },
        body: {
          en: "An action that started in the past and continues now takes the present perfect (continuous). **Since** + point of time, **for** + period of time: *I **have been living** here since 2015* / *for ten years* (not *I am living here since 2015*).",
          bn: 'অতীতে শুরু হয়ে এখনও চলছে এমন কাজের জন্য present perfect (continuous) হয়। **Since** + নির্দিষ্ট সময়বিন্দু, **for** + সময়ের পরিমাণ: *I **have been living** here since 2015* / *for ten years* (*I am living here since 2015* ভুল)।',
        },
      },
      {
        title: { en: 'Pronoun case after prepositions and than/as', bn: 'Preposition ও than/as-এর পরে pronoun-এর রূপ' },
        body: {
          en: "A preposition takes the object form: *between you and **me*** (not *I*). After *than/as*, complete the clause mentally: *He is taller than **I** (am)*; *She likes you more than **me*** means *more than she likes me*.",
          bn: 'Preposition-এর পরে pronoun-এর object রূপ বসে: *between you and **me*** (*I* নয়)। *than/as*-এর পরে মনে মনে বাক্যটি সম্পূর্ণ করুন: *He is taller than **I** (am)*; আবার *She likes you more than **me*** মানে *সে আমাকে যতটা পছন্দ করে তার চেয়ে তোমাকে বেশি*।',
        },
      },
      {
        title: { en: 'Fixed pairs and fixed prepositions', bn: 'নির্দিষ্ট জোড়া শব্দ ও নির্দিষ্ট preposition' },
        body: {
          en: "Some words always go together: *No sooner … **than***, *Hardly/Scarcely … **when***, *superior/inferior/senior/junior/prefer … **to***. Some verbs take **no** preposition: *discuss the matter* (not *discuss about*), *enter the room* (not *enter into the room*), *reach the station* (not *reach at*).",
          bn: 'কিছু শব্দ সবসময় একসঙ্গে বসে: *No sooner … **than***, *Hardly/Scarcely … **when***, *superior/inferior/senior/junior/prefer … **to***। আবার কিছু verb-এর পরে **কোনো** preposition বসে না: *discuss the matter* (*discuss about* নয়), *enter the room* (*enter into the room* নয়), *reach the station* (*reach at* নয়)।',
        },
      },
      {
        title: { en: 'Avoid double negatives and redundancy', bn: 'Double negative ও অপ্রয়োজনীয় পুনরুক্তি বর্জন করুন' },
        body: {
          en: "*Hardly, scarcely, seldom, unless, lest* are already negative: *I can **hardly** see* (not *I can't hardly see*). Redundant words are errors too: *return* (not *return back*), *repeat* (not *repeat again*), *cousin* (not *cousin brother*).",
          bn: '*Hardly, scarcely, seldom, unless, lest* নিজেরাই নেতিবাচক: *I can **hardly** see* (*I can\'t hardly see* ভুল)। অপ্রয়োজনীয় শব্দও ভুল হিসেবে ধরা হয়: *return* (*return back* নয়), *repeat* (*repeat again* নয়), *cousin* (*cousin brother* নয়)।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Scan for trigger words first', bn: 'আগে ট্রিগার শব্দগুলি খুঁজুন' },
        body: {
          en: "Before reading slowly, scan for *each, every, one of, either/neither, the number of, since, hardly, no sooner, lest, than, prefer*. In *No sooner had he left **when** it rained*, the trigger **No sooner** tells you instantly that *when* must be **than**.",
          bn: 'ধীরে পড়ার আগে *each, every, one of, either/neither, the number of, since, hardly, no sooner, lest, than, prefer* শব্দগুলি খুঁজুন। *No sooner had he left **when** it rained* বাক্যে **No sooner** দেখেই বোঝা যায় *when*-এর জায়গায় **than** হবে।',
        },
        approx_time_saved_sec: 20,
      },
      {
        title: { en: 'Check the verb in each part first', bn: 'প্রতিটি অংশে আগে verb যাচাই করুন' },
        body: {
          en: "Agreement and tense errors are the most frequent answers in SSC error spotting. Underline each verb and ask *Who is doing it?* and *When?* In *Each of the boys **have** a bicycle*, the verb fails the first question: **Each** is singular, so **has**.",
          bn: 'SSC-র error spotting-এ সবচেয়ে বেশি আসে agreement ও tense-এর ভুল। প্রতিটি verb চিহ্নিত করে প্রশ্ন করুন *কে করছে?* এবং *কখন?* *Each of the boys **have** a bicycle* বাক্যে প্রথম প্রশ্নেই ভুল ধরা পড়ে: **Each** একবচন, তাই **has** হবে।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Read the sentence aloud in your head', bn: 'মনে মনে বাক্যটি জোরে পড়ুন' },
        body: {
          en: "Common article and collocation errors often 'sound wrong': *He is **an** university student* jars at once because *university* begins with a *yoo* sound, so it takes **a**. Then confirm with the rule rather than trusting your ear alone.",
          bn: 'Article ও collocation-এর সাধারণ ভুলগুলি প্রায়ই শুনতে বেমানান লাগে: *He is **an** university student* শুনলেই খটকা লাগে, কারণ *university*-র শুরুতে *ইউ* ধ্বনি, তাই **a** বসবে। তবে শুধু কানের উপর ভরসা না করে নিয়ম দিয়ে নিশ্চিত হন।',
        },
        approx_time_saved_sec: 10,
      },
    ],
    common_traps: [
      {
        en: "**One of the + plural noun + singular verb.** *One of my friends **is** a doctor* (not *are*). The subject is *one*, and the noun after *of* must be plural: *one of my friends*, not *one of my friend*.",
        bn: '**One of the + বহুবচন noun + একবচন verb।** *One of my friends **is** a doctor* (*are* নয়)। কর্তা হল *one*, আর *of*-এর পরের noun অবশ্যই বহুবচন: *one of my friends*, *one of my friend* নয়।',
      },
      {
        en: "**Hardly/Scarcely … when, not than.** *Hardly had I reached the station **when** the train left.* Only *No sooner* takes *than*.",
        bn: '**Hardly/Scarcely … when, than নয়।** *Hardly had I reached the station **when** the train left.* শুধু *No sooner*-এর সঙ্গে *than* বসে।',
      },
      {
        en: "**Prefer … to, not than.** *I prefer tea **to** coffee.* The same applies to *superior, inferior, senior, junior, prior*: *He is senior **to** me*.",
        bn: '**Prefer … to, than নয়।** *I prefer tea **to** coffee.* *superior, inferior, senior, junior, prior*-এর ক্ষেত্রেও একই নিয়ম: *He is senior **to** me*।',
      },
      {
        en: "**Uncountable nouns have no plural.** *information, advice, furniture, luggage, equipment, scenery* take a singular verb and no *-s*: *The furniture **is** new* (not *furnitures are*). For one item say *a piece of advice*.",
        bn: '**অগণনীয় (uncountable) noun-এর বহুবচন হয় না।** *information, advice, furniture, luggage, equipment, scenery*-র সঙ্গে একবচন verb বসে এবং *-s* যোগ হয় না: *The furniture **is** new* (*furnitures are* নয়)। একটির কথা বলতে *a piece of advice* বলুন।',
      },
      {
        en: "**Marking No error too early.** Many sentences look fine at first reading. Run the full checklist (agreement, tense, pronoun, preposition, article) before choosing it.",
        bn: '**তাড়াহুড়ো করে No error দেওয়া।** অনেক বাক্য প্রথমবার পড়লে ঠিক মনে হয়। পুরো চেকলিস্ট (agreement, tense, pronoun, preposition, article) মিলিয়ে তবেই এই বিকল্পটি বাছুন।',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Sentence Improvement
  {
    subject: 'english',
    topic: 'sentence_improvement',
    title: { en: 'Sentence Improvement', bn: 'বাক্য সংশোধন (Sentence Improvement)', hi: 'वाक्य सुधार' },
    overview: {
      en: "A part of the sentence is underlined or in bold, and you choose the option that should replace it, or *No improvement*. First decide **what is wrong** with the highlighted part before looking at the options. Then compare the options only where they differ, and pick the one that is grammatically correct, keeps the original meaning and is the most concise. Never choose an option that fixes one error but creates another.",
      bn: 'বাক্যের একটি অংশ দাগ দেওয়া বা bold করা থাকে; সেই অংশের জায়গায় কোন বিকল্পটি বসবে তা বাছতে হয়, অথবা *No improvement*। বিকল্প দেখার আগে নিজে ঠিক করুন চিহ্নিত অংশে **কী ভুল** আছে। তারপর বিকল্পগুলির শুধু পার্থক্যের জায়গাগুলি তুলনা করুন এবং সেটি বাছুন যেটি ব্যাকরণগতভাবে সঠিক, মূল অর্থ বজায় রাখে এবং সবচেয়ে সংক্ষিপ্ত। এমন বিকল্প কখনও নেবেন না যা একটি ভুল ঠিক করে কিন্তু আরেকটি ভুল তৈরি করে।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'Diagnose before you look at the options', bn: 'বিকল্প দেখার আগে ভুলটি চিহ্নিত করুন' },
        body: {
          en: "Ask: is it agreement, tense, preposition, idiom, word order or redundancy? In *He **is working here since** 2018*, the diagnosis is *since → perfect tense*, so you look straight for **has been working here since**.",
          bn: 'নিজেকে প্রশ্ন করুন: ভুলটি কি agreement, tense, preposition, idiom, শব্দক্রম, নাকি পুনরুক্তির? *He **is working here since** 2018* বাক্যে ভুলটি হল *since থাকলে perfect tense*, তাই সরাসরি **has been working here since** বিকল্পটি খুঁজুন।',
        },
      },
      {
        title: { en: 'Subjunctive and "It is high time"', bn: 'Subjunctive ও "It is high time"' },
        body: {
          en: "For imaginary or wished situations use **were** for all persons: *If I **were** you, I would apologise*; *I wish I **were** taller*. After *It is (high) time*, use the simple past: *It is high time we **left***.",
          bn: 'কাল্পনিক বা ইচ্ছাসূচক অবস্থায় সব পুরুষে **were** বসে: *If I **were** you, I would apologise*; *I wish I **were** taller*। *It is (high) time*-এর পরে simple past বসে: *It is high time we **left***।',
        },
      },
      {
        title: { en: 'No will/would in an ordinary if-clause', bn: 'সাধারণ if-clause-এ will/would বসে না' },
        body: {
          en: "In a real-possibility conditional the if-clause takes the present tense: *If it **rains**, we will stay at home* (not *If it will rain*). In the second conditional use the past: *If he **came**, I would meet him* (not *If he would come*).",
          bn: 'বাস্তবে সম্ভব এমন শর্তে if-clause-এ present tense বসে: *If it **rains**, we will stay at home* (*If it will rain* নয়)। Second conditional-এ past বসে: *If he **came**, I would meet him* (*If he would come* নয়)।',
        },
      },
      {
        title: { en: 'Unless, until and lest are already negative', bn: 'Unless, until ও lest নিজেরাই নেতিবাচক' },
        body: {
          en: "Do not add *not* after them. *Unless you work hard, you will fail* (not *Unless you do not work hard*). *Wait here until I return* (not *until I do not return*). *Walk carefully lest you **should** fall* (not *lest you should not fall*; *lest* is followed by *should* or the base verb).",
          bn: 'এদের পরে আর *not* বসাবেন না। *Unless you work hard, you will fail* (*Unless you do not work hard* নয়)। *Wait here until I return* (*until I do not return* নয়)। *Walk carefully lest you **should** fall* (*lest you should not fall* নয়; *lest*-এর পরে *should* বা verb-এর মূল রূপ বসে)।',
        },
      },
      {
        title: { en: 'Prefer the concise, meaning-preserving option', bn: 'সংক্ষিপ্ত ও অর্থ অপরিবর্তিত রাখে এমন বিকল্প নিন' },
        body: {
          en: "Between two correct options, choose the shorter one without redundancy: *The reason he failed is **that** he was lazy* (not *is because*, which repeats *reason*). Reject any option that changes the meaning, e.g. turning *may* into *must*.",
          bn: 'দুটি বিকল্প সঠিক হলে পুনরুক্তিহীন ছোটটি নিন: *The reason he failed is **that** he was lazy* (*is because* নয়, কারণ এতে *reason*-এর অর্থ দুবার আসে)। যে বিকল্প অর্থ বদলে দেয়, যেমন *may*-কে *must* করে, তা বাদ দিন।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Compare only the differences', bn: 'শুধু পার্থক্যগুলি তুলনা করুন' },
        body: {
          en: "Options usually share most words. Spot the one or two words that change and decide only those. If options differ only in *has/have*, it is an agreement question: find the subject and you are done.",
          bn: 'বিকল্পগুলির বেশিরভাগ শব্দ সাধারণত একই থাকে। যে এক-দুটি শব্দ বদলাচ্ছে শুধু সেগুলি দেখে সিদ্ধান্ত নিন। বিকল্পগুলি যদি শুধু *has/have*-এ আলাদা হয়, তবে এটি agreement-এর প্রশ্ন: কর্তা খুঁজে নিলেই উত্তর পাওয়া যাবে।',
        },
        approx_time_saved_sec: 20,
      },
      {
        title: { en: 'Eliminate options that create a new error', bn: 'নতুন ভুল তৈরি করে এমন বিকল্প বাদ দিন' },
        body: {
          en: "For *Hardly **I had reached** when it rained*, both *Hardly had I reached **than*** and *Hardly had I reached **when*** fix the word order, but only the second keeps the correct pair, so the first is out immediately.",
          bn: '*Hardly **I had reached** when it rained* বাক্যে *Hardly had I reached **than*** এবং *Hardly had I reached **when*** দুটিই শব্দক্রম ঠিক করে, কিন্তু শুধু দ্বিতীয়টিতে সঠিক জোড়া আছে; তাই প্রথমটি সঙ্গে সঙ্গে বাদ।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Memorise redundancy pairs', bn: 'পুনরুক্তির জোড়াগুলি মুখস্থ রাখুন' },
        body: {
          en: "*return back, revert back, repeat again, cousin brother, the reason … is because, more better*. When the underlined part contains one of these, the shortest correct option is almost always the answer: *He **returned** the book*.",
          bn: '*return back, revert back, repeat again, cousin brother, the reason … is because, more better*। চিহ্নিত অংশে এর কোনোটি থাকলে প্রায় সবসময় সবচেয়ে ছোট সঠিক বিকল্পটিই উত্তর: *He **returned** the book*।',
        },
        approx_time_saved_sec: 10,
      },
    ],
    common_traps: [
      {
        en: "**Picking the longest, most formal-sounding option.** Length is not correctness; extra words often add redundancy or change the meaning.",
        bn: '**সবচেয়ে লম্বা বা ভারী শোনায় এমন বিকল্প বেছে নেওয়া।** দৈর্ঘ্য মানেই সঠিক নয়; বাড়তি শব্দ প্রায়ই পুনরুক্তি আনে বা অর্থ বদলে দেয়।',
      },
      {
        en: "**Ignoring No improvement.** In SSC papers it is the correct answer in a fair number of questions. If your checklist finds no error, choose it with confidence.",
        bn: '**No improvement-কে উপেক্ষা করা।** SSC-র প্রশ্নপত্রে বেশ কিছু প্রশ্নে এটিই সঠিক উত্তর। চেকলিস্ট মিলিয়ে ভুল না পেলে আত্মবিশ্বাসের সঙ্গে এটি বাছুন।',
      },
      {
        en: "**Fixing grammar but changing meaning.** *He might come* → *He will come* is grammatical, but the certainty has changed, so it is wrong.",
        bn: '**ব্যাকরণ ঠিক করতে গিয়ে অর্থ বদলে ফেলা।** *He might come* → *He will come* ব্যাকরণগতভাবে ঠিক, কিন্তু নিশ্চয়তার মাত্রা বদলে গেছে, তাই ভুল।',
      },
      {
        en: "**Though … but.** The correct pair is *Though/Although … yet* or no second conjunction at all: *Though he is poor, (yet) he is honest*, never *Though he is poor, but he is honest*.",
        bn: '**Though … but।** সঠিক জোড়া হল *Though/Although … yet*, অথবা দ্বিতীয় conjunction ছাড়াই: *Though he is poor, (yet) he is honest*; কখনও *Though he is poor, but he is honest* নয়।',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Grammar
  {
    subject: 'english',
    topic: 'grammar',
    title: {
      en: 'Grammar: Prepositions, Subject-Verb Agreement & Conjunctions',
      bn: 'ব্যাকরণ: Preposition, Subject-Verb Agreement ও Conjunction',
      hi: 'व्याकरण: पूर्वसर्ग, कर्ता-क्रिया सामंजस्य और संयोजक',
    },
    overview: {
      en: "Grammar questions test a handful of high-frequency rules: making the verb agree with its true subject, choosing the right preposition after a word, and using conjunctions in their fixed pairs. For agreement, strip away everything between the subject and the verb and decide whether the subject is singular or plural. For prepositions, learn words together with their preposition (*senior to, consist of, comply with*) rather than in isolation. For conjunctions, the moment you see the first word of a pair (*neither, not only, no sooner, though*), check that its partner is correct and that both halves are parallel.",
      bn: 'ব্যাকরণের প্রশ্নে কয়েকটি বহুল ব্যবহৃত নিয়ম যাচাই করা হয়: verb-কে তার আসল কর্তার সঙ্গে মেলানো, একটি শব্দের পরে সঠিক preposition বাছা, এবং conjunction-গুলি তাদের নির্দিষ্ট জোড়ায় ব্যবহার করা। Agreement-এর জন্য কর্তা ও verb-এর মাঝের সব অংশ বাদ দিয়ে দেখুন কর্তা একবচন না বহুবচন। Preposition-এর জন্য শব্দগুলি তাদের preposition সহ শিখুন (*senior to, consist of, comply with*), আলাদা করে নয়। Conjunction-এর ক্ষেত্রে জোড়ার প্রথম শব্দটি (*neither, not only, no sooner, though*) দেখা মাত্র যাচাই করুন তার সঙ্গী শব্দটি সঠিক কি না এবং দুই অংশ সমান্তরাল (parallel) কি না।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'Either…or / Neither…nor / Not only…but also: verb agrees with the nearer subject', bn: 'Either…or / Neither…nor / Not only…but also: verb কাছের কর্তার সঙ্গে মেলে' },
        body: {
          en: "*Neither the teacher nor the students **were** present.* / *Neither the students nor the teacher **was** present.* / *Either you or he **is** to blame.* / *Not only the players but also the coach **was** praised.* This is the proximity rule.",
          bn: '*Neither the teacher nor the students **were** present.* / *Neither the students nor the teacher **was** present.* / *Either you or he **is** to blame.* / *Not only the players but also the coach **was** praised.* একে proximity (নিকটবর্তিতা) নিয়ম বলে: verb-এর সবচেয়ে কাছের কর্তাটি দেখুন।',
        },
      },
      {
        title: { en: 'As well as / along with / together with / with / in addition to: verb agrees with the first subject', bn: 'As well as / along with / together with / with / in addition to: verb প্রথম কর্তার সঙ্গে মেলে' },
        body: {
          en: "These phrases do not make the subject plural. *The captain, along with his players, **was** honoured.* / *The teacher as well as the students **was** present.* Compare *The captain **and** his players **were** honoured*, where *and* does join two subjects.",
          bn: 'এই phrase-গুলি কর্তাকে বহুবচন করে না। *The captain, along with his players, **was** honoured.* / *The teacher as well as the students **was** present.* তুলনা করুন: *The captain **and** his players **were** honoured*; এখানে *and* সত্যিই দুটি কর্তাকে যুক্ত করেছে।',
        },
      },
      {
        title: { en: 'Each, every, the number of, amounts: singular verb', bn: 'Each, every, the number of, পরিমাণ: একবচন verb' },
        body: {
          en: "*Each of the students **has** passed.* / *Every boy and every girl **was** present.* / *The number of accidents **has** risen*, but *A number of students **were** absent* (= many students). A sum, distance or period seen as one unit is singular: *Ten kilometres **is** a long walk.*",
          bn: '*Each of the students **has** passed.* / *Every boy and every girl **was** present.* / *The number of accidents **has** risen*, কিন্তু *A number of students **were** absent* (= অনেক ছাত্র)। টাকার অঙ্ক, দূরত্ব বা সময়কাল একটি একক হিসেবে ধরলে একবচন হয়: *Ten kilometres **is** a long walk.*',
        },
      },
      {
        title: { en: 'Collective nouns and special nouns', bn: 'সমষ্টিবাচক (collective) ও বিশেষ noun' },
        body: {
          en: "A collective noun acting as one unit is singular: *The committee **has** submitted its report.* When the members act separately it is plural: *The committee **were** divided in their opinions.* *Police, cattle, people* are always plural (*The police **have** arrested him*); *news, mathematics, physics* are singular (*The news **is** good*).",
          bn: 'Collective noun একটি একক হিসেবে কাজ করলে একবচন: *The committee **has** submitted its report.* সদস্যরা আলাদাভাবে কাজ করলে বহুবচন: *The committee **were** divided in their opinions.* *Police, cattle, people* সবসময় বহুবচন (*The police **have** arrested him*); *news, mathematics, physics* একবচন (*The news **is** good*)।',
        },
      },
      {
        title: { en: 'Prepositions of time and fixed prepositions', bn: 'সময়ের preposition ও নির্দিষ্ট preposition' },
        body: {
          en: "**at** + clock time (*at 5 pm*, *at night*), **on** + day/date (*on Monday*, *on 15 August*), **in** + month/year/season/part of day (*in May*, *in 2020*, *in the morning*). Learn fixed pairs: *consist **of***, *comply **with***, *abstain **from***, *accused **of***, *charged **with***, *die **of*** a disease, *different **from***, *independent **of***, *married **to***, *senior **to***, *agree **with*** a person but *agree **to*** a proposal.",
          bn: '**at** + ঘড়ির সময় (*at 5 pm*, *at night*), **on** + বার/তারিখ (*on Monday*, *on 15 August*), **in** + মাস/বছর/ঋতু/দিনের অংশ (*in May*, *in 2020*, *in the morning*)। নির্দিষ্ট জোড়াগুলি মনে রাখুন: *consist **of***, *comply **with***, *abstain **from***, *accused **of***, *charged **with***, রোগে মারা যাওয়া *die **of***, *different **from***, *independent **of***, *married **to***, *senior **to***; ব্যক্তির সঙ্গে একমত *agree **with***, কিন্তু প্রস্তাবে রাজি *agree **to***।',
        },
      },
      {
        title: { en: 'Correlative conjunctions come in fixed pairs and need parallel halves', bn: 'Correlative conjunction নির্দিষ্ট জোড়ায় আসে এবং দুই অংশ সমান্তরাল হতে হয়' },
        body: {
          en: "*Both … and*, *Either … or*, *Neither … nor*, *Not only … but also*, *Though … yet*, *No sooner … than*, *Hardly/Scarcely … when*, *Whether … or*. Place each half before the same kind of word: *He is not only **intelligent** but also **hard-working*** (adjective + adjective), not *He not only is intelligent but also hard-working*.",
          bn: '*Both … and*, *Either … or*, *Neither … nor*, *Not only … but also*, *Though … yet*, *No sooner … than*, *Hardly/Scarcely … when*, *Whether … or*। জোড়ার প্রতিটি অংশ একই ধরনের শব্দের আগে বসান: *He is not only **intelligent** but also **hard-working*** (adjective + adjective); *He not only is intelligent but also hard-working* নয়।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Bracket the middle phrase', bn: 'মাঝের phrase-টি বন্ধনীতে রাখুন' },
        body: {
          en: "Mentally put brackets around any *of…*, *with…*, *along with…*, *as well as…* phrase and read subject + verb together. *The box [of chocolates] **is** on the table.* *The minister [along with his aides] **has** arrived.*",
          bn: 'যেকোনো *of…*, *with…*, *along with…*, *as well as…* phrase-কে মনে মনে বন্ধনীতে রাখুন এবং কর্তা ও verb একসঙ্গে পড়ুন। *The box [of chocolates] **is** on the table.* *The minister [along with his aides] **has** arrived.*',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'See the first word of a pair, jump to its partner', bn: 'জোড়ার প্রথম শব্দ দেখলেই সঙ্গীটি খুঁজুন' },
        body: {
          en: "When the sentence opens with *Neither, Not only, No sooner, Hardly, Though, Both*, skip straight to the partner word. *Both Ram **as well as** Shyam came* is wrong at a glance: *Both* needs **and**.",
          bn: 'বাক্য *Neither, Not only, No sooner, Hardly, Though, Both* দিয়ে শুরু হলে সরাসরি সঙ্গী শব্দটির কাছে যান। *Both Ram **as well as** Shyam came* এক নজরেই ভুল: *Both*-এর সঙ্গে **and** বসে।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Group the "to" words', bn: '"to" শব্দগুলি একসঙ্গে মনে রাখুন' },
        body: {
          en: "Latin comparatives and a few verbs take **to**, never *than*: *superior, inferior, senior, junior, prior, prefer, preferable, averse, addicted, accustomed* + **to**. *This model is superior **to** that one.* One list covers many questions.",
          bn: 'লাতিন থেকে আসা তুলনাবাচক শব্দ ও কিছু verb-এর পরে **to** বসে, কখনও *than* নয়: *superior, inferior, senior, junior, prior, prefer, preferable, averse, addicted, accustomed* + **to**। *This model is superior **to** that one.* একটি তালিকা মনে রাখলেই অনেক প্রশ্নের উত্তর হয়ে যায়।',
        },
        approx_time_saved_sec: 10,
      },
    ],
    common_traps: [
      {
        en: "**One of those who + plural verb.** In *He is one of those people who **are** always ready to help*, *who* refers to *those people*, so the verb is plural. Compare *One of the boys **is** absent*, where *one* is the subject.",
        bn: '**One of those who + বহুবচন verb।** *He is one of those people who **are** always ready to help* বাক্যে *who* বোঝাচ্ছে *those people*-কে, তাই verb বহুবচন। তুলনা করুন: *One of the boys **is** absent*; এখানে কর্তা *one*।',
      },
      {
        en: "**A number of vs The number of.** *A number of* (= many) takes a plural verb; *The number of* (= the count) takes a singular verb.",
        bn: '**A number of বনাম The number of।** *A number of* (= অনেক) বহুবচন verb নেয়; *The number of* (= সংখ্যাটি) একবচন verb নেয়।',
      },
      {
        en: "**Adding a preposition where none is needed.** *discuss about, enter into the room, reach at, comprises of* are wrong: say *discuss the plan, enter the room, reach Delhi, comprises five chapters*.",
        bn: '**অপ্রয়োজনীয় preposition যোগ করা।** *discuss about, enter into the room, reach at, comprises of* ভুল; বলুন *discuss the plan, enter the room, reach Delhi, comprises five chapters*।',
      },
      {
        en: "**Since vs for.** *since* + a point in time (*since Monday, since 2015*), *for* + a length of time (*for three days*). *I have known him **since** five years* is wrong; it should be *for five years*.",
        bn: '**Since বনাম for।** *since* + নির্দিষ্ট সময়বিন্দু (*since Monday, since 2015*), *for* + সময়ের পরিমাণ (*for three days*)। *I have known him **since** five years* ভুল; হবে *for five years*।',
      },
      {
        en: "**Neither … or / Either … nor.** The partners never cross: *neither* goes with *nor*, *either* with *or*.",
        bn: '**Neither … or / Either … nor।** জোড়া কখনও অদলবদল হয় না: *neither*-এর সঙ্গে *nor*, *either*-এর সঙ্গে *or*।',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Fill in the Blanks
  {
    subject: 'english',
    topic: 'fill_blanks',
    title: { en: 'Fill in the Blanks', bn: 'শূন্যস্থান পূরণ', hi: 'रिक्त स्थान भरें' },
    overview: {
      en: "A sentence (or a short passage, in cloze tests) has one or two blanks, and you choose the word that fits both the **grammar** and the **meaning**. Read the complete sentence first, then decide which part of speech the blank needs and what sense the context demands. Signal words tell you the direction: *but, although, however* signal contrast; *and, because, moreover* signal continuation. Try to predict a word of your own before reading the options, then pick the option closest to it.",
      bn: 'একটি বাক্যে (বা cloze test-এ একটি ছোট অনুচ্ছেদে) এক বা দুটি শূন্যস্থান থাকে; এমন শব্দ বাছতে হয় যা **ব্যাকরণ** ও **অর্থ** দুটির সঙ্গেই মেলে। আগে পুরো বাক্যটি পড়ুন, তারপর ঠিক করুন শূন্যস্থানে কোন part of speech দরকার এবং প্রসঙ্গ কোন অর্থ চাইছে। সংকেত শব্দগুলি দিক নির্দেশ করে: *but, although, however* বৈপরীত্য বোঝায়; *and, because, moreover* একই দিকে ধারাবাহিকতা বোঝায়। বিকল্প পড়ার আগে নিজে একটি শব্দ আন্দাজ করুন, তারপর তার সবচেয়ে কাছের বিকল্পটি নিন।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'Decide the part of speech first', bn: 'আগে part of speech ঠিক করুন' },
        body: {
          en: "The words around the blank tell you what it must be. After an article and before a noun, you need an adjective: *It was a ____ decision* → *wise* (adjective), not *wisdom* (noun) or *wisely* (adverb).",
          bn: 'শূন্যস্থানের আশেপাশের শব্দ বলে দেয় সেখানে কী বসবে। Article-এর পরে ও noun-এর আগে adjective লাগে: *It was a ____ decision* → *wise* (adjective); *wisdom* (noun) বা *wisely* (adverb) নয়।',
        },
      },
      {
        title: { en: 'Follow the signal words', bn: 'সংকেত শব্দ অনুসরণ করুন' },
        body: {
          en: "Contrast: *Although he was rich, he led a ____ life* → *simple / frugal* (opposite of what *rich* suggests). Continuation: *She was tired **and** ____* → a word in the same direction, such as *sleepy*. Cause: *He was fined **because** he was ____* → something that deserves a fine, such as *careless*.",
          bn: 'বৈপরীত্য: *Although he was rich, he led a ____ life* → *simple / frugal* (*rich*-এর বিপরীত ইঙ্গিত)। ধারাবাহিকতা: *She was tired **and** ____* → একই দিকের শব্দ, যেমন *sleepy*। কারণ: *He was fined **because** he was ____* → জরিমানার যোগ্য কিছু, যেমন *careless*।',
        },
      },
      {
        title: { en: 'Use collocations (words that go together)', bn: 'Collocation (যে শব্দগুলি একসঙ্গে বসে) ব্যবহার করুন' },
        body: {
          en: "English pairs certain verbs and nouns: *make a decision*, *do homework*, *pay attention*, *commit a crime*, *take a step*, *catch a cold*, *heavy rain* (not *strong rain*). *The police asked him to ____ attention* → **pay**.",
          bn: 'ইংরেজিতে কিছু verb ও noun নির্দিষ্টভাবে একসঙ্গে বসে: *make a decision*, *do homework*, *pay attention*, *commit a crime*, *take a step*, *catch a cold*, *heavy rain* (*strong rain* নয়)। *The police asked him to ____ attention* → **pay**।',
        },
      },
      {
        title: { en: 'Check grammar fit: articles, number, prepositions', bn: 'ব্যাকরণের মিল যাচাই করুন: article, বচন, preposition' },
        body: {
          en: "*a / an* depends on the first **sound**: *an hour, an honest man, an MBA*, but *a university, a European, a one-way street*. A preposition after the blank can decide it: *He is good ____ maths* → **at**; *She is fond ____ music* → **of**.",
          bn: '*a / an* নির্ভর করে প্রথম **ধ্বনির** উপর: *an hour, an honest man, an MBA*, কিন্তু *a university, a European, a one-way street*। শূন্যস্থানের পাশের preposition-ও উত্তর ঠিক করে দিতে পারে: *He is good ____ maths* → **at**; *She is fond ____ music* → **of**।',
        },
      },
      {
        title: { en: 'Double blanks: solve the easier blank first', bn: 'দুটি শূন্যস্থান: আগে সহজটি সমাধান করুন' },
        body: {
          en: "Fill whichever blank is more certain and strike out every option whose word for that blank fails. Usually only one or two options survive, and the second blank decides between them.",
          bn: 'যে শূন্যস্থানটি নিয়ে বেশি নিশ্চিত সেটি আগে পূরণ করুন এবং সেই শূন্যস্থানে যেসব বিকল্পের শব্দ খাটে না সেগুলি কেটে দিন। সাধারণত এক-দুটি বিকল্প বাকি থাকে, আর দ্বিতীয় শূন্যস্থান তাদের মধ্যে সিদ্ধান্ত করে দেয়।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Predict, then match', bn: 'আগে আন্দাজ, তারপর মিলান' },
        body: {
          en: "Cover the options and say your own word. For *The medicine had an immediate ____ on the patient*, you predict *effect / result*; then **effect** jumps out and distractors like *affect* (a verb) or *affection* are easier to reject.",
          bn: 'বিকল্পগুলি ঢেকে নিজে একটি শব্দ ভাবুন। *The medicine had an immediate ____ on the patient* বাক্যে আন্দাজ হবে *effect / result*; তখন **effect** সহজে চোখে পড়ে এবং *affect* (verb) বা *affection* জাতীয় বিভ্রান্তিকর বিকল্প বাদ দেওয়া সহজ হয়।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Cut options by tone (positive / negative)', bn: 'সুর দেখে (ইতিবাচক / নেতিবাচক) বিকল্প বাদ দিন' },
        body: {
          en: "Decide only whether the blank needs a positive or negative word. *His ____ remarks hurt everyone* needs a negative word, so *kind, gracious, witty* go out at once, leaving *caustic* or *rude*.",
          bn: 'শুধু ঠিক করুন শূন্যস্থানে ইতিবাচক না নেতিবাচক শব্দ লাগবে। *His ____ remarks hurt everyone* বাক্যে নেতিবাচক শব্দ দরকার, তাই *kind, gracious, witty* সঙ্গে সঙ্গে বাদ; বাকি থাকে *caustic* বা *rude*।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'In cloze tests, read the whole passage once first', bn: 'Cloze test-এ আগে পুরো অনুচ্ছেদটি একবার পড়ুন' },
        body: {
          en: "A 30-second read of the full cloze passage gives you its topic and tone, and later sentences often reveal the answer to an earlier blank. It saves far more time than guessing blank by blank.",
          bn: 'পুরো cloze অনুচ্ছেদটি 30 সেকেন্ডে একবার পড়ে নিলে বিষয় ও সুর বোঝা যায়, আর পরের বাক্যগুলি প্রায়ই আগের শূন্যস্থানের উত্তর দেখিয়ে দেয়। এক-এক করে আন্দাজ করার চেয়ে এতে অনেক বেশি সময় বাঁচে।',
        },
        approx_time_saved_sec: 40,
      },
    ],
    common_traps: [
      {
        en: "**Confusable pairs.** *affect* (verb: to influence) / *effect* (noun: result); *principal* (main, head of a school) / *principle* (rule); *stationary* (not moving) / *stationery* (paper, pens); *complement* (completes) / *compliment* (praise).",
        bn: '**বিভ্রান্তিকর শব্দজোড়া।** *affect* (verb: প্রভাবিত করা) / *effect* (noun: ফল); *principal* (প্রধান, অধ্যক্ষ) / *principle* (নীতি); *stationary* (স্থির) / *stationery* (কাগজ-কলম); *complement* (পরিপূরক) / *compliment* (প্রশংসা)।',
      },
      {
        en: "**Right meaning, wrong grammar.** In *She succeeded ____ clearing the exam*, *to* may seem natural but the verb takes **in** (*succeed in doing*).",
        bn: '**অর্থ ঠিক, ব্যাকরণ ভুল।** *She succeeded ____ clearing the exam* বাক্যে *to* স্বাভাবিক মনে হতে পারে, কিন্তু এই verb-এর পরে **in** বসে (*succeed in doing*)।',
      },
      {
        en: "**Choosing a/an by spelling instead of sound.** *a university* (starts with a *yoo* sound) and *an hour* (silent *h*) are correct.",
        bn: '**বানান দেখে a/an বাছা, ধ্বনি দেখে নয়।** *a university* (শুরুতে *ইউ* ধ্বনি) এবং *an hour* (*h* উচ্চারিত হয় না) সঠিক।',
      },
      {
        en: "**Ignoring the second blank.** In double-blank questions an option can fit the first blank perfectly and fail the second; always test both.",
        bn: '**দ্বিতীয় শূন্যস্থান উপেক্ষা করা।** দুটি শূন্যস্থানের প্রশ্নে একটি বিকল্প প্রথমটিতে নিখুঁত খাটতে পারে কিন্তু দ্বিতীয়টিতে ব্যর্থ হতে পারে; সবসময় দুটিই যাচাই করুন।',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Synonyms & Antonyms
  {
    subject: 'english',
    topic: 'synonyms_antonyms',
    title: { en: 'Synonyms & Antonyms', bn: 'সমার্থক ও বিপরীতার্থক শব্দ', hi: 'पर्यायवाची और विलोम' },
    overview: {
      en: "You are given a word, sometimes inside a sentence, and asked for the word closest in meaning (**synonym**) or opposite in meaning (**antonym**). First read the instruction twice: test-makers deliberately place a synonym among the options of an antonym question. If you know the word, predict its meaning before looking at the options. If you do not, use roots and prefixes, the positive or negative feel of the word, and the context sentence. The answer must be the **same part of speech** as the given word.",
      bn: 'একটি শব্দ দেওয়া থাকে, কখনও বাক্যের মধ্যে, এবং তার সবচেয়ে কাছের অর্থের শব্দ (**synonym**) বা বিপরীত অর্থের শব্দ (**antonym**) বাছতে বলা হয়। আগে নির্দেশটি দুবার পড়ুন: প্রশ্নকর্তারা ইচ্ছা করেই antonym প্রশ্নের বিকল্পে একটি synonym রেখে দেন। শব্দটি জানা থাকলে বিকল্প দেখার আগে অর্থটি মনে মনে ঠিক করুন। না জানলে root ও prefix, শব্দটির ইতিবাচক বা নেতিবাচক ভাব এবং প্রসঙ্গ-বাক্য ব্যবহার করুন। উত্তরটি অবশ্যই প্রদত্ত শব্দের **একই part of speech** হবে।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'Use roots and prefixes', bn: 'Root ও prefix ব্যবহার করুন' },
        body: {
          en: "*bene* = good (*benevolent* = kind), *mal* = bad (*malevolent* = wishing harm), *loqu* = speak (*loquacious* = talkative), *chron* = time (*chronic* = long-lasting), *phil* = love (*philanthropist*). So the antonym of **benevolent** is **malevolent**.",
          bn: '*bene* = ভালো (*benevolent* = দয়ালু), *mal* = খারাপ (*malevolent* = অনিষ্টকামী), *loqu* = বলা (*loquacious* = বাচাল), *chron* = সময় (*chronic* = দীর্ঘস্থায়ী), *phil* = ভালোবাসা (*philanthropist*)। তাই **benevolent**-এর antonym **malevolent**।',
        },
      },
      {
        title: { en: 'Feel the charge: positive or negative', bn: 'শব্দের ভাব বুঝুন: ইতিবাচক না নেতিবাচক' },
        body: {
          en: "Even without the exact meaning you can often tell if a word is positive or negative. *Obstinate* sounds negative (it means *stubborn*); its antonym must be positive or neutral, such as *flexible* or *docile*.",
          bn: 'সঠিক অর্থ না জানলেও প্রায়ই বোঝা যায় শব্দটি ইতিবাচক না নেতিবাচক। *Obstinate* নেতিবাচক শোনায় (অর্থ *জেদি*); তাই এর antonym ইতিবাচক বা নিরপেক্ষ হবে, যেমন *flexible* বা *docile*।',
        },
      },
      {
        title: { en: 'Use the context sentence when one is given', bn: 'প্রসঙ্গ-বাক্য থাকলে সেটি ব্যবহার করুন' },
        body: {
          en: "Replace the word with each option and keep the one that leaves the meaning unchanged (synonym) or reverses it (antonym). *The fame of the pop star proved **ephemeral*** → synonym *short-lived / transient*; antonym *lasting / permanent*.",
          bn: 'শব্দটির জায়গায় প্রতিটি বিকল্প বসান; যেটি অর্থ অপরিবর্তিত রাখে সেটি synonym, যেটি অর্থ উল্টে দেয় সেটি antonym। *The fame of the pop star proved **ephemeral*** → synonym *short-lived / transient*; antonym *lasting / permanent*।',
        },
      },
      {
        title: { en: 'Match the part of speech', bn: 'Part of speech মিলিয়ে নিন' },
        body: {
          en: "An adjective's synonym is an adjective. For **candid** (adjective), *frank* is correct; *candour* (noun) is a related word but cannot be the answer.",
          bn: 'Adjective-এর synonym-ও adjective হবে। **candid** (adjective)-এর জন্য *frank* সঠিক; *candour* (noun) সম্পর্কিত শব্দ হলেও উত্তর হতে পারে না।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Learn words in triads: word, synonym, antonym', bn: 'তিনটি করে শব্দ একসঙ্গে শিখুন: শব্দ, synonym, antonym' },
        body: {
          en: "Store each word with both partners: *loquacious – talkative – taciturn*, *gregarious – sociable – reclusive*, *frugal – thrifty – extravagant*, *lethargic – sluggish – energetic*. One memory then answers both question types.",
          bn: 'প্রতিটি শব্দ তার দুই সঙ্গী সহ মনে রাখুন: *loquacious – talkative – taciturn*, *gregarious – sociable – reclusive*, *frugal – thrifty – extravagant*, *lethargic – sluggish – energetic*। তাহলে একবার মনে রাখলেই দুই ধরনের প্রশ্নের উত্তর দেওয়া যায়।',
        },
        approx_time_saved_sec: 20,
      },
      {
        title: { en: 'In antonym questions, cross out the synonym first', bn: 'Antonym প্রশ্নে আগে synonym-টি কেটে দিন' },
        body: {
          en: "Find the option that means the **same** as the word and remove it, along with any unrelated words. Antonym of **scarcity**: options *dearth, abundance, shortage, quality* → *dearth* and *shortage* are synonyms, *quality* is unrelated, leaving **abundance**.",
          bn: 'যে বিকল্পটি শব্দটির **একই** অর্থ বোঝায় সেটি এবং সম্পর্কহীন শব্দগুলি বাদ দিন। **scarcity**-র antonym: বিকল্প *dearth, abundance, shortage, quality* → *dearth* ও *shortage* হল synonym, *quality* সম্পর্কহীন; বাকি থাকে **abundance**।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Negative prefixes give quick antonyms', bn: 'নেতিবাচক prefix দ্রুত antonym দেয়' },
        body: {
          en: "*un-, in-, im-, il-, ir-, dis-, mis-, a-* often turn a word into its opposite: *legible – illegible*, *mature – immature*, *relevant – irrelevant*, *honest – dishonest*, *moral – amoral*. If an option is the given word with one of these prefixes, test it first.",
          bn: '*un-, in-, im-, il-, ir-, dis-, mis-, a-* প্রায়ই শব্দকে বিপরীত করে দেয়: *legible – illegible*, *mature – immature*, *relevant – irrelevant*, *honest – dishonest*, *moral – amoral*। কোনো বিকল্প যদি প্রদত্ত শব্দের সঙ্গে এমন prefix যুক্ত রূপ হয়, আগে সেটি যাচাই করুন।',
        },
        approx_time_saved_sec: 10,
      },
    ],
    common_traps: [
      {
        en: "**Answering the wrong question.** A perfect synonym placed in an antonym question catches students who did not read *opposite in meaning*.",
        bn: '**ভুল প্রশ্নের উত্তর দেওয়া।** Antonym প্রশ্নে একটি নিখুঁত synonym রাখা থাকে; যারা *opposite in meaning* কথাটি খেয়াল করে না তারা এই ফাঁদে পড়ে।',
      },
      {
        en: "**Look-alike words.** *eminent* (famous) vs *imminent* (about to happen); *ingenious* (clever, inventive) vs *ingenuous* (innocent, naive); *credible* (believable) vs *credulous* (easily fooled).",
        bn: '**দেখতে একই রকম শব্দ।** *eminent* (বিখ্যাত) বনাম *imminent* (আসন্ন); *ingenious* (উদ্ভাবনী, বুদ্ধিমান) বনাম *ingenuous* (সরল, নিষ্পাপ); *credible* (বিশ্বাসযোগ্য) বনাম *credulous* (সহজে বিশ্বাস করে এমন)।',
      },
      {
        en: "**Not every in- is negative.** *inflammable* means *easily set on fire* (same as *flammable*), and *invaluable* means *priceless*, not *worthless*.",
        bn: '**সব in- নেতিবাচক নয়।** *inflammable* মানে *সহজে আগুন ধরে এমন* (*flammable*-এর সমার্থক), আর *invaluable* মানে *অমূল্য*, *মূল্যহীন* নয়।',
      },
      {
        en: "**Related but not equal.** For **frugal**, *poor* is related but wrong; *frugal* means careful with money (*thrifty*), not lacking money.",
        bn: '**সম্পর্কিত কিন্তু সমার্থক নয়।** **frugal**-এর জন্য *poor* সম্পর্কিত মনে হলেও ভুল; *frugal* মানে হিসেবি বা মিতব্যয়ী (*thrifty*), টাকার অভাব নয়।',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Idioms & Phrases
  {
    subject: 'english',
    topic: 'idioms_phrases',
    title: { en: 'Idioms & Phrases', bn: 'বাগধারা ও শব্দগুচ্ছ (Idioms & Phrases)', hi: 'मुहावरे और वाक्यांश' },
    overview: {
      en: "An idiom is a group of words whose meaning is **figurative**, different from the meanings of its individual words: *kick the bucket* means *to die*. Questions give the idiom alone or in a sentence and ask for its meaning; phrasal verbs (*put off, call off, look into*) are tested the same way. If you know the idiom, answer at once. If you do not, read the sentence for context, picture the image behind the idiom, and eliminate options that give the literal meaning. Regular revision of a themed list (body parts, animals, colours) is the most reliable preparation.",
      bn: 'Idiom হল এমন একটি শব্দগুচ্ছ যার অর্থ **রূপক** বা আলংকারিক, আলাদা আলাদা শব্দের অর্থ থেকে ভিন্ন: *kick the bucket* মানে *মারা যাওয়া*। প্রশ্নে idiom-টি একা বা বাক্যের মধ্যে দেওয়া থাকে এবং তার অর্থ জিজ্ঞাসা করা হয়; phrasal verb (*put off, call off, look into*)-ও একইভাবে আসে। Idiom-টি জানা থাকলে সঙ্গে সঙ্গে উত্তর দিন। না জানলে বাক্যের প্রসঙ্গ পড়ুন, idiom-এর পেছনের ছবিটি কল্পনা করুন, এবং আক্ষরিক অর্থ দেওয়া বিকল্পগুলি বাদ দিন। বিষয়ভিত্তিক তালিকা (শরীরের অঙ্গ, প্রাণী, রং) নিয়মিত ঝালিয়ে নেওয়াই সবচেয়ে নির্ভরযোগ্য প্রস্তুতি।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'The meaning is figurative, not literal', bn: 'অর্থটি রূপক, আক্ষরিক নয়' },
        body: {
          en: "*Spill the beans* = reveal a secret; *break the ice* = start a conversation in an awkward situation; *burn the midnight oil* = work or study late at night. An option about beans, ice or oil is a distractor.",
          bn: '*Spill the beans* = গোপন কথা ফাঁস করা; *break the ice* = অস্বস্তিকর পরিস্থিতিতে কথা শুরু করা; *burn the midnight oil* = গভীর রাত পর্যন্ত কাজ বা পড়াশোনা করা। শিম, বরফ বা তেল নিয়ে কোনো বিকল্প থাকলে সেটি বিভ্রান্তিকর।',
        },
      },
      {
        title: { en: 'Read the sentence for context', bn: 'প্রসঙ্গ বুঝতে বাক্যটি পড়ুন' },
        body: {
          en: "*After years of rivalry, the two neighbours decided to **bury the hatchet**.* *After years of rivalry* points to ending a quarrel, so the answer is *make peace*.",
          bn: '*After years of rivalry, the two neighbours decided to **bury the hatchet**.* *After years of rivalry* অংশটি ঝগড়া মেটানোর ইঙ্গিত দেয়, তাই উত্তর *make peace* (মিটমাট করা)।',
        },
      },
      {
        title: { en: 'Picture the image behind the idiom', bn: 'Idiom-এর পেছনের ছবিটি কল্পনা করুন' },
        body: {
          en: "*Let the cat out of the bag* – something hidden escapes → reveal a secret. *A white elephant* – a sacred animal that is costly to keep → a possession that costs more than it is worth. *Cry wolf* – the boy who raised false alarms → give a false alarm.",
          bn: '*Let the cat out of the bag* – লুকানো জিনিস বেরিয়ে পড়ে → গোপন কথা ফাঁস করা। *A white elephant* – পবিত্র কিন্তু পালনে ব্যয়বহুল প্রাণী → এমন সম্পত্তি যার খরচ তার উপযোগিতার চেয়ে বেশি। *Cry wolf* – মিথ্যে বিপদের সংকেত দেওয়া রাখাল বালকের গল্প → মিথ্যা সতর্কবার্তা দেওয়া।',
        },
      },
      {
        title: { en: 'Phrasal verbs: the particle changes the meaning', bn: 'Phrasal verb: সঙ্গের particle অর্থ বদলে দেয়' },
        body: {
          en: "*put off* = postpone; *put up with* = tolerate; *put up* = give someone a place to stay. *call off* = cancel; *call on* = visit. *look into* = investigate; *look up to* = respect; *look down upon* = despise. *bring up* = raise a child / mention a topic. *give in* = surrender, yield.",
          bn: '*put off* = স্থগিত করা; *put up with* = সহ্য করা; *put up* = কাউকে থাকার জায়গা দেওয়া। *call off* = বাতিল করা; *call on* = দেখা করতে যাওয়া। *look into* = তদন্ত করা; *look up to* = শ্রদ্ধা করা; *look down upon* = অবজ্ঞা করা। *bring up* = সন্তান মানুষ করা / কোনো প্রসঙ্গ তোলা। *give in* = হার মানা, নতিস্বীকার করা।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Strike out literal options first', bn: 'আগে আক্ষরিক অর্থের বিকল্প কেটে দিন' },
        body: {
          en: "For *to pay through the nose*, an option like *to have a nose injury* is literal and wrong; the idiom means *to pay far too much*. Removing literal options usually leaves two choices.",
          bn: '*to pay through the nose*-এর জন্য *to have a nose injury* জাতীয় বিকল্প আক্ষরিক এবং ভুল; idiom-টির অর্থ *অনেক বেশি দাম দেওয়া*। আক্ষরিক বিকল্পগুলি বাদ দিলে সাধারণত দুটি বিকল্প বাকি থাকে।',
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: 'Revise idioms by theme', bn: 'বিষয় অনুযায়ী idiom ঝালিয়ে নিন' },
        body: {
          en: "Body parts: *turn a blind eye* (deliberately ignore), *get cold feet* (lose nerve before something), *keep one's fingers crossed* (hope for good luck). Colours: *in black and white* (in writing), *red-letter day* (memorable day), *a bolt from the blue* (a sudden shock). Themed groups are easier to recall in the exam.",
          bn: 'শরীরের অঙ্গ: *turn a blind eye* (ইচ্ছা করে উপেক্ষা করা), *get cold feet* (কোনো কাজের আগে সাহস হারানো), *keep one\'s fingers crossed* (সৌভাগ্যের আশা করা)। রং: *in black and white* (লিখিতভাবে), *red-letter day* (স্মরণীয় দিন), *a bolt from the blue* (হঠাৎ আঘাত বা অপ্রত্যাশিত ঘটনা)। বিষয়ভিত্তিক দলে মনে রাখলে পরীক্ষায় মনে পড়া সহজ হয়।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Match the emotional direction', bn: 'আবেগের দিকটি মিলিয়ে নিন' },
        body: {
          en: "Decide whether the sentence describes something good or bad. *The new manager's arrival put the whole office **at sixes and sevens*** – if the context shows disorder, reject positive options and choose *in confusion*.",
          bn: 'বাক্যটি ভালো কিছু বোঝাচ্ছে না খারাপ, তা ঠিক করুন। *The new manager\'s arrival put the whole office **at sixes and sevens*** – প্রসঙ্গে বিশৃঙ্খলা বোঝালে ইতিবাচক বিকল্পগুলি বাদ দিয়ে *in confusion* (বিশৃঙ্খল অবস্থা) বেছে নিন।',
        },
        approx_time_saved_sec: 10,
      },
    ],
    common_traps: [
      {
        en: "**Look-alike idioms.** *A bolt from the blue* = a sudden, unexpected event; *once in a blue moon* = very rarely. Both mention *blue*, so they are often swapped in options.",
        bn: '**একই রকম দেখতে idiom।** *A bolt from the blue* = হঠাৎ অপ্রত্যাশিত ঘটনা; *once in a blue moon* = কদাচিৎ, খুব কম। দুটিতেই *blue* আছে, তাই বিকল্পে প্রায়ই অদলবদল করে দেওয়া হয়।',
      },
      {
        en: "**Confusing phrasal verbs with the same verb.** *call off* (cancel) vs *call on* (visit); *put off* (postpone) vs *put up with* (tolerate); *look up to* (respect) vs *look down upon* (despise).",
        bn: '**একই verb-এর phrasal verb গুলিয়ে ফেলা।** *call off* (বাতিল) বনাম *call on* (দেখা করা); *put off* (স্থগিত) বনাম *put up with* (সহ্য করা); *look up to* (শ্রদ্ধা) বনাম *look down upon* (অবজ্ঞা)।',
      },
      {
        en: "**Taking the literal sense.** *His argument does not **hold water*** means the argument is not logically sound; it has nothing to do with liquid.",
        bn: '**আক্ষরিক অর্থ ধরে নেওয়া।** *His argument does not **hold water*** মানে যুক্তিটি টেকসই নয়; জলের সঙ্গে এর কোনো সম্পর্ক নেই।',
      },
      {
        en: "**A fair-weather friend** is one who leaves you in difficult times, not a friend who is pleasant; the image is of someone who stays only while the weather is fine.",
        bn: '**A fair-weather friend** মানে এমন বন্ধু যে বিপদের সময় সঙ্গ ছেড়ে দেয়, মিষ্টি স্বভাবের বন্ধু নয়; ছবিটি হল শুধু সুদিনে পাশে থাকা মানুষের।',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── One Word Substitution
  {
    subject: 'english',
    topic: 'one_word_substitution',
    title: { en: 'One Word Substitution', bn: 'এক কথায় প্রকাশ (One Word Substitution)', hi: 'अनेक शब्दों के लिए एक शब्द' },
    overview: {
      en: "You are given a phrase or definition (*a person who loves mankind*) and must choose the single word that means the same (*philanthropist*). Break the definition into its key parts: **who/what** (person, place, study, killing, rule, fear) and the **specific detail** (of father, of birds, of heights). Most answers are built from a small set of Greek and Latin roots, so learning roots like *-cide, -cracy, -logy, -phobia, omni-* unlocks hundreds of words. Watch for close options that differ in just one detail, such as *misanthrope* and *misogynist*.",
      bn: 'একটি বাক্যাংশ বা সংজ্ঞা দেওয়া থাকে (*a person who loves mankind*) এবং তার সমার্থক একটি মাত্র শব্দ বাছতে হয় (*philanthropist*)। সংজ্ঞাটিকে মূল অংশে ভাঙুন: **কে/কী** (ব্যক্তি, স্থান, বিদ্যা, হত্যা, শাসন, ভয়) এবং **নির্দিষ্ট বিবরণ** (পিতার, পাখির, উচ্চতার)। বেশিরভাগ উত্তর অল্প কিছু গ্রিক ও লাতিন root দিয়ে তৈরি, তাই *-cide, -cracy, -logy, -phobia, omni-* জাতীয় root শিখলে শত শত শব্দ সহজ হয়ে যায়। খুব কাছাকাছি বিকল্পগুলি সাবধানে দেখুন যেগুলি মাত্র একটি বিবরণে আলাদা, যেমন *misanthrope* ও *misogynist*।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: '-cide = killing', bn: '-cide = হত্যা' },
        body: {
          en: "*homicide* (a human being), *suicide* (oneself), *patricide* (one's father), *matricide* (one's mother), *fratricide* (one's brother), *regicide* (a king), *infanticide* (an infant), *genocide* (a whole race or group), *pesticide* (pests).",
          bn: '*homicide* (মানুষ হত্যা), *suicide* (আত্মহত্যা), *patricide* (পিতৃহত্যা), *matricide* (মাতৃহত্যা), *fratricide* (ভ্রাতৃহত্যা), *regicide* (রাজহত্যা), *infanticide* (শিশুহত্যা), *genocide* (গণহত্যা, একটি জাতি বা গোষ্ঠীকে নির্মূল করা), *pesticide* (কীটনাশক)।',
        },
      },
      {
        title: { en: '-cracy = rule / government', bn: '-cracy = শাসন / সরকার' },
        body: {
          en: "*democracy* (by the people), *autocracy* (by one person with absolute power), *bureaucracy* (by officials), *plutocracy* (by the rich), *theocracy* (by religious leaders / in the name of God), *aristocracy* (by a privileged upper class), *gerontocracy* (by old people).",
          bn: '*democracy* (জনগণের শাসন), *autocracy* (এক ব্যক্তির নিরঙ্কুশ শাসন), *bureaucracy* (আমলাদের শাসন), *plutocracy* (ধনীদের শাসন), *theocracy* (ধর্মগুরুদের শাসন / ঈশ্বরের নামে শাসন), *aristocracy* (সুবিধাভোগী অভিজাত শ্রেণির শাসন), *gerontocracy* (বয়স্কদের শাসন)।',
        },
      },
      {
        title: { en: '-logy = study of; -phobia = fear of', bn: '-logy = বিদ্যা; -phobia = ভয়' },
        body: {
          en: "*ornithology* (birds), *entomology* (insects), *etymology* (origin of words), *anthropology* (mankind), *seismology* (earthquakes). *claustrophobia* (closed spaces), *acrophobia* (heights), *hydrophobia* (water), *xenophobia* (foreigners).",
          bn: '*ornithology* (পক্ষীবিদ্যা), *entomology* (কীটপতঙ্গবিদ্যা), *etymology* (শব্দের উৎপত্তি-বিদ্যা), *anthropology* (নৃতত্ত্ব, মানবজাতি বিষয়ক বিদ্যা), *seismology* (ভূকম্পবিদ্যা)। *claustrophobia* (বদ্ধ জায়গার ভয়), *acrophobia* (উচ্চতার ভয়), *hydrophobia* (জলাতঙ্ক / জলের ভয়), *xenophobia* (বিদেশিদের প্রতি ভয় বা বিদ্বেষ)।',
        },
      },
      {
        title: { en: 'omni- = all; in-/im-/il-/ir- + -ible/-able = cannot be', bn: 'omni- = সব; in-/im-/il-/ir- + -ible/-able = করা যায় না' },
        body: {
          en: "*omniscient* (knows everything), *omnipotent* (all-powerful), *omnipresent* (present everywhere), *omnivorous* (eats all kinds of food). *illegible* (cannot be read), *inaudible* (cannot be heard), *invincible* (cannot be conquered), *indelible* (cannot be erased), *inevitable* (cannot be avoided), *incorrigible* (cannot be reformed), *infallible* (cannot make mistakes), *inimitable* (cannot be imitated).",
          bn: '*omniscient* (সর্বজ্ঞ), *omnipotent* (সর্বশক্তিমান), *omnipresent* (সর্বব্যাপী), *omnivorous* (সর্বভুক)। *illegible* (পড়া যায় না এমন), *inaudible* (শোনা যায় না এমন), *invincible* (অজেয়), *indelible* (মোছা যায় না এমন), *inevitable* (অনিবার্য), *incorrigible* (সংশোধনের অযোগ্য), *infallible* (অভ্রান্ত, ভুল করে না এমন), *inimitable* (অনুকরণ করা যায় না এমন, অনন্য)।',
        },
      },
      {
        title: { en: 'Person words: -ist, -ian, -er, -ant', bn: 'ব্যক্তিবাচক শব্দ: -ist, -ian, -er, -ant' },
        body: {
          en: "*philanthropist* (loves and helps mankind), *misanthrope* (hates mankind), *misogynist* (hates women), *polyglot* (speaks many languages), *atheist* (does not believe in God), *agnostic* (believes God's existence cannot be known), *optimist / pessimist*, *insolvent* (unable to pay debts), *veterinarian* (treats animals), *emigrant* (leaves own country to settle abroad), *immigrant* (comes into a foreign country to settle).",
          bn: '*philanthropist* (মানবপ্রেমী, জনহিতৈষী), *misanthrope* (মানববিদ্বেষী), *misogynist* (নারীবিদ্বেষী), *polyglot* (বহুভাষী), *atheist* (নাস্তিক), *agnostic* (অজ্ঞেয়বাদী: মনে করে ঈশ্বরের অস্তিত্ব জানা সম্ভব নয়), *optimist / pessimist* (আশাবাদী / নৈরাশ্যবাদী), *insolvent* (দেউলিয়া, ঋণ শোধে অক্ষম), *veterinarian* (পশুচিকিৎসক), *emigrant* (নিজের দেশ ছেড়ে বিদেশে বসবাসকারী), *immigrant* (বিদেশে এসে বসবাসকারী)।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Map the key word of the definition to a root', bn: 'সংজ্ঞার মূল শব্দটিকে root-এর সঙ্গে মেলান' },
        body: {
          en: "*killing* → -cide, *rule* → -cracy, *study* → -logy, *fear* → -phobia, *all* → omni-, *cannot be* → in-…-ible. For *the killing of a king*, jump straight to the *-cide* options and pick **regicide** (*rex/regis* = king).",
          bn: '*killing* → -cide, *rule* → -cracy, *study* → -logy, *fear* → -phobia, *all* → omni-, *cannot be* → in-…-ible। *the killing of a king* দেখলে সরাসরি *-cide* বিকল্পগুলিতে যান এবং **regicide** বাছুন (*rex/regis* = রাজা)।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Eliminate by category before by detail', bn: 'বিবরণের আগে শ্রেণি দেখে বাদ দিন' },
        body: {
          en: "*A person who studies insects*: the answer must be a person (*-ist*), so *entomology* (the subject) goes; among persons, *ornithologist* is birds, *etymologist* is words, leaving **entomologist**.",
          bn: '*A person who studies insects*: উত্তর একজন ব্যক্তি (*-ist*), তাই *entomology* (বিষয়টি) বাদ; ব্যক্তিদের মধ্যে *ornithologist* পাখি, *etymologist* শব্দ নিয়ে কাজ করেন; বাকি থাকে **entomologist**।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Learn opposites in pairs', bn: 'বিপরীত শব্দগুলি জোড়ায় শিখুন' },
        body: {
          en: "*optimist / pessimist*, *emigrant / immigrant*, *prologue / epilogue* (introduction / concluding part), *philanthropist / misanthrope*, *legible / illegible*. Exams often give one partner as a distractor for the other, so a pair is learnt as fast as one word.",
          bn: '*optimist / pessimist*, *emigrant / immigrant*, *prologue / epilogue* (ভূমিকা / উপসংহার অংশ), *philanthropist / misanthrope*, *legible / illegible*। পরীক্ষায় প্রায়ই জোড়ার একটিকে অন্যটির বিভ্রান্তিকর বিকল্প হিসেবে দেওয়া হয়, তাই জোড়ায় শিখলে এক শব্দের সময়ে দুটি শেখা হয়।',
        },
        approx_time_saved_sec: 10,
      },
    ],
    common_traps: [
      {
        en: "**Atheist vs agnostic.** An *atheist* denies that God exists; an *agnostic* says the existence of God cannot be known.",
        bn: '**Atheist বনাম agnostic।** *atheist* ঈশ্বরের অস্তিত্ব অস্বীকার করে; *agnostic* বলে ঈশ্বরের অস্তিত্ব জানা সম্ভব নয়।',
      },
      {
        en: "**Illegible vs ineligible.** *illegible* = cannot be read (handwriting); *ineligible* = not qualified (for a post).",
        bn: '**Illegible বনাম ineligible।** *illegible* = পড়া যায় না (হাতের লেখা); *ineligible* = অযোগ্য (কোনো পদের জন্য)।',
      },
      {
        en: "**Emigrant vs immigrant.** You *emigrate* **from** your own country and *immigrate* **into** a new one. An Indian settling in Canada is an emigrant from India and an immigrant in Canada.",
        bn: '**Emigrant বনাম immigrant।** নিজের দেশ **থেকে** চলে যাওয়া *emigrate*, নতুন দেশে **এসে** বসবাস *immigrate*। কানাডায় বসবাসকারী একজন ভারতীয় ভারতের দৃষ্টিতে emigrant এবং কানাডার দৃষ্টিতে immigrant।',
      },
      {
        en: "**Amateur vs novice.** An *amateur* does something for pleasure, not money (may be very skilled); a *novice* is a beginner.",
        bn: '**Amateur বনাম novice।** *amateur* শখে কাজ করেন, অর্থের জন্য নয় (দক্ষও হতে পারেন); *novice* হলেন নবিশ বা শিক্ষানবিশ।',
      },
      {
        en: "**-ology look-alikes.** *ornithology* (birds), *entomology* (insects), *etymology* (origin of words) are regularly swapped; tie each to its root: *ornith* = bird, *entomo* = insect, *etymon* = true sense of a word.",
        bn: '**-ology-র কাছাকাছি শব্দ।** *ornithology* (পাখি), *entomology* (কীটপতঙ্গ), *etymology* (শব্দের উৎপত্তি) প্রায়ই অদলবদল করে দেওয়া হয়; প্রতিটিকে তার root দিয়ে মনে রাখুন: *ornith* = পাখি, *entomo* = কীট, *etymon* = শব্দের আসল অর্থ।',
      },
    ],
  },
];
