# ORG-04 — ভারতীয় প্রতিষ্ঠান ও নিয়ন্ত্রক (part: india, subtopic: indian_bodies) — Draft Report

Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Counts
- Claims: **31** (all with verbatim quotes from pages/PDFs actually fetched via browser.open)
- Practice questions: **42** (basic 18, moderate 13, difficult 6, exam 5 — 7 per section across all 6 sections)
- Sections: 6 — rbi_nabard, sebi, eci_upsc, niti, isro, current_heads

## Sources actually fetched (allowed publishers only: NCERT / GOVT *.gov.in / *.nic.in)
1. NCERT, Introductory Macroeconomics XII, Ch. 3 Money and Banking — https://ncert.nic.in/textbook/pdf/leec103.pdf
2. PIB Press Note "India's Economic Surge" (Sanjay Malhotra, RBI Governor) — https://www.pib.gov.in/PressNoteDetails.aspx?NoteId=154840&ModuleId=3&reg=3&lang=1
3. SEBI Working Paper No. 7 front matter (SEBI constituted 12 Apr 1988; statutory status 30 Jan 1992; SEBI Act objectives) — https://www.sebi.gov.in/sebi_data/attachdocs/1293096997650.pdf
4. SEBI PR No.10/2025 (Tuhin Kanta Pandey takes charge as Chairman, Mumbai, 1 Mar 2025) — https://www.sebi.gov.in/sebi_data/attachdocs/may-2025/1746622420791.pdf
5. PIB PRID 2144286 (NABARD 44th Foundation Day: est. 12 Jul 1982, HQ Mumbai, Chairman Shaji K V) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2144286&reg=48&lang=2
6. NITI Aayog publication on niti.gov.in, "About NITI Aayog" pages (formed 1 Jan 2015 by Cabinet resolution; replaced Planning Commission, instituted 1950; think tank; cooperative federalism) — https://niti.gov.in/sites/default/files/2025-10/Coal_Gasification_Technology_for_Indian_High_Ash_Content_Coal.pdf
7. PIB Backgrounder: UPSC — A Century of Meritocracy and Inclusion (1 Oct 1926; Ross Barker; Arts. 315–323; Dholpur House HQ 1952; exams list; Satyendranath Tagore from Calcutta) — https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/oct/doc_10278_20261027_15483701.pdf
8. CEO Nagaland official page (ECI constituted 25 Jan 1950; permanent independent Constitutional body; HQ Nirvachan Sadan, New Delhi) — https://ceo.nagaland.gov.in/about
9. PIB PRID 2113296 (Gyanesh Kumar, 26th CEC; ECs Sandhu & Joshi) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2113296&reg=48&lang=2
10. ISRO official: About ISRO (formed 15 Aug 1969; INCOSPAR 1962, Sarabhai; HQ Bengaluru; DOS) — https://www.isro.gov.in/profile.html
11. ISRO official: Dr. V. Narayanan assumed charge 13 Jan 2025 (earlier LPSC Director) — https://www.isro.gov.in/ISRO_EN/DrVNarayanan_Assumed_Charge_Secretary_DOS_Chairman_Space_Commission.html

Note: rbi.org.in is NOT in this book's allowed publisher list (RBI is allowed only for the Economy book), so RBI facts were sourced from NCERT + PIB instead.

## PYQ candidates
- Found: **26** (3 GK-bank items with subtopic `indian_bodies` in db/gk/organisations.jsonl: GK-ORG-011/012/013; 23 real exam items grepped from db/pyq/*.json)
- Mapped: 26 · **Taught: 13** · Untaught: 13 (each with a specific reason in pyq_map_ORG-04.json)

## Subtopic coverage (indian_bodies)
Covered with fetched quotes: RBI (year + functions + Governor), NABARD (date, HQ, mission, Chairman), SEBI (formation, statutory year, objectives, Chairman), ECI (date, status, HQ, CEC + ECs), UPSC (1926, articles, first Chairman, HQ, exams), NITI Aayog (date, mode of formation, predecessor, think-tank role, cooperative federalism), ISRO (INCOSPAR 1962, formation 1969, HQ, DOS, Chairman). Current heads are dated as of **19 November 2026** in the chapter's exam_note, per instructions.

## Gaps (disclosed, never filled from memory)
- **RBI headquarters (Mumbai), nationalisation (1949), first/first-Indian Governors, RBI Act 1934, Kolkata→Mumbai move (1937): NOT taught** — the only sources carrying them verbatim are on rbi.org.in, which is not an allowed publisher for the organisations book; no NCERT/PIB/IGNOU page fetched in this run carried them.
- **IRDAI (Hyderabad) and SIDBI (Lucknow): not covered** — they appear in GK-ORG-012 but no allowed-source quote was fetched; left out rather than asserted.
- **CAG, Finance Commission, TRAI, NHRC, CCI, PFRDA: not covered** — no fetched allowed-source quotes in this run.
- **Article 324 number for the ECI and appointment-by-President detail: not stated** — the fetched ECI source (CEO Nagaland) describes the body and its powers without the article number.
- **UPSC Chairman and NITI Aayog CEO/Chairperson names: omitted** — no allowed-source quote fetched; the current_heads section lists only the five heads verified from PIB/official releases.
- **One-rupee note exception, repo rate, SVEEP, NITI indices, RBI's 2022 department, UDGAM portal:** appear in real PYQs but are untaught (see pyq_map notes).
- NCERT Class XI *Indian Constitution at Work* chapter PDF (leps103.pdf) could not be fetched (network error); ECI facts were sourced from the official CEO Nagaland page instead.
