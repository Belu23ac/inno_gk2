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
    boxShadow: `0px 1px 4px rgba(0, 0, 0, 0.1)`,
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
    boxShadow: `0px 0px 6px rgba(0, 0, 0, 0.9)`,
  },

  // HomeScreen specific styles
  safe: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  titleRow: { marginBottom: 12 },
  headerRow: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 10 },
  headerText: { flexDirection: "column" },
  username: { fontWeight: "700", fontSize: 16 },
  time: { color: "#777", fontSize: 12 },
  body: { marginTop: 8 },
  beerName: { fontSize: 16, fontWeight: "700" },
  breweryName: { color: "#333", marginTop: 2 },
  starsRow: { flexDirection: "row", marginTop: 6 },
  star: { fontSize: 16, marginRight: 2 },
  starFilled: { color: "#f5b301" },
  starEmpty: { color: "#ccc" },
  review: { marginTop: 8, color: "#333" },
  actionsRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  actionButton: { marginLeft: 12 },
  actionText: { color: "#007AFF", fontWeight: "600" },

  // DetailsScreen specific styles
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  empty: {
    color: '#555',
    marginBottom: 12,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
  },
  ratingNumber: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  starButton: {
    paddingHorizontal: 6,
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },

  //UserProfileScreen specific styles
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '100%',
    boxShadow: `0px 0px 8px rgba(0, 0, 0, 0.06)`,
    elevation: 3,
  },
  avatarProfile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  buttonProfile: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: Colors.buttonText,
  },
  secondaryText: {
    color: Colors.primary,
  },

  // AppDetailsScreen specific styles
  contentAppDetails: {
    padding: 20,
    paddingBottom: 40,
  },
  headerAppDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#f2b138',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '700',
  },
  titleBlock: {
    flex: 1,
  },
  titleAppDetails: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitleAppDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  bulletList: {
    paddingLeft: 6,
  },
  bullet: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  detail: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  actions: {
    marginTop: 12,
    flexDirection: 'column',
    gap: 8,
  },
  buttonAppDetails: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryButtonAppDetails: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1e90ff',
  },
  buttonTextAppDetails: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButtonTextAppDetails: {
    color: '#1e90ff',
  },
});
