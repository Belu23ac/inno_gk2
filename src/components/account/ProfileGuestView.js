import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserProfileScreenStyle } from '../../styles/UserProfileScreenStyle';
import { Colors } from '../../styles/Colors';

export default function ProfileGuestView() {
  const navigation = useNavigation();

  return (
    <View
      style={UserProfileScreenStyle.guestContainer}
    >
      <View style={UserProfileScreenStyle.guestIcon}>
        <Ionicons name="person-outline" size={60} color={Colors.subtitle} />
      </View>
      <Text style={UserProfileScreenStyle.guestTitle}>Log in to edit your profile</Text>
      <Text style={UserProfileScreenStyle.guestText}>
        Sign in to update your profile information, add a bio, and personalize your account.
      </Text>
      <TouchableOpacity
        style={UserProfileScreenStyle.guestButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={UserProfileScreenStyle.guestButtonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={UserProfileScreenStyle.guestButtonSecondary}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={UserProfileScreenStyle.guestButtonSecondaryText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}
