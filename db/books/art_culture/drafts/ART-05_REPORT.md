# ART-05 — উৎসব (Festivals) — Draft Report

Chapter: ART-05, book `art_culture`, part `living`, subtopics `["festivals"]` (title/subtitle/part/subtopics taken verbatim from `db/books/art_culture/toc.js`; TOC registers the title as "উৎসব").
Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Sources actually fetched (browser.open, 2026-11-19) — all allowed publishers for art_culture (GOVT)

1. Intangible Cultural Heritage of India — PIB Backgrounder (Ministry of Culture) — https://static.pib.gov.in/WriteReadData/specificdocs/documents/2022/jan/doc20221206901.pdf
2. India hosts the 20th session of the ICH Intergovernmental Committee — PIB Press Release — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2198744&reg=3&lang=1
3. 'Garba of Gujarat' inscribed on UNESCO Representative List — PIB Press Release, 6 Dec 2023 — https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=1983133&reg=48&lang=2
4. The Hornbill Festival — Nagaland Tourism (Govt. of Nagaland) — https://tourism.nagaland.gov.in/hornbill2022/about.html
5. Bathukamma — District Kamareddy, Government of Telangana — https://kamareddy.telangana.gov.in/festival/bathukamma/
6. Festivals of Assam — Department of Cultural Affairs, Government of Assam — https://culturalaffairs.assam.gov.in/frontimpotentdata/festivals-of-assam
7. Overview on Cuttack — Cuttack Municipal Corporation, Government of Odisha — https://cmccuttack.odisha.gov.in/index.php/overview-on-cuttack/
8. Environmental Science, Standard IV, Part 1 ("Land of Arts") — SCERT, Government of Kerala — https://samagra.kite.kerala.gov.in/files/samagra-resource/uploads/tbookscmq/VOL1/STD4/ParisarapadanamEnglish/ParisarapadanamEnglish.pdf

## Counts

- Claims: **39** (c01–c39), every claim with a verbatim quote from a fetched page above; every claim is used at least once.
- Questions: **42** — basic 12, moderate 18, difficult 6, exam 6 (STATEMENT ×2, CHRONOLOGY, PAIRS, MATCH, ASSERTION_REASON); 7 per section across all 6 sections.
- Sections: 6 — utsab_ki (ICH concept/domains), kumbh, durga_garba, fosol (Bihu/Onam), ancholik (Bathukamma/Hornbill/Boita Bandana/Ambubachi), unesco_talika (chronology).
- `people` is an empty array (no person-centred facts in the fetched sources; the book profile is non-dated, so this is validator-clean). `events`/`timeline` carry the UNESCO-inscription chronology as the honest equivalent of dated entries.

## PYQ candidates

Found **11**: 3 from the GK bank (`db/gk/art_culture.jsonl`, subtopic `festivals`: GK-ART-010, GK-ART-011, GK-ART-117) and 8 from the PYQ corpus (`db/pyq/*.json`).
Mapped: 11. **Taught: 7** (GK-ART-010, GK-ART-011, GK-ART-117, WBP Constable 2021 Q93 Onam, Clerkship 2023 S-II Q78 Bathukamma, S-III Q69 Boita Bandana, S-IV Q65 Hornbill).
Untaught: 4, each with a specific reason in `pyq_map_ART-05.json` (Pongal source gap; Rakhi Bandhan and Tilak's festivals belong to the History book; Divya Kala Mela ministry fact not in any fetched source).

## Subtopic coverage

Single registered subtopic `festivals` — covered end-to-end: concept (ICH/domains), the largest festival (Kumbh), UNESCO-listed festivals (Durga Puja, Garba, Ramman, Ramlila), harvest festivals (Bihu ×3, Onam), regional festivals and fairs (Bathukamma, Hornbill, Bali Yatra/Boita Bandana, Ambubachi Mela), and the full inscription chronology 2008–2023.

## Gaps (disclosed, never filled from memory)

- **Pongal (Tamil Nadu)** — a real WBCS 2022 PYQ topic, but no allowed-publisher page fetched for this chapter carries a usable Pongal statement (NCERT/IGNOU/e-PG Pathshala searches returned no fetchable text). Left untaught; flagged in the PYQ map.
- **Onam detail** — the chapter teaches only what SCERT Kerala states (Mahabali, harvest festival, Onasadya, boat races). The GK bank's finer details (10 days from Atham in Chingam; the name "Vallam Kali") come from Kerala Tourism (keralatourism.org), which is not an allowed publisher for this book, so they are not asserted.
- **Diwali, Holi, Eid, Baisakhi, Lohri, Makar Sankranti** — no fetched allowed source carried teachable statements on these, so the chapter does not cover them despite their exam frequency. A future NCERT/IGNOU-sourced pass should add them.
- **Garba's Navratri link** — the fetched PIB Garba release does not state that Garba is performed during Navratri, so the chapter presents Garba only as Gujarat's inscribed dance-festival element (2023, Kasane) without the Navratri detail.
- Kumbh place name: the PIB backgrounder prints "Allahabad"; the chapter gives "এলাহাবাদ (প্রয়াগরাজ)" — the modern name is added as a bracketed gloss only.
- The Cuttack source spells the ritual "Boita Bandaana" and contains OCR/typing errors ("peform", "Bali-Yatra fail"); claim quotes reproduce the source text as fetched.
