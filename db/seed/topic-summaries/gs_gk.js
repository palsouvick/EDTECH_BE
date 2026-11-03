'use strict';

/**
 * Concept sheets for the General Knowledge chapters added with the GK section
 * (src/services/gkTaxonomy.js NEW_TOPICS). Every fact stated here is taken from
 * the verified GK library (db/gk/<topic>.jsonl), where its source is recorded.
 */

module.exports = [
  {
    subject: 'gs',
    topic: 'computer_awareness',
    title: { en: 'Computer Awareness', bn: 'কম্পিউটার সচেতনতা', hi: 'कंप्यूटर जागरूकता' },
    overview: {
      en: 'Computer Awareness covers the **parts of a computer and its memory**, **software and language translators**, **networks and the Internet**, **MS Office basics**, **abbreviations** and **cyber security**. In the WBPSC Clerkship, computer operation is tested practically after the written parts, so this chapter is background knowledge there; banking and other exams ask it as objective questions. Learn each idea as a pair: a term and what it does (ALU → calculations, DNS → name to IP address). Numbers asked most often are memory units and address sizes; learn them exactly as NCERT gives them.',
      bn: 'কম্পিউটার সচেতনতায় থাকে **কম্পিউটারের অংশ ও মেমরি**, **সফটওয়্যার ও ভাষা অনুবাদক**, **নেটওয়ার্ক ও ইন্টারনেট**, **এমএস অফিসের প্রাথমিক বিষয়**, **সংক্ষিপ্ত রূপ** এবং **সাইবার নিরাপত্তা**। WBPSC ক্লার্কশিপে কম্পিউটার পরিচালনা লিখিত অংশের পরে হাতে-কলমে যাচাই হয়, তাই সেখানে এটি সহায়ক জ্ঞান; ব্যাংক ও অন্যান্য পরীক্ষায় এটি অবজেক্টিভ প্রশ্নে আসে। প্রতিটি ধারণা জোড়ায় শেখো: একটি শব্দ ও তার কাজ (ALU → গণনা, DNS → নাম থেকে IP ঠিকানা)। সবচেয়ে বেশি জিজ্ঞাসিত সংখ্যা হল মেমরির একক ও ঠিকানার আকার; NCERT যেভাবে দিয়েছে ঠিক সেভাবে শেখো।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'Inside the computer: CPU and memory', bn: 'কম্পিউটারের ভেতরে: CPU ও মেমরি' },
        body: {
          en: '- **CPU** (microprocessor) = **ALU** (arithmetic and logic operations) + **Control Unit** (interprets instructions, guides data flow) + registers\n- **RAM**: main memory, **volatile** (lost without power)\n- **ROM**: **non-volatile**, holds the boot loader\n- **Cache**: very fast memory between the CPU and primary memory\n- **Secondary memory** (HDD, CD/DVD, memory card): non-volatile, larger, slower, not accessed directly by the CPU',
          bn: '- **CPU** (মাইক্রোপ্রসেসর) = **ALU** (গাণিতিক ও যৌক্তিক কাজ) + **কন্ট্রোল ইউনিট** (নির্দেশ ব্যাখ্যা করে, তথ্যপ্রবাহ চালায়) + রেজিস্টার\n- **RAM**: প্রধান মেমরি, **অস্থায়ী** (বিদ্যুৎ ছাড়া মুছে যায়)\n- **ROM**: **স্থায়ী**, এতে বুট লোডার থাকে\n- **ক্যাশে**: CPU ও প্রাথমিক মেমরির মাঝে খুব দ্রুত মেমরি\n- **সেকেন্ডারি মেমরি** (HDD, CD/DVD, মেমরি কার্ড): স্থায়ী, বড়, ধীর, CPU সরাসরি ব্যবহার করতে পারে না',
        },
      },
      {
        title: { en: 'Networks by size and the addresses they use', bn: 'আকার অনুযায়ী নেটওয়ার্ক ও তাদের ঠিকানা' },
        body: {
          en: '- **PAN** ≈ 10 m (Bluetooth between phones) → **LAN** up to ≈ 1 km → **MAN** a city, 30–40 km (cable TV) → **WAN** countries and continents; the **Internet is the largest WAN**\n- **IPv4** 32 bits (four numbers 0–255), **IPv6** 128 bits (eight hexadecimal groups), **MAC** 48 bits, fixed on the network card\n- **DNS** turns a domain name into an IP address\n- **World Wide Web**: Tim Berners-Lee, **1990** (HTML, URI/URL, HTTP)',
          bn: '- **PAN** ≈ ১০ মিটার (ফোনের মধ্যে ব্লুটুথ) → **LAN** ≈ ১ কিমি পর্যন্ত → **MAN** একটি শহর, ৩০–৪০ কিমি (কেবল টিভি) → **WAN** দেশ ও মহাদেশ; **ইন্টারনেট সবচেয়ে বড় WAN**\n- **IPv4** ৩২ বিট (০–২৫৫-এর চারটি সংখ্যা), **IPv6** ১২৮ বিট (আটটি হেক্সাডেসিমাল গুচ্ছ), **MAC** ৪৮ বিট, নেটওয়ার্ক কার্ডে স্থির\n- **DNS** ডোমেন নামকে IP ঠিকানায় রূপান্তর করে\n- **ওয়ার্ল্ড ওয়াইড ওয়েব**: টিম বার্নার্স-লি, **১৯৯০** (HTML, URI/URL, HTTP)',
        },
      },
      {
        title: { en: 'Threats and the law', bn: 'বিপদ ও আইন' },
        body: {
          en: '- **Virus** attaches to other programs; **worm** spreads by itself through networks; **Trojan** looks genuine but does not replicate\n- **Ransomware** encrypts data and demands money; **keylogger** records keystrokes\n- **Phishing**: fake sites or emails to steal passwords and bank details\n- **IT Act, 2000** (amended **2008**): India\'s legal framework for cyber crime\n- **CERT-In**: national cyber-security agency under **MeitY**',
          bn: '- **ভাইরাস** অন্য প্রোগ্রামে জুড়ে যায়; **ওয়ার্ম** নিজে নিজেই নেটওয়ার্কে ছড়ায়; **ট্রোজান** আসল মনে হয় কিন্তু কপি হয় না\n- **র‍্যানসমওয়্যার** তথ্য এনক্রিপ্ট করে টাকা চায়; **কি-লগার** চাপা কী রেকর্ড করে\n- **ফিশিং**: পাসওয়ার্ড ও ব্যাংকের তথ্য চুরির জন্য ভুয়ো সাইট বা ইমেল\n- **IT আইন, ২০০০** (**২০০৮**-এ সংশোধিত): সাইবার অপরাধের জন্য ভারতের আইনি কাঠামো\n- **CERT-In**: **MeitY**-র অধীন জাতীয় সাইবার নিরাপত্তা সংস্থা',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Memory units: multiply by 1024', bn: 'মেমরির একক: ১০২৪ দিয়ে গুণ' },
        body: {
          en: '4 bits = nibble, 8 bits = byte; then KB → MB → GB → TB, each **1024** times the previous (NCERT). In the SI system kilo = 1000, so use 1024 only for computer memory.',
          bn: '৪ বিট = নিবল, ৮ বিট = বাইট; তারপর KB → MB → GB → TB, প্রতিটি আগেরটির **১০২৪** গুণ (NCERT)। SI পদ্ধতিতে কিলো = ১০০০, তাই ১০২৪ শুধু কম্পিউটার মেমরির ক্ষেত্রে।',
        },
      },
      {
        title: { en: 'Address sizes: 32 – 48 – 128', bn: 'ঠিকানার আকার: ৩২ – ৪৮ – ১২৮' },
        body: {
          en: 'IPv4 **32**, MAC **48**, IPv6 **128** bits: the order of the sizes matches the order you learn them in.',
          bn: 'IPv4 **৩২**, MAC **৪৮**, IPv6 **১২৮** বিট: যে ক্রমে শেখো সেই ক্রমেই আকার বাড়ে।',
        },
      },
      {
        title: { en: 'Function keys in Word and PowerPoint', bn: 'ওয়ার্ড ও পাওয়ারপয়েন্টের ফাংশন কী' },
        body: {
          en: 'Word (Windows): **F7** spelling and grammar (Editor), **F12** Save As, **Ctrl+Z** undo, **Ctrl+Y** redo. PowerPoint: **F5** starts the show from the beginning, **Shift+F5** from the current slide.',
          bn: 'ওয়ার্ড (উইন্ডোজ): **F7** বানান ও ব্যাকরণ (Editor), **F12** Save As, **Ctrl+Z** আনডু, **Ctrl+Y** রিডু। পাওয়ারপয়েন্ট: **F5** শুরু থেকে স্লাইড শো, **Shift+F5** বর্তমান স্লাইড থেকে।',
        },
      },
    ],
    common_traps: [
      { en: '**Web ≠ Internet.** Tim Berners-Lee invented the **World Wide Web** (1990), a service that runs on the Internet; the Internet itself is older.', bn: '**ওয়েব ≠ ইন্টারনেট।** টিম বার্নার্স-লি **ওয়ার্ল্ড ওয়াইড ওয়েব** (১৯৯০) উদ্ভাবন করেন, যা ইন্টারনেটে চলা একটি পরিষেবা; ইন্টারনেট নিজে আরও পুরনো।' },
      { en: '**Compiler vs interpreter.** Only the **interpreter** is needed every time the program runs; compiled code runs without the compiler.', bn: '**কম্পাইলার বনাম ইন্টারপ্রেটার।** প্রোগ্রাম চালানোর প্রতিবার কেবল **ইন্টারপ্রেটার** লাগে; কম্পাইল করা কোড কম্পাইলার ছাড়াই চলে।' },
      { en: '**Worm vs Trojan.** A **worm** copies itself across a network; a **Trojan** does not copy itself, it tricks you into running it.', bn: '**ওয়ার্ম বনাম ট্রোজান।** **ওয়ার্ম** নিজেকে নেটওয়ার্ক জুড়ে কপি করে; **ট্রোজান** নিজে কপি হয় না, তোমাকে ঠকিয়ে চালু করায়।' },
    ],
  },
  {
    subject: 'gs',
    topic: 'environment',
    title: { en: 'Environment & Ecology', bn: 'পরিবেশ ও বাস্তুবিদ্যা', hi: 'पर्यावरण और पारिस्थितिकी' },
    overview: {
      en: 'Environment questions fall into three groups: **ecology concepts** (energy flow, food chains, ecological pyramids), **biodiversity and its conservation** (hotspots, in situ and ex situ methods, Project Tiger) and **international conventions** (which treaty, which year, which subject). In WBPSC, environment is not a separate syllabus heading but is asked under general knowledge. Learn concepts from NCERT Biology, and learn each convention as a set of three: subject, year and place. Avoid counts that change (number of tiger reserves, Ramsar sites) unless you check the latest official figure.',
      bn: 'পরিবেশের প্রশ্ন তিন ভাগে আসে: **বাস্তুবিদ্যার ধারণা** (শক্তিপ্রবাহ, খাদ্যশৃঙ্খল, বাস্তুতান্ত্রিক পিরামিড), **জীববৈচিত্র্য ও তার সংরক্ষণ** (হটস্পট, ইন সিটু ও এক্স সিটু পদ্ধতি, প্রজেক্ট টাইগার) এবং **আন্তর্জাতিক চুক্তি** (কোন চুক্তি, কোন সাল, কোন বিষয়)। WBPSC-তে পরিবেশ আলাদা সিলেবাস শিরোনাম নয়, সাধারণ জ্ঞানের মধ্যে আসে। ধারণাগুলি NCERT জীববিদ্যা থেকে শেখো, আর প্রতিটি চুক্তি তিনটি জিনিস মিলিয়ে শেখো: বিষয়, সাল ও স্থান। যে সংখ্যা বদলায় (ব্যাঘ্র প্রকল্প বা রামসার স্থানের সংখ্যা) তা সর্বশেষ সরকারি তথ্য না দেখে মুখস্থ কোরো না।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'Energy flow in an ecosystem', bn: 'বাস্তুতন্ত্রে শক্তিপ্রবাহ' },
        body: {
          en: '- **10 per cent law**: only about 10% of the energy passes to the next trophic level\n- So food chains are short: few trophic levels\n- **Pyramid of energy**: always upright (energy lost as heat at each step)\n- **Pyramids of number and biomass**: can be inverted (biomass in the sea is generally inverted, per NCERT)',
          bn: '- **১০ শতাংশ সূত্র**: পরের খাদ্যস্তরে মাত্র প্রায় ১০% শক্তি যায়\n- তাই খাদ্যশৃঙ্খল ছোট: খাদ্যস্তর কম\n- **শক্তির পিরামিড**: সবসময় সোজা (প্রতি ধাপে শক্তি তাপ হিসেবে হারায়)\n- **সংখ্যা ও জৈবভরের পিরামিড**: উল্টো হতে পারে (NCERT অনুযায়ী সমুদ্রে জৈবভরের পিরামিড সাধারণত উল্টো)',
        },
      },
      {
        title: { en: 'Conservation: in situ vs ex situ', bn: 'সংরক্ষণ: ইন সিটু বনাম এক্স সিটু' },
        body: {
          en: '- **In situ** (natural habitat): biosphere reserves, national parks, wildlife sanctuaries, **sacred groves** (e.g. Khasi and Jaintia Hills of Meghalaya, Aravalli Hills of Rajasthan, Western Ghats, Bastar)\n- **Ex situ** (off-site): zoological parks, botanical gardens\n- **Hotspots covering India** (NCERT): Western Ghats and Sri Lanka, Indo-Burma, Himalaya\n- **Project Tiger**: launched **1973**',
          bn: '- **ইন সিটু** (প্রাকৃতিক বাসস্থান): বায়োস্ফিয়ার রিজার্ভ, জাতীয় উদ্যান, বন্যপ্রাণী অভয়ারণ্য, **পবিত্র কুঞ্জবন** (যেমন মেঘালয়ের খাসি ও জয়ন্তিয়া পাহাড়, রাজস্থানের আরাবল্লি পাহাড়, পশ্চিমঘাট, বস্তার)\n- **এক্স সিটু** (বাসস্থানের বাইরে): চিড়িয়াখানা, উদ্ভিদ উদ্যান\n- **ভারতের হটস্পট** (NCERT): পশ্চিমঘাট ও শ্রীলঙ্কা, ইন্দো-বার্মা, হিমালয়\n- **প্রজেক্ট টাইগার**: শুরু **১৯৭৩**',
        },
      },
      {
        title: { en: 'Conventions in time order', bn: 'সময়ের ক্রমে আন্তর্জাতিক চুক্তি' },
        body: {
          en: '- **1979** Bonn: migratory species (CMS)\n- **1985** Vienna Convention: ozone layer (framework)\n- **1987** Montreal Protocol: ozone-depleting substances (in force 1989)\n- **1989** Basel: hazardous wastes across borders (adopted; in force 1992)\n- **1992** Rio: Convention on Biological Diversity\n- **2001** Stockholm: persistent organic pollutants (adopted; in force 2004)\n- **2015** Paris Agreement (COP21): keep warming well below 2 °C, aim for 1.5 °C',
          bn: '- **১৯৭৯** বন: পরিযায়ী প্রাণী (CMS)\n- **১৯৮৫** ভিয়েনা কনভেনশন: ওজোন স্তর (কাঠামো চুক্তি)\n- **১৯৮৭** মন্ট্রিল প্রোটোকল: ওজোন ক্ষয়কারী পদার্থ (কার্যকর ১৯৮৯)\n- **১৯৮৯** বাসেল: সীমান্ত পেরোনো বিপজ্জনক বর্জ্য (গৃহীত; কার্যকর ১৯৯২)\n- **১৯৯২** রিও: জৈব বৈচিত্র্য কনভেনশন\n- **২০০১** স্টকহোম: স্থায়ী জৈব দূষক (গৃহীত; কার্যকর ২০০৪)\n- **২০১৫** প্যারিস চুক্তি (COP21): উষ্ণতা বৃদ্ধি ২ °C-এর অনেক নিচে রাখা, লক্ষ্য ১.৫ °C',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Ozone pair: Vienna then Montreal', bn: 'ওজোন জুটি: আগে ভিয়েনা, পরে মন্ট্রিল' },
        body: { en: 'Vienna (1985) set the framework; Montreal (1987) set the phase-out. "V before M", as in the alphabet.', bn: 'ভিয়েনা (১৯৮৫) কাঠামো তৈরি করে; মন্ট্রিল (১৯৮৭) ধাপে ধাপে বন্ধের পরিকল্পনা দেয়। বর্ণমালার মতো, M-এর আগে V।' },
      },
      {
        title: { en: 'Match the city to the problem', bn: 'শহরকে সমস্যার সঙ্গে মেলাও' },
        body: { en: '**B**asel = **b**ad wastes crossing borders; **S**tockholm = **s**ticky (persistent) organic pollutants; **Bonn** = birds and animals on the move (migratory species).', bn: '**বাসেল** = সীমান্ত পেরোনো বিপজ্জনক বর্জ্য; **স্টকহোম** = স্থায়ী জৈব দূষক; **বন** = এক জায়গা থেকে আরেক জায়গায় যাওয়া পাখি ও প্রাণী (পরিযায়ী প্রজাতি)।' },
      },
      {
        title: { en: 'Pyramids: only energy is never upside down', bn: 'পিরামিড: শুধু শক্তির পিরামিড কখনও উল্টো নয়' },
        body: { en: 'If an option says a pyramid of energy is inverted, it is wrong. Number and biomass pyramids can be inverted.', bn: 'কোনো বিকল্পে শক্তির পিরামিড উল্টো বলা থাকলে সেটি ভুল। সংখ্যা ও জৈবভরের পিরামিড উল্টো হতে পারে।' },
      },
    ],
    common_traps: [
      { en: '**Adoption vs entry into force.** Basel was adopted in 1989 but came into force in 1992; Stockholm was adopted in 2001 and came into force in 2004. Read which one the question asks.', bn: '**গ্রহণ বনাম কার্যকর হওয়া।** বাসেল ১৯৮৯-এ গৃহীত হলেও কার্যকর হয় ১৯৯২-এ; স্টকহোম ২০০১-এ গৃহীত, কার্যকর ২০০৪-এ। প্রশ্ন কোনটি চাইছে পড়ে নাও।' },
      { en: '**Montreal is about the ozone layer, not greenhouse gases.** Climate change is handled by the Paris Agreement.', bn: '**মন্ট্রিল ওজোন স্তর নিয়ে, গ্রিনহাউস গ্যাস নিয়ে নয়।** জলবায়ু পরিবর্তন নিয়ে প্যারিস চুক্তি।' },
      { en: '**A zoo or botanical garden is ex situ,** even when it helps an endangered species; national parks and sacred groves are in situ.', bn: '**চিড়িয়াখানা বা উদ্ভিদ উদ্যান এক্স সিটু,** বিপন্ন প্রজাতিকে সাহায্য করলেও; জাতীয় উদ্যান ও পবিত্র কুঞ্জবন ইন সিটু।' },
    ],
  },
  {
    "subject": "gs",
    "topic": "static_gk",
    "title": {
      "en": "Static GK",
      "bn": "স্থির সাধারণ জ্ঞান",
      "hi": "स्थैतिक सामान्य ज्ञान"
    },
    "overview": {
      "en": "Static GK collects facts that do not change from year to year: **books and authors**, **awards** (Nobel, Jnanpith), **important days**, **international organisations** (founding year, headquarters) and **census figures** (always with their reference year). It is asked as direct one-line questions, so accuracy matters more than reasoning. Learn each item as a pair (person → award and year, day → date) and revise in short daily sets. For statistics, always note which census the figure comes from.",
      "bn": "স্থির সাধারণ জ্ঞানে থাকে এমন তথ্য যা বছর বছর বদলায় না: **বই ও লেখক**, **পুরস্কার** (নোবেল, জ্ঞানপীঠ), **গুরুত্বপূর্ণ দিবস**, **আন্তর্জাতিক সংস্থা** (প্রতিষ্ঠার সাল, সদর দপ্তর) এবং **জনগণনার তথ্য** (সবসময় কোন বছরের তথ্য তা সহ)। প্রশ্ন সাধারণত সরাসরি এক লাইনের হয়, তাই যুক্তির চেয়ে নির্ভুলতা বেশি জরুরি। প্রতিটি জিনিস জোড়ায় শেখো (মানুষ → পুরস্কার ও সাল, দিবস → তারিখ) এবং রোজ অল্প অল্প করে রিভিশন দাও। পরিসংখ্যানের ক্ষেত্রে সবসময় দেখে নাও তথ্যটি কোন জনগণনার।"
    },
    "formulas": [],
    "derivation_rules": [
      {
        "title": {
          "en": "Nobel laureates linked to India and Bengal",
          "bn": "ভারত ও বাংলার সঙ্গে যুক্ত নোবেলজয়ী"
        },
        "body": {
          "en": "- **1913** Rabindranath Tagore: Literature\n- **1930** C.V. Raman: Physics (scattering of light; Calcutta University)\n- **1998** Amartya Sen: Economic Sciences (welfare economics; born at Santiniketan)\n- **2019** Abhijit Banerjee: Economic Sciences, shared (alleviating global poverty)",
          "bn": "- **১৯১৩** রবীন্দ্রনাথ ঠাকুর: সাহিত্য\n- **১৯৩০** সি. ভি. রমন: পদার্থবিদ্যা (আলোর বিক্ষেপণ; কলকাতা বিশ্ববিদ্যালয়)\n- **১৯৯৮** অমর্ত্য সেন: অর্থনীতি (কল্যাণমূলক অর্থনীতি; জন্ম শান্তিনিকেতনে)\n- **২০১৯** অভিজিৎ বন্দ্যোপাধ্যায়: অর্থনীতি, যৌথভাবে (বিশ্বের দারিদ্র্য দূরীকরণ)"
        }
      },
      {
        "title": {
          "en": "International organisations",
          "bn": "আন্তর্জাতিক সংস্থা"
        },
        "body": {
          "en": "- **United Nations**: came into existence on **24 October 1945**\n- **UNESCO**: Constitution adopted in **London, 16 November 1945**\n- **WHO**: founded **1948**, headquarters **Geneva**\n- **WTO**: established **1 January 1995**, located in **Geneva** (created by the Uruguay Round, 1986–94)",
          "bn": "- **রাষ্ট্রসংঘ**: **২৪ অক্টোবর ১৯৪৫**-এ গঠিত\n- **ইউনেস্কো**: সংবিধান গৃহীত **লন্ডনে, ১৬ নভেম্বর ১৯৪৫**\n- **বিশ্ব স্বাস্থ্য সংস্থা (WHO)**: প্রতিষ্ঠা **১৯৪৮**, সদর দপ্তর **জেনেভা**\n- **বিশ্ব বাণিজ্য সংস্থা (WTO)**: প্রতিষ্ঠা **১ জানুয়ারি ১৯৯৫**, অবস্থান **জেনেভা** (উরুগুয়ে রাউন্ড, ১৯৮৬–৯৪-এর ফল)"
        }
      },
      {
        "title": {
          "en": "Census 2011 at a glance",
          "bn": "এক নজরে ২০১১-র জনগণনা"
        },
        "body": {
          "en": "- India: **1,210,854,977** people; sex ratio **943** females per 1000 males\n- Most populous states: **Uttar Pradesh**, Maharashtra, Bihar, **West Bengal (4th, 91,276,115)**\n- Highest sex ratio among states: **Kerala (1084)**; West Bengal **950**",
          "bn": "- ভারত: **১,২১,০৮,৫৪,৯৭৭** জন; লিঙ্গ অনুপাত প্রতি ১০০০ পুরুষে **৯৪৩** জন মহিলা\n- সবচেয়ে জনবহুল রাজ্য: **উত্তরপ্রদেশ**, মহারাষ্ট্র, বিহার, **পশ্চিমবঙ্গ (চতুর্থ, ৯,১২,৭৬,১১৫)**\n- রাজ্যগুলির মধ্যে সর্বোচ্চ লিঙ্গ অনুপাত: **কেরল (১০৮৪)**; পশ্চিমবঙ্গ **৯৫০**"
        }
      }
    ],
    "speed_tricks": [
      {
        "title": {
          "en": "Two Geneva organisations",
          "bn": "জেনেভার দুই সংস্থা"
        },
        "body": {
          "en": "WHO (1948) and WTO (1995) both sit in **Geneva**. The UN came first (1945).",
          "bn": "WHO (১৯৪৮) ও WTO (১৯৯৫) দুটিই **জেনেভায়**। রাষ্ট্রসংঘ সবার আগে (১৯৪৫)।"
        }
      },
      {
        "title": {
          "en": "June pair: 5 and 21",
          "bn": "জুনের জুটি: ৫ ও ২১"
        },
        "body": {
          "en": "**5 June** Environment, **21 June** Yoga.",
          "bn": "**৫ জুন** পরিবেশ, **২১ জুন** যোগ।"
        }
      },
      {
        "title": {
          "en": "Bengal's Nobel ladder",
          "bn": "বাংলার নোবেল সিঁড়ি"
        },
        "body": {
          "en": "Literature (1913) → Physics (1930) → Economics (1998) → Economics (2019).",
          "bn": "সাহিত্য (১৯১৩) → পদার্থবিদ্যা (১৯৩০) → অর্থনীতি (১৯৯৮) → অর্থনীতি (২০১৯)।"
        }
      }
    ],
    "common_traps": [
      {
        "en": "**Census year.** Population and sex-ratio figures here are from **Census 2011**; do not mix them with estimates from other years.",
        "bn": "**জনগণনার বছর।** এখানের জনসংখ্যা ও লিঙ্গ অনুপাত **২০১১-র জনগণনার**; অন্য বছরের আনুমানিক হিসাবের সঙ্গে মিশিও না।"
      },
      {
        "en": "**Abhijit Banerjee shared the 2019 prize** (one-third); Amartya Sen won 1998 alone. Read whether the question asks year or field.",
        "bn": "**অভিজিৎ বন্দ্যোপাধ্যায় ২০১৯-এর পুরস্কার যৌথভাবে পান** (এক-তৃতীয়াংশ); অমর্ত্য সেন ১৯৯৮-এ একাই পান। প্রশ্ন সাল চাইছে না বিষয়, পড়ে নাও।"
      },
      {
        "en": "**Founding vs entry.** The UN Charter was signed earlier, but the UN came into existence on **24 October 1945**, which is why UN Day falls then.",
        "bn": "**স্বাক্ষর বনাম গঠন।** রাষ্ট্রসংঘ সনদ আগে স্বাক্ষরিত হলেও রাষ্ট্রসংঘ গঠিত হয় **২৪ অক্টোবর ১৯৪৫**-এ, তাই রাষ্ট্রসংঘ দিবস সেদিন।"
      }
    ]
  },
  {
    "subject": "gs",
    "topic": "indian_gk",
    "title": {
      "en": "Indian GK",
      "bn": "ভারত সাধারণ জ্ঞান",
      "hi": "भारत सामान्य ज्ञान"
    },
    "overview": {
      "en": "Indian GK covers **important firsts**, **national symbols**, **states and capitals** and **institutions and their headquarters**. Questions are short and factual, but the trap is usually in the wording: *first President* vs *first Vice-President*, *foundation stone* vs *commercial service*, *power station* vs *research reactor*. For every \"first\", learn which stage the answer refers to. Counts that change, such as the number of states and Union Territories, must be checked against the latest official source.",
      "bn": "ভারত সাধারণ জ্ঞানে থাকে **গুরুত্বপূর্ণ প্রথম**, **জাতীয় প্রতীক**, **রাজ্য ও রাজধানী** এবং **প্রতিষ্ঠান ও তাদের সদর দপ্তর**। প্রশ্ন ছোট ও তথ্যভিত্তিক, কিন্তু ফাঁদ থাকে শব্দে: *প্রথম রাষ্ট্রপতি* বনাম *প্রথম উপরাষ্ট্রপতি*, *ভিত্তিপ্রস্তর* বনাম *বাণিজ্যিক পরিষেবা*, *বিদ্যুৎকেন্দ্র* বনাম *গবেষণা চুল্লি*। প্রতিটি \"প্রথম\"-এর ক্ষেত্রে উত্তরটি কোন পর্যায়ের তা শেখো। যে সংখ্যা বদলায়, যেমন রাজ্য ও কেন্দ্রশাসিত অঞ্চলের সংখ্যা, তা সর্বশেষ সরকারি উৎসের সঙ্গে মিলিয়ে নাও।"
    },
    "formulas": [],
    "derivation_rules": [
      {
        "title": {
          "en": "First holders of high offices",
          "bn": "সর্বোচ্চ পদে প্রথম যাঁরা"
        },
        "body": {
          "en": "- **President**: Dr Rajendra Prasad\n- **Vice-President**: Dr Sarvepalli Radhakrishnan (13 May 1952 – 12 May 1962)\n- **Prime Minister**: Jawaharlal Nehru (15 August 1947 – 27 May 1964)\n- **Woman Prime Minister**: Indira Gandhi (first term from 24 January 1966)\n- **Woman President**: Pratibha Devisingh Patil (elected July 2007)",
          "bn": "- **রাষ্ট্রপতি**: ড. রাজেন্দ্র প্রসাদ\n- **উপরাষ্ট্রপতি**: ড. সর্বপল্লী রাধাকৃষ্ণন (১৩ মে ১৯৫২ – ১২ মে ১৯৬২)\n- **প্রধানমন্ত্রী**: জওহরলাল নেহরু (১৫ আগস্ট ১৯৪৭ – ২৭ মে ১৯৬৪)\n- **মহিলা প্রধানমন্ত্রী**: ইন্দিরা গান্ধী (প্রথম কার্যকাল ২৪ জানুয়ারি ১৯৬৬ থেকে)\n- **মহিলা রাষ্ট্রপতি**: প্রতিভা দেবীসিং পাটিল (নির্বাচিত জুলাই ২০০৭)"
        }
      },
      {
        "title": {
          "en": "Firsts with more than one date",
          "bn": "একাধিক তারিখ আছে এমন \"প্রথম\""
        },
        "body": {
          "en": "- **Kolkata Metro** (India's first): sanctioned 1 June 1972 → foundation stone 29 December 1972 → first commercial service **24 October 1984** (Esplanade to Netaji Bhavan)\n- **Tarapur** (NPCIL's earliest nuclear power plant): commercial operation **28 October 1969**; **Apsara** at Trombay is a BARC research reactor\n- **Rakesh Sharma**: first Indian in space, **1984**, aboard the Soviet Soyuz",
          "bn": "- **কলকাতা মেট্রো** (ভারতের প্রথম): অনুমোদন ১ জুন ১৯৭২ → ভিত্তিপ্রস্তর ২৯ ডিসেম্বর ১৯৭২ → প্রথম বাণিজ্যিক পরিষেবা **২৪ অক্টোবর ১৯৮৪** (এসপ্ল্যানেড থেকে নেতাজি ভবন)\n- **তারাপুর** (NPCIL-এর সবচেয়ে পুরনো পারমাণবিক বিদ্যুৎকেন্দ্র): বাণিজ্যিক উৎপাদন **২৮ অক্টোবর ১৯৬৯**; ট্রম্বের **অপ্সরা** BARC-এর গবেষণা চুল্লি\n- **রাকেশ শর্মা**: মহাকাশে প্রথম ভারতীয়, **১৯৮৪**, সোভিয়েত সয়ুজ-এ"
        }
      },
      {
        "title": {
          "en": "Institutions and national identity",
          "bn": "প্রতিষ্ঠান ও জাতীয় পরিচয়"
        },
        "body": {
          "en": "- **RBI**: established 1 April 1935; Central Office in Kolkata, moved permanently to **Mumbai in 1937**\n- **ISRO / Department of Space**: Antariksh Bhavan, **Bengaluru**; ISRO set up August 1969\n- **National Aquatic Animal**: Gangetic river dolphin (decided 5 October 2009)\n- **National River**: the Ganga\n- **Kolkata**: capital of West Bengal, once capital of British India",
          "bn": "- **আরবিআই**: প্রতিষ্ঠা ১ এপ্রিল ১৯৩৫; কেন্দ্রীয় কার্যালয় কলকাতায়, **১৯৩৭-এ মুম্বাইয়ে** স্থায়ীভাবে স্থানান্তর\n- **ইসরো / মহাকাশ বিভাগ**: অন্তরীক্ষ ভবন, **বেঙ্গালুরু**; ইসরো প্রতিষ্ঠা আগস্ট ১৯৬৯\n- **জাতীয় জলজ প্রাণী**: গাঙ্গেয় শুশুক (সিদ্ধান্ত ৫ অক্টোবর ২০০৯)\n- **জাতীয় নদী**: গঙ্গা\n- **কলকাতা**: পশ্চিমবঙ্গের রাজধানী, একসময় ব্রিটিশ ভারতের রাজধানী"
        }
      }
    ],
    "speed_tricks": [
      {
        "title": {
          "en": "P–R–N: the three first office-holders",
          "bn": "প্রথম তিন পদাধিকারী"
        },
        "body": {
          "en": "President **P**rasad, Vice-President **R**adhakrishnan, Prime Minister **N**ehru.",
          "bn": "রাষ্ট্রপতি প্রসাদ, উপরাষ্ট্রপতি রাধাকৃষ্ণন, প্রধানমন্ত্রী নেহরু।"
        }
      },
      {
        "title": {
          "en": "Metro: 72 and 84",
          "bn": "মেট্রো: ৭২ ও ৮৪"
        },
        "body": {
          "en": "Kolkata Metro: work began in **'72**, trains ran in **'84**. If the question says \"commercial service\", answer 1984.",
          "bn": "কলকাতা মেট্রো: কাজ শুরু **'৭২**-এ, ট্রেন চলে **'৮৪**-তে। প্রশ্নে \"বাণিজ্যিক পরিষেবা\" বললে উত্তর ১৯৮৪।"
        }
      },
      {
        "title": {
          "en": "RBI moved once",
          "bn": "আরবিআই একবারই সরেছে"
        },
        "body": {
          "en": "Kolkata (1935) → Mumbai (1937). \"Headquarters today\" is Mumbai; \"first Central Office\" is Kolkata.",
          "bn": "কলকাতা (১৯৩৫) → মুম্বাই (১৯৩৭)। \"এখনকার সদর দপ্তর\" মুম্বাই; \"প্রথম কেন্দ্রীয় কার্যালয়\" কলকাতা।"
        }
      }
    ],
    "common_traps": [
      {
        "en": "**Radhakrishnan was the first Vice-President** and later President, never Prime Minister.",
        "bn": "**রাধাকৃষ্ণন প্রথম উপরাষ্ট্রপতি** ও পরে রাষ্ট্রপতি, কখনও প্রধানমন্ত্রী নন।"
      },
      {
        "en": "**Apsara is not a power station.** It is a BARC research reactor; Tarapur is the earliest nuclear power plant.",
        "bn": "**অপ্সরা বিদ্যুৎকেন্দ্র নয়।** এটি BARC-এর গবেষণা চুল্লি; তারাপুর সবচেয়ে পুরনো পারমাণবিক বিদ্যুৎকেন্দ্র।"
      },
      {
        "en": "**Foundation stone ≠ opening.** Kolkata Metro's foundation stone was laid in 1972, but service began in 1984.",
        "bn": "**ভিত্তিপ্রস্তর ≠ চালু হওয়া।** কলকাতা মেট্রোর ভিত্তিপ্রস্তর ১৯৭২-এ, কিন্তু পরিষেবা শুরু ১৯৮৪-তে।"
      }
    ]
  },
  {
    "subject": "gs",
    "topic": "art_culture",
    "title": {
      "en": "Art & Culture",
      "bn": "শিল্প ও সংস্কৃতি",
      "hi": "कला और संस्कृति"
    },
    "overview": {
      "en": "Art & Culture questions ask about **monuments** (builder, dynasty, state), **UNESCO World Heritage and Intangible Heritage** (which year), **dance, music and theatre traditions**, and **painting and crafts** (which region). Most questions are direct matches, so learn each item as a set: monument → builder → state → UNESCO year. Inscription years are asked often; group them by year rather than learning them one by one. When a source gives a \"masterpiece\" proclamation and a later inscription, check which one the question means.",
      "bn": "শিল্প ও সংস্কৃতির প্রশ্নে আসে **স্মৃতিসৌধ** (নির্মাতা, রাজবংশ, রাজ্য), **ইউনেস্কো বিশ্ব ঐতিহ্য ও অধরা ঐতিহ্য** (কোন সাল), **নৃত্য, সংগীত ও নাট্য ঐতিহ্য**, এবং **চিত্রকলা ও কারুশিল্প** (কোন অঞ্চল)। বেশিরভাগ প্রশ্ন সরাসরি মেলানোর, তাই প্রতিটি বিষয় একসঙ্গে শেখো: স্মৃতিসৌধ → নির্মাতা → রাজ্য → ইউনেস্কো সাল। তালিকাভুক্তির সাল প্রায়ই আসে; একটা একটা না শিখে সাল ধরে ভাগ করে শেখো। কোনো সূত্রে আগে \"মাস্টারপিস\" ঘোষণা আর পরে তালিকাভুক্তি থাকলে, প্রশ্ন কোনটি চাইছে দেখে নাও।"
    },
    "formulas": [],
    "derivation_rules": [
      {
        "title": {
          "en": "Monuments: builder and place",
          "bn": "স্মৃতিসৌধ: নির্মাতা ও স্থান"
        },
        "body": {
          "en": "- **Qutb Minar** (Delhi): Aibak laid the foundation (AD 1199) and raised the first storey; **Iltutmish added three more storeys**\n- **Khajuraho** (Madhya Pradesh): **Chandella** rulers; Lakshmana temple by Yasovarman (AD 954)\n- **Hampi** (Karnataka): seat of **Vijayanagara**, on the **Tungabhadra**; built AD 1336–1570\n- **Sun Temple, Konarak** (Odisha): 13th century, a solar chariot with 12 pairs of wheels and 7 horses",
          "bn": "- **কুতুব মিনার** (দিল্লি): আইবক ভিত্তি স্থাপন করেন (১১৯৯ খ্রি.) ও প্রথম তলা তোলেন; **ইলতুৎমিশ আরও তিনটি তলা যোগ করেন**\n- **খাজুরাহো** (মধ্যপ্রদেশ): **চান্দেল্ল** শাসক; লক্ষ্মণ মন্দির যশোবর্মণের (৯৫৪ খ্রি.)\n- **হাম্পি** (কর্ণাটক): **বিজয়নগরের** কেন্দ্র, **তুঙ্গভদ্রার** তীরে; নির্মাণ ১৩৩৬–১৫৭০ খ্রি.\n- **কোনারকের সূর্য মন্দির** (ওড়িশা): ত্রয়োদশ শতক, ১২ জোড়া চাকা ও ৭টি ঘোড়ার সূর্যরথ"
        }
      },
      {
        "title": {
          "en": "UNESCO World Heritage years (selected)",
          "bn": "ইউনেস্কো বিশ্ব ঐতিহ্যের সাল (নির্বাচিত)"
        },
        "body": {
          "en": "- **1983**: Agra Fort, Ajanta Caves, Ellora Caves, Taj Mahal\n- **1984**: Sun Temple, Konarak\n- **1986**: Hampi, Khajuraho\n- **1993**: Humayun's Tomb, Qutb Minar\n- **Mountain Railways of India**: Darjeeling **1999** → Nilgiri **2005** → Kalka–Shimla **2008**",
          "bn": "- **১৯৮৩**: আগ্রা দুর্গ, অজন্তা গুহা, ইলোরা গুহা, তাজমহল\n- **১৯৮৪**: কোনারকের সূর্য মন্দির\n- **১৯৮৬**: হাম্পি, খাজুরাহো\n- **১৯৯৩**: হুমায়ুনের সমাধি, কুতুব মিনার\n- **ভারতের পার্বত্য রেলপথ**: দার্জিলিং **১৯৯৯** → নীলগিরি **২০০৫** → কালকা–সিমলা **২০০৮**"
        }
      },
      {
        "title": {
          "en": "Living traditions",
          "bn": "জীবন্ত ঐতিহ্য"
        },
        "body": {
          "en": "- **Kutiyattam** (Sanskrit theatre of Kerala): UNESCO Masterpiece 2001, Representative List 2008\n- **Yoga** inscribed 2016; **Kumbh Mela** 2017\n- **Kalbelia**: Rajasthan; **Mudiyettu**: Kerala; **Ramman**: Garhwal Himalayas; **Chhau**: eastern India\n- **Madhubani** painting: Mithila region of Bihar\n- Sangeet Natak Akademi units: Jawaharlal Nehru Manipur Dance Academy (Imphal), Kathak Kendra (Delhi); centres include Sattriya Kendra (Guwahati) and Chhau Kendra (Chandankiyari)",
          "bn": "- **কুটিয়াট্টম** (কেরলের সংস্কৃত নাট্য): ইউনেস্কো মাস্টারপিস ২০০১, প্রতিনিধি তালিকা ২০০৮\n- **যোগ** তালিকাভুক্ত ২০১৬; **কুম্ভমেলা** ২০১৭\n- **কালবেলিয়া**: রাজস্থান; **মুদিয়েট্টু**: কেরল; **রামমান**: গাড়োয়াল হিমালয়; **ছৌ**: পূর্ব ভারত\n- **মধুবনী** চিত্রকলা: বিহারের মিথিলা অঞ্চল\n- সংগীত নাটক আকাদেমির ইউনিট: জওহরলাল নেহরু মণিপুর নৃত্য আকাদেমি (ইম্ফল), কত্থক কেন্দ্র (দিল্লি); কেন্দ্রগুলির মধ্যে সত্রিয়া কেন্দ্র (গুয়াহাটি) ও ছৌ কেন্দ্র (চান্দানকিয়ারি)"
        }
      }
    ],
    "speed_tricks": [
      {
        "title": {
          "en": "1983: the \"big four\"",
          "bn": "১৯৮৩: \"বড় চার\""
        },
        "body": {
          "en": "Four sites were inscribed together in 1983: **Agra Fort, Ajanta, Ellora, Taj Mahal**.",
          "bn": "১৯৮৩-তে একসঙ্গে চারটি: **আগ্রা দুর্গ, অজন্তা, ইলোরা, তাজমহল**।"
        }
      },
      {
        "title": {
          "en": "1986: two temple towns",
          "bn": "১৯৮৬: দুই মন্দির-নগরী"
        },
        "body": {
          "en": "**Hampi** and **Khajuraho** share 1986; Konarak came two years earlier (1984).",
          "bn": "**হাম্পি** ও **খাজুরাহো** দুটিই ১৯৮৬; কোনারক তার দুই বছর আগে (১৯৮৪)।"
        }
      },
      {
        "title": {
          "en": "Mountain railways in order",
          "bn": "পার্বত্য রেল: ক্রম অনুযায়ী"
        },
        "body": {
          "en": "Darjeeling (1999) → Nilgiri (2005) → Kalka–Shimla (2008).",
          "bn": "দার্জিলিং (১৯৯৯) → নীলগিরি (২০০৫) → কালকা–সিমলা (২০০৮)।"
        }
      }
    ],
    "common_traps": [
      {
        "en": "**Qutb Minar was begun by Aibak,** and Iltutmish added three storeys; \"built entirely by Iltutmish\" is wrong.",
        "bn": "**কুতুব মিনার শুরু করেন আইবক,** ইলতুৎমিশ তিনটি তলা যোগ করেন; \"পুরোটা ইলতুৎমিশের তৈরি\" ভুল।"
      },
      {
        "en": "**Proclamation vs inscription.** Kutiyattam was proclaimed a Masterpiece in 2001 but inscribed on the Representative List in 2008.",
        "bn": "**ঘোষণা বনাম তালিকাভুক্তি।** কুটিয়াট্টম ২০০১-এ মাস্টারপিস ঘোষিত হলেও প্রতিনিধি তালিকায় ওঠে ২০০৮-এ।"
      },
      {
        "en": "**Darjeeling is only the first mountain railway,** not the whole listing: Nilgiri and Kalka–Shimla were added later.",
        "bn": "**দার্জিলিং কেবল প্রথম পার্বত্য রেলপথ,** পুরো তালিকা নয়: নীলগিরি ও কালকা–সিমলা পরে যোগ হয়।"
      }
    ]
  },
  {
    subject: 'gs',
    topic: 'important_days',
    title: { en: 'Important National & International Days', bn: 'গুরুত্বপূর্ণ জাতীয় ও আন্তর্জাতিক দিবস', hi: 'महत्वपूर्ण राष्ट्रीय और अंतर्राष्ट्रीय दिवस' },
    overview: {
      en: 'This chapter collects the **national and international days** that competitive exams ask about again and again, arranged **month by month** so that revision follows the calendar. Almost every question is one of four shapes: a direct date, a correctly (or incorrectly) matched pair, a match-the-following table, or the person behind the day. The winning method is to learn every date **with its reason attached** — an event, a birthday, a founding — because examiners build their wrong options by swapping the dates of two real days. Two distinctions carry the most marks: **adopted vs in force** for the Constitution (26 November 1949 vs 26 January 1950) and the **Indian vs UN observance** pairs (Teachers\' Day 5 September vs World Teachers\' Day 5 October; Children\'s Day 14 November vs World Children\'s Day 20 November).',
      bn: 'এই অধ্যায়ে আছে প্রতিযোগিতামূলক পরীক্ষায় বারবার আসা **জাতীয় ও আন্তর্জাতিক দিবস**, **মাস অনুযায়ী** সাজানো, যাতে রিভিশন ক্যালেন্ডার ধরে এগোয়। প্রায় প্রতিটি প্রশ্ন চারটি আকারের একটা: সরাসরি তারিখ, সঠিক (বা ভুল) মেলানো জোড়, মেলানোর ছক, অথবা দিবসের পেছনের মানুষ। জেতার উপায় হল প্রতিটি তারিখ **তার কারণসহ** শেখা — একটি ঘটনা, একটি জন্মদিন, একটি প্রতিষ্ঠা — কারণ পরীক্ষকেরা দুটি আসল দিবসের তারিখ বদলিয়ে ভুল বিকল্প বানান। সবচেয়ে বেশি নম্বর বহন করে দুটি পার্থক্য: সংবিধানের ক্ষেত্রে **গৃহীত বনাম কার্যকর** (২৬ নভেম্বর ১৯৪৯ বনাম ২৬ জানুয়ারি ১৯৫০) এবং **ভারতীয় বনাম রাষ্ট্রসংঘের পালন** জুটি (শিক্ষক দিবস ৫ সেপ্টেম্বর বনাম বিশ্ব শিক্ষক দিবস ৫ অক্টোবর; শিশু দিবস ১৪ নভেম্বর বনাম বিশ্ব শিশু দিবস ২০ নভেম্বর)।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'The January anchor chain', bn: 'জানুয়ারির মূল শৃঙ্খল' },
        body: {
          en: '- **9 January** Pravasi Bharatiya Divas: Gandhi returned from South Africa in 1915\n- **12 January** National Youth Day: Vivekananda\'s birthday\n- **25 January** National Voters\' Day: the Election Commission was founded in 1950\n- **26 January** Republic Day: the Constitution came into force in 1950\n- **30 January** Martyrs\' Day: Gandhi was assassinated in 1948',
          bn: '- **৯ জানুয়ারি** প্রবাসী ভারতীয় দিবস: ১৯১৫-তে গান্ধী দক্ষিণ আফ্রিকা থেকে ফেরেন\n- **১২ জানুয়ারি** জাতীয় যুব দিবস: বিবেকানন্দের জন্মদিন\n- **২৫ জানুয়ারি** জাতীয় ভোটার দিবস: ১৯৫০-তে নির্বাচন কমিশন গঠিত হয়\n- **২৬ জানুয়ারি** প্রজাতন্ত্র দিবস: ১৯৫০-তে সংবিধান কার্যকর হয়\n- **৩০ জানুয়ারি** শহীদ দিবস: ১৯৪৮-তে গান্ধীকে হত্যা করা হয়',
        },
      },
      {
        title: { en: 'Birthdays that became national days', bn: 'জন্মদিন থেকে জাতীয় দিবস' },
        body: {
          en: '- **28 February** is an event, not a birthday: the Raman Effect (1928) → National Science Day\n- **29 August** Major Dhyan Chand → National Sports Day\n- **5 September** Dr Radhakrishnan → Teachers\' Day (India)\n- **31 October** Sardar Patel → National Unity Day\n- **26 November** is an event, not a birthday: the Constitution was adopted (1949) → Constitution Day',
          bn: '- **২৮ ফেব্রুয়ারি** ঘটনা, জন্মদিন নয়: রামন প্রভাব (১৯২৮) → জাতীয় বিজ্ঞান দিবস\n- **২৯ আগস্ট** মেজর ধ্যানচাঁদ → জাতীয় ক্রীড়া দিবস\n- **৫ সেপ্টেম্বর** ড. রাধাকৃষ্ণন → শিক্ষক দিবস (ভারত)\n- **৩১ অক্টোবর** সর্দার পটেল → জাতীয় ঐক্য দিবস\n- **২৬ নভেম্বর** ঘটনা, জন্মদিন নয়: সংবিধান গৃহীত হয় (১৯৪৯) → সংবিধান দিবস',
        },
      },
      {
        title: { en: 'The December date chain', bn: 'ডিসেম্বরের তারিখ-শৃঙ্খল' },
        body: {
          en: '- **1 December** World AIDS Day; **4 December** Indian Navy Day (Operation Trident, 1971)\n- **10 December** Human Rights Day (UDHR adopted, 1948)\n- **16 December** Vijay Diwas (1971 victory)\n- **22 December** National Mathematics Day (Ramanujan) → **23 December** Kisan Diwas (Charan Singh) → **24 December** National Consumer Day → **25 December** Good Governance Day (Vajpayee)',
          bn: '- **১ ডিসেম্বর** বিশ্ব এইডস দিবস; **৪ ডিসেম্বর** ভারতীয় নৌসেনা দিবস (অপারেশন ট্রাইডেন্ট, ১৯৭১)\n- **১০ ডিসেম্বর** মানবাধিকার দিবস (মানবাধিকার ঘোষণাপত্র গৃহীত, ১৯৪৮)\n- **১৬ ডিসেম্বর** বিজয় দিবস (১৯৭১-এর জয়)\n- **২২ ডিসেম্বর** জাতীয় গণিত দিবস (রামানুজন) → **২৩ ডিসেম্বর** কিষান দিবস (চরণ সিং) → **২৪ ডিসেম্বর** জাতীয় ভোক্তা দিবস → **২৫ ডিসেম্বর** সুশাসন দিবস (বাজপেয়ী)',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'One day before Republic Day', bn: 'প্রজাতন্ত্র দিবসের একদিন আগে' },
        body: { en: 'The Election Commission was founded on **25 January 1950**, literally one day before the Republic — so Voters\' Day sits one day before Republic Day in the calendar, every year.', bn: 'নির্বাচন কমিশন গঠিত হয় **২৫ জানুয়ারি ১৯৫০**-তে, প্রজাতন্ত্রের ঠিক একদিন আগে — তাই ভোটার দিবস প্রতি বছর ক্যালেন্ডারে প্রজাতন্ত্র দিবসের ঠিক একদিন আগে বসে।' },
      },
      {
        title: { en: '28-2 or 29-8: science in winter, sports in the rains', bn: '২৮-২ না ২৯-৮: শীতে বিজ্ঞান, বর্ষায় খেলা' },
        body: { en: '**Science Day 28 February** comes in the cool season of the Raman Effect announcement; **Sports Day 29 August** comes in the monsoon, Dhyan Chand\'s birthday. If the month is February, the answer can never be Sports Day.', bn: '**বিজ্ঞান দিবস ২৮ ফেব্রুয়ারি** রামন প্রভাব ঘোষণার শীতের মরসুমে; **ক্রীড়া দিবস ২৯ আগস্ট** বর্ষায়, ধ্যানচাঁদের জন্মদিনে। মাস ফেব্রুয়ারি হলে উত্তর কখনোই ক্রীড়া দিবস হতে পারে না।' },
      },
      {
        title: { en: 'Indian day = Indian birthday', bn: 'ভারতীয় দিবস = ভারতীয় জন্মদিন' },
        body: { en: 'When an Indian and a UN observance share a theme, the Indian one is a great Indian\'s birthday: Teachers\' Day → Radhakrishnan (5 Sep), Children\'s Day → Nehru (14 Nov), Education Day → Azad (11 Nov). The UN one is a fixed General Assembly date.', bn: 'একই বিষয়ে ভারতীয় ও রাষ্ট্রসংঘের পালন থাকলে ভারতীয়টি কোনো মহান ভারতীয়ের জন্মদিন: শিক্ষক দিবস → রাধাকৃষ্ণন (৫ সেপ্টেম্বর), শিশু দিবস → নেহরু (১৪ নভেম্বর), শিক্ষা দিবস → আজাদ (১১ নভেম্বর)। রাষ্ট্রসংঘেরটি সাধারণ সভার নির্ধারিত তারিখ।' },
      },
    ],
    common_traps: [
      { en: '**Voters\' Day is not Republic Day.** National Voters\' Day is 25 January (Election Commission founded, 1950); Republic Day is 26 January (Constitution in force, 1950); Constitution Day is 26 November (Constitution adopted, 1949).', bn: '**ভোটার দিবস প্রজাতন্ত্র দিবস নয়।** জাতীয় ভোটার দিবস ২৫ জানুয়ারি (নির্বাচন কমিশন গঠিত, ১৯৫০); প্রজাতন্ত্র দিবস ২৬ জানুয়ারি (সংবিধান কার্যকর, ১৯৫০); সংবিধান দিবস ২৬ নভেম্বর (সংবিধান গৃহীত, ১৯৪৯)।' },
      { en: '**Science Day and Sports Day swap.** National Science Day is 28 February (Raman Effect); National Sports Day is 29 August (Dhyan Chand). Wrong options in pair questions almost always exchange these two.', bn: '**বিজ্ঞান দিবস ও ক্রীড়া দিবসের বদল।** জাতীয় বিজ্ঞান দিবস ২৮ ফেব্রুয়ারি (রামন প্রভাব); জাতীয় ক্রীড়া দিবস ২৯ আগস্ট (ধ্যানচাঁদ)। জোড়ের প্রশ্নে ভুল বিকল্প প্রায় সবসময় এই দুটিকে বদলিয়ে দেয়।' },
      { en: '**Two victory days.** Kargil Vijay Diwas is 26 July (1999); Vijay Diwas is 16 December (1971). The year in the stem decides which one is being asked.', bn: '**দুটি বিজয় দিবস।** কার্গিল বিজয় দিবস ২৬ জুলাই (১৯৯৯); বিজয় দিবস ১৬ ডিসেম্বর (১৯৭১)। প্রশ্নের সালই ঠিক করে কোনটি চাওয়া হচ্ছে।' },
    ],
  },
];
