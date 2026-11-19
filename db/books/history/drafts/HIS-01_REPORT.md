# HIS-01 — Draft Report

Chapter: **HIS-01 — প্রাগৈতিহাসিক ভারত: প্রস্তর যুগ, প্রথম কৃষক ও তাম্রপ্রস্তর সংস্কৃতি** (part: ancient, subtopics: prehistoric)
Deliverables: `chapter.json` (status DRAFT, verification UNVERIFIED), `pyq_map_HIS-01.json`, this report.
Validator: `node scripts/validateBooks.js bookwork/his-01/chapter.json` → **OK**.

## Sources actually fetched (browser text-fetch, 2026-11-19)

Cited in `chapter.json` `sources[]` (NCERT only — see gap note 1):

1. **NCERT, Our Pasts I, Class VI, Chapter 2: From Hunting-Gathering to Growing Food** — https://ncert.nic.in/textbook/pdf/fess102.pdf — the chapter's main base: Stone Age divisions and dates, hunter-gatherer life and movement, stone tools, Bhimbetka, Kurnool fire evidence, microliths, climate change and grasslands, domestication, first farmers/herders, Burzahom, Mehrgarh.
2. **NCERT, Exploring Society: India and Beyond, Class VI, Chapter 4: Timeline and Sources of History** — https://ncert.nic.in/textbook/pdf/fees104.pdf — archaeologists' evidence list (p. 61) and the Fig. 4.3 timeline (pp. 62–63): first settlements/agriculture c. 10,000 BCE, beginning of copper metallurgy c. 6000 BCE.
3. **NCERT, Exploring Society: India and Beyond, Class VI, Chapter 6: The Beginnings of Indian Civilisation** — https://ncert.nic.in/textbook/pdf/fees106.pdf — only the Metallurgy sidebar definition and the "settling down … metallurgy … towards civilisation" line (p. 86) are used; the Harappan body of the chapter belongs to HIS-02 and was not used.

Fetched and read, but **not citable** in `claims[]` (see gap note 1):

4. **IGNOU eGyanKosh, MAN-104 Unit 16: Chalcolithic Cultures** (Prof. Bishnupriya Basak) — https://egyankosh.ac.in/bitstream/123456789/122075/1/Unit-16.pdf — Ahar/Banas, Kayatha, Malwa, Jorwe, OCP, PGW with chronologies and site detail.
5. **e-PG Pathshala (INFLIBNET), Pre and Protohistoric Cultures of India: Lower Palaeolithic Culture** — https://ebooks.inflibnet.ac.in/icp02/chapter/lower-palaeolithic-culture/ — Acheulian/Soanian traditions, R. B. Foote 1863, and the Hathnora (Narmada) fossil cranium.
6. **e-PG Pathshala, Mesolithic Cultures of India** — https://ebooks.inflibnet.ac.in/icp02/chapter/mesolithic-cultures-of-india/ — microlith technology, Bagor/Tilwara huts, Adamgarh/Bhimbetka domesticated-animal bones, Birbhanpur (Damodar plain).
7. **e-PG Pathshala, Northwestern, Northern and Northeastern Neolithic of the Indian Subcontinent** — https://ebooks.inflibnet.ac.in/icp02/chapter/northwesternnorthernandnortheastern-neolithic-of-the-indian-subcontinent/ — Mehrgarh aceramic Neolithic detail, Burzahom pit-dwellings and bone industry, Daojali Hading/Sarutaru.

## Counts

- Claims: **45** (all NCERT, each with a verbatim quote and page reference; every claim is used at least once — validator enforces this).
- Practice questions: **42** — basic 10, moderate 15, difficult 10, exam 7 (formats: DIRECT, STATEMENT ×3, MATCH, PAIRS, CHRONOLOGY, ASSERTION_REASON). Every section is tested; every question cites its supporting claim ids.
- Sections: **7** — stone_age_divisions, tools_fire_art, mesolithic_transition, farming_begins, neolithic_settled_life, mehrgarh, chalcolithic. Plus events (5), people (5 community entries — prehistory has no named individuals in the sources), timeline (5), terms (8), cause_effect (2), exam_focus (8), quick_revision (13).

## PYQs

Candidates in `db/books/history/drafts/pyq_candidates_HIS-01.json` / `pyq_chapters.json`: **3**.

- WBCS 2019 Q75 (earliest agriculture → Mehrgarh): mapped to `mehrgarh`, **taught**.
- WBCS 2022 Q56 (earliest settled agriculture → Mehrgarh): mapped to `mehrgarh`, **taught**.
- WBCS 2022 Q88 (archaic Homo sapiens fossil → Narmada valley): **not taught** — source gap, reason recorded in `pyq_map_HIS-01.json`.

Mapped 3/3; taught 2/3. No PYQ was invented; the polity `pyq_map.json` route was not applicable (this is a History chapter; candidates came from the History bank as instructed).

## Subtopic coverage (prehistoric)

- Palaeolithic (dates, subdivisions, 99% of human history, hunter-gatherer life, tools, fire, rock art): full, NCERT-backed.
- Mesolithic (dates, microliths, climate shift, grasslands): full at NCERT depth.
- Neolithic (domestication, first crops/animals, settled life, Burzahom, pottery, weaving, storage): full, NCERT-backed.
- Mehrgarh / first farmers: full, NCERT-backed; carries both real PYQs.
- Chalcolithic: **partial by design** — definition (stone + copper), metallurgy, and the NCERT timeline date for copper metallurgy (c. 6000 BCE) are taught; the named regional cultures are disclosed as untaught in an `exam_note`, mirroring the HIS-13 precedent for Sher Shah's administration.

## Gaps

1. **Source-set conflict (owner decision needed).** The task brief authorised IGNOU eGyanKosh, NIOS and e-PG Pathshala (owner, 2026-11-19), and all three were fetched. But `src/services/books.validate.js` (History profile) accepts only NCERT and WBBSE source URLs — IGNOU/e-PG URLs fail with SOURCE_NOT_ALLOWED, and the chapter had to print OK. The chapter is therefore NCERT-only, exactly like HIS-10 ("NCERT-only; source decision pending"). If the owner extends the History source set in the validator, the Chalcolithic section can be completed from source 4 above (Ahar c. 2025–1270 BC calibrated, Kayatha c. 2450–2000 BC, Malwa c. 1900–1400 BC, Jorwe/Inamgaon burials) and the Narmada fossil PYQ can be taught from source 5 — both already fetched and read.
2. **Regional Chalcolithic cultures (Ahar, Kayatha, Malwa, Jorwe, Inamgaon) not taught** — consequence of gap 1; disclosed to students in the chapter's `exam_note`.
3. **Narmada/Hathnora fossil PYQ (WBCS 2022 Q88) not taught** — consequence of gap 1; disclosed in the PYQ map.
4. **WBBSE অতীত ও ঐতিহ্য unreachable** from this machine (per brief; not retried). Bengal-specific prehistoric sites (e.g. Pandu Rajar Dhibi) are therefore not taught; `bengal_connection` states this honestly and rests only on NCERT's "east India" farmer/herder sites claim (c25).
5. **NCERT XII Themes I (lehs101.pdf) fetch failed once** with a network error during this run and was not retried; it was not needed — the chapter's NCERT base (Class VI) covers the registered scope at textbook depth.
6. Mesolithic site-level detail (Bagor, Adamgarh, Sarai Nahar Rai) and Palaeolithic traditions (Soanian/Acheulian, Attirampakkam/Isampur dates) exist only in the fetched-but-uncitable sources 5–6, so they are absent from the chapter; noted here so a future source-set decision can add them.
