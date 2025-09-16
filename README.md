# Countries Explorer 🌍

A React Native application built with Expo that allows users to explore countries around the world. Features include country search, detailed country information, and multilingual support (English/Spanish).

## ✨ Features

- 🔍 **Country Search**: Search for countries by name with debounced input
- 🌐 **Multilingual Support**: Switch between English and Spanish
- ♿ **Accessibility**: Full screen reader support with semantic roles
- 📱 **Responsive Design**: Optimized for different screen sizes
- 🎨 **Modern UI**: Clean interface with country flags and detailed information
- 🧪 **Comprehensive Testing**: Unit tests for components, hooks, and utilities

## 🚀 Installation

### Prerequisites
- Node.js 18+
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Technical Stack
- **React Native**: 0.81.4 with React 18.2.0
- **Expo SDK**: ~54.0.7
- **Navigation**: Expo Router
- **State Management**: Zustand for global state
- **API**: REST Countries API (https://restcountries.com/)
- **Testing**: Jest + React Native Testing Library
- **Internationalization**: Custom i18n implementation with Zustand
- **Accessibility**: Full WCAG compliance with screen reader support

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

### Running on Device/Simulator
- **iOS**: Press `i` or scan QR with Camera app
- **Android**: Press `a` or scan QR with Expo Go
- **Web**: Press `w` to open in browser

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage
- **Utils**: Data transformer functions
- **Hooks**: Custom hooks with API mocks
- **Components**: UI components with accessibility testing

## 🏗️ Technical Decisions

### **Internationalization (i18n)**
**Implementation flow:**
1. **Zustand Store** (`languageStore.ts`) manages current language
2. **Automatic detection** of device language on startup
3. **Persistence** in AsyncStorage to maintain preference
4. **Custom hook** (`useLanguage`) for easy access to translations
5. **Separate JSON files** (`en.json`, `es.json`) for each language
6. **Dynamic switching** without app restart

```typescript
// Usage in components
const { t } = useLanguage();
const text = t('countries.title'); // "Countries Explorer" or "Explorador de Países"
```

### **State Management with Zustand**
- **Centralized store** for language and configuration
- **Automatic persistence** in AsyncStorage
- **Simple API** without Redux boilerplate
- **Native TypeScript** with complete typing

### **Search Debouncing**
**Optimized implementation:**
- **300ms debounce** to avoid excessive API calls
- **Minimum 2 characters** to activate search
- **Automatic cancellation** of previous searches
- **Loading state** during searches

### **Double Navigation Prevention**
**Problem solved:**
- **useRef flag** to prevent multiple navigations
- **1-second timeout** for automatic reset
- **Improved UX** without unnecessary blocking

### **Component Architecture**
```
src/
├── components/          # Reusable components
├── screens/            # Main screens
├── hooks/              # Custom hooks
├── services/           # APIs and external services
├── stores/             # Zustand stores
├── types/              # TypeScript definitions
├── utils/              # Utility functions
└── localization/       # Translation files
```

### **Accessibility (A11y)**
- **Descriptive labels** on all interactive elements
- **Semantic roles** (button, image, header)
- **Contextual hints** for better UX
- **Translations** of accessibility elements
- **Adequate touch sizes** (minimum 44px)

### **Testing Strategy**
- **Jest** as main test runner
- **Testing Library** for rendering and queries
- **Mocks** for APIs and external hooks
- **Coverage** of utils, hooks, and components
- **Organized structure** by test type

## 🎨 Implemented Features

| Feature | Status | Description |
|---------|--------|-------------|
| **PNG Flags** | ✅ Complete | Rendered with Image component |
| **Zustand** | ✅ Complete | State management for i18n |
| **Responsive** | ✅ Complete | Adapted to different screens |
| **♿ A11y** | ✅ Complete | Labels, roles and hints translated |

## 📜 Available Scripts

```bash
npm start          # Start Expo dev server
npm test           # Run tests
npm run lint       # ESLint linter
npm run lint:fix   # Automatic lint fix
npm run format     # Format code with Prettier
npm run type-check # Verify TypeScript types
```

## 🌐 API Integration

- **REST Countries API**: https://restcountries.com/
- **Endpoints**:
  - `GET /v3.1/all` - All countries
  - `GET /v3.1/name/{name}` - Search by name
- **Optimized fields** to reduce payload

## 📱 Compatibility

- **iOS**: 13.0+
- **Android**: API 21+ (Android 5.0)
- **Web**: Modern browsers
- **Expo Go**: Compatible for development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

---

**Built with ❤️ using React Native + Expo**
