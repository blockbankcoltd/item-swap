import {
  LOGIN_WITH_PASSWORD,
  LOGIN_WITH_PASSWORD_SUCCESS,
  LOGIN_WITH_PASSWORD_ERROR,
} from '../actions';

const INIT_STATE = {
  success: true,
  message: "",
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_WITH_PASSWORD:
      return { ...state, loading: true, };
    case LOGIN_WITH_PASSWORD_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case LOGIN_WITH_PASSWORD_ERROR:
      return { ...state, loading: false, ...action.payload };
    default: return { ...state };
  }
}
