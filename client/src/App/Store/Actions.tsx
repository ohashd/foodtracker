import { Action, ActionCreator } from 'redux';
/* ACTION TYPES */

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

/* LOGIN */
interface LoginRequest extends Action<string> {
	type: typeof LOGIN_REQUEST
}

interface LoginSuccess extends Action<string> {
	type: typeof LOGIN_SUCCESS
	user: string
}

interface LoginFailure extends Action<string> {
	type: typeof LOGIN_FAILURE
	error: string
}

/* REGISTER */
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
interface RegisterRequest extends Action<string> {
	type: typeof REGISTER_REQUEST
}

interface RegisterSuccess extends Action<string> {
	type: typeof REGISTER_SUCCESS
	user: string
}

interface RegisterFailure extends Action<string> {
	type: typeof REGISTER_FAILURE
	error: string
}

interface Logout extends Action<string> {
	type: typeof LOGOUT
}

export type LoginAction = LoginRequest | LoginSuccess | LoginFailure
export type RegisterAction = RegisterRequest | RegisterSuccess | RegisterFailure
export type UserAction = LoginAction | RegisterAction | Logout

/*
 * action creators
 */
export const loginRequest: ActionCreator<LoginRequest> = () => {
	return { type: LOGIN_REQUEST }
}

export const loginSuccess: ActionCreator<LoginSuccess> = (user: string) => {
	return { type: LOGIN_SUCCESS, user }
}

export const loginFailure: ActionCreator<LoginFailure> = (error: string) => {
	return { type: LOGIN_FAILURE, error }
}

export const registerRequest: ActionCreator<RegisterRequest> = () => {
	return { type: REGISTER_REQUEST }
}

export const registerSuccess: ActionCreator<RegisterSuccess> = (user: string) => {
	return { type: REGISTER_SUCCESS, user }
}

export const registerFailure: ActionCreator<RegisterFailure> = (error: string) => {
	return { type: REGISTER_FAILURE, error }
}

export const logout: ActionCreator<Logout> = () => {
	return { type: LOGOUT }
}