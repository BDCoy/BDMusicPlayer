import { DataProvider } from 'recyclerlistview';
import * as constants from './constants';

const initialState = {
  audio: [],
  dataProvider: new DataProvider((r1, r2) => r1 !== r2),
  playbackObj: {},
  songPosition: 0,
  songDuration: 0,
  soundObj: {},
  currentListen: {},
  isPlaying: false,
  currentIndex: 0,
  songFinish: false,
  totalSongs: 0,
};

const audioReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case constants.GET_AUDIO_PERMISSIONS_START: {
      return {
        ...state,
      };
    }
    case constants.GET_AUDIO_PERMISSIONS_RESULT: {
      return {
        ...state,
        audio: action.payload.audio,
        dataProvider: state.dataProvider.cloneWithRows([
          ...state.audio,
          ...action.payload.audio,
        ]),
        totalSongs: action.payload.length,
      };
    }
    case constants.PLAY_AUDIO_SUCCESS: {
      return {
        ...state,
        currentListen: action.payload.item,
        playbackObj: action.payload.playbackObj,
        soundObj: action.payload.result,
        isPlaying: true,
        currentIndex: action.payload.index,
      };
    }
    case constants.PLAY_AUDIO_STATUS_SUCCESS: {
      return {
        ...state,
        songPosition: action.payload.positionMillis,
        songDuration: action.payload.durationMillis,
        songFinish: action.payload.didJustFinish,
      };
    }
    case constants.PAUSE_AUDIO_SUCCESS: {
      return {
        ...state,
        soundObj: action.payload.result,
        isPlaying: false,
      };
    }
    case constants.RESUME_AUDIO_SUCCESS: {
      return {
        ...state,
        soundObj: action.payload.result,
        isPlaying: true,
      };
    }
    case constants.NEXT_AUDIO_SUCCESS: {
      return {
        ...state,
        currentListen: action.payload.item,
        soundObj: action.payload.result,
        isPlaying: true,
        currentIndex: action.payload.index,
        songPosition: 0,
        songDuration: 0,
      };
    }
    case constants.RESET_PLAYING: {
      return {
        ...state,
        soundObj: {},
        currentListen: state.audio[0],
        isPlaying: false,
        currentIndex: 0,
        songPosition: 0,
        songDuration: 0,
      };
    }
    default: {
      return state;
    }
  }
};
export default audioReducer;
