import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWallet } from '../lib/turnkey/client/wallet';
import { useWalletStore } from '../lib/store';
import { Chain } from '../types/wallet';
import { ERROR_MESSAGES } from '../lib/turnkey/config/constants';

export function useWalletConnection() {
  const navigate = useNavigate();
  const { connect } = useWalletStore();
  const [selectedChain, setSelectedChain] = useState<Chain>('ethereum');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const walletName = `${selectedChain}-wallet-${Date.now()}`;
      const response = await createWallet(walletName);

      if (!response.success || !response.wallet?.address) {
        throw new Error(response.error || ERROR_MESSAGES.WALLET.CONNECTION_FAILED);
      }

      connect(response.wallet.address, selectedChain);
      navigate('/dashboard');
    } catch (err) {
      console.error('Wallet connection failed:', err);
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.WALLET.CONNECTION_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    selectedChain,
    setSelectedChain,
    handleConnect,
    isLoading,
    error
  };
}