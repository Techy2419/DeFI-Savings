import React from 'react';
import { Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ConnectionOption {
  id: 'manual' | 'automatic';
  title: string;
  description: string;
  icon: React.ReactNode;
  recommended?: boolean;
  benefits: string[];
}

const CONNECTION_OPTIONS: ConnectionOption[] = [
  {
    id: 'manual',
    title: 'Manual Connection',
    description: 'Enhanced security for your transactions',
    icon: <Shield className="h-8 w-8 text-blue-400" />,
    recommended: true,
    benefits: [
      'Enhanced security for your transactions',
      'Full control over wallet interactions',
      'Ideal for DeFi operations and high-value transfers',
      'Connect wallet only when needed'
    ]
  },
  {
    id: 'automatic',
    title: 'Automatic Connection',
    description: 'Faster access to app features',
    icon: <Zap className="h-8 w-8 text-purple-400" />,
    benefits: [
      'Faster access to app features',
      'Seamless user experience',
      'Best for frequent, low-risk transactions'
    ]
  }
];

export function ConnectionChoice() {
  const navigate = useNavigate();

  const handleConnectionChoice = (type: 'manual' | 'automatic') => {
    navigate(`/connect/${type}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-8">
        Choose Your Connection Method
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {CONNECTION_OPTIONS.map((option) => (
          <div
            key={option.id}
            className="relative bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
            onClick={() => handleConnectionChoice(option.id)}
          >
            {option.recommended && (
              <div className="absolute -top-3 left-4 px-3 py-1 bg-blue-500 text-sm rounded-full">
                Recommended
              </div>
            )}
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gray-700 rounded-lg">
                {option.icon}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-400 mb-4">{option.description}</p>
                
                <ul className="space-y-2">
                  {option.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-gray-400">
        For your security, manual connection is recommended when performing sensitive operations or handling significant assets.
      </p>
    </div>
  );
}