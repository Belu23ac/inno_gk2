import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { calculateDistance } from '../utils/distance';

export default function useNearbyBars(location, radius = 2000) {
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location) return;

    let mounted = true;

    const fetchBars = async () => {
      setLoading(true);
      try {
        const query = `\n          [out:json];\n          node[\"amenity\"~\"bar|pub|biergarten|restaurant\"](around:${radius},${location.latitude},${location.longitude});\n          out;\n        `;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        const data = await res.json();

        const barsWithDistance = data.elements.map((bar) => ({
          id: bar.id,
          name: bar.tags?.name || 'Unknown place',
          amenity: bar.tags?.amenity,
          address: bar.tags?.['addr:street'] || 'No address',
          openingHours: bar.tags?.opening_hours || 'No opening hours',
          latitude: bar.lat,
          longitude: bar.lon,
          distance: calculateDistance(location.latitude, location.longitude, bar.lat, bar.lon),
        }));

        if (mounted) setBars(barsWithDistance);
      } catch (error) {
        console.error('Error fetching places:', error);
        Alert.alert('Error', 'Could not fetch places.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBars();

    return () => (mounted = false);
  }, [location?.latitude, location?.longitude, radius]);

  return { bars, loading };
}
