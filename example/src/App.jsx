import { UBlueHero } from 'ublue-hero-react';
import './App.css';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <UBlueHero particleCount={500} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
        textShadow: '0 2px 4px rgba(0,0,0,0.8)'
      }}>
        <h1 style={{ fontSize: '3rem', margin: 0 }}>UBlue Hero Animation</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          A React component wrapping the Universal Blue hero particle animation
        </p>
      </div>
    </div>
  );
}

export default App;