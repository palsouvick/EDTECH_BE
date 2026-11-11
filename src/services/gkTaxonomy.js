'use strict';

/**
 * GK (General Knowledge / সাধারণ জ্ঞান) structure: the dashboard cards, which
 * question-bank chapters each card draws on, and the subcategories (subtopic
 * slugs) a fact or question can carry. Shared by the fact library, the Learn
 * dashboard, the validator and the admin console.
 *
 * Card codes are question-bank topic codes, except `economy`, which also covers
 * the existing `banking_awareness` chapter.
 */

const L = (en, bn) => ({ en, bn });

const CARDS = Object.freeze([
  {
    code: 'indian_gk',
    section: 'india',
    prefix: 'IGK',
    emoji: '🎖️',
    title: L('National Symbols, Firsts & Institutions', 'জাতীয় প্রতীক, প্রথম ও প্রতিষ্ঠান'),
    description: L('National symbols, important firsts, states and capitals, institutions', 'জাতীয় প্রতীক, প্রথম ভারতীয়, রাজ্য ও রাজধানী, প্রতিষ্ঠান'),
    topics: ['indian_gk'],
    subtopics: {
      national_symbols: L('National Symbols', 'জাতীয় প্রতীক'),
      important_firsts: L('Important Firsts', 'প্রথম যাঁরা / যা'),
      states_capitals: L('States and Capitals', 'রাজ্য ও রাজধানী'),
      union_territories: L('Union Territories', 'কেন্দ্রশাসিত অঞ্চল'),
      institutions_hq: L('Institutions and Headquarters', 'প্রতিষ্ঠান ও সদর দপ্তর'),
      national_parks_dams: L('National Parks and Dams', 'জাতীয় উদ্যান ও বাঁধ'),
      misc: L('Miscellaneous', 'বিবিধ'),
    },
  },
  {
    code: 'west_bengal_gk',
    section: 'west_bengal',
    prefix: 'WBG',
    emoji: '🐅',
    title: L('West Bengal GK', 'পশ্চিমবঙ্গ সাধারণ জ্ঞান'),
    description: L('History, districts, rivers, personalities, culture and administration of West Bengal', 'পশ্চিমবঙ্গের ইতিহাস, জেলা, নদী, ব্যক্তিত্ব, সংস্কৃতি ও প্রশাসন'),
    topics: ['west_bengal_gk'],
    subtopics: {
      history: L('History', 'ইতিহাস'),
      districts_admin: L('Districts and Administration', 'জেলা ও প্রশাসন'),
      geography_rivers: L('Geography and Rivers', 'ভূগোল ও নদী'),
      state_symbols: L('State Symbols', 'রাজ্য প্রতীক'),
      personalities: L('Personalities', 'ব্যক্তিত্ব'),
      renaissance: L('Bengal Renaissance', 'বাংলার নবজাগরণ'),
      freedom_movement: L('Freedom Movement in Bengal', 'বাংলার স্বাধীনতা আন্দোলন'),
      literature_culture: L('Literature and Culture', 'সাহিত্য ও সংস্কৃতি'),
      festivals_folk: L('Festivals and Folk Traditions', 'উৎসব ও লোকসংস্কৃতি'),
      heritage_tourism: L('Heritage and Tourism', 'ঐতিহ্য ও পর্যটন'),
      economy_industry: L('Economy and Industry', 'অর্থনীতি ও শিল্প'),
      government_institutions: L('Government Institutions', 'সরকারি প্রতিষ্ঠান'),
      schemes: L('State Government Schemes', 'রাজ্য সরকারের প্রকল্প'),
      sports: L('Sports', 'খেলাধুলা'),
      firsts: L('Firsts and Milestones', 'প্রথম ও মাইলফলক'),
    },
  },
  {
    code: 'indian_history',
    section: 'india',
    prefix: 'HIS',
    emoji: '🏛️',
    title: L('Indian History', 'ভারতের ইতিহাস'),
    description: L('Ancient, medieval and modern India and the freedom struggle', 'প্রাচীন, মধ্যযুগীয় ও আধুনিক ভারত এবং স্বাধীনতা সংগ্রাম'),
    topics: ['indian_history'],
    subtopics: {
      prehistoric: L('Prehistoric India', 'প্রাগৈতিহাসিক ভারত'),
      ivc: L('Indus Valley Civilisation', 'সিন্ধু সভ্যতা'),
      vedic: L('Vedic Period', 'বৈদিক যুগ'),
      buddhism_jainism: L('Buddhism and Jainism', 'বৌদ্ধ ও জৈন ধর্ম'),
      mahajanapadas: L('Mahajanapadas', 'মহাজনপদ'),
      maurya_gupta: L('Mauryas and Guptas', 'মৌর্য ও গুপ্ত'),
      post_maurya_sangam: L('Post-Mauryan India and the Sangam Age', 'মৌর্য-পরবর্তী ভারত ও সঙ্গম যুগ'),
      early_medieval: L('Early Medieval Kingdoms', 'আদি মধ্যযুগের রাজ্য'),
      marathas: L('Marathas', 'মারাঠা'),
      regional_18c: L('18th-century Regional Powers', 'অষ্টাদশ শতকের আঞ্চলিক শক্তি'),
      sultanate: L('Delhi Sultanate', 'দিল্লি সুলতানি'),
      mughal: L('Mughal Empire', 'মুঘল সাম্রাজ্য'),
      vijayanagara: L('Vijayanagara and Bahmani', 'বিজয়নগর ও বাহমনি'),
      bhakti_sufi: L('Bhakti and Sufi Movements', 'ভক্তি ও সুফি আন্দোলন'),
      company_rule: L('Company Rule', 'কোম্পানির শাসন'),
      peasant_tribal: L('Peasant and Tribal Movements', 'কৃষক ও উপজাতি বিদ্রোহ'),
      revolt_1857: L('Revolt of 1857', '১৮৫৭-র বিদ্রোহ'),
      reform_movements: L('Socio-religious Reform', 'সমাজ ও ধর্মসংস্কার'),
      inc: L('Indian National Congress', 'ভারতীয় জাতীয় কংগ্রেস'),
      revolutionaries: L('Revolutionary Movements', 'বিপ্লবী আন্দোলন'),
      freedom_movement: L('Freedom Movement', 'স্বাধীনতা আন্দোলন'),
      acts_policies: L('Acts and Policies', 'আইন ও নীতি'),
    },
  },
  {
    code: 'geography',
    section: 'india',
    prefix: 'GEO',
    emoji: '🗺️',
    title: L('Geography', 'ভূগোল'),
    description: L('Physical India, rivers, climate, resources and world geography', 'ভারতের প্রাকৃতিক ভূগোল, নদী, জলবায়ু, সম্পদ ও বিশ্ব ভূগোল'),
    topics: ['geography'],
    subtopics: {
      physical_india: L('Physical Features of India', 'ভারতের প্রাকৃতিক বৈশিষ্ট্য'),
      states_capitals: L('States and Capitals', 'রাজ্য ও রাজধানী'),
      physical_geography: L('Physical Geography: Earth, Rocks, Oceans', 'প্রাকৃতিক ভূগোল: পৃথিবী, শিলা, মহাসাগর'),
      rivers: L('Rivers and Tributaries', 'নদী ও উপনদী'),
      mountains_plateaus: L('Mountains, Plateaus and Deserts', 'পর্বত, মালভূমি ও মরুভূমি'),
      climate_soil: L('Climate and Soil', 'জলবায়ু ও মৃত্তিকা'),
      agriculture: L('Agriculture', 'কৃষি'),
      minerals_resources: L('Minerals and Resources', 'খনিজ ও সম্পদ'),
      parks_sanctuaries: L('National Parks and Sanctuaries', 'জাতীয় উদ্যান ও অভয়ারণ্য'),
      dams_projects: L('Dams and Projects', 'বাঁধ ও প্রকল্প'),
      world_geography: L('World Geography', 'বিশ্ব ভূগোল'),
      world_features: L('Straits, Canals, Lakes and Peaks', 'প্রণালী, খাল, হ্রদ ও শৃঙ্গ'),
    },
  },
  {
    code: 'general_science',
    section: 'india',
    prefix: 'SCI',
    emoji: '🔬',
    title: L('General Science', 'সাধারণ বিজ্ঞান'),
    description: L('Physics, chemistry and biology for everyday life and exams', 'দৈনন্দিন জীবন ও পরীক্ষার জন্য পদার্থবিদ্যা, রসায়ন ও জীববিদ্যা'),
    topics: ['general_science'],
    subtopics: {
      physics_units: L('Physics: Units and Measurement', 'পদার্থবিদ্যা: একক ও পরিমাপ'),
      physics_mechanics: L('Physics: Motion, Force and Energy', 'পদার্থবিদ্যা: গতি, বল ও শক্তি'),
      physics_heat_light_sound: L('Physics: Heat, Light and Sound', 'পদার্থবিদ্যা: তাপ, আলো ও শব্দ'),
      physics_electricity: L('Physics: Electricity and Magnetism', 'পদার্থবিদ্যা: তড়িৎ ও চুম্বক'),
      physics_modern: L('Physics: Modern Physics', 'পদার্থবিদ্যা: আধুনিক পদার্থবিদ্যা'),
      discoveries: L('Discoveries and Inventions', 'আবিষ্কার ও উদ্ভাবন'),
      chemistry_matter: L('Chemistry: Elements, Compounds, Mixtures', 'রসায়ন: মৌল, যৌগ ও মিশ্রণ'),
      chemistry_acids_bases: L('Chemistry: Acids, Bases and Salts', 'রসায়ন: অ্যাসিড, ক্ষার ও লবণ'),
      chemistry_metals: L('Chemistry: Metals and Non-metals', 'রসায়ন: ধাতু ও অধাতু'),
      chemistry_everyday: L('Chemistry in Everyday Life', 'দৈনন্দিন জীবনে রসায়ন'),
      biology_human_body: L('Biology: Human Body', 'জীববিদ্যা: মানবদেহ'),
      biology_nutrition: L('Biology: Nutrition and Vitamins', 'জীববিদ্যা: পুষ্টি ও ভিটামিন'),
      biology_diseases: L('Biology: Diseases and Pathogens', 'জীববিদ্যা: রোগ ও রোগজীবাণু'),
      biology_plants_animals: L('Biology: Plants and Animals', 'জীববিদ্যা: উদ্ভিদ ও প্রাণী'),
      biology_cell_genetics: L('Biology: Cells and Genetics', 'জীববিদ্যা: কোশ ও বংশগতি'),
    },
  },
  {
    code: 'polity',
    section: 'india',
    prefix: 'POL',
    emoji: '⚖️',
    title: L('Indian Polity and Constitution', 'ভারতের সংবিধান ও রাষ্ট্রব্যবস্থা'),
    description: L('Constitution, rights, Parliament, judiciary, elections and local government', 'সংবিধান, অধিকার, সংসদ, বিচারব্যবস্থা, নির্বাচন ও স্থানীয় সরকার'),
    topics: ['polity'],
    subtopics: {
      preamble: L('Preamble and Making of the Constitution', 'প্রস্তাবনা ও সংবিধান প্রণয়ন'),
      union_citizenship: L('Union, Territory and Citizenship', 'ইউনিয়ন, ভূখণ্ড ও নাগরিকত্ব'),
      fundamental_rights: L('Fundamental Rights', 'মৌলিক অধিকার'),
      dpsp_duties: L('Directive Principles and Duties', 'নির্দেশমূলক নীতি ও মৌলিক কর্তব্য'),
      union_executive: L('President, Vice-President and PM', 'রাষ্ট্রপতি, উপরাষ্ট্রপতি ও প্রধানমন্ত্রী'),
      parliament: L('Parliament', 'সংসদ'),
      judiciary: L('Supreme Court and High Courts', 'সুপ্রিম কোর্ট ও হাইকোর্ট'),
      constitutional_bodies: L('Constitutional Bodies', 'সাংবিধানিক সংস্থা'),
      federalism_emergency: L('Federalism, Emergency and Services', 'যুক্তরাষ্ট্রীয় কাঠামো, জরুরি অবস্থা ও চাকরি'),
      elections: L('Elections', 'নির্বাচন'),
      state_govt: L('Governor, CM and State Legislature', 'রাজ্যপাল, মুখ্যমন্ত্রী ও রাজ্য আইনসভা'),
      amendments: L('Constitutional Amendments', 'সংবিধান সংশোধন'),
      schedules_articles: L('Schedules and Articles', 'তফসিল ও অনুচ্ছেদ'),
      panchayati_raj: L('Panchayati Raj and Local Government', 'পঞ্চায়েতি রাজ ও স্থানীয় সরকার'),
    },
  },
  {
    code: 'economy',
    section: 'india',
    prefix: 'ECO',
    emoji: '💹',
    title: L('Indian Economy and Banking', 'ভারতীয় অর্থনীতি ও ব্যাংকিং'),
    description: L('Economic terms, RBI and banking, budget, plans, reforms and institutions', 'অর্থনৈতিক পরিভাষা, আরবিআই ও ব্যাংকিং, বাজেট, পরিকল্পনা, সংস্কার ও প্রতিষ্ঠান'),
    topics: ['economy', 'banking_awareness'],
    subtopics: {
      basics: L('Basic Concepts', 'মৌলিক ধারণা'),
      rbi_banking: L('RBI and Banking', 'আরবিআই ও ব্যাংকিং'),
      banking_operations: L('Banking Operations and Terms', 'ব্যাংকিং কার্যপ্রণালী ও পরিভাষা'),
      inflation_income: L('Inflation and National Income', 'মুদ্রাস্ফীতি ও জাতীয় আয়'),
      budget_tax: L('Budget and Taxation', 'বাজেট ও কর'),
      plans_reforms: L('Plans and Reforms', 'পরিকল্পনা ও সংস্কার'),
      poverty_development: L('Poverty and Development', 'দারিদ্র্য ও উন্নয়ন'),
      external_sector: L('External Sector and Trade', 'বৈদেশিক ক্ষেত্র ও বাণিজ্য'),
      agri_industry: L('Agriculture and Industry', 'কৃষি ও শিল্প'),
      schemes: L('Government Schemes', 'সরকারি প্রকল্প'),
      financial_institutions: L('Financial Institutions', 'আর্থিক প্রতিষ্ঠান'),
    },
  },
  {
    code: 'current_affairs',
    section: 'other',
    prefix: 'CA',
    emoji: '📰',
    title: L('Current Affairs', 'সাম্প্রতিক ঘটনাবলি'),
    description: L('Dated national, international and West Bengal events, with sources', 'সূত্রসহ তারিখ-ভিত্তিক জাতীয়, আন্তর্জাতিক ও পশ্চিমবঙ্গের ঘটনা'),
    topics: ['current_affairs'],
    dated: true,
    subtopics: {
      national: L('National', 'জাতীয়'),
      international: L('International', 'আন্তর্জাতিক'),
      economy_banking: L('Economy and Banking', 'অর্থনীতি ও ব্যাংকিং'),
      schemes: L('Government Schemes', 'সরকারি প্রকল্প'),
      awards: L('Awards and Honours', 'পুরস্কার ও সম্মান'),
      appointments: L('Appointments', 'নিয়োগ'),
      sports: L('Sports', 'খেলাধুলা'),
      sci_tech: L('Science and Technology', 'বিজ্ঞান ও প্রযুক্তি'),
      days_themes: L('Important Days and Themes', 'গুরুত্বপূর্ণ দিবস ও থিম'),
      reports_indexes: L('Reports and Indexes', 'রিপোর্ট ও সূচক'),
      summits: L('Summits and Organisations', 'শীর্ষ সম্মেলন ও সংস্থা'),
      west_bengal: L('West Bengal', 'পশ্চিমবঙ্গ'),
    },
  },
  {
    code: 'computer_awareness',
    section: 'other',
    prefix: 'CMP',
    emoji: '💻',
    title: L('Computer Awareness', 'কম্পিউটার সচেতনতা'),
    description: L('Hardware, software, internet, MS Office, abbreviations and cyber security', 'হার্ডওয়্যার, সফটওয়্যার, ইন্টারনেট, এমএস অফিস, সংক্ষিপ্ত রূপ ও সাইবার নিরাপত্তা'),
    topics: ['computer_awareness'],
    subtopics: {
      hardware: L('Hardware and Memory', 'হার্ডওয়্যার ও মেমরি'),
      software: L('Software and Operating Systems', 'সফটওয়্যার ও অপারেটিং সিস্টেম'),
      internet: L('Internet and Networking', 'ইন্টারনেট ও নেটওয়ার্ক'),
      ms_office: L('MS Office', 'এমএস অফিস'),
      abbreviations: L('Abbreviations', 'সংক্ষিপ্ত রূপ'),
      security: L('Cyber Security', 'সাইবার নিরাপত্তা'),
    },
  },
  {
    code: 'environment',
    section: 'india',
    prefix: 'ENV',
    emoji: '🌱',
    title: L('Environment and Ecology', 'পরিবেশ ও বাস্তুবিদ্যা'),
    description: L('Ecosystems, biodiversity, pollution, climate change and conventions', 'বাস্তুতন্ত্র, জীববৈচিত্র্য, দূষণ, জলবায়ু পরিবর্তন ও আন্তর্জাতিক চুক্তি'),
    topics: ['environment'],
    subtopics: {
      ecosystems: L('Ecosystems', 'বাস্তুতন্ত্র'),
      biodiversity: L('Biodiversity', 'জীববৈচিত্র্য'),
      pollution: L('Pollution', 'দূষণ'),
      climate_change: L('Climate Change', 'জলবায়ু পরিবর্তন'),
      conventions: L('Conventions and Protocols', 'আন্তর্জাতিক চুক্তি ও প্রোটোকল'),
      protected_areas: L('Protected Areas and Laws', 'সংরক্ষিত অঞ্চল ও আইন'),
      energy: L('Energy Conservation & Renewable Energy', 'শক্তি সংরক্ষণ ও নবায়নযোগ্য শক্তি'),
    },
  },
  {
    code: 'art_culture',
    section: 'india',
    prefix: 'ART',
    emoji: '🎭',
    title: L('Art and Culture', 'শিল্প ও সংস্কৃতি'),
    description: L('Dance, music, painting, architecture, festivals and UNESCO heritage', 'নৃত্য, সংগীত, চিত্রকলা, স্থাপত্য, উৎসব ও ইউনেস্কো ঐতিহ্য'),
    topics: ['art_culture'],
    subtopics: {
      dance: L('Dance', 'নৃত্য'),
      music: L('Music', 'সংগীত'),
      painting: L('Painting and Crafts', 'চিত্রকলা ও কারুশিল্প'),
      architecture: L('Architecture and Monuments', 'স্থাপত্য ও স্মৃতিসৌধ'),
      festivals: L('Festivals', 'উৎসব'),
      unesco_sites: L('UNESCO Heritage', 'ইউনেস্কো ঐতিহ্য'),
    },
  },
  {
    code: 'static_gk',
    section: 'india',
    prefix: 'SGK',
    emoji: '🏆',
    title: L('Static GK', 'স্থির সাধারণ জ্ঞান'),
    description: L('Books, awards, sports, important days, organisations, countries and census', 'বই, পুরস্কার, খেলা, গুরুত্বপূর্ণ দিবস, সংস্থা, দেশ ও জনগণনা'),
    topics: ['static_gk'],
    subtopics: {
      books_authors: L('Books and Authors', 'বই ও লেখক'),
      awards_honours: L('Awards and Honours', 'পুরস্কার ও সম্মান'),
      sports_games: L('Sports and Games', 'খেলাধুলা'),
      important_days: L('Important Days', 'গুরুত্বপূর্ণ দিবস'),
      international_orgs: L('International Organisations', 'আন্তর্জাতিক সংস্থা'),
      countries_capitals: L('Countries, Capitals and Currencies', 'দেশ, রাজধানী ও মুদ্রা'),
      census_statistics: L('Census and Statistics', 'জনগণনা ও পরিসংখ্যান'),
    },
  },
  {
    code: 'important_days',
    section: 'india',
    prefix: 'DAY',
    emoji: '📅',
    title: L('Important National & International Days', 'গুরুত্বপূর্ণ জাতীয় ও আন্তর্জাতিক দিবস'),
    description: L('Month-wise national and international days for competitive exams (WBPSC, SSC, Railways, WBCS), with the stories behind the dates and practice questions', 'প্রতিযোগিতামূলক পরীক্ষার (WBPSC, SSC, রেল, WBCS) জন্য মাসভিত্তিক জাতীয় ও আন্তর্জাতিক দিবস — তারিখের পেছনের গল্প ও অনুশীলন প্রশ্নসহ'),
    topics: ['important_days'],
    subtopics: {
      january: L('January', 'জানুয়ারি'),
      february: L('February', 'ফেব্রুয়ারি'),
      march: L('March', 'মার্চ'),
      april: L('April', 'এপ্রিল'),
      may: L('May', 'মে'),
      june: L('June', 'জুন'),
      july: L('July', 'জুলাই'),
      august: L('August', 'আগস্ট'),
      september: L('September', 'সেপ্টেম্বর'),
      october: L('October', 'অক্টোবর'),
      november: L('November', 'নভেম্বর'),
      december: L('December', 'ডিসেম্বর'),
      mixed: L('Mixed Practice', 'মিশ্র অনুশীলন'),
    },
  },
  {
    code: 'organisations',
    section: 'india',
    prefix: 'ORG',
    emoji: '🏛️',
    title: L('Headquarters & Organisations', 'সদর দপ্তর ও সংস্থা'),
    description: L('UN agencies, world financial bodies, global groups and Indian institutions — headquarters, founding years and current heads', 'রাষ্ট্রসংঘের সংস্থা, বিশ্ব আর্থিক সংস্থা, বিশ্ব গোষ্ঠী ও ভারতীয় প্রতিষ্ঠান — সদর দপ্তর, প্রতিষ্ঠার বছর ও বর্তমান প্রধান'),
    topics: ['organisations'],
    subtopics: {
      un_system: L('UN & Specialised Agencies', 'রাষ্ট্রসংঘ ও বিশেষায়িত সংস্থা'),
      financial_bodies: L('Financial & Trade Bodies', 'আর্থিক ও বাণিজ্য সংস্থা'),
      global_groups: L('Global Groups & Alliances', 'বিশ্ব গোষ্ঠী ও জোট'),
      indian_bodies: L('Indian Institutions & Regulators', 'ভারতীয় প্রতিষ্ঠান ও নিয়ন্ত্রক'),
      current_heads: L('Current Heads', 'বর্তমান প্রধানগণ'),
      mixed: L('Mixed Practice', 'মিশ্র অনুশীলন'),
    },
  },
  {
    // Added for the WBPSC IDO examination (Advt 15/2024): "Industrial Safety/Security
    // Measures and Pollution Control Measures" is a named section of that paper.
    code: 'industrial_safety',
    section: 'india',
    prefix: 'SAF',
    emoji: '🦺',
    title: L('Industrial Safety & Pollution Control', 'শিল্প নিরাপত্তা ও দূষণ নিয়ন্ত্রণ'),
    description: L('Factory safety law, occupational health, fire and electrical safety, pollution-control Acts and boards', 'কারখানার নিরাপত্তা আইন, পেশাগত স্বাস্থ্য, অগ্নি ও বৈদ্যুতিক নিরাপত্তা, দূষণ-নিয়ন্ত্রণ আইন ও পর্ষদ'),
    topics: ['industrial_safety'],
    subtopics: {
      factory_safety: L('Factory Safety & Law', 'কারখানার নিরাপত্তা ও আইন'),
      occupational_health: L('Occupational Health & PPE', 'পেশাগত স্বাস্থ্য ও PPE'),
      fire_safety: L('Fire Safety', 'অগ্নি নিরাপত্তা'),
      electrical_safety: L('Electrical Safety', 'বৈদ্যুতিক নিরাপত্তা'),
      pollution_control: L('Pollution Control', 'দূষণ নিয়ন্ত্রণ'),
      chemical_safety: L('Chemical & Disaster Safety', 'রাসায়নিক ও বিপর্যয় নিরাপত্তা'),
      mixed: L('Mixed Practice', 'মিশ্র অনুশীলন'),
    },
  },
  {
    // Added for the WBPSC IDO examination (Advt 15/2024): "Industrial Scenario and
    // Industrial Potential in West Bengal" is a named section of that paper.
    // Grouped under the India umbrella on the GK dashboard: the West Bengal
    // section there is exactly the West Bengal GK card (test/gk.test.js).
    code: 'wb_industry',
    section: 'india',
    prefix: 'IND',
    emoji: '🏭',
    title: L('Industrial Scenario of West Bengal', 'পশ্চিমবঙ্গের শিল্প পরিস্থিতি'),
    description: L('Industrial roots, the MSME sector, industrial policy, industrial areas, key industries and support schemes of West Bengal', 'পশ্চিমবঙ্গের শিল্পের শিকড়, MSME খাত, শিল্প নীতি, শিল্পাঞ্চল, প্রধান শিল্প ও সহায়তা প্রকল্প'),
    topics: ['wb_industry'],
    subtopics: {
      industrial_roots: L('Industrial Roots & Heritage', 'শিল্পের শিকড় ও ঐতিহ্য'),
      msme_sector: L('MSME Sector', 'MSME খাত'),
      industrial_policy: L('Industrial Policy & Bodies', 'শিল্প নীতি ও সংস্থা'),
      industrial_areas: L('Industrial Areas & Parks', 'শিল্পাঞ্চল ও পার্ক'),
      key_industries: L('Key Industries & Clusters', 'প্রধান শিল্প ও গুচ্ছ'),
      support_schemes: L('Support Schemes & Services', 'সহায়তা প্রকল্প ও পরিষেবা'),
      mixed: L('Mixed Practice', 'মিশ্র অনুশীলন'),
    },
  },
]);

