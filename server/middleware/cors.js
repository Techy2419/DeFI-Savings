const cors = require('cors');
const env = require('../config/env');

const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (env.cors.origins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Api-Key',
    'X-Organization-Id'
  ],
  exposedHeaders: ['Content-Length', 'Content-Type']
});

module.exports = { corsMiddleware };