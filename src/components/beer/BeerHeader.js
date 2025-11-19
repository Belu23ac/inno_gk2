import { useMemo } from 'react';
import { Text, View, Image } from 'react-native';
import { SelectedBeerScreenStyle as S } from '../../styles/SelectedBeerScreenStyle';

export default function BeerHeader({ beer }){
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
      <View style={S.metaBox}>
        <View style={S.metaLeft}>
          <Text style={S.metaText}>Style: <Text style={S.metaSubText}>{displayStyle}</Text></Text>
          <Text style={S.metaText}>Region: <Text style={S.metaSubText}>{displayRegion}{displayCountry ? `, ${displayCountry}` : ""}</Text></Text>
        </View>
        <View style={S.metaRight}>
          <Text style={S.abvLabel}>ABV</Text>
          <Text style={S.abvValue}>{displayAbv}</Text>
        </View>
      </View>
      <Text style={S.descriptionText}>Description: {beer._raw?.description || "No description available"}</Text>
    </View>
  );
}
