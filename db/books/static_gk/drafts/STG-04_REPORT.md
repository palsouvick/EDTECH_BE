# STG-04 — খেলাধুলা (sports_games) — Draft Report

- **Chapter:** `chapter.json` — book `static_gk`, code `STG-04`, number 4, part `world_sport` (per `db/books/static_gk/toc.js`, title/subtopics verbatim), status **DRAFT**, verification **UNVERIFIED**.
- **Validator:** `node scripts/validateBooks.js chapter.json` → **OK**.
- **Structure:** 6 sections (olympic_games, asian_games, commonwealth_games, cricket_world_cups, national_awards, sports_system), 45 claims, **42 practice questions** (basic 12, moderate 12, difficult 10, exam 8; 7 per section; exam formats: STATEMENT ×3, MATCH ×2, PAIRS ×1, CHRONOLOGY ×1, ASSERTION_REASON ×1), plus events (6), people (7), timeline (9), terms (10), cause_effect (1), exam_focus (8), quick_revision (14).

## Sources actually fetched (browser.open, 2026-11-19) — all GOVT per PROFILES.static_gk

1. **National Sports Awards 2024 — PIB release** (Ministry of Youth Affairs & Sports), 2 Jan 2025 — https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2089557&reg=48&lang=2
2. **India at 19th Asian Games — PIB backgrounder** (RU-57-01-0299-220923), 22 Sep 2023 — https://static.pib.gov.in/WriteReadData/specificdocs/documents/2023/sep/doc2023922254701.pdf
3. **PM congratulates T20 World Cup winning Indian Cricket Team — PIB release**, 30 Jun 2024 — https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2029675&reg=48&lang=2
4. **National Sports Day 2025 — PIB release**, Aug 2025 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2159494&reg=48&lang=2
5. **From Grassroots to Glory: Sports Transformation for 'Viksit Bharat 2047' — PIB backgrounder**, 28 Aug 2025 — https://www.pib.gov.in/PressNoteDetails.aspx?id=155107&NoteId=155107&ModuleId=3&reg=3&lang=1
6. **Performance Audit Report on XIX Commonwealth Games (CWG-2010), Executive Summary — CAG of India**, 2011 — https://cag.gov.in/uploads/download_audit_report/2011/Union_Performance_Civil_XIXth_Commonwealth_Games_6_2011_exe_sum.pdf
7. **India's Journey from New Delhi to Aichi-Nagoya — PIB backgrounder (Asian Games)**, 6 Oct 2026 — https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2319703&lang=1&reg=3

## PYQ candidates

- **GK bank (`db/gk/static_gk.jsonl`): 0 candidates.** The bank contains **no items with subtopic `sports_games`** (its 55 items cover only books_authors, awards_honours, census_statistics, important_days, international_orgs). Two sports-adjacent bank items exist under `awards_honours` (GK-SGK-108 Khel Ratna list, GK-SGK-109 Dronacharya list) but they belong to STG-02's subtopic, so they were not taken.
- **PYQ corpus (`db/pyq/*.json`): 48 genuine sports candidates** found and mapped in `pyq_map_STG-04.json`; **6 taught, 42 untaught** (each untaught entry carries its specific reason).
  - Taught: Clerkship 2005 Q54 (Wizard of Hockey), Clerkship 2006 Q22 (Olympic motto), Clerkship 2019-Afternoon Q5 (CWG host year), Clerkship 2019-Afternoon Q6 (Tokyo 2020), Clerkship 2019-Forenoon Q22 (Rio 2016), Clerkship 2019-Forenoon Q28 (first Asian Games).
  - Excluded as not genuinely sports-GK: arithmetic/reasoning items that merely mention a sport (e.g. Clerkship 2005 Q45, WBCS 2022 Q47, WBCS 2023 Q118/Q177, Clerkship 2023-S3 Q37/Q77), WBCS 2015 Q107 and WBCS 2016 Q40 / 2018 Q141 (keyword false positives), WBCS 2017 Q170 (analogy item).

## Subtopic coverage (sports_games)

Covered from fetched official quotes: Olympic Games & India's medals 2016–2024, Olympic motto/values, Neeraj Chopra, Manu Bhaker, Mirabai Chanu, Abhinav Bindra (as named by PIB); Asian Games history (1951 first edition, Sondhi, 1982 return, AGF→OCA 1981, Jakarta 2018, Hangzhou 2023); Commonwealth Games 2010 (CAG report); ICC Men's T20 World Cup 2024 (winner, captain, coach); National Sports Awards criteria + 2024 recipients + MAKA Trophy; National Sports Day & Dhyan Chand; sports system (SAI, Khelo India, KIC/KIA, KIRTI, TOPS, National Sports University).

## Gaps (disclosed, never filled from memory)

1. **sports.yas.gov.in award-list pages failed to fetch** in this run (network error on the Khel Ratna list page; not retried per instructions). Consequence: award **institution years** (Arjuna 1961, Dronacharya 1985, Khel Ratna 1991–92, Dhyan Chand Award 2002) and full recipient lists are **not taught**; only PIB-stated criteria and the 2024 recipients are.
2. **ODI Cricket World Cups (1983, 2011, 2019, 2023)** — no fetchable PIB/govt source found; not taught (flagged in an exam_note box in the cricket section).
3. **FIFA World Cup, Thomas Cup 2022, stadiums/venues (Wimbledon, Green Park), Olympic rings colours/history, sports terminology (caddie etc.), player nicknames (Black Pearl), pre-2016 Olympic detail** — no verbatim official quote obtained; all corresponding PYQs are mapped untaught with reasons.
4. **Bengal connection:** no West Bengal-specific sports fact exists in the fetched sources; the chapter's `bengal_connection` says so openly instead of forcing a link.
5. NCERT Physical Education (Class XI, Olympic Movement chapter) would be an ideal additional source for ancient/modern Olympics basics (776 BCE, 1896 Athens, Coubertin, rings); no NCERT PDF URL was returned by search in this run, so it was not fetched or cited.
