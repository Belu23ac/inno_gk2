import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapContent from '../components/map/MapContent';
import styles, { spinnerColor } from '../styles/MapScreenStyles';
import InfoSheet from '../components/ui/InfoSheet';
import MapMarker from '../components/map/MapMarker';
import useLocation from '../contexts/useLocation';
import useNearbyBars from '../hooks/useNearbyBars';

export default function MapScreen() {
  const [selectedBar, setSelectedBar] = React.useState(null);

  const { location, loading: locationLoading } = useLocation();
  const { bars, loading: barsLoading } = useNearbyBars(location);
  const loading = locationLoading || barsLoading;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={spinnerColor} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapContent location={location} bars={bars} onMarkerPress={(b) => setSelectedBar(b)} />
      {selectedBar && (
        <InfoSheet
          bar={selectedBar}
          onClose={() => setSelectedBar(null)}
        />
      )}
    </View>
  );
}
