import { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { HomeScreenStyle } from "../styles/HomeScreenStyle";
import { Colors } from "../styles/Colors";
import * as MockBeers from "../contexts/MockBeers";

const importedMockBeers = MockBeers.SAMPLE_BEERS || MockBeers.default || [];

const getRandomBeer = (beers) => {
  if (!Array.isArray(beers) || beers.length === 0) return null;
  const index = Math.floor(Math.random() * beers.length);
  return beers[index];
};

const FLAVOR_KEYWORDS = [
  { keyword: "citrus", label: "Citrus peel" },
  { keyword: "pine", label: "Pine resin" },
  { keyword: "chocolate", label: "Dark cocoa" },
  { keyword: "coffee", label: "Roasted coffee" },
  { keyword: "malt", label: "Toasty malt" },
  { keyword: "spruce", label: "Nordic spruce" },
  { keyword: "oak", label: "Oak aged" },
  { keyword: "crisp", label: "Crisp finish" },
  { keyword: "smooth", label: "Silky mouthfeel" },
];

const buildFlavorNotes = (beer) => {
  const description = (beer?._raw?.description || beer?.description || "")
    .toLowerCase()
    .trim();
  const matches = FLAVOR_KEYWORDS.filter((pair) =>
    description.includes(pair.keyword)
  ).map((pair) => pair.label);
  if (matches.length === 0 && beer?._raw?.style) {
    matches.push(beer._raw.style);
  }
  while (matches.length < 2) {
    matches.push("Small batch");
  }
  return matches.slice(0, 3);
};


const OFFER_BEER = getRandomBeer(importedMockBeers);

const OFFER_OF_WEEK = {
  label: "Offer of the week",
  name: OFFER_BEER?.name,
  blurb:
    OFFER_BEER?._raw?.description ||
    OFFER_BEER?.blurb ||
    "Spruce tipped seasonal from Fjord & Foam. Pre-order and save 20%.",
  price: OFFER_BEER?.price || "Member price 89 kr",
  beer: OFFER_BEER,
};

// Focus-friendly tags — these appear in the "Focus" stat on curated cards
// Short, clear labels that describe what to focus on for this beer
const METAS = [
  "Citrus-forward",
  "Lina's pick",
  "Hop-forward",
  "Oak-aged",
  "New arrival",
];

const CURATED_PICKS = (Array.isArray(importedMockBeers)
  ? importedMockBeers.slice(0, METAS.length)
  : []).map((beer, idx) => {
  const matchScore = 86 + (idx % 3) * 3;
  return {
    id: beer.id || `pick-${idx + 1}`,
    label: beer._raw?.style || beer.style || "Recommended",
    title: beer.name || beer.title || `Beer ${idx + 1}`,
    subtitle:
      beer._raw?.description || beer.brewery || beer._raw?.country || "",
    meta: METAS[idx],
    bottleImage: beer._raw?.bottleImage || beer.bottleImage,
    abv: beer._raw?.abv || beer.abv || "-",
    ibu: beer._raw?.ibu || "-",
    distance: `${(1.2 + idx * 0.8).toFixed(1)} km away`,
    flavorNotes: buildFlavorNotes(beer),
    matchScore,
    beer,
  };
});

const TRENDING_BREWERIES = [
  {
    id: "brew-1",
    logo: require('../assets/øresund-brewers.avif'),
    name: "Øresund Brewers",
    location: "Copenhagen, DK",
    highlight: "Weekly tap takeover & smørrebrød pairings",
  },
  {
    id: "brew-2",
    logo: require('../assets/jutland-barrelworks.avif'),
    name: "Jutland Barrelworks",
    location: "Aarhus, DK",
    highlight: "Sour and farmhouse saisons aged in oak",
  },
  {
    id: "brew-3",
    logo: require('../assets/funen-fermentary.avif'),
    name: "Funen Fermentary",
    location: "Odense, DK",
    highlight: "Rye-forward stouts and Nordic hops experiments",
  },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [statWidths, setStatWidths] = useState({});

  const firstName = useMemo(() => {
    if (user?.displayName && user.displayName.trim().length > 0) {
      return user.displayName.trim().split(" ")[0];
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "Explorer";
  }, [user?.displayName, user?.email]);

  return (
    <View style={HomeScreenStyle.safe}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={HomeScreenStyle.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={HomeScreenStyle.heroCard}>
          <View style={HomeScreenStyle.heroChip}>
            <Ionicons name="sparkles-outline" size={16} color={Colors.primary} />
            <Text style={HomeScreenStyle.heroChipText}>Fresh drop nearby</Text>
          </View>
          <Text style={HomeScreenStyle.heroTitle}>Hi {firstName}</Text>
          <Text style={HomeScreenStyle.heroSubtitle}>Discover pours tailored to tonight's plans.</Text>
          <View style={HomeScreenStyle.heroActions}>
            <TouchableOpacity style={HomeScreenStyle.heroActionPrimary} onPress={() => navigation.navigate('Search')}>
              <Ionicons name="search-outline" size={18} color={Colors.buttonText} />
              <Text style={HomeScreenStyle.heroActionPrimaryText}>Find a beer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={HomeScreenStyle.heroActionSecondary} onPress={() => Alert.alert('Log tasting', 'Logs tasting information.')}>
              <Ionicons name="create-outline" size={18} color={Colors.primary} />
              <Text style={HomeScreenStyle.heroActionSecondaryText}>Log tasting</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={HomeScreenStyle.offerCard}>
          <View style={HomeScreenStyle.offerBadge}>
            <Text style={HomeScreenStyle.offerBadgeText}>{OFFER_OF_WEEK.label}</Text>
          </View>
          <Text style={HomeScreenStyle.offerTitle}>{OFFER_OF_WEEK.name}</Text>
          <Text style={HomeScreenStyle.offerSubtitle}>{OFFER_OF_WEEK.blurb}</Text>
          <View style={HomeScreenStyle.offerFooter}>
            <Text style={HomeScreenStyle.offerMeta}>{OFFER_OF_WEEK.price}</Text>
            <TouchableOpacity
              style={HomeScreenStyle.offerButton}
              onPress={() => navigation.navigate('Selected Beer', { beer: OFFER_OF_WEEK.beer })}
            >
              <Text style={HomeScreenStyle.offerButtonText}>View details</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={HomeScreenStyle.curatedSection}>
          <View style={HomeScreenStyle.sectionHeader}>
            <Text style={HomeScreenStyle.sectionTitle}>Curated picks for you</Text>   
          </View>
          <FlatList
            horizontal
            data={CURATED_PICKS}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={HomeScreenStyle.curatedModernList}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  HomeScreenStyle.curatedCardModern,
                  index === 0 && HomeScreenStyle.curatedCardFeatured,
                ]}
                onPress={() => {
                  navigation.navigate('Selected Beer', { beer: item.beer || item });
                }}
              >
                <View style={HomeScreenStyle.curatedBadgeRow}>
                  <View style={HomeScreenStyle.curatedBadge}>
                    <Text style={HomeScreenStyle.curatedBadgeText}>{item.label}</Text>
                  </View>
                  <View style={HomeScreenStyle.curatedCTA}>
                    <Text style={HomeScreenStyle.curatedCTAText}>Open details</Text>
                    <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
                  </View>
                </View>
                <Text style={HomeScreenStyle.curatedModernTitle}>{item.title}</Text>
                <Text style={HomeScreenStyle.curatedModernSubtitle} numberOfLines={2}>
                  {item.subtitle}
                </Text>
                <View style={HomeScreenStyle.curatedStatsRow} onLayout={(e) => {
                  // save the width of the stats row so the footer can match it
                  const w = e.nativeEvent.layout.width;
                  setStatWidths((p) => ({ ...p, [item.id]: w }));
                }}>
                  <View style={HomeScreenStyle.curatedStat}>
                    <Text style={HomeScreenStyle.curatedStatValue}>{item.abv}</Text>
                    <Text style={HomeScreenStyle.curatedStatLabel}>ABV</Text>
                  </View>
                  <View style={HomeScreenStyle.curatedStat}>
                    <Text style={HomeScreenStyle.curatedStatValue}>{item.meta}</Text>
                    <Text style={HomeScreenStyle.curatedStatLabel}>Focus</Text>
                  </View>
                </View>
                <View style={[
                  HomeScreenStyle.curatedCardFooter,
                  statWidths[item.id] ? { width: statWidths[item.id] } : {}
                ]}>
                  <View style={HomeScreenStyle.curatedSommelier}>
                    <Ionicons name="person-outline" size={16} color={Colors.primary} />
                    <Text style={HomeScreenStyle.curatedSommelierText}>Sommelier match {item.matchScore}%</Text>
                  </View>
                </View>
                {item.bottleImage ? (
                  <Image source={item.bottleImage} style={HomeScreenStyle.curatedBottle} />
                ) : (
                  <View style={[HomeScreenStyle.curatedBottle, HomeScreenStyle.curatedBottleFallback]}>
                    <Ionicons name="beer-outline" size={28} color={Colors.primary} />
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        </View>

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
      </ScrollView>
    </View>
  );
}