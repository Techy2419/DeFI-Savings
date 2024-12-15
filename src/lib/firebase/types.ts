import type { User as FirebaseUser } from 'firebase/auth';

export interface AuthState {
  user: FirebaseUser | null;
  loading: boolean;
  error: string | null;
}

export interface AuthCredentials {
  email: string;
  password: string;
}