import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { RegisterScreenStyle } from '../styles/RegisterScreenStyle';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !displayName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    const result = await register(email, password, displayName);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Registration Error', result.error);
    } else {
      // Navigate back to the previous screen after successful registration
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={RegisterScreenStyle.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={RegisterScreenStyle.scrollContainer}>
        <View style={RegisterScreenStyle.formContainer}>
          <Text style={RegisterScreenStyle.title}>Create Account</Text>
          <Text style={RegisterScreenStyle.subtitle}>Sign up to get started</Text>
          
          <View style={RegisterScreenStyle.inputContainer}>
            <Text style={RegisterScreenStyle.label}>Full Name</Text>
            <TextInput
              style={RegisterScreenStyle.input}
              placeholder="Enter your full name"
              value={displayName}
              onChangeText={setDisplayName}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          <View style={RegisterScreenStyle.inputContainer}>
            <Text style={RegisterScreenStyle.label}>Email</Text>
            <TextInput
              style={RegisterScreenStyle.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={RegisterScreenStyle.inputContainer}>
            <Text style={RegisterScreenStyle.label}>Password</Text>
            <TextInput
              style={RegisterScreenStyle.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={RegisterScreenStyle.inputContainer}>
            <Text style={RegisterScreenStyle.label}>Confirm Password</Text>
            <TextInput
              style={RegisterScreenStyle.input}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity
            style={[RegisterScreenStyle.button, loading && RegisterScreenStyle.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={RegisterScreenStyle.buttonText}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={RegisterScreenStyle.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={RegisterScreenStyle.linkText}>
              Already have an account? <Text style={RegisterScreenStyle.linkTextBold}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;