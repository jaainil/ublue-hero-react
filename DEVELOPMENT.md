# Local Development Guide

This document describes how to develop and test the `ublue-hero-react` library locally.

## Quick Start

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests in example app
cd example
npm install
npm run dev
```

## Development Workflow

### 1. Making Changes

Edit files in `src/`:
- `UBlueHero.tsx` - Main component
- `index.mjs` - Entry point

### 2. Testing Changes

**Option A: Use the Example App**

```bash
cd example
npm run dev
```

**Option B: Link Locally**

```bash
# In library root
npm link

# In your project
npm link ublue-hero-react
```

### 3. Rebuilding

```bash
npm run build
```

This generates:
- `dist/index.js` (CommonJS)
- `dist/index.esm.js` (ESM)
- `dist/UBlueHero.d.ts` (TypeScript types)

## Directory Structure

```
ublue-hero-react/
├── src/
│   ├── UBlueHero.tsx      # Main component with props
│   └── index.mjs          # Entry point (exports)
├── dist/                  # Built files (gitignored)
├── example/               # Vite test app
├── test-animation/        # Interactive test environment
├── rollup.config.js       # Build config
├── tsconfig.json          # TypeScript config
├── babel.config.json      # Babel config
├── package.json           # Project metadata
└── README.md              # User documentation
```

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build for production |
| `npm run dev` | Build in watch mode |

## Publishing

```bash
# 1. Update version
npm version patch  # or minor, major

# 2. Build
npm run build

# 3. Publish
npm publish --access public
```

## Testing Environments

The library has been tested in:
- Vite + React
- Next.js (Pages and App Router)
- Create React App

## Notes

- p5 is a regular dependency (auto-installed)
- React is a peer dependency
- TypeScript definitions are generated during build
