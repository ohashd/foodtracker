import { put, takeLatest, all } from 'redux-saga/effects'
import { LOGIN_REQUEST, loginSuccess } from './Actions'

const delay_fn = (ms: number) => new Promise(res => setTimeout(res, ms))

function* helloSaga(){
	yield console.log("Hello Sagas!");
	yield console.log("Weehoo");
}

function* login(){
	yield delay_fn(1000);
	yield put(loginSuccess("Daniel"));
}

function* watchLogin() {
	yield takeLatest(LOGIN_REQUEST, login);
}

export default function* sagas(){
	yield all([
		helloSaga(),
		watchLogin()
	]);
}