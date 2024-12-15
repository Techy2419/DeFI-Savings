// Activity Types
export const ACTIVITY_TYPES = {
  CREATE_WALLET: 'CREATE_WALLET',
  SIGN_TRANSACTION: 'SIGN_TRANSACTION'
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  WALLET: {
    CREATE_FAILED: 'Failed to create wallet',
    SIGN_FAILED: 'Failed to sign transaction',
    NO_ADDRESS: 'No wallet address returned',
    CONNECTION_FAILED: 'Wallet connection failed',
    INVALID_PARAMETERS: 'Invalid wallet parameters'
  },
  API: {
    REQUEST_FAILED: 'API request failed',
    INVALID_RESPONSE: 'Invalid API response',
    MISSING_CONFIG: 'Missing required configuration',
    POLLING_FAILED: 'Activity polling failed',
    INVALID_CONTENT_TYPE: 'Invalid response content type'
  }
} as const;

// Activity Parameters
export const ACTIVITY_PARAMS = {
  ETHEREUM_ACCOUNT: {
    curve: "CURVE_SECP256K1",
    pathFormat: "PATH_FORMAT_BIP32",
    path: "m/44'/60'/0'/0/0",
    addressFormat: "ADDRESS_FORMAT_ETHEREUM"
  }
} as const;