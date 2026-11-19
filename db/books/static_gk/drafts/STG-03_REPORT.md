# STG-03 — আদমশুমারি ও পরিসংখ্যান (আদমশুমারি ও পরিসংখ্যান) — Draft Report

Book: `static_gk` · Code: `STG-03` · Number: 3 · Part: `knowledge` · Subtopics: `census_statistics`
Status: DRAFT · Verification: UNVERIFIED · Validator: **OK** (`node scripts/validateBooks.js` — no errors)

## Deliverables

- `chapter.json` — 6 sections, **62 claims**, **42 questions** (basic 12, moderate 14, difficult 10, exam 6; every section tested)
- `pyq_map_STG-03.json` — 15 candidates mapped, 9 taught, 6 untaught with reasons

## Sources actually fetched (browser.open, 2026-11-19)

Used in the chapter (all pass the `static_gk` publisher profile — GOVT `*.gov.in`/`*.nic.in` or NCERT textbook PDFs):

1. **Census 2027 Backgrounder — Press Information Bureau, Government of India**
   https://www.pib.gov.in/PressReleasePage.aspx?PRID=2255461&reg=48&lang=2
   → census definition; first modern census 1865–1872 (not simultaneous), first synchronous 1881; Census Act 1948 & Rules 1990; Union subject (7th Schedule, serial 69); Section 15 confidentiality; 2021 census missed (COVID-19); Census 2027 = 16th / 8th since independence, first digital; Phase I Apr–Sep 2026, Phase II Feb 2027 incl. caste enumeration (CCPA 30 Apr 2025); reference date 00:00 hrs 1 Mar 2027 (1 Oct 2026 Ladakh/snow-bound); outlay ₹11,718.24 crore; ~31 lakh enumerators; self-enumeration in 16 languages incl. Bengali.
2. **NCERT Class XII Geography (India: People and Economy), Ch. 1 — Population: Distribution, Density, Growth and Composition (legy201)**
   https://ncert.nic.in/textbook/pdf/legy201.pdf
   → census every 10 years, first 1872 / first complete 1881; India 1,210 million, 2nd after China; state population order UP > Maharashtra > Bihar > West Bengal; 10 states ≈76%; density 382 (1951: 117), range Arunachal 17 → Delhi 11,297; state densities Bihar 1102, WB 1029, UP 828, Kerala 859, TN 555; Table 1.1 totals & decadal growth 17.64% (2001: 21.54%), annual growth 1.64%; four growth phases; rural 68.8% / urban 31.16%; 640,867 villages, 93.2% inhabited; adolescents 10–19 = 20.9%; main/marginal worker (183 days); physiological & agricultural density formulas.
3. **NCERT Class XII Sociology (Indian Society), Ch. 2 — The Demographic Structure of the Indian Society (lesy102)**
   https://ncert.nic.in/textbook/pdf/lesy102.pdf
   → British censuses 1867–72, decennial since 1881, seven since 1951, largest such exercise in the world; sex-ratio definition; SR 943 (trend 941 → 927 → 933); CSR 919 provisional (945 → 927 → 919), highest Arunachal 972, Kerala 964, West Bengal above the 919 average; CSR decline causes; PNDT Act 1996/2003; Beti Bachao Beti Padhao; literacy Table 4 (2011: 73.0 / M 80.9 / F 64.6, gap 16.3; 2001: 65.4); Kerala near-universal literacy, Bihar lagging; rural 833M / urban 377M; population policy 1952.
4. **MoSPI — Women and Men in India 2016, Chapter 1: Population Related Statistics**
   https://mospi.gov.in/sites/default/files/reports_and_publication/statistical_publication/social_statistics/WM16Chapter1.pdf
   → India 121.06 crore, females 48.5%; SR 943 (rural 949, urban 929); SR highest Kerala 1084, Puducherry 1037, lowest UT Daman & Diu 618; state SR — WB 950, Haryana 879 (lowest state), TN 996, Punjab 895, UP 912, Bihar 918; Table 1.1 final totals 1210.57M (M 623.12, F 587.45); CSR (PCA) India 918 (rural 923, urban 905), WB 956, Haryana 834 (lowest).
5. **MoSPI — Women and Men in India 2018, Chapter 3 (Table 3.3: Comparison of Literacy Rates)**
   https://www.mospi.gov.in/sites/default/files/publication_reports/Women%20and%20Men%20%20in%20India%202018.pdf
   → literacy 2011 (PCA, age 7+): India 73.0 (F 64.6, M 80.9); Kerala 94.0 highest; Bihar 61.8 lowest; West Bengal 76.3 (2001: 68.6); Mizoram 91.3, Goa 88.7, Tripura 87.2.

Fetched but **not** used in the chapter:

6. **NIRDPR — Rural Development Statistics 2014-15, Section 1: Population**
   http://nirdpr.org.in/nird_docs/RDS/RDS2014-15/data/section-1.pdf
   → Reproduces Census 2011 PPT Paper-1 tables (state populations, density, sex ratio, urbanisation). **Dropped:** the host is an `org.in` domain, which fails this book's GOVT publisher pattern (`*.gov.in` / `*.nic.in` only), so the validator rejected it. All claims sourced solely from it were removed (see Gaps).
