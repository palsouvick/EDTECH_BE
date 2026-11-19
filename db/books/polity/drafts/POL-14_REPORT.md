# POL-14 — মুখ্যমন্ত্রী, রাজ্য মন্ত্রিসভা ও রাজ্য বিধানসভা — Draft Report

Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js ~/workspace/edtech/bookwork/pol-14/chapter.json` → **OK**.

## Deliverables
- `chapter.json` — complete chapter (11 parts), 6 sections
- `pyq_map_POL-14.json` — PYQ mapping (this file's companion)

## Sources actually fetched (via browser text-fetch)
1. **The Constitution of India [As on 1st May, 2024]**, Legislative Department, Ministry of Law and Justice — https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf — Articles 163–207 read verbatim (printed pp. 73–95), including the Article 168 footnote recording the West Bengal Legislative Council (Abolition) Act, 1969.
2. **Indian Constitution at Work (Class XI), Chapter 4: Executive**, NCERT — https://ncert.nic.in/textbook/pdf/keps204.pdf — parliamentary executive at the State level, state executive composition, CM as leader of the majority party (printed pp. 82–93).
3. **Indian Constitution at Work (Class XI), Chapter 5: Legislature**, NCERT — https://ncert.nic.in/textbook/pdf/keps205.pdf — unicameral/bicameral option, the six bicameral States, direct election of State Legislative Assemblies (printed pp. 102–105).
4. **West Bengal Legislative Assembly — official website** — https://assembly.wb.gov.in/ — home page: Eighteenth Assembly, Structure Unicameral, Strength 294, Term 5 years; names of the current Chief Minister and Speaker as displayed when accessed (2026-11-19). (The older wbassembly.gov.in address failed to fetch; the current official address assembly.wb.gov.in was reached via search and fetched successfully.)

## Counts
- Claims: **76** (c01–c76), every claim with a verbatim quote from one of the four fetched sources; every claim is used at least once (validator-enforced).
- Practice questions: **43** — basic 12, moderate 12, difficult 12, exam 7 (formats: DIRECT 32, STATEMENT 7, PAIRS 2, MATCH 1, ASSERTION_REASON 1). Every section has ≥6 questions; every question cites its supporting claim ids.

## PYQs
- `pyq_map.json` has **0 entries under POL-14**, so candidates were searched in `~/workspace/edtech/BE/db/pyq` for genuine Chief Minister / state Council of Ministers / State Legislature questions (English and Bengali text).
- Candidates found: **4** — mapped: **4**, taught: **2**, untaught: **2**.
  - Taught: WBCS 2015 Q92 (upper House of the State Legislature = Vidhan Parishad, Art. 168(2)), WBCS 2015 Q181 (a state bill becomes an Act on the Governor's assent, Art. 200). Both are also mirrored as practice questions (q02, q40).
  - Untaught: WBPSC Miscellaneous 2023 Q62 (first woman Chief Minister of India — Sucheta Kripalani; the fact is in none of the fetched sources — source gap), WBCS 2019 Q125 (79th Amendment, SC/ST reservation and Anglo-Indian representation — an amendments question, primary POL-06; State Assemblies appear only inside the amendment's subject).

## Subtopic coverage (subtopics: state_govt)
- State executive framework: parliamentary system at State level, composition of the state executive (NCERT), Governor as part of the Legislature (Art. 168).
- Chief Minister: appointment (164(1)), oath (164(3)), pleasure doctrine, six-month membership rule (164(4)), salaries (164(5)), duties towards the Governor (167).
- Council of Ministers: aid and advice and the discretion exception (163), size cap 15% / minimum 12 via the 91st Amendment (164(1A)–(1B)), collective responsibility (164(2)), conduct of business (166).
- Legislative Assembly: composition 60–500 and direct election (170), five-year duration and emergency extension (172), qualifications (173), oath (188), absence (190(4)), disqualifications and the Governor–Election Commission route (191–192), privileges (194).
- Legislative Council: creation/abolition (169), size limits and the five-part composition (171), permanence and biennial retirement (172(2)), delaying power of 3 + 1 months (197).
- Procedure and law-making: sessions and the six-month gap (174), special address (176), Ministers' rights (177), Speaker/Deputy Speaker and removal (178–179), voting, casting vote and quorum (189), bill origin and lapsing (196), Money Bills (198–199), budget and demands (202–203, 207), assent, return and reservation (200–201).

## Gaps (disclosed, not filled)
- **First woman Chief Minister (Misc 2023 PYQ):** Sucheta Kripalani's name/fact appears in none of the four fetched sources, so the PYQ is mapped untaught and the fact is not asserted anywhere in the chapter.
- **Current West Bengal office-holders:** the `people` entries rest only on the Assembly's official home page as fetched (accessed 2026-11-19; page crawl dated 2026-08-09). No biographical detail beyond the site's display is claimed; if the site changes, these two entries need re-checking at verification.
- **Derived arithmetic in the Bengal connection** (15% of 294 ≈ 44 ministers; quorum 30) is presented as arithmetic on the sourced figures 294/15%/one-tenth, not as a sourced fact.
- **Article 213 (Governor's Ordinance)** is left to POL-13 (Governor) and not covered here; Article 168(1)(a)'s state list is taught via the NCERT six-State list (c21–c22) rather than the Constitution's footnote-heavy text.
- Constitution PDF text extraction is two-column scrambled; quotes were assembled only from fragments actually visible in the fetched text, in the article's own word order (same practice as POL-12).
