'use strict';

const mockService = require('../services/mock.service');
const mockAnalytics = require('../services/mockAnalytics.service');

async function createSession(req, res) {
  const data = await mockService.createSession(req.user.id, req.valid.body);
  res.set('Cache-Control', 'no-store');
  res.status(201).json({ success: true, data });
}

async function submitSession(req, res) {
  const data = await mockService.submitSession(req.user.id, req.valid.body);
  res.set('Cache-Control', 'no-store');
  res.json({ success: true, data });
}

async function getSession(req, res) {
  const data = await mockService.getSession(req.user.id, req.valid.params.sessionId);
  res.set('Cache-Control', 'no-store');
  res.json({ success: true, data });
}

async function getAnalytics(req, res) {
  const data = await mockAnalytics.getAnalytics(req.user.id, req.valid.params.sessionId);
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data });
}

module.exports = { createSession, submitSession, getSession, getAnalytics };
