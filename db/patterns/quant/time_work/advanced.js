'use strict';

const r = String.raw;
const t = (en, bn) => ({ en, bn });
const step = (en, bn) => t(en, bn);
const solved = (question, steps, answer) => ({
  question: t(question[0], question[1]),
  steps: steps.map(([en, bn]) => step(en, bn)),
  answer: t(answer[0], answer[1]),
});

const clerkshipNote = t(
  'Outside the WBPSC Clerkship Part-I arithmetic syllabus (Advt 12/2024).',
  'WBPSC Clerkship Part-I-এর অঙ্কের সিলেবাসের বাইরে (বিজ্ঞপ্তি 12/2024)।',
);

module.exports = [
  {
    key: 'one_worker',
    emoji: '👤',
    name: t('One worker, one job', 'একজন শ্রমিক, একটি কাজ'),
    spot: t('The time for one person to complete the whole job is given; find the rate, a partial amount, or a new time.', 'একজনের পুরো কাজের সময় দেওয়া থাকে; কাজের হার, আংশিক কাজ বা নতুন সময় বের করতে হয়।'),
    typicalWording: t('“A completes the work in 8 days. How much is done in 2 days?”', '“A 8 দিনে কাজটি শেষ করে। 2 দিনে কতটা কাজ হবে?”'),
    method: [t('Treat the complete job as 1 work.', 'পুরো কাজকে 1 কাজ ধরো।'), t('Daily rate = 1 ÷ days; multiply by the days worked.', 'দৈনিক হার = 1 ÷ দিন; কাজের দিনের সংখ্যা দিয়ে গুণ করো।')],
    formula: t(r`Rate $=1/T$; work in $d$ days $=d/T$.`, r`কাজের হার $=1/T$; $d$ দিনে কাজ $=d/T$।`),
    shortcut: t('For a partial job, divide days worked by the full-job time. This is safe only when the pace is steady.', 'আংশিক কাজের জন্য কাজের দিনকে পুরো কাজের দিন দিয়ে ভাগ করো। কাজের গতি একই থাকলেই এটি ঠিক।'),
    trap: t('Do not report a number of days when the question asks for a fraction of the work.', 'প্রশ্নে কাজের ভগ্নাংশ চাইলে দিনের সংখ্যা লিখো না।'),
    difficulty: 'beginner',
    examples: [
      solved(['A paints a wall in 5 days. What fraction does A paint in 2 days?', 'A 5 দিনে একটি দেয়াল রং করে। 2 দিনে দেয়ালের কত অংশ রং করে?'], [
        [r`Rate $=1/5$ wall per day.`, r`হার $=1/5$ দেয়াল প্রতিদিন।`],
        [r`In 2 days: $2/5$ wall.`, r`2 দিনে: $2/5$ দেয়াল।`],
      ], [r`$2/5$ of the wall.`, r`দেয়ালের $2/5$ অংশ।`]),
      solved(['A finishes a job in 9 hours. How long for one-third of the job at the same pace?', 'A 9 ঘণ্টায় একটি কাজ শেষ করে। একই গতিতে এক-তৃতীয়াংশ কাজ করতে কত সময় লাগবে?'], [
        [r`One-third of the work takes one-third of the total time.`, r`এক-তৃতীয়াংশ কাজ করতে মোট সময়ের এক-তৃতীয়াংশ লাগে।`],
        [r`$9/3=3$ hours.`, r`$9/3=3$ ঘণ্টা।`],
      ], ['3 hours.', '3 ঘণ্টা।']),
    ],
    tryIt: {
      question: t('B can finish a task in 8 days. What fraction does B complete in 3 days?', 'B 8 দিনে কাজ শেষ করে। 3 দিনে কত অংশ শেষ করবে?'),
      options: [t('3/8', '3/8'), t('1/8', '1/8'), t('5/8', '5/8'), t('8/3', '8/3')],
      correct: 0,
      explanation: [
        t('Daily work is 1/8 of the task.', 'প্রতিদিন কাজের 1/8 অংশ হয়।'),
        t('In 3 days, the work is 3 × 1/8 = 3/8.', '3 দিনে কাজ 3 × 1/8 = 3/8।'),
      ],
    },
    syllabusNote: t('Original teaching examples; no previous-year-paper claim.', 'নিজস্ব শিক্ষামূলক উদাহরণ; আগের বছরের প্রশ্ন বলে দাবি করা হচ্ছে না।'),
  },
  {
    key: 'three_workers',
    emoji: '👥',
    name: t('Three or more people together', 'তিন বা তার বেশি জন একসঙ্গে'),
    spot: t('The individual completion times for three or more workers are given and the whole group works at once.', 'তিন বা তার বেশি শ্রমিকের একার সময় দেওয়া আছে এবং সবাই একই সঙ্গে কাজ করে।'),
    typicalWording: t('“A, B and C can finish a job in … days respectively. How long together?”', '“A, B ও C আলাদা করে … দিনে কাজ শেষ করে। একসঙ্গে কত দিন লাগবে?”'),
    method: [t('Write each daily rate as 1 divided by that person’s time.', 'প্রত্যেকের দৈনিক হার = 1 ÷ তার সময় লেখো।'), t('Add all rates, then divide 1 work by the total rate.', 'সব হার যোগ করে 1 কাজকে মোট হার দিয়ে ভাগ করো।')],
    formula: t(r`$T=1/(1/a+1/b+1/c+\cdots)$.`, r`একসঙ্গে সময় $T=1/(1/a+1/b+1/c+\cdots)$।`),
    shortcut: t('Use LCM units when the completion times are whole numbers and the LCM stays manageable.', 'সময়গুলো পূর্ণসংখ্যা এবং ল.সা.গু. সুবিধাজনক হলে ল.সা.গু. একক নাও।'),
    trap: t('Never add the completion times; add the work rates.', 'কাজ শেষের দিন যোগ কোরো না; কাজের হার যোগ করো।'),
    difficulty: 'beginner',
    examples: [
      solved(['A takes 6 days, B 12 days, and C 4 days. How long together?', 'A-র 6 দিন, B-র 12 দিন ও C-র 4 দিন লাগে। একসঙ্গে কত দিন?'], [
        [r`Total work $=12$ units. Daily rates: A $=2$, B $=1$, C $=3$.`, r`মোট কাজ $=12$ একক। দৈনিক হার: A $=2$, B $=1$, C $=3$ একক।`],
        [r`Together they do $6$ units/day, so $12/6=2$ days.`, r`একসঙ্গে দিনে $6$ একক, তাই $12/6=2$ দিন।`],
      ], ['2 days.', '2 দিন।']),
    ],
    tryIt: {
      question: t('A takes 4 days, B 8 days, and C 8 days. How long together?', 'A-র 4 দিন, B-র 8 দিন ও C-রও 8 দিন লাগে। একসঙ্গে কত দিন?'),
      options: [t('2 days', '2 দিন'), t('4 days', '4 দিন'), t('8 days', '8 দিন'), t('20 days', '20 দিন')],
      correct: 0,
      explanation: [
        t('Rates are 1/4 + 1/8 + 1/8 = 1/2 job/day.', 'হার 1/4 + 1/8 + 1/8 = 1/2 কাজ/দিন।'),
        t('At 1/2 job per day, the job takes 2 days.', 'দিনে 1/2 কাজ হলে পুরো কাজে 2 দিন লাগে।'),
      ],
    },
    syllabusNote: t('Original teaching example; not labelled as a previous-year question.', 'নিজস্ব শিক্ষামূলক উদাহরণ; আগের বছরের প্রশ্ন হিসেবে চিহ্নিত নয়।'),
  },
  {
    key: 'w_together_then_leave',
    registryLinked: true,
    emoji: '🚪',
    name: t('A worker leaves after a shared start', 'একসঙ্গে শুরু করার পর একজন চলে যায়'),
    spot: t('The team works together for a stated time; one person leaves and another finishes the remaining job.', 'দল কিছু সময় একসঙ্গে কাজ করে; পরে একজন চলে যায় এবং অন্যজন বাকি কাজ শেষ করে।'),
    typicalWording: t('“They work together for 6 days; A then leaves. How many more days does B need?”', '“তারা 6 দিন একসঙ্গে কাজ করে; তারপর A চলে যায়। B-র আর কত দিন লাগবে?”'),
    method: [t('Find each daily rate with LCM work units.', 'ল.সা.গু. এককে প্রত্যেকের দৈনিক হার বের করো।'), t('Multiply the team rate by the shared days; subtract from total work.', 'দলের হারকে একসঙ্গে কাজের দিন দিয়ে গুণ করে মোট কাজ থেকে বিয়োগ করো।'), t('Divide remaining work by the rate of the person who stays.', 'বাকি কাজ থেকে থাকা ব্যক্তির হার দিয়ে ভাগ করো।')],
    formula: t(r`Remaining work $=W-(r_A+r_B)d$; extra time $=$ remaining work$/r_B$.`, r`বাকি কাজ $=W-(r_A+r_B)d$; অতিরিক্ত সময় $=$ বাকি কাজ$/r_B$।`),
    shortcut: t('LCM units avoid fraction arithmetic. Use only if each person’s rate stays constant during each phase.', 'ল.সা.গু. এককে ভগ্নাংশের হিসাব কমে। প্রতিটি ধাপে কাজের হার স্থির থাকলেই এটি নাও।'),
    trap: t('Answer the extra time after the person leaves, not the total elapsed time.', 'যে চলে গেছে তার পরের অতিরিক্ত সময় বলো, শুরু থেকে মোট সময় নয়।'),
    difficulty: 'intermediate',
    examples: [
      solved(['A takes 20 days and B 30 days. They work together for 6 days; A leaves. How long for B to finish?', 'A-র 20 দিন ও B-র 30 দিন লাগে। তারা 6 দিন একসঙ্গে কাজ করে; A চলে যায়। B-র বাকি কাজ শেষ করতে কত দিন?'], [
        [r`Take $60$ units: A does $3$/day and B $2$/day.`, r`মোট $60$ একক ধরলে A দিনে $3$, B দিনে $2$ একক করে।`],
        [r`Together in 6 days: $5\times6=30$ units; $30$ remain.`, r`6 দিনে একসঙ্গে: $5\times6=30$ একক; বাকি $30$।`],
        [r`B takes $30/2=15$ more days.`, r`B-র আরও $30/2=15$ দিন লাগে।`],
      ], ['15 more days.', 'আরও 15 দিন।']),
    ],
    tryIt: {
      question: t('A takes 12 days and B 18 days. They work together for 4 days; A leaves. How many more days for B?', 'A-র 12 দিন ও B-র 18 দিন লাগে। তারা 4 দিন একসঙ্গে কাজ করে; A চলে যায়। B-র আরও কত দিন?'),
      options: [t('8', '8'), t('12', '12'), t('6', '6'), t('10', '10')],
      correct: 0,
      explanation: [
        t(r`Total $=36$ units; A does $3$/day, B $2$/day.`, r`মোট $=36$ একক; A দিনে $3$, B দিনে $2$ একক করে।`),
        t(r`After 4 days, $36-5\times4=16$ units remain; B needs $16/2=8$ days.`, r`4 দিন পর $36-5\times4=16$ একক বাকি; B-র $16/2=8$ দিন লাগে।`),
      ],
    },
    syllabusNote: clerkshipNote,
  },
  {
    key: 'w_efficiency_percent',
    registryLinked: true,
    emoji: '📈',
    name: t('Efficiency given as a percentage', 'দক্ষতা শতাংশে দেওয়া'),
    spot: t('One worker is stated to be a percentage more or less efficient than another.', 'একজন অন্যজনের চেয়ে কত শতাংশ বেশি বা কম দক্ষ তা দেওয়া থাকে।'),
    typicalWording: t('“A is 25% more efficient than B; together they finish in … days.”', '“A, B-র চেয়ে 25% বেশি দক্ষ; একসঙ্গে … দিনে কাজ শেষ করে।”'),
    method: [t('Choose a base efficiency of 100 units; convert the percent statement to a ratio.', 'ভিত্তি দক্ষতা 100 একক ধরো; শতাংশের কথাকে অনুপাতে বদলাও।'), t('Add rates to get the team rate and use the given team time to find total work.', 'দলের হার পেতে হার যোগ করো; দলের সময় দিয়ে মোট কাজ বের করো।'), t('Divide total work by the required person’s rate.', 'মোট কাজকে যে ব্যক্তির সময় চাই তার হার দিয়ে ভাগ করো।')],
    formula: t(r`If A is $p\%$ more efficient: $r_A:r_B=(100+p):100$.`, r`A $p\%$ বেশি দক্ষ হলে: $r_A:r_B=(100+p):100$।`),
    shortcut: t('Reduce the efficiency ratio first, then use units. Never apply the same percentage directly to days.', 'আগে দক্ষতার অনুপাত সরল করো, তারপর একক ব্যবহার করো। একই শতাংশ সরাসরি দিনের ওপর প্রয়োগ কোরো না।'),
    trap: t('Efficiency and time are inverse: 25% more efficient does not mean 25% fewer days.', 'দক্ষতা ও সময় ব্যস্ত অনুপাতে: 25% বেশি দক্ষ মানে 25% কম দিন নয়।'),
    difficulty: 'advanced',
    important: true,
    examples: [
      solved(['A is 25% more efficient than B. Together they finish in 20 days. How long for A alone?', 'A, B-র চেয়ে 25% বেশি দক্ষ। একসঙ্গে 20 দিনে কাজ শেষ করে। A একা কত দিনে করবে?'], [
        [r`Efficiency ratio A:B $=125:100=5:4$.`, r`দক্ষতার অনুপাত A:B $=125:100=5:4$।`],
        [r`Together rate $=9$ units/day; total work $=20\times9=180$ units.`, r`একসঙ্গে হার $=9$ একক/দিন; মোট কাজ $=20\times9=180$ একক।`],
        [r`A alone takes $180/5=36$ days.`, r`A একা $180/5=36$ দিনে করবে।`],
      ], ['36 days.', '36 দিন।']),
      solved(['A is 10% more efficient than B. Together they finish in 22 days. How long for B alone?', 'A, B-র চেয়ে 10% বেশি দক্ষ। একসঙ্গে 22 দিনে কাজ শেষ করে। B একা কত দিন নেবে?'], [
        [r`Efficiency ratio A:B $=110:100=11:10$.`, r`দক্ষতার অনুপাত A:B $=110:100=11:10$।`],
        [r`Total work $=22\times21=462$ units; B takes $462/10=46.2$ days.`, r`মোট কাজ $=22\times21=462$ একক; B-র লাগে $462/10=46.2$ দিন।`],
      ], ['46.2 days.', '46.2 দিন।']),
    ],
    tryIt: {
      question: t('A is 50% more efficient than B. Together they finish in 12 days. How long for B alone?', 'A, B-র চেয়ে 50% বেশি দক্ষ। একসঙ্গে 12 দিনে কাজ শেষ করে। B একা কত দিন নেবে?'),
      options: [t('20 days', '20 দিন'), t('30 days', '30 দিন'), t('18 days', '18 দিন'), t('24 days', '24 দিন')],
      correct: 1,
      explanation: [
        t('Efficiency ratio A:B = 150:100 = 3:2; total rate is 5 units/day.', 'দক্ষতার অনুপাত A:B = 150:100 = 3:2; মোট হার 5 একক/দিন।'),
        t('Total work = 12 × 5 = 60 units; B takes 60/2 = 30 days.', 'মোট কাজ = 12 × 5 = 60 একক; B-র লাগে 60/2 = 30 দিন।'),
      ],
    },
    syllabusNote: clerkshipNote,
  },
  {
    key: 'w_men_days_hours',
    registryLinked: true,
    emoji: '🕒',
    name: t('Workers and working hours change', 'শ্রমিক ও কাজের ঘণ্টা বদলায়'),
    spot: t('The same job is completed by a changed number of equally efficient workers or changed daily hours.', 'একই কাজ সমান দক্ষতার ভিন্ন সংখ্যক শ্রমিক বা দৈনিক ভিন্ন ঘণ্টায় শেষ করে।'),
    typicalWording: t('“15 workers finish in 12 days at 8 hours/day. How many days for 20 workers at 9 hours/day?”', '“15 জন 8 ঘণ্টা করে 12 দিনে কাজ করে। 20 জন 9 ঘণ্টা কাজ করলে কত দিন?”'),
    method: [t('For the same job, equate workers × hours per day × days.', 'একই কাজের জন্য শ্রমিক × দৈনিক ঘণ্টা × দিন সমান ধরো।'), t('Substitute the known values and solve for the missing quantity.', 'জানা মান বসিয়ে অজানা রাশি বের করো।')],
    formula: t(r`$M_1H_1D_1=M_2H_2D_2$ for the same work and equal efficiency.`, r`একই কাজ ও সমান দক্ষতায় $M_1H_1D_1=M_2H_2D_2$।`),
    shortcut: t('Cancel common factors before multiplying. The shortcut is invalid if worker efficiency or the job itself changes.', 'গুণের আগে সাধারণ গুণনীয়ক কাটো। শ্রমিকের দক্ষতা বা কাজ বদলালে এই নিয়ম চলবে না।'),
    trap: t('Do not forget the hours per day; more workers and shorter shifts can offset each other.', 'প্রতিদিনের ঘণ্টা বাদ দিও না; বেশি শ্রমিক ও কম সময় একে অন্যকে সামঞ্জস্য করতে পারে।'),
    difficulty: 'intermediate',
    examples: [
      solved(['15 workers take 12 days at 8 hours/day. How many days for 20 workers at 9 hours/day?', '15 জন 8 ঘণ্টা করে 12 দিনে কাজ করে। 20 জন 9 ঘণ্টা কাজ করলে কত দিন?'], [
        [r`$15\times12\times8=20\times D\times9$.`, r`সমীকরণ: $15\times12\times8=20\times D\times9$।`],
        [r`$D=1440/180=8$ days.`, r`$D=1440/180=8$ দিন।`],
      ], ['8 days.', '8 দিন।']),
    ],
    syllabusNote: clerkshipNote,
  },
  {
    key: 'w_alternate_days',
    registryLinked: true,
    emoji: '🔁',
    name: t('Workers alternate days', 'শ্রমিকেরা পালা করে কাজ করে'),
    spot: t('Different workers work on alternating days; who starts and the final partial cycle matter.', 'ভিন্ন শ্রমিক একদিন পরপর কাজ করে; কে শুরু করছে এবং শেষের অসম্পূর্ণ চক্র গুরুত্বপূর্ণ।'),
    typicalWording: t('“A and B work on alternate days, starting with A. When is the work finished?”', '“A ও B একদিন পরপর কাজ করে, A প্রথমে শুরু করে। কাজ কখন শেষ হবে?”'),
    method: [t('Find work completed in one full two-day cycle.', 'পুরো দুই দিনের এক চক্রে কাজ বের করো।'), t('Count complete cycles, then calculate the last day separately.', 'পুরো চক্র গুনে শেষে বাকি দিন আলাদা হিসাব করো।')],
    formula: t('Work per cycle = rate on day 1 + rate on day 2.', 'এক চক্রের কাজ = প্রথম দিনের হার + দ্বিতীয় দিনের হার।'),
    shortcut: t('Cycle arithmetic is quick only when the order is fixed and rates stay constant.', 'পালার ক্রম নির্দিষ্ট ও হার স্থির থাকলেই চক্রের হিসাব দ্রুত।'),
    trap: t('Do not divide total work by the average rate without checking which worker gets the final day.', 'শেষ দিনে কে কাজ করছে তা না দেখে গড় হার দিয়ে মোট কাজ ভাগ কোরো না।'),
    difficulty: 'advanced',
    important: true,
    examples: [
      solved(['A takes 6 days and B 3 days. They alternate days, A starts. When is the job done?', 'A-র 6 দিন ও B-র 3 দিন লাগে। তারা একদিন পরপর কাজ করে, A শুরু করে। কাজ কখন শেষ হবে?'], [
        [r`A does $1/6$ on day 1; B does $1/3$ on day 2. A two-day cycle completes $1/2$.`, r`প্রথম দিনে A করে $1/6$; দ্বিতীয় দিনে B করে $1/3$। দুই দিনে $1/2$ কাজ হয়।`],
        [r`Two cycles take 4 days and complete the whole job.`, r`দুই চক্রে 4 দিন লাগে এবং পুরো কাজ শেষ হয়।`],
      ], ['4 days.', '4 দিন।']),
      solved(['A takes 3 days and B 6 days. They alternate, A starts. When is the job done?', 'A-র 3 দিন ও B-র 6 দিন লাগে। তারা পালা করে কাজ করে, A প্রথমে শুরু করে। কাজ কখন শেষ হবে?'], [
        [r`One two-day cycle completes $1/3+1/6=1/2$ of the job.`, r`একটি দুই-দিনের চক্রে $1/3+1/6=1/2$ কাজ হয়।`],
        [r`Two cycles complete the job in 4 days.`, r`দুই চক্রে 4 দিনে কাজ শেষ হয়।`],
      ], ['4 days.', '4 দিন।']),
    ],
    tryIt: {
      question: t('A takes 4 days and B 12 days. They alternate, A starts. When is the work finished?', 'A-র 4 দিন ও B-র 12 দিন লাগে। তারা পালা করে কাজ করে, A প্রথমে শুরু করে। কখন কাজ শেষ হবে?'),
      options: [t('6 days', '6 দিন'), t('8 days', '8 দিন'), t('9 days', '9 দিন'), t('12 days', '12 দিন')],
      correct: 0,
      explanation: [
        t('In two days, A and B complete 1/4 + 1/12 = 1/3 of the work.', 'দুই দিনে A ও B 1/4 + 1/12 = 1/3 কাজ করে।'),
        t('Three two-day cycles finish the job: 3 × 2 = 6 days.', 'তিনটি দুই-দিনের চক্রে কাজ শেষ: 3 × 2 = 6 দিন।'),
      ],
    },
    syllabusNote: clerkshipNote,
  },
  {
    key: 'w_leaves_before_end',
    registryLinked: true,
    emoji: '⏳',
    name: t('A worker leaves before completion', 'কাজ শেষ হওয়ার আগে একজন চলে যায়'),
    spot: t('A worker’s departure is described as a fixed number of days before the unknown finish time.', 'কাজ শেষ হওয়ার অজানা সময়ের কয়েক দিন আগে একজন চলে যায় বলে দেওয়া থাকে।'),
    typicalWording: t('“A and B start together; B leaves 3 days before the job is completed.”', '“A ও B একসঙ্গে শুরু করে; কাজ শেষের 3 দিন আগে B চলে যায়।”'),
    method: [t('Let total elapsed time be T.', 'মোট সময় T ধরো।'), t('Give the worker who leaves only T − k working days.', 'যে চলে যায় তাকে T − k দিন কাজ করাও।'), t('Add both workers’ work fractions and set the total to 1.', 'দুজনের কাজের ভগ্নাংশ যোগ করে মোটকে 1 ধরো।')],
    formula: t(r`$T/t_A+(T-k)/t_B=1$.`, r`মোট সময় $T$ হলে: $T/t_A+(T-k)/t_B=1$।`),
    shortcut: t('Use a linear equation; no shortcut is safer when the total time is unknown.', 'সরল সমীকরণ করো; মোট সময় অজানা হলে শর্টকাট নিরাপদ নয়।'),
    trap: t('The worker’s time is T − k, not k; k is the gap before completion.', 'শ্রমিকের কাজের সময় T − k, k নয়; k হল শেষ হওয়ার আগের বিরতি।'),
    difficulty: 'advanced',
    examples: [
      solved(['A takes 8 days and B 12 days. B leaves 3 days before the job ends. Find the total time.', 'A-র 8 দিন ও B-র 12 দিন লাগে। কাজ শেষের 3 দিন আগে B চলে যায়। মোট সময় কত?'], [
        [r`Let total time be $T$: $T/8+(T-3)/12=1$.`, r`মোট সময় $T$: $T/8+(T-3)/12=1$।`],
        [r`Multiply by 24: $3T+2T-6=24$, so $T=6$.`, r`24 দিয়ে গুণ: $3T+2T-6=24$, তাই $T=6$।`],
      ], ['6 days.', '6 দিন।']),
    ],
    syllabusNote: clerkshipNote,
  },
  {
    key: 'w_men_women_equivalence',
    registryLinked: true,
    emoji: '⚖️',
    name: t('Workers with different efficiencies', 'ভিন্ন দক্ষতার শ্রমিক'),
    spot: t('A question gives an equivalence such as a fixed number of men doing the same work as a different number of women.', 'একই কাজের জন্য নির্দিষ্ট সংখ্যক পুরুষ ও ভিন্ন সংখ্যক মহিলার সমান কাজের সম্পর্ক দেওয়া থাকে।'),
    typicalWording: t('“2 men do the work of 3 women. How long for a mixed team?”', '“2 জন পুরুষের কাজ 3 জন মহিলার সমান। মিশ্র দলটির কত সময় লাগবে?”'),
    method: [t('Convert every worker into one common worker unit.', 'সব শ্রমিককে একটি সাধারণ শ্রমিক-এককে বদলাও।'), t('Multiply equivalent team size by time and divide by the new team size.', 'সমতুল্য দলের আকারকে সময় দিয়ে গুণ করে নতুন দলের আকার দিয়ে ভাগ করো।')],
    formula: t('For equal work: equivalent workers × days = constant.', 'সমান কাজের জন্য: সমতুল্য শ্রমিক × দিন = ধ্রুবক।'),
    shortcut: t('Use an equivalence ratio before applying worker-days.', 'শ্রমিক-দিন ব্যবহারের আগে সমতুল্যতার অনুপাত বের করো।'),
    trap: t('Do not count each person as equally efficient when the question says otherwise.', 'প্রশ্নে দক্ষতা আলাদা বললে সবাইকে সমান শ্রমিক ধরে গুনো না।'),
    difficulty: 'advanced',
    examples: [
      solved(['2 men do the same work as 3 women. If 6 men finish in 12 days, how long for 3 men and 3 women?', '2 জন পুরুষের কাজ 3 জন মহিলার সমান। 6 জন পুরুষ 12 দিনে কাজ করলে 3 জন পুরুষ ও 3 জন মহিলার কত দিন লাগবে?'], [
        [r`3 women = 2 men, so the mixed team = 3+2=5 men-equivalents.`, r`3 জন মহিলা = 2 জন পুরুষ, তাই মিশ্র দল = 3+2=5 পুরুষ-সমতুল্য।`],
        [r`Total work = $6\times12=72$ man-days; time $=72/5=14.4$ days.`, r`মোট কাজ $=6\times12=72$ পুরুষ-দিন; সময় $=72/5=14.4$ দিন।`],
      ], ['14.4 days.', '14.4 দিন।']),
    ],
    syllabusNote: clerkshipNote,
  },
  {
    key: 'w_wages_share',
    registryLinked: true,
    emoji: '💰',
    name: t('Wages divided by work done', 'কাজের অনুপাতে মজুরি ভাগ'),
    spot: t('A total payment is split among people who contribute different amounts of work.', 'মোট পারিশ্রমিক এমন লোকেদের মধ্যে ভাগ হয় যারা ভিন্ন পরিমাণ কাজ করেছে।'),
    typicalWording: t('“A and B receive ₹2,500 for a job; find A’s share.”', '“A ও B একটি কাজের জন্য ₹2,500 পায়; A-র ভাগ বের করো।”'),
    method: [t('Calculate each person’s work contribution (rate × time).', 'প্রত্যেকের করা কাজ (হার × সময়) বের করো।'), t('Divide the total payment in the same ratio as their work.', 'কাজের অনুপাতেই মোট টাকা ভাগ করো।')],
    formula: t('Share = total wages × (person’s work ÷ total work).', 'ভাগ = মোট মজুরি × (ব্যক্তির কাজ ÷ মোট কাজ)।'),
    shortcut: t('If they work equal days at steady rates, divide wages in the efficiency ratio.', 'সমান দিন স্থির গতিতে কাজ করলে দক্ষতার অনুপাতে মজুরি ভাগ করো।'),
    trap: t('If the workers’ time differs, do not use efficiency alone; include the time each worked.', 'কাজের সময় আলাদা হলে শুধু দক্ষতা নয়, প্রত্যেকের কাজের সময়ও ধরো।'),
    difficulty: 'intermediate',
    important: true,
    examples: [
      solved(['A takes 12 days and B 18 days. For equal working time they earn ₹2,500. Find A’s share.', 'A-র 12 দিন ও B-র 18 দিন লাগে। সমান সময় কাজ করে তারা ₹2,500 পায়। A-র ভাগ কত?'], [
        [r`Equal-time work ratio $=1/12:1/18=3:2$.`, r`সমান সময়ে কাজের অনুপাত $=1/12:1/18=3:2$।`],
        [r`A receives $2500\times3/5=₹1500$.`, r`A পায় $2500\times3/5=₹1500$।`],
      ], ['₹1,500.', 'A-র ভাগ ₹1,500 টাকা।']),
      solved(['A takes 8 days and B 12 days. They earn ₹600 for equal working time. Find A’s share.', 'A-র 8 দিন ও B-র 12 দিন লাগে। সমান সময় কাজ করে তারা ₹600 পায়। A-র ভাগ কত?'], [
        [r`Work ratio $=1/8:1/12=3:2$.`, r`কাজের অনুপাত $=1/8:1/12=3:2$।`],
        [r`A receives $600\times3/5=₹360$.`, r`A পায় $600\times3/5=₹360$।`],
      ], ['₹360.', 'A-র ভাগ ₹360 টাকা।']),
    ],
    tryIt: {
      question: t('A takes 10 days and B 15 days. They work equal time for ₹500. What is A’s share?', 'A-র 10 দিন ও B-র 15 দিন লাগে। সমান সময় কাজ করে তারা ₹500 পায়। A-র ভাগ কত?'),
      options: [t('₹200', '₹200'), t('₹300', '₹300'), t('₹250', '₹250'), t('₹350', '₹350')],
      correct: 1,
      explanation: [
        t('Their equal-time work ratio is 1/10:1/15 = 3:2.', 'সমান সময়ে কাজের অনুপাত 1/10:1/15 = 3:2।'),
        t('A receives 3/5 × ₹500 = ₹300.', 'A পায় 3/5 × ₹500 = ₹300।'),
      ],
    },
    syllabusNote: clerkshipNote,
  },
  {
    key: 'w_group_join_midway',
    registryLinked: true,
    emoji: '➕',
    name: t('More workers join midway', 'মাঝপথে আরও শ্রমিক যোগ দেয়'),
    spot: t('A team starts a job, then additional equally skilled workers join after some days.', 'একটি দল কাজ শুরু করে; কয়েক দিন পর একই দক্ষতার আরও শ্রমিক যোগ দেয়।'),
    typicalWording: t('“6 workers start; 4 more join after 4 days. Find the total time.”', '“6 জন কাজ শুরু করে; 4 দিন পর আরও 4 জন যোগ দেয়। মোট সময় বের করো।”'),
    method: [t('Find total work in worker-days from the original schedule.', 'আগের সময়সূচি থেকে মোট কাজ শ্রমিক-দিনে বের করো।'), t('Subtract the work already done before the team changes.', 'দল বদলানোর আগে করা কাজ বাদ দাও।'), t('Divide the remaining work by the new team size.', 'বাকি কাজ নতুন দলের আকার দিয়ে ভাগ করো।')],
    formula: t('Same-work total worker-days = sum of (workers × days) across phases.', 'একই কাজের মোট শ্রমিক-দিন = প্রতিটি ধাপের (শ্রমিক × দিন)-এর যোগফল।'),
    shortcut: t('Use phase-by-phase worker-days only when all workers have equal, steady efficiency.', 'সব শ্রমিকের দক্ষতা সমান ও স্থির হলেই ধাপভিত্তিক শ্রমিক-দিন নাও।'),
    trap: t('The larger team shares only the remaining work, not the whole job.', 'বড় দল শুধু বাকি কাজ ভাগ করে, পুরো কাজ নয়।'),
    difficulty: 'advanced',
    important: true,
    examples: [
      solved(['A job needs 60 worker-days. 6 workers work for 4 days, then 4 more join. How long in total?', 'একটি কাজের জন্য 60 শ্রমিক-দিন লাগে। 6 জন 4 দিন কাজ করার পর আরও 4 জন যোগ দেয়। মোট কত দিন?'], [
        [r`First phase: $6\times4=24$ worker-days; remaining $=60-24=36$.`, r`প্রথম ধাপ: $6\times4=24$ শ্রমিক-দিন; বাকি $=60-24=36$।`],
        [r`New team has 10 workers; second phase $=36/10=3.6$ days.`, r`নতুন দলে 10 জন; দ্বিতীয় ধাপ $=36/10=3.6$ দিন।`],
        [r`Total $=4+3.6=7.6$ days.`, r`মোট $=4+3.6=7.6$ দিন।`],
      ], ['7.6 days.', '7.6 দিন।']),
      solved(['A job needs 120 worker-days. 10 workers work 3 days, then 5 join. How long in total?', 'একটি কাজে 120 শ্রমিক-দিন লাগে। 10 জন 3 দিন কাজ করার পর আরও 5 জন যোগ দেয়। মোট কত দিন?'], [
        [r`First phase completes $10\times3=30$ worker-days; $90$ remain.`, r`প্রথম ধাপে $10\times3=30$ শ্রমিক-দিন হয়; $90$ বাকি।`],
        [r`15 workers need $90/15=6$ more days; total $=3+6=9$ days.`, r`15 জনের আরও $90/15=6$ দিন লাগে; মোট $=3+6=9$ দিন।`],
      ], ['9 days.', '9 দিন।']),
    ],
    tryIt: {
      question: t('A job needs 96 worker-days. 8 workers work for 6 days, then 4 more join. How long in total?', 'একটি কাজে 96 শ্রমিক-দিন লাগে। 8 জন 6 দিন কাজ করার পর আরও 4 জন যোগ দেয়। মোট কত দিন?'),
      options: [t('10 days', '10 দিন'), t('12 days', '12 দিন'), t('9 days', '9 দিন'), t('8 days', '8 দিন')],
      correct: 0,
      explanation: [
        t('The first phase completes 8 × 6 = 48 worker-days; 48 remain.', 'প্রথম ধাপে 8 × 6 = 48 শ্রমিক-দিন হয়; 48 বাকি।'),
        t('12 workers need 48/12 = 4 days; total = 6 + 4 = 10 days.', '12 জনের 48/12 = 4 দিন লাগে; মোট = 6 + 4 = 10 দিন।'),
      ],
    },
    syllabusNote: clerkshipNote,
  },
  {
    key: 'w_efficiency_change',
    registryLinked: true,
    emoji: '🔧',
    name: t('A worker’s efficiency changes', 'একজনের দক্ষতা মাঝপথে বদলায়'),
    spot: t('A person or team speeds up or slows down after some part of the job is complete.', 'কাজের কিছু অংশের পর ব্যক্তি বা দলের গতি বেড়ে বা কমে যায়।'),
    typicalWording: t('“A works at the original rate for 4 days, then becomes twice as efficient.”', '“A প্রথমে আগের গতিতে 4 দিন কাজ করে, পরে দ্বিগুণ দক্ষ হয়।”'),
    method: [t('Calculate work done at the original rate.', 'আগের হারে করা কাজ বের করো।'), t('Subtract it from the whole job.', 'পুরো কাজ থেকে তা বাদ দাও।'), t('Divide remaining work by the changed rate.', 'বাকি কাজ বদলানো হার দিয়ে ভাগ করো।')],
    formula: t('Total time = time before change + remaining work ÷ new rate.', 'মোট সময় = পরিবর্তনের আগের সময় + বাকি কাজ ÷ নতুন হার।'),
    shortcut: t('Convert the new efficiency to a rate multiplier before calculating.', 'হিসাবের আগে নতুন দক্ষতাকে হারের গুণকে বদলাও।'),
    trap: t('Apply the new rate only to the remaining work.', 'নতুন হার শুধু বাকি কাজের ওপর প্রয়োগ করো।'),
    difficulty: 'advanced',
    examples: [
      solved(['A normally completes a job in 12 days. After working 4 days, A becomes twice as efficient. Find the total time.', 'A সাধারণত 12 দিনে কাজ শেষ করে। 4 দিন কাজের পর A দ্বিগুণ দক্ষ হয়। মোট সময় কত?'], [
        [r`First 4 days complete $4/12=1/3$; remaining work $=2/3$.`, r`প্রথম 4 দিনে $4/12=1/3$ কাজ; বাকি $=2/3$।`],
        [r`New rate $=2/12=1/6$ job/day; remaining time $=(2/3)/(1/6)=4$ days.`, r`নতুন হার $=2/12=1/6$ কাজ/দিন; বাকি সময় $=(2/3)/(1/6)=4$ দিন।`],
        [r`Total time $=4+4=8$ days.`, r`মোট সময় $=4+4=8$ দিন।`],
      ], ['8 days.', '8 দিন।']),
    ],
    syllabusNote: clerkshipNote,
  },
];
