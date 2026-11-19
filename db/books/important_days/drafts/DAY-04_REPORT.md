# DAY-04 — এপ্রিলের দিবস (April Days) — Draft Report

- **Chapter:** `DAY-04`, part `q2`, subtopic `april` (title/part/subtopics verbatim from `important_days/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js` → `chapter.json: OK`
- **Structure:** 4 week-wise sections (week1–week4), 33 claims, 14 sources, 42 questions (basic 10, moderate 15, difficult 9, exam 8; formats include DIRECT, PAIRS, MATCH, STATEMENT, ASSERTION_REASON, CHRONOLOGY), events 9, people 4, timeline 9 entries (founding-year order), terms 6, cause_effect 2, quick_revision 14 date-ordered rows.

## Sources actually fetched (browser.open, 2026-11-19) — all *.gov.in (GOVT profile)

1. Rashtriya Panchayati Raj Diwas — PIB Press Note (Ministry of Panchayati Raj) — https://www.pib.gov.in/PressNoteDetails.aspx?id=158331&NoteId=158331&ModuleId=3&reg=6&lang=1
2. Diamond Jubilee of National Maritime Day, PIB Release 1914028 — https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=1914028
3. National Conference on Autism, PIB Release 1486547 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1486547
4. Dept. of Justice observes 135th birth anniversary of Dr. B.R. Ambedkar, PIB Release 2121544 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2121544
5. World Heritage Day backgrounder, PIB Release 2122423 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2122423
6. 18th Civil Services Day, PIB Release 2253780 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2253780
7. Towards a Malaria-Free India, PIB Release 2124334 — https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2124334
8. World Homoeopathy Day press note, PIB Note 154174 — https://www.pib.gov.in/PressNoteDetails.aspx?NoteId=154174&ModuleId=3&reg=3&lang=1
9. Environmental Days, Dept. of Environment, Govt. of NCT of Delhi — https://environment.delhi.gov.in/environment/environmental-days
10. UKSLSA E-Newsletter Apr–Jun 2025 (World Health Day + Earth Day sections) — https://cdnbbsr.s3waas.gov.in/s39f329089b8d9644b96ba05d545355d67/uploads/2025/09/202509231650903690.pdf
11. Formation of Separate Orissa Province, Orissa Review Apr 2008 (Govt. of Odisha) — https://magazines.odisha.gov.in/orissareview/2008/april-2008/engpdf/17-19.pdf
12. DEPwD year review 2024, PIB Release 2088877 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2088877
13. CSIR-NIScPR workshop on World Intellectual Property Day, PIB Release 1820189 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1820189
14. HRD Minister webinar on World Book & Copyright Day (NBT), PIB Release 1617581 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1617581

## Coverage (subtopic: april)

Taught with fetched GoI quotes (permanent date + reason): Utkal Divas 1 Apr (1936 province), World Autism Awareness Day 2 Apr (UNGA 2007), National Maritime Day 5 Apr (SS Loyalty 1919), World Health Day 7 Apr (WHO 1948; 2025 theme year-labelled), World Homoeopathy Day 10 Apr (Hahnemann), World Parkinson's Day 11 Apr, Ambedkar Jayanti 14 Apr (b. 1891; Equality Day), World Haemophilia Day 17 Apr, World Heritage Day 18 Apr (ICOMOS 1982; India 43 sites), National Civil Services Day 21 Apr (Patel 1947 'steel frame'; 2026 theme year-labelled), Earth Day 22 Apr (movement began 1970), National Panchayati Raj Day 24 Apr (73rd Amendment in force 1993; Part IX; three tiers; Mehta Committee 1957; Rajasthan 1959), World Malaria Day 25 Apr (instituted 2007; 2025 theme year-labelled; India targets 2027/2030), World Intellectual Property Day 26 Apr.

## PYQ candidates

- Found: 2 — `GK-DAY-004` (GK bank, subtopic `april`) and `WBPSC-MISC-PRELIMS-2023-Q27` (real exam question in `db/pyq/misc-2023.json` testing World Health Day = 7 April).
- Mapped: 2. Taught: 2 (GK-DAY-004 with one caveat — see gaps).
- A full grep of `db/pyq/*.json` for other April-day questions found no further genuine candidates (other hits were June/May days or unrelated Ambedkar/Panchayat polity questions).

## Gaps (disclosed, never filled from memory)

1. **World Book and Copyright Day (23 April)** — the fetched PIB release (1617581) proves the day is marked in India by the National Book Trust but does not state its calendar date; a National Book Trust (nbtindia.gov.in) press-release PDF stating the date could not be fetched (fetch failed). The date is therefore **not taught**; the chapter carries an honest exam_note box about this, and claim c33 records exactly what the fetched source supports.
2. **Ayushman Bharat Diwas (30 April)** — no official GoI page stating the observance was found/fetched in this build; not taught.
3. Other April observances not taught (no fetched GoI source in this build): World Chagas Day (14 Apr), UN Chinese Language Day (20 Apr), World Creativity and Innovation Day (21 Apr), World Day for Safety and Health at Work (28 Apr), International Dance Day (29 Apr), World Veterinary Day (30 Apr).
4. The MoEFCC ENVIS Earth Day page (ismenvis.nic.in) fetch failed; Earth Day is instead sourced from the Uttarakhand SLSA newsletter (gov.in) and the Delhi Government Environment Department list (gov.in).
5. Annual themes are included only with their year written explicitly (World Health Day 2025, Civil Services Day 2026, World Malaria Day 2025), per the book rule; no theme is presented as permanent.
