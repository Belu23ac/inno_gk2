import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { HomeScreenStyle } from '../../styles/HomeScreenStyle';
import { Colors } from '../../styles/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as MockBeers from '../../hooks/MockBeers';

const importedMockBeers = MockBeers.SAMPLE_BEERS || MockBeers.default || [];

export const METAS = [
  'Citrus-forward',
  "Lina's pick",
  'Hop-forward',
  'Oak-aged',
  'New arrival',
];

export const CURATED_PICKS = (Array.isArray(importedMockBeers)
  ? importedMockBeers.slice(0, METAS.length)
  : []).map((beer, idx) => {
  const matchScore = 86 + (idx % 3) * 3;
  return {
    id: beer.id || `pick-${idx + 1}`,
    label: beer._raw?.style || beer.style || 'Recommended',
    title: beer.name || beer.title || `Beer ${idx + 1}`,
    subtitle: beer._raw?.description || beer.brewery || beer._raw?.country || '',
    meta: METAS[idx],
    bottleImage: beer._raw?.bottleImage || beer.bottleImage,
    abv: beer._raw?.abv || beer.abv || '-',
    ibu: beer._raw?.ibu || '-',
    distance: `${(1.2 + idx * 0.8).toFixed(1)} km away`,
    matchScore,
    beer,
  };
});

export function CuratedPickCard({ item, index, navigation, onStatsLayout }) {
  return (
    <TouchableOpacity
      style={[
        HomeScreenStyle.curatedCardModern,
        index === 0 && HomeScreenStyle.curatedCardFeatured,
      ]}
      onPress={() => navigation.navigate('Selected Beer', { beer: item.beer || item })}
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
      <Text style={HomeScreenStyle.curatedModernSubtitle} numberOfLines={2}>{item.subtitle}</Text>

      <View style={HomeScreenStyle.curatedStatsRow} onLayout={onStatsLayout}>
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
  );
}

export default function CuratedSection({ navigation, onStatsLayout }) {
  return (
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
          <CuratedPickCard
            item={item}
            index={index}
            navigation={navigation}
            onStatsLayout={(e) => onStatsLayout?.(e, item)}
          />
        )}
      />
    </View>
  );
}
