const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const requiredEnvVars = [
  'VITE_TURNKEY_API_BASE_URL',
  'VITE_TURNKEY_ORGANIZATION_ID',
  'VITE_TURNKEY_API_PUBLIC_KEY',
  'VITE_TURNKEY_API_PRIVATE_KEY'
];

// Validate required environment variables
const missingVars = requiredEnvVars.filter(key => !process.env[key]);
if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

module.exports = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  turnkey: {
    baseUrl: process.env.VITE_TURNKEY_API_BASE_URL,
    organizationId: process.env.VITE_TURNKEY_ORGANIZATION_ID,
    apiPublicKey: process.env.VITE_TURNKEY_API_PUBLIC_KEY,
    apiPrivateKey: process.env.VITE_TURNKEY_API_PRIVATE_KEY
  },
  cors: {
    origins: ['http://localhost:5173', 'http://localhost:5174']
  }
};