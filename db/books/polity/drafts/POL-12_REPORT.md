# POL-12 — হাইকোর্ট, অধস্তন বিচারব্যবস্থা ও বিচারবিভাগের স্বাধীনতা — Draft Report

Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Deliverables
- `chapter.json` — complete chapter (11 parts), 7 sections
- `pyq_map_POL-12.json` — PYQ mapping (this file's companion)

## Sources actually fetched (via browser text-fetch)
1. **The Constitution of India [As on 1st May, 2024]**, Legislative Department, Ministry of Law and Justice — https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf — Articles 50, 211, 214–237 read verbatim (pp. 97–110 of the printed text, plus Part IV for Art. 50).
2. **Indian Constitution at Work (Class XI), Chapter 6: Judiciary**, NCERT — https://ncert.nic.in/textbook/pdf/keps206.pdf — independence, appointment/collegium, removal, Ramaswami episode, structure chart, writ/appellate jurisdiction, PIL (printed pp. 124–137).

## Counts
- Claims: **57** (c01–c57), every claim with a verbatim quote from one of the two fetched sources; every claim is used at least once (validator-enforced).
- Practice questions: **44** — basic 12, moderate 12, difficult 12, exam 8 (formats: DIRECT, STATEMENT ×4, MATCH, PAIRS ×2, ASSERTION_REASON ×2, CHRONOLOGY). Every section has ≥4 questions; every question cites its supporting claim ids.

## PYQs
- `pyq_map.json` has **0 entries under POL-12**, so candidates were searched in `~/workspace/edtech/BE/db/pyq` for genuine High Court / subordinate courts / judiciary-independence questions.
- Candidates found: **7** — mapped: **7**, taught: **5**, untaught: **2**.
  - Taught: WBCS 2019 Q119 (district judge appointment, Art. 233), WBCS 2021 Q29 (HC Chief Justice appointed by President, Art. 217), Clerkship 2004 Q59 (FR enforcement — SC and HC), WBCS 2022 Q132 (judiciary as protector of FR), WBCS 2023 Q29 (independent judiciary as federal feature).
  - Untaught: Clerkship 2009 Session-II Q1 ('Green Bench' — term absent from both sources; source gap), WBCS 2015 Q156 (Leader of Opposition's rank — Parliament topic, HC judge only an option).

## Subtopic coverage (subtopics: judiciary)
- High Court: establishment (214), court of record (215), composition (216), appointment & consultation (217), qualifications, oath (219), tenure/removal/transfer (217–218, 222), salaries (221), practice restriction (220), acting/additional/retired judges (223, 224, 224A), existing jurisdiction (225), writs (226), superintendence (227), case transfer (228), own staff & charged expenses (229), UT extension (230), common High Court (231).
- Subordinate judiciary: district judges (233, 233A), other judicial service recruitment (234), control (235), definitions (236), magistrates (237), district/subordinate court functions (NCERT chart).
- Independence: meaning & safeguards (NCERT), security of tenure, difficult removal (Ramaswami case), financial independence, contempt, bar on legislative discussion (211 + NCERT), separation from executive (Art. 50).

## Gaps (disclosed, not filled)
- **Calcutta High Court specifics** (establishment year 1862, judges' strength, benches): not present in either fetched source, so the Bengal connection is written only from Articles 214/226/233/235/50 as they apply to West Bengal — no dates or local facts asserted.
- **'Green Bench'** (Clerkship 2009 PYQ): term absent from the Constitution and NCERT sources; recorded as untaught in the PYQ map.
- **Number of High Courts / current judges' strengths**: not in the sources used; deliberately omitted rather than stated from memory.
- Constitution PDF text extraction is two-column scrambled; quotes were assembled only from fragments actually visible in the fetched text (notably the pre-NJAC consultation wording in Art. 217/222/224 is quoted via the official footnote recording the struck-down substitution, claim c07/c50).
- No `people` beyond Justice V. Ramaswami: he is the only person the fetched sources name in this chapter's scope.
