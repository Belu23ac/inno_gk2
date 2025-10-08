import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@react-native-vector-icons/ionicons";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
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
              iconName = "home-outline";
            } else if (route.name === "Map") {
              iconName = "map-outline";
            } else if (route.name === "Search") {
              iconName = "search-outline";
            } else if (route.name === "Profile") {
              iconName = "person-circle-outline";
            } else if (route.name === "Scan") {
              iconName = "scan-outline";
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
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen
          name="Profile"
          component={SettingsStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
