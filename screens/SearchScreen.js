import React, { useCallback } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ButtonComponent from "../components/ButtonComponents";
import { GlobalStyle } from "../styles/GlobalStyle";

export default function SearchScreen({ navigation }) {
  const dummyBeers = [
    {
      id: "1",
      name: "Hoppy Trails IPA",
      brewery: "Trailside Brewery",
      abv: "6.5%",
    },
    { id: "2", name: "Sunset Lager", brewery: "Golden Road", abv: "4.7%" },
    { id: "3", name: "Midnight Stout", brewery: "Dark Harbor", abv: "8.2%" },
    { id: "4", name: "Citrus Ale", brewery: "Brightside Brewing", abv: "5.0%" },
  ];

  const [searchText, setSearchText] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [showSuggestion, setShowSuggestion] = React.useState(false);
  const [showSearchBar, setShowSearchBar] = React.useState(true);

  const handleSearch = () => {
    // Serve the dummy picks on press and hide the search bar
    setResults(dummyBeers);
    setShowSuggestion(true);
    setShowSearchBar(false);
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
        setShowSuggestion(false);
        setShowSearchBar(true);
      };
    }, [])
  );

  return (
    <View style={GlobalStyle.container}>
      {showSearchBar && (
        <View style={GlobalStyle.searchRow}>
          <TextInput
            style={GlobalStyle.input}
            placeholder="Search beer, brewery or style"
            editable={true} // non-functional on purpose
            value={searchText}
            onChangeText={setSearchText}
          />
          <ButtonComponent title="Search" onPress={handleSearch} />
        </View>
      )}

      {showSuggestion && (
        <View style={GlobalStyle.suggestionContainer}>
          <Text style={GlobalStyle.resultsTitle}>
            {`Couldn't find any results for "${searchText}"`}
          </Text>
          <Text style={GlobalStyle.resultsTitle}>Did you mean:</Text>
        </View>
      )}

      <ScrollView>
        {results.map((beer) => (
          <Pressable
            key={beer.id}
            onPress={() => handlePressBeer(beer)}
            style={({ pressed }) =>
              pressed ? GlobalStyle.cardPressed : GlobalStyle.card
            }
          >
            <View style={GlobalStyle.cardInfo}>
              <Text style={GlobalStyle.cardName}>{beer.name}</Text>
              <Text style={GlobalStyle.cardMeta}>
                {beer.brewery} • {beer.abv}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
