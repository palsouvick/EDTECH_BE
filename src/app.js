'use strict';

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');
const config = require('./config');
const apiRoutes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const { getQuestionBankMemory } = require('./services/questionBankStatus.service');
const { requestScope } = require('./utils/requestScope');

const DB_STATES = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };

/**
 * While the database is not connected (start-up, or a dropped connection the
 * driver is restoring), API calls get an immediate, explicit 503 with
 * Retry-After instead of queueing inside Mongoose for 10 s and then failing
 * as a 500 — and the frontend knows it can simply retry.
 */
function requireDatabase(_req, res, next) {
  if (mongoose.connection.readyState === 1) return next();
  res.set('Retry-After', '5');
  res.status(503).json({
    success: false,
    error: { code: 'DB_UNAVAILABLE', message: 'The server is starting up. Please try again in a moment.' },
  });
}

function createApp() {
  const app = express();

  app.set('trust proxy', config.trustProxy);
  app.disable('x-powered-by');

  app.use(helmet());
  // A 50-question bilingual mock is ~60-90 KB of JSON; gzip cuts it ~5x for mobile users.
  app.use(compression({ threshold: 1024 }));
  // GK bulk import (admin only, checked by requireAdmin before use) carries up to 500 facts.
  app.use('/api/v1/admin/gk/import', express.json({ limit: '2mb' }));
  // Pasted mock papers (admin only) can exceed the default limit: a long paper
  // is well over 100kb of JSON. The Zod schema caps the pasted text itself.
  app.use('/api/v1/admin/mock-papers', express.json({ limit: '2mb' }));
  app.use(express.json({ limit: '100kb' }));

  // Liveness, not readiness: HTTP 200 whenever this process can answer at all.
  // The hosting platform restarts a service whose health check fails, and a
  // restart never helps a database that is unreachable or still connecting —
  // it only adds a cold start and a burst of 502s. So the database state is
  // reported in the body ("degraded"), never as a failing status code. The
  // question bank likewise reports its own state: a bank still initializing on
  // a fresh deploy must not fail the check. Served from memory, no DB query.
  app.get('/healthz', (_req, res) => {
    const up = mongoose.connection.readyState === 1;
    const bank = getQuestionBankMemory();
    res.status(200).json({
      status: up ? 'ok' : 'degraded',
      db: DB_STATES[mongoose.connection.readyState] || 'unknown',
      uptime_s: Math.round(process.uptime()),
      questionBank: {
        status: bank.status,
        version: bank.version,
        is_initialized: Boolean(bank.last_completed_at) || (bank.total_questions ?? 0) > 0,
      },
    });
  });

  // requestScope comes after the body parsers: they finish on stream events,
  // which would not carry the request's async context into the handlers.
  app.use('/api/v1', requireDatabase, requestScope, apiRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
