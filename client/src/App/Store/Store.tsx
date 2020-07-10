import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from './Middlewares/Logger';
import userReducer from './User/Reducer';
import sagas from './Sagas';

import type { Dispatch, Store, Middleware } from 'redux';

const rootReducer = combineReducers({
	user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware()
const middlewares: [Middleware<{}, Store, Dispatch>] = [sagaMiddleware]

if(process.env.NODE_ENV !== 'production') {
	middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(sagas);

if(process.env.NODE_ENV !== 'production') {
	(window as any).store = store;
}

export default store;