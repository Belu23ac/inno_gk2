import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const SelectedBeerScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  detailsContainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  beerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.title,
    marginBottom: 8,
    textAlign: "center",
  },
  beerDetails: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
    textAlign: "center",
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  favoriteButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  reviewsContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.title,
    marginBottom: 12,
  },
  reviewItem: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  reviewText: {
    marginTop: 4,
    color: Colors.text,
    fontSize: 14,
  },
  reviewStars: {
    marginTop: 4,
    color: Colors.subtitle,
    fontSize: 12,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: Colors.text,
    minHeight: 44,
    marginTop: 16,
  },
  submitButton: {
    marginTop: 10,
    alignSelf: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  submitButtonText: {
    color: Colors.buttonText,
    fontWeight: "700",
  },
});