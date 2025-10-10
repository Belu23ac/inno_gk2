import React, { useMemo } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { FavoritesScreenStyle } from '../../styles/FavoritesScreenStyle';
import { Colors } from '../../styles/Colors';

const mockFavorites = [
  { id: 'fav-1', name: 'Cervisia IPA', style: 'Hazy IPA', location: 'Oslo, NO', rating: 4.7, badge: 'C' },
  { id: 'fav-2', name: 'Aurora Saison', style: 'Farmhouse Ale', location: 'Bergen, NO', rating: 4.5, badge: 'A' },
  { id: 'fav-3', name: 'Midnight Porter', style: 'Robust Porter', location: 'Trondheim, NO', rating: 4.2, badge: 'M' },
  { id: 'fav-4', name: 'Nordic Pils', style: 'Crisp Pilsner', location: 'Stavanger, NO', rating: 4.4, badge: 'N' },
];

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
