interface EnvConfig {
  turnkey: {
    baseUrl: string;
    organizationId: string;
    apiPublicKey: string;
    apiPrivateKey: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

const requiredEnvVars = [
  'VITE_TURNKEY_API_BASE_URL',
  'VITE_TURNKEY_ORGANIZATION_ID',
  'VITE_TURNKEY_API_PUBLIC_KEY',
  'VITE_TURNKEY_API_PRIVATE_KEY',
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
] as const;

function getEnvVar(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    console.warn(`Warning: Environment variable ${key} is not set`);
  }
  return value || '';
}

export const envConfig: EnvConfig = {
  turnkey: {
    baseUrl: getEnvVar('VITE_TURNKEY_API_BASE_URL'),
    organizationId: getEnvVar('VITE_TURNKEY_ORGANIZATION_ID'),
    apiPublicKey: getEnvVar('VITE_TURNKEY_API_PUBLIC_KEY'),
    apiPrivateKey: getEnvVar('VITE_TURNKEY_API_PRIVATE_KEY')
  },
  firebase: {
    apiKey: getEnvVar('VITE_FIREBASE_API_KEY'),
    authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('VITE_FIREBASE_APP_ID')
  }
};

export function validateEnvConfig(): void {
  const missingVars = requiredEnvVars.filter(key => !getEnvVar(key));
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars.join(', '));
    console.error('Please check your .env file and ensure all required variables are set.');
    throw new Error('Missing required environment variables');
  }
}