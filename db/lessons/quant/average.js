'use strict';

// Chapter lesson: Average. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'average',
  title: t('Average', 'গড়'),
  emoji: '📊',
  intro: t(
    'An average is one number that stands for a whole group of numbers, as if everything were shared out equally. We meet it in a batsman\'s average, the average marks of a class and the average rainfall of a month.',
    'গড় হল এমন একটি সংখ্যা যা পুরো একদল সংখ্যার প্রতিনিধি — যেন সবকিছু সমানভাবে ভাগ করে দেওয়া হয়েছে। ব্যাটসম্যানের গড় রান, ক্লাসের গড় নম্বর, মাসের গড় বৃষ্টিপাত — সবই গড়ের উদাহরণ।',
  ),
  levels: [
    // ───────────────────────────── BASIC ─────────────────────────────
    {
      level: 'basic',
      sections: [
        {
          heading: t('Average means equal sharing', 'গড় মানে সমান ভাগ'),
          body: t(
            r`Three friends have 4, 6 and 8 chocolates. If they put them all together and share equally, how many does each get?

- Together: $4 + 6 + 8 = 18$ chocolates.
- Shared by 3: $18 \div 3 = 6$ each.

That **6** is the **average**. So:

$$\text{Average} = \frac{\text{sum of all the values}}{\text{number of values}}$$`,
            r`তিন বন্ধুর কাছে 4, 6 আর 8টি চকোলেট আছে। সব একসঙ্গে করে সমান ভাগ করলে প্রত্যেকে কটি পাবে?

- একসঙ্গে: $4 + 6 + 8 = 18$টি চকোলেট।
- 3 জনে ভাগ: $18 \div 3 = 6$টি করে।

এই **6** হল **গড়**। অর্থাৎ:

$$\text{Average} = \frac{\text{sum of all the values}}{\text{number of values}}$$

(গড় = সব রাশির যোগফল ÷ রাশির সংখ্যা)`,
          ),
        },
        {
          heading: t('Some facts about the average', 'গড় সম্পর্কে কয়েকটি তথ্য'),
          body: t(
            r`- The average always lies **between** the smallest and the largest value.
- If all values are equal, the average is that same value.
- If every value goes up by 5, the average also goes up by 5.
- The average does not have to be one of the values, and it can be a decimal (like $10.5$).`,
            r`- গড় সবসময় সবচেয়ে ছোট আর সবচেয়ে বড় মানের **মাঝখানে** থাকে।
- সব মান সমান হলে গড়ও সেই মানটিই।
- প্রতিটি মান 5 করে বাড়লে গড়ও 5 বাড়ে।
- গড় যে দেওয়া মানগুলির একটি হতেই হবে তা নয়, এটি দশমিকও হতে পারে (যেমন $10.5$)।`,
          ),
        },
        {
          heading: t('Average of the first n natural numbers', 'প্রথম n-টি স্বাভাবিক সংখ্যার গড়'),
          body: t(
            r`**Natural numbers** are the counting numbers $1, 2, 3, \dots$

For $1, 2, 3, \dots, n$, pair the first with the last: $1 + n$, $2 + (n - 1)$, … Every pair has the same sum, so the average is simply the **middle**:

$$\text{Average} = \frac{\text{first} + \text{last}}{2} = \frac{n + 1}{2}$$

This "first plus last, divided by 2" works for any list that goes up by the same step each time.`,
            r`**স্বাভাবিক সংখ্যা** হল গোনার সংখ্যা $1, 2, 3, \dots$

$1, 2, 3, \dots, n$-এর ক্ষেত্রে প্রথমটির সঙ্গে শেষটি জোড়া করো: $1 + n$, $2 + (n - 1)$, … প্রতিটি জোড়ার যোগফল সমান, তাই গড় হল ঠিক **মাঝের** মান:

$$\text{Average} = \frac{\text{first} + \text{last}}{2} = \frac{n + 1}{2}$$

যে তালিকায় প্রতিবার একই পরিমাণ করে বাড়ে, সেখানে "প্রথম + শেষ, ভাগ 2" নিয়মটি খাটে।`,
          ),
        },
      ],
      examples: [
        {
          question: t('A batsman scores 30, 45, 20, 55 and 50 runs in five matches. What is his average score?', 'একজন ব্যাটসম্যান পাঁচটি ম্যাচে 30, 45, 20, 55 ও 50 রান করল। তার গড় রান কত?'),
          given: t('Scores = 30, 45, 20, 55, 50; number of matches = 5.', 'রান = 30, 45, 20, 55, 50; ম্যাচের সংখ্যা = 5।'),
          find: t('The average score per match.', 'প্রতি ম্যাচে গড় রান।'),
          method: t('Add all the scores and divide by the number of matches.', 'সব রান যোগ করে ম্যাচের সংখ্যা দিয়ে ভাগ করো।'),
          steps: [
            t('Sum = 30 + 45 + 20 + 55 + 50 = 200 runs.', 'মোট রান = 30 + 45 + 20 + 55 + 50 = 200।'),
            t('Number of matches = 5. Average = 200 ÷ 5 = 40.', 'ম্যাচের সংখ্যা = 5। গড় = 200 ÷ 5 = 40।'),
          ],
          answer: t('40 runs', 'গড় 40 রান'),
          why: t('The total 200 runs shared equally across five matches gives 40 per match.', '200 রান পাঁচটি ম্যাচে সমান ভাগ করলে প্রতি ম্যাচে 40 রান হয়।'),
        },
        {
          question: t('Three friends have 4, 6 and 8 chocolates. What is the average number of chocolates?', 'তিন বন্ধুর কাছে 4, 6 ও 8টি চকোলেট আছে। গড়ে কটি চকোলেট?'),
          given: t('Chocolate counts = 4, 6, 8; number of friends = 3.', 'চকোলেটের সংখ্যা = 4, 6, 8; বন্ধুর সংখ্যা = 3।'),
          find: t('Average chocolates per friend.', 'প্রতি বন্ধুর গড় চকোলেট।'),
          method: t('Find the total chocolates, then share the total equally among three friends.', 'মোট চকোলেট বের করে তিন বন্ধুর মধ্যে সমান ভাগ করো।'),
          steps: [
            t('Sum = 4 + 6 + 8 = 18.', 'মোট = 4 + 6 + 8 = 18।'),
            t('Average = 18 ÷ 3 = 6.', 'গড় = 18 ÷ 3 = 6।'),
          ],
          answer: t('6 chocolates', 'গড়ে 6টি চকোলেট'),
          why: t('Sharing 18 chocolates equally among 3 friends gives 6 each.', '18টি চকোলেট 3 বন্ধুর মধ্যে সমান ভাগ করলে প্রত্যেকে 6টি পায়।'),
        },
        {
          question: t('What is the average of the first 20 natural numbers?', 'প্রথম 20টি স্বাভাবিক সংখ্যার গড় কত?'),
          given: t('The list is 1, 2, …, 20 with 20 values.', 'তালিকাটি 1, 2, …, 20; এতে 20টি মান আছে।'),
          find: t('The average of these numbers.', 'সংখ্যাগুলির গড়।'),
          method: t('For consecutive values, average the first and last; verify by total divided by count.', 'ক্রমিক সংখ্যার ক্ষেত্রে প্রথম ও শেষের গড় নাও; মোটকে সংখ্যা দিয়ে ভাগ করে যাচাই করো।'),
          steps: [
            t(r`Average $= \frac{\text{first} + \text{last}}{2} = \frac{1 + 20}{2}$.`, r`গড় $= \frac{\text{first} + \text{last}}{2} = \frac{1 + 20}{2}$।`),
            t(r`$\frac{21}{2} = 10.5$.`, r`অর্থাৎ $\frac{21}{2} = 10.5$।`),
            t('Check: the sum 1 + 2 + … + 20 is 210, and 210 ÷ 20 = 10.5.', 'মিলিয়ে দেখো: 1 + 2 + … + 20-এর যোগফল 210, আর 210 ÷ 20 = 10.5।'),
          ],
          answer: t('10.5', 'গড় 10.5'),
          why: t('The values pair evenly around 10.5, so that is their balancing middle.', 'সংখ্যাগুলি 10.5-কে কেন্দ্র করে জোড়া হয়, তাই এটিই তাদের ভারসাম্যের মাঝামাঝি।'),
        },
        {
          question: t('Find the average of 12, 16, 20 and 24.', '12, 16, 20 ও 24-এর গড় নির্ণয় করো।'),
          given: t('Four values: 12, 16, 20, 24.', 'চারটি মান: 12, 16, 20, 24।'),
          find: t('Their average.', 'এগুলির গড়।'),
          method: t('Add the four values and divide the sum by four.', 'চারটি মান যোগ করে যোগফলকে চার দিয়ে ভাগ করো।'),
          steps: [
            t(r`Sum $= 12 + 16 + 20 + 24 = 72$.`, r`যোগফল $= 12 + 16 + 20 + 24 = 72$।`),
            t(r`Average $= 72 \div 4 = 18$.`, r`গড় $= 72 \div 4 = 18$।`),
          ],
          answer: t('18', 'গড় 18'),
          why: t('The four values total 72, and 72 shared across four values is 18.', 'চারটি মানের যোগফল 72; চার ভাগে সমান ভাগ করলে 18 হয়।'),
        },
        {
          question: t('The average of 6 numbers is 14. What is their sum?', '6টি সংখ্যার গড় 14। তাদের যোগফল কত?'),
          given: t('Number of values = 6; average = 14.', 'মানের সংখ্যা = 6; গড় = 14।'),
          find: t('The sum of all six values.', 'ছয়টি মানের যোগফল।'),
          method: t('Reverse the average formula: sum = average × number of values.', 'গড়ের সূত্র উলটে ব্যবহার করো: যোগফল = গড় × মানের সংখ্যা।'),
          steps: [
            t(r`Sum $= 14 \times 6$.`, r`যোগফল $= 14 \times 6$।`),
            t(r`$14 \times 6 = 84$.`, r`যোগফল $14 \times 6 = 84$।`),
          ],
          answer: t('84', 'যোগফল 84'),
          why: t('If 84 is shared equally across six numbers, each has average 14.', '84-কে ছয়টি সংখ্যায় সমান ভাগ করলে গড় 14 হয়।'),
        },
        {
          question: t('The average of 5 test scores is 70. What score is needed on a sixth test to make the average 72?', '5টি পরীক্ষার গড় নম্বর 70। গড় 72 করতে ষষ্ঠ পরীক্ষায় কত নম্বর দরকার?'),
          given: t('Five scores average 70; target average for 6 scores = 72.', 'পাঁচটি নম্বরের গড় 70; ছয়টি নম্বরের লক্ষ্য গড় = 72।'),
          find: t('The sixth score needed.', 'ষষ্ঠ পরীক্ষায় দরকারি নম্বর।'),
          method: t('Find the old total and the required new total, then subtract.', 'আগের মোট এবং দরকারি নতুন মোট বের করে বিয়োগ করো।'),
          steps: [
            t(r`Old total $= 5 \times 70 = 350$; target total $= 6 \times 72 = 432$.`, r`আগের মোট $= 5 \times 70 = 350$; লক্ষ্য মোট $= 6 \times 72 = 432$।`),
            t(r`Needed score $= 432 - 350 = 82$.`, r`দরকারি নম্বর $= 432 - 350 = 82$।`),
          ],
          answer: t('82 marks', '82 নম্বর'),
          why: t('Adding 82 to 350 makes 432, and 432 ÷ 6 = 72.', '350-এর সঙ্গে 82 যোগ করলে 432 হয় এবং 432 ÷ 6 = 72।'),
        },
        {
          question: t('The average age of 4 children is 9 years. A child aged 13 joins them. Find the new average.', '4টি শিশুর গড় বয়স 9 বছর। 13 বছর বয়সী একটি শিশু তাদের সঙ্গে যোগ দিল। নতুন গড় কত?'),
          given: t('Four children average 9 years; the new child is 13 years old.', 'চার শিশুর গড় বয়স 9 বছর; নতুন শিশুর বয়স 13 বছর।'),
          find: t('The average age of all five children.', 'পাঁচ শিশুর গড় বয়স।'),
          method: t('Convert the old average to a total, add the new value and divide by five.', 'পুরোনো গড়কে মোট বয়সে বদলে নতুন বয়স যোগ করে পাঁচ দিয়ে ভাগ করো।'),
          steps: [
            t(r`Old total $= 4 \times 9 = 36$ years; new total $= 36 + 13 = 49$.`, r`পুরোনো মোট বয়স $= 4 \times 9 = 36$ বছর; নতুন মোট $= 36 + 13 = 49$।`),
            t(r`New average $= 49 \div 5 = 9.8$ years.`, r`নতুন গড় $= 49 \div 5 = 9.8$ বছর।`),
          ],
          answer: t('9.8 years', '9.8 বছর'),
          why: t('The five ages total 49 years, so their equal-share average is 9.8.', 'পাঁচজনের মোট বয়স 49 বছর, তাই সমান ভাগের গড় 9.8।'),
        },
        {
          question: t('A student has scores 60, 70 and 80. What score must be earned next to make the average 75?', 'একজন শিক্ষার্থীর নম্বর 60, 70 ও 80। গড় 75 করতে পরের পরীক্ষায় কত পেতে হবে?'),
          given: t('Current scores = 60, 70, 80; target average after 4 tests = 75.', 'বর্তমান নম্বর = 60, 70, 80; চার পরীক্ষার লক্ষ্য গড় = 75।'),
          find: t('The next test score required.', 'পরের পরীক্ষায় দরকারি নম্বর।'),
          method: t('Compare the target total for four tests with the sum of the three known scores.', 'চার পরীক্ষার লক্ষ্য মোটের সঙ্গে জানা তিনটি নম্বরের যোগফল তুলনা করো।'),
          steps: [
            t(r`Known total $= 60 + 70 + 80 = 210$; target total $= 4 \times 75 = 300$.`, r`জানা মোট $= 60 + 70 + 80 = 210$; লক্ষ্য মোট $= 4 \times 75 = 300$।`),
            t(r`Next score $= 300 - 210 = 90$.`, r`পরের নম্বর $= 300 - 210 = 90$।`),
          ],
          answer: t('90 marks', '90 নম্বর'),
          why: t('The four scores then total 300, and 300 divided by 4 equals 75.', 'তখন চারটি নম্বরের মোট 300 হবে, আর 300 ÷ 4 = 75।'),
        },
        {
          question: t('Find the average of the first 10 even natural numbers: 2, 4, …, 20.', 'প্রথম 10টি জোড় স্বাভাবিক সংখ্যা 2, 4, …, 20-এর গড় নির্ণয় করো।'),
          given: t('Ten consecutive even values start at 2 and end at 20.', 'দশটি ক্রমিক জোড় মান 2 থেকে শুরু হয়ে 20-এ শেষ।'),
          find: t('Their average.', 'এগুলির গড়।'),
          method: t('For an evenly spaced list, average the first and last values.', 'সমান ব্যবধানে বাড়া তালিকার ক্ষেত্রে প্রথম ও শেষ মানের গড় নাও।'),
          steps: [
            t(r`Average $= (2 + 20) \div 2$.`, r`গড় $= (2 + 20) \div 2$।`),
            t(r`$22 \div 2 = 11$.`, r`ভাগ করলে গড় $22 \div 2 = 11$।`),
          ],
          answer: t('11', 'গড় 11'),
          why: t('The evenly spaced values balance around the midpoint of 2 and 20.', 'সমান ব্যবধানে থাকা সংখ্যাগুলি 2 ও 20-এর মাঝের মানকে কেন্দ্র করে ভারসাম্য রাখে।'),
        },
        {
          question: t('The average of 18, 22 and 26 is what?', '18, 22 ও 26-এর গড় কত?'),
          given: t('Three values: 18, 22 and 26.', 'তিনটি মান: 18, 22 ও 26।'),
          find: t('Their average.', 'এগুলির গড়।'),
          method: t('Add all three numbers and divide by three.', 'তিনটি সংখ্যাই যোগ করে তিন দিয়ে ভাগ করো।'),
          steps: [
            t(r`Sum $= 18 + 22 + 26 = 66$.`, r`যোগফল $= 18 + 22 + 26 = 66$।`),
            t(r`Average $= 66 \div 3 = 22$.`, r`গড় $= 66 \div 3 = 22$।`),
          ],
          answer: t('22', 'গড় 22'),
          why: t('The numbers are balanced around 22, and their total 66 divided by 3 is 22.', 'সংখ্যাগুলি 22-কে কেন্দ্র করে সমান, আর 66-কে 3 দিয়ে ভাগ করলে 22 হয়।'),
        },
      ],
    },
    // ───────────────────────────── INTERMEDIATE ─────────────────────────────
    {
      level: 'intermediate',
      sections: [
        {
          heading: t('Turn the average back into a total', 'গড় থেকে মোট যোগফল'),
          body: t(
            r`Most average problems become easy once you change averages into **totals**:

$$\text{Sum} = \text{Average} \times \text{number of values}$$

If 5 numbers have average 27, their total is $5 \times 27 = 135$. Now you can add or remove numbers from this total.`,
            r`বেশিরভাগ গড়ের অঙ্ক সহজ হয়ে যায় যদি গড়কে **মোট যোগফলে** বদলে নাও:

$$\text{Sum} = \text{Average} \times \text{number of values}$$

5টি সংখ্যার গড় 27 হলে তাদের যোগফল $5 \times 27 = 135$। এবার এই যোগফল থেকে সংখ্যা যোগ বা বাদ দিতে পারো।`,
          ),
        },
        {
          heading: t('Consecutive numbers', 'ক্রমিক সংখ্যা'),
          body: t(
            r`**Consecutive** integers follow one another without gaps: 18, 19, 20, 21, …

For an **odd** count of consecutive numbers, the average is exactly the **middle** number. With 9 numbers, the middle is the 5th, so there are 4 numbers on each side:

- Largest $= \text{average} + 4$, smallest $= \text{average} - 4$.

Handy averages: first $n$ even numbers $= n + 1$; first $n$ odd numbers $= n$.`,
            r`**ক্রমিক** পূর্ণসংখ্যা মানে ফাঁক না রেখে পরপর সংখ্যা: 18, 19, 20, 21, …

**বিজোড়** সংখ্যক ক্রমিক সংখ্যার গড় ঠিক **মাঝের** সংখ্যাটি। 9টি সংখ্যা হলে মাঝেরটি 5ম, তাই দুই পাশে 4টি করে সংখ্যা থাকে:

- বৃহত্তম $= \text{average} + 4$, ক্ষুদ্রতম $= \text{average} - 4$।

কাজের গড়: প্রথম $n$-টি জোড় সংখ্যার গড় $= n + 1$; প্রথম $n$-টি বিজোড় সংখ্যার গড় $= n$।`,
          ),
        },
      ],
      examples: [
        {
          question: t('The average of 9 consecutive integers is 22. What is the largest of them?', '9টি ক্রমিক পূর্ণসংখ্যার গড় 22। এদের মধ্যে বৃহত্তমটি কত?'),
          steps: [
            t('With 9 numbers, the average 22 is the middle (5th) number.', '9টি সংখ্যার ক্ষেত্রে গড় 22 হল মাঝের (5ম) সংখ্যা।'),
            t('There are 4 numbers above it, so the largest = 22 + 4 = 26.', 'এর উপরে আরও 4টি সংখ্যা, তাই বৃহত্তম = 22 + 4 = 26।'),
            t('Check: 18, 19, …, 26 add up to 198, and 198 ÷ 9 = 22.', 'মিলিয়ে দেখো: 18, 19, …, 26-এর যোগফল 198, আর 198 ÷ 9 = 22।'),
          ],
          answer: t('26', 'বৃহত্তম সংখ্যা 26'),
        },
        {
          question: t('The average of five numbers is 27. If one number is removed, the average of the remaining numbers becomes 25. Find the removed number.', '5টি সংখ্যার গড় 27। একটি সংখ্যা বাদ দিলে বাকিগুলির গড় হয় 25। বাদ দেওয়া সংখ্যাটি কত?'),
          steps: [
            t('Total of 5 numbers = 5 × 27 = 135.', '5টি সংখ্যার যোগফল = 5 × 27 = 135।'),
            t('Total of the remaining 4 = 4 × 25 = 100.', 'বাকি 4টির যোগফল = 4 × 25 = 100।'),
            t('Removed number = 135 − 100 = 35.', 'বাদ দেওয়া সংখ্যা = 135 − 100 = 35।'),
          ],
          answer: t('35', 'বাদ দেওয়া সংখ্যাটি 35'),
        },
        {
          question: t('What is the average of the first 23 natural numbers?', 'প্রথম 23টি স্বাভাবিক সংখ্যার গড় কত?'),
          steps: [
            t(r`Average $= \frac{n + 1}{2} = \frac{23 + 1}{2}$.`, r`গড় $= \frac{n + 1}{2} = \frac{23 + 1}{2}$।`),
            t(r`$\frac{24}{2} = 12$.`, r`অর্থাৎ $\frac{24}{2} = 12$।`),
          ],
          answer: t('12', 'গড় 12'),
        },
      ],
    },
    // ───────────────────────────── ADVANCED ─────────────────────────────
    {
      level: 'advanced',
      sections: [
        {
          heading: t('Someone joins the group', 'দলে নতুন কেউ যোগ দিলে'),
          body: t(
            r`A group of $n$ has average $A$. A new member joins and the average **rises by** $d$. The newcomer must bring his own share of the new average, **plus** $d$ extra for each of the old $n$ members:

$$\text{New member} = (A + d) + n \times d$$

If the average **falls** by $d$, use $(A - d) - n \times d$.

The safe method always works too: new total $-$ old total.`,
            r`$n$ জনের একটি দলের গড় $A$। নতুন একজন যোগ দেওয়ায় গড় $d$ **বাড়ল**। নতুন সদস্যকে নিজের ভাগের নতুন গড় তো আনতেই হবে, **সঙ্গে** পুরোনো $n$ জনের প্রত্যেকের জন্য $d$ করে বাড়তি:

$$\text{New member} = (A + d) + n \times d$$

গড় $d$ **কমলে** নাও $(A - d) - n \times d$।

নিরাপদ পদ্ধতিও সবসময় খাটে: নতুন মোট $-$ পুরোনো মোট।`,
          ),
        },
        {
          heading: t('Combining two groups (weighted average)', 'দুটি দল মেলানো (ভারযুক্ত গড়)'),
          body: t(
            r`To join two groups, **do not** just average the two averages. A bigger group pulls the answer more. Add the totals and divide by the total count:

$$\text{Combined average} = \frac{n_1 A_1 + n_2 A_2}{n_1 + n_2}$$

This is called a **weighted average**: each average is "weighted" by the size of its group.`,
            r`দুটি দলকে মেলাতে গেলে শুধু দুটি গড়ের গড় নিলে **ভুল** হবে। বড় দলটি উত্তরকে বেশি টানে। মোট যোগফলগুলি যোগ করে মোট সংখ্যা দিয়ে ভাগ করো:

$$\text{Combined average} = \frac{n_1 A_1 + n_2 A_2}{n_1 + n_2}$$

একে বলে **ভারযুক্ত গড়**: প্রতিটি গড়কে তার দলের আকার অনুযায়ী "ভার" দেওয়া হয়।`,
          ),
        },
        {
          heading: t('One member is replaced', 'একজন সদস্য বদলে গেলে'),
          body: t(
            r`If one person in a group of $n$ is replaced and the average changes by $d$, the total changed by $n \times d$. So:

$$\text{New person} = \text{Old person} \pm n \times d$$

Example: in a team of 8, a player weighing 60 kg is replaced and the average weight rises by 1.5 kg. The new player weighs $60 + 8 \times 1.5 = 72$ kg.`,
            r`$n$ জনের দলে একজনকে বদলানোয় গড় $d$ পরিবর্তিত হলে মোট বদলেছে $n \times d$। তাই:

$$\text{New person} = \text{Old person} \pm n \times d$$

উদাহরণ: 8 জনের দলে 60 কেজির এক খেলোয়াড়কে বদলানোয় গড় ওজন 1.5 কেজি বাড়ল। নতুন খেলোয়াড়ের ওজন $60 + 8 \times 1.5 = 72$ কেজি।`,
          ),
        },
      ],
      examples: [
        {
          question: t('The average age of 22 students is 14 years. When the teacher\'s age is included, the average increases by 1 year. Find the teacher\'s age.', '22 জন ছাত্রছাত্রীর গড় বয়স 14 বছর। শিক্ষকের বয়স ধরলে গড় 1 বছর বাড়ে। শিক্ষকের বয়স কত?'),
          steps: [
            t('Old total = 22 × 14 = 308. New total = 23 × 15 = 345.', 'পুরোনো মোট = 22 × 14 = 308। নতুন মোট = 23 × 15 = 345।'),
            t('Teacher = 345 − 308 = 37.', 'শিক্ষকের বয়স = 345 − 308 = 37।'),
            t(r`Shortcut: $(14 + 1) + 22 \times 1 = 15 + 22 = 37$.`, r`সংক্ষিপ্ত পদ্ধতি: $(14 + 1) + 22 \times 1 = 15 + 22 = 37$।`),
          ],
          answer: t('37 years', '37 বছর'),
        },
        {
          question: t('The average of 4 numbers is 38 and the average of another 8 numbers is 68. What is the average of all 12 numbers?', '4টি সংখ্যার গড় 38 এবং অন্য 8টি সংখ্যার গড় 68। মোট 12টি সংখ্যার গড় কত?'),
          steps: [
            t('Totals: 4 × 38 = 152 and 8 × 68 = 544.', 'যোগফল: 4 × 38 = 152 এবং 8 × 68 = 544।'),
            t('Combined total = 152 + 544 = 696.', 'একসঙ্গে যোগফল = 152 + 544 = 696।'),
            t('Average = 696 ÷ 12 = 58. (Not (38 + 68) ÷ 2 = 53!)', 'গড় = 696 ÷ 12 = 58। ((38 + 68) ÷ 2 = 53 কিন্তু ভুল!)'),
          ],
          answer: t('58', 'গড় 58'),
        },
        {
          question: t('The average of 7 numbers is 22. When one more number is included, the average becomes 26. Find the new number.', '7টি সংখ্যার গড় 22। আরও একটি সংখ্যা যোগ করলে গড় হয় 26। নতুন সংখ্যাটি কত?'),
          steps: [
            t('Old total = 7 × 22 = 154. New total = 8 × 26 = 208.', 'পুরোনো মোট = 7 × 22 = 154। নতুন মোট = 8 × 26 = 208।'),
            t('New number = 208 − 154 = 54.', 'নতুন সংখ্যা = 208 − 154 = 54।'),
            t(r`Shortcut: the average rose by 4, so new number $= 26 + 7 \times 4 = 54$.`, r`সংক্ষিপ্ত পদ্ধতি: গড় 4 বেড়েছে, তাই নতুন সংখ্যা $= 26 + 7 \times 4 = 54$।`),
          ],
          answer: t('54', 'নতুন সংখ্যাটি 54'),
        },
      ],
    },
  ],
  strategy: {
    heading: t('A simple plan for average problems', 'গড়ের অঙ্কের সহজ কৌশল'),
    sections: [
      { heading: t('1. Count the values', '১. মানের সংখ্যা গোনো'), body: t('Write down how many numbers, people or matches are included. A changed group size changes the divisor.', 'কতটি সংখ্যা, ব্যক্তি বা ম্যাচ আছে লিখে নাও। দলের সদস্যসংখ্যা বদলালে ভাগের সংখ্যাও বদলায়।') },
      { heading: t('2. Find or recover the total', '২. মোট বের করো বা ফিরিয়ে নাও'), body: t('Use average = sum ÷ count. If the average is known, rearrange to sum = average × count.', 'গড় = যোগফল ÷ সংখ্যা ব্যবহার করো। গড় জানা থাকলে যোগফল = গড় × সংখ্যা করো।') },
      { heading: t('3. Notice what changes', '৩. কী বদলেছে দেখো'), body: t('When values are added or removed, first update the total, then update the count.', 'মান যোগ বা বাদ হলে আগে মোট বদলাও, তারপর মানের সংখ্যাটি বদলাও।') },
      { heading: t('4. Use endpoints for regular lists', '৪. নিয়মিত তালিকায় দুই প্রান্ত নাও'), body: t('For consecutive or evenly spaced values, average the first and last terms to find the middle average.', 'ক্রমিক বা সমান ব্যবধানে বাড়া মানের ক্ষেত্রে প্রথম ও শেষ পদের গড় নিলে মাঝের গড় পাওয়া যায়।') },
      { heading: t('5. Check scale and units', '৫. মান ও একক যাচাই করো'), body: t('An average must lie between the smallest and largest values. Keep units such as runs, years or marks in the final answer.', 'গড় সবচেয়ে ছোট ও বড়ো মানের মধ্যে থাকবে। উত্তরে রান, বছর বা নম্বরের মতো একক রাখো।') },
    ],
  },
  practice: {
    question: t('Find the average of 8, 10 and 15.', '8, 10 ও 15-এর গড় নির্ণয় করো।'),
    steps: [
      t(r`Sum $= 8 + 10 + 15 = 33$.`, r`যোগফল $= 8 + 10 + 15 = 33$।`),
      t(r`Average $= 33 \div 3 = 11$.`, r`গড় $= 33 \div 3 = 11$।`),
    ],
    answer: t('11', 'গড় 11'),
  },
  rules: [
    {
      label: t('Average', 'গড়'),
      latex: r`\text{Average} = \frac{\text{Sum of values}}{\text{Number of values}}`,
      explain: t('Share the total equally among all the values.', 'মোটকে সব রাশির মধ্যে সমানভাবে ভাগ করো।'),
    },
    {
      label: t('Sum from average', 'গড় থেকে যোগফল'),
      latex: r`\text{Sum} = \text{Average} \times n`,
      explain: t('Turn averages into totals first; most problems then become simple adding and subtracting.', 'আগে গড়কে যোগফলে বদলাও; তারপর বেশিরভাগ অঙ্ক সাধারণ যোগ-বিয়োগ হয়ে যায়।'),
    },
    {
      label: t('First n natural numbers', 'প্রথম n-টি স্বাভাবিক সংখ্যা'),
      latex: r`\text{Average} = \frac{n + 1}{2}`,
      explain: t('For any evenly spaced list, average = (first + last) ÷ 2. First n even numbers: n + 1. First n odd numbers: n.', 'সমান ব্যবধানের যেকোনো তালিকায় গড় = (প্রথম + শেষ) ÷ 2। প্রথম n-টি জোড় সংখ্যার গড় n + 1, বিজোড় সংখ্যার গড় n।'),
    },
    {
      label: t('Weighted average of two groups', 'দুটি দলের ভারযুক্ত গড়'),
      latex: r`\bar{x} = \frac{n_1 A_1 + n_2 A_2}{n_1 + n_2}`,
      explain: t('Never simply average the two averages unless the groups are the same size.', 'দুটি দলের আকার সমান না হলে কখনোই শুধু দুটি গড়ের গড় নেবে না।'),
    },
    {
      label: t('New member joins', 'নতুন সদস্য যোগ দিলে'),
      latex: r`\text{New} = (A + d) + n \times d`,
      explain: t('A is the old average of n members, d is the rise in average.', 'A হল n জনের পুরোনো গড়, d হল গড় কতটা বাড়ল।'),
    },
    {
      label: t('One member replaced', 'একজন সদস্য বদল'),
      latex: r`\text{New person} = \text{Old person} + n \times d`,
      explain: t('Use −n × d if the average falls.', 'গড় কমলে −n × d নেবে।'),
    },
  ],
  tips: [
    t('Convert every average into a total (average × count) before adding or removing anything.', 'কিছু যোগ বা বাদ দেওয়ার আগে প্রতিটি গড়কে যোগফলে (গড় × সংখ্যা) বদলে নাও।'),
    t('When someone joins, the count goes up by 1. Do not forget to use n + 1 for the new total.', 'কেউ যোগ দিলে সংখ্যা 1 বাড়ে। নতুন মোটের জন্য n + 1 নিতে ভুলো না।'),
    t('The average of two groups is not the average of their averages, unless both groups are equal in size.', 'দুটি দল সমান আকারের না হলে মিলিত গড় তাদের গড় দুটির গড় নয়।'),
    t('For an odd number of consecutive integers, the average is the middle one.', 'বিজোড় সংখ্যক ক্রমিক পূর্ণসংখ্যার গড় হল মাঝের সংখ্যাটি।'),
    t('The average must lie between the smallest and largest value. Use this to spot a wrong answer.', 'গড় সবসময় ক্ষুদ্রতম ও বৃহত্তম মানের মধ্যে থাকে। ভুল উত্তর ধরতে এটি কাজে লাগাও।'),
  ],
};
