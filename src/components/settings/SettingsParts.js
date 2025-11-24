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
    <View style={ProfileScreenStyle.heroContent}>
      <View style={ProfileScreenStyle.avatar}>
        <Text style={ProfileScreenStyle.initials}>{initials}</Text>
      </View>
      <View style={ProfileScreenStyle.heroDetails}>
        <Text style={ProfileScreenStyle.heroName}>{displayName}</Text>
        <Text style={ProfileScreenStyle.heroEmail}>{email}</Text>
        <View style={ProfileScreenStyle.heroMetaRow}>
          <Ionicons name="calendar-outline" size={14} color={Colors.subtitle} />
          <Text style={ProfileScreenStyle.heroMeta}>Joined {joinedDate}</Text>
        </View>
      </View>
    </View>
  </View>
);

export const StatsRow = ({ stats, handleReviews, handleFavorites }) => (
  <View style={ProfileScreenStyle.statsRow}>
    <TouchableOpacity 
      style={ProfileScreenStyle.statActionButton}
      onPress={handleReviews}
      activeOpacity={0.7}
    >
      <View style={[ProfileScreenStyle.actionIconContainer, { backgroundColor: Colors.primary }]}>
        <Ionicons name="beer" size={24} color={Colors.buttonText} />
      </View>
      <View style={ProfileScreenStyle.actionContent}>
        <Text style={ProfileScreenStyle.actionLabel}>Beers reviewed</Text>
        <Text style={ProfileScreenStyle.actionSubtitle}>{stats[0].value} {stats[0].value === 1 ? 'review' : 'reviews'}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.subtitle} />
    </TouchableOpacity>

    <TouchableOpacity 
      style={ProfileScreenStyle.statActionButton}
      onPress={handleFavorites}
      activeOpacity={0.7}
    >
      <View style={[ProfileScreenStyle.actionIconContainer, { backgroundColor: '#ff3b30' }]}>
        <Ionicons name="heart" size={24} color={Colors.buttonText} />
      </View>
      <View style={ProfileScreenStyle.actionContent}>
        <Text style={ProfileScreenStyle.actionLabel}>Favorites</Text>
        <Text style={ProfileScreenStyle.actionSubtitle}>{stats[1].value} saved {stats[1].value === 1 ? 'beer' : 'beers'}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.subtitle} />
    </TouchableOpacity>
  </View>
);

const ActionItem = ({ onPress, icon, title, subtitle, backgroundColor }) => (
  <TouchableOpacity style={ProfileScreenStyle.actionButton} onPress={onPress}>
    <View
      style={[
        ProfileScreenStyle.actionIconContainer,
        backgroundColor ? { backgroundColor } : {},
      ]}
    >
      <Ionicons name={icon} size={24} color={Colors.buttonText} />
    </View>
    <View style={ProfileScreenStyle.actionContent}>
      <Text style={ProfileScreenStyle.actionLabel}>{title}</Text>
      <Text style={ProfileScreenStyle.actionSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color={Colors.subtitle} />
  </TouchableOpacity>
);

export const ActionsGrid = ({ navigation, handleAppDetails, handleAccountSettings }) => (
  <View style={ProfileScreenStyle.actionGrid}>
    <ActionItem
      onPress={handleAccountSettings}
      icon="settings-outline"
      title="Account settings"
      subtitle="Profile & notifications"
      backgroundColor="#1e3a5f"
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

export const SignOutButton = ({ onLogout }) => (
  <TouchableOpacity style={ProfileScreenStyle.signOutButton} onPress={onLogout}>
    <Ionicons name="log-out-outline" size={20} color={Colors.buttonText} />
    <Text style={ProfileScreenStyle.signOutLabel}>Sign out</Text>
  </TouchableOpacity>
);

export const SupportCard = ({ onSupport }) => (
  <View style={ProfileScreenStyle.supportCard}>
    <View style={ProfileScreenStyle.supportHeader}>
      <Ionicons name="help-circle-outline" size={24} color={Colors.primary} />
      <Text style={ProfileScreenStyle.supportTitle}>Need help?</Text>
    </View>
    <Text style={ProfileScreenStyle.supportText}>
      Have questions or feedback? We're here to help with any issues or suggestions.
    </Text>
    <TouchableOpacity style={ProfileScreenStyle.supportButton} onPress={onSupport}>
      <Ionicons name="mail-outline" size={20} color={Colors.buttonText} />
      <Text style={ProfileScreenStyle.supportButtonText}>Contact Support</Text>
    </TouchableOpacity>
  </View>
);
