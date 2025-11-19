import React, { useCallback } from "react";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { GlobalStyle } from "../styles/GlobalStyle";
import useBeerSearch from '../hooks/useBeerSearch';
import SearchBar from '../components/search/SearchBar';
import QuickSuggestions from '../components/search/QuickSuggestions';
import ResultsList from '../components/search/ResultsList';
import { SearchScreenStyle } from "../styles/SearchScreenStyle";
import { Colors } from "../styles/Colors";

export default function SearchScreen({ navigation }) {
  const {
    searchText,
    setSearchText,
    quickSuggestions,
    results,
    loading,
    error,
    activeChip,
    searchActive,
    setSearchActive,
    handleQuickSelect,
    handleClear,
    handleSearch,
  } = useBeerSearch();

  const inputRef = React.useRef(null);

  useFocusEffect(
    useCallback(() => {
      return () => {
        handleClear(inputRef.current);
      };
    }, [])
  );

  const trimmedQuery = searchText.trim();
  const showEmptyState =
    (searchActive || trimmedQuery.length > 0) &&
    !loading &&
    !error &&
    results.length === 0;
  const showIdleState = !searchActive && trimmedQuery.length === 0;
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
            <SearchBar
              searchText={searchText}
              setSearchText={setSearchText}
              inputRef={inputRef}
              onSearch={handleSearch}
              onClear={() => handleClear(inputRef.current)}
              showIdleState={showIdleState}
              activeChip={activeChip}
              setSearchActive={setSearchActive}
            />
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

            <QuickSuggestions
              quickSuggestions={quickSuggestions}
              activeChip={activeChip}
              handleQuickSelect={handleQuickSelect}
            />
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
          <ResultsList results={results} showEmptyState={showEmptyState} navigation={navigation} />
        )}
      </ScrollView>
    </View>
  );
}
