import { turnkeyAPI } from '../api/client';
import { ERROR_MESSAGES } from '../config/constants';
import { API_ENDPOINTS } from '../config/endpoints';
import type { WalletResponse } from '../types';

export class WalletService {
  private static instance: WalletService;

  private constructor() {}

  public static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  public async create(name: string): Promise<WalletResponse> {
    try {
      const response = await turnkeyAPI.createWallet(name);

      if (!response.success) {
        throw new Error(response.error || ERROR_MESSAGES.WALLET.CREATE_FAILED);
      }

      return response;
    } catch (error) {
      console.error('Failed to create wallet:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.WALLET.CREATE_FAILED
      };
    }
  }

  public async signTransaction(
    address: string,
    transaction: any
  ): Promise<WalletResponse> {
    try {
      const response = await turnkeyAPI.signTransaction(address, transaction);

      if (!response.success) {
        throw new Error(response.error || ERROR_MESSAGES.WALLET.SIGN_FAILED);
      }

      return response;
    } catch (error) {
      console.error('Failed to sign transaction:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.WALLET.SIGN_FAILED
      };
    }
  }
}