import { ApiKeyService } from '../services/ApiKeyService';
import { TokenService } from '../services/TokenService';
import { ERROR_CODES } from '../constants';
import type { AuthError } from '../types';

export class AuthMiddleware {
  private static instance: AuthMiddleware;
  private apiKeyService: ApiKeyService;
  private tokenService: TokenService;

  private constructor() {
    this.apiKeyService = ApiKeyService.getInstance();
    this.tokenService = TokenService.getInstance();
  }

  public static getInstance(): AuthMiddleware {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  public async authenticate(headers: Headers): Promise<{ userId: string; scopes: string[] }> {
    const authHeader = headers.get('Authorization');
    
    if (!authHeader) {
      throw this.createError(
        ERROR_CODES.INVALID_TOKEN,
        'No authentication credentials provided'
      );
    }

    const [type, credentials] = authHeader.split(' ');

    switch (type.toLowerCase()) {
      case 'bearer':
        return this.validateBearerToken(credentials);
      case 'apikey':
        return this.validateApiKey(credentials);
      default:
        throw this.createError(
          ERROR_CODES.INVALID_TOKEN,
          'Invalid authentication type'
        );
    }
  }

  public validateScope(requiredScopes: string[], userScopes: string[]): boolean {
    return requiredScopes.every(scope => userScopes.includes(scope));
  }

  private async validateBearerToken(token: string) {
    return this.tokenService.validateToken(token);
  }

  private async validateApiKey(key: string) {
    const apiKey = await this.apiKeyService.validateApiKey(key);
    return {
      userId: apiKey.userId,
      scopes: apiKey.scopes
    };
  }

  private createError(code: string, message: string): AuthError {
    return { code, message };
  }
}