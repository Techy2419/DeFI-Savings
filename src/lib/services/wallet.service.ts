import { TurnkeyClient } from '@turnkey/http';
import { turnkeyConfig } from '../config/turnkey';
import type { TransactionRequest } from '@ethersproject/abstract-provider';

export class WalletService {
  private static instance: WalletService;
  private client: TurnkeyClient;

  private constructor() {
    this.client = new TurnkeyClient({
      baseUrl: turnkeyConfig.baseUrl
    });
  }

  public static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  public async createWallet(userId: string): Promise<string> {
    try {
      const response = await this.client.createWallet({
        organizationId: turnkeyConfig.organizationId,
        type: 'WALLET_TYPE_ETHEREUM',
        name: `wallet-${userId}-${Date.now()}`,
      });

      if (!response.address) {
        throw new Error('No wallet address returned');
      }

      return response.address;
    } catch (error) {
      console.error('Error creating wallet:', error);
      throw error;
    }
  }

  public async signTransaction(
    walletAddress: string, 
    transaction: TransactionRequest
  ): Promise<string> {
    try {
      const response = await this.client.signTransaction({
        organizationId: turnkeyConfig.organizationId,
        walletAddress,
        transaction: transaction as any
      });

      return response.signedTransaction;
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  }
}