# HIS-16 — ব্রিটিশ বিজয়: পলাশি থেকে ডালহৌসি — Draft Report

Chapter: HIS-16, part `modern_company`, subtopics `company_rule` (title/part/subtopics verbatim from `BE/db/books/history/toc.js`). Status DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Sources actually fetched (browser text-fetch, 2026-11-19)

1. **NCERT, Our Pasts III (Class VIII), Ch. 2 "From Trade to Territory"** — https://ncert.nic.in/textbook/pdf/hess202.pdf — the chapter's spine: charter 1600, Bengal trade, Plassey, Buxar, Diwani, Residents, subsidiary alliance, Mysore, Marathas, paramountcy, Punjab, Doctrine of Lapse, administration.
2. **IGNOU BHIC-110, History of India from 1757–1857** (full course PDF, Units 1, 3, 4, 5 used) — https://egyankosh.ac.in/bitstream/123456789/76474/1/BHIC-110%28English%29.pdf — Carnatic Wars detail (Wandiwash 1760), 12 Sikh misls, Punjab conquest (Lahore treaty 1846, annexation 1849), Dalhousie's Post & Telegraph departments.
3. **IGNOU BHIC-134, History of India 1707–1950, Unit 3 "Establishment of Colonial Power"** — https://egyankosh.ac.in/bitstream/123456789/73854/1/Unit-3.pdf — Farrukhsiyar's 1717 firman (p. 42), Plassey conspiracy analysis, Mir Kasim's reforms, Buxar confederacy, Diwani firman of Aug 1765, Jagat Seths.

Polity check: `BE/db/books/polity/pyq_map.json` contains no entries under HIS-16 (checked); history candidates came from `BE/db/books/history/drafts/pyq_candidates_HIS-16.json` (= the HIS-16-mapped entries of `pyq_chapters.json`).

## Counts

- Claims: **54** (c01–c54), every one with a verbatim quote from a fetched source above; every claim is used at least once (validator-enforced).
- Practice questions: **42** — basic 10, moderate 15, difficult 10, exam 7 (STATEMENT ×2, MATCH, CHRONOLOGY, ASSERTION_REASON, PAIRS, DIRECT); all 7 sections tested.
- Sections: 7 (trade_to_conflict, carnatic_wars, plassey_buxar, subsidiary_alliance, mysore_maratha, paramountcy_punjab, dalhousie_lapse), each with quick/standard; deep on 4.
- Timeline 19 entries, events 11, people 12, terms 10, cause_effect 4, quick_revision 13.

## PYQs

- Candidates found: **19** (17 primary HIS-16 + 2 primary HIS-17).
- Mapped: 19/19 in `pyq_map_HIS-16.json`. **Taught: 11. Untaught: 8**, each untaught with a specific reason:
  - Treaty of Bassein 1802 (WBCS 2015 Q34) — named in no fetched source.
  - Railways under Dalhousie (WBCS 2015 Q58 — telegraph half supported by c45 only; WBCS 2018 Q156) and first railway 1853 (WBCS 2017 Q182, primary HIS-17), first cotton mill 1818 (WBCS 2023 Q37, primary HIS-17) — railway/industry facts belong to HIS-17 sources.
  - Ranjit Singh's Sukerchakia misl (WBCS 2016 Q40) — sources teach the 12 misls, not which one he led.
  - Velu Thampi / Travancore (WBCS 2017 Q89) — absent from all fetched sources.
  - First subsidiary-alliance ruler = Nizam (WBCS 2024 Q103) — sources teach the system and Hyderabad's cession but never state Hyderabad was first.

## Subtopic coverage

Single registered subtopic `company_rule` covered end-to-end: Company–nawab conflict and the 1717 firman, Carnatic Wars, Plassey→Buxar→Diwani, Residents and subsidiary alliance, Anglo-Mysore and Anglo-Maratha wars, paramountcy, Sind and Punjab, Doctrine of Lapse and Awadh 1856, closing position in 1857 (63% territory / 78% population).

## Gaps

- **WBBSE e-textbooks unreachable from this machine** (per brief; not retried) — chapter is NCERT + IGNOU only; Bengali school-textbook cross-check outstanding.
- Railways/telegraph as a pair: only the telegraph-department fact is sourced (IGNOU); Dalhousie's railway role is deliberately not asserted — flagged in the dalhousie_lapse section text and in the PYQ map.
- Treaty of Bassein, Velu Thampi, Sukerchakia misl, "Nizam first in subsidiary alliance": no authorised source fetched supports these; left untaught rather than written from memory.
- IGNOU BHIC-110 claim pages are cited by unit/section (the combined course PDF's printed pagination was not reliably extractable); BHIC-134 pages are printed book pages.
