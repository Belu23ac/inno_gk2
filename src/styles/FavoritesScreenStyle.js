import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const FavoritesScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.title,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.subtitle,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.subtitle,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  favoriteIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  favoriteIconText: {
    color: Colors.buttonText,
    fontSize: 18,
    fontWeight: "bold",
  },
  favoriteMeta: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.title,
    marginBottom: 4,
  },
  favoriteDetails: {
    fontSize: 14,
    color: Colors.text,
  },
});
