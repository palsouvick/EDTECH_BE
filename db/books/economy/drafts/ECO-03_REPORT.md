# ECO-03 — বাজেট ও করব্যবস্থা (Budget and Taxation): Draft Report

- **Chapter:** ECO-03, part `foundations`, subtopics `["budget_tax"]` (verbatim from `db/books/economy/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED (blind check is a later pipeline stage)
- **Validator:** `node scripts/validateBooks.js chapter.json` → **OK**
- **Deliverables:** `chapter.json`, `pyq_map_ECO-03.json`, this report — all in `~/workspace/edtech/bookwork/eco-03/`

## Sources actually fetched (via browser text-fetch, 2026-11-19)

| id | Title | URL | Publisher class |
|----|-------|-----|-----------------|
| s1 | Introductory Macroeconomics, Class XII, Ch. 5: Government Budget and the Economy (NCERT, Reprint 2024-25) | https://ncert.nic.in/textbook/pdf/leec105.pdf | NCERT |
| s2 | GST — An Update (As on 1st June, 2019), CBIC | https://cbic-gst.gov.in/pdf/01062019-GST-An-Update.pdf | GOVT |
| s3 | The Constitution of India, Part XII (Ministry of External Affairs) | https://www.mea.gov.in/images/pdf1/Part12.pdf | GOVT |
| s4 | Finance Commission of India — Constitutional Provisions | https://fincomindia.nic.in/constitutional-provisions | GOVT (nic.in) |

All four belong to the economy profile's allowed publishers (`NCERT`, `GOVT`, `RBI`). No RBI source was needed: every fact used is covered by the four sources above.

## Counts

- **Claims:** 53 (c01–c53), every one with a verbatim quote from a fetched page above; every claim is referenced by at least one section/block/question (validator confirms no unused claims).
- **Questions:** 42 — basic 10, moderate 15, difficult 10, exam 7 (STATEMENT ×3, MATCH ×1, CHRONOLOGY ×1, ASSERTION_REASON ×1, PAIRS ×2 among exam/difficult). All 6 sections are tested (7/7/8/6/8/6 questions).
- **Sections:** 6 — budget_meaning, receipts_expenditure, deficits_debt, taxes_kinds, gst_system, fiscal_federalism; each with quick/standard/deep and exam-oriented boxes.
- **Other blocks:** events 3 (FRBMA 2003, 101st Amendment 2016, GST launch 2017), timeline 4 entries (2003–2017), terms 16, cause_effect 2, exam_focus 7, quick_revision 14.
- **people:** empty array — this chapter has no individual person as a sourced figure; offices/roles (Union Finance Minister as GST Council chair, President, Governor) are taught in the sections and terms instead. Honest equivalent per the book rules for a non-dated economy chapter.

## Subtopic coverage (`budget_tax`)

Fully covered: budget meaning and Article 112; budget objectives; revenue/capital receipts and expenditure; disinvestment; the three deficits with formulas; deficits→debt, crowding out, deficit reduction; FRBM Act 2003 (statements, targets, RBI provisions); direct vs indirect taxes, progressive taxation, paper taxes, Article 265; GST (nature, ITC/cascading, subsumed and excluded taxes, 101st Amendment, Articles 246A/269A/279A/366(12A), GST Council composition and voting, five-year compensation); the three funds (Articles 266–267); tax devolution (Article 270) and the Finance Commission (Articles 280–281).

## PYQ candidates

- **Found:** 19 — 2 GK bank items (`db/gk/economy.jsonl`, subtopic `budget_tax`: GK-ECO-006, GK-ECO-007) + 17 real exam items grepped from `db/pyq/*.json` (WBCS Prelims 2015–2024, Kolkata Police Constable 2023, WBPSC Clerkship 2023).
- **Mapped:** all 19 in `pyq_map_ECO-03.json`.
- **Taught:** 12 (both GK items + 10 PYQ). **Untaught:** 7, each with a specific reason in the map — 4 are year-specific budget figures/shares the chapter's sources do not carry (WBCS 2016 Q145, WBCS 2023 Q73/Q168/Q183), 1 is a dated count (WBCS 2016 Q28, Finance Commissions so far), 1 rests on a debt-ceiling limb absent from the sources (WBCS 2017 Q191, FRBM objective), and 1 is the Railway Budget's pre-2017 separate status, which no fetched source covers (WBCS 2015 Q112). Two taught entries carry disclosed caveats (WBCS 2018 Q153 'budget deficit' limb; WBCS 2023 Q115 provident-fund limb; WBCS 2019 Q112 / 2024 Q166 are partly taught — Finance Commission limb only).

## Gaps (disclosed, never filled from memory)

1. **GST rate list is time-sensitive.** The chapter teaches the six rates exactly as printed in NCERT (Reprint 2024-25) — 0%, 3%, 5%, 12%, 18%, 28% — with the as-of context stated in the claim and section text. Any later rate rationalisation is **not** covered, because no allowed-publisher page fetched for this draft states a revised list.
2. **FRBM targets are taught as NCERT states them** (fiscal deficit ≤3% of GDP; revenue deficit elimination by 31 March 2009, rescheduled to 2009-10 per NCERT's own footnote). Later FRBM amendments/targets (e.g. post-2018 debt anchor) are not in the fetched sources and are not taught.
3. **Deficit figures are dated:** the only GDP-share figures taught are NCERT Table 5.1's 2022-23 Budget Estimates (revenue deficit 3.8%, fiscal deficit 6.4%), always cited with the year.
4. **Railway Budget** (separate presentation, 2017 merger) is not taught — no fetched source covers it; the one PYQ on it is mapped untaught.
5. **Direct/indirect tax 'burden-shifting' definition** is not asserted: NCERT (leec105) classifies by example (income/corporation tax = direct; excise/customs/service tax/GST = indirect) without stating a shifting criterion, so the chapter teaches the classification and the regressivity point only, exactly as sourced.
6. **Budget procedure in Parliament** (Demands for Grants, Appropriation Bill, charged vs voted expenditure) is not covered — the NCERT Legislature chapter fetched (keps205) does not state the Consolidated Fund passages needed, and no other fetched source covers the procedure; left for a Polity chapter rather than filled from memory.
7. One NCERT fetch failed (keps207, Federalism) and was not retried; the Finance Commission material was instead sourced from the Commission's own official constitutional-provisions page (s4) and the Constitution text (s3).
