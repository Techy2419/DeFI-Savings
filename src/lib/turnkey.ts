import { TurnkeyClient } from '@turnkey/http';
import { WebauthnStamper } from '@turnkey/webauthn-stamper';
import { createWalletClient, custom } from 'viem';
import { SUPPORTED_CHAINS } from '../config/chains';
import { Chain } from '../types/wallet';

export class TurnkeyService {
  private client: TurnkeyClient;
  private stamper: WebauthnStamper;

  constructor() {
    const baseUrl = import.meta.env.VITE_TURNKEY_API_BASE_URL;
    const organizationId = import.meta.env.VITE_TURNKEY_ORGANIZATION_ID;

    if (!baseUrl || !organizationId) {
      throw new Error('Missing required environment variables. Please check your .env file.');
    }

    this.stamper = new WebauthnStamper({
      rpId: window.location.hostname,
      organizationId,
      baseUrl
    });

    this.client = new TurnkeyClient({
      baseUrl
    });
  }

  async createWallet(chain: Chain) {
    try {
      const chainConfig = SUPPORTED_CHAINS[chain];
      
      const walletClient = createWalletClient({
        transport: custom(window.ethereum),
        chain: chainConfig
      });

      const { signedRequest } = await this.stamper.stamp({
        type: "CREATE_WALLET",
        organizationId: import.meta.env.VITE_TURNKEY_ORGANIZATION_ID,
        parameters: {
          walletName: `${chain}-wallet`,
        }
      });

      const response = await this.client.submitSignedRequest(signedRequest);
      return response.wallet;
    } catch (error) {
      console.error('Error creating wallet:', error);
      throw error;
    }
  }

  async signTransaction(transaction: any) {
    try {
      const { signedRequest } = await this.stamper.stamp({
        type: "SIGN_TRANSACTION",
        organizationId: import.meta.env.VITE_TURNKEY_ORGANIZATION_ID,
        parameters: {
          transaction
        }
      });

      return await this.client.submitSignedRequest(signedRequest);
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  }
}