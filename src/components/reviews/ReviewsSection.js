import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchBeerReviews, submitBeerReview } from './reviewHelpers';
import { SelectedBeerScreenStyle as S } from '../../styles/SelectedBeerScreenStyle';
import { Colors } from '../../styles/Colors';
import { ReviewItem } from '../beer/SelectedBeerParts';
import ReviewForm from './ReviewForm';

export default function ReviewsSection({ beer, user }){
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewStars, setReviewStars] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const fetchedReviews = await fetchBeerReviews(beer.id);
      setReviews(fetchedReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchReviews();
    }, [beer.id])
  );

  const submitReview = async () => {
    const trimmedReviewText = reviewText.trim();
    if (!trimmedReviewText) {
      Alert.alert('Error', 'Review cannot be empty.');
      return;
    }
    if (reviewStars < 1 || reviewStars > 5) {
      Alert.alert('Error', 'Please select a valid star rating.');
      return;
    }

    setLoading(true);
    try {
      const newReview = await submitBeerReview({
        beerId: beer.id,
        userId: user.uid,
        displayName: user.displayName,
        reviewText: trimmedReviewText,
        reviewStars,
        isAnonymous,
      });

      setReviews((prev) => [newReview, ...prev]);
      setReviewText('');
      setReviewStars(0);
      setIsAnonymous(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      Alert.alert('Error', 'Could not submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <View style={S.sectionCard}>
        <Text style={S.cardTitle}>Leave a Review</Text>
        <ReviewForm
        user={user}
        reviewStars={reviewStars}
        setReviewStars={setReviewStars}
        isAnonymous={isAnonymous}
        setIsAnonymous={setIsAnonymous}
        reviewText={reviewText}
        setReviewText={setReviewText}
        loading={loading}
        submitReview={submitReview}
      />
      </View>

      <View style={S.sectionCard}>
        <Text style={S.cardTitle}>Reviews</Text>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : reviews.length === 0 ? (
          <Text>No reviews yet.</Text>
        ) : (
          reviews.map((review) => <ReviewItem review={review} key={review.id} />)
        )}
      </View>
    </View>
  );
}
