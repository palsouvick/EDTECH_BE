# ECO-08 — আর্থিক প্রতিষ্ঠান — Draft Report

Status: DRAFT / UNVERIFIED. Validator: see below (run after writing).

## Sources actually fetched (browser.open, 2026-11-19)
1. NCERT, Introductory Macroeconomics XII, Ch.3 Money and Banking — https://ncert.nic.in/textbook/pdf/leec103.pdf
2. RBI, About Us — https://www.rbi.org.in/Scripts/AboutusDisplay.aspx
3. SEBI, About SEBI — https://www.sebi.gov.in/about-sebi.html
4. IRDAI, official home page — https://irdai.gov.in/
5. PIB, Agriculture Development Bank (NABARD) — https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=83666&reg=48&lang=2
6. PIB, EXIM Bank capital infusion (Background) — https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=126757&reg=3&lang=2
7. PIB, SIDBI Foundation Day — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1526527&ui=2&tf=1&pli=1&reg=3&lang=2
8. PIB, NHB share capital / ownership transfer — https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=189067&reg=3&lang=2
9. PIB, PFRDA AUM release (About PFRDA) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1664991&ui=2&tf=1&pli=1&reg=3&lang=2
10. RBI FAQ, DICGC guide — https://www.rbi.org.in/commonperson/english/scripts/FAQs.aspx?Id=272
11. RBI FAQ, NBFCs (updated 2026-11-11) — https://www.rbi.org.in/Scripts/FAQView.aspx?Id=92

All URLs belong to the economy profile's allowed publishers (NCERT / GOVT *.gov.in / RBI).

## Counts
- Claims: 36 (every claim carries a verbatim quote from a fetched page above)
- Practice questions: 42 (basic 15, moderate 12, difficult 9, exam 6), 7 per section across all 6 sections
- Sections: 6 — system_map, regulators, development_banks, nbfc, deposit_insurance, bank_types_acts

## PYQ candidates
- GK bank (db/gk/economy.jsonl, subtopic financial_institutions): 4 — GK-ECO-012, GK-ECO-013, GK-ECO-014, GK-ECO-104
- PYQ corpus (db/pyq/*.json, genuine financial-institutions items): 7 — WBCS 2015 Q60 (NABARD), WBCS 2015 Q69 (industrial credit), WBCS 2015 Q187 (EXIM), WBCS 2017 Q196 (SEBI statutory recommendation), WBCS 2022 Q100 (SEBI full form), WBCS 2024 Q158 (NABARD functions), Clerkship 2023 Session-3 Q90 (UDGAM portal)
- Total candidates: 11; mapped: 11; taught: 8; untaught: 3 (reasons in pyq_map_ECO-08.json)

## Subtopic coverage
financial_institutions (sole registered subtopic): regulators (RBI/SEBI/IRDAI/PFRDA), development banks (NABARD/SIDBI/NHB/EXIM), NBFCs incl. NBFC-MFI and HFC, deposit insurance (DICGC), founding-Act chronology, money-creating system context.

## Gaps (disclosed, not filled from memory)
- CRAFICARD / B. Sivaraman (NABARD's recommending committee): appears in GK-ECO-012 but not in any allowed-publisher page fetched (NABARD's own site is .org, not an allowed publisher for this book) — not taught as a chapter fact.
- MUDRA (GK-ECO-104): mudra.org.in is not an allowed publisher; no fetched PIB/RBI page states MUDRA's refinance-only nature — untaught.
- SEBI statutory-status recommendation (WBCS 2017 Q196) and RBI's UDGAM portal (Clerkship 2023 Q90): not stated on the fetched pages — untaught.
- IFCI (1948) and IDBI history, LIC/GIC, NABARD/SIDBI/NHB head-office cities: not covered by fetched allowed sources — omitted rather than asserted.
- IRDAI's full statutory-purpose sentence was not present in the fetched homepage text; the chapter teaches only its Act-1999 powers and Hyderabad head office from that page.
- Time-sensitive figures carry as-of dates in claim text: DICGC ₹5 lakh limit (RBI FAQ fetched 2026-11-19); NBFC NOF ₹10 crore w.e.f. 2022-10-01 and microfinance income ceiling ₹3,00,000 (RBI NBFC FAQ updated 2026-11-11).
- NCERT Class X Money and Credit PDF (kess203.pdf) could not be fetched (network error); the Class XII Macroeconomics chapter was used instead — no Class X SHG/formal-informal credit content is claimed.
- people[] is empty: no individual is named in the fetched allowed sources in a chapter-relevant role; the validator permits this for non-dated books.
