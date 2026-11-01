'use strict';

const r = String.raw;
const t = (en, bn) => ({ en, bn });

const example = (question, given, find, method, steps, answer, why) => ({
  question: t(question[0], question[1]),
  given: t(given[0], given[1]),
  find: t(find[0], find[1]),
  method: t(method[0], method[1]),
  steps: steps.map(([en, bn]) => t(en, bn)),
  answer: t(answer[0], answer[1]),
  why: t(why[0], why[1]),
});

const examples = [
  example(
    ['Rina paints one wall in 4 days. What fraction does she paint in 1 day and in 3 days?', 'রিনা 4 দিনে একটি দেয়াল রং করে। 1 দিনে ও 3 দিনে সে দেয়ালের কত অংশ রং করে?'],
    ['One wall takes 4 days.', 'একটি দেয়াল রং করতে 4 দিন লাগে।'],
    ['The fraction painted in 1 day and 3 days.', '1 দিনে ও 3 দিনে রং করা অংশ।'],
    ['Find one day’s work, then multiply by the number of days.', 'এক দিনের কাজ বের করে দিনের সংখ্যা দিয়ে গুণ করি।'],
    [
      [r`1 day's work $= 1 \div 4 = \frac{1}{4}$ of the wall.`, r`1 দিনের কাজ $= 1 \div 4 = \frac{1}{4}$ দেয়াল।`],
      [r`In 3 days: $3 \times \frac{1}{4} = \frac{3}{4}$.`, r`3 দিনে: $3 \times \frac{1}{4} = \frac{3}{4}$।`],
    ],
    [r`$\frac{1}{4}$ in 1 day; $\frac{3}{4}$ in 3 days.`, r`1 দিনে $\frac{1}{4}$; 3 দিনে $\frac{3}{4}$।`],
    ['Four equal daily parts make the whole wall, so three days complete three of those four parts.', 'চার দিনের চারটি সমান অংশে পুরো দেয়াল হয়, তাই তিন দিনে তার তিনটি অংশ রং হয়।'],
  ),
  example(
    ['Mina finishes her homework in 2 hours. How much does she finish in half an hour?', 'মিনা 2 ঘণ্টায় বাড়ির কাজ শেষ করে। আধ ঘণ্টায় সে কাজের কতটা শেষ করে?'],
    ['The whole homework takes 2 hours; half an hour is 1/2 hour.', 'পুরো বাড়ির কাজ করতে 2 ঘণ্টা লাগে; আধ ঘণ্টা হল 1/2 ঘণ্টা।'],
    ['The fraction completed in 1/2 hour.', '1/2 ঘণ্টায় শেষ হওয়া অংশ।'],
    ['Work completed = time worked ÷ total time.', 'করা কাজ = কাজের সময় ÷ মোট সময়।'],
    [
      [r`Half an hour is $\frac{1}{2}$ hour.`, r`আধ ঘণ্টা $= \frac{1}{2}$ ঘণ্টা।`],
      [r`Fraction completed $= \frac{1}{2} \div 2 = \frac{1}{4}$.`, r`শেষ হওয়া অংশ $= \frac{1}{2} \div 2 = \frac{1}{4}$।`],
    ],
    [r`$\frac{1}{4}$ of the homework.`, r`বাড়ির কাজের $\frac{1}{4}$ অংশ।`],
    ['Half an hour is one quarter of 2 hours, and at a steady pace the same fraction of the work is done.', 'আধ ঘণ্টা 2 ঘণ্টার এক-চতুর্থাংশ; কাজের গতি একই থাকলে কাজেরও এক-চতুর্থাংশ শেষ হয়।'],
  ),
  example(
    ['A small pump fills a tank in 6 hours. What fraction of the tank does it fill in 2 hours?', 'একটি ছোট পাম্প 6 ঘণ্টায় একটি ট্যাংক ভরে। 2 ঘণ্টায় ট্যাংকের কত অংশ ভরবে?'],
    ['One full tank takes 6 hours; the pump runs for 2 hours.', 'একটি ট্যাংক ভরতে 6 ঘণ্টা লাগে; পাম্পটি 2 ঘণ্টা চলে।'],
    ['The fraction filled in 2 hours.', '2 ঘণ্টায় ভরা অংশ।'],
    ['Divide the working time by the time for the whole job.', 'কাজের সময়কে পুরো কাজের সময় দিয়ে ভাগ করি।'],
    [
      [r`One hour fills $\frac{1}{6}$ of the tank.`, r`1 ঘণ্টায় ট্যাংকের $\frac{1}{6}$ অংশ ভরে।`],
      [r`In 2 hours: $2 \times \frac{1}{6} = \frac{2}{6} = \frac{1}{3}$.`, r`2 ঘণ্টায়: $2 \times \frac{1}{6} = \frac{2}{6} = \frac{1}{3}$।`],
    ],
    [r`$\frac{1}{3}$ of the tank.`, r`ট্যাংকের $\frac{1}{3}$ অংশ।`],
    ['The pump does the same amount each hour, so two hours give two of the six equal parts.', 'পাম্পটি প্রতি ঘণ্টায় সমান কাজ করে, তাই 2 ঘণ্টায় ছয়টি সমান অংশের দুটি ভরে।'],
  ),
  example(
    ['A worker builds 2 identical garden beds in 6 days. At the same speed, how many days for 1 bed?', 'একজন শ্রমিক 6 দিনে একই মাপের 2টি বাগানের বেড বানায়। একই গতিতে 1টি বানাতে কত দিন লাগবে?'],
    ['2 equal beds take 6 days.', 'সমান 2টি বেড বানাতে 6 দিন লাগে।'],
    ['Time for 1 bed.', '1টি বেড বানানোর সময়।'],
    ['For equal work, divide the total time by the number of equal jobs.', 'সমান কাজের ক্ষেত্রে মোট সময়কে সমান কাজের সংখ্যা দিয়ে ভাগ করি।'],
    [
      [r`Each bed is half of the total work.`, r`প্রতিটি বেড মোট কাজের অর্ধেক।`],
      [r`Time for 1 bed $= 6 \div 2 = 3$ days.`, r`1টি বেডের সময় $= 6 \div 2 = 3$ দিন।`],
    ],
    ['3 days.', '3 দিন।'],
    ['The two beds are equal, so each takes half of the six days at the same pace.', 'দুটি বেড সমান, তাই একই গতিতে প্রতিটির জন্য 6 দিনের অর্ধেক সময় লাগে।'],
  ),
  example(
    ['A can paint a fence in 6 days and B in 3 days. How long together?', 'A 6 দিনে এবং B 3 দিনে একটি বেড়া রং করতে পারে। একসঙ্গে কত দিন লাগবে?'],
    ['A: 6 days alone; B: 3 days alone.', 'A একা 6 দিনে; B একা 3 দিনে।'],
    ['Time when both paint together.', 'দুজন একসঙ্গে রং করলে সময়।'],
    ['Add their one-day work, not their days.', 'তাদের এক দিনের কাজ যোগ করি, দিনসংখ্যা নয়।'],
    [
      [r`A does $\frac{1}{6}$ per day; B does $\frac{1}{3}$ per day.`, r`A দিনে $\frac{1}{6}$ করে; B দিনে $\frac{1}{3}$ করে।`],
      [r`Together: $\frac{1}{6}+\frac{1}{3}=\frac{1}{2}$ fence per day.`, r`একসঙ্গে: $\frac{1}{6}+\frac{1}{3}=\frac{1}{2}$ বেড়া প্রতিদিন।`],
      [r`Time $=1 \div \frac{1}{2}=2$ days.`, r`সময় $=1 \div \frac{1}{2}=2$ দিন।`],
    ],
    ['2 days.', '2 দিন।'],
    ['Together they paint half the fence each day, so two such days finish one fence.', 'দুজন মিলে প্রতিদিন বেড়ার অর্ধেক রং করে, তাই দুই দিনে একটি বেড়া শেষ হয়।'],
  ),
  example(
    ['A completes a job in 12 days and B in 18 days. How long working together?', 'A 12 দিনে ও B 18 দিনে একটি কাজ শেষ করে। একসঙ্গে করলে কত দিন লাগবে?'],
    ['A: 12 days; B: 18 days.', 'A: 12 দিন; B: 18 দিন।'],
    ['The number of days together.', 'একসঙ্গে কাজের দিনসংখ্যা।'],
    ['Use common work units to avoid adding unlike fractions.', 'ভিন্ন ভগ্নাংশের ঝামেলা এড়াতে মোট কাজের একক ধরি।'],
    [
      [r`LCM$(12,18)=36$ units of work. A does $36\div12=3$ units/day; B does $36\div18=2$.`, r`ল.সা.গু.$(12,18)=36$ কাজের একক। A দিনে $36\div12=3$ একক; B দিনে $36\div18=2$ একক করে।`],
      [r`Together they do $3+2=5$ units/day.`, r`একসঙ্গে দিনে $3+2=5$ একক কাজ করে।`],
      [r`Time $=36\div5=7\frac{1}{5}$ days.`, r`সময় $=36\div5=7\frac{1}{5}$ দিন।`],
    ],
    [r`$7\frac{1}{5}$ days (7.2 days).`, r`$7\frac{1}{5}$ দিন (7.2 দিন)।`],
    ['The total is 36 equal units, and a 5-unit daily pace needs 36 divided by 5 days.', 'মোট 36টি সমান একক কাজ; দিনে 5 একক করলে 36-কে 5 দিয়ে ভাগ করলেই দিনসংখ্যা পাওয়া যায়।'],
  ),
  example(
    ['A and B together finish a task in 4 days. A alone takes 6 days. How long would B alone take?', 'A ও B একসঙ্গে 4 দিনে কাজ শেষ করে। A একা 6 দিনে করে। B একা কত দিনে করবে?'],
    ['Together: 4 days; A alone: 6 days.', 'একসঙ্গে: 4 দিন; A একা: 6 দিন।'],
    ['B’s time alone.', 'B একা কাজটি করতে কত দিন নেবে।'],
    ['Subtract daily rates to find B’s one-day work.', 'B-র এক দিনের কাজ পেতে দৈনিক কাজের হার বিয়োগ করি।'],
    [
      [r`Together they do $\frac{1}{4}$ per day; A does $\frac{1}{6}$.`, r`একসঙ্গে দিনে $\frac{1}{4}$ কাজ; A দিনে $\frac{1}{6}$ কাজ করে।`],
      [r`B does $\frac{1}{4}-\frac{1}{6}=\frac{1}{12}$ per day.`, r`B দিনে করে $\frac{1}{4}-\frac{1}{6}=\frac{1}{12}$ কাজ।`],
      [r`So B needs $1\div\frac{1}{12}=12$ days.`, r`তাই B-র লাগে $1\div\frac{1}{12}=12$ দিন।`],
    ],
    ['12 days.', '12 দিন।'],
    ['The combined daily work is A’s part plus B’s part; taking away A leaves exactly B’s rate.', 'দুজনের দৈনিক কাজ হল A ও B-র কাজের যোগফল; সেখান থেকে A-র অংশ বাদ দিলে B-র কাজ থাকে।'],
  ),
  example(
    ['A can build a wall in 8 days and B in 12 days. They work together for 2 days; then A leaves. How many more days does B need?', 'A 8 দিনে ও B 12 দিনে একটি দেয়াল বানাতে পারে। তারা 2 দিন একসঙ্গে কাজ করে, তারপর A চলে যায়। B-র আর কত দিন লাগবে?'],
    ['A: 8 days; B: 12 days; together for 2 days.', 'A: 8 দিন; B: 12 দিন; একসঙ্গে 2 দিন কাজ।'],
    ['Extra days for B to finish the remainder.', 'বাকি কাজ শেষ করতে B-র অতিরিক্ত দিন।'],
    ['Count work in LCM units, then subtract completed work.', 'ল.সা.গু. এককে কাজ গুনে, করা কাজ বাদ দিই।'],
    [
      [r`Total work $=24$ units. A does $3$/day; B does $2$/day.`, r`মোট কাজ $=24$ একক। A দিনে $3$; B দিনে $2$ একক করে।`],
      [r`Together in 2 days: $(3+2)\times2=10$ units; remaining $=24-10=14$.`, r`2 দিনে একসঙ্গে: $(3+2)\times2=10$ একক; বাকি $=24-10=14$।`],
      [r`B alone needs $14\div2=7$ more days.`, r`B একা আরও $14\div2=7$ দিন নেবে।`],
    ],
    ['7 more days.', 'আরও 7 দিন।'],
    ['The first two days use both rates; after A leaves, only B’s daily rate can finish the remaining 14 units.', 'প্রথম 2 দিনে দুজনের কাজের হার লাগে; A চলে যাওয়ার পর বাকি 14 একক শুধু B-র দৈনিক কাজ দিয়ে শেষ হয়।'],
  ),
  example(
    ['A is twice as efficient as B. B alone finishes a job in 9 days. How long do they take together?', 'A, B-র দ্বিগুণ দক্ষ। B একা 9 দিনে একটি কাজ শেষ করে। দুজনে একসঙ্গে কত দিন নেবে?'],
    ['Efficiency A:B = 2:1; B alone: 9 days.', 'দক্ষতা A:B = 2:1; B একা: 9 দিন।'],
    ['Time for A and B together.', 'A ও B একসঙ্গে কাজের সময়।'],
    ['Turn the efficiency ratio into daily work units.', 'দক্ষতার অনুপাতকে দৈনিক কাজের এককে বদলাই।'],
    [
      [r`Let B do 1 unit/day; A does 2 units/day. Total work is $9\times1=9$ units.`, r`B দিনে 1 একক করলে A দিনে 2 একক করে। মোট কাজ $=9\times1=9$ একক।`],
      [r`Together they do $1+2=3$ units/day.`, r`একসঙ্গে দিনে $1+2=3$ একক করে।`],
      [r`Time $=9\div3=3$ days.`, r`সময় $=9\div3=3$ দিন।`],
    ],
    ['3 days.', '3 দিন।'],
    ['A’s speed is twice B’s, so the pair works at three B-units each day; nine units therefore take three days.', 'A-র গতি B-র দ্বিগুণ; তাই দুজন মিলে প্রতিদিন B-র তিন একক কাজ করে, 9 এককে 3 দিন লাগে।'],
  ),
  example(
    ['6 workers build a small house in 4 days, working 5 hours each day. How many days will 10 workers need at 6 hours each day?', '6 জন শ্রমিক প্রতিদিন 5 ঘণ্টা করে 4 দিনে একটি ছোট বাড়ি বানায়। 10 জন শ্রমিক প্রতিদিন 6 ঘণ্টা কাজ করলে কত দিন লাগবে?'],
    ['6 workers, 4 days, 5 hours/day; then 10 workers, 6 hours/day.', '6 জন, 4 দিন, প্রতিদিন 5 ঘণ্টা; এরপর 10 জন, প্রতিদিন 6 ঘণ্টা।'],
    ['The days needed for the same house.', 'একই বাড়ি বানাতে কত দিন লাগবে।'],
    ['For the same work, workers × hours × days stays equal.', 'একই কাজের জন্য শ্রমিক × ঘণ্টা × দিন সমান থাকে।'],
    [
      [r`Old work total $=6\times4\times5=120$ worker-hours.`, r`আগের মোট কাজ $=6\times4\times5=120$ শ্রমিক-ঘণ্টা।`],
      [r`New team completes $10\times6=60$ worker-hours each day.`, r`নতুন দল প্রতিদিন $10\times6=60$ শ্রমিক-ঘণ্টা কাজ করে।`],
      [r`Days $=120\div60=2$.`, r`দিন $=120\div60=2$।`],
    ],
    ['2 days.', '2 দিন।'],
    ['The job needs 120 worker-hours. The new group supplies 60 worker-hours per day, so it needs two days.', 'কাজটির জন্য 120 শ্রমিক-ঘণ্টা দরকার। নতুন দল দিনে 60 শ্রমিক-ঘণ্টা দেয়, তাই দুই দিন লাগে।'],
  ),
];

