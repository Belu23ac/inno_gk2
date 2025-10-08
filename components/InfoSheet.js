import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/InfoSheetStyles';

export default function InfoSheet({ bar, onClose }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bar.name}</Text>
      <Text style={styles.details}>Adresse: {bar.address}</Text>
      <Text style={styles.details}>Åbningstider: {bar.openingHours}</Text>
      <Text style={styles.details}>Afstand: {bar.distance.toFixed(2)} km</Text>
      <Button title="Luk" onPress={onClose} />
    </View>
  );
}
