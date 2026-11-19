# HIS-03 — বৈদিক যুগ — Draft Report

Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js chapter.json` → **OK**.

## Sources actually fetched (browser text-fetch, 2026-11-19)

Registered as chapter sources (all NCERT, the only publisher family the current history validator accepts):

1. Our Pasts I, Class VI, Ch. 4 "What Books and Burials Tell Us" — https://ncert.nic.in/textbook/pdf/fess104.pdf
2. Our Pasts I, Class VI, Ch. 5 "Kingdoms, Kings and an Early Republic" — https://ncert.nic.in/textbook/pdf/fess105.pdf
3. Our Pasts I, Class VI, Ch. 6 "New Questions and Ideas" — https://ncert.nic.in/textbook/pdf/fess106.pdf
4. Themes in Indian History Part I, Class XII, Theme 2 "Kings, Farmers and Towns" — https://ncert.nic.in/textbook/pdf/lehs102.pdf
5. Themes in Indian History Part I, Class XII, Theme 3 "Kinship, Caste and Class" — https://ncert.nic.in/textbook/pdf/lehs103.pdf

Also fetched and cross-checked, but **not** registered as a source (see gap G1):

6. NIOS Sr. Secondary History (315), Lesson 4 "The Vedic Age (1500 BC–600 BC)" — https://digital.nios.ac.in/content/315en/315_History_Eng_Lesson4.pdf — fetched in full; it agrees with the NCERT-based chapter on every overlapping point.

## Counts

- Claims: **42** (c01–c42), every one with a verbatim quote from a fetched NCERT PDF above.
- Practice questions: **42** — basic 10, moderate 15, difficult 10, exam 7 (DIRECT 35, STATEMENT 2, MATCH 2, CHRONOLOGY 1, PAIRS 1, ASSERTION_REASON 1). Every question cites its supporting claim ids.
- Sections: 6 (vedic_literature, land_and_people, polity_economy, varna_society, later_changes, upanishad_thought), each with quick/standard; deep on 3.
- Events 5, people 6, timeline 6, terms 12, cause_effect 3, exam_focus 9, quick_revision 15.

## PYQs

Candidates for HIS-03 in `pyq_chapters.json`: **5**. Polity `pyq_map.json` has no HIS-03 entries. All 5 were located in `db/pyq` and their official answers verified (IDO 2019 Q7 → Puranas; WBCS 2024 Q161 → 1028; WBCS 2024 Q175 → Brihadaranyaka Upanishad; Clerkship 2007 Q6 → Vedic period; Clerkship 2023 Session IV Q99 → Rig Veda).

- Mapped: 5/5 in `pyq_map_HIS-03.json`.
- Taught: **2/5** — IDO-2019-Q7 (Vedic corpus vs later Puranic literature) and Clerkship-2007-Q6 (Gargi and Apala are named in NCERT fess106 as women thinkers of the age).
- Not taught: **3/5**, each with the specific reason in the pyq_map: exact Rigveda hymn count 1028 (NCERT says only "more than a thousand hymns"), "Tamaso Ma Jyotirgamaya" → Brihadaranyaka Upanishad (not named in fetched NCERT pages), and the root of Yoga in a Rigvedic hymn (NCERT presents Yoga only as a later system of Patanjali). An exam_note box in the chapter discloses the 1028 gap to students.

## Subtopic coverage

Registered subtopic: `vedic` (from toc.js, verbatim). Covered within it: the four Vedas and the Rigveda (age, sukta, gods, language, oral transmission), Rigvedic geography and janas, Arya/Dasa, cattle economy, battles and yajna, the tax-less and army-less Rigvedic raja and assemblies, the four varnas and the Purusha Sukta, ashvamedha, janapadas and Painted Grey Ware, iron ploughshares and paddy transplantation, and the Upanishads (atman–brahman, Gargi/Apala/Ghosha/Maitreyi, Satyakama Jabala, Chhandogya, Panini, six schools).

## Gaps (disclosed, never filled from memory)

- **G1 — NIOS/IGNOU/e-PG Pathshala cannot be registered as sources.** The owner authorised these platforms on 2026-11-19 and the NIOS Vedic Age lesson was fetched in full, but the current history validator (`src/services/books.validate.js`, PROFILES.history.publishers) accepts only NCERT and WBBSE source URLs; a NIOS URL (nios.ac.in) fails validation. The chapter is therefore restricted to NCERT-supported facts, exactly as in the sibling drafts (HIS-10/13/20). If the validator is extended to GOVT/ac.in educational sources, the NIOS lesson would immediately support the untaught items below.
- **G2 — WBBSE unreachable** from this machine (per brief; not retried). No WBBSE claims used.
- **G3 — Not taught for lack of a fetchable NCERT/WBBSE quote:** the contents of the Sama, Yajur and Atharva Vedas individually; the exact Rigveda hymn/mandala counts (1028 hymns, 10 mandalas); the Sapta Sindhu river list by name; sabha/samiti/vidatha by name and their functions; iron use dated c. 1000 BCE in the later Vedic period (NCERT XII supports only "growing use of iron" by the sixth century BCE and iron ploughshares in the janapada transition); gotra and ashrama; the rise of Vishnu and Rudra; rajasuya/vajapeya by name; the Brihadaranyaka Upanishad and "Tamaso Ma Jyotirgamaya"; Lopamudra by name; Dasarajna (Battle of Ten Kings); Gayatri mantra. None of these appear in the chapter text or questions.
- **G4 — Bengal connection is indirect and is labelled as such:** no direct Bengal material for the Vedic age exists in the fetched NCERT pages; the chapter uses the documented later link (a Mahabharata-scene terracotta from West Bengal, c. 17th century, pictured in NCERT XII Theme 3) and says plainly that the Vedic heartland was not Bengal.
- **G5 — related_facts left empty:** no GK fact codes were verified against the taxonomy files in this run; the exemplar's codes belong to other chapters and were not copied.
