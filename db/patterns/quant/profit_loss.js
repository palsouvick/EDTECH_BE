'use strict';

// Question patterns: Profit, Loss & Discount. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'profit_loss',
  patterns: [
    // 1 ─────────────────────────────────────────────
    {
      key: 'profit_loss_percent',
      emoji: '💰',
      name: t('Find the profit % or loss %', 'লাভ % বা ক্ষতি % নির্ণয়'),
      spot: t(
        'The cost price (CP) and selling price (SP) are both given, and the question asks "profit per cent" or "loss per cent".',
        'ক্রয়মূল্য (CP) আর বিক্রয়মূল্য (SP) দুটোই দেওয়া থাকে, আর প্রশ্নে "শতকরা লাভ" বা "শতকরা ক্ষতি" জানতে চায়।',
      ),
      method: [
        t('If SP > CP it is a profit; if SP < CP it is a loss. Find the difference.', 'SP > CP হলে লাভ; SP < CP হলে ক্ষতি। পার্থক্যটা বের করো।'),
        t(r`Profit % or Loss % $= \frac{\text{difference}}{\text{CP}} \times 100$.`, r`লাভ % বা ক্ষতি % $= \frac{\text{পার্থক্য}}{\text{CP}} \times 100$।`),
        t('Always divide by CP, never by SP.', 'সবসময় CP দিয়ে ভাগ করবে, কখনো SP দিয়ে নয়।'),
      ],
      example: {
        question: t('A shopkeeper buys a toy for ₹400 and sells it for ₹460. Find his profit per cent.', 'একজন দোকানদার ₹400-এ একটা খেলনা কিনে ₹460-এ বিক্রি করলেন। শতকরা লাভ কত?'),
        steps: [
          t('SP > CP, so it is a profit. Profit = 460 − 400 = ₹60.', 'SP > CP, তাই লাভ। লাভ = 460 − 400 = ₹60।'),
          t(r`Profit % $= \frac{60}{400} \times 100 = 15\%$.`, r`শতকরা লাভ $= \frac{60}{400} \times 100 = 15\%$।`),
        ],
        answer: t('15% profit', '15% লাভ'),
      },
      tryIt: {
        question: t('Rahul bought a bicycle for ₹2500 and sold it for ₹2200. Find his loss per cent.', 'রাহুল ₹2500-এ একটা সাইকেল কিনে ₹2200-এ বিক্রি করল। শতকরা ক্ষতি কত?'),
        options: [t('12%', '12%'), t('13.64%', '13.64%'), t('88%', '88%'), t('1.2%', '1.2%')],
        correct: 0,
        explanation: [
          t('SP < CP, so it is a loss. Loss = 2500 − 2200 = ₹300.', 'SP < CP, তাই ক্ষতি। ক্ষতি = 2500 − 2200 = ₹300।'),
          t(r`Loss % $= \frac{300}{2500} \times 100 = 12\%$.`, r`শতকরা ক্ষতি $= \frac{300}{2500} \times 100 = 12\%$।`),
          t('13.64% comes from dividing by SP (2200) — the common mistake.', 'SP (2200) দিয়ে ভাগ করলে 13.64% আসে — এটাই সাধারণ ভুল।'),
        ],
      },
    },

    // 2 ─────────────────────────────────────────────
    {
      key: 'find_cp_or_sp',
      emoji: '🏷️',
      name: t('Find CP or SP from the profit/loss %', 'লাভ/ক্ষতি % থেকে CP বা SP নির্ণয়'),
      spot: t(
        'One price (CP or SP) and the profit % or loss % are given, and the other price is asked: "sold at ₹... at a gain of x%, find the cost price".',
        'একটা দাম (CP বা SP) আর শতকরা লাভ বা ক্ষতি দেওয়া থাকে, অন্য দামটা জানতে চায়: "x% লাভে ₹...-এ বিক্রি করল, ক্রয়মূল্য কত?"।',
      ),
      method: [
        t('Take CP = 100. Then SP = 100 + profit% (or 100 − loss%).', 'CP = 100 ধরো। তাহলে SP = 100 + লাভ% (বা 100 − ক্ষতি%)।'),
        t(r`To find SP: $\text{SP} = \text{CP} \times \frac{100 \pm x}{100}$.`, r`SP বের করতে: $\text{SP} = \text{CP} \times \frac{100 \pm x}{100}$।`),
        t(r`To find CP: $\text{CP} = \text{SP} \times \frac{100}{100 \pm x}$.`, r`CP বের করতে: $\text{CP} = \text{SP} \times \frac{100}{100 \pm x}$।`),
      ],
      example: {
        question: t('A shopkeeper sells a watch for ₹690 and makes a profit of 15%. What was the cost price?', 'একজন দোকানদার একটা ঘড়ি ₹690-এ বিক্রি করে 15% লাভ করলেন। ঘড়িটির ক্রয়মূল্য কত ছিল?'),
        steps: [
          t('CP = 100 parts, so SP = 115 parts.', 'CP = 100 ভাগ, তাই SP = 115 ভাগ।'),
          t(r`CP $= 690 \times \frac{100}{115} = 6 \times 100 = 600$.`, r`ক্রয়মূল্য $= 690 \times \frac{100}{115} = 6 \times 100 = 600$।`),
          t('Check: 15% of 600 = 90, and 600 + 90 = 690.', 'মিলিয়ে দেখো: 600-এর 15% = 90, আর 600 + 90 = 690।'),
        ],
        answer: t('₹600', 'ক্রয়মূল্য ₹600'),
      },
      tryIt: {
        question: t('A man sold his phone for ₹4250 at a loss of 15%. What was the cost price?', 'একজন লোক তাঁর ফোন 15% ক্ষতিতে ₹4250-এ বিক্রি করলেন। ফোনটির ক্রয়মূল্য কত ছিল?'),
        options: [t('₹4887.50', '₹4887.50'), t('₹3612.50', '₹3612.50'), t('₹5000', '₹5000'), t('₹4500', '₹4500')],
        correct: 2,
        explanation: [
          t('CP = 100 parts, so SP = 100 − 15 = 85 parts.', 'CP = 100 ভাগ, তাই SP = 100 − 15 = 85 ভাগ।'),
          t(r`CP $= 4250 \times \frac{100}{85} = 50 \times 100 = 5000$.`, r`ক্রয়মূল্য $= 4250 \times \frac{100}{85} = 50 \times 100 = 5000$।`),
          t('₹4887.50 comes from adding 15% of 4250 — wrong base. Check: 15% of 5000 = 750, and 5000 − 750 = 4250.', '4250-এর 15% যোগ করলে ₹4887.50 আসে — ভিত্তি ভুল। মিলিয়ে দেখো: 5000-এর 15% = 750, আর 5000 − 750 = 4250।'),
        ],
      },
    },

    // 3 ─────────────────────────────────────────────
    {
      key: 'discount_on_marked_price',
      emoji: '🛍️',
      name: t('Selling price after a discount', 'ছাড়ের পর বিক্রয়মূল্য'),
      spot: t(
        'The question gives a marked price (MP, the price written on the tag) and a discount %, and asks the selling price or the discount amount.',
        'প্রশ্নে ধার্যমূল্য (MP, ট্যাগে লেখা দাম) আর শতকরা ছাড় দেওয়া থাকে, আর বিক্রয়মূল্য বা ছাড়ের পরিমাণ জানতে চায়।',
      ),
      method: [
        t('Discount is always taken on the **marked price**, not on the cost price.', 'ছাড় সবসময় **ধার্যমূল্যের** উপর, ক্রয়মূল্যের উপর নয়।'),
        t(r`$\text{SP} = \text{MP} \times \frac{100 - d}{100}$, where d is the discount %.`, r`$\text{SP} = \text{MP} \times \frac{100 - d}{100}$, যেখানে d হল শতকরা ছাড়।`),
        t('Discount amount = MP − SP.', 'ছাড়ের পরিমাণ = MP − SP।'),
      ],
      example: {
        question: t('A jacket is marked at ₹1500. The shop gives a discount of 12%. What does the customer pay?', 'একটা জ্যাকেটের ধার্যমূল্য ₹1500। দোকান 12% ছাড় দেয়। ক্রেতাকে কত দিতে হবে?'),
        steps: [
          t('After a 12% discount the customer pays 100 − 12 = 88% of the MP.', '12% ছাড়ের পর ক্রেতা ধার্যমূল্যের 100 − 12 = 88% দেবেন।'),
          t(r`SP $= 1500 \times \frac{88}{100} = 15 \times 88 = 1320$.`, r`বিক্রয়মূল্য $= 1500 \times \frac{88}{100} = 15 \times 88 = 1320$।`),
          t('Discount amount = 1500 − 1320 = ₹180.', 'ছাড়ের পরিমাণ = 1500 − 1320 = ₹180।'),
        ],
        answer: t('₹1320', 'ক্রেতা দেবেন ₹1320'),
      },
      tryIt: {
        question: t('The marked price of a fan is ₹2400. A discount of 15% is given. Find the selling price.', 'একটা পাখার ধার্যমূল্য ₹2400। 15% ছাড় দেওয়া হল। বিক্রয়মূল্য কত?'),
        options: [t('₹360', '₹360'), t('₹2040', '₹2040'), t('₹2760', '₹2760'), t('₹2385', '₹2385')],
        correct: 1,
        explanation: [
          t(r`Discount $= 2400 \times \frac{15}{100} = 360$, so ₹360.`, r`ছাড় $= 2400 \times \frac{15}{100} = 360$ টাকা।`),
          t('SP = 2400 − 360 = ₹2040.', 'বিক্রয়মূল্য = 2400 − 360 = ₹2040।'),
          t('₹360 is only the discount, and ₹2760 adds it instead of taking it away.', '₹360 শুধু ছাড়ের পরিমাণ, আর ₹2760 হল ছাড় বিয়োগের বদলে যোগ করার ভুল।'),
        ],
      },
    },

    // 4 ─────────────────────────────────────────────
    {
      key: 'markup_then_discount',
      emoji: '📈',
      name: t('Marked above cost, then a discount: find profit %', 'ক্রয়মূল্যের বেশি দাম লিখে ছাড়: শতকরা লাভ কত?'),
      spot: t(
        'The shopkeeper "marks his goods x% above the cost price" and then "allows a discount of y%". The question asks his profit or loss %.',
        'দোকানদার "ক্রয়মূল্যের x% বেশি দাম লিখে" তারপর "y% ছাড় দেন"। প্রশ্নে তাঁর শতকরা লাভ বা ক্ষতি জানতে চায়।',
      ),
      method: [
        t('Take CP = 100. Then MP = 100 + x.', 'CP = 100 ধরো। তাহলে MP = 100 + x।'),
        t('Take y% off the MP to get SP. Profit % = SP − 100.', 'MP থেকে y% বাদ দিলে SP পাবে। শতকরা লাভ = SP − 100।'),
        t(r`Shortcut (successive change): profit % $= x - y - \frac{x \times y}{100}$.`, r`শর্টকাট (পরপর পরিবর্তন): শতকরা লাভ $= x - y - \frac{x \times y}{100}$।`),
      ],
      example: {
        question: t('A shopkeeper marks his goods 40% above the cost price and gives a discount of 10%. Find his profit per cent.', 'একজন দোকানদার জিনিসের দাম ক্রয়মূল্যের 40% বেশি লেখেন এবং 10% ছাড় দেন। তাঁর শতকরা লাভ কত?'),
        steps: [
          t('Let CP = 100. Then MP = 140.', 'ধরো CP = 100। তাহলে MP = 140।'),
          t('10% of 140 = 14, so SP = 140 − 14 = 126.', '140-এর 10% = 14, তাই SP = 140 − 14 = 126।'),
          t(r`Profit = 126 − 100 = 26 on 100, so 26%. Shortcut: $40 - 10 - \frac{40 \times 10}{100} = 26$.`, r`100-এ লাভ = 126 − 100 = 26, অর্থাৎ 26%। শর্টকাট: $40 - 10 - \frac{40 \times 10}{100} = 26$।`),
        ],
        answer: t('26% profit', '26% লাভ'),
      },
      tryIt: {
        question: t('A trader marks his goods 50% above the cost price and allows a discount of 20%. What is his profit per cent?', 'একজন ব্যবসায়ী জিনিসের দাম ক্রয়মূল্যের 50% বেশি লেখেন এবং 20% ছাড় দেন। তাঁর শতকরা লাভ কত?'),
        options: [t('30%', '30%'), t('25%', '25%'), t('20%', '20%'), t('10%', '10%')],
        correct: 2,
        explanation: [
          t('Let CP = 100. Then MP = 150.', 'ধরো CP = 100। তাহলে MP = 150।'),
          t('20% of 150 = 30, so SP = 150 − 30 = 120. Profit = 20 on 100, so 20%.', '150-এর 20% = 30, তাই SP = 150 − 30 = 120। 100-এ লাভ 20, অর্থাৎ 20%।'),
          t('30% (50 − 20) is wrong because the discount is taken on 150, not on 100.', '30% (50 − 20) ভুল, কারণ ছাড় হয় 150-এর উপর, 100-এর উপর নয়।'),
        ],
      },
    },

    // 5 ─────────────────────────────────────────────
    {
      key: 'false_weight',
      emoji: '⚖️',
      name: t('Dishonest shopkeeper with a false weight', 'ভুল বাটখারা ব্যবহারকারী অসৎ দোকানদার'),
      spot: t(
        'The shopkeeper "sells at cost price" but "uses a weight of 900 g instead of 1 kg" (or similar). The question asks his gain %.',
        'দোকানদার "ক্রয়মূল্যেই বিক্রি করেন" কিন্তু "1 kg-এর বদলে 900 g-এর বাটখারা ব্যবহার করেন" (বা এমন কিছু)। প্রশ্নে তাঁর শতকরা লাভ জানতে চায়।',
      ),
      method: [
        t('He takes money for the true weight but gives less. Gain = true weight − false weight.', 'তিনি আসল ওজনের দাম নেন কিন্তু কম দেন। লাভ = আসল ওজন − ভুল ওজন।'),
        t(r`Gain % $= \frac{\text{true} - \text{false}}{\text{false}} \times 100$.`, r`শতকরা লাভ $= \frac{\text{আসল} - \text{ভুল}}{\text{ভুল}} \times 100$।`),
        t('Divide by the weight he actually **gives** (the false weight), because that is his real cost.', 'যে ওজন তিনি আসলে **দেন** (ভুল ওজন) তা দিয়ে ভাগ করো, কারণ সেটাই তাঁর আসল খরচ।'),
      ],
      example: {
        question: t('A shopkeeper sells rice at cost price but uses a 900 g weight in place of 1 kg. Find his gain per cent.', 'একজন দোকানদার ক্রয়মূল্যেই চাল বিক্রি করেন, কিন্তু 1 kg-এর বদলে 900 g-এর বাটখারা ব্যবহার করেন। তাঁর শতকরা লাভ কত?'),
        steps: [
          t('He gives 900 g but takes money for 1000 g. Gain = 100 g.', 'তিনি দেন 900 g, কিন্তু দাম নেন 1000 g-এর। লাভ = 100 g।'),
          t(r`Gain % $= \frac{100}{900} \times 100 = 11\frac{1}{9}\%$.`, r`শতকরা লাভ $= \frac{100}{900} \times 100 = 11\frac{1}{9}\%$।`),
        ],
        answer: t(r`$11\frac{1}{9}\%$ (about 11.11%)`, r`$11\frac{1}{9}\%$ (প্রায় 11.11%)`),
      },
      tryIt: {
        question: t('A dishonest grocer sells sugar at cost price but uses a weight of 800 g for 1 kg. What is his gain per cent?', 'একজন অসৎ মুদি ক্রয়মূল্যেই চিনি বিক্রি করেন, কিন্তু 1 kg-এর জায়গায় 800 g-এর বাটখারা ব্যবহার করেন। তাঁর শতকরা লাভ কত?'),
        options: [t('20%', '20%'), t('25%', '25%'), t('80%', '80%'), t('12.5%', '12.5%')],
        correct: 1,
        explanation: [
          t('He gives 800 g but takes money for 1000 g. Gain = 200 g.', 'তিনি দেন 800 g, কিন্তু দাম নেন 1000 g-এর। লাভ = 200 g।'),
          t(r`Gain % $= \frac{200}{800} \times 100 = 25\%$.`, r`শতকরা লাভ $= \frac{200}{800} \times 100 = 25\%$।`),
          t('20% comes from dividing by 1000 — wrong, because his real cost is only 800 g.', '1000 দিয়ে ভাগ করলে 20% আসে — ভুল, কারণ তাঁর আসল খরচ মাত্র 800 g-এর।'),
        ],
      },
    },
  ],
};
