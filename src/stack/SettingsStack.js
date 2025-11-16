import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';
import UserProfileScreen from '../screens/StackScreens/UserProfileScreen';
import AppDetailsScreen from '../screens/StackScreens/AppDetailsScreen';
import AccountSettingsScreen from '../screens/StackScreens/AccountSettingsScreen';
import FavoritesScreen from '../screens/StackScreens/FavoritesScreen';
import SelectedBeerScreen from '../screens/StackScreens/SelectedBeerScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { GlobalNavigation } from '../styles/GlobalNavigation';

const Stack = createStackNavigator();

export default function SettingsStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="SettingsMain"
      screenOptions={{
        headerStyle: GlobalNavigation.headerStyle,
        headerTitleStyle: GlobalNavigation.title,
        headerTintColor: GlobalNavigation.headerTintColor,
      }}
    >
      <Stack.Screen name="SettingsMain" component={SettingsScreen} options={{ title: "Profile" }} />
      <Stack.Screen name="User Profile" component={UserProfileScreen} />
      <Stack.Screen name="Account Settings" component={AccountSettingsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="SelectedBeer" component={SelectedBeerScreen} options={{ title: "Beer Details" }} />
      <Stack.Screen name="App Details" component={AppDetailsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Sign In" }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Create Account" }} />
    </Stack.Navigator>
  );
}
