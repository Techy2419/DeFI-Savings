import { makeApiRequest } from './api';
import { API_ENDPOINTS } from '../config/endpoints';
import type { CreateWalletResult, WalletResponse } from '../types';

export async function createWallet(name: string): Promise<WalletResponse> {
  const response = await makeApiRequest<CreateWalletResult>(API_ENDPOINTS.wallets.create, {
    method: 'POST',
    body: JSON.stringify({
      name,
      type: 'WALLET_TYPE_ETHEREUM',
      accounts: [{
        curve: 'CURVE_SECP256K1',
        pathFormat: 'PATH_FORMAT_BIP32',
        path: "m/44'/60'/0'/0/0",
        addressFormat: 'ADDRESS_FORMAT_ETHEREUM'
      }]
    })
  });

  if (!response.success) {
    return {
      success: false,
      error: response.error
    };
  }

  const { data } = response;
  return {
    success: true,
    wallet: {
      id: data.wallet.id,
      address: data.wallet.address
    }
  };
}