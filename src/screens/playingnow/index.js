import React from 'react';
import { Audio } from 'expo-av';
import { View, StatusBar, ScrollView } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import audioActions from '../../redux/audio/actions';

import PlayerTop from '../../components/playertop/index';
import ThumbNail from '../../components/thumbnail/index';
import SongName from '../../components/songname/index';
import PlayBar from '../../components/playbar/index';
import PlayerBottom from '../../components/playerbottom/index';

import styles from './index.styles';

function PlayingNowScreen() {
  const {
    isPlaying, playbackObj, currentIndex, audio, totalSongs, soundObj,
  } = useSelector(state => state.AudioReducer);
  const dispatch = useDispatch();

  const handleLoadPreviousSong = () => {
    let previousIndex = currentIndex - 1;
    if (previousIndex < 0) {
      previousIndex = totalSongs - 1;
    }
    const previousSong = audio[previousIndex];
    if (Object.keys(soundObj).length !== 0) {
      return dispatch(
        audioActions.nextAudioInit(
          playbackObj,
          previousSong,
          previousSong.uri,
          audio,
        ),
      );
    }
    return true;
  };

  const handleIsPlaying = () => (isPlaying
    ? dispatch(audioActions.pauseAudioInit(playbackObj))
    : dispatch(audioActions.resumeAudioInit(playbackObj)));

  const onPlaybackStatusUpdate = playback => {
    if (playback.isLoaded) {
      dispatch(audioActions.playAudioStatusSuccess(playback));
    }
  };

  const handlePlayResumeSong = () => {
    const playback = new Audio.Sound();
    const firstSong = audio[0];
    const currentSong = audio[currentIndex];
    if (firstSong === currentSong) {
      if (Object.keys(soundObj).length !== 0) {
        return handleIsPlaying();
      }
      dispatch(
        audioActions.playAudioInit(
          playback,
          currentSong,
          currentSong.uri,
          audio,
        ),
      );
      return playback.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
    return handleIsPlaying();
  };

  const handleLoadNextSong = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= totalSongs) {
      nextIndex = 0;
    }
    const nextSong = audio[nextIndex];
    if (Object.keys(soundObj).length !== 0) {
      return dispatch(
        audioActions.nextAudioInit(playbackObj, nextSong, nextSong.uri, audio),
      );
    }
    return true;
  };
  return (
    <View style={styles.mainScreen}>
      <StatusBar barStyle="light-content" backgroundColor="#030303" />
      <ScrollView>
        <PlayerTop />
        <ThumbNail />
        <SongName />
        <PlayBar />
        <PlayerBottom
          handleLoadPreviousSong={handleLoadPreviousSong}
          handlePlayResumeSong={handlePlayResumeSong}
          handleLoadNextSong={handleLoadNextSong}
        />
      </ScrollView>
    </View>
  );
}

export default PlayingNowScreen;
