import axios from "axios";
import * as Location from "expo-location";
import { useState, useCallback } from "react";
import { ActivityIndicator, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useFocusEffect } from "@react-navigation/native";
import MapScreenStyles from "../styles/MapScreenStyles";

const GOOGLE_PLACES_API_KEY = "DIN_GYLDIGE_API_NØGLE"; // Indsæt din API-nøgle her

export default function MapScreen() {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 55.6761, // København som standard
    longitude: 12.5683,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Hent steder fra Google Places API
  const fetchPlaces = async () => {
    try {
      const { latitude, longitude } = region;

      // Lav en forespørgsel til Google Places API
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=bar&keyword=brewery&key=${GOOGLE_PLACES_API_KEY}`
      );

      // Map resultaterne til markører
      const places = response.data.results.map((place) => ({
        id: place.place_id,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        title: place.name,
      }));

      setMarkers(places);
    } catch (error) {
      console.error("Fejl ved hentning af steder:", error);
    }
  };

  // Hent brugerens lokation
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Placeringstilladelse ikke givet");
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      setRegion((r) => ({
        ...r,
        latitude: coords.latitude,
        longitude: coords.longitude,
      }));
    } catch (error) {
      console.error("Fejl ved hentning af placering:", error);
    }
  };

  // Hent data, når skærmen vises
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      Promise.all([getLocation(), fetchPlaces()]).finally(() =>
        setLoading(false)
      );
    }, [region])
  );

  // Vis loader, hvis data indlæses
  if (loading) {
    return (
      <View style={MapScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Returnér kortet med markører
  return (
    <View style={MapScreenStyles.container}>
      <MapView
        style={MapScreenStyles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation
      >
        {markers.map((m) => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.latitude, longitude: m.longitude }}
            title={m.title}
            pinColor="#FF0000" // Rød farve til markøren
          />
        ))}
      </MapView>
    </View>
  );
}
