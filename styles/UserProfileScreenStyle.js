import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const UserProfileScreenStyle = StyleSheet.create({
  // UserProfileScreen specific styles
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
  primaryText: {
    color: Colors.buttonText,
  },
  secondaryText: {
    color: Colors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
});