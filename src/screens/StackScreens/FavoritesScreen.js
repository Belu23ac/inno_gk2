import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { FavoritesScreenStyle } from '../../styles/FavoritesScreenStyle';
import { Colors } from '../../styles/Colors';
import { db } from '../../database/firebase';
import { collection, getDocs } from 'firebase/firestore';

const FavoritesScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchFavorites = async () => {
        setLoading(true);
        try {
          const snapshot = await getDocs(collection(db, "favorites"));
          const favs = snapshot.docs
            .map((doc) => doc.data())
            .filter((fav) => fav.userId === user.uid);
          setFavorites(favs);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        } finally {
          setLoading(false);
        }
      };

      if (user?.uid) {
        fetchFavorites();
      }
    }, [user?.uid])
  );

  if (loading) {
    return (
      <View style={FavoritesScreenStyle.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={FavoritesScreenStyle.loadingText}>Loading your favorites...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={FavoritesScreenStyle.container} contentContainerStyle={FavoritesScreenStyle.listContent}>
      <View style={FavoritesScreenStyle.header}>
        <Text style={FavoritesScreenStyle.title}>My favorites</Text>
        <Text style={FavoritesScreenStyle.subtitle}>Saved beers, breweries, and taprooms you want to revisit or share with friends.</Text>
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
          onPress={() => {
            
            navigation.navigate('SelectedBeer', { beer: favorite });
          }}
        >
          <View style={FavoritesScreenStyle.favoriteIcon}>
            <Ionicons name="sparkles-outline" size={22} color={Colors.black} />
          </View>
          <View style={FavoritesScreenStyle.favoriteMeta}>
            <Text style={FavoritesScreenStyle.favoriteName}>{favorite.name}</Text>
            <Text style={FavoritesScreenStyle.favoriteDetails}>
              {favorite.style || favorite._raw?.sub_category_1 || favorite._raw?.sub_category_2 || "Unknown Style"} - {favorite._raw?.region || "Unknown Region"} - {favorite._raw?.abv || "Unknown"}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FavoritesScreen;
