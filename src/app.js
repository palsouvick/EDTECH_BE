'use strict';

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');
const config = require('./config');
const apiRoutes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const { getQuestionBankMemory } = require('./services/questionBankStatus.service');

function createApp() {
  const app = express();

  app.set('trust proxy', config.trustProxy);
  app.disable('x-powered-by');

  app.use(helmet());
  // A 50-question bilingual mock is ~60-90 KB of JSON; gzip cuts it ~5x for mobile users.
  app.use(compression({ threshold: 1024 }));
  // GK bulk import (admin only, checked by requireAdmin before use) carries up to 500 facts.
  app.use('/api/v1/admin/gk/import', express.json({ limit: '2mb' }));
  app.use(express.json({ limit: '100kb' }));

  app.get('/healthz', (_req, res) => {
    const up = mongoose.connection.readyState === 1;
    // The question bank reports its own state alongside the app's: a bank that
    // is still initializing on a fresh deploy must NOT fail the health check
    // (the app serves normally while it fills), but the state is visible.
    // Served from the in-memory mirror — no database query on the health path.
    const bank = getQuestionBankMemory();
    res.status(up ? 200 : 503).json({
      status: up ? 'ok' : 'degraded',
      questionBank: {
        status: bank.status,
        version: bank.version,
        is_initialized: Boolean(bank.last_completed_at) || (bank.total_questions ?? 0) > 0,
      },
    });
  });

  app.use('/api/v1', apiRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
