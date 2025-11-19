import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HomeScreenStyle } from '../../styles/HomeScreenStyle';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/Colors';
import * as MockBeers from '../../hooks/MockBeers';

const importedMockBeers = MockBeers.SAMPLE_BEERS || MockBeers.default || [];

export const getRandomBeer = (beers) => {
  if (!Array.isArray(beers) || beers.length === 0) return null;
  const index = Math.floor(Math.random() * beers.length);
  return beers[index];
};

export const OFFER_BEER = getRandomBeer(importedMockBeers);
export const OFFER_BEER_2 = OFFER_BEER;
export const OFFER_OF_WEEK = {
  label: 'Offer of the week',
  name: OFFER_BEER?.name,
  blurb:
    OFFER_BEER?._raw?.description || OFFER_BEER?.blurb ||
    'Spruce tipped seasonal from Fjord & Foam. Pre-order and save 20%.',
  price: OFFER_BEER?.price || 'Member price 89 kr',
  beer: OFFER_BEER,
};

export default function OfferCard({ offer = OFFER_OF_WEEK, navigation }) {
  if (!offer) return null;
  return (
    <View style={HomeScreenStyle.offerCard}>
      <View style={HomeScreenStyle.offerBadge}>
        <Text style={HomeScreenStyle.offerBadgeText}>{offer.label}</Text>
      </View>
      <Text style={HomeScreenStyle.offerTitle}>{offer.name}</Text>
      <Text style={HomeScreenStyle.offerSubtitle}>{offer.blurb}</Text>
      <View style={HomeScreenStyle.offerFooter}>
        <Text style={HomeScreenStyle.offerMeta}>{offer.price}</Text>
        <TouchableOpacity
          style={HomeScreenStyle.offerButton}
          onPress={() => navigation.navigate('Selected Beer', { beer: offer.beer })}
        >
          <Text style={HomeScreenStyle.offerButtonText}>View details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
