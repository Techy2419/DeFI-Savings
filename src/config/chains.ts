import { Chain } from '../types/wallet';

export const SUPPORTED_CHAINS: Record<Chain, {
  name: string;
  rpcUrl: string;
  chainId: number;
  symbol: string;
  blockExplorer: string;
}> = {
  ethereum: {
    name: 'Ethereum',
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/',
    chainId: 1,
    symbol: 'ETH',
    blockExplorer: 'https://etherscan.io'
  },
  bsc: {
    name: 'BNB Smart Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    chainId: 56,
    symbol: 'BNB',
    blockExplorer: 'https://bscscan.com'
  },
  polygon: {
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    chainId: 137,
    symbol: 'MATIC',
    blockExplorer: 'https://polygonscan.com'
  }
};