# Brief: remaining History chapters, written one by one in TOC order (from 2026-11-12)

Repo root `F:\CODE\GIT EDTECH\EDTECH_BE` (= `<BE>`). Read `BRIEF_PILOT.md`, `BRIEF_MODERN_1.md` and `BRIEF_MODERN_2.md`
(same folder) first; this brief overrides them where it differs. `docs/HISTORY_BOOK_PLAN.md` is not available: scope comes
from `<BE>/db/books/history/toc.js` and the table below. Format: `<BE>/db/books/README.md`. Model chapters to imitate:
`<BE>/db/books/history/ch21-early-congress.json` and `ch23-revolutionaries.json` (NCERT + WBBSE, blind-checked).
Do not change the schema, validator, frontend, published chapters or any file other than your own.

## Sources (only these; nothing from memory)
- NCERT (all-India): `C:\Users\IV DISPLAY\edtech-sources\ncert\<code>.pdf|.txt` (URL form `https://ncert.nic.in/textbook/pdf/<code>.pdf`).
  - Class 6, Exploring Society (2024):
    - `fees104` Timeline and Sources of History
    - `fees105` India, That Is Bharat
    - `fees106` Beginnings of Indian Civilisation
    - `fees107` India's Cultural Roots
    - `fees108` Unity in Diversity
  - Class 7, Exploring Society (new): `gees104` New Beginnings: Cities and States, `gees105` Rise of Empires, `gees106`
    Age of Reorganisation, `gees107` Gupta Era, `gees108` How the Land Becomes Sacred.
  - Class 7, Our Pasts II: `gess101` Tracing Changes (sources, periodisation) … `gess108` 18th-century formations.
  - Class 8 (new): `hees101`-`hees107`, `hees201`-`hees205` (e.g. `hees102` Reshaping India's Political Map, `hees103`
    Rise of the Marathas, `hees104` Colonial Era).
  - Class 8, Our Pasts III: `hess202`-`hess208`.
  - Class 12, Themes I: `lehs101`-`lehs104`. Themes II: `lehs201`-`lehs204`. Themes III: `lehs301`-`lehs304`.
  - Others may be downloaded into the same folder. The old Class 6 Our Pasts I (`fess*`) no longer exists on ncert.nic.in.
- WBBSE / Banglar Shiksha *অতীত ও ঐতিহ্য* (Bengal angle and Bengali terms). PDFs and OCR are in
  `C:\Users\IV DISPLAY\edtech-sources\wbbse\`; provenance in `SOURCE_MANIFEST.md`. Quote as printed, page `PDF p. N`.
  - **Class VII** (approved): `Atit_o_Aityaja_Class_VII.pdf`, OCR `ocr_Atit_VII\`.
    URL `https://banglarshiksha.wb.gov.in/readwrite/etextbook/Atit%20O%20Aityaja%20History%20Class%20VII.pdf`,
    title `অতীত ও ঐতিহ্য, সপ্তম শ্রেণি (পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ)`, class `VII`.
  - **Class VIII** (approved): `Atit_o_Aityaja_Class_VIII.pdf`, OCR `ocr_Atit_VIII\`. Source entry as in ch21.
  - **Class VI** (approved by the owner on 2026-11-12; the main WBBSE source for ancient India): `Atit_o_Aityaja_Class_VI.pdf`, OCR `ocr_Atit_VI\`.
    URL `https://banglarshiksha.wb.gov.in/readwrite/etextbook/Atit%20O%20Aityaja%20Class%20VI.pdf`,
    title `অতীত ও ঐতিহ্য, ষষ্ঠ শ্রেণি (পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ)`, class `VI`.
  - Classes IX–X are NOT approved. Do not use them.
- The Read tool refuses these large PDFs. To see a page image, render it with
  `C:\Users\IV DISPLAY\AppData\Local\Programs\Python\Python312\python.exe` and pymupdf
  (`d[N-1].get_pixmap(dpi=110).save(...)`) into **your own subfolder** of the scratchpad, then Read the PNG.
- Quote check:
  `node <BE>/scripts/content/checkQuotes.js <file> --text <id>=<ncert txt> ... --text <wbbseId>=<ocr dir>`.
  NCERT quotes must be OK and WBBSE quotes OK_OCR; list every NEEDS_PAGE_CHECK.
  Validator: `node <BE>/scripts/validateBooks.js <file>`.

