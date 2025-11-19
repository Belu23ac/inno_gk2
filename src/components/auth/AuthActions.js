import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { RegisterScreenStyle } from '../../styles/RegisterScreenStyle';

export default function AuthActions({ onSubmit, loading, onNavigateToLogin }){
  return (
    <>
      <TouchableOpacity
        style={[RegisterScreenStyle.button, loading && RegisterScreenStyle.buttonDisabled]}
        onPress={onSubmit}
        disabled={loading}
      >
        <Text style={RegisterScreenStyle.buttonText}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={RegisterScreenStyle.linkButton}
        onPress={onNavigateToLogin}
      >
        <Text style={RegisterScreenStyle.linkText}>
          Already have an account? <Text style={RegisterScreenStyle.linkTextBold}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </>
  );
}
