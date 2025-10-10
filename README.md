# GK2 — Beer Discovery App (React Native / Expo)

A React Native app built with Expo for discovering beers and breweries. Features a social feed, interactive map, barcode scanning, search functionality, and user profiles.

## Demo

[▶️ Watch Demo Video on Vimeo](???)

See a walkthrough of the Beer Discovery App's main features, including the social feed, map exploration, and barcode scanning.

## Features
- **Firebase Authentication** - User registration and login
- Social feed with beer reviews and ratings
- Interactive map showing nearby bars, pubs, and breweries
- Barcode scanning for beer identification
- Search for beers and breweries
- User profiles and settings with logout functionality
- Bottom tab navigation with 5 main sections

## Firebase Setup

This app uses Firebase for user authentication. To set up Firebase:

### 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" and follow the setup wizard
3. Enable Authentication in your project
4. Go to Authentication > Sign-in method
5. Enable "Email/Password" as a sign-in provider

### 2. Get your Firebase configuration
1. In your Firebase project, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Web app" (</>) and register your app
4. Copy the Firebase configuration object

### 3. Update the Firebase config
1. Open `firebase.js` in your project
2. Replace the placeholder config with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

### 4. Test Authentication
- Run the app with `npm start`
- You should see login/register screens
- Create an account to test the authentication flow
- Simple navigation stacks for Scan, Search and Settings

## Stack / Tech
- React Native (Expo)
- JavaScript
- React Navigation (bottom tabs + stacks)
- Expo Camera (barcode scanning)
- Expo Location (map functionality)
- React Native Maps (interactive map)
- AsyncStorage (data persistence)
- Ionicons (icons)

## Project structure

Top-level files
- `App.js`, `index.js`, `app.json`, `package.json` — app entry and configuration

Key folders
- `components/` — shared UI components: `ButtonComponents.js`, `InfoSheet.js`
- `screens/` — main tab screens: `HomeScreen.js` (social feed), `MapScreen.js` (interactive map), `ScanScreen.js`, `SearchScreen.js`, `SettingsScreen.js` and a `StackScreens/` subfolder for nested screens like `AppDetailsScreen.js`, `SelectedBeerScreen.js`, `UserProfileScreen.js`
- `stack/` — navigation stacks: `ScanStack.js`, `SearchStack.js`, `SettingsStack.js`
- `styles/` — shared styles and constants: `Colors.js`, `GlobalStyle.js`, `GlobalNavigation.js`, screen-specific styles
- `utils/` — utility functions like `distance.js` for map calculations

## Setup & Run (macOS)

Prerequisites

- Node.js (LTS recommended)
- Expo CLI (optional but useful) — `npm install -g expo-cli`

Install dependencies

```bash
cd ./gk2
npm install
```

Run the app

```bash
# Start Expo
npm start

# or using expo CLI directly
npx expo start
```

You can open the run QR code with the Expo Go app on a physical device or run on iOS/Android simulators.

## Troubleshooting
- If dependencies fail, delete `node_modules` and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

- If Expo cache causes issues:

```bash
expo start -c
```
