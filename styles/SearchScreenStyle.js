import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

// Dedicated styles for SearchScreen to avoid the search bar sticking to the top header
export const SearchScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'flex-start', // ensure content starts at the top
    alignItems: 'center', // keep content centered horizontally
  },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingTop: 24, // add visible space below header
  },
  // Puts spacing below the top app bar/header and lays out the input + button
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
  },
  // Suggestion header styles
  suggestionContainer: {
    marginBottom: 8,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  // Card layout helpers used locally on SearchScreen
  cardInfo: {
    flexDirection: "column",
  },
  cardName: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardMeta: {
    color: Colors.text,
    opacity: 0.7,
    marginTop: 2,
  },
});
