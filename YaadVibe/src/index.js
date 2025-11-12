import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// === TMA DETECTION ===
const isTelegram = !!window.Telegram?.WebApp;

if (isTelegram) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}

// === BULLETPROOF MANIFEST (GITHUB RAW) ===
const manifestUrl = 'https://raw.githubusercontent.com/rootsraddik6/YaadLife-Ecosystem/main/tonconnect-manifest.json';

// === TMA-SPECIFIC OPTIONS (@wallet Priority + Return Strategy) ===
const uiOptions = isTelegram
  ? {
      universalLink: 'https://t.me/wallet?attach=tonconnect',
      twaReturnUrl: 'https://t.me/YaadLifeBot/app?startapp=return',  // Redirect back to Mini App
      manifestUrl: manifestUrl  // Explicit for TMA
    }
  : {
      manifestUrl: manifestUrl
    };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TonConnectUIProvider manifestUrl={manifestUrl} uiOptions={uiOptions}>
    <App />
  </TonConnectUIProvider>
);
