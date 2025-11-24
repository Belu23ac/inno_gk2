import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { calculateDistance } from '../utils/distance';

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

export default function useNearbyBars(location, radius = 1500) {
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location) return;

    let mounted = true;

    const fetchBars = async () => {
      setLoading(true);
      let lastError;
      
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
          const query = `\n          [out:json][timeout:25];\n          node[\"amenity\"~\"bar|pub|biergarten\"](around:${radius},${location.latitude},${location.longitude});\n          out;\n        `;
          const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
          const res = await fetch(url, {
            timeout: 30000, // 30 second timeout
          });
          
          if (!res.ok) {
            if (res.status === 504 && attempt < MAX_RETRIES) {
              console.log(`Retry attempt ${attempt + 1} after 504 error...`);
              await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
              continue;
            }
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            const text = await res.text();
            console.error('Non-JSON response received:', text.substring(0, 200));
            throw new Error('Invalid response from server');
          }
          
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

          if (mounted) {
            setBars(barsWithDistance);
            setLoading(false);
          }
          return; // Success, exit the retry loop
        } catch (error) {
          lastError = error;
          if (attempt < MAX_RETRIES && error.message.includes('504')) {
            console.log(`Retry attempt ${attempt + 1} after error...`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          }
        }
      }
      
      // If we get here, all retries failed
      console.error('Error fetching places:', lastError);
      Alert.alert('Error', 'Could not fetch nearby bars. The server might be busy. Please try again later.');
      if (mounted) setLoading(false);
    };

    fetchBars();

    return () => (mounted = false);
  }, [location?.latitude, location?.longitude, radius]);

  return { bars, loading };
}
