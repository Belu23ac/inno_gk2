import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import { GlobalStyle } from '../styles/GlobalStyle';

const DUMMY_FAVORITES = [
  { id: '1', name: 'Pale Ale', rating: 3 },
  { id: '2', name: 'Stout', rating: 4 },
  { id: '3', name: 'IPA', rating: 2 },
];

export default function DetailsScreen() {
  const [favorites, setFavorites] = useState(DUMMY_FAVORITES);

  const clearFavorites = () => {
    setFavorites([]);
  };

  const refreshFavorites = () => {
    setFavorites(DUMMY_FAVORITES);
  };

  const setRating = (id, rating) => {
    setFavorites(prev =>
      prev.map(item => (item.id === id ? { ...item, rating } : item))
    );
  };

  const renderStars = (item) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const filled = i <= (item.rating || 0);
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(item.id, i)}
          activeOpacity={0.7}
          style={GlobalStyle.starButton}
        >
          <Text style={[GlobalStyle.star, filled ? GlobalStyle.starFilled : GlobalStyle.starEmpty]}>
            {filled ? '\u2605' : '\u2606'}
          </Text>
        </TouchableOpacity>
      );
    }
    return <View style={GlobalStyle.starsRow}>{stars}</View>;
  };

  const renderItem = ({ item }) => {
    const title =
      (item && (item.name || item.title || item.label)) || JSON.stringify(item);

    return (
      <View style={GlobalStyle.item}>
        <View style={GlobalStyle.itemHeader}>
          <Text style={GlobalStyle.itemText}>{title}</Text>
          <Text style={GlobalStyle.ratingNumber}>{item.rating || 0}/5</Text>
        </View>
        {renderStars(item)}
      </View>
    );
  };

  return (
    <View style={GlobalStyle.container}>
      <Text style={GlobalStyle.header}>Favorite Beers</Text>

      {favorites.length === 0 ? (
        <Text style={GlobalStyle.empty}>You haven't favorited any beers yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
        />
      )}

      <View style={GlobalStyle.buttonsRow}>
        <Button title="Refresh" onPress={refreshFavorites} />
        <View style={{ width: 12 }} />
        <Button title="Clear favorites" onPress={clearFavorites} color="red" />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}