# HIS-17 — কোম্পানির শাসনব্যবস্থা: আইন, ভূমিরাজস্ব ও অর্থনীতি — Draft Report

- Chapter: HIS-17, part `modern_company`, subtopics `company_rule`, `acts_policies` (title/part/subtopics taken verbatim from `BE/db/books/history/toc.js`)
- Status: DRAFT, verification UNVERIFIED
- Validator: `node scripts/validateBooks.js bookwork/his-17/chapter.json` → **OK**

## Counts

- Claims: **85** (every claim carries a verbatim quote from a source actually fetched via browser.open; every claim is referenced at least once — verified programmatically)
- Practice questions: **42** (basic 10, moderate 15, difficult 10, exam 7; formats DIRECT, STATEMENT, CHRONOLOGY, ASSERTION_REASON, PAIRS, MATCH; every one of the 7 sections has questions)
- Sections: 7 (`acts`, `administration`, `settlements`, `countryside`, `commercialisation`, `drain`, `education`)
- Events 8, People 9, Timeline 21, Terms 12, Cause–effect 4, Exam focus 10

## Sources actually fetched (browser.open)

NCERT first, then IGNOU eGyanKosh (GoI platforms authorised by the owner on 2026-11-19):

1. NCERT, Our Pasts III (Class VIII), Ch. 2 "From Trade to Territory" — https://ncert.nic.in/textbook/pdf/hess202.pdf
2. NCERT, Our Pasts III (Class VIII), Ch. 3 "Ruling the Countryside" — https://ncert.nic.in/textbook/pdf/hess203.pdf
3. NCERT, Our Pasts III (Class VIII), Ch. 6 "Civilising the Native, Educating the Nation" — https://ncert.nic.in/textbook/pdf/hess206.pdf
4. NCERT, Themes in Indian History Part III (Class XII), Theme 9 "Colonialism and the Countryside" — https://ncert.nic.in/textbook/pdf/lehs301.pdf
5. IGNOU BHIC-134, Unit 6 "Colonial Economy: Agriculture" — https://egyankosh.ac.in/bitstream/123456789/123196/1/Unit-6.pdf
6. IGNOU BHIC-134, Unit 7 "Colonial Economy: Trade and Industry" — https://egyankosh.ac.in/bitstream/123456789/123197/1/Unit-7.pdf
7. IGNOU BHIC-134 full book, Unit 4 "Expansion and Consolidation" + Unit 8 "Economic Impact of Colonial Rule" — https://egyankosh.ac.in/bitstream/123456789/73867/1/BHIC-134(English).pdf
8. IGNOU, Unit 9 "Drain of Wealth Debate" — https://egyankosh.ac.in/bitstream/123456789/103063/1/Unit-9.pdf
9. IGNOU, Block 6, Unit 23 "Constitutional Developments (1757–1858)" + Unit 24 "Administration and Law" — https://egyankosh.ac.in/bitstream/123456789/62949/1/Block-6.pdf
10. IGNOU, Unit 5 "Agrarian Structure and Agrarian Movements" — https://egyankosh.ac.in/bitstream/123456789/32676/1/Unit-5.pdf

Also fetched but not used as sources: NCERT lehs303.pdf (Gandhi theme — wrong chapter) and hess207.pdf (Women, Caste and Reform — HIS-20 material).

## PYQs

- Candidates found for HIS-17 (from `BE/db/books/history/pyq_chapters.json` / `drafts/pyq_candidates_HIS-17.json`): **19**. Polity `pyq_map.json` checked: no HIS-17 entries.
- Mapped in `pyq_map_HIS-17.json`: **19/19**. Taught: **12**. Untaught: **7**, each with a specific reason in the map.
- Taught coverage includes all four Drain/Naoroji questions, Pitt's India Act 1784, ICS under Cornwallis, Ryotwari–Munro, Bengal Tenancy Act 1885, Asiatic Society (founder + contemporary GG), Persian→English 1835, Calcutta University 1857.

## Subtopic coverage

- `acts_policies`: sections `acts` (Regulating 1773 → GOI Act 1858) and `education` (Orientalism → 1835 → Wood's Despatch), plus `administration` (civil service, judiciary, Rule of Law).
- `company_rule`: sections `settlements`, `countryside`, `commercialisation`, `drain` (land revenue systems, rural impact, commercial crops/indigo, deindustrialisation and the Drain of Wealth debate).

## Gaps (disclosed, never filled from memory)

1. **WBBSE e-textbooks unreachable** from this machine — not retried, per instructions.
2. **NCERT Class XI Indian Economic Development ch. 1 (keec101.pdf)** fetch failed once; not retried per instruction. Economic content was covered instead by IGNOU Units 6–9.
3. **Taccavi** (WBCS-2016-Q190): no fetched authorised source defines the term — untaught.
4. **Railways 1853 Bombay–Thane** (WBCS-2017-Q182) and **Dalhousie as introducer/advocate of railways** (WBCS-2015-Q58, WBCS-2018-Q156): not stated in any fetched authorised source (only coaching sites, which are not permitted). Sources do confirm Dalhousie's all-India Post & Telegraph departments. Untaught; flagged in exam_focus.
5. **Wilkins' Bhagavad Gita translation** (IDO-2019-Q43): Wilkins is absent from all fetched sources — untaught (primary HIS-20).
6. **Conflicting civil-services keys**: WBCS-2015-Q51 bank key (Hastings, flagged doubtful) conflicts with WBCS-2016-Q32 (Cornwallis) and IGNOU Unit 24. The conflict is disclosed in the chapter (administration deep text + exam_note); the doubtful key is not taught.
7. **First cotton mill year conflict**: WBCS-2023-Q37 bank key says 1818; fetched IGNOU BHIC-134 Unit 8 says the first Indian mill was set up in Bombay in 1854. Disclosed in exam_focus; bank key not taught.
8. **Persian→English 1835** (WBCS-2015-Q31) is taught by combining two fetched sources (NCERT hess206 on the English Education Act 1835 + IGNOU BHIC-134 Unit 4 on Persian as the official-record language); no single fetched source states the replacement in one sentence.
