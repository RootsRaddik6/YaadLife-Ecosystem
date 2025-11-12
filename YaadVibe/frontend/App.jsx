import { useState } from 'react';
import { useWebApp } from '@twa/tonconnect';

const villas = [
  { id: 'Villa Irie', region: 'Montego Bay', price: 500, img: 'https://raw.githubusercontent.com/RootsRaddik6/YaadLife-Ecosystem/main/YaadVibe/visuals/villa1.jpg' },
  { id: 'SeaView Haven', region: 'Negril', price: 750, img: 'https://raw.githubusercontent.com/RootsRaddik6/YaadLife-Ecosystem/main/YaadVibe/visuals/villa2.jpg' },
  { id: 'Moonrise Palace', region: 'Ocho Rios', price: 1000, img: 'https://raw.githubusercontent.com/RootsRaddik6/YaadLife-Ecosystem/main/YaadVibe/visuals/villa3.jpg' }
];

export default function App() {
  const webApp = useWebApp();
  const [selected, setSelected] = useState(villas[0]);

  const book = async () => {
    const payload = {
      region: selected.region,
      villa_id: selected.id,
      amount: selected.price * 1e9,
      is_lynk: true
    };
    await webApp.sendData(JSON.stringify(payload));
    webApp.showAlert(`Booked ${selected.id}! SBT Minted.`);
  };

  return (
    <div style={{ background: '#0A3D62', color: '#FFD700', minHeight: '100vh', padding: '16px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>YaadVibe</h1>
      
      <div style={{ display: 'grid', gap: '16px' }}>
        {villas.map(villa => (
          <div
            key={villa.id}
            onClick={() => setSelected(villa)}
            style={{
              border: selected.id === villa.id ? '3px solid #FFD700' : '1px solid #444',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            <img src={villa.img} alt={villa.id} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '12px' }}>
              <h3>{villa.id}</h3>
              <p>{villa.region} • {villa.price} TON</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={book}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#FFD700',
          color: '#0A3D62',
          padding: '16px 40px',
          border: 'none',
          borderRadius: '16px',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          width: '90%',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
        }}
      >
        Book {selected.id} → Mint SBT
      </button>
    </div>
  );
}
