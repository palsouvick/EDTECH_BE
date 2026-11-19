# ORG-06 — মিশ্র অনুশীলনী — Draft Report

Chapter: ORG-06, book `organisations`, part `heads_mixed`, subtopic `mixed` (TOC title/part/subtopics used verbatim). Status DRAFT, verification UNVERIFIED.
Validator: `node scripts/validateBooks.js ~/workspace/edtech/bookwork/org-06/chapter.json` → **OK** (56 claims, 42 questions, 6 sections, all claims used, all sections tested).

This is the book's mixed-practice capstone: it re-tests ORG-01…ORG-05 material in mixed form (chronology, headquarters map, member counts, India's status, dated current heads, trap-spotting). Every fact is re-sourced here from allowed publishers fetched in this run — nothing is carried over on trust from the earlier chapters.

## Sources actually fetched (browser.open, 2026-11-19)

Allowed publishers for this book (validator profile `organisations`): NCERT, GOVT (*.gov.in / *.nic.in), IGNOU, EPG. All 14 sources used are from these publishers. un.org was NOT used (not an allowed publisher in this project).

1. NCERT, *Contemporary World Politics*, Ch. 4: International Organisations — https://ncert.nic.in/textbook/pdf/leps104.pdf
2. NCERT, *Contemporary World Politics*, Ch. 2: Contemporary Centres of Power — https://ncert.nic.in/textbook/pdf/leps102.pdf
3. IGNOU, Unit 12: Role of International Bodies – Governmental and Non-Governmental — https://egyankosh.ac.in/bitstream/123456789/63367/1/Unit-12.pdf
4. IGNOU, Unit 12: International Financial Institutions — https://egyankosh.ac.in/bitstream/123456789/122470/1/Unit-12.pdf
5. IGNOU, Unit 7: World Trade Organisation — https://egyankosh.ac.in/bitstream/123456789/122458/1/Unit-7.pdf
6. MEA, *India in BIMSTEC* — https://www.mea.gov.in/Portal/ForeignRelation/India_in_BIMSTEC.pdf
7. MEA, *India-SAARC brief* (June 2026) — https://www.mea.gov.in/Portal/ForeignRelation/India-SAARC-June-2026.pdf
8. MEA, *Brief on India-SCO Cooperation* — https://www.mea.gov.in/Portal/ForeignRelation/India-SCO_Cooperation.pdf
9. PIB, FM's bilateral meeting with Kristalina Georgieva, MD IMF (PRID 1817932) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1817932
10. PIB, 7th Annual Meeting of NDB Board of Governors, "About NDB" (PRID 1826746) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1826746
11. PIB, World Bank Group President Ajay Banga launches PPP e-Course (PRID 1989683) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1989683
12. Akashvani News (newsonair.gov.in), Piyush Goyal meets WTO DG Ngozi Okonjo-Iweala, 29 Mar 2026 — https://newsonair.gov.in/union-minister-piyush-goyal-meets-dg-of-world-trade-organisation/
13. ISRO, *About ISRO* — https://www.isro.gov.in/profile.html
14. MEA, *India and United Nations* — https://www.mea.gov.in/Portal/ForeignRelation/India_UN_2020.pdf

Every claim (c01–c56) carries a verbatim quote from one of these fetched pages/PDFs. Two IGNOU quotes (c24, c25) come from a facts table whose PDF text extraction is compressed; the quotes reproduce the extracted wording exactly.

## Counts

- Claims: **56** (all used; validator confirms none unused)
- Practice questions: **42** — basic 12, moderate 16, difficult 7, exam 7; exactly 7 per section across all 6 sections. Formats include DIRECT, STATEMENT ×3, MATCH ×2, CHRONOLOGY ×2, PAIRS ×2, ASSERTION_REASON ×2.
- Sections: 6 — chrono_chain, hq_map, india_status, groups_membership, heads_dated, traps_mixed.
- Current heads: every office-holder claim is sourced (NCERT/MEA/PIB/Akashvani) and the heads_dated exam_note states the list is as of **19 November 2026**, per the task rule.

## PYQ candidates

