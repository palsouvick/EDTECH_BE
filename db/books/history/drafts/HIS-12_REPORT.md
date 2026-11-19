# HIS-12 — ভক্তি ও সুফি আন্দোলন (Bhakti and Sufi Movements) — Draft Report

- **Chapter**: HIS-12, part `medieval`, subtopics `["bhakti_sufi"]` (verbatim from `db/books/history/toc.js`), status **DRAFT**, verification **UNVERIFIED**.
- **Deliverables**: `chapter.json` (validator: **OK**), `pyq_map_HIS-12.json`, this report.
- **Counts**: **67 claims**, **42 questions** (basic 10, moderate 15, difficult 10, exam 7; formats: DIRECT 35, STATEMENT 2, MATCH 2, PAIRS 1, ASSERTION_REASON 1, CHRONOLOGY 1), 7 sections (s1–s7), 10 events, 17 people, 13 timeline rows, 15 terms, 3 cause–effect chains, 12 quick-revision points.

## Sources actually fetched (browser text-fetch, 2026-11-19)

1. NCERT, *Our Pasts II*, Class VII, "Devotional Paths to the Divine" — https://ncert.nic.in/textbook/pdf/gess106.pdf (the book's Unit/Chapter 6 in the current reprint; pp. 61–77). Primary spine for s1, s2, s6, s7 basics.
2. NCERT, *Themes in Indian History Part II*, Theme 6 "Bhakti–Sufi Traditions" — https://ncert.nic.in/textbook/pdf/lehs202.pdf (pp. 140–167). Saguna/nirguna, Chishti table, khanqah, ziyarat/qawwali, Khusrau's qaul, Jayasi's Padmavat, Kabir/Nanak/Mirabai depth.
3. IGNOU eGyanKosh, EHI-03/EHI-04 Unit 16 "Bhakti and Sufi Traditions" (Theme IV: Religion and Culture) — https://egyankosh.ac.in/bitstream/123456789/68925/3/Theme-IV.pdf (Unit pp. 331–343). Bengal Vaishnavism §16.5.4 (Jayadeva, Chandidas, Vidyapati, Chaitanya 1486–1533, sankirtan, Haridas), Ramananda, Vallabha.
4. IGNOU eGyanKosh, BHIC-112 Theme 4 (Units 10–11) — https://egyankosh.ac.in/bitstream/123456789/82886/3/Theme-4.pdf (§11.4.3, pp. 153–154). Six Goswamis of Vrindavan incl. Rupa & Sanatana; Govindadevji temple built by Rupa Goswami in 1535.
5. IGNOU eGyanKosh, Unit 18 "Eighteenth Century — Polities I" — https://egyankosh.ac.in/bitstream/123456789/102541/1/Unit-18.pdf (§18.4.5, p. 260). The one authorised source found that states Aurangzeb had Guru Tegh Bahadur decapitated in 1675.

Fetch notes: an NCERT Class VII file for a different chapter (gess108, Eighteenth-Century Political Formations) was opened while locating the right file and was **not** used. One NCERT URL (lehs206.pdf) failed at the fetch layer; the correct Theme 6 file (lehs202.pdf) was fetched instead. e-PG Pathshala and NIOS were searched but no usable module on this chapter's gaps was retrieved; no coaching/Wikipedia/devotional site was used as a source.

## PYQs

- Candidates: **10** — the 9 in `db/books/history/drafts/pyq_candidates_HIS-12.json` (from `pyq_chapters.json`) **plus 1 found by searching `db/pyq` directly**: WBCS-EXE-PRELIMS-2022-PRELIMS-Q101 (Chaitanya's contemporary Bengal ruler). Polity `pyq_map.json` contains no HIS-12 entries (checked).
- Mapped: **10/10**. Taught: **5** (Tegh Bahadur–Aurangzeb 2017; Khalsa founder 2018; Ramcharitmanas 2021; tenth/last Guru 2023; Sikh founder Nanak, Clerkship 2007). Each taught PYQ is mirrored by a practice question (q32, q38, q39, q40, q41).
- Untaught: **5**, each with the specific reason in `pyq_map_HIS-12.json` — Rupa–Sanatana's court (2024 Q95), Padmavat's completion reign (2024 Q96), Maladhar Basu 'Gunaraj Khan' (Clerkship 2004), Khusrau–sitar (Clerkship 2007), Chaitanya's contemporary sultan (WBCS 2022). In every case the person/topic is taught as far as the fetched sources go; only the specific asked fact lacks an authorised quote, so it was left out rather than written from memory. Two of these gaps are flagged to students in in-chapter `exam_note` boxes (s3, s5).

## Subtopic coverage (`bhakti_sufi`)

Full coverage across 7 sections: bhakti's idea and southern origins (s1), acharyas and regional traditions incl. Virashaiva and Maharashtra (s2), Bengal Vaishnavism and Chaitanya (s3), Sufism's concepts and organisation (s4), the Chishtis — khanqah, sama/qawwali, state relations, Sufi literature (s5), Kabir and the northern sants incl. Tulsidas, Surdas, Mirabai, Shankaradeva (s6), and Guru Nanak to the Khalsa (s7). Bengal connection is intrinsic (TOC marks HIS-12 🐅) and is carried by s3 plus the dedicated `bengal_connection` block.

## Gaps (disclosed, not filled)

- **WBBSE e-textbooks unreachable** from this machine (per brief) — no WBBSE source used; noted as a standing gap for Bengal-specific detail (e.g. Maladhar Basu, Hussain Shahi court).
- **Rupa–Sanatana under Hussain Shah**: no fetched NCERT/IGNOU text states their court service; only their identity as Chaitanya's Goswamis is sourced. Affects WBCS 2024 Q95 and WBCS 2022 Q101.
- **Amir Khusrau and the sitar**: attribution absent from all fetched sources (he is sourced as poet, musician, Nizamuddin's disciple, inventor of the qaul).
- **Padmavat's completion under Sher Shah**: Jayasi/Padmavat as premakhyan is sourced (NCERT XII); the reign fact belongs to HIS-13 and is unsourced here.
- NCERT VII's PDF text layer drops some words (e.g. "julaha", "sakhis/sabads", "dharmsal"); where a dropped word was load-bearing, the claim was taken from NCERT XII or IGNOU instead, and quotes reproduce the fetched text.
- `related_facts` left empty: no GK fact codes were verified against the fact bank for this chapter in this run.
