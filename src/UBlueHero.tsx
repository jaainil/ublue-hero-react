// Based on Universal Blue (https://universal-blue.org/)
// Copyright (C) 2024. Licensed under GPL v3.
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

export interface UBlueHeroProps {
  particleCount?: number;
  noiseScaleValue?: number;
  style?: React.CSSProperties;
  className?: string;
}

const UBlueHero: React.FC<UBlueHeroProps> = ({
  particleCount = 500,
  noiseScaleValue = 0.01 / 9,
  style = {},
  className = ''
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const sketch = (p: p5) => {
      let particles: p5.Vector[] = [];

      const initParticles = () => {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
          particles.push(p.createVector(p.random(p.width), p.random(p.height)));
        }
      };

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(canvasRef.current as unknown as HTMLElement);

        p.stroke(100);
        initParticles();

        if (prefersReducedMotion) {
          p.noLoop();
        }
      };

      p.draw = () => {
        p.background(0, 10);

        for (let i = 0; i < particles.length; i++) {
          const pVec = particles[i];
          p.point(pVec.x, pVec.y);

          const n = p.noise(pVec.x * noiseScaleValue, pVec.y * noiseScaleValue, p.frameCount * Math.pow(noiseScaleValue, 2));
          const a = p.TWO_PI * n;
          pVec.x += p.cos(a);
          pVec.y += p.sin(a);

          if (pVec.x < 0 || pVec.x > p.width || pVec.y < 0 || pVec.y > p.height) {
            pVec.x = p.random(p.width);
            pVec.y = p.random(p.height);
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    const p5Instance = new p5(sketch);
    p5InstanceRef.current = p5Instance;

    // Handle Reduced Motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        p5Instance.noLoop();
      } else if (isVisibleRef.current) {
        p5Instance.loop();
      }
    };

    motionQuery.addEventListener('change', handleMotionChange);

    // Handle Scroll/Visibility Optimization
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (!prefersReducedMotion) {
            if (entry.isIntersecting) {
              p5Instance.loop();
            } else {
              p5Instance.noLoop();
            }
          }
        });
      },
      { threshold: 0 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      observer.disconnect();
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [particleCount, noiseScaleValue]);

  return (
    <div
      ref={canvasRef}
      style={{ width: '100%', height: '100%', ...style }}
      className={className}
    />
  );
};

export default UBlueHero;