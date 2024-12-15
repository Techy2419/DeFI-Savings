import { turnkeyApi } from './api';
import { Chain } from '../../types/wallet';
import type { WalletResponse } from './types';

export class TurnkeyWallet {
  private chain: Chain;
  private address: string | null = null;

  constructor(chain: Chain) {
    this.chain = chain;
  }

  public async create(name: string): Promise<{ address: string; chain: Chain }> {
    try {
      const response = await turnkeyApi.createWallet(
        `${name}-${this.chain}-${Date.now()}`
      );
      
      if (!response.success || !response.wallet?.address) {
        throw new Error('Failed to create wallet: No address returned');
      }
      
      this.address = response.wallet.address;
      return {
        address: this.address,
        chain: this.chain
      };
    } catch (error) {
      console.error('Error creating wallet:', error);
      throw error;
    }
  }

  public async signTransaction(transaction: any) {
    if (!this.address) {
      throw new Error('No wallet address available');
    }

    try {
      return await turnkeyApi.signTransaction(this.address, transaction);
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  }

  public getAddress(): string | null {
    return this.address;
  }
}