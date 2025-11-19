import { Pressable, Text, StyleSheet } from 'react-native';
import { GlobalStyle } from '../../styles/GlobalStyle';

export default function ButtonComponent({ title, onPress }){
  return (
    <Pressable style={GlobalStyle.primaryButton} onPress={onPress}>
        <Text style={GlobalStyle.buttonText}>{title}</Text>
    </Pressable>
  );
};