'use strict';

const config = require('../config');
const { Question } = require('../models');

/**
 * Per-question attempt counters, batched.
 *
 * A popular question can take hundreds of answers per second during an evening
 * peak. One $inc per answer would turn that document into a write hotspot
 * (document-level lock contention and oplog churn). Instead, deltas are held
 * in memory and flushed as one unordered bulkWrite every few seconds.
 *
 * $inc is commutative, so any number of app instances can flush independently.
 * The trade-off: a crash loses at most one interval of counts, which is fine
 * for a difficulty metric (not for anything billing- or rank-related).
 */
class QuestionStatsBuffer {
  constructor({ flushIntervalMs, maxBufferedQuestions }) {
    this.flushIntervalMs = flushIntervalMs;
    this.maxBufferedQuestions = maxBufferedQuestions;
    this.pending = new Map();
    this.timer = null;
    this.flushing = null;
  }

  record(questionId, { correct, timeSpentSec }) {
    const key = String(questionId);
    const entry = this.pending.get(key) || { attempts: 0, correct: 0, timeMs: 0 };
    entry.attempts += 1;
    entry.correct += correct ? 1 : 0;
    entry.timeMs += Math.round((timeSpentSec || 0) * 1000);
    this.pending.set(key, entry);

    if (this.pending.size >= this.maxBufferedQuestions) this.flush();
  }

  start() {
    if (this.timer) return;
    this.timer = setInterval(() => this.flush(), this.flushIntervalMs);
    this.timer.unref();
  }

  async flush() {
    if (this.flushing) return this.flushing;
    if (this.pending.size === 0) return;

    const batch = this.pending;
    this.pending = new Map();

    const ops = [...batch].map(([id, d]) => ({
      updateOne: {
        filter: { _id: id },
        update: {
          $inc: { 'stats.attempts': d.attempts, 'stats.correct': d.correct, 'stats.total_time_ms': d.timeMs },
        },
      },
    }));

    this.flushing = Question.bulkWrite(ops, { ordered: false })
      .catch((err) => {
        // Put the counts back so the next tick retries them.
        for (const [id, d] of batch) {
          const cur = this.pending.get(id) || { attempts: 0, correct: 0, timeMs: 0 };
          this.pending.set(id, {
            attempts: cur.attempts + d.attempts,
            correct: cur.correct + d.correct,
            timeMs: cur.timeMs + d.timeMs,
          });
        }
        console.error('[stats] flush failed, will retry:', err.message);
      })
      .finally(() => {
        this.flushing = null;
      });
    return this.flushing;
  }

  async stop() {
    clearInterval(this.timer);
    this.timer = null;
    await this.flushing;
    await this.flush();
  }
}

module.exports = new QuestionStatsBuffer(config.stats);
module.exports.QuestionStatsBuffer = QuestionStatsBuffer;
