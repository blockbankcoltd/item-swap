import {
  LOGIN_WITH_PASSWORD,
  LOGIN_WITH_PASSWORD_SUCCESS,
  LOGIN_WITH_PASSWORD_ERROR,
} from '../actions';

export const loginWithPassword = (user, callback) => ({
  type: LOGIN_WITH_PASSWORD,
  payload: { user, callback }
});
export const loginWithPasswordSuccess = (items) => ({
  type: LOGIN_WITH_PASSWORD_SUCCESS,
  payload: items
});
export const loginWithPasswordError = (message) => ({
  type: LOGIN_WITH_PASSWORD_ERROR,
  payload: message
});