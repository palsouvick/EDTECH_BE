# Exam Engine (SSC · Banking · WBPSC · WB Postal)

Multilingual (English / বাংলা / हिन्दी) question bank with two execution engines:
**Practice** (topic sheet + paginated questions + instant answer check) and
**Mock** (weighted-random generated tests with server-side scoring).

```
cp .env.example .env          # npm scripts load .env (Node --env-file-if-exists; Node >= 22.9)
npm install
npm test                      # unit + end-to-end against an in-memory mongod
npm run dev                   # or: npm start
```

**No manual seeding needed.** On every start the server runs [src/db/bootstrap.js](src/db/bootstrap.js), which is idempotent:

- **Indexes.** In production, where `autoIndex` is off, it applies [db/indexes.mongo.js](db/indexes.mongo.js) without `mongosh`.
- **Reference data.** It upserts the catalogue and cut-offs from code, and inserts concept sheets and sample questions that are missing. Rows edited in the database are kept.
- **Question bank.** It tops every chapter up to `SEED_QUESTIONS_PER_TOPIC` generated questions (default 300). It does this again whenever the target or the question files change (it compares a fingerprint stored in `seed_state`), so new fact banks reach the database on the next deploy. Existing questions are kept. This runs in the background after the server starts listening. A lock in `seed_locks` stops several instances from generating at once.
- **Admin.** It creates the first admin account from `ADMIN_EMAILS` and `ADMIN_PASSWORD`.

`AUTO_SEED=false` turns off everything except the admin step. The `db:indexes`, `db:seed` and `db:generate` scripts below still work for manual runs: importing more files, `--overwrite-summaries`, `--append`, `--reset`.

### Generated question bank (Copilot generators)

[scripts/generateAndSeed.js](scripts/generateAndSeed.js) builds bilingual EN+BN questions from the
templates in [scripts/generators/](scripts/generators/) (quant, english, reasoning):

```
npm run db:generate -- --dry-run --count 1000   # generate + validate, no DB writes
npm run db:generate -- --count 1000             # top up each subject to 1000 generated questions
npm run db:generate -- --count 200 --append     # add 200 new ones per subject
```

To give **every chapter at least 100 questions**, run:

```
npm run db:generate -- --per-topic 100
```

Each chapter is topped up to 100 generated questions. Each question is served to every category whose syllabus has its chapter: Percentage goes to SSC, Banking, WBPSC and WB Post; Banking Awareness to Banking only.

Question sources per subject:

| Source | Covers | How correctness is ensured |
|---|---|---|
| `generators/{quant,reasoning,english}.js` (Copilot) | 20 template chapters | Hand-checked sample per generator, plus `test/generators.test.js` |
| `generators/supplement/quant.js` | Mixture & Alligation | `test/supplement.test.js` re-derives every answer from the question text |
| `generators/supplement/reasoning.js` | Seating Arrangement | Puzzles are built so exactly one line-up fits; the test re-solves each one by brute force from its clue text |
| `generators/factbank/*.js` | 7 GS chapters + Reading Comprehension, Fill in the Blanks, Sentence Improvement | `factbank/validate.js` checks the format; facts were sampled and checked by hand |

Fact banks are authored, not generated: a fixed set of 112–171 bilingual questions per chapter. To grow a chapter, add items to its bank (`node scripts/generators/factbank/validate.js <file>` checks it).

**Current Affairs comes in monthly, sourced packs:** `scripts/generators/factbank/current_affairs_YYYY_MM.js`, one file per month (`month: 'YYYY-MM'`). Each question also carries `src: { date, name, url }`:

- `date` is the event date and must fall inside that month;
- `url` is an https page that confirms the fact, preferably PIB, a ministry, RBI or ISRO, never a coaching site.

The validator rejects items without a source. Students see "📰 date · Source" under the explanation, and the month is stored as the subtopic (`ca_2026_09`). **Adding a month:** write the file, run `node scripts/generators/factbank/validate.js <file>` (it needs at least 30 questions), and deploy. The startup top-up picks it up.

**PYQ badges need official sources.** `PUT /api/v1/admin/questions/:id/pyq` requires `sourceUrl` (the question paper) and `answerKeyUrl`, both https links on a commission's own domain (`OFFICIAL_HOSTS` in [src/services/questionProvenance.js](src/services/questionProvenance.js)). Tagging sets `provenance: OFFICIAL_VERIFIED`; removing the last verified ref clears it. Students see a PYQ badge only for refs that pass this check, whatever older data contains.

**Previous-year questions come from official papers only.** Each paper is a JSON file in `db/pyq/`, imported on startup. See [db/pyq/README.md](db/pyq/README.md) for the format and rules; the importer rejects any source that is not a commission's own website.

