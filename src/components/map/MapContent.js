import React from 'react';
import MapView from 'react-native-maps';
import MapMarker from './MapMarker';
import styles from '../../styles/MapScreenStyles';

export default function MapContent({ location, bars, onMarkerPress }) {
  if (!location) return null;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
      showsUserLocation={true}
    >
      {bars.map((bar) => (
        <MapMarker key={bar.id} bar={bar} onPress={onMarkerPress} />
      ))}
    </MapView>
  );
}
