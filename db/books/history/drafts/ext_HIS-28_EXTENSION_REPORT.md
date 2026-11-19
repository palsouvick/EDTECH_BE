# HIS-28 Extension Report — Post-Independence India

Installed chapter: `BE/db/books/history/ch28-post-independence.json` (HIS-28, PUBLISHED, 52 claims c01–c52, 42 questions q01–q42).
Work list: the 12 `taught:false` entries in `drafts/pyq_map_HIS-28.json`.
Result: **4 PYQs flipped to taught**, 4 new claims (c53–c56), 4 new sources (s3–s6), 8 new questions (q43–q50). Validator: `node scripts/validateBooks.js` → **OK**.

## Sources fetched (all allowed publishers — IGNOU eGyanKosh)

| New source id | Title | URL |
|---|---|---|
| s3 | IGNOU, *Gandhi: The Man and His Times*, Unit 14: Jinnah and Savarkar | https://egyankosh.ac.in/bitstream/123456789/63799/1/Unit-14.pdf |
| s4 | IGNOU, *Indian National Movement*, Unit 18: Nationalist Struggles in the Princely States | https://egyankosh.ac.in/bitstream/123456789/106116/1/Unit-18.pdf |
| s5 | IGNOU, *Conflict and Cooperation in South Asia*, Unit 11: Territorial Disputes | https://egyankosh.ac.in/bitstream/123456789/85149/1/Unit-11.pdf |
| s6 | IGNOU BPSC-104, *Regional Aspirations and Movements*, Unit 8: Movements for Separate Statehood | https://egyankosh.ac.in/bitstream/123456789/66635/1/Unit-8.pdf |

Each page was actually fetched and the quote below read from it verbatim.

## Facts added per flipped PYQ

1. **WBCS-EXE-PRELIMS-2017-PRELIMS-Q120** — First Governor-General of Pakistan → taught in **s1** (deep text).
   New claim **c54** (source s3): *"After intense negotiations, it was decided to partition the country and Pakistan was founded few hours before India's 'Tryst with Destiny' on the midnight of 14-15 August 1947. Jinnah became the first Governor General of the new Nation Pakistan."*
   New questions: q45 (basic), q46 (moderate).

2. **WBCS-EXE-PRELIMS-2019-PRELIMS-Q62** — Boundary demarcated by Sir Cyril Radcliffe → taught in **s2** (standard text; the old exam_note box that disclosed the name as untaught was updated to match).
   New claim **c53** (source s5): *"Sir Cyril Redcliff, a British barrister who had never visited India, had no knowledge of its realities, and arrived in India five weeks before the announcement of division, defined the India-Pakistan border in an absurd and illogical manner."* (The unit spells the name "Redcliff"; the panel passage in the same unit — a five-member panel chaired by him, with two Muslim and two Hindu members — is also woven into s2 and tested in q44. The spelling variant is disclosed in the chapter text and box.)
   New questions: q43 (basic), q44 (moderate).

3. **WBCS-EXE-PRELIMS-2024-PRELIMS-Q144** — Operation Polo (Hyderabad) → taught in **s5** (standard text; the old exam_note box updated to match).
   New claim **c55** (source s4): *"The armed takeover of Hyderabad through 'Operation Polo' by the Indian troops in September 1948 was celebrated as a democratic step by the people of Hyderabad state."*
   New questions: q47 (basic), q48 (exam).

4. **WBPSC-CLERKSHIP-PART-I-2023-SESSION-III-Q87** — Sikkim became a full-fledged state in 1975 → taught in **s6** (standard text, plus a 1975 timeline entry).
   New claim **c56** (source s6): *"However, Nagaland became a state in 1963; Meghalaya, Manipur and Tripura in 1972; Arunachal Pradesh and Mizoram became states from Union Territories in 1985; and Sikkim was annexed into India in 1975."*
   The chapter teaches the asked fact — Sikkim joined India in **1975**, in IGNOU's own state-formation sequence — so a student can answer the year question. The chapter wording follows the source ("অন্তর্ভুক্ত/annexed"); it does not add the 36th Amendment or "22nd state", which no fetched allowed source stated.
   New questions: q49 (basic), q50 (difficult, chronology).

Also added: 3 exam_focus points and 2 quick_revision lines covering the new facts. Status kept PUBLISHED; verification block untouched.

## Entries deliberately skipped (scope rule)

- **INDUSTRIAL-DEVELOPMENT-OFFICER-2019-SINGLE-Q54**, **WBCS-EXE-PRELIMS-2022-PRELIMS-Q79**, **WBPSC-CLERKSHIP-PART-I-2009-SESSION-II-Q3**, **WBPSC-CLERKSHIP-PART-I-2019-AFTERNOON-Q16** — First/Last Indian Governor-General (C. Rajagopalachari): the map marks this topic **primary chapter HIS-27, alt HIS-28 only** — another chapter's to teach, not HIS-28's.
- **WBCS-EXE-PRELIMS-2016-PRELIMS-Q119** — Congress president when India became free (J. B. Kripalani): **primary chapter HIS-26, alt HIS-28 only**.
- **WBCS-EXE-PRELIMS-2016-PRELIMS-Q55** — Number of princely states: **bank-key conflict** — the chapter's sourced figure is NCERT's 565, which is not among the PYQ's options (555/558/560/562). Skipped and disclosed, per rule; the chapter was not bent to the doubtful key (the discrepancy remains disclosed in s4).
- **WBCS-EXE-PRELIMS-2016-PRELIMS-Q71** — Hind Mazdoor Sangh founder: map marks it **OUT_OF_SCOPE** (trade-union movement).
- **WBCS-EXE-PRELIMS-2019-PRELIMS-Q166** — Sikkim's last sovereign king (Palden Namgyal): **primary mapping OUT_OF_SCOPE, alt HIS-28 only**.

## Entries still unsourceable

None among the in-scope source-gap entries: all four (Jinnah, Radcliffe, Operation Polo, Sikkim 1975) were sourced verbatim from IGNOU eGyanKosh units. No fact was filled from memory.

## Integrity checks

- Validator: `cd ~/workspace/edtech/BE && node scripts/validateBooks.js ~/workspace/edtech/bookwork/ext-his-28/chapter.json` → **chapter.json: OK**.
- Key preservation (programmatic, installed file vs extended chapter.json): all **42 pre-existing questions (q01–q42) are present with their full objects — including the answer key text `a` — byte-identical**; none modified, reordered or deleted. All **52 pre-existing claims (c01–c52)** are likewise unchanged. New material is appended only (claims c53–c56, questions q43–q50, sources s3–s6), plus the two exam_note boxes in s2/s5 whose "not taught" disclosure text was updated to reflect the new teaching (their original claim references were kept and the new claim added).