**Profit & Loss Hard practice** uses the registry in [db/patterns/quant/profit_loss.js](db/patterns/quant/profit_loss.js) and its parameterized templates in [scripts/generators/profit_loss_hard.js](scripts/generators/profit_loss_hard.js). Startup tops up a separate pool of at least 100 validated questions through [scripts/seedProfitLossHard.js](scripts/seedProfitLossHard.js). These generated questions are always `ORIGINAL_PRACTICE`; the official Clerkship syllabus URL is recorded as pattern context, not as evidence that an item appeared in an exam. The Hard quiz uses a 2/5/3 difficulty mix (difficulty 3/4/5), at least seven patterns, at most two questions per pattern, and recent-pattern/fingerprint exclusions. Run `node --test test/profitLossHard.test.js test/learn.test.js` to validate the bank and selection rules.

How it connects to the app:

- **Topic codes:** generator topic codes are mapped onto catalogue codes by [src/services/taxonomy.js](src/services/taxonomy.js) (`speed_distance` → `time_speed_distance`, `prepositions` → `grammar/prepositions`, …), so every question shows up in the funnel. Each run also moves questions stored by earlier runs under the old codes. Nothing is deleted.
- **New generator topics:** `test/generators.test.js` fails if a generator produces a topic that is not in `db/seed/catalog.js`. Add the topic to the catalogue, or add an alias in `taxonomy.js`.
- **PYQ tags:** no PYQ tags by default. Generated questions never appeared in a real paper, and the app shows any PYQ ref as a "PYQ · SSC CGL 2019" badge. `--untag-synthetic-pyq` removes such tags from questions already in the database. The questions stay.
- **Question provenance:** `provenance` distinguishes `OFFICIAL_VERIFIED`, `ADAPTED_PYQ`, `ORIGINAL_PRACTICE`, and `UNCLASSIFIED`. Official counts require a non-synthetic PYQ reference with both paper and answer-key URLs on a configured commission domain. Existing records can be safely classified where evidence is reliable with `npm run db:question-provenance`; uncertain legacy rows remain `UNCLASSIFIED` for editorial review.
- **`--reset`:** deletes generated questions (`authored_by: seed_generator`). Only use it when you mean to.

### Seeding and importing questions

`npm run db:seed` does three things:

- **Catalog.** Upserts the four exam categories (SSC, Banking, WBPSC, WB Post Office) with their exams, subjects and topics from [db/seed/catalog.js](db/seed/catalog.js).
- **Exam details.** Exam patterns, past exam dates, vacancies and source links come from [db/seed/exams.js](db/seed/exams.js), and the "About the exam" panel shows them. Every figure there was read from an official notice, result write-up or calendar, and its URL sits next to it. Figures found only on coaching sites were left out.
- **Concept sheets.** Inserts the "how to solve" sheets for all 32 topics from [db/seed/topic-summaries/](db/seed/topic-summaries/). A topic that already has a sheet in the database is skipped unless you pass `--overwrite-summaries`. To check the sheets, run `node db/seed/topic-summaries/validate.js db/seed/topic-summaries/*.js`; it checks the minimum counts, KaTeX and Bengali script.

It then imports question files in the authoring format of `pyq-sample-25.json`:

```
node --env-file-if-exists=.env scripts/seed.js --dry-run                  # validate only, no DB writes
node --env-file-if-exists=.env scripts/seed.js --status IN_REVIEW more.json
```

The importer ([src/services/importers/examStyleJson.js](src/services/importers/examStyleJson.js)) works like this:

- **Taxonomy mapping:** category, subject and topic names map through explicit tables (`SSC_CGL` → SSC Tier 1, `Mathematics` → `quant`, `Prepositions` → `grammar/prepositions`, …). An unknown name is reported as an error, never guessed.
- **Explanation split:** each explanation becomes aligned EN/BN steps (one per sentence), plus a shortcut ("10-second shortcut:" / "শর্টকাট:") and a trap note ("Trap:" / "ভুল ফাঁদ:"). If the two languages have different sentence counts, the explanation stays one step, so steps never mismatch.
- **Not tagged as PYQs:** `previous_year_reference` values that say "pattern (exam-style, not verbatim)" are not real previous-year questions. They are imported without PYQ tags, so they never show a PYQ badge or count.
- **Idempotent:** each question's code is a hash of its English stem, so re-running updates rather than duplicates.

### Admin bulk question upload

Admins can open **Admin → Bulk upload** to import question rows from an `.xlsx` workbook or UTF-8 `.csv`.
Download either template from the page (or use `GET /api/v1/admin/import/template.xlsx` and
`GET /api/v1/admin/import/template.csv`). The Excel workbook contains `Questions` and `Instructions`
sheets; for CSV, use the first row as the column-header row.

