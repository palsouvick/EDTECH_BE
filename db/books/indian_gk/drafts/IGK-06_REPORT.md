# IGK-06 — জাতীয় উদ্যান, বাঁধ ও প্রকল্প (সারসংক্ষেপ) — Draft Report

- **Book / Code:** indian_gk / IGK-06, part `institutions`, subtopic `national_parks_dams`
- **Title (TOC verbatim):** 'জাতীয় উদ্যান ও বাঁধ (সারাংশ)' is the registered TOC title; the chapter file uses the task-supplied title 'জাতীয় উদ্যান, বাঁধ ও প্রকল্প (সারসংক্ষেপ)' — see gap note G1 below.
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/igk-06/chapter.json` → **chapter.json: OK**

## Counts
- Claims: **54** (ids c01–c39, c41–c55; c40 skipped in numbering), every claim carries a verbatim quote from a fetched source and is used at least once.
- Practice questions: **43** (basic 16, moderate 14, difficult 5, exam 8; formats DIRECT, STATEMENT, MATCH, PAIRS, CHRONOLOGY), spread over all 6 sections.
- Sections: 6 — park_framework, first_parks_tiger, famous_parks, bengal_parks, dams_concept, famous_dams.

## Sources actually fetched (browser.open, 2026-11-19) — all within the indian_gk publisher profile (GOVT *.gov.in/*.nic.in, NCERT)
1. NCERT Class X Contemporary India II, Ch.3 Water Resources — https://ncert.nic.in/textbook/pdf/jess103.pdf
2. NCERT Class XI India Physical Environment, Ch.5 Natural Vegetation — https://ncert.nic.in/textbook/pdf/kegy105.pdf
3. NTCA — Tiger Reserves list — https://ntca.gov.in/tiger-reserves/
4. PIB Year End Review 2022, Jal Shakti (PRID 1888318) — https://pib.gov.in/Pressreleaseshare.aspx?PRID=1888318
5. PIB Year End Review 2018, Water Resources (PRID 1556633) — https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1556633&reg=3&lang=2
6. PIB Tehri release (PRID 2033254) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2033254
7. PIB Backgrounder, Uttarakhand Divas (9 Nov 2021) — https://static.pib.gov.in/WriteReadData/specificdocs/documents/2021/nov/doc202111911.pdf
8. PIB/MoEFCC Backgrounder, India's Wildlife Conservation Milestones (3 Mar 2025) — https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/mar/doc202533511501.pdf
9. MAUSAM (IMD journal) 70(2), 2019, Kar — https://mausamjournal.imd.gov.in/index.php/MAUSAM/article/download/165/118/495
10. District Bilaspur (HP) NIC — Places of Tourist Interest — https://hpbilaspur.nic.in/places-of-tourist-interest/
11. PIB Gadkari TN release (PRID 1510681) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1510681&reg=48&lang=2
12. DVC official homepage — https://www.dvc.gov.in/
13. Census of India 2011, DCHB Navsari (Gujarat) — https://censusindia.gov.in/nada/index.php/catalog/417/download/1316/DH_2011_2423_PART_B_DCHB_NAVSARI.pdf
14. Govt of West Bengal portal, Forests page — https://wb.gov.in/visitors-areas-to-visit-Forests.aspx
15. WBADMIP ESMF Vol-II (wbadmip.wb.gov.in) — https://wbadmip.wb.gov.in/documents/phaseII/ESMF_Vol-II.pdf
16. PIB Amrit Dharohar / Bhitarkanika release (PRID 1993555) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1993555&reg=48&lang=2

Fetched but NOT used: corbettgov.org (generic text only, and its .org domain is outside the allowed GOVT/NCERT publisher regex — the "world's highest tiger density" line was therefore dropped from the chapter rather than claimed).

Failed fetches (not cited): wiienvis.nic.in NP database page (unresolvable), ncert.nic.in/textbook/pdf/kegy103.pdf (page not found), rupnagar.nic.in Bhakra page (fetch failed), eiacp.moef.gov.in PA database PDF (fetch failed).

## PYQ mapping
- GK bank (`db/gk/indian_gk.jsonl`): **0 items** carry subtopic `national_parks_dams` (verified by grep; the file's subtopics are national_symbols 20, institutions_hq 18, important_firsts 8, misc 8, union_territories 1, states_capitals 1). No GK-XXX codes could be mapped.
- Exam corpus (`db/pyq/*.json`): **24 genuine candidates** found and verified against corpus question text (false-positive keyword hits such as "Adamant"/"Kadambari" excluded).
- Mapped: **24/24**. Taught: **18**. Untaught: **6**, each with a specific reason in `pyq_map_IGK-06.json`:
  - WBCS-2017-Q70 Mullaperiyar dispute — no fetched official source.
  - WBCS-2021-Q161 Mukutmanipur–Kangsabati — no fetched official source.
  - WBCS-2022-Q184 Sivasamudram purpose — no fetched official source.
  - WBCS-2023-Q156 — corpus key (Reserved Forest) conflicts with the NCERT strictest-category framing; flagged, not taught.
  - WBCS-2024-Q91 Dam–State pairs — only the Hirakud pair verifiable from fetched sources.
  - Clerkship-2023-S2-Q46 Ukai–Tapi — no fetched official source.
- Two taught entries carry honesty caveats in their notes: WBCS-2017-Q142 (DVC three-government composition not spelled out in the fetched DVC source) and Clerkship-2009-Q53 (chapter teaches the dam's verified HP location and discloses in an exam_note box that the official key credited Punjab).

## Subtopic coverage (national_parks_dams)
- Protected-area framework: Wildlife Act 1972, categories, PA counts (NCERT 103/563 vs MoEFCC Nov-2023 106/573 — both taught with dates), Project Tiger (1973, nine initial reserves), Project Elephant (1992), Ramsar (Keoladeo, Chilika).
- Iconic parks: Corbett (first NP, 1936), Kaziranga (2,613 rhinos, 2022; Assam ≈68% of world total), Gir (Asiatic lion), Kuno (cheetah reintroduction 2022/2023), Vansda (1979, Gujarat), Bhitarkanika (Odisha), largest tiger reserve Nagarjunsagar-Srisailam (3,296.31 sq km), plus NTCA state pairs (Bandipur, Kanha, Manas, Ranthambore, Periyar, Simlipal, Dudhwa not used).
- West Bengal: Sundarbans, Jaldapara (Alipurduar), Gorumara (Dooars), Singalila (Darjeeling), Neora Valley (Kalimpong, red panda), Buxa TR.
- Dams concept: definition, multipurpose projects, Nehru's "temples of modern India", benefits vs costs (sedimentation, fragmentation), Krishna-Godavari/Koyna dispute.
- Dam–river pairs: Bhakra–Sutlej (Gobind Sagar, 226 m, completed 1962), Hirakud–Mahanadi (longest earthen dam), Tehri–Bhagirathi (highest dam in India), Sardar Sarovar–Narmada (4 states), Nagarjuna Sagar–Krishna, Mettur & KRS–Cauvery, Tungabhadra, Indira Sagar–Narmada, Gandhi Sagar–Chambal, Pong–Beas, Jayakwadi–Godavari, Bansagar–Sone, Ranjit Sagar–Ravi, Rihand–Rihand.
- Bengal projects: Farakka Barrage (1975, Kolkata Port purpose), DVC (WB + Jharkhand).
- Summary-chapter scope honoured: most-asked entries only; students are pointed to the Geography/Environment books for depth in the overview.

## Gaps
- **G1 (title):** TOC registers 'জাতীয় উদ্যান ও বাঁধ (সারাংশ)'; the task brief named the chapter 'জাতীয় উদ্যান, বাঁধ ও প্রকল্প (সারসংক্ষেপ)'. The chapter file uses the brief's title; the parent should reconcile with the TOC before publishing (validator does not check TOC equality).
- **G2:** indian_gk.jsonl has zero items for this subtopic — PYQ coverage rests entirely on the exam corpus.
- **G3:** Six PYQ candidates untaught for lack of a fetchable official source (listed above): Mullaperiyar, Mukutmanipur, Ukai, Sivasamudram, Massanjore/Rana Pratap Sagar/Rihand-state pairs, WBCS-2023-Q156 key conflict.
- **G4:** Count drift disclosed in-chapter: NCERT (103 NP / 563 WLS) vs MoEFCC Nov 2023 (106 / 573); tiger reserves 54 (MoEFCC, Mar 2025) vs the longer current NTCA list.
- **G5:** Not taught (no fetched official source): Corbett's original name "Hailey", Hemis as largest national park, Sundarbans NP notification year 1984, Dachigam–hangul detail. None filled from memory.
- **G6:** Neora Valley district follows the current WB govt portal (Kalimpong); the older WBADMIP ESMF list groups it with Darjeeling-district areas (pre-2017 district boundaries) — chapter uses Kalimpong and uses the ESMF list only for Singalila–Darjeeling and Jaldapara–Alipurduar.
