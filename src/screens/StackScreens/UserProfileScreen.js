import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateProfile } from 'firebase/auth';
import ProfileGuestView from '../../components/account/ProfileGuestView';
import ProfileField from '../../components/account/ProfileField';
import ProfileActionButtons from '../../components/account/ProfileActionButtons';
import { useAuth } from '../../contexts/AuthContext';
import { GlobalStyle } from '../../styles/GlobalStyle';
import { UserProfileScreenStyle } from '../../styles/UserProfileScreenStyle';

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
      <ScrollView
        style={UserProfileScreenStyle.screen}
        contentContainerStyle={UserProfileScreenStyle.guestContainer}
      >
        <ProfileGuestView />
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
      style={UserProfileScreenStyle.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={[GlobalStyle.container, UserProfileScreenStyle.screenContent]}>
        <View style={UserProfileScreenStyle.profileCard}>
          <Text style={UserProfileScreenStyle.title}>Edit Profile</Text>

          <ProfileField
            label="Display Name"
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Enter your display name"
            inputStyle={{}}
          />

          <ProfileField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Your email"
            editable={false}
            inputStyle={UserProfileScreenStyle.inputDisabled}
          />
          <Text style={UserProfileScreenStyle.caption}>
            Email cannot be changed here. Contact support if needed.
          </Text>

          <ProfileField
            label="Bio"
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={3}
            inputStyle={UserProfileScreenStyle.bioInput}
          />

          <ProfileActionButtons onCancel={handleCancel} onSave={handleSave} loading={loading} />
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}