The required columns are `question_text`, `question_type`, `option_a`, `option_b`, `option_c`,
`correct_answer`, and `difficulty`. The templates include the complete supported column list:

- `question_text`, `question_text_bn`, `question_text_hi`
- `question_type` (MCQ only)
- `option_a`–`option_d`, with optional `_bn` and `_hi` translations for each option
- `correct_answer` (`A`, `B`, `C`, or `D`), `explanation`, `explanation_bn`, `explanation_hi`
- `subject`, `topic`, optional `subtopic`, and `exam_name`
- `difficulty` (`Easy`, `Medium`, `Hard`, or 1–5), and `language`
- `source` and `source_year` (metadata only; these do not verify or assign a PYQ tag)

Select the category and exam before uploading. Subject/topic selectors provide row defaults; row values
must still resolve to the selected category's configured taxonomy. The importer never creates taxonomy
records. The current question schema does not store per-question marks or negative marks, so mock scoring
continues to use the configured exam pattern.

The workflow is preview first, then explicit confirmation. Existing questions are checked globally across
categories, subjects, and topics using indexed, language-specific normalized question keys. The bounded
text-index search also finds likely wording matches without loading the question bank into application
memory. Options and the correct option are compared for exact matches and answer conflicts. The preview
lists the existing question ID, code, taxonomy, status, and reason for each match:

- `NEW` rows are imported as drafts by default.
- `EXACT DUPLICATE` rows are not imported and show the existing database ID.
- `POSSIBLE DUPLICATE` and `ANSWER CONFLICT` rows require an explicit per-row choice to import as a
  separate draft or skip. Existing records are never changed.
- `INVALID` rows show validation errors and are not imported.

Confirmed imports remain drafts until an administrator explicitly selects **Review & publish** for that
batch in import history. Publishing affects only draft questions created by that admin-owned batch,
records the reviewing admin, assigns matching question patterns, and refreshes catalog counts. Published
questions then appear in exam topic counts and practice.

The admin can revisit recent import history and download a CSV error report. Preview batches are private
to their creating admin and expire after 24 hours; completed confirms are safe to retry. Each database
question receives language-specific duplicate keys. After deploying the index changes, backfill the
existing question collection before enabling upload:

```
npm run db:indexes
npm run db:duplicate-keys
```

The backfill streams questions in batches, adds only duplicate-key metadata, and is safe to rerun. Preview
returns a service-unavailable error until the migration completes, rather than reporting false `NEW`
results. The question schema maintains keys for subsequently authored/imported questions.

Uploads are limited to 2 MB and 500 question rows. Only plain-text cell values are imported; spreadsheet
formulas, macro-enabled workbooks, unsupported headers, invalid language/option combinations, and unknown
taxonomy values are rejected or reported per row. The indexed question text is Unicode NFC normalized;
line breaks and whitespace are standardized without discarding Bengali characters, numbers, or math
operators. Import fingerprints and the unique fingerprint index prevent repeated/concurrent insertion of
the same question content.

The admin Excel template includes `Taxonomy` and `Exams` sheets generated from the active database
catalog. Use the codes from those sheets in upload files; the admin page also provides a downloadable
catalog CSV containing category, subject, topic, subtopic, and exam mappings.

## Layout

```
src/
  models/          Question, TopicSummary, ExamCategory, MockSession (+ localized sub-schema, enums)
  validators/      Zod request schemas
  middleware/      validate, auth, rate limiters, error handler
  services/        practice, mock, mock generation pipeline, scoring (pure), stats buffer, presenters
  controllers/     thin HTTP adapters
  routes/          /api/v1/practice, /api/v1/mock
db/
  indexes.mongo.js         createIndex commands (source of truth in production)
  seed/sample-question.json  bilingual Profit & Loss question (Extended JSON, mongoimport-ready)
```

## Learn section (Math and English)

The site opens on Math and English. Each chapter has a lesson and quizzes at three levels.

