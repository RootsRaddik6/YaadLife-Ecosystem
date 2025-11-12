import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// === BABY STEP 1: Detect Telegram Mini App ===
const isTelegram = !!window.Telegram?.WebApp;

if (isTelegram) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}

// === BABY STEP 2: Choose correct config ===
const manifestUrl = isTelegram
  ? '/testnet-config.json'           // Use testnet inside Telegram
  : 'https://ton.org/tonconnect-manifest.json'; // Fallback

// === BABY STEP 3: Force @wallet in Telegram ===
const uiOptions = isTelegram
  ? { universalLink: 'https://t.me/wallet?attach=tonconnect' }
  : {};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TonConnectUIProvider manifestUrl={manifestUrl} uiOptions={uiOptions}>
    <App />
  </TonConnectUIProvider>
);
