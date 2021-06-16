import * as constants from './constants';

const actions = {
  getAudioPermissions: payload => ({
    type: constants.GET_AUDIO_PERMISSIONS_START,
    payload,
  }),
  getAudioPermissionsResult: payload => ({
    type: constants.GET_AUDIO_PERMISSIONS_RESULT,
    payload,
  }),
  playAudioInit: (payload, item, uri, files) => ({
    type: constants.PLAY_AUDIO_START,
    payload,
    item,
    uri,
    files,
  }),
  playAudioSuccess: payload => ({
    type: constants.PLAY_AUDIO_SUCCESS,
    payload,
  }),
  playAudioStatusSuccess: payload => ({
    type: constants.PLAY_AUDIO_STATUS_SUCCESS,
    payload,
  }),
  pauseAudioInit: payload => ({
    type: constants.PAUSE_AUDIO_START,
    payload,
  }),
  pauseAudioSuccess: payload => ({
    type: constants.PAUSE_AUDIO_SUCCESS,
    payload,
  }),
  resumeAudioInit: payload => ({
    type: constants.RESUME_AUDIO_START,
    payload,
  }),
  resumeAudioSuccess: payload => ({
    type: constants.RESUME_AUDIO_SUCCESS,
    payload,
  }),
  nextAudioInit: (payload, item, uri, files) => ({
    type: constants.NEXT_AUDIO_START,
    payload,
    item,
    uri,
    files,
  }),
  nextAudioSuccess: payload => ({
    type: constants.NEXT_AUDIO_SUCCESS,
    payload,
  }),
  resetPlaying: () => ({
    type: constants.RESET_PLAYING,
  }),
};

export default actions;
