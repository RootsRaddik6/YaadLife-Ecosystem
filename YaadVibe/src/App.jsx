import React, { useState } from 'react';
import './App.css'; // Add styles below

function App() {
  const [parish, setParish] = useState('');
  const [results, setResults] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [chatInput, setChatInput] = useState('');

  const parishes = [
    'kingston', 'st-andrew', 'st-thomas', 'portland', 'st-mary', 'st-ann',
    'trelawny', 'st-james', 'hanover', 'westmoreland', 'st-elizabeth',
    'manchester', 'clarendon', 'st-catherine'
  ];

  // Same mock data as Lite (copy from above)
  const mockAccommodations = { /* ... paste from Lite JS */ };
  const mockTransport = { /* ... paste from Lite JS */ };

  const scanAccommodations = () => {
    if (!parish || !mockAccommodations[parish]) return alert('Select a parish!');
    setResults({
      type: 'stays',
      data: mockAccommodations[parish].map(item => ({
        ...item,
        total: item.price + item.fee,
        className: item.local ? 'local' : ''
      }))
    });
  };

  const scanTransport = () => {
    if (!parish || !mockTransport[parish]) return alert('Select a parish!');
    const sorted = [...mockTransport[parish]].sort((a, b) => b.priority - a.priority);
    setResults({ type: 'rides', data: sorted });
  };

  const bookItem = (name, total) => {
    // Background SBT (React-friendly)
    const sbt = { id: Date.now(), user: 'YaadUser', item: name, total, timestamp: new Date().toISOString(), type: 'SoulboundToken' };
    console.log('SBT Generated:', sbt);
    // Download JSON
    const blob = new Blob([JSON.stringify(sbt, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yaadlife-sbt-${sbt.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    alert(`Booked ${name}! SBT in background.`);
  };

  const sendMessage = () => {
    if (!chatInput) return;
    const newLog = [...chatLog, { user: 'You', msg: chatInput }, { user: 'BotFather', msg: `Scanning "${chatInput}". E.g., Villas in Portland?` }];
    setChatLog(newLog);
    setChatInput('');
  };

  return (
    <div className="App">
      <header className="header">
        <h1>YaadVibe</h1>
        <img src="/IMG_0039.jpg" alt="Vibes" /> {/* Assume public folder */}
      </header>

      <select value={parish} onChange={e => setParish(e.target.value)}>
        <option value="">Choose Parish...</option>
        {parishes.map(p => <option key={p} value={p}>{p.replace('-', ' ').toUpperCase()}</option>)}
      </select>

      <button onClick={scanAccommodations}>Scan Stays</button>
      <button onClick={scanTransport}>Scan Rides</button>
      <button onClick={() => setShowModal(true)}>BotFather Chat</button>

      {results && (
        <div>
          <h3>{results.type === 'stays' ? 'Stays' : 'Rides'} in {parish.replace('-', ' ')}</h3>
          <table>
            <thead><tr><th>Name</th><th>Source</th><th>Price</th>{results.type === 'stays' && <th>Fee</th>}<th>Total</th><th>Action</th></tr></thead>
            <tbody>
              {results.data.map((item, i) => (
                <tr key={i} className={item.className || ''}>
                  <td>{item.name}</td><td>{item.source}</td><td>${item.price}</td>
                  {results.type === 'stays' && <td className="fee">${item.fee}</td>}
                  <td>${item.total || item.price}</td>
                  <td><button onClick={() => bookItem(item.name, item.total || item.price)}>Book</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span onClick={() => setShowModal(false)}>&times;</span>
            <h2>BotFather</h2>
            <div className="chat-log">
              {chatLog.map((msg, i) => <p key={i}><strong>{msg.user}:</strong> {msg.msg}</p>)}
            </div>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ask away..." />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