const strategy = {
  heading: t('Problem-Solving Strategy / How should I begin?', 'Problem-Solving Strategy / প্রথমে কীভাবে শুরু করব?'),
  sections: [
    {
      heading: t('1. Identify the story before calculating', '1. হিসাবের আগে প্রশ্নের ধরন চিনে নাও'),
      body: t(
        'Ask: Is one person alone, a team together, someone joining/leaving, alternating workers, a changed team size or hours, wages, or pairwise information given? Circle words such as **together**, **after**, **remaining**, **twice as efficient**, **per day**, **hours**, and **share**.',
        'নিজেকে জিজ্ঞেস করো: একজন একা কাজ করছে, দল একসঙ্গে করছে, কেউ পরে যোগ দিচ্ছে/চলে যাচ্ছে, পালা করে কাজ হচ্ছে, লোকসংখ্যা বা ঘণ্টা বদলাচ্ছে, মজুরি ভাগ হচ্ছে, নাকি জোড়ার কাজ দেওয়া আছে? **একসঙ্গে**, **পরে**, **বাকি**, **দ্বিগুণ দক্ষ**, **প্রতিদিন**, **ঘণ্টা**, **ভাগ**—এই শব্দগুলো চিহ্নিত করো।',
      ),
    },
    {
      heading: t('2. Write down what is known and what is asked', '2. কী জানা আছে আর কী জানতে চায় লিখে নাও'),
      body: t(
        'Make a tiny table: person/team, time, hours per day, work already done, and work remaining. Keep **total time** separate from **extra time after someone leaves**. Use one unit throughout (days or hours).',
        'ছোট একটি ছক করো: ব্যক্তি/দল, সময়, দিনে কাজের ঘণ্টা, করা কাজ, বাকি কাজ। **মোট সময়** আর **কেউ চলে যাওয়ার পর অতিরিক্ত সময়** আলাদা রাখো। শুরু থেকে শেষ পর্যন্ত একই একক (দিন বা ঘণ্টা) ব্যবহার করো।',
      ),
    },
    {
      heading: t('3. Choose the method that fits', '3. প্রশ্নের সঙ্গে মানানসই পদ্ধতি বেছে নাও'),
      body: t(
        '- One worker: rate $=1/\\text{days}$; time $=\\text{work}/\\text{rate}$.\n- Team together: add daily rates.\n- Find a missing worker: subtract known rates from the team rate.\n- Fractions awkward: choose total work as the LCM and use units.\n- Workers or hours change: compare worker-hours; for equal worker efficiency, work $\\propto M\\times H\\times D$.\n- Someone joins/leaves or work is staged: split the timeline into phases and account for each phase separately.\n- Efficiency ratio: use the ratio as daily work units.\n- Wages: divide in proportion to actual work done, not automatically by days.',
        '- একজন শ্রমিক: কাজের হার $=1/\\text{দিন}$; সময় $=\\text{কাজ}/\\text{হার}$।\n- দল একসঙ্গে: দৈনিক কাজের হার যোগ করো।\n- একজনের হার অজানা: দলের হার থেকে জানা হার বিয়োগ করো।\n- ভগ্নাংশ কঠিন: মোট কাজ দিনগুলোর ল.সা.গু. একক ধরো।\n- শ্রমিক বা ঘণ্টা বদলালে: শ্রমিক-ঘণ্টা তুলনা করো; শ্রমিকের দক্ষতা সমান হলে কাজ $\\propto M\\times H\\times D$।\n- কেউ যোগ/চলে গেলে বা কাজ ধাপে হলে: সময়কে ভাগ করে প্রতিটি ধাপের কাজ আলাদা হিসাব করো।\n- দক্ষতার অনুপাত: অনুপাতকে দৈনিক কাজের একক ধরো।\n- মজুরি: প্রকৃত করা কাজের অনুপাতে ভাগ করো; শুধু দিনসংখ্যা দেখে নয়।',
      ),
    },
    {
      heading: t('4. Five useful methods—and when to use them', '4. পাঁচটি পদ্ধতি—কখন কোনটি নেবে'),
      body: t(
        '**Standard rate method:** write each person’s rate as $1/t$, add or subtract rates, then divide the remaining work by the rate. It works for nearly every case, but fractions may be untidy.\n\n**Unit-work method:** choose a convenient total such as 1 job or 1,000 pieces. It makes the meaning clear and is useful for partial work; choose a total divisible by the given times when possible.\n\n**LCM method:** set total units to the LCM of the times. Daily rates become whole numbers. It is quick for integer day counts, but a large LCM can be cumbersome.\n\n**Efficiency-ratio method:** if speeds are in ratio $a:b$, use daily rates $a$ and $b$. It is best when the ratio is given; do not confuse speed ratio with time ratio.\n\n**Exam shortcut:** for two people taking $x$ and $y$ days, together time is $xy/(x+y)$. Use only when both start together, work at steady rates, and do the same job. Do not use it for join/leave, alternating days, or changing efficiency.',
        '**সাধারণ হার পদ্ধতি:** প্রত্যেকের হার $1/t$ লেখো; হার যোগ বা বিয়োগ করে বাকি কাজকে হার দিয়ে ভাগ করো। প্রায় সব প্রশ্নে চলে, তবে ভগ্নাংশ জটিল হতে পারে।\n\n**একক-কাজ পদ্ধতি:** মোট কাজ 1টি কাজ বা 1,000টি অংশ ধরো। অর্থ বোঝা সহজ; আংশিক কাজের জন্য ভালো। সম্ভব হলে দেওয়া সময় দিয়ে বিভাজ্য মোট একক বেছে নাও।\n\n**ল.সা.গু. পদ্ধতি:** মোট কাজ দিনগুলোর ল.সা.গু. একক ধরো। দৈনিক হার পূর্ণসংখ্যা হয়। দিনের সংখ্যা পূর্ণ হলে দ্রুত; ল.সা.গু. খুব বড় হলে ঝামেলা হতে পারে।\n\n**দক্ষতার অনুপাত পদ্ধতি:** গতি $a:b$ হলে দৈনিক হার $a$ ও $b$ একক ধরো। দক্ষতার অনুপাত দেওয়া থাকলে সুবিধা; গতি ও সময়ের অনুপাত গুলিয়ে ফেলো না।\n\n**পরীক্ষার শর্টকাট:** দুজন একসঙ্গে স্থির গতিতে একই কাজ করলে, একার সময় $x,y$ দিন হলে একসঙ্গে সময় $xy/(x+y)$। কেউ যোগ/চলে গেলে, পালা করে কাজ করলে বা দক্ষতা বদলালে এই শর্টকাট ব্যবহার কোরো না।',
      ),
    },
    {
      heading: t('5. Decision guide', '5. কোন পদ্ধতি নেব—দ্রুত সিদ্ধান্ত'),
      body: t(
        '| What the question says | Start with |\n| --- | --- |\n| “A alone takes …” | Rate $1/t$ |\n| “A and B together” | Add rates; use LCM if helpful |\n| “Together time and A’s time” | Subtract rates to find B |\n| “A works for … then leaves” | Phase 1 work, remainder, phase 2 rate |\n| “A is twice as efficient” | Efficiency ratio $2:1$ |\n| “Workers/hours change” | $M\\times H\\times D$ for the same job |\n| “Every other day” | Two-day cycle, then handle the leftover day |\n| “Wages/share” | Work done by each person ÷ total work |\n| “Pairs A+B, B+C, C+A” | Add pair rates; each individual rate is counted twice |\n\n**Check:** together time must be less than the fastest person’s solo time. Work remaining must be between 0 and the total. If the answer violates these checks, revisit the rates or the phase count.',
        '| প্রশ্নে কী আছে | কী দিয়ে শুরু করবে |\n| --- | --- |\n| “A একা … দিনে করে” | হার $1/t$ |\n| “A ও B একসঙ্গে” | হার যোগ; দরকারে ল.সা.গু. একক |\n| “একসঙ্গে ও A-র সময় দেওয়া” | হার বিয়োগ করে B বের করো |\n| “A … দিন কাজ করে চলে যায়” | প্রথম ধাপের কাজ, বাকি কাজ, পরের ধাপের হার |\n| “A দ্বিগুণ দক্ষ” | দক্ষতার অনুপাত $2:1$ |\n| “শ্রমিক/ঘণ্টা বদলায়” | একই কাজের জন্য $M\\times H\\times D$ |\n| “একদিন অন্তর” | দুই দিনের চক্র; শেষে বাকি দিন হিসাব |\n| “মজুরি/ভাগ” | প্রত্যেকের কাজ ÷ মোট কাজ |\n| “A+B, B+C, C+A জোড়া” | জোড়ার হার যোগ; প্রত্যেকের হার দুবার আছে |\n\n**যাচাই:** একসঙ্গে সময় দ্রুততম ব্যক্তির একার সময়ের চেয়ে কম হবে। বাকি কাজ 0 থেকে মোট কাজের মধ্যে থাকবে। উত্তর এ শর্ত ভাঙলে হার বা ধাপের হিসাব আবার দেখো।',
      ),
    },
    {
      heading: t('6. Avoid traps and save time safely', '6. ভুল এড়িয়ে নিরাপদে সময় বাঁচাও'),
      body: t(
        'Never add days when people work together; add their **rates**. Efficiency and time move in opposite directions. In a join/leave question, do not apply the team rate to the whole job. Count only the days actually worked in each phase. A shortcut is safe only when its assumptions match the wording. Under exam time pressure, write the rate line first, cancel common factors before multiplying, and estimate whether the answer should be faster or slower.',
        'একসঙ্গে কাজের সময় দিন যোগ কোরো না; **কাজের হার** যোগ করো। দক্ষতা বাড়লে সময় কমে। কেউ যোগ/চলে যাওয়ার প্রশ্নে পুরো কাজের জন্য দলের হার ব্যবহার কোরো না; প্রতিটি ধাপে যত দিন কাজ হয়েছে শুধু সেটাই ধরো। প্রশ্নের শর্ত মিললেই শর্টকাট নিরাপদ। পরীক্ষায় আগে হারের লাইন লেখো, গুণের আগে সাধারণ গুণনীয়ক কাটো, আর উত্তর কম না বেশি হওয়া উচিত আন্দাজ করো।',
      ),
    },
  ],
};

const practice = {
  question: t(
    'A can paint a room in 8 days. B can paint it in 8 days too. How much of the room do they paint together in 2 days?',
    'A 8 দিনে একটি ঘর রং করে। B-রও 8 দিন লাগে। দুজনে একসঙ্গে 2 দিনে ঘরের কত অংশ রং করবে?',
  ),
  steps: [
    t(r`Each paints $\frac{1}{8}$ per day, so together they paint $\frac{2}{8}=\frac{1}{4}$ per day.`, r`প্রত্যেকে দিনে $\frac{1}{8}$ করে, তাই একসঙ্গে দিনে $\frac{2}{8}=\frac{1}{4}$ করে।`),
    t(r`In 2 days they paint $2\times\frac{1}{4}=\frac{1}{2}$ of the room.`, r`2 দিনে তারা $2\times\frac{1}{4}=\frac{1}{2}$ ঘর রং করে।`),
  ],
  answer: t(r`$\frac{1}{2}$ of the room.`, r`ঘরের $\frac{1}{2}$ অংশ।`),
};

module.exports = { examples, practice, strategy };
