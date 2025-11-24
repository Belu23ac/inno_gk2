import { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Switch,
  Alert,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateProfile } from 'firebase/auth';
import AccountGuestView from '../../components/account/AccountGuestView';
import SettingSwitchRow from '../../components/settings/SettingSwitchRow';
import AccountActionButton from '../../components/account/AccountActionButton';
import { useAuth } from '../../contexts/AuthContext';
import { AccountSettingsStyle } from '../../styles/AccountSettingsStyle';
import { Colors } from '../../styles/Colors';

const AccountSettingsScreen = () => {
  const { user } = useAuth();
  const [pushUpdates, setPushUpdates] = useState(true);
  const [newDropAlerts, setNewDropAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [locationSharing, setLocationSharing] = useState(true);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [bio, setBio] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
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

  const handleSaveProfile = async () => {
    if (!displayName.trim()) {
      Alert.alert('Error', 'Display name cannot be empty');
      return;
    }

    setSavingProfile(true);
    try {
      await updateProfile(user, { displayName: displayName.trim() });
      await AsyncStorage.setItem('userBio', bio);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile: ' + error.message);
    }
    setSavingProfile(false);
  };

  if (!user) {
    return (
      <ScrollView
        style={AccountSettingsStyle.screen}
        contentContainerStyle={AccountSettingsStyle.guestContainer}
      >
        <AccountGuestView />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={AccountSettingsStyle.screen}
      contentContainerStyle={AccountSettingsStyle.container}
    >
      <View style={AccountSettingsStyle.section}>
        <Text style={AccountSettingsStyle.sectionTitle}>Profile</Text>
        
        <View style={AccountSettingsStyle.inputGroup}>
          <Text style={AccountSettingsStyle.label}>Display Name</Text>
          <TextInput
            style={AccountSettingsStyle.input}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Enter your display name"
            placeholderTextColor={Colors.subtitle}
          />
        </View>

        <View style={AccountSettingsStyle.inputGroup}>
          <Text style={AccountSettingsStyle.label}>Email</Text>
          <TextInput
            style={[AccountSettingsStyle.input, AccountSettingsStyle.inputDisabled]}
            value={user?.email || ''}
            editable={false}
            placeholderTextColor={Colors.subtitle}
          />
          <Text style={AccountSettingsStyle.caption}>
            Email cannot be changed here. Contact support if needed.
          </Text>
        </View>

        <View style={AccountSettingsStyle.inputGroup}>
          <Text style={AccountSettingsStyle.label}>Bio</Text>
          <TextInput
            style={[AccountSettingsStyle.input, AccountSettingsStyle.bioInput]}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
            placeholderTextColor={Colors.subtitle}
            multiline
            numberOfLines={3}
          />
        </View>

        <TouchableOpacity
          style={AccountSettingsStyle.saveButton}
          onPress={handleSaveProfile}
          disabled={savingProfile}
        >
          {savingProfile ? (
            <ActivityIndicator size="small" color={Colors.buttonText} />
          ) : (
            <Text style={AccountSettingsStyle.saveButtonText}>Save Profile</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={AccountSettingsStyle.section}>
        <Text style={AccountSettingsStyle.sectionTitle}>Notifications</Text>
        <SettingSwitchRow
          label="Push updates"
          caption="Get a ping when new beers drop nearby or a friend logs a tasting."
          value={pushUpdates}
          onValueChange={(value) => setPushUpdates(value)}
        />
        <SettingSwitchRow
          label="New drop alerts"
          caption="Be the first to know when limited releases are available in your area."
          value={newDropAlerts}
          onValueChange={(value) => setNewDropAlerts(value)}
        />
        <SettingSwitchRow
          label="Weekly digest"
          caption="Receive a curated list of events, trending beers, and recommended breweries each week."
          value={weeklyDigest}
          onValueChange={(value) => setWeeklyDigest(value)}
          last
        />
      </View>

      <View style={AccountSettingsStyle.section}>
        <Text style={AccountSettingsStyle.sectionTitle}>Privacy</Text>
        <View style={AccountSettingsStyle.row}>
          <View style={AccountSettingsStyle.rowText}>
            <Text style={AccountSettingsStyle.label}>Share location</Text>
            <Text style={AccountSettingsStyle.caption}>
              Allow the app to suggest nearby breweries and events based on your location.
            </Text>
          </View>
          <Switch
            value={locationSharing}
            onValueChange={(value) => {
              setLocationSharing(value);
            }}
            trackColor={{ false: Colors.lightGray, true: Colors.primarySoft }}
            thumbColor={Colors.surface}
          />
        </View>
        <View style={AccountSettingsStyle.actionRow}>
          <AccountActionButton
            title="Manage permissions"
            onPress={() => Alert.alert('Manage permissions', 'Opens system settings.')}
          />
          <AccountActionButton
            title="Privacy policy"
            onPress={() => Alert.alert('Privacy policy', 'Opening latest privacy policy...')}
          />
        </View>
      </View>

      <View style={AccountSettingsStyle.section}>
        <Text style={AccountSettingsStyle.sectionTitle}>Account</Text>
        <AccountActionButton
          title="Change email"
          onPress={() => Alert.alert('Change email', 'This would open the email change flow.')}
        />
        <AccountActionButton
          title="Reset password"
          onPress={() => Alert.alert('Reset password', 'This would trigger password reset.')}
        />
        <AccountActionButton
          title="Upgrade plan"
          onPress={() => Alert.alert('Upgrade plan', 'Explore premium tasting events and collections.')}
          style={AccountSettingsStyle.rowLast}
        />
      </View>
    </ScrollView>
  );
};

export default AccountSettingsScreen;
