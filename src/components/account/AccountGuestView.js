import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AccountSettingsStyle } from '../../styles/AccountSettingsStyle';
import { Colors } from '../../styles/Colors';

export default function AccountGuestView() {
  const navigation = useNavigation();

  return (
    <View style={AccountSettingsStyle.guestContainer}>
      <View style={AccountSettingsStyle.guestIcon}>
        <Ionicons name="settings-outline" size={60} color={Colors.subtitle} />
      </View>
      <Text style={AccountSettingsStyle.guestTitle}>Log in to manage settings</Text>
      <Text style={AccountSettingsStyle.guestText}>
        Sign in to customize your notifications, privacy preferences, and account settings.
      </Text>
      <TouchableOpacity
        style={AccountSettingsStyle.guestButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={AccountSettingsStyle.guestButtonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={AccountSettingsStyle.guestButtonSecondary}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={AccountSettingsStyle.guestButtonSecondaryText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}
