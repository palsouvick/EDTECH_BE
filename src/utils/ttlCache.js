'use strict';

/**
 * Per-process memoisation with expiry, for small read-mostly results (catalogue
 * counts). Concurrent misses for the same key share one in-flight promise.
 */
function createTtlCache(ttlMs) {
  const entries = new Map();
  return {
    async get(key, load) {
      const hit = entries.get(key);
      if (hit && hit.expires > Date.now()) return hit.value;
      // Wrap in a real Promise: loaders may return thenables (a Mongoose Query
      // re-executes on every await) and the cached value must settle once.
      const value = Promise.resolve().then(load);
      entries.set(key, { value, expires: Date.now() + ttlMs });
      try {
        return await value;
      } catch (err) {
        entries.delete(key); // don't cache failures
        throw err;
      }
    },
    clear: () => entries.clear(),
  };
}

module.exports = { createTtlCache };
