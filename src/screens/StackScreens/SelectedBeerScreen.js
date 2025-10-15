import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, Image, TextInput, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { GlobalStyle } from "../../styles/GlobalStyle";
import { Colors } from "../../styles/Colors";
import { SelectedBeerScreenStyle as S } from "../../styles/SelectedBeerScreenStyle";

export default function SelectedBeerScreen({ route }) {
  const [reviews, setReviews] = React.useState([]);
  const [stars, setStars] = React.useState(0);
  const [comment, setComment] = React.useState("");
  // safely handle nested params coming from nested navigators
  const beer =
    route?.params?.beer ?? // normal case
    route?.params?.params?.beer ?? // nested params (as in your log)
    undefined;

  const raw = beer?._raw ?? {};
  const imageUrl = raw?.image || raw?.image_url || raw?.label || raw?.logo || raw?.photo || raw?.thumb || raw?.icon || null;

  const [imageLoading, setImageLoading] = React.useState(false);

  const resolveImageSource = (img) => {
    if (!img) return null;
    // already a module id (number) or object accepted by <Image>
    if (typeof img === 'number' || (typeof img === 'object' && img !== null && (img.uri || img.default))) return img;
    if (typeof img === 'string') {
      const s = img.trim();
      // remote, file or data URIs
      if (s.startsWith('http') || s.startsWith('file:') || s.startsWith('data:')) return { uri: s };
      // fallback: try as uri
      return { uri: s };
    }
    return null;
  };
  const resolvedImage = resolveImageSource(imageUrl);
  const info = [
    { label: 'Brewery', value: beer?.brewery },
    { label: 'ABV', value: beer?.abv },
    { label: 'Style', value: raw?.style || raw?.beer_style || raw?.type },
    { label: 'IBU', value: raw?.ibu },
    { label: 'Country', value: raw?.country || raw?.origin || raw?.location },
    { label: 'Category', value: raw?.category },
    { label: 'Description', value: raw?.description || raw?.desc },
  ].filter((row) => row.value != null && row.value !== '');

  const handleSubmitReview = () => {
    if (!stars || !comment.trim()) return;
    setReviews((prev) => [
      { id: String(Date.now()), user: 'You', stars, text: comment.trim() },
      ...prev,
    ]);
    setStars(0);
    setComment("");
  };

  return (
    <ScrollView contentContainerStyle={[GlobalStyle.content, S.container]}>
      {beer ? (
        <View style={S.card}>
          {resolvedImage ? (
            <View style={S.hero}>
              <Image
                source={resolvedImage}
                style={S.hero}
                resizeMode="cover"
                onLoadStart={() => setImageLoading(true)}
                onLoadEnd={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
              {imageLoading && (
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                  <ActivityIndicator size="large" color={Colors.primary} />
                </View>
              )}
            </View>
          ) : null}
          <Text style={S.title}>{beer.name}</Text>
          <View style={S.divider} />
          {info.map((row) => (
            <View key={row.label} style={S.row}>
              <Text style={S.label}>{row.label}:</Text>
              <Text style={S.value}>{String(row.value)}</Text>
            </View>
          ))}

          <View style={S.reviewCard}>
            <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 6 }}>Add a review</Text>
            <View style={S.starsRow}>
              {[1,2,3,4,5].map((i) => (
                <Pressable key={i} onPress={() => setStars(i)}>
                  <Text style={[S.star, { opacity: i <= stars ? 1 : 0.35 }]}>{i <= stars ? '★' : '☆'}</Text>
                </Pressable>
              ))}
            </View>
            <TextInput
              style={[S.input, { marginTop: 10 }]}
              placeholder="Write your review"
              multiline
              value={comment}
              onChangeText={setComment}
            />
            <Pressable style={S.submitBtn} onPress={handleSubmitReview}>
              <Text style={S.submitText}>Submit</Text>
            </Pressable>

          </View>

          <View style={S.reviewCard}>
            <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 6 }}>Reviews</Text>
            {reviews.length === 0 ? (
              <Text style={{ color: '#666' }}>no reviews yet</Text>
            ) : (
              reviews.map((r) => (
                <View key={r.id} style={S.reviewItem}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={S.reviewAuthor}>{r.user}</Text>
                    <Text style={{ color: '#f1c40f' }}>{'★'.repeat(r.stars) + '☆'.repeat(5 - r.stars)}</Text>
                  </View>
                  <Text style={S.reviewText}>{r.text}</Text>
                </View>
              ))
            )}
          </View>
        </View>
      ) : (
        <Text>No beer data provided.</Text>
      )}
      <StatusBar style="auto" />
    </ScrollView>
  );
}
