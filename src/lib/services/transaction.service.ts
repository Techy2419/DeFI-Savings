import { parseEther } from 'ethers';
import { WalletService } from './wallet.service';
import type { TransactionRequest } from '@ethersproject/abstract-provider';

export class TransactionService {
  private static instance: TransactionService;
  private walletService: WalletService;

  private constructor() {
    this.walletService = WalletService.getInstance();
  }

  public static getInstance(): TransactionService {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService();
    }
    return TransactionService.instance;
  }

  public async signTransaction(
    walletAddress: string,
    to: string,
    amount: string,
    chainId: number = 5 // Default to Goerli testnet
  ): Promise<string> {
    try {
      const transaction: TransactionRequest = {
        to,
        value: parseEther(amount),
        chainId,
      };

      return await this.walletService.signTransaction(walletAddress, transaction);
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  }
}