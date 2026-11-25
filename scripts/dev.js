'use strict';

/**
 * Dev runner: `npm run dev`. Replaces `node --watch src/server.js`, which restarted the API
 * several times per save:
 *   - it watches every module the server loads, and the server's bootstrap loads all the seed
 *     scripts, generators and pattern files, so editing question content restarted the API;
 *   - on Windows one save fires 2-3 change events (and editors touch files without changing them);
 *   - a restart could start a new server while the old one still held the port.
 *
 * This runner:
 *   - watches only src/ (and .env); pass --all (`npm run dev:all`) to also watch db/ and scripts/;
 *   - restarts only when a file's CONTENT changed (sha1), so duplicate events and touches are ignored;
 *   - debounces a burst of saves into one restart;
 *   - stops the old server (and waits for it to exit) before starting the new one;
 *   - after a crash, waits for the next change instead of restart-looping.
 *
 * Type `rs` + Enter to restart by hand.
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawn } = require('node:child_process');

const ROOT = path.join(__dirname, '..');
const ALL = process.argv.includes('--all');
const DIRS = ALL ? ['src', 'db', 'scripts'] : ['src'];
const EXT = new Set(['.js', '.cjs', '.mjs', '.json', '.jsonl']);
const IGNORE = /(^|[\\/])(node_modules|\.git|storage|test|coverage)([\\/]|$)/;
const DEBOUNCE_MS = 400;
const KILL_TIMEOUT_MS = 5000;

const log = (msg) => console.log(`\x1b[36m[dev]\x1b[0m ${msg}`);

// ---------------------------------------------------------------- content hashes
const hashes = new Map();
function hashOf(file) {
  try {
    return crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex');
  } catch {
    return null; // deleted or locked mid-save
  }
}
function prime(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (IGNORE.test(path.relative(ROOT, p))) continue;
    if (e.isDirectory()) prime(p);
    else if (EXT.has(path.extname(e.name))) hashes.set(p, hashOf(p));
  }
}
/** True when the file's content differs from the last version seen (and remembers it). */
function changed(file) {
  const h = hashOf(file);
  if (hashes.get(file) === h) return false;
  if (h === null && !hashes.has(file)) return false;
  hashes.set(file, h);
  return true;
}

// ---------------------------------------------------------------- server process
let child = null;
let stopping = null;
let pending = false;
let exiting = false;

function start() {
  child = spawn(process.execPath, ['--env-file-if-exists=.env', 'src/server.js'], { cwd: ROOT, stdio: 'inherit' });
  const me = child;
  me.on('exit', (code, signal) => {
    if (child === me) child = null;
    if (exiting || stopping) return;
    if (code === 0 || signal) log(`server exited${signal ? ` (${signal})` : ''}; waiting for changes`);
    else log(`\x1b[31mserver crashed (exit ${code})\x1b[0m; fix the error and save, or type rs to restart`);
  });
}

function stop() {
  if (!child) return Promise.resolve();
  if (stopping) return stopping;
  const proc = child;
  stopping = new Promise((resolve) => {
    const timer = setTimeout(() => proc.kill('SIGKILL'), KILL_TIMEOUT_MS);
    proc.once('exit', () => {
      clearTimeout(timer);
      resolve();
    });
    proc.kill('SIGTERM');
  }).finally(() => {
    stopping = null;
    if (child === proc) child = null;
  });
  return stopping;
}

let restarting = false;
async function restart(reason) {
  if (restarting) {
    pending = true; // one more restart after the current one, never two servers at once
    return;
  }
  restarting = true;
  log(reason);
  await stop();
  start();
  restarting = false;
  if (pending) {
    pending = false;
    restart('more changes during restart');
  }
}

// ---------------------------------------------------------------- watching
let timer = null;
const batch = new Set();
function onEvent(file) {
  if (!file || IGNORE.test(path.relative(ROOT, file))) return;
  const isEnv = path.basename(file) === '.env';
  if (!isEnv && !EXT.has(path.extname(file))) return;
  if (!changed(file)) return;
  batch.add(path.relative(ROOT, file));
  clearTimeout(timer);
  timer = setTimeout(() => {
    const files = [...batch];
    batch.clear();
    const shown = files.slice(0, 3).join(', ') + (files.length > 3 ? ` +${files.length - 3} more` : '');
    restart(`restarting: ${shown}`);
  }, DEBOUNCE_MS);
}

for (const d of DIRS) {
  const dir = path.join(ROOT, d);
  prime(dir);
  fs.watch(dir, { recursive: true }, (_event, name) => name && onEvent(path.join(dir, name.toString())));
}
const envFile = path.join(ROOT, '.env');
hashes.set(envFile, hashOf(envFile));
fs.watch(ROOT, (_event, name) => name && name.toString() === '.env' && onEvent(envFile));

// Manual restart, like nodemon's `rs`.
if (process.stdin.isTTY || process.stdin.readable) {
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (d) => d.trim() === 'rs' && restart('manual restart'));
}

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, async () => {
    exiting = true;
    await stop();
    process.exit(0);
  });
}

log(`watching ${DIRS.join(', ')}${ALL ? '' : ' (npm run dev:all also watches db/ and scripts/)'}; type rs to restart`);
start();
