import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../database/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export const FETCH_REVIEWS_COLLECTION = 'reviews';

export const fetchBeerReviews = async (beerId) => {
  if (!beerId) return [];

  const reviewsRef = collection(db, FETCH_REVIEWS_COLLECTION);
  const reviewsQuery = query(reviewsRef, where('beerId', '==', beerId));
  const snapshot = await getDocs(reviewsQuery);

  const fetchedReviews = snapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data();
    return {
      id: docSnapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate() ?? new Date(0),
    };
  });

  fetchedReviews.sort((a, b) => b.createdAt - a.createdAt);

  return fetchedReviews;
};

export const submitBeerReview = async ({
  beerId,
  userId,
  displayName,
  reviewText,
  reviewStars,
  isAnonymous,
}) => {
  if (!beerId || !userId || !reviewText || !reviewStars) {
    throw new Error('Missing required review information');
  }

  const reviewsRef = collection(db, FETCH_REVIEWS_COLLECTION);
  const docRef = await addDoc(reviewsRef, {
    beerId,
    userId,
    displayName: isAnonymous ? 'Anonymous' : displayName || 'Anonymous',
    text: reviewText,
    stars: reviewStars,
    createdAt: new Date(),
  });

  return {
    id: docRef.id,
    beerId,
    userId,
    displayName: isAnonymous ? 'Anonymous' : displayName || 'Anonymous',
    text: reviewText,
    stars: reviewStars,
    createdAt: new Date(),
  };
};

export const StarRating = ({ rating, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={{ flexDirection: 'row' }}>
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onRatingChange(star)}
          onLongPress={() => onRatingChange(star - 0.5)}
        >
          <Ionicons
            name={
              rating >= star
                ? 'star'
                : rating >= star - 0.5
                ? 'star-half'
                : 'star-outline'
            }
            size={24}
            color="gold"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
