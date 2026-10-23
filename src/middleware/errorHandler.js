'use strict';

const mongoose = require('mongoose');
const AppError = require('../utils/AppError');

function notFoundHandler(req, _res, next) {
  next(AppError.notFound('ROUTE_NOT_FOUND', `No route for ${req.method} ${req.path}`));
}

/** Maps known failures to clean 4xx responses; anything else is a 500 with no internals leaked. */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, _next) {
  let error = err;

  if (err instanceof mongoose.Error.CastError) {
    error = AppError.badRequest(`Invalid value for ${err.path}`);
  } else if (err instanceof mongoose.Error.ValidationError) {
    error = new AppError(422, 'DOCUMENT_INVALID', 'Document failed validation',
      Object.values(err.errors).map((e) => ({ path: e.path, message: e.message })));
  } else if (err?.type === 'entity.parse.failed') {
    error = AppError.badRequest('Malformed JSON body');
  } else if (err?.type === 'entity.too.large') {
    error = new AppError(413, 'PAYLOAD_TOO_LARGE', 'Request body too large');
  } else if (err?.code === 11000) {
    error = AppError.conflict('DUPLICATE', 'Resource already exists');
  }

  if (!(error instanceof AppError)) {
    console.error(`[${req.method} ${req.originalUrl}]`, err);
    error = new AppError(500, 'INTERNAL_ERROR', 'Something went wrong');
  } else if (error.status >= 500) {
    console.error(`[${req.method} ${req.originalUrl}]`, err);
  }

  if (res.headersSent) return;
  res.status(error.status).json({
    success: false,
    error: { code: error.code, message: error.message, ...(error.details && { details: error.details }) },
  });
}

module.exports = { notFoundHandler, errorHandler };
