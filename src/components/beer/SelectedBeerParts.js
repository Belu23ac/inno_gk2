import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Share, Alert } from 'react-native';
import { Colors } from '../../styles/Colors';
import { SelectedBeerScreenStyle as S } from '../../styles/SelectedBeerScreenStyle';
import { formatDate } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';

export function GuestLoginView() {
  const navigation = useNavigation();

  return (
    <View style={S.reviewGuestContainer}>
      <Ionicons name="person-circle" size={48} color={Colors.subtitle} />
      <Text style={S.reviewGuestTitle}>Log in to leave a review</Text>
      <Text style={S.reviewGuestText}>
        Sign in to share your beer rating and help others discover great brews.
      </Text>
      <TouchableOpacity
        style={S.reviewGuestButton}
        onPress={() => navigation.navigate('Profile', { screen: 'Login' })}
      >
        <Text style={S.reviewGuestButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={S.reviewGuestButtonSecondary}
        onPress={() => navigation.navigate('Profile', { screen: 'Register' })}
      >
        <Text style={S.reviewGuestButtonSecondaryText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

export function ReviewItem({ review }) {
  const stars = review.stars || review.reviewStars || 0;
  return (
    <View style={S.reviewCard}>
      <View style={S.reviewItem}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={`star-${review.id}-${star}`}
            name={
              stars >= star ? 'star' : stars >= star - 0.5 ? 'star-half' : 'star-outline'
            }
            size={20}
            color="gold"
          />
        ))}
      </View>

      <Text style={S.reviewAuthor}>{review.displayName || 'Anonymous'}</Text>
      <Text style={S.reviewText}>{review.text}</Text>
      <Text style={S.reviewDate}>{formatDate(review.createdAt)}</Text>
      </View>
    </View>
  );
}

export async function shareBeer(beer) {
  try {
    const message = `Check out this beer: ${beer.name}\n\nStyle: ${beer.style || 'Unknown Style'}\nABV: ${beer.abv || 'Unknown ABV'}\n\nDescription: ${beer._raw?.description || 'No description available'}\n\nLink: https://yourapp.com/beers/${beer.id}`;
    await Share.share({ message });
  } catch (error) {
    console.error('Error sharing beer:', error);
    Alert.alert('Error', 'Could not share the beer.');
  }
}
