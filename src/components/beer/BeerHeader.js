import { useMemo } from 'react';
import { Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SelectedBeerScreenStyle as S } from '../../styles/SelectedBeerScreenStyle';
import { Colors } from '../../styles/Colors';

export default function BeerHeader({ beer, averageRating, price, reviewCount }){
  const displayStyle =
    beer.sub_category_1 ||
    beer.style ||
    beer._raw?.style ||
    beer._raw?.category ||
    'Unknown Style';

  const displayRegion =
    beer.region || beer._raw?.region || beer._raw?.country || 'Unknown Region';

  const displayAbv =
    beer.abv || beer._raw?.abv || beer._raw?.abv_percent || 'Unknown ABV';

  const displayCountry = beer.country || beer._raw?.country || 'Unknown Country';

  const imageSource = useMemo(() => {
    const rawImage = beer.image || beer._raw?.image;
    const placeholder = require('../../assets/generic.avif');

    if (!rawImage) return placeholder;
    if (typeof rawImage === 'string') return { uri: rawImage };
    return rawImage;
  }, [beer]);
  return (
    <View style={S.detailsCard}>
      <View style={S.imageWrapper}>
        <Image source={imageSource} style={S.beerImage} />
      </View>
      <Text style={S.beerName}>{beer.name}</Text>
      
      {/* Rating and Price Cards */}
      <View style={S.statsGrid}>
        <View style={S.statCard}>
          <View style={S.statIconRow}>
            <Ionicons name="star" size={24} color={Colors.starYellow} />
          </View>
          <Text style={S.statValue}>
            {averageRating > 0 ? averageRating.toFixed(1) : '—'}
          </Text>
          <Text style={S.statLabel}>
            {averageRating > 0 && reviewCount > 0 
              ? `${reviewCount} ${reviewCount === 1 ? 'rating' : 'ratings'}` 
              : 'No ratings yet'}
          </Text>
        </View>
        
        <View style={S.statCard}>
          <View style={S.statIconRow}>
            <Ionicons name="cash-outline" size={24} color={Colors.primary} />
          </View>
          <Text style={S.statValue}>{price}</Text>
          <Text style={S.statLabel}>DKK</Text>
        </View>

        <View style={S.statCard}>
          <View style={S.statIconRow}>
            <Ionicons name="water-outline" size={24} color={Colors.accent} />
          </View>
          <Text style={S.statValue}>{displayAbv}</Text>
          <Text style={S.statLabel}>ABV</Text>
        </View>
      </View>

      {/* Style & Region Info */}
      <View style={S.infoSection}>
        <View style={S.infoRow}>
          <View style={S.infoItem}>
            <Ionicons name="beer-outline" size={18} color={Colors.primary} />
            <View style={S.infoTextContainer}>
              <Text style={S.infoLabel}>Style</Text>
              <Text style={S.infoValue}>{displayStyle}</Text>
            </View>
          </View>
        </View>
        
        <View style={[S.infoRow, S.infoRowLast]}>
          <View style={S.infoItem}>
            <Ionicons name="location-outline" size={18} color={Colors.primary} />
            <View style={S.infoTextContainer}>
              <Text style={S.infoLabel}>Origin</Text>
              <Text style={S.infoValue}>{displayRegion}{displayCountry ? `, ${displayCountry}` : ""}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Description */}
      {beer._raw?.description && (
        <View style={S.descriptionSection}>
          <View style={S.descriptionHeader}>
            <Ionicons name="document-text-outline" size={18} color={Colors.subtitle} />
            <Text style={S.descriptionTitle}>About this beer</Text>
          </View>
          <Text style={S.descriptionText}>{beer._raw.description}</Text>
        </View>
      )}
    </View>
  );
}
