import { useMemo, useState } from "react";
import {
  View,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { HomeScreenStyle } from "../styles/HomeScreenStyle";
import HomeHero from "../components/home/HomeHero";
import OfferCard from "../components/home/OfferCard";
import CuratedSection from "../components/home/CuratedSection";
import TrendingSection from "../components/home/TrendingSection";

export default function HomeScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [statWidths, setStatWidths] = useState({});

  const firstName = useMemo(() => {
    if (user?.displayName && user.displayName.trim().length > 0) {
      return user.displayName.trim().split(" ")[0];
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "Explorer";
  }, [user?.displayName, user?.email]);

  return (
    <View style={HomeScreenStyle.safe}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={HomeScreenStyle.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHero firstName={firstName} navigation={navigation} />

        <OfferCard navigation={navigation} />

        <CuratedSection
          navigation={navigation}
          onStatsLayout={(e, item) => {
            const w = e.nativeEvent.layout.width;
            setStatWidths((p) => ({ ...p, [item.id]: w }));
          }}
        />

        <TrendingSection navigation={navigation} />
      </ScrollView>
    </View>
  );
}
