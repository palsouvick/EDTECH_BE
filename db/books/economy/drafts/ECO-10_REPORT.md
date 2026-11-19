# ECO-10 — বৈদেশিক ক্ষেত্র ও বাণিজ্য — Draft Report

- **Chapter:** ECO-10, part `sectors`, subtopics `["external_sector"]` (verbatim from `economy/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/eco-10/chapter.json` → **OK**
- **Structure:** 6 sections × 7 practice questions each; events 6, people [] (no person-centred content in the sources — kept as an empty array per instructions), timeline 9 entries (1948–2006), terms 16, cause_effect 3, quick_revision 13.

## Sources actually fetched (browser.open, 2026-11-19)

| id | Title | URL |
|---|---|---|
| s1 | Introductory Macroeconomics, Class XII, Ch. 6: Open Economy Macroeconomics (NCERT) | https://ncert.nic.in/textbook/pdf/leec106.pdf |
| s2 | Understanding Economic Development, Class X, Ch. 4: Globalisation and the Indian Economy (NCERT) | https://ncert.nic.in/textbook/pdf/jess204.pdf |
| s3 | Indian Economic Development, Class XI, Ch. 3: Liberalisation, Privatisation and Globalisation — An Appraisal (NCERT) | https://ncert.nic.in/textbook/pdf/keec103.pdf |
| s4 | PIB: Special Economic Zones — policy, SEZ Act 2005, SEZ Rules 2006 (Ministry of Commerce and Industry) | https://www.pib.gov.in/PressReleasePage.aspx?PRID=1703791&reg=3&lang=2 |
| s5 | PIB: Cabinet approves recapitalisation of Export-Import Bank of India (Ministry of Finance) | https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=187523&reg=3&lang=2 |
| s6 | PIB (Kolkata, 10 June 2026): Falta SEZ — exports/employment/investment growth FY 2014-15 to FY 2025-26 | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2271151&reg=48&lang=2 |

All six URLs belong to the economy profile's allowed publishers (NCERT / GOVT incl. pib.gov.in). No RBI page was needed: every RBI-adjacent fact used (BoP publication practice, EXIM regulation) is quoted from NCERT/PIB text itself.

## Counts

- **Claims:** 50 (c01–c50), every one with a verbatim quote from a fetched page above; all 50 are referenced by sections/blocks/questions (validator enforces this).
- **Questions:** 42 — basic 15, moderate 14, difficult 7, exam 6 (STATEMENT ×2, ASSERTION_REASON, CHRONOLOGY, MATCH + 1); formats also include 36 DIRECT. Every section has exactly 7 questions.

## PYQ candidates

- **GK bank (`db/gk/economy.jsonl`):** 0 items carry subtopic `external_sector` (the file's 32 items cover basics, rbi_banking, inflation_income, budget_tax, plans_reforms, agri_industry, financial_institutions, schemes only). So no GK-code candidates exist for this chapter.
- **PYQ corpus (`db/pyq/*.json`):** 8 genuinely on-topic items found by full-text scan (BoP, FDI, SEZ, WTO/GATT, EXIM, EPZ):
  - **Mapped & taught (6):** WBCS 2015 Q187 (EXIM Bank), WBCS 2017 Q188 (SEZ Act in force 2006), WBCS 2021 Q112 (Falta EPZ), WBCS 2022 Q94 (WTO ← GATT), WBCS 2023 Q146 (BoP capital account), Clerkship 2006 Q24 (SEZ full form).
  - **Mapped, untaught (2), each with a specific reason in `pyq_map_ECO-10.json`:** WBCS 2016 Q137 (2014-15 FDI sector ranking — dated official statistic absent from all fetched sources); WBCS 2023 Q142 (WTO Appellate Body seat, Geneva — not stated in any fetched source).

## Subtopic coverage (`external_sector`)

Open economy & trade flows (exports as injection, imports as leakage, NX, BoT) · BoP structure (current account, invisibles, transfers/remittances, surplus/deficit meaning, BPM6 note) · capital account & financing (FDI/FII/loans, CAD financing, official reserve sale, autonomous vs accommodating, errors & omissions) · exchange rates (forex market, demand for forex, flexible/fixed/managed floating, depreciation vs devaluation, appreciation) · 1991 BoP crisis & trade-policy reforms (reserves < a fortnight, $7 billion World Bank/IMF loan as stated in NCERT IED, rupee devaluation, QR dismantling, tariff cuts, QR fully removed April 2001, market-determined rates) · foreign investment & institutions (MNC, foreign investment, FII, outsourcing, globalisation, WTO aim/rules/GATT succession, SEZ features + Act chronology, EXIM Bank, Falta EPZ→SEZ as the Bengal connection).

## Gaps (disclosed, never filled from memory)

1. **WTO headquarters / Appellate Body (Geneva)** — not in any fetched source; PYQ WBCS 2023 Q142 left untaught with reason.
2. **Year-wise FDI sector rankings** (e.g. top sector 2014-15) — time-specific DPIIT statistics not carried by the fetched textbooks/PIB releases; PYQ WBCS 2016 Q137 left untaught with reason.
3. **FEMA, trade composition data, current forex-reserve levels, India's top export/import partners** — no fetched source supported them in this pass, so they are not taught. (Reserve figures are time-sensitive and would need an as-of-dated RBI source in a later pass.)
4. **People array is empty** — the fetched sources name no individual central to this chapter (no person is quoted or described); the key is kept with an empty array rather than inventing entries.
5. NCERT IED's "$7 billion" loan figure is taught **as NCERT states it**, attributed in the claim text ("as stated in NCERT IED").
6. The Falta PIB release (s6) is dated 10 June 2026 on its own page; only its historical facts (1984 EPZ origin, later SEZ categorisation, jurisdiction) are used — its FY 2025-26 growth figures are not taught.
