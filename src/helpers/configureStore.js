import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/index';

/* eslint-disable global-require  */

export default function configureStore() {
    if (window.store == null) {
        window.store = applyMiddleware(thunkMiddleware)(createStore)(rootReducer);
        return window.store;
    }
    if (process.env.NODE_ENV === 'development') {
        window.store.replaceReducer(rootReducer);
    }
    return window.store;
}
