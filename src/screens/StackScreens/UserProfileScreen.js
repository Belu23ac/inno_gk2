import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateProfile } from 'firebase/auth';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useAuth } from '../../contexts/AuthContext';
import { GlobalStyle } from '../../styles/GlobalStyle';
import { UserProfileScreenStyle } from '../../styles/UserProfileScreenStyle';
import { Colors } from '../../styles/Colors';

export default function UserProfileScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
    }
    // Load bio from storage
    const loadBio = async () => {
      try {
        const storedBio = await AsyncStorage.getItem('userBio');
        if (storedBio) {
          setBio(storedBio);
        } else {
          setBio('Front-end developer. Loves coffee, cats, and clean UI.');
        }
      } catch (error) {
        console.error('Failed to load bio:', error);
        setBio('Front-end developer. Loves coffee, cats, and clean UI.');
      }
    };
    loadBio();
  }, [user]);

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <ScrollView contentContainerStyle={UserProfileScreenStyle.guestContainer}>
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
      </ScrollView>
    );
  }

  const handleSave = async () => {
    if (!displayName.trim()) {
      Alert.alert('Error', 'Display name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      await updateProfile(user, { displayName: displayName.trim() });
      // Save bio to storage
      await AsyncStorage.setItem('userBio', bio);
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile: ' + error.message);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={[GlobalStyle.container]}>
        <View style={UserProfileScreenStyle.profileCard}>
          <Text style={UserProfileScreenStyle.title}>Edit Profile</Text>

          <View style={UserProfileScreenStyle.inputContainer}>
            <Text style={UserProfileScreenStyle.label}>Display Name</Text>
            <TextInput
              style={UserProfileScreenStyle.input}
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Enter your display name"
              autoCapitalize="words"
            />
          </View>

          <View style={UserProfileScreenStyle.inputContainer}>
            <Text style={UserProfileScreenStyle.label}>Email</Text>
            <TextInput
              style={[UserProfileScreenStyle.input, UserProfileScreenStyle.inputDisabled]}
              value={email}
              editable={false}
              placeholder="Your email"
            />
            <Text style={UserProfileScreenStyle.caption}>
              Email cannot be changed here. Contact support if needed.
            </Text>
          </View>

          <View style={UserProfileScreenStyle.inputContainer}>
            <Text style={UserProfileScreenStyle.label}>Bio</Text>
            <TextInput
              style={[UserProfileScreenStyle.input, UserProfileScreenStyle.bioInput]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <View style={UserProfileScreenStyle.buttonsRow}>
            <TouchableOpacity
              style={[UserProfileScreenStyle.buttonProfile, UserProfileScreenStyle.secondary]}
              onPress={handleCancel}
            >
              <Text style={[UserProfileScreenStyle.buttonText, UserProfileScreenStyle.secondaryText]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[UserProfileScreenStyle.buttonProfile, UserProfileScreenStyle.primary, loading && UserProfileScreenStyle.buttonDisabled]}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={[UserProfileScreenStyle.buttonText, UserProfileScreenStyle.primaryText]}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}