- **Lessons** are in `db/lessons/<subject>/<topic>.js`, one file per chapter. Each one goes Basic → Intermediate → Advanced, with worked examples, formulas or rules, and tips, in both English and Bengali. Lessons ship with the code, so there is nothing to seed. Run `node db/lessons/validate.js` to check them; `test/lessons.test.js` fails if a chapter has no lesson.
- **Quiz levels** come from question difficulty: Beginner is 1–2, Intermediate is 3 and Advanced is 4–5. Beginner and Intermediate have no timer; Advanced allows 60 s per question. If a level has fewer than 20 questions, it also uses the next easier difficulty, and the level and quiz report `borrowed: true` so the student is told. Only questions with both English and Bengali text are served.
- **Hard banks (Advanced).** Profit & Loss, Percentage, Ratio & Proportion, Average, Interest and Time & Work serve Advanced only from a dedicated bank ([src/services/hardBanks.js](src/services/hardBanks.js)) and never borrow easier questions; if a bank is empty the quiz returns 422 `HARD_POOL_NOT_READY`. Each Advanced quiz has 10 questions at difficulty 3/4/5 in a 2/5/3 mix, at least 7 patterns, at most 2 per pattern, and a different framing (`pattern_variant`) for a pattern's second question when one exists. Bank questions never appear at Beginner or Intermediate.
  - **Pattern matrices** live in `db/patterns/quant/hard/<topic>.js` (10–11 patterns per chapter, each with 2 framings, the skills it tests, why it is hard, and whether it is inside the WBPSC Clerkship Part-I syllabus). Per the Clerkship 2024 scheme, Time & Work and compound interest are marked outside it; quiz questions carry `inClerkshipSyllabus` and the app shows a badge.
  - **Generators** (`scripts/generators/hard/<topic>.js`) choose numbers so every answer is exact, build four options from real mistakes (each with a bilingual trap note), and write steps with exact numbers (terminating decimals or fractions, never a rounded value).
  - **Independent solvers** (`scripts/generators/hard/solvers/`) re-derive every answer by search or simulation from the numbers shown in the stem; [test/hardBanks.test.js](test/hardBanks.test.js) requires agreement on 300 questions per chapter, and also rejects ambiguous questions (more than one valid answer).
  - **Seeding:** startup tops each of the five banks up to 200 questions ([scripts/seedHardBanks.js](scripts/seedHardBanks.js), `npm run db:hard-banks`, `-- --dry-run` to validate without writing). All are `ORIGINAL_PRACTICE`; none is labelled a previous-year question.
- **Repeat attempts get new questions.** The client sends the question ids it has already seen (`exclude`). Once a level runs out of unseen questions, the cycle starts again and the response has `restarted: true`.

| Method | Path | Notes |
|---|---|---|
| GET | `/api/v1/learn/subjects` | Math (`quant`) and English, with chapter and question counts. |
| GET | `/api/v1/learn/subjects/:subject` | Chapters with title, emoji, intro, and pool size per level. |
| GET | `/api/v1/learn/subjects/:subject/chapters/:topic` | The lesson, the levels, and the previous and next chapter. |
| POST | `/api/v1/learn/quiz` | `{ subject, topic, level, exclude? }` returns 10 random questions with no answers, options shuffled, plus `timed`, `timeLimitSec` and a signed `quizToken` (valid 6 h) listing the quiz's question ids. |
| POST | `/api/v1/learn/quiz/check` | `{ subject, topic, quizToken, answers: [{ questionId, selectedOptionId \| null, timeSpentSec? }] }` returns, per question, `isCorrect`, `correctOptionId`, steps, shortcut and trap note, plus the score. Only questions listed in that quiz's token are marked (otherwise 403 `QUIZ_TOKEN_INVALID` / `QUESTION_NOT_IN_QUIZ`), so this endpoint cannot be used to look up arbitrary answers. Signed-in answers count towards "My performance". |

## Revision queue and mistake notebook

A signed-in student's wrong answers in practice, Learn Basics quizzes and mock tests, plus their bookmarks, go into `review_items` (one row per student and question). Each question comes back the next day. A right answer pushes the next review further out (1 → 3 → 7 → 21 days), and 2 right in a row retire it as mastered. A wrong answer starts it over. A new mistake brings a mastered question back. Un-bookmarking removes a question from the queue unless it was also a mistake. The frontend has three pages for this: `/revise` (today's session), `/mistakes` (the notebook) and a "Revise today" card on the home page.

## Question patterns per question (weakness by pattern)

Each bank question carries `pattern`, a key from its chapter's pattern file. Rules in `db/patterns/match/<subject>.js` decide it: a generator subtopic first, otherwise a regex on the English stem. Startup re-tags the bank whenever the rules or the question count change. Questions that fit no pattern stay untagged and still count for their chapter. To see coverage and untagged samples, run `node --env-file-if-exists=.env scripts/patternCoverage.js`; add `--write` to tag. The practice stream accepts `pattern=` (used by "Practise 10" on My performance). Coverage today: most Math and Reasoning chapters are 77–100% (number system, algebra and time & work are lower); English and GS are 1–100% because many bank questions are of types no pattern describes yet. Adding patterns for those types is the way to raise it.

**Streak protection:** every 7 active days in a row earn a freeze (2 at most), and a missed day uses one instead of breaking the streak. It is worked out from the activity history (`streakWithFreezes`), so nothing is stored.

## Question patterns (study page)

