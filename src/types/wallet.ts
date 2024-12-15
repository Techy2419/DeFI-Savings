export interface WalletState {
  address: string | null;
  chain: Chain;
  isConnected: boolean;
  balance: bigint;
}

export type Chain = 'ethereum' | 'bsc' | 'polygon';

export interface StakingPosition {
  protocol: string;
  amount: bigint;
  apy: number;
  rewards: bigint;
}