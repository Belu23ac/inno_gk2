import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const AppDetailsScreenStyle = StyleSheet.create({
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