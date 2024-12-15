import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/config';
import { Chain } from '../../types/wallet';
import type { User } from 'firebase/auth';

export class WalletService {
  private static instance: WalletService;

  private constructor() {}

  public static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  public async createWallet(user: User, chain: Chain): Promise<string> {
    try {
      const response = await apiClient.post(`${ENDPOINTS.TURNKEY.BASE}${ENDPOINTS.TURNKEY.WALLET.CREATE}`, {
        name: `${chain}-${user.uid}-${Date.now()}`,
        type: 'WALLET_TYPE_ETHEREUM',
        metadata: {
          userId: user.uid,
          userEmail: user.email,
          chain
        }
      });

      if (!response.wallet?.address) {
        throw new Error('No wallet address returned');
      }

      return response.wallet.address;
    } catch (error) {
      console.error('Wallet creation failed:', error);
      throw error;
    }
  }

  public async signTransaction(address: string, transaction: any): Promise<any> {
    try {
      return await apiClient.post(`${ENDPOINTS.TURNKEY.BASE}${ENDPOINTS.TURNKEY.WALLET.SIGN}`, {
        walletAddress: address,
        transaction
      });
    } catch (error) {
      console.error('Transaction signing failed:', error);
      throw error;
    }
  }
}