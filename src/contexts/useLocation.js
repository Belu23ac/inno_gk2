import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export default function useLocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (mounted) {
            Alert.alert('Location denied', 'The app needs access to your location.');
            setLoading(false);
          }
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        if (mounted) setLocation(loc.coords);
      } catch (error) {
        console.error('Error fetching location:', error);
        Alert.alert('Error', 'Could not fetch location.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => (mounted = false);
  }, []);

  return { location, loading };
}
