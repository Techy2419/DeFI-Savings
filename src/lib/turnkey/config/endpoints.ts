// API Version
export const API_VERSION = 'v1';

// Base paths
export const API_PATHS = {
  BASE: `/api/${API_VERSION}`,
  ACTIVITIES: `/api/${API_VERSION}/activities`,
  WALLETS: `/api/${API_VERSION}/wallets`,
  TRANSACTIONS: `/api/${API_VERSION}/transactions`
} as const;

// Full endpoint URLs
export const API_ENDPOINTS = {
  activities: {
    create: API_PATHS.ACTIVITIES,
    get: (id: string) => `${API_PATHS.ACTIVITIES}/${id}`
  },
  wallets: {
    create: API_PATHS.WALLETS,
    get: (id: string) => `${API_PATHS.WALLETS}/${id}`
  },
  transactions: {
    sign: `${API_PATHS.TRANSACTIONS}/sign`
  }
} as const;