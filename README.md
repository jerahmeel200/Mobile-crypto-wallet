# Mobile Crypto Wallet App

A modern, feature-rich cryptocurrency wallet application built with React Native and Expo. This app provides real-time cryptocurrency data, price tracking, and a beautiful Web3-inspired user interface.

![Crypto Wallet](https://img.shields.io/badge/React%20Native-0.81.5-blue) ![Expo](https://img.shields.io/badge/Expo-~54.0.23-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)

## 📱 Features

### Core Features
- **Real-time Coin List**: Browse 100+ cryptocurrencies with live prices
- **Detailed Coin Information**: View comprehensive details for each cryptocurrency
- **Price Charts**: Interactive 7-day price trend charts
- **Search Functionality**: Quickly find coins by name or symbol
- **Favorites System**: Save your favorite coins for quick access
- **Offline Support**: Graceful handling of network issues and slow connections
- **Modern UI**: Beautiful Web3-inspired dark theme design

### Advanced Features
- **Network Status Detection**: Real-time network monitoring with visual indicators
- **Pull-to-Refresh**: Easy data refresh on the coins list
- **Error Handling**: Comprehensive error states with retry functionality
- **Loading States**: Smooth loading indicators throughout the app
- **Responsive Design**: Optimized for various screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development) or Xcode (for iOS development)
- Expo Go app on your mobile device (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Mobile-crypto-wallet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional)
   ```bash
   cp .env.example .env
   ```
   
   Note: CoinGecko's free tier doesn't require an API key. If you have a Pro API key, add it to `.env`:
   ```
   COINGECKO_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your device**
   - **Android**: Press `a` in the terminal or scan the QR code with Expo Go
   - **iOS**: Press `i` in the terminal or scan the QR code with Expo Go
   - **Web**: Press `w` in the terminal

## 📦 Building for Production

### Android APK

1. **Install EAS CLI** (if not already installed)
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure the build**
   ```bash
   eas build:configure
   ```

4. **Build the APK**
   ```bash
   eas build --platform android --profile preview
   ```

5. **Download the APK**
   - After the build completes, you'll receive a link to download the APK
   - The APK will be available in your Expo dashboard

### Alternative: Local Build

```bash
# For Android
npx expo run:android

# For iOS (macOS only)
npx expo run:ios
```

## 📱 APK Download

**Note**: The APK file should be built and uploaded to a hosting service. Once available, add the download link here:

```
[APK Download Link]
```

Example hosting options:
- Google Drive (make it publicly accessible)
- GitHub Releases
- Firebase Hosting
- Your own server

## 🎥 Demo Video

**Note**: Add your demo video link here once uploaded:

```
[Demo Video Link]
```

Example hosting options:
- YouTube
- Loom
- Google Drive
- Vimeo

## 🏗️ Project Structure

```
Mobile-crypto-wallet/
├── app/                      # Expo Router screens
│   ├── _layout.tsx          # Root layout
│   ├── index.tsx             # Coins list screen
│   ├── coin-details/         # Coin details screens
│   │   └── [id].tsx         # Dynamic coin detail screen
│   └── global.css            # Global styles
├── components/               # Reusable UI components
│   ├── CoinCard.tsx         # Coin list item card
│   ├── SearchBar.tsx        # Search input component
│   ├── PriceChart.tsx       # Price chart component
│   ├── LoadingSpinner.tsx   # Loading state component
│   ├── ErrorState.tsx       # Error state component
│   ├── EmptyState.tsx       # Empty state component
│   └── NetworkStatusBanner.tsx # Network status indicator
├── services/                # API services
│   └── api.ts               # CoinGecko API integration
├── hooks/                   # Custom React hooks
│   ├── useFavorites.ts      # Favorites management
│   └── useNetworkStatus.ts  # Network status monitoring
├── utils/                   # Utility functions
│   ├── storage.ts           # AsyncStorage helpers
│   └── formatters.ts        # Data formatting utilities
├── types/                   # TypeScript type definitions
│   └── coin.ts              # Coin data types
├── assets/                  # Static assets
├── app.json                 # Expo configuration
├── package.json             # Dependencies
└── README.md                # This file
```

## 🛠️ Technologies Used

- **React Native**: Mobile app framework
- **Expo**: Development platform and tooling
- **TypeScript**: Type-safe JavaScript
- **NativeWind**: Tailwind CSS for React Native
- **Expo Router**: File-based routing
- **React Native Chart Kit**: Price charts
- **AsyncStorage**: Local data persistence
- **CoinGecko API**: Cryptocurrency data source

## 📡 API Integration

This app uses the [CoinGecko API](https://www.coingecko.com/en/api) to fetch cryptocurrency data:

- **Coins List**: `/coins/markets` - Get market data for multiple coins
- **Coin Details**: `/coins/{id}` - Get detailed information for a specific coin
- **Price History**: `/coins/{id}/market_chart` - Get historical price data

The API is free to use and doesn't require authentication for basic usage. Rate limits apply for free tier users.

## 🎨 Design Features

- **Dark Theme**: Modern Web3-inspired dark color scheme
- **Smooth Animations**: Polished user interactions
- **Responsive Layout**: Works on various screen sizes
- **Accessibility**: Clear visual hierarchy and readable text

## 🔒 Security

- No API keys are hardcoded in the source code
- Environment variables are used for sensitive configuration
- `.env` file is excluded from version control (see `.gitignore`)

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler cache issues**
   ```bash
   npm start -- --clear
   ```

2. **Node modules issues**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Expo cache issues**
   ```bash
   npx expo start -c
   ```

4. **Android build issues**
   - Ensure Android Studio is properly configured
   - Check that ANDROID_HOME is set correctly
   - Verify Java JDK is installed

## 📝 Development

### Running Tests

```bash
npm run lint
```

### Code Style

This project uses:
- ESLint for code linting
- Prettier (via Tailwind plugin) for code formatting
- TypeScript for type checking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of the HNG Internship Stage 4 task.

## 👨‍💻 Author

Built for HNG Internship Stage 4 - Mobile Track

## 🙏 Acknowledgments

- [CoinGecko](https://www.coingecko.com/) for providing the free cryptocurrency API
- [Expo](https://expo.dev/) for the amazing development platform
- [React Native](https://reactnative.dev/) community for the excellent framework

---

**Note**: Remember to add your APK download link and demo video link to this README before submission.

