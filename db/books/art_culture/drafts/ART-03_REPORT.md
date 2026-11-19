# ART-03 — চিত্রকলা ও হস্তশিল্প (Painting & Handicrafts): Draft Report

- Book: art_culture · Code: ART-03 · Number: 3 · Part: `visual_heritage` (per toc.js + validator profile) · Subtopics: `painting` (verbatim from toc.js)
- Status: DRAFT · Verification: UNVERIFIED
- Validator: `node scripts/validateBooks.js ~/workspace/edtech/bookwork/art-03/chapter.json` → **OK** (0 errors)
- Structure: 11-part exemplar structure — overview, 6 sections (quick/standard/deep), 6 events, 11 people, 9-entry timeline, 14 terms, 2 cause_effect, 8 exam_focus, bengal_connection, 14 quick_revision points, sources, claims, questions.

## Counts
- Claims: **77** (c01–c77), every claim carries a verbatim quote from a fetched source; every claim is used at least once (machine-checked).
- Practice questions: **42** — basic 12, moderate 12, difficult 12, exam 6 (STATEMENT ×2, MATCH ×2, ASSERTION_REASON ×1, CHRONOLOGY ×1); 7 questions per section across all 6 sections; every question references its supporting claim ids.

## Sources actually fetched (browser.open, 2026-11-19)
NCERT (publisher NCERT):
1. An Introduction to Indian Art Part I, Ch. 1: Prehistoric Rock Paintings — https://ncert.nic.in/textbook/pdf/kefa101.pdf
2. An Introduction to Indian Art Part I, Ch. 4: Post-Mauryan Trends — https://ncert.nic.in/textbook/pdf/kefa104.pdf
3. An Introduction to Indian Art Part I, Ch. 5: Later Mural Traditions — https://ncert.nic.in/textbook/pdf/kefa105.pdf
4. An Introduction to Indian Art Part II, Ch. 1: The Manuscript Painting Tradition — https://ncert.nic.in/textbook/pdf/lefa101.pdf
5. An Introduction to Indian Art Part II, Ch. 2: The Rajasthani Schools of Painting — https://ncert.nic.in/textbook/pdf/lefa102.pdf
6. An Introduction to Indian Art Part II, Ch. 5: The Pahari Schools of Painting — https://ncert.nic.in/textbook/pdf/lefa105.pdf
7. An Introduction to Indian Art Part II, Ch. 6: The Bengal School and Cultural Nationalism — https://ncert.nic.in/textbook/pdf/lefa106.pdf
8. An Introduction to Indian Art Part II, Ch. 8: The Living Art Traditions of India — https://ncert.nic.in/textbook/pdf/lefa108.pdf
9. Themes in Indian History Part II, Theme 9: Kings and Chronicles — https://ncert.nic.in/textbook/pdf/lehs205.pdf
10. Living Craft Traditions of India, Ch. 1: Learning about Crafts — https://ncert.nic.in/textbook/pdf/kehc101.pdf

Government of India (publisher GOVT, PIB — Ministry of Culture):
11. e-Auction 2025 (Madhubani/Sikki of Bihar) — https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2170047&reg=3&lang=2
12. Kala Kumbh Annexure II (Kalamkari, Pichwai, Phad, Warli, miniatures) — https://static.pib.gov.in/WriteReadData/specificdocs/documents/2022/jan/doc20221144701.pdf
13. Project PARI, 8 Jul 2024 (form–state mapping incl. Tanjore–Tamil Nadu, Alpona–West Bengal) — https://pib.gov.in/PressReleasePage.aspx?PRID=2031567&ui=2&tf=1&pli=1

## PYQ candidates
- Found: **17** (7 from the GK bank `db/gk/art_culture.jsonl` with subtopic `painting`: GK-ART-005, 107, 108, 109, 110, 111, 118; 10 from the exam corpus `db/pyq/*.json` genuinely on painting).
- Mapped in `pyq_map_ART-03.json`: all 17. **Taught: 11 · Untaught: 6**, each untaught item with a specific reason:
  - GK-ART-111 (Chola bronzes/Nataraja) — sculpture, not painting; chapter teaches Chola painting only.
  - GK-ART-118 (Patola/Hingan/Thatheras/Kolam) — none of these crafts in the fetched sources.
  - WBCS 2015 Q26 (Mansur / Ain-i-Akbari painter list) — names not in any fetched source (see gaps).
  - WBCS 2022 Q37 (Bharat Mata) — the specific painting is not mentioned in the fetched NCERT text.
  - Clerkship 2023 S3 Q65/Q66 (Mona Lisa, Starry Night) — Western art, out of scope.

## Subtopic coverage
Single registered subtopic `painting` covered across all 6 sections: prehistoric rock painting & murals (rock_mural), manuscript & miniature painting (manuscript_miniature), Mughal court painting (mughal_court), Rajasthani & Pahari schools (rajasthani_pahari), folk/living painting + the chapter title's handicraft half — Dhokra lost-wax casting and terracotta (folk_living), Company painting → Bengal School & modern Indian painting (modern_bengal).

## Gaps (disclosed, never filled from memory)
1. **NCERT lefa103 (Mughal Schools of Painting) and lefa104 (Deccan Schools) could not be fetched** — browser.open returned a network error for both URLs (and a retry was not attempted per fetch-failure policy). Consequences: Mughal painting is taught from Themes II (lehs205) instead — kitabkhana, Abu'l Fazl, illustrated chronicles, portraiture, halo — but named Akbar-era painters beyond Mir Sayyid Ali/Abdus Samad (e.g. the Ain-i-Akbari list, Mansur, Daswant, Basawan) and the Deccani schools (Ahmednagar/Bijapur/Golconda painting) are **not taught**. WBCS-2015-Q26 is therefore mapped untaught.
2. **Tanjore painting** is covered only as a form–state pair from the PIB Project PARI list (claim c77); no fetched source describes its technique/materials, so no technique is asserted.
3. **Bharat Mata (Abanindranath)** — not in the fetched lefa106 text; mapped untaught rather than asserted.
4. Handicraft coverage beyond painting is limited to what the allowed sources carry: craft-in-community principles (kehc101), Dhokra and terracotta (lefa108). Other GI crafts (e.g. Patola, Kolam) are not taught — see GK-ART-118.
5. Claim page numbers for NCERT PDFs are the printed book pages as extracted; lehs205 pages are given as theme/section references because the extraction carries no stable printed pagination.
