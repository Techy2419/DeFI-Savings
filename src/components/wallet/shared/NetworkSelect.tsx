import React from 'react';
import { Chain } from '../../../types/wallet';
import { SUPPORTED_CHAINS } from '../../../config/chains';

interface NetworkSelectProps {
  value: Chain;
  onChange: (chain: Chain) => void;
}

export function NetworkSelect({ value, onChange }: NetworkSelectProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Select Network
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Chain)}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
      >
        {Object.entries(SUPPORTED_CHAINS).map(([chain, config]) => (
          <option key={chain} value={chain}>
            {config.name}
          </option>
        ))}
      </select>
    </div>
  );
}