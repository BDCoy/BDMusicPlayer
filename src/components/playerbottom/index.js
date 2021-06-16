import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './index.styles';
import Controller from '../controller/index';

function PlayerBottom({
  handleLoadPreviousSong,
  handlePlayResumeSong,
  handleLoadNextSong,
}) {
  const { isPlaying } = useSelector(state => state.AudioReducer);
  return (
    <View style={styles.groupBottom}>
      <Controller iconName="BACK" onPressFn={handleLoadPreviousSong} />
      <Controller
        iconName={isPlaying ? 'PAUSE' : 'PLAY'}
        onPressFn={handlePlayResumeSong}
      />
      <Controller iconName="NEXT" onPressFn={handleLoadNextSong} />
    </View>
  );
}

PlayerBottom.propTypes = {
  handleLoadPreviousSong: PropTypes.func.isRequired,
  handlePlayResumeSong: PropTypes.func.isRequired,
  handleLoadNextSong: PropTypes.func.isRequired,
};

export default PlayerBottom;