Each exam chapter has 3–6 **question patterns**, in `db/patterns/<subject>/<topic>.js`. A pattern is one common way the chapter is asked in exams. Each one has:

- its name;
- how to spot it in a question;
- a short method;
- a worked example with steps;
- a "your turn" question with 4 options, the correct index and an explanation.

Everything is in English and Bengali. The study page shows them between the formulas and the practice questions. Current Affairs has none on purpose.

- `GET /api/v1/practice/patterns?subject&topic` returns `{ patterns }`. A chapter with no patterns yet returns an empty list. These answers are learning content and are public; the question bank's answers stay behind `verify-answer`.
- Run `node db/patterns/validate.js` to check every file. `test/patterns.test.js` fails if a chapter has no patterns or a file is invalid.

## API

All responses are `{ success: true, data }` or `{ success: false, error: { code, message, details? } }`.

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/api/v1/practice/topic-view?category&subject&topic&language&page&limit` | optional | `language`: `en`, `bn`, `hi` (also accepts `english`, `bengali`, `hindi`). Topic sheet comes back in one language (falls back to English); questions carry every available language so the client can switch without a round trip. |
| POST | `/api/v1/practice/verify-answer` | optional | `{ questionId, selectedOptionId, timeSpentSec? }` → `isCorrect`, `correctOptionId`, steps per language, shortcut, trap note for the chosen wrong option, `stats.percentCorrect`. `percentCorrect` stays `null` until a question has 30 attempts. |
| GET | `/api/v1/catalog/categories?language` | optional | Step 1 of the funnel: categories with exams and question counts. |
| GET | `/api/v1/catalog/categories/:category?language` | optional | Step 2: subjects with question, PYQ and topic counts. Counts include only questions fully available in `language`. |
| GET | `/api/v1/catalog/categories/:category/subjects/:subject?language` | optional | Step 3: topics and subtopics with published-question and provenance counts, difficulty (`EASY`/`MODERATE`/`HARD` from the average), syllabus verification status, and `hasSummary`. `pyqCount` remains as a compatibility alias for `verifiedPyqCount`. WBPSC counts are category-wide; WBCS and other WBPSC PYQs are separately counted from verified source references, never inferred from a WBPSC-wide question total. A question is counted once per topic/subtopic even when it has multiple matching references. Counts are cached for 5 minutes per category and language. |
| GET | `/api/v1/practice/topic-summary?category&subject&topic` | optional | Topic sheet with every language, plus localized breadcrumb names, for on-device language switching. |
| GET | `/api/v1/practice/questions?category&subject&topic&language&cursor&limit` | optional | Practice Arena feed, keyset-paginated over the practice order. Returns `{ questions, nextCursor, hasMore }`, and a `bookmarked` flag per question when signed in. Questions published mid-session don't cause repeats or gaps. |
| PUT / DELETE | `/api/v1/practice/bookmarks/:questionId` | required | Bookmark for revision. Idempotent. |
| GET | `/api/v1/practice/bookmarks?subject&topic&offset&limit` | required | The revision list (frontend `/revision`): bookmarked questions, newest first, without answers, plus `groups` (count per chapter, with names) for filters. `offset` rather than a page number, because the client removes learnt questions as it goes. Answers are checked with `verify-answer`. |
| GET | `/api/v1/me/insights?tz` | required | Returns `mastery` (every chapter as `not_started`, `started`, `weak`, `improving` or `strong`, from its last 30 answers in practice, quizzes, revision and mock tests, with harder questions counted separately), `weakPatterns` (patterns well below their chapter), `badges` (earned once, kept), `streak` (`days`, `freezes`, `protectedDays`) and `today.answered`. |
| GET / PUT | `/api/v1/me/leaderboard` | required | Weekly correct answers. Only opted-in students are listed, shown as "First L." `PUT { optIn }` turns it on or off (off by default). |
| GET | `/api/v1/challenge/today?tz` | optional | Daily challenge: the same 5 mixed questions for everyone that day, one each from Math, Reasoning, English, GS and Current Affairs, without answers. Includes `done` when a signed-in student has already played. |
| POST | `/api/v1/challenge/today` | optional | `{ tz, answers }`. Returns results with explanations. A signed-in student's first attempt of the day is saved; later ones return `firstAttempt: false`. |
| GET | `/api/v1/review/summary?tz` | required | Revision queue counts: `dueToday` (due before the end of the student's day; `tz` = minutes east of UTC), `active`, `mastered`, `mistakesActive`, `nextDueAt`. |
| GET | `/api/v1/review/due?tz&limit` | required | Today's revision: due questions without answers, each with `reason` (mistake / bookmark / both), `streak` and `wrongCount`. |
| POST | `/api/v1/review/answer` | required | `{ questionId, selectedOptionId, timeSpentSec? }`. Marks the answer and reschedules the question. Right: the next review comes after 1, 3, 7 or 21 days, and 2 right in a row means mastered. Wrong: back to the start, due tomorrow. Returns the answer, the explanation and `review: { status, streak, nextDueAt }`. |
| GET | `/api/v1/review/mistakes?status&subject&topic&offset&limit` | required | Mistake notebook. `status` is `active` (still wrong), `mastered` (fixed) or `all`. Each item has the student's last wrong option, the correct option, explanation steps and where the mistake was made (practice, learn, mock or review). Includes per-chapter `groups` and `counts`. |
| POST | `/api/v1/practice/report-error` | optional | `{ questionId, reason, message?, language? }`. `reason` is `WRONG_ANSWER`, `WRONG_EXPLANATION`, `TRANSLATION`, `TYPO`, `UNCLEAR` or `OTHER`. A repeat from the same signed-in user returns `duplicate: true`. Limited to 10 per 10 minutes. |
| POST | `/api/v1/mock/create-session` | required | Payload as specified, plus optional `language` and `examCode` (e.g. `WBPSC_CLERKSHIP`). `questionCount`: 10, 20, 25, 50 or 100. Per-question mode: `perQuestionTimer: true` + `perQuestionSeconds` (10–600); `timeLimitMinutes` is then derived. `topicIds` are topic slugs (`profit_loss`). **Marks are decided by the server** ([src/services/markingScheme.js](src/services/markingScheme.js)) from the official pattern in `db/seed/exams.js`; a client `markingScheme` is ignored. `config.markingScheme.basis` is `OFFICIAL`, `OFFICIAL_NO_NEGATIVE` (the notice confirms negative marking but not the amount, so none is deducted) or `PRACTICE` (no verified pattern: +1, no negative). An `examCode` outside the category, or without that subject, is a 422. Returns questions without answers. Each `questionId` is a **per-session alias**, not the real question id, so nothing shown mid-test can be sent to `verify-answer` or a quiz check; results and analytics after submission use real ids. |
| POST | `/api/v1/mock/submit-session` | required | `{ sessionId, responses: [{ questionId, selectedOptionId \| null, timeSpentSec }] }`. Idempotent: a retried submit returns the stored result. |
| GET | `/api/v1/mock/session/:sessionId/analytics` | required | Result dashboard data, for **submitted** sessions only (409 before, so answers never leak mid-test). Returns:<br>• the result;<br>• a per-question review: question, options, your answer, the correct answer, time against target, marks lost, the marked-for-review flag, and EN/BN steps, shortcut and traps;<br>• a topic breakdown sorted by marks lost;<br>• `peers`: percentile and rank among submitted tests with the same category, subject and length, shown only once at least 5 such tests exist;<br>• `cutoffs`: official cut-offs from `exam_cutoffs`, each with its `source_url`. |
| GET | `/api/v1/mock/session/:sessionId` | required | Resume an active session or fetch a finished result. |

| POST | `/api/v1/auth/register` | — | `{ name, email, password }` (password ≥ 8). Sets the session cookie and returns `{ user, token }`. 409 `EMAIL_TAKEN`. Limited to 10 per 15 minutes per IP. |
| POST | `/api/v1/auth/login` | — | `{ email, password }`. 401 `INVALID_CREDENTIALS`, with the same message whether or not the email exists. Limited to 10 per 15 minutes per IP and email. |
| POST | `/api/v1/auth/logout` | — | Clears the session cookie. |
| GET | `/api/v1/auth/me` | optional | `{ user }`, or `{ user: null }` when signed out. |
| GET | `/api/v1/me/performance?tz` | required | "My performance". Returns practice accuracy by subject, the 5 weakest topics (each with at least 5 answers), mock history and score trend, answers today, and the day streak. `tz` is minutes east of UTC (India: 330). |

### Accounts

Passwords are hashed with scrypt ([src/services/auth.service.js](src/services/auth.service.js)). The session is an HS256 token, kept in an httpOnly `edtech_session` cookie (30 days, `AUTH_SESSION_DAYS`). Non-browser clients can send the token as `Authorization: Bearer <token>`.

- Set `AUTH_SECRET` to at least 32 random characters. Production refuses to start without it; generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`.
- The cookie is `Secure` whenever the request came over HTTPS. Behind a proxy that needs `TRUST_PROXY_HOPS`.
- Signed-in practice answers are stored in `practice_attempts`; mock results are already per user. Anonymous practice still works, but it isn't tracked.
- `NODE_ENV` must be `development`, `test` or `production`. A missing value counts as production; any other value stops startup, as does a missing or short `AUTH_SECRET` outside development/test.
- An `x-user-id` header is accepted as the signed-in user **only** when `NODE_ENV` is `development` or `test` **and** `ALLOW_DEV_USER_HEADER=true` ([src/middleware/auth.js](src/middleware/auth.js)). `npm test` sets both through [test/test.env](test/test.env).
- `users.uniq_mobile` (unique mobile, partial on string values) is in `db/indexes.mongo.js`. Before deploying to an existing database, run `npm run db:check-mobile-index`: it lists numbers shared by several accounts (masked) and changes nothing. With no duplicates, `npm run db:check-mobile-index -- --create` builds the index. If duplicates exist, the startup index step logs and skips just this index; resolve those accounts by hand first.

