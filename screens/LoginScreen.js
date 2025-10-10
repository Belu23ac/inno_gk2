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
import { LoginScreenStyle } from '../styles/LoginScreenStyle';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Login Error', result.error);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={LoginScreenStyle.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={LoginScreenStyle.scrollContainer}>
        <View style={LoginScreenStyle.formContainer}>
          <Text style={LoginScreenStyle.title}>Welcome Back</Text>
          <Text style={LoginScreenStyle.subtitle}>Sign in to your account</Text>
          
          <View style={LoginScreenStyle.inputContainer}>
            <Text style={LoginScreenStyle.label}>Email</Text>
            <TextInput
              style={LoginScreenStyle.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={LoginScreenStyle.inputContainer}>
            <Text style={LoginScreenStyle.label}>Password</Text>
            <TextInput
              style={LoginScreenStyle.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity
            style={[LoginScreenStyle.button, loading && LoginScreenStyle.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={LoginScreenStyle.buttonText}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={LoginScreenStyle.linkButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={LoginScreenStyle.linkText}>
              Don't have an account? <Text style={LoginScreenStyle.linkTextBold}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;