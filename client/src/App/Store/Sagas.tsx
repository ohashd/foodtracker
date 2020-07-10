import { all } from 'redux-saga/effects'

const delay_fn = (ms: number) => new Promise(res => setTimeout(res, ms))

function* helloSaga(){
	yield delay_fn(1000);
	yield console.log("Hello Sagas!");
	yield console.log("Weehoo");
}

export default function* sagas(){
	yield all([
		helloSaga()
	]);
}