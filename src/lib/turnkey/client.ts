import { TurnkeyClient } from '@turnkey/http';
import { turnkeyConfig } from './config';

export class TurnkeyClientService {
  private static instance: TurnkeyClientService;
  private client: TurnkeyClient;

  private constructor() {
    this.client = new TurnkeyClient({
      baseUrl: turnkeyConfig.baseUrl,
      headers: {
        'X-Api-Key': turnkeyConfig.apiPublicKey,
        'X-Organization-Id': turnkeyConfig.organizationId
      }
    });
  }

  public static getInstance(): TurnkeyClientService {
    if (!TurnkeyClientService.instance) {
      TurnkeyClientService.instance = new TurnkeyClientService();
    }
    return TurnkeyClientService.instance;
  }

  public getClient(): TurnkeyClient {
    return this.client;
  }
}