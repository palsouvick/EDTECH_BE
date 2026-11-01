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
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“Bought for ₹… and sold for ₹…. Find the profit per cent / loss per cent.”', '“₹…-এ কিনে ₹…-এ বিক্রি করেছে। শতকরা লাভ / শতকরা ক্ষতি কত?”'),
      formula: t(r`Profit % $= \frac{SP - CP}{CP} \times 100$; Loss % $= \frac{CP - SP}{CP} \times 100$.`, r`লাভ % $= \frac{SP - CP}{CP} \times 100$; ক্ষতি % $= \frac{CP - SP}{CP} \times 100$।`),
      shortcut: t('When both prices are given, the direct method is already fastest: subtract first, then express that one difference as a percentage of CP.', 'দুটো দামই দেওয়া থাকলে সরাসরি পদ্ধতিই সবচেয়ে দ্রুত: আগে বিয়োগ করো, তারপর সেই একটি পার্থক্যকে CP-এর শতকরা হিসেবে প্রকাশ করো।'),
      trap: t('Never divide by SP. Profit % and loss % are always calculated on CP.', 'কখনো SP দিয়ে ভাগ করবে না। লাভ % ও ক্ষতি % সবসময় CP-এর উপর হিসাব হয়।'),
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
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“Sold at ₹… at a gain of x%, find the cost price”, or “bought for ₹…, sold at a loss of y%, find the selling price”.', '“x% লাভে ₹…-এ বিক্রি করা হল, ক্রয়মূল্য কত?”, অথবা “₹…-এ কিনে y% ক্ষতিতে বিক্রি করা হল, বিক্রয়মূল্য কত?”'),
      formula: t(r`$SP = CP \times \frac{100 \pm x}{100}$ and $CP = SP \times \frac{100}{100 \pm x}$ (plus for profit, minus for loss).`, r`$SP = CP \times \frac{100 \pm x}{100}$ এবং $CP = SP \times \frac{100}{100 \pm x}$ (লাভে যোগ, ক্ষতিতে বিয়োগ)।`),
      shortcut: t('Use 100 parts: the given price is (100 ± x) parts, so one part = given price ÷ (100 ± x); multiply by 100 for CP or by (100 ± x) for SP.', '100 ভাগ পদ্ধতি নাও: দেওয়া দাম হল (100 ± x) ভাগ, তাই এক ভাগ = দেওয়া দাম ÷ (100 ± x); CP-এর জন্য 100 দিয়ে বা SP-এর জন্য (100 ± x) দিয়ে গুণ করো।'),
      trap: t('Do not add or subtract x% of the SP to get back to CP — the percentage was charged on CP, so the base is different.', 'CP ফিরে পেতে SP-এর x% যোগ বা বিয়োগ করবে না — শতকরা হার CP-এর উপর ধরা হয়েছিল, তাই ভিত্তি আলাদা।'),
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
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“The marked price is ₹… and a discount of d% is given. What is the selling price?”', '“ধার্যমূল্য ₹… এবং d% ছাড় দেওয়া হয়। বিক্রয়মূল্য কত?”'),
      formula: t(r`$SP = MP \times \frac{100 - d}{100}$; discount amount $= MP \times \frac{d}{100}$.`, r`$SP = MP \times \frac{100 - d}{100}$; ছাড়ের পরিমাণ $= MP \times \frac{d}{100}$।`),
      shortcut: t('Skip finding the discount amount: multiply MP directly by the retained percentage (100 − d)% in one step.', 'ছাড়ের পরিমাণ আলাদা করে বের না করে এক ধাপে MP-কে অবশিষ্ট শতকরা (100 − d)% দিয়ে গুণ করো।'),
      trap: t('Discount is always on the marked price, not on CP — and the discount amount itself is not the selling price.', 'ছাড় সবসময় ধার্যমূল্যের উপর, ক্রয়মূল্যের উপর নয় — আর ছাড়ের পরিমাণটাই বিক্রয়মূল্য নয়।'),
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
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“He marks his goods x% above the cost price and then allows a discount of y%. Find his profit per cent.”', '“তিনি ক্রয়মূল্যের x% বেশি দাম লিখে তারপর y% ছাড় দেন। তাঁর শতকরা লাভ কত?”'),
      formula: t(r`With $CP = 100$: $MP = 100 + x$ and $SP = (100 + x) \times \frac{100 - y}{100}$; profit % $= SP - 100$.`, r`$CP = 100$ ধরলে: $MP = 100 + x$ এবং $SP = (100 + x) \times \frac{100 - y}{100}$; লাভ % $= SP - 100$।`),
      shortcut: t(r`Use the successive-change shortcut in one line: net profit % $= x - y - \frac{x \times y}{100}$.`, r`পরপর পরিবর্তনের শর্টকাট এক লাইনে নাও: নেট লাভ % $= x - y - \frac{x \times y}{100}$।`),
      trap: t('x − y alone is wrong: the discount is taken on the marked price (100 + x), which is larger than CP.', 'শুধু x − y ভুল: ছাড় হয় ধার্যমূল্যের (100 + x) উপর, যা CP-এর চেয়ে বড়।'),
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
      difficulty: 'advanced',
      practiceLevels: ['advanced'],
      typicalWording: t('“He sells at cost price but uses a weight of 900 g instead of 1 kg. Find his gain per cent.”', '“তিনি ক্রয়মূল্যেই বিক্রি করেন কিন্তু 1 kg-এর বদলে 900 g-এর বাটখারা ব্যবহার করেন। তাঁর শতকরা লাভ কত?”'),
      formula: t(r`Gain % $= \frac{\text{true weight} - \text{false weight}}{\text{false weight}} \times 100$.`, r`লাভ % $= \frac{\text{আসল ওজন} - \text{ভুল ওজন}}{\text{ভুল ওজন}} \times 100$।`),
      shortcut: t(r`He receives the price of the true weight for only the false weight, so gain fraction $= \frac{\text{true}}{\text{false}} - 1$; multiply by 100.`, r`তিনি ভুল ওজন দিয়েই আসল ওজনের দাম পান, তাই লাভের ভগ্নাংশ $= \frac{\text{আসল}}{\text{ভুল}} - 1$; 100 দিয়ে গুণ করো।`),
      trap: t('Do not divide the difference by the true weight (1000 g). His real cost is only the weight he actually gives.', 'পার্থক্যকে আসল ওজন (1000 g) দিয়ে ভাগ করবে না। তাঁর আসল খরচ শুধু যে ওজন তিনি সত্যিই দেন তার।'),
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

    // 6 ─────────────────────────────────────────────
    {
      key: 'successive_discounts',
      registryLinked: true,
      emoji: '🔻',
      name: t('Successive discounts: further discount for a target profit', 'পরপর ছাড়: লক্ষ্য লাভের জন্য আরও ছাড়'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“An article is marked x% above CP. After a discount of y%, what further discount will leave exactly z% profit?”', '“একটি জিনিসের দাম CP-এর x% বেশি লেখা। y% ছাড়ের পর ঠিক z% লাভ রাখতে আরও কত ছাড় দিতে হবে?”'),
      formula: t(r`Target $SP = CP \times \frac{100 + z}{100}$; further discount % $= \frac{\text{price after first discount} - \text{target } SP}{\text{price after first discount}} \times 100$.`, r`লক্ষ্য $SP = CP \times \frac{100 + z}{100}$; আরও ছাড় % $= \frac{\text{প্রথম ছাড়ের পরের দাম} - \text{লক্ষ্য } SP}{\text{প্রথম ছাড়ের পরের দাম}} \times 100$।`),
      shortcut: t('Work on the CP = 100 scale throughout: MP, the price after the first discount and the target SP all become small numbers, and the further discount is just the final drop divided by the reduced price.', 'পুরো হিসাব CP = 100 স্কেলে করো: MP, প্রথম ছাড়ের পরের দাম ও লক্ষ্য SP সব ছোট সংখ্যা হয়, আর আরও ছাড় হল শেষ পতনকে কমে যাওয়া দাম দিয়ে ভাগ।'),
      trap: t('The further discount is on the already reduced price, not on the original MP. Successive discounts never simply add up.', 'আরও ছাড়টি আগেই কমে যাওয়া দামের উপর, মূল MP-এর উপর নয়। পরপর ছাড় কখনো সরাসরি যোগ হয় না।'),
      spot: t(
        'The price is marked above CP, one discount is already given, and the question asks what **further** discount will leave an exact stated profit.',
        'দাম CP-এর বেশি লেখা থাকে, একটি ছাড় আগেই দেওয়া থাকে, আর প্রশ্নে জানতে চাওয়া হয় ঠিক নির্দিষ্ট লাভ রাখতে **আরও** কত ছাড় দিতে হবে।',
      ),
      method: [
        t('Take CP = 100 and find MP from the markup.', 'CP = 100 ধরে মার্কআপ থেকে MP বের করো।'),
        t('Apply the first discount to MP to get the reduced price.', 'MP-তে প্রথম ছাড় প্রয়োগ করে কমে যাওয়া দাম বের করো।'),
        t('Find the target SP from CP and the required profit %.', 'CP ও দরকারি লাভ % থেকে লক্ষ্য SP বের করো।'),
        t('Further discount % = (reduced price − target SP) ÷ reduced price × 100.', 'আরও ছাড় % = (কমে যাওয়া দাম − লক্ষ্য SP) ÷ কমে যাওয়া দাম × 100।'),
      ],
      example: {
        question: t('An article is marked 60% above its cost price. After a discount of 25%, what further discount will leave the seller with exactly 8% profit?', 'একটি জিনিসের দাম তার ক্রয়মূল্যের 60% বেশি লেখা। 25% ছাড় দেওয়ার পর বিক্রেতার ঠিক 8% লাভ রাখতে আরও কত শতাংশ ছাড় দিতে হবে?'),
        steps: [
          t('Take CP = 100, so MP = 160.', 'CP = 100 ধরলে MP = 160।'),
          t('After 25% off: 160 × 75/100 = 120. Target SP for 8% profit = 108.', '25% ছাড়ের পর: 160 × 75/100 = 120। 8% লাভের জন্য লক্ষ্য SP = 108।'),
          t('The price must fall by 120 − 108 = 12 more.', 'দাম আরও 120 − 108 = 12 কমাতে হবে।'),
          t(r`Further discount $= \frac{12}{120} \times 100 = 10\%$.`, r`আরও ছাড় $= \frac{12}{120} \times 100 = 10\%$।`),
        ],
        answer: t('10% further discount', 'আরও 10% ছাড়'),
      },
      tryIt: {
        question: t('An article is marked 100% above its cost price. After a discount of 20%, what further discount will leave exactly 20% profit?', 'একটি জিনিসের দাম তার ক্রয়মূল্যের 100% বেশি লেখা। 20% ছাড় দেওয়ার পর ঠিক 20% লাভ রাখতে আরও কত শতাংশ ছাড় দিতে হবে?'),
        options: [t('20%', '20%'), t('25%', '25%'), t('40%', '40%'), t('30%', '30%')],
        correct: 1,
        explanation: [
          t('Take CP = 100, so MP = 200. After 20% off the price is 160.', 'CP = 100 ধরলে MP = 200। 20% ছাড়ের পর দাম 160।'),
          t('Target SP for 20% profit = 120, so the price must fall by 40 more.', '20% লাভের জন্য লক্ষ্য SP = 120, তাই দাম আরও 40 কমাতে হবে।'),
          t(r`Further discount $= \frac{40}{160} \times 100 = 25\%$.`, r`আরও ছাড় $= \frac{40}{160} \times 100 = 25\%$।`),
        ],
      },
    },

    // 7 ─────────────────────────────────────────────
    {
      key: 'articles_ratio',
      registryLinked: true,
      emoji: '🧮',
      name: t('CP of x articles = SP of y articles', 'xটি জিনিসের CP = yটি জিনিসের SP'),
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“The cost price of x articles is equal to the selling price of y articles. Find the gain per cent.”', '“xটি জিনিসের ক্রয়মূল্য yটি জিনিসের বিক্রয়মূল্যের সমান। শতকরা লাভ কত?”'),
      formula: t(r`If the CP of $x$ articles $=$ SP of $y$ articles $(x > y)$, gain % $= \frac{x - y}{y} \times 100$.`, r`যদি $x$টি জিনিসের CP $=$ $y$টি জিনিসের SP হয় $(x > y)$, তাহলে লাভ % $= \frac{x - y}{y} \times 100$।`),
      shortcut: t('Set CP per article = ₹1. Then the two counts become rupee amounts at once and the SP per article can be read off directly.', 'প্রতিটি জিনিসের CP = ₹1 ধরো। তাহলে দুটি সংখ্যাই সরাসরি টাকার অঙ্ক হয়ে যায় এবং প্রতি জিনিসের SP সোজা পড়া যায়।'),
      trap: t('Divide by y, the number of articles sold, not by x. The profit is earned on the CP of the articles actually sold.', 'y দিয়ে ভাগ করো — বিক্রি হওয়া জিনিসের সংখ্যা দিয়ে, x দিয়ে নয়। লাভ হয় সত্যিই বিক্রি হওয়া জিনিসগুলির CP-এর উপর।'),
      spot: t(
        'One sentence equates the **cost price of one number of articles** with the **selling price of a different number** of the same articles.',
        'একটি বাক্যে **এক সংখ্যক জিনিসের ক্রয়মূল্যকে** একই জিনিসের **ভিন্ন সংখ্যকের বিক্রয়মূল্যের** সমান বলা হয়।',
      ),
      method: [
        t('Set the CP of one article = ₹1.', 'একটি জিনিসের CP = ₹1 ধরো।'),
        t('SP of one article = (CP of x articles) ÷ y.', 'একটি জিনিসের SP = (xটি জিনিসের CP) ÷ y।'),
        t('Profit per article = SP − ₹1; gain % = profit per article ÷ 1 × 100.', 'প্রতি জিনিসে লাভ = SP − ₹1; লাভ % = প্রতি জিনিসে লাভ ÷ 1 × 100।'),
      ],
      example: {
        question: t('The cost price of 20 articles is equal to the selling price of 16 articles. Find the gain per cent.', '20টি জিনিসের ক্রয়মূল্য 16টি জিনিসের বিক্রয়মূল্যের সমান। শতকরা লাভ কত?'),
        steps: [
          t('Let CP per article = ₹1. Then CP of 20 articles = ₹20, so SP of 16 articles = ₹20.', 'প্রতি জিনিসের CP = ₹1 ধরো। তাহলে 20টির CP = ₹20, তাই 16টির SP = ₹20।'),
          t(r`SP per article $= \frac{20}{16} = ₹1.25$, so profit per article $= ₹0.25$.`, r`প্রতি জিনিসের SP $= \frac{20}{16} = ₹1.25$, তাই প্রতি জিনিসে লাভ $= ₹0.25$।`),
          t(r`Gain % $= \frac{0.25}{1} \times 100 = 25\%$.`, r`শতকরা লাভ $= \frac{0.25}{1} \times 100 = 25\%$।`),
        ],
        answer: t('25% gain', '25% লাভ'),
      },
      tryIt: {
        question: t('The cost price of 12 articles is equal to the selling price of 10 articles. Find the gain per cent.', '12টি জিনিসের ক্রয়মূল্য 10টি জিনিসের বিক্রয়মূল্যের সমান। শতকরা লাভ কত?'),
        options: [t('16.67%', '16.67%'), t('20%', '20%'), t('25%', '25%'), t('10%', '10%')],
        correct: 1,
        explanation: [
          t('Let CP per article = ₹1. Then SP of 10 articles = ₹12, so SP per article = ₹1.20.', 'প্রতি জিনিসের CP = ₹1 ধরো। তাহলে 10টির SP = ₹12, তাই প্রতি জিনিসের SP = ₹1.20।'),
          t('Profit per article = ₹0.20 on a CP of ₹1.', 'প্রতি জিনিসে লাভ = CP ₹1-এর উপর ₹0.20।'),
          t(r`Gain % $= \frac{2}{10} \times 100 = 20\%$. (16.67% divides by 12 instead of 10.)`, r`শতকরা লাভ $= \frac{2}{10} \times 100 = 20\%$। (16.67% আসে 10-এর বদলে 12 দিয়ে ভাগ করলে।)`),
        ],
      },
    },

    // 8 ─────────────────────────────────────────────
    {
      key: 'target_price',
      registryLinked: true,
      emoji: '🎯',
      name: t('Marked price needed for a target profit after discount', 'ছাড়ের পর লক্ষ্য লাভের জন্য দরকারি ধার্যমূল্য'),
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“Expenses are x% of CP. What marked price gives y% profit on total cost after a z% discount?”', '“অতিরিক্ত খরচ CP-এর x%। z% ছাড়ের পর মোট খরচে y% লাভ পেতে ধার্যমূল্য কত রাখতে হবে?”'),
      formula: t(r`$MP = \text{total cost} \times \frac{100 + p}{100 - d}$, where total cost includes the expenses.`, r`$MP = \text{মোট খরচ} \times \frac{100 + p}{100 - d}$, যেখানে মোট খরচে অতিরিক্ত খরচ ধরা থাকে।`),
      shortcut: t('Chain the two multipliers in one step: first grow the total cost by the profit multiplier, then divide by the retained fraction (100 − d)/100 to undo the coming discount.', 'দুটি গুণক এক ধাপে শৃঙ্খলিত করো: আগে মোট খরচকে লাভের গুণক দিয়ে বাড়াও, তারপর আসন্ন ছাড় উল্টাতে অবশিষ্ট ভগ্নাংশ (100 − d)/100 দিয়ে ভাগ করো।'),
      trap: t('The required SP is not the answer: MP must be set higher, because the discount will be taken off it. Profit is on total cost, not on the purchase price alone.', 'প্রয়োজনীয় SP উত্তর নয়: MP আরও বেশি রাখতে হবে, কারণ তার উপর ছাড় কাটা হবে। লাভ মোট খরচের উপর, শুধু কেনা দামের উপর নয়।'),
      spot: t(
        'The question asks what **marked price to fix** so that, after a stated discount, a stated profit on the total cost (expenses included) is still earned.',
        'প্রশ্নে জানতে চাওয়া হয় **কত ধার্যমূল্য রাখলে** নির্দিষ্ট ছাড়ের পরও মোট খরচের (অতিরিক্ত খরচসহ) উপর নির্দিষ্ট লাভ থাকবে।',
      ),
      method: [
        t('Add the expenses to CP to get the total cost.', 'CP-তে অতিরিক্ত খরচ যোগ করে মোট খরচ বের করো।'),
        t('Required SP = total cost × (100 + profit %) / 100.', 'প্রয়োজনীয় SP = মোট খরচ × (100 + লাভ %) / 100।'),
        t('After the discount, SP is (100 − d)% of MP, so MP = required SP × 100 / (100 − d).', 'ছাড়ের পর SP হল MP-এর (100 − d)%, তাই MP = প্রয়োজনীয় SP × 100 / (100 − d)।'),
      ],
      example: {
        question: t('An article costs ₹800 and additional expenses are 25% of the cost price. What marked price should be set so that after a 20% discount the seller still earns 20% profit on the total cost?', 'একটি জিনিসের ক্রয়মূল্য ₹800 এবং অতিরিক্ত খরচ ক্রয়মূল্যের 25%। 20% ছাড় দেওয়ার পর মোট খরচে 20% লাভ রাখতে ধার্যমূল্য কত ধার্য করতে হবে?'),
        steps: [
          t('Expenses = 25% of 800 = ₹200, so total cost = 800 + 200 = ₹1000.', 'অতিরিক্ত খরচ = 800-এর 25% = ₹200, তাই মোট খরচ = 800 + 200 = ₹1000।'),
          t('Required SP = 1000 × 120/100 = ₹1200.', 'প্রয়োজনীয় SP = 1000 × 120/100 = ₹1200।'),
          t('After a 20% discount, SP is 80% of MP, so MP = 1200 × 100/80 = ₹1500.', '20% ছাড়ের পর SP হল MP-এর 80%, তাই MP = 1200 × 100/80 = ₹1500।'),
        ],
        answer: t('₹1500', 'ধার্যমূল্য ₹1500'),
      },
      tryIt: {
        question: t('An article costs ₹1000 and additional expenses are 20% of the cost price. What marked price gives a 25% profit on the total cost after a 25% discount?', 'একটি জিনিসের ক্রয়মূল্য ₹1000 এবং অতিরিক্ত খরচ ক্রয়মূল্যের 20%। 25% ছাড়ের পর মোট খরচে 25% লাভ পেতে ধার্যমূল্য কত রাখতে হবে?'),
        options: [t('₹1500', '₹1500'), t('₹2000', '₹2000'), t('₹1800', '₹1800'), t('₹2400', '₹2400')],
        correct: 1,
        explanation: [
          t('Total cost = 1000 + 20% of 1000 = ₹1200.', 'মোট খরচ = 1000 + 1000-এর 20% = ₹1200।'),
          t('Required SP = 1200 × 125/100 = ₹1500. (₹1500 is this SP, not yet the MP.)', 'প্রয়োজনীয় SP = 1200 × 125/100 = ₹1500। (₹1500 হল এই SP, এখনো MP নয়।)'),
          t('MP = 1500 × 100/75 = ₹2000.', 'তাই MP = 1500 × 100/75 = ₹2000।'),
        ],
      },
    },

    // 9 ─────────────────────────────────────────────
    {
      key: 'expenses',
      registryLinked: true,
      emoji: '🧾',
      name: t('Profit after overheads, markup and discount', 'অতিরিক্ত খরচ, মার্কআপ ও ছাড়ের পর লাভ'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“Buys an article for ₹…, pays transport equal to x% of CP, marks it y% above CP, then gives a z% discount. Find the actual profit % after transport.”', '“₹…-এ জিনিস কিনে CP-এর x% পরিবহন খরচ দেন, CP-এর y% বেশি দাম লেখেন, তারপর z% ছাড় দেন। পরিবহন খরচ ধরার পর প্রকৃত লাভ % কত?”'),
      formula: t(r`Effective $CP = CP + \text{overheads}$; profit % $= \frac{SP - \text{effective } CP}{\text{effective } CP} \times 100$, where $SP = MP \times \frac{100 - d}{100}$.`, r`কার্যকর $CP = CP + \text{অতিরিক্ত খরচ}$; লাভ % $= \frac{SP - \text{কার্যকর } CP}{\text{কার্যকর } CP} \times 100$, যেখানে $SP = MP \times \frac{100 - d}{100}$।`),
      shortcut: t(r`Use multipliers for the price side in one chain, $SP = CP \times \frac{100 + m}{100} \times \frac{100 - d}{100}$, then compare the result once with the effective CP.`, r`দামের দিকে গুণকগুলি এক শৃঙ্খলে নাও, $SP = CP \times \frac{100 + m}{100} \times \frac{100 - d}{100}$, তারপর ফলটি কার্যকর CP-এর সঙ্গে একবার তুলনা করো।`),
      trap: t('The markup is stated on the original CP, but the profit % must be measured on the total cost including transport. Measuring on the purchase price alone overstates the profit.', 'মার্কআপ মূল CP-এর উপর বলা থাকে, কিন্তু লাভ % মাপতে হবে পরিবহনসহ মোট খরচের উপর। শুধু কেনা দামে মাপলে লাভ বেশি দেখায়।'),
      spot: t(
        'Along with the purchase price there is an **extra expense** (transport, repair, packing), and the article is also marked up and discounted before selling.',
        'কেনা দামের পাশাপাশি **অতিরিক্ত খরচ** (পরিবহন, মেরামত, প্যাকিং) থাকে, এবং জিনিসটি বিক্রির আগে দাম বাড়িয়ে লিখে ছাড়ও দেওয়া হয়।',
      ),
      method: [
        t('Add the overhead to CP first: this total is the effective CP and the base for profit %.', 'আগে CP-তে অতিরিক্ত খরচ যোগ করো: এই মোটই কার্যকর CP এবং লাভ %-এর ভিত্তি।'),
        t('Find MP from the markup on CP as stated in the question.', 'প্রশ্নে যেমন বলা আছে, CP-এর উপর মার্কআপ থেকে MP বের করো।'),
        t('Apply the discount to MP to get the actual SP.', 'MP-তে ছাড় প্রয়োগ করে প্রকৃত SP বের করো।'),
        t('Profit % = (SP − effective CP) ÷ effective CP × 100.', 'লাভ % = (SP − কার্যকর CP) ÷ কার্যকর CP × 100।'),
      ],
      example: {
        question: t('A trader buys an article for ₹800, pays transport equal to 25% of the cost price, marks it 50% above the cost price, and then gives a 10% discount on the marked price. Find his actual profit per cent after transport.', 'একজন ব্যবসায়ী ₹800-এ একটি জিনিস কিনে ক্রয়মূল্যের 25% পরিবহন খরচ দেন, ক্রয়মূল্যের 50% বেশি দাম লেখেন এবং তারপর ধার্যমূল্যে 10% ছাড় দেন। পরিবহন খরচ ধরার পর তাঁর প্রকৃত শতকরা লাভ কত?'),
        steps: [
          t('Transport = 25% of 800 = ₹200, so effective CP = 800 + 200 = ₹1000.', 'পরিবহন খরচ = 800-এর 25% = ₹200, তাই কার্যকর CP = 800 + 200 = ₹1000।'),
          t('MP = 800 × 150/100 = ₹1200.', 'ধার্যমূল্য MP = 800 × 150/100 = ₹1200।'),
          t('SP after 10% discount = 1200 × 90/100 = ₹1080.', '10% ছাড়ের পর SP = 1200 × 90/100 = ₹1080।'),
          t(r`Profit % $= \frac{1080 - 1000}{1000} \times 100 = 8\%$.`, r`শতকরা লাভ $= \frac{1080 - 1000}{1000} \times 100 = 8\%$।`),
        ],
        answer: t('8% profit', '8% লাভ'),
      },
      tryIt: {
        question: t('A trader buys an article for ₹1000, pays transport equal to 20% of the cost price, marks it 80% above the cost price, and gives a 25% discount on the marked price. Find his actual profit per cent after transport.', 'একজন ব্যবসায়ী ₹1000-এ একটি জিনিস কিনে ক্রয়মূল্যের 20% পরিবহন খরচ দেন, ক্রয়মূল্যের 80% বেশি দাম লেখেন এবং ধার্যমূল্যে 25% ছাড় দেন। পরিবহন খরচ ধরার পর তাঁর প্রকৃত শতকরা লাভ কত?'),
        options: [t('35% profit', '35% লাভ'), t('12.5% profit', '12.5% লাভ'), t('8% profit', '8% লাভ'), t('20% profit', '20% লাভ')],
        correct: 1,
        explanation: [
          t('Effective CP = 1000 + 20% of 1000 = ₹1200. MP = 1000 × 180/100 = ₹1800.', 'কার্যকর CP = 1000 + 1000-এর 20% = ₹1200। MP = 1000 × 180/100 = ₹1800।'),
          t('SP = 1800 × 75/100 = ₹1350, so profit = 1350 − 1200 = ₹150.', 'SP = 1800 × 75/100 = ₹1350, তাই লাভ = 1350 − 1200 = ₹150।'),
          t(r`Profit % $= \frac{150}{1200} \times 100 = 12.5\%$. (35% wrongly uses the ₹1000 purchase price as the base.)`, r`শতকরা লাভ $= \frac{150}{1200} \times 100 = 12.5\%$। (35% আসে ভুল করে ₹1000 কেনা দামকে ভিত্তি ধরলে।)`),
        ],
      },
    },

    // 10 ─────────────────────────────────────────────
    {
      key: 'same_cp_rates',
      registryLinked: true,
      emoji: '📊',
      name: t('Same CP per article, groups sold at different rates', 'প্রতি জিনিসের CP একই, দল ভাগে ভিন্ন হারে বিক্রি'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“Buys n articles at ₹… each. He sells two at x% profit, one at y% profit and the rest at z% loss. Find the overall result.”', '“প্রতিটি ₹… দরে nটি জিনিস কেনেন। দুটি x% লাভে, একটি y% লাভে ও বাকিগুলি z% ক্ষতিতে বিক্রি করেন। মোট ফল কত?”'),
      formula: t(r`Overall % $= \frac{\text{total } SP - \text{total } CP}{\text{total } CP} \times 100$; with equal CP per article this equals the count-weighted average of the signed rates.`, r`মোট ফল % $= \frac{\text{মোট } SP - \text{মোট } CP}{\text{মোট } CP} \times 100$; প্রতি জিনিসের CP সমান হলে এটি চিহ্নসহ হারগুলির সংখ্যা-ওজনযুক্ত গড়ের সমান।`),
      shortcut: t('Because CP per article is the same, skip the rupees: add the signed percentage points weighted by the count in each group (loss negative) and divide by the total count.', 'প্রতি জিনিসের CP একই বলে টাকার হিসাব বাদ দাও: প্রতিটি দলের সংখ্যা দিয়ে ওজন দিয়ে চিহ্নসহ শতকরা পয়েন্ট যোগ করো (ক্ষতি ঋণাত্মক) এবং মোট সংখ্যা দিয়ে ভাগ করো।'),
      trap: t('A plain average of the three rates ignores how many articles are in each group.', 'তিনটি হারের সাধারণ গড় নিলে প্রতিটি দলে কটি জিনিস আছে তা বাদ পড়ে।'),
      spot: t(
        'All articles cost the **same price each**, and they are split into **groups** (here three) sold at different profit or loss rates.',
        'সব জিনিসের দাম **প্রতিটি একই**, এবং সেগুলি **দলে** (এখানে তিনটি) ভাগ করে ভিন্ন লাভ বা ক্ষতির হারে বিক্রি করা হয়।',
      ),
      method: [
        t('Note the count and signed rate of each group (profit positive, loss negative).', 'প্রতিটি দলের সংখ্যা ও চিহ্নসহ হার লেখো (লাভ ধনাত্মক, ক্ষতি ঋণাত্মক)।'),
        t('Total CP = number of articles × CP per article.', 'মোট CP = জিনিসের সংখ্যা × প্রতি জিনিসের CP।'),
        t('Find the SP of each group and add them for the total SP.', 'প্রতিটি দলের SP বের করে যোগ করে মোট SP পাও।'),
        t('Overall % = (total SP − total CP) ÷ total CP × 100.', 'মোট ফল % = (মোট SP − মোট CP) ÷ মোট CP × 100।'),
      ],
      example: {
        question: t('A trader buys 5 articles at ₹300 each. He sells two at 20% profit, one at 10% profit, and the remaining two at 15% loss. Find the overall profit or loss per cent.', 'একজন ব্যবসায়ী প্রতিটি ₹300 দরে 5টি জিনিস কেনেন। তিনি দুটি 20% লাভে, একটি 10% লাভে এবং বাকি দুটি 15% ক্ষতিতে বিক্রি করেন। মোট শতকরা লাভ বা ক্ষতি কত?'),
        steps: [
          t('Total CP = 5 × 300 = ₹1500.', 'মোট CP = 5 × 300 = ₹1500।'),
          t('SP of the groups: 2 × 360 = ₹720, 1 × 330 = ₹330, and 2 × 255 = ₹510.', 'দলগুলির SP: 2 × 360 = ₹720, 1 × 330 = ₹330, এবং 2 × 255 = ₹510।'),
          t('Total SP = 720 + 330 + 510 = ₹1560, so profit = ₹60.', 'মোট SP = 720 + 330 + 510 = ₹1560, তাই লাভ = ₹60।'),
          t(r`Overall profit % $= \frac{60}{1500} \times 100 = 4\%$.`, r`মোট শতকরা লাভ $= \frac{60}{1500} \times 100 = 4\%$।`),
        ],
        answer: t('4% profit', '4% লাভ'),
      },
      tryIt: {
        question: t('A trader buys 5 articles at ₹400 each. He sells two at 30% profit, one at 10% profit, and the remaining two at 20% loss. Find the overall result.', 'একজন ব্যবসায়ী প্রতিটি ₹400 দরে 5টি জিনিস কেনেন। তিনি দুটি 30% লাভে, একটি 10% লাভে এবং বাকি দুটি 20% ক্ষতিতে বিক্রি করেন। মোট ফল কত?'),
        options: [t('0%', '0%'), t('6% profit', '6% লাভ'), t('6% loss', '6% ক্ষতি'), t('16.67% profit', '16.67% লাভ')],
        correct: 1,
        explanation: [
          t('Total CP = 5 × 400 = ₹2000. Group SPs: 2 × 520 = ₹1040, 1 × 440 = ₹440, 2 × 320 = ₹640.', 'মোট CP = 5 × 400 = ₹2000। দলগুলির SP: 2 × 520 = ₹1040, 1 × 440 = ₹440, 2 × 320 = ₹640।'),
          t('Total SP = 1040 + 440 + 640 = ₹2120, so profit = ₹120.', 'মোট SP = 1040 + 440 + 640 = ₹2120, তাই লাভ = ₹120।'),
          t(r`Overall profit % $= \frac{120}{2000} \times 100 = 6\%$. (0% wrongly averages the three rates without the counts.)`, r`মোট শতকরা লাভ $= \frac{120}{2000} \times 100 = 6\%$। (0% আসে সংখ্যা না ধরে তিনটি হারের গড় নিলে।)`),
        ],
      },
    },

    // 11 ─────────────────────────────────────────────
    {
      key: 'price_changes',
      registryLinked: true,
      emoji: '🔄',
      name: t('New profit % after CP and SP both change', 'CP ও SP দুটোই বদলালে নতুন লাভ %'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“Originally sold at x% profit. CP then rises by a%, the old SP is increased by b% and a c% discount is offered on the new price. Find the new profit %.”', '“প্রথমে x% লাভে বিক্রি হত। পরে CP a% বাড়ে, পুরনো SP b% বাড়িয়ে নতুন দামে c% ছাড় দেওয়া হয়। নতুন লাভ % কত?”'),
      formula: t(r`New $CP = \text{old } CP \times \frac{100 + a}{100}$; new $SP = \text{old } SP \times \frac{100 + b}{100} \times \frac{100 - c}{100}$; new % $= \frac{\text{new } SP - \text{new } CP}{\text{new } CP} \times 100$.`, r`নতুন $CP = \text{পুরনো } CP \times \frac{100 + a}{100}$; নতুন $SP = \text{পুরনো } SP \times \frac{100 + b}{100} \times \frac{100 - c}{100}$; নতুন % $= \frac{\text{নতুন } SP - \text{নতুন } CP}{\text{নতুন } CP} \times 100$।`),
      shortcut: t('Put old CP = 100, so old SP is just 100 + (original profit %). Then apply each change as a multiplier in a chain and compare the final two numbers directly.', 'পুরনো CP = 100 ধরো, তাহলে পুরনো SP হয় 100 + (মূল লাভ %)। তারপর প্রতিটি পরিবর্তনকে গুণক হিসেবে শৃঙ্খলে প্রয়োগ করে শেষ দুটি সংখ্যা সরাসরি তুলনা করো।'),
      trap: t('The changes act on different bases and compound, so the rates cannot be added or subtracted: original profit + SP rise − discount − CP rise is not the answer.', 'পরিবর্তনগুলি ভিন্ন ভিত্তির উপর কাজ করে ও পরপর প্রয়োগ হয়, তাই হারগুলি যোগ-বিয়োগ করা যায় না: মূল লাভ + SP বৃদ্ধি − ছাড় − CP বৃদ্ধি উত্তর নয়।'),
      spot: t(
        'The selling side **and** the cost side both change in sequence — CP moves, the old SP is raised or lowered, and a discount may be applied — and the new overall result is asked.',
        'বিক্রির দিক **এবং** খরচের দিক দুটোই পরপর বদলায় — CP বদলায়, পুরনো SP বাড়ে বা কমে, আর ছাড়ও দেওয়া হতে পারে — এবং নতুন মোট ফল জানতে চাওয়া হয়।',
      ),
      method: [
        t('Take old CP = 100 and write the old SP from the original profit %.', 'পুরনো CP = 100 ধরে মূল লাভ % থেকে পুরনো SP লেখো।'),
        t('Apply the CP change to get the new CP.', 'CP-এর পরিবর্তন প্রয়োগ করে নতুন CP বের করো।'),
        t('Apply the SP change and then the discount, in order, to get the new SP.', 'SP-এর পরিবর্তন ও তারপর ছাড় পরপর প্রয়োগ করে নতুন SP বের করো।'),
        t('New result % = (new SP − new CP) ÷ new CP × 100.', 'নতুন ফল % = (নতুন SP − নতুন CP) ÷ নতুন CP × 100।'),
      ],
      example: {
        question: t('A trader originally sells an article at 25% profit. The cost price then rises by 25%, while its old selling price is increased by 20% and a 10% discount is offered on the new price. Find the new profit per cent.', 'একজন ব্যবসায়ী প্রথমে একটি জিনিস 25% লাভে বিক্রি করেন। পরে ক্রয়মূল্য 25% বাড়ে, আর পুরনো বিক্রয়মূল্য 20% বাড়িয়ে নতুন দামে 10% ছাড় দেওয়া হয়। নতুন শতকরা লাভ কত?'),
        steps: [
          t('Let old CP = 100. Then old SP = 125.', 'পুরনো CP = 100 ধরলে পুরনো SP = 125।'),
          t('New CP = 100 × 125/100 = 125.', 'নতুন CP = 100 × 125/100 = 125।'),
          t('New SP = 125 × 120/100 × 90/100 = 135.', 'নতুন SP = 125 × 120/100 × 90/100 = 135।'),
          t(r`New profit % $= \frac{135 - 125}{125} \times 100 = 8\%$.`, r`নতুন শতকরা লাভ $= \frac{135 - 125}{125} \times 100 = 8\%$।`),
        ],
        answer: t('8% profit', '8% লাভ'),
      },
      tryIt: {
        question: t('A trader originally sells an article at 20% profit. The cost price then rises by 20%, while its old selling price is increased by 50% and a 25% discount is offered on the new price. Find the new profit per cent.', 'একজন ব্যবসায়ী প্রথমে একটি জিনিস 20% লাভে বিক্রি করেন। পরে ক্রয়মূল্য 20% বাড়ে, আর পুরনো বিক্রয়মূল্য 50% বাড়িয়ে নতুন দামে 25% ছাড় দেওয়া হয়। নতুন শতকরা লাভ কত?'),
        options: [t('45% profit', '45% লাভ'), t('12.5% profit', '12.5% লাভ'), t('10% profit', '10% লাভ'), t('12.5% loss', '12.5% ক্ষতি')],
        correct: 1,
        explanation: [
          t('Let old CP = 100, so old SP = 120 and new CP = 120.', 'পুরনো CP = 100 ধরলে পুরনো SP = 120 এবং নতুন CP = 120।'),
          t('New SP = 120 × 150/100 × 75/100 = 135.', 'নতুন SP = 120 × 150/100 × 75/100 = 135।'),
          t(r`New profit % $= \frac{135 - 120}{120} \times 100 = 12.5\%$.`, r`নতুন শতকরা লাভ $= \frac{135 - 120}{120} \times 100 = 12.5\%$।`),
        ],
      },
    },

    // 12 ─────────────────────────────────────────────
    {
      key: 'mixed_sales',
      registryLinked: true,
      emoji: '🧺',
      name: t('Part sold at a profit, the rest at a loss', 'এক অংশ লাভে, বাকি অংশ ক্ষতিতে বিক্রি'),
      difficulty: 'advanced',
      practiceLevels: ['advanced'],
      typicalWording: t('“A trader buys n identical articles at the same cost per article. He sells k at a x% profit and the rest at a y% loss. What is his overall result?”', '“একজন ব্যবসায়ী একই ক্রয়মূল্যে nটি একই রকম জিনিস কেনেন। তিনি kটি x% লাভে এবং বাকিগুলি y% ক্ষতিতে বিক্রি করেন। তাঁর মোট ফল কত?”'),
      formula: t(r`Overall % $= \frac{\text{total } SP - \text{total } CP}{\text{total } CP} \times 100$, adding the SP of both parts before comparing.`, r`মোট ফল % $= \frac{\text{মোট } SP - \text{মোট } CP}{\text{মোট } CP} \times 100$, তুলনার আগে দুই অংশের SP যোগ করে।`),
      shortcut: t('With equal CP per article, use the quantity-weighted signed rates: (k × profit % − rest × loss %) ÷ n. It works only because every article costs the same.', 'প্রতি জিনিসের CP সমান হলে সংখ্যা-ওজনযুক্ত চিহ্নসহ হার নাও: (k × লাভ % − বাকি × ক্ষতি %) ÷ n। এটি শুধু প্রতিটি জিনিসের দাম একই বলেই চলে।'),
      trap: t('Subtracting the loss rate from the profit rate (x − y) ignores how many articles were sold at each rate.', 'লাভের হার থেকে ক্ষতির হার বিয়োগ করলে (x − y) প্রতিটি হারে কটি জিনিস বিক্রি হয়েছে তা বাদ পড়ে।'),
      spot: t(
        'One lot of **identical articles bought at the same cost** is split into two parts, one sold at a profit and the other at a loss, and the overall result for the whole lot is asked.',
        '**একই দামে কেনা একই রকম জিনিসের** একটি দল দুই ভাগে ভাগ হয়, এক ভাগ লাভে ও অন্য ভাগ ক্ষতিতে বিক্রি হয়, আর পুরো দলের মোট ফল জানতে চাওয়া হয়।',
      ),
      method: [
        t('Take CP per article = ₹100 and find the total CP of the whole lot.', 'প্রতি জিনিসের CP = ₹100 ধরে পুরো দলের মোট CP বের করো।'),
        t('Find the SP of the part sold at a profit and the SP of the part sold at a loss.', 'লাভে বিক্রি হওয়া অংশের SP ও ক্ষতিতে বিক্রি হওয়া অংশের SP বের করো।'),
        t('Add the two SPs to get the total SP.', 'দুটি SP যোগ করে মোট SP পাও।'),
        t('Compare the totals once: overall % = (total SP − total CP) ÷ total CP × 100.', 'মোট অঙ্ক দুটি একবার তুলনা করো: মোট ফল % = (মোট SP − মোট CP) ÷ মোট CP × 100।'),
      ],
      example: {
        question: t('A trader buys 10 identical articles at the same cost per article. He sells 6 at a 20% profit and the rest at a 15% loss. What is his overall result?', 'একজন ব্যবসায়ী প্রতি জিনিসে একই ক্রয়মূল্যে 10টি একই রকম জিনিস কেনেন। তিনি 6টি 20% লাভে এবং বাকিগুলি 15% ক্ষতিতে বিক্রি করেন। তাঁর মোট ফল কত?'),
        steps: [
          t('Let each article cost ₹100. Total CP = 10 × 100 = ₹1000.', 'প্রতিটি জিনিসের দাম ₹100 ধরো। মোট CP = 10 × 100 = ₹1000।'),
          t('SP of 6 articles at 20% profit = 6 × 120 = ₹720.', '20% লাভে 6টির SP = 6 × 120 = ₹720।'),
          t('SP of 4 articles at 15% loss = 4 × 85 = ₹340, so total SP = 720 + 340 = ₹1060.', '15% ক্ষতিতে 4টির SP = 4 × 85 = ₹340, তাই মোট SP = 720 + 340 = ₹1060।'),
          t(r`Overall profit % $= \frac{1060 - 1000}{1000} \times 100 = 6\%$.`, r`মোট শতকরা লাভ $= \frac{1060 - 1000}{1000} \times 100 = 6\%$।`),
        ],
        answer: t('6% profit', '6% লাভ'),
      },
      tryIt: {
        question: t('A trader buys 20 identical articles at the same cost per article. He sells 8 at a 25% profit and the rest at a 10% loss. What is his overall result?', 'একজন ব্যবসায়ী প্রতি জিনিসে একই ক্রয়মূল্যে 20টি একই রকম জিনিস কেনেন। তিনি 8টি 25% লাভে এবং বাকিগুলি 10% ক্ষতিতে বিক্রি করেন। তাঁর মোট ফল কত?'),
        options: [t('15% profit', '15% লাভ'), t('4% profit', '4% লাভ'), t('7.5% profit', '7.5% লাভ'), t('4% loss', '4% ক্ষতি')],
        correct: 1,
        explanation: [
          t('Let each article cost ₹100. Total CP = ₹2000.', 'প্রতিটি জিনিসের দাম ₹100 ধরো। মোট CP = ₹2000।'),
          t('Total SP = 8 × 125 + 12 × 90 = 1000 + 1080 = ₹2080.', 'মোট SP = 8 × 125 + 12 × 90 = 1000 + 1080 = ₹2080।'),
          t(r`Overall profit % $= \frac{80}{2000} \times 100 = 4\%$. (15% just subtracts the two rates.)`, r`মোট শতকরা লাভ $= \frac{80}{2000} \times 100 = 4\%$। (15% আসে শুধু দুটি হার বিয়োগ করলে।)`),
        ],
      },
    },

    // 13 ─────────────────────────────────────────────
    {
      key: 'same_sp_rates',
      registryLinked: true,
      emoji: '🔀',
      name: t('Two articles sold at the same price, at different rates', 'দুটি জিনিস একই দামে, ভিন্ন হারে বিক্রি'),
      difficulty: 'advanced',
      practiceLevels: ['advanced'],
      typicalWording: t('“Two articles are sold for ₹… each. One is sold at a x% profit and the other at a y% loss. Find the overall profit or loss per cent.”', '“দুটি জিনিসই ₹… দরে বিক্রি করা হয়। একটিতে x% লাভ এবং অন্যটিতে y% ক্ষতি হয়। মোট শতকরা লাভ বা ক্ষতি কত?”'),
      formula: t(r`$CP_1 = SP \times \frac{100}{100 + x}$, $CP_2 = SP \times \frac{100}{100 - y}$; overall % $= \frac{2 \times SP - CP_1 - CP_2}{CP_1 + CP_2} \times 100$.`, r`$CP_1 = SP \times \frac{100}{100 + x}$, $CP_2 = SP \times \frac{100}{100 - y}$; মোট ফল % $= \frac{2 \times SP - CP_1 - CP_2}{CP_1 + CP_2} \times 100$।`),
      shortcut: t(r`Only in the special case of equal rates, $x\%$ profit and $x\%$ loss at the same SP, the result is always a loss of $\frac{x^2}{100}\%$. For unequal rates, recover both CPs — there is no shorter safe route.`, r`শুধু সমান হারের বিশেষ ক্ষেত্রে, একই SP-তে $x\%$ লাভ ও $x\%$ ক্ষতি হলে ফল সবসময় $\frac{x^2}{100}\%$ ক্ষতি। অসমান হারে দুটি CP-ই বের করতে হবে — এর চেয়ে ছোট নিরাপদ পথ নেই।`),
      trap: t('Do not average or subtract the two rates. The SPs are equal but the CPs are not, so each rate acts on a different base.', 'দুটি হারের গড় বা বিয়োগ করবে না। SP দুটি সমান হলেও CP দুটি সমান নয়, তাই প্রতিটি হার ভিন্ন ভিত্তির উপর কাজ করে।'),
      spot: t(
        'Two articles are sold at **exactly the same selling price**, one at a profit % and the other at a loss %, and the combined result is asked.',
        'দুটি জিনিস **ঠিক একই বিক্রয়মূল্যে** বিক্রি হয়, একটিতে লাভ % ও অন্যটিতে ক্ষতি %, আর সম্মিলিত ফল জানতে চাওয়া হয়।',
      ),
      method: [
        t('Recover the CP of the profit article: CP = SP × 100/(100 + x).', 'লাভের জিনিসটির CP বের করো: CP = SP × 100/(100 + x)।'),
        t('Recover the CP of the loss article: CP = SP × 100/(100 − y).', 'ক্ষতির জিনিসটির CP বের করো: CP = SP × 100/(100 − y)।'),
        t('Add the two CPs and compare with the total SP (twice the common SP).', 'দুটি CP যোগ করে মোট SP-এর (সাধারণ SP-এর দ্বিগুণ) সঙ্গে তুলনা করো।'),
        t('Overall % = (total SP − total CP) ÷ total CP × 100.', 'মোট ফল % = (মোট SP − মোট CP) ÷ মোট CP × 100।'),
      ],
      example: {
        question: t('Two articles are sold for ₹240 each. One is sold at a 20% profit and the other at a 20% loss. Find the overall profit or loss per cent.', 'দুটি জিনিসই ₹240 দরে বিক্রি করা হয়। একটিতে 20% লাভ এবং অন্যটিতে 20% ক্ষতি হয়। মোট শতকরা লাভ বা ক্ষতি কত?'),
        steps: [
          t('CP of the first = 240 × 100/120 = ₹200.', 'প্রথমটির CP = 240 × 100/120 = ₹200।'),
          t('CP of the second = 240 × 100/80 = ₹300, so total CP = ₹500.', 'দ্বিতীয়টির CP = 240 × 100/80 = ₹300, তাই মোট CP = ₹500।'),
          t('Total SP = 240 + 240 = ₹480, so there is a loss of ₹20.', 'মোট SP = 240 + 240 = ₹480, তাই ক্ষতি ₹20।'),
          t(r`Overall loss % $= \frac{20}{500} \times 100 = 4\%$.`, r`মোট শতকরা ক্ষতি $= \frac{20}{500} \times 100 = 4\%$।`),
        ],
        answer: t('4% loss', '4% ক্ষতি'),
      },
      tryIt: {
        question: t('Two articles are sold for ₹360 each. One is sold at a 50% profit and the other at a 10% loss. Find the overall result.', 'দুটি জিনিসই ₹360 দরে বিক্রি করা হয়। একটিতে 50% লাভ এবং অন্যটিতে 10% ক্ষতি হয়। মোট ফল কত?'),
        options: [t('20% profit', '20% লাভ'), t('40% profit', '40% লাভ'), t('12.5% profit', '12.5% লাভ'), t('12.5% loss', '12.5% ক্ষতি')],
        correct: 2,
        explanation: [
          t('CPs: 360 × 100/150 = ₹240 and 360 × 100/90 = ₹400, so total CP = ₹640.', 'CP দুটি: 360 × 100/150 = ₹240 এবং 360 × 100/90 = ₹400, তাই মোট CP = ₹640।'),
          t('Total SP = ₹720, so profit = 720 − 640 = ₹80.', 'মোট SP = ₹720, তাই লাভ = 720 − 640 = ₹80।'),
          t(r`Overall profit % $= \frac{80}{640} \times 100 = 12.5\%$. (20% wrongly averages 50 and −10.)`, r`মোট শতকরা লাভ $= \frac{80}{640} \times 100 = 12.5\%$। (20% আসে ভুল করে 50 ও −10-এর গড় নিলে।)`),
        ],
      },
    },

    // 14 ─────────────────────────────────────────────
    {
      key: 'false_weight_discount',
      registryLinked: true,
      emoji: '🚨',
      name: t('False weight combined with a discount', 'ভুল ওজনের সঙ্গে ছাড়'),
      difficulty: 'advanced',
      practiceLevels: ['advanced'],
      typicalWording: t('“A dealer buys goods at ₹… per kg, marks a 1 kg packet at ₹…, and gives d% discount. But he supplies only g grams. Find his actual profit per cent.”', '“একজন ব্যবসায়ী প্রতি কেজি ₹… দরে পণ্য কেনেন, 1 কেজির প্যাকেটের দাম ₹… লেখেন এবং d% ছাড় দেন। কিন্তু তিনি দেন মাত্র g গ্রাম। তাঁর প্রকৃত লাভ কত শতাংশ?”'),
      formula: t(r`Actual profit % $= \frac{\text{discounted } SP - \text{cost of quantity delivered}}{\text{cost of quantity delivered}} \times 100$, where cost of quantity delivered $= CP \text{ per kg} \times \frac{\text{grams delivered}}{1000}$.`, r`প্রকৃত লাভ % $= \frac{\text{ছাড়ের পর } SP - \text{দেওয়া পরিমাণের খরচ}}{\text{দেওয়া পরিমাণের খরচ}} \times 100$, যেখানে দেওয়া পরিমাণের খরচ $= \text{প্রতি কেজির } CP \times \frac{\text{দেওয়া গ্রাম}}{1000}$।`),
      shortcut: t('Compare only two amounts: the money actually received (after discount) and the cost of the grams actually handed over. The labelled 1 kg matters only for the price charged.', 'শুধু দুটি অঙ্ক তুলনা করো: সত্যিই পাওয়া টাকা (ছাড়ের পর) এবং সত্যিই দেওয়া গ্রামের খরচ। লেবেলের 1 kg শুধু ধার্য দামের জন্যই গুরুত্বপূর্ণ।'),
      trap: t('Do not use the cost of a full kilogram as his CP — he never delivers it. Also do not forget the discount when working out what he actually receives.', 'পুরো এক কেজির খরচকে তাঁর CP ধরবে না — তিনি তা কখনো দেনই না। তিনি সত্যিই কত পান তা বের করতে ছাড়ও ভুলবে না।'),
      spot: t(
        'Two tricks appear together: a **discount on the marked packet price** and **short delivery** — the customer is charged for 1 kg but receives less.',
        'দুটি কৌশল একসঙ্গে থাকে: **প্যাকেটের ধার্যমূল্যে ছাড়** এবং **কম দেওয়া** — ক্রেতার কাছে 1 kg-এর দাম নেওয়া হয় কিন্তু তিনি কম পান।',
      ),
      method: [
        t('Find the money actually received: apply the discount to the marked packet price.', 'সত্যিই পাওয়া টাকা বের করো: প্যাকেটের ধার্যমূল্যে ছাড় প্রয়োগ করো।'),
        t('Find his real cost: CP per kg × (grams delivered ÷ 1000).', 'তাঁর আসল খরচ বের করো: প্রতি কেজির CP × (দেওয়া গ্রাম ÷ 1000)।'),
        t('Profit = amount received − real cost.', 'লাভ = পাওয়া টাকা − আসল খরচ।'),
        t('Profit % is on the real cost of what he delivered.', 'লাভ % হবে তিনি যা দিয়েছেন তার আসল খরচের উপর।'),
      ],
      example: {
        question: t('A dealer buys goods at ₹200 per kg, marks a 1 kg packet at ₹300, and gives a 20% discount. But he supplies only 800 g. Find his actual profit per cent.', 'একজন ব্যবসায়ী প্রতি কেজি ₹200 দরে পণ্য কেনেন, 1 কেজির প্যাকেটের দাম ₹300 লেখেন এবং 20% ছাড় দেন। কিন্তু তিনি দেন মাত্র 800 গ্রাম। তাঁর প্রকৃত লাভ কত শতাংশ?'),
        steps: [
          t('Amount received after discount = 300 × 80/100 = ₹240.', 'ছাড়ের পর পাওয়া টাকা = 300 × 80/100 = ₹240।'),
          t('He delivers only 800 g, whose cost = 200 × 800/1000 = ₹160.', 'তিনি দেন মাত্র 800 গ্রাম, যার খরচ = 200 × 800/1000 = ₹160।'),
          t('Actual profit = 240 − 160 = ₹80.', 'প্রকৃত লাভ = 240 − 160 = ₹80।'),
          t(r`Actual profit % $= \frac{80}{160} \times 100 = 50\%$.`, r`প্রকৃত শতকরা লাভ $= \frac{80}{160} \times 100 = 50\%$।`),
        ],
        answer: t('50% profit', '50% লাভ'),
      },
      tryIt: {
        question: t('A dealer buys goods at ₹250 per kg, marks a 1 kg packet at ₹375, and gives a 20% discount. But he supplies only 750 g. Find his actual profit per cent.', 'একজন ব্যবসায়ী প্রতি কেজি ₹250 দরে পণ্য কেনেন, 1 কেজির প্যাকেটের দাম ₹375 লেখেন এবং 20% ছাড় দেন। কিন্তু তিনি দেন মাত্র 750 গ্রাম। তাঁর প্রকৃত লাভ কত শতাংশ?'),
        options: [t('20%', '20%'), t('50%', '50%'), t('60%', '60%'), t('37.5%', '37.5%')],
        correct: 2,
        explanation: [
          t('Amount received = 375 × 80/100 = ₹300. Cost of 750 g = 250 × 750/1000 = ₹187.50.', 'পাওয়া টাকা = 375 × 80/100 = ₹300। 750 গ্রামের খরচ = 250 × 750/1000 = ₹187.50।'),
          t('Profit = 300 − 187.50 = ₹112.50.', 'লাভ = 300 − 187.50 = ₹112.50।'),
          t(r`Profit % $= \frac{112.50}{187.50} \times 100 = 60\%$. (20% wrongly charges him for a full kilogram.)`, r`শতকরা লাভ $= \frac{112.50}{187.50} \times 100 = 60\%$। (20% আসে ভুল করে পুরো এক কেজির খরচ ধরলে।)`),
        ],
      },
    },

    // 15 ─────────────────────────────────────────────
    {
      key: 'combined_articles',
      registryLinked: true,
      emoji: '📦',
      name: t('Two batches with different costs: combined result', 'ভিন্ন দামের দুটি দল: সম্মিলিত ফল'),
      difficulty: 'advanced',
      practiceLevels: ['advanced'],
      typicalWording: t('“A shopkeeper buys a articles at ₹p each and b articles at ₹q each. He sells the two batches at x% profit and y% loss respectively. Find the combined result.”', '“একজন দোকানদার aটি জিনিস প্রতিটি ₹p দরে এবং bটি প্রতিটি ₹q দরে কেনেন। দুই দলকে যথাক্রমে x% লাভে ও y% ক্ষতিতে বিক্রি করেন। সম্মিলিত ফল কত?”'),
      formula: t(r`Combined % $= \frac{\text{grand total } SP - \text{grand total } CP}{\text{grand total } CP} \times 100$, where each total is the sum over both batches.`, r`সম্মিলিত ফল % $= \frac{\text{সর্বমোট } SP - \text{সর্বমোট } CP}{\text{সর্বমোট } CP} \times 100$, যেখানে প্রতিটি মোট হল দুই দলের যোগফল।`),
      shortcut: t('No rate-averaging shortcut is safe here, because the batches have different total costs. The grand-total method — add all SPs, add all CPs, compare once — is the fastest reliable route.', 'এখানে হারের গড়ের কোনো শর্টকাট নিরাপদ নয়, কারণ দলগুলির মোট খরচ আলাদা। সর্বমোট পদ্ধতি — সব SP যোগ, সব CP যোগ, একবার তুলনা — সবচেয়ে দ্রুত নির্ভরযোগ্য পথ।'),
      trap: t('Averaging or subtracting the two rates treats the two batches as if their total cost prices were equal. They usually are not.', 'দুটি হারের গড় বা বিয়োগ করলে দুই দলের মোট ক্রয়মূল্য সমান বলে ধরা হয়। সাধারণত তা হয় না।'),
      spot: t(
        'Articles come in **two batches bought at different prices per article**, and each batch is sold at its own profit or loss rate.',
        'জিনিসগুলি **প্রতিটির ভিন্ন দামে কেনা দুটি দলে** আসে, এবং প্রতিটি দল তার নিজের লাভ বা ক্ষতির হারে বিক্রি হয়।',
      ),
      method: [
        t('Find the total CP of each batch: count × price per article.', 'প্রতিটি দলের মোট CP বের করো: সংখ্যা × প্রতি জিনিসের দাম।'),
        t('Apply each batch rate to its own total CP to get its total SP.', 'প্রতিটি দলের হার তার নিজের মোট CP-তে প্রয়োগ করে তার মোট SP বের করো।'),
        t('Add the batch totals to get the grand total CP and grand total SP.', 'দলগুলির মোট যোগ করে সর্বমোট CP ও সর্বমোট SP পাও।'),
        t('Combined % = (grand SP − grand CP) ÷ grand CP × 100.', 'সম্মিলিত ফল % = (সর্বমোট SP − সর্বমোট CP) ÷ সর্বমোট CP × 100।'),
      ],
      example: {
        question: t('A shopkeeper buys 10 articles at ₹100 each and 5 articles at ₹200 each. He sells the first batch at a 30% profit and the second batch at a 10% loss. Find the combined result.', 'একজন দোকানদার 10টি জিনিস প্রতিটি ₹100 দরে এবং 5টি প্রতিটি ₹200 দরে কেনেন। তিনি প্রথম দলটি 30% লাভে এবং দ্বিতীয় দলটি 10% ক্ষতিতে বিক্রি করেন। সম্মিলিত ফল কত?'),
        steps: [
          t('Batch CPs: 10 × 100 = ₹1000 and 5 × 200 = ₹1000, so grand total CP = ₹2000.', 'দলগুলির CP: 10 × 100 = ₹1000 এবং 5 × 200 = ₹1000, তাই সর্বমোট CP = ₹2000।'),
          t('Batch SPs: 1000 × 130/100 = ₹1300 and 1000 × 90/100 = ₹900.', 'দলগুলির SP: 1000 × 130/100 = ₹1300 এবং 1000 × 90/100 = ₹900।'),
          t('Grand total SP = 1300 + 900 = ₹2200, so profit = ₹200.', 'সর্বমোট SP = 1300 + 900 = ₹2200, তাই লাভ = ₹200।'),
          t(r`Combined profit % $= \frac{200}{2000} \times 100 = 10\%$.`, r`সম্মিলিত শতকরা লাভ $= \frac{200}{2000} \times 100 = 10\%$।`),
        ],
        answer: t('10% profit', '10% লাভ'),
      },
      tryIt: {
        question: t('A shopkeeper buys 5 articles at ₹200 each and 10 articles at ₹300 each. He sells the first batch at a 20% profit and the second batch at a 20% loss. Find the combined result.', 'একজন দোকানদার 5টি জিনিস প্রতিটি ₹200 দরে এবং 10টি প্রতিটি ₹300 দরে কেনেন। তিনি প্রথম দলটি 20% লাভে এবং দ্বিতীয় দলটি 20% ক্ষতিতে বিক্রি করেন। সম্মিলিত ফল কত?'),
        options: [t('0%', '0%'), t('10% profit', '10% লাভ'), t('10% loss', '10% ক্ষতি'), t('5% loss', '5% ক্ষতি')],
        correct: 2,
        explanation: [
          t('Batch CPs: 5 × 200 = ₹1000 and 10 × 300 = ₹3000, so grand total CP = ₹4000.', 'দলগুলির CP: 5 × 200 = ₹1000 এবং 10 × 300 = ₹3000, তাই সর্বমোট CP = ₹4000।'),
          t('Batch SPs: 1000 × 120/100 = ₹1200 and 3000 × 80/100 = ₹2400, so grand total SP = ₹3600.', 'দলগুলির SP: 1000 × 120/100 = ₹1200 এবং 3000 × 80/100 = ₹2400, তাই সর্বমোট SP = ₹3600।'),
          t(r`Loss $= ₹400$ on $₹4000$, so loss % $= \frac{400}{4000} \times 100 = 10\%$. (0% wrongly assumes the two rates cancel.)`, r`ক্ষতি $= ₹400$, $₹4000$-এর উপর, তাই ক্ষতি % $= \frac{400}{4000} \times 100 = 10\%$। (0% আসে ভুল করে দুটি হার পরস্পর কেটে যায় ধরে নিলে।)`),
        ],
      },
    },
  ],
  registry: [
    { id: 'mixed_sales', difficulty: 4, band: 'hard', concepts: ['profit', 'loss', 'weighted_average'], generationRule: 'Split equal-cost articles across different profit and loss rates.', solutionMethod: 'Compute aggregate CP and aggregate SP, then compare once.', name: t('Mixed profit and loss sales', 'মিশ্র লাভ-ক্ষতিতে বিক্রি') },
    { id: 'markup_discounts', difficulty: 4, band: 'hard', concepts: ['markup', 'successive_discount', 'profit_loss'], generationRule: 'Apply two discounts successively to an MP above CP.', solutionMethod: 'Use CP = 100, multiply the markup and discount factors, then compare with CP.', name: t('Markup with successive discounts', 'মার্কআপ ও পরপর ছাড়') },
    { id: 'successive_discounts', difficulty: 3, band: 'medium_hard', concepts: ['successive_discount', 'target_profit'], generationRule: 'Find the second discount needed to reach a target profit after the first discount.', solutionMethod: 'Calculate the target SP from CP, then reverse the first discount to find the required second rate.', name: t('Target after successive discounts', 'পরপর ছাড়ে লক্ষ্য লাভ') },
    { id: 'same_sp_rates', difficulty: 5, band: 'advanced_hard', concepts: ['same_selling_price', 'reverse_percentage', 'combined_profit_loss'], generationRule: 'Recover separate cost prices from a common SP and unequal profit/loss rates.', solutionMethod: 'Find both CPs independently, add CP and SP, and compute the net rate on total CP.', name: t('Same SP, different rates', 'একই SP, ভিন্ন হার') },
    { id: 'same_cp_rates', difficulty: 4, band: 'hard', concepts: ['same_cost_price', 'weighted_average', 'profit_loss'], generationRule: 'Combine several gain/loss rates for unequal quantities with the same CP per article.', solutionMethod: 'Weight each rate by its quantity and divide the signed total by total quantity.', name: t('Same CP, different rates', 'একই CP, ভিন্ন হার') },
    { id: 'false_weight_discount', difficulty: 5, band: 'advanced_hard', concepts: ['false_weight', 'discount', 'effective_cost'], generationRule: 'Combine an MP discount with short delivery measured against the actual supplied weight.', solutionMethod: 'Calculate discounted receipts and the cost of the true quantity supplied.', name: t('False weight with discount', 'ভুল ওজনের সঙ্গে ছাড়') },
    { id: 'articles_ratio', difficulty: 3, band: 'medium_hard', concepts: ['articles_ratio', 'reverse_cost_price', 'profit_loss'], generationRule: 'Use the relationship between the CP of X articles and SP of Y articles.', solutionMethod: 'Set per-article CP to one; derive the SP of Y articles and divide the gain by total CP.', name: t('Buy/sell article relationship', 'কেনা-বেচা জিনিসের অনুপাত') },
    { id: 'reverse_conditions', difficulty: 5, band: 'advanced_hard', concepts: ['reverse_cost_price', 'discount', 'profit_loss'], generationRule: 'Recover CP from an MP, a discount, and a realized profit; recompute under a second selling condition.', solutionMethod: 'Reverse the first condition to find CP, then apply the alternative discount and compare.', name: t('Reverse CP under two conditions', 'দুই শর্তে উল্টো CP নির্ণয়') },
    { id: 'combined_articles', difficulty: 5, band: 'advanced_hard', concepts: ['multiple_articles', 'different_cost_prices', 'combined_profit_loss'], generationRule: 'Combine two batches with different unit costs and different selling rates.', solutionMethod: 'Find each batch’s total CP and SP, then compare the grand totals.', name: t('Combined batches', 'একাধিক দলের সম্মিলিত হিসাব') },
    { id: 'expenses', difficulty: 4, band: 'hard', concepts: ['additional_expenses', 'marked_price', 'discount'], generationRule: 'Include overhead in effective CP, then account for markup and discount.', solutionMethod: 'Add expenses to CP before measuring gain or loss; apply discount to MP.', name: t('Profit after expenses', 'অতিরিক্ত খরচের পর লাভ') },
    { id: 'target_price', difficulty: 3, band: 'medium_hard', concepts: ['target_profit', 'additional_expenses', 'discount'], generationRule: 'Find the MP required to earn a target rate after overhead and a discount.', solutionMethod: 'Work forward from total cost to target SP, then reverse the discount.', name: t('MP for a target profit', 'লক্ষ্য লাভের জন্য MP') },
    { id: 'price_changes', difficulty: 4, band: 'hard', concepts: ['price_change', 'successive_percentage', 'profit_loss'], generationRule: 'Recompute gain or loss after changes to both CP and SP, including a discount.', solutionMethod: 'Represent each sequential price change as a multiplier and compare final SP to new CP.', name: t('Changing CP and SP', 'CP ও SP-র পরিবর্তন') },
    { id: 'ratio_based', difficulty: 5, band: 'advanced_hard', concepts: ['ratio', 'weighted_average', 'profit_loss'], generationRule: 'Combine unequal gain/loss rates using a ratio of total cost prices.', solutionMethod: 'Scale CPs by the stated ratio, calculate signed profit amounts, and divide by total CP.', name: t('Ratio-based combined result', 'অনুপাতভিত্তিক সম্মিলিত ফল') },
    { id: 'algebraic', difficulty: 5, band: 'advanced_hard', concepts: ['algebra', 'reverse_percentage', 'profit_loss'], generationRule: 'Relate the numerical profit rate to the unknown cost price and solve the resulting quadratic.', solutionMethod: 'Set CP = x, form the quadratic from SP = x + x²/50, and reject the negative root.', name: t('Algebraic CP relationship', 'বীজগাণিতিক CP-র সম্পর্ক') },
    { id: 'multi_condition', difficulty: 5, band: 'advanced_hard', concepts: ['markup', 'successive_discount', 'expenses', 'profit_loss'], generationRule: 'Combine markup, several successive discounts, and delivery expense in one transaction.', solutionMethod: 'Track MP through each discount and compare final SP against total cost including expenses.', name: t('Multi-condition shop problem', 'একাধিক শর্তের দোকানের অঙ্ক') },
  ],
};
