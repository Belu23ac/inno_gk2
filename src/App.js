import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import HomeStack from "./stack/HomeStack";
import MapScreen from "./screens/MapScreen";
import ScanStack from "./stack/ScanStack";
import SearchStack from "./stack/SearchStack";
import SettingsStack from "./stack/SettingsStack";
import AuthStack from "./stack/AuthStack";
import { GlobalNavigation } from "./styles/GlobalNavigation";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Colors } from "./styles/Colors";

const Tab = createBottomTabNavigator();

// Main App Navigator Component
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary || "#007AFF"} />
      </View>
    );
  }

  // Allow users to access the app without authentication
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
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            // switch between filled and outline icons when focused
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Map") {
              iconName = focused ? "map" : "map-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (route.name === "Scan") {
              iconName = focused ? "scan" : "scan-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
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
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={SettingsStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Main App Component with Auth Provider
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background || "#fff",
  },
});
