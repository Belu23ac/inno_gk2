import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SelectedBeerScreen from "../screens/StackScreens/SelectedBeerScreen";
import { GlobalNavigation } from "../styles/GlobalNavigation";

const Stack = createStackNavigator();

export default function HomeStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{
        headerStyle: GlobalNavigation.headerStyle,
        headerTitleStyle: GlobalNavigation.title,
        headerTintColor: GlobalNavigation.headerTintColor,
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen name="Selected Beer" component={SelectedBeerScreen} />
    </Stack.Navigator>
  );
}