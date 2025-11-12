import React, { useState } from 'react';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';

export default function App() {
  const [region, setRegion] = useState('Montego Bay');
  const [villaId, setVillaId] = useState('Villa001');
  const [amount, setAmount] = useState(10);
  const [isLynk, setIsLynk] = useState(false);
  const [tonConnectUI] = useTonConnectUI();

  const handleBook = () => {
    if (!tonConnectUI?.connected) {
      alert('Connect TON wallet first!');
      return;
    }
    alert(`Booked ${villaId} in ${region}!\nSBT Minted.`);
  };

  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #000428, #004e92)',
      color: 'gold',
      fontFamily: 'Arial'
    }}>
      <h1>YaadVibe Villas</h1>
      <img src="https://raw.githubusercontent.com/RootsRaddik6/YaadLife-Ecosystem/main/YaadVibe/IMG_0039.jpeg" alt="Yaad" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px' }} />
      
      <select value={region} onChange={e => setRegion(e.target.value)}>
        <option>Montego Bay</option>
        <option>Ocho Rios</option>
        <option>Negril</option>
      </select><br/><br/>

      <input placeholder="Villa ID" value={villaId} onChange={e => setVillaId(e.target.value)} /><br/><br/>
      <input type="number" placeholder="TON" value={amount} onChange={e => setAmount(e.target.value)} /><br/><br/>
      <label>
        <input type="checkbox" checked={isLynk} onChange={e => setIsLynk(e.target.checked)} />
        Pay via Lynk
      </label><br/><br/>

      <TonConnectButton /><br/><br/>
      <button onClick={handleBook} style={{
        background: 'gold',
        color: 'black',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold'
      }}>
        Book & Mint SBT
      </button>
    </div>
  );
}
