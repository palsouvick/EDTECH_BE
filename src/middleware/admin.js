'use strict';

const AppError = require('../utils/AppError');
const { User } = require('../models');
const { isAdminEmail } = require('../services/auth.service');
const { requireAuth } = require('./auth');

/**
 * Admin portal gate. Needs a real login session (the dev x-user-id header never
 * qualifies) whose email is listed in ADMIN_EMAILS. Checked on every request, so
 * removing an email takes effect immediately.
 */
function requireAdmin(req, res, next) {
  requireAuth(req, res, async (err) => {
    if (err) return next(err);
    try {
      const user = req.user.viaSession && /^[a-f\d]{24}$/i.test(req.user.id) ? await User.findById(req.user.id).select('email').lean() : null;
      if (!user || !isAdminEmail(user.email)) return next(new AppError(403, 'FORBIDDEN', 'Admin access required'));
      req.admin = { id: req.user.id, email: user.email };
      res.set('Cache-Control', 'private, no-store');
      next();
    } catch (e) {
      next(e);
    }
  });
}

module.exports = { requireAdmin };
