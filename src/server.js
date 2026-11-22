'use strict';

const mongoose = require('mongoose');
const config = require('./config');
const { connectWithRetry, disconnect } = require('./db/connection');
const { createApp } = require('./app');
const { ensureAdmin } = require('./services/adminBootstrap');
const { bootstrapData, startQuestionBankSeed } = require('./db/bootstrap');
const { ensureIndexes } = require('./db/ensureIndexes');
const { refreshQuestionBankMemory } = require('./services/questionBankStatus.service');
const statsBuffer = require('./services/questionStats.buffer');

const int = (v, d) => (v === undefined || v === '' ? d : Number.parseInt(v, 10));

// Node closes an idle keep-alive socket after 5 s by default. A reverse proxy
// (Render, Netlify, a load balancer) keeps its upstream sockets open longer and
// may send the next request down a socket Node has just closed: the client
// then sees a random 502 from an otherwise healthy server. Keeping Node's
// timeout above the proxy's idle timeout removes that race.
const KEEP_ALIVE_TIMEOUT_MS = int(process.env.KEEP_ALIVE_TIMEOUT_MS, 65_000);

// A crash is the one valid reason for a restart, so it must be explained in the
// logs. An unhandled promise rejection, on the other hand, must not take the
// process down (Node's default since v15): it is logged and the server keeps serving.
process.on('unhandledRejection', (reason) => {
  console.error('[unhandledRejection] process keeps running:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('[fatal] uncaught exception; exiting so the platform restarts the service:', err);
  setTimeout(() => process.exit(1), 200).unref();
});

async function main() {
  // The port opens FIRST. The platform's health check and the proxy then see a
  // live server from the first second; while the database is still connecting,
  // /healthz reports "degraded" with HTTP 200 and the API answers 503 (app.js),
  // never a proxy 502 and never a restart.
  const server = createApp().listen(config.port, () => {
    console.log(`exam-engine listening on :${config.port} (${config.env})`);
  });
  server.keepAliveTimeout = KEEP_ALIVE_TIMEOUT_MS;
  server.headersTimeout = KEEP_ALIVE_TIMEOUT_MS + 1_000;

  const shutdown = async (signal) => {
    console.log(`${signal} received, draining`);
    server.close(async () => {
      await statsBuffer.stop(); // persist buffered attempt counts
      await disconnect();
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 15_000).unref();
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  // Keeps trying until the database answers; never exits the process.
  await connectWithRetry();

  // Indexes only, before data loads: cheap on an existing database, and it
  // keeps the first requests off unindexed collections. (bootstrapData repeats
  // this step later; it is idempotent.)
  if (config.seed.auto && !mongoose.connection.config.autoIndex) {
    await ensureIndexes(mongoose.connection, { log: console.log, warn: console.warn })
      .catch((e) => console.error('index setup failed', e));
  }
  // Load the durable question-bank state so /healthz reports the real status
  // (completed / initializing / not yet initialized). A single state read.
  await refreshQuestionBankMemory().catch(() => {});
  statsBuffer.start();

  // Everything else loads in the background, so a cold database can never keep
  // /healthz (or the API) waiting on data imports: reference data + dataset
  // first, then the admin account, then the background question-bank chain.
  (async () => {
    await bootstrapData().catch((e) => console.error('data bootstrap failed', e));
    await ensureAdmin().catch((e) => console.error('admin bootstrap failed', e.message));
    startQuestionBankSeed();
    // GK and book questions were stored answer-first; keep their correct options spread over A-D.
    require('./db/fixOptionOrder').fixOptionOrder().catch((e) => console.error('option order fix failed', e.message));
    // "My course": PDFs left queued or half-read by a restart carry on.
    require('./services/course.service').resumeQueue().catch((e) => console.error('course queue resume failed', e.message));
  })();
}

main().catch((err) => {
  // Only configuration can reach here (a missing AUTH_SECRET, an unknown NODE_ENV
  // or a port already in use): a restart cannot fix it, so say why clearly.
  console.error('[fatal] startup error (fix the configuration; restarting will not help):', err);
  process.exit(1);
});
