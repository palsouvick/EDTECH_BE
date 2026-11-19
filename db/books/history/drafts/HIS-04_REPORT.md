# HIS-04 — মহাজনপদ ও মগধের উত্থান — Draft Report

- **Chapter**: HIS-04, part `ancient`, subtopics `["mahajanapadas"]` (verbatim from `db/books/history/toc.js`), status DRAFT, verification UNVERIFIED.
- **Deliverables**: `chapter.json`, `pyq_map_HIS-04.json`, this report — in `~/workspace/edtech/bookwork/his-04/`.
- **Validator**: `node scripts/validateBooks.js ~/workspace/edtech/bookwork/his-04/chapter.json` → **OK** (no errors).

## Sources actually fetched (browser text-fetch, 2026-11-19)

| id | Title | URL |
|---|---|---|
| s1 | NCERT, Our Pasts I, Class VI, Ch. 5: Kingdoms, Kings and an Early Republic | https://ncert.nic.in/textbook/pdf/fess105.pdf |
| s2 | NCERT, Themes in Indian History Part I, Theme 2: Kings, Farmers and Towns | https://ncert.nic.in/textbook/pdf/lehs102.pdf |
| s3 | NCERT, Our Pasts I, Class VI, Ch. 6: New Questions and Ideas (only for the Buddha–Sakya gana and Mahavira–Lichchhavi claims, which belong to this chapter's gana-sangha story) | https://ncert.nic.in/textbook/pdf/fess106.pdf |

Note on source policy: the history validator (`src/services/books.validate.js`, profile `history`) accepts only NCERT (`ncert.nic.in/textbook/pdf/…`) and WBBSE source URLs, so all 41 claims cite the three NCERT PDFs above. IGNOU eGyanKosh / NIOS / e-PG Pathshala material (authorised 2026-11-19) could not be cited without failing validation, so no claim rests on it; facts those platforms would have covered are listed as gaps below instead of being filled from memory.

## Counts

- **Claims**: 41 (c01–c41), every one with a verbatim quote from a fetched NCERT PDF; every claim is used by at least one section/event/person/timeline/question (validator-enforced).
- **Questions**: 42 — basic 10, moderate 15, difficult 10, exam 7 (STATEMENT ×2, MATCH ×2, CHRONOLOGY ×1, ASSERTION_REASON ×1, PAIRS ×1); all 6 sections tested.
- **Sections**: 6 (rulers_and_janapadas, sixteen_mahajanapadas, forts_taxes_agriculture, magadha_rise, vajji_gana_sangha, towards_empire); plus 6 events, 6 people, 6 timeline rows, 9 terms, 2 cause_effect chains, 7 exam_focus points, 14 quick_revision points.

## PYQs (from `db/books/history/pyq_chapters.json`; polity `pyq_map.json` has no HIS-04 entries)

- **Candidates found**: 7 (4 primary HIS-04 + 3 where HIS-04 is the alternate chapter). All 7 mapped in `pyq_map_HIS-04.json`.
- **Taught**: 2 — WBCS 2018 Q93 (Magadha = Patna/Gaya region; Patna anchor taught, Gaya detail noted as partial), WBCS 2023 Q40 (Magadha founded the empire).
- **Not taught (5), each with the specific reason in the map**: 'Seniya' epithet for Bimbisara (WBCS 2017 Q85), Jivaka (WBCS 2017 Q87, primary HIS-05), clan–capital pairs Videha–Mithila / Moriya–Pippalivana (WBCS 2022 Q175), Anguttara Nikaya as the source text (WBCS 2024 Q162), Alexander's exact year 326 BCE (Clerkship 2019 Q17). For the three exam-answer facts (Seniya, Anguttara Nikaya, 326 BCE) the chapter carries an `exam_note` stating the official exam answer openly while flagging that the NCERT books used do not carry it — the HIS-21 precedent.

## Subtopic coverage (`mahajanapadas`)

Covered in full from NCERT: janapada→mahajanapada transition, ashvamedha and varna background, the sixteen (textual source, varying lists, most frequent names, NCERT Map 1 capitals), fortified capitals, regular taxation and its causes, standing armies vs militia, iron ploughshares and paddy transplantation, punch-marked coins and their issuers, Magadha's rise (both historians' and Buddhist/Jaina writers' explanations), Rajagriha→Pataliputra, the gana/sangha system (Vajji, assemblies, exclusions, collective resource control, longevity), Ajatasattu–Vassakara–Buddha episode from the Digha Nikaya, Alexander at the Beas, and the culmination in the Mauryan Empire (c. 321 BCE).

## Gaps (disclosed, never filled from memory)

1. **WBBSE unreachable** from this machine (per task instruction, not retried) — the chapter is NCERT-only; Bengali school-textbook names/emphases could not be cross-checked.
2. **'Seniya'** (Bimbisara's epithet, WBCS 2017 Q85) — in no fetched NCERT source.
3. **Jivaka**, Bimbisara's/Buddha's physician (WBCS 2017 Q87) — absent from all three NCERT PDFs.
4. **Anguttara Nikaya** named as the text listing the sixteen (WBCS 2024 Q162) — NCERT says only "early Buddhist and Jaina texts"; the text NCERT names is the Digha Nikaya (for the Vajjis).
5. **Alexander's invasion year (326 BCE**, Clerkship 2019 Q17) — NCERT gives only "more than 2300 years ago".
6. **Clan–capital pairs** Videha–Mithila and Moriya–Pippalivana (WBCS 2022 Q175) — not in the NCERT sources; Licchavi–Vaishali and Malla–Kusinagara are supported, Kapilavastu is not named for the Sakyas (only the Sakya gana itself).
7. **Magadha = Patna *and Gaya* districts** (WBCS 2018 Q93) — Patna/Rajgir in Bihar are explicit in NCERT; the Gaya-district wording is not.
8. **Dynasty names and regnal dates** (Haryanka, Shishunaga, Nanda dynasties; dates for Bimbisara/Ajatasattu) — NCERT's chapters used name the rulers but give no dynasty labels or regnal years, so the chapter deliberately teaches neither.
9. **Bhaga (⅙ share)** — the rationalised Our Pasts I chapter lists crop taxes without the one-sixth figure, so it is not taught.
10. Validator constraint (see Sources note): IGNOU/NIOS/e-PG Pathshala URLs are not accepted for the history profile, so gaps 2–6 could not be closed from those platforms in this draft even though the owner authorised them on 2026-11-19.
