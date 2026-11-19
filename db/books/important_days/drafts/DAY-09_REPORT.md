# DAY-09 — সেপ্টেম্বরের দিবস — Draft Report

- **Chapter:** `chapter.json` — book `important_days`, code `DAY-09`, part `q3`, subtopics `["september"]` (title/part/subtopics verbatim from `important_days/toc.js`).
- **Status:** DRAFT, verification UNVERIFIED.
- **Validator:** `node scripts/validateBooks.js chapter.json` → **OK**.
- **Counts:** 37 claims, 18 sources, 42 practice questions (basic 14, moderate 13, difficult 9, exam 6; formats DIRECT, STATEMENT, MATCH, PAIRS, ASSERTION_REASON, CHRONOLOGY), 6 sections, every section tested.

## Sources actually fetched (browser.open, 2026-11-19) — all PIB / *.gov.in (validator profile: GOVT + NCERT)

1. National Teachers' Award 2024 conferred on Teachers' Day — PIB, PRID 2052338 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2052338
2. Films Division documentary on Dr. Sarvepalli Radhakrishnan (Teachers' Day since 1962) — PIB, PRID 1651340 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1651340
3. Year End Review 2024: Dept. of School Education & Literacy (Literacy Day 8 Sep; NAT on 5 Sep; ULLAS) — PIB, PRID 2091737 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2091737
4. Poshan Maah / National Nutrition Month outreach — PIB, PRID 1755871 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1755871
5. World Coconut Day (Coconut Development Board) — PIB, PRID 1855850 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1855850
6. Films Division celebrates Hindi Diwas (14 Sep 1949; Article 343) — PIB, PRID 1653737 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1653737
7. PM greets engineers on Engineers' Day (15 Sep 2020; Visvesvaraya Jayanti) — PIB, PRID 1654674 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1654674
8. Sansad TV launch on 15 September coincides with International Day of Democracy — PIB, PRID 1754756 — https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1754756
9. World Ozone Day 2022 (16 Sep; Montreal Protocol 1987; India Party since June 1992; 2022 theme) — PIB, PRID 1859829 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1859829
10. World Ozone Day 2024 (30th; 2024 theme, year-labelled) — PIB, PRID 2054595 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2054595
11. Patient Safety Day, 17 September (MoHFW; 2022 theme, year-labelled) — PIB, PRID 1859936 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1859936
12. International Day of Sign Languages, 23 September (WFD est. 1951) — PIB, PRID 1546995 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1546995
13. Antyodaya Diwas declared 25 Sep 2014; DDU-GKY — PIB, PRID 1658854 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1658854
14. World Tourism Day 2025 celebrated 27 September 2025 (2025 theme, year-labelled) — PIB, PRID 2172092 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2172092
15. World Heart Day webinar (MoHFW) — PIB, PRID 1962408 — https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1962408
16. Events page, Rajiv Gandhi Super Speciality Hospital, Govt. of NCT of Delhi (World Heart Day celebrated 29.09.2023) — https://rgssh.delhi.gov.in/rgssh/events
17. World Rabies Day observed at Kiphire (28 September, every year) — DIPR, Govt. of Nagaland — https://ipr.nagaland.gov.in/world-rabies-day-observed-kiphire-0
18. Discourse on Peace — International Day of Peace, 21 September, established by UN in 1981 — Permanent Mission of India to the UN — https://pminewyork.gov.in/pdf/uploadpdf/press__517003306.pdf

## Subtopic coverage (september)

Taught with official-source quotes: Poshan Maah (whole month), World Coconut Day (2), Teachers' Day (5), International Literacy Day (8), Hindi Diwas (14), Engineers' Day + International Day of Democracy (15), World Ozone Day (16), Patient Safety Day (17), International Day of Peace (21), International Day of Sign Languages (23), Antyodaya Diwas (25), World Tourism Day (27), World Rabies Day (28), World Heart Day (29). Annual themes are included only with their year written explicitly (Ozone 2022/2024, Patient Safety 2022, Tourism 2025, Coconut 2022).

## PYQ candidates

- Found: **2** — `GK-DAY-009` (GK bank, subtopic september) and `WBCS-EXE-PRELIMS-2017-PRELIMS-Q63` (real WBCS Prelims 2017 ozone-day question, found by grepping `db/pyq/*.json`).
- Mapped: **2**, taught: **2**, untaught: **0**. See `pyq_map_DAY-09.json`.

## Gaps (disclosed, never filled from memory)

- **10 September (World Suicide Prevention Day), 18 September (World Bamboo Day), 22 September (World Rhino Day), 26 September (World Environmental Health Day), 30 September (International Translation Day)** and other commonly listed September days were **omitted**: no official Government of India / NCERT source stating their date and reason could be fetched in this run, so per the book's hard rule they are not taught and no questions are asked on them.
- **World Heart Day (29 Sep):** the MoHFW PIB release fetched confirms the Ministry's observance but does not print the date; the fixed date is evidenced by the Delhi-govt hospital (RGSSH) events page recording its celebration on 29.09.2023. The chapter teaches the date on that basis only.
- **Engineers' Day:** the PIB release fetched (posted 15 SEP 2020) records the PM's Engineers' Day greetings and the remembrance of Sir M. Visvesvaraya "on his Jayanti" on that date; Visvesvaraya's birth year is not stated in any fetched source and is therefore not taught.
- **Timeline:** for this month-wise book the `timeline` array is the honest equivalent of a chronology — September dates in date order, with `sort_year` carrying the day-of-month for ordering (validator for this book does not require dated entries).
- `bengal_connection` is genuine but narrow: West Bengal teachers appear in the National Teachers' Award 2024 list (claim c37); no broader Bengal-specific September observance was sourced.
