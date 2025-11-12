import React, { useState } from 'react';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import data from './data.json';
import Calendar from './Calendar';
import { format } from 'date-fns';

export default function App() {
  const [step, setStep] = useState('browse');
  const [selected, setSelected] = useState({});
  const [isLocal, setIsLocal] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [dates, setDates] = useState({ startDate: new Date(), endDate: addDays(new Date(), 7) });
  const [tipSent, setTipSent] = useState({});

  const sendTip = async (amount, recipient, label) => {
    if (!tonConnectUI.connected) {
      alert('Connect wallet to tip!');
      return;
    }

    const tx = {
      validUntil: Math.floor(Date.now() / 1000) + 60,
      messages: [{
        address: recipient, // In testnet: use test wallet
        amount: (amount * 1e9).toString(), // TON to nanoton
        payload: btoa(`YaadVibe Tip: ${label}`)
      }]
    };

    try {
      await tonConnectUI.sendTransaction(tx);
      setTipSent({ ...tipSent, [label]: true });
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
      }
      alert(`Tipped ${amount} TON to ${label}!`);
    } catch (e) {
      alert('Tip failed. Try again.');
    }
  };

  const TipButton = ({ amount, label, recipient = "EQBynBO23ywHy_CgarY9NK9FTz0yDsG82PtcbSTQgGoXwcpA" }) => (
    <button
      onClick={() => sendTip(amount, recipient, label)}
      style={{
        ...styles.button,
        background: tipSent[label] ? '#00aa00' : '#ffcc00',
        margin: '5px'
      }}
      disabled={tipSent[label]}
    >
      {tipSent[label] ? 'Tipped' : `Tip $${amount}`}
    </button>
  );

  const handleNext = (choice) => {
    setSelected({ ...selected, [step]: choice });
    const nextStep = {
      browse: 'accom',
      accom: isLocal ? 'transport' : 'flights',
      flights: 'transport',
      transport: 'meals',
      meals: 'attractions',
      attractions: 'calendar',
      calendar: 'confirm'
    }[step];
    setStep(nextStep);
  };

  const renderStep = () => {
    switch (step) {
      case 'browse':
        return (
          <div>
            <h2>Browse Jamaica</h2>
            <select onChange={(e) => handleNext(JSON.parse(e.target.value))}>
              <option>Select Parish</option>
              {data.parishes.map(p => <option key={p.id} value={JSON.stringify(p)}>{p.name}</option>)}
            </select>
            <br/><br/>
            <label><input type="checkbox" checked={isLocal} onChange={(e) => setIsLocal(e.target.checked)} /> Local (No Flights)</label>
          </div>
        );

      case 'accom':
        const parish = selected.browse;
        return (
          <div>
            <h2>{parish.name} Stays</h2>
            {parish.accommodations.map(a => (
              <div key={a.name} style={styles.card}>
                <strong>{a.name}</strong> — {a.type}<br/>
                ${a.price}/night
                <button onClick={() => handleNext(a)} style={styles.button}>Book</button>
                <TipButton amount={10} label={`Host: ${a.name}`} />
              </div>
            ))}
          </div>
        );

      case 'flights':
        return (
          <div>
            <h2>Flight to {selected.accom.location}</h2>
            <p>Airport: {selected.accom.location.includes('Montego') ? 'MBJ' : 'KIN'}</p>
            <input placeholder="Flight # or Book via DApp" />
            <button onClick={() => handleNext({ booked: true })} style={styles.button}>Next</button>
          </div>
        );

      case 'transport':
        return (
          <div>
            <h2>Transport to {selected.accom.name}</h2>
            {data.transport.map(t => (
              <div key={t.name} style={styles.card}>
                <strong>{t.name}</strong> — ${t.price} JMD
                <button onClick={() => handleNext(t)} style={styles.button}>Select</button>
                <TipButton amount={5} label={`Driver: ${t.name}`} />
              </div>
            ))}
          </div>
        );

      case 'meals':
        const nearby = data.restaurants.filter(r => r.location.includes(selected.accom.location.split(' ')[0]));
        return (
          <div>
            <h2>Meals near {selected.accom.location}</h2>
            {nearby.map(r => (
              <div key={r.name} style={styles.card}>
                <strong>{r.name}</strong> — {r.cuisine}<br/>
                Delivery: {r.delivery ? 'Yes' : 'No'}
                <button onClick={() => handleNext(r)} style={styles.button}>Order</button>
                <TipButton amount={3} label={`Waiter: ${r.name}`} />
              </div>
            ))}
          </div>
        );

      case 'attractions':
        return (
          <div>
            <h2>Attractions</h2>
            {data.attractions.filter(a => a.bookable).map(a => (
              <div key={a.name} style={styles.card}>
                <strong>{a.name}</strong> — ${a.price} JMD
                <button onClick={() => handleNext(a)} style={styles.button}>Book</button>
                <TipButton amount={10} label={`Guide: ${a.name}`} />
              </div>
            ))}
          </div>
        );

      case 'calendar':
        return (
          <div>
            <h2>Schedule Your YaadVibe</h2>
            <Calendar onDatesChange={setDates} />
            <button onClick={() => setStep('confirm')} style={styles.button}>Review & Mint</button>
          </div>
        );

      case 'confirm':
        return (
          <div>
            <h2>Booking Confirmed</h2>
            <p>Accom: {selected.accom?.name}</p>
            <p>Dates: {format(dates.startDate, 'MMM dd')} – {format(dates.endDate, 'MMM dd')}</p>
            <p>Transport: {selected.transport?.name}</p>
            <p>Meals: {selected.meals?.name}</p>
            <p>Attraction: {selected.attractions?.name}</p>
            <TonConnectButton />
            {wallet && (
              <button onClick={handleMint} style={styles.button}>
                Mint Full Booking SBT
              </button>
            )}
          </div>
        );

      default:
        return <h2>YaadVibe — Book. Tip. Vibe.</h2>;
    }
  };

  const handleMint = () => {
    alert(`SBT Minted to ${wallet.account.address.slice(0,8)}...\nFull trip on-chain!`);
  };

  return (
    <div style={styles.container}>
      <h1>YaadVibe v3.1 — Live Tipping</h1>
      <img src="/IMG_0039.jpeg" alt="Yaad" style={styles.image} />
      {renderStep()}
      <button onClick={() => setStep('browse')} style={styles.button}>Restart</button>
    </div>
  );
}

const styles = {
  container: { padding: '20px', textAlign: 'center', minHeight: '100vh', background: 'linear-gradient(to bottom, #000428, #004e92)', color: 'gold', fontFamily: 'Arial' },
  image: { width: '100%', maxWidth: '400px', borderRadius: '12px', margin: '20px 0' },
  card: { background: 'rgba(255,255,255,0.1)', margin: '15px auto', padding: '15px', borderRadius: '12px', border: '1px solid gold', maxWidth: '300px' },
  button: { background: 'gold', color: 'black', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: 'bold', margin: '8px', cursor: 'pointer' }
};
