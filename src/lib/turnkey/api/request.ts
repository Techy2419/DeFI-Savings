import { turnkeyConfig } from '../config/settings';
import { ERROR_MESSAGES } from '../config/constants';
import { RequestLogger } from '../utils/requestLogger';
import type { ApiResponse } from '../types/api';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function makeRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  try {
    // Ensure we're using the correct Turnkey API endpoint
    const url = new URL(path, turnkeyConfig.baseUrl);
    
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Api-Key': turnkeyConfig.apiPublicKey,
      'X-Organization-Id': turnkeyConfig.organizationId,
      ...options.headers
    });

    // Log request details for debugging
    RequestLogger.logRequest({
      method: options.method || 'GET',
      url: url.toString(),
      headers: Object.fromEntries(headers.entries()),
      body: options.body
    });

    const response = await fetch(url.toString(), {
      ...options,
      headers,
      credentials: 'omit'
    });

    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      throw new Error('Invalid response content type');
    }

    // Log response for debugging
    RequestLogger.logResponse({
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: data
    });

    if (!response.ok) {
      throw new Error(data.error?.message || data.error || ERROR_MESSAGES.API.REQUEST_FAILED);
    }

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : ERROR_MESSAGES.API.REQUEST_FAILED
    };
  }
}