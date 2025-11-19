import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { SelectedBeerScreenStyle as S } from '../../styles/SelectedBeerScreenStyle';
import { StarRating } from './reviewHelpers';
import { GuestLoginView } from '../beer/SelectedBeerParts';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/Colors';

export default function ReviewForm({ user, reviewStars, setReviewStars, isAnonymous, setIsAnonymous, reviewText, setReviewText, loading, submitReview }){
  if (!user) {
    return <GuestLoginView />;
  }

  return (
    <View>
      <StarRating rating={reviewStars} onRatingChange={setReviewStars} />

      <View style={S.checkboxContainer}>
        <TouchableOpacity
          style={S.checkbox}
          onPress={() => setIsAnonymous((prev) => !prev)}
        >
          <Ionicons
            name={isAnonymous ? "checkbox" : "square-outline"}
            size={20}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <Text style={S.checkboxLabel}>Post as Anonymous</Text>
      </View>

      <TextInput
        style={S.reviewInput}
        placeholder="Write your review here..."
        value={reviewText}
        onChangeText={setReviewText}
      />

      <TouchableOpacity
        style={S.submitButton}
        onPress={submitReview}
        disabled={loading}
      >
        <Text style={S.submitButtonText}>
          {loading ? "Submitting..." : "Submit Review"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
