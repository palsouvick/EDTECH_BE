'use strict';

const mongoose = require('mongoose');
const config = require('./config');
const { connect, disconnect } = require('./db/connection');
const { createApp } = require('./app');
const { ensureAdmin } = require('./services/adminBootstrap');
const { bootstrapData, startQuestionBankSeed } = require('./db/bootstrap');
const { ensureIndexes } = require('./db/ensureIndexes');
const { refreshQuestionBankMemory } = require('./services/questionBankStatus.service');
const statsBuffer = require('./services/questionStats.buffer');

async function main() {
  await connect();
  // Indexes only, before the port opens: cheap on an existing database, and it
  // keeps the first requests off unindexed collections. (bootstrapData repeats
  // this step later; it is idempotent.)
  if (config.seed.auto && !mongoose.connection.config.autoIndex) {
    await ensureIndexes(mongoose.connection, { log: console.log, warn: console.warn })
      .catch((e) => console.error('index setup failed', e));
  }
  // Load the durable question-bank state so /healthz reports the real status
  // (completed / initializing / not yet initialized) from the first request.
  // A single state read — cheap, unlike the data imports below.
  await refreshQuestionBankMemory().catch(() => {});

  const server = createApp().listen(config.port, () => {
    console.log(`exam-engine listening on :${config.port} (${config.env})`);
  });

  // Everything else loads in the background AFTER the port is open, so a cold
  // database can never keep /healthz (or the API) waiting on data imports:
  // reference data + dataset first, then the admin account, then the
  // background question-bank chain.
  (async () => {
    await bootstrapData().catch((e) => console.error('data bootstrap failed', e));
    await ensureAdmin().catch((e) => console.error('admin bootstrap failed', e.message));
    startQuestionBankSeed();
  })();
  statsBuffer.start();

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
}

main().catch((err) => {
  console.error('fatal startup error', err);
  process.exit(1);
});
