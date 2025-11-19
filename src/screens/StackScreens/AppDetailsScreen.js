import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { GlobalStyle } from '../../styles/GlobalStyle';
import { AppDetailsScreenStyle } from '../../styles/AppDetailsScreenStyle';

export default function AppDetailsScreen() {
  const openUrl = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
    });
  };

  return (
    <View style={[GlobalStyle.container, AppDetailsScreenStyle.screen]}>
      <ScrollView contentContainerStyle={AppDetailsScreenStyle.contentAppDetails}>
        <View style={AppDetailsScreenStyle.headerAppDetails}>
          <View style={AppDetailsScreenStyle.logoPlaceholder}>
            <Text style={AppDetailsScreenStyle.logoText}>C</Text>
          </View>
          <View style={AppDetailsScreenStyle.titleBlock}>
            <Text style={AppDetailsScreenStyle.titleAppDetails}>Ceverisia</Text>
            <Text style={AppDetailsScreenStyle.subtitleAppDetails}>Vivino for beer</Text>
          </View>
        </View>

        <Text style={AppDetailsScreenStyle.sectionTitle}>About</Text>
        <Text style={AppDetailsScreenStyle.paragraph}>
          Ceverisia helps beer lovers discover, rate and remember beers. Scan
          labels, explore styles, and build a personal beer diary — similar to
          how Vivino works for wine, but focused on beer tasting and discovery.
        </Text>

        <Text style={AppDetailsScreenStyle.sectionTitle}>Features</Text>
        <View style={AppDetailsScreenStyle.bulletList}>
          <Text style={AppDetailsScreenStyle.bullet}>• Scan and recognize beer labels</Text>
          <Text style={AppDetailsScreenStyle.bullet}>• Rate beers and write tasting notes</Text>
          <Text style={AppDetailsScreenStyle.bullet}>• Browse styles, breweries and trends</Text>
          <Text style={AppDetailsScreenStyle.bullet}>• Save favorites and track tastings</Text>
        </View>

        <Text style={AppDetailsScreenStyle.sectionTitle}>Details</Text>
        <Text style={AppDetailsScreenStyle.detail}>Version: 1.0.0</Text>
        <Text style={AppDetailsScreenStyle.detail}>Privacy: Your tasting notes stay private by default</Text>

        <Text style={AppDetailsScreenStyle.sectionTitle}>Contact</Text>
        <Text style={AppDetailsScreenStyle.paragraph}>
          Found a bug or want to suggest a feature? Reach out to the team.
        </Text>
        <View style={AppDetailsScreenStyle.actions}>
          <TouchableOpacity
            style={AppDetailsScreenStyle.buttonAppDetails}
            onPress={() => openUrl('mailto:hello@ceverisia.app')}
          >
            <Text style={AppDetailsScreenStyle.buttonTextAppDetails}>Email: hello@ceverisia.app</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[AppDetailsScreenStyle.buttonAppDetails, AppDetailsScreenStyle.secondaryButtonAppDetails]}
            onPress={() => openUrl('https://ceverisia.app')}
          >
            <Text style={[AppDetailsScreenStyle.buttonTextAppDetails, AppDetailsScreenStyle.secondaryButtonTextAppDetails]}>Visit website</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}