import React from "react";
import { View, Text, Button } from "react-native";
import styles from "../styles/InfoSheetStyles";

export default function InfoSheet({ bar, onClose }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bar.name}</Text>
      <Text style={styles.details}>Address: {bar.address}</Text>
      <View style={styles.openingHoursContainer}>
        {formatOpeningHours(bar.openingHours).map((item, index) => (
          <View key={index} style={styles.openingHoursRow}>
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.hours}>{item.hours}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.details}>Distance: {bar.distance.toFixed(2)} km</Text>
      <Button title="Close" onPress={onClose} />
    </View>
  );
}

function formatOpeningHours(openingHours) {
  const dayMapping = {
    Mo: "Monday",
    Tu: "Tuesday",
    We: "Wednesday",
    Th: "Thursday",
    Fr: "Friday",
    Sa: "Saturday",
    Su: "Sunday",
  };

  // Default opening hours for all days set to "Closed"
  const defaultHours = Object.values(dayMapping).map((day) => ({
    day,
    hours: "Closed",
  }));

  if (!openingHours) return defaultHours;

  const parsedHours = openingHours
    .split(";") // Split on semicolon to get each day/group
    .flatMap((entry) => {
      const [days, hours] = entry.trim().split(" ");
      if (!days || !hours) return null;

      // Handle ranges of days (e.g. "Mo-We")
      const expandedDays = days.includes("-")
        ? expandDays(days, dayMapping)
        : [dayMapping[days]];

      // Handle multiple time intervals on same day (e.g. "10:00-12:00, 14:00-18:00")
      const formattedHours =
        hours.toLowerCase() === "off"
          ? "Closed"
          : hours
              .split(",")
              .map((interval) => interval.trim())
              .join(", ");

      // Return each day individually
      return expandedDays.map((day) => ({ day, hours: formattedHours }));
    })
    .filter(Boolean); // Remove null values

  // Merge default days with parsed opening hours
  return defaultHours.map((defaultDay) => {
    const matchingDay = parsedHours.find(
      (parsedDay) => parsedDay.day === defaultDay.day
    );
    return matchingDay || defaultDay;
  });
}

// Helper to expand day ranges (e.g. "Mo-We" → ["Monday","Tuesday","Wednesday"])
function expandDays(days, dayMapping) {
  const dayOrder = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const [start, end] = days.split("-");
  const startIndex = dayOrder.indexOf(start);
  const endIndex = dayOrder.indexOf(end);

  if (startIndex === -1 || endIndex === -1) return [];
  return dayOrder.slice(startIndex, endIndex + 1).map((day) => dayMapping[day]);
}
