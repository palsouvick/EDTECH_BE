# STG-01 — বই ও লেখক (Books & Authors) — Draft Report

- **Book / chapter:** static_gk, STG-01, part `knowledge`, subtopics `books_authors` (title/part/subtopics verbatim from `db/books/static_gk/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Deliverables:** `chapter.json`, `pyq_map_STG-01.json`, this report — in `~/workspace/edtech/bookwork/stg-01/`
- **Validator:** `node scripts/validateBooks.js chapter.json` → **OK** (after one fix: duplicate question stem on q42 reworded)

## Counts

- **Claims:** 26 (c01–c26; numbering follows fetch order, c26 sits with the gess104 group)
- **Practice questions:** 42 — basic 10, moderate 15, difficult 10, exam 7; formats DIRECT, STATEMENT ×2, MATCH, CHRONOLOGY, PAIRS ×2, ASSERTION_REASON; all 6 sections tested
- **Sections:** 6 — prachin_grantha, natok_itihas, bhraman_britanta, mughal_darbar, bangla_samaj, puraskar
- **PYQ candidates mapped:** 76 — taught 18, untaught 58 (each untaught entry carries its specific reason in the map)

## Sources actually fetched (browser.open, 2026-11-19)

All URLs belong to the static_gk profile's allowed publishers (NCERT, GOVT):

1. NCERT Class XII, Themes in Indian History Part I, Theme 3 (Kinship, Caste and Class) — https://ncert.nic.in/textbook/pdf/lehs103.pdf — Timeline 1 textual traditions; Mrichchhakatika passage (pp. 64, 79)
2. NCERT Class XII, Themes Part I, Theme 2 (Kings, Farmers and Towns) — https://ncert.nic.in/textbook/pdf/lehs102.pdf — Arthashastra & Megasthenes (p. 32), Harshacharita (p. 40)
3. NCERT Class XII, Themes Part II, Theme 5 (Through the Eyes of Travellers) — https://ncert.nic.in/textbook/pdf/lehs201.pdf — travellers' origins (p. 115), Kitab-ul-Hind (p. 117), Rihla (p. 118)
4. NCERT Class VII, Our Pasts II, Ch. 4 (The Mughals) — https://ncert.nic.in/textbook/pdf/gess104.pdf — Akbar Nama / Ain-i Akbari (p. 43)
5. NCERT Class X, India and the Contemporary World II, Ch. 5 (Print Culture) — https://ncert.nic.in/textbook/pdf/jess305.pdf — Ramcharitmanas (p. 121), Amar Jiban & Rashsundari Debi (p. 123), Gulamgiri (p. 126)
6. NCERT Class VIII, Our Pasts III, Ch. 8 (National Movement) — https://ncert.nic.in/textbook/pdf/hess208.pdf — Naoroji's book (p. 95)
7. Sahitya Akademi — Akademi Awards (official) — https://sahitya-akademi.gov.in/awards/akademi_awards.jsp — award inception 1954, first awards 1955, amount history to ₹1,00,000 (2009)
8. PIB Press Release, President's Secretariat, 16 May 2025 (Release ID 2129148) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2129148&reg=3&lang=2 — 58th Jnanpith Award conferred on Jagadguru Rambhadracharya; Gulzar co-recipient absent; Bharatiya Jnanpith Trust awarding since 1965; Vande Mataram composed by Bankim Chandra Chattopadhyay; women Jnanpith awardees incl. Ashapurna Devi

## PYQ candidates

- **GK bank (`db/gk/static_gk.jsonl`, subtopic `books_authors`):** 22 items (GK-SGK-001, GK-SGK-002, GK-SGK-201…220). **Taught: 13** (201–208, 210, 212, 214, 215, 219). **Untaught: 9** — 001/002 (Jnanpith winner lists; bank source jnanpith.net is not an allowed publisher for this book), 209 (Babur Nama; lehs204 unfetchable), 211 (Hind Swaraj; jess302 unfetchable), 213 (Anandamath part only; composer alone taught), 216/217 (Tagore works; Nobel Foundation not an allowed publisher), 218/220 (Sahitya Akademi about-page facts; page unfetchable).
- **Exam corpus (`db/pyq/*.json`):** 54 genuinely book/author items across WBCS Prelims 2015–2024, Clerkship 2004–2023, WBP/KP Constable, IDO 2019, WBPSC Miscellaneous 2023. **Taught: 5** — WBCS 2018 Q50 (Ghulamgiri), WBCS 2018 Q143 (Kitab-ul-Hind), WBCS 2019 Q72 (Mrichhakatikam), WBCS 2021 Q87 (Ramcharitmanas), WBCS 2021 Q154 (Poverty and Un-British Rule in India). The remaining 49 are contemporary/current-affairs books, modern Bengali literature, or classics whose attribution is not present in any fetched allowed source; each is listed in the map with its reason. False-positive grep hits (reasoning "BOOKWARM" coding item, "authority"-word polity items, a reading-rate arithmetic item, a Venn-diagram item) were excluded as not book/author questions.

## Subtopic coverage

The single registered subtopic `books_authors` is covered across six angles: ancient classical texts with authors/dates/languages; plays and history-sources (Mrichchhakatika, Arthashastra, Megasthenes, Harshacharita); travellers' books (Kitab-ul-Hind, Rihla); Mughal court books (Akbar Nama, Ain-i Akbari); Bengali and social-reform books (Ramcharitmanas, Amar Jiban, Gulamgiri, Vande Mataram); nationalist writing and the two big literary awards (Naoroji; Sahitya Akademi Award; Jnanpith Award).

## Gaps (disclosed, never filled from memory)

1. **lehs204 fetch failed** (network error; not retried per fetch policy) — Babur Nama and the Ain-i Akbari completion year (1598) are not taught; Ain-i Akbari is covered from gess104 instead. Humayunnamah PYQ likewise untaught.
2. **jess302 fetch failed** (network error; not retried) — Hind Swaraj authorship and Vande Mataram's inclusion in Anandamath are not taught; the song's composer is taught from the PIB release instead. Anandamath-author and Hind Swaraj PYQs mapped untaught.
3. **Sahitya Akademi "about" page fetch failed** (not retried) — the Akademi's inauguration date (12 March 1954) and Rabindra Bhavan HQ facts (bank items GK-SGK-218, GK-SGK-220) are not taught; only the fetched awards-page facts are used.
4. **First Jnanpith winner (1965)** — the single most-asked fact in this subtopic — could not be verified from an allowed fetched source: the bank's source (jnanpith.net) is outside this book's publisher profile, and the fetched PIB release states only that the Trust has awarded litterateurs since 1965. The chapter says this openly in the puraskar deep note rather than asserting the name. A future pass with an allowed GOVT page carrying the winner list (e.g. a PIB backgrounder) would close this gap.
5. **Kadambari** (WBCS 2015 & 2017) — Banabhatta is taught for Harshacharita, but Kadambari is not named in the fetched NCERT pages; flagged in an exam_note box in the chapter and mapped untaught.
6. **Tagore's works** (bank GK-SGK-216/217 and the two-anthems PYQ) rest on nobelprize.org, not an allowed publisher for static_gk — not taught.
7. Specific named works of Kalidasa (Meghaduta, Kumarasambhavam) and Varahamihira (Brihatsamhita) are not named in the fetched timeline text, which mentions their works only in general — the related PYQs are mapped untaught with that reason.
