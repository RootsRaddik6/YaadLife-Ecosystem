import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// === DETECT TELEGRAM MINI APP ===
const isTelegram = !!window.Telegram?.WebApp;

if (isTelegram) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}

// === ALWAYS USE REAL MANIFEST ===
const manifestUrl = '/tonconnect-manifest.json';

// === FORCE @wallet IN TELEGRAM ===
const uiOptions = isTelegram
  ? {
      universalLink: 'https://t.me/wallet?attach=tonconnect',
      bridgeUrl: 'https://bridge.tonapi.io/bridge'
    }
  : {};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TonConnectUIProvider manifestUrl={manifestUrl} uiOptions={uiOptions}>
    <App />
  </TonConnectUIProvider>
);
