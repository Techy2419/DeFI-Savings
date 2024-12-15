export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface RequestLogEntry {
  timestamp: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: any;
}

export interface ResponseLogEntry {
  timestamp: string;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body?: any;
}