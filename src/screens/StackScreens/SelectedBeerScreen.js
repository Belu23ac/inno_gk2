import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { GlobalStyle } from "../../styles/GlobalStyle";
import { Colors } from "../../styles/Colors";
import { SelectedBeerScreenStyle as S } from "../../styles/SelectedBeerScreenStyle";
import { Ionicons } from "@expo/vector-icons"; // Importer Ionicons til favoritikon
import { useAuth } from "../../contexts/AuthContext"; // For at få adgang til brugerens uid
import { db } from "../../database/firebase"; // Firestore-integration
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export default function SelectedBeerScreen({ route }) {
  const { user } = useAuth(); // Hent den autentificerede bruger
  const [isFavorite, setIsFavorite] = React.useState(false); // Tjekker om øllen er favorit
  const [loading, setLoading] = React.useState(false);

  // Hent øl fra route params
  const beer = route?.params?.beer;

  // Tjek om øllen allerede er en favorit
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

  // Tilføj eller fjern øllen fra favoritter
  const toggleFavorite = async () => {
    if (!user?.uid || !beer) return;

    setLoading(true);

    try {
      const userFavoritesRef = doc(db, "favorites", user.uid);

      if (isFavorite) {
        // Fjern fra favoritter
        await updateDoc(userFavoritesRef, {
          beers: arrayRemove(beer),
        });
        setIsFavorite(false);
      } else {
        // Tilføj til favoritter
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
    <ScrollView
      style={S.container} // Brug den overordnede stil fra SelectedBeerScreenStyle
      contentContainerStyle={S.contentContainer} // Brug contentContainerStyle til layout
    >
      <StatusBar style="auto" />
      <View style={S.imageContainer}>
        {beer?.image && (
          <Image
            source={{ uri: beer.image }}
            style={S.image}
          />
        )}
      </View>
      <View style={S.detailsContainer}>
        <Text style={S.beerName}>{beer?.name || "Unknown Beer"}</Text>
        <Text style={S.beerDetails}>{beer?.style || "Unknown Style"}</Text>
        <Text style={S.beerDetails}>{beer?.location || "Unknown Location"}</Text>
      </View>
      <TouchableOpacity
        style={S.favoriteButton}
        onPress={toggleFavorite}
        disabled={loading}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={32}
          color={isFavorite ? Colors.primary : Colors.gray}
        />
        <Text style={S.favoriteButtonText}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
