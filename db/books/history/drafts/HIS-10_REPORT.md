# HIS-10 — তুর্কি আক্রমণ ও দিল্লি সুলতানি (বাংলার সুলতানি সহ) — Draft Report

- **Chapter file:** `bookwork/his10/chapter.json` — status `DRAFT`, verification `UNVERIFIED` (blind check is a separate step; nothing self-verified)
- **PYQ map:** `bookwork/his10/pyq_map_HIS-10.json`
- **Repo validator:** `node scripts/validateBooks.js chapter.json` → **OK** (0 errors)
- **Part / subtopic / weight:** medieval · `['sultanate']` · ★ · Bengal link 🐅 · `related_facts: ['GK-HIS-007']` · `prerequisites: ['HIS-09']`

## Sources actually fetched (NCERT only, via text fetch, 2026-11-19)

| id | Title | URL | Used for |
|----|-------|-----|----------|
| s1 | Our Pasts II, Class VII, Ch. 3 "Delhi: 12th to 15th Century" (printed pp. 30–38) | https://ncert.nic.in/textbook/pdf/gess103.pdf | Delhi's rise, ruler table, tawarikh, circle of justice, Raziyya, bandagan, iqta, Alauddin's revenue control, Mongols, control limits, Sayyid/Lodi |
| s2 | Our Pasts II, Class VII, Ch. 5 "Tribes, Nomads and Settled Communities" (pp. 49–60) | https://ncert.nic.in/textbook/pdf/gess105.pdf | Banjaras/tanda, Alauddin's grain transport, pastoralist exchange, social hierarchy |
| s3 | Themes in Indian History Part II, Class XII, Theme 5 "Through the Eyes of Travellers" (pp. 115–119 used) | https://ncert.nic.in/textbook/pdf/lehs201.pdf | Al-Biruni/Kitab-ul-Hind, Ibn Battuta/Rihla, Hindu–Hindustan–Hindavi |
| s4 | Our Pasts II, Class VII, Ch. 7 "The Making of Regional Cultures" (pp. 86–87 used) | https://ncert.nic.in/textbook/pdf/gess107.pdf | Bengal's independent sultans, Persian administration, Bengali language/literature, Palas |
| s5 | Our Pasts II, Class VII, Ch. 6 "Devotional Paths to the Divine" (pp. 67–70 used) | https://ncert.nic.in/textbook/pdf/gess106.pdf | Sufism, Chishti teachers, khanqah life, bhakti wave |

**Failed fetch (not retried, per instruction):** `gess102.pdf` (Class VII Ch. 2 "New Kings and Kingdoms") failed upstream on 2026-11-19 — so no NCERT support was obtained for Ghaznavi's raids/Somnath, Ghori/Tarain, or Pala-era detail beyond s4's single line.

## Extension attempt — 2026-11-19 (two further authoritative routes; both failed, no content added)

The draft above was re-opened to try to close the 28 untaught PYQs. Two routes were attempted exactly as specified; neither produced a fetchable authorised source, so **no claims, sections or questions were added** and the totals below are unchanged (63 claims / 42 questions; 4 of 32 PYQs taught).

### Route 1 — WBBSE Class VII *অতীত ও ঐতিহ্য* via Banglar Shiksha: FAILED at fetch
- Published chapters HIS-21 and HIS-23 cite the Class VIII book at `https://banglarshiksha.wb.gov.in/readwrite/etextbook/Atit%20o%20Aityaja%20Class%20VIII.pdf`. Following that exact pattern, the Class VII URL attempted was `https://banglarshiksha.wb.gov.in/readwrite/etextbook/Atit%20o%20Aityaja%20Class%20VII.pdf`.
- Exact fetch result (browser text-fetch, 2026-11-19): `Page not found for 'https://banglarshiksha.wb.gov.in/readwrite/etextbook/Atit%20o%20Aityaja%20Class%20VII.pdf' (network error (DNS, timeout, or connection refused))`, failure stage `source_fetch`, kind `upstream_fetch_failed`; no source HTTP status was returned. The route was stopped there — no alternate host, mirror or memory was substituted.

### Route 2 — Old NCERT Class XI *Medieval India* (Satish Chandra) on ncert.nic.in: FAILED — book not found on the official site
- Searches run (2026-11-19): `site:ncert.nic.in Medieval India Satish Chandra Class XI old textbook PDF Delhi Sultanate` → **No results found**; plus targeted variants (`"ncert.nic.in/textbook/pdf" "Medieval India"`, `"ncert.nic.in" "Satish Chandra" "Medieval India" filetype:pdf`, old-textbook-code queries, `site:ncert.nic.in/ncerts/l ...`).
- The book itself clearly exists (first edition June 1978, NCERT), but every copy surfaced was on a third-party host — archive.org full-text, `iasganga.com` PDF, `upsconline.com` PDF and coaching/shop pages. **No genuine `ncert.nic.in` URL for this title appeared in any search result**, so under the NCERT/WBBSE-only rule nothing was fetched from this route and the mirrors were not used as substitutes.

### Consequence
- New sources fetched: **none**. New claims: **0**. New questions: **0**. PYQs taught: still **4 of 32**.
- All gaps listed below therefore stand unchanged: Alauddin's market control / Malik Kafur / Deccan, Balban / Chahalgani / NW frontier, Tughluq token currency & Daulatabad shift, Firoz Shah's cities, Timur, Qutb Minar / Alai Darwaza architecture, Ghaznavi–Ghori / Tarain, Amir Khusrau, and the Bengal Sultanate detail (Bakhtiyar Khalji, Ilyas Shahi, Adina Mosque / Pandua, Hussain Shahi) remain untaught for lack of a fetchable NCERT/WBBSE source — not for lack of trying.

