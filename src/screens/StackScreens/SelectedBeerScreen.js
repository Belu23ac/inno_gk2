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
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { SelectedBeerScreenStyle as S } from '../../styles/SelectedBeerScreenStyle';
import { useFocusEffect } from "@react-navigation/native";
import { Colors } from "../../styles/Colors";

const StarRating = ({ rating, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={{ flexDirection: "row" }}>
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onRatingChange(star)}
          onLongPress={() => onRatingChange(star - 0.5)} // Halve stjerner
        >
          <Ionicons
            name={rating >= star ? "star" : rating >= star - 0.5 ? "star-half" : "star-outline"}
            size={24}
            color="gold"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

function SelectedBeerScreen({ route }) {
  const { user } = useAuth();
  const { beer } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewStars, setReviewStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [submittingReview, setSubmittingReview] = useState(false);

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
      
      if (isFavorite) {
        await deleteDoc(userFavoritesRef);

        setIsFavorite(false);
      } else {
        await setDoc(userFavoritesRef, {
          ...beer,
          userId: user.uid,
          addedAt: new Date(),
        });
        
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const reviewsRef = collection(db, "reviews");
      const querySnapshot = await getDocs(
        query(reviewsRef, where("beerId", "==", beer.id))
      );
      const fetchedReviews = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(), // Konverter Firestore Timestamp til JavaScript Date
        };
      });
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
    if (!reviewText.trim()) {
      Alert.alert("Error", "Review cannot be empty.");
      return;
    }
    if (reviewStars < 0.5 || reviewStars > 5) {
      Alert.alert("Error", "Please select a star rating between 0.5 and 5.");
      return;
    }

    try {
      const reviewsRef = collection(db, "reviews");
      await addDoc(reviewsRef, {
        beerId: beer.id,
        userId: user.uid,
        text: reviewText.trim(),
        stars: reviewStars, // Gem halve stjerner
        createdAt: new Date(),
      });
      setReviews((prev) => [
        ...prev,
        { text: reviewText.trim(), stars: reviewStars, createdAt: new Date() },
      ]);
      setReviewText("");
      setReviewStars(0);
    } catch (error) {
      console.error("Error submitting review:", error);
      Alert.alert("Error", "Could not submit review.");
    }
  };

  const selectStars = (stars) => setReviewStars(stars);

  const shareBeer = async () => {
    try {
      const message = `Check out this beer: ${beer.name}\n\nStyle: ${beer.style || "Unknown Style"}\nABV: ${beer.abv || "Unknown ABV"}\n\nDescription: ${beer._raw?.description || "No description available"}\n\nLink: https://yourapp.com/beers/${beer.id}`;
      await Share.share({
        message,
      });
    } catch (error) {
      console.error("Error sharing beer:", error);
      Alert.alert("Error", "Could not share the beer.");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{beer.name}</Text>
        <Text style={{ fontSize: 16, color: "gray", marginTop: 8 }}>
          {beer.style || "Unknown Style"} - {beer.location || "Unknown Location"}
        </Text>
        <Text style={{ fontSize: 14, marginTop: 16 }}>
          ABV: {beer.abv || "Unknown ABV"}
        </Text>
        <Text style={{ fontSize: 14, marginTop: 16 }}>
          Description: {beer._raw?.description || "No description available"}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
          <TouchableOpacity
            style={[S.favoriteButton, { flex: 1, marginRight: 8 }]} // Tilføj margin til højre
            onPress={toggleFavorite}
            disabled={loading}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20} // Gør ikonet mindre
              color={isFavorite ? Colors.primary : "gray"} // Grøn farve, når favoritten er sat
            />
            <Text style={S.favoriteButtonText}>
              {isFavorite ? "Remove" : "Favorite"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[S.shareButton, { flex: 1 }]} // Brug samme højde som favorit-knappen
            onPress={shareBeer}
          >
            <Ionicons name="share-outline" size={20} color={Colors.primary} />
            <Text style={S.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Anmeldelsesformular og anmeldelser */}
      <View style={S.reviewContainer}>
        <Text style={S.sectionTitle}>Leave a Review</Text>
        <TextInput
          style={S.reviewInput}
          placeholder="Write your review here..."
          value={reviewText}
          onChangeText={setReviewText}
        />
        <StarRating rating={reviewStars} onRatingChange={setReviewStars} />
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
              <View style={{ flexDirection: "row" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
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
              <Text style={S.reviewText}>{review.text}</Text>
              <Text style={S.reviewDate}>
                {review.createdAt
                  ? review.createdAt.toLocaleDateString()
                  : "Unknown Date"}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

export default SelectedBeerScreen;
