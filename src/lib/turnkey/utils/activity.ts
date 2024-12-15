import { TurnkeyClient } from '@turnkey/http';
import { logActivityResult } from './logger';
import { RequestLogger } from './requestLogger';
import { ERROR_MESSAGES } from '../config/constants';
import { API_ENDPOINTS } from '../config/endpoints';
import { turnkeyConfig } from '../config/settings';

export async function submitAndPollActivity<T>(
  client: TurnkeyClient,
  type: string,
  parameters: Record<string, any>
): Promise<T> {
  try {
    const requestBody = {
      type,
      organizationId: turnkeyConfig.organizationId,
      parameters,
      timestampMs: Date.now().toString()
    };

    // Log request details
    RequestLogger.logRequest({
      method: 'POST',
      url: `${turnkeyConfig.baseUrl}${API_ENDPOINTS.activities.create}`,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': turnkeyConfig.apiPublicKey,
        'X-Organization-Id': turnkeyConfig.organizationId
      },
      body: requestBody
    });

    // Create activity
    const activity = await client.createActivity(requestBody);

    // Log activity creation response
    RequestLogger.logResponse({
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json'
      },
      body: activity
    });

    // Poll for result
    const result = await client.getActivity(activity.id);
    
    // Log polling response
    RequestLogger.logResponse({
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json'
      },
      body: result
    });

    if (!result) {
      throw new Error(ERROR_MESSAGES.API.POLLING_FAILED);
    }

    return result as T;
  } catch (error) {
    console.error(`Activity submission failed (${type}):`, error);
    throw error;
  }
}