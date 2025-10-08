import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/InfoSheetStyles';

export default function InfoSheet({ bar, onClose }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bar.name}</Text>
      <Text style={styles.details}>Adresse: {bar.address}</Text>
      <View style={styles.openingHoursContainer}>
        {formatOpeningHours(bar.openingHours).map((item, index) => (
          <View key={index} style={styles.openingHoursRow}>
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.hours}>{item.hours}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.details}>Afstand: {bar.distance.toFixed(2)} km</Text>
      <Button title="Luk" onPress={onClose} />
    </View>
  );
}

function formatOpeningHours(openingHours) {
    const dayMapping = {
      Mo: "Mandag",
      Tu: "Tirsdag",
      We: "Onsdag",
      Th: "Torsdag",
      Fr: "Fredag",
      Sa: "Lørdag",
      Su: "Søndag",
    };
  
    // Standard åbningstider for alle dage som "Lukket"
    const defaultHours = Object.values(dayMapping).map((day) => ({
      day,
      hours: "Lukket",
    }));
  
    if (!openingHours) return defaultHours;
  
    const parsedHours = openingHours
      .split(";") // Split på semikolon for at få hver dag/gruppe
      .flatMap((entry) => {
        const [days, hours] = entry.trim().split(" ");
        if (!days || !hours) return null;
  
        // Håndter flere dage i én gruppe (f.eks. "Mo-We")
        const expandedDays = days.includes("-")
          ? expandDays(days, dayMapping)
          : [dayMapping[days]];
  
        // Håndter flere tidsintervaller på samme dag (f.eks. "10:00-12:00, 14:00-18:00")
        const formattedHours = hours.toLowerCase() === "off"
          ? "Lukket"
          : hours.split(",").map((interval) => interval.trim()).join(", ");
  
        // Returnér hver dag individuelt
        return expandedDays.map((day) => ({ day, hours: formattedHours }));
      })
      .filter(Boolean); // Fjern null-værdier
  
    // Kombiner standarddage med de parserede åbningstider
    return defaultHours.map((defaultDay) => {
      const matchingDay = parsedHours.find((parsedDay) => parsedDay.day === defaultDay.day);
      return matchingDay || defaultDay; // Brug parserede data, hvis de findes, ellers standard
    });
  }
  
  // Hjælpefunktion til at udvide dage (f.eks. "Mo-We" → ["Mandag", "Tirsdag", "Onsdag"])
  function expandDays(days, dayMapping) {
    const dayOrder = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const [start, end] = days.split("-");
    const startIndex = dayOrder.indexOf(start);
    const endIndex = dayOrder.indexOf(end);
  
    if (startIndex === -1 || endIndex === -1) return [];
    return dayOrder.slice(startIndex, endIndex + 1).map((day) => dayMapping[day]);
  }