import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../database/firebase';
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

export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  
  const sum = reviews.reduce((acc, review) => acc + (review.stars || 0), 0);
  return sum / reviews.length;
};

export const generateBeerPrice = (beerId) => {
  // Use beerId as seed for consistent price per beer
  const hash = beerId.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  // Generate price between 25 and 75 DKK
  const price = 25 + (hash % 51);
  return price;
};

export const submitBeerReview = async ({
  beerId,
  beerName,
  beer,
  userId,
  displayName,
  reviewText,
  reviewStars,
}) => {
  if (!beerId || !userId || !reviewText || !reviewStars) {
    throw new Error('Missing required review information');
  }

  const reviewsRef = collection(db, FETCH_REVIEWS_COLLECTION);
  const docRef = await addDoc(reviewsRef, {
    beerId,
    name: beerName || 'Unknown Beer',
    beer: beer || null,
    userId,
    displayName: displayName || 'Anonymous',
    text: reviewText,
    stars: reviewStars,
    createdAt: new Date(),
  });

  return {
    id: docRef.id,
    beerId,
    name: beerName || 'Unknown Beer',
    beer: beer || null,
    userId,
    displayName: displayName || 'Anonymous',
    text: reviewText,
    stars: reviewStars,
    createdAt: new Date(),
  };
};

export const StarRating = ({ rating, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onRatingChange(star)}
          style={{
            padding: 4,
            backgroundColor: rating >= star ? 'rgba(245, 179, 1, 0.1)' : 'transparent',
            borderRadius: 8,
          }}
          activeOpacity={0.7}
        >
          <Ionicons
            name={
              rating >= star
                ? 'star'
                : rating >= star - 0.5
                ? 'star-half'
                : 'star-outline'
            }
            size={32}
            color={rating >= star - 0.5 ? '#f5b301' : '#ccc'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
