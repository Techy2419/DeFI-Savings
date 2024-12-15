import React from 'react';
import { Shield, Loader } from 'lucide-react';
import { useWalletConnection } from '../../hooks/useWalletConnection';
import { NetworkSelect } from './shared/NetworkSelect';
import { ErrorDisplay } from './shared/ErrorDisplay';
import { ConnectButton } from './shared/ConnectButton';
import { ConnectionCard } from './shared/ConnectionCard';

export function ManualConnect() {
  const {
    selectedChain,
    setSelectedChain,
    handleConnect,
    isLoading,
    error
  } = useWalletConnection();

  return (
    <ConnectionCard
      icon={<Shield className="h-12 w-12 text-blue-400" />}
      title="Manual Wallet Connection"
    >
      <NetworkSelect
        value={selectedChain}
        onChange={setSelectedChain}
      />

      <ErrorDisplay error={error} />

      <ConnectButton
        onClick={handleConnect}
        isLoading={isLoading}
      />

      <p className="mt-4 text-sm text-gray-400 text-center">
        Connect your wallet manually for enhanced security and control
      </p>
    </ConnectionCard>
  );
}