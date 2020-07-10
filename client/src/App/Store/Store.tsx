import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from './Middleware/Logger';
import reducers from './Reducers';
import sagas from './Sagas';

import type { Dispatch, Store, Middleware } from 'redux';

export type RootStore = ReturnType<typeof reducers>

const sagaMiddleware = createSagaMiddleware()
const middlewares: [Middleware<{}, Store, Dispatch>] = [sagaMiddleware]

if(process.env.NODE_ENV !== 'production') {
	middlewares.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middlewares));
sagaMiddleware.run(sagas);

if(process.env.NODE_ENV !== 'production') {
	(window as any).store = store;
}

export default store;