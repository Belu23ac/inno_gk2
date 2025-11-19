import React from 'react';
import { View, Text } from 'react-native';
import { ScanScreenStyle } from '../../styles/ScanScreenStyle';

export default function ScanInstructionCard(){
  return (
    <View style={ScanScreenStyle.instructionCard}>
      <Text style={ScanScreenStyle.instructionTitle}>Keep it steady</Text>
      <Text style={ScanScreenStyle.instructionCopy}>
        Align the label inside the frame before you start scanning.
      </Text>
    </View>
  );
}
