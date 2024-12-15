import React from 'react';
import { Mail } from 'lucide-react';

interface EmailInputProps {
  email: string;
  onChange: (email: string) => void;
  disabled?: boolean;
}

export function EmailInput({ email, onChange, disabled }: EmailInputProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Email Address
      </label>
      <div className="relative">
        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 p-2 text-white
                   disabled:bg-gray-600 disabled:cursor-not-allowed"
          placeholder="you@example.com"
          required
        />
      </div>
    </div>
  );
}