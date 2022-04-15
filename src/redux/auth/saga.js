
import { all, call, fork, put, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import {
  LOGIN_WITH_PASSWORD,
} from '../actions';

import {
  loginWithPasswordSuccess,
  loginWithPasswordError,
} from '../actions';

const loginWithPasswordAsync = async (user) => {
  return await new Promise((success, fail) => {
    success(Parse.Cloud.run("requestLogin", user))
  })
    .then(response => response)
    .catch(error => error)
}
function* loginWithPassword(action) {
  try {
    let passwordLogin = yield call(loginWithPasswordAsync, action.payload.user);
    if (passwordLogin && passwordLogin.success !== false) {
      yield put(loginWithPasswordSuccess({ success: true, message: messageList.noPasswordExist, loginUser: JSON.parse(JSON.stringify(passwordLogin.response)) }));
      delay(4000);
      yield put(loginWithPasswordSuccess({ success: "", message: "" }));

    }
    else {
      yield put(loginWithPasswordError({ success: false, message: messageList.loginWithPasswordError }));
      delay(4000);
      yield put(loginWithPasswordError({ success: "", message: "" }));

    }
  } catch (error) {
    yield put(loginWithPasswordError({ success: false, message: messageList.loginWithPasswordError, error: error }));
    delay(4000);
    yield put(loginWithPasswordError({ success: "", message: "" }));
  }
}

export function* watchLoginWithPassword() {
  yield takeLatest(LOGIN_WITH_PASSWORD, loginWithPassword);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginWithPassword),
  ]);
}