import { TurnkeyClient, createActivityPoller } from '@turnkey/http';
import { createActivityRequest } from '../utils/activity-params';
import { RequestLogger } from '../utils/requestLogger';
import { ERROR_MESSAGES } from '../config/constants';
import { turnkeyConfig } from '../config/settings';

export class ActivityService {
  private static instance: ActivityService;
  private client: TurnkeyClient;
  private readonly POLLING_TIMEOUT = 60000; // 1 minute timeout
  private readonly POLLING_INTERVAL = 1000; // 1 second interval

  private constructor(client: TurnkeyClient) {
    this.client = client;
  }

  public static getInstance(client: TurnkeyClient): ActivityService {
    if (!ActivityService.instance) {
      ActivityService.instance = new ActivityService(client);
    }
    return ActivityService.instance;
  }

  public async submitActivity<T>(
    type: string,
    parameters: Record<string, any>
  ): Promise<T> {
    try {
      const request = createActivityRequest({
        type,
        organizationId: turnkeyConfig.organizationId,
        parameters
      });

      RequestLogger.logRequest({
        method: 'POST',
        url: `${turnkeyConfig.baseUrl}/v1/activities`,
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': turnkeyConfig.apiPublicKey,
          'X-Organization-Id': turnkeyConfig.organizationId
        },
        body: request
      });

      // Create activity
      const activity = await this.client.createActivity(request);
      
      if (!activity?.id) {
        throw new Error(ERROR_MESSAGES.API.INVALID_RESPONSE);
      }

      // Set up activity poller
      const poller = createActivityPoller({
        client: this.client,
        activityId: activity.id,
        timeoutMs: this.POLLING_TIMEOUT,
        intervalMs: this.POLLING_INTERVAL
      });

      // Poll for result
      const result = await poller.poll();

      RequestLogger.logResponse({
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'application/json'
        },
        body: result
      });

      return result.result as T;
    } catch (error) {
      console.error(`Activity submission failed (${type}):`, error);
      throw error;
    }
  }
}