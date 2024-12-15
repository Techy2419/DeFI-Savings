import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { envConfig } from '../config/env';

const firebaseConfig = {
  apiKey: envConfig.firebase.apiKey,
  authDomain: envConfig.firebase.authDomain,
  projectId: envConfig.firebase.projectId,
  storageBucket: envConfig.firebase.storageBucket,
  messagingSenderId: envConfig.firebase.messagingSenderId,
  appId: envConfig.firebase.appId
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);