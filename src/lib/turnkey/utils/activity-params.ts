import { ACTIVITY_PARAMS } from '../config/constants';

export function createWalletParameters(name: string) {
  return {
    type: ACTIVITY_TYPES.CREATE_WALLET,
    parameters: {
      walletName: name,
      type: "WALLET_TYPE_ETHEREUM",
      accounts: [ACTIVITY_PARAMS.ETHEREUM_ACCOUNT]
    },
    timestampMs: Date.now().toString()
  };
}