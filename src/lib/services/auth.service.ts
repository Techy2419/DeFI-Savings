import { 
  signInWithEmailLink, 
  sendSignInLinkToEmail, 
  signInWithPopup,
  GoogleAuthProvider,
  type User
} from 'firebase/auth';
import { auth } from '../config/firebase';

export class AuthService {
  private static instance: AuthService;
  private googleProvider: GoogleAuthProvider;

  private constructor() {
    this.googleProvider = new GoogleAuthProvider();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async sendMagicLink(email: string): Promise<void> {
    const actionCodeSettings = {
      url: window.location.origin + '/auth/verify',
      handleCodeInApp: true
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      localStorage.setItem('emailForSignIn', email);
    } catch (error) {
      console.error('Error sending magic link:', error);
      throw error;
    }
  }

  public async verifyMagicLink(): Promise<User> {
    try {
      const email = localStorage.getItem('emailForSignIn');
      if (!email) throw new Error('No email found for sign in');

      const result = await signInWithEmailLink(auth, email, window.location.href);
      localStorage.removeItem('emailForSignIn');
      return result.user;
    } catch (error) {
      console.error('Error verifying magic link:', error);
      throw error;
    }
  }

  public async signInWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, this.googleProvider);
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  public getCurrentUser(): User | null {
    return auth.currentUser;
  }
}