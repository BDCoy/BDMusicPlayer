/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { View, StatusBar, Dimensions } from 'react-native';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';

import { useSelector, useDispatch } from 'react-redux';
import audioActions from '../../redux/audio/actions';

import SongItem from '../../components/songitem/index';
import SongModal from '../../components/modal/index';

import styles from './index.styles';

function SongListScreen() {
  const dispatch = useDispatch();
  const {
    dataProvider,
    playbackObj,
    soundObj,
    currentListen,
    isPlaying,
    audio,
    currentIndex,
    songFinish,
    totalSongs,
  } = useSelector(state => state.AudioReducer);

  const { _data } = dataProvider;

  const [modalVisibility, setModalVisibility] = useState(false);
  const [currentSong, setCurrentSong] = useState();

  const setAudioInBackgroundMode = () => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: false,
    });
  };

  useEffect(() => {
    dispatch(audioActions.getAudioPermissions());
    setAudioInBackgroundMode();
  }, []);

  useEffect(() => {
    if (songFinish) {
      const nextIndex = currentIndex + 1;
      const nextSong = audio[nextIndex];
      if (nextIndex >= totalSongs) {
        playbackObj.unloadAsync();
        dispatch(audioActions.resetPlaying());
      } else {
        dispatch(
          audioActions.nextAudioInit(playbackObj, nextSong, nextSong.uri, audio),
        );
      }
    }
  }, [songFinish]);

  const layoutProvider = new LayoutProvider(
    () => 'audio',
    (type, dim) => {
      switch (type) {
        case 'audio':
          dim.width = Dimensions.get('window').width;
          dim.height = 80;
          break;

        default:
          dim.width = 0;
          dim.height = 0;
          break;
      }
    },
  );

  const onPlaybackStatusUpdate = playback => {
    if (playback.isLoaded) {
      dispatch(audioActions.playAudioStatusSuccess(playback));
    }
  };

  const handleSongPress = async item => {
    if (Object.keys(soundObj).length === 0) {
      const playback = new Audio.Sound();
      dispatch(
        audioActions.playAudioInit(playback, item, item.uri, audio),
      );
      return playback.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }

    if (
      soundObj.isLoaded
      && soundObj.isPlaying
      && currentListen.id === item.id
    ) {
      return dispatch(audioActions.pauseAudioInit(playbackObj));
    }

    if (
      soundObj.isLoaded
      && !soundObj.isPlaying
      && currentListen.id === item.id
    ) {
      return dispatch(audioActions.resumeAudioInit(playbackObj));
    }

    if (soundObj.isLoaded && currentListen.id !== item.id) {
      return dispatch(
        audioActions.nextAudioInit(playbackObj, item, item.uri, audio),
      );
    }
    return true;
  };

  const toggleSongModal = () => {
    setModalVisibility(!modalVisibility);
  };

  const rowRenderer = (_type, item, index, extendedState) => (
    <SongItem
      id={item.id}
      song={item.filename}
      duration={item.duration}
      activeItem={currentIndex === index}
      isPlaying={extendedState.isPlaying}
      onPressOption={() => {
        setCurrentSong(item);
        toggleSongModal();
      }}
      onSongPress={() => handleSongPress(item)}
    />
  );

  return (
    <View style={styles.songList}>
      <StatusBar barStyle="light-content" backgroundColor="#030303" />
      <View style={styles.songList}>
        {_data.length > 0 && (
          <>
            <RecyclerListView
              dataProvider={dataProvider}
              layoutProvider={layoutProvider}
              rowRenderer={rowRenderer}
              extendedState={{ isPlaying }}
            />
            {modalVisibility && (
              <SongModal
                onPlaySong={() => handleSongPress(currentSong)}
                id={currentSong.id}
                songName={currentSong.filename}
                visibility={modalVisibility}
                onClose={toggleSongModal}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
}

export default SongListScreen;
