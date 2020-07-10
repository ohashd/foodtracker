import {
	UserActions,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGOUT
} from './Types'

/* ACTION CREATORS */
export function loginRequest(): UserActions {
	return { type: LOGIN_REQUEST }
}

export function loginSuccess(username: string): UserActions {
	return { type: LOGIN_SUCCESS, username }
}

export function loginFailure(error: string): UserActions {
	return { type: LOGIN_FAILURE, error }
}

export function registerRequest(): UserActions {
	return { type: REGISTER_REQUEST }
}

export function registerSuccess(username: string): UserActions {
	return { type: REGISTER_SUCCESS, username }
}

export function registerFailure(error: string): UserActions {
	return { type: REGISTER_FAILURE, error }
}

export function logout(): UserActions {
	return { type: LOGOUT }
}