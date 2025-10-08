import { Text, View } from "react-native";
import { GlobalStyle } from "../styles/GlobalStyle";

export default function MapScreen() {
  return (
    <View style={GlobalStyle.container}>
      <Text style={GlobalStyle.header}>Ravn lav din fucking map</Text>
    </View>
  );
}
