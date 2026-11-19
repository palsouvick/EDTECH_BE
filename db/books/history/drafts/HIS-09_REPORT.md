# HIS-09 — আদি মধ্যযুগ: শশাঙ্ক, পাল ও সেন এবং আঞ্চলিক রাজ্য — Draft Report

- **Chapter:** HIS-09, part `ancient`, subtopics `early_medieval` (title/part/subtopics verbatim from `BE/db/books/history/toc.js`)
- **Status:** DRAFT · verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/his-09/chapter.json` → **OK**
- **Deliverables:** `chapter.json`, `pyq_map_HIS-09.json`, `REPORT.md` (this file)

## Counts

| Item | Count |
|---|---|
| Claims (all with verbatim quotes from fetched sources) | 70 (c01–c70) |
| Sources fetched and used | 6 (s1–s6) |
| Sections | 7 (s1–s7), each with quick/standard/deep (s7 deep intentionally null — culture survey section) + 1 box each |
| Practice questions | 42 — basic 10, moderate 15, difficult 10, exam 7 (STATEMENT ×2, MATCH ×2, CHRONOLOGY ×1, ASSERTION_REASON ×1, PAIRS ×1, DIRECT ×35); spread across all 7 sections (s1:4, s2:6, s3:8, s4:5, s5:4, s6:10, s7:5), every question carries claim refs |
| PYQ candidates found | 16 |
| PYQ candidates mapped | 16 |
| PYQ candidates taught | 10 |

## Sources actually fetched (browser.open) and used

1. **NCERT Class VI, Our Pasts I, Ch. 9 "New Empires and Kingdoms"** — https://ncert.nic.in/textbook/pdf/fess109.pdf (printed pp. 85–91) → claims c01–c11
2. **NCERT Class VI, Our Pasts I, Ch. 10 "Buildings, Paintings and Books"** — https://ncert.nic.in/textbook/pdf/fess110.pdf (Mahabalipuram monolith passage, p. 97) → claim c12
3. **IGNOU, "State in Early Medieval India", Unit 5: Early Medieval Polities in North India, 7th–12th c. A.D.** — https://egyankosh.ac.in/bitstream/123456789/21992/1/Unit-5.pdf → claims c13–c34, c65, c66, c69, c70 (the chapter's main source for Sasanka, Palas, Senas, tripartite struggle)
4. **IGNOU, "States in India: 7th–13th Century CE", Unit 7: Early Medieval Polities in Peninsular India 6th–8th c. CE** — https://egyankosh.ac.in/bitstream/123456789/102530/1/Unit-7.pdf → claims c35–c39, c67
5. **IGNOU BHIC-132, Unit 4: Kingdoms in the Deccan and the South** — https://egyankosh.ac.in/bitstream/123456789/61907/1/Unit-4.pdf → claims c40–c42 (fetched via the www.egyankosh.ac.in form of the same handle; stored in canonical non-www form to match the book validator's IGNOU host pattern)
6. **NIOS Senior Secondary History (315), Module 1 (Ancient India)** — https://nios.ac.in/media/documents/SrSec315NEW/History_Module1.pdf — Lesson 8 "India Between AD 750–1200" (printed pp. 120–129) and Lesson 1 → claims c43–c64

## Subtopic coverage (registered subtopic: `early_medieval`)

- **s1** Sasanka and Gauda — Bengal's first independent kingdom, Karnasuvarna, Harsha conflict
- **s2** Rise of the Palas — Gopala's election, Dharmapala (Vikramashila, Atisha), Devapala (Utkala/Kamarupa, Shailendra grant)
- **s3** Tripartite struggle for Kanauj — Palas, Gurjara-Pratiharas, Rashtrakutas; Dhruva, Dharmapala, Nagabhatta, Mihira Bhoja
- **s4** Pala decline, Kaivarta revolt (Divya, Ramapala), Sena rise and fall (Vijayasena → Lakshmanasena, 1178)
- **s5** Samanta system and land grants — feudalism debate, brahmadeyas, Pala village administration
- **s6** Southern powers — Pallavas, Chalukyas (Pulakeshin II vs Harsha), Rashtrakutas (Kailasha temple), Cholas (Rajaraja I, Rajendra I, Gangaikonda), sabha/ur local bodies
- **s7** Culture — Nagara/Dravida/Vesara temple styles, regional languages, Rajatarangini (Kalhana), Gita Govinda (Jayadeva)
- Plus: 7 events, 9 people, 8-entry timeline (606–1178 CE), 7 terms, 3 cause-effect chains, 6 exam-focus points, a Bengal-connection essay (this is a Bengal-core chapter), 14 quick-revision one-liners.

## PYQs

Candidates were extracted from `BE/db/books/history/pyq_chapters.json` (chapter == HIS-09 or alt == HIS-09); question texts cross-checked in the `BE/db/pyq/*.json` bank files. The polity `pyq_map.json` was also checked — it contains **zero** HIS-09 entries.

- **Taught (10):** WBCS-2016-Q149 (Vikramashila–Dharmapala), WBCS-2016-Q155 (tripartite struggle), WBCS-2018-Q164 (Gangaikondacholapuram–Rajendra I), WBCS-2021-Q36 (Vikramsila–Dharmapala), WBCS-2023-Q128 (Pulakeshin II vs Harsha; primary HIS-08), WBCS-2023-Q145 (Gangaikonda–Rajendra I), Clerkship-2005-Q62 (Gopala), Clerkship-2007-Q8 (Mahabalipuram rathas–Pallavas, taught via the stated NCERT monolith + Pallava-coast chain), Clerkship-2007-Q9 (Jayadeva–Lakshmana Sena, with the NIOS wording discrepancy disclosed in the chapter's exam_note), Clerkship-2009-S2-Q2 (Rajatarangini–Kalhana).
- **Untaught (6), each with the specific reason in `pyq_map_HIS-09.json`:** WBCS-2017-Q83 (Sisodiya/Rana Pratap — primary HIS-13, not in fetched sources), WBCS-2021-Q27 (Sandhyakar Nandi/Ramacharitam — absent from all fetched sources), WBCS-2021-Q63 (Alberuni's first reference to Khajuraho — the temple/Chandella part is taught, the Alberuni point is a source gap), WBCS-2022-Q144 ('Balhara' — term absent from fetched sources), WBCS-2022-Q197 (Arumolivarman — absent from fetched sources), Clerkship-2005-Q65 (Kamarupa = Assam equation not stated in fetched sources, though Kamarupa itself is taught).

## Gaps (disclosed, never filled from memory)

1. **WBBSE e-textbooks unreachable** from this machine (per project rule, not retried) — no WBBSE source used.
2. **NCERT Class VII, Our Pasts II, Ch. 2 "New Kings and Kingdoms"** (gess102.pdf) — fetch failed with a network error, so the NCERT layer rests on Class VI (fess109/fess110); early-medieval depth comes from IGNOU + NIOS instead.
3. **6 of 16 PYQs untaught** for the source-gap reasons above (Sandhyakar Nandi, Balhara, Arumolivarman, Alberuni–Khajuraho reference, Kamarupa = Assam, Sisodiya/Rana Pratap).
4. **Source discrepancy disclosed in-chapter:** NIOS places the Gita Govinda "under the Pala kings" while the Clerkship 2007 key expects Lakshmana Sena's court; the chapter teaches the exam answer and shows both source sentences in an exam_note box.
5. `related_facts` left empty — no GK fact codes were invented; cross-links can be added when the GK bank mapping is confirmed.
