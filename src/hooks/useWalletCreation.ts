import { useState } from 'react';
import { turnkeyApi } from '../lib/turnkey/api';
import type { Chain } from '../types/wallet';
import type { WalletResponse } from '../lib/turnkey/types';

export function useWalletCreation() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createWallet = async (chain: Chain) => {
    setIsCreating(true);
    setError(null);

    try {
      const walletName = `${chain}-wallet-${Date.now()}`;
      const response = await turnkeyApi.createWallet({
        name: walletName,
        chain,
        accounts: [{
          curve: "CURVE_SECP256K1",
          pathFormat: "PATH_FORMAT_BIP32",
          path: "m/44'/60'/0'/0/0",
          addressFormat: "ADDRESS_FORMAT_ETHEREUM"
        }]
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (!response.wallet) {
        throw new Error('Failed to create wallet: No response received');
      }

      // Store wallet info in local storage
      localStorage.setItem('wallet_address', response.wallet.address);
      localStorage.setItem('wallet_chain', chain);

      return response.wallet;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create wallet';
      setError(errorMessage);
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createWallet,
    isCreating,
    error,
    clearError: () => setError(null)
  };
}