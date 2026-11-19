# POL-13 — রাজ্যপাল — Draft Report

- **Chapter:** POL-13, part `state_federal`, subtopics `state_govt` (title/part/subtopics verbatim from `db/books/polity/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/pol-13/chapter.json` → **OK**

## Sources actually fetched (browser.open)

1. **The Constitution of India [As on 1st May, 2024], Legislative Department** — https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf
   Articles read in full around the Governor: 152–168 (pp. 70–76), 174–176 (pp. 80–81), 199–207 (pp. 90–95), 213 (pp. 97–98), 233 (p. 109), 316–317 (pp. 177–179), 356 (pp. 211–212).
2. **NCERT, Indian Constitution at Work (Class XI), Chapter 4: Executive** — https://ncert.nic.in/textbook/pdf/keps204.pdf
   Used pp. 84 and 93 (State-level executive; Governor appointed by the President on the central government's advice; Governor has more discretionary powers).

## Counts

- **Claims:** 47 (c01–c44 from the Constitution, c45–c47 from NCERT), each with a verbatim quote and page.
- **Practice questions:** 45 — basic 14, moderate 16, difficult 10, exam 5 (STATEMENT ×2, MATCH, ASSERTION_REASON, PAIRS); every question cites its supporting claim ids; all 7 sections covered.

## Sections (7)

`governor_intro` (153/154/162/168), `appointment_term` (155–160), `aid_advice_discretion` (163–167), `legislative_powers` (174–176, 200–202, 207), `ordinance_pardon` (213, 161), `appointments_misc` (165, 233, 316–317), `governor_centre` (356 + centre link).

## PYQs

- `pyq_map.json` entry for POL-13 is **empty** (`[]`); the history `pyq_chapters.json` route does not apply (polity chapter).
- Searched all of `db/pyq/*.json` for Governor questions. Governor-General / Viceroy / colonial-era hits were excluded as history topics, and WBCS 2021 "His Superfluous Highness" was excluded (its keyed answer is the Vice-President — POL-07).
- **Candidates found: 8** — mapped in `pyq_map_POL-13.json`: **7 taught**, **1 untaught**.
  - Taught: Clerkship 2019 Q1 (appointment, Art 155); WBCS 2015 Q181 (assent, Art 200); WBCS 2019 Q156 (Art 154); WBCS 2019 Q122 (pardons, Art 161); WBCS 2019 Q119 (District Judges, Art 233); WBCS 2022 Q65 (SPSC, Art 316); WBCS 2022 Q183 (Advocate General, Art 165).
  - Untaught: Clerkship 2019 (Afternoon) Q11 — name of the J&K Governor at exam time; time-anchored current-affairs fact, not present in the constitutional/NCERT sources, disclosed rather than filled from memory.

## Subtopic coverage

Single registered subtopic `state_govt` — fully covered: office, appointment/term/qualifications/oath, aid-and-advice and discretion, legislative and financial powers, ordinance, pardoning power, appointments (AG, District Judges, SPSC), and the Governor's report under Art 356. Bengal connection included (Raj Bhavan, unicameral WB legislature, WBPSC appointed by the Governor).

## Gaps

- **Art 72 comparison:** the President's pardoning power (Art 72) is referenced only as the PYQ's paired fact; its full text was not quoted in this chapter's claims (it belongs to POL-07), so the chapter teaches Art 161's own scope only.
- **Art 213 proviso detail** (cases needing the President's instructions) is summarised in prose in `governor_centre` from the fetched Art 213 text but no separate claim was minted for the three sub-cases.
- **People/events:** no named-person facts are used (current/former Governors' names are not in the sources), so `people` is empty; `events` covers the two recurring constitutional processes (assent; returned-Bill re-passage) instead.
- **Timeline** is limited to two source-backed entries (1950 commencement; Seventh Amendment 1956 proviso, per the Constitution's own footnote text).
- Chapter is DRAFT/UNVERIFIED pending the project's verification pass.
