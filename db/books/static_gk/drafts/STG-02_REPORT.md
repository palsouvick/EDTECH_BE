# STG-02 — পুরস্কার ও সম্মান (Awards & Honours) — Draft Report

- **Chapter:** `chapter.json` — book `static_gk`, code `STG-02`, number 2, part `knowledge`, subtopics `["awards_honours"]` (title/part/subtopics verbatim from `db/books/static_gk/toc.js`). Status **DRAFT**, verification **UNVERIFIED**.
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/stg-02/chapter.json` → **OK** (run 2026-11-19).
- **Counts:** 46 claims, 42 practice questions (basic 10, moderate 15, difficult 10, exam 7; formats DIRECT, STATEMENT, MATCH, PAIRS, CHRONOLOGY), 6 sections, 10 events, 10 people, 11 timeline entries, 10 terms, 2 cause–effect entries, 15 quick-revision points.

## Sections
1. `civilian_padma` — Padma Awards: three categories, criteria wording, Republic Day announcement, Presidential conferment, 2025 figures (139 = 7/19/113).
2. `bharat_ratna` — Bharat Ratna as India's highest civilian honour; the five 2024 recipients (four posthumous).
3. `nobel` — Tagore 1913 (first Indian, Literature) and Abhijit Banerjee 2019 (Economic Sciences, with Duflo & Kremer) — the only Nobel facts an allowed source supported.
4. `film_awards` — National Film Awards 1954, first edition (1953 films), first Best Actor/Actress (Uttam Kumar/Nargis, Bharat/Urvashi names), Dadasaheb Phalke 1969/Devika Rani, recipients 2021–2024.
5. `sports_awards` — National Sports Awards criteria (Khel Ratna, Arjuna + Lifetime, Dronacharya, Dhyan Chand, MAKA Trophy, RKPP, Tenzing Norgay), 2020 list (Rohit Sharma et al.), name change Rajiv Gandhi → Major Dhyan Chand Khel Ratna.
6. `gallantry_literary` — Six gallantry awards, institution 1950/1952 with deemed effect 15 Aug 1947, gallantryawards.gov.in (2017); Sahitya Akademi Translation Prize 2023 (24 books, ₹50,000 + copper plaque, Bengali/English winners).

## Sources actually fetched (browser.open, all GOVT per PROFILES.static_gk)
1. Padma Awards 2025 announced — PIB (MHA) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2096285&reg=3&lang=1
2. President confers Bharat Ratna on ex-PMs Narasimha Rao, Chaudhary Charan Singh and two others — DD News — https://ddnews.gov.in/en/tag/prime-murmu/
3. National Film Awards — At a Glance (Factsheet) — PIB — https://www.pib.gov.in/FactsheetDetails.aspx?id=151027&NoteId=151027&ModuleId=16&reg=5&lang=1
4. Sports Awards 2025 applications notification — PIB (Ministry of Youth Affairs and Sports), PRID 2172958 — https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2172958&reg=3&lang=2
5. National Sports Awards 2020 announced — PIB, PRID 1647633 — https://pib.gov.in/Pressreleaseshare.aspx?PRID=1647633
6. Online quiz competition on gallantry awards — PIB (Ministry of Defence), PRID 1514583 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1514583&ui=2&tf=1&pli=1&reg=3&lang=2
7. Gallantry Awards portal — About Gallantry Awards — Ministry of Defence — https://gallantryawards.gov.in/
8. Sahitya Akademi Translation Prize 2023 — PIB, PRID 2013527 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2013527&reg=48&lang=2
9. 162nd Rabindra Jayanti, Kolkata — PIB (MHA), PRID 1922940 — https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=1922940&reg=3&lang=2
10. PM congratulates Abhijit Banerjee (2019 Economic Sciences Nobel) — PIB, PRID 1588089 — https://pib.gov.in/Pressreleaseshare.aspx?PRID=1588089

Also fetched but yielding no usable chapter text: padmaawards.gov.in homepage (JS shell only); the MHA Padma Awards 2025 press-note PDF (same boilerplate as source 1, not cited separately); gallantryawards.gov.in/awardee/1055 (fetch failed — not retried, per tool guidance).

## PYQ candidates
- **Found:** 49 — 25 GK bank items with subtopic `awards_honours` in `db/gk/static_gk.jsonl` (GK-SGK-003…006, 101…121) + 24 real exam questions grepped from `db/pyq/*.json` (WBCS Prelims 2015–2024, WBPSC Miscellaneous 2023, WBP Constable 2021, WBPSC Clerkship 2006/2019/2023).
- **Mapped:** all 49 in `pyq_map_STG-02.json`, each with a section id or a specific untaught reason.
- **Taught:** 8 — GK-SGK-003 (Tagore), GK-SGK-006 (Banerjee), GK-SGK-101 (Padma categories), GK-SGK-105 (Phalke 1969/Devika Rani), GK-SGK-106 (Phalke 2021–24), GK-SGK-107 (first NFA acting awards), WBCS-2021-Q127 (Rohit Sharma Khel Ratna 2020), Clerkship-2023-S1-Q60 (Bharat Ratna 2024).

## Gaps (disclosed, never filled from memory)
- **Bharat Ratna institution year (1954) and first recipients** — not stated in any fetched allowed-publisher page (the Lok Sabha Q&A with the recipient list sits on sansad.in, which is outside PROFILES.static_gk publishers). GK-SGK-104 and the Lata Mangeshkar / Pranab Mukherjee year PYQs are therefore untaught. The chapter teaches only: highest civilian honour + the five 2024 recipients (DD News).
- **Most individual Nobel laureates** (Raman 1930, Khorana 1968, Mother Teresa 1979, Chandrasekhar 1983, Sen 1998, Ramakrishnan 2009, Satyarthi 2014) and non-Indian laureates asked in PYQs — NobelPrize.org is not an allowed publisher and no gov.in page stating these was fetched. GK-SGK-004, 005, 113–118 untaught.
- **Padma Awards 1954 origin / 1955 renaming / eligibility rules** — not in the fetched MHA/PIB 2025 release. GK-SGK-102, GK-SGK-103 untaught (announcement timing is taught).
- **Gallantry award criteria and ranking** (PVC/Ashoka Chakra criteria, "highest" ranking, first PVC recipient Somnath Sharma) — the fetched MoD portal homepage gives only the six names and institution dates. GK-SGK-110, 111 (partial), 112 and Misc-2023-Q75 untaught.
- **Khel Ratna first recipient (Viswanathan Anand, 1991-92)** and Dronacharya awardee lists — not in the fetched PIB sports releases. GK-SGK-108 (partial), GK-SGK-109 untaught.
- **Jnanpith Award** (incl. Bengali winners and the 54th award, Amitav Ghosh) — Bharatiya Jnanpith is not an allowed publisher; no gov.in list fetched. GK-SGK-121 and WBCS-2019-Q175 untaught.
- **Ramon Magsaysay Award** (Teresa 1962, Ray 1967, Mahasweta Devi 1997, 2019 journalism) — the Magsaysay Foundation is not an allowed publisher. GK-SGK-119, GK-SGK-120 untaught.
- **Booker / International Booker PYQs** (WBCS-2024-Q197, Clerkship-2023-S4-Q91) — belong to books_authors territory (STG-01); no allowed source fetched in this run.
- **Sahitya Akademi main awards** (e.g. 2021 English winner) — only the Translation Prize 2023 release was fetched.
