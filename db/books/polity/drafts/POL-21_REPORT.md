# POL-21 — Draft Report

Chapter: **POL-21 — পৌরসভা, 74th Amendment ও পশ্চিমবঙ্গের স্থানীয় স্বশাসন**
Part: `bodies_elections_local` · Subtopics: `panchayati_raj` (verbatim from `db/books/polity/toc.js`)
Status: DRAFT · Verification: UNVERIFIED
Deliverables: `chapter.json`, `pyq_map_POL-21.json`, this report — in `~/workspace/edtech/bookwork/pol-21/`
Validator: `node scripts/validateBooks.js ~/workspace/edtech/bookwork/pol-21/chapter.json` → **OK**

## Sources actually fetched (browser.open, 2026-11-19)

| id | Source | URL |
|---|---|---|
| s1 | The Constitution of India [As on 1st May, 2024], Legislative Department | https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf |
| s2 | URDPFI Guidelines 2014, Vol. II A, Ch. 1 "Implications of 73rd & 74th Constitution Amendment Act", Ministry of Urban Development (MoHUA), Govt. of India | https://www.mohua.gov.in/static/uploads/2025/10/dd392b7781e668614ae0446cfd114bc6.pdf |
| s3 | Frequently Asked Questions — West Bengal State Election Commission | https://wbsec.gov.in/home/page/FAQ (fetched via the Commission's published FAQ address) |

Part IXA (Arts. 243P–243ZG), the Twelfth Schedule and State List Entry 5 were read in full from s1; the 74th CAA summary provisions from s2 (pp. 1–2); West Bengal municipal-election machinery from s3.

## Counts

- **Claims: 46** (c01–c46), every one with a verbatim quote from a fetched source above; every claim is used by at least one section/block/question (validator-enforced).
- **Questions: 42** — basic 10, moderate 15, difficult 10, exam 7 (STATEMENT ×3, MATCH ×1, PAIRS ×1, CHRONOLOGY ×1, ASSERTION_REASON ×1). All 7 sections tested: why_urban_local 3, amendment_74 6, three_types 7, composition_election 8, reservation 6, powers_finance 7, west_bengal 5.
- Sections: 7, each with quick/standard/deep and boxes. Terms 14, cause_effect 2, exam_focus 10, timeline 3, quick_revision 15.

## PYQs

- `db/books/polity/pyq_map.json` has **no entries under POL-21** (empty array).
- Full-text search of `db/pyq/*.json` (English + Bengali stems/options: municipal*, 243*, 74th, পৌর, মেয়র, ওয়ার্ড, দ্বাদশ তফসিল, Part IXA, ward committee, urban local) found **zero questions genuinely on Municipalities / the 74th Amendment / Part IXA**.
- The only real candidates are the four bank questions on the **73rd Amendment in which the 74th is the key distractor option** — the 73-vs-74 discrimination is a stated teaching point of this chapter (sections `why_urban_local`, `amendment_74`). All four are mapped in `pyq_map_POL-21.json`, taught = true, section `amendment_74`, each note recording that the primary chapter is POL-20:
  - WBCS-EXE-PRELIMS-2018-PRELIMS-Q121
  - WBCS-EXE-PRELIMS-2022-PRELIMS-Q155
  - WBPSC-CLERKSHIP-PART-I-2023-SESSION-I-Q62
  - WBPSC-CLERKSHIP-PART-I-2023-SESSION-II-Q81
- **PYQ candidates found: 4 · mapped: 4 · taught: 4 · untaught: 0.**
- No PYQ was invented. There is no bank PYQ whose keyed answer is itself a POL-21 fact (e.g. 243Q types, 243S threshold, Twelfth Schedule items) — that absence is a bank gap, disclosed here.

## Subtopic coverage

Registered subtopic `panchayati_raj` (the local-self-government slug shared with POL-20) is covered for its urban half: 74th Amendment & Part IXA (243P–243ZG), three types of Municipalities (243Q), composition/wards/Wards Committees (243R–243S), reservation (243T), duration & elections (243U, 243ZA, 243ZG), powers & Twelfth Schedule (243W), municipal finance (243X–243Z), district & metropolitan planning (243ZD–243ZE), exceptions (243ZC incl. the Darjeeling Gorkha Hill Council clause), and West Bengal's municipal-election machinery via the WB State Election Commission.

## Gaps (disclosed, not filled)

1. **NCERT *Indian Constitution at Work*, Ch. 8 "Local Governments" (keps208.pdf) could not be fetched** — the browser text-fetch failed with a network error on the single attempt permitted. The chapter therefore rests on the Constitution itself plus two official Government sources (MoHUA, WBSEC), all admissible for the polity profile. NCERT-specific framings (e.g. its discussion of the pre-1992 weakness of urban bodies beyond the MoHUA summary used) are not cited.
2. **No genuine POL-21 PYQs exist in the bank** (see above); practice questions are original, built only on this chapter's claims.
3. West Bengal detail is limited to what the WB State Election Commission's official FAQ states (election machinery, voter/candidate eligibility, District Magistrates as District Municipal Election Officers, Kolkata Corporation Returning Officers). WB municipal-law specifics (e.g. ward counts of individual corporations, the West Bengal Municipal Act's own provisions) are **not** taught, because no citable official WB text was fetched for them.
4. The Constitution PDF's text layer is two-column; a small number of claim quotes (notably c08, c09, c35) are the article's verbatim sentences reassembled across the column break of the official PDF. Wording is the Constitution's own; layout order in the extraction is scrambled.
5. `related_facts` is empty: no GK fact code for municipalities was verified in the bank during this run.
