import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet2, LineChart, Settings, LogOut } from 'lucide-react';
import { useWalletStore } from '../lib/store';
import { useAuthStore } from '../lib/firebase/store';

export function Navigation() {
  const navigate = useNavigate();
  const { isConnected, address } = useWalletStore();
  const { user, signOut } = useAuthStore();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Wallet2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">DeFi Savings</span>
            </Link>
            
            {user && (
              <div className="flex space-x-4">
                <Link to="/dashboard" className="flex items-center space-x-1 text-gray-300 hover:text-white">
                  <LineChart className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/settings" className="flex items-center space-x-1 text-gray-300 hover:text-white">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {isConnected ? (
                  <div className="px-4 py-2 bg-gray-700 rounded-lg">
                    {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
                  </div>
                ) : (
                  <Link
                    to="/connect"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                  >
                    Connect Wallet
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}