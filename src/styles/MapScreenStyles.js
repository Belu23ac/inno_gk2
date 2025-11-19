import { StyleSheet } from "react-native";
import { Colors } from './Colors';

const MapScreenStyles = StyleSheet.create({
  map: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapScreenStyles;

// Provide the default loading color for the map spinner so screens can reuse it
export const spinnerColor = Colors.primary;