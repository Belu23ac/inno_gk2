import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import ButtonComponent from '../components/ButtonComponents';
import { GlobalStyle } from '../styles/GlobalStyle';

const navController = (navigation, route) => {
    navigation.navigate(route);
};

export default function SettingsScreen({ navigation }) {
    return (
        <View style={[GlobalStyle.container, GlobalStyle.screen]}>
            <Text style={GlobalStyle.header}>Settings</Text>
            <Text style={GlobalStyle.description}>Manage your account and app preferences</Text>

            <View style={GlobalStyle.card}>
                <ButtonComponent onPress={() => navController(navigation, 'User Profile')} title="User Profile" />
                <View style={GlobalStyle.gap} />
                <ButtonComponent onPress={() => navController(navigation, 'App Details')} title="App Details" />
            </View>

            <StatusBar style="auto" />
        </View>
    );
}
