import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen";
import SelectedBeerScreen from "../screens/StackScreens/SelectedBeerScreen";
import { GlobalNavigation } from "../styles/GlobalNavigation";

const Stack = createStackNavigator();

export default function SearchStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="SearchMain"
      screenOptions={{
        headerStyle: GlobalNavigation.headerStyle,
        headerTitleStyle: GlobalNavigation.title,
        headerTintColor: GlobalNavigation.headerTintColor,
      }}
    >
      <Stack.Screen
        // internal route name (unique) — set a friendly title for the UI
        name="SearchMain"
        component={SearchScreen}
        options={{ title: "Search" }}
      />
      <Stack.Screen name="Selected Beer" component={SelectedBeerScreen} />
    </Stack.Navigator>
  );
}