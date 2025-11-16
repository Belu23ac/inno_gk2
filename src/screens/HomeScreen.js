import React, { useMemo } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { HomeScreenStyle } from "../styles/HomeScreenStyle";
import { Colors } from "../styles/Colors";
import auroraImage from "../assets/aurora-borealis.png";
const importedMockBeers = require("../contexts/MockBeers");

const OFFER_OF_WEEK = {
  label: "Offer of the week",
  name: "Aurora Borealis Triple IPA",
  blurb: "Spruce tipped seasonal from Fjord & Foam. Pre-order and save 20%.",
  price: "Member price 89 kr",
  beer: {
    name: "Aurora Borealis Triple IPA",
    brewery: "Fjord & Foam",
    abv: "9.5%",
    _raw: {
      style: "Triple IPA",
      ibu: "75",
      country: "Denmark",
      category: "Craft Beer",
      description: "Spruce tipped seasonal from Fjord & Foam. Pre-order and save 20%. A bold, hoppy triple IPA with notes of pine and citrus.",
      image: auroraImage
    }
  }
};

// load mock beers (use require so this can sit inside the file)
const mockBeers = importedMockBeers?.default || importedMockBeers || [];

// keep original meta values and map them onto the first beers from mockBeers
const METAS = ["5 bottles", "Curated by Lina", "6 picks", "Brewed 2 km away"];

const CURATED_PICKS = (Array.isArray(mockBeers) ? mockBeers.slice(0, METAS.length) : []).map((beer, idx) => ({
  id: beer.id || `pick-${idx + 1}`,
  label: beer._raw?.style || beer.style || "Recommended",
  title: beer.name || beer.title || `Beer ${idx + 1}`,
  subtitle: beer._raw?.description || beer.brewery || beer._raw?.country || "",
  meta: METAS[idx],
  // keep a reference to the original/full beer object so detail screens receive complete data
  beer,
}));

const TRENDING_BREWERIES = [
  {
    id: "brew-1",
    name: "Øresund Brewers",
    location: "Copenhagen, DK",
    highlight: "4.9 rating • weekly tap takeover & smørrebrød pairings",
  },
  {
    id: "brew-2",
    name: "Jutland Barrelworks",
    location: "Aarhus, DK",
    highlight: "Sour and farmhouse saisons aged in oak",
  },
  {
    id: "brew-3",
    name: "Funen Fermentary",
    location: "Odense, DK",
    highlight: "Rye-forward stouts and Nordic hops experiments",
  },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();

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

        <View style={HomeScreenStyle.section}>
          <View style={HomeScreenStyle.sectionHeader}>
            <Text style={HomeScreenStyle.sectionTitle}>Curated picks for you</Text>   
          </View>
          <FlatList
            horizontal
            data={CURATED_PICKS}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={HomeScreenStyle.horizontalList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={HomeScreenStyle.curatedCard}
                onPress={() => {
                  // pass the original/full beer object when available (fallback to item)
                  navigation.navigate('Selected Beer', { beer: item.beer || item });
                }}
              >
                <Text style={HomeScreenStyle.curatedLabel}>{item.label}</Text>
                <Text style={HomeScreenStyle.curatedTitle}>{item.title}</Text>
                <Text style={HomeScreenStyle.curatedSubtitle}>{item.subtitle}</Text>
                <View style={HomeScreenStyle.curatedFooter}>
                  <Text style={HomeScreenStyle.curatedMeta}>{item.meta}</Text>
                  <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
                </View>
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
              <View style={HomeScreenStyle.trendingHeader}>
                <Ionicons name="location-outline" size={18} color={Colors.primary} />
                <Text style={HomeScreenStyle.trendingName}>{brewery.name}</Text>
              </View>
              <Text style={HomeScreenStyle.trendingLocation}>{brewery.location}</Text>
              <Text style={HomeScreenStyle.trendingHighlight}>{brewery.highlight}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}