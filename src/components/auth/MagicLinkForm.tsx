import React, { useState } from 'react';
import { Mail, Loader } from 'lucide-react';
import { AuthService } from '../../lib/services/auth.service';

export function MagicLinkForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await AuthService.getInstance().sendMagicLink(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send magic link');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center p-6 bg-gray-800 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Check Your Email</h3>
        <p className="text-gray-300">
          We've sent a magic link to <span className="font-medium">{email}</span>
        </p>
        <p className="mt-2 text-gray-400">
          Click the link in your email to sign in
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 p-2 text-white"
            placeholder="you@example.com"
            required
          />
        </div>
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
            Sending Link...
          </>
        ) : (
          'Send Magic Link'
        )}
      </button>
    </form>
  );
}