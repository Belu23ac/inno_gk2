import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScanScreenStyle } from '../../styles/ScanScreenStyle';

export default function ScanCameraButton({ onPress, activeOpacity = 0.8 }){
  return (
    <TouchableOpacity
      style={ScanScreenStyle.cameraButton}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <View style={ScanScreenStyle.cameraRing}>
        <View style={ScanScreenStyle.cameraCore} />
      </View>
    </TouchableOpacity>
  );
}
