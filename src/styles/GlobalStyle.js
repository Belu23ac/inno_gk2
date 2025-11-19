import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const GlobalStyle = StyleSheet.create({
  // ===== LAYOUT =====
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 12, // centrering fjernet her!
  },
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
    alignItems: "center",
  },
  content: {
    width: "100%",
    maxWidth: 900,
  },
  flex1: { flex: 1 },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: { flexDirection: "column" },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  // ===== TYPOGRAFI =====
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
  headingLarge: {
    fontSize: 28,
    fontWeight: "900",
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
  label: {
    minWidth: 98,
    color: Colors.subtitle,
    fontWeight: "600",
  },

  // ===== INPUTS =====
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
    width: "100%",
    color: Colors.text,
  },

  // ===== KNAPPER =====
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: "600",
  },

  // ===== KORT, DIVIDER, AVATAR =====
  cardBase: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    width: "100%",
    boxShadow: `0px 2px 8px ${Colors.shadowMedium}`,
    elevation: 2,
  },
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
    marginVertical: 10,
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

  // ===== HEADERS =====
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },

  // ===== BARCODE SCANNER =====
  barcode: {
    width: 300,
    height: 140,
    backgroundColor: Colors.background,
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 20,
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
  backgroundImage: {
    position: 'absolute',
    right: -80,
    top: -70,
    width: 620,
    height: 620,
    opacity: 0.06,
    resizeMode: 'contain',
    zIndex: 0,
    pointerEvents: 'none',
  },
  // App background components — used by `AppBackground.js`
  appBackgroundRoot: {
    flex: 1,
    position: 'relative',
  },
  appBackgroundContent: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  appBackgroundWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  appBackgroundCentered: {
    width: 620,
    height: 620,
    opacity: 0.06,
    resizeMode: 'contain',
  },
  containerSolid: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
