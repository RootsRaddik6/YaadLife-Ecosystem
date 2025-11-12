import React, { useState } from 'react';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';

function App() {
  const [region, setRegion] = useState('Montego Bay');
  const [villaId, setVillaId] = useState('Villa001');
  const [amount, setAmount] = useState(100);
  const [isLynk, setIsLynk] = useState(false);
  const [tonConnectUI] = useTonConnectUI();

const handleBook = async () => {
  if (!tonConnectUI?.connected) {
    alert('Connect TON wallet first!');
    return;
  }
  // Sim airdrop: 100 $DOGS reward (your 13k+ $DOGS stack covers 130+ bookings)
  console.log(`Airdropping 100 $DOGS + minting SBT for ${villaId} in ${region}`);
  alert(`Booked ${villaId} in ${region}!\nSBT Minted + 100 $DOGS Airdropped.\nPowered by your 13,381 $DOGS stack`);
  // TODO: Real TonWeb call to contract + $DOGS transfer
};
  return (
    <div style={{
      padding: '20px', textAlign: 'center', minHeight: '100vh',
      background: 'linear-gradient(to bottom, #000428, #004e92)', color: 'gold'
    }}>
      <h1>YaadVibe Villas</h1>
      <img src="/visuals/IMG_0039.jpeg" alt="Yaad" style={{ maxWidth: '100%', borderRadius: '12px', margin: '20px 0' }} />
      <select value={region} onChange={e => setRegion(e.target.value)}>
        <option>Montego Bay</option>
        <option>Ocho Rios</option>
        <option>Negril</option>
      </select><br/>
      <input placeholder="Villa ID" value={villaId} onChange={e => setVillaId(e.target.value)} style={{margin: '10px', padding: '10px'}} /><br/>
      <input type="number" placeholder="TON" value={amount} onChange={e => setAmount(e.target.value)} style={{margin: '10px', padding: '10px'}} /><br/>
      <label><input type="checkbox" checked={isLynk} onChange={e => setIsLynk(e.target.checked)} /> Lynk?</label><br/>
      <TonConnectButton />
      <br/><br/>
      <button onClick={handleBook} style={{
        margin: '20px', padding: '15px 30px', background: 'gold', color: '#000428',
        border: 'none', borderRadius: '50px', fontWeight: 'bold', fontSize: '18px'
      }}>
        Book & Mint SBT
      </button>
    </div>
  );
}

export default App;
