import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../styles/Colors";
import { SelectedBeerScreenStyle as S } from "../../styles/SelectedBeerScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../database/firebase";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export default function SelectedBeerScreen({ route, navigation }) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Hent beer fra route.params
  const beer = route?.params?.beer || route?.params?.params?.beer;

  console.log("Route params:", route.params);
  console.log("Beer data:", beer);

  // Hvis beer ikke findes, vis en fallback
  if (!beer) {
    return <Text>No beer selected</Text>;
  }

  // Tjek om øllen allerede er favorit
  React.useEffect(() => {
    const checkIfFavorite = async () => {
      if (!user?.uid || !beer?.id) return;
      try {
        const userFavoritesRef = doc(db, "favorites", user.uid);
        const docSnap = await getDoc(userFavoritesRef);
        if (docSnap.exists()) {
          const favorites = docSnap.data().beers || [];
          const isFav = favorites.some((fav) => fav.id === beer.id);
          setIsFavorite(isFav);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkIfFavorite();
  }, [user?.uid, beer?.id]);

  const toggleFavorite = async () => {
    if (!user?.uid || !beer) return;

    setLoading(true);

    try {
      const userFavoritesRef = doc(db, "favorites", user.uid);

      if (isFavorite) {
        await updateDoc(userFavoritesRef, {
          beers: arrayRemove(beer),
        });
        setIsFavorite(false);
      } else {
        await updateDoc(userFavoritesRef, {
          beers: arrayUnion(beer),
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={S.container}>
      <StatusBar style="auto" />
      <View style={S.detailsContainer}>
        <Text style={S.beerName}>{beer.name || "Unknown Beer"}</Text>
        <Text style={S.beerDetails}>{beer._raw?.style || "Unknown Style"}</Text>
        <Text style={S.beerDetails}>{beer._raw?.region || "Unknown Location"}</Text>
      </View>
      <TouchableOpacity
        style={S.favoriteButton}
        onPress={toggleFavorite}
        disabled={loading}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={32}
          color={isFavorite ? "red" : "gray"}
        />
        <Text>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
