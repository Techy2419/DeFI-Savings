export const API_BASE_URL = '/api';

export const ENDPOINTS = {
  TURNKEY: {
    BASE: `${API_BASE_URL}/turnkey`,
    WALLET: {
      CREATE: '/v1/wallets',
      SIGN: '/v1/transactions/sign'
    }
  }
} as const;

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};