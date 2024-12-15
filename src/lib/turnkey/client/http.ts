import { turnkeyConfig } from '../config/settings';
import { ERROR_MESSAGES } from '../config/constants';

interface RequestOptions extends RequestInit {
  body?: any;
  requiresAuth?: boolean;
}

export async function makeRequest<T>(
  endpoint: string, 
  options: RequestOptions = {}
): Promise<T> {
  const url = `${turnkeyConfig.baseUrl}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  // Add authentication headers if required
  if (options.requiresAuth !== false) {
    headers['X-Api-Key'] = turnkeyConfig.apiPublicKey;
    headers['X-Organization-Id'] = turnkeyConfig.organizationId;
    
    // Add API Private Key hash for authenticated requests
    const timestamp = Date.now().toString();
    headers['X-Timestamp'] = timestamp;
    headers['X-Signature'] = generateSignature(timestamp, options.body);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...headers, ...options.headers },
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || ERROR_MESSAGES.API.REQUEST_FAILED);
    }

    return response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

function generateSignature(timestamp: string, body?: any): string {
  // Implement signature generation using API Private Key
  // This is a placeholder - implement actual signature logic
  return 'signature';
}