import { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import useScanAnimation from "../hooks/useScanAnimation";
import ScanInstructionCard from "../components/scan/ScanInstructionCard";
import ScanCameraButton from "../components/scan/ScanCameraButton";
import { GlobalStyle } from "../styles/GlobalStyle";
import { ScanScreenStyle } from "../styles/ScanScreenStyle";

export default function ScanScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [showInstruction, setShowInstruction] = useState(true);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);
  const { scanAnim, isScanning, startScan } = useScanAnimation();


  const handleStartScan = async () => {
    if (isScanning || !cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      setCapturedPhoto(photo);
    } catch (error) {
      console.warn("Capture failed", error);
    }
    setShowInstruction(false);
    startScan((beer) => {
      setShowInstruction(true);
      setCapturedPhoto(null);
      navigation.navigate("Selected Beer", { beer });
    });
  };

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-110, 110],
  });

  if (!permission) {
    return (
      <View style={GlobalStyle.containerSolid}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={GlobalStyle.containerSolid}>
        <Text style={GlobalStyle.text}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          style={GlobalStyle.primaryButton}
          onPress={requestPermission}
        >
          <Text style={GlobalStyle.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={ScanScreenStyle.screen}>
      <CameraView
        ref={cameraRef}
        style={ScanScreenStyle.camera}
        facing="back"
      />
      {capturedPhoto && (
        <Image
          source={{ uri: capturedPhoto.uri }}
          style={ScanScreenStyle.preview}
        />
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
            <ScanInstructionCard />
            <ScanCameraButton onPress={handleStartScan} />
          </>
        )}
      </View>
      <StatusBar style="light" />
    </View>
  );
}
