import React, { useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useAuth } from "../contexts/AuthContext";
import { ProfileScreenStyle } from "../styles/ProfileScreenStyle";
import { Colors } from "../styles/Colors";

const FAVORITE_PREVIEW = [
  {
    id: "fav-1",
    name: "Cervisia IPA",
    style: "Hazy IPA",
    location: "Copenhagen, DK",
    rating: "4.7",
  },
  {
    id: "fav-2",
    name: "Nordic Pils",
    style: "Crisp Pilsner",
    location: "Aarhus, DK",
    rating: "4.5",
  },
  {
    id: "fav-3",
    name: "Arctic Stout",
    style: "Imperial Stout",
    location: "Aalborg, DK",
    rating: "4.8",
  },
];

const INTEREST_TAGS = [
  "Hazy IPAs",
  "Barrel aged",
  "Low ABV",
  "Seasonal releases",
  "Local taps",
];

const SettingsScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  // Hooks and derived values must run on every render to preserve hook order
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
      { label: "Beers logged", value: user?.stats?.beersLogged ?? "24" },
      { label: "Favorites saved", value: user?.stats?.favorites ?? "8" },
      { label: "Breweries visited", value: user?.stats?.breweries ?? "5" },
    ],
    [user?.stats]
  );

  // Handlers (always declared so hook order is stable)
  const handleEditProfile = () => navigation.navigate("User Profile");
  const handleAccountSettings = () => navigation.navigate("Account Settings");
  const handleFavorites = () => navigation.navigate("My Favorites");
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

  // If user is not logged in, show login prompt (render after hooks)
  if (!user) {
    return (
      <View style={ProfileScreenStyle.safeArea}>
        <StatusBar style="light" />
        <View style={ProfileScreenStyle.guestContainer}>
          <View style={ProfileScreenStyle.guestIcon}>
            <Ionicons name="person-outline" size={60} color={Colors.subtitle} />
          </View>
          <Text style={ProfileScreenStyle.guestTitle}>
            Sign in to unlock features
          </Text>
          <Text style={ProfileScreenStyle.guestText}>
            Create an account to save your favorite beers, track breweries
            you've visited, and personalize your beer discovery experience.
          </Text>
          <TouchableOpacity
            style={ProfileScreenStyle.guestButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={ProfileScreenStyle.guestButtonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ProfileScreenStyle.guestButtonSecondary}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={ProfileScreenStyle.guestButtonSecondaryText}>
              Create Account
            </Text>
          </TouchableOpacity>

        </View>
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
        <View style={ProfileScreenStyle.heroCard}>
          <View style={ProfileScreenStyle.heroOverlay} />
          <View style={ProfileScreenStyle.heroRow}>
            <View style={ProfileScreenStyle.avatar}>
              <Text style={ProfileScreenStyle.initials}>{initials}</Text>
            </View>
            <View style={ProfileScreenStyle.heroDetails}>
              <Text style={ProfileScreenStyle.heroName}>{displayName}</Text>
              <Text style={ProfileScreenStyle.heroEmail}>{email}</Text>
              <Text style={ProfileScreenStyle.heroMeta}>
                Member since {joinedDate}
              </Text>
            </View>
          </View>
          <View style={ProfileScreenStyle.badge}>
            <Text style={ProfileScreenStyle.badgeText}>
              Level 4 • Trailblazer
            </Text>
          </View>
        </View>

        <View style={ProfileScreenStyle.statsRow}>
          {stats.map((stat) => (
            <View key={stat.label} style={ProfileScreenStyle.statCard}>
              <Text style={ProfileScreenStyle.statLabel}>{stat.label}</Text>
              <Text style={ProfileScreenStyle.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        <View style={ProfileScreenStyle.actionGrid}>
          <TouchableOpacity
            style={ProfileScreenStyle.actionButton}
            onPress={handleEditProfile}
          >
            <View style={ProfileScreenStyle.actionLabelGroup}>
              <Text style={ProfileScreenStyle.actionLabel}>Edit profile</Text>
              <Text style={ProfileScreenStyle.actionSubtitle}>
                Update your bio and avatar
              </Text>
            </View>
            <View style={ProfileScreenStyle.actionIconContainer}>
              <Ionicons
                name="create-outline"
                size={22}
                color={Colors.buttonText}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={ProfileScreenStyle.actionButton}
            onPress={handleAccountSettings}
          >
            <View style={ProfileScreenStyle.actionLabelGroup}>
              <Text style={ProfileScreenStyle.actionLabel}>
                Account settings
              </Text>
              <Text style={ProfileScreenStyle.actionSubtitle}>
                Security & notifications
              </Text>
            </View>
            <View style={ProfileScreenStyle.actionIconContainer}>
              <Ionicons
                name="settings-outline"
                size={22}
                color={Colors.buttonText}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={ProfileScreenStyle.actionButton}
            onPress={handleFavorites}
          >
            <View style={ProfileScreenStyle.actionLabelGroup}>
              <Text style={ProfileScreenStyle.actionLabel}>My favorites</Text>
              <Text style={ProfileScreenStyle.actionSubtitle}>
                See saved beers & spots
              </Text>
            </View>
            <View
              style={[
                ProfileScreenStyle.actionIconContainer,
                { backgroundColor: Colors.favorite },
              ]}
            >
              <Ionicons name="heart-outline" size={22} color={Colors.black} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={ProfileScreenStyle.actionButton}
            onPress={handleAppDetails}
          >
            <View style={ProfileScreenStyle.actionLabelGroup}>
              <Text style={ProfileScreenStyle.actionLabel}>App details</Text>
              <Text style={ProfileScreenStyle.actionSubtitle}>
                Version notes & roadmap
              </Text>
            </View>
            <View
              style={[
                ProfileScreenStyle.actionIconContainer,
                { backgroundColor: Colors.accent },
              ]}
            >
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={Colors.black}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={ProfileScreenStyle.sectionCard}>
          <View style={ProfileScreenStyle.sectionHeaderRow}>
            <Text style={ProfileScreenStyle.sectionTitle}>My favorites</Text>
            <TouchableOpacity onPress={handleFavorites}>
              <Text style={ProfileScreenStyle.sectionAction}>See all</Text>
            </TouchableOpacity>
          </View>
          {FAVORITE_PREVIEW.map((item, index) => (
            <View
              key={item.id}
              style={[
                ProfileScreenStyle.favoriteItem,
                index === FAVORITE_PREVIEW.length - 1 &&
                  ProfileScreenStyle.favoriteItemLast,
              ]}
            >
              <View style={ProfileScreenStyle.favoriteIcon}>
                <Ionicons
                  name="sparkles-outline"
                  size={22}
                  color={Colors.black}
                />
              </View>
              <View style={ProfileScreenStyle.favoriteMeta}>
                <Text style={ProfileScreenStyle.favoriteName}>{item.name}</Text>
                <Text style={ProfileScreenStyle.favoriteDetails}>
                  {item.style} • {item.location} • {item.rating}★
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={ProfileScreenStyle.sectionCard}>
          <View style={ProfileScreenStyle.sectionHeaderRow}>
            <Text style={ProfileScreenStyle.sectionTitle}>Your interests</Text>
          </View>
          <View style={ProfileScreenStyle.chipRow}>
            {INTEREST_TAGS.map((chip) => (
              <View key={chip} style={ProfileScreenStyle.chip}>
                <Text style={ProfileScreenStyle.chipText}>{chip}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={ProfileScreenStyle.supportCard}>
          <Text style={ProfileScreenStyle.supportTitle}>Need a hand?</Text>
          <Text style={ProfileScreenStyle.supportText}>
            Reach out if you have questions about your account, data privacy, or
            the next beer recommendation. Our team typically replies within a
            day.
          </Text>
          <View style={ProfileScreenStyle.chipRow}>
            <TouchableOpacity
              style={ProfileScreenStyle.chip}
              onPress={handleSupport}
            >
              <Text style={ProfileScreenStyle.chipText}>Contact support</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={ProfileScreenStyle.chip}
              onPress={handleAppDetails}
            >
              <Text style={ProfileScreenStyle.chipText}>Release notes</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={ProfileScreenStyle.signOutButton}
            onPress={handleLogout}
          >
            <Text style={ProfileScreenStyle.signOutLabel}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
