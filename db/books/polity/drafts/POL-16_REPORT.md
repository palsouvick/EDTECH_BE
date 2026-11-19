# POL-16 — জরুরি অবস্থা ও বিশেষ বিধান: Draft Report

- **Chapter:** POL-16, part `state_federal`, subtopics `["federalism_emergency"]` — title/subtitle/part/subtopics taken verbatim from `BE/db/books/polity/toc.js`.
- **File:** `chapter.json` — status DRAFT, verification UNVERIFIED.
- **Validator:** `node scripts/validateBooks.js chapter.json` → **OK** (first run, no fixes needed).

## Sources actually fetched (browser.open, 2026-11-19)

1. **The Constitution of India [As on 1st May, 2024], Legislative Department (GOVT)** — https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf — Part XVIII (Arts 352–360, pp. 208–218), Art 83 proviso (p. 39), Part XXI Arts 371/371A/371D (pp. 233–237) read in full via find/open.
2. **NCERT, Politics in India Since Independence (Class XII), Ch. 6: The Crisis of Democratic Order** — https://ncert.nic.in/textbook/pdf/leps206.pdf — pp. 93–103 read (1975 Emergency narrative, consequences, lessons, 1977 elections, Gujarat President's Rule, West Bengal Naxalite passage).
3. **NCRWC Consultation Paper on Article 356 (11 May 2001), Ministry of Law & Justice (GOVT)** — https://www.legalaffairs.gov.in/static/uploads/2025/11/e3c6663dc51555b2a8cc6967131e5364.pdf — pp. 927–928 (threefold classification of Part XVIII, Art 365, Art 360 never invoked till 2001, no Art 352 proclamation after 1977).

## Counts

- **Claims:** 49 (c01–c49), every one with a verbatim quote from a fetched source above; all 49 are used in the chapter (validator enforces this).
- **Practice questions:** 42 — basic 10, moderate 15, difficult 10, exam 7 (STATEMENT ×2, MATCH, ASSERTION_REASON, CHRONOLOGY, PAIRS, STATEMENT-financial). All 7 sections tested.
- **Sections:** 7 — emergency_overview, national_emergency, effects_and_rights, emergency_1975, presidents_rule, financial_emergency, special_provisions. Plus events (5), people (4), timeline (5), terms (8), cause_effect (3), exam_focus (11), bengal_connection, quick_revision (14).

## PYQs

- `BE/db/books/polity/pyq_map.json` has **no entries under POL-16 itself**, but five real candidates are cross-listed under POL-02/03/04/08/09/11 with "belongs to POL-16" notes; all five were verified against the bank files in `BE/db/pyq/` (question text and options matched) and are mapped in `pyq_map_POL-16.json`:
  - WBCS 2024 Q145 (44th Amendment written advice) — taught
  - WBCS 2024 Q189 (Arts 20 & 21 under Art 359) — taught
  - Clerkship 2005 Q51 (President declares all three emergencies) — taught
  - Clerkship 2023 Session III Q59 (who declares Emergency) — taught
  - Clerkship 2023 Session IV Q32 (President's Rule = Art 356) — taught
- **Candidates found: 5 · mapped: 5 · taught: 5 · untaught: 0.**
- Considered and excluded: WBCS 2017 Q192 (Emergency appears only as a distractor option; the question is about Fundamental Duties not being in the original Constitution — POL-05 territory) and WBCS 2018 Q117 (Article 360 appears only as a distractor; the question is about Art 20(3)/21 and narco-analysis — POL-03/04 territory). Neither is genuinely on this chapter's topics.

## Subtopic coverage (federalism_emergency)

- Art 352 grounds/approval/special majority/duration/revocation — full.
- Arts 353, 354, 358, 359 effects; Art 83 term extension — full.
- 1975 Emergency narrative + 44th Amendment safeguards — full (NCERT XII Ch. 6).
- Arts 355, 356 (incl. 356(5) conditions), 357, 365 — full.
- Art 360 grounds/approval/effects — full.
- Special provisions (the chapter title's second half): Part XXI, Arts 370 (as listed), 371, 371A, 371D — covered from the Constitution text.

## Gaps (disclosed, not filled)

1. **1962 and 1971 Art 352 proclamations** — not mentioned in any fetched source, so the chapter does not narrate them; the emergency_1975 `deep` text says so explicitly. (Common textbook knowledge, but no fetched quote = not written.)
2. **S.R. Bommai judgment (1994) and other case law on Art 356** — no fetched source covers it; judicial-review limits on Art 356 are therefore not taught. A future pass with a fetched official source (e.g. a court or Law Commission page) could add it.
3. **"Financial Emergency never proclaimed"** is stated only as of the NCRWC paper of 2001, exactly as sourced ("has not also been invoked till date", 2001) — no post-2001 official confirmation was fetched.
4. **Art 370's 2019 change** is mentioned only to the extent the Constitution edition itself supports (its Appendix carries the Art 370(3) declaration); no detailed 2019 narrative is taught.
5. **President's Rule instances in West Bengal** — no fetched official source lists them, so bengal_connection rests on the NCERT West Bengal/Naxalite passage and the Art 356 framework rather than a WB-specific imposition history.
6. NCERT Class XI *Indian Constitution at Work* Ch. 7 (Federalism) could not be fetched (the keps207.pdf fetch failed with a network error and was not retried per instructions); the federalism framing instead rests on NCERT XII Ch. 6 (c26) and the Constitution text.
