import { useState, useCallback } from 'react';
import { TurnkeyWallet } from '../lib/turnkey/wallet';
import { useWalletStore } from '../lib/store';
import { Chain } from '../types/wallet';

export function useTurnkey() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { connect } = useWalletStore();

  const createWallet = useCallback(async (chain: Chain) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const wallet = new TurnkeyWallet(chain);
      const { address } = await wallet.create(`wallet`);
      connect(address, chain);
      return { address, chain };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create wallet';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [connect]);

  const signTransaction = useCallback(async (transaction: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { chain } = useWalletStore.getState();
      const wallet = new TurnkeyWallet(chain);
      return await wallet.signTransaction(transaction);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign transaction';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createWallet,
    signTransaction,
    isLoading,
    error
  };
}