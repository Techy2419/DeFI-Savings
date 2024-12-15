import { makeRequest } from './request';
import { API_ROUTES } from '../config/api';
import { ERROR_MESSAGES } from '../config/constants';
import type { WalletResponse, CreateWalletPayload } from '../types';

class TurnkeyAPIClient {
  private static instance: TurnkeyAPIClient;

  private constructor() {}

  public static getInstance(): TurnkeyAPIClient {
    if (!TurnkeyAPIClient.instance) {
      TurnkeyAPIClient.instance = new TurnkeyAPIClient();
    }
    return TurnkeyAPIClient.instance;
  }

  public async createWallet(name: string): Promise<WalletResponse> {
    const payload: CreateWalletPayload = {
      name,
      accounts: [{
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: "m/44'/60'/0'/0/0",
        addressFormat: "ADDRESS_FORMAT_ETHEREUM"
      }]
    };

    try {
      return await makeRequest<WalletResponse>(API_ROUTES.WALLETS, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error('Failed to create wallet:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.WALLET.CREATE_FAILED
      };
    }
  }

  public async signTransaction(
    walletAddress: string,
    transaction: any
  ): Promise<WalletResponse> {
    try {
      return await makeRequest<WalletResponse>(`${API_ROUTES.TRANSACTIONS}/sign`, {
        method: 'POST',
        body: JSON.stringify({
          walletAddress,
          transaction
        })
      });
    } catch (error) {
      console.error('Failed to sign transaction:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.WALLET.SIGN_FAILED
      };
    }
  }
}

export const turnkeyAPI = TurnkeyAPIClient.getInstance();