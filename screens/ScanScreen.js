// /Users/bertram/Documents/Skole/inno/gk1/screens/ScanScreen.js
import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button, Alert, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
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
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);
  const scanAnim = React.useRef(new Animated.Value(0)).current;

  const scanBarcode = () => {
    // dummy scan -> pick a random beer
    const beer = SAMPLE_BEERS[Math.floor(Math.random() * SAMPLE_BEERS.length)];

    // navigate to Selected Beer and pass the beer object as a param
    navigation.navigate("Selected Beer", { beer });
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;
    
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      setCapturedPhoto(photo);
      startScanAnimation();
    } catch (error) {
      Alert.alert("Error", "Failed to take picture");
    }
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

    // start and navigate when all iterations complete
    loopAnim.start(() => {
      const beer =
        SAMPLE_BEERS[Math.floor(Math.random() * SAMPLE_BEERS.length)];
      setIsScanning(false);
      setCapturedPhoto(null);
      navigation.navigate("Selected Beer", { beer });
    });
  };

  const startScan = () => {
    startScanAnimation();
  };

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-70, 70],
  });

  const barPattern = Array.from({ length: 100 }).map((_, i) =>
    i % 3 === 0 ? 6 : i % 2 === 0 ? 3 : 1
  );

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

  // Show scanning animation over the captured photo if scanning is in progress
  if (isScanning && capturedPhoto) {
    return (
      <View style={GlobalStyle.container}>
        <Text>Scanning your photo...</Text>
        <View style={styles.photoScanContainer}>
          <Image source={{ uri: capturedPhoto.uri }} style={styles.capturedImage} />
          
          {/* Scanner overlay */}
          <View style={styles.scannerOverlay}>
            <Animated.View
              pointerEvents="none"
              style={[
                styles.photoScanLine,
                {
                  transform: [{ translateY }],
                },
              ]}
            />
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={GlobalStyle.container}>
      <Text style={GlobalStyle.text}>Take a picture to scan for beer information</Text>
      
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
        >
          <View style={styles.cameraOverlay}>
            <TouchableOpacity 
              style={styles.captureButton} 
              onPress={takePicture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = {
  cameraContainer: {
    width: 300,
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 20,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  photoScanContainer: {
    width: 300,
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 20,
    position: 'relative',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoScanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#ff4444',
    shadowColor: '#ff4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  }
};