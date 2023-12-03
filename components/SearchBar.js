import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SearchBar(props) {
  return (
    <View style={styles.searchBarContainer}>
      <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
      <TextInput
        placeholder="Search..."
        placeholderTextColor="#666"
        style={styles.input}
        onChangeText={(text) => props.SearchInputHandler(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 5,
    paddingHorizontal:20,
    paddingVertical:1,
    marginHorizontal: '1%',
    marginBottom:20
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
});
