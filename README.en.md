# Countries Explorer 🌍

*[Español](README.md) | **English***

## Overview
A React Native application built with Expo that allows users to explore countries around the world. Features include country search, detailed country information, and multilingual support (English/Spanish).

## Features
- 🔍 **Country Search**: Search for countries by name with debounced input
- 🌐 **Multilingual Support**: Switch between English and Spanish
- ♿ **Accessibility**: Full screen reader support with semantic roles
- 📱 **Responsive Design**: Optimized for different screen sizes
- 🎨 **Modern UI**: Clean interface with country flags and detailed information
- 🧪 **Comprehensive Testing**: Unit tests for components, hooks, and utilities

## Installation

### Prerequisites
- Node.js 18+
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd CountriesExplorer

# Install dependencies
npm install

# Start the development server
npx expo start
```

## Usage
1. Launch the app
2. Browse the list of countries or use the search bar
3. Tap on any country to view detailed information
4. Use the language selector in the header to switch between English and Spanish

## Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Technical Stack
- **React Native**: 0.81.4 with React 18.2.0
- **Expo SDK**: ~54.0.7
- **Navigation**: Expo Router
- **State Management**: Zustand for global state
- **API**: REST Countries API (https://restcountries.com/)
- **Testing**: Jest + React Native Testing Library
- **Internationalization**: Custom i18n implementation with Zustand
- **Accessibility**: Full WCAG compliance with screen reader support

## Project Structure
```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── hooks/              # Custom React hooks
├── stores/             # Zustand stores
├── services/           # API services
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── localization/       # Translation files
```

## Technical Decisions

### State Management
- **Zustand** chosen for its simplicity and TypeScript support
- Separate stores for countries data and language preferences
- Persistent language selection using AsyncStorage

### Internationalization
- Custom i18n implementation using JSON translation files
- Dynamic language switching with immediate UI updates
- Accessibility labels translated for screen readers

### Performance Optimizations
- **Debounced search** to reduce API calls
- **Navigation debouncing** to prevent double navigation
- Memoized components and callbacks where appropriate

### Accessibility
- Semantic roles for all interactive elements
- Translated accessibility labels and hints
- Screen reader optimized navigation
- High contrast support

## API Integration
Uses the REST Countries API v3.1:
- `GET /v3.1/all` - Fetch all countries
- `GET /v3.1/name/{name}` - Search countries by name

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License
This project is licensed under the MIT License.
