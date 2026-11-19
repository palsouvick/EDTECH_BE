# SAF-05 — রাসায়নিক ও বিপর্যয় নিরাপত্তা — Draft Report

- Book: industrial_safety · Code: SAF-05 · Number: 5 · Part: hazards_environment · Subtopic: chemical_safety
- Status: DRAFT · Verification: UNVERIFIED
- Validator: `node scripts/validateBooks.js` → **OK**

## Sources actually fetched (browser.open, all allowed GOVT publishers)

1. **The Factories Act, 1948 (Act 63 of 1948)** — India Code, Legislative Department — https://www.indiacode.nic.in/bitstream/123456789/20951/2/the_factories_act%2c_1948.pdf — s.1, s.2(cb), Ch. IVA (41A–41H), ss.87A/88/88A/89/96A, First/Second/Third Schedules. (An identical http India Code copy and the Delhi Labour Dept. Chapter-1 page were also read for cross-checking; only the https India Code copy is cited.)
2. **The Chemical Accidents (Emergency Planning, Preparedness and Response) Rules, 1996** — Factories & Boilers Inspection Dept., Govt. of Kerala — https://fabkerala.gov.in/images/act_rules/RULES/CAR.pdf — preamble (EPA ss.6, 8, 25), definitions, Crisis Groups rr.3–10.
3. **Reply Affidavit of MoEF&CC in OA No. 772 of 2024, with the MSIHC Rules, 1989 as Annexure R1** — National Green Tribunal — https://www.greentribunal.gov.in/sites/default/files/news_updates/Reply%20Affidavit%20by%20MoEF&CC%20in%20OA%20No.%20772%20of%202024%20(NEWS%20ITEM%20TITLED%203%20SLEEPING%20AFTER%20FINISHING%20SHIFT%20KILLED%20IN%20BLAZE%20AT%20NARELA%20FACTORY%206%20INJURED.pdf — MSIHC notification S.O. 966(E) 27-11-1989, CA(EPPR) G.S.R. 347(E) 1-8-1996, Rule 5 (48-hour notification), Rule 13 (on-site plan, 6-monthly mock drill), Rule 14 (off-site plan by District Collector), safety data sheet (Schedule 9).
4. **The Public Liability Insurance Act, 1991 (Act No. 6 of 1991)** — MoEF — https://moef.gov.in/uploads/2018/03/6.pdf — long title, ss.3 (no fault), 4 (insurance before handling), 6(3) (5-year claim limit), 7A (Environmental Relief Fund).
5. **National Disaster Management Guidelines: Chemical Disasters (Industrial), April 2007** — NDMA, GoI (hosted by UP SDMA) — https://sdma.up.gov.in/front/assets/img/upsdma/ndma-guidline/Hazard-Specific-Guidelines/guidelines-on-chemical-disasters.pdf — Bhopal 1984 quote (MIC, over 2000 deaths, "worst chemical disaster in history"), MoEF as nodal ministry.

## Counts

- Claims: **48** (c01–c48), every one with a verbatim quote from a fetched source above; every claim is used at least once.
- Practice questions: **42** — basic 13, moderate 14, difficult 9, exam 6 (STATEMENT ×2, MATCH ×1, CHRONOLOGY ×1, ASSERTION_REASON ×2); 7 questions per section across all 6 sections.
- Sections: 6 (hazardous_process, site_disclosure, occupier_health, worker_voice, bhopal_msihc, crisis_relief), each with quick/standard/deep and boxes.

## PYQ candidates

- From `db/gk/industrial_safety.jsonl`, subtopic `chemical_safety`: **2 found** — GK-SAF-004 (Chapter IVA) and GK-SAF-005 (Bhopal/MSIHC). Both mapped in `pyq_map_SAF-05.json`.
  - GK-SAF-004: taught **true** (all its content is covered from the Act text).
  - GK-SAF-005: taught **true with a disclosed partial** — the chapter teaches Bhopal 1984 + MIC + toll and the MSIHC parentage/thresholds/plans from fetched official sources, but NOT the exact night (2–3 December 1984) or the Union Carbide plant name, because no allowed-publisher page fetched in this run states them (see Gaps).
- From `db/pyq/*.json`: one genuinely on-topic real exam item found — WBPSC Miscellaneous (Prelims) 2023, Q8 ("Give an example of Biological Disaster", whose options/explanation turn on the Bhopal gas tragedy) — but the corpus entry carries **no identifier field** (no code/id), so it cannot be entered in the pyq_map without inventing a code. Recorded here only. No other pyq file contains a chemical-safety/Bhopal/hazardous-process question (other hits were place-name or unrelated chemistry matches).

## Subtopic coverage (chemical_safety)

- Hazardous process definition s.2(cb) + First Schedule industries; state power to amend the Schedule.
- Chapter IVA complete: 41A Site Appraisal Committee (composition, Chairman, 90 days), 41B disclosure + on-site plan + 30-day prior notice, 41C health records/competent supervision/12-month medical exams, 41D Inquiry Committee, 41E emergency standards (DGFASLI), 41F + Second Schedule limits (MIC 0.02 ppm, chlorine 1/3 ppm, CO 50/400 ppm), 41G Safety Committee, 41H right to warn (Inspector's decision final), 96A penalties, 87A prohibition, 88/88A notices, s.89 + Third Schedule diseases.
- Bhopal (as far as the NDMA source goes) → MSIHC Rules 1989: S.O. 966(E), threshold quantities, MAH installations, Rule 5/13/14 duties, safety data sheet.
- Chemical Accidents (EPPR) Rules 1996: definitions, four-tier Crisis Groups, meeting/mock-drill cadence.
- Public Liability Insurance Act 1991: no-fault relief, prior insurance, Collector, 5-year limit, Environmental Relief Fund.

## Gaps (disclosed, never filled from memory)

1. **Bhopal specifics**: the exact date (night of 2–3 December 1984), the Union Carbide India Ltd. plant and the pesticide context appear in GK-SAF-005 but in **no allowed-publisher source fetched in this run** (NDMA guidelines give only year, gas and toll). The chapter states this openly in an exam_note; the detail is left to the GK card.
2. **GHS hazard pictograms / colour codes / PPE classes for chemicals**: not taught — no fetched official (gov.in/nic.in/NIOS) page in this run carries the classification tables. Left out rather than sourced from memory or non-official sites.
3. **MSIHC Schedule 2/3 chemical-wise threshold table** (e.g. chlorine 10/25 tonnes): the annexure table extraction was too garbled to quote verbatim reliably, so only the threshold-quantity *concept* and the MAH definition are taught, not per-chemical tonnages.
4. **OSH Code 2020 successor provisions** (e.g. s.83 site appraisal): outside this chapter's Act-based scope and not fetched; not mentioned.
5. Exam question count is 6 (validator minimum is "exam level present"; the exemplar aim of 5+ is met).
