import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { GlobalStyle } from '../../styles/GlobalStyle';

export default function AppDetailsScreen() {
  const openUrl = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
    });
  };

  return (
    <View style={GlobalStyle.container}>
      <ScrollView contentContainerStyle={GlobalStyle.contentAppDetails}>
        <View style={GlobalStyle.headerAppDetails}>
          <View style={GlobalStyle.logoPlaceholder}>
            <Text style={GlobalStyle.logoText}>C</Text>
          </View>
          <View style={GlobalStyle.titleBlock}>
            <Text style={GlobalStyle.titleAppDetails}>Ceverisia</Text>
            <Text style={GlobalStyle.subtitleAppDetails}>Vivino for beer</Text>
          </View>
        </View>

        <Text style={GlobalStyle.sectionTitle}>About</Text>
        <Text style={GlobalStyle.paragraph}>
          Ceverisia helps beer lovers discover, rate and remember beers. Scan
          labels, explore styles, and build a personal beer diary — similar to
          how Vivino works for wine, but focused on beer tasting and discovery.
        </Text>

        <Text style={GlobalStyle.sectionTitle}>Features</Text>
        <View style={GlobalStyle.bulletList}>
          <Text style={GlobalStyle.bullet}>• Scan and recognize beer labels</Text>
          <Text style={GlobalStyle.bullet}>• Rate beers and write tasting notes</Text>
          <Text style={GlobalStyle.bullet}>• Browse styles, breweries and trends</Text>
          <Text style={GlobalStyle.bullet}>• Save favorites and track tastings</Text>
        </View>

        <Text style={GlobalStyle.sectionTitle}>Details</Text>
        <Text style={GlobalStyle.detail}>Version: 1.0.0</Text>
        <Text style={GlobalStyle.detail}>Privacy: Your tasting notes stay private by default</Text>

        <Text style={GlobalStyle.sectionTitle}>Contact</Text>
        <Text style={GlobalStyle.paragraph}>
          Found a bug or want to suggest a feature? Reach out to the team.
        </Text>
        <View style={GlobalStyle.actions}>
          <TouchableOpacity
            style={GlobalStyle.buttonAppDetails}
            onPress={() => openUrl('mailto:hello@ceverisia.app')}
          >
            <Text style={GlobalStyle.buttonTextAppDetails}>Email: hello@ceverisia.app</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[GlobalStyle.buttonAppDetails, GlobalStyle.secondaryButtonAppDetails]}
            onPress={() => openUrl('https://ceverisia.app')}
          >
            <Text style={[GlobalStyle.buttonTextAppDetails, GlobalStyle.secondaryButtonTextAppDetails]}>Visit website</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}