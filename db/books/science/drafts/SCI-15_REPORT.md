# SCI-15 — আবিষ্কার ও উদ্ভাবন (Discoveries and Inventions): Draft Report

- **Book / part / subtopic:** science / general / `discoveries` (verbatim from `db/books/science/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/sci-15/chapter.json` → **OK** (no errors)

## Sources actually fetched (browser.open, 2026-11-19)

All NCERT (allowed publisher for the science profile: NCERT, IGNOU, NIOS, EPG, GOVT):

1. **s1** — Science, Class VIII, Chapter 2: Microorganisms — Friend and Foe — https://ncert.nic.in/textbook/pdf/hesc102.pdf
2. **s2** — Chemistry Part I, Class XI, Unit 2: Structure of Atom — https://ncert.nic.in/textbook/pdf/kech102.pdf
3. **s3** — Science, Class X, Chapter 8: Heredity — https://ncert.nic.in/textbook/pdf/jesc108.pdf
4. **s4** — Physics Part I, Class XI, Chapter 2: Motion in a Straight Line — https://ncert.nic.in/textbook/pdf/keph102.pdf
5. **s5** — Biology, Class XII, Unit front matter + Chapter 7: Human Health and Disease — https://ncert.nic.in/textbook/pdf/lebo107.pdf

Two further NCERT fetches failed at the fetch tool (`lebo105.pdf`, `lebo106.pdf` — upstream fetch errors, not retried per instructions); the chapter was built without them and nothing from them is claimed.

## Counts

- **Claims:** 41 (c01–c41), every one with a verbatim quote from a fetched page above; every claim is used at least once (validator-enforced).
- **Practice questions:** 42 — basic 12, moderate 16, difficult 8, exam 6; 7 per section across all 6 sections (s1 discovery-vs-invention/Galileo, s2 subatomic particles, s3 X-rays/radioactivity/nucleus, s4 fermentation/antibiotics, s5 vaccine/medicine, s6 Mendel/Green Revolution). Formats: DIRECT 35, STATEMENT 2, MATCH 2, CHRONOLOGY 1, ASSERTION_REASON 1, PAIRS 1.
- **Sections:** 6, each with quick + standard; deep present in 5 (s5 has deep = null).

## PYQ candidates

Found by (1) filtering `db/gk/general_science.jsonl` for `subtopic == discoveries` → **1 item** (GK-SCI-017), and (2) grepping `db/pyq/*.json` for genuine invention/discovery questions → **8 items**. Total **9 candidates**, all in `pyq_map_SCI-15.json`:

- **Taught (2):** GK-SCI-017 (partly — only the penicillin–Fleming line is taught; the rest of the pack is a disclosed source gap, see below), WBCS 2017 Q40 (penicillin from fungi — fully taught in s4).
- **Not taught (7), each with a specific reason in the map:** IDO 2019 Q3 (Boson / S. N. Bose), IDO 2019 Q11 (Edison bulb), IDO 2019 Q64 (Brahmachari, kala-azar), IDO 2019 Q99 (Raman Effect), Misc 2023 Q68 (Tesla, AC), Misc 2023 Q100 (father of Indian Space Programme), WBCS 2015 Q83 (blue LED Nobel).

## Subtopic coverage

`discoveries` is covered at textbook depth for every discovery the fetched NCERT sources support: discovery vs invention; Galileo and acceleration; Dalton (1808), Faraday (1830); electron (cathode rays, Thomson e/m 1897, Millikan oil drop), proton (1919), neutron (Chadwick 1932); Thomson's plum-pudding model (1898) and Nobel (1906); Röntgen's X-rays (1895); Becquerel's radioactivity and the Curies/Rutherford/Soddy; the gold-foil experiment and the nucleus; Bohr (1913); Pasteur's fermentation (1857); Fleming's penicillin (1929) and antibiotics; Jenner's smallpox vaccine (1798), how vaccines work, smallpox eradication; Harvey's circulation; Mendel's laws (counting method, peas, F2 one-quarter short, dominant/recessive); Swaminathan–Borlaug and the Green Revolution.

## Gaps (disclosed, never filled from memory)

1. **Classic machine inventions** — printing press (Gutenberg), steam engine (Watt), telephone (Bell), electric bulb (Edison), radio (Marconi), aeroplane (Wright brothers), television (Baird), computer (Babbage): these form most of GK-SCI-017 and the IDO 2019 bulb question, but **no fetched page from an allowed publisher (NCERT/IGNOU/NIOS/EPG/GOVT) states them**. Targeted searches for IGNOU/NIOS/GOVT pages returned no fetchable allowed source. They are therefore NOT taught in the chapter, and the affected PYQs are mapped untaught with this reason. This is the chapter's largest gap and the first thing to close if an allowed source (e.g. an IGNOU history-of-science unit PDF) is fetched in a later pass.
2. **Indian scientists asked in PYQs but absent from the fetched pages** — Satyendra Nath Bose (boson), C. V. Raman (Raman Effect), Upendra Nath Brahmachari (kala-azar medicine — a Bengal-linked discovery), Vikram Sarabhai (space programme): all mapped untaught with reasons. The Bengal connection section states this openly instead of asserting anything unsourced.
3. **Tesla / alternating current** (Misc 2023) and the **blue LED Nobel** (WBCS 2015): not in the fetched sources; untaught.
4. **Bohr claim page** (c26) is taken from kech102's summary and marked "(approx.)"; the Swaminathan claims (c38, c39) come from lebo107's unit front matter and are likewise marked "(approx.)" — exact printed pagination was not cleanly recoverable from the extraction.
5. No WBBSE source was used: the science validator profile does not admit WBBSE, and the chapter is NCERT-only by design.
