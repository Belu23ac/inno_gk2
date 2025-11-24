import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { SelectedBeerScreenStyle as S } from '../../styles/SelectedBeerScreenStyle';
import { StarRating } from './reviewHelpers';
import { GuestLoginView } from '../beer/SelectedBeerParts';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/Colors';

export default function ReviewForm({ user, reviewStars, setReviewStars, reviewText, setReviewText, loading, submitReview }){
  if (!user) {
    return <GuestLoginView />;
  }

  return (
    <View style={S.reviewFormContainer}>
      {/* Rating Section */}
      <View style={S.ratingSection}>
        <View style={S.ratingHeader}>
          <Ionicons name="star" size={20} color={Colors.starYellow} />
          <Text style={S.ratingLabel}>Your Rating</Text>
          {reviewStars > 0 && (
            <Text style={S.ratingValue}>{Math.round(reviewStars)}/5</Text>
          )}
        </View>
        <View style={S.starsContainer}>
          <StarRating rating={reviewStars} onRatingChange={setReviewStars} />
        </View>
      </View>

      {/* Review Text Section */}
      <View style={S.textSection}>
        <View style={S.textHeader}>
          <Ionicons name="create-outline" size={20} color={Colors.primary} />
          <Text style={S.textLabel}>Your Thoughts</Text>
        </View>
        <TextInput
          style={S.reviewInput}
          placeholder="Share your experience with this beer..."
          placeholderTextColor={Colors.subtitle}
          value={reviewText}
          onChangeText={setReviewText}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[S.submitButton, loading && S.submitButtonDisabled]}
        onPress={submitReview}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <View style={S.submitButtonContent}>
            <Ionicons name="hourglass-outline" size={20} color={Colors.buttonText} />
            <Text style={S.submitButtonText}>Submitting...</Text>
          </View>
        ) : (
          <View style={S.submitButtonContent}>
            <Ionicons name="checkmark-circle-outline" size={20} color={Colors.buttonText} />
            <Text style={S.submitButtonText}>Post Review</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
