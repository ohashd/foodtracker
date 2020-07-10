/* STATE TYPE */
export interface UserState {
  token: string
  username: string
}

/* ACTION TYPES */
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const LOGOUT = "LOGOUT";

export interface LoginRequest {
	type: typeof LOGIN_REQUEST
}

export interface LoginSuccess {
	type: typeof LOGIN_SUCCESS
	username: string
}

export interface LoginFailure {
	type: typeof LOGIN_FAILURE
	error: string
}

export interface RegisterRequest {
	type: typeof REGISTER_REQUEST
}

export interface RegisterSuccess {
	type: typeof REGISTER_SUCCESS
	username: string
}

export interface RegisterFailure {
	type: typeof REGISTER_FAILURE
	error: string
}

export interface Logout {
	type: typeof LOGOUT
}

export type LoginActions = LoginRequest | LoginSuccess | LoginFailure
export type RegisterActions = RegisterRequest | RegisterSuccess | RegisterFailure
export type UserActions = LoginActions | RegisterActions | Logout

