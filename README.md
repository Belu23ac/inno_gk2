# GK2 — Beer Discovery App (React Native / Expo)

A React Native app built with Expo for discovering beers and breweries. Features a social feed, interactive map, barcode scanning, search functionality, and user profiles.

## Demo

[▶️ Watch Demo Video on Vimeo](???)

See a walkthrough of the Beer Discovery App's main features, including the social feed, map exploration, and barcode scanning.

## Features
- Social feed with beer reviews and ratings
- Interactive map showing nearby bars, pubs, and breweries
- Barcode scanning for beer identification
- Search for beers and breweries
- User profiles and settings
- Bottom tab navigation with 5 main sectionsanner App (React Native / Expo)

A small React Native app built with Expo for scanning and browsing beers. It includes screens for scanning barcodes, searching, viewing details, and basic settings.

## Demo

[▶️ Watch Demo Video on Vimeo](???)

See a walkthrough of the Beer Scanner App’s main features, including barcode scanning and beer search.

## Features
- Scan beer barcodes
- Search for beers
- View details for selected beers
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
