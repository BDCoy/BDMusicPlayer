import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './index.styles';

import { convertTime } from '../../utils/index';

function SongName() {
  const { currentListen } = useSelector(state => state.AudioReducer);
  return (
    <View style={styles.nowPlaying}>
      <Text style={styles.songName} numberOfLines={1}>
        {currentListen.duration ? convertTime(currentListen.duration) : '00:00'}
      </Text>
      <Text style={styles.artistName} numberOfLines={1}>
        {currentListen.filename && currentListen.filename}
      </Text>
    </View>
  );
}

export default SongName;
