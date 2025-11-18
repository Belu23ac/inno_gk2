import React, { useState, useEffect, useMemo } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Share,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { SelectedBeerScreenStyle as S } from '../../styles/SelectedBeerScreenStyle';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation();
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

  const imageSource = useMemo(() => {
    const rawImage = beer.image || beer._raw?.image;
    if (!rawImage) return null;
    if (typeof rawImage === "string") {
      return { uri: rawImage };
    }
    return rawImage;
  }, [beer]);

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
    if (!user?.uid || !beer) {
      // Do nothing; the CTA is handled in the button press (navigation to Login)
      return;
    }
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

  // Press handler for favorite button — if not logged in navigate to Login
  const handleFavoritePress = async () => {
    if (!user?.uid) {
      navigation.navigate('Profile', { screen: 'Login' });
      return;
    }

    await toggleFavorite();
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
    <ScrollView style={S.screen}>
      <View style={S.screenContent}>
        <View style={S.detailsCard}>
          <View style={S.imageWrapper}>
            {imageSource ? (
              <Image source={imageSource} style={S.beerImage} />
            ) : (
              <View style={S.imagePlaceholderFrame}>
                <Text style={S.imagePlaceholderText}>Image unavailable</Text>
              </View>
            )}
          </View>
          <Text style={S.beerName}>{beer.name}</Text>
          <View style={S.metaBox}>
            <View style={S.metaLeft}>
              <Text style={S.metaText}>Style: <Text style={S.metaSubText}>{displayStyle}</Text></Text>
              <Text style={S.metaText}>Region: <Text style={S.metaSubText}>{displayRegion}{displayCountry ? `, ${displayCountry}` : ""}</Text></Text>
            </View>
            <View style={S.metaRight}>
              <Text style={S.abvLabel}>ABV</Text>
              <Text style={S.abvValue}>{displayAbv}</Text>
            </View>
          </View>
          <Text style={S.descriptionText}>Description: {beer._raw?.description || "No description available"}</Text>
        </View>

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
              onPress={shareBeer}
            >
              <Ionicons name="share-outline" size={20} color={Colors.primary} />
              <Text style={S.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={S.sectionCard}>
          <Text style={S.cardTitle}>Leave a Review</Text>
          {!user ? (
            <View style={S.reviewGuestContainer}>
              <Ionicons name="person-circle" size={48} color={Colors.subtitle} />
              <Text style={S.reviewGuestTitle}>Log in to leave a review</Text>
              <Text style={S.reviewGuestText}>
                Sign in to share your beer rating and help others discover great brews.
              </Text>
              <TouchableOpacity
                style={S.reviewGuestButton}
                onPress={() => navigation.navigate('Profile', { screen: 'Login' })}
              >
                <Text style={S.reviewGuestButtonText}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={S.reviewGuestButtonSecondary}
                onPress={() => navigation.navigate('Profile', { screen: 'Register' })}
              >
                <Text style={S.reviewGuestButtonSecondaryText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
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
            </>
          )}
        </View>

        <View style={S.sectionCard}>
          <Text style={S.cardTitle}>Reviews</Text>
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
      </View>
    </ScrollView>
  );
}

export default SelectedBeerScreen;
