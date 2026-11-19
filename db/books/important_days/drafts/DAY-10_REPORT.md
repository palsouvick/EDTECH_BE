# DAY-10 — অক্টোবরের দিবস — Draft Report

- **Chapter:** DAY-10, part `q4`, subtopic `october` (title/part/subtopics verbatim from `important_days/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js …/day-10/chapter.json` → **OK**
- **Counts:** 32 claims, 42 questions (basic 13, moderate 15, difficult 9, exam 5), 5 sections, 14 sources — all PIB (Government of India), publisher class GOVT as required by `PROFILES.important_days`.

## Sources actually fetched (browser.open, 2026-11-19)

| # | Title | URL |
|---|-------|-----|
| s1 | PIB Backgrounder: Gandhi Jayanti and the International Day of Non-Violence (01 Oct 2025) | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2173476&reg=48&lang=2 |
| s2 | PM pays tribute to Lal Bahadur Shastri on his birth anniversary (PIB, 02 Oct 2024) | https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2060959&reg=48&lang=2 |
| s3 | Elderly in India: Population, Challenges, and Government Initiatives (PIB backgrounder PDF, 28 Oct 2025) | https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/oct/doc20251028678601.pdf |
| s4 | IAF celebrating its 91st anniversary on 8 October 2023 — Eastern Air Command (PIB) | https://www.pib.gov.in/PressReleasePage.aspx?PRID=1965562&ui=2&tf=1&pli=1&reg=48&lang=2 |
| s5 | World Post Day and National Postal Week (PIB, 2020) | https://www.pib.gov.in/PressReleasePage.aspx?PRID=1662827&reg=3&lang=2 |
| s6 | Union Health Ministry observes World Mental Health Day 2026 — Tele-MANAS (PIB, 09 Oct 2026) | https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2321522&reg=1&lang=1 |
| s7 | Beti Bachao Beti Padhao — Rajya Sabha reply, Ministry of WCD (PIB, 04 Dec 2024) | https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2080711 |
| s8 | Vice President's address at Kalam's Convention-2020 (PIB) | https://www.pib.gov.in/PressReleasePage.aspx?PRID=1600848&reg=3&lang=2 |
| s9 | World Food Day 2024 backgrounder, Ministry of Food Processing Industries (PIB PDF, 15 Oct 2024) | https://static.pib.gov.in/WriteReadData/specificdocs/documents/2024/oct/doc20241015417701.pdf |
| s10 | Police Commemoration Day tributes at National Police Memorial (PIB, 21 Oct 2020) | https://www.pib.gov.in/PressReleasePage.aspx?PRID=1666496&reg=3&lang=2 |
| s11 | PM greets UN on United Nations Day (PIB, posted 24 Oct 2017) | https://www.pib.gov.in/PressReleasePage.aspx?PRID=1506801&reg=3&lang=2 |
| s12 | Cabinet approves India–UN Way Finding Application agreement (PIB, 14 Jun 2022) | https://pib.gov.in/PressReleasePage.aspx?PRID=1833818 |
| s13 | Rashtriya Ekta Diwas backgrounder (PIB, 2025) | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2184055&reg=3&lang=2 |
| s14 | Vigilance Awareness Week 2026 commences — CVC (PIB, 2026) | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2328846&reg=48&lang=2 |

## Days taught (12 observances, all claim-backed)

1 Oct International Day of Older Persons (+ Elderline launch, 1 Oct 2021) · 2 Oct Gandhi Jayanti / International Day of Non-Violence / Lal Bahadur Shastri Jayanti (+ Swachh Bharat launch, Gandhi Jayanti 2014) · 8 Oct Indian Air Force Day (estd. 1932) · 9 Oct World Post Day (UPU, Berne 1874; declared Tokyo 1969) + National Postal Week 9–15 Oct · 10 Oct World Mental Health Day (+ Tele-MANAS launch 2022, helpline 14416; 2026 theme year-tagged) · 11 Oct International Day of the Girl Child · 15 Oct World Students' Day / Kalam birth anniversary (b. 1931, Rameswaram) · 16 Oct World Food Day (FAO 1945; day founded 1979; 2024 theme year-tagged; NFSA figures) · 21 Oct Police Commemoration Day (Hot Springs, Ladakh, 1959; NPM dedicated 21 Oct 2018) · 24 Oct United Nations Day (UN founded 1945, 193 members, India founding member) · 31 Oct Rashtriya Ekta Diwas (Patel; first 2014; EBSB announced 31 Oct 2015) · Vigilance Awareness Week (CVC; integrity pledge; 2026 dates 26 Oct–1 Nov, year-tagged as movable).

Annual themes are included only with their year written explicitly (Older Persons 2025, Food Day 2024, Mental Health 2026, Vigilance Week 2026), per the book rule.

## PYQ candidates

- **Found:** 2 — bank item `GK-DAY-010` (the only `important_days.jsonl` row with subtopic `october`) and one genuine PYQ-corpus item, `WBCS-EXE-PRELIMS-2015-PRELIMS-Q172` (Swachh Bharat Mission launched on Gandhi's birth anniversary), found by grepping `db/pyq/*.json`.
- **Mapped:** 2/2 in `pyq_map_DAY-10.json`. **Taught:** 2/2, with one partial-coverage note: GK-DAY-010 lists 12 days; 11 are taught here, World Teachers' Day (5 Oct) is not (see gaps).

## Subtopic coverage

Subtopic `october` covered week-wise across 5 sections (week1 1–7, week2 8–14, week3 15–21, week4 22–31, plus a date-traps revision section). Every section has questions; quick_revision is a clean date-ordered Bengali table (16 lines). Bengal connection is genuine and source-backed (IAF Eastern Air Command's area includes West Bengal; PIB records that West Bengal is not implementing BBBP).

## Gaps (disclosed, never filled from memory)

1. **World Teachers' Day — 5 October:** in the GK bank list (GK-DAY-010) but **not taught**. Multiple searches found no PIB / Ministry of Education / india.gov.in page stating the day and its reason (1966 ILO/UNESCO Recommendation) that could be fetched and quoted; UNESCO's own site is outside this book's allowed publishers (GOVT/NCERT only). Disclosed in the chapter itself (week1 `exam_note` box) and in the PYQ map.
2. **International Day for Disaster Reduction — 13 October** and **International Day for the Eradication of Poverty — 17 October:** not taught — no official GoI/NCERT source could be fetched for either in this run (only UN/coaching pages surfaced).
3. **United Nations Day (24 Oct):** the *reason* usually cited (UN Charter entering into force) could not be quoted from a fetched GoI page; the chapter teaches only what PIB supports — UN Day falls on 24 October (PM's greetings release issued that date, 2017), the UN was founded in 1945, has 193 member states, and India is a founding member. The Charter detail is deliberately not asserted.
4. **World Students' Day (15 Oct):** taught as recorded in the Vice President's PIB-released speech (UN declaration, 2010). Note for the blind-check stage: this popular claim is contested outside GoI sources; the chapter attributes it to the PIB speech rather than asserting it independently.
5. Lal Bahadur Shastri's birth *year/place* (1904, Mughalsarai) are not stated in the fetched PIB tribute release, so the chapter teaches only the date (2 October) and his being a former Prime Minister; the year/place were not filled in from memory.
