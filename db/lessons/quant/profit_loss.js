'use strict';

// Chapter lesson: Profit, Loss & Discount. Format: see ../validate.js header.
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
  topic: 'profit_loss',
  title: t('Profit, Loss & Discount', 'লাভ, ক্ষতি ও ছাড়'),
  emoji: '🛒',
  intro: t(
    'Every shop in the market buys things at one price and sells them at another. This chapter shows how to tell whether the shopkeeper gained or lost money, by how much, and how a "sale" discount changes the picture.',
    'বাজারের প্রতিটি দোকান একটি দামে জিনিস কেনে আর অন্য দামে বেচে। দোকানদারের লাভ হল না ক্ষতি, কতটা হল, আর "সেল"-এর ছাড় দিলে হিসাব কেমন বদলায় — এই অধ্যায়ে আমরা তা-ই শিখব।',
  ),
  strategy: {
    heading: t('A beginner’s decision guide', 'নতুনদের সিদ্ধান্ত নেওয়ার সহজ কৌশল'),
    sections: [
      { heading: t('1. Name the prices first', '1. আগে দামগুলোর নাম লেখো'), body: t('Write CP for the buying cost, SP for the selling price, and MP for the marked price. Do not mix them up.', 'কেনার দামকে CP, বিক্রির দামকে SP এবং গায়ের দামকে MP লেখো। এগুলো গুলিয়ে ফেলো না।') },
      { heading: t('2. Decide: profit or loss?', '2. লাভ না ক্ষতি ঠিক করো'), body: t('Compare SP with CP. SP > CP means profit; SP < CP means loss; equal prices mean neither.', 'SP ও CP তুলনা করো। SP > CP হলে লাভ, SP < CP হলে ক্ষতি, আর সমান হলে লাভ-ক্ষতি কোনোটিই নেই।') },
      { heading: t('3. Use CP as the percent base', '3. শতকরার ভিত্তি CP ধরো'), body: t('For ordinary profit or loss percent, divide the profit or loss by CP, then multiply by 100. Check the denominator before calculating.', 'সাধারণ লাভ বা ক্ষতির শতকরা হার পেতে লাভ বা ক্ষতিকে CP দিয়ে ভাগ করে 100 দিয়ে গুণ করো। হিসাবের আগে হরটি ঠিক আছে কি না দেখো।') },
      { heading: t('4. Work backward when SP is known', '4. SP জানা থাকলে উল্টো হিসাব করো'), body: t('At p% profit, SP is (100 + p)% of CP; at p% loss, SP is (100 − p)% of CP. Divide by that percentage factor to recover CP.', 'p% লাভে SP হল CP-এর (100 + p)% ; p% ক্ষতিতে SP হল CP-এর (100 − p)%। CP পেতে SP-কে ওই শতকরা গুণক দিয়ে ভাগ করো।') },
      { heading: t('5. Handle discounts from MP', '5. MP থেকে ছাড় হিসাব করো'), body: t('Discount = MP − SP, and discount percent is based on MP. With successive discounts, apply each discount to the new price, not the original MP.', 'ছাড় = MP − SP, আর ছাড়ের শতকরা হার MP-এর উপর হিসাব হয়। পরপর ছাড় হলে প্রতিটি ছাড় নতুন দামের উপর দাও, আগের MP-এর উপর নয়।') },
      { heading: t('6. Check whether the result makes sense', '6. উত্তরটি যুক্তিসঙ্গত কি না মিলিয়ে নাও'), body: t('A profit makes SP larger than CP; a loss makes it smaller. A discount lowers MP. Estimate the amount and include ₹ or % in the final answer.', 'লাভ হলে SP, CP-এর চেয়ে বড়; ক্ষতি হলে ছোট। ছাড়ে MP কমে। পরিমাণটি আনুমানিক মিলিয়ে শেষ উত্তরে ₹ বা % লিখো।') },
    ],
  },
  practice: {
    question: t('A book costs ₹640. Find its selling price at a profit of 12.5%.', 'একটি বইয়ের ক্রয়মূল্য ₹640। 12.5% লাভে বিক্রয়মূল্য কত?'),
    steps: [
      t('Profit = 12.5% of ₹640 = 640 ÷ 8 = ₹80.', 'লাভ = ₹640-এর 12.5% = 640 ÷ 8 = ₹80।'),
      t('SP = CP + profit = 640 + 80 = ₹720.', 'SP = CP + লাভ = 640 + 80 = ₹720।'),
    ],
    answer: t('₹720', 'বিক্রয়মূল্য ₹720।'),
  },
  levels: [
    // ───────────────────────────── BASIC ─────────────────────────────
    {
      level: 'basic',
      sections: [
        {
          heading: t('Cost price and selling price', 'ক্রয়মূল্য ও বিক্রয়মূল্য'),
          body: t(
            r`- **Cost price (CP):** the money a shopkeeper **pays** to buy a thing.
- **Selling price (SP):** the money he **gets** when he sells it.

If SP is more than CP, he makes a **profit** (gain). If SP is less than CP, he makes a **loss**.

- Profit $= \text{SP} - \text{CP}$
- Loss $= \text{CP} - \text{SP}$`,
            r`- **ক্রয়মূল্য (CP):** দোকানদার একটি জিনিস কিনতে যে টাকা **দেয়**।
- **বিক্রয়মূল্য (SP):** জিনিসটি বিক্রি করে সে যে টাকা **পায়**।

SP যদি CP-এর থেকে বেশি হয়, তবে **লাভ** হয়। SP যদি CP-এর থেকে কম হয়, তবে **ক্ষতি** হয়।

- লাভ $= \text{SP} - \text{CP}$
- ক্ষতি $= \text{CP} - \text{SP}$`,
          ),
        },
        {
          heading: t('Profit percent and loss percent', 'শতকরা লাভ ও শতকরা ক্ষতি'),
          body: t(
            r`A profit of ₹5 is great on a ₹10 pen but tiny on a ₹1000 bicycle. So we compare the profit with the **cost price**, as a percentage:

$$\text{Profit \%} = \frac{\text{Profit}}{\text{CP}} \times 100 \qquad \text{Loss \%} = \frac{\text{Loss}}{\text{CP}} \times 100$$

Profit and loss percents are **always on CP**, unless the question clearly says otherwise.`,
            r`₹10-এর কলমে ₹5 লাভ অনেক, কিন্তু ₹1000-এর সাইকেলে ₹5 লাভ খুবই সামান্য। তাই লাভকে **ক্রয়মূল্যের** সঙ্গে তুলনা করে শতকরায় প্রকাশ করি:

$$\text{Profit \%} = \frac{\text{Profit}}{\text{CP}} \times 100 \qquad \text{Loss \%} = \frac{\text{Loss}}{\text{CP}} \times 100$$

প্রশ্নে অন্য কিছু স্পষ্ট বলা না থাকলে শতকরা লাভ-ক্ষতি **সবসময় ক্রয়মূল্যের উপর** হিসাব হয়।`,
          ),
        },
        {
          heading: t('Finding the selling price', 'বিক্রয়মূল্য বের করা'),
          body: t(
            r`Take CP as $100\%$.

- A $10\%$ profit means SP is $110\%$ of CP.
- A $30\%$ loss means SP is $70\%$ of CP.

$$\text{SP} = \text{CP} \times \frac{100 + \text{profit \%}}{100} \quad \text{or} \quad \text{SP} = \text{CP} \times \frac{100 - \text{loss \%}}{100}$$`,
            r`ক্রয়মূল্যকে $100\%$ ধরো।

- $10\%$ লাভ মানে SP হল CP-এর $110\%$।
- $30\%$ ক্ষতি মানে SP হল CP-এর $70\%$।

$$\text{SP} = \text{CP} \times \frac{100 + \text{profit \%}}{100} \quad \text{or} \quad \text{SP} = \text{CP} \times \frac{100 - \text{loss \%}}{100}$$`,
          ),
        },
      ],
      examples: [
        {
          question: t('Ravi buys a pen for ₹20 and sells it for ₹25. Find his profit percent.', 'রবি ₹20 দিয়ে একটি কলম কিনে ₹25-এ বিক্রি করল। তার শতকরা লাভ কত?'),
          given: t('CP = ₹20; SP = ₹25.', 'ক্রয়মূল্য CP = ₹20; বিক্রয়মূল্য SP = ₹25।'),
          find: t('Profit percent.', 'শতকরা লাভ।'),
          method: t('Find profit, then divide it by CP and multiply by 100.', 'লাভ বের করে CP দিয়ে ভাগ করে 100 দিয়ে গুণ করি।'),
          steps: [
            t('Profit = 25 − 20 = ₹5.', 'লাভ = 25 − 20 = ₹5।'),
            t(r`Profit % $= \frac{5}{20} \times 100 = 25$.`, r`শতকরা লাভ $= \frac{5}{20} \times 100 = 25$।`),
          ],
          answer: t('25% profit', '25% লাভ'),
          why: t('The ₹5 gain is one quarter of the ₹20 cost.', '₹5 লাভ হল ₹20 ক্রয়মূল্যের এক-চতুর্থাংশ।'),
        },
        {
          question: t('A shopkeeper buys a toy for ₹80 and sells it for ₹68. Find the loss percent.', 'একজন দোকানদার ₹80 দিয়ে একটি খেলনা কিনে ₹68-এ বিক্রি করল। শতকরা ক্ষতি কত?'),
          given: t('CP = ₹80; SP = ₹68.', 'ক্রয়মূল্য CP = ₹80; বিক্রয়মূল্য SP = ₹68।'),
          find: t('Loss percent.', 'শতকরা ক্ষতি।'),
          method: t('Find loss, then compare it with CP.', 'ক্ষতি বের করে CP-এর সঙ্গে তুলনা করি।'),
          steps: [
            t('Loss = 80 − 68 = ₹12.', 'ক্ষতি = 80 − 68 = ₹12।'),
            t(r`Loss % $= \frac{12}{80} \times 100 = 15$.`, r`শতকরা ক্ষতি $= \frac{12}{80} \times 100 = 15$।`),
          ],
          answer: t('15% loss', '15% ক্ষতি'),
          why: t('The ₹12 loss is 12 out of every 80 rupees of cost.', '₹12 ক্ষতি হল প্রতি ₹80 ক্রয়মূল্যের মধ্যে ₹12।'),
        },
        {
          question: t('An article bought for ₹1200 is sold at a profit of 10%. Find the selling price.', '₹1200-এ কেনা একটি জিনিস 10% লাভে বিক্রি করা হল। বিক্রয়মূল্য কত?'),
          given: t('CP = ₹1200; profit = 10%.', 'ক্রয়মূল্য CP = ₹1200; লাভ = 10%।'),
          find: t('Selling price (SP).', 'বিক্রয়মূল্য (SP)।'),
          method: t('Add the profit amount to CP.', 'লাভের পরিমাণ CP-এর সঙ্গে যোগ করি।'),
          steps: [
            t(r`$10\%$ of 1200 is 120.`, r`1200-এর $10\%$ হল 120।`),
            t('SP = 1200 + 120 = ₹1320.', 'বিক্রয়মূল্য = 1200 + 120 = ₹1320।'),
          ],
          answer: t('SP = ₹1320', 'বিক্রয়মূল্য ₹1320'),
          why: t('A 10% gain adds one tenth of the cost to the cost.', '10% লাভ মানে ক্রয়মূল্যের এক-দশমাংশ ক্রয়মূল্যের সঙ্গে যোগ হয়।'),
        },
        solved(
          ['A bag costs ₹500 and sells for ₹575. Find the profit percent.', 'একটি ব্যাগের ক্রয়মূল্য ₹500 এবং বিক্রয়মূল্য ₹575। শতকরা লাভ কত?'],
          ['CP = ₹500; SP = ₹575.', 'ক্রয়মূল্য CP = ₹500; বিক্রয়মূল্য SP = ₹575।'],
          ['Profit percent.', 'শতকরা লাভ।'],
          ['Subtract CP from SP, then use CP as the base.', 'SP থেকে CP বিয়োগ করে CP-কে ভিত্তি ধরি।'],
          [['Profit = 575 − 500 = ₹75.', 'লাভ = 575 − 500 = ₹75।'], [r`Profit % $= \frac{75}{500}\times100=15\%$.`, r`লাভের হার $= \frac{75}{500}\times100=15\%$।`]],
          ['15% profit.', '15% লাভ।'],
          ['₹75 is 15 hundredths of the ₹500 cost.', '₹75 হল ₹500 ক্রয়মূল্যের 15 শতকাংশ।'],
        ),
        solved(
          ['An item costs ₹800 and is sold at a 10% loss. Find its selling price.', 'একটি জিনিসের ক্রয়মূল্য ₹800 এবং 10% ক্ষতিতে বিক্রি হল। বিক্রয়মূল্য কত?'],
          ['CP = ₹800; loss = 10%.', 'CP = ₹800; ক্ষতি = 10%।'],
          ['Selling price (SP).', 'বিক্রয়মূল্য (SP)।'],
          ['Find the loss amount and subtract it from CP.', 'ক্ষতির পরিমাণ বের করে CP থেকে বিয়োগ করি।'],
          [['Loss = 10% of 800 = ₹80.', 'ক্ষতি = 800-এর 10% = ₹80।'], ['SP = 800 − 80 = ₹720.', 'বিক্রয়মূল্য SP = 800 − 80 = ₹720।']],
          ['₹720.', 'বিক্রয়মূল্য ₹720।'],
          ['After losing ₹80 from the ₹800 cost, ₹720 remains as the sale price.', '₹800 ক্রয়মূল্য থেকে ₹80 ক্ষতি বাদ দিলে বিক্রয়মূল্য ₹720 থাকে।'],
        ),
        solved(
          ['An article sells for ₹990 at a profit of 10%. Find its cost price.', 'একটি জিনিস 10% লাভে ₹990-এ বিক্রি হয়। ক্রয়মূল্য কত?'],
          ['SP = ₹990; profit = 10%.', 'SP = ₹990; লাভ = 10%।'],
          ['Cost price (CP).', 'ক্রয়মূল্য (CP)।'],
          ['At 10% profit, SP is 110% of CP; divide SP by 1.10.', '10% লাভে SP হল CP-এর 110%; SP-কে 1.10 দিয়ে ভাগ করি।'],
          [['110% = 1.10, so CP = 990 ÷ 1.10.', '110% = 1.10, তাই CP = 990 ÷ 1.10।'], ['CP = ₹900; check: 10% of 900 is ₹90 and 900 + 90 = 990.', 'CP = ₹900; মিলিয়ে দেখি: 900-এর 10% হল ₹90 এবং 900 + 90 = 990।']],
          ['₹900.', 'ক্রয়মূল্য ₹900।'],
          ['Adding 10% to ₹900 gives the stated ₹990 selling price.', '₹900-এর সঙ্গে 10% যোগ করলে প্রশ্নের ₹990 বিক্রয়মূল্যই হয়।'],
        ),
        solved(
          ['An item sells for ₹540 at a loss of 10%. Find its cost price.', 'একটি জিনিস 10% ক্ষতিতে ₹540-এ বিক্রি হয়। ক্রয়মূল্য কত?'],
          ['SP = ₹540; loss = 10%.', 'SP = ₹540; ক্ষতি = 10%।'],
          ['Cost price (CP).', 'ক্রয়মূল্য (CP)।'],
          ['At 10% loss, SP is 90% of CP; divide by 0.90.', '10% ক্ষতিতে SP হল CP-এর 90%; 0.90 দিয়ে ভাগ করি।'],
          [['90% = 0.90, so CP = 540 ÷ 0.90.', '90% = 0.90, তাই CP = 540 ÷ 0.90।'], ['CP = ₹600; the loss is 600 − 540 = ₹60, which is 10% of 600.', 'CP = ₹600; ক্ষতি 600 − 540 = ₹60, যা 600-এর 10%।']],
          ['₹600.', 'ক্রয়মূল্য ₹600।'],
          ['₹540 is 90% of ₹600, leaving exactly a 10% loss.', '₹540 হল ₹600-এর 90%, অর্থাৎ ঠিক 10% ক্ষতি হয়েছে।'],
        ),
        solved(
          ['A shirt has a marked price of ₹200 and a discount of 15%. Find its selling price.', 'একটি জামার গায়ের দাম ₹200 এবং ছাড় 15%। বিক্রয়মূল্য কত?'],
          ['MP = ₹200; discount = 15%.', 'MP = ₹200; ছাড় = 15%।'],
          ['Selling price after discount.', 'ছাড়ের পর বিক্রয়মূল্য।'],
          ['Subtract the discount, calculated on MP.', 'MP-এর উপর ছাড় হিসাব করে তা বিয়োগ করি।'],
          [['Discount = 15% of 200 = ₹30.', 'ছাড় = 200-এর 15% = ₹30।'], ['SP = MP − discount = 200 − 30 = ₹170.', 'SP = MP − ছাড় = 200 − 30 = ₹170।']],
          ['₹170.', 'বিক্রয়মূল্য ₹170।'],
          ['The buyer pays the marked price less the ₹30 reduction.', 'ক্রেতা গায়ের দাম থেকে ₹30 কম দিয়ে, অর্থাৎ ₹170 দেয়।'],
        ),
        solved(
          ['A marked price of ₹1500 receives successive discounts of 20% and 10%. Find the final price.', '₹1500 গায়ের দামে পরপর 20% ও 10% ছাড় দেওয়া হল। শেষ দাম কত?'],
          ['MP = ₹1500; discounts = 20%, then 10%.', 'MP = ₹1500; ছাড় যথাক্রমে 20%, তারপর 10%।'],
          ['Final selling price.', 'শেষ বিক্রয়মূল্য।'],
          ['Apply each discount to the price remaining at that step.', 'প্রতিটি ধাপে যে দাম থাকে, তার উপর পরের ছাড় দিই।'],
          [['After 20% off: 1500 × 80/100 = ₹1200.', '20% ছাড়ের পর: 1500 × 80/100 = ₹1200।'], ['After another 10% off: 1200 × 90/100 = ₹1080.', 'আরও 10% ছাড়ের পর: 1200 × 90/100 = ₹1080।']],
          ['₹1080.', 'শেষ দাম ₹1080।'],
          ['The second discount is 10% of ₹1200, not 10% of the original ₹1500.', 'দ্বিতীয় ছাড়টি ₹1200-এর 10%, মূল ₹1500-এর 10% নয়।'],
        ),
        solved(
          ['An item costs ₹400. Find its selling price at a profit of 25%.', 'একটি জিনিসের ক্রয়মূল্য ₹400। 25% লাভে বিক্রয়মূল্য কত?'],
          ['CP = ₹400; profit = 25%.', 'CP = ₹400; লাভ = 25%।'],
          ['Selling price (SP).', 'বিক্রয়মূল্য (SP)।'],
          ['Calculate 25% of CP and add it to CP.', 'CP-এর 25% বের করে CP-এর সঙ্গে যোগ করি।'],
          [['Profit = 400 × 25/100 = ₹100.', 'লাভ = 400 × 25/100 = ₹100।'], ['SP = 400 + 100 = ₹500.', 'বিক্রয়মূল্য SP = 400 + 100 = ₹500।']],
          ['₹500.', 'বিক্রয়মূল্য ₹500।'],
          ['A 25% profit adds one quarter of ₹400, which is ₹100.', '25% লাভ মানে ₹400-এর এক-চতুর্থাংশ, অর্থাৎ ₹100 যোগ হয়।'],
        ),
      ],
    },
    // ───────────────────────────── INTERMEDIATE ─────────────────────────────
    {
      level: 'intermediate',
      sections: [
        {
          heading: t('Finding the cost price from the selling price', 'বিক্রয়মূল্য থেকে ক্রয়মূল্য বের করা'),
          body: t(
            r`Sometimes we know SP and the profit or loss %, and must find CP. Go **backwards**: divide instead of multiply.

$$\text{CP} = \text{SP} \times \frac{100}{100 + \text{profit \%}} \quad \text{or} \quad \text{CP} = \text{SP} \times \frac{100}{100 - \text{loss \%}}$$

**Careful:** do not take the percent of SP. A $10\%$ profit is $10\%$ of **CP**, which we do not know yet.`,
            r`কখনো SP আর শতকরা লাভ বা ক্ষতি জানা থাকে, CP বের করতে হয়। তখন **উল্টো দিকে** যাও: গুণ নয়, ভাগ করো।

$$\text{CP} = \text{SP} \times \frac{100}{100 + \text{profit \%}} \quad \text{or} \quad \text{CP} = \text{SP} \times \frac{100}{100 - \text{loss \%}}$$

**সাবধান:** SP-এর শতকরা নেবে না। $10\%$ লাভ মানে **CP**-এর $10\%$, আর CP-ই তো এখনো অজানা।`,
          ),
        },
        {
          heading: t('Marked price and discount', 'ধার্যমূল্য ও ছাড়'),
          body: t(
            r`- **Marked price (MP):** the price written on the tag. It is also called the list price.
- **Discount:** the money taken off the marked price. A discount is **always on MP**.

$$\text{SP} = \text{MP} - \text{Discount} \qquad \text{Discount \%} = \frac{\text{Discount}}{\text{MP}} \times 100$$

A shirt tagged ₹800 with $15\%$ off: discount $= 120$, so you pay ₹680.`,
            r`- **ধার্যমূল্য (MP):** জিনিসের গায়ে লেখা দাম। একে তালিকা-মূল্যও বলে।
- **ছাড়:** ধার্যমূল্য থেকে যে টাকা কমিয়ে দেওয়া হয়। ছাড় **সবসময় ধার্যমূল্যের উপর**।

$$\text{SP} = \text{MP} - \text{Discount} \qquad \text{Discount \%} = \frac{\text{Discount}}{\text{MP}} \times 100$$

₹800 দাম লেখা একটি জামায় $15\%$ ছাড়: ছাড় $= 120$, তাই দিতে হবে ₹680।`,
          ),
        },
      ],
      examples: [
        {
          question: t('An article bought for ₹1300 is sold at a loss of 30%. Find the selling price.', '₹1300-এ কেনা একটি জিনিস 30% ক্ষতিতে বিক্রি হল। বিক্রয়মূল্য কত?'),
          steps: [
            t(r`After a $30\%$ loss, SP is $70\%$ of CP.`, r`$30\%$ ক্ষতিতে SP হল CP-এর $70\%$।`),
            t(r`SP $= 1300 \times \frac{70}{100} = 13 \times 70 = 910$.`, r`বিক্রয়মূল্য $= 1300 \times \frac{70}{100} = 13 \times 70 = 910$।`),
          ],
          answer: t('SP = ₹910', 'বিক্রয়মূল্য ₹910'),
        },
        {
          question: t('By selling an article for ₹1800, a trader makes a loss of 25%. What is the cost price?', 'একটি জিনিস ₹1800-এ বিক্রি করে এক ব্যবসায়ীর 25% ক্ষতি হল। ক্রয়মূল্য কত?'),
          steps: [
            t(r`SP is $75\%$ of CP, so CP $= 1800 \times \frac{100}{75}$.`, r`SP হল CP-এর $75\%$, তাই CP $= 1800 \times \frac{100}{75}$।`),
            t(r`$1800 \times \frac{4}{3} = 600 \times 4 = 2400$.`, r`অর্থাৎ $1800 \times \frac{4}{3} = 600 \times 4 = 2400$।`),
            t('Check: 25% of 2400 is 600, and 2400 − 600 = 1800. Correct.', 'মিলিয়ে দেখো: 2400-এর 25% হল 600, আর 2400 − 600 = 1800। ঠিক আছে।'),
          ],
          answer: t('CP = ₹2400', 'ক্রয়মূল্য ₹2400'),
        },
        {
          question: t('By selling an article for ₹4048, a trader makes a profit of 10%. What is the cost price?', 'একটি জিনিস ₹4048-এ বিক্রি করে এক ব্যবসায়ীর 10% লাভ হল। ক্রয়মূল্য কত?'),
          steps: [
            t(r`SP is $110\%$ of CP, so CP $= 4048 \times \frac{100}{110}$.`, r`SP হল CP-এর $110\%$, তাই CP $= 4048 \times \frac{100}{110}$।`),
            t(r`$\frac{404800}{110} = 3680$.`, r`$\frac{404800}{110} = 3680$ (ভাগ করে পাই)।`),
            t('Check: 10% of 3680 is 368, and 3680 + 368 = 4048. Correct.', 'মিলিয়ে দেখো: 3680-এর 10% হল 368, আর 3680 + 368 = 4048। ঠিক আছে।'),
          ],
          answer: t('CP = ₹3680', 'ক্রয়মূল্য ₹3680'),
        },
      ],
    },
    // ───────────────────────────── ADVANCED ─────────────────────────────
    {
      level: 'advanced',
      sections: [
        {
          heading: t('Mark-up and discount together', 'দাম বাড়িয়ে লেখা ও ছাড় একসঙ্গে'),
          body: t(
            r`Shopkeepers often **mark up** (write a price above CP) and then give a discount. These are two successive percentage changes, so use the same shortcut as in Percentage:

$$\text{Net \%} = m - d - \frac{m \times d}{100}$$

where $m$ = mark-up % and $d$ = discount %. A positive answer is a profit, a negative answer is a loss.

Example: mark up $60\%$, discount $40\%$: $60 - 40 - 24 = -4$, so a $4\%$ **loss**.

**Two discounts one after another** ($20\%$ then $10\%$) equal a single discount of $20 + 10 - \frac{20 \times 10}{100} = 28\%$, not $30\%$.`,
            r`দোকানদাররা প্রায়ই ক্রয়মূল্যের থেকে **বেশি দাম লেখে** (মার্ক-আপ), তারপর ছাড় দেয়। এ দুটি পরপর শতকরা পরিবর্তন, তাই শতকরা অধ্যায়ের সংক্ষিপ্ত সূত্রটিই খাটে:

$$\text{Net \%} = m - d - \frac{m \times d}{100}$$

এখানে $m$ = শতকরা কত বেশি লেখা হয়েছে, $d$ = শতকরা ছাড়। উত্তর ধনাত্মক হলে লাভ, ঋণাত্মক হলে ক্ষতি।

উদাহরণ: $60\%$ বেশি লেখা, $40\%$ ছাড়: $60 - 40 - 24 = -4$, অর্থাৎ $4\%$ **ক্ষতি**।

**পরপর দুটি ছাড়** ($20\%$ তারপর $10\%$) মিলে একটি $20 + 10 - \frac{20 \times 10}{100} = 28\%$ ছাড়ের সমান, $30\%$ নয়।`,
          ),
        },
        {
          heading: t('Same selling price, x% gain and x% loss', 'একই বিক্রয়মূল্যে x% লাভ ও x% ক্ষতি'),
          body: t(
            r`If two things are sold **at the same price**, one at $x\%$ profit and the other at $x\%$ loss, the trader **always loses** overall:

$$\text{Loss \%} = \frac{x^2}{100}$$

Why? The loss is on the costlier item, so the rupees lost are more than the rupees gained.`,
            r`দুটি জিনিস **একই দামে** বিক্রি হলে, একটিতে $x\%$ লাভ আর অন্যটিতে $x\%$ ক্ষতি হলে, মোটের উপর ব্যবসায়ীর **সবসময় ক্ষতি** হয়:

$$\text{Loss \%} = \frac{x^2}{100}$$

কেন? ক্ষতিটা হয় বেশি দামি জিনিসটিতে, তাই যত টাকা ক্ষতি হয় তা লাভের টাকার থেকে বেশি।`,
          ),
        },
        {
          heading: t('CP of n articles = SP of m articles', 'n-টি জিনিসের ক্রয়মূল্য = m-টি জিনিসের বিক্রয়মূল্য'),
          body: t(
            r`If the cost of $n$ articles equals the selling price of $m$ articles, the shopkeeper earns the money of $n - m$ extra articles on every $m$ he sells:

$$\text{Gain \%} = \frac{n - m}{m} \times 100$$

If $m > n$ the answer comes out negative, which means a loss.`,
            r`$n$-টি জিনিসের ক্রয়মূল্য যদি $m$-টি জিনিসের বিক্রয়মূল্যের সমান হয়, তবে প্রতি $m$-টি বিক্রিতে দোকানদার $n - m$-টি জিনিসের দাম বেশি পায়:

$$\text{Gain \%} = \frac{n - m}{m} \times 100$$

$m > n$ হলে উত্তর ঋণাত্মক হবে, অর্থাৎ ক্ষতি।`,
          ),
        },
      ],
      examples: [
        {
          question: t('A shopkeeper marks his goods 40% above the cost price and allows a discount of 10%. What is his profit or loss percentage?', 'একজন দোকানদার ক্রয়মূল্যের থেকে 40% বেশি দাম লেখেন এবং 10% ছাড় দেন। তাঁর শতকরা লাভ বা ক্ষতি কত?'),
          steps: [
            t(r`Net $= 40 - 10 - \frac{40 \times 10}{100} = 30 - 4 = 26$.`, r`মোট $= 40 - 10 - \frac{40 \times 10}{100} = 30 - 4 = 26$।`),
            t('Check with CP = 100: MP = 140, discount 10% of 140 = 14, SP = 126. Profit 26.', 'CP = 100 ধরে মিলিয়ে দেখো: MP = 140, 140-এর 10% ছাড় = 14, SP = 126। লাভ 26।'),
          ],
          answer: t('26% profit', '26% লাভ'),
        },
        {
          question: t('The cost price of 13 articles is equal to the selling price of 10 articles. Find the gain percent.', '13টি জিনিসের ক্রয়মূল্য 10টি জিনিসের বিক্রয়মূল্যের সমান। শতকরা লাভ কত?'),
          steps: [
            t(r`Here $n = 13$, $m = 10$.`, r`এখানে $n = 13$, $m = 10$।`),
            t(r`Gain % $= \frac{13 - 10}{10} \times 100 = 30$.`, r`শতকরা লাভ $= \frac{13 - 10}{10} \times 100 = 30$।`),
            t('Check: let each article cost ₹1. Then 10 articles sell for ₹13, so each sells for ₹1.30, a 30% gain.', 'মিলিয়ে দেখো: প্রতিটির দাম ₹1 ধরো। তাহলে 10টি বিক্রি হয় ₹13-এ, অর্থাৎ প্রতিটি ₹1.30, লাভ 30%।'),
          ],
          answer: t('30% gain', '30% লাভ'),
        },
        {
          question: t('Two articles are sold at the same price; one at a gain of 20% and the other at a loss of 20%. What is the overall loss percent?', 'দুটি জিনিস একই দামে বিক্রি হল; একটিতে 20% লাভ, অন্যটিতে 20% ক্ষতি। মোট শতকরা ক্ষতি কত?'),
          steps: [
            t(r`Shortcut: loss $= \frac{20^2}{100} = 4\%$.`, r`সংক্ষিপ্ত সূত্র: ক্ষতি $= \frac{20^2}{100} = 4\%$।`),
            t('Check: let each SP be ₹120. CP of the first = 100, CP of the second = 150. Total CP = 250, total SP = 240.', 'মিলিয়ে দেখো: প্রতিটির SP ₹120 ধরো। প্রথমটির CP = 100, দ্বিতীয়টির CP = 150। মোট CP = 250, মোট SP = 240।'),
            t(r`Loss $= 10$, and $\frac{10}{250} \times 100 = 4$.`, r`ক্ষতি $= 10$, আর $\frac{10}{250} \times 100 = 4$।`),
          ],
          answer: t('4% loss', '4% ক্ষতি'),
        },
      ],
    },
  ],
  rules: [
    {
      label: t('Profit and loss', 'লাভ ও ক্ষতি'),
      latex: r`\text{Profit} = \text{SP} - \text{CP}, \qquad \text{Loss} = \text{CP} - \text{SP}`,
      explain: t('Selling for more than you paid is profit; selling for less is loss.', 'যত দিয়ে কিনেছ তার থেকে বেশি দামে বেচলে লাভ, কম দামে বেচলে ক্ষতি।'),
    },
    {
      label: t('Profit % and loss %', 'শতকরা লাভ ও ক্ষতি'),
      latex: r`\text{Profit \%} = \frac{\text{Profit}}{\text{CP}} \times 100`,
      explain: t('Profit and loss percent are always counted on the cost price.', 'শতকরা লাভ-ক্ষতি সবসময় ক্রয়মূল্যের উপর হিসাব হয়।'),
    },
    {
      label: t('Selling price from cost price', 'ক্রয়মূল্য থেকে বিক্রয়মূল্য'),
      latex: r`\text{SP} = \text{CP} \times \frac{100 \pm x}{100}`,
      explain: t('Use + for a profit of x% and − for a loss of x%.', 'x% লাভে + আর x% ক্ষতিতে − নেবে।'),
    },
    {
      label: t('Cost price from selling price', 'বিক্রয়মূল্য থেকে ক্রয়মূল্য'),
      latex: r`\text{CP} = \text{SP} \times \frac{100}{100 \pm x}`,
      explain: t('Go backwards by dividing. Never take the percent of SP.', 'উল্টো দিকে ভাগ করে যাও। কখনো SP-এর শতকরা নেবে না।'),
    },
    {
      label: t('Discount', 'ছাড়'),
      latex: r`\text{SP} = \text{MP} \times \frac{100 - d}{100}`,
      explain: t('A discount of d% is always taken on the marked price.', 'd% ছাড় সবসময় ধার্যমূল্যের উপর।'),
    },
    {
      label: t('Mark-up then discount', 'বেশি দাম লিখে ছাড়'),
      latex: r`\text{Net \%} = m - d - \frac{md}{100}`,
      explain: t('Positive means profit, negative means loss. Works for two successive discounts too (use −d₁ and −d₂).', 'ধনাত্মক হলে লাভ, ঋণাত্মক হলে ক্ষতি। পরপর দুটি ছাড়েও খাটে (−d₁ ও −d₂ নিয়ে)।'),
    },
    {
      label: t('Same SP, x% gain and x% loss', 'একই SP-তে x% লাভ ও x% ক্ষতি'),
      latex: r`\text{Loss \%} = \frac{x^2}{100}`,
      explain: t('There is always a small overall loss, never "no profit no loss".', 'মোটের উপর সবসময় সামান্য ক্ষতি হয়, কখনোই "লাভও নয় ক্ষতিও নয়" হয় না।'),
    },
    {
      label: t('CP of n articles = SP of m articles', 'n-টির ক্রয়মূল্য = m-টির বিক্রয়মূল্য'),
      latex: r`\text{Gain \%} = \frac{n - m}{m} \times 100`,
      explain: t('Divide by m, the number of articles sold.', 'যতগুলি বিক্রি হয়েছে, সেই m দিয়ে ভাগ করবে।'),
    },
  ],
  tips: [
    t('Profit and loss % are on CP. Discount % is on MP. Mixing them up is the most common mistake.', 'শতকরা লাভ-ক্ষতি CP-এর উপর, শতকরা ছাড় MP-এর উপর। এ দুটি গুলিয়ে ফেলাই সবচেয়ে সাধারণ ভুল।'),
    t('To find CP from SP, divide by (100 + profit%)/100. Taking 10% of SP and subtracting gives a wrong answer.', 'SP থেকে CP পেতে (100 + লাভ%)/100 দিয়ে ভাগ করো। SP-এর 10% বাদ দিলে উত্তর ভুল হবে।'),
    t('Two discounts of 20% and 10% are not 30% off; they equal 28% off.', '20% আর 10% দুটি ছাড় মানে 30% ছাড় নয়; তা 28% ছাড়ের সমান।'),
    t('When no numbers are given, take CP = 100. Then the profit in rupees is the profit percent.', 'কোনো সংখ্যা দেওয়া না থাকলে CP = 100 ধরো। তখন টাকায় লাভই শতকরা লাভ।'),
    t('Same SP with equal gain% and loss% always means a loss of x²/100 percent.', 'একই SP-তে সমান শতকরা লাভ ও ক্ষতি হলে সবসময় x²/100 শতাংশ ক্ষতি।'),
  ],
};
