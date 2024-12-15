import { envConfig } from '../config/env';

export const turnkeyConfig = {
  baseUrl: envConfig.turnkey.baseUrl,
  organizationId: envConfig.turnkey.organizationId,
  apiPublicKey: envConfig.turnkey.apiPublicKey,
  apiPrivateKey: envConfig.turnkey.apiPrivateKey
} as const;

export const API_ENDPOINTS = {
  wallets: '/v1/wallets',
  transactions: '/v1/transactions'
} as const;