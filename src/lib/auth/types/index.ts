export interface ApiKey {
  id: string;
  key: string;
  userId: string;
  name: string;
  expiresAt: Date;
  lastUsed?: Date;
  scopes: string[];
}

export interface ApiKeyCreateRequest {
  name: string;
  expiresIn?: number; // Duration in seconds
  scopes?: string[];
}

export interface AuthToken {
  token: string;
  expiresAt: number;
  refreshToken?: string;
}

export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, any>;
}