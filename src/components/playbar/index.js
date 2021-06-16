import React from 'react';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import styles from './index.styles';

function PlayBar() {
  const { songPosition, songDuration } = useSelector(
    state => state.AudioReducer,
  );

  const postionPlaybar = () => {
    if ((songPosition && songDuration) > 0) {
      return songPosition / songDuration;
    }
    return 0;
  };

  return (
    <View style={styles.progressContainer}>
      <Progress.Bar
        progress={postionPlaybar()}
        width={250}
        height={15}
        color="#FF5A1E"
        unfilledColor="#FFC1A9"
        borderColor="transparent"
      />
    </View>
  );
}

export default PlayBar;
