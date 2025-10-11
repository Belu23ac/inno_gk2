# GK2 — Beer Discovery App (React Native / Expo)

A React Native app built with Expo for discovering beers and breweries. Features a social feed, interactive map, barcode scanning, search functionality, and user profiles.

## Demo

[▶️ Watch Demo Video on Vimeo
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
