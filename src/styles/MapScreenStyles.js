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
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.subtitle,
    fontWeight: "500",
  },
  barsLoadingOverlay: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    alignItems: "center",
    zIndex: 10,
  },
  barsLoadingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 10,
    shadowColor: Colors.shadowLight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  barsLoadingText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "500",
  },
});

export default MapScreenStyles;

// Provide the default loading color for the map spinner so screens can reuse it
export const spinnerColor = Colors.primary;