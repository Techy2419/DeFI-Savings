import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { validateEnvConfig } from './lib/config/env';
import App from './App';
import './index.css';

// Validate environment variables before starting the app
validateEnvConfig();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);