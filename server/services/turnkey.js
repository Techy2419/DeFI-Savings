const { TurnkeyClient } = require('@turnkey/http');
const { logger } = require('../utils/logger');
const env = require('../config/env');

class TurnkeyService {
  constructor() {
    this.client = new TurnkeyClient({
      baseUrl: env.turnkey.baseUrl,
      credentials: {
        apiPublicKey: env.turnkey.apiPublicKey,
        apiPrivateKey: env.turnkey.apiPrivateKey
      }
    });
  }

  async createWallet(name) {
    try {
      logger.info(`Creating wallet: ${name}`);
      
      const activity = await this.client.createActivity({
        type: 'CREATE_WALLET',
        organizationId: env.turnkey.organizationId,
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
      return activity;
    } catch (error) {
      logger.error('Wallet creation failed:', error);
      throw error;
    }
  }

  async getActivity(activityId) {
    try {
      return await this.client.getActivity(activityId);
    } catch (error) {
      logger.error(`Failed to get activity ${activityId}:`, error);
      throw error;
    }
  }
}

module.exports = new TurnkeyService();