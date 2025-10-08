import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { GlobalStyle } from '../../styles/GlobalStyle';
import { UserProfileScreenStyle } from '../../styles/UserProfileScreenStyle';

export default function UserProfileScreen({ navigation }) {
  const user = {
    name: 'Jane Voe',
    email: 'jane.voe@example.com',
    bio: 'Front-end developer. Loves coffee, cats, and clean UI.',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Voe',
  };

  const onEdit = () => Alert.alert('Edit Profile', 'This would open the edit screen.');
  const onLogout = () => Alert.alert('Logout', 'This would log the user out.');

  return (
    <ScrollView contentContainerStyle={[GlobalStyle.container]}>
      <View style={UserProfileScreenStyle.profileCard}>
        <Image source={{ uri: user.avatar }} style={UserProfileScreenStyle.avatarProfile} />
        <Text style={UserProfileScreenStyle.name}>{user.name}</Text>
        <Text style={UserProfileScreenStyle.email}>{user.email}</Text>
        <Text style={UserProfileScreenStyle.bio}>{user.bio}</Text>

        <View style={UserProfileScreenStyle.buttonsRow}>
          <TouchableOpacity style={[UserProfileScreenStyle.buttonProfile, UserProfileScreenStyle.primary]} onPress={onEdit}>
            <Text style={[UserProfileScreenStyle.buttonText, UserProfileScreenStyle.primaryText]}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[UserProfileScreenStyle.buttonProfile, UserProfileScreenStyle.secondary]} onPress={onLogout}>
            <Text style={[UserProfileScreenStyle.buttonText, UserProfileScreenStyle.secondaryText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}