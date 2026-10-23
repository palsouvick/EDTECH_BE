'use strict';

const AppError = require('../utils/AppError');

/**
 * Validates and coerces request parts with Zod. Parsed values go on req.valid,
 * because Express 5 makes req.query a read-only getter.
 *
 *   router.get('/x', validate({ query: schema }), handler)
 */
function validate(schemas) {
  return function validateRequest(req, _res, next) {
    req.valid = {};
    const issues = [];

    for (const part of ['params', 'query', 'body']) {
      if (!schemas[part]) continue;
      const result = schemas[part].safeParse(req[part] ?? {});
      if (result.success) {
        req.valid[part] = result.data;
      } else {
        for (const issue of result.error.issues) {
          issues.push({ in: part, path: issue.path.join('.'), message: issue.message });
        }
      }
    }

    if (issues.length) return next(new AppError(400, 'VALIDATION_FAILED', 'Invalid request', issues));
    next();
  };
}

module.exports = validate;
