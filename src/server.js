'use strict';

const config = require('./config');
const { connect, disconnect } = require('./db/connection');
const { createApp } = require('./app');
const { ensureAdmin } = require('./services/adminBootstrap');
const { bootstrapData, startQuestionBankSeed } = require('./db/bootstrap');
const statsBuffer = require('./services/questionStats.buffer');

async function main() {
  await connect();
  await bootstrapData().catch((e) => console.error('data bootstrap failed', e));
  await ensureAdmin().catch((e) => console.error('admin bootstrap failed', e.message));
  statsBuffer.start();

  const server = createApp().listen(config.port, () => {
    console.log(`exam-engine listening on :${config.port} (${config.env})`);
    startQuestionBankSeed();
  });

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
