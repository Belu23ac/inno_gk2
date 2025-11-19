import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SelectedBeerScreenStyle as S } from '../../styles/SelectedBeerScreenStyle';
import { Colors } from '../../styles/Colors';

import { useNavigation } from '@react-navigation/native';
import { checkBeerFavoriteStatus, toggleBeerFavoriteStatus } from '../helpers/favoriteHelpers';

export default function BeerActions({ user, beer, onShare }){
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (!user?.uid || !beer?.id) return;
      try {
        const status = await checkBeerFavoriteStatus(user.uid, beer.id);
        setIsFavorite(status);
      } catch (err) {
        console.error('Error checking favorite status:', err);
      }
    };

    check();
  }, [user?.uid, beer?.id]);

  const toggleFavorite = async () => {
    if (!user?.uid || !beer) return;
    setLoading(true);
    try {
      const updated = await toggleBeerFavoriteStatus({ userId: user.uid, beer, isFavorite });
      setIsFavorite(updated);
    } catch (err) {
      console.error('Error toggling favorite:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoritePress = async () => {
    if (!user?.uid) {
      navigation.navigate('Profile', { screen: 'Login' });
      return;
    }

    await toggleFavorite();
  };
  return (
    <View style={S.sectionCard}>
      <Text style={S.cardTitle}>Quick Actions</Text>
      <View style={S.actionsRow}>
        <TouchableOpacity
          style={[S.favoriteButton, !user && S.favoriteButtonGuest, { flex: 1, marginRight: 8 }]}
          onPress={handleFavoritePress}
          disabled={loading}
        >
          <Ionicons
            name={user ? (isFavorite ? 'heart' : 'heart-outline') : 'heart-outline'}
            size={20}
            color={Colors.primary}
          />
          <Text style={S.favoriteButtonText}>
            {user ? (isFavorite ? 'Remove' : 'Favorite') : 'Sign in to favorite'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[S.shareButton, { flex: 1 }]}
          onPress={onShare}
        >
          <Ionicons name="share-outline" size={20} color={Colors.primary} />
          <Text style={S.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
