import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Placering nægtet', 'Appen har brug for adgang til din placering.');
          setLoading(false);
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      } catch (error) {
        console.error("Fejl ved hentning af placering:", error);
        Alert.alert('Fejl', 'Kunne ikke hente placering.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!location) return;

    const fetchBars = async () => {
      try {
        const query = `
          [out:json];
          node["amenity"~"bar|pub|biergarten|restaurant"](around:2000,${location.latitude},${location.longitude});
          out;
        `;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();

        const barsWithDistance = data.elements.map((bar) => ({
          id: bar.id,
          name: bar.tags.name || "Ukendt sted",
          amenity: bar.tags.amenity,
          address: bar.tags["addr:street"] || "Ingen adresse",
          openingHours: bar.tags.opening_hours || "Ingen åbningstider",
          latitude: bar.lat,
          longitude: bar.lon,
          distance: calculateDistance(location.latitude, location.longitude, bar.lat, bar.lon),
        }));

        setBars(barsWithDistance);
      } catch (error) {
        console.error("Fejl ved hentning af steder:", error);
        Alert.alert('Fejl', 'Kunne ikke hente steder.');
      }
    };

    fetchBars();
  }, [location]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
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
              latitude: bar.latitude,
              longitude: bar.longitude,
            }}
            title={bar.name}
            description={
              bar.address && bar.openingHours
                ? `${bar.address}\n${bar.openingHours}`
                : "Ingen yderligere oplysninger"
            }
            onPress={() => setSelectedBar(bar)}
          />
        ))}
      </MapView>
      {selectedBar && (
        <InfoSheet
          bar={selectedBar}
          onClose={() => setSelectedBar(null)}
        />
      )}
    </View>
  );
}
