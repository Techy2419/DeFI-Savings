import React from 'react';

interface ErrorDisplayProps {
  error: string | null;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
      {error}
    </div>
  );
}