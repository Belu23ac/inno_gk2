import React, { useMemo } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { FavoritesScreenStyle } from '../../styles/FavoritesScreenStyle';
import { Colors } from '../../styles/Colors';
import SAMPLE_BEERS from '../../contexts/MockBeers';

// Map the existing mock beers into a favorites format (use some DK sample locations)
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
  const favorites = useMemo(() => mockFavorites, []);

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
          <View style={FavoritesScreenStyle.emptyIcon}>
            <Ionicons name="heart-outline" size={30} color={Colors.subtitle} />
          </View>
          <Text style={FavoritesScreenStyle.emptyTitle}>No favorites yet</Text>
          <Text style={FavoritesScreenStyle.emptyDescription}>
            Start exploring beers nearby and long-press a card to add it to your favorites.
          </Text>
        </View>
      )}

      {favorites.map((item) => (
        <View key={item.id} style={FavoritesScreenStyle.card}>
          <View
            style={[
              FavoritesScreenStyle.badge,
              { backgroundColor: Colors.favorite },
            ]}
          >
            <Text style={FavoritesScreenStyle.badgeText}>{item.badge}</Text>
          </View>
          <View style={FavoritesScreenStyle.info}>
            <Text style={FavoritesScreenStyle.name}>{item.name}</Text>
            <Text style={FavoritesScreenStyle.meta}>
              {item.style} • {item.location}
            </Text>
            <View style={FavoritesScreenStyle.ratingRow}>
              <Ionicons name="star" size={16} color={Colors.starYellow} />
              <Text style={FavoritesScreenStyle.ratingText}>{item.rating.toFixed(1)} rating</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default FavoritesScreen;
