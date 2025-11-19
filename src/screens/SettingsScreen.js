import { useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { ProfileScreenStyle } from "../styles/ProfileScreenStyle";
import {
  GuestView,
  HeroCard,
  StatsRow,
  ActionsGrid,
  InterestsCard,
  SupportCard,
} from "../components/settings/SettingsParts";

const INTEREST_TAGS = [
  "Hazy IPAs",
  "Barrel aged",
  "Low ABV",
  "Seasonal releases",
  "Local taps",
];

const SettingsScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const displayName = useMemo(
    () =>
      user?.displayName && user.displayName.trim().length > 0
        ? user.displayName.trim()
        : "Beer Explorer",
    [user?.displayName]
  );

  const email = user?.email ?? "Add your email";

  const initials = useMemo(() => {
    const source = displayName !== "Beer Explorer" ? displayName : email;
    if (!source) {
      return "BE";
    }
    return source
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
  }, [displayName, email]);

  const joinedDate = useMemo(() => {
    const creationTime = user?.metadata?.creationTime;
    if (!creationTime) {
      return "Just joined";
    }
    const date = new Date(creationTime);
    if (Number.isNaN(date.getTime())) {
      return "Just joined";
    }
    return date.toLocaleDateString();
  }, [user?.metadata?.creationTime]);

  const stats = useMemo(
    () => [
      { label: "Beers logged", value: user?.stats?.beersLogged ?? "23" },
      { label: "Favorites saved", value: user?.stats?.favorites ?? "8" },
      { label: "Breweries visited", value: user?.stats?.breweries ?? "5" },
    ],
    [user?.stats]
  );

  const handleEditProfile = () => navigation.navigate("User Profile");
  const handleAccountSettings = () => navigation.navigate("Account Settings");
  const handleFavorites = () => navigation.navigate("Favorites");
  const handleAppDetails = () => navigation.navigate("App Details");

  const handleSupport = () => {
    Alert.alert(
      "Support",
      "Send us a message at support@cervisia.app and we will get right back to you."
    );
  };

  const handleLogout = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          const result = await logout();
          if (!result.success) {
            Alert.alert(
              "Oops",
              "We could not sign you out. Try again in a moment."
            );
          }
        },
      },
    ]);
  };

  if (!user) {
    return (
      <View style={ProfileScreenStyle.safeArea}>
        <StatusBar style="light" />
        <GuestView navigation={navigation} />
      </View>
    );
  }

  return (
    <View style={ProfileScreenStyle.safeArea}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={ProfileScreenStyle.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeroCard initials={initials} displayName={displayName} email={email} joinedDate={joinedDate} />
        <StatsRow stats={stats} />
        <ActionsGrid
          navigation={navigation}
          handleEditProfile={handleEditProfile}
          handleAccountSettings={handleAccountSettings}
          handleFavorites={handleFavorites}
          handleAppDetails={handleAppDetails}
        />
        <InterestsCard />

        <SupportCard onSupport={handleSupport} onLogout={handleLogout} />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
