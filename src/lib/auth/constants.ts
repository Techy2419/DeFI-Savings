export const AUTH_CONSTANTS = {
  TOKEN_EXPIRY: 3600, // 1 hour in seconds
  REFRESH_TOKEN_EXPIRY: 2592000, // 30 days in seconds
  API_KEY_MIN_LENGTH: 32,
  MAX_API_KEYS_PER_USER: 5
} as const;

export const ERROR_CODES = {
  INVALID_TOKEN: 'auth/invalid-token',
  EXPIRED_TOKEN: 'auth/expired-token',
  INVALID_API_KEY: 'auth/invalid-api-key',
  API_KEY_LIMIT: 'auth/api-key-limit-reached',
  INSUFFICIENT_SCOPE: 'auth/insufficient-scope'
} as const;

export const API_SCOPES = {
  WALLET_CREATE: 'wallet:create',
  WALLET_READ: 'wallet:read',
  WALLET_WRITE: 'wallet:write',
  TRANSACTION_SIGN: 'transaction:sign'
} as const;