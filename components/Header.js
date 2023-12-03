import { View, Text, Image ,StyleSheet} from 'react-native'
import React from 'react'
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Header() {
  return (
    <View style={styles.header}>
        <Image
        style={styles.logo}
        source={require('../assests/logo.gif')}
        // source={{uri:"https://media2.giphy.com/media/SVoWZgirFqXg5FNMb3/giphy.gif?cid=094bc0d8foi99j5yc7e9ww4wl6gt81q3dv15ikmfk1o9oq9s&ep=v1_gifs_trending&rid=giphy.gif&ct=g"}}
             />
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
      flexDirection:"row",
      justifyContent:"center",
    },
    logo: {
      width: windowWidth * 0.55,
      height: windowHeight * 0.15,
    },
  });