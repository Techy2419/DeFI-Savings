// API Configuration
export const API_CONFIG = {
  VERSION: 'v1',
  BASE_PATH: '/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
} as const;

// Build API URLs
export function buildApiUrl(path: string): string {
  return `${API_CONFIG.BASE_PATH}/${API_CONFIG.VERSION}${path}`;
}

// API Routes
export const API_ROUTES = {
  ACTIVITIES: '/activities',
  WALLETS: '/wallets',
  TRANSACTIONS: '/transactions'
} as const;