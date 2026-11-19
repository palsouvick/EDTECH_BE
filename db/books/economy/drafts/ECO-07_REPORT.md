# ECO-07 — ব্যাংকিং কার্যক্রম ও পরিভাষা (banking_operations) — Draft Report

Date: 2026-11-19. Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Sources actually fetched (browser.open, 2026-11-19)

1. NCERT, *Introductory Macroeconomics*, Class XII, Chapter 3: Money and Banking — https://ncert.nic.in/textbook/pdf/leec103.pdf (publisher: NCERT)
2. Reserve Bank of India — FAQs: National Electronic Funds Transfer (NEFT) System (updated 02 Sep 2024) — https://www.rbi.org.in/commonman/english/scripts/FAQs.aspx?Id=274 (publisher: RBI)
3. Reserve Bank of India — FAQs: Real Time Gross Settlement System (RTGS) System (updated 14 Oct 2026) — https://www.rbi.org.in/commonman/english/scripts/FAQs.aspx?Id=275 (publisher: RBI)

All three belong to the economy profile's allowed publishers (NCERT, GOVT, RBI).

## Counts

- Claims: **52** (c01–c52), every one with a verbatim quote from a fetched source above; every claim is used by at least one section/block/question (validator-enforced).
- Questions: **42** — basic 13, moderate 12, difficult 11, exam 6 (STATEMENT ×3, ASSERTION_REASON ×1, MATCH ×1, PAIRS ×1); exactly 7 per section across all 6 sections.
- Sections (6): deposits_accounts, credit_creation, reserve_ratios, policy_rates, payment_systems, money_terms. Plus events (5), people/institution actors (2), timeline (5 milestones), terms (19), cause_effect (3), exam_focus (7), bengal_connection, quick_revision (14).

## PYQ candidates

- GK bank (`db/gk/economy.jsonl`): **0 items** carry subtopic `banking_operations` (the 35 economy items cover basics, rbi_banking, inflation_income, budget_tax, plans_reforms, poverty/development-adjacent, financial_institutions, agri_industry, schemes). `related_facts` is therefore empty — no code invented.
- PYQ corpus (`db/pyq/*.json`): **2 genuine candidates** found and mapped in `pyq_map_ECO-07.json`, both taught:
  - WBCS-EXE-PRELIMS-2017-PRELIMS-Q187 — "In India the Repo rate is announced by" → policy_rates, taught.
  - WBCS-EXE-PRELIMS-2023-PRELIMS-Q170 — inflationary-effect statements (SLR decrease etc.) → reserve_ratios, taught.
- Other bank-word matches in the corpus were rejected as off-topic for this chapter: bank nationalisation 1969 / Imperial Bank→SBI / SBI chairperson / EXIM Bank (ECO-06 rbi_banking and ECO-08 financial_institutions scope), simple-interest arithmetic items, and "river bank" / "post-dated cheque" false positives.
- PYQ totals: candidates 2, mapped 2, taught 2, untaught 0.

## Subtopic coverage

`banking_operations` covered end-to-end: deposit types and spread; bank balance sheet; credit creation and the money multiplier (worked NCERT example, CRR 20% → multiplier 5); CRR and SLR definitions, setter and effects; Bank Rate, repo, reverse repo, OMO, quantitative vs qualitative tools, lender of last resort; NEFT vs RTGS (settlement type, IFSC, limits, credit timelines, UTR, charges) with as-of dates; fiat money, legal tender, M1–M4, demonetisation (Nov 2016).

## Gaps (disclosed, never filled from memory)

1. **Current CRR / SLR / repo-rate percentages are NOT taught.** They change over time and no fetched source states a current value; the chapter teaches the concepts and the NCERT worked example, and the reserve_ratios deep text tells students to check rbi.org.in before the exam.
2. **Class X NCERT "Money and Credit" could not be fetched in this run** (the jeec103.pdf fetch failed), so SHGs, formal vs informal credit sources, collateral and terms-of-credit detail are not covered. The chapter is built on Class XII Macroeconomics Ch. 3 + RBI FAQs only.
3. **Not covered** (no fetched source): UPI/IMPS mechanics, account-opening/KYC procedure, overdraft and cash-credit working, NPA classification, DICGC deposit insurance, cheque truncation/clearing timelines. These need RBI/NPCI or NCERT Class X sources in a later pass.
4. Time-sensitive figures that ARE taught carry their as-of date in the claim and the student text: RTGS minimum ₹2,00,000 and 30-minute credit (RBI FAQ updated 14 Oct 2026); NEFT batch/2-hour/no-limit facts (RBI FAQ updated 02 Sep 2024); RTGS charge waiver from 01 Jul 2019; free online NEFT for savings accounts from 01 Jan 2020; RTGS 24×7 from 14 Dec 2020.
5. `people` uses institutional actors (RBI; commercial banks) as the closest honest equivalent for a banking-operations chapter — there are no individual biographies in the sources.
