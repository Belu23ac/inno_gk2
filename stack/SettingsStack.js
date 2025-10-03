import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/SettingsScreen";
import UserProfileScreen from "../screens/StackScreens/UserProfileScreen";
import AppDetailsScreen from "../screens/StackScreens/AppDetailsScreen";
import { GlobalNavigation } from "../styles/GlobalNavigation";

const Stack = createStackNavigator();

export default function SettingsStackNavigation() {
  return (
    <Stack.Navigator
      // use a distinct route name for the inner stack's root to avoid
      // colliding with the Tab.Screen named "Settings"
      initialRouteName="SettingsMain"
      screenOptions={{
        headerStyle: GlobalNavigation.headerStyle,
        headerTitleStyle: GlobalNavigation.title,
        headerTintColor: GlobalNavigation.headerTintColor,
      }}
    >
      <Stack.Screen
        // internal route name (unique) — set a friendly title for the UI
        name="SettingsMain"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
      <Stack.Screen name="User Profile" component={UserProfileScreen} />
      <Stack.Screen name="App Details" component={AppDetailsScreen} />
    </Stack.Navigator>
  );
}
