// Wallet Types
export interface Account {
  curve: string;
  pathFormat: string;
  path: string;
  addressFormat: string;
}

export interface CreateWalletPayload {
  name: string;
  accounts: Account[];
}

export interface Wallet {
  id: string;
  address: string;
  chain?: string;
}

export interface WalletResponse {
  success: boolean;
  error?: string;
  wallet?: Wallet;
}

// Transaction Types
export interface TransactionPayload {
  walletAddress: string;
  transaction: any;
}

export interface TransactionResponse {
  success: boolean;
  error?: string;
  signedTransaction?: string;
}