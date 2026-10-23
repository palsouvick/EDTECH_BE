'use strict';

module.exports = {
  subject: 'english',
  topic: 'sentence_improvement',
  title: { en: 'Sentence Improvement', bn: 'বাক্য সংশোধন' },
  emoji: '✏️',
  intro: {
    en: 'In sentence improvement, one part of a sentence is in **bold**. You choose the option that makes the sentence correct, or "No improvement" if it is already right. It teaches you not just to find a mistake but to fix it.',
    bn: 'Sentence improvement-এ বাক্যের একটি অংশ **bold** করা থাকে। যে option বসালে বাক্যটি সঠিক হয় সেটি বাছতে হয়, আর বাক্যটি আগে থেকেই ঠিক থাকলে "No improvement"। এতে শুধু ভুল ধরা নয়, ভুল ঠিক করাও শেখা হয়।',
  },
  levels: [
    {
      level: 'basic',
      sections: [
        {
          heading: { en: 'How to solve it', bn: 'কীভাবে সমাধান করবে' },
          body: {
            en: `1. Read the full sentence and ask: does the bold part sound wrong?
2. Put each option in place of the bold part and read the sentence again.
3. Choose the option that is **grammatically correct** and keeps the **same meaning**.
4. If the bold part is already correct, choose **"No improvement"**. Do not be afraid of this option: it is right quite often.`,
            bn: `1. পুরো বাক্যটি পড়ো আর ভাবো: bold অংশটি কি ভুল লাগছে?
2. প্রতিটি option bold অংশের জায়গায় বসিয়ে বাক্যটি আবার পড়ো।
3. যে option **ব্যাকরণগতভাবে সঠিক** আর **একই অর্থ** রাখে সেটি বাছো।
4. Bold অংশ আগে থেকেই সঠিক হলে **"No improvement"** বাছো। এই option-কে ভয় পেয়ো না: প্রায়ই এটাই সঠিক উত্তর।`,
          },
        },
        {
          heading: { en: 'Verb forms after did / does / do', bn: 'did / does / do-এর পরে verb-এর রূপ' },
          body: {
            en: `A **verb** is an action word (*go, eat, play*). It has three main forms:
*go – went – gone*, *eat – ate – eaten*, *write – wrote – written*.

After **did, does, do** (and after *can, will, should, must*), always use the **base form** (the first form):

✓ She **did not go** to school. ✗ She did not went to school.
✓ **Does** he **play** cricket? ✗ Does he plays cricket?
✓ You **must finish** it. ✗ You must finished it.`,
            bn: `**Verb** (ক্রিয়া) হল কাজের শব্দ (*go, eat, play*)। এর তিনটি প্রধান রূপ:
*go – went – gone*, *eat – ate – eaten*, *write – wrote – written*।

**did, does, do**-এর পরে (আর *can, will, should, must*-এর পরেও) সবসময় **base form** (প্রথম রূপ) বসে:

✓ She **did not go** to school. ✗ She did not went to school.
✓ **Does** he **play** cricket? ✗ Does he plays cricket?
✓ You **must finish** it. ✗ You must finished it.`,
          },
        },
        {
          heading: { en: 'The right preposition', bn: 'সঠিক preposition' },
          body: {
            en: `A **preposition** is a small linking word like *in, on, at, to, of*. Many words have a fixed one:

✓ good **at** maths ✗ good in maths
✓ afraid **of** dogs ✗ afraid from dogs
✓ He **lacks** confidence. ✗ He lacks of confidence. (*lack* as a verb needs no *of*)
✓ He has a **lack of** confidence. (*lack* as a noun takes *of*)`,
            bn: `**Preposition** হল *in, on, at, to, of*-এর মতো ছোট সংযোগ শব্দ। অনেক শব্দের নির্দিষ্ট preposition থাকে:

✓ good **at** maths ✗ good in maths
✓ afraid **of** dogs ✗ afraid from dogs
✓ He **lacks** confidence. ✗ He lacks of confidence. (*lack* verb হলে *of* লাগে না)
✓ He has a **lack of** confidence. (*lack* noun হলে *of* বসে)`,
          },
        },
      ],
      examples: [
        {
          question: { en: '"She **did not went** to school today." Options: has not went / did not go / not went / No improvement', bn: 'বোল্ড অংশের জায়গায় সবচেয়ে ভালো বিকল্প বাছো: "She **did not went** to school today." Options: has not went / did not go / not went / No improvement' },
          steps: [
            { en: 'After *did*, the verb must be in its base form.', bn: '*did*-এর পরে verb base form-এ থাকবে।' },
            { en: 'The base form of *went* is *go*.', bn: '*went*-এর base form হল *go*।' },
            { en: '*has not went* is also wrong; after *has* we need *gone*.', bn: '*has not went*-ও ভুল; *has*-এর পরে *gone* লাগে।' },
          ],
          answer: { en: '**did not go**: She did not go to school today.', bn: 'সঠিক উত্তর: **did not go**: She did not go to school today.' },
        },
        {
          question: { en: '"He is good **in** mathematics." Options: with / at / on / No improvement', bn: 'বোল্ড অংশের জায়গায় সবচেয়ে ভালো বিকল্প বাছো: "He is good **in** mathematics." Options: with / at / on / No improvement' },
          steps: [
            { en: '*Good* (meaning skilled) takes the fixed preposition *at*.', bn: '*Good* (দক্ষ অর্থে)-এর নির্দিষ্ট preposition হল *at*।' },
            { en: 'So *in* must be replaced by *at*.', bn: 'তাই *in*-এর জায়গায় *at* বসবে।' },
          ],
          answer: { en: '**at**: He is good at mathematics.', bn: 'সঠিক উত্তর: **at**: He is good at mathematics.' },
        },
      ],
    },
    {
      level: 'intermediate',
      sections: [
        {
          heading: { en: 'Choosing the right tense', bn: 'সঠিক tense বাছা' },
          body: {
            en: `A **tense** shows when something happens. Look for time clues:

- **ago, yesterday, last week, in 2019** → **simple past**: ✓ *We **finished** the work two days ago.* ✗ *We have finished the work two days ago.*
- **since, for, already, just, yet** (up to now) → **present perfect**: ✓ *I **have lived** here since 2015.*
- **Two past actions**: the one that happened **first** takes **had + 3rd form** (past perfect):
  ✓ *When I reached the cinema, the film **had already started**.*
- **If + present, will + base**: ✓ *If it **rains**, we **will stay** at home.* (This one needs no change.)`,
            bn: `**Tense** দেখায় ঘটনাটি কখন ঘটছে। সময়ের সূত্রগুলো খোঁজো:

- **ago, yesterday, last week, in 2019** → **simple past**: ✓ *We **finished** the work two days ago.* ✗ *We have finished the work two days ago.*
- **since, for, already, just, yet** (এখন পর্যন্ত) → **present perfect**: ✓ *I **have lived** here since 2015.*
- **অতীতের দুটি কাজ**: যেটি **আগে** ঘটেছে সেটিতে **had + 3rd form** (past perfect):
  ✓ *When I reached the cinema, the film **had already started**.*
- **If + present, will + base**: ✓ *If it **rains**, we **will stay** at home.* (এটি বদলাতে হবে না।)`,
          },
        },
        {
          heading: { en: 'Comparison: -er / -est', bn: 'তুলনা: -er / -est' },
          body: {
            en: `- **Comparative** (comparing two): *tall → taller*, *beautiful → more beautiful*.
- **Superlative** (the top of a group): *tall → the tallest*, *beautiful → the most beautiful*.
- Never use both *more/most* and *-er/-est*:
  ✗ *the most cleverest* ✓ *the cleverest*
  ✗ *more cleverer* ✓ *cleverer*`,
            bn: `- **Comparative** (দুজনের তুলনা): *tall → taller*, *beautiful → more beautiful*।
- **Superlative** (দলের মধ্যে সবচেয়ে): *tall → the tallest*, *beautiful → the most beautiful*।
- *more/most* আর *-er/-est* কখনও একসঙ্গে নয়:
  ✗ *the most cleverest* ✓ *the cleverest*
  ✗ *more cleverer* ✓ *cleverer*`,
          },
        },
      ],
      examples: [
        {
          question: { en: '"We **have finished** the work two days ago." Options: had finished / finished / are finishing / No improvement', bn: 'বোল্ড অংশের জায়গায় সবচেয়ে ভালো বিকল্প বাছো: "We **have finished** the work two days ago." Options: had finished / finished / are finishing / No improvement' },
          steps: [
            { en: '*Two days ago* points to a finished time in the past.', bn: '*Two days ago* অতীতের একটি শেষ হওয়া সময় বোঝায়।' },
            { en: 'With *ago* we use the simple past, not the present perfect.', bn: '*ago* থাকলে simple past বসে, present perfect নয়।' },
            { en: '*had finished* needs another past action to compare with; there is none here.', bn: '*had finished* বসাতে আরেকটি অতীতের কাজ লাগে; এখানে তা নেই।' },
          ],
          answer: { en: '**finished**: We finished the work two days ago.', bn: 'সঠিক উত্তর: **finished**: We finished the work two days ago.' },
        },
        {
          question: { en: '"When I reached the cinema, the film **already started**." Options: has already started / had already started / already starts / No improvement', bn: 'বোল্ড অংশের জায়গায় সবচেয়ে ভালো বিকল্প বাছো: "When I reached the cinema, the film **already started**." Options: has already started / had already started / already starts / No improvement' },
          steps: [
            { en: 'There are two past actions: I reached, and the film started.', bn: 'অতীতের দুটি কাজ: আমি পৌঁছলাম, আর সিনেমা শুরু হল।' },
            { en: 'The film started **first**, so it takes the past perfect: *had + started*.', bn: 'সিনেমা **আগে** শুরু হয়েছিল, তাই past perfect: *had + started*।' },
          ],
          answer: { en: '**had already started**: When I reached the cinema, the film had already started.', bn: 'সঠিক উত্তর: **had already started**: When I reached the cinema, the film had already started.' },
        },
        {
          question: { en: '"If it rains, we **will stay** at home." Options: would stay / would have stayed / stayed / No improvement', bn: 'বোল্ড অংশের জায়গায় সবচেয়ে ভালো বিকল্প বাছো: "If it rains, we **will stay** at home." Options: would stay / would have stayed / stayed / No improvement' },
          steps: [
            { en: 'The *if*-part is in the present (*rains*), talking about a real future possibility.', bn: '*if*-অংশ present-এ (*rains*), ভবিষ্যতের একটি বাস্তব সম্ভাবনার কথা।' },
            { en: 'The pattern *if + present, will + base* is correct, so nothing needs to change.', bn: '*if + present, will + base* গঠনটি সঠিক, তাই কিছু বদলাতে হবে না।' },
          ],
          answer: { en: '**No improvement**', bn: '**No improvement** (কোনো পরিবর্তন লাগবে না)' },
        },
      ],
    },
    {
      level: 'advanced',
      sections: [
        {
          heading: { en: 'Parallel structure', bn: 'Parallel structure (সমান গঠন)' },
          body: {
            en: `When you list things or join them with *and, or, both ... and, not only ... but also*, every item must have the **same form**.

✗ *The job requires typing, filing and **to answer** phone calls.*
✓ *The job requires typing, filing and **answering** phone calls.*

✗ *She praised her both for her punctuality and **because she was sincere**.*
✓ *She praised her both for her punctuality and **for her sincerity**.*`,
            bn: `কয়েকটি জিনিসের তালিকা দিলে বা *and, or, both ... and, not only ... but also* দিয়ে জুড়লে প্রতিটির **গঠন একই** হতে হবে।

✗ *The job requires typing, filing and **to answer** phone calls.*
✓ *The job requires typing, filing and **answering** phone calls.*

✗ *She praised her both for her punctuality and **because she was sincere**.*
✓ *She praised her both for her punctuality and **for her sincerity**.*`,
          },
        },
        {
          heading: { en: 'Extra words and fixed expressions', bn: 'অতিরিক্ত শব্দ আর নির্দিষ্ট অভিব্যক্তি' },
          body: {
            en: `- **Redundancy** means saying the same thing twice. *The reason ... is because* repeats the idea of cause:
  ✗ *The reason why he failed is because he was lazy.* ✓ *The reason why he failed is **that** he was lazy.*
- Other repeats to avoid: *return back*, *repeat again*, *each and every one*, *cousin brother*.
- **Idioms** (fixed phrases) must be used exactly: ✓ *There is no use crying over **spilt milk**.* (no *the*)
- **Not only** at the start of a sentence flips the order (like a question):
  ✗ *Not only **he is** a singer but also a dancer.* ✓ *Not only **is he** a singer but also a dancer.*
- **Double comparison** needs both parts complete:
  ✓ *He is **as tall as, if not taller than,** his brother.*`,
            bn: `- **Redundancy** মানে একই কথা দুবার বলা। *The reason ... is because*-এ কারণের ভাব দুবার আসে:
  ✗ *The reason why he failed is because he was lazy.* ✓ *The reason why he failed is **that** he was lazy.*
- আরও যে পুনরাবৃত্তি এড়াবে: *return back*, *repeat again*, *each and every one*, *cousin brother*।
- **Idiom** (নির্দিষ্ট বাক্যাংশ) হুবহু বলতে হয়: ✓ *There is no use crying over **spilt milk**.* (*the* নেই)
- বাক্যের শুরুতে **Not only** থাকলে প্রশ্নের মতো ক্রম উল্টে যায়:
  ✗ *Not only **he is** a singer but also a dancer.* ✓ *Not only **is he** a singer but also a dancer.*
- **দুই রকম তুলনা** একসঙ্গে থাকলে দুটি অংশই সম্পূর্ণ লিখতে হয়:
  ✓ *He is **as tall as, if not taller than,** his brother.*`,
          },
        },
      ],
      examples: [
        {
          question: { en: '"The job requires typing, filing and **to answer phone calls**." Options: answer phone calls / to answering phone calls / answering phone calls / No improvement', bn: 'বোল্ড অংশের জায়গায় সবচেয়ে ভালো বিকল্প বাছো: "The job requires typing, filing and **to answer phone calls**." Options: answer phone calls / to answering phone calls / answering phone calls / No improvement' },
          steps: [
            { en: 'The first two items are *typing* and *filing* (both *-ing* forms).', bn: 'প্রথম দুটি জিনিস *typing* আর *filing* (দুটোই *-ing* রূপ)।' },
            { en: 'For parallel structure, the third item must also be an *-ing* form.', bn: 'Parallel structure-এর জন্য তৃতীয়টিও *-ing* রূপে হবে।' },
          ],
          answer: { en: '**answering phone calls**: The job requires typing, filing and answering phone calls.', bn: 'সঠিক উত্তর: **answering phone calls**: The job requires typing, filing and answering phone calls.' },
        },
        {
          question: { en: '"Not only **he is** a singer but also a dancer." Options: he does / does he be / is he / No improvement', bn: 'বোল্ড অংশের জায়গায় সবচেয়ে ভালো বিকল্প বাছো: "Not only **he is** a singer but also a dancer." Options: he does / does he be / is he / No improvement' },
          steps: [
            { en: 'When *Not only* begins a sentence, the verb comes before the subject, as in a question.', bn: 'বাক্য *Not only* দিয়ে শুরু হলে প্রশ্নের মতো verb subject-এর আগে আসে।' },
            { en: 'So *he is* becomes *is he*.', bn: 'তাই *he is* হবে *is he*।' },
          ],
          answer: { en: '**is he**: Not only is he a singer but also a dancer.', bn: 'সঠিক উত্তর: **is he**: Not only is he a singer but also a dancer.' },
        },
        {
          question: { en: '"The **reason why he failed is because** he was lazy." Options: reason for why he failed is because / reason why he failed is that / reason he failed is because of / No improvement', bn: 'বোল্ড অংশের জায়গায় সবচেয়ে ভালো বিকল্প বাছো: "The **reason why he failed is because** he was lazy." Options: reason for why he failed is because / reason why he failed is that / reason he failed is because of / No improvement' },
          steps: [
            { en: '*Reason* already means "cause", so adding *because* says it twice.', bn: '*Reason* মানেই "কারণ", তাই *because* যোগ করলে একই কথা দুবার হয়।' },
            { en: 'The correct pattern is *The reason ... is that ...*.', bn: 'সঠিক গঠন হল *The reason ... is that ...*।' },
          ],
          answer: { en: '**reason why he failed is that**: The reason why he failed is that he was lazy.', bn: 'সঠিক উত্তর: **reason why he failed is that**: The reason why he failed is that he was lazy.' },
        },
      ],
    },
  ],
  rules: [
    {
      label: { en: 'do / does / did + base form', bn: 'do / does / did + base form (প্রথম রূপ)' },
      explain: { en: '*He does not **like** tea. Did you **see** the match?* Never *did went* or *does likes*.', bn: '*He does not **like** tea. Did you **see** the match?* কখনও *did went* বা *does likes* নয়।' },
    },
    {
      label: { en: 'ago / yesterday → simple past', bn: 'ago / yesterday থাকলে → simple past' },
      explain: { en: '*I **met** him yesterday.* Not *I have met him yesterday.*', bn: '*I **met** him yesterday.* *I have met him yesterday* নয়।' },
    },
    {
      label: { en: 'Earlier of two past actions → had + 3rd form', bn: 'অতীতের দুটি কাজের আগেরটি → had + 3rd form' },
      explain: { en: '*The train **had left** before we reached the station.*', bn: 'আগে ঘটা কাজে *had* বসে: *The train **had left** before we reached the station.*' },
    },
    {
      label: { en: 'If + present → will + base', bn: 'If + present হলে → will + base' },
      explain: { en: '*If you **study**, you **will pass**.* No *will* in the *if*-part.', bn: '*If you **study**, you **will pass**.* *if*-অংশে *will* বসে না।' },
    },
    {
      label: { en: 'Keep lists parallel', bn: 'তালিকার গঠন একই রাখো' },
      explain: { en: '*She likes reading, singing and **dancing**.* (not *to dance*)', bn: '*She likes reading, singing and **dancing**.* (*to dance* নয়)' },
    },
    {
      label: { en: 'No repeated meaning', bn: 'একই অর্থ দুবার নয়' },
      explain: { en: '*The reason is **that** ...* (not *because*); *return* (not *return back*).', bn: '*The reason is **that** ...* (*because* নয়); *return* (*return back* নয়)।' },
    },
    {
      label: { en: 'Negative word at the start → inverted order', bn: 'শুরুতে না-বাচক শব্দ → উল্টো ক্রম' },
      explain: { en: '*Not only **is he** clever ... / Never **have I** seen ... / Hardly **had she** left ...*', bn: 'Verb subject-এর আগে চলে আসে: *Not only **is he** clever ... / Never **have I** seen ... / Hardly **had she** left ...*' },
    },
  ],
  tips: [
    { en: '"No improvement" is a real answer. If the sentence is correct, choose it with confidence.', bn: '"No improvement" একটি আসল উত্তর। বাক্য সঠিক হলে নির্ভয়ে সেটি বাছো।' },
    { en: 'Read the whole sentence with your chosen option in place before you answer.', bn: 'উত্তর দেওয়ার আগে বাছা option বসিয়ে পুরো বাক্যটি পড়ে নাও।' },
    { en: 'Common mistake: "cousin brother" or "return back". Say *cousin* and *return*.', bn: 'সাধারণ ভুল: "cousin brother" বা "return back"। বলো *cousin* আর *return*।' },
    { en: 'When two options are both grammatical, choose the shorter one that keeps the meaning.', bn: 'দুটি option-ই ব্যাকরণগতভাবে ঠিক হলে, অর্থ বজায় রেখে যেটি ছোট সেটি বাছো।' },
    { en: 'Time words are your best clue to the tense: *ago*, *since*, *by the time*, *already*.', bn: 'Tense বোঝার সেরা সূত্র হল সময়ের শব্দ: *ago*, *since*, *by the time*, *already*।' },
  ],
};
