import { BaseService } from './base';
import { ACTIVITY_TYPES } from '../constants';

export class OrganizationService extends BaseService {
  private static instance: OrganizationService;

  private constructor() {
    super();
    this.validateConfig();
  }

  public static getInstance(): OrganizationService {
    if (!OrganizationService.instance) {
      OrganizationService.instance = new OrganizationService();
    }
    return OrganizationService.instance;
  }

  public async enableOTPAuth(): Promise<boolean> {
    try {
      const response = await this.submitActivity('ACTIVITY_TYPE_SET_ORGANIZATION_FEATURE', {
        name: 'FEATURE_NAME_OTP_EMAIL_AUTH'
      });

      return response.success;
    } catch (error) {
      console.error('Failed to enable OTP Auth:', error);
      return false;
    }
  }

  public async checkOTPAuthStatus(): Promise<boolean> {
    try {
      const response = await this.submitActivity('ACTIVITY_TYPE_GET_ORGANIZATION_FEATURES', {});
      return response.features?.includes('FEATURE_NAME_OTP_EMAIL_AUTH') ?? false;
    } catch (error) {
      console.error('Failed to check OTP Auth status:', error);
      return false;
    }
  }
}