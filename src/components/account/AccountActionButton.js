import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { AccountSettingsStyle } from '../../styles/AccountSettingsStyle';

export default function AccountActionButton({ title, onPress, style }){
  return (
    <TouchableOpacity style={[AccountSettingsStyle.actionButton, style]} onPress={onPress}>
      <Text style={AccountSettingsStyle.actionText}>{title}</Text>
    </TouchableOpacity>
  );
}
