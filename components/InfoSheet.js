import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/InfoSheetStyles';

export default function InfoSheet({ selectedBar, onClose }) {
  if (!selectedBar) return null;

  const { name, amenity, distance } = selectedBar;

  return (
    <View style={styles.sheet}>
      <View style={styles.header}>
        <Text style={styles.title}>{name || 'Ukendt bar'}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>{amenity}</Text>
      {distance && <Text style={styles.distance}>{distance.toFixed(1)} km væk</Text>}
    </View>
  );
}
