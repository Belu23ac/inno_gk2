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
import Ionicons from "@react-native-vector-icons/ionicons";
import { GlobalStyle } from "../styles/GlobalStyle";
import { SearchScreenStyle } from "../styles/SearchScreenStyle";
import { Colors } from "../styles/Colors";

// RapidAPI constants
const RAPIDAPI_HOST = "beer9.p.rapidapi.com";
const RAPIDAPI_KEY = "8da79668e7msha3588088efb524bp1d2d3fjsn362d5dd71216";

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [activeChip, setActiveChip] = React.useState("");
  const [searchActive, setSearchActive] = React.useState(false);

  const quickSuggestions = React.useMemo(
    () => [
      "Carlsberg",
      "Guinness Draught",
      "Heineken",
      "IPA",
      "Stout",
      "Lager",
      "Pilsner",
      "Porter",
      "Wheat Beer",
      "Saison",
    ],
    []
  );

  // normalize raw API item into a display-friendly object
  const normalize = React.useCallback((item, idx) => {
    const name =
      item?.name || item?.beer || item?.beer_name || item?.title || "Unknown";
    const brewery =
      item?.brewery ||
      item?.brewery_name ||
      item?.brand ||
      item?.company ||
      "Unknown brewery";
    const abvRaw = item?.abv ?? item?.alcohol ?? item?.abv_percent;
    const abv =
      abvRaw == null
        ? "N/A"
        : `${String(abvRaw).includes("%") ? abvRaw : `${abvRaw}%`}`;
    const id = String(
      item?.id || item?._id || item?.beer_id || `${name}-${brewery}-${idx}`
    );
    return { id, name, brewery, abv, _raw: item };
  }, []);

  const runSearch = useCallback(
    async (queryValue) => {
      Keyboard.dismiss();
      const query = queryValue?.trim() || "Carlsberg"; // default beer name fallback
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

        const list = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
          ? raw.data
          : [];

        const normalized = list.map(normalize);

        setResults(normalized);
      } catch (e) {
        console.error(e);
        setError("Failed to fetch beers. Please try again.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [normalize]
  );

  const handleSearch = useCallback(() => {
    const q = searchText?.trim();
    if (!q || q.length === 0) {
      // don't trigger a search when the input is empty
      return;
    }
    setSearchActive(true);
    runSearch(q);
  }, [runSearch, searchText]);

  const handleQuickSelect = useCallback(
    (term) => {
      setActiveChip(term);
      setSearchText(term);
      setSearchActive(true);
      runSearch(term);
    },
    [runSearch]
  );

  const inputRef = React.useRef(null);

  const handleClear = useCallback(() => {
    setSearchText("");
    setResults([]);
    setActiveChip("");
    setSearchActive(false);
    // focus input after clearing
    inputRef.current?.focus?.();
  }, []);

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
        setSearchActive(false);
      };
    }, [])
  );

  const trimmedQuery = searchText.trim();
  const showEmptyState =
    (searchActive || trimmedQuery.length > 0) &&
    !loading &&
    !error &&
    results.length === 0;
  // Idle state keeps the intro hero and quick suggestions visible.
  const showIdleState = !searchActive && trimmedQuery.length === 0;
  const useCompactSearchButton = searchActive || trimmedQuery.length > 0;
  return (
    <View style={[GlobalStyle.container, SearchScreenStyle.container]}>
      <ScrollView
        contentContainerStyle={SearchScreenStyle.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={SearchScreenStyle.heroCard}>
          <Text style={SearchScreenStyle.heroEyebrow}>Discover</Text>
          <Text style={SearchScreenStyle.heroTitle}>
            Find your next favorite pour
          </Text>
          <View
            style={[
              SearchScreenStyle.searchRow,
              SearchScreenStyle.searchRowActive, // always use active row style so input looks active
            ]}
          >
            <TextInput
              style={[
                SearchScreenStyle.input,
                SearchScreenStyle.inputExpanded, // always use expanded look
              ]}
              placeholder="Type here to search"
              value={searchText}
              ref={inputRef}
              onChangeText={(text) => {
                setSearchText(text);
                if (activeChip) setActiveChip("");
                if (text.trim().length === 0) {
                  // Reset back to discovery mode when the query is cleared
                  setSearchActive(false);
                  setResults([]);
                  setError(null);
                }
              }}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
              onFocus={() => {
                if ((searchText || "").trim().length > 0) setSearchActive(true);
              }}
            />
            {!showIdleState && (searchActive || trimmedQuery.length > 0) ? (
              <>
                <Pressable
                  color={Colors.secondary}
                  style={SearchScreenStyle.searchSmallButton}
                  onPress={handleSearch}
                  android_ripple={{ color: "rgba(0,0,0,0.08)" }}
                  accessibilityLabel="Search"
                >
                  <Ionicons
                    name="search"
                    size={28}
                    color={Colors.primary}
                  />
                </Pressable>

                <Pressable
                  style={SearchScreenStyle.searchSmallButton}
                  onPress={handleClear}
                  accessibilityLabel="Clear search"
                >
                  <Ionicons
                    name="close"
                    size={28}
                    color={Colors.scanRed}
                  />
                </Pressable>
              </>
            ) : null}
          </View>
          {showIdleState && (
            <Text style={SearchScreenStyle.heroSubtitle}>
              Search our catalog — find beers or breweries by name and open
              details instantly.
            </Text>
          )}
        </View>

        {showIdleState && (
          <View style={SearchScreenStyle.searchCard}>
            <Text style={SearchScreenStyle.searchTitle}>
              Not sure where to start? Try one of the quick suggestions below.
            </Text>

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
        )}

        {loading && (
          <View style={SearchScreenStyle.loadingRow}>
            <ActivityIndicator color={Colors.primary} />
            <Text style={SearchScreenStyle.loadingText}>
              Pouring in the latest results…
            </Text>
          </View>
        )}

        {error && (
          <View style={SearchScreenStyle.emptyState}>
            <Text style={SearchScreenStyle.emptyTitle}>Something spilled</Text>
            <Text style={SearchScreenStyle.emptySubtitle}>{error}</Text>
          </View>
        )}

        {(results.length > 0 || showEmptyState) && (
          <View
            style={[
              SearchScreenStyle.searchCard,
              SearchScreenStyle.resultsCard,
            ]}
          >
            <Text style={SearchScreenStyle.searchTitle}>Results</Text>
            <View style={SearchScreenStyle.resultsList}>
              {results.map((beer) => (
                <Pressable
                  key={beer.id}
                  onPress={() => handlePressBeer(beer)}
                  style={({ pressed }) => [
                    SearchScreenStyle.resultCard,
                    pressed && { opacity: 0.9 },
                  ]}
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
                      <Text style={SearchScreenStyle.badgeText}>BEER</Text>
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
                  <Text style={SearchScreenStyle.emptyTitle}>
                    No results yet
                  </Text>
                  <Text style={SearchScreenStyle.emptySubtitle}>
                    Try searching above or tap a suggestion to see matches here.
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