## Counts

- **Claims:** 63 (c01–c63), every one with a verbatim quote from a fetched source above; every claim is referenced by at least one section or question.
- **Questions:** 42 — basic 10, moderate 15, difficult 10, exam 7 (mirrors ch13). Formats: DIRECT 35, STATEMENT 3, MATCH 2, CHRONOLOGY-style sequence inside q32 (DIRECT), ASSERTION_REASON 1, PAIRS 1. Every question carries supporting claim ids; every section s1–s7 has questions (s1: 9, s2: 7, s3: 6, s4: 5, s5: 7, s6: 4, s7: 4).
- **Structure:** 7 sections, 8 events, 8 people, 10 timeline entries, 8 terms, 2 cause–effect chains, 7 exam-focus points, 12 quick-revision lines.

## PYQ coverage (the honest headline)

- Candidates mapped to HIS-10 in `pyq_chapters.json`: **32** (30 primary + 2 alt-only; matches HISTORY_AUDIT's "30 bank PYQs" + 2).
- **Taught by this chapter: 4 of 32** — WBCS 2015 Q196 (Raziyya not a slave → s2), WBCS 2018 Q143 (Kitab-ul-Hind → s5), WBCS 2021 Q100 (Ibn Battuta → s5), WBCS 2022 Q82 (dynasty chronology → s1).
- **Unmapped: 28**, each listed in `pyq_map_HIS-10.json` with the specific reason. This thin ratio is the direct consequence of the NCERT-only rule plus the rationalised Class VII chapter (see gaps). It is stated plainly here rather than padded.

### PYQ pattern clusters vs. coverage
- **Alauddin Khalji cluster (5 PYQs):** market control ×2, Malik Kafur, Deccan expeditions, cash salary — **none taught**; the chapter teaches his *revenue* control instead, which no PYQ in the set directly asks.
- **Iltutmish cluster (3):** iqta attribution ×2, Qutb Minar — system taught, attribution/architecture not.
- **Balban cluster (3):** Tarikh-i-Firoz Shahi, Chahalgani, NW frontier — **none taught** (Balban is absent from the fetched text).
- **Bengal cluster (5):** Bakhtiyar Khalji, Adina Mosque ×2, Hussain Shah/Roop-Sanatan, Gunaraj Khan — **none taught** beyond "independent sultans, 14th–16th c."
- **Travellers cluster (3):** 2 of 3 taught (Kitab-ul-Hind, Ibn Battuta); Khajuraho pair belongs to HIS-09.
- **Culture cluster (2):** Amir Khusrau ×2 — not taught.
- **Tughluq cluster (2):** capital shift, Firoz's cities — not taught.
- **3 candidates carry `doubtful_key` in the bank** (2016 Q166, 2022 Q31, Clerkship 2004 Q65); 2004 Q65's key ("Alauddin abolished iqta") actually sits against the fetched NCERT text, which says iqta conditions were rigorously imposed under Alauddin — recorded in the map, not taught.

## ALL gaps

1. **WBBSE unreachable from this VM** — no WBBSE source could be fetched or cited; the chapter is NCERT-only by necessity, and Bengal Sultanate depth (the usual WBBSE strength) is the biggest casualty. The 2026-11-19 extension attempt tried the exact Class VII *অতীত ও ঐতিহ্য* URL patterned on the published Class VIII citations and failed at fetch (see "Extension attempt" above).
2. **gess102 fetch failed** — Ghaznavi's India raids/Somnath, Muhammad Ghori and the Tarain battles, and the Turkish-invasion narrative that opens this chapter's TOC title have **no fetched NCERT support** and are therefore not taught at all.
3. **The rationalised Class VII Ch. 3 is much thinner than the old "The Delhi Sultans" chapter.** Absent from it (and hence untaught): Alauddin's market/price control, Muhammad bin Tughlaq's token currency and Daulatabad capital shift, Timur's invasion, Firoz Shah Tughlaq and his cities, Balban's court/Chahalgani/frontier policy, Alauddin's southern campaigns and Malik Kafur, Sultanate architecture (Qutb Minar, Alai Darwaza, Tughlaqabad), Amir Khusrau, coinage (tanka/jital), Diwan-i-Arz, khutba, and the individual slave origins of Aybak/Balban.
4. **Bengal Sultanate detail is source-thin in NCERT:** the fetched texts support only "sultans independent of Delhi, 14th–16th centuries", Persian administration, and Bengali language/literature growth. Ilyas Shahi and Hussain Shahi dynasties, Sikandar Shah/Adina Mosque, Pandua, Eklakhi, Bakhtiyar Khalji and Gunaraj Khan/Maladhar Basu are **not taught**; the chapter's s7 carries a `bengal` box telling students exactly this instead of filling from memory.
5. **First Battle of Panipat 1526 / Ibrahim Lodi by name** — the intended bridge to HIS-13 — is not named in the fetched Ch. 3 text (the Lodi dynasty is taught only as the last in sequence), so the bridge is carried by the dynasty order, not by the battle.
6. Only **4/32 PYQ candidates** are taught (above). Closing the rest needs either working WBBSE access, an official ncert.nic.in copy of the old *Medieval India* (searched 2026-11-19; only third-party mirrors exist in results), or an owner decision to admit another authoritative source for this chapter.

## Notes for the blind check
- Two quotes are table fragments by necessity (c03 "Chauhans 1165 1192", c04, c37 — NCERT Table 1 rows); PDF text extraction of the chapter is partly garbled (multi-column), so only complete sentences/contiguous substrings were used as quotes.
- The chapter contains one `exam_note` box (s3) and one `bengal` box (s7) that disclose the NCERT coverage limits to students directly.
