import { combineReducers } from 'redux';
import authUser from './auth/reducer';
import gameUser from './game/reducer';

const reducers = combineReducers({
    authUser,
    gameUser
});

export default reducers;