/** Dashboard sections: Indian GK (an umbrella over the India cards), West Bengal GK, Other. */
const SECTIONS = Object.freeze([
  { code: 'india', title: L('Indian GK', 'ভারত সাধারণ জ্ঞান'), description: L('History, geography, polity, economy, science, culture and static GK of India', 'ভারতের ইতিহাস, ভূগোল, রাষ্ট্রব্যবস্থা, অর্থনীতি, বিজ্ঞান, সংস্কৃতি ও স্থির সাধারণ জ্ঞান') },
  { code: 'west_bengal', title: L('West Bengal GK', 'পশ্চিমবঙ্গ সাধারণ জ্ঞান'), description: L('Kept separate for WBPSC, WBCS and other West Bengal exams', 'WBPSC, WBCS ও পশ্চিমবঙ্গের অন্যান্য পরীক্ষার জন্য আলাদা রাখা') },
  { code: 'other', title: L('Current Affairs and Computer', 'সাম্প্রতিক ঘটনা ও কম্পিউটার'), description: L('Dated current affairs and computer awareness', 'তারিখসহ সাম্প্রতিক ঘটনা ও কম্পিউটার সচেতনতা') },
]);
const cardsInSection = (code) => CARDS.filter((c) => c.section === code);

/**
 * Stored subtopic values that count as a GK subcategory without being renamed in the
 * database. Polity's template questions keep 'articles' because the question-pattern
 * rules (db/patterns/match/gs.js) match on it.
 */
