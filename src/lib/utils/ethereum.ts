import { parseEther, type BigNumberish } from 'ethers';

export function formatEther(value: BigNumberish): string {
  return parseEther(value.toString()).toString();
}

export function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}