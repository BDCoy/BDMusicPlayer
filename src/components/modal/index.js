import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Overlay } from 'react-native-elements';
import styles from './index.styles';

function SongModal({
  visibility, songName, onClose, onPlaySong, id,
}) {
  const { soundObj, isPlaying, currentListen } = useSelector(state => state.AudioReducer);

  function showOptionToPress() {
    if (Object.keys(soundObj).length !== 0) {
      if (currentListen.id !== id) {
        return 'Play';
      }
      if (soundObj.isLoaded && isPlaying) {
        return 'Pause';
      }
      if (soundObj.isLoaded && !isPlaying) {
        return 'Resume';
      }
    }
    return 'Play';
  }

  return (
    <View>
      <Overlay
        overlayStyle={styles.songModalContainer}
        isVisible={visibility}
        onBackdropPress={onClose}
      >
        <View style={styles.modalDetails}>
          <Text style={styles.title} numberOfLines={2}>
            {songName}
          </Text>
          <TouchableWithoutFeedback onPress={onPlaySong}>
            <Text style={styles.option}>{showOptionToPress()}</Text>
          </TouchableWithoutFeedback>
        </View>
      </Overlay>
    </View>
  );
}

SongModal.propTypes = {
  id: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
  songName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onPlaySong: PropTypes.func.isRequired,
};

export default SongModal;
