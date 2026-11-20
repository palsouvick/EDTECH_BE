'use strict';

const { AsyncLocalStorage } = require('node:async_hooks');

/**
 * Request-scoped memoisation. One API request often reaches the same heavy
 * per-student read through several services (GET /me/today builds insights
 * and the syllabus map, and both load the student's answers and chapter
 * mastery). Within one request those reads are shared; nothing outlives the
 * request, so no response is ever served from another request's data.
 * Outside a request (scripts, tests calling services directly) memo() just
 * runs the loader.
 */
const als = new AsyncLocalStorage();

function requestScope(_req, _res, next) {
  als.run(new Map(), next);
}

/** The loader's promise, shared by every caller with the same key in this request. */
function memo(key, load) {
  const store = als.getStore();
  if (!store) return load();
  if (!store.has(key)) {
    const value = Promise.resolve().then(load);
    store.set(key, value);
    value.catch(() => store.delete(key)); // a failure is not shared with later callers
  }
  return store.get(key);
}

/** True inside an API request (where memo() shares results). */
const inRequestScope = () => als.getStore() !== undefined;

/** Forget a key, for a request that changes the data behind it before reading it again. */
function forget(key) {
  als.getStore()?.delete(key);
}

module.exports = { requestScope, memo, forget, inRequestScope };
