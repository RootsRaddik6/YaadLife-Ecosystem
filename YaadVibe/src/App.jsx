import React from 'react';

export default function App() {
  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #000428, #004e92)',
      color: 'gold',
      fontFamily: 'Arial'
    }}>
      <h1>YaadVibe LIVE</h1>
      <img src="/IMG_0039.jpeg" alt="Villa" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px' }} />
      <p>Browse Jamaica coming...</p>
      <button style={{
        background: 'gold',
        color: 'black',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold'
      }}>
        Test Button
      </button>
    </div>
  );
}
