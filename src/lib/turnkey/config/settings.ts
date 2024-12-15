import { envConfig } from '../../config/env';

// Update the base URL to point to our Node.js backend
const API_BASE = process.env.NODE_ENV === 'production'
  ? '/api/v1'
  : 'http://localhost:3001/api/v1';

export const turnkeyConfig = {
  baseUrl: API_BASE,
  organizationId: envConfig.turnkey.organizationId,
  apiPublicKey: envConfig.turnkey.apiPublicKey,
  apiPrivateKey: envConfig.turnkey.apiPrivateKey
} as const;