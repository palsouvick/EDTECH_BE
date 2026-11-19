# ECO-02 — মুদ্রাস্ফীতি ও জাতীয় আয় — Draft Report

Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Sources actually fetched (browser.open, 2026-11-19)

1. **NCERT, Introductory Macroeconomics, Class XII, Ch. 2: National Income Accounting** — https://ncert.nic.in/textbook/pdf/leec102.pdf (s1)
2. **RBI Bulletin — Evolution of Monetary Policy in India (Governor's address)** — https://rbi.org.in/scripts/BS_ViewBulletin.aspx?Id=20869 (s2)
3. **RBI Speech — Central Banking in the Global South (90th-year conference)** — https://www.rbi.org.in/SCRIPTs/BS_SpeechesView.aspx?Id=1482 (s3)
4. **PIB — Consumer Price Index on Base 2024=100 (MoSPI release, Jan 2026 data)** — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2227012&reg=3&lang=1 (s4)
5. **PIB — Revised Wholesale Price Index and New Producer Price Indices (DPIIT)** — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2267963&reg=48&lang=2 (s5)

All URLs belong to the economy profile's allowed publishers (NCERT, GOVT *.gov.in, RBI).

## Counts

- Claims: **35** (c01–c35), each with a verbatim quote from a fetched source; every claim is used.
- Practice questions: **42** — basic 16, moderate 16, difficult 7, exam 3 (STATEMENT ×5, ASSERTION_REASON ×1 among them); all 6 sections tested.
- Sections: 6 — national_income_basics, aggregates_ladder, nominal_real_deflator, gdp_welfare_limits, inflation_meaning_causes, measuring_controlling_inflation.

## Subtopic coverage (inflation_income)

Covered: GDP/final goods/double counting, three methods, stock vs flow, GDP→GNP→NNP ladder, depreciation, NFIA, market price vs factor cost, National Income = NNP at FC, PI/PDI, nominal vs real GDP, GDP deflator, GDP-and-welfare limits (distribution, non-monetary exchanges, externalities), inflation meaning, demand-pull vs cost-push, CPI/WPI definitions, publishers and current base years (CPI 2024, WPI 2022–23 — time-sensitive figures carry as-of dates in claims c29/c30/c32), CPI vs deflator, FIT framework (2016), 4% ± 2% target, MPC/repo, failure definition (3 consecutive quarters).

## PYQ candidates

Found **15** candidates: 2 GK bank items with subtopic `inflation_income` (GK-ECO-004, GK-ECO-005, from `db/gk/economy.jsonl`) and 13 genuine WBCS Prelims items grepped from `db/pyq/*.json` on this chapter's topic or its immediate borders. Mapped in `pyq_map_ECO-02.json`: **6 taught** (GK-ECO-004, GK-ECO-005, WBCS 2021 Q120, WBCS 2024 Q55, WBCS 2024 Q129, WBCS 2017 Q187), **9 untaught** with specific reasons (belong to ECO-03/04/05/06/09, or rest on a concept absent from the fetched sources).

## Gaps (disclosed, not filled)

- **Per-capita income**: no verbatim definition found in the fetched NCERT chapter (the term does not appear in leec102 as fetched), so it is not taught; this is why WBCS 2018 Q108 is mapped untaught.
- **Deflation / disinflation / stagflation terminology**: not defined in the fetched NCERT/RBI sources; not taught, and WBCS 2024 Q79 is mapped untaught for this reason.
- **CRR/SLR mechanics and sector classification of national income**: deliberately left to ECO-06 and ECO-09 respectively; related PYQs mapped untaught.
- **People**: empty array — no person is genuinely central to this chapter's sourced content (validator permits this for non-dated books).
- The RBI inflation target (4% ± 2%) is stated in the fetched RBI address without a validity window in that text; the chapter presents it as the statutory FIT target from 2016, as sourced. CPI/WPI base years and the Jan 2026 CPI rate are 2026 series figures and are date-stamped in the claims.