## Design decisions

**Languages in one document.** Every text field is `{ en, bn, hi }`. A language is
available for a question only if the stem *and every option* have it. The
availability is stored as a scalar `lang_set` (`"bn_en"`), not an array, because
the main compound index already holds the array `exam_targets.category`, and
MongoDB cannot index two arrays in one compound index. Queries use
`lang_set: { $in: langSetsContaining('bn') }`. All text is NFC-normalised on write
because Bengali has multiple encodings for the same glyph.

**Answers are `select: false`.** `correct_option_id` and `solution` are excluded
unless a query explicitly opts in. Responses go through whitelisting presenters,
and the tests assert that no answer field appears in practice or mock payloads.

**One hot index.** `qb_cat_subj_topic_lang_diff` (partial on `PUBLISHED`) serves:
- the practice filter, plus its sort (`difficulty, latest_pyq_year desc, _id`) via SORT_MERGE, with no in-memory sort;
- the mock generation `$match`.

The test suite checks both plans.

**Mock generation** ([src/services/mockGenerator.pipeline.js](src/services/mockGenerator.pipeline.js)).
It takes one aggregation round trip:
1. `$match` on the index, then `$project` down to 4 fields.
2. `$facet` with one branch per difficulty band. Each branch runs a bounded `$sample`, then Efraimidis–Spirakis weighted sampling (`key = rand^(1/w)`). The weight `w` favours PYQs, most of all recent ones: a current-year PYQ is about 3.5× as likely as a non-PYQ, decaying over 10 years.
3. Quotas are 30/50/20 by largest remainder (10 → 3/5/2, 20 → 6/10/4, 50 → 15/25/10).

