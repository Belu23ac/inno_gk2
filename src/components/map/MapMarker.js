import React from 'react';
import { Marker } from 'react-native-maps';

export default function MapMarker({ bar, onPress }) {
  return (
    <Marker
      key={bar.id}
      coordinate={{ latitude: bar.latitude, longitude: bar.longitude }}
      title={bar.name}
      description={bar.address && bar.openingHours ? `${bar.address}\n${bar.openingHours}` : 'No additional information'}
      onPress={() => onPress(bar)}
    />
  );
}
