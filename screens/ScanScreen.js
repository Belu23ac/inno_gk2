// /Users/bertram/Documents/Skole/inno/gk1/screens/ScanScreen.js
import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, Animated, Easing, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { GlobalStyle } from "../styles/GlobalStyle";
import { ScanScreenStyle } from "../styles/ScanScreenStyle";

const SAMPLE_BEERS = [
  {
    id: "1",
    name: "Hoppy Trails IPA",
    brewery: "Trailside Brewery",
    abv: "6.5%",
    _raw: {
      style: "American IPA",
      ibu: "65",
      country: "USA",
      category: "Craft Beer",
      description: "A bold IPA with citrus and pine notes from Cascade hops. Perfect for hop lovers seeking adventure.",
      image: "https://example.com/hoppy-trails.jpg"
    }
  },
  {
    id: "2",
    name: "Sunset Lager",
    brewery: "Golden Road",
    abv: "4.7%",
    _raw: {
      style: "American Lager",
      ibu: "20",
      country: "USA",
      category: "Lager",
      description: "Smooth and crisp lager with golden hues, ideal for watching the sunset. Clean finish with subtle malt sweetness.",
      image: "https://example.com/sunset-lager.jpg"
    }
  },
  {
    id: "3",
    name: "Midnight Stout",
    brewery: "Dark Harbor",
    abv: "8.2%",
    _raw: {
      style: "Russian Imperial Stout",
      ibu: "75",
      country: "USA",
      category: "Stout",
      description: "Rich and robust imperial stout with notes of dark chocolate, coffee, and roasted malt. A midnight indulgence.",
      image: "https://example.com/midnight-stout.jpg"
    }
  },
  {
    id: "4",
    name: "Citrus Ale",
    brewery: "Brightside Brewing",
    abv: "5.0%",
    _raw: {
      style: "American Pale Ale",
      ibu: "45",
      country: "USA",
      category: "Ale",
      description: "Bright and refreshing pale ale bursting with citrus flavors from American hops. A sunny companion for any occasion.",
      image: "https://example.com/citrus-ale.jpg"
    }
  },
];

export default function ScanScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);
  const scanAnim = React.useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, []);

  const handleStartScan = async () => {
    if (isScanning || !cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      setCapturedPhoto(photo);
    } catch (error) {
      console.warn('Capture failed', error);
    }
    setShowInstruction(false);
    startScanAnimation();
  };

  const startScanAnimation = () => {
    setIsScanning(true);
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
    animationRef.current = loopAnim;

    // start and navigate when all iterations complete
    loopAnim.start(() => {
      const beer =
        SAMPLE_BEERS[Math.floor(Math.random() * SAMPLE_BEERS.length)];
      animationRef.current = null;
      setIsScanning(false);
      setShowInstruction(true);
      setCapturedPhoto(null);
      navigation.navigate("Selected Beer", { beer });
    });
  };

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-110, 110],
  });

  // Handle camera permissions
  if (!permission) {
    return <View style={GlobalStyle.container}><Text>Loading...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={GlobalStyle.container}>
        <Text style={GlobalStyle.text}>We need your permission to show the camera</Text>
        <TouchableOpacity style={GlobalStyle.primaryButton} onPress={requestPermission}>
          <Text style={GlobalStyle.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={ScanScreenStyle.screen}>
      <CameraView ref={cameraRef} style={ScanScreenStyle.camera} facing="back" />
      {capturedPhoto && (
        <Image source={{ uri: capturedPhoto.uri }} style={ScanScreenStyle.preview} />
      )}

      <View style={ScanScreenStyle.overlay}>
  <View style={ScanScreenStyle.centerWrapper} pointerEvents="box-none">
          <View style={ScanScreenStyle.reticle}>
            <View style={ScanScreenStyle.reticleInner} />
            {isScanning && (
              <Animated.View
                pointerEvents="none"
                style={[
                  ScanScreenStyle.scanLine,
                  { transform: [{ translateY }] },
                ]}
              />
            )}
          </View>
        </View>

        {showInstruction && (
          <>
            <View style={ScanScreenStyle.instructionCard}>
              <Text style={ScanScreenStyle.instructionTitle}>Keep it steady</Text>
              <Text style={ScanScreenStyle.instructionCopy}>
                Align the label inside the frame before you start scanning.
              </Text>
            </View>

            <TouchableOpacity
              style={ScanScreenStyle.cameraButton}
              onPress={handleStartScan}
              activeOpacity={0.8}
            >
              <View style={ScanScreenStyle.cameraRing}>
                <View style={ScanScreenStyle.cameraCore} />
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
      <StatusBar style="light" />
    </View>
  );
}