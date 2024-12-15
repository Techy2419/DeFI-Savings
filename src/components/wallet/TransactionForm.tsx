import React, { useState } from 'react';
import { Loader, Send } from 'lucide-react';
import { TransactionService } from '../../lib/services/transaction.service';
import { validateAddress } from '../../lib/utils/ethereum';

interface TransactionFormProps {
  walletAddress: string;
}

export function TransactionForm({ walletAddress }: TransactionFormProps) {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const validateForm = (): string | null => {
    if (!validateAddress(to)) {
      return 'Invalid recipient address';
    }
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return 'Invalid amount';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const transactionService = TransactionService.getInstance();
      const signedTx = await transactionService.signTransaction(
        walletAddress,
        to,
        amount
      );
      
      setTxHash(signedTx);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send transaction');
    } finally {
      setLoading(false);
    }
  };

  if (txHash) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="text-center">
          <Send className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Transaction Signed!</h3>
          <p className="text-sm text-gray-400 mb-4">
            Your transaction has been signed successfully
          </p>
          <div className="bg-gray-700 rounded-lg p-4 break-all">
            <p className="text-sm text-gray-400 mb-2">Transaction Hash:</p>
            <p className="font-mono">{txHash}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Recipient Address
        </label>
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
          placeholder="0x..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Amount (ETH)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.0001"
          min="0"
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
          placeholder="0.01"
          required
        />
      </div>

      {error && (
        <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 
                 disabled:cursor-not-allowed rounded-lg p-3 font-semibold
                 flex items-center justify-center"
      >
        {loading ? (
          <>
            <Loader className="animate-spin h-5 w-5 mr-2" />
            Signing Transaction...
          </>
        ) : (
          'Sign Transaction'
        )}
      </button>
    </form>
  );
}