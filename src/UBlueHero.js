import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import p5 from 'p5';
const UBlueHero = ({ particleCount = 500, noiseScaleValue = 0.01 / 9, style = {}, className = '' }) => {
    const canvasRef = useRef(null);
    const p5InstanceRef = useRef(null);
    useEffect(() => {
        if (!canvasRef.current)
            return;
        const sketch = (p) => {
            let particles = [];
            let prefersReducedMotion = false;
            const initParticles = () => {
                particles = [];
                for (let i = 0; i < particleCount; i++) {
                    particles.push(p.createVector(p.random(p.width), p.random(p.height)));
                }
            };
            p.setup = () => {
                const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent(canvasRef.current);
                p.stroke(100);
                initParticles();
                prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleMotionChange = (e) => {
            if (e.matches) {
                p5Instance.noLoop();
            }
            else {
                p5Instance.loop();
            }
        };
        motionQuery.addEventListener('change', handleMotionChange);
        return () => {
            motionQuery.removeEventListener('change', handleMotionChange);
            if (p5InstanceRef.current) {
                p5InstanceRef.current.remove();
                p5InstanceRef.current = null;
            }
        };
    }, [particleCount, noiseScaleValue]);
    return (_jsx("div", { ref: canvasRef, style: { width: '100%', height: '100%', ...style }, className: className }));
};
export default UBlueHero;
