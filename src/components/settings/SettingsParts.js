import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProfileScreenStyle } from "../../styles/ProfileScreenStyle";
import { Colors } from "../../styles/Colors";

const INTEREST_TAGS = [
  "Hazy IPAs",
  "Barrel aged",
  "Low ABV",
  "Seasonal releases",
  "Local taps",
];

export const GuestView = ({ navigation }) => (
  <View style={ProfileScreenStyle.safeArea}>
    <View style={ProfileScreenStyle.guestContainer}>
      <View style={ProfileScreenStyle.guestIcon}>
        <Ionicons name="person-outline" size={60} color={Colors.subtitle} />
      </View>
      <Text style={ProfileScreenStyle.guestTitle}>Sign in to unlock features</Text>
      <Text style={ProfileScreenStyle.guestText}>
        Create an account to save your favorite beers, track breweries you've
        visited, and personalize your beer discovery experience.
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
        <Text style={ProfileScreenStyle.guestButtonSecondaryText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export const HeroCard = ({ initials, displayName, email, joinedDate }) => (
  <View style={ProfileScreenStyle.heroCard}>
    <View style={ProfileScreenStyle.heroOverlay} />
    <View style={ProfileScreenStyle.heroRow}>
      <View style={ProfileScreenStyle.avatar}>
        <Text style={ProfileScreenStyle.initials}>{initials}</Text>
      </View>
      <View style={ProfileScreenStyle.heroDetails}>
        <Text style={ProfileScreenStyle.heroName}>{displayName}</Text>
        <Text style={ProfileScreenStyle.heroEmail}>{email}</Text>
        <Text style={ProfileScreenStyle.heroMeta}>Member since {joinedDate}</Text>
      </View>
    </View>
    <View style={ProfileScreenStyle.badge}>
      <Text style={ProfileScreenStyle.badgeText}>Level 4 • Trailblazer</Text>
    </View>
  </View>
);

export const StatsRow = ({ stats }) => (
  <View style={ProfileScreenStyle.statsRow}>
    {stats.map((stat) => (
      <View key={stat.label} style={ProfileScreenStyle.statCard}>
        <Text style={ProfileScreenStyle.statLabel}>{stat.label}</Text>
        <Text style={ProfileScreenStyle.statValue}>{stat.value}</Text>
      </View>
    ))}
  </View>
);

const ActionItem = ({ onPress, icon, title, subtitle, backgroundColor }) => (
  <TouchableOpacity style={ProfileScreenStyle.actionButton} onPress={onPress}>
    <View style={ProfileScreenStyle.actionLabelGroup}>
      <Text style={ProfileScreenStyle.actionLabel}>{title}</Text>
      <Text style={ProfileScreenStyle.actionSubtitle}>{subtitle}</Text>
    </View>
    <View
      style={[
        ProfileScreenStyle.actionIconContainer,
        backgroundColor ? { backgroundColor } : {},
      ]}
    >
      <Ionicons name={icon} size={22} color={Colors.buttonText} />
    </View>
  </TouchableOpacity>
);

export const ActionsGrid = ({ navigation, handleFavorites, handleAppDetails, handleAccountSettings, handleEditProfile }) => (
  <View style={ProfileScreenStyle.actionGrid}>
    <ActionItem
      onPress={handleEditProfile}
      icon="create-outline"
      title="Edit profile"
      subtitle="Update your bio and avatar"
    />

    <ActionItem
      onPress={handleAccountSettings}
      icon="settings-outline"
      title="Account settings"
      subtitle="Security & notifications"
    />

    <ActionItem
      onPress={handleFavorites}
      icon="heart-outline"
      title="Favorites"
      subtitle="See saved beers & spots"
      backgroundColor={Colors.favorite}
    />

    <ActionItem
      onPress={handleAppDetails}
      icon="information-circle-outline"
      title="App details"
      subtitle="Version notes & roadmap"
      backgroundColor={Colors.accent}
    />
  </View>
);

export const InterestsCard = () => (
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
);

export const SupportCard = ({ onSupport, onLogout }) => (
  <View style={ProfileScreenStyle.supportCard}>
    <Text style={ProfileScreenStyle.supportTitle}>Need a hand?</Text>
    <Text style={ProfileScreenStyle.supportText}>
      Reach out if you have questions about your account, data privacy, or the
      next beer recommendation. Our team typically replies within a day.
    </Text>
    <View style={ProfileScreenStyle.chipRow}>
      <TouchableOpacity style={ProfileScreenStyle.chip} onPress={onSupport}>
        <Text style={ProfileScreenStyle.chipText}>Contact support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ProfileScreenStyle.chip} onPress={onSupport}>
        <Text style={ProfileScreenStyle.chipText}>Release notes</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={ProfileScreenStyle.signOutButton} onPress={onLogout}>
      <Text style={ProfileScreenStyle.signOutLabel}>Sign out</Text>
    </TouchableOpacity>
  </View>
);
