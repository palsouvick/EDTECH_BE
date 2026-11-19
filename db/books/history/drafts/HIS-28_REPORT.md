# HIS-28 — Draft Report

Chapter: **স্বাধীনতার পরে: দেশীয় রাজ্যের সংযুক্তি, রাজ্য পুনর্গঠন ও বাংলার উদ্বাস্তু** (part `post_independence`, number 28). Title/part taken verbatim from `BE/db/books/history/toc.js`. Status: DRAFT, verification UNVERIFIED.

Deliverables in `~/workspace/edtech/bookwork/his-28/`: `chapter.json`, `pyq_map_HIS-28.json`, `REPORT.md`.
Validator: `node scripts/validateBooks.js` → **chapter.json: OK**.

## Sources actually fetched (browser text-fetch)

1. **NCERT — Politics in India since Independence, Class XII, Chapter 1: Challenges of Nation Building** — https://ncert.nic.in/textbook/pdf/leps201.pdf (fetched in full, 1,990 extracted lines). This single chapter covers all three title themes: partition & refugees, integration of princely states, reorganisation of states.
2. **IGNOU — BHIC-113, History of India VIII (c. 1857–1950), Units 20–21** — https://egyankosh.ac.in/bitstream/123456789/89541/3/BHIC-113(English).pdf (fetched; Units 20–21 read in detail). Used for the 3 June Plan / dominion status, the 72-day haste, Attlee's 20 Feb 1947 announcement, the Boundary Commission award delay, Jinnah's refusal of a common Governor-General, and the "no independence option for princely states" point.

Not fetched / gaps:
- **WBBSE e-textbooks**: unreachable from this machine (per task instruction, not retried) — recorded as a gap; Bengal-refugee detail that lives only in WBBSE was left out rather than written from memory.
- NIOS and e-PG Pathshala: searched, but no directly fetchable lesson/unit covering the missing items (Governor-General succession, Radcliffe's name, Sikkim) was obtained within this run; those items are therefore untaught, not filled from memory.

## Counts

- **Claims: 52** (c01–c52), every one with a verbatim quote from a fetched source above; all claims are used somewhere in the chapter (validator-enforced).
- **Questions: 42** — basic 12, moderate 16, difficult 8, exam 6 (STATEMENT ×2, ASSERTION_REASON, MATCH, PAIRS, CHRONOLOGY). All 6 sections have questions.
- **Sections: 6** — s1 স্বাধীনতার ভোর ও তিনটি চ্যালেঞ্জ · s2 দেশভাগ: সীমান্ত, সহিংসতা ও উদ্বাস্তু সংকট · s3 গান্ধীজির আত্মত্যাগ ও ধর্মনিরপেক্ষ ভারত · s4 দেশীয় রাজ্যের সংযুক্তি · s5 কঠিন মামলা: জুনাগড়, হায়দরাবাদ, মণিপুর · s6 রাজ্য পুনর্গঠন.
- Also present: overview, 8 events, 7 people, 17-row timeline, 8 terms, 3 cause→effect chains, 9 exam_focus points, Bengal connection, 13 quick-revision points.

## PYQs

- Candidates (chapter == HIS-28 or alt == HIS-28 in `pyq_chapters.json`): **14**. Polity `pyq_map.json` has no HIS-28 key (checked).
- Mapped in `pyq_map_HIS-28.json`: **14/14**.
- **Taught: 2** — WBCS-2019-Q51 (Tryst with Destiny → s1), Clerkship-2019-Fore-Q4 (Gandhi assassination, 30 Jan 1948 → s3).
- **Untaught: 12**, each with a specific reason in the map. Main clusters:
  - Governor-General cluster (4 items: first/last Indian GG, last GG, first GG of Pakistan): no fetched allowed source states the succession. IGNOU covers only Jinnah's refusal of a *common* GG.
  - Princely-states count (WBCS-2016-Q55): chapter teaches NCERT's **565**, but the PYQ's options (555/558/560/562) exclude 565 — disclosed in s4's deep text + exam_note, never silently "corrected".
  - Radcliffe's name (WBCS-2019-Q62) and the "Operation Polo" code name (WBCS-2024-Q144): the underlying events (Boundary Commission award delay; Hyderabad army action, Sep 1948) are taught, but the names are not in the fetched sources — disclosed in exam_note boxes in s2 and s5.
  - Sikkim statehood 1975 and Sikkim's last king (2 items): absent from NCERT leps201's reorganisation account and from the fetched IGNOU units.
  - Kripalani as Congress president 1947 (primary HIS-26) and Hind Mazdoor Sangh founder (alt OUT_OF_SCOPE): outside the fetched sources / chapter scope.

## Subtopic coverage

TOC registers **no subtopics** for HIS-28. The validator requires at least one taxonomy slug, so the chapter carries `freedom_movement` and `acts_policies` (the nearest valid slugs: the chapter closes the freedom-movement arc and centres on the States Reorganisation Act). Title themes covered: দেশীয় রাজ্যের সংযুক্তি (s4–s5) ✔, রাজ্য পুনর্গঠন (s6) ✔, বাংলার উদ্বাস্তু (s2 + bengal_connection) ✔ — the Bengal-refugee treatment is limited to what NCERT/IGNOU verify (Bengal's bifurcation, Kolkata as a communal-zone city, Gandhi in Kolkata, refugee-camp life) and says so openly.

## Gaps (disclosed, never filled)

1. WBBSE unreachable → no WBBSE-sourced Bengal refugee statistics, rehabilitation policy, or colony history.
2. Governor-General succession (Mountbatten → Rajagopalachari), Jinnah as Pakistan's first GG, Kripalani 1947: untaught.
3. Radcliffe's name and the Boundary Commission's composition: untaught (Commission and its delayed award are taught).
4. "Operation Polo" code name: untaught; the Hyderabad operation itself is taught.
5. Sikkim (1975 statehood, last king) and Kashmir's accession detail (NCERT leps201 itself defers Kashmir to a later chapter): untaught.
6. NCERT vs PYQ number conflict on princely states (565 vs options up to 562) disclosed in-chapter.
