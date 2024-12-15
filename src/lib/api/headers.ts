import { turnkeyConfig } from '../turnkey/config/settings';

export function getRequestHeaders(additionalHeaders?: HeadersInit): Headers {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Api-Key': turnkeyConfig.apiPublicKey,
    'X-Organization-Id': turnkeyConfig.organizationId
  });

  if (additionalHeaders) {
    const customHeaders = new Headers(additionalHeaders);
    customHeaders.forEach((value, key) => headers.set(key, value));
  }

  return headers;
}