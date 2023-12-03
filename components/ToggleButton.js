import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => (
  <View style={styles.toggleContainer}>
    <Switch
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleDarkMode}
      value={isDarkMode}
    />
  </View>
);

const styles = StyleSheet.create({
  toggleContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
});

export default DarkModeToggle;