7. **NCERT Journal of Indian Education article (ejournals.ncert.gov.in)** — fetch failed (browser.open error; not retried). It was the candidate source for the provisional literacy set (74.04%); see Gaps.

Failed/unusable fetches (from the source hunt): Census of India state-level xlsx (the GK bank's source) — no extractable text; NCERT iess106.pdf — not found.

## Counts

- Claims: **62** (every claim used at least once; every claim has a verbatim quote from a fetched page above)
- Questions: **42** — basic 12, moderate 14, difficult 10, exam 6 (STATEMENT ×2, CHRONOLOGY, MATCH, ASSERTION_REASON, STATEMENT); all 6 sections tested
- Sections: 6 (`census_intro`, `census_2011_totals`, `density_distribution`, `sex_ratio`, `literacy_rural_urban`, `census_2027`)
- Events: 6 · Timeline: 9 · Terms: 11 · Cause–effect: 2 · Quick revision: 12 · People: none (no sourced individual fits this chapter — the 2011 Registrar General's name could not be quote-sourced)

## PYQ candidates

Found **15** real candidates, all mapped in `pyq_map_STG-03.json`:

- GK bank (`db/gk/static_gk.jsonl`, subtopic `census_statistics`): GK-SGK-012, GK-SGK-013, GK-SGK-014 — all **taught**
- WBCS Prelims corpus (`db/pyq/wbcs-prelims-*.json`): 2015 Q130 (Mouza — untaught), 2015 Q188 (densest state — taught, with exam_note on the option set), 2016 Q165 (Arunachal density — taught), 2016 Q170 (Goa urbanisation — untaught), 2017 Q141 (below-35 share — untaught), 2018 Q61 (2nd most populated district — untaught), 2019 Q45 (WB literacy — taught, provisional-vs-final flagged), 2021 Q131 (Puducherry SR — taught), 2022 Q172 (Howrah district CSR — untaught), 2024 Q30 (first digital census — taught), 2024 Q70 (sex-ratio definition — taught)
- WBPSC Clerkship 2009 Session I Q5 (population "at the time" estimate — untaught, not a census statistic)

**Taught: 9 / 15.** A keyword scan (census | sex ratio | literacy rate | population density | mouza) over the whole `db/pyq/*.json` corpus returned no other candidates.

## Subtopic coverage (`census_statistics`)

Covered: census meaning, history and legal framework; Census 2011 headline totals, sex-wise composition, decadal/annual growth and the four growth phases; population distribution and state ranking; density (national, state, extremes, physiological/agricultural); sex ratio and child sex ratio (definitions, national/state values, trend, causes, PNDT Act, BBBP); literacy (definition 7+, national/state values, gender gap); rural–urban composition, villages, adolescents, workers; Census 2027 (phases, dates, caste enumeration, digital features, cost, manpower). Bengal connection is genuine and sourced (WB 4th in population, density 1029, SR 950, CSR 956, literacy 76.3%, Bengali self-enumeration).

## Gaps (disclosed, never filled from memory)

1. **Provisional literacy set not taught** (India 74.04%, M 82.14, F 65.46; Kerala 93.91; Bihar 63.82): no verbatim quote could be obtained from an allowed fetched source (the NCERT journal PDF fetch failed). The chapter teaches the final PCA set (73.0 / 94.0 / 61.8 / WB 76.3), on which NCERT Sociology Table 4 and MoSPI Table 3.3 agree. The WBCS 2019 provisional WB figure (77.08%) is flagged in an exam_note.
2. **NIRDPR-sourced facts dropped** (publisher-pattern failure, see source 6): Goa most urbanised state (62.17%), Sikkim least populous state, Lakshadweep least populous UT, district (640) and town (7,935) counts, Nagaland's negative decadal growth (−0.47%), provisional sex ratios (India 940, WB 947), and exact state population counts in millions. Consequences: WBCS 2016 Q170 (Goa) is untaught; two practice questions were rewritten to sourced facts (Delhi's density; physiological density).
3. **Final PCA density variants** (Bihar 1106, West Bengal 1028) not used — no fetched quote; the chapter teaches the NCERT figures (1102 / 1029) that most answer keys also use.
4. **Exact final state population counts** (e.g. UP 199,812,341; WB 91,276,115 — the GK bank's figures) not taught: their source (Census xlsx) is not fetchable as text. The chapter teaches the ranking (NCERT) and national totals.
5. **Not taught, no allowed-source quote found:** 'Mouza' = revenue village; district-level facts (Thane most populous district / North 24 Parganas second; Howrah highest WB district CSR); population share below age 35 (65%); Census 2011 slogan; name of the 2011 Registrar General & Census Commissioner; NCERT Sociology's printed Haryana CSR figure (793) conflicts with the official PCA value (834, MoSPI) — the chapter uses 834 and does not cite the NCERT figure.
6. **CSR headline choice:** NCERT's provisional 919 is taught as the primary value (it is what most answer keys use), with the final PCA figure 918 (MoSPI) stated alongside wherever the value appears.