If a band runs short, the nearest band fills the gap. Questions from the user's
last 5 sessions are excluded, unless the pool is too small for that. The chosen
questions and their answer key are frozen into the session, so submitting takes
a single document read.

**Scoring** ([src/services/scoring.js](src/services/scoring.js)) is pure and unit-tested.
Client-reported times are not trusted:
- With the per-question timer on, an answer past the limit becomes `TIMED_OUT` and earns 0 marks.
- In non-pausable sessions, if the total claimed time exceeds real elapsed time, all times are scaled down (`timeAdjusted: true`).

A topic counts as a strength at ≥75% accuracy and a weakness below 50% accuracy
or under 50% attempt rate, each needing at least 2 questions.

**Difficulty stats** are batched in memory and flushed every 5 s with one
unordered `bulkWrite` of `$inc`. This avoids write hotspots on popular questions.
It is safe across instances; a crash loses at most one interval of counts.

## Vocabulary Bank (শব্দভাণ্ডার) content

The bank lives in `db/vocabulary/*.jsonl`, one file per main category; the categories are listed in `db/vocabulary/categories.js`. Startup loads it idempotently through [scripts/seedVocabularyBank.js](scripts/seedVocabularyBank.js). You can also run it by hand: `npm run db:vocabulary-bank` to load, or add `-- --dry-run` to check without writing.

- **Format.** Same JSONL as an admin import, plus:
  - `nearSynonyms`: similar meaning, but not interchangeable everywhere.
  - `forms`: inflected forms the example may use, e.g. "gave up".
  - `confusables`: `{ word, noteEn, noteBn }`, each pointing to another entry.
  - `antonyms` is optional; never force one.
- **Validation** (whole bank, nothing loads if any rule fails):
  - duplicate words;
  - self-referential or conflicting relations;
  - Bengali script required in Bengali fields, English only in English fields;
  - the example must contain the word or a listed form;
  - difficulty values must be valid;
  - unknown categories;
  - confusables that point to no entry;
  - `PYQ_VERIFIED` only with an official paper URL, year and question code.
- **Lexical checks** (`npm run vocab:check`, development only). WordNet 3.1 and CMUdict, both devDependencies, write `db/vocabulary/lexicon-checks.json`. A test fails if that file is stale.
  - Entries whose word or part of speech is not in WordNet are kept as DRAFT. Prepositions are the exception, because WordNet has none.
  - Relations WordNet cannot confirm are shown to students but never used as test answer keys.
  - Pronunciations are IPA derived from CMUdict, or none at all; they are never guessed.
  - Licences and attribution: [db/vocabulary/ATTRIBUTION.md](db/vocabulary/ATTRIBUTION.md).
