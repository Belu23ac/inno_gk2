# Cervisia — Øl App (React Native / Expo)

En mobilapp til at opdage og dele øl og bryggerier — med stregkodelæser, søgning, kort, anmeldelser og brugerprofiler.

## Demo

▶️ Se demovideo på Youtube: [https://youtube.com/shorts/sRWCLdT1lXQ?si=dRy9YDZtIhHcwWPM]

## Funktioner

- **Autentificering**: Login og registrering med Firebase Authentication
- **Søgning**: Find øl med RapidAPI integration og intelligent søgefunktionalitet
- **Scanning**: Scan ølflasker med kamera for hurtig information
- **Kort**: Find bryggerier i nærheden via OpenStreetMap og Overpass API
- **Anmeldelser**: Bedøm og anmeld øl med stjerner og tekst
- **Favoritter**: Gem dine foretrukne øl
- **Brugerprofil**: Se dine anmeldelser, favoritter og kontoindstillinger
- **Ugens tilbud**: Særlige tilbud på udvalgte øl

## Opsætning og kørsel

### Forudsætninger

- Node.js (anbefalet LTS-version)
- Expo CLI — `npm install -g expo-cli` (valgfrit, men anbefalet)
- Firebase-projekt med Authentication aktiveret

### Installer afhængigheder

```bash
cd ./gk2
npm install
```

### Kør appen

```bash
# Start Expo development server
npm start

# Eller brug Expo CLI direkte
npx expo start

# Start med tunnel (hvis QR-kode ikke virker)
npx expo start --tunnel
```

Scan QR-koden med Expo Go-appen på din telefon, eller åbn appen i iOS Simulator / Android Emulator.

## Projektstruktur

```
gk2/
├── src/
│   ├── App.js              # Hovedkomponent med navigation
│   ├── index.js            # Entry point
│   ├── assets/             # Billeder (ølflasker, baggrunde)
│   ├── components/         # Genanvendelige UI-komponenter
│   │   ├── account/        # Kontovisninger og knapper
│   │   ├── auth/           # Login/registrering komponenter
│   │   ├── beer/           # Øldetaljer (header, actions)
│   │   ├── home/           # Hjemmeskærm (hero, tilbud, sektioner)
│   │   ├── map/            # Kortvisning og markører
│   │   ├── reviews/        # Anmeldelsesformular og visning
│   │   ├── scan/           # Scanningsknapper og instruktioner
│   │   ├── search/         # Søgebar og resultater
│   │   ├── settings/       # Profilkort og indstillinger
│   │   └── ui/             # Generelle UI-komponenter
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.js  # Brugergodkendelse
│   │   └── useLocation.js  # Lokationshåndtering
│   ├── database/
│   │   └── firebase.js     # Firebase-konfiguration
│   ├── hooks/              # Custom hooks
│   │   ├── MockBeers.js    # Mock-data for øl
│   │   ├── useBeerSearch.js
│   │   ├── useNearbyBars.js
│   │   └── useScanAnimation.js
│   ├── screens/            # Hovedskærme
│   │   ├── HomeScreen.js
│   │   ├── SearchScreen.js
│   │   ├── ScanScreen.js
│   │   ├── MapScreen.js
│   │   ├── SettingsScreen.js
│   │   └── StackScreens/   # Stack-navigation skærme
│   │       ├── SelectedBeerScreen.js
│   │       ├── ReviewsScreen.js
│   │       ├── FavoritesScreen.js
│   │       ├── AccountSettingsScreen.js
│   │       └── AppDetailsScreen.js
│   ├── stack/              # Navigation stacks
│   │   ├── AuthStack.js
│   │   ├── HomeStack.js
│   │   ├── SearchStack.js
│   │   ├── ScanStack.js
│   │   └── SettingsStack.js
│   ├── styles/             # StyleSheet-filer
│   │   ├── Colors.js       # Farvetema
│   │   ├── GlobalStyle.js
│   │   └── [Diverse]ScreenStyle.js
│   └── utils/              # Hjælpefunktioner
│       ├── date.js         # Datoformatering
│       └── distance.js     # Afstandsberegning
├── app.json                # Expo-konfiguration
└── package.json            # Afhængigheder og scripts
```

## Teknologier

- **React Native** med **Expo** — cross-platform mobiludvikling
- **React Navigation** — tab- og stack-navigation
- **Firebase** — authentication, Firestore database
- **RapidAPI** — øldata og søgning
- **Overpass API** — kortdata fra OpenStreetMap
- **Expo Camera** — kamerafunktionalitet til scanning
- **Ionicons** — ikoner

## Fejlfinding

### Afhængigheder fejler

Hvis installation af afhængigheder fejler, slet `node_modules` og geninstaller:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Expo-cache problemer

Start med at rydde cachen:

```bash
npx expo start -c
```

### QR-kode virker ikke

Prøv at starte med tunnel-mode:

```bash
npx expo start --tunnel
```

### iOS Simulator

Brug Xcode eller Expo CLI til at åbne appen i simulatoren:

```bash
# Tryk 'i' i terminalen efter npx expo start
```

### Android Emulator

Start en Android emulator først, derefter:

```bash
# Tryk 'a' i terminalen efter npx expo start
```

## Tips til udvikling

- Brug en fysisk telefon med Expo Go for den bedste testoplevelse
- Hot reload er aktiveret som standard — gem filer for at se ændringer med det samme
- Brug React Developer Tools til debugging
- Check Expo dokumentation for native funktionalitet: https://docs.expo.dev

## Licens

Dette projekt er udviklet som studieprojekt.
