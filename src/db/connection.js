'use strict';

const mongoose = require('mongoose');
const config = require('../config');

mongoose.set('strictQuery', true);

const int = (v, d) => (v === undefined || v === '' ? d : Number.parseInt(v, 10));

const OPTIONS = Object.freeze({
  // Sized for many short reads; each request holds a connection for a few ms.
  maxPoolSize: 100,
  minPoolSize: 10,
  // How long the driver looks for a reachable server before an operation fails.
  // 5 s proved too short for a cold MongoDB Atlas cluster seen from a freshly
  // started instance, and a miss at start-up used to exit the process.
  serverSelectionTimeoutMS: int(process.env.DB_SERVER_SELECTION_MS, 20_000),
  socketTimeoutMS: int(process.env.DB_SOCKET_TIMEOUT_MS, 45_000),
  // In prod, indexes come from db/indexes.mongo.js only (run on startup by src/db/bootstrap.js),
  // never from the schema declarations.
  autoIndex: !config.isProd,
});

let logging = false;

/**
 * Logs every connection state change once, so the platform logs explain a
 * "degraded" health check or a burst of 503s (the driver reconnects on its own;
 * these lines only make that visible).
 */
function attachConnectionLogging(conn = mongoose.connection) {
  if (logging) return;
  logging = true;
  conn.on('connected', () => console.log('[db] connected'));
  conn.on('disconnected', () => console.warn('[db] disconnected (driver will reconnect)'));
  conn.on('reconnected', () => console.log('[db] reconnected'));
  conn.on('error', (e) => console.error('[db] error', e.message));
}

/** One connection attempt (scripts and tests). Rejects when no server is reachable. */
async function connect(uri = config.mongoUri) {
  attachConnectionLogging();
  await mongoose.connect(uri, OPTIONS);
  return mongoose.connection;
}

let retrying = false;

/**
 * Connects and keeps trying until it succeeds (exponential back-off, capped),
 * instead of exiting the process: on a hosted instance an exit means a restart,
 * and restarting does not make an unreachable database reachable. The HTTP
 * port is already open while this runs, so the health check stays green and
 * API calls get a clean 503 (see app.js) rather than a proxy 502.
 */
async function connectWithRetry(uri = config.mongoUri, { maxDelayMs = 30_000, log = console } = {}) {
  retrying = true;
  let attempt = 0;
  let delay = 1_000;
  while (retrying) {
    attempt += 1;
    try {
      await connect(uri);
      retrying = false;
      if (attempt > 1) log.log(`[db] connected after ${attempt} attempts`);
      return mongoose.connection;
    } catch (e) {
      log.error(`[db] connection attempt ${attempt} failed: ${e.message}; retrying in ${Math.round(delay / 1000)}s`);
      await new Promise((r) => setTimeout(r, delay));
      delay = Math.min(delay * 2, maxDelayMs);
    }
  }
  return mongoose.connection;
}

/** Stops a running connectWithRetry loop (shutdown). */
function stopRetrying() {
  retrying = false;
}

async function disconnect() {
  stopRetrying();
  await mongoose.disconnect();
}

module.exports = { connect, connectWithRetry, stopRetrying, disconnect, OPTIONS };
