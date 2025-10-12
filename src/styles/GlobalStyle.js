import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const GlobalStyle = StyleSheet.create({
  // root wrappers center content and constrain max width for large screens
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
    alignItems: "center",
  },

  // content holds the page content and limits its width so things don't get too wide
  content: {
    width: "100%",
    maxWidth: 900,
  },

  flex1: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.title,
  },
  titleHome: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.titleHome,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.subtitle,
  },
  text: {
    fontSize: 14,
    color: Colors.text,
  },
  mutedText: {
    fontSize: 12,
    color: Colors.inactive,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
    width: "100%",
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: "600",
  },
  // cards constrained so they don't span the whole screen on wide displays
  card: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 12,
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
    boxShadow: `0px 1px 4px ${Colors.shadowMedium}`,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 8,
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  badge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: Colors.badge,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  
  // Generic header style used by multiple screens
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },

  // specific styles for the barcode scanner component
  barcode: {
    width: 300,
    height: 140,
    backgroundColor: Colors.background,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bars: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
  },
  bar: {
    height: "100%",
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: Colors.barcodeScanner,
    boxShadow: `0px 0px 6px ${Colors.shadowScanLine}`,
  },
});
