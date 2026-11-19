# ART-04 — স্থাপত্য ও স্মৃতিস্তম্ভ (Architecture & Monuments) — Draft Report

- Book: art_culture · Code: ART-04 · Part: visual_heritage (TOC verbatim) · Subtopic: architecture
- TOC title used verbatim: "স্থাপত্য ও স্মৃতিস্তম্ভ" (toc.js registers স্মৃতিস্তম্ভ, not স্মৃতিসৌধ)
- Status: DRAFT · Verification: UNVERIFIED
- Validator: `node scripts/validateBooks.js ~/workspace/edtech/bookwork/art-04/chapter.json` → **OK**

## Counts
- Claims: 56 (all with verbatim quotes from fetched pages, all used)
- Questions: 42 — basic 16, moderate 15, difficult 4, exam 7; all 6 sections tested
- Sections: 6 — basic_form, nagara_style, odisha_bengal, dravida_vesara, early_monuments, sultanate_mughal

## Sources actually fetched (browser.open)
1. NCERT, An Introduction to Indian Art, Class XI, Ch. 6: Temple Architecture and Sculpture — https://ncert.nic.in/textbook/pdf/kefa106.pdf
2. NCERT, An Introduction to Indian Art, Class XI, Ch. 3: Arts of the Mauryan Period — https://ncert.nic.in/textbook/pdf/kefa103.pdf
3. ASI, Sun Temple, Konarak (1984), Odisha — https://asi.nic.in/pages/WorldHeritageKonarak
4. ASI, Qutb Minar and its Monuments (1993), Delhi — https://asi.nic.in/pages/WorldHeritageQutbMinar
5. ASI, Group of Temples, Khajuraho (1986), Madhya Pradesh — https://asi.nic.in/pages/WorldHeritageKhajuraho
6. ASI, Hampi (1986), Karnataka — https://asi.nic.in/pages/WorldHeritageHampi
7. ASI, World Heritage Sites – Agra – Taj Mahal — https://asi.nic.in/pages/WorldHeritageAgra

All URLs match the art_culture validator profile (NCERT + GOVT/*.nic.in).

## PYQ candidates
- Found: 12 — 9 GK bank items (subtopic architecture: GK-ART-006, 007, 008, 009, 112, 113, 114, 115, 116) + 3 real exam PYQs from db/pyq (WBCS Prelims 2019 Q69, WBCS Prelims 2021 Q63, WBPSC Clerkship 2007 Q10)
- Mapped: 12 · Taught: 9 · Untaught: 3 (see pyq_map_ART-04.json)

## Subtopic coverage
architecture — temple styles (Nagara/Dravida/Vesara/Odisha), early monuments (stupa, pillars, rock-cut caves), medieval temples (Khajuraho, Konark, Modhera, Thanjavur, Hampi), Sultanate & Mughal monuments (Qutb complex, Taj Mahal), Bengal terracotta temples and the Bangla roof.

## Gaps (disclosed, never filled from memory)
- **Fatehpur Sikri / Ibadat Khana not taught**: NCERT kefa108.pdf (Mughal architecture chapter) fetch failed twice (network error), and the ASI Taj Mahal page (WorldHeritageTajMahal) timed out; the ASI Agra page was used instead for the Taj. No fetched allowed source covers Fatehpur Sikri, so 2 PYQs on it are mapped untaught.
- **Khajuraho–Al-Biruni name reference not taught**: appears in no fetched source.
- Taj Mahal's UNESCO inscription year (1983) is not stated on the fetched ASI Agra page text, so it is not claimed in the chapter (the ASI Agra Circle page title shows "(1983)" in search results only, not in a fetched page).
- Colonial-era architecture (e.g. Victoria Memorial) and Bengal's Dakshineswar/Belur temples are not covered — no fetched allowed source in this run; left for a later chapter or a sourced revision.
- NCERT kefa106 quotes retain the PDF's occasional missing spaces in the verbatim quote field (e.g. "rockcut", "wellbuilt") — quotes are reproduced exactly as fetched.
