import {
  SEARCH_GAME,
  SEARCH_GAME_SUCCESS,
  SEARCH_GAME_ERROR,
} from '../actions';

const INIT_STATE = {
  success: true,
  message: "",
  loading: false,
  searchedGame: ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SEARCH_GAME:
      return { ...state, loading: true, };
    case SEARCH_GAME_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case SEARCH_GAME_ERROR:
      return { ...state, loading: false, ...action.payload };
    default: return { ...state };
  }
}
