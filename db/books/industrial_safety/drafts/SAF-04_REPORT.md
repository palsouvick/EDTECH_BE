# SAF-04 — বৈদ্যুতিক নিরাপত্তা (Electrical Safety) — Draft Report

- **Book / chapter:** industrial_safety, SAF-04, part `workplace`, subtopic `electrical_safety` (title/part/subtopics verbatim from `db/books/industrial_safety/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/saf-04/chapter.json` → **OK**
- **Deliverables:** `chapter.json`, `pyq_map_SAF-04.json`, this report — in `~/workspace/edtech/bookwork/saf-04/`

## Sources actually fetched (browser.open, 2026-11-19)

All URLs belong to the GOVT publisher allowed by `PROFILES.industrial_safety` (publishers: GOVT, NCERT, NIOS).

| id | Title | URL |
|----|-------|-----|
| s1 | Central Electricity Authority (Measures relating to Safety and Electric Supply) Regulations, 2023 — Gazette of India notification, 8 June 2023 (CEA) | https://cea.nic.in/whats-new/file?path=%2Fhome%2Fcea_website%2Freports%2Fgeneral%2Fen%2Fpdf_100_183_English.pdf&mode=view |
| s2 | Press Information Bureau release on the CEA Safety Regulations, 2023 (Rajya Sabha reply, Ministry of Power) | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2041636&reg=48&lang=2 |
| s3 | The Factories Act, 1948 (Act 63 of 1948) — full Act text, Directorate of Factories & Boilers, Odisha | https://dfb.odisha.gov.in/sites/default/files/2022-04/act.pdf |
| s4 | IS 12640 (Part 2): 2016 — Residual Current Operated Circuit-Breakers with Integral Overcurrent Protection (RCBOs), Bureau of Indian Standards | https://services.bis.gov.in/tmp/tbl5_2024-11-08_1157.pdf |

## Counts

- **Claims:** 42 (c01–c42), every one with a verbatim quote from a fetched page above; every claim is used by at least one section/event/person/timeline/cause-effect/box/question (validator-enforced).
- **Questions:** 42 — basic 12, moderate 12, difficult 9, exam 9 (STATEMENT ×3, ASSERTION_REASON ×2, MATCH ×2, CHRONOLOGY ×1, PAIRS ×1); 7 questions per section across all 6 sections.
- **Sections (6):** legal_framework, hazards, earthing, protective_devices, people_inspection, factory_special.

## PYQ candidates

- **Bank (`db/gk/industrial_safety.jsonl`, subtopic = electrical_safety):** exactly **1** candidate found — **GK-SAF-007** (Earthing and the RCCB). Mapped to section `protective_devices`, **taught: true** — its three bank questions (RCCB live/neutral imbalance, 30 mA domestic limit under Regulation 44, earthing assertion-reason) are all covered by the chapter's earthing and protective_devices sections from primary sources.
- **Exam corpus (`db/pyq/*.json`):** grep for "electr" returned only unrelated items (electric bulb invention, electricity-bill arithmetic, electromagnetic waves, electrolytes, AC inventor) — **no genuine electrical-safety PYQ exists in the corpus**, so none was mapped or invented.
- **PYQ summary:** candidates 1, mapped 1, taught 1.

## Subtopic coverage

`electrical_safety` covered in full at the exam-knowledge level: legal framework (Electricity Act 2003 s.53, CEA Regulations 2023 replacing 2010), hazard definitions and shock effects, earthing (Reg. 43 — two distinct connections, annual test, 2-year records, three-pin sockets), protective devices (fuse/breaker per circuit Reg. 37(4), RCD/RCCB Reg. 44 and the 30 mA domestic limit, RCBO per IS 12640 Pt 2), people and inspection (designated persons, Electrical Safety Officer at >250 kW with degree+5 yr / diploma+10 yr, PPE list Reg. 21, danger notices Reg. 20, shock-resuscitation instructions Reg. 30, licensed contractors Reg. 31, periodic inspection ≤5 years Reg. 32, self-certification up to notified 11 kV), and factory-specific rules (Factories Act s.36A — 24 V portable-light limit in confined spaces, flame-proof lamps; switchboard 1 m clearance Reg. 39; sand fire buckets and first-aid boxes Reg. 29). No operational how-to for hazardous electrical work is taught — only what the Acts, regulations, standards, thresholds and authorities ARE.

## Gaps (disclosed, not filled)

1. **No NCERT/NIOS source used:** the validator profile for this book also allows NCERT and NIOS, but no fetched NCERT/NIOS page carried this chapter's regulatory content; the chapter rests entirely on the four GOVT sources above. NIOS vocational electrical lessons were searched but no fetchable official NIOS text on this topic was obtained, so nothing was cited from NIOS.
2. **IS 3043 (Code of Practice for Earthing)** is referenced inside GK-SAF-007's statement but was not itself fetched; the chapter therefore teaches earthing only as stated in CEA Regulation 43 and does not quote IS 3043 directly.
3. **Voltage-class names (LV/MV/HV bands)** are not defined as a named classification table in the fetched gazette text; the chapter teaches only the thresholds the fetched text actually states (50 V, 250 V, 650 V, 11 kV, 33 kV) and does not invent band names.
4. **Accident-reporting under Electricity Act s.161 / Form intimation timelines** were not in the fetched pages, so accident intimation is not taught beyond Regulation 36 leakage disconnection (48-hour notice) and Factories Act accident-notice existence is not asserted.
5. **Bengal connection** is limited to the genuinely applicable point: danger notices and shock-resuscitation instructions must be in the district's local language (Bengali in West Bengal) under Regulations 20 and 30. No Bengal-specific electrical body or statistic was fetched, so none is claimed.
6. The CEA gazette PDF was read via the CEA website viewer URL; page references in claims cite regulation numbers rather than PDF page numbers, as the viewer's pagination is the Gazette's printed pagination (pp. 100–118 for the regulations used).
