import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SearchScreenStyle } from '../../styles/SearchScreenStyle';

export default function ResultsList({ results, showEmptyState, navigation }){
  const handlePress = (beer) => navigation.navigate('Selected Beer', { beer });

  return (
    <View style={[SearchScreenStyle.searchCard, SearchScreenStyle.resultsCard]}>
      <Text style={SearchScreenStyle.searchTitle}>Results</Text>
      <View style={SearchScreenStyle.resultsList}>
        {results.map((beer) => (
          <Pressable
            key={beer.id}
            onPress={() => handlePress(beer)}
            style={({ pressed }) => [SearchScreenStyle.resultCard, pressed && { opacity: 0.9 }]}
          >
            <Text style={SearchScreenStyle.resultTitle} numberOfLines={1} ellipsizeMode="tail">{beer.name}</Text>
            <View style={SearchScreenStyle.resultMetaRow}>
              <View style={SearchScreenStyle.badge}><Text style={SearchScreenStyle.badgeText}>BEER</Text></View>
              <Text style={SearchScreenStyle.resultMeta} numberOfLines={1} ellipsizeMode="tail">{beer.brewery} • {beer.abv}</Text>
            </View>
          </Pressable>
        ))}
        {showEmptyState && (
          <View style={SearchScreenStyle.emptyState}>
            <Text style={SearchScreenStyle.emptyTitle}>No results yet</Text>
            <Text style={SearchScreenStyle.emptySubtitle}>Try searching above or tap a suggestion to see matches here.</Text>
          </View>
        )}
      </View>
    </View>
  );
}
