import { put, takeLatest, all } from 'redux-saga/effects'
import { LOGIN_REQUEST, LoginRequest } from './Types'
import { loginSuccess } from './Actions'

function* loginRequest(action: LoginRequest) {
	console.log("action");
}

function* watchLogin() {
	yield takeLatest(LOGIN_REQUEST, loginRequest);
}