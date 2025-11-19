import { View, TouchableOpacity, Text } from 'react-native';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/Colors';

const TRENDING_BREWERIES = [
  {
    id: 'brew-1',
    logo: require('../../assets/øresund-brewers.avif'),
    name: 'Øresund Brewers',
    location: 'Copenhagen, DK',
    highlight: 'Weekly tap takeover & smørrebrød pairings',
  },
  {
    id: 'brew-2',
    logo: require('../../assets/jutland-barrelworks.avif'),
    name: 'Jutland Barrelworks',
    location: 'Aarhus, DK',
    highlight: 'Sour and farmhouse saisons aged in oak',
  },
  {
    id: 'brew-3',
    logo: require('../../assets/funen-fermentary.avif'),
    name: 'Funen Fermentary',
    location: 'Odense, DK',
    highlight: 'Rye-forward stouts and Nordic hops experiments',
  },
];
import { HomeScreenStyle } from '../../styles/HomeScreenStyle';

export default function TrendingSection({ navigation }) {
  return (
    <View style={HomeScreenStyle.section}>
      <View style={HomeScreenStyle.sectionHeader}>
        <Text style={HomeScreenStyle.sectionTitle}>Trending breweries</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <Text style={HomeScreenStyle.sectionLink}>Explore map</Text>
        </TouchableOpacity>
      </View>
      {TRENDING_BREWERIES.map((brewery) => (
        <View key={brewery.id} style={HomeScreenStyle.trendingCard}>
          {brewery.logo ? (
            <Image source={brewery.logo} style={HomeScreenStyle.trendingLogo} />
          ) : (
            <View style={[HomeScreenStyle.trendingLogo, { justifyContent: 'center', alignItems: 'center' }]}>
              <Ionicons name="location-outline" size={1} color={Colors.primary} />
            </View>
          )}

          <View style={HomeScreenStyle.trendingText}>
            <Text style={HomeScreenStyle.trendingName}>{brewery.name}</Text>
            <Text style={HomeScreenStyle.trendingLocation}>{brewery.location}</Text>
            <Text style={HomeScreenStyle.trendingHighlight}>{brewery.highlight}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
