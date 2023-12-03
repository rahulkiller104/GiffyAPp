/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import HomeScreen from './screens/HomeScreen';

// import Icon from 'react-native-vector-icons/MaterialIcons';

// const myIcon = <Icon name="handshake" size={30} color="#900" />;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

 

  return (
    <SafeAreaView>
      <View style={styles.container}>
       <HomeScreen/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding:"1%"
  }
})

export default App;
