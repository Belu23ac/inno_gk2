import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import MapContent from '../components/map/MapContent';
import styles, { spinnerColor } from '../styles/MapScreenStyles';
import InfoSheet from '../components/ui/InfoSheet';
import useLocation from '../contexts/useLocation';
import useNearbyBars from '../hooks/useNearbyBars';
import { Colors } from '../styles/Colors';

export default function MapScreen() {
  const [selectedBar, setSelectedBar] = React.useState(null);

  const { location, loading: locationLoading } = useLocation();
  const { bars, loading: barsLoading } = useNearbyBars(location);

  // Only block on location loading, not bars loading
  if (locationLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={spinnerColor} />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapContent location={location} bars={bars} onMarkerPress={(b) => setSelectedBar(b)} />
      
      {/* Show loading indicator while bars are loading */}
      {barsLoading && (
        <View style={styles.barsLoadingOverlay}>
          <View style={styles.barsLoadingCard}>
            <ActivityIndicator size="small" color={Colors.primary} />
            <Text style={styles.barsLoadingText}>Finding nearby bars...</Text>
          </View>
        </View>
      )}
      
      {selectedBar && (
        <InfoSheet
          bar={selectedBar}
          onClose={() => setSelectedBar(null)}
        />
      )}
    </View>
  );
}
