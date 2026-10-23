'use strict';

const practiceService = require('../services/practice.service');

// Express 5 forwards rejected promises to the error handler; no try/catch wrappers needed.

async function topicView(req, res) {
  const data = await practiceService.getTopicView(req.valid.query);
  // Published content changes rarely; let the CDN absorb repeat page views briefly.
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  res.json({ success: true, data });
}

async function topicSummary(req, res) {
  const data = await practiceService.getTopicSummary(req.valid.query);
  res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600');
  res.json({ success: true, data });
}

async function verifyAnswer(req, res) {
  const data = await practiceService.verifyAnswer(req.valid.body, req.user?.id);
  res.set('Cache-Control', 'no-store');
  res.json({ success: true, data });
}

async function questionStream(req, res) {
  const data = await practiceService.getQuestionStream(req.valid.query, req.user?.id);
  // Bookmark flags are per user, so only anonymous pages may be shared by caches.
  res.set('Cache-Control', req.user ? 'private, no-store' : 'public, max-age=60');
  res.json({ success: true, data });
}

async function addBookmark(req, res) {
  const data = await practiceService.addBookmark(req.user.id, req.valid.params.questionId);
  res.json({ success: true, data });
}

async function listBookmarks(req, res) {
  const data = await practiceService.listBookmarks(req.user.id, req.valid.query);
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data });
}

async function removeBookmark(req, res) {
  const data = await practiceService.removeBookmark(req.user.id, req.valid.params.questionId);
  res.json({ success: true, data });
}

async function reportError(req, res) {
  const data = await practiceService.reportError(req.valid.body, req.user?.id);
  res.status(data.duplicate ? 200 : 201).json({ success: true, data });
}

module.exports = { topicView, topicSummary, questionStream, verifyAnswer, addBookmark, removeBookmark, listBookmarks, reportError };
