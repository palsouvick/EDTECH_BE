# ECO-06 — রিজার্ভ ব্যাংক ও ব্যাংকিং ব্যবস্থা — Draft Report

- **Chapter:** ECO-06, part `banking_finance`, subtopic `rbi_banking` (title/part/subtopics verbatim from `db/books/economy/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js` → **OK**
- **Deliverables:** `chapter.json`, `pyq_map_ECO-06.json`, this report — in `~/workspace/edtech/bookwork/eco-06/`

## Counts

- Claims: **38** (every claim carries a verbatim quote from a page actually fetched with browser.open)
- Practice questions: **42** (basic 12, moderate 15, difficult 9, exam 6; formats DIRECT, STATEMENT, CHRONOLOGY, MATCH, PAIRS, ASSERTION_REASON; all 6 sections covered)
- Sections: 6 — establishment, functions, currency_issue, monetary_policy, credit_control_tools, banking_structure

## Sources actually fetched (browser.open)

1. **About Us — Reserve Bank of India** (RBI) — https://www.rbi.org.in/Scripts/AboutusDisplay.aspx — establishment, preamble, Central Board, BFS, main functions, subsidiaries.
2. **NCERT Class XI, Indian Economic Development, Ch. 3 (LPG: An Appraisal)** (NCERT) — https://ncert.nic.in/textbook/pdf/keec103.pdf — financial-sector regulation by RBI, private banks and ~74% foreign-investment limit after reforms.
3. **Currency FAQs — Reserve Bank of India** (RBI, updated 15 Apr 2025) — https://www.rbi.org.in/Scripts/BS_CurrencyFAQView.aspx?Id=136 — Sections 22/25/26, coins vs notes, ₹1 note, currency chests, presses (incl. Salboni) and mints (incl. Kolkata).
4. **Minutes of the MPC Meeting, October 5–7, 2026** (RBI) — https://www.rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=63839 — Section 45ZB/45ZL; repo 5.50%, SDF 5.25%, MSF/Bank Rate 5.75% as of 7 Oct 2026.
5. **Governor's Statement, June 6, 2025 (Press Release 2025-2026/490)** (RBI) — https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=60605 — 4% inflation target; CRR cut to 3.0% of NDTL releasing ~₹2.5 lakh crore.
6. **Economic Survey 2021-22, Fiscal Developments, p. 85** (GOVT / indiabudget.gov.in) — https://www.indiabudget.gov.in/budget2022-23/economicsurvey/ebook_es2022/files/basic-html/page85.html — 14 banks nationalised in 1969 (Act of 1970), 6 more in 1980.
7. **RBI (Commercial Banks – CRR and SLR) Directions, 2025** (RBI, updated 9 Oct 2026) — https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=13160 — SLR 18% of NDTL, SLR asset forms, no interest on CRR, LAF/MSF/Scheduled Bank definitions.
8. **Governor's Statement, March 27, 2020** (RBI) — https://www.rbi.org.in/scripts/Bs_viewcontent.aspx?Id=3847 — reverse repo rate as the floor of the LAF corridor.

All source URLs belong to the economy profile's allowed publishers (NCERT, GOVT, RBI).

## PYQ candidates

- **Found: 21** — 2 GK bank items with subtopic `rbi_banking` in `db/gk/economy.jsonl` (GK-ECO-002, GK-ECO-003) + 19 genuine RBI/banking items grepped from `db/pyq/*.json` (WBCS Prelims 2015–2024, IDO 2019, KP Constable 2023, WBPSC Miscellaneous 2023). Arithmetic interest questions and unrelated 'bank' word-matches were excluded.
- **Mapped: 21/21** in `pyq_map_ECO-06.json`.
- **Taught: 9** — GK-ECO-002, GK-ECO-003, IDO-2019-Q12, WBCS-2015-Q162, WBCS-2017-Q187, WBCS-2017-Q197, WBCS-2021-Q113, WBCS-2022-Q45, WBCS-2023-Q170.
- **Not taught: 12**, each with a specific reason in the map — chiefly: NABARD/EXIM/SEBI items belong to ECO-08 (financial institutions); PCA (WBCS-2019-Q109) belongs with ECO-07 supervision detail; ECF, financial-inclusion definition, the 2022 new-department item, the Rajan book item, Imperial Bank→SBI renaming, and the NYSE/talking-ATM trivia are not stated in any fetched allowed source and were not filled from memory.

## Subtopic coverage

`rbi_banking` is fully covered: RBI establishment/history, functions, currency issue, MPC and monetary policy, credit-control tools (repo/reverse repo/CRR/SLR/MSF/LAF), banking structure, nationalisation and reforms. Neighbouring subtopics (`banking_operations`, `financial_institutions`) are deliberately left to ECO-07/ECO-08; overlapping PYQs are mapped as untaught with that reason.

## Time-sensitive figures (all carry as-of dates in claim text)

- Repo 5.50%, SDF 5.25%, MSF/Bank Rate 5.75% — as of the MPC resolution of **7 October 2026**.
- CRR 3.0% of NDTL — RBI decision of June 2025, effective in tranches Sep–Nov 2025.
- SLR 18% of NDTL — RBI CRR/SLR Directions 2025, updated **9 October 2026**.

## Gaps (disclosed, not filled)

1. **NCERT Class XII Macroeconomics Ch. 3 (Money and Banking)** and **NCERT Class X Ch. 3 (Money and Credit)** PDFs could not be fetched on this machine (network errors on both attempts). Their standard content (credit creation, money multiplier, qualitative tools such as margin requirements and moral suasion, commercial-bank functions in detail) is therefore **not taught** in this draft; the chapter relies on RBI's own pages and NCERT Class XI instead. A later pass with those PDFs fetchable could add a credit-creation section.
2. **Qualitative credit-control tools** (margin requirements, moral suasion, selective controls) — no fetched allowed source states them; omitted.
3. **Open Market Operations** are mentioned only via the LAF framework; no definitional quote was fetched, so no standalone OMO claim/question was written.
4. **Financial inclusion definition, PCA framework, ECF, Imperial Bank→SBI history** — asked in real PYQs but absent from fetched sources; recorded as untaught in the PYQ map rather than asserted.
5. **Governor's name** (Sanjay Malhotra) is time-sensitive; the chapter flags in the people entry that it must be re-verified before exams.
6. WBBSE sources are not in the economy validator profile (publishers: NCERT, GOVT, RBI only), so none were used.
