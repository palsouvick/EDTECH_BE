# HIS-07 — মৌর্য-পরবর্তী ভারত ও সঙ্গম যুগ: Draft Report

- **Chapter:** HIS-07, part `ancient`, subtopics `post_maurya_sangam` (title/part/subtopics verbatim from `db/books/history/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Deliverables:** `chapter.json`, `pyq_map_HIS-07.json`, this report
- **Validator:** `node scripts/validateBooks.js chapter.json` → **OK** (100 claims, all used; 42 questions)

## Sources actually fetched (browser text-fetch, 2026-11-19)

| id | Source | URL |
|---|---|---|
| s1 | NCERT, Our Pasts I, Class VI, Ch. 8: Villages, Towns and Trade | https://ncert.nic.in/textbook/pdf/fess108.pdf |
| s2 | NCERT, Themes in Indian History Part I, Class XII, Theme 2: Kings, Farmers and Towns | https://ncert.nic.in/textbook/pdf/lehs102.pdf |
| s3 | NCERT, Our Pasts I, Class VI, Ch. 10: Buildings, Paintings and Books | https://ncert.nic.in/textbook/pdf/fess110.pdf |
| s4 | e-PG Pathshala / INFLIBNET e-books, Outlines of Indian History: Sunga, Kanva and Satavahana dynasties | https://ebooks.inflibnet.ac.in/icp01/chapter/sunga-kanva-and-satavahana-dynasties/ |
| s5 | e-PG Pathshala / INFLIBNET e-books, Outlines of Indian History: Indo-Greeks, Sakas and Kushanas | https://ebooks.inflibnet.ac.in/icp01/chapter/indo-greeks-sakas-and-kushanas/ |
| s6 | e-PG Pathshala / INFLIBNET e-books, Indian Literary Criticism and Theory: Tholkappiyar: Tholkappiyam | https://ebooks.inflibnet.ac.in/engp11/chapter/tholkappiyar-tholkappiyam/ |

Also fetched and used for orientation (not cited as claim sources): NCERT Class VI Ch. 7 (From a Kingdom to an Empire, fess107.pdf) and Ch. 9 (New Empires and Kingdoms, fess109.pdf).

## Counts

- **Claims:** 100 (c01–c100), every one with a verbatim quote from a fetched source above; every claim is used by at least one section/event/person/timeline/question (validator-enforced).
- **Questions:** 42 — basic 10, moderate 15, difficult 10, exam 7 (STATEMENT ×3, MATCH ×2, CHRONOLOGY ×1, PAIRS ×1, ASSERTION_REASON ×1 among exam level); all 7 sections tested.
- **Sections:** 7 (s1 reorganisation map; s2 Shunga–Kanva–Kalinga; s3 Indo-Greeks & Shakas; s4 Kushanas & Kanishka; s5 Satavahanas; s6 Sangam age; s7 trade, coins & towns). Plus 8 events, 19 people, 9 timeline rows, 13 terms, 2 cause–effect chains, 8 exam-focus points, 15 quick-revision points.

## PYQs (from `db/books/history/drafts/pyq_candidates_HIS-07.json`; polity `pyq_map.json` has no HIS-07 entries)

- **Candidates found:** 10
- **Mapped:** 10 (6 taught, 4 untaught with reasons in `pyq_map_HIS-07.json`)
- **Taught (6):** Menander most famous Indo-Greek (WBCS 2016); Ashvaghosha–Buddhacharita (WBCS 2018); Sakabda 78 CE (WBCS 2021 + Clerkship 2006); Nanaghat–Satakarni I (WBCS 2023); Kanishka's capital Purushapura (WBCS 2023)
- **Untaught (4):**
  - Mrichhakatikam–Shudrak (WBCS 2019) — primary chapter HIS-08; no fetched source mentions it.
  - Thiruvalluvar–Tirukkural, 1,330 couplets (WBCS 2024) — no fetched authorised source states authorship/couplet count; gap disclosed to students in the s6 exam_note.
  - Agathocles' Krishna–Balarama coins (WBCS 2024) — no fetched source mentions them.
  - 'Vindhya Adhipati' = Gautamiputra Satakarni (Clerkship 2004) — the king is taught in s5, but the specific epithet appears in no fetched source.

## Subtopic coverage (`post_maurya_sangam`)

Post-Mauryan polity (Shunga, Kanva, Kharavela/Chedi, Indo-Greeks, Shakas, Parthians, Kushanas, Satavahanas), Kanishka & the Saka era, Mahayana Buddhism and Kanishka's court scholars, land grants, coinage and Roman/Silk Route trade, guilds and towns, Gandhara/Mathura art (in s4 deep), and the Sangam age (muvendar, Sangam literature, Akam/Puram, thinai, Tolkappiyam, village society, Silappadikaram/Manimekalai) — all covered from fetched claims.

## Gaps (disclosed, never filled from memory)

1. **WBBSE e-textbooks unreachable** from this machine (per brief) — chapter is NCERT + INFLIBNET only; no WBBSE source attempted.
2. **IGNOU eGyanKosh unreachable** — egyankosh.ac.in fetch failed (network error); no IGNOU claims used. NIOS official PDF URL could not be obtained verbatim from search results, so NIOS was not used either; the INFLIBNET e-PG Pathshala modules covered the same ground.
3. **New NCERT Class VII Ch. 6 'The Age of Reorganisation'** (Exploring Society, Part I) is exactly on-topic, but its ncert.nic.in PDF could not be fetched (the located chapter PDF is hosted off-site; one direct fetch attempt failed) — not cited; noted here for a future completion pass.
4. **Kanishka's date:** NCERT XII prints "c. 78 CE?" with a question mark while INFLIBNET states 78 CE plainly; both positions are shown to students (s1 exam_note). Exam answer remains 78 CE.
5. **Tirukkural/Thiruvalluvar, Agathocles' Krishna–Balarama coins, 'Vindhya Adhipati' epithet, Shudrak's Mrichhakatikam** — see PYQ section above; none asserted beyond sources.
6. **Bengal connection** is the nearest honest link only (Bay of Bengal trade routes; trade networks ignoring political boundaries) — no Bengal dynasty of this period is covered by the fetched sources, and the chapter says so.
7. `related_facts` left empty — no GK fact codes for this subtopic were verified against the fact bank during this run.
