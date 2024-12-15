import { create } from 'zustand';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  type User
} from 'firebase/auth';
import { auth } from './config';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  signInWithEmail: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      set({ user, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Authentication failed',
        loading: false 
      });
    }
  },

  signInWithGoogle: async () => {
    set({ loading: true, error: null });
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      set({ user, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Google authentication failed',
        loading: false 
      });
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    try {
      await signOut(auth);
      set({ user: null, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Sign out failed',
        loading: false 
      });
    }
  }
}));

// Listen to auth state changes
auth.onAuthStateChanged((user) => {
  useAuthStore.setState({ user, loading: false });
});