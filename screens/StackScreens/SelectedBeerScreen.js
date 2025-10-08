import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { GlobalStyle } from "../../styles/GlobalStyle";

export default function SelectedBeerScreen({ route }) {
  // safely handle nested params coming from nested navigators
  const beer =
    route?.params?.beer ?? // normal case
    route?.params?.params?.beer ?? // nested params (as in your log)
    undefined;

  const reviews = [
    { id: '1', user: 'Mikael Doe', rating: 5, text: 'Fantastic aroma and finish.' },
    { id: '2', user: 'William Parker', rating: 4, text: 'Very drinkable, a touch bitter.' },
    { id: '3', user: 'Sofia Weston', rating: 3, text: 'Decent but a bit flat for me.' },
    { id: '4', user: 'Liam Smith', rating: 4, text: 'Great balance of flavors.' },
  ];

  return (
    <View style={GlobalStyle.container}>
      {beer ? (
        <View>
          <Text>Name: {beer.name}</Text>
          <Text>Brewery: {beer.brewery}</Text>
          {(() => {
            const rating = Math.floor(Math.random() * 5) + 1;
            const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
            return (
              <Text style={{ marginTop: 8 }}>
                Rating:{' '}
                <Text style={{ color: '#f1c40f' }}>{stars}</Text>
              </Text>
            );
          })()}
          {/* Render other beer details here */}
        </View>
      ) : (
        <Text>No beer data provided.</Text>
      )}

      <View
        style={{
          marginTop: 20,
          backgroundColor: '#fff',
          padding: 12,
          borderRadius: 8,
          boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.08)`,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Reviews</Text>

        {reviews.map((r) => (
          <View
            key={r.id}
            style={{
              paddingVertical: 8,
              borderTopWidth: r.id === '1' ? 0 : 1,
              borderTopColor: '#eee',
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontWeight: '600' }}>{r.user}</Text>
              <Text style={{ color: '#f1c40f' }}>{'★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)}</Text>
            </View>
            <Text style={{ color: '#444', marginTop: 4 }}>{r.text}</Text>
          </View>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
