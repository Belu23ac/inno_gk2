import React, { useCallback } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Keyboard,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ButtonComponent from "../components/ButtonComponents";
import { GlobalStyle } from "../styles/GlobalStyle";
import { SearchScreenStyle } from "../styles/SearchScreenStyle";

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSearch = async () => {
    Keyboard.dismiss();
  // Fetch beers from RapidAPI using the brewery query
    const params = new URLSearchParams({ name: (searchText?.trim() || "Carlsberg") });
    const url = `https://beer9.p.rapidapi.com/?${params.toString()}`;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": "e4e173ad62msh6d2bcb67ac5ad4ep16e038jsn5d45302705ca",
          "x-rapidapi-host": "beer9.p.rapidapi.com",
        },
      });

      // Attempt JSON first, fall back to text if needed
      let raw;
      const text = await response.text();
      try {
        raw = JSON.parse(text);
      } catch (_) {
        raw = text;
      }

      const list = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];

      const normalized = list.map((item, idx) => {
        const name = item?.name || item?.beer || item?.beer_name || item?.title || "Unknown";
        const brewery = item?.brewery || item?.brewery_name || item?.brand || item?.company || "Unknown brewery";
        const abvRaw = item?.abv ?? item?.alcohol ?? item?.abv_percent;
        const abv = abvRaw == null ? "N/A" : `${String(abvRaw).includes("%") ? abvRaw : `${abvRaw}%`}`;
        const id = String(item?.id || item?._id || item?.beer_id || `${name}-${brewery}-${idx}`);
        return { id, name, brewery, abv, _raw: item };
      });

      setResults(normalized);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch beers. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePressBeer = (beer) => {
    navigation.navigate("Selected Beer", {
      screen: "SelectedBeer",
      params: { beer },
    });
  };

  // Reset when navigating away so that coming back shows the initial state
  useFocusEffect(
    useCallback(() => {
      // no-op on focus
      return () => {
        setSearchText("");
        setResults([]);
      };
    }, [])
  );

  return (
    <View style={[GlobalStyle.container, SearchScreenStyle.container]}>
      <View style={SearchScreenStyle.content}>
        <View style={SearchScreenStyle.searchRow}>
          <TextInput
            style={SearchScreenStyle.input}
            placeholder="Search beer, brewery or style"
            editable={true} // non-functional on purpose
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          <View style={{ marginLeft: 8 }}>
            <ButtonComponent title="Search" onPress={handleSearch} />
          </View>
        </View>

      {loading && (
        <View style={{ marginVertical: 12 }}>
          <Text>Loading…</Text>
        </View>
      )}

      {error && (
        <View style={{ marginVertical: 12 }}>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      )}

      <ScrollView>
        {results.map((beer) => (
          <Pressable
            key={beer.id}
            onPress={() => handlePressBeer(beer)}
            style={({ pressed }) => [GlobalStyle.card, pressed && { opacity: 0.8 }]}
          >
            <View style={SearchScreenStyle.cardInfo}>
              <Text style={SearchScreenStyle.cardName}>{beer.name}</Text>
              <Text style={SearchScreenStyle.cardMeta}>
                {beer.brewery} • {beer.abv}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      </View>
    </View>
  );
}
