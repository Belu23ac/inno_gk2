import { StyleSheet } from 'react-native';

const InfoSheetStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  openingHoursContainer: {
    marginVertical: 10,
  },
  openingHoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  day: {
    fontSize: 16,
    fontWeight: 'normal', // Fjern fed skrift
    textAlign: 'left', // Sørg for, at dagene står til venstre
    flex: 1, // Sørger for, at dagene fylder den venstre kolonne
  },
  hours: {
    fontSize: 16,
    fontWeight: 'normal', // Sørg for, at åbningstiderne ikke er fede
    textAlign: 'right', // Sørg for, at åbningstiderne står til højre
    flex: 1, // Sørger for, at åbningstiderne fylder den højre kolonne
  },
});

export default InfoSheetStyles;
