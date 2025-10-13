import React, { useCallback } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ButtonComponent from "../components/ButtonComponents";
import { GlobalStyle } from "../styles/GlobalStyle";
import { SearchScreenStyle } from "../styles/SearchScreenStyle";
import { Colors } from "../styles/Colors";

// RapidAPI constants
const RAPIDAPI_HOST = "beer9.p.rapidapi.com";
const RAPIDAPI_KEY = "e4e173ad62msh6d2bcb67ac5ad4ep16e038jsn5d45302705ca";

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [activeChip, setActiveChip] = React.useState("");

  const quickSuggestions = React.useMemo(
    () => ["Carlsberg", "Guinness Draught", "Heineken", "IPA", "Stout", "Lager", "Pilsner", "Porter", "Wheat Beer", "Saison"],
    []
  );

  // normalize raw API item into a display-friendly object
  const normalize = React.useCallback((item, idx) => {
    const name = item?.name || item?.beer || item?.beer_name || item?.title || "Unknown";
    const brewery = item?.brewery || item?.brewery_name || item?.brand || item?.company || "Unknown brewery";
    const abvRaw = item?.abv ?? item?.alcohol ?? item?.abv_percent;
    const abv = abvRaw == null ? "N/A" : `${String(abvRaw).includes("%") ? abvRaw : `${abvRaw}%`}`;
    const id = String(item?.id || item?._id || item?.beer_id || `${name}-${brewery}-${idx}`);
    return { id, name, brewery, abv, _raw: item };
  }, []);

  const runSearch = useCallback(async (queryValue) => {
    Keyboard.dismiss();
    const query = (queryValue?.trim() || "Carlsberg"); // default beer name fallback
    // Fetch beers from RapidAPI using the beer name query
    const params = new URLSearchParams({ name: query });
    const url = `https://beer9.p.rapidapi.com/?${params.toString()}`;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": RAPIDAPI_HOST,
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

      const normalized = list.map(normalize);

      setResults(normalized);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch beers. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  const handleSearch = useCallback(() => {
    runSearch(searchText);
  }, [runSearch, searchText]);

  const handleQuickSelect = useCallback(
    (term) => {
      setActiveChip(term);
      setSearchText(term);
      runSearch(term);
    },
    [runSearch]
  );

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
        setActiveChip("");
      };
    }, [])
  );

  const showEmptyState = !loading && !error && results.length === 0;

  return (
    <View style={[GlobalStyle.container, SearchScreenStyle.container]}>
      <ScrollView
        contentContainerStyle={SearchScreenStyle.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={SearchScreenStyle.heroCard}>
          <Text style={SearchScreenStyle.heroEyebrow}>Discover</Text>
          <Text style={SearchScreenStyle.heroTitle}>Find your next favorite pour</Text>
          <Text style={SearchScreenStyle.heroSubtitle}>
            Search our beer catalog — find beers by name and open details instantly.
          </Text>
        </View>

        <View style={SearchScreenStyle.searchCard}>
          <Text style={SearchScreenStyle.searchTitle}>Search the library</Text>
          <Text style={SearchScreenStyle.searchSubtitle}>
            Type a beer name. Not sure where to start? Try one of the quick suggestions below.
          </Text>

          <View style={SearchScreenStyle.searchRow}>
            <TextInput
              style={SearchScreenStyle.input}
              placeholder="Search beer name"
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                if (activeChip) setActiveChip("");
              }}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
            <ButtonComponent title="Search" onPress={handleSearch} />
          </View>

          <View style={SearchScreenStyle.chipRow}>
            {quickSuggestions.map((term) => (
              <Pressable
                key={term}
                onPress={() => handleQuickSelect(term)}
                style={({ pressed }) => [
                  SearchScreenStyle.chip,
                  activeChip === term && SearchScreenStyle.chipActive,
                  pressed && { opacity: 0.75 },
                ]}
              >
                <Text
                  style={[
                    SearchScreenStyle.chipText,
                    activeChip === term && SearchScreenStyle.chipTextActive,
                  ]}
                >
                  {term}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {loading && (
          <View style={SearchScreenStyle.loadingRow}>
            <ActivityIndicator color={Colors.primary} />
            <Text style={SearchScreenStyle.loadingText}>Pouring in the latest results…</Text>
          </View>
        )}

        {error && (
          <View style={SearchScreenStyle.emptyState}>
            <Text style={SearchScreenStyle.emptyTitle}>Something spilled</Text>
            <Text style={SearchScreenStyle.emptySubtitle}>{error}</Text>
          </View>
        )}

        {/* Results box at the bottom */}
        <View style={[SearchScreenStyle.searchCard, { marginTop: 8 }]}>
          <Text style={SearchScreenStyle.searchTitle}>Results</Text>
          <View style={SearchScreenStyle.resultsList}>
            {results.map((beer) => (
              <Pressable
                key={beer.id}
                onPress={() => handlePressBeer(beer)}
                style={({ pressed }) => [SearchScreenStyle.resultCard, pressed && { opacity: 0.9 }]}
              >
                <Text
                  style={SearchScreenStyle.resultTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {beer.name}
                </Text>
                <View style={SearchScreenStyle.resultMetaRow}>
                  <View style={SearchScreenStyle.badge}>
                    <Text style={SearchScreenStyle.badgeText}>BREWERY</Text>
                  </View>
                  <Text
                    style={SearchScreenStyle.resultMeta}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {beer.brewery} • {beer.abv}
                  </Text>
                </View>
              </Pressable>
            ))}
            {showEmptyState && (
              <View style={SearchScreenStyle.emptyState}>
                <Text style={SearchScreenStyle.emptyTitle}>No results yet</Text>
                <Text style={SearchScreenStyle.emptySubtitle}>
                  Try searching above or tap a suggestion to see matches here.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
