'use strict';

// Lesson: Time, Speed & Distance. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });
const solved = (question, given, find, method, steps, answer, why) => ({
  question: t(question[0], question[1]),
  given: t(given[0], given[1]),
  find: t(find[0], find[1]),
  method: t(method[0], method[1]),
  steps: steps.map(([en, bn]) => t(en, bn)),
  answer: t(answer[0], answer[1]),
  why: t(why[0], why[1]),
});

module.exports = {
  subject: 'quant',
  topic: 'time_speed_distance',
  title: t('Time, Speed & Distance', 'সময়, গতি ও দূরত্ব'),
  emoji: '🚆',
  intro: t(
    'This chapter is about how fast things move and how far they go. Every bus ride, train journey or cricket ball has a speed, a distance and a time, and if you know two of them you can find the third.',
    'কোনো কিছু কত জোরে চলে আর কত দূর যায়, এই অধ্যায় তা নিয়েই। প্রতিটি বাসযাত্রা, ট্রেনযাত্রা বা ক্রিকেট বলের একটা গতি, দূরত্ব আর সময় থাকে; এর যে-কোনো দুটো জানলে তৃতীয়টা বার করা যায়।',
  ),
  strategy: {
    heading: t('A beginner’s decision guide', 'নতুনদের সিদ্ধান্ত নেওয়ার সহজ কৌশল'),
    sections: [
      { heading: t('1. Mark the known quantities', '1. জানা পরিমাণগুলো চিহ্নিত করো'), body: t('Write distance (D), speed (S), and time (T), then mark what the question asks. This tells you which of the three formulas to use.', 'দূরত্ব (D), গতি (S) ও সময় (T) লিখে প্রশ্নে কোনটি চেয়েছে চিহ্নিত করো। এতে তিনটি সূত্রের কোনটি লাগবে বোঝা যায়।') },
      { heading: t('2. Choose the matching formula', '2. উপযুক্ত সূত্র বেছে নাও'), body: t('Use D = S × T for distance, S = D ÷ T for speed, and T = D ÷ S for time. Check that the units fit the formula.', 'দূরত্বে D = S × T, গতিতে S = D ÷ T এবং সময়ে T = D ÷ S ব্যবহার করো। সূত্রের এককগুলো মিলছে কি না দেখো।') },
      { heading: t('3. Convert units before calculating', '3. হিসাবের আগে একক বদলাও'), body: t('For km/h use kilometres and hours; for m/s use metres and seconds. Convert minutes to hours or km/h to m/s before substituting if needed.', 'কিমি/ঘণ্টার সঙ্গে কিলোমিটার ও ঘণ্টা, মি/সে-র সঙ্গে মিটার ও সেকেন্ড নাও। দরকার হলে বসানোর আগে মিনিটকে ঘণ্টায় বা কিমি/ঘণ্টাকে মি/সে-তে বদলাও।') },
      { heading: t('4. Read the journey carefully', '4. যাত্রার বর্ণনা মন দিয়ে পড়ো'), body: t('For a whole trip, split it into parts when speed changes. Find each part’s time or distance separately, then combine the matching quantities.', 'পুরো যাত্রায় গতি বদলালে যাত্রাকে ভাগ করো। প্রতিটি অংশের সময় বা দূরত্ব আলাদা বের করে একই ধরনের পরিমাণ যোগ করো।') },
      { heading: t('5. Take care with average speed', '5. গড় গতিতে সতর্ক থাকো'), body: t('Average speed is total distance divided by total time. Do not simply average two speeds unless the times spent at them are equal.', 'গড় গতি = মোট দূরত্ব ÷ মোট সময়। দুই গতিতে সময় সমান না হলে শুধু দুই গতির গড় নিও না।') },
      { heading: t('6. Check units and reasonableness', '6. একক ও যুক্তি যাচাই করো'), body: t('Distance should have a distance unit, time a time unit and speed a distance-per-time unit. A faster speed over the same time should give a greater distance.', 'দূরত্বের একক দূরত্ব, সময়ের একক সময় এবং গতির একক দূরত্ব-প্রতি-সময় হবে। একই সময়ে বেশি গতিতে বেশি দূরত্ব যাওয়ার কথা।') },
    ],
  },
  practice: {
    question: t('A cyclist covers 96 km in 1.5 hours. Find the speed.', 'একজন সাইকেল আরোহী 1.5 ঘণ্টায় 96 কিমি যায়। তার গতি কত?'),
    steps: [
      t('Speed = distance ÷ time = 96 ÷ 1.5.', 'গতি = দূরত্ব ÷ সময় = 96 ÷ 1.5।'),
      t('96 ÷ 1.5 = 960 ÷ 15 = 64 km/h.', '96 ÷ 1.5 = 960 ÷ 15 = 64 কিমি/ঘণ্টা।'),
    ],
    answer: t('64 km/h.', '64 কিমি/ঘণ্টা।'),
  },
  levels: [
    {
      level: 'basic',
      sections: [
        {
          heading: t('What is speed?', 'গতি কী?'),
          body: t(
            r`**Speed** tells us how much distance is covered in one unit of time.

- If a bus goes $40$ km in $1$ hour, its speed is $40$ **km/h** (kilometres per hour).
- **Distance** is how far you go. **Time** is how long you take.
- A faster bus covers more distance in the same time.`,
            r`**গতি** (বেগ) বলে দেয় এক একক সময়ে কতটা দূরত্ব যাওয়া হয়।

- একটা বাস $1$ ঘণ্টায় $40$ কিমি গেলে তার গতি $40$ **কিমি/ঘণ্টা** (ঘণ্টায় কিলোমিটার)।
- **দূরত্ব** মানে কতটা পথ গেলে। **সময়** মানে কতক্ষণ লাগল।
- যে বাস বেশি জোরে চলে, সে একই সময়ে বেশি পথ যায়।`,
          ),
        },
        {
          heading: t('The one formula you need', 'একটাই সূত্র মনে রাখো'),
          body: t(
            r`$$\text{Distance} = \text{Speed} \times \text{Time}$$

Move the parts around to get the other two:

- $\text{Speed} = \dfrac{\text{Distance}}{\text{Time}}$
- $\text{Time} = \dfrac{\text{Distance}}{\text{Speed}}$

**Why?** If you go $40$ km every hour for $3$ hours, you go $40 + 40 + 40 = 40 \times 3 = 120$ km.`,
            r`$$\text{দূরত্ব} = \text{গতি} \times \text{সময়}$$

এটাকে সাজিয়ে নিলেই বাকি দুটো পাওয়া যায়:

- $\text{গতি} = \dfrac{\text{দূরত্ব}}{\text{সময়}}$
- $\text{সময়} = \dfrac{\text{দূরত্ব}}{\text{গতি}}$

**কেন?** প্রতি ঘণ্টায় $40$ কিমি করে $3$ ঘণ্টা গেলে মোট যাও $40 + 40 + 40 = 40 \times 3 = 120$ কিমি।`,
          ),
        },
        {
          heading: t('Keep the units matching', 'এককগুলো মিলিয়ে রাখো'),
          body: t(
            r`- Speed in km/h goes with distance in **km** and time in **hours**.
- Speed in m/s (metres per second) goes with **metres** and **seconds**.
- Half an hour $= 0.5$ hour, $30$ minutes $= \frac{30}{60} = 0.5$ hour, $2$ h $30$ min $= 2.5$ hours.`,
            r`- গতি কিমি/ঘণ্টায় থাকলে দূরত্ব **কিমি** আর সময় **ঘণ্টায়** নিতে হবে।
- গতি মি/সে (সেকেন্ডে মিটার) হলে দূরত্ব **মিটারে** আর সময় **সেকেন্ডে**।
- আধ ঘণ্টা $= 0.5$ ঘণ্টা, $30$ মিনিট $= \frac{30}{60} = 0.5$ ঘণ্টা, $2$ ঘণ্টা $30$ মিনিট $= 2.5$ ঘণ্টা।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'Rahul cycles at 12 km/h for 2 hours. How far does he go?',
            'রাহুল ঘণ্টায় 12 কিমি বেগে 2 ঘণ্টা সাইকেল চালাল। সে কত দূর গেল?',
          ),
          given: t('Speed = 12 km/h; time = 2 h.', 'গতি = 12 কিমি/ঘণ্টা; সময় = 2 ঘণ্টা।'),
          find: t('Distance travelled.', 'অতিক্রান্ত দূরত্ব।'),
          method: t('Multiply speed by time using D = S × T.', 'D = S × T সূত্রে গতি ও সময় গুণ করি।'),
          steps: [
            t(r`Distance $=$ Speed $\times$ Time.`, r`দূরত্ব $=$ গতি $\times$ সময়।`),
            t(r`$12 \times 2 = 24$ km.`, r`$12 \times 2 = 24$ কিমি।`),
          ],
          answer: t('24 km', '24 কিমি'),
          why: t('At 12 km each hour for 2 hours, the cyclist covers two groups of 12 km.', 'প্রতি ঘণ্টায় 12 কিমি করে 2 ঘণ্টায় সাইকেল আরোহী 12 কিমির দুটি অংশ যায়।'),
        },
        {
          question: t(
            'A car travels at 25 km/h for 3.5 hours. What distance does it cover?',
            'একটা গাড়ি ঘণ্টায় 25 কিমি বেগে 3.5 ঘণ্টা চলল। গাড়িটা কত দূরত্ব গেল?',
          ),
          given: t('Speed = 25 km/h; time = 3.5 h.', 'গতি = 25 কিমি/ঘণ্টা; সময় = 3.5 ঘণ্টা।'),
          find: t('Distance travelled.', 'অতিক্রান্ত দূরত্ব।'),
          method: t('Multiply speed by time, splitting the decimal time if helpful.', 'গতি ও সময় গুণ করি; দরকার হলে দশমিক সময়কে ভাগ করি।'),
          steps: [
            t(r`Distance $= 25 \times 3.5$.`, r`দূরত্ব $= 25 \times 3.5$।`),
            t(r`$25 \times 3 = 75$ and $25 \times 0.5 = 12.5$, so total $= 75 + 12.5 = 87.5$ km.`, r`$25 \times 3 = 75$ আর $25 \times 0.5 = 12.5$, তাই মোট $= 75 + 12.5 = 87.5$ কিমি।`),
          ],
          answer: t('87.5 km', '87.5 কিমি'),
          why: t('The distance is the 25 km travelled in each hour added over 3.5 hours.', '3.5 ঘণ্টার প্রতিটি ঘণ্টায় যাওয়া 25 কিমি দূরত্ব যোগ করলেই মোট দূরত্ব হয়।'),
        },
        {
          question: t(
            'Mina walks 6 km to her grandmother\'s house in 2 hours. What is her speed?',
            'মিনা 2 ঘণ্টায় 6 কিমি হেঁটে দিদিমার বাড়ি গেল। তার গতি কত?',
          ),
          given: t('Distance = 6 km; time = 2 h.', 'দূরত্ব = 6 কিমি; সময় = 2 ঘণ্টা।'),
          find: t('Speed.', 'গতি।'),
          method: t('Divide distance by time using S = D ÷ T.', 'S = D ÷ T সূত্রে দূরত্বকে সময় দিয়ে ভাগ করি।'),
          steps: [
            t(r`Speed $= \dfrac{\text{Distance}}{\text{Time}} = \dfrac{6}{2}$.`, r`গতি $= \dfrac{\text{দূরত্ব}}{\text{সময়}} = \dfrac{6}{2}$।`),
            t(r`$= 3$ km/h.`, r`অর্থাৎ $3$ কিমি/ঘণ্টা।`),
          ],
          answer: t('3 km/h', '3 কিমি/ঘণ্টা'),
          why: t('The 6 km is shared equally across 2 hours, so 3 km is covered each hour.', '6 কিমি দূরত্ব 2 ঘণ্টায় সমানভাবে ভাগ হলে প্রতি ঘণ্টায় 3 কিমি হয়।'),
        },
        solved(
          ['A bus travels 150 km at 50 km/h. How long does the journey take?', 'একটি বাস ঘণ্টায় 50 কিমি বেগে 150 কিমি যায়। যাত্রায় কত সময় লাগে?'],
          ['Distance = 150 km; speed = 50 km/h.', 'দূরত্ব = 150 কিমি; গতি = 50 কিমি/ঘণ্টা।'],
          ['Travel time.', 'যাত্রার সময়।'],
          ['Divide distance by speed: T = D ÷ S.', 'দূরত্বকে গতি দিয়ে ভাগ করি: T = D ÷ S।'],
          [['Time = 150 ÷ 50 = 3.', 'সময় = 150 ÷ 50 = 3।'], ['The units are km ÷ (km/h) = h, so the time is 3 hours.', 'একক কিমি ÷ (কিমি/ঘণ্টা) = ঘণ্টা, তাই সময় 3 ঘণ্টা।']],
          ['3 hours.', '3 ঘণ্টা।'],
          ['At 50 km each hour, three hours cover 50 × 3 = 150 km.', 'প্রতি ঘণ্টায় 50 কিমি হলে 3 ঘণ্টায় 50 × 3 = 150 কিমি যায়।'],
        ),
        solved(
          ['A train covers 180 km in 4 hours. Find its speed.', 'একটি ট্রেন 4 ঘণ্টায় 180 কিমি যায়। তার গতি কত?'],
          ['Distance = 180 km; time = 4 h.', 'দূরত্ব = 180 কিমি; সময় = 4 ঘণ্টা।'],
          ['Speed in km/h.', 'কিমি/ঘণ্টায় গতি।'],
          ['Divide distance by time: S = D ÷ T.', 'দূরত্বকে সময় দিয়ে ভাগ করি: S = D ÷ T।'],
          [['Speed = 180 ÷ 4.', 'গতি = 180 ÷ 4।'], ['Speed = 45 km/h.', 'গতি = 45 কিমি/ঘণ্টা।']],
          ['45 km/h.', '45 কিমি/ঘণ্টা।'],
          ['Four equal hours at 45 km/h give 4 × 45 = 180 km.', '45 কিমি/ঘণ্টা করে চার ঘণ্টায় 4 × 45 = 180 কিমি হয়।'],
        ),
        solved(
          ['Convert 72 km/h to metres per second.', '72 কিমি/ঘণ্টাকে মিটার প্রতি সেকেন্ডে বদলাও।'],
          ['Speed = 72 km/h.', 'গতি = 72 কিমি/ঘণ্টা।'],
          ['Speed in m/s.', 'মি/সে-তে গতি।'],
          ['Multiply km/h by 5/18 to convert to m/s.', 'কিমি/ঘণ্টাকে মি/সে-তে বদলাতে 5/18 দিয়ে গুণ করি।'],
          [['Use 1 km = 1000 m and 1 h = 3600 s, so 1 km/h = 5/18 m/s.', '1 কিমি = 1000 মিটার এবং 1 ঘণ্টা = 3600 সেকেন্ড, তাই 1 কিমি/ঘণ্টা = 5/18 মি/সে।'], ['72 × 5/18 = 4 × 5 = 20 m/s.', '72 × 5/18 = 4 × 5 = 20 মি/সে।']],
          ['20 m/s.', '20 মি/সে।'],
          ['The conversion factor changes both the distance and time units while preserving the actual speed.', 'রূপান্তর গুণক দূরত্ব ও সময়ের একক বদলায়, কিন্তু প্রকৃত গতি একই রাখে।'],
        ),
        solved(
          ['Convert 15 m/s to kilometres per hour.', '15 মি/সেকে কিলোমিটার প্রতি ঘণ্টায় বদলাও।'],
          ['Speed = 15 m/s.', 'গতি = 15 মি/সে।'],
          ['Speed in km/h.', 'কিমি/ঘণ্টায় গতি।'],
          ['Multiply m/s by 18/5 to convert to km/h.', 'মি/সেকে 18/5 দিয়ে গুণ করে কিমি/ঘণ্টায় বদলাই।'],
          [['Use 1 m/s = 18/5 km/h.', '1 মি/সে = 18/5 কিমি/ঘণ্টা ব্যবহার করি।'], ['15 × 18/5 = 3 × 18 = 54 km/h.', '15 × 18/5 = 3 × 18 = 54 কিমি/ঘণ্টা।']],
          ['54 km/h.', '54 কিমি/ঘণ্টা।'],
          ['The inverse conversion factor restores kilometres and hours as the units.', 'উল্টো রূপান্তর গুণকে একক কিলোমিটার ও ঘণ্টায় ফিরে আসে।'],
        ),
        solved(
          ['A car travels at 60 km/h for 2 hours 30 minutes. Find the distance.', 'একটি গাড়ি ঘণ্টায় 60 কিমি বেগে 2 ঘণ্টা 30 মিনিট চলে। দূরত্ব কত?'],
          ['Speed = 60 km/h; time = 2 h 30 min.', 'গতি = 60 কিমি/ঘণ্টা; সময় = 2 ঘণ্টা 30 মিনিট।'],
          ['Distance travelled.', 'অতিক্রান্ত দূরত্ব।'],
          ['Convert time to hours, then use D = S × T.', 'সময়কে ঘণ্টায় বদলে D = S × T ব্যবহার করি।'],
          [['2 h 30 min = 2 + 30/60 = 2.5 h.', '2 ঘণ্টা 30 মিনিট = 2 + 30/60 = 2.5 ঘণ্টা।'], ['Distance = 60 × 2.5 = 150 km.', 'দূরত্ব = 60 × 2.5 = 150 কিমি।']],
          ['150 km.', '150 কিমি।'],
          ['The speed is per hour, so the time must be in hours for the units to match.', 'গতি ঘণ্টাপ্রতি, তাই একক মেলাতে সময় ঘণ্টায় নিতে হয়।'],
        ),
        solved(
          ['A traveller goes 40 km at 40 km/h and returns the same 40 km at 60 km/h. Find the average speed.', 'একজন 40 কিমি পথ 40 কিমি/ঘণ্টায় যায় এবং একই 40 কিমি পথ 60 কিমি/ঘণ্টায় ফেরে। গড় গতি কত?'],
          ['Outward: 40 km at 40 km/h; return: 40 km at 60 km/h.', 'যাওয়া: 40 কিমি, গতি 40 কিমি/ঘণ্টা; ফেরা: 40 কিমি, গতি 60 কিমি/ঘণ্টা।'],
          ['Average speed for the complete trip.', 'পুরো যাত্রার গড় গতি।'],
          ['Average speed = total distance ÷ total time.', 'গড় গতি = মোট দূরত্ব ÷ মোট সময়।'],
          [['Total distance = 40 + 40 = 80 km; time = 40/40 + 40/60 = 1 + 2/3 = 5/3 h.', 'মোট দূরত্ব = 40 + 40 = 80 কিমি; সময় = 40/40 + 40/60 = 1 + 2/3 = 5/3 ঘণ্টা।'], ['Average speed = 80 ÷ (5/3) = 80 × 3/5 = 48 km/h.', 'গড় গতি = 80 ÷ (5/3) = 80 × 3/5 = 48 কিমি/ঘণ্টা।']],
          ['48 km/h.', '48 কিমি/ঘণ্টা।'],
          ['The average uses total distance and total time; it is not the simple mean of 40 and 60.', 'গড়ে মোট দূরত্ব ও মোট সময় লাগে; 40 ও 60-এর সাধারণ গড় নয়।'],
        ),
        solved(
          ['A 180 m train moves at 18 m/s. How long does it take to pass a pole?', '180 মিটার লম্বা একটি ট্রেন 18 মি/সে বেগে চলে। একটি খুঁটি পার হতে কত সময় লাগে?'],
          ['Train length = 180 m; speed = 18 m/s.', 'ট্রেনের দৈর্ঘ্য = 180 মিটার; গতি = 18 মি/সে।'],
          ['Time to pass the pole.', 'খুঁটিটি পার হওয়ার সময়।'],
          ['To clear a pole, the train travels its own length; use T = D ÷ S.', 'খুঁটি পুরো পার হতে ট্রেনটি নিজের দৈর্ঘ্যের সমান পথ যায়; T = D ÷ S ব্যবহার করি।'],
          [['Distance to pass the pole = 180 m.', 'খুঁটি পার হওয়ার দূরত্ব = 180 মিটার।'], ['Time = 180 ÷ 18 = 10 s.', 'সময় = 180 ÷ 18 = 10 সেকেন্ড।']],
          ['10 seconds.', '10 সেকেন্ড।'],
          ['The pole is treated as a point, so the whole 180 m train must move past it.', 'খুঁটিকে একটি বিন্দু ধরা হয়, তাই 180 মিটার লম্বা পুরো ট্রেনটিকেই সেটি পার হতে হয়।'],
        ),
      ],
    },
    {
      level: 'intermediate',
      sections: [
        {
          heading: t('Changing km/h into m/s', 'কিমি/ঘণ্টাকে মি/সে-তে বদলানো'),
          body: t(
            r`Train questions give speed in km/h but lengths in metres and time in seconds, so we convert.

- $1$ km $= 1000$ m and $1$ hour $= 3600$ s, so $1$ km/h $= \frac{1000}{3600} = \frac{5}{18}$ m/s.
- **km/h to m/s:** multiply by $\frac{5}{18}$. Example: $36$ km/h $= 36 \times \frac{5}{18} = 10$ m/s.
- **m/s to km/h:** multiply by $\frac{18}{5}$. Example: $20$ m/s $= 72$ km/h.`,
            r`ট্রেনের অঙ্কে গতি দেওয়া থাকে কিমি/ঘণ্টায়, কিন্তু দৈর্ঘ্য মিটারে আর সময় সেকেন্ডে। তাই একক বদলাতে হয়।

- $1$ কিমি $= 1000$ মি এবং $1$ ঘণ্টা $= 3600$ সেকেন্ড, তাই $1$ কিমি/ঘণ্টা $= \frac{1000}{3600} = \frac{5}{18}$ মি/সে।
- **কিমি/ঘণ্টা থেকে মি/সে:** $\frac{5}{18}$ দিয়ে গুণ করো। যেমন: $36$ কিমি/ঘণ্টা $= 36 \times \frac{5}{18} = 10$ মি/সে।
- **মি/সে থেকে কিমি/ঘণ্টা:** $\frac{18}{5}$ দিয়ে গুণ করো। যেমন: $20$ মি/সে $= 72$ কিমি/ঘণ্টা।`,
          ),
        },
        {
          heading: t('Trains crossing a pole or a platform', 'ট্রেনের খুঁটি বা প্ল্যাটফর্ম পার হওয়া'),
          body: t(
            r`A train is long, so "crossing" means the **whole train** must pass.

- **Pole** (or a standing man): the pole is like a point, so distance $=$ **length of the train**.
- **Platform** (or a bridge): the train must cover its own length **plus** the platform's length.
- So: time $= \dfrac{\text{train length} + \text{platform length}}{\text{speed}}$.`,
            r`ট্রেন লম্বা, তাই "পার হওয়া" মানে **পুরো ট্রেনটাকে** পেরিয়ে যেতে হবে।

- **খুঁটি** (বা দাঁড়িয়ে থাকা মানুষ): খুঁটি একটা বিন্দুর মতো, তাই দূরত্ব $=$ **ট্রেনের দৈর্ঘ্য**।
- **প্ল্যাটফর্ম** (বা সেতু): ট্রেনকে নিজের দৈর্ঘ্য **আর** প্ল্যাটফর্মের দৈর্ঘ্য দুটোই পেরোতে হবে।
- তাই: সময় $= \dfrac{\text{ট্রেনের দৈর্ঘ্য} + \text{প্ল্যাটফর্মের দৈর্ঘ্য}}{\text{গতি}}$।`,
          ),
        },
        {
          heading: t('Moving towards each other: relative speed', 'মুখোমুখি চলা: আপেক্ষিক গতি'),
          body: t(
            r`**Relative speed** is how fast the gap between two moving things changes.

- **Towards each other** (opposite directions): the gap closes faster, so **add** the speeds.
- **Same direction**: one is chasing the other, so **subtract** the speeds.
- Two cars $156$ km apart, at $20$ and $32$ km/h towards each other, close the gap at $52$ km/h and meet after $156 \div 52 = 3$ hours.`,
            r`**আপেক্ষিক গতি** মানে দুটো চলমান জিনিসের মধ্যের দূরত্ব কত তাড়াতাড়ি বদলাচ্ছে।

- **মুখোমুখি** (বিপরীত দিকে) চললে: ফাঁক তাড়াতাড়ি কমে, তাই গতি **যোগ** করো।
- **একই দিকে** চললে: একজন অন্যজনকে ধাওয়া করছে, তাই গতি **বিয়োগ** করো।
- $156$ কিমি দূরের দুটো গাড়ি $20$ ও $32$ কিমি/ঘণ্টায় মুখোমুখি এলে ফাঁক কমে ঘণ্টায় $52$ কিমি করে, তাই দেখা হয় $156 \div 52 = 3$ ঘণ্টা পরে।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'A train running at 36 km/h crosses a pole in 24 seconds. What is the length of the train?',
            'ঘণ্টায় 36 কিমি বেগে চলা একটা ট্রেন 24 সেকেন্ডে একটা খুঁটি পার হয়। ট্রেনটার দৈর্ঘ্য কত?',
          ),
          steps: [
            t(r`Speed $= 36 \times \frac{5}{18} = 10$ m/s.`, r`গতি $= 36 \times \frac{5}{18} = 10$ মি/সে।`),
            t(r`Crossing a pole: length $=$ speed $\times$ time $= 10 \times 24 = 240$ m.`, r`খুঁটি পার হলে: দৈর্ঘ্য $=$ গতি $\times$ সময় $= 10 \times 24 = 240$ মি।`),
          ],
          answer: t('240 m', '240 মিটার'),
        },
        {
          question: t(
            'Two towns are 672 km apart. Two cars start from them at the same time towards each other at 27 km/h and 57 km/h. After how many hours will they meet?',
            'দুটো শহরের দূরত্ব 672 কিমি। দুই শহর থেকে একই সময়ে দুটো গাড়ি 27 কিমি/ঘণ্টা ও 57 কিমি/ঘণ্টা বেগে পরস্পরের দিকে রওনা দিল। কত ঘণ্টা পরে তাদের দেখা হবে?',
          ),
          steps: [
            t(r`Towards each other, so relative speed $= 27 + 57 = 84$ km/h.`, r`মুখোমুখি চলছে, তাই আপেক্ষিক গতি $= 27 + 57 = 84$ কিমি/ঘণ্টা।`),
            t(r`Time $= 672 \div 84 = 8$ hours.`, r`সময় $= 672 \div 84 = 8$ ঘণ্টা।`),
          ],
          answer: t('8 hours', '8 ঘণ্টা'),
        },
        {
          question: t(
            'A 200 m long train running at 108 km/h crosses a platform in 33 seconds. What is the length of the platform?',
            '200 মিটার লম্বা একটা ট্রেন ঘণ্টায় 108 কিমি বেগে চলে 33 সেকেন্ডে একটা প্ল্যাটফর্ম পার হয়। প্ল্যাটফর্মটার দৈর্ঘ্য কত?',
          ),
          steps: [
            t(r`Speed $= 108 \times \frac{5}{18} = 30$ m/s.`, r`গতি $= 108 \times \frac{5}{18} = 30$ মি/সে।`),
            t(r`Distance covered $= 30 \times 33 = 990$ m $=$ train $+$ platform.`, r`মোট দূরত্ব $= 30 \times 33 = 990$ মি $=$ ট্রেন $+$ প্ল্যাটফর্ম।`),
            t(r`Platform $= 990 - 200 = 790$ m.`, r`প্ল্যাটফর্ম $= 990 - 200 = 790$ মি।`),
          ],
          answer: t('790 m', '790 মিটার'),
        },
      ],
    },
    {
      level: 'advanced',
      sections: [
        {
          heading: t('Average speed is not the simple average', 'গড় গতি সাধারণ গড় নয়'),
          body: t(
            r`$$\text{Average speed} = \dfrac{\text{Total distance}}{\text{Total time}}$$

- Going at $40$ km/h and returning at $60$ km/h does **not** give $50$ km/h. You spend **more time** at the slower speed, so the average is pulled down.
- **Shortcut** for the same distance both ways: $\dfrac{2xy}{x + y}$.`,
            r`$$\text{গড় গতি} = \dfrac{\text{মোট দূরত্ব}}{\text{মোট সময়}}$$

- $40$ কিমি/ঘণ্টায় গিয়ে $60$ কিমি/ঘণ্টায় ফিরলে গড় গতি $50$ কিমি/ঘণ্টা **হয় না**। ধীর গতিতে **বেশি সময়** কাটে, তাই গড় কমে যায়।
- যাওয়া-আসার দূরত্ব সমান হলে **শর্টকাট**: $\dfrac{2xy}{x + y}$।`,
          ),
        },
        {
          heading: t('Two trains crossing each other', 'দুটো ট্রেনের পরস্পরকে পার হওয়া'),
          body: t(
            r`When two trains cross, the distance is the **sum of both lengths**.

- Opposite directions: relative speed $= S_1 + S_2$.
- Same direction: relative speed $= S_1 - S_2$ (faster minus slower).
- Time $= \dfrac{L_1 + L_2}{\text{relative speed}}$. Remember to change km/h to m/s first.`,
            r`দুটো ট্রেন পরস্পরকে পার হলে দূরত্ব হয় **দুটো দৈর্ঘ্যের যোগফল**।

- বিপরীত দিকে: আপেক্ষিক গতি $= S_1 + S_2$।
- একই দিকে: আপেক্ষিক গতি $= S_1 - S_2$ (দ্রুত বিয়োগ ধীর)।
- সময় $= \dfrac{L_1 + L_2}{\text{আপেক্ষিক গতি}}$। আগে কিমি/ঘণ্টাকে মি/সে-তে বদলাতে ভুলো না।`,
          ),
        },
        {
          heading: t('Boats and streams', 'নৌকা ও স্রোত'),
          body: t(
            r`A river's flowing water is called the **stream**. Let the boat's speed in still water be $b$ and the stream's speed be $s$.

- **Downstream** (with the flow): the river helps, speed $= b + s$.
- **Upstream** (against the flow): the river pushes back, speed $= b - s$.
- From the two speeds: $b = \frac{\text{down} + \text{up}}{2}$, $s = \frac{\text{down} - \text{up}}{2}$.`,
            r`নদীর বয়ে চলা জলকে বলে **স্রোত**। স্থির জলে নৌকার গতি $b$ আর স্রোতের গতি $s$ ধরো।

- **স্রোতের অনুকূলে** (স্রোতের দিকে): নদী সাহায্য করে, গতি $= b + s$।
- **স্রোতের প্রতিকূলে** (স্রোতের উল্টো দিকে): নদী পিছনে ঠেলে, গতি $= b - s$।
- দুটো গতি জানা থাকলে: $b = \frac{\text{অনুকূল} + \text{প্রতিকূল}}{2}$, $s = \frac{\text{অনুকূল} - \text{প্রতিকূল}}{2}$।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'A man travels from A to B at 40 km/h and returns along the same route at 60 km/h. What is his average speed for the whole journey?',
            'একজন লোক A থেকে B-তে যায় ঘণ্টায় 40 কিমি বেগে এবং একই পথে ফেরে ঘণ্টায় 60 কিমি বেগে। পুরো যাত্রায় তার গড় গতি কত?',
          ),
          steps: [
            t(r`Same distance both ways, so use $\dfrac{2xy}{x + y}$.`, r`যাওয়া-আসার দূরত্ব সমান, তাই $\dfrac{2xy}{x + y}$ সূত্র খাটবে।`),
            t(r`$\dfrac{2 \times 40 \times 60}{40 + 60} = \dfrac{4800}{100} = 48$ km/h.`, r`$\dfrac{2 \times 40 \times 60}{40 + 60} = \dfrac{4800}{100} = 48$ কিমি/ঘণ্টা।`),
            t(r`Check: take distance $120$ km. Time $= 3 + 2 = 5$ h for $240$ km, and $240 \div 5 = 48$.`, r`যাচাই: দূরত্ব $120$ কিমি ধরো। $240$ কিমিতে সময় $= 3 + 2 = 5$ ঘণ্টা, আর $240 \div 5 = 48$।`),
          ],
          answer: t('48 km/h', '48 কিমি/ঘণ্টা'),
        },
        {
          question: t(
            'Two trains of length 110 m and 430 m run in opposite directions at 84 km/h and 24 km/h. In how many seconds will they cross each other?',
            '110 মিটার ও 430 মিটার লম্বা দুটো ট্রেন বিপরীত দিকে 84 কিমি/ঘণ্টা ও 24 কিমি/ঘণ্টা বেগে চলছে। কত সেকেন্ডে তারা পরস্পরকে পার হবে?',
          ),
          steps: [
            t(r`Relative speed $= 84 + 24 = 108$ km/h $= 108 \times \frac{5}{18} = 30$ m/s.`, r`আপেক্ষিক গতি $= 84 + 24 = 108$ কিমি/ঘণ্টা $= 108 \times \frac{5}{18} = 30$ মি/সে।`),
            t(r`Distance $= 110 + 430 = 540$ m.`, r`দূরত্ব $= 110 + 430 = 540$ মি।`),
            t(r`Time $= 540 \div 30 = 18$ seconds.`, r`সময় $= 540 \div 30 = 18$ সেকেন্ড।`),
          ],
          answer: t('18 seconds', '18 সেকেন্ড'),
        },
        {
          question: t(
            "A boat's speed in still water is 12 km/h and the speed of the stream is 3 km/h. How long will it take to go 36 km downstream and come back to the starting point?",
            'স্থির জলে একটা নৌকার গতি 12 কিমি/ঘণ্টা এবং স্রোতের গতি 3 কিমি/ঘণ্টা। স্রোতের অনুকূলে 36 কিমি গিয়ে আবার শুরুর জায়গায় ফিরে আসতে কত সময় লাগবে?',
          ),
          steps: [
            t(r`Downstream speed $= 12 + 3 = 15$ km/h; time $= 36 \div 15 = 2.4$ h.`, r`অনুকূলে গতি $= 12 + 3 = 15$ কিমি/ঘণ্টা; সময় $= 36 \div 15 = 2.4$ ঘণ্টা।`),
            t(r`Upstream speed $= 12 - 3 = 9$ km/h; time $= 36 \div 9 = 4$ h.`, r`প্রতিকূলে গতি $= 12 - 3 = 9$ কিমি/ঘণ্টা; সময় $= 36 \div 9 = 4$ ঘণ্টা।`),
            t(r`Total $= 2.4 + 4 = 6.4$ hours $= 6$ h $24$ min.`, r`মোট $= 2.4 + 4 = 6.4$ ঘণ্টা $= 6$ ঘণ্টা $24$ মিনিট।`),
          ],
          answer: t('6.4 hours (6 h 24 min)', '6.4 ঘণ্টা (6 ঘণ্টা 24 মিনিট)'),
        },
      ],
    },
  ],
  rules: [
    {
      label: t('Basic formula', 'মূল সূত্র'),
      latex: r`\text{Distance} = \text{Speed} \times \text{Time}`,
      explain: t('Know any two of the three and you can find the third.', 'তিনটের যে-কোনো দুটো জানলে তৃতীয়টা বার করা যায়।'),
    },
    {
      label: t('Unit change', 'একক পরিবর্তন'),
      latex: r`1\ \text{km/h} = \tfrac{5}{18}\ \text{m/s}`,
      explain: t('Multiply km/h by 5/18 to get m/s; multiply m/s by 18/5 to get km/h.', 'কিমি/ঘণ্টাকে 5/18 দিয়ে গুণ করলে মি/সে; মি/সে-কে 18/5 দিয়ে গুণ করলে কিমি/ঘণ্টা।'),
    },
    {
      label: t('Relative speed', 'আপেক্ষিক গতি'),
      latex: r`S_{\text{rel}} = S_1 + S_2 \ (\text{opposite}), \quad S_1 - S_2 \ (\text{same})`,
      explain: t('Add the speeds when moving towards each other; subtract when moving the same way.', 'মুখোমুখি চললে গতি যোগ করো; একই দিকে চললে বিয়োগ করো।'),
    },
    {
      label: t('Train crossing', 'ট্রেনের পার হওয়া'),
      latex: r`T = \dfrac{L_1 + L_2}{S_{\text{rel}}}`,
      explain: t('Add the train length and the length of what it crosses (0 for a pole), then divide by the relative speed.', 'ট্রেনের দৈর্ঘ্য আর যা পার হচ্ছে তার দৈর্ঘ্য যোগ করো (খুঁটির জন্য 0), তারপর আপেক্ষিক গতি দিয়ে ভাগ করো।'),
    },
    {
      label: t('Average speed (equal distances)', 'গড় গতি (সমান দূরত্ব)'),
      latex: r`S_{\text{avg}} = \dfrac{2xy}{x + y}`,
      explain: t('For going at x and returning at y over the same road. Never just take (x + y)/2.', 'একই পথে x গতিতে গিয়ে y গতিতে ফিরলে খাটে। কখনো শুধু (x + y)/2 নিও না।'),
    },
    {
      label: t('Boats and streams', 'নৌকা ও স্রোত'),
      latex: r`\text{Down} = b + s, \quad \text{Up} = b - s`,
      explain: t('b is the boat speed in still water, s is the stream speed.', 'b হল স্থির জলে নৌকার গতি, s হল স্রোতের গতি।'),
    },
  ],
  tips: [
    t('Convert units first: km/h × 5/18 = m/s when lengths are in metres.', 'আগে একক বদলাও: দৈর্ঘ্য মিটারে থাকলে কিমি/ঘণ্টা × 5/18 = মি/সে।'),
    t('Crossing a pole: distance is only the train length. Crossing a platform: add both lengths.', 'খুঁটি পার হলে দূরত্ব শুধু ট্রেনের দৈর্ঘ্য। প্ল্যাটফর্ম পার হলে দুটো দৈর্ঘ্যই যোগ করো।'),
    t('Average speed is total distance ÷ total time, not the average of the two speeds.', 'গড় গতি = মোট দূরত্ব ÷ মোট সময়, দুটো গতির সাধারণ গড় নয়।'),
    t('Towards each other: add speeds. Same direction: subtract speeds.', 'মুখোমুখি: গতি যোগ। একই দিকে: গতি বিয়োগ।'),
    t('Write minutes as a fraction of an hour: 15 min = 0.25 h, 45 min = 0.75 h.', 'মিনিটকে ঘণ্টার ভগ্নাংশে লেখো: 15 মিনিট = 0.25 ঘণ্টা, 45 মিনিট = 0.75 ঘণ্টা।'),
  ],
};
