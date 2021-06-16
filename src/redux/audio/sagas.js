import { put, call, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as constants from './constants';
import actions from './actions';

const getAudioPermissionsRequest = async () => {
  const permissionAllert = () => {
    Alert.alert('Permission', 'Music player needs to read audio files!', [
      {
        text: 'Ok',
        onPress: () => getAudioPermissionsRequest(),
      },
      {
        text: 'Cancel',
        onPress: () => permissionAllert(),
      },
    ]);
  };

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    });
    const result = media.assets;

    return result;
  };

  const permission = await MediaLibrary.getPermissionsAsync();

  if (permission.granted) {
    return getAudioFiles();
  }
  if (!permission.granted && permission.canAskAgain) {
    const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'denied' && canAskAgain) {
      permissionAllert();
    }
    if (status === 'granted') {
      return getAudioFiles();
    }
    if (status === 'denied' && !canAskAgain) {
      permissionAllert();
    }
  }
  return true;
};

function* getAudioPermissions() {
  try {
    const data = yield call(getAudioPermissionsRequest);
    const { length } = data;
    yield put(actions.getAudioPermissionsResult({ audio: data, length }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

const playAudioRequest = async (playbackObj, uri) => {
  try {
    return await playbackObj.loadAsync({ uri }, { shouldPlay: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return true;
};

function* playAudio({
  payload, item, uri, files,
}) {
  try {
    const result = yield call(playAudioRequest, payload, uri);
    const index = files.indexOf(item);
    yield put(
      actions.playAudioSuccess({
        item,
        playbackObj: payload,
        result,
        index,
      }),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

const pauseAudioRequest = async playbackObj => {
  try {
    return await playbackObj.setStatusAsync({ shouldPlay: false });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return true;
};

function* pauseAudio({ payload }) {
  try {
    const result = yield call(pauseAudioRequest, payload);
    yield put(actions.pauseAudioSuccess({ result }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

const resumeAudioRequest = async playbackObj => {
  try {
    return await playbackObj.playAsync();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return true;
};

function* resumeAudio({ payload }) {
  try {
    const result = yield call(resumeAudioRequest, payload);
    yield put(actions.resumeAudioSuccess({ result }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

const nextAudioRequest = async (playbackObj, uri) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    return await playAudioRequest(playbackObj, uri);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return true;
};

function* nextAudio({
  payload, item, uri, files,
}) {
  try {
    const result = yield call(nextAudioRequest, payload, uri);
    const index = files.indexOf(item);
    yield put(actions.nextAudioSuccess({ item, result, index }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_AUDIO_PERMISSIONS_START, getAudioPermissions);
  yield takeLatest(constants.PLAY_AUDIO_START, playAudio);
  yield takeLatest(constants.PAUSE_AUDIO_START, pauseAudio);
  yield takeLatest(constants.RESUME_AUDIO_START, resumeAudio);
  yield takeLatest(constants.NEXT_AUDIO_START, nextAudio);
}
