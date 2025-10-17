# GK2 — Beer Discovery App (React Native / Expo)

En mobilapp til at opdage og dele øl og bryggerier — med kortvisning, stregkodelæser, søgning og brugerprofiler.

## Demo

▶️ Se demovide på Vimeo. [https://vimeo.com/1128129557]

## Bidrag og ansvar

Nedenfor listes hvem der har implementeret hvilke nye funktionaliteter ift kravsspeficikationerne til gk2.

- Bertram Lund [Belu23ac] (171387) — Login- og brugerfunktion med integrering af firebase login  
- Benjamin
- Ravn
- Albert

## Opsætning og kørsel

Forudsætninger

- Node.js (anbefalet LTS)
- Expo CLI (valgfrit, men nyttigt) — `npm install -g expo-cli`

Installer afhængigheder

```bash
cd ./gk2
npm install
```

Kør appen

```bash
# Start Expo
npm start

# eller brug Expo CLI direkte
npx expo start
```

Du kan åbne QR-koden i Expo Go-appen på en fysisk enhed eller køre appen i iOS-simulatorer.

## Projektstruktur

Projektet indeholder hovedmapper og -filer, der gør det nemmere at navigere i koden:

- `src/` – kildekode til appen
	- `App.js`, `index.js` – entry points
	- `assets/` – billeder og andre statiske filer
	- `components/` – genanvendelige UI-komponenter
	- `contexts/` – React contexts (f.eks. `AuthContext`)
	- `screens/` – appens skærme (f.eks. `HomeScreen.js`, `ScanScreen.js`)
	- `stack/` – navigation stacks
	- `styles/` – styling og farver
	- `utils/` – hjælpefunktioner
- `package.json` – afhængigheder og scripts

## Fejlfinding

- Hvis afhængigheder fejler, slet `node_modules` og geninstaller:

```bash
rm -rf node_modules package-lock.json
npm install
```

- Hvis Expo-cachen giver problemer, start med at rydde cachen:

```bash
npx expo start -c
```

- iOS-simulator: brug Xcode eller Expo CLI til at åbne på simulatoren

## Tips

- Brug en fysisk telefon med Expo Go for hurtig test.
- Hvis du ændrer native afhængigheder (ikke typisk i managed Expo), genstart Metro bundleren.