## Mistakes the Batch 1 blind checks caught (avoid them)
- "First", "biggest", "most important", "only" when the book says "one of" or does not rank. Copy the book's degree exactly.
- A date or year the book does not give (for example, a person dated by an event that the book dates only as "a few
  months later").
- Saying "all three books say X" when only one does. Attribute each detail to the book that says it.
- Linking two facts causally ("which led to") when the book lists them separately.
- Typos in initials and names (V. D., not B. D.). Use the book's spelling of names.
- Assertion–reason items whose causal link only one book states: anchor the stem to that book.
- Exam keys the books do not support: you may state them in a clearly labelled exam_note, never as textbook fact.

## Your files
- `drafts/<file>.json` (DRAFT / UNVERIFIED) and `drafts/pyq_map_<code>.json`.
- Candidates: `drafts/pyq_candidates_<code>.json` (read-only). Keep build scripts in `scratchpad\<code>\`.

## Scope (link to neighbouring chapters instead of repeating them)
| Code | File | Scope |
|---|---|---|
| HIS-00 | ch00-how-to-study-history.json | What history is; sources (archaeological: tools, coins, inscriptions, monuments; literary: religious/secular texts, foreign travellers), how historians read them; time reckoning (BCE/CE, centuries, eras such as Saka/Vikram where the books give them); periodisation (ancient/medieval/modern, and the books' critique of colonial "Hindu-Muslim-British" periodisation); the map of the book. Short and foundational. |
| HIS-01 | ch01-prehistoric.json | Palaeolithic/Mesolithic/Neolithic, tools, sites, fire, rock art, domestication and first farming, Mehrgarh, Neolithic sites, Chalcolithic cultures; Bengal sites (e.g. Pandu Rajar Dhibi) only if the books support them. Harappa itself is HIS-02. |
| HIS-03 | ch03-vedic.json | Aryans/Vedic texts, Rigvedic society, polity and religion, later Vedic changes, varna, Upanishads. |
| HIS-04 | ch04-mahajanapadas.json | 16 mahajanapadas, ganas/sanghas, rise of Magadha (Haryanka, Shishunaga, Nanda), Persian and Greek (Alexander) contacts. |
| HIS-05 | ch05-buddhism-jainism.json | New religious ideas of the 6th century BCE, Buddha and Mahavira, teachings, councils, sects, spread. |
| HIS-06 | ch06-maurya.json | Chandragupta, Kautilya/Arthashastra, Megasthenes, Bindusara, Ashoka (Kalinga, dhamma, edicts), administration, decline. |
| HIS-07 | ch07-post-maurya-sangam.json | Shungas, Indo-Greeks, Shakas, Kushanas (Kanishka), Satavahanas, Sangam age and literature, trade with Rome. |
| HIS-08 | ch08-gupta-harsha.json | Gupta rulers, administration, culture/science, Fa-hien, decline; Harsha, Hiuen Tsang; Pallavas/Chalukyas in brief. |
| HIS-09 | ch09-early-medieval-bengal.json | Shashanka, matsyanyaya, Palas, Senas, Pratiharas/Rashtrakutas (tripartite struggle), Cholas. |
| HIS-10 | ch10-sultanate.json | Turkish invasions, Delhi Sultanate dynasties and key rulers, administration (iqta), Bengal Sultanate (Ilyas Shahi, Hussain Shahi). |
| HIS-11 | ch11-vijayanagara-bahmani.json | Vijayanagara (Krishnadevaraya, Hampi, Talikota), Bahmani and Deccan sultanates. |
| HIS-12 | ch12-bhakti-sufi.json | Bhakti saints (Kabir, Nanak, Mirabai, Chaitanya…), Sufi silsilas, Sikhism's beginnings, Bengal Vaishnavism. |
| HIS-14 | ch14-marathas-18c.json | Shivaji and the Peshwas, Panipat 1761, 18th-century regional states, Nawabs of Bengal up to Siraj (Plassey itself is HIS-16). HIS-13 (Mughals) is published: link it. |
| HIS-15 | ch15-europeans.json | Portuguese, Dutch, English, French, Danes; factories; Carnatic wars. |
| HIS-16 | ch16-plassey-to-dalhousie.json | Plassey, Buxar, Diwani, Mysore and Maratha wars, Subsidiary Alliance, Doctrine of Lapse, Punjab, annexations. |
| HIS-17 | ch17-company-administration.json | Regulating Act and Pitt's Act (constitutional detail is in HIS-27: link), Permanent Settlement, Ryotwari, Mahalwari, drain, de-industrialisation, Company law and police. |
| HIS-18 | ch18-peasant-tribal-revolts.json | Sannyasi-Fakir, Chuar, Santhal, Munda (Birsa), Indigo, Wahabi/Faraizi, Titu Mir, Kol, Pabna etc. |
| HIS-19 | ch19-revolt-1857.json | Causes, Barrackpore/Meerut, centres and leaders, suppression, results, the 1858 Act and Proclamation. |
| HIS-27 | ch27-constitutional-governors.json | Acts 1773–1947 and the Governors-General/Viceroys with their key measures. |
| HIS-28 | ch28-after-independence.json | Integration of princely states, states reorganisation, Bengal refugees. |

## Report (reply)
Same as BRIEF_MODERN_2.md: sources (with pages), sections, word counts, claims and questions per level, quote-check counts and NEEDS_PAGE_CHECK ids, PYQ map (taught/not with reasons), source disagreements, doubtful keys, source gaps, validator result, suggested GK corrections.
