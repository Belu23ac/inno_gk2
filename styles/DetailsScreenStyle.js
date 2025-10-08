import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const DetailsScreenStyle = StyleSheet.create({
  // DetailsScreen specific styles
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  empty: {
    color: '#555',
    marginBottom: 12,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
  },
  ratingNumber: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  starButton: {
    paddingHorizontal: 6,
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
});