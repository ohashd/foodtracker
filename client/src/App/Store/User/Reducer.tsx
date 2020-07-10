import { UserState, UserActions, LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, LOGOUT } from './Types';

const initialState: UserState = {
	username: "",
	token: ""
}

export default function userReducer(state = initialState, action: UserActions): UserState {
	switch(action.type){
		case LOGIN_SUCCESS:
			let { username } = action;
			return { ...state, username }
		case LOGOUT:
			return initialState
		case LOGIN_REQUEST:
		case LOGIN_FAILURE:
		default:
			return state
	}
}