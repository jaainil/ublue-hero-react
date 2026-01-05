import { useState } from 'react';
import TestHero from './TestHero';
import './App.css';

function App() {
  const [particleCount, setParticleCount] = useState(500);
  const [noiseScale, setNoiseScale] = useState(0.01 / 9);
  const [strokeColor, setStrokeColor] = useState(100);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [seedInput, setSeedInput] = useState('');
  const [noiseSeed, setNoiseSeed] = useState(undefined);

  const seeds = [
    { label: 'Random', value: undefined },
    { label: '1', value: 1 },
    { label: '42', value: 42 },
    { label: '123', value: 123 },
    { label: '999', value: 999 },
  ];

  const noiseScales = [
    { label: 'Smooth (0.0005)', value: 0.0005 },
    { label: 'Default (0.0011)', value: 0.01 / 9 },
    { label: 'Medium (0.002)', value: 0.002 },
    { label: 'Chaotic (0.005)', value: 0.005 },
  ];

  const handleSeedChange = (value) => {
    setNoiseSeed(value);
    setSeedInput('');
  };

  const handleCustomSeed = () => {
    const num = parseInt(seedInput);
    if (!isNaN(num)) {
      setNoiseSeed(num);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <TestHero 
        particleCount={particleCount}
        noiseScale={noiseScale}
        strokeColor={strokeColor}
        speedMultiplier={speedMultiplier}
      />
      
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        background: 'rgba(0, 0, 0, 0.85)',
        padding: '20px',
        borderRadius: '12px',
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '300px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
          Animation Controls
        </h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#aaa' }}>
            Particles: {particleCount}
          </label>
          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={particleCount}
            onChange={(e) => setParticleCount(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#aaa' }}>
            Noise Scale
          </label>
          <select
            value={noiseScale}
            onChange={(e) => setNoiseScale(parseFloat(e.target.value))}
            style={{ width: '100%', padding: '8px', background: '#333', color: 'white', border: '1px solid #555', borderRadius: '4px' }}
          >
            {noiseScales.map(scale => (
              <option key={scale.value} value={scale.value}>{scale.label}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#aaa' }}>
            Speed: {speedMultiplier}x
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.25"
            value={speedMultiplier}
            onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#aaa' }}>
            Seed
          </label>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
            {seeds.map(seed => (
              <button
                key={seed.value}
                onClick={() => handleSeedChange(seed.value)}
                style={{
                  flex: 1,
                  padding: '5px',
                  background: noiseSeed === seed.value ? '#4a90d9' : '#333',
                  color: 'white',
                  border: '1px solid #555',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                {seed.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <input
              type="number"
              placeholder="Custom..."
              value={seedInput}
              onChange={(e) => setSeedInput(e.target.value)}
              style={{ flex: 1, padding: '5px', background: '#333', color: 'white', border: '1px solid #555', borderRadius: '3px' }}
            />
            <button
              onClick={handleCustomSeed}
              style={{ padding: '5px 10px', background: '#4a90d9', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
            >
              Set
            </button>
          </div>
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              style={{ width: '16px', height: '16px' }}
            />
            <span style={{ fontSize: '0.85rem' }}>Reduced Motion</span>
          </label>
          <p style={{ fontSize: '0.7rem', color: '#888', margin: '3px 0 0 24px' }}>
            Animation stops when enabled
          </p>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '12px 24px',
        borderRadius: '25px',
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
        textAlign: 'center',
      }}>
        <h1 style={{ margin: 0, fontSize: '1.3rem' }}>Universal Blue Hero</h1>
        <p style={{ margin: '3px 0 0 0', opacity: 0.7, fontSize: '0.85rem' }}>
          Perlin noise particle animation
        </p>
      </div>
    </div>
  );
}

export default App;