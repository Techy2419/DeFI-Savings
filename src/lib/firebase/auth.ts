import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  type User,
  type UserCredential
} from 'firebase/auth';
import { auth } from './config';

export class FirebaseAuthService {
  private static instance: FirebaseAuthService;
  private googleProvider: GoogleAuthProvider;

  private constructor() {
    this.googleProvider = new GoogleAuthProvider();
  }

  public static getInstance(): FirebaseAuthService {
    if (!FirebaseAuthService.instance) {
      FirebaseAuthService.instance = new FirebaseAuthService();
    }
    return FirebaseAuthService.instance;
  }

  public async signInWithEmail(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Email sign-in failed:', error);
      throw error;
    }
  }

  public async signInWithGoogle(): Promise<UserCredential> {
    try {
      return await signInWithPopup(auth, this.googleProvider);
    } catch (error) {
      console.error('Google sign-in failed:', error);
      throw error;
    }
  }

  public getCurrentUser(): User | null {
    return auth.currentUser;
  }

  public onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return auth.onAuthStateChanged(callback);
  }
}