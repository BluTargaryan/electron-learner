# Electron Learner

A cross-platform desktop application built with Electron, React, and TypeScript that monitors system resources (CPU, RAM, and Storage) in real-time with beautiful visualizations.

## Features

- 🖥️ Real-time system resource monitoring
  - CPU usage tracking
  - RAM usage monitoring
  - Storage usage visualization
- 📊 Interactive charts using Recharts
- 🎨 Custom window frame controls (minimize, maximize, close)
- 🔄 Live updates with configurable refresh rates
- 💻 Cross-platform support (Windows, macOS, Linux)
- 🌙 System tray integration

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Desktop Framework**: Electron 37
- **Build Tool**: Vite 7
- **Charting**: Recharts 3
- **Testing**: 
  - E2E Testing: Playwright
  - Unit Testing: Vitest
- **Development Tools**: 
  - ESLint for code quality
  - TypeScript for type safety
  - Electron Builder for distribution

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd electron-learner
```

2. Install dependencies
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

This will start both:
- Vite dev server for React
- Electron in development mode

### Testing

Run E2E tests:
```bash
npm run test:e2e
```

Run unit tests:
```bash
npm run test:unit
```

### Building

Build for your current platform:
```bash
npm run build
```

Build for specific platforms:
```bash
# For macOS (ARM64)
npm run dist:mac

# For Windows (x64)
npm run dist:win

# For Linux (x64)
npm run dist:linux
```

## Project Structure

- `/src`
  - `/electron` - Electron main process code
  - `/ui` - React application code
- `/e2e` - Playwright E2E tests
- `/dist-electron` - Compiled Electron code
- `/dist-react` - Compiled React code

## Scripts

- `dev` - Start development environment
- `build` - Build the application
- `lint` - Run ESLint
- `test:e2e` - Run Playwright E2E tests
- `test:unit` - Run Vitest unit tests
- `dist:mac` - Build for macOS
- `dist:win` - Build for Windows
- `dist:linux` - Build for Linux

## ESLint Configuration

The project uses a modern ESLint setup with TypeScript integration. To enable type-aware lint rules, the configuration includes:
- TypeScript-specific rules
- React-specific configurations
- Strict type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.