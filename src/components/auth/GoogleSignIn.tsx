import React from 'react';
import { AuthService } from '../../lib/services/auth.service';

export function GoogleSignIn() {
  const handleGoogleSignIn = async () => {
    try {
      await AuthService.getInstance().signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full bg-white hover:bg-gray-100 text-gray-900 
               font-semibold py-2 px-4 rounded-lg flex items-center 
               justify-center space-x-2"
    >
      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
      <span>Continue with Google</span>
    </button>
  );
}