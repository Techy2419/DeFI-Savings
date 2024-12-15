import React from 'react';
import { useParams } from 'react-router-dom';
import { ConnectionChoice } from '../components/wallet/ConnectionChoice';
import { ManualConnect } from '../components/wallet/ManualConnect';
import { AutomaticConnect } from '../components/wallet/AutomaticConnect';

export function Connect() {
  const { type } = useParams<{ type?: string }>();

  if (type === 'manual') {
    return <ManualConnect />;
  }
  
  if (type === 'automatic') {
    return <AutomaticConnect />;
  }

  return <ConnectionChoice />;
}