import { logger } from '../utils/logger.js';

export function validateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  const organizationId = req.headers['x-organization-id'];

  if (!apiKey || !organizationId) {
    logger.warn('Missing required headers');
    return res.status(401).json({ error: 'Missing authentication headers' });
  }

  if (apiKey !== process.env.VITE_TURNKEY_API_PUBLIC_KEY ||
      organizationId !== process.env.VITE_TURNKEY_ORGANIZATION_ID) {
    logger.warn('Invalid API credentials');
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  next();
}