Found **17** real candidates: 1 GK-bank item with subtopic `mixed` in `db/gk/organisations.jsonl` (GK-ORG-016) and 16 genuine exam questions grepped from `db/pyq/*.json` (WBCS 2015 Q190, 2016 Q39, 2017 Q65, 2017 Q75, 2018 Q191, 2019 Q108, 2021 Q53, 2022 Q94, 2023 Q48, 2023 Q129, 2024 Q131, 2024 Q148; Clerkship 2019 Forenoon Q12, Q24; Clerkship 2023 Session II Q47, Session IV Q33). All 17 are mapped in `pyq_map_ORG-06.json`; **4 taught, 13 untaught**, each untaught item carrying its specific reason. False-positive grep hits (e.g. "Who…" questions matching WHO, Tea Board headquarters, ISRO-founder items belonging to other books) were excluded as not genuinely on this chapter's mixed organisations topic, except the Tea Board item which is an Indian-body headquarters question already covered by ORG-04's scope, not this mixed set.

Taught: WTO's earlier name GATT (WBCS 2022), BIMSTEC secretariat Dhaka (WBCS 2023), IMF MD Georgieva (Clerkship 2019), Myanmar not a SAARC member (Clerkship 2019).

## Subtopic coverage (mixed)

- Chronology chain 1865–2001 (ITU, UPU, ILO, Bretton Woods/World Bank, UN, GATT, IAEA/EEC, ISRO, SAARC, EU, WTO, BIMSTEC, SCO) ✔
- Headquarters map from fetched quotes: WTO Geneva, ADB Manila, NDB Shanghai, SAARC Kathmandu, BIMSTEC Dhaka, SCO Beijing (+RATS Tashkent), ISRO Bengaluru ✔
- Member counts: UN 193, IMF 190 (Feb 2024), WTO 166, ADB 69, ASEAN 10, SCO 10, SAARC 8, BIMSTEC 7, Security Council 5+10 ✔
- India: UN founding member (joined 30 Oct 1945), GATT 1947 talks, IMF vote 2.64%, UNSC seven terms (MEA 2020 brief), G-4, SCO full member 2017, NDB Governor ✔
- Current heads, dated 19 Nov 2026: Guterres, Georgieva, Banga, Okonjo-Iweala, Sarwar, Pandey, Yermekbaev ✔
- Traps: founded-vs-operational (NDB 2014/2015), signed-vs-founded (UN Charter Jun 1945 vs 24 Oct 1945), birthplace-vs-seat (SAARC, BIMSTEC, ADB), same-year swaps (ITU/UPU, IAEA/EEC 1957), charter-vs-first-meeting dates (ADB 1965/1966) ✔

## Gaps (disclosed, never filled from memory)

1. **UN headquarters city (New York) is NOT asserted in this chapter.** No allowed-publisher page fetched in this run (NCERT leps104, MEA India–UN brief, IGNOU) states the city. It is taught in ORG-01 from that chapter's own sources; re-quoting it here would have required an allowed source fetched in this run.
2. **NATO founding year (1949) and headquarters (Brussels) NOT taught.** NCERT leps102 says only that the US created a collective security structure under NATO. The Clerkship 2023 NATO-year PYQ is therefore mapped untaught, and the chapter's traps_mixed exam_note says so openly.
3. **World Bank headquarters (Washington D.C.) NOT asserted** — NCERT leps104 gives only the 1944 creation; WBCS 2017 Q75 mapped untaught for this chapter.
4. **UPU headquarters (Bern), OPEC (Vienna/founded Baghdad), Interpol (Lyon), UNEP (Nairobi), UNESCO (Paris), WHO (Geneva), IAEA (Vienna), ICAO/IMO headquarters NOT taught here** — they appear in GK-bank items GK-ORG-001…010/016, but no allowed-publisher page fetched in this run states them; GK-ORG-016 is mapped taught=false (partially covered) for exactly this reason.
5. **BRICS current member count (11, per the WBCS 2024 official key) NOT taught** — the fetched PIB text names only the five founders (via NDB); WBCS 2024 Q131 mapped untaught with the partial coverage noted.
6. **Current heads of ADB, AIIB and the UN specialised agencies are not named** — no fetched PIB/MEA/IGNOU page in this run names them (same gap as ORG-02 recorded for ADB/AIIB/NDB; the NDB president is likewise unnamed in the fetched PIB text).
7. **WTO member count differs by source date** — IGNOU Unit 7 says 166, NCERT leps104 says 164 (as on 29 July 2016). The chapter teaches the IGNOU figure and q28's explanation flags the NCERT figure and its date rather than hiding the disagreement.
8. **India's eighth UNSC term (2021–22)** postdates the MEA 2020 brief used here; the chapter says "seven times (per the 2020 brief)" and the india_status exam_note discloses this.
9. Bengal connection is honestly regional (BIMSTEC = Bay of Bengal grouping; West Bengal is India's Bay of Bengal littoral state) plus the WBPSC papers' own recurrence of this topic — no Bengal-headquartered body is claimed.
