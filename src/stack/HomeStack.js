import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/StackScreens/FavoritesScreen';
import SelectedBeerScreen from '../screens/StackScreens/SelectedBeerScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{ title: "My Favorites" }}
      />
      <Stack.Screen
        name="SelectedBeer"
        component={SelectedBeerScreen}
        options={{ title: "Beer Details" }}
      />
    </Stack.Navigator>
  );
}
