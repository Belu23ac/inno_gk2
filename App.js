import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@react-native-vector-icons/ionicons";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import ScanStack from "./stack/ScanStack";
import SearchStack from "./stack/SearchStack";
import SettingsStack from "./stack/SettingsStack";
import { GlobalNavigation } from "./styles/GlobalNavigation";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          unmountOnBlur: true,
          headerStyle: GlobalNavigation.headerStyle,
          headerTitleStyle: GlobalNavigation.title,
          tabBarStyle: GlobalNavigation.tabBarStyle,
          tabBarActiveTintColor: GlobalNavigation.tabBarActiveTintColor,
          tabBarInactiveTintColor: GlobalNavigation.tabBarInactiveTintColor,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Details") {
              iconName = "list";
            } else if (route.name === "Search") {
              iconName = "search";
            } else if (route.name === "Settings") {
              iconName = "settings";
            } else if (route.name === "Scan") {
              iconName = "scan";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="Search"
          component={SearchStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Scan"
          component={ScanStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Details" component={DetailsScreen} />
        <Tab.Screen
          name="Settings"
          component={SettingsStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
