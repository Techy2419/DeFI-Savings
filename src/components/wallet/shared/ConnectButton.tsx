import React from 'react';
import { Loader } from 'lucide-react';

interface ConnectButtonProps {
  onClick: () => void;
  isLoading: boolean;
  variant?: 'blue' | 'purple';
}

export function ConnectButton({ 
  onClick, 
  isLoading, 
  variant = 'blue' 
}: ConnectButtonProps) {
  const baseClasses = "w-full disabled:cursor-not-allowed rounded-lg p-3 font-semibold flex items-center justify-center";
  const variantClasses = variant === 'blue' 
    ? "bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50"
    : "bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50";

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClasses} ${variantClasses}`}
    >
      {isLoading ? (
        <>
          <Loader className="animate-spin h-5 w-5 mr-2" />
          Connecting...
        </>
      ) : (
        'Connect Wallet'
      )}
    </button>
  );
}