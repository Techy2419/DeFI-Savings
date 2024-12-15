import { ERROR_MESSAGES } from '../config/constants';
import type { ApiResponse } from '../types/api';

export function validateApiResponse<T>(response: ApiResponse<T>): void {
  if (!response.success) {
    throw new Error(response.error || ERROR_MESSAGES.API.INVALID_RESPONSE);
  }
}

export function validateConfig(config: Record<string, string | undefined>): void {
  const missingKeys = Object.entries(config)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing required configuration: ${missingKeys.join(', ')}`
    );
  }
}