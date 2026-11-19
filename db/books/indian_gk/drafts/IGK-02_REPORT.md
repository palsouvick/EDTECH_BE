# IGK-02 — ভারতের প্রথমগুলি — Draft Report

- **Chapter:** IGK-02, book `indian_gk`, part `symbols_firsts` (TOC verbatim), subtopic `important_firsts`
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/igk-02/chapter.json` → **OK**
- **Counts:** 23 claims · 42 practice questions (basic 14, moderate 14, difficult 7, exam 7; formats include DIRECT, STATEMENT, CHRONOLOGY, MATCH, PAIRS, ASSERTION_REASON) · 7 sections

## Sources actually fetched (browser.open, 2026-11-19)

| id | Title | URL |
|---|---|---|
| s1 | Former Prime Ministers \| Prime Minister of India (PMO) | https://www.pmindia.gov.in/en/former-prime-ministers/ |
| s2 | Former Presidents of India \| President of India | https://www.presidentofindia.gov.in/former-presidents |
| s3 | Former Vice Presidents \| Vice President of India | https://vicepresidentofindia.nic.in/former-vice-presidents/ |
| s4 | PIB: tributes to G. V. Mavalankar, first Speaker of Lok Sabha | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2195542&reg=3&lang=2 |
| s5 | Successful Launch of Axiom Mission 4 \| ISRO | https://www.isro.gov.in/Successful_Launch_of_Axiom_Mission.html |
| s6 | Aryabhata \| ISRO | https://www.isro.gov.in/ISRO_EN/aryabhata_1.html |
| s7 | About Us \| Metro Railway Kolkata | https://mtp.indianrailways.gov.in/ministry/about-us |
| s8 | Research Reactors in BARC | https://www.barc.gov.in/reactor/index.html |

All URLs are official `*.gov.in` / `*.nic.in` (validator profile `indian_gk`: publishers GOVT + NCERT). Every claim carries a verbatim quote from the fetched page text.

## Subtopic coverage (important_firsts)

Taught, each with fetched quotes: first PM (Nehru) + succession (Nanda, Shastri); first President (Rajendra Prasad) and Presidents 2–3; first Vice-President + first four VPs in order; first Lok Sabha (1952) + first Speaker (Mavalankar); first woman PM (Indira Gandhi); first woman President (Pratibha Patil, 12th, after Kalam 11th); VP→President path (Radhakrishnan, Zakir Husain); first satellite (Aryabhata, 1975, 360 kg); first Indian in space (Rakesh Sharma, 1984, Soviet Soyuz); first metro (Kolkata — sanction/foundation 1972, opening 24 Oct 1984, Dum Dum–Belgachia 12 Nov 1984, B. C. Roy's 1949 idea, MTP 1969); first research reactor on BARC's list (Apsara, criticality 4 Aug 1956, shutdown 2010, vs Apsara-U 2018).

## PYQ candidates

- **Found:** 16 — 8 GK-bank items with subtopic `important_firsts` (GK-IGK-009…016) + 8 real exam questions greped from `db/pyq/*.json` (WBCS 2017 Q119, WBCS 2022 Q79, WBPSC Misc 2023 Q62 & Q70, Clerkship 2004 Q54, 2005 Q55, 2023 S-III Q82, 2023 S-IV Q72).
- **Mapped:** all 16 in `pyq_map_IGK-02.json`.
- **Taught:** 7 (GK-IGK-009…015). **Untaught:** 9, each with a specific reason in the map.

## Gaps (disclosed, never filled from memory)

1. **Tarapur / first nuclear power station (GK-IGK-016):** the NPCIL page (`npcil.nic.in/content/302_1_TarapurAtomicPowerStation.aspx`) could not be fetched this run (network error), so no verbatim quote; not taught. Disclosed in the chapter's `atomic_first` exam_note. Apsara is taught strictly as a BARC *research* reactor, never conflated with Tarapur.
2. **Rajya Sabha "Sixty Years" PDF** (the bank's source for the exact wordings "first woman Prime Minister" / "first woman … elected as the President of India") could not be fetched (network error). The chapter's two women-firsts claims rest on the fetched PMO and Rashtrapati Bhavan lists (only woman in the PM list; first woman in the Presidents list at position 12) and an exam_note in `women_firsts` says exactly that.
3. **ISRO microgravity page** (bank's Rakesh Sharma source) failed to fetch; the claim instead uses ISRO's Axiom-4 page, fetched successfully ("sent Rakesh Sharma to space in 1984 aboard the Soviet Soyuz… another Indian journeys to space" four decades later).
4. **Not taught — no fetched official quote obtained:** first Governor-General of independent India (Mountbatten) and first Indian Governor-General (Rajagopalachari); first woman Chief Minister (Sucheta Kripalani); first President to die in office; first woman Air Marshal; Bachendri Pal (Everest); Arati Saha (English Channel — a natural Bengal addition later); Dipa Karmakar (Olympic gymnast). Also out of scope/first-CJI/first-CEC: no official list page was fetched for the Supreme Court / ECI firsts, so they are absent rather than asserted.
5. Congress-president "firsts" found in the PYQ grep (Annie Besant, W. C. Bonnerjee, Badruddin Tyabji, Subhas Bose session) belong to the History book (HIS-21/22) and were not mapped here.
