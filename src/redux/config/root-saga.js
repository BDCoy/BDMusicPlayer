import { all, fork } from 'redux-saga/effects';
import AudioSaga from '../audio/sagas';

export default function* rootSaga() {
  yield all([fork(AudioSaga)]);
}
