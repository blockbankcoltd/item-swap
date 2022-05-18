import {
  SEARCH_GAME,
  SEARCH_GAME_SUCCESS,
  SEARCH_GAME_ERROR,
} from '../actions';

export const searchGame = (data, callback) => ({
  type: SEARCH_GAME,
  payload: data
});
export const searchGameSuccess = (items) => ({
  type: SEARCH_GAME_SUCCESS,
  payload: items
});
export const searchGameError = (message) => ({
  type: SEARCH_GAME_ERROR,
  payload: message
});