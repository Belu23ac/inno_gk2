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
  imageWrapper: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  beerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imagePlaceholderText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  imagePlaceholderFrame: {
    width: "95%",
    height: "85%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  beerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenContent: {
    padding: 16,
  },
  detailsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadowLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 12,
    lineHeight: 20,
  },
  sectionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
    shadowColor: Colors.shadowLight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  beerDetails: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
    textAlign: "center",
  },
  metaBox: {
    width: "100%",
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 12,
  },
  metaLeft: {
    flex: 1,
    paddingRight: 8,
  },
  metaText: {
    color: Colors.text,
    fontSize: 14,
    marginBottom: 4,
  },
  metaSubText: {
    color: Colors.subtitle,
    fontSize: 13,
  },
  metaRight: {
    minWidth: 88,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  abvLabel: {
    color: Colors.subtitle,
    fontSize: 12,
  },
  abvValue: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadowLight,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
    height: 48,
  },
  favoriteButtonText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "700",
    color: Colors.primary,
  },
  favoriteButtonGuest: {
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.primarySoft,
  },
  favoriteButtonTextGuest: {
    // Saved as an alias for future feature flags; keep same as default to maintain consistent look
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 15,
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
  reviewDate: {
    marginTop: 4,
    color: "gray",
    fontSize: 12,
  },
  reviewStars: {
    marginTop: 4,
    color: Colors.subtitle,
    fontSize: 12,
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
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
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadowLight,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
    height: 48,
  },
  shareButtonText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "700",
    color: Colors.primary, // Grøn farve fra Colors.js
  },
  reviewContainer: {
    marginTop: 24,
    paddingHorizontal: 16, // Tilføj vandret padding
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
  },
  reviewGuestContainer: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 12,
  },
  reviewGuestTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 12,
    textAlign: "center",
  },
  reviewGuestText: {
    fontSize: 14,
    color: Colors.subtitle,
    textAlign: "center",
    marginVertical: 12,
    lineHeight: 20,
  },
  reviewGuestButton: {
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  reviewGuestButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: "600",
  },
  reviewGuestButtonSecondary: {
    width: "100%",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  reviewGuestButtonSecondaryText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});