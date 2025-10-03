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
      <View style={GlobalStyle.profileCard}>
        <Image source={{ uri: user.avatar }} style={GlobalStyle.avatarProfile} />
        <Text style={GlobalStyle.name}>{user.name}</Text>
        <Text style={GlobalStyle.email}>{user.email}</Text>
        <Text style={GlobalStyle.bio}>{user.bio}</Text>

        <View style={GlobalStyle.buttonsRow}>
          <TouchableOpacity style={[GlobalStyle.buttonProfile, GlobalStyle.primary]} onPress={onEdit}>
            <Text style={[GlobalStyle.buttonText, GlobalStyle.primaryText]}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[GlobalStyle.buttonProfile, GlobalStyle.secondary]} onPress={onLogout}>
            <Text style={[GlobalStyle.buttonText, GlobalStyle.secondaryText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}