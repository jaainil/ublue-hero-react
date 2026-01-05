# UBlue Hero Animation - Test Environment

A comprehensive test environment to verify all behaviors of the UBlueHero React component.

## Quick Start

```bash
cd test-animation
npm run dev
```

Open http://localhost:5173 in your browser.

## Features

### Control Panel (Top-Left)
- **Particle Count**: 100-2000 adjustable slider
- **Noise Scale**: Select flow pattern (smooth to chaotic)
- **Noise Seed**: Predefined or custom seed values
- **Reduced Motion Toggle**: Simulate accessibility setting
- **Performance Stats**: Toggle on-screen metrics

### Performance Monitor (Bottom-Right)
- Live FPS counter
- Color-coded performance indicators
- Frame time and memory usage

## Verification Tests

### 1. Visual Flow
Particles should move in smooth, organic Perlin noise patterns.

### 2. Trail Effect
Ghosting behind particles due to `background(0, 10)`.

### 3. Boundary Reset
Instant teleportation when particles exit screen.

### 4. Reduced Motion
Animation stops when accessibility setting is enabled.

### 5. Noise Seed
Reproducible patterns with same seed.

### 6. Performance
60 FPS target at 500 particles.

## Documentation

- [VERIFICATION.md](VERIFICATION.md) - Detailed test procedures
