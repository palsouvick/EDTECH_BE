'use strict';

module.exports = {
  subject: 'english',
  topic: 'parts_of_speech',
  title: { en: 'Parts of Speech', bn: 'পদ-প্রকরণ (Parts of Speech)' },
  emoji: '🧩',
  intro: {
    en: 'Every word in a sentence has a job. Some words name things, some show actions, some describe, some join. These jobs are called the **parts of speech**. If you know the job of a word, you can fill blanks, spot errors and improve sentences with confidence. We meet them in every email, news headline and conversation.',
    bn: 'বাক্যের প্রতিটি শব্দের একটি নির্দিষ্ট কাজ থাকে। কোনো শব্দ নাম বলে, কোনোটি কাজ বোঝায়, কোনোটি বর্ণনা দেয়, কোনোটি জোড়ে। এই কাজগুলিকে **parts of speech** (পদ) বলে। শব্দের কাজ জানলে শূন্যস্থান পূরণ, ভুল খোঁজা ও বাক্য সংশোধন আত্মবিশ্বাসের সঙ্গে করা যায়। প্রতিটি ইমেইল, খবরের শিরোনাম ও কথাবার্তায় আমরা এগুলি দেখি।',
  },
  levels: [
    {
      level: 'basic',
      sections: [
        {
          heading: { en: 'A word has a job', bn: 'প্রতিটি শব্দের একটি কাজ আছে' },
          body: {
            en: `Read this sentence from a job interview: *"I have completed my work."*

Each word has a job:
- **I** takes the place of your name (**pronoun**)
- **have completed** shows what you did (**verb**)
- **my** tells whose work it is (**adjective**)
- **work** is the thing (**noun**)

There are **eight parts of speech**:

| Part of speech | Its job | Example |
|---|---|---|
| Noun | names a person, place or thing | *Riya, Kolkata, pen* |
| Pronoun | takes the place of a noun | *he, she, they* |
| Verb | shows an action or state | *run, is, write* |
| Adjective | describes a noun | *tall, red, five* |
| Adverb | tells how, when or where | *slowly, today* |
| Preposition | shows position or relation | *on, in, under* |
| Conjunction | joins words or sentences | *and, but, because* |
| Interjection | shows sudden feeling | *Wow! Alas!* |`,
            bn: `চাকরির ইন্টারভিউয়ের একটি বাক্য পড়ো: *"I have completed my work."*

প্রতিটি শব্দের একটি কাজ আছে:
- **I** তোমার নামের জায়গায় বসেছে (**pronoun**, সর্বনাম)
- **have completed** তুমি কী করেছ তা বলছে (**verb**, ক্রিয়া)
- **my** কার কাজ তা জানাচ্ছে (**adjective**, বিশেষণ)
- **work** জিনিসটির নাম (**noun**, বিশেষ্য)

**Parts of speech মোট আটটি**:

| Part of speech | তার কাজ | উদাহরণ |
|---|---|---|
| Noun (বিশেষ্য) | মানুষ, জায়গা বা জিনিসের নাম | *Riya, Kolkata, pen* |
| Pronoun (সর্বনাম) | noun-এর জায়গায় বসে | *he, she, they* |
| Verb (ক্রিয়া) | কাজ বা অবস্থা বোঝায় | *run, is, write* |
| Adjective (বিশেষণ) | noun-এর বর্ণনা দেয় | *tall, red, five* |
| Adverb (ক্রিয়াবিশেষণ) | কীভাবে, কখন বা কোথায় বলে | *slowly, today* |
| Preposition | অবস্থান বা সম্পর্ক বোঝায় | *on, in, under* |
| Conjunction (সংযোজক) | শব্দ বা বাক্য জোড়ে | *and, but, because* |
| Interjection | হঠাৎ অনুভূতি প্রকাশ করে | *Wow! Alas!* |`,
          },
        },
        {
          heading: { en: 'Noun and pronoun', bn: 'Noun ও pronoun' },
          body: {
            en: `A **noun** is a naming word. Look at: *"Rahul bought a new phone in Kolkata."*

- **Proper noun**: the name of one particular person or place, with a capital letter: *Rahul, Kolkata, Monday*
- **Common noun**: a general name: *phone, city, boy*
- **Abstract noun**: a quality or feeling you cannot touch: *honesty, happiness*
- **Collective noun**: a group seen as one: *team, class, family*
- **Material noun**: what things are made of: *gold, wood, cotton*

A **pronoun** saves us from repeating the noun: *"Riya is late. **She** missed the bus."*

- **Personal**: *I, you, he, she, it, we, they*
- **Possessive**: *mine, yours, his, hers, ours, theirs* (they stand alone: *This pen is **mine**.*)
- **Reflexive**: *myself, herself, themselves* (the doer and receiver are the same: *She hurt **herself**.*)

⚠ Trap: **my** (*my pen*) needs a noun after it, but **mine** stands alone (*the pen is mine*).`,
            bn: `**Noun** হল নাম-শব্দ। দেখো: *"Rahul bought a new phone in Kolkata."*

- **Proper noun**: নির্দিষ্ট মানুষ বা জায়গার নাম, বড় হাতের অক্ষর দিয়ে শুরু: *Rahul, Kolkata, Monday*
- **Common noun**: সাধারণ নাম: *phone, city, boy*
- **Abstract noun**: যে গুণ বা অনুভূতি ছোঁয়া যায় না: *honesty, happiness*
- **Collective noun**: একটি দলকে একক ধরে: *team, class, family*
- **Material noun**: যা দিয়ে জিনিস তৈরি হয়: *gold, wood, cotton*

**Pronoun** noun বারবার বলা থেকে বাঁচায়: *"Riya is late. **She** missed the bus."*

- **Personal**: *I, you, he, she, it, we, they*
- **Possessive**: *mine, yours, his, hers, ours, theirs* (এরা একা বসে: *This pen is **mine**.*)
- **Reflexive**: *myself, herself, themselves* (যে করে আর যে ফল পায় একই জন: *She hurt **herself**.*)

⚠ ফাঁদ: **my**-এর পরে noun লাগে (*my pen*), কিন্তু **mine** একা বসে (*the pen is mine*)।`,
          },
        },
        {
          heading: { en: 'Verb, adjective and adverb', bn: 'Verb, adjective ও adverb' },
          body: {
            en: `*"The old man walks slowly."*

- **walks** is a **verb**: it shows the action.
- **old** is an **adjective**: it describes the noun *man*.
- **slowly** is an **adverb**: it tells *how* he walks.

**Verbs** can be **main** (the real action: *write, eat*) or **helping** (they help the main verb: *is, has, will, can*). In *"She **is reading** a book"*, *reading* is the main verb and *is* is the helping verb.

**Adjectives** answer *what kind? how many? which one?*: *a **tall** boy, **five** mangoes, **this** book*.
**Adverbs** answer *how? when? where?*: *She sings **beautifully**.* Many adverbs end in **-ly**.

⚠ Trap: *She sings **beautiful*** is wrong. A verb is described by an adverb: *beautifully*.`,
            bn: `*"The old man walks slowly."*

- **walks** একটি **verb**: কাজ বোঝায়।
- **old** একটি **adjective**: noun *man*-এর বর্ণনা দিচ্ছে।
- **slowly** একটি **adverb**: সে *কীভাবে* হাঁটে তা বলছে।

**Verb** দুই রকম: **main** (আসল কাজ: *write, eat*) আর **helping** (main verb-কে সাহায্য করে: *is, has, will, can*)। *"She **is reading** a book"*-এ *reading* main verb, *is* helping verb।

**Adjective** উত্তর দেয় *কেমন? কয়টি? কোনটি?*: *a **tall** boy, **five** mangoes, **this** book*।
**Adverb** উত্তর দেয় *কীভাবে? কখন? কোথায়?*: *She sings **beautifully**.* অনেক adverb **-ly** দিয়ে শেষ হয়।

⚠ ফাঁদ: *She sings **beautiful*** ভুল। Verb-কে বর্ণনা করে adverb: *beautifully*।`,
          },
        },
        {
          heading: { en: 'Preposition, conjunction, interjection', bn: 'Preposition, conjunction ও interjection' },
          body: {
            en: `*"The book is **on** the table **and** the pen is **under** it. **Oh!** I forgot my bag."*

- **Preposition** (*on, in, at, under, to, from, with*): comes before a noun or pronoun and shows position, time or direction. *at 10 a.m.*, *in 2001*, *from Howrah*
- **Conjunction** (*and, but, or, because, although*): joins words or sentences. *I was tired **but** happy.*
- **Interjection** (*Oh! Wow! Alas! Hurray!*): a sudden feeling, usually followed by **!**

In exams, these small words are tested most in **fill in the blanks** and **error spotting**.`,
            bn: `*"The book is **on** the table **and** the pen is **under** it. **Oh!** I forgot my bag."*

- **Preposition** (*on, in, at, under, to, from, with*): noun বা pronoun-এর আগে বসে অবস্থান, সময় বা দিক বোঝায়। *at 10 a.m.*, *in 2001*, *from Howrah*
- **Conjunction** (*and, but, or, because, although*): শব্দ বা বাক্য জোড়ে। *I was tired **but** happy.*
- **Interjection** (*Oh! Wow! Alas! Hurray!*): হঠাৎ অনুভূতি, সাধারণত পরে **!** বসে।

পরীক্ষায় এই ছোট শব্দগুলি **fill in the blanks** ও **error spotting**-এ সবচেয়ে বেশি আসে।`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Name the part of speech of the word in capitals: "Mina PLAYS the harmonium every evening."', bn: 'বড় হাতের শব্দটি কোন part of speech? "Mina PLAYS the harmonium every evening."' },
          steps: [
            { en: 'Ask: does the word show an action? Yes, Mina does something: she plays.', bn: 'প্রশ্ন করো: শব্দটি কি কাজ বোঝায়? হ্যাঁ, মিনা কিছু করছে: বাজাচ্ছে।' },
            { en: 'Trap: some students call it a noun because "plays" can also be a noun (*a play*). Here it has the subject *Mina*, so it is a verb.', bn: 'ফাঁদ: কেউ কেউ noun ভাবে, কারণ "play" noun-ও হয় (*a play*)। এখানে কর্তা *Mina* আছে, তাই এটি verb।' },
          ],
          answer: { en: '**Verb**', bn: 'উত্তর: **Verb** (ক্রিয়া)' },
        },
        {
          question: { en: 'Fill in the blank: "She sings ___." (beautiful / beautifully)', bn: 'শূন্যস্থান পূরণ করো: "She sings ___." (beautiful / beautifully)' },
          steps: [
            { en: 'The missing word describes the verb "sings" (how does she sing?).', bn: 'ফাঁকা শব্দটি verb "sings"-কে বর্ণনা করবে (সে কীভাবে গায়?)।' },
            { en: 'A verb is described by an adverb, not an adjective. Trap: "beautiful" is an adjective and only describes nouns.', bn: 'Verb-কে বর্ণনা করে adverb, adjective নয়। ফাঁদ: "beautiful" adjective, শুধু noun-কে বর্ণনা করে।' },
          ],
          answer: { en: '**beautifully**: She sings beautifully.', bn: 'সঠিক উত্তর: **beautifully**: She sings beautifully.' },
        },
        {
          question: { en: 'Fill in the blank: "This pen is ___, not yours." (my / mine)', bn: 'শূন্যস্থান পূরণ করো: "This pen is ___, not yours." (my / mine)' },
          steps: [
            { en: 'Nothing follows the blank, so the word must stand alone.', bn: 'ফাঁকার পরে কিছু নেই, তাই শব্দটিকে একা বসতে হবে।' },
            { en: 'Trap: "my" always needs a noun after it (*my pen*). The standalone form is "mine".', bn: 'ফাঁদ: "my"-এর পরে সবসময় noun লাগে (*my pen*)। একা বসার রূপ "mine"।' },
          ],
          answer: { en: '**mine**: This pen is mine, not yours.', bn: 'সঠিক উত্তর: **mine**: This pen is mine, not yours.' },
        },
        {
          question: { en: 'In "She is reading a book", which word is the helping verb?', bn: '"She is reading a book" বাক্যে helping verb কোনটি?' },
          steps: [
            { en: 'Find the real action: "reading". That is the main verb.', bn: 'আসল কাজটি খোঁজো: "reading"। এটি main verb।' },
            { en: 'The word that helps it (here to show "now") is "is". Trap: do not pick "reading" just because it is the longer word.', bn: 'যে শব্দ এটিকে সাহায্য করছে (এখানে "এখন" বোঝাতে) সেটি "is"। ফাঁদ: লম্বা শব্দ বলে "reading" বেছো না।' },
          ],
          answer: { en: '**is**', bn: 'উত্তর: **is**' },
        },
      ],
    },
    {
      level: 'intermediate',
      sections: [
        {
          heading: { en: 'Case of pronouns: I or me, who or whom', bn: 'Pronoun-এর case: I না me, who না whom' },
          body: {
            en: `Many pronouns change their form depending on their job in the sentence.

| Subject (does the action) | Object (receives it, or follows a preposition) |
|---|---|
| I | me |
| he | him |
| she | her |
| we | us |
| they | them |
| who | whom |

*"**Raju and I** went to the cinema."* (Raju and I are the doers)
*"This gift is for **you and me**."* (after the preposition *for*)

**Quick test:** remove the other person. *"Raju and ___ went"* → *"**I** went"* (not *me went*). *"for you and ___"* → *"for **me**"* (not *for I*).

**Who / whom:** use *who* for the doer, *whom* for the receiver or after a preposition. Test with *he / him*: *"To ___ did you give it?"* → *to **him*** → **whom**. *"The boy ___ won"* → *he won* → **who**. **Whose** shows belonging: *the woman **whose** bag was stolen*.`,
            bn: `অনেক pronoun বাক্যে কাজ অনুযায়ী রূপ বদলায়।

| Subject (কাজ করে) | Object (কাজের ফল পায়, বা preposition-এর পরে বসে) |
|---|---|
| I | me |
| he | him |
| she | her |
| we | us |
| they | them |
| who | whom |

*"**Raju and I** went to the cinema."* (Raju ও I কাজ করেছে)
*"This gift is for **you and me**."* (preposition *for*-এর পরে)

**সহজ পরীক্ষা:** অন্য ব্যক্তিকে বাদ দাও। *"Raju and ___ went"* → *"**I** went"* (*me went* নয়)। *"for you and ___"* → *"for **me**"* (*for I* নয়)।

**Who / whom:** যে কাজ করে তার জন্য *who*, যে ফল পায় বা preposition-এর পরে তার জন্য *whom*। *he / him* দিয়ে পরীক্ষা করো: *"To ___ did you give it?"* → *to **him*** → **whom**। *"The boy ___ won"* → *he won* → **who**। **Whose** মালিকানা বোঝায়: *the woman **whose** bag was stolen*।`,
          },
        },
        {
          heading: { en: 'Transitive and intransitive verbs', bn: 'Transitive ও intransitive verb' },
          body: {
            en: `Some verbs need an **object** (the thing receiving the action); others do not.

- **Transitive**: *Ravi **kicked** the ball.* Ask "kicked what?" → *the ball* (object).
- **Intransitive**: *The baby **sleeps**.* Ask "sleeps what?" → no answer, no object.

Many verbs can be both: *She **sings*** (intransitive) / *She **sings** a song* (transitive).

**Helping verbs** include **be** (*is, am, are, was, were, been*), **have** (*has, had*), **do** (*does, did*) and the **modals** (*can, could, will, would, shall, should, may, might, must*). A modal is followed by the plain verb: *She **can write***. A sentence may have more than one helping verb: *She **has been** working here.* (*has* and *been* help *working*)

A **linking verb** joins the subject to a quality or name: *She **became** a doctor. The soup **smells** delicious.* After a linking verb we use an **adjective**, not an adverb.`,
            bn: `কিছু verb-এর **object** (কাজের ফল পায় যে জিনিস) লাগে; কিছুর লাগে না।

- **Transitive**: *Ravi **kicked** the ball.* প্রশ্ন "kicked what?" → *the ball* (object)।
- **Intransitive**: *The baby **sleeps**.* প্রশ্ন "sleeps what?" → উত্তর নেই, object নেই।

অনেক verb দুইভাবেই বসে: *She **sings*** (intransitive) / *She **sings** a song* (transitive)।

**Helping verb**-এর মধ্যে আছে **be** (*is, am, are, was, were, been*), **have** (*has, had*), **do** (*does, did*) এবং **modal** (*can, could, will, would, shall, should, may, might, must*)। Modal-এর পরে verb-এর আসল রূপ বসে: *She **can write***। একটি বাক্যে একাধিক helping verb থাকতে পারে: *She **has been** working here.* (*has* ও *been* দুটিই *working*-কে সাহায্য করছে)

**Linking verb** কর্তাকে কোনো গুণ বা নামের সঙ্গে জোড়ে: *She **became** a doctor. The soup **smells** delicious.* Linking verb-এর পরে **adjective** বসে, adverb নয়।`,
          },
        },
        {
          heading: { en: 'Kinds of adjectives and their order', bn: 'Adjective-এর প্রকার ও ক্রম' },
          body: {
            en: `*"She bought a **beautiful red silk** sari and **five** bangles."*

- **Quality**: *beautiful, red, honest*
- **Number / quantity**: *five, some, many, little*
- **Demonstrative**: *this, that, these, those* before a noun: *that bag*
- **Possessive**: *my, your, his, her, its, our, their*: *my phone*
- **Interrogative**: *which, what, whose*: *Whose umbrella is this?*

When several adjectives come together, the usual order is:

**opinion → size → age → colour → origin → material → noun**

✓ *a **lovely small old wooden** box*
✓ *a **lovely red silk** sari*
✗ *a silk red lovely sari*

⚠ **its** (belonging) has no apostrophe; **it's** means *it is*. **Whose** (belonging) is not **who's** (*who is*).`,
            bn: `*"She bought a **beautiful red silk** sari and **five** bangles."*

- **Quality (গুণ)**: *beautiful, red, honest*
- **Number / quantity (সংখ্যা/পরিমাণ)**: *five, some, many, little*
- **Demonstrative (নির্দেশক)**: noun-এর আগে *this, that, these, those*: *that bag*
- **Possessive (অধিকারবাচক)**: *my, your, his, her, its, our, their*: *my phone*
- **Interrogative (প্রশ্নবাচক)**: *which, what, whose*: *Whose umbrella is this?*

একসঙ্গে অনেক adjective থাকলে সাধারণ ক্রম:

**মতামত → আকার → বয়স → রং → দেশ → উপাদান → noun**

✓ *a **lovely small old wooden** box*
✓ *a **lovely red silk** sari*
✗ *a silk red lovely sari*

⚠ **its** (মালিকানা)-তে apostrophe নেই; **it's** মানে *it is*। **Whose** (মালিকানা) আর **who's** (*who is*) এক নয়।`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Fill in the blank: "The teacher gave Raju and ___ some books." (I / me)', bn: 'শূন্যস্থান পূরণ করো: "The teacher gave Raju and ___ some books." (I / me)' },
          steps: [
            { en: 'Remove "Raju and": "The teacher gave ___ some books."', bn: '"Raju and" বাদ দাও: "The teacher gave ___ some books."' },
            { en: 'Nobody says "gave I". The pair is the object of "gave" (the receiver), so we use the object form. Trap: "Raju and I" sounds polite, but it is wrong here.', bn: '"gave I" কেউ বলে না। এই জুটি "gave"-এর object (যে পায়), তাই object রূপ বসবে। ফাঁদ: "Raju and I" ভদ্র শোনায়, কিন্তু এখানে ভুল।' },
          ],
          answer: { en: '**me**: The teacher gave Raju and me some books.', bn: 'সঠিক উত্তর: **me**: The teacher gave Raju and me some books.' },
        },
        {
          question: { en: 'Fill in the blank: "To ___ did you give the letter?" (who / whom)', bn: 'শূন্যস্থান পূরণ করো: "To ___ did you give the letter?" (who / whom)' },
          steps: [
            { en: 'The blank follows the preposition "to".', bn: 'ফাঁকাটি preposition "to"-এর পরে।' },
            { en: 'Try the answer "to him" (not "to he"). "Him" matches "whom". Trap: in speech people say "who", but exams expect "whom" after a preposition.', bn: '"to him" বসে ("to he" নয়)। "Him"-এর সঙ্গে মেলে "whom"। ফাঁদ: কথায় লোকে "who" বলে, কিন্তু পরীক্ষায় preposition-এর পরে "whom" চাই।' },
          ],
          answer: { en: '**whom**', bn: 'সঠিক উত্তর: **whom**' },
        },
        {
          question: { en: 'Is "kicked" transitive or intransitive in "Ravi kicked the ball"?', bn: '"Ravi kicked the ball" বাক্যে "kicked" transitive না intransitive?' },
          steps: [
            { en: 'Ask the verb: "kicked what?"', bn: 'Verb-কে প্রশ্ন করো: "kicked what?"' },
            { en: 'The answer is "the ball", so there is an object. Trap: a verb is not transitive just because the sentence is long; look for the object.', bn: 'উত্তর "the ball", অর্থাৎ object আছে। ফাঁদ: বাক্য লম্বা হলেই verb transitive হয় না; object খোঁজো।' },
          ],
          answer: { en: '**Transitive**', bn: 'উত্তর: **Transitive**' },
        },
        {
          question: { en: 'Choose the correct word: "The soup smells ___." (delicious / deliciously)', bn: 'সঠিক শব্দ বাছো: "The soup smells ___." (delicious / deliciously)' },
          steps: [
            { en: 'Here "smells" is a linking verb: it says what the soup is like, not how it does an action.', bn: 'এখানে "smells" linking verb: এটি স্যুপ কেমন তা বলছে, স্যুপ কীভাবে কাজ করছে তা নয়।' },
            { en: 'After a linking verb we use an adjective. Trap: "-ly" looks more correct but is wrong here.', bn: 'Linking verb-এর পরে adjective বসে। ফাঁদ: "-ly" যুক্ত শব্দ বেশি ঠিক মনে হয়, কিন্তু এখানে ভুল।' },
          ],
          answer: { en: '**delicious**', bn: 'সঠিক উত্তর: **delicious**' },
        },
      ],
    },
    {
      level: 'advanced',
      sections: [
        {
          heading: { en: 'One word, many jobs', bn: 'একটি শব্দ, অনেক কাজ' },
          body: {
            en: `The part of speech is decided by the **job in this sentence**, not by the word itself.

| Word | Noun | Verb | Adjective | Adverb |
|---|---|---|---|---|
| **fast** | | *Many people **fast** on Ekadashi.* | *He is a **fast** bowler.* | *He runs **fast**.* |
| **light** | *Switch on the **light**.* | *Please **light** the lamp.* | *The bag is **light**.* | |
| **water** | *Drink clean **water**.* | *Please **water** the plants.* | | |
| **round** | *He lost in the second **round**.* | | *a **round** table* | |
| **well** | *They dug a **well**.* | | *I am **well**.* | *She did it **well**.* |

**Method:** (1) find the word, (2) ask what job it does here: names something? shows action? describes a noun? describes a verb? (3) look at the neighbours: *a/the* before it → noun; *to/will/can* before it → verb; before a noun → adjective.`,
            bn: `কোনো শব্দ কোন part of speech তা ঠিক হয় **এই বাক্যে তার কাজ** দেখে, শব্দ দেখে নয়।

| শব্দ | Noun | Verb | Adjective | Adverb |
|---|---|---|---|---|
| **fast** | | *Many people **fast** on Ekadashi.* | *He is a **fast** bowler.* | *He runs **fast**.* |
| **light** | *Switch on the **light**.* | *Please **light** the lamp.* | *The bag is **light**.* | |
| **water** | *Drink clean **water**.* | *Please **water** the plants.* | | |
| **round** | *He lost in the second **round**.* | | *a **round** table* | |
| **well** | *They dug a **well**.* | | *I am **well**.* | *She did it **well**.* |

**পদ্ধতি:** (১) শব্দটি খোঁজো, (২) জিজ্ঞাসা করো এই বাক্যে এর কাজ কী: কিছুর নাম? কাজ? noun-এর বর্ণনা? verb-এর বর্ণনা? (৩) প্রতিবেশী শব্দ দেখো: আগে *a/the* থাকলে noun; আগে *to/will/can* থাকলে verb; noun-এর আগে থাকলে adjective।`,
          },
        },
        {
          heading: { en: 'Preposition or conjunction? Before, since, like', bn: 'Preposition না conjunction? Before, since, like' },
          body: {
            en: `Some words are **prepositions** when a **noun** follows and **conjunctions** when a full **clause** (subject + verb) follows.

- ***Before** lunch* → preposition. ***Before** you eat* → conjunction. *I have seen it **before*** (alone) → adverb.
- *I have lived here **since** 2015* → preposition. *…**since** I was born* → conjunction.
- *She sings **like** a bird* → preposition. *I **like** mangoes* → verb.
- *He walked **past** the shop* → preposition. *In the **past*** → noun. *past glory* → adjective.
- *I know **that** she is honest* → conjunction. ***That** is my bag* → pronoun. ***That** bag is mine* → adjective.
- *He is old **enough** to vote* → adverb (it follows an adjective).

Easy trap words: **hard / hardly** (*He worked **hard**.* ≠ *He **hardly** worked.*), **late / lately**, **beside** (next to) / **besides** (in addition to).`,
            bn: `কিছু শব্দ **noun** পরে থাকলে **preposition**, আর পূর্ণ **clause** (কর্তা + verb) পরে থাকলে **conjunction**।

- ***Before** lunch* → preposition। ***Before** you eat* → conjunction। *I have seen it **before*** (একা) → adverb।
- *I have lived here **since** 2015* → preposition। *…**since** I was born* → conjunction।
- *She sings **like** a bird* → preposition। *I **like** mangoes* → verb।
- *He walked **past** the shop* → preposition। *In the **past*** → noun। *past glory* → adjective।
- *I know **that** she is honest* → conjunction। ***That** is my bag* → pronoun। ***That** bag is mine* → adjective।
- *He is old **enough** to vote* → adverb (adjective-এর পরে বসেছে)।

সহজ ফাঁদের শব্দ: **hard / hardly** (*He worked **hard**.* ≠ *He **hardly** worked.*), **late / lately**, **beside** (পাশে) / **besides** (এছাড়াও)।`,
          },
        },
        {
          heading: { en: 'Exam traps in parts of speech', bn: 'পরীক্ষায় পদ-প্রকরণের ফাঁদ' },
          body: {
            en: `These are tested again and again in SSC, WBPSC and Railway exams, in **error spotting**, **fill in the blanks** and **sentence improvement**.

1. **Between you and me**, not *between you and I* (object after a preposition).
2. **between** is for two, **among** for more than two: *shared **among** five finalists*.
3. **Uncountable nouns** take no plural and no *a/an*: *advice, furniture, information, luggage, news*. ✓ *some good **advice*** ✗ *advices*. *All the furniture **is** new.*
4. **Police** and **people** take a plural verb: *The police **are** searching.*
5. **a friend of mine** (not *of me*).
6. **senior / junior / superior to** (not *than*): *He is senior **to** me.* **prefer … to**: *I prefer tea **to** coffee.*
7. **since** goes with a point in time (*since Monday*), **for** with a period (*for two hours*).
8. **married to** a doctor, **afraid of** snakes.`,
            bn: `SSC, WBPSC ও রেলের পরীক্ষায় **error spotting**, **fill in the blanks** ও **sentence improvement**-এ এগুলি বারবার আসে।

1. **Between you and me**, *between you and I* নয় (preposition-এর পরে object রূপ)।
2. **between** দুইয়ের জন্য, **among** দুইয়ের বেশির জন্য: *shared **among** five finalists*।
3. **অগণনীয় noun**-এর plural হয় না, *a/an*-ও বসে না: *advice, furniture, information, luggage, news*। ✓ *some good **advice*** ✗ *advices*। *All the furniture **is** new.*
4. **Police** ও **people**-এর সঙ্গে plural verb: *The police **are** searching.*
5. **a friend of mine** (*of me* নয়)।
6. **senior / junior / superior to** (*than* নয়): *He is senior **to** me.* **prefer … to**: *I prefer tea **to** coffee.*
7. **since** সময়ের একটি বিন্দুর সঙ্গে (*since Monday*), **for** সময়ের পরিমাণের সঙ্গে (*for two hours*)।
8. **married to** a doctor, **afraid of** snakes।`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Name the part of speech: "I have lived here SINCE I was born."', bn: 'Part of speech বলো: "I have lived here SINCE I was born."' },
          steps: [
            { en: 'Look at what follows "since": "I was born" is a full clause (subject + verb).', bn: '"since"-এর পরে কী আছে দেখো: "I was born" একটি পূর্ণ clause (কর্তা + verb)।' },
            { en: 'A word that joins a clause to the main sentence is a conjunction. Trap: in "since 2015" the same word is a preposition.', bn: 'যে শব্দ clause-কে মূল বাক্যের সঙ্গে জোড়ে সেটি conjunction। ফাঁদ: "since 2015"-তে একই শব্দ preposition।' },
          ],
          answer: { en: '**Conjunction**', bn: 'উত্তর: **Conjunction**' },
        },
        {
          question: { en: 'Find the part with the error: "Between you and I, | the plan | is very weak. | No error"', bn: 'কোন অংশে ভুল খোঁজো: "Between you and I, | the plan | is very weak. | No error"' },
          steps: [
            { en: '"Between" is a preposition, so the pronouns after it must be in the object form.', bn: '"Between" একটি preposition, তাই এর পরের pronoun object রূপে হবে।' },
            { en: 'Take away "you and": "between I" is clearly wrong; it must be "between me". Trap: "you and I" sounds formal, so students think it is correct.', bn: '"you and" বাদ দাও: "between I" স্পষ্টতই ভুল; হবে "between me"। ফাঁদ: "you and I" ভদ্র শোনায়, তাই অনেকে ঠিক ভাবে।' },
          ],
          answer: { en: '**"Between you and I,"** → "Between you and me,"', bn: 'উত্তর: **"Between you and I,"** → "Between you and me,"' },
        },
        {
          question: { en: 'Fill in the blank: "The prize was shared ___ the five finalists." (between / among)', bn: 'শূন্যস্থান পূরণ করো: "The prize was shared ___ the five finalists." (between / among)' },
          steps: [
            { en: 'Count the people: five.', bn: 'মানুষ গোনো: পাঁচজন।' },
            { en: '"Between" is for two; for more than two we use "among". Trap: "between" is more common in daily speech, but it is not correct here.', bn: '"Between" দুইয়ের জন্য; দুইয়ের বেশি হলে "among"। ফাঁদ: কথায় "between" বেশি শোনা যায়, কিন্তু এখানে ঠিক নয়।' },
          ],
          answer: { en: '**among**', bn: 'সঠিক উত্তর: **among**' },
        },
        {
          question: { en: 'Choose the correct sentence: "She gave me some good advice." or "She gave me some good advices."', bn: 'সঠিক বাক্য বাছো: "She gave me some good advice." না "She gave me some good advices."' },
          steps: [
            { en: '"Advice" is an uncountable noun. It has no plural form.', bn: '"Advice" অগণনীয় noun। এর plural হয় না।' },
            { en: 'To count it we say "a piece of advice". Trap: "advise" (verb) and "advice" (noun) are different words.', bn: 'গুনতে হলে বলি "a piece of advice"। ফাঁদ: "advise" (verb) আর "advice" (noun) আলাদা শব্দ।' },
          ],
          answer: { en: '**She gave me some good advice.**', bn: 'উত্তর: **She gave me some good advice.**' },
        },
      ],
    },
  ],
  rules: [
    { label: { en: 'Job decides the part of speech', bn: 'কাজই পদ ঠিক করে' }, explain: { en: 'The same word can be a noun, verb, adjective or adverb. Look at its job in the sentence (fast, light, water, round).', bn: 'একই শব্দ noun, verb, adjective বা adverb হতে পারে। বাক্যে তার কাজ দেখো (fast, light, water, round)।' } },
    { label: { en: 'Adjective describes a noun; adverb describes a verb', bn: 'Adjective noun-কে, adverb verb-কে বর্ণনা করে' }, explain: { en: 'A tall boy (adjective), She sings beautifully (adverb). After linking verbs (look, feel, smell, become) use an adjective.', bn: 'A tall boy (adjective), She sings beautifully (adverb)। Linking verb (look, feel, smell, become)-এর পরে adjective বসে।' } },
    { label: { en: 'Subject form or object form', bn: 'Subject রূপ না object রূপ' }, explain: { en: 'I, he, she, we, they, who do the action. Me, him, her, us, them, whom receive it or follow a preposition. Remove the other person to test.', bn: 'I, he, she, we, they, who কাজ করে। Me, him, her, us, them, whom কাজের ফল পায় বা preposition-এর পরে বসে। অন্য জনকে বাদ দিয়ে পরীক্ষা করো।' } },
    { label: { en: 'my / mine, its / it\'s, whose / who\'s', bn: 'my ও mine, its ও it\'s, whose ও who\'s-এর পার্থক্য' }, explain: { en: 'My needs a noun; mine stands alone. Its shows belonging; it\'s = it is. Whose shows belonging; who\'s = who is.', bn: 'My-এর পরে noun লাগে; mine একা বসে। Its মালিকানা; it\'s = it is। Whose মালিকানা; who\'s = who is।' } },
    { label: { en: 'Order of adjectives', bn: 'Adjective-এর ক্রম' }, explain: { en: 'Opinion, size, age, colour, origin, material, then the noun: a lovely small old wooden box.', bn: 'মতামত, আকার, বয়স, রং, দেশ, উপাদান, তারপর noun: a lovely small old wooden box।' } },
    { label: { en: 'Helping verbs come before the main verb', bn: 'Helping verb main verb-এর আগে বসে' }, explain: { en: 'Be, have, do and the modals (can, will, should...) help the main verb: She has been working. A modal is followed by the plain verb.', bn: 'Be, have, do ও modal (can, will, should...) main verb-কে সাহায্য করে: She has been working। Modal-এর পরে verb-এর আসল রূপ বসে।' } },
    { label: { en: 'Preposition takes a noun, conjunction takes a clause', bn: 'Preposition-এর পরে noun, conjunction-এর পরে clause' }, explain: { en: 'Before lunch, since 2015 (preposition). Before you eat, since I was born (conjunction).', bn: 'Before lunch, since 2015 হল preposition। Before you eat, since I was born হল conjunction।' } },
    { label: { en: 'Uncountable nouns', bn: 'অগণনীয় noun' }, explain: { en: 'Advice, furniture, information, luggage and news have no plural and take a singular verb.', bn: 'Advice, furniture, information, luggage ও news-এর plural হয় না এবং singular verb বসে।' } },
  ],
  tips: [
    { en: 'To name a word\'s part of speech, ask: "What is this word doing here?" Do not judge the word alone.', bn: 'শব্দের part of speech বলতে জিজ্ঞাসা করো: "এখানে শব্দটি কী কাজ করছে?" শব্দটিকে একা বিচার করো না।' },
    { en: 'In fill in the blanks, first decide which part of speech the blank needs (noun? adverb? preposition?), then choose.', bn: 'Fill in the blanks-এ আগে ঠিক করো ফাঁকায় কোন part of speech লাগবে (noun? adverb? preposition?), তারপর বাছো।' },
    { en: 'Common mistake: "She sings beautiful." A verb needs an adverb (beautifully).', bn: 'সাধারণ ভুল: "She sings beautiful." Verb-এর জন্য adverb লাগে (beautifully)।' },
    { en: 'Common mistake: "Between you and I", "Raju and me went". Drop the other person and test the pronoun alone.', bn: 'সাধারণ ভুল: "Between you and I", "Raju and me went"। অন্য জনকে বাদ দিয়ে pronoun একা পরীক্ষা করো।' },
    { en: 'Learn the plural of irregular nouns: child - children, woman - women, man - men.', bn: 'অনিয়মিত noun-এর plural শেখো: child - children, woman - women, man - men।' },
    { en: 'An "-ly" ending does not always mean an adverb: friendly and lovely are adjectives, and hard / fast / late are adverbs without -ly.', bn: '"-ly" থাকলেই adverb নয়: friendly ও lovely adjective, আর hard / fast / late -ly ছাড়াই adverb।' },
    { en: 'In error spotting, check pronoun case, preposition pairs (senior to, prefer to, married to) and uncountable nouns first; they are the favourite traps.', bn: 'Error spotting-এ আগে pronoun-এর case, preposition-এর জোড় (senior to, prefer to, married to) ও অগণনীয় noun দেখো; এগুলিই প্রিয় ফাঁদ।' },
  ],
};
