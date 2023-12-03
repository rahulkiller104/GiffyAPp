import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Share, Text,PermissionsAndroid, Platform } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import RNFetchBlob from 'rn-fetch-blob';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GifCard = (props) => {
  const { url } = props.gif.images.downsized;
  const [isPlaying, setPlaying] = useState(true);

  const togglePlayPause = () => {
    setPlaying(!isPlaying);
  };

  const checkPermission = async () => {
    
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    // Main function to download the image
    
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = url;    
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };


  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this cool GIF!',
        url: url,
      });

      if (result.action === Share.sharedAction) {
        // Shared successfully
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      console.error('Error sharing GIF:', error.message);
    }
  };

  const handleDownload = async () => {
    console.log('Downloading GIF:', url);
    checkPermission()
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePlayPause}>
        <Image source={{ uri: url }} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.icon} onPress={handleShare}>
        <FontAwesome name="share" size={25} color="#6366F1" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon} onPress={handleDownload}>
        <FontAwesome name="cloud-download" size={25} color="#6366F1" />
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowHeight * 0.01,
    alignItems: 'center',
  },
  logo: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.20,
  },
  icon: {
    bottom: 20, // Adjust this value to position the icons as needed
  },
  buttons:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    width:windowWidth * 0.45,
  }
});

export default GifCard;
