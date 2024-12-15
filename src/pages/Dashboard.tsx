import React from 'react';
import { WalletCreation } from '../components/wallet/WalletCreation';
import { TransactionForm } from '../components/wallet/TransactionForm';
import { useWalletStore } from '../lib/store';

export function Dashboard() {
  const { address } = useWalletStore();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Wallet Dashboard</h1>

      {!address ? (
        <WalletCreation />
      ) : (
        <div className="space-y-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Send Transaction</h3>
            <TransactionForm walletAddress={address} />
          </div>
        </div>
      )}
    </div>
  );
}