import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const RegisterScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: Colors.gray,
  },
  inputContainer: {
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
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: Colors.inputBackground,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 18,
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkButton: {
    marginTop: 30,
  },
  linkText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.gray,
  },
  linkTextBold: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
});