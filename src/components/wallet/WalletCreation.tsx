import React, { useState } from 'react';
import { Loader, Wallet } from 'lucide-react';
import { WalletService } from '../../lib/services/wallet.service';
import { AuthService } from '../../lib/services/auth.service';

export function WalletCreation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleCreateWallet = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = AuthService.getInstance().getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const address = await WalletService.getInstance().createWallet(user.uid);
      setWalletAddress(address);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create wallet');
    } finally {
      setLoading(false);
    }
  };

  if (walletAddress) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-center mb-4">
          <Wallet className="h-12 w-12 text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-center mb-4">Wallet Created!</h3>
        <div className="bg-gray-700 rounded-lg p-4 break-all text-center">
          <p className="text-sm text-gray-400 mb-2">Your Wallet Address:</p>
          <p className="font-mono">{walletAddress}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-semibold mb-4">Create Your Wallet</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
          {error}
        </div>
      )}

      <button
        onClick={handleCreateWallet}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 
                 disabled:cursor-not-allowed rounded-lg p-3 font-semibold
                 flex items-center justify-center"
      >
        {loading ? (
          <>
            <Loader className="animate-spin h-5 w-5 mr-2" />
            Creating Wallet...
          </>
        ) : (
          'Create Wallet'
        )}
      </button>
    </div>
  );
}