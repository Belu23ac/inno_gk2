import React from 'react';
import { View, Image } from 'react-native';
import { GlobalStyle } from '../../styles/GlobalStyle';

export default function AppBackground({ children }) {
  return (
    <View style={GlobalStyle.appBackgroundRoot}>
      <View style={GlobalStyle.appBackgroundWrap} pointerEvents="none">
        <Image
          source={require('../../assets/hops-on-stick.avif')}
          style={GlobalStyle.appBackgroundCentered}
        />
      </View>
      <View style={GlobalStyle.appBackgroundContent}>{children}</View>
    </View>
  );
}