// /Users/bertram/Documents/Skole/inno/gk1/screens/ScanScreen.js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
import { GlobalStyle } from "../styles/GlobalStyle";
const {
  Animated,
  Easing,
  TouchableOpacity,
} = require("react-native");

const SAMPLE_BEERS = [
  {
    id: "1",
    name: "Hoppy Trails IPA",
    brewery: "Trailside Brewery",
    abv: "6.5%",
  },
  { id: "2", name: "Sunset Lager", brewery: "Golden Road", abv: "4.7%" },
  { id: "3", name: "Midnight Stout", brewery: "Dark Harbor", abv: "8.2%" },
  { id: "4", name: "Citrus Ale", brewery: "Brightside Brewing", abv: "5.0%" },
];

export default function ScanScreen({ navigation }) {
  const scanBarcode = () => {
    // dummy scan -> pick a random beer
    const beer = SAMPLE_BEERS[Math.floor(Math.random() * SAMPLE_BEERS.length)];

    // navigate to Selected Beer and pass the beer object as a param
    navigation.navigate("Selected Beer", { beer });
  };

  const scanAnim = React.useRef(new Animated.Value(0)).current;

  const startScan = () => {
    // reset
    scanAnim.setValue(0);

    // one full cycle = forward (0 -> 1) then back (1 -> 0) = 1000ms
    const cycle = Animated.sequence([
      Animated.timing(scanAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scanAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]);

    // run the cycle 3 times => 3 seconds total
    const loopAnim = Animated.loop(cycle, { iterations: 3 });

    // start and navigate when all iterations complete
    loopAnim.start(() => {
      const beer =
        SAMPLE_BEERS[Math.floor(Math.random() * SAMPLE_BEERS.length)];
      navigation.navigate("Selected Beer", { beer });
    });
  };

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-70, 70],
  });

  const barPattern = Array.from({ length: 100 }).map((_, i) =>
    i % 3 === 0 ? 6 : i % 2 === 0 ? 3 : 1
  );

  return (
    <View style={GlobalStyle.container}>
      <Text>Press the barcode to start scanning</Text>

      <TouchableOpacity activeOpacity={0.85} onPress={startScan}>
        <View style={GlobalStyle.barcode}>
          <View style={GlobalStyle.bars}>
            {barPattern.map((w, i) => (
              <View
                key={i}
                style={[
                  GlobalStyle.bar,
                  {
                    width: w,
                    backgroundColor: i % 2 === 0 ? "#000" : "#fff",
                  },
                ]}
              />
            ))}
          </View>

          <Animated.View
            pointerEvents="none"
            style={[
              GlobalStyle.scanLine,
              {
                transform: [{ translateY }],
              },
            ]}
          />
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}