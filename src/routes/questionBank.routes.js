'use strict';

const { Router } = require('express');
const { readQuestionBankState, presentPublicStatus } = require('../services/questionBankStatus.service');

/**
 * Public, read-only question-bank status. Deliberately minimal — status,
 * dataset version, total and when the last sync completed — so a client can
 * show "question bank is warming up" on a fresh deploy. Nothing about the
 * database, fingerprints, errors or run internals is exposed here; the full
 * detail lives behind the admin gate (see admin.routes.js).
 */
const router = Router();

router.get('/status', async (_req, res) => {
  const state = await readQuestionBankState();
  res.json({ success: true, data: presentPublicStatus(state) });
});

module.exports = router;
