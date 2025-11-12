import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const isTelegram = !!window.Telegram?.WebApp;
if (isTelegram) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}

const manifestUrl = '/tonconnect-manifest.json';  // Fallback to Tonkeeper if needed

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>
);
