import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';
import config from '../../../config';
import rootReducer from '../reducers';

let middleware = [thunkMiddleware];

if (!config.isProduction) {
    let logger = require('./loggerMiddleware');
    middleware = [...middleware, logger];
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}
