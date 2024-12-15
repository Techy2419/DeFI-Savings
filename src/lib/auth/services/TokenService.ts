import { sign, verify } from 'jsonwebtoken';
import { AUTH_CONSTANTS, ERROR_CODES } from '../constants';
import type { AuthToken, AuthError } from '../types';

export class TokenService {
  private static instance: TokenService;
  private readonly secretKey: string;

  private constructor() {
    // In production, load from secure environment variable
    this.secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';
  }

  public static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  public createToken(userId: string, scopes: string[]): AuthToken {
    const expiresAt = Math.floor(Date.now() / 1000) + AUTH_CONSTANTS.TOKEN_EXPIRY;
    
    const token = sign(
      { 
        sub: userId,
        scopes,
        exp: expiresAt
      },
      this.secretKey
    );

    return {
      token,
      expiresAt,
      refreshToken: this.createRefreshToken(userId)
    };
  }

  public validateToken(token: string): { userId: string; scopes: string[] } {
    try {
      const decoded = verify(token, this.secretKey) as any;
      
      return {
        userId: decoded.sub,
        scopes: decoded.scopes
      };
    } catch (error) {
      throw this.createError(
        ERROR_CODES.INVALID_TOKEN,
        'Invalid or expired token'
      );
    }
  }

  private createRefreshToken(userId: string): string {
    return sign(
      { 
        sub: userId,
        exp: Math.floor(Date.now() / 1000) + AUTH_CONSTANTS.REFRESH_TOKEN_EXPIRY
      },
      this.secretKey
    );
  }

  private createError(code: string, message: string): AuthError {
    return { code, message };
  }
}