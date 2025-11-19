import { Text, View, ScrollView, Alert, Share } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { SelectedBeerScreenStyle as S } from '../../styles/SelectedBeerScreenStyle';
import BeerHeader from '../../components/beer/BeerHeader';
import BeerActions from '../../components/beer/BeerActions';
import { shareBeer as partsShareBeer } from '../../components/beer/SelectedBeerParts';
import ReviewsSection from '../../components/reviews/ReviewsSection';
 

function SelectedBeerScreen({ route }) {
  const { user } = useAuth();
  const { beer } = route.params;

  if (!beer) {
    return (
      <View style={S.container}>
        <Text>No beer selected</Text>
      </View>
    );
  }

  const onShare = () => partsShareBeer(beer);

  return (
    <ScrollView style={S.screen}>
      <View style={S.screenContent}>
            <BeerHeader beer={beer} />

        <BeerActions
          user={user}
          beer={beer}
          onShare={onShare}
        />

        <ReviewsSection beer={beer} user={user} />
      </View>
    </ScrollView>
  );
}

export default SelectedBeerScreen;
