# SCI-07 — অ্যাসিড, ক্ষার ও লবণ — Draft Report

- Book: science, code SCI-07, number 7, part chemistry, subtopics: chemistry_acids_bases (verbatim from toc.js). Status DRAFT, verification UNVERIFIED.
- Validator: `node scripts/validateBooks.js` → **chapter.json: OK**.

## Sources actually fetched (browser.open, 2026-11-19)
1. NIOS Senior Secondary Chemistry (313), Lesson 12: Ionic Equilibrium — https://digital.nios.ac.in/content/313en/313_Chemistry_Eng_Lesson12.pdf (publisher NIOS, allowed)
2. e-PG Pathshala, Environmental Chemistry Paper 16, Module 05: Environmental Aqueous Solutions of Gases, Acids and Bases, and pH — https://epgp.inflibnet.ac.in/epgpdata/uploads/epgp_content/S000014ER/P000271/M026138/ET/1515394560paper16_module_05_etext.pdf (publisher EPG, allowed)
3. NCERT Science, Class VII, Ch. 5: Physical and Chemical Changes — https://ncert.nic.in/textbook/pdf/gesc105.pdf (publisher NCERT, allowed; used only for the vinegar+baking soda → CO2, limewater test, and MgO + water → Mg(OH)2 facts actually printed in that chapter)

## Counts
- Claims: 36 (all with verbatim quotes from the fetched pages above; every claim is used)
- Practice questions: 42 (basic 15, moderate 14, difficult 7, exam 6; formats DIRECT, STATEMENT, PAIRS, MATCH, ASSERTION_REASON), across all 6 sections
- Sections: 6 (concepts, reactions, ph_scale, buffers, salt_hydrolysis, acid_rain)

## PYQ candidates
- Found: 8 (2 GK bank items with subtopic chemistry_acids_bases in db/gk/general_science.jsonl — GK-SCI-006, GK-SCI-007 — plus 6 real corpus PYQs from db/pyq: WBCS 2018 Q38 & Q55, WBCS 2019 Q137, WBCS 2023 Q184, Clerkship 2023 Session III Q96, Session IV Q84)
- Mapped: 8; Taught: 4 (WBCS-2018-Q55 vinegar, WBCS-2019-Q137 pH<7, Clerkship-2023-III-Q96 acid rain/SO2, Clerkship-2023-IV-Q84 blood pH)

## Subtopic coverage
chemistry_acids_bases covered for: acid-base concepts (Arrhenius/Bronsted-Lowry/Lewis), strong vs weak electrolytes, pH scale and calculations, buffers and common-ion effect, salt hydrolysis (4 salt types), acid rain chemistry.

## Gaps (disclosed, never filled from memory)
- NCERT Class X Science Ch. 2 "Acids, Bases and Salts" (jesc102.pdf) could NOT be fetched on this machine (browser.open network failure; a second NCERT PDF fetch also failed). Consequently the following standard exam material is NOT taught in this chapter and the related PYQ/bank items are marked taught:false with reasons: indicator colour tables (litmus/turmeric/china rose/methyl orange/phenolphthalein), the naturally occurring acids table (citric/tartaric/oxalic/lactic/methanoic), everyday salts (baking soda composition, washing soda, plaster of Paris, bleaching powder, chlor-alkali), antacid and tooth-decay threshold pH 5.5, acid-rain threshold pH 5.6, body pH range 7.0–7.8.
- No Bengal-specific source fact was available; bengal_connection uses the fetched India-level rainwater pH observation (6–8.5) and says so openly.
- events[] is an empty array (validator permits for non-dated science chapters); people[] and timeline[] carry the concept-history equivalents (Arrhenius 1884, Sorensen 1909, Bronsted-Lowry/Lewis 1923), each claim-backed.
