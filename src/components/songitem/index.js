import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Button, Icon, Avatar } from 'react-native-elements';
import styles from './index.styles';
import AppStyles from '../../../App.styles';
import { convertTime, getSongAvatar } from '../../utils/index';

function SongItem({
  id,
  song,
  duration,
  onPressOption,
  onSongPress,
  isPlaying,
  activeItem,
}) {
  const renderIconStatus = (isPlayingFn, onSongPressFn) => (
    <Button
      buttonStyle={AppStyles.button}
      containerStyle={AppStyles.buttonContainer}
      type="clear"
      onPress={onSongPressFn}
      icon={(
        <Icon
          name={isPlayingFn ? 'pause' : 'play'}
          size={16}
          type="font-awesome-5"
          color="rgb(250, 147, 109)"
        />
      )}
    />
  );

  return (
    <>
      <TouchableWithoutFeedback onPress={onSongPress}>
        <View
          style={[styles.songsInactive, activeItem && styles.songsActive]}
          key={id}
        >
          <View style={styles.details}>
            {activeItem ? (
              renderIconStatus(isPlaying, onSongPress)
            ) : (
              <Avatar
                activeOpacity={0.7}
                containerStyle={styles.avatarContainer}
                titleStyle={styles.avatarTitle}
                size="medium"
                title={getSongAvatar(song)}
              />
            )}
            <View style={styles.info}>
              <Text style={styles.artistNameList}>{convertTime(duration)}</Text>
              <View style={styles.songNameListContainer}>
                <Text style={styles.songNameList} numberOfLines={1}>
                  {song}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Button
              buttonStyle={AppStyles.button}
              containerStyle={AppStyles.buttonContainer}
              type="clear"
              onPress={onPressOption}
              icon={(
                <Icon
                  name="ellipsis-v"
                  size={16}
                  type="font-awesome-5"
                  color="#FD9774"
                />
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

SongItem.propTypes = {
  id: PropTypes.string.isRequired,
  song: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  onPressOption: PropTypes.func.isRequired,
  onSongPress: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  activeItem: PropTypes.bool.isRequired,
};

export default SongItem;
