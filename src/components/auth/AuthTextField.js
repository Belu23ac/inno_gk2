import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { RegisterScreenStyle } from '../../styles/RegisterScreenStyle';

export default function AuthTextField({ label, value, onChangeText, placeholder, secureTextEntry=false, keyboardType='default', autoCapitalize='none', autoCorrect=false }){
  return (
    <View style={RegisterScreenStyle.inputContainer}>
      <Text style={RegisterScreenStyle.label}>{label}</Text>
      <TextInput
        style={RegisterScreenStyle.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
      />
    </View>
  );
}
