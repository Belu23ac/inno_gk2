import React, { useState } from 'react';
import { Text, View, ScrollView, Alert, Share } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { SelectedBeerScreenStyle as S } from '../../styles/SelectedBeerScreenStyle';
import BeerHeader from '../../components/beer/BeerHeader';
import BeerActions from '../../components/beer/BeerActions';
import { shareBeer as partsShareBeer } from '../../components/beer/SelectedBeerParts';
import ReviewsSection from '../../components/reviews/ReviewsSection';
import { fetchBeerReviews, calculateAverageRating, generateBeerPrice } from '../../components/reviews/reviewHelpers';
 

function SelectedBeerScreen({ route }) {
  const { user } = useAuth();
  const { beer } = route.params;
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const price = generateBeerPrice(beer?.id || 'default');

  // Fetch reviews and calculate average rating
  const loadReviews = async () => {
    if (beer?.id) {
      try {
        const fetchedReviews = await fetchBeerReviews(beer.id);
        setReviews(fetchedReviews);
        const avgRating = calculateAverageRating(fetchedReviews);
        setAverageRating(avgRating);
      } catch (error) {
        console.error('Error loading reviews:', error);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadReviews();
    }, [beer?.id])
  );

  if (!beer) {
    return (
      <View style={S.container}>
        <Text>No beer selected</Text>
      </View>
    );
  }

  const onShare = () => partsShareBeer(beer);

  return (
    <ScrollView style={S.screen}>
      <View style={S.screenContent}>
            <BeerHeader 
              beer={beer} 
              averageRating={averageRating}
              price={price}
              reviewCount={reviews.length}
            />

        <BeerActions
          user={user}
          beer={beer}
          onShare={onShare}
        />

        <ReviewsSection beer={beer} user={user} />
      </View>
    </ScrollView>
  );
}

export default SelectedBeerScreen;
