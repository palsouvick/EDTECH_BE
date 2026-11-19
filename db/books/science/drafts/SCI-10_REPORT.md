# SCI-10 — কোষ ও বংশগতি — Draft Report

- Book: science, code SCI-10, number 10, part biology, subtopics: biology_cell_genetics (verbatim from toc.js). Status DRAFT, verification UNVERIFIED.
- Validator: `node scripts/validateBooks.js ~/workspace/edtech/bookwork/sci-10/chapter.json` → **chapter.json: OK**.

## Sources actually fetched (browser.open, 2026-11-19)
1. NIOS Senior Secondary Biology (314), Lesson 4: Cell – Structure and Function — https://digital.nios.ac.in/content/314en/Lesson-04.pdf (publisher NIOS, allowed)
2. NIOS Senior Secondary Biology (314), Lesson 22: Principles of Genetics — https://digital.nios.ac.in/content/314en/Lesson-22.pdf (publisher NIOS, allowed)
3. NIOS Senior Secondary Biology (314), Lesson 23: Molecular Inheritance and Gene Expression — https://digital.nios.ac.in/content/314en/Lesson-23.pdf (publisher NIOS, allowed)

## Counts
- Claims: 92 (all with verbatim quotes from the fetched lessons above; every claim is used)
- Practice questions: 42 (basic 15, moderate 13, difficult 9, exam 5; formats DIRECT, STATEMENT, MATCH, ASSERTION_REASON, PAIRS), across all 7 sections
- Sections: 7 (cell_basics, organelles, nucleus_chromosome, cell_division, mendel, dna_gene, sex_genetic_disorders)

## PYQ candidates
- Found: 12 (1 GK bank item with subtopic biology_cell_genetics in db/gk/general_science.jsonl — GK-SCI-015 — plus 11 real corpus PYQs from db/pyq: IDO 2019 Q58; KP Constable 2023 Q26, Q43; WBCS 2015 Q132, Q180; WBCS 2017 Q28, Q36; WBCS 2022 Q86, Q113; WBCS 2023 Q69; Clerkship 2023 Session III Q81)
- Mapped: 12; Taught: 10 (all except KP-2023-Q26 and WBCS-2017-Q28)
- Two keyword false positives were excluded: WBCS 2021 Q88 (battery cells — physics) and WBCS 2024 Q45 (solar cells — physics).

## Subtopic coverage
biology_cell_genetics covered for: cell theory and cell types (prokaryote/eukaryote, 80S/70S), plasma membrane and transport, organelles (mitochondria, chloroplast, ribosome, ER, Golgi, lysosome, semi-autonomy), nucleus/chromatin/chromosome and nucleosome packaging, cell cycle (G1/S/G2/M) and mitosis/meiosis with crossing over, Mendel's laws and ratios, test cross, incomplete dominance, codominance (blood groups), linkage, chromosome theory, DNA as genetic material (Griffith, Hershey–Chase), DNA structure (Chargaff, 34 Å turn, H-bonds), DNA vs RNA, semiconservative replication (Okazaki, ligase), central dogma and genetic code (codon, AUG, stop codons), mutation and aneuploidy, sex determination (human XX–XY, birds ZW–ZZ, honey-bee haplodiploidy), criss-cross inheritance, human karyotype, Down/Klinefelter/Turner syndromes, thalassemia, sickle cell anaemia, mitochondrial (maternal) inheritance, human genome numbers.

## Gaps (disclosed, never filled from memory)
- NCERT PDFs (kebo108 Cell: The Unit of Life, kebo110 Cell Cycle, lebo104/lebo105 Inheritance) could NOT be fetched on this machine (browser.open network failure for ncert.nic.in). The chapter is therefore NIOS-only; facts that appear in NCERT but not in the three fetched NIOS lessons are not taught.
- Barr body (WBCS 2017 Q28): the term appears in none of the fetched lessons. Turner syndrome itself is taught, but the item is marked taught:false with the reason in the PYQ map.
- KP Constable 2023 Q26 (tapeworm is not unicellular): the fetched sources say only that bacteria/protozoans are single-celled; tapeworm's multicellularity is not stated, so the item is marked taught:false.
- Details not in the fetched lessons and therefore omitted: endosymbiotic theory, cell sizes beyond nerve cell/ostrich egg, DNA polymerase names beyond ligase/helicase/primase as printed, lac operon detail, amniocentesis and Rh factor (present in NIOS Lesson 22 but left out to keep the chapter within scope; not needed by any mapped PYQ).
- No Bengal-specific source fact was available; bengal_connection uses the taught thalassemia material (autosomal recessive disorder needing regular transfusion) and its carrier-screening relevance, stated openly as relevance rather than as a sourced Bengal statistic.
- events[] and timeline[] carry the concept-history equivalents (Hooke 1665, cell theory 1838, Mendel 1865, rediscovery 1900, Sutton–Boveri 1902, Griffith 1928, Singer–Nicholson 1972), each claim-backed; people[] carries the scientists named in the fetched lessons.
