export class TurnkeyAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'TurnkeyAPIError';
  }
}

export function handleAPIError(error: unknown): never {
  if (error instanceof TurnkeyAPIError) {
    throw error;
  }

  if (error instanceof Error) {
    throw new TurnkeyAPIError(error.message);
  }

  throw new TurnkeyAPIError('An unknown error occurred');
}