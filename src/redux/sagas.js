import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import gameSagas from './game/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    gameSagas(),
  ]);
}
