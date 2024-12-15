/**
 * Generate ISO timestamp in milliseconds for Turnkey API
 */
export function generateTimestamp(): string {
  return Date.now().toString();
}

/**
 * Validate timestamp format
 */
export function validateTimestamp(timestamp: string): boolean {
  const timestampNum = parseInt(timestamp, 10);
  return !isNaN(timestampNum) && timestampNum > 0;
}