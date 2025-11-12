import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { FavoritesScreenStyle } from '../../styles/FavoritesScreenStyle';
import { Colors } from '../../styles/Colors';
import { db } from '../../database/firebase';
import { doc, onSnapshot, updateDoc, arrayRemove, collection, getDocs } from 'firebase/firestore';
import SAMPLE_BEERS from '../../contexts/MockBeers';

// fallback mock favorites
const dkCities = ['Copenhagen, DK', 'Aarhus, DK', 'Odense, DK', 'Aalborg, DK'];
const mockFavorites = SAMPLE_BEERS.map((b, i) => ({
  id: b.id || `fav-${i}`,
  name: b.name,
  style: b._raw?.style || 'Unknown',
  location: dkCities[i % dkCities.length],
  rating: parseFloat((Math.random() * (4.8 - 4.1) + 4.1).toFixed(1)),
  badge: (b.name && b.name[0]) || 'B',
}));

const FavoritesScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hent brugerens favoritter fra Firestore
  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        // Hent alle favoritter fra "favorites"-kollektionen
        const userFavoritesRef = collection(db, "favorites");
        const querySnapshot = await getDocs(userFavoritesRef);
        const favoritesData = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((favorite) => favorite.userId === user.uid); // Filtrer kun favoritter for den aktuelle bruger
        setFavorites(favoritesData);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchFavorites();
    }
  }, [user?.uid]);

  if (loading) {
    return (
      <View style={FavoritesScreenStyle.loadingContainer}>
        <Text style={FavoritesScreenStyle.loadingText}>Loading your favorites...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={FavoritesScreenStyle.container}
      contentContainerStyle={FavoritesScreenStyle.listContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={FavoritesScreenStyle.header}>
        <Text style={FavoritesScreenStyle.title}>My favorites</Text>
        <Text style={FavoritesScreenStyle.subtitle}>
          Saved beers, breweries, and taprooms you want to revisit or share with friends.
        </Text>
      </View>

      {favorites.length === 0 && (
        <View style={FavoritesScreenStyle.emptyState}>
          <Text style={FavoritesScreenStyle.emptyText}>No favorites yet!</Text>
        </View>
      )}

      {favorites.map((favorite) => (
        <TouchableOpacity
          key={favorite.id}
          style={FavoritesScreenStyle.favoriteItem}
          onPress={() => navigation.navigate("SelectedBeer", { beer: favorite })}
        >
          <View style={FavoritesScreenStyle.favoriteIcon}>
            <Text style={FavoritesScreenStyle.favoriteIconText}>
              {favorite.name[0].toUpperCase()}
            </Text>
          </View>
          <View style={FavoritesScreenStyle.favoriteMeta}>
            <Text style={FavoritesScreenStyle.favoriteName}>{favorite.name}</Text>
            <Text style={FavoritesScreenStyle.favoriteDetails}>
              {favorite.style} - {favorite.location}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FavoritesScreen;
