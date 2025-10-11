import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AccountSettingsStyle } from '../../styles/AccountSettingsStyle';
import { Colors } from '../../styles/Colors';

const AccountSettingsScreen = () => {
  const [pushUpdates, setPushUpdates] = useState(true);
  const [newDropAlerts, setNewDropAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [locationSharing, setLocationSharing] = useState(true);

  const toggleMessage = (label, enabled) => {
    Alert.alert(label, enabled ? 'Enabled' : 'Disabled');
  };

  return (
    <ScrollView contentContainerStyle={AccountSettingsStyle.container}>
      <View style={AccountSettingsStyle.section}>
        <Text style={AccountSettingsStyle.sectionTitle}>Notifications</Text>
        <View style={AccountSettingsStyle.row}>
          <View style={AccountSettingsStyle.rowText}>
            <Text style={AccountSettingsStyle.label}>Push updates</Text>
            <Text style={AccountSettingsStyle.caption}>
              Get a ping when new beers drop nearby or a friend logs a tasting.
            </Text>
          </View>
          <Switch
            value={pushUpdates}
            onValueChange={(value) => {
              setPushUpdates(value);
              toggleMessage('Push updates', value);
            }}
            trackColor={{ false: Colors.lightGray, true: Colors.primarySoft }}
            thumbColor={pushUpdates ? Colors.primary : Colors.surface}
          />
        </View>
        <View style={AccountSettingsStyle.row}>
          <View style={AccountSettingsStyle.rowText}>
            <Text style={AccountSettingsStyle.label}>New drop alerts</Text>
            <Text style={AccountSettingsStyle.caption}>
              Be the first to know when limited releases are available in your area.
            </Text>
          </View>
          <Switch
            value={newDropAlerts}
            onValueChange={(value) => {
              setNewDropAlerts(value);
              toggleMessage('New drop alerts', value);
            }}
            trackColor={{ false: Colors.lightGray, true: Colors.primarySoft }}
            thumbColor={newDropAlerts ? Colors.primary : Colors.surface}
          />
        </View>
        <View style={[AccountSettingsStyle.row, AccountSettingsStyle.rowLast]}>
          <View style={AccountSettingsStyle.rowText}>
            <Text style={AccountSettingsStyle.label}>Weekly digest</Text>
            <Text style={AccountSettingsStyle.caption}>
              Receive a curated list of events, trending beers, and recommended breweries each week.
            </Text>
          </View>
          <Switch
            value={weeklyDigest}
            onValueChange={(value) => {
              setWeeklyDigest(value);
              toggleMessage('Weekly digest', value);
            }}
            trackColor={{ false: Colors.lightGray, true: Colors.primarySoft }}
            thumbColor={weeklyDigest ? Colors.primary : Colors.surface}
          />
        </View>
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
              toggleMessage('Location sharing', value);
            }}
            trackColor={{ false: Colors.lightGray, true: Colors.primarySoft }}
            thumbColor={locationSharing ? Colors.primary : Colors.surface}
          />
        </View>
        <View style={AccountSettingsStyle.actionRow}>
          <TouchableOpacity
            style={AccountSettingsStyle.actionButton}
            onPress={() => Alert.alert('Manage permissions', 'Opens system settings.')}
          >
            <Text style={AccountSettingsStyle.actionText}>Manage permissions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={AccountSettingsStyle.actionButton}
            onPress={() => Alert.alert('Privacy policy', 'Opening latest privacy policy...')}
          >
            <Text style={AccountSettingsStyle.actionText}>Privacy policy</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={AccountSettingsStyle.section}>
        <Text style={AccountSettingsStyle.sectionTitle}>Account</Text>
        <TouchableOpacity
          style={AccountSettingsStyle.actionButton}
          onPress={() => Alert.alert('Change email', 'This would open the email change flow.')}
        >
          <Text style={AccountSettingsStyle.actionText}>Change email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={AccountSettingsStyle.actionButton}
          onPress={() => Alert.alert('Reset password', 'This would trigger password reset.')}
        >
          <Text style={AccountSettingsStyle.actionText}>Reset password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[AccountSettingsStyle.actionButton, AccountSettingsStyle.rowLast]}
          onPress={() => Alert.alert('Upgrade plan', 'Explore premium tasting events and collections.')}
        >
          <Text style={AccountSettingsStyle.actionText}>Upgrade plan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AccountSettingsScreen;
