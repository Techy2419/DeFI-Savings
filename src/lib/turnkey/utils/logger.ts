import { ApiResponse } from '../types/api';

export function logApiResponse(endpoint: string, response: Response, data?: any) {
  console.group(`Turnkey API Response - ${endpoint}`);
  console.log('Status:', response.status);
  console.log('Status Text:', response.statusText);
  console.log('Headers:', Object.fromEntries(response.headers.entries()));
  if (data) {
    console.log('Response Data:', data);
  }
  console.groupEnd();
}

export function logApiError(endpoint: string, error: unknown) {
  console.group(`Turnkey API Error - ${endpoint}`);
  if (error instanceof Error) {
    console.error('Error Message:', error.message);
    console.error('Stack Trace:', error.stack);
  } else {
    console.error('Unknown Error:', error);
  }
  console.groupEnd();
}

export function logActivityResult(activityId: string, result: any) {
  console.group(`Turnkey Activity Result - ${activityId}`);
  console.log('Activity Result:', result);
  console.groupEnd();
}