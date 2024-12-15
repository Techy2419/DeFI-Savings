import React from 'react';
import { useWalletStore } from '../lib/store';
import { SUPPORTED_CHAINS } from '../config/chains';
import { Shield, Network, Bell } from 'lucide-react';

export function Settings() {
  const { chain, switchChain, isConnected } = useWalletStore();

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Please connect your wallet to access settings.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-4 mb-4">
          <Network className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-semibold">Network Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Active Network
            </label>
            <select
              value={chain}
              onChange={(e) => switchChain(e.target.value as any)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
            >
              {Object.entries(SUPPORTED_CHAINS).map(([chainId, config]) => (
                <option key={chainId} value={chainId}>
                  {config.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-4 mb-4">
          <Shield className="h-6 w-6 text-green-400" />
          <h2 className="text-xl font-semibold">Security Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-400">Add an extra layer of security</p>
            </div>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg">
              Enable
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-4 mb-4">
          <Bell className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-semibold">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          <NotificationSetting
            title="Transaction Updates"
            description="Get notified about your transaction status"
          />
          <NotificationSetting
            title="Staking Rewards"
            description="Receive alerts about your staking rewards"
          />
          <NotificationSetting
            title="Security Alerts"
            description="Important security notifications"
          />
        </div>
      </div>
    </div>
  );
}

function NotificationSetting({ 
  title, 
  description 
}: { 
  title: string; 
  description: string; 
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
      </label>
    </div>
  );
}