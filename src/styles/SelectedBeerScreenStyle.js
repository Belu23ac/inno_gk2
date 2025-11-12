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
    flexDirection: "row", // Placer ikon og tekst i en række
    alignItems: "center", // Centrer ikon og tekst lodret
    justifyContent: "center", // Centrer indholdet vandret
    padding: 8, // Reducer padding
    borderRadius: 8, // Gør knappen lidt rund
    backgroundColor: "#f5f5f5", // Lys baggrund
    marginVertical: 16, // Tilføj lidt afstand over og under knappen
    alignSelf: "center", // Centrer knappen på skærmen
  },
  favoriteButtonText: {
    fontSize: 14, // Reducer tekststørrelsen
    color: "gray",
    marginLeft: 8, // Tilføj lidt afstand mellem ikon og tekst
  },
  reviewsContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18, // Gør teksten større
    fontWeight: "bold", // Gør teksten fed
    color: "#000", // Sort tekst for bedre kontrast
    marginBottom: 8, // Tilføj lidt afstand under teksten
  },
  reviewsTitle: {
    fontSize: 18, // Gør teksten større
    fontWeight: "bold", // Gør teksten fed
    color: "#000", // Sort tekst for bedre kontrast
    marginTop: 16, // Tilføj lidt afstand over teksten
    marginBottom: 8, // Tilføj lidt afstand under teksten
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