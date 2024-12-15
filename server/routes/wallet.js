import { Router } from 'express';
import { TurnkeyClient } from '@turnkey/http';
import { logger } from '../utils/logger.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validateApiKey } from '../middleware/auth.js';

const router = Router();

// Initialize Turnkey client
const turnkeyClient = new TurnkeyClient({
  baseUrl: process.env.VITE_TURNKEY_API_BASE_URL,
  credentials: {
    apiPublicKey: process.env.VITE_TURNKEY_API_PUBLIC_KEY,
    apiPrivateKey: process.env.VITE_TURNKEY_API_PRIVATE_KEY
  }
});

// Create wallet endpoint
router.post('/', validateApiKey, asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      error: 'Wallet name is required'
    });
  }

  logger.info(`Creating wallet: ${name}`);

  const activity = await turnkeyClient.createActivity({
    type: 'CREATE_WALLET',
    organizationId: process.env.VITE_TURNKEY_ORGANIZATION_ID,
    parameters: {
      walletName: name,
      type: 'WALLET_TYPE_ETHEREUM',
      accounts: [{
        curve: 'CURVE_SECP256K1',
        pathFormat: 'PATH_FORMAT_BIP32',
        path: "m/44'/60'/0'/0/0",
        addressFormat: 'ADDRESS_FORMAT_ETHEREUM'
      }]
    },
    timestampMs: Date.now().toString()
  });

  logger.info(`Wallet creation activity initiated: ${activity.id}`);

  // Get the activity result
  const result = await turnkeyClient.getActivity(activity.id);

  if (!result?.wallet?.address) {
    logger.error('Wallet creation failed: No address returned');
    return res.status(400).json({
      success: false,
      error: 'Failed to create wallet'
    });
  }

  res.json({
    success: true,
    wallet: {
      id: result.wallet.id,
      address: result.wallet.address
    }
  });
}));

export default router;