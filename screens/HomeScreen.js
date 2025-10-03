import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GlobalStyle } from "../styles/GlobalStyle";

const MOCK_FEED = [
  {
    id: "1",
    user: {
      name: "Mikael Doe",
      avatar: "https://ui-avatars.com/api/?name=Mikael+Doe",
    },
    brewery: "Nordic Brew Co.",
    beer: "Hazy IPA",
    rating: 4,
    review: "Citrus on the nose, smooth mouthfeel. Would have again.",
    time: "2h",
  },
  {
    id: "2",
    user: {
      name: "William Parker",
      avatar: "https://ui-avatars.com/api/?name=William+Parker",
    },
    brewery: "Harbor Brewery",
    beer: "Stout Reserve",
    rating: 5,
    review: "Chocolate and coffee notes, full body. Top notch.",
    time: "6h",
  },
  {
    id: "3",
    user: {
      name: "Sofia Weston",
      avatar: "https://ui-avatars.com/api/?name=Sofia+Weston",
    },
    brewery: "Mountain Ales",
    beer: "Pilsner Classic",
    rating: 3,
    review: "Light and crisp but a little too bitter for my taste.",
    time: "1d",
  },
  {
    id: "4",
    user: {
      name: "Liam Smith",
      avatar: "https://ui-avatars.com/api/?name=Liam+Smith",
    },
    brewery: "City Brew Works",
    beer: "West Coast IPA",
    rating: 4,
    review: "Classic West Coast flavors, piney and resinous.",
    time: "2d",
  },
];

function Stars({ value = 0, max = 5 }) {
  const filled = "★";
  const empty = "☆";
  const stars = [];
  for (let i = 0; i < max; i++) {
    stars.push(
      <Text
        key={i}
        style={[GlobalStyle.star, i < value ? GlobalStyle.starFilled : GlobalStyle.starEmpty]}
      >
        {i < value ? filled : empty}
      </Text>
    );
  }
  return <View style={GlobalStyle.starsRow}>{stars}</View>;
}

function FeedItem({ item }) {
  return (
    <View style={GlobalStyle.card}>
      <View style={GlobalStyle.headerRow}>
        <Image source={{ uri: item.user.avatar }} style={GlobalStyle.avatar} />
        <View style={GlobalStyle.headerText}>
          <Text style={GlobalStyle.username}>{item.user.name}</Text>
          <Text style={GlobalStyle.time}>{item.time}</Text>
        </View>
      </View>

      <View style={GlobalStyle.body}>
        <Text style={GlobalStyle.beerName}>{item.beer}</Text>
        <Text style={GlobalStyle.breweryName}>{item.brewery}</Text>
        <Stars value={item.rating} />
        <Text style={GlobalStyle.review}>{item.review}</Text>
      </View>

      <View style={GlobalStyle.actionsRow}>
        <TouchableOpacity style={GlobalStyle.actionButton}>
          <Text style={GlobalStyle.actionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={GlobalStyle.actionButton}>
          <Text style={GlobalStyle.actionText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [feed, setFeed] = useState(MOCK_FEED);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate reloading feed. Replace this with an API call.
    setTimeout(() => {
      // Example: prepend a new mock post to simulate new activity
      const newPost = {
        id: Date.now().toString(),
        user: {
          name: "Alice Bryan",
          avatar: "https://ui-avatars.com/api/?name=Alice+Bryan",
        },
        brewery: "Sunset Brewery",
        beer: "Summer Session",
        rating: 4,
        review: "Perfect lawn mowing beer.",
        time: "now",
      };
      setFeed((prev) => [newPost, ...prev]);
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={[GlobalStyle.safe]}>
      <View style={GlobalStyle.titleRow}>
        <Text style={GlobalStyle.titleHome}>Following Feed</Text>
        <Text style={GlobalStyle.subtitle}>Updates from people you follow</Text>
      </View>

      <FlatList
        data={feed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeedItem item={item} />}
        contentContainerStyle={GlobalStyle.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}