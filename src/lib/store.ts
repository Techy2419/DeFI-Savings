import { create } from 'zustand';
import { Chain, WalletState } from '../types/wallet';

interface Store extends WalletState {
  connect: (address: string, chain: Chain) => void;
  disconnect: () => void;
  updateBalance: (balance: bigint) => void;
  switchChain: (chain: Chain) => void;
}

export const useWalletStore = create<Store>((set) => ({
  address: null,
  chain: 'ethereum',
  isConnected: false,
  balance: BigInt(0),
  
  connect: (address, chain) => set({ 
    address, 
    chain, 
    isConnected: true 
  }),
  
  disconnect: () => set({ 
    address: null, 
    isConnected: false, 
    balance: BigInt(0) 
  }),
  
  updateBalance: (balance) => set({ balance }),
  
  switchChain: (chain) => set({ chain })
}));