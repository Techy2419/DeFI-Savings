import { BaseService } from './base';
import { ACTIVITY_TYPES, ERROR_MESSAGES, ACTIVITY_PARAMS } from '../config/constants';
import { logApiError } from '../utils/logger';
import type { WalletResponse } from '../types';

export class WalletService extends BaseService {
  private static instance: WalletService;

  private constructor() {
    super();
  }

  public static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  public async create(name: string): Promise<WalletResponse> {
    try {
      // Create wallet creation activity
      const activity = await this.client.createActivity({
        type: ACTIVITY_TYPES.CREATE_WALLET,
        organizationId: this.config.organizationId,
        parameters: {
          walletName: name,
          type: "WALLET_TYPE_ETHEREUM",
          accounts: [ACTIVITY_PARAMS.ETHEREUM_ACCOUNT]
        },
        timestampMs: Date.now().toString()
      });

      // Poll for activity completion
      const result = await this.client.getActivity(activity.id);

      if (!result?.wallet?.address) {
        throw new Error(ERROR_MESSAGES.WALLET.NO_ADDRESS);
      }

      return {
        success: true,
        wallet: {
          id: result.wallet.id,
          address: result.wallet.address
        }
      };
    } catch (error) {
      logApiError('createWallet', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.WALLET.CREATE_FAILED
      };
    }
  }
}