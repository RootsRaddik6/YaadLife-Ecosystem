import React, { useState } from 'react';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import data from './data.json';
import Calendar from './Calendar';

export default function App() {
  const [step, setStep] = useState('browse'); // browse, accom, flights, transport, meals, attractions, calendar, confirm
  const [selected, setSelected] = useState({});
  const [isLocal, setIsLocal] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [dates, setDates] = useState({ startDate: new Date(), endDate: addDays(new Date(), 7) });

  const handleNext = (choice) => {
    setSelected({ ...selected, [step]: choice });
    if (step === 'browse') setStep('accom');
    else if (step === 'accom') setStep(isLocal ? 'transport' : 'flights');
    else if (step === 'flights') setStep('transport');
    else if (step === 'transport') setStep('meals');
    else if (step === 'meals') setStep('attractions');
    else if (step === 'attractions') setStep('calendar');
    else if (step === 'calendar') handleConfirm();
  };

  const handleDatesChange = (range) => {
    setDates(range);
  };

  const handleConfirm = async () => {
    if (!tonConnectUI.connected) {
      alert('Connect wallet to mint booking SBT!');
      return;
    }
    // Simulate mint with full booking data
    const bookingData = { ...selected, dates, wallet: wallet.account.address };
    alert(`Full Booking Confirmed!\nAccom: ${selected.accom?.name}\nDates: ${format(dates.startDate, 'MMM dd')} - ${format(dates.endDate, 'MMM dd')}\nSBT Minted!`);
    // Real tx: tonConnectUI.sendTransaction({ ... });
  };

  const renderStep = () => {
    switch (step) {
      case 'browse':
        return (
          <div>
            <h2>Browse by Parish or Type</h2>
            <select onChange={(e) => handleNext(e.target.value)}>
              {data.parishes.map(p => <option key={p.id} value={JSON.stringify(p)}>{p.name}</option>)}
            </select>
            <br/><br/>
            <label><input type="checkbox" checked={isLocal} onChange={(e) => setIsLocal(e.target.checked)} /> Local User (Skip Flights)</label>
          </div>
        );
      case 'accom':
        const parishData = JSON.parse(selected.browse);
        return (
          <div>
            <h2>Accommodations in {parishData.name}</h2>
            {parishData.accommodations.map(a => (
              <button key={a.name} onClick={() => handleNext(a)} style={styles.card}>
                {a.name} ({a.type}) - ${a.price}/night
              </button>
            ))}
          </div>
        );
      case 'flights':
        return (
          <div>
            <h2>Flights to {selected.accom.location}</h2>
            <p>Airport: {selected.accom.location.includes('Montego') ? 'MBJ' : 'KIN'}</p>
            <select onChange={(e) => handleNext({ airline: e.target.value })}>
              {data.airports.find(a => a.code === (selected.accom.location.includes('Montego') ? 'MBJ' : 'KIN')).airlines.map(al => <option key={al}>{al}</option>)}
            </select>
            <br/><br/>
            <input placeholder="Flight Details (or book via DApp)" onChange={() => {}} />
          </div>
        );
      case 'transport':
        return (
          <div>
            <h2>Transport to {selected.accom.name}</h2>
            {data.transport.map(t => (
              <button key={t.name} onClick={() => handleNext(t)} style={styles.card}>
                {t.name} - ${t.price}
              </button>
            ))}
          </div>
        );
      case 'meals':
        return (
          <div>
            <h2>Meals near {selected.accom.location} ({selected.accom.location.includes('Montego') ? data.restaurants[0] : data.restaurants[4]})</h2>
            {data.restaurants.filter(r => r.location.includes(selected.accom.location.split(' ')[0])).map(r => (
              <button key={r.name} onClick={() => handleNext(r)} style={styles.card}>
                {r.name} - {r.cuisine} (Delivery: {r.delivery ? 'Yes' : 'No'})
              </button>
            ))}
          </div>
        );
      case 'attractions':
        return (
          <div>
            <h2>Attractions Islandwide</h2>
            {data.attractions.filter(a => a.bookable).map(a => (
              <button key={a.name} onClick={() => handleNext(a)} style={styles.card}>
                {a.name} - ${a.price} (Bookable)
              </button>
            ))}
          </div>
        );
      case 'calendar':
        return (
          <div>
            <h2>Align Schedule</h2>
            <Calendar onDatesChange={handleDatesChange} />
            <button onClick={() => handleNext(dates)} style={styles.button}>Confirm Dates</button>
          </div>
        );
      default:
        return <h2>Welcome to YaadVibe Booking</h2>;
    }
  };

  return (
    <div style={styles.container}>
      <h1>YaadVibe Full Booking DApp</h1>
      <img src="/IMG_0039.jpeg" alt="Yaad" style={styles.image} />
      <TonConnectButton />
      {wallet && <p>Connected: {wallet.account.address.slice(0, 8)}...</p>}
      {renderStep()}
      <button onClick={() => setStep('browse')} style={styles.button}>Restart</button>
    </div>
  );
}

// Styles (same as before)
const styles = {
  container: { padding: '20px', textAlign: 'center', minHeight: '100vh', background: 'linear-gradient(to bottom, #000428, #004e92)', color: 'gold', fontFamily: 'Arial' },
  image: { width: '100%', maxWidth: '400px', borderRadius: '12px', margin: '20px 0' },
  card: { background: 'rgba(255,255,255,0.1)', margin: '10px', padding: '15px', borderRadius: '8px', border: '1px solid gold', cursor: 'pointer' },
  button: { background: 'gold', color: 'black', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: 'bold', margin: '10px' }
};
