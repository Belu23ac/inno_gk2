import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from '../styles/MapScreenStyles';
import InfoSheet from '../components/InfoSheet';
import { calculateDistance } from '../utils/distance';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBar, setSelectedBar] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Placering nægtet', 'Appen har brug for adgang til din placering.');
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    if (!location) return;

    const fetchBars = async () => {
      try {
        const query = `
          [out:json];
          node["amenity"~"bar|pub|biergarten"](around:2000,${location.latitude},${location.longitude});
          out;
        `;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();

        // Tilføj afstand til hvert sted
        const barsWithDistance = data.elements.map((bar) => ({
          ...bar,
          distance: calculateDistance(location.latitude, location.longitude, bar.lat, bar.lon),
        }));

        setBars(barsWithDistance);
      } catch (err) {
        console.error(err);
        Alert.alert('Fejl', 'Kunne ikke hente data fra OpenStreetMap.');
      } finally {
        setLoading(false);
      }
    };

    fetchBars();
  }, [location]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
          <Marker
            key={bar.id}
            coordinate={{
              latitude: bar.lat,
              longitude: bar.lon,
            }}
            title={bar.tags.name || 'Ukendt bar'}
            description={bar.tags.amenity}
            onPress={() =>
              setSelectedBar({
                name: bar.tags.name,
                amenity: bar.tags.amenity,
                distance: bar.distance,
              })
            }
          />
        ))}
      </MapView>

      <InfoSheet selectedBar={selectedBar} onClose={() => setSelectedBar(null)} />
    </View>
  );
}
