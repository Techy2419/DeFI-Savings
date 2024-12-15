import { TurnkeyClient } from '@turnkey/http';
import { turnkeyConfig } from '../config/settings';
import { validateConfig } from '../utils/validation';

export class BaseService {
  protected client: TurnkeyClient;

  constructor() {
    this.validateAndInitialize();
  }

  private validateAndInitialize() {
    validateConfig({
      baseUrl: turnkeyConfig.baseUrl,
      organizationId: turnkeyConfig.organizationId,
      apiPublicKey: turnkeyConfig.apiPublicKey,
      apiPrivateKey: turnkeyConfig.apiPrivateKey
    });

    this.client = new TurnkeyClient({
      baseUrl: turnkeyConfig.baseUrl,
      credentials: {
        apiPublicKey: turnkeyConfig.apiPublicKey,
        apiPrivateKey: turnkeyConfig.apiPrivateKey
      }
    });
  }
}