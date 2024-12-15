import { nanoid } from 'nanoid';
import { AUTH_CONSTANTS, ERROR_CODES } from '../constants';
import type { ApiKey, ApiKeyCreateRequest, AuthError } from '../types';

export class ApiKeyService {
  private static instance: ApiKeyService;

  private constructor() {}

  public static getInstance(): ApiKeyService {
    if (!ApiKeyService.instance) {
      ApiKeyService.instance = new ApiKeyService();
    }
    return ApiKeyService.instance;
  }

  public async createApiKey(userId: string, request: ApiKeyCreateRequest): Promise<ApiKey> {
    try {
      const existingKeys = await this.getUserApiKeys(userId);
      
      if (existingKeys.length >= AUTH_CONSTANTS.MAX_API_KEYS_PER_USER) {
        throw this.createError(ERROR_CODES.API_KEY_LIMIT, 'Maximum number of API keys reached');
      }

      const apiKey: ApiKey = {
        id: nanoid(),
        key: this.generateSecureKey(),
        userId,
        name: request.name,
        expiresAt: new Date(Date.now() + (request.expiresIn || AUTH_CONSTANTS.TOKEN_EXPIRY) * 1000),
        scopes: request.scopes || []
      };

      // Store API key securely (implement secure storage)
      await this.storeApiKey(apiKey);

      return apiKey;
    } catch (error) {
      console.error('Failed to create API key:', error);
      throw error;
    }
  }

  public async validateApiKey(key: string): Promise<ApiKey> {
    const apiKey = await this.findApiKey(key);
    
    if (!apiKey) {
      throw this.createError(ERROR_CODES.INVALID_API_KEY, 'Invalid API key');
    }

    if (new Date() > apiKey.expiresAt) {
      throw this.createError(ERROR_CODES.EXPIRED_TOKEN, 'API key has expired');
    }

    // Update last used timestamp
    await this.updateLastUsed(apiKey.id);

    return apiKey;
  }

  private generateSecureKey(): string {
    return nanoid(AUTH_CONSTANTS.API_KEY_MIN_LENGTH);
  }

  private async storeApiKey(apiKey: ApiKey): Promise<void> {
    // Implement secure storage (e.g., encrypted database)
    console.log('Storing API key:', apiKey);
  }

  private async findApiKey(key: string): Promise<ApiKey | null> {
    // Implement secure retrieval
    return null;
  }

  private async updateLastUsed(keyId: string): Promise<void> {
    // Implement last used timestamp update
  }

  private async getUserApiKeys(userId: string): Promise<ApiKey[]> {
    // Implement retrieval of user's API keys
    return [];
  }

  private createError(code: string, message: string): AuthError {
    return { code, message };
  }
}