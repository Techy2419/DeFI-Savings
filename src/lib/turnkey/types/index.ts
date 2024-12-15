export interface Wallet {
  id: string;
  address: string;
}

export interface WalletResponse {
  success: boolean;
  error?: string;
  wallet?: Wallet;
}

export interface CreateWalletResult {
  wallet: {
    id: string;
    address: string;
  };
}

export interface SignTransactionResult {
  wallet: {
    id: string;
  };
  signedTransaction: string;
}