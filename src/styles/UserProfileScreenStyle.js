import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const UserProfileScreenStyle = StyleSheet.create({
  // UserProfileScreen specific styles
  profileCard: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '100%',
    boxShadow: `0px 0px 8px ${Colors.shadowLight}`,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: Colors.text,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.inputBackground,
    color: Colors.text,
  },
  inputDisabled: {
    backgroundColor: Colors.lightGray,
    color: Colors.darkGray,
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  caption: {
    fontSize: 12,
    color: Colors.subtitle,
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  avatarProfile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: Colors.lightGray,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: Colors.textDark,
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