import { ApiResponse, ApiError } from '../types/api';

export async function parseApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  try {
    const contentType = response.headers.get('content-type');
    
    // Check if response is JSON
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format: Expected JSON');
    }

    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: data.message || `Request failed with status: ${response.status}`
      };
    }

    return {
      success: true,
      data
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to parse response'
    };
  }
}