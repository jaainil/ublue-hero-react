# ublue-hero-react

A React component for the Universal Blue hero particle animation powered by p5.js.

## Features

- Smooth Perlin noise particle flow animation
- Fully responsive canvas that adapts to container size
- Accessible - respects `prefers-reduced-motion` system settings
- Full TypeScript support with type definitions
- Configurable particle count and noise scale
- Trail effect with adjustable background alpha
- Scroll-based animation control (stops when scrolled away)

## Installation

```bash
npm install ublue-hero-react
```

p5.js is automatically installed as a dependency.

## Usage

### Basic Usage

```jsx
import { UBlueHero } from 'ublue-hero-react';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <UBlueHero style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1>Content</h1>
      </div>
    </div>
  );
}
```

### With Custom Props

```jsx
import { UBlueHero } from 'ublue-hero-react';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <UBlueHero 
        particleCount={600}
        noiseScaleValue={0.001}
        style={{ background: '#000' }}
        className="hero-animation"
      />
    </div>
  );
}
```

### As a Background Component

```jsx
import { UBlueHero } from 'ublue-hero-react';

function HeroSection() {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <UBlueHero style={{ position: 'absolute', inset: 0, zIndex: -1 }} />
      <div style={{ position: 'relative', zIndex: 1, color: 'white', padding: '2rem' }}>
        <h1>My App</h1>
        <p>Hero section content</p>
      </div>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `particleCount` | `number` | `500` | Number of particles in the animation |
| `noiseScaleValue` | `number` | `0.01 / 9` (~0.0011) | Perlin noise scale - affects flow pattern |
| `style` | `React.CSSProperties` | `{}` | Additional styles for the container |
| `className` | `string` | `''` | Additional CSS classes for the container |

### Tuning the Animation

**Particle Count:**
- `100` - Light particle field, best performance
- `500` - Default, balanced look and performance
- `1000+` - Dense particle field, may impact performance

**Noise Scale:**
- `0.0005` - Large, smooth flow patterns
- `0.0011` (default) - Balanced flow
- `0.002` - Medium detail
- `0.005` - Chaotic, detailed patterns

## Accessibility

This component automatically respects system `prefers-reduced-motion` settings:

- **macOS**: System Settings → Accessibility → Display → Reduce motion
- **Windows**: Settings → Accessibility → Motion → Show animations
- **iOS**: Settings → Accessibility → Motion → Reduce Motion

When enabled, the animation stops automatically.

## TypeScript

Full TypeScript support with exported types:

```tsx
import { UBlueHero, UBlueHeroProps } from 'ublue-hero-react';

const props: UBlueHeroProps = {
  particleCount: 500,
  noiseScaleValue: 0.001
};

<UBlueHero {...props} />
```

## React Versions

Compatible with React 17, 18, and 19:

```json
{
  "peerDependencies": {
    "react": "^17.0.0 || ^18.0.0 || ^19.0.0",
    "react-dom": "^17.0.0 || ^18.0.0 || ^19.0.0"
  }
}
```

## Local Development

### Running the Example

```bash
cd example
npm install
npm run dev
```

### Building the Library

```bash
npm run build
```

Output:
- `dist/index.js` - CommonJS format
- `dist/index.esm.js` - ES Modules format
- `dist/UBlueHero.d.ts` - TypeScript definitions

## How It Works

The animation uses Perlin noise to create fluid particle movement:

1. **Setup**: Creates canvas and initializes particles with random positions
2. **Draw Loop**: 
   - Applies semi-transparent background for trail effect
   - Calculates noise-based movement vector for each particle
   - Updates particle positions
   - Resets particles that go off-screen
3. **Accessibility**: Checks system reduced motion preference
4. **Responsive**: Resizes canvas on window resize
5. **Optimization**: Animations pause when element is not in viewport or when page is scrolled away

## License

GPL v3 - Based on Universal Blue (https://universal-blue.org/)

## Repository

https://github.com/jaainil/ublue-hero-react

