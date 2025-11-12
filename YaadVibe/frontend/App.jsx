import { useState } from 'react';
import { useWebApp } from '@twa/tonconnect';

export default function App() {
  const webApp = useWebApp();
  const [region, setRegion] = useState('Montego Bay');
  const [villa, setVilla] = useState('Villa Irie');
  const [amount, setAmount] = useState(500);

  const book = async () => {
    const payload = {
      region,
      villa_id: villa,
      amount: amount * 1e9, // TON
      is_lynk: true
    };
    await webApp.sendData(JSON.stringify(payload));
    webApp.showAlert(`Booked ${villa}! SBT Minted.`);
  };

  return (
    <div style={{
      background: '#0A3D62',
      color: '#FFD700',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial'
    }}>
      <h1>YaadVibe 🌴</h1>
      <h3>Book Villa → Earn SBT</h3>

      <select value={region} onChange={e => setRegion(e.target.value)}>
        <option>Montego Bay</option>
        <option>Negril</option>
        <option>Ocho Rios</option>
      </select>

      <select value={villa} onChange={e => setVilla(e.target.value)}>
        <option>Villa Irie</option>
        <option>SeaView Haven</option>
        <option>Moonrise Palace</option>
      </select>

      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="TON Amount"
      />

      <button
        onClick={book}
        style={{
          background: '#FFD700',
          color: '#0A3D62',
          padding: '16px 32px',
          border: 'none',
          borderRadius: '12px',
          fontWeight: 'bold',
          marginTop: '20px'
        }}
      >
        Book & Mint SBT
      </button>
    </div>
  );
}
