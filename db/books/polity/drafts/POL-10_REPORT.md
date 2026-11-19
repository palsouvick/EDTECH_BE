# POL-10 — আইন প্রণয়ন, বাজেট ও সংসদীয় কার্যপ্রণালী — Draft Report

- **Chapter:** POL-10, part `union_govt`, subtopics `parliament` (verbatim from `db/books/polity/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Deliverables:** `chapter.json`, `pyq_map_POL-10.json`, this report — in `~/workspace/edtech/bookwork/pol-10/`
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/pol-10/chapter.json` → **OK**

## Sources actually fetched (via browser text-fetch, 2026-11-19)

1. **The Constitution of India [As on 1st May, 2024], Legislative Department** — https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf (Articles 107–123, 266–267 read verbatim)
2. **NCERT, Indian Constitution at Work (Class XI), Chapter 5: Legislature** — https://ncert.nic.in/textbook/pdf/keps205.pdf (law-making, financial function, control, committees read verbatim)
3. **CAG (Director General of Audit, Defence Services) — Legislation Committee / Public Accounts Committee** — https://cag.gov.in/defence/new-delhi/en/page-defence-new-delhi-legislationcommittee (PAC composition 22 = 15 Lok Sabha + 7 Rajya Sabha, functions)

Note: the Lok Sabha Secretariat handbook on sansad.in was fetched and read for the PAC, but **not used as a source** — `sansad.in` does not match the validator's allowed GOVT pattern (`*.gov.in` / `*.nic.in`). The CAG `gov.in` page was used instead for every PAC fact taught.

## Counts

- **Claims:** 36 (c01–c36), every one with a verbatim quote from a fetched source; every claim is used in the chapter.
- **Practice questions:** 42 — basic 13, moderate 14, difficult 9, exam 6 (STATEMENT ×3, ASSERTION_REASON ×1, MATCH ×1, PAIRS ×1); all 7 sections tested.
- **Sections (7):** ordinary_bill (Art 107), joint_assent (Art 108/111/118), money_bill (Art 109/110/117), budget_process (Art 112–116), funds (Art 266/267), control_committees (NCERT control + PAC), procedure_rules (Art 118–123).

## PYQs

- `db/books/polity/pyq_map.json` has **POL-10: []** (empty). Candidates were recovered from entries in other chapters' maps that explicitly say "Belongs to POL-10", cross-checked against the real question bank in `db/pyq/` (question texts verified for all 14).
- **Candidates found: 14. Mapped: 14. Taught: 11. Untaught: 3.**
- Taught highlights: Art 117 President's recommendation (WBCS 2016 Q47, 2022 Q92), Money Bill passage / Rajya Sabha amendment (2017 Q193, 2019 Q103), Speaker decides Money Bill (2021 Q62, Clerkship 2005 Q56), Art 107 either-House introduction (2022 Q119), Consolidated Fund (2023 Q93, Q99), PAC 15 Lok Sabha members (2016 Q193, 2019 Q121).

## Gaps (disclosed, never filled from memory)

1. **WBCS 2015 Q112 (Railway Budget)** — untaught: the separate Railway Budget and its 2017 merger with the Union Budget are in neither the Constitution nor NCERT Ch. 5 as fetched.
2. **WBCS 2021 Q117 (PAC election by PR-STV)** — untaught: the election method is in the Lok Sabha Rules / sansad.in handbook, outside the validator-allowed sources used; the chapter teaches PAC composition and functions only.
3. **WBCS 2022 Q83 (PAC Chairperson from the Opposition)** — untaught: this is a convention (since 1967) stated in none of the fetched sources; the CAG page and NCERT are silent on the Chairperson.
4. **Railway Budget / budget presentation date / Finance Bill vs Money Bill case law** — not covered beyond the Article 117(3) distinction, which is taught.
5. Bengal connection is the honest nearest link (state-level mirror of Arts 266/budget procedure and West Bengal's share decided through this Union process); no Bengal-specific fact beyond Article 266(1)'s State Consolidated Fund is claimed.
