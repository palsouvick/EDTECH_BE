'use strict';

module.exports = {
  subject: 'english',
  topic: 'grammar',
  title: { en: 'Grammar', bn: 'ব্যাকরণ' },
  emoji: '📘',
  intro: {
    en: 'Grammar is the set of rules that tells us how words fit together to make correct sentences. In this chapter we learn three things exams love to test: **prepositions** (small words like *in*, *on*, *at*), **subject-verb agreement** (*is* or *are*?) and **conjunctions** (joining words like *and*, *but*, *hardly ... when*).',
    bn: 'Grammar (ব্যাকরণ) হল সেই নিয়ম যা বলে দেয় শব্দগুলো কীভাবে জুড়ে সঠিক বাক্য তৈরি হয়। এই অধ্যায়ে আমরা পরীক্ষায় সবচেয়ে বেশি আসা তিনটি বিষয় শিখব: **preposition** (*in*, *on*, *at* এর মতো ছোট শব্দ), **subject-verb agreement** (*is* হবে না *are*?) আর **conjunction** (*and*, *but*, *hardly ... when* এর মতো জোড়া লাগানোর শব্দ)।',
  },
  levels: [
    {
      level: 'basic',
      sections: [
        {
          heading: { en: 'Subject and verb: the two main parts', bn: 'Subject আর verb: বাক্যের দুটি প্রধান অংশ' },
          body: {
            en: `A **noun** is a naming word: *Riya*, *Kolkata*, *book*.

The **subject** is the person or thing a sentence is about. The **verb** is the action or "being" word.

- *Riya* **plays** cricket. (subject: Riya, verb: plays)
- *The boys* **are** in the field. (subject: the boys, verb: are)

**Singular** means one (*a boy*). **Plural** means more than one (*boys*).`,
            bn: `**Noun** (বিশেষ্য) হল নাম বোঝানোর শব্দ: *Riya*, *Kolkata*, *book*।

**Subject** (কর্তা) হল যার সম্পর্কে বাক্যটি বলা হচ্ছে। **Verb** (ক্রিয়া) হল কাজ বা "হওয়া" বোঝানোর শব্দ।

- *Riya* **plays** cricket. (subject: Riya, verb: plays)
- *The boys* **are** in the field. (subject: the boys, verb: are)

**Singular** (একবচন) মানে একজন বা একটি (*a boy*)। **Plural** (বহুবচন) মানে একাধিক (*boys*)।`,
          },
        },
        {
          heading: { en: 'One subject, one matching verb', bn: 'Subject অনুযায়ী verb' },
          body: {
            en: `A singular subject takes a singular verb. A plural subject takes a plural verb. This is called **subject-verb agreement**.

- Singular: **is, was, has, plays, goes**
- Plural: **are, were, have, play, go**

✓ The boy **is** happy. ✗ The boy are happy.
✓ The boys **are** happy. ✗ The boys is happy.
✓ My sister **plays** the guitar. ✗ My sister play the guitar.

Careful: with a singular subject the verb often gets an **-s** (*he plays*), but the plural noun gets the -s (*boys play*).`,
            bn: `Singular subject হলে verb-ও singular হবে, plural subject হলে verb plural হবে। একেই বলে **subject-verb agreement** (কর্তা-ক্রিয়ার সঙ্গতি)।

- Singular: **is, was, has, plays, goes**
- Plural: **are, were, have, play, go**

✓ The boy **is** happy. ✗ The boy are happy.
✓ The boys **are** happy. ✗ The boys is happy.
✓ My sister **plays** the guitar. ✗ My sister play the guitar.

খেয়াল রাখো: singular subject হলে verb-এ প্রায়ই **-s** বসে (*he plays*), কিন্তু plural হলে -s বসে noun-এ (*boys play*)।`,
          },
        },
        {
          heading: { en: 'Prepositions: little words of place and time', bn: 'Preposition: স্থান ও সময়ের ছোট শব্দ' },
          body: {
            en: `A **preposition** is a small word that shows how one thing is linked to another: *in, on, at, to, for, from, with, by, of*.

- **at** a point: *at the gate*, *at 5 o'clock*
- **on** a surface or a day: *on the table*, *on Monday*
- **in** inside something, or a month/year: *in the bag*, *in May*, *in 2024*

✓ The match starts **at** 3 pm **on** Sunday.
✗ The match starts in 3 pm in Sunday.`,
            bn: `**Preposition** (পদান্বয়ী অব্যয়) হল ছোট শব্দ যা দেখায় একটি জিনিসের সঙ্গে আরেকটির সম্পর্ক: *in, on, at, to, for, from, with, by, of*।

- **at** কোনো নির্দিষ্ট বিন্দু বা সময়: *at the gate*, *at 5 o'clock*
- **on** কোনো তলের উপর বা দিন: *on the table*, *on Monday*
- **in** কোনো কিছুর ভেতরে, বা মাস/বছর: *in the bag*, *in May*, *in 2024*

✓ The match starts **at** 3 pm **on** Sunday.
✗ The match starts in 3 pm in Sunday.`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Choose the correct verb: "The boys ___ playing cricket." (is / are)', bn: 'সঠিক verb বাছো: "The boys ___ playing cricket." (is / are)' },
          steps: [
            { en: 'Find the subject: *The boys*.', bn: 'Subject খোঁজো: *The boys*।' },
            { en: '*Boys* means more than one boy, so it is plural.', bn: '*Boys* মানে একাধিক ছেলে, তাই এটি plural।' },
            { en: 'A plural subject takes the plural verb *are*.', bn: 'Plural subject-এর সঙ্গে plural verb *are* বসে।' },
          ],
          answer: { en: '**are**: The boys are playing cricket.', bn: 'সঠিক উত্তর: **are**: The boys are playing cricket.' },
        },
        {
          question: { en: 'Fill in the blank: "Moumita is good ___ mathematics." (in / at / for)', bn: 'শূন্যস্থান পূরণ করো: "Moumita is good ___ mathematics." (in / at / for)' },
          steps: [
            { en: 'Some words always go with a fixed preposition. We must learn them as pairs.', bn: 'কিছু শব্দের সঙ্গে সবসময় একটি নির্দিষ্ট preposition বসে। এগুলো জোড়া হিসেবে মুখস্থ করতে হয়।' },
            { en: 'The fixed pair is **good at** (skilled in something).', bn: 'নির্দিষ্ট জোড়াটি হল **good at** (কোনো কিছুতে দক্ষ)।' },
            { en: 'Bengali speakers often say "good in" because that is how the idea sounds in Bengali. In English it is *at*.', bn: 'বাংলায় "অঙ্কে ভালো" ভাবি বলে অনেকে "good in" লেখে। ইংরেজিতে কিন্তু *at* হবে।' },
          ],
          answer: { en: '**at**: Moumita is good at mathematics.', bn: 'সঠিক উত্তর: **at**: Moumita is good at mathematics.' },
        },
      ],
    },
    {
      level: 'intermediate',
      sections: [
        {
          heading: { en: 'Fixed prepositions you must learn', bn: 'যে fixed preposition মুখস্থ করতেই হবে' },
          body: {
            en: `Many words "choose" their own preposition. Learn them as pairs:

- **addicted to** (not *of*): *He is addicted to video games.*
- **famous for**: *Darjeeling is famous for tea.*
- **wait for**: *We waited for the bus.*
- **listen to**: *Listen to your teacher.*
- **blind to** (not noticing): *A loving mother is blind to her child's faults.*
- **afraid of**, **proud of**, **fond of**: *She is fond of music.*
- **agree with** a person, **agree to** a plan: *I agree with you. He agreed to the plan.*
- **married to** (not *with*): *She is married to a doctor.*`,
            bn: `অনেক শব্দ নিজের preposition "বেছে" নেয়। এগুলো জোড়া হিসেবে শেখো:

- **addicted to** (*of* নয়): *He is addicted to video games.*
- **famous for**: *Darjeeling is famous for tea.*
- **wait for**: *We waited for the bus.*
- **listen to**: *Listen to your teacher.*
- **blind to** (কোনো কিছু দেখতে না পাওয়া): *A loving mother is blind to her child's faults.*
- **afraid of**, **proud of**, **fond of**: *She is fond of music.*
- কোনো মানুষের সঙ্গে একমত হলে **agree with**, প্রস্তাবে রাজি হলে **agree to**: *I agree with you. He agreed to the plan.*
- **married to** (*with* নয়): *She is married to a doctor.*`,
          },
        },
        {
          heading: { en: 'Tricky subjects: each, every, either, neither', bn: 'কঠিন subject: each, every, either, neither' },
          body: {
            en: `These words are always **singular**, even when a plural noun comes after *of*:

✓ **Each** of the students **is** present. ✗ Each of the students are present.
✓ **Every** boy and girl **was** invited.
✓ **Neither** of the players **is** ready.

The verb agrees with *each / neither*, not with *students / players*.

But **both**, **few**, **many**, **several** are always **plural**:
✓ **Both** of the boys **were** late.
✓ **Few** of the members **have** come.`,
            bn: `এই শব্দগুলো সবসময় **singular**, এমনকি *of*-এর পরে plural noun থাকলেও:

✓ **Each** of the students **is** present. ✗ Each of the students are present.
✓ **Every** boy and girl **was** invited.
✓ **Neither** of the players **is** ready.

Verb মিলবে *each / neither*-এর সঙ্গে, *students / players*-এর সঙ্গে নয়।

কিন্তু **both**, **few**, **many**, **several** সবসময় **plural**:
✓ **Both** of the boys **were** late.
✓ **Few** of the members **have** come.`,
          },
        },
        {
          heading: { en: 'Conjunctions: joining words', bn: 'Conjunction: জোড়া লাগানোর শব্দ' },
          body: {
            en: `A **conjunction** joins words or sentences: *and, but, or, because, though, so*.

- *I was tired **but** I finished my homework.*
- *We stayed home **because** it was raining.*

Use only **one** joining word for one link. In Bengali we often say "though ... still", but English does **not** use *though* with *but*:

✓ **Though** he was tired, he kept playing.
✗ Though he was tired **but** he kept playing.`,
            bn: `**Conjunction** (সংযোজক অব্যয়) শব্দ বা বাক্যকে জুড়ে দেয়: *and, but, or, because, though, so*।

- *I was tired **but** I finished my homework.*
- *We stayed home **because** it was raining.*

একটি জোড়ের জন্য **একটিই** conjunction। বাংলায় "যদিও ... তবুও" বলি, কিন্তু ইংরেজিতে *though*-এর সঙ্গে *but* বসে **না**:

✓ **Though** he was tired, he kept playing.
✗ Though he was tired **but** he kept playing.`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Choose the correct verb: "Each of the students ___ under discussion at present." (is / are)', bn: 'সঠিক verb বাছো: "Each of the students ___ under discussion at present." (is / are)' },
          steps: [
            { en: 'The real subject is *Each*, not *students*. The words *of the students* only describe it.', bn: 'আসল subject হল *Each*, *students* নয়। *of the students* শুধু বাড়তি তথ্য।' },
            { en: '*Each* means one by one, so it is singular.', bn: '*Each* মানে প্রত্যেকে আলাদা করে, তাই এটি singular।' },
            { en: 'A singular subject takes *is*.', bn: 'Singular subject-এর সঙ্গে *is* বসে।' },
          ],
          answer: { en: '**is**: Each of the students is under discussion at present.', bn: 'সঠিক উত্তর: **is**: Each of the students is under discussion at present.' },
        },
        {
          question: { en: 'Fill in the blank: "Anirban is addicted ___ chocolates." (of / to / with)', bn: 'শূন্যস্থান পূরণ করো: "Anirban is addicted ___ chocolates." (of / to / with)' },
          steps: [
            { en: 'The adjective *addicted* has a fixed preposition.', bn: '*addicted* শব্দটির একটি নির্দিষ্ট preposition আছে।' },
            { en: 'The fixed pair is **addicted to** something.', bn: 'নির্দিষ্ট জোড়াটি হল **addicted to** something।' },
          ],
          answer: { en: '**to**: Anirban is addicted to chocolates.', bn: 'সঠিক উত্তর: **to**: Anirban is addicted to chocolates.' },
        },
        {
          question: { en: 'Choose the correct verb: "Both of the boys ___ discussed in detail yesterday." (was / were)', bn: 'সঠিক verb বাছো: "Both of the boys ___ discussed in detail yesterday." (was / were)' },
          steps: [
            { en: '*Both* means two people, so it is plural.', bn: '*Both* মানে দুজন, তাই এটি plural।' },
            { en: '*Yesterday* tells us it is the past. The plural past form of *be* is *were*.', bn: '*Yesterday* বলছে অতীত কাল। *be*-এর plural past রূপ হল *were*।' },
          ],
          answer: { en: '**were**: Both of the boys were discussed in detail yesterday.', bn: 'সঠিক উত্তর: **were**: Both of the boys were discussed in detail yesterday.' },
        },
      ],
    },
    {
      level: 'advanced',
      sections: [
        {
          heading: { en: 'Two subjects joined together', bn: 'দুটি subject একসঙ্গে জুড়লে' },
          body: {
            en: `**A and B** → plural: *Ram and Shyam **are** friends.*

**Either A or B / Neither A nor B** → the verb agrees with the subject **nearer** to it (B):
✓ Neither the girl nor the boys **are** ready. (*boys* is nearer → plural)
✓ Neither the boys nor the girl **is** ready. (*girl* is nearer → singular)

**A as well as B / A along with B / A together with B / A with B** → the verb agrees with **A** (the first subject). The second part is extra information:
✓ The teachers as well as the principal **are** going.
✓ The captain, together with his players, **has** been praised.`,
            bn: `**A and B** → plural: *Ram and Shyam **are** friends.*

**Either A or B / Neither A nor B** → verb মিলবে **কাছের** subject (B)-এর সঙ্গে:
✓ Neither the girl nor the boys **are** ready. (*boys* কাছে → plural)
✓ Neither the boys nor the girl **is** ready. (*girl* কাছে → singular)

**A as well as B / A along with B / A together with B / A with B** → verb মিলবে **A** (প্রথম subject)-এর সঙ্গে। দ্বিতীয় অংশটি শুধু বাড়তি তথ্য:
✓ The teachers as well as the principal **are** going.
✓ The captain, together with his players, **has** been praised.`,
          },
        },
        {
          heading: { en: 'Nouns that trick you', bn: 'যে noun ধোঁকা দেয়' },
          body: {
            en: `- **The police, people, cattle** are always **plural**: *The police **are** investigating the case.*
- **Mathematics, physics, economics, news** look plural but are **singular**: *Mathematics **is** my favourite subject. The news **is** good.*
- **The number of** + plural noun → **singular** verb (we talk about one number): *The number of applicants **is** large.*
- **A number of** + plural noun → **plural** verb (it means "many"): *A number of students **are** absent.*
- **One of the** + plural noun → singular verb: *One of my friends **lives** in Delhi.*`,
            bn: `- **The police, people, cattle** সবসময় **plural**: *The police **are** investigating the case.*
- **Mathematics, physics, economics, news** দেখতে plural, কিন্তু আসলে **singular**: *Mathematics **is** my favourite subject. The news **is** good.*
- **The number of** + plural noun → **singular** verb (একটি সংখ্যার কথা বলা হচ্ছে): *The number of applicants **is** large.*
- **A number of** + plural noun → **plural** verb (মানে "অনেক"): *A number of students **are** absent.*
- **One of the** + plural noun → singular verb: *One of my friends **lives** in Delhi.*`,
          },
        },
        {
          heading: { en: 'Paired conjunctions (correlatives)', bn: 'জোড়া conjunction (correlative)' },
          body: {
            en: `Some conjunctions always come in fixed pairs. Never mix the partners:

- **Hardly / Scarcely ... when**: *Hardly had he reached the station **when** the train left.*
- **No sooner ... than**: *No sooner had he reached the station **than** the train left.*
- **Either ... or**, **Neither ... nor**, **Both ... and**, **Not only ... but also**
- **Though / Although ...** (no *but*), **Lest ... should**: *Walk carefully lest you **should** fall.*

✗ Hardly had we reached **than** the bell rang. ✓ Hardly had we reached **when** the bell rang.`,
            bn: `কিছু conjunction সবসময় নির্দিষ্ট জোড়ায় আসে। জোড়া কখনও বদলাবে না:

- **Hardly / Scarcely ... when**: *Hardly had he reached the station **when** the train left.*
- **No sooner ... than**: *No sooner had he reached the station **than** the train left.*
- **Either ... or**, **Neither ... nor**, **Both ... and**, **Not only ... but also**
- **Though / Although ...** (*but* বসবে না), **Lest ... should**: *Walk carefully lest you **should** fall.*

✗ Hardly had we reached **than** the bell rang. ✓ Hardly had we reached **when** the bell rang.`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Choose the correct verb: "Neither the girl nor the boys ___ very important for the final result." (is / are)', bn: 'সঠিক verb বাছো: "Neither the girl nor the boys ___ very important for the final result." (is / are)' },
          steps: [
            { en: 'With *neither ... nor*, the verb agrees with the subject nearer to it.', bn: '*neither ... nor* থাকলে verb কাছের subject-এর সঙ্গে মেলে।' },
            { en: 'The nearer subject is *the boys*, which is plural.', bn: 'কাছের subject হল *the boys*, যা plural।' },
            { en: 'So we use the plural verb *are*.', bn: 'তাই plural verb *are* বসবে।' },
          ],
          answer: { en: '**are**: Neither the girl nor the boys are very important for the final result.', bn: 'সঠিক উত্তর: **are**: Neither the girl nor the boys are very important for the final result.' },
        },
        {
          question: { en: 'Choose the correct verb: "The teachers as well as the principal ___ going to be examined next week." (is / are)', bn: 'সঠিক verb বাছো: "The teachers as well as the principal ___ going to be examined next week." (is / are)' },
          steps: [
            { en: 'With *as well as*, the verb agrees with the **first** subject.', bn: '*as well as* থাকলে verb **প্রথম** subject-এর সঙ্গে মেলে।' },
            { en: 'The first subject is *The teachers*, which is plural. *the principal* is only extra information.', bn: 'প্রথম subject হল *The teachers*, যা plural। *the principal* শুধু বাড়তি তথ্য।' },
          ],
          answer: { en: '**are**: The teachers as well as the principal are going to be examined next week.', bn: 'সঠিক উত্তর: **are**: The teachers as well as the principal are going to be examined next week.' },
        },
        {
          question: { en: 'Fill in the blank: "Hardly had he reached the station ___ the train left." (than / when / then)', bn: 'শূন্যস্থান পূরণ করো: "Hardly had he reached the station ___ the train left." (than / when / then)' },
          steps: [
            { en: '*Hardly* is part of a fixed pair.', bn: '*Hardly* একটি নির্দিষ্ট জোড়ার অংশ।' },
            { en: 'The pair is **hardly ... when**. (*than* goes only with *no sooner*.)', bn: 'জোড়াটি হল **hardly ... when**। (*than* বসে শুধু *no sooner*-এর সঙ্গে।)' },
          ],
          answer: { en: '**when**: Hardly had he reached the station when the train left.', bn: 'সঠিক উত্তর: **when**: Hardly had he reached the station when the train left.' },
        },
      ],
    },
  ],
  rules: [
    {
      label: { en: 'Singular subject → singular verb', bn: 'একবচন subject → একবচন verb' },
      explain: { en: 'One person or thing takes *is / was / has / plays*; more than one takes *are / were / have / play*. *The girl **sings**. The girls **sing**.*', bn: 'একজন বা একটি হলে *is / was / has / plays*; একাধিক হলে *are / were / have / play*। *The girl **sings**. The girls **sing**.*' },
    },
    {
      label: { en: 'Each / every / either / neither → singular', bn: 'Each / every / either / neither → সবসময় singular' },
      explain: { en: 'Even with *of* + plural noun after them, the verb stays singular. *Neither of the players **is** ready.*', bn: 'পরে *of* + plural noun থাকলেও verb singular থাকে। *Neither of the players **is** ready.*' },
    },
    {
      label: { en: 'Either ... or / Neither ... nor → nearer subject', bn: 'Either ... or / Neither ... nor → কাছের subject' },
      explain: { en: 'The verb agrees with the subject closest to it. *Either you or he **is** wrong. Neither he nor his friends **were** there.*', bn: 'Verb সবচেয়ে কাছের subject-এর সঙ্গে মেলে। *Either you or he **is** wrong. Neither he nor his friends **were** there.*' },
    },
    {
      label: { en: 'As well as / along with / together with → first subject', bn: 'As well as / along with / together with → প্রথম subject' },
      explain: { en: 'The words after these phrases are extra; ignore them. *The captain, together with his players, **has** arrived.*', bn: 'এই phrase-এর পরের অংশ বাড়তি; বাদ দিয়ে ভাবো। *The captain, together with his players, **has** arrived.*' },
    },
    {
      label: { en: 'The number of → singular; A number of → plural', bn: 'The number of → singular; A number of → plural (দুটো আলাদা)' },
      explain: { en: '*The number of cars **is** rising.* (one number) *A number of cars **are** parked outside.* (many cars)', bn: '*The number of cars **is** rising.* (একটি সংখ্যা) *A number of cars **are** parked outside.* (অনেক গাড়ি)' },
    },
    {
      label: { en: 'Fixed prepositions go with certain words', bn: 'কিছু শব্দের সঙ্গে নির্দিষ্ট preposition' },
      explain: { en: '*good at, famous for, addicted to, listen to, wait for, blind to, afraid of, married to, superior to, prefer A to B.* Learn them as pairs.', bn: '*good at, famous for, addicted to, listen to, wait for, blind to, afraid of, married to, superior to, prefer A to B* — এগুলো জোড়া হিসেবে মুখস্থ করো।' },
    },
    {
      label: { en: 'Paired conjunctions never change partners', bn: 'জোড়া conjunction-এর সঙ্গী বদলায় না' },
      explain: { en: '*hardly/scarcely ... when*, *no sooner ... than*, *though ...* (no *but*), *not only ... but also*, *lest ... should*.', bn: '*hardly/scarcely ... when*, *no sooner ... than*, *though ...* (*but* নয়), *not only ... but also*, *lest ... should*।' },
    },
  ],
  tips: [
    { en: 'To find the subject, cover the words after *of*, *with*, *as well as*. *The box of pencils **is** on the desk*: the subject is *box*.', bn: 'Subject খুঁজতে *of*, *with*, *as well as*-এর পরের শব্দগুলো ঢেকে দাও। *The box of pencils **is** on the desk*: subject হল *box*।' },
    { en: 'Common mistake: "good in maths". Say **good at** maths.', bn: 'সাধারণ ভুল: "good in maths"। সঠিক হল **good at** maths।' },
    { en: 'Bengali speakers often write "Though ... but". In English use only one: *Though it rained, we played.*', bn: 'বাংলার "যদিও ... তবুও" থেকে অনেকে "Though ... but" লেখে। ইংরেজিতে একটিই বসবে: *Though it rained, we played.*' },
    { en: '*Police* is always plural (*the police are*); *news* and *mathematics* are always singular (*the news is*).', bn: '*Police* সবসময় plural (*the police are*); *news* আর *mathematics* সবসময় singular (*the news is*)।' },
    { en: '*Hardly* goes with *when*; only *no sooner* goes with *than*.', bn: '*Hardly*-র সঙ্গে *when*; শুধু *no sooner*-এর সঙ্গে *than*।' },
  ],
};
