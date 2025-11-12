import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../database/firebase';
import {
  doc,
  getDoc,
  collection,
  addDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { SelectedBeerScreenStyle as S } from '../../styles/SelectedBeerScreenStyle';

function SelectedBeerScreen({ route }) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewStars, setReviewStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [submittingReview, setSubmittingReview] = useState(false);

  const beer = route?.params?.beer;

  if (!beer) {
    return (
      <View style={S.container}>
        <Text>No beer selected</Text>
      </View>
    );
  }

  const style =
    beer._raw?.sub_category_1 ||
    beer._raw?.sub_category_2 ||
    beer._raw?.sub_category_3 ||
    'Unknown Style';

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!user?.uid || !beer?.id) return;
      try {
        const userFavoritesRef = doc(db, 'favorites', `${user.uid}_${beer.id}`);
        const docSnap = await getDoc(userFavoritesRef);
        setIsFavorite(docSnap.exists());
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkIfFavorite();
  }, [user?.uid, beer?.id]);

  const toggleFavorite = async () => {
    if (!user?.uid || !beer) return;
    setLoading(true);
    try {
      const userFavoritesRef = doc(db, 'favorites', `${user.uid}_${beer.id}`);
      console.log("Firestore reference:", userFavoritesRef.path); // Log reference

      if (isFavorite) {
        await deleteDoc(userFavoritesRef);
        console.log("Favorite removed from Firestore");
        setIsFavorite(false);
      } else {
        await setDoc(userFavoritesRef, {
          ...beer,
          userId: user.uid,
          addedAt: new Date(),
        });
        console.log("Favorite added to Firestore");
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async () => {
    if (!reviewText.trim()) {
      Alert.alert('Error', 'Review cannot be empty.');
      return;
    }
    if (reviewStars < 1 || reviewStars > 5) {
      Alert.alert('Error', 'Please select a star rating between 1 and 5.');
      return;
    }

    setSubmittingReview(true);
    try {
      const reviewsRef = collection(db, 'reviews');
      await addDoc(reviewsRef, {
        beerId: beer.id,
        userId: user.uid,
        text: reviewText.trim(),
        stars: reviewStars,
        createdAt: new Date(),
      });
      setReviews((prev) => [
        ...prev,
        { text: reviewText.trim(), stars: reviewStars },
      ]);
      setReviewText('');
      setReviewStars(0);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmittingReview(false);
    }
  };

  const selectStars = (stars) => setReviewStars(stars);

  return (
    <ScrollView style={S.container}>
      <StatusBar style="auto" />
      <View style={S.detailsContainer}>
        <Text style={S.beerName}>{beer.name || 'Unknown Beer'}</Text>
        <Text style={S.beerDetails}>Style: {style}</Text>
        <Text style={S.beerDetails}>Brewery: {beer.brewery || 'Unknown Brewery'}</Text>
        <Text style={S.beerDetails}>Region: {beer._raw?.region || 'Unknown Region'}</Text>
        <Text style={S.beerDetails}>ABV: {beer.abv || 'Unknown ABV'}</Text>
        <Text style={S.beerDetails}>IBU: {beer._raw?.ibu || 'Unknown IBU'}</Text>
        <Text style={S.beerDetails}>
          Food Pairing: {beer._raw?.food_pairing || 'No suggestions'}
        </Text>
        <Text style={S.beerDetails}>
          Description: {beer._raw?.description || 'No description available'}
        </Text>
      </View>

      <TouchableOpacity style={S.favoriteButton} onPress={toggleFavorite} disabled={loading}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={32}
          color={isFavorite ? 'red' : 'gray'}
        />
        <Text style={S.favoriteButtonText}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </TouchableOpacity>

      <View style={S.reviewsContainer}>
        <Text style={S.sectionTitle}>Reviews</Text>
        {reviews.map((review, index) => (
          <View key={index} style={S.reviewItem}>
            <Text style={S.reviewText}>{review.text}</Text>
            <Text style={S.reviewStars}>Rating: {review.stars}</Text>
          </View>
        ))}

        <View style={S.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => selectStars(star)}>
              <Ionicons
                name={reviewStars >= star ? 'star' : 'star-outline'}
                size={32}
                color={reviewStars >= star ? 'gold' : 'gray'}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={S.reviewInput}
          value={reviewText}
          onChangeText={setReviewText}
          placeholder="Write your review here..."
          multiline
        />
        <TouchableOpacity
          style={S.submitButton}
          onPress={submitReview}
          disabled={submittingReview}
        >
          <Text style={S.submitButtonText}>
            {submittingReview ? 'Submitting...' : 'Submit Review'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default SelectedBeerScreen;
