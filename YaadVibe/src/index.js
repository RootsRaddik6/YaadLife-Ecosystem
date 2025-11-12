import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/RootsRaddik6/YaadLife-Ecosystem/main/YaadVibe/public/tonconnect-manifest.json">
    <App />
  </TonConnectUIProvider>
);
