import { createStackNavigator } from "@react-navigation/stack";
import ScanScreen from "../screens/ScanScreen";
import SelectedBeerScreen from "../screens/StackScreens/SelectedBeerScreen";
import { GlobalNavigation } from "../styles/GlobalNavigation";

const Stack = createStackNavigator();

export default function ScanStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="ScanMain"
      screenOptions={{
        headerStyle: GlobalNavigation.headerStyle,
        headerTitleStyle: GlobalNavigation.title,
        headerTintColor: GlobalNavigation.headerTintColor,
      }}
    >
      <Stack.Screen
        // internal route name (unique) — set a friendly title for the UI
        name="ScanMain"
        component={ScanScreen}
        options={{ title: "Scan" }}
      />
      <Stack.Screen name="Selected Beer" component={SelectedBeerScreen} />
    </Stack.Navigator>
  );
}