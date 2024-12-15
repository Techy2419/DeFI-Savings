import { parseApiResponse } from './response';
import { ApiResponse } from '../types/api';
import { getRequestHeaders } from './headers';

export async function makeRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const headers = getRequestHeaders(options.headers);
    
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'omit',
      mode: 'cors'
    });

    return parseApiResponse<T>(response);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Request failed'
    };
  }
}