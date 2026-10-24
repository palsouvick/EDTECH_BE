'use strict';

const crypto = require('node:crypto');

function normalizeQuestionText(value) {
  return String(value ?? '')
    .normalize('NFC')
    .replace(/\r\n?/gu, '\n')
    .replace(/\s+/gu, ' ')
    .replace(/\s*([+\-*/=<>≤≥≠±×÷%^])\s*/gu, '$1')
    .trim()
    .toLowerCase();
}

function questionDuplicateKeys(stem = {}) {
  const content = typeof stem.toObject === 'function' ? stem.toObject() : stem;
  return Object.entries(content)
    .filter(([, value]) => typeof value === 'string' && value.trim())
    .map(([language, value]) => crypto
      .createHash('sha256')
      .update(`${language}\u001f${normalizeQuestionText(value)}`)
      .digest('hex'));
}

module.exports = { normalizeQuestionText, questionDuplicateKeys };
