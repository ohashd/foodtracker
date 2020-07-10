import { combineReducers } from 'redux';
import type { Reducer } from 'redux'
import { UserAction, LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, LOGOUT } from './Actions';

const user: Reducer<string, UserAction> = (state = "", action) => {
	switch(action.type){
		case LOGIN_SUCCESS:
			return action.user
		case LOGOUT:
			return ""
		case LOGIN_REQUEST:
		case LOGIN_FAILURE:
		default:
			return state
	}
}

const reducers = combineReducers({
	user
})
export default reducers