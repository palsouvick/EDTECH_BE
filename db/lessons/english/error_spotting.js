'use strict';

module.exports = {
  subject: 'english',
  topic: 'error_spotting',
  title: { en: 'Error Spotting', bn: 'ভুল শনাক্তকরণ' },
  emoji: '🔍',
  intro: {
    en: 'In error spotting, a sentence is split into parts and one part has a grammar mistake. Your job is to find that part. It trains your eye to catch the mistakes we all make in speaking and writing, and it appears in almost every competitive exam.',
    bn: 'Error spotting-এ একটি বাক্যকে কয়েকটি অংশে ভাগ করা থাকে, আর একটি অংশে ব্যাকরণের ভুল থাকে। তোমাকে সেই অংশটি খুঁজে বের করতে হবে। এতে কথা বলা ও লেখার সাধারণ ভুল ধরার চোখ তৈরি হয়, আর প্রায় সব প্রতিযোগিতামূলক পরীক্ষায় এটি আসে।',
  },
  levels: [
    {
      level: 'basic',
      sections: [
        {
          heading: { en: 'How the question looks', bn: 'প্রশ্নটি দেখতে কেমন' },
          body: {
            en: `You get a sentence and four parts, for example:

*"Neither of the players / are / prepared / for the test."*

Exactly one part is wrong. Here **are** is wrong: it should be **is**, because *neither* is singular.

**How to check:**
1. Read the whole sentence once, slowly.
2. Find the **subject** (who or what the sentence is about) and the **verb** (the action word). Do they match?
3. Check the small words: prepositions (*in, at, to, than*), articles (*a, an, the*).
4. Check the tense: does the time word (*yesterday, since, ago*) match the verb?`,
            bn: `তোমাকে একটি বাক্য আর চারটি অংশ দেওয়া হয়, যেমন:

*"Neither of the players / are / prepared / for the test."*

ঠিক একটি অংশ ভুল। এখানে **are** ভুল: হবে **is**, কারণ *neither* singular।

**কীভাবে যাচাই করবে:**
1. পুরো বাক্যটি একবার ধীরে পড়ো।
2. **Subject** (কর্তা, যার সম্পর্কে বলা হচ্ছে) আর **verb** (ক্রিয়া, কাজের শব্দ) খোঁজো। দুটো কি মিলছে?
3. ছোট শব্দগুলো দেখো: preposition (*in, at, to, than*), article (*a, an, the*)।
4. Tense (কাল) দেখো: সময়ের শব্দ (*yesterday, since, ago*) কি verb-এর সঙ্গে মিলছে?`,
          },
        },
        {
          heading: { en: 'Easy mistakes to catch first', bn: 'প্রথমে যে সহজ ভুলগুলো ধরবে' },
          body: {
            en: `- **Double comparison**: ✗ *more taller* ✓ *taller*. Use either *-er* or *more*, never both.
- **One of the + plural noun**: ✗ *one of the best student* ✓ *one of the best **students***.
- **Uncountable nouns** (things we cannot count one by one) have no plural and no *a/an*: *advice, information, furniture, luggage, news*.
  ✗ *many advices* ✓ *much advice* / *a lot of advice*
  ✗ *an advice* ✓ *a piece of advice*
- **"is agree"**: *agree* is already a verb. ✗ *She is agree* ✓ *She **agrees***.`,
            bn: `- **দুবার comparison**: ✗ *more taller* ✓ *taller*। হয় *-er*, নয় *more*: দুটো একসঙ্গে কখনও নয়।
- **One of the + plural noun**: ✗ *one of the best student* ✓ *one of the best **students***।
- **Uncountable noun** (যা এক-দুই করে গোনা যায় না)-এর plural হয় না, আগে *a/an*-ও বসে না: *advice, information, furniture, luggage, news*।
  ✗ *many advices* ✓ *much advice* / *a lot of advice*
  ✗ *an advice* ✓ *a piece of advice*
- **"is agree"**: *agree* নিজেই verb। ✗ *She is agree* ✓ *She **agrees***।`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Find the error: "Amit is / more taller / than Moumita / in the family."', bn: 'ভুলটি খোঁজো: "Amit is / more taller / than Moumita / in the family."' },
          steps: [
            { en: '*Taller* already means "more tall" (the *-er* does the work of *more*).', bn: '*Taller* মানেই "more tall" (*-er* নিজেই *more*-এর কাজ করে)।' },
            { en: 'Using *more* + *taller* is a double comparison, which is wrong.', bn: '*more* + *taller* হল দুবার comparison, যা ভুল।' },
          ],
          answer: { en: 'Error in **"more taller"**. Correct: *Amit is taller than Moumita in the family.*', bn: 'ভুল **"more taller"** অংশে। সঠিক: *Amit is taller than Moumita in the family.*' },
        },
        {
          question: { en: 'Find the error: "Biswajit is / one of the best / student / in the class."', bn: 'ভুলটি খোঁজো: "Biswajit is / one of the best / student / in the class."' },
          steps: [
            { en: '*One of the* means "one from a group", so the group must be plural.', bn: '*One of the* মানে "একটি দলের মধ্যে একজন", তাই দলটি plural হবে।' },
            { en: 'So *student* must become *students*.', bn: 'তাই *student* হবে *students*।' },
          ],
          answer: { en: 'Error in **"student"**. Correct: *Biswajit is one of the best students in the class.*', bn: 'ভুল **"student"** অংশে। সঠিক: *Biswajit is one of the best students in the class.*' },
        },
      ],
    },
    {
      level: 'intermediate',
      sections: [
        {
          heading: { en: 'Subject-verb agreement errors', bn: 'Subject-verb agreement-এর ভুল' },
          body: {
            en: `This is the most common error type.

- *Each, every, either, neither, everyone, nobody* → singular verb.
  ✗ *Neither of the players **are** ready.* ✓ *Neither of the players **is** ready.*
- *The police, people, cattle* → plural verb.
- *News, mathematics, economics* → singular verb.
- Cover the words after *of / with / as well as* to find the real subject:
  ✗ *The box of mangoes **are** heavy.* ✓ *The box of mangoes **is** heavy.*`,
            bn: `এটিই সবচেয়ে বেশি আসা ভুল।

- *Each, every, either, neither, everyone, nobody* → singular verb।
  ✗ *Neither of the players **are** ready.* ✓ *Neither of the players **is** ready.*
- *The police, people, cattle* → plural verb।
- *News, mathematics, economics* → singular verb।
- আসল subject খুঁজতে *of / with / as well as*-এর পরের শব্দগুলো ঢেকে দাও:
  ✗ *The box of mangoes **are** heavy.* ✓ *The box of mangoes **is** heavy.*`,
          },
        },
        {
          heading: { en: 'Preposition and verb-pattern errors', bn: 'Preposition আর verb-এর গঠনের ভুল' },
          body: {
            en: `- Latin comparatives take **to**, not *than*: *superior to, inferior to, senior to, junior to, prior to, prefer A to B*.
  ✗ *Swati is inferior **than** Subhash.* ✓ *Swati is inferior **to** Subhash.*
  ✗ *Rima prefers rice **than** bread.* ✓ *Rima prefers rice **to** bread.*
- **say** vs **tell**: we *tell* someone, but *say* something (*say to* someone).
  ✗ *Mita **said me** that ...* ✓ *Mita **told me** that ...* / *Mita **said to me** that ...*
- No preposition after: *discuss, reach, enter, answer, resemble*.
  ✗ *We discussed **about** the plan.* ✓ *We discussed the plan.*`,
            bn: `- Latin থেকে আসা comparative-এর পরে **to** বসে, *than* নয়: *superior to, inferior to, senior to, junior to, prior to, prefer A to B*।
  ✗ *Swati is inferior **than** Subhash.* ✓ *Swati is inferior **to** Subhash.*
  ✗ *Rima prefers rice **than** bread.* ✓ *Rima prefers rice **to** bread.*
- **say** আর **tell**: কাউকে *tell* করি, কিন্তু কিছু *say* করি (কাউকে হলে *say to*)।
  ✗ *Mita **said me** that ...* ✓ *Mita **told me** that ...* / *Mita **said to me** that ...*
- এই verb-গুলোর পরে preposition বসে না: *discuss, reach, enter, answer, resemble*।
  ✗ *We discussed **about** the plan.* ✓ *We discussed the plan.*`,
          },
        },
        {
          heading: { en: 'Tense errors', bn: 'Tense-এর ভুল' },
          body: {
            en: `A **tense** shows the time of an action (past, present, future).

- Some verbs show a state, not an action, and are **not** used in the *-ing* form: *know, believe, understand, like, love, own, want, see, hear*.
  ✗ *Sneha **is knowing** the answer.* ✓ *Sneha **knows** the answer.*
  ✗ *I **have been knowing** him since 2000.* ✓ *I **have known** him since 2000.*
- *ago / yesterday / last year* → simple past, not present perfect.
  ✗ *We **have finished** it two days ago.* ✓ *We **finished** it two days ago.*`,
            bn: `**Tense** (কাল) দেখায় কাজটি কখন হচ্ছে (অতীত, বর্তমান, ভবিষ্যৎ)।

- কিছু verb কাজ নয়, অবস্থা বোঝায়; এদের *-ing* রূপ সাধারণত **হয় না**: *know, believe, understand, like, love, own, want, see, hear*।
  ✗ *Sneha **is knowing** the answer.* ✓ *Sneha **knows** the answer.*
  ✗ *I **have been knowing** him since 2000.* ✓ *I **have known** him since 2000.*
- *ago / yesterday / last year* থাকলে simple past হবে, present perfect নয়।
  ✗ *We **have finished** it two days ago.* ✓ *We **finished** it two days ago.*`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Find the error: "Rima / prefers rice / than bread / on weekends."', bn: 'ভুলটি খোঁজো: "Rima / prefers rice / than bread / on weekends."' },
          steps: [
            { en: 'The verb *prefer* uses the pattern **prefer A to B**.', bn: '*prefer* verb-এর গঠন হল **prefer A to B**।' },
            { en: 'So *than bread* is wrong; it should be *to bread*.', bn: 'তাই *than bread* ভুল; হবে *to bread*।' },
          ],
          answer: { en: 'Error in **"than bread"**. Correct: *Rima prefers rice to bread on weekends.*', bn: 'ভুল **"than bread"** অংশে। সঠিক: *Rima prefers rice to bread on weekends.*' },
        },
        {
          question: { en: 'Find the error: "I have been knowing / Anirban very well / since / 2000."', bn: 'ভুলটি খোঁজো: "I have been knowing / Anirban very well / since / 2000."' },
          steps: [
            { en: '*Know* is a state verb, so it is not used in the *-ing* form.', bn: '*Know* হল অবস্থা বোঝানো verb, তাই এর *-ing* রূপ হয় না।' },
            { en: '*Since 2000* shows something that started in the past and still continues, so we use the present perfect: *have known*.', bn: '*Since 2000* বোঝায় অতীতে শুরু হয়ে এখনও চলছে, তাই present perfect: *have known*।' },
          ],
          answer: { en: 'Error in **"I have been knowing"**. Correct: *I have known Anirban very well since 2000.*', bn: 'ভুল **"I have been knowing"** অংশে। সঠিক: *I have known Anirban very well since 2000.*' },
        },
        {
          question: { en: 'Find the error: "Mita / said me / that the train / was cancelled."', bn: 'ভুলটি খোঁজো: "Mita / said me / that the train / was cancelled."' },
          steps: [
            { en: '*Say* cannot take a person directly after it. We *tell* a person.', bn: '*Say*-এর ঠিক পরে কোনো মানুষ বসতে পারে না। মানুষকে আমরা *tell* করি।' },
            { en: 'So *said me* should be *told me* (or *said to me*).', bn: 'তাই *said me* হবে *told me* (বা *said to me*)।' },
          ],
          answer: { en: 'Error in **"said me"**. Correct: *Mita told me that the train was cancelled.*', bn: 'ভুল **"said me"** অংশে। সঠিক: *Mita told me that the train was cancelled.*' },
        },
      ],
    },
    {
      level: 'advanced',
      sections: [
        {
          heading: { en: 'Conjunction pairs and conditionals', bn: 'Conjunction-এর জোড়া আর conditional' },
          body: {
            en: `- **Hardly / Scarcely ... when**, **No sooner ... than**:
  ✗ *Hardly had we reached **than** the bell rang.* ✓ *... **when** the bell rang.*
- **Though / Although** never takes *but*:
  ✗ *Though Arjun was tired **but** he remained cheerful.* ✓ *Though Arjun was tired, he remained cheerful.*
- A **conditional** is an "if" sentence. For an imaginary or impossible wish, use **were** for all subjects:
  ✗ *If I **was** you, I would accept.* ✓ *If I **were** you, I would accept.*
  ✗ *I wish I **was** a pilot.* ✓ *I wish I **were** a pilot.*
- In an *if*-clause about the future, do not use *will*:
  ✗ *If it **will rain**, we will stay home.* ✓ *If it **rains**, we will stay home.*`,
            bn: `- **Hardly / Scarcely ... when**, **No sooner ... than**:
  ✗ *Hardly had we reached **than** the bell rang.* ✓ *... **when** the bell rang.*
- **Though / Although**-এর সঙ্গে কখনও *but* বসে না:
  ✗ *Though Arjun was tired **but** he remained cheerful.* ✓ *Though Arjun was tired, he remained cheerful.*
- **Conditional** মানে "if" দিয়ে বাক্য। কাল্পনিক বা অসম্ভব ইচ্ছার ক্ষেত্রে সব subject-এর সঙ্গে **were** বসে:
  ✗ *If I **was** you, I would accept.* ✓ *If I **were** you, I would accept.*
  ✗ *I wish I **was** a pilot.* ✓ *I wish I **were** a pilot.*
- ভবিষ্যতের কথা বললেও *if*-অংশে *will* বসে না:
  ✗ *If it **will rain**, we will stay home.* ✓ *If it **rains**, we will stay home.*`,
          },
        },
        {
          heading: { en: 'A smart order for checking', bn: 'যাচাই করার একটি বুদ্ধিমান ক্রম' },
          body: {
            en: `When nothing jumps out, check in this order:

1. **Subject-verb** (singular/plural)
2. **Tense** (time words: *since, ago, yesterday, by the time*)
3. **Prepositions** (*superior to, prefer to, discuss* without *about*)
4. **Nouns** (uncountable nouns, *one of the + plural*)
5. **Comparison** (*more taller*, *most cleverest*)
6. **Conjunction pairs** (*hardly ... when*, *though* without *but*)

If you still find nothing, the answer may be **"No error"** (when that option is given).`,
            bn: `কিছুই চোখে না পড়লে এই ক্রমে দেখো:

1. **Subject-verb** (singular/plural)
2. **Tense** (সময়ের শব্দ: *since, ago, yesterday, by the time*)
3. **Preposition** (*superior to, prefer to*, *about* ছাড়া *discuss*)
4. **Noun** (uncountable noun, *one of the + plural*)
5. **Comparison** (*more taller*, *most cleverest*)
6. **Conjunction-এর জোড়া** (*hardly ... when*, *but* ছাড়া *though*)

তাও কিছু না পেলে, উত্তর হতে পারে **"No error"** (যদি সেই option দেওয়া থাকে)।`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Find the error: "Hardly had they / reached the school / than / the bell rang."', bn: 'ভুলটি খোঁজো: "Hardly had they / reached the school / than / the bell rang."' },
          steps: [
            { en: '*Hardly* is a paired conjunction. Its partner is *when*.', bn: '*Hardly* একটি জোড়া conjunction। এর সঙ্গী হল *when*।' },
            { en: '*Than* is the partner of *no sooner* only, so it is wrong here.', bn: '*Than* শুধু *no sooner*-এর সঙ্গী, তাই এখানে ভুল।' },
          ],
          answer: { en: 'Error in **"than"**. Correct: *Hardly had they reached the school when the bell rang.*', bn: 'ভুল **"than"** অংশে। সঠিক: *Hardly had they reached the school when the bell rang.*' },
        },
        {
          question: { en: 'Find the error: "I wish / I was / a pilot / at this school."', bn: 'ভুলটি খোঁজো: "I wish / I was / a pilot / at this school."' },
          steps: [
            { en: '*I wish* shows an imaginary wish, not a fact.', bn: '*I wish* একটি কাল্পনিক ইচ্ছা বোঝায়, বাস্তব নয়।' },
            { en: 'For imaginary situations, formal English uses *were* with every subject, including *I*.', bn: 'কাল্পনিক অবস্থায় formal English-এ সব subject-এর সঙ্গে, এমনকি *I*-এর সঙ্গেও, *were* বসে।' },
          ],
          answer: { en: 'Error in **"I was"**. Correct: *I wish I were a pilot at this school.*', bn: 'ভুল **"I was"** অংশে। সঠিক: *I wish I were a pilot at this school.*' },
        },
        {
          question: { en: 'Find the error: "Rahul gave me / many advices / about / the examination."', bn: 'ভুলটি খোঁজো: "Rahul gave me / many advices / about / the examination."' },
          steps: [
            { en: '*Advice* is an uncountable noun, so it has no plural form *advices*.', bn: '*Advice* হল uncountable noun, তাই এর plural *advices* হয় না।' },
            { en: '*Many* is used only with countable plurals. With uncountable nouns we use *much* or *a lot of*.', bn: '*Many* শুধু গোনা যায় এমন plural-এর সঙ্গে বসে। Uncountable noun-এর সঙ্গে *much* বা *a lot of*।' },
          ],
          answer: { en: 'Error in **"many advices"**. Correct: *Rahul gave me a lot of advice about the examination.*', bn: 'ভুল **"many advices"** অংশে। সঠিক: *Rahul gave me a lot of advice about the examination.*' },
        },
      ],
    },
  ],
  rules: [
    {
      label: { en: 'Never use double comparatives or superlatives', bn: 'দুবার comparative বা superlative নয়' },
      explain: { en: '✗ *more taller*, ✗ *most cleverest*. ✓ *taller*, ✓ *the cleverest*.', bn: 'ভুল: ✗ *more taller*, ✗ *most cleverest*। সঠিক: ✓ *taller*, ✓ *the cleverest*।' },
    },
    {
      label: { en: 'One of the + plural noun + singular verb', bn: 'One of the + plural noun + singular verb (দলের মধ্যে একজন)' },
      explain: { en: '*One of the best **students** **is** absent today.*', bn: 'Noun plural হবে, কিন্তু verb মিলবে *one*-এর সঙ্গে: *One of the best **students** **is** absent today.*' },
    },
    {
      label: { en: 'Uncountable nouns have no plural', bn: 'Uncountable noun-এর plural হয় না' },
      explain: { en: '*advice, information, furniture, luggage, equipment, news, scenery*: no *-s* and no *a/an*. Use *a piece of advice*.', bn: '*advice, information, furniture, luggage, equipment, news, scenery*: *-s* বা *a/an* বসে না। বলো *a piece of advice*।' },
    },
    {
      label: { en: 'superior / inferior / senior / junior / prefer → to', bn: 'superior / inferior / senior / junior / prefer-এর পরে → to' },
      explain: { en: '*Sunita is junior **to** Sneha by two years. Sandip prefers cricket **to** football.*', bn: 'এদের পরে *than* নয়, *to* বসে: *Sunita is junior **to** Sneha by two years. Sandip prefers cricket **to** football.*' },
    },
    {
      label: { en: 'State verbs are not used in -ing form', bn: 'অবস্থা বোঝানো verb-এর -ing রূপ নয়' },
      explain: { en: '*know, believe, understand, own, want, like*: ✓ *I know him.* ✗ *I am knowing him.*', bn: '*know, believe, understand, own, want, like*-এর -ing রূপ হয় না: ✓ *I know him.* ✗ *I am knowing him.*' },
    },
    {
      label: { en: 'Tell someone; say something', bn: 'কাউকে tell; কিছু say' },
      explain: { en: '✓ *She told me the news.* ✓ *She said that she was busy.* ✗ *She said me.*', bn: '*say*-এর ঠিক পরে মানুষ বসে না: ✓ *She told me the news.* ✓ *She said that she was busy.* ✗ *She said me.*' },
    },
    {
      label: { en: 'Imaginary wish or condition → were', bn: 'কাল্পনিক ইচ্ছা বা শর্ত → were' },
      explain: { en: '*If I **were** rich, I would travel. I wish he **were** here.*', bn: 'সব subject-এর সঙ্গে *were* বসে: *If I **were** rich, I would travel. I wish he **were** here.*' },
    },
  ],
  tips: [
    { en: 'Always find the subject and verb first; most errors hide there.', bn: 'সবসময় আগে subject আর verb খোঁজো; বেশিরভাগ ভুল সেখানেই লুকিয়ে থাকে।' },
    { en: 'Common Bengali-speaker mistake: "She is agree". *Agree* is a verb: *She agrees*.', bn: 'বাঙালিদের সাধারণ ভুল: "She is agree"। *Agree* নিজেই verb: *She agrees*।' },
    { en: 'Words ending in *-ior* (*superior, junior, senior, prior*) take *to*, never *than*.', bn: '*-ior* দিয়ে শেষ হওয়া শব্দ (*superior, junior, senior, prior*)-এর পরে *to*, কখনও *than* নয়।' },
    { en: 'A time word like *ago* or *yesterday* means simple past: *I met him yesterday*, not *I have met him yesterday*.', bn: '*ago* বা *yesterday* থাকলে simple past: *I met him yesterday*, *I have met him yesterday* নয়।' },
    { en: 'Read the whole sentence before choosing; an error in part 3 may depend on a word in part 1.', bn: 'উত্তর বাছার আগে পুরো বাক্য পড়ো; তৃতীয় অংশের ভুল প্রথম অংশের শব্দের উপর নির্ভর করতে পারে।' },
  ],
};
