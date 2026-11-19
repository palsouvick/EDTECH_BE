# HIS-14 Draft Report — মারাঠা শক্তি ও অষ্টাদশ শতকের আঞ্চলিক শক্তি (বাংলার নবাব সহ)

- Chapter: HIS-14, part `medieval`, subtopics `marathas`, `regional_18c` (title/part/subtopics verbatim from `history/toc.js`)
- Status: DRAFT, verification UNVERIFIED
- Deliverables: `chapter.json`, `pyq_map_HIS-14.json`, this report
- Validator: `node scripts/validateBooks.js chapter.json` → **OK**

## Sources actually fetched (browser text-fetch, 2026-11-19)

1. **NCERT, Our Pasts II, Class VII, Ch. 10 "Eighteenth-Century Political Formations"** — https://ncert.nic.in/textbook/pdf/gess110.pdf — fetched in full (book pp. 138–154). Backbone for Mughal decline, successor states, Bengal/Awadh/Hyderabad, Rajputs, Sikhs, Jats, Marathas, chauth/sardeshmukhi.
2. **NCERT, Exploring Society: India and Beyond, Grade 8 Part 1, Ch. 3 "The Rise of the Marathas"** — https://ncert.nic.in/textbook/pdf/hees103.pdf — the direct ncert.nic.in fetch failed once with a network error and was not retried; the chapter text (book pp. 61–65 and the pp. 62–63 timeline) was read via the EduRev mirror of the same NCERT PDF (https://edurev.in/p/424071/NCERT-Textbook-The-Rise-of-the-Marathas). All quotes are from that NCERT chapter; the canonical NCERT URL is recorded in `sources[]`. Only pp. 61–65 of the mirror were legible, so claims from this source are limited to those pages (Shivaji's birth, campaigns, navy, guerrilla warfare/Afzal Khan, saints, timelines).
3. **IGNOU BHIC-110, History of India from 1757–1857, Unit 1** — https://egyankosh.ac.in/bitstream/123456789/76474/1/BHIC-110%28English%29.pdf — successor states, Bengal Nawab sequence, Peshwa system, Panipat detail, Sikhs/Jats/Mysore, Plassey–Buxar.
4. **IGNOU BHIC-134, History of India: 1707–1950, Unit 2 "Emergence of Independent States"** — https://egyankosh.ac.in/bitstream/123456789/73867/1/BHIC-134(English).pdf — Hyderabad (Asaf Jah 1713/1724), Mysore (Haidar/Tipu), Sikh misls and Ranjit Singh.

## Counts

- Claims: **66** (c01–c67 as numbered in the file; every claim has a verbatim quote from a fetched source and is used at least once — enforced by the validator)
- Practice questions: **42** — basic 10, moderate 15, difficult 10, exam 7 (STATEMENT ×2, MATCH, CHRONOLOGY ×2, ASSERTION_REASON, PAIRS); every section has questions; every question cites its supporting claims
- Sections: 7 (mughal_decline, successor_states, bengal_nawabs, shivaji, peshwa_expansion, panipat_aftermath, other_powers); events 12, people 12, timeline 20 entries, terms 15, cause_effect 3

## PYQs

- Candidates (from `drafts/pyq_candidates_HIS-14.json`, the HIS-14 extract of `pyq_chapters.json`): **9**
- Mapped in `pyq_map_HIS-14.json`: 9 (all)
- Taught: **4** — Ranjit Singh/Sukerchakia (WBCS 2016), Khalsa founder (WBCS 2018, primary HIS-12 but taught here), Third Panipat year (Clerkship 2006), first independent Nawab of Bengal (Clerkship 2009)
- Not taught: **5**, each with a specific reason in the map —
  - Treaty of Bassein 1802 and First Maratha War/Hastings (both primary HIS-16; the war's dates/result are taught, Hastings' tenure is not in any fetched source)
  - Council of Barabhais / Nana Phadnavis (WBCS 2016) — **no fetched authorised source mentions Nana Phadnavis or the Barabhai council**
  - Shivaji's title 'Haindava-Dharmoddharak' (WBCS 2018) — coronation taught, the title itself is in no fetched source
  - Farrukh Siyar's 1717 farman (WBCS 2023, primary HIS-16) — farman not in fetched sources
- Polity check: `db/books/polity/pyq_map.json` contains no HIS-14 entries. No PYQ was invented.

## Subtopic coverage

- **marathas**: Shivaji (birth, Swarajya, guerrilla warfare, Afzal Khan, navy 1657, Agra escape 1666, coronation 1674), Peshwa rise (Balaji Vishwanath, Baji Rao I, Balaji Baji Rao), chauth/sardeshmukhi, confederacy sardars, expansion 1720–1761, Panipat 1761 and aftermath, Madhav Rao's recovery, First Anglo-Maratha War, end in 1818.
- **regional_18c**: Mughal decline and later Mughals; three-fold classification of states; Hyderabad, Awadh and Bengal as successor states (founders, ijaradari, banker link); Bengal Nawabs in full sequence with the Maratha invasions and Orissa 1751; Sikhs (Khalsa, Banda Bahadur, misls, rakhi, Ranjit Singh); Jats (Churaman, Suraj Mal); Rajputs (Ajit Singh, Jai Singh/Jaipur); Mysore (Haidar Ali, Tipu).

## Gaps (disclosed, never filled from memory)

- **WBBSE e-textbooks unreachable** from this machine (per task brief) — no WBBSE source used; noted as a gap. Bengali names/terms follow standard WBPSC usage.
- **Nana Phadnavis / Barabhai council**: not covered by any fetched source → PYQ left untaught (see above).
- **Shivaji's administration (Ashtapradhan) and the title 'Haindava-Dharmoddharak'**: the NCERT Class VIII chapter pages on administration (pp. 71–73) could not be read (mirror truncated at p. 65; direct NCERT fetch failed) → the Ashtapradhan is deliberately NOT taught in this draft. A later pass with the full hees103 PDF should add it.
- **Bargi raids**: the repeated Maratha invasions of Bengal and the 1751 cession of Orissa are taught from IGNOU quotes, but the fetched sources do not use the word 'Bargi' or give the 1751 chauth settlement figure (₹12 lakh), so neither appears in the student text.
- **Maratha–Bengal treaty details, Siraj's reign in detail, Plassey/Buxar narrative**: only the outline is given here; the full story belongs to HIS-16.
- **Madhav Rao's death year**: IGNOU BHIC-110 prints "1722" (an evident typo for 1772) in the fetched text; the year is therefore not stated in the chapter.
- **NIOS / e-PG Pathshala**: searched; no directly fetchable unit on this chapter's topics was found in the time available, so no NIOS/EPG claims are used. NCERT + IGNOU coverage was sufficient for all taught facts.
