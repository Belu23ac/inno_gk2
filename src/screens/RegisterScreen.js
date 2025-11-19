import { useState } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import AuthTextField from '../components/auth/AuthTextField';
import AuthActions from '../components/auth/AuthActions';
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
          
          <AuthTextField
            label="Full Name"
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Enter your full name"
            autoCapitalize="words"
            autoCorrect={false}
          />

          <AuthTextField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />

          <AuthTextField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
          />

          <AuthTextField
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
          />

          <AuthActions onSubmit={handleRegister} loading={loading} onNavigateToLogin={() => navigation.navigate('Login')} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;