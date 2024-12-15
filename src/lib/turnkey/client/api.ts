import { turnkeyConfig } from '../config/settings';
import { ERROR_MESSAGES } from '../config/constants';
import type { ApiResponse } from '../types/api';

export async function makeApiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `/api/v1${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': turnkeyConfig.apiPublicKey,
    'X-Organization-Id': turnkeyConfig.organizationId,
    ...options.headers
  };

  try {
    console.log('Making API request to:', url);
    
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include'
    });

    console.log('API response status:', response.status);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('API request failed:', error);
      return {
        success: false,
        error: error.message || ERROR_MESSAGES.API.REQUEST_FAILED
      };
    }

    const data = await response.json();
    console.log('API request successful:', data);
    
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : ERROR_MESSAGES.API.REQUEST_FAILED
    };
  }
}