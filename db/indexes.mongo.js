// Index build script for mongosh. Run at deploy time:
//   mongosh "$MONGODB_URI" db/indexes.mongo.js
//
// Mirrors the schema.index() declarations in src/models. The app runs with
// autoIndex:false in production, so this script is the source of truth there.
// createIndex is idempotent: re-running with the same spec is a no-op.
// On a live replica set, MongoDB 4.2+ builds indexes without blocking reads or writes.

// ---------------------------------------------------------------- questions
// Primary read path: practice topic-view and mock generation.
//  - every leading key is equality/$in (ESR rule), so bounds stay tight;
//  - lang_set is a scalar because exam_targets is already an array, and a
//    compound index cannot hold two arrays ("cannot index parallel arrays");
//  - difficulty, latest_pyq_year, _id give the practice sort without an in-memory SORT;
//  - partial on PUBLISHED keeps drafts out of the hot index (smaller, more of it stays in RAM).
//    Queries must include { status: "PUBLISHED" } to use it.
db.questions.createIndex(
  {
    "exam_targets.category": 1,
    subject: 1,
    topic: 1,
    lang_set: 1,
    difficulty: 1,
    latest_pyq_year: -1,
    _id: 1,
  },
  { name: "qb_cat_subj_topic_lang_diff", partialFilterExpression: { status: "PUBLISHED" } },
);

db.questions.createIndex({ code: 1 }, { name: "uniq_code", unique: true });

// A PYQ code identifies exactly one question across the bank.
db.questions.createIndex(
  { "pyq.refs.question_code": 1 },
  { name: "uniq_pyq_question_code", unique: true, partialFilterExpression: { "pyq.is_pyq": true } },
);

// "SSC CGL 2023, all shifts" PYQ paper browsing.
db.questions.createIndex(
  { "pyq.refs.exam_name": 1, "pyq.refs.year": -1, "pyq.refs.shift": 1 },
  { name: "pyq_exam_year_shift", partialFilterExpression: { "pyq.is_pyq": true } },
);

// Editorial CMS: review queues and topic listings across all statuses.
db.questions.createIndex(
  { status: 1, subject: 1, topic: 1, updated_at: -1 },
  { name: "cms_status_subject_topic" },
);

// Editor dedupe search. No Bengali/Hindi stemmer exists in MongoDB text search,
// hence default_language "none"; use Atlas Search with ICU analyzers for student-facing search.
db.questions.createIndex(
  { "stem.en": "text", "stem.bn": "text", "stem.hi": "text" },
  { name: "stem_text", default_language: "none", language_override: "text_lang" },
);

// ---------------------------------------------------------- topic_summaries
db.topic_summaries.createIndex({ slug: 1 }, { name: "uniq_slug", unique: true });
db.topic_summaries.createIndex(
  { subject: 1, topic: 1, subtopic: 1 },
  { name: "uniq_subject_topic_subtopic", unique: true },
);
db.topic_summaries.createIndex(
  { "syllabus_map.category": 1, "syllabus_map.tier": 1, subject: 1 },
  { name: "syllabus_category_tier_subject" },
);

// ---------------------------------------------------------- exam_categories
db.exam_categories.createIndex({ code: 1 }, { name: "uniq_code", unique: true });
db.exam_categories.createIndex({ "exams.code": 1 }, { name: "uniq_exam_code", unique: true });

// ------------------------------------------------------------ mock_sessions
// User history and the "exclude recently served questions" lookup.
db.mock_sessions.createIndex({ user_id: 1, created_at: -1 }, { name: "user_recent" });
// Sweeper for abandoned ACTIVE sessions.
db.mock_sessions.createIndex(
  { expires_at: 1 },
  { name: "active_expiry", partialFilterExpression: { status: "ACTIVE" } },
);

// ---------------------------------------------------------------- bookmarks
db.bookmarks.createIndex({ user_id: 1, question_id: 1 }, { name: "uniq_user_question", unique: true });
// Revision list per topic, newest first.
db.bookmarks.createIndex({ user_id: 1, subject: 1, topic: 1, created_at: -1 }, { name: "user_topic_recent" });

// --------------------------------------------------------- question_reports
db.question_reports.createIndex({ status: 1, question_id: 1, created_at: -1 }, { name: "triage_queue" });
// One open report per signed-in user, question and reason (anonymous reports are not deduplicated).
db.question_reports.createIndex(
  { question_id: 1, user_id: 1, reason: 1 },
  {
    name: "uniq_open_user_report",
    unique: true,
    partialFilterExpression: { status: "OPEN", user_id: { $type: "string" } },
  },
);

// Result dashboard: peer percentile among submitted tests of the same kind.
db.mock_sessions.createIndex(
  { "config.category": 1, "config.subject": 1, "config.question_count": 1, submitted_at: -1 },
  { name: "peer_cohort", partialFilterExpression: { status: "SUBMITTED" } },
);

// ------------------------------------------------------------- exam_cutoffs
db.exam_cutoffs.createIndex(
  { category: 1, exam_code: 1, stage: 1, year: -1, reservation: 1 },
  { name: "uniq_cutoff", unique: true },
);

// -------------------------------------------------------------------- users
db.users.createIndex({ email: 1 }, { name: "uniq_email", unique: true });

// --------------------------------------------------------- practice_attempts
// "My performance": per-user totals by topic, and recent activity for the streak.
db.practice_attempts.createIndex({ user_id: 1, created_at: -1 }, { name: "user_recent" });
db.practice_attempts.createIndex({ user_id: 1, subject: 1, topic: 1 }, { name: "user_topic" });

print("indexes ensured");
