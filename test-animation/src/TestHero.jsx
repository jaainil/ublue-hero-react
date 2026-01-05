import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const TestHero = ({ 
  particleCount = 500, 
  noiseScale = 0.01 / 9,
  strokeColor = 100,
  speedMultiplier = 1
}) => {
  const renderRef = useRef();

  useEffect(() => {
    if (!renderRef.current) return;

    const sketch = (p) => {
      let particles = [];
      
      p.setup = () => {
        const container = renderRef.current;
        const canvas = p.createCanvas(container.clientWidth, container.clientHeight);
        canvas.parent(container);
        
        for (let i = 0; i < particleCount; i++) {
          particles.push(p.createVector(p.random(p.width), p.random(p.height)));
        }

        p.stroke(strokeColor);
        p.clear();
      };

      p.draw = () => {
        if (window.scrollY <= window.innerHeight) {
          p.background(0, 10);

          for (let i = 0; i < particleCount; i++) {
            let v = particles[i];
            p.point(v.x, v.y);

            let n = p.noise(
              v.x * noiseScale, 
              v.y * noiseScale, 
              p.frameCount * Math.pow(noiseScale, 2)
            );
            
            let a = p.TWO_PI * n;
            v.x += p.cos(a) * speedMultiplier;
            v.y += p.sin(a) * speedMultiplier;

            if (v.x < 0 || v.x > p.width || v.y < 0 || v.y > p.height) {
              v.x = p.random(p.width);
              v.y = p.random(p.height);
            }
          }
        }
      };

      p.windowResized = () => {
        const container = renderRef.current;
        if (container) {
          p.resizeCanvas(container.clientWidth, container.clientHeight);
        }
      };
    };

    const p5Instance = new p5(sketch);

    return () => p5Instance.remove();
  }, [particleCount, noiseScale, strokeColor, speedMultiplier]);

  return (
    <div 
      ref={renderRef} 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'absolute', 
        top: 0, 
        left: 0,
        zIndex: -1,
        backgroundColor: '#000'
      }} 
    />
  );
};

export default TestHero;