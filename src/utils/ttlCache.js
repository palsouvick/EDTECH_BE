'use strict';

/**
 * Per-process memoisation with expiry, for small read-mostly results (catalogue
 * counts). Concurrent misses for the same key share one in-flight promise.
 * maxEntries bounds a cache whose keys come from request input.
 */
function createTtlCache(ttlMs, { maxEntries = Infinity } = {}) {
  const entries = new Map();
  return {
    async get(key, load) {
      const hit = entries.get(key);
      if (hit && hit.expires > Date.now()) return hit.value;
      // Wrap in a real Promise: loaders may return thenables (a Mongoose Query
      // re-executes on every await) and the cached value must settle once.
      const value = Promise.resolve().then(load);
      entries.delete(key); // re-insert last, so the oldest entry is first in line
      entries.set(key, { value, expires: Date.now() + ttlMs });
      // Keys built from request input must not grow without bound: drop the oldest.
      while (entries.size > maxEntries) entries.delete(entries.keys().next().value);
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
