import { useState, useEffect } from 'react';
import { OrganizationService } from '../services/organization';

export function useOrganization() {
  const [isOTPEnabled, setIsOTPEnabled] = useState<boolean | null>(null);
  const [isEnabling, setIsEnabling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const organizationService = OrganizationService.getInstance();

  const checkOTPStatus = async () => {
    try {
      const status = await organizationService.checkOTPAuthStatus();
      setIsOTPEnabled(status);
    } catch (err) {
      setError('Failed to check OTP status');
      setIsOTPEnabled(false);
    }
  };

  const enableOTPAuth = async () => {
    setIsEnabling(true);
    setError(null);

    try {
      const success = await organizationService.enableOTPAuth();
      if (success) {
        setIsOTPEnabled(true);
      } else {
        throw new Error('Failed to enable OTP Auth');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enable OTP Auth');
      setIsOTPEnabled(false);
    } finally {
      setIsEnabling(false);
    }
  };

  useEffect(() => {
    checkOTPStatus();
  }, []);

  return {
    isOTPEnabled,
    isEnabling,
    error,
    enableOTPAuth,
    checkOTPStatus
  };
}