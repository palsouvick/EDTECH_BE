# HIS-00 — Draft Report

Chapter: **HIS-00 — ইতিহাস কীভাবে পড়বে: উপাদান, সময়গণনা ও যুগবিভাগ** (part: intro)
Deliverables: `chapter.json` (DRAFT, UNVERIFIED), `pyq_map_HIS-00.json` — in `~/workspace/edtech/bookwork/his-00/`
Validator: `node scripts/validateBooks.js chapter.json` → **OK**

## Sources actually fetched (browser text-fetch, 2026-11-19)

| id | Source | URL |
|----|--------|-----|
| s1 | NCERT, Exploring Society: India and Beyond, Class VI, Ch. 4 "Timeline and Sources of History" | https://ncert.nic.in/textbook/pdf/fees104.pdf |
| s2 | NCERT, Our Pasts II, Class VII, Ch. 1 "Tracing Changes Through a Thousand Years" | https://ncert.nic.in/textbook/pdf/gess101.pdf |
| s3 | NCERT, Themes in Indian History Part I, Class XII, Theme 2 "Kings, Farmers and Towns" | https://ncert.nic.in/textbook/pdf/lehs102.pdf |
| s4 | NCERT, Our Pasts I, Class VI, Ch. 4 "What Books and Burials Tell Us" | https://ncert.nic.in/textbook/pdf/fess104.pdf |

Fetch attempts that failed (network error, not retried per tool guidance): `lehs101.pdf` (Themes I, Theme 1) and `fess101.pdf`. Their absence is covered by s3/s4, which carry the epigraphy, numismatics, archaeology and sources material.

## Counts

- Claims: **67** (c01–c67), every one with a verbatim quote from a fetched NCERT PDF; every claim is used at least once (validator-enforced).
- Practice questions: **42** — basic 10, moderate 15, difficult 10, exam 7 (STATEMENT ×3, MATCH, CHRONOLOGY, ASSERTION_REASON, PAIRS). All 6 sections tested.
- Sections: 6 — what_is_history, kinds_of_sources, archaeology, epigraphy_numismatics, time_reckoning, periodisation. Plus 5 events, 6 people, 11 timeline rows, 16 terms, 3 cause→effect chains, 6 exam-focus points, Bengal connection, 13 quick-revision points.

## PYQs (from `pyq_chapters.json`, chapter or alt = HIS-00)

- Candidates found: **10** (6 primary, 4 alt-mapped).
- Mapped: 10/10 in `pyq_map_HIS-00.json`. **Taught: 6. Untaught: 4.**
- Taught: Cunningham / father of Indian archaeology (WBCS 2016 Q110 — honorific flagged as exam wording, NCERT supports his 1877 Asokan-inscriptions publication), Prinsep decipherment (WBCS 2019 Q74), Saka era 78 CE (WBCS 2021 Q125 + Clerkship 2006 Q30, via NCERT's c. 78 CE Kanishka date + era definition, exam answer stated explicitly), Numismatics (WBCS 2024 Q147 + Clerkship 2023 Q54).
- Untaught (with specific reasons in the map): Jadunath Sarkar (WBCS 2017 Q80, alt), R. S. Sharma (WBCS 2018 Q160), Subaltern School / Ranajit Guha (WBCS 2021 Q99), Aligarh School (WBCS 2021 Q151). These are university-level historiography facts absent from school NCERT textbooks.

## Subtopic coverage

TOC registers **no subtopics** for HIS-00, but the validator requires ≥1 slug from the GK taxonomy and no historiography/method slug exists. The chapter's worked examples are overwhelmingly Mauryan and post-Mauryan (Ashoka's inscriptions, Prinsep, punch-marked and Indo-Greek coins, Kanishka/Saka era), so `subtopics` is set to `["maurya_gupta", "post_maurya_sangam"]` as the nearest honest fit. All registered chapter content (sources, time-reckoning, periodisation) is fully covered by the 6 sections.

## Gaps (disclosed, never filled from memory)

1. **Historiography schools & modern historians** (Subaltern, Aligarh/Cambridge schools, Jadunath Sarkar, R. S. Sharma): not in school NCERT. The owner authorised IGNOU eGyanKosh / NIOS / e-PG Pathshala on 2026-11-19, but those hosts (`*.ac.in`) fail the History profile of `books.validate.js`, which accepts only NCERT and WBBSE source URLs — so they could not be cited without breaking validation. 4 PYQs left untaught for this reason. Fix path: extend the History validator profile to accept the authorised government-education hosts, or cover these in a later chapter sourced accordingly.
2. **WBBSE e-textbooks unreachable** from this machine (per brief) — no WBBSE source used; noted as a standing gap.
3. **Prinsep year discrepancy**: WBCS 2019's own explanation says 1837; NCERT (s3, p. 46 and timeline p. 51) says 1838. The chapter teaches NCERT's 1838 and carries an `exam_note` box explaining both.
4. **Saka era**: NCERT does not name the Saka era in the fetched chapters; it dates Kanishka's accession to c. 78 CE with an explicit uncertainty mark. The chapter teaches the exam answer (78 CE) on that basis and discloses the uncertainty in an `exam_note`.
5. **"Father of Indian archaeology"**: the title itself is not NCERT wording; the chapter's people entry says so plainly while teaching Cunningham's NCERT-documented work.
