import { turnkeyConfig } from '../config/settings';

interface RequestDetails {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: any;
}

interface ResponseDetails {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body?: any;
}

export class RequestLogger {
  static logRequest(details: RequestDetails) {
    console.group('🔄 Turnkey API Request');
    console.log('URL:', details.url);
    console.log('Method:', details.method);
    console.log('Headers:', this.sanitizeHeaders(details.headers));
    if (details.body) {
      console.log('Request Body:', JSON.stringify(details.body, null, 2));
    }
    console.groupEnd();
  }

  static logResponse(details: ResponseDetails) {
    console.group(`📥 Turnkey API Response (${details.status})`);
    console.log('Status:', details.status);
    console.log('Status Text:', details.statusText);
    console.log('Headers:', details.headers);
    if (details.body) {
      console.log('Response Body:', JSON.stringify(details.body, null, 2));
    }
    console.groupEnd();
  }

  private static sanitizeHeaders(headers: Record<string, string>): Record<string, string> {
    const sanitized = { ...headers };
    // Redact sensitive information
    if (sanitized['X-Api-Key']) {
      sanitized['X-Api-Key'] = '***redacted***';
    }
    return sanitized;
  }
}