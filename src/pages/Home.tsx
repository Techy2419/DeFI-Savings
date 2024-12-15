import React from 'react';
import { ArrowRight, Shield, Coins, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../lib/firebase/store';

export function Home() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Your Gateway to Cross-Chain DeFi Savings
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Secure, non-custodial wallet with seamless multi-chain staking opportunities
        </p>
        <Link
          to={user ? "/connect" : "/signin"}
          className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold transition-colors"
        >
          {user ? 'Connect Wallet' : 'Get Started'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Shield className="h-8 w-8 text-blue-400" />}
          title="Secure Authentication"
          description="Multiple authentication methods including Firebase and OAuth for maximum security"
        />
        <FeatureCard
          icon={<Wallet className="h-8 w-8 text-purple-400" />}
          title="Multi-Chain Support"
          description="Seamlessly manage assets across Ethereum, BSC, and Polygon networks"
        />
        <FeatureCard
          icon={<Coins className="h-8 w-8 text-green-400" />}
          title="DeFi Staking"
          description="Access top DeFi protocols like Aave and Compound for optimal yields"
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}