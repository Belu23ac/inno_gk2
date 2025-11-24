import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { FavoritesScreenStyle } from '../../styles/FavoritesScreenStyle';
import { Colors } from '../../styles/Colors';
import { db } from '../../database/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { formatDate } from '../../utils/date';
import SAMPLE_BEERS from '../../hooks/MockBeers';

const ReviewsScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchReviews = async () => {
        setLoading(true);
        try {
          const reviewsRef = collection(db, "reviews");
          const reviewsQuery = query(reviewsRef, where("userId", "==", user.uid));
          const snapshot = await getDocs(reviewsQuery);
          
          const userReviews = snapshot.docs.map((doc) => {
            const data = doc.data();
            
            return {
              id: doc.id,
              ...data,
              beerName: data.name || 'Unknown Beer',
              createdAt: data.createdAt?.toDate() || new Date(),
              beer: data.beer || null,
            };
          });
          
          // Sort by most recent
          userReviews.sort((a, b) => b.createdAt - a.createdAt);
          setReviews(userReviews);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        } finally {
          setLoading(false);
        }
      };

      if (user?.uid) {
        fetchReviews();
      }
    }, [user?.uid])
  );

  if (loading) {
    return (
      <View style={FavoritesScreenStyle.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={FavoritesScreenStyle.loadingText}>Loading your reviews...</Text>
      </View>
    );
  }

  const renderStars = (stars) => {
    return (
      <View style={{ flexDirection: 'row', marginTop: 4 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={stars >= star ? 'star' : 'star-outline'}
            size={16}
            color={Colors.starYellow}
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={FavoritesScreenStyle.container} contentContainerStyle={FavoritesScreenStyle.listContent}>
      <View style={FavoritesScreenStyle.header}>
        <Text style={FavoritesScreenStyle.title}>Your Reviews</Text>
        <Text style={FavoritesScreenStyle.subtitle}>
          All the beers you've rated and reviewed.
        </Text>
      </View>

      {reviews.length === 0 && (
        <View style={FavoritesScreenStyle.emptyState}>
          <Ionicons name="chatbubbles-outline" size={48} color={Colors.subtitle} />
          <Text style={FavoritesScreenStyle.emptyText}>No reviews yet!</Text>
          <Text style={FavoritesScreenStyle.subtitle}>
            Start rating beers to see your reviews here.
          </Text>
        </View>
      )}

      {reviews.map((review) => (
        <TouchableOpacity
          key={review.id}
          style={FavoritesScreenStyle.favoriteItem}
          onPress={() => {
            if (review.beer) {
              navigation.navigate('SelectedBeer', { beer: review.beer });
            }
          }}
          disabled={!review.beer}
        >
          <View style={FavoritesScreenStyle.favoriteIcon}>
            <Ionicons name="chatbubble-outline" size={22} color={Colors.primary} />
          </View>
          <View style={FavoritesScreenStyle.favoriteMeta}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <Text style={[FavoritesScreenStyle.favoriteName, { flex: 1 }]} numberOfLines={1} ellipsizeMode="tail">
                {review.beerName}
              </Text>
              {renderStars(review.stars)}
            </View>
            <Text style={FavoritesScreenStyle.favoriteDetails}>
              {review.text}
            </Text>
            <Text style={{ fontSize: 12, color: Colors.subtitle, marginTop: 4 }}>
              {formatDate(review.createdAt)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ReviewsScreen;
