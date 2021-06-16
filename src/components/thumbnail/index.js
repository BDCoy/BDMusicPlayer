import React from 'react';
import { useSelector } from 'react-redux';
import { View, Image, Text } from 'react-native';
import styles from './index.styles';
import albumOn from '../../../assets/images/album1.png';
import albumOff from '../../../assets/images/album2.png';

function ThumbNail() {
  const { isPlaying, totalSongs, currentIndex } = useSelector(
    state => state.AudioReducer,
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.countSongsContainer}>
        <Text style={styles.countSongs}>
          {currentIndex ? currentIndex + 1 : 0}
          /
          {totalSongs || 0}
        </Text>
      </View>
      <View style={styles.photoContainer}>
        <Image
          style={styles.photoBox}
          source={isPlaying ? albumOn : albumOff}
        />
      </View>
    </View>
  );
}

export default ThumbNail;
