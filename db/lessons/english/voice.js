'use strict';

module.exports = {
  subject: 'english',
  topic: 'voice',
  title: { en: 'Active & Passive Voice', bn: 'Active ও Passive Voice (বাচ্য)' },
  emoji: '🔄',
  intro: {
    en: '**Voice** tells us whether the subject **does** the action (active) or **receives** it (passive). We meet it in office notices ("Applications are invited"), news headlines ("Three arrested") and every email that says "your request has been approved". In exams, voice is tested in transformation questions, fill in the blanks, error spotting and sentence improvement.',
    bn: '**Voice** বলে দেয় subject কাজটা **করে** (active) নাকি কাজটা **পায়** (passive)। অফিসের নোটিস ("Applications are invited"), খবরের শিরোনাম ("Three arrested") আর "your request has been approved" লেখা ইমেলে আমরা এটা দেখি। পরীক্ষায় transformation, fill in the blanks, error spotting ও sentence improvement-এ voice আসে।',
  },
  levels: [
    {
      level: 'basic',
      sections: [
        {
          heading: { en: 'Two sentences, one fact: who is in front?', bn: 'দুটি বাক্য, একই তথ্য: সামনে কে?' },
          body: {
            en: `Read these two sentences:

1. **The manager approved the leave.**
2. **The leave was approved by the manager.**

Both say the same thing. The difference is **who stands in front**.

- In sentence 1 the **doer** (the manager) is the subject. This is **active voice**.
- In sentence 2 the **receiver** of the action (the leave) is the subject. This is **passive voice**.

More real examples:
✓ *Rahul **wrote** the email.* (active) -> *The email **was written** by Rahul.* (passive)
✓ *The police **caught** the thief.* -> *The thief **was caught** by the police.*
✓ *Mamata Banerjee **inaugurated** the fair.* -> *The fair **was inaugurated** by Mamata Banerjee.*

Use active when the doer matters. Use passive when the action or the receiver matters more, or when the doer is unknown: *My wallet **was stolen** in the bus.*`,
            bn: `দুটি বাক্য পড়ো:

1. **The manager approved the leave.**
2. **The leave was approved by the manager.**

দুটিতে একই কথা। তফাত হল **সামনে কে দাঁড়িয়ে আছে**।

- ১ নম্বরে **কর্তা** (the manager) subject। এটি **active voice**।
- ২ নম্বরে কাজটা **যে পায়** (the leave) সে subject। এটি **passive voice**।

আরও বাস্তব উদাহরণ:
✓ *Rahul **wrote** the email.* (active) -> *The email **was written** by Rahul.* (passive)
✓ *The police **caught** the thief.* -> *The thief **was caught** by the police.*
✓ *Mamata Banerjee **inaugurated** the fair.* -> *The fair **was inaugurated** by Mamata Banerjee.*

কর্তা গুরুত্বপূর্ণ হলে active। কাজ বা কাজ-পাওয়া জিনিসটা বেশি গুরুত্বপূর্ণ হলে, বা কর্তা অজানা হলে passive: *My wallet **was stolen** in the bus.* (আমার মানিব্যাগ বাসে চুরি হয়েছে।)`,
          },
        },
        {
          heading: { en: 'The formula: Object becomes Subject + be + V3', bn: 'সূত্র: Object হয় Subject + be + V3' },
          body: {
            en: `Take **"The manager approved the leave."** Split it:

**The manager** (subject) + **approved** (verb) + **the leave** (object)

To make it passive, do three things:
1. Move the **object** to the front: *The leave*
2. Change the verb to **be (in the same tense) + V3**: *approved* is past, so *was approved*
3. Put the old subject after **by**: *by the manager*

**The leave + was approved + by the manager.**

Why "be + V3"? V3 (past participle) means "done", and **be** tells the tense. The leave *is/was* in the state of being "approved".

| Active | Passive |
|---|---|
| Subject + verb + Object | Object + be + V3 + by + Subject |

Only a sentence with an **object** (a transitive verb) can become passive. "He sleeps" has no object, so there is no passive.`,
            bn: `**"The manager approved the leave."** নাও। ভেঙে দেখি:

**The manager** (subject) + **approved** (verb) + **the leave** (object)

Passive করতে তিনটি কাজ:
১. **Object**-কে সামনে আনো: *The leave*
২. Verb বদলে **be (একই tense-এ) + V3** করো: *approved* past, তাই *was approved*
৩. পুরনো subject বসাও **by**-এর পরে: *by the manager*

**The leave + was approved + by the manager.**

"be + V3" কেন? V3 (past participle) মানে "করা হয়েছে", আর **be** tense ঠিক করে দেয়। The leave "approved" অবস্থায় *আছে/ছিল*।

| Active | Passive |
|---|---|
| Subject + verb + Object | Object + be + V3 + by + Subject |

শুধু **object** আছে এমন বাক্যের (transitive verb) passive হয়। "He sleeps"-এ object নেই, তাই passive নেই।`,
          },
        },
        {
          heading: { en: 'Simple tenses in the passive', bn: 'Simple tense-এর passive' },
          body: {
            en: `Keep the **tense** of the active verb. Only the form of **be** changes.

| Tense | Active | Passive |
|---|---|---|
| Simple present | Rina **writes** a letter. | A letter **is written** by Rina. |
| Simple past | They **built** this bridge. | This bridge **was built** by them. |
| Simple future | The police **will arrest** the thief. | The thief **will be arrested** by the police. |

Watch **number**: *The windows **are** cleaned.* (plural) but *The window **is** cleaned.* (singular).

Trap: after *be* we need **V3**, not V1 or V2. ✗ *was catch*, ✗ *was wrote*. ✓ *was caught*, ✓ *was written*.`,
            bn: `Active verb-এর **tense** একই রাখো। শুধু **be**-এর রূপ বদলায়।

| Tense | Active | Passive |
|---|---|---|
| Simple present | Rina **writes** a letter. | A letter **is written** by Rina. |
| Simple past | They **built** this bridge. | This bridge **was built** by them. |
| Simple future | The police **will arrest** the thief. | The thief **will be arrested** by the police. |

**বচন** খেয়াল রাখো: *The windows **are** cleaned.* (বহুবচন) কিন্তু *The window **is** cleaned.* (একবচন)।

ফাঁদ: *be*-এর পরে **V3** বসবে, V1 বা V2 নয়। ✗ *was catch*, ✗ *was wrote*। ✓ *was caught*, ✓ *was written*।`,
          },
        },
        {
          heading: { en: 'Why "by + doer" is often dropped', bn: '"by + কর্তা" কেন প্রায়ই বাদ যায়' },
          body: {
            en: `We keep "by ..." only when the doer is **important or surprising**.

✓ *Hamlet was written **by Shakespeare**.* (the doer matters)
✓ *My bicycle **was stolen**.* (we do not know who: no "by")
✓ *English **is spoken** in many countries.* ("by people" adds nothing)
✓ *Applications **are invited** for the post of Clerk.* (notice style)

Drop the agent when it is **people, someone, they, we, one**: the vague words add nothing.

Exam link: transformation items sometimes show the full "by" form, but a correct passive without a useless "by them" is also acceptable in real writing.`,
            bn: `"by ..." রাখি শুধু যখন কর্তা **গুরুত্বপূর্ণ বা চমকপ্রদ**।

✓ *Hamlet was written **by Shakespeare**.* (কর্তা গুরুত্বপূর্ণ)
✓ *My bicycle **was stolen**.* (কে চুরি করেছে জানি না: "by" নেই)
✓ *English **is spoken** in many countries.* ("by people" কিছু যোগ করে না)
✓ *Applications **are invited** for the post of Clerk.* (নোটিসের ভঙ্গি)

কর্তা **people, someone, they, we, one** হলে বাদ দাও: এই অস্পষ্ট শব্দ কিছু যোগ করে না।

পরীক্ষায় যোগ: transformation-এ কখনও পুরো "by" রূপ থাকে, কিন্তু বাস্তব লেখায় অকারণ "by them" ছাড়া শুদ্ধ passive-ও চলে।`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Change into the passive voice: "The manager approved the leave."', bn: 'Passive voice-এ পরিবর্তন করো: "The manager approved the leave."' },
          steps: [
            { en: 'Subject = the manager, verb = approved (simple past), object = the leave.', bn: 'Subject (কর্তা) = the manager, verb (ক্রিয়া) = approved (simple past), object (কর্ম) = the leave।' },
            { en: 'Object goes to the front. Simple past needs "was" + V3: "was approved". Trap: do not write "is approved"; the tense must stay past.', bn: 'Object সামনে যাবে। Simple past-এ "was" + V3: "was approved"। ফাঁদ: "is approved" লিখো না; tense past-ই থাকবে।' },
            { en: 'Old subject goes after "by".', bn: 'পুরনো subject "by"-এর পরে বসবে।' },
          ],
          answer: { en: '**The leave was approved by the manager.**', bn: 'সঠিক উত্তর: **The leave was approved by the manager.**' },
        },
        {
          question: { en: 'Fill in the blank: "A letter ___ to the customer yesterday." (sent / was sent / is sent)', bn: 'শূন্যস্থান পূরণ করো: "A letter ___ to the customer yesterday." (sent / was sent / is sent)' },
          steps: [
            { en: 'The letter receives the action (someone sent it), so the sentence is passive: be + V3.', bn: 'চিঠিটি কাজ পাচ্ছে (কেউ পাঠিয়েছে), তাই passive: be + V3।' },
            { en: '"Yesterday" means past, so "was sent". Trap: "sent" alone is V2 and has no helping verb.', bn: '"Yesterday" মানে past, তাই "was sent"। ফাঁদ: শুধু "sent" হল V2, helping verb নেই।' },
          ],
          answer: { en: '**was sent**', bn: 'সঠিক উত্তর: **was sent**' },
        },
        {
          question: { en: 'Spot the error: "The thief (A) was catch (B) by the police (C)."', bn: 'ভুল খোঁজো: "The thief (A) was catch (B) by the police (C)."' },
          steps: [
            { en: 'The thief receives the action, so passive: was + V3.', bn: 'Thief কাজ পাচ্ছে, তাই passive: was + V3।' },
            { en: 'Trap: "catch" is V1. The V3 of catch is "caught".', bn: 'ফাঁদ: "catch" হল V1। Catch-এর V3 হল "caught"।' },
          ],
          answer: { en: '**B** ("was catch" should be "was caught")', bn: 'সঠিক উত্তর: **B** ("was catch"-এর জায়গায় "was caught")' },
        },
      ],
    },
    {
      level: 'intermediate',
      sections: [
        {
          heading: { en: 'Passive in every tense that has one', bn: 'যে tense-এ passive আছে সবকটি' },
          body: {
            en: `Start with a real sentence: **"The tickets have been sold."** The seller is not important; the tickets are. Present perfect: have + **been** + V3.

| Tense | Passive pattern | Example |
|---|---|---|
| Simple present | is/am/are + V3 | Tea **is grown** in Darjeeling. |
| Present continuous | is/am/are + **being** + V3 | The road **is being repaired**. |
| Present perfect | has/have + **been** + V3 | The tickets **have been sold**. |
| Simple past | was/were + V3 | The thief **was caught**. |
| Past continuous | was/were + **being** + V3 | The bridge **was being repaired**. |
| Past perfect | had + **been** + V3 | The files **had been checked**. |
| Simple future | will + **be** + V3 | The results **will be published**. |
| Future perfect | will have + **been** + V3 | The work **will have been finished**. |

**No passive in exam usage:** present perfect continuous, past perfect continuous, future continuous and future perfect continuous. Forms like "has been being done" are not used, so exam questions on them are about re-wording the sentence, not forming a passive.

Memory trick: the passive always adds **be-words** (be / being / been) before V3.`,
            bn: `একটি বাস্তব বাক্য দিয়ে শুরু: **"The tickets have been sold."** কে বিক্রি করল গুরুত্বপূর্ণ নয়; টিকিটগুলো গুরুত্বপূর্ণ। Present perfect: have + **been** + V3।

| Tense | Passive-এর গঠন | উদাহরণ |
|---|---|---|
| Simple present | is/am/are + V3 | Tea **is grown** in Darjeeling. |
| Present continuous | is/am/are + **being** + V3 | The road **is being repaired**. |
| Present perfect | has/have + **been** + V3 | The tickets **have been sold**. |
| Simple past | was/were + V3 | The thief **was caught**. |
| Past continuous | was/were + **being** + V3 | The bridge **was being repaired**. |
| Past perfect | had + **been** + V3 | The files **had been checked**. |
| Simple future | will + **be** + V3 | The results **will be published**. |
| Future perfect | will have + **been** + V3 | The work **will have been finished**. |

**পরীক্ষার ব্যবহারে passive নেই:** present perfect continuous, past perfect continuous, future continuous ও future perfect continuous। "has been being done"-এর মতো রূপ চলে না।

মনে রাখার কৌশল: passive-এ V3-এর আগে সবসময় **be-শব্দ** (be / being / been) যোগ হয়।`,
          },
        },
        {
          heading: { en: 'Questions and negatives', bn: 'প্রশ্ন ও না-বাচক বাক্য' },
          body: {
            en: `**Negatives**: put **not** after the first helping verb.
✓ *The leave **was not approved**.* ✓ *The tickets **have not been sold**.*

**Yes/No questions**: the helping verb moves before the subject.
Active: *Did she post the letter?* -> Passive: **Was the letter posted** by her?
Active: *Have they cancelled the match?* -> Passive: **Has the match been cancelled**?

**Wh- questions**: question word first, then the passive question.
Active: *Where did they find the child?* -> **Where was the child found?**
Active: *Who wrote this novel?* -> **By whom was this novel written?**
Active: *Whom did you meet?* -> **Who was met by you?**

Trap: in the passive, **do/does/did disappear**. ✗ *Did the letter posted?* ✓ *Was the letter posted?*`,
            bn: `**না-বাচক**: প্রথম helping verb-এর পরে **not** বসাও।
✓ *The leave **was not approved**.* ✓ *The tickets **have not been sold**.*

**Yes/No প্রশ্ন**: helping verb subject-এর আগে যায়।
Active: *Did she post the letter?* -> Passive: **Was the letter posted** by her?
Active: *Have they cancelled the match?* -> Passive: **Has the match been cancelled**?

**Wh- প্রশ্ন**: আগে প্রশ্নশব্দ, তারপর passive প্রশ্ন।
Active: *Where did they find the child?* -> **Where was the child found?**
Active: *Who wrote this novel?* -> **By whom was this novel written?**
Active: *Whom did you meet?* -> **Who was met by you?**

ফাঁদ: passive-এ **do/does/did থাকে না**। ✗ *Did the letter posted?* ✓ *Was the letter posted?*`,
          },
        },
        {
          heading: { en: 'Modals and orders: "can be done", "Let it be done"', bn: 'Modal ও আদেশ: "can be done", "Let it be done"' },
          body: {
            en: `**Modals** (can, may, must, should, will, would): **modal + be + V3**.
✓ *Fire exits **must be kept** clear.* ✓ *Homework **can be submitted** online.* ✓ *This room **should be cleaned**.*

For the perfect form: **modal + have been + V3**.
✓ *The accident **could have been avoided**.*

**Orders (imperative)**: **Let + object + be + V3**.
Active: *Open the door.* -> **Let the door be opened.**
Active: *Do not touch the wires.* -> **Let the wires not be touched.**
Active: *Please help me.* -> **You are requested to help me.**

Trap: after "let" the verb is **be**, not "is". ✗ *Let the door is opened.*`,
            bn: `**Modal** (can, may, must, should, will, would): **modal + be + V3**।
✓ *Fire exits **must be kept** clear.* ✓ *Homework **can be submitted** online.* ✓ *This room **should be cleaned**.*

Perfect রূপে: **modal + have been + V3**।
✓ *The accident **could have been avoided**.*

**আদেশ (imperative)**: **Let + object + be + V3**।
Active: *Open the door.* -> **Let the door be opened.**
Active: *Do not touch the wires.* -> **Let the wires not be touched.**
Active: *Please help me.* -> **You are requested to help me.**

ফাঁদ: "let"-এর পরে verb হবে **be**, "is" নয়। ✗ *Let the door is opened.*`,
          },
        },
        {
          heading: { en: 'Two objects: "I was given a watch"', bn: 'দুটি object: "I was given a watch"' },
          body: {
            en: `Some verbs take **two objects**: give, tell, send, teach, offer, show, award.

Active: *My uncle gave **me** **a watch**.* (me = person, a watch = thing)

Two passives are possible:
1. Person first: ***I** was given a watch by my uncle.* (most natural)
2. Thing first: ***A watch** was given to me by my uncle.* (note the **to**)

✓ *The teacher taught **us** grammar.* -> *We were taught grammar by the teacher.*
✓ *The principal awarded **Riya** a medal.* -> *Riya was awarded a medal by the principal.*

Trap: when the person becomes the subject, use the **subject form**: *me -> I, us -> we, him -> he, her -> she, them -> they*. And after **by** use the **object form**: *by me, by him, by her*. ✗ *The prize was won by she.*`,
            bn: `কিছু verb-এর **দুটি object** থাকে: give, tell, send, teach, offer, show, award।

Active: *My uncle gave **me** **a watch**.* (me = ব্যক্তি, a watch = জিনিস)

দুভাবে passive হয়:
১. ব্যক্তি আগে: ***I** was given a watch by my uncle.* (বেশি স্বাভাবিক)
২. জিনিস আগে: ***A watch** was given to me by my uncle.* (**to** খেয়াল করো)

✓ *The teacher taught **us** grammar.* -> *We were taught grammar by the teacher.*
✓ *The principal awarded **Riya** a medal.* -> *Riya was awarded a medal by the principal.*

ফাঁদ: ব্যক্তি subject হলে **subject রূপ** বসবে: *me -> I, us -> we, him -> he, her -> she, them -> they*। আর **by**-এর পরে **object রূপ**: *by me, by him, by her*। ✗ *The prize was won by she.*`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Change into the passive: "The clerk is typing the letter."', bn: 'Passive-এ পরিবর্তন করো: "The clerk is typing the letter."' },
          steps: [
            { en: '"Is typing" is present continuous. Its passive is is + being + V3.', bn: '"Is typing" present continuous। এর passive হল is + being + V3।' },
            { en: 'Object "the letter" moves to the front: "The letter is being typed". Trap: "The letter is typed" loses the "in progress" meaning.', bn: 'Object "the letter" সামনে: "The letter is being typed"। ফাঁদ: "The letter is typed" লিখলে "চলছে" অর্থটা হারায়।' },
          ],
          answer: { en: '**The letter is being typed by the clerk.**', bn: 'সঠিক উত্তর: **The letter is being typed by the clerk.**' },
        },
        {
          question: { en: 'Change into the passive: "Did she post the letter?"', bn: 'Passive-এ পরিবর্তন করো: "Did she post the letter?"' },
          steps: [
            { en: '"Did + post" is simple past, so the passive uses was + V3 (posted).', bn: '"Did + post" simple past, তাই passive-এ was + V3 (posted)।' },
            { en: 'Question order: "Was" first, then the new subject. Trap: "did" must disappear; "Did the letter posted?" is wrong.', bn: 'প্রশ্নের ক্রম: আগে "Was", তারপর নতুন subject। ফাঁদ: "did" বাদ যাবে; "Did the letter posted?" ভুল।' },
          ],
          answer: { en: '**Was the letter posted by her?**', bn: 'সঠিক উত্তর: **Was the letter posted by her?**' },
        },
        {
          question: { en: 'Change into the passive: "My uncle gave me a watch."', bn: 'Passive-এ পরিবর্তন করো: "My uncle gave me a watch."' },
          steps: [
            { en: 'There are two objects: me (person) and a watch (thing). Choose the person as the new subject.', bn: 'দুটি object: me (ব্যক্তি) ও a watch (জিনিস)। ব্যক্তিকে নতুন subject করো।' },
            { en: '"Me" becomes "I" (subject form). "Gave" is past, so "was given". Trap: "was gave" uses V2.', bn: '"Me" হল "I" (subject রূপ)। "Gave" past, তাই "was given"। ফাঁদ: "was gave"-এ V2।' },
          ],
          answer: { en: '**I was given a watch by my uncle.**', bn: 'সঠিক উত্তর: **I was given a watch by my uncle.**' },
        },
        {
          question: { en: 'Change into the passive: "Do not touch the wires."', bn: 'Passive-এ পরিবর্তন করো: "Do not touch the wires."' },
          steps: [
            { en: 'It is an order, so use "Let + object + not + be + V3".', bn: 'এটি আদেশ, তাই "Let + object + not + be + V3"।' },
            { en: 'Trap: after "let" we need "be", and "touched" is V3: not "Let the wires not touched".', bn: 'ফাঁদ: "let"-এর পরে "be" লাগে, আর "touched" হল V3: "Let the wires not touched" নয়।' },
          ],
          answer: { en: '**Let the wires not be touched.**', bn: 'সঠিক উত্তর: **Let the wires not be touched.**' },
        },
      ],
    },
    {
      level: 'advanced',
      sections: [
        {
          heading: { en: 'Prepositional verbs keep their preposition', bn: 'Preposition-যুক্ত verb-এ preposition থেকে যায়' },
          body: {
            en: `Start with a real sentence: **"The sick child was looked after by the nurses."** *Look after* (take care of) is one unit. When we make it passive, the preposition **stays**.

| Active | Passive |
|---|---|
| The nurses looked **after** the child. | The child was looked **after** by the nurses. |
| The audience laughed **at** the comedian. | The comedian was laughed **at**. |
| The committee turned **down** the proposal. | The proposal was turned **down**. |
| Everyone listened **to** the speaker. | The speaker was listened **to**. |
| The crowd called **off** the meeting. | The meeting was called **off**. |

SSC trap: students drop the preposition. ✗ *He was laughed by his friends.* ✓ *He was laughed at by his friends.*

Also remember: **intransitive verbs** (happen, occur, die, sleep, arrive, rise, fall) have **no passive**. ✗ *The accident was happened.* ✓ *The accident happened.*`,
            bn: `একটি বাস্তব বাক্য দিয়ে শুরু: **"The sick child was looked after by the nurses."** *Look after* (যত্ন নেওয়া) একটি অংশ। Passive করলে preposition **থেকে যায়**।

| Active | Passive |
|---|---|
| The nurses looked **after** the child. | The child was looked **after** by the nurses. |
| The audience laughed **at** the comedian. | The comedian was laughed **at**. |
| The committee turned **down** the proposal. | The proposal was turned **down**. |
| Everyone listened **to** the speaker. | The speaker was listened **to**. |
| The crowd called **off** the meeting. | The meeting was called **off**. |

SSC-র ফাঁদ: ছাত্ররা preposition বাদ দেয়। ✗ *He was laughed by his friends.* ✓ *He was laughed at by his friends.*

আরও মনে রাখো: **intransitive verb** (happen, occur, die, sleep, arrive, rise, fall)-এর **passive হয় না**। ✗ *The accident was happened.* ✓ *The accident happened.*`,
          },
        },
        {
          heading: { en: 'Fixed pairs: "known to", "surprised at", "married to"', bn: 'স্থির জুটি: "known to", "surprised at", "married to"' },
          body: {
            en: `Some **passive-looking** phrases are really fixed word pairs. They do not use "by". Exams love them.

| Phrase | Example |
|---|---|
| known **to** (people) | The singer is known **to** everyone. |
| known **for** (quality) | The Taj Mahal is known **for** its beauty. |
| known **as** (name) | Kolkata is known **as** the City of Joy. |
| surprised / shocked **at** (or **by**) | We were surprised **at** the news. |
| married **to** | She was married **to** a doctor. |
| interested **in** | Many students are interested **in** the army. |
| satisfied / pleased / annoyed **with** | The villagers were satisfied **with** the service. |
| filled / covered **with** | The hall was filled **with** people. |
| worried / anxious **about** | He is worried **about** the result. |

Rule of thumb: **by** introduces the **doer** (a person or agent). **with** introduces a **tool** or material: *The snake was killed **with** a stick.*

Do not write ✗ *married with*, ✗ *interested at*, ✗ *satisfied from*.`,
            bn: `কিছু **passive-এর মতো দেখতে** বাক্যাংশ আসলে স্থির শব্দ-জুটি। এতে "by" বসে না। পরীক্ষায় এগুলো খুব আসে।

| Phrase | উদাহরণ |
|---|---|
| known **to** (মানুষ) | The singer is known **to** everyone. |
| known **for** (গুণ) | The Taj Mahal is known **for** its beauty. |
| known **as** (নাম) | Kolkata is known **as** the City of Joy. |
| surprised / shocked **at** (বা **by**) | We were surprised **at** the news. |
| married **to** | She was married **to** a doctor. |
| interested **in** | Many students are interested **in** the army. |
| satisfied / pleased / annoyed **with** | The villagers were satisfied **with** the service. |
| filled / covered **with** | The hall was filled **with** people. |
| worried / anxious **about** | He is worried **about** the result. |

সহজ নিয়ম: **by** বসে **কর্তার** (ব্যক্তি বা agent) আগে। **with** বসে **হাতিয়ার** বা উপাদানের আগে: *The snake was killed **with** a stick.*

লিখো না ✗ *married with*, ✗ *interested at*, ✗ *satisfied from*।`,
          },
        },
        {
          heading: { en: 'Special patterns: reporting verbs, make/see, have something done', bn: 'বিশেষ গঠন: reporting verb, make/see, have something done' },
          body: {
            en: `**1. People say / believe / think ...** -> **It is said / believed / thought that ...**
*People say that the minister is honest.* -> **It is said that the minister is honest.**
Or: *The minister is said to be honest.*

**2. make / see / hear + bare infinitive**: the **to** returns in the passive.
*They made the employees work.* -> *The employees **were made to work**.*
*They saw him enter.* -> *He **was seen to enter**.*

**3. Verb + object + to-infinitive** keeps the "to":
*He asked me to leave.* -> ***I was asked to leave** by him.*

**4. have / get something done** (someone else does it for you):
*I had my passport renewed.* *She got her hair cut.* Here **V3** follows the object.

**5. Verbs with no passive**: have (possession), resemble, suit (fit), lack, become (suit). ✗ *A new smartphone is had by her.*

**6. -ing passive**: **being + V3**. *She hates **being interrupted**.* *He objected to **being treated** like a child.*`,
            bn: `**১. People say / believe / think ...** -> **It is said / believed / thought that ...**
*People say that the minister is honest.* -> **It is said that the minister is honest.**
অথবা: *The minister is said to be honest.*

**২. make / see / hear + bare infinitive**: passive-এ **to** ফিরে আসে।
*They made the employees work.* -> *The employees **were made to work**.*
*They saw him enter.* -> *He **was seen to enter**.*

**৩. Verb + object + to-infinitive**-এ "to" থাকে:
*He asked me to leave.* -> ***I was asked to leave** by him.*

**৪. have / get something done** (অন্য কেউ তোমার হয়ে কাজটা করে):
*I had my passport renewed.* *She got her hair cut.* এখানে object-এর পরে **V3**।

**৫. যেসব verb-এর passive নেই**: have (অধিকার), resemble, suit (মানানো), lack। ✗ *A new smartphone is had by her.*

**৬. -ing passive**: **being + V3**। *She hates **being interrupted**.* *He objected to **being treated** like a child.*`,
          },
        },
        {
          heading: { en: 'Common SSC / WBPSC errors', bn: 'SSC / WBPSC-র সাধারণ ভুল' },
          body: {
            en: `| Error | Correct | Why |
|---|---|---|
| The thief was **catch**. | was **caught** | be + V3, not V1 |
| The cards **have been sent** yesterday. | **were sent** | finished time -> past |
| Our team was defeated **from** the visitors. | defeated **by** | by + doer |
| He was laughed **by** his friends. | laughed **at** | keep the preposition |
| The accident **was happened**. | **happened** | intransitive: no passive |
| The prize was won by **she**. | by **her** | object form after by |
| She was married **with** a doctor. | married **to** | fixed pair |
| The villagers were satisfied **from** the service. | satisfied **with** | fixed pair |
| Hardly **was** the gate opened when ... | Hardly **had** the gate **been** opened when ... | Hardly + past perfect |
| It is high time the files **are** cleared. | **were** cleared | high time + past form |

Tip for error spotting: find the **be-word** and check that **V3** follows it, then check the **tense clue** (yesterday, since, by the time) and the **preposition**.`,
            bn: `| ভুল | শুদ্ধ | কারণ |
|---|---|---|
| The thief was **catch**. | was **caught** | be + V3, V1 নয় |
| The cards **have been sent** yesterday. | **were sent** | শেষ হওয়া সময় -> past |
| Our team was defeated **from** the visitors. | defeated **by** | by + কর্তা |
| He was laughed **by** his friends. | laughed **at** | preposition রাখতে হবে |
| The accident **was happened**. | **happened** | intransitive: passive নেই |
| The prize was won by **she**. | by **her** | by-এর পরে object রূপ |
| She was married **with** a doctor. | married **to** | স্থির জুটি |
| The villagers were satisfied **from** the service. | satisfied **with** | স্থির জুটি |
| Hardly **was** the gate opened when ... | Hardly **had** the gate **been** opened when ... | Hardly + past perfect |
| It is high time the files **are** cleared. | **were** cleared | high time + past রূপ |

Error spotting-এর কৌশল: **be-শব্দ** খোঁজো, তার পরে **V3** আছে কিনা দেখো, তারপর **tense-এর সূত্র** (yesterday, since, by the time) আর **preposition** মেলাও।`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Spot the error: "My brother (A) was laughed (B) by his friends (C)."', bn: 'ভুল খোঁজো: "My brother (A) was laughed (B) by his friends (C)."' },
          steps: [
            { en: 'The verb is "laugh at" (make fun of). It is a prepositional verb.', bn: 'Verb হল "laugh at" (ঠাট্টা করা)। এটি preposition-যুক্ত verb।' },
            { en: 'In the passive, "at" must stay: "was laughed at by his friends". Trap: "by" is correct for the doer; the missing part is "at".', bn: 'Passive-এ "at" থাকতেই হবে: "was laughed at by his friends"। ফাঁদ: কর্তার জন্য "by" ঠিক; বাদ গেছে "at"।' },
          ],
          answer: { en: '**B** ("was laughed" should be "was laughed at")', bn: 'সঠিক উত্তর: **B** ("was laughed"-এর জায়গায় "was laughed at")' },
        },
        {
          question: { en: 'Fill in the blank: "The singer is known ___ everyone in the town." (for / to / as / with)', bn: 'শূন্যস্থান পূরণ করো: "The singer is known ___ everyone in the town." (for / to / as / with)' },
          steps: [
            { en: 'After the blank comes a group of people who know the singer.', bn: 'ফাঁকের পরে আছে একদল মানুষ, যারা গায়ককে চেনে।' },
            { en: '"Known to" is followed by the people who know. Trap: "known for" is followed by a quality (known for his voice).', bn: '"Known to"-এর পরে যারা চেনে তারা বসে। ফাঁদ: "known for"-এর পরে গুণ বসে (known for his voice)।' },
          ],
          answer: { en: '**to**', bn: 'সঠিক উত্তর: **to**' },
        },
        {
          question: { en: 'Choose the correct passive: "They saw him enter the bank."', bn: 'শুদ্ধ passive বাছো: "They saw him enter the bank." ((a) He was seen enter the bank. (b) He was seen to enter the bank.)' },
          steps: [
            { en: '"Saw him enter" has a bare infinitive after the object.', bn: '"Saw him enter"-এ object-এর পরে bare infinitive আছে।' },
            { en: 'In the passive, "to" returns: "was seen to enter". Trap: (a) drops the "to".', bn: 'Passive-এ "to" ফিরে আসে: "was seen to enter"। ফাঁদ: (a)-তে "to" বাদ গেছে।' },
          ],
          answer: { en: '**(b) He was seen to enter the bank.**', bn: 'সঠিক উত্তর: **(b) He was seen to enter the bank.**' },
        },
        {
          question: { en: 'Change into the passive: "People say that the minister is honest."', bn: 'Passive-এ পরিবর্তন করো: "People say that the minister is honest."' },
          steps: [
            { en: '"People say that ..." is a reporting structure. Use "It is said that ...".', bn: '"People say that ..." একটি reporting গঠন। ব্যবহার করো "It is said that ..."।' },
            { en: 'The second clause stays unchanged: "the minister is honest". Trap: do not change "is" to "was".', bn: 'দ্বিতীয় clause বদলায় না: "the minister is honest"। ফাঁদ: "is"-কে "was" করো না।' },
          ],
          answer: { en: '**It is said that the minister is honest.**', bn: 'সঠিক উত্তর: **It is said that the minister is honest.**' },
        },
      ],
    },
  ],
  rules: [
    {
      label: { en: 'Basic formula', bn: 'মূল সূত্র' },
      explain: { en: 'Active: Subject + verb + Object. Passive: Object + be (same tense) + V3 + by + Subject. Only transitive verbs (with an object) have a passive.', bn: 'Active: Subject + verb + Object। Passive: Object + be (একই tense) + V3 + by + Subject। শুধু transitive verb-এর (object আছে এমন) passive হয়।' },
    },
    {
      label: { en: 'Tense table', bn: 'Tense অনুযায়ী গঠন' },
      explain: { en: 'Simple present: is/am/are + V3. Present continuous: is/am/are + being + V3. Present perfect: has/have + been + V3. Simple past: was/were + V3. Past continuous: was/were + being + V3. Past perfect: had + been + V3. Simple future: will + be + V3. Future perfect: will have + been + V3.', bn: 'Simple present (এখনকার সাধারণ কাল): is/am/are + V3। Present continuous: is/am/are + being + V3। Present perfect: has/have + been + V3। Simple past: was/were + V3। Past continuous: was/were + being + V3। Past perfect: had + been + V3। Simple future: will + be + V3। Future perfect: will have + been + V3।' },
    },
    {
      label: { en: 'Tenses with no passive', bn: 'যে tense-এ passive নেই' },
      explain: { en: 'Perfect continuous tenses and the future continuous have no passive in exam usage. Do not try to form "has been being done".', bn: 'Perfect continuous tense ও future continuous-এর পরীক্ষার ব্যবহারে passive নেই। "has been being done" গঠন করার চেষ্টা করো না।' },
    },
    {
      label: { en: 'Questions and negatives', bn: 'প্রশ্ন ও না-বাচক' },
      explain: { en: 'Negative: not after the first helping verb. Questions: helping verb before the subject; do/does/did disappear (Did she post it? -> Was it posted by her?). "Who wrote it?" -> "By whom was it written?".', bn: 'না-বাচক: প্রথম helping verb-এর পরে not। প্রশ্ন: helping verb subject-এর আগে; do/does/did থাকে না (Did she post it? -> Was it posted by her?)। "Who wrote it?" -> "By whom was it written?"।' },
    },
    {
      label: { en: 'Modals and imperatives', bn: 'Modal ও imperative' },
      explain: { en: 'Modal + be + V3 (can be done), modal + have been + V3 (could have been avoided). Orders: Let + object + be + V3 (Let the door be opened); negative: Let the wires not be touched.', bn: 'Modal + be + V3 (can be done), modal + have been + V3 (could have been avoided)। আদেশ: Let + object + be + V3 (Let the door be opened); না-বাচক: Let the wires not be touched।' },
    },
    {
      label: { en: 'Two objects', bn: 'দুটি object' },
      explain: { en: 'Either object can become the subject: "I was given a watch" or "A watch was given to me". A person subject takes the subject form (I, we, he, she, they); after "by" use the object form (me, us, him, her, them).', bn: 'যেকোনো object subject হতে পারে: "I was given a watch" বা "A watch was given to me"। ব্যক্তি subject হলে subject রূপ (I, we, he, she, they); "by"-এর পরে object রূপ (me, us, him, her, them)।' },
    },
    {
      label: { en: 'Prepositional verbs and fixed pairs', bn: 'Preposition-যুক্ত verb ও স্থির জুটি' },
      explain: { en: 'The preposition stays: was looked after, was laughed at, was listened to. Fixed pairs: known to/for/as, surprised at, married to, interested in, satisfied with, filled with. "By" is for the doer, "with" for the tool.', bn: 'Preposition থেকে যায়: was looked after, was laughed at, was listened to। স্থির জুটি: known to/for/as, surprised at, married to, interested in, satisfied with, filled with। "By" কর্তার জন্য, "with" হাতিয়ারের জন্য।' },
    },
    {
      label: { en: 'Special patterns', bn: 'বিশেষ গঠন' },
      explain: { en: 'People say that ... -> It is said that .... make/see/hear + bare infinitive -> was made to / was seen to. Intransitive verbs (happen, occur) and "have" (possession) have no passive.', bn: 'People say that ... -> It is said that ...। make/see/hear + bare infinitive -> was made to / was seen to। Intransitive verb (happen, occur) আর "have" (অধিকার)-এর passive নেই।' },
    },
  ],
  tips: [
    {
      en: 'Find the **be-word** (is, was, been, being, be). In the passive, V3 must come right after it.',
      bn: '**be-শব্দ** (is, was, been, being, be) খোঁজো। Passive-এ তার ঠিক পরে V3 বসবে।',
    },
    {
      en: 'Keep the **tense** of the active sentence. "approved" (past) becomes "was approved", never "is approved".',
      bn: 'Active বাক্যের **tense** একই রাখো। "approved" (past) হবে "was approved", কখনও "is approved" নয়।',
    },
    {
      en: 'Match the **number**: plural subject -> are/were/have been; singular -> is/was/has been.',
      bn: '**বচন** মেলাও: বহুবচন subject -> are/were/have been; একবচন -> is/was/has been।',
    },
    {
      en: 'Learn V3 of irregular verbs: catch -> caught, write -> written, steal -> stolen, break -> broken, give -> given, sing -> sung.',
      bn: 'অনিয়মিত verb-এর V3 শেখো: catch -> caught, write -> written, steal -> stolen, break -> broken, give -> given, sing -> sung।',
    },
    {
      en: 'Do not drop the preposition of a phrasal verb: was laughed **at**, was looked **after**, was listened **to**.',
      bn: 'Phrasal verb-এর preposition বাদ দিও না: was laughed **at**, was looked **after**, was listened **to**।',
    },
    {
      en: 'Intransitive verbs (happen, occur, die, arrive) have no passive. "The accident was happened" is always wrong.',
      bn: 'Intransitive verb (happen, occur, die, arrive)-এর passive নেই। "The accident was happened" সবসময় ভুল।',
    },
    {
      en: 'After "by" use the object form: by her, by him, by them, never by she, by he, by they.',
      bn: '"By"-এর পরে object রূপ: by her, by him, by them; কখনও by she, by he, by they নয়।',
    },
    {
      en: 'Exam clue words: yesterday, ago, last year -> past form. "Hardly ... when" -> had + been. "High time" -> were.',
      bn: 'পরীক্ষার সূত্র-শব্দ: yesterday, ago, last year -> past রূপ। "Hardly ... when" -> had + been। "High time" -> were।',
    },
  ],
};
