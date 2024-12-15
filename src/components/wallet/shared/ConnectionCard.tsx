import React, { ReactNode } from 'react';

interface ConnectionCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export function ConnectionCard({ icon, title, children }: ConnectionCardProps) {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-center mb-6">
          {icon}
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
}