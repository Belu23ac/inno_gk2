import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { UserProfileScreenStyle } from '../../styles/UserProfileScreenStyle';

export default function ProfileActionButtons({ onCancel, onSave, loading }){
  return (
    <View style={UserProfileScreenStyle.buttonsRow}>
      <TouchableOpacity
        style={[UserProfileScreenStyle.buttonProfile, UserProfileScreenStyle.secondary]}
        onPress={onCancel}
      >
        <Text style={[UserProfileScreenStyle.buttonText, UserProfileScreenStyle.secondaryText]}>Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[UserProfileScreenStyle.buttonProfile, UserProfileScreenStyle.primary, loading && UserProfileScreenStyle.buttonDisabled]}
        onPress={onSave}
        disabled={loading}
      >
        <Text style={[UserProfileScreenStyle.buttonText, UserProfileScreenStyle.primaryText]}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