- **Bengali review.** Every Bengali meaning starts `bengali_review.status: PENDING`, and students see "Bengali meaning pending review".
  - Admins use **Admin → Bengali review** (`GET /api/v1/admin/vocabulary/bengali-review`). It sorts official exam words first, then commonly tested and frequent words.
  - They can correct the meaning, explanation, definition and examples (`PATCH /admin/vocabulary/words/:id/content`, with `markReviewed`) or just mark a word reviewed (`PUT /admin/vocabulary/words/:id/bengali-review`).
  - The reviewer and date are recorded. Every edit is kept in `edit_history` (who, when, old and new value).
  - Changing reviewed Bengali text without re-reviewing it returns the word to PENDING.
  - Re-seeding never overwrites an admin-edited or reviewed word.

## Vocabulary Mastery

Vocabulary cards are stored separately from the MCQ `questions` collection, so
existing question IDs, topics, and PYQ counts are unchanged. Public endpoints
serve only `PUBLISHED` cards. Account progress lives in `vocabulary_progress`,
`vocabulary_settings`, and daily activity collections. Practice answers remain
server-side in short-lived sessions and are returned only after an answer is
checked.

| Method | Path | Notes |
|---|---|---|
| GET | `/api/v1/vocabulary/words` | Search `q` (English/Bengali), `category`, `difficulty`, personal `status`, `offset`, `limit`. |
| GET | `/api/v1/vocabulary/word-of-day?tz=330` | Stable daily word for the supplied UTC offset. |
| POST | `/api/v1/vocabulary/practice/sessions` | Creates a server-keyed set for `meaning`, `synonym`, `antonym`, `fill_blank`, `context`, `identify`, or `match`. |
| POST | `/api/v1/vocabulary/practice/sessions/:token/answers` | Checks one displayed option and then returns the card explanation. |
| GET | `/api/v1/vocabulary/progress/summary` | Authenticated daily target, learned/review counts and overall progress. |
| PUT | `/api/v1/vocabulary/progress/settings` | Authenticated daily target (`10`, `15`, or `20`) and time zone. |
| PATCH | `/api/v1/vocabulary/progress/words/:wordId` | Authenticated `learned`, `difficult`, or `favourite` state. |
| GET | `/api/v1/vocabulary/progress/review?type=due\|missed` | Authenticated due or previously missed words. |
| POST | `/api/v1/vocabulary/progress/review` | `{ wordId, known }`; correct intervals are 1/3/7/14/30 days, misses return tomorrow. |

Vocabulary imports are UTF-8 JSONL: one complete learning card per line, with
`word`, `meaningBn`, `definitionEn`, `partOfSpeech`, `synonyms`, `antonyms`,
`exampleEn`, `exampleBn`, `difficulty`, `categories`, and optional
`examRelevance`, `sources`, `collocations`, and `pronunciation`. Admins can
`POST` multipart field `file` to `/api/v1/admin/vocabulary/import/preview`,
then to `/import/commit`. Commit rejects the whole upload on invalid fields or
duplicates and stores entries as drafts. Review drafts at
`GET /api/v1/admin/vocabulary/drafts`; publish only after editorial review with
`PATCH /api/v1/admin/vocabulary/words/:wordId/status` and
`{ "status": "PUBLISHED" }`. `PYQ_VERIFIED` requires a year, question code,
exam name, and HTTPS source hosted on a configured official commission domain.
Unsourced entries remain visibly unverified and general practice.

The starter set is intentionally small and unverified; it makes no claim that
its words appeared in WBPSC/WBCS papers. To inspect the import without changes,
run `npm run db:seed-vocabulary`. Applying it inserts the 12 starter cards as
drafts (not public content): `npm run db:seed-vocabulary -- --apply`. Before
deploying the new collections, run `npm run db:indexes`. The index update is
additive; no existing collection is rewritten.

## Production notes

- Rate limiters use the in-process MemoryStore. Behind a load balancer with several instances, give each limiter a shared store (`rate-limit-redis`).
- Set `TRUST_PROXY_HOPS` to the real number of proxies, or IP-based limits will key on the proxy.
- Practice retries count towards `stats`. If you want first-attempt-only difficulty, track per-user attempts and only record the first.
- The PYQ reference in `db/seed/sample-question.json` (exam, date, question code) is illustrative. Replace it with real provenance before seeding production.
- Pausable sessions (`allowPause: true`) can't be bounded by wall-clock time server-side. They expire after `MOCK_PAUSABLE_TTL_HOURS`, and total time is capped at the time limit.
