import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { UserProfileScreenStyle } from '../../styles/UserProfileScreenStyle';

export default function ProfileField({ label, value, onChangeText, placeholder, multiline=false, numberOfLines=1, editable=true, secureTextEntry=false, inputStyle }){
  return (
    <View style={UserProfileScreenStyle.inputContainer}>
      <Text style={UserProfileScreenStyle.label}>{label}</Text>
      <TextInput
        style={[UserProfileScreenStyle.input, inputStyle]}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}
