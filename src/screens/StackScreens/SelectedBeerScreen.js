import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { SelectedBeerScreenStyle as S } from '../../styles/SelectedBeerScreenStyle';
import { useFocusEffect } from "@react-navigation/native";
import { Colors } from "../../styles/Colors";
import {
  checkBeerFavoriteStatus,
  toggleBeerFavoriteStatus,
} from '../../components/favoriteHelpers';
import {
  fetchBeerReviews,
  submitBeerReview,
  StarRating,
} from '../../components/reviewHelpers';

function SelectedBeerScreen({ route }) {
  const { user } = useAuth();
  const { beer } = route.params;

  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewStars, setReviewStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  if (!beer) {
    return (
      <View style={S.container}>
        <Text>No beer selected</Text>
      </View>
    );
  }

  const displayStyle =
    beer.sub_category_1 ||
    beer.style ||
    beer._raw?.style ||
    beer._raw?.category ||
    "Unknown Style";
  const displayRegion =
    beer.region ||
    beer._raw?.region ||
    beer._raw?.country ||
    "Unknown Region";
  const displayAbv =
    beer.abv ||
    beer._raw?.abv ||
    beer._raw?.abv_percent ||
    "Unknown ABV";
  const displayCountry =
    beer.country || beer._raw?.country || "Unknown Country";

  // Check if beer is in favorites
  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!user?.uid || !beer?.id) return;
      try {
        const favoriteStatus = await checkBeerFavoriteStatus(user.uid, beer.id);
        setIsFavorite(favoriteStatus);
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
      const updatedStatus = await toggleBeerFavoriteStatus({
        userId: user.uid,
        beer,
        isFavorite,
      });
      setIsFavorite(updatedStatus);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const fetchedReviews = await fetchBeerReviews(beer.id);
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
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
      Alert.alert("Error", "Review cannot be empty.");
      return;
    }
    if (reviewStars < 1 || reviewStars > 5) {
      Alert.alert("Error", "Please select a valid star rating.");
      return;
    }

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

      setReviewText("");
      setReviewStars(0);
      setIsAnonymous(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      Alert.alert("Error", "Could not submit review.");
    }
  };

  const shareBeer = async () => {
    try {
      const message = `Check out this beer: ${beer.name}\n\nStyle: ${beer.style || "Unknown Style"}\nABV: ${beer.abv || "Unknown ABV"}\n\nDescription: ${beer._raw?.description || "No description available"}\n\nLink: https://yourapp.com/beers/${beer.id}`;
      await Share.share({ message });
    } catch (error) {
      console.error("Error sharing beer:", error);
      Alert.alert("Error", "Could not share the beer.");
    }
  };

  const formatDate = (value) => {
    if (!value) return "Unknown Date";
    try {
      const date = value?.toDate ? value.toDate() : (value instanceof Date ? value : new Date(value));
      return isNaN(date.getTime()) ? "Unknown Date" : date.toLocaleDateString();
    } catch (e) {
      return "Unknown Date";
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{beer.name}</Text>
        <Text style={{ fontSize: 16, color: "gray", marginTop: 8 }}>
          Style: {displayStyle}
        </Text>
        <Text style={{ fontSize: 14, color: "gray", marginTop: 4 }}>
          Region: {displayRegion}{displayCountry ? `, ${displayCountry}` : ""}
        </Text>
        <Text style={{ fontSize: 14, marginTop: 16 }}>
          ABV: {displayAbv}
        </Text>
        <Text style={{ fontSize: 14, marginTop: 16 }}>
          Description: {beer._raw?.description || "No description available"}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
          <TouchableOpacity
            style={[S.shareButton, { flex: 1, marginRight: 8 }]}
            onPress={toggleFavorite}
            disabled={loading}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={Colors.primary}
            />
            <Text style={S.shareButtonText}>
              {isFavorite ? "Remove" : "Favorite"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[S.shareButton, { flex: 1 }]}
            onPress={shareBeer}
          >
            <Ionicons name="share-outline" size={20} color={Colors.primary} />
            <Text style={S.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={S.reviewContainer}>
        <Text style={S.sectionTitle}>Leave a Review</Text>

        <StarRating rating={reviewStars} onRatingChange={setReviewStars} />

        <View style={S.checkboxContainer}>
          <TouchableOpacity
            style={S.checkbox}
            onPress={() => setIsAnonymous((prev) => !prev)} // Skift mellem true og false
          >
            <Ionicons
              name={isAnonymous ? "checkbox" : "square-outline"} // Skift ikon baseret på state
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

      <View style={S.reviewsContainer}>
        <Text style={S.sectionTitle}>Reviews</Text>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : reviews.length === 0 ? (
          <Text>No reviews yet.</Text>
        ) : (
          reviews.map((review) => (
            <View key={review.id} style={S.reviewItem}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={`star-${review.id}-${star}`}
                    name={
                      review.stars >= star
                        ? "star"
                        : review.stars >= star - 0.5
                        ? "star-half"
                        : "star-outline"
                    }
                    size={20}
                    color="gold"
                  />
                ))}
              </View>

              <Text style={S.reviewAuthor}>{review.displayName || "Anonymous"}</Text>
              <Text style={S.reviewText}>{review.text}</Text>
              <Text style={S.reviewDate}>{formatDate(review.createdAt)}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

export default SelectedBeerScreen;
