import { WalletService } from './services/wallet';

class TurnkeyAPI {
  private static instance: TurnkeyAPI;
  private walletService: WalletService;

  private constructor() {
    this.walletService = WalletService.getInstance();
  }

  public static getInstance(): TurnkeyAPI {
    if (!TurnkeyAPI.instance) {
      TurnkeyAPI.instance = new TurnkeyAPI();
    }
    return TurnkeyAPI.instance;
  }

  public async createWallet(name: string) {
    return this.walletService.create(name);
  }

  public async signTransaction(address: string, transaction: any) {
    return this.walletService.signTransaction(address, transaction);
  }
}

export const turnkeyApi = TurnkeyAPI.getInstance();