import { StyleSheet } from "react-native";
import { Colors } from "../styles/Colors";

export const FavoritesScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 20,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.subtitle,
    lineHeight: 20,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  favoriteIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.favorite, // den gule baggrund
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteIconText: {
    color: Colors.buttonText,
    fontSize: 20,
    fontWeight: "700",
  },
  favoriteMeta: {
    flex: 1,
    marginLeft: 16,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  favoriteDetails: {
    fontSize: 13,
    color: Colors.subtitle,
    marginTop: 4,
  },
  starsContainer: {
    flexDirection: "row",
    marginTop: 6,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.subtitle,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: Colors.subtitle,
  },
});
