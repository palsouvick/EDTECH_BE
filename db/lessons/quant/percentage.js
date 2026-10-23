'use strict';

// Chapter lesson: Percentage. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'percentage',
  title: t('Percentage', 'শতকরা'),
  emoji: '💯',
  intro: t(
    'Percentage is a way of saying "how many out of 100". We meet it everywhere: exam marks, discounts in a shop, the battery on a phone, and even a cricketer\'s strike rate.',
    'শতকরা মানে "প্রতি 100-এ কত"। পরীক্ষার নম্বর, দোকানের ছাড়, মোবাইলের ব্যাটারি, এমনকি ক্রিকেটারের স্ট্রাইক রেট — সব জায়গায় আমরা শতকরা দেখি।',
  ),
  levels: [
    // ───────────────────────────── BASIC ─────────────────────────────
    {
      level: 'basic',
      sections: [
        {
          heading: t('What does "per cent" mean?', '"শতকরা" কথাটির মানে কী?'),
          body: t(
            r`**Per cent** means "out of every 100". The sign for it is **%**.

- $25\%$ means 25 out of 100.
- If a class has 100 students and 40 of them like cricket, then $40\%$ of the class likes cricket.

So a percentage is just a **fraction whose bottom number (denominator) is 100**: $25\% = \frac{25}{100}$.`,
            r`**শতকরা** মানে "প্রতি 100-এ"। এর চিহ্ন হল **%**।

- $25\%$ মানে 100-এর মধ্যে 25।
- কোনো ক্লাসে 100 জন ছাত্রছাত্রীর মধ্যে 40 জন ক্রিকেট ভালোবাসলে, ক্লাসের $40\%$ ক্রিকেট ভালোবাসে।

অর্থাৎ শতকরা হল এমন একটি **ভগ্নাংশ যার হর 100**: $25\% = \frac{25}{100}$।`,
          ),
        },
        {
          heading: t('Changing a percentage into a fraction or decimal', 'শতকরাকে ভগ্নাংশ বা দশমিকে বদলানো'),
          body: t(
            r`Because "%" means "divide by 100", we can rewrite any percentage:

- **To a fraction:** put it over 100 and cut down. $50\% = \frac{50}{100} = \frac{1}{2}$, $25\% = \frac{1}{4}$, $20\% = \frac{1}{5}$, $10\% = \frac{1}{10}$.
- **To a decimal:** move the decimal point two places to the left. $35\% = 0.35$, $5\% = 0.05$.
- **Back to a percentage:** multiply by 100. $\frac{3}{4} = \frac{3}{4} \times 100\% = 75\%$.`,
            r`"%" মানে "100 দিয়ে ভাগ", তাই যেকোনো শতকরাকে অন্যভাবে লেখা যায়:

- **ভগ্নাংশে:** 100-এর উপর বসিয়ে লঘিষ্ঠ আকারে আনো। $50\% = \frac{50}{100} = \frac{1}{2}$, $25\% = \frac{1}{4}$, $20\% = \frac{1}{5}$, $10\% = \frac{1}{10}$।
- **দশমিকে:** দশমিক বিন্দুকে দুই ঘর বাঁদিকে সরাও। $35\% = 0.35$, $5\% = 0.05$।
- **আবার শতকরায়:** 100 দিয়ে গুণ করো। $\frac{3}{4} = \frac{3}{4} \times 100\% = 75\%$।`,
          ),
        },
        {
          heading: t('Finding a percentage of a number', 'কোনো সংখ্যার শতকরা অংশ বের করা'),
          body: t(
            r`"20% of 150" means: split 150 into 100 equal parts and take 20 of them.

$$20\% \text{ of } 150 = \frac{20}{100} \times 150 = 30$$

**Quick trick:** $10\%$ of a number = move the decimal one place left. $10\%$ of $150 = 15$. Then $20\%$ is double that, $5\%$ is half of it.`,
            r`"150-এর 20%" মানে: 150-কে 100টি সমান ভাগে ভাগ করে তার 20টি ভাগ নেওয়া।

$$20\% \text{ of } 150 = \frac{20}{100} \times 150 = 30$$

**সহজ কৌশল:** কোনো সংখ্যার $10\%$ = দশমিক বিন্দু এক ঘর বাঁদিকে সরানো। $150$-এর $10\% = 15$। তাহলে $20\%$ তার দ্বিগুণ, আর $5\%$ তার অর্ধেক।`,
          ),
        },
      ],
      examples: [
        {
          question: t('What is 20% of 150?', '150-এর 20% কত?'),
          steps: [
            t(r`Write it as a fraction: $\frac{20}{100} \times 150$.`, r`ভগ্নাংশে লেখো: $\frac{20}{100} \times 150$।`),
            t(r`$\frac{150}{100} = 1.5$, and $20 \times 1.5 = 30$.`, r`$\frac{150}{100} = 1.5$, এবং $20 \times 1.5 = 30$।`),
            t(r`Check with the trick: $10\%$ of 150 is 15, so $20\%$ is $15 \times 2 = 30$.`, r`কৌশল দিয়ে মিলিয়ে নাও: 150-এর $10\%$ হল 15, তাই $20\%$ হল $15 \times 2 = 30$।`),
          ],
          answer: t('20% of 150 is 30.', '150-এর 20% হল 30।'),
        },
        {
          question: t('Rina scored 18 marks out of 25 in a test. What is her percentage?', 'রিনা একটি পরীক্ষায় 25-এর মধ্যে 18 পেয়েছে। সে শতকরা কত নম্বর পেয়েছে?'),
          steps: [
            t(r`Marks as a fraction: $\frac{18}{25}$.`, r`নম্বরকে ভগ্নাংশে লেখো: $\frac{18}{25}$।`),
            t(r`Turn it into a percentage by multiplying by 100: $\frac{18}{25} \times 100 = 18 \times 4 = 72$.`, r`শতকরায় আনতে 100 দিয়ে গুণ করো: $\frac{18}{25} \times 100 = 18 \times 4 = 72$।`),
          ],
          answer: t('Rina scored 72%.', 'রিনা 72% নম্বর পেয়েছে।'),
        },
        {
          question: t('What is 45% of 500?', '500-এর 45% কত?'),
          steps: [
            t(r`$45\% \text{ of } 500 = \frac{45}{100} \times 500$.`, r`500-এর $45\% = \frac{45}{100} \times 500$।`),
            t(r`$\frac{500}{100} = 5$, so the answer is $45 \times 5 = 225$.`, r`$\frac{500}{100} = 5$, তাই উত্তর $45 \times 5 = 225$।`),
          ],
          answer: t('45% of 500 is 225.', '500-এর 45% হল 225।'),
        },
      ],
    },
    // ───────────────────────────── INTERMEDIATE ─────────────────────────────
    {
      level: 'intermediate',
      sections: [
        {
          heading: t('"A is what percent of B?"', '"A, B-এর শতকরা কত?"'),
          body: t(
            r`The number after the word **"of"** is the **base** (the whole we compare with). Put the part over the base and multiply by 100:

$$\text{percent} = \frac{\text{part}}{\text{base}} \times 100$$

Example: 15 is what percent of 60? $\frac{15}{60} \times 100 = 25\%$.`,
            r`**"-এর"** শব্দের আগের সংখ্যাটি হল **ভিত্তি** (যে গোটা জিনিসের সঙ্গে তুলনা করছি)। অংশকে ভিত্তি দিয়ে ভাগ করে 100 দিয়ে গুণ করো:

$$\text{percent} = \frac{\text{part}}{\text{base}} \times 100$$

উদাহরণ: 15, 60-এর শতকরা কত? $\frac{15}{60} \times 100 = 25\%$।`,
          ),
        },
        {
          heading: t('Percentage increase and decrease', 'শতকরা বৃদ্ধি ও হ্রাস'),
          body: t(
            r`When a price goes up or down, we compare the **change** with the **old (original) value**:

$$\text{change }\% = \frac{\text{new} - \text{old}}{\text{old}} \times 100$$

- A bat's price goes from ₹800 to ₹1000. Change $= 200$, so increase $= \frac{200}{800} \times 100 = 25\%$.
- Always divide by the **old** value, never the new one.`,
            r`দাম বাড়লে বা কমলে আমরা **পরিবর্তনকে** **পুরোনো (প্রাথমিক) মানের** সঙ্গে তুলনা করি:

$$\text{change }\% = \frac{\text{new} - \text{old}}{\text{old}} \times 100$$

- একটি ব্যাটের দাম ₹800 থেকে বেড়ে ₹1000 হল। পরিবর্তন $= 200$, তাই বৃদ্ধি $= \frac{200}{800} \times 100 = 25\%$।
- সবসময় **পুরোনো** মান দিয়ে ভাগ করবে, নতুন মান দিয়ে নয়।`,
          ),
        },
        {
          heading: t('Going backwards: finding the original number', 'উল্টো পথে: আসল সংখ্যা বের করা'),
          body: t(
            r`Think of the original as $100\%$.

- After a $15\%$ **increase**, the number becomes $115\%$ of the original.
- After a $25\%$ **decrease**, it becomes $75\%$ of the original.

So if we know the new number, we divide back:

$$\text{original} = \text{new} \times \frac{100}{100 \pm x}$$

Use $+$ for an increase and $-$ for a decrease.`,
            r`আসল সংখ্যাটিকে $100\%$ ধরো।

- $15\%$ **বাড়লে** সংখ্যাটি আসলের $115\%$ হয়।
- $25\%$ **কমলে** সংখ্যাটি আসলের $75\%$ হয়।

তাই নতুন সংখ্যাটি জানা থাকলে উল্টো দিকে ভাগ করি:

$$\text{original} = \text{new} \times \frac{100}{100 \pm x}$$

বৃদ্ধির জন্য $+$, হ্রাসের জন্য $-$ নেবে।`,
          ),
        },
      ],
      examples: [
        {
          question: t('168 is what percent of 280?', '168, 280-এর শতকরা কত?'),
          steps: [
            t(r`Base is 280 (it comes after "of"). Fraction: $\frac{168}{280}$.`, r`ভিত্তি হল 280। ভগ্নাংশ: $\frac{168}{280}$।`),
            t(r`Divide top and bottom by 56: $\frac{168}{280} = \frac{3}{5}$.`, r`লব ও হরকে 56 দিয়ে ভাগ করো: $\frac{168}{280} = \frac{3}{5}$।`),
            t(r`Multiply by 100: $\frac{3}{5} \times 100 = 60$.`, r`100 দিয়ে গুণ করো: $\frac{3}{5} \times 100 = 60$।`),
          ],
          answer: t('168 is 60% of 280.', '168 হল 280-এর 60%।'),
        },
        {
          question: t('A number is increased by 15% and the result is 1242. What is the original number?', 'একটি সংখ্যাকে 15% বাড়ালে 1242 হয়। আসল সংখ্যাটি কত?'),
          steps: [
            t(r`After the increase, $1242$ is $115\%$ of the original.`, r`বাড়ানোর পর $1242$ হল আসল সংখ্যার $115\%$।`),
            t(r`Original $= 1242 \times \frac{100}{115} = \frac{124200}{115} = 1080$.`, r`আসল সংখ্যা $= 1242 \times \frac{100}{115} = \frac{124200}{115} = 1080$।`),
            t(r`Check: $15\%$ of 1080 is 162, and $1080 + 162 = 1242$. Correct.`, r`মিলিয়ে দেখো: 1080-এর $15\%$ হল 162, আর $1080 + 162 = 1242$। ঠিক আছে।`),
          ],
          answer: t('The original number is 1080.', 'আসল সংখ্যাটি 1080।'),
        },
        {
          question: t('A number is decreased by 25% and the result is 1770. What is the original number?', 'একটি সংখ্যাকে 25% কমালে 1770 হয়। আসল সংখ্যাটি কত?'),
          steps: [
            t(r`After a $25\%$ decrease, $1770$ is $75\%$ of the original.`, r`$25\%$ কমানোর পর $1770$ হল আসল সংখ্যার $75\%$।`),
            t(r`Original $= 1770 \times \frac{100}{75} = 1770 \times \frac{4}{3} = 590 \times 4 = 2360$.`, r`আসল সংখ্যা $= 1770 \times \frac{100}{75} = 1770 \times \frac{4}{3} = 590 \times 4 = 2360$।`),
            t(r`Check: $25\%$ of 2360 is 590, and $2360 - 590 = 1770$. Correct.`, r`মিলিয়ে দেখো: 2360-এর $25\%$ হল 590, আর $2360 - 590 = 1770$। ঠিক আছে।`),
          ],
          answer: t('The original number is 2360.', 'আসল সংখ্যাটি 2360।'),
        },
      ],
    },
    // ───────────────────────────── ADVANCED ─────────────────────────────
    {
      level: 'advanced',
      sections: [
        {
          heading: t('Successive changes: multiply, do not add', 'পরপর পরিবর্তন: যোগ নয়, গুণ করো'),
          body: t(
            r`If a price goes **up 20%** and then **down 20%**, it does **not** come back to the start. The second change is taken on the **new** price.

Each change is a **multiplying factor**: $+20\% \to \times 1.2$, $-20\% \to \times 0.8$. So $100 \to 120 \to 96$, a net **4% fall**.

Shortcut for two changes $a\%$ and $b\%$ (increase positive, decrease negative):

$$\text{net }\% = a + b + \frac{ab}{100}$$

Special case: up $x\%$ then down $x\%$ always gives a **loss of** $\frac{x^2}{100}\%$.`,
            r`কোনো দাম **20% বেড়ে** তারপর **20% কমলে** তা আগের জায়গায় **ফেরে না**। দ্বিতীয় পরিবর্তনটি হয় **নতুন** দামের উপর।

প্রতিটি পরিবর্তন একটি **গুণক**: $+20\% \to \times 1.2$, $-20\% \to \times 0.8$। তাই $100 \to 120 \to 96$, মোটের উপর **4% কমল**।

পরপর দুটি পরিবর্তন $a\%$ ও $b\%$ হলে (বৃদ্ধি ধনাত্মক, হ্রাস ঋণাত্মক) সংক্ষিপ্ত সূত্র:

$$\text{net }\% = a + b + \frac{ab}{100}$$

বিশেষ ক্ষেত্র: $x\%$ বেড়ে আবার $x\%$ কমলে সবসময় $\frac{x^2}{100}\%$ **কমে যায়**।`,
          ),
        },
        {
          heading: t('Fractions you should know by heart', 'যে ভগ্নাংশগুলি মুখস্থ রাখা দরকার'),
          body: t(
            r`Exams reward speed. These pairs save a lot of time:

- $\frac{1}{2} = 50\%$, $\frac{1}{3} = 33\frac{1}{3}\%$, $\frac{1}{4} = 25\%$, $\frac{1}{5} = 20\%$
- $\frac{1}{6} = 16\frac{2}{3}\%$, $\frac{1}{8} = 12.5\%$, $\frac{1}{10} = 10\%$, $\frac{1}{12} = 8\frac{1}{3}\%$
- $\frac{1}{20} = 5\%$, $\frac{1}{25} = 4\%$

Example: $12.5\%$ of 640 $= \frac{640}{8} = 80$, no long multiplication needed.`,
            r`পরীক্ষায় গতি খুব জরুরি। এই জোড়াগুলি অনেক সময় বাঁচায়:

- $\frac{1}{2} = 50\%$, $\frac{1}{3} = 33\frac{1}{3}\%$, $\frac{1}{4} = 25\%$, $\frac{1}{5} = 20\%$
- $\frac{1}{6} = 16\frac{2}{3}\%$, $\frac{1}{8} = 12.5\%$, $\frac{1}{10} = 10\%$, $\frac{1}{12} = 8\frac{1}{3}\%$
- $\frac{1}{20} = 5\%$, $\frac{1}{25} = 4\%$

উদাহরণ: 640-এর $12.5\% = \frac{640}{8} = 80$, বড় গুণের দরকারই নেই।`,
          ),
        },
        {
          heading: t('"More than" and "less than" use different bases', '"বেশি" আর "কম"-এর ভিত্তি আলাদা'),
          body: t(
            r`If A earns $25\%$ more than B, take B $= 100$, so A $= 125$. The gap is 25.

- Compared with B (base 100), A is $25\%$ more.
- Compared with A (base 125), B is $\frac{25}{125} \times 100 = 20\%$ less.

General rule: if A is $r\%$ more than B, then B is $\frac{r}{100 + r} \times 100\%$ less than A.

The same idea solves **price and consumption** questions: if the price of rice rises $r\%$, a family must cut its use by $\frac{r}{100 + r} \times 100\%$ to keep the spending the same.`,
            r`A যদি B-এর থেকে $25\%$ বেশি আয় করে, তাহলে B $= 100$ ধরলে A $= 125$। পার্থক্য 25।

- B-এর সঙ্গে তুলনায় (ভিত্তি 100), A $25\%$ বেশি।
- A-এর সঙ্গে তুলনায় (ভিত্তি 125), B $\frac{25}{125} \times 100 = 20\%$ কম।

সাধারণ নিয়ম: A যদি B-এর থেকে $r\%$ বেশি হয়, তবে B, A-এর থেকে $\frac{r}{100 + r} \times 100\%$ কম।

**দাম ও খরচ (ব্যবহার)**-এর অঙ্কও এভাবেই হয়: চালের দাম $r\%$ বাড়লে খরচ একই রাখতে পরিবারকে ব্যবহার $\frac{r}{100 + r} \times 100\%$ কমাতে হবে।`,
          ),
        },
      ],
      examples: [
        {
          question: t('The price of an article is first increased by 30% and then decreased by 20%. What is the net change in price?', 'একটি জিনিসের দাম প্রথমে 30% বাড়ানো হল, তারপর 20% কমানো হল। দামে মোট পরিবর্তন কত?'),
          steps: [
            t(r`Use $a = +30$, $b = -20$.`, r`$a = +30$, $b = -20$ নাও।`),
            t(r`Net $= 30 - 20 + \frac{30 \times (-20)}{100} = 10 - 6 = 4$.`, r`মোট $= 30 - 20 + \frac{30 \times (-20)}{100} = 10 - 6 = 4$।`),
            t(r`Check with 100: $100 \to 130 \to 130 \times 0.8 = 104$. Up by 4.`, r`100 দিয়ে মিলিয়ে দেখো: $100 \to 130 \to 130 \times 0.8 = 104$। 4 বেড়েছে।`),
          ],
          answer: t('4% increase', '4% বৃদ্ধি'),
        },
        {
          question: t('The price of an article is first increased by 10% and then decreased by 50%. What is the net change?', 'একটি জিনিসের দাম প্রথমে 10% বাড়ানো হল, তারপর 50% কমানো হল। মোট পরিবর্তন কত?'),
          steps: [
            t(r`Net $= 10 - 50 + \frac{10 \times (-50)}{100} = -40 - 5 = -45$.`, r`মোট $= 10 - 50 + \frac{10 \times (-50)}{100} = -40 - 5 = -45$।`),
            t(r`Check: $100 \to 110 \to 55$. It fell by 45.`, r`মিলিয়ে দেখো: $100 \to 110 \to 55$। 45 কমেছে।`),
          ],
          answer: t('45% decrease', '45% হ্রাস'),
        },
        {
          question: t('The price of petrol rises by 20%. By what percent must a car owner reduce his use of petrol so that his spending stays the same?', 'পেট্রোলের দাম 20% বাড়ল। খরচ একই রাখতে একজন গাড়ির মালিককে পেট্রোলের ব্যবহার শতকরা কত কমাতে হবে?'),
          steps: [
            t(r`Old price 100, new price 120. To spend only 100, he can buy $\frac{100}{120}$ of the old amount.`, r`পুরোনো দাম 100, নতুন দাম 120। খরচ 100 রাখতে হলে সে আগের পরিমাণের $\frac{100}{120}$ অংশ কিনতে পারবে।`),
            t(r`Cut $= \frac{20}{100 + 20} \times 100 = \frac{20}{120} \times 100 = 16\frac{2}{3}$.`, r`কমাতে হবে $= \frac{20}{100 + 20} \times 100 = \frac{20}{120} \times 100 = 16\frac{2}{3}$।`),
          ],
          answer: t(r`He must use $16\frac{2}{3}\%$ less petrol.`, r`তাকে পেট্রোল $16\frac{2}{3}\%$ কম ব্যবহার করতে হবে।`),
        },
      ],
    },
  ],
  rules: [
    {
      label: t('Percentage of a number', 'কোনো সংখ্যার শতকরা অংশ'),
      latex: r`x\% \text{ of } A = \frac{x}{100} \times A`,
      explain: t('Turn the percentage into a fraction over 100, then multiply.', 'শতকরাকে 100 হরবিশিষ্ট ভগ্নাংশে লিখে সংখ্যাটির সঙ্গে গুণ করো।'),
    },
    {
      label: t('What percent is A of B', 'A, B-এর শতকরা কত'),
      latex: r`\frac{A}{B} \times 100`,
      explain: t('B is the base: the number written after "of".', 'B হল ভিত্তি: যে সংখ্যার "-এর" শতকরা চাওয়া হয়েছে।'),
    },
    {
      label: t('Percentage change', 'শতকরা পরিবর্তন'),
      latex: r`\text{Change \%} = \frac{\text{New} - \text{Old}}{\text{Old}} \times 100`,
      explain: t('Always divide by the old value. A minus answer means a decrease.', 'সবসময় পুরোনো মান দিয়ে ভাগ করো। উত্তর ঋণাত্মক হলে তা হ্রাস বোঝায়।'),
    },
    {
      label: t('Original from the new value', 'নতুন মান থেকে আসল মান'),
      latex: r`\text{Original} = \text{New} \times \frac{100}{100 \pm x}`,
      explain: t('Use 100 + x after an increase of x%, and 100 − x after a decrease.', 'x% বৃদ্ধির পর 100 + x, আর x% হ্রাসের পর 100 − x নেবে।'),
    },
    {
      label: t('Two successive changes', 'পরপর দুটি পরিবর্তন'),
      latex: r`\text{Net \%} = a + b + \frac{ab}{100}`,
      explain: t('Write increases as positive and decreases as negative. A positive answer is a net increase.', 'বৃদ্ধিকে ধনাত্মক আর হ্রাসকে ঋণাত্মক লেখো। উত্তর ধনাত্মক হলে মোটের উপর বৃদ্ধি।'),
    },
    {
      label: t('More than / less than', 'বেশি / কম'),
      latex: r`\text{A is } r\% \text{ more than B} \Rightarrow \text{B is } \frac{r}{100 + r} \times 100\% \text{ less than A}`,
      explain: t('The same formula tells how much to cut consumption when the price rises by r%.', 'দাম r% বাড়লে ব্যবহার কতটা কমাতে হবে, তাও এই সূত্রেই পাওয়া যায়।'),
    },
  ],
  tips: [
    t('Always ask "percent of what?" The base is the number after "of", or the old value in a change.', 'সবসময় নিজেকে জিজ্ঞাসা করো "কিসের শতকরা?" ভিত্তি হল "-এর" আগের সংখ্যা, অথবা পরিবর্তনের অঙ্কে পুরোনো মান।'),
    t('Up 20% and then down 20% is NOT zero change. It is a 4% fall.', '20% বেড়ে আবার 20% কমলে পরিবর্তন শূন্য হয় না। মোটের উপর 4% কমে।'),
    t('To find the original after a 25% cut, divide by 0.75. Do not add 25% back to the new number.', '25% কমার পরে আসল সংখ্যা পেতে 0.75 দিয়ে ভাগ করো। নতুন সংখ্যার সঙ্গে 25% যোগ করলে ভুল হবে।'),
    t('When only percentages are given, take the starting value as 100. Every change then becomes a plain number.', 'শুধু শতকরা দেওয়া থাকলে শুরুর মান 100 ধরে নাও। তাহলে প্রতিটি পরিবর্তন সাধারণ সংখ্যা হয়ে যায়।'),
    t('Find 10% first (move the decimal one place left), then build 5%, 20% or 30% from it.', 'আগে 10% বের করো (দশমিক এক ঘর বাঁদিকে সরিয়ে), তারপর তা থেকে 5%, 20% বা 30% বানাও।'),
  ],
};
