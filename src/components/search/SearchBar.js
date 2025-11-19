import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchScreenStyle } from '../../styles/SearchScreenStyle';
import { Colors } from '../../styles/Colors';

export default function SearchBar({
  searchText,
  setSearchText,
  inputRef,
  onSearch,
  onClear,
  showIdleState,
  activeChip,
  setSearchActive,
}) {
  const trimmedQuery = (searchText || '').trim();
  const showCompact = trimmedQuery.length > 0;

  return (
    <View style={[SearchScreenStyle.searchRow, SearchScreenStyle.searchRowActive]}>
      <TextInput
        style={[SearchScreenStyle.input, SearchScreenStyle.inputExpanded]}
        placeholder="Type here to search"
        value={searchText}
        ref={inputRef}
        onChangeText={(text) => {
          setSearchText(text);
          if (activeChip) setActiveChip('');
          if (text.trim().length === 0) {
            setSearchActive(false);
          }
        }}
        returnKeyType="search"
        onSubmitEditing={onSearch}
        onFocus={() => {
          if (trimmedQuery.length > 0) setSearchActive(true);
        }}
      />
      {!showIdleState && showCompact ? (
        <>
          <Pressable
            color={Colors.secondary}
            style={SearchScreenStyle.searchSmallButton}
            onPress={onSearch}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            accessibilityLabel="Search"
          >
            <Ionicons name="search" size={28} color={Colors.primary} />
          </Pressable>
          <Pressable
            style={SearchScreenStyle.searchSmallButton}
            onPress={onClear}
            accessibilityLabel="Clear search"
          >
            <Ionicons name="close" size={28} color={Colors.scanRed} />
          </Pressable>
        </>
      ) : null}
    </View>
  );
}
