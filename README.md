# GK1 — Beer Scanner App (React Native / Expo)

A small React Native app built with Expo for scanning and browsing beers. It includes screens for scanning barcodes, searching, viewing details, and basic settings.

## Demo

[▶️ Watch Demo Video on Vimeo](https://vimeo.com/1120378632)

See a walkthrough of the Beer Scanner App’s main features, including barcode scanning and beer search.

## Features
- Scan beer barcodes
- Search for beers
- View details for selected beers
- Simple navigation stacks for Scan, Search and Settings

## Stack / Tech
- React Native (Expo)
- JavaScript
- React Navigation (stacks)

## Project structure

Top-level files
- `App.js`, `index.js`, `app.json`, `package.json` — app entry and configuration

Key folders
- `components/` — shared UI components (e.g. `ButtonComponents.js`)
- `screens/` — top-level screens: `HomeScreen.js`, `ScanScreen.js`, `SearchScreen.js`, `SettingsScreen.js`, `DetailsScreen.js` and a `StackScreens/` subfolder for nested screens like `AppDetailsScreen.js`, `SelectedBeerScreen.js`, `UserProfileScreen.js`
- `stack/` — navigation stacks: `ScanStack.js`, `SearchStack.js`, `SettingsStack.js`
- `styles/` — shared styles and constants: `Colors.js`, `GlobalStyle.js`, `GlobalNavigation.js`

## Setup & Run (macOS)

Prerequisites

- Node.js (LTS recommended)
- Expo CLI (optional but useful) — `npm install -g expo-cli`

Install dependencies

```bash
cd ./gk1
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
