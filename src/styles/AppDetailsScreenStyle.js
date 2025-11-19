import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const AppDetailsScreenStyle = StyleSheet.create({
  // AppDetailsScreen specific styles
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
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
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 36,
    color: Colors.white,
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
    color: Colors.darkGray,
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
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  bulletList: {
    paddingLeft: 6,
  },
  bullet: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  detail: {
    fontSize: 14,
    color: Colors.textDark,
    marginBottom: 4,
  },
  actions: {
    marginTop: 12,
    flexDirection: 'column',
    gap: 8,
  },
  buttonAppDetails: {
    backgroundColor: Colors.blue,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryButtonAppDetails: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.blue,
  },
  buttonTextAppDetails: {
    color: Colors.white,
    fontWeight: '600',
  },
  secondaryButtonTextAppDetails: {
    color: Colors.blue,
  },
});