const SUBTOPIC_ALIASES = Object.freeze({ polity: { articles: 'schedules_articles' } });
/** Stored values that mean this subcategory: the code itself plus its aliases. */
const storedSubtopics = (topic, code) => [code, ...Object.entries(SUBTOPIC_ALIASES[topic] || {}).filter(([, to]) => to === code).map(([from]) => from)];
/** The GK subcategory a stored subtopic value counts as (null when it is not one). */
const subtopicFor = (topic, value) => {
  const card = cardForTopic(topic);
  if (!card || !value) return null;
  const v = SUBTOPIC_ALIASES[topic]?.[value] ?? value;
  return card.subtopics[v] ? v : null;
};

/** Fact `topic` values: every card's own code (facts never use `banking_awareness`). */
const FACT_TOPICS = Object.freeze(CARDS.map((c) => c.code));
/** Question-bank chapters the GK section draws on. */
const GK_TOPICS = Object.freeze([...new Set(CARDS.flatMap((c) => c.topics))]);
/** Chapters added to the catalogue for GK (the rest already existed). */
const NEW_TOPICS = Object.freeze(['indian_gk', 'computer_awareness', 'environment', 'art_culture', 'static_gk', 'important_days', 'organisations', 'industrial_safety', 'wb_industry']);

const cardOf = (code) => CARDS.find((c) => c.code === code) || null;
/** The card a question-bank topic belongs to (`banking_awareness` → economy). */
const cardForTopic = (topic) => CARDS.find((c) => c.topics.includes(topic)) || null;
const SUBTOPICS = Object.freeze(Object.fromEntries(CARDS.map((c) => [c.code, Object.keys(c.subtopics)])));

const EXAM_RELEVANCE = Object.freeze(['WBPSC_CLERKSHIP', 'WBCS', 'WBPSC_MISC', 'SSC', 'RAILWAY', 'BANK', 'WB_POST']);
const QUESTION_FORMATS = Object.freeze(['DIRECT', 'STATEMENT', 'MATCH', 'CHRONOLOGY', 'PAIRS', 'ASSERTION_REASON']);

module.exports = { SECTIONS, cardsInSection, SUBTOPIC_ALIASES, storedSubtopics, subtopicFor, CARDS, FACT_TOPICS, GK_TOPICS, NEW_TOPICS, SUBTOPICS, EXAM_RELEVANCE, QUESTION_FORMATS, cardOf, cardForTopic };
