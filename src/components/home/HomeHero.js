import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreenStyle } from '../../styles/HomeScreenStyle';
import { Colors } from '../../styles/Colors';
import { OFFER_OF_WEEK as DEFAULT_OFFER, OFFER_BEER_2 as DEFAULT_OFFER_BEER_2 } from './OfferCard';

export default function HomeHero({ firstName, navigation, offerOfWeek = DEFAULT_OFFER, offerBeer2 = DEFAULT_OFFER_BEER_2 }) {
  return (
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
        <TouchableOpacity style={[HomeScreenStyle.heroActionSecondary, { paddingHorizontal: 14 }]} onPress={() => navigation.navigate('Scan')}>
          <Ionicons name="scan-outline" size={18} color={Colors.primary} />
          <Text style={HomeScreenStyle.heroActionSecondaryText}>Scan beer</Text>
        </TouchableOpacity>
      </View>

      {offerOfWeek?.beer && (
        <>
          <Image
            source={offerOfWeek.beer?._raw?.bottleImage || offerOfWeek.beer?.bottleImage}
            style={HomeScreenStyle.heroBottleLeft}
            pointerEvents="none"
          />
          <Image
            source={offerOfWeek.beer?._raw?.bottleImage || offerOfWeek.beer?.bottleImage}
            style={HomeScreenStyle.heroBottleRight}
            pointerEvents="none"
          />
        </>
      )}
    </View>
  );
}
