import React from 'react';
import { MagicLinkForm } from '../components/auth/MagicLinkForm';
import { GoogleSignIn } from '../components/auth/GoogleSignIn';

export function Auth() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        
        <MagicLinkForm />

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <GoogleSignIn />
          </div>
        </div>
      </div>
    </div>
  );
}