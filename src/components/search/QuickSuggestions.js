import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SearchScreenStyle } from '../../styles/SearchScreenStyle';

export default function QuickSuggestions({ quickSuggestions, activeChip, handleQuickSelect }){
  return (
    <View style={SearchScreenStyle.chipRow}>
      {quickSuggestions.map((term) => (
        <Pressable
          key={term}
          onPress={() => handleQuickSelect(term)}
          style={({ pressed }) => [
            SearchScreenStyle.chip,
            activeChip === term && SearchScreenStyle.chipActive,
            pressed && { opacity: 0.75 },
          ]}
        >
          <Text
            style={[
              SearchScreenStyle.chipText,
              activeChip === term && SearchScreenStyle.chipTextActive,
            ]}
          >
            {term}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
