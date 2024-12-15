import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseAuthService } from '../lib/firebase/auth';
import { WalletService } from '../lib/wallet/service';
import { useWalletStore } from '../lib/store';
import type { Chain } from '../types/wallet';
import type { User } from 'firebase/auth';

export function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { connect } = useWalletStore();

  const authService = FirebaseAuthService.getInstance();
  const walletService = WalletService.getInstance();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthSuccess = async (user: User, chain: Chain) => {
    try {
      const address = await walletService.createWallet(user, chain);
      connect(address, chain);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create wallet after authentication');
      throw err;
    }
  };

  const signInWithEmail = async (email: string, password: string, chain: Chain) => {
    setError(null);
    try {
      const { user } = await authService.signInWithEmail(email, password);
      await handleAuthSuccess(user, chain);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      throw err;
    }
  };

  const signInWithGoogle = async (chain: Chain) => {
    setError(null);
    try {
      const { user } = await authService.signInWithGoogle();
      await handleAuthSuccess(user, chain);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google authentication failed');
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signInWithEmail,
    signInWithGoogle
  };
}