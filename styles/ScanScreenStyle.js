import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const ScanScreenStyle = StyleSheet.create({
  fullscreenContainer: {
    flex: 1,
    backgroundColor: Colors.scannerBackground,
  },
  instructionText: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: Colors.overlayDark,
    color: Colors.scannerWhite,
    textAlign: 'center',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    zIndex: 1,
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.transparent,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
    height: 100,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.overlayLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.scannerWhite,
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.scannerWhite,
  },
  photoScanContainer: {
    flex: 1,
    width: '100%',
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
    backgroundColor: Colors.scanRed,
    shadowColor: Colors.scanRed,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  }
});