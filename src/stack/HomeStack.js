import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/StackScreens/FavoritesScreen';
import SelectedBeerScreen from '../screens/StackScreens/SelectedBeerScreen';
import { GlobalNavigation } from '../styles/GlobalNavigation';
import { Colors } from '../styles/Colors';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: GlobalNavigation.headerStyle,
        headerTitleStyle: GlobalNavigation.title,
        headerTintColor: GlobalNavigation.headerTintColor,
        cardStyle: { backgroundColor: Colors.transparent },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{ title: "Favorites" }}
      />
      <Stack.Screen
        name="Selected Beer"
        component={SelectedBeerScreen}
        options={{ title: "Beer Details" }}
      />
    </Stack.Navigator>
  );
}
