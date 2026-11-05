'use strict';

module.exports = {
  subject: 'english',
  topic: 'tenses',
  title: { en: 'Tenses', bn: 'Tenses (কালের ব্যবহার)' },
  emoji: '⏰',
  intro: {
    en: 'A **tense** is the form of the verb that tells us **when** something happens: now, before now, or after now. We use tenses in every email, interview answer and news headline. In exams, tenses are tested in fill in the blanks, error spotting, sentence improvement and cloze tests.',
    bn: '**Tense** হল verb-এর সেই রূপ, যা বলে কাজটি **কখন** ঘটে: এখন, আগে, নাকি পরে। ইমেল, ইন্টারভিউ, খবরের শিরোনাম, সবখানে tense লাগে। পরীক্ষায় fill in the blanks, error spotting, sentence improvement ও cloze test-এ tense আসে।',
  },
  levels: [
    {
      level: 'basic',
      sections: [
        {
          heading: { en: 'The big picture: 3 times x 4 forms = 12 tenses', bn: 'বড় ছবি: ৩ কাল x ৪ রূপ = ১২ tense' },
          body: {
            en: `Start with a real sentence: **"I have completed my work."**

It is about the **present** (I can leave now), and the work is **finished** (perfect). So it is *present perfect*.

Every tense has two parts: a **time** (present, past, future) and a **form** (simple, continuous, perfect, perfect continuous).

| Form | What it shows |
|---|---|
| Simple | a fact, habit or one finished action |
| Continuous | an action in progress |
| Perfect | an action finished before a moment |
| Perfect continuous | an action that has been going on for some time |

3 times x 4 forms = **12 tenses**. Learn the *structure* (formula) and the *meaning*. Both matter.`,
            bn: `একটি সত্যিকারের বাক্য দিয়ে শুরু করি: **"I have completed my work."**

এটি **বর্তমান** নিয়ে (এখন আমি যেতে পারি), আর কাজটি **শেষ** (perfect)। তাই এটি *present perfect*।

প্রতিটি tense-এর দুটি অংশ: **কাল** (present, past, future) আর **রূপ** (simple, continuous, perfect, perfect continuous)।

| রূপ | কী বোঝায় |
|---|---|
| Simple | সত্য, অভ্যাস বা একটি শেষ হওয়া কাজ |
| Continuous | চলতে থাকা কাজ |
| Perfect | কোনো মুহূর্তের আগেই শেষ হয়ে যাওয়া কাজ |
| Perfect continuous | কিছু সময় ধরে চলে আসা কাজ |

৩ কাল x ৪ রূপ = **১২ tense**। গঠন (formula) আর অর্থ, দুটোই শেখা দরকার।`,
          },
        },
        {
          heading: { en: 'Present tense: simple and continuous', bn: 'Present tense: simple ও continuous' },
          body: {
            en: `**Simple present**: Subject + V1 (add **-s/-es** for he, she, it)
✓ *She **goes** to office by bus every day.* (habit)
✓ *The sun **sets** in the west.* (fact)
✓ *My father **works** in a bank.*

**Present continuous**: Subject + is/am/are + V-ing
✓ *Look! It **is raining**.* (happening now)
✓ *I **am writing** an email to my manager.*
✓ *The students **are waiting** outside.*

Clue words: *every day, always, usually* -> simple. *now, at the moment, look!* -> continuous.`,
            bn: `**Simple present**: Subject + V1 (he, she, it-এর সঙ্গে **-s/-es**)
✓ *She **goes** to office by bus every day.* (অভ্যাস)
✓ *The sun **sets** in the west.* (সত্য)
✓ *My father **works** in a bank.*

**Present continuous**: Subject + is/am/are + V-ing
✓ *Look! It **is raining**.* (এখন ঘটছে)
✓ *I **am writing** an email to my manager.*
✓ *The students **are waiting** outside.*

সূত্র-শব্দ: *every day, always, usually* -> simple। *now, at the moment, look!* -> continuous।`,
          },
        },
        {
          heading: { en: 'Present perfect: "I have completed my work."', bn: 'Present perfect (সদ্য শেষ কাজ): "I have completed my work."' },
          body: {
            en: `**Present perfect**: Subject + **have/has** + V3 (past participle)

Why this shape? The action is finished, but the **result is here now**. *Have/has* belongs to the present; V3 shows "done".

✓ *I **have completed** my work.* (so I am free now)
✓ *She **has lost** her keys.* (so she cannot enter)
✓ *They **have reached** Delhi.*
✓ *Rahul **has** not **finished** his homework yet.*

**I / you / we / they -> have. He / she / it -> has.**
V3 of irregular verbs must be learnt: *go -> gone, see -> seen, write -> written, eat -> eaten.*`,
            bn: `**Present perfect**: Subject + **have/has** + V3 (past participle)

এই গঠন কেন? কাজটি শেষ, কিন্তু তার **ফল এখন আছে**। *Have/has* বর্তমানের, আর V3 মানে "শেষ"।

✓ *I **have completed** my work.* (তাই এখন আমি ফ্রি)
✓ *She **has lost** her keys.* (তাই ঢুকতে পারছে না)
✓ *They **have reached** Delhi.*
✓ *Rahul **has** not **finished** his homework yet.*

**I / you / we / they -> have। He / she / it -> has।**
অনিয়মিত verb-এর V3 মুখস্থ করতে হবে: *go -> gone, see -> seen, write -> written, eat -> eaten।*`,
          },
        },
        {
          heading: { en: 'Past and future in one table', bn: 'Past ও future এক টেবিলে' },
          body: {
            en: `| Tense | Formula | Real sentence |
|---|---|---|
| Simple past | Subject + V2 | *I **bought** a phone last week.* |
| Past continuous | Subject + was/were + V-ing | *He **was sleeping** when I arrived.* |
| Past perfect | Subject + had + V3 | *The train **had left** before we reached.* |
| Simple future | Subject + will/shall + V1 | *I **will call** you tomorrow.* |
| Future continuous | Subject + will be + V-ing | *We **will be travelling** at 10 tomorrow.* |
| Future perfect | Subject + will have + V3 | *She **will have completed** the course by June.* |

After **did / does / do** and after **will**, the verb stays in its base form: *He did not **attend**.*`,
            bn: `| Tense | Formula | বাস্তব বাক্য |
|---|---|---|
| Simple past | Subject + V2 | *I **bought** a phone last week.* |
| Past continuous | Subject + was/were + V-ing | *He **was sleeping** when I arrived.* |
| Past perfect | Subject + had + V3 | *The train **had left** before we reached.* |
| Simple future | Subject + will/shall + V1 | *I **will call** you tomorrow.* |
| Future continuous | Subject + will be + V-ing | *We **will be travelling** at 10 tomorrow.* |
| Future perfect | Subject + will have + V3 | *She **will have completed** the course by June.* |

**did / does / do**-এর পরে এবং **will**-এর পরে verb মূল রূপে থাকে: *He did not **attend**.*`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Fill in the blank: "I ___ completed my work, so I can go home." (have / has / had been / am)', bn: 'শূন্যস্থান পূরণ করো: "I ___ completed my work, so I can go home." (have / has / had been / am)' },
          steps: [
            { en: '*Completed* is V3, so we need a helping verb for the perfect form: have or has.', bn: '*Completed* হল V3, তাই perfect রূপের জন্য helping verb দরকার: have বা has।' },
            { en: 'The subject is "I". Trap: "has" is only for he/she/it.', bn: 'Subject "I"। ফাঁদ: "has" শুধু he/she/it-এর জন্য।' },
          ],
          answer: { en: '**have**: I have completed my work.', bn: 'সঠিক উত্তর: **have**: I have completed my work.' },
        },
        {
          question: { en: 'Choose the correct word: "She ___ to office by bus every day." (goes / go / is go)', bn: 'শুদ্ধ শব্দ বাছো: "She ___ to office by bus every day." (goes / go / is go)' },
          steps: [
            { en: '"Every day" shows a habit, so simple present.', bn: '"Every day" অভ্যাস বোঝায়, তাই simple present।' },
            { en: 'Trap: "she" is singular, so the verb takes -es: goes.', bn: 'ফাঁদ: "she" একবচন, তাই verb-এ -es: goes।' },
          ],
          answer: { en: '**goes**', bn: 'সঠিক উত্তর: **goes**' },
        },
        {
          question: { en: 'Fill in the blank: "They ___ cricket yesterday evening." (played / have played / play)', bn: 'শূন্যস্থান পূরণ করো: "They ___ cricket yesterday evening." (played / have played / play)' },
          steps: [
            { en: '"Yesterday evening" is a finished time in the past.', bn: '"Yesterday evening" অতীতের শেষ হওয়া সময়।' },
            { en: 'Trap: "have played" looks tempting, but present perfect never sits with "yesterday".', bn: 'ফাঁদ: "have played" লোভনীয়, কিন্তু present perfect-এর সঙ্গে "yesterday" বসে না।' },
          ],
          answer: { en: '**played**', bn: 'সঠিক উত্তর: **played**' },
        },
        {
          question: { en: 'Spot the error: "She (A) have gone (B) to the market (C) already."', bn: 'ভুল খোঁজো: "She (A) have gone (B) to the market (C) already."' },
          steps: [
            { en: '"She" needs "has", so A is wrong.', bn: '"She"-এর সঙ্গে "has" বসে, তাই A ভুল।' },
            { en: 'Trap: "already" is correct with present perfect, so C is fine. Only the helping verb must change: have -> has.', bn: 'ফাঁদ: present perfect-এর সঙ্গে "already" ঠিকই আছে, তাই C শুদ্ধ। শুধু helping verb বদলাবে: have -> has।' },
          ],
          answer: { en: '**A** ("have" should be "has")', bn: 'সঠিক উত্তর: **A** ("have"-এর জায়গায় "has")' },
        },
      ],
    },
    {
      level: 'intermediate',
      sections: [
        {
          heading: { en: 'Time markers: which tense do they ask for?', bn: 'Time marker: কোন tense চায়?' },
          body: {
            en: `Time words are the best clues. Learn them in groups.

**Finished time -> simple past** (never present perfect):
*yesterday, last week, in 2019, two days **ago**, then, when I was young*
✓ *I **met** him two days ago.* ✗ *I have met him two days ago.*

**Up to now -> present perfect:**
*already, yet, just, ever, never, so far, recently, lately*
✓ *Have you **ever** visited the Victoria Memorial?*
✓ *I have **already** eaten.* ✓ *He has **not** come **yet**.*

**Since / for -> present perfect (continuous):**
- **since** + starting point: *since 2015, since Monday, since morning*
- **for** + length of time: *for ten years, for two hours*
✓ *He **has lived** in Siliguri **since** 2015.*
✓ *I have known her **for** ten years.*`,
            bn: `সময়ের শব্দই সবচেয়ে বড় সূত্র। দল বেঁধে শেখো।

**শেষ হওয়া সময় -> simple past** (কখনও present perfect নয়):
*yesterday, last week, in 2019, two days **ago**, then, when I was young*
✓ *I **met** him two days ago.* ✗ *I have met him two days ago.*

**এখন পর্যন্ত -> present perfect:**
*already, yet, just, ever, never, so far, recently, lately*
✓ *Have you **ever** visited the Victoria Memorial?*
✓ *I have **already** eaten.* ✓ *He has **not** come **yet**.*

**Since / for -> present perfect (continuous):**
- **since** + শুরুর বিন্দু: *since 2015, since Monday, since morning*
- **for** + সময়ের দৈর্ঘ্য: *for ten years, for two hours*
✓ *He **has lived** in Siliguri **since** 2015.*
✓ *I have known her **for** ten years.*`,
          },
        },
        {
          heading: { en: 'Present perfect vs simple past', bn: 'Present perfect বনাম simple past' },
          body: {
            en: `Ask one question: **is the time finished and named?**

| Sentence | Why |
|---|---|
| *I **saw** that film **yesterday**.* | named, finished time -> simple past |
| *I **have seen** that film.* | no time named; I know it now -> present perfect |
| *She **has gone** to Puri.* | she is still there |
| *She **has been** to Puri.* | she went and came back |

Cricket headline: *"India **have won** the series."* (news now). When the commentator tells the story: *"Kohli **hit** a six in the last over."* (finished moment).

**Present perfect continuous**: have/has + been + V-ing — an action that started in the past and is still going on, or has just stopped with a visible result.
✓ *I **have been waiting** for an hour.* ✓ *It **has been raining** since last night.*`,
            bn: `একটাই প্রশ্ন করো: **সময়টা কি শেষ হয়ে গেছে এবং নাম করে বলা আছে?**

| বাক্য | কারণ |
|---|---|
| *I **saw** that film **yesterday**.* | নাম করা, শেষ সময় -> simple past |
| *I **have seen** that film.* | সময়ের নাম নেই; এখন আমি জানি -> present perfect |
| *She **has gone** to Puri.* | সে এখনও সেখানে |
| *She **has been** to Puri.* | সে গিয়ে ফিরে এসেছে |

ক্রিকেটের শিরোনাম: *"India **have won** the series."* (এখনকার খবর)। কমেন্ট্রেটর গল্প বললে: *"Kohli **hit** a six in the last over."* (শেষ হওয়া মুহূর্ত)।

**Present perfect continuous**: have/has + been + V-ing: অতীতে শুরু হয়ে এখনও চলছে, বা এইমাত্র থেমেছে আর ফল চোখে দেখা যাচ্ছে।
✓ *I **have been waiting** for an hour.* ✓ *It **has been raining** since last night.*`,
          },
        },
        {
          heading: { en: 'Stative verbs: no -ing', bn: 'Stative verb: -ing হয় না' },
          body: {
            en: `Some verbs show a **state** (a condition), not an action in progress. We normally do **not** use them in the continuous form.

**know, understand, believe, like, love, hate, want, need, own, belong, seem, see (understand), have (own)**

✓ *I **know** the answer.* ✗ *I am knowing the answer.*
✓ *She **owns** a bakery.* ✗ *She is owning a bakery.*
✓ *He **has** a car.* ✗ *He is having a car.*
✓ *I **understand** the lesson.*

But some verbs have a second, action meaning, and then -ing is fine:
✓ *I **am having** lunch.* (eating = action)
✓ *We **are having** a meeting.*`,
            bn: `কিছু verb **অবস্থা** (state) বোঝায়, চলতে থাকা কাজ নয়। এগুলো সাধারণত continuous রূপে বসে **না**।

**know, understand, believe, like, love, hate, want, need, own, belong, seem, see (বোঝা), have (মালিকানা)**

✓ *I **know** the answer.* ✗ *I am knowing the answer.*
✓ *She **owns** a bakery.* ✗ *She is owning a bakery.*
✓ *He **has** a car.* ✗ *He is having a car.*
✓ *I **understand** the lesson.*

তবে কিছু verb-এর দ্বিতীয় একটি কাজের অর্থ আছে, তখন -ing চলে:
✓ *I **am having** lunch.* (খাওয়া = কাজ)
✓ *We **are having** a meeting.*`,
          },
        },
        {
          heading: { en: 'Past perfect and "by the time"', bn: 'Past perfect ও "by the time"' },
          body: {
            en: `When two past actions happen, the **earlier** one takes **past perfect** (had + V3) and the **later** one takes **simple past**.

✓ *When I reached the station, the train **had left**.* (train first, I second)
✓ *She said she **had posted** the letter the day before.*
✓ *By the time the police arrived, the thief **had escaped**.*

Trap: do not say *"the train has left"* here. "Has left" belongs to the present; this story is in the past.

For a future deadline use **future perfect**: *She **will have completed** the course by June.*`,
            bn: `অতীতের দুটি কাজ থাকলে **আগের** কাজ **past perfect**-এ (had + V3), **পরের** কাজ **simple past**-এ।

✓ *When I reached the station, the train **had left**.* (আগে ট্রেন, পরে আমি)
✓ *She said she **had posted** the letter the day before.*
✓ *By the time the police arrived, the thief **had escaped**.*

ফাঁদ: এখানে *"the train has left"* বলো না। "Has left" বর্তমানের; এই গল্প অতীতের।

ভবিষ্যতের সময়সীমায় **future perfect**: *She **will have completed** the course by June.*`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Fill in the blank: "He ___ in Siliguri since 2015." (lives / lived / has lived)', bn: 'শূন্যস্থান পূরণ করো: "He ___ in Siliguri since 2015." (lives / lived / has lived)' },
          steps: [
            { en: '"Since 2015" is a starting point that continues till now.', bn: '"Since 2015" একটি শুরুর বিন্দু, যা এখন পর্যন্ত চলছে।' },
            { en: 'Trap: "lives" and "lived" are tempting, but "since" needs a perfect tense.', bn: 'ফাঁদ: "lives" ও "lived" লোভনীয়, কিন্তু "since"-এর সঙ্গে perfect tense লাগে।' },
          ],
          answer: { en: '**has lived**', bn: 'সঠিক উত্তর: **has lived**' },
        },
        {
          question: { en: 'Choose the correct sentence: (a) I have met him two days ago. (b) I met him two days ago.', bn: 'শুদ্ধ বাক্য বাছো: (a) I have met him two days ago. (b) I met him two days ago.' },
          steps: [
            { en: '"Ago" names a finished time.', bn: '"Ago" শেষ হওয়া সময় বোঝায়।' },
            { en: 'Trap: present perfect cannot be used with "ago", "yesterday" or "last week".', bn: 'ফাঁদ: "ago", "yesterday", "last week"-এর সঙ্গে present perfect বসে না।' },
          ],
          answer: { en: '**(b)** I met him two days ago.', bn: 'সঠিক উত্তর: **(b)** I met him two days ago.' },
        },
        {
          question: { en: 'Spot the error: "I (A) am knowing (B) the answer (C) to this question."', bn: 'ভুল খোঁজো: "I (A) am knowing (B) the answer (C) to this question."' },
          steps: [
            { en: '"Know" is a stative verb.', bn: '"Know" একটি stative verb (অবস্থা-বোধক ক্রিয়া)।' },
            { en: 'Stative verbs do not take -ing. Correct: I know the answer.', bn: 'Stative verb-এ -ing হয় না। শুদ্ধ: I know the answer।' },
          ],
          answer: { en: '**A** ("am knowing" should be "know")', bn: 'সঠিক উত্তর: **A** ("am knowing"-এর জায়গায় "know")' },
        },
        {
          question: { en: 'Fill in the blank: "The train ___ before we reached the station." (has left / had left / leaves)', bn: 'শূন্যস্থান পূরণ করো: "The train ___ before we reached the station." (has left / had left / leaves)' },
          steps: [
            { en: 'Two past actions: the train left first, we reached later.', bn: 'অতীতের দুই কাজ: ট্রেন আগে ছেড়েছে, আমরা পরে পৌঁছেছি।' },
            { en: 'The earlier action takes past perfect. Trap: "has left" is a present tense.', bn: 'আগের কাজ past perfect-এ। ফাঁদ: "has left" present tense।' },
          ],
          answer: { en: '**had left**', bn: 'সঠিক উত্তর: **had left**' },
        },
      ],
    },
    {
      level: 'advanced',
      sections: [
        {
          heading: { en: 'If / when / until / as soon as: present for future', bn: 'If / when / until / as soon as: ভবিষ্যতে present' },
          body: {
            en: `In a **time or condition clause** about the future, we use **simple present**, not *will*. *Will* stays in the main clause.

✓ *I will call you **as soon as I reach** home.*
✓ ***If it rains** tomorrow, we will cancel the match.*
✓ *The meeting will begin **when the chairman arrives**.*
✓ *I will wait **until the bus comes**.*

✗ *If he will come, I will tell him.*
✗ *When the chairman will arrive...*

Exam trap: this is one of the most repeated errors in SSC error-spotting.

Also: **timetables** use simple present for the future: *The train **leaves** at 6 p.m. tomorrow.*`,
            bn: `ভবিষ্যৎ নিয়ে **সময় বা শর্তের clause**-এ **simple present** বসে, *will* নয়। *Will* থাকে main clause-এ।

✓ *I will call you **as soon as I reach** home.*
✓ ***If it rains** tomorrow, we will cancel the match.*
✓ *The meeting will begin **when the chairman arrives**.*
✓ *I will wait **until the bus comes**.*

✗ *If he will come, I will tell him.*
✗ *When the chairman will arrive...*

পরীক্ষার ফাঁদ: SSC error-spotting-এ এই ভুল সবচেয়ে বেশি আসে।

আরও: **সময়সূচি**র ভবিষ্যতে simple present বসে: *The train **leaves** at 6 p.m. tomorrow.*`,
          },
        },
        {
          heading: { en: 'Sequence of tenses and universal truths', bn: 'Sequence of tenses ও চিরসত্য' },
          body: {
            en: `If the main verb is in the **past**, the other verb in the sentence usually moves back too.

✓ *He **said** that he **was** tired.*
✓ *She **said** she **had posted** the letter the day before.*
✓ *She said that she **had been** to the doctor the day before.*

**Exception: universal truths and proverbs stay in the present.**
✓ *The teacher **said** that the earth **moves** round the sun.*
✓ *He said that honesty **is** the best policy.*

Other patterns to remember:
- ***Since** + simple past, present perfect:* *Since he **joined** the bank, he **has received** two promotions.*
- ***It is high time** + past form:* *It is high time we **started**.*
- ***Wish / if I were** (unreal present):* *I wish I **were** taller. If I **were** you...*
- **Past unreal:** *If he **had studied**, he **would have passed**.* (not "if he would have studied")`,
            bn: `main verb **past** হলে বাক্যের অন্য verb-ও সাধারণত এক ধাপ পিছিয়ে যায়।

✓ *He **said** that he **was** tired.*
✓ *She **said** she **had posted** the letter the day before.*
✓ *She said that she **had been** to the doctor the day before.*

**ব্যতিক্রম: চিরসত্য ও প্রবাদ present-এ থাকে।**
✓ *The teacher **said** that the earth **moves** round the sun.*
✓ *He said that honesty **is** the best policy.*

আরও কিছু ছক মনে রাখো:
- ***Since** + simple past, present perfect:* *Since he **joined** the bank, he **has received** two promotions.*
- ***It is high time** + past রূপ:* *It is high time we **started**.*
- ***Wish / if I were** (বর্তমানের অবাস্তব):* *I wish I **were** taller. If I **were** you...*
- **অতীতের অবাস্তব:** *If he **had studied**, he **would have passed**.* ("if he would have studied" নয়)`,
          },
        },
        {
          heading: { en: 'Common SSC / WBPSC traps', bn: 'SSC / WBPSC-এর চেনা ফাঁদ' },
          body: {
            en: `1. **"Ago", "yesterday", "last night", "in 2010" + present perfect** is wrong. ✗ *The PM has addressed the nation last night.* ✓ *addressed*
2. **Stative verb + -ing** is wrong. ✗ *He is having three cars.* ✓ *has*
3. **Since vs for.** *Since* + point, *for* + period. ✗ *since ten years* ✓ *for ten years*
4. **No sooner ... than; Hardly ... when.** ✓ *No sooner had he reached than the phone rang.* ✓ *Hardly had he left when it rained.* Both use **had + V3** after the opening word.
5. **Has gone vs has been.** *She has gone to Puri* (still there). *She has been to Puri* (returned).
6. **Will in an if/when clause.** ✗ *when he will arrive* ✓ *when he arrives*
7. **Wrong V3.** ✗ *has went, has wrote, have ate* ✓ *has gone, has written, have eaten*
8. **Did + V2.** ✗ *Did you saw?* ✓ *Did you see?*`,
            bn: `১. **"Ago", "yesterday", "last night", "in 2010" + present perfect** ভুল। ✗ *The PM has addressed the nation last night.* ✓ *addressed*
২. **Stative verb + -ing** ভুল। ✗ *He is having three cars.* ✓ *has*
৩. **Since বনাম for।** *Since* + বিন্দু, *for* + সময়কাল। ✗ *since ten years* ✓ *for ten years*
৪. **No sooner ... than; Hardly ... when।** ✓ *No sooner had he reached than the phone rang.* ✓ *Hardly had he left when it rained.* দুটোতেই শুরুর শব্দের পরে **had + V3**।
৫. **Has gone বনাম has been।** *She has gone to Puri* (এখনও সেখানে)। *She has been to Puri* (ফিরে এসেছে)।
৬. **If/when clause-এ will।** ✗ *when he will arrive* ✓ *when he arrives*
৭. **ভুল V3।** ✗ *has went, has wrote, have ate* ✓ *has gone, has written, have eaten*
৮. **Did + V2।** ✗ *Did you saw?* ✓ *Did you see?*`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Spot the error: "The meeting (A) will begin (B) when the chairman (C) will arrive."', bn: 'ভুল খোঁজো: "The meeting (A) will begin (B) when the chairman (C) will arrive."' },
          steps: [
            { en: '"When the chairman will arrive" is a time clause about the future.', bn: '"When the chairman will arrive" ভবিষ্যৎ নিয়ে একটি সময়ের clause।' },
            { en: 'A time clause takes simple present: "arrives". "Will" stays in the main clause only.', bn: 'সময়ের clause-এ simple present: "arrives"। "Will" থাকে শুধু main clause-এ।' },
          ],
          answer: { en: '**C** ("will arrive" should be "arrives")', bn: 'সঠিক উত্তর: **C** ("will arrive"-এর জায়গায় "arrives")' },
        },
        {
          question: { en: 'Fill in the blank: "The teacher said that the earth ___ round the sun." (moves / had moved / was moving)', bn: 'শূন্যস্থান পূরণ করো: "The teacher said that the earth ___ round the sun." (moves / had moved / was moving)' },
          steps: [
            { en: 'The reporting verb "said" is past, so we may expect the verb to go back.', bn: 'Reporting verb "said" past, তাই verb পিছিয়ে যাবে বলে মনে হতে পারে।' },
            { en: 'Trap: this is a universal truth, so it stays in simple present: moves.', bn: 'ফাঁদ: এটি চিরসত্য, তাই simple present-এই থাকে: moves।' },
          ],
          answer: { en: '**moves**', bn: 'সঠিক উত্তর: **moves**' },
        },
        {
          question: { en: 'Spot the error: "No sooner (A) had he (B) reached the office (C) when the phone rang."', bn: 'ভুল খোঁজো: "No sooner (A) had he (B) reached the office (C) when the phone rang."' },
          steps: [
            { en: 'Check the pair: "No sooner" must be matched with "than".', bn: 'জোড়া দেখো: "No sooner"-এর সঙ্গে "than" মিলবে।' },
            { en: 'Trap: "Hardly ... when" is the pair that uses "when". Do not mix them.', bn: 'ফাঁদ: "Hardly ... when" জোড়ায় "when" বসে। দুটো গুলিয়ে ফেলো না।' },
          ],
          answer: { en: '**C** ("when" should be "than")', bn: 'সঠিক উত্তর: **C** ("when"-এর জায়গায় "than")' },
        },
        {
          question: { en: 'Choose the correct sentence: (a) She has gone to Puri, so she is not at home. (b) She has been to Puri, so she is not at home.', bn: 'শুদ্ধ বাক্য বাছো: (a) She has gone to Puri, so she is not at home. (b) She has been to Puri, so she is not at home.' },
          steps: [
            { en: '"Is not at home" means she is away right now.', bn: '"Is not at home" মানে এই মুহূর্তে সে বাইরে।' },
            { en: '"Has gone" means she went and is still there. Trap: "has been to" means she came back, so it clashes with the second part.', bn: '"Has gone" মানে গিয়েছে এবং এখনও সেখানে। ফাঁদ: "has been to" মানে ফিরে এসেছে, তাই দ্বিতীয় অংশের সঙ্গে মেলে না।' },
          ],
          answer: { en: '**(a)** She has gone to Puri, so she is not at home.', bn: 'সঠিক উত্তর: **(a)** She has gone to Puri, so she is not at home.' },
        },
      ],
    },
  ],
  rules: [
    {
      label: { en: 'Present perfect', bn: 'Present perfect (সদ্য শেষ কাজ)' },
      explain: { en: 'Subject + have/has + V3. Past action with a result now. Time words: already, yet, just, ever, never, since, for. Never with yesterday or ago.', bn: 'Subject + have/has + V3। অতীতের কাজ, ফল এখন আছে। সূত্র-শব্দ: already, yet, just, ever, never, since, for। "yesterday" বা "ago"-এর সঙ্গে কখনও নয়।' },
    },
    {
      label: { en: 'Simple past and past perfect', bn: 'Simple past ও past perfect' },
      explain: { en: 'Simple past: Subject + V2 (finished time). Past perfect: Subject + had + V3 for the earlier of two past actions.', bn: 'Simple past: Subject + V2 (শেষ হওয়া সময়)। Past perfect: Subject + had + V3, অতীতের দুই কাজের আগেরটির জন্য।' },
    },
    {
      label: { en: 'Continuous tenses', bn: 'Continuous tenses (চলমান কাল)' },
      explain: { en: 'is/am/are + V-ing (now); was/were + V-ing (in progress in the past); will be + V-ing (in progress in the future).', bn: 'is/am/are + V-ing (এখন); was/were + V-ing (অতীতে চলছিল); will be + V-ing (ভবিষ্যতে চলবে)।' },
    },
    {
      label: { en: 'Perfect continuous tenses', bn: 'Perfect continuous tenses (শেষ-না-হওয়া চলমান কাজ)' },
      explain: { en: 'have/has been + V-ing; had been + V-ing; will have been + V-ing. They show how long an action has been going on.', bn: 'have/has been + V-ing; had been + V-ing; will have been + V-ing। কাজটি কতক্ষণ ধরে চলছে তা বোঝায়।' },
    },
    {
      label: { en: 'Since and for', bn: 'Since ও for' },
      explain: { en: 'since + starting point (since 2015); for + length of time (for ten years). Both take a perfect tense, not simple present.', bn: 'since + শুরুর বিন্দু (since 2015); for + সময়ের দৈর্ঘ্য (for ten years)। দুটোর সঙ্গেই perfect tense বসে, simple present নয়।' },
    },
    {
      label: { en: 'Stative verbs', bn: 'Stative verb (অবস্থা-বোধক ক্রিয়া)' },
      explain: { en: 'know, understand, like, love, want, need, own, belong, seem, and have (possession) are not used with -ing.', bn: 'know, understand, like, love, want, need, own, belong, seem এবং have (মালিকানা)-এর সঙ্গে -ing বসে না।' },
    },
    {
      label: { en: 'Present for future in clauses', bn: 'Clause-এ ভবিষ্যতে present' },
      explain: { en: 'After if, when, until, as soon as, before, after (about the future) use simple present. Will goes only in the main clause.', bn: 'ভবিষ্যৎ নিয়ে if, when, until, as soon as, before, after-এর পরে simple present বসে। Will থাকে শুধু main clause-এ।' },
    },
    {
      label: { en: 'Sequence of tenses', bn: 'Sequence of tenses (কালের ক্রম)' },
      explain: { en: 'A past main verb pulls the other verb back (said ... was; said ... had posted). Universal truths and proverbs stay in present.', bn: 'main verb past হলে অন্য verb পিছিয়ে যায় (said ... was; said ... had posted)। চিরসত্য ও প্রবাদ present-এ থাকে।' },
    },
  ],
  tips: [
    {
      en: 'Find the time word first (yesterday, since, already, by the time). It usually decides the tense.',
      bn: 'আগে সময়ের শব্দটি খোঁজো (yesterday, since, already, by the time)। সাধারণত সেটাই tense ঠিক করে দেয়।',
    },
    {
      en: 'Common mistake: "I have seen him yesterday." Use "I saw him yesterday".',
      bn: 'সাধারণ ভুল: "I have seen him yesterday." শুদ্ধ: "I saw him yesterday"।',
    },
    {
      en: 'Common mistake: "I am knowing the answer." Use "I know the answer".',
      bn: 'সাধারণ ভুল: "I am knowing the answer." শুদ্ধ: "I know the answer"।',
    },
    {
      en: 'Common mistake: "if he will come". Use "if he comes".',
      bn: 'সাধারণ ভুল: "if he will come"। শুদ্ধ: "if he comes"।',
    },
    {
      en: 'Learn the V3 of common irregular verbs: go-gone, see-seen, write-written, eat-eaten, take-taken, begin-begun.',
      bn: 'সাধারণ অনিয়মিত verb-এর V3 মুখস্থ করো: go-gone, see-seen, write-written, eat-eaten, take-taken, begin-begun।',
    },
    {
      en: 'In "Hardly ... when" and "No sooner ... than", the first verb is "had + V3" and the first word is followed by the helper (Hardly had he ...).',
      bn: '"Hardly ... when" ও "No sooner ... than"-এ প্রথম verb "had + V3", আর শুরুর শব্দের পরে helper আগে বসে (Hardly had he ...)।',
    },
    {
      en: 'After did, does, do and will, the main verb is in its base form: did not go, does not know, will go.',
      bn: 'did, does, do ও will-এর পরে main verb মূল রূপে: did not go, does not know, will go।',
    },
  ],
};
