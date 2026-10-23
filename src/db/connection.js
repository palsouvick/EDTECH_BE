'use strict';

const mongoose = require('mongoose');
const config = require('../config');

mongoose.set('strictQuery', true);

async function connect(uri = config.mongoUri) {
  await mongoose.connect(uri, {
    // Sized for many short reads; each request holds a connection for a few ms.
    maxPoolSize: 100,
    minPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 20000,
    // In prod, indexes come from db/indexes.mongo.js only (run on startup by src/db/bootstrap.js),
    // never from the schema declarations.
    autoIndex: !config.isProd,
  });
  return mongoose.connection;
}

async function disconnect() {
  await mongoose.disconnect();
}

module.exports = { connect, disconnect };
