import React from 'react';
import { Zap } from 'lucide-react';
import { useWalletConnection } from '../../hooks/useWalletConnection';
import { NetworkSelect } from './shared/NetworkSelect';
import { ErrorDisplay } from './shared/ErrorDisplay';
import { ConnectButton } from './shared/ConnectButton';
import { ConnectionCard } from './shared/ConnectionCard';

export function AutomaticConnect() {
  const {
    selectedChain,
    setSelectedChain,
    handleConnect,
    isLoading,
    error
  } = useWalletConnection();

  return (
    <ConnectionCard
      icon={<Zap className="h-12 w-12 text-purple-400" />}
      title="Automatic Wallet Connection"
    >
      <NetworkSelect
        value={selectedChain}
        onChange={setSelectedChain}
      />

      <ErrorDisplay error={error} />

      <ConnectButton
        onClick={handleConnect}
        isLoading={isLoading}
        variant="purple"
      />

      <p className="mt-4 text-sm text-gray-400 text-center">
        Your wallet will automatically connect when you return to the app
      </p>
    </ConnectionCard>
  );
}