import { TurnkeyClient as TurnkeySDKClient, createActivityPoller } from '@turnkey/http';
import { turnkeyConfig } from '../config/settings';
import { ERROR_MESSAGES } from '../config/constants';

export class TurnkeyClient {
  private static instance: TurnkeyClient;
  private client: TurnkeySDKClient;

  private constructor() {
    this.client = new TurnkeySDKClient({
      baseUrl: turnkeyConfig.baseUrl,
      credentials: {
        apiPublicKey: turnkeyConfig.apiPublicKey,
        apiPrivateKey: turnkeyConfig.apiPrivateKey
      }
    });
  }

  public static getInstance(): TurnkeyClient {
    if (!TurnkeyClient.instance) {
      TurnkeyClient.instance = new TurnkeyClient();
    }
    return TurnkeyClient.instance;
  }

  public async createActivity(request: {
    type: string;
    organizationId: string;
    parameters: Record<string, any>;
    timestampMs: string;
  }) {
    try {
      return await this.client.createActivity(request);
    } catch (error) {
      console.error('Failed to create activity:', error);
      throw new Error(ERROR_MESSAGES.API.REQUEST_FAILED);
    }
  }

  public async pollActivity<T>(activityId: string): Promise<T> {
    const poller = createActivityPoller({
      client: this.client,
      activityId,
      timeoutMs: 60000 // 1 minute timeout
    });

    try {
      const result = await poller.poll();
      return result.result;
    } catch (error) {
      console.error('Failed to poll activity:', error);
      throw new Error(ERROR_MESSAGES.API.POLLING_FAILED);
    }
  }
}