export const ACTIVITY_TYPES = {
  CREATE_WALLET: 'CREATE_WALLET',
  SIGN_TRANSACTION: 'SIGN_TRANSACTION'
} as const;

export const ERROR_MESSAGES = {
  WALLET: {
    CREATE_FAILED: 'Failed to create wallet',
    SIGN_FAILED: 'Failed to sign transaction'
  }
} as const;